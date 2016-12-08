SalesUp.Variables.CambiaPredeterminado = function(obj){
    var $check      = $(obj.elemento);
    var isChecked   = $check.is(':checked');
    
    if(isChecked){
        $check.val(1);
    }else{
        $check.val(0);
    }
};

SalesUp.Variables.CargaDatosCuenta = function(){
	var idusuariocorreo	= $('#idusuariocorreo').val();
	var objtDatos		= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryDatosCuenta.dbsp',Parametros:'idusuariocorreo='+idusuariocorreo,DataType:'json'}).jsonDatos[0];

	$('#email').val(objtDatos.EMAIL);
	$('#firmavalue').val(objtDatos.FIRMA);
	$('#cco').val(objtDatos.CCO);

	if(objtDatos.PREDETERMINADO == 1){
		$('#Predeterminado').val(1);
		$('#Predeterminado').prop('checked', true);
	}else{
		$('#Predeterminado').val(0);
		$('#Predeterminado').prop('checked', false);
	}
};

SalesUp.Variables.ModificaCuenta = function(){
	var firmavalue 	= tinyMCE.get("firmavalue").getContent();
	$('#firma').val(firmavalue);

    var qryString = SalesUp.Sistema.qryString({Formulario:$('#frmCuentasCorreos')});
    SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/popup-modificar-cuenta-guarda.dbsp',Parametros:qryString});
    SalesUp.Variables.popupActual.find('.MensajeGuardando').addClass('Verde').html('Guardado <i class="icoGuarando fa fa-lg fa-check"></i>');
    SalesUp.Sistema.BorrarItemDeAlmacen('htmlFirma');
    SalesUp.Construye.CierraPopUp({t:$('#frmCuentasCorreos')});
    SalesUp.Variables.CargaInterfaz();
};

$(function(){
    ActivaTinyFirma();
    SalesUp.Variables.CargaDatosCuenta();
});
