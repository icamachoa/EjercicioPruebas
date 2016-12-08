"use strict";
var accionesMultiplesMenu = function() {
	var menuActivo = false;
	var TemplatePopover = '<div class="popover PopOverAcciones" id="opcMult" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>';
	var cnt;

	var validaCerrarPopover = function() {
		setTimeout(function(){
			$('#opcMult').click(function(e){
				$(this).hide();
			}).mouseleave(function(e){
				setTimeout(function(){
					if($("#opcMult:hover").length == 0) $('#opcMult').hide();
				}, 1000);
			});
		}, 1000);
	};

	var showMenuOpcMultiples = function() {
		var Cerrar = false;
		if($('#opcMult').length){
			$('#opcMult').show();
			validaCerrarPopover();
			/*
			setTimeout(function(){
				if($("#opcMult:hover").length == 0){
					$('#opcMult').hide();
				}
			}, 1000);
			*/
		} else {
			$('.VerLtOpcionesMultiples.Tip2')
			.popover({
				container: 'body',
				html: true,
				content: $('#menuOpcMultiples').html(),
				template: TemplatePopover, 
				trigger: 'manual'
			}).click(function(e){
				e.preventDefault();
				e.stopPropagation();
			}).click(function(e){
				if(SalesUp.Variables.accionesComunes.obtenerTotalRegistros('tkp', cnt).length > 0){
					$(this).popover('show');
					validaCerrarPopover();
				}
			}).mouseleave(function(e){
				setTimeout(function(){
					if($("#opcMult:hover").length == 0){
						$('#opcMult').hide();
					}
				}, 1000);
			});
		}
	};

	var muestraAlertaNoRegistros = function() {
		SalesUp.Construye.MuestraAlerta({
			TipoAlerta: 'AlertaModal', 
			Alerta: '<p class="tCen fa-lg"><i class="fa fa-info-circle fa-2x"></i><br><br><b>Debe seleccionar al menos un registro.</b></p>', 
			Ancho: '400px', Alto: '100px'
		});
	};

	this.validaSeleccionados = function(Parametros) {
		cnt = (Parametros) ? Parametros.container : '';
		var t = SalesUp.Variables.accionesComunes.obtenerTotalRegistros('tkp', cnt);
		if(t.length == 0){
			muestraAlertaNoRegistros();
		} else {
			showMenuOpcMultiples();
   		}
	};
}

$(function() {
	SalesUp.Variables.accionesComunes.accionesMultiplesMenu = new accionesMultiplesMenu();
});