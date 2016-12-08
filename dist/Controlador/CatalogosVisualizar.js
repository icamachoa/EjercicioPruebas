SalesUp.Variables.TabSeguimientos = function(){
     SalesUp.Variables.MostrarTablaCatalogosVisualizar({
      TkCo:SalesUp.Variables.TkCo, 
      template:'Vista/TemplateCatalogosVisualizarSeguimientos.dbsp', 
      json:'Modelo/jsonCatalogosVisualizarSeguimientos.dbsp', 
      destino:'sSeguimientos', 
      id:'TablaSeguimientos', 
      almacen:'TemplateSeguimientosVisualizar' 
    });
}


SalesUp.Variables.TabContactos = function(){
     SalesUp.Variables.MostrarTablaCatalogosVisualizar({
      TkCo:SalesUp.Variables.TkCo, 
      template:'TemplateProspectos.dbsp', 
      json:'Modelo/jsonCatalogosVisualizarContactos.dbsp', 
      IdVentana: 1,
      destino:'sContactos', 
      id:'TablaContactos', 
      almacen:'TemplateContactosVisualizar' 
    });
}

SalesUp.Variables.TabOportunidades = function(){
     SalesUp.Variables.MostrarTablaCatalogosVisualizar({
      TkCo:SalesUp.Variables.TkCo, 
      template:'TemplateOportunidades.dbsp', 
      json:'Modelo/jsonOpcionesVisualizarOportunidades.dbsp', 
      IdVentana: 2,
      destino:'sOportunidades', 
      id:'TablaOportunidades', 
      almacen:'TemplateOportunidadesVisualizar',
      callback:SalesUp.Variables.CallBackOportunidades
    });
}

SalesUp.Variables.TabVentas = function(){
     SalesUp.Variables.MostrarTablaCatalogosVisualizar({
      TkCo:SalesUp.Variables.TkCo, 
      template:'TemplateVentas.dbsp', 
      json:'Modelo/jsonOpcionesVisualizarVentas.dbsp', 
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

SalesUp.Variables.MostrarTablaCatalogosVisualizar = function(Op){
        SalesUp.Sistema.MuestraEspera('#'+Op.destino,1);

        setTimeout(function(){            
                SalesUp.Variables.Template1 = SalesUp.Sistema.CargaDatos({Link:Op.template, Parametros:'thead=1&idventana='+Op.IdVentana, Almacen: Op.almacen+'thead' });
                SalesUp.Variables.Template2 = SalesUp.Sistema.CargaDatos({Link:Op.template, Parametros:'thead=0&idventana='+Op.IdVentana, Almacen: Op.almacen+'tbody' });
                SalesUp.Variables.Json = SalesUp.Sistema.CargaDatos({Link:Op.json, Parametros:'start=1&howmany=10&TkCo='+Op.TkCo, DataType:'json' });
                
                SalesUp.Construye.ConstruyeTabla(SalesUp.Variables.Template1, SalesUp.Variables.Template2, SalesUp.Variables.Json.jsonDatos, 
                    {
                      Destino: '#'+Op.destino, 
                      Id: Op.id
                    }
                );
                
                if(!_.isUndefined(Op.callback)){
                		Op.callback();
                }
       
                if(SalesUp.Variables.Json.Registros.TotalResgistros>10){
                    var Temp = "'"+Op.template+"'";
                    var PaTemp = "'"+'thead=0&idventana='+Op.IdVentana+"'";
                    var Almacen = "'"+Op.almacen+'tbody'+"'";
                    var PaginajsonDatos = "'"+Op.json+"'";
                    var Parametros = "'"+'TkCo='+Op.TkCo+"'";
                    var DestinoTabla = "'"+Op.id+"'";
                    
                    $('#'+Op.destino).append('<div onclick="SalesUp.Sistema.VerMasResultados({ Elemento:this, Template:'+Temp+' , ParametrosTemp:'+PaTemp+' , Almacen:'+Almacen+' , PaginajsonDatos: '+PaginajsonDatos+' , Parametros: '+Parametros+' , DestinoTabla: '+DestinoTabla+', Start:11, howMany:10 });" class="w100 tCen Pointer"><span Id="VerMas" class="Btn Btn-flat-Aceptar Btn-tiny"><i class="fa fa-angle-down fa-lg"></i> <b>Ver más</b></span></div>'); 
                }
                SalesUp.Sistema.OcultaEspera();
        }, 200);
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


SalesUp.Variables.InformacionOpcion = function(){
  SalesUp.Sistema.MuestraEspera('#InformacionOpcion',1);
  setTimeout(function() {
    SalesUp.Variables.HtmlDatosOpcion = SalesUp.Sistema.CargaDatos({Link:'Vista/TemplateOpcionesVisualizar.dbsp', Parametros:'', Almacen: 'HtmlDatosOpcion' });
    SalesUp.Variables.jsonInformacionOpcion = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonInformacionOpcion.dbsp', Parametros:{TkCo:SalesUp.Variables.TkCo}, DataType:'json' });
        
    SalesUp.Construye.ReemplazaTemplate({
      Template: SalesUp.Variables.HtmlDatosOpcion, 
      Destino: '#InformacionOpcion',
      Datos: SalesUp.Variables.jsonInformacionOpcion.jsonDatos
    });

    /*$('.InLine, .EditarInLine').on('click',function(){
      var Posicion = $(this).parent().parent().index();
      SalesUp.Variables.EditarEmpresa({Posicion:Posicion});
    });*/
    SalesUp.Sistema.OcultaEspera();
    SalesUp.Sistema.IniciaPlugins();
    $('.DivInfoData.Descripcion').show();
  }, 100);


  
} /* /SalesUp.Variables.InformacionOpcion */

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

$(function(){
    SalesUp.Sistema.ColoresTema();
    SalesUp.Variables.InformacionOpcion();
    //SalesUp.Variables.ActivaInLine();
    $('#Tabs').tabs();
    $('#Tabs, .BoxBotones').show();
    SalesUp.Variables.TabSeguimientos();
    setTimeout(function() {SalesUp.Sistema.UltimaVisita();}, 1000);      
}); /* /fin ready */




