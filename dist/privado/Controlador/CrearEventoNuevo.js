var $selectconquien;
var ActivarTareas = true, ActivarCitas = true;

function CambiaColor(dtControl){ dtControl.style.color = '#000000'; }

SalesUp.Variables.LtUsuariosGruposAutorizados = function(){

  SalesUp.Variables.jsonUsuariosGruposAutorizados = SalesUp.Sistema.CargaDatos({ Link:'/privado/Modelo/jsonUsuariosGruposAutorizados.dbsp', DataType:'json' });
  
  SalesUp.Variables.jsonUsuariosGruposAutorizados.jsonDatos = _.reject(SalesUp.Variables.jsonUsuariosGruposAutorizados.jsonDatos, function(j){  
	if(SalesUp.Variables.sIdusuario==SalesUp.Sistema.SoloNumero(j.Id)){return j;}
  });

  $('#ParaQuien').selectize({
      plugins:['remove_button', 'optgroup_columns'], create:false,
      delimiter:',', valueField:'Id', labelField:'Dato',
      searchField:['Dato'], persist:false, openOnFocus:true,
      options:SalesUp.Variables.jsonUsuariosGruposAutorizados.jsonDatos,
      optgroups:[ {id: 'U', name: 'Usuarios'}, {id: 'G', name: 'Grupos'}  ],
      optgroupField: 'Tipo', optgroupLabelField: 'name',
      optgroupValueField: 'id', optgroupOrder: ['U', 'G'],
      onChange:function(){ SalesUp.Variables.DespuesDeSeleccionarUsuario(); },
      render:{
        item: function(item, escape){
        	return '<div class="OpcionesSeleccionadas BoxSizing Ellipsis" data-tipo="'+item.Tipo+'">'+item.Dato+'</div>';
        }
      }
  });

} /* /SalesUp.Variables.LtUsuario */

SalesUp.Variables.DespuesDeSeleccionarUsuario = function(){
  $('.tipsy').remove();
  SalesUp.Sistema.Tipsy();
  
  var IdsUsuarios='', IdsGrupos='';
  $('.ParaQuien .OpcionesSeleccionadas').each(function(){
    var $Elemento = $(this);
    var Valor = $Elemento.attr('data-value').replace(/[^0-9]/g,'');
    ($Elemento.attr('data-tipo')=='U') ? IdsUsuarios += Valor+',' : IdsGrupos += Valor+',';
  });

  $('#LtIdUsuarios').val(IdsUsuarios);
  $('#LtIdGrupos').val(IdsGrupos);
  
  $('.selectize-dropdown.ParaQuien').hide();
  $('.ParaQuien .selectize-input.items.not-full.has-options.has-items > input').keyup(function(e){
    if(SalesUp.Sistema.NumKeyCode(e)!=13) $('.selectize-dropdown.ParaQuien').show();
  });

  if( ( $('#LtIdUsuarios').val()!='' ) || ( $('#LtIdGrupos').val()!='' ) ){
  	$('#Asunto').addClass('InfoObligatorio'); $('#NuevaTarea').val(1);
  }else{$('#Asunto').removeClass('InfoObligatorio'); $('#NuevaTarea').val(0);}
  

  var Alto = $('.ParaQuien .selectize-input.items').height();
  var Aumenta = Alto - 20;
  (Aumenta) ? $('#ListaParaQuien').css('height','auto') : $('#ListaParaQuien').removeAttr('style');
  SalesUp.Variables.TamanioPopActual = SalesUp.Variables.TamanioPop+Aumenta; 
  self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:SalesUp.Variables.TamanioPopActual});
  SalesUp.Variables.LoTieneCompartido();

}/* /SalesUp.Variables.DespuesDeSeleccionarUsuario */


SalesUp.Variables.LoTieneCompartido = function(){
	var Tkp = $('#Tkp').val();
	//console.log(Tkp);
	var IdUsuario = $('#LtIdUsuarios').val();
	//console.log(IdUsuario);
	var IdGrupos = $('#LtIdGrupos').val();
	if( (Tkp!='') && ((IdUsuario!='')||IdGrupos!='')){
		var Datos = {Tkp: Tkp, Idu:IdUsuario, IdG:IdGrupos };
		SalesUp.Variables.jsonCompartido = SalesUp.Sistema.CargaDatos({ Link:'/privado/Modelo/jsonProspectoCompartido.dbsp', Parametros:Datos, DataType:'json' });
		$('#IdsNoCompartidos').val(SalesUp.Variables.jsonCompartido.jsonDatos[0].IdsNoCompartidos);
	}
}

SalesUp.Variables.UltimaFecha = function(Op){
	var HoraAlmacen='', FechaAlmacen='';
	var $FechaVence, $HoraVence;
	if(Op.fecha=='Tarea'){
		HoraAlmacen = 'SysHoraTarea';
		FechaAlmacen = 'SysFechaTarea';
		$FechaVence = $('#tFechaVence');
		$HoraVence = $('#tHoraVence');
	}

	if(Op.fecha=='Recordatorio'){
		HoraAlmacen = 'SysHoraRecordatorio';
		FechaAlmacen = 'SysFechaRecordatorio';
		$FechaVence = $('#rFechaVence');
		$HoraVence = $('#rHoraVence');
	}

	var Formato = SalesUp.Sistema.Almacenamiento({a:'SysFormatoFecha'});
	Formato = SalesUp.Sistema.StrReplace('yy','yyyy',Formato);
	Formato = Formato.toUpperCase();
	var FechaHoy = moment().add('d', 0).format(Formato);
	var Hora = SalesUp.Sistema.Almacenamiento({a:HoraAlmacen});
	var Fecha = SalesUp.Sistema.Almacenamiento({a:FechaAlmacen});
	var sHora = moment().get('hour');
	var sMin = moment().get('minute');

	if(sMin>30){sHora = sHora + 1;}	

	if(sHora<24){
		(!Hora) ? Hora = sHora +':00':'';
		(!Fecha) ? Fecha = moment().format(Formato):'';
	}else{
		(!Hora) ? Hora = '00:00':'';
		(!Fecha) ? Fecha = moment().add('d', 1).format(Formato):'';
	}
	
	var FechaSplit;
	var nf=Fecha;
	if(Formato=='DD/MM/YYYY'){ 
		FechaSplit = Fecha.split('/');
		nf = FechaSplit[2]+'/'+FechaSplit[1]+'/'+FechaSplit[0]; 
	}
	if(Formato=='MM/DD/YYYY'){
	FechaSplit = Fecha.split('/');
	var fMes = parseInt(FechaSplit[0]);
	if(fMes>12){nf='';}
	}
	
	(_.isDate(new Date(nf))) ? nDate = new Date(nf) : nDate = new Date();
	var DateTime = nDate.getTime();
	
	var FechaHoySplit;
	var HoyFecha = FechaHoy;
	if(Formato=='DD/MM/YYYY'){ 
		FechaHoySplit = FechaHoy.split('/');
		HoyFecha = FechaHoySplit[2]+'/'+FechaHoySplit[1]+'/'+FechaHoySplit[0]; 
	}
	(_.isDate(new Date(HoyFecha))) ? nDateHoy = new Date(HoyFecha) : nDateHoy = new Date();
	var DateHoy = nDateHoy.getTime();
	
	$FechaVence.val(FechaHoy); 
	$HoraVence.val(Hora);
	
	if(DateTime>DateHoy){ $FechaVence.val(Fecha); }

}/*SalesUp.Variables.UltimaFecha*/

SalesUp.Variables.ValidaCitaInvitados = function(Op){
    var Pasa = true;
    var banderag=0;
    if(!_.size($('#TipoIdSeleccionado'))){return Pasa;}
    var revisa=$('#TipoIdSeleccionado').val();
    var revisastr=revisa.split(',');
     
   if($('#AsuntoCita').length>=1){ 
        if($('#AsuntoCita').val().length>0){
            if ($('#IdSeleccionado').val().length>0){
                
                for (var i = 0; i <= revisastr.length; i++) {
                     if (revisastr[i]==2){ banderag=banderag+1; }
                }
                if (banderag==0){ Pasa = false; SalesUp.Construye.MuestraMsj({tMsg:4,Msg:'Debe especificar al menos un invitado del equipo de colaboradores.'});}
                   
             }else{ 
                 Pasa = false;SalesUp.Construye.MuestraMsj({tMsg:4,Msg:'Debe especificar al menos un invitado del equipo de colaboradores.'}); 
             }                            
        } 
     }
    return Pasa;
}/*SalesUp.Variables.ValidaCitaInvitados*/


SalesUp.Variables.ValidaDatosDeCita = function(){
  var IdSeleccionado=$('#IdSeleccionado').val();
  var TipoIdSeleccionado=$('#TipoIdSeleccionado').val(); 
  SalesUp.Variables.jsonColaboradoresCitasValidaciones = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonColaboradoresCitasValidaciones.dbsp',  Parametros:{ IdSeleccionado: IdSeleccionado, TipoIdSeleccionado: TipoIdSeleccionado }, DataType:'json' });   
  var NoComportidosNombre = SalesUp.Variables.jsonColaboradoresCitasValidaciones.jsonDatos[0].NombrePersona;
  var NoCompartidosTotal = SalesUp.Variables.jsonColaboradoresCitasValidaciones.jsonDatos[0].Total;
  var NoCorreoNombre = SalesUp.Variables.jsonColaboradoresCitasValidaciones.jsonDatos[1].NombrePersona;
  var NoCorreoTotal = SalesUp.Variables.jsonColaboradoresCitasValidaciones.jsonDatos[1].Total;
  var NoMovilNombre = SalesUp.Variables.jsonColaboradoresCitasValidaciones.jsonDatos[2].NombrePersona;
  var NoMovilTotal = SalesUp.Variables.jsonColaboradoresCitasValidaciones.jsonDatos[2].Total;
  return ArmaAlertaAntesGuardar(NoComportidosNombre,NoCompartidosTotal,NoCorreoNombre,NoCorreoTotal,NoMovilNombre,NoMovilTotal);
}/*SalesUp.Variables.ValidaDatosDeCita*/

function ArmaAlertaAntesGuardar(NoComportidosNombre,NoCompartidosTotal,NoCorreoNombre,NoCorreoTotal,NoMovilNombre,NoMovilTotal){
    var Msg='<h2>Atención</h2><br/>';
    var total=NoCompartidosTotal + NoCorreoTotal + NoMovilTotal;
    var bandera=0;    
    if ((total==0) ||( $('#IdPlantillaCORREONoti').val()==0 & $('#IdPlantillaSMSNoti').val()==0 & NoCompartidosTotal==0 )){
        return true;
    }else{
        if (NoCompartidosTotal>0){
            Msg=Msg+'Los siguientes usuarios no tienen compartido algun contacto:<br/>'+NoComportidosNombre;
        }
        if (NoCorreoTotal>0 & $('#IdPlantillaCORREONoti').val()>0 ){
            if (NoCompartidosTotal>0){
                Msg=Msg+'<br /> <br /> '
            }
            Msg=Msg+'Los siguientes contactos no tienen correo electrónico asignado:<br/>'+NoCorreoNombre;
        }
        
        if (NoMovilTotal>0 & $('#IdPlantillaSMSNoti').val()>0 ){
            if (NoCompartidosTotal>0 || NoCorreoTotal>0 ){
                Msg=Msg+'<br /> <br /> '
            }
            Msg=Msg+'Los siguientes contactos no tienen número movil asignado:<br/>'+NoMovilNombre;
        }
        
        Msg=Msg+'<br/><br /> Al guardar se compartiran los contactos con los usuarios que no esten. Asi mismo no recibiran notificacion correo electrónico y/o sms los contactos que no cuenten con estos.';
        
        SalesUp.Construye.MuestraAlerta({
            TipoAlerta:'AlertaPregunta',
            Alerta:Msg,
            Boton1:'Guardar',
            Boton2:'Cancelar',
            Callback1:'SalesUp.Variables.Guardar',
            Icono1:'<i class="fa fa-save"></i>'
            }); 
        return false;
    }     
    
}

SalesUp.Variables.RevisarRestricciones = function(){

	var NoCompartidos = '';
	if(!_.isUndefined(SalesUp.Variables.jsonCompartido)){
		NoCompartidos = SalesUp.Variables.jsonCompartido.jsonDatos[0].NoCompartidos;
	}
	if(SalesUp.Valida.ValidaObligatorios()){
		if(_.size(NoCompartidos)>0){
			SalesUp.Construye.MuestraAlerta({
				TipoAlerta:'AlertaPregunta',
				Alerta:'<h2>Atención</h2><br/>Los siguientes usuarios no tienen compartido el contacto:<br/>'+ NoCompartidos,
				Boton1:'Compartir y guardar',
				Boton2:'Cancelar',
				Callback1:'SalesUp.Variables.Guardar',
				Icono1:'<i class="fa fa-save"></i>'
			});	
		}else{
		    if(SalesUp.Variables.ValidaCitaInvitados()){
		    	if (SalesUp.Variables.ValidaDatosDeCita()) {
		    		SalesUp.Variables.Guardar();
		    	}
		    // SalesUp.Variables.Guardar(); 
		    }   
		}	
	}else{
		$('#BtnAceptar').removeAttr('disabled');
	}
}/*/SalesUp.Variables.RevisarRestricciones*/


SalesUp.Variables.ActivaFocusActual = function(Op){
  
	var tInicial = self.parent.SalesUp.Variables.TamanioInicial;
	self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:tInicial});
	var $Elemento = $(Op.Elemento);

	var id = $Elemento.attr('href');
	
	(id=='#Recordatorios') ? setTimeout(function(){$(id+' textarea').focus()}, 100) :'';

	if(id=='#Tareas'){
		setTimeout(function(){$('#Asunto').focus()}, 100);
		if(ActivarTareas){
			ActivarTareas = false;
			SalesUp.Variables.IniciaTareas();
		}
	}
	if(id=='#Citas'){
		setTimeout(function(){
			$('#AsuntoCita').focus();
			tInicial = tInicial + 70;
			self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:tInicial});
			
			if(ActivarCitas){
				ActivarCitas = false;
				SalesUp.Variables.IniciaCitas();
			}
		}, 100);
	}
}/*SalesUp.Variables.ActivaFocusActual*/

SalesUp.Variables.EditarRecordatorio = function(){
	if(SalesUp.Variables.ActivaEditar){
		$('#rFechaVence').val(SalesUp.Variables.EditarFecha);
		$('#rHoraVence').val(SalesUp.Variables.EditarHora);
		$('#ComentarioRecordatorio').val(SalesUp.Variables.EditarMensaje);
		setTimeout(function(){ $('#ComentarioRecordatorio').select().focus();}, 100);
	}
}/*SalesUp.Variables.EditarRecordatorio*/


SalesUp.Variables.EventoLLeno = function(){
	$('#comentario').removeClass('InfoObligatorio');
}

SalesUp.Variables.IniciaRecordatorios = function(){
	SalesUp.Variables.UltimaFecha({fecha:'Recordatorio'});
    $('#rHoraVence').clockpicker({ placement:'right', align:'right', autoclose:true, 'default':'now' });
}

SalesUp.Variables.IniciaTareas = function(){
	SalesUp.Variables.LoTieneCompartido();
	SalesUp.Variables.UltimaFecha({fecha:'Tarea'});
	$('#tHoraVence').clockpicker({ placement:'left', align:'left', autoclose:true, 'default':'now' });
	SalesUp.Variables.LtUsuariosGruposAutorizados();
}



$(function(){
	setTimeout(function(){

		$TextAreaRecordatorio = $('textarea[name="recordatorio"]');
		$('.BoxBotonesAccion').show();
		$('#Tabs').tabs();
	    SalesUp.Variables.IniciaRecordatorios();
	    SalesUp.Variables.EditarRecordatorio();
	    
	    setTimeout(function(){
			self.parent.SalesUp.Sistema.TamanioInicial();
			self.parent.SalesUp.Variables.TamanioInicial = self.parent.SalesUp.Variables.TamanioInicial;
			SalesUp.Variables.TamanioPop = self.parent.SalesUp.Variables.TamanioInicial;
			SalesUp.Variables.TamanioPopActual = SalesUp.Variables.TamanioPop;
			
			var w = $TextAreaRecordatorio.width();
			$TextAreaRecordatorio.css('width',w+'px !important');
			$('.BoxBotonesAccion').show();
		}, 500);

		setTimeout(function(){
			var w = $('#TextAreaRecordatorio').width();
			$('#TextAreaRecordatorio').attr('style','width:'+w+'px !important');
			$('.BoxBotonesAccion').show();
		}, 1500);
		setTimeout(function(){$('.BoxBotonesAccion').show();  }, 2000);
		
	}, 500);

    


});/*Fin ready*/

