console.clear();

var estimacionVentas = function(filtro){
  var objFiltro = JSON.parse(filtro);
  
  var cargaGrafica = function(Op){
    
    var  categories= Op.jsonCategories;
    var series = Op.dataSeries;
    $('#graficaReporte').highcharts({
        chart: {
            type: 'column'
        },
        colors: ['#00FF00', '#F7FE2E','#DF0101' ],
        title: {
            text: 'Presupuesto de Ventas'
        },
        subtitle: {
            text: 'Probabilidad'
        },
        xAxis: {
            categories: categories,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Monto'
            }
        },
        tooltip: {
            formatter: function() {
              return ''+
                'Probabilidad ('+this.series.name+'), '+ SalesUp.Sistema.MonedaANumero(this.y);
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: series
    });
  }
  
  
  var datosEstimacionVentas = function(Op,err){ 
    
    var total = Op.jsonTotal[0].TOTAL;
    var tDatosExtra = Op.jsonTotal[0].CDATOS;
    var datos = Op.jsonDatos;
    var tmpBody = '';
    var ltBody = [];
    var jsonCategories = [];
    var jHeader = Op.jsonHeader;
    var tamanioH = _.size(jHeader);
    var tmpHead = '<tr>';
    if(tamanioH > 0){
      for(var je = 0; je<tamanioH; je++){
        var ja = jHeader[je];
        var arrGrafica = {};
        tmpHead += '<th class="tCen '+ja.CLASE+'">'+ja.TITULO+'</th>';
        if(ja.TITULO != '' && ja.TITULO != 'Total' && ja.TITULO != 'Probabilidad' && ja.TITULO != 'Ejecutivo' && ja.TITULO != 'Grupo/Departamento' && ja.TITULO != 'Linea producto' && ja.TITULO != 'Origen' && ja.TITULO != 'Pais' && ja.TITULO != 'Región' && ja.TITULO != 'Ciudad'){
          jsonCategories.push(ja.TITULO);
        }
      }
    }
    tmpHead += '</tr>';
    tmpBody = '<tr>';
      tmpBody += '<td class="tCen">{{hlpColorCerteza Color}}</td>';
      tmpBody += '<td class="tCen"><input type="hidden" id="{{contador}}" class="titulo" value="{{Titulo}}">{{Titulo}}</td>';
      tmpBody += '<td class="tCen vencido_{{contador}} sumaTotal" data-vencidos="{{Vencidos}}" data-dato="{{Vencidos}}"><a href="/privado/reporteEstimacionDetalle.dbsp?tkm='+objFiltro.moneda+'&tiporeporte='+objFiltro.periodicidad+'&tipovariante='+objFiltro.tipoVariante+'&variante='+objFiltro.laVariante+'&periodo=vencidas&parametros={{Parametros}}"><span class="pointer">{{hlp_Simbolo_Moneda Vencidos simbolo}}</span></a></td>';
      for(var x = 0; x < tDatosExtra; x++){
        tmpBody += '<td class="tCen datos{{contador}} sumaTotal" data-dato="{{Dato'+x+'}}"><a href="/privado/reporteEstimacionDetalle.dbsp?tkm='+objFiltro.moneda+'&tiporeporte='+objFiltro.periodicidad+'&tipovariante='+objFiltro.tipoVariante+'&variante='+objFiltro.laVariante+'&periodo='+x+'&parametros={{Parametros}}"><span class="pointer">{{hlp_Simbolo_Moneda Dato'+x+' simbolo}}</span></a></td>';
      }
      tmpBody += '<td class="tCen futuros_{{contador}} sumaTotal" data-dato="{{Futuros}}" data-futuros="{{Futuros}}"><a href="/privado/reporteEstimacionDetalle.dbsp?tkm='+objFiltro.moneda+'&tiporeporte='+objFiltro.periodicidad+'&tipovariante='+objFiltro.tipoVariante+'&variante='+objFiltro.laVariante+'&periodo=futuros&parametros={{Parametros}}"><span class="">{{hlp_Simbolo_Moneda Futuros simbolo}}</span></a></td>';
      tmpBody += '<td class="tCen sumaTotal" data-dato="{{Total}}"><a href="/privado/reporteEstimacionDetalle.dbsp?tkm='+objFiltro.moneda+'&tiporeporte='+objFiltro.periodicidad+'&tipovariante='+objFiltro.tipoVariante+'&variante='+objFiltro.laVariante+'&periodo=total&parametros={{Parametros}}"><span class="">{{hlp_Simbolo_Moneda Total simbolo}}</span></a></td>';
    tmpBody += '</tr>';
    
    var dataSeries = [];
    
    if(total > 0){
      for(var je = 0; je < total; je++){
        var ja = datos[je];
        var arrBody = {};
        arrBody.contador = je;
        arrBody.simbolo = ja.MonedaSimbolo;
        arrBody.Color = ja.Color;
        arrBody.Titulo = ja.Titulo;
        arrBody.Vencidos = ja.Vencidos;
        arrBody.Parametros = ja.Parametros;
        
        for(var x = 0; x < tDatosExtra; x++){
          var dato = 'Dato'+x;
          arrBody[dato] = ja[dato];
        }
        arrBody.Futuros = ja.Futuros;
        arrBody.Total = ja.Total
        ltBody.push(arrBody);
        
        var laSerie = {};
        laSerie.name = ja.Titulo;
        laSerie.data = [];
        dataSeries.push(laSerie);
      }
    }
    
   
    var jsonSeries = [];
    var arrSeries = {};
    
    
    for(var ls=0;ls<dataSeries.length;ls++){
      
      var arrVencidos = _.pluck(datos, 'Vencidos');
      dataSeries[ls].data.push(parseFloat(arrVencidos[ls]));
      for(var x = 0; x < tDatosExtra; x++){
        var arrDato = _.pluck(datos, 'Dato'+x);
        dataSeries[ls].data.push(parseFloat(arrDato[ls]));
               
      }
      
      var arrFutoros = _.pluck(datos, 'Futuros');
      dataSeries[ls].data.push(parseFloat(arrFutoros[ls]));
      
    }
    
    cargaGrafica({jsonCategories,dataSeries});
    
    SalesUp.Construye.ConstruyeTabla(tmpHead,tmpBody,ltBody,{Destino:'#DatosLoad',Id:'ReportTable',PagActual:SalesUp.Sistema.paginaActual(),NumRegistros:total});
  }

  SalesUp.Sistema.CargaDatosAsync({
    link:'/privado/Modelo/jsonReporteEstimacionData.dbsp',
    parametros:'filtros='+filtro,
    callback:datosEstimacionVentas
  });
}

var filtro = '{"tipoVariante":"0","laVariante":"09D4FECB-3CB7-4129-A255-E03BBCA2E728","moneda":"","periodicidad":"1"}';
estimacionVentas(filtro);

