var Tabs;
    function EnviarFormaCorreo(){
        SalesUp.Sistema.MuestraEspera('',4);
        var Pasa = true;
        var configuracion=$('#sinconfiguracion').val();
        
        if (configuracion==0){ 
            setTimeout(function() {
                (Pasa) ? Pasa = (
				  ($('#smtpserver').val()=='smtp.sendgrid.com') || 
				   (SalesUp.Valida.ValidaEmail({Elemento:'#usuario', Email:$('#usuario').val()}))
				  ) : '';
                
                (Pasa) ? Pasa = SalesUp.Valida.ValidaEmail({Elemento:'#respcorreo', Email:$('#respcorreo').val()}) : '';
                
                (Pasa) ? Pasa = SalesUp.Valida.ValidaEmail({Elemento:'#ccocorreo', Email:$('#ccocorreo').val()}) : '';
                
                (Pasa) ? Pasa = SalesUp.Valida.ValidaObligatorios() : '';
                
    
                if(Pasa){
                    //alert('submit - FrmProspectosAvanzado');
                    ValidaASP();

                }else{
                    SalesUp.Sistema.OcultarOverlay();
                }
            }, 300);
        }else{
           ValidaASP();
        }
    }


    function ValidaInbox(){
	  res = false;
      $('.loadPrueba').remove();
	  inboxHabilitado = $("#InboxHabilitado").val();
	  inboxTipo       = $("#INBOX_TIPO").val();
	  if (!inboxHabilitado){
	   setTimeout(function() {
	    $.fallr('hide');
  	    $('#Overlay').remove();
        $('.OverlayInner img').remove();
		$('#Overlay').remove();
		SalesUp.Sistema.OcultarOverlay();
	    res = true;

		document.frmConfigMail.submit();
		}, 200);
		}
	  else
	  if (inboxHabilitado==0)
	    res = true;
	  else{
	    if (inboxHabilitado==1){
             var Tipo = $('#tipomail').val();
             var Servidor = $('#smtpserver').val();
             var SMTP_Usuario = $('#usuario').val();
             var Clave = escape($('#password').val());
			 if (Servidor=="")Servidor = 'xxx.com';
			 
             var Puerto = $('#puertosmtp').val();
             var SSL =  $('#USE_SSL').val();
		}
	    if (inboxHabilitado==2){
             var Tipo = $('#tipomailInbox').val();
             var Servidor = $('#popserver').val();
			 if (Servidor=="")Servidor = 'xxx.com';
			 
             var SMTP_Usuario = $('#usuarioInbox').val();
             var Clave = escape($('#passwordInbox').val());
             var Puerto = $('#puertopop').val();
             var SSL =  $('#INBOX_USA_SSL').val();
		}
		
             $('#ErrorvalidaInbox').fadeOut();      
             //$('#validando').show();
             //SalesUp.Sistema.MuestraEspera('',4);
             $('#BallsLoading').before('<b  class="loadPrueba" style="font-size: 18px; ">Validando correo</b><br />');
             $('.OverlayInner img').remove();
             if (SSL==undefined){var SSL=0;}    
             setTimeout(function() {

                 $.ajaxSetup({ 'beforeSend' : function(xhr) { xhr.overrideMimeType('text/html; charset=iso-8859-1'); } });
                     $.ajax({async:false,   cache: false,   dataType: 'html',
                        url :  'pruebaEmailInbox.dbsp?Tipo='+Tipo+'&Servidor='+Servidor+'&Usuario='+SMTP_Usuario+'&Clave='+Clave+'&Puerto='+Puerto+'&SSL='+SSL,
                        success : function(data) {
                                 if (data==1){
                                    $('#ErrorvalidaInbox').slideUp();
                                    self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:200});
                                    document.frmConfigMail.submit();
                                    $('#validandocorreo').val('1');
                                 }else{
                                   $('#Overlay').remove();
                                   SalesUp.Sistema.OcultarOverlay();
                                   $('#ErrorvalidaInbox').slideDown();
								    $('#InboxErrorMsg').html(data);    
                                   self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:360});
                                   $('#validandocorreo').val('0');
								   $("#ConfiguracionInbox").click();
                                 }
                        },error : function(data){
                                 $('#Overlay').remove();
                                 SalesUp.Sistema.OcultarOverlay();
                                 $('#ErrorvalidaInbox').slideDown();                            
                                 self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:360}); 
                                 $('#validandocorreo').val('0');
                        }
                    });
             }, 200);
		}
		return res;       
	}
    function ValidaASP(){
	     $('.loadPrueba').remove();
         var configuracion=$('#sinconfiguracion').val();
         if (configuracion==0){ 
             $('#Errorvalida').fadeOut();      
             //$('#validando').show();
             //SalesUp.Sistema.MuestraEspera('',4);
             $('#BallsLoading').before('<b class="loadPrueba" style="font-size: 18px; ">Validando correo</b><br />');
             $('.OverlayInner img').remove();
             var Tipo = $('#tipomail').val();
             var Servidor = $('#smtpserver').val();
             var SMTP_Usuario = $('#usuario').val();
             var Clave = escape($('#password').val());
             var Puerto = $('#puertosmtp').val();
             var SSL =  $("input:checked").val();
             if (SSL==undefined){var SSL=0;}    
             setTimeout(function() {

                 $.ajaxSetup({ 'beforeSend' : function(xhr) { xhr.overrideMimeType('text/html; charset=iso-8859-1'); } });
                     $.ajax({async:false,   cache: false,   dataType: 'html',
                        url :  'https://fenix.salesup.com.mx/pruebaemail.asp?Tipo='+Tipo+'&Servidor='+Servidor+'&SMTP_Usuario='+SMTP_Usuario+'&Clave='+Clave+'&Puerto='+Puerto+'&SSL='+SSL,
                        success : function(data) {          
                                 if (data=='1'){
                                    $('#Errorvalida').slideUp();
                                    self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:200});
									if (ValidaInbox())
                                      document.frmConfigMail.submit();
                                    $('#validandocorreo').val('1');
                                 }else{
                                   $('#Overlay').remove();
                                   SalesUp.Sistema.OcultarOverlay();
                                   $('#Errorvalida').slideDown();    
                                   self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:360});
                                   $('#validandocorreo').val('0');
                                 }
                        },error : function(data){
                                 $('#Overlay').remove();
                                 SalesUp.Sistema.OcultarOverlay();
                                 $('#Errorvalida').slideDown();                            
                                 self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:360}); 
                                 $('#validandocorreo').val('0');
                        }
                    });
             }, 200);       
        }else{
           document.frmConfigMail.submit();  
        }              
    }

    $("#btnAceptar").click(function(){
        EnviarFormaCorreo();
    });     
   
    $('#tipomail').change(function(){
        //SalesUp.Sistema.MuestraEspera('',4);
        $('#ErrorvalidaInbox').slideUp();
        $('#Errorvalida').slideUp();
        var opcion=$('#tipomail').val();
		
        if (opcion == -1){
		  $('#usuariom').removeClass("InfoObligatorio");
		  $('#password').removeClass("InfoObligatorio");
        }
		else{
		  $('#usuariom').addClass("InfoObligatorio");
		  $('#password').addClass("InfoObligatorio");
        }     
        if (opcion==1){
            self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:280});
        }     
        if (opcion==0){
            self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:280});
        }
        if ((opcion==2)||(opcion==3)){
            self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:200});
        }
        if (opcion==1){
            $('#Guardado').slideDown();
        }else{
            $('#Guardado').slideUp();
        }
        //setTimeout(function() {SalesUp.Sistema.OcultarOverlay()}, 500);
    });

    $('#tipomailInbox').change(function(){
        //SalesUp.Sistema.MuestraEspera('',4);
        $('#ErrorvalidaInbox').slideUp();
        var opcion=$('#tipomailInbox').val();
        if (opcion==1){
            self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:290});
        }     
        if (opcion==0){
            self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:290});
        }
        if ((opcion==2)||(opcion==3)){
            self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:220});
        }
        if (opcion==1){
            $('#GuardadoInbox').slideDown();
        }else{
            $('#GuardadoInbox').slideUp();
        }
                if(opcion==0)
                   $('#DejaCopia').show("slow");
				 else
                   $('#DejaCopia').hide("slow");
				   														 
        //setTimeout(function() {SalesUp.Sistema.OcultarOverlay()}, 500);
    });

    function ValoresInicialesCorreo(){
       if($('#SinConfigI').is(':checked')){
          $('#sinconfiguracion').val(1);
       }else{
          $('#sinconfiguracion').val(0)
       }            
        
        if($('#tabselected').val()==0){
            if($('#sinconfiguracion').val()==0){
                var opcion=$('#tipomail').val();     
                $('#todo').show();     
                if(opcion==0){
                         self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:280});   
                         $('#servers').slideDown("slow");
                }else{
                     if(opcion==1){
                          self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:280});
                          $('#servers').slideUp("slow");
                     }else{
                        self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:200});
                         if(opcion==2){
                           $('#servers').slideDown("slow");
                         }else{                             
                           $('#servers').slideUp("slow");
                         }
                     }
                }  
		      var opcion=$('#tipomailInbox').val();
			    if(opcion==0)
                   $('#DejaCopia').show("slow");
				 else
                   $('#DejaCopia').hide("slow"); 
   
    
                $('.sinconfigurar').removeAttr('disabled');
                $('#sinconfiguracion').val(0);
                $('#MesajeSinCongig').hide();
                
            }else{
                $('.sinconfigurar').attr('disabled','disabled');
                $('#sinconfiguracion').val(1);
                $('#todo').hide();
                $('#MesajeSinCongig').show();
                self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:130});                
            }
            
        }else{
					   
            if($('#sinconfiguracion').val()==0){
                $('.sinconfigurar').removeAttr('disabled');
                $('#sinconfiguracion').val(0);
                $('#MesajeSinCongig').hide();
                $('#todo').show();
                self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:370});
            }else{
			   
                $('.sinconfigurar').attr('disabled','disabled');
                $('#sinconfiguracion').val(1);
                $('#todo').hide();
                $('#MesajeSinCongig').show();
                self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:130});                
            }    
        }
    }
    
var EnviarForma = function(){$('#frmEliminaConfigMail').submit();}    
    
    function IniciaPantallaMail(){
        $('#Errorvalida').slideUp();
        $('#ErrorvalidaInbox').slideUp();
        var opcion=$('#tipomail').val();
            if(opcion==0){
                     $('#servers').slideDown("slow");
                    }else{
                        if(opcion==1){
                            $('#servers').slideUp("slow");
                        }else{
                            if(opcion==2){
                                $('#servers').slideUp("slow");
                            }else{
                                $('#servers').slideUp("slow");
                            }
                        }
                    }  

        if (opcion==1){
            self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:280});
        }     
        if (opcion==0){
            self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:280});
        }
        if ((opcion==2)||(opcion==3)){
            self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:200});
        }
        if (opcion==1){
            $('#Guardado').slideDown();
        }else{
            $('#Guardado').slideUp();
        }    
        
        var opcion=$('#tipomailInbox').val();
            if(opcion==0){
                     $('#serversInbox').slideDown("slow");
                    }else{
                        if(opcion==1){
                            $('#serversInbox').slideUp("slow");
                        }else{
                            if(opcion==2){
                                $('#serversInbox').slideUp("slow");
                            }else{
                                $('#serversInbox').slideUp("slow");
                            }
                        }
                    }  
                  
        if (opcion==1){
            self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:280});
        }     
        if (opcion==0){
            self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:280});
        }
        if ((opcion==2)||(opcion==3)){
            self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:200});
        }
        if (opcion==1){
            $('#GuardadoInbox').slideDown();
        }else{
            $('#GuardadoInbox').slideUp();
        }    
             
    }
    
$(function(){
	  $('#GuardadoInbox').hide();
	      $('#BtnEliminarConfigEmail').click(function(){
               /*if (confirm("Se eliminara tu confirugación actual de correo.¿Desea continuar?")) {
                  $('#frmEliminaConfigMail').submit();
                }*/
                
                SalesUp.Construye.MuestraAlerta({TipoAlerta:'ElegantPregunta', Alerta:'Se eliminara tu configuración actual de correo.¿Desea continuar?',OnClick:EnviarForma});
           });
 
            Tabs = $( "#Tabs" ).tabs();    
            ActivaTinyFirma();           
            $('#mensaje').fadeOut();
           ValoresInicialesCorreo(); 
           
             
             IniciaPantallaMail();
            $('#tipomail').change(function(){
                $('#mensaje').fadeOut();
                var opcion=$('#tipomail').val();
                if(opcion==0){
                 $('#servers').slideDown("slow");
                }else{
                    if(opcion==1){
                        $('#servers').slideUp("slow");
                    }else{
                        if(opcion==2){
                            $('#servers').slideUp("slow");
                        }else{
                            $('#servers').slideUp("slow");
                        }
                    }
                }
             });
            $('#tipomailInbox').change(function(){
                $('#mensajeInbox').fadeOut();
                var opcion=$('#tipomailInbox').val();

                if((opcion==0)||(opcion==4)){
                 $('#serversInbox').slideDown("slow");
                }else{
                    if(opcion==1){
                        $('#serversInbox').slideUp("slow");
                    }else{
                        if(opcion==2){
                            $('#serversInbox').slideUp("slow");
                        }else{
                            $('#serversInbox').slideUp("slow");
                        }
                    }
                }

                if(opcion==0)
                   $('#DejaCopia').show("slow");
				 else
                   $('#DejaCopia').hide("slow");

             });
             
             $('#ConfiguracionURL').click(function(){
                 $('#tabselected').val(0);
                 var opcion=$('#tipomail').val();
                    if (opcion==1){
                        self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:280});
                    }     
                    if (opcion==0){
                        self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:280});
                    }
                    if ((opcion==2)||(opcion==3)){
                        self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:200});
                    }
              });
                     
             $('#ConfiguracionInbox').click(function(){
                 $('#tabselected').val(2);
                 var opcion=$('#tipomailInbox').val();
                    if (opcion==1){
                        self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:280});
                    }     
                    if ((opcion==0)||(opcion==4)){
                        self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:280});
                    }
                    if ((opcion==2)||(opcion==3)){
                        self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:200});
                    }
					if(opcion==0)
                      $('#DejaCopia').show("slow");
				    else
                     $('#DejaCopia').hide("slow");
              });

             $('#OpcionesURL').click(function(){
                    $('#tabselected').val(2);
                    self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:370});
              });
              
              $('#SinConfigI').click(function(){
                  ValoresInicialesCorreo();                 
              })
                             
       var cuales=$('#tipomail').val();
      if (cuales==1){
        $('#Guardado').show();
      }else{
      $('#Guardado').hide();
      } 
       var cuales=$('#tipomailInbox').val();
      if (cuales==1){
        $('#GuardadoInbox').show();
      }else{
      $('#GuardadoInbox').hide();
      }

   $('#InboxHabilitado').change(function(){
        var habilitado=$('#InboxHabilitado').val();
		if  (habilitado<=1)
		   $('#ConfigInbox').hide();
		else{
		   $('#ConfigInbox').show();
		   $('#tipomailInbox').change()
        }            
    });
    $('#DejaCopia').hide("slow");
	$('#InboxHabilitado').change();
	$('#tipomailInbox').change();
	SalesUp.Sistema.ModulosActivos();
}); /* /Ready */



