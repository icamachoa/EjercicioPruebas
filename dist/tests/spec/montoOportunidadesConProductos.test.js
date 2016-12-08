var testing = (window.opener != null) ? window.opener.test : null, arrTest = [], respTest;

describe('comprueba que no hayan oportunidades con montos diferentes a la suma de sus productos',function(){
	var nOportunidades = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/montoOportunidadesProductosNC.dbsp',DataType:'json'}).numeroOportunidades.NOPORTUNIDADES;
	
	afterAll(function(){
		if (testing) {
			testing.guardaRespuesta(arrTest,1, window);
		}	
	});

	respTest = it('El proceso para testear debe devolver algun dato',function(){
		expect(nOportunidades).toBeDefined();
	});

	arrTest.push(respTest);

	respTest = it('Ninguna oportunidad con productos debe tener un monto distinto a la suma de los montos de los productos de la oportunidad',function(){
		expect(nOportunidades).toEqual(0);
	});

	arrTest.push(respTest);
});