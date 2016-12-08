var Vent = {};
$.ajaxSetup({ async:false, 'beforeSend' : function(xhr) { xhr.overrideMimeType('text/html; charset=iso-8859-1'); } });
$.getScript( '/scripts/FuncionesNuevas/Sistema.js', function(){ Vent.Sistema = new SistemaDefault(); });
$.getScript( '/scripts/FuncionesNuevas/Validaciones.js', function(){ Vent.Valida = new Validaciones(); });
$.ajaxSetup({async:true});
$(function() {
	$('input:first, select:first').focus();
});

