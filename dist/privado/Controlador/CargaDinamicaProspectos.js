
function ProspectoDatos(){
  var $titDiv = $('#hiTituloDatos');
  $titDiv.append(' <i class="fa fa-spinner fa-spin"></i>');
  SalesUp.Variables.visualizar();
  $titDiv.find('.fa-spin').remove();
}

function ProspectoDatos1(){
  var $titDiv = $('#hiTituloDatos');
  $titDiv.append(' <i class="fa fa-spinner fa-spin"></i>');
  
  SalesUp.Variables.visualizar();
  GetDataP_Seguimiento();
  ProspectoPendientes();

  ActivaClicks();
  $titDiv.find('.fa-spin').remove();
}/*ProspectoDatos1*/

function ProspectoPendientes(){
  var $titDiv = $('#prospecto-pendientes').find('.TitDiv h1');
  $titDiv.append(' <i class="fa fa-spinner fa-spin"></i>');

  var procesaCarga = function(html, err){
    $('#prospecto-pendientes').html(html);
    SalesUp.Sistema.IniciaPlugins();
  }
  
  SalesUp.Sistema.CargaDatosAsync({link:'/privado/ajax/prospectos-pendientes.dbsp', parametros:'tkp='+SalesUp.Variables.tkp+'&idprospecto='+SalesUp.Variables.idp, callback:procesaCarga, dataType:'html'});
}/*ProspectoPendientes*/

function GetDataP_Seguimiento(){
  var $titDiv = $('#titSeguimientoProspectos').find('h1');
  $titDiv.append(' <i class="fa fa-spinner fa-spin"></i>');

  var procesaCarga = function(html, err){
    $('#pr-datos-seguimiento').html(html);
    $titDiv.find('.fa-spin').remove();
    SalesUp.Sistema.IniciaPlugins();
  }
  
  SalesUp.Sistema.CargaDatosAsync({link:'/privado/ajax/prospectos-seguimiento.dbsp', parametros:'tkp='+SalesUp.Variables.tkp+'&idprospecto='+SalesUp.Variables.idp, callback:procesaCarga, dataType:'html'});
  ProspectoPendientes();
  
}/*GetDataP_Seguimiento*/


function ProspectoOportunidad(){
	var $titDiv = $('#prospecto-oportunidades').find('.TitDiv h1');
  $titDiv.append(' <i class="fa fa-spinner fa-spin"></i>');

  var procesaCarga = function(html, err){
    $('#prospecto-oportunidades').html(html);
    SalesUp.Sistema.IniciaPlugins();
  }
  
  SalesUp.Sistema.CargaDatosAsync({link:'/privado/ajax/prospectos-oportunidades.dbsp', parametros:'tkp='+SalesUp.Variables.tkp+'&idprospecto='+SalesUp.Variables.idp, callback:procesaCarga, dataType:'html'});
}/*ProspectoOportunidad*/


function ProspectoFecharecordar(){
  var $titDiv = $('#prospecto-recordatorios').find('.TitDiv h1');
  $titDiv.append(' <i class="fa fa-spinner fa-spin"></i>');

  var procesaCarga = function(html, err){
    $('#prospecto-recordatorios').html(html);
    SalesUp.Sistema.IniciaPlugins();
  }
  
  SalesUp.Sistema.CargaDatosAsync({link:'/privado/ajax/prospectos-fechas.dbsp', parametros:'tkp='+SalesUp.Variables.tkp+'&idprospecto='+SalesUp.Variables.idp, callback:procesaCarga, dataType:'html'});
}/*ProspectoFecharecordar*/


function Recarga() {
  $('#retro_visual').addClass ('msg-cargando');
  window.location.reload()
}

function RecargaTablas() {
  ProspectoDatos1();	 GetDataP_Seguimiento(); ProspectoOportunidad(); 
  	ProspectoFecharecordar();
    ProspectoPendientes();
}


function CorreoEnviadoVisualizar (){
	GetDataP_Seguimiento();
}

var idprospecto = "";
function ActivaClicks(){
  return 'ActivaClicks';
  /* Realiza la accion de reactivar del elemento seleccionado*/
  $('.reactivar').click(function() {
    var id = $(this).attr('rel');
    $('#resultado').load('/privado/ajax/prospecto_reactivar_guarda.dbsp?tkp='+SalesUp.Variables.tkp+'&aIdprospecto=' + id, function() { RecargaTablas();  });
  });

  /* Realiza la accion de restablecer del elemento seleccionado*/
  $('.reestablecer').click(function() {
    var id = $(this).attr('rel');
    $('#resultado').load(SalesUp.Variables.restablecerProspecto+'&tkp='+SalesUp.Variables.tkp+'&Idprospecto=' + id, function() {Recarga();})
  });

  $(".reclamar").click(function(){
     idprospecto=$(this).attr('rel');
     alertaprevisualizar[reclamarProspecto].apply(this,[this]);
  }); 
}/*ActivaClicks*/
	
function ReactivarProspecto(id){
  $('#resultado').load('/privado/ajax/prospecto_reactivar_guarda.dbsp?tkp='+SalesUp.Variables.tkp+'&aIdprospecto=' + id, function() { RecargaTablas();  });
}		

function ReestablecerProspecto(id){
  $('#resultado').load(SalesUp.Variables.restablecerProspecto+'&tkp='+SalesUp.Variables.tkp+'&Idprospecto=' + id, function() {Recarga();});
}

function ReclamarProspecto(id){
  idprospecto=id;
  alertaprevisualizar[reclamarProspecto].apply(this,[this]);
}


var reclamarProspecto='reclamarProspecto';
var compartido='compartir';
var vercorreo = "vercorreo";    
var alertaprevisualizar = '';



alertaprevisualizar = {
        reclamarProspecto : function(){
           $.fallr('show', {
             buttons : {
                 button2 : {text: 'Si', danger:true, onclick: Reclamo},
                button3 : {text: 'No'}
            },
              content : '<p>¿Estás seguro de reclamar el prospecto?</p>',
                position: 'center',
                closeKey : true,
                icon    : 'warning'
      });
    },
    compartir: function(){
    $.fallr('show', {
      content : '<p><b>­Este prospecto ha sido compartido!</b></p>',
      width : '400px',
      height: '150px',
      autoclose : 3000,
      icon : 'info',
      closeKey : true,
      position: 'center'
      });
    },
    vercorreo : function(){
			$.fallr('show', {
                  buttons : {
                      
                      button2 : {text: 'Cerrar'}
                      
                  },
                  content : correo,
                   position: 'center',
                   closeKey : true,
                   width   : 790,
				   height  : 500
              });
			}
};//fin Alert	
	
	

     
     function Reclamo(){
         $.fallr('hide');
         $.post(SalesUp.Variables.reclamarProspecto+'&tkp='+SalesUp.Variables.tkp+'&Idprospecto='+idprospecto, function() {Recarga();})
     };
 
function Compartido(){
	alertaprevisualizar[compartido].apply(this,[this]);
}

  		var idemail = '';
  		var correo = '';

  	$(document).ready(function(){


	
  		$(".email").live('click',function(){
  				idemail = $(this).attr("id");
  				$("#resultado").html(" ");
  				

  				SalesUp.Construye.MuestraAlerta({
		          TipoAlerta:'AlertaModal',
		          Alerta: '<iframe class="w100" src="/privado/CorreoEnviado.dbsp?idemail='+idemail+'"></iframe>',
		          Titulo:'Correo enviado.',
		          BotonOk:'Cerrar',
		          Alto:'400px',
		          Ancho:'900px'
		        });
		        
  		}); /* /$(".email") */
  	});
  	
  	
  	function Reenviar(){
  		$.fallr('hide');
      $.post(SalesUp.Variables.linkReenviarCorreo+'&idemail=' + idemail, function() { });
  	}
  	
  	
  	function invi (op){
			if (op == 1) {
				$(".mceToolbar").addClass('invisible');
			}else{
				 $.fallr('hide');
				 $(".mceToolbar").removeClass('invisible');
			}
		} 

SalesUp.Variables.AlertaReactivaCorreosProspecto = function(Op){
  var correo = Op.correo;
  var ejecutivo = Op.ejecutivo;
  var idusr = Op.usuario;
  SalesUp.Construye.MuestraAlerta({
      TipoAlerta:'AlertaPregunta',
      Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> ¿Estás seguro de reactivar el envio de correos automáticos al prospecto?',
      Boton1:'Si, reactivar',
      Boton2:'Cancelar',
      Callback1: 'SalesUp.Variables.ProspectoReactivaCorreos({correo:\''+correo+'\', ejecutivo:\''+ejecutivo+'\', usuario:\''+idusr+'\'})',
      Icono1:'<i class="fa fa-check"></i>',
      Icono2:'<i class="fa fa-times"></i>',
      Ancho:'500px'
    });
}

SalesUp.Variables.ProspectoReactivaCorreos = function(Op){
   var validaReactivacion = function(){
    ProspectoDatos1();
  }
  SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/reactivaCorreosProspectos.dbsp',parametros:'tkp='+SalesUp.Variables.tkp+'',callback:validaReactivacion});
}


SalesUp.Variables.archivarProspecto = function(Op){
  var tkp = Op.tkp, bandera = Op.b;
  var mensaje = '<i class="fa fa-lg fa-folder"></i> Prospecto archivado.';
  if (bandera==2){mensaje = '<i class="fa fa-lg fa-folder-open"></i> Prospecto reactivado.';}
  SalesUp.Sistema.PostData({Link:'/privado/archivar_compartido.dbsp', Parametros:'tkp='+tkp+'&bandera='+bandera });
  RecargaTablas();
  setTimeout(function(){SalesUp.Construye.MuestraNotificacion({Mensaje:mensaje});}, 500);
}

SalesUp.Variables.reestablecerProspecto = function(Op){
  var tkp = Op.tkp;
  SalesUp.Sistema.PostData({Link:'/privado/ajax/jx-ReestablerProspecto.dbsp', Parametros:'tkp='+tkp });
  RecargaTablas();
  setTimeout(function(){SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-check-circle-o"></i> Prospecto reestablecido.'});}, 500);
}


SalesUp.Variables.reclamarProspecto = function(Op){
  var tkp = Op.tkp;

  var Programar = '';
  Programar += '<form class="w100" id="frmReclamarProspecto">';
  Programar += '  <br><p class="w100">¿Estás seguro de reclamar el prospecto?</p>';
  
  Programar += '  <div class="clear"></div></form><div class="clear"></div>';
  
  SalesUp.Construye.MuestraAlerta({
    TipoAlerta:'AlertaPregunta', Ancho:'40%', 
    Id:'alertaReclamarProspecto',
    Alerta: Programar
  });

  var $PieModal = $('#alertaReclamarProspecto .PieModal');
  var  botones = '<span class="btnNegativo Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Cancelar" onclick="SalesUp.Construye.CierraAlerta({Elemento:this});"><i class="fa fa-times"></i> No</span>';
      botones += '<span class="btnAccion Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" onclick="SalesUp.Variables.activaReclamarProspecto({t:this, tkp:\''+tkp+'\'});"><i class="fa fa-hand-o-up"></i> Si, reclamar</span>';
  
  $PieModal.html(botones);

}/*SalesUp.Variables.reclamarProspecto*/

SalesUp.Variables.activaReclamarProspecto = function(Op){
  
  SalesUp.Sistema.CargaDatos({Link:'/privado/reclamar-prospecto-2.dbsp', Parametros:'tkp='+Op.tkp});
  SalesUp.Construye.CierraAlerta({Elemento:Op.t});
  RecargaTablas();
  setTimeout(function(){SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-hand-o-up"></i> Prospecto reclamado.'});}, 500);
}

