SalesUp.Variables.CatalogoActual = 'Usuarios Plantillas';
SalesUp.Variables.sIdempresa = $('#idempresa').val();
SalesUp.Variables.Idusuario=$('#idUs').val();
SalesUp.Variables.Compartircon=-2;
SalesUp.Variables.texto=''; 
SalesUp.Variables.Tku = $('#tku').val(); 
SalesUp.Variables.ReloadData = function(){  SalesUp.Variables.RecargarDatos(); }
SalesUp.Variables.pagInicio=1;
var nivelPermisoPlantilla = SalesUp.Variables.Plantillas
var PagAct=1;
var nRegistros=50; 
var totalRegistros; //=SalesUp.Sistema.CargaDatos({Link:'', Parametros:'idusuario='+idusu}); ajax/plantillas_correos_data.dbsp

  SalesUp.Variables.CamposData = function(Op){
        var texto           =(Op.texto)?Op.texto:'';
        var idusuario       =(Op.id)?Op.id:'';
        var compartircon    =(Op.compartircon)?Op.compartircon:'-2';
        var tku =  SalesUp.Variables.tku ;
        totalRegistros=SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonPlantillasUsuariosContador.dbsp', Parametros:'idusuario='+idusuario+'&compartircon='+compartircon+'&texto='+texto, DataType:'json'}).jsonDatos; 
        totalRegistros=(totalRegistros[0].TOTAL)?totalRegistros[0].TOTAL:'';
        jsonLtcp = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonDatosPlantillas.dbsp', Parametros:'texto='+texto+'&compartircon='+compartircon+'&idusuario='+idusuario+'&inicia='+SalesUp.Variables.pagInicio+'&howmany='+nRegistros ,DataType:'json'});
        jsonLtcp = jsonLtcp.jsonDatos; 
        //console.info(totalRegistros, 'totalRegistros')
        var templateHead = '<tr><td width="2%">#</td><td class="">Nombre</td><td class="tCen">Propietario</td><td class="tCen">Compartido con</td><td class="tCen">Tipo</td><td width="3%">Acción</td></tr>';
        var template = '';
            template += '<tr  class="plantilla" data-id="{{IDUSUARIO}}" data-Restriccion="coCorporativo" data-tk="{{TK}}" data-tkm="{{TKM}}" >';
            template += '<td>{{nFila}}</td>';
            template += '<td ><span class=" Pointer  Tip6 editarPlantilla tipocorreo" onclick="SalesUp.Variables.ValidarTipo({t:{{TIPOCORREO}}, tkpl:\'{{TK}}\', tku:\'{{TKU}}\', e:this });" tip="Editar"><b>{{DESCRIPCION}}</b></span>';
            template += '<td class="tCen"><span   class="Pointer Tip1" tip="{{NOMBRECOMPLETO}}" >{{NOMBRE}}</span>';
            template += '<td class="tCen" > <span class="Compartido Tip1 Pointer" data-compartircon="{{COMPARTIR}}" tip="{{COMP}}" ></span></td>';
            template += '<td class="tCen" ><span class="ElTipo Tip1 Pointer" tip="{{ELTIPO}}" data-tipo="{{ELTIPO}}"></span></td>';
            if(nivelPermisoPlantilla==2){
              template += '<td class="coAcciones" data-grupo="{{IDUSUARIO}}"><span class="Pointer EliminarCatalogo "  data-class="descartar {{ANEXOS}}" data-id="{{TK}}" data-dato="{{DESCRIPCION}}" rel="{{DESCRIPCION}}" nombrereal="{{NOMBRE_ARCHIVO}}" data-q="¿Está seguro de eliminar la plantilla <b>{{DESCRIPCION}}</b>?"  onclick="SalesUp.Variables.AlertaEliminarCatalogo({e:this});"><i class="fa fa-lg fa-trash-o Tip6" tip="Eliminar "></i> </span></td>'; 
            }else{
              template += '<td><span></span></td>'; 
            }
             //id para eliminar
            template += '</tr>';
            template += '';
        var jsonLtcp;
      SalesUp.Construye.ConstruyeTabla(templateHead, template, jsonLtcp, {Destino:'#DatosLoad', Id:'LtTablaPersonalizable', Callback:'', PagActual:PagAct, NumRegistros:totalRegistros } );
            if(nivelPermisoPlantilla==2){
              var botones  = '<div class="clear"></div><div class="BoxBotones">'; 
               botones += '<span  class="Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar" id="BtnAceptar" onclick="SalesUp.Variables.AgregarNuevoCorreo({tku:\''+tku+'\' });"><i class="fa fa-plus"></i> Agregar e-mail </span>  ';   
               botones += '<span  class="Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar" id="BtnAceptar" onclick="SalesUp.Variables.AgregarNuevoSms({tku:\''+tku+'\' })"><i class="fa fa-plus"></i> Agregar SMS</span>  ';   
               botones += '</div><div class="clear"></div>';   
              $('#DatosLoad').append(botones); 
            }
      //SalesUp.Variables.ValidarNivel();          
             //SalesUp.Sistema.IniciaPlugins();
}

SalesUp.Variables.crearSelectUsuarios=function (){
            $("#selectUsuarios").html("");
            var datos= SalesUp.Sistema.CargaDatos({Link:'Modelo/JsonListarUsuariosPlantillas.dbsp', DataType:'json'});
            datos = datos.jsonDatos;
            SalesUp.Construye.ConstruyemeUn({
            Control: 'select', Nuevo: false,
            SeleccioneOpcion: true, 
            IdControl: 'selectUsuarios',
            Template: '<option value="{{IDUSUARIO}}">{{NOMBRE}}</option>', 
            Datos: datos
            });  
}
SalesUp.Variables.MostrarIconoTipo=function(){
    var tipo=$('.ElTipo');
    var sms='<i class="fa fa-comment"></i>';
    var correo='<i class="fa fa-envelope"></i>';
    for(var i=0; i<=tipo.length-1; i++){
        var Eltipo=$(tipo[i]).attr('data-tipo');
        if(Eltipo=='SMS'){
          $(tipo[i]).append(sms);
        }else{
            $(tipo[i]).append(correo);
        }

    }
}

SalesUp.Variables.SoyAdministrador=function(){
  var nivel=$('#nivel').val();
  if(nivel==1){
    var html='<option value="-1">Toda la empresa</option>'; //<option value="3">Grupos</option>
    $('#selectGrupo').append(html);
  }
}
SalesUp.Variables.MostrarIconoCompartircon=function(){
      var compartir=$('.Compartido');
      var grupo='<i class="fa fa-users"> </i>';
      var empresa='<i class="fa fa-building-o"></i>';

      for(var i=0; i<=compartir.length-1; i++){
        var comp=$(compartir[i]).attr('data-compartircon');
        if(comp=='Empresa'){
            $(compartir[i]).append(empresa);
        }else if(comp=='Grupo'){
            $(compartir[i]).append(grupo);
        }else if(comp=='Nadie'){

        }
      }
}

// SalesUp.Variables.ValidarDatosUsuarios=function(){
//   var datos=$('.coAcciones');
//   var nivel=$('#nivel').val();
//   var versistema=$('#versistema').val();
//   // if(nivel==2){

//   // }
//   for(var i=0; i<=datos.length-1; i++){
//         var a= $(datos[i]);
//         var xi=a.attr('data-us');
        
//     if(xi!=sessionidus){
//       $(datos[i]).html('') ;
//     }
//   }
//   }
SalesUp.Variables.ValidarTipo=function(Op){
    var tipo=Op.t;
    var idusuario=Op.u;
    var idplantilla=Op.p;

    if(tipo==1){
       SalesUp.Variables.EditarPlantilla(Op);
      }else{
       SalesUp.Variables.EditarSMS(Op);
    }
     
}
SalesUp.Variables.AgregarNuevoCorreo=function(Op){
    var idu=Op.u;
    SalesUp.Sistema.AbrePopUp({
          Titulo     : 'Nueva plantilla tipo correo',
          Pagina     : 'popup_plantilla_agregar.dbsp',
          Parametros : 'ideditar ='+idu,
          CallBack   : 'SalesUp.Variables.RecargarDatos',
          Alto       : 530,
          Ancho      : 830
    });
}
SalesUp.Variables.AgregarNuevoSms=function(Op){
    var idu=Op.u;
    SalesUp.Sistema.AbrePopUp({
          Titulo:'Nueva plantilla tipo sms', 
          Pagina:'popup_plantilla_agregar_sms.dbsp', 
          Parametros:'idplantilla=0&ideditar='+idu, 
          CallBack:'SalesUp.Variables.RecargarDatos', 
          Alto:190, 
          Ancho:620
    });
}

SalesUp.Variables.EditarPlantilla=function(Op){

  var idplantilla      = Op.id;
  var idu              = Op.idu;
  var tku              = Op.tku;
  var tkpl             = Op.tkpl;
  var sessionidusuario = $('#idUs').val();
  var idgruposession   = $('#idgrupo').val();
  var nivelUsuario     = $('#nivel').val();

  SalesUp.Sistema.AbrePopUp({
      Titulo     : 'Editar plantilla',
      Pagina     : 'PopupPlantillaEditar.dbsp',
      Parametros : 'tkpl='+tkpl+'&tku='+tku+'&ideditar=' + idu + '&sessionidus=' + sessionidusuario + '&sessionidgrupo=' + idgruposession + '&nivelUsuario=' + nivelUsuario+'&nivelPermisoPlantilla='+nivelPermisoPlantilla,
      CallBack   : 'SalesUp.Variables.RecargarDatos',
      Alto       : 530,
      Ancho      : 830
    });

}
SalesUp.Variables.EditarSMS=function(Op){
  var idplantilla   =Op.id;
  var idu           =Op.idu;
  var tku           =Op.tku;
  var tkpl          =Op.tkpl; 
  //console.info(idplantilla, idu);
  SalesUp.Sistema.AbrePopUp({
          Titulo:'Editar plantilla', 
          Pagina:'popup_plantilla_agregar_sms.dbsp', 
          Parametros:'tkpl='+tkpl+'&tku='+tku+'&ideditar='+idu+'&nivelPermisoPlantilla='+nivelPermisoPlantilla,
          CallBack:'SalesUp.Variables.RecargarDatos', 
          Alto:190, 
          Ancho:620
    });

}
SalesUp.Variables.EfectosFiltros=function(){
  $('#Detalle, #ocultarFiltro').css('display', 'none');
  $('#Detalle').css('display', 'none');
  $('#tipoFiltro').val(0);  
  $('#LosFiltros, #DatosLoad, #Detalle, #filtros').css('display', 'none');
}
SalesUp.Variables.RecargarDatos=function(){
  //$('#Detalle, #ocultarFiltro').css('display', 'none');
      
      SalesUp.Sistema.MuestraEspera('#DatosLoad',1);
     //$('#Detalle').css('display', 'none');
     //$('#tipoFiltro').val(0);  
     //$('#LosFiltros, #DatosLoad, #Detalle, #filtros').css('display', 'none');
     
     SalesUp.Variables.pagInicio=1;
    var idusuario=$('#idUs').val();
    var texto='';
    var compartircon=-2;
    setTimeout(function() {  SalesUp.Variables.CamposData({id:idusuario, texto:texto, compartircon:compartircon}); SalesUp.Sistema.OcultaEspera();$('#LosFiltros ,#DatosLoad').css('display', 'block');}, 100);
    setTimeout(function() {  SalesUp.Variables.MostrarIconoTipo();SalesUp.Variables.MostrarIconoCompartircon();}, 103);
}
SalesUp.Variables.OcultarYRecargar=function(Op){
    var $Elemento=$(Op.elemento);
       $Elemento.fadeOut();
    SalesUp.Sistema.MuestraEspera('#DatosLoad',1);
    $('#Detalle').css('display', 'none');
    $('#tipoFiltro, #selectUsuarios').val(0);  
    $('#LosFiltros, #DatosLoad, #Detalle, #filtros').css('display', 'none');
    $('#grupos, #texto, #selectGrupo').addClass('ocultar');
     var idusuario=$('#idUs').val();
     var compartircon=-2; 
     var texto=''; 
     SalesUp.Variables.pagInicio=1;
     setTimeout(function() {  SalesUp.Variables.CamposData({id:idusuario, texto:texto, compartircon:compartircon}); SalesUp.Sistema.OcultaEspera();$('#LosFiltros ,#DatosLoad').css('display', 'block');}, 100);
     setTimeout(function() {  SalesUp.Variables.MostrarIconoTipo();SalesUp.Variables.MostrarIconoCompartircon();}, 103);
}


SalesUp.Variables.CargarDatosTbl= function(Op){
    SalesUp.Variables.ThisG = "";
    SalesUp.Variables.GuardaValor = "";
      SalesUp.Variables.CargaDatosGuardo = Op;
      var valor=Op.valor; 
      var $Elemento=$(Op.elemento);
          $Elemento.slideUp(1000);
          $('#FiltroTipo').val(0);
      SalesUp.Sistema.MuestraEspera('#DatosLoad',1);
      var texto=$('#selectUsuarios option:selected').text();

      var html='<span class="filtro Pointer Tip1" tip="Quitar filtro"  id="TextoFiltro" onclick="SalesUp.Variables.OcultarYRecargar({elemento:this});" ></span>';
      //$('Filtro .fa').css('display', 'none');
      //$('#FiltrosActuales').append('<span id="EliminarFiltros" class="Pointer Tip1" Tip="Eliminar filtros" onclick="SalesUp.Variables.EliminarFiltros({Elemento:this, Recargar:true});"><i class="fa fa-lg fa-times"></i></span>');  
      //$('#CerrarFiltro .fa').addClass('fa-spin fa-spinner fa-2x').removeClass('fa-times fa-lg');
       SalesUp.Variables.pagInicio=1;
      setTimeout(function() {  
        //Aqui ppuedo cambiar los valores de mis variables globales.
        SalesUp.Variables.Idusuario= valor; 
        SalesUp.Variables.Compartircon=-2; 
        SalesUp.Variables.texto='';
        SalesUp.Variables.CamposData({id:SalesUp.Variables.Idusuario, compartircon:SalesUp.Variables.Compartircon, texto:SalesUp.Variables.texto});SalesUp.Sistema.OcultaEspera();
        $('#FiltrosActuales').html(html);
        $('#TextoFiltro').append(texto);
        }, 100);
        setTimeout(function() {SalesUp.Variables.MostrarIconoTipo();SalesUp.Variables.MostrarIconoCompartircon();}, 103);
          if(SalesUp.Variables.NoCambies2!=1){
            SalesUp.Variables.ActivaMostrarFiltros();
          }else{
            SalesUp.Variables.NoCambies2="";
          }
          
        
      
}

SalesUp.Variables.AlertaEliminarCatalogo = function(Op){
        $Elemento    = $(Op.e);
        idplantilla  = "";
        titulo       = "Eliminar";
        idplantilla  = $Elemento.attr('data-id');
        plantilla    = $Elemento.attr('rel');
        archivos     = $Elemento.attr('data-class');
        nombrereal   = $Elemento.attr('nombrereal');
        var Pregunta = $Elemento.attr('data-q');
        var tkpl     = $Elemento.attr('data-id');
        var Funcion  = (Op.Corp) ? Op.Corp : 'SalesUp.Variables.EliminarCatalogo';

SalesUp.Construye.MuestraAlerta({
          TipoAlerta:'AlertaPregunta',
          Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> '+Pregunta+'',
          Boton1:'Eliminar',
          Boton2:'Cancelar',
          Callback1: Funcion+'({tkpl:"'+tkpl+'"})',
          Icono1:'<i class="fa fa-trash"></i>',
          Icono2:'<i class="fa fa-times"></i>',
          Ancho:'500px'
        });
}

SalesUp.Variables.EliminarCatalogo = function(Op){
         
          var tkpl    = Op.tkpl;
        
           //var idu=$('#idUs').val();
           archivos=archivos.substring(10);
                if (archivos != ''){    
                    var archivosporborrar = archivos.split(",");
                    var archivosrealporborrar = nombrereal.split(",");
                        for (i=0;i<archivosrealporborrar.length;i++)
                        {
                            if(archivosrealporborrar[i]!=""){
                                var esamazon = archivosporborrar[i].indexOf('Z:');
                                if (esamazon==0){
                                    $.ajax({ async:false,   cache: false,   dataType: 'html',
                                        url :"popup_plantilla_eliminar.dbsp?amazon=0&ban=1&tkpl="+tkpl+"&archivo="+archivosrealporborrar[i],
                                        success : function(data) {
                                                $("#resultado2").html(data);
                                        }
                                    });
                                }else{
                                    $.ajax({ async:false,   cache: false,   dataType: 'html',
                                        url :"popup_plantilla_eliminar.dbsp?amazon=1&ban=1&tkpl="+tkpl+"&archivo="+archivosrealporborrar[i],
                                        success : function(data) {
                                                $("#resultado2").html(data);
                                                
                                        }
                                    });                                 
                                }   
                            }
                        }
                        $.fallr('hide');
                        // GetData();
                         //SalesUp.Variables.CamposData({id:idu});
                         //setTimeout(function() {SalesUp.Variables.MostrarIconoTipo();SalesUp.Variables.MostrarIconoCompartircon();}, 103);
                }else{
                    $.ajax({ async:false,   cache: false,   dataType: 'html',
                        url :"popup_plantilla_eliminar.dbsp?ban=0&tkpl="+tkpl,
                        success : function(data) {
                                $("#resultado2").html(data);
                                $.fallr('hide');
                                if(SalesUp.Variables.ThisG){
                                  SalesUp.Variables.NoCambies = 1;
                                  SalesUp.Variables.Filtros(SalesUp.Variables.ThisG)
                                }
                                if(SalesUp.Variables.GuardaValor){
                                  SalesUp.Variables.ProcesaFiltrosConEnter(SalesUp.Variables.GuardaValor)
                                }
                                if(SalesUp.Variables.CargaDatosGuardo){
                                   SalesUp.Variables.NoCambies2 = 1;
                                  SalesUp.Variables.CargarDatosTbl(SalesUp.Variables.CargaDatosGuardo)
                                }
                                 //GetData();
                                 //SalesUp.Variables.CamposData({id:idu});
                                /// setTimeout(function() {SalesUp.Variables.MostrarIconoTipo();SalesUp.Variables.MostrarIconoCompartircon();}, 103);
                        }
                    });
                }
                if(SalesUp.Variables.GuardaValor==""){              
                  var texto=''; 
                  var compartircon=-2;
                  SalesUp.Variables.CamposData({tku:SalesUp.Variables.Tku, texto:texto, compartircon:compartircon});

                  if(SalesUp.Variables.ThisG==""){
                    setTimeout(function() {SalesUp.Variables.MostrarIconoTipo();SalesUp.Variables.MostrarIconoCompartircon();}, 103);
                  }
                }

}


SalesUp.Variables.ValidarConfigCorreo=function(){
   var correoConfiguracion=$('#correoConfiguracion').val();
   if(correoConfiguracion!=1){
    setTimeout(function() {$('#MsgConfigMail').toggle('slow');}, 2000);
   }
}
SalesUp.Variables.ConfigurarCorreo=function(){
  SalesUp.Sistema.AbrePopUp({
          Titulo:'Editar plantilla', 
          Pagina:'popup_config_mail.dbsp', 
          Parametros:'idprostp=<#session.idusuario/>&screen=1',
          CallBack:'', 
          Alto:330, 
          Ancho:570
    });
  
}

var iraPag=function(Ir){
    PagAct = Ir;
    var Cond = '';
    ActivaPaginacion(Cond,Ir);
}
var ActivaPaginacion=function(Cond,Ir){
    SalesUp.Variables.pagInicio = (parseInt(Ir) * parseInt(RegXPag)) - RegXPag + 1;
    SalesUp.Variables.CamposData({id:SalesUp.Variables.Idusuario, compartircon:SalesUp.Variables.Compartircon, texto:SalesUp.Variables.texto});
    SalesUp.Variables.MostrarIconoTipo();
    SalesUp.Variables.MostrarIconoCompartircon();
    //console.info(SalesUp.Variables.Idusuario,SalesUp.Variables.Compartircon, SalesUp.Variables.texto);
}

SalesUp.Variables.ValidaNivelUsuario=function(){
  var nivel=$('#nivel').val();
  if(nivel==3){
    $('#ListaFiltros').hide();
  }
}


SalesUp.Variables.MostrarGrupos=function(Op){
   var compartircon=(Op.v)?Op.v:-2;
   var datos=SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonGruposPlantillas.dbsp',  DataType:'json'}).jsonDatos; 
   var html='';
      // html+='<select id="grupos" class="Select" name="grupos">';
  for(var i=0; i<=datos.length-1; i++){
    var grupo=datos[i].GRUPO;
    var idgrupo=datos[i].IDUSUARIOGRUPO;
     html+='<option value ="'+idgrupo+'">'+grupo+'</option>';
  }
  $('#grupos').removeClass('ocultar');
  $('#grupos').append(html)
 

}
SalesUp.Variables.Filtros=function(Op){
    SalesUp.Variables.CargaDatosGuardo = "";
    SalesUp.Variables.GuardaValor = "";
    SalesUp.Variables.ThisG = Op;
    if(SalesUp.Variables.NoCambies!=1){
      SalesUp.Variables.ActivaMostrarFiltros();
    }else{
      SalesUp.Variables.NoCambies="";
    }
     
     $('#FiltroTipo').val(0);
     SalesUp.Variables.Idusuario=0;
     SalesUp.Variables.Compartircon=(Op.v)?Op.v:-2;
     SalesUp.Variables.texto='';
     var html='<span class="filtro Pointer Tip1" tip="Quitar filtro"  id="TextoFiltro" onclick="SalesUp.Variables.OcultarYRecargar({elemento:this});" ></span>';
    if(SalesUp.Variables.Compartircon==3){
      SalesUp.Variables.MostrarGrupos({v:SalesUp.Variables.Compartircon});
    }else{
      var texto=$('#selectGrupo option:selected').text();
      SalesUp.Sistema.MuestraEspera('#DatosLoad',1);
      setTimeout(function() {
        SalesUp.Variables.CamposData({compartircon:SalesUp.Variables.Compartircon, texto:SalesUp.Variables.texto, id:SalesUp.Variables.Idusuario});
        SalesUp.Sistema.OcultaEspera();
           $('#FiltrosActuales').html(html);
           $('#TextoFiltro').append(texto);
           SalesUp.Variables.MostrarIconoTipo();
           SalesUp.Variables.MostrarIconoCompartircon();
      }, 100);
    }
  
}
SalesUp.Variables.FiltrosBuscar=function(){
  SalesUp.Variables.Idusuario=0;
  SalesUp.Variables.Compartircon='';
  //console.info("Aqui");
  SalesUp.Variables.texto=($('#texto').val())?$('#texto').val():'';
  SalesUp.Sistema.MuestraEspera('#DatosLoad',1);
  var html='<span class="filtro Pointer Tip1" tip="Quitar filtro"  id="TextoFiltro" onclick="SalesUp.Variables.OcultarYRecargar({elemento:this});" ></span>';
  setTimeout(function() {
  SalesUp.Variables.CamposData({compartircon:SalesUp.Variables.Compartircon, texto:SalesUp.Variables.texto, id:SalesUp.Variables.Idusuario});
  SalesUp.Sistema.OcultaEspera();
  SalesUp.Variables.MostrarIconoTipo();
  SalesUp.Variables.MostrarIconoCompartircon();
  SalesUp.Variables.ActivaMostrarFiltros();
  }, 100);
  setTimeout(function() {
     $('#FiltrosActuales').html(html);
     $('#TextoFiltro').append(SalesUp.Variables.texto);
      $('#tipoFiltro').val(0);  
     }, 1003);
 
}
SalesUp.Variables.FiltrosConEnter=function(e){
  var tecla=(e.keyCode)?e.keyCode:e.which;
  $('#FiltroTipo').val(0);
  
  if(tecla==13){
    
    var valor=$('#texto').val(); 
    SalesUp.Variables.CargaDatosGuardo = "";
    SalesUp.Variables.ThisG = "";
    SalesUp.Variables.GuardaValor = valor;
    var html='<span class="filtro Pointer Tip1" tip="Quitar filtro"  id="TextoFiltro" onclick="SalesUp.Variables.OcultarYRecargar({elemento:this});" ></span>';
    
    SalesUp.Sistema.MuestraEspera('#DatosLoad',1);
    SalesUp.Variables.Idusuario=0;
    SalesUp.Variables.Compartircon='';
    SalesUp.Variables.texto=(valor)?valor:'';

    setTimeout(function() {
      SalesUp.Variables.CamposData({compartircon:SalesUp.Variables.Compartircon, texto:SalesUp.Variables.texto, id:SalesUp.Variables.Idusuario});
      SalesUp.Sistema.OcultaEspera();
      SalesUp.Variables.MostrarIconoTipo();
      SalesUp.Variables.MostrarIconoCompartircon();
      SalesUp.Variables.ActivaMostrarFiltros();
    }, 100);
       setTimeout(function() {
       $('#FiltrosActuales').html(html);
       $('#TextoFiltro').append(SalesUp.Variables.texto);      
    }, 1003);
    return false;
  }
}
SalesUp.Variables.ProcesaFiltrosConEnter=function(e){
  var valor = e;
  SalesUp.Variables.wasHere = '';
  var html='<span class="filtro Pointer Tip1" tip="Quitar filtro"  id="TextoFiltro" onclick="SalesUp.Variables.OcultarYRecargar({elemento:this});" ></span>';

  SalesUp.Sistema.MuestraEspera('#DatosLoad',1);
  SalesUp.Variables.Idusuario=0;
  SalesUp.Variables.Compartircon='';
  SalesUp.Variables.texto=(valor)?valor:'';

  setTimeout(function() {
  SalesUp.Variables.CamposData({compartircon:SalesUp.Variables.Compartircon, texto:SalesUp.Variables.texto, id:SalesUp.Variables.Idusuario});
  SalesUp.Sistema.OcultaEspera();
  SalesUp.Variables.MostrarIconoTipo();
  SalesUp.Variables.MostrarIconoCompartircon();
  }, 100);
  setTimeout(function() {
  $('#FiltrosActuales').html(html);
  $('#TextoFiltro').append(SalesUp.Variables.texto);      
  }, 1003);
}


SalesUp.Variables.ActivaMostrarFiltros = function(){
  var Activo = $('#FiltrarPor').is(':visible');
  var DetalleActivo=$('#TextoFiltro').is(':visible');
  if(DetalleActivo){$('#TextoFiltro').fadeOut();}
  //console.info(Activo);
  //AQui van los cambios.....
  if (Activo){
    $('#FiltrarPor').slideUp();
    setTimeout(function(){ $('#TiposFiltros > *').hide(); }, 400);
  }else{
    setTimeout(function(){ $('#FiltrarPor').slideDown(); $('#FiltroTipo').focus(); }, 400);
  }
}

SalesUp.Variables.MostrarFiltro = function(Op){
  var color=$('#FiltroTipo').css('backgroundColor'); 
  var Filtro = Op.Filtro;
  $('#texto').css('display', 'none');
  setTimeout(function() {
    $('#TiposFiltros > select:visible, #FiltroTexto').slideUp();
    $('#TiposFiltros > select').val('');
  }, 100);
  var $MostarFiltro;
  if(Filtro==1){
    $MostarFiltro = $('#selectUsuarios');
    SalesUp.Variables.crearSelectUsuarios();
  }
  if(Filtro==2){
    $MostarFiltro = $('#selectGrupo');
     var migrupo=$('#idgrupo').val();
     var html='<option value="0">(...Seleccionar...)</option><option value="'+migrupo+'">Mi grupo</option>';
      $('#selectGrupo').html(html);
      //$('#grupos, #texto').addClass('ocultar');
      $('#TiposFiltros > select').val('');
      setTimeout(function() {SalesUp.Variables.SoyAdministrador();}, 100);
  }
  if(Filtro==3){
    $MostarFiltro = $('#cajaTexto');
    $('#texto').val('');
    $('#texto').css('display', 'block');
    $('#cajaTexto').css('display', 'none');
    $('#cajaTexto').css('display', 'block');

    $('#texto').css('backgroundColor', color);

    

  }

  setTimeout(function(){ $MostarFiltro.slideDown(); $('#texto').css('backgroundColor', color);}, 400);
  setTimeout(function(){ $MostarFiltro.focus(); $MostarFiltro.find('input').focus(); }, 1000);
}



SalesUp.Variables.ValidarNivel=function(){
  var nivel=$('#nivel').val();
  if(nivel==3){
    $('#FiltroTipo option[value=2]').remove();
  }
}


$(function(){
   SalesUp.Variables.CamposData({tku:SalesUp.Variables.Tku, compartircon:SalesUp.Variables.Compartircon, texto:SalesUp.Variables.texto});
   SalesUp.Variables.ValidarConfigCorreo();
   setTimeout(function() {SalesUp.Variables.MostrarIconoTipo();}, 100);
   SalesUp.Variables.MostrarIconoCompartircon();

});





 
