var testing = window.opener.test, arrTest = [], respTest;

describe('Reporte estimacion de ventas vs reporte estimacion de ventas detalles',function(){
	var t = new test();
	var filtro = '';

	afterAll(function(){
		testing.guardaRespuesta(arrTest,0);
	});


	respTest = it('Cantidad reporte estimacion de ventas por ejecutivos debe de coincidir con el detalle',function(){
		filtro = '{"tipoVariante":"1","laVariante":"76DC875B-FC1C-41AC-914B-013E480C2794","filtros":[{"periodicidad":"4"},{"grupo":""},{"moneda":""}]}';
		expect(t.reporteEstimacion(filtro,0)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,1)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,0)).toEqual(t.reporteEstimacion(filtro,1));
	});

	arrTest.push(respTest);
});