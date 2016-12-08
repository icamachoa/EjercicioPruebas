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
				tmpBody += '<td class="tIzq"><a href=detalleReporteProductosventas.dbsp?'+qryString+'&agrupacion='+agrupacion+'&parametros={{TK}}>{{LINEA_PRODUCTO}}</a></td>';
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
		var filtros2 = SalesUp.reportes.obtieneValoresCriterios({sinVacios:true});
		var qryString = 'tkrs='+SalesUp.Variables.tkrs+'&tipoVariante='+tipoVariante+'&laVariante='+$laVariante.val()+'&inicia='+start+'&filtros='+encodeURIComponent(filtros2);



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
			
			if (objFiltro.filtros[0].ventaRC == 2 || objFiltro.filtros[0].ventaNR == 5) {
				cuerpoVentasRCNRvs({Op:Op,tipoGrafica:tipoGrafica,actividad:actividad,start:start,filtro:filtro});
			}else{
				cuerpoVentasRCNRSimple({Op:Op,tipoGrafica:tipoGrafica,actividad:actividad,start:start,filtro:filtro});
			}/*else de (objFiltro.filtros[0].ventaRC == 2 || objFiltro.filtros[0].ventaNR == 5)*/

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
			SalesUp.reportes.graficaColumnaStack({categorias:categorias, series:series, tooltip:tooltip});
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

			arrReporte.Ejecutivo = ja.NOMBRE;
			arrReporte.TK = ja.TK;
			arrGrafica.name = ja.NOMBRE;
			switch (titulo){
				case 'Ejecutivo': 
				 arrReporte.Tipo = '1'; break;
				case 'Grupo/Departamento':
				 arrReporte.Tipo = '2'; break;
				case 'Línea':
				 arrReporte.Tipo = '3'; break;
				case 'Objetivo':
				 arrReporte.Tipo = '4'; break;
				case 'País': arrReporte.Ejecutivo = ja.NOMBRE; arrGrafica.name = ja.NOMBRE; arrReporte.Tipo = '5'; arrReporte.TK = ja.ID; id = 'ID';
		        break;
		        case 'Región': arrReporte.Ejecutivo = ja.NOMBRE; arrGrafica.name = ja.NOMBRE; arrReporte.Tipo = '6'; arrReporte.TK = ja.NOMBRE; id = 'NOMBRE';
		        break;
		        case 'Ciudad': arrReporte.Ejecutivo = ja.NOMBRE; arrGrafica.name = ja.NOMBRE; arrReporte.Tipo = '7'; arrReporte.TK = ja.NOMBRE; id = 'NOMBRE';
		        break;
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
				a.valor = parseFloat(z);
				return a;
			})

			Op.jsonCampos = _.sortBy(preparaNuevoJsonCampos,function(j){ return (-1*j.valor) });
			OpIntacto.jsonCampos = Op.jsonCampos;
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
				// series = _.values(Op.jsonPenetracion[0]);
				// series.splice(0,1);
				// c = series.length-1;
				// series.splice(c,1);
				// series = _.first(series, 10);
				var tooltip = {
					shared: false,
					formatter: function() {
						return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' +SalesUp.Sistema.numeroConDecimal(this.y)+ ' %'
					}
				};

				var series = _.map(Op.jsonCampos,function(j){
					return parseFloat(j.valor)
				});
				series = _.first(series,10)

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

	var cuerpoVentasRCNRSimple = function(Obj){

		var Op = Obj.Op;
		var tipoGrafica = Obj.tipoGrafica;
		var actividad = Obj.actividad;
		var start = Obj.start;
		var filtro = Obj.filtro;

		SalesUp.Variables.DatosRecibidos = SalesUp.Sistema.clone(Op);
		var realizadas,cobradas, totalRealizadas,totalCobradas, titulo, total;
		var tmpHead = '', tmpBody = '', simbolo = '', tmpFoot ='', tkm = '', periodo = '';
		var ltReporte = [], ltGrafica = [], totalesSumados = [];
		
		
		titulo = Op.jsonTotal[0].TITULO;
		SalesUp.Variables.DatosRecibidos = SalesUp.Sistema.clone(Op);
		totalRealizadas = Op.jsonTotal[0].TOTAL;
		simbolo = Op.jsonTotal[0].MONEDA_SIMBOLO;
		tkm = (Op.jsonTotal[0].TKM) ? Op.jsonTotal[0].TKM : '';
		periodo = Op.jsonTotal[0].PERIODO;

		var elSimbolo = String.fromCharCode(simbolo);

		realizadas = Op.jsonDatos;
		SalesUp.Variables.jsonReporteRc = realizadas;
		SalesUp.Variables.jsonReporteRcAdicionales = Op.jsonTotal;

		totalesSumados = SalesUp.Sistema.sumaColumna(realizadas,[{columna:'MONTO_ENE'},{columna:'MONTO_FEB'},{columna:'MONTO_MAR'},{columna:'MONTO_ABR'},{columna:'MONTO_MAY'},{columna:'MONTO_JUN'},{columna:'MONTO_JUL'},{columna:'MONTO_AGO'},{columna:'MONTO_SEP'},{columna:'MONTO_OCT'},{columna:'MONTO_NOV'},{columna:'MONTO_DIC'},{columna:'MONTO_TOTAL'}]);
		var laVariante = $('#laVariante').val();
		var TotalizarE = _.where(SalesUp.Variables.jsonInfoReportes.variantes,{tkRsv:laVariante});
		var Totalizar = TotalizarE[0].totalizar;
		var tRealizadas = _.size(realizadas);

		var arrHead = {titulo:titulo};

		var arrTablas = {};
			arrTablas.actividad 	= actividad;
			arrTablas.tkm 			= tkm;
			arrTablas.simbolo 		= simbolo;
			arrTablas.periodoValor	= periodo;
			arrTablas.periodo 		= '{{periodo}}';
			arrTablas.Ejecutivo 	= '{{Ejecutivo}}';

		if ((Totalizar === null || Totalizar === 1) && Totalizar != 0) {
			arrTablas.TotalEnero 		= totalesSumados.MONTO_ENE;
			arrTablas.TotalFebrero 		= totalesSumados.MONTO_FEB;
			arrTablas.TotalMarzo 		= totalesSumados.MONTO_MAR;
			arrTablas.TotalAbril 		= totalesSumados.MONTO_ABR;
			arrTablas.TotalMayo 		= totalesSumados.MONTO_MAY;
			arrTablas.TotalJunio 		= totalesSumados.MONTO_JUN;
			arrTablas.TotalJulio 		= totalesSumados.MONTO_JUL;
			arrTablas.TotalAgosto 		= totalesSumados.MONTO_AGO;
			arrTablas.TotalSeptiembre 	= totalesSumados.MONTO_SEP;
			arrTablas.TotalOctubre 		= totalesSumados.MONTO_OCT;
			arrTablas.TotalNoviembre 	= totalesSumados.MONTO_NOV;
			arrTablas.TotalDiciembre 	= totalesSumados.MONTO_DIC;
			arrTablas.TotalTotal 		= totalesSumados.MONTO_TOTAL;
		}else if(Totalizar === 2){
			arrTablas.TotalEnero 		= totalesSumados.MONTO_ENE/tRealizadas;
			arrTablas.TotalFebrero 		= totalesSumados.MONTO_FEB/tRealizadas;
			arrTablas.TotalMarzo 		= totalesSumados.MONTO_MAR/tRealizadas;
			arrTablas.TotalAbril 		= totalesSumados.MONTO_ABR/tRealizadas;
			arrTablas.TotalMayo 		= totalesSumados.MONTO_MAY/tRealizadas;
			arrTablas.TotalJunio 		= totalesSumados.MONTO_JUN/tRealizadas;
			arrTablas.TotalJulio 		= totalesSumados.MONTO_JUL/tRealizadas;
			arrTablas.TotalAgosto 		= totalesSumados.MONTO_AGO/tRealizadas;
			arrTablas.TotalSeptiembre 	= totalesSumados.MONTO_SEP/tRealizadas;
			arrTablas.TotalOctubre 		= totalesSumados.MONTO_OCT/tRealizadas;
			arrTablas.TotalNoviembre 	= totalesSumados.MONTO_NOV/tRealizadas;
			arrTablas.TotalDiciembre 	= totalesSumados.MONTO_DIC/tRealizadas;
			arrTablas.TotalTotal 		= totalesSumados.MONTO_TOTAL/tRealizadas;
		}

			arrTablas.txtHlpEnero 			= 'Enero';
			arrTablas.txtHlpFebrero			= 'Febrero';
			arrTablas.txtHlpMarzo 			= 'Marzo';
			arrTablas.txtHlpAbril 			= 'Abril';
			arrTablas.txtHlpMayo 			= 'Mayo';
			arrTablas.txtHlpJunio 			= 'Junio';
			arrTablas.txtHlpJulio 			= 'Julio';
			arrTablas.txtHlpAgosto 			= 'Agosto';
			arrTablas.txtHlpSeptiembre 		= 'Septiembre';
			arrTablas.txtHlpOctubre 		= 'Octubre';
			arrTablas.txtHlpNoviembre 		= 'Noviembre';
			arrTablas.txtHlpDiciembre 		= 'Diciembre';
			arrTablas.txtHlpTotal 			= 'Total';
			
			arrTablas.txtLinkEnero 			= '/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=1&moneda='+tkm+'&parametros={{TK}}';
			arrTablas.txtLinkFebrero		= '/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=2&moneda='+tkm+'&parametros={{TK}}';
			arrTablas.txtLinkMarzo 			= '/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=3&moneda='+tkm+'&parametros={{TK}}';
			arrTablas.txtLinkAbril 			= '/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=4&moneda='+tkm+'&parametros={{TK}}';
			arrTablas.txtLinkMayo 			= '/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=5&moneda='+tkm+'&parametros={{TK}}';
			arrTablas.txtLinkJunio 			= '/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=6&moneda='+tkm+'&parametros={{TK}}';
			arrTablas.txtLinkJulio 			= '/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=7&moneda='+tkm+'&parametros={{TK}}';
			arrTablas.txtLinkAgosto 		= '/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=8&moneda='+tkm+'&parametros={{TK}}';
			arrTablas.txtLinkSeptiembre 	= '/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=9&moneda='+tkm+'&parametros={{TK}}';
			arrTablas.txtLinkOctubre 		= '/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=10&moneda='+tkm+'&parametros={{TK}}';
			arrTablas.txtLinkNoviembre 		= '/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=11&moneda='+tkm+'&parametros={{TK}}';
			arrTablas.txtLinkDiciembre 		= '/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=12&moneda='+tkm+'&parametros={{TK}}';
			arrTablas.txtLinkTotal 			= '/privado/reportes_ventas_detalle.dbsp?periodo='+periodo+'&actividad='+actividad+'&tipo={{Tipo}}&mes=0&moneda='+tkm+'&parametros={{TK}}';

		total = totalRealizadas;

		tmpHead = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/hReporteVentasRCNRSimple.dbsp',DataType:'html'});
		tmpBody = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/bReporteVentasRCNRSimple.dbsp',DataType:'html'});
		tmpFoot = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/fReporteVentasRCNRSimple.dbsp',DataType:'html'});

		var header = SalesUp.Construye.ReemplazaDatos({Template:tmpHead, Datos:arrHead});
		var body = SalesUp.Construye.ReemplazaDatos({Template:tmpBody, Datos:arrTablas});
		var footer = SalesUp.Construye.ReemplazaDatos({Template:tmpFoot, Datos:arrTablas});


		if (totalRealizadas > 0){
			var preparadoObj = preparaObjReporteRc({datos:realizadas, adicional:Op.jsonTotal, tipoGrafica:tipoGrafica});
			ltReporte = preparadoObj.tabla;
			ltGrafica = preparadoObj.grafica;
		}/*totalRealizadas > 0*/
		
		SalesUp.Construye.ConstruyeTabla(header,body,ltReporte,{Destino:'#DatosLoad',Id:'ReportTable',PagActual:start});

		$('#ReportTable tfoot').html(footer);
		var $tabla = $('#ReportTable');

		SalesUp.reportes.paginacion({registros:total,start:start,callback:SalesUp.reportes.ventas.cobradasVsRealizadas,tabla:$tabla,parametros:filtro});
		if(total > 0){ construyeGraficaRC({grafica:tipoGrafica, series:ltGrafica, simbolo:elSimbolo}); }
	}/*Cuerpo Reporte Ventas Realizadas,Cobradas,Recompra y nuevas*/

	var preparaJsonVs = function(jRealizadas,jCobradas,titulo){

	  var realizadas = jRealizadas;
	  var cobradas = jCobradas;
	  var ltFinal = [];

	  var tRealizadas = _.size(realizadas);
	  var tCobradas = _.size(cobradas);
	  var id = '';
	  
	  var nCobradas = cobradas;

	  if (tRealizadas > 0){
		  for(i=0;i<tRealizadas;i++){
		    
		    var arrReporte = {},arrGrafica = {};
		    var r = realizadas[i];
		    var encontrado = 0;

		    arrReporte.Ejecutivo = r.NOMBRE;
		    arrGrafica.name = r.NOMBRE;
			arrReporte.TK = r.TK;
			id = 'TK';

		    switch (titulo){
		      case 'Ejecutivo': arrReporte.Tipo = '1'; break;
		      case 'Grupo/Departamento': arrReporte.Tipo = '2'; break;
		      case 'Línea': arrReporte.Tipo = '3'; break;
		      case 'Objetivo': arrReporte.Tipo = '4'; break;
		      case 'País':
		        arrReporte.Ejecutivo = r.NOMBRE;
		        arrGrafica.name = r.NOMBRE;
		        arrReporte.Tipo = '5';
		        arrReporte.TK = r.ID;
		        id = 'ID';
		        break;
		        case 'Región':
		        arrReporte.Ejecutivo = r.NOMBRE;
		        arrGrafica.name = r.NOMBRE;
		        arrReporte.Tipo = '6';
		        arrReporte.TK = r.NOMBRE;
		        id = 'NOMBRE';
		        break;
		        case 'Ciudad':
		        arrReporte.Ejecutivo = r.NOMBRE;
		        arrGrafica.name = r.NOMBRE;
		        arrReporte.Tipo = '7';
		        arrReporte.TK = r.NOMBRE;
		        id = 'NOMBRE';
		        break;
		    }

		    var idRealizadas = r[id];
		    
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
		    
		    for(j=0;j<tCobradas;j++){

		      var c = cobradas[j];
		      var idCobradas = c[id];
		      if(idCobradas == idRealizadas){
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
		        
		        nCobradas = _.reject(nCobradas,function(json){
		          return json == c;
		       	});
		        encontrado = 1;
		      }else if(encontrado == 0){
		        arrReporte.CobradasEnero = '0';
		        arrReporte.CobradasFebrero = '0';
		  		arrReporte.CobradasMarzo = '0';
		  		arrReporte.CobradasAbril = '0';
		  		arrReporte.CobradasMayo = '0';
		  		arrReporte.CobradasJunio = '0';
		  		arrReporte.CobradasJulio = '0';
		  		arrReporte.CobradasAgosto = '0';
		  		arrReporte.CobradasSeptiembre = '0';
		  		arrReporte.CobradasOctubre = '0';
		  		arrReporte.CobradasNoviembre = '0';
		  		arrReporte.CobradasDiciembre = '0';
		  		arrReporte.CobradasTotal = '0';
		      }
		      
		    }
		    
		    ltFinal.push(arrReporte);
		  }
	}

	  tCobradas = _.size(nCobradas);
	 
	  if (tCobradas > 0){
	    for(i=0;i<tCobradas;i++){
	      var arrReporte = {},arrGrafica = {};
	      var c = nCobradas[i];
	      var idCobradas = c[id];

	      arrReporte.Ejecutivo = c.NOMBRE;
	      arrGrafica.name = c.NOMBRE;
	      arrReporte.TK = c.TK;
	      id = 'TK';

	      switch (titulo){
	        case 'Ejecutivo': arrReporte.Tipo = '1'; break;
	        case 'Grupo/Departamento': arrReporte.Tipo = '2'; break;
	        case 'Línea': arrReporte.Tipo = '3'; break;
	        case 'Objetivo': arrReporte.Tipo = '4'; break;
	        case 'País':
	        arrReporte.Ejecutivo = c.NOMBRE;
	        arrGrafica.name = c.NOMBRE;
	        arrReporte.Tipo = '5';
	        arrReporte.TK = c.ID;
	        id = 'ID';
	        break;
	        case 'Región':
	        arrReporte.Ejecutivo = c.NOMBRE;
	        arrGrafica.name = c.NOMBRE;
	        arrReporte.Tipo = '6';
	        arrReporte.TK = c.NOMBRE;
	        id = 'NOMBRE';
	        break;
	        case 'Ciudad':
	        arrReporte.Ejecutivo = c.NOMBRE;
	        arrGrafica.name = c.NOMBRE;
	        arrReporte.Tipo = '7';
	        arrReporte.TK = c.NOMBRE;
	        id = 'NOMBRE';
	        break;
	      }

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
	       arrReporte.RealizadasEnero = '0';
	       arrReporte.RealizadasFebrero = '0';
	       arrReporte.RealizadasMarzo = '0';
	       arrReporte.RealizadasAbril = '0';
	       arrReporte.RealizadasMayo = '0';
	       arrReporte.RealizadasJunio = '0';
	       arrReporte.RealizadasJulio = '0';
	       arrReporte.RealizadasAgosto = '0';
	       arrReporte.RealizadasSeptiembre = '0';
	       arrReporte.RealizadasOctubre = '0';
	       arrReporte.RealizadasNoviembre = '0';
	       arrReporte.RealizadasDiciembre = '0';
	       arrReporte.RealizadasTotal = '0';
	    }
	    if (arrReporte.Ejecutivo) {
	    	ltFinal.push(arrReporte);
	    };
	  }

	  var jsonFinal = {ltFinal:ltFinal,arrGrafica:arrGrafica};
	  return ltFinal;
	}/*Json para Reporte Realizadas vs Cobradas o Nuevas vs Recompra*/

	var cuerpoVentasRCNRvs = function(Obj){

		var Op = Obj.Op;
		var tipoGrafica = Obj.tipoGrafica;
		var actividad = Obj.actividad;
		var start = Obj.start;
		var filtro = Obj.filtro;

		SalesUp.Variables.DatosRecibidos = SalesUp.Sistema.clone(Op);
		var realizadas,cobradas, totalRealizadas,totalCobradas, titulo, total;
		var tmpHead = '', tmpBody = '', simbolo = '', tmpFoot ='', tkm = '', periodo = '';
		var ltReporte = [], ltGrafica = [], totalesSumados = [];

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
		var objFiltro = JSON.parse(filtro);

		ltReporte = preparaJsonVs(realizadas,cobradas,titulo);

		total = _.size(ltReporte);

		totalesSumados = SalesUp.Sistema.sumaColumna(ltReporte,[{columna:'CobradasEnero'},{columna:'CobradasFebrero'},{columna:'CobradasMarzo'},{columna:'CobradasAbril'},{columna:'CobradasMayo'},{columna:'CobradasJunio'},{columna:'CobradasJulio'},{columna:'CobradasAgosto'},{columna:'CobradasSeptiembre'},{columna:'CobradasOctubre'},{columna:'CobradasNoviembre'},{columna:'CobradasDiciembre'},{columna:'CobradasTotal'},{columna:'RealizadasEnero'},{columna:'RealizadasFebrero'},{columna:'RealizadasMarzo'},{columna:'RealizadasAbril'},{columna:'RealizadasMayo'},{columna:'RealizadasJunio'},{columna:'RealizadasJulio'},{columna:'RealizadasAgosto'},{columna:'RealizadasSeptiembre'},{columna:'RealizadasOctubre'},{columna:'RealizadasNoviembre'},{columna:'RealizadasDiciembre'},{columna:'RealizadasTotal'}]);
		var laVariante = $('#laVariante').val();
		var TotalizarE = _.where(SalesUp.Variables.jsonInfoReportes.variantes,{tkRsv:laVariante});
		var Totalizar = TotalizarE[0].totalizar;

		var tReporte = _.size(ltReporte);

		var nombreColumna1 = '', nombreColumna2 = '';
		if (objFiltro.filtros[0].ventaRC) {
			nombreColumna1 	= 'Cobradas';
			nombreColumna2 	= 'Realizadas'; 
		};
		if (objFiltro.filtros[0].ventaNR) {
			nombreColumna1 	= 'Recompra';
			nombreColumna2 	= 'Nuevas'; 
		};

		var arrHeader 	= {};
			arrHeader.titulo 	= titulo;
			arrHeader.nombreColumna1 	= nombreColumna1;
			arrHeader.nombreColumna2 	= nombreColumna2;	
			arrHeader.nMeses 	= 13;

		var arrTabla 			= {};
			arrTabla.nFila 		= '{{nFila}}';
			arrTabla.Ejecutivo 	= '{{Ejecutivo}}';
			arrTabla.Tipo 		= '{{Tipo}}';
			arrTabla.TK 		= '{{TK}}';
			arrTabla.periodo 	= Op.jsonTotalRealizadas[0].PERIODO;
			arrTabla.tkm 		= (Op.jsonTotalRealizadas[0].TKM) ? Op.jsonTotalRealizadas[0].TKM:'';
			arrTabla.simbolo 	= simbolo;
			arrTabla.actividadCobradas = actividad-2;
			arrTabla.actividadRealizadas = actividad-1;

			arrTabla.txtHlpCobradasEnero 			= 'CobradasEnero'
			arrTabla.txtHlpRealizadasEnero 			= 'RealizadasEnero'
			arrTabla.txtHlpCobradasFebrero 			= 'CobradasFebrero'
			arrTabla.txtHlpRealizadasFebrero 		= 'RealizadasFebrero'
			arrTabla.txtHlpCobradasMarzo 			= 'CobradasMarzo'
			arrTabla.txtHlpRealizadasMarzo 			= 'RealizadasMarzo'
			arrTabla.txtHlpCobradasAbril 			= 'CobradasAbril'
			arrTabla.txtHlpRealizadasAbril 			= 'RealizadasAbril'
			arrTabla.txtHlpCobradasMayo 			= 'CobradasMayo'
			arrTabla.txtHlpRealizadasMayo 			= 'RealizadasMayo'
			arrTabla.txtHlpCobradasJunio 			= 'CobradasJunio'
			arrTabla.txtHlpRealizadasJunio 			= 'RealizadasJunio'
			arrTabla.txtHlpCobradasJulio 			= 'CobradasJulio'
			arrTabla.txtHlpRealizadasJulio 			= 'RealizadasJulio'
			arrTabla.txtHlpCobradasAgosto 			= 'CobradasAgosto'
			arrTabla.txtHlpRealizadasAgosto 		= 'RealizadasAgosto'
			arrTabla.txtHlpCobradasSeptiembre 		= 'CobradasSeptiembre'
			arrTabla.txtHlpRealizadasSeptiembre 	= 'RealizadasSeptiembre'
			arrTabla.txtHlpCobradasOctubre 			= 'CobradasOctubre'
			arrTabla.txtHlpRealizadasOctubre 		= 'RealizadasOctubre'
			arrTabla.txtHlpCobradasNoviembre 		= 'CobradasNoviembre'
			arrTabla.txtHlpRealizadasNoviembre 		= 'RealizadasNoviembre'
			arrTabla.txtHlpCobradasDiciembre 		= 'CobradasDiciembre'
			arrTabla.txtHlpRealizadasDiciembre		= 'RealizadasDiciembre'
			arrTabla.txtHlpCobradasTotal 			= 'CobradasTotal'
			arrTabla.txtHlpRealizadasTotal 			= 'RealizadasTotal'
			/*Totales*/
			if((Totalizar === null || Totalizar === 1) && Totalizar != 0){
				arrTabla.CobradasEnero 			= totalesSumados.CobradasEnero;
				arrTabla.RealizadasEnero 		= totalesSumados.RealizadasEnero;
				arrTabla.CobradasFebrero 		= totalesSumados.CobradasFebrero;
				arrTabla.RealizadasFebrero 		= totalesSumados.RealizadasFebrero;
				arrTabla.CobradasMarzo 			= totalesSumados.CobradasMarzo;
				arrTabla.RealizadasMarzo 		= totalesSumados.RealizadasMarzo;
				arrTabla.CobradasAbril 			= totalesSumados.CobradasAbril;
				arrTabla.RealizadasAbril 		= totalesSumados.RealizadasAbril;
				arrTabla.CobradasMayo 			= totalesSumados.CobradasMayo;
				arrTabla.RealizadasMayo 		= totalesSumados.RealizadasMayo;
				arrTabla.CobradasJunio 			= totalesSumados.CobradasJunio;
				arrTabla.RealizadasJunio 		= totalesSumados.RealizadasJunio;
				arrTabla.CobradasJulio 			= totalesSumados.CobradasJulio;
				arrTabla.RealizadasJulio 		= totalesSumados.RealizadasJulio;
				arrTabla.CobradasAgosto 		= totalesSumados.CobradasAgosto;
				arrTabla.RealizadasAgosto 		= totalesSumados.RealizadasAgosto;
				arrTabla.CobradasSeptiembre 	= totalesSumados.CobradasSeptiembre;
				arrTabla.RealizadasSeptiembre 	= totalesSumados.RealizadasSeptiembre;
				arrTabla.CobradasOctubre 		= totalesSumados.CobradasOctubre;
				arrTabla.RealizadasOctubre 		= totalesSumados.RealizadasOctubre;
				arrTabla.CobradasNoviembre 		= totalesSumados.CobradasNoviembre;
				arrTabla.RealizadasNoviembre 	= totalesSumados.RealizadasNoviembre;
				arrTabla.CobradasDiciembre 		= totalesSumados.CobradasDiciembre;
				arrTabla.RealizadasDiciembre 	= totalesSumados.RealizadasDiciembre;
				arrTabla.CobradasTotal 			= totalesSumados.CobradasTotal;
				arrTabla.RealizadasTotal 		= totalesSumados.RealizadasTotal;
			}else if(Totalizar === 2){
				arrTabla.CobradasEnero 			= totalesSumados.CobradasEnero/tReporte;
				arrTabla.RealizadasEnero 		= totalesSumados.RealizadasEnero/tReporte;
				arrTabla.CobradasFebrero 		= totalesSumados.CobradasFebrero/tReporte;
				arrTabla.RealizadasFebrero 		= totalesSumados.RealizadasFebrero/tReporte;
				arrTabla.CobradasMarzo 			= totalesSumados.CobradasMarzo/tReporte;
				arrTabla.RealizadasMarzo 		= totalesSumados.RealizadasMarzo/tReporte;
				arrTabla.CobradasAbril 			= totalesSumados.CobradasAbril/tReporte;
				arrTabla.RealizadasAbril 		= totalesSumados.RealizadasAbril/tReporte;
				arrTabla.CobradasMayo 			= totalesSumados.CobradasMayo/tReporte;
				arrTabla.RealizadasMayo 		= totalesSumados.RealizadasMayo/tReporte;
				arrTabla.CobradasJunio 			= totalesSumados.CobradasJunio/tReporte;
				arrTabla.RealizadasJunio 		= totalesSumados.RealizadasJunio/tReporte;
				arrTabla.CobradasJulio 			= totalesSumados.CobradasJulio/tReporte;
				arrTabla.RealizadasJulio 		= totalesSumados.RealizadasJulio/tReporte;
				arrTabla.CobradasAgosto 		= totalesSumados.CobradasAgosto/tReporte;
				arrTabla.RealizadasAgosto 		= totalesSumados.RealizadasAgosto/tReporte;
				arrTabla.CobradasSeptiembre 	= totalesSumados.CobradasSeptiembre/tReporte;
				arrTabla.RealizadasSeptiembre 	= totalesSumados.RealizadasSeptiembre/tReporte;
				arrTabla.CobradasOctubre 		= totalesSumados.CobradasOctubre/tReporte;
				arrTabla.RealizadasOctubre 		= totalesSumados.RealizadasOctubre/tReporte;
				arrTabla.CobradasNoviembre 		= totalesSumados.CobradasNoviembre/tReporte;
				arrTabla.RealizadasNoviembre 	= totalesSumados.RealizadasNoviembre/tReporte;
				arrTabla.CobradasDiciembre 		= totalesSumados.CobradasDiciembre/tReporte;
				arrTabla.RealizadasDiciembre 	= totalesSumados.RealizadasDiciembre/tReporte;
				arrTabla.CobradasTotal 			= totalesSumados.CobradasTotal/tReporte;
				arrTabla.RealizadasTotal 		= totalesSumados.RealizadasTotal/tReporte;
			}
			/*Totales*/

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

		if (objFiltro.filtros[0].ventaRC == 2){
			ltGrafica = [{
				name: 'Cobradas',
				data: arrayCobradas,
				color: '#4572A7'
			},  {
				name: 'Realizadas',
				data: arrayRealizadas,
				color: '#AA4643'
			}];
		}else{
			ltGrafica = [{
				name: 'Recompra',
				data: arrayCobradas,
				color: '#4572A7'
			},  {
				name: 'Nuevas',
				data: arrayRealizadas,
				color: '#AA4643'
			}];
		}

		tmpHead = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/hReporteVentasRCNRvs.dbsp',DataType:'html'});
		tmpBody = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/bReporteVentasRCNRvs.dbsp',DataType:'html'});
		tmpFoot = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/fReporteVentasRCNRvs.dbsp',DataType:'html'});

		var header = SalesUp.Construye.ReemplazaDatos({Template:tmpHead, Datos:arrHeader});
		var body = SalesUp.Construye.ReemplazaDatos({Template:tmpBody, Datos:arrTabla});
		var footer = SalesUp.Construye.ReemplazaDatos({Template:tmpFoot, Datos:arrTabla});

		SalesUp.Construye.ConstruyeTabla(header,body,ltReporte,{Destino:'#DatosLoad',Id:'ReportTable',PagActual:start});

		$('#ReportTable tfoot').html(footer);
		var $tabla = $('#ReportTable');

		SalesUp.reportes.paginacion({registros:total,start:start,callback:SalesUp.reportes.ventas.cobradasVsRealizadas,tabla:$tabla,parametros:filtro});
		if(total > 0){ construyeGraficaRC({grafica:tipoGrafica, series:ltGrafica, simbolo:elSimbolo}); }
	}/*Cuerpo Reporte Ventas Realizadas vs Cobradas o Recompra vs nuevas*/

}/*reportesVentas*/