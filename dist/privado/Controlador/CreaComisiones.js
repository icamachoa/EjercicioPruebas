SalesUp.Variables.CrearComisiones = function(Op){
  var $frm=$('#frmComision');
  var pasa = SalesUp.Valida.ValidaObligatorios({DentroDe:$frm, DestinoMsj:'.BoxBotonesAccion'});
  var d=$('#descripcion').val();
  (pasa)?pasa=SalesUp.Variables.ValidarDescripcionDuplicada({v:d}):''; 
  if(pasa){
   SalesUp.Variables.PreguntaActualizarComisionEnProductos();
  }
};

SalesUp.Variables.ValidarDescripcionDuplicada=function(Op){
    var Existe=true;
    var valor=(Op.v)?Op.v:'';
    valor=escape(valor);
    var tk=$('#tk').val();
    if(tk!=''){return true;}
    if(valor!=''){
      var respuesta=SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonValidarComisionesDuplicadas.dbsp', Parametros:'descripcion='+valor, DataType:'json'}).jsonDatos;  
          respuesta=respuesta[0].DESCRIPCION;
          respuesta=escape(respuesta);
      if(respuesta==valor){
         SalesUp.Construye.MuestraMsj({tMsg:4, DentroDe:'#popup-contenedor', Destino:'.BoxBotonesAccion', Msg:'Ya existe la descripción.' });
        Existe=false;
      }     
    }
    return Existe;
}
SalesUp.Variables.MuestraEditarComision=function(Op){
   var tk=(Op.tk)?Op.tk:'';
   var respuesta=SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonEditarComisionProducto.dbsp', Parametros:'tk='+tk, DataType:'json'}).jsonDatos;  
       respuesta=respuesta[0];
   var descripcion=respuesta.DESCRIPCION; 
   var comision=respuesta.MONTO; 
       comision=(comision*100).toFixed(2);
   var indice=respuesta.INDICE; 
   $('#descripcion').val(descripcion);
   $('#monto').val(SalesUp.Variables.FormatoMonedaLocal(comision));   
   $('#indice').val(indice);
}

SalesUp.Variables.SinFormato=function(v){
    var SysSepDecimales = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});
    return accounting.unformat(v, SysSepDecimales);
}

 SalesUp.Variables.GuardarConEnter=function(Op){
    var e=(Op.e)?Op.e:'';
    var t=(Op.t)?Op.t:'';
    if(SalesUp.Sistema.NumKeyCode(e) === 13){
      SalesUp.Variables.CrearComisiones({t:t});
    }
 
 }

SalesUp.Variables.numerosDecimales = function(Op){ 
  var expresion=/(?:\d*\.)?\d+/;
  var t = (Op.t)?Op.t:'';
  
  var num = $(t).val();
  var esDecimal = (num!='') ? expresion.test(num) : true;
  var mensaje = 'Soló se permiten <strong>números decimales</strong>';
  if(!esDecimal){
      SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'.BoxBotonesAccion', Msg:mensaje });
      SalesUp.Valida.MarcarObligatorio($(t));
      SalesUp.Valida.FocusMal();
    return esDecimal;
  }
  return esDecimal;
}

SalesUp.Variables.PreguntaActualizarComisionEnProductos=function(){
    SalesUp.Construye.MuestraAlerta({
      TipoAlerta:'AlertaPregunta',
      Alerta:'<h4 class="Rojo"><i class="fa fa-warning"></i> Atención</h4> ¿Desea actualizar la comisión para todos los productos existentes?',
      Boton1:'Sí, aceptar',
      Boton2:'Cancelar',
      Callback2: 'SalesUp.Variables.NoActualizarProductos',
      Callback1: 'SalesUp.Variables.actualizarProductos',
      Icono1:'<i class="fa fa-check"></i>',
      Icono2:'<i class="fa fa-times"></i>',
      Ancho:'50px', 
      Alto: '110px'
      
    });

}

SalesUp.Variables.NoActualizarProductos = function(){ 
  SalesUp.Variables.EditarComision({actualiza:false});
}

SalesUp.Variables.actualizarProductos = function(){
  SalesUp.Variables.EditarComision({actualiza:true}); 
}
SalesUp.Variables.EditarComision=function(Op){
  var actualiza=0; 
  (Op.actualiza)? actualiza = 1:'';
   var tk=$('#tk').val();
   //console.info(tk, 'tk');
  if( _.isEmpty(tk)){
    var m=$('#monto').val();
    m=SalesUp.Variables.QuitaFormato(m)/100;
    $('#monto').val(m);
    $('#actualiza').val(actualiza);
    SalesUp.Construye.GuardarPopUp({t:$('#BtnAceptar')});
    return;
  }
   var monto=$('#monto').val();
       monto=SalesUp.Variables.QuitaFormato(monto)/100;
   var indice=$('#indice').val(); 
   var descripcion=escape($('#descripcion').val());
   var respuesta=SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonActualizarComisionEnProductos.dbsp', Parametros:'actualiza='+actualiza+'&tk='+tk+'&monto='+monto+'&indice='+indice+'&descripcion='+descripcion,  DataType:'json'});
   $('#BtnCancelar').click();
   self.parent.SalesUp.Variables.MuestraComisiones();
}


var SysSepDecimales = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});

SalesUp.Variables.FormatoMonedaLocal = function (Numero){
  
    var MonedaFormato='%s%v';
    var SysMoneda = '';
      SysMoneda = SalesUp.Sistema.StrReplace('.','', SysMoneda);
      SysMoneda = SalesUp.Sistema.StrReplace(',','', SysMoneda);
    var SysFormatoMoneda = SalesUp.Sistema.Almacenamiento({a:'SysFormatoMoneda'});
    var SysSepMiles = SalesUp.Sistema.Almacenamiento({a:'SysSepMiles'});
    var SysSepDecimales = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});
    
    (!SysSepMiles)?SysSepMiles=',':'';
    (!SysSepDecimales)?SysSepDecimales='.':'';
    (!SysFormatoMoneda)?SysFormatoMoneda=0:'';
    (SysFormatoMoneda==0)?MonedaFormato='%s%v':'';
    (SysFormatoMoneda==1)?MonedaFormato='%v%s':'';
    (SysFormatoMoneda==2)?MonedaFormato='%s %v':'';
    (SysFormatoMoneda==3)?MonedaFormato='%v %s':'';

    return accounting.formatMoney(Numero, SysMoneda, 2, SysSepMiles, SysSepDecimales, MonedaFormato);
  }


SalesUp.Variables.QuitaFormato = function(value){
  
  var v   = value;
  
  v = accounting.unformat(value, SysSepDecimales)

  if(!v)return 0 
  else return v;
}




