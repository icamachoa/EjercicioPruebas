/** funcion que carga configuraciones generales **/
SalesUp.Variables.MuestraAlertas = function(_mensaje){
	SalesUp.Construye.MuestraAlerta({
		TipoAlerta:'AlertaModal', 
		Alerta: _mensaje, Ancho:'200px', Alto:'70px'
	});
};

SalesUp.Variables.CargaFuncionesGenerales = function(){
	Handlebars.registerHelper('list', function(serie, agrupacion, feedback, options) {
	  	var out = "", data;
	  	out += options.data.root.Series[serie].agrupaciones[agrupacion];
	  return out;
	});

	Handlebars.registerHelper('funcionPaso', function(serie, pasos, paso, options) {
	  	var out = "", data;
	  	out += options.data.root.Series[serie].paso[pasos];
	  return out;
	});

	Handlebars.registerHelper('pctActual', function(serie, index, pct, options) {
	  	var out = "", data;
	  	
	  	if(!_.isUndefined(options.data.root.Series[serie].pct)){
	  		if(options.data.root.Series[serie].pct[index] == '0%'){
	  			out += '-';
	  		}else{
	  			out += options.data.root.Series[serie].pct[index];
	  		}
	  	}
	  return out;
	});

	Handlebars.registerHelper('cambiaFondo', function(naturaleza, fondo) {
	  	var out = "", data;
	  	
	  	if(naturaleza == 2){
	  		var color 	= $('#menu-superior').css('backgroundColor');
	  		color 		= SalesUp.Variables.AumentaRgb(color);
	  		out += 'background-color:'+color+' !important;';
	  	}
	  return out;
	});

	Handlebars.registerHelper('classTotalVenta', function(nombreSeriePadre, index, indexPadre, feedback) {
	  	var out 		= "", data;
	  	indexPadre 	= indexPadre - 1;
	  	if (nombreSeriePadre == 'Total ventas') {
	  		out += 'totalTotales total' + indexPadre + index;
	  	}else{
	  		out += '';
	  	}
	  return out;
	});

	Handlebars.registerHelper('classTranTotal', function(indexPadre, index, feedback) {
	  	var out 	= "", data;
	  	indexPadre 	= indexPadre + 1;
	  	out += 'totalTransaccion' + indexPadre + index;
	  return out;
	});

	Handlebars.registerHelper('tieneValor', function(valorRecibido, valor) {
	  	var out 	= "", data;
	  	
	  	if(valorRecibido == 0){
	  		out += '-';
	  	}else{
	  		out += valorRecibido;
	  	}
	  return out;
	});

	Handlebars.registerHelper('insertaFormatMoney', function(valorRecibido, clase) {
	  	var out 	= "", data;
	  	
	  	if(valorRecibido == 0){
	  		out += '';
	  	}else{
	  		out += 'FormatToMoney';
	  	}
	  return out;
	});

	Handlebars.registerHelper('clase', function(serie, formato, classFormat, options) {
	  	var out = "", data;
	  	var formatoClase =  options.data.root.Series[serie].formatos[formato];

	  	if(formatoClase == 1){
	  		out += 'class="FormatToMoney"';
	  	}else{
	  		out += '';
	  	}
	  return out;
	});

	Handlebars.registerHelper('tienePorcentajeFinal', function(index, columna, options) {
	  	var out = "", data;

	  	var naturaleza =  options.data.root.Series[index].naturaleza[0];

	  	if(naturaleza <=2){
	  		out += '<td class="centrado totalPct'+index+'"></td>';
	  	}else{
	  		out += '';
	  	}
	  	
	  return out;
	});

	Handlebars.registerHelper('naturalezaTD', function(index, naturalezaRow, options) {
	  	var out = "", data;
	  	var naturaleza =  options.data.root.Series[index].naturaleza[0];

	  	out += 'data-naturaleza="'+naturaleza+'"';
	  	
	  return out;
	});

	Handlebars.registerHelper('claseTotal', function(formato, classFormat) {
	  	var out = "", data;
	  	
	  	if(formato == 1){
	  		out += 'FormatToMoney';
	  	}else{
	  		out += '';
	  	}
	  return out;
	});

	Handlebars.registerHelper('colspan', function(tipo, serie, naturaleza, col, options) {
	  	var out = "", data;

	  	if(tipo == 1){
	  		var colspan =  options.data.root.Series[serie].naturalezas[naturaleza];

	  		if(colspan == 1){
		  		out += 'colspan="2"';
		  	}else{
		  		out += '';
		  	}
	  	}else{
	  		var colspan =  options.data.root.Series[serie].naturaleza[naturaleza];

	  		if(colspan >= 3){
		  		out += 'colspan="2"';
		  	}else{
		  		out += '';
		  	}
	  	}
	  return out;
	});

	Handlebars.registerHelper('tienePorcentaje', function(tipo,serie, naturaleza, col, options) {
	  	var out = "", data;
	  	var pct = "";

	  	if(tipo == 1){
	  		var naturalezaSerie =  options.data.root.Series[serie].naturalezas[naturaleza];

	  		if(!_.isUndefined(options.data.root.Series[serie].pct)){
		  		if(options.data.root.Series[serie].pct[naturaleza] == '0%'){
		  			pct = '-';
		  		}else{
		  			pct = options.data.root.Series[serie].pct[naturaleza];
		  		}
		  	}

		  	if(naturalezaSerie == ''){
		  		out += '<td class="tIzq" style="width: 80px;"">'+pct+'</td>';
		  	}else{
		  		out += '';
		  	}
	  	}else{
	  		var naturalezaSerie =  options.data.root.Series[serie].naturaleza[naturaleza];

		  	if(naturalezaSerie <=2){
		  		out += '<td class="centrado pct'+serie+' columnaPct'+naturaleza+serie+'"></td>';
		  	}else{
		  		out += '';
		  	}
	  	}

	  return out;
	});

	Handlebars.registerHelper('links', function(tipo, serie, index, link, config,fechainicio, fechafin, anio, valor, options) {
	  	var out = "", data;
	  	var pct = "";
	  	var agrupacion 		= options.data.root.Series[serie].agrupaciones[index];
	  	var formatoClase 	= options.data.root.Series[serie].formatos[index];

	  	if(tipo == 1){
	  		var naturalezaSerie = options.data.root.Series[serie].naturalezas[index];
	  		var paso			= options.data.root.Series[serie].paso[index];

	  		if(formatoClase == 1 && valor > 0){
		  		var formato = 'class="FormatToMoney"';
		  	}else{
		  		var formato = '';
		  	}

		  	if(valor == 0){
		  		var tieneValor = '-';
		  	}else{
		  		var tieneValor = valor;
		  	}

		  	if(naturalezaSerie == ''){
		  		out += '<a '+formato+' href="ReporteConversionCorporativo_detalle.dbsp?reporteConfig='+config+'&fecha_inicio='+fechainicio+'&fecha_fin='+fechafin+'&idagrupacion='+agrupacion+'&paso='+paso+'&anio='+anio+'" rel="'+valor+'">'+tieneValor+'</a>';
		  	}else{
		  		out += '<b><span '+formato+'>'+tieneValor+'</span></b>';
		  	}
	  	}else{
	  		var naturalezaSerie = options.data.root.Series[serie].naturaleza[index];
	  		var paso			= options.data.root.Series[serie].paso;

	  		if(formatoClase == 1 && valor > 0){
		  		var formato = 'class="FormatToMoney"';
		  	}else{
		  		var formato = '';
		  	}

		  	if(valor == 0){
		  		var tieneValor = '-';
		  	}else{
		  		var tieneValor = valor;
		  	}

		  	if(naturalezaSerie <= 2 && tieneValor != '-'){
		  		out += '<a '+formato+' href="ReporteConversionCorporativo_detalle.dbsp?reporteConfig='+config+'&fecha_inicio='+fechainicio+'&fecha_fin='+fechafin+'&idagrupacion='+agrupacion+'&paso='+paso+'&anio='+anio+'" rel="'+valor+'">'+tieneValor+'</a>';
		  	}else{
		  		out += '<span '+formato+'>'+tieneValor+'</span>';
		  	}
	  	}

	  return out;
	});
};

SalesUp.Variables.CargaFechaDeseada = function(_dia){
	var Formato 	= localStorage.SysFormatoFecha;
	Formato = SalesUp.Sistema.StrReplace('yy','yyyy',Formato);
	Formato = SalesUp.Sistema.StrReplace('dd',_dia,Formato);
	Formato = Formato.toUpperCase();
	
	return moment().format(Formato);
};
/** END:Termina funcion CargaConfiguracionesGenerales **/

/** Funcion que carga la espera(SalesUp.Variables.MuestraLoad) **/
SalesUp.Variables.MuestraLoad = function(){
  SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});
};
/** END:termina funcion SalesUp.Variables.MuestraLoad**/

/** Funcion oculta espera(SalesUp.Variables.OcultaLoad) **/
SalesUp.Variables.OcultaLoad = function(){
  SalesUp.Sistema.OcultarOverlay();
  SalesUp.Sistema.OcultaEspera();
};
/** END:Termina funcion SalesUp.Variables.OcultaLoad**/

/** Funcion que crea las opciones de las graficas(SalesUp.Variables.ObtieneOpcionesGrafica) **/
SalesUp.Variables.ObtieneOpcionesGrafica = function(_opcGrafica){
	var plotOptions = {};
    
    if(_opcGrafica.tipoGrafica == 'area'){
		plotOptions = {
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle'
                }
            }
        }
	}else if(_opcGrafica.tipoGrafica == 'bar'){
		plotOptions = {
            series: {
                //stacking: 'normal',
                grouping: false
            }
        }
	}
    
	var opcionesGenerales = {
        credits: {
            enabled: false
        },
        title: {
            text: _opcGrafica.nombre
        },
        subtitle: {
            text: _opcGrafica.subtitulo
        },
        plotOptions: plotOptions
	};
	
	if(_opcGrafica.tipoGrafica == 'bar'){
		var opcionesVariables = {
	        chart: {
	            type: _opcGrafica.tipoGrafica
	        },xAxis: {
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
	        series: _opcGrafica.series
		};
	}else if(_opcGrafica.tipoGrafica == 'funnel'){
		var opcionesVariables = {
	        chart: {
	            type: _opcGrafica.tipoGrafica
	        },tooltip: {
	            pointFormat: 'Total: {point.y}</b>'
	        },
	        series: _opcGrafica.series
		};
	}else if(_opcGrafica.tipoGrafica == 'line'){
		var opcionesVariables = {
	        chart: {
	            zoomType: 'xy'
	        },xAxis: {
	            categories: _opcGrafica.categorias
	        },yAxis: [{ // Primer yAxis
	            title: {
	                text: 'Monto',
	            }
	        }, { // Segundo yAxis
	            title: {
	                text: 'Transacciones'
	            },
	            opposite: true
	        }],
	        tooltip: {
	            shared: false,
	            pointFormat: '{series.name}: <b>{point.y}</b>'
	        },legend: {
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
	        series: _opcGrafica.series
		};
	}
	
	var opciones = $.extend(opcionesGenerales, opcionesVariables);
	
	return opciones;
};
/** END: termina funcion SalesUp.Variables.ObtieneOpcionesGrafica **/

/** Funcion que carga las graficas(SalesUp.Variables.CargaGrafica) **/
SalesUp.Variables.CargaGrafica = function(_args){
	if(!_.isUndefined(SalesUp.Variables.arraySeries[0].name)){
		$('#divGrafica').html('');
		$('#divGraficaEmbudo').html('');

		if(!_.isUndefined(_args.Elemento)){
			$('.textoTema').removeClass('Activo');
			$(_args.Elemento).addClass('Activo');
		}
	    
	    var divGrafica1 = '#divGrafica';	
		
		if(_args.Tipo == 'bar'){
	        var divGrafica2 = '#divGraficaEmbudo';
		}
		
		if(_args.Tipo == 'bar'){
			var nombreGrafica 		= 'Totales';
			var arrayDatosEmbudo	= [];
			var arrayCategoriasBar	= [];
			var arraySeriesBar		= [];

			SalesUp.Variables.arraySeriesLinea = _.reject(SalesUp.Variables.arraySeries, function(j){
				return j.naturaleza[0] >= '3';
			});
			
			if(!_.isUndefined(SalesUp.Variables.arraySeries)){
				for (var i=0; i < SalesUp.Variables.arraySeries.length; i++) {
					var serieActual 	= SalesUp.Variables.arraySeries[i];
					var sumaDatos	= 0;

					if(serieActual.naturaleza[i] <= 2){
						for (var j=0; j < serieActual.data.length; j++) {
							var dataActual 	= serieActual.data[j];
							sumaDatos 		= sumaDatos + dataActual;
						};
						
						arrayDatosEmbudo.push([serieActual.name,sumaDatos]);
						arrayCategoriasBar.push(serieActual.name);
					}
				};
				
				for (var i=0; i < SalesUp.Variables.arrayCategorias.length; i++) {
					var categoriaActual 	= SalesUp.Variables.arrayCategorias[i];
					var sumaCategoria		= 0;
					var arraySumasSeries	= [];
					
					for (var j=0; j < SalesUp.Variables.arraySeries.length; j++) {
						var serieActual 	= SalesUp.Variables.arraySeries[j];
						
						if(serieActual.naturaleza[i] <= 2){
							arraySumasSeries.push(serieActual.data[i]);
						}
					};
					
					arraySeriesBar.push({name : categoriaActual, data : arraySumasSeries});
				};
				
				var serieEmbudo = [{
					name : 'Total de conversiones',
					data : arrayDatosEmbudo
				}];
				
				$(divGrafica1).addClass('w70').removeClass('w100');
				$(divGrafica2).addClass('w30');
				$(divGrafica2).highcharts(SalesUp.Variables.ObtieneOpcionesGrafica({tipoGrafica:'funnel', series:serieEmbudo, nombre:'Totales', subtitulo:''}));
			}
		}else if(_args.Tipo == 'line'){

			SalesUp.Variables.arrayTransacciones = _.reject(SalesUp.Variables.arraySeries, function(j){
				return j.naturaleza[0] != '4';
			});

			SalesUp.Variables.arrayTotalPromedio = _.reject(SalesUp.Variables.arraySeries, function(j){
				return j.naturaleza[0] != '5';
			});

			SalesUp.Variables.arraySeriesLinea = [{
	        		name: 'Transacciones',
	        		type: 'column',
	        		yAxis:1,
	            	//data: SalesUp.Variables.arrayTotalesTransacciones[0].data
	            	data: SalesUp.Variables.arrayTransacciones[0].data
	        },{
	            name: 'Venta promedio',
	            type: 'line',
	            //data: SalesUp.Variables.arrayTotales[0].data2
	            data: SalesUp.Variables.arrayTotalPromedio[0].data
	        },{
	            name: 'Total ventas',
	            type: 'line',
	            data: SalesUp.Variables.arrayTotales[1].data
	        }]
	        
	        $(divGrafica2).removeClass('w30');
			$(divGrafica1).addClass('w100').removeClass('w70');
		}else{
			SalesUp.Variables.arraySeriesLinea = _.reject(SalesUp.Variables.arraySeries, function(j){
				return j.naturaleza[0] >= '3';
			});

			$(divGrafica2).removeClass('w30');
			$(divGrafica1).addClass('w100').removeClass('w70');
		}

		$(divGrafica1).highcharts(SalesUp.Variables.ObtieneOpcionesGrafica({tipoGrafica:_args.Tipo,series:SalesUp.Variables.arraySeriesLinea, categorias:SalesUp.Variables.arrayCategorias, nombre:'Reporte de conversiones', subtitulo:''}));
	}else{
		$('#divGrafica').html('');
		$('#divGraficaEmbudo').html('');
	}
};
/** END: termina la funcion SalesUp.Variables.CargaGrafica **/

SalesUp.Variables.AumentaRgb = function(color){
	color 	= color.replace(/[^0-9,]+/g, "");
    var red = color.split(",")[0];
    var gre = color.split(",")[1];
    var blu = color.split(",")[2];

    red 	= parseInt(red)+40;
    gre 	= parseInt(gre)+40;
    blue 	= parseInt(blu)+40;

    color 	= 'rgb('+red+','+gre+','+blue+')';

    return color;
}

/** función que carga la tabla de los universos con sus datos(SalesUp.Variables.CargaTabla) **/
SalesUp.Variables.CargaTabla = function(){
	$('#headTablaConversion').html('');
    $('#bodyTablaConversion').html('');
    var reporteConfig			= $('#filtrosConversiones').val();
    var fecha_inicio 			= $('#fecha1').val();
	var fecha_fin				= $('#fecha2').val();
	var agruparpor 				= $('#filtrosConversiones option:selected').attr('agruparpor');
	var anio 					= $('#filtroAnio').val();

	if(agruparpor != 1){
		anio = 0;
	}

    var CategoriasTabla = [];

    for (var i = 0; i < SalesUp.Variables.arraySeries.length; i++) {
    	 var _serieActual = SalesUp.Variables.arraySeries[i];
    	 CategoriasTabla.push({categoria:_serieActual.name,naturaleza:_serieActual.naturaleza[0]});
    };

    var SeriesTabla = [];
    for (var h = 0; h < SalesUp.Variables.arrayCategorias.length; h++) {
    	var _categoriaActual 	= SalesUp.Variables.arrayCategorias[h];
    	var _dataActual			= [];

    	SeriesTabla.push({agrupaciones:[],data:[],name:_categoriaActual,paso:[],naturalezas:[],naturalezaOriginal:[],padres:[],formatos:[]});

    	for (var i = 0; i < SalesUp.Variables.arraySeries.length; i++) {
	    	 var _serieActual 	= SalesUp.Variables.arraySeries[i];
	    	 var _pasoActual	= _serieActual.paso;

	    	 SeriesTabla[h].paso.push(_pasoActual);
	    	 SeriesTabla[h].total 			= SalesUp.Variables.arrayTotales[1].data[h];
	    	 SeriesTabla[h].transacciones 	= SalesUp.Variables.arrayTotalesTransacciones[0].data[h];

	    	 for (var j = 0; j < _serieActual.data.length; j++) {
	    	 	var _datoActual 		= _serieActual.data[j];
	    	 	var _naturalezaActual	= _serieActual.naturaleza[j];
	    	 	var _padreActual		= _serieActual.padre[j];
	    	 	var _agrupacionActual	= _serieActual.agrupaciones[j];
	    	 	var _formatoActual		= _serieActual.formatos[j];
	    	 	
	    	 	if(j==h){
	    	 		SeriesTabla[h].data.push(_datoActual);
	    	 		SeriesTabla[h].agrupaciones.push(_agrupacionActual);

	    	 		if(_naturalezaActual <= 2){
	    	 			_naturalezaActual = '';
	    	 		}else{
	    	 			_naturalezaActual = 1;
	    	 		}
	    	 		
	    	 		SeriesTabla[h].naturalezaOriginal.push(_serieActual.naturaleza[j]);
	    	 		SeriesTabla[h].naturalezas.push(_naturalezaActual);
	    	 		SeriesTabla[h].padres.push(_padreActual);
	    	 		SeriesTabla[h].formatos.push(_formatoActual);
	    	 	}
	    	 };
	    };
    };

    var arrayTotales = [];

    for (var i = 0; i < CategoriasTabla.length; i++) {
	    	var sumDatosUniversos 		= 0;
	    	var contAux				= 0;
	
	    	for (var j = 0; j < SeriesTabla.length; j++) {
	    		sumDatosUniversos 		= sumDatosUniversos + SeriesTabla[j].data[i];
	    		var naturaleza 		= SeriesTabla[j].naturalezaOriginal[i];
	    		
	    		if(SeriesTabla[j].data[i] > 0){
	    			contAux++;
	    		}
	    		
	    		if(j == SeriesTabla.length-1 && naturaleza == 5){
	    			if(contAux > 0){
	    				sumDatosUniversos = sumDatosUniversos/contAux;
	    			}
	    		}
	    	};
	    	
	    	if(SeriesTabla[0].naturalezas[i] == ''){
	    		var tienePct = 1;
	    	}else{
	    		var tienePct = '';
	    	}
	    	arrayTotales.push({total:sumDatosUniversos,padre:SeriesTabla[0].padres[i],formatos:SeriesTabla[0].formatos[i],naturaleza:SeriesTabla[0].naturalezas[i],tienePct:tienePct});
    };

    var sumDatosTotales 			= 0;
    var sumDatosTransacciones	= 0;

    var arrayPorcentajes 	= [];

    for (var i = 0; i < SeriesTabla.length; i++) {
    	var _serieActual 		= SeriesTabla[i].data;
    	var _naturalezaActual	= SeriesTabla[i].naturalezas;
    	var _padreActual		= SeriesTabla[i].padres;
    	SeriesTabla[i].pct 		= [];
		sumDatosTotales 		= sumDatosTotales + SeriesTabla[i].total;
		sumDatosTransacciones	= sumDatosTransacciones + SeriesTabla[i].transacciones;
		var pctActual			= 0;

		for (var j = 0; j < _serieActual.length; j++) {
			var padreSerie 		= _padreActual[j];
			var naturalezaSerie	= _naturalezaActual[j];
			
			if(padreSerie == 0){
				pctActual = 1;
			}else{
				pctActual = (_serieActual[j] > 0) ? _serieActual[j]/_serieActual[padreSerie-1] : 0;
			}

			SeriesTabla[i].pct.push(SalesUp.Sistema.FormatoPorcentaje(pctActual));
		};

		var ventaPromedio 				= (SeriesTabla[i].total > 0) ? SeriesTabla[i].total/SeriesTabla[i].transacciones : 0;
		SeriesTabla[i].ventaPromedio 	= ventaPromedio;
	};

	var arrayPctTotales = [];
	
	for (var i = 0; i < arrayTotales.length; i++) {
		var pctTotalActual 	= 0;

		if(arrayTotales[i].padre == 0){
			pctTotalActual = 1;
		}else{
			pctTotalActual = (arrayTotales[i].total > 0) ? arrayTotales[i].total/arrayTotales[arrayTotales[i].padre - 1].total : 0;
		}

		arrayTotales[i].pct = SalesUp.Sistema.FormatoPorcentaje(pctTotalActual);
	};

	var ventaPromedioTotal = (sumDatosTotales > 0) ? sumDatosTotales/sumDatosTransacciones : 0;

	var IdVentana 				= 20;
    var ConversionesTheadColumas= 'ConversionesTheadColumas';
    var ConversionesFilasCatego	= 'ConversionesFilasCatego';
    
    var TemplateColumnas 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateReporteConversionesCorporativo.dbsp', Parametros:'vista=1&thead=1&IdVentana='+IdVentana, Div:0, Almacen: ConversionesTheadColumas });
    var JsonColumnas			= {Categorias:CategoriasTabla};
    var htmlColumnas			= SalesUp.Construye.ReemplazaDatos({Template:TemplateColumnas,Datos:JsonColumnas});
    var TemplateNombreFilas 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateReporteConversionesCorporativo.dbsp', Parametros:'vista=1&thead=0&IdVentana='+IdVentana, Div:0, Almacen: ConversionesFilasCatego });
    var JsonNombreFilas		= {Series:SeriesTabla,Totales:arrayTotales,ReporteConfig:reporteConfig,fecha_inicio:fecha_inicio,fecha_fin:fecha_fin,anio:anio};
    var htmlNombreFilas		= SalesUp.Construye.ReemplazaDatos({Template:TemplateNombreFilas,Datos:JsonNombreFilas});

    if(!_.isUndefined(SalesUp.Variables.arrayCategoriasJson[0].categoria)){
    		$('#headTablaConversion').html(htmlColumnas);
	    $('#bodyTablaConversion').html(htmlNombreFilas);

	     SalesUp.Sistema.IniciaPlugins();
    }else{
	    	$('#headTablaConversion').html('');
	    	$('#bodyTablaConversion').html('');
    }

    $('.nombreTabla').html(SalesUp.Variables.Agrupacion);

    SalesUp.Variables.OcultaLoad();
};
/** END:Termina función SalesUp.Variables.CargaTabla **/

SalesUp.Variables.CargaTablaInvertida = function(){
	$('#headTablaConversion').html('');
    $('#bodyTablaConversion').html('');
    var reporteConfig			= $('#filtrosConversiones').val();
    var fecha_inicio 			= $('#fecha1').val();
	var fecha_fin				= $('#fecha2').val();
	var agruparpor 				= $('#filtrosConversiones option:selected').attr('agruparpor');
	var anio 					= $('#filtroAnio').val();

	if(agruparpor != 1){
		anio = 0;
	}

	var IdVentana 				= 20;
    var ConversionesTheadColumas= 'ConversionesTheadColumasVista2';
    var ConversionesFilasCatego	= 'ConversionesFilasCategoVista2';
    
    var TemplateColumnas 		= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateReporteConversionesCorporativo.dbsp', Parametros:'vista=2&thead=1&IdVentana='+IdVentana, Div:0, Almacen: ConversionesTheadColumas });
    var JsonColumnas			= {Categorias:SalesUp.Variables.arrayCategoriasJson};
    var htmlColumnas			= SalesUp.Construye.ReemplazaDatos({Template:TemplateColumnas,Datos:JsonColumnas});
    
    var TemplateNombreFilas 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateReporteConversionesCorporativo.dbsp', Parametros:'vista=2&thead=0&IdVentana='+IdVentana, Div:0, Almacen: ConversionesFilasCatego });
    var JsonNombreFilas			= {Series:SalesUp.Variables.arraySeries,ReporteConfig:reporteConfig,fecha_inicio:fecha_inicio,fecha_fin:fecha_fin,anio:anio};
    var htmlNombreFilas			= SalesUp.Construye.ReemplazaDatos({Template:TemplateNombreFilas,Datos:JsonNombreFilas});

    if(!_.isUndefined(SalesUp.Variables.arrayCategoriasJson[0].categoria)){
    	$('#headTablaConversion').html(htmlColumnas);
	    $('#bodyTablaConversion').html(htmlNombreFilas);
	    
	    var $total = $('.total');
	    
	    for (var i=0; i < $total.length; i++) {
	      	var filaActual 	= i;
	    		var sumaFila	= 0;
	    		var contAux = 0;
	    		
	    		var $sumFila = $('.sumFila' + filaActual);
	    		var naturaleza = $('.totalFila' + filaActual).attr('data-naturaleza');
	    		
	    		for (var j=0; j < $sumFila.length; j++) {
				var valorActual	= parseInt($($sumFila[j]).attr('rel'));
    				sumaFila		= sumaFila + valorActual;
    				
    				if(valorActual > 0){
		    			contAux++;
		    		}
		    		
		    		if(j == $sumFila.length-1 && naturaleza == 5){
		    			if(contAux > 0){
		    				sumaFila = sumaFila/contAux;
		    			}
		    		}
			};

			if(naturaleza == 3 || naturaleza == 5){
				$('.totalFila' + filaActual).html('<span class="FormatToMoney">'+sumaFila+'</span>');
			}else{
				$('.totalFila' + filaActual).html(sumaFila);
			}
	    };
	    
	    var $columnas = $('.columnas');
	    
	    for (var i=0; i < $columnas.length; i++) {
	    		var columnaActual 		= i;
	    		var valorColumnaTotal	= parseInt($('.columnaFila' + columnaActual + 0).attr('rel'));
	    		
	    		var $filas = $('.columnaTotal' + columnaActual);
	    		
	    		for (var j=0; j < $filas.length; j++) {
				  var filaActual 		= j;
				  var pctColumna		= 0;
				  var valorFilaActual	= parseInt($('.columnaFila' + columnaActual + filaActual).attr('rel'));

				  if(parseInt(valorColumnaTotal) > 0){
				  	pctColumna 	= parseInt(valorFilaActual)/parseInt(valorColumnaTotal);
				  }else{
				  	pctColumna 	= 0;
				  }

				  if(pctColumna > 0){
				  	$('.columnaPct' + columnaActual + filaActual).html(SalesUp.Sistema.FormatoPorcentaje(pctColumna));
				  }else{
				  	$('.columnaPct' + columnaActual + filaActual).html('-');
				  }
			};
	    };
	    
	    var $totales 		= $('.total');
	    var valorTotalRef	= parseInt($('.totalFila'+ 0).html());
	    
	    for (var i=0; i < $totales.length; i++) {
	    		var totalActual 	= i;
	    		var valorTotalActual= parseInt($('.totalFila' + totalActual).html());

	    		if(parseInt(valorTotalActual) > 0){
				  	var pctTotalActual	= valorTotalActual/valorTotalRef;
				}else{
				  	var pctTotalActual 	= 0;
				}
	    		
	    		$('.totalPct' + totalActual).html(SalesUp.Sistema.FormatoPorcentaje(pctTotalActual));
	    };
    }else{
    	$('#headTablaConversion').html('');
    	$('#bodyTablaConversion').html('');
    }

    SalesUp.Sistema.IniciaPlugins();
    SalesUp.Variables.OcultaLoad();
};

/** Función que carga la tabla de totales y sus datos(SalesUp.Variables.CargaTotales) **/
SalesUp.Variables.CargaTotales = function(){
	SalesUp.Variables.arrayTotales[0].data2 = [];
	var IdVentana 				= 20;
    var ConversionesFilasCatego	= 'ConversionesFilasCategoTotalesVista2';
	var TemplateNombreFilas 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateReporteConversionesCorporativo.dbsp', Parametros:'vista=2&thead=2&IdVentana='+IdVentana, Div:0, Almacen: ConversionesFilasCatego });
    var JsonNombreFilas			= {TotalesTransacciones:SalesUp.Variables.arrayTotalesTransacciones,Totales:SalesUp.Variables.arrayTotales};
    var htmlNombreFilas			= SalesUp.Construye.ReemplazaDatos({Template:TemplateNombreFilas,Datos:JsonNombreFilas});

    if(!_.isNaN(JsonNombreFilas.TotalesTransacciones[0].data[0])){
    	$('#bodyTablaConversion').append(htmlNombreFilas);

    	var $totalesVentas = $('.Totales');
		var $columnaActual = $('.columnas');

		for (var j = 0; j < $columnaActual.length; j++) {
			var columnaActual = j;

			var totalVenta = parseInt($('.total0' + columnaActual).html()) / parseInt($('.totalTransaccion1' + columnaActual).html());
			
			$('.sumFilaTotales0' + columnaActual).html(_.isNaN(totalVenta) ? '-' : totalVenta);

			if($('.sumFilaTotales0' + columnaActual).html() == '-'){
				$('.sumFilaTotales0' + columnaActual).removeClass('FormatToMoney');
			}else{
				$('.sumFilaTotales0' + columnaActual).addClass('FormatToMoney');
			}

			SalesUp.Variables.arrayTotales[0].data2.push(_.isNaN(totalVenta) ? 0 : totalVenta);
		};

	    var $total	= $('.totalTotales');
	    var sumaFila= 0;
	    
	    for (var i=0; i < $total.length; i++) {
      		var filaActual 	= i;
      		var valorHtml 	= $('.total0' + filaActual).html();
    		var valorActual	= parseFloat((valorHtml == '-') ? 0 : valorHtml);
    		sumaFila		= sumaFila + valorActual;
	    };

	    $('.totalFilaTotales1').html(sumaFila);

	    var $total	= $('.sumFilaTotalesT');
	    var sumaFila= 0;
	    
	    for (var i=0; i < $total.length; i++) {
      		var filaActual 	= i;
      		var valorHtml 	= $('.totalTransaccion1' + filaActual).html();
    		var valorActual	= parseInt((valorHtml == '-') ? 0 : valorHtml);
    		sumaFila		= sumaFila + valorActual;
	    };

	    $('.totalTotalesT').html(sumaFila);

	    var totalVentaPromedio = parseFloat($('.totalFilaTotales1').html())/parseInt($('.totalTotalesT').html());
	    $('.totalFilaTotales0').html(_.isNaN(totalVentaPromedio) ? 0 : totalVentaPromedio);

	    SalesUp.Sistema.IniciaPlugins();
    }else{
    	$('#bodyTablaConversionTotales').html('');
    }

    SalesUp.Variables.OcultaLoad();
};
/** END:Termina función SalesUp.Variables.CargaTotales **/

/** Función que obtiene los datos necesarios para las graficas y las tablas y arma sus respectivos jsons(SalesUp.Variables.ObtieneDatosReporte)**/
SalesUp.Variables.ObtieneDatosReporte = function(_rango){
	var reporteConfig	= $('#filtrosConversiones').val();
	var fecha_inicio	= _rango.fechaInicio;
	var fecha_fin		= _rango.fechaFin;
	var anio 			= _rango.anio;

	SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryGuardaFiltroConversiones.dbsp', Parametros:'idreporte=1&reporteConfig='+reporteConfig+'&fechaInicio='+fecha_inicio+'&fechafin='+fecha_fin+'&anio='+anio,Div:0 });
	
	SalesUp.Variables.arraySeries 				= [];
	SalesUp.Variables.arrayCategorias			= [];
	SalesUp.Variables.arrayCategoriasJson		= [];
	SalesUp.Variables.arrayTotales				= [{"name":"Venta promedio","data":[]},{"name":"Total ventas","data":[]}];
	SalesUp.Variables.arrayTotalesTransacciones	= [{"name":"# Transacciones","data":[]}]

	var jsonDatosReporte = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonConversionesCorporativo.dbsp', Parametros:'tipoDatos=1&anio='+anio+'&reporteConfig=' + reporteConfig + '&fecha_inicio=' + fecha_inicio + '&fecha_fin=' + fecha_fin, DataType:'json', Div:0 });

	if(jsonDatosReporte.jsonDatos[0].EXISTE == 0){
		$('.alerta-mensaje').show();
	}else{
		$('.alerta-mensaje').hide();
	}

	var serieAnterior	= '';
	var sumTotalSeries  = 0;

	for (var i = 0; i < jsonDatosReporte.jsonDatos.length; i++) {
		var registroActual = jsonDatosReporte.jsonDatos[i];

		if(serieAnterior != registroActual.NAME){
			SalesUp.Variables.arraySeries[sumTotalSeries] = {name:registroActual.NAME,data:[registroActual.DATA],paso:registroActual.PASO,agrupaciones:[registroActual.IDAGRUPACION],naturaleza:[registroActual.NATURALEZA],padre:[registroActual.PADRE],formatos:[registroActual.FORMAT]};
			sumTotalSeries++;
		}else{
			SalesUp.Variables.arraySeries[sumTotalSeries-1].data.push(registroActual.DATA);
			SalesUp.Variables.arraySeries[sumTotalSeries-1].agrupaciones.push(registroActual.IDAGRUPACION);
			SalesUp.Variables.arraySeries[sumTotalSeries-1].naturaleza.push(registroActual.NATURALEZA);
			SalesUp.Variables.arraySeries[sumTotalSeries-1].padre.push(registroActual.PADRE);
			SalesUp.Variables.arraySeries[sumTotalSeries-1].formatos.push(registroActual.FORMAT);
		}

		serieAnterior = registroActual.NAME;
	};

	for (var i = 0; i < SalesUp.Variables.arraySeries.length; i++) {
		var seriesFor = SalesUp.Variables.arraySeries[i].data;

		for (var j = 0; j < seriesFor.length; j++) {
			seriesFor[j] = parseInt(seriesFor[j]);
		};
	};

	var jsonCategorias 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonConversionesCorporativo.dbsp', Parametros:'tipoDatos=0&anio='+anio+'&reporteConfig=' + reporteConfig + '&fecha_inicio=' + fecha_inicio + '&fecha_fin=' + fecha_fin, DataType:'json', Div:0 });

	for (var i = 0; i < jsonCategorias.jsonDatos.length; i++) {
		var registroActual = jsonCategorias.jsonDatos[i];

		SalesUp.Variables.arrayCategorias.push(registroActual.CATEGORIAS);
		SalesUp.Variables.arrayCategoriasJson.push({"categoria":registroActual.CATEGORIAS});
	};

	var jsonTotales 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonConversionesCorporativo.dbsp', Parametros:'tipoDatos=2&anio='+anio+'&reporteConfig=' + reporteConfig + '&fecha_inicio=' + fecha_inicio + '&fecha_fin=' + fecha_fin, DataType:'json', Div:0 });

	for (var i = 0; i < jsonTotales.jsonDatos.length; i++) {
		var registroActual = jsonTotales.jsonDatos[i];

		SalesUp.Variables.arrayTotales[0].data.push(parseInt(registroActual.Venta_promedio));
		SalesUp.Variables.arrayTotales[1].data.push(parseInt(registroActual.Total_ventas));
		SalesUp.Variables.arrayTotalesTransacciones[0].data.push(parseInt(registroActual.Transacciones));
	};

};
/** END:Termina función SalesUp.Variables.ObtieneDatosReporte **/

SalesUp.Variables.LlenaSelects = function(){
	var $selectFiltroConversiones	= $('#filtrosConversiones');
	var anioActual					= (new Date).getFullYear();

	$('#filtroAnio').html('');
	$($selectFiltroConversiones).html('');
	
	for (var i = 0; i < 5; i++) {
		var anioValor = anioActual-i;
		
		$('#filtroAnio').append('<option value="'+anioValor+'">'+anioValor+'</option>');
	};

	SalesUp.Variables.jsonConfiguracionesReportes = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonConfiguracionesReportesCorporativo.dbsp', DataType:'json', Div:0 });

	for (var i = 0; i < SalesUp.Variables.jsonConfiguracionesReportes.jsonDatos.length; i++) {
		var configuracionActual = SalesUp.Variables.jsonConfiguracionesReportes.jsonDatos[i];

		$selectFiltroConversiones.append('<option value="'+configuracionActual.IDREPORTECONFIG+'" agruparpor="'+configuracionActual.AGRUPARPOR+'" data-agrupacion="'+configuracionActual.AGRUPACION+'" desistema="'+configuracionActual.DESISTEMA+'">'+configuracionActual.NOMBRE+'</option>');
	};

	$selectFiltroConversiones.append('<optgroup label="---"></optgroup>');
	$selectFiltroConversiones.append('<option value="-1">(Crear variante de reporte)</option>');
};

/** Funcion que duplica la configuracion **/
SalesUp.Variables.DuplicarConfiguracion = function(){
	$('#txtNombreConfiguracion').show();
	$('.txtNombreConfiguracion').focus();
};

SalesUp.Variables.CancelarDuplicar = function(){
	$('#txtNombreConfiguracion').hide();
	$('.txtNombreConfiguracion').val('');
};
/** END:Termina la función SalesUp.Variables.DuplicarConfiguracion();**/

/** Función que carga los filtros del reporte y ejecuta el llamado a las demas funciones para armar la pantalla(SalesUp.Variables.CargaFiltros) **/
SalesUp.Variables.ClickFiltro = function(){
	SalesUp.Variables.MuestraLoad();
	var $selectFiltroConversiones	= $('#filtrosConversiones');

	var graficaActual = $('.Activo').attr('grafica');

	setTimeout(function(){
		var agruparpor = $('#filtrosConversiones option:selected').attr('agruparpor');
		
		if($selectFiltroConversiones.val() == ''){
			SalesUp.Variables.OcultaLoad();
			SalesUp.Variables.MuestraAlertas('Favor de introducir la configuración el reporte.');
		}else{
			if(agruparpor == 1){
				var anioSeleccionado= $('#filtroAnio').val();

				if(anioSeleccionado != ''){
					var fecha_inicio= '';
					var fecha_fin	= '';

					SalesUp.Variables.ObtieneDatosReporte({fechaInicio:fecha_inicio,fechaFin:fecha_fin,anio:anioSeleccionado});
					SalesUp.Variables.CargaTabla();
					//SalesUp.Variables.CargaTotales();
					SalesUp.Variables.CargaGrafica({Tipo:graficaActual});
					SalesUp.Variables.OcultaLoad();
				}else{
					SalesUp.Variables.OcultaLoad();
					SalesUp.Variables.MuestraAlertas('Favor de introducir el año.');
				}
			}else{
				var fecha_inicio= $('#fecha1').val();
				var fecha_fin	= $('#fecha2').val();

				if(fecha_inicio != '' && fecha_fin != ''){
					SalesUp.Variables.ObtieneDatosReporte({fechaInicio:fecha_inicio,fechaFin:fecha_fin,anio:0});
					SalesUp.Variables.CargaTabla();
					//SalesUp.Variables.CargaTotales();
					SalesUp.Variables.CargaGrafica({Tipo:graficaActual});
					SalesUp.Variables.OcultaLoad();
				}else{
					SalesUp.Variables.OcultaLoad();
					SalesUp.Variables.MuestraAlertas('Debe introducir un rango de fechas.');
				}
			}
		}
	},200);
};

SalesUp.Variables.CambiaFiltroConversiones = function(_obj){
	SalesUp.Variables.CancelarDuplicar();
	var $elementoSeleccionado	= $(_obj.elemento);
	var agruparpor 				= $elementoSeleccionado.find('option:selected').attr('agruparpor');//$('#filtrosConversiones option:selected').attr('agruparpor');
	SalesUp.Variables.Agrupacion= $elementoSeleccionado.find('option:selected').attr('data-agrupacion');//$('#filtrosConversiones option:selected').attr('agruparpor');
	var deSistema 				= $('#filtrosConversiones option:selected').attr('desistema');

	if($elementoSeleccionado.val() == -1){
		SalesUp.Variables.AbreEditarNuevo(0);
		$elementoSeleccionado.val(SalesUp.Variables.reporteAnterior);
	}else{
		if(deSistema == 0){
			$('#editarConfiguracionBtn').show();
		}else{
			$('#editarConfiguracionBtn').hide();

		}
		
		if(agruparpor == 0){
			$('.filtroAnio').hide();
			$('.filtroFechas').hide();
		}else if(agruparpor == 1){
			$('.filtroAnio').show();
			$('.filtroFechas').hide();
		}else if(agruparpor != 1){
			$('.filtroAnio').hide();
			$('.filtroFechas').show();

			if($('#fecha1').val() == ''){
				$('#fecha1').val(SalesUp.Variables.CargaFechaDeseada('01'));
			}

			if($('#fecha2').val() == ''){
				var date = new Date();
				var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
				$('#fecha2').val(SalesUp.Variables.CargaFechaDeseada(ultimoDia.getDate()));
			}
		}

		SalesUp.Variables.reporteAnterior = $elementoSeleccionado.val();
		SalesUp.Variables.ClickFiltro();
	}
};

SalesUp.Variables.CargaFiltros = function(){
	var $selectFiltroConversiones	= $('#filtrosConversiones');
	var anioActual					= (new Date).getFullYear();

	SalesUp.Variables.LlenaSelects();

	/*$selectFiltroConversiones.change(function(){
		SalesUp.Variables.CancelarDuplicar();
		var elementoSeleccionado	= $(this);
		var agruparpor 				= $('#filtrosConversiones option:selected').attr('agruparpor');
		var deSistema 				= $('#filtrosConversiones option:selected').attr('desistema');

		if(elementoSeleccionado.val() == -1){
			console.log('creare nuevo reporte');
			elementoSeleccionado.val(SalesUp.Variables.reporteAnterior);
		}else{
			if(deSistema == 0){
				$('#editarConfiguracionBtn').show();
			}else{
				$('#editarConfiguracionBtn').hide();

			}
			
			if(agruparpor == 0){
				$('.filtroAnio').hide();
				$('.filtroFechas').hide();
			}else if(agruparpor == 1){
				$('.filtroAnio').show();
				$('.filtroFechas').hide();
			}else if(agruparpor != 1){
				$('.filtroAnio').hide();
				$('.filtroFechas').show();

				if($('#fecha1').val() == ''){
					$('#fecha1').val(SalesUp.Variables.CargaFechaDeseada('01'));
				}

				if($('#fecha2').val() == ''){
					var date = new Date();
					var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
					$('#fecha2').val(SalesUp.Variables.CargaFechaDeseada(ultimoDia.getDate()));
				}
			}

			SalesUp.Variables.reporteAnterior = elementoSeleccionado.val();
		}
	});*/

	var vistaClasica = true;
	SalesUp.Variables.CambiaVista = function(){
		SalesUp.Variables.MuestraLoad();

		setTimeout(function(){
			$('#headTablaConversion').html('');
	    	$('#bodyTablaConversion').html('');

	    	if(!vistaClasica){
	    		SalesUp.Variables.CargaTabla();
	    		vistaClasica = true;
	    	}else{
	    		SalesUp.Variables.CargaTablaInvertida();
	    		//SalesUp.Variables.CargaTotales();
	    		vistaClasica = false;
	    	}
		},100);
	};

	var jsonCargaFiltros = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonFiltrosConversiones.dbsp?idreporte=1', DataType:'json', Div:0 });

	if($.isEmptyObject(jsonCargaFiltros)){
		$("#filtrosConversiones").val(SalesUp.Variables.jsonConfiguracionesReportes.jsonDatos[0].IDREPORTECONFIG);
		SalesUp.Variables.reporteAnterior = SalesUp.Variables.jsonConfiguracionesReportes.jsonDatos[0].IDREPORTECONFIG;
		$("#filtrosConversiones").change();

		$("#filtroAnio").val(anioActual);
		
		SalesUp.Variables.MuestraLoad();
		
		/*setTimeout(function(){
			SalesUp.Variables.ClickFiltro();
		},200);*/
	}else{
		var jsonGuardadoFiltro = JSON.parse(jsonCargaFiltros.SQLTXT);

		$("#filtrosConversiones").val(jsonGuardadoFiltro.REPORTECONFIG);
		SalesUp.Variables.reporteAnterior = jsonGuardadoFiltro.REPORTECONFIG;
		$("#filtrosConversiones").change();

		if(jsonGuardadoFiltro.ANIO == 0){
			$('#fecha1').val(jsonGuardadoFiltro.FECHA_INICIO);
			$('#fecha2').val(jsonGuardadoFiltro.FECHA_FIN);
			
			SalesUp.Variables.MuestraLoad();
			
			/*setTimeout(function(){
				SalesUp.Variables.ClickFiltro();
			},200);*/
		}else{
			$("#filtroAnio").val(jsonGuardadoFiltro.ANIO);
			
			SalesUp.Variables.MuestraLoad();
			
			setTimeout(function(){
				SalesUp.Variables.ClickFiltro();
			},200);
		}
	}
};
/** END:Termina la función SalesUp.Variables.CargaFiltros **/

SalesUp.Variables.GuardaDuplicar = function(){
	if($('.txtNombreConfiguracion').val() == ''){
		SalesUp.Variables.MuestraAlertas('Ingresar el nombre de la configuración.');
		setTimeout(function(){$('.txtNombreConfiguracion').focus();},100);
	}else{
		var nombreReporte 	= escape($('.txtNombreConfiguracion').val());
		var idreporteConfig	= $('#filtrosConversiones').val();

		var JsonConfigGuardada = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryGuardaConfiguracion.dbsp', Parametros:'nombrereporte='+nombreReporte+'&idreporteConfig='+idreporteConfig, DataType:'json', Div:0 });
		
		if(JsonConfigGuardada.jsonDatos[0].IDREPORTECONFIG > 0){
			SalesUp.Variables.CargaReporteDafult(JsonConfigGuardada.jsonDatos[0].IDREPORTECONFIG);
		}else{
			SalesUp.Variables.MuestraAlertas('Ha ocurrido un error, favor de volver a intentarlo.');
		}
	}
};

/** Función que abre el editar o crear una nueva configuracion(SalesUp.Variables.AbreEditarNuevo) **/
SalesUp.Variables.AbreEditarNuevo = function(_editar){
	var deSistema 				= $('#filtrosConversiones option:selected').attr('desistema');
	var idConfiguracionReporte	= 0;
	var tituloVentana			= 'Nueva variante de reporte';	

	//if(deSistema == 0){
	if(_editar == 1){
		idConfiguracionReporte 	= $('#filtrosConversiones').val();
		tituloVentana			= 'Editar variante de reporte';
	}

	SalesUp.Sistema.AbrePopUp({Titulo: tituloVentana, Pagina: '/privado/PopUpReporteConfiguracionCorporativo.dbsp', Parametros:'idConfiguracion='+idConfiguracionReporte, Modal:true, ModalAlt:true, Alto:450, Ancho:650});
};
/** END:Termina la función SalesUp.Variables.AbreEditarNuevo **/

SalesUp.Variables.CargaReporteDafult = function(_idConfiguracion){
	var anioSeleccionadoFiltros = $('#filtroAnio').val();
	
	SalesUp.Variables.LlenaSelects();
	$('#filtroAnio').val(anioSeleccionadoFiltros);

	var primerReporte = $($("#filtrosConversiones option")[0]).val();
	
	if(!_.isUndefined(_idConfiguracion)){
		primerReporte = _idConfiguracion;
	}
	
	$('#filtrosConversiones').val(primerReporte);
	$('#filtrosConversiones').change();

	SalesUp.Variables.reporteAnterior = primerReporte;
	
	SalesUp.Variables.ClickFiltro();
};

/** Primera función que se ejecuta al cargar la pagina **/
$(function(){
	SalesUp.Sistema.BorrarTodoAlmacen();
	SalesUp.Variables.CargaFuncionesGenerales();
	SalesUp.Variables.MuestraLoad();
	SalesUp.Sistema.DatePickerInicioFin({D:'fecha1', H:'fecha2'});
	SalesUp.Variables.CargaFiltros();
}); /* /fin ready */





