 /** Primera función que se ejecuta al cargar la pagina **/
$(function(){
	var datosEmpresa 			= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonTipoDistribucion.dbsp', Parametros:'',DataType:'json', Div:0});
	var tipoDistribucion		= datosEmpresa.jsonDatos[0].DISTRIBUCION;
	var tipoCanalizacion		= datosEmpresa.jsonDatos[0].CANALIZACION;
	var idusuarioCanalizacion	= datosEmpresa.jsonDatos[0].IDUSUARIO_CANALIZACION;

	var TemplateDistribucion	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateDistribucionProspecto.dbsp', Parametros:'tipo=0&distribucion='+tipoDistribucion, Div:0});
	var jsonUsuarios			= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonUsuariosDistribucion.dbsp', Parametros:'tipo=0&distribucion='+tipoDistribucion, DataType:'json', Div:0 });

	var Usuarios = [];

	for (var i = 0; i < jsonUsuarios.jsonDatos.length; i++) {
		var _usuarioACtual = jsonUsuarios.jsonDatos[i].usuarios;

		if(i == jsonUsuarios.jsonDatos.length - 1){
			Usuarios.push({usuarios:_usuarioACtual});
		}else{
			Usuarios.push({usuarios:_usuarioACtual+', '});
		}
	};	

    var htmlColumnas = SalesUp.Construye.ReemplazaDatos({Template:TemplateDistribucion,Datos:{Usuarios:Usuarios}});

    var TemplateDistribucionC	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateDistribucionProspecto.dbsp', Parametros:'tipo=1&idusuarioCanalizacion='+idusuarioCanalizacion+'&canalizacion='+tipoCanalizacion, Div:0});
	var jsonUsuariosCanalizacion= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonUsuariosDistribucion.dbsp', Parametros:'tipo=1&canalizacion='+tipoCanalizacion, DataType:'json', Div:0 });

	var UsuariosCanalizacion = [];
	
	for (var i = 0; i < jsonUsuariosCanalizacion.jsonDatos.length; i++) {
		var _usuarioACtual = jsonUsuariosCanalizacion.jsonDatos[i].usuarios;

		if(i == jsonUsuariosCanalizacion.jsonDatos.length - 1){
			UsuariosCanalizacion.push({usuarios:_usuarioACtual});
		}else{
			UsuariosCanalizacion.push({usuarios:_usuarioACtual+', '});
		}
	};	

    var htmlColumnasCanalizacion = SalesUp.Construye.ReemplazaDatos({Template:TemplateDistribucionC,Datos:{Usuarios:UsuariosCanalizacion}});

    $('#DatosLoad').append(htmlColumnas);
    $('#DatosLoadCanalizacion').append(htmlColumnasCanalizacion);
}); /* /fin ready */
