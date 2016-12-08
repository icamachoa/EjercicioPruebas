var testing = (window.opener != null) ? window.opener.test : null, arrTest = [], respTest;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('test popup etiquetar acciones Multiples: ', function(){
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
					
					$('tbody .accionesMultiples input')[0].click();
					done();
				}, 2000);
			}, 2000);
		}, 4000);
		
	});

	respTest = it('Obtenemos las etiquetas originales del usuario', function(done) {
		console.log('Obtenemos las etiquetas originales del usuario');
		SalesUp.Variables.accionesComunes.obtenerDatosProspecto({tkp: SalesUp.Variables.tkp});
		setTimeout(function(){
			SalesUp.Variables.etiquetasOriginales = SalesUp.Variables.etiquetasUsuario;
			expect(true).toBeTruthy();
			done();
		}, 2000);
	});

	arrTest.push(respTest);

	respTest = it('Existe la funcion "etiquetar" en las opciones Multiples', function(done) {
		console.log('validamos que exista la funcion de "etiquetar"');
		expect(typeof SalesUp.Variables.etiquetarMultiple.mostrarPopup).toEqual('function');
		done();
	});

	arrTest.push(respTest);

	respTest = it('mostramos el modal de etiquetar', function(done){
		setTimeout(function(){
			console.log('mostramos el popup');
			SalesUp.Variables.etiquetarMultiple.mostrarPopup({titulo: 'Etiquetar varios prospectos', template: 'Prospectos', origen: 'contactos', callback: ReloadData});
			var existeModal = $('#popEtiquetarVarios') ? true : false;
			expect(existeModal).toBeTruthy();
			done();
		}, 2000);
	});

	arrTest.push(respTest);

	respTest = it('Validamos que exista una lista de etiquetas ', function(done){
		setTimeout(function(){
			console.log('validamos que exista una lista de etiquetas');
			expect(typeof SalesUp.Variables.etiquetas).toEqual('object');
			done();
		}, 2000);
	});

	arrTest.push(respTest);

	respTest = it('Eliminamos todas las etiquetas del prospecto', function(done){
		setTimeout(function(){
			console.log('Eliminamos todas las etiquetas');
			$('.w50.pl5 > label > input').click();

			var items = SalesUp.Variables.etiquetasUsuario.split(',');
			items.pop();

			var select = $('.ltEtiquetas')[0].selectize;

			for(var i=0; i < items.length; i++){
				select.addItem(items[i]);
			}

			SalesUp.Variables.etiquetarMultiple.guardar();
			setTimeout(function(){
				expect(true).toBeTruthy();	//Validamos en el siguiente paso
				done();
			}, 2000);
		}, 2000);
	});

	arrTest.push(respTest);

	respTest = it('Validamos que el prospecto de prueba no tenga etiquetas', function(done){
		setTimeout(function() {
			SalesUp.Variables.accionesComunes.obtenerDatosProspecto({tkp: SalesUp.Variables.tkp});
			setTimeout(function(){
				expect(SalesUp.Variables.etiquetasUsuario).toEqual('');
				done();
			}, 2000);
		}, 2000);
	});

	arrTest.push(respTest);

	respTest = it('Agregamos todas las etiquetas disponibles al prospecto', function(done){
		console.log('Agregamos todas las etiquetas disponibles al prospecto');
		$('tbody .accionesMultiples input')[0].click();
		SalesUp.Variables.etiquetarMultiple.mostrarPopup({titulo: 'Etiquetar varios prospectos', template: 'Prospectos', origen: 'contactos', callback: ReloadData});
		setTimeout(function(){
			var items = SalesUp.Variables.etiquetas;
			items.pop();

			var select = $('.ltEtiquetas')[0].selectize;

			for(var i=0; i < items.length; i++){
				select.addItem(items[i].TKETIQ);
			}

			SalesUp.Variables.etiquetarMultiple.guardar();
			setTimeout(function(){
				SalesUp.Variables.accionesComunes.obtenerDatosProspecto({tkp: SalesUp.Variables.tkp});
				setTimeout(function(){
					var etiquetasUsuario = SalesUp.Variables.etiquetasUsuario.split(',');
					etiquetasUsuario.pop();

					expect(etiquetasUsuario.length).toEqual(SalesUp.Variables.etiquetas.length);
					done();
				}, 2000);
			}, 2000);
		}, 2000);
	});

	arrTest.push(respTest);

	respTest = it('Eliminamos todas las etiquetas del prospecto agregadas de prueba', function(done){
		$('tbody .accionesMultiples input')[0].click();
		SalesUp.Variables.etiquetarMultiple.mostrarPopup({titulo: 'Etiquetar varios prospectos', template: 'Prospectos', origen: 'contactos', callback: ReloadData});
		setTimeout(function(){
			console.log('Eliminamos todas las etiquetas');
			$('.w50.pl5 > label > input').click();

			var items = SalesUp.Variables.etiquetasUsuario.split(',');
			items.pop();

			var select = $('.ltEtiquetas')[0].selectize;

			for(var i=0; i < items.length; i++){
				select.addItem(items[i]);
			}

			expect($('.ltEtiquetas').val()+',').toEqual(SalesUp.Variables.etiquetasUsuario);
			SalesUp.Variables.etiquetarMultiple.guardar();
			setTimeout(function(){
				done();
			}, 2000);
		}, 2000);
	});

	arrTest.push(respTest);

	respTest = it('Regresamos los valores como se encontraban originalmente', function(done){
		console.log('Regresamos los valores como se encontraban originalmente');
	
		$('tbody .accionesMultiples input')[0].click();
		SalesUp.Variables.etiquetarMultiple.mostrarPopup({titulo: 'Etiquetar varios prospectos', template: 'Prospectos', origen: 'contactos', callback: ReloadData});
		setTimeout(function(){
			var items = SalesUp.Variables.etiquetasOriginales.split(',');
			items.pop();

			var select = $('.ltEtiquetas')[0].selectize;

			for(var i=0; i < items.length; i++){
				select.addItem(items[i]);
			}
			SalesUp.Variables.etiquetarMultiple.guardar();
			setTimeout(function(){
				SalesUp.Variables.accionesComunes.obtenerDatosProspecto({tkp: SalesUp.Variables.tkp});
				setTimeout(function(){
					var etiquetasUsuario = SalesUp.Variables.etiquetasUsuario.split(',');
					etiquetasUsuario.pop();

					var items = SalesUp.Variables.etiquetasOriginales.split(',');
					items.pop();

					expect(etiquetasUsuario.length).toEqual(items.length);
					done();
				}, 2000);
			}, 2000);
		}, 2000);
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