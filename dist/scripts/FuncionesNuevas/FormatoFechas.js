var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default": "ddd, dd mmm yyyy",
	'dd/mm/yy': "dd/mmm/yyyy",
	'mm/dd/yy': 'mmm/dd/yyyy',
	'MDA': "mmm, dd yyyy",
	'103': "dd/mm/yyyy",
	'101':"mm/dd/yyyy",
	"Completo": "ddd mmm dd yyyy HH:MM:ss",
	'dia':"dd",
	'mes':"mm",
	'anio':"yyyy" 
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Dom", "Lun", "Mar", "Mier", "Jue", "Vie", "Sab",
		"Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"
	],
	monthNames: [
		"Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
		"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
	]
};

// For convenience...
Date.prototype.FormatDate = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

var Fecha = function(){
	this.FormatoFecha = function(Fecha, Code, Mask){
		var dSQL = Fecha;
		if(Code=='103'){
		    var dd = Fecha.substring(0,2);
		    var mm = Fecha.substring(3,5);
	        var yyyy = Fecha.substring(6,10);        
	        Fecha = mm+'/'+dd+'/'+yyyy;	    
		}

		var FormatoDeLaFecha = SalesUp.Sistema.Almacenamiento({a:'SysFormatoFecha'});
		FormatoDeLaFecha = SalesUp.Sistema.StrReplace('yy','yyyy',FormatoDeLaFecha);
		FormatoDeLaFecha = SalesUp.Sistema.StrReplace('mm','mmm',FormatoDeLaFecha);
		FormatoDeLaFecha = FormatoDeLaFecha.toUpperCase();
		var nFecha = SalesUp.Sistema.StrReplace('.','',moment(new Date(Fecha)).format(FormatoDeLaFecha));
		return nFecha;
		//Fecha = new Date(Fecha).FormatDate(Mask);
		
	}
}


