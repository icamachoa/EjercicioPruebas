var Destino = '#DatosLoad';
var IdTabla	= 'TablaMonedas';
Handlebars.registerHelper('formatoMoneda', function() {
  var t=this; 
  var unicode=t.UNICODE;
  var simbolo=t.SIMBOLO;
  if(unicode===8364){
    simbolo='&#8364 ';
   
  }

  var numero=t.TIPODECAMBIO;
  //console.info(numero);
  return new Handlebars.SafeString(SalesUp.Sistema.moneda({numero:numero, moneda:simbolo}));
});

SalesUp.Variables.CatalogoActual = 'Monedas';

SalesUp.Variables.EditarMoneda = function(_tk, idmoneda){


	SalesUp.Sistema.AbrePopUp({
		Parametros	: 'tk=' + _tk+'&idmoneda='+idmoneda,
		Titulo 		: 'Editar moneda', 
		Pagina 		: 'popup_agregar_moneda.dbsp', 
		CallBack 	: 'SalesUp.Variables.CreaInterfaz', 
		Modal  		:true, ModalAlt : true, Alto:175, Ancho:586
	});
};

SalesUp.Variables.AlertaEliminarMoneda = function(Op){
  var $Elemento         = $(Op.e);
  var Pregunta          = $Elemento.attr('data-q');
  var Id                = $Elemento.attr('data-id');
  var IdEmpresaMoneda   = $Elemento.data('idempresamoneda');
  var Funcion           = (Op.Corp) ? Op.Corp : 'SalesUp.Variables.EliminarMoneda';
  var objChecaUsoMonedas= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryVerificaMonedaUso.dbsp', Parametros:'idempresamoneda='+IdEmpresaMoneda,DataType:'json'}).jsonDatos[0];

    if(objChecaUsoMonedas.Respuesta == 0){
      SalesUp.Construye.MuestraAlerta({
        TipoAlerta:'AlertaPregunta',
        Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> ¿Cambiar la moneda de las transacciones a una nueva?',
        Id:'AlertaCambiaMoneda',
        Ancho:'500px'
      });

      var $divBotones = $('#AlertaCambiaMoneda .PieModal');
      $divBotones.html('');
      $divBotones.append('<a class="btnNegativo Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Cancelar" onclick="SalesUp.Construye.CierraAlerta({Elemento:this});"><i class="fa fa-times"></i> Cancelar</a>');
      $divBotones.append('<a class="btnAccion Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" onclick="SalesUp.Variables.CambiarMoneda({Id:'+IdEmpresaMoneda+',Elemento:this,actualiza:1});"><i class="fa fa-trash"></i> Cambiar y elminar</a>');
      //$divBotones.append('<a class="btnAccion Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" onclick="SalesUp.Variables.EliminarMoneda({Id:'+IdEmpresaMoneda+',Elemento:this,actualiza:0});"><i class="fa fa-trash"></i> Solo elminar</a>');
    }else{
      SalesUp.Construye.MuestraAlerta({
        TipoAlerta:'AlertaPregunta',
          Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/>No es posible eliminar esta moneda por que está siendo utilizada por una lista de precios.',
          Boton1:'Aceptar',
          Icono1:'<i class="fa fa-check"></i>',
          Ancho:'100px',
          Id:'alertaModalMoneda'
      });

      var $divBotones = $('#alertaModalMoneda .btnNegativo').remove();
    }
};

SalesUp.Variables.CambiarMoneda = function(obj){
  SalesUp.Construye.CierraAlerta({Elemento:obj.Elemento});

  var opciones = '';

  var objOptiones = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonListaMonedasDisponibles.dbsp',Parametros:'idempresamoneda='+obj.Id, DataType:'json'}).jsonDatos;

  for (var i = 0; i < objOptiones.length; i++) {
    var opcActual = objOptiones[i];
    opciones      = opciones + '<option value="'+opcActual.IDEMPRESAMONEDA+'">'+opcActual.MONEDA+'</option>'
  };

  SalesUp.Construye.MuestraAlerta({
    TipoAlerta:'AlertaPregunta',
    Alerta:'<div class="BoxInfo" style="height:34px !important;">Seleccione la moneda a la que se pasarán las transacciones hechas con la moneda actual</div><div class="BoxInfo"><select class="InfoData" id="MonedaNueva" style="width:100% !important;">'+opciones+'</select></div>',
    Boton1:'Aceptar',
    Boton2:'Cancelar',
    Callback1: 'SalesUp.Variables.EliminarMoneda({Id:"'+obj.Id+'",Elemento:this,actualiza:"'+obj.actualiza+'"})',
    Icono1:'<i class="fa fa-check"></i>',
    Icono2:'<i class="fa fa-times"></i>',
    Ancho:'500px',
    Alto:'100px'
  });
};

SalesUp.Variables.EliminarMoneda = function(Op){
  var idnuevo = 0;

  if(Op.actualiza == 1){
    idnuevo = $('#MonedaNueva').val();
  }

	SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryEliminarMoneda.dbsp', Parametros:'IdEliminar='+Op.Id+'&idnuevo='+idnuevo,DataType:'html'});

  if(Op.actualiza == 0){
    SalesUp.Construye.CierraAlerta({Elemento:Op.Elemento});
  }
  
	SalesUp.Variables.CreaInterfaz();
};

SalesUp.Variables.AlertaCambiaMoneda = function(_tk){
  SalesUp.Construye.MuestraAlerta({
        TipoAlerta:'AlertaPregunta',
        Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> Esta acción cambiará automáticamente <br/>los tipos de cambio de las monedas <br/>¿Desea continuar?',
        Id:'AlertaCambiaMoneda',
        Ancho:'350px'
      });
  setTimeout(function (){
    $('a.btnAccion').removeAttr('onclick')
    $('a.btnAccion').attr('onclick','SalesUp.Variables.CambiarDefault(\''+_tk+'\',this)');
  },500);
}


SalesUp.Variables.CambiarDefault = function(tk,t){
  SalesUp.Sistema.BorrarItemDeAlmacen('SysSimboloMonedaDefault');
	SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryCambiaDefaultMoneda.dbsp', Parametros:'tk='+tk,DataType:'html'});
	SalesUp.Variables.CreaInterfaz();
  SalesUp.Sistema.simboloMonedaDefault();
  SalesUp.Construye.CierraAlerta({Elemento:t});
};

SalesUp.Variables.Recarga = function(_respuesta,_error){
  if(_respuesta){
    SalesUp.Construye.MuestraMsj({tMsg:2, Msg:'Multimoneda activado exitosamente.'});
    SalesUp.Sistema.Relogin();
    document.location = document.location;
  }else if(_error){
    SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'Ha habido un error, por favor intentelo mas tarde.'});
  }
};

SalesUp.Variables.ActivarMultimoneda = function(){
  SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/qryActivaMultimoneda.dbsp',callback:SalesUp.Variables.Recarga});
};

SalesUp.Variables.CreaInterfaz = function(){
  if(SalesUp.Variables.Multimoneda == 0){
    $('#DatosLoad').html('<div class="BoxMsgWarning w100" id="MsgConfigMail">'+
            '<i class="fa fa-lg fa-warning"></i>El soporte para múltiples monedas no se encuentran activo.'+
            '<span onclick="SalesUp.Variables.ActivarMultimoneda();" class="Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar Pointer" id="ConfigCorreo" style="float:right;">'+
            'Activar ahora</span>'+
        '</div>');
  }else{
    $('.btnAgregar').show();

    var datosDetalle  = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonListaMonedas.dbsp', DataType:'json'});

    var NombreCampos  = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateMonedas.dbsp', Parametros:'thead=1', Div:0});
    var TemplateDatos = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateMonedas.dbsp', Parametros:'thead=0', Div:0});
    
    SalesUp.Construye.ConstruyeTabla(NombreCampos, TemplateDatos, datosDetalle.jsonDatos, {Destino:Destino, Id:IdTabla} );
    SalesUp.Sistema.IniciaPlugins();
    SalesUp.Variables.CargaIconosCambiarEstatus();
  }
};




SalesUp.Variables.CargaIconosCambiarEstatus=function(){
  var htmlActivo='<i class="fa fa-check Inactivar" ></i> Activar';
  var htmlInactivo='<i class="fa fa-times Activar"></i> Inactivar';
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
    var idElemento=(Op)? Op:'';
    var EstaActivo=$('.Estatus-'+idElemento).attr('data-Activo');
    var msg=(Number(EstaActivo)==1)? 'inactivar' : 'activar';
    var nombre=$('.Estatus-'+idElemento).attr('data-nombre');
        SalesUp.Construye.MuestraAlerta({
              TipoAlerta:'AlertaPregunta',
              Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/> ¿Está seguro que desea '+msg+' la moneda '+nombre+'?',
              Boton1:'Aceptar',
              Boton2:'Cancelar',
              Callback1: 'SalesUp.Variables.Inactivar({id:'+idElemento+', tipo:'+EstaActivo+'})',
              Icono1:'<i class="fa fa-trash"></i>',
              Icono2:'<i class="fa fa-times"></i>',
              Ancho:'300px'
        });
}
SalesUp.Variables.Inactivar=function(Op){
   var idElemento   =(Op.id)?Op.id:'';
   var Accion       =Op.tipo; 
   var status       =(Number(Accion)==1)?0:1;
   var htmlActivo   ='<i class="fa fa-check Inactivar" ></i> Activar';
   var htmlInactivo ='<i class="fa fa-times Activar"></i> Inactivar';

   var respuesta=SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonCambiarStatusMonedas.dbsp', Parametros:'idmoneda='+idElemento+'&status='+status, DataType:'json'}).jsonDatos;
   var respuesta=respuesta[0].STATUS;
    setTimeout(function() {
      SalesUp.Variables.CreaInterfaz();
      if(Number(respuesta)==1){
         $('.Estatus-'+idElemento).html(htmlInactivo).attr('data-activo', 1);
       }else{
        $('.Estatus-'+idElemento).html(htmlActivo).attr('data-activo', 0);
       }
       SalesUp.Sistema.IniciaPlugins();
    }, 1000);
   
}

$(function(){
	SalesUp.Variables.CreaInterfaz();
});

