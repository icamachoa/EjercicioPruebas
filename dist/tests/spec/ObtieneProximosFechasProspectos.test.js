
var testing = (window.opener != null) ? window.opener.test : null, arrTest = [], respTest;

describe('Test funcion que obtiene proximo seguimiento del prospecto',function(){
	
	afterAll(function(){
		if (testing) {
			testing.guardaRespuesta(arrTest,1,window);
		} 
	});

	var jsonDelaFuncion = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonObtieneProximosFechasProspectosTest.dbsp',Parametros:'tipo=0',DataType:'json'}).jsonDatos;
	var jsonEsperado = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonObtieneProximosFechasProspectosTest.dbsp',Parametros:'tipo=1',DataType:'json'}).jsonDatos;

	respTest = it('Las variables deben de estar definidas',function(){
		expect(jsonDelaFuncion).not.toBe(null);
		expect(jsonEsperado).not.toBe(null);
	});

	arrTest.push(respTest);

	respTest = it('Las variables deben de coincidir',function(){
		var tJsonRecibido = jsonDelaFuncion.length;
		var tJsonEsperado = jsonEsperado.length;
		
		expect(tJsonEsperado).toEqual(tJsonRecibido);
		expect(jsonDelaFuncion).toEqual(jsonEsperado);
	});

	arrTest.push(respTest);
	
});