"use strict";
var reasignar = function() {
	var tipo;
	var seccion;
	var template;
	var callback;
	var tkp;
	var tko;
	var tkcom;
	var conservarOportunidad;
	var tieneOportunidad;

	this.mostrarPopup = function(Parametros) {
		tkcom = Parametros.tkcom;
		callback = Parametros.callback;
		seccion = Parametros.seccion;
		tkp = Parametros.tkp;
		if(Parametros.seccion == 'prospecto'){
			
			tipo = Parametros.origen == 4 ? 'el cliente' : 'el prospecto';
			template = 'popup_asignar_prospecto';
		} else {
			tko = Parametros.tko;
			tipo = Parametros.origen == 4 ? 'el cliente' : 'la oportunidad';
			template = 'popup_asignar_oportunidad';
			Parametros.jsonFile = 'Oportunidad';
		}

		//SalesUp.Variables.accionesComunes.obtenerInfoOportunidades(Parametros);
		var infOportunidades = SalesUp.Sistema.CargaDatos({
			Link:'/privado/Modelo/jsonTieneOportunidad.dbsp',
			Parametros: 'tkp=' + tkp + '&tkcom=' + tkcom,
			DataType:'json'
		});

		infOportunidades = infOportunidades.jsonDatos[0];
		SalesUp.Variables.tieneOportunidad = infOportunidades.tieneOportunidad || 0;
		SalesUp.Variables.conservarOportunidad = infOportunidades.conservarOportunidad || 0;
		SalesUp.Variables.sNivel = infOportunidades.nivel;
		SalesUp.Construye.MuestraPopUp({
			alto:'275px', ancho:'470px', centrado:false, id:'popReasignarContacto',
			titulo: Parametros.titulo,
			fuente:'/privado/Vista/popups/popup_reasignar.dbsp'
		});

		setTimeout(function(){
			$('#tipo').text(tipo);
			if(Parametros.seccion == 'prospecto'){
				if(SalesUp.Variables.tieneOportunidad > 0){
					if(SalesUp.Variables.sNivel == 3){
						if(SalesUp.Variables.conservarOportunidad > 0){
							$('#conservarContainer').append('<label style="background: transparent none repeat scroll 0% 0%; font-style: italic;"><input id="conservar_oportunidades" class="laseleccion" type="checkbox" name="conservar_oportunidades"> Conservar oportunidades</label>');
						}
					} else {
						$('#conservarContainer').append('<label style="background: transparent none repeat scroll 0% 0%; font-style: italic;"><input id="conservar_oportunidades" class="laseleccion" type="checkbox" name="conservar_oportunidades"> Conservar oportunidades</label>');
					}
				}
			} else {
				if( SalesUp.Variables.sNivel == 3){
					if(SalesUp.Variables.conservarOportunidad > 0){
						$('#conservarContainer').append('<label style="background: transparent none repeat scroll 0% 0%; font-style: italic;"><input id="reasignar_oportunidad" class="laseleccion" type="checkbox" name="reasignar_oportunidad"> Compartir pero conservar la propiedad</label>');	
					} else {
						$('#conservarContainer').hide();
						$('#conservarContainer').append('<label style="background: transparent none repeat scroll 0% 0%; font-style: italic;"><input id="reasignar_oportunidad" class="laseleccion" type="checkbox" name="reasignar_oportunidad"> Compartir pero conservar la propiedad</label>');
						$('#conservar_oportunidades').attr('checked', true);	
					}
				} else {
					if(SalesUp.Variables.conservarOportunidad > 0){
						$('#conservarContainer').append('<label style="background: transparent none repeat scroll 0% 0%; font-style: italic;"><input id="reasignar_oportunidad" class="laseleccion" type="checkbox" name="reasignar_oportunidad"> Compartir pero conservar la propiedad</label>');	
					} else {
						$('#conservarContainer').hide();
						$('#conservarContainer').append('<label style="background: transparent none repeat scroll 0% 0%; font-style: italic;"><input id="reasignar_oportunidad" class="laseleccion" type="checkbox" name="reasignar_oportunidad"> Compartir pero conservar la propiedad</label>');
						$('#conservar_oportunidades').attr('checked', true);	
					}
				}
			}
		}, 1000);

		SalesUp.Variables.sMaxItems = false;
		Parametros.origen = 0;
		SalesUp.Variables.accionesComunes.obtenerListaUsuariosGruposAutorizados(Parametros);
	};

	this.guardar = function() {
		var datos = new FormData();
		
		datos.append('tkcom', tkcom);
		datos.append('tku', $('#idusuario').val());
		datos.append('sNivel', SalesUp.Variables.sNivel);
		datos.append('tieneOportunidad', SalesUp.Variables.tieneOportunidad);
		datos.append('comentario', $('#comentario').val());
		
		var oc = $('#BtnAceptar').attr('onclick');
		var html = $('#BtnAceptar').html();
		$('#BtnAceptar').html('<i class="fa fa-spinner fa-spin"></i> Guardando');
		$('#BtnAceptar').attr('onclick','');

		if(seccion == 'prospecto'){
			datos.append('tkp', tkp);
			datos.append('conservar_oportunidades', $('#conservar_oportunidades:checked').length);
		} else {
			datos.append('tko', tko);
			datos.append('reasignar_oportunidad', $('#reasignar_oportunidad:checked').length);
		}

		if($('#idusuario').val() == '') {
	    	SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Msg:'Debe seleccionar un <strong>ejecutivo</strong>' });
	    	$('#BtnAceptar').html(html);
			$('#BtnAceptar').attr('onclick',oc);
	  	} else {
	  		SalesUp.Sistema.CargaDatosAsync({
	  			link: template + '_agregar.dbsp', 
	  			parametros: datos, formData: true, metodo: 'POST', 
	  			callback: function(){
	  				SalesUp.Construye.CierraPopUp({t: '#BtnCancelar'});
	  				callback();
	  			}
	  		});
	  	}
	};
}

$(function() {
	SalesUp.Variables.reasignar = new reasignar();
});