
/******************  Funciones de Estado Inicial  ********************/
var jsonDatosPagos;

//SalesUp.Variables.CargarListaPagosDB
SalesUp.Variables.CargarListaPagosDB=function(){
     var separador=$('#separadorDecimal').val();
     var idventa=$('#idventa').val();
         jsonDatosPagos=self.parent.SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonConsultarPagosVenta.dbsp', Parametros:'idventa='+idventa, DataType:'json'});
        
        jsonDatosPagos=jsonDatosPagos.jsonDatos;
     var monto;
     var html='';
     var tipocomi= $('#tipoComision').val();
     for(var i=0; i<=jsonDatosPagos.length-1; i++){
          monto=(jsonDatosPagos[i].MONTO)?jsonDatosPagos[i].MONTO:'0';
          fecha=jsonDatosPagos[i].FECHAHORA;
          fecha=(fecha)?fecha=fecha:'';
          comision=(jsonDatosPagos[i].COMISION)?jsonDatosPagos[i].COMISION:'0';
          pagado=(jsonDatosPagos[i].PAGADO)?jsonDatosPagos[i].PAGADO:'0';
          referencia=jsonDatosPagos[i].REFERENCIA;
          referencia=(referencia)?referencia=referencia: '';
          configuracion = jsonDatosPagos[i].CONFIGURACION;
          envios = jsonDatosPagos[i].ENVIOS;
         
          html+='<div id="p'+(i+1)+'" class="w100 cajaPagos"><input type="hidden" name="par'+(i+1)+'" value="'+(i+1)+'">';
          html +='<div class="InfoBox w25">';
          if(i+1=='1'){
              html+='<label for="pago'+(i+1)+'" class="LabelInfo Tip2 Ellipsis" tip="Monto del pago anticipo">Anticipo</label>';
            }else{
              html +='<label for="pago'+(i+1)+'" class="LabelInfo Tip2 Ellipsis" tip="Monto del pago '+(i+1)+' " >Pago '+(i+1)+'</label>'; 
            }
          html +='<input name="pago'+(i+1)+'"  id="pago'+(i+1)+'" data-pagoCambio="0" class="corto1 obligatorio espacior DataInfo" maxlength="10" type="text"  value="'+monto+'" onkeypress="return ValidateFloatCharacter(event, this, \''+separador+'\')" onchange="SalesUp.Variables.CambiarPagosManual('+(i+1)+');"></div>';
          html+='<div class="InfoBox w15 pl5 pr5"><input name="comision'+(i+1)+'" id="comision'+(i+1)+'" value="'+comision+'" class="corto1a espacio w100" maxlength="10 " type="text" onkeypress="return ValidateFloatCharacter(event, this,\''+separador+'\')" onChange="SalesUp.Variables.CambiarComisionesManual('+(i+1)+');"  readonly/></div>';                          
          html+='<div class="InfoBox w15 pl5 pr5"><input name="fecha'+(i+1)+'" id="fecha'+(i+1)+'" value="'+fecha+'" class="tCen Fecha espacio w100" maxlength="12" type="text" readonly></div><div class="InfoBox w30 pl5 pr5">';
          html+='<input name="referenciaventa'+(i+1)+'" id="referenciaventa'+(i+1)+'" value="'+referencia+'" class="referencia espacio w100" type="text" ></div>';                       
          html+='<input name="configuracion'+(i+1)+'" id="configuracion'+(i+1)+'" value="'+configuracion+'" class="configuracion" type="hidden" >';
          html+='<input name="envios'+(i+1)+'" id="envios'+(i+1)+'" value="'+envios+'" class="envios" type="hidden" >';
          html+='<div class="InfoBox w15 pl5 pr5"><span for="pagado'+(i+1)+'" id="labelpagado'+(i+1)+'" tip="Click para cambiar estatus del pago" class="Btn btnAccion Btn-rounded Btn-tiny Btn-block Btn-flat-Aceptar LabelInfo porcobrar paragris Tip8 Pointer" onclick="SalesUp.Variables.CambiaStatusPago('+(i+1)+');">Por cobrar</span>';
          html+='<input type="hidden" id="pagado'+(i+1)+'" value="'+pagado+'" class="elpago" name="pagado'+(i+1)+'"></div></div>';  

     }
    $('#lospagos').append(html);
}
//SalesUp.Variables.CrearSelectPagos
SalesUp.Variables.CrearSelectPagos=function (){
       var htmlSelect='';
       htmlSelect+='<select name="noexhibiciones" id="noexhibiciones" onChange="cambiarCantidadPagos(value);" class="InfoData">';
       for(var i=0; i<96; i++){
         htmlSelect+='<option class="totpag'+(i+1)+'"  value ="'+(i+1)+'">'+(i+1)+'</option>';
       }
       htmlSelect+='</select>';
       $('#datosPagos').append(htmlSelect);
}

//SalesUp.Variables.CrearSelectPeriocidad();
SalesUp.Variables.CrearSelectPeriocidad=function(){
         var html='';
         html+='<option value="5" >Anual</option>';
         html+='<option value="2" >Bimestral</option>';
         html+='<option value="1">Mensual</option>';
         html+='<option value="6" >Otro</option>';
         html+='<option value="3" >Trimestral</option>';
         html+='<option value="8" >Quincenal</option>';
         html+='<option value="7" >Semanal</option>'; 
         html+='<option value="4" >Semestral</option>';
         $('#periodicidad').append(html);
         var periocidadSelect=$('#tipoPeriocidad').val();
         setTimeout(function() {$('#periodicidad').val(periocidadSelect);}, 1000);
   
} 

//SalesUp.Variables.CrearSelectTipoComision
SalesUp.Variables.CrearSelectTipoComision=function(){
      var html='';
          html+='<option value="0" >Prorateadas</option>';
          html+='<option value="1" >Primer pago</option>';
          html+='<option value="2" >Ultimo pago</option>';
          html+='<option value="3" >Manual</option>';
          $('#comision_modo').append(html);
      var comisionSelect= $('#tipoComision').val();
      setTimeout(function() {$('#comision_modo').val(comisionSelect);}, 1000);

}
SalesUp.Variables.RestriccionesPagos=function(pago){
    for(var i=0; i<=pago.length-1; i++){
        $('#pago'+pago[i]+', #comision'+pago[i]+', #fecha'+ pago[i]+', #referenciaventa'+pago[i]).addClass('colorpagado').attr('readonly', 'readonly');
        $('#labelpagado'+pago[i]).removeClass('btnAccion').addClass('btnNeutral').html('Pagado');
      }
}

SalesUp.Variables.PagosRealizados=function(){
    var pagos_a_realizar = parseInt($('#noexhibiciones').val());
    var Pagados = [];
    for(var i=1; i<=pagos_a_realizar; i++){
        var t = $('#lospagos #p'+i).find('#pagado'+i+'[value="1"]').attr('id');
        if(_.size(t)){
            var r=t.substring(8,6); 
            Pagados.push(r);
        }
    }

    return Pagados;
}
SalesUp.Variables.ContadorPagos=function(a){
   var monto_total= $('#monto').val();  //Pago Total
       monto_total=sinFormato(monto_total);
     
   var pagos=parseFloat(0);
   for(var i=0; i<=a.length-1; i++){
     var p=$('#pago'+a[i]).val();
         p=sinFormato(p);
         p=parseFloat(p);
         pagos=parseFloat(pagos)+parseFloat(p);
         pagos=pagos.toFixed(2);
   }
   monto_total=parseFloat(monto_total)-parseFloat(pagos);
   monto_total=monto_total.toFixed(2);
   $('#totalPago').val(parseFloat(pagos));
   $('#saldo').val(parseFloat(monto_total));
}

/****************** FIN Funciones de Estado Inicial  ********************/



/****************** INICIO Cambios de ESTADOS  ********************/
//SalesUp.Variables.CambiarMontoPago();

SalesUp.Variables.ValidaNoCamposVacios=function(e){
  var vacio;
  var ValorElemento=$('#'+e).val();
  if((ValorElemento=='')||(ValorElemento<0) ){
     $('#'+e).addClass('DatoMal');
     if(e!='comision_pct'){
      $('#'+e).prev().addClass('InfoDatoMal');
     }
      
      $('#'+e).val('');
      $('#'+e).attr('placeholder', 'Ingresar cantidad');
      $('#'+e).focus();

    SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'No puedes dejar Campos Vacios'});
    vacio=false;
  }else{
    $('#'+e).removeClass('DatoMal');
    $('#'+e).prev().removeClass('InfoDatoMal');    
    return true;
    vacio=true;
  }
  return vacio;
}
/**/
function sinFormato(v) {
  var SysSepDecimales = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});
  return accounting.unformat(v, SysSepDecimales);
}
/**/
SalesUp.Variables.CambiarMontoPago=function(){
  var resultado=SalesUp.Variables.ValidaNoCamposVacios('monto');
  if(!resultado){return;}
 var m=$('#monto').val();
     m=sinFormato(m);
     $('#saldo').val(m);

  var Pasa=SalesUp.Variables.ValidarMontoCorrecto();
  var pagos=[];
      pagos=SalesUp.Variables.PagosRealizados();
      SalesUp.Variables.RecalcularPagosPorExhibiciones(pagos);
      SalesUp.Variables.CalcularComisiones();
}

function cambiarCantidadPagos(total){
    var separador=$('#separadorDecimal').val();
    var totalCreados=$('.cajaPagos').length; 
    var totalNuevos=total;//$('#noexhibiciones').val();
    if(totalCreados<totalNuevos){
          var html='';
          var cantidadPagos=$('.cajaPagos'); 
          cantidadPagos=parseInt(cantidadPagos.length);
          total=parseInt(total); 
          var punto="'.'";
          punto=punto.toString();
     for(var i=totalCreados; i<=total-1; i++){
          html+='<div id="p'+(i+1)+'" class="w100 cajaPagos"><input type="hidden" name="par'+(i+1)+'" value="'+(i+1)+'">';
          html +='<div class="InfoBox w25">';
          html +='<label for="pago'+(i+1)+'" class="LabelInfo Tip2 Ellipsis" tip="Monto del pago '+(i+1)+' " >Pago '+(i+1)+'</label>'; 
          html +='<input name="pago'+(i+1)+'" id="pago'+(i+1)+'" data-pagoCambio="0" class="corto1 obligatorio espacior DataInfo" maxlength="10" type="text" onkeypress="return ValidateFloatCharacter(event, this,\''+separador+'\')" onchange="SalesUp.Variables.CambiarPagosManual('+(i+1)+');"></div>';
          html+='<div class="InfoBox w15 pl5 pr5"><input name="comision'+(i+1)+'" id="comision'+(i+1)+'" class="corto1a espacio w100" maxlength="10" type="text" onkeypress="return ValidateFloatCharacter(event, this,\''+separador+'\')" onChange="SalesUp.Variables.CambiarComisionesManual('+(i+1)+');" readonly/></div>';                          
          html+='<div class="InfoBox w15 pl5 pr5"><input name="fecha'+(i+1)+'" id="fecha'+(i+1)+'" class="tCen  Fecha espacio w100" maxlength="12" type="text" readonly></div><div class="InfoBox w30 pl5 pr5"><input name="referenciaventa'+(i+1)+'" id="referenciaventa'+(i+1)+'" value="" class="referencia espacio w100" type="text" ></div>';                       
          html+='<div class="InfoBox w15 pl5 pr5"><span for="pagado'+(i+1)+'" id="labelpagado'+(i+1)+'" tip="Click para cambiar estatus del pago" class="Btn btnAccion Btn-rounded Btn-tiny Btn-block Btn-flat-Aceptar LabelInfo porcobrar paragris Tip8 Pointer" onclick="SalesUp.Variables.CambiaStatusPago('+(i+1)+');">Por cobrar</span>';
          html+='<input type="hidden" id="pagado'+(i+1)+'" value="0" class="elpago" name="pagado'+(i+1)+'"></div></div>';  
        }
        $('#lospagos').append(html);
    }else if(totalNuevos<totalCreados){
        for(var i=totalCreados; i>=totalNuevos; i--){
          if(totalNuevos!=i){
            $('#p'+i).remove();
          }
        }
    }
       var pagos=[];
       pagos=SalesUp.Variables.PagosRealizados();
       SalesUp.Variables.RestriccionesPagos(pagos);
       SalesUp.Variables.ContadorPagos(pagos);
       SalesUp.Variables.RecalcularPagosPorExhibiciones(pagos);
       //SalesUp.Variables.CalCularComisiones();
       SalesUp.Variables.ReCalCularComisiones();
       SalesUp.Variables.CalcularFecha();

}
 //SalesUp.Variables.ActualizarmontoOportunidad()
SalesUp.Variables.ActualizarMontoOportunidad=function(){
        var montoVenta=$('#monto').val();
        var idop=$('#idoportunidad').val();
        if(montoVenta!=montoOportunidad){
            SalesUp.Sistema.CargaDatos({Link:'Modelo/qryActualizarMontoOportunidad.dbsp', Parametros:'monto='+montoVenta+'&idoportunidad='+idop});
        }
}

SalesUp.Variables.CambiarColorPagado=function(i){
    var estapagado=$('#pagado'+i).val();
    if(estapagado=='1'){
            $('#pago'+i+', #fecha'+i+', #comision'+i+',#referenciaventa'+i).addClass('colorpagado').attr('readonly', 'readonly');
        }else{
            $('#pago'+i+', #fecha'+i+', #comision'+i+',#referenciaventa'+i).removeClass('colorpagado').removeAttr('readonly', 'readonly');
            $('#fecha'+i).attr('readonly', 'readonly');
        }
    //$('#pago'+i+', #comision'+i+', #fecha'+i+', #referenciaventa'+i'').addClass('colorpagado').attr('disabled', 'disabled');
    //  background: rgb(79, 6, 0);
}

SalesUp.Variables.CambiaStatusPago=function(i){
  var x=$('div#p'+i).find('#pagado'+i); 
      x=$(x).val();

  if(x=='1'){
     $('#labelpagado'+i).removeClass('btnNeutral').addClass('btnAccion').html('Por cobrar');
     $('#pagado'+i).val(0);
     
  }else{
         $('#labelpagado'+i).removeClass('btnAccion').addClass('btnNeutral').html('Pagado');
       $('#pagado'+i).val(1);

  }
  SalesUp.Variables.CambiarColorPagado(i);
  SalesUp.Variables.ValidarEliminarSelectPagados();
  var pagos=[];
  pagos=SalesUp.Variables.PagosRealizados();
  // SalesUp.Variables.RestriccionesPagos(pagos);
  SalesUp.Variables.ContadorPagos(pagos);
  SalesUp.Variables.ValidarMontoTotalPagado();
  
}





/****************** FIN Cambios de ESTADOS  ********************/


/****************** INICIO CALCULO DE DATOS   ********************/

SalesUp.Variables.CalcularComisiones=function(){
  var separador=$('#separadorDecimal').val();
      var resultado=SalesUp.Variables.ValidaNoCamposVacios('comision_pct');
  if(!resultado){return;}
    var monto=$('#monto').val();
        monto =sinFormato(monto);
    var comisionPorcentaje=$('#comision_pct').val();
        comisionPorcentaje=sinFormato(comisionPorcentaje);
    var comisionGlobal=monto*comisionPorcentaje/100;
        //comisionGlobal=sinFormato(comisionGlobal);
    if((comisionGlobal=='Infinity') || (comisionGlobal=='NaN')){comisionGlobal=0;}
      comisionGlobal=accounting.formatNumber(comisionGlobal, 2, '', separador);
      $('#comision_monto').val(comisionGlobal); //comisionGlobal.toFixed(2)
    //Ajustas los pagos de comisiones
    var r=SalesUp.Variables.ValidarMontoComisionCorrecto();
    if(r){SalesUp.Variables.ReCalCularComisiones();}
}
SalesUp.Variables.CalcularPorcentajeComisiones=function(){
  //ValidarNOVacio
    var resultado=SalesUp.Variables.ValidaNoCamposVacios('comision_monto');
  if(!resultado){return;}
    var monto=$('#monto').val();
        monto=sinFormato(monto);
    var comision=$('#comision_monto').val();
        comision=sinFormato(comision);
    var comisionPorcentaje=(comision/monto)*100;
        comisionPorcentaje=comisionPorcentaje.toFixed(2);
        if((comisionPorcentaje==='Infinity') || (comisionPorcentaje==='NaN')){comisionPorcentaje=0;}
        $('#comision_pct').val(comisionPorcentaje);
        //SalesUp.Variables.CalCularComisiones();
    var r= SalesUp.Variables.ValidarMontoComisionCorrecto();
    if(r){SalesUp.Variables.ReCalCularComisiones();}   
        
   
}

SalesUp.Variables.RecalcularPagosPorExhibiciones=function(arrayPagos){
    var separador=$('#separadorDecimal').val();
    var arrayPagos=SalesUp.Variables.PagosRealizados();
    var monto=$('#monto').val();  //Monto total
        monto=sinFormato(monto);
    var noExhibiciones=$('#noexhibiciones').val(); //Cantitdad de pagos
    var totalpagado=$('#totalPago').val(); //Lo que ya se pago.
        //totalpagado=sinFormato(totalpagado);
    var miSaldo=parseFloat(monto)-parseFloat(totalpagado); //Falta por pagar
    var cuantosPagos=arrayPagos.length; //Número de pagos (entero)
    var cadapago=(parseFloat(monto-totalpagado)/parseFloat(noExhibiciones-cuantosPagos)).toFixed(2); //mis pagos nuevos(cada uno)
    var sumacadapago=parseFloat(cadapago*(noExhibiciones-cuantosPagos)); //Sumatoria de cadapago menos uno.
        sumacadapago=sumacadapago.toFixed(2);
    var sobrante=parseFloat(miSaldo-sumacadapago); 
        sobrante=sobrante.toFixed(2);
    var ultimoPago=parseFloat(cadapago)+parseFloat(sobrante);//al ultimo pago se le suma el saldo restante para que cuadre la suma total
        ultimoPago=ultimoPago.toFixed(2);  

    var sumaTotal=parseFloat(parseFloat((cadapago-1)*(noExhibiciones-cuantosPagos))+parseFloat(ultimoPago));    
        cadapago=accounting.formatNumber(cadapago, 2, '', separador);
        ultimoPago=accounting.formatNumber(ultimoPago, 2, '', separador);
    var x=  $('.corto1').not('.colorpagado');
    var tp=noExhibiciones-cuantosPagos; 
    for(var i=0; i<=tp-1; i++){
      var a=$(x[i]).attr('id');
      if(i==tp-1){
        $('#'+a).val(ultimoPago);
      }else{
        $('#'+a).val(cadapago);
      }
    }

} // fin. RecalcularPagosPorExhibiciones

SalesUp.Variables.ReCalCularComisiones=function(){
var separador=$('#separadorDecimal').val();
var   pagos=[];
      pagos=SalesUp.Variables.PagosRealizados();
var   sumacomisiones=0; 
var   tipo=$('#comision_modo').val();
var   cantidadpagos=$('#noexhibiciones').val();  
var   comision=$('#comision_monto').val(); 
      comision=sinFormato(comision);
      for(var i=0; i<=pagos.length-1; i++){
        sumacomisiones+=parseFloat($('#comision'+pagos[i]).val());
      }
      sumacomisiones=sumacomisiones.toFixed(2);
      sumacomisiones=sinFormato(sumacomisiones);

var   nuevaComision=parseFloat(comision)-parseFloat(sumacomisiones);  
      nuevaComision=nuevaComision.toFixed(2);
var   pagoscomision=parseFloat(nuevaComision/(cantidadpagos-pagos.length)).toFixed(2);
if((pagoscomision==='Infinity') || (pagoscomision=='NaN')){pagoscomision=0;}
var   saldo=nuevaComision-(pagoscomision*(cantidadpagos-pagos.length));
      saldo=saldo.toFixed(2);
var   ultimoPago=parseFloat(pagoscomision)+parseFloat(saldo);
      ultimoPago=ultimoPago.toFixed(2);
      if((ultimoPago==='Infinity') || (ultimoPago=='NaN')){ultimoPago=0;}
var   sumaParcial=parseFloat(ultimoPago)+parseFloat(pagoscomision*((cantidadpagos-1)-pagos.length));
var   tot=parseFloat(sumaParcial)+parseFloat(sumacomisiones);
var   tp=cantidadpagos-pagos.length; 
var   x=$('.corto1a').not('.colorpagado');
      ultimoPago=accounting.formatNumber(ultimoPago, 2, '', separador);
      pagoscomision=accounting.formatNumber(pagoscomision, 2, '', separador);

//prorrateadas 
if(tipo=='0'){
  for(var i=0; i<=x.length-1; i++){
      var a=$(x[i]).attr('id');
      if(i==(x.length-1)){
          $('#'+a).val(ultimoPago);
      }else{
        $('#'+a).val(pagoscomision);
      }
   }//Fin for   
}else if(tipo=='1'){  //primer pago
  var id=$(x[0]).attr('id');
  for(var r=0; r<=x.length-1; r++){
    var id= $(x[r]).attr('id');
    if(r==0){
      $('#'+id).val(nuevaComision);
    }else{
      $('#'+id).val(parseFloat(0));
    }
  }//fin for
}else if(tipo=='2'){ //ultimopago
for(var i=0; i<=x.length-1; i++){
    var id=$(x[i]).attr('id');
    if(i==x.length-1){
       $('#'+id).val(nuevaComision);
       }else{
          $('#'+id).val(parseFloat(0));
       }
   }
}else if(tipo=='3'){
  
  for(var i=0; i<=x.length-1; i++){
    var id=$(x[i]).attr('id');
            $('#'+id).val('');
            $('#'+id).removeAttr('readonly');
            $('#'+id).attr('placeholder', 'Ingresa el pago');
   }
}  

} //Fin  ReCalCulaComisiones

SalesUp.Variables.CalcularFecha=function(){

var xx=$('.corto1').not('.colorpagado');
var tipo=$('#periodicidad').val();
var veces=$('#noexhibiciones').val();
var incrementa=1;
var t='M';
if(tipo=='2'){incrementa=2;} 
if(tipo=='3'){incrementa=3;}
if(tipo=='4'){incrementa=6;}
if(tipo=='5'){incrementa=12;}
if(tipo=='6'){/*Do Something */ }
if(tipo=='7'){incrementa=7;t='d';}
if(tipo=='8'){incrementa=15;t='d';}
var f=$('#fecha1').val() 
var Fecha=f.split('/');
var dia=Fecha[0];
var mes=Fecha[1];
var anio=Fecha[2]; 
var nuevaFecha=anio+'/'+mes+'/'+dia
f=moment(nuevaFecha);

 var fecha1=$('#fecha1').hasClass('colorpagado');

  if(!fecha1){
      var r=1;
    }else{var r=0;}
for(var i=r; i<=xx.length-1; i++){
  var a=$(xx[i]).attr('id');
  var a=a.substring(6,4);
  if(tipo=='6'){
    $('#fecha'+a).val('');
    $('#fecha'+a).attr('placeholder','DD/MM/AAAA');
    $('#fecha'+a).addClass(' InfoObligatorio');
  }else{

    var x=f.add(t,incrementa).format('DD/MM/YYYY'); 
    $('#fecha'+a).val(x);
    //$('#fecha'+a).removeClass('Fecha InfoObligatorio').datepicker("destroy");

  }
}
SalesUp.Sistema.IniciaPickers();

}
SalesUp.Variables.CambiarComisionesManual=function(i){
    var separador=$('#separadorDecimal').val();
    var ok=SalesUp.Variables.ValidarComisionesNoVacios(i);
    
    if(ok){
      var x=$('.corto1a').not('.colorpagado');
      var comision=$('#comision_monto').val();   
      var pago=$('#comision'+i).val();
      var p=SalesUp.Variables.PagosRealizados();
      var sumaPagos=parseFloat(0);
      for(var a=0; a<=p.length-1; a++){
          sumaPagos+=parseFloat($('#comision'+p[a]).val());  
        }
      sumaPagos=sumaPagos.toFixed(2);
      var Pasa=SalesUp.Variables.ValidarExcesoComisiones(sumaPagos,i);
      if(Pasa){
          var   nuevaComision=parseFloat(comision)-parseFloat(sumaPagos); 
                nuevaComision=parseFloat(nuevaComision)-parseFloat(pago);
                nuevaComision=nuevaComision.toFixed(2);
          var   cantidadNuevosPagos=(x.length-1);
          var   pagoscomision=parseFloat(nuevaComision/cantidadNuevosPagos).toFixed(2); 
                pagoscomision=accounting.formatNumber(pagoscomision, 2, '', separador);
        for(var r=0; r<=x.length-1; r++){
            var s=$(x[r]).attr('id');
            var t='comision'+i;
            if(s!=t){
              $('#'+s).val(pagoscomision);
            }   
        }
      }
  
    } //fin if(ok)
}

SalesUp.Variables.CambiarPagosManual=function(value){
  var separador=$('#separadorDecimal').val();
  var i=value;
  var P=SalesUp.Variables.ValidarPagosNoVacios(i);
  var pagoAct=$('#pago'+i).val();
      pagoAct=sinFormato(pagoAct);
  if(P){
    var x=$('.corto1').not('.colorpagado');
    var montoTotal=parseFloat($('#monto').val());
        montoTotal=sinFormato(montoTotal);
    var montoParcial=parseFloat($('#totalPago').val());
        montoParcial=sinFormato(montoParcial);
    var Pasa=SalesUp.Variables.ValidarExcesoPagos(montoParcial, value);
    if(Pasa){
    var cantidadPagos=x.length; 
    var saldo=$('#saldo').val();

        //saldo=sinFormato(saldo);
        saldo=parseFloat(saldo)-parseFloat(pagoAct);
    var pagos=parseFloat(saldo/(cantidadPagos-1));
        pagos=sinFormato(pagos);
        pagos=pagos.toFixed(2); 
    var faltante=parseFloat(saldo)-parseFloat((pagos*(cantidadPagos-1)));
    var ultimoPago=parseFloat(pagos)+parseFloat(faltante); 
        ultimoPago=ultimoPago.toFixed(2);
        ultimoPago=accounting.formatNumber(ultimoPago, 2, '', separador);
        pagos=accounting.formatNumber(pagos, 2, '', separador);
    var noCambiar=$('#pago'+i).attr('id');
    var tp=x.length;
    for(var i=0; i<=tp-1; i++){
        var r=$(x[i]).attr('id');
      if(noCambiar!=r){
          if(i==tp-1){
            $('#'+r).val(ultimoPago);
          }else {
            $('#'+r).val(pagos);
          } 
      }
    }
  } //fin if(Pasa)
  } //Fin if(P)  
}
/****************** FIN CALCULO DE DATOS   ********************/



/*******************INICIO VALIDACIONES   **********************/
SalesUp.Variables.ValidarComisionesVaciosSubmit=function(){
  var pagos=$('.cajaPagos');
  var texto='La/Las ';
  var texto2='';
  var vacios=true;
  for(var i=0; i<=pagos.length-1; i++){
      x=$('#comision'+(i+1)).attr('id');
      y=$('#'+x).val();
      if(y==''){
    
        texto+=' '+x+', ';
        vacios=false;
      }
  }
  //texto+=texto2;
  if(!vacios){
    texto+=' requieren información'; 
    texto+='<br> Asegurese de llenar correctamente.';
    SalesUp.Construye.MuestraMsj({tMsg:4, Msg:texto, NoCerrar:true});
  }
  return vacios;
}
SalesUp.Variables.ValidarPagosVaciosSubmit=function(){
  var pagos=$('.cajaPagos');
  var texto='El/Los ';
  var vacios=true;
for(var i=0; i<=pagos.length-1; i++){
  x=$('#pago'+(i+1)).attr('id');
  y=$('#'+x).val();
  if(y==''){
    texto+=''+x;
    vacios=false;
  }
  
}
if(!vacios){
  texto+=', requieren información'; 
  texto+='<br> Asegurese de llenar correctamente.';
  SalesUp.Construye.MuestraMsj({tMsg:4, Msg:texto, NoCerrar:true});
}
return vacios;
}


SalesUp.Variables.ValidarComisionesNoVacios=function(i){
    var pago=$('#comision'+i).val();
    if(pago==''){
      $('#comision'+i).addClass('DatoMal');
      $('#comision'+i).prev().addClass('InfoDatoMal');
      $('#comision'+i).val('');
      $('#comision'+i).attr('placeholder', 'Ingresar Cantidad');
      $('#comision'+i).focus();
    SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'No puedes dejar Campos Vacios'});
    return false;
  }else{
    $('#comision'+i).removeClass('DatoMal');
    $('#comision'+i).prev().removeClass('InfoDatoMal');    
    return true;
  }
}

SalesUp.Variables.ValidarPagosNoVacios=function(i){
    var pago=$('#pago'+i).val();
    if(pago==''){
      $('#pago'+i).addClass('DatoMal');
      $('#pago'+i).prev().addClass('InfoDatoMal');
      $('#pago'+i).val('');
      $('#pago'+i).attr('placeholder', 'Ingresar Cantidad');
      $('#pago'+i).focus();
    SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'No puedes dejar Campos Vacios'});
    return false;
  }else{
    $('#pago'+i).removeClass('DatoMal');
    $('#pago'+i).prev().removeClass('InfoDatoMal');    
    return true;
  }
}



//Verifica  que la suma de pagos no exceda el total pagado...
SalesUp.Variables.ValidarExcesoPagos=function(total, p){
    var totalPagado=total;
    var separador=$('#separadorDecimal').val();
    var pago=$('#pago'+p).val();
        pago=sinFormato(pago);
    var monto=$('#monto').val();
        monto=sinFormato(monto);
    
    var diferencia=parseFloat(monto)-parseFloat(totalPagado);
        diferencia=sinFormato(diferencia);
   if(pago>diferencia){
          $('#pago'+p).addClass('DatoMal');
          $('#pago'+p).prev().addClass('InfoDatoMal');
          $('#pago'+p).val('');
          $('#pago'+p).attr('placeholder', 'Sugerido '+diferencia);
          $('#pago'+p).focus();
           SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'Excedes el monto total, su pago máximo: <b>'+diferencia+'<b/>'});
          return false;
    }else{
          $('#pago'+p).removeClass('DatoMal');
          $('#pago'+p).prev().removeClass('InfoDatoMal'); 
          return true;
    }
}

SalesUp.Variables.ValidarExcesoComisiones=function(suma, posActual){
    var  separador=$('#separadorDecimal').val();
    var  total=suma; //suma de comisiones pagadas
    var  pagoActual=$('#comision'+posActual).val(); //Cantidad del pago donde me encuentro.
         pagoActual=sinFormato(pagoActual);
    var  monto=parseFloat($('#comision_monto').val()); //total a pagar
         monto=sinFormato(monto);
    var  diferencia=parseFloat(monto)-parseFloat(total); //SumatotaldepagosAnteriores menos el pago actual
         diferencia=sinFormato(diferencia);
         diferencia=diferencia.toFixed(2);
    if(pagoActual>diferencia){
          $('#comision'+posActual).addClass('DatoMal');
          $('#comision'+posActual).prev().addClass('InfoDatoMal');
          $('#comision'+posActual).val('');
          $('#comision'+posActual).attr('placeholder', 'Sugerido '+diferencia);
          $('#comision'+posActual).focus();
           SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'Excedes el monto total, tu pago máximo: <b>'+diferencia+'<b/>'});
      return false;
    }else{
        $('#comision'+posActual).removeClass('DatoMal');
        $('#comision'+posActual).prev().removeClass('InfoDatoMal');    
        return true;
      }
}


//Ya se pago el monto total
SalesUp.Variables.ValidarMontoTotalPagado=function(){
 var monto=parseFloat($('#monto').val());
 monto=sinFormato(monto);
 var totalPago=parseFloat($('#totalPago').val());
     totalPago=sinFormato(totalPago);
 if((monto==totalPago) &&(monto!=0)){

   $('#monto, #comision_monto, #comision_pct').addClass('disabled').attr('onfocus','this.blur();');
 
 }else{
    if($('#tieneproductos').val() ==1){
           $('#comision_monto, #comision_pct').removeAttr('onfocus').removeClass('disabled');      
    }else{
             $('#monto, #comision_monto, #comision_pct').removeAttr('onfocus').removeClass('disabled');     
    }
 

 }
}


SalesUp.Variables.ValidarMontoCorrecto=function(){
 var x=parseFloat($('#monto').val());
     x=sinFormato(x);
 var y=parseFloat($('#totalPago').val());
     y=sinFormato(y);
     if(x<y){
      $('#monto').addClass('DatoMal');
      $('#monto').prev().addClass('InfoDatoMal');
      SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'El monto total es menor a la suma de los pagos realizados'});
      return false;
     }else{
      $('#monto').removeClass('DatoMal');
      $('#monto').prev().removeClass('InfoDatoMal');
      return true;
     }
}
SalesUp.Variables.ValidarEliminarSelectPagados=function (){
 var x=$('#noexhibiciones option');
    $(x).each(function(index, element){
    $(x).css('display', 'block')
    });

  $('#noexhibiciones').attr('option');
  $('.elpago*[value="1"]').each(function(index, element){
     var i=index+1;
     var x=$('.totpag'+i);
     $(x).css('display', 'none');
  });
}


 SalesUp.Variables.ValidarMontoComisionCorrecto=function(){
  var comision=parseFloat($('#comision_monto').val());
  var pagos=[];
  pagos=SalesUp.Variables.PagosRealizados();
  var x=0;
  for(var i=0; i<=pagos.length-1; i++){
     x+=parseFloat($('#comision'+pagos[i]).val());
  }
  if(comision<x){
    $('#comision_monto').addClass('DatoMal');
    $('#comision_monto').prev().addClass('InfoDatoMal');
    SalesUp.Construye.MuestraMsj({tMsg:4, Msg:' <b>Error!</b> La comisión no puede ser menor al total de los pagos realizados.'});
    return false;
  }else{
    $('#comision_monto').removeClass('DatoMal');
    $('#comision_monto').prev().removeClass('InfoDatoMal');
    return true;
  }
}
SalesUp.Variables.ValidarDatosAntesSubmit=function(){
    var cajapagos=$('.cajaPagos');

}
/*********************/
        var DECIMAL_SEPARADOR=  $('#separadorDecimal').val(); //'<#SP_DECIMALSEPARATOR/>';
        SalesUp.Variables.Ido = $('#IDOP').val(); //'<#IDOPORTUNIDAD/>';
        SalesUp.Variables.IdProspecto = $('#IDPRO').val();//'<#IDPROSPECTO/>';
        SalesUp.Variables.OportunidadCanalizada = $('#OportunidadCanalizada').val();
        var convertcode=$('#convert').val(); //'<#SESSION.CONVERTCODE/>';

        SalesUp.Sistema.CatalogosActivos({EstoyEn:'PopUpOportunidades'});
        $('#O-CatalogoOpcion1').val($('#Value_IdCatalogoOpcion1').val());
        $('#O-CatalogoOpcion2').val($('#Value_IdCatalogoOpcion2').val());
        $('#O-CatalogoOpcion3').val($('#Value_IdCatalogoOpcion3').val());


        /*Para ajustar los campos del agrupación*/
        $BoxInfo = $('#BoxCatalogosActivos .BoxInfo');
        var hay = $BoxInfo.length;
        
        if(hay>0){$('#referencia').attr('style','height:26px !important');}
        for (var i = 0; i <= hay - 1; i++){
            var w30 = 'w30';
            (i>0) ? w30 = 'w35' : '';
            $($BoxInfo[i]).removeClass('BoxInfo BoxInfoSmall').addClass('InfoBox '+w30);
        }

SalesUp.Variables.CambiarFormatoValores=function(){
  var monto=$('#monto').val();
      monto=sinFormato(monto);
      $('#monto').val(monto);
  var comision =$('#comision_monto').val();
      comision=sinFormato(comision);
      $('#comision_monto').val(comision);
  var comporcentaje=$('#comision_pct').val();
      comporcentaje=sinFormato(comporcentaje); 
      $('#comision_pct').val(comporcentaje);
  var nopagos=$('#noexhibiciones').val();
    for(var i=1; i<=nopagos; i++){
       var pago=$('#pago'+i).val();
           pago=sinFormato(pago);
           $('#pago'+i).val(pago);
       var comision=$('#comision'+i).val();
           comision=sinFormato(comision);
           $('#comision'+i).val(comision);
    }
        
}
SalesUp.Variables.MuestraFormatoMoneda=function(){
    var separador=$('#separadorDecimal').val();
    var monto=$('#monto').val();
        monto=accounting.formatNumber(monto, 2, '', separador);
      $('#monto').val(monto);
  var comision =$('#comision_monto').val();
      comision=accounting.formatNumber(comision, 2, '', separador);
      $('#comision_monto').val(comision);
  var comporcentaje=$('#comision_pct').val();
      comporcentaje=accounting.formatNumber(comporcentaje, 2, '', separador); 
      $('#comision_pct').val(comporcentaje);
  var nopagos=$('#noexhibiciones').val();
    for(var i=1; i<=nopagos; i++){
       var pago=$('#pago'+i).val();
           pago=accounting.formatNumber(pago, 2, '', separador);
           $('#pago'+i).val(pago);
       var comision=$('#comision'+i).val();
           comision=accounting.formatNumber(comision, 2, '', separador);
           $('#comision'+i).val(comision);
    }
}

function HazSubmit(t){
    SalesUp.Sistema.MuestraEspera('',4);
    $(t).removeAttr('onclick');
    //var comision=$('#comision_monto').val();
    //
    var Pasa=SalesUp.Variables.ValidarMontoComisionCorrecto();
    var p2=SalesUp.Variables.ValidarMontoCorrecto();
    var p3=SalesUp.Variables.ValidarPagosVaciosSubmit();
    var p4=SalesUp.Variables.ValidarComisionesVaciosSubmit();
    var p5=SalesUp.Valida.ValidaObligatorios();
    SalesUp.Variables.CambiarFormatoValores();
     if(Pasa && p2 && p3 && p4 && p5){

        document.frmVenta.action = 'popup_editar_venta_guarda.dbsp';
        document.frmVenta.submit(); 
     }else{
      SalesUp.Sistema.OcultarOverlay();
      $(t).attr('onclick', 'HazSubmit(this);');
     }

}
  function EnviarFormaAvanzado(){
    SalesUp.Sistema.MuestraEspera('',4);
    var Pasa = false;
    
    setTimeout(function() {
      Pasa = SalesUp.Valida.ValidaObligatorios();
        (Pasa) ? Pasa = SalesUp.Valida.ValidaCamposUnicosOportunidades() : '';

  
      if(Pasa){       
        //alert('submit - FrmProspectosAvanzado');
        $('#frmVenta').submit();
      }else{
        SalesUp.Sistema.OcultarOverlay();
      }
    }, 300);
  }
function Guardar() {
            if ((ValidateForm()) & (Ok==1)) {
                 $('#btnAceptar').attr('disabled','disabled');
                document.frmVenta.action = 'popup_editar_venta_guarda.dbsp';
                document.frmVenta.submit();
            }else{
                $('#btnAceptar').removeAttr('disabled');
            }
    }

/**********CREACION DE FORMULARIO INPUTS (PARTE DE ARRIBA)***********/

var montoOportunidad;
SalesUp.Variables.Default=function(){ 
   DECIMAL_SEPARADOR=$('#separadorDecimal').val();
    var idoportunidad= $('#idoportunidad').val();
    var idventa= $('#idventa').val();
    var idprospecto= $('#Idp').val();
    var datosOp   = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDetalleVenta.dbsp',Parametros:'IDOPORTUNIDAD='+idoportunidad+'&IDVENTA='+idventa+'&IDPROSPECTO='+idprospecto,DataType:'json'}).jsonDatos;   
    var concepto=datosOp[0].CONCEPTO;
    var fecha_cierre3=datosOp[0].FECHAHORA;
    var monto= datosOp[0].MONTO;

    var comision_monto= datosOp[0].COMISION; if(comision_monto==null){comision_monto=0} 
    var comision_pct=parseFloat(datosOp[0].COMISION)/monto*100; 
    comision_pct=(isNaN(comision_pct))?0:comision_pct;
    if(comision_pct=='Infinity'){comision_pct=0;}

    var referencia=(datosOp[0].REFERENCIA)?datosOp[0].REFERENCIA: '';
    montoOportunidad=monto;

        //Canalizacion    
    SalesUp.Variables.prospectoEsCanalizado = datosOp[0].esCanalizado;



    $('#concepto').val(concepto);
    $('#fecha_cierre').addClass('tCen Fecha DataInfo');
    //$('#fecha_cierre').attr('onchange', 'Cambia_Fecha_Cierre()');
    $('#fecha_cierre').val(fecha_cierre3);
    $('#monto').val(monto);
    $('#monto').attr('onkeyPress', 'return ValidateFloatCharacter(event, this, \''+DECIMAL_SEPARADOR+'\')');
    //$('#monto').attr('onchange', 'Cambia_Monto_Total()');
    $('#comision_monto').val(comision_monto);
    $('#comision_monto').attr('onkeypress', 'return ValidateFloatCharacter(event, this, \''+DECIMAL_SEPARADOR+'\')');
    //$('#comision_monto').attr('onchange', 'Cambia_Comision_Total()');
    $('#comision_pct').val(comision_pct);
    $('#comision_pct').attr('onkeyPress', 'return ValidateFloatCharacter(event, this, \''+DECIMAL_SEPARADOR+'\')');
    //$('#comision_pct').attr('onchange', 'Cambia_Monto_Total_Pct()');
    referencia = SalesUp.Sistema.StrReplace('<br/>','\n',referencia);

    if(SalesUp.Variables.monedaActivo == 1){
      if(datosOp[0].IDMONEDA){
        $('#moneda').val(datosOp[0].IDMONEDA);
        $('#tipodecambio').val(datosOp[0].TIPOCAMBIO);
      }
      SalesUp.Variables.montoOriginal  = monto;
      SalesUp.Variables.monedaOriginal = $('#moneda').val();

      $('#tieneproductos').val(datosOp[0].TIENEPRODUCTOS);

      if(datosOp[0].TIENEPRODUCTOS == 1){ 
        $('#monto').addClass('disabled');
        $('#monto').attr('onfocus','this.blur();');
      }
    }
        

     setTimeout(function(){
         SalesUp.Variables.ValidarMontoTotalPagado();
     },1500);
     
     $('#referencia').val(referencia);
    var j = datosOp;
      for(var i=0; i<=64; i++){
        var dato = 'CAMPO'+i+'O';
        var dato2 = 'CAMPO'+i+'P';
        var $d = $('#CO'+i);
        var $d2 = $('#camposOcultos #CP'+i);
        var $d3 = $('#divTab-clientes #CP'+i);
        var info = j[0][dato];
        var info2 = j[0][dato2];

        if(info== null){
          var dato = 'CAMPO'+i;
          info = j[0][dato];
        }

        $d.val(info);
        $d2.val(info2);//Hiidden prospecto
        $d3.val(info2); // Tab clientes
      }
}

SalesUp.Variables.ValidaNumeros = function(){
        $('input.numero').keyup(function(){ 
          this.value = this.value.replace(/[^0-9]/g, ''); 
        }).blur(function(){
          this.value = this.value.replace(/[^0-9]/g, ''); 
        });
        
        $('input.decimal').keyup(function(){ 
          var v = this.value;
          ($.isNumeric(v)) ? $(this).val(v) : $(this).val('');
        }).blur(function(){
        var v = this.value;
      ($.isNumeric(v)) ? $(this).val(v) : $(this).val('');
  });
}/*Valida numeros*/

SalesUp.Variables.ReemplazaHTML=function(){
  var htmlComision='<input name="comision_monto" id="comision_monto" maxlength="10" type="text" class="DataInfo"><input name="comision_pct" id="comision_pct" maxlength="5" type="text" class="DataInfo  r"/><span class="">%</span>';
  $('#comision_monto').replaceWith(htmlComision);
}

SalesUp.Variables.ConstruyeTabsLocal = function(idventana){
  var jsonTabs = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonNombresTab.dbsp', Parametros:'idventana='+idventana, DataType:'json'/*, Almacen:'jsonTabs' */});
  var tabs = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateTabsCoonvertirVenta.dbsp'/*, Almacen:'TemplateTabs'+idventana*/});
  SalesUp.Variables.jsonTabs = jsonTabs;
  var Compilado = SalesUp.Construye.ReemplazaDatos({Datos:jsonTabs, Template:tabs});
  Compilado = SalesUp.Sistema.Comprimir.Minifica({Dato:Compilado});
  $('#contenedorTabs').html(Compilado);
  $('#Tabs').tabs();
}/*ConstruyeTabs*/


SalesUp.Variables.ObtieneOpciones = function(Op){
  var Naturaleza = Op.Naturaleza, Id = Op.Id, Indice = Op.Indice, IdCampo = Op.IdCampo;
  var Pagina = '', Almacen = '', Parametros='tConsulta=1', Pasa = false, jsonRespuesta;
  var esCliente = SalesUp.Variables.EsCliente;
  if(Naturaleza == '1'){
    if(Id=='Titulo'){Pagina = 'jsonTitulos.dbsp'; Almacen = 'jsonTitulosv2'; Pasa = true;}
  }else if(Naturaleza == '2'){
    Pagina = 'jsonCamposPersonalizadosOpciones.dbsp'; Almacen = 'jsonOpcion'+IdCampo; Parametros +='&IdCampo='+IdCampo; Pasa = true;
  }
  if(Pasa){
    jsonRespuesta = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/'+Pagina, Parametros:Parametros, DataType:'json', Almacen:Almacen}).jsonDatos;  
  }
  return jsonRespuesta;
}/*ObtieneOpciones*/

SalesUp.Variables.CamposLocal = function(){
  var tmpCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateFormulario.dbsp', Almacen:'TemplateFormulario'});
  var jsonCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCampos.dbsp', Parametros:'idventana='+3, DataType:'json' /*, Almacen:'jsonLtCampos'+idventana*/});


  var xyz=jsonCampos.jsonDatos;

  for(var i=xyz.length-1; i>-1; i--) {
    var TipoRestriccion = xyz[i].TipoRestriccion;
    if(parseInt(xyz[i].Naturaleza) == 1) {
      xyz.splice(i, 1);
    }    
  }

var aux=jsonCampos.jsonDatos;
var xx = aux.length;
var yy = 0;
  for(var i=0; i<aux.length; i++) {
      var TipoRestriccion = aux[i].TipoRestriccion;
      if ((parseInt(TipoRestriccion)!=1) && (parseInt(TipoRestriccion)!=2)){
            aux[i].Mostrar = '0';
            yy++;
        }     
  }
  jsonCampos.jsonDatos=aux;
    if(xx == yy)
    $('#Tab-clientes').remove();

  var jsonTabs = SalesUp.Variables.jsonTabs.jsonDatos;
  var Opciones;
  jsonCampos = _.reject(jsonCampos.jsonDatos, function(j){return _.size(j) == 0;});
  jsonCampos.jsonDatos = jsonCampos;

  if(!SalesUp.Variables.jsonConfiguracionCampos){
    SalesUp.Variables.jsonConfiguracionCampos = jsonCampos;
  }else{
    SalesUp.Variables.jsonConfiguracionCampos = _.union(jsonCampos,SalesUp.Variables.jsonConfiguracionCampos)
  }

  var infoJson = jsonCampos.jsonDatos;
  
  for (var x = 0; x <= infoJson.length - 1; x++) {
    var j = infoJson[x];
    var Seleccione = {};
    Seleccione.value = '';
    Seleccione.Opcion = '(... Seleccione una opción ...)';
    if(j.attr_maxLength=='0'){j.attr_maxLength='';}

    if(j.esSelect == '1'){

    Opciones = SalesUp.Variables.ObtieneOpciones({Naturaleza:j.Naturaleza, Id:j.attr_id, Indice:j.attr_data_Indice, IdCampo:j.IdCampo});
      
      if(Opciones){ 
        j.Opciones = Opciones;
        j.Opciones = _.union(Seleccione, j.Opciones);
    }
      
    }else if((j.esListaCheck=='1')||(j.esListaRadio=='1')||(j.esTemperatura=='1')||(j.esSelectInput=='1')){
      Opciones = j.Opciones;
      if(Opciones.indexOf('[')!=-1){ Opciones = Opciones }else{ Opciones = '['+Opciones+']'; }
      j.Opciones = JSON.parse(Opciones);
      j.Opciones = _.union(Seleccione, j.Opciones);
    }
  }
  jsonCampos.jsonDatos = infoJson;

   

    var Compilado = SalesUp.Construye.ReemplazaDatos({Datos:jsonCampos.jsonDatos, Template:tmpCampos});
    Compilado = SalesUp.Sistema.Comprimir.Minifica({Dato:Compilado});
    $('#divTab-clientes').append(Compilado).append('<div class="clear"></div>');
  var arrBoxListaOpciones = $('.BoxListaOpciones');
  for (var i = 0; i <= arrBoxListaOpciones.length - 1; i++){
    var $BoxListaOpciones = $(arrBoxListaOpciones[i]);
    var ltOpciones = $BoxListaOpciones.find('label.w25');
    var nOpciones = ltOpciones.length;
    var w = 'w25';
    if (nOpciones<=3){
      w='w100';
    }else if((nOpciones>=4)&&(nOpciones<=6)){
      w='w50';
    }else if((nOpciones>=6)&&(nOpciones<=9)){
      w='w33';
    }else if(nOpciones>9){
      w='w25';
    }
    ltOpciones.removeClass('w25').addClass(w);
  }
  SalesUp.Variables.Asterisco();
  SalesUp.Variables.Quitar33y34();
  SalesUp.Variables.CamposLocalHidden();
}/*SalesUp.Variables.Campos*/



SalesUp.Variables.CamposLocalHidden = function(){
  var tmpCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateFormulario.dbsp', Almacen:'TemplateFormulario'});
  var jsonCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCampos.dbsp', Parametros:'idventana='+1, DataType:'json' /*, Almacen:'jsonLtCampos'+idventana*/});
  var xyz=jsonCampos.jsonDatos;

      for(var i=xyz.length-1; i>-1; i--) {
        xyz[i].Mostrar = '0';        
        if((parseInt(xyz[i].Naturaleza) == 1) || (xyz[i].TambienIdTab !=null)) {
          xyz.splice(i, 1);
        }    
}

  jsonCampos.jsonDatos=xyz;
  var jsonTabs = SalesUp.Variables.jsonTabs.jsonDatos;
  var Opciones;
  jsonCampos = _.reject(jsonCampos.jsonDatos, function(j){return _.size(j) == 0;});
  jsonCampos.jsonDatos = jsonCampos;
  if(!SalesUp.Variables.jsonConfiguracionCampos){
    SalesUp.Variables.jsonConfiguracionCampos = jsonCampos
  }else{
    SalesUp.Variables.jsonConfiguracionCampos = _.union(jsonCampos,SalesUp.Variables.jsonConfiguracionCampos)
  }
  var infoJson = jsonCampos.jsonDatos;
  for (var x = 0; x <= infoJson.length - 1; x++) {
    var j = infoJson[x];
    var Seleccione = {};
    Seleccione.value = '';
    Seleccione.Opcion = '(... Seleccione una opción ...)';
    if(j.attr_maxLength==0){j.attr_maxLength='';}
    if(j.esSelect == '1'){

      Opciones = SalesUp.Variables.ObtieneOpciones({Naturaleza:j.Naturaleza, Id:j.attr_id, Indice:j.attr_data_Indice, IdCampo:j.IdCampo});
      if(Opciones){ 
        j.Opciones = Opciones;
        j.Opciones = _.union(Seleccione, j.Opciones);
      }
      
    }else if((j.esListaCheck=='1')||(j.esListaRadio=='1')||(j.esTemperatura=='1')||(j.esSelectInput=='1')){
      Opciones = j.Opciones;
      if(Opciones.indexOf('[')!=-1){ Opciones = Opciones }else{ Opciones = '['+Opciones+']'; }
      j.Opciones = JSON.parse(Opciones);
      j.Opciones = _.union(Seleccione, j.Opciones);
    }
  }
    jsonCampos.jsonDatos = infoJson;
    var Compilado = SalesUp.Construye.ReemplazaDatos({Datos:jsonCampos.jsonDatos, Template:tmpCampos});
    Compilado = SalesUp.Sistema.Comprimir.Minifica({Dato:Compilado});
    $('#camposOcultos').append(Compilado).append('<div class="clear"></div>');
  var arrBoxListaOpciones = $('.BoxListaOpciones');
  for (var i = 0; i <= arrBoxListaOpciones.length - 1; i++){
    var $BoxListaOpciones = $(arrBoxListaOpciones[i]);
    var ltOpciones = $BoxListaOpciones.find('label.w25');
    var nOpciones = ltOpciones.length;
    var w = 'w25';
    if (nOpciones<=3){
      w='w100';
    }else if((nOpciones>=4)&&(nOpciones<=6)){
      w='w50';
    }else if((nOpciones>=6)&&(nOpciones<=9)){
      w='w33';
    }else if(nOpciones>9){
      w='w25';
    }
    ltOpciones.removeClass('w25').addClass(w);
  }
  SalesUp.Variables.Asterisco();
  SalesUp.Variables.Quitar33y34();
}/*SalesUp.Variables.Campos*/

SalesUp.Variables.QuitaObligatorios = function(){
  $('#divTab-clientes .OcultarEste').each(function(){
    //$(this).removeClass('InfoObligatorio');
  });

  $('#camposOcultos .OcultarEste').each(function(){
    $(this).removeClass('InfoObligatorio');
  });

}

SalesUp.Variables.TagCalagosActivos = function(){
  var arrTabs = $('.ui-tabs-panel');
  $Tab = $(arrTabs[0]);
  $Tab.find('.BoxInfo:last').after('<div id="BoxCatalogosActivos"></div>');
  SalesUp.Sistema.CatalogosActivos({EstoyEn:'PopUpOportunidades'});
}
    /****************************    READY  *******************************/


SalesUp.Variables.AgregaFuncionesCamposSugeridos = function(){

      $('.InfoSugerido').each(function(){ 
        var OnBlur = $(this).attr('onblur');
        (!OnBlur) ? OnBlur = '':'';
        $(this).attr('onblur',OnBlur+' SalesUp.Buscar.BuscarSugeridosOportunidad({ Elemento:this, Valor:value });');
      });
}

SalesUp.Variables.MonedaActual = function(obj){
  var $Elemento = $(obj.elemento);
  SalesUp.Variables.tipoDeCambioActual = $Elemento.find('option:selected').attr('data-cambioMoneda');
  SalesUp.Variables.monedaActual = $Elemento.val();
}

SalesUp.Variables.CambiaCambioMoneda = function(obj){
  var montoNuevo  = 0;
  var montoActual = $('#monto').val();
  var $txtTipoCambio =$('#txtTipoCambio');
  var tipoDeCambio= $txtTipoCambio.val();

  if (tipoDeCambio == 0) {
    SalesUp.Construye.MuestraMsj({tMsg:4,Destino:'#frmCambio',Msg:'El tipo de cambio debe de ser mayor a cero'});
    $txtTipoCambio.focus();
    SalesUp.Valida.MarcarObligatorio($txtTipoCambio);
  }else{
    montoNuevo = parseFloat(SalesUp.Sistema.calculaMontoTipoCambio({tipoCambioAnterior:SalesUp.Variables.tipoDeCambioActual,nuevoTipoCambio:tipoDeCambio,monto:montoActual}));
    $('#monto').val(montoNuevo);
    $('#tipodecambio').val(tipoDeCambio);
    SalesUp.Variables.CalcularComisiones();
    $('#moneda').blur();
    cambiarCantidadPagos($('#noexhibiciones').val());

    SalesUp.Construye.CierraPopUp({t:obj.t});
  }
  
};

SalesUp.Variables.CierraPopUp = function(obj){
  $('#moneda').val(SalesUp.Variables.monedaActual);
  SalesUp.Construye.CierraPopUp({t:obj.t});
};

SalesUp.Variables.Cambia_Monto_Total_Pct = function(){
  var $comision = $('#comision_monto');
  var comisionAnterior = parseFloat($comision.val());
  var comisionNueva = parseFloat(SalesUp.Sistema.calculaMontoTipoCambio({tipoCambioAnterior:SalesUp.Variables.tipoDeCambioActual,nuevoTipoCambio:1,monto:comisionAnterior}));
  $comision.val(comisionNueva);
}

SalesUp.Variables.CambiaTipoCambio = function(obj){
  var $Elemento     = $(obj.elemento);
  var idempresamoneda = $Elemento.val();
  var tipoDeCambio  = $Elemento.find('option:selected').attr('data-cambioMoneda');
  var pordefecto    = $Elemento.find('option:selected').attr('data-pordefecto');
  //var montoActual   = SalesUp.Variables.montoOriginal;
  var montoActual   = $('#monto').val();
  var montoNuevo    = 0;
  if(SalesUp.Variables.permiteTipoCambio == 0){
    montoNuevo = parseFloat(SalesUp.Sistema.calculaMontoTipoCambio({tipoCambioAnterior:SalesUp.Variables.tipoDeCambioActual,nuevoTipoCambio:tipoDeCambio,monto:montoActual}));
    $('#monto').val(montoNuevo);
    $('#tipodecambio').val(tipoDeCambio);
    SalesUp.Variables.CalcularComisiones();
    cambiarCantidadPagos($('#noexhibiciones').val());
  }else{
    if(pordefecto == 1){
      montoNuevo = parseFloat(SalesUp.Sistema.calculaMontoTipoCambio({tipoCambioAnterior:SalesUp.Variables.tipoDeCambioActual,nuevoTipoCambio:tipoDeCambio,monto:montoActual}));
      $('#monto').val(montoNuevo);
      $('#tipodecambio').val(tipoDeCambio);
      SalesUp.Variables.Cambia_Monto_Total_Pct();
    }else{
      SalesUp.Construye.MuestraPopUp({
        alto:'85px', ancho:'150px',
        titulo:'Cambia tipo de cambio',
        fuente:'/privado/popup_cambia_tipocambio.dbsp?tipoDeCambio='+tipoDeCambio,
        id:'popUpCambio'
       });
    }
  }
};

SalesUp.Variables.ActivaMultimoneda = function(){
  if(SalesUp.Variables.monedaActivo == 1){
    var jsonMonedas   = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonMonedasActivas.dbsp', DataType:'json'}).jsonDatos;
    var opciones      = '';
    var tipodecambio  = 0;

    for (var i = 0; i < jsonMonedas.length; i++) {
      var monedaActual  = jsonMonedas[i];
      opciones      = opciones + '<option value="'+monedaActual.IDEMPRESAMONEDA+'" data-pordefecto="'+monedaActual.PORDEFECTO+'" data-cambioMoneda="'+monedaActual.TIPODECAMBIO+'">'+monedaActual.IDMONEDA+'</option>'
    };

    var $divConcento  = $('#monto').parent();
    $divConcento.children('#monto').attr('style','width:30% !important');
    $divConcento.append('<select name="moneda" id="moneda" class="InfoData" style="width:28% !important;" onfocus="SalesUp.Variables.MonedaActual({elemento:this});" onchange="SalesUp.Variables.CambiaTipoCambio({elemento:this});">'+opciones+'</select>');

    tipodecambio = $('#moneda option:selected').attr('data-cambioMoneda');
    $divConcento.append('<input type="hidden" id="tipodecambio" name="tipodecambio" value="'+tipodecambio+'"/>');
    $divConcento.append('<input type="hidden" id="tieneproductos" value="0"/>');
  }
}


$(function(){
     DECIMAL_SEPARADOR=$('#separadorDecimal').val();

    SalesUp.Variables.monedaActivo       = SalesUp.Sistema.Almacenamiento({a:'SysMonedaActivo'});
    SalesUp.Variables.permiteTipoCambio  = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonPermisosUsuarios.dbsp',Parametros:'TKU='+SalesUp.Variables.Tku+'&accion=1&idmodulo=13',DataType:'json'}).jsonDatos[0].ID;
    self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:580,Ancho:750});
    SalesUp.Variables.ConstruyeTabsLocal(4);
    SalesUp.Variables.Campos(4);
    SalesUp.Variables.CamposLocal(3);
    SalesUp.Variables.ReemplazaHTML();
    setTimeout(function(){SalesUp.Variables.llenaControles();}, 1000);
    SalesUp.Variables.ActivaMultimoneda();
    SalesUp.Variables.Default();
    SalesUp.Variables.QuitaObligatorios();
    SalesUp.Variables.AgregaFuncionesCamposSugeridos();
    //Canalizacion
    //FUncion de Canalizacion 
    SalesUp.Variables.TagCalagosActivos();
    SalesUp.Sistema.RestriccionOpcionesCanalizadas({prospectoEsCanalizado:SalesUp.Variables.prospectoEsCanalizado});
    SalesUp.Variables.ValidaNumeros();
    $('#Tabs').tabs();
    SalesUp.Variables.CargarListaPagosDB();
    SalesUp.Variables.CrearSelectPagos();
    SalesUp.Variables.CrearSelectPeriocidad();
    SalesUp.Variables.CrearSelectTipoComision();
    var noPagos=$('#noPagos').val();
    $('#noexhibiciones').val(noPagos);
    var x=     $('#monto').css('backgroundColor');
    $('#comision_pct').css('background', x+' !important');
    var pagos=[];
    pagos=SalesUp.Variables.PagosRealizados();
    SalesUp.Variables.RestriccionesPagos(pagos);
    SalesUp.Variables.ContadorPagos(pagos);
    $('#monto').attr('onchange', 'SalesUp.Variables.CambiarMontoPago();');
    $('#comision_monto').attr('onchange', 'SalesUp.Variables.CalcularPorcentajeComisiones();');
    SalesUp.Variables.ValidarEliminarSelectPagados();
    $('#btnAceptar').attr('onclick', 'HazSubmit(this);');
    $('#comision_pct').attr('onChange', 'SalesUp.Variables.CalcularComisiones();');
    SalesUp.Variables.ActualizarMontoOportunidad();
    SalesUp.Variables.MuestraFormatoMoneda();
    //SalesUp.Variables.ValidarMontoTotalPagado();
    SalesUp.Sistema.IniciaPlugins();
}); //Fin ready


