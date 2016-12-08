SalesUp.Variables.pagInicio = 1;
RegXPag = 50;

var reportes = function(){
	this.inicia = function(idReporte){
		if (idReporte==1) {
			reporteVentasProducto();
		}
	}

	var contruyeGrafica = function(Op){
		var points = Op.data, titulo = Op.titulo

		$('#grafica').highcharts({series: [{type: 'treemap',layoutAlgorithm: 'squarified',allowDrillToNode: true,animationLimit: 500,dataLabels: {enabled: false},levelIsConstant: false,levels: [{level: 1,dataLabels: {enabled:true},borderWidth: 1}],data: points}],subtitle: {text: ''},title: {text:titulo},tooltip:{formatter:function () {
                return 'The value for <b>' + this.key +
                    '</b> is <b>' + SalesUp.Sistema.moneda({moneda:'', numero:this.point.value}) + '</b>';
            }}});
	};

	var reporteVentasProducto = function(){
		$('#grafica, #DatosLoad').html(SalesUp.Sistema.unMomento())

		var arrGraph3 = function(jsonPGrafica, niveles,orden,start,length){
			// length = 10000
			start+length-1
			var CSS_COLOR_NAMES = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
			var colors = _.shuffle(CSS_COLOR_NAMES)
			var data = jsonPGrafica, points = [],BYMRP,BYMRVal,BYMRI = 0,lineaP,lineaI,productP,productI,BYMR,linea,product,contador = 1;
			for (BYMR in data) {
				if (data.hasOwnProperty(BYMR)) {
					BYMRVal = 0;
					if(niveles == 1){
						BYMRVal = Math.round(data[BYMR][0][orden]);
					}
					/*Highcharts.getOptions().colors*/
					BYMRP = {
						id: 'id_' + BYMRI,
						name: BYMR,
						color: colors[BYMRI]
					};
					lineaI = 0
					if (niveles >=2) {
						for (linea in data[BYMR]) {
							if (data[BYMR].hasOwnProperty(linea)) {
								lineaP = {
									id: BYMRP.id + '_' + lineaI,
									name: linea,
									parent: BYMRP.id
								};
								if(niveles == 2){
									BYMRVal += parseFloat(data[BYMR][linea][0][orden]);
									lineaP.value= parseFloat(data[BYMR][linea][0][orden]);
								}
								points.push(lineaP);
								productI = 0;
								if (niveles >=3) {
									for (product in data[BYMR][linea]) {
										if (data[BYMR][linea].hasOwnProperty(product)) {
											productP = {
												id: lineaP.id + '_' + productI,
												name: product,
												parent: lineaP.id,
												value: parseFloat(data[BYMR][linea][product][0][orden])
											};
											BYMRVal += productP.value;
											points.push(productP);
											productI = productI + 1;
										}
									}
								}
								lineaI = lineaI + 1;
							}
						}
					}
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
		}

		var muestraReporte = function(Op,err,args){
			/* INICIA TEMPLATE 1*/
			var orden = Op.jsonDatos[0].ORDEN;
			tmp1 = Op.jsonAll;
			var tmpBody = '<tr>';
			tmpBody += '<td class="centrado"><b>{{nFila}}</b></td>';
			var tmpFoot = '<tr style="    border-top: 1px dotted black;">';
			switch(parseInt(args.groupBy)) {
				case 1:
				var tmpHead = '<tr><th>#</th><th style="text-align:left">Código</th><th style="text-align:left">Producto</th><th>Línea</th><th>Marca</th><th>Cantidad</th><th>Monto</th><th>%</th><tr>';
				tmpBody += '<td >{{CODIGO}}</td>';
				tmpBody += '<td >{{NOMBRE}}</td>';
				tmpBody += '<td class="centrado">{{LINEA_PRODUCTO}}</td>';
				tmpBody += '<td class="centrado">{{MARCA}}</td>';
				tmpFoot += '<td></td><td></td><td></td><td></td>';
				break;
				case 2:
				var tmpHead = '<tr><th>#</th><th>Linea</th><th>Cantidad</th><th>Monto</th><th>%</th><tr>';
				tmpBody += '<td class="centrado">{{LINEA_PRODUCTO}}</td>';
				tmpFoot += '<td></td>';
				break;
				case 3:
				var tmpHead = '<tr><th>#</th><th>Marca</th><th>Cantidad</th><th>Monto</th><th>%</th><tr>';
				tmpBody += '<td class="centrado">{{MARCA}}</td>';
				tmpFoot += '<td></td>';
				break;
				default:
				var tmpHead = '<tr><th>#</th><th></th><th>Cantidad</th><th>Monto</th><th>%</th><tr>';
				tmpBody += '<td >{{Agrupacion}}</td>';
				tmpFoot += '<td></td>';
				break;
			}
			tmpBody += '<td class="centrado">{{CANTIDAD}}</td>';
			tmpBody += '<td style="text-align:right;">{{hlp_Simbolo_Moneda GT simbolo}}</td>';
			tmpBody += '<td style="width: 100px !important;"><div class="w100"><div class="progress progress-striped active shadow"><span class="LbPorcentaje">{{PORCENTAJE}}%</span><span class="LbIndicador Pointer Transition" data-porcentaje="{{PORCENTAJE}}%" tip="ehllos" ></span><div class="progress-bar progress-bar-stripes OcultarImprimir" data-porcentaje="{{PORCENTAJE}}%" style="width:{{PORCENTAJE}}%"></div></div> </td>';
			tmpBody += '</tr>';
			tmpFoot += '<td  class="centrado">TOTAL</td><td  class="centrado">'+Op.jTotales.CANT+'</td><td  class="centrado ">'+Op.jTotales.GT+'</td><td style="width: 100px !important;"><div class="w100"><div class="progress progress-striped active shadow"><span class="LbPorcentaje">100%</span><span class="LbIndicador Pointer Transition" data-porcentaje="100%" tip="ehllos" ></span><div class="progress-bar progress-bar-stripes OcultarImprimir" data-porcentaje="100%" style="width:100%"></div></div> </td></tr>'
			/*  FINAL TEMPLATE 1 */ 

			var jsonReporteActividades = Op.jsonDatos;
			//console.log(jsonReporteActividades);
			var jsonNDatos = Op.jCount.COLUMN1;

			/* CONSTRUYE LOS DATOS QUE SE LE PASARAN A LA GRAFICA */
			if (args.groupBy == 1) {
				jsonPGrafica = _.groupBy(Op.jsonAll,'NOMBRE');
				var points;
				points = arrGraph3(jsonPGrafica,1,orden,1,10)
			}/*SE HACE SI ESTAN AGRUPADOS POR  PRODUCTO*/
			else if (args.groupBy == 2) {
				jsonPGrafica = _.groupBy(Op.jsonAll,'LINEA_PRODUCTO');
				jsonPGrafica = _.mapObject(jsonPGrafica,function(array){
					var array2 = _.groupBy(array, 'MARCA');
					array2 = _.mapObject(array2,function(ab){
						return _.groupBy(ab,'NOMBRE');
					});
					return array2;
				});
				var points;
				points = arrGraph3(jsonPGrafica,3,orden,1,10)
			}/*SE HACE SI ESTAN AGRUPADOS POR  LINEA*/
			else if(args.groupBy == 3){
				jsonPGrafica = _.groupBy(Op.jsonAll,'MARCA');
				jsonPGrafica = _.mapObject(jsonPGrafica,function(array){
					var array2 = _.groupBy(array, 'LINEA_PRODUCTO');
					array2 = _.mapObject(array2,function(ab){
						return _.groupBy(ab,'NOMBRE');
					}
					);
					return array2;
				});
				var points;
				points = arrGraph3(jsonPGrafica,3,orden,1,10)
			}else{
				if (args.groupBy == 4) {
					var agrupacion = 'USUARIO';
				}
				if (args.groupBy == 5) {
					var agrupacion = 'GRUPO';
				}
				jsonPGrafica = _.groupBy(Op.jsonAll,agrupacion);
				jsonPGrafica = _.mapObject(jsonPGrafica,function(array){
					return _.groupBy(array, 'NOMBRE');
					/*return array2;*/
				});
				var points;
				
				points = arrGraph3(jsonPGrafica,2,orden,1,10)
			}

			/*SE HACE SI ESTAN AGRUPADOS POR  MARCA*/

			var hayReporte = _.size(jsonReporteActividades);

			/*SalesUp.Sistema.CargaDatos({Link:'Filtros_Reporte_PV.dbsp', Div:1, Destino:'#filtros' });*/
			SalesUp.Construye.ConstruyeTabla(tmpHead,tmpBody,jsonReporteActividades,{Destino:'#DatosLoad',Id:'reporteContenido',PagActual:SalesUp.Sistema.paginaActual(),NumRegistros:jsonNDatos});

			$('#reporteContenido tfoot').html(tmpFoot);
			SalesUp.Sistema.IniciaPlugins();

			contruyeGrafica({data:points, titulo:'Ventas producto'});
			SalesUp.Sistema.Tipsy();
		}/*muestraReporte*/
		

		datos = $('#frm_filtros').serializeFormJSON();
		datos.inicia = SalesUp.Variables.pagInicio;
		console.log(datos);
		SalesUp.Sistema.CargaDatosAsync({
			link:'/privado/Modelo/jsonProductosVentas.dbsp',
			prmAdicionales:datos,
			parametros:datos,
			callback:muestraReporte
		});

	}/*reporteVentasProducto*/
}


function iraPag(Ir){
	PagAct = Ir;
	var Cond = '';
	SalesUp.Sistema.paginaActual({pagAct:Ir});
	ActivaPaginacion(Cond,Ir);
}

var ActivaPaginacion=function(Cond,Ir){
	SalesUp.Variables.pagInicio = (parseInt(Ir) * parseInt(RegXPag)) - RegXPag + 1;
	SalesUp.reportes.inicia(1)
};


if (window.reportes) { SalesUp.reportes = new reportes(); }

//********** FUNCION SERIALIZAR JSON **************/
(function ($) {
	$.fn.serializeFormJSON = function () {
		var o = {};
		var a = this.serializeArray();
		$.each(a, function () {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};
})(jQuery);
//********** .FUNCION SERIALIZAR JSON **************/