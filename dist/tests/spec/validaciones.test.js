describe ('validaciones', function() {

	beforeEach(function () {
		val = new Validaciones;
	}); 


	
	it ('validando SoloNumeros', function (){
		expect (Validaciones).toBeDefined();
		expect (val.SoloNumeros('123')).toBeTruthy('123 es un número');
		expect (val.SoloNumeros('123a')).toBeFalsy('123a no es un numero');
		expect (val.SoloNumeros('123.0a')).toBeFalsy('123.0a no es un numero');
		expect (val.SoloNumeros('-123')).toBeTruthy('-123 es un número');
		expect (val.SoloNumeros('-123.23')).toBeTruthy('-123.23 es un número');
		expect (val.SoloNumeros('1E1')).toBeTruthy('1E1 es un número');		
	});

	it ('validando correos', function() {

		expect (val.ValidaEsCorreo('db@salesup.com')).toBeTruthy();
		expect (val.ValidaEsCorreo('db@salesup.mexico.com')).toBeTruthy();
		expect (val.ValidaEsCorreo('diego.banuelos@uno.com')).toBeTruthy();
		expect (val.ValidaEsCorreo('x.x.x@d1-2.com')).toBeTruthy();
		expect (val.ValidaEsCorreo('x-x.x@d1-2.com')).toBeTruthy();
		expect (val.ValidaEsCorreo('x@com')).toBeFalsy();
		expect (val.ValidaEsCorreo('diego_banuelos@uno.com')).toBeTruthy();
		// expect (val.ValidaEsCorreo('db.@example.com')).toBeFalsy(); //es invalido
		//expect (val.ValidaEsCorreo('.@example.com')).toBeFalsy(); //es invalido

		/// acording to http://haacked.com/archive/2007/08/21/i-knew-how-to-validate-an-email-address-until-i.aspx/		
	});


	it ('validando esFecha', function () {
		var x;
		x = '01/01/2016'; expect (val.esFecha(x,function(){ return 101})).toBeTruthy(x);
		x = '31/01/2016'; expect (val.esFecha(x,function(){ return 101})).toBeFalsy(x);
		x = '31/01/2016'; expect (val.esFecha(x,function(){ return 103})).toBeTruthy(x);
	});



	it ('validando esJson', function () {
		expect (val.esJson('{ "a": 1 }')).toBeTruthy();
		expect (val.esJson('{ a: 1 }')).toBeFalsy();
		expect (val.esJson('{"items":[{"key":"First","value":100},{"key":"Second","value":false},{"key":"Last","value":"Mixed"}],"obj":{"number":1.2345e-6,"enabled":true},"message":"Strings have to be in double-quotes."}')).toBeTruthy();
		expect (val.esJson('{"red":"#f00","green":"#0f0","blue":"#00f","cyan":"#0ff","magenta":"#f0f","yellow":"#ff0","black":"#000"}')).toBeTruthy();
	});





});