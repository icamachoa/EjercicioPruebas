
var testing = (window.opener != null) ? window.opener.test : null, arrTest = [], respTest;

describe('Test convierte monto a moneda default',function(){
	var moneda = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/traeIdmonedayMonto.dbsp',DataType:'json'}).jsonDatos;

	var idmoneda = moneda.IDMONEDA;
	var tipoCambio = moneda.TIPOCAMBIO;
	tipoCambio = tipoCambio.toFixed(2);

	afterAll(function(){
		if (testing) {
			testing.guardaRespuesta(arrTest,1, window);
		}	
	});

	respTest = it('Los tipos de cambio deben coincidir',function(){
		var monto = 1000;
		var montoNuevo = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/convierteMontoMonedaDefault.dbsp',Parametros:'monto='+monto+'&tipoCambio='+tipoCambio+'&idmoneda='+idmoneda+'',DataType:'json'}).monto.MONTO;
		var tipoCambioEsperado = montoNuevo/monto ;
		tipoCambioEsperado = tipoCambioEsperado.toFixed(2);

		expect(tipoCambio).not.toEqual(0);
		expect(tipoCambioEsperado).toEqual(tipoCambio);

		monto = 1545.68;
		montoNuevo = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/convierteMontoMonedaDefault.dbsp',Parametros:'monto='+monto+'&tipoCambio='+tipoCambio+'&idmoneda='+idmoneda+'',DataType:'json'}).monto.MONTO;
		tipoCambioEsperado = montoNuevo/monto;
		tipoCambioEsperado = tipoCambioEsperado.toFixed(2);

		expect(tipoCambio).not.toEqual(0);
		expect(tipoCambioEsperado).toEqual(tipoCambio);

		monto = 480.5;
		montoNuevo = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/convierteMontoMonedaDefault.dbsp',Parametros:'monto='+monto+'&tipoCambio='+tipoCambio+'&idmoneda='+idmoneda+'',DataType:'json'}).monto.MONTO;
		tipoCambioEsperado = montoNuevo/monto;
		tipoCambioEsperado = tipoCambioEsperado.toFixed(2);

		expect(tipoCambio).not.toEqual(0);
		expect(tipoCambioEsperado).toEqual(tipoCambio);
	});
	
	arrTest.push(respTest);

	respTest = it('Los montos deben de coincidir',function(){
		
		var monto = 1000;
		var montoEsperado = monto * tipoCambio;
		var montoNuevo = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/convierteMontoMonedaDefault.dbsp',Parametros:'monto='+monto+'&tipoCambio='+tipoCambio+'&idmoneda='+idmoneda+'',DataType:'json'}).monto.MONTO;
		montoNuevo = montoNuevo.toFixed(2);
		montoEsperado = montoEsperado.toFixed(2);

		expect(montoNuevo).not.toBe(null);
		expect(montoNuevo).toEqual(montoEsperado);

		monto = 1545.68;
		montoEsperado = monto * tipoCambio;
		montoNuevo = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/convierteMontoMonedaDefault.dbsp',Parametros:'monto='+monto+'&tipoCambio='+tipoCambio+'&idmoneda='+idmoneda+'',DataType:'json'}).monto.MONTO;
		montoNuevo = montoNuevo.toFixed(2);
		montoEsperado = montoEsperado.toFixed(2);

		expect(montoNuevo).not.toBe(null);
		expect(montoNuevo).toEqual(montoEsperado);

		monto = 480.5;
		montoEsperado = monto * tipoCambio;
		montoNuevo = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/convierteMontoMonedaDefault.dbsp',Parametros:'monto='+monto+'&tipoCambio='+tipoCambio+'&idmoneda='+idmoneda+'',DataType:'json'}).monto.MONTO;
		montoNuevo = montoNuevo.toFixed(2);
		montoEsperado = montoEsperado.toFixed(2);

		expect(montoNuevo).not.toBe(null);
		expect(montoNuevo).toEqual(montoEsperado);
	});

	arrTest.push(respTest);
	
});

