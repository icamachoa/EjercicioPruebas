"use strict";
var descartar = function() {
	var tkp;
	var tko;
	var origen;
	var tipo;
	var tipoMsg;
	var template;
	var msg;
	var callback;

	this.AlertaDescartar = function(){
		SalesUp.Construye.MuestraAlerta({
			TipoAlerta:'AlertaPregunta',
			Alerta:'<i class="fa fa-exclamation-triangle fa-2x Rojo "></i> <br/> <span>¿Está seguro de descartar este ' + tipoMsg + ' Se eliminarán todas las ' + msg +' de este ' + tipoMsg + '.</span></div>',
			Boton1:'Descartar',
			Callback1:'SalesUp.Variables.descartar.AlertaReconfirmarDescartar',
			Icono1:'<i class="fa fa-trash-o"></i>',
			Ancho: '400px'
		});
	};
    
    this.AlertaReconfirmarDescartar = function(){
		SalesUp.Construye.MuestraAlerta({
			TipoAlerta:'AlertaPregunta',
			Alerta:'<i class="fa fa-exclamation-triangle fa-2x Rojo "></i> <br/> <span> ¿Confirma la acción de descartar este ' + tipoMsg + '?</span> ',
			Boton1:'Descartar', Icono1:'<i class="fa fa-trash-o"></i>',
			Callback1:'SalesUp.Variables.descartar.guardar',
			Boton2:'Cancelar', Ancho: '400px'
		});
    };

	this.validar = function(Parametros) {
		if($('#razones').val() != '') {
			if(tipoMsg == 'prospecto'){
				if(SalesUp.Variables.prospectoCanalizado.NUM_OP) {
					SalesUp.Variables.descartar.AlertaDescartar();	
				} else {
					SalesUp.Variables.descartar.guardar();
				}
			} else {
				SalesUp.Variables.descartar.AlertaDescartar();
			}
		} else {
			SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Msg:'Debe seleccionar una <strong>razon</strong>' });
		}
	};

	this.mostrarPopup = function(Parametros) {
		tkp = Parametros.tkp;
		tko = Parametros.tko || '';
		origen = Parametros.origen;
		tipo = Parametros.tipo;
		callback = (Parametros.callback) ? Parametros.callback : '';

		//SalesUp.Variables.accionesComunes.obtenerListaRazonesDescartar(Parametros.tipo);
		//SalesUp.Variables.accionesComunes.obtenerInfoProspectoCanalizado(Parametros.tkp);
		var ltRazones = SalesUp.Sistema.CargaDatos({
			Link:'_jsonRazones.dbsp',
			Parametros: 'tipo=' + Parametros.tipo,
			DataType:'json'
		});

		SalesUp.Variables.ltRazones = _.reject(ltRazones.JsonDatos, function(j) { return _.size(j) == 0; });
		
		var prospectoCanalizado = SalesUp.Sistema.CargaDatos({
			Link:'/privado/Modelo/jsonProspectoCanalizado.dbsp',
			Parametros: 'tkp=' + tkp,
			DataType:'json'
		});

		SalesUp.Variables.prospectoCanalizado = prospectoCanalizado.jsonDatos[0];

		SalesUp.Construye.MuestraPopUp({
			alto:'150px', ancho:'400px', centrado:false, id:'popDescartarContacto',
			titulo: Parametros.titulo,
			fuente:'/privado/Vista/popups/popup_descartar.dbsp'
		});

		setTimeout(function(){
			if(tipo == 2){
				$('#BtnAceptar').attr('onclick', "SalesUp.Variables.descartar.guardar();");
				template = 'popup_descartar_oportunidad_guardar';
				if(SalesUp.Variables.prospectoCanalizado.NUM_OP == 1){
					$('#ocontainer').show();	
				}
			} else {
				if(origen == 'prospectos' || origen == 'pvisualizar'){
					tipoMsg = 'prospecto';
					msg = 'oportunidades';
					template = 'prospectos_descartar';
				} else {
					tipoMsg = 'cliente';
					msg = 'ventas y cobros, y se descartarán todas las oportunidades';	
					template = 'clientes_descartar';
				}			
			}
			SalesUp.Variables.accionesComunes.agregarElementoRazonesDescartar();
			SalesUp.Variables.accionesComunes.crearListaRazonesDescartar(SalesUp.Variables.ltRazones, 150, 255);
		}, 1000);
	};

	this.guardar = function() {
		var datos = new FormData();
		datos.append('tkp', tkp);
		datos.append('tkrazon', $('#razones').val());
		datos.append('comentario', $('#razon').val());

		/* Oportunidad */
		if(tipo == 2){
			datos.append('tko', tko);
			datos.append('EnviaActivado', $('#activado:checked').length);
		}

		var oc = $('#BtnAceptar').attr('onclick');
		var html = $('#BtnAceptar').html();
		$('#BtnAceptar').html('<i class="fa fa-spinner fa-spin"></i> Guardando');
		$('#BtnAceptar').attr('onclick','');

		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/' + template + '.dbsp',
			parametros: datos, formData: true, metodo: 'POST',
			callback: function() {
				SalesUp.Construye.CierraPopUp({t: '#BtnCancelar'});
				if(origen == 'pvisualizar' || origen == 'ovisualizar' || origen == 'cvisualizar'){
					Recarga();
				} else {
					if(callback){
						SalesUp.Sistema.Almacenamiento({a:'seDescarto',v:1})
						callback();
 					}else{
						ReloadData();
					}
					
				}
			}
		});
	};
}

$(function(){
	SalesUp.Variables.descartar = new descartar();
});