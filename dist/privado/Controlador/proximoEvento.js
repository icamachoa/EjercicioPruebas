
SalesUp.Variables.verCita = function(Op){
	var tkc = Op.tkc;

	var procesaInfoCita = function(Op, err){

		var Eventos = Op.jsonDatos[0];
		var Titulo = Eventos.Titulo;
		SalesUp.Variables.TemplateEventoCalendario = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateEventoCalendario.dbsp', Almacen:'HtmlEventoCalendario'});
	    
	
	    var HtmlEvento = SalesUp.Construye.ReemplazaDatos({ Template: SalesUp.Variables.TemplateEventoCalendario, Datos: Eventos });

	    SalesUp.Construye.MuestraAlerta({
	      TipoAlerta:'AlertaModal', Ancho:'650px', Id:'ModalEventos',
	      Alerta: HtmlEvento, Titulo: Titulo,
	      BotonOk:'Cerrar', IconoOk:'<i class="fa fa-times"></i>',
	      IdBoton1:'BtnCerrarEvento'
	    });                                     //onclick="SalesUp.Variables.ConfirmarEliminarCita({ Elemento:this, Idu:'+Eventos.Idu+' });
	                                            //onclick="SalesUp.Variables.PopUpEliminarEvento({id:'+"'"+IdTarea+"'"+', Tipo:'+"'"+2+"'"+' });"
	    $('#ModalEventos .PieModal').append('<a onclick="SalesUp.Variables.ConfirmarEliminarCita({ Elemento:this, Idu:'+Eventos.Idu+',Idc:'+Eventos.Idc+' });" class="Left Pointer Btn Btn-rounded Btn-small Btn-flat-Cancelar Html"><i class="fa fa-trash-o"></i> Eliminar</a>');
	    $('#ModalEventos .PieModal').append('<a onclick="SalesUp.Construye.CierraAlerta({ Elemento:this, Callback:'+"SalesUp.Variables.EditarCita({Idc:"+Eventos.Idc+"})"+' });" class="Left Pointer Btn Btn-rounded Btn-small Btn-flat-Cancelar Html"><i class="fa fa-edit"></i> Editar</a>');  
	    if(Eventos.ConProspecto){
	      $('#BtnCerrarEvento').html('<i class="fa fa-save"></i> Guardar').attr('onclick','SalesUp.Variables.GuardarComentarioEvento({Elemento:this,Idc:'+Eventos.Idc+'});');
	    }

	    setTimeout(function(){ $('#ComentarioEvento').focus(); }, 500);

	    $('#TituloModal').addClass('Html');
	    SalesUp.Sistema.InterpretaHtml();
	}
	SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonInfoCitas.dbsp', parametros:'tkc='+ tkc,callback:procesaInfoCita});
}/*SalesUp.Variables.verCita*/

SalesUp.Variables.ConfirmarEliminarCita = function(Op){
  SalesUp.Construye.MuestraAlerta({
    TipoAlerta:'AlertaPregunta', Ancho:'350px', Id:'EliminarCita',
    Alerta: '¿Está seguro de eliminar esta cita del calendario?', 
    Boton1:'Eliminar', Icono1:'<i class="fa fa-trash-o"></i>', Callback1:'SalesUp.Variables.EliminarCita({Idu:'+Op.Idu+',Idc:'+Op.Idc+'})',
    Boton2:'Cancelar', Icono2:'<i class="fa fa-times"></i>'
  });
}/*SalesUp.Variables.ConfirmarEliminarCita*/

SalesUp.Variables.EliminarCita = function(Op){
  var DatosCita = 'idc='+Op.Idc+'&idu='+Op.Idu;
  SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryEliminarCita.dbsp', Parametros:DatosCita });
  SalesUp.Construye.CierraAlerta({Elemento:$('#BtnCerrarEvento')});
  if(ReloadData){ReloadData();}
}/*SalesUp.Variables.EliminarCita*/

SalesUp.Variables.EditarCita = function(Op){
  var id = Op.Idc;
  SalesUp.Ventana.EditarCita({Id:id});
}

SalesUp.Variables.GuardarComentarioEvento = function(Op){
  var Pasa = SalesUp.Valida.ValidaObligatorios({DentroDe:'#ModalEventos ', DestinoMsj:'#ModalEventos .BodyModal'});
  if(!Pasa){return false;}

  var DatosCita = 'idc='+Op.Idc+'&comentario='+encodeURIComponent($('#ComentarioEvento').val());
  console.log(DatosCita);
  SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryGuardarComentarioCita.dbsp', Parametros:DatosCita });
  SalesUp.Construye.CierraAlerta({Elemento:Op.Elemento});
}/*SalesUp.Variables.GuardarComentarioEvento */


SalesUp.Variables.accionesCorreoProgramado = function(Op){
	var t = Op.t, $t = $(t);
	var $t = $(Op.t);
	var htmlAcciones = '';
		htmlAcciones += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.EditarCorreoProgramado({idEmail:\''+Op.idMail+'\', idp:\''+Op.idp+'\', ido:\'0\'});"><i class="fa fa-lg fa-edit"></i> Editar </span>';
		htmlAcciones += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.AlertaEnviarAhoraCorreoProgramado({idEmail:\''+Op.idMail+'\', asunto:\''+Op.asunto+'\'});"><i class="fa fa-lg fa-send"></i> Enviar Ahora</span>';
		htmlAcciones += '<span class="divisorMenu"></span>';
		htmlAcciones += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.AlertaEliminarCorreoProgramado({idEmail:\''+Op.idMail+'\', asunto:\''+Op.asunto+'\'});"><i class="fa fa-lg fa-trash-o"></i> Eliminar</span>';
		
	var accionesMenu = function(){
		SalesUp.Construye.popOver({Elemento:t, PopOverLugar:'left', Contenido:htmlAcciones, Clases:'PopOverAcciones'});
	}

	accionesMenu();
	$t.mouseenter(function(){ accionesMenu(); }); 
	$t.removeAttr('onmouseenter');
}/*SalesUp.Variables.accionesCorreoProgramado*/

SalesUp.Variables.EditarCorreoProgramado = function(Op){
	var idp = Op.idp;
	var ido = '';
	(Op.ido) ? ido = '&idoportunidad='+Op.ido : '';

	SalesUp.Sistema.AbrePopUp({
		Titulo: 'Editar correo programado',
		Pagina: '/privado/popup_compose_mail.dbsp',
		Parametros:'idprostr='+idp+ido+'&idemail='+Op.idEmail,
		CallBack:' ReloadData',
		Alto:565, Ancho:750
	});
}

SalesUp.Variables.AlertaEnviarAhoraCorreoProgramado = function(Op){
	SalesUp.Construye.MuestraAlerta({
		TipoAlerta:'AlertaPregunta', Ancho:'400px', Id:'AlertaEnviarAhora',
		Alerta: '<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> ¿Está seguro de enviar ahora el correo "'+Op.asunto+'"?', 
		Boton1:'Si, enviar', Icono1:'<i class="fa fa-send fa-lg"></i>', Callback1:'SalesUp.Variables.EnviarAhoraCorreoProgramado({idEmail:'+Op.idEmail+'})', Boton2:'Cancelar'
	});
}

SalesUp.Variables.EnviarAhoraCorreoProgramado = function(Op){
	SalesUp.Sistema.CargaDatos({ Link:'/privado/Modelo/qryEnviarCorreoAhora.dbsp', Parametros:'idemail='+Op.idEmail });
	 if(ReloadData){ReloadData();}
}

SalesUp.Variables.AlertaEliminarCorreoProgramado = function(Op){
	SalesUp.Construye.MuestraAlerta({
		TipoAlerta:'AlertaPregunta', Ancho:'400px', Id:'AlertaEnviarAhora',
		Alerta: '<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> ¿Está seguro de eliminar el correo programado "'+Op.asunto+'"?', 
		Boton1:'Si, eliminar', Icono1:'<i class="fa fa-trash-o fa-lg"></i>' , Callback1:'SalesUp.Variables.EliminarCorreoProgramado({idEmail:'+Op.idEmail+'})', Boton2:'Cancelar'
	});
}

SalesUp.Variables.EliminarCorreoProgramado = function(Op){
	SalesUp.Sistema.CargaDatos({ Link:'/privado/Modelo/qryEliminarCorreoProgramado.dbsp', Parametros:'idemail='+Op.idEmail });
	 if(ReloadData){ReloadData();}
}
