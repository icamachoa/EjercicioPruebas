var Validaciones = function(){
	self._ban;
	self._ValidaCamposObligatorios = function(){
		var b = true;
		$('.InfoObligatorio').each(function(){
			if($(this).val() == '' || $(this).val() == null){
				$(this).parent().prepend('<span class="InfoLabelMal"><i class="fa fa-times"></i></span>').addClass('FocusMal');
				$(this).addClass("mal")
				.keyup(function(){ $(this).removeClass('mal'); $('.InfoLabelMal').remove();  $(this).parent().removeClass('FocusMal');  })
				.change(function(){ $(this).removeClass('mal'); $('.InfoLabelMal').remove();  $(this).parent().removeClass('FocusMal');  });
				b = false;
				$('#Guardando').remove();
			}
		});
		
		if(b===false){
			self._MuestraAlertaError({ Id:'MsgInfoObligatorios', Msg:'Los campos marcados son <b>Obligatorios</b>.' , Destino:'body' });
			
			$("input.mal:first, select.mal:first, textarea.mal:first").focus();
		}
		return b;
	}//_ValidaCamposObligatorios

	self._SoloNumeros = function(v){
		self._ban = true;
		if(isNaN(v)){
			self._ban = false;
		}
		return self._ban;
	}

	self._SoloNumerosKeyCode = function(e){
		var Key = SalesUp.Sistema.NumKeyCode(e);
		if( ( (Key>=48) && (Key<=57) ) || (Key==45) || (self._PermitidosKeyCode(e)) ){
			self._ban = true;
		}else{ SalesUp.Valida.ResaltaInputError({Obj:e.currentTarget, txt:'Solo números'}); self._ban = false; }

		return self._ban;
	}

	self._SoloDecimalesKeyCode = function(e){
		var Key = SalesUp.Sistema.NumKeyCode(e);
		if( ( (Key>=48) && (Key<=57) ) || (Key==45) || (Key==46) || (self._PermitidosKeyCode(e)) ){
			self._ban = true;
		}else{ SalesUp.Valida.ResaltaInputError({Obj:e.currentTarget, txt:'Solo decimales'}); self._ban = false; }

		return self._ban;
	}

	self._PermitidosKeyCode = function(e){
		var Key = SalesUp.Sistema.NumKeyCode(e);
		
		if( (Key==13) || (Key==8) || (Key==37) || (Key==38) || (Key==39) || (Key==40) ){
			return true;
		}else{ return false; }
		
	}

	self._MuestraAlertaError = function(Op){
		$('#'+Op.Id).remove();
		$(Op.Destino).append('<span id="'+Op.Id+'" class="AlertDanger"><i class="fa fa-times-circle"></i> '+Op.Msg+'</span>');
		$('#'+Op.Id).slideDown(500).delay(3500).slideUp(500);
	}/* _MuestraAlertaError */

	self._ResaltaInputError = function(Op){
		setTimeout(function(){
			$(Op.Obj).one('keyup',function(){ $(Op.Obj).removeClass('NumMal'); $(Op.Obj).parent().find('.TachaError').remove(); }).addClass('NumMal');
			SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Msg:Op.txt });
			/*.after('<i title="'+Op.txt+'" class="TachaError fa fa-question-circle"></i>')*/
		},100);
	}

	this.ValidaTamanioArchivo = function(Op){
		var ban = true, MaxSize, aMb ;
		var destino = (Op.destino) ? Op.destino : 'body';
		var IE = navigator.appVersion.indexOf("MSIE 9");
		if(IE<0){
			(Op.Max) ? MaxSize = Op.Max : MaxSize = 20;
			Tamanio = Op.Archivo.files[0].size;
			aMb = (Tamanio / 1024) / 1024;
			if(aMb>MaxSize){
				ban = false;
				SalesUp.Construye.MuestraMsj({tMsg:3, Destino:destino, Id:'ErrorTamanio', Msg:'Tamaño de archivo permitido. '+MaxSize+' Mb.' });
			}
		}
		
		return ban;
	}/* /ValidaTamanioArchivo() */

	this.ValidaObligatorios = function(Op){
		var Pasa = true, DentroDe = '', DestinoMsj='body';
		(_.isUndefined(Op)) ? Op = {} : '';
		(Op.DentroDe) ? DentroDe = Op.DentroDe : '';
		(Op.DestinoMsj) ? DestinoMsj = Op.DestinoMsj : '';
		
		var arrObligatorios = [];
		arrObligatorios = $('.InfoObligatorio');
		if(DentroDe!=''){
			arrObligatorios = $(DentroDe).find('.InfoObligatorio');
		}
		
		arrObligatorios.each(function(){
			var $Elemento = $(this);
			var noCuenta;
			noCuenta = ( ($Elemento.hasClass('selectize-control') ) || ( $Elemento.hasClass('selectize-dropdown') ) );
			
			if(!noCuenta){
				if( _.isEmpty($Elemento.val()) ){
					Pasa = false;
					SalesUp.Construye.MuestraMsj({tMsg:4, Destino:DestinoMsj, Msg:'Los campos marcados son <strong>Obligatorios</strong>' });
					SalesUp.Valida.MarcarObligatorio($Elemento);
					SalesUp.Valida.FocusMal();
					//return Pasa;
				}
			}
		});
		return Pasa;
	}/* /ValidaObligatorios */

	this.ValidaFechas = function(){
		var Pasa = true;
		$('.Fecha').each(function(){
			var $Elemento = $(this);
			var Fecha = $Elemento.val();
			var strConvertCode = 'dd/mm/aaaa';
			ConvertCode = SalesUp.Sistema.Almacenamiento({a:'SysConvertCode'});
			(ConvertCode == 101) ? strConvertCode = 'mm/dd/aaaa':'';

 			Pasa = SalesUp.Valida.esFecha(Fecha, SalesUp.Sistema.Almacenamiento);
			
			if(!Pasa){
				SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Msg:'Formato de fecha inválido (<strong>'+strConvertCode+'</strong>)' });
				SalesUp.Valida.MarcarObligatorio($Elemento);
				SalesUp.Valida.FocusMal();
				return Pasa;
			}
		});
		return Pasa;
	}/* /ValidaFechas */


	this.esFecha = function(f, fAlmacenamiento){
		var Pasa = true, charSplit='/', ConvertCode;
		if(f){
			ConvertCode = fAlmacenamiento({a:'SysConvertCode'});
			(!ConvertCode) ? ConvertCode = 103:'';

		    (_.size(f)!=10) ? Pasa = false : ''; 
		    
		    (f.indexOf('-')>0) ? charSplit = '-' : '';
		    
		    FechaSplit = f.split(charSplit);
		    
		    if(ConvertCode==103){
		    	(FechaSplit[1]>12) ? Pasa = false : ''; 	
		    }
		    
		    if(ConvertCode==101){
		    	(FechaSplit[0]>12) ? Pasa = false : ''; 	
		    }
		}
		return Pasa;
	}/*this.esFecha*/

	this.FocusMal = function(){
		var $t = $('.DatoMal:first');
		
		$('#Tabs .ui-tabs-panel').each(function(){
			var Hay = $(this).find('.DatoMal').length;
			if(Hay>0){
				var IdTab = $(this).attr('id');
				$('a[href="#'+IdTab+'"]').click();
				return false;
			}
		});
		setTimeout(function() { $t.focus(); }, 100);
	}

	this.QuitarMarcadorObligatorio = function($t){
		$padre = $t.closest('.BoxInfo');
		if(_.size($padre)==0){$padre = $t.closest('.InfoBox');}

		var $label = $padre.find('.InfoDatoMal');
		$label.removeClass('InfoDatoMal');
		$padre.find('.DatoMal').removeClass('DatoMal');
	}

	this.MarcarObligatorio = function($t){
		$t.prev().addClass('InfoDatoMal');
		$t.addClass('DatoMal');

		var $padre;
		$padre = $t.closest('.BoxInfo');
		if(_.size($padre)==0){$padre = $t.closest('.InfoBox');}

		$padre.find('.InfoLabel').addClass('InfoDatoMal');
		
		var $marcar = $padre.find('input.InfoData, select.InfoData, .BoxListaOpciones');
		$marcar.addClass('DatoMal');

		$marcar.change(function(){ SalesUp.Valida.QuitarMarcadorObligatorio($t); }).keyup(function(){ SalesUp.Valida.QuitarMarcadorObligatorio($t); });
	}

	this.MarcarSugerido = function($t){
		$t.addClass('DatoSugerido');
		$t.prev().addClass('InfoDatoSugerido');
		$t.change(function(){ SalesUp.Valida.QuitarMarcadorSugerido($t); }).keyup(function(){ SalesUp.Valida.QuitarMarcadorSugerido($t); });
	}

	this.QuitarMarcadorSugerido = function($t){
		$t.removeClass('DatoSugerido').removeAttr('data-coincidencias').removeAttr('data-tks'); 
		$t.prev().removeClass('InfoDatoSugerido');
		$('#BtnSugerencias').remove();
		var arrDataCoincidencia = $('[data-coincidencias]');
		var numCoincidencias = 0;
		for (var i = 0; i <= arrDataCoincidencia.length - 1; i++){
			numCoincidencias += parseInt($(arrDataCoincidencia[i]).attr('data-coincidencias'));
		};
		if(numCoincidencias>0){

			var btn = '<button onclick="SalesUp.Buscar.VerSugerencias();" class="Btn Btn-rounded Btn-small Btn-flat-Aceptar Pulse" id="BtnSugerencias" type="button" style="float:left;padding:0px 10px 0px 20px;"><span class="BoxSizing NumCoincidencias">'+numCoincidencias+'</span> Registros repetidos <i class="fa fa-copy"></i></button>';
			$('.BoxBotonesAccion').prepend(btn);	
		}
	}

	this.ValidaEmail = function(Op){
		Pasa = true;
		var $Elemento = $(Op.Elemento);
		if( !_.isEmpty(Op.Email) ){
			Post = {e:Op.Email};
			SalesUp.Variables.jsonValidaEmail = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonValidaEmail.dbsp', Parametros:Post, DataType:'json', Div:0 });
			if(SalesUp.Variables.jsonValidaEmail.jsonDatos[0].Valido==0){
				SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Msg:'El correo <b>['+Op.Email+']</b> es inválido, por favor verifique de nuevo.' });
				SalesUp.Valida.MarcarObligatorio($Elemento);
				SalesUp.Valida.FocusMal();
				Pasa = false;
			}
		}
		return Pasa;			
	}

	this.ValidaExtension = function(Op){
		var Pasa = true;
		var Archivo = Op.Archivo.toLowerCase();
		
		if(Archivo){
			var Ext = Archivo.split('.').pop();
			var Extensiones = SalesUp.Valida.ExtensionesPermitidas();
			
			if(Extensiones.indexOf(Ext)<0){
				SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Id:'ArchivosValidos', Msg:'Extensión inválida. Sólo archivos de Office, imágenes, audio, PDF y TXT.' });
				Pasa = false;
			}
		}
		return Pasa;
	}/*ValidaExtension*/

	this.ExtensionesPermitidas = function(){
		var ExtPermintidas = [];
		var Documentos = ['pdf','doc','docx','ppt','pptx','pps','ppsx','xls','xlsx','txt','xml','ai','psd'];
		var Imagenes = ['jpg','png','jpeg','gif'];
		var Audio = ['mp3','wma',''];
		var Zips = ['zip','rar'];
		var Raros1 = ['dbl','docm','dotx','dotm','xlsm','xltx','xltm','xlsb','xlam','pptm','potx'];
		var Raros2 = ['potm','ppam','ppsm','sldx','sldm','thmx','pub','odt','ott','sxw','stw'];

		ExtPermintidas = _.union(Documentos, Imagenes, Audio, Zips, Raros1, Raros2);
		SalesUp.Variables.ExtPermintidas = SalesUp.Sistema.StrReplace(',','|',ExtPermintidas.toString());
		
		return ExtPermintidas;
	}/*ExtensionesPermitidas*/

	this.EsUnico = function(Op){
		var Tipo = Op.Tipo;
		
		if((Tipo===1)||(Tipo===3)){
			SalesUp.Valida.ProspectoEsUnico({ Elemento:Op.Elemento, Valor:Op.Valor });
		}

		if((Tipo===2)||(Tipo===4)){
			SalesUp.Valida.OportunidadEsUnico({ Elemento:Op.Elemento, Valor:Op.Valor });
		}
	}

	this.ProspectoEsUnico = function(Op){
		var $Elemento = $(Op.Elemento);
		var noCuenta;
		var Pasa = true;
		noCuenta = ( ($Elemento.hasClass('selectize-control') ) || ( $Elemento.hasClass('selectize-dropdown') ) );
		
		if(!noCuenta){
			var Valor = Op.Valor;
			
			if(!_.isEmpty(Valor)){
				var IdProspecto = 0;
				(SalesUp.Variables.IdProspecto) ? IdProspecto = SalesUp.Variables.IdProspecto : '';
				var IdCampo = $Elemento.attr('idc');
				var Campo = $Elemento.prev().html();
				var Post = {v:Valor, idc:IdCampo, idp: IdProspecto };
				var txtDescartado = '';
				
				SalesUp.Variables.jsonUnico = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonValidaUnico.dbsp', Parametros:Post, DataType:'json', Div:0 });
				if( _.size(SalesUp.Variables.jsonUnico.jsonDatos[0]) > 0 ){
					Pasa = false;
					
					(SalesUp.Variables.jsonUnico.jsonDatos[0].Descartado==1) ? txtDescartado = ' <b style="color:red;">[Descartado]</b> ' : '';

					var Mensaje = 'El prospecto <b>' + SalesUp.Variables.jsonUnico.jsonDatos[0].Prospecto + '</b>';
					Mensaje = Mensaje + txtDescartado+' asignado a <b>' + SalesUp.Variables.jsonUnico.jsonDatos[0].Usuario;
					Mensaje = Mensaje + '</b> fue capturado con el mismo <b>' + Campo + '</b>. Por favor revise la información.';

					SalesUp.Construye.MuestraMsj({tMsg:3, Destino:'body', Msg:Mensaje, NoCerrar:true });
					SalesUp.Valida.MarcarObligatorio($Elemento);
					SalesUp.Valida.FocusMal();
					return Pasa;
				}else{ return Pasa; }
			}else{ return Pasa; }
		}else{ return Pasa; }
	}/* /ProspectoEsUnico */

	this.ValidaCamposUnicosProspectos = function(Op){
		var Pasa = true; DentroDe = '';
		(_.isUndefined(Op)) ? Op = {} : '';
		(Op.DentroDe) ? DentroDe = Op.DentroDe:'';
		$(DentroDe + '.InfoUnico').each(function(){
			Pasa = SalesUp.Valida.ProspectoEsUnico({ Elemento: this, Valor: $(this).val() });
			if(!Pasa){return Pasa;}
		});
		return Pasa;
	}/* /ValidaCamposUnicosProspectos */


	this.OportunidadEsUnico = function(Op){
		var $Elemento = $(Op.Elemento);
		var noCuenta;
		var Pasa = true;
		noCuenta = ( ($Elemento.hasClass('selectize-control') ) || ( $Elemento.hasClass('selectize-dropdown') ) );
		
		if(!noCuenta){
			var Valor = Op.Valor;
			
			if(!_.isEmpty(Valor)){
				var Ido = 0;
				(SalesUp.Variables.Ido) ? Ido = SalesUp.Variables.Ido : '';
				var IdCampo = $Elemento.attr('data-idc');
				var IdOportunidad = Ido;
				var Campo = $Elemento.prev().html();
				var Post = {v:Valor, idc:IdCampo, ido: IdOportunidad };
				var txtDescartado = '';
				
				SalesUp.Variables.jsonUnico = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonValidaUnicoOportunidades.dbsp', Parametros:Post, DataType:'json' });
				var json = SalesUp.Variables.jsonUnico.jsonDatos[0];
				if( _.size(json) > 0 ){
					Pasa = false;
					
					(json.Descartado==1) ? txtDescartado = ' <b style="color:red;">[Descartado]</b> ' : '';

					var Mensaje = ''
					Mensaje += 'Existe una oportunidad con el concepto <b>'+json.Concepto+'</b>';
					Mensaje += ', con un monto <b>'+SalesUp.Sistema.FormatoMoneda(json.Monto)+'</b> ('+SalesUp.Sistema.FormatoPorcentaje(json.Certeza)+'), ';
					Mensaje += ' del contacto <b>'+json.Prospecto+'</b>';
					Mensaje += txtDescartado+' asignado a <b>'+json.Usuario+'</b>';
					Mensaje += ' fue capturado con el mismo <b>' + Campo + '</b>. Por favor revise la información.';

					SalesUp.Construye.MuestraMsj({tMsg:3, Destino:'body', Msg:Mensaje, NoCerrar:true });
					SalesUp.Valida.MarcarObligatorio($Elemento);
					SalesUp.Valida.FocusMal();
					return Pasa;
				}else{ return Pasa; }
			}else{ return Pasa; }
		}else{ return Pasa; }
	}/* /OportunidadEsUnico */

	this.ValidaCamposUnicosOportunidades = function(Op){
		var Pasa = true; DentroDe = '';
		(_.isUndefined(Op)) ? Op = {} : '';
		(Op.DentroDe) ? DentroDe = Op.DentroDe:'';
		$(DentroDe + '.InfoUnico').each(function(){
			Pasa = SalesUp.Valida.OportunidadEsUnico({ Elemento: this, Valor: $(this).val() });
			if(!Pasa){return Pasa;}
		});
		return Pasa;
	}/* /ValidaCamposUnicosOportunidades */

	this.ValidaNumeros = function(Op){
		var Evento = Op.e, Pasa = false;
		var Key = SalesUp.Sistema.NumKeyCode(Evento);
		if( ( (Key>=48) && (Key<=57) ) || (Key==45) || (self._PermitidosKeyCode(Evento)) ){
			Pasa = true;
		}else{
			if(!_.isUndefined(Op.v) || !_.isNull(Op.v)){
				($.isNumeric(Op.v)) ? $(Evento.currentTarget).val(Op.v) : $(Evento.currentTarget).val('');
			}
			SalesUp.Valida.ResaltaInputError({Obj:Evento.currentTarget, txt:'Solo números'}); 
		}
		return Pasa;
	}

	this.ValidaDecimales = function(Op){
		var Evento = Op.e, Pasa = false;
		var Key = SalesUp.Sistema.NumKeyCode(Evento);
		
		if( ( (Key>=48) && (Key<=57) ) || (Key==45) || (Key==46) || (Key==190) || (self._PermitidosKeyCode(Evento)) ){
			Pasa = true;
		}else{
			if(!_.isUndefined(Op.v) || !_.isNull(Op.v)){
				($.isNumeric(Op.v)) ? $(Evento.currentTarget).val(Op.v) : $(Evento.currentTarget).val('');
			}
			SalesUp.Valida.ResaltaInputError({Obj:Evento.currentTarget, txt:'Solo decimales'}); 
		}

		return Pasa;
	}

	this.ValidaEsCorreo = function(v){
		var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  		return re.test(v);
	}


	this.valDecimales = function(Op){
		var DestinoMsj='body';

		var evento = Op.e;
		var control = Op.t;
		var $t = $(Op.t);
		var Tecla, valido=false, CodVar;
		(Op.DestinoMsj) ? DestinoMsj = Op.DestinoMsj : '';
			
		if(Op.Cerca){
			DestinoMsj =$t.closest(DestinoMsj);
		}

		Tecla = SalesUp.Sistema.NumKeyCode(evento);
		var car = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});


		if (car==','){CodVar=44;}
		if (car=='.'){CodVar=46;}

		if (((Tecla > 47) && (Tecla < 58)) || (Tecla==9) || (Tecla==8) || (Tecla==13) || (Tecla==37) || (Tecla==38) || (Tecla==39) || (Tecla==40) || 
		    (Tecla==45) || (Tecla==CodVar) ) {
	    	if ( (Tecla==CodVar) && (control.value.indexOf(car)!= -1 ) ) {
	    	  valido = false 
	    	 } else
	    	if ( (Tecla==45) && (control.value!='' ) ) {
	    	  valido = false 
	    	 }
	    	 else {
		    	if(String.fromCharCode(evento.charCode)!="'"){
		    		valido = true;
		    	}
		    	else{
		    		valido= false;
		    	}
	    	}		 
		}
		
		if(!valido) {
			console.error('no Pasa');
			setTimeout(function(){
				SalesUp.Construye.MuestraMsj({tMsg:4, Destino:DestinoMsj, Msg:'Soló se permiten <b>decimales</b>' });
				SalesUp.Valida.MarcarObligatorio($t);
				SalesUp.Valida.FocusMal();
			}, 100);
		};

		return valido;
	}

	this.valNumero = function(Op){
		var DestinoMsj='body';
		var evento = Op.e;
		var control = Op.t;
		var $t = $(Op.t);
		var Tecla, valido=false, CodVar;
		(Op.DestinoMsj) ? DestinoMsj = Op.DestinoMsj : '';
		Tecla = SalesUp.Sistema.NumKeyCode(evento);
		if (((Tecla > 47) && (Tecla < 58)) || ((Tecla > 96) && (Tecla < 106)) || (Tecla==9) || (Tecla==8) || (Tecla==13) || (Tecla==37) || (Tecla==38) || (Tecla==39) || (Tecla==40) || 
		    (Tecla==45) || (Tecla==CodVar) ) {
	    	if ( (Tecla==45) && (control.value!='' ) ) {
	    	  valido = false 
	    	 }
	    	 else {
		    	if(String.fromCharCode(evento.charCode)!="'"){
		    		valido = true;
		    	}
		    	else{
		    		valido= false;
		    	}
	    	}		 
		}

		if(Op.Cerca){
			DestinoMsj =$t.closest(DestinoMsj);
		}


		if(!valido) {
			setTimeout(function(){
				SalesUp.Construye.MuestraMsj({tMsg:4, Destino:DestinoMsj, Msg:'Soló se permiten <b>números</b>' });
				SalesUp.Valida.MarcarObligatorio($t);
				SalesUp.Valida.FocusMal();
			}, 100);
		};

		return valido;
	}

	this.esJson = function(json){
		var jsonValido = false;

	  try{
	  	if(json){
	  		JSON.parse(json);
	  		jsonValido = true;
	  	}

	    return jsonValido;
	  }catch(e){
	    return jsonValido;
	  }
	};


  
}/* /Validaciones() */

Validaciones.prototype.ValidaCamposObligatorios = function(){ return self._ValidaCamposObligatorios(); };
Validaciones.prototype.MuestraAlertaError = function(Op){ return self._MuestraAlertaError(Op); };
Validaciones.prototype.SoloNumeros = function(v){ return self._SoloNumeros(v); };
Validaciones.prototype.SoloNumerosKeyCode = function(e){ return self._SoloNumerosKeyCode(e); };
Validaciones.prototype.SoloDecimalesKeyCode = function(e){ return self._SoloDecimalesKeyCode(e); };
Validaciones.prototype.ResaltaInputError = function(Op){ return self._ResaltaInputError(Op); };







