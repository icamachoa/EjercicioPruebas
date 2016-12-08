var testing = (window.opener != null) ? window.opener.test : null, arrTest = [], respTest;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('test popup etiquetar: ', function(){
	beforeAll(function(done){
		setTimeout(function(){
			console.log('Cargamos la lista de prospectos');
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

	respTest = it('Existe la funcion "etiquetar" en las opciones', function(done) {
		console.log('validamos que exista la funcion de "etiquetar"');
		expect(typeof SalesUp.Variables.etiquetar.mostrarPopup).toEqual('function');
		done();
	});

	arrTest.push(respTest);

	respTest = it('mostramos el modal de etiquetar', function(done){
		console.log('mostramos el popup');
		SalesUp.Variables.etiquetar.mostrarPopup({tkp: SalesUp.Variables.tkp, callback: ReloadData});
		setTimeout(function(){
			var existeModal = $('#popEtiquetarContacto') ? true : false;
			SalesUp.Variables.etiquetasOriginales = SalesUp.Variables.etiquetasUsuario;

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

	respTest = it('Eliminamos todas las etiquetas', function(done){
		setTimeout(function(){
			console.log('Ya existe la lista de etiquetas');

			var select = $('.ltEtiquetas')[0].selectize;
			select.clear();
			SalesUp.Variables.etiquetar.guardar();
			setTimeout(function() {
				expect(true).toBeTruthy(); //Validamos en el siguiente paso
				done();
			}, 2000);
		}, 2000);
	});

	arrTest.push(respTest);

	respTest = it('Validamos que el usuario no tenga etiquetas', function(done){
		console.log('Obtenemos el nombre de la opcion seleccionada y comparamos que sea distinta a la original');
		SalesUp.Variables.etiquetar.mostrarPopup({tkp: SalesUp.Variables.tkp, callback: ReloadData});
		setTimeout(function(){
			expect(SalesUp.Variables.etiquetasUsuario).toEqual('');
			done();
		}, 2000);
	});

	arrTest.push(respTest);

	respTest = it('Agregamos todas las etiquetas', function(done){
		console.log('Agregamos todas las etiquetas');
		var select = $('.ltEtiquetas')[0].selectize;
		for(var i=0; i < SalesUp.Variables.etiquetas.length; i++){
			select.addItem(SalesUp.Variables.etiquetas[i].TKETIQ);
		}
		SalesUp.Variables.etiquetar.guardar();
		setTimeout(function(){
			SalesUp.Variables.accionesComunes.obtenerDatosProspecto({tkp: SalesUp.Variables.tkp});
			setTimeout(function(){
				var numEtiquetas = SalesUp.Variables.jsonDatosProspecto.TEtiquetas.split(',');
				numEtiquetas.pop();

				expect(numEtiquetas.length).toEqual(SalesUp.Variables.etiquetas.length);
				done();
			}, 2000);
		}, 2000);
	});

	arrTest.push(respTest);

	respTest = it('Regresamos la informacion a como estaba originalmente', function(done){
		console.log('Regresamos la informacion a como estaba originalmente');
		
		SalesUp.Variables.etiquetar.mostrarPopup({tkp: SalesUp.Variables.tkp, callback: ReloadData});
		setTimeout(function(){
			var select = $('.ltEtiquetas')[0].selectize;
			select.clear();

			var items = SalesUp.Variables.etiquetasOriginales.split(',');

			for(var i=0; i < items.length; i++){
				select.addItem(items[i]);
			}

			SalesUp.Variables.etiquetar.guardar();
			setTimeout(function(){
				expect(true).toBeTruthy();
				done();
			}, 2000);
		}, 2000);
	});

	arrTest.push(respTest);
	
	afterAll(function() {
		//$('#eliminarFiltros').click();
		if (testing) {
			testing.guardaRespuesta(arrTest,1, window);
		}else{
			return;
		}		
	});
});