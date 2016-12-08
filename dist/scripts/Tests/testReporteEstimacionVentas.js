var test = function(){
	this.reporteEstimacion = function(filtro,detalle){
		
		filtro = encodeURIComponent(filtro) ;
		var jsonReporte = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonReporteEstimacionData.dbsp',Parametros:'filtros=' +filtro+ '&inicio=1',DataType:'json'});
		var datosExtra = jsonReporte.jsonTotal;
		var reporte = jsonReporte.jsonDatos;
		var cantDat = datosExtra[0].CDATOS;
		var total = datosExtra[0].TOTAL;
		var jsonCantidades = [];
		var jsonReporteDetalle =[];
		for(i=0; i<total; i++){
		  var arrCantidades = {};
		  var reporteDetalle = {};
		  var parametro = ''
		  je = reporte[i];
		  arrCantidades.Vencidos = Math.round((parseFloat(je.Vencidos))*100)/100;
		  arrCantidades.Futuros = Math.round((parseFloat(je.Futuros))*100)/100;
		  arrCantidades.Total = Math.round((parseFloat(je.Total))*100)/100;
		  parametro = (je.Parametros)?je.Parametros:'';
		  reporteDetalle.Vencidos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/reporteEstimacionDetalleTest.dbsp',Parametros:'filtro=' +filtro+ '&periodo=vencidas&parametros='+parametro+'',DataType:'json'}).jsonDatos.TOTAL;
		  reporteDetalle.Vencidos = Math.round(((reporteDetalle.Vencidos)?reporteDetalle.Vencidos:0)*100)/100;
		  reporteDetalle.Futuros = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/reporteEstimacionDetalleTest.dbsp',Parametros:'filtro=' +filtro+ '&periodo=futuros&parametros='+parametro+'',DataType:'json'}).jsonDatos.TOTAL;
		  reporteDetalle.Futuros = Math.round(((reporteDetalle.Futuros)?reporteDetalle.Futuros:0)*100)/100;
		  reporteDetalle.Total = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/reporteEstimacionDetalleTest.dbsp',Parametros:'filtro=' +filtro+ '&periodo=total&parametros='+parametro+'',DataType:'json'}).jsonDatos.TOTAL;
		  reporteDetalle.Total = Math.round(((reporteDetalle.Total)?reporteDetalle.Total:0)*100)/100;
		  for(x=0;x<cantDat;x++){
		    dato = 'Dato'+x;
		    reporteDetalle[dato] = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/reporteEstimacionDetalleTest.dbsp',Parametros:'filtro=' +filtro+ '&periodo='+x+'&parametros='+parametro+'',DataType:'json'}).jsonDatos.TOTAL;
		    reporteDetalle[dato] = Math.round(((reporteDetalle[dato])?reporteDetalle[dato]:0)*100)/100;
		    arrCantidades[dato] = Math.round((parseFloat(je[dato]))*100)/100;
		  }
		  jsonCantidades.push(arrCantidades);
		  jsonReporteDetalle.push(reporteDetalle);
		}
		/*var det = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/reporteEstimacionDetalleTest.dbsp',Parametros:'filtro=' +filtro+ '&periodo=vencidas&parametros='+parametro+'',DataType:'json'}).jsonDatos.TOTAL;*/

		json = {jsonCantidades:jsonCantidades,jsonReporteDetalle:jsonReporteDetalle}
		if(detalle == 1){
			return json;
		}else{
			return json;
		}
	}
}