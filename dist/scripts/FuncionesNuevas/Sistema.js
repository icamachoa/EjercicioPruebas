 var Start = 1, PagAct = 1, RegXPag = 50, nRegistros = 0;

var SistemaDefault = function(){
	var PasaGetData = true;
	self._Time,	self._Destino, self._LinkFile, self._Funcion, self._Status,  self._metodo,
	self._Objeto, self._Valor,
	self._EsPagina, self._AlmacenUltimaPagina = 'UltimaPagina',
	self._AlmacenParametros = 'Parametros', self._AlmacenDestino = 'Destino',
	self._AlmacenFuncion = 'Funcion', self._AlmacenObjeto = 'Objeto',
	self._Div = 1, self._DataType = 'html', self._Almacen;

	self._HtmlMensajeEnviado  = '<div class="ModalNotification" id="MensajeEnviado" style="display: block;">';
	self._HtmlMensajeEnviado += '<div class="BodyEmail Minibody BounceOpenInDown">';
	self._HtmlMensajeEnviado += '<div class="MsgEmail" style="height: 120px;">';
	self._HtmlMensajeEnviado += '<span class="MsgContendio"><i class="fa fa-envelope-o"></i> Mensaje enviado. <i class="fa fa-check"></i></span>';
	self._HtmlMensajeEnviado += '</div>';
	self._HtmlMensajeEnviado += '</div>';
	self._HtmlMensajeEnviado += '</div>';

	if (window.Minificar){
		this.Comprimir = new Minificar();
	}


	this.esIE = function(){
		var Es = false;
        var myNav = navigator.userAgent.toLowerCase();
        ( (myNav.indexOf('msie') != -1) || ( (myNav.indexOf('trident') != -1) && (myNav.indexOf('rv:11') != -1) ) ) ? Es = true : '';
        return Es;
	}

	this.VersionIE = function(){
		var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : '';
	}

	this.EsperaGuardando = function(){
		SalesUp.Sistema.MuestraEspera('',4);
	}

	this.unMomento = function(){
		return '<div class="unMomento" id="Esperando"><span id="boxEsperando"><i class="fa fa-spinner fa-spin"></i> <span>Un momento por favor...</span></span></div>';
		return '<div class="unMomento" id="Esperando"> <i style="font-size: 17px;" class="fa fa-spinner fa-spin"></i> <span style="font-size: 17px;">Un momento por favor...</span></div>';
	}

	this.MuestraEspera = function(Destino, Tipo){
		var Espera = '', Titulo='';

		EsperaCompleto = SalesUp.Sistema.CargaDatos({Link:'/estilos/overlay.dbsp', Almacen: 'HtmlCargandoCompleto' });
		EsperaCompletoSmall = SalesUp.Sistema.CargaDatos({Link:'/estilos/overlay.dbsp', Almacen: 'HtmlCargandoCompleto' });

		var muestraLaEspera = '<div class="overlayCargandoInformacion ModalNotification BoxSizing" style="display:block;"><div class="ContOverlay">'+SalesUp.Sistema.unMomento()+'</div></div>';

		($('#TitVentana').attr('TitOri')) ? Titulo = $('#TitVentana').attr('TitOri') : Titulo = $('#TitVentana').html();
		$('#TitVentana').html(Titulo).attr('TitOri',Titulo);


		$('.CargandoTitulo').each(function(){
			var $Elemento = $(this);
			($Elemento.attr('TitOri')) ? Titulo = $Elemento.attr('TitOri') : Titulo = $Elemento.html();
			$Elemento.html(Titulo  + ' <i class="fa fa-spinner Spinner"></i>').attr('TitOri',Titulo);
		});

		if(Tipo==1) Espera = SalesUp.Sistema.unMomento();

		if(Tipo==2) Espera = '<div id="Esperando" class="Left"><i class="fa fa-spinner Spinner"></i></div>';
		if(Tipo==2) Espera = '';

		if(Tipo==3) Espera = muestraLaEspera;

		if(Tipo==4) Espera = EsperaCompletoSmall;

		if(Destino!=''){ $(Destino).html(Espera); }
		if(Destino==''){ $('body').append(Espera); }
	} /* /this.MuestraEspera */

	this.MostrarEspera = function (Op){

		var Destino = '', TipoEspera='', Mensaje='';
		EsperaCompleto = SalesUp.Sistema.CargaDatos({Link:'/estilos/overlay.dbsp', Almacen: 'HtmlCargandoCompleto' });

		SalesUp.Sistema.OcultarOverlay();

		(!_.isUndefined(Op.TipoEspera)) ? TipoEspera = Op.TipoEspera :'';
		(!_.isUndefined(Op.Destino)) ? Destino = Op.Destino :'';
		(!_.isUndefined(Op.Mensaje)) ? Mensaje = Op.Mensaje :'';

		if(TipoEspera=='Cargando'){
			SalesUp.Sistema.MuestraEspera(Destino,1);
		}

		if(TipoEspera=='CargandoDatos'){
			SalesUp.Sistema.MuestraEspera(Destino,2);
		}

		if(TipoEspera=='CargandoOscuro'){
			SalesUp.Sistema.MuestraEspera(Destino,3);
			(!_.isEmpty(Mensaje)) ? $('#MsgOverlay').html(Mensaje) : '';
		}

		if(TipoEspera=='CargandoOscuroTransparente'){
			SalesUp.Sistema.MuestraEspera(Destino,3);
			(!_.isEmpty(Mensaje)) ? $('#MsgOverlay').html(Mensaje) : '';
		}

		if(TipoEspera=='CargandoBlanco'){
			SalesUp.Sistema.MuestraEspera(Destino,3);
			(!_.isEmpty(Mensaje)) ? $('#MsgOverlay').html(Mensaje) : '';
		}

	} /* /this.MostrarEspera */

	this.OcultaEspera = function(){
		$('#TitVentana').html($('#TitVentana').attr('TitOri'));
		$('.CargandoTitulo').each(function(){ $(this).html($(this).attr('TitOri'));	});
		$('#Esperando, .overlayCargandoInformacion').remove();
	}

	this.OcultarOverlay = function(){ $('.overlayCargandoInformacion, #Overlay').remove(); }

	self._TiempoSolicitud = function(){
		var _Time = new Date();
		_Time = '?t='+_Time.getTime();
		return _Time;
	}

	self._MensajeEnviado = function(){
		$('#MensajeEnviado').remove();
		$('body').append(self._HtmlMensajeEnviado);
		setTimeout(function(){ $('#MensajeEnviado .BodyEmail').addClass('BounceCloseOut'); }, 3500);
		setTimeout(function(){ $('#MensajeEnviado').remove();}, 3800);
	}

	self._AbreMenuSlideToggle = function(Op){
		$(Op.Abre).slideToggle('slow');
	}

	var AddTime = function(p){
		var _Time = new Date();
		_Time = _Time.getTime();
		if(typeof p==='string'){ p == '' ? p = 'dbspTime='+_Time : p = p+'&dbspTime='+_Time; }
		if(typeof p==='object'){ p.dbspTime=_Time; }
		return p;
	}

	var Opciones = function(Op){
		/*
			var data = { one: 'asd asd asdoas asdkj', two: 1123 };
			var result = '';
			for(key in data) {result += key + '=' + escape(data[key]) + '&';}
			result = result.slice(0, result.length - 1); 
		*/

		Op.Link === undefined ? self._LinkFile = '' : self._LinkFile = Op.Link;
		Op.Parametros === undefined ? _Parametros = '' : _Parametros = AddTime(Op.Parametros);
		Op.Destino === undefined ? self._Destino = '' : self._Destino = Op.Destino;
		Op.Funcion !== undefined ? self._Funcion = Op.Funcion : self._Funcion = undefined;
		Op.Objeto === undefined ? self._Objeto = '' : self._Objeto = Op.Objeto;
		Op.EsPagina === undefined ? self._EsPagina = 1 : self._EsPagina = Op.EsPagina;
		Op.Div !== undefined ? self._Div = Op.Div : '';
		Op.DataType !== undefined ? self._DataType = Op.DataType : self._DataType = 'html';
		Op.Almacen !== undefined ? self._Almacen = Op.Almacen:self._Almacen = undefined;
		Op.metodo !== undefined ? self._metodo = Op.DataType : self._metodo = 'POST';
		Op.FormData !== undefined ? self._FormData = true : self._FormData = false;
	}

	var AjaxSetUp = function(){ $.ajaxSetup({ 'beforeSend' : function(xhr) { xhr.overrideMimeType('text/html; charset=iso-8859-1;'); } }); }

	var GetData = function(){
		$('.tipsy').remove();
		var Respuesta='';

		if(self._DataType=='json'){
			Respuesta = JSON.parse('{"jsonDatos":[{}]}');
		}

		if(!_.isUndefined(self._Almacen)){
			var Almacen = SalesUp.Sistema.Almacenamiento({a:self._Almacen});
			if( !_.isUndefined( Almacen ) ){
				if(_.size(Almacen)>0){
					return SalesUp.Sistema.Almacenamiento({a:self._Almacen});
				}
			}
		}

			$.ajaxSetup({
				beforeSend:function(xhr){
					xhr.overrideMimeType('text/'+self._DataType+'; charset=iso-8859-1;');
				}/*,
				error:function(xhr, textStatus, errorThrown, exception){
					var codigo = xhr.status, message;
					var statusErrorMap = {
					    '400' : "Server understood the request, but request content was invalid.",
					    '401' : "Unauthorized access.",
					    '403' : "Forbidden resource can't be accessed.",
					    '404' : "File not found.",
					    '500' : "Internal server error.",
					    '503' : "Service unavailable."
					};

					if(codigo){
						message =statusErrorMap[codigo];
						if(!message){ throw Error("Unknown Error \n."); }else{throw Error(message);}
					}else if(exception=='parsererror'){
					    throw Error("Error.\nParsing JSON Request failed.");
					}else if(exception=='timeout'){
					    throw Error("Request Time out.");
					}else if(exception=='abort'){
					    throw Error("Request was aborted by the server");
					}else{
					    throw Error("Unknown Error \n.");
					}
				}*/
			});

			var contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
			var processData = true;

			if(self._FormData){
				contentType = false;
				processData = false;
			}

			SalesUp.Variables.xhr = $.ajax({ type:'POST', async:false, dataType: self._DataType, processData: processData, contentType: contentType, cache: false,
				url: self._LinkFile,
				data: _Parametros
			}).done(function(RespuestaData){

				PasaGetData = SalesUp.Sistema.NoEsIndex({Resp:RespuestaData});
				if(PasaGetData){
					if(!_.isEmpty(self._Destino)){
						$(self._Destino).html(RespuestaData);
					}else{
						if(self._DataType=='json'){
							SalesUp.Variables.abortAjaxJson = SalesUp.Variables.xhr;
							Respuesta = JSON.parse( EscapeSpecialChars( $.trim(JSON.stringify(RespuestaData)) ) );
						}else{
							Respuesta = RespuestaData;
						}
					}
					(self._Funcion) ? eval(self._Funcion) : '';
				}
			});

		setTimeout(function(){ SalesUp.Sistema.Almacenamiento({a:'SysReload',v:0}); },5000);

		if(!_.isUndefined(self._Almacen)){
			SalesUp.Sistema.Almacenamiento({a:self._Almacen, v:Respuesta});
		}


		AjaxSetUp();
		if(_.isEmpty(self._Destino)){ return Respuesta; }
		//if(self._Div==0){ return Respuesta; }
	}/* /GetData */



	this.CargaDatosAsync = function(Op){

			$('.tipsy').remove();
			var metodo='GET', linkFile, parametros='', destino, callback, objecto, esPagina, dataType='json', almacen, Respuesta='', respuestaAlmacen, error, prmAdicionales, formData = false;

			(Op.link)			? linkFile 	 	 = Op.link : '';
			(Op.parametros) 	? parametros 	 = Op.parametros : '';
			(Op.prmAdicionales) ? prmAdicionales = Op.prmAdicionales : '';
			(Op.callback)		? callback   	 = Op.callback : '';
			(Op.dataType)		? dataType   	 = Op.dataType : '';
			(Op.almacen)		? almacen   	 = Op.almacen:'';
			(Op.metodo)			? metodo   	 	 = Op.metodo:'';
			(Op.formData)		? formData 	 	 = Op.formData:'';

			var contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
			var processData = true;

			if(formData){
				contentType = false;
				processData = false;
			}

			if(almacen){
				respuestaAlmacen = SalesUp.Sistema.Almacenamiento({a:almacen});
				if((respuestaAlmacen)&&(respuestaAlmacen!='null')&&(respuestaAlmacen!='undefined')){
					if (callback){callback(respuestaAlmacen,null, prmAdicionales);}
					return true;
				}
			}

			$.ajaxSetup({beforeSend:function(xhr){xhr.overrideMimeType('text/json; charset=iso-8859-1;');}});
			$.ajax({ type:metodo, async:true, dataType: dataType, cache: false,
				contentType: contentType,
    			processData: processData,
				url: linkFile, data: parametros
			}).done(function(RespuestaData){
				$.ajaxSetup({ 'beforeSend':function(xhr){ xhr.overrideMimeType('text/html; charset=iso-8859-1;'); } });
				if(almacen){SalesUp.Sistema.Almacenamiento({a:almacen, v:RespuestaData});}
				if (callback){callback(RespuestaData,null, prmAdicionales);}
			}).fail(function(xhr, textStatus, errorThrown){
				$.ajaxSetup({ 'beforeSend':function(xhr){ xhr.overrideMimeType('text/html; charset=iso-8859-1;'); } });
				error = {xhr:xhr, textStatus:textStatus, errorThrown:errorThrown};
				if (callback){callback(null,error, prmAdicionales);}
			});

			return true;
	}/* /CargaDatosAsync */



	this.PostData = function(Op){
		$.ajaxSetup({ 'beforeSend' : function(xhr) { xhr.overrideMimeType('text/html; charset=iso-8859-1;'); } });
		$.ajax({ type:'POST', async:false, dataType:'html', cache: false,
			url: Op.Link+'?'+AddTime(Op.Parametros)
		}).done(function(RespuestaData){
			(Op.Funcion) ? eval(Op.Funcion+'()') : '';
		});
	}






	this.Almacenamiento = function(Op){

		for (x=0; x<=localStorage.length-1; x++){
			clave = localStorage.key(x);
			if(localStorage.getItem(clave) == '[object Object]'){
				localStorage.removeItem(clave)
			}
		}

		var str='', Contenido='', esJson=false;
		str = Op.a.substring(0,4);
		(str == 'json') ? esJson = true : '';

		if(Op.v === undefined){

			var Guardado = localStorage[Op.a];
			if(!_.isUndefined(Guardado)){
				(esJson) ? Guardado = JSON.parse(Guardado) : '';
			}

			var PasaGetData = SalesUp.Sistema.NoEsIndex({Resp:Guardado});
			if(!PasaGetData){ Guardado = undefined; }

			return Guardado;
		}else{
			(esJson) ? Contenido = JSON.stringify(Op.v) : Contenido = Op.v;
			var PasaGetData = SalesUp.Sistema.NoEsIndex({Resp:Contenido});
			if(!PasaGetData){ return false; Contenido = ''; }
			if(Contenido=='[object Object]'){ return false; }

			try{
				localStorage[Op.a] = Contenido;
			}catch(e){
				if(e == QUOTA_EXCEEDED_ERR){
					SalesUp.Sistema.BorrarTodoAlmacen();
					localStorage[Op.a] = Contenido;
				}
			}
		}
	} /* /Almacenamiento */

	this.NoEsIndex = function(Op){
		var EsIndex, EsOoops, Pasa = true;

		if(_.isUndefined(Op.Resp)){Op.Resp = '';}
		if(!Op.Resp){return false;}
		if(_.isObject(Op.Resp)){ Str = JSON.stringify(Op.Resp);	}
		else{ Str = Op.Resp; }

		var IndentificaIndex = 'VerificaParent.js';
		EsIndex = Str.toString().indexOf(IndentificaIndex);

		var IndentificaOoops = 'url=/privado/ooops.dbsp';
		EsOoops = Str.toString().indexOf(IndentificaOoops);

		if( (EsIndex>0) || (EsOoops>0) ){
			SalesUp.Sistema.BorrarTodoAlmacen();
			Pasa=false;
		}
		return Pasa;
	}/*NoEsIndex*/

	this.IntentarDeNuevo = function(){
		var Reload = parseInt(SalesUp.Sistema.Almacenamiento({a:'SysReload'}));
		SalesUp.Sistema.BorrarTodoAlmacen();

		if( (Reload<=3) ){
			Reload = Reload+1;
			SalesUp.Sistema.Almacenamiento({a:'SysReload',v:Reload});
			SalesUp.Variables.xhr.abort();
			setTimeout(function(){
				document.location = location.pathname+'?r='+((new Date()).getTime());
			},100);
		}

		if(Reload==4){
			setTimeout(function(){
				document.location = 'inicio.dbsp?n='+((new Date()).getTime());
			},100);
		}

	}

	this.BorrarItemDeAlmacen = function(Item){
		localStorage.removeItem(Item);
	}

	this.BorrarTodoAlmacen = function(){
		for (x=localStorage.length-1; x>=0; x--) {
			var Item = localStorage.key(x);
			var Sys = Item.substring(0,3);
			if(Sys!='Sys'){
				localStorage.removeItem(Item);
			}
		}
	}

	this.EliminaConfigColumnas = function(){
		SalesUp.Sistema.BorrarItemDeAlmacen('ProspectosTheadColumas');
		SalesUp.Sistema.BorrarItemDeAlmacen('ProspectosTbodyColumas');
		SalesUp.Sistema.BorrarItemDeAlmacen('ClientesTbodyColumas');
		SalesUp.Sistema.BorrarItemDeAlmacen('ClientesTbodyColumas');
	}

	this.CargaDatos = function(Op){
		Opciones(Op);

		if(PasaGetData){
			return GetData();
		}else{
			SalesUp.Sistema.IntentarDeNuevo();
		}

	}

	this.PublicaDatos = function(Op){
		Opciones(Op);
		PostData();
	}

	this.Encript = function(_obj){
		var Base64 = {
			_keyStr	: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
			encode 	: function(e){
				var t = "";
				var n,r,i,s,o,u,a;
				var f = 0;

				e = Base64._utf8_encode(e);

				while(f < e.length){
					n = e.charCodeAt(f++);
					r = e.charCodeAt(f++);
					i = e.charCodeAt(f++);
					s = n >> 2;
					o = (n&3)<<4|r>>4;
					u = (r&15)<<2|i>>6;
					a = i&63;

					if(isNaN(r)){
						u = a = 64;
					}else if(isNaN(i)){
						a = 64;
					}

					t = t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a);
				}

				return t;
			},
			decode : function(e){
				var t = "";
				var n,r,i;
				var s,o,u,a;
				var f = 0;

				e = e.replace(/[^A-Za-z0-9\+\/\=]/g,"");

				while(f<e.length){
					s = this._keyStr.indexOf(e.charAt(f++));
					o = this._keyStr.indexOf(e.charAt(f++));
					u = this._keyStr.indexOf(e.charAt(f++));
					a = this._keyStr.indexOf(e.charAt(f++));
					n = s<<2|o>>4;
					r = (o&15)<<4|u>>2;i=(u&3)<<6|a;
					t = t+String.fromCharCode(n);

					if(u!=64){
						t = t+String.fromCharCode(r);
					}

					if(a!=64){
						t = t+String.fromCharCode(i);
					}
				}

				t = Base64._utf8_decode(t);

				return t;
			},
			_utf8_encode : function(e){
				e = e.replace(/\r\n/g,"\n");
				var t = "";

				for(var n=0;n<e.length;n++){
					var r = e.charCodeAt(n);

					if(r<128){
						t+=String.fromCharCode(r);
					}else if(r>127&&r<2048){
						t+=String.fromCharCode(r>>6|192);
						t+=String.fromCharCode(r&63|128);
					}else{
						t+=String.fromCharCode(r>>12|224);
						t+=String.fromCharCode(r>>6&63|128);
						t+=String.fromCharCode(r&63|128);
					}
				}

				return t;
			},
			_utf8_decode : function(e){
				var t = "";
				var n = 0;
				var r=c1=c2=0;

				while(n<e.length){
					r = e.charCodeAt(n);

					if(r<128){
						t+=String.fromCharCode(r);
						n++;
					}else if(r>191&&r<224){
						c2 = e.charCodeAt(n+1);
						t+=String.fromCharCode((r&31)<<6|c2&63);
						n+=2;
					}else{
						c2 = e.charCodeAt(n+1);
						c3 = e.charCodeAt(n+2);
						t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);
						n+=3;
					}
				}
				return t;
			}
		}

		// Encode the String
		if(_obj.tipo == 'encode' || _.isUndefined(_obj.tipo)){
			var encodedString = Base64.encode(_obj.cadena);
		}else if(_obj.tipo == 'decode'){
			var encodedString = Base64.decode(_obj.cadena);
		}

		return encodedString;
	}


	var EscapeSpecialChars = function(v){
		v = SalesUp.Sistema.StrReplace('á','\u00e1',v);

		return v;
	};

	this.FormatoMoneda = function (Numero){
		var sinFormato = function(v){
			var SysSepDecimales = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});
			return accounting.unformat(v, SysSepDecimales);
		}

		Numero = sinFormato(Numero);

		var MonedaFormato='%s%v';
		var SysMoneda;
		var SysMonedaUsuario = SalesUp.Sistema.Almacenamiento({a:'SysMoneda'});
		var SysMonedaDefault = SalesUp.Sistema.Almacenamiento({a:'SysSimboloMonedaDefault'});

			SysMoneda = (SysMonedaDefault) ? SysMonedaDefault : SysMonedaUsuario;

			(!SysMoneda) ? SysMoneda='$' : '';

			SysMoneda = SalesUp.Sistema.StrReplace('.','', SysMoneda);
			SysMoneda = SalesUp.Sistema.StrReplace(',','', SysMoneda);
		var SysFormatoMoneda = SalesUp.Sistema.Almacenamiento({a:'SysFormatoMoneda'});
		var SysSepMiles = SalesUp.Sistema.Almacenamiento({a:'SysSepMiles'});
		var SysSepDecimales = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});

		(!SysSepMiles)?SysSepMiles=',':'';
		(!SysSepDecimales)?SysSepDecimales='.':'';
		(!SysFormatoMoneda)?SysFormatoMoneda=0:'';
		(SysFormatoMoneda==0)?MonedaFormato='%s%v':'';
		(SysFormatoMoneda==1)?MonedaFormato='%v%s':'';
		(SysFormatoMoneda==2)?MonedaFormato='%s %v':'';
		(SysFormatoMoneda==3)?MonedaFormato='%v %s':'';

		return accounting.formatMoney(sinFormato(Numero), SysMoneda, 2, SysSepMiles, SysSepDecimales, MonedaFormato);
	}

	this.moneda = function (Op){
		var numero = (Op.numero) ? Op.numero:0;
		var moneda = (Op.moneda) ? Op.moneda:'';
		var monedaFormato='%s%v';

		moneda = SalesUp.Sistema.StrReplace('.','', moneda);
		moneda = SalesUp.Sistema.StrReplace(',','', moneda);

		var sysFormatoMoneda = SalesUp.Sistema.Almacenamiento({a:'SysFormatoMoneda'});
		var sysSepMiles 	 = SalesUp.Sistema.Almacenamiento({a:'SysSepMiles'});
		var sysSepDecimales  = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});

		(!sysSepMiles)?sysSepMiles=',':'';
		(!sysSepDecimales)?sysSepDecimales='.':'';
		(!sysFormatoMoneda)?sysFormatoMoneda=0:'';
		(sysFormatoMoneda==0)?monedaFormato='%s%v':'';
		(sysFormatoMoneda==1)?monedaFormato='%v%s':'';
		(sysFormatoMoneda==2)?monedaFormato='%s %v':'';
		(sysFormatoMoneda==3)?monedaFormato='%v %s':'';

		return accounting.formatMoney(numero, moneda, 2, sysSepMiles, sysSepDecimales, monedaFormato);
	}

	this.FormatoNumero = function(Numero){
		var SysSepMiles = SalesUp.Sistema.Almacenamiento({a:'SysSepMiles'});
		var SysSepDecimales = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});
		(!SysSepMiles)?SysSepMiles=',':'';
		(!SysSepDecimales)?SysSepDecimales='.':'';

		return accounting.formatNumber(Numero, 0, SysSepMiles, SysSepDecimales);
	}

	this.FormatoPorcentaje = function(Numero){
		var Porcentaje = (Numero * 100);
		var EsDecimal = ((Numero * 100) % 1);
		if(EsDecimal>0){ Porcentaje = SalesUp.Sistema.NumeroDosDecimales( Porcentaje );	}
		Porcentaje = SalesUp.Sistema.formatoNumero(Porcentaje);
		Porcentaje = Porcentaje + '%';

		Porcentaje = SalesUp.Sistema.StrReplace('.00%','%',Porcentaje);
		Porcentaje = SalesUp.Sistema.StrReplace('.10%','.1%',Porcentaje);
		Porcentaje = SalesUp.Sistema.StrReplace('.20%','.2%',Porcentaje);
		Porcentaje = SalesUp.Sistema.StrReplace('.30%','.3%',Porcentaje);
		Porcentaje = SalesUp.Sistema.StrReplace('.40%','.4%',Porcentaje);
		Porcentaje = SalesUp.Sistema.StrReplace('.50%','.5%',Porcentaje);
		Porcentaje = SalesUp.Sistema.StrReplace('.60%','.6%',Porcentaje);
		Porcentaje = SalesUp.Sistema.StrReplace('.70%','.7%',Porcentaje);
		Porcentaje = SalesUp.Sistema.StrReplace('.80%','.8%',Porcentaje);
		Porcentaje = SalesUp.Sistema.StrReplace('.90%','.9%',Porcentaje);

		Porcentaje = SalesUp.Sistema.StrReplace(',00%','%',Porcentaje);
		Porcentaje = SalesUp.Sistema.StrReplace(',10%',',1%',Porcentaje);
		Porcentaje = SalesUp.Sistema.StrReplace(',20%',',2%',Porcentaje);
		Porcentaje = SalesUp.Sistema.StrReplace(',30%',',3%',Porcentaje);
		Porcentaje = SalesUp.Sistema.StrReplace(',40%',',4%',Porcentaje);
		Porcentaje = SalesUp.Sistema.StrReplace(',50%',',5%',Porcentaje);
		Porcentaje = SalesUp.Sistema.StrReplace(',60%',',6%',Porcentaje);
		Porcentaje = SalesUp.Sistema.StrReplace(',70%',',7%',Porcentaje);
		Porcentaje = SalesUp.Sistema.StrReplace(',80%',',8%',Porcentaje);
		Porcentaje = SalesUp.Sistema.StrReplace(',90%',',9%',Porcentaje);
		return Porcentaje;
	}

	this.SimboloPorcentaje = function(Op){
		var Porcentaje = Op.Numero;
		var EsDecimal = ((Op.Numero) % 1);
		if(EsDecimal>0){ Porcentaje = SalesUp.Sistema.NumeroDosDecimales( Porcentaje );	}
		Porcentaje = Porcentaje + '%';
		return Porcentaje;
	}

	this.MonedaANumero = function (Numero){
		var SysSepDecimales = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});
		(!SysSepDecimales)?SysSepDecimales='.':'';
		return accounting.unformat(Numero, SysSepDecimales );
	}

	this.FormatoHora = function(){
		$('.FormatoHora').each(function(){
          var hr = $(this).html();
          if(hr!=''){
            if(hr.indexOf(':')<0){
              if(hr<10){hr='0'+hr;}
              hr = hr+':00';
            }else{
              var hrs = hr.split(':');
              if(hrs[0]<10){hr='0'+hrs[0]+':'+hrs[1];}
            }
            $(this).html(hr).removeClass('FormatoHora');
          }
        });
	}

	this.Combina2splits = function(_obj){
		var arrayAux	= [];
		if(!_obj.texto){return arrayAux};
       	var array 		= _obj.texto.split(_obj.separador1) ;

       	for( var ns = 0 ; ns < array.length ; ns++ ){
        	var arrayDos = array[ ns ].split(_obj.separador2) ;
        	arrayAux.push(arrayDos.toString());
       	}
       	return arrayAux.toString().split(',');
	};

	this.ConvierteaComposeMail = function(){
		$('.EsCorreo').each(function(){
			var $This = $(this);
			var Email = $.trim($This.html());
			//Es corrreo nuevo//
			var LinkCorreoAux 	= '';
			var arrayEmails 	= SalesUp.Sistema.Combina2splits({texto:Email,separador1:',',separador2:';'});

			for (var i = 0; i < arrayEmails.length; i++) {
				var _elementoActual = $.trim(arrayEmails[i]);
				var idp = $This.attr('data-idp');
				var dataIdo = $This.attr('data-ido');
				var ido = '';

				var tkp = $This.attr('data-tkp');
				var tko = $This.attr('data-tko');

				if(_.size(dataIdo)>0){ido = dataIdo; }

				LinkCorreo = _elementoActual;

				var prmIdp = 'idp:[idp],';
				var prmIdo = 'ido:[ido],';

				if(tkp){prmIdp = 'tkp:\''+tkp+'\',';}
				if(tko){prmIdo = 'tko:\''+tko+'\',';}

				if(SalesUp.Valida.ValidaEsCorreo(_elementoActual)){

					LinkCorreo = '<b class="Tip2 Pointer" tip="Enviar correo a [Email]" onclick="SalesUp.Correo.nuevoCorreo({ '+prmIdp + prmIdo+' prm:\'&correoAdicional=[Email]\' });">';
					LinkCorreo += '<i class="fa fa-envelope"></i> [Email]</b>';
					LinkCorreo = SalesUp.Sistema.StrReplace('[Email]',_elementoActual,LinkCorreo);
					LinkCorreo = SalesUp.Sistema.StrReplace('[idp]',idp,LinkCorreo);
					LinkCorreo = SalesUp.Sistema.StrReplace('[ido]',ido,LinkCorreo);
				}


				if(i==0){
					LinkCorreoAux = LinkCorreo;
				}else{
					LinkCorreoAux = LinkCorreoAux+', '+LinkCorreo;
				}

				if(i == arrayEmails.length-1){
					$This.html(LinkCorreoAux).removeClass('EsCorreo').removeAttr('data-idp');
				}
			};

        });
	}/*ConvierteaComposeMail*/

	this.NumeroDosDecimales = function(Numero){ return accounting.toFixed(Numero, 2); }

	this.CalculaDatoPromedio = function (Total, n){
		var Promedio = 0;
		(n>0)? Promedio = (Total / n) : '';
		return SalesUp.Sistema.NumeroDosDecimales(Promedio);
	}

	this.FormatoFecha = function(Fecha){
		var SysfFecha = SalesUp.Sistema.Almacenamiento({a:'SysFormatoFecha'});
		(!SysfFecha) ? SysfFecha='dd/mm/yy':'';
		return SalesUp.Fechas.FormatoFecha(Fecha, 103, SysfFecha);
	}

	this.FormatoTelefono = function(phone){
		phoneOriginal = phone;
	    nTelefono = phone.length;
	    phone = phone.replace(/[^0-9]/g, '');

	    if(nTelefono==10){
	        phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
	    }else if(nTelefono==7){
	        phone = phone.replace(/(\d{1})(\d{2})(\d{2})(\d{2})/, "$1 $2-$3-$4");
	    }else{ phone = phoneOriginal; }

	    return phone;
	}

	this.IniciaPlugins = function(){
		SalesUp.Sistema.ModulosActivos();
		setTimeout(function(){
			if(!_.isUndefined(window.dbspPuedeExportar)){
				if(dbspPuedeExportar!=1){ $('.boton.exportar, .ExportarInformacion').remove(); }
			}
		},100);

		this.InterpretaHtml();
		this.QuitaBr();

		$('.nArchivos').each(function(){
			var ids = $(this).attr('ids');
			if(ids){
				var OnClick = 'SalesUp.Construye.VerLtArchivos({Elem:this,'+ids+'})';
				$(this).attr('onclick',OnClick);
			}
		});

		this.ActivaRedesSociales();

		$('.FormatToMoney').each(function(){
			$(this).html(SalesUp.Sistema.FormatoMoneda( $(this).html() )).removeClass('FormatToMoney');
		});

		$('.FormatNumber').each(function(){
			$(this).html(SalesUp.Sistema.FormatoNumero($(this).html()));
		});

		$('.FormatDecimal').each(function(){
			$(this).html(SalesUp.Sistema.NumeroDosDecimales( $(this).html() ));
		});

		$('.FormatDate').each(function(){
			if($(this).html()!=''){
				$(this).html(SalesUp.Sistema.FormatoFecha($(this).html())).removeClass('FormatDate');
			}
		});

		$('.FormatoTel').each(function(){
			$(this).html(SalesUp.Sistema.FormatoTelefono( $(this).html() ));
		});

		$('.dateFormat').each(function(){
			if($(this).html()!=''){
				$(this).html(SalesUp.Sistema.dateFormat($(this).html())).removeClass('dateFormat');
			}
		});

		$('.simboloMoneda').each(function(){
			var $t = $(this);
			var unicode = $t.attr('data-unicode');
			(unicode=='') ? unicode = 36 :'';
	        var simbolo = String.fromCharCode(unicode);
	        var cantidad = $t.attr('data-cantidad');
	        var formateado = SalesUp.Sistema.moneda({numero:cantidad, moneda:simbolo});
	        $t.html(formateado);
		});

		SalesUp.Sistema.MinutosFormatos();
		SalesUp.Sistema.FechaFormato();

		$('.AccionSMS').each(function(){
		    var Tel           = $(this).attr("tel");
		    var IdProspecto   = $(this).attr("idprospecto");
		    var tkP   = $(this).attr("data-tkp");

		    var IdOportunidad = $(this).attr("idoportunidad");
			if (IdOportunidad=="") IdOportunida = 0;
		    var tel = SalesUp.Sistema.FormatoTelefono( $(this).html() );

		    var Parametros = 'idprospecto='+IdProspecto+'&tel='+Tel+'&idoportunidad='+IdOportunidad+"&tkp="+tkP;
		    var Titulo = 'Enviar SMS al número: '+tel;
			var onclick = "SalesUp.Sistema.AbrePopUp({ Pagina:'popup_enviar_sms.dbsp', Titulo:'"+Titulo+"', Parametros:'"+Parametros+"', CallBack:'SalesUp.Variables.InformacionEmpresa', Alto:180, Ancho:450 });";
			var link = '<span onclick="'+onclick+'" class="Tip1 Pointer" tip="Enviar SMS al número '+tel+'" ><b>'+tel+'</b></span>'


			if ((Tel != '') &&(Tel.replace(/[^0-9]/g, '').length>=10))
			  $(this).html(link);
			else {
			  $(this).html(tel);
			  $(this).addClass("Tip1");
			  $(this).addClass("CorreoInvalido");
			  $(this).attr("tip", 'El teléfono móvil válido es de al menos 10 dígitos');
			}
			 $(this).removeClass("AccionSMS");
		});

		$('.Puntos256').each(function(){
			var $Elemento = $(this);
			var Texto = $Elemento.html();
			var nTexto = Texto.length;
			if(nTexto>=256){
				$Elemento.attr('tip',Texto).addClass('Tip7');
				Texto = Texto.substring(0,256)+'...';
			}
			$Elemento.html(Texto);
		});

		SalesUp.Sistema.Puntos90();

		$('.CircleCerteza').each(function(){
			var Porcentaje = $(this).attr('certeza');
			if(Porcentaje<0.34){ $(this).addClass('Rojo Tip1').attr('Tip','Certeza baja'); }
			if( (Porcentaje>=0.34) && (Porcentaje<0.66) ){ $(this).addClass('Amarillo Tip1').attr('Tip','Certeza media'); }
			if(Porcentaje>=0.66){ $(this).addClass('Verde Tip1').attr('Tip','Certeza alta'); }
		});

		$('.FormatPercent').each(function(){
			$(this).html( SalesUp.Sistema.FormatoPorcentaje($(this).html()) ).removeClass('FormatPercent');
		});

		var arrJavaScript = $('a[href*="javascript:Etq"]');
		for (var i = 0; i <= arrJavaScript.length - 1; i++){
			var $a = $(arrJavaScript[i]);
			var href = $a.attr('href');
			href = SalesUp.Sistema.StrReplace('javascript:Etq','javascript:SalesUp.Sistema.verEtiquetas',href);
			$a.attr('href',href);
		};

		SalesUp.Sistema.renderTipoCampos();

		SalesUp.Sistema.ConvierteaComposeMail();
		$('table.simple tbody tr:even').addClass('zebra');
		$('.ConZebra li:even').addClass('Even');
		$('.ConZebra li:odd').addClass('Odd');
		if($.thickbox){ $.thickbox(); }
		SalesUp.Sistema.ContactoCanalizado();
		SalesUp.Sistema.Tipsy();
		SalesUp.Sistema.IniciaPickers();
		SalesUp.Sistema.filtrosPersonalizados();
		SalesUp.Sistema.RestriccionesCorporativo();
	}/* /IniciaPlugins */

	this.renderTipoCampos = function(){
		var generaGraficaPorcentaje = function(){
			var progress = '';
			progress += '<div class="progress progress-striped active">';
			progress += '	<span class="LbPorcentaje">[P]%</span>';
			progress += '	<div style="width:[P]%" class="progress-bar progress-bar-success"></div>';
			progress += '</div>';

			var arrGrafica = $('.generaGrafica[data-tipocampo="9"]');

			for (var i = 0; i <= arrGrafica.length - 1; i++){
				var $t = $(arrGrafica[i]);
				var v = $t.attr('data-valor');
				var grafica = SalesUp.Sistema.StrReplace('[P]',v,progress);
				$t.html(grafica);
			};
		}/*generaGraficaPorcentaje*/

		var generaTemperatura = function(){
			var arrTemperatura = $('.generaTemperatura[data-tipocampo="6"]');
			for (var i = 0; i <= arrTemperatura.length - 1; i++){
				var $t = $(arrTemperatura[i]);
				var v = $.trim($t.attr('data-valor'));

				var h = '';
				if(v!=''){
					if(v.indexOf('[')==-1){ v = '['+v+']'; }
					var j;
					try{ j = JSON.parse(v);	}catch(e){ j = [{}]; }
					j = j[0];
					h ='<i tip="'+j.Opcion+'" style="color:'+j.color+' !important;" class="IconoTemperatura Tip1 fa fa-lg '+j.icono+'"></i>';
				}
				$t.html(h);
			};
		}/*generaTemperatura*/
		// TIPO 8 Y 7  NECESITA --> []
		var OpcionesListas = function(){
			var generaOpciones = function(Op){
				var arr = Op.arr, tipo = Op.tipo;
				var icono = 'fa-dot-circle-o';
				(tipo=='7') ? icono = 'fa-check-square-o' : '';
				for (var i = 0; i <= arr.length - 1; i++){
					var $t = $(arr[i]);
					var v = $t.attr('data-valor'), c='';
					if((v!='')&&(v!='null')){
						if(v.indexOf('[')==-1){ v = '['+v+']'; }
						var j;
						try{ j = JSON.parse(v);	}catch(e){ j = [{}]; }
						for(var x = 0; x < j.length; x++){
							if(j[x].Opcion){c += '<span><i class="fa '+icono+'"></i> '+ j[x].Opcion+'</span>';}
						};
					}
					$t.html(c);
				};
			}

			var arrOpcionesChecks = $('.tdListaChecks[data-tipocampo="7"]');
			var arrOpcionesRadios = $('.tdListaRadio[data-tipocampo="8"]');

			generaOpciones({arr:arrOpcionesChecks, tipo:7});
			generaOpciones({arr:arrOpcionesRadios, tipo:8});

		}/*OpcionesListas*/

		var OpcionesListaTexto = function(){
			var arr = $('.tdListaTexto[data-tipocampo="3"]'), j;
			for (var i = 0; i <= arr.length - 1; i++){
				var $t = $(arr[i]);
				var v = $t.attr('data-valor'), c='';
				if(v!=''){
					try{ j = JSON.parse(v);	}catch(e){ j = {}; }
					var valor = (j.valor) ? ' - '+j.valor : '';
					if(j.select){
						c += '<span style="display:block;">'+j.select+valor+'</span>';
					}
				}
				$t.html(c);
			};
		}/*OpcionesListaTexto*/

		OpcionesListaTexto();
		OpcionesListas();
		generaTemperatura();
		generaGraficaPorcentaje();

	}/*renderTipoCampos*/

	this.activaCheck = function(Op){
		var $Elemento = $(Op.t);
		var $Padre = $Elemento.closest('.LabelCheck');
		var check =  $Elemento.is(':checked');
		(check) ? $Padre.attr('data-activo','1') : $Padre.attr('data-activo','0');
	}

	this.dateFormat = function(f){
		var Formato = SalesUp.Sistema.Almacenamiento({a:'SysFormatoFecha'});
		Formato = SalesUp.Sistema.StrReplace('yy','yyyy',Formato);
		Formato = SalesUp.Sistema.StrReplace('mm','mmm',Formato);
		Formato = Formato.toUpperCase();
		var fecha = moment(f).format(Formato);
		fecha = SalesUp.Sistema.StrReplace('.','',fecha);
		return fecha ;
	}

	this.Puntos90 =  function(){
		$('.Puntos90').each(function(){
			var $Elemento = $(this);
			var Texto = $Elemento.html();
			var nTexto = Texto.length;
			if(nTexto>=87){
				$Elemento.attr('tip',Texto).addClass('Tip7');
				Texto = Texto.substring(0,87)+'...';
			}
			$Elemento.html(Texto);
		});
	}

	this.InterpretaHtml= function(){
		$('.etiquetas, .Html, .VerArchivos').each(function(){
			$(this).html(_.unescape($(this).html())).removeClass('Html');
		});

		$('.etiquetas').removeClass('etiquetas').addClass('tags');
	}

	this.QuitaBr = function(){
		$('.QuitaBr').each(function(){
			var li = $(this).html(); li = SalesUp.Sistema.StrReplace('<br>',' ',li);
			li = SalesUp.Sistema.StrReplace('<br/>',' ', li); $(this).html(li);
		});
	}

	this.FormatoMinutos = function(Op){
		var Dato = '';
		var MINS_PER_YEAR = 24 * 365 * 60;
		var MINS_PER_MONTH = 24 * 30 * 60;
		var MINS_PER_WEEK = 24 * 7 * 60;
		var MINS_PER_DAY = 24 * 60;
		var MINS_PER_HOUR = 60;

		var minutes = Op.Minutos;

		if(Op.Tipo == 'm'){
			var months = ((minutes / MINS_PER_MONTH) % 1) ? SalesUp.Sistema.NumeroDosDecimales((minutes / MINS_PER_MONTH)) : (minutes / MINS_PER_MONTH);
			return (Op.Unidad) ? months + " meses" : months ;
		}

		if(Op.Tipo == 'sem'){
			var weeks = ((minutes / MINS_PER_WEEK) % 1) ? SalesUp.Sistema.NumeroDosDecimales((minutes / MINS_PER_WEEK)) : (minutes / MINS_PER_WEEK);
			return (Op.Unidad) ? weeks + " sem" : weeks ;
		}

		if(Op.Tipo == 'd'){
			var days = ((minutes / MINS_PER_DAY) % 1) ? SalesUp.Sistema.NumeroDosDecimales((minutes / MINS_PER_DAY)) : (minutes / MINS_PER_DAY);
			return (Op.Unidad) ? days + " d" : days ;
		}

		if(Op.Tipo == 'h'){
			var days = ((minutes / MINS_PER_HOUR) % 1) ? SalesUp.Sistema.NumeroDosDecimales((minutes / MINS_PER_HOUR)) : (minutes / MINS_PER_HOUR);
			return (Op.Unidad) ? days + " hr" : days ;
		}

		if(Op.Tipo == 'min'){
			return (Op.Unidad) ? minutes + " min" : minutes;
		}

	}/*FormatoMinutos*/

	this.MinutosFormatos = function(){
		$('.MinutosHoras').each(function(){
			$(this).html( SalesUp.Sistema.FormatoMinutos({ Minutos:parseInt($(this).html()), Tipo:'h' }) ).removeClass('MinutosDias');
		});

		$('.MinutosDias').each(function(){
			$(this).html( SalesUp.Sistema.FormatoMinutos({ Minutos:parseInt($(this).html()), Tipo:'d' }) ).removeClass('MinutosDias');
		});

		$('.MinutosSemanas').each(function(){
			$(this).html( SalesUp.Sistema.FormatoMinutos({ Minutos:parseInt($(this).html()), Tipo:'sem' }) ).removeClass('MinutosSemanas');
		});

		$('.MinutosMes').each(function(){
			$(this).html( SalesUp.Sistema.FormatoMinutos({ Minutos:parseInt($(this).html()), Tipo:'m' }) ).removeClass('MinutosMes');
		});
	}/*MinutosFormatos*/

	this.Asterisco = function(){
		$('.InfoObligatorio').each(function(){
	      $Label = $(this).prev();
	      SinAsterisco = SalesUp.Sistema.StrReplace('*','',$Label.html());
	      $Label.html(SinAsterisco+'*');
	    }); /* InfoObligatorio each */
	}



	this.AgregaProgresoArchivo = function(){
		$('body').prepend('<div id="Progress"><div id="ProgressBar"></div><div id="ProgressPercent">0%</div ></div>');
	}
	this.MuestraProgresoArchivo = function(){
		$('#Progress').show();
		$("#ProgressBar").width('0%');
		$("#ProgressPercent").html("0%");
	}
	this.UploadProgresoArchivo = function(Porcentaje){
		$("#ProgressBar").width((Porcentaje/1.15)+'%');
		$("#ProgressPercent").html(SalesUp.Sistema.NumeroDosDecimales(Porcentaje/1.15)+'%');
	}

	this.CompletoProgresoArchivo = function(){
		$("#ProgressBar").width('100%');
		$("#ProgressPercent").html('100%');
		setTimeout(function(){$("#Progress").hide();},300);
	}

	this.DatePickerInicioFin = function(Op){
        var Desde, Hasta, Months;
        var Fecha;
        var FormatoFecha = SalesUp.Sistema.Almacenamiento({a:'SysFormatoFecha'});
        (Op.F) ? Fecha = Op.F : Fecha = '01/01/2000';

        (Op.D) ? Desde = Op.D : Desde = 'Desde';
        (Op.H) ? Hasta = Op.H : Hasta = 'Hasta';
        (Op.M) ? Months = Op.M : Months = 1;
        var dates = $( '#'+Desde+', #'+Hasta ).datepicker({dateFormat:FormatoFecha,startDate:Fecha,minDate:Fecha,
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'], dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
            monthNames:  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            changeMonth: false,
            numberOfMonths: Months,
            onSelect: function( selectedDate ) {;
                var option = this.id == Desde ? 'minDate' : 'maxDate',
                    instance = $( this ).data( 'datepicker' ),
                    date = $.datepicker.parseDate(
                        instance.settings.dateFormat ||
                        $.datepicker._defaults.dateFormat,
                        selectedDate, instance.settings );
                dates.not( this ).datepicker( 'option', option, date );
                (Op.A) ? eval(Op.A) : '';

            }
        });

        $( '#'+Desde ).datepicker({
            changeMonth: true, numberOfMonths: Months,
            onClose: function( selectedDate ){ $( '#'+Hasta ).datepicker( 'option', 'minDate', selectedDate ); }
        });


        $( '#'+Hasta ).datepicker({
            changeMonth: true, numberOfMonths: Months,
            onClose: function( selectedDate ){ $( '#'+Desde ).datepicker( 'option', 'maxDate', selectedDate ); },
        });
    }/* /DatePickerInicioFin */

	this.Tipsy = function(){

		if(SalesUp.Sistema.Almacenamiento({a:'SysEsMobile'})==0){
			$('.Tip1').tipsy({gravity: 's' , fade: true ,title: 'Tip', html:true});
			$('.Tip2').tipsy({gravity: 'sw', fade: true ,title: 'Tip', html:true});
			$('.Tip3').tipsy({gravity: 'w' , fade: true ,title: 'Tip', html:true});
			$('.Tip4').tipsy({gravity: 'nw', fade: true ,title: 'Tip', html:true});
			$('.Tip5').tipsy({gravity: 'n' , fade: true ,title: 'Tip', html:true});
			$('.Tip6').tipsy({gravity: 'ne', fade: true ,title: 'Tip', html:true});
			$('.Tip7').tipsy({gravity: 'e' , fade: true ,title: 'Tip', html:true});
			$('.Tip8').tipsy({gravity: 'se', fade: true ,title: 'Tip', html:true});
		}
	}

	this.IniciaPickers = function(){
		(ConfiguracionPicker) ? $('.Fecha').datepicker(ConfiguracionPicker):'';
		(ConfiguracionPickerNoFechasPasadas) ? $('.FechasNoPasadas').datepicker(ConfiguracionPickerNoFechasPasadas):'';
	}

	this.IraPagina = function(Op){
		var Sin = Op.Ir.indexOf('-SIN');

		if((Op.Ir!='')&&(Sin==-1)){
			document.location.href = Op.Url+'?'+Op.Parametros;
		}
		/*
		setTimeout(function(){
			(SalesUp.Variables.NoIr!=1) ? document.location.href = Url:'';
			SalesUp.Variables.NoIr=0;
		},10);
		*/
	}

	this.rgb2hex = function(rgb){
		if(!_.isUndefined(rgb)){
			rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
			return (rgb && rgb.length === 4) ? "#" +
			("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
			("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
			("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
		}else{
			return '';
		}

	}

	this.hex2rgb = function(hex,opacity){
		if(!_.isUndefined(hex)){
			hex = hex.replace('#','');
		    r = parseInt(hex.substring(0,2), 16);
		    g = parseInt(hex.substring(2,4), 16);
		    b = parseInt(hex.substring(4,6), 16);

		    result = 'rgba('+r+','+g+','+b+', '+opacity/100+')';
		    return result;
		}else{
			return '';
		}
	}
	this.ColoresDefault = function(){

		return true;
		var ExisteCss = _.size($('.CssDinamicoDef'));

		if(ExisteCss==0){
		    var colorFondo  = $('#MenuNuevo').css('background');
			if (colorFondo==""){

		      colorFondo  = $('#MenuNuevo').css('backgroundImage');

			 }
			if (colorFondo=="none"){

		      colorFondo  = $('#MenuNuevo').css('backgroundColor');

			 }
			var colorTexto  = $('#MenuNuevo li a').css('color');

			css = '';
			css += ' .fondoTema{background:'+colorFondo+' !important;}';
			css += ' .textoTema{color:'+colorTexto+'  !important;}';

			$('body').append('<style class="CssDinamicoDef" type="text/css" id="CssDinamicoDef">'+css+'</style>');
		}
	}

	this.ColoresTema = function(){ return;
		$('.CssDinamico').remove();
		$('#ColoresParaMiTema, .CssDinamico').remove();

		var ExisteCss = _.size($('.CssDinamico'));

		if(ExisteCss==0){
			$('body').append('<div id="ColoresParaMiTema" style="display:none;"></div>');
			$ColoresParaMiTema = $('#ColoresParaMiTema');

			if( !_.size($('#menu-superior')) ){
				$ColoresParaMiTema.append('<div id="menu-superior"></div>');
			}

			if( !_.size($('#contenedor')) ){
				$ColoresParaMiTema.append('<div id="contenedor"></div>');
			}

			if( !_.size($('#popup-contenedor')) ){
				$ColoresParaMiTema.append('<div id="popup-contenedor"></div>');
				if( !_.size($('#popup-contenedor form')) ){
					$ColoresParaMiTema.children('#popup-contenedor').append('<form></form>');
				}
				if( !_.size($('#popup-contenedor form label:first')) ){
					$ColoresParaMiTema.children('#popup-contenedor').children('form').append('<label></label>');
				}

				if( !_.size($('#popup-contenedor form input')) ){
					$ColoresParaMiTema.children('#popup-contenedor').children('form').append('<input/>');
				}
			}else{
				if( !_.size($('#popup-contenedor form')) ){
					$('#popup-contenedor').append('<form id="TempForm" style="display:none;"></form>');
				}
				if( !_.size($('#popup-contenedor form label:first')) ){
					$('#popup-contenedor').find('form').append('<label id="TempLabel" style="display:none;"></label>');
				}

				if( !_.size($('#popup-contenedor form input')) ){
					$('#popup-contenedor').find('form').append('<input id="TempInput" style="display:none;"/>');
				}
			}

			var ColorBody = $('body').css('color');
			var colorContenedor = $('#contenedor').css('color');
			var $Fondo1 = $('#menu-superior');
			var $Fondo2 = $('#popup-contenedor form label:first');
			var $ColorInput = $('#popup-contenedor form input[type="text"]').first();
			var BackgroundColor = '', BackgroundImage = '', BackgroundRepeat = '', BackgroundPosition = '', BackgroundAttachment = '';


			SalesUp.Variables.ColorLetra1 = '';
			SalesUp.Variables.ColorLetra2 = '';

			SalesUp.Variables.ColorFondo1 = $Fondo1.css('backgroundColor');
			SalesUp.Variables.ColorFondoOriginal = SalesUp.Variables.ColorFondo1;
			SalesUp.Variables.ColorLetra1 = $Fondo1.css('color');
			SalesUp.Variables.ColorFondo2 = $Fondo2.css('backgroundColor');
			SalesUp.Variables.ColorLetra2 = $Fondo2.css('color');

			if((SalesUp.Variables.ColorFondo1=='transparent')||(SalesUp.Variables.ColorFondo1=='rgba(0, 0, 0, 0)')){
				var aqui = $Fondo1.css('boxShadow').indexOf(')') + 2;
				SalesUp.Variables.ColorFondo1 = $Fondo1.css('boxShadow').substring(0,aqui);
			}

			SalesUp.Variables.ColorFondo1 = SalesUp.Sistema.rgb2hex(SalesUp.Variables.ColorFondo1);
			SalesUp.Variables.ColorFondo2 = SalesUp.Sistema.rgb2hex(SalesUp.Variables.ColorFondo2);
			SalesUp.Variables.cssBackgroundBotones = SalesUp.Sistema.hex2rgb(SalesUp.Variables.ColorFondo2 , 90);
			SalesUp.Variables.ColorFondo2a80 = SalesUp.Sistema.hex2rgb(SalesUp.Variables.ColorFondo2 , 80);


			if(_.size($ColorInput)){
				var Backcolor = '', BackImage = '', BackRepeat = '', BackPosition = '', BackAttachment = '', InputColor = '', BorderColor='';

				Backcolor = $ColorInput.css('backgroundColor');

				if((Backcolor=='transparent')||(Backcolor=='rgba(0, 0, 0, 0)')){
					BackImage = $ColorInput.css('backgroundImage');
					BackRepeat = $ColorInput.css('backgroundRepeat');
					BackPosition = $ColorInput.css('backgroundPosition');
					BackAttachment = $ColorInput.css('backgroundAttachment');
					InputColor = $ColorInput.css('color');
					BorderColor = $ColorInput.css('borderTopColor');
				}
			}

			var idStyle = SalesUp.Construye.IdUnico();
			var css = '';

			css += '.SinResultados, .ui-widget-content, #contenedor .ui-tabs-nav .ui-state-default a{color:'+colorContenedor+'}';/*ok*/

			/*Menu*/
			css += ' .fondoTema{background:'+SalesUp.Variables.ColorFondo1+' !important;}';/*ok*/
			css += '.textoTema{color:'+SalesUp.Variables.ColorLetra1+'  !important;}';/*ok*/


			/* Fondo 1 */
			css += '.FondoMenu{background:'+SalesUp.Variables.ColorFondoOriginal+';color:'+SalesUp.Variables.ColorLetra1+';}';/*ok*/
			css += '.FondoMenuSolido{background:'+SalesUp.Variables.ColorFondo1+';color:'+SalesUp.Variables.ColorLetra1+';}';/*ok*/
			css += '.FondoMenuImportant{background:'+SalesUp.Variables.ColorFondo1+' !important;color:'+SalesUp.Variables.ColorLetra1+' !important;}';
			css += '.switch-candy a { background:'+SalesUp.Variables.ColorFondo1+'; } .switch-candy span{color:'+SalesUp.Variables.ColorLetra1+';}';/*ok*/
			css += '.DivInfoLabel{color:'+SalesUp.Variables.ColorLetra1+';background:'+SalesUp.Variables.ColorFondo1+';}';
			css += '.DivInfoData{background:rgba(255, 255, 255, 0.6);border-bottom:1px solid '+SalesUp.Variables.ColorFondo1+';}';
			css += '.bordeAyudaImportacion{border-color:' + SalesUp.Variables.ColorFondo1 + ' !important;}';
			css += '.slidesjs-pagination-item{background:'+SalesUp.Variables.ColorFondo1+' !important;}';
			css += '.bordeAyudaImportacion a:link, .bordeAyudaImportacion a:visited{color:'+SalesUp.Variables.ColorLetra1+' !important;}';
			css += '.LeyendaProspectos{background:'+SalesUp.Sistema.hex2rgb(SalesUp.Variables.ColorFondo1 , 70)+' !important; border:1px solid '+SalesUp.Variables.ColorFondo1+'; color : '+SalesUp.Variables.ColorLetra1+';}';
			css += '#NumProspectos{background:'+SalesUp.Variables.ColorFondo1+' !important;color:'+SalesUp.Variables.ColorLetra1+';}';
			css += '.titPr{background:'+SalesUp.Sistema.hex2rgb(SalesUp.Variables.ColorFondo1 , 70)+' !important; border:1px solid '+SalesUp.Variables.ColorFondo1+'; color : '+SalesUp.Variables.ColorLetra1+';}';
			css += '.titTotales{background:'+SalesUp.Variables.ColorFondo1+' !important;color:'+SalesUp.Variables.ColorLetra1+';}';
			css += '.HeadModal{background:'+SalesUp.Variables.ColorFondo1+';color:'+SalesUp.Variables.ColorLetra1+';}';
			css += '.accionesMultiples .fas { color:'+SalesUp.Variables.ColorLetra1+'; }';
			css += '.DivInfoData.TextArea {border:1px solid '+SalesUp.Variables.ColorFondo1+';}';

			/* Fondo 2 */

			css += '.FondoLabel{background:'+SalesUp.Variables.ColorFondo2+';color:'+SalesUp.Variables.ColorLetra2+';}';
			css += '.FondoLabelImportant{background:'+SalesUp.Variables.ColorFondo2+' !important;color:'+SalesUp.Variables.ColorLetra2+' !important;}';
			css += '.FondoLabela80{background:'+SalesUp.Variables.ColorFondo2a80+' !important;color:'+SalesUp.Variables.ColorLetra2+' !important;}';
			css += '.Btn, #File > button{background:'+SalesUp.Variables.ColorFondo2+' !important;color:'+SalesUp.Variables.ColorLetra2+' !important;}';
			css += '.Btn:hover, #File > button:hover{background:'+SalesUp.Variables.cssBackgroundBotones+' !important;}';
			css += '.InfoLabelSocial{color:'+SalesUp.Variables.ColorFondo2+' !important;}';
			css += '.selectize-input{background:'+BackImage+' '+BackRepeat+' '+BackPosition+' '+BackAttachment+' '+Backcolor+' !important;color:'+InputColor+' !important;border:1px solid '+BorderColor+' !important;}';
			css += '#Tabs .ui-widget-header{border-bottom:2px solid '+SalesUp.Variables.ColorFondo2+' !important;}';
			css += '#Tabs .ui-tabs-nav .ui-state-active a{background:'+SalesUp.Variables.ColorFondo2+' !important;color:'+SalesUp.Variables.ColorLetra2+' !important;}';

			$ColoresParaMiTema.remove();
			$('#TempInput, #TempLabel, #TempForm ').remove();

			/*$('body').append('<style class="CssDinamico" type="text/css" id="'+idStyle+'">'+css+'</style>');*/
		}/*if(ExisteCss==0)*/


	}/* /ColoresTema */

	this.AbrirLinkExterno = function(Op){
		var Pagina = '';

		if(Op.Pagina.indexOf('http://')!=-1){
			Pagina = Op.Pagina;
		}else if(Op.Pagina.indexOf('https://')!=-1){
			Pagina = Op.Pagina;
		}else{
			Pagina = 'http://'+Op.Pagina;
		}
		window.open(Pagina,'_blank');
	}

	this.CambiarTamanioPopUp = function (Op){
		if(!SalesUp.Sistema.Dispositivo({Es:'desktop'})){return false;}

		var AltoActual = $("#TB_iframeContent").innerHeight();

		if(Op.Alto){
			Op.Alto = parseInt(Op.Alto);
			(Op.Alto>620) ? Op.Alto = 620 : '';
			if(AltoActual!=Op.Alto){
				$("#TB_iframeContent").animate({ height : Op.Alto + 'px' });
				$("#TB_window").animate({ marginTop : '-' + parseInt((Op.Alto / 2), 10) + 'px'	});
			}

		}

		if(Op.Ancho){
			$("#TB_iframeContent").animate({ width : Op.Ancho + 'px' });
			$("#TB_window").animate({marginLeft: '-' + parseInt((Op.Ancho / 2),10) + 'px', width: Op.Ancho + 'px'});
		}

	}

	this.TamanioPopUp = function(){
		var Tamanio = [0, 0];
		if (typeof window.innerWidth != 'undefined'){
			Tamanio = [ window.innerWidth, window.innerHeight ];
		}else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0){
			Tamanio = [
			    document.documentElement.clientWidth,
			    document.documentElement.clientHeight
			];
		}else{
			Tamanio = [
			    document.getElementsByTagName('body')[0].clientWidth,
			    document.getElementsByTagName('body')[0].clientHeight
			];
		}

		SalesUp.Variables.PopupAncho = Tamanio[0];
		SalesUp.Variables.PopupAlto = Tamanio[1];

		return Tamanio;
	}
	this.TamanioInicial = function(){
		SalesUp.Variables.TamanioInicial = $("#TB_iframeContent").innerHeight();
	}

	this.AjustaAltoPopUp = function (Op) {
		if(!SalesUp.Sistema.Dispositivo({Es:'desktop'})){return false;}
		var Alto = $("#TB_iframeContent").innerHeight();
		var NuevoTamanio = Alto;
		if(Op.Aumenta){ NuevoTamanio = Alto + (26 * Op.Numero); }
		else { NuevoTamanio = Alto - (26 * Op.Numero); }

		if(NuevoTamanio >= 620){ NuevoTamanio = 620; }

		if(NuevoTamanio <= SalesUp.Variables.TamanioInicial) {
			NuevoTamanio = SalesUp.Variables.TamanioInicial;
		}

		$("#TB_iframeContent").animate({ height : NuevoTamanio + 'px' });
		$("#TB_window").animate({ marginTop : '-' + parseInt((NuevoTamanio / 2), 10) + 'px' });
	}

	this.RecorreCheckSeleccionados = function(Op){
        SalesUp.Variables.ListaId = '';
        SalesUp.Variables.hayCanalizados = 0;
        //contador=0;
        $(".laseleccion").each( function() {
            if ($(this).is(':checked')) {
                var Id = $(this).attr('value');
                SalesUp.Variables.ListaId = SalesUp.Variables.ListaId + Id +',';

                var $Padre = $(this).closest('tr');
		        var esCanalizado = $Padre.attr('data-esta-canalizado');

		        if(esCanalizado > 0){
		        	SalesUp.Variables.hayCanalizados = 1;
		        }
                //contador = contador + 1;
            }
        });

        return SalesUp.Variables.ListaId;
    }

    this.RecorreCheckSeleccionadosOportunidades = function(Op){
        SalesUp.Variables.ListaIdOportunidades = '';
        //contador=0;
        $(".laseleccion").each( function() {
            if ($(this).is(':checked')) {
                var IdOportunidades = $(this).attr('id');
                SalesUp.Variables.ListaIdOportunidades = SalesUp.Variables.ListaIdOportunidades + IdOportunidades +',';
                //contador = contador + 1;
            }
        });
        return SalesUp.Variables.ListaIdOportunidades;
    }

    this.CheckTodosRegistros = function(Op){
        var $Elemento = $(Op.Elemento);
        var $Padre = $Elemento.closest('table');
        var IdPadre = '';
        IdPadre = $Padre.attr('id');

        var $LtOpciones = $Padre.find('ul.LtOpcionesMult');
        ($LtOpciones.is(':visible'))? $LtOpciones.slideUp() : '';

        if($Elemento.is(':checked')){
            $('.laseleccion').removeAttr('checked');
            $('table.simple tbody tr').removeClass('seleccionado');
            $('table#'+IdPadre+' tbody tr').addClass('seleccionado');
            $('table#'+IdPadre+' tbody tr td input[type=checkbox]').attr('checked', true);
        }else{
            $('table#'+IdPadre+' tbody tr').removeClass('seleccionado');
            $('table#'+IdPadre+' tbody tr td input[type=checkbox]').attr('checked', false);
        }
    } /* CheckTodosRegistros */

    this.MostrarOpcionesSeleccionMultiple = function(Op){
    	if(Op.Evento){ Op.Evento.preventDefault(); }

    	if(!SalesUp.Sistema.RecorreCheckSeleccionados()){
    		SalesUp.Construye.MuestraAlerta({
    			TipoAlerta:'AlertaModal',
    			Alerta:'<p class="tCen fa-lg"><i class="fa fa-info-circle fa-2x"></i><br><br> <b>Debe selecccionar al menos un registro.</b></p>',
    			Ancho:'400px', Alto:'110px', Id:'AlertaOpcionesMult'
    		});
    		$('#AlertaOpcionesMult .HeadModal').remove();
			return false;
    	}

        var $Elemento = $(Op.Elemento);
        var $Padre = $Elemento.closest('div');
        var AlturaPadre = $Padre.height();
        $('.BoxTablas').css('height','auto');
        if(AlturaPadre<200){$Padre.css('height',200);}
        var $LtOpciones = $Elemento.next();
        setTimeout(function(){ $LtOpciones.slideToggle('slow'); }, 100);

        $LtOpciones.mouseleave(function(){
			SalesUp.Variables.CierraOpcionesMult = true;
			setTimeout(function(){
				(SalesUp.Variables.CierraOpcionesMult) ? $LtOpciones.slideUp():'';
			},500);
		}).mouseenter(function(){
			SalesUp.Variables.CierraOpcionesMult = false;
		});

    } /* /MostrarOpcionesSeleccionMultiple */

    this.ActivaRedesSociales = function(){
    	$('.Facebook').each(function(){
			var $Elemento = $(this);
			var Dato = $Elemento.html();
			Dato = SalesUp.Sistema.StrReplace('https://www.facebook.com/','',Dato);
			Dato = SalesUp.Sistema.StrReplace('http://www.facebook.com/','',Dato);
			Dato = SalesUp.Sistema.StrReplace('/','',Dato);
			Dato = '<a target="_blank" href="https://www.facebook.com/'+Dato+'"><i class="fa-li fa fa-facebook-square"></i> '+Dato+'</a>'
			$Elemento.html(Dato).removeClass('Facebook');
		});

		$('.Twitter').each(function(){
			var $Elemento = $(this);
			var Dato = $Elemento.html();

			var Simple = SalesUp.Sistema.StrReplace('@','',Dato);
			Simple = SalesUp.Sistema.StrReplace('https://twitter.com/','',Simple);
			Simple = SalesUp.Sistema.StrReplace('http://twitter.com/','',Simple);
			Simple = SalesUp.Sistema.StrReplace('/','',Simple);

			Dato = SalesUp.Sistema.StrReplace('https://twitter.com/','@',Dato);
			Dato = SalesUp.Sistema.StrReplace('http://twitter.com/','@',Dato);
			Dato = SalesUp.Sistema.StrReplace('/','@',Dato);

			(Dato.indexOf('@')==-1) ? Dato = '@'+Dato : '';

			Dato = '<a target="_blank" href="https://twitter.com/'+Simple+'"><i class="fa-li fa fa-twitter-square"></i> '+Dato+'</a>'
			$Elemento.html(Dato).removeClass('Twitter');
		});


		$('.Skype').each(function(){
			var $Elemento = $(this);
			var Dato = $Elemento.html();

			$Elemento.attr('tip','Marcar por skype a ['+Dato+'] <i class="fa fa-lg fa-skype"></i>').addClass('Tip1');
			Dato = '<a href="skype:'+Dato+'?call"><i class="fa-li fa fa-skype"></i> '+Dato+'</a>'
			$Elemento.html(Dato).removeClass('Skype');
		});

		$('.Linkedin').each(function(){
			var $Elemento = $(this);
			var Dato = $Elemento.html();

			Dato = SalesUp.Sistema.StrReplace('https://mx.linkedin.com/in/','',Dato);
			Dato = SalesUp.Sistema.StrReplace('http://mx.linkedin.com/in/','',Dato);
			Dato = SalesUp.Sistema.StrReplace('mx.linkedin.com/in/','',Dato);

			Dato = '<a target="_blank" href="https://mx.linkedin.com/in/'+Dato+' "><i class="fa-li fa fa-linkedin-square"></i> '+Dato+'</a>'
			$Elemento.html(Dato).removeClass('Linkedin');
		});

		$('.Googleplus').each(function(){
			var $Elemento = $(this);
			var Dato = $Elemento.html();

			Dato = SalesUp.Sistema.StrReplace('https://plus.google.com/','',Dato);
			Dato = SalesUp.Sistema.StrReplace('/posts','',Dato);
			Dato = SalesUp.Sistema.StrReplace('/about','',Dato);
			Dato = SalesUp.Sistema.StrReplace('/photos','',Dato);
			Dato = SalesUp.Sistema.StrReplace('/videos','',Dato);
			var link = Dato;
			if(SalesUp.Sistema.EsNumero(Dato)){ Dato = 'Google +' }

			Dato = '<a target="_blank" href="https://plus.google.com/'+link+'/posts"><i class="fa-li fa fa-google-plus-square"></i> '+Dato+'</a>'
			$Elemento.html(Dato).removeClass('Googleplus');
		});



    } /* / this.ActivaRedesSociales  */

	this.EnviarCorreos = function(Op){
    	var Ids = SalesUp.Sistema.RecorreCheckSeleccionados();
        var IdsOportunudades = SalesUp.Sistema.RecorreCheckSeleccionadosOportunidades();
    	var ParametrosOportunidades='';
    	if(_.size(IdsOportunudades)>0){
    		var ido = IdsOportunudades.split(',');
    		if(EsNumero(ido[0])){
    			ParametrosOportunidades='&idoportunidad='+IdsOportunudades;
    		}
    	}

    	var str = Ids.split(',');
    	var nR = _.size(str)-1;

    	if(nR>0){
    		if( nR == 1 ){
    			SalesUp.Sistema.AbrePopUp({
					Titulo: 'Enviar correo',
					Pagina: 'popup_compose_mail.dbsp', Parametros:'idprostr='+Ids+ParametrosOportunidades,
					CallBack:'ReloadData',
					Modal:true, ModalAlt : true, Alto:565, Ancho:750
				});
    		}else{
    			SalesUp.Sistema.AbrePopUp({
					Titulo: 'Enviar correo',
					Pagina: 'PopUpCorreoConCopiayOculta.dbsp', Parametros:'idprostr='+Ids+ParametrosOportunidades,
					CallBack:'ReloadData',
					Modal:true, ModalAlt : true, Alto:170, Ancho:500
				});
    		}
    	}else{
    		SalesUp.Construye.MuestraAlerta({TipoAlerta:'Elegant', Alerta:'Debe seleccionar al menos un registro.'});
    	}
	}

	this.CorreoNoconfigurado = function(){
		SalesUp.Sistema.AbrePopUp({
    		Titulo: 'Configurar correo',
    		Pagina: 'popup_config_mail.dbsp',
    		CallBack:'ReloadData',
    		Alto:330, Ancho:560
    	});
	}
	this.AbrePopUp = function(Op){
		var LinkArmado = '', Titulo = '', Pagina = '', Parametros = '', CallBack = '', Iframe = '&TB_iframe=true' , Modal = '&modal=true', ModalAlt = '&modalAlt=true', Alto = '', Ancho = '', CloseReload = '';

		(!_.isUndefined(Op.Titulo)) ? Titulo = Op.Titulo : '';
		(!_.isUndefined(Op.Pagina)) ? Pagina = Op.Pagina : '';
		(!_.isUndefined(Op.Parametros)) ? Parametros = Op.Parametros:'';
		(!_.isUndefined(Op.CallBack)) ? CallBack = '&TB_callback='+Op.CallBack : '';
		(!_.isUndefined(Op.Iframe)) ? Iframe = '&TB_iframe='+Op.Iframe : '';
		(!_.isUndefined(Op.Modal)) ? Modal = '&modal='+Op.Modal : '';
		(!_.isUndefined(Op.ModalAlt)) ? ModalAlt = '&modalAlt='+Op.ModalAlt : '';
		(!_.isUndefined(Op.CloseReload)) ? CloseReload = '&CloseReload='+Op.CloseReload : '';
		(!_.isUndefined(Op.Alto)) ? Alto = '&height='+Op.Alto : '';
		(!_.isUndefined(Op.Ancho)) ? Ancho = '&width='+Op.Ancho : '';

		LinkArmado = Pagina + SalesUp.Sistema.TiempoSolicitud()+'&' + Parametros + CallBack + Iframe + Modal + ModalAlt + CloseReload + Alto + Ancho;

		$('.LtOpcionesMult').hide();
		tb_show(Titulo, LinkArmado);
	}

	this.VerMasResultados = function(Op){
		var $Elemento = $(Op.Elemento);
		SalesUp.Sistema.MuestraEspera($Elemento,1);
		SalesUp.Variables.TemplateRow = '';
		if(Op.Template){
			SalesUp.Variables.TemplateRow = SalesUp.Sistema.CargaDatos({
				Link:Op.Template,
				Parametros: Op.ParametrosTemp,
				Almacen: Op.Almacen
			});
		}else{SalesUp.Variables.TemplateRow = SalesUp.Variables.ComodinTemplateRow;}


		setTimeout(function() {
			SalesUp.Variables.jsonVerMas = SalesUp.Sistema.CargaDatos({
					Link:Op.PaginajsonDatos,
					Parametros: 'start='+Op.Start+'&howmany='+Op.howMany +'&'+ Op.Parametros,
					DataType:'json'
				});

			SalesUp.Construye.ReemplazaTemplate({
				Template: SalesUp.Variables.TemplateRow,
				Destino: '#'+Op.DestinoTabla+' tbody',
				Datos: SalesUp.Variables.jsonVerMas.jsonDatos
			});

			var n = 1;
			$('#'+Op.DestinoTabla+' tbody tr').each(function(){
				var v = $(this).find('td:first').text();
				if(_.isNaN(parseInt(v))){
					$(this).find('td:first').html('<b>'+n+'</b>');
				}

				n = n + 1;
			});

			var Desde = Op.howMany + Op.Start;

			if ( _.size($('#'+Op.DestinoTabla+' tbody tr')) < SalesUp.Variables.jsonVerMas.Registros.TotalResgistros){

				var Temp = "'"+Op.Template+"'";
				var PaTemp = "'"+Op.ParametrosTemp+"'";
				var Almacen = "'"+Op.Almacen+"'";
				var PaginajsonDatos = "'"+Op.PaginajsonDatos+"'";
				var Parametros = "'"+Op.Parametros+"'";
				var DestinoTabla = "'"+Op.DestinoTabla+"'";
				var VerMas = '';

				if(Op.Template){
					VerMas = VerMas + '<div onclick="SalesUp.Sistema.VerMasResultados({ Elemento:this, Template:'+Temp+' , ParametrosTemp:'+PaTemp+' , Almacen:'+Almacen+' , PaginajsonDatos: '+PaginajsonDatos+' , Parametros: '+Parametros+' , DestinoTabla: '+DestinoTabla+', Start:'+Desde+', howMany:10 });" class="w100 tCen Pointer">';
				}else{
					VerMas = VerMas + '<div onclick="SalesUp.Sistema.VerMasResultados({ Elemento:this, PaginajsonDatos: '+PaginajsonDatos+' , Parametros: '+Parametros+' , DestinoTabla: '+DestinoTabla+', Start:'+Desde+', howMany:10 });" class="w100 tCen Pointer">';
					VerMas = VerMas + 'hola';
				}

				//VerMas = VerMas + '<div onclick="SalesUp.Sistema.VerMasResultados({ Elemento:this, Template:'+Temp+' , ParametrosTemp:'+PaTemp+' , Almacen:'+Almacen+' , PaginajsonDatos: '+PaginajsonDatos+' , Parametros: '+Parametros+' , DestinoTabla: '+DestinoTabla+', Start:'+Desde+', howMany:10 });" class="w100 tCen Pointer">';

				VerMas = VerMas + '<span Id="VerMas" class="Btn Btn-flat-Aceptar Btn-tiny"><i class="fa fa-angle-down fa-lg"></i> <b>Ver más</b></span>';
				VerMas = VerMas + '</div>';
				VerMas = VerMas + '';
				$('#'+Op.DestinoTabla).after(VerMas);

			}

			var totalNoCompartidos = SalesUp.Variables.Json.Registros.noVeo;

			if ( _.size($('#'+Op.DestinoTabla+' tbody tr')) == SalesUp.Variables.jsonVerMas.Registros.TotalResgistros && SalesUp.Variables.jsonVerMas.Registros.noVeo>0  && $('#Contactos').is(':visible')){
				noCompartidos = '<div class="SinResultados BoxSizing w100"> <p style="font-size:12px;"> <i class="fa fa-1x fa-info-circle"></i> Existen otros ('+totalNoCompartidos+') contactos asociados a esta empresa que no están compartidos</p> </div>';
				$('#'+Op.DestinoTabla).after(noCompartidos);

			}





			$Elemento.remove();
			SalesUp.Sistema.IniciaPlugins();
			SalesUp.Sistema.OcultaEspera();
		}, 100);
	} /* /SalesUp.Sistema.VerMasResultados */

	this.ActualizarTablas = function(){

		var procesaActualizarTablas = function(Op, err){
			if (err){return;}
			SalesUp.Variables.jsonActualizarTablas = Op;
	    	var Ids = (_.isObject(SalesUp.Variables.jsonActualizarTablas)) ? SalesUp.Variables.jsonActualizarTablas.jsonDatos[0].IdTabla : '';
	    	if(_.size(Ids)>0){
	    		SalesUp.Sistema.Almacenamiento({a:'SysTiempoInicio', v:SalesUp.Variables.jsonActualizarTablas.jsonDatos[0].Tiempo});
	    		Ids = Ids.split(',');
				for (var i = 0; i < Ids.length; i++) {
					Tabla = Ids[i];

					var eliminaTemp = '';
					switch (Tabla){
						case  '3': eliminaTemp = 'jsonLtEtiquetas'; break;
						case  '8': eliminaTemp = 'jsonTitulos'; break;
						case  '10': eliminaTemp = 'jsonOrigen'; break;
						case  '25': eliminaTemp = 'jsonCompanias'; break;
						case  '26': eliminaTemp = 'jsonIndustria'; break;
						case  '27': eliminaTemp = 'jsonGruposEmpresariales'; break;
			        }

			        if(!_.isEmpty(eliminaTemp)){
			        	SalesUp.Sistema.BorrarItemDeAlmacen(eliminaTemp);
			        }

					if(Tabla=='9'){
			        	SalesUp.Sistema.BorrarItemDeAlmacen('jsonFases');
			        	SalesUp.Sistema.BorrarItemDeAlmacen('jsonFasesClientes');
			        }

			        if(Tabla=='23'){
			        	for (x=localStorage.length-1; x>=0; x--) {
							var Item = localStorage.key(x);
							var jsonOpciones = Item.substring(0,12);
							if(jsonOpciones=='jsonOpciones'){
								SalesUp.Sistema.BorrarItemDeAlmacen(Item);
							}
						}
			        }

			        if(Tabla=='22'){
			        	SalesUp.Sistema.BorrarItemDeAlmacen('jsonCamposPersonalizados');
			        	SalesUp.Sistema.BorrarItemDeAlmacen('jsonCamposPersonalizadosProspectos');
			        	SalesUp.Sistema.BorrarItemDeAlmacen('jsonCamposPersonalizadosOportunidades');
			        	SalesUp.Sistema.BorrarItemDeAlmacen('jsonCamposPersonalizadosCliente');
			        	SalesUp.Sistema.BorrarItemDeAlmacen('jsonCamposPersonalizadosVentas');
			        	SalesUp.Sistema.BorrarItemDeAlmacen('jsonCamposObligatorios');
			        	SalesUp.Sistema.BorrarItemDeAlmacen('jsonCamposEmpresa');

			        	SalesUp.Sistema.BorrarItemDeAlmacen('jsonCamposProspectos');
			        	SalesUp.Sistema.BorrarItemDeAlmacen('jsonCamposClientes');

			        	SalesUp.Sistema.BorrarItemDeAlmacen('jsonFP-prospectos');
			        	SalesUp.Sistema.BorrarItemDeAlmacen('jsonFP-oportunidades');
			        	SalesUp.Sistema.BorrarItemDeAlmacen('jsonFP-clientes');
			        	SalesUp.Sistema.BorrarItemDeAlmacen('jsonFP-ventas');

			        	SalesUp.Sistema.BorrarItemDeAlmacen('ProspectosTheadColumas');
						SalesUp.Sistema.BorrarItemDeAlmacen('ProspectosTbodyColumas');
						SalesUp.Sistema.BorrarItemDeAlmacen('ClientesTbodyColumas');
						SalesUp.Sistema.BorrarItemDeAlmacen('ClientesTbodyColumas');
						SalesUp.Sistema.BorrarItemDeAlmacen('VentasTheadColumas');
						SalesUp.Sistema.BorrarItemDeAlmacen('VentasTbodyColumas');
						SalesUp.Sistema.BorrarItemDeAlmacen('OportunidadesTheadColumas');
						SalesUp.Sistema.BorrarItemDeAlmacen('OportunidadesTbodyColumas');
						SalesUp.Sistema.BorrarItemDeAlmacen('ProspectosEmpresasTheadColumas');
						SalesUp.Sistema.BorrarItemDeAlmacen('ProspectosEmpresasTbodyColumas');
			        }
					if(Tabla=='24'){
						SalesUp.Sistema.BorrarItemDeAlmacen('jsonConfiguracionCamposSistema');
						SalesUp.Sistema.BorrarItemDeAlmacen('jsonCamposObligatorios');
						SalesUp.Sistema.BorrarItemDeAlmacen('jsonCamposEmpresa');
						SalesUp.Sistema.BorrarItemDeAlmacen('jsonCamposProspectos');
			        	SalesUp.Sistema.BorrarItemDeAlmacen('jsonCamposClientes');
					}
					if(Tabla == '26'){
						SalesUp.Sistema.BorrarItemDeAlmacen('jsonIndustriav2');
					}
					if(Tabla == '27'){
						SalesUp.Sistema.BorrarItemDeAlmacen('jsonGrupoEmpresarialv2');
					}
					if(Tabla=='34'){ /*Catalogos*/
						SalesUp.Sistema.BorrarItemDeAlmacen('jsonCatalogosActivos'); $('.CatalogosPersonalizados').remove();
					}

					if(Tabla=='35'){ /*OpcionCatalogos*/
						SalesUp.Sistema.BorrarItemDeAlmacen('jsonCatalogosOpciones');
					}

					if(Tabla=='39'){ /*Elimina tabs*/
						SalesUp.Sistema.BorrarItemDeAlmacen('jsonTabsProspectos');
						SalesUp.Sistema.BorrarItemDeAlmacen('jsonTabsClientes');
					}

				} /* for */
	    	} /* /if(_.size(Ids)>0) */
		}/*procesaActualizarTablas*/



		SalesUp.Variables.SysTiempoInicio = SalesUp.Sistema.Almacenamiento({a:'SysTiempoInicio'});
    	SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonActualizaTablas.dbsp', parametros:{Tiempo:SalesUp.Variables.SysTiempoInicio}, callback:procesaActualizarTablas});





	}/* /this.ActualizarTablas */

	this.SubmitInLine = function(Op){
      Op.e.preventDefault();
      var $Elemento = $(Op.Elemento);
      var $Padre = $Elemento.closest('form');
      $Padre.submit();

    }


	this.EsNumero = function(n){ return /^\d+$/.test(n); }
	this.SoloNumero = function(n){ return n.replace(/[^0-9]/g,''); }

	this.StrReplace = function (search, replace, subject, count) {
	  /* From: http://phpjs.org/functions */

	  var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0,
	    f = [].concat(search), r = [].concat(replace), s = subject,
	    ra = Object.prototype.toString.call(r) === '[object Array]',
	    sa = Object.prototype.toString.call(s) === '[object Array]';

	  s = [].concat(s);
	  if (count) {
	    this.window[count] = 0;
	  }

	  for (i = 0, sl = s.length; i < sl; i++) {
	    if (s[i] === '') {
	      continue;
	    }
	    for (j = 0, fl = f.length; j < fl; j++) {
	      temp = s[i] + '';
	      repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
	      s[i] = (temp).split(f[j]).join(repl);
	      if (count && s[i] !== temp) {
	        this.window[count] += (temp.length - s[i].length) / f[j].length;
	      }
	    }
	  }
	  return sa ? s : s[0];
	}/* /StrReplace */

	this.clone = function(obj) {
	   return clone(obj);
	}/*clone*/

	var clone = function(obj) {
	   var copy;

	   // Handle the 3 simple types, and null or undefined
	   if (null == obj || "object" != typeof obj) return obj;

	   // Handle Date
	   if (obj instanceof Date) {
	       copy = new Date();
	       copy.setTime(obj.getTime());
	       return copy;
	   }

	   // Handle Array
	   if (obj instanceof Array) {
	       copy = [];
	       for (var i = 0, len = obj.length; i < len; i++) {
	           copy[i] = clone(obj[i]);
	       }
	       return copy;
	   }

	   // Handle Object
	   if (obj instanceof Object) {
	       copy = {};
	       for (var attr in obj) {
	           if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
	       }
	       return copy;
	   }

	   throw new Error("Unable to copy obj! Its type isn't supported.");
	}/*clone*/

	this.NumKeyCode = function(e){
		var Key = (e.keyCode ? e.keyCode : e.which);
		return Key;
	};

	this.ShortCut = function(){
		jwerty.key('p', function(){ SalesUp.Sistema.ActivaShortCut({sc:'p'}); });
		jwerty.key('c', function(){ SalesUp.Sistema.ActivaShortCut({sc:'c'}); });
		jwerty.key('m', function(){ SalesUp.Sistema.ActivaShortCut({sc:'m'}); });
		jwerty.key('r', function(){ SalesUp.Sistema.ActivaShortCut({sc:'r'}); });
		jwerty.key('t', function(){ SalesUp.Sistema.ActivaShortCut({sc:'t'}); });
		jwerty.key('i', function(){ SalesUp.Sistema.ActivaShortCut({sc:'i'}); });
		/*jwerty.key('e', function(){ SalesUp.Sistema.ActivaShortCut({sc:'e'}); });*/
		jwerty.key('shift+b', function(){ SalesUp.Sistema.ActivaShortCut({sc:'b'}); });
		jwerty.key('shift+p', function(){ SalesUp.Sistema.ActivaShortCut({sc:'sp'}); });
		jwerty.key('shift+o', function(){ SalesUp.Sistema.ActivaShortCut({sc:'so'}); });
		jwerty.key('shift+c', function(){ SalesUp.Sistema.ActivaShortCut({sc:'sc'}); });
		jwerty.key('shift+v', function(){ SalesUp.Sistema.ActivaShortCut({sc:'sv'}); });
		jwerty.key('shift+a', function(){ SalesUp.Sistema.ActivaShortCut({sc:'sa'}); });
		jwerty.key('shift+i', function(){ SalesUp.Sistema.ActivaShortCut({sc:'si'}); });

		/*jwerty.key('1', function(){ SalesUp.Sistema.ActivaShortCut({sc:'1'}); });*/

		jwerty.key('up,up,down,down,left,right,left,right,enter', function(){
			SalesUp.Construye.MuestraAlerta({
				TipoAlerta:'AlertaModal', Ancho:'450px', Titulo:'SalesUp!',
				Alerta: '<h1 class="tCen">Todos Somos <br/> SalesUp! <br/><br/><i class="fa fa-5x fa-thumbs-o-up"></i></h1>'
			});
		});


	}/*ShortCut*/

	this.ValidaShortCut = function(){
		var n = 0, Activo = false;
		n = $('#TB_window').length;
		$('div').each(function(){ if($(this).is(':focus')){n = n + 1;} });
		$('input').each(function(){ if($(this).is(':focus')){n = n + 1;} });
		$('select').each(function(){ if($(this).is(':focus')){n = n + 1;} });
		$('textarea').each(function(){ if($(this).is(':focus')){n = n + 1;} });
		(n==0) ? Activo = true:'';

		return Activo;
	} /* /ValidaShortCut */


	this.ActivaShortCut = function(Op){
	  if(SalesUp.Sistema.ValidaShortCut()){
	    if(Op.sc=='p'){ SalesUp.Ventana.NuevoProspecto(); }
	    if(Op.sc=='c'){ SalesUp.Ventana.NuevoCliente(); }
	    if(Op.sc=='m'){ SalesUp.Ventana.NuevoMensaje(); }
	    if(Op.sc=='r'){ SalesUp.Ventana.NuevoRecordatorio(); }
	    if(Op.sc=='t'){ SalesUp.Ventana.NuevaTarea(); }
	    if(Op.sc=='i'){ SalesUp.Ventana.NuevaCita(); }
	    if(Op.sc=='e'){ SalesUp.empresas.nuevaEmpresa(); }
	    if(Op.sc=='sp'){ document.location.href="/privado/prospectos.dbsp"; }
	    if(Op.sc=='so'){ document.location.href="/privado/oportunidades.dbsp"; }
	    if(Op.sc=='sc'){ document.location.href="/privado/clientes.dbsp"; }
	    if(Op.sc=='sv'){ document.location.href="/privado/ventas.dbsp"; }
	    if(Op.sc=='sa'){ document.location.href="/privado/calendario.dbsp"; }
	    if(Op.sc=='si'){ document.location.href="/privado/inicio.dbsp"; }
	    if(Op.sc=='b'){	setTimeout(function(){ SalesUp.Buscar.ActivaBuscar(); }, 100); }

	    /*if(Op.sc=='1'){ SalesUp.Ventana.NuevaTareaModal(); }*/
	  }
	  return true;
	} /* /ActivaShortCut */

	this.FechaFormato = function(){
	  var SysfFecha = SalesUp.Sistema.Almacenamiento({a:'SysFormatoFecha'});

	  $('.FormatoFecha').each(function(){
	    var $Elemento = $(this);
	    var strFecha = $Elemento.html();
	    var NuevaFecha = SalesUp.Sistema.ObtieneFecha(strFecha);
	    var Formateada = SalesUp.Fechas.FormatoFecha(NuevaFecha, 103, SysfFecha);
	    $Elemento.html(Formateada).removeClass('FormatoFecha');
	  }); /* /each */

	  $('.FormatoFechaHora').each(function(){
	    var $Elemento = $(this);
	    var strFecha = $Elemento.html();
	    var NuevaFecha = SalesUp.Sistema.ObtieneFecha(strFecha);
	    var Nuevahora = SalesUp.Sistema.ObtieneHora(strFecha);
	    var Formateada = SalesUp.Fechas.FormatoFecha(NuevaFecha, 103, SysfFecha) + ' '+ Nuevahora;
	    $Elemento.html(Formateada).removeClass('FormatoFechaHora');
	  }); /* /each */

	} /* /FormatoFecha  */


	this.ObtieneFecha = function(str){
	  var Fecha = str.split(' ')[0];
	  var splitFecha = Fecha.split('-');
	  var NuevaFecha = splitFecha[2]+'/'+splitFecha[1]+'/'+splitFecha[0];
	  return NuevaFecha;
	}

	this.ObtieneHora = function(str){
	  if(!str){return '';}
	  var Hora = str.split(' ')[1];
	  var splitHora = Hora.split(':');
	  var Nuevahora = splitHora[0]+':'+splitHora[1];
	  return Nuevahora;
	}

	this.ValidaFecha = function(v){
		return /^\d{4}-\d{2}-\d{2}$/.test(v);
	}

	this.UltimaVisita = function(){

		var UltimaVisita = SalesUp.Sistema.Almacenamiento({a:'SysUltimaVisita'});
		var TituloUltimaVisita = SalesUp.Sistema.Almacenamiento({a:'SysTituloUltimaVisita'});
		var HorasUltimaVisita = SalesUp.Sistema.Almacenamiento({a:'SysHorasUltimaVisita'});

		(!UltimaVisita) ? UltimaVisita = '' : '';
		(!TituloUltimaVisita) ? TituloUltimaVisita = '' : '';
		(!HorasUltimaVisita) ? HorasUltimaVisita = '' : '';

		/*Genera menu de lo reciente*/

		var NuevoMenu = UltimaVisita.split('|');
		var NuevoMenuTitulo = TituloUltimaVisita.split('|');
		var NuevoMenuHoras = HorasUltimaVisita.split('|');
		var MenuOpcion = '';
		for (x=NuevoMenu.length-1; x>=0; x--){
			if(NuevoMenu[x]){
				NuevoMenuTitulo[x] = SalesUp.Sistema.StrReplace('title="Tiempo"','title="'+NuevoMenuHoras[x]+'"',NuevoMenuTitulo[x]);
				MenuOpcion += '<li>';
				MenuOpcion += '<a href="'+NuevoMenu[x]+'">'+NuevoMenuTitulo[x];
				MenuOpcion += '</a></li>';
			}
		}

		(MenuOpcion) ? $('#MenuReciente').html(MenuOpcion):'';

		if ($.timeago){
			$("#MenuReciente .TimeAgo").timeago();
			$("#MenuReciente .TimeAgo").removeAttr('title');
		}

		var $EstoyEn = $('#EstoyEn');
		if(!_.size($EstoyEn)){return false;}



		/*Agrega nuevo item a reciente*/

			var Path = document.location.pathname;
			var Search = document.location.search;
			var Pagina = Path + ((Search) ? Search : '');
			/*var Titulo = $('#contenedor h1').first().text();*/
			var Donde = $EstoyEn.attr('data-donde');
			var Titulo = $('#EstoyEn'+Donde).html();
			/*Titulo = SalesUp.Sistema.Comprimir.Minifica({Dato:Titulo});*/
			var Hora = moment().format('gggg-MM-DD HH:mm:ss');
			var splitUltimaVisita = UltimaVisita.split('|');
			var Existe = 0;
			var Total = splitUltimaVisita.length - 1;

			$.each(splitUltimaVisita,function(i,v){ (Pagina==v) ? Existe++:''; });

			if(!Titulo){
				var NuevoTitulo = SalesUp.Sistema.StrReplace('/privado/','',Pagina);
				NuevoTitulo = SalesUp.Sistema.StrReplace('.dbsp','',NuevoTitulo);
				NuevoTitulo = SalesUp.Sistema.StrReplace('_',' ',NuevoTitulo);
				NuevoTitulo = SalesUp.Sistema.StrReplace('-',' ',NuevoTitulo);
				var Ini = NuevoTitulo.substr(0,1);
				Ini = Ini.toUpperCase();
				Titulo = Ini + NuevoTitulo.substr(1);
			}

			if(Existe==0){
				if(Total>=10){
					var n = UltimaVisita.indexOf('|') + 1;
					var max = UltimaVisita.length;
					UltimaVisita = UltimaVisita.substr(n,max);

					n = TituloUltimaVisita.indexOf('|') + 1;
					max = TituloUltimaVisita.length;
					TituloUltimaVisita = TituloUltimaVisita.substr(n,max);
				}

				UltimaVisita += Pagina + '|';
				TituloUltimaVisita += Titulo + '|';
				HorasUltimaVisita += Hora.toString() + '|';
				SalesUp.Sistema.Almacenamiento({a:'SysUltimaVisita', v:UltimaVisita});
				SalesUp.Sistema.Almacenamiento({a:'SysTituloUltimaVisita', v:TituloUltimaVisita});
				SalesUp.Sistema.Almacenamiento({a:'SysHorasUltimaVisita', v:HorasUltimaVisita});

			}

	}/*this.UltimaVisita*/

	this.eliminarUltimaVisita = function(Op){

		var eliminarId = Op.eliminarId;

		var UltimaVisita = SalesUp.Sistema.Almacenamiento({a:'SysUltimaVisita'});
		var TituloUltimaVisita = SalesUp.Sistema.Almacenamiento({a:'SysTituloUltimaVisita'});
		var HorasUltimaVisita = SalesUp.Sistema.Almacenamiento({a:'SysHorasUltimaVisita'});

		(!UltimaVisita) ? UltimaVisita = '' : '';
		(!TituloUltimaVisita) ? TituloUltimaVisita = '' : '';
		(!HorasUltimaVisita) ? HorasUltimaVisita = '' : '';

		/*Genera menu de lo reciente*/

		var NuevoMenu = UltimaVisita.split('|');
		var NuevoMenuTitulo = TituloUltimaVisita.split('|');
		var NuevoMenuHoras = HorasUltimaVisita.split('|');
		var MenuOpcion = '';
		var eliminarPosicion;
		for (var x=NuevoMenu.length-1; x>=0; x--){
		  if(NuevoMenu[x]){
		    if(NuevoMenu[x].indexOf(eliminarId)!=-1){
		      eliminarPosicion = x;
		    }
		  }
		}

		if(eliminarPosicion){
		  NuevoMenuTitulo.splice(eliminarPosicion,1);
		  NuevoMenuHoras.splice(eliminarPosicion,1);
		  NuevoMenu.splice(eliminarPosicion,1);
		}

		var strNuevoMenu='', strNuevoMenuTitulo='', strNuevoMenuHoras='';
		for (var y=0; y<=NuevoMenu.length-1; y++){
		  if(NuevoMenu[y]){
		    strNuevoMenu += NuevoMenu[y]+'|';
		    strNuevoMenuTitulo += NuevoMenuTitulo[y]+'|';
		    strNuevoMenuHoras += NuevoMenuHoras[y]+'|';
		  }
		}

		SalesUp.Sistema.Almacenamiento({a:'SysUltimaVisita', v:strNuevoMenu});
		SalesUp.Sistema.Almacenamiento({a:'SysTituloUltimaVisita', v:strNuevoMenuTitulo});
		SalesUp.Sistema.Almacenamiento({a:'SysHorasUltimaVisita', v:strNuevoMenuHoras});
	}/*EliminarUltimavisita*/

	this.ControlaMenus = function(){ return 'ControlaMenus';

		var $nMenu, $MenuNuevo, $miUsuario, $MenuUsuario, $linkAyuda,
			$AyudaMenus, $BuscarMenu, $MuestraMenuReciente, $MenuReciente, $NotificacionesNoCistas, $MuestraNotificacionesRecientes;

		$nMenu = $('#nMenu');
		$MenuNuevo = $('#MenuNuevo');

		$miUsuario = $('#miUsuario');
		$MenuUsuario = $('#MenuUsuario');

		$linkAyuda = $('#linkAyuda');
		$AyudaMenus = $('#ayuda_menus');

		$MuestraMenuReciente = $('#MuestraMenuReciente');
		$MenuReciente = $('#MenuReciente');

		$BuscarMenu = $('fieldset#buscar_menu');

		$MuestraNotificacionesRecientes = $('#MuestraNotificacionesRecientes');
		$NotificacionesNoCistas = $('#NotificacionesNoVistas');

		function CierraLoAbierto(Op){ return;
			(!Op) ? Op = {}:'';
			var $Actual = Op.Elemento;

			(($BuscarMenu.is(':visible'))&&($BuscarMenu!=$Actual)) ? $BuscarMenu.slideUp():'';
			(($MenuNuevo.is(':visible'))&&($MenuNuevo!=$Actual)) ? $MenuNuevo.slideUp():'';
			(($MenuUsuario.is(':visible'))&&($MenuUsuario!=$Actual)) ? $MenuUsuario.slideUp():'';
			(($AyudaMenus.is(':visible'))&&($AyudaMenus!=$Actual)) ? $AyudaMenus.slideUp():'';
			(($MenuReciente.is(':visible'))&&($MenuReciente!=$Actual)) ? $MenuReciente.slideUp():'';
			(($NotificacionesNoCistas.is(':visible'))&&($NotificacionesNoCistas!=$Actual)) ? $NotificacionesNoCistas.slideUp():'';
		}

		function MostrarOcultar(m,sm){ return;
			var $Menu = m;
			var $SubMenu = sm;
			SalesUp.Variables.CierraMenu = true;

			$Menu.mouseenter(function(){
				CierraLoAbierto({Elemento:$SubMenu});
				SalesUp.Variables.CierraMenu = true;
				$SubMenu.slideDown();
			}).click(function(){
				if ($SubMenu.is(':visible')){ $SubMenu.slideUp(); }
			});

			$SubMenu.mouseleave(function(){
				SalesUp.Variables.CierraMenu = true;
				setTimeout(function(){
					(SalesUp.Variables.CierraMenu) ? $SubMenu.slideUp():'';
				}, 500);
			}).mouseenter(function(){
				SalesUp.Variables.CierraMenu = false;
			});

			setTimeout(function(){
				(SalesUp.Variables.CierraMenu) ? $SubMenu.slideUp():'';
			}, 4000);
		}

		MostrarOcultar($nMenu,$MenuNuevo);
		MostrarOcultar($miUsuario,$MenuUsuario);
		MostrarOcultar($linkAyuda,$AyudaMenus);
		MostrarOcultar($MuestraMenuReciente,$MenuReciente);
		MostrarOcultar($MuestraNotificacionesRecientes,$NotificacionesNoCistas);

	}/*this.ControlaMenus*/

	this.ActivarMenus = function(){ return 'ActivarMenus';
		$('#menu-superior').removeAttr('onmouseover');
		if(!SalesUp.Sistema.hasEventListener($('#nMenu'), 'mouseover')){
			SalesUp.Sistema.ColoresTema();
			SalesUp.Sistema.ControlaMenus();
		}
	}

	this.MostrarMenuPrincipal = function(Op){
		if(Op.Evento){ Op.Evento.preventDefault(); }
		var $MenuPrincipal = $('#menu-principal');
		var Visible = $MenuPrincipal.is(':visible');

		//$('#menu-superior ul').slideUp();
		(Visible) ? $MenuPrincipal.slideUp(): $MenuPrincipal.slideDown();

	}

	this.hasEventListener = function(element, eventName, namespace) {
        var returnValue = false;
        var events = $(element).data("events");
        if (events) {
            $.each(events, function (index, value) {
                if (index == eventName) {
                    if (namespace) {
                        $.each(value, function (index, value) {
                            if (value.namespace == namespace) {
                                returnValue = true;
                                return false;
                            }
                        });
                    }
                    else {
                        returnValue = true;
                        return false;
                    }
                }
            });
        }
        return returnValue;
    }/*this.hasEventListener*/

    this.DetalleTipoSeguimiento = function(Op){
    	if(!Op){ console.warn('Se necesitan parametros'); return false; }
    	if(!_.isObject(Op)){ console.warn('No es un objeto'); return false; }

    	var tSeguimiento, $Elemento, IdRelacionado, Tk;
		$Elemento = $(Op.Elemento);

		tSeguimiento = $Elemento.attr('data-tipoSeguimiento');
		IdRelacionado = $Elemento.attr('data-id');
		Tk = $Elemento.attr('data-tk');

		if(tSeguimiento=='6'){
			var Datos = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonFechaCita.dbsp', Parametros:{IdCi:IdRelacionado}, DataType:'json'});
			Datos = Datos.jsonDatos
			if(_.size(Datos[0])){
				document.location.href = '/privado/Calendario.dbsp?fc='+Datos[0].FechaInicia;
			}
		}

		(tSeguimiento=='7') ? document.location.href = '/privado/VerTarea.dbsp?tk='+Tk:'';

    }/*DetalleTipoSeguimiento*/

    this.MenuNuevo = function(Op){
    	if(Op.Evento){ Op.Evento.preventDefault(); }
		if(!device.tablet()){
			SalesUp.Ventana.NuevoProspecto();
		}
    }

    this.Dispositivo = function(Op){
    	if(!Op){return false;}
    	var Es;
    	(Op.Es==='tablet') ? Es = device.tablet() : '';
    	(Op.Es==='ios') ? Es = device.ios() : '';
    	(Op.Es==='android') ? Es = device.android() : '';
    	(Op.Es==='desktop') ? Es = device.desktop() : '';

    	return Es;
    }

    this.ContrasteColorYIQ = function(hexcolor){
    	hexcolor = SalesUp.Sistema.StrReplace('#','',hexcolor);
		var r = parseInt(hexcolor.substr(0,2),16);
		var g = parseInt(hexcolor.substr(2,2),16);
		var b = parseInt(hexcolor.substr(4,2),16);
		var yiq = ((r*299)+(g*587)+(b*114))/1000;
		return (yiq >= 128) ? '#000000' : '#FFFFFF';
    }

    this.OpenInNewTab = function(url){
		var win = window.open(url, '_blank');
		win.focus();
	}

	this.AdaptaPopUp = function(){

		if(!SalesUp.Sistema.Dispositivo({Es:'tablet'})){return false;}
		var $window = $(window);
		var $TB_window = $('#TB_window');
		var $TB_iframeContent = $('#TB_iframeContent');
		var h = $window.height() - 43;
		var w = $window.width();

		$TB_window.removeAttr('style');
		$TB_window.attr('style', 'display: block; width:'+w+'px; top: 0px; left: 0px;');
		$TB_iframeContent.css('height',h+'px').css('width',w+'px').css('overflow-y','scroll');
	}

	this.CamposPersonzaliables = function(Op){
		SalesUp.Sistema.CamposPersonalizables(Op);
	}

	this.CamposPersonalizables = function(Op){
		if(!Op){return false;}
		SalesUp.Sistema.ActualizarTablas();

		SalesUp.Variables.TemplateOpcionPersonalizado = '<option value="{{IdOpcion}}">{{Opcion}}</option>';

		var Ventana='', Almacen='', Destino='', TabPersonalizados='', vieneDe = 0, Obligatorios=false, Archivo = 'jsonCamposPersonalizados.dbsp';
		(Op.Ventana) ? Ventana = Op.Ventana : '';
		(Op.Ventana) ? vieneDe = Op.Ventana : '';
		(Op.Destino) ? Destino = Op.Destino : '';
		(Op.Tab) ? TabPersonalizados = Op.Tab : '';
		(Op.Obligatorios) ? Obligatorios = Op.Obligatorios : '';
		(Obligatorios) ? Archivo = 'jsonCamposPersonalizadosObligatorios.dbsp':'';
		$TabPersonalizados = $(TabPersonalizados);
		$TabPersonalizados.show();
		$Destino = $(Destino);
		/* P-(1), O-(2), C-(3), V-(4) */
		(Ventana===1) ? Almacen = 'jsonCamposPersonalizadosProspectos' : '';
		(Ventana===2) ? Almacen = 'jsonCamposPersonalizadosOportunidades' : '';
		(Ventana===3) ? Almacen = 'jsonCamposPersonalizadosCliente' : '';
		(Ventana===4) ? Almacen = 'jsonCamposPersonalizadosVentas' : '';
		(Ventana) ? Ventana = 'ven='+Ventana : '';
		(Obligatorios) ? Almacen = undefined:'';

		SalesUp.Variables.jsonRespuesta = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/'+Archivo, Parametros:Ventana, DataType:'json', Almacen:Almacen });
		SalesUp.Variables.HtmlFormulario = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateFormularios.dbsp', Almacen:'HtmlFormulario' });

		if(SalesUp.Variables.jsonRespuesta.Registros.TotalRegistros>0){
			SalesUp.Construye.ReemplazaTemplate({
			  Template: SalesUp.Variables.HtmlFormulario, Destino: Destino,
			  Datos: SalesUp.Variables.jsonRespuesta.jsonDatos
			});

			var Par = 0;
			$(Destino+' .BoxInfo').each(function(){
			  Par++; $(this).addClass('BoxInfoSmall');
			  if((Par%2)!=0){ $(this).addClass('Mri'); }
			});
			var arrCamposPersonalizados = $('select[idcampoper]');

			for (var i = 0; i <= arrCamposPersonalizados.length - 1; i++){
				var $Elemento = $(arrCamposPersonalizados[i]);
				SalesUp.Variables.IdCampo = $Elemento.attr('idcampoper');
				SalesUp.Variables.IdPersonalizable = $Elemento.attr('id');
				SalesUp.Variables.ObligatorioOpcion = $Elemento.hasClass('InfoObligatorio');

				SalesUp.Variables.jsonOpciones = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonOpcionesPersonalizados.dbsp', Parametros:{ IdCampo:SalesUp.Variables.IdCampo }, DataType:'json', Almacen:'jsonOpciones'+SalesUp.Variables.IdCampo });
				var temp = '{{#each jsonDatos}}'+SalesUp.Variables.TemplateOpcionPersonalizado+'{{/each}}';
				var html = SalesUp.Construye.ReemplazaDatos({Template:temp, Datos:SalesUp.Variables.jsonOpciones});
				if(SalesUp.Variables.ObligatorioOpcion){$Elemento.append('<option value="">(... Seleccione una opción ...)</option>');}
				$Elemento.append(html);
			};

			$('option').each(function(){ if(!$(this).html()){$(this).remove();} });

			$('.InfoUnico').each(function(){
			  var OnBlur = $(this).attr('onblur');
			  (!OnBlur) ? $(this).attr('onblur','SalesUp.Valida.EsUnico({ Elemento:this, Valor:value, Tipo:'+vieneDe+' });') : '';
			});

			var $inputNumero = $('input.numero');
			for (var i = 0; i <= $inputNumero.length - 1; i++){
				$($inputNumero[i]).attr('onkeypress','return SalesUp.Valida.ValidaNumeros({e:event});');
			}

			var $inputDecimal = $('input.decimal');
			for (var i = 0; i <= $inputDecimal.length - 1; i++){
				$($inputDecimal[i]).attr('onkeypress','return SalesUp.Valida.ValidaDecimales({e:event});');
			}

			$('.OcultarEste').not('.NoOcultar').find('.InfoObligatorio').removeClass('InfoObligatorio');

			$Destino.append('<div class="clear"></div>');
		}else{
			$TabPersonalizados.hide();
		}
	}/*this.CamposPersonzaliables*/

	this.DatosOportunidadesCp = function(Op){
		var DatoParametros = '';

		(Op.Ido) ? DatoParametros += 'ido='+Op.Ido+'&' : '';
		(Op.Idv) ? DatoParametros += 'idv='+Op.Idv+'&' : '';
		(Op.Tko) ? DatoParametros += 'tko='+Op.Tko+'&' : '';

		var jsonRespuesta = SalesUp.Sistema.CargaDatos({
	        Link:'/privado/Modelo/jsonDatosOportunidadesCp.dbsp',
	        Parametros: DatoParametros,
	        DataType:'json'
    	});

		var Campos = $('input[name*="Campo"], select[name*="Campo"], textarea[name*="Campo"]');
		Campos = $('.TbOportunidades');

		var json = jsonRespuesta.jsonDatos[0];

		for(i=0; i<=Campos.length; i++ ){
			var $Actual = $(Campos[i]);
			var Campo = $Actual.attr('name');
			var Dato = eval('json.'+Campo);
			$Actual.val(Dato);
		}
	}/*DatosOportunidadesCp*/

	this.DatosProspectosCp = function(Op){
		var DatoParametros = '';

		(Op.Idp) ? DatoParametros += 'idp='+Op.Idp+'&' : '';
		(Op.Tkp) ? DatoParametros += 'tkp='+Op.Tkp+'&' : '';

		var jsonRespuesta = SalesUp.Sistema.CargaDatos({
	        Link:'/privado/Modelo/jsonDatosProspecto.dbsp',
	        Parametros: DatoParametros,
	        DataType:'json'
    	});

		var Campos = $('input[name*="Campo"][name$="P"], select[name*="Campo"][name$="P"], textarea[name*="Campo"][name$="P"]');
		Campos = $('.TbProspectos');
		var json = jsonRespuesta.jsonDatos[0];

		for(i=0; i<=Campos.length; i++ ){
			var $Actual = $(Campos[i]);
			var Campo = $Actual.attr('name');
			if(!Campo){return false;}
			var n = Campo.length-1;
			Campo = Campo.substring(0,n);
			var Dato = eval('json.'+Campo);
			$Actual.val(Dato);
		}
	}/*DatosOportunidadesCp*/

	this.AcomodaCpVisualizar = function(Op){
		(!Op) ? Op={} : '';
		var Visualizar = '';

		(Op.visualizar) ? Visualizar = '[data-visualizar="'+Op.visualizar+'"]' : '' ;

		var $EsPersonalizable = $('.EsPersonalizable'+Visualizar);
		var Hay = $EsPersonalizable.length;
		(Hay===0) ? $('.SepPersonalizable').remove() : '';
		if(Hay>=2){
			for(var i=0; i<=Hay;i++){
				if(i%2){
					var $Row = $($EsPersonalizable[i]);
					var $Prev = $Row.prev();
					var Html = $Row.html();
					$Prev.append(Html);
					$Row.remove();
					$Prev.find('td').removeAttr('colspan');
				}
			}
		}
	}/*AcomodaCpVisualizar*/

	this.LinksExternos = function(Op){

 	  if($('#LiCorp')){
		var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonLinksExternos.dbsp', Almacen:'jsonLinksExternos', DataType:'json' }).jsonDatos;
		if (!json) {
			return false;
		};
		if(!_.size(json[0])){return false; }

		for(var i = 0; i <= json.length-1; i++){
			var tk = json[i].TK;
			var nombre = json[i].NOMBRE;
			$el = $('#LiCorp');
 	       $el.append('<li><a href="LinkExterno.dbsp?tk='+tk+'">'+nombre+'</a></li>');
		}
      }
	}

	this.CatalogosActivos = function(Op){
		(!Op) ? Op = {} : '';
		SalesUp.Sistema.ActualizarTablas();

		var EstoyEn = Op.EstoyEn;
		if(!EstoyEn){
			EstoyEn = SalesUp.Sistema.StrReplace('/privado/','',location.pathname);
			EstoyEn = SalesUp.Sistema.StrReplace('.dbsp','',EstoyEn);
			var n = EstoyEn.length;
			var Letra = EstoyEn.substr(0,1).toUpperCase();
			var Resto = EstoyEn.substr(1,n).toLowerCase();
			EstoyEn = Letra+Resto;
		}


		var HtmlAgrupacion = '';
		HtmlAgrupacion += '<span id="BoxMasListas" class="BoxAgrupaciones">';
		HtmlAgrupacion += '	<span class="dropdown-toggle fc-button fc-state-default fc-corner-right fc-corner-left" id="MasVistas" data-toggle="dropdown"> ';
		HtmlAgrupacion += '		<i class="fa fa-lg fa-ellipsis-v"></i> <i class="fa fa-lg fa-ellipsis-v"></i> <i class="fa fa-lg fa-ellipsis-v"></i>';
		HtmlAgrupacion += '	</span>';
		HtmlAgrupacion += '	<ul id="UlMenuAgrupacion" class="dropdown-menu fondoTema">';
		HtmlAgrupacion += '		<li><a data-vista="0" class="textoTema Activo" href="#" onclick="SalesUp.Sistema.ActivaVerPor({ver:0, e:this, EstoyEn:'+"'"+EstoyEn+"'"+' });">Vista de contactos <i class="fa fa-check Verde"></i></a></li>';
		HtmlAgrupacion += '		<li><a data-vista="1" class="textoTema" href="#" onclick="SalesUp.Sistema.ActivaVerPor({ver:1, e:this, EstoyEn:'+"'"+EstoyEn+"'"+' });">Vista de empresas <i class="fa fa-check Verde"></i></a></li>';
		HtmlAgrupacion += '	</ul>';
		HtmlAgrupacion += '</span>';

		var $BoxSwitch = $('#BoxSwitch');
		var $BoxMasListas = $('#BoxMasListas.BoxAgrupaciones');
		var $BoxDatosCatalogos = $('#BoxDatosCatalogos');

		if(!_.size($BoxMasListas)){ $BoxSwitch.after(HtmlAgrupacion); $BoxMasListas.show(); }

		var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCatalogosActivos.dbsp', Almacen:'jsonCatalogosActivos', DataType:'json' }).jsonDatos;

		if(!_.size(json[0])){return false; }

		for(var i = 0; i <= json.length-1; i++){

			var Menu, MenuPlural;
			var IdCatalogo = json[i].IdCatalogo;
			var OpcionesCatalogo = json[i].Opciones;
			if(json[i].Catalogo.indexOf('/')!=-1){
				Menu = json[i].Catalogo.split('/')[0];
				MenuPlural = json[i].Catalogo.split('/')[1];
			}else{
				Menu = json[i].Catalogo;
				MenuPlural = json[i].Catalogo;
			}

			(!MenuPlural) ? MenuPlural = Menu : '';
			var Tkca = json[i].Tkca;
			var Tipo = json[i].Tipo;
			var $MenuNuevo = $('#ltOpcionesNuevo');
			var $LiAdicionales = $('#LiAdicionales');
			var $FiltroTipo = $('#FiltroTipo');
			var Agrupar = json[i].Agrupar;
			var VerEmpresa = json[i].VerEmpresa;
			var VerProspectos = json[i].VerProspectos;
			var VerVentas = json[i].VerVentas;
			var Indice = json[i].Indice;

			if(!_.size($('#MenuUlCatalogos'+IdCatalogo))){
				if(Tipo=='0'){ $LiAdicionales.before('<li class="CatalogosPersonalizados" id="MenuUlCatalogos'+IdCatalogo+'"><a href="sistema_catalogo.dbsp?tkca='+Tkca+'&s='+Menu+'&p='+MenuPlural+'"><i class="fa fa-lg fa-chevron-right"></i> '+MenuPlural+'</a></li>'); }
				//if(Tipo=='1'){ $LiAdicionales.before('<li class="CatalogosPersonalizados" id="MenuUlCatalogos'+IdCatalogo+'"><a href="sistema_industrias.dbsp">'+MenuPlural+'</a></li>'); }
				//if(Tipo=='2'){ $LiAdicionales.before('<li class="CatalogosPersonalizados" id="MenuUlCatalogos'+IdCatalogo+'"><a href="sistema_companias_grupos.dbsp">'+MenuPlural+'</a></li>'); }
			}

			if(json[i].EnMenu){ /*Agregar a Menu Nuevo*/
				if(!_.size($('#MenuCatalogo'+IdCatalogo))){
					var popup = "SalesUp.Sistema.AbrePopUp({ Titulo:'Nuevo "+Menu+"', Pagina:'popup_agregar_opcion.dbsp', Parametros:'tkca="+Tkca+"&s="+Menu+"&p="+MenuPlural+"', CallBack:'RecargaDatos', Modal:true, ModalAlt:true, Alto:320, Ancho:615 });";
					$MenuNuevo.append('<li class="CatalogosPersonalizados" id="MenuCatalogo'+IdCatalogo+'"><a onclick="'+popup+'" href="#"><i class="fa fa-lg fa-plus"></i> '+Menu+'</a></li>');
				}
			}

			var AgregarAgrupar = false;
			if(VerEmpresa){AgregarAgrupar = true;}
			if((EstoyEn=='Prospectos')&&(VerProspectos)){ AgregarAgrupar = true; }
			if((EstoyEn=='Oportunidades')&&((VerVentas)||(VerProspectos))){ AgregarAgrupar = true; }
			if((EstoyEn=='Clientes')&&(VerProspectos)){ AgregarAgrupar = true; }
			if((EstoyEn=='Ventas')&&((VerVentas)||(VerProspectos))){ AgregarAgrupar = true; }

			if(!_.size($FiltroTipo.find('option[data-Tkca="'+Tkca+'"]'))){

				var Opcion = '<option value="-1'+IdCatalogo+''+Indice+'" data-Tkca="'+Tkca+'" data-Indice="'+Indice+'" data-verProspectos="'+VerProspectos+'" data-verEmpresa="'+VerEmpresa+'" data-verVentas="'+VerVentas+'" >'+MenuPlural+'</option>';
				if((Tipo=='0')&&(AgregarAgrupar)){ $FiltroTipo.append(Opcion); }

			}

			if(Agrupar){

				if(AgregarAgrupar){
					var $LiAgrupacion = $('#LiAgrupacion'+IdCatalogo);
					if(!_.size($LiAgrupacion)){
						var HtmlLiAgrupacion = '<li id="LiAgrupacion'+IdCatalogo+'">';
							HtmlLiAgrupacion +='<a data-vista="'+Tkca+'" class="textoTema" href="#" onclick="SalesUp.Sistema.ActivaVerPor({ver:2, e:this, tkca:'+"'"+Tkca+"'"+', EstoyEn:'+"'"+EstoyEn+"'"+' });">';
							HtmlLiAgrupacion +='Vista de '+MenuPlural.toLowerCase();+' <i class="fa fa-check Verde"></i>';
							HtmlLiAgrupacion +='</a>';
							HtmlLiAgrupacion +='</li>';
						$BoxMasListas.find('#UlMenuAgrupacion').append(HtmlLiAgrupacion);
					}
				}
			}

			var MuestaCampo = false;
			if((OpcionesCatalogo)&&((VerProspectos)||(VerEmpresa))&&(EstoyEn=='PopUpProspectos')){
				MuestaCampo = true;
			}

			if((OpcionesCatalogo)&&(VerVentas)&&(EstoyEn=='PopUpOportunidades')){
				MuestaCampo = true;
			}

			if((Tipo=='0')&&(VerEmpresa)&&(EstoyEn=='PopUpEditarEmpresa')){
				MuestaCampo = true;
			}

			if(MuestaCampo){
				SalesUp.Sistema.OpcionesCatalogos({
					Tkca:Tkca, Tipo:Tipo, Indice:Indice,
					Catalogo:Menu, EstoyEn:EstoyEn,
					VerProspectos:VerProspectos,
					VerVentas:VerVentas,
					VerEmpresa:VerEmpresa
				});
			}



		}; /*fin for*/

		/*var nLi = $BoxMasListas.find('#UlMenuAgrupacion').find('li').length;
		if(nLi>2){ $BoxMasListas.show(); $BoxSwitch.remove(); }*/
		$BoxMasListas.show(); $BoxSwitch.remove();

		var Vista = '';
		if(EstoyEn=='Prospectos'){ Vista = SalesUp.Sistema.Almacenamiento({a:'SysSwitchProspectosEmpresas'}); }
		if(EstoyEn=='Oportunidades'){ Vista = SalesUp.Sistema.Almacenamiento({a:'SysSwitchOportunidadesEmpresas'}); }
		if(EstoyEn=='Clientes'){ Vista = SalesUp.Sistema.Almacenamiento({a:'SysSwitchClientesEmpresas'}); }

		(Vista=='') ? Vista = 0 : '';
		$('#UlMenuAgrupacion li a[data-vista]').removeClass('Activo');
		$('#UlMenuAgrupacion li a[data-vista="'+Vista+'"]').addClass('Activo');

	}/*CatalogosActivos*/

	this.OpcionesCatalogos = function(Op){
		(!Op) ? Op = {} : '';
		if(Op.Tipo!=0){return false;}
		SalesUp.Sistema.ActualizarTablas();
		var Tkca = Op.Tkca;
		var Catalogo = Op.Catalogo;
		var Indice = Op.Indice;
		var VerProspectos = Op.VerProspectos;
		var VerVentas = Op.VerVentas;
		var VerEmpresa = Op.VerEmpresa;
		if( _.size($('#DivBox'+Tkca)) ){return false;}
		var HtmlFormulario = SalesUp.Sistema.CargaDatos({ Link:'/privado/Vista/TemplateFormularios.dbsp', Almacen:'HtmlFormulario' });
		var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCatalogosOpciones.dbsp'/*, Almacen:'jsonCatalogosActivos'*/, Parametros:'tkca='+Tkca, DataType:'json' }).jsonDatos;

		var $DestinoSelects;
		(VerProspectos) ? $DestinoSelects = $('#BoxCatalogosActivos') : '';
		(VerEmpresa) ? $DestinoSelects = $('#ContenidoEmpresa') : '';
		(VerVentas) ? $DestinoSelects = $('#BoxCatalogosActivos') : '';

		var PrefijoCampo = '';
		(VerProspectos) ? PrefijoCampo = 'P-' : '';
		(VerEmpresa) ? PrefijoCampo = 'Com_' : '';
		(VerVentas) ? PrefijoCampo = 'O-' : '';

		var InfoSelect = {};
		InfoSelect.EsSelect = 1;
		InfoSelect.Campo = Catalogo;
		InfoSelect.Id = PrefijoCampo+'CatalogoOpcion'+Indice;
		InfoSelect.BoxCatalogo = 1;
		InfoSelect.Nombre = PrefijoCampo+'CatalogoOpcion'+Indice;
		InfoSelect.ClasesAdicionales = '';
		InfoSelect.AttrAdicionales = 'data-indice-catalogo='+Indice+'';

		var SelectCatalogo = SalesUp.Construye.ReemplazaDatos({ Template: HtmlFormulario, Datos: InfoSelect });
		SelectCatalogo = SalesUp.Sistema.StrReplace('BoxInfo','BoxInfo w50',SelectCatalogo);

		(VerEmpresa) ? $DestinoSelects.append(SelectCatalogo) : '';

		if(VerProspectos){ $DestinoSelects.append(SelectCatalogo); }

		if(VerVentas){
			$DestinoSelects.append(SelectCatalogo);
			/*
			var hay = $DestinoSelects.find('.BoxCatalogo').length;
			var $BoxComentario = $('#BoxComentario');
			$BoxComentario.find('textarea').attr('style','height:93% !important');
			if(hay<=2){
				$BoxComentario.css('height','53px');
			}else{
				$BoxComentario.css('height','30px');
			}
			*/
		}

		/*
		if(VerProspectos){
			var hay = $DestinoSelects.find('.BoxCatalogo').length;
			if((hay==1)||(hay==2)){
				$DestinoSelects.find('.BoxInfoTextArea').css('height','53px');
				$DestinoSelects.find('.BoxInfoTextArea').find('textarea').attr('style','height:93% !important');
			}
			if(hay>2){
				$DestinoSelects.find('.BoxInfoTextArea').css('height','30px');
				$DestinoSelects.find('.BoxInfoTextArea').find('textarea').attr('style','height:93% !important');
			}
		};
		*/

	    SalesUp.Construye.ConstruyemeUn({
			Control: 'select', Nuevo: false,
			SeleccioneOpcion: true,
			IdControl: PrefijoCampo+'CatalogoOpcion'+Indice,
			Template: '<option value="{{IdCatalogoOpcion}}">{{Opcion}}</option>',
			Datos: json
		});

		$('option').each(function(){ if(!$(this).html()){$(this).remove();} });
		var SelectId = PrefijoCampo+'CatalogoOpcion'+Indice;
		var $SelectId = $('#'+SelectId);
		$SelectId.attr('name','Select-'+SelectId).removeClass('InfoData');
		$SelectId.before('<input type="hidden" name="'+SelectId+'" id="Input-'+SelectId+'" />');

		function DespuesDeSeleccionarCatalogo(Op){
			var $Input = $('#Input-'+Op.Control);
			$Input.val(Op.Data);
		}

		var OpcionesSelectize = {
			create:false, dropdownParent:'body', maxItems:1, persist:false, delimiter:'ª',
			onChange: function(data){ DespuesDeSeleccionarCatalogo({Control:SelectId, Data:data}); }
		}

		setTimeout(function(){
			$SelectId.selectize(OpcionesSelectize);
			$DestinoSelects.find('.BoxInfo').removeClass('BoxCatalogo');
			$DestinoSelects.find('.InfoLabel').addClass('BoxSizing');
			$DestinoSelects.find('.selectize-control').addClass('BoxSizing InfoData');

		}, 200);

	}/*OpcionesCatalogos*/

	this.ActivaVerPor = function(Op){
		(!Op) ? Op = {} : '';
		var ver = Op.ver;
		var $Elemento = $(Op.e);
		$('#UlMenuAgrupacion li a[data-vista]').removeClass('Activo');
		$Elemento.addClass('Activo');
		SalesUp.Variables.VerOriginal = false;
		SalesUp.Variables.VerPorEmpresas = false;
		SalesUp.Variables.AgrupacionCatalogo = false;

		(ver==0) ? SalesUp.Variables.VerOriginal = true:'';
		(ver==1) ? SalesUp.Variables.VerPorEmpresas = true:'';
		((ver!=0)&&(ver!=1)) ? SalesUp.Variables.AgrupacionCatalogo = true:'';
		((ver!=0)&&(ver!=1)) ? ver = Op.tkca : '';
		PagAct = 1; Start = 1;
		SalesUp.Variables.Tkca = Op.tkca;
		ver = ver.toString();

		if(Op.EstoyEn=='Prospectos'){ SalesUp.Sistema.Almacenamiento({a:'SysSwitchProspectosEmpresas', v:ver}); }
		if(Op.EstoyEn=='Oportunidades'){ SalesUp.Sistema.Almacenamiento({a:'SysSwitchOportunidadesEmpresas', v:ver}); }
		if(Op.EstoyEn=='Clientes'){ SalesUp.Sistema.Almacenamiento({a:'SysSwitchClientesEmpresas', v:ver}); }
		if(Op.EstoyEn=='Ventas'){ SalesUp.Sistema.Almacenamiento({a:'x', v:ver}); }

		/*Cada ReloadData() pantalla tiene su propio ReloadData();*/
		ReloadData();
	}/*this.ActivaVerPor*/

	this.VistaPorAgrupacion = function (Op){
		(!Op) ? Op = {}:'';
		var start = 1;
		(Op.start) ? start = Op.start : '';
		var LosFiltros='', IdVentana=0, modeloJson = '';
		var TemplateVermas = '<div {{Eventos}} class="w100 tCen Pointer"><span Id="{{IdVermas}}" class="Btn Btn-flat-Aceptar Btn-tiny"><i class="fa fa-angle-down fa-lg"></i> <b>Ver más</b></span></div>';

		IdVentana = Op.IdVentana;
		LosFiltros = '/privado/'+Op.LosFiltros;
		modeloJson = '/privado/Modelo/'+Op.modeloJson;

		SalesUp.Variables.IdVentana = IdVentana;

		SalesUp.Sistema.CargaDatos({Link:LosFiltros, Parametros:'IdVentana='+IdVentana, Destino:'#LosFiltros' });
		var HtmlTemplateAgrupacion = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplatePorCatalogos.dbsp', Parametros:'thead=1&IdVentana='+IdVentana , Almacen: 'TemplatePorCatalogos' });
		var jsonAgrupaciones = SalesUp.Sistema.CargaDatos({Link:modeloJson, Parametros:'start='+start+'&howmany=50&IdVentana='+IdVentana+'&tkca='+SalesUp.Variables.Tkca , DataType:'json'});
		var TotalResgistros = jsonAgrupaciones.Registros.TotalResgistros;
		jsonAgrupaciones = jsonAgrupaciones.jsonDatos;

		SalesUp.Construye.ReemplazaTemplate({
			Template: HtmlTemplateAgrupacion,
			Destino: '#DatosLoad',
			Datos: jsonAgrupaciones
		});

		var RegistroAgrupaciones = parseInt(TotalResgistros);
		if(RegistroAgrupaciones==0){ SalesUp.Construye.SinResultados({Destino:'#DatosLoad'}); }

		if(RegistroAgrupaciones>30){
			var Inicia = start + 50;
			var MasProspectos = SalesUp.Sistema.StrReplace('{{Eventos}}','onmouseover="SalesUp.Sistema.VerMasAgrupaciones({ Elemento:this, Start:'+Inicia+', IdVentana:'+"'"+IdVentana+"'"+', LosFiltros:'+"'"+Op.LosFiltros+"'"+', modeloJson:'+"'"+Op.modeloJson+"'"+' });"  ', TemplateVermas);
			MasProspectos = SalesUp.Sistema.StrReplace('{{IdVermas}}','VerMasEmpresas', MasProspectos);
	 		$('#DatosLoad').append(MasProspectos);
		}

		SalesUp.Sistema.IniciaPlugins();
	}/*this.VistaPorAgrupacion*/

	SalesUp.Variables.OverVermas = true;
	this.VerMasAgrupaciones = function(Op){ (!Op) ? Op = {}:'';

		if(SalesUp.Variables.OverVermas){
			SalesUp.Variables.OverVermas = false;
			var $Elemento = $(Op.Elemento);
			SalesUp.Sistema.MuestraEspera($Elemento,1);
			setTimeout(function(){
				SalesUp.Sistema.VistaPorAgrupacion({
					IdVentana: Op.IdVentana, LosFiltros:Op.LosFiltros,
					modeloJson:Op.modeloJson, start:Op.Start
				});

				$Elemento.remove();
				SalesUp.Sistema.OcultaEspera();
				SalesUp.Variables.OverVermas = true;
			}, 300);
		}
	}/*this.VerMasAgrupaciones*/

	this.EjecutaMostrarTablaAgrupaciones = function(Op){
		SalesUp.Sistema.MostrarTablaAgrupaciones({Elemento:$('#Mostrar'+Op.Id), t:Op.Id , Tkco:Op.Tkco, nRegistros:Op.nRegistros });
	}/*EjecutaMostrarTablaAgrupaciones*/


	this.MostrarTablaAgrupaciones = function(Op){
		var $Elemento = $(Op.Elemento);
		var Abierto = parseInt($Elemento.attr('abierto'));

		SalesUp.Variables.IdEmpresaProsp = Op.t;
		SalesUp.Variables.tkComSeleccionadaProsp = Op.Tkco;
		SalesUp.Variables.nRegistrosProsp = Op.nRegistros;
		var Tkco = Op.Tkco;
		var LinkTemplate, LinkModeloJson, IdTabla, TheadColumas, TbodyColumas;
		var IdVentana = SalesUp.Variables.IdVentana;

		if(IdVentana==1){
			LinkTemplate = '/privado/TemplateProspectos.dbsp';
			LinkModeloJson = '/privado/Modelo/jsonProspectos.dbsp';
			IdTabla = 'ProspectosAgrupacion-';
			TheadColumas = 'ProspectosTheadColumas';
			TbodyColumas = 'ProspectosTbodyColumas';
		}

		if(IdVentana==2){
			LinkTemplate = '/privado/TemplateOportunidades.dbsp';
			LinkModeloJson = '/privado/Modelo/jsonOportunidades.dbsp';
			IdTabla = 'OportunidadesAgrupacion-';
			TheadColumas = 'OportunidadesTheadColumas';
			TbodyColumas = 'OportunidadesTbodyColumas';
		}

		if(IdVentana==4){
			LinkTemplate = '/privado/TemplateClientes.dbsp';
			LinkModeloJson = '/privado/Modelo/jsonClientes.dbsp';
			IdTabla = 'ClientesAgrupacion-';
			TheadColumas = 'ClientesTheadColumas';
			TbodyColumas = 'ClientesTbodyColumas';
		}

		//if(Op.tkcom==''){ Op.tkcom = 'Sin'; }
		if(Abierto>0){
			$('#BoxTabla'+Op.t).slideUp('slow');
			$Elemento.attr('abierto',0).addClass('fa-angle-down').removeClass('fa-angle-up');
		}else{
			$('#BoxTabla'+Op.t).slideDown('slow');
			$Elemento.attr('abierto',1).removeClass('fa-angle-down').addClass('fa-spinner fa-spin');
			SalesUp.Variables.ExisteTabla = _.size($('#BoxTabla'+Op.t).find('table'));

			setTimeout(function(){

				if(SalesUp.Variables.ExisteTabla==0){
					var Template1 = SalesUp.Sistema.CargaDatos({Link:LinkTemplate, Parametros:'thead=1&IdVentana='+IdVentana, Almacen: TheadColumas });
					var Template2 = SalesUp.Sistema.CargaDatos({Link:LinkTemplate, Parametros:'thead=0&IdVentana='+IdVentana, Almacen: TbodyColumas });
					var jsonDatos = SalesUp.Sistema.CargaDatos({Link:LinkModeloJson, Parametros:'start=1&howmany=50&IdVentana='+IdVentana+'&Tkco='+Tkco, DataType:'json' });

					/*if(jsonDatos.UltimoComentario){ $('#ComentarioI'+Op.t).html(jsonDatos.UltimoComentario.ULTIMOCOMENTARIO); }*/

					SalesUp.Construye.ConstruyeTabla(Template1, Template2, jsonDatos.JsonDatos,
						{ Destino: '#BoxTabla'+Op.t, Id:IdTabla+Op.t }
					);

					if(Op.nRegistros>50){
						var id = "'"+Tkco+"'";
						$('#BoxTabla'+Op.t).append('<div onclick="SalesUp.Sistema.VerMasResultadosAgrupaciones({ Elemento:this, Tkco: '+id+', t:'+Op.t+' , Start:51, howMany:50 });" class="w100 tCen Pointer"><span Id="VerMas" class="Btn Btn-flat-Aceptar Btn-tiny"><i class="fa fa-angle-down fa-lg"></i> <b>Ver más</b></span></div>');
					}
				}

				$Elemento.removeClass('fa-spinner fa-spin').addClass('fa-angle-up');

				$('.NombreEmpresa').hide();
				$('.PuestoContacto').show();

				if(Op.t=='-1'){ $('.NombreEmpresa').show();	}
				if(SalesUp.Variables.FuncionesAdicionales){SalesUp.Variables.FuncionesAdicionales();}

			}, 200);

		}
	}/*MostrarTablaAgrupaciones*/

	this.VerMasResultadosAgrupaciones = function(Op){
		var $Elemento = $(Op.Elemento);
		SalesUp.Sistema.MuestraEspera($Elemento,1);

		var LinkTemplate, LinkModeloJson, IdTabla, TheadColumas, TbodyColumas;
		var IdVentana = SalesUp.Variables.IdVentana;

		if(IdVentana==1){
			LinkTemplate = '/privado/TemplateProspectos.dbsp';
			LinkModeloJson = '/privado/Modelo/jsonProspectos.dbsp';
			IdTabla = 'ProspectosAgrupacion-';
			TheadColumas = 'ProspectosTheadColumas';
			TbodyColumas = 'ProspectosTbodyColumas';
		}

		if(IdVentana==2){
			LinkTemplate = '/privado/TemplateOportunidades.dbsp';
			LinkModeloJson = '/privado/Modelo/jsonOportunidades.dbsp';
			IdTabla = 'OportunidadesAgrupacion-';
			TheadColumas = 'OportunidadesTheadColumas';
			TbodyColumas = 'OportunidadesTbodyColumas';
		}

		if(IdVentana==4){
			LinkTemplate = '/privado/TemplateClientes.dbsp';
			LinkModeloJson = '/privado/Modelo/jsonClientes.dbsp';
			IdTabla = 'ClientesAgrupacion-';
			TheadColumas = 'ClientesTheadColumas';
			TbodyColumas = 'ClientesTbodyColumas';
		}

		SalesUp.Variables.TemplateRow = SalesUp.Sistema.CargaDatos({Link:LinkTemplate, Parametros:'thead=0&IdVentana='+IdVentana, Almacen: TbodyColumas });

		setTimeout(function() {
			SalesUp.Variables.jsonProspectos = SalesUp.Sistema.CargaDatos({Link:LinkModeloJson, Parametros:'start='+Op.Start+'&howmany='+Op.howMany+'&IdVentana='+IdVentana+'&Tkco='+Op.Tkco, DataType:'json' });

			SalesUp.Construye.ReemplazaTemplate({
				Template: SalesUp.Variables.TemplateRow,
				Destino: '#'+IdTabla+Op.t+' tbody',
				Datos: SalesUp.Variables.jsonProspectos.JsonDatos
			});

			var n = 1;
			$('#'+IdTabla+Op.t+' tbody tr').each(function(){
				$(this).find('td:first').html('<b>'+n+'</b>');
				n = n + 1;
			});

			var Desde = Op.howMany + Op.Start;

			if ( _.size($('#'+IdTabla+Op.t+' tbody tr')) < SalesUp.Variables.jsonProspectos.Registros.TotalResgistros){
				var id = "'"+Op.Tkco+"'";
				$('#BoxTabla'+Op.t).append('<div onclick="SalesUp.Sistema.VerMasResultadosAgrupaciones({ Elemento:this, Tkco: '+id+', t:'+Op.t+' , Start:'+Desde+', howMany:50 });" class="w100 tCen Pointer"><span Id="VerMas" class="Btn Btn-flat-Aceptar Btn-tiny"><i class="fa fa-angle-down fa-lg"></i> <b>Ver más</b></span></div>');
			}

			$('.NombreEmpresa').hide();
			$Elemento.remove();
			if(SalesUp.Variables.FuncionesAdicionales){SalesUp.Variables.FuncionesAdicionales();}else{console.warn('Falta declare FuncionesAdicionales')}
			SalesUp.Sistema.IniciaPlugins();
			SalesUp.Sistema.OcultaEspera();
		}, 100);
	} /* /SalesUp.Variables.VerMasProspectos */



	this.EnviarArchivoPorEmail = function(Op){
		$('.popover').hide();
		var idProspecto='', idOportunidad='', ArchivoFisico = '', Archivo='';
		var strIdprospecto='', strIdOportunidad='', strTkp='', strTko='';
		var strEnviarCorreo = 'ok=1';
		(Op.tkp) ? strEnviarCorreo += '&tkp='+Op.tkp:'';
		(Op.tko) ? strEnviarCorreo += '&tko='+Op.tko:'';
		(Op.idProspecto) ? strEnviarCorreo += '&idp='+Op.idProspecto:'';
		(Op.idOportunidad) ? strEnviarCorreo += '&ido='+Op.idOportunidad:'';
		(Op.ArchivoFisico) ? strEnviarCorreo += '&ArchivoFisico='+Op.ArchivoFisico:'';
		(Op.Archivo) ? strEnviarCorreo += '&NombreArchivoFisico='+Op.Archivo:'';


/*		var strEnviarCorreo = 'ok=1'+idProspecto+idOportunidad+ArchivoFisico+Archivo;*/
		SalesUp.Correo.nuevoCorreo({prm:strEnviarCorreo});


	}/*EnviarArchivoPorEmail*/

	this.CorreoEnviado = function(){
		SalesUp.Construye.MuestraNotificacion({Mensaje:'Correo enviado.'});
		var path = location.pathname;
		if(path.indexOf('-visualizar.dbsp')!=-1){
		  if(RecargaTablas){RecargaTablas();}
		}
	}

	this.getAllattr = function(obj){
		var attrs = obj.attributes, arr = {}, i = 0;
		for (; i < attrs.length; i++) {
		    arr[attrs[i].name] = attrs[i].value;
		}

		return arr;
	}

	this.ModulosActivos = function(){
		var HayModulos = _.size($('.spModulo[data-spmodulo]'));
		if(HayModulos==0){ return false;}

		var spModulos = SalesUp.Sistema.Almacenamiento({a:'SysSpModulos'});
		var spModulosStatus = SalesUp.Sistema.Almacenamiento({a:'SysSpModulosStatus'});

		if(!spModulos){spModulos='';}
		if(spModulos.indexOf(',')==-1){
			var jsonModulos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonModulosActivos.dbsp', DataType:'json'});
			spModulos = jsonModulos.MODULOS;
			spModulosStatus = jsonModulos.MODULOS_V;
			SalesUp.Sistema.Almacenamiento({a:'SysSpModulos',v:spModulos});
			SalesUp.Sistema.Almacenamiento({a:'SysSpModulosStatus',v:spModulosStatus});
		}

		spModulos = spModulos.split(',');
		spModulosStatus = spModulosStatus.split(',');

		for (var i = 0; i <= spModulos.length - 1; i++){
			var $Modulo = $('.spModulo[data-spmodulo="'+spModulos[i]+'"]');

			var nModulos = _.size($Modulo);

			for (var x = 0; x <= nModulos - 1; x++){
				var $mod = $($Modulo[x]);
				var ActivarId = $mod.attr('data-desactivar-id');
				if(spModulosStatus[i]=='1'){
					$mod.removeClass('spModulo');
					(ActivarId) ? $(ActivarId).remove() : '';
				}else{
					(ActivarId) ? $(ActivarId).removeClass('spModulo') : '';
					$mod.remove();
				}
			};

		};
	}

	this.EstaActivoModulo = function(Op){
		var Pasa = false;
		var Modulo = Op.Modulo;
		var spModulos = SalesUp.Sistema.Almacenamiento({a:'SysSpModulos'});
		var spModulosStatus = SalesUp.Sistema.Almacenamiento({a:'SysSpModulosStatus'});
		if(!spModulos){spModulos='';}
		if(spModulos.indexOf(',')==-1){return false;}

		spModulos = spModulos.split(',');
		spModulosStatus = spModulosStatus.split(',');

		for (var i = 0; i <= spModulos.length - 1; i++){
			if(spModulos[i] == Modulo){
				if(spModulosStatus[i]=='1'){
					Pasa = true;
				}
			}
		};
		return Pasa;
	}


	this.ListaTksEnPantalla = function(){
		var arrFilas, LtTks = '';

		(_.size($('#TablaProspectos'))>0)    ? arrFilas = $('#TablaProspectos tbody tr') : '';
		(_.size($('#TablaOportunidades'))>0) ? arrFilas = $('#TablaOportunidades tbody tr') : '';
		(_.size($('#TablaClientes'))>0)      ? arrFilas = $('#TablaClientes tbody tr') : '';
		(_.size($('#TablaVentas'))>0)        ? arrFilas = $('#TablaVentas tbody tr') : '';
		(_.size($('#ReporteSegmentos'))>0)   ? arrFilas = $('#ReporteSegmentos tbody tr') : '';


		if(!arrFilas){return '';}

		for(var i = 0; i <= arrFilas.length - 1; i++){
			var $Fila = $(arrFilas[i]);
			var tk = $.trim($Fila.attr('data-tk'));
			if(LtTks.indexOf(tk)==-1){
				LtTks += tk+',';
			}
		};

		return LtTks;
	}/*ListaTksEnPantalla*/

	this.ContactoCanalizado = function(){
		var arrFilas, LtTks = '';

		(_.size($('#TablaProspectos'))>0)    ? arrFilas = $('#TablaProspectos tbody tr[data-esta-canalizado]') : '';
		(_.size($('#TablaOportunidades'))>0) ? arrFilas = $('#TablaOportunidades tbody tr[data-esta-canalizado]') : '';
		(_.size($('#TablaClientes'))>0)      ? arrFilas = $('#TablaClientes tbody tr[data-esta-canalizado]') : '';
		(_.size($('#TablaVentas'))>0)        ? arrFilas = $('#TablaVentas tbody tr[data-esta-canalizado]') : '';
		(_.size($('#TablaCanalizaciones'))>0)? arrFilas = $('#TablaCanalizaciones tbody tr[data-esta-canalizado]') : '';

		if(!arrFilas){return false;}

		for(var i = 0; i <= arrFilas.length - 1; i++){
			var $Fila = $(arrFilas[i]);

			var donde = location.pathname;
			var selector = 'a[href*="prospectos-visualizar.dbsp"]';
			(donde.indexOf('prospectos.dbsp')!=-1)    ? selector = 'a[href*="prospectos-visualizar.dbsp"]' : '';
			(donde.indexOf('oportunidades.dbsp')!=-1) ? selector = 'a[href*="oportunidades-visualizar.dbsp"]': '';
			(donde.indexOf('clientes.dbsp')!=-1)      ? selector = 'a[href*="clientes-visualizar.dbsp"]' : '';
			(donde.indexOf('ventas.dbsp')!=-1)        ? selector = 'a[href*="ventas-visualizar.dbsp"]' : '';
			(donde.indexOf('distribuidores_detalle.dbsp')!=-1) ? selector = 'a.linkDetalle' : '';


			if($Fila.attr('data-esta-canalizado')!='0'){
				var $a = $Fila.find(selector); /*agregar a clientes y oportunidades*/
				var $Ini = $Fila.find('.ColIniciales');
				var $Compartido = $Ini.find('.fa-group');
				var TipOriginal = $Ini.attr('tip');
				var InicialOriginal = $Ini.text();

				if(_.size($Compartido)>0){
					var onclick = $Ini.attr('onclick');
					$Compartido.attr('onclick',onclick).attr('tip',TipOriginal).addClass('Tip7').removeClass('Tip1');
				}

				var Ini = $Ini.html();
				var $next = $a.next();
				if($next.hasClass('VerCanalizado')){ $next.remove(); }

				var FechaCanalizado = $Fila.attr('data-FechaCanalizado');
				var HoraCanalizado = $Fila.attr('data-HoraCanalizado');
				var Canalizo = $Fila.attr('data-Canalizo');
				var Canalizado = $Fila.attr('data-Canalizado');
				var tip = TipOriginal+' / '+Canalizado;
				var onClickCanalizar = 'SalesUp.Sistema.VerCanalizado({e:this, Hora:\''+HoraCanalizado+'\', Fecha:\''+FechaCanalizado+'\', Canalizo:\''+Canalizo+'\', Canalizado:\''+Canalizado+'\' });';
				var htmlCanalizado = '<span onclick="'+onClickCanalizar+'" class="Pointer VerCanalizado pl10"><i class="fa fa-reply-all fa-flip-horizontal"></i></span>';
				$a.after(htmlCanalizado);
				$Ini.removeClass('ProspectoCompartido').html('<span class="BoxCanalizado">'+Ini+' '+htmlCanalizado+'</span>');
				$Ini.find('.VerCanalizado').removeClass('pl10').attr('tip',tip).addClass('Tip1');
				$Ini.removeClass('Tip1').removeAttr('tip');
				var cloneBoxCanalizado = $Fila.find('.BoxCanalizado').clone();
				$Ini.after(cloneBoxCanalizado);
				$Ini.remove();

			}
		};
	}

	this.VerCanalizado = function(Op){
		var html='';
		var Fecha = (Op.Fecha) ? SalesUp.Sistema.dateFormat(Op.Fecha) : '';
		html += '<b>Canalizó:</b> '+Op.Canalizo+'<br/>';
		html += '<b>Canalizado a:</b> '+Op.Canalizado+'<br/>';
		html += '<b>Canalizado el:</b> '+Fecha+' '+Op.Hora+'<br/>';

		SalesUp.Construye.popOver({Elemento:Op.e, Titulo:'Contacto canalizado', Contenido:html});
	}

	this.InicialCanalizado = function(){
		var arrInicialCanalizado = $('.InicialCanalizado');

		for(var i = 0; i <= arrInicialCanalizado.length - 1; i++){
			var $Ini = $(arrInicialCanalizado[i]);
			var texto = $Ini.html();
			if(texto.indexOf('|')>0){
				var st = texto.split('|');
				var rep = '<span tip="'+st[0]+' ('+st[2]+')" class="Tip1">'+st[1]+'</span>';
				$Ini.after(rep);
				$Ini.remove();
			}
		}
		SalesUp.Sistema.IniciaPlugins();
	}

	this.RestriccionesCorporativo = function(){
		/*Esta funcion esta agregada en el getdata de
		scripts/basicos/filtros.dbsp
		scripts/FuncionesNuevas/Acciones.js
		*/
		function ValidaRestriccion(Op){
			var tk = Op.tk, tkm = Op.tkm;
			if((tkm!='') && (tk!=tkm) ){ return true; }
			return false;
		}

		function ValidaEliminar(Op){
			var tkm = Op.tkm;
			if(tk==tkm){ return true; }
			return false;
		}

		function ValidaCompartir(Op){
			var tkm = Op.tkm;
			var Activo = SalesUp.Sistema.EstaActivoModulo({Modulo:2});
			if( (tkm=='') && (Activo)){ return true; };
			return false;
		}

		var arrcoCorporativo = $('[data-Restriccion="coCorporativo"]');
		if(_.size(arrcoCorporativo)==0){return false;}

		var Bloqueados = false;

		for(var i = 0; i <= arrcoCorporativo.length - 1; i++){
			var $coCorporativo = $(arrcoCorporativo[i]);
			var tk = $coCorporativo.attr('data-tk');
			var tkm = $coCorporativo.attr('data-tkm');
			var Restringir   = ValidaRestriccion({tk:tk, tkm:tkm});
			var ConfirmacionEliminarEditar = ValidaEliminar({tk:tk, tkm:tkm});
			var Compartir 	 = ValidaCompartir({tkm:tkm});
			var $coEditar    = $coCorporativo.find('.coEditar');
			var $coAcciones  = $coCorporativo.find('.coAcciones');
			var texto = $coEditar.text();
			texto = $.trim(texto);
			if($coEditar){
				if( Restringir ){
					Bloqueados = true;
					var PermitirEditar = $coEditar.hasClass('coPermitirEditar');

					if(PermitirEditar){
						var onclick = $coEditar.attr('onclick');
						onclick = SalesUp.Sistema.StrReplace('editar=si','editar=no',onclick);
						$coEditar.attr('onclick', onclick);
					}else{
						$coEditar.after('<span style="cursor:not-allowed">'+texto+'</span>');
						$coEditar.remove();
					}
				}else{
					if(ConfirmacionEliminarEditar){
						if(_.size($coEditar)>0){
							var onclick = $coEditar.attr('onclick');
							$coEditar.attr('data-onclick', onclick).attr('onclick','SalesUp.Sistema.AdvertenciaEditarCatalogo({Elemento:this});');
							$coEditar.removeClass('coEditar');
						}
					}
				}
			}

			if($coAcciones){
				if( Restringir ){ $coAcciones.html(''); }
				$EliminarCatalogo = $coAcciones.find('span.EliminarCatalogo');
				$accionesOcultas = $coAcciones.find('.accionesOcultas');
				$divisorMenu = $accionesOcultas.find('.divisorMenu');

				if( ConfirmacionEliminarEditar ){ $EliminarCatalogo.attr('onclick','SalesUp.Variables.AlertaEliminarCatalogo({e:this, Corp:\'SalesUp.Sistema.AdvertenciaCatalogo\'});'); }
				if(Compartir){
					var id = $EliminarCatalogo.attr('data-id');
					var tk=$EliminarCatalogo.attr('data-tk');
  					var valor=(id)?id:tk;
					var strDato = (id)? 'Id:\''+valor+'\'' : 'tk:\''+valor+'\'' ;
					var btnCompartir = '<span class="Pointer CompartirCatalogo" onclick="SalesUp.Sistema.AdvertenciaCompartirCatalogo({'+strDato+', Opcion:\''+texto+'\' });"><i class="fa fa-lg fa-share-square-o"></i></span>';
					var btnCompartirTxt = '<span class="Pointer CompartirCatalogo OpcionAcciones" onclick="SalesUp.Sistema.AdvertenciaCompartirCatalogo({'+strDato+', Opcion:\''+texto+'\' });"><i class="fa fa-lg fa-share-square-o"></i> Compartir catálogo</span>';

					if(id!=undefined){
						if (_.size($divisorMenu)){
							$divisorMenu.before(btnCompartirTxt);
						}else{
							$coAcciones.append(btnCompartir);
						}
						$EliminarCatalogo.removeClass('EliminarCatalogo');
					}

					if(tk!=undefined){
						if (_.size($divisorMenu)){
							$divisorMenu.before(btnCompartirTxt);
						}else{
							$coAcciones.append(btnCompartir);
						}
						$EliminarCatalogo.removeClass('EliminarCatalogo');
					}

				}
			}
		};

		if(Bloqueados){
			$('#MensajeCatalogoBloquedo').remove();

			$('#DatosLoad').before('<span id="MensajeCatalogoBloquedo" class="BoxMsg MsgMal w100" style="display: block; max-width: 100%; left: 0px; position: relative; z-index: 2; margin: 0px 0px 10px;"><i class="fa fa-lg fa-info-circle"></i> Algunas opciones del catalogo están bloquedas debido a que su cuenta esta ligada a un corporativo.</span><div class="clear"></div>');
		}

		return true;
	}

	this.AdvertenciaEditarCatalogo = function(Op){
		var control = SalesUp.Sistema.queControl();
		var onclick = $(Op.Elemento).attr('data-onclick');
		onclick = SalesUp.Sistema.StrReplace(';','',onclick);
		var idempresa=SalesUp.Variables.sIdempresa;
		var tke=SalesUp.Variables.tke;
		var valor=(idempresa)?idempresa:tke;
		var str=(idempresa)? {e:valor} : {tke:valor} ;
		if(idempresa!=undefined){
          var j = SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/dependientes.dbsp', Parametros:str, DataType:'json'});
        }
        if(tke!=undefined){
          var j = SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/dependientesTKE.dbsp', Parametros:str, DataType:'json'});
        }
		// var j = SalesUp.Sistema.CargaDatos({Link:'https://control.salesup.com.mx/canalizaciones/dependientes.dbsp', Parametros:'e='+SalesUp.Variables.sIdempresa, DataType:'json'});
		var dependientes = j.datos[0].DEPENDIENTES;
		SalesUp.Construye.MuestraAlerta({
			TipoAlerta:'AlertaPregunta',
			Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/> Esta opción se encuentra ligada a '+dependientes+' empresas. <br/>¿Esta seguro de querer editar la opción?',
			Boton1:'<i class="fa fa-edit"></i>',
			Boton2:'Cancelar',
			Callback1: onclick,
			Icono1:'Si, editar',
			Icono2:'<i class="fa fa-times"></i>',
			Ancho:'500px'
		});
	}

	this.AdvertenciaCatalogo = function(Op){
		var control = SalesUp.Sistema.queControl();
		var idempresa=SalesUp.Variables.sIdempresa;
		var tke=SalesUp.Variables.tke;
        var valor=(idempresa)?idempresa: tke;
        var str=(idempresa)? 'e='+valor : 'tke='+valor;
        var str2=(idempresa) ? 'Id:'+Op.Id : 'tk:\''+Op.tk+'\'';
        if(idempresa!=undefined){
          var j = SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/dependientes.dbsp', Parametros:str, DataType:'json'});
        }
        if(tke!=undefined){
          var j = SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/dependientesTKE.dbsp', Parametros:str, DataType:'json'});
        }

		var dependientes = j.datos[0].DEPENDIENTES;
		SalesUp.Construye.MuestraAlerta({
			TipoAlerta:'AlertaPregunta',
			Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/> Esta opción se encuentra ligada a '+dependientes+' empresas. <br/>¿Esta seguro de querer eliminar la opción?',
			Boton1:'<i class="fa fa-trash"></i>',
			Boton2:'Cancelar',
			//Callback1: 'SalesUp.Variables.EliminarCatalogo({Id:\''+Op.Id+'\'})',
			Callback1: 'SalesUp.Variables.EliminarCatalogo({'+str2+'})',
			Icono1:'Si, eliminar ',
			Icono2:'<i class="fa fa-times"></i>',
			Ancho:'500px'
		});
	}

	this.AdvertenciaCompartirCatalogo = function(Op){
		var control = SalesUp.Sistema.queControl();
		var Id=(Op.Id)?Op.Id:'';
		var tk=(Op.tk)?Op.tk:'';
		var valor=(Id)?Id:tk;
		var strCompartir=(Id)? 'Id:\''+valor+'\'' : 'tk:\''+valor+'\'' ;

		//var j = SalesUp.Sistema.CargaDatos({Link:'https://control.salesup.com.mx/canalizaciones/dependientes.dbsp', Parametros:'e='+SalesUp.Variables.sIdempresa, DataType:'json'});
		var j;
		var idempresa=SalesUp.Variables.sIdempresa;
		var tke=SalesUp.Variables.tke;
        var valor=(idempresa)?idempresa: tke;
        var str=(idempresa)? 'e='+valor : 'tke='+valor ;

        if(idempresa!=undefined){
           j = SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/dependientes.dbsp', Parametros:str, DataType:'json'});
        }
        if(tke!=undefined){
           j = SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/dependientesTKE.dbsp', Parametros:str, DataType:'json'});
        }


		var dependientes = j.datos[0].DEPENDIENTES;
		SalesUp.Construye.MuestraAlerta({
			TipoAlerta:'AlertaPregunta',
			Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/>¿Está seguro de querer compartir la opción '+Op.Opcion+' con las '+dependientes+' empresas con las que se encuentra ligada?',
			Icono1:'Si, compartir',Boton1:'<i class="fa fa-share-square-o"></i>',
			Boton2:'Cancelar',Icono2:'<i class="fa fa-times"></i>',
			Callback1: 'SalesUp.Sistema.CompartirCatalogo({'+strCompartir+'})',
			Ancho:'500px'
        });
	}

	this.CompartirCatalogo = function(Op){
		var control = SalesUp.Sistema.queControl();
		var Id = (Op.Id)? Op.Id:0;
		var tk= (Op.tk)?Op.tk:'';
		var j = SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/obtieneTipos.dbsp', DataType:'json'});
		var j = _.where(j.datos ,{Tipo:SalesUp.Variables.CatalogoActual});

		if(Id>0 || Id!=''){
		 SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/compartir.dbsp', Parametros:'e='+SalesUp.Variables.sIdempresa+'&i='+Id+'&t='+j[0].IdTipo});
		}else if(tk!=''){
		 SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/compartir-tk.dbsp', Parametros:'tke='+SalesUp.Variables.tke+'&tk='+tk+'&tipo='+j[0].IdTipo});
		}
		SalesUp.Variables.ReloadData();
		setTimeout(function(){SalesUp.Construye.MuestraMsj({tMsg:2, Msg:'Opción de catalogo compartida', Destino:'#DatosLoad'});}, 1000);
	}

	this.LimpiarParaBuscarTexto = function(str){
		str = str.toLowerCase();
		str = SalesUp.Sistema.StrReplace('á','a',str);
		str = SalesUp.Sistema.StrReplace('é','e',str);
		str = SalesUp.Sistema.StrReplace('í','i',str);
		str = SalesUp.Sistema.StrReplace('ó','o',str);
		str = SalesUp.Sistema.StrReplace('ú','u',str);
		return str;
	}

	this.qryString = function(Op){
		var $Contenedor = $(Op.Formulario); var array = Op.array;
		var arrInputs = $Contenedor.find('input, select, textarea');

		if(array){ var qryString = [];}else{ var qryString = ''; }

		function crearQryString(elem){
			var $e = $(elem);
			var name = $e.attr('name');
			var valor = encodeURIComponent($.trim($e.val()));
			var srt = (name) ? (name+'='+valor+'&') : '';
			return srt;
		}

		function arrayElementos(elem){
			var $e = $(elem);
			var name = $e.attr('name'), valor = $.trim($e.val()), arr = {};
			if(name){ arr[name] = valor; }
			return arr;
		}

		for (var i = 0; i <= arrInputs.length - 1; i++){
			var input = arrInputs[i];
			if(array){
				var r = arrayElementos(input);
				if(_.size(r)){qryString.push(r);}
			}else{
				qryString += crearQryString(input);
			}
		};

		return qryString;
	}/*/qryString*/

	this.RestriccionOpcionesCanalizadas = function(Op){
		var prospectoEsCanalizado = Op.prospectoEsCanalizado;
		if(prospectoEsCanalizado=='0'){return false;}

		var arrOpcionesEscanalizado = $('option[data-escanalizado]');
		var arrOpcionesCanalizadas = $('option[escanalizado]');

		for (var i = 0; i <= arrOpcionesEscanalizado.length - 1; i++){
			var $op = $(arrOpcionesEscanalizado[i]);
			var tipo = $op.attr('data-escanalizado');
			if(tipo=='0'){ $op.remove(); }
		}

		for (var i = 0; i <= arrOpcionesCanalizadas.length - 1; i++){
			var $op = $(arrOpcionesCanalizadas[i]);
			var tipo = $op.attr('escanalizado');
			if(tipo=='0'){ $op.remove(); }
		}
	}

	this.filtrosPersonalizados = function(){
		var $FiltroTipo = $('#FiltroTipo');
		if(_.size($FiltroTipo)==0){return;}

		var estoyEn = SalesUp.Sistema.StrReplace('/privado/','',location.pathname);
		estoyEn = SalesUp.Sistema.StrReplace('.dbsp','',estoyEn);
		var ventana = '1', pasa= false;
		switch (estoyEn){
		  case 'prospectos'   : pasa = true; ventana = '1'; break;
		  case 'oportunidades': pasa = true; ventana = '1,2'; break;
		  case 'clientes'     : pasa = true; ventana = '1,3'; break;
		  case 'ventas'       : pasa = true; ventana = '1,4,2'; break;
		}
		if(!pasa){return;}
		var Almacen = 'jsonFP-'+estoyEn;


		var procesaFiltrosPersonalizados = function(Op,err){
		  if(err){return;}
		  var jsonPersonalizado = Op;
		  var jsonEmpresa = {jsonDatos:[
		  	{
		  		Campo:"",
		  		Config:"",
		  		Filtro:"(... Empresa ...)",
		  		idCampo: 0,
		  		tCamper: 0,
		  		tipoCampo: 0
		  	},{
		  		Campo:"110",
		  		Config:"",
		  		Filtro:"Industria",
		  		idCampo: 0,
		  		tCamper: 0,
		  		tipoCampo: 0
		  	},{
		  		Campo:"111",
		  		Config:"",
		  		Filtro:"Corporativo",
		  		idCampo: 0,
		  		tCamper: 0,
		  		tipoCampo: 0
		  	}
		  ]};

      	  var jsonEmpresaPersonalizado = _.where(jsonPersonalizado.jsonDatos, {esDe:5});

		  var tamanio = _.size(jsonEmpresaPersonalizado);

      	  for (var x = 0; x < tamanio; x++){
		  	jsonEmpresa.jsonDatos.push(jsonEmpresaPersonalizado[x]);
		  }

          jsonPersonalizado.jsonDatos = _.reject(jsonPersonalizado.jsonDatos,function(data){
		  	return data.Filtro == '(... Empresa ...)';
		  });

      	  jsonPersonalizado.jsonDatos = _.reject(jsonPersonalizado.jsonDatos,function(data){
		  	return data.esDe == 5;
		  });

		  SalesUp.Variables.jsonFiltrosPersonalizados = jsonPersonalizado.jsonDatos;

          var opcion = '{{#each jsonDatos}}<option value="{{Campo}}" Idcp="{{idCampo}}" tcp="{{tCamper}}" Data-esde="{{esDe}}" Data-tipocampo="{{tipoCampo}}">{{Filtro}}</option>{{/each}}';
		  var htmlOpcion = '<option class="tCen" value="">(... Campos personalizados ...)</option>';
		  htmlOpcion = '';

		  htmlOpcion += SalesUp.Construye.ReemplazaDatos({Template:opcion, Datos:jsonEmpresa});
		  htmlOpcion += SalesUp.Construye.ReemplazaDatos({Template:opcion, Datos:jsonPersonalizado});
		  $FiltroTipo.append(htmlOpcion);

		}

		SalesUp.Sistema.CargaDatosAsync({
		  link:'/privado/Modelo/jsonFiltrosPersonalizados.dbsp',
		  parametros:'VizualizarEn='+ventana,
		  almacen:Almacen,
		  callback:procesaFiltrosPersonalizados
		});

	}/*filtrosPersonalizados*/

	this.verEtiquetas = function(etiq){
		document.location = '/privado/segmentos_cargar.dbsp?idetiqueta=' + etiq;
	}

	this.removeTagsHtml = function(Texto){
		Texto = $.trim(Texto);
		var textoLimpio = Texto.replace(/<\/?[^>]+(>|$)/g, "");
		textoLimpio = $.trim(textoLimpio);
		/*textoLimpio = $(textoLimpio).text();*/
		return textoLimpio;
	}/*removeTagsHtml*/

	this.Menu = function(){
		var c = $('#menu-superior').css('color');
		var b = $('#menu-superior').css('backgroundColor');
		var b1 = b;
		var splitRgba=[];
		if (!b){return;}

		if(b.indexOf('rgba')!=-1){

		  splitRgba = b.split(',');

		}
		var opacity = SalesUp.Sistema.StrReplace(')','',$.trim(splitRgba[3]));
		(opacity) ? opacity = parseFloat(opacity):'';

		if(opacity){
		 b = SalesUp.Sistema.rgb2hex(b);
		 b = SalesUp.Sistema.hex2rgb(b,85);
		}


		var s = '<style type="text/css">';
		s += '.cssmenu > ul > li > a{color:[color];font-size: 1em;}';
		s += '.cssmenu > ul > li {background:[bg1];}';
		s += '.cssmenu > ul > li.has-sub::after{border-color:[color] transparent transparent;}';
		s += '.cssmenu ul ul li a{ background:[bg]; color:[color];}';
		s += '.cssmenu > ul > li:hover > a, #menu-superior a:hover{background:[color] !important;color: [bg];}';
		s += '.cssmenu > ul > li:hover::after {border-top-color: [bg];}';
		s += '.cssmenu > ul > li > ul::after{border-color: transparent transparent [bg];}';
		s += '.cssmenu ul ul li:hover > a{background:[color];color:[bg];}';
		s += '.cssmenu ul ul li.has-sub::after{border-right-color:transparent;border-top-color:[color];}';
		s += '.cssmenu ul ul li.has-sub:hover::after{border-left-color:[bg];border-right-color:transparent;}';
		s += '#menu-superior .cssmenu > ul > li:hover > a{color:[bg];}';

		s += '</style>';

		s = SalesUp.Sistema.StrReplace('[color]',c,s);
		s = SalesUp.Sistema.StrReplace('[bg]',b,s);
		s = SalesUp.Sistema.StrReplace('[bg1]',b1,s);
		//$('body').prepend(s);

		var construyeMenu = function(Op, err){
			if(Op){
				ConfiguracionMenu = Op
				var $Menu = $('#cssmenu ul');
				if(!_.size($Menu)){$('#menu-principal').html('<div id="cssmenu" class="cssmenu"><ul></ul></div>'); $Menu = $('#cssmenu ul');}
				$Menu.empty();

				var templateMenu = '{{#each ConfiguracionMenu}}{{ConstruyeMenu}}{{/each}}';
				var htmlMenu = SalesUp.Construye.ReemplazaDatos({Template:templateMenu, Datos:ConfiguracionMenu});
				$Menu.html(htmlMenu);
			}
		}

		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonMenu.dbsp', callback:construyeMenu, almacen:'jsonMenuSistema'});

		return true;
	}/*Menu*/

	this.tamanioStorage = function(){
		var t = 0;
		for(var x in localStorage) {
		  var amount = (localStorage[x].length * 2) / 1024 / 1024;
		  if(amount){t += amount;}
		}
		var tamaniotxt = "Total: " + t.toFixed(2) + " MB";
		return tamaniotxt;
	}/*tamanioStorage*/

	this.Relogin = function(Op){
		var dato = Op;
		(!dato) ? dato = {}:'';
		var ir = (dato.ir) ? dato.ir:'inicio.dbsp';
		var procesaLogin = function(html, err){
			$('body').append(html);
			$('#frmRelogin').submit();
		}
		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/relogin.dbsp',parametros:'ir='+ir, callback:procesaLogin, dataType:'html'});
	}/*Relogin*/

	this.base64 = function(Op){

		var Base64Encode = function(str) {
		    if (/([^\u0000-\u00ff])/.test(str)) throw Error('String must be ASCII');

		    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		    var o1, o2, o3, bits, h1, h2, h3, h4, e=[], pad = '', c;

		    c = str.length % 3;  // pad string to length of multiple of 3
		    if (c > 0) { while (c++ < 3) { pad += '='; str += '\0'; } }
		    // note: doing padding here saves us doing special-case packing for trailing 1 or 2 chars

		    for (c=0; c<str.length; c+=3) {  // pack three octets into four hexets
		        o1 = str.charCodeAt(c);
		        o2 = str.charCodeAt(c+1);
		        o3 = str.charCodeAt(c+2);

		        bits = o1<<16 | o2<<8 | o3;

		        h1 = bits>>18 & 0x3f;
		        h2 = bits>>12 & 0x3f;
		        h3 = bits>>6 & 0x3f;
		        h4 = bits & 0x3f;

		        // use hextets to index into code string
		        e[c/3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
		    }
		    str = e.join('');  // use Array.join() for better performance than repeated string appends

		    // replace 'A's from padded nulls with '='s
		    str = str.slice(0, str.length-pad.length) + pad;

		    return str;
		}

		var Base64Decode = function(str) {
		    if (!(/^[a-z0-9+/]+={0,2}$/i.test(str)) || str.length%4 != 0) throw Error('Not base64 string');

		    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		    var o1, o2, o3, h1, h2, h3, h4, bits, d=[];

		    for (var c=0; c<str.length; c+=4) {  // unpack four hexets into three octets
		        h1 = b64.indexOf(str.charAt(c));
		        h2 = b64.indexOf(str.charAt(c+1));
		        h3 = b64.indexOf(str.charAt(c+2));
		        h4 = b64.indexOf(str.charAt(c+3));

		        bits = h1<<18 | h2<<12 | h3<<6 | h4;

		        o1 = bits>>>16 & 0xff;
		        o2 = bits>>>8 & 0xff;
		        o3 = bits & 0xff;

		        d[c/4] = String.fromCharCode(o1, o2, o3);
		        // check for padding
		        if (h4 == 0x40) d[c/4] = String.fromCharCode(o1, o2);
		        if (h3 == 0x40) d[c/4] = String.fromCharCode(o1);
		    }
		    str = d.join('');  // use Array.join() for better performance than repeated string appends

		    return str;
		}

		var encode = true, str = $.trim(Op.str);
		(Op.decode) ? encode = false : '';

		if(encode){
			str = Base64Encode(str);
		}else{
			str = Base64Decode(str);
		}

		return str;
	}/*base64*/

	this.Bienvenida=function(){
		SalesUp.Sistema.AbrePopUp({
			Titulo :'Bienvenido a SalesUp!',
			Pagina :'/privado/Bienvenida.dbsp',
			Alto : '550',
			Ancho :'980'
		});
	}

	this.ConversorDeMoneda = function (obj){
		var tipoCambioActual 	= obj.tipoCambioActual;
		var nuevoTipoCambio		= obj.nuevoTipoCambio;
		var monto				= obj.monto;
		var montoFinal			= 0;
		if(tipoCambioActual < nuevoTipoCambio){
			montoFinal = (tipoCambioActual/nuevoTipoCambio)*monto;
		}else{
			montoFinal = ((1/nuevoTipoCambio)*tipoCambioActual)*monto;
		}

		montoFinal = montoFinal * 100;
		montoFinal = Math.floor(montoFinal);
		montoFinal = montoFinal / 100;

		return montoFinal;
	}

	this.calculaMontoTipoCambio = function(obj){
		var tipoDeCambioAnterior = (obj.tipoCambioAnterior) ? obj.tipoCambioAnterior:1;
		var tipoDeCambioNuevo = (obj.nuevoTipoCambio) ? obj.nuevoTipoCambio:1;
		var monto = obj.monto;
		var nuevoMonto = 0;

		if (tipoDeCambioAnterior == 1) {
			nuevoMonto = parseFloat(monto/tipoDeCambioNuevo);
		}else{
			if (tipoDeCambioNuevo == 1){
				nuevoMonto = parseFloat(monto*tipoDeCambioAnterior);
			}else{
				nuevoMonto = parseFloat((monto*tipoDeCambioAnterior)/tipoDeCambioNuevo);
			}
		}
		return parseFloat(nuevoMonto.toFixed(2));
	}

	this.paginaActual = function(Op){
	  var path = document.location.pathname;
	      path = SalesUp.Sistema.StrReplace('/privado/','',path);
	      path = SalesUp.Sistema.StrReplace('.dbsp','',path);
	      path = SalesUp.Sistema.StrReplace('-','',path);
	  (!Op) ? Op = {}:'';
	  var pagina = Op.pagAct;
	  var jsonAc = SalesUp.Sistema.Almacenamiento({a:'jsonAc'});

	  (!jsonAc) ? jsonAc = {}:'';

	  if(!pagina){return jsonAc[path];}

	  jsonAc[path] = pagina;

	  SalesUp.Sistema.Almacenamiento({a:'jsonAc', v:jsonAc});
	}

	this.queControl = function(){
	  var host = document.location.host
	      host = SalesUp.Sistema.StrReplace('.salesup.com','',host);
	      host = SalesUp.Sistema.StrReplace('.mx','',host);

	  if(host=='dev'){ return 'devControl'; }
	  if(host=='devbranch1'){ return 'devControl'; }
	  if(host=='devbranch2'){ return 'devControl'; }
	  if(host=='devbranch3'){ return 'devControl'; }
	  if(host=='devbranch4'){ return 'devControl'; }
	  if(host=='devbranch5'){ return 'devControl'; }
	  if(host=='dev'){ return 'devControl'; }

	  if(host=='sandbox'){ return 'SandboxControl'; }
	  if(host=='newsandbox'){ return 'SandboxControl'; }

	  return 'control';
	}/*queControl*/


	this.errorLogo = function(){
		var $logoEmpresa = $("#logo_empresa"), $imgEmpresa = $("#imagen_empresa");
	    var n = parseInt($logoEmpresa.attr('data-nivel')), linkIn = '/estilos/login/AgregaTuLogo.png';
	    $imgEmpresa.attr('src',linkIn);
	    $logoEmpresa.attr('href','/privado/inicio.dbsp');

	    if(n==1){ $logoEmpresa.attr('href','/privado/opciones_generales.dbsp'); }
	}/*errorLogo*/


	this.simboloMonedaDefault = function(){

		if(!SalesUp.Sistema.Almacenamiento({a:'SysSimboloMonedaDefault'})){
			var simboloMoneda = function(Op,err){
				var jsonData = Op.jsonDatos[0];
				var unicodeSimbolo = (jsonData.MONEDA_SIMBOLO)? jsonData.MONEDA_SIMBOLO : 36 ;
				var monedaSimbolo = String.fromCharCode(unicodeSimbolo);
				SalesUp.Sistema.Almacenamiento({a:'SysSimboloMonedaDefault',v:monedaSimbolo});
			}
			SalesUp.Sistema.CargaDatosAsync({link:'/privado/ajax/simboloMoneda.dbsp',callback:simboloMoneda});
		}
	}

	this.sumaColumna = function(datos, params){
		var resultados = {}, objColumnas = {};

		for(var x = 0; x < params.length; x++){
			var columna = params[x].columna, operacion = params[x].operacion, tCambio = params[x].tCambio;
			var respuesta = 0;

			datos.map(function(v){
				var valor = parseFloat(v[columna]);

				(isNaN(valor)) ? valor = 0 : '';
				if(tCambio){
					var cambio = parseFloat(v[tCambio]);
					(isNaN(cambio)) ? cambio = 1 : '';
	        		(cambio==0) ? cambio = 1 : '';
	        		respuesta += (valor*cambio);
				}else{
					respuesta += valor;
				}
			});

			objColumnas[columna] = respuesta;
		}

		return objColumnas;
	}/*sumaColumna*/

	this.versionSistema = function(){
		var linkVersion = '/version.txt';
		var pathname = document.location.pathname;
		(pathname=='/login/') ? linkVersion = 'https://socrates.salesup.com.mx/version.txt':'';
		var laVersion = SalesUp.Sistema.Almacenamiento({a:'SysVersion'});
		if(laVersion){ $('#VersionSistema').html(laVersion); return; }
		SalesUp.Sistema.CargaDatosAsync({
			link:linkVersion, dataType:'text',
			callback:function(version){
				if(version){
					version = 'v'+version.trim();
					$('#VersionSistema').html(version);
					SalesUp.Sistema.Almacenamiento({a:'SysVersion', v:version});
				}
			}
		});
	}/*versionSistema*/

	this.verReporte = function(Op){
		var estoyEn = document.location.pathname;
			estoyEn = SalesUp.Sistema.StrReplace('/privado/','',estoyEn);

		var tk = Op.tk;
		var e = Op.e;
		if(e){ e.preventDefault(); }

		if(estoyEn!='reporte.dbsp'){
			document.location.href='/privado/reporte.dbsp?tkrs='+tk;
			return;
		}

		var linkReporte = '/privado/reporte.dbsp?tkrs='+tk;
		history.pushState('', 'SalesUp! * Reportes', linkReporte);
		SalesUp.reportes.cargaOtroReporte(tk);

	}/*verReporte*/

 

	this.getScript = function(Op){
		var script = Op.script, callback = Op.callback, parametrosCallback = Op.parametrosCallback;
		$.getScript(script, function( data, textStatus, jqxhr ) {
			if(callback){callback(parametrosCallback);}
		});
	}/*getScript*/


	this.numeroConDecimal = function(numero){
	    if (isNaN(numero)){
	        return 0;
	    }
	    else{
	        if (numero % 1 == 0) {
	            return parseInt(numero);
	        }
	        else{
	            return SalesUp.Sistema.NumeroDosDecimales(numero);
	        }
	    }
	}/*numeroConDecimal*/
	this.MuestraCambiaPassword = function() {
		if ($("#CambiaPassword").length > 0) {
			return false;
		}
	    SalesUp.Construye.MuestraPopUp({
	        alto: '225px',
	        ancho: '410px',
	        centrado: false,
	        titulo: 'Cambia contraseña',
	        id: 'CambiaPassword',
	        fuente: '/privado/popUpCambiaPassword.dbsp' 
	    });
	    setTimeout(function(){$('#CambiaPassword [title="Cerrar"]').remove();},200);
	};/*MuestraCambiaPassword*/

	this.GuardaPassword = function(Op, err, prm) {
	    var SuccessText;
	    SalesUp.Construye.CierraPopUp({
	        t: prm.t
	    });
	    if (Op.jsonDatos[0].CAMBIO) {

	        SuccessText = '<i class="fa fa-info-circle"></i> La contraseña ha sido cambiada satisfactoriamente.';
	        SalesUp.Construye.MuestraNotificacion({
	            Mensaje: SuccessText
	        });
	        localStorage.removeItem("sysRevisaAlertas");
	        localStorage.removeItem("jsonAlertas");
	    } else {
	        SuccessText = 'No se logro concretar la operación';
	        SalesUp.Construye.MuestraNotificacion({
	            Mensaje: SuccessText
	        });
	    }
	};/*GuardaPassword*/

	this.GuardaNuevoPassword = function(Op) {
	    var var1 = $('#' + Op.id1).val();
	    var var2 = $('#' + Op.id2).val();
	    var $DentroDe = $('#' + Op.id1).closest('form');
	    $btn = $(Op.t);

	    var compara = Seguridad.ComparePassWords(var1, var2);
	    if (compara.iguales && compara.validez > 2) {
	        var cambioDeContrasegna = $('#frmCambiaPwd').serialize();
	        $('.ContenedorModal').html(SalesUp.Sistema.unMomento());
	        SalesUp.Sistema.CargaDatosAsync({
	            metodo: 'POST',
	            link: '/privado/modelo/changePassword.dbsp',
	            parametros: cambioDeContrasegna,
	            prmAdicionales: {
	                t: $('.ContenedorModal')
	            },
	            callback: SalesUp.Sistema.GuardaPassword
	        });
	    } else if (compara.validez < 3) {
	        setTimeout(function() {
	            $('#' + Op.id1).focus();
	        }, 0);
	        SalesUp.Construye.MuestraMsj({
	            tMsg: 4,
	            Destino: $DentroDe,
	            Msg: 'Se requiere una contraseña segura'
	        });
	    } else {
	        setTimeout(function() {
	            $('#' + Op.id1).focus();
	        }, 0);
	        SalesUp.Construye.MuestraMsj({
	            tMsg: 4,
	            Destino: $DentroDe,
	            Msg: 'Las contraseñas no coinciden'
	        });
	    }
	};/*GuardaNuevoPassword*/

	this.cargaVentanaTickets = function(){
		SalesUp.Variables.templateTicketsAlerta = SalesUp.Sistema.CargaDatos({
			Link: "/privado/vista/templateAlertaTickets.dbsp",
			DataType: "html"/*,
			Almacen:'HtmlAlertaTickets'*/
		});
		SalesUp.Sistema.CargaDatosAsync({
			link: "/privado/modelo/jsonticketNotificacion.dbsp",
			callback: procesaTicketNotificacion
		});
	}

	var procesaTicketNotificacion = function(Op) {
		danpi = SalesUp.Sistema.clone(Op);
		if (typeof (window.tickets) != "function") {
			SalesUp.Sistema.getScript({
				script:'/privado/Controlador/tickets.js'
			});
		}
		var list = Op.jsonDatos;
		var groups = _.groupBy(list, function(value) {
			return value.TKT;
		});
		SalesUp.Variables.data = {};
		SalesUp.Variables.data.jsonInfo = _.map(groups, function(group) {
			return {
				TKT: group[0].TKT,
				Ticket: group[0].TICKET,
				ASUNTO: group[0].ASUNTO,
				Comentario: group[0].DESCRIPCION,
				FECHA_CREACION: group[0].FECHA_CREACION,
				NombreUsuario: group[0].NombreUsuario,
				Alias: group[0].Alias,
				ADJUNTO: group[0].ADJUNTO,
				LINK: group[0].LINK,
				IDTC: _.last(group).IDTICKETCOMENTARIO,
				TKTCOM : _.last(group).TKTCOM,
				FECHA_ULTIMAMODIFICACION: group[0].FECHA_ULTIMAMODIFICACION,
				CERRAR : group[0].CERRAR,
				VISTO_CLIENTE : group[0].VISTO_CLIENTE,
				comentarios: group
			};
		});

		Content = SalesUp.Construye.ReemplazaDatos({
			Template: SalesUp.Variables.templateTicketsAlerta,
			Datos: SalesUp.Variables.data
		});
		var Titulo;
		if (parseInt(SalesUp.Variables.data.jsonInfo[0].CERRAR) == 0) {
			Titulo = 'Tienes un nuevo comentario en el siguiente ticket';
		}else{
			Titulo = 'Tienes respuesta al siguiente ticket';
		}
		SalesUp.Construye.MuestraPopUp({
			alto: "500px",
			ancho: "615px",
			centrado: false,
			id: "popUpTicketAbierto",
			titulo: Titulo,
			contenido: Content
		});

		setTimeout(function(){
			var color = SalesUp.Sistema.hex2rgb(SalesUp.Sistema.rgb2hex($('#menu-superior').css('backgroundColor')),80);
			var color2 = SalesUp.Sistema.hex2rgb(SalesUp.Sistema.rgb2hex($('#menu-superior').css('backgroundColor')),27);
			$('#popUpTicketAbierto .TitDiv').css({'border-color':color});
			$('#popUpTicketAbierto .BodyModal').css({'height':''})
			$('#popUpTicketAbierto .DetalleTicketPopUp:first').show()
			$('#popUpTicketAbierto .usuario2').css({'background-color': color2});
			$('#popUpTicketAbierto .headerModalTickets').css({'border-bottom': '2px solid '+color+''});
			$('#popUpTicketAbierto').css({'z-index':'80'});
			// $("#popUpTicketAbierto .contenedorComentariosTicket:first").animate({ scrollTop: $('.contenedorComentariosTicket:first').prop("scrollHeight")}, 1600);
		},600)
	};

	this.calculaMontoTipoCambio = function(obj){
		var tipoDeCambioAnterior = (obj.tipoCambioAnterior) ? obj.tipoCambioAnterior:1;
		var tipoDeCambioNuevo = (obj.nuevoTipoCambio) ? obj.nuevoTipoCambio:1;
		var monto = obj.monto;
		var nuevoMonto = 0;

		if (tipoDeCambioAnterior == 1) {
			nuevoMonto = parseFloat(monto/tipoDeCambioNuevo);
		}else{
			if (tipoDeCambioNuevo == 1){
				nuevoMonto = parseFloat(monto*tipoDeCambioAnterior);
			}else{
				nuevoMonto = parseFloat((monto*tipoDeCambioAnterior)/tipoDeCambioNuevo);
			}
		}
		return parseFloat(nuevoMonto.toFixed(2));
	}/*calculaMontoTipoCambio*/

	this.paginacion = function(obj){
      var registros = obj.registros, start = obj.start, callback = obj.callback, $tabla = obj.tabla, parametros = obj.parametros;
      var total = registros, porPagina=50, Actual = Math.ceil(start/porPagina);
      var DivPaginacion = '<div id="Paginacion" class="BoxPaginacion paginacion"></div><div class="clear"></div>';
      var divPaginacion = '<div id="Paginacion" class="BoxPaginacion paginacion"></div>';
      var styleTop ='';
      var r_totales = porPagina*Actual;
      if (total > porPagina) {
        var pagtotal = total/porPagina;
            pagtotal = Math.ceil(pagtotal);

        var ultimaPag = 'last', strNext = 'Siguiente <i class="fa fa-chevron-right"></i>';
        $('#Paginacion').remove();
        $tabla.after(divPaginacion);
        $('#Paginacion').bootpag({
            total:pagtotal, page: Actual, maxVisible: 7, leaps: false, next: strNext,
            firstLastUse: true, prev: '<i class="fa fa-chevron-left"></i> Atras',
            last: 'Fin', first: 'Inicio', lastClass: ultimaPag
        }).on("page",function(event,num){
          var nuevoStart = ((num-1) * porPagina) + 1;
          $('#DatosLoad').html(SalesUp.Sistema.unMomento());
          callback({filtro:parametros,start:nuevoStart});
        });
        $('#Paginacion>ul>li>a').addClass('Npag');
        $('#Paginacion>ul>li.active>a').removeClass('Npag').addClass('PagAct');
        var enEstaPagina = ((start + porPagina -1) > registros ) ? registros : (start + porPagina -1);
        var htmlTotal = '<p class="Registros tDer"><b>'+start+'</b> - <b>'+enEstaPagina+'</b> de <b>'+registros+'</b> resultados</p>';
        $('#Paginacion').append(htmlTotal)
      }else{
        $('#Paginacion').remove();
        $tabla.after(divPaginacion);
        var htmlTotal = '<p class="Registros tDer"><b>'+registros+'</b> resultados</p>';
        $('#Paginacion').append(htmlTotal)
      }
	}/*laPaginacion*/

	this.getParameter = function(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}/*getParameter*/

	this.formatoNumero = function(num){
		var nFormateado = '';
		var n = num;
		var sepDecimalesSis = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});
		var sepMiles = SalesUp.Sistema.Almacenamiento({a:'SysSepMiles'});
		(!sepDecimalesSis)?sepDecimalesSis='.':'';
		(!sepMiles)?SysSepMiles=',':'';

		nFormateado = accounting.formatNumber(n,2,'',sepDecimalesSis,sepMiles);

		return nFormateado;

	}

	this.quitarFormatoNumero = function(num){
		var SysSepDecimales = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});
		return accounting.unformat(num, SysSepDecimales);
	}

	this.datosUsuario = function(Op){
		const datosUsuario = {
			tku:Op.tku,
			tke:Op.tke,
			nivel:Op.nivel,
			pais:Op.pais,
			perEtiquetar:isNaN(parseInt(Op.etiquetar)) ? 0:parseInt(Op.etiquetar),
			perCompartirContacto: isNaN(parseInt(Op.puedeCompartir)) ? 0:parseInt(Op.puedeCompartir),
			perMantenimientoDB: isNaN(parseInt(Op.mantenimientoDb)) ? 0:parseInt(Op.mantenimientoDb),
		};
		SalesUp.Sistema.readOnly({base:SalesUp,nombre:"datosUsuario"});
		SalesUp.Sistema.readOnly({base:SalesUp.datosUsuario,valor:datosUsuario});
	}

	this.readOnly = function(params){
		var base,valor,nombre;
		base = params.base;
		nombre = params.nombre;
		valor = params.valor;

		if (_.isObject(valor) && !_.isArray(valor)) {
			var llaves = _.keys(valor)
			_.each(llaves,function(e){
				Object.defineProperty(base, e, {
				  value: valor[e],
				  writable: false,
				  enumerable: false,
				  configurable: false
				});
			})
		}else if(nombre != '' && nombre != undefined){
			valor = valor|| {};
			Object.defineProperty( SalesUp, nombre, {
			  value: valor,
			  writable: false,
			  enumerable: false,
			  configurable: false
			});
		}else{
			console.error('Parametros incorrectos');
		}
	}

    this.PermisoActivo = function(nombrePermiso,valoresPermitidos){
    	var permiso = SalesUp.datosUsuario['per'+nombrePermiso];
    	if (_.indexOf(valoresPermitidos,permiso) >= 0) {
    		return true;
    	}
    	else{
    		return false;
    	}
    }
	
	this.obtieneTku = function(){
	  return (SalesUp.datosUsuario)?  SalesUp.datosUsuario.tku : localStorage.SysTku;
	}
	
	this.jsonify=function(o){
      var seen=[];
      var jso=JSON.stringify(o, function(k,v){
        if (typeof v =='object') {
            if ( !seen.indexOf(v) ) { return '__cycle__'; }
            seen.push(v);
        } return v;
      });
        return jso;
      };
      var obj={
       g:{
        d:[2,5],
        j:2
      },
      e:10
     };


	this.actualizaAlerta = function(op){
	  var tku = SalesUp.Sistema.obtieneTku();
	  var idPediticion = 't='+SalesUp.Construye.IdUnico();

		var datos =  SalesUp.Sistema.jsonify([{token:tku, operacion : op.operacion, datos:op.datos}]);
		
		datos = SalesUp.Sistema.Encript({tipo:'encode', cadena:datos});
		 
		SalesUp.Sistema.CargaDatosAsync({link:'https://alertas.salesup.com/cambia?data='+datos, parametros:idPediticion});
						 
		
	}	
} /*Fin sistema*/

SistemaDefault.prototype.TiempoSolicitud = function(){ return self._TiempoSolicitud(); };
SistemaDefault.prototype.MensajeEnviado = function(){ return self._MensajeEnviado(); };
SistemaDefault.prototype.AbreMenuSlideToggle = function(Op){ return self._AbreMenuSlideToggle(Op); };