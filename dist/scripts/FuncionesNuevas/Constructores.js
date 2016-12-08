var ContructorUi = function(){
	
	var UnicoId = function () {
		return 'SU-'+Math.random().toString(36).substr(2, 9)+''+(new Date()).getTime();
	};

	this.IdUnico = function(){ return UnicoId(); } 

	this.ConstruyeTabla = function(NombreCampos, TemplateDatos, Datos, Op){
		
		var match,count, Inicio;
		var _row = '';
		var DatosTemplate = Handlebars.compile(TemplateDatos);
		
		(!Op.Id)? Op.Id = UnicoId():'';
		Inicio = (SalesUp.Variables.pagInicio) ? SalesUp.Variables.pagInicio : Start;

		(Op.elInicio) ? Inicio = Op.elInicio:'';
		
		$(Op.Destino).html('');
		$(Op.Destino).append('<table class="simple" id="'+Op.Id+'"><thead></thead><tbody></tbody><tfoot></tfoot></table>');
		
		if(_.isObject(Datos)){
			if(_.size(Datos[0])==0){
				this.SinResultados({Destino:Op.Destino});
			}else{
				$('#'+Op.Id+' thead').append(NombreCampos); /*THEAD*/
				for (i=0;i<(Datos.length); i++){
				   _row = '';
				   Datos[i].nFila=Inicio+i;
				   _row = DatosTemplate(Datos[i]);
				   $('#'+Op.Id+' tbody').append(_row);
				}	
			}
		}

		SalesUp.Sistema.IniciaPlugins();

		(Op.Callback) ? Op.Callback() : '';
		Op.Callback=undefined;
		
		(Op.NumRegistros)? this.Paginacion({pAct:Op.PagActual, Total:Op.NumRegistros, PorPagina: RegXPag , DespDe:'#'+Op.Id}):'';

	}

	this.ConstruyemeUn = function(Op){
		var HtmlTemplate = Handlebars.compile(Op.Template);
		var HtmlControl; 
		var $Destino = $(Op.Destino);
		
		
		//$Destino.html('');
		
		(!Op.IdControl)? Op.IdControl = UnicoId():'';

		if(Op.Nuevo){
			(Op.Control=='ul')? HtmlControl = '<ul id="'+Op.IdControl+'" class="'+Op.ClasesControl+'" '+( (Op.AttrAdicionales)?Op.AttrAdicionales:'' )+' ></ul>' : '';
			(Op.Control=='select')? HtmlControl = '<select name="'+Op.Nombre+'" id="'+Op.IdControl+'" class="'+Op.ClasesControl+'" '+( (Op.AttrAdicionales)?Op.AttrAdicionales:'' )+' ></select>' : '';
			$Destino.append(HtmlControl);
		}
		

		(Op.SeleccioneOpcion) ? $('#'+Op.IdControl).append('<option value="">(... Seleccione una opción ...)</option>'):'';
		

		if(_.isObject(Op.Datos)){
			if(_.size(Op.Datos[0])>0){
				for (i=0;i<(Op.Datos.length); i++){
					var _row = '';
					_row = HtmlTemplate(Op.Datos[i]);
					$('#'+Op.IdControl).append(_row);
				}
			}else{
				this.SinResultados({Destino:Op.Destino, Msg:Op.MsgSinResultados});
			}

		} /* _.isObject(Op.Datos) */

		SalesUp.Sistema.IniciaPlugins();

		(Op.Callback) ? Op.Callback() : '';
		Op.Callback=undefined;

	}

	this.ReemplazaTemplate = function(Op){
		var HtmlTemplate = Handlebars.compile(Op.Template);
		var HtmlControl; 
		var $Destino = $(Op.Destino);
		
		if(_.isObject(Op.Datos)){
			if(_.size(Op.Datos[0])>0){
				for (i=0;i<(Op.Datos.length); i++){
					var _row = '';
					_row = HtmlTemplate(Op.Datos[i]);
					$Destino.append(_row);
				}
			}

		} /* _.isObject(Op.Datos) */

		(Op.Callback) ? Op.Callback() : '';
		Op.Callback=undefined;
	}

	this.ReemplazaDatos = function(Op){
		var HtmlTemplate = Handlebars.compile(Op.Template);
		var Reemplazado = '';

		if(_.size(Op.Datos)>0){
			Reemplazado = HtmlTemplate(Op.Datos);
		}
		
		return Reemplazado;
	} /* /ReemplazaDatos */

	this.SinResultados = function(Op){
		
		var MsgFefault = '<i class="fa fa-info-circle"></i> No se encontraron registros con este criterio';
		(Op.Msg)? MsgFefault = Op.Msg:'';
		$(Op.Destino).html('<table id="SinResultados" class="BoxSizing"><tbody></tbody></table>');
		$(Op.Destino+ ' #SinResultados tbody').append('<tr><td><div class="SinResultados BoxSizing w100">'+MsgFefault+'</div></td></tr>');
	}
	
	this.MuestraMsj = function(Op){
		$('.BoxMsg').remove();
		var TipoMsg = '', Ico = '', Tiempo = 3500;
		(!Op.Id)? Op.Id = UnicoId():'';
		switch (Op.tMsg){
			case 1:	TipoMsg = 'MsgInfo'; Ico = 'fa-info-circle'; break;
			case 2:	TipoMsg = 'MsgBien'; Ico = 'fa-check-circle'; break;
			case 3:	TipoMsg = 'MsgWarning';	Ico = 'fa-exclamation-triangle'; break;
			case 4: TipoMsg = 'MsgMal'; Ico = 'fa-times-circle'; break;
		}

		(Op.Tiempo) ? Tiempo = Op.Tiempo : '';
		
		(_.isUndefined(Op.Destino)) ? Op.Destino = 'body':'';
		
		$(Op.Destino).append('<span id="'+Op.Id+'" class="BoxMsg '+TipoMsg+'"><i class="fa '+Ico+'"></i> '+Op.Msg+'</span>');

		if(!Op.NoCerrar){
			$('#'+Op.Id).slideDown(500).delay(Tiempo).slideUp(500);
		}else{
			var IdObj = "'"+Op.Id+"'";
			$('#'+Op.Id).append('<i title="Cerrar" class="Pointer fa fa-times" onclick="SalesUp.Construye.CierraMsj('+IdObj+');"></i>');
			$('#'+Op.Id).slideDown(500);
		}
	
	}/* /MuestraMsj */

	this.MuestraNotificacion = function(Op){
		(!Op) ? Op = {} : '';
		(!Op.Mensaje) ? Op.Mensaje = 'Ok, listo.':'';
		$('#Notificacion').remove();
		$('body').prepend('<div id="Notificacion">'+Op.Mensaje+'<i class="fa fa-times Pointer" onclick="SalesUp.Construye.CierraNotificacion();"></i></div>'); 
		$('#Notificacion').slideDown();
		setTimeout(function(){$('#Notificacion').slideUp();},5000);
	}

	this.CierraNotificacion = function(){
		$('#Notificacion').slideUp();
		setTimeout(function(){$('#Notificacion').remove()},1500);
	}

	this.MuestraAlerta = function(Op){
		var TipoAlerta = '', Boton1 = 'Si', Boton2 = 'No', Callback='',
		Callback1='', Callback2='', Icono1 = '<i class="fa fa-check"></i>', Icono2 = '<i class="fa fa-times"></i>',
		Titulo = '', IconoOk = '', BotonOk='Ok', Ancho = '', Alto = '', Id = UnicoId(), FuentePopUp = '', Fuente = '', IdBoton1 = UnicoId();
		 
		// Icono1 = 'fa-check', Icono2 = 'fa-times';
		(!_.isUndefined(Op.TipoAlerta)) ? TipoAlerta = Op.TipoAlerta:'';
		(!_.isUndefined(Op.Boton1)) ? Boton1 = Op.Boton1:'';
		(!_.isUndefined(Op.Boton2)) ? Boton2 = Op.Boton2:'';
		(!_.isUndefined(Op.Icono1)) ? Icono1 = Op.Icono1:'';
		(!_.isUndefined(Op.Icono2)) ? Icono2 = Op.Icono2:'';
		(!_.isUndefined(Op.Callback)) ? Callback = Op.Callback:'';
		(!_.isUndefined(Op.Callback1)) ? Callback1 = Op.Callback1:'';
		(!_.isUndefined(Op.Callback2)) ? Callback2 = Op.Callback2:'';
		(!_.isUndefined(Op.Titulo)) ? Titulo = Op.Titulo:'';
		(!_.isUndefined(Op.BotonOk)) ? BotonOk = Op.BotonOk:'';
		(!_.isUndefined(Op.IconoOk)) ? IconoOk = Op.IconoOk:'';
		(!_.isUndefined(Op.Ancho)) ? Ancho = Op.Ancho:'';
		(!_.isUndefined(Op.Alto)) ? Alto = Op.Alto:'';
		(!_.isUndefined(Op.Id)) ? Id = Op.Id:'';
		(!_.isUndefined(Op.Fuente)) ? Fuente = Op.Fuente:'';
		(!_.isUndefined(Op.IdBoton1)) ? IdBoton1 = Op.IdBoton1:'';
		

		//$('.ModalNotification').remove();

		if(TipoAlerta=='Elegant'){
			$.fallr('show', {
				autoclose : 5000, icon : 'warning', closeKey : true, position: 'center',
				width : '400px', height: '150px',
				content : '<p>'+Op.Alerta+'</p>'
			});
		}

		if(TipoAlerta=='ElegantPregunta'){
			$.fallr('show', {
				buttons : {
					button1 : { text: Boton1, onclick: CallbackElegant },
					button2 : {	text: Boton2 }
				},
				content : '<p>'+Op.Alerta+'</p>',
				position: 'center',	closeKey : true, icon : 'warning'
			});
		}


		if(TipoAlerta=='AlertaPregunta'){
			SalesUp.Variables.Alerta = {};
			SalesUp.Variables.Alerta.Id = Id;
			SalesUp.Variables.Alerta.Contenido = Op.Alerta;
			SalesUp.Variables.Alerta.Pregunta = true;
			SalesUp.Variables.Alerta.Boton1 = Boton1;
			SalesUp.Variables.Alerta.Boton2 = Boton2;
			SalesUp.Variables.Alerta.Icono1 = Icono1;
			SalesUp.Variables.Alerta.Icono2 = Icono2;
			SalesUp.Variables.Alerta.Callback1 = Callback1;
			SalesUp.Variables.Alerta.Callback2 = Callback2;
			SalesUp.Variables.Alerta.Alto = Alto;
			SalesUp.Variables.Alerta.Ancho = Ancho;

			SalesUp.Variables.HtmlAlerta = SalesUp.Sistema.CargaDatos({ Link:'/privado/Vista/TemplateAlerta.dbsp', Almacen:'HtmlAlerta' });

			var AlertaPregunta = SalesUp.Construye.ReemplazaDatos({
				Template: SalesUp.Variables.HtmlAlerta,
				Datos: SalesUp.Variables.Alerta
			});
			
			$('body').append(AlertaPregunta);
			SalesUp.Sistema.InterpretaHtml();
		}

		if(TipoAlerta=='AlertaModal'){
			SalesUp.Variables.Alerta = {};
			SalesUp.Variables.Alerta.Id = Id;
			SalesUp.Variables.Alerta.Titulo = Titulo;
			SalesUp.Variables.Alerta.Contenido = Op.Alerta;
			SalesUp.Variables.Alerta.BotonOk = BotonOk;
			SalesUp.Variables.Alerta.IconoOk = IconoOk;
			SalesUp.Variables.Alerta.Alto = Alto;
			SalesUp.Variables.Alerta.Ancho = Ancho;
			SalesUp.Variables.Alerta.Callback1 = Callback1;
			SalesUp.Variables.Alerta.IdBoton1 = IdBoton1;
			
			var preparaAlertaModal = function(html, err){
				if (err){
					SalesUp.Sistema.BorrarItemDeAlmacen('HtmlAlertaModal');
					return false;
				}

				var AlertaPregunta = SalesUp.Construye.ReemplazaDatos({
					Template: html,
					Datos: SalesUp.Variables.Alerta
				});
				
				$('body').prepend(AlertaPregunta);
				SalesUp.Sistema.InterpretaHtml();
			}
			
			SalesUp.Sistema.CargaDatosAsync({ link:'/privado/Vista/TemplateAlertaModal.dbsp', almacen:'HtmlAlertaModal' , dataType:'html', callback:preparaAlertaModal});

			/*SalesUp.Variables.HtmlAlertaModal = SalesUp.Sistema.CargaDatos({ Link:'/privado/Vista/TemplateAlertaModal.dbsp', Almacen:'HtmlAlertaModal' });
			
			var AlertaPregunta = SalesUp.Construye.ReemplazaDatos({
				Template: SalesUp.Variables.HtmlAlertaModal,
				Datos: SalesUp.Variables.Alerta
			});
			
			$('body').prepend(AlertaPregunta);
			SalesUp.Sistema.InterpretaHtml();*/
		}

		if(TipoAlerta=='PopupModal'){
			$('body').prepend('<div id="'+Id+'" class="ModalNotification BoxSizing" style="display:block;"></div>');

			SalesUp.Variables.Alerta = {};
			SalesUp.Variables.Alerta.Id = Id;
			SalesUp.Variables.Alerta.Titulo = Titulo;
			SalesUp.Variables.Alerta.Contenido = Op.Alerta;
			SalesUp.Variables.Alerta.Alto = Alto;
			SalesUp.Variables.Alerta.Ancho = Ancho;
			
			if(Fuente){
				FuentePopUp = SalesUp.Sistema.CargaDatos({ Link:Fuente });
				SalesUp.Variables.Alerta.Contenido = FuentePopUp;
			}
			
			SalesUp.Variables.HtmlPopupModal = SalesUp.Sistema.CargaDatos({ Link:'/privado/Vista/TemplatePopupModal.dbsp', Almacen:'HtmlPopupModal' });
			var AlertaPregunta = SalesUp.Construye.ReemplazaDatos({ Template: SalesUp.Variables.HtmlPopupModal, Datos: SalesUp.Variables.Alerta });
			
			$('body #'+Id).html(AlertaPregunta);

			setTimeout(function() {
				var Botones = $('#BotonesModal').html();
				$('#BotonesModal').remove();
				$('#'+Id+' .PieModal').html(Botones);
			}, 10);

			SalesUp.Sistema.InterpretaHtml();
		}

		function CallbackElegant(){
			$.fallr('hide');
			(!_.isUndefined(Op.OnClick)) ? Op.OnClick() : '';
		}
		
	}/* /MuestraAlerta */

	this.CierraAlerta = function(Op){
		var $Elemento = $(Op.Elemento);
		(!$Elemento) ? $Elemento = $(Op.t):'';
		var $Padre = $Elemento.closest('.ContenedorModal');
		var $Overlay = $Elemento.closest('.ModalNotification');
		$Padre.addClass('BounceCloseOut');
		setTimeout(function(){ $Overlay.remove(); }, 1200);
		setTimeout(function(){
			(!_.isUndefined(Op.Callback)) ? Op.Callback() : '';
		}, 1250);
	}

	this.MuestraPopUp = function(Op){

		if(!Op){
			var info = 'MuestraPopUp\nNuevo modelo para popups onePageApp es la idea. \n \n';
			info += '[Parametros] \n\n';
			info += '"alto" y "ancho" - Determinan el tamaño del popup, puede ser en px o % , Default. 100x400px) [string]\n\n';
			info += '"id" - Determinan el id del modal (Opcional) [string]\n\n';
			info += '"centrado" -  Determina si el popup ira o no centrado a la pagina, Default: true [booleano]\n\n';
			info += '"titulo" - Encabezado del popup. [string]\n\n';
			info += '"contenido" - Contenido del popup. [string]\n\n';
			info += '"fuente" - Link que contiene el contenido del popup, al estar definido, sobreescribe "contenido" [string]\n\n';
			info += '"callback" - Función a ejectutar depues de cerrar el popup [string]\n\n';
			info += '[Ejemplo]\n\n';
			info += 'SalesUp.Construye.MuestraPopUp({\n';
			info += '	alto:\'300px\', ancho:\'600px\', centrado:false,\n';
			info += '	titulo:\'Nueva pestaña\', \n';
			info += '	fuente:\'/privado/PopUpNuevoTabInbox.dbsp\'\n';
			info += '});\n';

			return '¡Listo implementa! \n\n<[*_*]>';
		}


		var TemplatePopUp, AlertaPregunta, idPopUp, altoTitulo = 30, Centrado = true;
		Op.id = (Op.id) ? Op.id:UnicoId();
		idPopUp = Op.id;
		TemplatePopUp = SalesUp.Sistema.CargaDatos({ Link:'/privado/Vista/TemplatePopUp.dbsp', Almacen:'TemplatePopUp' });
		
		$('body').prepend('<div id="'+idPopUp+'" class="ModalNotification BoxSizing CargandoPopUp" style="display:block;"><div class="ContOverlay">'+SalesUp.Sistema.unMomento()+'</div></div>');
		var $Overlay = $('#'+idPopUp);
		
		(!Op.alto) ? Op.alto = '100px':'';
		(!Op.ancho) ? Op.ancho = '400px':'';
		
		(!_.isUndefined(Op.centrado)) ? Centrado = Op.centrado:'';
		Op.centrado = Centrado;
	
		if(Centrado){
			var alto = Op.alto;
			alto = SalesUp.Sistema.StrReplace('px','',alto);
			alto = SalesUp.Sistema.StrReplace('%','',alto);
			alto = parseInt(alto)+altoTitulo;
			Op.top = 'calc(50% - '+(alto/2)+'px)';	
		}

		SalesUp.Variables.respGuardaPopUp = undefined;
		SalesUp.Variables.callBackActual = undefined;

		if(Op.callback){SalesUp.Variables.callBackActual = Op.callback;}
		
		setTimeout(function(){
			if(Op.fuente){ Op.contenido = SalesUp.Sistema.CargaDatos({ Link:Op.fuente }); }
			
			AlertaPregunta = SalesUp.Construye.ReemplazaDatos({ Template:TemplatePopUp, Datos:Op });
			$Overlay.html(AlertaPregunta).removeClass('CargandoPopUp');
			SalesUp.Sistema.IniciaPlugins();
			var $PopUp = $Overlay.find('.PopUp');
			SalesUp.Variables.popupActual = $PopUp;

			setTimeout(function(){
				var arrAuto = $PopUp.find('[autofocus]');
				$(arrAuto[0]).focus();
			}, 500);
		}, 10);
	}/*MuestraPopUp*/

	this.CierraPopUp = function(Op){
		var $t = $(Op.t);
		var $Padre = $t.closest('.ContenedorModal');
		var $Overlay = $t.closest('.ModalNotification');
		$Padre.addClass('BounceCloseOut');
		
		setTimeout(function(){ if (tinymce.activeEditor){tinymce.activeEditor.remove();} $Overlay.remove(); }, 1200);
	}/*CierraPopUp*/

	this.GuardarPopUp = function(Op){
		var $t = $(Op.t);
		var $p = $t.closest('form');
		var action = $p.attr('action');
		if(SalesUp.Valida.ValidaObligatorios({DentroDe:$p, DestinoMsj:$p})){
			SalesUp.Construye.ActivaEsperaGuardando();
			var qryString = SalesUp.Sistema.qryString({Formulario:$p});

			setTimeout(function(){
				SalesUp.Variables.respGuardaPopUp = SalesUp.Sistema.CargaDatos({Link:action,Parametros:qryString, DataType:'json'});
				SalesUp.Construye.PopUpGuardado();
			}, 10);
		}
	}/*GuardarPopUp*/

	this.ActivaEsperaGuardando = function (){
		var esperaGuardando = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateGuardandoPopUp.dbsp', Almacen:'TemplateGuardandoPopUp'});
		SalesUp.Variables.popupActual.find('.BodyModal').prepend(esperaGuardando);
		
	}/*ActivaEsperaGuardando*/

	this.QuitaEsperaGuardando = function(){
		$('.OverlayGuardando').fadeOut();
	}

	this.PopUpGuardado = function(){
		var $Mensaje = SalesUp.Variables.popupActual.find('.MensajeGuardando');
		$Mensaje.addClass('Verde').html('Guardado <i class="icoGuarando fa fa-lg fa-check"></i>');

		setTimeout(function(){
			var $Padre = SalesUp.Variables.popupActual;
			var $Overlay = $Padre.closest('.ModalNotification');
			$Padre.addClass('BounceCloseOut');
			setTimeout(function(){ 
				$Overlay.remove(); 
				SalesUp.Construye.ejecutaCallbackPopUp();
				if (tinymce.activeEditor){tinymce.activeEditor.remove();}
			}, 1200);
		}, 500);
	}/*PopUpGuardado*/



	this.ejecutaCallbackPopUp = function(){
		var callback = SalesUp.Variables.callBackActual;
		
		if(callback){
			callback = SalesUp.Sistema.StrReplace('();','',callback);
			callback = SalesUp.Sistema.StrReplace('()','',callback);
			eval(callback+'();');
		}

		SalesUp.Variables.callBackActual = undefined;
	}
	

	this.CierraMsj = function(id){
		$('#'+id).slideUp(500);
	}

	this.Paginacion = function(Op){  
		$('#Paginacion').remove();
		var DivPaginacion = '<div id="Paginacion" class="BoxPaginacion paginacion"></div><div class="clear"></div>';

		var styleTop ='', Inicio;
		(Op.DespDe)? $(Op.DespDe).after(DivPaginacion):'';
		(Op.AntesDe)? $(Op.AntesDe).before(DivPaginacion):'';
		(Op.DentroDe)? $(Op.DentroDe).append(DivPaginacion):'';
		Inicio = (SalesUp.Variables.pagInicio) ? SalesUp.Variables.pagInicio : Start;
		(Inicio==1)?Op.pAct=1:'';
		// SalesUp.Sistema.CargaDatos({Link:'/privado/co/Paginacion.dbsp', Parametros:'r='+Op.PorPagina+'&t='+Op.Total+'&p='+Op.pAct, Div:1, Destino:'#Paginacion' });
		var r_totales = Op.PorPagina*Op.pAct;
		if (Op.Total > Op.PorPagina) {
			
			var pagTotal;
			pagTotal = Op.Total/50;
			pagTotal = Math.ceil(pagTotal);
			var ultimaPag = 'last', strNext = 'Siguiente <i class="fa fa-chevron-right"></i>';

			if (Op.pAct > (pagTotal)) {
				ultimaPag = false;
				strNext = false;
			}

			$('#Paginacion').bootpag({
					total:pagTotal,
					page: Op.pAct,
				    maxVisible: 7,
				    leaps: false,
				    next: strNext,
				    firstLastUse: true,
				    prev: '<i class="fa fa-chevron-left"></i> Atras',
				    last: 'Fin',
				    first: 'Inicio',
				    lastClass: ultimaPag
				}).on("page",function(event,num){
					iraPag(num);
				});

			
			$('.BoxPaginacion li.disabled').remove();
	 		$(".pagination.bootpag li").not('.active').find("a").addClass('Npag');
	 		$(".pagination.bootpag li.active a").addClass('PagAct');
	 		if (Op.Total < r_totales) {r_totales=Op.Total};
	 		$('#Paginacion').append('<p class="Registros"><b>'+Inicio+'</b> - <b>'+r_totales+'</b> de <b>'+Op.Total+'</b> resultados</p></li>');
 		}else{
 			r_totales=Op.Total;
 			$('#Paginacion').append('<p class="Registros"><b>'+Op.Total+'</b> resultados</p></li>');
 		}
		
		if(Op.Total>50){
			$('#InfoRegistros_1').html($('#InfoRegistros_2').html());
		}else{
			$('#InfoRegistros_1').css('margin-top','0').html($('#InfoRegistros_2').html());
		}
		
		$('#InfoRegistros_2').remove();
	}
	
	this.AgregaBoton = function(Op){
		/*
		
		(Op.DespDe)? $(Op.DespDe).after( $('<a></a>').html(Op.Boton).addClass('boton').attr('href',Op.Href).attr('title',Op.Titulo).attr('id',Op.Id) ):'';
		(Op.AntesDe)? $(Op.AntesDe).before( $('<a></a>').html(Op.Boton).addClass('boton').attr('href',Op.Href).attr('title',Op.Titulo).attr('id',Op.Id) ):'';
		(Op.DentroDe)? $(Op.DentroDe).append( $('<a></a>').html(Op.Boton).addClass('boton').attr('href',Op.Href).attr('id',Op.Id) ):'';
		(Op.Onclick)? $('#'+Op.Id).attr('onclick',Op.Onclick):'';
		(Op.Clases)? $('#'+Op.Id).addClass(Op.Clases):'';
		(Op.Titulo)? $('#'+Op.Id).attr('title',Op.Titulo):'';
		*/
	
		var btn = '';
		var onclick = (Op.Onclick) ? 'onclick="'+Op.Onclick+'"' : '';
		var icono = (Op.Icono) ? '<i class="fa '+Op.Icono+'"></i>' : '';
		var clases = (Op.Clases) ? Op.Clases : '';
		var id = (Op.Id) ? Op.Id : UnicoId();
		var boton = (Op.Boton) ? Op.Boton : '';
		var titulo = (Op.Titulo) ? Op.Titulo : '';
		var tip = (Op.Tip) ? Op.Tip : 'Tip1';
		var btnTamanio = (Op.btnTamanio) ? Op.btnTamanio : 'Btn-small';
		
		btn += ' <span class="Pointer btnNeutral Btn Btn-rounded '+btnTamanio+' Btn-flat-Aceptar '+tip+' '+clases+'" '+onclick+' tip="'+titulo+'" >';
		btn += icono+' '+boton;
		btn += '</span> ';
			
		(Op.DespDe)   ? $(Op.DespDe).after( btn ):'';
		(Op.AntesDe)  ? $(Op.AntesDe).before( btn ):'';
		(Op.DentroDe) ? $(Op.DentroDe).append( btn ):'';
		
	}/*AgregaBoton*/

	this.MuestraVentana = function(Op){
		$('.ModalNotification').remove();
		var HtmlVentana = SalesUp.Sistema.CargaDatos({Link:'/privado/TemplateVentana.dbsp', Div:0, Almacen: 'HtmlVentana' });
		$("html, body").animate({scrollTop:0}, '500', 'swing');
		$('body').prepend(SalesUp.Sistema.StrReplace('{{Contenido}}',Op.Contenido,HtmlVentana));   
		
	}

	this.CierraVentana = function(t){
		$(t).parent().parent().addClass('BounceCloseOut');
		setTimeout(function(){ $(t).parent().parent().parent().remove(); }, 1200);
	}



	/*-- -- -- -- -- */

	this.CalculaTopLeftPopOver = function(Elem){
	  var Top = $(Elem).offset().top + $(Elem)[0].offsetHeight / 2 - $('.popover')[0].offsetHeight / 2;
	  var Left = $(Elem).offset().left - $('.popover')[0].offsetWidth - 0 ;
	  $('.popover').css('top',Top).css('left',Left);
	}


	this.VerLtArchivos = function(Op){
	  $('.popover, .tipsy').remove();
	  var IdListaPopOver = SalesUp.Construye.IdUnico();
	  var TituloPopOver = $(Op.Elem).attr('tip');
	  
	  var PopOver = SalesUp.Sistema.CargaDatos({Link:'/privado/TemplatePopOver.dbsp', Div:0, Almacen: 'HtmlPopOver' });
	  PopOver = SalesUp.Sistema.StrReplace('{{TituloPopOver}}', TituloPopOver, PopOver);
	  PopOver = SalesUp.Sistema.StrReplace('{{IdListaPopOver}}', IdListaPopOver, PopOver);

	  $('body').append(PopOver);
	  $('.popover').show();
	  
	  SalesUp.Construye.CalculaTopLeftPopOver(Op.Elem);
	  var ido = '';
	  (Op.IdO) ? ido = Op.IdO : '';
	  var tkp = (Op.tkp) ? Op.tkp : '';
	  var tko = (Op.tko) ? Op.tko : '';
	  var Params = '&tkp='+tkp+'&tko='+tko+'&idp='+((Op.IdP)?Op.IdP:'')+((Op.IdO)?'&ido='+Op.IdO:'');
	  Lista = SalesUp.Sistema.CargaDatos({Link:'/privado/ajax/jx-ListaArchivos.dbsp', Parametros: Params, DataType:'json', Div:0 });
	  
	  $('.popover-content .Spinner').hide();
	  
	  setTimeout(function(){
		$.each( Lista.LtArchivos, function( i, Item ){
		    var Icono = '<img class="IconoArchivo" src="/imagenes/Archivos/'+Item.Icono+'"/>';
		    var Ver = '', HtmlLink='';
		    var DescargaDoc = Item.Link;
		    var NoVisualiza = true;
		    DescargaDoc = SalesUp.Sistema.StrReplace('\\','',DescargaDoc);

		    ( (SalesUp.Sistema.esIE()) && ( (Item.Icono=='pdf22.png') || (Item.Icono=='txt22.png') ) ) ? NoVisualiza = false : '' ;

		    ( (Item.Ver==1) && (NoVisualiza) ) ? Icono = '<img onclick="SalesUp.Construye.VerArchivo({IdA:'+Item.IdArchivo+', ArchivoFisico:\''+Item.ArchivoFisico+'\', Archivo:\''+Item.Archivo+'\', idProspecto:\''+Op.IdP+'\' , idOportunidad:\''+ido+'\' })" class="IconoArchivo Tip2" style="cursor:pointer;" Tip="Ver archivo" src="/imagenes/Archivos/'+Item.Icono+'"/>':'';
		    ( (Item.Ver==1) && (NoVisualiza) ) ? Ver = '<i onclick="SalesUp.Construye.VerArchivo({IdA:'+Item.IdArchivo+', ArchivoFisico:\''+Item.ArchivoFisico+'\', Archivo:\''+Item.Archivo+'\', idProspecto:\''+Op.IdP+'\' , idOportunidad:\''+ido+'\' })" Tip="Ver archivo" class="Transition VerArchivo Tip8 fa fa-eye"></i>':'';
		    Ver ='';
		    
		    var idProspecto = '';
		    	idProspecto = Item.IdP;
		    	(!idProspecto) ? idProspecto = Item.IDP:'';
		    HtmlLink = '';
			HtmlLink += '<span class="w10 tCen">';
			HtmlLink += '	'+Icono+'';
			HtmlLink += '</span>';
			HtmlLink += '<div class="BoxInfoArchivo w90 pl5">';
			HtmlLink += '	<div class="w80">';
			HtmlLink += '		<a href="'+DescargaDoc+'" target="_blank" class="Transition LinkDescargaArchivo Ellipsis w95">'+Item.Archivo+'</a>';
			HtmlLink += '		<span class="TamanioArchivo w100">'+Item.Tamanio+'</span>';
			HtmlLink += '	</div>';
			HtmlLink += '	<div class="w20">';
			HtmlLink += '		<span href="'+DescargaDoc+'" target="_blank" tip="Descargar" class="Transition DescargarArchivo Tip8 Pointer">';
			HtmlLink += '			<i class="fa fa-lg fa-cloud-download"></i>';
			HtmlLink += '		</span>';
			HtmlLink += '		<span onclick="SalesUp.Sistema.EnviarArchivoPorEmail({ArchivoFisico:\''+Item.ArchivoFisico+'\', Archivo:\''+Item.Archivo+'\', idProspecto:\''+idProspecto+'\' , idOportunidad:\''+ido+'\' });" tip="Enviar archivo por correo" class="Pointer Tip8 EnviarporCorreo"> ';
			HtmlLink += ' 			<i class="fa fa-lg fa-envelope"></i> ';
			HtmlLink += '		</span>';
			HtmlLink += '	</div>';
			HtmlLink += '</div>';

			$('#'+IdListaPopOver).append( $('<li></li>').html(HtmlLink).addClass('Transition w100 LiArchivo') );

		}); /* /$.each */

		SalesUp.Construye.CalculaTopLeftPopOver(Op.Elem);
		SalesUp.Sistema.Tipsy();
	  },100); /* setTimeout */
	} /* /VerLtArchivos */

	this.VerArchivo = function(Op){
		
		var Doc = 0, ArchivoFisico = '', Archivo = '', idp ='', ido = '', tka= '',ida='';
		(Op.Doc)? Doc=Op.Doc:'';
		(Op.ArchivoFisico)? ArchivoFisico=Op.ArchivoFisico:'';
		(Op.Archivo)? Archivo=Op.Archivo:'';
		(Op.idProspecto)? idp=Op.idProspecto:'';
		(Op.idOportunidad)? ido=Op.idOportunidad:'';
		(Op.tk)? tka=Op.tk:'';
		(Op.IdA)? ida=Op.IdA:'';
		
		$('.popover, .tipsy').remove();
		var Json = SalesUp.Sistema.CargaDatos({Link:'/privado/ajax/jx-InformacionArchivo.dbsp', Parametros: '&tk='+tka+'&ida='+ida+'&doc='+Doc, DataType:'json', Div:0 });
		var jsonLink = Json.InfoArchivo[0].Link;

		(Op.urlFija) ? jsonLink = Op.urlFija : '';

		var HtmlContenido = '';
		var TipoExt = SalesUp.Construye.TipoExtArchivo(Json.InfoArchivo[0].Archivo);
		var VerRuta = jsonLink+'&ver=1';
		var DescargaDoc = jsonLink;
		DescargaDoc = SalesUp.Sistema.StrReplace('\\','',DescargaDoc);
		VerRuta = SalesUp.Sistema.StrReplace('\\','',VerRuta);
		(TipoExt==0)? HtmlContenido = '<table id="TablePreviewImg"><tr><td><img onerror="SalesUp.Construye.ErrorPreview(this)" onload="SalesUp.Construye.CargandoPreview(this)" style="display:none;" class="ImgVer" id="ImgVer" src="'+VerRuta+'" /></td></tr></table>':'';
		(TipoExt==1)? HtmlContenido = '<iframe onerror="SalesUp.Construye.ErrorPreview(this)" onload="SalesUp.Construye.CargandoPreview(this)" id="IframeVer" class="IframeVer" hspace="0" frameborder="0"  width="880px" height="530px" src="'+VerRuta+'"></iframe>':'';
		SalesUp.Construye.MuestraVentana({Contenido: HtmlContenido});
		$('.ContainerButton').append('<a class="Pointer btnNeutral Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" id="LinkVentanaExterna" target="_blank" href="'+VerRuta+'"><i class="fa fa-external-link"></i> Ver en ventana externa</a>');
		$('.ContainerButton').append('<a class="Pointer btnNeutral Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" id="LinkDescarga" target="_blank" href="'+DescargaDoc+'"><i class="fa fa-cloud-download"></i> Descargar</a>');
		
		if(idp!=''){
			$('.ContainerButton').append('<a class="Pointer btnAccion Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" onclick="SalesUp.Construye.CierraVentana(this); SalesUp.Sistema.EnviarArchivoPorEmail({ArchivoFisico:\''+ArchivoFisico+'\', Archivo:\''+Archivo+'\', idProspecto:\''+idp+'\' , idOportunidad:\''+ido+'\' });" style="float:left;margin-right:10px;"><i class="fa fa-envelope"></i> Enviar por correo</a>');
		}
	}

	this.TipoExtArchivo = function(NombreArchivo){
	  var TipoExt;
	  var Extencion = new Array('png','jpg','jpeg','bmp','pdf','txt');
	  var ext = NombreArchivo.split('.').pop().toLowerCase();
	  ($.inArray(ext, Extencion)<=3)? TipoExt = 0: '';
	  ($.inArray(ext, Extencion)>3)? TipoExt = 1: '';
	  return TipoExt;
	}

	this.CargandoPreview = function(t){
	  $(t).show();
	  $('#CargandoView').hide();
	}

	this.ErrorPreview = function(t){
		setTimeout(function() {
			$('#CargandoView').html('<i class="fa fa-frown-o"></i><br><br>El archivo no se cargó correctamente.');	
		}, 1000);
	}
	
	this.CerrarPopOver = function(){
		$('.popover, .tipsy').remove();
	}

	this.VerLtCompartidos = function(Op){
		$('.popover, .tipsy').remove();
		var IdListaPopOver = SalesUp.Construye.IdUnico();
		var TituloPopOver = 'Compartido con:';

		var PopOver = SalesUp.Sistema.CargaDatos({Link:'/privado/TemplatePopOver.dbsp', Almacen: 'HtmlPopOver' });
		PopOver = SalesUp.Sistema.StrReplace('{{TituloPopOver}}', TituloPopOver, PopOver);
		PopOver = SalesUp.Sistema.StrReplace('{{IdListaPopOver}}', IdListaPopOver, PopOver);

		$('body').append(PopOver);
		$('.popover').show();

		SalesUp.Construye.CalculaTopLeftPopOver(Op.Elem);
		var tkp = (Op.tkp) ? Op.tkp : '';
		var idp = (Op.IdP) ? Op.IdP : '';
		
		var Params = '';
		Params = '&idp='+idp;
		(!idp)?Params='':'';

		(tkp) ? Params += '&tkp='+tkp:'';

		Lista = SalesUp.Sistema.CargaDatos({Link:'/privado/ajax/jx-ListaCompartidos.dbsp', Parametros: Params, DataType:'json', Div:0 });

		$('.popover-content .Spinner').hide();

		$.each( Lista.LtCompartidos, function( i, Item ){
			HtmlLink =  Item.Ejecutivo+' <i>('+Item.Iniciales+')</i>';
			$('#'+IdListaPopOver).append( $('<li></li>').html(HtmlLink).addClass('Transition') );
		});

		SalesUp.Construye.CalculaTopLeftPopOver(Op.Elem);
		SalesUp.Sistema.Tipsy();
	}/* /this.VerLtCompartidos */

	this.VerLtProspectos = function(Op){
		$('.popover, .tipsy').remove();
		var IdListaPopOver = SalesUp.Construye.IdUnico();
		var TituloPopOver = 'Prospectos';

		var PopOver = SalesUp.Sistema.CargaDatos({Link:'/privado/TemplatePopOver.dbsp', Div:0, Almacen: 'HtmlPopOver' });
		PopOver = SalesUp.Sistema.StrReplace('{{TituloPopOver}}', TituloPopOver, PopOver);
		PopOver = SalesUp.Sistema.StrReplace('{{IdListaPopOver}}', IdListaPopOver, PopOver);
		var Url = "'/privado/prospectos-visualizar.dbsp?tkp={{Tkp}}&idprospecto={{IdProspecto}}'"
		SalesUp.Variables.TemplateLiOpciones = '<li class="Pointer" onclick="SalesUp.Sistema.IraPagina('+Url+')"><i class="fa fa-angle-right"></i> {{Prospecto}}</li>';
		$('body').append(PopOver);
		$('.popover').show();

		SalesUp.Construye.CalculaTopLeftPopOver(Op.Elem);
		var Params = {TkCom:Op.Id};
		setTimeout(function() {
			
			SalesUp.Variables.jsonListaProspectos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonListaProspectosEmpresas.dbsp', Parametros: Params, DataType:'json' });
			$('.popover-content .Spinner').hide();

			SalesUp.Construye.ConstruyemeUn({
				Control: 'ul', Nuevo: false, IdControl: IdListaPopOver,
				Template: SalesUp.Variables.TemplateLiOpciones,
				Datos: SalesUp.Variables.jsonListaProspectos.jsonDatos
			});

			SalesUp.Construye.CalculaTopLeftPopOver(Op.Elem);
			SalesUp.Sistema.Tipsy();
			
		}, 100);


		/*
		$.each( Lista.LtCompartidos, function( i, Item ){
			HtmlLink =  Item.Ejecutivo+' <i>('+Item.Iniciales+')</i>';
			$('#'+IdListaPopOver).append( $('<li></li>').html(HtmlLink).addClass('Transition') );
		});
		*/
	}/*VerLtProspectos*/

	this.BuildJsontoTable = function(Op){
		var $Tabla = $(Op.Tabla);
		var Datos = Op.json;

		var Limpiar = false;

		(Op.Limpiar) ? Limpiar = Op.Limpiar : '';

		//(Limpiar) ? $Tabla.html('') : '';
	
		var columns = addAllColumnHeaders(Datos);

		for (var i = 0 ; i < Datos.length ; i++) {
			var row$ = $('<tr/>');
			for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
				var cellValue = Datos[i][columns[colIndex]];

				if (cellValue == null) { cellValue = ""; }

				row$.append($('<td/>').html(cellValue));
			}
			$Tabla.append(row$);
		}
		

		function addAllColumnHeaders(Datos){
		    var columnSet = [];
		    var headerTr$ = $('<tr/>');

		    for (var i = 0 ; i < Datos.length ; i++) {
		        var rowHash = Datos[i];
		        for (var key in rowHash) {
		            if ($.inArray(key, columnSet) == -1){
		                columnSet.push(key);
		                headerTr$.append($('<th/>').html(key));
		            }
		        }
		    }
		    $Tabla.append('<thead></thead>');
		    $Tabla.find('thead').append(headerTr$);

		    return columnSet;
		}
	}

	this.popOver = function(Op){
		var Contenido = '', Titulo = '';
		var $Elemento = $(Op.Elemento);
		
		$('.tipsy').remove();
		$('.popover').hide();
		$Elemento.popover('destroy');

		var dirPopOver = 'top', Clases='';
		(Op.PopOverLugar) ? dirPopOver = Op.PopOverLugar : '';
		(Op.Titulo) ? Titulo = Op.Titulo:'';
		(Op.Contenido) ? Contenido = Op.Contenido:'';
		(Op.Clases) ? Clases = Op.Clases:'';
		

		var PopOverId = 'PopOver'+SalesUp.Construye.IdUnico();
		var TemplatePopover = '<div class="popover '+Clases+'" id="'+PopOverId+'" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>';

		$Elemento.popover({
			template:TemplatePopover, placement:dirPopOver, html:true, container:'body',
			title:Titulo, content:Contenido
		});

		$Elemento.popover('show');

		var $PopOverId = $('#'+PopOverId);
		var Cerrar = true;
		$PopOverId.mouseleave(function(){
			Cerrar = true;
			setTimeout(function(){(Cerrar) ? $PopOverId.hide():'';}, 1000);
		}).mouseenter(function(){
			Cerrar = false;
		}).click(function(){
			$PopOverId.hide();
		});

		setTimeout(function(){(Cerrar) ? $PopOverId.hide():'';}, 4000);

		$Elemento.mouseleave(function(){
			Cerrar = true;
		setTimeout(function(){(Cerrar) ? $PopOverId.hide():'';}, 3000);
		}).mouseenter(function(){
			Cerrar = false;
		});
	}

	this.opcionesAnios = function(Op){
		var t = 1, total = 5, str = '',min, max, anio = parseInt(moment().format('YYYY'));
		(!Op) ? Op = {}:'';
		(Op.t) ? t = Op.t : '';
		(Op.n) ? total = Op.n:'';
		if(t==1){min = anio; max = total + anio;}
		if(t==2){min = anio - total;max = anio;}
		if(t==3){min = anio - total;max = total + anio;}
		for(var i=min;i<=max;i++){ str += '<option'+(anio==i?' selected="selected"':'')+' value="'+i+'">'+i+'</option>'; }
		return str;
	}

	this.accionesRow = function(Op){
		var t = Op.t, $t = $(t);
		SalesUp.Variables.thisAccionRow = $(t);
		var $t = $(Op.t), $p = $t.closest('td'), $ao = $p.find('.accionesOcultas');
		var htmlAcciones = $ao.html();
		var accionesMenu = function(){
			SalesUp.Construye.popOver({Elemento:t, PopOverLugar: Op.lugar || 'left', Contenido:htmlAcciones, Clases:'PopOverAcciones'});
			$('.FnCombinaContactos').hide();
			if (SalesUp.Variables.accionesComunes.obtenerTotalRegistros('tkp').length === 2) {
				_.each(SalesUp.Variables.accionesComunes.obtenerTotalRegistros('tkp'),function(e,f){
					$('.popover.PopOverAcciones').last().find('.FnCombinaContactos[tk="'+e+'"]').show();
					var topPop = parseFloat($('.popover.PopOverAcciones').last().has('[tk="'+e+'"]').css('top'))-13;
					$('.popover.PopOverAcciones').last().has('[tk="'+e+'"]').css({'top':topPop});
				})
			}
			
		}

		accionesMenu();
		$t.mouseenter(function(){ accionesMenu(); }); 
		$ao.remove();
		$t.removeAttr('onmouseenter');
	}/*accionesRow*/

}









