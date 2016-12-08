"use strict";
var cambiarOrigenMultiple = function() {
	var listaProspectos;

	this.mostrarPopup = function(Parametros) {
		listaProspectos = SalesUp.Variables.accionesComunes.obtenerTotalRegistros('tkp');
		//SalesUp.Variables.accionesComunes.obtenerListaOrigen({tConsulta: 1});
		var ltOrigen = SalesUp.Sistema.CargaDatos({
			Link:'/privado/Modelo/jsonOrigen.dbsp', 
			Parametros: 'tConsulta=1',
			DataType:'json'
		});

		SalesUp.Variables.ltOrigen = (SalesUp.Variables.hayCanalizados > 0) ? _.reject(ltOrigen.jsonDatos, function(item) { return item.esCanalizado == "0"; }) : ltOrigen.jsonDatos;

		SalesUp.Construye.MuestraPopUp({
			alto:'175px', ancho:'500px', centrado:false, id:'popOrigenMultiples',
			titulo: Parametros.titulo,
			fuente:'/privado/Vista/popups/popup_cambiar_origen_varios.dbsp'
		});

		setTimeout(function(){
			$('#totalRegistros').text(listaProspectos.length);
			SalesUp.Variables.accionesComunes.crearListaOrigen(SalesUp.Variables.ltOrigen);
		},1000);
	};

	this.guardar = function() {
		if($('#origen').val() != ''){
			var datos = new FormData();
			datos.append('tkp', listaProspectos.join(','));
			datos.append('tkorig', $('#origen').val());

			var oc = $('#BtnAceptar').attr('onclick');
			var html = $('#BtnAceptar').html();
			$('#BtnAceptar').html('<i class="fa fa-spinner fa-spin"></i> Guardando');
			$('#BtnAceptar').attr('onclick','');

			SalesUp.Sistema.CargaDatosAsync({
				link: '/privado/Modelo/qryCambiaOrigen.dbsp',
				parametros: datos, formData: true, metodo: 'POST',
				callback: function() {
					SalesUp.Construye.CierraPopUp({t: '#BtnCancelar'});
					ReloadData();
				}
			});
		} else {
			SalesUp.Construye.MuestraMsj({tMsg:4,Msg:'Seleccione el origen nuevo.',Destino:'#popOrigenMultiples'});
			$('#BtnAceptar').html(html);
			$('#BtnAceptar').attr('onclick',oc);
		}
	};
};

$(function() {
	SalesUp.Variables.cambiarOrigenMultiple = new cambiarOrigenMultiple();
});