var control = SalesUp.Sistema.queControl();


 var templateHead = 'Cluster<tr><td class="tCen">País</td><td class="tCen">Estado</td><td class="tCen">Municipio</td><td class="tCen">Acciones</td></tr>';
  var template = '';
  template += '<tr>';
  template += '<td class=" Pointer tCen Tip6 editarCluster" tip="Editar ubicación" onclick="SalesUp.Variables.NuevaUbicacion({tk:\'{{TK}}\' })">{{PAIS}}</td>'; // TK DE LA CUENTA...
  template += '<td class="tCen" >{{ESTADO}}</td>';
  template += '<td class="tCen" >{{MUNICIPIO}}</td>';
  template += '<td class="tCen"><span class="Pointer" onclick="SalesUp.Variables.EliminarUbicacion({ tk:\'{{TK}}\' });"><i class="fa fa-lg fa-trash-o Tip6" tip="Eliminar Ubicación"></i></span></td>';  //id para eliminar
  template += '</tr>';
  template += '';

  var jsonLtcp;

SalesUp.Variables.Tke=$("#tke").val();// recibo el valor al crear el poup(me lo envia el padre.. y realizo la consulta a la bd)
SalesUp.Variables.CamposData = function(){
  jsonLtcp = SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/ubicaciones/get/jsonMuestrUbicaciones.dbsp', Parametros:'tkCluster='+SalesUp.Variables.TkCluster, DataType:'json'});
  jsonLtcp = jsonLtcp.jsonDatos;
  SalesUp.Construye.ConstruyeTabla(templateHead, template, jsonLtcp, {Destino:'#DatosUbicacion', Id:'LtTablaPersonalizables' } );
      $('#DatosUbicacion').append('<div class="clear"></div><div class="BoxBotones"><span><i class="Pointer fa fa-time fa-lg"></i></span> <span  class="Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar" id="BtnAceptar" onclick="SalesUp.Variables.NuevaUbicacion({tk:\'0\'})"><i class="fa fa-plus"></i> Agregar Ubicación</span></div><div class="clear"></div>');  
    //$('b.EditarCp[onclick]').removeAttr('onclick');
    //$('span.EliminarCp').remove();
  
    
}/*SalesUp.Variables.CamposData*/

$(document).ready(function(){
    creaSelectClusters();
    retornaDatosTblUbicaciones();

});

function creaSelectClusters(){
            var tkClusterSelect=$("#clustertk").val()
            var datos= SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/ubicaciones/get/jsonObtenerClusters.dbsp', Parametros:'tke='+SalesUp.Variables.Tke, DataType:'json'});
            datos = datos.jsonDatos;
            SalesUp.Construye.ConstruyemeUn({
            Control: 'select', Nuevo: false,
            SeleccioneOpcion: false, 
            IdControl: 'selectClusters',
            Template: '<option value="{{TK}}" selected=-"selected">{{CLUSTER}}</option>', 
            Datos: datos
                    });  
            $("#selectClusters").val(tkClusterSelect);

    }

function retornaDatosTblUbicaciones(){
            SalesUp.Variables.TkCluster=$("#selectClusters").val()
            SalesUp.Variables.CamposData();
        
    }


SalesUp.Variables.Cancelar= function(){
                  $(".rowNuevo").remove()
}

//function para crear un nuevo item en la tabla con un input text  Alberto Wong
SalesUp.Variables.NuevaUbicacion = function(Op){
  SalesUp.Variables.Tk=Op.tk;
  SalesUp.Sistema.AbrePopUp({
          Titulo:'Nueva ubicación',
          Pagina:'crearNuevaUbicacion.dbsp',
          Modal:true, ModalAlt : true, Alto:130, Ancho:400,
          Parametros:'tkcluster='+SalesUp.Variables.TkCluster+'&tkcuenta='+SalesUp.Variables.Tk,  //estaba como id y tk
          CallBack:'recargaTblMaster'
        });

                 
} // fin function agregarClusterNuevo

function recargaTblMaster(){
  SalesUp.Variables.CamposData();
  self.parent.SalesUp.Variables.CamposData();
}
SalesUp.Variables.EliminarUbicacion= function(Op){

     
  SalesUp.Variables.Tk=Op.tk;
     SalesUp.Construye.MuestraAlerta({
          TipoAlerta:'AlertaPregunta',
          Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/> Está seguro de eliminar la ubicación?',
          Boton1:'Aceptar',
          Boton2:'Cancelar',
          Callback1: 'EliminarUbica',
          Icono1:'<i class="fa fa-trash"></i>',
          Icono2:'<i class="fa fa-times"></i>',
          Ancho:'300px'
            });


}


function EliminarUbica(){
  
  var datos= SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/ubicaciones/get/eliminarUbicacion.dbsp', Parametros:'tk='+SalesUp.Variables.Tk, DataType:'json'});
        SalesUp.Variables.CamposData();     
  self.parent.SalesUp.Variables.CamposData();
 
}




