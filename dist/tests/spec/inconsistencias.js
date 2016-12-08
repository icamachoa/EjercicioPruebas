localStorage.clear();
jasmine.DEFAULT_TIMEOUT_INTERVAL =15000;
var testing = (window.opener != null) ? window.opener.test : null, arrTest = [], respTest;

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

var configuracionClick = function(){
	$('#btnConfigura').click();
  	sleep(3000).then(function(){
 		$('#popUpConfiguracion input:checked').prop('checked',false);
 		$('#BtnGuardaConfig').click();
 	});
 	sleep(5000).then(function(){
 		$('#btnConfigura').click();
 	});
 	sleep(7000).then(function(){
 		$('#popUpConfiguracion input').prop('checked',true);
 		$('#BtnGuardaConfig').click();
 	});
}

describe('Configuracion de inconsistencias',function(){
	 
	beforeAll(function(done) {
		sleep(4000).then (function () {
			configuracionClick();
			done();
		});
	});

	respTest = it('Debe existir la funcion que inicializa inconsistencias',function(){
		expect(typeof SalesUp.inconsistencia.inicializaInconsistencia).toEqual('function');
	});
	arrTest.push(respTest);

	respTest = it('Debe existir la funcion configuracion inconsistencias',function(){
		expect(typeof SalesUp.inconsistencia.popupConfiguracion).toEqual('function');
	});
	arrTest.push(respTest);

	respTest = it('Debe existir la funcion detalle inconsistencias',function(){
		expect(typeof SalesUp.inconsistencia.verInconsistencia).toEqual('function');
	});
	arrTest.push(respTest);

	respTest = it('Debe existir la funcion refrescar inconsistencia',function(){
		expect(typeof SalesUp.inconsistencia.refreshInconsistencia).toEqual('function');
	});
	arrTest.push(respTest);

	respTest = it('Debe existir la funcion refrescar inconsistencia',function(){
		expect(typeof SalesUp.inconsistencia.refreshInconsistencia).toEqual('function');
	});
	arrTest.push(respTest);

	describe('Seleccionamos todas las inconsistencias de la configuracion', function(){
		
	});

});
 
/*
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
				sleep(1100).then(function(){$('#FiltroTipo').val(2).change();});
				sleep(1600).then(function(){$('#DetallePrincipal').val($('#DetallePrincipal > option:nth-child(2)').val()).change();});
				// sleep(3000).then(done());
				setTimeout(function(){done();},3000)
		}, 6000);

		respTest = it('Filtro realizado', function(done) {
			expect(SalesUp.Variables.totalRegistros).toEqual(30);
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

		respTest = it('Solo deberian quedar 137 prospectos descartados para eliminar', function(done) {
			expect(SalesUp.Variables.totalRegistros).toEqual(137);
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
			testing.guardaRespuesta(arrTest);
		}		
	});
});*/



