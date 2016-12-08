Handlebars.registerHelper('ColorReemplazo', function(color, colorFinal) {
  	var colorFinal = '';
  	
  	if(color == 'Verde'){
  		colorFinal = '<a href="#" class="certezaalta tCen" title="Certeza Alta"></a>';
  	}else if(color == 'Amarillo'){
  		colorFinal = '<a href="#" class="certezamedia tCen" title="Certeza Media"></a>';
  	}else if(color == 'Rojo'){
  		colorFinal = '<a href="#" class="certezabaja tCen" title="Certeza Baja">';
  	}

  	return colorFinal;
});

function meses(parseo){
	var valor =   SalesUp.Sistema.MonedaANumero(parseo);
	return valor;
}
 
Highcharts.visualize = function(options) { 
		// the categories
		options.xAxis.categories = [];
		$('thead td.proba').each( function(i) {		
			if (i>0){	
				options.xAxis.categories.push(this.innerHTML);
			}	
		});		
		// the data series
		var probabilidad ="";
		options.series = [];
		
		$('.titulo').each( function(j) {
			var arrayValores	= [];
			var valor 			= $(this).attr('id');
			
			arrayValores.push(meses($('.vencido_'+valor).attr('data-vencidos')));

			$('.datos'+valor).each(function(i){
				var $td = $(this);
				arrayValores.push(meses($td.attr('data-dato')));
			});

			arrayValores.push(meses($('.futuros_'+valor).attr('data-futuros')));

			probabilidad 	= $(this).val();

			options.series[j] = { 
				name: probabilidad,
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
		colors: ['#00FF00', '#F7FE2E','#DF0101' ],
		title: {
			text: 'Presupuesto de Ventas',
			
		},
		subtitle: {
			text: 'Probabilidad',
			
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
					'Probabilidad ('+this.series.name+'), '+ SalesUp.Sistema.MonedaANumero(this.y);
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

	$('#ReportTable').append('<tfoot><tr class="Totales"><td class="tDer" colspan="2">Totales</td></tr></tfoot>');

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
			Periodo : $('#Periodo').val(),
			Vista 	: $('#FiltroDetalleReportes').val()
		};
		var moneda = '';

		if(SalesUp.Variables.Multimoneda == 1){
			filtroNuevo.Moneda 	= $('#moneda').val();
			moneda 				= $('#moneda').val();
		}

		localStorage.setItem('filtroEstimacion',JSON.stringify(filtroNuevo));

		var periodo 	= $('#Periodo').val();
		var vista		= $('#FiltroDetalleReportes').val();

		if(vista == 1){
			$('#grupos').show();
			var grupo = $('#FiltroDetalleReportes2').val();
		}else{
			$('#grupos').hide();
			var grupo = 0;
		}

		var jsonHeader 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosReporteEstimacion.dbsp', Parametros:'vista='+vista+'&tipoReporte='+periodo+'&tipo='+0+'&grupo='+grupo+'&moneda='+moneda,DataType:'json'}).jsonDatos;
		var jsonDatos 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosReporteEstimacion.dbsp', Parametros:'vista='+vista+'&tipoReporte='+periodo+'&tipo='+1+'&grupo='+grupo+'&moneda='+moneda,DataType:'json'}).jsonDatos;
		var simbolo 	= $('#moneda option:selected').data('simbolo');
		for (var i = 0; i < jsonDatos.length; i++) {
			jsonDatos[i].DatosAux 	= [];
			jsonDatos[i].contador	= i;
			var arrayValores 		= jsonDatos[i].AUX;
			for (var j = 0; j < arrayValores; j++) {
				jsonDatos[i].DatosAux.push({'Dato':SalesUp.Sistema.moneda({moneda:simbolo, numero:jsonDatos[i]['Dato'+j]})});
			};

			jsonDatos[i]['Vencidos'] = SalesUp.Sistema.moneda({moneda:simbolo, numero:jsonDatos[i]['Vencidos']});
			jsonDatos[i]['Futuros'] = SalesUp.Sistema.moneda({moneda:simbolo, numero:jsonDatos[i]['Futuros']});
			jsonDatos[i]['Total'] = SalesUp.Sistema.moneda({moneda:simbolo, numero:jsonDatos[i]['Total']});
		};
		
		var templateHeader 	= '<tr>{{#each Titulos}}<td class="tCen {{CLASE}}">{{TITULO}}</td>{{/each}}</tr>';
		var templateCuerpo	= '<tr>'
								+'	<td class="tCen">{{#ColorReemplazo Color}}{{colorFinal}}{{/ColorReemplazo}}</td>'
								+'	<td class="tCen"><input type="hidden" id="{{contador}}" class="titulo" value="{{Titulo}}">{{Titulo}}</td>'
								+'	<td class="tCen vencido_{{contador}} sumaTotal" data-vencidos="{{Vencidos}}" data-dato="{{Vencidos}}"><a href="/privado/reporteEstimacionDetalle.dbsp?vista='+vista+'&periodo=vencidas&tipoReporte='+periodo+'&moneda='+moneda+'&parametros={{Parametros}}"><span class="">{{Vencidos}}</span></a></td>'
								+'	{{#each DatosAux}}<td class="tCen datos{{../contador}} sumaTotal" data-dato="{{Dato}}"><a href="/privado/reporteEstimacionDetalle.dbsp?vista='+vista+'&periodo={{@index}}&tipoReporte='+periodo+'&moneda='+moneda+'&parametros={{../Parametros}}"><span class="">{{Dato}}</span></a></td>{{/each}}'
								+'	<td class="tCen futuros_{{contador}} sumaTotal" data-dato="{{Futuros}}" data-futuros="{{Futuros}}"><a href="/privado/reporteEstimacionDetalle.dbsp?vista='+vista+'&periodo=futuros&tipoReporte='+periodo+'&moneda='+moneda+'&parametros={{Parametros}}"><span class="">{{Futuros}}</span></a></td>'
								+'	<td class="tCen sumaTotal" data-dato="{{Total}}"><a href="/privado/reporteEstimacionDetalle.dbsp?vista='+vista+'&periodo=total&tipoReporte='+periodo+'&moneda='+moneda+'&parametros={{Parametros}}"><span class="">{{Total}}</span></a></td>'
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

	var filtro = localStorage.getItem('filtroEstimacion');
	
	if(SalesUp.Valida.esJson(filtro)){
		var filtroCargado = JSON.parse(filtro);

		$('#FiltroDetalleReportes').val(filtroCargado.Vista);
		$('#Periodo').val(filtroCargado.Periodo);
		$('#moneda').val(filtroCargado.Moneda);
	}

	setTimeout(function(){SalesUp.Variables.CargaReportePeriodo();}, 100);
});
