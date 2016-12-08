var Notifiacaciones = function(){
	var favicon = new Favico({ type : 'rectangle', animation: 'slide' });
	var stack_bar_top = 	{"dir1": "down",  "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0};
	var stack_topleft = 	{"dir1": "down",  "dir2": "right", "push": "top"};
	var stack_bottomleft =  {"dir1": "right", "dir2": "up",    "push": "top"};
	var stack_custom = 		{"dir1": "right", "dir2": "down"};
	var stack_custom2 = 	{"dir1": "left",  "dir2": "up",    "push": "top"};
	var stack_bar_bottom =  {"dir1": "up",    "dir2": "right", "spacing1": 0, "spacing2": 0};
	
	var SalirSistema = function(j){
		var reiniciarSesion = j.reiniciarSesion;
		if (reiniciarSesion==1){
			$('#reiniciarSistema').remove();
			var mensajeReiniciar = '<br><h2 class="Rojo"><i class="fa fa-warning fa-lg"></i> Atención</h2><br> ';
			    mensajeReiniciar += 'Para continuar trabajando vuelva a iniciar sessión.<br><br>';
			SalesUp.Construye.MuestraAlerta({
				TipoAlerta:'AlertaPregunta', Ancho:'60%', 
				Id:'reiniciarSistema',
				Alerta: mensajeReiniciar
			});

			setTimeout(function(){
				var btnReiniciar = '<a href="/privado/exit.dbsp" class="btnAccion Pointer Btn Btn-rounded Btn-flat-Aceptar Btn-block"><i class="fa fa-lg fa-power-off "></i> Salir</a>';
				$('#reiniciarSistema').find('.PieModal').html(btnReiniciar);
			},500);
		}
	}

	var guardarTemplate = function(Op,err){
		SalesUp.Variables.TemplateAlertaNav = Op;
	}
	
	SalesUp.Sistema.CargaDatosAsync({ link:'/privado/Vista/TemplateAlertaNavegador.dbsp', dataType:'html', almacen: 'HtmlAlertaNavegadorNuevo', callback:guardarTemplate });

	this.Push = function(Op){
		
		var token = 'token-'+Op.Id;
		if(!Op){ console.warn('Se necesitan parametros'); return false; }
		if(!_.isObject(Op)){ console.warn('No es un objeto'); return false; }
		if(!Op.Mensaje){return false;} 

		var Tipo = false, Icono = false, TamIcono = 'fa fa-3x ', Titulo = false, Mensaje = false, Normal = '';
		var Id = '0'; 
		(Op.Id) ? Id = Op.Id: '';

		(Op.Normal) ? Normal = ' Normal' : '';
		(Op.Tipo) ? Tipo = Op.Tipo: '';
		(Op.Mensaje) ? Mensaje = Op.Mensaje : '';

		if(Op.Icono){
			Icono = TamIcono + Op.Icono
		}else{
			Normal += ' SinIcono';
		}
		
		if(Op.Titulo){ 
			Titulo = Op.Titulo
		}else{
			Icono = SalesUp.Sistema.StrReplace('3x','lg',Icono);	
			Normal += ' IconoPeque';
		}

		var IdUnico = SalesUp.Construye.IdUnico();
		var OpcionesNotify = {}, clickCerrar = '';

		if(Op.NoCerrar=='1'){
			Tipo = 'info';
			Normal = SalesUp.Sistema.StrReplace('Normal','',Normal);
			clickCerrar = 'onclick="SalesUp.Notificaciones.VerNotificacion({Visto:1, Elemento:this, Id:'+Id+'})" style="display:block!important;"';
			OpcionesNotify = {
				hide:false, shadow:false, buttons:{closer: false, sticker: false },
				styling: 'fontawesome', animation: 'slide', 
				addclass: IdUnico+' Notificacion' + Normal+ ' '+token,
				type: Tipo, icon: Icono, title: Titulo, text: Mensaje
			}
		}else{
			OpcionesNotify = {
				delay:10000, shadow: false, buttons:{closer: false, sticker: false },
				styling: 'fontawesome', animation: 'slide', 
				addclass: IdUnico+' Notificacion' + Normal,
				type: Tipo, icon: Icono, title: Titulo, text: Mensaje
			}
		}

		if(_.size( $('.'+token) ) > 0 ){return false;}

		var notice = new PNotify(OpcionesNotify);
		
		var $Push = $('.'+IdUnico);
		$Push.children('.ui-pnotify-container').attr('onclick','SalesUp.Notificaciones.VerNotificacion({Elemento:this, Id:'+Id+'})');
		$Push.prepend('<div class="CerrarPush" '+clickCerrar+'><i class="fa fa-times fa-lg"></i></div>');

		notice.get().click(function(e){ notice.remove(); });
		
	}/*Push*/

	this.PushTopBar = function(){
		new PNotify({
			title: 'Tarea nueva',
			text: 'Push activados... ^_^',
			type: 'info',
			styling: 'fontawesome',
			icon: 'fa fa-3x fa-envelope-o',
			shadow: false,
			animation: 'slide',
			delay:5000,
			addclass: 'Notificacion stack-bar-top',
			cornerclass: "",
			width: "100%",
			stack: stack_bar_top,
			buttons:{closer: true, sticker: false }
			/*hide: false,opacity: 0.9,*/
		});
	}

	this.EliminaAlerta = function (Op){
		var idAlerta = Op.Id;
		var $objeto = $(Op.elem);
		if ($objeto) $objeto.parent().parent().remove();
		var Link = SalesUp.Sistema.CargaDatos({Link:'/privado/ajax/eliminarAlerta.dbsp', Parametros:'IdUsuarioAlerta='+idAlerta, DataType:'json'}).jsonDatos[0].Link;

		var j = SalesUp.Sistema.Almacenamiento({a:'jsonAlertas'});
		if(!j){return;};
		if ((j.notificaciones)  && (j.notificaciones>0))
			j.notificaciones = j.notificaciones - 1;
		var notificaciones = j.notificaciones;

		var total = 0;
		total += j.metasAlcanzadas;
		total += j.metasNoAlcanzadas;
		total += j.noLeidos;
		total += j.notificaciones;

		favicon.reset();
		favicon.badge(masDeCien(total));
		
		var $vistas = $('#Nvistas');
		var $ltNotificaciones = $("#NotificacionesNoVistas");

		$vistas.html('');

		if(notificaciones==0){
			$ltNotificaciones.html('<li><a href="#"><i class="fa fa-lg fa-info-circle"></i> No hay notificaciones recientes</a></li>');
		}else{
			$vistas.html(masDeCien(notificaciones));
		}

		SalesUp.Sistema.Almacenamiento({a:'jsonAlertas', v:j});

		return Link;
    	}

	this.VerNotificacion = function(Op){
		link = SalesUp.Notificaciones.EliminaAlerta({Id:Op.Id});
		if(Op.Visto){return false;}
		document.location = link;
	}
	
	var masDeCien = function(n){
		if(n>=100){ return '99+';}
		return n;
	}

	var totalNotificaciones = function(j){
		favicon.reset();
		var total = 0;
			total += j.metasAlcanzadas;
			total += j.metasNoAlcanzadas;
			total += j.noLeidos;
			total += j.notificaciones;
		SalesUp.Variables.totalNotificacionesSucesos = j.notificaciones;
		favicon.badge(masDeCien(total));
	}

	var proximoEvento = function(j){
		var aviso = 0;
		aviso += j.recordatorio;
		if (aviso != 0) {
			SalesUp.Variables.MostrarAlertaRecordatorio();
		}
	}

	this.activaNotificacionesSucesos = function(){
		
		var j = SalesUp.Sistema.Almacenamiento({a:'jsonAlertas'});
		if(!j){return;};

		var notificaciones = j.notificaciones;
		if(!notificaciones){return;}

		var $ltNotificaciones = $("#NotificacionesNoVistas");

		var procesado = $ltNotificaciones.attr('data-procesado');
		procesado = (procesado) ? procesado : 0;
		procesado = parseInt(procesado);
		if(procesado==1){return;}
		$ltNotificaciones.html('<li class="tCen"><a style="font-size:10px;" href="/privado/notificaciones.dbsp"><i class="fa fa-spin fa-spinner"></i> Un momento por favor...</a></li>');

		var cbNotificaciones = function(Op,err){
			var jNotificaciones = Op;
			var htmlProcesado = SalesUp.Construye.ReemplazaDatos({Template:SalesUp.Variables.TemplateAlertaNav, Datos:jNotificaciones});
			$ltNotificaciones.html(htmlProcesado);
			$ltNotificaciones.attr('data-procesado','1');
			SalesUp.Sistema.Puntos90();

			if(notificaciones>=2){
				$ltNotificaciones.append('<li class="tCen"><a style="font-size:10px;" href="/privado/notificaciones.dbsp">Ver todas <i class="fa fa-angle-double-right"></i></a></li>');
			}
			
			$(".TimeAgoAlerta").timeago();
			$(".TimeAgoAlerta").removeAttr('title');
			SalesUp.Sistema.Tipsy();
		}

		
		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonNotificacionesLista.dbsp', callback:cbNotificaciones});
	}

	var notificacionesSucesos = function(j){
		var notificaciones = j.notificaciones;
		var $vistas = $('#Nvistas');
		var $ltNotificaciones = $("#NotificacionesNoVistas");

		$vistas.html('');
		if(notificaciones){$vistas.html(masDeCien(notificaciones));}
		$ltNotificaciones.attr('data-procesado','0');
	}

	var muestraPush = function (j, t){
		var tEmpera = t * 800;
		setTimeout(function(){ SalesUp.Notificaciones.Push(j); }, tEmpera);
	}

	var ActivaPush = function(j){
		var nPush = j.notificacionesPush;
		if(!nPush){return;}
		
		var callbackPush = function (Op, err){
			var jsonPush = Op.jsonDatos;
			var nPush = _.size(jsonPush);
			for (var np = 0; np < nPush; np++) {
				muestraPush(jsonPush[np], np);
			}
		}

		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonNotificacionesPush.dbsp', callback:callbackPush});
	}/*ActivaPush*/

	this.evalAutorizacionesPendientes = function(){
		var j = SalesUp.Sistema.Almacenamiento({a:'jsonAlertas'});
		if(!j){ return;};
		var hayAutorizacion = j.autPendientes;
		var $ModalAlertaAutorizacion = $('#ModalAlertaAutorizacion');
		var autorizacion = _.size($ModalAlertaAutorizacion);
		var json = SalesUp.Sistema.Almacenamiento({a:'jsonAlertas'});
		var nAnt = _.size($ModalAlertaAutorizacion.find('.ltCliente'));
		if(hayAutorizacion > 0){
			if (autorizacion == 0 ) {
				autorizacionesPendientes();
			}else if(nAnt < json.autPendientes){
				$ModalAlertaAutorizacion.remove();
				autorizacionesPendientes();
			}
		}
	}/*evalAutorizacionesPendientes*/

	this.revisaAlertasLocal = function(){
		
		var lastTimeRefresh = parseInt(localStorage['sysRevisaAlertas']||'0', 10);
		var diferenciaTiempo = new Date().getTime() - lastTimeRefresh;
		var esperaTiempo = 5*60*1000;
		if ( diferenciaTiempo >= esperaTiempo) { 
			SalesUp.Notificaciones.RevisaAlertas();
		}
	}

	this.NotificacionesTickesRespuestas = function(){
		var j = SalesUp.Sistema.Almacenamiento({a:'jsonAlertas'});
		if(!j){return;};
		j.Tickets_Alertas = parseInt(j.Tickets_Alertas)-1;
		SalesUp.Sistema.Almacenamiento({a:'jsonAlertas',v:j});
		$('#TickesRespondidos, .num-examens-noti').html(j.Tickets_Alertas);
		if(parseInt(j.Tickets_Alertas ) > 0){
			$('#TickesRespondidos, .num-examens-noti').show();
		}else{
		  	$('#TickesRespondidos, .num-examens-noti').hide();
		}
	}

	this.activaNoficaciones = function(){
		var j = SalesUp.Sistema.Almacenamiento({a:'jsonAlertas'});
		if(!j){SalesUp.Notificaciones.RevisaAlertas(); return;};
		if(j.autPendientes > 0){
			$('#autorizarProspectos').removeAttr('style');
			$('#autorizarProspectos>span').html(j.autPendientes);
		}else{
			$('#autorizarProspectos').hide();
		}
		SalirSistema(j);
		totalNotificaciones(j);
		notificacionesSucesos(j);
		ActivaPush(j);
		SalesUp.Notificaciones.MuestraAlertasInbox(j);
		SalesUp.Notificaciones.MuestraAlertasMetas(j);
		proximoEvento(j);
		SalesUp.Notificaciones.evalAutorizacionesPendientes();

		SalesUp.Notificaciones.MuestraAlertaTickets(j);
		
		$('#TickesRespondidos, .num-examens-noti').html(j.Tickets_Alertas);
		if(parseInt(j.Tickets_Alertas ) > 0){
			$('#TickesRespondidos, .num-examens-noti').show();
		}else{
		  	$('#TickesRespondidos, .num-examens-noti').hide();
		}
	
		/*
		if(j.fuerzaPsw < 3){
			SalesUp.Sistema.MuestraCambiaPassword();
		}
		*/
	}

	this.RevisaAlertas = function(){
		var evaluaAlertas = function(Op,err){
			if(err){ return; }

			var tiempo = new Date().getTime();
			var jsonAlertas = Op;//.jsonDatos[0];
			if ((Op) && (Op.Leido_Tickets_Alertas)){
				jsonAlertas.Leido_Tickets_Alertas = 1;
				SalesUp.Sistema.Almacenamiento({a:'jsonAlertas', v:jsonAlertas});

				SalesUp.Notificaciones.activaNoficaciones();

			}
			localStorage['sysRevisaAlertas'] = tiempo;

		}/*evaluaAlertas*/
		
		var tku = SalesUp.Sistema.obtieneTku();

		var idPediticion = 't='+SalesUp.Construye.IdUnico();
		//SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonAlertas.dbsp', parametros:idPediticion, callback:evaluaAlertas});
		SalesUp.Sistema.CargaDatosAsync({link:'https://alertas.salesup.com/?token='+tku, parametros:idPediticion, callback:evaluaAlertas});
		
	}/*RevisaAlertas*/

	this.MuestraAlertasInbox = function(json){
		
		var activo = SalesUp.Sistema.EstaActivoModulo({Modulo:11});
		
		if (!activo){return;}

		var SysInboxActivo = SalesUp.Sistema.Almacenamiento({a:'SysInboxActivo'});
		var SysInboxStatus = SalesUp.Sistema.Almacenamiento({a:'SysInboxStatus'});

		if((SysInboxActivo>0)&&(SysInboxStatus>0)){
			var jInbox = json, noLeidos = jInbox.noLeidos, idTabInbox = jInbox.idTabInbox;
			jInbox.masDeCien = masDeCien(jInbox.noLeidos);
			jInbox.masDeCien = jInbox.noLeidos;
			var template = '<a href="#" onmousedown="SalesUp.Notificaciones.verInbox({idTabInbox:{{idTabInbox}},Orden:{{orden}},t:this});" class="Pointer"><span class="notiNoLeido">{{masDeCien}}</span><i class="fa fa-lg fa-inbox"></i></a>';
			
			if (noLeidos){
				
				var arrInboxNuevo = $('.InboxNuevo');
				var to = 0;
				for(var x = 0; x<_.size(arrInboxNuevo);x++){
				  var n = $(arrInboxNuevo[x]).html();
				  n = (n) ? parseInt(n) : 0;
				  to+=n;
				}
				var sinLeer = to;

				if(sinLeer>0){
					if (noLeidos>sinLeer){
						var path = document.location.pathname.toLowerCase();
						if (path.indexOf('inbox.dbsp')!=-1){
							var $tabActual = $('.ui-tabs-panel:visible');
							var visible = $tabActual.find('.LtCorreos').is(':visible');
							if(visible){
								SalesUp.Inbox.autoActualizarInbox();
							}
						}
					}
				}

				template = SalesUp.Construye.ReemplazaDatos({Template:template, Datos:jInbox});
				SalesUp.Variables.templateNotInbox = template;
				
				$('#notificacionInbox').css('display','inline-block').html(template);

			}/*noLeidos*/
		}/*sysInboxactivo*/
		
	}/*MuestraAlertasInbox*/ 

	this.verInbox = function(Op){
		var $t = $(Op.t), idTabInbox = Op.idTabInbox, Orden = Op.Orden, str;
		str = {idTabInbox:idTabInbox, Orden:Orden};
		var strJson = JSON.stringify(str);
		str = '/privado/Inbox.dbsp';
		if (idTabInbox){
			str += '?q='+SalesUp.Sistema.Encript({cadena:strJson});
		}
		
		$t.attr('href',str);
	}/*verInbox*/

	this.MuestraAlertasMetas = function(json){
		var alcanzadas = json.metasAlcanzadas, noAlcanzadas = json.metasNoAlcanzadas, tMetas = alcanzadas + noAlcanzadas;
		
		if(tMetas){
			if( (alcanzadas) && (!noAlcanzadas) ){
				$('#NvistasMetas').html(alcanzadas);
			}else if( (!alcanzadas) && (noAlcanzadas) ){
				$('#NvistasMetasNo').html(noAlcanzadas);
			}else{
				$('#NvistasMetasNo').html(tMetas);
		 	}
		}else{
			$('#NvistasMetas, #NvistasMetasNo').html('');
		}
	}/*MuestraAlertasMetas*/

	this.MuestraAlertaTickets = function (json){
		j = json;

		var ticketHora = SalesUp.Sistema.Almacenamiento({a:'SysticketHora'});
		ticketHora = (ticketHora) ? parseInt(ticketHora) : 0;
		(ticketHora == 13) ? ticketHora = 0 : '';
		
		if(parseInt(j.Tickets_Alertas)>0 && parseInt(j.Leido_Tickets_Alertas) > 0 && $('#popUpTicketAbierto').length == 0 && ticketHora == 0){
			SalesUp.Sistema.cargaVentanaTickets();
			setTimeout(function(){
				$('#popUpTicketAbierto').css('z-index',100)
				$('#popUpTicketAbierto .BodyModal').css('padding','10px 10px 0px')
			},1000)
			j.Leido_Tickets_Alertas = parseInt(j.Leido_Tickets_Alertas) - 1;
			SalesUp.Sistema.Almacenamiento({a:'jsonAlertas', v:j});
		}

		ticketHora += 1;
		SalesUp.Sistema.Almacenamiento({a:'SysticketHora', v:ticketHora});
		
	}/*MuestraAlertaTickets*/

	var autorizacionesPendientes = function(){
	  var preparaJsonAutorizarProspecto = function(Op,err){

	    var templateAutProsp = '';

	    templateAutProsp += '{{#each ltEmpresas}}'; 
	      templateAutProsp += '<div class="BoxRecordatorio" id="{{tku}}-{{tkCom}}">';
	      templateAutProsp += '<span class="w100"><b>{{ejecutivo}}</b> está solicitando permiso para agregar un prospecto a la empresa <b>{{empresa}}</b></span>';
	      templateAutProsp += '<div class="clear"></div> <br>';
	      templateAutProsp += '<table class="simple">';
	      templateAutProsp += '<thead><tr>';
	      templateAutProsp += '<th class="tIzq"><span>Contacto</span></th><th style="width: 42px;"></th>';
	      templateAutProsp += '</tr></thead><tbody>';
	      templateAutProsp += '  {{hlp_tProspectos}}';
	      /*templateAutProsp += '  {{/hlp_tProspectos}}';*/
	      templateAutProsp += '</tbody></table>';
	      templateAutProsp += '<br><label class="Pointer Italic"><input id="Compartir{{tkCom}}" type="checkBox"> Compartir mis contactos de esta empresa</label>';
	      templateAutProsp += '<div class="LineaSeparapor w100"></div>';
	      templateAutProsp += '<div class="clear"></div></div>';
	    templateAutProsp += '{{/each}}';


	    var jsonAvisos = Op.jsonDatos;
	    jsonAvisos = _.reject(jsonAvisos,function(j){
	    	return _.size(j)==0;
	    });
	   
	    if ( _.size(jsonAvisos) == 0) {
	    	$('#autorizarProspectos').hide();
	    	return false;
	    }
	    var jAutorizacion = _.groupBy(jsonAvisos,function(value){
	      return value.TKU + '#' + value.TKCOM; 
	    });
	    var nAut = _.size(jsonAvisos);
	    var jData = _.map(jAutorizacion, function(group){ 
	      var p = _.pluck(group, 'PROSPECTO');
	      var ltProspectos = JSON.stringify(p);
	      return { 
	        EMPRESA:group[0].EMPRESA, 
	        FASE: _.pluck(group, 'FASE'), 
	        PROSPECTO: _.pluck(_.sortBy(group,'PROSPECTO'), 'PROSPECTO'), 
	        TKCOM: group[0].TKCOM, 
	        TKP: _.pluck(group, 'TKP'), 
	        TKU: group[0].TKU, USUARIO: group[0].USUARIO 
	      }; 
	    });
	     jData = _.sortBy(jData, 'EMPRESA');
	    var hayAutorizacion = _.size(jData);
	    var jEmpresasAutorizacion;
	    var ltEmpresas = [];
	    if(hayAutorizacion){
	       jEmpresasAutorizacion =_.uniq(jData, function(i,k,Prospecto){
	         return i.PROSPECTO;
	       });
	      var tamanio = _.size(jEmpresasAutorizacion);
	      for(var je=0; je < tamanio; je++){
	        var ja = jEmpresasAutorizacion[je];
	        var arrEmpresa = {};
	        arrEmpresa.empresa = ja.EMPRESA;
	        arrEmpresa.tkCom = ja.TKCOM;
	        arrEmpresa.ejecutivo = ja.USUARIO;
	        arrEmpresa.prospecto = ja.PROSPECTO;
	        arrEmpresa.tkp = ja.TKP; 
	        arrEmpresa.fase = ja.FASE;
	        arrEmpresa.tku = ja.TKU;
	        ltEmpresas.push(arrEmpresa);
	      }
	    }
	    var Template = SalesUp.Construye.ReemplazaDatos({
	      Template: templateAutProsp, Datos: {ltEmpresas:ltEmpresas}
	    });

	    var TituloAutorizacion = 'Tienes una autorización pendiente';
	    (nAut > 1) ? TituloAutorizacion = 'Tienes <span id="HayAutorizacion">'+nAut+' autorizaciones pendientes</span>' : '';

	    SalesUp.Construye.MuestraAlerta({
	      TipoAlerta:'AlertaModal',Ancho:'500px',Id:'ModalAlertaAutorizacion',
	        Alerta: Template, Titulo: '¡Atención! - '+TituloAutorizacion,
	        BotonOk:'Cerrar', IconoOk:'<i class="fa fa-times"></i>',
	          IdBoton1:'BtnCerrarRecordatorio'
	    });
	    $('#ModalAlertaAutorizacion .BodyModal.BoxSizing').attr('style','max-height:350px;');
	    setTimeout(function() {SalesUp.Sistema.Tipsy();}, 100);
	  }/*preparaJsonAutorizarProspecto*/

	  SalesUp.Sistema.CargaDatosAsync({
	    link:'/privado/Modelo/jsonRecordatorioProspectosEmpresaAutorizar.dbsp',
	    callback:preparaJsonAutorizarProspecto
	  });
	}/*Muestra Alerta Prospectos Autorizar*/

	/*Acciones Prospectos Autorizar*/
	this.muestraPopOver = function(t){
	    var $t =  $(t.Elemento);
	    var tkp = $t.attr('data-tkp');
	    var tkcom = $t.attr('data-tkcom');
	    var tku = $t.attr('data-tku');
	    var placeto = (t.place) ? t.place: 'left';
	    var reload = t.reload;
	    $t = (t.mostrar) ? $(t.mostrar) : $(t.Elemento);
	    $t.popover('destroy');
	     
	    if (reload == 2) {
	    	var  paramsString = "?tkp="+tkp+"&tkcom="+tkcom+"&tku="+tku+"&reload="+reload;
	    	SalesUp.Construye.MuestraPopUp({alto:'175px', ancho:'600px', centrado:false, id:'popupRechazarContacto',titulo:'Rechazar contacto', fuente:'/privado/popup_rechazar_prospecto-cliente.dbsp'+paramsString});
	    }
	    else{
	    var PopOverId = 'PopOver'+SalesUp.Construye.IdUnico();

	    var TemplatePopOver = '<div style="max-width:300px;width:300px;" class="popover" id="'+PopOverId+'" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>';

	    var razon = '<div id="BoxComentar" class="w100">';
	      razon += '<textarea id="RazonRechazo" class="w100 TextArea" style="border:1px solid #ddd; border-radius: 3px; padding: 5px;"></textarea> ';
	      razon += '<div class="clear"></div>';
	    razon += '<span style="margin-bottom: 8px; margin-top: 10px;" class="btn Acciones btn-default FondoLabela80" onclick="SalesUp.Notificaciones.rechazarProspecto({th:this,tkp:\''+tkp+'\',tkcom:\''+tkcom+'\',tku:\''+tku+'\',reload:'+reload+'})"><i class="fa fa-check"></i> Aceptar</span>';
	      razon += '<span style="margin-bottom: 8px; margin-top: 10px;" class="btnNegativo btn Acciones btn-default Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Cancelar" onclick="$(\'.popover\').remove();">Cancelar</span>';
	    razon += '</div>';

	    $t.popover({
	      template:TemplatePopOver, placement:placeto, html:true, container: 'body',
	      title: 'Razón del rechazo', content: razon
	    });

	    $t.popover('show');
	    setTimeout(function(){ $('#RazonRechazo').focus(); }, 300);
	    }
	  }

	  this.rechazarProspecto = function(t){
	     var tkp = t.tkp;
	     var tkcom = t.tkcom;
	     var tku = t.tku;
	     var reload = t.reload;
	     var Comentario = $('#RazonRechazo').val();
	     var $th = $(t.th);
	     var t = t.t;
	     if(!Comentario){
	        var $TextComentario = $('#RazonRechazo');
	        SalesUp.Valida.MarcarObligatorio($TextComentario);
	        $TextComentario.focus();
	        SalesUp.Construye.MuestraMsj({tMsg:4,Msg:'Especifique una razón',Destino:'.PieModal'});
	        return false;
	     }
	    $th.find('i').removeClass('fa-check').addClass('fa-spinner fa-spin');
	     $th.removeAttr('onclick');
	    SalesUp.Notificaciones.actualizaProspecto({tkp:tkp,cmt:Comentario,tkcom:tkcom,tku:tku,reload:reload,t:t});
	    
	    
	  }

	  this.AutorizarProspecto = function(Op){
	    var $t = $(Op.Elemento);
	    $t.find('i').removeClass('fa-check').addClass('fa-spinner fa-spin');
	    $t.removeAttr('onclick');
	    var tkp = $t.attr('data-tkp');
	    var tkcom = $t.attr('data-tkcom');
	    var tku = $t.attr('data-tku');
        var reload = Op.reload;
        SalesUp.Notificaciones.actualizaProspecto({tkp:tkp,tkcom:tkcom,tku:tku,reload:reload});
	 }

	  this.actualizaProspecto = function(Op){
	    var tkp = Op.tkp;
	    var Comentario = Op.cmt;
	    var tkcom = Op.tkcom;
	    var tku = Op.tku;
	    var reload = Op.reload;
	    var aprobacionEstado = 0;
	    var jsonDetalles ={};
	    var compartir = 0;
	    var msg = 'Contacto autorizado';
	    jsonDetalles.usuario = "[tku]";

	    if($('#Compartir'+tkcom).is(':checked')){
	      compartir = 1;
	    }

	    if(Comentario){
	      jsonDetalles.comentario = Comentario;
	      aprobacionEstado = 2;
	      msg = 'Contacto rechazado';
	    }
	    var testo = Op.t;
	    var strJsonDetalles = JSON.stringify(jsonDetalles);
	    strJsonDetalles = encodeURIComponent(strJsonDetalles);
	    parametros = 'tkp='+tkp+'&detalles='+strJsonDetalles+'&aprobacionEstado='+aprobacionEstado+'&compartir='+compartir+'&tkuCompartir='+tku+'&tkcom='+tkcom;

	    var procesaAutorizacion = function(Op, err){
	    	var destino = '.PieModal';
	    	if(reload){destino ='Body'};
    		if (err) {
            if (reload > 0) {
                SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-times"></i> Hubo un error intentelo nuevamente'});
            }else{
                SalesUp.Construye.MuestraMsj({tMsg:4,Msg:'Hubo un error intentelo nuevamente',Destino:destino}); 
            }

    			return false;
    		}
    		var j = SalesUp.Sistema.Almacenamiento({a:'jsonAlertas'});
    		if(!j){return;};
    		if ((j.autPendientes)  && (j.autPendientes>0))
				j.autPendientes = j.autPendientes - 1;
			SalesUp.Sistema.Almacenamiento({a:'jsonAlertas', v:j});
			if (j.autPendientes == 0) {
				$('#autorizarProspectos').hide();
			}else{$('#autorizarProspectos>span').html(j.autPendientes)};
			
    		if(reload == 1){
	    		SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-check"></i> '+msg});
	    		if (ReloadData) {ReloadData()};
	    	}else if(reload == 2){
	    		SalesUp.Construye.CierraPopUp({t:testo});
                SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-check"></i> '+msg});
	    		setTimeout(function(){location.reload()},500)
	    	}else{
	    		SalesUp.Construye.MuestraMsj({tMsg:2,Msg:msg,Destino:destino});
	    		SalesUp.Notificaciones.cerrarAutorizacion({tkp:tkp,tku:tku,tkcom:tkcom});
	    	}
	    	$('.popover').remove();
	   	}

	    SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/qryAutorizaProspectosEmpresa.dbsp', dataType:'html', parametros:parametros, callback:procesaAutorizacion });
	  }

	  

	  this.cerrarAutorizacion = function(Op){
	    var tkp = Op.tkp;
	    var tku = Op.tku;
	    var tkcom = Op.tkcom;
	    $('#'+tkp).slideUp(500);
	    setTimeout(function(){
	      $('#'+tkp).remove();
	      var existenTabla = _.size($('#'+tku+'-'+tkcom+'>table .ltCliente'));
	      if (existenTabla == 0){
	      	$('#'+tku+'-'+tkcom).slideUp(500);
          	setTimeout(function(){$('#'+tku+'-'+tkcom).remove();},510);
          }
	      var existe = _.size($('.ltCliente'));
	      var queda = 'una autorización';
	      if(existe>1){queda = existe + ' autorizaciones';}
		  
	      $('#HayAutorizacion').html(queda);
	      if(existe == 0){
	      
	      	$('#BtnCerrarRecordatorio').click();
	      }
	    },600);
	  }
	/*Acciones Prospectos Autorizar*/

}/*Notifiacaciones*/


/*
var n = [];

n.push({Titulo:'Titulo 1', Mensaje:'ok 1', Icono:'fa-user', Normal:true });
n.push({Titulo:'Titulo 2', Mensaje:'ok 2', Icono:'fa-user', Tipo:'info'});
n.push({Titulo:'Titulo 3', Mensaje:'ok 3', Icono:'fa-user', Tipo:'error'});

SalesUp.Notificaciones.ActivaPush({Datos:n});
*/




