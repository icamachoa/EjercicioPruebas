Handlebars.registerHelper('MontoFormat', function(simbolo,monto,montoSalida) {
  	var out = 0;
  	out 	= (monto == 0) ? '' : SalesUp.Sistema.moneda({moneda:simbolo, numero:monto});
  return out;
});

Handlebars.registerHelper('td', function(index,reporte,celda) {
  	var out = '';
  	
  	
  	if(index == 0){
  		out = '<td colspan="2"></td>';
  	}else{
  		if(reporte == 1){
  			out = '<td>Cobradas</td><td>Realizadas</td>';
  		}else{
  			out = '<td>Recompra</td><td>Nuevas</td>';
  		}
  	}
  	
  	return out;
});

function meses(parseo){
	var valor =   SalesUp.Sistema.MonedaANumero(parseo);
	return valor;
}

Highcharts.visualize = function(options) {
		// the categories
		options.xAxis.categories = [];
		$('thead td.grafica').each( function(i) {
			options.xAxis.categories.push(this.innerHTML);
		});
		
		// the data series
		var datoSerie  = "";
		options.series = [];
		
		$('.titulo').each( function(j) {
			var arrayValores	= [];
			var valor 			= $(this).attr('id');
			
			arrayValores.push({y:meses($('.enero_'+valor).attr('data-enero')),url:$('.enero_'+valor+' a').attr('href')});
			arrayValores.push({y:meses($('.febrero_'+valor).attr('data-febrero')),url:$('.febrero_'+valor+' a').attr('href')});
			arrayValores.push({y:meses($('.marzo_'+valor).attr('data-marzo')),url:$('.marzo_'+valor+' a').attr('href')});
			arrayValores.push({y:meses($('.abril_'+valor).attr('data-abril')),url:$('.abril_'+valor+' a').attr('href')});
			arrayValores.push({y:meses($('.mayo_'+valor).attr('data-mayo')),url:$('.mayo_'+valor+' a').attr('href')});
			arrayValores.push({y:meses($('.junio_'+valor).attr('data-junio')),url:$('.junio_'+valor+' a').attr('href')});
			arrayValores.push({y:meses($('.julio_'+valor).attr('data-julio')),url:$('.julio_'+valor+' a').attr('href')});
			arrayValores.push({y:meses($('.agosto_'+valor).attr('data-agosto')),url:$('.agosto_'+valor+' a').attr('href')});
			arrayValores.push({y:meses($('.septiembre_'+valor).attr('data-septiembre')),url:$('.septiembre_'+valor+' a').attr('href')});
			arrayValores.push({y:meses($('.octubre_'+valor).attr('data-octubre')),url:$('.octubre_'+valor+' a').attr('href')});
			arrayValores.push({y:meses($('.noviembre_'+valor).attr('data-noviembre')),url:$('.noviembre_'+valor+' a').attr('href')});
			arrayValores.push({y:meses($('.diciembre_'+valor).attr('data-diciembre')),url:$('.diciembre_'+valor+' a').attr('href')});

			datoSerie = $(this).val();

			options.series[j] = { 
				name: datoSerie,
				data: arrayValores
			};
		});
        
		var chart = new Highcharts.Chart(options);
}

function cargaGrafica(){
	$('#contento').html('');

	options={	
		chart: {
			renderTo: 'contento',
			defaultSeriesType: 'line',
    		backgroundColor:'rgba(255, 255, 255, 0.8)'
		},
		title: {
			text: 'Ventas',
			
		},
		subtitle: {
		},
		xAxis: {
		},
		yAxis: {
			title: {
				text: 'Monto'
			},
		},
		tooltip: {
			shared: false,
            formatter: function() {				
				var simbolo=$('#moneda option:selected').data('simbolo');

				return '<b>'+ this.series.name +'</b>: '+ SalesUp.Sistema.moneda({moneda:simbolo, numero:this.point.y})+'<br> <b style="font-size:10px;"> Clic para ver detalle</b>';
			}
		},
		plotOptions: {
			column: {
				pointPadding: 0.06,
				borderWidth: 0
			},
			series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            location.href = this.options.url;
                        }
                    }
                }
            }
		},
		labels: {
                formatter: function() {
                    return SalesUp.Sistema.FormatoMoneda(this.value);
                },
                plotLines: [{
	              value: 0,
	              width: 1,
	              color: '#808080'
	            }]
        },	
	};
	Highcharts.visualize(options);
}

function CargaGraficaPie(_DatosPie){
	$('#contento').html('');

	chart = new Highcharts.Chart({
		chart: {
			renderTo: 'contento',
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			backgroundColor:'rgba(255, 255, 255, 0.8)'
		},
		title: {
	        text: 'Porcentaje de ventas'
	    },
	        subtitle: {
	        text: 'Ventas',
	    
	    },
	    plotOptions: {
	        series: {
	            cursor: 'pointer',
	            point: {
	                events: {
	                    click: function() {
	                        location.href = this.options.url;
	                    }
	                }
	            }
	        }
	    },			          
	    tooltip: {
		    shared: false,
			formatter: function() {
				var simbolo=$('#moneda option:selected').data('simbolo');
				return '<b>'+ this.point.name +'</b><br /><b>'+ SalesUp.Sistema.moneda({moneda:simbolo, numero:this.point.y})+'</b>'+'<br> <b style="font-size:10px;"> Clic para ver detalle</b>';//SalesUp.Sistema.SimboloPorcentaje({Numero:this.point.percentage});
			}

	    },			        
	    plotOptions: {
	        pie: {
	            allowPointSelect: true,
	            cursor: 'pointer',
	            dataLabels: {
	                enabled: false
	            },
	            events:{
	              click: function (event, i) {
	                     location.href = event.point.url;			                  }
	          },
	            showInLegend: true
	        }
	    },
	    series: [{
	        type: 'pie',
	        name: 'Serie',
	        data: _DatosPie
	    }]
	});
}

function cargaGraficaComparativa(){
	$('#contento').html('');

	var arrayRealizadas	= [];
	var arrayCobradas	= [];

    //montoMarzo -- Realizado  886150
    //montoMarzoAux-- cobrado 567033.3400000001
    //
    //
    
    

    if ( !_.size(SalesUp.Variables.ArrayTotales) ){ return false; }

    var montoEneroPorCobrar= parseFloat(SalesUp.Variables.ArrayTotales[0].montoEnero)-parseFloat(SalesUp.Variables.ArrayTotales[0].montoEneroAux);
    var montoFebreroPorCobrar= parseFloat(SalesUp.Variables.ArrayTotales[0].montoFebrero)-parseFloat(SalesUp.Variables.ArrayTotales[0].montoFebrero);
    var montoMarzoPorCobrar= parseFloat(SalesUp.Variables.ArrayTotales[0].montoMarzo)-parseFloat(SalesUp.Variables.ArrayTotales[0].montoMarzoAux);
    var montoAbrilPorCobrar= parseFloat(SalesUp.Variables.ArrayTotales[0].montoAbril)-parseFloat(SalesUp.Variables.ArrayTotales[0].montoAbrilAux);
    var montoMayoPorCobrar= parseFloat(SalesUp.Variables.ArrayTotales[0].montoMayo)-parseFloat(SalesUp.Variables.ArrayTotales[0].montoMayoAux);
    var montoJunioPorCobrar= parseFloat(SalesUp.Variables.ArrayTotales[0].montoJunio)-parseFloat(SalesUp.Variables.ArrayTotales[0].montoJunioAux);
    var montoJulioPorCobrar= parseFloat(SalesUp.Variables.ArrayTotales[0].montoJulio)-parseFloat(SalesUp.Variables.ArrayTotales[0].montoJulioAux);
    var montoAgostoPorCobrar= parseFloat(SalesUp.Variables.ArrayTotales[0].montoAgosto)-parseFloat(SalesUp.Variables.ArrayTotales[0].montoAgostoAux);
    var montoSeptiembrePorCobrar= parseFloat(SalesUp.Variables.ArrayTotales[0].montoSeptiembre)-parseFloat(SalesUp.Variables.ArrayTotales[0].montoSeptiembreAux);
    var montoOctubrePorCobrar= parseFloat(SalesUp.Variables.ArrayTotales[0].montoOctubre)-parseFloat(SalesUp.Variables.ArrayTotales[0].montoOctubreAux);
    var montoNoviembrePorCobrar= parseFloat(SalesUp.Variables.ArrayTotales[0].montoNoviembre)-parseFloat(SalesUp.Variables.ArrayTotales[0].montoNoviembreAux);
    var montoDiciembrePorCobrar= parseFloat(SalesUp.Variables.ArrayTotales[0].montoDiciembre)-parseFloat(SalesUp.Variables.ArrayTotales[0].montoDiciembreAux);
    
	arrayRealizadas.push({y:montoEneroPorCobrar});
	arrayRealizadas.push({y:montoFebreroPorCobrar});
	arrayRealizadas.push({y:montoMarzoPorCobrar});
	arrayRealizadas.push({y:montoAbrilPorCobrar});
	arrayRealizadas.push({y:montoMayoPorCobrar});
	arrayRealizadas.push({y:montoJunioPorCobrar});
	arrayRealizadas.push({y:montoJulioPorCobrar});
	arrayRealizadas.push({y:montoAgostoPorCobrar});
	arrayRealizadas.push({y:montoSeptiembrePorCobrar});
	arrayRealizadas.push({y:montoOctubrePorCobrar});
	arrayRealizadas.push({y:montoNoviembrePorCobrar});
	arrayRealizadas.push({y:montoDiciembrePorCobrar});

	arrayCobradas.push({y:SalesUp.Variables.ArrayTotales[0].montoEneroAux});
	arrayCobradas.push({y:SalesUp.Variables.ArrayTotales[0].montoFebreroAux});
	arrayCobradas.push({y:SalesUp.Variables.ArrayTotales[0].montoMarzoAux});
	arrayCobradas.push({y:SalesUp.Variables.ArrayTotales[0].montoAbrilAux});
	arrayCobradas.push({y:SalesUp.Variables.ArrayTotales[0].montoMayoAux});
	arrayCobradas.push({y:SalesUp.Variables.ArrayTotales[0].montoJunioAux});
	arrayCobradas.push({y:SalesUp.Variables.ArrayTotales[0].montoJulioAux});
	arrayCobradas.push({y:SalesUp.Variables.ArrayTotales[0].montoAgostoAux});
	arrayCobradas.push({y:SalesUp.Variables.ArrayTotales[0].montoSeptiembreAux});
	arrayCobradas.push({y:SalesUp.Variables.ArrayTotales[0].montoOctubreAux});
	arrayCobradas.push({y:SalesUp.Variables.ArrayTotales[0].montoNoviembreAux});
	arrayCobradas.push({y:SalesUp.Variables.ArrayTotales[0].montoDiciembreAux});

	categories = [];
	$('thead td.grafica').each( function(i) {
		categories.push(this.innerHTML);
	});	

	chart = new Highcharts.Chart({
            chart: {
            	renderTo: 'contento',
                type: 'column',
                backgroundColor:'rgba(255, 255, 255, 0.8)'
            },
            title: {
                text: 'Reporte de ventas realizadas vs cobradas'
            },
            xAxis: {
                 categories: categories,
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    },
                    formatter:function() {
							return SalesUp.Sistema.FormatoMoneda(this.total);
						}
                },                
                labels: {
                    formatter: function() {
                        
                        return SalesUp.Sistema.FormatoMoneda(this.value);     
                    }
                }
            },
            legend: {
                align: 'right',
                x: -70,
                verticalAlign: 'top',
                y: 20,
                floating: true,
                backgroundColor: null,
                borderColor: null,
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                formatter: function() {
                    
                    return '<b>'+ this.x +'</b><br/>'+
                        this.series.name +': '+ SalesUp.Sistema.FormatoMoneda(this.y) +'<br/>'+
                        'Total Realizadas: '+ SalesUp.Sistema.FormatoMoneda(this.point.stackTotal)+'<br>';
                        
                }
            },
            plotOptions: {
            column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: 'white',
                        style: {
                            textShadow: '0 0 3px black, 0 0 3px black'
                        },
                        
                    }
                },
            series: {
                dataLabels: {
                    enabled: true,
                    stacking: 'normal',
                    style: {
                        fontWeight: 'bold'
                    },
                    formatter: function() {
                        return  '';}//SalesUp.Sistema.FormatoMoneda(this.point.y) ;} 
                },
                cursor: 'pointer'
            }
        },
            series: [{
                name: 'Cobradas',
                data: arrayCobradas,
                color: '#4572A7'
            },  {
                name: 'Por cobrar',
                data: arrayRealizadas,
                color: '#AA4643'
            }]
	 
        });
}

function ObtieneGraficaVentasRealizadasPie(){
	var sumaTotal 	= 0;
	var DatosPie  	= [];
	var tipo 	  	= $('#FiltroDetalleReportes').val();
	var periodo 	= $('#Periodo').val();
	var actividad 	= $('#FiltroActidad').val();
	var moneda 		= $('#moneda').val();

	for (var i = 0; i < SalesUp.Variables.jsonDatos.length; i++) {
		var datoActual 	= SalesUp.Variables.jsonDatos[i].MONTO_TOTAL;
		datoActual 		= (datoActual == '') ? 0 : datoActual;
		sumaTotal 		= sumaTotal + parseFloat(datoActual);
	};


	for (var i = 0; i < SalesUp.Variables.jsonDatos.length; i++) {
		var datoActual 	= SalesUp.Variables.jsonDatos[i];
		var montoActual = SalesUp.Variables.jsonDatos[i].MONTO_TOTAL;
		montoActual 	= (montoActual == '') ? 0 : montoActual;
		var pct 		= parseFloat(montoActual)/sumaTotal;
		
		DatosPie.push({name:datoActual.TITULO+': <b>'+SalesUp.Sistema.FormatoPorcentaje(pct)+'</b>',y:parseInt(montoActual),url:'/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&mes=0&actividad='+actividad+'&tipo='+tipo+'&moneda='+moneda+'&parametros='+datoActual.Parametros});
	};
    
	CargaGraficaPie(DatosPie);
}

SalesUp.Variables.Cambia = function(t){
	if($(t).is(':checked')){
		ObtieneGraficaVentasRealizadasPie();
	}else{
		cargaGrafica();	
	}	
}

SalesUp.Variables.CrearTotales = function(){
	var tipo 	  	= $('#FiltroDetalleReportes').val();
	var periodo 	= $('#Periodo').val();
	var actividad 	= $('#FiltroActidad').val();
	var moneda 		= $('#moneda').val();

	var arrRows 	= $('#ReportTable tbody tr');
	var sumTotales 	= [];
	
	for(var i = 0; i <= arrRows.length;i++){
		var $row 			= $(arrRows[i]);
	 	var arrSumasTotales = $row.find('.sumaTotal');
	 	var nTotales 		= _.size(arrSumasTotales);
		  
		for(var nt = 0; nt < nTotales; nt++){
		    var $td 	= $(arrSumasTotales[nt]);
		    var monto 	= parseFloat(""+$td.attr('data-dato'));
		   //monto 		= SalesUp.Sistema.MonedaANumero(monto);
		    sumTotales[nt] = (sumTotales[nt]?sumTotales[nt]:0) + monto;
		}
	}

	$('#ReportTable').append('<tfoot><tr class="Totales"><td class="tDer">Totales</td></tr></tfoot>');

	for (var i = 0; i < sumTotales.length; i++) {
		var simbolo 	= $('#moneda option:selected').data('simbolo');
		var montoActual = SalesUp.Sistema.moneda({moneda:simbolo, numero:sumTotales[i]});

			var actividadAux1 = 0;
			var actividadAux2 = 1;
			var reporte = 1;

			if(SalesUp.Variables.Reporte){
				if(SalesUp.Variables.Reporte == 2){
					actividadAux1 = 3;
					actividadAux2 = 4;
					reporte = SalesUp.Variables.Reporte;
				}
			}
		
		if(i!=12)
			$('.Totales').append('<td class="tDer" data-sum="'+(i+1)+'"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo='+8+'&mes='+(i+1)+'&moneda='+moneda+'&parametros=0"><b class="monto">'+montoActual+'</b></td>');
		else
			$('.Totales').append('<td class="tDer" data-sum="'+(i+1)+'"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo='+8+'&mes=0&moneda='+moneda+'&parametros=0"><b class="monto">'+montoActual+'</b></td>');
		
		};
};

SalesUp.Variables.CargaReportePeriodo = function(){
	SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});

	setTimeout(function(){

		var filtroNuevo = {
			Vista 		: $('#FiltroDetalleReportes').val(),
			Actividad 	: $('#FiltroActidad').val(),
			Periodo 	: $('#Periodo').val()
		};
		var moneda = '';

		if(SalesUp.Variables.Multimoneda == 1){
			filtroNuevo.Moneda 	= $('#moneda').val();
			moneda 				= $('#moneda').val();
		}

		localStorage.setItem('filtroVentasRealizadas',JSON.stringify(filtroNuevo));

		var vista 		= $('#FiltroDetalleReportes').val();
		var actividad 	= $('#FiltroActidad').val();
		var periodo 	= $('#Periodo').val();

		if(vista == 1){
			$('#grupos').show();
			var grupo = $('#FiltroDetalleReportes2').val();
		}else{
			$('#grupos').hide();
			var grupo = 0;
		}

		var simbolo 	= $('#moneda option:selected').data('simbolo');
		var jsonHeader 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosReporteVentas.dbsp', Parametros:'actividad='+actividad+'&periodo='+periodo+'&vista='+vista+'&tipo='+0+'&grupo='+grupo+'&moneda='+moneda,DataType:'json'}).jsonDatos;

		if(actividad == 2 || actividad == 5){
			var actividadAux1 = 0;
			var actividadAux2 = 1;
			var reporte = 1;

			if(SalesUp.Variables.Reporte){
				if(SalesUp.Variables.Reporte == 2){
					actividadAux1 = 3;
					actividadAux2 = 4;
					reporte = SalesUp.Variables.Reporte;
				}
			}
            
			var jsonDatosActividad0 = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosReporteVentas.dbsp', Parametros:'actividad='+actividadAux1+'&periodo='+periodo+'&vista='+vista+'&tipo='+1+'&grupo='+grupo+'&moneda='+moneda,DataType:'json'}).jsonDatos;
			var jsonDatosActividad1 = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosReporteVentas.dbsp', Parametros:'actividad='+actividadAux2+'&periodo='+periodo+'&vista='+vista+'&tipo='+1+'&grupo='+grupo+'&moneda='+moneda,DataType:'json'}).jsonDatos;

			SalesUp.Variables.jsonDatos 	= [];
			SalesUp.Variables.ArrayTotales 	= [];
			jsonDatosActividad0=_.reject(jsonDatosActividad0, function(j){return _.size(j)==0;});
			jsonDatosActividad1=_.reject(jsonDatosActividad1, function(j){return _.size(j)==0;});
			
			
			

			if(_.size(jsonDatosActividad0)>0){
				SalesUp.Variables.Totales = {};
				SalesUp.Variables.Totales.montoEnero = 0;
				SalesUp.Variables.Totales.montoEneroAux = 0;
				SalesUp.Variables.Totales.montoFebrero = 0;
				SalesUp.Variables.Totales.montoFebreroAux = 0;
				SalesUp.Variables.Totales.montoMarzo = 0;
				SalesUp.Variables.Totales.montoMarzoAux = 0;
				SalesUp.Variables.Totales.montoAbril = 0;
				SalesUp.Variables.Totales.montoAbrilAux = 0;
				SalesUp.Variables.Totales.montoMayo = 0;
				SalesUp.Variables.Totales.montoMayoAux = 0;
				SalesUp.Variables.Totales.montoJunio = 0;
				SalesUp.Variables.Totales.montoJunioAux = 0;
				SalesUp.Variables.Totales.montoJulio = 0;
				SalesUp.Variables.Totales.montoJulioAux = 0;
				SalesUp.Variables.Totales.montoAgosto = 0;
				SalesUp.Variables.Totales.montoAgostoAux = 0;
				SalesUp.Variables.Totales.montoSeptiembre = 0;
				SalesUp.Variables.Totales.montoSeptiembreAux = 0;
				SalesUp.Variables.Totales.montoOctubre = 0;
				SalesUp.Variables.Totales.montoOctubreAux = 0;
				SalesUp.Variables.Totales.montoNoviembre = 0;
				SalesUp.Variables.Totales.montoNoviembreAux = 0;
				SalesUp.Variables.Totales.montoDiciembre = 0;
				SalesUp.Variables.Totales.montoDiciembreAux = 0;
				SalesUp.Variables.Totales.montoTotal = 0;
				SalesUp.Variables.Totales.montoTotalAux = 0;


				for (var i = 0; i < jsonDatosActividad0.length; i++) {
					var parametros = jsonDatosActividad0[i].Parametros;
					var ja1 = _.where(jsonDatosActividad1,{Parametros:parametros});
						(!_.size(ja1)) ? ja1 = [{}]:'';
						ja1 = ja1[0];
					
					SalesUp.Variables.jsonDatos.push({
						contador 	: i,
						Simbolo 	: simbolo,
						MONTO_ENE 	: jsonDatosActividad0[i].MONTO_ENE,
						MONTO_FEB 	: jsonDatosActividad0[i].MONTO_FEB,
						MONTO_MAR 	: jsonDatosActividad0[i].MONTO_MAR,
						MONTO_ABR 	: jsonDatosActividad0[i].MONTO_ABR,
						MONTO_MAY 	: jsonDatosActividad0[i].MONTO_MAY,
						MONTO_JUN 	: jsonDatosActividad0[i].MONTO_JUN,
						MONTO_JUL 	: jsonDatosActividad0[i].MONTO_JUL,
						MONTO_AGO 	: jsonDatosActividad0[i].MONTO_AGO,
						MONTO_SEP 	: jsonDatosActividad0[i].MONTO_SEP,
						MONTO_OCT 	: jsonDatosActividad0[i].MONTO_OCT,
						MONTO_NOV 	: jsonDatosActividad0[i].MONTO_NOV,
						MONTO_DIC 	: jsonDatosActividad0[i].MONTO_DIC,
						MONTO_TOTAL	: jsonDatosActividad0[i].MONTO_TOTAL,
						Parametros 	: jsonDatosActividad0[i].Parametros,
						TITULO 		: jsonDatosActividad0[i].TITULO,
						MONTO_ENE_AUX 	: (_.size(ja1)) ? ja1.MONTO_ENE : 0,
						MONTO_FEB_AUX 	: (_.size(ja1)) ? ja1.MONTO_FEB : 0,
						MONTO_MAR_AUX 	: (_.size(ja1)) ? ja1.MONTO_MAR : 0,
						MONTO_ABR_AUX 	: (_.size(ja1)) ? ja1.MONTO_ABR : 0,
						MONTO_MAY_AUX 	: (_.size(ja1)) ? ja1.MONTO_MAY : 0,
						MONTO_JUN_AUX 	: (_.size(ja1)) ? ja1.MONTO_JUN : 0,
						MONTO_JUL_AUX 	: (_.size(ja1)) ? ja1.MONTO_JUL : 0,
						MONTO_AGO_AUX 	: (_.size(ja1)) ? ja1.MONTO_AGO : 0,
						MONTO_SEP_AUX 	: (_.size(ja1)) ? ja1.MONTO_SEP : 0,
						MONTO_OCT_AUX 	: (_.size(ja1)) ? ja1.MONTO_OCT : 0,
						MONTO_NOV_AUX 	: (_.size(ja1)) ? ja1.MONTO_NOV : 0,
						MONTO_DIC_AUX 	: (_.size(ja1)) ? ja1.MONTO_DIC : 0,
						MONTO_TOTAL_AUX	: (_.size(ja1)) ? ja1.MONTO_TOTAL : 0
					});

					SalesUp.Variables.Totales.montoEnero+= parseFloat(jsonDatosActividad0[i].MONTO_ENE);
					SalesUp.Variables.Totales.montoEneroAux+= (_.size(ja1)) ? parseFloat(ja1.MONTO_ENE) : 0;
					SalesUp.Variables.Totales.montoFebrero+= parseFloat(jsonDatosActividad0[i].MONTO_FEB);
					SalesUp.Variables.Totales.montoFebreroAux+= (_.size(ja1)) ? parseFloat(ja1.MONTO_FEB) : 0;
					SalesUp.Variables.Totales.montoMarzo+= parseFloat(jsonDatosActividad0[i].MONTO_MAR);
					SalesUp.Variables.Totales.montoMarzoAux+= (_.size(ja1)) ? parseFloat(ja1.MONTO_MAR) : 0;
					SalesUp.Variables.Totales.montoAbril+= parseFloat(jsonDatosActividad0[i].MONTO_ABR);
					SalesUp.Variables.Totales.montoAbrilAux+= (_.size(ja1)) ? parseFloat(ja1.MONTO_ABR) : 0;
					SalesUp.Variables.Totales.montoMayo+= parseFloat(jsonDatosActividad0[i].MONTO_MAY);
					SalesUp.Variables.Totales.montoMayoAux+= (_.size(ja1)) ? parseFloat(ja1.MONTO_MAY) : 0;
					SalesUp.Variables.Totales.montoJunio+= parseFloat(jsonDatosActividad0[i].MONTO_JUN);
					SalesUp.Variables.Totales.montoJunioAux+= (_.size(ja1)) ? parseFloat(ja1.MONTO_JUN) : 0;
					SalesUp.Variables.Totales.montoJulio+= parseFloat(jsonDatosActividad0[i].MONTO_JUL);
					SalesUp.Variables.Totales.montoJulioAux+= (_.size(ja1)) ? parseFloat(ja1.MONTO_JUL) : 0;
					SalesUp.Variables.Totales.montoAgosto+= parseFloat(jsonDatosActividad0[i].MONTO_AGO);
					SalesUp.Variables.Totales.montoAgostoAux+= (_.size(ja1)) ? parseFloat(ja1.MONTO_AGO) : 0;
					SalesUp.Variables.Totales.montoSeptiembre+= parseFloat(jsonDatosActividad0[i].MONTO_SEP);
					SalesUp.Variables.Totales.montoSeptiembreAux+= (_.size(ja1)) ? parseFloat(ja1.MONTO_SEP) : 0;
					SalesUp.Variables.Totales.montoOctubre+= parseFloat(jsonDatosActividad0[i].MONTO_OCT);
					SalesUp.Variables.Totales.montoOctubreAux+= (_.size(ja1)) ? parseFloat(ja1.MONTO_OCT) : 0;
					SalesUp.Variables.Totales.montoNoviembre+= parseFloat(jsonDatosActividad0[i].MONTO_NOV);
					SalesUp.Variables.Totales.montoNoviembreAux+= (_.size(ja1)) ? parseFloat(ja1.MONTO_NOV) : 0;
					SalesUp.Variables.Totales.montoDiciembre+= parseFloat(jsonDatosActividad0[i].MONTO_DIC);
					SalesUp.Variables.Totales.montoDiciembreAux+= (_.size(ja1)) ? parseFloat(ja1.MONTO_DIC) : 0;
					SalesUp.Variables.Totales.montoTotal+= parseFloat(jsonDatosActividad0[i].MONTO_TOTAL);
					SalesUp.Variables.Totales.montoTotalAux+= (_.size(ja1)) ? parseFloat(ja1.MONTO_TOTAL) : 0;
					SalesUp.Variables.Totales.Simbolo = simbolo;
					
					if(i == jsonDatosActividad0.length - 1){
						SalesUp.Variables.ArrayTotales.push(SalesUp.Variables.Totales);
					}
				};
			}

			var templateFooter 	= '<tr>{{#each footer}}<td colspan="2" class="tDer">Subtotales</td>'
									+'<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo=8&mes=1&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoEneroAux}}{{montoSalida}}{{/MontoFormat}}</b></a>  </td><td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo=8&mes=1&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoEnero}}{{montoSalida}}{{/MontoFormat}}</b></a></td>'
									+'<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo=8&mes=2&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoFebreroAux}}{{montoSalida}}{{/MontoFormat}}</b></a></td><td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo=8&mes=2&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoFebrero}}{{montoSalida}}{{/MontoFormat}}</b></a></td>'
									+'<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo=8&mes=3&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoMarzoAux}}{{montoSalida}}{{/MontoFormat}}</b></a></td><td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo=8&mes=3&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoMarzo}}{{montoSalida}}{{/MontoFormat}}</b></a></td>'
									+'<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo=8&mes=4&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoAbrilAux}}{{montoSalida}}{{/MontoFormat}}</b></a></td><td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo=8&mes=4&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoAbril}}{{montoSalida}}{{/MontoFormat}}</b></a></td>'
									+'<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo=8&mes=5&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoMayoAux}}{{montoSalida}}{{/MontoFormat}}</b></a></td><td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo=8&mes=5&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoMayo}}{{montoSalida}}{{/MontoFormat}}</b></a></td>'
									+'<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo=8&mes=6&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoJunioAux}}{{montoSalida}}{{/MontoFormat}}</b></a></td><td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo=8&mes=6&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoJunio}}{{montoSalida}}{{/MontoFormat}}</b></a></td>'
									+'<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo=8&mes=7&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoJulioAux}}{{montoSalida}}{{/MontoFormat}}</b></a></td><td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo=8&mes=7&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoJulio}}{{montoSalida}}{{/MontoFormat}}</b></a></td>'
									+'<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo=8&mes=8&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoAgostoAux}}{{montoSalida}}{{/MontoFormat}}</b></a></td><td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo=8&mes=8&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoAgosto}}{{montoSalida}}{{/MontoFormat}}</b></a></td>'
									+'<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo=8&mes=9&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoSeptiembreAux}}{{montoSalida}}{{/MontoFormat}}</b></a></td><td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo=8&mes=9&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoSeptiembre}}{{montoSalida}}{{/MontoFormat}}</b></a></td>'
									+'<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo=8&mes=10&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoOctubreAux}}{{montoSalida}}{{/MontoFormat}}</b></a></td><td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo=8&mes=10&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoOctubre}}{{montoSalida}}{{/MontoFormat}}</b></a></td>'
									+'<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo=8&mes=11&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoNoviembreAux}}{{montoSalida}}{{/MontoFormat}}</b></a></td><td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo=8&mes=11&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoNoviembre}}{{montoSalida}}{{/MontoFormat}}</b></a></td>'
									+'<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo=8&mes=12&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoDiciembreAux}}{{montoSalida}}{{/MontoFormat}}</b></a></td><td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo=8&mes=12&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoDiciembre}}{{montoSalida}}{{/MontoFormat}}</b></a></td>'
									+'<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo=8&mes=0&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoTotalAux}}{{montoSalida}}{{/MontoFormat}}</b></td></a><td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo=8&mes=0&moneda='+moneda+'&parametros=0"><b>{{#MontoFormat Simbolo montoTotal}}{{montoSalida}}{{/MontoFormat}}</b></a></td>'
									+'{{/each}}</tr>';
			var templateHeader 	= '<tr>{{#each Titulos}}<td class="{{CLASE}}" colspan="2">{{TITULO}}</td>{{/each}}</tr><tr>{{#each Titulos}}{{#td @index '+reporte+'}}{{celda}}{{/td}}{{/each}}</tr>';
			var templateCuerpo	= '<tr>'
									+' <td colspan="2"><input type="hidden" id="{{contador}}" class="titulo" value="{{TITULO}}">{{TITULO}}</td>'
									+' <td class="tDer enero_aux_{{contador}}" data-enero-aux="{{MONTO_ENE_AUX}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo='+vista+'&mes=1&moneda='+moneda+'&parametros={{Parametros}}"><span class="">{{#MontoFormat Simbolo MONTO_ENE_AUX}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer enero_{{contador}}" data-enero="{{MONTO_ENE}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo='+vista+'&mes=1&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_ENE}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									
									+' <td class="tDer febrero_aux_{{contador}}" data-febrero-aux="{{MONTO_FEB_AUX}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo='+vista+'&mes=2&moneda='+moneda+'&parametros={{Parametros}}"><span class="">{{#MontoFormat Simbolo MONTO_FEB_AUX}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer febrero_{{contador}}" data-febrero="{{MONTO_FEB}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo='+vista+'&mes=2&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_FEB}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									
									+' <td class="tDer marzo_aux_{{contador}}" data-marzo-aux="{{MONTO_MAR_AUX}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo='+vista+'&mes=3&moneda='+moneda+'&parametros={{Parametros}}"><span class="">{{#MontoFormat Simbolo MONTO_MAR_AUX}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer marzo_{{contador}}" data-marzo="{{MONTO_MAR}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo='+vista+'&mes=3&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_MAR}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									
									+' <td class="tDer abril_aux_{{contador}}" data-abril-aux="{{MONTO_ABR_AUX}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo='+vista+'&mes=4&moneda='+moneda+'&parametros={{Parametros}}"><span class="">{{#MontoFormat Simbolo MONTO_ABR_AUX}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer abril_{{contador}}" data-abril="{{MONTO_ABR}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo='+vista+'&mes=4&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_ABR}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									
									+' <td class="tDer mayo_aux_{{contador}}" data-mayo-aux="{{MONTO_MAY_AUX}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo='+vista+'&mes=5&moneda='+moneda+'&parametros={{Parametros}}"><span class="">{{#MontoFormat Simbolo MONTO_MAY_AUX}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer mayo_{{contador}}" data-mayo="{{MONTO_MAY}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo='+vista+'&mes=5&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_MAY}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									
									+' <td class="tDer junio_aux_{{contador}}" data-junio-aux="{{MONTO_JUN_AUX}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo='+vista+'&mes=6&moneda='+moneda+'&parametros={{Parametros}}"><span class="">{{#MontoFormat Simbolo MONTO_JUN_AUX}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer junio_{{contador}}" data-junio="{{MONTO_JUN}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo='+vista+'&mes=6&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_JUN}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									
									+' <td class="tDer julio_aux_{{contador}}" data-julio-aux="{{MONTO_JUL_AUX}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo='+vista+'&mes=7&moneda='+moneda+'&parametros={{Parametros}}"><span class="">{{#MontoFormat Simbolo MONTO_JUL_AUX}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer julio_{{contador}}" data-julio="{{MONTO_JUL}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo='+vista+'&mes=7&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_JUL}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									
									+' <td class="tDer agosto_aux_{{contador}}" data-agosto-aux="{{MONTO_AGO_AUX}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo='+vista+'&mes=8&moneda='+moneda+'&parametros={{Parametros}}"><span class="">{{#MontoFormat Simbolo MONTO_AGO_AUX}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer agosto_{{contador}}" data-agosto="{{MONTO_AGO}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo='+vista+'&mes=8&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_AGO}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									
									+' <td class="tDer septiembre_aux_{{contador}}" data-septiembre-aux="{{MONTO_SEP_AUX}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo='+vista+'&mes=9&moneda='+moneda+'&parametros={{Parametros}}"><span class="">{{#MontoFormat Simbolo MONTO_SEP_AUX}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer septiembre_{{contador}}" data-septiembre="{{MONTO_SEP}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo='+vista+'&mes=9&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_SEP}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									
									+' <td class="tDer octubre_aux_{{contador}}" data-octubre-aux="{{MONTO_OCT_AUX}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo='+vista+'&mes=10&moneda='+moneda+'&parametros={{Parametros}}"><span class="">{{#MontoFormat Simbolo MONTO_OCT_AUX}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer octubre_{{contador}}" data-octubre="{{MONTO_OCT}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo='+vista+'&mes=10&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_OCT}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									
									+' <td class="tDer noviembre_aux_{{contador}}" data-noviembre-aux="{{MONTO_NOV_AUX}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo='+vista+'&mes=11&moneda='+moneda+'&parametros={{Parametros}}"><span class="">{{#MontoFormat Simbolo MONTO_NOV_AUX}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer noviembre_{{contador}}" data-noviembre="{{MONTO_NOV}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo='+vista+'&mes=11&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_NOV}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									
									+' <td class="tDer diciembre_aux_{{contador}}" data-diciembre-aux="{{MONTO_DIC_AUX}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo='+vista+'&mes=12&moneda='+moneda+'&parametros={{Parametros}}"><span class="">{{#MontoFormat Simbolo MONTO_DIC_AUX}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer diciembre_{{contador}}" data-diciembre="{{MONTO_DIC}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo='+vista+'&mes=12&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_DIC}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									
									+' <td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux2+'&tipo='+vista+'&mes=0&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_TOTAL_AUX}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividadAux1+'&tipo='+vista+'&mes=0&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_TOTAL}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+'</tr>';
		}else{
			SalesUp.Variables.jsonDatos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosReporteVentas.dbsp', Parametros:'actividad='+actividad+'&periodo='+periodo+'&vista='+vista+'&tipo='+1+'&grupo='+grupo+'&moneda='+moneda,DataType:'json'}).jsonDatos;

			if(SalesUp.Variables.jsonDatos[0].MONTO_ENE){

				for (var i = 0; i < SalesUp.Variables.jsonDatos.length; i++) {
					SalesUp.Variables.jsonDatos[i].contador = i;
					SalesUp.Variables.jsonDatos[i].Simbolo 	= simbolo;					
				};
			}
			
			var templateHeader 	= '<tr>{{#each Titulos}}<td class="{{CLASE}}">{{TITULO}}</td>{{/each}}</tr>';
			var templateCuerpo	= '<tr>'
									+' <td><input type="hidden" id="{{contador}}" class="titulo" value="{{TITULO}}">{{TITULO}}</td>'
									+' <td class="tDer enero_{{contador}} sumaTotal" data-dato="{{MONTO_ENE}}" data-enero="{{MONTO_ENE}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo='+vista+'&mes=1&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_ENE}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer febrero_{{contador}} sumaTotal" data-dato="{{MONTO_FEB}}" data-febrero="{{MONTO_FEB}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo='+vista+'&mes=2&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_FEB}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer marzo_{{contador}} sumaTotal" data-dato="{{MONTO_MAR}}" data-marzo="{{MONTO_MAR}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo='+vista+'&mes=3&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_MAR}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer abril_{{contador}} sumaTotal" data-dato="{{MONTO_ABR}}" data-abril="{{MONTO_ABR}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo='+vista+'&mes=4&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_ABR}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer mayo_{{contador}} sumaTotal" data-dato="{{MONTO_MAY}}" data-mayo="{{MONTO_MAY}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo='+vista+'&mes=5&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_MAY}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer junio_{{contador}} sumaTotal" data-dato="{{MONTO_JUN}}" data-junio="{{MONTO_JUN}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo='+vista+'&mes=6&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_JUN}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer julio_{{contador}} sumaTotal" data-dato="{{MONTO_JUL}}" data-julio="{{MONTO_JUL}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo='+vista+'&mes=7&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_JUL}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer agosto_{{contador}} sumaTotal" data-dato="{{MONTO_AGO}}" data-agosto="{{MONTO_AGO}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo='+vista+'&mes=8&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_AGO}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer septiembre_{{contador}} sumaTotal" data-dato="{{MONTO_SEP}}" data-septiembre="{{MONTO_SEP}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo='+vista+'&mes=9&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_SEP}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer octubre_{{contador}} sumaTotal" data-dato="{{MONTO_OCT}}" data-octubre="{{MONTO_OCT}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo='+vista+'&mes=10&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_OCT}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer noviembre_{{contador}} sumaTotal" data-dato="{{MONTO_NOV}}" data-noviembre="{{MONTO_NOV}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo='+vista+'&mes=11&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_NOV}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer diciembre_{{contador}} sumaTotal" data-dato="{{MONTO_DIC}}" data-diciembre="{{MONTO_DIC}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo='+vista+'&mes=12&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_DIC}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+' <td class="tDer sumaTotal" data-dato="{{MONTO_TOTAL}}"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo='+vista+'&mes=0&moneda='+moneda+'&parametros={{Parametros}}"><span class="monto">{{#MontoFormat Simbolo MONTO_TOTAL}}{{montoSalida}}{{/MontoFormat}}</span></a></td>'
									+'</tr>';
		}

		var htmlColumnas = SalesUp.Construye.ReemplazaDatos({Template:templateHeader,Datos:{"Titulos":jsonHeader}});
		
		if(actividad == 2 || actividad == 5){
			var htmlfooter = SalesUp.Construye.ReemplazaDatos({Template:templateFooter,Datos:{"footer":SalesUp.Variables.ArrayTotales}});
		}

		SalesUp.Construye.ConstruyeTabla(htmlColumnas, templateCuerpo, SalesUp.Variables.jsonDatos, {Destino:'#CargaDatos', Id:'ReportTable'} );

		if(actividad == 2 || actividad == 5){
			$('#ReportTable').append(htmlfooter);
			$('#cambiaGrafica').hide();
			cargaGraficaComparativa();
		}else{
			$('#cambiaGrafica').show();

			if($('#SwitchGrafica').is(':checked')){
				ObtieneGraficaVentasRealizadasPie();
			}else{
				cargaGrafica();
			}

			SalesUp.Variables.CrearTotales();
		}

		SalesUp.Sistema.OcultarOverlay();
	  	SalesUp.Sistema.OcultaEspera();
	}, 100);
}

SalesUp.Variables.CargaFiltros = function(){
	SalesUp.Sistema.CargaDatos({Link:'/privado/ajax/filtrosReportes.dbsp',Parametros:'idpantalla='+SalesUp.Variables.Idpantalla+'&reporte='+SalesUp.Variables.Reporte,Destino:'#ListaFiltros'});

	if(SalesUp.Variables.Multimoneda == 1){
		var arrayMonedas	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonMonedasConfiguradas.dbsp',DataType:'json'}).jsonDatos;
		var opciones		= '<option value="0">Todos...</option>';

		for (var i = 0; i < arrayMonedas.length; i++) {
			var monedaActual 	= arrayMonedas[i];
			var simbolo 		= '';

			if(monedaActual.MONEDA_SIMBOLO){
				simbolo = monedaActual.MONEDA_SIMBOLO;
			}
			if(monedaActual.UNICODE==8364){
				var html= '<div id="euro" style="display:none;" data-simbolo="&#8364"></div>';
				$('#CargaDatos').after(html);
			}
			opciones			= opciones + '<option value="'+monedaActual.IDEMPRESAMONEDA+'" data-simbolo="'+simbolo+'" data-unicode="'+monedaActual.UNICODE+'">'+monedaActual.MONEDA+'</option>'
		};

		var selectMultimoneda = '<label for="moneda">Moneda:</label><select name="moneda" id="moneda" onChange="SalesUp.Variables.CargaReportePeriodo();">'+opciones+'</select>';

		$('#filtros').append(selectMultimoneda);
		var simb=$('#euro').attr('data-simbolo');
		$('#moneda option[data-unicode=8364]').attr('data-simbolo', simb);
		s= SalesUp.Sistema.Almacenamiento({a:'SysMoneda'});
		$('#moneda option[value=0]').attr('data-simbolo', s) ;


	}
};

// On document ready, call visualize on the datatable.
$(document).ready(function() {
	SalesUp.Variables.CargaFiltros();

	var filtro = localStorage.getItem('filtroVentasRealizadas');
	
	if(SalesUp.Valida.esJson(filtro)){
		var filtroCargado = JSON.parse(filtro);

		$('#FiltroActidad').val(filtroCargado.Actividad);
		$('#Periodo').val(filtroCargado.Periodo);
		$('#FiltroDetalleReportes').val(filtroCargado.Vista);
		$('#moneda').val(filtroCargado.Moneda);
	}
    
	setTimeout(function(){SalesUp.Variables.CargaReportePeriodo();}, 100);
});

