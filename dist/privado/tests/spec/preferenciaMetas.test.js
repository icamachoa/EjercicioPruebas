var testing = (window.opener != null) ? window.opener.test : null, arrTest = [], respTest;

$(document).ready(function(){
	creaMetas(8,26,15);
});

var creaMetas = function(periodo,componente,meta){
	SalesUp.Sistema.AbrePopUp({Titulo:'Crear meta',Pagina:'/privado/PopupCrearMeta.dbsp', CallBack:'GetData',Alto:270,Ancho:600});
	setTimeout(function(){

		var $formulario = $('#TB_iframeContent').contents().find('#AgregarMeta');

		$formulario.find('#Periodo').val(periodo).change();
		$formulario.find('#Componente').val(componente);

		var nombreMeta = $formulario.find('#Componente option:selected').text();

		$formulario.find('#Titulo').val(nombreMeta);
		$formulario.find('#durante').val(1).change();
		$formulario.find('#Tipo').val(1).change();

		setTimeout(function(){
			$formulario.find('.tdMetas>input').val(15000).change();
			setTimeout(function(){
				$formulario.find('#BtnAceptar').click();
			},2000);
		},2000);
	},4000);
}