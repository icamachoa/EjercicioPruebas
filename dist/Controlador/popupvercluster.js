var control = SalesUp.Sistema.queControl();

  var templateHead = '<tr><td class="tCen">Cluster</td><td class="tCen">Cuenta</td><td class="tCen">Acciones</td></tr>';
  var template = '';
  template += '<tr>';
  template += '<td class="Pointer tCen Tip6 editarCluster" tip="Editar cluster" onclick="SalesUp.Variables.NuevoCluster({ cl:\'{{TK}}\' })">{{CLUSTER}}</td>';
  template += '<td class="tCen" >{{CUENTAS}}</td>';
  template += '<td class="tCen"><span class="Pointer" onclick="SalesUp.Variables.EliminarCluster({ tk:\'{{TK}}\' });"><i class="fa fa-lg fa-trash-o Tip6" tip="Eliminar Cluster"></i></span></td>';  //id para eliminar
  template += '</tr>';
  template += '';
   var templateNuevo = '';
  templateNuevo += '<tr class="rowNuevo">';
  templateNuevo += '<td class=" Pointer tCen" ><input type="text" id="txtNuevo" class="InfoObligatorio" onkeyup="guardarClusterConEnter(event);"/></td>';
  templateNuevo += '<td class="tCen">0</td>';
  templateNuevo += '<td class="tCen nuevo"><span class="Pointer pr5" id="guardarcluster" onclick="SalesUp.Variables.GuardaCluster();"><i class="fa fa-lg fa-floppy-o Tip6" tip="Guardar cluster" ></i> </span><span onclick="SalesUp.Variables.Cancelar();"><i class="fa fa-lg fa-times Tip6 cancelar" tip="Cancelar" ></i></span>';
  templateNuevo += '<span class="Pointer"><i class="fa fa-lg fa-trash-o Tip6" tip="Editar Cuenta"></i></span><span class="Pointer basura" style="display:none;"><i class="fa fa-lg fa-trash-o Tip6" rel="" tip="Eliminar cluster"  id="eliminarCluster">asdasdasdasdasd</i></span>';
  templateNuevo += '';

  var jsonLtcp;

  SalesUp.Variables.Tke=$("#tke").val();// recibo el valor al crear el poup(me lo envia el padre.. y realizo la consulta a la bd)
SalesUp.Variables.CamposData = function(){
  
  jsonLtcp = SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/clusters/get/jsonCluster.dbsp', Parametros:'tke='+SalesUp.Variables.Tke ,DataType:'json'});
  jsonLtcp = jsonLtcp.jsonDatos;
  
  
  SalesUp.Construye.ConstruyeTabla(templateHead, template, jsonLtcp, {Destino:'#DatosCluster', Id:'LtTablaPersonalizables'/*, Callback:JsProspectos, PagActual:PagAct, NumRegistros:nRegistros*/ } );
    var botones  = '<div class="clear"></div><div class="BoxBotones">';   
     if(SalesUp.Variables.session_nivel == 1){
      botones += '<span  class="Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar" id="BtnAceptar" onclick="SalesUp.Variables.AgregarCuenta(\''+SalesUp.Variables.Tke+'\');"><i class="fa fa-plus"></i> Asignar cuenta</span>  ';   
     }
     botones += '<span  class="Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar" id="BtnAceptar" onclick="SalesUp.Variables.NuevoCluster({ cl:\'0\' })"><i class="fa fa-plus"></i> Agregar cluster</span>  ';   
     botones += '<span  class="Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar" id="BtnAceptar" onclick="SalesUp.Variables.AgregarUbicacion()"><i class="fa fa-plus"></i> Agregar ubicación</span>  ';   
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


SalesUp.Variables.EditarCluster=function(){


}

SalesUp.Variables.GuardarNuevoClusterEnter=function(){

  SalesUp.Variables.GuardaCluster();
}

function guardarClusterConEnter(e){
      if(e.keyCode==13){
        SalesUp.Variables.GuardaCluster();
      }

}



SalesUp.Variables.Cancelar= function(){
     $(".rowNuevo").remove()
   }

//function para crear un nuevo item en la tabla con un input text  Alberto Wong

/*********/
SalesUp.Variables.NuevoCluster = function(Op){
  SalesUp.Variables.cl=Op.cl;
          SalesUp.Sistema.AbrePopUp({
          Titulo:'Nuevo Cluster',
          Pagina:'popup_nuevoCluster.dbsp',
          Modal:true, ModalAlt : true, Alto:70, Ancho:400,
          Parametros:'tke='+SalesUp.Variables.Tke+'&tk='+SalesUp.Variables.cl,  //estaba como id y tk
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

SalesUp.Variables.AgregarUbicacion = function(){
  var _tke = $('#tke').val();
  SalesUp.Sistema.AbrePopUp({
    Parametros  : 'tke=' + _tke+'&tkc=0',
    Titulo    : 'Agregar ubicación', 
    Pagina    : 'popup_agregar_ubicacion.dbsp', 
    CallBack  : 'SalesUp.Variables.CamposData', 
    Modal     :true, ModalAlt : true, Alto:190, Ancho:600
  });
};

SalesUp.Variables.AgregarCuenta = function(_tke){
  SalesUp.Sistema.AbrePopUp({
    Parametros  : 'tke=' + _tke+'&tkc=0',
    Titulo    : 'Asignar cuenta', 
    Pagina    : 'popup_agregar_cuenta.dbsp', 
    CallBack  : 'SalesUp.Variables.CreaInterfaz', 
    Modal     :true, ModalAlt : true, Alto:190, Ancho:600
  });
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




