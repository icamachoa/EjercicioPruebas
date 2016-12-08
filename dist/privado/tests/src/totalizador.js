cTotalizador = function(){

	this.sumaColumna = function(datos, params){
	  var resultados = {}, objColumnas = {};
	  
	  /*var queOperacion = function(obj){
	    var operacion = obj.operacion, resp = obj.resp, valor = obj.valor;
	    
	    if(operacion=='suma'){
	      resp +=valor;
	    }
	    
	    return resp;
	  }*/
	  
	  for(var x = 0; x < params.length; x++){
	    var columna = params[x].columna, operacion = params[x].operacion, tCambio = params[x].tCambio;
	    var respuesta = 0;
	    
	    datos.map(function(v){
	      var valor = parseFloat(v[columna]);
	      if(tCambio){
	        var cambio = parseFloat(v[tCambio]);
	        respuesta += (valor*cambio);
	      }else{
	        respuesta += valor;
	      }
	    });
	    
	    objColumnas[columna] = respuesta;
	  }
	  console.info(objColumnas);
	  return objColumnas;
	}

}