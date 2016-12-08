var testing = window.opener.test, arrTest = [], respTest;
describe('Reporte estimacion de ventas vs reporte estimacion de ventas detalles',function(){
	var t = new test();
	var filtro = '';
	afterAll(function(){
		testing.guardaRespuesta(arrTest,0);
	});
	respTest = it('Cantidad reporte estimacion de ventas por origen debe de coincidir con el detalle',function(){
		filtro = '{"tipoVariante":"1","laVariante":"29642D92-D1FC-4410-91D5-322962110894","filtros":[{"periodicidad":"4"},{"moneda":""}]}';
		expect(t.reporteEstimacion(filtro,0)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,1)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,0)).toEqual(t.reporteEstimacion(filtro,1));
	});
	arrTest.push(respTest);
});