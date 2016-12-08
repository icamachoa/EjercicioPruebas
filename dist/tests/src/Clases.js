Oportunidades = function(){

	this.insertaOportunidad = function(datos){
	
		SalesUp.Sistema.CargaDatos({Link:'/privado/popup_nueva_oportunidad_guardar.dbsp',Parametros:datos});
		
	}

	this.obtiene_Id_Oportunidad = function(datos){

		return JSON.parse(SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonObtiene_Id_Oportunidad.dbsp',Parametros:datos})).jsonDatos;
	}

	this.Obtiene_Datos_Oportunidad = function(datos){

		return JSON.parse(SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosOportunidad.dbsp',Parametros:datos})).jsonDatos;
	}

	this.Obtiene_Productos_Oportunidad = function(datos){

		return JSON.parse(SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosProductosCotizadorEditar.dbsp',Parametros:datos})).jsonDatos;
	}

}

Metas = function(){

	this.crearMeta = function(datos){

		SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryAgregarMeta.dbsp',Parametros:datos});
	}

	this.obtiene_num_oportunidades = function(){

		return JSON.parse(SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonTest_NumeroOportunidades.dbsp',Parametros:''})).jsonDatos;
	}

	this.obtieneMeta=function(datos){

		return JSON.parse(SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosMetasAlerta.dbsp',Parametros:datos}));
	}
}

