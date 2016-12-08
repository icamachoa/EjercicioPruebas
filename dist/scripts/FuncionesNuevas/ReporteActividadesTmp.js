
SalesUp.Variables.pagInicio=1;

/*REPORTE Actividades*/
var iniciaReporteActividades = function(data){
  /*TABLA*/
  var clm1Name ='Ejecutivo';
  if(data.agrupar == 2){clm1Name = 'Grupo'}
  var muestraReporteActividades = function(Op,err){
     var tmpHead = '<tr class="par">';
     tmpHead += '<th style="width: 5px;">';
     tmpHead += '</th>';
     tmpHead += '<th style="width: 100px;">'+clm1Name+'</th>';
     tmpHead += '<th style="width: 20px;">Nuevos</th>';
     tmpHead += '<th style="width: 20px;">Asignados</th>';
     tmpHead += '<th style="width: 20px;">Descartados</th>';
     tmpHead += '<th style="width: 20px;">Oportunidades nuevas</th>';
     tmpHead += '<th style="width: 20px;">Oportunidades descartadas</th>';
     tmpHead += '<th style="width: 20px;">Ventas</th>';
     tmpHead += '<th style="width: 20px;">Seguimientos</th>';
     tmpHead += '<th style="width: 20px;">Seguimiento post-venta</th>';
     tmpHead += '</tr>';
     var tmpBody = '<tr>';
     tmpBody += '<td class="centrado"><b>{{num}}</b></td>';
     tmpBody += '<td class="centrado">{{Ejecutivo}}</td>';
     tmpBody += '<td class="centrado"><b>{{hlpEsCero Nuevos}}</b></td>';
     tmpBody += '<td class="centrado"><b>{{hlpEsCero Asignados}}</b></td>';
     tmpBody += '<td class="centrado"><b>{{hlpEsCero Descartados}}</b></td>';
     tmpBody += '<td class="centrado"><b>{{hlpEsCero OpNuevas}}</b></td>';
     tmpBody += '<td class="centrado"><b>{{hlpEsCero OpDescartadas}}</b></td>';
     tmpBody += '<td class="centrado"><b>{{hlpEsCero Ventas}}</b></td>';
     tmpBody += '<td class="centrado"><b>{{hlpEsCero Seguimiento}}</b></td>';
     tmpBody += '<td class="centrado"><b>{{hlpEsCero SeguimientoPV}}</b></td>';
     tmpBody += '</tr>';
    
    var totalRegistros = Op.jsonTotal[0].TOTALN;
    var fecha_ini = Op.jsonTotal[0].FECHA_DESDE.split(" ");
    var fecha_fin = Op.jsonTotal[0].FECHA_HASTA.split(" ");
    var jsonReporteActividades = Op.jsonDatos;
    var ltReporte = [];
    var totalNuevos=0,totalAsignados=0,totalDescartados=0,totalOpNuevas=0,totalOpDescartadas=0;
    var totalVentas=0,totalSeguimientos=0,totalSeguimientoPV=0;
    if(totalRegistros){
      for(var je=0;je <_.size(jsonReporteActividades);je++){
        var arrReporte = {};
        var ja = jsonReporteActividades[je];
        arrReporte.num = je+1;
        if(data.agrupar == 2){arrReporte.tk = ja.TK;}else{arrReporte.tk = ja.TKU;}
        if(data.agrupar == 2){arrReporte.Ejecutivo=ja.GRUPO}else{arrReporte.Ejecutivo = ja.EJECUTIVO;}
        arrReporte.Nuevos = ja.PROSPECTOS_CREADOS;
        arrReporte.Asignados = ja.PROSPECTOS_ASIGNADOS;
        arrReporte.Descartados = ja.PROSPECTOS_DESCARTADOS;
        arrReporte.OpNuevas = ja.OPORTUNIDADES_NUEVAS;
        arrReporte.OpDescartadas = ja.OPORTUNIDADES_PERDIDAS;
        arrReporte.Seguimiento = ja.SEGUIMIENTOS;
        arrReporte.Ventas = ja.VENTAS_NUEVAS;
        arrReporte.SeguimientoPV = ja.SEGUIMIENTOS_CLIENTES;
        totalNuevos = totalNuevos + ja.PROSPECTOS_CREADOS;
        totalAsignados = totalAsignados + ja.PROSPECTOS_ASIGNADOS;
        totalDescartados = totalDescartados + ja.PROSPECTOS_DESCARTADOS;
        totalOpNuevas = totalOpNuevas + ja.OPORTUNIDADES_NUEVAS;
        totalOpDescartadas = totalOpDescartadas + ja.OPORTUNIDADES_PERDIDAS;
        totalVentas = totalVentas + ja.VENTAS_NUEVAS;
        totalSeguimientos = totalSeguimientos + ja.SEGUIMIENTOS;
        totalSeguimientoPV = totalSeguimientoPV + ja.SEGUIMIENTOS_CLIENTES;
        ltReporte.push(arrReporte);
      }
    }
    
    var jsonGrafica = [];
    var arrGrafica = {};
    var arrSeries = {}
    arrGrafica.usuarios = _.pluck(ltReporte,'Ejecutivo');
    arrGrafica.series =[{
      name: 'Seguimientos post-venta',
      tk: _.pluck(ltReporte,'tk'),
      data: _.pluck(ltReporte,'SeguimientoPV')
    },{
      name: 'Seguimientos',
      tk: _.pluck(ltReporte,'tk'),
      data: _.pluck(ltReporte,'Seguimiento')
    },{
      name: 'Ventas',
      tk: _.pluck(ltReporte,'tk'),
      data: _.pluck(ltReporte,'Ventas')
    },{
      name: 'Oportunidades Descartadas',
      tk: _.pluck(ltReporte,'tk'),
      data: _.pluck(ltReporte,'OpDescartadas')
    },{
      name: 'Oportunidades Nuevas',
      tk: _.pluck(ltReporte,'tk'),
      data: _.pluck(ltReporte,'OpNuevas')
    },{
      name: 'Descartados',
      tk: _.pluck(ltReporte,'tk'),
      data: _.pluck(ltReporte,'Descartados')
    },{
      name: 'Asignados',
      tk: _.pluck(ltReporte,'tk'),
      data: _.pluck(ltReporte,'Asignados')
    },{
      name: 'Nuevos',
      tk: _.pluck(ltReporte,'tk'),
      data: _.pluck(ltReporte,'Nuevos')
    }];
    jsonGrafica.push(arrGrafica);
    SalesUp.Construye.ConstruyeTabla(tmpHead,tmpBody,ltReporte,{Destino:'#tablaDatos',Id:'ReportTable',PagActual:SalesUp.Sistema.paginaActual(),NumRegistros:totalRegistros});
    var tmpFoot = '';
    tmpFoot += '<tr>';
    tmpFoot += '<td></td>';
    tmpFoot += '<td class="centrado"><b>Total<b></td>';
    tmpFoot += '<td class="centrado"><b>'+totalNuevos+'</b></td>';
    tmpFoot += '<td class="centrado"><b>'+totalAsignados+'</b></td>';
    tmpFoot += '<td class="centrado"><b>'+totalDescartados+'</b></td>';
    tmpFoot += '<td class="centrado"><b>'+totalOpNuevas+'</b></td>';
    tmpFoot += '<td class="centrado"><b>'+totalOpDescartadas+'</b></td>';
    tmpFoot += '<td class="centrado"><b>'+totalVentas+'</b></td>';
    tmpFoot += '<td class="centrado"><b>'+totalSeguimientos+'</b></td>';
    tmpFoot += '<td class="centrado"><b>'+totalSeguimientoPV+'</b></td>';
    tmpFoot += '</tr>';
    $('#ReportTable').find('tbody').append(tmpFoot);
    var $exp = $('#btnexportar');
    creaGrafica({json:jsonGrafica,fecha_desde:data.fecha_desde,fecha_hasta:data.fecha_hasta,agrupar:data.agrupar,periodo:data.periodo});
    if($exp){$exp.removeAttr('style');}
    $('#DatosLoad').removeAttr('style');
    $('#btnAccionesReporte').removeAttr('style');
    var $esperando = $('#Esperando');
    if($esperando){
      $esperando.slideUp(500)
      $esperando.remove();
    }
    SalesUp.Sistema.Tipsy()
  }
  SalesUp.Sistema.CargaDatosAsync({
    link:'/privado/Modelo/jsonReporteActividades.dbsp',
    parametros:'ordenamiento='+data.ord+'&fecha_desde='+data.fecha_desde+'&fecha_hasta='+data.fecha_hasta+'&periodo='+data.periodo+'&grupo='+data.grupo+'&nivel='+data.nivel+'&agrupar='+data.agrupar,
    callback:muestraReporteActividades
  });
}

/*GRAFICA*/
var creaGrafica = function(Op){
  var datos = Op.json;
  $('#grafica').highcharts({
        chart: {
            type: 'bar',
            backgroundColor:'rgba(255, 255, 255, 0.8)'
        },
        title: {
            text: 'Reporte de actividades'
        },
        xAxis: {
            categories: datos[0].usuarios
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
                shared: false,
                formatter: function() {
                          return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + this.y + '<br/>' + 'Total: ' + this.point.stackTotal;
                }
            },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal',
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            var tipo=0;   
                            var url='';                         
                            if (this.series.name==='Nuevos'){tipo=1}
                            if (this.series.name==='Asignados'){tipo=2}
                            if (this.series.name==='Descartados'){tipo=3}
                            if (this.series.name==='Oportunidades Nuevas'){tipo=4}
                            if (this.series.name==='Oportunidades Descartadas'){tipo=5}
                            if (this.series.name==='Ventas'){tipo=6}
                            if (this.series.name==='Seguimientos'){tipo=7}
                            if (this.series.name==='Seguimientos post-venta'){tipo=8}
                            if (tipo>0){
                              location.href ="ReporteActividadesDetalle.dbsp?tk="+datos[0].series[0].tk[this.x]+"&fecha_desde="+Op.fecha_desde+"&fecha_hasta="+Op.fecha_hasta+"&tipo="+tipo+"&agrupar="+Op.agrupar+"&periodo="+Op.periodo+"&nombre="+datos[0].usuarios[this.x];
                            }
                        }
                    }
                }
            }
        },
         
        series: datos[0].series
    });
    
    var chart2 = $('#container').highcharts(); 
    var $button = $('#button');
    $button.click(function() {
        var tot=chart2.series.length     
        var valor=$('#button').attr('val');  
        for (var i=0; i< tot; i++) {
          var series = chart2.series[i];
            if (valor==0) {
                series.hide();
                $button.html('<i class="fa fa-chevron-up"></i> Mostrar todos');
                $('#button').attr('val',1);
            } else {
                series.show();
                $button.html('<i class="fa fa-chevron-down"></i> Ocultar todos');
                $('#button').attr('val',0);
            }
        }

    });
}

var cargaFiltro = function(f){
 
    var htmlFiltro ='';
    htmlFiltro += '<form name="frm_filtros" id="frm_filtros">';
    htmlFiltro += '<input name="idpantalla" type="hidden" value="<#IDPANTALLA/>">';
    htmlFiltro += '<input name="idusuariofiltro" id="idusuariofiltro" type="hidden" value="">';
    htmlFiltro += '<label for="agrupar:"></label>';
    htmlFiltro += '<select id="agruparPor" name="agruparPor">';
    htmlFiltro += '<option value="0" selected="selected">(.. Selecciona una opción ..)</option> ';   
    htmlFiltro += '<option value="1">Ejecutivos</option>';
    htmlFiltro += '<option value="2">Grupos</option>';
    htmlFiltro += '</select>';
    htmlFiltro += '<label for="nivel">Nivel:</label>';
    htmlFiltro += '<select id="nivel" name="nivel">';
    htmlFiltro += '<option value="0">(.. Selecciona una opción ..)</option>';
    htmlFiltro += ' <option value="1">Administrador</option>';
    htmlFiltro += '<option value="2">Genrente</option>';
    htmlFiltro += '<option value="3">Ejecutivos</option>';
    htmlFiltro += '</select>';
    htmlFiltro += '<label for="grupo">Grupo:</label>';
    htmlFiltro += '<select id="grupo" name="grupo">';
    htmlFiltro += '<option value="0">(.. Selecciona una opción ..)</option>';
    htmlFiltro += '<option value="1">Ventas B2b</option>';
    htmlFiltro += '<option value="2">Telemarketing</option>';
    htmlFiltro += '<option value="1029">Demo</option>';
    htmlFiltro += '<option value="1030">ASD</option>';
    htmlFiltro += '</select>';      
    htmlFiltro += '<label for="periodo">Período:</label>';
    htmlFiltro += '<select id="periodo" name="periodo">';
    htmlFiltro += '<option value="-1">(... Selecciona una opción...)</option>';
    htmlFiltro += '<option value="0">Especificar Periodo</option>';
    htmlFiltro += '<option value="8">Año actual</option>';
    htmlFiltro += '<option value="13">Semestre actual</option>';
    htmlFiltro += '<option value="15">Cuatrimestre actual</option>';
    htmlFiltro += '<option value="17">Trimestre actual</option>';
    htmlFiltro += '<option value="19">Bimestre actual</option>';
    htmlFiltro += '<option value="5">Mes actual</option>';
    htmlFiltro += '<option value="11">Quincena actual</option>';
    htmlFiltro += '<option value="3">Semana actual</option>';
    htmlFiltro += '<option value="10">Año pasado</option>';
    htmlFiltro += '<option value="14">Semestre pasado</option>';
    htmlFiltro += '<option value="16">Cuatrimestre pasado</option>';
    htmlFiltro += '<option value="18">Trimestre pasado</option>';
    htmlFiltro += '<option value="20">Bimestre pasado</option>';
    htmlFiltro += '<option value="6">Mes pasado</option>';
    htmlFiltro += '<option value="12">Quincena pasada</option>';
    htmlFiltro += '<option value="4">Semana pasada</option>';
    htmlFiltro += '</select>';
    htmlFiltro += '<div id="ContenedorDetalle"></div>';
    htmlFiltro += '<div id="ContenedorDetalle2"></div>';
    htmlFiltro += '<div id="periodoEspecifico" style="display:none;"><label for="fecha_desde" style="float:left" >Desde</label><input type="text" name="fecha_desde" id="fecha_desde" value="'+f.fecha_ini+'" class="fecha" readonly/>';
    htmlFiltro += '<label for="fecha_hasta" style="float:left" >Hasta</label><input type="text" name="fecha_hasta" id="fecha_hasta" value="'+f.fecha_fin+'" class="fecha" readonly/></div>';
    htmlFiltro += '<input class="Pointer" type="button" value="Buscar" onClick="CambiaFiltrosActividades()" style="margin-left: 10px;"/>';
    htmlFiltro += '</form>';
    
    $('#filtros').html(htmlFiltro);
    $('#periodo').change(function(){
      var periodo = '';
      $('#periodo option:selected').each(function(){
        periodo = $(this).val();
      });
      if(periodo == 0){
        $('#periodoEspecifico').removeAttr('style');
        $('#filtros').attr('style','width: 1370px');
      }else{
        $('#periodoEspecifico').attr('style','display:none');
        $('#filtros').removeAttr('style');
      }
    });
    $(function() {
      $( "#fecha_desde" ).datepicker({
        hangeYear: true,dateFormat: localStorage.SysFormatoFecha,startDate:'01/01/2000',dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'], dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'], monthNames:  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],  
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        defaultDate: "+1w",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
          onClose: function( selectedDate ) {
            $( "#fecha_hasta" ).datepicker( "option", "minDate", selectedDate );
          }
    });
    $( "#fecha_hasta" ).datepicker({
      hangeYear: true,dateFormat: localStorage.SysFormatoFecha,startDate:'01/01/2000',dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'], dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'], monthNames:  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],  
      monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      changeMonth: true,
      changeYear: true,
      numberOfMonths: 1,
        onClose: function( selectedDate ) {
          $( "#fecha_desde" ).datepicker( "option", "maxDate", selectedDate );
        }
      });
    });
}

var CambiaFiltrosActividades = function(){
  var periodo = $('#periodo').val();
  var grupo = $('#grupo').val();
  var nivel = $('#nivel').val();
  var agrupar = $('#agruparPor').val();
  var fecha_ini = $('#fecha_desde').val();
  var fecha_fin = $('#fecha_hasta').val();
  var Mensaje = 'Favor de especificar un período';
  if( periodo == -1){
    periodo = 5;  
  }
  var esperando = '<div id="Esperando" class="unMomento"><span id="boxEsperando"><i class="fa fa-spinner fa-spin"></i> <span>Un momento por favor...</span></span></div>';
  $('#tablaDatos').html(esperando);
  iniciaReporteActividades({ord:3,fecha_desde:fecha_ini,fecha_hasta:fecha_fin,periodo:periodo,grupo:grupo,nivel:nivel,agrupar:agrupar});
  $('#tablaDatos').remove('#Esperando');
}

$(document).ready(function(){
  var fecha = new Date(new Date().getFullYear(),new Date().getMonth()+1, 0);
  var fecha_ini = '';
  fecha_fin = '';
  if (localStorage.SysFormatoFecha=='mm/dd/yy') {
    fecha_ini = fecha.getMonth()+1+'/01/'+fecha.getFullYear();
    fecha_fin = fecha.getMonth()+1+'/'+fecha.getDate()+'/'+fecha.getFullYear();
  }else{
    fecha_ini = '01/'+fecha.getMonth()+1+'/'+fecha.getFullYear();
    fecha_fin = fecha.getDate()+'/'+ fecha.getMonth()+1+'/'+fecha.getFullYear();
  }
  setTimeout(function(){
    var esperando = '<div id="Esperando" class="unMomento"><span id="boxEsperando"><i class="fa fa-spinner fa-spin"></i> <span>Un momento por favor...</span></span></div>';
    $('#DatosLoad').attr('style','display:none');
    iniciaReporteActividades({ord:3,fecha_desde:'',fecha_hasta:'',periodo:5,grupo:0,nivel:0,agrupar:1});
    cargaFiltro({fecha_ini:'',fecha_fin:''});
    $('#contenedor').append(esperando);
  },500);
});

function iraPag(Ir){
  PagAct = Ir;
  var Cond = '';
  SalesUp.Sistema.paginaActual({pagAct:PagAct});
  ActivaPaginacion(Cond,Ir);
}

var ActivaPaginacion=function(Cond,Ir){
  SalesUp.Variables.pagInicio = (parseInt(Ir) * parseInt(50)) - 50 + 1;
  //iniciaReporteActividades({ord:3,fecha_desde:'',fecha_hasta:'',periodo:5,grupo:0,nivel:0,agrupar:1});
};
