
describe('Test compartir reporte conversiones',function(){
	var conversionCompartida = SalesUp.Sistema.CargaDatos({Link:'../../privado/Modelo/tests/reporteConversionesCompartido.dbsp',DataType:'json'}).jsonDatos.COMPARTIDOS;

	afterAll(function(){
		if (testing) {
			testing.guardaRespuesta(arrTest,0);
		}else{
			return;
		}		
	});

	respTest = it('Reporte de conversiones compartido',function(){
		expect(conversionCompartida).not.toEqual('');
		expect(conversionCompartida).not.toBeNull();
		expect(conversionCompartida).not.toBeUndefined();
		expect(conversionCompartida).toBeDefined();
		expect(conversionCompartida).not.toBe(null);
	});

	arrTest.push(respTest);
});