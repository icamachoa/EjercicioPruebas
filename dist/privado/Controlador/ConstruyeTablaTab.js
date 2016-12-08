SalesUp.Variables.Loading = function (idVentana){
	SalesUp.Sistema.MostrarEspera({Destino:'#Tabs', TipoEspera:'Cargando',Mensaje:'Por favor espere...'});
	setTimeout(function(){
		SalesUp.Variables.CargaNuevosTabs(idVentana);
		SalesUp.Variables.OcultaLoad();
	}, 200);
}

SalesUp.Variables.OcultaLoad = function(){
	SalesUp.Sistema.OcultarOverlay();
	SalesUp.Sistema.OcultaEspera();
}

SalesUp.Variables.CargaTab = function(idDiv, IDVENTANA, tabF, ocultaBotones){

	 	SalesUp.Variables.OcultaBotones(IDVENTANA, ocultaBotones); 
	    SalesUp.Sistema.MostrarEspera({Destino:'#'+idDiv, TipoEspera:'Cargando',Mensaje:'Por favor espere...'});          

		setTimeout(function(){
			SalesUp.Variables.CargaDatos(idDiv, IDVENTANA, tabF);
			SalesUp.Variables.DragTable('#tablaCampos'+idDiv, idDiv);
			SalesUp.Variables.OcultaLoad();
			SalesUp.Sistema.IniciaPlugins();
	
		}, 150);
}

SalesUp.Variables.CargaNuevosTabs=function(idventana){
	
	$("#Tabs").tabs( "destroy" );
	
	SalesUp.Variables.ConstruyeTabs(idventana);
	SalesUp.Variables.CamposDisponibles(idventana);	
	SalesUp.Variables.CamposDisponiblesEmpresa();
}

SalesUp.Variables.ConstruyeTabs=function(idventana){
	var nombreTabs	= '<ul id="listaTabs">';
	var divTablas	= "";
	var primerDiv	= "";
	var NombresTab 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonNombresTab.dbsp',Parametros:'idventana='+idventana,DataType:'json'}).jsonDatos;
	for (var i=0; i<NombresTab.length;i++) {
		var _elementoActual = NombresTab[i];
		if( ( (idventana==1) || (idventana==3) ) && (((NombresTab[i].tabF==1) || (NombresTab[i].tabF==4)) ) ){
			
			if( ((idventana==1) || (idventana==3) ) && (NombresTab[i].tabF==4) )
				nombreTabs+='<li id="IDTAB'+NombresTab[i].IDTAB+'" data-idtab="'+NombresTab[i].IDTAB+'" data-tabf="'+NombresTab[i].tabF+'"><span onclick=SalesUp.Variables.CargaTab('+NombresTab[i].IDTAB+','+idventana+','+NombresTab[i].tabF+','+1+') ondblclick="SalesUp.Variables.EditaTab();"><a href="#'+NombresTab[i].IDTAB+'"><i id="icono'+NombresTab[i].IDTAB+'" class="fa '+NombresTab[i].ICONO+'">'+'</i>'+' '+NombresTab[i].TAB+'</span></a></li>';		
			else
				nombreTabs+='<li id="IDTAB'+NombresTab[i].IDTAB+'" data-idtab="'+NombresTab[i].IDTAB+'" data-tabf="'+NombresTab[i].tabF+'"><span onclick=SalesUp.Variables.CargaTab('+NombresTab[i].IDTAB+','+idventana+','+NombresTab[i].tabF+','+0+') ondblclick="SalesUp.Variables.EditaTab();"><a href="#'+NombresTab[i].IDTAB+'"><i id="icono'+NombresTab[i].IDTAB+'" class="fa '+NombresTab[i].ICONO+'">'+'</i>'+' '+NombresTab[i].TAB+'</span></a></li>';
		}
		else{
		nombreTabs+='<li id="IDTAB'+NombresTab[i].IDTAB+'" data-idtab="'+NombresTab[i].IDTAB+'" data-tabf="'+NombresTab[i].tabF+'"><span onclick=SalesUp.Variables.CargaTab('+NombresTab[i].IDTAB+','+idventana+','+NombresTab[i].tabF+','+0+') onmouseenter="SalesUp.Variables.MuetraIconoEliminar(1,'+NombresTab[i].IDTAB+');" onmouseleave="SalesUp.Variables.MuetraIconoEliminar(0,'+NombresTab[i].IDTAB+')" ondblclick="SalesUp.Variables.EditaTab();"><a href="#'+NombresTab[i].IDTAB+'"><i id="icono'+NombresTab[i].IDTAB+'" class="fa '+NombresTab[i].ICONO+'">'+'</i>'+' '+NombresTab[i].TAB+' <i id="times'+NombresTab[i].IDTAB+'" data-idtab="'+NombresTab[i].IDTAB+'" class="oculto fa fa-times Tip8" tip="Eliminar pestaña" data-q="¿Esta seguro que desea eliminar la pestaña: " onclick="SalesUp.Variables.AlertaEliminarTab({e:this});"></i></span></a></li>';
		}
		divTablas+='<div id="'+_elementoActual.IDTAB+'"></div>';	
	}

    nombreTabs+='<li class="noOrdenar"><a href="#nuevo"><span onclick="SalesUp.Variables.NuevoTab();" class="Tip8" tip="Agregar pestaña"><i class="fa fa-plus"></i></span></a></li></ul>';
	divTablas+='<div id="nuevo"></div>';
	
	$("#Tabs").html(nombreTabs+divTablas);	
    $("#Tabs").tabs();


    	SalesUp.Variables.CargaDatos(NombresTab[0].IDTAB, idventana, NombresTab[0].tabF);	
		SalesUp.Variables.DragTable('#tablaCampos'+NombresTab[0].IDTAB, NombresTab[0].IDTAB);

		if( ((idventana==1) || (idventana==3) ) && (NombresTab[0].tabF==4) )
			SalesUp.Variables.OcultaBotones(idventana, 1);
				else
					SalesUp.Variables.OcultaBotones(idventana, 0);

		SalesUp.Variables.ReordenaTabs();

}

SalesUp.Variables.OcultaBotones=function(idVentana, oculta){
 	/*return;*/
	if( ((idVentana==1) || (idVentana==3)) && (oculta==1) ){
		$('#disponibles').hide();
		$('#disponiblesEmpresa').show();
	}else{
		$('#disponibles').show();
		$('#disponiblesEmpresa').hide();
	}
}

SalesUp.Variables.NuevoTab=function(){
	SalesUp.Sistema.AbrePopUp({
		Titulo:'Nuevo pestaña', 
		Pagina: '/privado/Vista/popup_nuevo_tab.dbsp', 	
		Parametros:'', 
		Alto: 80, 
		Ancho: 350, 
		CallBack: '' //informacion de abajo. ConstruyeTabs
	});
}

SalesUp.Variables.EditaTab=function(){
	var idtab=$('#listaTabs li.ui-tabs-active.ui-state-active').attr('data-idtab');

	var nombretab=$('#IDTAB'+idtab).text();
	var icono =$('#icono'+idtab).attr('class'); 

	SalesUp.Sistema.AbrePopUp({
		Titulo:'Edita pestaña', 
		Pagina: 'popup_edita_tab.dbsp', 	
		Parametros:'idtab='+idtab+'&nombretab='+nombretab+'&icono='+icono, 
		Alto: 80, 
		Ancho: 350, 
		CallBack: '' //informacion de abajo. ConstruyeTabs
	});
}

SalesUp.Variables.CargaDatos=function(idDiv, IDVENTANA, tabF){	
	 $('#IDTAB'+idDiv+' span').removeAttr('onclick');

	 if(tabF==4)
	 $('#IDTAB'+idDiv+' span').attr('onclick', 'SalesUp.Variables.OcultaBotones('+IDVENTANA+', 1)');	
	 else
	 $('#IDTAB'+idDiv+' span').attr('onclick', 'SalesUp.Variables.OcultaBotones('+IDVENTANA+', 0)');		

	//CARGA REGISTROS EN TABLA 
	var TemplateDatosCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateTabCamposPersonalizados.dbsp', Parametros:'thead=1', Almacen: 'htmlTemplateTabCamposPersonalizados1'});
	var TemplateDatos 		= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateTabCamposPersonalizados.dbsp', Parametros:'thead=0', Almacen: 'htmlTemplateTabCamposPersonalizados4'});
	var Datos				= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCamposConfiguracion.dbsp', Parametros:'IDTAB='+idDiv, DataType:'json'}).jsonDatos;



	var Destino = '#'+idDiv, IdTabla='tablaCampos'+idDiv;
	SalesUp.Construye.ConstruyeTabla(TemplateDatosCampos, TemplateDatos, Datos, {Destino:Destino, Id:IdTabla});
	SalesUp.Variables.quitaRestriccionesCamposSistema();
	SalesUp.Variables.AgregaAcciones(idDiv,tabF);

	
	SalesUp.Sistema.RestriccionesCorporativo();
	SalesUp.Sistema.Tipsy();
	SalesUp.Sistema.InterpretaHtml();
	SalesUp.Variables.CamposDisponiblesEmpresa();
}

SalesUp.Variables.quitaRestriccionesCamposSistema = function(){

	var $trNaturaleza = $('tr[data-naturaleza="1"]');
	$trNaturaleza.removeAttr('data-restriccion');
	var arrEditar = $trNaturaleza.find('.coEditar');
	for (var i = 0; i <_.size(arrEditar); i++){
		var $editar = $(arrEditar[i]);
		var onclick = $editar.attr('data-onclick');
		$editar.attr('onclick',onclick).removeClass('coEditar').removeAttr('data-onclick');
	}
}
	
SalesUp.Variables.AgregaAcciones=function(idDiv, tabF){
	var indice = [1,2,3,4,5,6,7,8,9,10,11,12,13];
	var nombreTipos = ["Entero","Decimal","Fecha","Texto","Lista","Autoincrementable","UUID","Temperatura","Porcentaje","Lista Radio","Check Texto","Lista Texto","Lista Checks"];
	var dato, naturaleza, posicion, posicion2, mostrar;
	var tabla='#tablaCampos'+idDiv+' tr';
	var contenidoHTML='', contenidoHTML2='';
	var tipoCampo, indice;
	var restriccion, largo='', tamano='';
	var es_modulo = 0;
	
	$(tabla).each(function(){
				
		var posTR= $(this).attr('id');
		if(dato = $(this).find("td").eq(7).attr('data-campo') ) {
			//dato = escape($(this).find("td").eq(7).attr('data-campo') 
		var naturaleza = $(this).find("td").eq(7).attr('data-naturaleza');
		posicion       = $(this).find("td").eq(7).attr('data-idcampo');
		var pos        = $(this).find("td").eq(7).attr('id');
		$(this).find("td").eq(2).addClass('Html');
		mostrar        = $(this).find("td").eq(7).attr('data-mostrar');
		tipoCampo      = $(this).find("td").eq(3).attr('data-tipoCampo');
		posicion2      = $(this).find("td").eq(3).attr('id');
		indice         = $(this).find("td").eq(3).attr('data-indice');
		restriccion    = $(this).find("td").eq(7).attr('data-restriccion');
		es_modulo      = $(this).find("td").eq(7).attr('data-modulo');

		var nombreCampo =$('#Acciones-'+posicion+'-'+naturaleza).attr('data-campo');

		//tamaño
		tamano= $(this).find("td").eq(5).attr('data-tamano');
		if(tamano=='w25'){
			$('#'+posTR+' #tamano-'+posicion).html('25%');
		}else if(tamano=='w50'){
			$('#'+posTR+' #tamano-'+posicion).html('50%');			
		}else if(tamano=='w33'){
			$('#'+posTR+' #tamano-'+posicion).html('33%');	
		}else if(tamano=='w100'){
			$('#'+posTR+' #tamano-'+posicion).html('100%');
		}else{
			$('#'+posTR+' #tamano-'+posicion).html('-');
			
		}
		//
		
		//largo
		largo= $(this).find("td").eq(4).attr('data-largo');
		if(largo==0){
			$('#largo-'+posicion).html('-');
		}
		//
		contenidoHTML='';
		dato=escape(dato);
		
		if(((dato=='Nombre') || (dato=='Apellidos') || (dato=='Empresa')) && (naturaleza==1)){
			$('#'+pos).html();
		}else{
			contenidoHTML='<span data-tabf="'+tabF+'" class="sortear Tip8 Pointer" tip="Arrastrar para ordenar"  original-title=""><i class="fa fa-lg  fa-bars"></i></span> ';		

			if(tabF!=4){
						
				if(naturaleza==1 ){	
					if((restriccion!=1) && (restriccion!=2)){
						
						if(mostrar==0){	
							contenidoHTML+='<span data-tabf="'+tabF+'" class="espacio2 Tip8 Pointer" tip="Mostrar campo" onclick="SalesUp.Variables.AlertMuestraOcultaCampo(1,'+naturaleza+','+posicion+','+idDiv+',{e:this})"><i class="fa fa-lg fa-check"></i> </span> ';
						}else{
						
							contenidoHTML+='<span data-tabf="'+tabF+'" class="Tip8 Pointer" tip="Ocultar campo" onclick="SalesUp.Variables.AlertMuestraOcultaCampo(0,'+naturaleza+','+posicion+','+ idDiv+',{e:this})"><i class="fa fa-lg fa-times"></i></span> ';
						}
					}else{
						
						contenidoHTML+='<span data-tabf="'+tabF+'" class="espacio" ><i class=""></i></span> ';
					}
				}else{					
					contenidoHTML+='<span data-tabf="'+idDiv+'" class="Tip8 EliminarCatalogo Pointer" data-dato="'+nombreCampo+'" data-id="'+posicion+'" data-q="¿Esta seguro que desea eliminar el campo: '+nombreCampo+'?<br><br><b>Nota: Se eliminarán todos los datos que haya capturado en este campo.</b>" data-nombre="'+nombreCampo+'" tip="Eliminar campo" onclick="SalesUp.Variables.AlertEliminaCampo('+posicion+','+naturaleza+','+idDiv+',{e:this})"><i class="fa fa-lg fa-trash-o"></i></span> ';
				}
			}else{


				contenidoHTML+='<span data-tabf="'+tabF+'"><i class=""></i></span> ';

				if(naturaleza==2 && es_modulo!=1){
					contenidoHTML+='<span data-tabf="'+idDiv+'" class="Tip8 Pointer" data-dato="'+nombreCampo+'" data-id="'+posicion+'" data-q="¿Esta seguro que desea eliminar el campo: '+nombreCampo+'?<br><br><b>Nota: Se eliminarán todos los datos que haya capturado en este campo.</b>" data-nombre="'+nombreCampo+'" tip="Eliminar campo" onclick="SalesUp.Variables.AlertEliminaCampo('+posicion+','+naturaleza+','+idDiv+',{e:this})"><i class="fa fa-lg fa-trash-o"></i></span> ';
				}
				indice = 0;

			}
			
			$('#'+pos).html(contenidoHTML);
			contenidoHTML='';
		}
		es_modulo = 0;
		SalesUp.Variables.TipoCampo(posTR, indice, tipoCampo, posicion2);
	}
	});	
}

SalesUp.Variables.TipoCampo = function(posTR, indice, tipoCampo, posicion2){
	
	if(tipoCampo==1){
				if(indice==0){
					$('#'+posTR+' #'+posicion2).html('Texto');
				}
				else if(indice==33){
					$('#'+posTR+' #'+posicion2).html('Autoincrementable');
				}
				else if(indice==34){
					$('#'+posTR+' #'+posicion2).html('UUID');
				}
				else if((indice>=1) && (indice<=4)){
					$('#'+posTR+' #'+posicion2).html('Entero');
				}
				else if((indice>=5) && (indice<=8)){
					$('#'+posTR+' #'+posicion2).html('Decimal');					
				}
				else if((indice>=9) && (indice<=12)){
					$('#'+posTR+' #'+posicion2).html('Fecha');					
				}
				else if( (((indice>=13) && (indice<=20)) || ((indice>=26) && (indice<=32))) || ((indice>=35) && (indice<=64))){
					
					$('#'+posTR+' #'+posicion2).html('Texto');					
				}				
			}
			else if(tipoCampo==2){
				if((indice>=21) && (indice<=25)){
					$('#'+posTR+' #'+posicion2).html('Lista');
				}
				else if(indice==0){
					$('#'+posTR+' #'+posicion2).html('Lista');
				}
					
			}
			else if(tipoCampo==3){
				if( (((indice>=13) && (indice<=20)) || ((indice>=26) && (indice<=32))) || ((indice>=35) && (indice<=64))){
					$('#'+posTR+' #'+posicion2).html('Lista texto');					
				}
			}
			else if(tipoCampo==4){
				if(  (((indice>=13) && (indice<=20)) || ((indice>=26) && (indice<=32))) || ((indice>=35) && (indice<=64))){
					$('#'+posTR+' #'+posicion2).html('Check texto');					
				}
			}
			else if(tipoCampo==5){
				if( (((indice>=13) && (indice<=20)) || ((indice>=26) && (indice<=32))) || ((indice>=35) && (indice<=64)) ){
					$('#'+posTR+' #'+posicion2).html('Memo');					
				}
			}
			else if(tipoCampo==6){
				if(  (((indice>=13) && (indice<=20)) || ((indice>=26) && (indice<=32))) || ((indice>=35) && (indice<=64))){
					$('#'+posTR+' #'+posicion2).html('Temperatura');					
				}
			}
			else if(tipoCampo==7){
				if(  (((indice>=13) && (indice<=20)) || ((indice>=26) && (indice<=32))) || ((indice>=35) && (indice<=64)) ){
					$('#'+posTR+' #'+posicion2).html('Lista check');					
				}
			}
			else if(tipoCampo==8){
				if(  (((indice>=13) && (indice<=20)) || ((indice>=26) && (indice<=32))) || ((indice>=35) && (indice<=64))){
					$('#'+posTR+' #'+posicion2).html('Lista radios');					
				}
			}
			else if(tipoCampo==9){
				if( (indice>=5) && (indice<=8)){
					$('#'+posTR+' #'+posicion2).html('Porcentaje');					
				}
			}
	
}

SalesUp.Variables.ReordenaTabs=function(){
		var tabs = $( "#Tabs" ).tabs();
	    tabs.find(".ui-tabs-nav").sortable({
    	items:"li:not(.noOrdenar)",
		axis: "x",
		stop: function() {
      	    tabs.tabs( "refresh" );
			var ltTabs = '';
	 		var ltOrden = '';
			$.each($('#listaTabs>li'), function( index, value){
				var $tab = $(value);
				var idtab = $tab.attr('data-idtab');
				if(idtab){
					ltTabs += idtab+',';
					ltOrden += (index+1) + ',';		
				}
			});
		SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/queryCambiaOrdenTabs.dbsp', Parametros:'idtabs='+ltTabs+'&orden='+ltOrden});
		}
    });
}

SalesUp.Variables.DragTable=function(nombreTabla, idVentana){
		
			$(nombreTabla).tableDnD({
				dragHandle: ".sortear",
				onDragClass: "DragRow",
				onDragStart: function(table, row){
					var rows = table.tBodies[0].rows;
					$(rows).each(function(i){
						$(rows[i]).addClass('RowDark');
					});
					$(row).parent().parent().removeClass('RowDark').addClass('DragRow');
				},
				onDrop: function(table, row){
					$('.RowDark').removeClass('RowDark');
					var rows = table.tBodies[0].rows;
					
					//Guarda nuevo orden Campos
				
					SalesUp.Variables.GuardaOrdenCampos(nombreTabla, idVentana);
				}
			});
	}

SalesUp.Variables.GuardaOrdenCampos=function(nombreTabla, idVentana){
	
	var posicion=0; 
	var orden='';
	var idCampo='';
	var naturaleza='';
	var tabla=nombreTabla+' tr';
	var boleano= true;

	$(tabla).each(function(){	

		$(this).removeClass('zebra')
		
		if(boleano){
		$(this).addClass('zebra')
			boleano=false;
		}else{
			boleano=true;
		}

		if(posicion>0){
		orden 	+= posicion+',';
		idCampo += $(this).find("td").eq(7).attr('data-idcampo')+',';
		naturaleza += $(this).find("td").eq(7).attr('data-naturaleza')+',';		
		}
		posicion ++;
	});

//$('td').find('span:first')

	tabF = $(tabla).closest('div').attr('id');

	SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/queryCambiaOrdenCampos.dbsp', Parametros:'orden='+orden+'&idCampo='+idCampo+'&naturaleza='+naturaleza+'&tabOriginal='+tabF});
	
	tabF = $(nombreTabla+' tbody tr').eq(0).find('span').eq(0).attr('data-tabf');

    SalesUp.Variables.CargaDatos(idVentana, idVentana, parseInt(tabF));

    SalesUp.Variables.DragTable('#tablaCampos'+idVentana, idVentana);


}

SalesUp.Variables.AlertMuestraOcultaCampo=function(valor, naturaleza, idcampo, idDiv, Op){

//		"Acciones-5998-1"
		


		$Elemento = $(Op.e);
    	var Id = $Elemento.attr('data-nombre');
    	var nombreCampo = $('#Acciones-'+idcampo+'-'+naturaleza).attr('data-campo');
    	tabF = $('#Acciones-'+idcampo+'-'+naturaleza).find('span').eq(0).attr('data-tabf');
    	

        var Funcion = (Op.Corp) ? Op.Corp : 'SalesUp.Variables.MuestraOcultaCampo';
        
        if(valor==1){
	    var Pregunta = '¿Esta seguro que desea mostrar el campo: '+nombreCampo+'?';
	    }
		else{
		var Pregunta = '¿Esta seguro que desea ocultar el campo: '+nombreCampo+'?';
		}
		
        SalesUp.Construye.MuestraAlerta({
          TipoAlerta:'AlertaPregunta',
          Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> '+Pregunta+'',
          Boton1:'Aceptar',
          Boton2:'Cancelar',
       		Callback1: Funcion,
          Icono1:'<i class="fa fa-check"></i>',
          Icono2:'<i class="fa fa-times"></i>',
          Ancho:'500px'
        });	


					SalesUp.Variables.MuestraOcultaCampo=function(){
					SalesUp.Sistema.CargaDatos({Link:'Modelo/queryActualizaCampoMostrar.dbsp', Parametros:'idcampocon='+idcampo+'&mostrar='+valor});
						
						 setTimeout(function() {
					    	SalesUp.Variables.CargaDatos(idDiv, idDiv, tabF);	
					    	SalesUp.Variables.DragTable('#tablaCampos'+idDiv, idDiv);
					    }, 100)
					}
}

SalesUp.Variables.AlertEliminaCampo=function(idcampo, naturaleza, idDiv, Op){
		$Elemento = $(Op.e);
		    	var Id = $Elemento.attr('data-nombre');
		    	var nombreCampo =$('#Acciones-'+idcampo+'-'+naturaleza).attr('data-campo');
		    	tabF = $('#Acciones-'+idcampo+'-'+naturaleza).find('span').eq(0).attr('data-tabf');

		        var Pregunta = '¿Esta seguro que desea eliminar el campo: '+nombreCampo+'?<br><br><b>Nota: Se eliminarán todos los datos que haya capturado en este campo.</b>';
				var Funcion = (Op.Corp) ? Op.Corp : 'SalesUp.Variables.EliminaCampo';
				var idventana=$('#opcionPantalla').val();
		        SalesUp.Construye.MuestraAlerta({
		          TipoAlerta:'AlertaPregunta',
		          Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> '+Pregunta+'',
		          Boton1:'Aceptar',
		          Boton2:'Cancelar',
		       		Callback1: Funcion,
		          Icono1:'<i class="fa fa-check"></i>',
		          Icono2:'<i class="fa fa-times"></i>',
		          Ancho:'580px'
		        });

						SalesUp.Variables.EliminaCampo=function(){
								SalesUp.Sistema.CargaDatos({Link:'Modelo/queryEliminaCampoPersonalizado.dbsp', Parametros:'idcampo='+idcampo});
									 setTimeout(function() {
								    	SalesUp.Variables.CargaDatos(idDiv, idDiv, tabF);	
								    	
								    	SalesUp.Variables.DragTable('#tablaCampos'+idDiv, idDiv, tabF);
								    	SalesUp.Variables.CamposDisponibles(idventana);
								    	SalesUp.Variables.CamposDisponiblesEmpresa();
								    }, 100)
						}
}


SalesUp.Variables.RecargaCampos = function(Op){
	
	 setTimeout(function() {
    	SalesUp.Variables.CargaDatos(Op.idtab, Op.idventana, Op.tabF);	
    	SalesUp.Variables.DragTable('#tablaCampos'+Op.idtab, Op.idventana);
    		
    	$('#IDTAB'+Op.idtab+ ' a').click();

    }, 100)
	
}

SalesUp.Variables.mostrarCampos=function(){

	var idventana=$('#opcionPantalla').val();
	var idtab=$('#listaTabs li.ui-tabs-active.ui-state-active').attr('data-idtab');
	var tabF = $('#listaTabs li.ui-tabs-active.ui-state-active').attr('data-tabF');
	
   SalesUp.Sistema.AbrePopUp({
        Titulo :'Campos personalizados',
        Pagina :'popup_agregar_campo_general.dbsp', 
        Parametros:'idventana='+idventana+'&idtab='+idtab+'&tabF='+tabF, 
        Alto :'200', Ancho :'600'
 	});
 }

SalesUp.Variables.editarCampos=function(idcampo,naturaleza, tk){
 	var idventana=$('#opcionPantalla').val();
	var idtab=$('#listaTabs li.ui-tabs-active.ui-state-active').attr('data-idtab');
	var tabF = $('#listaTabs li.ui-tabs-active.ui-state-active').attr('data-tabF');

	if(naturaleza==2){
	   SalesUp.Sistema.AbrePopUp({
	          Titulo :'Campos personalizados', 
	          Pagina :'popup_editar_campo_general.dbsp', 
	          Parametros:'idcampo='+idcampo+'&idventana='+idventana+'&idtab='+idtab+'&tabF='+tabF, 
	          Alto :'190', 
	          Ancho :'600'
	 });
	 }
	 else {
	 	  SalesUp.Sistema.AbrePopUp({
	          Titulo :'Campos personalizados', 
	          Pagina :'popup_editar_campo_sistema.dbsp', 
	          Parametros:'idcampo='+idcampo+'&idventana='+idventana+'&idtab='+idtab, 
	          Alto :'200',  Ancho :'350'
		 });	
	 }
}

SalesUp.Variables.MuetraIconoEliminar=function(accion, idTimes){
if(accion==1){
	$('#times'+idTimes).removeClass('oculto');
	//$('#IDTAB'+idTimes+ ' a').click();
}
else{
	$('#times'+idTimes).addClass('oculto');
}
}

SalesUp.Variables.AlertaEliminarTab=function(Op){
	
	$Elemento = $(Op.e);
   
	var idtab=$Elemento.attr('data-idtab');
	var nombretab=$('#IDTAB'+idtab).text();
	
	    var Pregunta = $Elemento.attr('data-q')+nombretab+'?';
      	var Id = $Elemento.attr('data-id');
        var Funcion = (Op.Corp) ? Op.Corp : 'SalesUp.Variables.EliminaTab';

        SalesUp.Construye.MuestraAlerta({
          TipoAlerta:'AlertaPregunta',
          Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> '+Pregunta+'',
          Boton1:'Si, Eliminar',
          Boton2:'Cancelar',
       		Callback1: Funcion+'({Id:'+Id+'})',
          Icono1:'<i class="fa fa-trash"></i>',
          Icono2:'<i class="fa fa-times"></i>',
          Ancho:'500px'
        });	

}

SalesUp.Variables.EliminaTab=function(){
		
	var idVentana = $("#opcionPantalla").val();	
	var idtab=$('#listaTabs li.ui-tabs-active.ui-state-active').attr('data-idtab');
	var nombretab=$('#IDTAB'+idtab).text();
	var tieneDatos=$('#'+idtab+' table div').attr('class');
	//var icono =$('#icono'+idtab).attr('class'); 
	
	
	idVentana=escape($.trim(idVentana));
	idtab=escape($.trim(idtab));
	nombretab=escape($.trim(nombretab));
	tieneDatos=escape($.trim(tieneDatos));
		
	if(tieneDatos=='SinResultados'){  	
	   	SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/queryEliminaTabSinCampos.dbsp', Parametros:'IDTAB='+idtab}); 
	   
		SalesUp.Sistema.MuestraEspera('#Tabs', 1);   
	    setTimeout(function() {
		SalesUp.Variables.Loading(idVentana);
		tb_remove();
		},500);
		SalesUp.Sistema.OcultaEspera();
	}
	else{
			var idventana=$('#opcionPantalla').val();
			var idtab=$('#listaTabs li.ui-tabs-active.ui-state-active').attr('data-idtab');
			idventana=escape($.trim(idventana));
			idtab=escape($.trim(idtab));
			
		   SalesUp.Sistema.AbrePopUp({
		          Titulo :'Campos personalizados', 
		          Pagina :'/privado/Vista/popup_mueve_campos.dbsp', 
		          Parametros:'idtab='+idtab+'&nombretab='+nombretab, 
		          //CallBack: '', 
		          Alto :'150', 
		          Ancho :'350'
		 });
	}
}

SalesUp.Variables.CamposDisponiblesEmpresa = function(){
	var procesaCampos = function(Op, err){
		if (Op){
			var jResp = Op.jsonDatos[0], total = jResp.total;
			var html  = '';
				html = '<span id="despliega" class="Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar Pointer">No hay campos disponibles</span>'; 
			if (total>0){
				html = '<span id="despliega" class="Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar Pointer">'+total+' Campos disponibles</span>'; 
			}
				
			$('#disponiblesEmpresa').html(html);
		}
	}
	SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonCamposDisponiblesEmpresa.dbsp', callback:procesaCampos});
}

SalesUp.Variables.CamposDisponibles = function(idventana){
			var CamposDisp = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCamposDisponibles.dbsp',
			Parametros: 'VerEn='+idventana,
			DataType: "json"
			}).jsonDatos;
			
			if(CamposDisp[0].TOTAL!=0){
			html='<span id="despliega" class="Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar Pointer" onmouseenter="SalesUp.Variables.MuestraCamposDisponibles('+
			CamposDisp[0].TOTAL+','+CamposDisp[0].AUTO+','+CamposDisp[0].DECIMALES+','+CamposDisp[0].FECHA+','
			+CamposDisp[0].LISTA+','+CamposDisp[0].NUMERO+','+CamposDisp[0].TEXTO+','+CamposDisp[0].UUID+', 1)";>'+CamposDisp[0].TOTAL+' Campos disponibles</span>';
			$('#disponibles').html(html);
			$('#BtnAgregar').removeClass('oculto');	
			}
			else{
			
			html='<span id="despliega" class="Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar Pointer" onmouseenter="SalesUp.Variables.MuestraCamposDisponibles(0,1,2,3,4,5,6,7,8,0);"><i class="fa fa-question-circle"></i> No hay campos disponibles</span>';
			$('#disponibles').html(html);
			$('#BtnAgregar').addClass('oculto');
			}
}

SalesUp.Variables.MuestraCamposDisponibles=function(total,auto, decimales, fecha, lista, numero, texto, uuid, accion){
	
	if(accion==1){
	   var $Elemento = $(despliega);			
	   var Acciones ='<table><tr><td><b>'+auto+'</b></td><td>Autoincrementable</td></tr>';
				Acciones += '<tr><td><b>'+decimales+'</b></td><td>Decimales</td></tr>';
				Acciones += '<tr><td><b>'+fecha+'</b></td><td> Fecha</td></tr>';
				Acciones += '<tr><td><b>'+lista+'</b></td><td> Lista</td></tr>';
				Acciones += '<tr><td><b>'+numero+'</b></td><td> Numero</td></tr>';
				Acciones += '<tr><td><b>'+texto+'</b></td><td> Texto</td></tr>';
				Acciones += '<tr><td><b>'+uuid+'</b></td><td> UUID</td></tr></table>';
			SalesUp.Construye.popOver({Elemento:despliega, PopOverLugar:'top',Titulo: '<b>Campos disponibles</b>' ,Contenido:Acciones, Clases:'PopOverAcciones'});								
		}
		else{
			 var $Elemento = $(despliega);			
	   var Acciones ='Has llegado al limite de campos</br>disponibles en el sistema';
			SalesUp.Construye.popOver({Elemento:despliega, PopOverLugar:'top',Contenido:Acciones, Clases:'PopOverAcciones'});										
		}	
}


