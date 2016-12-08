var testing = window.opener.test, arrTest = [], respTest;

describe('Reporte estimacion de ventas vs reporte estimacion de ventas detalles',function(){
	var t = new test();
	var filtro = '';
	var testing = this.parent.test, arrTest = [], respTest;
	afterAll(function(){
		testing.guardaRespuesta(arrTest,0);
	});
	respTest = it('Cantidad reporte estimacion de ventas por grupos debe de coincidir con el detalle',function(){
		filtro = '{"tipoVariante":"1","laVariante":"D792221C-94AE-4700-A533-5E90510BCF92","filtros":[{"periodicidad":"4"},{"moneda":""}]}';
		expect(t.reporteEstimacion(filtro,0)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,1)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,0)).toEqual(t.reporteEstimacion(filtro,1));
	});
	arrTest.push(respTest);

});