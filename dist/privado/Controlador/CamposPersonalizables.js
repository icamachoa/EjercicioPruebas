SalesUp.Variables.CamposData = function(){
  var jsonLtcp = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonListaCamposPersonalizables.dbsp', DataType:'json'});
  jsonLtcp = jsonLtcp.jsonDatos;
  
  var templateHead = '<tr><td style="width: 20px;" class="tCen">#</td><td>Campo</td><td>Descripción</td><td class="tCen">Ver en</td><td class="tCen">Tipo campo</td><td class="tCen">Restricción</td><td style="width:40px;"></td></tr>';
  var template = '';
  template += '<tr data-Restriccion="coCorporativo" data-tk="{{tk}}" data-tkm="{{tkm}}">';
  template += '<td class="tCen"><b>{{nFila}}</b></td>'; 
  template += '<td><b class="coEditar Pointer EditarCp" onclick="SalesUp.Variables.EditarCampoP({idcampo:{{IdCampo}}, indice:{{Indice}} });">{{Campo}}</b></td>';
  template += '<td>{{Descripcion}}</td>';
  template += '<td class="tCen">{{VerEn}}{{#if TambienEn}} y {{TambienEn}}{{/if}}</td>';
  template += '<td class="tCen">{{TipoCampo}}</td>';
  template += '<td class="tCen">{{Restriccion}}</td>';
  template += '<td class="tCen coAcciones">';
  template += ' <span class="EliminarCatalogo EliminarCp Pointer Tip7" tip="¿Eliminar [{{Campo}}] como campo personalizado?" data-id="{{IdCampo}}" data-dato="{{Campo}}" data-q="¿Desea eliminar <b>{{Campo}}?<br/><br/><b>Nota: Se eliminarán todos los datos que haya capturado en este campo.</b>" data-indice="{{Indice}}" onclick="SalesUp.Variables.AlertaEliminarCatalogo({e:this});">';
  template += '   <i class="fa fa-lg fa-trash"></i>';
  template += ' </span>';
  template += '</td>';
  template += '</tr>';
  template += '';


  

  SalesUp.Construye.ConstruyeTabla(templateHead, template, jsonLtcp, {Destino:'#DatosLoad', Id:'LtTablaPersonalizables' } );
  if(SessionNivel<3){
    $('#DatosLoad').append('<div class="clear"></div><div class="BoxBotones w100"><span onclick="SalesUp.Variables.AgregarNuevoCampo();" class="Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar" id="BtnAceptar"><i class="fa fa-plus"></i> Agregar campo</span></div><div class="clear"></div>');  
  }else{
    $('b.EditarCp[onclick]').removeAttr('onclick');
    $('span.EliminarCp').remove();
  }
  SalesUp.Sistema.RestriccionesCorporativo();
}/*SalesUp.Variables.CamposData*/

SalesUp.Variables.AgregarNuevoCampo = function(){
  SalesUp.Sistema.AbrePopUp({
    Titulo: 'Nuevo campo personalizable', 
    Pagina: 'popup_agregar_campo_personalizable.dbsp', 
    CallBack:'SalesUp.Variables.CamposData', 
    Modal:true, ModalAlt : true, Alto:300, Ancho:460
  });
}

SalesUp.Variables.EditarCampoP = function(Op){
  SalesUp.Sistema.AbrePopUp({
    Titulo:'Editar campo personalizado',
    Pagina:'popup_editar_campo_personalizable.dbsp',
    Parametros:'idcampo='+Op.idcampo+'&indice='+Op.indice,
    CallBack:'SalesUp.Variables.CamposData',
    Modal:true, ModalAlt : true, Alto:230, Ancho:470
  });
}

 SalesUp.Variables.AlertaEliminarCatalogo = function(Op){
    $Elemento = $(Op.e);
    var Pregunta = $Elemento.attr('data-q');
    var Id = $Elemento.attr('data-id');
    var Funcion = (Op.Corp) ? Op.Corp : 'SalesUp.Variables.EliminarCatalogo';
    SalesUp.Variables.Indice = $Elemento.attr('data-indice');

    SalesUp.Construye.MuestraAlerta({
      TipoAlerta:'AlertaPregunta',
      Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> '+Pregunta+'',
      Boton1:'Eliminar',
      Boton2:'Cancelar',
      Callback1: Funcion+'({Id:'+Id+'})',
      Icono1:'<i class="fa fa-trash"></i>',
      Icono2:'<i class="fa fa-times"></i>',
      Ancho:'500px'
    });
  }


SalesUp.Variables.EliminarCatalogo = function(Op){
  var indice = SalesUp.Variables.Indice;
  SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryEliminarCampoPersonalizado.dbsp', Parametros:'idcampo='+Op.Id+'&indice='+indice});
  SalesUp.Variables.CamposData();
}

SalesUp.Variables.ReloadData = function(){ SalesUp.Variables.CamposData(); }

SalesUp.Variables.ReloadData();

