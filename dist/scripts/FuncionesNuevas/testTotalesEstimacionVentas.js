sumaEstimacion = function(nDatos,cantidad,jsonDatos,tipo){
		
		var totalJson = [];
		var totalSumados = [];

		for(var x = 0; x < nDatos; x++){

		  var arrTotal = {};
		  var arrTotalSumados = {};
		  var suma = 0;
		  arrTotal.Total = jsonDatos[x].Total.toFixed(2);
		  
		  for(var y = 0; y < cantidad-1; y++){
		    var nombre = 'Dato'+y; 
		    var temp = jsonDatos[x];
		    suma += temp[nombre];
		  }
		  
		  suma += jsonDatos[x].Futuros + jsonDatos[x].Vencidos;
		  arrTotalSumados.Total = suma.toFixed(2);
		  
		  totalJson.push(arrTotal);
		  totalSumados.push(arrTotalSumados);
		}
		
		if (tipo == 0) {return totalJson;};
		if (tipo == 1) {return totalSumados};
	
}