start = 1;
var pagAct =1

SalesUp.Variables.Ini = 1;
SalesUp.Variables.pagInicio = 1;

var cargaDetalle = function(Op,err,ex){
	SalesUp.Variables.pagInicio = (ex) ? ex.Inicio : 1;
	var qryString = 'tkrs='+tkrs+'&tipoVariante='+tipoVariante+'&laVariante='+laVariante+'&inicia='+SalesUp.Variables.pagInicio+'&filtros='+filtros+'&agrupacion='+agrupacion+'&parametros='+parametros;
	SalesUp.Sistema.CargaDatosAsync({
		link:'/privado/Modelo/jsonDetallesProductosVentas.dbsp',
		prmAdicionales:qryString,
		parametros:qryString,
		callback:muestradetalles
	})
}

var reloadData = function(Start) {
	start = (Start) ? Start.start: 1;
	$('#DatosLoad').html(SalesUp.Sistema.unMomento());
	SalesUp.Sistema.CargaDatosAsync({ 
      link:'/privado/Modelo/qryGuardaFiltrosReportes.dbsp',
      parametros:'filtros='+filtros,
      callback:cargaDetalle,
      prmAdicionales:{filtro:filtros,Inicio:start}
    });
}
	

Handlebars.registerHelper('hlpPctMargen', function(Margen,Compra) {
	if (Margen == 0 && Compra == 0) {
		var margen = '0.00 %'
	}else if(Margen >= 0 && Compra == 0){
		var margen = '100.00 %'
	}else{
		var margen = (Margen/Compra*100).toFixed(2)+' %';		
	}
  	return new Handlebars.SafeString(margen);
});

var muestradetalles = function(Op) {
	global = Op;
	var simbolo = Op.jsonDatos[0].Simbolo || '';
	var templateheader = ''+
		'<tr><td class="tCen"></td>'+
		'<td>Código</td>'+
		'<td>Producto</td>'+
		'<td>Fecha compra</td>'+
		'<td>Cliente</td>'+
		'<td>Línea</td>'+
		'<td class="tCen">Cantidad</td>'+
		'<td class="tDer">Costo</td>'+
		'<td class="tDer">Precio de venta</td>'+
		'<td class="tDer">Margen</td>'+
		'<td class="tDer">Margen (%)</td>'+
		'<td class="tDer">Margen total</td>'+
		'<td class="tDer">Margen total (%)</td>'+
		'<td class="tDer">Total</td>';
	
	var templateBody = ''+
		'<tr><td class="tCen Strong">{{nFila}}</td>'+
		'<td>{{CODIGO}}</td>'+
		'<td>{{NOMBRE}}</td>'+
		'<td>{{hlpFormatoFecha FECHA_COMPRA}}</td>'+
		'<td><a href="/privado/clientes-visualizar.dbsp?tkp={{TKP}}">{{COMPRADOR}}</a><br>'+
		'{{hlpEmpresa TKCOM EMPRESA}}</td>'+
		'<td>{{LINEA_PRODUCTO}}</td>'+
		'<td class="tCen">{{CANTIDAD}}</td>'+
		'<td class="tDer">{{hlp_Simbolo_Moneda COSTO "'+simbolo+'" 0}}</td>'+
		'<td class="tDer">{{hlp_Simbolo_Moneda Individual  "'+simbolo+'" 0}}</td>'+
		'<td class="tDer">{{hlp_Simbolo_Moneda MargenIndividual "'+simbolo+'" 0}}</td>'+
		'<td class="tDer">{{hlpPctMargen MargenIndividual COSTO}}</td>'+
		'<td class="tDer">{{hlp_Simbolo_Moneda MargenTotal "'+simbolo+'" 0}}</td>'+
		'<td class="tDer">{{hlpPctMargen MargenTotal CostoTotal}}</td>'+
		'<td class="tDer">{{hlp_Simbolo_Moneda EnMonDef "'+simbolo+'" 0}}</td>';
	
	var Total = Op.jsonInfo.TOTALR;
	var nRegJs = Op.jsonDatos.length;
	SalesUp.Construye.ConstruyeTabla(templateheader, templateBody, Op.jsonDatos, {Destino:'#DatosLoad', Id:'DetallesPV'});
	Sumatoria = SalesUp.Sistema.sumaColumna(Op.jsonDatos,[{columna:'CANTIDAD'},{columna:'COSTO'},{columna:'Individual'},{columna:'MargenIndividual'},{columna:'MargenTotal'},{columna:'EnMonDef'}])
	var PromCostos = Handlebars.helpers.hlp_Simbolo_Moneda(Sumatoria.COSTO/nRegJs,simbolo,1);
	var PromIndividual = Handlebars.helpers.hlp_Simbolo_Moneda(Sumatoria.Individual/nRegJs,simbolo,1);
	var PromMargenI = Handlebars.helpers.hlp_Simbolo_Moneda(Sumatoria.MargenIndividual/nRegJs,simbolo,1);
	var PromMargenIPerc = Handlebars.helpers.hlpPctMargen((Sumatoria.MargenIndividual/nRegJs),(Sumatoria.COSTO/nRegJs));
	var MargenTotal = Handlebars.helpers.hlp_Simbolo_Moneda(Sumatoria.MargenTotal,simbolo,1);
	var MargenTotalPerc = Handlebars.helpers.hlpPctMargen((Sumatoria.MargenTotal),Sumatoria.COSTO);
	var TotalFinal = Handlebars.helpers.hlp_Simbolo_Moneda(Sumatoria.EnMonDef, simbolo, 1)

	var totales = ''+
	'<tr style="border-top:1px dotted black;" class="<Italic></Italic>"><td>&nbsp;</td>'+
	'<td>&nbsp;</td>'+
	'<td>&nbsp;</td>'+
	'<td>&nbsp;</td>'+
	'<td>&nbsp;</td>'+
	'<td>Totales</td>'+
	'<td class="tCen">'+Sumatoria.CANTIDAD+'</td>'+
	'<td class="tDer">'+PromCostos+'</td>'+
	'<td class="tDer">'+PromIndividual+'</td>'+
	'<td class="tDer">'+PromMargenI+'</td>'+
	'<td class="tDer">'+PromMargenIPerc+'</td>'+
	'<td class="tDer">'+MargenTotal+'</td>'+
	'<td class="tDer">'+MargenTotalPerc+'</td>'+ 
	'<td class="tDer">'+TotalFinal+'</td></tr>'

	$('#DetallesPV').append(totales);
	SalesUp.Sistema.paginacion({
        registros: Total,
        start: SalesUp.Variables.pagInicio,
        callback: reloadData,
        tabla: $('#DetallesPV'),
        parametros:Start
    });

	SalesUp.exporta.btnExportar({titulo:'Ventas_por_producto_detalles'})
}

function iraPag(Ir){
	pagAct = Ir;
	var Cond = '';
	SalesUp.Sistema.paginaActual({pagAct:pagAct});
	ActivaPaginacion(Cond,Ir);
}

var ActivaPaginacion=function(Cond,Ir){
	start = (parseInt(Ir) * parseInt(RegXPag)) - RegXPag + 1;
	reloadData();
};

reloadData();