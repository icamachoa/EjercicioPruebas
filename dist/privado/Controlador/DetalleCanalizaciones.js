var Destino = '#DatosLoad', IdTabla="TablaCanalizaciones", IdVentana = 28;
var Datos, TemplateDatos, NombreCampos;

SalesUp.Variables.OcultaLoad = function(){
  SalesUp.Sistema.OcultarOverlay();
  SalesUp.Sistema.OcultaEspera();
};

SalesUp.Variables.CreaInterfaz = function(){
	var ids 			= SalesUp.Sistema.Encript({"cadena":SalesUp.Variables.Ids,"tipo":"decode"});
	var Parametros		= 'start='+Start+'&howmany='+RegXPag+'&ids='+ids+'&tipodetalle=' + SalesUp.Variables.TipoDetalle+'&idventana='+IdVentana;
	var datosDetalle	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDetalleDistribuidor.dbsp', Parametros:Parametros,DataType:'json'});
	var NombreCampos	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateDistribuidorDetalle.dbsp', Parametros:Parametros+'&thead=1', Div:0});
	var TemplateDatos	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateDistribuidorDetalle.dbsp', Parametros:Parametros+'&thead=0', Div:0});
	
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
	var LLamaExportar = "TipoReporte(1)";
	SalesUp.Construye.AgregaBoton({DentroDe:'#BtnExportarImportar', Boton:'Exportar datos', Titulo:'Exportar información',  Href:'#', Clases:'exportar thickbox', Onclick:LLamaExportar });
}); /* /fin ready */
