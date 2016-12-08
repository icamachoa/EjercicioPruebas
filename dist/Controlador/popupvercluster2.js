
  var templateHead = '<tr><td width="2%"></td><td class="">Cluster</td><td class="tCen">Oficina</td><td class="tCen">Cuenta</td><td class="tCen">Ubicaciones</td><td width="3%"></td></tr>';
  var template = '';
  template += '<tr>';
  template += '<td>{{nFila}}</td>';
  template += '<td ><span class="Pointer  Tip6 editarCluster" tip="Editar cluster" onclick="SalesUp.Variables.NuevoCluster({ cl:\'{{TK}}\' })"><b>{{CLUSTER}}</b></span></td>';
  template +='<td class="tCen"> <span class="tCen" data-idcan="{{IDCANALIZACION}}">{{ZONA}}</span></td>';
  template += '<td class="tCen" > <span class="Pointer Tip6" tip="Ver cuentas" onclick="SalesUp.Variables.MostrarCuentasEmpresas({ cl:\'{{TK}}\' });"><b>{{CUENTAS}}</b></span></td>';
  template += '<td class="tCen" ><span class="Pointer Tip6" tip="Ver ubicaciones" onclick="SalesUp.Variables.popup_agregar_ubicacion(\'{{TK}}\')"><b>{{UBICACIONES}}</b> </span></td>';
  template += '<td class="tCen"><span class="Pointer" onclick="SalesUp.Variables.EliminarCluster({ tk:\'{{TK}}\' });"><i class="fa fa-lg fa-trash-o Tip6" tip="Eliminar Cluster"></i></span></td>';  //id para eliminar
  template += '</tr>';
  template += '';
  var jsonLtcp;
  SalesUp.Variables.Tke=$("#tke").val();// recibo el valor al crear el poup(me lo envia el padre.. y realizo la consulta a la bd)
SalesUp.Variables.CamposData = function(){
  var control = SalesUp.Sistema.queControl();
  jsonLtcp = SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/clusters/get/jsonCluster.dbsp', Parametros:'tke='+SalesUp.Variables.Tke ,DataType:'json'});
  jsonLtcp = jsonLtcp.jsonDatos;
   
  SalesUp.Construye.ConstruyeTabla(templateHead, template, jsonLtcp, {Destino:'#DatosCluster', Id:'LtTablaPersonalizables'/*, Callback:JsProspectos, PagActual:PagAct, NumRegistros:nRegistros*/ } );
    var botones  = '<div class="clear"></div><div class="BoxBotones">';   
  if(SalesUp.Variables.session_nivel == 1){
      botones += '<span  class="Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar" id="BtnAceptar" onclick="SalesUp.Variables.AgregarCuenta(\''+SalesUp.Variables.Tke+'\');"><i class="fa fa-plus"></i> Asignar cuenta</span>  ';   
     }
     botones += '<span  class="Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar" id="BtnAceptar" onclick="SalesUp.Variables.NuevoCluster({ cl:\'0\'})"><i class="fa fa-plus"></i> Agregar cluster</span>  ';   
     botones += '  <span  class="Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar" id="BtnAceptar" onclick="SalesUp.Variables.ConfigCalculo()"><i class="fa fa-refresh"></i> Cálculo Automático</span>  ';   
     botones += '</div><div class="clear"></div>';   
    $('#DatosCluster').append(botones);  
    $('b.EditarCp[onclick]').removeAttr('onclick');
    $('span.EliminarCp').remove();
     //SalesUp.Sistema.IniciaPlugins();
}/*SalesUp.Variables.CamposData*/

$(document).ready(function(){
    SalesUp.Variables.CamposData();
   $("#mensajeError").hide();


});

function getData2(){}
SalesUp.Variables.MostrarCuentasEmpresas= function(Op){
    var tkCluster=Op.cl;
  //   SalesUp.Sistema.AbrePopUp({
  //   Parametros  : 'tkCluster='+tkCluster,
  //   Titulo    : 'Cuentas', 
  //   Pagina    : 'listarCuentasClusters.dbsp', 
  //   CallBack  : 'SalesUp.Variables.CamposData', 
  //   Modal     :true, ModalAlt : true, Alto:190, Ancho:600
  // });
  document.location.href='muestra_cuentas.dbsp?tkCluster='+tkCluster;
}



SalesUp.Variables.GuardarNuevoClusterEnter=function(){

  SalesUp.Variables.GuardaCluster();
}

/*
SalesUp.Variables.Cancelar= function(){
     $(".rowNuevo").remove()
   }
*/
SalesUp.Variables.NuevoCluster = function(Op){
  //var idcana=$('.z').attr('data-idcan');
  SalesUp.Variables.cl=Op.cl;
          SalesUp.Sistema.AbrePopUp({
          Titulo:'Nuevo Cluster',
          Pagina:'popup_nuevoCluster.dbsp',
          Modal:true, ModalAlt : true, Alto:100, Ancho:400,
          Parametros:'tke='+SalesUp.Variables.Tke+'&tk='+SalesUp.Variables.cl,//+'&idcan='+idcana,  //estaba como id y tk
          CallBack:'SalesUp.Variables.CamposData'
        });
} // fin function agregarClusterNuevo
SalesUp.Variables.EliminarCluster= function(Op){
  SalesUp.Variables.TkEliminar=Op.tk;
     SalesUp.Construye.MuestraAlerta({
          TipoAlerta:'AlertaPregunta',
          Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/> Está seguro de eliminar el cluster?',
          Boton1:'Aceptar',
          Boton2:'Cancelar',
          Callback1: 'EliminarClus',
          Icono1:'<i class="fa fa-trash"></i>',
          Icono2:'<i class="fa fa-times"></i>',
          Ancho:'500px'
            });

}
SalesUp.Variables.popup_agregar_ubicacion = function(op){
  var _tke = $('#tke').val();
  var cluster= $.trim(op);

  //   SalesUp.Sistema.AbrePopUp({
  //   Parametros  : 'tke=' + _tke+'&tkc=0'+'&clustertk='+cluster,
  //   Titulo    : 'Agregar ubicación', 
  //   Pagina    : 'popup_agregar_ubicacion.dbsp', 
  //   CallBack  : 'SalesUp.Variables.CamposData', 
  //   Modal     :true, ModalAlt : true, Alto:270, Ancho:700
  // });
  document.location.href='muestra_ubicaciones.dbsp?tke='+_tke+'&clustertk='+cluster;
};
SalesUp.Variables.ConfigCalculo = function(){
  var _tke = $('#tke').val();
  SalesUp.Sistema.AbrePopUp({
    Parametros  : 'tke=' + _tke,
    Titulo    : 'Configuración de cálculo automático de canalización', 
    Pagina    : 'PopupCanalizacionCalculo.dbsp', 
    Modal     :true, ModalAlt : true, Alto:190, Ancho:500
  });
};
function EliminarClus(){
  SalesUp.Sistema.AbrePopUp({
          Titulo:'Cambiar cluster',
          Pagina:'eliminarCluster.dbsp',
          Parametros:'tk='+SalesUp.Variables.TkEliminar+'&TKEmpresa='+SalesUp.Variables.Tke,
          CallBack:'SalesUp.Variables.CamposData', Alto:110, Ancho:380
        });
}
SalesUp.Variables.AgregarCuenta = function(_tke){
  //document.location.href='popup_agregar_cuenta.dbsp?tke=' + _tke+'&tkc=0'
  SalesUp.Sistema.AbrePopUp({
    Parametros  : 'tke=' + _tke+'&tkc=0',
    Titulo    : 'Asignar cuenta', 
    Pagina    : 'popup_agregar_cuenta.dbsp', 
    CallBack  : 'SalesUp.Variables.CreaInterfaz', 
    Modal     :true, ModalAlt : true, Alto:290, Ancho:600
  });
        
};



