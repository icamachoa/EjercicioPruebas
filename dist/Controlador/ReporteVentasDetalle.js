Handlebars.registerHelper('ValidaCorreo', function(correo, TKP, TKO, correoValidado) {
  	if(SalesUp.Variables.MailConfig == 0){
  		var correofinal = '<span txt="Correo inválido" class="CorreoWarning tooltip izq"><a title="Configuración de Correo" class="thickbox" href="popup_config_mail.dbsp?keepThis=false&TB_iframe=true&height=330&width=560" >'+correo+'</a></span>';
  	}else{
		var correofinal = '<a id="AgregarTitulo" title="Redactar correo Para: '+correo+'" href="popup_compose_mail.dbsp?TKP='+TKP+'&TKO='+TKO+'&TB_callback=GetData&keepThis=false&TB_iframe=true&height=565&width=750&modal=true&modalAlt=true" class="thickbox">'+correo+'</a>';
	}
  	return correofinal;
});

Handlebars.registerHelper('CalculaPorcentaje', function(ANTICIPOS_MONTO, ANTICIPOS_COMISION, PCT) {
	var pct = 0;

	if(ANTICIPOS_MONTO > 0){
		pct = ANTICIPOS_COMISION/ANTICIPOS_MONTO;
	}

	return pct;
});

$(function(){
	SalesUp.Variables.CargaReporteDetalle();
    $("#btnexportar").click(function(){
        var cadena='tipo='+SalesUp.Variables.Tipo+'&periodo='+SalesUp.Variables.Periodo+'&Moneda='+ SalesUp.Variables.Moneda +'&actividad='+SalesUp.Variables.Actividad +'&mes=' +SalesUp.Variables.Mes+'&parametros='+SalesUp.Variables.Parametros ; 
       $(this).attr("href","ajax/exporta_reporte.dbsp?reporte=2&"+cadena);
    });
});

SalesUp.Variables.CargaReporteDetalle = function(){
	var Parametros 			= 'start='+Start+'&howmany='+RegXPag+'&tipo='+SalesUp.Variables.Tipo+'&periodo='+SalesUp.Variables.Periodo+'&parametros='+SalesUp.Variables.Parametros+'&moneda='+SalesUp.Variables.Moneda+'&actividad='+SalesUp.Variables.Actividad+'&mes='+SalesUp.Variables.Mes;
	var TemplateCabeceras	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateVentasRealizadas.dbsp', Parametros:'thead=1&actividad='+SalesUp.Variables.Actividad, Div:0});
	var TemplateDatos		= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateVentasRealizadas.dbsp', Parametros:'thead=0&actividad='+SalesUp.Variables.Actividad, Div:0});
	var jsonDatos			= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDetalleReporteVentas.dbsp', Parametros:Parametros,DataType:'json'}).jsonDatos;

	if(!_.isUndefined(jsonDatos[0].TOTAL)){
		var total = jsonDatos[0].TOTAL;
	}else{
		var total = 0;
	}

	SalesUp.Construye.ConstruyeTabla(TemplateCabeceras, TemplateDatos, jsonDatos, {Destino:'#DatosLoad', Id:'TablaReporte',PagActual:PagAct, NumRegistros:total} );
	SalesUp.Sistema.IniciaPlugins();
	SalesUp.exporta.btnExportar({titulo:'Detalles de ventas'})
};

function iraPag(Ir){
	PagAct = Ir;
	var Cond = '';
	ActivaPaginacion(Cond,Ir);
}

function ActivaPaginacion(Cond,Ir){
    Start = (parseInt(Ir) * parseInt(RegXPag)) - RegXPag + 1;
    SalesUp.Variables.CargaReporteDetalle();
}

