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
			
			arrayValores.push(meses($('.sietedias_'+valor).attr('data-sietedias')));
			arrayValores.push(meses($('.quincedias_'+valor).attr('data-quincedias')));
			arrayValores.push(meses($('.veintidosdias_'+valor).attr('data-veintidosdias')));
			arrayValores.push(meses($('.veintiochodias_'+valor).attr('data-veintiochodias')));

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
			defaultSeriesType: 'column',
    		backgroundColor:'rgba(255, 255, 255, 0.8)'
		},
		title: {
			text: 'Oportuniades sin seguimiento',
			
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
			formatter: function() {
				return ''+
					'Seguimiento ('+this.series.name+'), '+ SalesUp.Sistema.MonedaANumero(this.y);
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

SalesUp.Variables.CargaReportePeriodo = function(){
	SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});
	
	setTimeout(function(){
		var filtroNuevo = {
			Vista 	: $('#FiltroDetalleReportes').val()
		};
		var moneda = '';

		if(SalesUp.Variables.Multimoneda == 1){
			filtroNuevo.Moneda 	= $('#moneda').val();
			moneda 				= $('#moneda').val();
		}

		localStorage.setItem('filtroOpSinSeguimiento',JSON.stringify(filtroNuevo));

		var vista		= $('#FiltroDetalleReportes').val();

		if(vista == 1){
			$('#grupos').show();
			var grupo = $('#FiltroDetalleReportes2').val();
		}else{
			$('#grupos').hide();
			var grupo = 0;
		}

		var jsonHeader 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosOpSinSeguimiento.dbsp', Parametros:'vista='+vista+'&tipo='+0+'&grupo='+grupo+'&moneda='+moneda,DataType:'json'}).jsonDatos;
		var jsonDatos 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosOpSinSeguimiento.dbsp', Parametros:'vista='+vista+'&tipo='+1+'&grupo='+grupo+'&moneda='+moneda,DataType:'json'}).jsonDatos;
		var simbolo 	= $('#moneda option:selected').data('simbolo');

		if(jsonDatos[0].VENCIDO1){
			for (var i = 0; i < jsonDatos.length; i++) {
				jsonDatos[i].contador = i;
				jsonDatos[i].VENCIDO1 = (jsonDatos[i].VENCIDO1 == 0) ? '' : SalesUp.Sistema.moneda({moneda:simbolo, numero:jsonDatos[i].VENCIDO1});
				jsonDatos[i].VENCIDO2 = (jsonDatos[i].VENCIDO2 == 0) ? '' : SalesUp.Sistema.moneda({moneda:simbolo, numero:jsonDatos[i].VENCIDO2});
				jsonDatos[i].VENCIDO3 = (jsonDatos[i].VENCIDO3 == 0) ? '' : SalesUp.Sistema.moneda({moneda:simbolo, numero:jsonDatos[i].VENCIDO3});
				jsonDatos[i].VENCIDO4 = (jsonDatos[i].VENCIDO4 == 0) ? '' : SalesUp.Sistema.moneda({moneda:simbolo, numero:jsonDatos[i].VENCIDO4});
				jsonDatos[i].TOTAL 	  = (jsonDatos[i].TOTAl == 0) ? '' : SalesUp.Sistema.moneda({moneda:simbolo, numero:jsonDatos[i].TOTAL});
			};
		}
		
		var templateHeader 	= '<tr>{{#each Titulos}}<td class="tCen {{CLASE}}">{{TITULO}}</td>{{/each}}</tr>';
		var templateCuerpo	= '<tr>'
								+'	<td><input type="hidden" id="{{contador}}" class="titulo" value="{{TITULO}}">{{TITULO}}</td>'
								+'	<td class="tCen sietedias_{{contador}} sumaTotal" data-dato="{{VENCIDO1}}" data-sietedias="{{VENCIDO1}}"><a href="/privado/reportes_sin_seguimiento_detalle.dbsp?vista='+vista+'&periodo=1&moneda='+moneda+'&parametros={{Parametros}}"><span class="">{{VENCIDO1}}</span></a></td>'
								+'	<td class="tCen quincedias_{{contador}} sumaTotal" data-dato="{{VENCIDO2}}" data-quincedias="{{VENCIDO2}}"><a href="/privado/reportes_sin_seguimiento_detalle.dbsp?vista='+vista+'&periodo=2&moneda='+moneda+'&parametros={{Parametros}}"><span class="">{{VENCIDO2}}</span></a></td>'
								+'	<td class="tCen veintidosdias_{{contador}} sumaTotal" data-dato="{{VENCIDO3}}" data-veintidosdias="{{VENCIDO3}}"><a href="/privado/reportes_sin_seguimiento_detalle.dbsp?vista='+vista+'&periodo=3&moneda='+moneda+'&parametros={{Parametros}}"><span class="">{{VENCIDO3}}</span></a></td>'
								+'	<td class="tCen veintiochodias_{{contador}} sumaTotal" data-dato="{{VENCIDO4}}" data-veintiochodias="{{VENCIDO4}}"><a href="/privado/reportes_sin_seguimiento_detalle.dbsp?vista='+vista+'&periodo=4&moneda='+moneda+'&parametros={{Parametros}}"><span class="">{{VENCIDO4}}</span></a></td>'
								+'	<td class="tCen sumaTotal" data-dato="{{TOTAL}}"><a href="/privado/reportes_sin_seguimiento_detalle.dbsp?vista='+vista+'&periodo=5&moneda='+moneda+'&parametros={{Parametros}}"><span class="">{{TOTAL}}</span></a></td>'
								+'</tr>'
		var htmlColumnas 	= SalesUp.Construye.ReemplazaDatos({Template:templateHeader,Datos:{"Titulos":jsonHeader}});

		SalesUp.Construye.ConstruyeTabla(htmlColumnas, templateCuerpo, jsonDatos, {Destino:'#CargaDatos', Id:'ReportTable'} );
		SalesUp.Variables.CrearTotales();
		cargaGrafica();

		SalesUp.Sistema.OcultarOverlay();
	  	SalesUp.Sistema.OcultaEspera();
	}, 100);
}

SalesUp.Variables.CargaFiltros = function(){
	SalesUp.Sistema.CargaDatos({Link:'/privado/ajax/filtrosReportes.dbsp',Parametros:'idpantalla='+SalesUp.Variables.Idpantalla,Destino:'#ListaFiltros'});

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

		var selectMultimoneda = '<label for="moneda">Moneda:</label><select name="moneda" id="moneda" onChange="SalesUp.Variables.CargaReportePeriodo();">'+opciones+'</select>';

		$('#filtros').append(selectMultimoneda);
	}
};

// On document ready, call visualize on the datatable.
$(document).ready(function() {
	SalesUp.Variables.CargaFiltros();

	var filtro = localStorage.getItem('filtroOpSinSeguimiento');
	
	if(SalesUp.Valida.esJson(filtro)){
		var filtroCargado = JSON.parse(filtro);

		$('#FiltroDetalleReportes').val(filtroCargado.Vista);
		$('#moneda').val(filtroCargado.Moneda);
	}

	setTimeout(function(){SalesUp.Variables.CargaReportePeriodo();}, 100);
});

