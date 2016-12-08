var testing = (window.opener != null) ? window.opener.test : null, arrTest = [], respTest;

describe('consulta el numero de metas del ejecutivo',function(){
	var componente = 0,tipo = 1;
	//var nMetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/revisaMetas.dbsp',Parametros:'componente='+componente+'',DataType:'json'}).jsonDatos;
	var metas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/jsonDatosMetas_Alerta.dbsp',Parametros:'PERIODO_SELECCIONADO='+componente+'&TIPOCONSULTA='+tipo,DataType:'json'}).jsonDatos;
	console.log(metas);
	afterAll(function(){
		if (testing) {
			testing.guardaRespuesta(arrTest,1, window);
		}	
	});

	respTest = it('El objeto metas debe estar definido',function(){
		expect(metas).toBeDefined();
	});
	arrTest.push(respTest);

	respTest = it('El objeto metas no debe estar vacio',function(){
		expect(metas).not.toEqual([{}]);
	});
	arrTest.push(respTest);

	respTest = it('El ejecutivo tener al menos una meta',function(){
		expect(metas.length).toBeGreaterThan(0);
	});
	arrTest.push(respTest);

	arrTest.push(respTest);
	respTest = it('Debe existir una meta de clientes nuevos',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==6){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	/*Actualizar cuando la meta sea corporativa verificar la meta de canalizaciones*/
	/*respTest = it('Debe existir una meta de conteo de canalizaciones',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==31){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});*/

	arrTest.push(respTest);
	respTest = it('Debe existir una meta de conteo de citas',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==26){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de conteo de cobros',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==18){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de conteo de emails',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==25){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de conteo de llamadas',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==23){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de conteo de oportunidades',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==14){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de conteo de prospectos',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==16){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de conteo de seguimientos',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==6){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de conteo de tareas',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==27){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de conteo de ventas',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==15){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de Conteo de ventas efectivamente cobradas',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==35){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de conteo de visitas',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==24){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de cotizaciones',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==30){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de monto de cobranza',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==5){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de monto de comisiones',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==8){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de Monto de comisiones efectivamente cobradas',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==9){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de monto de oportunidades',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==33){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de monto de ventas',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==4){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de Monto de ventas efectivamente cobradas',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==3){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de Monto de ventas nuevas',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==1){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de Monto de ventas recurrentes',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==2){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de Monto promedio de cobro',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==12){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de Monto promedio de ventas',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==11){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de Monto promedio de ventas efectivamente cobradas',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==34){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de Monto promedio oportunidades',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==10){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de Prospectos nuevos',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==29){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de Ticket promedio',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==19){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
	respTest = it('Debe existir una meta de Velocidad de venta',function(){
		var bool=false;
		for(var i=0;i<=metas.length-1;i++){
			if(metas[i].IDCOMPONENTE==22){
				bool=true;
			}
		}
		expect(bool).toEqual(true);
	});
	arrTest.push(respTest);
});

