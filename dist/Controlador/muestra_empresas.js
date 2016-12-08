
  var templateHead = '<tr><td>Empresa</td><td>Contacto</td><td>Correo</td><td>Teléfonos</td><td>Calle</td><td>Colonia</td><td>Ciudad</td><td>Correo</td><td>Cp</td><td>País</td><td>Estado</td><td>Municipio</td><td>Latitud</td><td>Longitud</td></tr>';
  var template = '';
  template += '<tr>';
  template += '<td class="Pointer tCen Tip6 editarCluster" tip="Editar cluster" onclick="SalesUp.Variables.NuevoCluster({ id:\'{{IDCONTACTO}}\' })">{{EMPRESA}}</td>';
  template += '<td class="tCen" >{{CONTACTO}}</td>';
  template += '<td class="tCen" >{{CORREO}}</td>';
  template += '<td class="tCen" >{{TELEFONOS}}</td>';
  template += '<td class="tCen" >{{CALLE}}</td>';
  template += '<td class="tCen" >{{COLONIA}}</td>';
  template += '<td class="tCen" >{{CIUDAD}}</td>';
  template += '<td class="tCen" >{{CP}}</td>';
  template += '<td class="tCen" >{{IDPAIS}}</td>';
  template += '<td class="tCen" >{{IDESTADO}}</td>';
  template += '<td class="tCen" >{{IDMUNICIPIO}}</td>';
  template += '<td class="tCen" >{{LATITUD}}</td>';
  template += '<td class="tCen" >{{LONGITUD}}</td>';

  template += '<td class="tCen"><span class="Pointer" onclick="SalesUp.Variables.EliminarCluster({ tk:\'{{IDCONTACTO}}\' });"><i class="fa fa-lg fa-trash-o Tip6" tip="Eliminar Cluster"></i></span></td>';  //id para eliminar
  template += '</tr>';
  template += '';
  var jsonLtcp;

  SalesUp.Variables.Tke=$("#tke").val();// recibo el valor al crear el poup(me lo envia el padre.. y realizo la consulta a la bd)
SalesUp.Variables.CamposData = function(){
  
  jsonLtcp = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonConsultarEmpresas.dbsp', DataType:'json'});
  jsonLtcp = jsonLtcp.jsonDatos;
  
  
  SalesUp.Construye.ConstruyeTabla(templateHead, template, jsonLtcp, {Destino:'#DatosEmpresa', Id:'LtTablaPersonalizables'/*, Callback:JsProspectos, PagActual:PagAct, NumRegistros:nRegistros*/ } );
    var botones  = '<div class="clear"></div><div class="BoxBotones">';   
     botones += '<span  class="Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar" id="BtnAceptar" onclick="SalesUp.Variables.NuevoCluster({ id:\'0\' })"><i class="fa fa-plus"></i> Agregar cluster</span>  ';   
     botones += '<span  class="Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar" id="BtnAceptar" onclick="SalesUp.Variables.AgregarUbicacion()"><i class="fa fa-plus"></i> Agregar ubicación</span>  ';   
     botones += '  <span  class="Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar" id="BtnAceptar" onclick="SalesUp.Variables.ConfigCalculo()"><i class="fa fa-refresh"></i> Cálculo Automático</span>  ';   
     botones += '</div><div class="clear"></div>';   
    $('#DatosCluster').append(botones);  
    $('b.EditarCp[onclick]').removeAttr('onclick');
    $('span.EliminarCp').remove();
  
    //SalesUp.Sistema.IniciaPlugins();
}/*SalesUp.Variables.CamposData*/

$(document).ready(function(){
  console.log("Cofirmando")
    SalesUp.Variables.CamposData();
   $("#mensajeError").hide();


});


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
  console.log(SalesUp.Variables.TkEliminar)
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
  //console.log('TKEmpresa'+SalesUp.Variables.Tke)
  SalesUp.Sistema.AbrePopUp({
          Titulo:'Cambiar cluster',
          Pagina:'eliminarCluster.dbsp',
          Parametros:'tk='+SalesUp.Variables.TkEliminar+'&TKEmpresa='+SalesUp.Variables.Tke,
          CallBack:'SalesUp.Variables.CamposData', Alto:110, Ancho:380
        });
 
}



