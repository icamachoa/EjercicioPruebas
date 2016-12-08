


describe ('Login', function() {
	

	beforeEach (function (){
		jasmine.getFixtures().fixturesPath = '/';
		loadFixtures('index.dbsp');		

	});

  	it ('tiene la estructura correcta', function () {


  		expect($('#InputEmail')[0]).toExist('debe tener un campo InputEmail');
  		expect($('#InputPassword')[0]).toExist('debe tener un campo InputPassword');
  		expect($('input[name="email"]')[0]).toExist('El campo debe llamarse email'); 
  		expect($('input[name="contrasenia"]')).toExist('El campo debe llamarse contrasenia'); 

  	})


});