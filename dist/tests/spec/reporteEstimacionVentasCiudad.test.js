var testing = window.opener.test, arrTest = [], respTest;

describe('Reporte estimacion de ventas vs reporte estimacion de ventas detalles',function(){
	var t = new test();
	var filtro = '';
	
	afterAll(function(){
		testing.guardaRespuesta(arrTest,1);
	});

	respTest = it('Cantidad reporte estimacion de ventas por ciudad debe de coincidir con el detalle',function(){
		filtro = '{"tipoVariante":"1","laVariante":"336052B7-4ED9-4D89-BF36-4F14592760A8","filtros":[{"periodicidad":"4"},{"moneda":""}]}';
		expect(t.reporteEstimacion(filtro,0)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,1)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,0)).toEqual(t.reporteEstimacion(filtro,1));
	});

	arrTest.push(respTest);
});