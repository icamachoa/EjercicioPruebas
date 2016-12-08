SalesUp.Variables.MuestraComisiones=function(){
    var TemplateDatosCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateProductosComisiones.dbsp', Parametros:'thead=1'});
    var TemplateDatos       = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateProductosComisiones.dbsp', Parametros:'thead=0'});
    var Datos               = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonProductosComisiones.dbsp',    DataType:'json'}).jsonDatos;
    var TotalComisiones=_.size(Datos);
    var Destino = '#DatosLoad', IdTabla="tablaProductos";
    SalesUp.Construye.ConstruyeTabla(TemplateDatosCampos, TemplateDatos, Datos, {Destino:Destino, Id:IdTabla} );
    if(TotalComisiones<10){
      $('#DatosLoad').append('<div class="BoxBotones">'+
      '<span  onclick="SalesUp.Variables.NuevaComision({});" class="Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar"><i class="fa fa-plus"></i> Nueva comisión</span>'+
      '</div>');

    }else{
       $('#DatosLoad').append('<div class="SinResultados BoxSizing w100" style="margin-top: 5px;"><i class="fa fa-info-circle"></i> Solo se permite agregar 10 comisiones.</div>');
    }


    SalesUp.Variables.MostrarNumerosComisiones();
    SalesUp.Variables.CargaIconosCambiarEstatus();
    //SalesUp.Variables.OcultaEliminar();
    SalesUp.Sistema.IniciaPlugins();
      
}

SalesUp.Variables.NuevaComision=function(Op){
    var tk=(Op.tk)?Op.tk:'';
    var titulo=(tk=='')?'Nueva comisión': 'Editar comisión';
     SalesUp.Construye.MuestraPopUp({
        alto:'120px', ancho:'300px', 
        centrado:false,
        titulo:titulo, 
        fuente:'/privado/popup_nuevo_comision.dbsp?tk='+tk, 
        callback:'SalesUp.Variables.MuestraComisiones'
    });
    setTimeout(function() {
       var tk=$('#tk').val();
       if(tk!=''){
        SalesUp.Variables.MuestraEditarComision({tk:tk});
       }
   }, 500);
}
SalesUp.Variables.EliminarComision=function(Op){
    var tk=(Op.tk)?Op.tk:'';
    var Elemento=(Op.t)?Op.t:'';
    var descripcion=$(Elemento).attr('data-descripcion');
    SalesUp.Construye.MuestraAlerta({
      TipoAlerta:'AlertaPregunta',
      Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> ¿Estás seguro de eliminar '+descripcion+'?, nota: los productos se actualizarán a 0.',
      Boton1:'Eliminar',
      Boton2:'Cancelar',
      Callback1: 'SalesUp.Variables.Eliminar({tk:\''+tk+'\'})',
      Icono1:'<i class="fa fa-trash"></i>',
      Icono2:'',
      Ancho:'500px'
    });


}
SalesUp.Variables.CargaIconosCambiarEstatus=function(){
  var htmlActivo='<i class="fa fa-check Inactivar Tip1" tip="Activar">';
  var htmlInactivo='<i class="fa fa-lg fa-times Activar Tip1" tip="Inactivar"></i> ';
  var Elemento=$('.Movimientos');
  for(var i=0; i<=Elemento.length-1; i++){
    var Estado=$(Elemento[i]).attr('data-activo');
    if(Number(Estado)==1){
      $(Elemento[i]).html(htmlInactivo);
    }else{
      $(Elemento[i]).html(htmlActivo);
    }
  }
  
}
SalesUp.Variables.CambiarEstatus=function (Op){
    var idElemento=(Op)?Op:'';
    var EstaActivo=$('.Estatus-'+idElemento).attr('data-Activo');
      //console.info(EstaActivo, 'EstaActivo');
    var msg=(Number(EstaActivo)==1)? 'inactivar' : 'activar';
    var nombre=$('.Estatus-'+idElemento).attr('data-nombre');
        SalesUp.Construye.MuestraAlerta({
              TipoAlerta:'AlertaPregunta',
              Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/> ¿Está seguro que desea '+msg+' el precio '+nombre+'?',
              Boton1:'Aceptar',
              Boton2:'Cancelar',
              Callback1: 'SalesUp.Variables.Inactivar({tk:\''+idElemento+'\', tipo:'+EstaActivo+'})',
              Icono1:'<i class="fa fa-check"></i>',
              Icono2:'',
              Ancho:'300px'
        });
}
SalesUp.Variables.Inactivar=function(Op){
   var idElemento=(Op.tk)?Op.tk:'';
   var Accion=Op.tipo; 
   var status=(Number(Accion)==1)?0:1;
   var htmlActivo='<i class="fa fa-check Inactivar Tip2" tip="Activar">';
   var htmlInactivo='<i class="fa fa-lg fa-times Activar Tip2" tip="Inactivar"></i>';
   var respuesta=SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonCambiarStatusComisionProducto.dbsp', Parametros:'tk='+idElemento+'&status='+status, DataType:'json'}).jsonDatos;
   var respuesta=respuesta[0].STATUS;
    setTimeout(function() {
      if(Number(respuesta)==1){
        $('.Estatus-'+idElemento).html(htmlInactivo).attr('data-activo', 1);
       }else{
        $('.Estatus-'+idElemento).html(htmlActivo).attr('data-activo', 0);;
       }
       SalesUp.Variables.MuestraComisiones();
       SalesUp.Sistema.IniciaPlugins();
    }, 1000);
   
}
SalesUp.Variables.Eliminar=function(Op){
   var tk=(Op.tk)?Op.tk:'';
   SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonEliminarComision.dbsp', Parametros:'tk='+tk, DataType:'json'});
   SalesUp.Variables.MuestraComisiones();
   SalesUp.Sistema.IniciaPlugins();
}

SalesUp.Variables.MostrarNumerosComisiones=function(){
      var separador=localStorage.SysSepDecimales;
    $('.Comisiones').each(function(){
       var Elemento=this; 
       var numero=$(Elemento).attr('data-valor'); 
           numero=accounting.formatNumber(numero, 2, '', separador);
       var Valor=SalesUp.Sistema.SimboloPorcentaje({Numero: numero});
       $(Elemento).html(Valor);
    });
}

SalesUp.Variables.OcultaEliminar=function(){
    var Eliminar=$('.Eliminar');
    var total=_.size(Eliminar);
    if(total==1){
        $(Eliminar).remove();
    }
}
SalesUp.Variables.SinFormato=function(v){
    var SysSepDecimales = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});
    return accounting.unformat(v, SysSepDecimales);
}
$(function(){
    SalesUp.Variables.MuestraComisiones();
    SalesUp.Variables.MostrarNumerosComisiones();
    //SalesUp.Variables.OcultaEliminar();
});









