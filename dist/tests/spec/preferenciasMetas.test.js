var testing = (window.opener != null) ? window.opener.test : null, arrTest = [], respTest;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000;

SalesUp.Variables.crearMetasNuevas = 0;
var componente = 0;
var numMetas;
var tiempoEspera = 9000;

describe('Eliminacion de metas',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	beforeAll(function(){
		setTimeout(function(done){
			var $tabla = $('table');
			if ($tabla[0]) {
				eliminarTodaslasMetas();
			}else{
				tiempoEspera = 1000;
				SalesUp.Variables.crearMetasNuevas = 1;
			}
		},2000);
	});

	/*afterEach(function(){
		arrTest.push(respTest);
		console.log(arrTest);
	});*/

	respTest = it('No hay metas',function(done){
		setTimeout(function(){
			componente = 0;
			numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
			expect(numMetas).toBeDefined();
			expect(numMetas).toEqual(0);
			done();
		},tiempoEspera);
	});
	arrTest.push(respTest);

});

describe('meta por clientes nuevos',function(){
	
	tiempoEspera = 10000;

	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 6;
			creaMetas(componente,30);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);

	/*Actualizar cuando la meta sea corporativa insertar la meta de canalizaciones*/
	/*respTest = it('Creacion meta por conteo de canalizaciones',function(done){
		setTimeout(function(){
			componente = 31;
			creaMetas(componente,30);

			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});*/
});

describe('meta por conteo de citas',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 26;
			creaMetas(componente,30);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por conteo de cobros',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 18;
			creaMetas(componente,30);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por conteo de emails',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 25;
			creaMetas(componente,30);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por conteo de llamadas',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 23;
			creaMetas(componente,30);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por conteo de oportunidades',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 14;
			creaMetas(componente,30);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por conteo de prospectos',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 16;
			creaMetas(componente,30);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por conteo de seguimientos',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 28;
			creaMetas(componente,30);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por conteo de tareas',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 27;
			creaMetas(componente,30);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por conteo de ventas',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 15;
			creaMetas(componente,30);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por conteo de ventas efectivamente cobradas',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 35;
			creaMetas(componente,30);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por conteo de visitas',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 24;
			creaMetas(componente,30);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por cotizaciones',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 30;
			creaMetas(componente,30);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por monto de cobranza',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 5;
			creaMetas(componente,30000);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por monto de comisiones',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 8;
			creaMetas(componente,30000);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por monto de comisiones efectivamente cobradas',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 9;
			creaMetas(componente,30000);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por monto de oportunidades',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 33;
			creaMetas(componente,30000);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por ventas',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 4;
			creaMetas(componente,30000);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por ventas efectivamente cobradas',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 3;
			creaMetas(componente,30000);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por ventas nuevas',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 1;
			creaMetas(componente,30000);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por ventas recurrentes',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 2;
			creaMetas(componente,30000);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por monto promedio de cobro',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 12;
			creaMetas(componente,30000);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por monto promedio de ventas',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 11;
			creaMetas(componente,30000);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por monto promedio de ventas efectivamente cobradas',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 34;
			creaMetas(componente,30000);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por monto promedio oportunidades',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 10;
			creaMetas(componente,30000);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por prospectos nuevos',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 29;
			creaMetas(componente,30);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por ticket promedio',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,null, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 19;
			creaMetas(componente,30000);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});

describe('meta por velocidad de ventas',function(){
	
	afterAll(function() {
		if (testing) {
			testing.guardaRespuesta(arrTest,1, window);
		}else{
			return;
		}		
	});

	respTest = it('Meta creada',function(done){
		setTimeout(function(){
			componente = 22;
			creaMetas(componente,30);
			setTimeout(function(){
				numMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos.CANTMETAS;
				expect(numMetas).toBeDefined();
				expect(numMetas).toBeGreaterThan(0);
				done();
			},tiempoEspera);
		},6000);
	});
	arrTest.push(respTest);
});


var creaMetas = function(componente,meta){
	if(SalesUp.Variables.crearMetasNuevas == 1){
		var periodo = 6;
		SalesUp.Sistema.AbrePopUp({Titulo:'Crear meta',Pagina:'/privado/PopupCrearMeta.dbsp', CallBack:'GetData',Alto:270,Ancho:600});
		setTimeout(function(){
			var $formulario = $('#TB_iframeContent').contents().find('#AgregarMeta');
			$formulario.find('#Componente').val(componente);
			var nombreMeta = $formulario.find('#Componente option:selected').text();
			$formulario.find('#Titulo').val(nombreMeta);
			$formulario.find('#Periodo').val(periodo).change();
			setTimeout(function(){
				$formulario.find('#Tipo').val(1).change();
				setTimeout(function(){
					$formulario.find('.tdMetas>input').val(meta).change();
					setTimeout(function(){
						$formulario.find('#BtnAceptar').click();
					},1000);
				},1000);
			},2000);
		},4000);
	}else{
		return;
	}
}

var eliminarTodaslasMetas = function(){
	$('#selecc-todo').attr('checked','checked');
	setTimeout(function(){
	  	$('#selecc-todo').click();
	    setTimeout(function(){
	      $('#mostrarOpsMult').click();
	      setTimeout(function(){
	        $('#eliminar').click();
	        setTimeout(function(){
	        	SalesUp.Variables.crearMetasNuevas = 1;
	           $('.BounceOpenInDown.ContenedorModal.AlertaModal.BoxSizing').find('.Btn-flat-Aceptar').click()
	        },600);
	      },1000);
	    },600);
	},1000);
}