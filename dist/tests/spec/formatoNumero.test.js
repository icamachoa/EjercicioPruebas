var testing = window.opener.test, arrTest = [], respTest;

describe('Test conversion numero con separador decimal',function(){
	
	afterAll(function(){
		if (testing) {
			testing.guardaRespuesta(arrTest,1,window);
		}else{
			return;
		}   
	});

	var num,resp,esperado;

	respTest = it('Funcion que quita el formato',function(){
		
		num = '60,56';
		resp = SalesUp.Sistema.quitarFormatoNumero(num);
		esperado = 60.56;

		expect(resp).not.toBe(null);
		expect(resp).toEqual(esperado);

		num = '800,68';
		resp = SalesUp.Sistema.quitarFormatoNumero(num);
		esperado = 800.68;

		expect(resp).not.toBe(null);
		expect(resp).toEqual(esperado);


		num = '80000,95';
		resp = SalesUp.Sistema.quitarFormatoNumero(num);
		esperado = 80000.95;

		expect(resp).not.toBe(null);
		expect(resp).toEqual(esperado);

		num = 85.20;
		resp = SalesUp.Sistema.quitarFormatoNumero(num);
		esperado = 85.20;

		expect(resp).not.toBe(null);
		expect(resp).toEqual(esperado);

		num = 550.68;
		resp = SalesUp.Sistema.quitarFormatoNumero(num);
		esperado = 550.68;

		expect(resp).not.toBe(null);
		expect(resp).toEqual(esperado);


		num = 75000.95;
		resp = SalesUp.Sistema.quitarFormatoNumero(num);
		esperado = 75000.95;

		expect(resp).not.toBe(null);
		expect(resp).toEqual(esperado);

	});

	arrTest.push(respTest);

	respTest = it('Funcion que devuelve el numero con el formato',function(){

		var separador = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});

		num = '60,56';
		resp = SalesUp.Sistema.formatoNumero(num);
		esperado = '60'+separador+'56';

		expect(resp).not.toBe(null);
		expect(resp).toEqual(esperado);

		num = '800,68';
		resp = SalesUp.Sistema.formatoNumero(num);
		esperado = '800'+separador+'68';

		expect(resp).not.toBe(null);
		expect(resp).toEqual(esperado);

		num = '80000,95';
		resp = SalesUp.Sistema.formatoNumero(num);
		esperado = '80000'+separador+'95';

		expect(resp).not.toBe(null);
		expect(resp).toEqual(esperado);

		num = 85.20;
		resp = SalesUp.Sistema.formatoNumero(num);
		esperado = '85'+separador+'20';

		expect(resp).not.toBe(null);
		expect(resp).toEqual(esperado);

		num = 550.68;
		resp = SalesUp.Sistema.formatoNumero(num);
		esperado = '550'+separador+'68';

		expect(resp).not.toBe(null);
		expect(resp).toEqual(esperado);

		num = 75000.95;
		resp = SalesUp.Sistema.formatoNumero(num);
		esperado = '75000'+separador+'95';

		expect(resp).not.toBe(null);
		expect(resp).toEqual(esperado);

	});

	arrTest.push(respTest);

});