"use strict";
var reasignarMultiple = function() {
	var listaProspectos;
	var template;
	var token;
	var msg;
	var callback;

	this.mostrarPopup = function(Parametros) {
		SalesUp.Variables.sMaxItems = false;
		Parametros.origen = 0;
		SalesUp.Variables.accionesComunes.obtenerListaUsuariosGruposAutorizados(Parametros);
		callback = Parametros.callback || ReloadData;
		
		listaProspectos = SalesUp.Variables.accionesComunes.obtenerTotalRegistros('tk');
		template = Parametros.template;
		token = Parametros.token;
		msg = Parametros.msg;

		SalesUp.Construye.MuestraPopUp({
			alto:'320px', ancho:'500px', centrado:false, id:'popReasignarVarios',
			titulo: Parametros.titulo,
			fuente:'/privado/Vista/popups/popup_reasignar_varios.dbsp'
		});

		setTimeout(function() {
			var Msgs = ['el/los prospecto(s)', 'la/las oportunidad(es)'];

			$('#tipo').text(Msgs[msg]);
			$('#totalProspectos').text(listaProspectos.length);
		}, 1000)
	};

	this.guardar = function() {
		var datos = new FormData();
		datos.append(token, listaProspectos.join(','));
		datos.append('tku', $('#idusuario').val());
		datos.append('comentario', $('#comentario').val());
	
		var oc = $('#BtnAceptar').attr('onclick');
		var html = $('#BtnAceptar').html();
		$('#BtnAceptar').html('<i class="fa fa-spinner fa-spin"></i> Guardando');
		$('#BtnAceptar').attr('onclick','');

		if($('#idusuario').val() == ''){
			SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Msg:'Debe seleccionar un <strong>ejecutivo</strong>' });
			$('#BtnAceptar').html(html);
			$('#BtnAceptar').attr('onclick',oc);
		} else {
			SalesUp.Sistema.CargaDatosAsync({
				link: '/privado/popup_asignar_' + template + '.dbsp',
				parametros: datos, formData: true, metodo: 'POST',
				callback: function() {
					SalesUp.Construye.CierraPopUp({t: '#BtnCancelar'});
					callback();
				}
			});
		}
	};
}

$(function() {
	SalesUp.Variables.reasignarMultiple = new reasignarMultiple();
});