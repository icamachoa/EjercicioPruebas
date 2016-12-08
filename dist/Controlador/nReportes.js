var reportes = function(){
	this.inicia = function(idReporte){
		if (idReporte==1) {
			reporteVentasProducto();
		}
	}

	var contruyeGrafica = function(Op){
		var points = Op.data, titulo = Op.titulo, grafica:Op.grafica;
		
		var opcionesCharts = {
			title:{text:titulo},
			subtitle:{text:''},
			credits: {enabled: false },

			series: [{
				type: 'treemap',
				layoutAlgorithm: 'squarified',
				allowDrillToNode: true,
				animationLimit: 1000,
				dataLabels:{enabled: true },
				levelIsConstant: false,
				levels:[{
					level: 1,
					dataLabels: {
						enabled: true
					},
					borderWidth: 1
				}],
				data: points
			}]
		};

		$('#grafica').highcharts(opcionesCharts);
		/*highcharts*/
	};

/*
function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

 */
	var reporteVentasProducto = function(){
		var muestraReporte = function(Op,err,args){
			var tmpHead = '<tr><th>#</th><th>Código</th><th>Descripción</th><th>Linea</th><th>Marca</th><th>Cantidad</th><th>Monto</th><th>%</th><tr>';
			var tmpBody = '<tr>';
			tmpBody += '<td class="centrado"><b>{{nFila}}</b></td>';
			tmpBody += '<td class="centrado">{{CODIGO}}</td>';
			tmpBody += '<td class="centrado"><b>{{NOMBRE}}</b></td>';
			tmpBody += '<td class="centrado"><b>{{LINEA_PRODUCTO}}</b></td>';
			tmpBody += '<td class="centrado"><b>{{MARCA}}</b></td>';
			tmpBody += '<td class="centrado"><b>{{cantidad}}</b></td>';
			tmpBody += '<td class="centrado"><b>{{GT}}</b></td>';
			tmpBody += '<td style="width: 100px !important;"><div class="w100"><div class="progress progress-striped active shadow"><span class="LbPorcentaje">{{PORCENTAJE}}%</span><span class="LbIndicador Pointer Transition" data-porcentaje="{{PORCENTAJE}}%" tip="ehllos" ></span><div class="progress-bar progress-bar-stripes OcultarImprimir" data-porcentaje="{{PORCENTAJE}}%" style="width:{{PORCENTAJE}}%"></div><img class="BarImg progress-bar" style="width:{{PORCENTAJE}}%" src="../imagenes/BarWarning.jpg"></div> </td>';
			tmpBody += '</tr>';

			var jsonReporteActividades = Op.jsonDatos;
			var jsonNDatos = Op.jCount.COLUMN1;
			if (args.groupBy == 1) {
				jsonPGrafica = _.groupBy(jsonReporteActividades,'NOMBRE');
				var data = jsonPGrafica, points = [],productsP,productsVal,productsI = 0,countryP,countryI,causeP,causeI,products,country,cause,
				causeName = {
					'cantidad': 'cantidad',
					'GT' : 'GT'
				};
				for (products in data) {
					if (data.hasOwnProperty(products)) {
						productsVal = 0;

						productsP = {
							id: 'id_' + productsI,
							name: products,
							color: Highcharts.getOptions().colors[productsI]
						};
						countryI = 0;

						productsP.value = Math.round(data[products][0].GT);

						points.push(productsP);
						productsI = productsI + 1;
					}
				}
			}
			if (args.groupBy == 2) {
				jsonPGrafica = _.groupBy(jsonReporteActividades,'LINEA_PRODUCTO');
				jsonPGrafica = _.mapObject(jsonPGrafica,function(array){
					var array2 = _.groupBy(array, 'MARCA');
					array2 = _.mapObject(array2,function(ab){
						return _.groupBy(ab,'NOMBRE');
					}
					);
					return array2;
				});
			}
			if(args.groupBy == 3){
				jsonPGrafica = _.groupBy(jsonReporteActividades,'MARCA');
				jsonPGrafica = _.mapObject(jsonPGrafica,function(array){
					var array2 = _.groupBy(array, 'LINEA_PRODUCTO');
					array2 = _.mapObject(array2,function(ab){
						return _.groupBy(ab,'NOMBRE');
					}
					);
					return array2;
				});
			}

			totales = {};
			totales.nFila = ''
			totales.MARCA = 'TOTAL'
			totales.cantidad = 0;
			totales.GT = 0;
			for(var i in jsonReporteActividades){
				totales.cantidad = totales.cantidad + jsonReporteActividades[i].cantidad;
				totales.GT = parseFloat(totales.GT) + parseFloat(jsonReporteActividades[i].GT);
			}
			jsonReporteActividades.push(totales);

			var hayReporte = _.size(jsonReporteActividades);

			SalesUp.Construye.ConstruyeTabla(tmpHead,tmpBody,jsonReporteActividades,{Destino:'#DatosLoad',Id:'reporteContenido',PagActual:1,NumRegistros:jsonNDatos});
			
			contruyeGrafica({data:points, titulo:'Ventas producto'});
			SalesUp.Sistema.Tipsy();
		}/*muestraReporte*/

		SalesUp.Sistema.CargaDatosAsync({
			link:'/privado/Modelo/jsonProductosVentas.dbsp',
			prmAdicionales:{groupBy: 1},
			parametros:{groupBy:1, Order:1},
			callback:muestraReporte
		});

	}/*reporteVentasProducto*/
}


function iraPag(Ir){
	PagAct = Ir;
	var Cond = '';
	SalesUp.Sistema.paginaActual({pagAct:1});
	ActivaPaginacion(Cond,Ir);
}

var ActivaPaginacion=function(Cond,Ir){
	SalesUp.Variables.pagInicio = (parseInt(Ir) * parseInt(RegXPag)) - RegXPag + 1;
	SalesUp.Variables.CamposData({});
};

if (window.reportes) { SalesUp.reportes = new reportes(); }