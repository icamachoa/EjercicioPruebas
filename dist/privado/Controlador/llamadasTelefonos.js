
var Llamadas=function(){

	this.isMovile=false;
	this.telefono='';
	this.desktopFijo ='';
	this.desktopMovil='';
	this.movil='';
	this.tkp='';
	/*this.getIsMovile=function(){
		return this.isMovile;
	};

	this.setIsMovile=function(value){
		this.isMovile=value;
	};
	this.getTelefono=function(){
		return this.telefono;
	};

	this.setTelefono=function(value){
		this.telefono=value;
	};*/

	this.mobilecheck = function() {
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))){
			return true;
		}
		return false;
	};

	this.accionesLlamadasProgramado= function(Op){
		var t = Op.t, $t = $(t);
		var $t = $(Op.t);
		var htmlAcciones = '';
			htmlAcciones += '<span class="OpcionAcciones Pointer llamar-clickmovile" data-tkp="'+$t.attr("data-tkp")+'" tel="'+$t.attr("tel")+'" ><i class="fa fa-lg fa-phone-square"></i> LLamar </span>';
			htmlAcciones += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Sistema.AbrePopUp({ Pagina:\'popup_enviar_sms.dbsp\', Titulo:\'Enviar SMS al número '+$t.text()+'\', Parametros:\'idprospecto='+$t.attr("idprospecto")+'&amp;tel='+$t.attr("tel")+'&amp;idoportunidad=&tkp='+$t.attr("data-tkp")+'\', CallBack:\'SalesUp.Variables.InformacionEmpresa\', Alto:180, Ancho:450 });""><i class="fa fa-lg fa-mobile"></i> Enviar SMS</span>';
		var accionesMenu = function(){
			SalesUp.Construye.popOver({Elemento:t, PopOverLugar:'left', Contenido:htmlAcciones, Clases:'PopOverAcciones'});
		}
		accionesMenu();
		$t.mouseenter(function(){ accionesMenu(); }); 
		$t.removeAttr('onmouseenter');
	};

	this.creaLlamada=function(){
		var actual=$(this);
		var attr = actual.attr('tel');
		if(typeof attr !== typeof undefined && attr !== false){
			this.isMovile=true;
			SalesUp.Llamadas.numero=actual.attr("tel");

		}else{
			SalesUp.Llamadas.numero=actual.attr("data-tel").replace(/[^0-9]/g, '');;
			SalesUp.Llamadas.isMovile=false;
		}
		SalesUp.Llamadas.tkp=actual.attr("data-tkp");
		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonDatosLlamadas.dbsp', almacen:'jsonMascaraLlamada', parametros:'', callback:SalesUp.Llamadas.procesaLlamada});
	};


	this.procesaLlamada= function(Op, err){
		var d = Op.jsonDatos[0];
		SalesUp.Llamadas.desktopFijo=d.LINKDESKTOP_FIJO;
		SalesUp.Llamadas.desktopMovil=d.LINKDESKTOP_MOVIL;
		SalesUp.Llamadas.movil=d.LINKMOVIL;
		//Borramos el link del numero si existe..
		$("#link_"+SalesUp.Llamadas.numero, document).remove();
		if(SalesUp.Llamadas.mobilecheck()){// llamadas para celular
			var temp=SalesUp.Llamadas.desktopMovil.replace("[TELEFONO]", SalesUp.Llamadas.numero);
				$("#contenedor").append('<a href="'+temp+'" title="llamanos con gusto te atenderemos" style="display:none" id="link_'+SalesUp.Llamadas.numero+'"></a>');
				$("#link_"+SalesUp.Llamadas.numero)[0].click();
				SalesUp.Llamadas.terminaLlamada();
		}else{//
			if(SalesUp.Llamadas.isMovile){
				var temp=SalesUp.Llamadas.desktopMovil.replace("[TELEFONO]", SalesUp.Llamadas.numero);
				$("#contenedor").append('<a href="'+temp+'" title="llamanos con gusto te atenderemos" style="display:none" id="link_'+SalesUp.Llamadas.numero+'"></a>');
			}else{
				var temp=SalesUp.Llamadas.desktopFijo.replace("[TELEFONO]", SalesUp.Llamadas.numero);
				$("#contenedor").append('<a href="'+temp+'" title="llamanos con gusto te atenderemos" style="display:none" id="link_'+SalesUp.Llamadas.numero+'"></a>');
			}
			$("#link_"+SalesUp.Llamadas.numero)[0].click();
			SalesUp.Llamadas.terminaLlamada();
			}
	};

	this.terminaLlamada=function(){
		setTimeout(function(){
			SalesUp.Sistema.AbrePopUp({Titulo: 'Agregar seguimiento', Pagina:'/privado/popup_seguimiento.dbsp', Parametros:'tkp='+SalesUp.Llamadas.tkp+"&llamada=1", CallBack:'ReloadData', Alto:400, Ancho:605});
		},2000);	
	} ;

	this.iniciarLlamadas=function(){
		$(document).on("click","span.llamar-click",SalesUp.Llamadas.creaLlamada );
		$(document).on("click","span.llamar-clickmovile",SalesUp.Llamadas.creaLlamada );
	};
}
if (window.Llamadas){ SalesUp.Llamadas = new Llamadas(); }

SalesUp.Llamadas.iniciarLlamadas();
