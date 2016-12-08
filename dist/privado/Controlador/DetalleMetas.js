SalesUp.Variables.OcultaLoad = function(){
  SalesUp.Sistema.OcultarOverlay();
  SalesUp.Sistema.OcultaEspera();
};

SalesUp.Variables.CreaInterfaz = function(){
	var Parametros				= 'start='+Start+'&howmany='+RegXPag+'&idmeta=' + SalesUp.Variables.idmeta;
	var datosDetalle			= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDetalleMetas.dbsp', Parametros:Parametros,DataType:'json'});

	if((SalesUp.Variables.idtipo >= 603 && SalesUp.Variables.idtipo <= 608)||(SalesUp.Variables.idtipo >= 612 && SalesUp.Variables.idtipo <= 617)){
		if(SalesUp.Variables.idtipo >= 603 && SalesUp.Variables.idtipo <= 605){
			var nombreDetalle = 'Llamadas';
		}else if(SalesUp.Variables.idtipo >= 606 && SalesUp.Variables.idtipo <= 608){
			var nombreDetalle = 'Visitas';
		}else if(SalesUp.Variables.idtipo >= 612 && SalesUp.Variables.idtipo <= 614){
			var nombreDetalle = 'Seguimientos manuales';
		}

		var TemplateDistribuidores	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateDetalleMetasSeguimientos.dbsp', Div:0});
	}else if(SalesUp.Variables.idtipo >= 609 && SalesUp.Variables.idtipo <= 611){
		var nombreDetalle = 'Emails';
		var TemplateDistribuidores	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateDetalleMetasEmail.dbsp', Div:0});
	}else{
		var nombreDetalle = 'Citas';
		var TemplateDistribuidores	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateDetalleMetasCitas.dbsp', Div:0});
	}

	var num = 1;

	if(PagAct > 1){
		num = (PagAct*50)-49;
	}
	
	for (i=0;i<(datosDetalle.jsonDatos.length); i++){
		datosDetalle.jsonDatos[i].NUM=num+i;
	}

	SalesUp.Variables.total = datosDetalle.totalDatos[0].TOTAL;

	var htmlColumnas 	= SalesUp.Construye.ReemplazaDatos({Template:TemplateDistribuidores,Datos:{Datos:datosDetalle.jsonDatos,NombreDetalle:nombreDetalle}});

	$('#DatosLoad').html(htmlColumnas);

	SalesUp.Sistema.IniciaPlugins();
	SalesUp.Construye.Paginacion({pAct:PagAct, Total:SalesUp.Variables.total, PorPagina: RegXPag , DespDe:'.detalleMetas'});
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

$(function(){
	SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});
	SalesUp.Variables.CreaInterfaz();
}); /* /fin ready */
