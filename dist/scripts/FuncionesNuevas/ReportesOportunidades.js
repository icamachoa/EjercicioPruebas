var reportesOportunidades = function(){

	this.estimacionVentas = function(obj){
		(!obj) ? obj = {}:'';
		var filtro = obj.filtro;
		var objFiltro = JSON.parse(filtro);

		var start = (obj.start) ? obj.start : 1;
		var cargaGrafica = function(Op){

			var  categories= Op.jsonCategories;
			var series = Op.dataSeries;
			$('#graficaReporte').highcharts({
				chart: {
					type: 'column'
				},
				colors: ['#00FF00', '#F7FE2E','#DF0101' ],
				title: {
					text: 'Presupuesto de Ventas'
				},
				subtitle: {
					text: 'Probabilidad'
				},
				xAxis: {
					categories: categories,
					crosshair: true
				},
				yAxis: {
					min: 0,
					title: {
						text: 'Monto'
					}
				},
				tooltip: {
					formatter: function() {
						return ''+
						'Probabilidad ('+this.series.name+'), '+ SalesUp.Sistema.MonedaANumero(this.y);
					}
				},
				plotOptions: {
					column: {
						pointPadding: 0.2,
						borderWidth: 0
					}
				},
				series: series
			});
		}


		var datosEstimacionVentas = function(Op,err){

			var total = Op.jsonTotal[0].TOTAL;
			var tDatosExtra = Op.jsonTotal[0].CDATOS;
			var datos = Op.jsonDatos;
			var tmpBody = '';
			var ltBody = [];
			var jsonCategories = [];
			var jHeader = Op.jsonHeader;
			var tamanioH = _.size(jHeader);
			var tmpHead = '<tr>';
			if(tamanioH > 0){
				for(var je = 0; je<tamanioH; je++){
					var ja = jHeader[je];
					var arrGrafica = {};
					tmpHead += '<th class="tCen '+ja.CLASE+'">'+ja.TITULO+'</th>';
					if(ja.TITULO != '' && ja.TITULO != 'Total' && ja.TITULO != 'Probabilidad' && ja.TITULO != 'Ejecutivo' && ja.TITULO != 'Grupo/Departamento' && ja.TITULO != 'Linea producto' && ja.TITULO != 'Origen' && ja.TITULO != 'Pais' && ja.TITULO != 'Región' && ja.TITULO != 'Ciudad'){
						jsonCategories.push(ja.TITULO);
					}
				}
			}
			tmpHead += '</tr>';
			tmpBody = '<tr>';
			tmpBody += '<td class="tCen">{{hlpColorCerteza Color}}</td>';
			tmpBody += '<td class="tCen"><input type="hidden" id="{{contador}}" class="titulo" value="{{Titulo}}">{{Titulo}}</td>';
			tmpBody += '<td class="tCen vencido_{{contador}} sumaTotal" data-vencidos="{{Vencidos}}" data-dato="{{Vencidos}}"><a href="/privado/reporteEstimacionDetalle.dbsp?tkm='+objFiltro.moneda+'&tiporeporte='+objFiltro.periodicidad+'&tipovariante='+objFiltro.tipoVariante+'&variante='+objFiltro.laVariante+'&periodo=vencidas&parametros={{Parametros}}"><span class="pointer">{{hlp_Simbolo_Moneda Vencidos simbolo}}</span></a></td>';
			for(var x = 0; x < tDatosExtra; x++){
				tmpBody += '<td class="tCen datos{{contador}} sumaTotal" data-dato="{{Dato'+x+'}}"><a href="/privado/reporteEstimacionDetalle.dbsp?tkm='+objFiltro.moneda+'&tiporeporte='+objFiltro.periodicidad+'&tipovariante='+objFiltro.tipoVariante+'&variante='+objFiltro.laVariante+'&periodo='+x+'&parametros={{Parametros}}"><span class="pointer">{{hlp_Simbolo_Moneda Dato'+x+' simbolo}}</span></a></td>';
			}
			tmpBody += '<td class="tCen futuros_{{contador}} sumaTotal" data-dato="{{Futuros}}" data-futuros="{{Futuros}}"><a href="/privado/reporteEstimacionDetalle.dbsp?tkm='+objFiltro.moneda+'&tiporeporte='+objFiltro.periodicidad+'&tipovariante='+objFiltro.tipoVariante+'&variante='+objFiltro.laVariante+'&periodo=futuros&parametros={{Parametros}}"><span class="">{{hlp_Simbolo_Moneda Futuros simbolo}}</span></a></td>';
			tmpBody += '<td class="tCen sumaTotal" data-dato="{{Total}}"><a href="/privado/reporteEstimacionDetalle.dbsp?tkm='+objFiltro.moneda+'&tiporeporte='+objFiltro.periodicidad+'&tipovariante='+objFiltro.tipoVariante+'&variante='+objFiltro.laVariante+'&periodo=total&parametros={{Parametros}}"><span class="">{{hlp_Simbolo_Moneda Total simbolo}}</span></a></td>';
			tmpBody += '</tr>';

			var dataSeries = [];

			if(total > 0){
				for(var je = 0; je < _.size(datos); je++){
					var ja = datos[je];
					var arrBody = {};
					arrBody.contador = je;
					arrBody.simbolo = ja.MonedaSimbolo;
					arrBody.Color = ja.Color;
					arrBody.Titulo = ja.Titulo;
					arrBody.Vencidos = ja.Vencidos;
					arrBody.Parametros = ja.Parametros;
					for(var x = 0; x < tDatosExtra; x++){
						var dato = 'Dato'+x;
						arrBody[dato] = ja[dato];
					}
					arrBody.Futuros = ja.Futuros;
					arrBody.Total = ja.Total
					ltBody.push(arrBody);

					var laSerie = {};
					laSerie.name = ja.Titulo;
					laSerie.data = [];
					dataSeries.push(laSerie);
				}
			}


			var jsonSeries = [];
			var arrSeries = {};


			for(var ls=0;ls<dataSeries.length;ls++){

				var arrVencidos = _.pluck(datos, 'Vencidos');
				dataSeries[ls].data.push(parseFloat(arrVencidos[ls]));
				for(var x = 0; x < tDatosExtra; x++){
					var arrDato = _.pluck(datos, 'Dato'+x);
					dataSeries[ls].data.push(parseFloat(arrDato[ls]));

				}

				var arrFutoros = _.pluck(datos, 'Futuros');
				dataSeries[ls].data.push(parseFloat(arrFutoros[ls]));

			}

			cargaGrafica({jsonCategories,dataSeries});

			SalesUp.Construye.ConstruyeTabla(tmpHead,tmpBody,ltBody,{Destino:'#DatosLoad',Id:'ReportTable'});
			var $tabla = $('#ReportTable');
			SalesUp.reportes.paginacion({registros:total,start:start,callback:SalesUp.reportes.oportunidades.estimacionVentas,tabla:$tabla,parametros:filtro});
		}

		SalesUp.Sistema.CargaDatosAsync({
			link:'/privado/Modelo/jsonReporteEstimacionData.dbsp',
			parametros:'filtros='+filtro+'&inicio='+start,
			callback:datosEstimacionVentas
		});

	}

	this.reporteOportunidadesSinSeguimiento = function(obj){

		(!obj) ? obj = {}:'';
		var filtro = obj.filtro;
		var objFiltro = JSON.parse(filtro);

		var start = (obj.start) ? obj.start : 1;

		var construyeGrafica = function(Obj,moneda){
			$('#graficaReporte').highcharts({
				chart: {
					type: 'column'
				},
				title: {
					text: 'Oportunidades sin seguimiento'
				},
				xAxis: {
					categories: [
					'7-14 Días',
					'15-21 Días',
					'22-28 Días',
					'28+ Días'
					],
					crosshair: true
				},
				yAxis: {
					min: 0,
					title: {
						text: 'Monto'
					}
				},
				tooltip: {
					headerFormat: '<span style="font-size:10px"><h3>{point.key}</h3></span><table>',
					pointFormatter: function(){
						return '<tr><td style="color:'+this.series.color+';padding:0"><b>'+this.series.name+': </b></td><td style="text-align:right;padding:0"><b> '+SalesUp.Sistema.moneda({moneda:moneda, numero:this.y})+'</b></td></tr>'
					},
					footerFormat: '</table>',
					shared: true,
					useHTML: true
				},
				plotOptions: {
					column: {
						pointPadding: 0.0,
						borderWidth: 0
					}
				},
				series: Obj
			}); 
		}
		var muestraReporteOSS = function(Op,err,args){

			var jsonDatos     = SalesUp.Sistema.clone(Op.jsonDatos)

			var jsonDatos2    = SalesUp.Sistema.clone(Op.jsonDatos) 


			j = _.map(jsonDatos2, function(value,index){
				O = {}
				O.name = (value.EJECUTIVO) ? value.EJECUTIVO: (value.GRUPO) ? value.GRUPO: (value.LINEA_PRODUCTO) ? value.LINEA_PRODUCTO : (value.ORIGEN) ? value.ORIGEN : (value.PAIS) ? value.PAIS :(value.TITULO) ? value.TITULO :(value.CIUDAD) ? value.CIUDAD :(value.EJECUTIVO) ? value.EJECUTIVO : (value.FASE) ? value.FASE : (value.ETIQUETA) ? value.ETIQUETA: ''
				''
				O.data = [parseFloat(value.VENCIDO1),parseFloat(value.VENCIDO2),parseFloat(value.VENCIDO3),parseFloat(value.VENCIDO4)]
				return O
			})



			var Total         = Op.jInfo.Total
			var vista         = parseInt(Op.jInfo.Agrupacion)
			var moneda        = Op.jInfo.Moneda
			var simbolomoneda = Op.jInfo.Simbolo

			moneda        = (moneda != '') ? moneda: 0
			simbolomoneda = (moneda != '') ? simbolomoneda: SalesUp.Sistema.Almacenamiento({a:'SysSimboloMonedaDefault'})

			if(jsonDatos[0].VENCIDO1){
				for (var i = 0; i < jsonDatos.length; i++) {
					jsonDatos[i].contador = i;
					jsonDatos[i].VENCIDO1 = (jsonDatos[i].VENCIDO1 == 0) ? '' : SalesUp.Sistema.moneda({moneda:simbolomoneda, numero:jsonDatos[i].VENCIDO1});
					jsonDatos[i].VENCIDO2 = (jsonDatos[i].VENCIDO2 == 0) ? '' : SalesUp.Sistema.moneda({moneda:simbolomoneda, numero:jsonDatos[i].VENCIDO2});
					jsonDatos[i].VENCIDO3 = (jsonDatos[i].VENCIDO3 == 0) ? '' : SalesUp.Sistema.moneda({moneda:simbolomoneda, numero:jsonDatos[i].VENCIDO3});
					jsonDatos[i].VENCIDO4 = (jsonDatos[i].VENCIDO4 == 0) ? '' : SalesUp.Sistema.moneda({moneda:simbolomoneda, numero:jsonDatos[i].VENCIDO4});
					jsonDatos[i].TOTAL    = (jsonDatos[i].TOTAl == 0) ? '' : SalesUp.Sistema.moneda({moneda:simbolomoneda, numero:jsonDatos[i].TOTAL});
				};
			}
			function getTemplate(hof,vista,moneda){
				var body = '<tr>'
				+'  <td><b>{{nFila}}</b></td>'
				var head = '<tr><td>#</td>';

				switch (vista){
					case 1:
					head = head+'<td class="tCen">Ejecutivo</td>'
					body = body+'  <td><input type="hidden" id="{{contador}}" class="titulo" value="{{EJECUTIVO}}">{{EJECUTIVO}}</td>'
					break;
					case 2:
					head = head+'<td>Grupo/Departamento</td>'
					body = body+'  <td><input type="hidden" id="{{contador}}" class="titulo" value="{{GRUPO}}">{{GRUPO}}</td>'
					break;
					case 3:
					head = head+'<td>Linea</td>'
					body = body+'  <td><input type="hidden" id="{{contador}}" class="titulo" value="{{LINEA_PRODUCTO}}">{{LINEA_PRODUCTO}}</td>'
					break;
					case 4:
					head = head+'<td>Origen</td>'
					body = body+'  <td><input type="hidden" id="{{contador}}" class="titulo" value="{{ORIGEN}}">{{ORIGEN}}</td>'
					break;
					case 5:
					head = head +'<td>País</td>'
					body = body+'  <td><input type="hidden" id="{{contador}}" class="titulo" value="{{PAIS}}">{{PAIS}}</td>'
					break;
					case 6:
					head = head+'<td>Región</td>'
					body = body+'  <td><input type="hidden" id="{{contador}}" class="titulo" value="{{TITULO}}">{{TITULO}}</td>'
					break;
					case 7:
					head = head+'<td>Ciudad</td>'
					body = body+'  <td><input type="hidden" id="{{contador}}" class="titulo" value="{{CIUDAD}}">{{CIUDAD}}</td>'
					break;
					case 11:
					head = head+'<td>Etiqueta</td>'
					body = body+'<td><input type="hidden" id="{{contador}}" class="titulo" value="{{ETIQUETA}}">{{ETIQUETA}}</td>'
					break;
					case 12:
					head = head+'<td>FASE</td>'
					body = body+'<td><input type="hidden" id="{{contador}}" class="titulo" value="{{FASE}}">{{FASE}}</td>'
					break;
					default: 
					head = head+'<td>Ejecutivo</td>'
					body = body+'  <td><input type="hidden" id="{{contador}}" class="titulo" value="{{EJECUTIVO}}">{{EJECUTIVO}}</td>'
					break;
				}
				head = head +'<td class="tCen">7-14 Días</td>'
				+'<td class="tCen">15-21 Días</td>'
				+'<td class="tCen">22-28 Días</td>'
				+'<td class="tCen">28+ Días</td>'
				+'<td class="tCen">Total</td>'
				body = body +'  <td class="tCen sietedias_{{contador}} sumaTotal" data-dato="{{VENCIDO1}}" data-sietedias="{{VENCIDO1}}"><a href="/privado/reportes_sin_seguimiento_detalle.dbsp?vista='+vista+'&periodo=1&moneda='+moneda+'&parametros={{hlpParametros '+vista+'}}"><span class="">{{VENCIDO1}}</span></a></td>'
				+'  <td class="tCen quincedias_{{contador}} sumaTotal" data-dato="{{VENCIDO2}}" data-quincedias="{{VENCIDO2}}"><a href="/privado/reportes_sin_seguimiento_detalle.dbsp?vista='+vista+'&periodo=2&moneda='+moneda+'&parametros={{hlpParametros '+vista+'}}"><span class="">{{VENCIDO2}}</span></a></td>'
				+'  <td class="tCen veintidosdias_{{contador}} sumaTotal" data-dato="{{VENCIDO3}}" data-veintidosdias="{{VENCIDO3}}"><a href="/privado/reportes_sin_seguimiento_detalle.dbsp?vista='+vista+'&periodo=3&moneda='+moneda+'&parametros={{hlpParametros '+vista+'}}"><span class="">{{VENCIDO3}}</span></a></td>'
				+'  <td class="tCen veintiochodias_{{contador}} sumaTotal" data-dato="{{VENCIDO4}}" data-veintiochodias="{{VENCIDO4}}"><a href="/privado/reportes_sin_seguimiento_detalle.dbsp?vista='+vista+'&periodo=4&moneda='+moneda+'&parametros={{hlpParametros '+vista+'}}"><span class="">{{VENCIDO4}}</span></a></td>'
				+'  <td class="tCen sumaTotal" data-dato="{{TOTAL}}"><a href="/privado/reportes_sin_seguimiento_detalle.dbsp?vista='+vista+'&periodo=5&moneda='+moneda+'&parametros={{hlpParametros '+vista+'}}"><span class="">{{TOTAL}}</span></a></td>'
				+'</tr>' 

				if (hof) {
					return body
				}
				return head

			}

			var templateCuerpo = getTemplate(1,vista,moneda)
			var templateHead   = getTemplate(0,vista,moneda)
			if(Total > 0){
				construyeGrafica(j,simbolomoneda)
			}else{
				$('#graficaReporte').html('')
			}
			//SalesUp.Construye.ConstruyeTabla(templateHead, templateCuerpo, jsonDatos, {Destino:'#DatosLoad', Id:'ReportTable',PagActual:SalesUp.Sistema.paginaActual(),NumRegistros:Total} );
			SalesUp.Construye.ConstruyeTabla(templateHead, templateCuerpo, jsonDatos, {Destino:'#DatosLoad', Id:'ReportTable',PagActual:start} );
			var $tabla = $('#ReportTable');
			SalesUp.reportes.paginacion({registros:Total,start:start,callback:SalesUp.reportes.oportunidades.reporteOportunidadesSinSeguimiento,tabla:$tabla,parametros:filtro});
		}

		var $lasVariantes = $('#lasVariantes'), $laVariante = $('#laVariante'), $laOpcion = $laVariante.find('option:selected');
		var tipoVariante = $laOpcion.attr('data-sistema');
		var qryString = 'tkrs='+SalesUp.Variables.tkrs+'&tipoVariante='+tipoVariante+'&'+SalesUp.Sistema.qryString({Formulario:$lasVariantes})+'&inicia='+start;

		SalesUp.Sistema.CargaDatosAsync({
			link:'/privado/Modelo/jsonDatosOpSinSeguimientoMejorado.dbsp',
			prmAdicionales:qryString,
			parametros:qryString,
			callback:muestraReporteOSS
		})
	}
}