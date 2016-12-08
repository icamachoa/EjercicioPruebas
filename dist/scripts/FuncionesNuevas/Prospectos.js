var Destino = '#DatosLoad', IdTabla="TablaProspectos", IdVentana = 1;
var Datos, TemplateDatos, NombreCampos;
var ProspectosTheadColumas = 'ProspectosTheadColumas', ProspectosTbodyColumas = 'ProspectosTbodyColumas';

SalesUp.Variables.TemplateVermas = '<div {{Eventos}} class="w100 tCen Pointer"><span Id="{{IdVermas}}" class="Btn Btn-flat-Aceptar Btn-tiny"><i class="fa fa-angle-down fa-lg"></i> <b>Ver más</b></span></div>';

SalesUp.Variables.RecargarTodo = false;
SalesUp.Variables.Switch = SalesUp.Sistema.Almacenamiento({a:'SysSwitchProspectosEmpresas'});

/*agregado*/
setTimeout(function(){SalesUp.Sistema.CatalogosActivos({EstoyEn:'Prospectos'});}, 200);

/*modificado*/
if(_.isUndefined(SalesUp.Variables.Switch)){
  SalesUp.Variables.VerOriginal = true;
  SalesUp.Variables.VerPorEmpresas = false;
  SalesUp.Variables.Switch = 0;
  SalesUp.Sistema.Almacenamiento({a:'SysSwitchProspectosEmpresas', v:'0'});
}else{
  (!SalesUp.Variables.Switch) ? SalesUp.Variables.Switch = 0 : '';
  SalesUp.Variables.Switch = parseInt(SalesUp.Variables.Switch);

  /*agregado*/
  SalesUp.Variables.VerPorEmpresas = false;
  SalesUp.Variables.VerOriginal = false;
  SalesUp.Variables.AgrupacionCatalogo = false;
  
  /*modificado*/
  if(SalesUp.Variables.Switch==0){
    SalesUp.Variables.VerOriginal = true;
    $('#CheckProspectosEmpresas').prop('checked',false);
  }else if(SalesUp.Variables.Switch==1){
    SalesUp.Variables.VerPorEmpresas = true;
    $('#CheckProspectosEmpresas').prop('checked',true);
    $('#SwitchProspectosEmpresas').attr('tip','Vista de contactos');
  }else{
    SalesUp.Variables.AgrupacionCatalogo = true;
    SalesUp.Variables.Tkca = SalesUp.Sistema.Almacenamiento({a:'SysSwitchProspectosEmpresas'});
  }
  
}

SalesUp.Variables.SwitchActivo = function(Op){
  var Tip = '';
  var $Elemento = $(Op.Elemento);
  
  SalesUp.Variables.VerPorEmpresas = $Elemento.is(':checked');

  if(SalesUp.Variables.VerPorEmpresas){
    Tip = 'Vista de contactos';
    SalesUp.Sistema.Almacenamiento({a:'SysSwitchProspectosEmpresas', v:'1'});
  }else{
    Tip = 'Vista de empresas';
    SalesUp.Sistema.Almacenamiento({a:'SysSwitchProspectosEmpresas', v:'0'});
  }
  
  $('#SwitchProspectosEmpresas').attr('tip',Tip);
  ReloadData();
}

function iraPag(Ir){
  PagAct = Ir;
  var Cond = '';
  SalesUp.Sistema.paginaActual({pagAct:PagAct});
  ActivaPaginacion(Cond,Ir);

}

var JsProspectos = function(){
  
  if(SalesUp.Variables.VerPorEmpresas){
    //por empresa
  }else{
    $('#DatosLoad').append('<div id="BtnExportarImportar" class="BoxBotones"></div>');
    var AbreExportar = "SalesUp.Ventana.AbrePopUp({Titulo:'Exportar prospectos', Pagina:'/privado/popup_tipo_exportacion.dbsp', Parametros:'&ExportacionPantalla="+escape('Prospectos en pantalla')+"&ExportacionTotal="+escape('Todos los prospectos')+"&pantalla="+IdVentana+"', CallBack:'ReloadData', Iframe:true, Alto:130, Ancho:280 })";

    SalesUp.Construye.AgregaBoton({DentroDe:'#BtnExportarImportar', btnTamanio:'Btn-tiny Btn-tiny-min', Boton:'Exportar prospectos', Titulo:'Exportar información', Onclick:AbreExportar, Icono:'fa-clipboard', Clases:'ExportarInformacion' });
    SalesUp.Construye.AgregaBoton({DentroDe:'#BtnExportarImportar', btnTamanio:'Btn-tiny Btn-tiny-min', Boton:'Importar prospectos', Titulo:'Importa tu información', Onclick:'document.location=\'/privado/importacion.dbsp?tit=0\'', Icono:'fa-sign-in' });
  }
  SalesUp.Sistema.OcultaEspera();
}/*JsProspectos*/


var ReloadData = function(){
  nRegistros=0, Datos=undefined;
  SalesUp.Sistema.ColoresTema();
  SalesUp.Sistema.MuestraEspera(Destino,1);
  SalesUp.Sistema.MuestraEspera('#LosFiltros',2);
  setTimeout(function(){
    /*modificado*/
    if(SalesUp.Variables.VerPorEmpresas){
      SalesUp.Variables.VistaPorEmpresas({});
    }

    /*modificado*/
    if(SalesUp.Variables.VerOriginal){
      SalesUp.Sistema.CargaDatos({Link:'/privado/LosFiltrosProspectos.dbsp', Parametros:'IdVentana='+IdVentana, Destino:'#LosFiltros' });
      
      SalesUp.Sistema.CargaDatos({Link:'/privado/vacio.dbsp', DataType:'json'});
      
      NombreCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/TemplateProspectos.dbsp', Parametros:'thead=1&IdVentana='+IdVentana, Div:0, Almacen: ProspectosTheadColumas });
      
      TemplateDatos = SalesUp.Sistema.CargaDatos({Link:'/privado/TemplateProspectos.dbsp', Parametros:'thead=0&IdVentana='+IdVentana, Div:0, Almacen: ProspectosTbodyColumas });
      
      DatosJson = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonProspectos.dbsp', Parametros:'start='+Start+'&howmany='+RegXPag+'&IdVentana='+IdVentana, DataType:'json', Div:0 });
      SalesUp.Variables.jsonprospectos = DatosJson;
      SalesUp.Sistema.CargaDatos({Link:'/privado/vacio.dbsp', DataType:'json'});
      if(DatosJson!==undefined){
        Datos = DatosJson.JsonDatos;
        nRegistros = 49;
        (DatosJson.Registros.TotalResgistros) ? nRegistros = DatosJson.Registros.TotalResgistros: '';
      }
      SalesUp.Construye.ConstruyeTabla(NombreCampos, TemplateDatos, Datos, {Destino:Destino, Id:IdTabla, Callback:JsProspectos, PagActual:PagAct, NumRegistros:nRegistros } );

    }/* if(SalesUp.Variables.VerOriginal) */

    /*agregado*/
    if(SalesUp.Variables.AgrupacionCatalogo){
      SalesUp.Sistema.VistaPorAgrupacion({
        IdVentana: IdVentana, 
        LosFiltros:'LosFiltrosProspectos.dbsp',
        modeloJson: 'jsonProspectosCatalogos.dbsp'
      });
      SalesUp.Sistema.OcultaEspera()
    }

    ProspectosAdicionales();
    //SalesUp.Sistema.OcultaEspera();
  },100); /* setTimeout */
  var valida = _.size(SalesUp.Variables.GuardaOp)
  if(valida>0){
    setTimeout(function(){
      SalesUp.Variables.openTr()
    }, 2000)
  }
  
}/*ReloadData*/

SalesUp.Variables.FuncionesAdicionales = function(){
    ProspectosAdicionales();
}


  SalesUp.Variables.VistaPorEmpresas = function(Op){
    Start = (typeof Start != "undefined") ? Start : 1;
    SalesUp.Sistema.CargaDatosAsync({link:'modelo/jsonProspectosEmpresasTabla.dbsp',
      DataType:'json',
      parametros:'inicia='+Start+'&howmany='+RegXPag+'&IdVentana=1',
      callback: VistaPorEmpresas
    });
    function VistaPorEmpresas (Op){

      SalesUp.Sistema.CargaDatos({Link:'/privado/LosFiltrosProspectos.dbsp', Parametros:'IdVentana=1', Destino:'#LosFiltros' });
      var template = '';
      jsonOb = Op.jsonDatos;
      totalRegistros =Op.Registros.RESULTADOS;
      templateHead = '<tr><td><a id="ConfigurarPantalla" tip="Ordenar columnas de Prospectos" class="thickbox Tip2" href="/privado/PopupOrdenarColumnas.dbsp?IdVentana=1&amp;TB_callback=ReloadData&amp;TB_iframe=true&amp;height=280&amp;width=400&amp;modal=true&amp;modalAlt=true&amp;CloseReload=true" original-title=""><img src="../estilos/icon-gear.png"></a></td><td>Empresa</td><td>Corporativo</td><td>Industria</td><td>Página web</td><td>Teléfono</td><td>Último contacto</td><td>Eje</td><td class="tCen" style="width:95px;"></td></tr>';
      template += '<tr>';
      template += '<td><b>{{nFila}}</b></td>';
      template += '<td ><a href="/privado/EmpresasVisualizar.dbsp?tkCom={{TkCom}}"><i class="fa fa-building-o"></i> {{Empresa}}</a></td> ';
      template += '<td >{{Industria}}</td>';
      template += '<td >{{CompaniaGrupo}}</td> ';
      template += '<td>{{Url}}</td>';
      template += '<td>{{Telefono}}</td>';
      template += '<td >{{#if ORD}}<i><a href="/privado/prospectos-visualizar.dbsp?tkp={{TKP}}">{{Contacto}}</a> - <span class="Tip8" tip="{{NOMBRE_USUARIO_CONTACTO}}">[{{{INICIALES_CONTACTO}}}]</span> - {{{TIEMPO_CONTACTO}}} - {{{COMENTARIO}}}</i>{{/if}}</td> ';
      template += '<td class="Tip8 tCen" Tip="{{NOMBRE}} {{APELLIDOS}}">{{INICIALES}}</td>';
      template += '<td><div style="width:95px"><span id="op_{{TkCom}}" {{#if NRT}}onclick="SalesUp.Variables.addtr({e:this,tk:\'{{TkCom}}\',nrt:\'{{NRT}}\'})"{{/if}} class=" Pointer Btn Btn-rounded Btn-flat-Aceptar Btn-tiny Btn-tiny-min" style="position:relative; border-radius: 3px 0px 0px 3px; padding: 0px 7px;width:35px !important;">{{#if NRT}}{{NRT}}&nbsp;<i class="fa fa-chevron-down"></i>{{else}}0&nbsp;<i class="fa"></i>{{/if}}</span>';
      
      template += ' '+SalesUp.Variables.OpcAc+' </div></td>';
      
      template += '</tr>';
      SalesUp.Construye.ConstruyeTabla(templateHead, template, jsonOb, {Destino:'#DatosLoad', Id:'TablaEmpresas', PagActual:PagAct,  NumRegistros:totalRegistros } );
    }
  } /* SalesUp.Variables.VistaPorEmpresa */



SalesUp.Variables.reasignarEmpresa = function(tkCom){
  SalesUp.Variables.TkCom = tkCom
  SalesUp.Construye.MuestraPopUp({
    alto:'150px', 
    ancho:'450px',
    titulo:'Reasignar', id:'popUpReasignarEmpresa',
    fuente:'/privado/popup_reasignar_empresa.dbsp'
  });
  SalesUp.Variables.jsonInformacionEmpresa = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonInformacionEmpresa.dbsp', Parametros:{TkCom:SalesUp.Variables.TkCom}, DataType:'json' });
  setTimeout(function() {SalesUp.Variables.LtUsuariosGruposAutorizados(SalesUp.Variables.TkCom);}, 100);}   

SalesUp.Variables.reasignarListo = function(Op,err){
    if(err){
      SalesUp.Construye.MuestraMsj({tMsg:4, Msg:' Hubo un error al momento de reasignar la empresa, intentalo nuevamente.', Destino:'#popUpReasignarEmpresa .BodyModal'});
      return false;
    }

    SalesUp.Variables.InformacionEmpresa();
    SalesUp.Construye.CierraPopUp({t:SalesUp.Variables.thisActual});
     setTimeout(function(){ReloadData()}, 300);
    setTimeout(function(){ SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-check"></i> Reasignación realizada.'}); }, 1000);
    SalesUp.Variables.thisActual = undefined;}

SalesUp.Variables.InformacionEmpresa = function(){
  SalesUp.Sistema.MuestraEspera('#InformacionEmpresa',1);
  setTimeout(function() {
    SalesUp.Sistema.BorrarTodoAlmacen();
    SalesUp.Variables.HtmlDatosEmpresa = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateEmpresasVisualizar.dbsp', Parametros:'', Almacen: 'HtmlDatosEmpresa' });
    SalesUp.Variables.jsonInformacionEmpresa = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonInformacionEmpresa.dbsp', Parametros:{TkCom:SalesUp.Variables.TkCom}, DataType:'json' });
    
    SalesUp.Construye.ReemplazaTemplate({
      Template: SalesUp.Variables.HtmlDatosEmpresa, 
      Destino: '#InformacionEmpresa',
      Datos: SalesUp.Variables.jsonInformacionEmpresa.jsonDatos
    });

    var puedeEditarEmpresa = SalesUp.Variables.jsonInformacionEmpresa.jsonDatos[0].puedeEditarEmpresa;
    var $btnAccionesEmpresa = $('#btnAccionesEmpresa');
    if (puedeEditarEmpresa){
      $btnAccionesEmpresa.show();
    }else{
      $btnAccionesEmpresa.remove();
    }
    SalesUp.Variables.campoPersonalizadoEmpresa();

    $('.InLine, .EditarInLine').on('click',function(){
      var Posicion = $(this).parent().parent().index();
      SalesUp.empresas.nuevaEmpresa(1);
    });

    SalesUp.Sistema.OcultaEspera();
    SalesUp.Sistema.UltimaVisita();
  }, 100);} 

SalesUp.Variables.guardaReasignarEmpresa = function(Op){
    SalesUp.Variables.thisActual = Op.t;
    var ejecutivoSeleccionado = $('#idusuarioSeleccionado').val();
    if( SalesUp.Valida.ValidaObligatorios({DentroDe:'#frmAsignarEmpresa', DestinoMsj:'#popUpReasignarEmpresa .BodyModal'}) ){
      SalesUp.Sistema.CargaDatosAsync({
        link:'/privado/Modelo/qryReasignarEmpresa.dbsp', 
        parametros:'TKCOM='+SalesUp.Variables.TkCom+'&IDUSUARIOUP='+ejecutivoSeleccionado,
        callback:SalesUp.Variables.reasignarListo
      });
    }}

SalesUp.Variables.LtUsuariosGruposAutorizados = function(tkCom){
    var sGrupo = SalesUp.Variables.sIdGrupo;
    var jsonUsuarios = SalesUp.Sistema.CargaDatos({ Link:'/privado/Modelo/jsonListarUsuarios.dbsp', DataType:'json' });
    SalesUp.Variables.jsonUsuarios = jsonUsuarios;
    var idUsuario = SalesUp.Variables.jsonInformacionEmpresa.jsonDatos[0].IDUSUARIO;

    jsonUsuarios = _.reject(jsonUsuarios.jsonDatos, function(j){  
      if(j.IDUSUARIO == idUsuario){
        return j;
      }
    });

    var arrGrupos = [];
    var arrIdGrupos = [];
    var objGrupos = [];

    for(var i = 0; i <= jsonUsuarios.length - 1; i++){
      var GRUPO = jsonUsuarios[i].GRUPO;
      var IDGRUPO = jsonUsuarios[i].IDGRUPO;
      var arr={};
      if(arrGrupos.indexOf(GRUPO)==-1){
        arr.GRUPO = GRUPO;
        objGrupos.push(arr);
        arrGrupos.push(GRUPO);
        arrIdGrupos.push(IDGRUPO);
      }
    }

    var Posicion = '';
    for(var x = 0; x <= arrIdGrupos.length - 1; x++){
      if(arrIdGrupos[x]==sGrupo){Posicion=x;}
    }

    var MiGrupo = arrGrupos[Posicion];

    arrGrupos = _.reject(arrGrupos, function(arr){ 
      if(arr==MiGrupo)
      return arr; 
    });

    var arrNuevoOrden = [];
    arrNuevoOrden.push(MiGrupo);

    arrGrupos = _.sortBy(arrGrupos, function(arr){ 
      return arr; 
    });

    for(var z = 0; z <= arrGrupos.length - 1; z++){
      arrNuevoOrden.push(arrGrupos[z]);
    }
    setTimeout(function(){
       $('#idusuarioSeleccionado').selectize({
          maxItems:1,plugins: ['optgroup_columns'],
          dropdownParent:'body', 
          options:jsonUsuarios,
          valueField:'IDUSUARIO',
          searchField:['NOMBRE'],
          labelField:'NOMBRE',
          optgroups:objGrupos,
          optgroupField:'GRUPO',
          optgroupLabelField:'GRUPO',
          optgroupValueField:'GRUPO',
          optgroupOrder:arrNuevoOrden
      });

      $('.selectize-control.idusuarioSeleccionado').addClass('BoxSizing InfoData');
    }, 10);} 

SalesUp.Variables.campoPersonalizadoEmpresa = function(){
  var templateCampos = '';
  templateCampos += '{{#each jsonCampos}}';
  templateCampos += '  <div class="BoxInfo BoxInfoDetalle InLine {{w}} {{ContenedorMemo}} {{Ocultar}}">';
  templateCampos += '    <label class="BoxSizing InfoLabel Tip4" {{Tipsy}} >{{Campo}}</label>';
  templateCampos += '    {{InfoDatoProspecto this ../jsonDatosEmpresa}}';
  templateCampos += '  </div>';
  templateCampos += '{{/each}}';

  var jt = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonNombresTab.dbsp', Parametros:'idventana=1', DataType:'json'});
  var jc = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCampos.dbsp', Parametros:'idventana=1', DataType:'json'});

  jt = jt.jsonDatos;
  jc = jc.jsonDatos;
  var idTab;
  jt = _.where(jt,{tabF:'4'});
  if(jt){
    jt = jt[0];
    idTab = jt.IDTAB;
  }

  jc = _.where(jc,{IdTab:idTab});
  jc = _.where(jc,{Naturaleza:2});

  var jAux = {};
  jAux.jsonCampos = jc;
  jAux.jsonDatosEmpresa = SalesUp.Variables.jsonInformacionEmpresa.jsonDatos;



  var html = SalesUp.Construye.ReemplazaDatos({Template:templateCampos, Datos:jAux });


  $('#InformacionEmpresa').append(html);}

SalesUp.Variables.GuardaOp = [];


SalesUp.Variables.openTr = function(){
  var arr = SalesUp.Variables.GuardaOp;
  var tiempo = 1;
  for (var i = 0; i < arr.length; i++){
     var $btn = $("#op_"+arr[i].tk);
  tiempo = i*300;
  retraso($btn,tiempo);
  }
}


var retraso = function($btn, tiempo){

   setTimeout(function(){
    $btn.click();
   }, tiempo);
}

SalesUp.Variables.addtr = function(Op){
 var temp1;
 var arr = SalesUp.Variables.GuardaOp;
  var verifica =  _.size( _.where(arr,Op) )
  if(verifica==0){
    SalesUp.Variables.GuardaOp.push(Op);
  }

 
  var tkR = Op.tk;
  Op.nrt ? SalesUp.Sistema.Almacenamiento({a:'NRT_'+tkR,v:Op.nrt}) : SalesUp.Sistema.Almacenamiento({a:'NRT_'+tkR})
  if(Op.e){elemento = Op.e;
    SalesUp.Sistema.Almacenamiento({a:'element_'+tkR,v:Op.e})
    $(elemento).attr('onclick','SalesUp.Variables.rmtr({e:this,tk:'+JSON.stringify(tkR)+'})')
    temp1 = $(elemento).closest("tr");
    temp1.find('.fa-chevron-down').removeClass('fa-chevron-down').addClass('fa-spinner fa-spin');
  
  
    $(temp1).after('<tr class=" nohov"><td colspan="15"  style="padding: 0;border-top: none;" ><div class="tablaInterna" id="PutData_'+tkR+'"></div></td></tr>');
    }        

    $('#PutData_'+tkR+'').html(SalesUp.Sistema.unMomento())

  SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonProspectos.dbsp',
      DataType:'json',
      parametros:'IdVentana=1&tkcom='+tkR,
      callback: MustreProspectos
  });
  function MustreProspectos (DatosJson) {
    var Datos = DatosJson.JsonDatos;
    NombreCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/TemplateProspectos.dbsp', Parametros:'thead=1&IdVentana=1', Div:0, Almacen: ProspectosTheadColumas });
        
    TemplateDatos = SalesUp.Sistema.CargaDatos({Link:'/privado/TemplateProspectos.dbsp', Parametros:'thead=0&IdVentana=1', Div:0, Almacen: ProspectosTbodyColumas });

    SalesUp.Construye.ConstruyeTabla(NombreCampos, TemplateDatos, Datos, {Destino:'#PutData_'+tkR,elInicio:1, Id:'tablas'+tkR, PagActual:1} );
    var  TotalResgistros = DatosJson.Registros.TotalResgistros
    var faltantes = SalesUp.Sistema.Almacenamiento({a:'NRT_'+tkR})-TotalResgistros;
    if (faltantes > 0) {
      var piloto = '<div class="SinResultados BoxSizing w100"> <p style="font-size:12px;"> <i class="fa fa-1x fa-info-circle"></i> Existen otros ('+faltantes+') contactos asociados a esta empresa que no están compartidos</p> </div>';
    }
    
    $('#PutData_'+Op.tk+' table').after(piloto);
    $('#PutData_'+Op.tk).removeClass('zebra');
    $('.OcultaSiHayTkcom').remove();
    $('.NombreEmpresa').remove();
    $('#tablas'+tkR+' thead #NombreEmpresa').html('Nombre');
    $('table.simple tbody tr:odd').removeClass('zebra');
    $('.tablaInterna table thead tr').addClass('zebra');
        if (temp1) {
            temp1.find('.fa-spinner').removeClass('fa-spinner').removeClass('fa-spin').addClass('fa-chevron-up');
        }
    ProspectosAdicionales();
  }
  
}

SalesUp.Variables.rmtr  = function(Op){
  elemento = Op.e;
  var arr = SalesUp.Variables.GuardaOp;
  for (var i = 0; i < arr.length; i++) {
    if(arr[i].tk==Op.tk){
       SalesUp.Variables.GuardaOp.splice(i,1);
    }
  }
  $(elemento).attr('onclick','SalesUp.Variables.addtr({e:this,tk:'+JSON.stringify(Op.tk)+'})')
  temp1 = $(elemento).closest("tr");
  temp1.find('.fa-chevron-up').removeClass('fa-chevron-up').addClass('fa-chevron-down');
  $(temp1).next().remove();
}

SalesUp.Variables.procesaCompartir = function(tkcom){
  var guardaTkp = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonProspectosReturn.dbsp',
    DataType:'json',
    Parametros:'IdVentana=1&tkcom='+tkcom
  });     

  var totalP = guardaTkp.JsonDatos.length;
  var listap = [];
  for (var i = 0; i < totalP; i++) {
     listap[i] = guardaTkp.JsonDatos[i].TKP
  }
  listap = listap.join(',');

  SalesUp.Sistema.AbrePopUp({
    Titulo: 'Compartir prospecto con:', 
    Pagina:'/privado/popup_compartir_prospecto_varios.dbsp', 
    Parametros:'propio=1&diff=1&listap='+listap+'&totp='+totalP+'&tkcom='+tkcom, 
    Alto:150, 
    Ancho:586
  });}


SalesUp.Variables.procesaEtiquetar = function(tkcom,reaload){
  var guardaTkp = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonProspectosReturn.dbsp',
    DataType:'json',
    Parametros:'IdVentana=1&tkcom='+tkcom
  }); 
  var totalP = guardaTkp.JsonDatos.length;
  var listap = [];
  for (var i = 0; i < totalP; i++) {
     listap[i] = guardaTkp.JsonDatos[i].TKP
  }
  listap = listap.join(',');

  SalesUp.Sistema.AbrePopUp({
    Titulo:'Etiquetar prospecto como parte de un segmento', 
    Pagina:'/privado/popup_etiqueta_prospectos_varios.dbsp', 
    Parametros:'propio=1&diff=1&listap='+listap+'&totp='+totalP+'&tkcom='+tkcom,  
    CallBack:reaload, 
    Alto:300, 
    Ancho:470
  });}

SalesUp.Variables.editar = function(tkcom){
  SalesUp.Variables.TkCom = tkcom;
  SalesUp.Variables.Diff = 1
  SalesUp.empresas.nuevaEmpresa(1);
}


//SalesUp.Variables.OpcAc = '<span class="btnNeutral Pointer Btn Btn-rounded Btn-flat-Aceptar Btn-tiny Btn-tiny-min" style="position: relative; left: -5px; border-radius: 0px 3px 3px 0px;" onmouseenter="SalesUp.Construye.accionesRow({t:this});"> <i class="fa fa-lg fa-ellipsis-v"></i> </span> <div class="accionesOcultas" style="display:none;"> <span class="OpcionAcciones Pointer" onclick="SalesUp.Sistema.AbrePopUp({Titulo:\'Editar prospecto\', Pagina:\'/privado/PopUpNuevoProspecto.dbsp\', Parametros:\'tkcom={{TkCom}}&avanzado=1\', CallBack:\'{{ReloadData}}\', Alto:150, Ancho:500});"> <i class="fa fa-lg fa-user-plus"></i> Agregar prospecto </span>  <span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.reasignarEmpresa(\'{{TkCom}}\')" > <i class="fa fa-lg fa-arrow-right"></i> Reasignar</span>    {{#if NRT}}<span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.procesaCompartir(\'{{TkCom}}\')"> <i class="fa fa-lg fa-users"></i> Compartir </span> {{/if}}    {{#if NRT}} <span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.procesaEtiquetar(\'{{TkCom}}\',\'{{ReloadData}}\')"> <i class="fa fa-lg fa-tag"></i> EtiquetarOld </span><span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.etiquetarMultiple.mostrarPopup({titulo: \'Etiquetar varios prospectos\', template: \'Prospectos\', origen: \'empresas\', tkcom: \'{{TkCom}}\',tkpe: 1, callback: \'{{ReloadData}}\'})"> <i class="fa fa-lg fa-tag"></i> Etiquetar </span>{{/if}}  <span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.editar(\'{{TkCom}}\')"> <i class="fa fa-lg fa-edit"></i>  Editar</span> </div>'
SalesUp.Variables.OpcAc = '<span class="btnNeutral Pointer Btn Btn-rounded Btn-flat-Aceptar Btn-tiny Btn-tiny-min" style="position: relative; left: -5px; border-radius: 0px 3px 3px 0px;" onmouseenter="SalesUp.Construye.accionesRow({t:this});"> <i class="fa fa-lg fa-ellipsis-v"></i> </span> <div class="accionesOcultas" style="display:none;"> <span class="OpcionAcciones Pointer" onclick="SalesUp.Sistema.AbrePopUp({Titulo:\'Editar prospecto\', Pagina:\'/privado/PopUpNuevoProspecto.dbsp\', Parametros:\'tkcom={{TkCom}}&avanzado=1\', CallBack:\'{{ReloadData}}\', Alto:150, Ancho:500});"> <i class="fa fa-lg fa-user-plus"></i> Agregar prospecto </span>  <span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.reasignarEmpresa(\'{{TkCom}}\')" > <i class="fa fa-lg fa-arrow-right"></i> Reasignar</span>    {{#if NRT}}<span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.procesaCompartir(\'{{TkCom}}\')"> <i class="fa fa-lg fa-users"></i> Compartir </span> {{/if}}    {{#if NRT}}<span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.etiquetarMultiple.mostrarPopup({titulo: \'Etiquetar varios prospectos\', template: \'Prospectos\', origen: \'empresas\', tkcom: \'{{TkCom}}\',tkpe: 1, callback: \'{{ReloadData}}\'})"> <i class="fa fa-lg fa-tag"></i> Etiquetar </span>{{/if}}  <span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.editar(\'{{TkCom}}\')"> <i class="fa fa-lg fa-edit"></i>  Editar</span> </div>'


// SalesUp.Variables.accionesO = '<span  class="btnNeutral Pointer Btn Btn-rounded Btn-flat-Aceptar Btn-tiny Btn-tiny-min" style="position: relative; left: -5px; border-radius: 0px 3px 3px 0px;" tkp="{{Tkp}}" onmouseenter="SalesUp.Variables.menuC({t:this});> <i class="fa fa-lg fa-ellipsis-v"></i></span>';

SalesUp.Variables.OverVermas = true;
SalesUp.Variables.VerMasEmpresas = function(Op){
  if(SalesUp.Variables.OverVermas){
    SalesUp.Variables.OverVermas = false;
    var $Elemento = $(Op.Elemento);
    SalesUp.Sistema.MuestraEspera($Elemento,1);
    setTimeout(function() { SalesUp.Variables.VistaPorEmpresa({start:Op.Start}); $Elemento.remove(); SalesUp.Sistema.OcultaEspera(); SalesUp.Variables.OverVermas = true; }, 300);
  }
} /* /SalesUp.Variables.VerMasEmpresas */
$(function(){
  var estaEnPagina = SalesUp.Sistema.paginaActual();
  (!estaEnPagina) ? estaEnPagina = 1:'';
  PagAct= estaEnPagina;
  ActivaPaginacion('',estaEnPagina);
  /*ReloadData(); */
});

SalesUp.Variables.EjecutaMostrarTabla = function(Op){
  SalesUp.Variables.MostrarTabla({Elemento:$('#Mostrar'+Op.Id), t:Op.Id , tkcom:Op.tkcom, nRegistros:Op.nRegistros });
}

SalesUp.Variables.ReloadDataEmpresaProsp = function(Op){

  if(SalesUp.Variables.RecargarTodo){
    ReloadData();
    setTimeout(function() {
      $('#BoxTabla'+SalesUp.Variables.IdEmpresaProsp).html('');
        $('#Mostrar'+SalesUp.Variables.IdEmpresaProsp).removeAttr('abierto');
        SalesUp.Variables.MostrarTabla({
          Elemento:$('#Mostrar'+SalesUp.Variables.IdEmpresaProsp), 
          t:SalesUp.Variables.IdEmpresaProsp , 
          tkcom:SalesUp.Variables.tkComSeleccionadaProsp, 
          nRegistros:SalesUp.Variables.nRegistrosProsp 
        });
    }, 300);
  }else{
    $('#BoxTabla'+SalesUp.Variables.IdEmpresaProsp).html('');
      $('#Mostrar'+SalesUp.Variables.IdEmpresaProsp).removeAttr('abierto');
      SalesUp.Variables.MostrarTabla({
        Elemento:$('#Mostrar'+SalesUp.Variables.IdEmpresaProsp), 
        t:SalesUp.Variables.IdEmpresaProsp , 
        tkcom:SalesUp.Variables.tkComSeleccionadaProsp, 
        nRegistros:SalesUp.Variables.nRegistrosProsp 
      });
  }    
}

SalesUp.Variables.MostrarTabla = function(Op){
  var $Elemento = $(Op.Elemento);
  var Abierto = parseInt($Elemento.attr('abierto'));

  SalesUp.Variables.IdEmpresaProsp = Op.t;
  SalesUp.Variables.tkComSeleccionadaProsp = Op.tkcom;
  SalesUp.Variables.nRegistrosProsp = Op.nRegistros;

  //if(Op.tkcom==''){ Op.tkcom = 'Sin'; }
  if(Abierto>0){
    $('#BoxTabla'+Op.t).slideUp('slow');
    $Elemento.attr('abierto',0).addClass('fa-angle-down').removeClass('fa-angle-up');
  }else{
    $('#BoxTabla'+Op.t).slideDown('slow');  
    $Elemento.attr('abierto',1).removeClass('fa-angle-down').addClass('fa-spinner fa-spin');
    SalesUp.Variables.ExisteTabla = _.size($('#BoxTabla'+Op.t).find('table'));
    
    setTimeout(function(){
      if(SalesUp.Variables.ExisteTabla==0){
        SalesUp.Variables.Template1 = SalesUp.Sistema.CargaDatos({Link:'/privado/TemplateProspectos.dbsp', Parametros:'thead=1&IdVentana='+IdVentana, Almacen: ProspectosTheadColumas });
        SalesUp.Variables.Template2 = SalesUp.Sistema.CargaDatos({Link:'/privado/TemplateProspectos.dbsp', Parametros:'thead=0&IdVentana='+IdVentana, Almacen: ProspectosTbodyColumas });
        SalesUp.Variables.jsonProspectos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonProspectos.dbsp', Parametros:'start=1&howmany=50&IdVentana='+IdVentana+'&tkcom='+Op.tkcom, DataType:'json' });
        $('#ComentarioI'+Op.t).html(SalesUp.Variables.jsonProspectos.UltimoComentario.ULTIMOCOMENTARIO);
        SalesUp.Construye.ConstruyeTabla(SalesUp.Variables.Template1, SalesUp.Variables.Template2, SalesUp.Variables.jsonProspectos.JsonDatos, 
          { Destino: '#BoxTabla'+Op.t,  Id: 'ProspectosEmpresa-'+Op.t }
        );                

        if(Op.nRegistros>50){
          var id = "'"+Op.tkcom+"'";
          $('#BoxTabla'+Op.t).append('<div onclick="SalesUp.Variables.VerMasResultados({ Elemento:this, tkcom: '+id+', t:'+Op.t+' , Start:51, howMany:50 });" class="w100 tCen Pointer"><span Id="VerMas" class="Btn Btn-flat-Aceptar Btn-tiny"><i class="fa fa-angle-down fa-lg"></i> <b>Ver más</b></span></div>'); 
        }
      }
      $Elemento.removeClass('fa-spinner fa-spin').addClass('fa-angle-up');

      $('.NombreEmpresa').hide();
      $('.PuestoContacto').show();

      if(Op.t=='-1'){ $('.NombreEmpresa').show(); }
      
      ProspectosAdicionales();
    }, 200);
    
  }
  
} /* /SalesUp.Variables.MostrarTabla */

SalesUp.Variables.VerMasResultados = function(Op){
  var $Elemento = $(Op.Elemento);
  SalesUp.Sistema.MuestraEspera($Elemento,1);

  SalesUp.Variables.TemplateRow = SalesUp.Sistema.CargaDatos({Link:'/privado/TemplateProspectos.dbsp', Parametros:'thead=0&IdVentana='+IdVentana, Almacen: ProspectosTbodyColumas });

  setTimeout(function() {
    SalesUp.Variables.jsonProspectos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonProspectos.dbsp', Parametros:'start='+Op.Start+'&howmany='+Op.howMany+'&IdVentana='+IdVentana+'&tkcom='+Op.tkcom, DataType:'json' });

    SalesUp.Construye.ReemplazaTemplate({
      Template: SalesUp.Variables.TemplateRow,
      Destino: '#ProspectosEmpresa-'+Op.t+' tbody',
      Datos: SalesUp.Variables.jsonProspectos.JsonDatos
    });
    
    var n = 1;
    $('#ProspectosEmpresa-'+Op.t+' tbody tr').each(function(){
      $(this).find('td:first').html('<b>'+n+'</b>');
      n = n + 1;
    });
    
    var Desde = Op.howMany + Op.Start;
    
    if ( _.size($('#ProspectosEmpresa-'+Op.t+' tbody tr')) < SalesUp.Variables.jsonProspectos.Registros.TotalResgistros){
      var id = "'"+Op.tkcom+"'";
      $('#BoxTabla'+Op.t).append('<div onclick="SalesUp.Variables.VerMasResultados({ Elemento:this, tkcom: '+id+', t:'+Op.t+' , Start:'+Desde+', howMany:50 });" class="w100 tCen Pointer"><span Id="VerMas" class="Btn Btn-flat-Aceptar Btn-tiny"><i class="fa fa-angle-down fa-lg"></i> <b>Ver más</b></span></div>');
    }
    
    $('.NombreEmpresa').hide();
    $Elemento.remove();
    ProspectosAdicionales();
    SalesUp.Sistema.IniciaPlugins();
    SalesUp.Sistema.OcultaEspera();
  }, 100);
} /* /SalesUp.Variables.VerMasProspectos */



/* --- --- --- --- --- ---*/

var Listado_Ids = '';
var contador=0;

function ProspectosAdicionales(){
  var reclamarProspecto='reclamarProspecto';

  var alerta = "alertlike";

  var methods = {
    alertlike : function() {
      $.fallr('show', {
        autoclose : 5000, icon : 'warning', closeKey : true, position: 'center',
        width : '400px', height: '150px',
        content : '<p><b>Debe Selecccionar al menos un prospecto.</b></p>'

      });
    },
    reclamarProspecto : function() {
      $.fallr('show', {
        buttons : {
          button1 : { text: 'Si', danger:true, onclick: Reclamo },
          button2 : { text: 'No' }
        },
        content : '<p>¿Estás seguro de reclamar el prospecto?</p>',
        position: 'center', closeKey : true, icon : 'warning'
      });
    }
  };


    $(".VerLtOpcionesMultiples").click( function() {
      Listado_Ids = SalesUp.Sistema.RecorreCheckSeleccionados();
      var listaArray = Listado_Ids.split(',');
      contador = _.size(listaArray) - 1;
    });

    $('.laseleccion').click(function(){
      Listado_Ids = SalesUp.Sistema.RecorreCheckSeleccionados();
      var listaArray = Listado_Ids.split(',');
      contador = _.size(listaArray) - 1;
    });

    /* Realiza la accion de archivar cuando se elije la opcion de archivar todos */
    $('#archivar_list').click( function() {
      if(contador==0) {
        methods[alerta].apply(this,[this]);
        $('#opcionesMult').hide('slow');
      } else {
        //Listado_Ids = Listado_Ids.substring(1);//alert(Listado_Ids);
        SalesUp.Sistema.PostData({Link:'/privado/ajax/jx-ArchivarProspecto.dbsp', Parametros:'listap='+Listado_Ids });
        ReloadData();
      }
    });

    /* Realiza la accion de reactivar cuando se elije la opcion de reactivar todos */
    $('#reactivar_list').click( function() {
      if(contador==0) {
        methods[alerta].apply(this,[this]);
        $('#opcionesMult').hide('slow');
      } else {
        //Listado_Ids = Listado_Ids.substring(1);
        SalesUp.Sistema.PostData({Link:'/privado/ajax/jx-ReactivarProspecto.dbsp', Parametros:'listap='+Listado_Ids });
        ReloadData();
      }
    });

    /* Realiza la accion de descartar cuando se elije la opcion de descartar todos */
    $('#descartar_list').click( function() {
      if(contador==0){
        methods[alerta].apply(this,[this]);
        $('#opcionesMult').hide('slow');
      } else {
        //Listado_Ids = Listado_Ids.substring(1);
        tb_show('Descartar varios prospectos', '/privado/popup_descartar_prospecto_varios.dbsp?propio=1&listap='+Listado_Ids+'&TB_callback=ReloadData&TB_iframe=true&height=180&width=400', '');
      }
    });

    /* Realiza la accion de descartar cuando se elije la opcion de descartar todos */
    $('#etiquetar_list').click( function(){

      if(contador==0) {
        methods[alerta].apply(this,[this]);
        $('#opcionesMult').hide('slow');
      } else {
        var alto_ventana = 200;
        //Listado_Ids = Listado_Ids.substring(1);
        tb_show('Etiquetar varios prospectos', '/privado/popup_etiqueta_prospectos_varios.dbsp?propio=1&listap='+Listado_Ids+'&totp='+contador+'&TB_callback=ReloadData&TB_iframe=true&height=250&width=450', '');
      }
    });

    /* Realiza la accion de reasignar cuando se elije la opcion de reasignar todos */
    $('#reasignar_list').click( function() {
      if(contador==0) {
        methods[alerta].apply(this,[this]);
        $('#opcionesMult').hide('slow');
      } else {
        //Listado_Ids = Listado_Ids.substring(1);
        tb_show('Reasignar varios prospectos', '/privado/popup_asignar_prospecto_varios.dbsp?propio=1&listap='+Listado_Ids+'&totp='+contador+'&TB_callback=ReloadData&TB_iframe=true&height=330&width=450', '');
      }
    });
    
    /* Realiza la accion de restablecer del elemento seleccionado*/
    $('.reestablecerrrr').click( function(){
      var id=$(this).attr('rel');
      SalesUp.Sistema.PostData({Link:'/privado/ajax/jx-ReestablerProspecto.dbsp', Parametros:'idprospecto='+id });
      ReloadData();
    });

    $(".reclamoooo").click( function() {
      idprospecto=$(this).attr('rel');
      methods[reclamarProspecto].apply(this,[this]);
    });

    /* Realiza la accion de cambiar el origen */
    $('#origen_list').click( function() {
      if(contador==0) {
        methods[alerta].apply(this,[this]);
        $('#opcionesMult').hide('slow');
      } else {

        SalesUp.Construye.MuestraPopUp({
          alto:'175px', ancho:'350px',
          titulo:'Cambiar origen',
          fuente:'/privado/popup-cambiar-origen.dbsp', callback:''
        });

        //=undefined
      }
    });

  SalesUp.Sistema.CatalogosActivos();

}/* ProspectosAdicionales */


/* Realiza la accion de compartir cuando se elije la opcion de compartir todos */
function CompartirMultiples() {
  if(contador==0) {
    methods[alerta].apply(this,[this]);
    $('#opcionesMult').hide('slow');
  } else {
    //Listado_Ids = Listado_Ids.substring(1);
    tb_show('Compartir', '/privado/popup_compartir_prospecto_varios.dbsp?propio=1&listap='+Listado_Ids+'&totp='+contador+'&TB_callback=ReloadData&TB_iframe=true&height=270&width=650', '');
  }
};


function Reclamo() {
  $.fallr('hide');
  document.location='/privado/reclamar-prospecto-2.dbsp?idprospecto='+idprospecto;
};



SalesUp.Variables.archivarProspecto = function(Op){
  var tkp = Op.tkp, bandera = Op.b;
  var mensaje = '<i class="fa fa-lg fa-folder"></i> Prospecto archivado.';
  if (bandera==2){mensaje = '<i class="fa fa-lg fa-folder-open"></i> Prospecto reactivado.';}
  SalesUp.Sistema.PostData({Link:'/privado/archivar_compartido.dbsp', Parametros:'tkp='+tkp+'&bandera='+bandera });
  ReloadData();
  setTimeout(function(){SalesUp.Construye.MuestraNotificacion({Mensaje:mensaje});}, 500);
}

SalesUp.Variables.reestablecerProspecto = function(Op){
  var tkp = Op.tkp;
  SalesUp.Sistema.PostData({Link:'/privado/ajax/jx-ReestablerProspecto.dbsp', Parametros:'tkp='+tkp });
  ReloadData();
  setTimeout(function(){SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-check-circle-o"></i> Prospecto reestablecido.'});}, 500);
}

SalesUp.Variables.reclamarProspecto = function(Op){
  var tkp = Op.tkp;

  var Programar = '';
  Programar += '<form class="w100" id="frmReclamarProspecto">';
  Programar += '  <br><p class="w100">¿Estás seguro de reclamar el prospecto?</p>';
  
  Programar += '  <div class="clear"></div></form><div class="clear"></div>';
  
  SalesUp.Construye.MuestraAlerta({
    TipoAlerta:'AlertaPregunta', Ancho:'40%', 
    Id:'alertaReclamarProspecto',
    Alerta: Programar
  });

  var $PieModal = $('#alertaReclamarProspecto .PieModal');
  var  botones = '<span class="btnNegativo Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Cancelar" onclick="SalesUp.Construye.CierraAlerta({Elemento:this});"><i class="fa fa-times"></i> No</span>';
      botones += '<span class="btnAccion Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" onclick="SalesUp.Variables.activaReclamarProspecto({t:this, tkp:\''+tkp+'\'});"><i class="fa fa-hand-o-up"></i> Si, reclamar</span>';
  
  $PieModal.html(botones);

}/*SalesUp.Variables.reclamarProspecto*/

SalesUp.Variables.activaReclamarProspecto = function(Op){
  
  SalesUp.Sistema.CargaDatos({Link:'/privado/reclamar-prospecto-2.dbsp', Parametros:'tkp='+Op.tkp});
  SalesUp.Construye.CierraAlerta({Elemento:Op.t});
  ReloadData();
  setTimeout(function(){SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-hand-o-up"></i> Prospecto reclamado.'});}, 500);
}


SalesUp.Variables.ResetearOpMultiples = function(){
  localStorage.removeItem('ProspectosTheadColumas');
}