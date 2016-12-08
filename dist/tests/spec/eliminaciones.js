jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
var testing = (window.opener != null) ? window.opener.test : null, arrTest = [], respTest;

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
  //return new Promise(resolve => setTimeout(resolve, time));

}

var Date1 = new Date();
var year = Date1.getYear();
var month =Date1.getMonth();
var day = Date1.getDay();


describe("Eliminaciones y sus filtros", function() {
	respTest = it('Debe existir la función de eliminaciones', function() {
		expect(typeof SalesUp.eliminacion.inicializaEliminaciones).toEqual('function');
	});
	arrTest.push(respTest);

	respTest = it('Debe existir la función de filtros', function() {
		expect(typeof SalesUp.filtros.construyeFiltro).toEqual('function');
	});
	arrTest.push(respTest);

	describe('Son 167 registros descartados en el testcase', function() {
		
		beforeAll(function(done) {
			// sleep(500).then();
			setTimeout(function(){done()},1000);
		}, 6000);

		respTest = it('Filtro realizado', function(done) {
			expect(SalesUp.Variables.totalRegistros).toEqual(167);
			done();
		});
		arrTest.push(respTest);

	});

	describe('Filtro para eliminar descartados con fase de prospecto 1', function() {

		beforeAll(function(done) {
				sleep(100).then(function(){SalesUp.filtros.AbrirFiltros()});
				sleep(2100).then(function(){$('#FiltroTipo').val(2).change();});
				sleep(3600).then(function(){$('#DetallePrincipal').val($('#DetallePrincipal > option:nth-child(2)').val()).change();});
				setTimeout(function(){done();},5000)
		}, 6000);

		respTest = it('Filtro realizado', function(done) {
			Aeliminados = SalesUp.Variables.totalRegistros;
			expect($('.FiltroEtiqueta').length > 0).toBe(true);
			done();
		});
		arrTest.push(respTest);

	});

	describe('Activar eliminacion', function() {
		beforeAll(function(done) {
				sleep(300).then(function(){	SalesUp.eliminacion.PopUpeliminar();});
				sleep(1100).then(function(){$('#verificacion').val('ELIMINAR INFORMACIÓN');});
				sleep(1600).then(function(){validarEliminacion();});
				sleep(2200).then(function(){SalesUp.eliminacion.procesaEliminacion();});
				// sleep(3000).then(done());
				setTimeout(function(){$('.ModalNotification').remove();done();},3000)
		}, 6000);

		respTest = it('Ahora se deben mostrar 0 prospectos descartados', function(done) {
			expect(SalesUp.Variables.totalRegistros).toEqual(0);
			done();
		});
		arrTest.push(respTest);
	});

	describe('Quitar filtro', function() {
		beforeAll(function(done) {
			SalesUp.filtros.eliminarTodosLosFiltros();
			setTimeout(function(){done();},1200)
		}, 6000);

		respTest = it('Verifica que si se hayan marcado los eliminados', function(done) {
			expect(SalesUp.Variables.totalRegistros).toEqual(167-Aeliminados);
			done();
		});
		arrTest.push(respTest);
	});

	describe('Reestablece test eliminacion', function(){
		beforeAll(function(done) {
			SalesUp.Sistema.CargaDatosAsync({link:'/privado/modelo/mantenimientoDB/reestableceEliminar.test.dbsp',callback:function(){
				SalesUp.eliminacion.inicializaEliminaciones();
				setTimeout(function(){done();},1200)
			}});
		}, 6000);

		respTest = it('deberan haber 167 prospectos descartados para eliminar', function(done) {
			expect(SalesUp.Variables.totalRegistros).toEqual(167);
			done();
		});
		arrTest.push(respTest);

	})


	afterAll(function(){
		if (testing) {
			testing.guardaRespuesta(arrTest,1, window);
		}else{
			return;
		}	
	});
});



