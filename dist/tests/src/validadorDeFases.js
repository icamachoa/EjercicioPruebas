lasFases = function(){

	this.validaFasesProspecto = function(Op){
		//para esta prueba se necesita logiarse con desarrollo@salesupdb15.com y la idempresa 37043
		var misFases = '{"tipoVariante":"1","laVariante":"9548EAB1-3550-4E72-B575-3B5799959DA4","filtros":[{"TipoFase":"0"},{"tipo":"0"},{"moneda":""}]}';
		misFases     = encodeURIComponent(misFases)
		var jFases = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonAvancesFases.dbsp',
			Parametros:'OBJETO='+misFases
		});
		jFases = JSON.parse(jFases);
		jFasesHead = jFases.jsonDatosHead;
		/*comparacion de las fases de la base de datos con el objeto "misFases"*/ 
		var arr = [];
		for (var i = 0; i < jFasesHead.length; i++) {
			console.log(jFasesHead[i].CABECERA , Op[i].FASE)
			if(jFasesHead[i].CABECERA == Op[i].FASE){
				arr.push(i);
			}
		}   
		var Return;
		if(arr.length == 6 ){
			Return = true;
		}else{
			Return = false;
		}
		return Return;  
		
	}

}