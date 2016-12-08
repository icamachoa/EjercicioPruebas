describe('Reporte estimacion de ventas vs reporte estimacion de ventas detalles',function(){
	var t = new test();
	var filtro = '';
	it('Cantidad reporte estimacion de ventas por probabilidad debe de coincidir con el detalle',function(){
		filtro = '{"tipoVariante":"1","laVariante":"E9A26856-AD13-4C21-B7A3-82CF46A71388","filtros":[{"periodicidad":"4"},{"moneda":""}]}';
		expect(t.reporteEstimacion(filtro,0)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,1)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,0)).toEqual(t.reporteEstimacion(filtro,1));
	});
	it('Cantidad reporte estimacion de ventas por ejecutivos debe de coincidir con el detalle',function(){
		filtro = '{"tipoVariante":"1","laVariante":"76DC875B-FC1C-41AC-914B-013E480C2794","filtros":[{"periodicidad":"4"},{"grupo":""},{"moneda":""}]}';
		expect(t.reporteEstimacion(filtro,0)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,1)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,0)).toEqual(t.reporteEstimacion(filtro,1));
	});
	it('Cantidad reporte estimacion de ventas por grupos debe de coincidir con el detalle',function(){
		filtro = '{"tipoVariante":"1","laVariante":"D792221C-94AE-4700-A533-5E90510BCF92","filtros":[{"periodicidad":"4"},{"moneda":""}]}';
		expect(t.reporteEstimacion(filtro,0)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,1)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,0)).toEqual(t.reporteEstimacion(filtro,1));
	});
	it('Cantidad reporte estimacion de ventas por lineas debe de coincidir con el detalle',function(){
		filtro = '{"tipoVariante":"1","laVariante":"B10BEC2F-8D3A-4553-8D03-AEE878433B4E","filtros":[{"periodicidad":"4"},{"moneda":""}]}';
		expect(t.reporteEstimacion(filtro,0)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,1)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,0)).toEqual(t.reporteEstimacion(filtro,1));
	});
	it('Cantidad reporte estimacion de ventas por origen debe de coincidir con el detalle',function(){
		filtro = '{"tipoVariante":"1","laVariante":"29642D92-D1FC-4410-91D5-322962110894","filtros":[{"periodicidad":"4"},{"moneda":""}]}';
		expect(t.reporteEstimacion(filtro,0)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,1)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,0)).toEqual(t.reporteEstimacion(filtro,1));
	});
	it('Cantidad reporte estimacion de ventas por pais debe de coincidir con el detalle',function(){
		filtro = '{"tipoVariante":"1","laVariante":"CCABAE7D-D6B3-48C0-9924-8250074CE589","filtros":[{"periodicidad":"4"},{"moneda":""}]}';
		expect(t.reporteEstimacion(filtro,0)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,1)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,0)).toEqual(t.reporteEstimacion(filtro,1));
	});
	it('Cantidad reporte estimacion de ventas por region debe de coincidir con el detalle',function(){
		filtro = '{"tipoVariante":"1","laVariante":"CB67BC99-37A9-4967-8650-9AAC874253FE","filtros":[{"periodicidad":"4"},{"moneda":""}]}';
		expect(t.reporteEstimacion(filtro,0)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,1)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,0)).toEqual(t.reporteEstimacion(filtro,1));
	});
	it('Cantidad reporte estimacion de ventas por ciudad debe de coincidir con el detalle',function(){
		filtro = '{"tipoVariante":"1","laVariante":"336052B7-4ED9-4D89-BF36-4F14592760A8","filtros":[{"periodicidad":"4"},{"moneda":""}]}';
		expect(t.reporteEstimacion(filtro,0)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,1)).not.toBe(null);
		expect(t.reporteEstimacion(filtro,0)).toEqual(t.reporteEstimacion(filtro,1));
	});
});