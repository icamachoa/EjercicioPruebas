var moneda = function(){
	this.CambiaTipoCambio = function (num,Op){
	  var resultado=[];
	  var tam = _.size(Op);
	  for (var x = 0; x < tam; x++){
	    var arr = {}
	    arr.tkm = Op[x].tkm;
	    arr.cambio = Op[x].cambio/num;
	    resultado.push(arr);
	  }
	  return resultado;
	}
}