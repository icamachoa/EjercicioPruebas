localStorage.clear();
var testing = (window.opener != null) ? window.opener.test : null, arrTest = [], respTest;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

describe('test popup reasignar: ', function(){
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
					SalesUp.Variables.ejecutivoActual = SalesUp.Variables.jsonProspectos[0].Tku;
					done();
				}, 4000);
			}, 4000);
		}, 6000);
		
	});

	respTest = it('Existe la funcion "reasignar" en las opciones', function(done) {
		console.log('validamos que exista la funcion de "reasignar"');
		expect(typeof SalesUp.Variables.reasignar.mostrarPopup).toEqual('function');
		done();
	});

	arrTest.push(respTest);

	respTest = it('mostramos el modal de etiquetar', function(done){
		console.log('mostramos el popup');
		SalesUp.Variables.reasignar.mostrarPopup({tkp: SalesUp.Variables.tkp, titulo: 'Reasignar el prospecto a otro ejecutivo', seccion: 'prospecto', callback: ReloadData});
		setTimeout(function(){
			var existeModal = $('#popReasignarContacto') ? true : false;
			
			expect(existeModal).toBeTruthy();
			done();
		}, 4000);
	});

	arrTest.push(respTest);

	respTest = it('Validamos que exista una lista de usuarios ', function(done){
		setTimeout(function(){
			console.log('validamos que exista una lista de usuarios');
			expect(typeof SalesUp.Variables.jsonUsuarios).toEqual('object');
			done();
		}, 6000);
	});

	arrTest.push(respTest);

	respTest = it('seleccionamos un ejecutivo distinto al actual y agregamos un comentario', function(done){
		setTimeout(function(){
			console.log('seleccionamos un ejecutivo distinto al actual y agregamos un comentario');
			for(var i=0; i < SalesUp.Variables.jsonUsuarios.length; i++){
				if(SalesUp.Variables.ejecutivoActual != SalesUp.Variables.jsonUsuarios[i].tku){
					var opcion = SalesUp.Variables.jsonUsuarios[i].tku;
					break;
				}
			}
			var select = $('.ltUsuarios')[0].selectize;
			select.addItem(opcion);

			$('#comentario').text('comentario de prueba');

			expect($('.ltUsuarios').val()).toEqual(opcion);
			done();
		}, 4000);
	});

	arrTest.push(respTest);

	respTest = it('Guardamos el nombre del nuevo ejecutivo', function(done){
		console.log('Guardamos el nombre del nuevo ejecutivo y comparamos que sea distinto al original');
		SalesUp.Variables.nuevoEjecutivo = $('.ltUsuarios').val();

		expect(SalesUp.Variables.nuevoEjecutivo).not.toEqual(SalesUp.Variables.ejecutivoActual);
		done();
	});

	arrTest.push(respTest);

	respTest = it('llamamos a la funcion de guardar', function(done){
		console.log('llamamos a la funcion de guardar');
		expect(typeof SalesUp.Variables.reasignar.guardar).toEqual('function');
		SalesUp.Variables.reasignar.guardar();
		done();
	});

	arrTest.push(respTest);

	respTest = it('Validamos que se ha guardado el cambio', function(done){
		setTimeout(function(){
			console.log('Validamos que se ha guardado el cambio');
			expect(SalesUp.Variables.jsonprospectos.JsonDatos[0].Tku).toEqual(SalesUp.Variables.nuevoEjecutivo);
			done();
		}, 6000);
	});

	arrTest.push(respTest);

	respTest = it('Regresamos la informacion a como estaba originalmente', function(done){
		console.log('Regresamos la informacion a como estaba originalmente');
		SalesUp.Variables.reasignar.mostrarPopup({tkp: SalesUp.Variables.tkp, titulo: 'Reasignar el prospecto a otro ejecutivo', seccion: 'prospecto', callback: ReloadData});
		setTimeout(function(){
			var opcion = SalesUp.Variables.ejecutivoActual;
			
			var select = $('.ltUsuarios')[0].selectize;
			select.addItem(opcion);
			
			SalesUp.Variables.reasignar.guardar();
			setTimeout(function(){
				expect(SalesUp.Variables.ejecutivoActual).toEqual(SalesUp.Variables.jsonprospectos.JsonDatos[0].Tku);
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