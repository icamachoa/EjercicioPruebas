var testing = window.opener.test, arrTest = [], respTest;
describe('Reporte estimacion de ventas vs reporte estimacion de ventas detalles',function(){
	var t = new test();
	var filtro = '';
	afterAll(function(){
		testing.guardaRespuesta(arrTest,0);
	});
	respTest = it('Cantidad reporte estimacion de ventas por lineas debe de coincidir con el detalle',function(){
		filtro = '{"tipoVariante":"1","laVariante":"B10BEC2F-8D3A-4553-8D03-AEE878433B4E","filtros":[{"periodicidad":"4"},{"moneda":""}]}';
		expect(t.reporteEstimacion(filtro,0)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,1)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,0)).toEqual(t.reporteEstimacion(filtro,1));
	});
	arrTest.push(respTest);
});