var testing = window.opener.test, arrTest = [], respTest;
describe('Reporte estimacion de ventas vs reporte estimacion de ventas detalles',function(){
	var t = new test();
	var filtro = '';
	afterAll(function(){
		testing.guardaRespuesta(arrTest,0);
	});
	respTest = it('Cantidad reporte estimacion de ventas por region debe de coincidir con el detalle',function(){
		filtro = '{"tipoVariante":"1","laVariante":"CB67BC99-37A9-4967-8650-9AAC874253FE","filtros":[{"periodicidad":"4"},{"moneda":""}]}';
		expect(t.reporteEstimacion(filtro,0)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,1)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,0)).toEqual(t.reporteEstimacion(filtro,1));
	});
	arrTest.push(respTest);
});