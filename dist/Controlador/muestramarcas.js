  var templateHead = '<tr><td width="2%"></td><td>Nombre</td><td width="5%"></td></tr>';
  var template = '';
  template += '<tr data-Restriccion="coCorporativo" data-tk="{{TK}}" data-tkm="{{TKM}}">';
  template += '<td>{{nFila}}</td>';
  template += '<td><spand class="coEditar coPermitirEditar Pointer  Tip6 editarCluster" tip="Editar Marca"   onclick="SalesUp.Variables.NuevaMarca({bandera:1, tk:\'{{TK}}\', marca:\'{{MARCA}}\'});"><b>{{MARCA}}  </b></span></td>'; //  EDITAR   //SalesUp.Variables.NuevoCluster({ cl:\'{{}}\' })">{{CLUSTER}}
  template += '<td class="tCen coAcciones"><span class="MovimientosMarcas Estatus-{{tk}} Pointer" onclick="SalesUp.Variables.InactivarMarca({ tk:\'{{TK}}\', t:this});" data-nombre="{{MARCA}}" data-Activo="{{STATUS}}"></span> <span class="Pointer EliminarCatalogo" data-tk="{{TK}}" data-dato="{{MARCA}}" data-q="¿Esta seguro que desea eliminar la línea <b>{{MARCA}}</b>?" onclick="SalesUp.Variables.AlertaEliminarCatalogo({e:this});"><i class="fa fa-lg fa-trash Tip6" tip="Eliminar Marca"></i></span> </td>';  //SalesUp.Variables.EliminarCluster({ tk:\'{{TK}}\' });"
  template += '</tr>';
  template += '';

SalesUp.Variables.CamposData = function(){
  jsonLtcp = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonConsultarMarcas.dbsp', DataType:'json'});
  jsonLtcp = jsonLtcp.jsonDatos;
  SalesUp.Construye.ConstruyeTabla(templateHead, template, jsonLtcp, {Destino:'#DatosLoad', Id:'LtTablaPersonalizables'/*, Callback:JsProspectos, PagActual:PagAct, NumRegistros:nRegistros*/ } );
  SalesUp.Sistema.RestriccionesCorporativo();
  SalesUp.Variables.MuestraIconoEstadoMarcas();
}

SalesUp.Variables.InactivarMarca=function (Op){
    var tk=(Op.tk)?Op.tk:'';
    var EstaActivo=$('.Estatus-'+tk).attr('data-Activo');
    var msg=(Number(EstaActivo)==1)? 'inactivar' : 'activar';
    var nombreMarca=$('.Estatus-'+tk).attr('data-nombre');
        SalesUp.Construye.MuestraAlerta({
              TipoAlerta:'AlertaPregunta',
              Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/> ¿Está seguro que desea '+msg+' la marca '+nombreMarca+'?',
              Boton1:'Aceptar',
              Boton2:'Cancelar',
              Callback1: 'SalesUp.Variables.CambiarEstadoMarca({tk:\''+tk+'\', tipo:'+EstaActivo+'})',
              Icono1:'<i class="fa fa-trash"></i>',
              Icono2:'<i class="fa fa-times"></i>',
              Ancho:'300px'
        });
}


SalesUp.Variables.CambiarEstadoMarca=function(Op){
  
   var tk=(Op.tk)?Op.tk:'';
   var Accion=Op.tipo; 
   var status=(Number(Accion)==1)?0:1;

   var htmlActivo='<i class="fa fa-check Inactivar Tip2" tip="Activar">';
   var htmlInactivo='<i class="fa fa-lg fa-times Activar Tip2" tip="Inactivar"></i>';
   var respuesta=SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonCambiarStatusMarcas.dbsp', Parametros:'tk='+tk+'&status='+status, DataType:'json'}).jsonDatos;
   var respuesta=respuesta[0].STATUS;
    setTimeout(function() {
      if(Number(respuesta)==1){
        $('.Estatus-'+idmarca).html(htmlInactivo).attr('data-activo', 1);
        
       }else{
        $('.Estatus-'+idmarca).html(htmlActivo).attr('data-activo', 0);;
       }
       SalesUp.Sistema.IniciaPlugins();
    }, 1000);
   
}

SalesUp.Variables.MuestraIconoEstadoMarcas=function(){
  var htmlActivo='<i class="fa fa-check Inactivar Tip2" tip="Activar">';
  var htmlInactivo='<i class="fa fa-lg fa-times Activar Tip2" tip="Inactivar"></i> ';
  var Elemento=$('.MovimientosMarcas');
  for(var i=0; i<=Elemento.length-1; i++){
    var Estado=$(Elemento[i]).attr('data-activo');
    if(Number(Estado)==1){
      $(Elemento[i]).html(htmlInactivo);
    }else{
      $(Elemento[i]).html(htmlActivo);
    }
  }
  
}
 SalesUp.Variables.CatalogoActual = 'Marcas';
 SalesUp.Variables.ReloadData = function(){ GetData(); }
      
SalesUp.Variables.AlertaEliminarCatalogo = function(Op){
        $Elemento = $(Op.e);
        var Pregunta = $Elemento.attr('data-q');
        var tk = $Elemento.attr('data-tk');
        var Funcion = (Op.Corp) ? Op.Corp : 'SalesUp.Variables.EliminarCatalogo';
        SalesUp.Construye.MuestraAlerta({
          TipoAlerta:'AlertaPregunta',
          Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> '+Pregunta+'',
          Boton1:'Eliminar',
          Boton2:'Cancelar',
          Callback1: Funcion+'({tk:'+tk+'})',
          Icono1:'<i class="fa fa-trash"></i>',
          Icono2:'<i class="fa fa-times"></i>',
          Ancho:'500px'
        });
      }

SalesUp.Variables.EliminarCatalogo = function(Op){
      var arrayEliminar = $('.EliminarCatalogo');
      var contEliminar  = arrayEliminar.length;
      var tk            = $(Op.tk);
      
      if(contEliminar > 1){
        SalesUp.Sistema.AbrePopUp({
          Titulo:'Cambiar marcas',
          Pagina:'popup_eliminar_marca.dbsp',
          Parametros:'tk='+Op.tk,
          CallBack:'GetData', Alto:80, Ancho:250
        });
      }else{
         var resultado = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonMovimientosMarcas.dbsp', Parametros:'bandera=3&tk='+Op.tk, DataType:'json'}).jsonDatos[0].RESULTADO;

         if(resultado == 1){
          SalesUp.Construye.MuestraAlerta({
            TipoAlerta:'AlertaPregunta',
            Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> Tiene productos dados de alta con esa marca, favor de eliminarlos.',
            Boton1:'Aceptar',
            Icono1:'<i class="fa fa-check"></i>',
            Ancho:'500px'
          });

          setTimeout(function(){$('.BoxSizing .Btn-flat-Aceptar').remove();}, 100);
         }else{
          GetData();
         }
      }
}

function GetData(){
  SalesUp.Variables.CamposData(); 
}

//===============================
  SalesUp.Variables.CamposData();


