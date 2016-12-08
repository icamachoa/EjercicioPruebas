var Destino = '#DatosLoad';
var IdTabla	= 'TablaListas';

SalesUp.Variables.CatalogoActual = 'Lista Precios';

SalesUp.Variables.EditarLista = function(_tk){
	SalesUp.Sistema.AbrePopUp({
		Parametros	: 'tk=' + _tk,
		Titulo 		: 'Editar lista', 
		Pagina 		: 'popup_agregar_lista_precios.dbsp', 
		CallBack 	: 'SalesUp.Variables.CreaInterfaz', 
		Modal  		:true, ModalAlt : true, Alto:100, Ancho:600
	});
};

SalesUp.Variables.AlertaEliminarLista = function(Op){
	$Elemento = $(Op.e);
    var Pregunta = $Elemento.attr('data-q');
    var Id = $Elemento.attr('data-id');
    var Funcion = (Op.Corp) ? Op.Corp : 'SalesUp.Variables.EliminarLista';

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
};

SalesUp.Variables.EliminarLista = function(Op){
	SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryEliminarLista.dbsp', Parametros:'IdEliminar='+Op.Id,DataType:'html'});
	SalesUp.Variables.CreaInterfaz();
};

SalesUp.Variables.CreaInterfaz = function(){
	var datosDetalle	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonListaListas.dbsp', DataType:'json'});
	var NombreCampos	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateLista.dbsp', Parametros:'thead=1', Div:0});
	var TemplateDatos	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateLista.dbsp', Parametros:'thead=0', Div:0});
	var Total         =_.size(datosDetalle.jsonDatos);
	SalesUp.Construye.ConstruyeTabla(NombreCampos, TemplateDatos, datosDetalle.jsonDatos, {Destino:Destino, Id:IdTabla} );
	SalesUp.Sistema.IniciaPlugins();
  SalesUp.Variables.CargaIconosCambiarEstatus();
  var $Botones=$('.BoxBotones');
  console.info(Total);
  if(Total==10){
     $('.BoxBotones').hide();
     $('#DatosLoad').append('<div class="SinResultados BoxSizing w100" style="margin-top: 5px;"><i class="fa fa-info-circle"></i> Solo se permite agregar 10 listas de precio.</div>');
  }else{
    $('.BoxBotones').show();
  }
};
SalesUp.Variables.CargaIconosCambiarEstatus=function(){
  var htmlActivo='<i class="fa fa-check Inactivar Tip2" tip="Activar">';
  var htmlInactivo='<i class="fa fa-lg fa-times Activar Tip2" tip="Inactivar"></i> ';
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
    var msg=(Number(EstaActivo)==1)? 'inactivar' : 'activar';
    var nombre=$('.Estatus-'+idElemento).attr('data-nombre');
        SalesUp.Construye.MuestraAlerta({
              TipoAlerta:'AlertaPregunta',
              Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/> ¿Está seguro que desea '+msg+' el precio '+nombre+'?',
              Boton1:'Aceptar',
              Boton2:'Cancelar',
              Callback1: 'SalesUp.Variables.Inactivar({id:'+idElemento+', tipo:'+EstaActivo+'})',
              Icono1:'<i class="fa fa-trash"></i>',
              Icono2:'<i class="fa fa-times"></i>',
              Ancho:'300px'
        });
}
SalesUp.Variables.Inactivar=function(Op){
   var idElemento=(Op.id)?Op.id:'';
   var Accion=Op.tipo; 
   var status=(Number(Accion)==1)?0:1;
   var htmlActivo='<i class="fa fa-check Inactivar Tip2" tip="Activar">';
   var htmlInactivo='<i class="fa fa-lg fa-times Activar Tip2" tip="Inactivar"></i>';
   var respuesta=SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonCambiarStatusListasPrecio.dbsp', Parametros:'idprecio='+idElemento+'&status='+status, DataType:'json'}).jsonDatos;
   var respuesta=respuesta[0].STATUS;
    setTimeout(function() {
      if(Number(respuesta)==1){
        $('.Estatus-'+idElemento).html(htmlInactivo).attr('data-activo', 1);
       }else{
        $('.Estatus-'+idElemento).html(htmlActivo).attr('data-activo', 0);;
       }
       SalesUp.Sistema.IniciaPlugins();
    }, 1000);
   
}



$(function(){
	SalesUp.Variables.CreaInterfaz();
});


