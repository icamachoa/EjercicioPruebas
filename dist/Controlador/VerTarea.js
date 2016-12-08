var $ComentarioTarea; 
var PlaceTextArea = true;
var PlaceHolderComentario = '¿Qué desea comentar sobre esta tarea?';
function ReloadData(){
   SalesUp.Variables.ReloadData();
}

function ActivaPlaceHolder(Op){
   var $Elemento = $(Op.Elemento);
   if(PlaceTextArea){ $Elemento.html(''); PlaceTextArea = false; }
}

SalesUp.Variables.ReloadData = function(){
   
   SalesUp.Sistema.MuestraEspera('#DetalleDelHistorial',1);
   SalesUp.Sistema.MuestraEspera('#DetalleTarea',1);

   setTimeout(function() {
      SalesUp.Variables.jsonVerTareas = SalesUp.Sistema.CargaDatos({ Link:'/privado/Modelo/jsonDetalleTarea.dbsp', Parametros:'tktr='+SalesUp.Variables.TkTr+'&start=1&howmany=10', DataType:'json' });
      SalesUp.Variables.ArmaDetalleTarea({Detalle:SalesUp.Variables.jsonVerTareas.jsonDatos.Detalle});
      SalesUp.Variables.ArmaHistorialTarea({Historial:SalesUp.Variables.jsonVerTareas.jsonDatos.Historial, Registros:SalesUp.Variables.jsonVerTareas.Registros.TotalResgistros });
      
   }, 10);

}

SalesUp.Variables.ArmaDetalleTarea = function(Op){
  var jsonDetalleTarea = Op.Detalle;
  SalesUp.Variables.IdEstadoActual = Op.Detalle.EdoActual;
  var HtmlDetalleTarea = SalesUp.Sistema.CargaDatos({Link:'Vista/TemplateDetalleTarea.dbsp', Almacen: 'HtmlDetalleTarea' });
  var Reemplazado = SalesUp.Construye.ReemplazaDatos({ Template: HtmlDetalleTarea, Datos: jsonDetalleTarea });
  $('#DetalleTarea').html(Reemplazado);

  var HoraPropuesta = jsonDetalleTarea.PropuestaHora;

  var Propuesta = '';
  Propuesta += '<h2>Atención</h2><br/>';
  Propuesta += 'Se ha solicitado un cambio de fecha de vencimiento<br/>Fecha propuesta: ';
  Propuesta += '<input type="text" onchange="SalesUp.Variables.FechaPropuesta = this.value;" id="FechaPropuesta" value="'+jsonDetalleTarea.Propuesta+'"/> - ';
  Propuesta += '<input type="text" onchange="SalesUp.Variables.HoraPropuesta = this.value;" id="HoraPropuesta" value="'+HoraPropuesta+'"/>';
  
  
  if((jsonDetalleTarea.EdoActual==6)&&(SalesUp.Variables.SessionIdUsuario!=jsonDetalleTarea.IdRealizador)){
    SalesUp.Construye.MuestraAlerta({
      TipoAlerta:'AlertaPregunta',
      Alerta:Propuesta,
      Boton1:'Cambiar fecha',
      Boton2:'Cancelar',
      Callback1:'SalesUp.Variables.CambiarFecha',
      Icono1:'<i class="fa fa-calendar"></i>',
      Ancho:'400px'
    });

    setTimeout(function() {
      var PickerPropuesta = ConfiguracionPickerNoFechasPasadas;
      PickerPropuesta.minDate = jsonDetalleTarea.Propuesta;
      $('#FechaPropuesta').datepicker(PickerPropuesta);
      $('#HoraPropuesta').clockpicker({ placement:'left', align:'top', autoclose:true, 'default':HoraPropuesta });
    }, 150);
    
  }
}

SalesUp.Variables.ArmaHistorialTarea = function(Op){
   var jsonHistorial = Op.Historial;
   var Registros = Op.Registros;
   $Historial = $('#DetalleDelHistorial');
   var TbHistorial = '<table class="simple" id="TbHistorial"><thead><tr><td style="width:150px;" class="tCen">Fecha</td><td>Usuario</td><td>Comentario</td></tr></thead><tbody></tbody></table>';
   var TemplateHistorialHead = '<tr><td style="width:150px;" class="tCen">Fecha</td><td style="width:60px;" class="tCen">Usuario</td><td>Comentario</td></tr>';
   var TemplateHistorialBody = '<tr><td class="tCen"><span class="FormatDate">{{Fecha}}</span> {{Hora}}</td><td class="tCen">{{Iniciales}}</td><td class="Html">{{#if Coordenadas}} <a class="mapa-seguimientos thickbox" href="popup_localizacion_seguimiento_tarea.dbsp?idseguimiento={{Id}}&idtarea={{Idtarea}}&TB_callback=GetDataP_Seguimiento&keepThis=false&TB_iframe=true&height=500&width=710"  title="Lugar en que se realizó el seguimiento"><img src="../estilos/icon-location.png" alt="" /></a> {{/if}} {{Comentario}}</td></tr>';
   
   SalesUp.Construye.ConstruyeTabla(TemplateHistorialHead, TemplateHistorialBody, jsonHistorial, { Destino: '#DetalleDelHistorial', Id: 'TbHistorial' });

   if(Registros>10){
      SalesUp.Variables.ComodinTemplateRow = TemplateHistorialBody;

      var PaginajsonDatos = "'/privado/Modelo/jsonHistorialTarea.dbsp'";
      var Parametros = "'"+'tktr='+SalesUp.Variables.TkTr+"'";
      var DestinoTabla = "'TbHistorial'";

      $('#DetalleDelHistorial').append('<div onclick="SalesUp.Sistema.VerMasResultados({ Elemento:this, PaginajsonDatos: '+PaginajsonDatos+' , Parametros: '+Parametros+' , DestinoTabla: '+DestinoTabla+', Start:11, howMany:10 });" class="w100 tCen Pointer"><span Id="VerMas" class="Btn Btn-flat-Aceptar Btn-tiny"><i class="fa fa-angle-down fa-lg"></i> <b>Ver más</b></span></div>'); 
   }
}

SalesUp.Variables.CambiarFecha = function(){
  var Fecha = '', HoraPropuesta ='';
  
  (SalesUp.Variables.FechaPropuesta) ? Fecha = SalesUp.Variables.FechaPropuesta : Fecha = SalesUp.Variables.jsonVerTareas.jsonDatos.Detalle.Propuesta;
  (SalesUp.Variables.HoraPropuesta) ? Hora = SalesUp.Variables.HoraPropuesta : Hora = SalesUp.Variables.jsonVerTareas.jsonDatos.Detalle.PropuestaHora;
  SalesUp.Sistema.CargaDatos({ Link:'/privado/Modelo/qryCambiarFechaVencimiento.dbsp', Parametros:'tktr='+SalesUp.Variables.TkTr+'&fecha='+Fecha+'&hora='+Hora });
  SalesUp.Variables.ReloadData();
}

SalesUp.Variables.AgregarComentario = function(Op){
  Op.Evento.preventDefault();
  $(Op.Elemento).hide();
  
  $('#ComentarTarea').slideDown();
  setTimeout(function(){ $ComentarioTarea.focus(); }, 10);
}

SalesUp.Variables.GuardarComentario = function(Op){
   var Evento = Op.Evento;
   Evento.preventDefault();
   var Comentario = SalesUp.Variables.ObtieneComentario();
   if(Comentario){
      SalesUp.Sistema.CargaDatos({ Link:'/privado/Modelo/qryComentarTarea.dbsp', Parametros:'tktr='+SalesUp.Variables.TkTr+'&c='+Comentario });
      SalesUp.Variables.ReloadData();
      $ComentarioTarea.html(PlaceHolderComentario); PlaceTextArea = true;
      $('#ComentarTarea').hide();
      $('#btnAgregarComentar').show();
   }else{
      setTimeout(function(){ $ComentarioTarea.focus(); }, 500);
   }
}

SalesUp.Variables.ActivaCambioEstado = function(Op){
   var Evento = Op.Evento;
   Evento.preventDefault();
   var Comentario = SalesUp.Variables.ObtieneComentario();
   var EdoAnt = SalesUp.Variables.IdEstadoActual;
   var Edo = Op.Id;
   console.log(EdoAnt, Edo, Comentario );
   var Datos = 'tktr='+SalesUp.Variables.TkTr+'&c='+Comentario+'&EdoAnt='+EdoAnt+'&Edo='+Edo;
   SalesUp.Sistema.CargaDatos({ Link:'/privado/Modelo/qryCambiarEdoTarea.dbsp', Parametros:Datos });
   SalesUp.Variables.ReloadData();
}

SalesUp.Variables.ObtieneComentario = function(){
  var Comentario = $ComentarioTarea.html();
  if((Comentario!='')&&(Comentario!=PlaceHolderComentario)){
    Comentario = escape(Comentario);
  }else{Comentario='';}

  return Comentario;
}

SalesUp.Variables.MasTiempo = function(){
  SalesUp.Sistema.AbrePopUp({
    Titulo: 'Más tiempo',
    Pagina: 'PopUpMasTiempoTarea.dbsp',
    Parametros:'tktr='+SalesUp.Variables.TkTr,
    CallBack:'SalesUp.Variables.ReloadData',
    Modal:true, ModalAlt : true, Alto:100, Ancho:350
  });
}

$(function(){
  SalesUp.Variables.ReloadData();
  $ComentarioTarea = $('#ComentarioTarea');
});

