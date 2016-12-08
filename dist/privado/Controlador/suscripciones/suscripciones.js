"use strict";
var suscripciones = function(){ 
	this.mostrarPopup = function() {
		SalesUp.Construye.MuestraPopup({
			alto:'235px', ancho:'500px', centrado:false, id:'popSuscripciones',
			titulo: 'Agregar susccripción',
			fuente:'/privado/Vista/popups/popup_suscripciones.dbsp'
		});
	};
}

$(function() {
	SalesUp.Variables.suscripciones = new suscripciones();
});
