var exporta = function(){
  var generando = '<i class="fa fa-spinner fa-spin"></i> Generando exportación';
  var generado = '<i class="fa fa-clipboard"></i> Exportar';
  var tituloExportacion, preparaExportacion, jsonExportacionTotal, parametrosExportacionTotal;

  this.btnExportar = function(Op){
    var puedeExportar                            = SalesUp.Sistema.Almacenamiento({a:'SysPuedeExportar'});
    if (puedeExportar!=1){return;}
    var tRegistros                               = 50, funcion = '', tituloExportacion = 'Exportación';

    var btnExp                                   = '', 
      $destino = (Op.destino) ? Op.destino : $('#contenedor'), 
      $dentro = (Op.dentro) ? $(Op.dentro) : null;

    (Op.exportacionTotal) ? jsonExportacionTotal = Op.exportacionTotal : jsonExportacionTotal = null;
    (Op.preparaExportacion) ? preparaExportacion = Op.preparaExportacion : preparaExportacion = null;
    (Op.parametros) ? parametrosExportacionTotal = Op.parametros : parametrosExportacionTotal = null;
    (Op.titulo) ? tituloExportacion              = Op.titulo : tituloExportacion = 'Exportación';
    SalesUp.Variables.tituloExportacion          = tituloExportacion;
    btnExp  = '<span onmouseenter="SalesUp.exporta.tipoExportacion(this);" class="Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar btnNeutral" id="btnExportar">';
      btnExp += '<i class="fa fa-clipboard"></i> Exportar';
    btnExp += '</span>';

    if(!$dentro){
      btnExp = '<div id="btnAccionesReporte" class="BoxBotones w100">'+btnExp+'</div">';
    }

    $('#btnAccionesReporte').remove();

    if($dentro){
      $dentro.append(btnExp);
    }else{
      $destino.append(btnExp);
    }
  }/*btnExportar*/

  this.tituloRep = function(){ return SalesUp.Variables.tituloExportacion; }
  
  this.tipoExportacion = function(t){

    var t = t, chart = $('#graficaReporte').highcharts();
    
    var htmlAcciones = '';
        (chart) ? htmlAcciones+= '<span onclick="SalesUp.exporta.exportarGrafica();" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-line-chart"></i>Exportar gráfica</span>' : '';

        htmlAcciones+= '<span onclick="SalesUp.exporta.activaExportacionPantalla();" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-table"></i>Exportar tabla</span>';

        (jsonExportacionTotal) ? htmlAcciones+= '<span onclick="SalesUp.exporta.exportaCsv();" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-file-excel-o"></i>Exportar CSV</span>' : '';
        
    SalesUp.Construye.popOver({Elemento:t, /*Titulo:'Exportar...',*/ PopOverLugar:'top', Contenido:htmlAcciones, Clases:'PopOverAcciones'});
  }

  this.exportarGrafica = function(){
    var tituloReporte = SalesUp.Variables.tituloExportacion;
    var chart = $('#graficaReporte').highcharts();
    chart.exportChart({
      type:'application/pdf', filename:tituloReporte
    });
  }

  var insertaParaExportar = function(){
    var titulo = SalesUp.Variables.tituloExportacion;
    var t = titulo.replace(/ /g,"_");
    var html='';
        html = '<form id="FrmExportaPantalla" action="/privado/exporta_pantalla.asp" method="post">';
        html += '<input type="hidden" name="TituloReporte" id="TituloReporte" value="'+titulo+'"/>';
        html += '<input type="hidden" name="NombreReporte" id="NombreReporte" value="'+t+'"/>';
        for(var n =0; n<=30;n++){ html += '<input type="hidden" name="input_'+n+'" id="input_'+n+'" />'; }
    html += '</form>';
    html += '<div id="ContGeneraReporte" style="display:none">';
    html += '</div>';
    $('#FrmExportaPantalla, #ContGeneraReporte').remove();
    $('body').append(html);
  }/*insertaParaExportar*/

  var preparandoExportacion = function(){
    var $ContGeneraReporte = $('#ContGeneraReporte');
    $ContGeneraReporte.find('.thickbox').removeClass('thickbox');
    $ContGeneraReporte.find('img').remove('img');
    $ContGeneraReporte.find('a').removeAttr('href');
    $ContGeneraReporte.find('input').remove();
    $ContGeneraReporte.find('.MenuContextual').remove();
    $ContGeneraReporte.find('.SoloIcono').remove();
    $ContGeneraReporte.find('.tip').each(function(){ $(this).html($(this).attr('original-title')); });
    $ContGeneraReporte.find('table thead tr').css('background-color','#2D2D2D').css('color','#FFFFFF');
    $ContGeneraReporte.find('table tbody tr:even').css('background-color','#E6E6E6');
    if (_.size($('table#tablaProductos')) > 0) {
      $ContGeneraReporte.find('tr > td.accionesMultiples').remove();
      $ContGeneraReporte.find('.accionesMultiples').remove();
    }
  }/*preparandoExportacion*/

  this.activaExportacionPantalla = function(){
    insertaParaExportar();
    var datExp = $('.simple').eq(0).clone();
    var $ContGeneraReporte = $('#ContGeneraReporte');
    var DatosReporte = $ContGeneraReporte.append(datExp.html());
    $ContGeneraReporte.html(DatosReporte.html().replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, ""));
    preparandoExportacion();
    var Datos = $ContGeneraReporte.html();
    var nDatos = Datos.length;
    var total = parseInt(nDatos / 30);
    var n, val,inicia,fin;  
    for(n=0; n<=30;n++){
      inicia = n * total;
      fin = (n+1) * total;
      val = Datos.substring(inicia, fin);
      $('#input_'+n).val(val);
    }
    $('#FrmExportaPantalla').submit();
    var $btnExportar = $('#btnExportar');
    $btnExportar.html(generando);
    setTimeout(function(){ $btnExportar.html(generado); }, 2000);
  }/*activaExportacionPantalla*/

  var jsonToCsv = function(obj) {
    var titulo = SalesUp.Variables.tituloExportacion;
    var CSV = Papa.unparse(obj);
    var fileName = titulo.trim();
        fileName = fileName.replace(/ /g,"_");   

    var link = document.createElement('a');
    var blob = new Blob([CSV], {'type':'application\/octet-stream'});
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName + ".csv";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    var $btnExportar = $('#btnExportar');
    $btnExportar.html(generado); 
  }/*jsonToCsv*/

  this.exportaCsv = function(){
    var $btnExportar = $('#btnExportar');
        $btnExportar.html(generando);
    
    var preparacion = function(Op,err){
      if(err){
        SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-times"></i> Ha habiado un error en la exportación, intentalo nuevamente.'});
        $btnExportar.html(generado); 
        return;
      } 
      var jsonCsv = Op;
      if(preparaExportacion){
        jsonCsv = preparaExportacion(jsonCsv);
      }
      jsonToCsv(jsonCsv);
    }
    SalesUp.Sistema.CargaDatosAsync({
      link          :jsonExportacionTotal,
      parametros    :parametrosExportacionTotal,
      callback      :preparacion
    });
  }/*exportaCsv*/
}/*exporta*/

if(window.exporta){
  SalesUp.exporta = new exporta();
}

