"use strict";
var compartirMultiple = function() {
	var listaProspectos;

	this.mostrarPopup = function(Parametros) {
		listaProspectos = SalesUp.Variables.accionesComunes.obtenerTotalRegistros('tkp');

		var ConstruyePopUp = function(html){
			html = SalesUp.Construye.ReemplazaDatos({Template:html,Datos:' '});
			SalesUp.Construye.MuestraPopUp({
				alto:'300px', ancho:'500px', centrado:false, id:'popCompartirVarios',
				titulo: Parametros.titulo,
				contenido: html
			});
	
			setTimeout(function() {
				$('#totalRegistros').text(listaProspectos.length);

			}, 1000);
	
			SalesUp.Variables.sMaxItems = true;
			Parametros.multiple = true;
			Parametros.origen = 1;
			SalesUp.Variables.accionesComunes.obtenerListaUsuariosGruposAutorizados(Parametros);
		}
		SalesUp.Sistema.CargaDatosAsync({
			link:'/privado/Vista/popups/popup_compartir_varios.dbsp',
			dataType:'html',
			callback:ConstruyePopUp
		})
	};

	this.guardar = function() {
		var datos = new FormData();
		datos.append('listap', listaProspectos.join(',')); 					 //Prospectos
		datos.append('tkpe', 1);											 //Mandamos los tokens de prospectos
		datos.append('listaNueva', $('#idusuario').val());		 			 //Usuarios
		datos.append('tku', 1);												 //Mandamos los tokens de usuarios	
		datos.append('operacion', $('input[name="operacion"]:checked').val());

		var oc = $('#BtnAceptar').attr('onclick');
		var html = $('#BtnAceptar').html();
		$('#BtnAceptar').html('<i class="fa fa-spinner fa-spin"></i> Guardando');
		$('#BtnAceptar').attr('onclick','');
		
		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/Modelo/jsonProspectosCompartirVarios.dbsp',
			parametros: datos, formData: true, metodo: 'POST',
			callback: function() {
				SalesUp.Construye.CierraPopUp({t: '#BtnCancelar'});
				ReloadData();
			}
		});
	};
}

$(function() {
	SalesUp.Variables.compartirMultiple = new compartirMultiple();
});