"use strict";
var etiquetar = function() {
	var callback;
	var tkp;
	var tkcom;

	this.mostrarPopup = function(Parametros) {
		callback = Parametros.callback;
		tkp = Parametros.tkp;
		tkcom = Parametros.tkcom;
		SalesUp.Variables.etiquetasUsuario = '';
		
		//SalesUp.Variables.accionesComunes.obtenerListaEtiquetas();
		//SalesUp.Variables.accionesComunes.obtenerDatosProspecto(Parametros);
		var etiquetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonLtEtiquetas.dbsp', DataType:'json'});
		SalesUp.Variables.etiquetas = etiquetas.jsonDatos;

		var datosProspecto = SalesUp.Sistema.CargaDatos({
			Link:'/privado/Modelo/jsonDatosProspecto.dbsp',
			Parametros: 'tkp=' + tkp,
			DataType:'json'
		});

		datosProspecto = datosProspecto.jsonDatos[0];
		var nombreProspecto = datosProspecto.Nombre + ' ' + (datosProspecto.Apellidos || '');
		var empresa = datosProspecto.Empresa;
		SalesUp.Variables.etiquetasUsuario = datosProspecto.TEtiquetas;

		SalesUp.Construye.MuestraPopUp({
			alto:'235px', ancho:'500px', centrado:false, id:'popEtiquetarContacto',
			titulo: 'Etiquetar prospecto como parte de un segmento',
			fuente:'/privado/Vista/popups/popup_etiquetar.dbsp'
		});

		setTimeout(function(){
			$('#nombreUsuario').text(nombreProspecto);
			if(empresa != null && empresa != undefined && empresa != ''){
				$('#frmEtiquetas > table').append('<tr><th width="80">Empresa</th><td id="empresa"><i class="fa fa-building-o"></i> ' + empresa +'</td></tr>');
			}			
			SalesUp.Variables.accionesComunes.crearListaEtiquetas(SalesUp.Variables.etiquetasUsuario.split(','));
		}, 1000);
	};

	this.guardar = function() {
		//Agregamos las nuevas etiquetas
		var datos = new FormData();
		datos.append('tkp', tkp);
		datos.append('tkcom', tkcom);
		datos.append('etiquetas', $('#etiquetas').val());
		datos.append('etiquetasiniciales', SalesUp.Variables.etiquetasUsuario);
		datos.append('nuevasEtiquetas', $('#etiquetas').val());
		datos.append('tketiq', 1); //0 si es lista de IDS 1 si es lista de TOKENS
		
		var oc = $('#BtnAceptar').attr('onclick');
		var html = $('#BtnAceptar').html();
		$('#BtnAceptar').html('<i class="fa fa-spinner fa-spin"></i> Guardando');
		$('#BtnAceptar').attr('onclick','');
		
		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/popup_etiqueta_prospectos_guarda.dbsp',
			parametros: datos, formData: true, metodo: 'POST',
			callback: function(){
				SalesUp.Construye.CierraPopUp({t: '#BtnCancelar'});
  				callback();
			}
		});
	};
}

$(function() {
	SalesUp.Variables.etiquetar = new etiquetar();
});