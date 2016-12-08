
var esSdlr = SalesUp.Sistema.EstaActivoModulo({Modulo:10});
if (esSdlr) $("#SecMenuVideos").remove();

SalesUp.Sistema.UltimaVisita();
SalesUp.Sistema.simboloMonedaDefault();
SalesUp.Sistema.versionSistema();

setTimeout(function(){
	SalesUp.Sistema.ShortCut();  
	SalesUp.Sistema.CatalogosActivos();
	SalesUp.Sistema.LinksExternos();
	
	SalesUp.Sistema.Dispositivo();
	SalesUp.Sistema.ColoresDefault();
	SalesUp.Sistema.ColoresTema();
	SalesUp.Sistema.ControlaMenus();
	
	SalesUp.Notificaciones.activaNoficaciones();
	
	
},200);

SalesUp.Variables.MuestralogoEmpresa=function(){
	var respuesta=SalesUp.Sistema.EstaActivoModulo({Modulo:10});
	if(respuesta){
		$('#sandler').css('display', 'block');
	}else if(SalesUp.Sistema.EstaActivoModulo({Modulo:13})){
		$('#contpaq').css('display', 'block');
	}else if(SalesUp.Sistema.EstaActivoModulo({Modulo:17})){
		$('#logoGral, #sandler, #contpaq').remove();
	}else{
		$('#logoGral').css('display', 'block');
	}
} 

SalesUp.Variables.MuestralogoEmpresa();
$(function(){
	
	setInterval(SalesUp.Notificaciones.revisaAlertasLocal,15000);

	$(".VerAlerta1").click(function(){
		id = $(this).attr("rel");
		alink = SalesUp.Notificaciones.EliminaAlerta(id);	
		document.location = alink;
		return false;
	});

	$(".EliminaNotificacion1").click(function(){
		id = $(this).attr("rel");
		SalesUp.Notificaciones.EliminaAlerta(id);
		$(this).parent().parent().remove();
		CuentaNotif();
		return false;
	});

	$("form").each(function(e){
		$(this).append('<input name="idpeticion" type="hidden" value="'+SalesUp.Construye.IdUnico()+'" />');
	});

});/*Ready*/



/**----*/

function StrQuitaAcentos(str){
    str = str.replace(/[ÀÁÂÃÄÅ]/g,"A");
    str = str.replace(/[àáâãäå]/g,"a");
    str = str.replace(/[ÈÉË]/g,"E");
    str = str.replace(/[éèé]/g,"e");
    str = str.replace(/[ÍÌÏ]/g,"I");
    str = str.replace(/[ìíï]/g,"i");
    str = str.replace(/[ÓÒÖ]/g,"O");
    str = str.replace(/[óòó]/g,"o");
    str = str.replace(/[ÚÙÜ]/g,"U");
    str = str.replace(/[úùú]/g,"u");
    str = str.replace(/[Ñ]/g,"N");
    str = str.replace(/[ñ]/g,"n");
    return str.replace(/[^a-z0-9]/gi,''); // final clean up
}

var fixed = false;
$(document).scroll(function(){
	if( $(this).scrollTop() > 60 ){
		if( !fixed ){
			fixed = true;
			$('#menu-superior').addClass('MenuSuperiorSolido');
		}
	}else{
		if( fixed ){
			fixed = false;
			$('#menu-superior').removeClass('MenuSuperiorSolido');
		}
	}
});


function getInternetExplorerVersion(){
  var rv = -1;
  if (navigator.appName == 'Microsoft Internet Explorer'){
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }else if (navigator.appName == 'Netscape'){
    var ua = navigator.userAgent;
    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }

  var stilo = '';
  	stilo += '<style>';
  	stilo += '.ContenedorModal.PopUp .BoxBotonesAccion{position:relative !important;} ';
  	stilo += '.ContenedorModal.PopUp .BodyModal{padding:10px !important;}';
  	stilo += '</style>';
  	
  if(rv!=-1){
  	$('body').append(stilo);
  } 
}

getInternetExplorerVersion();


