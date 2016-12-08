"use strict";
var etiquetarMultiple = function() {
	var listaProspectos;
	var template;
	var trAbierto;
	var tkcom;
	var tkpe;
	var callback;

	this.mostrarPopup = function(Parametros) {
		//SalesUp.Variables.accionesComunes.obtenerListaEtiquetas();
		var etiquetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonLtEtiquetas.dbsp', DataType:'json'});
		SalesUp.Variables.etiquetas = etiquetas.jsonDatos;

		trAbierto = 0;
		tkcom = Parametros.tkcom;
		callback = Parametros.callback || ReloadData;

		if(Parametros.origen == 'contactos'){
			listaProspectos = SalesUp.Variables.accionesComunes.obtenerTotalRegistros('tkp');
		} else {
			//En caso de venir de empresas tenemos que cargar los usuarios de dicha empresa
			var params = {};
			params.tkcom = tkcom;
			params.IdVentana = 1;
			listaProspectos = [];
			SalesUp.Sistema.CargaDatosAsync({
				link: '/privado/Modelo/json' + Parametros.template + 'Return.dbsp',
				parametros: params,
				callback: function(result) {
					for(var i=0; i < result.JsonDatos.length; i++){
						listaProspectos.push(result.JsonDatos[i].TKP);
					}
				}
			});
		}
		
		
		var ConstruyePopUp = function(html){
			html = SalesUp.Construye.ReemplazaDatos({Template:html,Datos:' '});
			SalesUp.Construye.MuestraPopUp({
				alto:'265px', ancho:'500px', centrado:false, id:'popEtiquetarVarios',
				titulo: Parametros.titulo,
				contenido: html
			});

			setTimeout(function() {
				$('#totalRegistros').text(listaProspectos.length);

				if(Parametros.origen == 'empresas'){
					var isOpen = _.size($('#PutData_' + tkcom));
					if(isOpen == '1') {
						trAbierto = 1;
					}
				}
				SalesUp.Variables.accionesComunes.crearListaEtiquetas('',true);
			}, 1000);
		}

		SalesUp.Sistema.CargaDatosAsync({
			link:'/privado/Vista/popups/popup_etiquetar_varios.dbsp',
			dataType:'html',
			callback:ConstruyePopUp
		})
	};

	this.guardar = function() {
		//Agregamos las nuevas etiquetas
		var datos = new FormData();
		datos.append('lista_prosp', listaProspectos.join(','));
		datos.append('lista_etq', $('#etiquetas').val());
		datos.append('tkPe', tkpe);
		datos.append('tkCom', tkcom);
		datos.append('abierto', trAbierto);
		datos.append('operacion', $('input[name="operacion"]:checked').val());
		datos.append('tketiq', 1);

		var oc = $('#BtnAceptar').attr('onclick');
		var html = $('#BtnAceptar').html();
		$('#BtnAceptar').html('<i class="fa fa-spinner fa-spin"></i> Guardando');
		$('#BtnAceptar').attr('onclick','');

		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/Modelo/jsonProspectosEtiquetarVarios.dbsp',
			parametros: datos, formData: true, metodo:'POST',
			callback: function(){
				SalesUp.Construye.CierraPopUp({t: '#BtnCancelar'});
				if(trAbierto == 1){
					SalesUp.Variables.addtr({tk: tkcom});
				} else {
					callback();
				}
			}
		});
	};
}

$(function() {
	SalesUp.Variables.etiquetarMultiple = new etiquetarMultiple();
});