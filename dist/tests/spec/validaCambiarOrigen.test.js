localStorage.clear();
var testing = (window.opener != null) ? window.opener.test : null, arrTest = [], respTest;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

describe('test popup cambiar origen acciones Multiples: ', function(){
	beforeAll(function(done){
		setTimeout(function(){
			console.log('se supone que ya cargo la tabla');
			$('#ListaFiltros #agregarFiltro').click();
			$('#FiltroTipo').val(1).change();

			setTimeout(function() {
				$('#FiltroDetalle').val(0).change();
				setTimeout(function () {
					SalesUp.Variables.jsonProspectos = SalesUp.Variables.jsonprospectos.JsonDatos;
					SalesUp.Variables.tkp = SalesUp.Variables.jsonProspectos[0].Tkp;
					SalesUp.Variables.origenActual = SalesUp.Variables.jsonProspectos[0].Origen;

					$('tbody .accionesMultiples input')[0].click();
					done();
				}, 4000);
			}, 4000);
		}, 6000);
		
	});

	respTest = it('Existe la funcion "cambiarOrigen" en las opciones Multiples', function(done) {
		console.log('validamos que exista la funcion de "cambiarOrigen"');
		expect(typeof SalesUp.Variables.cambiarOrigenMultiple.mostrarPopup).toEqual('function');
		done();
	});

	arrTest.push(respTest);

	respTest = it('mostramos el modal de Cambiar Origen', function(done){
		setTimeout(function(){
			console.log('mostramos el popup');
			SalesUp.Variables.cambiarOrigenMultiple.mostrarPopup({titulo: 'Prueba'});
			var existeModal = $('#popOrigenMultiples') ? true : false;
			expect(existeModal).toBeTruthy();
			done();
		}, 4000);
	});

	arrTest.push(respTest);

	respTest = it('Validamos que exista una lista de origenes ', function(done){
		setTimeout(function(){
			console.log('validamos que exista una lista de origenes');
			expect(typeof SalesUp.Variables.ltOrigen).toEqual('object');
			done();
		}, 4000);
	});

	arrTest.push(respTest);

	respTest = it('seleccionamos un origen distinto al actual', function(done){
		setTimeout(function(){
			console.log('Ya existe la lista de origenes');
			for(var i=1; i < SalesUp.Variables.ltOrigen.length; i++){
				if(SalesUp.Variables.origenActual != SalesUp.Variables.ltOrigen[i].Opcion){
					var opcion = SalesUp.Variables.ltOrigen[i].TKORIG;
					break;
				}
			}
			var select = $('.ltOrigen')[0].selectize;
			select.addItem(opcion);

			expect($('.ltOrigen').val()).toEqual(opcion);
			done();
		}, 4000);
	});

	arrTest.push(respTest);

	respTest = it('Obtenemos el nombre de la opcion seleccionada', function(done){
		console.log('Obtenemos el nombre de la opcion seleccionada y comparamos que sea distinta a la original');
		SalesUp.Variables.nuevoOrigen = _.find(SalesUp.Variables.ltOrigen, function(item){
		  									return item.TKORIG == $('.ltOrigen').val(); 
										});
		SalesUp.Variables.nuevoOrigen = SalesUp.Variables.nuevoOrigen.Opcion;
		expect(SalesUp.Variables.nuevoOrigen).not.toEqual(SalesUp.Variables.origenActual);
		done();
	});

	arrTest.push(respTest);

	respTest = it('llamamos a la funcion de guardar', function(done){
		console.log('llamamos a la funcion de guardar');
		SalesUp.Variables.cambiarOrigenMultiple.guardar();
		expect(true).toEqual(true);
		done();
	});

	arrTest.push(respTest);

	respTest = it('Validamos que se ha guardado el cambio', function(done){
		setTimeout(function(){
			console.log('Validamos que se ha guardado el cambio');
			expect(SalesUp.Variables.jsonprospectos.JsonDatos[0].Origen).toEqual(SalesUp.Variables.nuevoOrigen);
			done();
		}, 4000);
	});

	arrTest.push(respTest);

	respTest = it('Regresamos la informacion a como estaba originalmente', function(done){
		console.log('Regresamos la informacion a como estaba originalmente');
		$('tbody .accionesMultiples input')[0].click();
		SalesUp.Variables.cambiarOrigenMultiple.mostrarPopup({titulo: 'prueba'});
		setTimeout(function(){
			SalesUp.Variables.nuevoOrigen = _.find(SalesUp.Variables.ltOrigen, function(item){
		  										return item.Opcion == SalesUp.Variables.origenActual; 
											});
			var opcion = SalesUp.Variables.nuevoOrigen.TKORIG;
			SalesUp.Variables.nuevoOrigen = SalesUp.Variables.nuevoOrigen.Opcion;

			var select = $('.ltOrigen')[0].selectize;
			select.addItem(opcion);
			
			SalesUp.Variables.cambiarOrigenMultiple.guardar();
			setTimeout(function(){
				expect(SalesUp.Variables.origenActual).toEqual(SalesUp.Variables.nuevoOrigen);
				done();
			}, 4000);
		}, 4000);
	});

	arrTest.push(respTest);
	
	afterAll(function() {
		$('#eliminarFiltros').click();
		if (testing) {
			testing.guardaRespuesta(arrTest,1, window);
		}else{
			return;
		}		
	});
});