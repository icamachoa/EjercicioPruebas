var Destino = '#DatosLoad', IdTabla="TablaOportunidades", IdVentana = 2;
var Datos, TemplateDatos, NombreCampos;
var OportunidadesTheadColumas = 'OportunidadesTheadColumas', OportunidadesTbodyColumas = 'OportunidadesTbodyColumas';

SalesUp.Variables.TemplateVermas = '<div {{Eventos}} class="w100 tCen Pointer"><span Id="{{IdVermas}}" class="Btn Btn-flat-Aceptar Btn-tiny"><i class="fa fa-angle-down fa-lg"></i> <b>Ver más</b></span></div>';

SalesUp.Variables.RecargarTodo = false;
SalesUp.Variables.Switch = SalesUp.Sistema.Almacenamiento({a:'SysSwitchOportunidadesEmpresas'});

/*agregado*/
setTimeout(function(){SalesUp.Sistema.CatalogosActivos({EstoyEn:'Oportunidades'});}, 200);


if(_.isUndefined(SalesUp.Variables.Switch)){
    SalesUp.Variables.VerOriginal = true;
    SalesUp.Variables.VerPorEmpresas = false;
    SalesUp.Variables.Switch = 0;
    SalesUp.Sistema.Almacenamiento({a:'SysSwitchOportunidadesEmpresas', v:'0'});
}else{
    (!SalesUp.Variables.Switch) ? SalesUp.Variables.Switch = 0 : '';
    SalesUp.Variables.Switch = parseInt(SalesUp.Variables.Switch);

    /*agregado*/
    SalesUp.Variables.VerPorEmpresas = false;
    SalesUp.Variables.VerOriginal = false;
    SalesUp.Variables.AgrupacionCatalogo = false;

    if(SalesUp.Variables.Switch==0){
        SalesUp.Variables.VerOriginal = true;
        $('#CheckOportunidadesEmpresas').prop('checked', false);
    }else if(SalesUp.Variables.Switch==1){
        SalesUp.Variables.VerPorEmpresas = true;
        $('#CheckOportunidadesEmpresas').prop('checked', true);
        $('#SwitchOportunidadesEmpresas').attr('tip','Vista de contactos');
    }else{
        SalesUp.Variables.AgrupacionCatalogo = true;
        SalesUp.Variables.Tkca = SalesUp.Sistema.Almacenamiento({a:'SysSwitchOportunidadesEmpresas'});
    }
}

SalesUp.Variables.SwitchActivo = function(Op){
    var Tip = '';
    var $Elemento = $(Op.Elemento);

    SalesUp.Variables.VerPorEmpresas = $Elemento.is(':checked');

    if(SalesUp.Variables.VerPorEmpresas){
        Tip = 'Vista de contactos';
        SalesUp.Sistema.Almacenamiento({a:'SysSwitchOportunidadesEmpresas', v:'1'});
    }else{
        Tip = 'Vista de empresas';
        SalesUp.Sistema.Almacenamiento({a:'SysSwitchOportunidadesEmpresas', v:'0'});
    }

    $('#SwitchOportunidadesEmpresas').attr('tip',Tip);
    ReloadData();
}/*SalesUp.Variables.SwitchActivo*/

SalesUp.Variables.CalculaPromedioCifras = function(json){

    var TotalMonto=0, TotalMontoComision=0, PromedioCerteza=0;
    var TotalMontoBaja=0, TotalComisionBaja=0, TotalCertezaBaja=0;
    var TotalMontoMedia=0, TotalComisionMedia=0, TotalCertezaMedia=0;
    var TotalMontoAlta=0, TotalComisionAlta=0, TotalCertezaAlta=0;
    var Baja=0, Media=0, Alta=0;
    var Registros = 0;
    var CertezaPromedio='%';

    //Nota: aqui se calculan los totales

    $.each(json,function(i,v){

        var Monto = v.Monto;
        var Certeza = v.Certeza;
        var Comision = v.Comision;
        var TipoDeCambio = parseFloat(v.TipoDeCambio);
        var CambioDefault = parseFloat(v.CambioDefault);
        
        if(TipoDeCambio && TipoDeCambio < CambioDefault){
            Monto       = parseFloat(Monto)/TipoDeCambio;
            Comision    = parseFloat(Comision)/TipoDeCambio;
        }else if(TipoDeCambio && TipoDeCambio > CambioDefault){
            Monto       = parseFloat(Monto)*TipoDeCambio;
            Comision    = parseFloat(Comision)*TipoDeCambio;
        }

        Registros++;
        if(CertezaBaja(Certeza)){
            TotalMontoBaja = TotalMontoBaja + parseFloat(Monto);
            TotalComisionBaja = TotalComisionBaja + parseFloat(Comision);
             TotalCertezaBaja = TotalCertezaBaja + parseFloat(Certeza)
            Baja++;
        }

        if(CertezaMedia(Certeza)){
            TotalMontoMedia = TotalMontoMedia + parseFloat(Monto);
            TotalComisionMedia = TotalComisionMedia + parseFloat(Comision);
            TotalCertezaMedia = TotalCertezaMedia + parseFloat(Certeza);
            Media++;
        }

        if(CertezaAlta(Certeza)){
            TotalMontoAlta = TotalMontoAlta + parseFloat(Monto);
            TotalComisionAlta = TotalComisionAlta + parseFloat(Comision);
            TotalCertezaAlta = TotalCertezaAlta + parseFloat(Certeza);
            Alta++;
        }

        TotalMonto = TotalMonto + parseFloat(Monto);
        TotalMontoComision = TotalMontoComision + parseFloat(Comision);
        PromedioCerteza = PromedioCerteza + parseFloat(Certeza);

    }); /*each*/


    var Porcentaje =  SalesUp.Sistema.CalculaDatoPromedio(PromedioCerteza, Registros);

    ( CertezaBaja(Porcentaje)  )? CertezaPromedio = (Porcentaje*100).toFixed(0)+'% <i class="fa fa-circle Rojo Tip1" Tip="Certeza baja"></i>':'';
    ( CertezaMedia(Porcentaje) )? CertezaPromedio = (Porcentaje*100).toFixed(0)+'% <i class="fa fa-circle Amarillo Tip1" Tip="Certeza media"></i>':'';
    ( CertezaAlta(Porcentaje)  )? CertezaPromedio = (Porcentaje*100).toFixed(0)+'% <i class="fa fa-circle Verde Tip1" Tip="Certeza alta"></i>':'';

    var PorcentajeBaja = SalesUp.Sistema.CalculaDatoPromedio(TotalCertezaBaja, Baja);
    PorcentajeBaja = (PorcentajeBaja*100.00).toFixed(0)+'% <i class="fa fa-circle Rojo Tip1" Tip="Certeza baja"></i>';

    var PorcentajeMedia = SalesUp.Sistema.CalculaDatoPromedio(TotalCertezaMedia, Media);
    PorcentajeMedia = (PorcentajeMedia*100.00).toFixed(0)+'% <i class="fa fa-circle Amarillo Tip1" Tip="Certeza media"></i>';

    var PorcentajeAlta = SalesUp.Sistema.CalculaDatoPromedio(TotalCertezaAlta, Alta);

    PorcentajeAlta = (PorcentajeAlta*100.00).toFixed(0)+'% <i class="fa fa-circle Verde Tip1" Tip="Certeza alta"></i>'; 
    
    var simboloMoneda = SalesUp.Sistema.Almacenamiento({a:'SysSimboloMonedaDefault'});

    $('#TotalMontoBaja').html( SalesUp.Sistema.moneda({numero:TotalMontoBaja,moneda:simboloMoneda}));
    $('#TotalMontoMedia').html( SalesUp.Sistema.moneda({numero:TotalMontoMedia,moneda:simboloMoneda}));
    $('#TotalMontoAlta').html( SalesUp.Sistema.moneda({numero:TotalMontoAlta,moneda:simboloMoneda}) );

    $('#TotalComisionBaja').html( SalesUp.Sistema.moneda({numero:TotalComisionBaja,moneda:simboloMoneda}));
    $('#TotalComisionMedia').html( SalesUp.Sistema.moneda({numero:TotalComisionMedia,moneda:simboloMoneda}));
    $('#TotalComisionAlta').html( SalesUp.Sistema.moneda({numero:TotalComisionAlta,moneda:simboloMoneda}));

    $('#TotalCertezaBaja').html( PorcentajeBaja );
    $('#TotalCertezaMedia').html( PorcentajeMedia );
    $('#TotalCertezaAlta').html( PorcentajeAlta );


    $('#TotalMonto').html( '<b>'+SalesUp.Sistema.moneda({numero:TotalMonto,moneda:simboloMoneda})+'</b>' );
    $('#TotalMontoComision').html( '<b>'+SalesUp.Sistema.moneda({numero:TotalMontoComision,moneda:simboloMoneda})+'</b>' );

    $('#PromedioCerteza').html('<b>'+CertezaPromedio+'</b>');


}/*SalesUp.Variables.CalculaPromedioCifras*/

function iraPag(Ir){
    PagAct = Ir;
    var Cond = '';
    SalesUp.Sistema.paginaActual({pagAct:PagAct});
    ActivaPaginacion(Cond,Ir);
}

var JsOportunidades = function(){
    var HtmlTotales = '';
        HtmlTotales += '<tbody><tr>';
        HtmlTotales += '<td class="centrado BorderBottomNone">Baja</td>';
        HtmlTotales += '<td class="centrado BorderBottomNone tDer" id="TotalMontoBaja"></td>';
        HtmlTotales += '<td class="centrado BorderBottomNone tDer" id="TotalComisionBaja"></td>';
        HtmlTotales += '<td class="centrado BorderBottomNone tDer" id="TotalCertezaBaja"></td>';
        HtmlTotales += '</tr>';
        HtmlTotales += '<tr class="zebra">';
        HtmlTotales += '<td class="centrado BorderBottomNone">Media</td>';
        HtmlTotales += '<td class="centrado BorderBottomNone tDer" id="TotalMontoMedia"></td>';
        HtmlTotales += '<td class="centrado BorderBottomNone tDer" id="TotalComisionMedia"></td>';
        HtmlTotales += '<td class="centrado BorderBottomNone tDer" id="TotalCertezaMedia"></td>';
        HtmlTotales += '</tr>';
        HtmlTotales += '<tr>';
        HtmlTotales += '<td class="centrado BorderBottomNone">Alta</td>';
        HtmlTotales += '<td class="centrado BorderBottomNone tDer" id="TotalMontoAlta"></td>';
        HtmlTotales += '<td class="centrado BorderBottomNone tDer" id="TotalComisionAlta"></td>';
        HtmlTotales += '<td class="centrado BorderBottomNone tDer" id="TotalCertezaAlta"></td>';
        HtmlTotales += '</tr>';
        HtmlTotales += '<tr class="zebra">';
        HtmlTotales += '<td class="centrado BorderBottomNone"><b>Totales</b></td>';
        HtmlTotales += '<td class="centrado BorderBottomNone tDer" id="TotalMonto"></td>';
        HtmlTotales += '<td class="centrado BorderBottomNone tDer" id="TotalMontoComision"></td>';
        HtmlTotales += '<td class="centrado BorderBottomNone tDer" id="PromedioCerteza"></td>';
        HtmlTotales += '</tr></tbody>';


    $('#TablaOportunidades').after('<table id="TablaTotalesOportunidades" class="simple">'+HtmlTotales+'</table>');

    SalesUp.Variables.CalculaPromedioCifras(SalesUp.Variables.OportunidadesJson);

    $('#DatosLoad').append('<div id="BtnExportarImportar" class="BoxBotones"></div>');
    var AbreExportar = "SalesUp.Ventana.AbrePopUp({Titulo:'Exportar Oportunidades', Pagina:'popup_tipo_exportacion.dbsp', Parametros:'&ExportacionPantalla="+escape('Oportunidades en pantalla')+"&ExportacionTotal="+escape('Todas las oportunidades')+"&pantalla="+IdVentana+"', CallBack:'ReloadData', Iframe:true, Alto:130, Ancho:280 })";
    SalesUp.Construye.AgregaBoton({DentroDe:'#BtnExportarImportar', btnTamanio:'Btn-tiny Btn-tiny-min', Boton:'Exportar oportunidades', Titulo:'Exportar información', Onclick:AbreExportar, Icono:'fa-clipboard', Clases:'ExportarInformacion' });

    OportunidadesAdicionales();
    SalesUp.Sistema.OcultaEspera();
    SalesUp.Variables.PonerSimbolosMontoOportunidades();


}/*JsOportunidades*/


var ReloadData = function(){
    SalesUp.Variables.jsonDatosOpE = [];
    nRegistros=0, Datos=undefined;
    SalesUp.Sistema.ColoresTema();
    SalesUp.Sistema.MuestraEspera(Destino,1);
    SalesUp.Sistema.MuestraEspera('#LosFiltros',2);
    setTimeout(function(){
        if(SalesUp.Variables.VerPorEmpresas){
            SalesUp.Variables.VistaPorEmpresa({start:1});
        }

        if(SalesUp.Variables.VerOriginal){
            SalesUp.Sistema.CargaDatos({Link:'LosFiltrosOportunidades.dbsp', Parametros:'&IdVentana='+IdVentana, Div:1, Destino:'#LosFiltros' });
            SalesUp.Sistema.CargaDatos({Link:'/privado/vacio.dbsp', DataType:'json'});
            var monedaActivo = SalesUp.Sistema.Almacenamiento({a:'SysMonedaActivo'});
            if(monedaActivo == 1){
                $('#FiltroTipo').append('<option value="19">Moneda</option>');
            }

            NombreCampos    = SalesUp.Sistema.CargaDatos({Link:'TemplateOportunidades.dbsp', Parametros:'&thead=1&IdVentana='+IdVentana, Div:0, Almacen: OportunidadesTheadColumas });
            TemplateDatos   = SalesUp.Sistema.CargaDatos({Link:'TemplateOportunidades.dbsp', Parametros:'thead=0&IdVentana='+IdVentana, Div:0, Almacen: OportunidadesTbodyColumas });
            DatosJson       = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonOportunidades.dbsp', Parametros:'start='+Start+'&howmany='+RegXPag+'&IdVentana='+IdVentana, DataType:'json', Div:0 });
            SalesUp.Variables.jsonoportunidad = DatosJson; 
            SalesUp.Sistema.CargaDatos({Link:'/privado/vacio.dbsp', DataType:'json'});
            if(DatosJson!==undefined){
                Datos = DatosJson.JsonDatos;

                SalesUp.Variables.OportunidadesJson = Datos;
                nRegistros = DatosJson.Registros.TotalResgistros;
            }

            SalesUp.Construye.ConstruyeTabla(NombreCampos, TemplateDatos, Datos, {Destino:Destino, Id:IdTabla, Callback:JsOportunidades, PagActual:PagAct, NumRegistros:nRegistros } );
        }/*if(SalesUp.Variables.VerOriginal){*/


        if(SalesUp.Variables.AgrupacionCatalogo){
            SalesUp.Sistema.VistaPorAgrupacion({
                IdVentana: IdVentana,
                LosFiltros:'LosFiltrosOportunidades.dbsp',
                modeloJson: 'jsonOportunidadesCatalogos.dbsp'
            });
        }

        OportunidadesAdicionales();
        SalesUp.Sistema.OcultaEspera();

    },100); /* setTimeout */
    //SalesUp.Variables.PonerSimbolosMontoOportunidades();
}/*ReloadData*/

SalesUp.Variables.FuncionesAdicionales = function(){
    OportunidadesAdicionales();
}

SalesUp.Variables.VistaPorEmpresa = function(Op){
    Start = (typeof Start != "undefined") ? Start : 1;
    
     SalesUp.Sistema.CargaDatosAsync({link:'modelo/jsonOportunidadesEmpresasTabla.dbsp',
        DataType:'json',
        prmAdicionales:{start:Start,RegXPag:50},
        parametros:'start='+Start+'&howmany=50&IdVentana=2',
        callback: VistaPorEmpresa
    });
    
    function VistaPorEmpresa (Op,nada,params){
        SalesUp.Sistema.CargaDatos({Link:'LosFiltrosOportunidades.dbsp', Parametros:'IdVentana=2', Destino:'#LosFiltros' });
        var x = SalesUp.Variables.jsonDatosOpE;
    
            var template = '';
            jsonOb = Op.jsonDatos;
            totalRegistros =Op.Registros.RESULTADOS;
            templateHead = '<tr><td><a id="ConfigurarPantalla" tip="Ordenar columnas de Oportunidades" class="thickbox Tip2" href="PopupOrdenarColumnas.dbsp?IdVentana=2&amp;TB_callback=ReloadData&amp;TB_iframe=true&amp;height=280&amp;width=400&amp;modal=true&amp;modalAlt=true&amp;CloseReload=true" original-title=""><img src="../estilos/icon-gear.png"></a></td><td>Empresa</td><td>Corporativo</td><td>Industria</td><td>Página web</td><td>Teléfono</td><td>Monto</td><td>Último contacto</td><td>Eje</td><td  class="tCen" style="width:95px;"></td></tr>';
            template += '<tr>';
            template += '<td><b>{{nFila}}</b></td>';
            template += '<td ><a href="/privado/EmpresasVisualizar.dbsp?tkCom={{TkCom}}"><i class="fa fa-building-o"></i> {{Empresa}}</a></td> ';
            template += '<td >{{Industria}}</td>';
            template += '<td >{{CompaniaGrupo}}</td> ';
            template += '<td>{{Url}}</td>';
            template += '<td>{{Telefono}}</td>';
            template += '<td style="text-align:right">{{hlp_Simbolo_Moneda TOTALOp}}</td>';
            //template += '<td ><a  href="/privado/prospectos-visualizar.dbsp?TKP={{Tkp}}" >{{Contacto}} <br/><i>{{PUESTO}}</i></a></td> ';
            // template += '<td >{{CorreoProspecto}} {{telefonoContacto}}</td> ';
            template += '<td >{{#if ORD}}<i><a href="/privado/prospectos-visualizar.dbsp?tkp={{TKP}}">{{Contacto}}</a> - <span class="Tip8" tip="{{NOMBRE_USUARIO_CONTACTO}}">[{{{INICIALES_CONTACTO}}}]</span> - {{{TIEMPO_CONTACTO}}} - {{{COMENTARIO}}}</i>{{/if}}</td> ';
            template += '<td class="Tip8 tCen" Tip="{{NOMBRE}} {{APELLIDOS}}">{{INICIALES}}</td>';
           template += '<td><div style="width:95px"><span {{#if NRT}}onclick="SalesUp.Variables.addtr({e:this,tk:\'{{TkCom}}\',nrt:\'{{NRT}}\'})"{{/if}} class=" Pointer Btn Btn-rounded Btn-flat-Aceptar Btn-tiny Btn-tiny-min" style="position:relative; border-radius: 3px 0px 0px 3px; padding: 0px 7px;width:35px !important;">{{#if NRT}}{{NRT}}&nbsp;<i class="fa fa-chevron-down"></i>{{else}}0&nbsp;<i class="fa"></i>{{/if}}</span>';
            
            template += ' '+SalesUp.Variables.OpcAc+'</div></td>';
            
            template += '</tr>';
            SalesUp.Construye.ConstruyeTabla(templateHead, template, jsonOb, {Destino:'#DatosLoad', Id:'TablaEmpresas', PagActual:PagAct, NumRegistros:totalRegistros } );
        
    }
    //SalesUp.Variables.PonerSimbolosMontoOportunidades();
}  /* SalesUp.Variables.VistaPorEmpresa */
//*****************************************************//
//*****************************************************//
//*****************************************************//
SalesUp.Variables.addtr = function(Op){
  var tkR = Op.tk;var temp1;
  Op.nrt ? SalesUp.Sistema.Almacenamiento({a:'NRT_'+tkR,v:Op.nrt}) : SalesUp.Sistema.Almacenamiento({a:'NRT_'+tkR})
  if(Op.e){elemento = Op.e;
    $(elemento).attr('onclick','SalesUp.Variables.rmtr({e:this,tk:'+JSON.stringify(tkR)+'})')
    temp1 = $(elemento).closest("tr");
    SalesUp.Sistema.Almacenamiento({a:'element_'+tkR,v:'muero'})
    temp1.find('.fa-chevron-down').removeClass('fa-chevron-down').addClass('fa-spinner fa-spin');


    $(temp1).after('<tr class=" nohov" style=""><td colspan="15"  style="padding: 0;border-top: none;" ><div class="tablaInterna" id="PutData_'+tkR+'"></div></td></tr>');
    }

    $('#PutData_'+tkR+'').html(SalesUp.Sistema.unMomento())
    SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonOportunidades.dbsp',
      DataType:'json',
      parametros:'IdVentana='+IdVentana+'&tkcom='+tkR,
      callback: MustreProspectos
    });
    
    function MustreProspectos (DatosJson) {
        var Datos = DatosJson.JsonDatos;

        NombreCampos    = SalesUp.Sistema.CargaDatos({Link:'TemplateOportunidades.dbsp', Parametros:'TKCOM='+tkR+'&thead=1&IdVentana='+IdVentana, Div:0 });
        TemplateDatos   = SalesUp.Sistema.CargaDatos({Link:'TemplateOportunidades.dbsp', Parametros:'thead=0&IdVentana='+IdVentana, Div:0, Almacen: OportunidadesTbodyColumas });
        SalesUp.Construye.ConstruyeTabla(NombreCampos, TemplateDatos, Datos, {Destino:'#PutData_'+tkR,elInicio:1, Id:'tablas'+tkR, PagActual:1} );
        SalesUp.Variables.PonerSimbolosMontoOportunidades();
        var  TotalResgistros = DatosJson.Registros.TotalResgistros
        var faltantes = SalesUp.Sistema.Almacenamiento({a:'NRT_'+tkR})-TotalResgistros;
        if (faltantes > 0) {
          var piloto = '<div class="SinResultados BoxSizing w100"> <p style="font-size:12px;"> <i class="fa fa-1x fa-info-circle"></i> Existen otras ('+faltantes+') oportunidades asociadas a esta empresa que no están compartidos</p> </div>';
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
        OportunidadesAdicionales();
    }
}

SalesUp.Variables.rmtr  = function(Op){
  elemento = Op.e;
  $(elemento).attr('onclick','SalesUp.Variables.addtr({e:this,tk:'+JSON.stringify(Op.tk)+'})')
  temp1 = $(elemento).closest("tr");
  temp1.find('.fa-chevron-up').removeClass('fa-chevron-up').addClass('fa-chevron-down');
  $(temp1).next().remove();
}

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


SalesUp.Variables.procesaCompartir = function(tkcom){
  var guardaTko = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonOportunidadesReturn.dbsp',
    DataType:'json',
    Parametros:'IdVentana=101&tkcom='+tkcom
  });     

  var totalP = guardaTko.JsonDatos.length;
  var listap = [];
  for (var i = 0; i < totalP; i++) {
     listap[i] = guardaTko.JsonDatos[i].TKP
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
  var guardaTko = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonOportunidadesReturn.dbsp',
    DataType:'json',
    Parametros:'IdVentana=2&tkcom='+tkcom
  }); 

  var totalP = guardaTko.JsonDatos.length;
  var listap = [];
  for (var i = 0; i < totalP; i++) {
     listap[i] = guardaTko.JsonDatos[i].TKP
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
  SalesUp.Variables.Diff = 3
  SalesUp.empresas.nuevaEmpresa(1);
}

//SalesUp.Variables.OpcAc = '<span class="btnNeutral Pointer Btn Btn-rounded Btn-flat-Aceptar Btn-tiny Btn-tiny-min" style="position: relative; left: -5px; border-radius: 0px 3px 3px 0px;" onmouseenter="SalesUp.Construye.accionesRow({t:this});"> <i class="fa fa-lg fa-ellipsis-v"></i> </span> <div class="accionesOcultas" style="display:none;"> <span class="OpcionAcciones Pointer" onclick="SalesUp.Sistema.AbrePopUp({Titulo:\'Editar prospecto\', Pagina:\'/privado/PopUpNuevoProspecto.dbsp\', Parametros:\'tkcom={{TkCom}}&avanzado=1\', CallBack:\'{{ReloadData}}\', Alto:150, Ancho:500});"> <i class="fa fa-lg fa-user-plus"></i> Agregar prospecto </span>  <span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.reasignarEmpresa(\'{{TkCom}}\')" > <i class="fa fa-lg fa-arrow-right"></i> Reasignar</span>    {{#if NRT}}<span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.procesaCompartir(\'{{TkCom}}\')"> <i class="fa fa-lg fa-users"></i> Compartir </span> {{/if}}    {{#if NRT}} <span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.procesaEtiquetar(\'{{TkCom}}\',\'{{ReloadData}}\')"> <i class="fa fa-lg fa-tag"></i> EtiquetarOld </span><span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.accionesComunes.etiquetarVarios({titulo: \'Etiquetar varias oportunidades\', template: \'Oportunidades\', origen: \'empresas\', TkCom: \'{{TkCom}}\',TkPe: 1, callback: \'{{ReloadData}}\'})"> <i class="fa fa-lg fa-tag"></i> Etiquetar </span>{{/if}}  <span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.editar(\'{{TkCom}}\')"> <i class="fa fa-lg fa-edit"></i>  Editar</span> </div>'
SalesUp.Variables.OpcAc = '<span class="btnNeutral Pointer Btn Btn-rounded Btn-flat-Aceptar Btn-tiny Btn-tiny-min" style="position: relative; left: -5px; border-radius: 0px 3px 3px 0px;" onmouseenter="SalesUp.Construye.accionesRow({t:this});"> <i class="fa fa-lg fa-ellipsis-v"></i> </span> <div class="accionesOcultas" style="display:none;"> <span class="OpcionAcciones Pointer" onclick="SalesUp.Sistema.AbrePopUp({Titulo:\'Editar prospecto\', Pagina:\'/privado/PopUpNuevoProspecto.dbsp\', Parametros:\'tkcom={{TkCom}}&avanzado=1\', CallBack:\'{{ReloadData}}\', Alto:150, Ancho:500});"> <i class="fa fa-lg fa-user-plus"></i> Agregar prospecto </span>  <span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.reasignarEmpresa(\'{{TkCom}}\')" > <i class="fa fa-lg fa-arrow-right"></i> Reasignar</span>    {{#if NRT}}<span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.procesaCompartir(\'{{TkCom}}\')"> <i class="fa fa-lg fa-users"></i> Compartir </span> {{/if}}    {{#if NRT}}<span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.etiquetarMultiple.mostrarPopup({titulo: \'Etiquetar varias oportunidades\', template: \'Oportunidades\', origen: \'empresas\', tkcom: \'{{TkCom}}\',tkpe: 1, callback: \'{{ReloadData}}\'})"> <i class="fa fa-lg fa-tag"></i> Etiquetar </span>{{/if}}  <span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.editar(\'{{TkCom}}\')"> <i class="fa fa-lg fa-edit"></i>  Editar</span> </div>'
//*****************************************************//
//*****************************************************//
//*****************************************************//

//SalesUp.Variables.OpcAc = '<span class="btnNeutral Pointer Btn Btn-rounded Btn-flat-Aceptar Btn-tiny Btn-tiny-min" style="position: relative; left: -4px; border-radius: 0px 3px 3px 0px;" onmouseenter="SalesUp.Construye.accionesRow({t:this});"> <i class="fa fa-lg fa-ellipsis-v"></i> </span> <div class="accionesOcultas" style="display:none;"> <span class="OpcionAcciones Pointer" onclick="SalesUp.Sistema.AbrePopUp({Titulo:\'Crear una nueva oportunidad de negocio\', Pagina:\'/privado/popup_convierte_a_oportunidad.dbsp\', Parametros:\'tkp={{TKP}}&idprospecto={{IdProspecto}}\', CallBack:\'{{ReloadData}}\', Alto:450, Ancho:550});"> <i class="fa fa-lg fa-user-plus"></i> Agregar Prospecto </span>  <span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.reasignarEmpresa(\'{{TkCom}}\')" > <i class="fa fa-lg fa-arrow-right"></i> Reasignar</span>    {{#if NRT}}<span class="OpcionAcciones Pointer" onclick="SalesUp.Sistema.AbrePopUp({Titulo: \'Compartir prospecto con:\', Pagina:\'/privado/popup_compartir_prospecto_varios.dbsp\', Parametros:\'tkR={{TkCom}} \', CallBack:\'{{ReloadData}}\', Alto:150, Ancho:586});"> <i class="fa fa-lg fa-users"></i> Compartir </span> {{/if}}    {{#if NRT}} <span class="OpcionAcciones Pointer" onclick="SalesUp.Sistema.AbrePopUp({Titulo:\'Etiquetar prospecto como parte de un segmento\', Pagina:\'/privado/popup_etiqueta_prospectos.dbsp\', Parametros:\'tkp={{Tkp}}\', CallBack:\'{{ReloadData}}\', Alto:300, Ancho:470});"> <i class="fa fa-lg fa-tag"></i> Etiquetar </span>{{/if}}  <span class="OpcionAcciones Pointer" > <i class="fa fa-lg fa-edit"></i>  <a href="/privado/EmpresasVisualizar.dbsp?tkCom={{TkCom}}" style="color:black;">Editar</a></span> </div>'

SalesUp.Variables.listadoAn = function (Op){
    var t = Op.t, $t = $(t);
    var $t = $(Op.t), $p = $t.closest('td'), $ao = $p.find('.listadoOculto');
    var htmlAcciones = $ao.html();
    var accionesMenu = function(){
    SalesUp.Construye.popOver({Elemento:t, PopOverLugar:'left', Contenido:htmlAcciones, Clases:'PopOverAcciones2'});
    $(".listadoAncla  a").css('color','black');
    SalesUp.Sistema.Tipsy();
}

accionesMenu();
$t.mouseenter(function(){ accionesMenu(); });
$ao.remove();
$t.removeAttr('onmouseenter');}



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

SalesUp.Variables.ReloadDataEmpresaOpor = function(Op){
    if(SalesUp.Variables.RecargarTodo){
        ReloadData();
        setTimeout(function() {
            $('#BoxTabla'+SalesUp.Variables.IdEmpresaOpor).html('');
            $('#Mostrar'+SalesUp.Variables.IdEmpresaOpor).removeAttr('abierto');
            SalesUp.Variables.MostrarTabla({Elemento:$('#Mostrar'+SalesUp.Variables.IdEmpresaOpor), t:SalesUp.Variables.IdEmpresaOpor , tkcom:SalesUp.Variables.tkComSeleccionadaOpor, nRegistros:SalesUp.Variables.nRegistrosOpor });
        }, 300);
    }else{
        $('#BoxTabla'+SalesUp.Variables.IdEmpresaOpor).html('');
        $('#Mostrar'+SalesUp.Variables.IdEmpresaOpor).removeAttr('abierto');
        SalesUp.Variables.MostrarTabla({Elemento:$('#Mostrar'+SalesUp.Variables.IdEmpresaOpor), t:SalesUp.Variables.IdEmpresaOpor , tkcom:SalesUp.Variables.tkComSeleccionadaOpor, nRegistros:SalesUp.Variables.nRegistrosOpor });
    }
}

SalesUp.Variables.MostrarTabla = function(Op){
    var $Elemento = $(Op.Elemento);
    var Abierto = parseInt($Elemento.attr('abierto'));

    SalesUp.Variables.IdEmpresaOpor = Op.t;
    SalesUp.Variables.tkComSeleccionadaOpor = Op.tkcom;
    SalesUp.Variables.nRegistrosOpor = Op.nRegistros;

    if(Abierto>0){
        $('#BoxTabla'+Op.t).slideUp('slow');
        $Elemento.attr('abierto',0).addClass('fa-angle-down').removeClass('fa-angle-up');
    }else{
        $('#BoxTabla'+Op.t).slideDown('slow');
        $Elemento.attr('abierto',1).removeClass('fa-angle-down').addClass('fa-spinner fa-spin');
        SalesUp.Variables.ExisteTabla = _.size($('#BoxTabla'+Op.t).find('table'));

        setTimeout(function(){
            if(SalesUp.Variables.ExisteTabla==0){
                SalesUp.Variables.Template1 = SalesUp.Sistema.CargaDatos({Link:'TemplateOportunidades.dbsp', Parametros:'thead=1&IdVentana='+IdVentana, Almacen: OportunidadesTheadColumas });
                SalesUp.Variables.Template2 = SalesUp.Sistema.CargaDatos({Link:'TemplateOportunidades.dbsp', Parametros:'thead=0&IdVentana='+IdVentana, Almacen: OportunidadesTbodyColumas });
                SalesUp.Variables.jsonOportunidades = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonOportunidades.dbsp', Parametros:'start=1&howmany=50&IdVentana='+IdVentana+'&tkcom='+Op.tkcom, DataType:'json' });
                $('#ComentarioI'+Op.t).html(SalesUp.Variables.jsonOportunidades.UltimoComentario.ULTIMOCOMENTARIO);
                SalesUp.Construye.ConstruyeTabla(SalesUp.Variables.Template1, SalesUp.Variables.Template2, SalesUp.Variables.jsonOportunidades.JsonDatos,
                    {
                        Destino: '#BoxTabla'+Op.t,
                        Id: 'OportunidadesEmpresa-'+Op.t
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
            if(Op.t=='-1'){ $('.NombreEmpresa').show(); }
           OportunidadesAdicionales();
        }, 200);

    }
  // setTimeout(function() {SalesUp.Variables.PonerSimbolosMontoOportunidades();}, 300);

} /* /SalesUp.Variables.MostrarTabla */

SalesUp.Variables.VerMasResultados = function(Op){
    var $Elemento = $(Op.Elemento);
    SalesUp.Sistema.MuestraEspera($Elemento,1);

    SalesUp.Variables.TemplateRow = SalesUp.Sistema.CargaDatos({Link:'TemplateOportunidades.dbsp', Parametros:'thead=0&IdVentana='+IdVentana, Almacen: OportunidadesTbodyColumas });

    setTimeout(function() {
        SalesUp.Variables.jsonOportunidades = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonOportunidades.dbsp', Parametros:'start='+Op.Start+'&howmany='+Op.howMany+'&IdVentana='+IdVentana+'&tkcom='+Op.tkcom, DataType:'json' });

        SalesUp.Construye.ReemplazaTemplate({
            Template: SalesUp.Variables.TemplateRow,
            Destino: '#OportunidadesEmpresa-'+Op.t+' tbody',
            Datos: SalesUp.Variables.jsonOportunidades.JsonDatos
        });

        var n = 1;
        $('#OportunidadesEmpresa-'+Op.t+' tbody tr').each(function(){
            $(this).find('td:first').html('<b>'+n+'</b>');
            n = n + 1;
        });

        var Desde = Op.howMany + Op.Start;

        if ( _.size($('#OportunidadesEmpresa-'+Op.t+' tbody tr')) < SalesUp.Variables.jsonOportunidades.Registros.TotalResgistros){
            var id = "'"+Op.tkcom+"'";
            $('#BoxTabla'+Op.t).append('<div onclick="SalesUp.Variables.VerMasResultados({ Elemento:this, tkcom: '+id+', t:'+Op.t+' , Start:'+Desde+', howMany:50 });" class="w100 tCen Pointer"><span Id="VerMas" class="Btn Btn-flat-Aceptar Btn-tiny"><i class="fa fa-angle-down fa-lg"></i> <b>Ver más</b></span></div>');
        }



        $Elemento.remove();
        OportunidadesAdicionales();
        SalesUp.Sistema.IniciaPlugins();
        SalesUp.Sistema.OcultaEspera();

    }, 100);
} /* /SalesUp.Variables.VerMasClientes */


function CertezaBaja(n){ if(n<0.34){return true;}else{return false;} }
function CertezaMedia(n){ if( (n>=0.34) && (n<0.66) ){return true;}else{return false;} }
function CertezaAlta(n){ if(n>=0.66){return true;}else{return false;} }

/*-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+*/
var Listado_Ids = '';
var contador=0;

function OportunidadesAdicionales(){
    $('#etiquetar_list, #descartar_list, #reasignar_list').unbind('click');

    Listado_Ids = '';
    TotalOportunidades='';
    Oportunidades="";

    var alerta = "alertlike";
    var methods = {
        alertlike : function(){
            $.fallr('show', {
                content: '<p><b>Debe selecccionar al menos una oportunidad.</b></p>',
                width:'400px', height:'150px',
                autoclose: 4000, icon: 'warning',
                closeKey: true, position: 'center'
            });
        }
    };

    $(".VerLtOpcionesMultiples").click( function() {
        Listado_Ids = SalesUp.Sistema.RecorreCheckSeleccionados();
        TotalOportunidades = SalesUp.Sistema.RecorreCheckSeleccionadosOportunidades();
        var listaArray = Listado_Ids.split(',');
        contador = _.size(listaArray) - 1;
    });

    $('.laseleccion').click(function(){
        Listado_Ids = SalesUp.Sistema.RecorreCheckSeleccionados();
        TotalOportunidades = SalesUp.Sistema.RecorreCheckSeleccionadosOportunidades();
        var listaArray = Listado_Ids.split(',');
        contador = _.size(listaArray) - 1;
    });


    /* Realiza la accion de reasignar cuando se elije la opcion de reasignar todos */
    $('#reasignar_list').click(function(){
        if(contador==0){
            methods[alerta].apply(this,[this]);
            $('#opcionesMult').hide('slow');
        }else{
            tb_show('Reasignar Oportunidades', 'popup_asignar_oportunidad_varios.dbsp?propio=1&listap='+TotalOportunidades+'&totp='+contador+'&TB_callback=ReloadData&TB_iframe=true&height=330&width=450', '');
        }
    });



    /* Realiza la accion de descartar cuando se elije la opcion de descartar todos */
    $('#descartar_list').click(function(){
        if(contador==0){
            methods[alerta].apply(this,[this]);
            $('#opcionesMult').hide('slow');
        }else{
            //Listado_Ids = Listado_Ids.substring(1);

            tb_show('Descartar Oportunidades', 'popup_descartar_oportunidad_varios.dbsp?listap='+Listado_Ids+'&listao='+TotalOportunidades+'&TB_callback=ReloadData&TB_iframe=true&height=280&width=400', '');
        }
    });

    /* Realiza la accion de descartar cuando se elije la opcion de descartar todos */
    $('#etiquetar_list').click(function(){
        if(contador==0){
            methods[alerta].apply(this,[this]);
            $('#opcionesMult').hide('slow');
        }else{
            //Listado_Ids = Listado_Ids.substring(1);
            tb_show('Etiquetar varias oportunidades', 'popup_etiqueta_prospectos_varios.dbsp?propio=1&listap='+Listado_Ids+'&totp='+contador+'&TB_callback=ReloadData&TB_iframe=true&height=250&width=450', '');
        }
    });

    EliminarDescartador();
    //SalesUp.Variables.PonerSimbolosMontoOportunidades();
    SalesUp.Sistema.CatalogosActivos();
} /* OportunidadesAdicionales */


function EliminarDescartador(){
    $('.filtro').each(function(){
        var tf = $(this).attr('tf');
        if(tf==22) $('#descartar_list').parent().remove();
    });
}

/* Realiza la accion de compartir cuando se elije la opcion de compartir todos */
function CompartirMultiples() {
    if(contador==0) {
        methods[alerta].apply(this,[this]);
        $('#opcionesMult').hide('slow');
    } else {
        Listado_Ids = SalesUp.Sistema.RecorreCheckSeleccionados();
        //Listado_Ids = Listado_Ids.substring(1);
        tb_show('Compartir varios prospectos', '/privado/popup_compartir_prospecto_varios.dbsp?propio=1&listap='+Listado_Ids+'&totp='+contador+'&TB_callback=ReloadData&TB_iframe=true&height=270&width=650', '');
    }
};

function AbrirEditarProductos(idOportunidad,idProspecto,tko){
    SalesUp.Documentos.CapturaProductosVisualizar('Editar productos', idOportunidad, idProspecto, tko);
    SalesUp.Variables.BanderaEditarSeguimiento = 1;
}

SalesUp.Variables.EtiquetarLista = function(){

}


SalesUp.Variables.PonerSimbolosMontoOportunidades=function(){

  setTimeout(function() {
      $('.PutSymbol').each(function(){
        var Elemento=this;
            var Numero=$(Elemento).html();
            var Simbolo= $(Elemento).attr('data-simbolo');
            var Unicode= $(Elemento).attr('data-unicode');
            if (Unicode != '' && Simbolo != '') {
                Simbolo = String.fromCharCode(Unicode);
                Monto=SalesUp.Sistema.moneda({numero:Numero, moneda:Simbolo});
                $(Elemento).html(Monto);
            }else{
                Monto = SalesUp.Sistema.FormatoMoneda(Numero);
                $(Elemento).html(Monto);
            }

      });
 }, 450);
}