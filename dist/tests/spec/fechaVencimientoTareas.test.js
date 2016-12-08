

describe('Test fecha de vencimiento de las tareas',function(){
	var cantidadTareas = parseInt(SalesUp.Sistema.CargaDatos({Link:'../../privado/Modelo/tests/fechaVencimientoTareas.dbsp',DataType:'json'}).jsonDatos.NUMTAREAS);
	
	afterAll(function(){
		if (testing) {
			testing.guardaRespuesta(arrTest,0);
		}else{
			return;
		}		
	});

	respTest = it('La fecha de vencimiento de las tareas debe de ser mayor a la fecha de creación',function(){
		expect(cantidadTareas).not.toBeNull();
		expect(cantidadTareas).not.toBeUndefined();
		expect(cantidadTareas).toBeDefined();
		expect(cantidadTareas).toEqual(0);
		expect(cantidadTareas).not.toBeGreaterThan(0);
		expect(cantidadTareas).toBeLessThan(1);
	});

	arrTest.push(respTest);
});