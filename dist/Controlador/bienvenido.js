self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:550});
$(function(){
  obtenerInformacion();
});

var cargandoVideo = '<div class="cargandoVideo"><i class="fa fa-spinner fa-spin fa-lg"></i><b> Cargando video... </b></div>';

var obtenerInformacion=function(){
  var obtenerDatos=function(Op){
     var resp=(Op);
     var jd = resp.jsonDatos[0];
     var videos=jd.videos;
     var textos=jd.textos;
     CrearPaginacion({datos:videos});
     cargaDatosDerecha({datos:textos});
  }
  self.parent.SalesUp.Sistema.CargaDatosAsync({link:'https://control.salesup.com.mx/webservices/jsonBienvenido.dbsp', callback:obtenerDatos});
}

var CrearPaginacion=function(Op){
  var arrDatos=(Op.datos)?Op.datos: '';
  var html='';
  html+='<li id="Anterior" class="disabled"><span><span aria-hidden="true">&laquo;</span></span></li>'; 
  for (var i=0; i<=arrDatos.length-1; i++){
    var datos=arrDatos[i];
    var titulo=datos.titulo; 
    var url=datos.video;
    html+='<li data-posicion="'+(i+1)+'" class="pagina'+(i+1)+' Puntero opciones"><span id="pagina'+(i+1)+'" class="acciones" data-url="'+url+'" data-titulo="'+titulo+'" onclick="MostrarVideo({t:this, p:'+(i+1)+'})">'+(i+1)+'</span></li>';
  }
  html+='<li id="Siguiente" class="Puntero" onclick="verPaginaSiguiente();"><a href="#" aria-label="Next"> <span aria-hidden="true">&raquo;</span></a></li>';
  $('.pagination').html(html);
  var ifrm=cargandoVideo+'<iframe style="display:none;" onload="$(\'.cargandoVideo\').remove(); $(this).show();" width="600" height="340" src="'+arrDatos[0].video+'" frameborder="0" allowfullscreen=""></iframe>';
  $('#contenedorVideos').html(ifrm);
  $('#titulo').html(titulo);
  $('.pagina1').addClass('active');
}

var MostrarVideo=function(Op){
  var elemento=(Op.t)?Op.t:''; 
  var i=(Op.p)?Op.p:''; 
  var url=$(elemento).attr('data-url');
  var titulo=$(elemento).attr('data-titulo');
  $('#titulo').html(titulo);
  var html=cargandoVideo+'<iframe style="display:none;" onload="$(\'.cargandoVideo\').remove(); $(this).show();" width="600" height="340" src="'+url+'" frameborder="0" allowfullscreen=""></iframe>';
  $('.active').removeClass('active');
  $('#contenedorVideos').html(html); 
  $('.pagina'+i).addClass('active');
  desactivarBotonesAnteriorSiguiente();
}           
var verPaginaAnterior=function(){
  var paginaActual=$('.active').attr('data-posicion');
  var paginaAnterior=Number(paginaActual)-1; 
  console.info(paginaAnterior); 
  $('#pagina'+paginaAnterior).click();
}

var verPaginaSiguiente=function(Op){
  var paginaActual=$('.active').attr('data-posicion');
  var paginaAnterior=Number(paginaActual)+1; 
  $('#pagina'+paginaAnterior).click();
  if(paginaActual>=10){
    var Siguiente=Number(paginaActual)+1;
    var Anterior=Number(paginaActual)-9;
    console.info(Siguiente, Anterior);
    $('li[data-posicion='+Siguiente+']').removeClass('ocultar');
    $('li[data-posicion='+Anterior+']').addClass('ocultar');
  }
}
var desactivarBotonesAnteriorSiguiente=function(){
  var pagina=$('.active').attr('data-posicion');
  if(pagina==1){
    $('#Anterior').addClass('disabled');
    $('#Anterior').attr('onclick', '');
  }else if(pagina==10){
    $('#Siguiente').addClass('disabled');
    $('#Siguiente').attr('onclick', '');
  }else{
    $('#Anterior, #Siguiente').removeClass('disabled').addClass('Puntero');
     $('#Anterior').attr('onclick', 'verPaginaAnterior()');
     $('#Siguiente').attr('onclick', 'verPaginaSiguiente()');
  }
}

var cerrarBienvenida=function(){
  if ($("#CerrarBienvenido").is(':checked')){
    $.post("ocultar-bienvenida.dbsp?ban=1");
  }else{
    $.post("ocultar-bienvenida.dbsp?ban=0");
  }

}

var ocultarPaginacion=function(){
  $('.opciones').each(function(i){
  if(i>=10){
   $(this).addClass('ocultar');
  }
});
}

var cargaDatosDerecha=function(Op){
    var datos=(Op.datos)?Op.datos:'';
    //$('.general').html('');
    var html=''; 
    for(var i=0; i<=datos.length-1; i++){
      var data=datos[i];
      var titulo=data.titulo; 
      var descripcion=data.descripcion; 
      var boton=data.boton;
      var url=data.link;
      var icono=data.icono;
      html +='<div class="contenidoSeccion"><div class="section"><h3>'+titulo+'</h3><p>'+descripcion+'</p>';
      html +='<a class="btn btn-default" onclick="self.parent.SalesUp.Sistema.AbrirLinkExterno({Pagina:\''+url+'\'});"  role="button">';
      html +='<i class="fa '+icono+'"></i> '+boton+'</a></div></div></div>'; 
      $('.general').html(html); 
    }

}
