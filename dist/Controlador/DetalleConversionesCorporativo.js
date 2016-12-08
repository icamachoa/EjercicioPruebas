var Destino = '#DatosLoad', IdTabla="TablaReporte";
var Datos, TemplateDatos, NombreCampos;

SalesUp.Variables.OcultaLoad = function(){
  SalesUp.Sistema.OcultarOverlay();
  SalesUp.Sistema.OcultaEspera();
};

SalesUp.Variables.CreaInterfaz = function(){
	var arrayIds 			= SalesUp.Sistema.CargaDatos({Link:'/privado/modelo/jsonIdsDetalleConversiones.dbsp', Parametros:SalesUp.Variables.parametros,DataType:'json'}).jsonDatos;
	var cadenaParametros 	= SalesUp.Sistema.Encript({cadena:SalesUp.Variables.parametros,tipo:'decode'});

	console.log(arrayIds);

	SalesUp.Variables.total = arrayIds.length;
	
	var ids = '';

	for (var i = 0; i < arrayIds.length; i++) {
		var idactual = arrayIds[i].ID;

		if(i == 0){
			ids = ids+idactual;
		}else{
			ids = ids+','+idactual;
		}
	};

	if(ids != 'undefined'){
		if(arrayIds[0].NATURALEZA == 1){
			var IdVentana 		= 8;
			var Parametros		= 'start='+Start+'&howmany='+RegXPag+'&ids='+ids+'&tipodetalle='+arrayIds[0].NATURALEZA+'&idventana='+IdVentana;
			var datosDetalle	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDetalleDistribuidor.dbsp', Parametros:Parametros,DataType:'json'});
		}else if(arrayIds[0].NATURALEZA == 2){
			var IdVentana 		= 9;
			var Parametros		= 'start='+Start+'&howmany='+RegXPag+'&ids='+ids+'&tipodetalle='+arrayIds[0].NATURALEZA+'&idventana='+IdVentana;
			var datosDetalle	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDetalleDistribuidorOportunidades.dbsp', Parametros:Parametros,DataType:'json'});
		}

		var NombreCampos	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateDistribuidorDetalle.dbsp', Parametros:Parametros+'&thead=1', Div:0});
		var TemplateDatos	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateDistribuidorDetalle.dbsp', Parametros:Parametros+'&thead=0', Div:0});
	}else{
		var datosDetalle 		= {};
		datosDetalle.jsonDatos 	= [];
		var TemplateDatos 		= '';
		var NombreCampos		= '';
	}
	
	SalesUp.Construye.ConstruyeTabla(NombreCampos, TemplateDatos, datosDetalle.jsonDatos, {Destino:Destino, Id:IdTabla, PagActual:PagAct, NumRegistros:SalesUp.Variables.total } );
	SalesUp.Sistema.IniciaPlugins();
	SalesUp.Variables.OcultaLoad();
}

function iraPag(Ir){
	PagAct = Ir;
	var Cond = '';
	ActivaPaginacion(Cond,Ir);
}

function ActivaPaginacion(Cond,Ir){
    Start = (parseInt(Ir) * parseInt(RegXPag)) - RegXPag + 1;
    SalesUp.Variables.CreaInterfaz();
}

function ReloadData(){
	SalesUp.Variables.CreaInterfaz();
}

$(function(){
	SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});
	SalesUp.Variables.CreaInterfaz();
	//var LLamaExportar = "TipoReporte(1)";
	//SalesUp.Construye.AgregaBoton({DentroDe:'#BtnExportarImportar', Boton:'Exportar datos', Titulo:'Exportar información',  Href:'#', Clases:'exportar thickbox', Onclick:LLamaExportar });
}); /* /fin ready */

