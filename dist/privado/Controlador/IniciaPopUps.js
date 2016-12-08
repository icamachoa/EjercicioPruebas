SalesUp.Sistema.MuestraEspera('',4);
SalesUp.Sistema.ModulosActivos();

setTimeout(function(){
	
	if(!SalesUp.Sistema.Dispositivo({Es:'ios'})){return false;}

	var $TB_window = self.parent.$('#TB_window');
	var w = $TB_window.width();
	var $TB_iframeContent = self.parent.$('#TB_iframeContent');
	var w2 = $TB_iframeContent.width();
	$TB_window.css('width',w+1+'px');
	$TB_iframeContent.css('width',w2+1+'px');

}, 1500);

$(function(){
	
	$('form').submit(function(){ SalesUp.Sistema.MuestraEspera('',4); });
	setTimeout(function(){$('input[autofocus="true"]').focus();}, 100);
	setTimeout(function(){ 
		SalesUp.Sistema.ColoresTema(); 
		$('.BoxBotonesAccion').show();
		SalesUp.Sistema.OcultarOverlay();
	}, 500);
	SalesUp.Sistema.IniciaPlugins();

	var arrBoxbtn=$('.BoxBotonesAccion'); 
	arrBoxbtn.removeClass('BoxBotonesAccion');
	setTimeout(function() {arrBoxbtn.addClass('BoxBotonesAccion');}, 100);
});
