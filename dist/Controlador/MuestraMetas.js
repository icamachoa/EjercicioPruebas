tamPantalla=0;


function MisMetas() {
  ganadas = false;
  perdidas=false;
  idmetas='';
  idmetasNo=''; 
  cadusuariosalertas='';
  cadusuariosalertasNo='';
  numMetas=0;
  numMetasNo=0;
  var htmlTab=FiltrosTabs();
  var Funcion = 'SalesUp.Variables.Elimina';
    SalesUp.Construye.MuestraAlerta( {
      TipoAlerta:'AlertaPregunta',
                Alerta:htmlTab,
                Boton2:'Cerrar', Id:'modalMisMetas',
                Callback2: Funcion,
                Icono2:'<i class="fa fa-times"></i>',
                Ancho:'664px',
                Alto: '291px'
    }
    );

  SalesUp.Variables.Elimina=function(){
       //Elimina usuarios-alertas
      $("#NvistasMetas").html("");
      $("#NvistasMetasNo").html("");
      if((ganadas) || (perdidas)){
      SalesUp.Sistema.CargaDatos( { Link:'Modelo/jsonEliminaAlertasMetas.dbsp', Parametros:'IDUSARIOALERTA='+cadusuariosalertas});
      SalesUp.Sistema.CargaDatos( { Link:'Modelo/jsonEliminaAlertasMetas.dbsp', Parametros:'IDUSARIOALERTA='+cadusuariosalertasNo });  
      }
  }

  self.parent.$('.PieModal .Btn-flat-Cancelar').remove();
  $('.BodyModal #Tabs').tabs();
  
    if(ganadas) {
        $('#divTab-ganadas').html('<div id="loadingsalesup"><img src="../imagenes/loadingsalesup.png" /></div>');
        
        setTimeout(function() {
          SalesUp.Sistema.OcultaEspera();
          RecargaDatosTab(0, 2);
          Animacion2();
          tamPantalla=4;
          CambiaTamanio('ganadas');
      }, 200);
            }else if(perdidas){
        $('#divTab-Noganadas').html('<div id="loadingsalesup"><img src="../imagenes/loadingsalesup.png" /></div>');
        setTimeout(function() {
          SalesUp.Sistema.OcultaEspera();
          RecargaDatosTab(0, 3);
          Animacion2();
          tamPantalla=4;
          CambiaTamanio('ganadas');
          }, 200);
      } else {
            $('#divTab-0').html('<div id="loadingsalesup"><img src="../imagenes/loadingsalesup.png" /></div>');
            setTimeout(function() {
              SalesUp.Sistema.OcultaEspera();
              $('#Tab-0 a').click();
              Animacion2();
            }
            , 200);
        }
}

function RecargaEsp(tipo, div){

if(div==1){
$('#divTab-ganadas').html('<div id="loadingsalesup"><img src="../imagenes/loadingsalesup.png" /></div>');
}
else{
$('#divTab-Noganadas').html('<div id="loadingsalesup"><img src="../imagenes/loadingsalesup.png" /></div>');
}

      
      setTimeout(function() {
        SalesUp.Sistema.OcultaEspera();
        RecargaDatosTab(0, tipo);
        Animacion2();
        tamPantalla=4;
        CambiaTamanio('ganadas');
    }
    , 200);
}
function FiltrosTabs() {
  var titulo = '<div class="w50 tDer titulo" style="margin-top: -35px !important; margin-left: 315px !important;"><h3><span style="font-size:19px; text-align:center;">Mis metas</span></h3></div>';
  var periodos = ["Hoy", "Semana","Mes", "Trimestre","Semestre", "Anual"];
  var Valoresperiodos = [6,7,0,1,2,3];

  var htmlTab='<div id="Tabs" style="margin-top: -4px; !important"><ul>';
  var tabGanadas = '';
  var divGanadas = '';
  var tabNoGanadas = '';
  var divNoGanadas = '';
  var htmlDivs='';

  var metasAlcanzadas  = SalesUp.Sistema.CargaDatos( {Link:'/privado/Modelo/jsonNumMetasAlcanzadas.dbsp',DataType:'json'}).jsonDatos;
  metasAlcanzadas = _.reject(metasAlcanzadas, function(j) {return _.size(j) == 0;});
  numMetas=_.size(metasAlcanzadas);

  var metasAlcanzadasNo  = SalesUp.Sistema.CargaDatos( {Link:'/privado/Modelo/jsonNumMetasNoAlcanzadas.dbsp',DataType:'json'}).jsonDatos;
  metasAlcanzadasNo = _.reject(metasAlcanzadasNo, function(j) {return _.size(j) == 0;});
  numMetasNo=_.size(metasAlcanzadasNo);

  if(numMetas>0) {
    ganadas=true
    tabGanadas = '<li id="Tab-ganadas"><a href="#divTab-ganadas"  onclick="RecargaEsp(2,1)">Ganadas</a></li>';
    divGanadas = '<div id="divTab-ganadas">Informacion de Ganadas</div>';
    for (var i=0; i<metasAlcanzadas.length;i++) {
      idmetas+=metasAlcanzadas[i].IDMETA+',';
      cadusuariosalertas+=metasAlcanzadas[i].IDUSUARIOALERTA+',';
    }
  }
  htmlTab += tabGanadas;

   if(numMetasNo>0) {
    perdidas=true
    tabNoGanadas = '<li id="Tab-Noganadas"><a href="#divTab-Noganadas" onclick="RecargaEsp(3,2)">Perdidas</a></li>';
    divNoGanadas = '<div id="divTab-Noganadas">Informacion de no Ganadas</div>';
    for (var i=0; i<metasAlcanzadasNo.length;i++) {
      idmetasNo+=metasAlcanzadasNo[i].IDMETA+',';
      cadusuariosalertasNo+=metasAlcanzadasNo[i].IDUSUARIOALERTA+',';
    }
  }

  htmlTab += tabNoGanadas;
  
  for (var i=0; i<periodos.length;i++) {
    htmlTab+='<li id="Tab-'+Valoresperiodos[i]+'" data-cargado="0" ><a onclick="RecargaPeriodoPop('+Valoresperiodos[i]+',0,1)" href="#divTab-'+Valoresperiodos[i]+'">'+periodos[i]+'</a></li>';
    htmlDivs+='<div id="divTab-'+Valoresperiodos[i]+'"></div>';
  }
  htmlTab+='</ul>'+titulo+divGanadas+divNoGanadas+htmlDivs+'</div><div class="clear"></div>';
  return htmlTab;
}

function ConstruyeJSON(tipoConsulta, periodo, tipo) {
  //tipo consulta SOLO USUARIO DE LA SESSION 1-individual, 2-grupal, 3-empresarial
  var datosM;
  if(tipo == 1) {
    datosM  = SalesUp.Sistema.CargaDatos( {Link:'/privado/Modelo/jsonDatosMetas_Alerta.dbsp',Parametros:'PERIODO_SELECCIONADO='+periodo+'&TIPOCONSULTA='+tipoConsulta ,DataType:'json'}).jsonDatos;
    datosM = _.reject(datosM, function(j) {return _.size(j) == 0;});

  } else if(tipo == 2) {
    datosM  = SalesUp.Sistema.CargaDatos( {Link:'/privado/Modelo/jsonDatosMetasAlerta.dbsp',Parametros:'IDMETAS='+idmetas, DataType:'json'}).jsonDatos;
    datosM = _.reject(datosM, function(j) {  return _.size(j) == 0;});
  }
   else if(tipo == 3) {
    datosM  = SalesUp.Sistema.CargaDatos( {Link:'/privado/Modelo/jsonDatosMetasAlerta.dbsp',Parametros:'IDMETAS='+idmetasNo, DataType:'json'}).jsonDatos;
    datosM = _.reject(datosM, function(j) {  return _.size(j) == 0;});
  } 

  var iconoMeta = ['fa fa-user','fa fa-users', 'fa fa-building'];
  var tipMeta =  ['Meta Indiviual','Meta Grupal', 'Meta Empresarial'];
  if(_.size(datosM)>0) {


    var periodoV = '0';
    var activasV =1;
    var c1='AND 1=1';
    var c2='AND 1=1';
    var c3='AND 1=1';
    var c4=activasV;
    var c5=periodoV;
    var j='{"Metas":[';
    var aux=',';
    var indice = 0;

    tamPantalla += datosM.length;

    for (var i=0; i<datosM.length; i++) {

      if( (!datosM[i].IDGRUPO) && (!datosM[i].IDUSUARIO) ){
            indice=2;
          } else if( (datosM[i].IDGRUPO) && (!datosM[i].IDUSUARIO) ){
                indice=1;
              }else if( (!datosM[i].IDGRUPO) && (datosM[i].IDUSUARIO) ){
                     indice=0;
                   }

      if((datosM.length==1) || ((datosM.length-1)==i) )
                  aux='';

      if(parseInt(datosM[i].FORMATO) == 3){
          datosM[i].AVANCE=parseFloat(datosM[i].AVANCE)*100;
          datosM[i].META=parseFloat(datosM[i].META)*100;
      }



      var avan=parseFloat(datosM[i].AVANCE);
      var meta=parseFloat(datosM[i].META);
      
      var avanTexto=avan+'';
      var metaTexto=meta+'';
      var metaDeseada=0;
      var cantidadDeseada=0;
      var tipoBarra='';
      var LEYENDA = 'Para hoy deberias llevar: ';

      pct=0;
      var pctWidth=0;
      if(parseInt(datosM[i].DIAS_TRANS)>0) {
        if(parseInt(datosM[i].DIAS_TRANS)>parseInt(datosM[i].NUMDIAS)) {
          metaDeseada=100;
          cantidadDeseada=meta;
        } else {
          metaDeseada=roundDos(((parseInt(datosM[i].DIAS_TRANS)/parseInt(datosM[i].NUMDIAS))*100));
          cantidadDeseada=roundDos(meta*((parseInt(datosM[i].DIAS_TRANS)/parseInt(datosM[i].NUMDIAS))));
        }
        pct=roundDos(datosM[i].PCT*100);
        pctWidth=pct;
        if((metaDeseada-pct)>=10) {
          tipoBarra='progress-bar-danger';
        } else if(((metaDeseada-pct)<=10) && ((metaDeseada-pct)>0)) {
          tipoBarra='progress-bar-warning';
        } else if((metaDeseada-pct)<=0) {
          tipoBarra='progress-bar-success';
          if(pct>=99)
          pctWidth=100;

        }
      }
      if(parseInt(datosM[i].NUMDIAS)==0) {
        metaDeseada=100;
        pct=roundDos(datosM[i].PCT*100);
        
        if(parseInt(datosM[i].ES_HOY)==1){
        var tiempo = new Date(); 
        var hora = tiempo.getHours();
        cantidadDeseada=roundDos(meta*(hora/24));
        metaDeseada=roundDos((hora/24)*100);
        LEYENDA= 'A esta hora debes llevar: ';
        }
          else{
            if(parseInt(datosM[i].DIAS_TRANS)<0){
            metaDeseada=0;
            cantidadDeseada=roundDos(metaDeseada);
          }else{
            cantidadDeseada=roundDos(meta);
          }
        }

        pctWidth=pct;
        if((metaDeseada-pct)>=10) {
          tipoBarra='progress-bar-danger';
        } else if(((metaDeseada-pct)<=10) && ((metaDeseada-pct)>0)) {
          tipoBarra='progress-bar-warning';
        } else if((metaDeseada-pct)<=0) {
          tipoBarra='progress-bar-success';
          if(pct>=99)
          pctWidth=100;
        }
      }
      if(datosM[i].FORMATO==2 || datosM[i].FORMATO==3) {
        textAvance=SalesUp.Sistema.FormatoNumero(datosM[i].AVANCE);
        textMeta=SalesUp.Sistema.FormatoNumero(datosM[i].META);
        cantidadDeseada=SalesUp.Sistema.FormatoNumero(cantidadDeseada);

            if(datosM[i].FORMATO==3){
              textAvance=textAvance+'%';
              textMeta=textMeta+'%';
              cantidadDeseada=cantidadDeseada+'%'; 
            }

      } else {
        textAvance=SalesUp.Sistema.FormatoMoneda(datosM[i].AVANCE);
        textAvance= textAvance.substring(0,textAvance.length-3);
        textMeta=SalesUp.Sistema.FormatoMoneda(datosM[i].META);
        textMeta=textMeta.substring(0,textMeta.length-3); 
        cantidadDeseada=SalesUp.Sistema.FormatoMoneda(cantidadDeseada);
      }
      if((avan>1000) && (avan<1000000)) {
        avan=roundDos((avan/1000));
        avanTexto = avan + 'K';
      } else if(avan>1000000) {
        avan=roundDos((avan/1000000));
        avanTexto = avan + 'M';
      }
      if((meta>1000) && (meta<1000000)) {
        meta=roundDos((meta/1000));
        metaTexto = meta + 'K';
      } else if(meta>1000000) {
        meta=roundDos((meta/1000000));
        metaTexto = meta + 'M';
      }
      if(metaDeseada==100)
        metaDeseada=99;
      j+='{"ICONOMETA":"'+iconoMeta[indice]+'","TIPMETA":"'+tipMeta[indice]+'","LEYENDA":"'+LEYENDA+'","DESCRIPCION":"'+datosM[i].DESCRIPCION+'","FECHA_INIC":"'+datosM[i].FECHA_INIC+'","FECHA_FIN":"'+datosM[i].FECHA_FIN+'","TEXTAVANCE":"'+textAvance+'","TEXTMETA":"'+textMeta+'","NOMBRE":"'+datosM[i].NOMBRE+'","APELLIDOS":"'+datosM[i].APELLIDOS+'","PCT":"'+pct+'", "METADESEADA":"'+metaDeseada+'","CANTIDADDESEADA":"'+cantidadDeseada+'","TIPOBARRA":"'+tipoBarra+'", "PCTWIDTH":"'+pctWidth+'", "AVANTEXTO":"'+avanTexto+'", "METATEXTO":"'+metaTexto+'"}'+aux;
    }
    j+=']}';
 
    return j;
  }
  return '[{}]';
}
function roundDos(num) {
  return +(Math.round(num + "e+2")  + "e-2");
}
function Animacion2() {
  setTimeout(function() {
    var arrPorcentajes = $('.BoxMetas .progress-bar[data-porcentaje]');
    var arrIndicador = $('.BoxMetas .LbIndicador[data-porcentaje]');
    for (var i=0;i<arrPorcentajes.length;i++) {
 
      var $p = $(arrPorcentajes[i]);
      var $ind = $(arrIndicador[i]);
      $p.css('width','0%');
      $ind.css('left','0%');
      var w = $p.attr('data-porcentaje');
      var w2 = $ind.attr('data-porcentaje');
      //$p.removeAttr('data-porcentaje');
      //$ind.removeAttr('data-porcentaje');
      $p.css('width',w);
      $ind.css('left',w2);
      if(parseInt(w2.split('%')[0])<50) {
        $ind.addClass('Tip2');
      } else {
        $ind.addClass('Tip8');
      }
    }
    SalesUp.Sistema.Tipsy();
    //    SalesUp.Sistema.IniciaPlugins();
  }
  , 250);
}

function AnimacionQuitar() {
 
    var arrPorcentajes = $('.BoxMetas .progress-bar[data-porcentaje]');
    var arrIndicador = $('.BoxMetas .LbIndicador[data-porcentaje]');
    for (var i=0;i<arrPorcentajes.length;i++) {
      var $p = $(arrPorcentajes[i]);
      var $ind = $(arrIndicador[i]);
      $p.css('width','0%');
      $ind.css('left','0%');
    }
}

function RecargaPeriodoPop(periodo, tamanio, tipo){

  if(tipo==1){
  tamPantalla=0;
    $('#divTab-'+periodo).html('<div id="loadingsalesup"><img src="../imagenes/loadingsalesup.png" /></div>');
  setTimeout(function() {
    SalesUp.Sistema.OcultaEspera();
    RecargaDatosTab(periodo, 1);
    Animacion2();
   CambiaTamanio(periodo);
    $('#Tab-'+periodo+' a').removeAttr('onclick');
    $('#Tab-'+periodo+' a').attr('onclick', 'RecargaPeriodoPop('+periodo+','+tamPantalla+','+2+')');
  }
  , 250);
  }
  else{
  AnimacionQuitar();
  var htmlCont=$("#divTab-"+periodo).html();
     tamPantalla=tamanio;
    $('#divTab-'+periodo).html('<div id="loadingsalesup"><img src="../imagenes/loadingsalesup.png" /></div>');
  setTimeout(function() {
    SalesUp.Sistema.OcultaEspera();
   $('#divTab-'+periodo).html(htmlCont);
   AnimacionQuitar();
    Animacion2();
   CambiaTamanio(periodo);
  }
  , 250); 
  }


}

function RecargaDatosTab(periodo, tipo) {
  //Numero de periodo, igual hace referencia a que div inserta los datoss
  //Tipo: 1 es para periodos, 2 es para ganados
  if(tipo == 1) {
     var div=''+periodo;
    var htmlBarra='<div class="BoxMetas" style="overflow-y: visible !important; overflow-x:hidden !important; height:230px;">';
    
    //for (var i=1; i<4; i++) {
      var jsonMetas= JSON.parse(ConstruyeJSON(1, periodo, 1));
      var jsonMetas2=jsonMetas;

      jsonMetas = _.reject(jsonMetas, function(j) {return _.size(j) == 0;});

      if(_.size(jsonMetas)>0) {var templateBarra=SalesUp.Sistema.CargaDatos( {  Link:'/privado/Vista/TemplateMetasProgreso.dbsp', Parametros:'tipo=2', Almacen:'TemplateMetasProgreso'});
        var htmlProgress = SalesUp.Construye.ReemplazaDatos( { Datos:jsonMetas2, Template:templateBarra});
        htmlBarra +=htmlProgress;
      }
    //}

    htmlBarra += '</div>';
    $('#divTab-'+div).html(htmlBarra);
  } else if(tipo == 2) {
    var cadFelicitacion = '<div class="clear"></div><span class="MsgMetas MsgGanadas BoxSizing "><i class="fa fa-lg fa-trophy"></i>  ¡Felicidades! se han alcanzado ' +numMetas+' metas</span><div class="clear"></div>' 
        var htmlBarra='<div id="divTab-ganadas" class="BoxMetas" style="overflow-y: visible !important; overflow-x:hidden !important; height:230px;">'+cadFelicitacion;
    var jsonMetas= JSON.parse(ConstruyeJSON(1, 1, 2));
    var templateBarra=SalesUp.Sistema.CargaDatos( {Link:'/privado/Vista/TemplateMetasProgreso.dbsp', Parametros:'tipo=2',  Almacen:'TemplateMetasProgreso'});
    var htmlProgress = SalesUp.Construye.ReemplazaDatos( { Datos:jsonMetas, Template:templateBarra});

    htmlBarra +=htmlProgress;
    htmlBarra += '</div>';
    $('#divTab-ganadas').html(htmlBarra);
  }else if(tipo == 3) {
    var cadAtencion = '<div class="clear"></div><span class="MsgMetas MsgPerdidas BoxSizing "><i class="fa fa-lg fa-frown-o"></i>  ¡Atencion! se han perdido ' +numMetasNo+' metas</span><div class="clear"></div>' 
        var htmlBarra='<div id="divTab-ganadas" class="BoxMetas" style="overflow-y: visible !important; overflow-x:hidden !important; height:230px;">'+cadAtencion;
    var jsonMetas= JSON.parse(ConstruyeJSON(1, 1, 3));
    var templateBarra=SalesUp.Sistema.CargaDatos( {
      Link:'/privado/Vista/TemplateMetasProgreso.dbsp', Parametros:'tipo=2'
    }
    );
    var htmlProgress = SalesUp.Construye.ReemplazaDatos( {
      Datos:jsonMetas, Template:templateBarra
    }
    );
    htmlBarra +=htmlProgress;
    htmlBarra += '</div>';
    $('#divTab-Noganadas').html(htmlBarra);
    //Elimina usuarios-alertas
  
}
}

function CambiaTamanio(div){

if(tamPantalla==0) {
  $('#modalMisMetas .BodyModal').css('height',142)
    $('#divTab-'+div+' .BoxMetas').css('height',80)
  var cadInfo = '<div class="clear"></div><span class="MsgMetas MsgNoHayMetas BoxSizing "><i class="fa fa-lg fa-info-circle"></i>  No hay metas en este periodo</span><div class="clear"></div>'; 
  $('#divTab-'+div).html(cadInfo);
}else if(tamPantalla==1) {
    $('#modalMisMetas .BodyModal').css('height',120)
      $('#divTab-'+div+' .BoxMetas').css('height',58)
    } 
  else if(tamPantalla==2) {
    $('#modalMisMetas .BodyModal').css('height',182)
      $('#divTab-'+div+' .BoxMetas').css('height',120)
    } 
    else if(tamPantalla == 3 ) {
      $('#modalMisMetas .BodyModal').css('height',238)
            $('#divTab-'+div+' .BoxMetas').css('height',177)
      } 
      else if(tamPantalla == 4 ) {
        $('#modalMisMetas .BodyModal').css('height',291)
              $('#divTab-'+div+' .BoxMetas').css('height',230)
        } 
        else if(tamPantalla == 5 ) {
          $('#modalMisMetas .BodyModal').css('height',351)
                  $('#divTab-'+div+' .BoxMetas').css('height',290)
          } 
          else if(tamPantalla >=6 ) {
            $('#modalMisMetas .BodyModal').css('height',406)
                    $('#divTab-'+div+' .BoxMetas').css('height',345)
          }

//tamPantalla=0;
}
