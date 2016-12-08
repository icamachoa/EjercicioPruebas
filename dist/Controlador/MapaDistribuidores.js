var control = SalesUp.Sistema.queControl();

SalesUp.Variables.TmpLtDistribuidores = $('#LtDistribuidores').html();
$('#LtDistribuidores').html('');

SalesUp.Variables.TemplateInfoMapa = '';
SalesUp.Variables.TemplateInfoMapa += '<div class="BoxInfoMap">';
SalesUp.Variables.TemplateInfoMapa += ' <h3><i class="fa fa-user fa-lg"></i> {{Nombre}}</h3>';
SalesUp.Variables.TemplateInfoMapa += ' <div>';
SalesUp.Variables.TemplateInfoMapa += '   <p><i class="fa fa-road fa-lg"></i> {{Calle}}, {{Colonia}}</p>';
SalesUp.Variables.TemplateInfoMapa += '   <p><i class="fa fa-map-marker fa-lg"></i> {{Municipio}}{{#if Estado}}, {{Estado}}{{/if}}{{#if Pais}}, {{Pais}}{{/if}}</p>';
SalesUp.Variables.TemplateInfoMapa += '   {{#if Telefonos}}<p><i class="fa fa-phone-square fa-lg"></i> {{Telefonos}}</span></p>{{/if}}';
SalesUp.Variables.TemplateInfoMapa += ' </div>';
SalesUp.Variables.TemplateInfoMapa += '</div>';



SalesUp.Variables.AjustarTamanioMapa = function(){
  var p =  $('#contenedor').position();
  var h = $(window).height();
  var pie = $('#pie').outerHeight();
  var c = h - p.top - pie - 30 ;
  var ch1 = $('#contenedor > h1').outerHeight();
  var nh = c - ch1 - 40;
  $('#contenedor').css('height',c).css('min-height','auto');
  $('#map_canvas').css('height',nh);
  $('#LtDistribuidores').css('height',nh-57);
}

$(window).resize(function(){
  SalesUp.Variables.AjustarTamanioMapa();
});

SalesUp.Variables.ListaDistribuidores = function(){
  SalesUp.Variables.AjustarTamanioMapa();



  if(!device.desktop()){
    $('#BotonCopiar').remove();
    $('#LtDistribuidores').css('height','450px');
  }

  var jsonDistribuidores = SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/obtieneInfoDistribuidores.dbsp', Parametros:'tke='+SalesUp.Variables.sTke, DataType:'json'});
  if(jsonDistribuidores.error!='0'){return false;}
  jsonDistribuidores = jsonDistribuidores.datos;
  SalesUp.Variables.jsonDistribuidores = jsonDistribuidores;
  jsonDistribuidores.LtDistribuidores = jsonDistribuidores;
  
  var htmlLista = SalesUp.Construye.ReemplazaDatos({Template:SalesUp.Variables.TmpLtDistribuidores ,Datos:jsonDistribuidores});
  $('#LtDistribuidores').show().html(htmlLista);
}

var locationArray = new Array();
var datos = new Array();
var arregloMarcas = new Array();
var map = '';
var infowindow = '';

SalesUp.Variables.IniciaMapa = function(){
  var info = SalesUp.Variables.jsonDistribuidores;

  for(var xx = 0; xx<= info.length-1; xx++ ){
    var Lat =  info[xx].LATITUD;
    var Long = info[xx].LONGITUD;
    var Nombre = info[xx].COMPANIA;
    var cord = new google.maps.LatLng(Lat,Long);
    
    locationArray.push(cord);
    
    datos.push({
      Nombre:info[xx].COMPANIA,
      Calle:info[xx].CALLE, Colonia:info[xx].COLONIA, Municipio:info[xx].MUNICIPIO,
      Ciudad:info[xx].CIUDAD, Estado:info[xx].ESTADO, Pais:info[xx].PAIS, Telefonos:info[xx].TELEFONOS
    });
  }
  ConstruyeMapa(locationArray,datos);
}

SalesUp.Variables.ListaDistribuidores();
SalesUp.Variables.IniciaMapa();

function ConstruyeMapa(locationArray,datos) {
  arregloMarcas=[];
  var geocoder;
  var direccion;
  
  geocoder = new google.maps.Geocoder();

  var mapOptions = {
    center:new google.maps.LatLng(21.166564, -86.857237),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);

  var bounds = new google.maps.LatLngBounds();
  var marker = '';
  var i = '';

  infowindow = new google.maps.InfoWindow({});
  
  var idusuarioant = '';
  var arrayAux = new Array();
  var arrayColoresUsuarios = new Array();
  var cont = 0;
  var colAleatorio = '';
  
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: locationArray, dissipating:true
  });

  heatmap.setMap(map);

  for (i = 0; i < datos.length; i++){          
    cont++;

    idusuarioant = datos[i].idusuario;
    marker = new google.maps.Marker({ position: locationArray[i], map:map, icon: '/estilos/ImgFondos/Map-Marker.png' });
    var lugar = i+1;
    arregloMarcas.push(marker);
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      var contentString = SalesUp.Construye.ReemplazaDatos({Template:SalesUp.Variables.TemplateInfoMapa, Datos:datos[i]});
      return function(){
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
      }
    })(marker, i));

    bounds.extend(locationArray[i]);
  }/*fin for*/

  if(locationArray.length!=0){
    map.fitBounds(bounds);
  }else{
    var listener = google.maps.event.addListener(map,"idle",function(){
      map.setZoom(4);
      google.maps.event.removeListener(listener);
    });
  }

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(new FullScreenControl(map));
}/*fin ConstruyeMapa*/


SalesUp.Variables.VerDireccionMap = function(Op){
  var marca = Op.marca;
  marca = parseInt(marca);
  var posicion = arregloMarcas[marca];
  map.setZoom(16);
  map.setCenter(posicion.getPosition());
  
  var contentString = SalesUp.Construye.ReemplazaDatos({Template:SalesUp.Variables.TemplateInfoMapa, Datos:datos[marca]});

  infowindow.setContent(contentString);
  infowindow.open(map, arregloMarcas[marca]);
}


SalesUp.Variables.checkCopiar = function(Op){
  var t = Op.t
  SalesUp.Sistema.activaCheck({t:t});
  var arrCheckUbicacion = $('.CheckUbicacion');
  textoCopiar = '';
  for (var i = 0; i <= arrCheckUbicacion.length - 1; i++){
    var $CheckUbicacion = $(arrCheckUbicacion[i]);
    if($CheckUbicacion.is(':checked')){
      var index = $CheckUbicacion.attr('data-index');
      var $Info = $('#info-'+index);
      var Lat  = $Info.attr('lat').trim();
      var Long = $Info.attr('long').trim();
      var Nombre = $Info.find('.NombreDistribuidor').text();
      var Direccion = $Info.find('.DireccionDistribuidor').text();
      var Lugar = $Info.find('.LugarDistribuidor').text();
      var Telefono = $Info.find('.TelefonoDistribuidor').text();
      textoCopiar += '* '+$.trim(Nombre)+'\n';
      (Telefono) ? textoCopiar += '  Tel. '+$.trim(Telefono)+'\n' : '';
      textoCopiar += '  '+$.trim(Direccion)+'\n';
      textoCopiar += '  '+$.trim(Lugar)+'\n';
      textoCopiar += '  '+$.trim('https://www.google.com/maps?q='+Lat+','+Long+'')+'\n\n';
    }
  }
  $('#areaCopiar').html(textoCopiar);
}

var client = new ZeroClipboard( $('#BotonCopiar') );

client.on( 'ready', function(event){
  client.on( 'copy', function(event){
    var textCopiar = $('#areaCopiar').html();
    event.clipboardData.setData('text/plain', textCopiar);
  });

  client.on( 'aftercopy', function(event){
    $('#BotonCopiar').html('<i class="fa fa-lg fa-check"></i> Copiado');
    setTimeout(function(){$('#BotonCopiar').html('<i class="fa fa-lg fa-copy"></i> Copiar');}, 1000);
  });
});

client.on( 'error', function(event){
  ZeroClipboard.destroy();
});

SalesUp.Variables.AmpliarMapaFiltro = function(buscar){
  var $li = $('#LtDistribuidores li:visible').eq(0);
  var $w90 = $li.find('.w90');
  var verMapa = $w90.attr('onclick');
  if(buscar==''){
    SalesUp.Variables.IniciaMapa();
  }else{
    eval(verMapa);  
  }
}

$(function(){
  $('#BuscarDistribuidor').keyup(function(e){
    var code = e.keyCode || e.which;
    if (code == '9') return;
    if (code == '27') $(this).val(null);
    var $rows = $('#LtDistribuidores').find('li');
    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
    $rows.show().filter(function(){
      var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
      return !~text.indexOf(val);
    }).hide();

    var buscar = $(this).val();
    var $this = $('#BuscarDistribuidor');
    clearTimeout($.data($this, 'EsperaMapa'));
    
    var Espera = setTimeout(function(){ SalesUp.Variables.AmpliarMapaFiltro(buscar); }, 1800);
    $($this).data('EsperaMapa', Espera);

    if(code==13){ clearTimeout($.data($this, 'EsperaMapa')); SalesUp.Variables.AmpliarMapaFiltro(buscar); }

  });
});

