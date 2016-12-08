
SalesUp.Variables.MovimientosImpuestos= function (Op){
   var $frm=$('#frmImpuestos');
   var pasa = SalesUp.Valida.ValidaObligatorios({DentroDe:$frm, DestinoMsj:'.BoxBotonesAccion'});
  if(pasa){
    SalesUp.Variables.PreguntaActualizarImpuestosProductos();
  }
}

SalesUp.Variables.PreguntaActualizarImpuestosProductos=function(){
     SalesUp.Construye.MuestraAlerta({
      TipoAlerta:'AlertaPregunta',
      Alerta:'<h4 class="Rojo"><i class="fa fa-warning"></i> Atención</h4> ¿Desea actualizar el impuesto para todos los productos existentes?',
      Boton1:'Sí, aceptar',
      Boton2:'Cancelar',
      Callback2: 'SalesUp.Variables.NoActualizarProductos',
      Callback1: 'SalesUp.Variables.actualizarProductos',
      Icono1:'<i class="fa fa-check"></i>',
      Icono2:'<i class="fa fa-times"></i>',
      Ancho:'100px', 
      Alto: '110px'
    });
}

SalesUp.Variables.NoActualizarProductos = function() {
    SalesUp.Variables.EditarImpuesto({
        actualiza: false
    });
}

SalesUp.Variables.actualizarProductos = function() {
    SalesUp.Variables.EditarImpuesto({
        actualiza: true
    });
}
SalesUp.Variables.EditarImpuesto = function(Op) {

    var actualiza = 0;
    (Op.actualiza) ? actualiza = 1 : '';
    var tk = $('#tk').val();


    if (tk == '') {
        var val = $('#tasa').val();
        val = SalesUp.Variables.QuitaFormato(val) / 100;
        $('#tasa').val(val);
        $('#actualiza').val(actualiza);

        SalesUp.Construye.GuardarPopUp({
            t: $('#BtnAceptar')
        });
        return;
    }


    var tasa           = $('#tasa').val();
    tasa               = SalesUp.Variables.QuitaFormato(tasa) / 100;
    var tk             = $('#tk').val();
    var indice         = $('#indice').val();
    var nombreImpuesto = escape($('#nombreImpuesto').val());
    var respuesta      = SalesUp.Sistema.CargaDatos({
        Link: 'Modelo/jsonActualizarImpuestosEnProductos.dbsp',
        Parametros: 'actualiza=' + actualiza + '&tk=' + tk + '&tasa=' + tasa + '&indice=' + indice + '&nombreImpuesto=' + nombreImpuesto,
        DataType: 'json'
    });
    $('#BtnCancelar').click();
    self.parent.SalesUp.Variables.CamposData();



}



SalesUp.Variables.EnterKey=function(Op){
  var e=(Op.e)? Op.e:''; 
  var t=(Op.t)? Op.t:'';
  e.preventDefault();
  if(SalesUp.Sistema.NumKeyCode(e) === 13){
    SalesUp.Variables.MovimientosImpuestos({t:t});
  }
}

SalesUp.Variables.QuitaFormato = function(value){
  
  var v   = value;
  
  v = accounting.unformat(value, SysSepDecimales)

  if(!v)return 0 
  else return v;
}



$(function(){
  var t=$('#latasa').val();
  t=(t)?t:0;
  t=(t*100).toFixed(2);
  $('#tasa').val(t);

});

