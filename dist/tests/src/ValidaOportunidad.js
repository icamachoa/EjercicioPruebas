
Oportunidades = function(){

	this.insertaOportunidad = function(datos){
	
		SalesUp.Sistema.CargaDatos({Link:'/privado/popup_nueva_oportunidad_guardar.dbsp',Parametros:datos});
		
	}

}