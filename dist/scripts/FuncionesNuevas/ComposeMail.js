var ComposeMail = function(){
	var composeCompleto = 0;
	var noConfig  = '';
		noConfig += '<div class="[clase] w100" id="MsgConfigMail"> ';
		noConfig += '	<i class="fa fa-lg fa-warning"></i>';
		noConfig += '	[mensaje] ';
		noConfig += '	<span onclick="SalesUp.Correo.configurarSalidaCorreo({t:this});" class="Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar Pointer" id="ConfigCorreo" style="float:right;">';
		noConfig += '		<i class="fa fa-lg fa-gear"></i> Configurar ahora';
		noConfig += '	</span>';
		noConfig += '</div>';

	var obtenerFirma = function(){
		var agregaFirma = function(resp, err){
			if (resp){ 
				SalesUp.Variables.firmaCorreo = resp;
				
				$('#contenidoCorreo').html(resp);
				
				tinymce.init({
					selector: "#contenidoCorreo",
					language_url : _TinyMce.Idioma,
					browser_spellcheck : true,
					width:"100%", height: "330",
					resize: false,
					statusbar : false,
					menubar: false,
					plugins: _TinyMce.PlugIns,
					fontsize_formats: _TinyMce.FontSize,
					toolbar_items_size: _TinyMce.ItemsSize,
					toolbar: _TinyMce.ToolBar,
					content_css : _TinyMce.ContentCss,
					setup: _TinyMce.AccionesEspecificas
				});

				composeCompleto += 1;

				/*
				setTimeout(function(){ 
					tinyMCE.get('contenidoCorreo').setContent(resp);
				}, 1000);
				*/
			}
		}/*agregaFirma*/
		SalesUp.Sistema.CargaDatosAsync({link:'/privado/firma.dbsp', dataType:'html', callback:agregaFirma, almacen:'htmlFirma'});
	}/*obtenerFirma*/

	var activaTiny = function(){
		obtenerFirma();
	}

	var cargaPlantillas = function(){

		var iniPlantillas = function(Op, err){
			if(Op){
				var grupos = [ { GRUPO: ''}, {GRUPO: 'PROPIAS'}, {GRUPO: 'COMPARTIDAS'}];
				var orden = ['','PROPIAS', 'COMPARTIDAS'];
				var strPlantillas = '[{"IDGRUPO":0,"IDPLANTILLA":-1,"IDUSUARIO":0,"ASUNTO":"","COMPARTIRCON":0,"DESCRIPCION":"Ninguna plantilla","ORDEN":0,"GRUPO":""}]';
				strPlantillas = JSON.parse(strPlantillas);
				var arrPlantillas = _.union(strPlantillas,Op.jsonDatos);

				$('#plantillas').selectize({
					render:{item:function(data){return '<div class="Ellipsis plantillaSeleccionada">'+data.DESCRIPCION+'</div>'}},
					maxItems:1, openOnFocus:true,
					valueField:'IDPLANTILLA', labelField:'DESCRIPCION',
					searchField:['DESCRIPCION'],
					options:arrPlantillas,
					optgroups:grupos, optgroupField: 'GRUPO', optgroupLabelField: 'GRUPO',
					optgroupValueField: 'GRUPO', optgroupOrder: orden,sortField:'DESCRIPCION'
				});

				$('.selectize-control.ltPlantillas ').addClass('BoxSizing InfoData');
				composeCompleto += 1;
			}
		}/*iniPlantillas*/
		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonPlantillas.dbsp', callback:iniPlantillas });
	}/*cargaPlantillas*/

	var etiquetasUsuario = function(){
		var procesaEtiquetasUsr =function(Op, err){
			if (Op){SalesUp.Variables.etiquetasUsr = Op.jsonDatos[0]; composeCompleto += 1;}
		}
		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonEtiquetasUsuario.dbsp', almacen:'jsonEtiquetasUsuario', callback:procesaEtiquetasUsr});
	}/*etiquetasUsuario*/

	var RevisarAdjuntosAgregados;
	var SeAgregaronAdjuntos = function(){
		var $esComposeMail = $('#esComposeMail');
		if (!_.size($esComposeMail)){return;}
		var nAdjuntos = _.size($(".MultiFile-label"));
		var $popupActual = SalesUp.Variables.popupActual;
		if (!$popupActual){return;}
		$popupActual.find('.BodyModal').css('height','530px');
		$('#DocAgregado, #titAdjuntosCompose, #listafile').hide();
		
		if(nAdjuntos){ 
			$popupActual.find('.BodyModal').css('height','585px');
			$('#titAdjuntosCompose,#DocAgregado, #listafile').show(); $('#DocAgregado').html(nAdjuntos);
		}
	}

	var correoProspecto = function(){
		var idp = $('#popupComposeMail').find('#idprospecto').val();
		var tkp = $('#popupComposeMail').find('#tkp').val();
		if ((idp=='')&&(tkp=='')){ composeCompleto += 1; return true;}
		var procesaInfoProspecto = function(Op, err){
			if(Op){
				
				var jp = Op.jsonDatos[0];
				var contacto = jp.Nombre+ ' ' +$.trim(jp.Apellidos), correo = jp.Correo;
				var correoAdicional = SalesUp.Variables.enviarCorreoAdicional;
				(correoAdicional) ? correo = correoAdicional : '';
				
				$selectizePara = obtieneSelector('ltPara');
				$selectizePara.addOption({
					contacto:contacto,
					correo:correo,
					tkp:tkp,
					/*idProspecto:idp,*/
					tipo:2
				});
				
				$('#correoContacto').val(correo);
				$selectizePara.setValue(correo);
				setTimeout(function(){$('#asunto').focus();}, 200);
			}
			composeCompleto += 1;
		}/*procesaInfoProspecto*/

		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonDatosProspecto.dbsp', parametros:'idp='+idp+'&tkp='+tkp, callback:procesaInfoProspecto});
	}/*correoProspecto*/
	
	var inboxEnviarCorreo = function(){
		var strInboxEnviarCorreo = SalesUp.Variables.inboxEnviarCorreo;
		var idp = $('#popupComposeMail').find('#idprospecto').val();
		if(!strInboxEnviarCorreo){return;}
		if(idp){return;}

		var $selectizePara = obtieneSelector('ltPara');
		$selectizePara.addOption({
			contacto:strInboxEnviarCorreo,
			correo:strInboxEnviarCorreo,
			tipo:0
		});
		$('#correoContacto').val(strInboxEnviarCorreo);
		$selectizePara.setValue(strInboxEnviarCorreo);
		
	}/*inboxEnviarCorreo*/

	var responderCorreo = function(){
		var cc = SalesUp.Variables.inboxCc, responder = SalesUp.Variables.inboxResponder;

		if (SalesUp.Variables.correoInbox){
			SalesUp.Variables.inboxEnviarCorreo = SalesUp.Variables.correoInbox;
			inboxEnviarCorreo();
		}
		
		if(cc){
			var splitCc = cc.split(',');
			var $selectizeCc = obtieneSelector('ltCc');

			for (var ncc = 0; ncc <_.size(splitCc) ; ncc++){
				$selectizeCc.addOption({
					contacto:splitCc[ncc],
					correo:splitCc[ncc],
					tipo:0
				});
			}
			
			$selectizeCc.setValue(splitCc);
			$('#ltCc').val(cc);

			SalesUp.Correo.verCc();
		}

		if(responder){
			setTimeout(function(){
			  tinymce.execCommand('mceFocus',false,'#contenidoCorreo');
			},800);
		}
	}/*responderCorreo*/

	var reenviarCorreo = function(){
		if(SalesUp.Variables.inboxReenviar==''){return;}
		var bodyMail = self.parent.SalesUp.Inbox.obtenerBody({idInbox:SalesUp.Variables.idInbox});
		var strAdjuntos = self.parent.SalesUp.Inbox.obtenerAttachments({idInbox:SalesUp.Variables.idInbox});	
		if(strAdjuntos!=''){
			SalesUp.Variables.tieneAdjuntosReenviar = true;
			SalesUp.Variables.parametrosCiaa = self.parent.SalesUp.Inbox.preparaLinkCopiarArchivosInbox({idInbox:SalesUp.Variables.idInbox})+SalesUp.Sistema.StrReplace('/','',strAdjuntos);
		}

		setTimeout(function(){
			tinyMCE.get('contenidoCorreo').setContent(bodyMail);
			var $frmCompose = $('#popupComposeMail').find('#frmPopupComposeMail');
			$frmCompose.find('#ltAdjuntosReenviar').remove();
			$frmCompose.prepend('<input type="hidden" name="ltAdjuntosReenviar" id="ltAdjuntosReenviar"/>');
			$frmCompose.find('#ltAdjuntosReenviar').val(strAdjuntos);
		},1000);

	}/*reenviarCorreo*/

	var adjuntarEsteArchivo = function(){ 
		if(!SalesUp.Variables.ArchivoFisico){ return false;}
		var Archivo = '<div class="MultiFile-label"><span class="MultiFile-title">'+SalesUp.Variables.NombreArchivoFisico+'</span></div>';
		$('#listafile').show().append(Archivo);
	}


	var sinConfigurar = function(Op){
		var mal = Op.mal;
		var clase = 'BoxMsgWarning';
		var msg = 'Para poder enviar correos se necesita configurar una cuenta de correo electrónico.';
		
		if(mal==2){
			msg = 'Hay un error con la cuenta de correo electrónico proporcionada, revisar la configuración';
			clase = 'DatoMal';
		}
		
		noConfig = SalesUp.Sistema.StrReplace('[mensaje]',msg,noConfig);
		noConfig = SalesUp.Sistema.StrReplace('[clase]',clase,noConfig);
		
		$('#popupComposeMail').find('#popup-contenedor').hide().before(noConfig);
		$('#MsgConfigMail').show();
		$('#popupComposeMail').find('.BodyModal').css('height','90px');
		SalesUp.Construye.QuitaEsperaGuardando();
	}/*sinConfigurar*/
	
	this.configurarSalidaCorreo = function(Op){
		SalesUp.Construye.CierraPopUp({t:Op.t});
		setTimeout(function(){
			SalesUp.Ventana.AgregarCuenta();
		}, 1500);
	}

	var validaActivoCompose = function(){
		var SysComposeActivo = SalesUp.Sistema.Almacenamiento({a:'SysComposeActivo'});
		var SysComposeStatus = SalesUp.Sistema.Almacenamiento({a:'SysComposeStatus'});
		SysComposeActivo = parseInt(SysComposeActivo);
		SysComposeStatus = parseInt(SysComposeStatus);

		if(SysComposeActivo==0){
			sinConfigurar({mal:1});
			return false;
		}

		if((SysComposeActivo>0)&&(SysComposeStatus==0)){
			sinConfigurar({mal:2});
			return false;
		}

		if((SysComposeActivo>0)&&(SysComposeStatus>0)){
			// console.info('ComposeMail by SalesUp!');
			return true;
		}
	}/*validaActivoCompose*/

	var correosSalida = function(){
		var SysComposeActivo = SalesUp.Sistema.Almacenamiento({a:'SysComposeActivo'});
		SysComposeActivo = parseInt(SysComposeActivo);
		
		var procesaCorreosSalida = function(Op,err){
			if (Op){
				var jsonCorreos = Op;
				var tmp = '{{#each jsonDatos}}<option {{#if predeterminado}}selected="selected"{{/if}} value="{{idUsuarioCorreo}}">{{de}} ({{proveedor}}) {{#if estado}}(Revisar configuración presenta error.){{/if}}</option>{{/each}}';
				var compilado = SalesUp.Construye.ReemplazaDatos({Datos:jsonCorreos,Template:tmp});
				
				$('#de').show();
				$('#correoDe').html(compilado);
			}
		}
		if(SysComposeActivo>1){
			SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonCorreosSalida.dbsp', callback:procesaCorreosSalida});
		}
	}/*correosSalida*/

	var iniArchivos = function(){
		SalesUp.Valida.ExtensionesPermitidas();
		$('#archivo').attr('accept',SalesUp.Variables.ExtPermintidas);
		setTimeout(function(){
			$("#popupComposeMail input[type=file].MultiFile").MultiFile();
		}, 500);
	}/*iniArchivos*/
	var intervalComposeListo;
	var composeListo = function(){
		if (composeCompleto===4){
			$('#popupComposeMail .OverlayGuardando').remove();
			window.clearInterval(intervalComposeListo);
		}
	}

	this.iniCompose = function(){
		SalesUp.Construye.ActivaEsperaGuardando();
		composeCompleto = 0;
		if(!validaActivoCompose()){return;}
		
		iniArchivos();
		activaTiny();
		cargaPlantillas();
		etiquetasUsuario();
		SalesUp.Correo.para();
		SalesUp.Correo.cc();
		SalesUp.Correo.cco();
		
		correoProspecto();
		inboxEnviarCorreo();
		responderCorreo();
		reenviarCorreo();
		correosSalida();
		adjuntarEsteArchivo();
		RevisarAdjuntosAgregados = window.setInterval(SeAgregaronAdjuntos, 1000);
		intervalComposeListo = window.setInterval(composeListo, 500);
	}/*iniCompose*/


	this.nuevoCorreo = function(Op){
		(!Op)?Op={}:'';
		var prm='?', idp = (Op.idp)?'&idp='+Op.idp:'',ido = (Op.ido)?'&ido='+Op.ido:'', prmAdicionales = (Op.prm)?Op.prm:'';
		var tkp = (Op.tkp) ? Op.tkp:'', tko = (Op.tko)?Op.tko:'';

		if(tkp){tkp = '&tkp='+tkp;/*idp='';*/}
		if(tko){tko = '&tko='+tko;/*ido='';*/}
		
		prm += tkp+tko+idp+ido+prmAdicionales;
		
		SalesUp.Construye.MuestraPopUp({  /*centrado:false,*/
			alto:'530px', ancho:'900px', id:'popupComposeMail',
			titulo:'Enviar correo',
			fuente:'/privado/popUpComposeMail.dbsp'+prm
		});
		
		setTimeout(function(){SalesUp.Correo.iniCompose();}, 50);
	}

	this.verCc = function(){
		var $boxCc = $('#boxCc'), visible =  $boxCc.is(':visible');
		if(visible){
			$boxCc.hide();
		}else{
			$boxCc.show();
			$boxCc.find('input').focus();
		}
	}

	this.verCco = function(){
		var $boxCco = $('#boxCco'), visible =  $boxCco.is(':visible');
		if(visible){
			$boxCco.hide();
		}else{
			$boxCco.show();
			$boxCco.find('input').focus();
		}
	}

	this.verDe = function(){
		var $boxDe = $('#boxDe'), visible =  $boxDe.is(':visible');
		if(visible){
			$boxDe.hide();
		}else{
			$boxDe.show();
			$boxDe.find('select').focus();
		}
	}

	var procesaAdjuntoPlantilla = function(jsonAdjuntos){ 
		var ltAdjuntos = '';
		
		jsonAdjuntos = _.reject(jsonAdjuntos,function(j){return _.size(j)==0;});
		
		for (var ja = 0; ja < _.size(jsonAdjuntos); ja++){
			ltAdjuntos += '<div class="MultiFile-label adjuntosPlantillas"><span class="MultiFile-title">'+jsonAdjuntos[ja].Nombre+'</span></div>';
		}
		$('#listafile').append(ltAdjuntos);
	}

    var htmlEncodeCaracteresEspeciales = function(data){
    	return data.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"');
    	
    }

	this.cargaPlantilla = function(Op){
		var sinProspecto = 0, idplantilla, idprospecto, idoportunidad, parametrosPlantilla;
		var procesaPlantilla = function(Op, err){
			var jsonPlantilla = Op.jsonDatos[0], jsonAdjuntos = Op.jsonAdjuntos, texto, asunto, sinProspecto = 0, arrayEtiquetas, idprospecto = $("#idprospecto").val();
			var tkp = $('#tkp').val(), tko = $('#tko').val();
			
			if (Op){
				procesaAdjuntoPlantilla(jsonAdjuntos)
				
				texto = jsonPlantilla.TEXTO;
				asunto = jsonPlantilla.ASUNTO;
				asunto = htmlEncodeCaracteresEspeciales(asunto);
				
				(idprospecto=='')?sinProspecto = 1:'';
				(!tkp)?sinProspecto = 1:'';

				if(sinProspecto = 0){
					
					objEtiquetas = SalesUp.Variables.etiquetasUsr;
					arrayEtiquetas = _.keys(objEtiquetas), arrayValores = _.values(objEtiquetas);
					for (var ei = 0; ei < arrayEtiquetas.length; ei++) {
						var etiquetaActual = '['+arrayEtiquetas[ei]+']', valorEtiqueta = arrayValores[ei];
						texto = SalesUp.Sistema.StrReplace(etiquetaActual, valorEtiqueta, texto);
						asunto = SalesUp.Sistema.StrReplace(etiquetaActual, valorEtiqueta, asunto);
					}	
				}else{
					var arrCorreosSeleccionados = $('.selectize-control.ltPara').find('.correosSeleccionados'), nSeleccionados = _.size(arrCorreosSeleccionados);
					var arrContactosSeleccionados = $('.selectize-control.ltPara').find('.correosSeleccionados[data-tipo="2"]'), nContactos = _.size(arrContactosSeleccionados);
					var $frm = $('#frmPopupComposeMail'), $correoContacto = $frm.find('#correoContacto'), $idprospecto = $frm.find('#idprospecto'), $tkp = $frm.find('#tkp');
					var vCorreo = $correoContacto.val(), tkp = $tkp.val(), idp = $idprospecto.val(), tProspecto=0, vCc = $('#ltCc').val();
					var $selectizePara = obtieneSelector('ltPara'), $selectizeCc = obtieneSelector('ltCc');
					var ltCorreos = [], ccActuales = [];

					for(var cs=0;cs<nSeleccionados;cs++){
						var $cs = $(arrCorreosSeleccionados[cs]), tipoCs = $cs.attr('data-tipo');
						var tkpCs = $cs.attr('data-tkp'), idpCs = $cs.attr('data-idprospecto'), vCs = $cs.attr('data-value'), contactoCs = $cs.attr('data-contacto');

						if(tkp!=tkpCs){
							
							ltCorreos.push(vCs);

							if(tipoCs==0){ 
								$selectizeCc.addOption({contacto:contactoCs,correo:vCs});
							}

							if(tipoCs==2){
								$selectizeCc.addOption({
									contacto:contactoCs,
									correo:vCs,
									tkp:tkpCs, 
									/*idProspecto:idpCs,*/
									tipo:tipoCs
								});
							}
						}
					}

					if (_.size(ltCorreos)){
						$('#boxCc').show();
						
						for (var mc = 0; mc < _.size(ltCorreos); mc++){
							$selectizePara.removeItem(ltCorreos[mc]);
						}

						if(vCc!=''){ ccActuales = vCc.split(','); }

						ltCorreos = _.union(ccActuales, ltCorreos);
						$selectizeCc.setValue(ltCorreos);
						
					}
				}

				$('#asunto').val(asunto);
				tinyMCE.get('contenidoCorreo').setContent(texto);
			}

			if(err){
				tinyMCE.get('contenidoCorreo').setContent('Hubo un error al cargar la plantilla, intentalo nuevamente.');
			}
		}/*procesaPlantilla*/

		idplantilla = Op.v;
		
		idprospecto = $("#idprospecto").val(); idoportunidad = $("#idoportunidad").val();

		var tkp = $('#tkp').val(), tko = $('#tko').val();
		$('#idplantilla').val(idplantilla);
		((idprospecto=='')&&(tkp==''))?sinProspecto = 1:'';

		$('#listafile').find('.adjuntosPlantillas').remove();

		if((idplantilla==-1)||(idplantilla=='')){
			tinyMCE.get('contenidoCorreo').setContent(SalesUp.Variables.firmaCorreo);
			return true;
		}
		
		tinyMCE.get('contenidoCorreo').setContent('Cargando...');
		
		parametrosPlantilla = 'idpl='+idplantilla+'&idplantilla='+idplantilla+'&tkp='+tkp+'&tko='+tko+'&sinProspecto='+sinProspecto+'&idprospecto='+idprospecto+'&idoportunidad='+idoportunidad;

		SalesUp.Sistema.CargaDatosAsync({ link:'/privado/Modelo/jsonContenidoPlantilla.dbsp', parametros:parametrosPlantilla, callback:procesaPlantilla});

	}/*cargaPlantilla*/

	this.adjuntarArchivos = function(Op){
		var PopOverId = SalesUp.Construye.IdUnico();
		var TemplatePopover = '<div class="popover PopOverAcciones PopOverNuevoEvento" id="'+PopOverId+'" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>';
		var QueHacer = '';
		var idAdjuntarMicomputadora = SalesUp.Construye.IdUnico();
		var idp = $('#idprospecto').val();
		var tkp = $('#tkp').val();
		var ido = $('#idoportunidad').val();
		var tko = $('#tko').val();
		var pasa = true;
		var AdjuntosDel='Archivos del contacto';
		if(idp.indexOf(',')!=-1){pasa=false;}
		if(tkp==''){pasa=false;}
		if(tko!=''){AdjuntosDel='Archivos de la oportunidad';}
		QueHacer += '<span id="'+idAdjuntarMicomputadora+'" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-desktop"></i> Mi computadora</span>';
		QueHacer += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Correo.desdeLaNube();"><i class="fa fa-lg fa-cloud"></i> Documentos</span>';
		
		if(pasa){
			QueHacer += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Correo.desdeArchivosProspecto();"><i class="fa fa-lg fa-folder"></i> '+AdjuntosDel+'</span>';
		}

		var $Elemento = $(Op.Elemento);
		$Elemento.popover('destroy');
		$Elemento.popover({ template:TemplatePopover, placement:'top', html:true, container:'body', title:'', content:QueHacer });            
		$Elemento.popover('show');

		var $PopOverId = $('#'+PopOverId);
		var Cerrar = true;
		$PopOverId.mouseleave(function(){ Cerrar = true; setTimeout(function(){ (Cerrar) ? $PopOverId.hide():'';}, 500);})
		.mouseenter(function(){ Cerrar = false;});
		//.click(function(){ $PopOverId.hide(); });

		$.fn.MultiFile.reEnableEmpty();
		var $inputFile = $('.MultiFile.MultiFile-applied').last();
		$inputFile.attr('style','position: absolute; top: -1000px;');
		$('#'+idAdjuntarMicomputadora).click(function(){
			$inputFile.click();
			$PopOverId.hide();
		});
		
	}/*adjuntarArchivos*/

	this.desdeLaNube = function(){
		SalesUp.Construye.MuestraAlerta({
			TipoAlerta:'AlertaPregunta', Ancho:'98%', Id:'AgregarAdjuntosNube',
			Alerta: '<iframe frameborder="0" style="width:100%;height:450px;display:inline-block;" src="/privado/PopUpSeleccionarArchivos.dbsp?Desde=NuevoCompose" hspace="0"></iframe>'
		});
		$('#AgregarAdjuntosNube .PieModal').hide();
	}

	this.quitarArchivoAgregado = function(Op){
		/*MultiFile-title*/
		var $Elemento = $(Op.e);
		var adp = Op.adp;
		var Archivo = Op.Archivo;
		var $LtArchivosAgregados = $('#LtArchivosAgregados');
		
		if(adp==1){$LtArchivosAgregados = $('#LtArchivosAgregadosProspecto');}

		var LtArchivosAgregados = $LtArchivosAgregados.val();
		LtArchivosAgregados = SalesUp.Sistema.StrReplace(Archivo,'',LtArchivosAgregados);
		$LtArchivosAgregados.val(LtArchivosAgregados);
		$Elemento.remove();
	}


	this.mostrarAdjuntos = function(){
		$.fn.MultiFile.reEnableEmpty();
		var $inputFile = $('.MultiFile.MultiFile-applied').last();
		$inputFile.attr('style','');
		/**/
		setTimeout(function(){
			$inputFile.click();
			
			
			/*
			var idInputFile = $inputFile.attr('id');
			var evt = document.createEvent("MouseEvents");  
		    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);  
		    document.getElementById(idInputFile).dispatchEvent(evt);
		    */
		}, 500);
	}/*mostrarAdjuntos*/
	
	this.desdeArchivosProspecto = function(){
		var idp=$('#idprospecto').val(), ido=$('#idoportunidad').val();
		var tkp=$('#tkp').val(), tko=$('#tko').val();
		SalesUp.Construye.MuestraAlerta({
			TipoAlerta:'AlertaPregunta', Ancho:'98%', Id:'AgregarAdjuntosNube',
			Alerta:'<iframe frameborder="0" style="width:100%;height:450px;display:inline-block;" src="/privado/PopUpSeleccionarArchivos.dbsp?tkp='+tkp+'&tko='+tko+'&idp='+idp+'&ido='+ido+'&TipoAdjuntos=Contacto&Desde=NuevoCompose" hspace="0"></iframe>'
		});

		$('#AgregarAdjuntosNube .PieModal').hide();
	}

	this.agregaArchivo = function(Op){
		var t = $(Op.t);
	}

	this.programarCorreo = function(){
		var Programar = '';
		Programar += '<form class="w100" id="frmProgramarCorreo">';
		Programar += '  <p class="w100">Seleccione la fecha y hora en que se enviará el correo.</p>';
		Programar += '	<div class="w50 BoxInfo"><label class="BoxSizing InfoLabel">Fecha</label><input class="BoxSizing InfoData InfoObligatorio tCen" id="FechaProgramada" type="text" readonly="readonly" value="'+$('#pc-fecha').val()+'"/><div class="clear"></div></div>';
		Programar += '	<div class="w50 BoxInfo"><label class="BoxSizing InfoLabel">Hora</label><input class="BoxSizing InfoData InfoObligatorio tCen" id="HoraProgramada" type="text" readonly="readonly" value="'+$('#pc-hora').val()+'"/><div class="clear"></div></div>';
		Programar += '	<div class="clear"></div></form><div class="clear"></div>';
		
		
		SalesUp.Construye.MuestraAlerta({
			TipoAlerta:'AlertaPregunta', Ancho:'40%', Id:'AlertaProgramarCorreo',
			Alerta: Programar, Boton1:'Aceptar', Icono1:'<i class="fa fa-check fa-lg"></i>', Boton2:'Cerrar'
		});
		
		$('#FechaProgramada').datepicker(ConfiguracionPickerNoFechasPasadas);
		$HoraProgramada = $('#HoraProgramada');

		$HoraProgramada.clockpicker({ 
			autoclose:true, setMinutos:15, 'default':'12:00',
			afterDone: function(){
				var hr = $HoraProgramada.val();
				var splitHr = hr.split(':');
				var min = parseInt(splitHr[1]);
				if(min==0){
					min = '00';
				}else if(min<=15){
					min = '15';
				}else if(min<=30){
					min = '30';
				}else if(min<=45){
					min = '45';
				}else if(min>45){
					min = '00';
				}
				hr = splitHr[0]+':'+min;
				$HoraProgramada.val(hr);
			}
		});

		var $PieModal = $('#AlertaProgramarCorreo .PieModal');
		var botones = '<a class="btnNegativo Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Cancelar" onclick="SalesUp.Construye.CierraAlerta({Elemento:this});"><i class="fa fa-times"></i> Cerrar</a>';
		   botones += '<a class="btnAccion Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" onclick="SalesUp.Correo.ActivaProgramarCorreo({Elemento:this});"><i class="fa fa-check"></i> Aceptar</a>';
		$PieModal.html(botones);
		
		$('#BtnAceptar').removeClass('Tada');
	}

	this.ActivaProgramarCorreo = function (Op){
		var $fecha = $('#FechaProgramada'), $hora = $('#HoraProgramada'), $elemento;
		var vFecha = $fecha.val(), vHora = $hora.val();
		var pasa = true, msg = '';

		if (vFecha==''){
			pasa = false; msg = 'Se necesita una fecha';
			$elemento = $fecha;
		}

		if (vHora==''){
			pasa = false; msg = 'Se necesita una hora';
			$elemento = $hora;
		}
		
		if(!pasa){
			SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'#AlertaProgramarCorreo .ContenedorModal', Msg:msg });
			SalesUp.Valida.MarcarObligatorio($elemento);
			SalesUp.Valida.FocusMal();
			return;
		}
			
		if(pasa){
			$('#inputProgramarCorreo').val(1);
			$('#pc-fecha').val(vFecha);
			$('#pc-hora').val(vHora);
			$('#BtnAceptar').addClass('Tada Btn-flat-Simple glow').html('<i class="fa fa-lg fa-clock-o"></i> Programar');
			SalesUp.Construye.CierraAlerta({Elemento:Op.Elemento});	
		}
	}/*SalesUp.Variables.ActivaProgramarCorreo*/
	
	//var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';
	var jsonUsuario = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCorreosUsuarios.dbsp', Almacen:'jsonCorreosUsuarios', DataType:'json'}).jsonDatos;
	jsonUsuario = [];
	var objSelectize = {
	    persist: false, maxItems: null,
	    valueField:'correo', labelField:'contacto', searchField:['contacto', 'correo'],
	    options:jsonUsuario, create:true, openOnFocus:false, closeAfterSelect:true, loadThrottle:500,
	    optgroups:[{tipo:1,name:'Colaboradores'},{tipo:2,name:'Contactos'}],
		optgroupField:'tipo',optgroupLabelField:'name',optgroupValueField:'tipo',
		optgroupOrder:['Colaboradores','Contactos'], loadingClass:'buscandoCorreos',
	    render: {
	        item: function(item, escape) {
	        	
	        	var contacto = escape(item.contacto), idp = (item.idProspecto)?item.idProspecto:'', tipo = (item.tipo)?item.tipo:0, correo = '<br/>'+item.correo, tip = 'Colaborador';
	        	var tkp = (item.tkp)?item.tkp:'';

	        	(tipo==2)?tip = 'Contacto':'';
	        	tip = tip + correo;
	        	(!tipo)?tip='':'';
	        	
	        	return '<div class="correosSeleccionados" data-tkp="'+tkp+'" data-idprospecto="'+idp+'" data-tipo="'+tipo+'" data-contacto="'+contacto+'">' +
	                (item.contacto ? '<span class="emailSeleccionado Ellipsis Tip5" tip="'+tip+'">'+contacto+'</span>' : '') +
	            '</div>';
	        },
	        option: function(item, escape) {
	            var label = item.contacto || item.correo;
	            var caption = item.contacto ? item.correo : null;
	            return '<div>' +
	                '<span class="composeNombre">' + escape(label) + '</span>' +
	                (caption ? '<span class="composeEmail">' + escape(caption) + '</span>' : '') +
	            '</div>';
	        },
            option_create: function(data, escape){
            	var str = escape(data.input);
            	var $inputFocus = $('.selectize-control.multi .selectize-input.focus');
            	var $selectizePadre = $inputFocus.closest('.selectize-control');
				var opc = $selectizePadre.find('.selectize-dropdown-content').find('[data-value]');
				var nOpc = _.size(opc);
				var esCorreo = SalesUp.Valida.ValidaEsCorreo(str);
				var strValido = '';
				if (!nOpc){
					if (esCorreo){
						strValido = '<span class="Verde"><i class="fa fa-lg fa-check"></i></span>';	
					}else{
						strValido = '<span class="Rojo"><i class="fa fa-lg fa-times"></i> Correo no valido.</span>';	
					}
				}
				return '<div class="create"><strong>' + str + '</strong> '+strValido+'</div>';
            }
		}
	}/*objSelectize*/

	var iniSelectizeCorreos = function(Op){
		var selector = Op.selector, sinContactos = (Op.sinContactos)?true:false, idSelector = '#'+selector, claseSelector = '.'+selector, $selector = $(idSelector), $selectize;
		var funcionLoad = function(query, callback){
			if(!_.size(query)){return callback();}
			if(_.size(query)>=2){
				callback();
				$selectize = $('.selectize-control'+claseSelector).find('.selectize-input');
				$selectize.find('input').after('<span class="buscarCorreos"><i class="fa fa-spin fa-spinner"></i> buscando...</span>');
				
				var procesaContactos = function(Op, err, adc){ 
					if(Op){
						adc.callback(Op.jsonDatos);
						
						$selectize.find('.buscarCorreos').remove();
					} 
				}
				var adicionales = {selector:$selectize, callback:callback};
				SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonCorreosContactos.dbsp', parametros:{q: query}, prmAdicionales:adicionales, callback:procesaContactos});					
			}
		}

		var funcionCambio =  function(data){ SalesUp.Correo.correoSeleccionado(claseSelector); }

		objSelectize.load = funcionLoad;
		objSelectize.onChange = funcionCambio;

		/*if(sinContactos){objSelectize.load = null;}*/
		$selector.selectize(objSelectize);
		$('.selectize-control'+claseSelector).addClass('BoxSizing InfoData');
	}/*iniSelectizeCorreos*/

	
	var obtieneSelector = function(selector){
		var $selectPara, $selectCc, $selectCco;
		if(selector=='ltPara'){ 
			if (!$selectPara){$selectPara = $('#ltPara')[0].selectize;}
			return $selectPara;
		}

		if(selector=='ltCc'){ 
			if (!$selectCc){$selectCc = $('#ltCc')[0].selectize;}
			return $selectCc;
		}

		if(selector=='ltCco'){ 
			if (!$selectCco){$selectCco = $('#ltCco')[0].selectize;}
			return $selectCco;
		}
	}/*obtieneSelector*/

	this.correoSeleccionado = function(control){
		var $selectizeControl = $('.selectize-control'+control);
		var $boxInfo = $selectizeControl.closest('.BoxInfo');
		var tam = $selectizeControl.find('.selectize-input').outerHeight();
		var arrCorreosSeleccionados = $selectizeControl.find('.correosSeleccionados'), nSeleccionados = _.size(arrCorreosSeleccionados);
		var $frm = $('#frmPopupComposeMail'), $correoContacto = $frm.find('#correoContacto'), $idprospecto = $frm.find('#idprospecto');
		var $tkp = $frm.find('#tkp'), tkp = $tkp.val();
		var vCorreo = $correoContacto.val(), idp = $idprospecto.val(), tProspecto=0;
		
		/*$('.selectize-dropdown'+control+'.multi').hide();*/
		
		$boxInfo.removeClass('heightAuto');
		if(tam>24){$boxInfo.addClass('heightAuto');}

		if(control=='.ltPara'){
			for(var cs=0;cs<nSeleccionados;cs++){
				var $cs = $(arrCorreosSeleccionados[cs]), tipoCs = $cs.attr('data-tipo');
				var tkpCs = $cs.attr('data-tkp'), idpCs = $cs.attr('data-idprospecto'), vCs = $cs.attr('data-value');
				
				if (tipoCs==2){ tProspecto++;
					if (tkp==''){
						//$idprospecto.val(idpCs);
						$tkp.val(tkpCs);
						$correoContacto.val(vCs);
					}
				}
			}

			if(!tProspecto){
				$idprospecto.val('');
				$tkp.val('');
				$('#ProgramarCorreo').hide();
				//$correoContacto.val('');
			}else{
				$('#ProgramarCorreo').show();
			}
		}
		/*heightAuto*/
		var para = $('#ltPara').val();
		$correoContacto.val(para);
		SalesUp.Sistema.Tipsy();
	}/*correoSeleccionado*/

	this.para = function(){
		iniSelectizeCorreos({selector:'ltPara'});
		obtieneSelector('ltPara').focus();
	}/*para*/

	this.cc = function(){
		iniSelectizeCorreos({selector:'ltCc', sinContactos:true});
	}/*cc*/

	this.cco = function(){
		iniSelectizeCorreos({selector:'ltCco', sinContactos:true});
	}/*cco*/

	this.validaEnviarCorreo = function(Op){
		var pasa = false, contenido = tinyMCE.get("contenidoCorreo").getContent(), DestinoMsj='#popupComposeMail .BodyModal', DentroDe='#frmPopupComposeMail';
		pasa = SalesUp.Valida.ValidaObligatorios({DentroDe:DentroDe, DestinoMsj:DestinoMsj});
		
		if(contenido==''){
			SalesUp.Construye.MuestraMsj({tMsg:4, Destino:DestinoMsj, Msg:'El cuerpo del correo no puede estar vacio.' });
			return false;
		}

		var arrArchivos = $('#ajaxFormCompose').find('input[type="file"]');
		var nArchivos = 0;
		for(var aa=0;aa<_.size(arrArchivos);aa++){
			if($(arrArchivos[aa]).val()!=''){nArchivos++;}
		}

		if (pasa){
			SalesUp.Construye.ActivaEsperaGuardando();

			if(nArchivos){
				procesaArchivos(Op);	
			}else{
				SalesUp.Correo.enviarCorreo(Op);
			}

		}
	}/*validaEnviarCorreo*/

	this.enviarCorreo = function(Op){
		var enviado = function(resp, err){
			if(err===null){
				var $frm = $("#frmPopupComposeMail");
				var programarCorreo = $frm.find('#inputProgramarCorreo').val();
				var notificacionOk = '<i class="fa fa-lg fa-check"></i> Correo enviado.';
				if(programarCorreo==1){ notificacionOk = '<i class="fa fa-lg fa-clock-o"></i> Correo programado.';}
				SalesUp.Correo.terminadoProgresoArchivo(); 
				SalesUp.Construye.PopUpGuardado();
				recargaVisualizar();
				SalesUp.Construye.MuestraNotificacion({Mensaje:notificacionOk});
				/*SalesUp.Construye.CierraPopUp({t:Op.t});*/
			}
		}

		var archivosCopiadosAmazon = function(Op,err){
			SalesUp.Sistema.CargaDatosAsync({ link:'/privado/popup_compose_mail_guarda.dbsp', parametros:qryStringCompose(), callback:enviado, dataType:'html', metodo:'POST', formData:true});
		}

		if(SalesUp.Variables.tieneAdjuntosReenviar){
			SalesUp.Sistema.CargaDatosAsync({ link:'https://fenix.salesup.com.mx/aws/copiaArchivoInbox.php', parametros:SalesUp.Variables.parametrosCiaa, callback:archivosCopiadosAmazon, metodo:'POST'});
		}else{
			archivosCopiadosAmazon();
		}

	}/*enviarCorreo*/

	var recargaVisualizar = function(){
		var path = location.pathname;
		if(path.indexOf('-visualizar.dbsp')!=-1){
			if(RecargaTablas){RecargaTablas();}
		}

		if((path.indexOf('prospectos.dbsp')!=-1)||(path.indexOf('oportunidades.dbsp')!=-1)||(path.indexOf('clientes.dbsp')!=-1)||(path.indexOf('ventas.dbsp')!=-1)){
			if(ReloadData){ReloadData();}
		}
	}

	var qryStringCompose = function(){
		var $Contenedor = $("#frmPopupComposeMail");
		var arrInputs = $Contenedor.find('input, select');
		var formDataComposeMail = new FormData();

		for (var i = 0; i <= arrInputs.length - 1; i++){
			var $input = $(arrInputs[i]);
			var name = $input.attr('name');
			var valor = $input.val();
			valor = (valor) ? valor : '';
			if(name){
				formDataComposeMail.append(name,valor);
			}
		}

		formDataComposeMail.append('contenido',tinyMCE.get('contenidoCorreo').getContent());

		return formDataComposeMail;
	}/*/qryString*/

	/*var qryStringCompose = function(){
		var $Contenedor = $("#frmPopupComposeMail");
		var arrInputs = $Contenedor.find('input, select');
		var qryString = '';

		function crearQryString(elem){
			var $e = $(elem);
			var name = $e.attr('name');
			var valor = encodeURIComponent($.trim($e.val()));
			var srt = (name) ? (name+'='+valor+'&') : '';
			return srt;
		}

		for (var i = 0; i <= arrInputs.length - 1; i++){
			var input = arrInputs[i];
			qryString += crearQryString(input);
		}

		qryString += '&contenido='+encodeURIComponent(tinyMCE.get('contenidoCorreo').getContent());

		return qryString;
	}*/
	/*/qryString*/

	var procesaArchivos = function(Op){
		var OptionesAjaxForm = {
            beforeSend: function(){
            	SalesUp.Correo.prepraraProgresoArchivo({t:'#popupComposeMail .BodyModal'});
            },uploadProgress: function(event, position, total, percentComplete){
            	SalesUp.Correo.progresoArchivo(percentComplete);
            }/*,success: function(){
            	console.log('success');
            }*/,complete: function(resp){
				obtieneNombreArchivos(Op, resp);
				//setTimeout(function(){$('#frmPopupComposeMail').submit();},300);
            },error: function(){
				console.warn('error');
            }
        }

        $("#ajaxFormCompose").ajaxForm(OptionesAjaxForm);
        $("#ajaxFormCompose").submit();
    }/*procesaArchivos*/

    var obtieneNombreArchivos = function(Op, resp){
    	var respuestaJson=JSON.parse(resp.responseText);
		var resultado=parseInt(respuestaJson.resultado);
		var strArchivos='', tamanio='';
		var ltArchivos = [];

		$('#RUTA_DOC').val('');
		$('#pesokb').val(0);

		if(resultado==1){
			var nDatos = _.size(respuestaJson.datos);
			for (var na=0; na<nDatos; na++){
			    /*tamanio += parseInt(respuestaJson.datos[i].tamanio);*/
				ltArchivos.push(respuestaJson.datos[na].nombre);
			}

			strArchivos = ltArchivos.join(',');
			$('#RUTA_DOC').val(strArchivos);
			$('#pesokb').val(tamanio);
		}

		SalesUp.Correo.enviarCorreo(Op);
    }/*obtieneNombreArchivos*/

    this.prepraraProgresoArchivo = function(Op){
    	var $t = (Op)?$(Op.t):$('body');
    	$t.prepend('<div class="progresoGuardado"><div class="progressBar Transition"></div><div class="datoProgreso">0%</div></div>');
    	SalesUp.Variables.progresoActual = $t.find('.progresoGuardado');
    	SalesUp.Variables.progresoActual.show();
    	SalesUp.Variables.progresoActual.find('.progressBar').width('0%');
    	SalesUp.Variables.progresoActual.find('.datoProgreso').html("0%");
    }

    this.progresoArchivo = function(Porcentaje){
    	var percent = parseInt(Porcentaje/1.05)+'%';
		SalesUp.Variables.progresoActual.find('.progressBar').width(percent);
		SalesUp.Variables.progresoActual.find('.datoProgreso').html(percent);
	}

	this.terminadoProgresoArchivo = function(){
		if (!SalesUp.Variables.progresoActual){return};
		SalesUp.Variables.progresoActual.find('.progressBar').width('100%');
    	SalesUp.Variables.progresoActual.find('.datoProgreso').html('100%');
		setTimeout(function(){SalesUp.Variables.progresoActual.slideUp();},500);
	}

}/*Compose*/


var nombreMult = function(a){
	// console.log('nombreMult',a);
}

var inputs=new Array();inputs[0]='archivo';
var totalfiles = 0;



/*
agregar al login
SalesUp.Sistema.Almacenamiento({a:'SysMailToActivo', v:'<#SESSION.MailToActivo/>'});

 */




/*
 quitar programar correo cuando no tengo prospecto.

	 SalesUp.Variables.sinProspecto = '<#sinProspecto/>';
	 SalesUp.Variables.inboxCc = '<#inboxCc/>';
	 SalesUp.Variables.inboxResponder = '<#inboxResponder/>';
	 SalesUp.Variables.idInbox = '<#idInbox/>';
	 



	var existeTDinamico = self.parent.TamanioDinamico;

	 <#DATASET ALIAS="SALESUPXP" QUERYID="808">
		var LimiteCorreos = parseInt('<#LIMITE/>');
		$("#limite").val(LimiteCorreos);
		<#/DATASET> 
		var ArchivoFisico = '<#ArchivoFisico/>';
		var NombreArchivoFisico = '<#NombreArchivoFisico/>';
		var CorreosEnviados = parseInt('<#CORREOSENVIADOS/>');


	if (CorreosEnviados >= CorreosEnviados){ $("#estado").val(2); }


Validacion cuando no es tuyo el prospecto 
y cuando no tienes configurado para enviar correos

editar correo - enviar ahora
SalesUp.Variables.idEmail = '<#idemail/>';

SalesUp.Variables.AdjuntarEsteArchivo = function(){
	if(!ArchivoFisico){ return false;}
	var Archivo = '<div class="MultiFile-label"><span class="MultiFile-title">'+NombreArchivoFisico+'</span></div>';
	$('#listafile').show().append(Archivo);
}

SalesUp.Variables.AdjuntarEsteArchivo();





ActivaAjaxFormComposeMail();


var inboxEnviarCorreo = '<#inboxEnviarCorreo/>';
SalesUp.Variables.composeSinProspecto = function(){
	if(SalesUp.Variables.sinProspecto==''){return;}
	console.info('sinProspecto');
	$('.conProspecto').hide();
	$('#BotonesAccionCorreo').removeClass('w30').addClass('w20');
	$('#BoxPara').removeClass('w70').addClass('w80');
	setTimeout(function(){ 
		if(inboxEnviarCorreo){
			$('#prospecto').val(inboxEnviarCorreo).removeAttr('readonly');
			$('#asunto').focus();
		}else{
			$('#prospecto').removeAttr('readonly').focus();
		}
	}, 300);
	
	
}

var inboxReenviar = '<#inboxReenviar/>';
SalesUp.Variables.reenviarCorreo = function(){
	if(inboxReenviar==''){return;}
	var bodyMail = self.parent.SalesUp.Inbox.obtenerBody({idInbox:SalesUp.Variables.idInbox});	
	
	setTimeout(function(){
		tinyMCE.get('contenidoCorreo').setContent(bodyMail);
	},700);
}

var correoInbox = '<#correoInbox/>';
SalesUp.Variables.responderCorreo = function(){
	var cc = SalesUp.Variables.inboxCc, responder = SalesUp.Variables.inboxResponder;
	
	if (correoInbox){
		$('#prospecto').val(correoInbox);
	}

	if(cc){
		$('#concopia').val(cc);
		$("#cc").click();
	}

	if(responder){
		setTimeout(function(){
		  tinymce.execCommand('mceFocus',false,'#contenido');
		},800);
	}
}




SalesUp.Correo.nuevoCorreo({idp:300624});

SalesUp.Construye.ActivaEsperaGuardando();
SalesUp.Correo.prepraraProgresoArchivo({t:'#popupComposeMail .BodyModal'});

SalesUp.Correo.progresoArchivo(15);
SalesUp.Correo.terminadoProgresoArchivo();

SalesUp.Correo.terminadoProgresoArchivo(); 
SalesUp.Construye.PopUpGuardado();

 */
