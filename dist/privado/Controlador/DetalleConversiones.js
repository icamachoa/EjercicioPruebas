var Destino = '#DatosLoad', IdTabla="TablaReporte";
var Datos, TemplateDatos, NombreCampos;

SalesUp.Variables.OcultaLoad = function(){
  SalesUp.Sistema.OcultarOverlay();
  SalesUp.Sistema.OcultaEspera();
};

SalesUp.Variables.CreaInterfaz = function(){
	var arrayIds 			= SalesUp.Sistema.CargaDatos({Link:'/privado/modelo/jsonIdDetalles.dbsp', Parametros:SalesUp.Variables.parametros,DataType:'json'}).jsonDatos;
	var cadenaParametros 	= SalesUp.Sistema.Encript({cadena:SalesUp.Variables.parametros,tipo:'decode'});

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

	var confExp = {titulo:'Conversiones'};

	if(ids != 'undefined'){
		if(arrayIds[0].NATURALEZA == 1){
			var IdVentana 		= 8;
			var Parametros		= 'start='+Start+'&howmany='+RegXPag+'&ids='+ids+'&tipodetalle='+arrayIds[0].NATURALEZA+'&idventana='+IdVentana;
			var ParametrosExp	= 'ids='+ids+'&tipodetalle='+arrayIds[0].NATURALEZA+'&idventana='+IdVentana;
			var datosDetalle	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDetalleDistribuidor.dbsp', Parametros:Parametros,DataType:'json'});
				confExp.exportacionTotal = '/privado/Modelo/jsonDetalleDistribuidorExp.dbsp';
				confExp.parametros = ParametrosExp;
		}else if(arrayIds[0].NATURALEZA == 2){
			var IdVentana 		= 9;
			var Parametros		= 'start='+Start+'&howmany='+RegXPag+'&ids='+ids+'&tipodetalle='+arrayIds[0].NATURALEZA+'&idventana='+IdVentana;
			var ParametrosExp	= 'ids='+ids+'&tipodetalle='+arrayIds[0].NATURALEZA+'&idventana='+IdVentana;
			var datosDetalle	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDetalleDistribuidorOportunidades.dbsp', Parametros:Parametros,DataType:'json'});
				confExp.exportacionTotal = '/privado/Modelo/jsonDetalleDistribuidorOportunidadesExp.dbsp';
				confExp.parametros = ParametrosExp;
		}

		var NombreCampos	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateDistribuidorDetalle.dbsp', Parametros:Parametros+'&thead=1', Div:0});
		var TemplateDatos	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateDistribuidorDetalle.dbsp', Parametros:Parametros+'&thead=0', Div:0});
	}else{
		var datosDetalle 		= {};
		datosDetalle.jsonDatos 	= [];
		var TemplateDatos 		= '';
		var NombreCampos		= '';
	}
	
	confExp.preparaExportacion = SalesUp.Variables.exportaConversiones;

	SalesUp.Construye.ConstruyeTabla(NombreCampos, TemplateDatos, datosDetalle.jsonDatos, {Destino:Destino, Id:IdTabla, PagActual:PagAct, NumRegistros:SalesUp.Variables.total } );
	SalesUp.Sistema.IniciaPlugins();
	SalesUp.Variables.OcultaLoad();
	SalesUp.exporta.btnExportar(confExp);
}

SalesUp.Variables.exportaConversiones = function(Op){
	jsonDatos = Op.jsonDatos;

	jsonFinal = _.map(jsonDatos,function(key){
		aux = {};
		aux.Nombre = key.NOMBRE;
		aux.Empresa = key.EMPRESA;
		aux.Correo = key.CORREO;
		aux.Telefono = key.TELEFONO;
		aux.Movil = key.MOVIL;
		aux.Fase = key.Fase;
		aux.Origen = key.Origen;
		aux.Ultimo_Contacto = key.UltimoContactoTiempo+' ['+key.UltimoUsuario+'] - '+key.UltimoContacto;
		aux.Ejecutivo = key.EjecutivoNombre;

		return aux;
	});

	return jsonFinal;
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
