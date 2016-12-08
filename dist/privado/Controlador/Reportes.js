/*Crea agrupaciones*/
var control = SalesUp.Sistema.queControl();
SalesUp.Variables.creaSelectReportes = function(){
	var selectReportes	= '<select name="AgrupaTipo" id="AgrupaTipo" onChange="SalesUp.Variables.CambiaAgrupacionTipo({valor:value,SelectActual:this})" class="Select w100"></select>';
	var LosFiltros 		= SalesUp.Sistema.CargaDatos({Link:'/privado/filtrosReportes.dbsp'});
	
	$('.BoxBotones').html(LosFiltros);
	$('#Agrupaciones').append(selectReportes);

	var reportesGuardados = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonFiltrosReportesUsuario.dbsp', Parametros:'idpantalla='+SalesUp.Variables.Idpantalla+'&idreporte='+SalesUp.Variables.Reporte,DataType:'json'}).jsonDatos;

	if(!_.isUndefined(reportesGuardados[0].NOMBRE)){
		for (var i = 0; i < reportesGuardados.length; i++) {
			var _elementoActual = reportesGuardados[i];
			$('#AgrupaTipo').append('<option value="'+_elementoActual.IDUSUARIOREPORTE+'" data-config="'+_elementoActual.FILTRO+'" data-default="'+_elementoActual.PORDEFECTO+'">'+_elementoActual.NOMBRE+'</option>');
		};
	}

	$('#AgrupaTipo').append('<optgroup label="---"></optgroup>');
	$('#AgrupaTipo').append('<option value="" data-tipofiltro="3">(Crear reporte)</option>');

	var filtrosReportes = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonObtieneFiltrosReporte.dbsp',Parametros:'idreporte='+SalesUp.Variables.Reporte,DataType:'json'}).jsonDatos;

	$('#FiltroTipo').append('<option value="">(Filtrar...)</option>');

	for (var i = 0; i < filtrosReportes.length; i++) {
		var filtroActual	= filtrosReportes[i];
		
		$('#FiltroTipo').append('<option value="'+filtroActual.IDFILTRO+'">'+filtroActual.NOMBRE+'</option>');
	};
};

SalesUp.Variables.ActivaMostrarFiltros = function(){
  var Activo = $('#FiltrarPor').is(':visible');
  if (Activo){
  	$('#FiltrarPor > select').val('');
    $('#FiltrarPor').slideUp();
    setTimeout(function(){ $('#TiposFiltros > *').hide(); }, 400);
  }else{
    setTimeout(function(){ $('#FiltrarPor').slideDown(); $('#FiltroTipo').focus(); }, 400);
  }
};

SalesUp.Variables.MostrarFiltro = function(Op){
	  var Filtro = Op.Filtro;
	  $('#TiposFiltros').html('');
	  
	  $('#TiposFiltros > select:visible, #FiltroTexto').slideUp();
	  $('#TiposFiltros > select').val(0);
	  
  	if(Filtro==2){
	  	$('#AnioFiltro').remove();
	  	$('#TiposFiltros').append('<select onchange="SalesUp.Variables.CambiaFiltro({Elemento:this, Valor:value, Filtro:2});" id="AnioFiltro" class="Ellipsis" style="margin: 2px 10px;height: 22px;"></select>');

	  	var aniosDisponibles = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonAniosDisponibles.dbsp',Parametros:'idfiltro='+Filtro,DataType:'json'}).jsonDatos;

	  	$('#AnioFiltro').append('<option value="">Seleccionar</option>');

	  	for (var i = 0; i < aniosDisponibles.length; i++) {
	  		var _valorActual = aniosDisponibles[i];
	  		
	  		$('#AnioFiltro').append('<option value="'+_valorActual.VALOR+'">'+_valorActual.VALOR+'</option>');
	  	};
	  }else if(Filtro == 3){
	  	$('#AnioFiltro').remove();
	  	$('#TiposFiltros').append('<input type="text" name="fechaInicio" id="fechaInicio" placeholder="Fecha inicio" class="Input" style="height:21px;"/> <input type="text" name="fechaFin" id="fechaFin" placeholder="Fecha fin" class="Input" style="height:21px;"/>');
	  	SalesUp.Sistema.DatePickerInicioFin({D:'fechaInicio', H:'fechaFin', A:'SalesUp.Variables.CambiaFiltroFecha();'});
	  	$('input.fecha').datepicker(ConfiguracionPicker);
	  }else{
	  	$('#AnioFiltro').remove();

	  	$('#TiposFiltros').append('<select onchange="SalesUp.Variables.CambiaFiltro({Elemento:this, Valor:value, Filtro:'+Filtro+'});" id="AnioFiltro" class="Ellipsis" style="margin: 2px 10px;height: 22px;"></select>');

	  	var aniosDisponibles = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonAniosDisponibles.dbsp',Parametros:'idfiltro='+Filtro,DataType:'json'}).jsonDatos;

	  	$('#AnioFiltro').append('<option value="">Seleccionar</option>');

	  	for (var i = 0; i < aniosDisponibles.length; i++) {
	  		var _valorActual = aniosDisponibles[i];
	  		
	  		$('#AnioFiltro').append('<option value="'+SalesUp.Sistema.Encript({cadena:_valorActual.VALOR})+'" data-datoC="'+SalesUp.Sistema.Encript({cadena:_valorActual.CONDICION})+'">'+_valorActual.TEXTO+'</option>');
	  	};
	  }
}

SalesUp.Variables.CambiaFiltroFecha = function(){
	var Inicio 	= '';
	var Fin 	= '';
	Inicio 		= $('#fechaInicio').val();
	Fin 		= $('#fechaFin').val();

	if(Inicio != '' && Fin != ''){
		SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});

		setTimeout(function(){
			var dataValor	= Inicio+','+Fin;
			var datav 		= Inicio+' y '+Fin;
			var tipoFiltro 	= $('#FiltroTipo').val();

			var stringFiltro 	= escape('{"texto":"'+datav+'","valor":"'+dataValor+'","tipoFiltro":"'+tipoFiltro+'"}');
			SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryGuardaFiltro.dbsp', Parametros:'idpantalla='+SalesUp.Variables.Idpantalla+'&idreporte='+SalesUp.Variables.Reporte+'&filtro='+stringFiltro});
			SalesUp.Variables.ActivaMostrarFiltros();
			SalesUp.Variables.CargaInterfaz();
		}, 100);
	}
};

SalesUp.Variables.CambiaAgrupacionTipo = function(Op){
	SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});

	SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryEliminaFiltrosReportes.dbsp', Parametros:'eliminaCriterios=1&idpantalla='+SalesUp.Variables.Idpantalla+'&idreporte='+SalesUp.Variables.Reporte});

	setTimeout(function(){
		var $MostarFiltro 	= $(Op.SelectActual);
		var TipoSelect 		= $MostarFiltro.find('option:selected').data('tipofiltro');

		if(TipoSelect == 3){
		  	SalesUp.Variables.OcultaLoad();
		  	SalesUp.Sistema.AbrePopUp({
				Parametros	: 'idreporte='+SalesUp.Variables.Reporte+'&idusuarioreporte=0',
				Titulo 		: 'Nueva variante de reporte', 
				Pagina 		: 'popup_nuevo_reporte.dbsp', 
				CallBack 	: 'SalesUp.Variables.cargaVentana', 
				Modal  		:true, ModalAlt : true, Alto:400, Ancho:600
			});
		  }else{
		  	$('#input-filter').val('');
		  	SalesUp.Variables.CargaFiltrosReporteGuardados();
		  	//SalesUp.Variables.CargaInterfaz();
		  }
	}, 100);
};

SalesUp.Variables.EditarConfiguracion = function(_valor){
	SalesUp.Variables.OcultaLoad();
	  	SalesUp.Sistema.AbrePopUp({
			Parametros	: 'idreporte='+SalesUp.Variables.Reporte+'&idusuarioreporte='+_valor,
			Titulo 		: 'Nueva variante de reporte', 
			Pagina 		: 'popup_nuevo_reporte.dbsp', 
			CallBack 	: 'SalesUp.Variables.cargaVentana', 
			Modal  		:true, ModalAlt : true, Alto:400, Ancho:600
		});
}

SalesUp.Variables.CambiaFiltro = function(_obj){
	SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});

	setTimeout(function(){
		var $select 	= $(_obj.Elemento);
		var dataValor	= $select.val();
		var datac 		= ($select.find('option:selected').data('datoc')) ? $select.find('option:selected').data('datoc') : '';
		var datav 		= $select.find('option:selected').html();
		var dataAgrupa	= $('#AgrupaTipo').val();
		var tipoFiltro 	= $('#FiltroTipo').val();

		var stringFiltro 	= escape('{"consulta":"'+datac+'","texto":"'+datav+'","valor":"'+dataValor+'","agrupacion":"'+dataAgrupa+'","tipoFiltro":"'+tipoFiltro+'"}');
		SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryGuardaFiltro.dbsp', Parametros:'idpantalla='+SalesUp.Variables.Idpantalla+'&idreporte='+SalesUp.Variables.Reporte+'&filtro='+stringFiltro});
		SalesUp.Variables.ActivaMostrarFiltros();
		SalesUp.Variables.CargaInterfaz();
	}, 100);
};

SalesUp.Variables.EliminarFiltros = function(){
	SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});

	setTimeout(function(){
		SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryEliminaFiltrosReportes.dbsp', Parametros:'idpantalla='+SalesUp.Variables.Idpantalla+'&idreporte='+SalesUp.Variables.Reporte});
		SalesUp.Variables.CargaInterfaz();
	}, 100);
};
/*Fin crea agrupaciones*/

SalesUp.Variables.GuardaConstruyeFiltros = function(_arrayFiltros){
  $('#FiltrosActuales').html('');

  if(_arrayFiltros.length > 0){
  	var TemplateEtiquetaFiltro = '<span class="filtro Pointer Tip1" Tip="Quitar filtro" style="margin-top: 2px !important;"  onclick="SalesUp.Variables.QuitarFiltro({{filtro}});">{{texto}} <i class="fa fa-times-circle"></i></span>';

	  SalesUp.Construye.ReemplazaTemplate({
	    Template: TemplateEtiquetaFiltro,
	    Destino: '#FiltrosActuales',
	    Datos: _arrayFiltros
	  });

	  $('#FiltrosActuales').append('<span id="EliminarFiltros" class="Pointer Tip1" Tip="Eliminar filtros" onclick="SalesUp.Variables.EliminarFiltros({Elemento:this, Recargar:true});"><i class="fa fa-lg fa-times"></i></span>');  
	  $('#FiltrosActuales').show();
  }
}/*GuardaConstruyeFiltros*/

SalesUp.Variables.PreguntaBorrarConfiguracionReporte = function(_obj){
	SalesUp.Construye.MuestraAlerta({Ancho:"200px",TipoAlerta:'AlertaPregunta',Boton1:'Aceptar',Boton2:'Cancelar',Alerta:'¿Está seguro de borrar la configuración?',Callback1:'SalesUp.Variables.EliminaConfiguracionReporte("'+_obj.idusuarioreporte+'")'});
};

SalesUp.Variables.EliminaConfiguracionReporte = function(idusuarioreporte){
	SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});

	setTimeout(function(){
		SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryEliminaConfigReporte.dbsp',Parametros:'idusuarioreporte='+idusuarioreporte+'&idreporte='+SalesUp.Variables.Reporte+'&idpantalla='+SalesUp.Variables.Idpantalla});
		SalesUp.Variables.cargaVentana();
	}, 100);
};

SalesUp.Variables.QuitarFiltro = function(_filtro){
	SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});

	setTimeout(function(){
		SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryEliminaFiltroReporte.dbsp',Parametros:'filtro='+_filtro+'&idreporte='+SalesUp.Variables.Reporte+'&idpantalla='+SalesUp.Variables.Idpantalla});
		SalesUp.Variables.CargaInterfaz();
	}, 100);
};

/** Funcion que crea las opciones de las graficas(SalesUp.Variables.ObtieneOpcionesGrafica) **/
SalesUp.Variables.ObtieneOpcionesGrafica = function(_opcGrafica){
	var plotOptions = {};
    
    if(_opcGrafica.tipoGrafica == 'area'){
		plotOptions = {
            area: {
            	stacking: 'normal',
                marker: {
                    enabled: false,
                    symbol: 'circle'
                }
            }
        }
	}
    
	var opcionesGenerales = {
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        subtitle: {
            text: _opcGrafica.subtitulo
        }
	};
	
	if(_opcGrafica.tipoGrafica == 'line'){
		var opcionesVariables = {
	        chart: {
	            zoomType: 'xy'
	        },xAxis: {
	            categories: _opcGrafica.categorias
	        },yAxis: { // Primer yAxis
	            title: {
	                text: 'Monto',
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
            	}]
	        },
	        legend: {
	            align: 'center',
            	verticalAlign: 'bottom',
	            backgroundColor: '#FFFFFF'
	        },
	        series: _opcGrafica.series
		};
	}else{
		var opcionesVariables = {
	       chart: {
	            type: _opcGrafica.tipoGrafica
	        }, xAxis: {
	            categories: _opcGrafica.categorias
	        },
	        yAxis:{
	            title: {
	                text: ''
	            }
	        },
	        tooltip: {
	            pointFormat: 'Total de {series.name}: <b>{point.y}</b>'
	        },
	        series: _opcGrafica.series,
        	plotOptions: plotOptions
		};
	}
	
	var opciones = $.extend(opcionesGenerales, opcionesVariables);
	
	return opciones;
};
/** END: termina funcion SalesUp.Variables.ObtieneOpcionesGrafica **/

/** Funcion que carga las graficas(SalesUp.Variables.CargaGrafica) **/
SalesUp.Variables.CargaGrafica = function(_datos){
	SalesUp.Variables.arraySeries 		= [];
	SalesUp.Variables.arrayCategorias 	= [];

	for (var i = 0; i < _datos[0].series.length; i++) {
		var _elementoActual = _datos[0].series[i];

		SalesUp.Variables.arraySeries.push({name:_elementoActual.name});
		SalesUp.Variables.arraySeries[i].data = [];

		for (var j = 0; j < _elementoActual.data.length; j++) {
			var _valorActual = _elementoActual.data[j];

			SalesUp.Variables.arraySeries[i].data.push((_valorActual.valor == '') ? 0 : parseFloat(_valorActual.valor));			
		};
	};

	for (var i = 0; i < _datos[0].categorias.length; i++) {
		var _elementoActual = _datos[0].categorias[i];

		if(_.isUndefined(_elementoActual.Titulo)){
			SalesUp.Variables.arrayCategorias.push(_elementoActual.categoria);
		}
	};

	if(!_.isUndefined(SalesUp.Variables.arraySeries[0].name)){
		$('#DatosGrafica').html('');
	    
	    var divGrafica1 = '#DatosGrafica';	
		SalesUp.Variables.arraySeriesLinea = SalesUp.Variables.arraySeries;

		$(divGrafica1).highcharts(SalesUp.Variables.ObtieneOpcionesGrafica({tipoGrafica:_datos[0].tipoGrafica,series:SalesUp.Variables.arraySeriesLinea, categorias:SalesUp.Variables.arrayCategorias, nombre:_datos[0].nombre, subtitulo:''}));
	}else{
		$('#DatosGrafica').html('');
	}
};
/** END: termina la funcion SalesUp.Variables.CargaGrafica **/

SalesUp.Variables.OcultaLoad = function(){
  SalesUp.Sistema.OcultarOverlay();
  SalesUp.Sistema.OcultaEspera();
};

/* Crea totales */
SalesUp.Variables.CreaTotales = function(_obj){
	var $tablaReporte 	= $('#tablaReporte');
	var arrayTr 		= $tablaReporte.find('tr');
	var banderaPrimero	= true;
	var contPermiteHorizontales = 0;
	var arrayValoresExtra = (_obj.datosExtra != '') ? JSON.parse(SalesUp.Sistema.Encript({cadena:_obj.datosExtra,tipo:'decode'})): '';

	for (var i = 0; i < arrayTr.length; i++) {
		
		var $tr 		= $(arrayTr[i]);
		var suma		= 0;
		var cont 		= 0;
		var totalCeros 	= 0;

		$tr.find('td').each(function(index){
			var permiteOpHorizontal = $tablaReporte.find('tr:first').find('td:eq('+index+')').data('horizontal');

			var $td = $(this);

			if($td.attr('data-total') && permiteOpHorizontal == 1){
				contPermiteHorizontales++;
				cont++;
				suma = suma + parseFloat($td.data('total'));

				if(parseFloat($td.data('total')) == 0 ){
					totalCeros++;
				}
			}

			if(($tr.find('td').length-1 == index) && (_obj.tipoTotal == 'Promedio')){
				if(_obj.cuentaCeros == 'false'){
					suma = ((cont-totalCeros) == 0) ? 0 : suma/(cont-totalCeros);
				}else{
					suma = suma/cont;
				}
			}
		});

		if(i==0){
			$tr.append('<td class="tCen totalesHorizontales">Total</td>');
		}else{
			$tr.append('<td class="tCen totalesHorizontales"><b class="'+_obj.formatoTotal+'">'+suma+'</b></td>');
		}
	};

	var nRows 			= $tablaReporte.find('tbody').find('tr').length;
	var arrayTd 		= $tablaReporte.find('tr:first').find('td');

	$tablaReporte.append('<tr class="ultimoRow"></tr>');
		
	for(var i = 0;i<= arrayTd.length-1; i++){
		$('.ultimoRow').append('<td></td>');
		  
	  	var $t 				= $(arrayTd[i]);
	  	//var formatoColumna 	= $t.data('formato');
		  
	  	if($t.attr('data-vertical')){
	  		var operacion 	= $t.data('operacion');
			var total 		= 0;
			var totalCeros 	= 0;
	     
	     for(var x = 0; x<=nRows-1;x++){

	     	if(banderaPrimero){
	     		var primer = i - 1;
	  			$('.ultimoRow').find('td:eq('+primer+')').addClass('tDer FondoMenu').html('<b>Totales</b>');
	  			banderaPrimero = false;
	  		}

	        var arrayValor = $tablaReporte.find('tbody').find('tr:eq('+x+')').find('td:eq(' + i + ')').data('total');
			
			//$tablaReporte.find('tbody').find('tr:eq('+x+')').find('td:eq(' + i + ')').find('a').addClass(formatoColumna);

	        (!arrayValor)?arrayValor = 0:'';
	        
	        if(operacion == 'suma' || operacion == 'promedio'){
	        	total = total + parseFloat(arrayValor);

	        	if(parseFloat(arrayValor) == 0 ){
					totalCeros++;
				}
	        }

	        if ((x == nRows-1) && (operacion == 'promedio')) {
	        	if(_obj.cuentaCeros == 'false'){
					total = ((nRows-totalCeros) == 0) ? 0 : total/(nRows-totalCeros);
				}else{
					total = total/nRows;
				}
	        }
	      }

	      if(arrayValoresExtra != ''){
	      	for (var x = 0; x < arrayValoresExtra.length; x++) {
	      		var _extraActual = arrayValoresExtra[x];
	      		if(i == _extraActual.POSICION){
	      			total = _extraActual.DATO;
	      		}
	      	};
	      }

	      if(total == 0){
	      	$('.ultimoRow').find('td:eq('+i+')').addClass('tCen FondoMenu').html('-').attr('data-total',total);
	      }else{
	      	$('.ultimoRow').find('td:eq('+i+')').addClass('tCen FondoMenu').html('<b class="'+$t.data('formato')+'">' + total + '</b>').attr('data-total',total);
	      }
	  }	  
	}

	var sumaTotalFinal 	= 0;
	var cont 			= 0;
	var totalCeros 		= 0;

	$('.ultimoRow').find('td').each(function(index){
		var permiteOpHorizontal = $tablaReporte.find('tr:first').find('td:eq('+index+')').data('horizontal');

		var $td = $(this);
		
		if(permiteOpHorizontal == 1 && !_.isUndefined(permiteOpHorizontal)){
			cont++;
			if($td.attr('data-total')){
				sumaTotalFinal = sumaTotalFinal + parseFloat($td.data('total'));

				if(parseFloat($td.data('total')) == 0 ){
					totalCeros++;
				}
			}
		}

		if(($('.ultimoRow').find('td').length-1 == index) && (_obj.tipoTotal == 'Promedio')){
			if(_obj.cuentaCeros == 'false'){
				sumaTotalFinal = ((cont-totalCeros) == 0) ? 0 : sumaTotalFinal/(cont-totalCeros);
			}else{
				sumaTotalFinal = sumaTotalFinal/cont;
			}
		}
	});

	$('.ultimoRow').find('td:last').addClass('tCen totalesHorizontales FondoMenu').html('<b class="'+_obj.formatoTotal+'">'+sumaTotalFinal+'</b>');

	if(contPermiteHorizontales == 0){
		$('.totalesHorizontales').remove();
	}
};

SalesUp.Variables.FormateaColumnas = function(){
	var $tablaReporte 	= $('#tablaReporte');
	var nRows 			= $tablaReporte.find('tbody').find('tr').length;
	var arrayTd 		= $tablaReporte.find('tr:first').find('td');
		
	for(var i = 0;i<= arrayTd.length-1; i++){
	  	var $t 				= $(arrayTd[i]);
	  	var formatoColumna 	= $t.data('formato');
		  
	  	for(var x = 0; x<=nRows-1;x++){
			$tablaReporte.find('tbody').find('tr:eq('+x+')').find('td:eq(' + i + ')').find('a').addClass(formatoColumna);
			$tablaReporte.find('tbody').find('tr:eq('+x+')').find('td:eq(' + i + ')').find('span').addClass(formatoColumna);
	     }
	}

	SalesUp.Sistema.IniciaPlugins();
};
/* Termina crea totales*/

SalesUp.Variables.quitaAcentos = function(str){
	for (var i=0;i<str.length;i++){ 
	//Sustituye "á é í ó ú" 
		if (str.charAt(i)=="á") str = str.replace(/á/,"a"); 
		if (str.charAt(i)=="é") str = str.replace(/é/,"e"); 
		if (str.charAt(i)=="í") str = str.replace(/í/,"i"); 
		if (str.charAt(i)=="ó") str = str.replace(/ó/,"o"); 
		if (str.charAt(i)=="ú") str = str.replace(/ú/,"u"); 
	} 
	return str; 
};

SalesUp.Variables.CargaFiltrosReporteGuardados = function(){
	$('#Criterios').html('');
	SalesUp.Variables.FiltrosIngresados	= [];
	var configuracionReporteUsuario 	= JSON.parse(SalesUp.Sistema.Encript({cadena:$('#AgrupaTipo option:selected').data('config'),tipo:'decode'}));

	if(configuracionReporteUsuario.criterios.length > 0){
		for (var i = 0; i < configuracionReporteUsuario.criterios.length; i++) {
			var criterioActual 		= configuracionReporteUsuario.criterios[i];
			var filtrosDisponibles 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonAniosDisponibles.dbsp',Parametros:'idfiltro='+criterioActual.valor,DataType:'json'}).jsonDatos;
			
			SalesUp.Variables.FiltrosIngresados.push(criterioActual.valor);
			if(criterioActual.tipo == 2){
				$('#Criterios').append('<select class="Select" id="criterioFiltro'+criterioActual.valor+'" data-idfiltro="'+criterioActual.valor+'" onchange="SalesUp.Variables.CambiaCriterioFiltro({elemento:this,valor:value});"><option value="-1" data-datoc="">(Todos...)</option></select>');

				for (var j = 0; j < filtrosDisponibles.length; j++) {
					var filtroActual = filtrosDisponibles[j];
					if(filtroActual.VALOR){
						$('#criterioFiltro'+criterioActual.valor).append('<option value="'+SalesUp.Sistema.Encript({cadena:filtroActual.VALOR})+'" data-datoC="'+SalesUp.Sistema.Encript({cadena:filtroActual.CONDICION})+'">'+filtroActual.TEXTO+'</option>');
					}
				};
			}
		};
	}

	for (var i = 0; i < configuracionReporteUsuario.configuracion.length; i++) {
		var filtroActual = configuracionReporteUsuario.configuracion[i];

		if(filtroActual.idfiltro != 2 && filtroActual.idfiltro != 3){
			$('#criterioFiltro' + filtroActual.idfiltro).val(SalesUp.Sistema.Encript({cadena:filtroActual.valor,tipo:'encode'}));
			var condicion = SalesUp.Sistema.Encript({cadena:filtroActual.consulta});

			var stringFiltro 	= escape('{"consulta":"'+condicion+'","texto":"'+filtroActual.texto+'","valor":"'+filtroActual.valor+'","tipoFiltro":"'+filtroActual.idfiltro+'"}');
			SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryGuardaFiltro.dbsp', Parametros:'ocultaGlobo=1&idpantalla='+SalesUp.Variables.Idpantalla+'&idreporte='+SalesUp.Variables.Reporte+'&filtro='+stringFiltro});

			if(!$('#criterioFiltro' + filtroActual.idfiltro).val() || $('#criterioFiltro' + filtroActual.idfiltro).val() == null || _.isNull($('#criterioFiltro' + filtroActual.idfiltro).val())){
				var arrayOptions = $('#criterioFiltro' + filtroActual.idfiltro + " option");
				
				if(arrayOptions.length > 1){
					$('#criterioFiltro' + filtroActual.idfiltro).val($(arrayOptions[1]).attr('value'));
				}else{
					$('#criterioFiltro' + filtroActual.idfiltro).val($(arrayOptions[0]).attr('value'));
				}

				SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});

				setTimeout(function(){
					SalesUp.Variables.CambiaCriterioFiltro({elemento:$('#criterioFiltro' + filtroActual.idfiltro),valor:$('#criterioFiltro' + filtroActual.idfiltro + " option:first").attr('value')});
				}, 100);
			}
		}
	}
	
	for (var i=0; i < SalesUp.Variables.FiltrosIngresados.length; i++) {
	  var opcActual = SalesUp.Variables.FiltrosIngresados[i];
	  $('#FiltroTipo').find('option[value='+opcActual+']').remove();
	};

	SalesUp.Variables.CargaInterfaz();
}

SalesUp.Variables.CambiaCriterioFiltro = function(_obj){
	SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});

	setTimeout(function(){
		var $elemento 	= $(_obj.elemento);
		var texto 		= $elemento.find('option:selected').html();
		var valor 		= $elemento.val();
		var condicion 	= $elemento.find('option:selected').attr('data-datoc');
		var idfiltro 	= $elemento.attr('data-idfiltro');

		var stringFiltro 	= escape('{"consulta":"'+condicion+'","texto":"'+texto+'","valor":"'+valor+'","tipoFiltro":"'+idfiltro+'"}');
		SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryGuardaFiltro.dbsp', Parametros:'ocultaGlobo=1&idpantalla='+SalesUp.Variables.Idpantalla+'&idreporte='+SalesUp.Variables.Reporte+'&filtro='+stringFiltro});
		SalesUp.Variables.CargaInterfaz();
	}, 100);
};

SalesUp.Variables.CargaInterfaz = function(){
	var periodo			= '';
	var fechaInicio 	= '';
	var fechaFin 		= '';
	var condicion 		= '';
	var anioAux			= '';
	var condicionAux	= '';
	var Destino 		= '#DatosLoad', IdTabla="tablaReporte";
	var agrupacion 		= $('#AgrupaTipo').val();

	var filtrosReporte = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonFiltrosReportes.dbsp', Parametros:'agrupacion='+agrupacion+'&idpantalla='+SalesUp.Variables.Idpantalla+'&idreporte='+SalesUp.Variables.Reporte,DataType:'json'}).jsonDatos;

	if(!_.isUndefined(filtrosReporte[0].SQLTXT)){
		var arrayFiltros 	= [];
		var arrayFiltrosAux	= [];

		for (var i = 0; i < filtrosReporte.length; i++) {
			var _filtroActual 	= filtrosReporte[i];
			var objConfig		= JSON.parse(_filtroActual.SQLTXT);

			if(_filtroActual.SQLTXT_EXP != 1){
				arrayFiltrosAux.push({condicion:objConfig.CONSULTA,valor:objConfig.VALOR,texto:_filtroActual.TEXTO,filtro:_filtroActual.FILTRO,tipo:_filtroActual.TIPO});
			}

			arrayFiltros.push({condicion:objConfig.CONSULTA,valor:objConfig.VALOR,texto:_filtroActual.TEXTO,filtro:_filtroActual.FILTRO,tipo:_filtroActual.TIPO});
		};

		var contCondiciones = 0;

		for (var i = 0; i < arrayFiltros.length; i++) {
			var _filtroActual = arrayFiltros[i];

			if(_filtroActual.condicion != ''){
				if(contCondiciones == 0){
					condicion = SalesUp.Sistema.Encript({"cadena":_filtroActual.condicion,"tipo":"decode"});
					contCondiciones ++;
				}else{
					condicion = condicion + ' AND ' + SalesUp.Sistema.Encript({"cadena":_filtroActual.condicion,"tipo":"decode"});
					contCondiciones ++;
				}
			}else if(_filtroActual.tipo == 2){
				anioAux = _filtroActual.valor;
			}else if(_filtroActual.tipo == 3){
				var rangoFiltro = _filtroActual.valor.split(',');

				fechaInicio = rangoFiltro[0];
				fechaFin 	= rangoFiltro[1];
			}
		};

		SalesUp.Variables.GuardaConstruyeFiltros(arrayFiltrosAux);
	}else{
		$('#FiltrosActuales').html('');
		$('#FiltrosActuales').hide();
	}

	//Filtros
	var reporteSistema				= $('#AgrupaTipo option:selected').data('default');

	if(reporteSistema == 0){
		$('.botones_sistema').html('');
		var btnExtraEliminar 	= '<span id="BorrarConfiguracion" style="padding:0 7px;margin-right: 2px;" Tip="Borrar reporte" onclick="SalesUp.Variables.PreguntaBorrarConfiguracionReporte({idusuarioreporte:'+$('#AgrupaTipo').val()+'});" class="Tip1 Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar"><i class="fa fa-lg fa-trash"></i></span>';
		var btnExtraEditar 		= '<span id="EditarConfiguracion" style="padding:0 7px;margin-right: 2px;" Tip="Editar reporte" onclick="SalesUp.Variables.EditarConfiguracion('+$('#AgrupaTipo').val()+');" class="Tip1 Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar"><i class="fa fa-lg fa-edit"></i></span>';
		$('.botones_sistema').append(btnExtraEliminar);
		$('.botones_sistema').append(btnExtraEditar);
		$('.botones_sistema').show();
	}else{
		$('.botones_sistema').hide();
		$('.botones_sistema').html('');
	}

	var configuracionReporteUsuario = JSON.parse(SalesUp.Sistema.Encript({cadena:$('#AgrupaTipo option:selected').data('config'),tipo:'decode'}));

	var mes 	= moment().format("MM");
	var dia 	= moment().format("DD");
	var anio 	= moment().format("YYYY");
	periodo 	= configuracionReporteUsuario.periodo;

	//if(configuracionReporteUsuario.criterios.length > 0){SalesUp.Variables.CreaCriteriosReportes(configuracionReporteUsuario.criterios)}else{$('.filtrosReportes').hide();}

	if(anioAux != ''){
		anio = anioAux;
	}

	if(configuracionReporteUsuario.configuracion.length > 0){
		var existeFiltro 	= _.where(configuracionReporteUsuario.configuracion, {idfiltro:2});

		if(existeFiltro.length > 0){
			if(anioAux != ''){
				existeFiltro[0].valor = anioAux;
				anio = anioAux;
			}else{
				anio = existeFiltro[0].valor;
			}

			if(fechaInicio == ''){
				fechaInicio = existeFiltro[0].valor + '-01-01 00:00:00';
				fechaFin 	= existeFiltro[0].valor + '-'+mes+'-'+dia+' 00:00:00';

				fechaInicio = moment(fechaInicio).format(SalesUp.Variables.Formato);
				fechaFin 	= moment(fechaFin).format(SalesUp.Variables.Formato);
			}
		}else{

			if(fechaInicio == ''){
				fechaInicio = anio + '-01-01 00:00:00';
				fechaFin 	= anio + '-'+mes+'-'+dia+' 00:00:00';

				fechaInicio = moment(fechaInicio).format(SalesUp.Variables.Formato);
				fechaFin 	= moment(fechaFin).format(SalesUp.Variables.Formato);
			}
		}

		/*for (var i = 0; i < configuracionReporteUsuario.configuracion.length; i++) {
			var filtroActual = configuracionReporteUsuario.configuracion[i];

			if(filtroActual.idfiltro != 2 && filtroActual.idfiltro != 3){
				$('#criterioFiltro' + filtroActual.idfiltro).val(SalesUp.Sistema.Encript({cadena:filtroActual.valor,tipo:'encode'}));
				
				if(condicionAux == ''){
					if(i == 0){
						condicion = condicion + filtroActual.consulta;
					}else{
						condicion = condicion + ' AND ' + filtroActual.consulta;
					}
				}else{
					condicion = condicionAux;
				}
			}
		}*/
	}else{
		if(fechaInicio == ''){
			fechaInicio = anio + '-01-01 00:00:00';
			fechaFin 	= anio + '-'+mes+'-'+dia+' 00:00:00';

			fechaInicio = moment(fechaInicio).format(SalesUp.Variables.Formato);
			fechaFin 	= moment(fechaFin).format(SalesUp.Variables.Formato);
		}
	}

	//condicion = condicionAux;

	var ConfiguracionReporte= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonConfiguracionReporte.dbsp',Parametros:'idreporte='+SalesUp.Variables.Reporte,DataType:'json'}).jsonDatos[0];
	var confReporte 		= JSON.parse(ConfiguracionReporte.CONFIGURACIONGENERAL);

	var consultaFiltro		= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonConsultaFiltro.dbsp', Parametros:'idreporte='+SalesUp.Variables.Reporte+'&tiporeporte='+configuracionReporteUsuario.agruparPor});

	var TemplateDatosCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateReporte.dbsp', Parametros:'thead=1', Div:0});
	var TemplateDatos 		= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateReporte.dbsp', Parametros:'thead=0', Div:0});

	if(SalesUp.Variables.Nivel >= 2){
		var usuariosPermitidos 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonPermisosReportes.dbsp', Parametros:'',DataType:'json'}).jsonDatos[0];
		var permisos 			= '('+usuariosPermitidos.PERMITIDOS+')';
	}else{
		var permisos = '';
	}

	if(SalesUp.Variables.Reporte == 1){
		var parametrosCabeceras	= {"token":ConfiguracionReporte.TOKEN,"tiporeporte":configuracionReporteUsuario.agruparPor,"consulta":consultaFiltro,"idusuario":SalesUp.Variables.Usuario,"idempresa":SalesUp.Variables.Empresa,"periodo":periodo,"fechainicio":fechaInicio,"fechafin":fechaFin,"convertcode":SalesUp.Variables.Convertcode,"condicion":condicion,"permisos":permisos,"output":"0"};
		var parametrosDatos		= {"token":ConfiguracionReporte.TOKEN,"tiporeporte":configuracionReporteUsuario.agruparPor,"consulta":consultaFiltro,"idusuario":SalesUp.Variables.Usuario,"idempresa":SalesUp.Variables.Empresa,"periodo":periodo,"fechainicio":fechaInicio,"fechafin":fechaFin,"convertcode":SalesUp.Variables.Convertcode,"condicion":condicion,"permisos":permisos,"output":"1"};
	}else if(SalesUp.Variables.Reporte == 2){
		var parametrosCabeceras	= {"token":ConfiguracionReporte.TOKEN,"tiporeporte":configuracionReporteUsuario.agruparPor,"CONDICION":condicion,"idusuario":SalesUp.Variables.Usuario,"idempresa":SalesUp.Variables.Empresa,"periodo":periodo,"year":anio, "consulta":consultaFiltro,"permisos":permisos,"OUTPUT":"0"};
		var parametrosDatos		= {"token":ConfiguracionReporte.TOKEN,"tiporeporte":configuracionReporteUsuario.agruparPor,"CONDICION":condicion,"idusuario":SalesUp.Variables.Usuario,"idempresa":SalesUp.Variables.Empresa,"periodo":periodo,"year":anio, "consulta":consultaFiltro,"permisos":permisos,"OUTPUT":"1"};
	}else if(SalesUp.Variables.Reporte == 3){
		var parametrosCabeceras	= {"token":ConfiguracionReporte.TOKEN,"tiporeporte":configuracionReporteUsuario.agruparPor,"CONDICION":condicion,"idusuario":SalesUp.Variables.Usuario,"idempresa":SalesUp.Variables.Empresa,"periodo":4,"consulta":consultaFiltro,"permisos":permisos, "OUTPUT":"0"};
		var parametrosDatos		= {"token":ConfiguracionReporte.TOKEN,"tiporeporte":configuracionReporteUsuario.agruparPor,"CONDICION":condicion,"idusuario":SalesUp.Variables.Usuario,"idempresa":SalesUp.Variables.Empresa,"periodo":4,"consulta":consultaFiltro,"permisos":permisos, "OUTPUT":"1"};
	}

	var parametros64		= SalesUp.Sistema.Encript({"cadena":JSON.stringify(parametrosCabeceras),"tipo":"encode"});
	var Cabeceras			= SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/webservices/jsonReportes.dbsp',Parametros:'parametros='+parametros64,DataType:'json'}).jsonDatos;

	parametros64			= SalesUp.Sistema.Encript({"cadena":JSON.stringify(parametrosDatos),"tipo":"encode"});
	var DatosSeries			= SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/webservices/jsonReportes.dbsp',Parametros:'parametros='+parametros64,DataType:'json'}).jsonDatos;

	var titPrimeraColumna	= $("#AgrupaTipo option:selected").html();

	var Datos				= [{
								"nombre":ConfiguracionReporte.NOMBRE,
								"tipoTotal":configuracionReporteUsuario.totales,
								"formatoTotal":confReporte.formatoTotal,
								"permiteTotales":(!_.isUndefined(configuracionReporteUsuario.totales) && configuracionReporteUsuario.totales != '') ? "true" : "false",
								"cuentaCeros":confReporte.cuentaceros,
								"categorias":[
									{"categoria":titPrimeraColumna,"Titulo":"true"}
								],
								"tipoGrafica":ConfiguracionReporte.TIPODEGRAFICA
							}];

	var arrayConfGeneral 	= ConfiguracionReporte.CONFIGURACIONTABLA.split(';');
	var confAcciones		= JSON.parse('{"acciones":['+arrayConfGeneral[0]+'],'+arrayConfGeneral[1]+'}');

	if(_.isUndefined(DatosSeries[0].TEXTO)){
		$('#DatosGrafica').html('');
		SalesUp.Construye.SinResultados({Destino:Destino});
	}else{
		for (var i = 0; i < Cabeceras.length; i++) {
			var _elementoActual = Cabeceras[i];

			if(!_.isUndefined(_elementoActual.configuracion)){
				arrayConfGeneral	= _elementoActual.configuracion.split(';');
				confAcciones		= JSON.parse('{"acciones":['+arrayConfGeneral[0]+'],'+arrayConfGeneral[1]+'}');
				Datos[0].categorias.push($.extend({"categoria":_elementoActual.categoria}, confAcciones));
			}else{
				Datos[0].categorias.push($.extend({"categoria":_elementoActual.categoria}, confAcciones));
			}
		};

		var datoAnterior = '';
		var contArray	 = 0;

		Datos[0].series=[];
		Datos[0].extra = '';

		if(!_.isUndefined(confReporte.clase) && confReporte.clase == 2){

			for (var i = 0; i < DatosSeries.length; i++) {
				var _valorActual 	= DatosSeries[i];

				if(i == 0){
					Datos[0].extra = _valorActual.TOTALES;
				}

				var objDatos 		= JSON.parse(_valorActual.DATO);
				var objLinks 		= JSON.parse(_valorActual.linkdetalle);
				var arrayDatos		= objDatos.DATO.split(',');
				var arrayLinks		= objLinks.DATO.split(',');

				Datos[0].series.push({"name":_valorActual.TEXTO,"data":[]});

				for (var j = 0; j < arrayDatos.length; j++) {
					var valorDato 	= arrayDatos[j];
					var valorLink 	= arrayLinks[j];

					if(!_.isUndefined(valorLink)){
						valorLink 	= valorLink.replace(/'/gi,"");
					}

					if(valorDato == 0 || valorDato == '0'){
						valorDato = '';
					}

					Datos[0].series[i].data.push({"valor":valorDato,"linkDetalle":valorLink});
				};
			};
		}else{
			for (var i = 0; i < DatosSeries.length; i++) {
				var _valorActual = DatosSeries[i];

				if((datoAnterior != _valorActual.ID) || datoAnterior == ''){
					contArray++;
					datoAnterior = _valorActual.ID;

					if(_valorActual.global == 2){
						var clase = 'FondoMenu';
						var ultimo = '1';
					}else{
						var clase = '';
						var ultimo = '';
					}

					if(_valorActual.DATO == 0 || _valorActual.DATO == '0'){
						var valorDato = '';
					}else{
						var valorDato = _valorActual.DATO;
					}

					Datos[0].series.push({"name":_valorActual.TEXTO,"clase":clase,"ultimo":ultimo,"data":[{"valor":valorDato,"linkDetalle":_valorActual.linkdetalle,"clase":clase,"formatoClase":Datos[0].formatoTotal}]});
				}else{
					if(_valorActual.global == 2){
						var clase = 'FondoMenu';
					}else{
						var clase = '';
					}

					if(_valorActual.DATO == 0 || _valorActual.DATO == '0'){
						var valorDato = '';
					}else{
						var valorDato = _valorActual.DATO;
					}
					
					Datos[0].series[contArray-1].data.push({"valor":valorDato,"linkDetalle":_valorActual.linkdetalle,"clase":clase,"formatoClase":Datos[0].formatoTotal});
				}
			};
		}

		var htmlColumnas 	= SalesUp.Construye.ReemplazaDatos({Template:TemplateDatosCampos,Datos:{"categorias":Datos[0].categorias}});

		SalesUp.Construye.ConstruyeTabla(htmlColumnas, TemplateDatos, Datos, {Destino:Destino, Id:IdTabla} );

		if(SalesUp.Variables.Reporte != 2){
			if(Datos[0].permiteTotales == 'true' && !_.isUndefined(DatosSeries[0].TEXTO) ) {
				SalesUp.Variables.CreaTotales({"tipoTotal":Datos[0].tipoTotal,"formatoTotal":Datos[0].formatoTotal,"cuentaCeros":Datos[0].cuentaCeros,"datosExtra":Datos[0].extra});
			}

		}


		SalesUp.Variables.FormateaColumnas();

		if(ConfiguracionReporte.TIPODEGRAFICA != '' && !_.isUndefined(DatosSeries[0].TEXTO)){
			SalesUp.Variables.CargaGrafica(Datos);
		}
	}

	$('#TituloVentana').html(ConfiguracionReporte.NOMBRE);

	/*$('#tablaReporte').filterTable({ // apply filterTable to all tables on this page
        inputSelector: '#input-filter' // use the existing input instead of creating a new one
    });*/

	$('#input-filter').keyup(function(e){
	    var code = e.keyCode || e.which;
	    if (code == '9') return;
	    if (code == '27') $(this).val(null);
	    var $rows = $('#tablaReporte').find('tbody').find('tr.cuerpoTd');
	    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
	    val = SalesUp.Variables.quitaAcentos(val);
	    $rows.show().filter(function(){
	      var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
	      var textoBusqueda = SalesUp.Variables.quitaAcentos(text);
	      return !~textoBusqueda.indexOf(val);
	    }).hide();
	});
	
    SalesUp.Variables.OcultaLoad();
};

SalesUp.Variables.cargaVentana = function(){
	SalesUp.Variables.creaSelectReportes();
	SalesUp.Variables.CargaFiltrosReporteGuardados();
	//SalesUp.Variables.CargaInterfaz();
};

$(function(){
	SalesUp.Variables.Formato = SalesUp.Sistema.Almacenamiento({a:'SysFormatoFecha'});
	SalesUp.Variables.Formato = SalesUp.Sistema.StrReplace('yy','yyyy',SalesUp.Variables.Formato);
	SalesUp.Variables.Formato = SalesUp.Variables.Formato.toUpperCase();
	SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});

	setTimeout(function(){
		if(SalesUp.Variables.Reporte == ''){
			SalesUp.Variables.Reporte = 1;
		}
		SalesUp.Variables.creaSelectReportes();
		SalesUp.Variables.CargaFiltrosReporteGuardados();
		//SalesUp.Variables.CargaInterfaz();
	}, 100);
});


