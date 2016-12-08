Handlebars.registerHelper('Num', function(i) {
return parseInt(i)+1;
});
Handlebars.registerHelper('indice', function(index, respuesta) {
 respuesta=index+1;
return respuesta;
});
//=============================================================================


SalesUp.Variables.EnviarFormulario=function(){
  var imgeliminar=SalesUp.Variables.NombreImgAEliminar;
  var contimg=0;
  var  $img=$('.imgarch');
  for(var i = 0; i <=$img.length - 1; i++) {
    if($($img[i]).val()!=''){contimg++;}
  };
  if(SalesUp.Variables.idProducto>0){
    for(var i = 0; i <=imgeliminar.length-1; i++) {
      SalesUp.Sistema.CargaDatos({Link:'https://fenix.salesup.com.mx/aws/eliminaArchivo.php', Parametros: 'archivo='+imgeliminar[i]+'&idempresa='+SalesUp.Variables.IdEmpresa});
    }
  }
  if(contimg>0){
    AjaxFormSimple();
    $('#FrmSubirImg').submit();
  }else{
    SalesUp.Variables.establecerValoresInputImagen();
    setTimeout(function() {$('#Frmproducto').submit();}, 500);
  }
  
}

SalesUp.Variables.GuardarDatos=function(){
  SalesUp.Sistema.MuestraEspera('', 4);
  setTimeout(function() {
    var pasa=SalesUp.Valida.ValidaObligatorios();
    if(pasa){
      SalesUp.Variables.EnviarFormulario();  
      
    }else{
      SalesUp.Sistema.OcultarOverlay();
    }
  }, 500); 
}

//========= funciones Imagenes ==========//
SalesUp.Variables.establecerValoresInputImagen=function(){
  console.log('establecerValoresInputImagen Paso 2');
  var objImagenes=[];
  $('.imgNombre').each(function(){
     var Elemento=this; 
     var nombre=Elemento.id; 
     var valor=Elemento.value;
     imagenes={
       'nombre':nombre , 
       'valor':valor , 
     }
      objImagenes.push(imagenes); 
  });
  var datos=JSON.stringify(objImagenes); 
  $('#objImg').val('');
  $('#objImg').val(datos);
  console.info("Se creo el obj imagen");
}

SalesUp.Variables.AbreAgregaImagen=function(Op){
    var id=(Op.v)?Op.v:'';
    var p=SalesUp.Variables.obtenerPosicionImagen({id:id});
    if(p){
      $('#archivo'+p).attr('data-imganterior',p); //Me pone la posicion de la img....
      $('#archivo'+p).click(); 
      //$('img-archivo'+p).attr('src');
    }
}
SalesUp.Variables.obtenerPosicionImagen = function(Op){
    console.trace();
    var id=(Op.id)?Op.id:'';
    console.info(id, 'id'); 
    var posicion;
    for(var i=1; i<=id; i++){
      //var valor=$('#archivo'+i).val();
      var valor=$('#archivo'+i).attr('data-imganterior');
      console.info(i, valor);
      if(valor=='' || valor==null){
        posicion=i; 
       break;  
      }
    }
    console.info(posicion, 'posición');
    return posicion; 
}

SalesUp.Variables.ValidarPrecios=function(Op){
  var elemento=(Op.t)?Op.t:''; 
  var valor=(Op.v)?Op.v:''; 
  var evento=(Op.e)?Op.e:''; 
  var cercano=$(elemento).prev();
  var EsIndicador=$(cercano).hasClass('naranja');
  console.info(elemento, cercano, EsIndicador);
  (EsIndicador)?   SalesUp.Variables.establecerMontosComision({v:valor,t:elemento}) :'';

  var precioMinimo=$('#preciominimo').val();
  if(parseFloat(valor)<parseFloat(precioMinimo)){
    SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Id:'ArchivosValidos', Msg:'El precio no puede ser menor al precio mínimo' });
     $(elemento).val('');
     $(elemento).focus();
    SalesUp.Valida.MarcarObligatorio($(elemento));
  }
}
SalesUp.Variables.ExtensionesPermitidas = function(){
        var ExtPermintidas = [];
        var Imagenes = ['jpg','png','jpeg','gif'];
        ExtPermintidas = _.union(Imagenes);
        SalesUp.Variables.ExtPermintidas = SalesUp.Sistema.StrReplace(',','|',ExtPermintidas.toString());
        return ExtPermintidas;
}/*ExtensionesPermitidas*/
SalesUp.Variables.ValidaExtension = function(Op){
        var Pasa = true;
        var Archivo = Op.Archivo.toLowerCase();
        
        if(Archivo){
          var Ext = Archivo.split('.').pop();
          var Extensiones = SalesUp.Variables.ExtensionesPermitidas();
          
          if(Extensiones.indexOf(Ext)<0){
            SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Id:'ArchivosValidos', Msg:'Extensión inválida. Sólo imágenes' });
            Pasa = false;
          }
        }
        return Pasa;
}/*ValidaExtension*/

SalesUp.Variables.ObtenerImagen=function(Op) {
         var input=(Op.t)?Op.t:'';
         var id=(Op.id)?Op.id:'';
         var img='img-'+id;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
              $('#'+img).attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
}

SalesUp.Variables.NombreImgAEliminar=[];
SalesUp.Variables.ObtieneNombImg=function(Op){
      var $selector=(Op.t)?$(Op.t):'';
      var Nombre=(Op.v)?Op.v:'';
      console.info(Nombre);
      if(Nombre.length<=0){return;}
      var Extension=SalesUp.Variables.ValidaExtension({Archivo:Nombre});
      if(!Extension){return;}
      var id=$selector.attr('id'); 
      var html =''; 
          html +='<div class=" ContImagenes AccionesDoc BoxDoc tCen w100 "><img class="imgtam" id="img-archivo'+Op.id+'" height="50" ></img><div class="clear"> </div>'
          html +='<div class="Acciones"><span tip="Eliminar archivo" class="Pointer Tip1" onclick="SalesUp.Variables.ConfirmaEliminarArchivo({id:'+Op.id+'})" >'
          html +=' <i class="fa fa-lg fa-trash-o"> </i> </span></div></div>';
      $("#pre"+id).html(html);
      SalesUp.Variables.ObtenerImagen({t:Op.t, id:id});
      var imganterior=$('#'+id).attr('data-imganterior');
      SalesUp.Variables.NombreImgAEliminar.push(imganterior);

}
SalesUp.Variables.ConfirmaEliminarArchivo=function(Op){
  var id= (Op.id)?Op.id:'';
  SalesUp.Construye.MuestraAlerta({
    TipoAlerta:'AlertaPregunta',
    Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/> ¿Desea eliminar la imágen '+id+'?',
    Boton1:'Aceptar',
    Boton2:'Cancelar',
    Callback1:'SalesUp.Variables.EliminarArchivo({id:\''+id+'\'})',
    Icono1:'<i class="fa fa-trash"></i>',
    Icono2:'<i class="fa fa-times"></i>',
    Ancho:'250px'
  });
}// fin ConfirmarElimianrArchivo.
SalesUp.Variables.EliminarArchivo=function(Op){
    var id=(Op.id)?Op.id:'';
    SalesUp.Variables.NombreImgAEliminar.push(Op.id);
    $("#prearchivo"+id).html('<div id="pre-archivo'+id+'" class=" imagenes BoxDoc p10 w100 tCen BoxSizing Transition BoxCarpetaVacia" onclick="SalesUp.Variables.AbreAgregaImagen({v:'+id+'});"><i class="Pointer fa fa-3x fa-file-picture-o"></i><p class="DocDescripcion Ellipsis w100">Agregar imagen '+id+'</p><div class="clear"></div>');
    $('#imagen'+id).attr('src', '');
    $('#imagen'+id).val('');
    $('#archivo'+id).attr('data-imganterior', '');
}
function AjaxFormSimple(Op){
          var OptionesAjaxForm = { 
          beforeSend: function(){
          },uploadProgress: function(event, position, total, percentComplete){
          },success: function(){}
          ,complete: function(response){
            var json = JSON.parse(response.responseText);
            console.info('AJAXFORM-RESPONSE',json);
            SalesUp.Variables.CrearInputsImg({datos:json});
          },error: function(e){
        
          }
        }        
          $("#FrmSubirImg").ajaxForm(OptionesAjaxForm);   
}

SalesUp.Variables.CrearInputsImg=function(Op){
   var jsonImagenes={};
   var jsonDatos=(Op.datos)?Op.datos:'';
       resultado=jsonDatos.resultado;
   var datos=jsonDatos.datos;    
    if(resultado==1){
        var arrDato=[];
        $('.imgarch').each(function(a,b){
        var d=$(this).attr('data-imganterior')
             if(d!=undefined){
              arrDato.push(d);
             }
        });
        for (var i =0; i <=datos.length-1; i++) {
            var index=i+1;
            $('#imagen'+arrDato[i]).val(datos[i].nombre);
       };
    }
  SalesUp.Variables.establecerValoresInputImagen();
  setTimeout(function() {$('#Frmproducto').submit();}, 500);
}


SalesUp.Variables.PreciosSugeridos=function(Op){
  var valor=(Op.v)?Op.v:''; 
      valor=SalesUp.Sistema.FormatoMoneda(valor);
  var elemento=(Op.t)?Op.t:'';
  var texto='Precio mínimo: '+ valor;
  $('.Sugerido').each(function(){
    $(this).attr('placeholder', texto);
  });
}
/*NO Sirve**/
SalesUp.Variables.establerPorcentajeComision=function(Op){
  // var monto=(Op.v)?Op.v:0; 
  // var elemento=(Op.t)?Op.t:'';
  // var precio=($('#preciominimo').val())?$('#preciominimo').val():0;
  // var total=(monto/precio)*100;
  // var elementoPct=$(elemento).closest();
  //  $(elementoPct).val(total.toFixed(2));
}

SalesUp.Variables.HabilitarExistenciaTexto=function(value){
          if(value==-1){
               $("#existencia").hide(450);
              setTimeout(function(){$("#selectexistencia").addClass('w100').removeClass('w50');$("#existencia").val(-1);}, 501);
            }else if(value==2){
              $("#selectexistencia").addClass('w50').removeClass('w100');
              $("#existencia").show(450).val('').focus();    
            }
}

 // SalesUp.Variables.ValoresLinea= function(Op){
 //    var id=(Op.v)?Op.v:''; 
 //    $('#idlinea').val(id);
 // }

SalesUp.Variables.llenaInputsLineasProducto=function(Op){
    var ValorId=$(Op.id)?Op.id:'';
    var datos=SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonConsultarLineasProductos.dbsp',  DataType:'json'});
        datos = datos.jsonDatos;
    var Activos=_.reject(datos, function(j){ return j.STATUS==0;});

   $selectLineasProductos= $('#selectlinea').selectize({
          maxItems:1,
          plugins: ['remove_button'],
          options:Activos,
          valueField:'IDLINEA_PRODUCTO',
          searchField:['LINEA_PRODUCTO'],
          labelField:'LINEA_PRODUCTO',
          sortField:'LINEA_PRODUCTO'

     });
    $('.selectize-control').addClass('InfoData');
    var selectizeLinea = $selectLineasProductos[0].selectize;
    (ValorId!='')? selectizeLinea.setValue(ValorId) :'';
    
   
}

SalesUp.Variables.llenaInputsMarcas=function(Op){
      var ValorId=$(Op.id)?Op.id:'';
      var datos=SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonConsultarMarcasProductos.dbsp',  DataType:'json'});
          datos = datos.jsonDatos;
      var Activos=_.reject(datos, function(j){ return j.STATUS==0;});
      $selectMarcasProductos=$('#selectMarca').selectize({
          maxItems:1,
          options:Activos,
          valueField:'IDMARCA',
          searchField:['MARCA'],
          labelField:'MARCA',
          sortField:'MARCA'

      });
      $('.selectize-control').addClass('InfoData');
       var selectizeMarca = $selectMarcasProductos[0].selectize;
      (ValorId!='')? selectizeMarca.setValue(ValorId) :'';
      
}
 SalesUp.Variables.llenaInputs=function(){
      var data=SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonConsultarPrecios.dbsp',  DataType:'json'});
      data.jsonDatos = _.reject(data.jsonDatos , function(j){ return _.size(j) == 0; });
      jsondatos=data.jsonDatos;
      var template='{{#each jsonDatos}}<div class="BoxInfo w50 EstadoActual" data-status="{{STATUS}}"><label class="InfoLabel Pointer Tip3 precios{{#indice @index}} {{respuesta}} {{/indice}}" tip="{{NOMBRE}}" ondblclick="SalesUp.Variables.establecerMontosComisionDblClick({t:this});">{{NOMBRE}}</label> <input type="text" class="InfoData Sugerido"  onkeypress="return SalesUp.Valida.valDecimales({e:event, t:this, v:value});"  onchange="SalesUp.Variables.ValidarPrecios({v:value, t:this, e:event});" onblur="SalesUp.Variables.ValidarPrecios({v:value, t:this, e:event});" name="precio{{Num @index}}" id="precio{{Num @index}}"/></div>{{/each}}';
      var response=SalesUp.Construye.ReemplazaDatos({Template:template, Datos: data});
      $("#Ltprecios").append(response);
      //SalesUp.Sistema.IniciaPlugins();
 }
SalesUp.Variables.llenaComisiones=function(){
  var respuesta=SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonConsultarProdutosComisiones.dbsp', Parametros:'', DataType:'json'});
      respuesta.jsonDatos = _.reject(respuesta.jsonDatos , function(j){ return _.size(j) == 0; });
      respuesta=respuesta.jsonDatos; 
  var total=_.size(respuesta); 
  var html='';
  for(var i=0; i<=respuesta.length-1; i++){
      var r=respuesta[i];
      var descripcion=r.DESCRIPCION; 
      var idComision=r.IDPRODUCTO_COMISION;
      var status=r.STATUS;
      html+='<div class="BoxInfo w50 EstadoActual" data-status="'+status+'"><label class="InfoLabel Tip3" tip="'+descripcion+'">'+descripcion+'</label><div class="InfoData">'
          +'<div class="w50 pr5"><input type="text" class="BoxSizing InfoData w100 ComisionValor" onkeypress="return SalesUp.Valida.valDecimales({e:event, t:this, v:value});"  onchange="SalesUp.Variables.establecerComisionMonto({v:value, p:'+(i+1)+'});" name="comision'+(i+1)+'" onblur="SalesUp.Valida.valNumero({t:this});" id="comision'+(i+1)+'" data-id="'+idComision+'" value="">'
          +'<span class="porcentaje">%</span></div>'
          +'<div class="w50"><input type="text" class="BoxSizing InfoData w100 ComisionPct" name="comisionpct'+(i+1)+'" onblur="SalesUp.Valida.valNumero({t:this});" onkeypress="return SalesUp.Valida.valDecimales({e:event, t:this, v:value});"  onchange="SalesUp.Variables.establecerPorcentajeComision({v:value, t:this, i:'+(i+1)+'});" id="comisionpct'+(i+1)+'" data-id="'+idComision+'" value="" ></div></div></div>';
  }
   $('#Ltprecios').append(html); 
}
SalesUp.Variables.llenaImpuestos=function(){
    var respuesta=SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonConsultarProdutosImpuestos.dbsp', Parametros:'', DataType:'json'});
        respuesta.jsonDatos = _.reject(respuesta.jsonDatos , function(j){ return _.size(j) == 0; });
        respuesta=respuesta.jsonDatos; 
    var total=_.size(respuesta); 
    var html='';
    for(var i=0; i<=respuesta.length-1; i++){
        var r=respuesta[i];
        var nombre=r.IMPUESTO;
        var id=r.IDIMPUESTO;
        var tasa=r.TASA;
        var status=r.STATUS;
        html+='<div class="BoxInfo w50 EstadoActual"  data-status="'+status+'"><label class="InfoLabel Tip3" tip="'+nombre+'">'+nombre+'</label>'
            +'<input type="text" class=" InfoData  ImpuestoValor" onkeypress="return SalesUp.Valida.valDecimales({e:event, t:this, v:value});"  name="impuesto'+(i+1)+'" oblur="SalesUp.Valida.valNumero({t:this});" id="impuesto'+(i+1)+'" data-id="" value="'+tasa+'"><span class="pimpuesto">%</span></div></div>'
    }
    $('#Ltprecios').append(html);  
}
SalesUp.Variables.llenaEditar=function(id){
        var data=SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonProductosEditar.dbsp',Parametros:'idProducto='+id, DataType:'json'});
        data=data.jsonDatos;
        $('#codigo').val(data[0].CODIGO);
        $('#nombre').val(data[0].NOMBRE);
        SalesUp.Variables.llenaInputsLineasProducto({id:data[0].IDLINEA_PRODUCTO});
        SalesUp.Variables.llenaInputsMarcas({id:data[0].IDMARCA});
        $('#preciominimo').val(data[0].PRECIO_MIN);
        $('#costo').val(data[0].COSTO);
        $('#unidad').val(data[0].UNIDAD);
        if((data[0].EXISTENCIA==-1)){
           $("#existencia").hide(450);
           setTimeout(function(){$("#selectexistencia").addClass('w100').removeClass('w50');$('#selectexistencia').val(-1);}, 501);
        }else{
          $("#selectexistencia").addClass('w50').removeClass('w100').val(2);
          setTimeout(function() {$('#existencia').show(450).val(data[0].EXISTENCIA);}, 1005);
        }
        $('#desc_extendida1').val(data[0].DESCRIPCION_EXTENDIDA1);
        $('#desc_extendida2').val(data[0].DESCRIPCION_EXTENDIDA2);
        $('#descorta').val(data[0].DESCRIPCION_CORTA);

         $('#precio1').val(data[0].PRECIO1);
         $('#precio2').val(data[0].PRECIO2);
         $('#precio3').val(data[0].PRECIO3);
         $('#precio4').val(data[0].PRECIO4);
         $('#precio5').val(data[0].PRECIO5);
         $('#precio6').val(data[0].PRECIO6);
         $('#precio7').val(data[0].PRECIO7);
         $('#precio8').val(data[0].PRECIO8);
         $('#precio9').val(data[0].PRECIO9);
         $('#precio10').val(data[0].PRECIO10);
         var com1=data[0].COMISION1*100;
         var com2=data[0].COMISION2*100;
         var com3=data[0].COMISION3*100;
         var com4=data[0].COMISION4*100;
         var com5=data[0].COMISION5*100;
         var com6=data[0].COMISION6*100;
         var com7=data[0].COMISION7*100;
         var com8=data[0].COMISION8*100;
         var com9=data[0].COMISION9*100;
         var com10=data[0].COMISION10*100;

         $('#comision1').val(com1);
         $('#comision2').val(com2);
         $('#comision3').val(com3);
         $('#comision4').val(com4);
         $('#comision5').val(com5);
         $('#comision6').val(com6);
         $('#comision7').val(com7);
         $('#comision8').val(com8);
         $('#comision9').val(com9);
         $('#comision10').val(com10);
         console.info(data[0].IMPUESTO4, 'data[0].IMPUESTO');
         var impuesto1=data[0].IMPUESTO1*100;
         var impuesto2=data[0].IMPUESTO2*100;
         var impuesto3=data[0].IMPUESTO3*100;
         var impuesto4=data[0].IMPUESTO4*100;
         var impuesto5=data[0].IMPUESTO5*100;
         var impuesto6=data[0].IMPUESTO6*100;
         var impuesto7=data[0].IMPUESTO7*100;
         var impuesto8=data[0].IMPUESTO8*100;
         var impuesto9=data[0].IMPUESTO9*100;
         var impuesto10=data[0].IMPUESTO10*100;
         console.info(impuesto4, 'impuesto4');
         $('#impuesto1').val(impuesto1);
         $('#impuesto2').val(impuesto2);
         $('#impuesto3').val(impuesto3);
         $('#impuesto4').val(impuesto4.toFixed(2));
         $('#impuesto5').val(impuesto5);
         $('#impuesto6').val(impuesto6);
         $('#impuesto7').val(impuesto7);
         $('#impuesto8').val(impuesto8);
         $('#impuesto9').val(impuesto9);
         $('#impuesto10').val(impuesto10);
         var elemento=$('.naranja').next(); 
         var valor=$(elemento).val();
         console.info(elemento, valor);
         SalesUp.Variables.establecerMontosComision({v:valor, t:elemento});
         var objimagenes=data[0].IMAGENES; 
        if(objimagenes){
            objimagenes=JSON.parse(objimagenes);
             console.table(objimagenes);
            var url='https://s3-us-west-2.amazonaws.com/salesupfiles/'+data[0].CARPETA+'/';
            for(var i=0; i<=objimagenes.length-1; i++){
                var nombre=objimagenes[i].nombre;
                var valor=objimagenes[i].valor; 
                var ruta=url+valor;
                var id='prearchivo'+(i+1);
                if(valor==''){ return;}
                $("#"+id).html('<div class=" ContImagenes AccionesDoc BoxDoc tCen w100 "><img class="imgtam" id="img-archivo1" height="50" src="'+ruta+'"></img><div class="clear">  </div><div class="clear"> </div> <div class="Acciones"> <span tip="Eliminar archivo" class="Pointer Tip1" onclick="SalesUp.Variables.ConfirmaEliminarArchivo({id:'+(i+1)+', img:\''+valor+'\'})" > <i class="fa  fa-trash-o"></i> </span></div></div>');
                $('#imagen'+(i+1)).val(valor);
                $('#archivo'+(i+1)).attr('data-imganterior', valor);
            }
        }

}
SalesUp.Variables.SinFormato=function(Op){
  var v=(Op.v)?Op.v:'';
  var SysSepDecimales = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});
  return accounting.unformat(v, SysSepDecimales);
}


SalesUp.Variables.establecerPorcentajeComision=function(Op){
   var elemento=(Op.t)?Op.t:''; 
   var valor=(Op.v)?Op.v:''; 
   var i=(Op.i)?Op.i:'';
   var MontoActivo=$('.naranja').next().val(); 
   var valorPorcentaje=(valor/MontoActivo)*100;
   console.info(valorPorcentaje);
   $('#comision'+i).val(valorPorcentaje.toFixed(2));

}

SalesUp.Variables.establecerMontosComision=function(Op){  
  var monto=(Op.v)?Op.v:0;
  var elemento=(Op.t)?Op.t:''; 
  //SalesUp.Variables.establecerSimboloMoneda({v:monto,t:elemento});
  var id=$(elemento).attr('id');
  $('#montobase').val(id);
  $('.ComisionValor').each(function(i){
     var elemento=this;
     var nombre=this.name; 
     var valorComision=SalesUp.Variables.SinFormato({v:this.value});
     valorComision=valorComision/100;
     var total=monto*valorComision;
     var i=i+1;
     $('#comisionpct'+i).val(total.toFixed(2));
  });
}
SalesUp.Variables.establecerComisionMonto=function(Op){
  var comision =(Op.v)?Op.v:0; 
      comision=comision/100;
  var indice=(Op.p)?Op.p:'';
  var Monto=$('.naranja').next().val();
  console.info(Monto);
  var precioMinimo=(Monto)?Monto:0; //($('#preciominimo').val())?$('#preciominimo').val():0;
  var total=precioMinimo*comision;
  $('#comisionpct'+indice).val(total.toFixed(2));
}
SalesUp.Variables.establecerMontosComisionDblClick=function(Op){  
  var x=$('.naranja');
  $(x).removeClass('naranja');
  var elemento=(Op.t)?Op.t:'';
  var ElementoSiguiente=$(elemento).next();
  $(elemento).addClass('naranja'); 
  var valor=$(ElementoSiguiente).val();
  SalesUp.Variables.establecerMontosComision({v:valor, t:ElementoSiguiente});
}
//No se esa utlizando.
SalesUp.Variables.establecerSimboloMoneda=function(Op){
  return;
  var elemento=(Op.t)?Op.t:'';
  var valor=(Op.v)?Op.v:0; 
  console.info(valor);
  var simboloMoneda='';
      simboloMoneda=localStorage.SysMoneda; 
      valor=simboloMoneda.concat(valor); 
      valor=valor.substring(1);
  console.info(valor, simboloMoneda); 
  $(elemento).val(valor);
}
SalesUp.Variables.OcultarElementosInactivos=function(){
  var contador=0; 
  var Incremento=30;
  var total=0;
  $('.EstadoActual').each(function(i){
    var Estado=$(this).attr('data-status');
    (Estado==0)? $(this).hide().addClass('Inactivo') : $(this).addClass('Activo');
  });
}
SalesUp.Variables.ContadorElementosActivos=function(){
  var contador=0; 
  var Incremento=30; 
  var Total=0; 
  $('.Activo').each(function(i){
    if(i%2==0){contador++;}
  });
  Total=Incremento*contador;
  console.info(Total);
  return Total;
}

self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:230});
$(function(){

  var AltoPantalla=230;
  SalesUp.Variables.llenaInputs({});
  SalesUp.Variables.llenaComisiones();
  SalesUp.Variables.llenaImpuestos();
  SalesUp.Variables.OcultarElementosInactivos();
  var IncrementoPantalla=SalesUp.Variables.ContadorElementosActivos();
  AltoPantalla=(AltoPantalla==0)? AltoPantalla : AltoPantalla+=IncrementoPantalla;
  self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:AltoPantalla});
  $('#gral').attr('onclick', 'self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:'+AltoPantalla+'});');
  $("#Tabs").tabs();
  ActivaTinyDescripcionProductos();
  if(SalesUp.Variables.idProducto>0){
     $('#BtnAceptar').html('<i class="fa fa-check"></i> Guardar');
     SalesUp.Variables.llenaEditar(SalesUp.Variables.idProducto); 
  }else{
     SalesUp.Variables.HabilitarExistenciaTexto();
     SalesUp.Variables.llenaInputsMarcas({});
     SalesUp.Variables.llenaInputsLineasProducto({});
     
     var existencia=$('#selectexistencia').val();
     $('#existencia').val(existencia);
  }
  SalesUp.Sistema.IniciaPlugins();

});


