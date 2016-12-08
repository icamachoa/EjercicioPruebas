var Destino = '#DatosLoad';

setTimeout(function(){
  SalesUp.Sistema.ColoresTema();
  SalesUp.Sistema.MuestraEspera(Destino,1);
  ReloadData();
}, 400);

var ReloadData = function(){
    setTimeout(function(){
      VistaReporte();
    }, 300);
}

SalesUp.Variables.objetoFiltro = '';

 var VistaReporte =function(Op){
 //prospecto = D17D6120-D963-42F4-B289-CBFDC85415FB, cliente = 86AF6289-0A8A-49F0-8DBC-C858F049837D, oportubidades = 8BAB49E8-A5A5-4768-88DF-96CE4BA08819
// 15-0 = prospectos, 16-1 = oportunidades, 17-2 = clientes

  var mostrar = '8BAB49E8-A5A5-4768-88DF-96CE4BA08819';
  var mostrarTipo = 1;
  /*******************************/
  var tipo = 1;
  var tiempo = 0;
  var moneda = 0;
  /*******************************/
  var idvariante = SalesUp.Sistema.CargaDatos({
        Link:'/privado/Modelo/jsoReturnaTk.dbsp', 
        Parametros:'valor2='+mostrar
      });
      idvariante = JSON.parse(idvariante)
      idvariante = idvariante.jsonTk[0].IDVARIANTE
  /*******************************/
  SalesUp.Variables.objetoFiltro = {'tipo':tipo,'tiempo':tiempo};
  /*******************************/

  var vistaReporteCrea = function(Op){
    construyeGrafica(Op);
    SalesUp.Sistema.MuestraEspera(Destino,0);
    var template = '';

    jsonHead = Op.jsonDatosHead;
    jsonBody = Op.jsonDatosBody;
    
    templateHeadth = '';
    templateBody = '';

    var Total = jsonHead[0].TOTAL;
    var porcent = (50/jsonHead[0].TOTAL);
    var count = 1;
    var Rowcount = 1;
    var fase = 'FASE';
    var tBody = '<tr class=""><td>{{nFila}}</td><td>{{NOMBRE}}</td>';
    
    templateHeadth += '<th class="centrado" style="width: 2% !important;"></th>';
    templateHeadth += '<th style="width:20%;">Nombre</th>';

    for (var i = 0; i < jsonHead.length; i++) {
       templateHeadth += '<th class="centrado fasesids" style="width:'+porcent+';" id="FASE'+count+'" data-idfase="'+jsonHead[i].IDFASE+'" data-cont="'+count+'"> '+jsonHead[i].CABECERA+' </th>';
       tBody+='<td class="centrado">{{hlpFases FASE'+count+' '+count+'}}</td>';
       count++;
    }
    tBody +='</tr>';

    //var templateCuerpo = SalesUp.Construye.ReemplazaDatos({Template:tBody,Datos:{jsonBody:jsonBody}});
    
    SalesUp.Construye.ConstruyeTabla(templateHeadth,tBody,jsonBody,{Destino:'#DatosLoad',Id:'reporteContenido',PagActual:SalesUp.Sistema.paginaActual(),NumRegistros:jsonBody.length});
    
    // 0 = prospectos, 1 = oportunidades, 2 = clientes
    $('.fasesids').each(function(){
      var $elemento=$(this);
      var id= $elemento.attr('data-idfase');
      var cont= $elemento.attr('data-cont');

      if(mostrarTipo==1){
        var retornaEsta = 'valor='+id+'&RETORNATIPO=1';
      }else{
        var retornaEsta = 'valor='+id+'&RETORNATIPO=0';
      }

      var tkRetornado = SalesUp.Sistema.CargaDatos({
        Link:'/privado/Modelo/jsoReturnaTk.dbsp', 
        Parametros:retornaEsta
      });
      tkRetornado = JSON.parse(tkRetornado)
      tkRetornado = tkRetornado.jsonTk[0].TK
       
      $('.LINKFASE'+cont).each(function(){
        var $link=$(this);
        var href=$link.attr('href')+tkRetornado;   
        $link.attr('href',href);    
      });
    });  
  }

  /*******************************/
  SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonAvancesFases.dbsp',
    parametros:'TIPOFASE='+mostrarTipo+'&TIPORESULT='+tipo+'&IDMONEDA='+moneda+'&TIPOVARIANTE=1&VARIANTE='+mostrar,
    callback: vistaReporteCrea
  });
  /*******************************/


  var construyeGrafica = function(Op){
    SalesUp.Variables.jsonOp = Op;
    var tipoFiltro = 0;
    var TIPORESULT = 0;
    var TIPOTIEMPO = 0;
    var cabecera=[];
    var Ids=[];
    var tiempoCode='';
    var TitiloGrafica='';
    var TituloComplemento='';
    
    /*******************************/

    var fasesArr = [];
    var jBody = Op.jsonDatosBody;
    var jCabecera = Op.jsonDatosHead;
    var total = jCabecera[0].TOTAL;
    var nombreusr=[];



    for (var i = 0; i < jBody.length; i++) {
      nombreusr.push(jBody[i].NOMBRE);
    }

    var arrNombreFases = _.pluck(jCabecera,'CABECERA');


    var dataSeries = [];

    for (var i = 1; i <= total; i++) {
      var arrAux = {};
      var arrFase = _.pluck(jBody, 'FASE'+i);

      for(var x = 0; x<_.size(arrFase);x++){
        arrFase[x] = parseFloat(arrFase[x]);
      }

      arrAux.name = arrNombreFases[i-1];
      arrAux.data = arrFase;
      dataSeries.push(arrAux);
    }
   
    
    $('#grafica').highcharts({
      title:{text:'Avances '+TituloComplemento},
      credits:{enabled:false},
      exporting:{enabled:false},
      chart:{type: 'bar',backgroundColor:'rgba(255, 255, 255, 0.8)' },
      plotOptions:{series: {stacking: 'normal'}},
      yAxis: {min: 0,title: {text: TitiloGrafica}},
      xAxis:{categories:nombreusr},
      legend:{reversed: true},
      plotOptions: {series: {stacking: 'normal'}},
      series: dataSeries
      
    });

    if(tipoFiltro==0){
      TituloComplemento='prospectos';
    }
  
    if(tipoFiltro==1){ 
      TituloComplemento='oportunidades';
    }
    
    if(tipoFiltro==2){
      TituloComplemento='clientes';
    }
    /*******************************/
    /*******************************/
    if(TIPORESULT==0){
      TitiloGrafica='Cantidad';
    }
    if(TIPORESULT==1){  
      TitiloGrafica='Monto';
    }
    if(TIPORESULT==2){  
      if(TIPOTIEMPO==2){
        tiempoCode='d';
        TitiloGrafica='Tiempo (dìas)';
      }
      if(TIPOTIEMPO==3){
        tiempoCode='h';
        TitiloGrafica='Tiempo (horas)';
      }
      if(TIPOTIEMPO==4){
        tiempoCode='min';
        TitiloGrafica='Tiempo (Minutos)';
      }
      if(TIPOTIEMPO==1){
        tiempoCode='sem';
        TitiloGrafica='Tiempo (Semanas)';
      }
      if(TIPOTIEMPO==0){
        tiempoCode='m';
        TitiloGrafica='Tiempo (Meses)';
      }
    }
    /*******************************/
    // var templateGrafica = '<style>.highcharts-container{width: 99% !important;}</style>';
    // templateGrafica +='<div id="container" style="width: 100%; height: 500px; margin-bottom:10px;" ></div>';
    // templateGrafica +='<button id="button" style="float:right;margin-top: -1px;" val="0" class="Btn Btn-flat Btn-small"> <i class="fa fa-chevron-down"></i> Ocultar todos</button>';
  }

}





























