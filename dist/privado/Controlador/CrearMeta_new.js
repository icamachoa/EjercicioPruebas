$(document).ready(function(){
	var Componentes = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonComponentes.dbsp',DataType:'json'}).jsonDatos;
	var componente = '';
		for(var i=0; i<Componentes.length; i++){
			componente += '<option value="'+Componentes[i].IDCOMPONENTE+'" data-cate="'+Componentes[i].CATEGORIASVISIBLES+'" data-formato="'+Componentes[i].FORMATO+'">'+Componentes[i].NOMBRE_COMPONENTE+'</option>';
		}
	$('#Componente').html(componente);
	ActivaFiltro();
	var anio = SalesUp.Construye.opcionesAnios({n:3});
	$('#anio').html(anio);		
	$('#Periodo, #anio, #mes, #durante').change(function() {
		Tipos($('#Tipo').val());
		CuentaTabla();
	});
	$('#Tipo').change(function(){
		var resetear = $('#Tipo').val();
		Limpiar();
/*
		if(resetear == 1){
			$('#durante').val(1);
			CambiaDuracion();
		}
*/
		ConstruyeTabla();
	})
	parent.self.SalesUp.Sistema.CambiarTamanioPopUp({Ancho:970,Alto:400});	
	seleccionados = [];
	SalesUp.Variables.AgregarFiltroMeta();	

	sGrupo = SalesUp.Sistema.Almacenamiento({a:'SysIdGrupo'});
	var arrGrupos = [];
	var arrIdGrupos = [];
	var objGrupos = [];
	var objTodos = [];
	for(var i = 0; i <= quedan.length - 1; i++){
	  var GRUPO = quedan[i].GRUPO;
	  var IDGRUPO = quedan[i].IDUSUARIOGRUPO;
	  var arr={};
	  var Todos = {};
	  if(arrGrupos.indexOf(GRUPO)==-1){
	    arr.GRUPO = GRUPO;
	    objGrupos.push(arr);
	    arrGrupos.push(GRUPO);
	    arrIdGrupos.push(IDGRUPO);

		Todos.IDUSUARIO = 'G'+IDGRUPO;
		Todos.NOMBRE = '(... Todos lo de '+GRUPO+' ...)';
		Todos.GRUPO = GRUPO;
		objTodos.push(Todos);
	  }
	}

	quedan = _.union(objTodos,quedan)

	var Posicion = '';
	for(var x = 0; x <= arrIdGrupos.length - 1; x++){
	  if(arrIdGrupos[x]==sGrupo){Posicion=x;}
	}

	var MiGrupo = arrGrupos[Posicion];

	arrGrupos = _.reject(arrGrupos, function(arr){ 
	  if(arr==MiGrupo)
	  return arr; 
	});


	var arrNuevoOrden = [];
	arrNuevoOrden.push(MiGrupo);

	arrGrupos = _.sortBy(arrGrupos, function(arr){ 
	  return arr; 
	});

	for(var z = 0; z <= arrGrupos.length - 1; z++){
	  arrNuevoOrden.push(arrGrupos[z]);
	}

	setTimeout(function(){
		$('#SelectIds').selectize({
			maxItems:1,
		    options:quedan,
		    valueField:'IDUSUARIO',
		    searchField:['NOMBRE'],
		    labelField:'NOMBRE',
		    optgroups:objGrupos,
		    optgroupField:'GRUPO',
		    optgroupLabelField:'GRUPO',
		    optgroupValueField:'GRUPO',
		    optgroupOrder:arrNuevoOrden,
		    copyClassesToDropdown: true,
			onChange: function(valueField){
				queVoyAgregar(valueField);
				
			}
		});
	}, 10);
	
});


function queVoyAgregar(v){
	if(v.indexOf('G')!=-1){
		var idGrupo = parseInt(SalesUp.Sistema.StrReplace('G','',v));
		console.log('todos',idGrupo);
		UsrGrupo = _.where(quedan, {IDUSUARIOGRUPO:idGrupo});
		
		for (var i = 0; i <= UsrGrupo.length - 1; i++){
			Agregar(UsrGrupo[i].IDUSUARIO);
		};
	}else{
		Agregar(v);
	}
}

	function ActivaFiltro(){

		if($optionSelectize){
			$optionSelectize[0].selectize.destroy();
			$optionSelectize = undefined;
			$('#OpcionesContactos').hide();
		}
	
		var af = $("#Componente option:selected").attr('data-cate');
		if((af=='')){
			$('#BoxPasos').hide();
		}else{
			$('#BoxPasos').show();
		}
		var Paso = _.size($('.PasoBox'))+1;
		SalesUp.Variables.ActivaMostrarFiltros({Paso:Paso, Out:true});
	}
	var TKE = SalesUp.Sistema.Almacenamiento({a:'SysTke'}); 
	var Ejecutivos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonEjecutivoMetas.dbsp',DataType:'json'}).jsonDatos;
	var Grupos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonGrupos.dbsp',DataType:'json'}).jsonDatos;
	var Distribuidores = SalesUp.Sistema.CargaDatos({Link:'https://control.salesup.com.mx/canalizaciones/obtieneDistribuidores.dbsp?TKE='+TKE, DataType:'json'}).datos;
	Distribuidores.jsonDatos = Distribuidores;

	function CambiaDuracion(){
		var dur = $('#durante').val();
		var per = $('#Periodo').val();
		var pers = $('#durdiario').val();
		if((dur==1)&&(per==2)){
			$('#duracion').html('<span>año</span>');
		}
		if((dur!=1)&&(per==2)){
			$('#duracion').html('<span>años</span>');
		}
		if((dur==1)&&(per==3)){
			$('#duracion').html('<span>semestre</span>');
		}
		if((dur!=1)&&(per==3)){
			$('#duracion').html('<span>semestres</span>');
		}		
		if((dur==1)&&(per==4)){
			$('#duracion').html('<span>trimestre</span>');
		}
		if((dur!=1)&&(per==4)){
			$('#duracion').html('<span>trimestres</span>');
		}
		if((dur==1)&&(per==5)){
			$('#duracion').html('<span>bimestre</span>');
		}
		if((dur!=1)&&(per==5)){
			$('#duracion').html('<span>bimestres</span>');
		}
		if((dur==1)&&(per==6)){
			$('#duracion').html('<span>mes</span>');
		}
		if((dur!=1)&&(per==6)){
			$('#duracion').html('<span>meses</span>');			
		}
		if((dur==1)&&(per==7)){
			$('#duracion').html('<span>quincena</span>');			
		}
		if((dur!=1)&&(per==7)){
			$('#duracion').html('<span>quincenas</span>');
		}
		if((dur==1)&&(per==8)){
			$('#duracion').html('<span>semana</span>');
		}
		if((dur!=1)&&(per==8)){
			$('#duracion').html('<span>semanas</span>');
		}
		if((dur==1)&&(per==9)){
			$('#duracion').html('<span>día</span>');
		}
		if((per==9)&&(pers>=2)){
			$('#duracion').html('<span>días</span>');
		}
		
	}
	var antes = 1;
	function CuentaTabla(){
			var nuevo = $('#durante').val(); 
			var tipo=$('#Periodo').val();
			var tipoMeta = $('#Tipo').val();
			if(tipo==1){
				nuevo = 0;
			}
			if((nuevo-antes)>0){
				if(tipoMeta==1){
					
				}else{
				for(var i=0; i<(nuevo-antes); i++){
			    var tdheads  = parseInt($('#Data').children('tr').children('td').length-3);
			    var tdbodies = $('#DataTabla').children('tr').children('td').length;
				$('#DataTabla').children('tr').children('td:last-child').before('<td class="tdMetas"><input type="text" class="InputMetas"></td>');					
				}
				
			} 
			antes = nuevo;			
			}else{
				var contador = -1*(nuevo-antes);		
				var tabla='#DataTabla tr';	
				for(var i=0; i<contador; i++){
					var tipo=$('#Periodo').val();
					if(tipo==1){
						nuevo = 0;
						var te = $('#DataTabla tr:first td').length;
					}else{
						var te = $('#DataTabla tr:first td').length-2;	
					}
					
					$(tabla).each(function(){
	 					$(this).find("td").eq(te).remove();
					});
					var tipoMeta = $('#Tipo').val();
				}
				if(tipoMeta==1){
					ConstruyeTabla();
				}
				
			antes = nuevo;			
			}	
	}



	function Durante() {
		document.getElementById('durante').options.length = 0;
		var n = 12;
		var select = document.getElementById('durante');
		for (var i=0; i<n; i++) {
		 	select.options[select.options.length] = new Option(i+1, i+1);
		}
	}
	
	function Periodos(v){
		var tipo = $('#Tipo').val();
		if(v==1){
			$('#Rango').show();
			$('#durdiario, #Filtros').hide();
		}
		if(v==2){
			$('#Rango, #durdiario').hide();
			$('#Filtros, #durante, #LosFiltros, #Filtro').show();
			$('#duracion').html('<span>año</span>');
			Durante();
		}
		if(v==3){
			$('#Rango, #durdiario').hide();
			$('#Filtros, #durante,#LosFiltros, #Filtro').show();		
			$('#duracion').html('<span>semestre</span>');	
			Durante();
		}
		if(v==4){
			$('#Rango, #durdiario').hide();
			$('#Filtros, #durante,#LosFiltros, #Filtro').show();			
			$('#duracion').html('<span>trimestre</span>');
			Durante();
		}
		if(v==5){
			$('#Rango, #durdiario').hide();
			$('#Filtros, #durante,#LosFiltros, #Filtro').show();		
			$('#duracion').html('<span>bimestre</span>');
			Durante();
		}	
		if(v==6){
			$('#Rango, #durdiario').hide();
			$('#Filtros, #durante,#LosFiltros, #Filtro').show();		
			$('#duracion').html('<span>mes</span>');
			Durante();
		}	
		if(v==7){	
			$('#Rango, #durdiario').hide();
			$('#Filtros, #durante,#LosFiltros, #Filtro').show();
			$('#duracion').html('<span>quincena</span>');
			Durante();
		}
		if(v==8){
			$('#Rango, #durdiario').hide();
			$('#Filtros, #durante,#LosFiltros, #Filtro').show();
			$('#duracion').html('<span>semana</span>');
			Durante();
		}
		if(v==9){
			$('#Rango, #durante').hide();			
			$('#Filtros, #durdiario,#LosFiltros, #Filtro').show();
			$('#duracion').html('<span>día</span>');
		}
	}
	
	function Inicio(){
	return new Date($('#mes').val()+'/01/'+$('#anio').val()); 
	}
	
	function CalculaFinal(){
	var tipo=$('#Periodo').val();
	var duracion=$('#durante').val();
	var inicio= new Inicio();
	var fin=Inicio();	
	arrTitulos = {};
	arrTitulos.jsonDatos = [];	
		if(parseInt(tipo)==9)
		duracion=$('#durdiario').val();
		duracion=parseInt(duracion);		
		switch(parseInt(tipo)){

			case 2:
				var numSem=1;
				var duracionAux=0;
				var numSem=1;

									
				while(duracionAux<duracion){
				var ConfigTitulos = {};
				var fins='';
				var sem='';
					sem= fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear()+' a ';
				var ini = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();	
				fin.setMonth(parseInt(fin.getMonth()) +12);
				fin.setDate(parseInt(fin.getDate()) -1);
				fins = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
					sem= sem+fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
				fin.setDate(parseInt(fin.getDate())+1);
					//console.log(sem+ ' Año'+numSem);
					ConfigTitulos.heads 	= 'Año '+numSem;
					numSem++;	
					duracionAux++;
					ConfigTitulos.fInicio 	= ini;
					ConfigTitulos.fFin 		= fins;
					ConfigTitulos.tip 		= sem;					
					arrTitulos.jsonDatos.push(ConfigTitulos);
				}
			break;
			case 3:
				var numSem=1;
				var duracionAux=0;
				var numSem=1;
				while(duracionAux<duracion){
				var ConfigTitulos = {};
				var fins='';
				var sem='';
					sem= fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear()+' a ';
				var ini = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();					
				fin.setMonth(parseInt(fin.getMonth()) +6);
				fin.setDate(parseInt(fin.getDate()) -1);
				fins = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
					sem= sem+fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
				fin.setDate(parseInt(fin.getDate()) +1);
				
					//console.log(sem+ ' SEM'+numSem);
					ConfigTitulos.heads		= 'Semestre '+numSem;
					numSem++;					
					duracionAux++;
					ConfigTitulos.fInicio 	= ini;
					ConfigTitulos.fFin 		= fins;
					ConfigTitulos.tip 		= sem;					
					arrTitulos.jsonDatos.push(ConfigTitulos);

				}
			break;
			case 4:
				var numSem=1;
				var duracionAux=0;
				var numSem=1;
				while(duracionAux<duracion){
				var ConfigTitulos = {};
				var fins='';				
				var sem='';
					sem= fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear()+' a ';
				var ini = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();					
				fin.setMonth(parseInt(fin.getMonth()) +3);
				fin.setDate(parseInt(fin.getDate()) -1);
				fins = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
					sem= sem+fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
				fin.setDate(parseInt(fin.getDate()) +1);
				
					//console.log(sem+ ' TRIM'+numSem);
					ConfigTitulos.heads		= 'Trimestre '+numSem;
					numSem++;					
					duracionAux++;
					ConfigTitulos.fInicio 	= ini;
					ConfigTitulos.fFin 		= fins;
					ConfigTitulos.tip 		= sem;					
					arrTitulos.jsonDatos.push(ConfigTitulos);
					
				}
			break;		
			case 5:
				var numSem=1;
				var duracionAux=0;
				var numSem=1;
				while(duracionAux<duracion){
				var ConfigTitulos = {};
				var fins='';									
				var sem='';
					sem= fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear()+' a ';
				var ini = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
				fin.setMonth(parseInt(fin.getMonth()) +2);
				fin.setDate(parseInt(fin.getDate()) -1);
				fins = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
					sem= sem+fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
				fin.setDate(parseInt(fin.getDate()) +1);
				
					//console.log(sem+ 'BM'+numSem);
					ConfigTitulos.heads		= 'Bimestre '+numSem;
					numSem++;	
					duracionAux++;
					ConfigTitulos.fInicio 	= ini;
					ConfigTitulos.fFin 		= fins;
					ConfigTitulos.tip 		= sem;					
					arrTitulos.jsonDatos.push(ConfigTitulos);
					
				}
			break;
			case 6:
				var numSem=1;
				var duracionAux=0;
				while(duracionAux<duracion){
				var ConfigTitulos = {};
				var fins='';									
				var sem='';
					sem= fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear()+' a ';
				var ini = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();	
				fin.setMonth(parseInt(fin.getMonth()) +1);
				fin.setDate(parseInt(fin.getDate()) -1);
				fins = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
				sem= sem+fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
				fin.setDate(parseInt(fin.getDate()) +1);
				
					//console.log(sem+ ' Mes'+numSem);
					ConfigTitulos.heads		= 'Mes '+numSem;
					numSem++;	
					duracionAux++;
					ConfigTitulos.fInicio 	= ini;
					ConfigTitulos.fFin 		= fins;
					ConfigTitulos.tip 		= sem;					
					arrTitulos.jsonDatos.push(ConfigTitulos);
					
				}
			break;
			case 7:
				var numSem=1;
				var duracionAux=0;
				var esMitad=0;
				while(duracionAux<duracion){
				var ConfigTitulos = {};
				var fins='';									
				var sem='';

				if(esMitad == 0){
					sem= fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear()+' a ';
					//console.log('es 0', sem);
				var ini = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();	
					fin.setDate(parseInt(fin.getDate()) + 15);
					fins = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
					sem += (fin.getDate()-1)+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
					esMitad=1;
				}
				else{
					sem= fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear()+' a ';
					fin.setDate(parseInt(fin.getDate()) -15);
					fin.setMonth(parseInt(fin.getMonth()) +1);
					fin.setDate(parseInt(fin.getDate()) -1);
					esMitad=0;
					sem += fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
					fin.setDate(parseInt(fin.getDate())+1);
					//console.log('es 1');
					}			
					//console.log(sem+ ' Quincena'+numSem);
					ConfigTitulos.heads		= 'Quincena '+numSem;
					duracionAux++;
					numSem++;
					ConfigTitulos.fInicio 	= ini;
					ConfigTitulos.fFin 		= fins;
					ConfigTitulos.tip 		= sem;		


					arrTitulos.jsonDatos.push(ConfigTitulos);
										
				}
			break;
			case 8:
			var numSem=1;
				var duracionAux=0;
				var esMitad=0;
				while(duracionAux<duracion){
				var ConfigTitulos = {};
				var fins='';									
				var sem='';
	
					sem= fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear()+' a ';
					var ini = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();	
					fin.setDate(parseInt(fin.getDate()) + 7);
					fins = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
					sem += (fin.getDate()-1)+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
						
					//console.log(sem+ ' Quincena'+numSem);
					ConfigTitulos.heads		= 'Semana '+numSem;
					duracionAux++;
					numSem++;
					ConfigTitulos.fInicio 	= ini;
					ConfigTitulos.fFin 		= fins;
					ConfigTitulos.tip 		= sem;		


					arrTitulos.jsonDatos.push(ConfigTitulos);
										
				}
			break;
			case 9:
			var numSem=1;
				var duracionAux=0;
				var esMitad=0;
				while(duracionAux<duracion){
				var ConfigTitulos = {};
				var fins='';									
				var sem='';
	
					sem= fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
					var ini = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();	
					fin.setDate(parseInt(fin.getDate()) + 1);
					fins = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
					//sem += (fin.getDate()-1)+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
						
					//console.log(sem+ ' Quincena'+numSem);
					ConfigTitulos.heads		= 'Dia '+numSem;
					duracionAux++;
					numSem++;
					ConfigTitulos.fInicio 	= ini;
					ConfigTitulos.fFin 		= fins;
					ConfigTitulos.tip 		= sem;		


					arrTitulos.jsonDatos.push(ConfigTitulos);
										
				}
			break;
		}
	var fechaFinal= fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();	
	return fechaFinal;
	
	}	

	function Tipos(v){
		var periodo = $('#Periodo').val();
		if((v != 0)&&(periodo != 0)){			
		AgregarMeta();
			var UsersTemplate = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateVendedores.dbsp'});
			
			var per  = ($('#Periodo').val() - 2);
			var mes  = $('#mes').val();
			var anio = $('#anio').val();
			var inicio = mes+'/01/'+anio;
			var fin = CalculaFinal();
		var CreaTab = arrTitulos;
		var CreaTabla = CreaTab;
							
		if(v==3){
			var j = '{"TipoMeta":[{"IZQUIERDA":"Ejecutivo"},{"IZQUIERDA":"Grupo"}]}';
			j = JSON.parse(j);
			$('#LosFiltros, #ListaFiltros, #Filtro').show();
		}
		if(v==2){
			var j = '{"TipoMeta":[{"IZQUIERDA":"Grupo"}]}';
			j = JSON.parse(j);
			$('#LosFiltros, #ListaFiltros').show();			
		}
		if((v==1)||(v==0)){
			var j = '{"TipoMeta":[{}]}';
			j = JSON.parse(j);
			$('#LosFiltros, #ListaFiltros').hide();			
		}
		if(v==4){
			var j = '{"TipoMeta":[{"IZQUIERDA":"Distribuidor"}]}';
			j = JSON.parse(j);
			$('#LosFiltros, #ListaFiltros').show();
		}
		
		var datos = _.union(j,CreaTabla);
		var d = {}
		d.info = datos;
		var Usuarios = SalesUp.Construye.ReemplazaDatos({Datos:d, Template:UsersTemplate});
		$('#Data').html(Usuarios);
		ConstruyeTabla();
		$('#Tabla').show();
		SalesUp.Sistema.Tipsy();
		}else{
			$('#Tabla').hide();
		}

	}
	
	function Limpiar(){
			$('#DataTabla').html('');
			quedan=Ejecutivos;
			restan=Grupos;
			
			seleccionados.length=0;
	}
	
	SalesUp.Variables.ActivaMostrarFiltro = function(){
	  var Activo = $('#FiltrarPor').is(':visible');
	  if (Activo){
	    $('#FiltrarPor').slideUp();
	    setTimeout(function(){ $('#TiposFiltros > *').hide(); }, 400);
	  }else{
	    setTimeout(function(){ $('#FiltrarPor').slideDown(); $('#filtrosDisponibles').focus(); }, 400);
	  }
	}
	
	var quedan = [];
	quedan = Ejecutivos;
	var restan = [];
	restan = Grupos;
	var quedanDistribuidores = [];
	quedanDistribuidores = Distribuidores;

	function Agregar(valueField){
		//var ideliminar = parseInt($('#filtrosDisponibles').val());
		
		var FTipo = $('#Tipo').val();		
		if(FTipo == 4){
			var ideliminar = $('#filtrosDisponibles').val();
			var este = _.where(quedanDistribuidores, {IdDistribuidor:ideliminar});
			var z = _.reject(quedanDistribuidores, function(x){ 
			  if(x.IdDistribuidor==ideliminar)
			  return x
			});	
			quedanDistribuidores = [];
			for(var i = 0;i<_.size(z);i++){
			  quedanDistribuidores.push(z[i]);
			}
		}

		if(FTipo == 3){
			var ideliminar = parseInt(valueField);
			var este = _.where(quedan, {IDUSUARIO:ideliminar});
			var z = _.reject(quedan, function(x){ 
			  if(x.IDUSUARIO==ideliminar)
			  return x
			});	

			quedan = [];
			for(var i = 0;i<_.size(z);i++){
			  quedan.push(z[i]);
			}
		}

		if(FTipo == 2){
			var este = _.where(restan, {Id:ideliminar});
			var z = _.reject(restan, function(x){ 
			  if(x.Id==ideliminar)
			  return x
			});
			restan = [];
			for(var i = 0;i<_.size(z);i++){
			  restan.push(z[i]);
			}	
		}
		seleccionados.push(este[0]);

		AgregarMeta();
		ConstruyeTabla();
		

		if(FTipo == 3){
			$('#SelectIds')[0].selectize.setValue(['']);
			$('#SelectIds')[0].selectize.removeOption(ideliminar);

		}
 		//EliminarSelectize();					
	}
	
	function Eliminar(Op){
		// $('#SelectIds')[0].selectize.addOption({ IDUSUARIO: idagregar, NOMBRE: 'Jesus Novelo Vázquez' });


		var FTipo = $('#Tipo').val();	
		var idagregar = parseInt(Op.ID);
		var nombre = Op.NOMBRE;
		
		if(FTipo == 4){		

			var idagregar = Op.ID.toString();
			var elimina = _.where(seleccionados, {IdDistribuidor: idagregar});
			var lista = _.reject(seleccionados, function(xx){ 
			  if(xx.IdDistribuidor==idagregar)
			  return xx
			});
		seleccionados = [];
		for(var i = 0;i<_.size(lista);i++){
		  seleccionados.push(lista[i]);
		}
		quedanDistribuidores.push(elimina[0]);	
		$('#DataTabla tr[data-IdDistribuidor="'+idagregar+'"]').remove();
		}
		if(FTipo == 3){
		console.log(nombre)			
			var elimina = _.where(seleccionados, {IDUSUARIO: idagregar});
			var lista = _.reject(seleccionados, function(xx){ 
			  if(xx.IDUSUARIO==idagregar)
			  return xx
			});
		seleccionados = [];
		for(var i = 0;i<_.size(lista);i++){
		  seleccionados.push(lista[i]);
		}
		quedan.push(elimina[0]);						
		$('#SelectIds')[0].selectize.addOption({ IDUSUARIO: idagregar, NOMBRE: nombre });
		$('#DataTabla tr[data-idusuario="'+idagregar+'"]').remove();
		}
		if(FTipo == 2){
			var elimina = _.where(seleccionados, {Id: idagregar});
			var lista = _.reject(seleccionados, function(xx){ 
			  if(xx.Id==idagregar)
			  return xx
			});
		seleccionados = [];
		for(var i = 0;i<_.size(lista);i++){
		  seleccionados.push(lista[i]);
		}
		restan.push(elimina[0]);
		$('#DataTabla tr[data-idgrupo="'+idagregar+'"]').remove();									
		}	
		//EliminarSelectize();
//		AgregarMeta();
		
			
	}
	
	function ConstruyeTabla(){
		var Tiempo = $("#Periodo option:selected").html();
		var FTipo = $('#Tipo').val();
		var	CreaTablaDatos = '';
		seleccionados = _.reject(seleccionados,function(j){return _.size(j)==0;});

		if(FTipo == 3){
			for(var ii=0; ii<seleccionados.length; ii++){
				if(!_.size($('tr[data-idusuario='+seleccionados[ii].IDUSUARIO+']'))){
		        	CreaTablaDatos = '<tr class="DatosMeta" data-idusuario="'+(seleccionados[ii].IDUSUARIO ? seleccionados[ii].IDUSUARIO:'')+'" data-idgrupo="'+seleccionados[ii].IDUSUARIOGRUPO+'">';
			        CreaTablaDatos += '<td class="tdEjecutivo" style="width:180px">'+seleccionados[ii].NOMBRE+'<span class="quitar Tip4" tip="Eliminar ejecutivo" onclick="Eliminar({ID: '+seleccionados[ii].IDUSUARIO+', NOMBRE:'+seleccionados[ii].NOMBRE+'})"><i class="fa fa-lg fa-user-times"></i></span></td>';
			        CreaTablaDatos += '<td class="tdGrupo">'+seleccionados[ii].GRUPO+'</td>';					
					for(var e=0; e<$('#Data td').length-3; e++){
		            	CreaTablaDatos += '<td class="tdMetas"><input type="text" class="InputMetas"></td>';
		        	}
		        	CreaTablaDatos += '<td class="tdTotal"><input class="TotalMetas" type="text" name="TotalMeta"></td>';
					CreaTablaDatos += '</tr>';
				}
			}	
		}
	
		if(FTipo == 2){
			for(var x=0; x<seleccionados.length; x++){			
				if(!_.size($('tr[data-idgrupo='+seleccionados[x].Id+']'))){
					CreaTablaDatos = '<tr class="DatosMeta" data-idgrupo="'+seleccionados[x].Id+'">';		
					CreaTablaDatos += '<td class="tdGrupo">'+seleccionados[x].Grupo+'<span class="quitar Tip4" tip="Eliminar grupo" onclick="Eliminar({ID: '+seleccionados[x].Id+'})"><i class="fa fa-lg fa-user-times"></i></span></td>';
					for(var e=0; e<$('#Data td').length-2; e++){
						CreaTablaDatos += '<td class="tdMetas"><input class="InputMetas" type="text"></td>';
					}
					CreaTablaDatos += '<td class="tdTotal"><input class="TotalMetas" type="text" name="TotalMeta"></td>';
					CreaTablaDatos += '</tr>';
				}	
			}	
		}		

		if(FTipo == 4){
			for(var xl=0; xl<seleccionados.length; xl++){			
				if(!_.size($('tr[data-IdDistribuidor='+seleccionados[xl].IdDistribuidor+']'))){
					CreaTablaDatos = '<tr class="DatosMeta" data-IdDistribuidor="'+seleccionados[xl].IdDistribuidor+'">';		
					CreaTablaDatos += '<td class="tdGrupo">'+seleccionados[xl].Distribuidor+'<span class="quitar Tip4" tip="Eliminar grupo" onclick="Eliminar({ID: '+seleccionados[xl].IdDistribuidor+'})"><i class="fa fa-lg fa-user-times"></i></span></td>';
					for(var e=0; e<$('#Data td').length-2; e++){
						CreaTablaDatos += '<td class="tdMetas"><input class="InputMetas" type="text"></td>';
					}
					CreaTablaDatos += '<td class="tdTotal"><input class="TotalMetas" type="text" name="TotalMeta"></td>';
					CreaTablaDatos += '</tr>';
				}	
			}	
		}		
		
		if(FTipo==1){
			var peri = $('#Periodo').val();
			if(peri!=0){
				$('#DataTabla').html('');			
				CreaTablaDatos = '<tr class="DatosMeta" data-idusuario="" data-idgrupo="">';
				var nFechas = _.size($('#Data tr td[data-fechafin]'));
	
				CreaTablaDatos += '<td class="tdGrupo">Empresarial</td>';
				
				for(var e=1; e<=nFechas; e++){
					CreaTablaDatos += '<td class="tdMetas"><input class="InputMetas" type="text"></td>';
				}
				CreaTablaDatos += '<td class="tdTotal"><input class="TotalMetas" type="text" name="TotalMeta"></td>';
				CreaTablaDatos += '</tr>';
			}
				
		}	
		
		$('#DataTabla').append(CreaTablaDatos);
		$('.TotalMetas').attr('onkeyup','calculaMontos({t:this});').attr('onkeypress', 'return SalesUp.Valida.valDecimales({t:this, e:event})');
		$('.InputMetas').attr('onchange','metaIndividual({t:this});').attr('onkeypress', 'return SalesUp.Valida.valDecimales({t:this, e:event})');
	
	}


	function AgregarMeta(){
		var FTipo = $('#Tipo').val();
		if(FTipo == 3){
			var vendedor = '<option value="0">(...Seleccionar...)</option>';
				for(var am=0; am<quedan.length; am++){
					vendedor += '<option data-idgrupo="'+quedan[am].IDUSUARIOGRUPO+'" data-grupo="'+quedan[am].GRUPO+'" value="'+quedan[am].IDUSUARIO+'">'+quedan[am].NOMBRE+'</option>';
				}
			$('#filtrosDisponibles').html(vendedor);			
		}
		if(FTipo == 2){
			var grupo = '<option value="0">(...Seleccionar...)</option>';
				for(var ig=0; ig<restan.length; ig++){
					grupo += '<option value="'+restan[ig].Id+'">'+restan[ig].Grupo+'</option>';
				}
			$('#filtrosDisponibles').html(grupo);			
		}
		if(FTipo == 4){
			var distr = '<option value="0">(...Seleccionar...)</option>';
			
				for(var xg=0; xg<quedanDistribuidores.length; xg++){
					distr += '<option value="'+quedanDistribuidores[xg].IdDistribuidor+'">'+quedanDistribuidores[xg].Distribuidor+'</option>';
				}
			$('#filtrosDisponibles').html(distr);			
		}		
		

	}
	
	function EliminarSelectize(){
		$('#SelectIds').each(function() {
		    if (this.selectize) {
		        this.selectize.destroy();
		    }
		});
	}
	
	SalesUp.Variables.GuardarDatos = function(){
		var FTipo = $('#Tipo').val();
		var Configuracion = {};
		var Criterios = [];
		var Metas = [];
		Configuracion.Titulo = $('#Titulo').val();
		Configuracion.idComponente = $('#Componente').val();
		Configuracion.tipoMeta = $('#Tipo').val();
		Configuracion.tipoPeriodo = $('#Periodo').val();
		Configuracion.formato = $('#Componente option:selected').attr('data-formato');
		
		var arrCriterios = $('.FiltroEtiqueta');
		for(var i=0;i<_.size(arrCriterios);i++){
		  var arr = {};
		  var $Etiq = $(arrCriterios[i]);
		  arr.tipoCriterio = $Etiq.attr('data-id');
		  arr.criterio = $Etiq.attr('data-valor');
		  Criterios.push(arr)
		}
		
		
		var arrRowMeta = $('.DatosMeta');
		
		for(var i=0;i<_.size(arrRowMeta);i++){
		  var arr = {};
		  var $Row = $(arrRowMeta[i]);
		  if(FTipo==4){
			  arr.idGrupo = '';
			  arr.idUsuario = '';
			  arr.idEmpresaDist = $Row.attr('data-IdDistribuidor');
		  }
		  if(FTipo==3){
			  arr.idGrupo = '';
			  arr.idUsuario = $Row.attr('data-idusuario');
			  arr.idEmpresaDist = '';
		  }
		  if(FTipo==2){
			  arr.idUsuario = '';
			  arr.idGrupo = $Row.attr('data-idgrupo');
			  arr.idEmpresaDist = '';
		  }
		  if(FTipo==1){
			  arr.idUsuario = '';
			  arr.idGrupo   = '';
			  arr.idEmpresaDist = '';
		  }

		  arr.Periodo = [];
		  
		  if(Configuracion.tipoPeriodo!='1'){
		    var arrInputs = $Row.find('.InputMetas');
			var arrFechas = $('#Data').find('.Tip1');
		  
		    for(var x = 0;x<_.size(arrInputs);x++){
		      var arrMetas = {};
		      var $input = $(arrInputs[x]);
   		      var $fecha = $(arrFechas[x]);
		      arrMetas.montoMeta = $input.val();
		      arrMetas.fechaInicio = $fecha.attr('data-fechainicio');
		      arrMetas.fechaFin = $fecha.attr('data-fechafin');
		      arr.Periodo.push(arrMetas);
		    }
		  }else{
		    var arrMetas = {};
		    
		    arrMetas.montoMeta = $Row.find('.TotalMetas').val();
		    arrMetas.fechaInicio = $('#InicioR').val();
		    arrMetas.fechaFin = $('#FinalizaR').val();
		    arr.Periodo.push(arrMetas);
		  }  
		  Metas.push(arr);
		}
		
/*
		console.log(JSON.stringify(Configuracion));
		console.log(JSON.stringify(Criterios));
		console.log(JSON.stringify(Metas));
*/
		
		var ConfiguracionMeta =	SalesUp.Sistema.Encript({cadena:JSON.stringify(Configuracion)});
		var Criterio = 	SalesUp.Sistema.Encript({cadena:JSON.stringify(Criterios)});
		var Meta =	SalesUp.Sistema.Encript({cadena:JSON.stringify(Metas)});		

		$('#InputConfiguracionMeta').val(ConfiguracionMeta);
		$('#InputCriterio').val(Criterio);
		$('#InputMeta').val(Meta);
		

   		$('#AgregarMeta').submit();		

	}	
	
SalesUp.Variables.AgregarFiltroMeta = function(){

	var Paso = _.size($('.PasoBox'))+1;

	SalesUp.Sistema.BorrarItemDeAlmacen('TemplateAgregarFiltroMeta');
	var TemplateAgregarFiltroMeta = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateAgregarFiltroMeta.dbsp', Almacen:'TemplateAgregarFiltroMeta'});
	var Dato={};
	Dato.Paso = Paso;
	Dato.PasoAnterior = Paso-1;
	$('#BoxPasos').append(SalesUp.Construye.ReemplazaDatos({Template:TemplateAgregarFiltroMeta, Datos:Dato}));
	
};

	var templateOpcion = '<option value="{{TIPO}}" data-id="{{IDTIPOFILTRO}}" data-cat="{{CATE}}">{{FILTRO}}</option>';
	var templateOpcionHijo = '<option value="{{Valor}}">{{FiltroTexto}}</option>';
	var templateUniverso = '<span id="{{id}}" class="FiltroEtiqueta Universo" data-Paso="{{Paso}}" data-Cat="{{Cat}}" data-Tipo="{{Tipo}}">{{TextoFiltro}} <span class="ConfingFiltro Transition" onclick="SalesUp.Variables.ActivaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});" ><i class="fa fa-ellipsis-v"></i></span></span>';
	var templateFiltros = '<span id="{{id}}" class="FiltroEtiqueta FiltroNormal" data-Operador="{{Operador}}" data-Paso="{{Paso}}" data-id="{{idTipoFiltro}}" data-Cat="{{Cat}}" data-Tipo="{{Tipo}}" data-valor="{{Valor}}">{{TextoFiltro}} {{ValorFiltro}}<span class="ConfingFiltro Transition" onclick="SalesUp.Variables.ActivaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});"><i class="fa fa-ellipsis-v"></i></span></span>';
	var templatePaso = '<span class="FiltroEtiqueta LabelPaso Transition">{{Pasos}}</span>';

	var jsonFiltros = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonFiltrosMetas.dbsp', DataType:'json'}).jsonDatos;

	SalesUp.Variables.ActivaMostrarFiltros = function(Op){
		
		var Paso = Op.Paso, Out = Op.Out;
		var $FiltroTipo = $('#FiltroTipoPaso'+Paso);
		var $FiltrosPaso = $('#FiltrosPaso'+Paso);
		var FiltroTipo = 'FiltroTipoPaso'+Paso;
	
		$FiltroTipo.html('');
		$('#OpcionesTipoFiltros'+Paso).html('').hide();

		var Opciones = {};

		Opciones.opciones1 = _.where(jsonFiltros, {CATE:1});
		Opciones.opciones2 = _.where(jsonFiltros, {CATE:2});	

		/*Cambios de Ulises*/
		Opciones.opciones0 = _.where(jsonFiltros, {CATE:0,TIPO:1});

		var idComp = $("#Componente option:selected").attr('data-cate');
		
		var arrayTablas = idComp.split(',');
		var OpcionTotal = [];

		for (var i = 0; i < arrayTablas.length; i++) {
			if(_.indexOf(arrayTablas, i.toString()) >= 0){
				OpcionTotal = _.union(Opciones['opciones'+i],OpcionTotal);
			}
		};

		/*Fin cambios Ulises*/
		
		$FiltroTipo.append('<option value="">(... Seleccione una opción ...)</option>');
		SalesUp.Construye.ReemplazaTemplate({Destino:$FiltroTipo, Datos:OpcionTotal , Template:templateOpcion });

		SalesUp.Variables.VerOpcionesFiltros({Paso:Paso, Out:Out});
	
	}
	
	SalesUp.Variables.VerOpcionesFiltros = function(Op){
		var In=Op.In, Out=Op.Out, p=Op.Paso;
		var $Parte1 = $('#Paso'+p+'-P1');
		var $Parte2 = $('#Paso'+p+'-P2');
		if(In){
			$Parte1.css('left','0');
			$Parte2.css('left','100%');
			setTimeout(function(){$Parte2.hide();}, 500);
		}
	
		if(Out){
			$Parte1.css('left','-100%');
			$Parte2.show();
			setTimeout(function(){$Parte2.css('left','0');}, 10);
			
		}
	}
	
	SalesUp.Variables.MostrarFiltro = function(Op){

		var Filtro = Op.Filtro;
		var $Elemento = $(Op.Elemento);
		var Paso = Op.Paso;
		var $Opcion = $Elemento.find('option:selected');
		var $FiltrosPaso = $('#FiltrosPaso'+Paso);
		var $OpcionesFiltros = $('#OpcionesTipoFiltros'+Paso);
		var Categoria = $Opcion.attr('data-cat');
		var TextoFiltro = $Opcion.text();
			
		/*if(Categoria==0){
			var Etiqueta = SalesUp.Sistema.StrReplace('{{TextoFiltro}}', TextoFiltro, templateUniverso);
				Etiqueta = SalesUp.Sistema.StrReplace('{{Paso}}', Paso, Etiqueta);
				Etiqueta = SalesUp.Sistema.StrReplace('{{Cat}}', Categoria, Etiqueta);
				Etiqueta = SalesUp.Sistema.StrReplace('{{Tipo}}', Filtro, Etiqueta);
				Etiqueta = SalesUp.Sistema.StrReplace('{{id}}', SalesUp.Construye.IdUnico(), Etiqueta);
	
			var $Existe = $FiltrosPaso.find('.FiltroEtiqueta[data-cat="'+Categoria+'"]');
			var Existe = _.size($Existe);
	
			if(Existe==0){
				$FiltrosPaso.append(Etiqueta);
				SalesUp.Variables.VerOpcionesFiltros({Paso:Paso, In:true});
			}else{
				SalesUp.Construye.MuestraMsj({tMsg:1, Msg:'Solo se puede seleccionar un <b>Universo</b> en este paso'});
			}
			return true;
		}*/
	
		if((Categoria=='1')&&(Filtro=='7')){

			var $Pais = $FiltrosPaso.find('.FiltroEtiqueta[data-tipo="6"][data-cat="1"]');
			var nPais = _.size($Pais);
			if(nPais==0){
				SalesUp.Construye.MuestraMsj({tMsg:1, Msg:'Necesita tener seleccionado un <b>[País]</b> en este paso'});
				return false;
			}else{
				var Paises = '';
				for (var i = 0; i <= $Pais.length - 1; i++){
					Paises += $($Pais[i]).attr('data-valor')+'|';
				}
				SalesUp.Sistema.BorrarItemDeAlmacen('jsonFiltro-1-7');
				Op.Paises = Paises;
			}
		}
		
		Op.TextoFiltro = TextoFiltro;
		Op.Categoria = Categoria;
	
		$OpcionesFiltros.slideUp().html('');
		
	
		if(Filtro!=''){
			$('#Load'+Paso).show();
			setTimeout(function(){
				(Filtro>0) ? SalesUp.Variables.CargaFiltrosSistema(Op) : SalesUp.Variables.CargaFiltrosPersonalizados(Op);
			}, 10);
		}

	}/*SalesUp.Variables.MostrarFiltro*/

	var $optionSelectize;

SalesUp.Variables.CargaFiltrosSistema = function(Op){
	
	var Filtro = Op.Filtro;
	var Paso = Op.Paso;
	var Categoria = Op.Categoria;
	var TextoFiltro = Op.TextoFiltro;
	var $OpcionesFiltros = $('#OpcionesTipoFiltros'+Paso);
	var OpcionesFiltros = 'OpcionesTipoFiltros'+Paso;
	var $BoxComodin = $('#BoxComodin');
	var jsonFiltroTipo = 'jsonFiltro-'+Categoria+'-'+Filtro;
	var Extra = '';
	(Op.Paises) ? Extra += '&Paises='+Op.Paises : '';
	
	if(Categoria > 0){
		if($optionSelectize){
			$optionSelectize[0].selectize.destroy();
			$optionSelectize = undefined;
			$('#OpcionesContactos').hide();
		}

		var jsonOpcionesFiltro = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonFiltros.dbsp', Parametros:'c='+Categoria+'&f='+Filtro+Extra, DataType:'json'}).jsonDatos;

		if((Categoria=='1')&&(Filtro=='7')){
			jsonOpcionesFiltro = _.reject(jsonOpcionesFiltro , function(j){ return _.size(j) == 0; });
			if(_.size(jsonOpcionesFiltro)==0){
				jsonOpcionesFiltro = JSON.parse('[{ "Valor":"", "FiltroTexto":" -- Desconocido -- "}]');
			}
		}
		
		SalesUp.Construye.ConstruyemeUn({
			Control:'select', Nuevo: false, SeleccioneOpcion: true, IdControl: OpcionesFiltros,
			Template: templateOpcionHijo,Datos: jsonOpcionesFiltro
		});

		$OpcionesFiltros.attr('data-cat',Categoria);
		$OpcionesFiltros.attr('data-TextoFiltro',TextoFiltro);
		$OpcionesFiltros.attr('data-Tipo',Filtro);
		$OpcionesFiltros.slideDown();
	}else{
		if($optionSelectize){
			$optionSelectize[0].selectize.destroy();
			$optionSelectize = undefined;
			$('#OpcionesContactos').hide();
		}

		$optionSelectize = $('#OpcionesContactos').selectize({
	    	plugins: ['restore_on_backspace'],
		  	valueField: 'IdProspecto', labelField: 'Nombre',
		    searchField: ['NomNorma', 'ApeNorma', 'Nombre', 'Apellido', 'Titulo', 'Correo', 'Empresa'],
		    maxItems: 1, options: [], persist: false, create: false,
		    onChange: function(){ SalesUp.Variables.DespuesDeSeleccionarContacto(); },
		    render:{
		        item: function(item, escape){
		        	$('.Contacto.loading').removeClass('loading');
		        	$('.Contacto.SelectizeMal').removeClass('SelectizeMal');
		            return '<div>' +
		                (item.Nombre ? '<span data-cliente="'+item.EsCliente+'" class="Contacto">' + ( (item.Titulo)?escape(item.Titulo):'' )  +' '+escape(item.Nombre)+' '+ ( (item.Apellido)?escape(item.Apellido):'' ) +'</span>' : '') +
		                
		                (item.Empresa ? '<span class="Empresa"> <i>[' + escape(item.Empresa) + ']</i></span>' : '') +
		            '</div>';
		        },
		        option: function(item, escape){
		        	var Sexo = (item.Sexo=='M' ? '<i class="fa fa-female"></i> ' : '<i class="fa fa-male"></i> ');
		        	var Tel = (item.Telefono ? '<i class="fa fa-phone"></i> '+escape(item.Telefono) :'' );
		        	var Cel = (item.Movil ? ' <i class="fa fa-mobile"></i> '+escape(item.Movil) :'' );
		        	var SoloTel = (item.Telefono ? escape(item.Telefono) :'' );
		        	var SoloCel = (item.Movil ? ', '+escape(item.Movil) :'' );
		            return '<div class="BoxInfoContacto BoxSizing">' +
		                '<span class="NombreContacto Ellipsis">' + Sexo + escape(item.Titulo) +' '+escape(item.Nombre)+' '+escape(item.Apellido) + (item.Archivado ? ' <i>[Archivado]</i>' : '')+'</span>' +
		               ( item.Correo ? '<span class="CorreoContacto Ellipsis"><i class="fa fa-envelope"></i> ' + escape(item.Correo) + '</span>' : '') +
		               ( item.Empresa ? '<span class="EmpresaContacto Ellipsis"><i class="fa fa-building-o"></i> ' + escape(item.Empresa) + '</span>' : '' )  +
		               ( item.Telefono ? '<span class="RegionContacto Ellipsis" title="' + SoloTel + SoloCel + '">' + Tel + Cel + '</span>' :'' ) +
		            '</div>';
		        },
		        option_create: function(data, escape){
					return '';
					return '<div class="create"><strong>"' + escape(data.input) + '"</strong> </div>';
				}
		    },
		    load: function(query, callback){
		    	SelectContacto.clearOptions();

		    	if (!query.length) return callback();
		    	
		        if (query.length>=3){
		        	callback();
		        	SalesUp.Variables.jsonLtContactos = SalesUp.Sistema.CargaDatos({ Link:'/privado/Modelo/jsonMisContactos.dbsp', Parametros:'q='+query, DataType:'json' });
		        	callback(SalesUp.Variables.jsonLtContactos.jsonDatos);
		        }
		    }
		});
		
	}

	var SelectContacto = '';
	SelectContacto = $('#OpcionesContactos')[0].selectize;

	$('#Load'+Paso).hide();
	
}/*SalesUp.Variables.CargaFiltrosSistema*/

SalesUp.Variables.CargaFiltrosPersonalizados = function(Op){
	return true;
}/*SalesUp.Variables.CargaFiltrosPersonalizados*/

SalesUp.Variables.DespuesDeSeleccionarContacto = function(){
	var Filtro = parseInt($('#OpcionesContactos').val());
	var Paso = 1;
	var Operador = 1;
	var idTipoFiltro = $('#FiltroTipoPaso1 option:selected').attr('data-id');
	var Categoria = 0;
	var TextoFiltro = 'Contacto';
	var objTexto = _.where(SalesUp.Variables.jsonLtContactos.jsonDatos,{IdProspecto:Filtro});
	var TextoFiltroHijo = escape(objTexto[0].Nombre)+' '+escape(objTexto[0].Apellido);
	var Tipo = 1;

	var $MismoTipo = $('#FiltrosPaso1').find('.FiltroEtiqueta[data-cat="'+Categoria+'"][data-tipo="'+Tipo+'"]');
	var mt = _.size($MismoTipo);
	if(mt>=1){Operador = $($MismoTipo[0]).attr('data-operador');}

	var $Existe = $('#FiltrosPaso1').find('.FiltroEtiqueta[data-valor="'+Filtro+'"][data-cat="'+Categoria+'"][data-tipo="'+Tipo+'"]');
	var Existe = _.size($Existe);

	var Etiqueta = SalesUp.Sistema.StrReplace('{{ValorFiltro}}', '', templateFiltros);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Valor}}', Filtro, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Paso}}', Paso, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Cat}}', Categoria, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Tipo}}', Tipo, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{id}}', SalesUp.Construye.IdUnico(), Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Operador}}', Operador, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{idTipoFiltro}}', idTipoFiltro, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{TextoFiltro}}', TextoFiltro+': '+TextoFiltroHijo, Etiqueta);

	if(mt>0){
		if(mt>1){ $MismoTipo = $($MismoTipo[mt-1]);}
		(Existe==0) ? $MismoTipo.after(Etiqueta) : '';
	}else{
		(Existe==0) ? $('#FiltrosPaso1').append(Etiqueta) : '';
	}
	
	if(Existe>0){
		var Texto = TextoFiltroHijo;
		SalesUp.Construye.MuestraMsj({tMsg:1, Msg:'El filtro <b>['+Texto+']</b> ya se encuentra agregado en este paso'});
		return false;
	}

	setTimeout(function(){
		if($optionSelectize){
			$optionSelectize[0].selectize.destroy();
			$optionSelectize = undefined;
			$('#OpcionesContactos').hide();
		}
	},1000);

	SalesUp.Variables.VerOpcionesFiltros({Paso:Paso, In:true});
}

SalesUp.Variables.SeleccionarFiltro = function(Op){
	var Paso = Op.Paso;
	var Filtro = Op.Filtro;
	var $Elemento = $(Op.Elemento);
	var $OpcionesFiltros = $('#OpcionesTipoFiltros'+Paso);
	var $FiltrosPaso = $('#FiltrosPaso'+Paso);
	var $Opcion = $Elemento.find('option:selected');
	var Categoria = $OpcionesFiltros.attr('data-cat');
	var TextoFiltro = $OpcionesFiltros.attr('data-textofiltro');
	var Tipo = $OpcionesFiltros.attr('data-tipo');
	var TextoFiltroHijo = $Opcion.text();
	var Operador = 1;
	var idTipoFiltro = $('#FiltroTipoPaso1 option:selected').attr('data-id');

	var $MismoTipo = $FiltrosPaso.find('.FiltroEtiqueta[data-cat="'+Categoria+'"][data-tipo="'+Tipo+'"]');
	var mt = _.size($MismoTipo);
	if(mt>=1){Operador = $($MismoTipo[0]).attr('data-operador');}

	var $Existe = $FiltrosPaso.find('.FiltroEtiqueta[data-valor="'+Filtro+'"][data-cat="'+Categoria+'"][data-tipo="'+Tipo+'"]');
	var Existe = _.size($Existe);

	var Etiqueta = SalesUp.Sistema.StrReplace('{{ValorFiltro}}', TextoFiltroHijo, templateFiltros);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Valor}}', Filtro, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Paso}}', Paso, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Cat}}', Categoria, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Tipo}}', Tipo, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{id}}', SalesUp.Construye.IdUnico(), Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Operador}}', Operador, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{idTipoFiltro}}', idTipoFiltro, Etiqueta);
		
		if((Categoria=='1')&&(Tipo=='1')){
			Etiqueta = SalesUp.Sistema.StrReplace('{{TextoFiltro}}', '', Etiqueta);
		}else{
			Etiqueta = SalesUp.Sistema.StrReplace('{{TextoFiltro}}', TextoFiltro+':', Etiqueta);
		}

	if(mt>0){
		if(mt>1){ $MismoTipo = $($MismoTipo[mt-1]);}
		(Existe==0) ? $MismoTipo.after(Etiqueta) : '';
	}else{
		(Existe==0) ? $FiltrosPaso.append(Etiqueta) : '';
	}
	
	if(Existe>0){
		var Texto = TextoFiltroHijo;
		if(!((Categoria=='1')&&(Tipo=='1'))){ Texto = TextoFiltro + ':' + Texto; }
		
		SalesUp.Construye.MuestraMsj({tMsg:1, Msg:'El filtro <b>['+Texto+']</b> ya se encuentra agregado en este paso'});
		return false;
	}

	$OpcionesFiltros.slideUp().html('');
	SalesUp.Variables.VerOpcionesFiltros({Paso:Paso, In:true});
}

SalesUp.Variables.ActivaOpcionesEtiqueta = function(Op){
	var $Elemento = $(Op.Elemento);
	var Id = Op.Id;
	$Elemento.popover('destroy');

	var $Etiqueta = $Elemento.closest('.FiltroEtiqueta');
	var $Padre = $Etiqueta.closest('.PasoBox');
	
	var t = $Etiqueta.attr('data-tipo');
	var c = $Etiqueta.attr('data-cat');
	var o = $Etiqueta.attr('data-operador');
	var Hermanos = _.size($Padre.find('.FiltroEtiqueta[data-tipo="'+t+'"][data-cat="'+c+'"]'));

	var PopOverId = 'PopOver'+SalesUp.Construye.IdUnico();
	var TemplatePopover = '<div class="popover PopOverAcciones" id="'+PopOverId+'" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>';

	var Operador_Y = '';
	var Operador_O = '';
	if(o=='1'){Operador_Y = '<i class="fa fa-check Verde"></i>';}else{Operador_O = '<i class="fa fa-check Verde"></i>';}

	var MenuOpciones = '';
	(Hermanos>1) ? MenuOpciones += '<span onclick="SalesUp.Variables.OpcionesAcciones({Accion:2, Id:\''+Id+'\', Operador:2 });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-calculator"></i> Operador lógico "O" '+Operador_O+'</span>':'';
	(Hermanos>1) ? MenuOpciones += '<span onclick="SalesUp.Variables.OpcionesAcciones({Accion:2, Id:\''+Id+'\', Operador:1 });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-calculator"></i> Condicion lógico "Y" '+Operador_Y+'</span>':'';
	MenuOpciones += '<span onclick="SalesUp.Variables.OpcionesAcciones({Accion:1, Id:\''+Id+'\' });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-trash"></i> Eliminar filtro</span>';

	$Elemento.popover({
		html:true, container:'body', placement:'top',
		template:TemplatePopover,
		content:MenuOpciones
	});

	$Elemento.popover('show');

	var $PopOverId = $('#'+PopOverId);
	var Cerrar = true;
	$PopOverId.mouseleave(function(){
		Cerrar = true;
		setTimeout(function(){(Cerrar) ? $PopOverId.hide():'';}, 1000);
	}).mouseenter(function(){
		Cerrar = false;
	}).click(function(){
		$PopOverId.hide();
	});

	setTimeout(function(){(Cerrar) ? $PopOverId.hide():'';}, 4000);

	$Elemento.mouseleave(function(){
		Cerrar = true;
		setTimeout(function(){(Cerrar) ? $PopOverId.hide():'';}, 3000);
	}).mouseenter(function(){
		Cerrar = false;
	});
}/*SalesUp.Variables.ActivaOpcionesEtiqueta*/

SalesUp.Variables.OpcionesAcciones = function(Op){
	var Id = Op.Id;
	var $Etiqueta = $('#'+Id);
	var Accion = Op.Accion;
	var Operador = Op.Operador;
	if(Accion==1){
		$Etiqueta.slideUp();
		setTimeout(function(){$Etiqueta.remove();}, 1200);	
	}

	if(Accion==2){
		var $Padre = $Etiqueta.closest('.PasoBox');
		var t = $Etiqueta.attr('data-tipo');
		var c = $Etiqueta.attr('data-cat');
		$Padre.find('.FiltroEtiqueta[data-tipo="'+t+'"][data-cat="'+c+'"]').attr('data-operador',Operador);
	}
}


function calculaMontos(Op){
  var f = function(n){return parseFloat(n);}
  var t = Op.t;
  var v = t.value;
  var $row = $(t).closest('.DatosMeta');
  var $metas = $row.find('.InputMetas');
  var nMetas = _.size($metas);
  var mIndividual = f(v) / f(nMetas);
  
  mIndividual = (mIndividual) ? mIndividual : 0;
  
  for(var i=0;i<nMetas;i++){
   var $m = $($metas[i]);
    $m.val(mIndividual);
  }
  
}


function metaIndividual(Op){
  $('#DataTabla tr').not('.DatosMeta').remove();

  var f = function(n){return parseFloat(n);}
  var t = Op.t;
  var v = f($(t).val());
  var $row =  $(t).closest('.DatosMeta');
  var $td = $(t).closest('td');
  var idxRow = $row.index();
  var idxTd = $td.index();
  var $Total =   $row.find('.TotalMetas');
  
  var $metas =  $row.find('.InputMetas');
  var nMetas = _.size($metas);
  
  var suma = 0;
  
  for(var i=0;i<nMetas;i++){
    var $m = $($metas[i]);
    var va = $m.val();
    if(va==''){$m.val(v)}
    
  }
  
  for(var i=0;i<nMetas;i++){
    var $m = $($metas[i]);
    suma += f(($m.val())?$m.val():0);
  }
  
  $Total.val(suma);
  
  var arrRows = $('.DatosMeta');
  var arrCambios = [];
  for(var a=0;a<_.size(arrRows);a++){
    if((a!=idxRow)&&(a>idxRow)){
      var arrMetas = $(arrRows[a]).find('td');
      var $input = $(arrMetas[idxTd]).find('.InputMetas');
      var vi = ($input.val()!='')?$input.val():0;
      if(!vi){
        $input.val(v);
        arrCambios.push($input);
      }  
    }
  }
  
  if(arrCambios){
    AjustaMovimientos(arrCambios);
  }
}



function AjustaMovimientos(arrCambios){
 
  for(var x=0;x<_.size(arrCambios);x++){
    metaIndividual({t:arrCambios[x]});
  }
  
}




