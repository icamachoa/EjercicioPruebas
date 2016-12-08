var testing = (window.opener != null) ? window.opener.test : null, arrTest = [], respTest;

describe('Test filtro grupo de la pantalla Clientes',function(){
	var filtroGrupo = parseInt(SalesUp.Sistema.CargaDatos({Link:'../../privado/Modelo/tests/filtroPantallaGrupo.dbsp',DataType:'json'}).jsonDatos.RESPUESTA);
	
	afterAll(function(){
		if (testing) {
			testing.guardaRespuesta(arrTest,0);
		}		
	});

	respTest = it('Filtro grupo pantalla clientes',function(){
		expect(filtroGrupo).not.toBeNull();
		expect(filtroGrupo).not.toBeUndefined();
		expect(filtroGrupo).toBeDefined();
		expect(filtroGrupo).toBeTruthy();
		expect(filtroGrupo).not.toBeFalsy();
		expect(filtroGrupo).toEqual(1);
		expect(filtroGrupo).not.toEqual(0);
		expect(filtroGrupo).toBeGreaterThan(0);
		expect(filtroGrupo).not.toBeGreaterThan(2);
		expect(filtroGrupo).toBeLessThan(2);
	});

	arrTest.push(respTest);
});