"use strict";
var compartir = function() {
	var tkp;
	var tkcom;
	var tipo;
	var compartirParams;
	var callback;
	var oc, html;

	this.mostrarPopup = function(Parametros) {
		SalesUp.Variables.sMaxItems = true;
		//SalesUp.Variables.accionesComunes.obtenerUsuariosCompartidosDelProspecto(Parametros);
		tkp = Parametros.tkp;
		tkcom = Parametros.tkcom;
		callback = Parametros.callback || ReloadData;

		var infUsuariosCompartidos = SalesUp.Sistema.CargaDatos({
			Link:'/privado/Modelo/jsonObtenerUsuariosCompartidosDelProspecto.dbsp',
			Parametros: 'tkp=' + tkp + '&tkcom=' + tkcom,
			DataType:'json'
		});

		var infUsuariosCompartidos = infUsuariosCompartidos.jsonDatos;
		SalesUp.Variables.listaUsuariosCompartidos = [];

		for(var i = 0; i < infUsuariosCompartidos.length; i++){
			SalesUp.Variables.listaUsuariosCompartidos.push(infUsuariosCompartidos[i].IDUSUARIO);			
		}

		SalesUp.Construye.MuestraPopUp({
			alto:'300px', ancho:'500px', centrado:false, id:'popCompartirContacto',
			titulo: Parametros.titulo,
			fuente:'/privado/Vista/popups/popup_compartir.dbsp'
		});

		setTimeout(function(){
			$('#tipo').text(Parametros.seccion);
			Parametros.items = SalesUp.Variables.listaUsuariosCompartidos;
			Parametros.origen = 1;
			SalesUp.Variables.accionesComunes.obtenerListaUsuariosGruposAutorizados(Parametros);
		}, 1000);
	};

	this.reestablecerForm = function() {
		$('#BtnAceptar').html(html);
		$('#BtnAceptar').attr('onclick',oc);
	};

	this.validarOportunidades = function(){
		oc = $('#BtnAceptar').attr('onclick');
		html = $('#BtnAceptar').html();
		$('#BtnAceptar').html('<i class="fa fa-spinner fa-spin"></i> Guardando');
		$('#BtnAceptar').attr('onclick','');

		var datos = new FormData();
		datos.append('tkp', tkp);
		datos.append('LISTAANTERIOR', SalesUp.Variables.listaUsuariosCompartidos.join(','));
		datos.append('LISTANUEVA', $('#idusuario').val());
		datos.append('tku', 1);

		compartirParams = datos;
		SalesUp.Variables.accionesComunes.obtenerInfoListaOportunidades(compartirParams);

		setTimeout(function(){
			if(SalesUp.Variables.TienenOportunidades != 0){
				SalesUp.Construye.MuestraAlerta({
					TipoAlerta:'AlertaPregunta',
					Alerta:'<h2>Atención</h2><br/>Las oportunidades y ventas del usuario serán reasignadas al dueño del prospecto, ¿Esta usted de acuerdo?<br/>',
					Boton1:'Si',
					Boton2:'Cancelar',
					Callback1:'SalesUp.Variables.compartir.guardar',
					Callback2: 'SalesUp.Variables.compartir.reestablecerForm',
					Icono1:'<i class="fa fa-save"></i>'
			  	});
			} else {
				SalesUp.Variables.compartir.guardar();	
			}
		}, 500);
	};

	this.guardar = function() {
		
				
		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/popup_compartir_prospecto_agregar.dbsp',
			parametros: compartirParams, formData: true, metodo: 'POST',
			callback: function(){
				SalesUp.Construye.CierraPopUp({t: '#BtnCancelar'});
				callback();
			}
		});
	};
}

$(function(){
	SalesUp.Variables.compartir = new compartir();
});