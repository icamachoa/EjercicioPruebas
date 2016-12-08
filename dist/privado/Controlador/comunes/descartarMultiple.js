"use strict";
var descartarMultiple = function() {
	var listaProspectos;
	var listaOportunidades;
	var tipo;
	var template;
	var callback;

	this.descartarVentas = function() {
		//PENDIENTE MODIFICAR EL PROCESO DE DESCARTAR VENTAS MULTIPLES
		TotalIdVenta = TotalIdVenta.substring(1);
		$('#IdSeleccionado').val(TotalIdVenta);
		Alertas[descartarventa].apply(this,[this]);
	};

	this.mostrarPopup = function(Parametros) {
		tipo = Parametros.tipo;
		//SalesUp.Variables.accionesComunes.obtenerListaRazonesDescartar(tipo);
		var ltRazones = SalesUp.Sistema.CargaDatos({
			Link:'_jsonRazones.dbsp',
			Parametros: 'tipo=' + Parametros.tipo,
			DataType:'json'
		});

		SalesUp.Variables.ltRazones = _.reject(ltRazones.JsonDatos, function(j) { return _.size(j) == 0; });

		listaProspectos = SalesUp.Variables.accionesComunes.obtenerTotalRegistros('tkp', Parametros.container);
		
		//SalesUp.Variables.accionesComunes.obtenerInfoProspectoCanalizado({listap: listaProspectos.join(','), ltkp: 1});
		var datos = new FormData();
		datos.append('ltkp', 1);
		datos.append('listap', listaProspectos.join(','));

		var prospectoCanalizado = SalesUp.Sistema.CargaDatos({
			Link:'/privado/Modelo/jsonProspectoCanalizado.dbsp',
			Parametros: datos,
			FormData: true,
			DataType:'json'
		});

		SalesUp.Variables.prospectoCanalizado = prospectoCanalizado.jsonDatos[0];

		callback = (Parametros.callback) ? Parametros.callback : '';
		if(tipo == 2){
			listaOportunidades = SalesUp.Variables.accionesComunes.obtenerTotalRegistros('tk');
		}

		SalesUp.Construye.MuestraPopUp({
			alto:'175px', ancho:'500px', centrado:false, id:'popDescartarMultiples',
			titulo: Parametros.titulo,
			fuente:'/privado/Vista/popups/popup_descartar_varios.dbsp'
		});

		setTimeout(function(){
			$('#totalRegistros').text(listaProspectos.length);
			SalesUp.Variables.accionesComunes.agregarElementoRazonesDescartar();
			SalesUp.Variables.accionesComunes.crearListaRazonesDescartar(SalesUp.Variables.ltRazones, 175, 300);
		}, 1000);
	};

	this.guardar = function() {
		var datos = new FormData();
		datos.append('tkrazon', $('#razones').val());
		datos.append('comentario', $('#razon').val());

		var oc = $('#BtnAceptar').attr('onclick');
		var html = $('#BtnAceptar').html();
		$('#BtnAceptar').html('<i class="fa fa-spinner fa-spin"></i> Guardando');
		$('#BtnAceptar').attr('onclick','');
		
		if(tipo == 1){
			datos.append('tkp', listaProspectos.join(','));
			template = 'prospectos_descartar';	
		} else {
			datos.append('tko', listaOportunidades.join(','));
			template = 'popup_descartar_oportunidad_guardar_varios';
		}

		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/' + template + '.dbsp',
			parametros: datos, formData: true, metodo: 'POST',
			callback: function() {
				SalesUp.Construye.CierraPopUp({t: '#BtnCancelar'});
				if(callback){
					SalesUp.Sistema.Almacenamiento({a:'seDescarto',v:1})
					callback();
				}else{
					ReloadData();
				}
			}
		});
	};	
}

$(function() {
	SalesUp.Variables.descartarMultiple = new descartarMultiple();
});