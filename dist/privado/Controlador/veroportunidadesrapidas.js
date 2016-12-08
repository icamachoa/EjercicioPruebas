var templateHead = '<td class="tCen">#</td><td>Concepto</td><td class="tCen">Línea</td><td class="tCen">Monto</td><td class="tCen">Certeza</td><td class="tCen">Fase</td><td class="tCen">Dias de cierre estimado</td><td></td></tr>';
var template = '';
  template += '<tr data-Restriccion="coCorporativo" data-tk="{{tk}}" data-tkm="{{tkm}}">';
  template += '<td class="tCen"><b>{{nFila}}</b></td>';
  template += '<td><b class="coEditar Pointer" onclick="SalesUp.Variables.NuevaOportunidad({tk:\'{{tk}}\'})" >{{CONCEPTO}}</b></td>';
  template += '<td class="tCen">{{LINEA}}</td>';
  template += '<td class="tDer FormatToMoney">{{MONTO}}</td>';
  template += '<td class="tCen FormatPercent">{{CERTEZA}}</td>';
  template += '<td class="tCen">{{FASE}}</td>';
  template += '<td class="tCen" >{{CIERRE}}</td>';
  template += '<td class="tCen coAcciones">';
  template += ' <span class="EliminarCatalogo EliminarCp Pointer Tip7" tip="Eliminar oportunidad" data-q="¿Está seguro de eliminar {{CONCEPTO}}?" data-tk="{{tk}}" data-dato="{{CONCEPTO}}" onclick="SalesUp.Variables.AlertaEliminarCatalogo({e:this});" >';
  template += '   <i class="fa fa-lg fa-trash"></i>';
  template += ' </span>';
  template += '</td>';
  template += '</tr>';
  template += '';

SalesUp.Variables.CamposData = function(){
  jsonLtcp = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonConsultaOportunidadesRapidas.dbsp', DataType:'json'});
  jsonLtcp = jsonLtcp.jsonDatos;
  SalesUp.Construye.ConstruyeTabla(templateHead, template, jsonLtcp, {Destino:'#DatosLoad', Id:'LtTablaPersonalizables'} );
  $('#DatosLoad').append('<div class="clear"></div><div class="BoxBotones"><span  class="Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" id="BtnAceptar" onclick="SalesUp.Variables.NuevaOportunidad({tk:\'\'})" ><i class="fa fa-plus"></i> Agregar Oportunidad</span></div><div class="clear"></div>');  /**/
}/*SalesUp.Variables.CamposData*/

SalesUp.Variables.NuevaOportunidad = function(Op){
  SalesUp.Variables.TkOp=(Op.tk) ? Op.tk:'';  // si id es >0 entonces es editar caso contrario es nuevo
  SalesUp.Variables.Tke;
  var titulo='';
  if(SalesUp.Variables.TkOp==''){
      titulo='Nueva Oportunidad';
  }else{titulo='Editar Oportunidad';}
  SalesUp.Sistema.AbrePopUp({
          Titulo: titulo,
          Pagina:'nuevaOportunidadRapida.dbsp',
          Modal:true, ModalAlt : true, Alto:220, Ancho:400,
          Parametros:'&tk='+SalesUp.Variables.TkOp,  
          CallBack:'SalesUp.Variables.CamposData'
        });
} // fin function agregarClusterNuevo   

SalesUp.Variables.EliminarOportunidad= function(Op){
     SalesUp.Variables.tkOp =Op.tk; 
     SalesUp.Construye.MuestraAlerta({
          TipoAlerta:'AlertaPregunta',
          Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/> ¿Está seguro de eliminar la oportunidad?',
          Boton1:'Aceptar',
          Boton2:'Cancelar',
          Callback1: 'SalesUp.Variables.CallbackEliminaOportunidad',
          Icono1:'<i class="fa fa-trash"></i>',
          Icono2:'<i class="fa fa-times"></i>',
          Ancho:'300px'
            });
}

SalesUp.Variables.CallbackEliminaOportunidad=function(){
        jsonLtcp = SalesUp.Sistema.CargaDatos({Link:'Modelo/eliminaOportunidad.dbsp', Parametros: 'tkop='+SalesUp.Variables.tkOp, DataType:'html'});
        //console.log(jsonLtcp)
        SalesUp.Variables.CamposData();
}


SalesUp.Variables.AlertaEliminarCatalogo = function(Op){
    $Elemento = $(Op.e);
    var Pregunta = $Elemento.attr('data-q');
    var tk = $Elemento.attr('data-tk');
    var Funcion = (Op.Corp) ? Op.Corp : 'SalesUp.Variables.EliminarOportunidad';
    SalesUp.Variables.Indice = $Elemento.attr('data-indice');
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
  SalesUp.Variables.EliminarOportunidad(Op);
  // var indice = SalesUp.Variables.Indice;
  // SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryEliminarCampoPersonalizado.dbsp', Parametros:'idcampo='+Op.Id+'&indice='+indice});
  // SalesUp.Variables.CamposData();
}

SalesUp.Variables.ReloadData = function(){ SalesUp.Variables.CamposData(); }





//====================================================
  SalesUp.Variables.CamposData();
//====================================================



