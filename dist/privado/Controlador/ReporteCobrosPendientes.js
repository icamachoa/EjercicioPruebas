Handlebars.registerHelper('linkExtra', function(extra, extra2, link) {
  	var extralink 	= '';
  	var reporteVista= $('#ReporteVista').val();

  	if(reporteVista == 1){
		//extralink = '&elejecutivo='+extra;
		extralink='&tku='+this.TKU;
	}if(reporteVista == 2){
		//extralink = '&elgrupo='+extra;
		extralink = '&tkgrupo='+this.TKGRUPO;
	}else if(reporteVista == 3){
		//extralink = '&lalinea='+extra;
		extralink='&tklinea='+this.TKLINEA;
	}else if(reporteVista == 4){
		//extralink = '&elorigen='+extra;
		extralink = '&tkorigen='+this.TKORIGEN;
	}else if(reporteVista == 5){
		extralink = '&pais='+extra;
	}else if(reporteVista == 6){
		extralink = '&pais='+extra2+'&estado='+extra;
	}else if(reporteVista == 7){
		extralink = '&laciudad='+extra;
	}
  	
  	return extralink;
});

function meses(parseo){
	var valor =   SalesUp.Sistema.MonedaANumero(parseo);
	return valor;
}

Highcharts.visualize = function(options) {
		// the categories
		options.xAxis.categories = [];
		$('thead td.dato').each( function(i) {
			options.xAxis.categories.push(this.innerHTML);
		});
		
		// the data series
		var titulo ="";
		options.series = [];
		
		$('.titulo').each( function(j) {
			var arrayValores	= [];
			var valor 			= $(this).attr('id');
			titulo = $(this).val();
			
			arrayValores.push(meses($('.vencido_'+valor).attr('data-vencidos')));
			arrayValores.push(meses($('.actual_'+valor).attr('data-actual')));
			arrayValores.push(meses($('.mes1_'+valor).attr('data-mes1')));
			arrayValores.push(meses($('.mes2_'+valor).attr('data-mes2')));
			arrayValores.push(meses($('.mes3_'+valor).attr('data-mes3')));
			arrayValores.push(meses($('.total_'+valor).attr('data-total')));

			options.series[j] = { 
				name: titulo,
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
			defaultSeriesType: 'column',
    		backgroundColor:'rgba(255, 255, 255, 0.8)'
		},
		title: {
			text: 'Cobros pendientes',
			
		},
		subtitle: {
			text: '',
			
		},
		xAxis: {
		},
		yAxis: {
			title: {
				text: 'Monto'
			},
		},
		tooltip: {
			formatter: function() {
				return ''+
					'('+this.series.name+'), '+ SalesUp.Sistema.MonedaANumero(this.y);
			}
		},
		plotOptions: {
			column: {
				pointPadding: 0.06,
				borderWidth: 0
			}
		}	
	};
	Highcharts.visualize(options);
}

SalesUp.Variables.CrearTotales = function(){
	var arrRows 	= $('#ReportTable tbody tr');
	var sumTotales 	= [];
	
	for(var i = 0; i <= arrRows.length;i++){
		var $row 			= $(arrRows[i]);
	 	var arrSumasTotales = $row.find('.sumaTotal');
	 	var nTotales 		= _.size(arrSumasTotales);
		  
		for(var nt = 0; nt < nTotales; nt++){
		    var $td 	= $(arrSumasTotales[nt]);
		    var monto 	= $td.attr('data-dato');
		    monto 		= SalesUp.Sistema.MonedaANumero(monto);
		    sumTotales[nt] = (sumTotales[nt]?sumTotales[nt]:0) + monto;
		}
	}

	$('#ReportTable').append('<tfoot><tr class="Totales"><td class="tDer">Totales</td></tr></tfoot>');

	for (var i = 0; i < sumTotales.length; i++) {
		var simbolo 	= $('#moneda option:selected').data('simbolo');
		var montoActual = SalesUp.Sistema.moneda({moneda:simbolo, numero:sumTotales[i]});

		$('.Totales').append('<td class="tCen"><b>'+montoActual+'</b></td>');
	};
};

SalesUp.Variables.CargaReporte = function(){
	SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});
	var idpantalla = 16;
	setTimeout(function(){
		var reporteVista= $('#ReporteVista').val();
		var filtroLink	= '';
		var filtroNuevo = {
			ReporteVista : reporteVista
		};
		
		var moneda = '';
		if(SalesUp.Variables.Multimoneda == 1){
			filtroNuevo.Moneda 	= $('#moneda').val();
			moneda 				= $('#moneda').val();
		}

		localStorage.setItem('filtroCobrosPendientes',JSON.stringify(filtroNuevo));
		var reportevista = $('#ReporteVista').val();
		if(reportevista == 1){
			$('#grupos').show();
			var tkgrupo=$('#Idgrupo').val();
			if(tkgrupo==0){tkgrupo=''}
			var grupo = 0;//$('#Idgrupo').val();
		}else{
			$('#grupos').hide();
			var tkgrupo='';
			var grupo = 0;
		}

		var jsonHeader 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonReporteCobrosPendientes.dbsp', Parametros:'idpantalla='+idpantalla+'&reportevista='+reportevista+'&tkgrupo='+tkgrupo+'&grupo='+grupo+'&salida=0&moneda='+moneda,DataType:'json'}).jsonDatos;
		var jsonDatos 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonReporteCobrosPendientes.dbsp', Parametros:'idpantalla='+idpantalla+'&reportevista='+reportevista+'&tkgrupo='+tkgrupo+'&grupo='+grupo+'&salida=1&moneda='+moneda,DataType:'json'}).jsonDatos;		
		var titulos 	= {};
		titulos 		= {Titulos:jsonHeader};
		var simbolo 	= $('#moneda option:selected').data('simbolo');

		for (var i = 0; i < jsonDatos.length; i++) {
			jsonDatos[i]['VENCIDO'] = SalesUp.Sistema.moneda({moneda:simbolo, numero:jsonDatos[i]['VENCIDO']});
			jsonDatos[i]['ACTUAL'] = SalesUp.Sistema.moneda({moneda:simbolo, numero:jsonDatos[i]['ACTUAL']});
			jsonDatos[i]['MES1'] = SalesUp.Sistema.moneda({moneda:simbolo, numero:jsonDatos[i]['MES1']});
			jsonDatos[i]['MES2'] = SalesUp.Sistema.moneda({moneda:simbolo, numero:jsonDatos[i]['MES2']});
			jsonDatos[i]['MES3'] = SalesUp.Sistema.moneda({moneda:simbolo, numero:jsonDatos[i]['MES3']});
			jsonDatos[i]['TOTAL'] = SalesUp.Sistema.moneda({moneda:simbolo, numero:jsonDatos[i]['TOTAL']});
			jsonDatos[i].contador	= i;
		};

		if(reporteVista == 1){
			filtroLink = 'tipo=1&elgrupo='+grupo;
		}else if(reporteVista == 2){
			filtroLink = 'tipo=2';
		}else if(reporteVista == 3){
			filtroLink = 'tipo=3';
		}else if(reporteVista == 4){
			filtroLink = 'tipo=4';
		}else if(reporteVista == 5){
			filtroLink = 'tipo=6&elejecutivo='+SalesUp.Variables.Elejecutivo;
		}else if(reporteVista == 6){
			filtroLink = 'tipo=7&elejecutivo='+SalesUp.Variables.Elejecutivo;
		}else if(reporteVista == 7){
			filtroLink = 'tipo=8&elejecutivo='+SalesUp.Variables.Elejecutivo;
		}
		
		var templateHeader 	= '<tr>{{#each Titulos}}<td class="tCen {{CLASE}}">{{VISTA}}</td>{{/each}}</tr>';
		var templateCuerpo	= '<tr>'
								+'	<td class=""><input type="hidden" id="{{contador}}" class="titulo" value="{{TITULO}}"/>{{TITULO}}</td>'
								+'	<td class="tCen vencido_{{contador}} sumaTotal" data-dato="{{VENCIDO}}" data-vencidos="{{VENCIDO}}"><a href="/privado/reporte_cobros_pendientes_detalle.dbsp?moneda='+moneda+'&'+filtroLink+'{{#linkExtra EXTRA EXTRA2}}{{link}}{{/linkExtra}}&periodo=1"><span>{{VENCIDO}}</span></a></td>'
								+'	<td class="tCen actual_{{contador}} sumaTotal" data-dato="{{ACTUAL}}" data-actual="{{ACTUAL}}"><a href="/privado/reporte_cobros_pendientes_detalle.dbsp?moneda='+moneda+'&'+filtroLink+'{{#linkExtra EXTRA EXTRA2}}{{link}}{{/linkExtra}}&periodo=2"><span>{{ACTUAL}}</span></a></td>'
								+'	<td class="tCen mes1_{{contador}} sumaTotal" data-dato="{{MES1}}" data-mes1="{{MES1}}"><a href="/privado/reporte_cobros_pendientes_detalle.dbsp?moneda='+moneda+'&'+filtroLink+'{{#linkExtra EXTRA EXTRA2}}{{link}}{{/linkExtra}}&periodo=3"><span>{{MES1}}</span></a></td>'
								+'	<td class="tCen mes2_{{contador}} sumaTotal" data-dato="{{MES2}}" data-mes2="{{MES2}}"><a href="/privado/reporte_cobros_pendientes_detalle.dbsp?moneda='+moneda+'&'+filtroLink+'{{#linkExtra EXTRA EXTRA2}}{{link}}{{/linkExtra}}&periodo=4"><span>{{MES2}}</span></a></td>'
								+'	<td class="tCen mes3_{{contador}} sumaTotal" data-dato="{{MES3}}" data-mes3="{{MES3}}"><a href="/privado/reporte_cobros_pendientes_detalle.dbsp?moneda='+moneda+'&'+filtroLink+'{{#linkExtra EXTRA EXTRA2}}{{link}}{{/linkExtra}}&periodo=5"><span>{{MES3}}</span></a></td>'
								+'	<td class="tCen total_{{contador}} sumaTotal" data-dato="{{TOTAL}}" data-total="{{TOTAL}}"><a href="/privado/reporte_cobros_pendientes_detalle.dbsp?moneda='+moneda+'&'+filtroLink+'{{#linkExtra EXTRA EXTRA2}}{{link}}{{/linkExtra}}&periodo=0"><span>{{TOTAL}}</span></a></td>'
								+'</tr>'
		
		var htmlColumnas 	= SalesUp.Construye.ReemplazaDatos({Template:templateHeader,Datos:titulos});
		SalesUp.Construye.ConstruyeTabla(htmlColumnas, templateCuerpo, jsonDatos, {Destino:'#CargaDatos', Id:'ReportTable'} );
		SalesUp.Variables.CrearTotales();
		cargaGrafica();

		SalesUp.Sistema.OcultarOverlay();
	  	SalesUp.Sistema.OcultaEspera();
	}, 100);
};  //CargaReportes

SalesUp.Variables.CargaFiltros = function(){
	if(SalesUp.Variables.Multimoneda == 1){
		var arrayMonedas	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonMonedasConfiguradas.dbsp',DataType:'json'}).jsonDatos;
		var opciones		= '<option value="0">Todos...</option>';

		for (var i = 0; i < arrayMonedas.length; i++) {
			var monedaActual 	= arrayMonedas[i];
			var simbolo 		= '';

			if(monedaActual.MONEDA_SIMBOLO){
				simbolo = monedaActual.MONEDA_SIMBOLO;
			}

			opciones			= opciones + '<option value="'+monedaActual.IDEMPRESAMONEDA+'" data-simbolo="'+simbolo+'">'+monedaActual.MONEDA+'</option>'
		};

		var selectMultimoneda = '<label for="moneda">Moneda:</label><select name="moneda" id="moneda" onChange="SalesUp.Variables.CargaReporte();">'+opciones+'</select>';

		$('#filtros').append(selectMultimoneda);
	}
};

// On document ready, call visualize on the datatable.
$(document).ready(function() {
	SalesUp.Variables.CargaFiltros();

	var filtro = localStorage.getItem('filtroCobrosPendientes');
	
	if(SalesUp.Valida.esJson(filtro)){
		var filtroCargado = JSON.parse(filtro);

		$('#ReporteVista').val(filtroCargado.ReporteVista);
		$('#moneda').val(filtroCargado.Moneda);
	}

	setTimeout(function(){SalesUp.Variables.CargaReporte();}, 100);
});

