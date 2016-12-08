var Login = function (){
	var $LinkLogin = $('#LinkLogin'), $btnIngresar = $('#btnIngresar'), $boxInputs = $('.boxInputs'), $InputPassword = $('#InputPassword'), $InputEmail = $('#InputEmail'), $RecuperarPass = $('#RecuperarPass');
	var $usrInvalido = $('#usrInvalido');
	var spin = ' <i class="fa fa-lg fa-spin fa-spinner"></i>', check = ' <i class="fa fa-lg fa-check"></i>';
	
	var liWebinars = '{{#each webinars}}<li><a href="{{link}}" target="_blank"><span class="dateList">{{fecha}}</span><span class="itemList">{{texto}}</span></a></li>{{/each}}',
		liFunciones = '{{#each funciones}}<li>{{texto}}</li><li><a class="videoFunciones" href="{{link}}" target="_blank"><img src="{{img}}"></a></li>{{/each}}';
		liManuales = '{{#each manuales}}<li><a href="{{link}}" target="_blank">{{texto}}</a></li>{{/each}}';

	var frmTemporal  = '<form autocomplete="false" action="[servidor]" id="frmIngresar" method="post" style="display:none;">';
		frmTemporal += '	<input type="email" name="email" value="[correo]" autocomplete="false">';
		frmTemporal += '	<input type="password" name="contrasenia" value="[psw]" autocomplete="false">';
		frmTemporal += '	<input type="hidden" name="valido" value="ok" autocomplete="false">';
		frmTemporal += '</form>';

	var servidor = function(){
		var host = document.location.hostname;
		var serv = SalesUp.Sistema.StrReplace('.salesup.com.mx','',host);
		return serv;
	}

	this.autenticar = function(Op){
		var InputEmail, InputPassword, Info, resp, key, prm;
		var ti = (new Date()).getTime();
		
		var ingresaSistema = function(Op, err, prm){
			if(Op){
				var acceso = 'https://'+prm.servidor+'.salesup.com.mx'+Op.login;
				var frmAcceso = SalesUp.Sistema.StrReplace('[correo]', InputEmail, frmTemporal);
					frmAcceso = SalesUp.Sistema.StrReplace('[psw]', InputPassword, frmAcceso);
					frmAcceso = SalesUp.Sistema.StrReplace('[servidor]', acceso, frmAcceso);
				$('body').append(frmAcceso);
				$('#frmIngresar').submit();
			}
		}/*ingresaSistema*/

		var procesaAut = function(Op,err){
			// console.info('procesaAut');
			
			if(Op){
				var resultado = Op.Resultado;
				var servidor = Op.servidor;
				var error = '<i class="fa fa-lg fa-times"></i> '+Op.Error;
				
				if(!resultado){
					muestraError(error);
					return;
				}

				if(resultado){
					SalesUp.Sistema.CargaDatosAsync({link:'https://'+servidor+'.salesup.com.mx/webservices/ObtieneLogin.dbsp', parametros:prm, callback:ingresaSistema, prmAdicionales:{servidor:servidor}, metodo:'POST'});
				}
			}
		}/*procesaAut*/
		var formDataObtieneAcceso = new FormData();
		var InputEmail, InputPassword, Info, resp, key, prm;
		var ti = (new Date).getTime();
		if (Op){key = SalesUp.Sistema.NumKeyCode(Op.e); if (key!=13){return;}}
		if((InputEmail=='')||(InputPassword=='')){return;}
		$btnIngresar.append(spin);
		
		InputEmail = $InputEmail.val();
		InputPassword = $('#InputPassword').val();
		if (!InputEmail){muestraError('Por favor, escribe tu correo.'); $InputEmail.focus(); return;}
		if (!InputPassword){muestraError('Por favor, escribe tu contraseña.'); return;}


		formDataObtieneAcceso.append('email',InputEmail);
		formDataObtieneAcceso.append('contrasenia',InputPassword);

		prm = 'email='+InputEmail+'&contrasenia='+InputPassword;
		
		/*SalesUp.Sistema.CargaDatosAsync({link:'https://control.salesup.com.mx/webservices/obtieneacceso.dbsp', parametros:prm, callback:procesaAut, metodo:'POST'});*/
		SalesUp.Sistema.CargaDatosAsync({link:'https://control.salesup.com.mx/webservices/obtieneacceso.dbsp', parametros:formDataObtieneAcceso, callback:procesaAut, metodo:'POST', formData:true});
	}/*autenticar*/

	var muestraError = function(error){
		limpiaError();
		$usrInvalido.html(error);
		$boxInputs.addClass('has-error');
		$InputPassword.focus().keyup(function(){limpiaError();}).selected;
		$InputEmail.keyup(function(){limpiaError();});
	}

	this.Login = function(Op){
		var InputEmail, InputPassword, Info, LinkLogin, resp, key;
		var ti = (new Date).getTime();
		if (Op){key = SalesUp.Sistema.NumKeyCode(Op.e); if (key!=13){return;}}
		if((InputEmail=='')||(InputPassword=='')){return;}
		$btnIngresar.append(spin);
		var LinkLogin = $LinkLogin.val();
		$('#frmEntrar').attr('action',LinkLogin);
		$('#frmEntrar').submit();
		return;

		InputEmail = $InputEmail.val();
		InputPassword = $('#InputPassword').val();
		Info = '&email='+InputEmail+'&contrasenia='+InputPassword+'&ti='+ti;
		LinkLogin = $LinkLogin.val()+Info;
		
		SalesUp.Sistema.CargaDatosAsync({link:LinkLogin, callback:SalesUp.Login.validaSesion, metodo:'POST'});
	}/*Login*/

	this.noticias = function(){ 
		var ti = (new Date).getTime();
		SalesUp.Sistema.CargaDatosAsync({link:'https://'+servidor+'.salesup.com.mx/datosLogin.dbsp', parametros:'ti='+ti, callback:this.generaNoticias});
	}

	this.generaNoticias = function(Op,err){
		if(err){console.log(err);console.warn('Algo fallo'); return;}
		if(Op){
			$('.cargandoDatos').remove();
			var $listaWebinars = $('#listaWebinars'), $listaFunciones = $('#listaFunciones'), $listasManuales = $('#listasManuales');
			var compilado = SalesUp.Construye.ReemplazaDatos({Datos:Op, Template:liWebinars});
			$listaWebinars.prepend(compilado);

			var compilado = SalesUp.Construye.ReemplazaDatos({Datos:Op, Template:liFunciones});
			$listaFunciones.prepend(compilado);

			var compilado = SalesUp.Construye.ReemplazaDatos({Datos:Op, Template:liManuales});
			$listasManuales.prepend(compilado);
			$(".videoFunciones").colorbox({iframe:true, innerWidth:640, innerHeight:390});
		}
	}

	this.validaSesion = function(Op,err){
		var InputEmail, InputPassword, Info, LinkLogin, resp, key;
		var ti = (new Date).getTime();
		if(err){sessionFail(); return;}
		if(Op){
			if(Op.valido){
				var dts = Op.dts;
				var serv = servidor();
				
				if (dts==serv){
					sessionOk({dts:Op.dts});
				}else{
					
					InputEmail = $InputEmail.val();
					InputPassword = $('#InputPassword').val();
					Info = '&email='+InputEmail+'&contrasenia='+InputPassword+'&ti='+ti;
					LinkLogin = 'https://'+dts+'.salesup.com.mx'+$LinkLogin.val()+Info;
					SalesUp.Sistema.CargaDatosAsync({link:LinkLogin, callback:iraServidor, metodo:'POST'});
				}
			}
		}
	}

	var iraServidor = function(Op, err){ /*console.info('iraServidor');*/
		var ti = (new Date).getTime();
		if(err){sessionFail(); return;}
		if(Op){
			
			var credenciales = Op.credenciales;
			if(Op.valido){
				var dts = Op.dts;
				InputEmail = $InputEmail.val();
				InputPassword = $('#InputPassword').val();
				Info = '&email='+InputEmail+'&contrasenia='+InputPassword+'&ti='+ti;
				LinkLogin = 'https://'+dts+'.salesup.com.mx'+credenciales+Info;
				SalesUp.Sistema.CargaDatosAsync({link:LinkLogin, callback:irOtroServer, metodo:'POST'});
			}
		}
	}

	var irOtroServer = function(Op,err){ /*console.info('irOtroServer');*/
		if (Op){
			if(Op.valido){
				var dts = Op.dts;
				sessionOk({dts:Op.dts});
			}
		}
	}

	var sessionOk = function(Op){ /*console.info('sessionOk');*/
		limpiaError();
		$btnIngresar.append(spin);

		var dts = 'https://'+Op.dts + '.salesup.com.mx/privado/inicio.dbsp?ok=1&valido='+(new Date).getTime();
		document.location.href=dts;
	}

	var limpiaError = function(){
		$boxInputs.removeClass('has-error');
		$btnIngresar.find('.fa').remove();
	}

	var sessionFail = function(){
		
		limpiaError();
		
		$boxInputs.addClass('has-error');
		$InputPassword.focus().keyup(function(){limpiaError();}).selected;
		$InputEmail.keyup(function(){limpiaError();});

	}

	this.sessionFail = function(){
		sessionFail();
	}

	this.falloLogin = function(){
		var padre = location.pathname;
		if((padre != '/') && (padre != '/index.dbsp') && (padre != '/login/index.html') && (padre != '/login/') ){
			sessionFail();
		}
	}
	
	this.fondoLogin = function(){
		var LtFondos = ['agua','atardecer','barco','basketball','bosque','chichen','egipto','estadio','fresa','futbol','londres','luna','microfono','naturaleza','paris','playa','riodejaneiro','rosas','tundra', 'exito'];
		var LtTemas = ['Agua','Atardecer','Barco','Basketball','Bosque','Chichén Itzá ','Egipto','Estadio','Fresa','Futbol','Londres','Luna','Micrófono','Naturaleza','Paris','Playa','Río de janeiro','Rosas','Tundra', 'Éxito'];
		var nRamdom = Math.floor(Math.random() * LtFondos.length);
		var Fondo = LtFondos[nRamdom];
		var Tema = LtTemas[nRamdom];

		var clase = 'login_'+LtFondos[nRamdom];
		
		var img = new Image();
        img.src = 'https://socrates.salesup.com.mx/estilos/index/'+Fondo+'.jpg';
        img.onload = function (){$('.login').addClass(clase);};
        $('#temaFondo').html(Tema);
	}/*fondoLogin*/

	this.olvidasteContrasena = function(Op){
		var e = Op.e;
		e.preventDefault();
		var $boxAcceso = $('#boxAcceso'), $boxRecuperar = $('#boxRecuperar');;
		var vAcceso = $boxAcceso.is(':visible');
		if (vAcceso){
			$boxAcceso.hide();
			$boxRecuperar.show();
			$RecuperarPass.focus();
		}else{
			$boxAcceso.show();
			$boxRecuperar.hide();

		}
	}

	this.recuperarContrasena = function(Op){
		$('#btnReestablecer').append(spin);
		SalesUp.Sistema.CargaDatosAsync({link:'https://control.salesup.com.mx/webservices/ContraseniaEnviada.dbsp', parametros:'e='+$RecuperarPass.val(), callback:this.evaluaPeticion});
	}

	this.evaluaPeticion = function(Op,err){
		var error=(Op.jsonDatos)? Op.jsonDatos:'';
		
		var Existe = error[0].existe;
		if (Existe){
			$('#boxRecuperar form').hide();
			$('#btnReestablecer').html('Listo '+check);
			$('#mensajeReestablecer').html('En breve recibira un correo con los pasos para cambiar su contraseña. <button id="btnRegresar" type="button" class="btn btn-primary" onclick="SalesUp.Login.olvidasteContrasena({e:event, t:this});" style="display:inline-block;padding:6px;"><i class="fa fa-lg fa-arrow-left"></i> Regresar</button>');

		}else{
			$('#boxRecuperar .form-group').addClass('has-error');
			$('#RecuperarPass').focus().keyup(function(){
				$('#boxRecuperar .form-group').removeClass('has-error');
			}).selected;
			$('#btnReestablecer').find('.fa').remove();
		}
	}

	this.definePie = function(){
		var $pie = $('body > .footer');
		$pie.removeAttr('style');
		var alto = $pie.innerHeight();
		var posicion = $pie.position()
		var t = posicion.top;
		var total = alto + t;

		var tw = $(window).height();


		if(tw>total){
		var nt = tw - alto - 40;
		$pie.css('top',nt+'px').css('position','absolute').css('width','100%');
		}
	}
}/*Login*/

var SalesUp = {};
SalesUp.Variables = {};
SalesUp.Sistema = new SistemaDefault();
SalesUp.Valida = new Validaciones();
SalesUp.Construye = new ContructorUi();


$(function(){
	localStorage.removeItem('SysVersion');
	SalesUp.Sistema.versionSistema();
	SalesUp.Login = new Login();
	SalesUp.Login.falloLogin();
	SalesUp.Login.fondoLogin();
	SalesUp.Login.noticias();
	SalesUp.Login.definePie();
	$(window).resize(SalesUp.Login.definePie);
});

