SalesUp.Variables.EnviaForm = function(){
	var _pasa = SalesUp.Valida.ValidaObligatorios();

	if(_pasa){
		$('#frmLista').submit();
	}
};

SalesUp.Variables.CargaDatos = function(_tk){
	var datos	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCargaListaPrecios.dbsp',Parametros:'tk='+_tk,DataType:'json', Div:0}).jsonDatos[0];

	$('#nombre').val(datos.NOMBRE);
	$('#indice').val(datos.INDICE).prop('disabled',true);
	$('#idmoneda').val(datos.IDMONEDA);

	setTimeout(function(){$('#nombre').select();},100);
};

$(document).ready(function() {
	var _tk			= $('#tk').val();
	var jsonMonedas	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonMonedas.dbsp', Parametros:'tk='+_tk,DataType:'json', Div:0});
	var length 		= jsonMonedas.jsonDatos.length;
	
	for (var i = 0; i < length; i++) {
		var _datoActual = jsonMonedas.jsonDatos[i];

		if(!_.isUndefined(_datoActual.IDMONEDA)){
			$('#idmoneda').append('<option value="'+_datoActual.IDMONEDA+'">'+_datoActual.MONEDA+'</option>');
		}else{
			$('#idmoneda').append('<option value="">No hay monedas disponibles</option>');
		}
	};

	if(length == 1){
		//$('#idmoneda').hide();
	}

	var jsonIndice	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonIndices.dbsp', Parametros:'tk='+_tk, DataType:'json', Div:0}).jsonDatos;
	var lengthIndice = jsonIndice.length;

	for (var i = 0; i < lengthIndice; i++) {
		var _datoActual = jsonIndice[i];
		$('#indice').append('<option value="'+_datoActual.INDICE+'">'+_datoActual.INDICE+'</option>');
	};

	if(_tk != 0){SalesUp.Variables.CargaDatos(_tk);}

	setTimeout(function(){$('#nombre').focus();},100);
});
