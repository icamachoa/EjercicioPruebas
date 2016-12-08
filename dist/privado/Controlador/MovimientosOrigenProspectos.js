function GetData() {
    var randomTime = new Date();
    $('#DatosLoad').html('');
    //$('#contenedor').append(SalesUp.Sistema.unMomento());
    $.ajaxSetup({'beforeSend' : function(xhr) {xhr.overrideMimeType('text/html; charset=iso-8859-1');}}); 
    $.ajax({async:false, cache: false,dataType: 'html', type: 'POST', url : pagina_datos,
      success : function(data) {
        setTimeout(function(){
          $("#DatosLoad").html(data);
          //$('#Esperando').remove();
          num_rows = $('table.simple tbody tr').length;
          if(num_rows==0){SalesUp.Catalogo.PaginaAnterior(); return;}
          $.thickbox();
          $('table.simple tbody tr:even').addClass('zebra');
          (SalesUp.Sistema.RestriccionesCorporativo) ? SalesUp.Sistema.RestriccionesCorporativo():'';
        },500);
      }
    });



  }

 SalesUp.Variables.Nuevo=function(Op){
    var actualizar=(Op.a>=0)? Op.a :''; 
    var tk=(Op.tk>='')?Op.tk:'';
    var descripcion=(Op.d)?Op.d:''; 
    var titulo=(actualizar=='1')?'Editar origen prospecto': 'Nuevo origen prospecto'
    var opt={
         titulo:titulo,
         pagina:'/privado/popup_origen_prospecto_agregar.dbsp?actualizar='+actualizar+'&tk='+tk+'&descripcion='+descripcion,
         callback:'GetData',
         alto:'100', 
         ancho:'450'
        };
    SalesUp.Sistema.AbrePopUp({Titulo:'Nuevo origen',Pagina:'popup_origen_prospecto_agregar.dbsp',Parametros:'idp=296254',CallBack:'GetData' ,Alto:80,Ancho:350});
}

SalesUp.Variables.CrearNuevoOrigenProspecto=function(Op){
  var $frm=$('#frmOrigenProspecto');
  var pasa=SalesUp.Valida.ValidaObligatorios({DentroDe:$frm, DestinoMsj:'.BoxBotonesAccion'});
  if(pasa){
    SalesUp.Construye.GuardarPopUp({t:$('#BtnAceptar')}); 
    setTimeout(function() {GetData();}, 10);
  }
}
SalesUp.Variables.EliminarOrigenProspecto=function(Op){
  var $frm=$('#frmOrigenProspecto');
  var pasa=SalesUp.Valida.ValidaObligatorios({DentroDe:$frm, DestinoMsj:'.BoxBotonesAccion'});
  if(pasa){
    SalesUp.Construye.GuardarPopUp({t:$('#BtnAceptar')}); 
    setTimeout(function() {GetData();}, 10);
  }
}
 SalesUp.Variables.GuardarConEnter=function(Op){
    var e=(Op.e)?Op.e:'';
    var t=(Op.t)?Op.t:'';
    if(SalesUp.Sistema.NumKeyCode(e) === 13){
      SalesUp.Variables.CrearNuevoOrigenProspecto({t:t});
    }
 }

SalesUp.Variables.AlertaEliminarCatalogo = function(Op){
    $Elemento = $(Op.e);
    var Pregunta = $Elemento.attr('data-q');
    var tk = $Elemento.attr('data-tk');
    var Funcion = (Op.Corp) ? Op.Corp : 'SalesUp.Variables.EliminarCatalogo';
    //console.info(Funcion);
    SalesUp.Construye.MuestraAlerta({
      TipoAlerta:'AlertaPregunta',
      Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> '+Pregunta+'',
      Boton1:'Eliminar',
      Boton2:'Cancelar',
      Callback1: Funcion+'({tk:\''+tk+'\'})',
      Icono1:'<i class="fa fa-trash"></i>',
      Icono2:'<i class="fa fa-times"></i>',
      Ancho:'500px'
    });
}

SalesUp.Variables.EliminarCatalogo = function(Op){
  
    var tk=(Op.tk)?Op.tk:''; 
    var opt={
         Titulo:'Cambiar origen prospecto', 
         tk:tk, 
         Pagina:'/privado/popup_cambiar_origen.dbsp', 
         Parametros:'tk='+tk,
         Alto:80, 
         Ancho:250,
         CallBack:'GetData'
       };
       SalesUp.Sistema.AbrePopUp(opt);
  
}






