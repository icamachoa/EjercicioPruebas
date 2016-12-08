ValidadorConversor = function(){

	this.NumeroDosDecimales = function(Numero){ return accounting.toFixed(Numero, 2); }
	
	var FormatoMinutos = function(Op){
		var Dato = '';
		var MINS_PER_YEAR = 24 * 365 * 60;
		var MINS_PER_MONTH = 24 * 30 * 60;
		var MINS_PER_WEEK = 24 * 7 * 60;
		var MINS_PER_DAY = 24 * 60;
		var MINS_PER_HOUR = 60;

		var minutes = Op.Minutos;
		
		if(Op.Tipo == 'm'){
			var months = ((minutes / MINS_PER_MONTH) % 1) ? NumeroDosDecimales((minutes / MINS_PER_MONTH)) : (minutes / MINS_PER_MONTH);
			return (Op.Unidad) ? months + " meses" : months ;
		}

		if(Op.Tipo == 'sem'){
			var weeks = ((minutes / MINS_PER_WEEK) % 1) ? NumeroDosDecimales((minutes / MINS_PER_WEEK)) : (minutes / MINS_PER_WEEK);
			return (Op.Unidad) ? weeks + " sem" : weeks ;
		}

		if(Op.Tipo == 'd'){
			var days = ((minutes / MINS_PER_DAY) % 1) ? NumeroDosDecimales((minutes / MINS_PER_DAY)) : (minutes / MINS_PER_DAY);
			return (Op.Unidad) ? days + " d" : days ;
		}

		if(Op.Tipo == 'h'){
			var days = ((minutes / MINS_PER_HOUR) % 1) ? NumeroDosDecimales((minutes / MINS_PER_HOUR)) : (minutes / MINS_PER_HOUR);
			return (Op.Unidad) ? days + " hr" : days ;
		}

		if(Op.Tipo == 'min'){
			return (Op.Unidad) ? minutes + " min" : minutes;
		}

	}/*FormatoMinutos*/

}