
var test = {};

test.respuestasTest = [];
test.listaPruebas;
test.testActual = 0;
test.tipoPrueba = 0;
test.avance = 0;
test.newWindow;

test.guardaRespuesta = function(arr,next,w){
  if(test.tipoPrueba == 1){

    var $progreso = $('#progreso > div');
    var $select = $('#selectTest select')
    var link = $select.find('option').eq(test.testActual).attr('value');
    var nombre = $select.find('option').eq(test.testActual).text();

    arr = arr.map(function(v){
      v.link = link;
      v.nombre = nombre;
      return v;
    });

    test.respuestasTest = _.union(test.respuestasTest, arr);

    test.avance = (test.testActual * 100)/test.listaPruebas.length;

    $progreso.attr('style','min-width: '+test.avance+'em;');
    $progreso.text(test.avance.toFixed(2)+'%');
    //test.procesaTest();
    if(next){
      test.siguienteTestNuevo(w);
    }    
  }
} 

test.siguienteTest = function(){
  var opcion = test.testActual+1, valor,tam;

  var $select = $('#selectTest select')
  var nombreTest = $select.find('option').eq(opcion).text();
  $('#Test > span').append('<i class="fa fa-spinner fa-spin" style="font-size: 17px;"></i>');
  $('#Test > span').text('Se esta ejecutando el test '+nombreTest);

  valor = $('#selectTest select').find('option').eq(opcion).attr('value');

  if(valor){
    $('#selectTest select').val(valor);
    test.ejecutaTest();
  }else{
    test.procesaTest();
  }
  test.testActual = opcion;
}


test.ejecutaTest = function(){
  cargaTest();
}

test.procesaTest = function(){
  var respuesta = _.sortBy(test.respuestasTest,function(estado){
    return estado.result.status;
  });
  var nombreFichero = [];
  respuesta = _.groupBy(respuesta, function(resp){
    nombreFichero.push(resp.nombre);
      return resp.nombre;
    });
    nombreFichero = _.uniq(nombreFichero);
      var html = '',tam = nombreFichero.length, barraHtml = '';
      var prMal = 0,exMal = 0,totalExpecs = 0, prBien = 0;
      html = '<div>';
        html += '<table class="table table-striped">';
          html += '<tHead>';
            html += '<tr><td class="text-left"><strong>Test</strong></td></tr>';
          html += '</tHead>';
          for (var i = 0; i < tam; i++) {
            var resultado = respuesta[nombreFichero[i]];
            var correcto = true;
              html += '<tBody><tr>';
                html += '<td><span style="cursor:pointer" onclick="mostrarDetalle(this);"><strong>'+nombreFichero[i]+'</strong></span>';
                for(var j = 0; j < resultado.length; j++){
                    var datos = resultado[j].result;
                    var estado = datos.status;
                    if (estado == "passed") {
                      prBien++;
                    }else{
                      prMal++;
                    }
                    var nFallo = datos.failedExpectations.length;
                    var nPaso = datos.passedExpectations.length;
                    exMal += nFallo;
                    totalExpecs += nFallo + nPaso;
                  if(datos.status == 'failed'){correcto = false};
                }
              if (!correcto){
                html += '<i style="color:red; float:right !important; margin-right:40px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>';
                html += '<table id="tablaDetalle" class="table table-bordered" style="display:none;"><tBody>';
                  for(var j = 0; j < resultado.length; j++){
                    var datos = resultado[j].result;
                    var link = resultado[j].link;
                    var idSpec = resultado[j].id;
                    var nombre = datos.description;
                    var estado = datos.status;
                      html += '<tr>';
                      html += '<td>'+nombre+'</td>';
                      if (estado == "passed"){
                        html += '<td class="col-md-1 text-center"><i class="fa fa-check-circle-o fa-md" aria-hidden="true" style="color:green;"></i></td>';
                      }else{
                        var detalle = datos.failedExpectations;
                        html += '<td class="col-md-1 text-center"><span style="cursor:pointer" onclick="detalleError({nombre:\''+nombre+'\',link:\''+link+'\',idSpec:\''+idSpec+'\'});" ><i class="fa fa-times-circle-o fa-md" aria-hidden="true" style="color:red;"></span></i></td>';
                      }
                    html += '</tr>';
                  }
                  html += '<tBody></table></td>';
              }else{
                html += '<i style="color:green; float:right !important; margin-right:40px;" class="fa fa-thumbs-up" aria-hidden="true"></i>';
              }
            html += '</tr></tBody>';
          };
        html += '</table>';
      html+= '</div>';
      var nPruebas = test.respuestasTest.length;
      var porcentajeBien = (prBien * 100)/nPruebas;
      porcentajeBien = porcentajeBien.toFixed(2);
      var porcentajeMal = (prMal * 100)/nPruebas;
      porcentajeMal = porcentajeMal.toFixed(2);
      barraHtml += '<div class="progress">';
        barraHtml += '<div class="progress-bar progress-bar-success" style="width:'+porcentajeBien+'%">';
          barraHtml += '<span class="sr-only">'+porcentajeBien+'% Complete (success)</span>'+porcentajeBien+'% correctos';
        barraHtml += '</div>';
        barraHtml += '<div class="progress-bar progress-bar-danger" style="width:'+porcentajeMal+'%">';
          barraHtml += '<span class="sr-only">'+porcentajeMal+'% Complete (success)</span>'+porcentajeMal+'% no pasaron';
        barraHtml += '</div>';
      barraHtml += '</div>';
      var totalHtml = '<div>';
        totalHtml += '<span> Se ejecutaron '+nPruebas+' pruebas y '+totalExpecs+', de las cuales fallaron '+prMal+' pruebas y '+exMal+' expectativas ('+porcentajeMal+'%)</span>';
      totalHtml += '</div>';

      $('#progreso').html(barraHtml);
      $('#totales').append(totalHtml);
      $('#Test').html(html);
      $('#probarTodos').removeAttr('disabled').attr('onClick','test.showTime()');
      $('#probar').removeAttr('disabled').attr('onClick','cargaUnTest();');
      $('#Reestablecer').removeAttr('disabled')
      $('#listaTesting').removeAttr('disabled');
      test.testActual=0;
      test.avance=0;
}

test.showTime = function(){
  test.respuestasTest = [];
  $('#boxPruebas').attr("style","display:none;");
  $('#probarTodos').removeAttr('onClick').attr('disabled','disabled');
  $('#probar').removeAttr('onClick').attr('disabled','disabled');
  $('#listaTesting').attr('disabled','disabled');
  $('#informacionReportes').html('');
  $('#Reestablecer').attr('disabled','disabled');
  $('#totales').html('');

  var html = '';
  html = '<div id = "informacionReportes" class="row" style="margin-top: 25px;" ><div class="progress">'
    html +='<div id="progreso" >';
    html += '<div class="progress-bar" role = "progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" ';
    html += 'style="min-width: 1em; width:'+test.avance+'">';
    html += ''+test.avance+'%';
    html += '</div></div></div>';
    html += '<div id="Test" class="col-md-12">';
      html += '<span></span>';
    html += '</div>';
  html += '</div>';

  $('#body').append(html);
  test.tipoPrueba = 1;
  test.siguienteTestNuevo();
}

test.openWindow = function(url){
  test.newWindow = window.open(url,'popup','width=800,height=300,scrollbars=no');

  /*var before = test.newWindow.onbeforeunload;
  if(!before){
    test.newWindow.onbeforeunload = function(){
      console.warn('openbefore', url,  test.newWindow);
      test.siguienteTestNuevo();
    }
  }*/
}


test.siguienteTestNuevo = function(w){
  var opcion = test.testActual+1, valor,tam;
  var $select = $('#selectTest select')
  var nombreTest = $select.find('option').eq(opcion).text();
  $('#Test > span').append('<i class="fa fa-spinner fa-spin" style="font-size: 17px;"></i>');
  $('#Test > span').text('Se esta ejecutando el test '+nombreTest);

  valor = $('#selectTest select').find('option').eq(opcion).attr('value');
  if(valor){
    $('#selectTest select').val(valor);
    if (w) {w.close();}
    
    setTimeout(function(){
      test.openWindow(valor);
    }, 1000);
  }else{
    if (w) {w.close();}
    test.procesaTest();
  }
  test.testActual = opcion;
}

var testing = function(){
  var listaTesting = function(Op){
    var datos = Op;
    test.listaPruebas = Op.jsonDatos;
    var template = '';
    template += '<div class="col-md-8"><select class="form-control"  id="listaTesting" >';
      template += '<option value="0">seleccionar...</option>';
      template += '{{#each jsonDatos}}<option value="{{URLTEST}}">{{NOMBRETEST}}</option>{{/each}}';
    template += '</select></div>';
    template += '<div class="col-md-2"><button id="Reestablecer" type="button" class="btn btn-primary" onClick="Reestablecer();">Reestablecer Datos</button></div>';
    template += '<div class="col-md-1"><button id="probar" type="button" class="btn btn-primary" onClick="cargaUnTest();">Probar</button></div>';
    template += '<div class="col-md-1"><button id="probarTodos" type="button" class="btn btn-primary" onClick="test.showTime();">Probar todos</button></div>';
    var html = SalesUp.Construye.ReemplazaDatos({Template:template,Datos:datos});
    $('#selectTest').html(html);
  }

  SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonTest.dbsp',callback:listaTesting});
}

var cargaUnTest = function(){
  $('#boxPruebas').removeAttr("style");
  $('#totales').html('');
  $('#informacionReportes').html('');
  test.respuestasTest = [];
  test.tipoPrueba = 0;
  test.testActual = 0;
  cargaTest();
}

var Reestablecer = function(){
  $('#boxPruebas').attr("style","display:none;");
  $('#Reestablecer').removeAttr('onClick').attr('disabled','disabled').html(SalesUp.Sistema.unMomento());
  $('#probarTodos').removeAttr('onClick').attr('disabled','disabled');
  $('#probar').removeAttr('onClick').attr('disabled','disabled');
  $('#listaTesting').attr('disabled','disabled');

  SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/tests/procedimientoDummy.dbsp',callback:RespuestaReestablecimiento});
}

var RespuestaReestablecimiento = function(Obj,err){
  $('#boxPruebas').attr("style","display:block;");
  $('#Reestablecer').html('Reestablecer Datos');
  $('#probarTodos').removeAttr('disabled').attr('onclick','test.showTime();');
  $('#probar').removeAttr('disabled').attr('onclick','cargaUnTest();');
  $('#listaTesting').removeAttr('disabled');
  if (Obj.RESPUESTA == "SUCCESS") {
    $('#body').prepend('<div class="alert alert-info fade in"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>    <strong>Info!</strong> Datos reestablecidos </div>');
    setTimeout(function(){$('.alert').fadeOut( "slow", function() {$('.alert').remove()});},3000);
  }else{
    $('#body').prepend('<div class="alert alert-danger fade in"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>    <strong>Atención!</strong> Algunos testcases podrian no funcionar </div>');
    $('#body').prepend('<div class="alert alert-danger fade in"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>    <strong>Atención!</strong> No se reestablecieron los datos, verifique usuario logueado </div>');
    
setTimeout(function(){$('.alert').fadeOut( "slow", function() {$('.alert').remove()});},3000);
  }
}

var cargaTest = function(){
  var url = $('#selectTest select').val();
  var templateFrame = '';
  templateFrame += '<iframe id="cuadroTest" class="col-md-12" src="'+url+'" style="height:800px; border-width: 0px;"></iframe>';
  $('#cuadroTest').remove();
  if(url != '0'){
    $('#boxPruebas').html(templateFrame);
  }
}

var mostrarDetalle = function(t){
  var $t = $(t);
  var $td = $t.closest('td');
  var $tabla = $td.find('table');
  $tabla.attr('style','display');
  $t.attr('onclick','ocultarDetalle(this)');
}

var ocultarDetalle = function(t){
  var $t = $(t);
  var $td = $t.closest('td');
  var $tabla = $td.find('table')
  $tabla.attr('style','display:none;');
  $t.attr('onclick','mostrarDetalle(this)');
}

var detalleError = function(op){
  var link = op.link;
  var id = op.idSpec;
  var nombre = op.nombre;
  var arrErrores = test.respuestasTest;
  var arrError = _.where(arrErrores,{link:link});
  var elError  = _.where(arrError,{id:id})[0];
  var result = elError.result.failedExpectations;
  $('.modal-title').text(nombre);
  var jsonDatos = preparaJsonModal(result);
  var template = generaTemplateModal();
  var htmlModal = SalesUp.Construye.ReemplazaDatos({Template:template,Datos:{data:jsonDatos}});
  $('.modal-body').html(htmlModal);
  var $modal = $('#modal');
  $modal.modal('show');

}

var generaTemplateModal = function(){
  var html = '';
  html += '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
    html += '{{#each data}}';
      html += '<div class="panel panel-default">';
    html += '<div class="panel-heading" role="tab" id="headingTwo">';
      html += '<h4 class="panel-title">';
        html += '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse{{@index}}" aria-expanded="false" aria-controls="collapseTwo">';
          html += '{{mensaje}}';
        html += '</a>';
      html += '</h4>';
    html += '</div>';
    html += '<div id="collapse{{@index}}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">';
      html += '<div class="panel-body">';
        html += '{{stack}}';
      html += '</div>';
    html += '</div>';
  html += '</div>';
      
    html += '{{/each}}';
  html += '</div>';
  
  return html;
}

var preparaJsonModal = function(json) {
  var data = [];
  var arr = {};
  var tamanio = json.length;
  for(var i = 0; i < tamanio; i++){
    arr.mensaje = json[i].message;
    arr.stack = json[i].stack;
    data.push(arr);
  }
  return data;
}


$(document).ready(function(){
  testing();
});
