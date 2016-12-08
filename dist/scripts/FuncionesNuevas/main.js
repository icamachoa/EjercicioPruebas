if ($.timeago){
	$.timeago.settings.strings = {
	  prefixAgo: "Hace", prefixFromNow: "dentro de", suffixAgo: "", suffixFromNow: "", seconds: "menos de un minuto",
	  minute: "un minuto", minutes: "%d minutos", hour: "una hora", hours: "%d horas", day: "un día", days: "%d días",
	  month: "un mes", months: "%d meses", year: "un año", years: "%d años" 
	};
}


var SalesUp = {};
SalesUp.Variables = {};
SalesUp.Sistema = new SistemaDefault();
SalesUp.Ventana = new PopUps();
SalesUp.Valida = new Validaciones();
SalesUp.Construye = new ContructorUi();
SalesUp.Fechas = new Fecha();
SalesUp.Notificaciones = new Notifiacaciones();
SalesUp.Documentos = new CrearDocumentos();
SalesUp.Buscar = new Buscador();


if (window.myInbox){
	SalesUp.Inbox = new myInbox();	
}

if (window.ComposeMail){
	SalesUp.Correo = new ComposeMail();	
}

if (window.Catalogo){
	SalesUp.Catalogo = new Catalogo();	
}

SalesUp.Ayuda = {};
SalesUp.Ayuda.Sistema = new AyudaSistema();
SalesUp.Ayuda.Construye = new AyudaConstruye();
SalesUp.Ayuda.Valida = new AyudaValidaciones();

SalesUp.Sistema.simboloMonedaDefault();

var GetData2 = function(){}
/*

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
	var nav = window.navigator;
	var appCodeName = (nav.appCodeName) ? nav.appCodeName : 'no soportado';
	var userAgent = (nav.userAgent) ? nav.userAgent : 'desconocido';
	var tku = (localStorage.SysTku) ? localStorage.SysTku : 'desconocido';
	var tke = (localStorage.SysTke) ? localStorage.SysTke : 'desconocido';
	var donde = document.location.href;
	var referrer = document.referrer;
	var path = document.location.pathname;
	var pathPadre = self.parent.document.location.pathname;
	var fecha = new Date();

	var servidor = document.location.hostname;
	servidor = SalesUp.Sistema.StrReplace('salesup.com','',servidor);
	servidor = SalesUp.Sistema.StrReplace('.mx','',servidor);
	servidor = SalesUp.Sistema.StrReplace('.','',servidor);
	
	
	if(moment){ fecha = moment(fecha).format('DD/MM/YYYY hh:mm'); }

	var error = {};
	error.dUsr = {};
	error.dError = {};
	error.dNav = {};
	error.dDisp = {};

	error.fecha = fecha;
	error.dUsr.tku = tku;
	error.dUsr.tke = tke;

	error.dError.error = errorMsg;
	error.dError.script = url;
	error.dError.line = lineNumber;
	error.dError.column = column;
	error.dError.stackTrace = errorObj;  

	error.dNav.appCodeName = appCodeName;
	error.dNav.userAgent = userAgent;
	error.dNav.donde = donde;
	error.dNav.referrer = referrer;
	error.dNav.path = path;
	error.dNav.pathPadre = pathPadre;

	if(device){

		error.dDisp.desktop = (device.desktop())?1:0;
		error.dDisp.tablet = (device.tablet())?1:0;
		error.dDisp.mobile = (device.mobile())?1:0;

		error.dDisp.android = (device.android())?1:0;
		error.dDisp.ios = (device.ios())?1:0;
		error.dDisp.windows = (device.windows())?1:0;

		error.dDisp.ipad = (device.ipad())?1:0;
		error.dDisp.iphone = (device.iphone())?1:0;

	}

	SalesUp.Variables.dError = error;
	if((servidor!='dev')&&(servidor!='sandbox')){
		var strError = JSON.stringify(error);
		strError = 'e='+escape(strError)+'&error='+escape(errorMsg)+'&s='+servidor;
		SalesUp.Sistema.CargaDatosAsync({link:'https://dev.salesup.com.mx/cathError.dbsp', parametros:strError});
	}else{
		console.warn('ooops...!');
		console.log(error.dError);
	}

}*/
/*window.onerror*/

