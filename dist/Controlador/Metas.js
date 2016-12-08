var Destino = '#DatosLoad', IdTabla="TablaMetasDetalle", PagAct = 1, Start=1;

Handlebars.registerHelper('tipoCerteza', function(certeza,color) {
  	var out 		= "", data;

  	if(certeza<0.34){
  		out += '<a href="#" class="certezabaja" title="Certeza Baja"></a>';
  	}else if((certeza>=0.34)&(certeza<0.66)){
  		out += '<a href="#" class="certezamedia" title="Certeza Media"></a>';
  	}else if(certeza>=0.66){
  		out += '<a href="#" class="certezaalta" title="Certeza Alta"></a>';
  	}
  return out;
});

SalesUp.Variables.CreaInterfaz = function(){
	var datosMetas 		= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosMetas.dbsp',Parametros:'start='+Start+'&howmany=50&idmeta='+SalesUp.Variables.idMeta,DataType:'json'});
	var datos 			= datosMetas.jsonDatos;
	var datosCabeceras 	= datosMetas.jsonCabeceras;
	var totalDatos	 	= datosMetas.totalDatos;

	if(!_.isUndefined(totalDatos[0].TOTAL)){
		var total = totalDatos[0].TOTAL;
		$('#TituloVentana').html(totalDatos[0].META);
	}else{
		var total = 0;
	}

	if(total == 0){
		datos = [{}];
	}

	if(!_.isUndefined(datos[0].CALIFICADOR)){
		var calificador = datos[0].CALIFICADOR;
	}else{
		var calificador = 'P';
	}

	if(datos[0].IDCOMPONENTE){
		var idcomponente = datos[0].IDCOMPONENTE;
	}else{
		var idcomponente = '';
	}

	var templateCabecera 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateMeta.dbsp',Parametros:'idmeta='+SalesUp.Variables.idMeta+'&thead=1&idcomponente=' + idcomponente});
	var templateDatos 		= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateMeta.dbsp',Parametros:'idmeta='+SalesUp.Variables.idMeta+'&thead=0&calificador='+calificador+'&idcomponente=' + idcomponente});
	var cabeceras	 		= SalesUp.Construye.ReemplazaDatos({Template:templateCabecera,Datos:{"Datos":datosCabeceras}});

	SalesUp.Construye.ConstruyeTabla(cabeceras, templateDatos, datos, {Destino:Destino, Id:IdTabla, PagActual:PagAct, NumRegistros:total } );
	SalesUp.Sistema.IniciaPlugins();
};

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
	SalesUp.Variables.CreaInterfaz();
});
