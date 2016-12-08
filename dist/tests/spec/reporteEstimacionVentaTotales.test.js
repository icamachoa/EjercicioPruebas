describe('Test total estimacion de ventas',function(){
	var cantidad = _.size(SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosReporteEstimacion.dbsp', Parametros:'vista=8&tipoReporte=4&tipo=0&grupo=0&moneda=0',DataType:'json'}).jsonDatos)-4;
	var jsonDatos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosReporteEstimacion.dbsp', Parametros:'vista=8&tipoReporte=4&tipo=1&grupo=0&moneda=0',DataType:'json'}).jsonDatos;
	var nDatos = _.size(jsonDatos);

	var totalesReales = sumaEstimacion(nDatos,cantidad,jsonDatos,0);
	var totalesSumados = sumaEstimacion(nDatos,cantidad,jsonDatos,1);

	afterAll(function(){
		if (testing) {
			testing.guardaRespuesta(arrTest,1,window);
		}		
	});

	respTest = it('La suma de los datos debe ser igual a los totales',function(){
		expect(totalesSumados).not.toBe(null);
		expect(totalesReales).not.toBe(null);
		expect(totalesSumados).toBeDefined();
		expect(totalesReales).toBeDefined();
		expect(totalesSumados).not.toBeUndefined();
		expect(totalesReales).not.toBeUndefined();
		expect(totalesSumados).toEqual(totalesReales);
		expect(totalesSumados).not.toBeGreaterThan(totalesReales);
		expect(totalesSumados).not.toBeLessThan(totalesReales);
		expect(totalesReales).not.toBeGreaterThan(totalesSumados);
		expect(totalesReales).not.toBeLessThan(totalesSumados);
	});

	arrTest.push(respTest);
});