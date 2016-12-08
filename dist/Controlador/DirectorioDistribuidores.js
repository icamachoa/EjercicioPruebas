 /** Primera función que se ejecuta al cargar la pagina **/

SalesUp.Variables.CreaInterfaz = function(){
	var datosEmpresasLigadas 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonEmpresasLigadas.dbsp', Parametros:'',DataType:'json', Div:0});
	var TemplateDirectorio		= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateDirectorioDistribuidores.dbsp', Parametros:'', Div:0});

	var htmlColumnas = SalesUp.Construye.ReemplazaDatos({Template:TemplateDirectorio,Datos:{Empresas:datosEmpresasLigadas.jsonDatos}});

	$('#DatosLoad').html(htmlColumnas);
	SalesUp.Sistema.IniciaPlugins();
}

SalesUp.Variables.EditarEmpresa = function(_idrelacion){
	SalesUp.Sistema.AbrePopUp({
		Titulo:'Editar distribuidor',
		Pagina:'popup_editar_distribuidor.dbsp',
		Parametros:'IdRelacion='+_idrelacion,
		CallBack:'SalesUp.Variables.CreaInterfaz', Alto:290, Ancho:450
	});
}

$(function(){
	SalesUp.Variables.CreaInterfaz();
}); /* /fin ready */
