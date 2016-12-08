
var myInbox = function(){

	var sinResultadosBusqueda = '<span class="BoxMsg MsgMal" style="display:block;"><i class="fa fa-times-circle"></i> No hay ningún correo que coincida con tu búsqueda.</span>';
	

	var CargandoCorreos  = '';
		CargandoCorreos += '<div class="CargandoCorreos w100 tCen mt30">';
		CargandoCorreos += '<i class="fa fa-2x fa-spinner fa-spin"></i>';
		CargandoCorreos += '<span style="display:block" class="mt10 Italic">Cargando correos.</span>';
		CargandoCorreos += '</div>';

	var SincronizandoCorreos  = '';
		SincronizandoCorreos += '<div class="SincronizandoCorreos CargandoCorreos w100 tCen mt30">';
		SincronizandoCorreos += '<i class="fa fa-2x fa-spinner fa-spin"></i>';
		SincronizandoCorreos += '<span style="display:block" class="mt10 Italic">Sincronizando con servidor de correo.</span>';
		SincronizandoCorreos += '</div>';
	
	var cargandoMasCorreos = '<div class="CargandoCorreos w100 tCen"><i class="fa fa-lg fa-spinner fa-spin"></i><span class="Italic" style=""> Cargando...</span></div>';
	
	var cargandoMasCorreosServidor = '<div class="CargandoCorreos w100 tCen"><i class="fa fa-lg fa-spinner fa-spin"></i><span class="Italic" style=""> Conectando con servidor de correos...</span></div>';
	
	var li  = '';
		li += '{{#each jsonDatos}}';
		li += '<li id="TabInbox-{{idTabInbox}}" data-start="1" data-howmany="100">';
		li += '	<a data-idTabInbox="{{idTabInbox}}" onclick="SalesUp.Inbox.obtieneInbox({idTabInbox:{{idTabInbox}}, t:this});" ondblclick="SalesUp.Inbox.editarTab({idTabInbox:{{idTabInbox}}, t:this});" href="#Inbox-{{idTabInbox}}">';
		li += '		<i class="fa fa-lg {{Icono}}"></i> {{Tab}} ';
		li += '		{{#if pEliminar}} <span onclick="SalesUp.Inbox.eliminarTab({idTabInbox:{{idTabInbox}}, t:this});" tip="Eliminar pestaña" class="Tip2 eliminarTab"><i class="fa fa-times"></i></span>{{/if}}';
		li += '		{{#if noLeidos}}<span class="InboxNuevo">{{noLeidos}}</span>{{/if}}';
		li += '	</a>';
		li += '</li>{{/each}}';

	var tab  = '';
		tab += '<ul>';
		tab += li;
		tab += '<li id="TabInboxNuevoTab"><a tip="Agregar pestaña" class="Tip1" onclick="SalesUp.Inbox.NuevoTab();" href="#InboxNuevoTab"><i class="fa fa-lg fa-plus"></i></a></li>';
		tab += '</ul>';

	var divTab  = '';
		divTab += '{{#each jsonDatos}}<div id="Inbox-{{idTabInbox}}" data-idTabInbox="{{idTabInbox}}" data-tabDefault="{{tabDefault}}">';
		divTab += '<div class="w100 LtCorreos">'+CargandoCorreos+'</div>';
		divTab += '<div class="w100 BoxDetalleInbox" style="display:none;"></div><div class="clear"></div>';
		divTab += '</div>{{/each}}';
		divTab += '<div id="InboxNuevoTab"></div>';

	var templateTabs = tab+divTab;	
	
	var liMover = '{{#each jsonDatos}}<li><a onclick="SalesUp.Inbox.moverCorreo({idTabInbox:{{idTabInbox}}, t:this });" href="#" class="textoTema" ><i class="fa fa-lg {{Icono}}"></i> {{Tab}}</a></li>{{/each}}';

	var noConfig  = '';
		noConfig += '<div class="[clase] w100" id="MsgConfigMail"> ';
		noConfig += '	<i class="fa fa-lg fa-warning"></i>';
		noConfig += '	[mensaje] ';
		noConfig += '	<span onclick="SalesUp.Ventana.AgregarCuenta({entrada:2});" class="Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar Pointer" id="ConfigCorreo" style="float:right;">';
		noConfig += '		<i class="fa fa-lg fa-gear"></i> Configurar ahora';
		noConfig += '	</span>';
		noConfig += '</div>';

	var desactivarChecks = function(){
		var $tabActual = $('.ui-tabs-panel:visible');
		var arrChecados = $tabActual.find('.rowEmail .faCheck:checked');
		arrChecados.prop('checked', false);

		for(var x = 0; x<_.size(arrChecados);x++){
			var check = arrChecados[x];
			SalesUp.Inbox.seleccionaRow({t:check});
		}
	}/*desactivarChecks*/

	var activarChecks = function(){
		var $tabActual = $('.ui-tabs-panel:visible');
		var arrChecados = $tabActual.find('.rowEmail .faCheck');
		arrChecados.prop('checked', true);

		for(var x = 0; x<_.size(arrChecados);x++){
			var check = arrChecados[x];
			SalesUp.Inbox.seleccionaRow({t:check});
		}
	}/*activarChecks*/

	var MasOpciones = function(){
		var $tabActual = $('.ui-tabs-panel:visible');
		var tabDefault = $tabActual.attr('data-tabdefault');
		var arrRows = $tabActual.find('.rowEmail.Seleccionado');
		var nRows = _.size(arrRows);
		menuMoverA();
		(nRows) ? $('.masAcciones').css('display','inline-block') : $('.masAcciones').hide();
		if(tabDefault=='1'){$('#guardarInbox').hide();}
	}

	var reconstruyeRows = function(){ 
		var template = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateInboxRow.dbsp', Almacen:'TemplateInboxRow'});
		var jTabs = SalesUp.Variables.jsonInboxTabs.jsonDatos;
		var jInbox = SalesUp.Variables.jsonInbox.jsonDatos;
			jInbox = _.sortBy(jInbox, function(j){ return -1*parseFloat(j.dtf); });
		
		for (var i = 0; i <_.size(jTabs); i++){
			var idTabInbox = jTabs[i].idTabInbox; 
			var ContenedorInbox = '#Inbox-'+idTabInbox;
			var $ContInbox = $(ContenedorInbox).find('.LtCorreos');

			var j = {}, jAux;
			jAux = _.where(jInbox, {idTabInbox:idTabInbox});
			j.jsonDatos = _.where(jAux,{procesado:1});

			var Compilado = SalesUp.Construye.ReemplazaDatos({Template:template, Datos:j});
			if(_.size(j.jsonDatos)){
				$ContInbox.html(Compilado);	
			}else{
				SalesUp.Construye.SinResultados({Destino:'#Inbox-'+idTabInbox+' .LtCorreos', Msg:'<i class="fa fa-lg fa-info-circle"></i> Este buzón no tiene correos. '});
			}

			SalesUp.Inbox.ajustarAltoInbox();
			SalesUp.Inbox.verMasCorreos({idTabInbox:idTabInbox});
			SalesUp.Sistema.InterpretaHtml();
		}

		SalesUp.Sistema.Tipsy();
		SalesUp.Sistema.InterpretaHtml();
		
	}/*reconstruyeRows*/

	var correosSinLeer = function(){ /*pedir por ajax los nuevos datos...*/

		var tabsNoLeidos = function(Op, err){
		  
		  if(Op){
		    var jTabs = Op.jsonDatos;
		    var nTabs = _.size(jTabs);
		    SalesUp.Variables.jsonInboxTabs = Op;
		    for (var i = 0; i < nTabs; i++){
		      var tab = jTabs[i];
		      var idTabInbox = tab.idTabInbox;
		      var noLeidos = tab.noLeidos;
		      var $idTabInbox = $('#TabInbox-'+idTabInbox);
		      var $a = $idTabInbox.find('a');
		      $a.find('.InboxNuevo').remove();
		      SalesUp.Inbox.verMasCorreos({idTabInbox:idTabInbox});
		      if(noLeidos>0){
		        $a.append('<span class="InboxNuevo">'+noLeidos+'</span>');
		      }
		    }
		  }
		  
		  if(err){console.warn('hubo error.')}
		  return true;
		}

		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonInboxTabs.dbsp', callback:tabsNoLeidos});

	}/*correosSinLeer*/

	var preparaJsonInbox = function(json){
		
		var jsonTemp = json.jsonDatos;
		jsonTemp = _.reject(jsonTemp, function(j){return _.size(j)==0;});
		var idTabInbox;
		
		if (_.size(jsonTemp)){idTabInbox = jsonTemp[0].idTabInbox;}
		
		var nFila = 1, jOriginal;
		if (SalesUp.Variables.jsonInbox){
			jOriginal = SalesUp.Variables.jsonInbox.jsonDatos;
			
			jOriginal = _.reject(jOriginal, function(j){return j.idTabInbox!=idTabInbox;});
			
			if(_.size(jOriginal)){
				nFila = _.max(jOriginal, function(j){ return j.nFila; }).nFila + 1;	
			}
		}

		for(var i = 0 ; i< _.size(jsonTemp);i++){
			var j = jsonTemp[i];
			
			/*
			var bodyMin = SalesUp.Sistema.removeTagsHtml(j.bodyEmail);
			if(_.size(bodyMin)>50){bodyMin = bodyMin.substring(0,50)+'...';	}
			j.bodyMin = bodyMin;
			*/
		
			j.Fecha = (j.Fecha) ? SalesUp.Sistema.FormatoFecha(j.Fecha):'';
			j.nFila = nFila+i;
			j.etiquetas = SalesUp.Sistema.StrReplace(':Etq',':SalesUp.Sistema.verEtiquetas',$.trim(j.etiquetas));
			j.etiquetas = _.unescape(j.etiquetas);
			if(j.noLeido==0){j.porLeer = true;}else{j.porLeer=false;}
			if(j.tieneAdjuntos>0){
				j.Adjuntos = SalesUp.Sistema.StrReplace('\t','',j.Adjuntos);
				
				try{
					j.Adjuntos=JSON.parse(j.Adjuntos);
				}catch(e){
					j.Adjuntos=[]; console.warn('Adjuntos',j.IdInbox);
				}
				
				j.Adjuntos = _.reject(j.Adjuntos,function(j){return j.ignorar==1});
				
				if(_.size(j.Adjuntos)==0){j.tieneAdjuntos=0;}
			}
			
			var jTabs = _.where(SalesUp.Variables.jsonInboxTabs.jsonDatos,{idTabInbox:j.idTabInbox})[0];
			var tabDefault = 0;
			
			(jTabs) ? tabDefault = jTabs.tabDefault : '';
			
			j.noEsTuyo = false;

			if((j.Idprospecto)&&(j.noEsTuyo==1)){
				j.noEsTuyo = true;
			}

			/*
			if(j.idColaborador>0){j.noEsTuyo = false;}
			if((j.idColaborador==0)&&(!j.Idprospecto)){j.noEsTuyo = false;}
			*/
			j.seguimientoAuto = 0;
			
			if ((j.Idprospecto)&&(!j.noEsTuyo)){
				j.seguimientoAuto  = (j.guardaSeguimiento) ? 1:0;
			}

			var cc = $.trim(j.cc);
			

			if(cc!=''){
				var strCc = [];
				var strPara = [];
				strPara.push('Para mí');
				
				try{cc = JSON.parse(cc);}catch(e){cc=[];}
			
				for(var x = 0; x < _.size(cc); x++) {
					var direccion = cc[x].address;
					(direccion) ? strCc.push(direccion):'';
					var para = (cc[x].name) ? cc[x].name : cc[x].address;
					(para) ? strPara.push(para):'';
					

				}

				if(_.size(strCc)==0){
					strPara.push(cc);
					cc = [{name:cc, address:null}];
				}

				j.jsonCc = cc;
				

				j.cc = strCc.join(', ');
				j.ltPara = strPara.join(', ');
				j.tieneCc = true;
			}
		}/*for*/
    
		json = {};
		json.jsonDatos = jsonTemp;

		return json;
	}/*preparaJsonInbox*/

	var eliminaBusquedaActual = function(){
		var idTabBuscarActual = SalesUp.Variables.idTabBuscarActual;
		if(idTabBuscarActual){
			$('#TabInbox-'+idTabBuscarActual).remove();
			$('#Inbox-'+idTabBuscarActual).remove();
			var idTabBuscar = idTabBuscarActual;
			var jOriginal = SalesUp.Variables.jsonInbox.jsonDatos;

			jOriginal = _.reject(jOriginal, function(j){ return j.idTabBuscar==idTabBuscar; });

			var j = {};
			j.jsonDatos = jOriginal;
			SalesUp.Variables.jsonInbox = undefined;
			SalesUp.Variables.jsonInbox = j;
		}
	}/*eliminaBusquedaActual*/

	var menuMoverA = function(){
		var Compilado, jsonInboxTabs, jsonInboxTabs, idTabInbox, idTabInbox, j ={jsonDatos:[]};
		jsonInboxTabs = SalesUp.Variables.jsonInboxTabs;
		idTabInbox = SalesUp.Variables.tabActivo;
		jsonInboxTabs = _.reject(jsonInboxTabs.jsonDatos, function(j){ if(j.idTabInbox==idTabInbox){return j;} });
		jsonInboxTabs = _.reject(jsonInboxTabs, function(j){ if(j.tabDefault==1){return j;} });
		j.jsonDatos = jsonInboxTabs;
		Compilado = SalesUp.Construye.ReemplazaDatos({Template:liMover, Datos:j});
		$('#MenuMovera').html(Compilado);
		return j;
	}/*menuMoverA*/

	var eliminarBusqueda = function(Op){
		console.log('eliminarBusqueda');

		var $contenedor = Op.box;
		var $tab = Op.tab;
		var idTabInbox = Op.idTabInbox;

		if (idTabInbox){
			var jOriginal = SalesUp.Variables.jsonInbox.jsonDatos;
			jOriginal = _.reject(jOriginal, function(j){ return j.idTabBuscar==idTabInbox; });
			
			var j = {};
			j.jsonDatos = jOriginal;
			SalesUp.Variables.jsonInbox = undefined;
			SalesUp.Variables.jsonInbox = j;
		}
		
		$contenedor.remove();
		$tab.remove();
		$('.tipsy').remove();

		var $tab = $('#Tabs.InboxTabs');
		$tab.tabs('refresh');
		$tab.tabs( "option", "active", 0 );
	}/*menuMoverA*/

	var eliminarTabJson = function(Op){
			var $contenedor = Op.box;
			var $tab = Op.tab;
			
			console.log('eliminarTabJson');
			var jsonInboxTabs, jsonInboxTabs, idTabInbox, idTabInbox, j ={jsonDatos:[]};
			jsonInboxTabs = SalesUp.Variables.jsonInboxTabs.jsonDatos;
			idTabInbox = SalesUp.Variables.tabActivo;
			jsonInboxTabs = _.reject(jsonInboxTabs, function(j){ if(j.idTabInbox==idTabInbox){return j;} });
			j.jsonDatos = jsonInboxTabs;
			
			
			SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/qryInboxEliminarTab.dbsp', parametros:'idTabInbox='+idTabInbox, dataType:'html'});

			SalesUp.Variables.jsonInboxTabs = undefined;
			SalesUp.Variables.jsonInboxTabs = j;
			
			SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-check"></i> Pestaña eliminada.'});

			eliminarBusqueda({box:$contenedor, tab:$tab});

	}/*eliminarTabJson*/

	var activaInboxShortCuts = function(){

		jwerty.key('shift+s', function(){ 
		  inboxShortCuts({accion:'buscarInbox'});
		});

		jwerty.key('shift+l', function(){ 
		  inboxShortCuts({accion:'actualizarInbox'});
		});

		jwerty.key('shift+r', function(){ 
		  inboxShortCuts({accion:'responder'});
		});

		jwerty.key('shift+n', function(){ 
		  inboxShortCuts({accion:'nuevoCompose'});
		});

		jwerty.key('shift+t', function(){ 
		  inboxShortCuts({accion:'seleccionaTodos'});
		});

		jwerty.key('shift+e', function(){ 
		  inboxShortCuts({accion:'eliminarInbox'});
		});	

	}/*activaInboxShortCuts*/

	var inboxShortCuts = function(Op){
		var tActivos = _.size($('input:focus, textarea:focus, select:focus'));
		if(tActivos>0){return;}

		var accion = Op.accion, ia = SalesUp.Variables.idInboxActual, enDetalle = false, 
			IdInbox, idTabInbox, Idprospecto, tkp, esCliente;
		
		if(ia){
			enDetalle=true;
			IdInbox = ia.IdInbox;
			idTabInbox = ia.idTabInbox;
			Idprospecto = $.trim(ia.Idprospecto);
			tkp = $.trim(ia.tkp);
			esCliente = ia.esCliente;
		}

		if (accion=='buscarInbox'){
			setTimeout(function() {$('#inputBuscarCorreo').focus();}, 500);
		}

		if (accion=='nuevoCompose'){
			SalesUp.Inbox.nuevoCorreo();
		}

		if (accion=='responder'){
			if(enDetalle){
				SalesUp.Inbox.ejecutaAccion({idTabInbox:idTabInbox, idInbox:IdInbox , idProspecto:Idprospecto, tkp:tkp, esCliente:esCliente, accion:6});
			}
		}

		if (accion=='actualizarInbox'){
			SalesUp.Inbox.actualizarInbox({t:$('#refrescarInbox')});
		}

		if (accion=='seleccionaTodos'){
			var $inputCheck = $('#seleccionarTodoInbox input');
			var check =  !$inputCheck.is(':checked');
			$inputCheck.prop('checked',check);
			SalesUp.Inbox.SeleccionarTodos({t:$inputCheck});
		}

		if (accion=='eliminarInbox'){ 
			if(enDetalle){
				SalesUp.Inbox.ejecutaAccion({idTabInbox:idTabInbox, idInbox:IdInbox , idProspecto:Idprospecto, tkp:tkp, esCliente:esCliente, accion:5});
			}
		}
	}/*inboxShortCuts*/

	var escribirIframe = function(Op){
		var idIframe = Op.idIframe, bodyEmail = Op.bodyEmail, style = '<style>body, td, input, textarea, select{margin:0px;}body {font-size: 80%;font-family:arial,sans-serif;}</style>';
		bodyEmail = style+_.unescape(bodyEmail);

		iframeDetalle = document.getElementById(idIframe).contentWindow.document;
		iframeDetalle.open();
		iframeDetalle.write(bodyEmail);
		iframeDetalle.close();
		SalesUp.Inbox.preparaLinks();
	}/*escribirIframe*/

	this.preparaLinks = function(){
		var arrHref = $('.iframeDetalle').contents().find('body a');

		for(var hx=0;hx<_.size(arrHref);hx++){
		  var $a = $(arrHref[hx]);
		  var href = $a.attr('href');
		  var c = 'event.preventDefault(); self.parent.SalesUp.Sistema.AbrirLinkExterno({Pagina:\''+href+'\'});';
		  $a.attr('onclick',c);
		}
	}
	
	activaInboxShortCuts();

	var guardaBodyEmail = function(Op){
		
		var jsonBody, bodyEmail, IdInbox = Op.IdInbox;
		var jOriginal = SalesUp.Variables.jsonInbox.jsonDatos;
		var jMail = jOriginal;

		for (var i =0; i < _.size(jOriginal); i++){
		  if(jOriginal[i].IdInbox==IdInbox){
		  	if(!jOriginal[i].bodyEmail){
		  		
				jsonBody = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonInboxObtieneBody.dbsp',Parametros:'idInbox='+IdInbox, DataType:'json'});
				bodyEmail = jsonBody.jsonDatos[0].bodyEmail; 
				jOriginal[i].bodyEmail = bodyEmail;
		  	}
		  }
		}

		var j = {};
		j.jsonDatos = jOriginal;
		SalesUp.Variables.jsonInbox = j;

		return bodyEmail;
	}



	this.iniInbox = function(){

		var SysInboxActivo = SalesUp.Sistema.Almacenamiento({a:'SysInboxActivo'});
		var SysInboxStatus = SalesUp.Sistema.Almacenamiento({a:'SysInboxStatus'});

		SysInboxActivo = parseInt(SysInboxActivo);
		SysInboxStatus = parseInt(SysInboxStatus);

		if(SysInboxActivo==0){
			SalesUp.Inbox.sinConfigurar({mal:1});
		}

		if((SysInboxActivo>0)&&(SysInboxStatus==0)){
			SalesUp.Inbox.sinConfigurar({mal:2});
		}
		
		if((SysInboxActivo>0)&&(SysInboxStatus>0)){
			console.info('Inbox by SalesUp!');
			SalesUp.Inbox.inboxTabs();
		}

	}/*iniInbox*/

	this.ajustarAltoInbox = function(){
		var p =  $('#contenedor').position();
		var h = $(window).height();
		var pie = $('#pie').outerHeight();

		var c = h - p.top - pie;

		$('#contenedor').css('height',c).css('min-height','auto');	

		var ch1 = $('#contenedor > h1').outerHeight();
		var itb  = ($('#InboxTopBar').is(':visible')) ? $('#InboxTopBar').outerHeight():0;
		var tult = $('#Tabs > ul.ui-tabs-nav').outerHeight();
		var $tabActivo = $('.ui-tabs-panel:visible');
		
		var tbp = 0;
		tbp =  c - ch1  - itb - tult - 50;

		$('#contenedor #Tabs.ui-tabs .ui-tabs-panel').css('height',tbp);

		var ima  = ($tabActivo.find('#inboxMailAdjuntos').outerHeight()) ? $tabActivo.find('#inboxMailAdjuntos').outerHeight() : 0;
		var him  = $tabActivo.find('#inboxInfoMail').outerHeight();
		var ibad = $tabActivo.find('#inboxBoxAccionesDetalle').outerHeight();
		var iba  = $tabActivo.find('#inboxBoxAsunto').outerHeight();
		var arrAsuntos = $tabActivo.find('.inboxBoxAsuntoRow');

		for (var i = 0; i < _.size(arrAsuntos); i++){
		  iba += $(arrAsuntos[i]).outerHeight();
		};

		nh = tbp - ima - him - ibad - iba - 23;
		
		if (nh<350){nh=350;}
		
		$tabActivo.find('.BoxDetalleInbox .iframeDetalle').css('height',nh);
		
	}/*ajustarAltoInbox*/

	this.sinConfigurar = function(Op){
		var mal = Op.mal;
		var clase = 'BoxMsgWarning';
		var msg = 'Para poder utilizar "Bandeja de entrada" se necesita configurar una cuenta de correo electrónico para poder recibir los correos.';
		
		if(mal==2){
			msg = 'Hay un error con la cuenta de correo electrónico proporcionada, revisar la configuración';
			clase = 'DatoMal';
		}
		
		noConfig = SalesUp.Sistema.StrReplace('[mensaje]',msg,noConfig);
		noConfig = SalesUp.Sistema.StrReplace('[clase]',clase,noConfig);

		$('#BoxInboxGral').hide();
		$('#BoxInboxGral').before(noConfig);
	}/*sinConfigurar*/

	this.configurarCorreo = function(){
		SalesUp.Sistema.AbrePopUp({
			Titulo: 'Nuevo prospecto',
			Pagina: '/privado/popup_config_mail.dbsp',
			Alto:330, Ancho:570
		});
	}/*configurarCorreo*/

	this.vieneDe = function(){
		var s,as,dato;
		s = document.location.search;
		if(!s){return false;}
		if(s.indexOf('r=')!=-1){return false;}
		s = SalesUp.Sistema.StrReplace('?q=','',s);
		as = SalesUp.Sistema.Encript({cadena:s, tipo:'decode'});
		dato = JSON.parse(as);
		return dato;
	}/*vieneDe*/

	this.inboxTabs = function(){

		var jsonInboxTabs, Compilado, idTabInbox, vieneDe, orden = 1;
		jsonInboxTabs = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonInboxTabs.dbsp', DataType:'json'});
		Compilado = SalesUp.Construye.ReemplazaDatos({Template:templateTabs, Datos:jsonInboxTabs});

		SalesUp.Variables.jsonInboxTabs = jsonInboxTabs;

		jsonInboxTabs = jsonInboxTabs.jsonDatos;
		jsonInboxTabs = _.where(jsonInboxTabs,{Orden:orden});
		idTabInbox = jsonInboxTabs[0].idTabInbox;
		orden = orden - 1;

		vieneDe = SalesUp.Inbox.vieneDe();
		if(vieneDe){
			idTabInbox=vieneDe.idTabInbox;
			orden = vieneDe.Orden - 1;
		}

		(SalesUp.Variables.tabOrden) ? orden = SalesUp.Variables.tabOrden:'';
		(SalesUp.Variables.cargaIdTabInbox) ? idTabInbox = SalesUp.Variables.cargaIdTabInbox:'';

		SalesUp.Variables.tabOrden=undefined;
		SalesUp.Variables.cargaIdTabInbox = undefined;

		$('#Tabs.InboxTabs').html(Compilado).tabs({active:orden}).show();
		SalesUp.Inbox.obtieneInbox({idTabInbox:idTabInbox});
	}/*inboxTabs*/

	this.tabActivo = function(Op){
		desactivarChecks();
		var idTabInbox = Op.idTabInbox;
		SalesUp.Variables.tabActivo = idTabInbox;

		$inputTodos = $('#seleccionarTodoInbox input');
		$inputTodos.prop('checked', false);
		SalesUp.Inbox.SeleccionarTodos({t:$inputTodos});
		SalesUp.Inbox.regresarInbox({idTabInbox:idTabInbox});
	}

	this.buscarCorreo = function(Op){
		var $btnBuscar = $('#boxBuscarCorreo .btnBuscarCorreo'), $inputBuscarCorreo = $('#inputBuscarCorreo');
		var e = Op.e, buscar, type = e.type, key = SalesUp.Sistema.NumKeyCode(e);
		 $('#sinResultadosBusqueda').html(''); 
		 
		if((key==13)||(type == 'click')){
			buscar = $inputBuscarCorreo.val();
			if(buscar==''){ $inputBuscarCorreo.focus(); return;}
			$btnBuscar.html('<i class="fa fa-lg fa-spin fa-spinner"></i>');
			setTimeout(function(){
				SalesUp.Inbox.activaBuscarCorreo({buscar:buscar});
				$btnBuscar.html('<i class="fa fa-lg fa-search"></i>');
			}, 10);
		}
	}/*buscarCorreo*/

	this.activaBuscarCorreo = function(Op){ 
		var $btnBuscar = $('#boxBuscarCorreo .btnBuscarCorreo'), $inputBuscarCorreo = $('#inputBuscarCorreo');
		var buscar = escape(Op.buscar), Compilado;
		var jBuscar = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonInboxCorreosBuscar.dbsp', Parametros:'Buscar='+buscar, DataType:'json'});
		var template = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateInboxRow.dbsp', Almacen:'TemplateInboxRow'});

		jBuscar = preparaJsonInbox(jBuscar);
		
		eliminaBusquedaActual();

		var nJson = _.size(jBuscar.jsonDatos);
		var idUnico = (new Date()).getTime();
		SalesUp.Variables.idTabBuscarActual = idUnico;
		var tab = 'Buscar: '+ Op.buscar;

		for (var i = 0; i < nJson; i++){
			jBuscar.jsonDatos[i].idTabBuscar = idUnico;
		}
		
		if(nJson){
			SalesUp.Variables.tabActivo=0;
			if(SalesUp.Variables.jsonInbox){
				var j = SalesUp.Variables.jsonInbox.jsonDatos;
				SalesUp.Variables.jsonInbox = {};
				SalesUp.Variables.jsonInbox.jsonDatos = _.union(j,jBuscar.jsonDatos);
			}else{
				SalesUp.Variables.jsonInbox = jBuscar;
			}

			SalesUp.Variables.respGuardaPopUp = {jsonDatos:[{idTabInbox:idUnico, Tab:tab, Icono:'fa-search', pEliminar:'1', tabDefault:-1}]};
			SalesUp.Inbox.AgregaPestania();
			var $ContInbox = $('#Inbox-'+idUnico+' .LtCorreos');
			var $tab = $('#TabInbox-'+idUnico);
			$tab.find('a').removeAttr('onclick');
			Compilado = SalesUp.Construye.ReemplazaDatos({Template:template, Datos:jBuscar});
			$ContInbox.html(Compilado);	
			SalesUp.Sistema.Tipsy();
			
			$inputBuscarCorreo.val('');
			SalesUp.Inbox.ajustarAltoInbox();
			SalesUp.Sistema.InterpretaHtml();
		}else{
			$inputBuscarCorreo.focus();
			/*aqui*/
			$('#sinResultadosBusqueda').html(sinResultadosBusqueda);
		}
		
	}/*activaBuscarCorreo*/

	var jsonPideCorreos = function(){

	}

	this.obtieneInbox = function(Op){  
		var idTabInbox = Op.idTabInbox;
		var t = (Op.t) ? Op.t:undefined;
		var ContenedorInbox = '#Inbox-'+idTabInbox;
		var $ContInbox = $(ContenedorInbox).find('.LtCorreos');

		var suStart = Op.suStart;
		var suHowMany = Op.suHowMany;
		var verMas = (Op.verMas)?true:false;
		var paginacion = '&suInicio=1&suCuantos=100';
		if (suStart) {
			paginacion = '&suInicio='+suStart+'&suCuantos='+suHowMany;
		}

		$('.SincronizandoCorreos.CargandoCorreos').remove();
		
		if(!verMas){
			$ContInbox.html(CargandoCorreos);
		}
		
		desactivarChecks();
		$('#TabInbox-'+idTabInbox).find('a').attr('onclick','SalesUp.Inbox.tabActivo({idTabInbox:'+idTabInbox+'});');
		SalesUp.Inbox.tabActivo({idTabInbox:idTabInbox});
		
		setTimeout(function(){
			var template = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateInboxRow.dbsp', Almacen:'TemplateInboxRow'});

			var prm = 'idTabInbox='+idTabInbox+paginacion;
			var jsonInbox;
			
			if (verMas){
				SalesUp.Inbox.CargaDatosAsync({link:'/privado/Modelo/jsonInboxCorreos.dbsp', parametros:prm});
			}else{
				jsonInbox = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonInboxCorreos.dbsp',Parametros:prm, DataType:'json'});	
			}

			if (jsonInbox){
				jsonInbox = preparaJsonInbox(jsonInbox);

				if(SalesUp.Variables.jsonInbox){
					var j = SalesUp.Variables.jsonInbox.jsonDatos;
					SalesUp.Variables.jsonInbox = {};
					SalesUp.Variables.jsonInbox.jsonDatos = _.union(j,jsonInbox.jsonDatos);
				}else{
					SalesUp.Variables.jsonInbox = jsonInbox;
				}
			}
			
			var jOriginal = SalesUp.Variables.jsonInbox.jsonDatos;
			var jProcesar = _.reject(jOriginal,function(j){return j.idTabInbox != idTabInbox;});
				jProcesar = _.reject(jProcesar,function(j){return j.procesado == 1;});
			var np = _.size(jProcesar), no = _.size(jOriginal);

			if(np>50){jProcesar = _.first(jProcesar,50);}

			for (var i = 0; i < _.size(jProcesar); i++){
				for (var x = 0; x < _.size(jOriginal); x++){
					if(jProcesar[i].IdInbox == jOriginal[x].IdInbox){
						jOriginal[x].procesado = 1;
					}
				}
			}

			var j = {}, jAux = {};
			j.jsonDatos = jOriginal;
			SalesUp.Variables.jsonInbox = j;

			jAux.jsonDatos = jProcesar;
			jProcesar = undefined;
			jProcesar = jAux;
			
			var Compilado = SalesUp.Construye.ReemplazaDatos({Template:template, Datos:jProcesar});
			
			/*if(_.size(jsonInbox.jsonDatos)){*/
				if(verMas){
					$ContInbox.append(Compilado);
				}else{
					$ContInbox.html(Compilado);
				}/*
			}else{
				SalesUp.Construye.SinResultados({Destino:'#Inbox-'+idTabInbox+' .LtCorreos', Msg:'<i class="fa fa-lg fa-info-circle"></i> Este buzón no tiene correos. '});
			}*/
			
			SalesUp.Sistema.Tipsy();
			SalesUp.Sistema.InterpretaHtml();
			
			if (SalesUp.Variables.actualizaInbox){
				$('#refrescarInbox .fa').removeClass('fa-spin');
				SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-check"></i> Inbox actualizado.'});
				SalesUp.Variables.actualizaInbox = undefined;
			}
			SalesUp.Inbox.ajustarAltoInbox();
			SalesUp.Inbox.verMasCorreos({idTabInbox:idTabInbox});
			SalesUp.Inbox.sincronizaCorreo();
		}, 10);
		
	}/*obtieneInbox*/

	this.sincronizaCorreo = function(){

		var sincronizaCorreo = SalesUp.Sistema.Almacenamiento({a:'sincronizaCorreo'});
		
		if (sincronizaCorreo=='1'){
			console.info('sincronizando correo....');
			SalesUp.Inbox.actualizarInbox();
			SalesUp.Sistema.BorrarItemDeAlmacen('sincronizaCorreo');
		}
		
	}
	

	this.verMasCorreos = function(Op){
		var idTabInbox = Op.idTabInbox;
		var jTabs = SalesUp.Variables.jsonInboxTabs.jsonDatos;
		var jOriginal = jTabs, j={};
		jTabs = _.where(jTabs, {idTabInbox:idTabInbox})[0];
		var total = jTabs.total;
		var tabDefault = jTabs.tabDefault;
		var jMail = SalesUp.Variables.jsonInbox.jsonDatos;

		jMail = _.where(jMail, {idTabInbox:idTabInbox});
		jMail = _.reject(jMail,function(j){return j.procesado!=1;});
		var totalActual = _.size(jMail);
		var verMas = '<div onclick="SalesUp.Inbox.activaVerMasCorreos({t:this, idTabInbox:'+idTabInbox+'});" class="VerMasCorreos Pointer w100 rowEmail tCen"><b><i class="fa fa-lg fa-caret-down"></i> Ver más</b><div class="clear"></div></div>';
		$('#Inbox-'+idTabInbox+' .LtCorreos').find('.VerMasCorreos').remove();
		$('#Inbox-'+idTabInbox+' .LtCorreos').find('.verMasServer').remove();
		
		console.log(totalActual, total, tabDefault);
		
		if (totalActual<total){$('#Inbox-'+idTabInbox+' .LtCorreos').append(verMas);}

		if(totalActual>=total){
			verMas = '<div onclick="SalesUp.Inbox.activaVerMasCorreosServer({t:this, idTabInbox:'+idTabInbox+'});" class="verMasServer Pointer w100 rowEmail tCen"><b><i class="fa fa-lg fa-caret-down"></i> Ver más</b><div class="clear"></div></div>';
			$('#Inbox-'+idTabInbox+' .LtCorreos').append(verMas);
		}

		if (totalActual==0){SalesUp.Construye.SinResultados({Destino:'#Inbox-'+idTabInbox+' .LtCorreos', Msg:'<i class="fa fa-lg fa-info-circle"></i> Este buzón no tiene correos. '});}
	}
	
	this.activaVerMasCorreosServer = function(Op){
		console.log('Pedir al servidor....');
		var idTabInbox = Op.idTabInbox;
		var $t = $(Op.t);
		
		$t.html(cargandoMasCorreosServidor);
		SalesUp.Variables.pideLoViejo = true;
		SalesUp.Sistema.CargaDatosAsync({
			link:'/privado/Modelo/qrySincronizaInbox.dbsp', parametros:'anteriores=1' ,
			dataType:'html',
			callback:SalesUp.Inbox.pideLoNuevo
		});
	}

	this.activaVerMasCorreos = function(Op){
		
		var idTabInbox = Op.idTabInbox;
		var $t = $(Op.t);
		var jTabs = SalesUp.Variables.jsonInboxTabs.jsonDatos;
		var jOriginal = jTabs, j={};
		jTabs = _.where(jTabs, {idTabInbox:idTabInbox})[0];

		var suStart = jTabs.start;
		var suHowMany = jTabs.howMany;

		(!suStart) ? suStart = 51 : '';
		(!suHowMany) ? suHowMany = 50 : '';

		suStart = suStart + 50;

		for(var x=0;x<_.size(jOriginal);x++){
		  if(jOriginal[x].idTabInbox==idTabInbox){
		    jOriginal[x].start = suStart;
		    jOriginal[x].howMany = suHowMany;
		  }
		}

		SalesUp.Variables.jsonInboxTabs = undefined;
		j.jsonDatos = jOriginal;
		SalesUp.Variables.jsonInboxTabs = j;
		$t.html(cargandoMasCorreos);
		setTimeout(function(){
			SalesUp.Inbox.obtieneInbox({idTabInbox:idTabInbox, suStart:suStart, suHowMany:suHowMany, verMas:true});
			$t.remove();
		}, 100);
	
	}/*activaVerMasCorreos*/

	var preparaJsonInboxCadena = function(j){
		return preparaJsonInbox(j);
	}
	this.preparaJsonInbox = function(j){
		return preparaJsonInbox(j);
	}

	this.obtenerBody = function(Op){
		var IdInbox = parseInt(Op.idInbox);
		jMail = SalesUp.Variables.jsonInbox.jsonDatos;
		jMail = _.where(jMail,{IdInbox:IdInbox})[0];
		var bodyEmail = jMail.bodyEmail;

		if(!bodyEmail){bodyEmail = guardaBodyEmail({IdInbox:IdInbox}); }

		return bodyEmail;
	}

	this.obtenerAttachments = function(Op){
		var IdInbox = parseInt(Op.idInbox);
		jMail = SalesUp.Variables.jsonInbox.jsonDatos;
		jMail = _.where(jMail,{IdInbox:IdInbox})[0];
		var ltAdjuntos = jMail.Adjuntos;
		var strAdjuntos = '', strNombreAdjuntos ='';
		
		for (var ar = 0;ar<_.size(ltAdjuntos);ar++){ 
			strAdjuntos += '/'+ltAdjuntos[ar].archivo+'|'; 
			strNombreAdjuntos += '<div class="MultiFile-label"><span class="MultiFile-title">'+ltAdjuntos[ar].nombre+'</span></div>';
		}

		$('#popupComposeMail').find('#listafile').show().append(strNombreAdjuntos);

		return strAdjuntos;
	}

	this.preparaLinkCopiarArchivosInbox = function(Op){
		var IdInbox = parseInt(Op.idInbox);
		jMail = SalesUp.Variables.jsonInbox.jsonDatos;
		jMail = _.where(jMail,{IdInbox:IdInbox})[0];
		var ciaa = jMail.ciaa;
		var ltCiaa = ciaa.split('|');
		
		var anio = ltCiaa[0], mes = ltCiaa[1], ide = ltCiaa[2];
		var parametrosCiaa = 'idempresa='+ide+'&mes='+mes+'&anio='+anio+'&archivos=';
		return parametrosCiaa;
	}

	this.verDetalleInbox = function(Op){
		
		desactivarChecks();
		var iframeDetalle, Compilado, $divInbox, template, $t = $(Op.t), idTabInbox = Op.idTabInbox, IdInbox = Op.IdInbox, jMail = SalesUp.Variables.jsonInbox.jsonDatos, $boxVerInbox = Op.boxVerInbox;
		var idTabBuscar = parseInt(Op.idTabBuscar);
		var idIframe = SalesUp.Construye.IdUnico();
		var jsonInboxCadena;

		$padre = $t.closest('.rowEmail');
		
		(!_.size($padre)) ? $padre = $('[data-inbox="'+IdInbox+'"]'):'';
		
		$padre.removeClass('noLeido');
		$divInbox = $('#Inbox-'+idTabInbox);
		if(idTabBuscar){$divInbox = $('#Inbox-'+idTabBuscar);}
		$divInbox.find('.LtCorreos').hide();
		
		($boxVerInbox) ? $divInbox = $boxVerInbox :'';
		
		$divInbox.find('.BoxDetalleInbox').show().html(CargandoCorreos);

		setTimeout(function(){
			template = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateInboxDetalle.dbsp', Almacen:'TemplateInboxDetalle'});
			jMail = _.where(jMail,{IdInbox:IdInbox});
			if(idTabBuscar){ jMail = _.where(jMail,{idTabBuscar:idTabBuscar, IdInbox:IdInbox});	}

			jMail = jMail[0];
			jMail.idIframe = idIframe;
			var bodyEmail = jMail.bodyEmail;
			var idInboxMaster = jMail.idInboxMaster;
			
			console.info('**idInboxMaster',idInboxMaster, IdInbox);

			if(idInboxMaster){
				jsonInboxCadena = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonInboxCorreosCadena.dbsp',Parametros:'idInboxMaster='+idInboxMaster, DataType:'json'});
				template = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateInboxDetalleCadena.dbsp', Almacen:'TemplateInboxDetalleCadena'});
				jsonInboxCadena = preparaJsonInboxCadena(jsonInboxCadena);
				var jCadenas = jsonInboxCadena.jsonDatos;

				for(var i = 0; i < _.size(jCadenas); i++){
					var jc = jCadenas[i];
					if (jc.reciente){
						jc.idIframe = idIframe;
						bodyEmail = jc.bodyEmail;
					}
				}

				jMail.jsonDatos = jCadenas;
				
			}else if(!bodyEmail){
				bodyEmail = guardaBodyEmail({IdInbox:IdInbox});
			}
			
			SalesUp.Variables.idInboxActual = jMail;
			Compilado = SalesUp.Construye.ReemplazaDatos({Template:template, Datos:jMail});
			
			$divInbox.find('.BoxDetalleInbox').show().html(Compilado);
			SalesUp.Sistema.InterpretaHtml();
			$('#seleccionarTodoInbox, #refrescarInbox, #boxBuscarCorreo, #nuevoCorreoInbox, #InboxTopBar').hide();
			
			escribirIframe({bodyEmail:bodyEmail, idIframe:idIframe});
			$('.contenidoCadena[data-reciente=""]').find('#inboxBoxAsunto').addClass('emailComprimido');
			$('.contenidoCadena[data-reciente="1"]').find('#inboxBoxAsunto').removeAttr('onclick');
			SalesUp.Inbox.marcarEmailLeido({idTabInbox:idTabInbox, IdInbox:IdInbox});
			SalesUp.Sistema.Tipsy();
			SalesUp.Sistema.InterpretaHtml();
			setTimeout(function() {SalesUp.Inbox.ajustarAltoInbox();}, 100);
			SalesUp.Inbox.siguienteAnteriorInbox();
		}, 10);

	}/*verDetalleInbox*/

	this.verEnExterno = function(Op){
		var tkui = Op.tkui, t = Op.t;
		var ja = SalesUp.Variables.idInboxActual;

		SalesUp.Sistema.Almacenamiento({a:'jsonInboxDetalleActual', v:ja});
		SalesUp.Sistema.Almacenamiento({a:'jsonInboxTabs', v:SalesUp.Variables.jsonInboxTabs});
		SalesUp.Sistema.Almacenamiento({a:'jsonInbox', v:SalesUp.Variables.jsonInbox});
		SalesUp.Sistema.OpenInNewTab('/privado/verInbox.dbsp');
	}/*verEnExterno*/

	this.verInbox = function(){
		console.info('verInbox');
		var jsonInboxDetalleActual = SalesUp.Sistema.Almacenamiento({a:'jsonInboxDetalleActual'});
		SalesUp.Variables.jsonInboxTabs =SalesUp.Sistema.Almacenamiento({a:'jsonInboxTabs'});
		SalesUp.Variables.jsonInbox = SalesUp.Sistema.Almacenamiento({a:'jsonInbox'});
		$BoxDetalleInbox = $('#InboxContenido .BoxDetalleInbox');

		var IdInbox = jsonInboxDetalleActual.IdInbox, idTabBuscar = jsonInboxDetalleActual.idTabBuscar, idTabInbox = jsonInboxDetalleActual.idTabInbox, boxVerInbox = $('#InboxContenido');;

		SalesUp.Inbox.verDetalleInbox({idTabInbox:idTabInbox, IdInbox:IdInbox, boxVerInbox:boxVerInbox, idTabBuscar:idTabBuscar});

		setTimeout(function(){
			$BoxDetalleInbox.find('.btnAntSig').remove();
			$BoxDetalleInbox.find('.btnAtras').remove();
			$BoxDetalleInbox.append('<div class="clear"></div>');
			SalesUp.Inbox.ajustarAltoInboxExterno();
			$(window).resize(function(){ SalesUp.Inbox.ajustarAltoInboxExterno(); });
		}, 100);

		/*
		SalesUp.Sistema.BorrarItemDeAlmacen('jsonInboxDetalleActual');
		SalesUp.Sistema.BorrarItemDeAlmacen('jsonInboxTabs');
		SalesUp.Sistema.BorrarItemDeAlmacen('jsonInbox');
		*/ 

	}/*verInbox*/

	this.ajustarAltoInboxExterno = function(){
		var $contenedor = $('#contenedor'), $tabActivo = $('#InboxContenido .BoxDetalleInbox');
		var p =  $contenedor.position();
		var h = $(window).height();
		var pie = $('#pie').outerHeight();
		var c = h - p.top - pie;
		var tbp = c;
		var ima  = ($tabActivo.find('#inboxMailAdjuntos')) ? $tabActivo.find('#inboxMailAdjuntos').outerHeight() : 0;
		var him  = $tabActivo.find('#inboxInfoMail').outerHeight();
		var ibad = $tabActivo.find('#inboxBoxAccionesDetalle').outerHeight();
		var iba  = $tabActivo.find('#inboxBoxAsunto').outerHeight();
		var arrAsuntos = $tabActivo.find('.inboxBoxAsuntoRow');

		for (var i = 0; i < _.size(arrAsuntos); i++){
		  iba += $(arrAsuntos[i]).outerHeight();
		};

		nh = tbp - ima - him - ibad - iba + 20;

		if (nh<350){nh=350;}

		$tabActivo.css('height',tbp);
		$tabActivo.find('.iframeDetalle').css('height',nh);
		$contenedor.css('height',c).css('min-height','auto');

	}


	this.siguienteAnteriorInbox = function(){
		var arrTkus = ['U-98FB7AEE-CA7C-426C-9F82-3223868DF405','U-4516FEE5-7DA2-4733-B6D8-E59B111A8F4E','U-02665AB3-9ECF-42F7-A8AC-869599E9E13A','U-FD6D4BDE-E6A6-4EB5-BE4C-9BFD47F5B7A7'];

		/*if (arrTkus.indexOf(SalesUp.Sistema.Almacenamiento({a:'SysTku'}))==-1){return;}*/
		
		/*$('.verEnExterno').remove();*/

		var j = SalesUp.Variables.idInboxActual;
		var idTabInboxActual = j.idTabInbox;
		var idInboxActual = j.IdInbox;
		var jMails = SalesUp.Variables.jsonInbox.jsonDatos;
		jMails = _.where(jMails,{idTabInbox:idTabInboxActual});
		jMails = _.sortBy(jMails, function(j){ return -1*parseFloat(j.dtf); });

		var $cont = $('#Inbox-'+idTabInboxActual).find('.BoxDetalleInbox').find('.btnAntSig');
		$cont.find('.sigAnt').remove();
		var indexActual = _.findIndex(jMails, function(j){ return j.IdInbox == idInboxActual });
		var jNext, jPrev, nextInbox, prevInbox, btnAntSig='';
		jNext = jMails[indexActual+1];
		jPrev = jMails[indexActual-1];
		nextInbox = (jNext)?jNext.IdInbox:0;
		prevInbox = (jPrev)?jPrev.IdInbox:0;
		console.log('>', nextInbox);
		console.log('<', prevInbox);

		if (prevInbox){
			btnAntSig += '<span style="padding: 0px 7px;" onclick="SalesUp.Inbox.verDetalleInbox({idTabInbox:'+idTabInboxActual+', IdInbox:'+prevInbox+'});" class="Pointer sigAnt btnNeutral Btn Btn-rounded Btn-tiny Btn-flat-Aceptar Btn-tiny-min"><i class="fa fa-2x fa-angle-left"></i></span> ';
		}
		if (nextInbox){
			btnAntSig += '<span style="padding: 0px 7px;" onclick="SalesUp.Inbox.verDetalleInbox({idTabInbox:'+idTabInboxActual+', IdInbox:'+nextInbox+'});" class="Pointer sigAnt  btnNeutral Btn Btn-rounded Btn-tiny Btn-flat-Aceptar Btn-tiny-min"><i class="fa fa-2x fa-angle-right"></i></span>'; 
		}

		$cont.append(btnAntSig);
	}

	this.verContenidoInbox = function(Op){
		console.log(Op);
		var tipoCorreo = Op.tipoCorreo;
		var idInbox = Op.IdInbox;
		var idEmail = Op.idEmail;
		var $t = $(Op.t);
		var idIframe = SalesUp.Construye.IdUnico();
		var bodyEmail, Compilado;
		var tmpVerContenido = '';

		$t.attr('onclick','SalesUp.Inbox.expandirCorreo({t:this});').removeClass('emailComprimido');
		$t.find('.faUserSpin').addClass('fa-spinner fa-spin').removeClass('fa-user');
		tmpVerContenido += '<div class="cuerpoDetalle w100">';
		tmpVerContenido += '	<iframe id="{{idIframe}}" class="w100 iframeDetalle"></iframe>';
		tmpVerContenido += '	{{#if tieneAdjuntos}}';
		tmpVerContenido += '	<div id="inboxMailAdjuntos" class="w100">';
		tmpVerContenido += '		<span class="w100 TitDiv titAdjuntos"><i class="fa fa-lg fa-paperclip"></i> Adjuntos</span>';
		tmpVerContenido += '		{{#each Adjuntos}}{{mailAdjuntos ../IdInbox}}{{/each}}';
		tmpVerContenido += '	</div>';
		tmpVerContenido += '	{{/if}}';
		tmpVerContenido += '</div>';
		tmpVerContenido += '';
		
		var jsonCorreoDetalle;
		
		setTimeout(function() {
			if(tipoCorreo==1){
				jsonCorreoDetalle = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonInboxDetalleCorreoEmails.dbsp', Parametros:'idemail='+idEmail, DataType:'json'});
			}

			if(tipoCorreo==2){
				jsonCorreoDetalle = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonInboxDetalleCorreoInbox.dbsp', Parametros:'idInbox='+idInbox, DataType:'json'});
			}
			
			jsonCorreoDetalle = preparaJsonInbox(jsonCorreoDetalle);
			jsonCorreoDetalle = jsonCorreoDetalle.jsonDatos[0];
			
			jsonCorreoDetalle.idIframe = idIframe;
			bodyEmail = jsonCorreoDetalle.bodyEmail;

			Compilado = SalesUp.Construye.ReemplazaDatos({Template:tmpVerContenido, Datos:jsonCorreoDetalle});
			$t.after(Compilado);
			escribirIframe({bodyEmail:bodyEmail, idIframe:idIframe});
			var $iframe = $('#'+idIframe);
			var iframeAlto=$iframe.contents().find('body').css('margin',0).outerHeight()+20;
			$iframe.css('height',iframeAlto);
			$t.find('.faUserSpin').removeClass('fa-spinner fa-spin').addClass('fa-user');
		}, 10);

	}/*verContenidoInbox*/

	this.expandirCorreo = function(Op){
		var $t = $(Op.t);
		var $p = $t.closest('.contenidoCadena');
		var $c = $p.find('.cuerpoDetalle');
		var visible = $c.is(':visible');

		if(visible){ $c.hide(); $t.addClass('emailComprimido'); }else{$c.show(); $t.removeClass('emailComprimido');}
	}

	this.marcarEmailLeido = function(Op){
		
		var idTabInbox = Op.idTabInbox;
		var IdInbox = Op.IdInbox;
		var $idTabInbox = $('#TabInbox-'+idTabInbox+' a');
		var $InboxNuevo = $idTabInbox.find('.InboxNuevo');
		var Leidos = $InboxNuevo.html();
		var jOriginal = SalesUp.Variables.jsonInbox.jsonDatos;
		var jMail = jOriginal;
		var $gralLeidos = $('#notificacionInbox a .notiNoLeido');
		var tNoleidos;

		if($gralLeidos){
			tNoleidos = parseInt($gralLeidos.html())-1;
		}

		jMail = _.where(jMail,{IdInbox:IdInbox});
		var noLeido = jMail[0].noLeido;
		
		if(noLeido==0){
			
			SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryMailLeido.dbsp', Parametros:'idTabInbox='+idTabInbox+'&IdInbox='+IdInbox});

			for (var i =0; i < _.size(jOriginal); i++){
				if(jOriginal[i].IdInbox==IdInbox){
					jOriginal[i].noLeido = 1;
				}
			}

			var j = {};
			j.jsonDatos = jOriginal;
			SalesUp.Variables.jsonInbox = j;
		}

		setTimeout(function(){
			SalesUp.Inbox.correosSinLeer();
		}, 1000);
	}/*marcarEmailLeido*/

	this.regresarInbox = function(Op){ 
		var $divInbox, template, idTabInbox = Op.idTabInbox, idTabBuscar = Op.idTabBuscar;
		$divInbox = $('#Inbox-'+idTabInbox);
		if(idTabBuscar){$divInbox = $('#Inbox-'+idTabBuscar);}
		$divInbox.find('.LtCorreos').show();
		$divInbox.find('.BoxDetalleInbox').hide().html('');
		$('#seleccionarTodoInbox, #refrescarInbox, #boxBuscarCorreo ,#nuevoCorreoInbox, #InboxTopBar').show();
		
		SalesUp.Variables.idInboxActual = undefined;
	}

	this.activaAccionesInboxRow = function(Op){
		var $t = $(Op.t);

		$t.removeAttr('onmouseenter');
		
		SalesUp.Inbox.accionesInbox(Op);

		$t.mouseenter(function(){ SalesUp.Inbox.accionesInbox(Op); });
	}/*activaOpcionesRowMail*/

	this.accionesInbox = function(Op){
		var Acciones = '', t = Op.t, $t = $(t), idTabInbox = Op.idTabInbox, idInbox = Op.idInbox, idProspecto = Op.idProspecto, tkp = Op.tkp, 
		esCliente = Op.esCliente, idSeguimiento = Op.idSeguimiento, tieneCc = Op.tieneCc, seguimientoAuto = Op.seguimientoAuto;
		var opciones = 'idTabInbox:'+idTabInbox+', idInbox:'+idInbox+' , idProspecto:\''+idProspecto+'\', tkp:\''+tkp+'\', esCliente:\''+esCliente+'\', seguimientoAuto:'+seguimientoAuto;
		SalesUp.Variables.elementoEllipsisActual = t;

		Acciones += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Inbox.ejecutaAccion({'+opciones+', accion:6});"><i class="fa fa-lg fa-mail-reply"></i> Responder</span>';

		if(tieneCc){
			Acciones += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Inbox.ejecutaAccion({'+opciones+', accion:6, respTodos:true});"><i class="fa fa-lg fa-reply-all"></i> Responder a todos</span>';  
		}
		Acciones += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Inbox.ejecutaAccion({'+opciones+', accion:7});"><i class="fa fa-lg fa-mail-forward"></i> Reenviar</span>';
		Acciones += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Inbox.ejecutaAccion({'+opciones+', accion:2});"><i class="fa fa-lg fa-folder"></i> Mover a</span>';
		
		if(idProspecto){
			if(!idSeguimiento){Acciones += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Inbox.ejecutaAccion({'+opciones+', accion:1});"><i class="fa fa-lg fa-comment"></i> Guardar en segumiento</span>';}
			
			if(seguimientoAuto==1){
				Acciones += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Inbox.ejecutaAccion({'+opciones+', accion:9});"><i class="fa fa-lg fa-check"></i> Activar seguimiento automático</span>';
			}else if(seguimientoAuto==0){
				Acciones += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Inbox.ejecutaAccion({'+opciones+', accion:9});"><i class="fa fa-lg fa-times"></i> Desactivar seguimiento automático</span>';
			}	
			

			Acciones += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Inbox.ejecutaAccion({'+opciones+', accion:3});"><i class="fa fa-lg fa-user"></i> Ver contacto</span>';	
		}else{
			Acciones += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Inbox.ejecutaAccion({'+opciones+', accion:4});"><i class="fa fa-lg fa-user-plus"></i> Agregar contacto</span>';
			Acciones += '';
		}
		
		Acciones += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Inbox.ejecutaAccion({'+opciones+', accion:5});"><i class="fa fa-lg fa-trash"></i> Eliminar</span>';
		
		/* 
		Acciones += '<span class="OpcionAcciones Pointer"><i class="fa fa-lg fa-bell"></i> Crear recordatorio</span>';
		Acciones += '<span class="OpcionAcciones Pointer"><i class="fa fa-lg fa-share-square"></i> Crear tarea</span>';
		Acciones += '<span class="OpcionAcciones Pointer"><i class="fa fa-lg fa-calendar"></i> Crear cita</span>';
		*/

		SalesUp.Construye.popOver({Elemento:t, PopOverLugar:'left', Contenido:Acciones, Clases:'PopOverAcciones'});
	}/*accionesInbox*/

	this.ejecutaAccion = function(Op){
		var onclick = '', compilado = '', tmpAcciones = '',Acciones = '', accion = Op.accion, idTabInbox = Op.idTabInbox, 
		idInbox = Op.idInbox, idProspecto = Op.idProspecto, tkp = Op.tkp, esCliente = Op.esCliente, respTodos = Op.respTodos, correoDe = Op.correoDe, seguimientoAuto = Op.seguimientoAuto, eliminarBtn = Op.eliminarBtn;
		var t = SalesUp.Variables.elementoEllipsisActual;
		var jTabs = menuMoverA();
		var jInbox = SalesUp.Variables.jsonInbox.jsonDatos;
		var jEncontrado = _.where(jInbox, {IdInbox:idInbox})[0];
		var idInboxMaster = (jEncontrado)?jEncontrado.idInboxMaster:0;
		var esBoton = Op.boton;
		var lugarPopOver = 'left';
		(esBoton)?t = Op.t:'';
		(esBoton)?lugarPopOver = 'top':'';
		/*Agregar seguimiento*/
		if(accion==1){
			SalesUp.Inbox.guardarSeguimiento({idProspecto:idProspecto, idInbox:idInbox});
		}

		/*Mover */
		if(accion==2){
			onclick = 'onclick="SalesUp.Inbox.alertaMoverCorreo({ltIdInbox:'+idInbox+', ltIdTabInbox:'+idTabInbox+', ltProspectos:\''+idProspecto+'\', idTabInbox:{{idTabInbox}} });"'
			tmpAcciones = '{{#each jsonDatos}}<span class="OpcionAcciones Pointer" '+onclick+'><i class="fa fa-lg {{Icono}}"></i> {{Tab}}</span>{{/each}}';
			compilado = SalesUp.Construye.ReemplazaDatos({Template:tmpAcciones, Datos:jTabs});
			
			(esBoton)?t = Op.t:'';
			SalesUp.Construye.popOver({Elemento:t, Titulo:'<i class="fa fa-lg fa-folder"></i> Mover a', PopOverLugar:lugarPopOver, Contenido:compilado, Clases:'PopOverAcciones'});
		}

		/*ver contacto*/
		if(accion==3){
			var link = '/privado/prospectos-visualizar.dbsp';

			if(esCliente==1){
				link = '/privado/clientes-visualizar.dbsp';
			}
			
			link += '?tkp='+tkp+'&idProspecto='+idProspecto;
			SalesUp.Sistema.OpenInNewTab(link);
		}

		/*Agregar prospecto*/
		if(accion==4){
			var nombre = jEncontrado.De;
			var correo = jEncontrado.correoDe;
			var datosInbox = nombre+'|'+correo;
			datosInbox = SalesUp.Sistema.Encript({cadena:datosInbox});
			
			SalesUp.Sistema.AbrePopUp({
				Titulo: 'Nuevo prospecto',
				Pagina: '/privado/PopUpNuevoProspecto.dbsp',
				Parametros:'avanzado=1&datosInbox='+datosInbox+'&idInbox='+idInbox,
				Modal:true, ModalAlt : true, Alto:150, Ancho:500
			});
		}

		/*Eliminar*/
		if(accion==5){
			SalesUp.Inbox.alertaEliminarCorreo({IdInbox:idInbox, idTabInbox:idTabInbox});
		}

		/*responder*/
		if(accion==6){
			var reAsunto = SalesUp.Sistema.StrReplace('RE: ','',jEncontrado.Asunto);
			reAsunto = SalesUp.Sistema.StrReplace('re: ','',reAsunto);
			reAsunto = SalesUp.Sistema.StrReplace('Re: ','',reAsunto);
			reAsunto = SalesUp.Sistema.StrReplace('Rv: ','',reAsunto);
			reAsunto = SalesUp.Sistema.StrReplace('rv: ','',reAsunto);
			reAsunto = SalesUp.Sistema.StrReplace('RV: ','',reAsunto);
			var asunto = 'RE: '+reAsunto;
			var correo = jEncontrado.correoDe;
			var cc = '';
			if(respTodos){cc = $.trim(jEncontrado.cc);}
			SalesUp.Inbox.responderCorreo({idProspecto:idProspecto, asunto:asunto, correo:correo, cc:cc, idInbox:idInbox, idInboxMaster:idInboxMaster});
		}

		/*reenviar*/
		if(accion==7){
			var strReenviar = 'sinProspecto=1&inboxReenviar=1&idInbox='+idInbox;
			SalesUp.Correo.nuevoCorreo({prm:strReenviar});
			/*
			SalesUp.Sistema.AbrePopUp({
				Titulo: 'Nuevo correo',
				Pagina: '/privado/popup_compose_mail.dbsp',
				Parametros:'sinProspecto=1&inboxReenviar=1&idInbox='+idInbox,
				CallBack:'SalesUp.Inbox.correoEnviado',
				Alto:565, Ancho:750
			});
			*/
		}

		/*enviar*/
		if(accion==8){
			var prmEnviar = '&inboxEnviarCorreo='+escape(correoDe)+'&sinProspecto=1';
			(idProspecto) ? prmEnviar += '&ido=&idp='+idProspecto:'';
			
			SalesUp.Correo.nuevoCorreo({prm:prmEnviar});

			/*
			SalesUp.Sistema.AbrePopUp({
				Titulo: 'Enviar correo',
				Pagina: '/privado/popup_compose_mail.dbsp',
				Parametros:prmEnviar,
				CallBack:'SalesUp.Inbox.correoEnviado',
				Alto:565, Ancho:750
			});
			*/
		}

		if(accion==9){
			if(eliminarBtn){$(eliminarBtn).remove();};
			SalesUp.Inbox.seguimientoAutomatico({idInbox:idInbox, auto:seguimientoAuto});
		}
		
	}/*ejecutaAccion*/

	this.NuevoTab = function(){
		SalesUp.Construye.MuestraPopUp({
			alto:'100px', ancho:'400px', centrado:false,
			titulo:'Nueva pestaña',
			fuente:'/privado/PopUpNuevoTabInbox.dbsp', callback:'SalesUp.Inbox.AgregaPestania'
		});
	}/*nuevoTab*/

	this.editarTab = function(Op){
		var idTabInbox = Op.idTabInbox, Icono, Tab, jTab = SalesUp.Variables.jsonInboxTabs.jsonDatos;

		jTab = _.where(jTab, {idTabInbox:idTabInbox})[0];
		Tab = escape(jTab.Tab);
		Icono = jTab.Icono;
		SalesUp.Construye.MuestraPopUp({
			alto:'100px', ancho:'400px', centrado:false,
			titulo:'Editar pestaña',
			fuente:'/privado/PopUpNuevoTabInbox.dbsp?tab='+Tab+'&idTabInbox='+idTabInbox, callback:'SalesUp.Inbox.renombraTab'
		});

		setTimeout(function(){
			SalesUp.Inbox.EsteIcono(Icono);
			$('#frmPestania').attr('action','/privado/Modelo/qryEditarTabInbox.dbsp');
		}, 500);
	}/*editarTab*/

	this.renombraTab = function(Op){
		if(!SalesUp.Variables.respGuardaPopUp){console.error('Editar tab'); return;}
		var jResp 	   = SalesUp.Variables.respGuardaPopUp;
		var idTabInbox = jResp.jsonDatos[0].idTabInbox;
		var Icono 	   = jResp.jsonDatos[0].Icono;
		var Tab 	   = jResp.jsonDatos[0].Tab;
		var noLeidos   = jResp.jsonDatos[0].noLeidos
		var $liTab 	   = $('#TabInbox-'+idTabInbox);
		var $a 		   = $liTab.find('a');
		var strLeidos 	= '',htmlTab;
		
		if(noLeidos){strLeidos = ' <span class="InboxNuevo">'+noLeidos+'</span>';}

		htmlTab = '<i class="fa fa-lg '+Icono+'"></i> '+Tab+strLeidos;
		$a.html(htmlTab);
		SalesUp.Variables.respGuardaPopUp = undefined;
	}

	this.eliminarTab = function(Op){
		var jMail, idTabInbox, jEncontrados, nCorreos;
		idTabInbox = Op.idTabInbox;
		jMail = SalesUp.Variables.jsonInbox.jsonDatos;
		jEncontrados = _.where(jMail,{idTabInbox:idTabInbox});
		nCorreos = _.size(jEncontrados);
		
		var $contenedor = $('#Inbox-'+idTabInbox);
		var $tab = $('#TabInbox-'+idTabInbox);
		var tabDefault = $contenedor.attr('data-tabdefault');

		console.log( 'nCorreos', nCorreos, 'tabDefault', tabDefault);
		if(nCorreos==0){
			if(tabDefault=='-1'){
				eliminarBusqueda({box:$contenedor, tab:$tab, idTabInbox:idTabInbox});
			}else{
				eliminarTabJson({box:$contenedor, tab:$tab, idTabInbox:idTabInbox});
			}
		}else{
			SalesUp.Inbox.alertaEliminarTab(Op);
		}
		MasOpciones();
	}

	this.alertaEliminarTab = function(Op){
		console.log('alertaEliminarTab',Op);
		var idTabInbox = Op.idTabInbox;
		var callback = 'SalesUp.Inbox.cambiarTabInbox({idTabInbox:'+idTabInbox+'})', pregunta = '<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/>¿Estas seguro de eliminar la pastaña?';

		SalesUp.Construye.MuestraAlerta({
			TipoAlerta:'AlertaPregunta', Alerta:pregunta,
			Boton1:'Si, eliminar', Icono1:'<i class="fa fa-trash"></i>', Callback1: callback,
			Boton2:'Cancelar', Icono2:'<i class="fa fa-times"></i>',
			Ancho:'500px'
		});

	}/*alertaEliminarTab*/

	this.cambiarTabInbox = function(Op){
		console.log('cambiarTabInbox',Op);
		
		var idTabInbox = Op.idTabInbox;
		var jAux={}, jTabs = SalesUp.Variables.jsonInboxTabs.jsonDatos;
		var tmpOpcion = '<option value="">(... Seleccione una opción ...)</option>{{#each jsonDatos}}<option value="{{idTabInbox}}">{{Tab}}</option>{{/each}}';
		jAux.jsonDatos = _.reject(jTabs,function(j){return j.idTabInbox==idTabInbox;});

		var com = SalesUp.Construye.ReemplazaDatos({Datos:jAux, Template:tmpOpcion});

		SalesUp.Construye.MuestraPopUp({
			alto:'150px', ancho:'450px', centrado:false, titulo:'Eliminar pestaña',
			fuente:'/privado/PopUpInboxEliminarTab.dbsp?idTabInbox='+idTabInbox
		});

		setTimeout(function(){
			var $ltPestanias = $('#ltPestanias');
			$ltPestanias.html(com);
		}, 50);
	}

	this.activaCambiarTab = function(Op){
		var t = Op.t;/*ando*/
		var idTabInbox = Op.idTabInbox;
		var $ltPestanias = $('#ltPestanias');
		var nuevoIdTab = parseInt($ltPestanias.val());
		
		var prm = 'idTabInbox='+idTabInbox+'&IDNUEVOTAB='+nuevoIdTab;

		console.log('guardado.', nuevoIdTab, prm);

		var jOriginal = SalesUp.Variables.jsonInbox.jsonDatos;
		
		for (var x = 0; x < _.size(jOriginal); x++){
		  if(jOriginal[x].idTabInbox==idTabInbox){
		    jOriginal[x].idTabInbox = nuevoIdTab;
		  }
		}

		$('#TabInbox-'+idTabInbox).remove();
		$('#Inbox-'+idTabInbox).remove();
		$('.tipsy').remove();

		var $tab = $('#Tabs.InboxTabs');
		$tab.tabs('refresh');
		$tab.tabs( "option", "active", 0 );

		SalesUp.Construye.CierraPopUp({t:t});
		SalesUp.Inbox.reconstruyeRows();
		SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-check"></i> Pestaña eliminada.'});
		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/qryInboxEliminarTab.dbsp', parametros:prm, dataType:'html'});
		setTimeout(function(){SalesUp.Inbox.correosSinLeer();}, 1000);
	}

	this.SeleccionarIcono = function(Op){
		var jsonIconos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonListaIconos.dbsp', DataType:'json', Almacen:'jsonListaIconos'});
		var templateIcono = '{{#each jsonDatos}}<button class="Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar Icon" onclick="SalesUp.Inbox.EsteIcono(\'{{icono}}\')"><i class="fa fa-lg {{icono}}"></i></button>{{/each}}';
		var Compilado = SalesUp.Construye.ReemplazaDatos({Template:templateIcono, Datos:jsonIconos});
		SalesUp.Construye.popOver({Elemento:Op.t, PopOverLugar:'bottom', Contenido:Compilado, Clases:'popOverLtIconos'});
	}

	this.EsteIcono = function(I){
		$('#SeleccionarIcono').attr('class','fa fa-lg Pointer Tip6 '+I);
		$('#PestaniaIcono').val(I);
	}
	
	this.AgregaPestania = function(){
		if(!SalesUp.Variables.respGuardaPopUp){console.error('Agregar tab'); return;}
		var jResp 	   = SalesUp.Variables.respGuardaPopUp;
		var idTabInbox = jResp.jsonDatos[0].idTabInbox;
		var nuevo 	   = jResp.jsonDatos[0].nuevo;

		SalesUp.Variables.respGuardaPopUp = undefined;
		var divTab 	= '{{#each jsonDatos}}<div id="Inbox-{{idTabInbox}}"  data-idTabInbox="{{idTabInbox}}" data-tabDefault="{{tabDefault}}">';
			divTab += '<div class="w100 LtCorreos">'+CargandoCorreos+'</div>';
			divTab += '<div class="w100 BoxDetalleInbox" style="display:none;"></div><div class="clear"></div>';
			divTab += '</div>{{/each}}';
		
		var liCompilado = SalesUp.Construye.ReemplazaDatos({Template:li, Datos:jResp});
		divTab = SalesUp.Construye.ReemplazaDatos({Template:divTab, Datos:jResp});
		
		var $tab = $('#Tabs.InboxTabs');
		$tab.find( ".ui-tabs-nav" ).find('#TabInboxNuevoTab').before(liCompilado);
		$tab.append(divTab);
		$tab.tabs('refresh');
		
		var arrLi = $tab.find('li');
		var activar = $tab.find('li#TabInboxNuevoTab').index()-1;
		console.log(_.size(arrLi), activar);
		$tab.tabs( "option", "active", activar );

		if(nuevo){
			SalesUp.Variables.jsonInboxTabs.jsonDatos.push(jResp.jsonDatos[0]);
			SalesUp.Construye.SinResultados({Destino:'#Inbox-'+idTabInbox+' .LtCorreos', Msg:'<i class="fa fa-lg fa-info-circle"></i> Este buzón no tiene correos. '});
		}
		
      	//$('#TabInbox-'+idTabInbox+' a').click();
	}/*AgregaPestania*/

	/*SalesUp.Construye.VerArchivo*/
	

	this.seleccionaRow = function(Op){
		SalesUp.Sistema.activaCheck({t:Op.t});

		var $Elemento = $(Op.t);
		var $Padre = $Elemento.closest('.rowEmail');
		var check =  $Elemento.is(':checked');
		(check) ? $Padre.addClass('Seleccionado') : $Padre.removeClass('Seleccionado') ;

		MasOpciones();

	}/*seleccionaRow*/

	this.moverCorreo = function(Op){
		var t = Op.t, idTabInbox = Op.idTabInbox;
		var $t = $(t);
		var $tabActual = $('.ui-tabs-panel:visible');
		var arrRows = $tabActual.find('.rowEmail.Seleccionado');
		var nRows = _.size(arrRows);

		var ltIdInbox = [], ltIdTabInbox=[], ltProspectos=[];
		for (var i = 0; i < nRows; i++){
			var $r = $(arrRows[i]);
			ltIdTabInbox.push($r.attr('data-idtabinbox'));
			ltIdInbox.push($r.attr('data-inbox'));
			ltProspectos.push($r.attr('data-idprospecto'));
		};
		
		ltIdTabInbox = ltIdTabInbox.join('|');
		ltIdInbox = ltIdInbox.join('|');
		ltProspectos = ltProspectos.join('|');

		SalesUp.Inbox.alertaMoverCorreo({ltIdInbox:ltIdInbox, ltIdTabInbox:ltIdTabInbox, ltProspectos:ltProspectos, idTabInbox:idTabInbox });
	}/*moverCorreo*/

	this.alertaMoverCorreo = function(Op){
		
		var muestraAlerta = function(txt, err, adc){

			if(txt){
				SalesUp.Variables.opcionesAlertaTemporal = adc;
				var idTabInbox = adc.idTabInbox;
				var ltProspectos = adc.ltProspectos;
				var jTabs = SalesUp.Variables.jsonInboxTabs.jsonDatos;
				jTabs = _.where(jTabs,{idTabInbox:idTabInbox})[0];
				var mover = '<i class="fa '+jTabs.Icono +'"></i> '+ jTabs.Tab;
				 
				
				txt = SalesUp.Sistema.StrReplace('{{Movera}}',mover,txt);

				SalesUp.Construye.MuestraPopUp({ contenido:txt, centrado:false, alto:'130px', ancho:'450px'});
				
				if(ltProspectos==''){
					
					setTimeout(function(){
						var $popActual = SalesUp.Variables.popupActual
						$popActual.find('button#BtnEste').remove();
					}, 20);
				}
				return true;
			}

			if(err){console.log(err);}
		}

		SalesUp.Sistema.CargaDatosAsync({link:'/privado/PopUpInboxConfirmaMover.dbsp', almacen:'PopUpInboxConfirmaMover', callback:muestraAlerta, prmAdicionales:Op, dataType:'html'});
		return true;
	}

	this.guardaMoverCorreo = function(Op){ 
		SalesUp.Construye.CierraPopUp({t:Op.t});
		/*falta*/
		var opcion = '&mover='+Op.opcion;
		var opc = SalesUp.Variables.opcionesAlertaTemporal;
		var str = '', ltIdInbox = opc.ltIdInbox, ltIdTabInbox = opc.ltIdTabInbox, ltProspectos = opc.ltProspectos, idTabInbox = opc.idTabInbox;
		str = 'ltIdInbox='+ltIdInbox+'&ltIdTabInbox='+ltIdTabInbox+'&ltProspectos='+ltProspectos+'&idTabInbox='+idTabInbox+opcion;	

		console.log(str);
		SalesUp.Variables.opcionesAlertaTemporal = undefined;

		SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryInboxMoverCorreo.dbsp', Parametros:str});
		
		var arrIdInbox = ltIdInbox.toString().split('|');
		var nCorreos = _.size(arrIdInbox);
		
		/*reconstruyeRows();
		correosSinLeer();
		*/
		var idRegresar = ltIdTabInbox.toString().split('|')[0];
		SalesUp.Inbox.regresarInbox({idTabInbox:idRegresar});

		var jTabs = SalesUp.Variables.jsonInboxTabs.jsonDatos;
		jTabs = _.where(jTabs,{idTabInbox:idTabInbox});
		var tab = jTabs[0].Tab;

		var $tabActual = $('.ui-tabs-panel:visible');
		var tabOrden = $tabActual.index()-1;
		(tabOrden<=0)?tabOrden=0:'';

		SalesUp.Variables.cargaIdTabInbox = parseInt(idRegresar);
		SalesUp.Variables.tabOrden = tabOrden;
		
		SalesUp.Variables.jsonInbox = undefined;
		SalesUp.Variables.jsonInboxTabs = undefined;
		$('#Tabs.InboxTabs').tabs('destroy').hide().html('');
		SalesUp.Inbox.iniInbox();
		
		var mensaje = 'El correo ha sido movido ha "'+tab+'".';
		if(nCorreos>1){mensaje= nCorreos+' correos han sido movidos ha "'+tab+'".';}
		SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-check"></i> '+mensaje});
		
	}/*guardaMoverCorreo*/


	this.alertaEliminarCorreo = function(Op){
		if(!Op){var Op = {};}
		var $tabActual = $('.ui-tabs-panel:visible');
		var arrRows = $tabActual.find('.rowEmail.Seleccionado');
		var nRows = _.size(arrRows);
		var IdInbox = Op.IdInbox;
		var idTabInbox = Op.idTabInbox;
		var deMenu = Op.Menu, callback = 'SalesUp.Inbox.eliminaCorreo({ltIdInbox:'+IdInbox+', idTabInbox:'+idTabInbox+' })', pregunta = '¿Estas seguro de eliminar el correo?';
		
		if(deMenu){
			callback = 'SalesUp.Inbox.confirmaEliminarCorreos';
			pregunta = '¿Estas seguro de eliminar los correos seleccionados ('+nRows+' '+((nRows>1)?'correos':'correo')+')?';
		}

		SalesUp.Construye.MuestraAlerta({
			TipoAlerta:'AlertaPregunta',
			Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> '+pregunta,
			Boton1:'Si, eliminar',
			Boton2:'Cancelar',
			Callback1: callback,
			Icono1:'<i class="fa fa-trash"></i>',
			Icono2:'<i class="fa fa-times"></i>',
			Ancho:'500px'
		});
	}/*alertaEliminarCorreo*/

	this.confirmaEliminarCorreos = function(){
		var $tabActual = $('.ui-tabs-panel:visible');
		var arrRows = $tabActual.find('.rowEmail.Seleccionado');
		var nRows = _.size(arrRows);

		var ltIdInbox = [];
		for (var i = 0; i < nRows; i++){
			var $r = $(arrRows[i]);
			ltIdInbox.push($r.attr('data-inbox'));
		};
		
		ltIdInbox = ltIdInbox.join('|');

		SalesUp.Inbox.eliminaCorreo({ltIdInbox:ltIdInbox});
	}/*confirmaEliminarCorreos*/

	this.eliminaCorreo = function(Op){
		var str = '', ltIdInbox = Op.ltIdInbox, idTabInbox = Op.idTabInbox, Eliminar = true;
		str = 'ltIdInbox='+ltIdInbox;
		(Op.NoEliminar) ? Eliminar = false : '';
		
		var arrIdInbox = ltIdInbox.toString().split('|');
		
		var nCorreos = _.size(arrIdInbox);
		var jOriginal = SalesUp.Variables.jsonInbox.jsonDatos;
		
		for (var x = 0; x < nCorreos; x++) {
			var IdInbox = parseInt(arrIdInbox[x]);
			jOriginal = _.reject(jOriginal, function(j){ return j.IdInbox==IdInbox; });
		}
		
		var j = {};
		j.jsonDatos = jOriginal;
		SalesUp.Variables.jsonInbox = undefined;
		SalesUp.Variables.jsonInbox = j;
		
		reconstruyeRows();
		
		
		if(idTabInbox){
			SalesUp.Inbox.regresarInbox({idTabInbox:idTabInbox});	
		}
		
		if(Eliminar){
			SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryInboxEliminarCorreo.dbsp', Parametros:str});
			var mensaje = 'El correo ha sido eliminado.';
			if(nCorreos>1){mensaje= nCorreos+' correos han sido eliminados.';}
			SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-check"></i> '+mensaje});
			/*SalesUp.Construye.MuestraMsj({tMsg:2, Msg:mensaje, Destino:'#InboxContenido', Tiempo:4000});*/
		}
		setTimeout(function() {correosSinLeer();}, 1000);
	}/*eliminaCorreo*/

	this.SeleccionarTodos = function(Op){
		SalesUp.Sistema.activaCheck({t:Op.t});

		var $Elemento = $(Op.t);
		var $Padre = $Elemento.closest('.rowEmail');
		var check =  $Elemento.is(':checked');

		if(check){
			$Padre.addClass('Seleccionado');
			activarChecks();
			
		}else{
			$Padre.removeClass('Seleccionado');
			desactivarChecks();
		}
	}/*SeleccionarTodos*/

	this.responderCorreo = function(Op){
		var idp = Op.idProspecto;
		var asunto = escape(Op.asunto);
		var correo = escape(Op.correo);
		var idInbox = Op.idInbox;
		var idInboxMaster = Op.idInboxMaster;
		var cc = $.trim(Op.cc);
		var prospecto = '';
		
		if(idInboxMaster==0){idInboxMaster = idInbox;}

		if(idp){
			prospecto = 'idp='+idp;	
		}else{
			prospecto = 'sinProspecto=1';
		}		
		/*aquicompose*/
		var prmEnviar = prospecto+'&asuntoInbox='+asunto+'&correoInbox='+correo+'&inboxCc='+cc+'&inboxResponder=1&idInbox='+idInbox+'&idInboxMaster='+idInboxMaster;
		SalesUp.Correo.nuevoCorreo({prm:prmEnviar});

		/*
		SalesUp.Sistema.AbrePopUp({
			Titulo: 'Responder correo',
			Pagina: '/privado/popup_compose_mail.dbsp', Parametros:prospecto+'&asuntoInbox='+asunto+'&correoInbox='+correo+'&inboxCc='+cc+'&inboxResponder=1&idInbox='+idInbox+'&idInboxMaster='+idInboxMaster,
			CallBack:'SalesUp.Inbox.correoEnviado',
			Modal:true, ModalAlt : true, Alto:565, Ancho:750
		});
		*/
	}/*responderCorreo*/

	this.correoEnviado = function(){
		console.info('correoEnviado');
		SalesUp.Construye.MuestraNotificacion({Mensaje:'Correo enviado.'});
		var arrInboxActual = SalesUp.Variables.idInboxActual;

		if(arrInboxActual){
			var IdInbox = arrInboxActual.IdInbox;
			var idTabInbox = arrInboxActual.idTabInbox;
			var jOriginal = SalesUp.Variables.jsonInbox.jsonDatos;
			
			for (var i =0; i < _.size(jOriginal); i++){
				if(jOriginal[i].IdInbox==IdInbox){
					if (jOriginal[i].idInboxMaster==0){
						jOriginal[i].idInboxMaster = IdInbox;	
					}
					jOriginal[i].conversaciones = jOriginal[i].conversaciones + 1;
				}
			}
			
			var j = {};
			j.jsonDatos = jOriginal;
			SalesUp.Variables.jsonInbox = j;

			SalesUp.Inbox.verDetalleInbox({idTabInbox:idTabInbox, IdInbox:IdInbox});
		}
	}/*correoEnviado*/

	this.contactoAgregado = function(Op){
		var mensaje = 'Contacto agregado como prospecto.';
		var IdInbox = Op.idInbox;
		var idProspecto = Op.idProspecto;
		var tkp = Op.tkp;
		var jInbox = SalesUp.Variables.jsonInbox.jsonDatos;
		var jTabs = SalesUp.Variables.jsonInboxTabs.jsonDatos;
		var jTabs = _.where(jTabs,{tabDefault:2})[0];
		var jEncontrados = _.where(jInbox,{IdInbox:IdInbox})[0];

		var correoDe = jEncontrados.correoDe;
		var idTabInbox = jTabs.idTabInbox;

		var jCorreos = _.where(jInbox,{correoDe:correoDe});

		var ltIdInbox = [];
		for(var x = 0; x < _.size(jCorreos);x++){
		  var j = jCorreos[x];
		  ltIdInbox.push(j.IdInbox);
		}
		
		ltIdInbox = ltIdInbox.join('|');
		
		var $liTab = $('#TabInbox-'+idTabInbox);
		$liTab.find('a').attr('onclick','SalesUp.Inbox.obtieneInbox({idTabInbox:'+idTabInbox+', t:this});');

		var str = 'ltIdInbox='+ltIdInbox+'&idTabInbox='+idTabInbox+'&idProspecto='+idProspecto;
		SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryInboxActualizarCorreosProspecto.dbsp', Parametros:str});

		SalesUp.Inbox.eliminaCorreo({ltIdInbox:ltIdInbox, NoEliminar:true, idTabInbox:idTabInbox});
		SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-check"></i> '+mensaje});
	}/*contactoAgregado*/

	this.agregaLoNuevo = function(Op,err){
	  var jsonInbox = Op, Compilado, jTabs, tabActivo = SalesUp.Variables.tabActivo, $ContInbox = $('#Inbox-'+tabActivo+' .LtCorreos');
	  var template = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateInboxRow.dbsp', Almacen:'TemplateInboxRow'});
	  if(err){return;}
	  jsonInbox = SalesUp.Inbox.preparaJsonInbox(jsonInbox);
	  jTabs = SalesUp.Variables.jsonInboxTabs.jsonDatos;
	  console.log('agregaLoNuevo');
	  console.log(jsonInbox);
	  if(err===null){
	    if(_.size(jsonInbox.jsonDatos)){

	      var totalNuevos = 0;
	      console.log('jTabs',_.size(jTabs));
	      for(var o=0;o<_.size(jTabs);o++){
	        var idTabInbox = jTabs[o].idTabInbox;
	        var count = _.countBy(jsonInbox.jsonDatos , function(j){
	          return j.idTabInbox == idTabInbox  ? 'hay': 'noHay';
	        });
	        var hay = count.hay;
	        (!hay) ? hay = 0 : '';
	        totalNuevos += hay;
	        var $pestania = $('#TabInbox-'+idTabInbox).find('a');
	        var Indicador = $pestania.find('.InboxNuevo');
	        var $Indicador = $(Indicador);
	        if(_.size(Indicador)){
	          var n = parseInt($Indicador.html())+hay;
	          $Indicador.html(n);
	        }else{
	          if(hay>0){
	            $pestania.append('<span class="InboxNuevo">'+hay+'</span>');
	          }
	        }     
	      }
	      
	      /*
	      var $notiGral = $('#notificacionInbox');
	      var indiGral = $notiGral.find('.notiNoLeido');
	      var $indiGral = $(indiGral);
	      if(_.size(indiGral)){
	        var n = parseInt(SalesUp.Variables.TotalCorreos)+totalNuevos;
	        $indiGral.html(n);
	      }else{
	        if(hay>0){
	          $notiGral.append('<span class="notiNoLeido">'+hay+'</span>');
	        }
	      } 
	      */

	      var jOriginal = jsonInbox;

      	  var arrTabsProcesados = $('.ui-tabs-nav li a[onclick*="SalesUp.Inbox.tabActivo"]');
      	  console.log(arrTabsProcesados);
      	  var jProcesa = {jsonDatos:[]};

		  for(var p = 0;p<_.size(arrTabsProcesados);p++){
			var $tabpro = $(arrTabsProcesados[p]);
			var idTabInbox = parseInt($tabpro.attr('data-idtabinbox'));
			(!idTabInbox) ? idTabInbox=0:'';
			var jAux = {jsonDatos:[]};
			var jEncontrado = _.reject(jsonInbox.jsonDatos, function(j){ return j.idTabInbox!=idTabInbox});
			jAux.jsonDatos = jEncontrado;
			
			for(var xx=0;xx<_.size(jEncontrado);xx++){
				jProcesa.jsonDatos.push(jEncontrado[xx]);	
			}
			
			$ContInbox = $('#Inbox-'+idTabInbox+' .LtCorreos');
		    Compilado = SalesUp.Construye.ReemplazaDatos({Template:template, Datos:jAux});
		    
		    $ContInbox.find('#SinResultados').remove();
		    if(SalesUp.Variables.pideLoViejo){ console.info('pideLoViejo');
		    	$ContInbox.append(Compilado); 
		    }else{ 
		    	$ContInbox.prepend(Compilado);
		    }

		    /*SalesUp.Inbox.verMasCorreos({idTabInbox:idTabInbox});*/

		  }/*fin procesa tabs activos*/
	
	      jsonInbox = jProcesa;
	      if (jsonInbox){
	        if(SalesUp.Variables.jsonInbox){
	          var j = SalesUp.Variables.jsonInbox.jsonDatos;
	          SalesUp.Variables.jsonInbox = {};
	          SalesUp.Variables.jsonInbox.jsonDatos = _.union(j,jsonInbox.jsonDatos);
	        }else{
	          SalesUp.Variables.jsonInbox = jsonInbox;
	        }
	      }

	      SalesUp.Sistema.Tipsy();
	      SalesUp.Sistema.InterpretaHtml();
	    }
	    
	    SalesUp.Variables.pideLoViejo = false; $('.verMasServer').remove();
	    $('#refrescarInbox .fa').removeClass('fa-spin');
		SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-check"></i> Inbox actualizado.'});
		$('#refrescarInbox').attr('onclick','SalesUp.Inbox.actualizarInbox({t:this});');
		setTimeout(function(){SalesUp.Inbox.correosSinLeer();}, 1000);
	  }
	}

	this.pideLoNuevo = function(Op,err){
		if(err){return;}
		  var jInbox,maxIdInbox=0;
		  if(err===null){
		    console.log('pideLoNuevo');
		    if (SalesUp.Variables.jsonInbox){
		    	jInbox = SalesUp.Variables.jsonInbox.jsonDatos;
			    if(_.size(jInbox)){maxIdInbox = _.max(jInbox, function(j){return j.maxIdInbox}).maxIdInbox;}
		    }
		    
		    SalesUp.Inbox.correosSinLeer();

		    SalesUp.Sistema.CargaDatosAsync({
		      link:'/privado/Modelo/jsonInboxNuevosCorreos.dbsp',
		      parametros:'IdInbox='+maxIdInbox,
		      callback:SalesUp.Inbox.agregaLoNuevo
		    });
		  }
	}

	this.actualizarInbox = function(Op){
		var nTotalCorreos = parseInt($('#notificacionInbox .notiNoLeido').html());
		(!nTotalCorreos)?nTotalCorreos=0:'';
		SalesUp.Variables.TotalCorreos = nTotalCorreos;


		var $spin = $('#refrescarInbox .fa');
		$('#refrescarInbox').removeAttr('onclick');
		$spin.addClass('fa-spin');

		console.info('actualizarInbox...');

		SalesUp.Sistema.CargaDatosAsync({
		  link:'/privado/Modelo/qrySincronizaInbox.dbsp', 
		  dataType:'html',
		  callback:SalesUp.Inbox.pideLoNuevo
		});

	}/*actualizarInbox*/

	this.sincronizaInboxActivo = function(async){ 
		var SysInboxActivo = SalesUp.Sistema.Almacenamiento({a:'SysInboxActivo'});
		var SysInboxStatus = SalesUp.Sistema.Almacenamiento({a:'SysInboxStatus'});

		SysInboxActivo = (SysInboxActivo) ? parseInt(SysInboxActivo):0;
		SysInboxStatus = (SysInboxStatus) ? parseInt(SysInboxStatus):0;
		
		var pasa = (SysInboxActivo>0)&&(SysInboxStatus>0);
		console.info('*sincronizaInboxActivo', pasa);

		var params;
		if (async)
		  params = '&async=1'		

		if(pasa){
			SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/qrySincronizaInbox.dbsp', dataType:'html', parametros:params});
		}
	}/*sincronizaInboxActivo*/

	var inboxActivo = function(){
		var path = document.location.pathname;
		if(path.indexOf('/privado/Inbox.dbsp')==-1){return;}
		SalesUp.Inbox.sincronizaInboxActivo(true);
	}

	setTimeout(function(){inboxActivo();}, 60000);
	setInterval(inboxActivo,300000);

	var revisaAlertaInbox = function(){
		var path = document.location.pathname;
		if(path.indexOf('/privado/Inbox.dbsp')==-1){return;}
		
		var procesaAlertaInbox = function(Op,err){
			var noLeidosServidor = Op.jsonDatos[0].noLeidos, j = SalesUp.Sistema.Almacenamiento({a:'jsonAlertas'});
			var noLeidosLocal = j.noLeidos;

			if(noLeidosServidor!=noLeidosLocal){
				j.noLeidos = noLeidosServidor;
				SalesUp.Sistema.Almacenamiento({a:'jsonAlertas', v:j});
				SalesUp.Notificaciones.activaNoficaciones();
			}

			console.info('noLeidosServidor', noLeidosServidor,' - noLeidosLocal', noLeidosLocal);
		}

		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonAlertasInbox.dbsp', callback:procesaAlertaInbox});
	}/*revisaAlertaInbox*/

	revisaAlertaInbox();
	setInterval(revisaAlertaInbox,20000);

	this.autoActualizarInbox = function(){ console.info('autoActualizarInbox');

		SalesUp.Inbox.pideLoNuevo({ok:true},null);
		return true;
		
	}

	this.guardarSeguimientosSeleccionados = function(){
		var $tabActual = $('.ui-tabs-panel:visible');
		var arrRows = $tabActual.find('.rowEmail.Seleccionado');
		var nRows = _.size(arrRows);

		var ltIdInbox = [], ltIdTabInbox=[], ltProspectos=[];
		for (var i = 0; i < nRows; i++){
			var $r = $(arrRows[i]);
			ltIdInbox.push($r.attr('data-inbox'));
			ltProspectos.push($r.attr('data-idprospecto'));
		};
		
		ltIdInbox = ltIdInbox.join('|');
		ltProspectos = ltProspectos.join('|');
		
		SalesUp.Inbox.guardarSeguimiento({idProspecto:ltProspectos, idInbox:ltIdInbox});
	}/*guardarSeguimientosSeleccionados*/

	this.guardarSeguimiento = function(Op){
		var ltProspectos = Op.idProspecto, ltIdInbox = Op.idInbox;
		var str = 'ltIdInbox='+ltIdInbox+'&ltProspectos='+ltProspectos;
		SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryInboxGuardarSeguimiento.dbsp', Parametros:str});
		SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-check"></i> Correo guardado como seguimiento.'});

		var arrIdInbox = ltIdInbox.toString().split('|');
		var nCorreos = _.size(arrIdInbox);
		var jOriginal = SalesUp.Variables.jsonInbox.jsonDatos;
		var jCopia = jOriginal;
		var jEncontrado;
		var jRestan = jOriginal;
		var jQuedan = []; 
		var jActualizados = [];


		for (var nx = 0; nx < nCorreos; nx++){
			for(var jx=0;jx<_.size(jOriginal);jx++){
				if(jOriginal[jx].IdInbox == parseInt(arrIdInbox[nx])){
					jOriginal[jx].idSeguimiento = 1;
				}
			}
		}

		SalesUp.Inbox.reconstruyeRows();
	}/*guardarSeguimiento*/

	this.seguimientoAutomatico = function(Op){
		var idInbox = Op.idInbox, auto = Op.auto, prm = 'idInbox='+idInbox+'&auto='+auto;
		var autoGuardado = function(Op,err, adc){
			var idInbox = adc.idInbox, auto = adc.auto, mensaje = 'desactivado.';
			(auto) ? mensaje = 'activado.':'';
			
			if(Op){
				var jOriginal = SalesUp.Variables.jsonInbox.jsonDatos;
				var jMail = jOriginal;

				jMail = _.where(jMail,{IdInbox:idInbox})[0];
				var idp = jMail.Idprospecto;

				for (var x = 0; x < _.size(jOriginal); x++){
				  if(jOriginal[x].Idprospecto==idp){
				    jOriginal[x].seguimientoAuto = (auto)?0:1;
				  }
				}

				SalesUp.Inbox.reconstruyeRows();
				SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-check"></i> Seguimiento automático '+mensaje});
			}
			
		}
		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/qryInboxSeguimientoAuto.dbsp', parametros:prm, callback:autoGuardado, prmAdicionales:Op, dataType:'html'});
	}

	this.marcarLeidos = function(){
		
		var $tabActual = $('.ui-tabs-panel:visible');
		var idTabInbox = $tabActual.attr('data-idtabinbox');
		var $idTabInbox = $('#TabInbox-'+idTabInbox+' a');
		var $InboxNuevo = $idTabInbox.find('.InboxNuevo');
		var Leidos = $InboxNuevo.html();
		var $gralLeidos = $('#notificacionInbox a .notiNoLeido');
		var tNoleidos;

		
		var arrRowsNoLeidos = $tabActual.find('.rowEmail.noLeido.Seleccionado');
		var arrRows = $tabActual.find('.rowEmail.Seleccionado');
		var nRows = _.size(arrRows);
		var ltIdInbox = [];

		var jOriginal = SalesUp.Variables.jsonInbox.jsonDatos;

		for (var i = 0; i < nRows; i++){
		  var $r = $(arrRows[i]);
		  ltIdInbox.push($r.attr('data-inbox'));
		}

		for(var z = 0;z<_.size(ltIdInbox);z++){
		  for (var x = 0; x < _.size(jOriginal); x++){
		    if(parseInt(ltIdInbox[z]) == jOriginal[x].IdInbox){
		      jOriginal[x].noLeido = 1;
		      jOriginal[x].porLeer = false;
		    }
		  }
		}

		ltIdInbox = ltIdInbox.join('|');

		var j = {};
		j.jsonDatos = jOriginal;
		SalesUp.Variables.jsonInbox = j;

		SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryMailTodosLeidos.dbsp', Parametros:'ltIdInbox='+ltIdInbox, DataType:'json'});
		arrRows.removeClass('noLeido');
		$check = $('#seleccionarTodoInbox .faCheck');
		$check.prop('checked',false);
		SalesUp.Inbox.SeleccionarTodos({t:$check});
		setTimeout(function() {correosSinLeer();}, 1000);
	}/*marcarLeidos*/

	this.descargar = function(Op){
		var idInbox = Op.idInbox;
		var archivo = Op.archivo;
		var jResp = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonLinkArchivoInbox.dbsp', Parametros:'archivo='+archivo+'&idInbox='+idInbox, DataType:'json'});
		jResp = jResp.jsonDatos;
		var link = jResp[0].link;
		
		SalesUp.Sistema.OpenInNewTab(link);
	}/*descargar*/

	this.reconstruyeRows = function(){
		reconstruyeRows();
	}

	this.correosSinLeer = function(){
		correosSinLeer();
	}

	this.nuevoCorreo = function(){
		var tke = 'E-62B83098-11FC-4CD3-AA4A-E93DE1C72D6B';
		var stke= localStorage.SysTke;
		if (stke==tke){
			SalesUp.Correo.nuevoCorreo();	
		}else{
			SalesUp.Sistema.AbrePopUp({
				Titulo: 'Nuevo correo',
				Pagina: '/privado/popup_compose_mail.dbsp?sinProspecto=1',
				CallBack:'SalesUp.Inbox.correoEnviado',
				Alto:565, Ancho:750
			});	
		}
		
	}/*nuevoCorreo*/


	this.verArchivo = function(Op){
		
		var ext = function(v,ext){ return v.toLowerCase().indexOf('.'+ext);}
		var DescargaDoc = '', VerRuta = '', TipoExt = 0, HtmlContenido='', link='', jResp, idInbox = Op.idInbox, archivo = Op.archivo;
		
		jResp = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonLinkArchivoInbox.dbsp', Parametros:'archivo='+archivo+'&idInbox='+idInbox+'&ver=1', DataType:'json'});
		jResp = jResp.jsonDatos;
		link  = jResp[0].link;
		
		VerRuta = link;
		DescargaDoc = SalesUp.Sistema.StrReplace('ver=1&','',link);
		
		if((ext(archivo,'jpg')!=-1)||(ext(archivo,'png')!=-1)||(ext(archivo,'jpeg')!=-1)||(ext(archivo,'gif')!=-1)){TipoExt = 0;}
  		if((ext(archivo,'pdf')!=-1)||(ext(archivo,'txt')!=-1)){TipoExt=1;}
  		
		if(TipoExt==0){
			HtmlContenido = '<table id="TablePreviewImg"><tr><td><img onerror="SalesUp.Construye.ErrorPreview(this)" onload="SalesUp.Construye.CargandoPreview(this)" style="display:none;" class="ImgVer" id="ImgVer" src="'+VerRuta+'" /></td></tr></table>';
		}
		
		if(TipoExt==1){
			HtmlContenido = '<iframe onerror="SalesUp.Construye.ErrorPreview(this)" onload="SalesUp.Construye.CargandoPreview(this)" id="IframeVer" class="IframeVer" hspace="0" frameborder="0"  width="880px" height="530px" src="'+VerRuta+'"></iframe>';
		}

		SalesUp.Construye.MuestraVentana({Contenido: HtmlContenido});
		
		$('.ContainerButton').append('<a class="Btn Btn-rounded Btn-tiny-min Btn-tiny Btn-flat-Simple" id="LinkVentanaExterna" target="_blank" href="'+VerRuta+'"><i class="fa fa-external-link"></i> Ver en ventana externa</a>');
		$('.ContainerButton').append('<a class="Btn Btn-rounded Btn-tiny-min Btn-tiny Btn-flat-Simple" id="LinkDescarga" target="_blank" href="'+DescargaDoc+'"><i class="fa fa-cloud-download"></i> Descargar</a>');
		
	}/*verArchivo*/

	this.verPara = function(Op){
		var idInbox = Op.IdInbox, t = Op.t, jsonCc;
		(!idInbox) ? idInbox = Op.idInbox:'';
		jInbox = SalesUp.Variables.jsonInbox.jsonDatos;
		jInbox = _.where(jInbox,{IdInbox:idInbox})[0];
		jsonCc = jInbox.jsonCc;

		var cc = [];
		cc.push('<span>'+$.trim($('#miUsuario').text())+' '+('&lt;'+jInbox.Para+'&gt;')+'</span>');

		for (var ccI = 0; ccI < _.size(jsonCc); ccI++){
			var j = jsonCc[ccI];
			var direccionEmail = (j.address) ? ' &lt;'+j.address+'&gt;' : '';
			cc.push('<span>'+(j.name?j.name:'')+direccionEmail+'</span>');
			
		}

		var templateVerPara = '';
			templateVerPara += '<table cellpadding="0" class="tblVerPara">';
			templateVerPara += '	<tbody>';
			templateVerPara += '		<tr class="ajv">';
			templateVerPara += '			<td colspan="2" class="gG"> <span class="gI">de:</span>	</td>';
			templateVerPara += '			<td colspan="2"><span class="gI"><span class="gD">'+jInbox.De+'</span> <span class="go"> &lt;'+jInbox.correoDe+'&gt; </span></span></td>';
			templateVerPara += '		</tr>';
			templateVerPara += '		<tr class="ajv">';
			templateVerPara += '			<td colspan="2" class="gG"><span class="gI">para:</span></td>';
			templateVerPara += '			<td colspan="2"><span class="gI">[para]</span></td>';
			templateVerPara += '		</tr>';
			templateVerPara += '		<tr class="ajv">';
			templateVerPara += '			<td colspan="2" class="gG"><span class="gI">fecha:</span></td>';
			templateVerPara += '			<td colspan="2"><span class="gI">'+jInbox.Fecha+' '+jInbox.Hora+'</span></td>';
			templateVerPara += '		</tr>';
			templateVerPara += '		<tr class="ajv">';
			templateVerPara += '			<td colspan="2" class="gG"><span class="gI">asunto:</span></td>';
			templateVerPara += '			<td colspan="2"><span class="gI">'+jInbox.Asunto+'</span></td>';
			templateVerPara += '		</tr>';
			templateVerPara += '	</tbody>';
			templateVerPara += '</table><div class="clear"><div/>';

		cc = cc.join(', ');
		templateVerPara = SalesUp.Sistema.StrReplace('[para]',cc,templateVerPara);
		SalesUp.Construye.popOver({Elemento:t, PopOverLugar:'right', Contenido:templateVerPara, Clases:'popoverVerPara'});
	}/*verPara*/

	this.CargaDatosAsync = function(Op){
		
		$('.tipsy').remove();
		var linkFile, parametros='', destino, callback, objecto, esPagina, dataType='json', almacen, Respuesta='';

		(Op.link)		? linkFile 	 = Op.link : '';
		(Op.parametros) ? parametros = Op.parametros : '';
		(Op.callback)	? callback   = Op.callback : '';
		(Op.dataType)	? dataType   = Op.dataType : '';
		(Op.almacen)	? almacen    = Op.almacen:'';
		
		$.ajaxSetup({beforeSend:function(xhr){xhr.overrideMimeType('text/json; charset=iso-8859-1;');}});

		$.ajax({ type:'GET', async:true, dataType: dataType, cache: false,
			url: linkFile, data: parametros
		}).done(function(RespuestaData){
			
			var jsonTemp = {};
			jsonTemp.jsonDatos = _.reject(RespuestaData.jsonDatos, function(j){return _.size(j)==0;});
			RespuestaData = jsonTemp;
			
			var jsonInbox = RespuestaData;
			
			if (_.size(jsonInbox.jsonDatos)){
				jsonInbox = preparaJsonInbox(jsonInbox);

				if(SalesUp.Variables.jsonInbox){
					var j = SalesUp.Variables.jsonInbox.jsonDatos;
					SalesUp.Variables.jsonInbox = {};
					SalesUp.Variables.jsonInbox.jsonDatos = _.union(j,jsonInbox.jsonDatos);
				}else{
					SalesUp.Variables.jsonInbox = jsonInbox;
				}	
			}
			
			$.ajaxSetup({ 'beforeSend' : function(xhr) { xhr.overrideMimeType('text/html; charset=iso-8859-1;'); } });
		});

	}/* /CargaDatosAsync */

}/*myinbox*/

$(function(){
	var path = document.location.pathname.toLocaleLowerCase();

	if (path.indexOf('verinbox.dbsp')!=-1){
		SalesUp.Inbox.verInbox();
		return;
	}

	if (path.indexOf('inbox.dbsp')!=-1){
		//console.log('ready');
		//SalesUp.Sistema.BorrarItemDeAlmacen('TemplateInboxRow'); SalesUp.Sistema.BorrarItemDeAlmacen('TemplateInboxDetalle'); SalesUp.Sistema.BorrarItemDeAlmacen('TemplateInboxDetalleCadena'); SalesUp.Sistema.BorrarItemDeAlmacen('PopUpInboxConfirmaMover'); 
		SalesUp.Inbox.iniInbox();
		$(window).resize(function(){ SalesUp.Inbox.ajustarAltoInbox(); });	
	}
});











