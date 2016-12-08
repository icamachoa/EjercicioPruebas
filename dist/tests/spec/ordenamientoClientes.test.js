describe('Test ordenamientos pantalla clientes',function(){
	
	var opciones = [];

	$(document).ready(function(){
	
		$('#ConfigurarPantalla').click()
		var $frame = $('#TB_iframeContent').contents();
		var $select = $('#TB_iframeContent').contents().find('#Columnas option');
		opciones = $.map($select , function(opcion){
		  return opcion.value;
		});
		console.log(opciones);
	});

});