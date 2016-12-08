var markerImageSvg='';

var reporteActividades = function(){

	this.reportePorPeriodo = function(obj){
		(!obj) ? obj = {}:'';
		var filtro = obj.filtro;
		var data = JSON.parse(filtro);
 		var start = (obj.start) ? obj.start : 1;
 		SalesUp.Variables.jAsd = data.filtros;
		var muestraReporteActividades = function(Op,err){
			SalesUp.Variables.DatosRecibidos = SalesUp.Sistema.clone(Op);
			var totalRegistros = Op.jsonTotal[0].TOTALN;
			var agrupar = Op.jsonTotal[0].AGRUPAR;
			var clm1Name ='Ejecutivo';
			var reporteDesde = $('#reporteDesde').val();
			var reporteHasta = $('#reporteHasta').val();
			reporteDesde = (reporteDesde)?reporteDesde:'';
			reporteHasta = (reporteHasta)?reporteHasta:'';
			var criterioperiodo = $('#criterioperiodo').val();
			criterioperiodo = (criterioperiodo)?criterioperiodo:0;
			if(agrupar == 2){
				clm1Name = 'Grupo';
			}
			var tmpHead = '<tr class="par">';
			tmpHead += '<th style="width: 5px;">';
			tmpHead += '</th>';
			tmpHead += '<th style="width: 100px;">'+clm1Name+'</th>';
			tmpHead += '<th style="width: 20px;">Nuevos</th>';
			tmpHead += '<th style="width: 20px;">Asignados</th>';
			tmpHead += '<th style="width: 20px;">Descartados</th>';
			tmpHead += '<th style="width: 20px;">Oportunidades nuevas</th>';
			tmpHead += '<th style="width: 20px;">Oportunidades descartadas</th>';
			tmpHead += '<th style="width: 20px;">Ventas</th>';
			tmpHead += '<th style="width: 20px;">Seguimientos</th>';
			tmpHead += '<th style="width: 20px;">Seguimiento post-venta</th>';
			tmpHead += '</tr>';
			var tmpBody = '<tr>';
			tmpBody += '<td class="centrado"><b>{{num}}</b></td>';
			tmpBody += '<td>{{Ejecutivo}}</td>';
			tmpBody += '<td class="centrado"><a href="{{hlpLinkActividadesPeriodo \''+reporteDesde+'\' \''+reporteHasta+'\' '+agrupar+' '+criterioperiodo+' Nuevos '+1+'}}"><b>{{hlpEsCero Nuevos}}</b></a></td>';
			tmpBody += '<td class="centrado"><a href="{{hlpLinkActividadesPeriodo \''+reporteDesde+'\' \''+reporteHasta+'\' '+agrupar+' '+criterioperiodo+' Asignados '+2+'}}"><b>{{hlpEsCero Asignados}}</b></a></td>';
			tmpBody += '<td class="centrado"><a href="{{hlpLinkActividadesPeriodo  \''+reporteDesde+'\' \''+reporteHasta+'\' '+agrupar+' '+criterioperiodo+' Descartados '+3+'}}"><b>{{hlpEsCero Descartados}}</b></a></td>';
			tmpBody += '<td class="centrado"><a href="{{hlpLinkActividadesPeriodo  \''+reporteDesde+'\' \''+reporteHasta+'\' '+agrupar+' '+criterioperiodo+' OpNuevas '+4+'}}"><b>{{hlpEsCero OpNuevas}}</b></a></td>';
			tmpBody += '<td class="centrado"><a href="{{hlpLinkActividadesPeriodo  \''+reporteDesde+'\' \''+reporteHasta+'\' '+agrupar+' '+criterioperiodo+' OpDescartadas '+5+'}}"><b>{{hlpEsCero OpDescartadas}}</b></a></td>';
			tmpBody += '<td class="centrado"><a href="{{hlpLinkActividadesPeriodo  \''+reporteDesde+'\' \''+reporteHasta+'\' '+agrupar+' '+criterioperiodo+' Ventas '+6+'}}"><b>{{hlpEsCero Ventas}}</b></a></td>';
			tmpBody += '<td class="centrado"><a href="{{hlpLinkActividadesPeriodo  \''+reporteDesde+'\' \''+reporteHasta+'\' '+agrupar+' '+criterioperiodo+' Seguimiento '+7+'}}"><b>{{hlpEsCero Seguimiento}}</b></a></td>';
			tmpBody += '<td class="centrado"><a href="{{hlpLinkActividadesPeriodo  \''+reporteDesde+'\' \''+reporteHasta+'\' '+agrupar+' '+criterioperiodo+' SeguimientoPV '+8+'}}"><b>{{hlpEsCero SeguimientoPV}}</b></a></td>';
			tmpBody += '</tr>';
			var fecha_ini = Op.jsonTotal[0].FECHA_DESDE.split(" ");
			var fecha_fin = Op.jsonTotal[0].FECHA_HASTA.split(" ");
			var jsonReporteActividades = Op.jsonDatos;
			var ltReporte = [];
			if(totalRegistros){
				for(var je=0;je <_.size(jsonReporteActividades);je++){
					var arrReporte = {};
					var ja = jsonReporteActividades[je];
					arrReporte.num = je+1;
					if(agrupar == 2){arrReporte.tk = ja.TK;}else{arrReporte.tk = ja.TKU;}
					if(agrupar == 2){arrReporte.Ejecutivo=ja.GRUPO}else{arrReporte.Ejecutivo = ja.EJECUTIVO;}
					arrReporte.Nuevos = ja.PROSPECTOS_CREADOS;
					arrReporte.Asignados = ja.PROSPECTOS_ASIGNADOS;
					arrReporte.Descartados = ja.PROSPECTOS_DESCARTADOS;
					arrReporte.OpNuevas = ja.OPORTUNIDADES_NUEVAS;
					arrReporte.OpDescartadas = ja.OPORTUNIDADES_PERDIDAS;
					arrReporte.Seguimiento = ja.SEGUIMIENTOS;
					arrReporte.Ventas = ja.VENTAS_NUEVAS;
					arrReporte.SeguimientoPV = ja.SEGUIMIENTOS_CLIENTES;
					ltReporte.push(arrReporte);
				}
			}

			var jsonGrafica = [];
			var arrGrafica = {};
			var arrSeries = {}
			arrGrafica.usuarios = _.pluck(ltReporte,'Ejecutivo');
			arrGrafica.series =[{
				name: 'Seguimientos post-venta',
				tk: _.pluck(ltReporte,'tk'),
				data: _.pluck(ltReporte,'SeguimientoPV')
			},{
				name: 'Seguimientos',
				tk: _.pluck(ltReporte,'tk'),
				data: _.pluck(ltReporte,'Seguimiento')
			},{
				name: 'Ventas',
				tk: _.pluck(ltReporte,'tk'),
				data: _.pluck(ltReporte,'Ventas')
			},{
				name: 'Oportunidades Descartadas',
				tk: _.pluck(ltReporte,'tk'),
				data: _.pluck(ltReporte,'OpDescartadas')
			},{
				name: 'Oportunidades Nuevas',
				tk: _.pluck(ltReporte,'tk'),
				data: _.pluck(ltReporte,'OpNuevas')
			},{
				name: 'Descartados',
				tk: _.pluck(ltReporte,'tk'),
				data: _.pluck(ltReporte,'Descartados')
			},{
				name: 'Asignados',
				tk: _.pluck(ltReporte,'tk'),
				data: _.pluck(ltReporte,'Asignados')
			},{
				name: 'Nuevos',
				tk: _.pluck(ltReporte,'tk'),
				data: _.pluck(ltReporte,'Nuevos')
			}];
			jsonGrafica.push(arrGrafica);


			var totalesSumados = SalesUp.Sistema.sumaColumna(jsonReporteActividades,[{columna:'PROSPECTOS_CREADOS'},{columna:'PROSPECTOS_ASIGNADOS'},{columna:'PROSPECTOS_DESCARTADOS'},{columna:'OPORTUNIDADES_NUEVAS'},{columna:'OPORTUNIDADES_PERDIDAS'},{columna:'VENTAS_NUEVAS'},{columna:'SEGUIMIENTOS'},{columna:'SEGUIMIENTOS_CLIENTES'}]);
 			var laSuma = totalesSumados.PROSPECTOS_ASIGNADOS + totalesSumados.PROSPECTOS_CREADOS + totalesSumados.PROSPECTOS_DESCARTADOS + totalesSumados.OPORTUNIDADES_PERDIDAS + totalesSumados.OPORTUNIDADES_NUEVAS + totalesSumados.SEGUIMIENTOS + totalesSumados.SEGUIMIENTOS_CLIENTES + totalesSumados.VENTAS_NUEVAS;
 
 			if (laSuma < 1) {
 				ltReporte = [];
 			}
 			SalesUp.Construye.ConstruyeTabla(tmpHead,tmpBody,ltReporte,{Destino:'#DatosLoad',Id:'ReportTable', elInicio:start});
			var laVariante = $('#laVariante').val();
			var TotalizarE = _.where(SalesUp.Variables.jsonInfoReportes.variantes,{tkRsv:laVariante});
			var Totalizar = TotalizarE[0].totalizar;
			if((Totalizar === null || Totalizar === 1) && Totalizar != 0){
				var tmpFoot = '';
				tmpFoot += '<tr class="elTotal"><td></td><td class="tDer">Totales</td>';
				tmpFoot += '<td class="tCen">'+totalesSumados.PROSPECTOS_CREADOS+'</td>';
				tmpFoot += '<td class="tCen">'+totalesSumados.PROSPECTOS_ASIGNADOS+'</td>';
				tmpFoot += '<td class="tCen">'+totalesSumados.PROSPECTOS_DESCARTADOS+'</td>';
				tmpFoot += '<td class="tCen">'+totalesSumados.OPORTUNIDADES_NUEVAS+'</td>';
				tmpFoot += '<td class="tCen">'+totalesSumados.OPORTUNIDADES_PERDIDAS+'</td>';
				tmpFoot += '<td class="tCen">'+totalesSumados.VENTAS_NUEVAS+'</td>';
				tmpFoot += '<td class="tCen">'+totalesSumados.SEGUIMIENTOS+'</td>';
				tmpFoot += '<td class="tCen">'+totalesSumados.SEGUIMIENTOS_CLIENTES+'</td>';
				tmpFoot += '</tr>';
				$('#ReportTable tfoot').html(tmpFoot);
			}else if(Totalizar == 2){
				var tmpFoot = '';
				tmpFoot += '<tr class="elTotal"><td></td><td class="tDer">Promedios</td>';
				tmpFoot += '<td class="tCen">'+SalesUp.Sistema.numeroConDecimal(totalesSumados.PROSPECTOS_CREADOS/_.size(Op.jsonDatos))+'</td>';
				tmpFoot += '<td class="tCen">'+SalesUp.Sistema.numeroConDecimal(totalesSumados.PROSPECTOS_ASIGNADOS/_.size(Op.jsonDatos))+'</td>';
				tmpFoot += '<td class="tCen">'+SalesUp.Sistema.numeroConDecimal(totalesSumados.PROSPECTOS_DESCARTADOS/_.size(Op.jsonDatos))+'</td>';
				tmpFoot += '<td class="tCen">'+SalesUp.Sistema.numeroConDecimal(totalesSumados.OPORTUNIDADES_NUEVAS/_.size(Op.jsonDatos))+'</td>';
				tmpFoot += '<td class="tCen">'+SalesUp.Sistema.numeroConDecimal(totalesSumados.OPORTUNIDADES_PERDIDAS/_.size(Op.jsonDatos))+'</td>';
				tmpFoot += '<td class="tCen">'+SalesUp.Sistema.numeroConDecimal(totalesSumados.VENTAS_NUEVAS/_.size(Op.jsonDatos))+'</td>';
				tmpFoot += '<td class="tCen">'+SalesUp.Sistema.numeroConDecimal(totalesSumados.SEGUIMIENTOS/_.size(Op.jsonDatos))+'</td>';
				tmpFoot += '<td class="tCen">'+SalesUp.Sistema.numeroConDecimal(totalesSumados.SEGUIMIENTOS_CLIENTES/_.size(Op.jsonDatos))+'</td>';
				tmpFoot += '</tr>';
				$('#ReportTable tfoot').html(tmpFoot);
			}

			var $tabla = $('#ReportTable')

			SalesUp.reportes.paginacion({registros:totalRegistros,start:start,callback:SalesUp.reportes.actividades.reportePorPeriodo,tabla:$tabla,parametros:filtro});

			if (totalRegistros>0 && laSuma > 0){
				creaGrafica({json:jsonGrafica,fecha_desde:data.filtros[0].fecha_desde,fecha_hasta:data.filtros[0].fecha_hasta,agrupar:agrupar,periodo:data.filtros[0].periodo});
			}


		}
		SalesUp.Sistema.CargaDatosAsync({
			link:'/privado/Modelo/jsonReporteActividades.dbsp',
			parametros:'filtros='+filtro+'&inicio='+start,
			callback:muestraReporteActividades
		});
	}
	/*GRAFICA*/
	var creaGrafica = function(Op){
		var datos = Op.json;
		var fecha_hasta = Op.fecha_hasta;
		if (!fecha_hasta){fecha_hasta = '';}
		var fecha_desde = Op.fecha_desde;
		if (!fecha_desde){fecha_desde = '';}

		var tooltip = {
			shared: false,
			formatter: function() {
				return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + this.y + '<br/>' + 'Total: ' + this.point.stackTotal;
			}
		};

		var points = {
			events:{
				click:function(){
					var tipo=0;
					var url='';
					if (this.series.name==='Nuevos'){tipo=1}
					if (this.series.name==='Asignados'){tipo=2}
					if (this.series.name==='Descartados'){tipo=3}
					if (this.series.name==='Oportunidades Nuevas'){tipo=4}
					if (this.series.name==='Oportunidades Descartadas'){tipo=5}
					if (this.series.name==='Ventas'){tipo=6}
					if (this.series.name==='Seguimientos'){tipo=7}
					if (this.series.name==='Seguimientos post-venta'){tipo=8}
					if (tipo>0){
						var href = '/privado/ReporteActividadesDetalle.dbsp?tk='+datos[0].series[0].tk[this.x];
							href +='&fecha_desde='+fecha_desde+'&fecha_hasta='+fecha_hasta;
							href +='&tipo='+tipo+'&agrupar='+Op.agrupar+'&periodo=';
							href +=Op.periodo+'&nombre='+datos[0].usuarios[this.x];
						document.location.href = href;
					}
				}
			}
		};

		SalesUp.reportes.graficaBarra({categorias:datos[0].usuarios, series:datos[0].series, tooltip:tooltip, points:points});

	}/*creaGrafica*/


	/*reporte Descartadas*/
	this.reporteDescartados = function(obj){

		(!obj) ? obj = {}:'';
		var filtro = obj.filtro;
		var data = JSON.parse(filtro);
		var start = (obj.start) ? obj.start : 1;
		var elTipo = $('#criteriodescartados').selected().val();
		var fechadesde = '';
		var fechahasta = '';
		var periodo = $('#criterioperiodo').selected().val();
		if(periodo == 0){
			fechadesde = $('#reporteDesde').val();
			fechahasta = $('#reporteHasta').val();
		}

		var generaReporte = function (Op,err) {
			SalesUp.Variables.DatosRecibidos = SalesUp.Sistema.clone(Op);
			var datos = Op.jsonDatos;
			var total = Op.jsonTotal[0].TOTAL;
			var tipoAgrupacion = Op.jsonTotal[0].TIPOAGRUPACION;
			var tmpHead = '';
			var tmpBody = '';
			var tmpFoot = '';

			tmpHead +='<tr class="par">';
				tmpHead += '<th class="tIzq">Criterio</th>'
				tmpHead += '<th class="tCen">Descart.</th>'
				tmpHead += '<th class="tCen">%</th>'
			tmpHead +='</tr>';

			var jsonGrafica = [];
			var totales = [];
			if (total > 0) {
				if (tipoAgrupacion == 15) {
					totales = SalesUp.Sistema.sumaColumna(datos,[{columna:'PERDIDAS'}]);
					
					tmpBody += '<tr>'
						tmpBody += '<td class="tIzq"><a href="reporteActividadesDescartadosDetalle.dbsp?eltipo='+elTipo+'&fechadesde='+fechadesde+'&fechahasta='+fechahasta+'&periodo='+periodo+'&grupo=0&texto={{RAZONPERDIDA}}&tipotexto={{RAZONPERDIDA}}&tipo=99999999&campo=\'\'&id={{IDRAZONPERDIDA}}&tk=99999999&1keepThis=true&1TB_iframe=true&height=400&width=720">{{RAZONPERDIDA}}</a></td>'
						tmpBody += '<td class="tCen Bold"><a href="reporteActividadesDescartadosDetalle.dbsp?eltipo='+elTipo+'&fechadesde='+fechadesde+'&fechahasta='+fechahasta+'&periodo='+periodo+'&grupo=0&texto={{RAZONPERDIDA}}&tipotexto={{RAZONPERDIDA}}&tipo=99999999&campo=\'\'&id={{IDRAZONPERDIDA}}&tk=99999999&1keepThis=true&1TB_iframe=true&height=400&width=720">{{PERDIDAS}}</a></td>'
						tmpBody += '<td class="tCen">{{hlpPorcentaje PERDIDAS '+totales.PERDIDAS+'}}</td>'
					tmpBody += '</tr>'
					var laVariante = $('#laVariante').val();
					var TotalizarE = _.where(SalesUp.Variables.jsonInfoReportes.variantes,{tkRsv:laVariante});
					var Totalizar = TotalizarE[0].totalizar;
					if((Totalizar === null || Totalizar === 1) && Totalizar != 0){
					tmpFoot += '<tr class="elTotal">';
						tmpFoot += '<td class="tDer">Totales</td>';
						tmpFoot += '<td class="tCen">'+totales.PERDIDAS+'</td>';
						tmpFoot += '<td class="tCen">100%</td>';
					tmpFoot += '</tr>';
					}else if(Totalizar === 2){
					tmpFoot += '<tr class="elTotal">';
						tmpFoot += '<td class="tDer">Promedios</td>';
						tmpFoot += '<td class="tCen">'+SalesUp.Sistema.numeroConDecimal(totales.PERDIDAS/_.size(datos))+'</td>';
						tmpFoot += '<td class="tCen">'+SalesUp.Sistema.numeroConDecimal((100/totales.PERDIDAS)*totales.PERDIDAS/_.size(datos))+'%</td>';
					tmpFoot += '</tr>';
					}else{
						tmpFoot = '';
					}

					for(var x=0;x<_.size(datos);x++){
						var ja = datos[x];
						var arrGrafica = {};
						arrGrafica.name = ja.RAZONPERDIDA;
						arrGrafica.y = ja.PERDIDAS / totales.PERDIDAS;
						jsonGrafica.push(arrGrafica);
					}
				}else{
					var eje = [];
					switch (tipoAgrupacion){
						case 1:
							eje = _.pluck(datos,'TKU');
						break;
						case 2:
							eje = _.pluck(datos,'TK');
						break;
						case 4:
							eje = _.pluck(datos,'IDORIGEN');
						break;
						case 5:
							eje = _.pluck(datos,'IDPAIS');
						break;
						case 6:
							eje = _.pluck(datos,'ESTADO2');
						break;
					}
					eje = _.uniq(eje);
					$('#DatosLoad').html('<div class="hero"></div>')
					for (var aux=0; aux <_.size(eje) ; aux++){
						var jsonData = [];
						var nombre = '';
						var tk = '';
						switch (tipoAgrupacion){
							case 1:
								jsonData = _.where(datos,{TKU:eje[aux]});
								nombre = jsonData[0].EJECUTIVO;
								tk = jsonData[0].TKU;
							break;
							case 2:
								jsonData = _.where(datos,{TK:eje[aux]});
								nombre = jsonData[0].GRUPO;
								tk = jsonData[0].TK;
							break;
							case 4:
								jsonData = _.where(datos,{IDORIGEN:eje[aux]});
								nombre = jsonData[0].ORIGEN;
								tk = jsonData[0].IDORIGEN;
							break;
							case 5:
								jsonData = _.where(datos,{IDPAIS:eje[aux]});
								nombre = jsonData[0].PAIS;
								tk = jsonData[0].IDPAIS;
							break;
							case 6:
								jsonData = _.where(datos,{ESTADO2:eje[aux]});
								nombre = jsonData[0].TITULO;
								tk = jsonData[0].IDESTADO;
							break;
						}
						totales = SalesUp.Sistema.sumaColumna(jsonData,[{columna:'PERDIDAS'}]);
						tmpBody = '';
						tmpFoot = '';
						tmpBody += '<tr>'
							tmpBody += '<td class="tIzq"><a href="reporteActividadesDescartadosDetalle.dbsp?eltipo='+elTipo+'&fechadesde='+fechadesde+'&fechahasta='+fechahasta+'&periodo='+periodo+'&grupo='+tipoAgrupacion+'&texto={{RAZONPERDIDA}}&tipotexto='+nombre+'&tipo='+tk+'&campo=\'\'&id={{IDRAZONPERDIDA}}&tk='+tk+'&1keepThis=true&1TB_iframe=true&height=400&width=720">{{RAZONPERDIDA}}</a></td>'
							tmpBody += '<td class="tCen Bold"><a href="reporteActividadesDescartadosDetalle.dbsp?eltipo='+elTipo+'&fechadesde='+fechadesde+'&fechahasta='+fechahasta+'&periodo='+periodo+'&grupo='+tipoAgrupacion+'&texto={{RAZONPERDIDA}}&tipotexto='+nombre+'&tipo='+tk+'&campo=\'\'&id={{IDRAZONPERDIDA}}&tk='+tk+'&1keepThis=true&1TB_iframe=true&height=400&width=720">{{PERDIDAS}}</a></td>'
							tmpBody += '<td class="tCen">{{hlpPorcentaje PERDIDAS '+totales.PERDIDAS+'}}</td>'
						tmpBody += '</tr>'
						var laVariante = $('#laVariante').val();
						var TotalizarE = _.where(SalesUp.Variables.jsonInfoReportes.variantes,{tkRsv:laVariante});
						var Totalizar = TotalizarE[0].totalizar;
						if((Totalizar === null || Totalizar === 1) && Totalizar != 0){
						tmpFoot += '<tr class="elTotal">';
							tmpFoot += '<td class="tDer">Totales</td>';
							tmpFoot += '<td class="tCen">'+totales.PERDIDAS+'</td>';
							tmpFoot += '<td class="tCen">100%</td>';
						tmpFoot += '</tr>';
						}else if(Totalizar === 2){
						tmpFoot += '<tr class="elTotal">';
							tmpFoot += '<td class="tDer">Promedios</td>';
							tmpFoot += '<td class="tCen">'+SalesUp.Sistema.numeroConDecimal(totales.PERDIDAS/_.size(jsonData))+'</td>';
							tmpFoot += '<td class="tCen">'+SalesUp.Sistema.numeroConDecimal((100/totales.PERDIDAS)*totales.PERDIDAS/_.size(jsonData))+'%</td>';
						tmpFoot += '</tr>';
						}
						jsonGrafica = [];
						for(var x=0;x<_.size(jsonData);x++){
							var ja = jsonData[x];
							var arrGrafica = {};
							arrGrafica.name = ja.RAZONPERDIDA;
							arrGrafica.y = ja.PERDIDAS / totales.PERDIDAS;
							jsonGrafica.push(arrGrafica);
						}
						$('#Esperando').remove();

						$('#DatosLoad div.hero').append('<div id="datos'+aux+'" class="boxReporteDescartados w25"><div id="grafica'+aux+'"></div><div id="tabla'+aux+'"></div></div>');
						SalesUp.Construye.ConstruyeTabla(tmpHead,tmpBody,jsonData,{Destino:'#tabla'+aux+'',Id:'ReportTable'+aux,elInicio:start});
						$('#ReportTable'+aux+' tfoot').addClass('Italic').html(tmpFoot);

						var tooltip = {
							formatter: function() {
									return '<b>'+ this.point.name +'</b>: '+ Math.round(this.percentage) +' % ('+this.point.y+' op.)';
								}
						}

						SalesUp.reportes.graficaPie({'datos':jsonGrafica,'tooltip':tooltip,titulo:nombre,lugar:$('#grafica'+aux+'')});
					}
					$('#DatosLoad div.hero').prepend('<div class="divWidth"></div>');
					$('.hero').masonry({
						itemSelector: '.boxReporteDescartados'
					});
				}
			}

			if (tipoAgrupacion == 15) {
				var tooltip = {
					formatter: function() {
							return '<b>'+ this.point.name +'</b>: '+ Math.round(this.percentage) +' % ('+this.point.y+' op.)';
						}
				}
				SalesUp.Construye.ConstruyeTabla(tmpHead,tmpBody,datos,{Destino:'#DatosLoad',Id:'ReportTable',elInicio:start});
				$('#ReportTable tfoot').addClass('Italic').html(tmpFoot);
				if (total> 0) {
					SalesUp.reportes.graficaPie({'datos':jsonGrafica,'tooltip':tooltip,titulo:null});
				}
			}else{
				if (total <= 0) {
					$('#DatosLoad').html('<table class="BoxSizing" id="SinResultados"><tbody><tr><td><div class="SinResultados BoxSizing w100"><i class="fa fa-info-circle"></i> No se encontraron registros con este criterio</div></td></tr></tbody></table>');
				}
			}
		}

		SalesUp.Sistema.CargaDatosAsync({
			link:'/privado/Modelo/jsonReporteDescartados.dbsp',
			parametros: 'filtros='+filtro+'&inicio='+start,
			callback:generaReporte
		});
	}/*reporte Descartadas*/

	/*Reporte Actividades Historico*/
	this.reporteHistorico = function(obj){
		(!obj) ? obj = {}:'';
		var filtro = obj.filtro;
		var data = JSON.parse(filtro);
		var start = (obj.start) ? obj.start : 1;
		var muestraReporteHistorico = function(Op,err){
			SalesUp.Variables.DatosRecibidos = SalesUp.Sistema.clone(Op);
			var datosHistoricos = Op.jsonDatos;
			var esMoney = Op.jsonDatos[0].ESMONEY;
			var datosHistoricosExtra = Op.jsonExtra;
			var datosHeader = Op.jsonHeader;
			var tHeader = _.size(datosHeader);
			var titulo = datosHistoricosExtra[0].TITULO;
			var jsonTotal = datosHistoricosExtra[0].TOTAL;
			var periodicidad = datosHistoricosExtra[0].PERIODO;

			var tmpHead = '';
			var tmpBody = '';
			var tmpFoot = '';

			var jsonGraficaRHistorico = [];
			var jsonSumaTotales = [];
			var categories = [];

			var simboloMoneda = SalesUp.Sistema.Almacenamiento({a:'SysSimboloMonedaDefault'});

			var columna = 'GRUPO';
			if (titulo ==='Ejecutivo') {columna = 'EJECUTIVO'};

			if (jsonTotal > 0) {
				if(periodicidad == 0){
					var arrGrafica = {};
					var nombre = $('#criteriocomponentes').find('option:selected').text();
					arrGrafica.name = nombre+' '+datosHeader[0].CABECERA;
					arrGrafica.data = [];
					for (var i = 0; i < _.size(datosHistoricos); i++) {
						var jsonData = datosHistoricos[i];
						arrGrafica.data.push(parseInt(jsonData.TOTAL));
					};
					jsonGraficaRHistorico.push(arrGrafica);

				}else{
					for (var i = 0; i < _.size(datosHistoricos); i++) {
						var jsonData = datosHistoricos[i];
						var arrGrafica = {};
						arrGrafica.name = jsonData[columna];
						arrGrafica.data = [];
						for (var j = 0; j < tHeader; j++) {
							var x = j+1;
							if (x < tHeader) {
								var nColumna = 'VALOR'+x;
								arrGrafica.data.push(parseInt(jsonData[nColumna]));
							}
						};
						jsonGraficaRHistorico.push(arrGrafica);
					};
				}
			};

			tmpBody +='<tr>';
			tmpBody +='<td class="tCen"><b>{{nFila}}</b></td>';
			tmpBody +='<td class="tIzq">{{'+columna+'}}</td>';
			tmpHead += '<tr>';
			tmpHead += '<th></th>';
			tmpHead += '<th>'+titulo+'</th>';
			
			if (tHeader >0) {
				for (var i = 0; i < tHeader; i++) {
					
					var valor = i+1;
					var data = datosHeader[i];
					var arrSumaTotales = {};

					if (valor < tHeader){
						arrSumaTotales.columna = 'VALOR'+valor;
						jsonSumaTotales.push(arrSumaTotales);
						tmpHead += '<th class="tCen">'+data.CABECERA+'</th>';
						
						if (periodicidad != 0) {
							categories.push(data.CABECERA);
						};
						
						switch (esMoney){
							case 0:
								tmpBody +='<td class="tCen">{{hlpEsCero VALOR'+valor+'}}</td>';
								break;
							case 1:
								tmpBody +='<td class="tDer">{{hlp_Simbolo_Moneda VALOR'+valor+' '+simboloMoneda+' 0}}</td>';
								break;
						}
						
					}else{
						if (periodicidad == 0) {
							for (var i = 0; i < _.size(datosHistoricos); i++) {
								var jsonData = datosHistoricos[i];
								categories.push(jsonData[columna]);
							};
						};
						arrSumaTotales.columna = 'TOTAL';
						switch (esMoney){
							case 0:
								tmpBody +='<td class="tCen">{{hlpEsCero TOTAL}}</td>';
								break;
							case 1:
								tmpBody +='<td class="tDer">{{hlp_Simbolo_Moneda TOTAL '+simboloMoneda+' 0}}</td>';
								break;
						}
						tmpHead += '<th class="tCen">'+data.CABECERA+'</th>';
						jsonSumaTotales.push(arrSumaTotales);
					}
				}
			}

			tmpBody +='</tr>';
			tmpHead += '</tr>';
			tmpFoot = '';
			var totalesHistoricosSum = SalesUp.Sistema.sumaColumna(datosHistoricos,jsonSumaTotales);

			var laVariante = $('#laVariante').val();
			var TotalizarE = _.where(SalesUp.Variables.jsonInfoReportes.variantes,{tkRsv:laVariante});
			var Totalizar = TotalizarE[0].totalizar;
			if((Totalizar === null || Totalizar === 1) && Totalizar != 0){
				tmpFoot += '<tr class="elTotal">';
				tmpFoot += '<td></td>';
				tmpFoot += '<td class="tDer">Totales</td>';

				for (var i = 0; i < tHeader; i++) {
					var valor = i+1;
					if (esMoney == 0) {
						if (valor < tHeader) {
							var datoExtra = 'VALOR'+valor;
							tmpFoot += '<td class="tCen Bold">'+totalesHistoricosSum[datoExtra]+'</td>';
						}else{
							tmpFoot += '<td class="tCen Bold">'+totalesHistoricosSum.TOTAL+'</td>';
						}
					}else{
						if (valor < tHeader) {
							var datoExtra = 'VALOR'+valor;
							tmpFoot += '<td class="tDer Bold">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesHistoricosSum[datoExtra],'',1)+'</td>';
						}else{
							tmpFoot += '<td class="tDer Bold">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesHistoricosSum.TOTAL,'',1)+'</td>';
						}
					}

				}

				tmpFoot += '</tr>';
			}else if(Totalizar == 2){
				tmpFoot += '<tr class="elTotal">';
				tmpFoot += '<td></td>';
				tmpFoot += '<td class="tDer">Promedios</td>';

				for (var i = 0; i < tHeader; i++) {
					var valor = i+1;
					if (esMoney == 0) {
						if (valor < tHeader) {
							var datoExtra = 'VALOR'+valor;
							tmpFoot += '<td class="tCen Bold">'+SalesUp.Sistema.numeroConDecimal(totalesHistoricosSum[datoExtra]/_.size(datosHistoricos))+'</td>';
						}else{
							tmpFoot += '<td class="tCen Bold">'+SalesUp.Sistema.numeroConDecimal(totalesHistoricosSum.TOTAL/_.size(datosHistoricos))+'</td>';
						}
					}else{
						if (valor < tHeader) {
							var datoExtra = 'VALOR'+valor;
							tmpFoot += '<td class="tDer Bold">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesHistoricosSum[datoExtra]/_.size(datosHistoricos),'',1)+'</td>';
						}else{
							tmpFoot += '<td class="tDer Bold">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesHistoricosSum.TOTAL/_.size(datosHistoricos),'',1)+'</td>';
						}
					}

				}

				tmpFoot += '</tr>';
			}

			SalesUp.Construye.ConstruyeTabla(tmpHead,tmpBody,datosHistoricos,{Destino:'#DatosLoad',Id:'ReportTable',PagActual:start, elInicio : start});
			var $tabla = $('#ReportTable');
			
			SalesUp.reportes.paginacion({registros:jsonTotal,start:start,callback:SalesUp.reportes.actividades.reporteHistorico,tabla:$tabla,parametros:filtro});

			$('#ReportTable tfoot').html(tmpFoot);

			if (jsonTotal > 0) {
				var tooltip = {};
				switch(esMoney){
					case 0 :
						tooltip = {
							hared: false,
		                	formatter: function() {
								return '<b>'+ this.series.name +'</b>: '+ SalesUp.Sistema.FormatoNumero(this.point.y)
							}
						}
						break;
					case 1: 
						tooltip = {
							hared: false,
		                	formatter: function() {
		                		return '<b>'+ this.series.name +'</b>: '+ SalesUp.Sistema.FormatoMoneda(this.point.y)
							}
						}
						break;
				}
				if (periodicidad == 0 ) {
					SalesUp.reportes.graficaColumna({'categorias':categories,'series':jsonGraficaRHistorico,'tooltip':tooltip});
				}else{
					SalesUp.reportes.graficaArea({'series':jsonGraficaRHistorico,'tooltip':tooltip,'categories':categories,'titulo':'<i class="fa fa-archive"></i>Histórico'});
				}
			};
		}
		SalesUp.Sistema.CargaDatosAsync({
			link:'/privado/Modelo/jsonReporteActividadesHistorico.dbsp',
			parametros: 'filtros='+filtro+'&inicio='+start,
			callback:muestraReporteHistorico
		});
	}/*Actividades Historico*/

	/*Geolocalización*/
	this.Geo = function(obj){

		$('#graficaReporte').css('height','0px');
       	$('#graficaReporte').css('width','100%');
		(!obj) ? obj = {}:'';
		var filtro = obj.filtro;
		var data = JSON.parse(filtro);
		var start = (obj.start) ? obj.start : 1;

		var reporteGeolocalizacion = function function_name(Op) {
			SalesUp.Variables.DatosRecibidos = SalesUp.Sistema.clone(Op);
			SalesUp.reportes.irMap = function(marca){
				$("body, html").animate({
					scrollTop: $('body').offset().top
				}, 600);

				marca = parseInt(marca);
				var posicion = SalesUp.Variables.arregloMarcas[marca];
				map.setZoom(20);
				map.setCenter(posicion.getPosition());

				contentString = '';
			contentString += '<div class="BoxInfoMap">';
			contentString += ' <h3><i class="fa fa-male "></i> '+SalesUp.Variables.Mapdatos[marca].nombre+'</h3>';
			contentString += ' <div>';
			contentString += '   <p><i class="fa fa-calendar"></i>  '+SalesUp.Sistema.FormatoFecha(SalesUp.Variables.Mapdatos[marca].fechacontacto)+' '+SalesUp.Variables.Mapdatos[marca].horacontacto+'hrs</p>';
			contentString += '   <p><i class="fa fa-sticky-note-o"></i> '+SalesUp.Variables.Mapdatos[marca].comentario+'</p>';
			contentString += '   <p><i class="fa fa-user "></i><strong> '+SalesUp.Variables.Mapdatos[marca].iniciales+'</strong></p>';
			contentString += ' </div>';
			contentString += '</div>';

				infowindow.setContent(contentString);
				infowindow.open(map, SalesUp.Variables.arregloMarcas[marca]);
				var left = $(".gm-style-iw").parent().css("left");
				left = left.replace('px','');
				left = parseInt(left)-10;
				$(".gm-style-iw").parent().css("left",left);
			};
			var JsonDatos = Op.JsonDatos;
			var Total = Op.JsonInfo.TOTAL;
			var templateHead = '<tr>';
			templateHead += '<td style="width:30px;"></td>';
			templateHead += '<td>Contacto</td>';
			templateHead += '<td colspan="2">Comentario</td>';
			templateHead += '<td class="tCen">Fecha</td>';
			templateHead += '<td class="tCen">Eje</td>';
			templateHead += '<tr>';

			var templateBody = '<tr>';
			templateBody += '	<td class="centrado" style="width:30px;"><b>{{nFila}}</b></td>';
			templateBody += '	<td>{{hlpContactos PROSPECTO TKP ESCLIENTE}}<br>';
			templateBody += '	{{hlpEmpresa TKCOM EMPRESA}}</td>';
			templateBody += '	<td class="coordenadas" ><p style="cursor:pointer" onclick="SalesUp.reportes.irMap({{nFila}}-'+start+')"><i class="fa fa-circle user{{IDUSUARIO}}"></i> {{COMENTARIO}}</p></td>';
			templateBody += '	<td style="width:45px;"><p style="cursor:pointer" onclick="SalesUp.reportes.irMap({{nFila}}-'+start+')">{{hlpNumMap}}</p></td>'

			templateBody += '	<td style="width:100px;" class="centrado">{{hlpFormatoFecha FECHA}} {{HORA}}hrs</td>';
			templateBody += '	<td class="centrado Tip8" tip="{{NOMBRE_USUARIO}}"><b>{{USUARIO}}</b></td>';
			
			templateBody += '</tr>';

			SalesUp.Construye.ConstruyeTabla(templateHead,templateBody,JsonDatos,{Destino:'#DatosLoad',Id:'ReportTable', elInicio : start});
			var $tabla = $('#ReportTable');
			SalesUp.reportes.paginacion({registros:Total,start:start,callback:SalesUp.reportes.actividades.Geo,tabla:$tabla,parametros:filtro});

			var locationArray = new Array();
			var datos = new Array();
			var cont = 0;
			SalesUp.Variables.colores = new Array();
			SalesUp.Variables.colores = []
			var  ant  = 0
			SalesUp.Variables.randColor = ''
			for(x = 0; x<JsonDatos.length; x++){
				if(ant != JsonDatos[x].IDUSUARIO){
					SalesUp.Variables.randColor = SalesUp.Variables.coloresReporte[x]
					SalesUp.Variables.colores[JsonDatos[x].IDUSUARIO] = SalesUp.Variables.randColor;
					ant = JsonDatos[x].IDUSUARIO;
				}
				$('.user'+JsonDatos[x].IDUSUARIO).css('color',SalesUp.Variables.randColor);
				var cord = new google.maps.LatLng(JsonDatos[x].LATITUD,JsonDatos[x].LONGITUD);
				locationArray.push(cord);

				datos.push({idusuario:JsonDatos[x].IDUSUARIO,
					nombre:JsonDatos[x].PROSPECTO,
					direccion:JsonDatos[x].DIRECCION,
					comentario:JsonDatos[x].COMENTARIO,
					fechacontacto:JsonDatos[x].FECHA,
					horacontacto:JsonDatos[x].HORA,
					iniciales:JsonDatos[x].USUARIO});
				cont++;
			}
			if(Total > 0){
				$('#graficaReporte').css('height','400px');
        		$('#graficaReporte').css('width','100%');
				initialize(locationArray,datos,SalesUp.Variables.colores)
			}

		}

		var $lasVariantes = $('#lasVariantes'), $laVariante = $('#laVariante'), $laOpcion = $laVariante.find('option:selected');
		var tipoVariante = $laOpcion.attr('data-sistema');
		var qryString = 'tkrs='+SalesUp.Variables.tkrs+'&tipoVariante='+tipoVariante+'&laVariante='+$laVariante.val()+'&inicia='+start+'&filtros='+filtro;

		var cargaActividadesGeo = function(html){
			markerImageSvg = html;
			SalesUp.Sistema.CargaDatosAsync({
				link:'/privado/Modelo/jsonReporteActividadesGeo.dbsp',
				prmAdicionales:qryString,
				parametros:qryString,
				callback:reporteGeolocalizacion
			});	
		}
		
		SalesUp.Sistema.CargaDatosAsync({
			link:'/privado/Vista/markerMaps.dbsp', dataType:'html', almacen:'htmlMarkerMaps',
			callback:cargaActividadesGeo
		});
		
	}

	this.exportaCsvSuceso = function(Op) {
        var jsonDatos = Op.jsonDatos,
        jsonFinal = _.map(jsonDatos, function(key) {
            delete(key.TKCOM);
            delete(key.TKP);
            delete(key.TKU);
            delete(key.TKV);
            delete(key.TKO);
            delete(key.IDPROSPECTO);
            delete(key.DESCARTADO);
            delete(key.TIPO);
            delete(key.IDOPORTUNIDAD);
            delete(key.INICIALES);
            delete(key.COMENTARIO_FULL);
            delete(key.COMENTARIO);
            delete(key.IDVENTA);
            delete(key.IDUSUARIO);
            return key; 
        });
        return jsonFinal;
    } 
   
	/*************************************** Reporte actividades succesos ***************************************************/
		this.reporteSucesos = function(obj){
		(!obj) ? obj      = {}:'';
		var filtroNoparse = obj.filtro;
		var start         = (obj.start) ? obj.start : 1;
		var vistaReporteSuceso = function(Op){
			SalesUp.Variables.DatosRecibidos = SalesUp.Sistema.clone(Op);
			var template                    = '';
			var tBody                       = ''
			var jsonDatosSelectSucesoCuerpo = Op.jsonDatosSelectSucesoCuerpo;
			var totalRegistros              = Op.jsonDatosSelectSucesoTotal[0].TOTALREGISTROS;			
			var templateCabecera            =  '<thead>'
			templateCabecera                =  '<tr class="par">'
			templateCabecera                += '<th style="width: 1%;" class="centrado"></th>';
			templateCabecera                += '<th class="tIzq">Suceso</th>';
			templateCabecera                += '<th class="tIzq">Contacto</th>';
			templateCabecera                += '<th class="tIzq">Correo</th>';
			templateCabecera                += '<th class="tIzq">Último seguimiento</th>';
			templateCabecera                += '<th class="centrado" style="width:100px">Fecha</th>';
			templateCabecera                += '<th class="centrado">Eje</th>';
			templateCabecera                += '</tr>';
			templateCabecera                += '</thead>';

			tBody                           =  '<tr><td class="centrado Bold">{{nFila}}</td>';
			tBody                           += '<td>{{TEXTO}}</td>';
			tBody                           += '<td>{{hlpSucesosCuerpo}} {{NOMBRE}} {{APELLIDOS}}<br>{{hlpSucesosEmpresa}}</td>';
			tBody                           += '<td><span>{{CORREO}}</td></span>';
			tBody                           += '<td tip="{{{COMENTARIO_FULL}}}" class="Tip6">{{{COMENTARIO}}}</td>';
			tBody                           += '<td class="centrado">{{hlpFormatoFecha FECHA_SUCESO}} {{FECHAHORA}}</td>';
			tBody                           += '<td class="centrado Tip8" tip="{{EJECUTIVO}}"> <strong>{{INICIALES}}</strong> </td>';
			tBody                           += '</tr>';

			SalesUp.Construye.ConstruyeTabla(templateCabecera,tBody,jsonDatosSelectSucesoCuerpo,{Destino:'#DatosLoad',Id:'reporteContenido',elInicio : start});
			var $tabla = $('#reporteContenido');

			SalesUp.reportes.paginacion({registros:totalRegistros,start:start,callback:SalesUp.reportes.actividades.reporteSucesos,tabla:$tabla,parametros:filtroNoparse});

		}
		/*******************************/
		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonActividadesSuceso.dbsp',
			parametros:'OBJETO='+filtroNoparse+'&inicio='+start,
			callback: vistaReporteSuceso
		});
		/*******************************/
	}
/*************************************** Reporte actividades succesos ***************************************************/

}

/*************************************** Constructor del Mapa ***************************************************/

function initialize(Locations,Points,colores) {
	infowindow = new google.maps.InfoWindow({});

	var locationArray = new Array();

	SalesUp.Variables.Mapdatos = new Array();
	SalesUp.Variables.arregloMarcas = new Array();
	m = '';

	SalesUp.Variables.Mapdatos = Points;
	locationArray = Locations;
	SalesUp.Variables.arregloMarcas=[];
	var geocoder;
	var direccion;

	geocoder = new google.maps.Geocoder();
	//Determina el Principio del mapa
	var mapOptions = {
		center:new google.maps.LatLng(21.166564,-86.857237),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("graficaReporte"),mapOptions);

	var bounds = new google.maps.LatLngBounds();
	//inicializa la ventana de información
	var idusuarioant = '';
	var arrayAux = new Array();
	 arrayColoresUsuarios = new Array();
	var cont = 0;
	var colAleatorio = '';

	var i = '';
	//determina si hay SalesUp.Variables.Mapdatos
	if(SalesUp.Variables.Mapdatos.length > 0){
		idusuarioant = SalesUp.Variables.Mapdatos[0].idusuario;
		colAleatorio = colores[SalesUp.Variables.Mapdatos[0].idusuario]
	}


	for (i = 0; i < SalesUp.Variables.Mapdatos.length; i++) {
		cont++;
		//construye las lineas correspondientes para los mapas
		if((idusuarioant!=SalesUp.Variables.Mapdatos[i].idusuario)){

			
			var line = new google.maps.Polyline({
				path: arrayAux,
				strokeColor: colAleatorio,
				strokeOpacity: 1.0,
				strokeWeight: 3
			});
			colAleatorio = colores[SalesUp.Variables.Mapdatos[i].idusuario];
			//arrayColoresUsuarios.push({idusuario:idusuarioant,color:colAleatorio});

			line.setMap(map);
			arrayAux = [];
			cont = 0;

			cont++;
			arrayAux.push(locationArray[i]);
		}

		if((idusuarioant==SalesUp.Variables.Mapdatos[i].idusuario)||(i==0)){
			arrayAux.push(locationArray[i]);
		}

		if(i==SalesUp.Variables.Mapdatos.length-1){
			colAleatorio = colores[SalesUp.Variables.Mapdatos[i].idusuario];

			var line = new google.maps.Polyline({
				path: arrayAux,
				strokeColor: colAleatorio,
				strokeOpacity: 1.0,
				strokeWeight: 3
			});

			arrayColoresUsuarios.push({idusuario:SalesUp.Variables.Mapdatos[i].idusuario,color:colAleatorio});

			line.setMap(map);
			arrayAux = [];
		}

		idusuarioant = SalesUp.Variables.Mapdatos[i].idusuario;
		//gurda el marker para el mapa
		var marker = '';

		marker = new google.maps.Marker({
			position: locationArray[i],
			map: map,
			icon: {
				anchor: new google.maps.Point(18,45),
				url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(markerImageSvg.replace('{{NUM}}', cont)),
			}
		});

		SalesUp.Variables.arregloMarcas.push(marker);
		//agrega evento para mostrar la ventana informativa
		google.maps.event.addListener(marker, 'click', (function(marker, i) {

			var contentString = '';
			contentString += '<div class="BoxInfoMap">';
			contentString += ' <h3><i class="fa fa-male "></i> '+SalesUp.Variables.Mapdatos[i].nombre+'</h3>';
			contentString += ' <div>';
			contentString += '   <p><i class="fa fa-calendar"></i>  '+SalesUp.Sistema.FormatoFecha(SalesUp.Variables.Mapdatos[i].fechacontacto)+' '+SalesUp.Variables.Mapdatos[i].horacontacto+'hrs</p>';
			contentString += '   <p><i class="fa fa-sticky-note-o"></i> '+SalesUp.Variables.Mapdatos[i].comentario+'</p>';
			contentString += '   <p><i class="fa fa-user "></i><strong> '+SalesUp.Variables.Mapdatos[i].iniciales+'</strong></p>';
			contentString += ' </div>';
			contentString += '</div>';

			return function() {
				infowindow.setContent(contentString);
				infowindow.open(map, marker);

				var left = $(".gm-style-iw").parent().css("left");
				left = left.replace('px','');
				left = parseInt(left)-10;
				$(".gm-style-iw").parent().css("left",left);
			}

		})(marker, i));

		bounds.extend(locationArray[i]);
	}

	if(locationArray.length!=0){
		map.fitBounds(bounds);
	}else{
		var listener = google.maps.event.addListener(map, "idle", function () {
			map.setZoom(4);
			google.maps.event.removeListener(listener);
		});
	}
	
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(new FullScreenControl(map));
}

/*************************************** Constructor del Mapa ***************************************************/




        
      


    


