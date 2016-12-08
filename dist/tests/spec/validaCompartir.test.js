var testing = (window.opener != null) ? window.opener.test : null, arrTest = [], respTest;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('test popup compartir acciones Multiples: ', function(){
	beforeAll(function(done){
		setTimeout(function(){
			console.log('Esperamos a que esten listados los prospectos');
			$('#ListaFiltros #agregarFiltro').click();
			$('#FiltroTipo').val(1).change();

			setTimeout(function() {
				$('#FiltroDetalle').val(0).change();
				setTimeout(function () {
					SalesUp.Variables.jsonProspectos = SalesUp.Variables.jsonprospectos.JsonDatos;
					SalesUp.Variables.tkp = SalesUp.Variables.jsonProspectos[0].Tkp;
					done();
				}, 2000);
			}, 2000);
		}, 4000);
		
	});

	respTest = it('Validamos si el usuario esta compartido originalmente', function(done) {
		console.log('Validamos si el usuario esta compartido originalmente');
		SalesUp.Variables.estaCompartido = SalesUp.Variables.jsonprospectos.JsonDatos[0].Compartido != '' ? true : false;
		if(SalesUp.Variables.estaCompartido){
			SalesUp.Sistema.CargaDatosAsync({
				link: '/privado/ajax/jx-ListaCompartidos.dbsp',
				parametros: {tkp: SalesUp.Variables.tkp},
				callback: function(result) {
					SalesUp.Variables.listaCompartidos = result.LtCompartidos;
				}
			});
		}
		expect(true).toBeTruthy(); //No hay nada que validar aun
		done();
	});

	arrTest.push(respTest);

	respTest = it('Existe la funcion "compartir" en las opciones', function(done) {
		console.log('validamos que exista la funcion de "compartir"');
		expect(typeof SalesUp.Variables.compartir.mostrarPopup).toEqual('function');
		done();
	});

	arrTest.push(respTest);

	respTest = it('mostramos el modal de compartir', function(done){
		SalesUp.Variables.compartir.mostrarPopup({tkp: SalesUp.Variables.tkp, titulo: 'Compartir prospecto', seccion: 'prospecto'});
		setTimeout(function(){
			console.log('mostramos el popup');
			var existeModal = $('#popCompartirContacto') ? true : false;
			expect(existeModal).toBeTruthy();
			done();
		}, 2000);
	});

	arrTest.push(respTest);

	respTest = it('Validamos que exista una lista de usuarios para compartir ', function(done){
		setTimeout(function(){
			console.log('validamos que exista una lista de usuarios para compartir');
			expect(typeof SalesUp.Variables.jsonUsuarios).toEqual('object');
			done();
		}, 2000);
	});

	arrTest.push(respTest);

	respTest = it('Dejamos de compartir al prospecto', function(done){
		console.log('Dejamos de compartir al prospecto');
					
		var select = $('.ltUsuarios')[0].selectize;
		select.clear();

		$('#BtnAceptar').click();
		setTimeout(function(){
			expect(true).toBeTruthy();	//Validamos en el siguiente paso
			done();
		}, 2000);
	});

	arrTest.push(respTest);

	respTest = it('Validamos que el prospecto de prueba no este compartido', function(done){
		expect(SalesUp.Variables.jsonprospectos.JsonDatos[0].Compartido).toEqual('');
		done();
	});

	arrTest.push(respTest);

	respTest = it('Compartimos al prospecto con todos los usuarios', function(done){
		console.log('Compartimos al prospecto con todos los usuarios');
		
		SalesUp.Variables.compartir.mostrarPopup({tkp: SalesUp.Variables.tkp, titulo: 'Compartir prospecto', seccion: 'prospecto'});
		setTimeout(function(){
			var items = SalesUp.Variables.jsonUsuarios;
			
			var select = $('.ltUsuarios')[0].selectize;

			for(var i=0; i < items.length; i++){
				select.addItem(items[i].tku);
			}

			$('#BtnAceptar').click();
			setTimeout(function(){
				expect(SalesUp.Variables.jsonprospectos.JsonDatos[0].Compartido).toEqual('1');
				done();
			}, 2000);
		}, 2000);
	});

	arrTest.push(respTest);

	respTest = it('Eliminamos todos los usuarios compartidos', function(done){
		
		SalesUp.Variables.compartir.mostrarPopup({tkp: SalesUp.Variables.tkp, titulo: 'Compartir prospecto', seccion: 'prospecto'});
		setTimeout(function(){
			console.log('Eliminamos todos los usuarios compartidos');
			
			var select = $('.ltUsuarios')[0].selectize;
			select.clear();

			$('#BtnAceptar').click();
			setTimeout(function(){
				expect(SalesUp.Variables.jsonprospectos.JsonDatos[0].Compartido).toEqual(''); 
				done();
			}, 2000);
		}, 2000);
	});

	arrTest.push(respTest);

	respTest = it('Regresamos los valores como se encontraban originalmente', function(done){
		console.log('Regresamos los valores como se encontraban originalmente');
	
		if(SalesUp.Variables.estaCompartido){
			SalesUp.Variables.compartir.mostrarPopup({tkp: SalesUp.Variables.tkp, titulo: 'Compartir prospecto', seccion: 'prospecto'});
			setTimeout(function(){
				var items = SalesUp.Variables.listaCompartidos;
				
				var select = $('.ltUsuarios')[0].selectize;

				for(var i=0; i < items.length; i++){
					select.addItem(items[i].tku);
				}
				$('#BtnAceptar').click();
				setTimeout(function(){
					expect(SalesUp.Variables.jsonprospectos.JsonDatos[0].Compartido).toEqual('1');
					done();
				}, 2000);
			}, 2000);
		} else {
			expect(true).toBeTruthy();
			done();
		}
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