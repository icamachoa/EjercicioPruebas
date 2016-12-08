//SalesUp.Variables.descartar.mostrarPopup({titulo:'Descartar prospecto', tkp: '{{Tkp}}', origen: 'prospectos', tipo: 1});
localStorage.clear();
var testing = (window.opener != null) ? window.opener.test : null, arrTest = [], respTest;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

describe('test popup descartar acciones Multiples: ', function(){
	beforeAll(function(done){
		setTimeout(function(){
			console.log('Esperamos a que cargue la tabla de prospectos');
			$('#ListaFiltros #agregarFiltro').click();
			$('#FiltroTipo').val(1).change();

			setTimeout(function() {
				$('#FiltroDetalle').val(0).change();
				setTimeout(function () {
					SalesUp.Variables.jsonProspectos = SalesUp.Variables.jsonprospectos.JsonDatos;
					SalesUp.Variables.tkp = SalesUp.Variables.jsonProspectos[0].Tkp;
					SalesUp.Variables.nombreProspecto = SalesUp.Variables.jsonProspectos[0].NombreCliente;
					done();
				}, 4000);
			}, 4000);
		}, 6000);
		
	});

	respTest = it('Existe la funcion "descartar" en las opciones', function(done) {
		console.log('validamos que exista la funcion de "descartar"');
		expect(typeof SalesUp.Variables.descartar.mostrarPopup).toEqual('function');
		done();
	});

	arrTest.push(respTest);

	respTest = it('mostramos el modal de descartar', function(done){
		SalesUp.Variables.descartar.mostrarPopup({titulo:'Descartar prospecto', tkp: SalesUp.Variables.tkp, origen: 'prospectos', tipo: 1});
		setTimeout(function(){
			console.log('mostramos el popup');
			var existeModal = $('#popDescartarContacto') ? true : false;
			expect(existeModal).toBeTruthy();
			done();
		}, 4000);
	});

	arrTest.push(respTest);

	respTest = it('Validamos que exista una lista de razones para descartar ', function(done){
		setTimeout(function(){
			console.log('validamos que exista una lista de razones para descartar');
			expect(typeof SalesUp.Variables.ltRazones).toEqual('object');
			done();
		}, 4000);
	});

	arrTest.push(respTest);

	respTest = it('seleccionamos alguna razon', function(done){
		setTimeout(function(){
			console.log('Ya existe la lista de razones');
			for(var i=0; i < SalesUp.Variables.ltRazones.length; i++){
				if(SalesUp.Variables.ltRazones[i].tkrazon != '0'){ 
					var opcion = SalesUp.Variables.ltRazones[i].tkrazon;
					break;
				}
			}
			var select = $('.ltRazones')[0].selectize;
			select.addItem(opcion);

			expect($('.ltRazones').val()).toEqual(opcion);
			done();
		}, 4000);
	});

	arrTest.push(respTest);

	respTest = it('llamamos a la funcion de guardar', function(done){
		console.log('llamamos a la funcion de guardar');
		expect(typeof SalesUp.Variables.descartar.validar).toEqual('function');
		$('#BtnAceptar').click();
		done();
	});

	arrTest.push(respTest);
	
	respTest = it('Validamos que se ha guardado el cambio', function(done){
		setTimeout(function(){
			console.log('Validamos que se ha guardado el cambio');
			$('#eliminarFiltros').click();
			setTimeout(function(){
				$('#ListaFiltros #agregarFiltro').click();
				$('#FiltroTipo').val(21).change();
				setTimeout(function(){
					$('#FiltroDetalle').val(2).change();
					setTimeout(function(){
						$('#ListaFiltros #agregarFiltro').click();
						$('#FiltroTipo').val(4).change();
						setTimeout(function(){
							$('#FiltroDetalleTxt').val(SalesUp.Variables.nombreProspecto);
							CambiaFiltro();
							setTimeout(function(){
								expect(SalesUp.Variables.jsonprospectos.JsonDatos[0].Tkp).toEqual(SalesUp.Variables.tkp);
								done();
							}, 4000);
						}, 4000);
					}, 4000);
				}, 4000);
			}, 4000);
		}, 4000);
	});

	arrTest.push(respTest);
	
	respTest = it('Regresamos la informacion a como estaba originalmente', function(done){
		console.log('Regresamos la informacion a como estaba originalmente');
		SalesUp.Variables.reestablecerProspecto({tkp: SalesUp.Variables.tkp});
		setTimeout(function(){
			//localStorage.clear();	//Para evitar que el template de las tablas quede desfazado
			$('#eliminarFiltros').click();
			setTimeout(function(){
				$('#ListaFiltros #agregarFiltro').click();
				$('#FiltroTipo').val(1).change();
				setTimeout(function(){
					$('#FiltroDetalle').val(0).change();
					setTimeout(function(){
						$('#ListaFiltros #agregarFiltro').click();
						$('#FiltroTipo').val(4).change();
						setTimeout(function(){
							$('#FiltroDetalleTxt').val(SalesUp.Variables.nombreProspecto);
							CambiaFiltro();
							setTimeout(function(){
								var esto = _.where(SalesUp.Variables.jsonprospectos.JsonDatos,{"Tkp":SalesUp.Variables.tkp});
								expect(esto.length).toEqual(1);
								done();
							}, 4000);
						}, 4000);
					}, 4000);
				}, 4000);
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