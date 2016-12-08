Handlebars.registerHelper('ValidaCorreo', function(correo, TKP, TKO, correoValidado) {
  	if(correo){
  		if(SalesUp.Variables.MailConfig == 0){
	  		var correofinal = '<span txt="Correo inválido" class="CorreoWarning tooltip izq"><a title="Configuración de Correo" class="thickbox" href="popup_config_mail.dbsp?keepThis=false&TB_iframe=true&height=330&width=560" >'+correo+'</a></span>';
	  	}else{
			var correofinal = '<a id="AgregarTitulo" title="Redactar correo Para: '+correo+'" href="popup_compose_mail.dbsp?TKP='+TKP+'&TKO='+TKO+'&TB_callback=GetData&keepThis=false&TB_iframe=true&height=565&width=750&modal=true&modalAlt=true" class="thickbox">'+correo+'</a>';
		}
  	}
	  	
  	return correofinal;
});

Handlebars.registerHelper('ObtieneCerteza', function(certeza, CertezaFinal) {
	if(certeza < 0.34){
		var tdCerteza = '<a href="#" class="certezabaja" title="Certeza Baja"></a>';
	}else if(certeza >= 0.34 && certeza < 0.66){
		var tdCerteza = '<a href="#" class="certezamedia" title="Certeza Media"></a>';
	}else if(certeza>=0.66){
		var tdCerteza = '<a href="#" class="certezaalta" title="Certeza Alta"></a>';
	}

	return tdCerteza;
});

function iraPag(Ir){
	PagAct = Ir;
	var Cond = '';
	ActivaPaginacion(Cond,Ir);
}

function ActivaPaginacion(Cond,Ir){
    Start = (parseInt(Ir) * parseInt(RegXPag)) - RegXPag + 1;
    SalesUp.Variables.CargaReporteDetalle();
}

SalesUp.Variables.CargaReporteDetalle = function(){
	var Parametros 			= 'start='+Start+'&howmany='+RegXPag+'&vista='+SalesUp.Variables.Vista+'&periodo='+SalesUp.Variables.Periodo+'&moneda='+SalesUp.Variables.Moneda+'&parametros='+SalesUp.Variables.Parametros
	//console.info(Parametros);
	var TemplateCabeceras	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateEstimacionDetalle.dbsp', Parametros:'thead=1', Div:0});
	var TemplateDatos		= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateEstimacionDetalle.dbsp', Parametros:'thead=0', Div:0});
	var jsonDatos			= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDetalleOpSinSeguimiento.dbsp', Parametros:Parametros,DataType:'json'}).jsonDatos;

	if(!_.isUndefined(jsonDatos[0].TOTAL)){
		var total = jsonDatos[0].TOTAL;
	}else{
		var total = 0;
	}
	var titulo='<input type="hidden" name="titulo" id="titulo" value="Reporte_de_Oportunidades_sin_seguimiento" />';
	SalesUp.Construye.ConstruyeTabla(TemplateCabeceras, TemplateDatos, jsonDatos, {Destino:'#DatosLoad', Id:'TablaReporte',PagActual:PagAct, NumRegistros:total} );
	SalesUp.Sistema.IniciaPlugins();
	$('#DatosLoad').append(titulo);
};

$(function(){
	SalesUp.Variables.CargaReporteDetalle();
});

