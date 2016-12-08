var avisar = 0;
var TIEMPO_REVISION = 300000;
var TIEMPO_AVISO = 1800000;

SalesUp.Variables.RevisaYMuestraAlerta = function(RespuestaData){
			var PasaGetData = SalesUp.Sistema.NoEsIndex({Resp:RespuestaData});
			if(!PasaGetData){/*SalesUp.Sistema.IntentarDeNuevo();*/ return false;}
			
			var dif = RespuestaData[0].Diferencia;
			avisar = RespuestaData[0].Avisar;
			
			if ((dif<=TIEMPO_AVISO) && (avisar==1) && (dif>(TIEMPO_AVISO-TIEMPO_REVISION))){
				dif = TIEMPO_REVISION;
				SalesUp.Variables.MostrarAlertaRecordatorio();
			}else{
				if ((dif<=TIEMPO_REVISION) && (avisar==1) ){
					SalesUp.Variables.MostrarAlertaRecordatorio();
				}
			}

			if (dif > TIEMPO_REVISION){ dif = TIEMPO_REVISION; }
			if (dif == ''){dif = TIEMPO_REVISION;}			       
			if (dif <= 60000){dif = TIEMPO_REVISION;}
			setTimeout('SalesUp.Variables.RevisarAlerta()',dif);
}

SalesUp.Variables.RevisarAlerta = function(){
	var avisar = 0;
	$.ajaxSetup({ 'beforeSend' : function(xhr) { xhr.overrideMimeType('text/json; charset=iso-8859-1;'); } });
	$.ajax({ type:'POST', async:true, dataType:'json', cache: false,
		url: 'RecordatorioBuscaAlerta.dbsp',
		success : function(RespuestaData){
		  SalesUp.Variables.RevisaYMuestraAlerta(RespuestaData);
		}
	}); /* RecordatorioBuscaAlerta */
	$.ajaxSetup({ 'beforeSend' : function(xhr) { xhr.overrideMimeType('text/html; charset=iso-8859-1;'); } });
}/*SalesUp.Variables.RevisarAlerta*/

SalesUp.Variables.MostrarAlertaRecordatorio =  function(){
	$('#ModalAlertaRecordatorios').remove();
	
	var TemplateHtmlCita = '';
	TemplateHtmlCita += '<div class="BoxRecordatorio" id="Rec{{idr}}">';
		TemplateHtmlCita += '<span class="w100 TitDiv p5">';
			TemplateHtmlCita += '<span class="w50">';
			TemplateHtmlCita += '<i class="fa fa-calendar"></i>';
			TemplateHtmlCita += '<b> {{Correo}} </b>';
			TemplateHtmlCita += '</span>';
			TemplateHtmlCita += '<span class="w50 tDer Italic"><i class="fa fa-clock-o"></i> {{Hora}}<b> - </b> {{Prospecto}} </span>';
			TemplateHtmlCita += '<div class="clear"></div>';
		TemplateHtmlCita += '</span>';
		TemplateHtmlCita += '<div class="w100">';
			TemplateHtmlCita += '<div class="w100"><i class="fa fa-users"></i> {{Telefono}} </div>';
			TemplateHtmlCita += '{{#if Celular}}<div class="w100 pt10 pb10"> {{Celular}} </div>{{/if}}';
			TemplateHtmlCita += '{{#if Empresa}}<div class="w100 Ellipsis"><i class="fa fa-location-arrow"></i> {{Empresa}} </div>{{/if}}';
		TemplateHtmlCita += '</div>';
		TemplateHtmlCita += '<div class="w100">';
			TemplateHtmlCita += '<button onclick="SalesUp.Sistema.Almacenamiento({a:\'TempVistaCalendario\' , v: 1 }); document.location.href=\'/privado/calendario.dbsp\' " class="Right btnNeutral Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" type="button">';
			TemplateHtmlCita += '<i class="fa fa-calendar"></i> Ver agenda </button></div>';
		TemplateHtmlCita += '<div class="LineaSeparapor w100"></div><div class="clear"></div>';
	TemplateHtmlCita += '</div>';
	
	var TemplateHtmlRecordatorio = '';
	//TemplateHtmlRecordatorio += '<h2>Usted tiene el siguiente recordatorio:</h2>';
	TemplateHtmlRecordatorio += '<div class="BoxRecordatorio" id="Rec{{idr}}">';
	TemplateHtmlRecordatorio += '<span class="w100 TitDiv p5">';
	TemplateHtmlRecordatorio += '<p class="w80"><i class="fa fa-lg fa-bell"></i> <b>{{Recordatorio}}</b></p>';
	TemplateHtmlRecordatorio += '<p class="w20 tDer Italic"><i class="fa fa-clock-o"></i> {{Hora}}</p>';
	TemplateHtmlRecordatorio += '<div class="clear"></div>';
	TemplateHtmlRecordatorio += '</span>';
	TemplateHtmlRecordatorio += '<div class="w100">';
	TemplateHtmlRecordatorio += ' {{#if Prospecto}}<div class="w50 Ellipsis"><i class="fa fa-user"></i> <span class="Pointer Tip1" tip="Ver contacto" onclick="document.location.href=\'/privado/prospectos-visualizar.dbsp?tkp={{tkp}}&idprospecto={{idp}}\'">{{Prospecto}}</span>,</div> {{/if}} ';
	TemplateHtmlRecordatorio += ' {{#if Empresa}}<div class="w50 Ellipsis"><i class="fa fa-building-o"></i> E-{{Empresa}}</div> {{/if}} ';
	TemplateHtmlRecordatorio += '</div> ';
	TemplateHtmlRecordatorio += '<div class="w100">';
	TemplateHtmlRecordatorio += ' {{#if Correo}}<div class="w50"><i class="fa fa-envelope"></i> {{Correo}}</div>{{/if}}';
	TemplateHtmlRecordatorio += ' {{#if Telefono}}<div class="w50"><i class="fa fa-phone-square"></i> {{Telefono}}</div>{{/if}}';
	TemplateHtmlRecordatorio += ' {{#if Celular}}<div class="w50"><i class="fa fa-mobile"></i> {{Celular}}</div>{{/if}}';
	TemplateHtmlRecordatorio += '</div> ';
	TemplateHtmlRecordatorio += '{{#if Prospecto}}<div class="w100"><textarea id="Comentario-{{idr}}" class="TextArea w100 Italic" placeholder="Escriba aquí para qué habló con el prospecto y qué le comentó."></textarea></div>{{/if}}';
	TemplateHtmlRecordatorio += '<div class="w100" style="margin-top:5px;"> <div class="w15"></div>';
	TemplateHtmlRecordatorio += ' <div class="w35">';
	TemplateHtmlRecordatorio += '  <select class="w100 Select Ellipsis" id="Posponer{{idr}}">';
	TemplateHtmlRecordatorio += '   <option value="0">(... Seleccionar ...)</option>';
	TemplateHtmlRecordatorio += '   <option value="1">15 minutos</option>';
	TemplateHtmlRecordatorio += '   <option value="2">30 minutos</option>';
	TemplateHtmlRecordatorio += '   <option value="3">45 minutos</option>';
	TemplateHtmlRecordatorio += '   <option value="4">1 hora</option>';
	TemplateHtmlRecordatorio += '   <option value="5">2 horas</option>';
	TemplateHtmlRecordatorio += '   <option value="6">4 horas</option>';
	TemplateHtmlRecordatorio += '   <option value="7">6 horas</option>';
	TemplateHtmlRecordatorio += '   <option value="8">12 horas</option>';
	TemplateHtmlRecordatorio += '   <option value="9">1 día</option>';
	TemplateHtmlRecordatorio += '  </select>';
	TemplateHtmlRecordatorio += ' </div>';
	TemplateHtmlRecordatorio += ' <div class="w50 tDer">';
	TemplateHtmlRecordatorio += '  <span onclick="SalesUp.Variables.PosponerRecordatorio({Elemento: this, id:{{idr}} });" class="Pointer Btn Btn-rounded Btn-tiny Btn-flat-Aceptar">Posponer <i class="fa fa-clock-o"></i></span>';
	TemplateHtmlRecordatorio += '  <span onclick="SalesUp.Variables.MarcarComoRealizadoRecordatorio({Elemento: this, id:{{idr}} });" class="Pointer Btn Btn-rounded Btn-tiny Btn-flat-Aceptar btnAccion">Realizado <i class="fa fa-check"></i></span>';
	TemplateHtmlRecordatorio += ' </div>';
	TemplateHtmlRecordatorio += '</div>';
	TemplateHtmlRecordatorio += '<div class="LineaSeparapor w100"></div><div class="clear"></div>';
	TemplateHtmlRecordatorio += '</div>';

	var HtmlRecordatorio = '';
	//<span class="Pointer Tip1" tip="Ver contacto" onclick="document.location.href=\'/privado/prospectos-visualizar.dbsp?tkp='+tksprospectos[i]+'&idprospecto='+IdProspectos[i]+'\'">'+linkProspectos[i]+'</span>, ';
	$.ajaxSetup({ 'beforeSend' : function(xhr) { xhr.overrideMimeType('text/json; charset=iso-8859-1;'); } });
	$.ajax({ type:'POST', async:false, dataType:'json', cache: false,
		url: '/privado/Modelo/jsonMostrarRecordatorios.dbsp',
		success : function(json){
			var PasaGetData = SalesUp.Sistema.NoEsIndex({Resp:json});
			if(!PasaGetData){/*SalesUp.Sistema.IntentarDeNuevo();*/ return false;}

			var json = json.jsonDatos;
			if(!_.size(json[0])){return false;}
			
			var nRecordatorios = _.size(json);
			$.each(json, function(i,v){
				var Template_Evento = TemplateHtmlRecordatorio;
				if (v.tipo==2) {
					Template_Evento = TemplateHtmlCita;
				};
				HtmlRecordatorio += SalesUp.Construye.ReemplazaDatos({
					Template: Template_Evento, Datos: v
				});
			});
			var TituloRecordatorios = 'Tienes un pendiente';
			(nRecordatorios>1) ? TituloRecordatorios = 'Tienes <span id="HayRecordatorios">'+nRecordatorios+' pendientes</span>' : '';

			SalesUp.Construye.MuestraAlerta({
				TipoAlerta:'AlertaModal', Ancho:'450px', Id:'ModalAlertaRecordatorios',
				Alerta: HtmlRecordatorio, Titulo: '<i class="fa  fa-bell"></i> ¡Atención! - '+TituloRecordatorios,
				BotonOk:'Cerrar', IconoOk:'<i class="fa fa-times"></i>',
		    	IdBoton1:'BtnCerrarRecordatorio'
		    });

		    setTimeout(function(){
		     $('#BtnCerrarRecordatorio').addClass('btnNegativo');
		     $('#ModalAlertaRecordatorios').find('.BodyModal').css('max-height','580px');
		 	}, 500);
		}
	});
	$.ajaxSetup({ 'beforeSend' : function(xhr) { xhr.overrideMimeType('text/html; charset=iso-8859-1;'); } });
}/*SalesUp.Variables.MostrarAlertaRecordatorio*/

SalesUp.Variables.PosponerRecordatorio = function(Op){
	var Id = Op.id;
	var $Elemento = $(Op.Elemento);
	var Posponer = $('#Posponer'+Id).val();
	if(Posponer==0){return false;}
	
	var $textarea = $('#Comentario-'+Id);
	var Comentario = (_.size($textarea)) ? escape( $textarea.val() ) : '';

	$Elemento.html('Guardando <i class="fa fa-spin fa-spinner"></i>');
	setTimeout(function(){
		SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryPosponerRecordatorio.dbsp', Parametros:'idr='+Id+'&Posponer='+Posponer+'&com='+Comentario });
		SalesUp.Variables.CerrarRecordatorio({id:Id});
	}, 100);
}

SalesUp.Variables.MarcarComoRealizadoRecordatorio = function(Op){
	var Id = Op.id;
	var $Elemento = $(Op.Elemento);
	var $textarea = $('#Comentario-'+Id);
	var Comentario = '';
	(_.size($('#Comentario-'+Id))) ? Comentario = escape( $textarea.val() ) : '';
	
	$Elemento.html('Guardando <i class="fa fa-spin fa-spinner"></i>');
	setTimeout(function(){
		SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryRealizarRecordatorio.dbsp', Parametros:'idr='+Id+'&com='+Comentario });
		SalesUp.Variables.CerrarRecordatorio({id:Id});		
	}, 100);
}

SalesUp.Variables.CerrarRecordatorio = function(Op){
	var Id = Op.id;
	$('#Rec'+Id).slideUp(500);
	setTimeout(function() {
		$('#Rec'+Id).remove();
		var Hay = _.size($('.BoxRecordatorio'));
		var Quedan = 'un recordatorio';
		(Hay>1) ? Quedan = Hay+' rescordatorios':'';
		$('#HayRecordatorios').html(Quedan);
		if(Hay==0){ $('#BtnCerrarRecordatorio').click(); }
	}, 600);
}


