SalesUp.Variables.TabSeguimientos = function(){
     SalesUp.Variables.MostrarTablaEmpresasVisualizar({
      tkcom:SalesUp.Variables.TkCom, 
      template:'Vista/TemplateEmpresasVisualizarSeguimientos.dbsp', 
      json:'Modelo/jsonEmpresasVisualizarSeguimientos.dbsp', 
      destino:'sSeguimientos', 
      id:'TablaSeguimientos', 
      almacen:'TemplateSeguimientosVisualizar' 
    });
}


SalesUp.Variables.TabContactos = function(){
     SalesUp.Variables.MostrarTablaEmpresasVisualizar({
      tkcom:SalesUp.Variables.TkCom, 
      template:'TemplateProspectos.dbsp', 
      json:'Modelo/jsonEmpresasVisualizarContactos.dbsp', 
      IdVentana: 1,
      destino:'sContactos', 
      id:'TablaContactos', 
      almacen:'TemplateContactosVisualizar' 
    });
}

SalesUp.Variables.TabOportunidades = function(){
     SalesUp.Variables.MostrarTablaEmpresasVisualizar({
      tkcom:SalesUp.Variables.TkCom, 
      template:'TemplateOportunidades.dbsp', 
      json:'Modelo/jsonEmpresasVisualizarOportunidades.dbsp', 
      IdVentana: 2,
      destino:'sOportunidades', 
      id:'TablaOportunidades', 
      almacen:'TemplateOportunidadesVisualizar',
      callback:SalesUp.Variables.CallBackOportunidades
    });
}

SalesUp.Variables.TabVentas = function(){
     SalesUp.Variables.MostrarTablaEmpresasVisualizar({
      tkcom:SalesUp.Variables.TkCom, 
      template:'TemplateVentas.dbsp', 
      json:'Modelo/jsonEmpresasVisualizarVentas.dbsp', 
      IdVentana: 3,
      destino:'sVentas', 
      id:'TablaVentas', 
      almacen:'TemplateVentasVisualizar',
      callback:SalesUp.Variables.CallBackVenta
    });
}

function ReloadData(){
    var elTab=$('#Tabs .ui-state-active').attr('id');
    //if (elTab=='TabSeguimientos'){ SalesUp.Variables.TabSeguimientos(); }

    if(elTab=='TabContactos'){
      SalesUp.Variables.TabContactos();
      $('#sSeguimientos, #sOportunidades').html('');
      $('#TabSeguimientos a').attr('onclick','SalesUp.Variables.CargaSeguimientos({Elemento:this});');
      $('#TabOportunidades a').attr('onclick','SalesUp.Variables.CargaOportunidades({Elemento:this});');
    }

    if(elTab=='TabOportunidades'){
      SalesUp.Variables.TabOportunidades();
      
      $('#sSeguimientos, #sContactos, #sVentas').html('');
      $('#TabSeguimientos a').attr('onclick','SalesUp.Variables.CargaSeguimientos({Elemento:this});');
      $('#TabContactos a').attr('onclick','SalesUp.Variables.CargaContactos({Elemento:this});');
      $('#TabVentas a').attr('onclick','SalesUp.Variables.CargaVentas({Elemento:this});');

    }

    if(elTab=='TabVentas'){
      $('#sSeguimientos, #sContactos, #sOportunidades').html('');
      $('#TabSeguimientos a').attr('onclick','SalesUp.Variables.CargaSeguimientos({Elemento:this});');
      $('#TabContactos a').attr('onclick','SalesUp.Variables.CargaContactos({Elemento:this});');
      $('#TabOportunidades a').attr('onclick','SalesUp.Variables.CargaOportunidades({Elemento:this});');
      
    }
}

SalesUp.Variables.MostrarTablaEmpresasVisualizar = function(Op){
        SalesUp.Sistema.MuestraEspera('#'+Op.destino,1);
        var destinoTabla = Op.destino;
        var idTabla = Op.id;
        var templateTabla = Op.template;
        var idVentanaTabla = Op.IdVentana;
        var almacenTabla = Op.almacen;
        var jsonTabla = Op.json;
        var tkcomTabla = Op.tkcom;
        var callbackTabla = Op.callback;

        var procesaInformacionTabla = function(Op,err){
          SalesUp.Variables.Json = Op;

          SalesUp.Variables.Template1 = SalesUp.Sistema.CargaDatos({Link:templateTabla, Parametros:'thead=1&idventana='+idVentanaTabla, Almacen: almacenTabla+'thead' });
          SalesUp.Variables.Template2 = SalesUp.Sistema.CargaDatos({Link:templateTabla, Parametros:'thead=0&idventana='+idVentanaTabla, Almacen: almacenTabla+'tbody' });
          
          SalesUp.Construye.ConstruyeTabla(
            SalesUp.Variables.Template1, 
            SalesUp.Variables.Template2, 
            SalesUp.Variables.Json.jsonDatos, 
            {
              Destino: '#'+destinoTabla, 
              Id: idTabla
            }
          );
 
          if(SalesUp.Variables.Json.Registros.TotalResgistros>10){
              var Temp = "'"+templateTabla+"'";
              var PaTemp = "'"+'thead=0&idventana='+idVentanaTabla+"'";
              var Almacen = "'"+almacenTabla+'tbody'+"'";
              var PaginajsonDatos = "'"+jsonTabla+"'";
              var Parametros = "'"+'tkcom='+tkcomTabla+"'";
              var DestinoTabla = "'"+idTabla+"'";
              
              $('#'+destinoTabla).append('<div onclick="SalesUp.Sistema.VerMasResultados({Elemento:this, Template:'+Temp+' , ParametrosTemp:'+PaTemp+' , Almacen:'+Almacen+' , PaginajsonDatos: '+PaginajsonDatos+' , Parametros: '+Parametros+' , DestinoTabla: '+DestinoTabla+', Start:11, howMany:10 });" class="w100 tCen Pointer"><span Id="VerMas" class="Btn Btn-flat-Aceptar Btn-tiny"><i class="fa fa-angle-down fa-lg"></i> <b>Ver más</b></span></div>'); 
          }
          var totalNoCompartidos = SalesUp.Variables.Json.Registros.noVeo;
          if(SalesUp.Variables.Json.Registros.TotalResgistros<10 && $('#Contactos').is(':visible')){
            if(SalesUp.Variables.Json.Registros.noVeo>0){
              $('#'+destinoTabla).append('<div class="SinResultados BoxSizing w100"> <p style="font-size:12px;"> <i class="fa fa-1x fa-info-circle"></i> Existen otros ('+totalNoCompartidos+') contactos asociados a esta empresa que no están compartidos</p> </div>');
            }
          }
          
          if(!_.isUndefined(callbackTabla)){
            callbackTabla();
          }
          
          SalesUp.Sistema.OcultaEspera();
        }/*procesaInformacionTabla*/

        //console.info('CargaDatosAsync');
        SalesUp.Sistema.CargaDatosAsync({link:jsonTabla, parametros:'start=1&howmany=10&tkcom='+tkcomTabla, callback:procesaInformacionTabla});
          
        
} /* /MostrarTablaEmpresasVisualizar */

SalesUp.Variables.VerEmail = function(Op){
  idemail = Op.IdEmail;
  SalesUp.Construye.MuestraAlerta({
    TipoAlerta:'AlertaModal',
    Alerta: '<iframe class="w100" src="/privado/CorreoEnviado.dbsp?idemail='+idemail+'"></iframe>',
    Titulo:'Correo enviado.',
    BotonOk:'Cerrar',
    Alto:'400px',
    Ancho:'900px'
  });
}/* /VerEmail*/ 

//$.fn.editableform.loading
$.fn.editable.defaults.mode = 'inline';
$.fn.editableform.buttons = 
  '<a href="#" onclick="SalesUp.Sistema.SubmitInLine({e:event, Elemento:this});" class="Btn Btn-tiny Btn-flat-Aceptar editable-submit">'+'<i class="fa fa-check"></i>'+'</a>'+
  '<a class="Btn Btn-tiny Btn-flat-Cancelar editable-cancel">'+'<i class="fa fa-times"></i>'+'</a>'; 


SalesUp.Variables.ActivaInLine = function(){
  var UrlEditaCompania = '/privado/Modelo/qryEditarCompania.dbsp';

  $('.EditarInLine').editable({
    type:'text',
    url:UrlEditaCompania, 
    pk: SalesUp.Variables.TkCom, 
    emptytext:'',
    validate: function(value) {
      if($.trim(value) == '') return 'Se requiere un dato';
    }
  });
  
  /* corporativo */
  SalesUp.Variables.jsonGruposEmpresariales = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonGruposEmpresariales.dbsp', DataType:'json', Almacen:'jsonGruposEmpresariales' });
  SalesUp.Variables.jsonGruposEmpresariales = JSON.stringify(SalesUp.Variables.jsonGruposEmpresariales.jsonDatos);
  SalesUp.Variables.jsonGruposEmpresariales = SalesUp.Sistema.StrReplace('"Id"','value',SalesUp.Variables.jsonGruposEmpresariales);
  SalesUp.Variables.jsonGruposEmpresariales = SalesUp.Sistema.StrReplace('"GrupoEmpresarial"','text',SalesUp.Variables.jsonGruposEmpresariales);
  
  $('#CorporativoInLine').editable({
    type: 'select', 
    source: SalesUp.Variables.jsonGruposEmpresariales,
    pk: SalesUp.Variables.TkCom,
    url:UrlEditaCompania,
    name:'Corporativo',
    value: SalesUp.Variables.jsonInformacionEmpresa.jsonDatos[0].IdCompaniaGrupo,
    emptytext:''
  });

  /* Industria */
  SalesUp.Variables.jsonIndustria = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonIndustria.dbsp', DataType:'json', Almacen:'jsonIndustria' });
  SalesUp.Variables.jsonIndustria = JSON.stringify(SalesUp.Variables.jsonIndustria.jsonDatos);
  SalesUp.Variables.jsonIndustria = SalesUp.Sistema.StrReplace('"IdIndustria"','value',SalesUp.Variables.jsonIndustria);
  SalesUp.Variables.jsonIndustria = SalesUp.Sistema.StrReplace('"Industria"','text',SalesUp.Variables.jsonIndustria);
  
  $('#IndustriaInLine').editable({
    type: 'select', 
    source: SalesUp.Variables.jsonIndustria,
    pk: SalesUp.Variables.TkCom,
    url:UrlEditaCompania,
    name:'Industria',
    value: SalesUp.Variables.jsonInformacionEmpresa.jsonDatos[0].IdIndustria,
    emptytext:''
  });
  
  /*Pais*/
  SalesUp.Variables.jsonPaises = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonPaises.dbsp', Parametros:{pd:SalesUp.Variables.PaisDefault}, DataType:'json', Almacen:'jsonPaises' });
  SalesUp.Variables.jsonPaises = JSON.stringify(SalesUp.Variables.jsonPaises.jsonDatos);
  SalesUp.Variables.jsonPaises = SalesUp.Sistema.StrReplace('"IdPais"','value',SalesUp.Variables.jsonPaises);
  SalesUp.Variables.jsonPaises = SalesUp.Sistema.StrReplace('"Pais"','text',SalesUp.Variables.jsonPaises);
  
  $('#PaisInLine').editable({
    type: 'select', 
    source: SalesUp.Variables.jsonPaises,
    pk: SalesUp.Variables.TkCom,
    url:UrlEditaCompania,
    name:'Pais',
    value: SalesUp.Variables.jsonInformacionEmpresa.jsonDatos[0].IdPais,
    emptytext:''
  });

  /*Estado*/
  
  
  SalesUp.Variables.jsonEstados = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonEstados.dbsp', Parametros:'pd='+SalesUp.Variables.PaisDefault+'&edo='+SalesUp.Variables.EstadoDefault, DataType:'json', Almacen:'jsonEstados' });
  SalesUp.Variables.jsonEstados = JSON.stringify(SalesUp.Variables.jsonEstados.jsonDatos);
  SalesUp.Variables.jsonEstados = SalesUp.Sistema.StrReplace('"IdEstado"','value',SalesUp.Variables.jsonEstados);
  SalesUp.Variables.jsonEstados = SalesUp.Sistema.StrReplace('"Estado"','text',SalesUp.Variables.jsonEstados);
  
  $('#EstadoInLine').editable({
    type: 'select', 
    source: SalesUp.Variables.jsonEstados,
    pk: SalesUp.Variables.TkCom,
    url:UrlEditaCompania,
    name:'Estado',
    value: SalesUp.Variables.jsonInformacionEmpresa.jsonDatos[0].IdEstado,
    emptytext:''
  });

} /* /ActivaInline */

SalesUp.Variables.EditarEmpresa = function(Op){
  var p = '';
  if(Op){
    (Op.Posicion) ? p = '&Edita='+Op.Posicion:'';  
  }
  
  SalesUp.Sistema.AbrePopUp({
    Pagina:'PopUpEditarEmpresa.dbsp',
    Titulo:'Editar información de la empresa', 
    Parametros:'tkcom='+SalesUp.Variables.TkCom+p, 
    CallBack:'SalesUp.Variables.InformacionEmpresa',
    Alto:380, 
    Ancho:350
  });
} /* /SalesUp.Variables.EditarEmpresa */

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
  }, 100);
  
} /* /SalesUp.Variables.InformacionEmpresa */



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


  $('#InformacionEmpresa').append(html);
}



SalesUp.Variables.AlertaEliminarEmpresa = function(){
  var Empresa = SalesUp.Variables.jsonInformacionEmpresa.jsonDatos[0].Empresa;
  SalesUp.Construye.MuestraAlerta({
    TipoAlerta:'AlertaPregunta',
    Alerta:'<i class="fa fa-exclamation-triangle fa-2x Rojo "></i> <br/> <span>¿Esta seguro de eliminar <br/> la empresa "'+Empresa+'" ?</span></div>',
    Boton1:'Eliminar',
    Callback1:'SalesUp.Variables.AlertaReconfirmarEliminarEmpresa',
    Icono1:'<i class="fa fa-trash-o"></i>',
    Ancho: '400px'
  });

} /* /SalesUp.Variables.AlertaEliminarEmpresa */


SalesUp.Variables.AlertaReconfirmarEliminarEmpresa = function(){
  var Empresa = SalesUp.Variables.jsonInformacionEmpresa.jsonDatos[0].Empresa;
  SalesUp.Construye.MuestraAlerta({
    TipoAlerta:'AlertaPregunta',
    Alerta:'<i class="fa fa-exclamation-triangle fa-2x Rojo "></i> <br/> <span> Los contactos relacionados a "'+Empresa+'" se desagruparán </span> ',
    Boton1:'Eliminar',
    Icono1:'<i class="fa fa-trash-o"></i>',
    Callback1:'SalesUp.Variables.EliminarEmpresa',
    Boton2:'Cancelar',
    Ancho: '400px'
  });

} /* /SalesUp.Variables.AlertaEliminarEmpresa */




SalesUp.Variables.EliminarEmpresa = function(){
  SalesUp.Sistema.PostData({Link:'Modelo/qryEliminarEmpresa.dbsp', Parametros:'tkcom='+SalesUp.Variables.TkCom, Funcion:'SalesUp.Variables.SalirdeAqui'});
} /* /SalesUp.Variables.EliminarEmpresa */

SalesUp.Variables.SalirdeAqui = function(){
  document.location.href='prospectos.dbsp';
}

SalesUp.Variables.CargaSeguimientos = function (Op){
  SalesUp.Variables.TabSeguimientos();
  $(Op.Elemento).removeAttr('onclick');
}

SalesUp.Variables.CargaContactos = function (Op){
  SalesUp.Variables.TabContactos();
  $(Op.Elemento).removeAttr('onclick');
}

SalesUp.Variables.CargaOportunidades = function (Op){
  $(Op.Elemento).removeAttr('onclick');
  SalesUp.Variables.TabOportunidades();
}

SalesUp.Variables.CargaVentas = function (Op){
  $(Op.Elemento).removeAttr('onclick');
  SalesUp.Variables.TabVentas();
}

SalesUp.Variables.CallBackVenta = function(){
	$('#VerMas').live('click',function(){
    		setTimeout(function(){
    			SalesUp.Variables.CallBackVenta();
    		},500);
    });
    
	SalesUp.Variables.montoTotal 			= 0;
	SalesUp.Variables.saldoMontoTotal 		= 0;
	SalesUp.Variables.anticiposMontoTotal 	= 0;
	SalesUp.Variables.anticiposComision		= 0;
	SalesUp.Variables.contadorTotal			= 0;
	
	$('.SumaMonto').each(function(){
		SalesUp.Variables.contadorTotal++;
		var classSumaMonto = $(this);
		SalesUp.Variables.montoTotal = SalesUp.Variables.montoTotal + SalesUp.Sistema.MonedaANumero(classSumaMonto.html());
	});
	
	$('.SumaSaldoMonto').each(function(){
		var classSumaSaldoMonto = $(this);
		SalesUp.Variables.saldoMontoTotal = SalesUp.Variables.saldoMontoTotal + SalesUp.Sistema.MonedaANumero(classSumaSaldoMonto.html());
	});
	
	$('.SumaAnticiposMonto').each(function(){
		var classSumaAnticiposMonto = $(this);
		SalesUp.Variables.anticiposMontoTotal = SalesUp.Variables.anticiposMontoTotal + SalesUp.Sistema.MonedaANumero(classSumaAnticiposMonto.html());
	});
	
	$('.SumaAnticiposComision').each(function(){
		var classSumaAnticiposComision = $(this);
		SalesUp.Variables.anticiposComision = SalesUp.Variables.anticiposComision + SalesUp.Sistema.MonedaANumero(classSumaAnticiposComision.html());
	});
	
    $('#anticiposVentas').html(SalesUp.Sistema.FormatoMoneda(SalesUp.Variables.anticiposMontoTotal));
    $('#saldosVentas').html(SalesUp.Sistema.FormatoMoneda(SalesUp.Variables.saldoMontoTotal));
    $('#anticiposComisionVentas').html(SalesUp.Sistema.FormatoMoneda(SalesUp.Variables.anticiposComision));
    $('#totalVentas').html(SalesUp.Sistema.FormatoMoneda(SalesUp.Variables.montoTotal));
    
    if(SalesUp.Variables.contadorTotal > 0){
    		$('#totalesVentas').show();
    }
};

SalesUp.Variables.CallBackOportunidades = function(){
	$('#VerMas').live('click',function(){
    		setTimeout(function(){
    			SalesUp.Variables.CallBackOportunidades();
    		},500);
    });
    
	SalesUp.Variables.montoTotal 	= 0;
	SalesUp.Variables.contadorTotal	= 0;
	
	$('.SumaMonto').each(function(){
		SalesUp.Variables.contadorTotal++;
		var classSumaMonto = $(this);
		SalesUp.Variables.montoTotal = SalesUp.Variables.montoTotal + SalesUp.Sistema.MonedaANumero(classSumaMonto.html());
	});
	
	$('#montoOportunidades').html(SalesUp.Sistema.FormatoMoneda(SalesUp.Variables.montoTotal));
	
	if(SalesUp.Variables.contadorTotal > 0){
    		$('#totalesOportunidades').show();
    }
	
};

/*
SalesUp.Variables.TabContactos();
SalesUp.Variables.TabOportunidades();
SalesUp.Variables.TabVentas();
*/


/**/

SalesUp.Variables.reasignarEmpresa = function(){
  SalesUp.Construye.MuestraPopUp({
    alto:'150px', 
    ancho:'450px',
    titulo:'Reasignar', id:'popUpReasignarEmpresa',
    fuente:'/privado/popup_reasignar_empresa.dbsp'
  });

  setTimeout(function() {
    SalesUp.Variables.LtUsuariosGruposAutorizados();
  }, 100);
}
 
  
  SalesUp.Variables.reasignarListo = function(Op,err){
    if(err){
      console.warn('error', err);
      SalesUp.Construye.MuestraMsj({tMsg:4, Msg:' Hubo un error al momento de reasignar la empresa, intentalo nuevamente.', Destino:'#popUpReasignarEmpresa .BodyModal'});
      return false;
    }

    SalesUp.Variables.InformacionEmpresa();
    SalesUp.Construye.CierraPopUp({t:SalesUp.Variables.thisActual});
    setTimeout(function(){ SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-check"></i> Reasignación realizada.'}); }, 1000);
    SalesUp.Variables.thisActual = undefined;
  }

  SalesUp.Variables.guardaReasignarEmpresa = function(Op){
    SalesUp.Variables.thisActual = Op.t;
    var ejecutivoSeleccionado = $('#idusuarioSeleccionado').val();
    if( SalesUp.Valida.ValidaObligatorios({DentroDe:'#frmAsignarEmpresa', DestinoMsj:'#popUpReasignarEmpresa .BodyModal'}) ){
      SalesUp.Sistema.CargaDatosAsync({
        link:'/privado/Modelo/qryReasignarEmpresa.dbsp', 
        parametros:'TKCOM='+SalesUp.Variables.TkCom+'&IDUSUARIOUP='+ejecutivoSeleccionado,
        callback:SalesUp.Variables.reasignarListo
      });
    }
  }

  /*&& ($("#comentario").val()!="")*/
   /*+'&COMENTARIO='+$("#comentario").val()*/ 

  
  SalesUp.Variables.LtUsuariosGruposAutorizados = function(){
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
    }, 10);

  } /* /SalesUp.Variables.LtUsuario */
  
SalesUp.Variables.DespuesDeSeleccionarUsuario = function(){
  $('.tipsy').remove();
  SalesUp.Sistema.Tipsy();
  var IdsUsuarios='';
}/* /SalesUp.Variables.DespuesDeSeleccionarUsuario */
  



/**/
$('#Tabs').tabs();

$(function(){
    SalesUp.Sistema.ColoresTema();
    SalesUp.Variables.InformacionEmpresa();
    //SalesUp.Variables.ActivaInLine();
    
    $('#Tabs, .BoxBotones').show();

    SalesUp.Variables.TabSeguimientos();

    setTimeout(function() {SalesUp.Sistema.UltimaVisita();}, 50);

    
    var colorBgLabel = $('.tabla1 tr th').css('backgroundColor');
    var colorLetraLabel = $('.tabla1 tr th').css('color');
    var colorBgInfo  = $('.tabla1 tr td').css('backgroundColor');
    var colorLetraInfo  = $('.tabla1 tr td').css('color');
    var estilo = '<style id="cssVisualizar">';
    if(colorLetraLabel){ estilo += '.InfoLabel{color:'+colorLetraLabel+';background:'+colorBgLabel+';}'; }
    if(colorLetraInfo){ estilo += '#Esperando>.fa,.InfoData.InfoDetalle a{color:'+colorLetraInfo+';}.InfoData.InfoDetalle,.BoxSizing.BoxInfoTextArea.InfoDetalle{color:'+colorLetraInfo+';background:'+colorBgInfo+' !important;}'; }
    estilo += '</style>';
    $('body').append(estilo);  
}); /* /fin ready */


var v = 1;
var s = 1;
var h = 50;
SalesUp.Variables.validar = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonEmpresasVisualizarContactos.dbsp', Parametros:'start='+s+'&howmany='+h+'&IdVentana='+v+'&tkcom='+SalesUp.Variables.TkCom, DataType:'json' });
if(SalesUp.Variables.validar.Registros.TotalResgistros>0){$("#btnEliminarEmpresa").hide();}







