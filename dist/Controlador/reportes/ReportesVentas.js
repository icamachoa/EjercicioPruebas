var reportesVentas = function () {
	
	this.reporteVentasProducto = function(obj){
		(!obj) ? obj = {}:'';
		var filtro = obj.filtro;
		var objFiltro = JSON.parse(filtro);

		var start = (obj.start) ? obj.start : 1;
		var datosTreeMap = function(jsonPGrafica, niveles,orden,start,length){

			var colors = SalesUp.Variables.coloresReporte;/*_.shuffle(coloresReporte)*/
			var data = jsonPGrafica, points = [],BYMRP,BYMRVal,BYMRI = 0,lineaP,lineaI,productP,productI,BYMR,linea,product,contador = 1;
			for (BYMR in data) {
				if (data.hasOwnProperty(BYMR)) {
					BYMRVal = 0;
					if(niveles == 1){
						BYMRVal = Math.round(data[BYMR][0][orden]);
					}
					BYMRP = {
						id: 'id_' + BYMRI,
						name: BYMR,
						color: colors[BYMRI]
					};
					lineaI = 0
					BYMRP.value = BYMRVal
					points.push(BYMRP);
					BYMRI = BYMRI + 1;
					contador = contador + 1;
					if (contador < start) {
						BYMRI = 0
						points = [];
					}
					if (contador > start+length-1) break;
				}
			}
			return points;
		}/*datosTreeMap*/


		var muestraReporte = function(Op,err,args){
			/* INICIA TEMPLATE 1*/
			SalesUp.Variables.DatosRecibidos = SalesUp.Sistema.clone(Op);
			var orden        = Op.jsonDatos[0].ORDEN;
			var preprocess   = SalesUp.Sistema.clone(Op.jsonDatos);
			var agrupacion   = Op.jsonDatos[0].AGRUPACION;
			var SumdeTotales = SalesUp.Sistema.sumaColumna(Op.jsonDatos,[{columna:'GT'},{columna:'CANTIDAD'},{columna:'PORCENTAJE'}]);
			 simbolo = Op.jsonDatos[0].simbolo;
			
			var tmpBody = '<tr>';
			tmpBody += '<td class="tCen" style="width:10px"><b>{{nFila}}</b></td>';
			var tmpFoot = '';
			var tmpHead = '<tr><th class="tCen" style="width:10px"></th>'
			var tmpFoot = '<tr class="elTotal">';
			switch(parseInt(agrupacion)) {
				case 9:
				tmpHead += '<th class="tCen">Código</th> \
				<th class="tIzq">Producto</th> \
				<th class="tCen">Línea</th> \
				<th class="tCen">Marca</th> ';
				tmpBody += '<td class="tCen">{{CODIGO}}</td>';
				tmpBody += '<td><a href=detalleReporteProductosventas.dbsp?'+qryString+'&agrupacion='+agrupacion+'&parametros={{IDPRODUCTO}}>{{NOMBRE}}</a></td>';
				tmpBody += '<td class="tCen">{{LINEA_PRODUCTO}}</td>';
				tmpBody += '<td class="tCen">{{MARCA}}</td>';
				tmpFoot += '<td colspan="4"></td>';
				break;
				case 3:
				tmpHead += '<th class="tIzq">Linea</th>'
				tmpBody += '<td class="tIzq"><a href=detalleReporteProductosventas.dbsp?'+qryString+'&agrupacion='+agrupacion+'&parametros={{IDLINEA}}>{{LINEA_PRODUCTO}}</a></td>';
				tmpFoot += '<td></td>';
				break;
				case 10:
				tmpHead += '<th class="tIzq">Marca</th>'
				tmpBody += '<td class="tIzq"><a href=detalleReporteProductosventas.dbsp?'+qryString+'&agrupacion='+agrupacion+'&parametros={{IDMARCA}}>{{MARCA}}</a></td>';
				tmpFoot += '<td></td>';
				break;
				case 1:
				tmpHead += '<th>Ejecutivo</th>';
				tmpBody += '<td class="tIzq"><a href=detalleReporteProductosventas.dbsp?'+qryString+'&agrupacion='+agrupacion+'&parametros={{TKU}}>{{EJECUTIVO}}</a></td>';
				tmpFoot += '<td></td>';
				break;
				case 2:
				tmpHead += '<th>Grupo</th>'
				tmpBody += '<td class="tIzq"><a href=detalleReporteProductosventas.dbsp?'+qryString+'&agrupacion='+agrupacion+'&parametros={{TK}}>{{GRUPO}}</a></td>';
				tmpFoot += '<td></td>';
				break;
			}
			tmpHead += '<th style="width:90px;">Cantidad</th> \
			<th class="tDer" style="width:100px;">Monto</th> \
			<th style="width:140px">%</th><tr>';
			tmpBody += '<td class="tCen">{{CANTIDAD}}</td>';
			tmpBody += '<td style="text-align:right;">{{hlp_Simbolo_Moneda GT "'+simbolo+'" 0}}</td>';
			tmpBody += '<td style="width: 100px !important;"><div class="w100"><div class="progress progress-striped active shadow"><span class="LbPorcentaje">{{hlpDosCeros PORCENTAJE}}%</span><span class="LbIndicador Pointer Transition" data-porcentaje="{{hlpDosCeros PORCENTAJE}}%" tip="ehllos" ></span><div class="progress-bar progress-bar-stripes OcultarImprimir" data-porcentaje="{{hlpDosCeros PORCENTAJE}}%" style="width:{{hlpDosCeros PORCENTAJE}}%"></div></div> </td>';
			tmpBody += '</tr>';
			var laVariante = $('#laVariante').val();
			var TotalizarE = _.where(SalesUp.Variables.jsonInfoReportes.variantes,{tkRsv:laVariante});
			var Totalizar = TotalizarE[0].totalizar;
			if((Totalizar === null || Totalizar === 1) && Totalizar != 0){
			tmpFoot += '<td class="tDer">Totales</td><td class="tCen">'+SumdeTotales.CANTIDAD+'</td><td  class="tDer ">'+Handlebars.helpers.hlp_Simbolo_Moneda(SumdeTotales.GT,simbolo,1)+'</td><td style="width: 100px !important;"><div class="w100"><div class="progress progress-striped active shadow"><span class="LbPorcentaje">'+SalesUp.Sistema.numeroConDecimal(SumdeTotales.PORCENTAJE)+'%</span><span class="LbIndicador Pointer Transition" data-porcentaje="'+SumdeTotales.PORCENTAJE+'%" tip="ehllos" ></span><div class="progress-bar progress-bar-stripes OcultarImprimir" data-porcentaje="'+SumdeTotales.PORCENTAJE+'%" style="width:'+SumdeTotales.PORCENTAJE+'%"></div></div> </td></tr>'
			}else if(Totalizar === 2){
				tmpFoot += '<td class="tDer">Promedios</td><td class="tCen">'+SalesUp.Sistema.numeroConDecimal(SumdeTotales.CANTIDAD/_.size(Op.jsonDatos))+'</td><td  class="tDer ">'+Handlebars.helpers.hlp_Simbolo_Moneda(SumdeTotales.GT/_.size(Op.jsonDatos),'',1)+'</td><td style="width: 100px !important;"><div class="w100"><div class="progress progress-striped active shadow"><span class="LbPorcentaje">'+SalesUp.Sistema.numeroConDecimal(SumdeTotales.PORCENTAJE/_.size(Op.jsonDatos))+'%</span><span class="LbIndicador Pointer Transition" data-porcentaje="'+SalesUp.Sistema.numeroConDecimal(SumdeTotales.PORCENTAJE/_.size(Op.jsonDatos))+'%" tip="ehllos" ></span><div class="progress-bar progress-bar-stripes OcultarImprimir" data-porcentaje="'+SalesUp.Sistema.numeroConDecimal(SumdeTotales.PORCENTAJE/_.size(Op.jsonDatos))+'%" style="width:'+SalesUp.Sistema.numeroConDecimal(SumdeTotales.PORCENTAJE/_.size(Op.jsonDatos))+'%"></div></div> </td></tr>'
			}else { 
				tmpFoot = '';
			}
			/*  FINAL TEMPLATE 1 */ 

			var jsonReporteActividades = Op.jsonDatos;
			
			var jsonNDatos = Op.jCount.COLUMN1;

			/* CONSTRUYE LOS DATOS QUE SE LE PASARAN A LA GRAFICA */
			if (agrupacion == 9) {
				jsonPGrafica = _.groupBy(preprocess,'NOMBRE');
				var points;
				points = datosTreeMap(jsonPGrafica,1,orden,1,10)
			}else if (agrupacion == 3) { /*SE HACE SI ESTAN AGRUPADOS POR  PRODUCTO*/
				jsonPGrafica = _.groupBy(preprocess,'LINEA_PRODUCTO');
				var points;
				points = datosTreeMap(jsonPGrafica,1,orden,1,10)
			}else if(agrupacion == 10){ /*SE HACE SI ESTAN AGRUPADOS POR  LINEA*/
				jsonPGrafica = _.groupBy(preprocess,'MARCA');
				var points;
				points = datosTreeMap(jsonPGrafica,1,orden,1,10)
			}else{
				if (agrupacion == 1) {
					var agrupacionL = 'EJECUTIVO';
				}
				if (agrupacion == 2) {
					var agrupacionL = 'GRUPO';
				}
				jsonPGrafica = _.groupBy(preprocess,agrupacionL);
				var points;

				points = datosTreeMap(jsonPGrafica,1,orden,1,10)
			}

			/*SE HACE SI ESTAN AGRUPADOS POR  MARCA*/

			var hayReporte = _.size(jsonReporteActividades);

			/*SalesUp.Sistema.CargaDatos({Link:'Filtros_Reporte_PV.dbsp', Div:1, Destino:'#filtros' });*/
			SalesUp.Construye.ConstruyeTabla(tmpHead,tmpBody,jsonReporteActividades,{Destino:'#DatosLoad',Id:'reporteContenido',PagActual:start});
			var $tabla = $('#reporteContenido');
			SalesUp.reportes.paginacion({registros:jsonNDatos,start:start,callback:SalesUp.reportes.ventas.reporteVentasProducto,tabla:$tabla,parametros:filtro});
			$('#reporteContenido tfoot').html(tmpFoot);
			SalesUp.Sistema.IniciaPlugins();
			if (jsonNDatos > 0) {
				contruyeGrafica({data:points});
			}
			SalesUp.Sistema.Tipsy();
		}/*muestraReporte*/

		var $lasVariantes = $('#lasVariantes'), $laVariante = $('#laVariante'), $laOpcion = $laVariante.find('option:selected');
		var tipoVariante = $laOpcion.attr('data-sistema');
		var qryString = 'tkrs='+SalesUp.Variables.tkrs+'&tipoVariante='+tipoVariante+'&laVariante='+$laVariante.val()+'&inicia='+start+'&filtros='+encodeURIComponent(filtro);



		SalesUp.Sistema.CargaDatosAsync({
			link:'/privado/Modelo/jsonProductosVentas.dbsp',
			prmAdicionales:qryString,
			parametros:qryString,
			callback:muestraReporte
		});
		
		var contruyeGrafica = function(Op){
			var points = Op.data;
			var tooltip = {
				formatter:function(){
					return 'Monto vendido<br/><b>' + SalesUp.Sistema.moneda({moneda:SalesUp.Sistema.Almacenamiento({a:'SysSimboloMonedaDefault'}), numero:this.point.value}) + '</b>';
				}
			};
			
			SalesUp.reportes.graficaTreeMap({points:points, tooltip:tooltip});
			
		};/*contruyeGrafica*/
	}

	this.cobradasVsRealizadas = function(obj){

		(!obj) ? obj = {}:'';
		
		var filtro = obj.filtro;
		var objFiltro = JSON.parse(filtro);
		var tipoGrafica = (obj.tipoGrafica) ? obj.tipoGrafica : 1;
		var start = (obj.start) ? obj.start : 1;
		var actividad;
		if(!objFiltro.filtros[0].ventaNR){
			actividad = (objFiltro.filtros[0].ventaRC) ? objFiltro.filtros[0].ventaRC : 0 ;
		}else{
			actividad = (objFiltro.filtros[0].ventaNR) ? objFiltro.filtros[0].ventaNR : 3 ;
		}
		var link = 'Modelo/jsonVentasRealizadas.dbsp';
		if(objFiltro.filtros[0].ventaRC == 2 || objFiltro.filtros[0].ventaNR == 5){
			link = 'Modelo/jsonVentasRealizadasVsCobradas.dbsp';
		}
		var muestraReporte = function(Op){
			SalesUp.Variables.DatosRecibidos = SalesUp.Sistema.clone(Op);
			var realizadas,cobradas, totalRealizadas,totalCobradas, titulo, total;
			var tmpHead = '', tmpBody = '', simbolo = '', tmpFoot ='', tkm = '', periodo = '';
			var ltReporte = [], ltGrafica = [], totalesSumados = [];
			

			if (objFiltro.filtros[0].ventaRC == 2 || objFiltro.filtros[0].ventaNR == 5) {
				tipoGrafica = 3;
				realizadas = Op.jsonRealizadas;
				cobradas = Op.jsonCobradas;
				simbolo = Op.jsonTotalRealizadas[0].MONEDA_SIMBOLO;
				var elSimbolo = String.fromCharCode(simbolo);
				totalRealizadas = Op.jsonTotalRealizadas[0].TOTAL;
				totalCobradas = Op.jsonTotalCobradas[0].TOTAL;
				titulo = Op.jsonTotalRealizadas[0].TITULO;
				tkm = (Op.jsonTotalRealizadas[0].TKM) ? Op.jsonTotalRealizadas[0].TKM:'';
				periodo = Op.jsonTotalRealizadas[0].PERIODO;
				
				var nombreColumna1 = '', nombreColumna2 = '';
				
				if (objFiltro.filtros[0].ventaRC) {
					nombreColumna1 = 'Cobradas';
					nombreColumna2 = 'Realizadas';
				}
				if(objFiltro.filtros[0].ventaNR){
					nombreColumna1 = 'Recompra';
					nombreColumna2 = 'Nuevas';
				}
				tmpHead += '<tr><th></th>';
				tmpHead += '<th class="tIzq">'+titulo+'</th>';
				tmpHead += '<th class="tCen" colspan="2">Enero</th>';
				tmpHead += '<th class="tCen" colspan="2">Febrero</th>';
				tmpHead += '<th class="tCen" colspan="2">Marzo</th>';
				tmpHead += '<th class="tCen" colspan="2">Abril</th>';
				tmpHead += '<th class="tCen" colspan="2">Mayo</th>';
				tmpHead += '<th class="tCen" colspan="2">Junio</th>';
				tmpHead += '<th class="tCen" colspan="2">Julio</th>';
				tmpHead += '<th class="tCen" colspan="2">Agosto</th>';
				tmpHead += '<th class="tCen" colspan="2">Septiembre</th>';
				tmpHead += '<th class="tCen" colspan="2">Octubre</th>';
				tmpHead += '<th class="tCen" colspan="2">Noviembre</th>';
				tmpHead += '<th class="tCen" colspan="2">Diciembre</th>';
				tmpHead += '<th class="tCen" colspan="2">Total</th>';
				tmpHead += '</tr>';
				tmpHead += '<tr>';
				tmpHead += '<th class="tCen"></th>';
				for (var x = 0; x<13; x++){
					tmpHead += '<th class="tCen" >'+nombreColumna1+'</th>';
					tmpHead += '<th class="tCen" >'+nombreColumna2+'</th>';
				}
				tmpHead += '</tr>';
				tmpBody += '<tr>';
				tmpBody += '<td class="tCen Bold">{{nFila}}</td>';
				tmpBody += '<td class="tIzq">{{Ejecutivo}}</td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=1&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda CobradasEnero "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=0&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda RealizadasEnero "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=1&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda CobradasFebrero "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=0&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda RealizadasFebrero "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=1&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda CobradasMarzo "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=0&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda RealizadasMarzo "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=1&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda CobradasAbril "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=0&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda RealizadasAbril "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=1&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda CobradasMayo "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=0&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda RealizadasMayo "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=1&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda CobradasJunio "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=0&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda RealizadasJunio "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=1&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda CobradasJulio "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=0&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda RealizadasJulio "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=1&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda CobradasAgosto "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=0&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda RealizadasAgosto "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=1&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda CobradasSeptiembre "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=0&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda RealizadasSeptiembre "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=1&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda CobradasOctubre "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=0&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda RealizadasOctubre "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=1&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda CobradasNoviembre "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=0&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda RealizadasNoviembre "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=1&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda CobradasDiciembre "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=0&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda RealizadasDiciembre "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=1&tipo={{Tipo}}&mes=0&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda CobradasTotal "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad=0&tipo={{Tipo}}&mes=0&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda RealizadasTotal "'+simbolo+'" 0}}</span></a></td></td>';
				tmpBody += '</tr>';
				
				if(totalRealizadas > totalCobradas){
					total = totalRealizadas;
					totalFor = _.size(realizadas);
				}else{
					total = totalCobradas;
					totalFor = _.size(cobradas);
				}

				if (total > 0) {
					for(var je = 0; je < totalFor; je++){
						
						if (totalRealizadas > totalCobradas) {
							var ja = realizadas[je];
						}else {
							var ja = cobradas[je];
						}

						var r = realizadas[je], c = cobradas[je];
						var arrReporte = {}, arrGrafica = {};
						switch (titulo){
							case 'Ejecutivo': 
							arrReporte.Ejecutivo = ja.EJECUTIVO;
							arrGrafica.name = ja.EJECUTIVO;
							arrReporte.Tipo = '1';
							arrReporte.TK = ja.TKU;
							break;
							case 'Grupo/Departamento':
							arrReporte.Ejecutivo = ja.GRUPO;
							arrGrafica.name = ja.GRUPO;
							arrReporte.Tipo = '2';
							arrReporte.TK = ja.TK;
							break;
							case 'Línea':
							arrReporte.Ejecutivo = ja.LINEA_PRODUCTO;
							arrGrafica.name = ja.LINEA_PRODUCTO;
							arrReporte.Tipo = '3';
							arrReporte.TK = ja.TK;
							break;
							case 'Objetivo':
							arrReporte.Ejecutivo = ja.ORIGEN;
							arrGrafica.name = ja.ORIGEN;
							arrReporte.Tipo = '4';
							arrReporte.TK = ja.TK;
							break;
							case 'País':
							arrReporte.Ejecutivo = ja.PAIS;
							arrGrafica.name = ja.PAIS;
							arrReporte.Tipo = '5';
							arrReporte.TK = ja.IDPAIS;
							break;
							case 'Región':
							arrReporte.Ejecutivo = ja.REGION;
							arrGrafica.name = ja.REGION;
							arrReporte.Tipo = '6';
							arrReporte.TK = ja.REGION;
							break;
							case 'Ciudad':
							arrReporte.Ejecutivo = ja.CIUDAD;
							arrGrafica.name = ja.CIUDAD;
							arrReporte.Tipo = '7';
							arrReporte.TK = ja.CIUDAD;
							break;
						}

						if (r) {
							arrReporte.RealizadasEnero = r.MONTO_ENE;
							arrReporte.RealizadasFebrero = r.MONTO_FEB;
							arrReporte.RealizadasMarzo = r.MONTO_MAR;
							arrReporte.RealizadasAbril = r.MONTO_ABR;
							arrReporte.RealizadasMayo = r.MONTO_MAY;
							arrReporte.RealizadasJunio = r.MONTO_JUN;
							arrReporte.RealizadasJulio = r.MONTO_JUL;
							arrReporte.RealizadasAgosto = r.MONTO_AGO;
							arrReporte.RealizadasSeptiembre = r.MONTO_SEP;
							arrReporte.RealizadasOctubre = r.MONTO_OCT;
							arrReporte.RealizadasNoviembre = r.MONTO_NOV;
							arrReporte.RealizadasDiciembre = r.MONTO_DIC;
							arrReporte.RealizadasTotal = r.MONTO_TOTAL;
						}else {
							arrReporte.RealizadasEnero = "0";
							arrReporte.RealizadasFebrero = "0";
							arrReporte.RealizadasMarzo = "0";
							arrReporte.RealizadasAbril = "0";
							arrReporte.RealizadasMayo = "0";
							arrReporte.RealizadasJunio = "0";
							arrReporte.RealizadasJulio = "0";
							arrReporte.RealizadasAgosto = "0";
							arrReporte.RealizadasSeptiembre = "0";
							arrReporte.RealizadasOctubre = "0";
							arrReporte.RealizadasNoviembre = "0";
							arrReporte.RealizadasDiciembre = "0";
							arrReporte.RealizadasTotal = "0";
						}
						
						if(c){
							arrReporte.CobradasEnero = c.MONTO_ENE;
							arrReporte.CobradasFebrero = c.MONTO_FEB;
							arrReporte.CobradasMarzo = c.MONTO_MAR;
							arrReporte.CobradasAbril = c.MONTO_ABR;
							arrReporte.CobradasMayo = c.MONTO_MAY;
							arrReporte.CobradasJunio = c.MONTO_JUN;
							arrReporte.CobradasJulio = c.MONTO_JUL;
							arrReporte.CobradasAgosto = c.MONTO_AGO;
							arrReporte.CobradasSeptiembre = c.MONTO_SEP;
							arrReporte.CobradasOctubre = c.MONTO_OCT;
							arrReporte.CobradasNoviembre = c.MONTO_NOV;
							arrReporte.CobradasDiciembre = c.MONTO_DIC;
							arrReporte.CobradasTotal = c.MONTO_TOTAL;
						}else {
							arrReporte.CobradasEnero = "0";
							arrReporte.CobradasFebrero = "0";
							arrReporte.CobradasMarzo = "0";
							arrReporte.CobradasAbril = "0";
							arrReporte.CobradasMayo = "0";
							arrReporte.CobradasJunio = "0";
							arrReporte.CobradasJulio = "0";
							arrReporte.CobradasAgosto = "0";
							arrReporte.CobradasSeptiembre = "0";
							arrReporte.CobradasOctubre = "0";
							arrReporte.CobradasNoviembre = "0";
							arrReporte.CobradasDiciembre ="0";
							arrReporte.CobradasTotal = "0";
						}
						ltReporte.push(arrReporte);
					}

					totalesSumados = SalesUp.Sistema.sumaColumna(ltReporte,[{columna:'CobradasEnero'},{columna:'CobradasFebrero'},{columna:'CobradasMarzo'},{columna:'CobradasAbril'},{columna:'CobradasMayo'},{columna:'CobradasJunio'},{columna:'CobradasJulio'},{columna:'CobradasAgosto'},{columna:'CobradasSeptiembre'},{columna:'CobradasOctubre'},{columna:'CobradasNoviembre'},{columna:'CobradasDiciembre'},{columna:'CobradasTotal'},{columna:'RealizadasEnero'},{columna:'RealizadasFebrero'},{columna:'RealizadasMarzo'},{columna:'RealizadasAbril'},{columna:'RealizadasMayo'},{columna:'RealizadasJunio'},{columna:'RealizadasJulio'},{columna:'RealizadasAgosto'},{columna:'RealizadasSeptiembre'},{columna:'RealizadasOctubre'},{columna:'RealizadasNoviembre'},{columna:'RealizadasDiciembre'},{columna:'RealizadasTotal'}]);
					var laVariante = $('#laVariante').val();
					var TotalizarE = _.where(SalesUp.Variables.jsonInfoReportes.variantes,{tkRsv:laVariante});
					var Totalizar = TotalizarE[0].totalizar;
					if((Totalizar === null || Totalizar === 1) && Totalizar != 0){
						tmpFoot += '<tr class="elTotal"><td></td><td class="tDer">Totales</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.CobradasEnero,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.RealizadasEnero,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.CobradasFebrero,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.RealizadasFebrero,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.CobradasMarzo,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.RealizadasMarzo,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.CobradasAbril,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.RealizadasAbril,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.CobradasMayo,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.RealizadasMayo,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.CobradasJunio,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.RealizadasJunio,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.CobradasJulio,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.RealizadasJulio,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.CobradasAgosto,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.RealizadasAgosto,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.CobradasSeptiembre,simbolo,1)+'</1td>';					
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.RealizadasSeptiembre,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.CobradasOctubre,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.RealizadasOctubre,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.CobradasNoviembre,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.RealizadasNoviembre,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.CobradasDiciembre,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.RealizadasDiciembre,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.CobradasTotal,simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.RealizadasTotal,simbolo,1)+'</td>';
						tmpFoot += '</tr>';
					}else if(Totalizar === 2){
						tmpFoot += '<tr class="elTotal"><td></td><td class="tDer">Promedios</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.CobradasEnero/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.RealizadasEnero/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.CobradasFebrero/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.RealizadasFebrero/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.CobradasMarzo/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.RealizadasMarzo/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.CobradasAbril/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.RealizadasAbril/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.CobradasMayo/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.RealizadasMayo/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.CobradasJunio/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.RealizadasJunio/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.CobradasJulio/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.RealizadasJulio/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.CobradasAgosto/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.RealizadasAgosto/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.CobradasSeptiembre/_.size(ltReporte)),simbolo,1)+'</1td>';					
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.RealizadasSeptiembre/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.CobradasOctubre/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.RealizadasOctubre/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.CobradasNoviembre/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.RealizadasNoviembre/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.CobradasDiciembre/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.RealizadasDiciembre/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.CobradasTotal/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.RealizadasTotal/_.size(ltReporte)),simbolo,1)+'</td>';
						tmpFoot += '</tr>';
					}else{
						tmpFoot = ''
					}

					var arrayCobradas = [];
					var arrayRealizadas = [];

					arrayCobradas.push({y:totalesSumados.CobradasEnero});
					arrayCobradas.push({y:totalesSumados.CobradasFebrero});
					arrayCobradas.push({y:totalesSumados.CobradasMarzo});
					arrayCobradas.push({y:totalesSumados.CobradasAbril});
					arrayCobradas.push({y:totalesSumados.CobradasMayo});
					arrayCobradas.push({y:totalesSumados.CobradasJunio});
					arrayCobradas.push({y:totalesSumados.CobradasJulio});
					arrayCobradas.push({y:totalesSumados.CobradasAgosto});
					arrayCobradas.push({y:totalesSumados.CobradasSeptiembre});
					arrayCobradas.push({y:totalesSumados.CobradasOctubre});
					arrayCobradas.push({y:totalesSumados.CobradasNoviembre});
					arrayCobradas.push({y:totalesSumados.CobradasDiciembre});

					arrayRealizadas.push({y:totalesSumados.RealizadasEnero});
					arrayRealizadas.push({y:totalesSumados.RealizadasFebrero});
					arrayRealizadas.push({y:totalesSumados.RealizadasMarzo});
					arrayRealizadas.push({y:totalesSumados.RealizadasAbril});
					arrayRealizadas.push({y:totalesSumados.RealizadasMayo});
					arrayRealizadas.push({y:totalesSumados.RealizadasJunio});
					arrayRealizadas.push({y:totalesSumados.RealizadasJulio});
					arrayRealizadas.push({y:totalesSumados.RealizadasAgosto});
					arrayRealizadas.push({y:totalesSumados.RealizadasSeptiembre});
					arrayRealizadas.push({y:totalesSumados.RealizadasOctubre});
					arrayRealizadas.push({y:totalesSumados.RealizadasNoviembre});
					arrayRealizadas.push({y:totalesSumados.RealizadasDiciembre});

					ltGrafica = [{
						name: 'Cobradas',
						data: arrayCobradas,
						color: '#4572A7'
					},  {
						name: 'Por cobrar',
						data: arrayRealizadas,
						color: '#AA4643'
					}];
				}
			}else{
				titulo = Op.jsonTotal[0].TITULO;
				totalRealizadas = Op.jsonTotal[0].TOTAL;
				simbolo = Op.jsonTotal[0].MONEDA_SIMBOLO;
				tkm = (Op.jsonTotal[0].TKM) ? Op.jsonTotal[0].TKM : '';
				periodo = Op.jsonTotal[0].PERIODO;
				var elSimbolo = String.fromCharCode(simbolo);
				realizadas = Op.jsonDatos;
				SalesUp.Variables.jsonReporteRc = realizadas;
				SalesUp.Variables.jsonReporteRcAdicionales = Op.jsonTotal;
				
				tmpHead += '<tr><th></th>';
				tmpHead += '<th class="tIzq">'+titulo+'</th>';
				tmpHead += '<th class="tCen">Enero</th>';
				tmpHead += '<th class="tCen">Febrero</th>';
				tmpHead += '<th class="tCen">Marzo</th>';
				tmpHead += '<th class="tCen">Abril</th>';
				tmpHead += '<th class="tCen">Mayo</th>';
				tmpHead += '<th class="tCen">Junio</th>';
				tmpHead += '<th class="tCen">Julio</th>';
				tmpHead += '<th class="tCen">Agosto</th>';
				tmpHead += '<th class="tCen">Septiembre</th>';
				tmpHead += '<th class="tCen">Octubre</th>';
				tmpHead += '<th class="tCen">Noviembre</th>';
				tmpHead += '<th class="tCen">Diciembre</th>';
				tmpHead += '<th class="tCen">Total</th>';
				tmpHead += '</tr>';
				tmpBody += '<tr>';
				tmpBody += '<td class="tCen Bold">{{nFila}}</td>';
				tmpBody += '<td class="tIzq">{{Ejecutivo}}</td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda Enero "'+simbolo+'" 0}}</span></a></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=2&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda Febrero "'+simbolo+'" 0}}</span></a></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=3&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda Marzo "'+simbolo+'" 0}}</span></a></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=4&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda Abril "'+simbolo+'" 0}}</span></a></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=5&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda Mayo "'+simbolo+'" 0}}</span></a></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=6&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda Junio "'+simbolo+'" 0}}</span></a></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=7&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda Julio "'+simbolo+'" 0}}</span></a></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=8&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda Agosto "'+simbolo+'" 0}}</span></a></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=9&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda Septiembre "'+simbolo+'" 0}}</span></a></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=10&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda Octubre "'+simbolo+'" 0}}</span></a></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=11&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda Noviembre "'+simbolo+'" 0}}</span></a></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=12&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda Diciembre "'+simbolo+'" 0}}</span></a></td>';
				tmpBody += '<td class="tDer"><a href="/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=0&moneda='+tkm+'&parametros={{TK}}"><span class="Pointer">{{hlp_Simbolo_Moneda Total "'+simbolo+'" 0}}</span></a></td>';
				tmpBody += '</tr>';
				totalesSumados = SalesUp.Sistema.sumaColumna(realizadas,[{columna:'MONTO_ENE'},{columna:'MONTO_FEB'},{columna:'MONTO_MAR'},{columna:'MONTO_ABR'},{columna:'MONTO_MAY'},{columna:'MONTO_JUN'},{columna:'MONTO_JUL'},{columna:'MONTO_AGO'},{columna:'MONTO_SEP'},{columna:'MONTO_OCT'},{columna:'MONTO_NOV'},{columna:'MONTO_DIC'},{columna:'MONTO_TOTAL'}]);

				var laVariante = $('#laVariante').val();
				var TotalizarE = _.where(SalesUp.Variables.jsonInfoReportes.variantes,{tkRsv:laVariante});
				var Totalizar = TotalizarE[0].totalizar;
				if((Totalizar === null || Totalizar === 1) && Totalizar != 0){
					tmpFoot += '<tr class="elTotal"><td></td><td class="tDer">Totales</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.MONTO_ENE,simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.MONTO_FEB,simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.MONTO_MAR,simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.MONTO_ABR,simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.MONTO_MAY,simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.MONTO_JUN,simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.MONTO_JUL,simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.MONTO_AGO,simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.MONTO_SEP,simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.MONTO_OCT,simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.MONTO_NOV,simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.MONTO_DIC,simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.MONTO_TOTAL,simbolo,1)+'</td>';
					tmpFoot += '</tr>';
				}else if(Totalizar === 2){
					tmpFoot += '<tr class="elTotal"><td></td><td class="tDer">Promedios</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.MONTO_ENE/_.size(realizadas)),simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.MONTO_FEB/_.size(realizadas)),simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.MONTO_MAR/_.size(realizadas)),simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.MONTO_ABR/_.size(realizadas)),simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.MONTO_MAY/_.size(realizadas)),simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.MONTO_JUN/_.size(realizadas)),simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.MONTO_JUL/_.size(realizadas)),simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.MONTO_AGO/_.size(realizadas)),simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.MONTO_SEP/_.size(realizadas)),simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.MONTO_OCT/_.size(realizadas)),simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.MONTO_NOV/_.size(realizadas)),simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.MONTO_DIC/_.size(realizadas)),simbolo,1)+'</td>';
					tmpFoot += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((totalesSumados.MONTO_TOTAL/_.size(realizadas)),simbolo,1)+'</td>';
					tmpFoot += '</tr>';
				}
				total = totalRealizadas;

				if (totalRealizadas > 0){
					var preparadoObj = preparaObjReporteRc({datos:realizadas, adicional:Op.jsonTotal, tipoGrafica:tipoGrafica});
					ltReporte = preparadoObj.tabla;
					ltGrafica = preparadoObj.grafica;
				}/*totalRealizadas > 0*/
			}/*else de (objFiltro.filtros[0].ventaRC == 2 || objFiltro.filtros[0].ventaNR == 5)*/

			SalesUp.Construye.ConstruyeTabla(tmpHead,tmpBody,ltReporte,{Destino:'#DatosLoad',Id:'ReportTable',PagActual:start});

			$('#ReportTable tfoot').html(tmpFoot);
			var $tabla = $('#ReportTable');

			SalesUp.reportes.paginacion({registros:total,start:start,callback:SalesUp.reportes.ventas.cobradasVsRealizadas,tabla:$tabla,parametros:filtro});
			if(total > 0){ construyeGraficaRC({grafica:tipoGrafica, series:ltGrafica, simbolo:elSimbolo}); }

		}/*muestraReporte*/

		SalesUp.Sistema.CargaDatosAsync({
			link: link,
			parametros: 'filtros='+filtro+'&inicio='+start,
			callback: muestraReporte
		});
	}/*cobradasVsRealizadas*/

	this.switchGrafica = function(activo){
		var simbolo = SalesUp.Variables.jsonReporteRcAdicionales[0].MONEDA_SIMBOLO;
		var elSimbolo = String.fromCharCode(simbolo);
		var tipoGrafica = (activo) ? 2 : 1;
		var ltGrafica = preparaObjReporteRc({datos:SalesUp.Variables.jsonReporteRc, tipoGrafica:tipoGrafica, adicional:SalesUp.Variables.jsonReporteRcAdicionales}).grafica;
		construyeGraficaRC({grafica:tipoGrafica, series:ltGrafica, simbolo:elSimbolo});
	}

	var construyeGraficaRC = function(Op){
		var tipoGrafica = Op.grafica, series = Op.series, categorias = Op.categorias, elSimbolo = Op.simbolo;
		switch (tipoGrafica){
			case 1 : 
			var categorias = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
			var tooltip = {
				formatter: function(){
					return '<b>'+ this.series.name +'</b>: '+ SalesUp.Sistema.moneda({moneda:elSimbolo, numero:this.point.y});
				}
			};
			SalesUp.reportes.graficaLineal({series:series, tooltip:tooltip, categorias:categorias});
			break;
			case 2 :
			var tooltip = {pointFormat: '<b>{series.name}</b>: <b>{point.percentage:.2f}%</b>'};
			SalesUp.reportes.graficaPie({datos:series, tooltip:tooltip});
			break;
			case 3 :
			var tooltip = {
				headerFormat: '<span style="font-size:10px"><h3>{point.key}</h3></span><table>',
				pointFormatter: function(){
					return '<tr><td style="color:'+this.series.color+';padding:0"><b>'+this.series.name+': </b></td><td style="text-align:right;padding:0"><b> '+SalesUp.Sistema.moneda({moneda:elSimbolo, numero:this.y})+'</b></td></tr>'
				},
				footerFormat: '</table>',
				shared: true,
				useHTML: true
			}
			var categorias = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
			SalesUp.reportes.graficaColumna({categorias:categorias, series:series, tooltip:tooltip});
			break;
		}
	}/*construyeGraficaRC*/

	var preparaObjReporteRc = function(Op){
		var realizadas = Op.datos, tipoGrafica = Op.tipoGrafica, adicional = Op.adicional[0];
		var ltReporte = [], ltGrafica = [], totalesSumados = [];
		totalesSumados = SalesUp.Sistema.sumaColumna(realizadas,[{columna:'MONTO_TOTAL'}]);
		var titulo = adicional.TITULO;
		
		for(var je = 0; je < _.size(realizadas); je++){
			var arrReporte = {}, arrGrafica = {}, ja = realizadas[je];

			switch (titulo){
				case 'Ejecutivo': 
				arrReporte.Ejecutivo = ja.EJECUTIVO; arrReporte.Tipo = '1'; arrReporte.TK = ja.TKU; arrGrafica.name = ja.EJECUTIVO; break;
				case 'Grupo/Departamento':
				arrReporte.Ejecutivo = ja.GRUPO; arrReporte.Tipo = '2'; arrReporte.TK = ja.TK; arrGrafica.name = ja.GRUPO; break;
				case 'Línea':
				arrReporte.Ejecutivo = ja.LINEA_PRODUCTO; arrReporte.Tipo = '3'; arrReporte.TK = ja.TK; arrGrafica.name = ja.LINEA_PRODUCTO; break;
				case 'Objetivo':
				arrReporte.Ejecutivo = ja.ORIGEN; arrReporte.Tipo = '4'; arrReporte.TK = ja.TK; arrGrafica.name = ja.ORIGEN; break;
				case 'País':
				arrReporte.Ejecutivo = ja.PAIS; arrReporte.Tipo = '5'; arrReporte.TK = ja.IDPAIS; arrGrafica.name = ja.PAIS; break;
				case 'Región':
				arrReporte.Ejecutivo = ja.REGION; arrReporte.Tipo = '6'; arrReporte.TK = ja.REGION; arrGrafica.name = ja.REGION; break;
				case 'Ciudad':
				arrReporte.Ejecutivo = ja.CIUDAD; arrReporte.Tipo = '7'; arrReporte.TK = ja.CIUDAD; arrGrafica.name = ja.CIUDAD; break;
			}/*switch (titulo)*/

			arrReporte.Enero = ja.MONTO_ENE;
			arrReporte.Febrero = ja.MONTO_FEB;
			arrReporte.Marzo = ja.MONTO_MAR;
			arrReporte.Abril = ja.MONTO_ABR;
			arrReporte.Mayo = ja.MONTO_MAY;
			arrReporte.Junio = ja.MONTO_JUN;
			arrReporte.Julio = ja.MONTO_JUL;
			arrReporte.Agosto = ja.MONTO_AGO;
			arrReporte.Septiembre = ja.MONTO_SEP;
			arrReporte.Octubre = ja.MONTO_OCT;
			arrReporte.Noviembre = ja.MONTO_NOV;
			arrReporte.Diciembre = ja.MONTO_DIC;
			arrReporte.Total = ja.MONTO_TOTAL;

			ltReporte.push(arrReporte);

			if (tipoGrafica == 1) {
				arrGrafica.data =[];
				arrGrafica.data.push(parseInt(ja.MONTO_ENE));
				arrGrafica.data.push(parseInt(ja.MONTO_FEB));
				arrGrafica.data.push(parseInt(ja.MONTO_MAR));
				arrGrafica.data.push(parseInt(ja.MONTO_ABR));
				arrGrafica.data.push(parseInt(ja.MONTO_MAY));
				arrGrafica.data.push(parseInt(ja.MONTO_JUN));
				arrGrafica.data.push(parseInt(ja.MONTO_JUL));
				arrGrafica.data.push(parseInt(ja.MONTO_AGO));
				arrGrafica.data.push(parseInt(ja.MONTO_SEP));
				arrGrafica.data.push(parseInt(ja.MONTO_OCT));
				arrGrafica.data.push(parseInt(ja.MONTO_NOV));
				arrGrafica.data.push(parseInt(ja.MONTO_DIC));
			}else{
				arrGrafica.y = ja.MONTO_TOTAL / totalesSumados.MONTO_TOTAL;
			}

			ltGrafica.push(arrGrafica);

		}/*for*/

		return {grafica:ltGrafica, tabla:ltReporte};
	}/*preparaObjReporteRc*/

	this.cruzada = function(obj){
		(!obj) ? obj = {}:'';

		var tablaVacia = '<table id="SinResultados" class="BoxSizing"><tbody><tr><td><div class="SinResultados BoxSizing w100"><i class="fa fa-info-circle"></i> No se encontraron registros con este criterio</div></td></tr></tbody></table>';

		var filtro = obj.filtro;
		var objFiltro = JSON.parse(filtro);

		var start = (obj.start) ? obj.start : 1;

		var muestraReporteVtaCruzada = function(Op) {
			var OpIntacto = SalesUp.Sistema.clone(Op);
			SalesUp.Variables.DatosRecibidos = SalesUp.Sistema.clone(Op);
			var Op = SalesUp.Variables.DatosRecibidos

			var preparaNuevoJsonCampos = _.each(Op.jsonCampos,function(a,b){
				z = Op.jsonPenetracion[0][a.CAMPO]
				a.valor = parseFloat(z)
				return a
			})

			Op.jsonCampos = _.sortBy(preparaNuevoJsonCampos,function(j){ return (-1*j.valor) })

			var TOTAL = (Op.jsonDatos[0].REGISTROS) ? Op.jsonDatos[0].REGISTROS : 0;
			SalesUp.Variables.Op =	Op;
			Op.jsonCampos = _.first(Op.jsonCampos, 10);
			var template = '<tr>';
			template += '<td class="tCen" style="width:210px;">NOMBRE</td>';
			template += '{{#each jsonCampos}}';
			template += '<td class="tCen" colspan="2">{{hlpCortaPalabra CABECERA 25 5}}</td>';
			template += '{{/each}}';
			template += '<td class="tDer" style="width:95px;">Penetración</td>';
			template += '</tr>';
			var tHead = SalesUp.Construye.ReemplazaDatos({Template:template, Datos:Op});

			var style="background-Color:"+rgba+";color:'"+color+"';"
			var template = '<tr class="Penetracion">';
			template += '<td class="tDer" style="font-weight:bold;">Penetración</td>';
			template += '{{#each jsonCampos}}';
			template += '<td colspan="2" class="tCen">{{openCurly}}hlpSimboloPorcentaje {{CAMPO}}{{closeCurly}}</td>';
			template += '{{/each}}';
			template += '<td></td>';
			template += '</tr>';
			var templatePenetracion = SalesUp.Construye.ReemplazaDatos({Template:template, Datos:Op});

			var template = '{{#each jsonPenetracion}}'+templatePenetracion+'{{/each}}';
			var tHeadatos = SalesUp.Construye.ReemplazaDatos({Template:template, Datos:Op});

			var template = '<tr>';
			template += '<td><a href="/privado/clientes-visualizar.dbsp?tkp={{openCurly}}TKP{{closeCurly}}">{{openCurly}}NOMBRE{{closeCurly}}</a><br>';
			template += '<span class="companyB">{{openCurly}}hlpEmpresa TKCOM COMPANIA{{closeCurly}}</span></td>';
			template += '{{#each jsonCampos}}';
			template += '<td class="tDer">{{openCurly}}hlpSimboloMonedaCruzada {{CAMPO}} "" 0 TRANS_{{CAMPO}}{{closeCurly}}</td>\n';
			template += '<td class="tCen">{{openCurly}}hlpEsCero TRANS_{{CAMPO}}{{closeCurly}}</td>\n';
			template += '{{/each}}';
			template += '<td class="tDer">{{openCurly}}hlpSimboloPorcentaje PENETRACIONV{{closeCurly}}</td>';
			template += '</tr>';
			var templateDatos = SalesUp.Construye.ReemplazaDatos({Template:template, Datos:Op});
			if (OpIntacto.jsonCampos[0].CABECERA) {
			SalesUp.Construye.ConstruyeTabla(tHead,templateDatos,Op.jsonDatos,{Destino:'#DatosLoad',Id:'ReportTable',PagActual:start});
			}else{
				$('#DatosLoad').html(tablaVacia);
			}
			var $tabla = $('#ReportTable');
			SalesUp.reportes.paginacion({registros:TOTAL,start:start,callback:SalesUp.reportes.ventas.cruzada,tabla:$tabla,parametros:filtro});

			if (TOTAL > 0 && OpIntacto.jsonCampos[0].CABECERA) {
				$('#ReportTable tBody').prepend(tHeadatos);
				var color = $('#menu-superior').css('color');
				var rgb = $('#menu-superior').css('backgroundColor');
				var hex = SalesUp.Sistema.rgb2hex(rgb);
				var rgba = SalesUp.Sistema.hex2rgb(hex, 80);
				$(".Penetracion").css({"background-Color":rgba,color:color});
				/*********Totales**********/
				Sumatoria = new Array(); 
				y = 0
				var y2 = y;
				for(x in Op.jsonCampos){
					Sumatoria[y] = SalesUp.Sistema.sumaColumna(Op.jsonDatos,[{columna:Op.jsonCampos[x].CAMPO}]);
					Sumatoria[y+1] = SalesUp.Sistema.sumaColumna(Op.jsonDatos,[{columna:'TRANS_'+Op.jsonCampos[x].CAMPO}]);
					y = y+2;
				}
				var SumatoriaTotales = SalesUp.Sistema.sumaColumna(Op.jsonDatos,[{columna:'PENETRACIONV'}])
				var newJson = new Object();
				newJson.suma = Sumatoria;
				var laVariante = $('#laVariante').val();
				var TotalizarE = _.where(SalesUp.Variables.jsonInfoReportes.variantes,{tkRsv:laVariante});
				var Totalizar = TotalizarE[0].totalizar;
				if((Totalizar === null || Totalizar === 2) && Totalizar != 0){
					template = '<tr class="elTotal"><td class="tDer">Promedios</td>';
					y=0;
					for(x in Op.jsonCampos){
						var CAMPO1 = Op.jsonCampos[x].CAMPO;
						var CAMPO2 = 'TRANS_'+CAMPO1;
						template += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((Sumatoria[y][CAMPO1]/Op.jsonDatos.length),'',1)+'</td>';
						y++;

						if ((Sumatoria[y][CAMPO2]%Op.jsonDatos.length) == 0 ) {
							var sumat = parseInt(Sumatoria[y][CAMPO2]/Op.jsonDatos.length)
						}else{
							var sumat = SalesUp.Sistema.numeroConDecimal(Sumatoria[y][CAMPO2]/Op.jsonDatos.length)
						}
						template += '<td class="tCen">'+sumat+'</td>';
						y++;
					}
					template += '<td class="tDer">'+Handlebars.helpers.hlpSimboloPorcentaje(SumatoriaTotales.PENETRACIONV/Op.jsonDatos.length,'',1)+'</td></tr>';
					$('#ReportTable tfoot').html(template);
				}else if(Totalizar === 1){
					template = '<tr class="elTotal"><td class="tDer">Totales</td>';
					y=0;
					for(x in Op.jsonCampos){
						var CAMPO1 = Op.jsonCampos[x].CAMPO;
						var CAMPO2 = 'TRANS_'+CAMPO1;
						template += '<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda((Sumatoria[y][CAMPO1]),'',1)+'</td>';
						y++;
						if ((Sumatoria[y][CAMPO2]%Op.jsonDatos.length) == 0 ) {
							var sumat = parseInt(Sumatoria[y][CAMPO2])
						}else{
							var sumat = (Sumatoria[y][CAMPO2])
						}
						template += '<td class="tCen">'+sumat+'</td>';
						y++;
					}
					template += '<td class="tDer">'+Handlebars.helpers.hlpSimboloPorcentaje(SumatoriaTotales.PENETRACIONV,'',1)+'</td></tr>';
					$('#ReportTable tfoot').html(template);
				}

				/***** construccion para la grafica*******/
				var penetracion = Op.jsonPenetracion;
				pcategorias = Op.jsonCampos
				categorias = new Array();
				for(x in pcategorias)
				{
					categorias.push(Handlebars.helpers.hlpCortaPalabra(pcategorias[x].CABECERA,25,5))
				}
				
				var c;
				c = categorias.length-1;
				categorias= _.first(categorias, 10);
				series = _.values(Op.jsonPenetracion[0]);
				series.splice(0,1);
				c = series.length-1;
				series.splice(c,1);
				series = _.first(series, 10);
				var tooltip = {
					shared: false,
					formatter: function() {
						return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' +SalesUp.Sistema.numeroConDecimal(this.y)+ ' %'
					}
				};

				series = _.map(series,function(j){return parseFloat(j*100)});

				var datos = [{
					name: 'Penetración',
					data: series
				}]

				SalesUp.reportes.graficaBarra({tooltip: tooltip, series:datos,categorias:categorias})
			}
			

		}

		var $lasVariantes = $('#lasVariantes'), $laVariante = $('#laVariante'), $laOpcion = $laVariante.find('option:selected');
		var tipoVariante = $laOpcion.attr('data-sistema');
		var qryString = 'tkrs='+SalesUp.Variables.tkrs+'&tipoVariante='+tipoVariante+'&laVariante='+$laVariante.val()+'&inicia='+start+'&filtros='+filtro;

		SalesUp.Sistema.CargaDatosAsync({
			link:'/privado/Modelo/jsonCruzada.dbsp',
			prmAdicionales:qryString,
			parametros:qryString,
			callback:muestraReporteVtaCruzada
		})
	}

}/*reportesVentas*/