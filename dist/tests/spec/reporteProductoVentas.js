
var testing = (window.opener) ? window.opener.test : null, arrTest = [], respTest;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe("detalle del reporte de ventas por productos", function() {

	afterAll(function(){
		if (testing) {
			testing.guardaRespuesta(arrTest,1, window);
		}
	});

	beforeAll(function() {
		setTimeout(function(){
			Op = {
			"jsonDatos":[
			{
				"CODIGO":"12",
				"NOMBRE":"PRODUCTO1",
				"LINEA_PRODUCTO":"Hp",
				"FECHA_COMPRA":'12/12/2016',
				"IDVENTA":63330,
				"CANTIDAD":1,
				"COSTO":0,
				"CostoTotal":0,
				"TOTAL":"89",
				"TIPOCAMBIO":16,
				"IDEMPRESAMONEDA":248,
				"EMPRESA":"llll",
				"TKCOM":null,
				"IDEMPRESAMONEDADEFAULT":248,
				"COMPRADOR":"sandra isabel salas villarreal",
				"TKP":"P-07B4CF15-1894-4700-85D2-017A619B8490",
				"EnMonDef":1549.28,
				"Individual":1549.28,
				"MargenIndividual":1549.28,
				"MargenTotal":1537.28,
				"Simbolo":"",
				"nFila":1
			},
			{
				"CODIGO":"13",
				"NOMBRE":"PRODUCTO2",
				"LINEA_PRODUCTO":"Hp",
				"FECHA_COMPRA":'12/12/2016',
				"IDVENTA":63331,
				"CANTIDAD":1,
				"COSTO":0,
				"CostoTotal":0,
				"TOTAL":89,
				"TIPOCAMBIO":1,
				"IDEMPRESAMONEDA":248,
				"EMPRESA":"llll",
				"TKCOM":null,
				"IDEMPRESAMONEDADEFAULT":248,
				"COMPRADOR":"sandra isabel salas villarreal",
				"TKP":"P-07B4CF15-1894-4700-85D2-017A619B8490",
				"EnMonDef":0,
				"Individual":0,
				"MargenIndividual":0,
				"MargenTotal":0,
				"Simbolo":"",
				"nFila":1
			}
			],
			"jsonInfo":{
				"TOTALR":2
			}
		}
		muestradetalles(Op);
		},1200)
	},1400);

	respTest = it('Si el costo es cero y el precio de venta es mayor a cero debe tener como margen el 100%', function(done) {
		
		setTimeout(function(){
			var value1 = $('table#DetallesPV tbody > tr:nth-child(1) > td:nth-child(11)').html();
			value1 = parseFloat(value1);
			expect(value1).toEqual(100);
			done();
		},3000)
	},3200);

	arrTest.push(respTest);

	respTest = it('Si el costo es cero y el precio de venta es cero debe tener como margen el 0%', function(done) {
		setTimeout(function(){
			var value2 = $('table#DetallesPV tbody > tr:nth-child(2) > td:nth-child(11)').html();
			value2 = parseFloat(value2);
			expect(value2).toEqual(0);
			done();
		},1000)
	},2000);

	arrTest.push(respTest);

	respTest = it('Helper margen pct 0%', function(done) {
		var pctx = Handlebars.helpers.hlpPctMargen(0,0);
		pctx = parseFloat(pctx);
		setTimeout(function(){
			expect(pctx).toEqual(0.00);
			done();
		},1000)
	},2000);

	arrTest.push(respTest);

	respTest = it('Helper margen pct 100%', function(done) {
		var pctx = Handlebars.helpers.hlpPctMargen(50,0);
		pctx = parseFloat(pctx);
		setTimeout(function(){
			expect(pctx).toEqual(100.00);
			done();
		},1000)
	},2000);

	arrTest.push(respTest);
	
});