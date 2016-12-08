var testing = (window.opener != null) ? window.opener.test : null, arrTest = [], respTest;

describe('Ordenamientos pantallas',function(){

	var order = '';

	afterAll(function(){
		if (testing) {
			testing.guardaRespuesta(arrTest,1,window);
		}
	});

	respTest = it('La pantalla de prospectos siempre debe de tener un ordenamiento',function(){
		order = '';
		order = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testORdenamientoPantallas.dbsp',Parametros:'idpantalla=1',DataType:'json'}).orderSql;
		expect(order.OrderSql).not.toBe('');
	});

	arrTest.push(respTest);

	respTest = it('La pantalla de oportunidades siempre debe de tener un ordenamiento',function(){
		order = '';
		order = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testORdenamientoPantallas.dbsp',Parametros:'idpantalla=2',DataType:'json'}).orderSql;
		expect(order.OrderSql).not.toBe('');
	});

	arrTest.push(respTest);

	respTest = it('La pantalla de ventas siempre debe de tener un ordenamiento',function(){
		order = '';
		order = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testORdenamientoPantallas.dbsp',Parametros:'idpantalla=3',DataType:'json'}).orderSql;
		expect(order.OrderSql).not.toBe('');
	});

	arrTest.push(respTest);

	respTest = it('La pantalla de clientes siempre debe de tener un ordenamiento',function(){
		order = '';
		order = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testORdenamientoPantallas.dbsp',Parametros:'idpantalla=4',DataType:'json'}).orderSql;
		expect(order.OrderSql).not.toBe('');
	});

	arrTest.push(respTest);

	respTest = it('La pantalla de productos siempre debe de tener un ordenamiento',function(){
		order = '';
		order = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testORdenamientoPantallas.dbsp',Parametros:'idpantalla=10',DataType:'json'}).orderSql;
		expect(order.OrderSql).not.toBe('');
	});

	arrTest.push(respTest);

});