var Destino = '#DatosLoad', IdTabla="TablaClientes", IdVentana = 4;
var Datos, TemplateDatos, NombreCampos;
var ClientesTheadColumas = 'ClientesTheadColumas', ClientesTbodyColumas = 'ClientesTbodyColumas';

SalesUp.Variables.TemplateVermas = '<div {{Eventos}} class="w100 tCen Pointer"><span Id="{{IdVermas}}" class="Btn Btn-flat-Aceptar Btn-tiny"><i class="fa fa-angle-down fa-lg"></i> <b>Ver más</b></span></div>';

SalesUp.Variables.Switch = SalesUp.Sistema.Almacenamiento({a:'SysSwitchClientesEmpresas'});

/*agregado*/
setTimeout(function(){SalesUp.Sistema.CatalogosActivos({EstoyEn:'Clientes'});}, 200);

if(_.isUndefined(SalesUp.Variables.Switch)){
    SalesUp.Variables.VerOriginal = true;
    SalesUp.Variables.VerPorEmpresas = false;
    SalesUp.Variables.Switch = 0;
    SalesUp.Sistema.Almacenamiento({a:'SysSwitchClientesEmpresas', v:'0'});
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
        $('#CheckClientesEmpresas').prop('checked',false);
    }else if(SalesUp.Variables.Switch==1){
        SalesUp.Variables.VerPorEmpresas = true;
        $('#CheckClientesEmpresas').prop('checked',true);
        $('#SwitchClientesEmpresas').attr('tip','Vista de contactos');
    }else{
        SalesUp.Variables.AgrupacionCatalogo = true;
        SalesUp.Variables.Tkca = SalesUp.Sistema.Almacenamiento({a:'SysSwitchClientesEmpresas'});
    }

}

SalesUp.Variables.SwitchActivo = function(Op){
    var Tip = '';
    var $Elemento = $(Op.Elemento);
    
    SalesUp.Variables.VerPorEmpresas = $Elemento.is(':checked');

    if(SalesUp.Variables.VerPorEmpresas){
        Tip = 'Vista de contactos';
        SalesUp.Sistema.Almacenamiento({a:'SysSwitchClientesEmpresas', v:'1'});
    }else{
        Tip = 'Vista de empresas';
        SalesUp.Sistema.Almacenamiento({a:'SysSwitchClientesEmpresas', v:'0'});
    }
    
    $('#SwitchClientesEmpresas').attr('tip',Tip);
    ReloadData();
}

function iraPag(Ir){
    PagAct = Ir;
    var Cond = '';
    SalesUp.Sistema.paginaActual({pagAct:PagAct});
    ActivaPaginacion(Cond,Ir);
}

var  Clientes = function(){
    $('.SaldoVencido').each(function(){
        if(SalesUp.Sistema.MonedaANumero( $(this).html() )>0){
            $(this).html( '<span class="Rojo Bold Tip1" Tip="Saldo vencido">'+$(this).html()+'</span>' );
        }
    });

    $('#DatosLoad').append('<div id="BtnExportarImportar" class="BoxBotones"></div>');
    var AbreExportar = "SalesUp.Ventana.AbrePopUp({Titulo:'Exportar Clientes', Pagina:'popup_tipo_exportacion.dbsp', Parametros:'&ExportacionPantalla="+escape('Clientes en pantalla')+"&ExportacionTotal="+escape('Todas los clientes')+"&pantalla="+IdVentana+"', CallBack:'ReloadData', Iframe:true, Alto:130, Ancho:280 })";
    SalesUp.Construye.AgregaBoton({DentroDe:'#BtnExportarImportar', btnTamanio:'Btn-tiny Btn-tiny-min', Boton:'Exportar clientes', Titulo:'Exportar información', Onclick:AbreExportar, Icono:'fa-clipboard', Clases:'ExportarInformacion' });
    SalesUp.Construye.AgregaBoton({DentroDe:'#BtnExportarImportar', btnTamanio:'Btn-tiny Btn-tiny-min', Boton:'Importar clientes', Titulo:'Importa tu información', Onclick:'document.location=\'/privado/importacion.dbsp?tit=1\'', Icono:'fa-sign-in' });
    
    SalesUp.Sistema.OcultaEspera();
    ClientesAdicional();
    
}/*Clientes*/



var ReloadData = function(){
    nRegistros=0, Datos=undefined;
    
    SalesUp.Sistema.MuestraEspera(Destino,1);
    SalesUp.Sistema.MuestraEspera('#LosFiltros',2);
    setTimeout(function(){
        if(SalesUp.Variables.VerPorEmpresas){
            SalesUp.Variables.VistaPorEmpresa({start:1});
        }
        /*modificado*/
        if(SalesUp.Variables.VerOriginal){
            SalesUp.Sistema.CargaDatos({Link:'LosFiltrosClientes.dbsp', Parametros:'&IdVentana='+IdVentana, Div:1, Destino:'#LosFiltros' });
            SalesUp.Sistema.CargaDatos({Link:'/privado/vacio.dbsp', DataType:'json'});
            NombreCampos = SalesUp.Sistema.CargaDatos({Link:'TemplateClientes.dbsp', Parametros:'&thead=1&IdVentana='+IdVentana, Div:0});
            TemplateDatos = SalesUp.Sistema.CargaDatos({Link:'TemplateClientes.dbsp', Parametros:'thead=0&IdVentana='+IdVentana, Div:0, Almacen: ClientesTbodyColumas });
            
            
            DatosJson = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonClientes.dbsp', Parametros:'start='+Start+'&howmany='+RegXPag+'&IdVentana='+IdVentana, DataType:'json', Div:0 });
            SalesUp.Sistema.CargaDatos({Link:'/privado/vacio.dbsp', DataType:'json'});
            
            if(DatosJson!==undefined){
                Datos = DatosJson.JsonDatos;
                nRegistros = DatosJson.Registros.TotalResgistros;       
            }
            
            SalesUp.Construye.ConstruyeTabla(NombreCampos, TemplateDatos, Datos, { Destino:Destino, Id:IdTabla, Callback:Clientes, PagActual:PagAct, NumRegistros:nRegistros } );        
        }/* if(SalesUp.Variables.VerOriginal) */

        /*agregado*/
        if(SalesUp.Variables.AgrupacionCatalogo){
            SalesUp.Sistema.VistaPorAgrupacion({
                IdVentana: IdVentana, 
                LosFiltros:'LosFiltrosClientes.dbsp',
                modeloJson: 'jsonClientesCatalogos.dbsp'
            });
        }
        
        ClientesAdicional();
        
    },100); /* setTimeout */
     setTimeout(function(){
    SalesUp.Variables.openTr()
  }, 2000)
}

SalesUp.Variables.FuncionesAdicionales = function(){
    ClientesAdicional();
}

SalesUp.Variables.VistaPorEmpresa = function(Op){ 
    Start = (typeof Start != "undefined") ? Start : 1;
     SalesUp.Sistema.CargaDatosAsync({link:'modelo/jsonClientesEmpresasTable.dbsp',
        DataType:'json',
        parametros:'start='+Start+'&howmany='+RegXPag+'&IdVentana=4',
        callback: VistaPorEmpresaPlus
    });
            
 
    function VistaPorEmpresaPlus (Op){
    
        SalesUp.Sistema.CargaDatos({Link:'LosFiltrosClientes.dbsp', Parametros:'IdVentana=4', Destino:'#LosFiltros' });
        var x = SalesUp.Variables.jsonDatosOpE;
            var template = '';
            jsonOb = Op.jsonDatos;
            totalRegistros =Op.Registros.RESULTADOS;
            templateHead = '<tr><td><a id="ConfigurarPantalla" tip="Ordenar columnas de Clientes" class="thickbox Tip2" href="PopupOrdenarColumnas.dbsp?IdVentana=4&amp;TB_callback=ReloadData&amp;TB_iframe=true&amp;height=280&amp;width=400&amp;modal=true&amp;modalAlt=true&amp;CloseReload=true" original-title=""><img src="../estilos/icon-gear.png"></a></td><td>Empresa</td><td>Corporativo</td><td>Industria</td><td>Página web</td><td>Teléfono</td><td>#</td><td>Monto</td><td>Anticipos</td><td>Saldos</td><td>Vencido</td><td>Ticket Promedio</td><td>Último contacto</td><td>Eje</td><td class="tCen" style="width:95px;"></td></tr>';
            template += '<tr>';
            template += '<td><b>{{nFila}}</b></td>';
            template += '<td ><a href="/privado/EmpresasVisualizar.dbsp?tkCom={{TkCom}}"><i class="fa fa-building-o"></i> {{Empresa}}</a></td> ';
            template += '<td >{{Industria}}</td>';
            template += '<td >{{CompaniaGrupo}}</td> ';
            template += '<td>{{Url}}</td>';
            template += '<td>{{Telefono}}</td>';
            template += '<td class="tCen">{{nRegistros}}</td>';
        template += '<td class="tCen ">{{hlp_Simbolo_Moneda MontoComprado}}</td>';
        template += '<td class="tCen ">{{hlp_Simbolo_Moneda Anticipos}}</td>';
        template += '<td class="tCen ">{{hlp_Simbolo_Moneda Saldo}}</td>';
        template += '<td class="tCen SaldoVencido ">{{hlp_Simbolo_Moneda SaldoVencido}}</td>';
        template += '<td class="tCen">{{hlpSimpleDivicion MontoComprado nRegistros 1}}</td>';
        
            template += '<td >{{#if ORD}}<i><a href="/privado/prospectos-visualizar.dbsp?tkp={{TKP}}">{{Contacto}}</a> - <span class="Tip8" tip="{{NOMBRE_USUARIO_CONTACTO}}">[{{{INICIALES_CONTACTO}}}]</span> - {{{TIEMPO_CONTACTO}}} - {{{COMENTARIO}}}</i>{{/if}}</td> ';
            template += '<td class="Tip8 tCen" Tip="{{NOMBRE}} {{APELLIDOS}}">{{INICIALES}}</td>';
             template += '<td><div style="width:95px"><span id="op_{{TkCom}}" {{#if NRT}}onclick="SalesUp.Variables.addtr({e:this,tk:\'{{TkCom}}\',nrt:\'{{NRT}}\'})"{{/if}} class=" Pointer Btn Btn-rounded Btn-flat-Aceptar Btn-tiny Btn-tiny-min" style="position:relative; border-radius: 3px 0px 0px 3px; padding: 0px 7px;width:35px !important;">{{#if NRT}}{{NRT}}&nbsp;<i class="fa fa-chevron-down"></i>{{else}}0&nbsp;<i class="fa"></i>{{/if}}</span>';
            
            template += ' '+SalesUp.Variables.OpcAc+' </div></td>';
            
            template += '</tr>';
            SalesUp.Construye.ConstruyeTabla(templateHead, template, jsonOb, {Destino:'#DatosLoad', Id:'TablaEmpresas', PagActual:PagAct, NumRegistros:totalRegistros } );
        
        //SalesUp.Variables.PonerSimbolosMontoOportunidades();    
    }
}  /* SalesUp.Variables.VistaPorEmpresa */ 

//*****************************************************//
//*****************************************************//
//*****************************************************//
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
      console.warn('error', err);
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

SalesUp.Variables.procesaCompartir = function(tkcom){
  var guardaTkp = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonClientesReturn.dbsp',
    DataType:'json',
    Parametros:'IdVentana=4&TKCOM='+tkcom
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
  var guardaTkp = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonClientesReturn.dbsp',
    DataType:'json',
    Parametros:'IdVentana=4&TKCOM='+tkcom
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
  });
}

SalesUp.Variables.editar = function(tkcom){
  SalesUp.Variables.TkCom = tkcom;
  SalesUp.Variables.Diff = 2
  SalesUp.empresas.nuevaEmpresa(1);
}
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
    var arr = SalesUp.Variables.GuardaOp;
  var verifica =  _.size( _.where(arr,Op) )
  if(verifica==0){
    SalesUp.Variables.GuardaOp.push(Op);
  }

    var tkR = Op.tk;var temp1;
    Op.nrt ? SalesUp.Sistema.Almacenamiento({a:'NRT_'+tkR,v:Op.nrt}) : SalesUp.Sistema.Almacenamiento({a:'NRT_'+tkR})

  if(Op.e){elemento = Op.e;
    SalesUp.Sistema.Almacenamiento({a:'element_'+tkR,v:Op.e})
    $(elemento).attr('onclick','SalesUp.Variables.rmtr({e:this,tk:'+JSON.stringify(tkR)+'})')
    temp1 = $(elemento).closest("tr");
    temp1.find('.fa-chevron-down').removeClass('fa-chevron-down').addClass('fa-spinner fa-spin');
  
  
    $(temp1).after('<tr class=" nohov" style=""><td colspan="15"  style="padding: 0;border-top: none;" ><div class="tablaInterna" id="PutData_'+tkR+'"></div></td></tr>');
    }

    $('#PutData_'+tkR+'').html(SalesUp.Sistema.unMomento())
  SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonClientes.dbsp',
      DataType:'json',
      parametros:'IdVentana='+IdVentana+'&tkcom='+tkR,
      callback: MustreProspectos
  });
  function MustreProspectos (DatosJson) {
    var Datos = DatosJson.JsonDatos;
    NombreCampos = SalesUp.Sistema.CargaDatos({Link:'TemplateClientes.dbsp', Parametros:'&thead=1&IdVentana='+IdVentana, Div:0});
    TemplateDatos = SalesUp.Sistema.CargaDatos({Link:'TemplateClientes.dbsp', Parametros:'thead=0&IdVentana='+IdVentana, Div:0, Almacen: ClientesTbodyColumas });
    SalesUp.Construye.ConstruyeTabla(NombreCampos, TemplateDatos, Datos, {Destino:'#PutData_'+tkR,elInicio:1, Id:'tablas'+tkR, PagActual:1} );
    var  TotalResgistros = DatosJson.Registros.TotalResgistros
    var faltantes = SalesUp.Sistema.Almacenamiento({a:'NRT_'+tkR})-TotalResgistros;
    if (faltantes > 0) {
      var piloto = '<div class="SinResultados BoxSizing w100"> <p style="font-size:12px;"> <i class="fa fa-1x fa-info-circle"></i> Existen otros ('+faltantes+') clientes asociados a esta empresa que no están compartidos</p> </div>';
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
    ClientesAdicional();
  }
  
}
SalesUp.Variables.rmtr  = function(Op){
    var arr = SalesUp.Variables.GuardaOp;
  for (var i = 0; i < arr.length; i++) {
    if(arr[i].tk==Op.tk){
       SalesUp.Variables.GuardaOp.splice(i,1);
    }
  }
  elemento = Op.e;
  $(elemento).attr('onclick','SalesUp.Variables.addtr({e:this,tk:'+JSON.stringify(Op.tk)+'})')
  temp1 = $(elemento).closest("tr");
  temp1.find('.fa-chevron-up').removeClass('fa-chevron-up').addClass('fa-chevron-down');
  $(temp1).next().remove();
}

SalesUp.Variables.OpcAc+' </td>';
//SalesUp.Variables.OpcAc = '<span class="btnNeutral Pointer Btn Btn-rounded Btn-flat-Aceptar Btn-tiny Btn-tiny-min" style="position: relative; left: -5px; border-radius: 0px 3px 3px 0px;" onmouseenter="SalesUp.Construye.accionesRow({t:this});"> <i class="fa fa-lg fa-ellipsis-v"></i> </span> <div class="accionesOcultas" style="display:none;"> <span class="OpcionAcciones Pointer" onclick="SalesUp.Sistema.AbrePopUp({Titulo:\'Editar prospecto\', Pagina:\'/privado/PopUpNuevoProspecto.dbsp\', Parametros:\'tkcom={{TkCom}}&avanzado=1&escliente=1\', CallBack:\'{{ReloadData}}\', Alto:150, Ancho:500});"> <i class="fa fa-lg fa-user-plus"></i> Agregar cliente </span>  <span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.reasignarEmpresa(\'{{TkCom}}\')" > <i class="fa fa-lg fa-arrow-right"></i> Reasignar</span>    {{#if NRT}}<span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.procesaCompartir(\'{{TkCom}}\')"> <i class="fa fa-lg fa-users"></i> Compartir </span> {{/if}}    {{#if NRT}} <span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.procesaEtiquetar(\'{{TkCom}}\',\'{{ReloadData}}\')"> <i class="fa fa-lg fa-tag"></i> EtiquetarOld </span><span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.accionesComunes.etiquetarVarios({titulo: \'Etiquetar varios clientes\', template: \'Clientes\', origen: \'empresas\', TkCom: \'{{TkCom}}\',TkPe: 1, callback: \'{{ReloadData}}\'})"> <i class="fa fa-lg fa-tag"></i> Etiquetar </span>{{/if}}  <span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.editar(\'{{TkCom}}\')"> <i class="fa fa-lg fa-edit"></i>  Editar</span> </div>'
SalesUp.Variables.OpcAc = '<span class="btnNeutral Pointer Btn Btn-rounded Btn-flat-Aceptar Btn-tiny Btn-tiny-min" style="position: relative; left: -5px; border-radius: 0px 3px 3px 0px;" onmouseenter="SalesUp.Construye.accionesRow({t:this});"> <i class="fa fa-lg fa-ellipsis-v"></i> </span> <div class="accionesOcultas" style="display:none;"> <span class="OpcionAcciones Pointer" onclick="SalesUp.Sistema.AbrePopUp({Titulo:\'Editar prospecto\', Pagina:\'/privado/PopUpNuevoProspecto.dbsp\', Parametros:\'tkcom={{TkCom}}&avanzado=1&escliente=1\', CallBack:\'{{ReloadData}}\', Alto:150, Ancho:500});"> <i class="fa fa-lg fa-user-plus"></i> Agregar cliente </span>  <span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.reasignarEmpresa(\'{{TkCom}}\')" > <i class="fa fa-lg fa-arrow-right"></i> Reasignar</span>    {{#if NRT}}<span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.procesaCompartir(\'{{TkCom}}\')"> <i class="fa fa-lg fa-users"></i> Compartir </span> {{/if}}    {{#if NRT}} <span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.etiquetarMultiple.mostrarPopup({titulo: \'Etiquetar varios clientes\', template: \'Clientes\', origen: \'empresas\', tkcom: \'{{TkCom}}\',tkpe: 1, callback: \'{{ReloadData}}\'})"> <i class="fa fa-lg fa-tag"></i> Etiquetar </span>{{/if}}  <span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.editar(\'{{TkCom}}\')"> <i class="fa fa-lg fa-edit"></i>  Editar</span> </div>'

//antiguo template
//SalesUp.Variables.OpcAc = '<span class="btnNeutral Pointer Btn Btn-rounded Btn-flat-Aceptar Btn-tiny Btn-tiny-min" style="position: relative; left: -4px; border-radius: 0px 3px 3px 0px;" onmouseenter="SalesUp.Construye.accionesRow({t:this});"> <i class="fa fa-lg fa-ellipsis-v"></i> </span> <div class="accionesOcultas" style="display:none;"> <span class="OpcionAcciones Pointer" onclick="SalesUp.Sistema.AbrePopUp({Titulo:\'Crear una nueva oportunidad de negocio\', Pagina:\'/privado/popup_convierte_a_oportunidad.dbsp\', Parametros:\'tkp={{TKP}}&idprospecto={{IdProspecto}}\', CallBack:\'{{ReloadData}}\', Alto:450, Ancho:550});"> <i class="fa fa-lg fa-user-plus"></i> Agregar Prospecto </span>  <span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.reasignarEmpresa(\'{{TkCom}}\')" > <i class="fa fa-lg fa-arrow-right"></i> Reasignar</span>    {{#if NRT}}<span class="OpcionAcciones Pointer" onclick="SalesUp.Sistema.AbrePopUp({Titulo: \'Compartir prospecto con:\', Pagina:\'/privado/popup_compartir_prospecto_varios.dbsp\', Parametros:\'tkR={{TkCom}} \', CallBack:\'{{ReloadData}}\', Alto:150, Ancho:586});"> <i class="fa fa-lg fa-users"></i> Compartir </span> {{/if}}    {{#if NRT}} <span class="OpcionAcciones Pointer" onclick="SalesUp.Sistema.AbrePopUp({Titulo:\'Etiquetar prospecto como parte de un segmento\', Pagina:\'/privado/popup_etiqueta_prospectos.dbsp\', Parametros:\'tkp={{Tkp}}\', CallBack:\'{{ReloadData}}\', Alto:300, Ancho:470});"> <i class="fa fa-lg fa-tag"></i> Etiquetar </span>{{/if}}  <span class="OpcionAcciones Pointer" > <i class="fa fa-lg fa-edit"></i>  <a href="/privado/EmpresasVisualizar.dbsp?tkCom={{TkCom}}" style="color:black;">Editar</a></span> </div>'


//*****************************************************//
//*****************************************************//
//*****************************************************//

SalesUp.Variables.VerMasEmpresas = function(Op){
    var $Elemento = $(Op.Elemento);
    
    SalesUp.Sistema.MuestraEspera($Elemento,1);
    setTimeout(function() { SalesUp.Variables.VistaPorEmpresa({start:Op.Start}); $Elemento.remove(); SalesUp.Sistema.OcultaEspera(); }, 300);

} /* /SalesUp.Variables.VerMasEmpresas */


$(function(){
    var estaEnPagina = SalesUp.Sistema.paginaActual();
    (!estaEnPagina) ? estaEnPagina = 1:'';
    PagAct= estaEnPagina;
    ActivaPaginacion('',estaEnPagina);
});

SalesUp.Variables.EjecutaMostrarTabla = function(Op){
    SalesUp.Variables.MostrarTabla({Elemento:$('#Mostrar'+Op.Id), t:Op.Id , tkcom:Op.tkcom, nRegistros:Op.nRegistros });
}

SalesUp.Variables.ReloadDataEmpresaClie = function(Op){
    $('#BoxTabla'+SalesUp.Variables.IdEmpresaClie).html('');
    $('#Mostrar'+SalesUp.Variables.IdEmpresaClie).removeAttr('abierto');
    SalesUp.Variables.MostrarTabla({Elemento:$('#Mostrar'+SalesUp.Variables.IdEmpresaClie), t:SalesUp.Variables.IdEmpresaClie , tkcom:SalesUp.Variables.tkComSeleccionadaClie, nRegistros:SalesUp.Variables.nRegistrosClie });
    
}


SalesUp.Variables.MostrarTabla = function(Op){
    var $Elemento = $(Op.Elemento);
    var Abierto = parseInt($Elemento.attr('abierto'));
    
    SalesUp.Variables.IdEmpresaClie = Op.t;
    SalesUp.Variables.tkComSeleccionadaClie = Op.tkcom;
    SalesUp.Variables.nRegistrosClie = Op.nRegistros; 
    
    if(Abierto>0){
        $('#BoxTabla'+Op.t).slideUp('slow');
        $Elemento.attr('abierto',0).addClass('fa-angle-down').removeClass('fa-angle-up');
    }else{
        $('#BoxTabla'+Op.t).slideDown('slow');  
        $Elemento.attr('abierto',1).removeClass('fa-angle-down').addClass('fa-spinner fa-spin');
        SalesUp.Variables.ExisteTabla = _.size($('#BoxTabla'+Op.t).find('table'));
        
        setTimeout(function(){
            if(SalesUp.Variables.ExisteTabla==0){
                SalesUp.Variables.Template1 = SalesUp.Sistema.CargaDatos({Link:'TemplateClientes.dbsp', Parametros:'thead=1&IdVentana='+IdVentana});
                SalesUp.Variables.Template2 = SalesUp.Sistema.CargaDatos({Link:'TemplateClientes.dbsp', Parametros:'thead=0&IdVentana='+IdVentana, Almacen: ClientesTbodyColumas });
                SalesUp.Variables.jsonClientes = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonClientes.dbsp', Parametros:'start=1&howmany=50&IdVentana='+IdVentana+'&tkcom='+Op.tkcom, DataType:'json' });
                $('#ComentarioI'+Op.t).html(SalesUp.Variables.jsonClientes.UltimoComentario.ULTIMOCOMENTARIO);  
                SalesUp.Construye.ConstruyeTabla(SalesUp.Variables.Template1, SalesUp.Variables.Template2, SalesUp.Variables.jsonClientes.JsonDatos, 
                    {
                        Destino: '#BoxTabla'+Op.t, 
                        Id: 'ClientesEmpresa-'+Op.t
                    }
                );

                if(Op.nRegistros>50){
                    var id = "'"+Op.tkcom+"'";
                    $('#BoxTabla'+Op.t).append('<div onclick="SalesUp.Variables.VerMasResultados({ Elemento:this, tkcom: '+id+', t:'+Op.t+', Start:51, howMany:50 });" class="w100 tCen Pointer"><span Id="VerMas" class="Btn Btn-flat-Aceptar Btn-tiny"><i class="fa fa-angle-down fa-lg"></i> <b>Ver más</b></span></div>');   
                }
            }
            $Elemento.removeClass('fa-spinner fa-spin').addClass('fa-angle-up');
            $('.NombreEmpresa').hide();
            $('.PuestoContacto').show();
            ClientesAdicional();
        }, 200);
        
    }
    
} /* /SalesUp.Variables.MostrarTabla */

SalesUp.Variables.VerMasResultados = function(Op){
    var $Elemento = $(Op.Elemento);
    SalesUp.Sistema.MuestraEspera($Elemento,1);

    SalesUp.Variables.TemplateRow = SalesUp.Sistema.CargaDatos({Link:'TemplateClientes.dbsp', Parametros:'thead=0&IdVentana='+IdVentana, Almacen: ClientesTbodyColumas });

    setTimeout(function() {
        SalesUp.Variables.jsonClientes = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonClientes.dbsp', Parametros:'start='+Op.Start+'&howmany='+Op.howMany+'&IdVentana='+IdVentana+'&tkcom='+Op.tkcom, DataType:'json' });

        SalesUp.Construye.ReemplazaTemplate({
            Template: SalesUp.Variables.TemplateRow,
            Destino: '#ClientesEmpresa-'+Op.t+' tbody',
            Datos: SalesUp.Variables.jsonClientes.JsonDatos
        });
        
        
        var n = 1;
        $('#ClientesEmpresa-'+Op.t+' tbody tr').each(function(){
            $(this).find('td:first').html('<b>'+n+'</b>');
            n = n + 1;
        });
        
        var Desde = Op.howMany + Op.Start;
        
        if ( _.size($('#ClientesEmpresa-'+Op.t+' tbody tr')) < SalesUp.Variables.jsonClientes.Registros.TotalResgistros){
            var id = "'"+Op.tkcom+"'";
            $('#BoxTabla'+Op.t).append('<div onclick="SalesUp.Variables.VerMasResultados({ Elemento:this, tkcom: '+id+', t:'+Op.t+' , Start:'+Desde+', howMany:50 });" class="w100 tCen Pointer"><span Id="VerMas" class="Btn Btn-flat-Aceptar Btn-tiny"><i class="fa fa-angle-down fa-lg"></i> <b>Ver más</b></span></div>');
        }



        $Elemento.remove();
        ClientesAdicional();
        SalesUp.Sistema.IniciaPlugins();
        SalesUp.Sistema.OcultaEspera();

    }, 100);
} /* /SalesUp.Variables.VerMasClientes */

/*-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+*/

DireccionaVentas = function (){ document.location = 'ventas.dbsp';  }
var Listado_Ids = '';
var contador=0;

var alerta = "alertlike";

var methods = {
    alertlike : function() {
        $.fallr('show', {
            content : '<p><b>Debe Selecccionar al menos un cliente.</b></p>',
            width:'400px', height:'150px',
            autoclose: 4000, icon: 'warning',
            closeKey: true, position: 'center'
        });
    }
};

function ClientesAdicional(){
    Listado_Ids = '', contador=0, TotalIdVenta='', IdVenta='';

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
    
    /* 
        
    $("#mostrarOpsMult").click( function() {
        Listado_Ids = '';
        contador=0;
        IdVenta="";
        TotalIdVenta='';
        $(".laseleccion").each( function() {
            if ($(this).is(':checked')) {
                var lo_selec =$(this).attr('value');
                IdVenta = $(this).attr("id");
                IdVenta = IdVenta.substring(8);
                Listado_Ids = Listado_Ids + ',' + lo_selec;
                TotalIdVenta = TotalIdVenta + ',' + IdVenta;
                contador = contador + 1;
            }
        });
    });

    */
    SalesUp.Sistema.CatalogosActivos();

} /* ClientesAdicional */

function EtiquetarLista(){
    if(contador==0) {
        methods[alerta].apply(this,[this]);
        $('#opcionesMult').hide('slow');
    } else{
        SalesUp.Sistema.AbrePopUp({
            Titulo: 'Etiquetar',
            Pagina: 'popup_etiqueta_prospectos_varios.dbsp', Parametros:'propio=1&listap='+Listado_Ids+'&totp='+contador,
            CallBack:'ReloadData',
            Modal:true, ModalAlt : true, Alto:240, Ancho:450
        });
    }
}

function CompartirMultiples(){
    if(contador==0) {
        methods[alerta].apply(this,[this]);
        $('#opcionesMult').hide('slow');
    } else {
        Listado_Ids = SalesUp.Sistema.RecorreCheckSeleccionados();
        tb_show('Compartir', '/privado/popup_compartir_prospecto_varios.dbsp?propio=1&listap='+Listado_Ids+'&totp='+contador+'&TB_callback=ReloadData&TB_iframe=true&height=270&width=650', '');
    }
}


function ReasignarLista(){
    if(contador==0) {
        methods[alerta].apply(this,[this]);
        $('#opcionesMult').hide('slow');
    } else {
        SalesUp.Sistema.AbrePopUp({
            Titulo: 'Reasignar',
            Pagina: 'popup_asignar_prospecto_varios.dbsp', Parametros:'propio=1&listap='+Listado_Ids+'&totp='+contador,
            CallBack:'ReloadData',
            Modal:true, ModalAlt : true, Alto:300, Ancho:400
        });
    }
}