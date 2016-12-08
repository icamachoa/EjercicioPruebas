
describe('Test tipo de cambio de las ventas y oportunidades',function(){
	var tipoDeCambioCeroVentas = parseInt(SalesUp.Sistema.CargaDatos({Link:'../../privado/Modelo/tests/tipoDeCambioVentas.dbsp',DataType:'json'}).jsonDatos.CANTIDADENCERO);
	var tipoDeCambioCeroOportunidades = parseInt(SalesUp.Sistema.CargaDatos({Link:'../../privado/Modelo/tests/tipoDeCambioOportunidades.dbsp',DataType:'json'}).jsonDatos.CANTIDADENCERO);
	var idMonedaEnCeroOportunidades = parseInt(SalesUp.Sistema.CargaDatos({Link:'../../privado/Modelo/tests/tipoDeCambioOportunidades.dbsp',DataType:'json'}).jsonIdMoneda.CANTIDADENCERO);
	var idMonedaEnCeroVentas = parseInt(SalesUp.Sistema.CargaDatos({Link:'../../privado/Modelo/tests/tipoDeCambioVentas.dbsp',DataType:'json'}).jsonIdMoneda.CANTIDADENCERO);

	afterAll(function(){
		if (testing) {
			testing.guardaRespuesta(arrTest,0);
		}else{
			return;
		}		
	});

	respTest = it('Ningun tipo de cambio de ventas en 0' ,function(){
		expect(tipoDeCambioCeroVentas).not.toBeNull();
		expect(tipoDeCambioCeroVentas).toEqual(0);
		expect(tipoDeCambioCeroVentas).not.toBeGreaterThan(0);
	});

	arrTest.push(respTest);

	respTest = it('Ningun tipo de cambio de oportunidades en 0' ,function(){
		expect(tipoDeCambioCeroOportunidades).not.toBeNull();
		expect(tipoDeCambioCeroOportunidades).toEqual(0);
		expect(tipoDeCambioCeroOportunidades).not.toBeGreaterThan(0);
	});

	arrTest.push(respTest);

	respTest = it('Ningun idempresamoneda de oportunidades nulo o en 0' ,function(){
		expect(idMonedaEnCeroOportunidades).not.toBeNull();
		expect(idMonedaEnCeroOportunidades).toEqual(0);
		expect(idMonedaEnCeroOportunidades).not.toBeGreaterThan(0);
	});

	arrTest.push(respTest);

	respTest = it('Ningun idempresamoneda de ventas nulo o en 0' ,function(){
		expect(idMonedaEnCeroVentas).not.toBeNull();
		expect(idMonedaEnCeroVentas).toEqual(0);
		expect(idMonedaEnCeroVentas).not.toBeGreaterThan(0);
	});

	arrTest.push(respTest);

});