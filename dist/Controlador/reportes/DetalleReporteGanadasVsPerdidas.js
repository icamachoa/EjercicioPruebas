start = 1

cargaDetalle = function(){
	var qryString = 'tkrs='+tkrs+'&tipoVariante='+tipoVariante+'&laVariante='+laVariante+'&inicia='+start+'&filtros='+filtros+'&fecha1='+fecha1+'&fecha2='+fecha2+'&tipo='+tipo;
	SalesUp.Sistema.CargaDatosAsync({
		link:'/privado/Modelo/jsonDatosWvLDetalle.dbsp',
		prmAdicionales:qryString,
		parametros:qryString,
		callback:muestradetalles
	})
}

reloadData = function() {
	$('#DatosLoad').html(SalesUp.Sistema.unMomento());
	SalesUp.Sistema.CargaDatosAsync({ 
      link:'/privado/Modelo/qryGuardaFiltrosReportes.dbsp',
      parametros:'filtros='+filtros,
      callback:cargaDetalle,
      prmAdicionales:{filtro:filtros}
    });
}
	

Handlebars.registerHelper('hlpWhere2Go', function(Ganada,Perdida,NombreProsp,TKP,TKO,TKV) {
  var link = ''
  NombreProsp = NombreProsp || ''
  if (Ganada === 1) {
  	link = '<a href="/privado/ventas-visualizar.dbsp?tko='+TKO+'&tkv='+TKV+'">'+NombreProsp.trim()+'</a>'
  }
  if (Perdida == 1) {
  	link = '<a href="/privado/prospectos-visualizar.dbsp?tkp='+TKP+'">'+NombreProsp.trim()+'</a>'
  }
  if (Ganada == 0 && Perdida == 0) {
  	link = '<a href="/privado/oportunidades-visualizar.dbsp?tko='+TKO+'">'+NombreProsp.trim()+'</a>'
  }
  return new Handlebars.SafeString(link);
});

var muestradetalles = function(Op) {
	var templateheader = ''+
		'<tr><td class="tCen"></td>'+
		'<td>Nombre/Empresa</td>'+
		'<td class="tDer">Monto</td>'+
		'<td class="tDer">Comisión</td>'+
		'<td class="tCen">Certeza</td>'+
		'<td class="tCen">Moneda</td>'+
		'<td class="tCen">Comentario</td>'+
		'<td class="tCen">Ejecutivo</td>';
	
	var templateBody = ''+
		'<tr><td class="tCen Strong">{{nFila}}</td>'+
		'<td>{{hlpWhere2Go GANADA PERDIDA PNOMBRE TKP TKO TKV}}<br>{{hlpEmpresa TKCOM EMPRESA}}</td>'+
		'<td class="tDer">{{hlp_Simbolo_Moneda MONTO SIMBOLO 1}}</td>'+
		'<td class="tDer">{{hlp_Simbolo_Moneda COMISION SIMBOLO 1}}</td>'+
		'<td class="tCen">{{CertezaOportunidad}}</td>'+
		'<td class="tCen">{{IDMONEDA}}</td>'+
		'<td clss="tCen"><span class="Tip8" style="font-style: italic;" tip="{{PSNOMBRE}}">{{PSINICIALES}}</span> <strong>{{PSTIME}}</strong> - {{COMENTARIO}} </td>'+
		'<td class="tCen">{{hlpCompartidoIniciales Compartido INICIALES Ejecutivo IDPROSPECTO TKP}}</td></tr>';
	
	var Total = (Op.jsonDatos[0].TOTAL) ? Op.jsonDatos[0].TOTAL : 0;
	var nRegJs = Op.jsonDatos.length;
	SalesUp.Construye.ConstruyeTabla(templateheader, templateBody, Op.jsonDatos, {Destino:'#DatosLoad', Id:'DetallesPV', Callback:'', PagActual:start,  NumRegistros:Total });
	Sumatoria = SalesUp.Sistema.sumaColumna(Op.jsonDatos,[{columna:'MONTO',tCambio:'TIPOCAMBIO'},{columna:'COMISION',tCambio:'TIPOCAMBIO'},{columna:'Certeza'}])

	var totales = ''+
	'<tr class="elTotal"><td class="tCen Strong"></td>'+
	'<td class="tDer">Totales</td>'+
	'<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(Sumatoria.MONTO)+'</td>'+
	'<td class="tDer">'+Handlebars.helpers.hlp_Simbolo_Moneda(Sumatoria.COMISION)+'</td>'+
	'<td class="tCen">'+((Sumatoria.Certeza/nRegJs)*100).toFixed(2)+' %</td>'+
	'<td class="tCen"></td>'+
	'<td clss="tCen"></td>'+
	'<td class="tCen"></td></tr>';

	$('#DetallesPV').append(totales)

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