  var templateHead = '<tr><td>Impuesto</td><td>Tasa</td></TFD><td class="tCen">Estado</td><td width="60px"></td></tr>';
  var template = '';
  template += '<tr data-Restriccion="coCorporativoX" data-tk="{{TK}}" data-tkm="{{TKM}}">';
  template += '<td><spand class="coEditar coPermitirEditar Pointer  Tip3 Editar" tip="Editar - [TOT_IMPUESTO{{INDICE}}]"   onclick="SalesUp.Variables.NuevoImpuesto({bandera:1, tk:\'{{TK}}\', impuesto:\'{{IMPUESTO}}\', tasa:{{TASA}}, indice:{{INDICE}} });"><b>{{IMPUESTO}} </b></span></td>'; 
  template += '<td class="FormatPercent">{{TASA}}</td>'; 
  template += '<td class="tCen">{{#ifn STATUS "==" 1 }}<i class="fa fa-check fa-lg Tip8" tip="Activo"></i>{{else}}<i class="fa fa-times fa-lg Tip8" tip="Inactivo"></i>{{/ifn}}</td>'
  template += '<td class="tCen coAcciones">';
  template += '<span class="btnNeutral Pointer Btn Btn-rounded Btn-flat-Aceptar Btn-tiny Btn-tiny-min" onmouseenter="SalesUp.Construye.accionesRow({t:this});">';
  template += '<i class="fa fa-lg fa-ellipsis-v"></i>';
  template += '</span>';
  template += '<div class="accionesOcultas" style="display:none;">';

  template +='<span class="OpcionAcciones Pointer" data-nombre="{{IMPUESTO}}" data-Activo="{{STATUS}}" onclick="SalesUp.Variables.CambiarEstatus({tk:\'{{TK}}\',nombre:\'{{IMPUESTO}}\',status:\'{{STATUS}}\' });">{{#ifn STATUS "==" 1 }}<i class="fa fa-times fa-lg"></i> Inactivar{{else}}<i class="fa fa-check fa-lg"></i> Activar{{/ifn}}</span>';
  template += '<span class="divisorMenu"></span>';
  template += '<span class="OpcionAcciones EliminarCatalogo" data-tk="{{TK}}" data-dato="{{IMPUESTO}}" data-q="¿Esta seguro que desea eliminar el impuesto <b>{{IMPUESTO}}</b>?, Nota: los impuestos en productos se actualizarán a 0." onclick="SalesUp.Variables.AlertaEliminarCatalogo({e:this});"> <i class="fa fa-lg fa-trash Tip8"></i> Eliminar</span> </td>';

  template += '</div>';
  // template +='<span class="Movimientos Pointer Estatus-{{TK}}" data-nombre="{{IMPUESTO}}" data-Activo="{{STATUS}}" onclick="SalesUp.Variables.CambiarEstatus(\'{{TK}}\');"></span>';
  // template +='<span class="Pointer EliminarCatalogo" data-tk="{{TK}}" data-dato="{{IMPUESTO}}" data-q="¿Esta seguro que desea eliminar el impuesto <b>{{IMPUESTO}}</b>?, Nota: los impuestos en productos se actualizarán a 0." onclick="SalesUp.Variables.AlertaEliminarCatalogo({e:this});"> <i class="fa fa-lg fa-trash Tip8" tip="Eliminar impuesto"></i></span> </td>';  //SalesUp.Variables.EliminarCluster({ tk:\'{{TK}}\' });"
  template += '</tr>';
  template += '';

SalesUp.Variables.CamposData = function(){
  var jsonLtcp = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonConsultarImpuestos.dbsp', DataType:'json'});
      jsonLtcp = jsonLtcp.jsonDatos;
  var TotalImpuestos=_.size(jsonLtcp); 

  SalesUp.Construye.ConstruyeTabla(templateHead, template, jsonLtcp, {Destino:'#DatosLoad', Id:'LtTablaPersonalizables'} );
  if(TotalImpuestos<10){
    $('#DatosLoad').append('<div class="BoxBotones w100">'+
              '<span onclick="SalesUp.Variables.NuevoImpuesto({bandera:0});" class="Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar btnNeutral"><i class="fa fa-plus"></i> Agregar impuesto</span>'+
              '</div>');
  }else{
    $('#DatosLoad').append('<div class="SinResultados BoxSizing w100" style="margin-top: 5px;"><i class="fa fa-info-circle"></i> Solo se permite agregar 10 impuestos.</div>');
  }
  SalesUp.Sistema.RestriccionesCorporativo();
  SalesUp.Variables.CargaIconosCambiarEstatus();
  SalesUp.Sistema.IniciaPlugins();
}

SalesUp.Variables.NuevoImpuesto=function(Op){
  var bandera=Op.bandera;
  var impuesto=(Op.impuesto)? Op.impuesto: '';
  var tasa=(Op.tasa)?Op.tasa:0;
  var tk=(Op.tk)? Op.tk: '' ;
  var impuesto=(Op.impuesto)? Op.impuesto: '';
  var indice=(Op.indice)?Op.indice:0;
SalesUp.Construye.MuestraPopUp({
        alto:'120px', ancho:'300px', 
        centrado:false,
        id:'Registro', 
        titulo:'Alta Impuesto', 
        fuente:'popup_agregar_impuesto.dbsp?bandera='+bandera+'&tk='+tk+'&impuesto='+impuesto+'&tasa='+tasa+'&indice='+indice,
        callback:'SalesUp.Variables.CamposData'
    });
if(tk!=''){
  setTimeout(function() {
   tasa=(tasa*100).toFixed(2);
   $('#nombreImpuesto').val(impuesto);
   $('#tasa').val(SalesUp.Variables.FormatoMonedaLocal(tasa));
   $('#latasa').val(SalesUp.Variables.FormatoMonedaLocal(tasa)); 
   $('#tk').val(tk); 
   $('#indice').val(indice);
   }, 500);
}

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
    var tk=(Op.tk )?Op.tk:'';
    var nombre=(Op.nombre )?Op.nombre:'';
    var EstaActivo=(Op.status )?Op.status:'';
   // var EstaActivo=$('.Estatusi-'+tk).attr('data-Activo');
    var msg=(Number(EstaActivo)==1)? 'inactivar' : 'activar';
    //var nombre=$('.Estatus-'+tk).attr('data-nombre');
        SalesUp.Construye.MuestraAlerta({
              TipoAlerta:'AlertaPregunta',
              Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/> ¿Está seguro que desea '+msg+' el impuesto '+nombre+'?',
              Boton1:'Aceptar',
              Boton2:'Cancelar',
              Callback1: 'SalesUp.Variables.Inactivar({tk:\''+tk+'\', tipo:'+EstaActivo+'})',
              Icono1:'<i class="fa fa-check"></i>',
              Icono2:'',
              Ancho:'300px'
        });
}
SalesUp.Variables.Inactivar=function(Op){
   var tk=(Op.tk)?Op.tk:'';
   var Accion=Op.tipo; 
   var status=(Number(Accion)==1)?0:1;
   var htmlActivo='<i class="fa fa-check Inactivar Tip1" tip="Activar">';
   var htmlInactivo='<i class="fa fa-lg fa-times Activar Tip1" tip="Inactivar"></i>';
   var respuesta=SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonCambiarStatusImpuesto.dbsp', Parametros:'tk='+tk+'&status='+status, DataType:'json'}).jsonDatos;
   var respuesta=respuesta[0].STATUS;
    setTimeout(function() {
      if(Number(respuesta)==1){
        $('.Estatus-'+tk).html(htmlInactivo).attr('data-activo', 1);
       }else{
        $('.Estatus-'+tk).html(htmlActivo).attr('data-activo', 0);;
       }
       GetData();
       SalesUp.Sistema.IniciaPlugins();
    }, 1000);
   
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
          Callback1: Funcion+'({tk:\''+tk+'\'})',
          Icono1:'<i class="fa fa-trash"></i>',
          Icono2:'<i class="fa fa-times"></i>',
          Ancho:'500px'
        });
      }

SalesUp.Variables.EliminarCatalogo = function(Op){
    var tk=(Op.tk)?Op.tk:0;
    var datos= SalesUp.Sistema.CargaDatos({Link:'Modelo/quryEliminarImpuestos.dbsp', Parametros:'tk='+tk, DataType:'json'});
    GetData();
}
function GetData(){
  SalesUp.Variables.CamposData(); 
}

//===============================
  SalesUp.Variables.CamposData();

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



