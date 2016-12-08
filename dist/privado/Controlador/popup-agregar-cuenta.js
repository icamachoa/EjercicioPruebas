var token;
  var CLIENT_ID = '143413260776-8vdj8lqoo39i698ortrv6atjg0pnglq5';
  var TOKEN ; 
  var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly','https://www.googleapis.com/auth/gmail.compose', 'https://mail.google.com/', 'https://www.googleapis.com/auth/userinfo.email','https://www.googleapis.com/auth/userinfo.profile'];
  
 var options = {
          'client_id': CLIENT_ID,
          'scope': SCOPES,
          'redirect_uri':"https://fenix.salesup.com.mx/gmail/oauth2callback/index.php",
          'state':SalesUp.Variables.Idusuario,
          'offline':'true',
          'access_type':'offline',
          'approval_prompt':'force',
          'response_type':"code",
          'immediate': false
        };
      /**
       * Check if current user has authorized this application.
       */
       function checkAuth() {
         
         var token1 = gapi.auth.setToken({
          access_token: TOKEN
        });
         
         setTimeout(function(){
         var authorizeDiv = document.getElementById('authorize-div');
         authorizeDiv.style.display = 'inline';
		 
        },1000)

}


      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
       function GuardaToken(){
        var Datos = 'body='+JSON.stringify(token);
        
        if (token)
          SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/qryGuardaToken.dbsp', parametros:Datos});
      }
      function handleAuthResult(authResult) {
        
        tmp_token = authResult.code;
        token = gapi.auth.getToken(function(error, res){
          console.log("TK gmail: "+token, error, res);
         });

        //GuardaToken(token)
        
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          loadGmailApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
       SalesUp.Variables.RevisaToken = function(respuesta,error){
          if(!error){
              var token = respuesta.jsonDatos[0];
              

              if ((token.TOKEN) &&(token.TOKEN != '')){
			    
                self.parent.SalesUp.Variables.GuardaCuenta();
              }
          }
       };

       function handleAuthClickHotmail(event) {
	     var url = 'https://login.live.com/oauth20_authorize.srf?client_id=0000000040189F6F&scope=wl.signin,wl.basic,wl.offline_access,wl.emails,wl.calendars_update,wl.events_create,wl.imap,wl.phone_numbers,wl.calendars&state='+SalesUp.Variables.Idusuario+'&response_type=code&redirect_uri=https://fenix.salesup.com.mx/callback/live';
		 window.open(url, 'Hotmail', 'height=600,width=450');
          setInterval(function(){
            SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/qryRevisaTokenGmail.dbsp',callback:SalesUp.Variables.RevisaToken});
          }, 1000);
          
//          gapi.auth.authorize(options,
          //{client_id: CLIENT_ID, scope: SCOPES, immediate: false,'offline':true, 'access_type':'offline', 'response_type':'code'},
//          handleAuthResult);
          return false;
       }

       function handleAuthClick(event) {
          
          setInterval(function(){
            SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/qryRevisaTokenGmail.dbsp',callback:SalesUp.Variables.RevisaToken});
          }, 1000);
          
          gapi.auth.authorize(options,
          //{client_id: CLIENT_ID, scope: SCOPES, immediate: false,'offline':true, 'access_type':'offline', 'response_type':'code'},
          handleAuthResult);
          return false;
       }

      /**
       * Load Gmail API client library. List labels once client library
       * is loaded.
       */
       function getEmailCallback(data) {
         console.log(data)
       }
       function loadGmailApi() {
        
        gapi.client.load('gmail', 'v1', listProfile);
      }

      /**
       * Print all Labels in the authorized user's inbox. If no labels
       * are found an appropriate message is printed.
       */
       function actualizaConectado(email) {
           
           res = "";
           if (email!='') res+= "("+email+")";
           else res += '<span id="ligadoGoogle"><i class="fa fa-check" style="font-size: 13px;"></i> Vinculado con Google</span>'
          document.getElementById('output').innerHTML = res;

        SalesUp.Variables.RevisaToken({"jsonDatos":[{TOKEN:'Configurado'}]},null);
     }

     function listLabels() {
      var request = gapi.client.gmail.users.labels.list({
        'userId': 'me'
      });

      request.execute(function(resp) {
        var labels = resp.labels;
        appendPre('Labels:');

        if (labels && labels.length > 0) {
          for (i = 0; i < labels.length; i++) {
            var label = labels[i];
            appendPre(label.name)
          }
        } else {
          appendPre('No Labels found.');
        }
      });
    }

      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */
       function appendPre(message) {
        var pre = document.getElementById('output');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }

SalesUp.Variables.CambiaPredeterminado = function(obj){
    var $check      = $(obj.elemento);
    var isChecked   = $check.is(':checked');
    
    if(isChecked){
        $check.val(1);
    }else{
        $check.val(0);
    }
};

SalesUp.Variables.CambiaConfiguracion = function(){
    var valorProveedor          = $('#proveedor').val();
    var tipoCuenta              = $('#TipoCuenta').val();
    var templateConfigCuenta    = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateConfigCorreo.dbsp',Parametros:'proveedor='+valorProveedor+'&tipo='+tipoCuenta});

    
    if(valorProveedor > 0 && (valorProveedor != 33 && valorProveedor != 1 && valorProveedor != 4)){
        $('.BodyModal.BoxSizing').css('height','130px');
    }else if(valorProveedor == 0 && tipoCuenta == 3){
        $('.BodyModal.BoxSizing').css('height','190px');
    }else if(valorProveedor == 4 && tipoCuenta == 3){
        $('.BodyModal.BoxSizing').css('height','190px');
    }else if(valorProveedor == 1){
        $('.BodyModal.BoxSizing').css('height','90px');
    }else if(valorProveedor == 33){
        $('.BodyModal.BoxSizing').css('height','90px');
    }else{
        $('.BodyModal.BoxSizing').css('height','160px');
    }

    if(valorProveedor == 1){
        $('#BtnAceptar').hide();
        $('#googleAuth').show();
        $('#HotmailAuth').hide();
    }else{
      if(valorProveedor == 33){
        $('#BtnAceptar').hide();
        $('#HotmailAuth').show();
        $('#googleAuth').hide();
      }else{
        $('#googleAuth').hide();
        $('#HotmailAuth').hide();
        $('#BtnAceptar').show();
    }
	 }

    $('#datosConfig').html(templateConfigCuenta);

    $('#usuario').focus();
};

SalesUp.Variables.CargaOpcionesProveedor = function(){
    //var obj = SalesUp.Variables.VerificaCuenta();

    $('#proveedor').html('');

    var tipoCuenta      = $('#TipoCuenta').val();
    var arrayProveedores= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryObtieneProveedoresCorreo.dbsp',Parametros:'nuevo=1&tipo='+tipoCuenta,DataType:'json'}).jsonDatos;

    for (var i = 0; i < arrayProveedores.length; i++) {
        var opcionActual = arrayProveedores[i];
		if (opcionActual.IDPROVEEDOR!=2)
          $('#proveedor').append('<option value="'+opcionActual.IDPROVEEDOR+'">'+opcionActual.PROVEEDOR+'</option>');
    };

    var valorProveedor = $('#proveedor').val();

    if(tipoCuenta == 3 && valorProveedor == 0){
        $('.BodyModal.BoxSizing').css('height','168px');
    }else if((tipoCuenta == 1 | tipoCuenta == 2) && valorProveedor == 0){
        $('.BodyModal.BoxSizing').css('height','150px');
    }else{
        $('.BodyModal.BoxSizing').css('height','115px');
    }

    SalesUp.Variables.CambiaConfiguracion();

    /*if(obj.existe){
        SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'#popup-contenedor', Id:'Error', Msg:obj.msj});
    }*/
};

SalesUp.Variables.VerificaCuenta = function(){
    var tipoCuenta  = $('#TipoCuenta').val();
    var bandera     = false;
    var msj         = '';
    var respuesta   = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryObtieneTotalCuentas.dbsp',Parametros:'tipocuenta='+tipoCuenta,DataType:'json'}).jsonDatos[0].TOTAL;

    if(respuesta > 0){
        bandera = true;
        msj     = 'Ya existe una configuración de entrada y/o salida.';
    }

    return {existe:bandera,msj:msj};
};

SalesUp.Variables.GuardaCuenta = function(){
    var tipoCuenta  = $('#TipoCuenta').val();
    var proveedor   = $('#proveedor').val();
    //var obj     = SalesUp.Variables.VerificaCuenta();
    var Pasa    = false;

    /*if(obj.existe){
        SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'#popup-contenedor', Id:'Error', Msg:obj.msj});
    }else{*/
        Pasa = SalesUp.Valida.ValidaObligatorios({DestinoMsj:'#popup-contenedor'});

        //(Pasa) ? Pasa = SalesUp.Valida.ValidaEmail({Elemento:'#usuario', Email:$('#usuario').val()}) : Pasa;

        if(Pasa){
            SalesUp.Construye.ActivaEsperaGuardando();
            SalesUp.Variables.popupActual.find('.MensajeGuardando').html('<i class="icoGuarando fa fa-lg fa-spinner fa-spin"></i>Validando correo');

            if ((proveedor == 1) || (proveedor == 33)){
                //var qryString = SalesUp.Sistema.qryString({Formulario:$('#frmCuentasCorreos')});
                //SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/popup-agregar-cuenta-guarda.dbsp',Parametros:qryString});
                var OptionesAjaxForm = { 
                   beforeSend: function(){
                    //Nota: hacer algo antes de mandar
                   },uploadProgress: function(event, position, total, percentComplete){
                    //Nota: Hacer algo mientras se sube
                   },success: function(){
                    //Nota: Hacer algo cuando termina independientemente de bueno o malo
                   },complete: function(response){
                      SalesUp.Variables.popupActual.find('.MensajeGuardando').addClass('Verde').html('Guardado <i class="icoGuarando fa fa-lg fa-check"></i>');
                      SalesUp.Sistema.Almacenamiento({a:'sincronizaCorreo',v:1});
                      SalesUp.Construye.CierraPopUp({t:$('#frmCuentasCorreos')});
                      
                      if(tipoCuenta == 1){
                        SalesUp.Sistema.Relogin({ir:'cuentas_correo.dbsp'});
                      }else{
                        SalesUp.Sistema.Relogin({ir:'inbox.dbsp'});
                      }
                   },error: function(){ }
                }; 

                $("#frmCuentasCorreos").ajaxForm(OptionesAjaxForm);   
                $("#frmCuentasCorreos").submit();
            }else if((tipoCuenta == 1 || tipoCuenta == 3) && proveedor != 1&& proveedor != 33){
                SalesUp.Variables.ValidaSMTP();
            }else if(tipoCuenta == 2 && proveedor != 1){
                SalesUp.Variables.ValidaPOP();
            }
        }
    //}
};

SalesUp.Variables.ValidaSMTP = function(){
    var Tipo        = $('#proveedor').val();
    var TipoCuenta  = $('#TipoCuenta').val();
    var Servidor    = $('#servidorSMTP').val();
    var SMTP_Usuario= $('#usuario').val();
    var Clave       = encodeURIComponent($('#contrasenia').val());
    var Puerto      = $('#puertoSMTP').val();
    var SSL         =  $("#seguridadSMTP").val();
    
    if (SSL==undefined){
        var SSL=0;
    }
    
    setTimeout(function() {
         
         $.ajaxSetup({ 'beforeSend' : function(xhr) { xhr.overrideMimeType('text/html; charset=iso-8859-1'); } });
             $.ajax({async:false,   cache: false,   dataType: 'html',
                url :  'pruebaMailSender.dbsp?Tipo='+Tipo+'&Servidor='+Servidor+'&Usuario='+SMTP_Usuario+'&Clave='+Clave+'&Puerto='+Puerto+'&SSL='+SSL,
                success : function(data) {
                         if (data==1){
                            if(TipoCuenta == 3){
                                SalesUp.Variables.ValidaPOP();
                            }else{
                                //var qryString = SalesUp.Sistema.qryString({Formulario:$('#frmCuentasCorreos')});
                                var OptionesAjaxForm = { 
                                 beforeSend: function(){
                                  //Nota: hacer algo antes de mandar
                                 },uploadProgress: function(event, position, total, percentComplete){
                                  //Nota: Hacer algo mientras se sube
                                 },success: function(){
                                  //Nota: Hacer algo cuando termina independientemente de bueno o malo
                                 },complete: function(response){
                                    //SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/popup-agregar-cuenta-guarda.dbsp',Parametros:qryString});
                                    SalesUp.Variables.popupActual.find('.MensajeGuardando').addClass('Verde').html('Guardado <i class="icoGuarando fa fa-lg fa-check"></i>');
                                    SalesUp.Construye.CierraPopUp({t:$('#frmCuentasCorreos')});
                                    SalesUp.Sistema.Relogin({ir:'cuentas_correo.dbsp'});
                                 },error: function(){ }
                              }; 

                              $("#frmCuentasCorreos").ajaxForm(OptionesAjaxForm);   
                              $("#frmCuentasCorreos").submit();
                            }

                         }else{
                            SalesUp.Construye.QuitaEsperaGuardando();
                            SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'#popup-contenedor', Id:'Error', Msg:'Ha habido un error en la configuración por favor verifique sus datos.'});
                         }
                },error : function(data){
                    SalesUp.Construye.QuitaEsperaGuardando();
                    SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'#popup-contenedor', Id:'Error', Msg:'Ha habido un error en la configuración por favor verifique sus datos.'});
                }
            });
     }, 200);
};

SalesUp.Variables.ValidaPOP = function(){
    var Tipo        = $('#proveedor').val();
    var Servidor    = $('#servidorPOP').val();
    var SMTP_Usuario= $('#usuario').val();
    var Clave       = encodeURIComponent($('#contrasenia').val());
    var Puerto      = $('#puertoPOP').val();
    var SSL         =  $("#seguridadPOP").val();
    
    if (SSL==undefined){
        var SSL=0;
    }
    
    setTimeout(function() {
         $.ajaxSetup({ 'beforeSend' : function(xhr) { xhr.overrideMimeType('text/html; charset=iso-8859-1'); } });
             $.ajax({async:false,   cache: false,   dataType: 'html',
                url :  'pruebaEmailInbox.dbsp?Tipo='+Tipo+'&Servidor='+Servidor+'&Usuario='+SMTP_Usuario+'&Clave='+Clave+'&Puerto='+Puerto+'&SSL='+SSL,
                success : function(data) {
                         if (data==1){
                            var OptionesAjaxForm = { 
                                 beforeSend: function(){},
                                 uploadProgress: function(event, position, total, percentComplete){},
                                 success: function(){},
                                 complete: function(response){
                                    SalesUp.Variables.popupActual.find('.MensajeGuardando').addClass('Verde').html('Guardado <i class="icoGuarando fa fa-lg fa-check"></i>');
                                    
                                    SalesUp.Sistema.Almacenamiento({a:'sincronizaCorreo',v:1});
                                    SalesUp.Construye.CierraPopUp({t:$('#frmCuentasCorreos')});
                                    SalesUp.Sistema.Relogin({ir:'inbox.dbsp'});
                                 },error: function(){ }
                              }; 

                              $("#frmCuentasCorreos").ajaxForm(OptionesAjaxForm);   
                              $("#frmCuentasCorreos").submit();
                         }else{
                            SalesUp.Construye.QuitaEsperaGuardando();
                            SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'#popup-contenedor', Id:'Error', Msg:'Ha habido un error en la configuración por favor verifique sus datos.'});
                         }
                },error : function(data){
                    SalesUp.Construye.QuitaEsperaGuardando();
                    SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'#popup-contenedor', Id:'Error', Msg:'Ha habido un error en la configuración por favor verifique sus datos.'});
                }
            });
     }, 200);
};

SalesUp.Variables.CargaDatosCuenta = function(_idusuariocorreo){
  $('#frmCuentasCorreos').attr('action','/privado/Modelo/popup-editar-cuenta-guarda.dbsp')
   var objDatosCorreo = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosCorreo.dbsp',Parametros:'idusuariocorreo='+_idusuariocorreo,DataType:'json'}).jsonDatos[0];

     $('#TipoCuenta').val(objDatosCorreo.TIPO_CUENTA);
     SalesUp.Variables.CargaOpcionesProveedor();

     $('#proveedor').val(objDatosCorreo.PROVEEDOR);
     SalesUp.Variables.CambiaConfiguracion();

     $('#TipoCuenta').attr('disabled','disabled');
     $('#proveedor').attr('disabled','disabled');

     if(objDatosCorreo.TIPO_CUENTA == 1){
        $('#usuario').val(objDatosCorreo.SMTP_USERNAME);
        $('#servidorSMTP').val(objDatosCorreo.SMTP_HOST);
        $('#puertoSMTP').val(objDatosCorreo.SMTP_PORT);
        $('#seguridadSMTP').val(objDatosCorreo.USE_SSL);
        $('#contrasenia').val(objDatosCorreo.SMTP_PASS).removeClass('InfoObligatorio').parent().removeClass('w50').hide();
        $('#usuario').parent().removeClass('w50').addClass('w100');
     }else if(objDatosCorreo.TIPO_CUENTA == 2){
        $('#usuario').val(objDatosCorreo.POP3_USERNAME);
        $('#servidorPOP').val(objDatosCorreo.POP3_HOST);
        $('#puertoPOP').val(objDatosCorreo.POP3_PORT);
        $('#seguridadPOP').val(objDatosCorreo.INBOX_USA_SSL);
        $('#contrasenia').val(objDatosCorreo.POP3_PASS).removeClass('InfoObligatorio').parent().removeClass('w50').hide();
        $('#usuario').parent().removeClass('w50').addClass('w100');
     }else if(objDatosCorreo.TIPO_CUENTA == 3){
        $('#usuario').val(objDatosCorreo.POP3_USERNAME);
        $('#servidorPOP').val(objDatosCorreo.POP3_HOST);
        $('#puertoPOP').val(objDatosCorreo.POP3_PORT);
        $('#seguridadPOP').val(objDatosCorreo.INBOX_USA_SSL);
        $('#servidorSMTP').val(objDatosCorreo.SMTP_HOST);
        $('#puertoSMTP').val(objDatosCorreo.SMTP_PORT);
        $('#seguridadSMTP').val(objDatosCorreo.USE_SSL);
        $('#contrasenia').val(objDatosCorreo.POP3_PASS).removeClass('InfoObligatorio').parent().removeClass('w50').hide();
        $('#usuario').parent().removeClass('w50').addClass('w100');
     }
     
     $('.BoxBotonesAccion').prepend('<button type="button" id="BtnContrasenia" class="Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar btnNeutral" style="float:left;" onclick="SalesUp.Variables.CambiarContrasenia('+objDatosCorreo.TIPO_CUENTA+');"><i class="fa fa-check"></i> Modificar contraseña</button>');
};

SalesUp.Variables.CambiarContrasenia = function(_tipoCuenta){
  $('#usuario').parent().removeClass('w100').addClass('w50');
  $('#contrasenia').addClass('InfoObligatorio').parent().addClass('w50').show();
};

(function(){
    SalesUp.Sistema.ModulosActivos();

    if(!SalesUp.Sistema.EstaActivoModulo({Modulo:11})){
      $('#TipoCuenta').val(1);
    }else{
      $('#TipoCuenta').val(3);
    }
    
    if(SalesUp.Variables.IdusuarioCorreo > 0){
        SalesUp.Variables.CargaDatosCuenta(SalesUp.Variables.IdusuarioCorreo);
        $('#TituloModal').html('Editar cuenta');
    }else{
        SalesUp.Variables.CargaOpcionesProveedor();
    }
})();
