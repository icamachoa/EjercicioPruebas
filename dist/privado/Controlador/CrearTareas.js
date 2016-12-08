var $SelectizeContacto;

SalesUp.Variables.LtUsuario = function(){
	/*SalesUp.Variables.jsonUsuariosGruposAutorizados = SalesUp.Sistema.CargaDatos({ Link:'/privado/Modelo/jsonUsuariosGruposAutorizados.dbsp', DataType:'json' });*/
	SalesUp.Variables.jsonUsuariosGruposAutorizados = SalesUp.Sistema.CargaDatos({ Link:'/privado/Modelo/jsonUsuariosGrupos.dbsp', DataType:'json' });
	
	SalesUp.Variables.jsonUsuariosGruposAutorizados.jsonDatos = _.reject(SalesUp.Variables.jsonUsuariosGruposAutorizados.jsonDatos, function(j){  
		if(SalesUp.Variables.SessionIdusuario==SalesUp.Sistema.SoloNumero(j.Id)){return j;}
    });
	


	$('#ParaQuien').selectize({
	    plugins:['remove_button', 'optgroup_columns'], create:false,
	    delimiter:',', valueField:'Id', labelField:'Dato',
	    searchField:['Dato'], persist:false, openOnFocus:true,
	    options:SalesUp.Variables.jsonUsuariosGruposAutorizados.jsonDatos,
	    optgroups:[ {id: 'U', name: 'Usuarios'}, {id: 'G', name: 'Grupos'}	],
		optgroupField: 'Tipo', optgroupLabelField: 'name',
		optgroupValueField: 'id', optgroupOrder: ['U', 'G'],
	    onChange:function(){ SalesUp.Variables.DespuesDeSeleccionarUsuario(); },
	    
	    render:{
	        item: function(item, escape){
	        	return '<div class="OpcionesSeleccionadas BoxSizing Ellipsis" data-tipo="'+item.Tipo+'">'+item.Dato+'</div>';
	        }
	    }
	});

} /* /SalesUp.Variables.LtUsuario */

SalesUp.Variables.SelectUsuarios = function(){
	
	SalesUp.Variables.jsonUsuariosAutorizados = SalesUp.Sistema.CargaDatos({ Link:'/privado/Modelo/jsonUsuariosAutorizados.dbsp', DataType:'json' });
	
	SalesUp.Construye.ConstruyemeUn({
		Control: 'select', Nuevo: false,
		IdControl: 'ParaQuien',
		Template: '<option value="{{IdUsuario}}">{{Usuario}}</option>',
		Datos: SalesUp.Variables.jsonUsuariosAutorizados.jsonDatos
	});

} /* /SalesUp.Variables.SelectUsuarios */

SalesUp.Variables.DespuesDeSeleccionarUsuario = function(){
	$('.tipsy').remove();
	SalesUp.Sistema.Tipsy();
	
	var IdsUsuarios='', IdsGrupos='';
	$('.LtParaQuien .OpcionesSeleccionadas').each(function(){
		var $Elemento = $(this);
		var Valor = $Elemento.attr('data-value').replace(/[^0-9]/g,'');
		($Elemento.attr('data-tipo')=='U') ? IdsUsuarios += Valor+',' : IdsGrupos += Valor+',';
	});

	$('#LtIdUsuarios').val(IdsUsuarios);
	$('#LtIdGrupos').val(IdsGrupos);
	
	$('.selectize-dropdown.LtParaQuien').hide();
	$('.LtParaQuien .selectize-input.items.not-full.has-options.has-items > input').keyup(function(e){
		if(SalesUp.Sistema.NumKeyCode(e)!=13) $('.selectize-dropdown.LtParaQuien').show();
	});

	var Alto = $('.LtParaQuien .selectize-input.items').height();
	
	var Aumenta = Alto - 20;
	(Aumenta) ? $('#BoxParaQuien').css('height','auto') : $('#BoxParaQuien').removeAttr('style');
	SalesUp.Variables.TamanioPopActual = SalesUp.Variables.TamanioPop+Aumenta; 
	self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:SalesUp.Variables.TamanioPopActual});
	SalesUp.Variables.LoTieneCompartido();

}/* /SalesUp.Variables.DespuesDeSeleccionarUsuario */


SalesUp.Variables.Contacto = function(){
	$SelectizeContacto = $('#Contacto').selectize({
    	plugins: ['restore_on_backspace'],
	  	valueField: 'Tkp', labelField: 'Nombre',
	    searchField: ['NomNorma', 'ApeNorma', 'Nombre', 'Apellido', 'Titulo', 'Correo', 'Empresa'],
	    maxItems: 1, options: [], persist: false, create: false,
	    onChange: function(){ SalesUp.Variables.DespuesDeSeleccionarContacto(); },
	    render:{
	        item: function(item, escape){
	        	$('.Contacto.loading').removeClass('loading');
	        	$('.Contacto.SelectizeMal').removeClass('SelectizeMal');
	            return '<div>' +
	                (item.Nombre ? '<span data-cliente="'+item.EsCliente+'" class="Contacto">' + ( (item.Titulo)?escape(item.Titulo):'' )  +' '+escape(item.Nombre)+' '+ ( (item.Apellido)?escape(item.Apellido):'' ) + '</span>' : '') +
	                (item.Empresa ? '<span class="Empresa"> <i>[' + escape(item.Empresa) + ']</i></span>' : '') +
	            '</div>';
	        },
	        option: function(item, escape){
	        	var Sexo = (item.Sexo=='M' ? '<i class="fa fa-female"></i> ' : '<i class="fa fa-male"></i> ');
	        	var Tel = (item.Telefono ? '<i class="fa fa-phone"></i> '+escape(item.Telefono) :'' );
	        	var Cel = (item.Movil ? ' <i class="fa fa-mobile"></i> '+escape(item.Movil) :'' );
	        	var SoloTel = (item.Telefono ? escape(item.Telefono) :'' );
	        	var SoloCel = (item.Movil ? ', '+escape(item.Movil) :'' );
	            return '<div class="BoxInfoContacto BoxSizing">' +
	                '<span class="NombreContacto Ellipsis">' + Sexo + escape(item.Titulo) +' '+escape(item.Nombre)+' '+escape(item.Apellido) +'</span>' +
	               ( item.Correo ? '<span class="CorreoContacto Ellipsis"><i class="fa fa-envelope"></i> ' + escape(item.Correo) + '</span>' : '') +
	               ( item.Empresa ? '<span class="EmpresaContacto Ellipsis"><i class="fa fa-building-o"></i> ' + escape(item.Empresa) + '</span>' : '' )  +
	               ( item.Telefono ? '<span class="RegionContacto Ellipsis" title="' + SoloTel + SoloCel + '">' + Tel + Cel + '</span>' :'' ) +
	            '</div>';
	        },
	        option_create: function(data, escape){
				return '';
				return '<div class="create"><strong>"' + escape(data.input) + '"</strong> </div>';
			}
	    },
	    load: function(query, callback){
	    	SelectContacto.clearOptions();

	    	if (!query.length) return callback();
	    	
	        if (query.length>=3){
	        	callback();
	        	SalesUp.Variables.jsonLtContactos = SalesUp.Sistema.CargaDatos({ Link:'/privado/ajax/jx-json-lista-directorio.dbsp', Parametros:'q='+query, DataType:'json' });
	        	callback(SalesUp.Variables.jsonLtContactos.LtContactos);
	        }
	    }
	});
	var SelectContacto = '';
	SelectContacto = $SelectizeContacto[0].selectize;
}

SalesUp.Variables.DespuesDeSeleccionarContacto = function(){
	$('#Contacto.selectized').each(function() {
		var $input = $(this);
		var update = function(e) { $('#TkpSeleccionado').val($input.val()); }
		$(this).on('change', update);
		update();
	});

	SalesUp.Variables.LoTieneCompartido();
	setTimeout(function(){
		if( _.size($('.Contacto[data-cliente]')) ){
			$('#Asunto').focus();	
		}
		
		if($('.Contacto[data-cliente]').attr('data-cliente')==1){
			$('#LbProspectoCliente').html('Cliente');
		}else{
			$('#LbProspectoCliente').html('Prospecto');
		}
	}, 200);
}

SalesUp.Variables.Guardar = function(){
	
	var Hora = $('#Hora').val();
	var UltimaFecha = $('#Vence').val();
	SalesUp.Sistema.Almacenamiento({a:'SysHoraTarea',v:Hora});
	SalesUp.Sistema.Almacenamiento({a:'SysFechaTarea',v:UltimaFecha});
	$('#FrmNuevaTarea').submit();
    self.parent.SalesUp.Variables.ValidarEventosActivos({tipo:2});

}/* /SalesUp.Variables.Guardar */

SalesUp.Variables.RevisarRestricciones = function(){
	var NoCompartidos = '';
	if(!_.isUndefined(SalesUp.Variables.jsonCompartido)){
		NoCompartidos = SalesUp.Variables.jsonCompartido.jsonDatos[0].NoCompartidos;
	}
	
	
	if(SalesUp.Valida.ValidaObligatorios()){
		if(_.size(NoCompartidos)>0){
			SalesUp.Construye.MuestraAlerta({
				TipoAlerta:'AlertaPregunta',
				Alerta:'<h2>Atención</h2><br/>Los siguientes usuarios no tienen compartido el contacto:<br/>'+ NoCompartidos,
				Boton1:'Compartir y guardar',
				Boton2:'Cancelar',
				Callback1:'SalesUp.Variables.Guardar',
				Icono1:'<i class="fa fa-save"></i>'
			});	
		}else{
			SalesUp.Variables.Guardar();
		}	
	}
}/*/SalesUp.Variables.RevisarRestricciones*/

SalesUp.Variables.GuardaEditarTarea = function(){
	if(SalesUp.Valida.ValidaObligatorios()){
		//console.log('guarda');
		$('#FrmEditarTarea').submit();
	}
}


SalesUp.Variables.LoTieneCompartido = function(){
	$('#IdsNoCompartidos').val('');
	var Tkp = $('#TkpSeleccionado').val();
	var IdUsuario = $('#LtIdUsuarios').val();
	var IdGrupos = $('#LtIdGrupos').val();
	if( (Tkp!='') && ((IdUsuario!='')||IdGrupos!='')){
		var Datos = {Tkp: Tkp, Idu:IdUsuario, IdG:IdGrupos };
		SalesUp.Variables.jsonCompartido = SalesUp.Sistema.CargaDatos({ Link:'/privado/Modelo/jsonProspectoCompartido.dbsp', Parametros:Datos, DataType:'json' });
		$('#IdsNoCompartidos').val(SalesUp.Variables.jsonCompartido.jsonDatos[0].IdsNoCompartidos);
	}
}


SalesUp.Variables.UltimaFecha = function(){
	var Formato = SalesUp.Sistema.Almacenamiento({a:'SysFormatoFecha'});
	Formato = SalesUp.Sistema.StrReplace('yy','yyyy',Formato);
	Formato = Formato.toUpperCase();
	var FechaHoy = moment().add('d', 2).format(Formato);

	var Hora = SalesUp.Sistema.Almacenamiento({a:'SysHoraTarea'});
	var Fecha = SalesUp.Sistema.Almacenamiento({a:'SysFechaTarea'});
	var sHora = moment().get('hour');
	var sMin = moment().get('minute');

	if(sMin>30){sHora = sHora + 1;}

	if(sHora<24){
		(!Hora) ? Hora = sHora +':00':'';
		(!Fecha) ? Fecha = moment().format(Formato):'';
	}else{
		(!Hora) ? Hora = '00:00':'';
		(!Fecha) ? Fecha = moment().add('d', 1).format(Formato):'';
	}

	$('#Vence').val(FechaHoy); 
	$('#Hora').val(Hora);

	var FechaSplit;
	var nf=Fecha;
	if(Formato=='DD/MM/YYYY'){ 
		FechaSplit = Fecha.split('/');
		nf = FechaSplit[2]+'/'+FechaSplit[1]+'/'+FechaSplit[0]; 
	}
	
	(_.isDate(new Date(nf))) ? nDate = new Date(nf) : nDate = new Date();
	var DateTime = nDate.getTime();
	
	var FechaHoySplit;
	var HoyFecha = FechaHoy;
	if(Formato=='DD/MM/YYYY'){ 
		FechaHoySplit = FechaHoy.split('/');
		HoyFecha = FechaHoySplit[2]+'/'+FechaHoySplit[1]+'/'+FechaHoySplit[0]; 
	}
	
	(_.isDate(new Date(HoyFecha))) ? nDateHoy = new Date(HoyFecha) : nDateHoy = new Date();
	var DateHoy = nDateHoy.getTime();
	
	
	if(DateTime>DateHoy){ $('#Vence').val(Fecha); }

}

SalesUp.Variables.Repetir = function(){
	IniciaPickersEspecial({F:$('#Vence').val()});
	if($('#Repetir').is(':visible')){
		$('#cada, #diasmesdiv, #dias').hide();
		var menos = 30;
		($('#cada').is(':visible')) ? menos = 60 : '';
		$('#Repetir').slideUp();

		SalesUp.Variables.TamanioPopActual = SalesUp.Variables.TamanioPopActual - menos;
	}else{
		$('#Repetir').slideDown();
		SalesUp.Variables.TamanioPopActual = SalesUp.Variables.TamanioPopActual + 30;
	}

	self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:SalesUp.Variables.TamanioPopActual});
}

SalesUp.Variables.AccionRepetir = function(){
	var valor = $('#repetir').val();
	$('#Recurrencia').val(valor);
	$('#DiasFrecuencia').val('');
	var titulo=''
	if (valor>0){
		self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:SalesUp.Variables.TamanioPopActual+30});
		if (valor==1){ titulo='Cada día';$('#dias').slideUp();$('#diasmesdiv').slideUp(); $('#DiasFrecuencia').val(0);}
		if (valor==2){ titulo='Cada semana';$('#dias').slideDown();$('#diasmesdiv').slideUp(); SalesUp.Variables.DiasActivos(); }
		if (valor==3){ titulo='Cada mes';$('#dias').slideUp();$('#diasmesdiv').slideDown(); $('#DiasFrecuencia').val($('#diasmes').val()); }
		$('#cada').show();
		$('#cada label').html(titulo).addClass('Tip2').attr('Tip',titulo);
		$('#terminar').removeAttr('disabled');
		$('#recurrenciaterminar label').removeClass('etiquetadisabled');
		SalesUp.Sistema.Tipsy();
	}else{
		ReiniciarValoresDefaultTerminar();
		self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:SalesUp.Variables.TamanioPop+30});
	}   
	
}

function ReiniciaPickerEspecial(){
    $( "#fecharepetir" ).datepicker( "destroy" );
    IniciaPickersEspecial({F:$('#Vence').val()});
} 

function IniciaPickersEspecial(Op){
    var Fecha;
    (Op.F) ? Fecha = Op.F : Fecha = '01/01/2000';
    var Formato = SalesUp.Sistema.Almacenamiento({a:'SysFormatoFecha'});
	

    $('#fecharepetir').datepicker({dateFormat:Formato,startDate:Fecha,minDate:Fecha,
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'], dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'], 
        monthNames:  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],  
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],          
        changeMonth: false,
        numberOfMonths: 1
        
    });
    

    var f1s = Fecha ;
    var f2s = $('#fecharepetir').val();

	if(Formato=='dd/mm/yy'){ 
		var f1a = f1s.split('/');
    	var f1 = new Date(f1a[1]+'/'+f1a[0]+'/'+f1a[2]);

    	var f2a = f2s.split('/');
		var f2 = new Date(f2a[1]+'/'+f2a[0]+'/'+f2a[2]);
	}else{
		f1 = new Date(f1s);
		f2 = new Date(f2s);
	}
	
	if (f1.getTime()>=f2.getTime()){
        $('#fecharepetir').val(Fecha);
    }

        
}

function ReiniciarValoresDefaultTerminar(){
	$('#cada').slideUp();
	$('#terminar').attr('disabled','disabled');
	$('#recurrenciaterminar label').addClass('etiquetadisabled');
	ReiniciaPickerEspecial();
	$('#fecharepetir').attr('disabled','disabled');
	$('#fecharep label').addClass('etiquetadisabled');
	$('#terminar').val(0);
	$('#repetir').val(0);   
	$('#cadadia').val(1);  
	$('#diasmesdiv').slideUp();
	$('#diasmes').val(1);
	ReiniciaDias();

}

function ReiniciaDias(){
	$('#dias').slideUp(); 
	$('.selectdias').removeClass('etidiasactivo');
	$('.selectdias').addClass('etidias');
	$('#DiasFrecuencia').val('');
}

SalesUp.Variables.SeleccionaDia = function(Op){
	var $Elemento = $(Op.Elemento);
	var valor = $Elemento.attr('value');
	var estado = $Elemento.attr('estado');
	var valordia = $Elemento.attr('valordia');
	$('.tipsy').remove();
	if(estado==0){
	   $Elemento.addClass('etidiasactivo FondoMenu').attr('estado','1').attr('tip','Click para deshabilitar el '+valordia);
	}else{
	   $Elemento.removeClass('etidiasactivo FondoMenu').attr('estado','0').attr('tip','Click para habilitar el '+valordia);   
	}

	SalesUp.Variables.DiasActivos();
} /* /SeleccionaDia */


SalesUp.Variables.DiasActivos = function(){
	var lista = ''
	$('.etidiasactivo').each(function(){
	   lista = lista + $(this).attr('value') + ',';  
	}); 
	$('#DiasFrecuencia').val(lista);
}

SalesUp.Variables.LosDias = function(Op){
	$('#DiasFrecuencia').val(Op.v);
	$(Op.Elemento).removeClass('w55');
	if(Op.v==0){ $(Op.Elemento).addClass('w55'); }
}

SalesUp.Variables.Cada = function(Op){
	$('#Frecuencia').val(Op.v);
}

SalesUp.Variables.VenceRepetir = function(Op){
	$('#FechaFinRepetir').val(Op.v);
}

SalesUp.Variables.TerminarEn = function(Op){
	var valor = Op.v;
	$('#TipoFin').val(valor);
	if (valor>0){
	   $('#fecharepetir').removeAttr('disabled').addClass('InfoObligatorio');
	   $('#fecharep label').removeClass('etiquetadisabled');
	}else{
	   ReiniciaPickerEspecial();
	   $('#fecharepetir').attr('disabled','disabled').removeClass('InfoObligatorio');
	   $('#FechaFinRepetir, #fecharepetir').val('');
	   $('#fecharep label').addClass('etiquetadisabled');
	}
}

SalesUp.Sistema.VerContactos = function(Op){
	var $BoxContacto = $('#BoxContacto');
	var $Elemento = $(Op.Elemento);
	$('.tipsy').remove();
	if($BoxContacto.is(':visible')){
		$Elemento.attr('tip','Mostrar prospecto o cliente relacionado').addClass('Gris');
		$BoxContacto.slideUp();
		SalesUp.Variables.TamanioPopActual = SalesUp.Variables.TamanioPopActual - 30;
		self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:SalesUp.Variables.TamanioPopActual});
	}else{
		$Elemento.attr('tip','Ocultar prospecto o cliente relacionado').removeClass('Gris');
		$BoxContacto.slideDown();
		SalesUp.Variables.TamanioPopActual = SalesUp.Variables.TamanioPopActual + 30;
		self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:SalesUp.Variables.TamanioPopActual});
		setTimeout(function(){ $('.Contacto .selectize-input.items.not-full > input').focus();}, 200);
	}
} /* /SalesUp.Sistema.VerContactos */


SalesUp.Variables.AjustaTamanioHora = function(){
	$('#Vence, #Hora').focus(function(){
		SalesUp.Variables.FocusActivo = true;
		self.parent.SalesUp.Sistema.TamanioInicial();
	    var tamanio = self.parent.SalesUp.Variables.TamanioInicial;
	    if(tamanio==162){
	    	self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:320});
	    }
	}).blur(function(){
	  	setTimeout(function(){
	  		self.parent.SalesUp.Sistema.TamanioInicial();
		    var tamanio = self.parent.SalesUp.Variables.TamanioInicial;
		    ( (tamanio==320) && (!SalesUp.Variables.FocusActivo) ) ? self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:162}) : '';	
		    SalesUp.Variables.FocusActivo = false;
	  	}, 200);
	  	
	}).change(function(){
		self.parent.SalesUp.Sistema.TamanioInicial();
	    var tamanio = self.parent.SalesUp.Variables.TamanioInicial;
	    (tamanio==320) ? self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:162}) : '';

	});
} /* /SalesUp.Variables.AjustaTamanioHora */


SalesUp.Variables.AjustaTamanioHoraCrear = function(){
	$('#Vence, #Hora').focus(function(){
		SalesUp.Variables.FocusActivo = true;
		self.parent.SalesUp.Sistema.TamanioInicial();
	    var tamanio = self.parent.SalesUp.Variables.TamanioInicial;
	    //console.log(tamanio);
	    if(tamanio==222){
	    	self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:252});
	    }
	}).blur(function(){
	  	setTimeout(function(){
	  		self.parent.SalesUp.Sistema.TamanioInicial();
		    var tamanio = self.parent.SalesUp.Variables.TamanioInicial;
		    var Alto = 222;
		    ($('#BoxContacto').is(':visible')) ? Alto = 252: '';
		    ( (tamanio==252) && (!SalesUp.Variables.FocusActivo) ) ? self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:Alto}) : '';	
		    SalesUp.Variables.FocusActivo = false;
	  	}, 200);
	  	
	}).change(function(){
		self.parent.SalesUp.Sistema.TamanioInicial();
	    var tamanio = self.parent.SalesUp.Variables.TamanioInicial;
	    var Alto = 222;
		($('#BoxContacto').is(':visible')) ? Alto = 252: '';
	    (tamanio==252) ? self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:Alto}) : '';

	});
} /* /SalesUp.Variables.AjustaTamanioHora */

SalesUp.Variables.CrearTarea = function(){
	self.parent.SalesUp.Sistema.TamanioInicial();
	SalesUp.Variables.TamanioPop = self.parent.SalesUp.Variables.TamanioInicial;
	SalesUp.Variables.TamanioPopActual = SalesUp.Variables.TamanioPop;
	SalesUp.Sistema.CambiarTamanioPopUp({Alto:SalesUp.Variables.TamanioPop});

	setTimeout(function(){
		SalesUp.Variables.LtUsuario();
		SalesUp.Variables.Contacto();
		SalesUp.Variables.UltimaFecha();
		
		$('.LtParaQuien .selectize-input.items.not-full.has-options > input').focus();
		$('.selectize-dropdown.LtParaQuien').hide();
		$('.LtParaQuien .selectize-input.items.not-full.has-options > input').keyup(function(e){
			if(SalesUp.Sistema.NumKeyCode(e)!=13) $('.selectize-dropdown.LtParaQuien').show();
		});
		
		//$('input[placeholder][activarplace], textarea[placeholder][activarplace]').floatlabel({labelClass:'FondoLabela80'});
		$('#Hora').clockpicker({ placement:'left', align:'right', autoclose:true, 'default':'now' });
		(SalesUp.Variables.FechaFin) ? $('#Vence').val(SalesUp.Variables.FechaFin) : '';

		((SalesUp.Variables.HoraFin!='0:0')&&(SalesUp.Variables.HoraFin!='')) ? $('#Hora').val(SalesUp.Variables.HoraFin) : '';

		SalesUp.Variables.AjustaTamanioHoraCrear();

	}, 10);
}/*SalesUp.Variables.CrearTarea*/

SalesUp.Variables.EditarTarea = function(){
	SalesUp.Variables.SelectUsuarios();
	var InfoTarea = self.parent.SalesUp.Variables.jsonVerTareas.jsonDatos.Detalle;
	
	setTimeout(function() {
		$('#Asunto').val(InfoTarea.Asunto);
		$('#Vence').val(InfoTarea.VenceEl);
		$('#Hora').val(InfoTarea.VenceHora);
		$('#ParaQuien').val(InfoTarea.IdRealizador);
		
		//$('input[placeholder][activarplace], textarea[placeholder][activarplace]').floatlabel({labelClass:'FondoLabela80'});
		$('#Hora').clockpicker({ placement:'left', align:'right', autoclose:true, 'default':'now' });
		SalesUp.Variables.AjustaTamanioHora();
		
	}, 100);
} /*SalesUp.Variables.EditarTarea*/

SalesUp.Variables.Cambio = function(Op){
	(Op.vence) ? $('#Vencimiento').val(1):'';
	(Op.para) ? $('#Responsable').val(1):'';
}



$(function(){
	if(SalesUp.Variables.Editar){
		SalesUp.Variables.EditarTarea();
	}else{
		SalesUp.Variables.CrearTarea();
	}
});
