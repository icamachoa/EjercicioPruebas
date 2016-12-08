"use strict";
var seguimiento = function() {
	var frecordatorio, ftarea, fcita;
	var tkp, tku, idgrupo;
	var listaTku, listaGrupos;
	var plantillaRecordatorioMail, plantillaRecordatorioSms;
	var plantillaNotificacionMail, plantillaNotificacionSms;
	var currentSelect;
	var direcciones = [];

	this.RemovePlantilla = function(Parametros){
		var container = 'plantillas';
		var plantillaSelected;

		if(Parametros.tipo == 'notificacion'){
			container += 'Notificacion';
			plantillaSelected = ($('#tipornotificacion').val() == 2) ? 'sms' : 'mail';
			if(Parametros.plantilla == 'sms'){
				plantillaNotificacionSms = '';
				HabilitaBoton({opcion: 2, idPlantilla: 0, remove: '.SMSRemoveNoti', button: '.SMSBotonNoti'});
			} else {
				plantillaNotificacionMail = '';
				HabilitaBoton({opcion: 1, idPlantilla: 0, remove: '.CORREORemoveNoti', button: '.CORREOBotonNoti'});
			}
		} else {
			plantillaSelected = ($('#tiporecordatorio').val() == 2) ? 'sms' : 'mail';
			if(Parametros.plantilla == 'sms'){
				plantillaRecordatorioSms = '';
				HabilitaBoton({opcion: 2, idPlantilla: 0, remove: '.SMSRemove', button: '.SMSBoton'});
			} else {
				plantillaRecordatorioMail = '';
				HabilitaBoton({opcion: 1, idPlantilla: 0, remove: '.CORREORemove', button: '.CORREOBoton'});
			}
		}

		if(plantillaSelected == Parametros.plantilla){
			var select = $('#' + container)[0].selectize;
			select.addItem('');
		}
	};

	var HabilitaBoton = function(Parametros){
		var Opcion = Parametros.opcion;
		var IdPlantilla = Parametros.idPlantilla;
		var cRemove = Parametros.remove;
		var cButton = Parametros.button;

        if (IdPlantilla==0){
            $(cButton).removeClass('etismscorreoactiva EtiActiva FondoMenu');
            $(cRemove).removeClass('removeeti');
            $(cRemove).removeClass('Tip6');
            $(cRemove).attr('tip','');   
            $(cButton).addClass('etismscorreo');            
        }else{
            $(cButton).removeClass('etismscorreo');
            $(cButton).addClass('etismscorreoactiva EtiActiva FondoMenu');
            $(cRemove).addClass('removeeti Tip6');
            if(Opcion == 1){
            	$(cRemove).attr('tip','Eliminar plantilla Correo seleccionada');
            } else {
            	$(cRemove).attr('tip','Eliminar plantilla SMS seleccionada'); 
            }
        }
	    SalesUp.Sistema.Tipsy();
	};

	this.habilitarModulo = function(Parametros) {
		var tipoModulo = Parametros.tipo;
		var divContainer;
		var option;
		var msg = '';

		if(tipoModulo == 'recordatorio'){
			divContainer = '#divrecordar';
			option = '#RecordarOption';
			msg = 'recordar';
		} else {
			divContainer = '#divrNotificar';
			option = '#NotificarOption';
			msg = 'notificar';
		}

		var estado = $(option).attr('estado');
		$(option + ' .fa').remove();

		if(estado == 0){
			$(divContainer).slideDown();
			$(option).attr('estado',1);
			$(option).addClass('EtiActiva FondoMenu');
			$(option).attr('tip','Click para deshabilitar opciones ' + msg);
			$(option).append(' <i class="fa fa-check"></i>');
		} else {
			$(divContainer).hide();
			$(option).attr('estado',0); 
			$(option).removeClass('EtiActiva FondoMenu');
			$(option).attr('tip','Click para habilitar opciones ' + msg); 
			if(tipoModulo == 'recordatorio'){
				SalesUp.Variables.seguimiento.RemovePlantilla({tipo: 'recordatorio', plantilla: 'sms'});
				SalesUp.Variables.seguimiento.RemovePlantilla({tipo: 'recordatorio', plantilla: 'mail'});
			} else {
				SalesUp.Variables.seguimiento.RemovePlantilla({tipo: 'notificacion', plantilla: 'sms'});
				SalesUp.Variables.seguimiento.RemovePlantilla({tipo: 'notificacion', plantilla: 'mail'});
			}
		}
	};

	var crearListaUsuariosGruposAutorizados = function() {
		var items = _.reject(SalesUp.Variables.jsonUsuariosGruposAutorizados, function(data){
			if(SalesUp.Sistema.Almacenamiento({a: 'SysTku'}) == data.TK){
				return data;
			}
		});

		$('#ParaQuien').selectize({
			plugins:['remove_button', 'optgroup_columns'],
			create:false,
			valueField:'Tk', 
			labelField:'Dato',
			searchField:['Dato'], 
			options: items,
			optgroups:[ {id: 'U', name: 'Usuarios'}, {id: 'G', name: 'Grupos'}  ],
			optgroupField: 'Tipo', 
			optgroupLabelField: 'name',
			optgroupValueField: 'id', 
			optgroupOrder: ['U', 'G'],
			dropdownParent: 'body',
			maxItems: null,
			onItemAdd: function(data, $item){
				($item.data('tipo') == 'U') ? listaTku.push(data) : listaGrupos.push(data);
			},
			onItemRemove: function(data){
				(data[0] == 'U') ? listaTku = _.without(listaTku, data) : listaGrupos = _.without(listaGrupos, data);
			},
			onChange: function() { 
				$('#ListaParaQuien').height($('.ltParaQuien > div.has-items').height() + 10);
			},
			render: {
				option: function(data, escape) {
	    			return '<div class="option">' + escape(data.Dato) + '</div>';
	    		},
				item: function(data, escape){
					return '<div class="item OpcionesSeleccionadas BoxSizing Ellipsis" data-tipo="' + escape(data.Tipo) + '">' + escape(data.Dato)+ '</div>';
				}
			}
	  	});

	  	$('.selectize-control.ltParaQuien').addClass('w75 input-round BoxSizing');
	};

	var crearListaInvitadosCitas = function() {
		var $selectconquien = $('#ConQuien').selectize({
            plugins: ['remove_button'],
			valueField: 'tk',
			labelField: 'Nombre',
			searchField: ['NomNorma', 'ApeNorma', 'Nombre', 'Apellido', 'Titulo', 'Correo', 'Empresa'],
			maxItems: null,
			options: SalesUp.Variables.jsonColaboradoresCitas,
			optgroups:[{id: 'Contactos', name: 'Contactos'}, {id: 'Colaboradores', name: 'Colaboradores'}],
			optgroupField: 'grupo',
			optgroupLabelField: 'name',
			optgroupValueField: 'id',
			optgroupOrder: ['Colaboradores','Contactos'],                         
			persist: false,
			create: false,
			dropdownParent: 'body',
			onChange: function(){
				$('#ListaInvitadosConQuien').height($('.selectMultipleContainer > div.has-items').height() + 10);
			},
			onItemAdd: function(value, $item){
				SalesUp.Variables.accionesComunes.obtenerInfoCitaDuplicada({idusuario: value, tipo: 0, fechainicial: $('#fechacitainicio').val(), fechafin: $('#fechacitafin').val(), idcita: 0});
				var direct = ($item).attr('direccion1');
				if(direct.length != 0) direcciones.push({'value': direct});

				direct = ($item).attr('direccion2');
				if(direct.length != 0) direcciones.push({'value': direct});
				
				direcciones = _.unique(direcciones);
			},
			render:{
				item: function(item, escape){
					return '<div class="item OpcionesSeleccionadas BoxSizing Ellipsis" direccion1="'+item.direccion1+'" direccion2="'+item.direccion2+'" >' +
							(item.Nombre ? '<span class="Contacto" le="'+item.LE+'">' + ( (item.Titulo)?escape(item.Titulo):'' )  +' '+escape(item.Nombre)+' '+ ( (item.Apellido)?escape(item.Apellido):'' ) + '</span>' : '') +
							(item.Empresa ? '<span class="Empresa"> (' + escape(item.Empresa) + ')</span>' : '') +
							'</div>';
				},
				option: function(item, escape){
					var Sexo = (item.Sexo=='M' ? '<i class="fa fa-female"></i> ' : '<i class="fa fa-male"></i> ');
					var Tel = (item.Telefono ? '<i class="fa fa-phone"></i> '+escape(item.Telefono) :'' );
					var Cel = (item.Movil ? ' <i class="fa fa-mobile"></i> '+escape(item.Movil) :'' );
					var SoloTel = (item.Telefono ? escape(item.Telefono) :'' );
					var SoloCel = (item.Movil ? ', '+escape(item.Movil) :'' );

					var OpcionDato = '';

					if(item.LE==2){
						OpcionDato = '<div class="BoxInfoContacto">'+
						'<span class="NombreContacto Ellipsis"> ' +escape(item.Nombre)+' '+escape(item.Apellido) +'</span>' +
						'</div>';

					}else{
						OpcionDato = '<div class="BoxInfoContacto">'+
						'<span class="NombreContacto Ellipsis">' + Sexo + escape(item.Titulo) +' '+escape(item.Nombre)+' '+escape(item.Apellido) +'</span>' +
						( item.Correo ? '<span class="CorreoContacto Ellipsis"><i class="fa fa-envelope"></i> ' + escape(item.Correo) + '</span>' : '') +
						( item.Empresa ? '<span class="EmpresaContacto Ellipsis"><i class="fa fa-building-o"></i> ' + escape(item.Empresa) + '</span>' : '' )  +
						( item.Telefono ? '<span class="RegionContacto Ellipsis" title="' + SoloTel + SoloCel + '">' + Tel + Cel + '</span>' :'' ) +
						'</div>';
					}

					return OpcionDato;
				}
			},
			load: function(query, callback){
				var SeleccionarPersona = $selectconquien[0].selectize;
				if (!query.length) return callback();

				if (query.length>=3){
					callback();
					$.ajaxSetup({ 'beforeSend' : function(xhr) { xhr.overrideMimeType('text/json; charset=iso-8859-1'); } });
					$.ajax({ type: 'POST',
						url: 'ajax/jx-json-lista-prospectos-usuarios.dbsp',
						data: { q: query, t:0 },
						error: function(){ callback(); $('.ConQuien.loading').removeClass('loading'); },
						success: function(Data){
							callback(Data.LtContactos);
							$('.ConQuien.loading').removeClass('loading'); 
						}
					});
				}
			}
		});
		$('.selectize-control.selectMultipleContainer').addClass('w80 input-round');

		var select = $selectconquien[0].selectize;
		select.addItem(tkp);
		select.addItem(tku);
	};

	var crearListaPlantillas = function(Parametros) {
		var tipo = Parametros.tipo;
		var container = '#plantillas';
		var clase = '';

		if(tipo == 2){
			clase = 'Notificacion';
			container += clase;
		}

		$(container).selectize({
			create: false,
			valueField: 'TK',
			labelField: 'DESCRIPCION',
			sortField: 'DESCRIPCION',
			options: SalesUp.Variables.jsonPlantillasMail,
			optgroups: [{value: 'PROPIAS'}, {value: 'COMPARTIDAS'}],
			optgroupField: 'CLASE',
			optgroupLabelField: 'value',
			optgroupOrder: ['PROPIAS', 'COMPARTIDAS'],
			maxItems: 1,
			dropdownParent: 'body',
			onChange: function(value){
				var opt = this.$input.attr('id');
				var tipoOpt;
				if(opt == 'plantillas'){
					currentSelect = 'recordatorio',
					tipoOpt = $('#tiporecordatorio').val();
					if(tipoOpt == 1){
						plantillaRecordatorioMail = plantillaRecordatorioMail || value;
					} else {
						plantillaRecordatorioSms = plantillaRecordatorioSms || value;
					}
					if(tipoOpt == 1 && plantillaRecordatorioMail != ''){
						HabilitaBoton({opcion: 1, idPlantilla: 1, remove: '.CORREORemove', button: '.CORREOBoton'});
					}
					if(tipoOpt == 2 && plantillaRecordatorioSms != ''){
						HabilitaBoton({opcion: 1, idPlantilla: 2, remove: '.SMSRemove', button: '.SMSBoton'});
					}
				} else {
					currentSelect = 'notificacion';
					tipoOpt = $('#tipornotificacion').val();
					if(tipoOpt == 1){
						plantillaNotificacionMail = plantillaNotificacionMail || value;
					} else {
						plantillaNotificacionSms = plantillaNotificacionSms || value;
					}
					if(tipoOpt == 1 && plantillaNotificacionMail != ''){
						HabilitaBoton({opcion: 1, idPlantilla: 1, remove: '.CORREORemoveNoti', button: '.CORREOBotonNoti'});
					}
					if(tipoOpt == 2 && plantillaNotificacionSms != ''){
						HabilitaBoton({opcion: 1, idPlantilla: 2, remove: '.SMSRemoveNoti', button: '.SMSBotonNoti'});
					}
				}
			}
		});
		$('.selectize-control.ltPlantillas' + clase).addClass('w95 input-round');
	};

	var crearListaDonde = function(){
		$('#donde').selectize({
            maxItems:1,
            create: true,
            labelField: 'value',
            valueField: 'value',
            options: direcciones,
            dropdownParent: 'body'
        });
        $('.selectize-control.ltDonde').addClass('w80 input-round');
	};

	var iniciaRecordatorios = function() {
		frecordatorio = true;
		$('#rFechaVence').val(SalesUp.Variables.accionesComunes.obtenerFechaActual());
		$('#rHoraVence').val(SalesUp.Variables.accionesComunes.obtenerHoraSiguiente({hrs: 1}));
		$('#rHoraVence').clockpicker({ placement:'right', align:'right', autoclose:true, 'default':'now' });
	};

	var iniciaTareas = function(Parametros) {
		ftarea = true;
		SalesUp.Variables.accionesComunes.obtenerInfoProspectoCompartido({tkp: tkp, tku: listaTku.join(''), tkgrupos: listaGrupos.join('')});
		$('#tFechaVence').val(SalesUp.Variables.accionesComunes.obtenerFechaActual());
		$('#tHoraVence').val(SalesUp.Variables.accionesComunes.obtenerHoraSiguiente({hrs: 1}));
		$('#tHoraVence').clockpicker({ placement:'left', align:'left', autoclose:true, 'default':'now' });
		SalesUp.Variables.accionesComunes.obtenerListaUsuariosGrupos(Parametros);

		setTimeout(function(){
			crearListaUsuariosGruposAutorizados();
		}, 500);
	};

	var iniciaCitas = function() {
		fcita = true;
		
		plantillaRecordatorioMail = '';
		plantillaRecordatorioSms = '';
		plantillaNotificacionMail = '';
		plantillaNotificacionSms = '';

		$('.BodyModal').attr('style', 'height: auto');
		$('#fechacitainicio').val(SalesUp.Variables.accionesComunes.obtenerFechaActual());
		$('#fechacitafin').val(SalesUp.Variables.accionesComunes.obtenerFechaActual());
		$('#horaInicio').clockpicker({ placement:'right', align:'right', autoclose:true, 'default':'now' });
		$('#horaInicio').val(SalesUp.Variables.accionesComunes.obtenerHoraSiguiente({hrs: 1}));
    	$('#horafinal').clockpicker({ placement:'right', align:'right', autoclose:true, 'default':'now' });
    	$('#horafinal').val(SalesUp.Variables.accionesComunes.obtenerHoraSiguiente({hrs: 2}));
    	SalesUp.Variables.accionesComunes.obtenerColaboradoresCita({ltInvitados: [tkp, tku], ltTiposInvitados: [1,2]});
    	SalesUp.Variables.accionesComunes.obtenerPlantillasCompartidasYPropiasCitas();
    	
   		$('#tiporecordatorio').change(function(){
   			if($(this).val() == 1){
   				plantillaRecordatorioSms = $('#plantillas').val();
   				SalesUp.Variables.accionesComunes.actualizarLista({id: 'plantillas', options: SalesUp.Variables.jsonPlantillasMail, items: [plantillaRecordatorioMail]});   				
   			} else {
				plantillaRecordatorioMail = $('#plantillas').val();   				
   				SalesUp.Variables.accionesComunes.actualizarLista({id: 'plantillas', options: SalesUp.Variables.jsonPlantillasSms, items: [plantillaRecordatorioSms]});
   			}
   		});

   		$('#tipornotificacion').change(function(){
   			if($(this).val() == 1){
   				plantillaNotificacionSms = $('#plantillasNotificacion').val();
   				SalesUp.Variables.accionesComunes.actualizarLista({id: 'plantillasNotificacion', options: SalesUp.Variables.jsonPlantillasMail, items: [plantillaNotificacionMail]});   				
   			} else {
				plantillaNotificacionMail = $('#plantillasNotificacion').val();   				
   				SalesUp.Variables.accionesComunes.actualizarLista({id: 'plantillasNotificacion', options: SalesUp.Variables.jsonPlantillasSms, items: [plantillaNotificacionSms]});   				
   			}
   		});

   		crearListaDonde();
    	setTimeout(function(){
    		crearListaInvitadosCitas();
    		crearListaPlantillas({tipo: 1});
    		crearListaPlantillas({tipo: 2});
    	}, 500);
	};

	this.setActiveTab = function(elem) {
		var item = $(elem).attr('href').slice(1);
		if(item == 'Recordatorios' && frecordatorio == false) { iniciaRecordatorios(); }
		if(item == 'Tareas' && ftarea == false) { iniciaTareas({tkp: tkp, tku: listaTku.join(''), idgrupo: listaGrupos.join('')}); }
		if(item == 'Citas' && fcita == false) { iniciaCitas(); }
	};

	this.mostrarPopup = function(Parametros) {
		frecordatorio = false;
		ftarea = false;
		fcita = false;

		tkp = Parametros.tkp;
		tku = Parametros.tku;
		idgrupo = Parametros.idgrupo;

		listaTku = [];
		listaGrupos = [];

		SalesUp.Variables.accionesComunes.obtenerDatosProspecto(Parametros);
		SalesUp.Variables.accionesComunes.obtenerFasesProspecto(Parametros);

		SalesUp.Construye.MuestraPopUp({
			alto:'445px', ancho:'655px', centrado:false, id:'popSeguimiento',
			titulo: Parametros.titulo,
			fuente:'/privado/Vista/popups/popup_agregar_seguimiento.dbsp'
		});

		setTimeout(function(){
			$('#Tabs').tabs();
			iniciaRecordatorios();
			$('#nombreUsuario').text(SalesUp.Variables.nombreProspecto);
			if(SalesUp.Variables.empresa != null && SalesUp.Variables.empresa != undefined){
				$('#frmSeguimiento > table').append('<tr><th width="80">Empresa</th><td id="empresa"><i class="fa fa-building-o"></i> ' + SalesUp.Variables.empresa +'</td></tr>');
			}
			SalesUp.Variables.accionesComunes.crearListaFasesProspecto();
		}, 500);
	};

	this.guardar = function() {
		//SalesUp.Variables.accionesComunes.obtenerInfoProspectoCompartido({tkp: tkp, tku: listaTku.join(','), tkgrupos: listaGrupos.join(',')});
	};
}

$(function(){
	SalesUp.Variables.seguimiento = new seguimiento();
});