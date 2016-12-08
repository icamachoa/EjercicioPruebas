var control = SalesUp.Sistema.queControl();

SalesUp.Variables.BotonNuevaCarpeta = $('#BtnNuevaCarpeta').clone();
SalesUp.Variables.BotonSubirDocumento = $('#BtnSubirDocumento').clone();
SalesUp.Variables.BotonSubirImagen = $('#BtnSubirImagen').clone();
SalesUp.Variables.BotonSubirPlantilla = $('#BtnSubirPlantilla').clone();

$('#BotonesComodin').remove();

SalesUp.Variables.HtmlNuevaCarpeta = '';
SalesUp.Variables.HtmlNuevaCarpeta += '<div class="BoxDoc p10 tCen BoxSizing Transition BoxNuevaCarpeta">';
SalesUp.Variables.HtmlNuevaCarpeta += '<i class="Pointer fa fa-3x fa-folder"></i>';
SalesUp.Variables.HtmlNuevaCarpeta += '<p class="DocDescripcion Ellipsis w100">';
SalesUp.Variables.HtmlNuevaCarpeta += '<input placeholder="Nueva carpeta" type="text" id="InputNombreCapeta" onkeyup="SalesUp.Variables.GuardaNombreCarpeta({e:event, Elemento:this, Nombre:value});" class="w85 tCen"/>';
SalesUp.Variables.HtmlNuevaCarpeta += '<span class="w15" id="GuardarCarpeta" onclick="SalesUp.Variables.GuardaNombreCarpeta({e:event, Elemento:this})"><i class="fa Pointer fa-lg fa-save"></i></span>';
SalesUp.Variables.HtmlNuevaCarpeta += '<div class="clear"></div><span id="ErrorExiste" class="Rojo Bold"></span>';
SalesUp.Variables.HtmlNuevaCarpeta += '</p>';
SalesUp.Variables.HtmlNuevaCarpeta += '<p class="InfoFecha">Vacio</p>';
SalesUp.Variables.HtmlNuevaCarpeta += '<div class="AccionesDoc tCen w100">';
SalesUp.Variables.HtmlNuevaCarpeta += '<span tip="Editar nombre" class="Pointer Tip1"><i class="fa fa-lg fa-edit"></i></span>';
SalesUp.Variables.HtmlNuevaCarpeta += '<span tip="Eliminar carpeta" class="Pointer Tip1"><i class="fa fa-lg fa-trash-o"></i></span>';
SalesUp.Variables.HtmlNuevaCarpeta += '</div>';
SalesUp.Variables.HtmlNuevaCarpeta += '</div>';

SalesUp.Variables.TodosArchivos = {Descripcion:''};
SalesUp.Variables.CarpetaActual = 0;


SalesUp.Variables.SubirArchivo = function(Op){
  var CarpetaActual = SalesUp.Variables.CarpetaActual;
  console.info(CarpetaActual, 'CarpetaActual');
  var Desde = '';
  if(Op.Tipo===0){
    var DesdeCompose = '';
    (Op.DesdeCompose) ? DesdeCompose = '&DesdeCompose=1':'';
    SalesUp.Sistema.AbrePopUp({Titulo:'Subir documento',Pagina:'/privado/popup_documento.dbsp', Parametros:'CarpetaActual='+CarpetaActual+DesdeCompose, CallBack:'SalesUp.Variables.CargaListaArchivos', Modal:true, ModalAlt:true, Alto:190, Ancho:450});
  }else if(Op.Tipo===1){ 
    var DesdeTiny = '';
    (Op.DesdeTiny) ? DesdeTiny = '&DesdeTiny=1':'';
    SalesUp.Sistema.AbrePopUp({Titulo:'Subir imagen',Pagina:'/privado/popupSubirImagen.dbsp', Parametros:'CarpetaActual='+CarpetaActual+DesdeTiny, CallBack:'SalesUp.Variables.CargaListaArchivos', Modal:true, ModalAlt:true, Alto:100, Ancho:450});
  }else{
    (Op.Desde) ? Desde = '&DesdePlantilla=1':'';
    SalesUp.Sistema.AbrePopUp({Titulo:'Subir formato',Pagina:'/privado/popupSubirPlantilla.dbsp', Parametros:'CarpetaActual='+CarpetaActual+Desde, CallBack:'SalesUp.Variables.CargaListaArchivos', Modal:true, ModalAlt:true, Alto:130, Ancho:450});
  }
}

SalesUp.Variables.CargaDocumentos = function(){
  var $path = $('#PathArchivos');
  $('.ui-tabs-panel').html('');
  $('#InputBuscarArchivo').val('');
  $('#BuscarEn').find('option[value="1"]').html('En todo [Documentos]');
  $path.html('').hide();
  ($path.find('li').length) ? $path.show() : '';
  $('#Tabs .breadcrumb').hide();
  SalesUp.Variables.CarpetaActual = 0;
  SalesUp.Variables.CargaListaArchivos({TipoArchivo:0});
}

SalesUp.Variables.CargaImagenes = function(){
  var $path = $('#PathImagenes');
  $('.ui-tabs-panel').html('');
  $('#InputBuscarArchivo').val('');
  $('#BuscarEn').find('option[value="1"]').html('En todo [Imágenes]');
  $path.html('').hide();
  ($path.find('li').length) ? $path.show() : '';
  $('#Tabs .breadcrumb').hide();
  SalesUp.Variables.CarpetaActual = 0;
  SalesUp.Variables.CargaListaArchivos({TipoArchivo:1});
}

SalesUp.Variables.CargaPlantillas = function(){
  var $path = $('#PathPlantillas');
  $('.ui-tabs-panel').html('');
  $('#InputBuscarArchivo').val('');
  $('#BuscarEn').val(0).find('option[value="1"]').html('En todo [Formatos]');
  $path.html('').hide();
  ($path.find('li').length) ? $path.show() : '';
  $('#Tabs .breadcrumb').hide();
  SalesUp.Variables.CarpetaActual = 0;
  SalesUp.Variables.CargaListaArchivos({TipoArchivo:2});
}

SalesUp.Variables.CargaListaArchivos = function(Op){
  SalesUp.Sistema.BorrarItemDeAlmacen('TemplateArchivos');
  SalesUp.Sistema.BorrarItemDeAlmacen('TemplateArchivosSeleccionar');
  
  if(!Op){ Op = {}; }
  var idca = 0;
  var tArchivo = 0;
  var Contenedor = '';
  var load = '<div class=" p10 tCen Italic w100"><i class="fa fa-2x fa-spinner fa-spin"></i><br/>Cargando documentos</div>';
  var vacio = '<div onclick="SalesUp.Variables.SubirArchivo({Tipo:0});" class="BoxDoc p10 w100 tCen BoxSizing Transition BoxCarpetaVacia"><i class="Pointer fa fa-3x fa-file-o"></i><p class="DocDescripcion Ellipsis w100">Agregar documento</p><div class="clear"></div></div>';
  (Op.IdCarpeta) ? idca = Op.IdCarpeta : '';
  (Op.TipoArchivo) ? tArchivo = Op.TipoArchivo : '';
  SalesUp.Variables.tiposArchivo = tArchivo;
  if(tArchivo==1){
    load = SalesUp.Sistema.StrReplace('documentos','Imagenes',load);
    vacio = SalesUp.Sistema.StrReplace('documento','imagen',vacio);
    vacio = SalesUp.Sistema.StrReplace('fa-file-o','fa-file-picture-o',vacio);
    vacio = SalesUp.Sistema.StrReplace('SubirArchivo({Tipo:0});','SubirArchivo({Tipo:1});',vacio);
    $('#ContImagenes').html(load);
  }else if(tArchivo==0){
    $('#ContDocumentos').html(load);
  }else{
    load = SalesUp.Sistema.StrReplace('documentos','formatos',load);
    vacio = SalesUp.Sistema.StrReplace('documento','formato',vacio);
    vacio = SalesUp.Sistema.StrReplace('SubirArchivo({Tipo:0});','SubirArchivo({Tipo:2});',vacio);
    if(Op.SeleccionarArchivos){
      vacio = SalesUp.Sistema.StrReplace('Agregar plantilla','Carpeta vacía',vacio);
      vacio = SalesUp.Sistema.StrReplace('onclick="SalesUp.Variables.SubirArchivo({Tipo:2});"','',vacio);
    }

    $('#ContPlantillas').html(load);
  }
  
  var OrigenTemplate = 'TemplateArchivos.dbsp', AlmacenTemplate = 'TemplateArchivos';
  
  if(Op.SeleccionarArchivos){
    OrigenTemplate = 'TemplateArchivosSeleccionar.dbsp';
    AlmacenTemplate = 'TemplateArchivosSeleccionar';
  }
  
  setTimeout(function() {
    var jsonImagenes, jsonArchivos, jsonPlantillas;
    var jsonCarpetasImagenes, jsonCarpetasArchivos, jsonCarpetasPlantillas;

    var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonListaArchivosEmpresa.dbsp', Parametros:'idca='+idca+'&ta='+tArchivo, DataType:'json'});
    var template = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/'+OrigenTemplate, Almacenamiento:AlmacenTemplate});
    SalesUp.Variables.HtmlArchivos = template;
    var jsonCarpetas = json.Carpetas;
    json = _.reject(json.jsonDatos , function(j){ return _.size(j) == 0; });
    jsonCarpetas = _.reject(jsonCarpetas , function(j){ return _.size(j) == 0; });

    if(tArchivo==1){
      Contenedor = '#ContImagenes';
      $(Contenedor).html('');
      jsonImagenes =  _.where(json, {Imagenes:'1'});
      jsonCarpetasImagenes = _.where(jsonCarpetas, {CarpetaImagenes:'1'});
      jsonImagenes = _.union( jsonCarpetasImagenes, jsonImagenes);
      SalesUp.Variables.jsonArchivosCarpetaActual = jsonImagenes;
      SalesUp.Construye.ReemplazaTemplate({Destino:Contenedor, Template:template, Datos:jsonImagenes});
      if(_.size(jsonImagenes)==0){$(Contenedor).prepend(vacio);} 
      
    }else if(tArchivo==0){
      
      Contenedor = '#ContDocumentos';
      $(Contenedor).html('');
      jsonArchivos =  _.where(json, {Documentos:'1'});
      jsonCarpetasArchivos = _.where(jsonCarpetas, {CarpetaDocumentos:'1'});
      jsonArchivos = _.union( jsonCarpetasArchivos, jsonArchivos);
      SalesUp.Variables.jsonArchivosCarpetaActual = jsonArchivos;
      SalesUp.Construye.ReemplazaTemplate({Destino:Contenedor, Template:template, Datos:jsonArchivos});
      if(_.size(jsonArchivos)==0){$(Contenedor).prepend(vacio);}
    }else{
      
      Contenedor = '#ContPlantillas';
      $(Contenedor).html('');
      jsonPlantillas =  _.where(json, {Plantillas:'1'});
      jsonCarpetasPlantillas = _.where(jsonCarpetas, {CarpetaPlantillas:'1'});
      jsonPlantillas = _.union( jsonCarpetasPlantillas, jsonPlantillas);
      SalesUp.Variables.jsonArchivosCarpetaActual = jsonPlantillas;
      SalesUp.Construye.ReemplazaTemplate({Destino:Contenedor, Template:template, Datos:jsonPlantillas});
      if(_.size(jsonPlantillas)==0){$(Contenedor).prepend(vacio);}
    }
    
    if(jsonPlantillas){ SalesUp.Variables.TodosArchivos = _.union(SalesUp.Variables.TodosArchivos, jsonPlantillas); }
    if(jsonArchivos){ SalesUp.Variables.TodosArchivos = _.union(SalesUp.Variables.TodosArchivos, jsonArchivos); }
    if(jsonImagenes){ SalesUp.Variables.TodosArchivos = _.union(SalesUp.Variables.TodosArchivos, jsonImagenes); }

    /*jsonArchivos = _.sortBy(jsonArchivos , function(j){ return j.Descripcion; });*/
    if(SalesUp.Variables.niveldocumento==2){
      $('#ContDocumentos .BoxBotones, #ContImagenes .BoxBotones, #ContPlantillas .BoxBotones').remove();
      $('#ContDocumentos, #ContImagenes, #ContPlantillas').append('<div class="clear"></div><div class="BoxBotones w100"></div>');
      $('#ContDocumentos .BoxBotones, #ContImagenes .BoxBotones, #ContPlantillas .BoxBotones').append(SalesUp.Variables.BotonNuevaCarpeta);
      $('#ContDocumentos .BoxBotones').append(SalesUp.Variables.BotonSubirDocumento);
      $('#ContImagenes .BoxBotones').append(SalesUp.Variables.BotonSubirImagen);
      $('#ContPlantillas .BoxBotones').append(SalesUp.Variables.BotonSubirPlantilla);
      

      ($('#PathImagenes li').length==3) ? $('#ContImagenes .BoxBotones #BtnNuevaCarpeta').hide() : '';
      ($('#PathArchivos li').length==3) ? $('#ContDocumentos .BoxBotones #BtnNuevaCarpeta').hide() : '';
      ($('#PathPlantillas li').length==3) ? $('#ContPlantillas .BoxBotones #BtnNuevaCarpeta').hide() : '';
    }
    
    SalesUp.Sistema.RestriccionesCorporativo();
    SalesUp.Sistema.IniciaPlugins();
  }, 10);

}/*SalesUp.Variables.CargaListaArchivos*/

SalesUp.Variables.NuevaCarpeta = function(){
  $('.BoxNuevaCarpeta, .BoxCarpetaVacia').remove();
  $TabPanel = $('.ui-tabs-panel:visible');
  $(window).scrollTop(0);

  SalesUp.Variables.TipoCarpeta = 0;
  if($TabPanel.attr('id')=='ContImagenes'){ SalesUp.Variables.TipoCarpeta = 1;}
  if($TabPanel.attr('id')=='ContPlantillas'){ SalesUp.Variables.TipoCarpeta = 2;}
  $TabPanel.prepend(SalesUp.Variables.HtmlNuevaCarpeta);
  setTimeout(function(){$('#InputNombreCapeta').focus();}, 100);
}/*SalesUp.Variables.NuevaCarpeta*/

SalesUp.Variables.GuardaNombreCarpeta = function(Op){
  $('#ErrorExiste').hide();
  $Elemento = $(Op.Elemento);
  console.info(Op);
  $Padre = $Elemento.closest('.BoxNuevaCarpeta');
  var TipoEvento = Op.e.type;
  var NombreCarpeta = '';
  var Editar = false;
  var idCarpeta = 0;
  var TipoCarpeta = '';
  (Op.id) ? idCarpeta = Op.id : '';
  (Op.Editar==1) ? Editar = true: '';
  (Op.TipoCarpeta) ? TipoCarpeta = Op.TipoCarpeta : '';

  if(TipoEvento=='keyup'){
    if(SalesUp.Sistema.NumKeyCode(Op.e)===27){$Padre.remove();}
    if(SalesUp.Sistema.NumKeyCode(Op.e)!=13){return false;}
    NombreCarpeta = Op.Nombre;
  }

  if(TipoEvento=='click'){
    $Elemento.find('.fa-save').addClass('fa-spinner fa-spin');
    NombreCarpeta = $('#InputNombreCapeta').val();

  }
  if(Editar){
    $Padre = $Elemento.closest('.BoxEditarCarpeta');
    NombreCarpeta = $('#InputNombreCapeta.ca'+idCarpeta).val();
    
    var Existe =  _.filter(SalesUp.Variables.TodosArchivos, function(j){ 
        if((j.Descripcion.toLowerCase() === NombreCarpeta.toLowerCase())&&(j.IdPadre == SalesUp.Variables.CarpetaActual)&&(j.IdCarpeta!=idCarpeta)&&(SalesUp.Variables.TipoCarpeta == j.TipoCarpeta)){return j;}
    });

    if(_.size(Existe)>0){ $Elemento.find('.fa-save').removeClass('fa-spinner fa-spin'); $Padre.find('#ErrorExiste').show().html('El nombre "'+NombreCarpeta+'" ya existe. Por favor, elija otro.'); $Elemento.focus().select(); return false; }
    var DatosCarpeta = 'tc='+TipoCarpeta+'&idca='+SalesUp.Variables.CarpetaActual+'&FolderCarpeta='+escape($.trim(NombreCarpeta))+'&carpetaId='+idCarpeta;
    
    SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryGuardaCarpeta.dbsp', Parametros:DatosCarpeta});  
    
  }else{

    var Existe =  _.filter(SalesUp.Variables.TodosArchivos, function(j){
      if((j.Descripcion.toLowerCase() === NombreCarpeta.toLowerCase())&&(j.IdPadre == SalesUp.Variables.CarpetaActual)&&(SalesUp.Variables.TipoCarpeta == j.TipoCarpeta)){return j;}
    });

    if(_.size(Existe)>0){ $Elemento.find('.fa-save').removeClass('fa-spinner fa-spin'); $('#ErrorExiste').show().html('El nombre "'+NombreCarpeta+'" ya existe. Por favor, elija otro.'); $Elemento.focus().select(); return false; }
    var DatosCarpeta = 'tc='+SalesUp.Variables.TipoCarpeta+'&idca='+SalesUp.Variables.CarpetaActual+'&FolderCarpeta='+escape(NombreCarpeta);
    SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryGuardaCarpeta.dbsp', Parametros:DatosCarpeta});  
  }

  SalesUp.Variables.CargaListaArchivos({IdCarpeta:SalesUp.Variables.CarpetaActual, TipoArchivo:SalesUp.Variables.TipoCarpeta});
}/*SalesUp.Variables.GuardaNombreCarpeta*/

SalesUp.Variables.AbreCarpeta = function(Op){
  
  if(SalesUp.Variables.CarpetaActual==Op.idca){return false;}
  SalesUp.Variables.CarpetaActual = Op.idca;
  $('#InputBuscarArchivo').val('');
  SalesUp.Variables.Path({IdCa:Op.idca, Path:Op.Path, TipoCarpeta:Op.TipoCarpeta });
  SalesUp.Variables.CargaListaArchivos({IdCarpeta:Op.idca, TipoArchivo:Op.TipoCarpeta});
}

SalesUp.Variables.Path = function(Op){
  var $path = $('#PathArchivos');

  var tCarpeta = parseInt(Op.TipoCarpeta); 
  (_.isNaN(tCarpeta)) ? tCarpeta = 0 : '';
  (tCarpeta==1) ? $path = $('#PathImagenes') : '';
  (tCarpeta==2) ? $path = $('#PathPlantillas') : '';

  $path.show();
  var paths = $path.find('li').length;
  var onclick = '';
  var CargaHome = 'CargaDocumentos';
  
  (tCarpeta==1) ? CargaHome = 'CargaImagenes' : '';
  (tCarpeta==2) ? CargaHome = 'CargaPlantillas' : '';

  var Home = '<li onclick="SalesUp.Variables.'+CargaHome+'();" class="Pointer"><i class="fa fa-home fa-lg"></i>  Raíz</li>';
  var AbreCarpeta = 'AbreCarpeta';

  (Op.DesdeSeleccionar) ? Home = '' : '';
  (Op.DesdeSeleccionar) ? AbreCarpeta = 'AbreCarpetaSeleccionar' : '';
  
  (paths==0) ? onclick = 'onclick="SalesUp.Variables.'+AbreCarpeta+'({idca:'+Op.IdCa+', Path:'+"'"+Op.Path+"'"+', TipoCarpeta:'+"'"+tCarpeta+"'"+'  });" class="Pointer"': '';
  
  var Carpeta = ( (paths==0) ? Home : '' )+'<li '+onclick+' ><i class="fa fa-folder-open fa-lg"></i> '+Op.Path+'</li>';
  if(paths==3){ Carpeta = Home + Carpeta; $path.html(''); }
  $path.append(Carpeta);
  if((Op.Path=='Documentos')||(Op.Path=='Imagenes')||(Op.Path=='Plantillas')){
    $path.html('').hide();
  }
}

SalesUp.Variables.EditarDocumento = function(Op){
  var tipo = 0;
  (Op.TipoArchivo) ? tipo = Op.TipoArchivo : '';
  SalesUp.Sistema.AbrePopUp({
    Titulo:'Modificar documento',
    Pagina:'popup_documento_editar.dbsp',
    Parametros:'EL_IDDOC='+Op.id+'&tipoarchivo='+tipo,
    CallBack:'SalesUp.Variables.CargaListaArchivos',
    Modal:true, ModalAlt : true, Alto:190, Ancho:450
  });
}

SalesUp.Variables.ConfirmaEliminarArchivo = function(Op){
  
  var Eliminar = 'EliminarArchivo';
  (Op.esCompartido=='1') ? Eliminar = 'AdvertenciaDocumentos' : '';
  SalesUp.Construye.MuestraAlerta({
    TipoAlerta:'AlertaPregunta',
    Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/> ¿Desea eliminar "'+Op.Descripcion+'"?',
    Boton1:'Eliminar',
    Boton2:'Cancelar',
    Callback1:'SalesUp.Variables.'+Eliminar+'({ archivo:true, id:'+Op.id+', tipo:'+"'"+Op.tipo+"'"+' })',
    Icono1:'<i class="fa fa-trash"></i>',
    Icono2:'<i class="fa fa-times"></i>',
    Ancho:'500px'
  });
}

SalesUp.Variables.EliminarArchivo = function(Op){
  
  var Eliminar =  _.filter(SalesUp.Variables.TodosArchivos, function(j){
    if(j.IdDocumento == Op.id ){return j;}
  });

  Eliminar = Eliminar[0];
  
  var CarpetaEmpresa = Eliminar.CarpetaEmpresa;
  var Archivo = Eliminar.Archivo;
  var IdEmpresa = Eliminar.IdEmpresa;
  var DatosEliminarFenix = 'archivo='+Archivo+'&idempresa='+IdEmpresa;
  
  SalesUp.Sistema.CargaDatos({Link:'https://fenix.salesup.com.mx/aws/eliminaArchivo.php', Parametros:DatosEliminarFenix });
  SalesUp.Sistema.CargaDatos({Link:'/privado/eliminar_documento.dbsp', Parametros:'iddocumento='+Op.id});
  SalesUp.Variables.CargaListaArchivos({IdCarpeta:SalesUp.Variables.CarpetaActual, TipoArchivo:Op.tipo});


}

SalesUp.Variables.EditarCarpeta = function(Op){
  var $Elemento = $(Op.Elemento);
  var $Padre = $Elemento.closest('.BoxDoc');
  $Padre.addClass('BoxEditarCarpeta'); 
  $Padre.find('#InputNombreCapeta').focus().select();
}

SalesUp.Variables.CancelarEditarCarpeta = function(Op){
  var $Elemento = $(Op.Elemento);
  var $Padre = $Elemento.closest('.BoxDoc');
  $Padre.removeClass('BoxEditarCarpeta'); 
  $('#InputNombreCapeta.ca'+Op.id).val(Op.Original);
  $('#ErrorExiste.ca'+Op.id).hide();
}

SalesUp.Variables.ConfirmaEliminarCarpeta = function(Op){
  var Eliminar = 'EliminarCarpeta';
  (Op.esCompartido=='1') ? Eliminar = 'AdvertenciaDocumentos' : '';

  var AlertasArchivos = '';
  if(Op.Archivos!='Vacio'){
    AlertasArchivos = '<br/><br/><span class="Rojo">Nota: Esta carpeta contiene '+Op.Archivos+' estos también serán eliminados</span>';
  }

  SalesUp.Construye.MuestraAlerta({
    TipoAlerta:'AlertaPregunta',
    Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/> ¿Desea eliminar la carpeta de "'+Op.Descripcion+'"?'+AlertasArchivos,
    Boton1:'Eliminar',
    Boton2:'Cancelar',
    Callback1:'SalesUp.Variables.'+Eliminar+'({ carpeta:true, id:'+Op.id+', tipo:'+"'"+Op.tipo+"'"+' })',
    Icono1:'<i class="fa fa-trash"></i>',
    Icono2:'<i class="fa fa-times"></i>',
    Ancho:'500px', Id:'AlertaEliminar'+Op.id
  });
}

SalesUp.Variables.EliminarCarpeta = function(Op){
  $('#AlertaEliminar'+Op.id+' .BodyContenido').append('<br/><br/>Eliminando... Esto puede llegar a tardar unos segundos<br/><br/><i class="fa fa-spin fa-spinner fa-2x"></i>');
  setTimeout(function(){
    var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonListaArchivosEmpresa.dbsp', Parametros:'idca='+Op.id+'&ta='+Op.tipo, DataType:'json'});
    var Documentos = json.jsonDatos;
    var Carpetas = json.Carpetas;
    var DocumentosHijos = {};
    Carpetas = _.reject(Carpetas , function(j){ return _.size(j) == 0; });
    
    if(_.size(Carpetas)>0){
      for(var i = 0; i < Carpetas.length; i++){
        var id = Carpetas[i].IdCarpeta;
        var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonListaArchivosEmpresa.dbsp', Parametros:'idca='+id+'&ta='+Op.tipo, DataType:'json'});
        DocumentosHijos = _.union(DocumentosHijos, json.jsonDatos);
      };  
    }
    
    Documentos = _.union(Documentos, DocumentosHijos);
    Documentos = _.reject(Documentos , function(j){ return _.size(j) == 0; });
    
    if(_.size(Documentos)>0){
      for(var i = 0; i < Documentos.length; i++){
        var IdEmpresa = Documentos[i].IdEmpresa;
        var Archivo = Documentos[i].Archivo;
        var DatosEliminarFenix = 'archivo='+Archivo+'&idempresa='+IdEmpresa;
        
        SalesUp.Sistema.CargaDatos({Link:'http://fenix.salesup.com.mx/aws/eliminaArchivo.php', Parametros:DatosEliminarFenix });
      };
    }
    
    SalesUp.Sistema.CargaDatos({Link:'/privado/eliminar_documento.dbsp', Parametros:'idCarpeta='+Op.id});
    SalesUp.Variables.CargaListaArchivos({IdCarpeta:SalesUp.Variables.CarpetaActual, TipoArchivo:Op.tipo});
  }, 10);
    
}/*SalesUp.Variables.EliminarCarpeta*/


SalesUp.Variables.CargaListaParaSeleccionarArchivos = function(Op){
  Op.SeleccionarArchivos=true;
  SalesUp.Variables.CargaListaArchivos(Op);
}/*SalesUp.Variables.CargaListaParaSeleccionarArchivos*/

SalesUp.Variables.AbreCarpetaSeleccionar = function(Op){
  
  if(SalesUp.Variables.CarpetaActual==Op.idca){return false;}
  SalesUp.Variables.CarpetaActual = Op.idca;
  
  SalesUp.Variables.Path({IdCa:Op.idca, Path:Op.Path, TipoCarpeta:Op.TipoCarpeta, DesdeSeleccionar:true });
  SalesUp.Variables.CargaListaParaSeleccionarArchivos({IdCarpeta:Op.idca, TipoArchivo:Op.TipoCarpeta});

  if(Op.TipoCarpeta=='1'){
    var path = $('#PathImagenes').html();
    var raiz = '<li class="Pointer" onclick="$(\'#PathImagenes\').html(\'\'); SalesUp.Variables.CargaListaParaSeleccionarArchivos({TipoArchivo:1});"><i class="fa fa-home fa-lg"></i> Raíz</li>';
    path = SalesUp.Sistema.StrReplace(raiz,'',path);
    path = raiz+path;
    $('#PathImagenes').html(path);
  }

  if(Op.TipoCarpeta=='0'){
    var path = $('#PathArchivos').html();
    var raiz = '<li class="Pointer" onclick="$(\'#PathArchivos\').html(\'\'); SalesUp.Variables.CargaListaParaSeleccionarArchivos({TipoArchivo:0});"><i class="fa fa-home fa-lg"></i> Raíz</li>';
    path = SalesUp.Sistema.StrReplace(raiz,'',path);
    path = raiz+path;
    $('#PathArchivos').html(path);
  }

  if(Op.TipoCarpeta=='2'){
    var path = $('#PathPlantillas').html();
    var raiz = '<li class="Pointer" onclick="$(\'#PathPlantillas\').html(\'\'); SalesUp.Variables.CargaListaParaSeleccionarArchivos({TipoArchivo:2});"><i class="fa fa-home fa-lg"></i> Raíz</li>';
    path = SalesUp.Sistema.StrReplace(raiz,'',path);
    path = raiz+path;
    $('#PathPlantillas').html(path);
  }

}

SalesUp.Variables.SeleccionarArchivo = function(Op){
  $Elemento = $(Op.e);
  $Padre = $Elemento.closest('.BoxDoc');
  (Op.EsPlantilla) ? $('.BoxDoc.ArchivoSeleccionado').removeClass('ArchivoSeleccionado'):'';
  $Padre.toggleClass('ArchivoSeleccionado');
  var n = $('.BoxSeleccionarArchivos .ArchivoSeleccionado').length;
  var TextoSeleccionado = n +' archivo seleccionado';
  (n>1) ? TextoSeleccionado = n +' archivos seleccionados' : '';
  (n==0) ? TextoSeleccionado = '' : '';
  (Op.EsPlantilla) ? TextoSeleccionado = $Elemento.find('i[data-descripcion]').attr('data-descripcion') : '';
  (Op.EsPlantilla) ? $('#NumeroSeleccionados').addClass(''):'';
  $('#NumeroSeleccionados').html(TextoSeleccionado);
}

SalesUp.Variables.InsertarSeleccionados = function(Op){
  if(Op.Desde=='Tiny'){
    SalesUp.Variables.InsertarImagenDesdeTiny();    
  }

  if((Op.Desde=='Compose')||(Op.Desde=='NuevoCompose')){
    SalesUp.Variables.InsertarDocumentosDesdeCompose(Op);
  }

  if((Op.Desde=='Plantillas')||(Op.Desde=='CrearDocumento')){
    SalesUp.Variables.SeleccionarPlantilla();
  }
}

SalesUp.Variables.InsertarImagenDesdeTiny = function(){
  /*NOTA -- SalesUp.Variables.editorTinymce se genera al dar click en el boton del tiny */
  var $Seleccionado = $('.BoxSeleccionarArchivos .ArchivoSeleccionado');
  
  for (var i = 0; i <= $Seleccionado.length; i++){
    var $Img = $($Seleccionado[i]).find('img');
    var Fuente = $Img.attr('src');
    if(Fuente){
      self.parent.SalesUp.Variables.editorTinymce.insertContent('<img src="'+Fuente+'" alt="SalesUp!">');      
    }
  };

  self.parent.SalesUp.Variables.editorTinymce.windowManager.close();
}

SalesUp.Variables.InsertarDocumentosDesdeCompose = function(Op){
  
  var desde = Op.Desde;
  var $Seleccionado = $('.BoxSeleccionarArchivos .ArchivoSeleccionado');
  var LtArchivosAgregados = '';
  var $LtArchivosAgregados = self.parent.$('#LtArchivosAgregados');
  var adp = 0;
  if(SalesUp.Variables.ArchivosDelProspecto){
    $LtArchivosAgregados = self.parent.$('#LtArchivosAgregadosProspecto');
    adp = 1;
  }

  var YaSeleccionados = $LtArchivosAgregados.val();
  LtArchivosAgregados = YaSeleccionados;
  var splitYaSeleccionados = [];

  if(YaSeleccionados){
    splitYaSeleccionados = YaSeleccionados.split('|');
  }
  
  for (var nSel = 0; nSel <= $Seleccionado.length-1; nSel++){
    var $Doc = $($Seleccionado[nSel]).find('i[data-archivo]');
    var Archivo = $Doc.attr('data-archivo');
    var UrlFija = $Doc.attr('data-UrlFija');
    (UrlFija!='') ? Archivo = UrlFija : '';

    var Descripcion = $Doc.attr('data-descripcion');
    var pasa = true;
    
    if(_.size(splitYaSeleccionados)>0){
      for (var spSel = 0; spSel <= splitYaSeleccionados.length - 1; spSel++){
        if(splitYaSeleccionados[spSel]==Archivo){pasa = false;}
      }
    }

    if(pasa){
      if(Archivo){LtArchivosAgregados += Archivo+'|';}
      var BoxArchivo = '<div data-Archivo="{{Archivo}}" class="MultiFile-label DesdeNube" onclick="SalesUp.Variables.QuitarArchivoAgregado({e:this, adp:\''+adp+'\', Archivo:\'{{Archivo}}|\' });"><span class="MultiFile-title"><i class="fa fa-times Pointer"></i> {{Descripcion}}</span></div>';
      if(desde=='NuevoCompose'){
        BoxArchivo = '<div data-Archivo="{{Archivo}}" class="MultiFile-label DesdeNube" onclick="SalesUp.Correo.quitarArchivoAgregado({e:this, adp:\''+adp+'\', Archivo:\'{{Archivo}}|\' });"><span class="MultiFile-title"><i class="fa fa-times Pointer"></i> {{Descripcion}}</span></div>';
      }
      BoxArchivo = SalesUp.Sistema.StrReplace('{{Archivo}}',Archivo,BoxArchivo);
      BoxArchivo = SalesUp.Sistema.StrReplace('{{Descripcion}}',Descripcion,BoxArchivo);
      self.parent.$('#listafile').append(BoxArchivo);
    }
  };
  
  self.parent.$('#listafile').show();
  $LtArchivosAgregados.val(LtArchivosAgregados);

  if(desde=='NuevoCompose'){
    SalesUp.Variables.CerrarModalDocumentos('#AgregarAdjuntosNube');
  }else if(desde=='Compose'){
    SalesUp.Variables.CerrarAlertaPreguntaCompose();
  }else{
    SalesUp.Variables.CerrarAdjuntosNube();
  }
}/*InsertarDocumentosDesdeCompose*/

SalesUp.Variables.SeleccionarPlantilla = function(){
  var $Seleccionado = $('.BoxSeleccionarArchivos .ArchivoSeleccionado');
  var PlantillaSeleccionada = '', PlantillaNombre = '';
  
  for (var i = 0; i <= $Seleccionado.length-1; i++){
    var $Doc = $($Seleccionado[i]).find('.info-archivo[data-archivo]');
    PlantillaSeleccionada = $Doc.attr('data-iddoc');
    PlantillaNombre = $Doc.attr('data-descripcion');
    tProductos = parseInt($Doc.attr('data-tProductos'));
  };
  
  if(!PlantillaSeleccionada){ SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'Debe seleccionar una plantilla'}); return false; }

  self.parent.$('#tProductos').val(tProductos);
  self.parent.$('#PlantillaSeleccionada').val(PlantillaSeleccionada);
  self.parent.$('#PlantillaNombre').val(PlantillaNombre);
  //SalesUp.Variables.CerrarAlertaPreguntaCompose();
  SalesUp.Variables.CerrarModalDocumentos('#SeleccionarPlantilla');

  /*Se ejecute en el padre para q este disponible*/
  self.parent.SalesUp.Documentos.EtiquetasDelDocumento();
}

SalesUp.Variables.CerrarDesdeTiny = function(Op){
  var Desde = Op.Desde;
  if(Desde=='Tiny'){
    self.parent.SalesUp.Variables.editorTinymce.windowManager.close();
  }

  if((Desde=='Compose')){
    SalesUp.Variables.CerrarAlertaPreguntaCompose();
  }

  if (Desde == 'Plantillas') {
    SalesUp.Variables.CerrarModalDocumentos('#SeleccionarPlantilla');
  };

  if(Desde=='CrearDocumento'){
    self.parent.SalesUp.Variables.CerrarPopUp();
  }

  if((Desde=='NuevoCompose')){
    SalesUp.Variables.CerrarModalDocumentos('#AgregarAdjuntosNube');
  }
}

SalesUp.Variables.CerrarModalDocumentos = function(idModal){
  var $pop = self.parent.$(idModal);
  var $Padre = $pop.find('.ContenedorModal').addClass('BounceCloseOut');

  setTimeout(function(){ $pop.remove(); }, 1200);
}

SalesUp.Variables.CerrarAlertaPreguntaCompose = function(){
  var $Padre = self.parent.$('.ModalNotification .ContenedorModal');
  var $Overlay = self.parent.$('.ModalNotification');
  $Padre.addClass('BounceCloseOut');
  setTimeout(function(){ $Overlay.remove(); }, 1200);
}


SalesUp.Variables.CargaListaArchivosProspectos = function(Op){
  SalesUp.Variables.TodosArchivos = {Descripcion:''};
  SalesUp.Variables.CarpetaActual = 0;
  SalesUp.Variables.tiposArchivo = 0;
  SalesUp.Variables.ArchivosDelProspecto = true;
  if(!Op){ Op = {}; }
  var idca = 0;
  var tArchivo = 0;
  var Contenedor = '';
  var load = '<div class=" p10 tCen Italic w100"><i class="fa fa-2x fa-spinner fa-spin"></i><br/>Cargando archivos</div>';
  var vacio = '<div class="BoxDoc p10 w100 tCen BoxSizing Transition BoxCarpetaVacia"><i class="Pointer fa fa-3x fa-file-o"></i><p class="DocDescripcion Ellipsis w100">El contacto no tiene archivos agregados</p><div class="clear"></div></div>';
  $('#ContDocumentos').html(load);

  OrigenTemplate = 'TemplateArchivosSeleccionar.dbsp';
  AlmacenTemplate = 'TemplateArchivosSeleccionar';

  setTimeout(function() {
    var jsonImagenes, jsonArchivos, jsonPlantillas;
    var jsonCarpetasImagenes, jsonCarpetasArchivos, jsonCarpetasPlantillas;

    var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonListaArchivosProspecto.dbsp', Parametros:'idp='+idp+'&ido='+ido+'&tkp='+tkp+'&tko='+tko, DataType:'json'});
    var template = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/'+OrigenTemplate, Almacenamiento:AlmacenTemplate});
    SalesUp.Variables.HtmlArchivos = template;
      
    var jsonCarpetas = json.Carpetas;
    json = _.reject(json.jsonDatos , function(j){ return _.size(j) == 0; });
    jsonCarpetas = _.reject(jsonCarpetas , function(j){ return _.size(j) == 0; });

    Contenedor = '#ContDocumentos';
    $(Contenedor).html('');
    jsonArchivos =  _.where(json, {Documentos:'1'});
    jsonCarpetasArchivos = _.where(jsonCarpetas, {CarpetaDocumentos:'1'});
    jsonArchivos = _.union( jsonCarpetasArchivos, jsonArchivos);
    SalesUp.Variables.jsonArchivosCarpetaActual = jsonArchivos;
    SalesUp.Construye.ReemplazaTemplate({Destino:Contenedor, Template:template, Datos:jsonArchivos});
    if(_.size(jsonArchivos)==0){$(Contenedor).prepend(vacio);}

    if(jsonArchivos){ SalesUp.Variables.TodosArchivos = _.union(SalesUp.Variables.TodosArchivos, jsonArchivos); }

    SalesUp.Sistema.IniciaPlugins();
  }, 10);

}/*SalesUp.Variables.CargaListaArchivosProspectos*/

SalesUp.Variables.ActivaBuscarArchivo = function(Op){
  var $this = document.getElementById('InputBuscarArchivo');
  clearTimeout($.data($this, 'Esperando'));

  var Click = (Op.e.type == 'click') ? true : false;
  (Op.e.type == 'change') ? Click = true : '';
  var Key = 0;
  var Buscar = $.trim($('#InputBuscarArchivo').val());
  var $buscarEn = $('#BuscarEn');
  var buscarEn = $buscarEn.val();
  (buscarEn=='0')?Click=true:'';
  if(Op.e.type == "keyup"){ Key = SalesUp.Sistema.NumKeyCode(Op.e); }

  /*if(!_.size(Buscar)){ return; }
  if(_.size(Buscar)<=2){return;}
  */
  if( (Key==16)||(Key==37)||(Key==38)||(Key==39)||(Key==40)||(Key==16)||(Key==17)||(Key==18)||(Key==19)||(Key==224) ){return;}
  
  
  
  var Espera = setTimeout(function(){console.log('agregar spinner'); SalesUp.Variables.BuscarArchivo({b:Buscar, en:buscarEn}); }, 2000);
  $($this).data('Esperando', Espera);

  if( (Key==13)||(Click) ){ clearTimeout($.data($this, 'Esperando')); SalesUp.Variables.BuscarArchivo({b:Buscar, en:buscarEn}); }
  
}

SalesUp.Variables.BuscarArchivo = function(Op){
  var Buscar = Op.b;
  var buscarEn = Op.en;
  var jsonBuscar = [{}];
  var Contenedor = '';
  var loadBuscando = '<div class=" p10 tCen Italic w100"><i class="fa fa-2x fa-spinner fa-spin"></i><br/>Buscando...</div>';
  (SalesUp.Variables.tiposArchivo==0) ? Contenedor = '#ContDocumentos' : '';
  (SalesUp.Variables.tiposArchivo==1) ? Contenedor = '#ContImagenes' : '';
  (SalesUp.Variables.tiposArchivo==2) ? Contenedor = '#ContPlantillas' : '';
  $(Contenedor).html(loadBuscando);
  setTimeout(function(){
    if(buscarEn=='0'){
      Buscar = SalesUp.Variables.LimpiarParaBuscar(Buscar);
      jsonBuscar = _.filter(SalesUp.Variables.jsonArchivosCarpetaActual,function(j){
        var str = SalesUp.Variables.LimpiarParaBuscar(j.Descripcion);
        if(str.indexOf(Buscar)!=-1){return j;}
      });  
    }else if(buscarEn=='1'){
      Buscar = escape(Buscar);
      if(Buscar!=''){
        jsonBuscar = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonListaArchivosBuscar.dbsp', Parametros:'ta='+SalesUp.Variables.tiposArchivo+'&q='+Buscar, DataType:'json'});
        jsonBuscar = jsonBuscar.jsonDatos;
      }else{
        jsonBuscar = SalesUp.Variables.jsonArchivosCarpetaActual;
      }
    }
    
    $(Contenedor).html('');
    jsonBuscar = _.reject(jsonBuscar , function(j){ return _.size(j.Descripcion) == 0; });
    if(_.size(jsonBuscar)==0){SalesUp.Construye.SinResultados({Destino:Contenedor});}
    SalesUp.Construye.ReemplazaTemplate({Destino:Contenedor, Template:SalesUp.Variables.HtmlArchivos, Datos:jsonBuscar});
  }, 10);

    
}/*SalesUp.Variables.BuscarArchivo*/

SalesUp.Variables.LimpiarParaBuscar = function(str){
  str = str.toLowerCase();
  str = SalesUp.Sistema.StrReplace('á','a',str);
  str = SalesUp.Sistema.StrReplace('é','e',str);
  str = SalesUp.Sistema.StrReplace('í','i',str);
  str = SalesUp.Sistema.StrReplace('ó','o',str);
  str = SalesUp.Sistema.StrReplace('ú','u',str);
  return str;
}

SalesUp.Variables.CompartirDocumentoCorporativoPopUp = function(Op){
  SalesUp.Variables.CompartirActual=Op.e;
  SalesUp.Sistema.AbrePopUp({Titulo:'Compartir archivo',Pagina:'/privado/popUpCompartirDocumentoDistribuidor.dbsp', Parametros:'Id='+Op.Id, CallBack:'SalesUp.Variables.CargaListaArchivos', Modal:true, ModalAlt:true, Alto:130, Ancho:450});
}


SalesUp.Variables.CompartirDocumentoCorporativo = function(Op){
  SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryCompartirDocumento.dbsp', Parametros:'doc='+Op.Id+'&notificacion='+escape(Op.notificacion) });
  SalesUp.Variables.CompartirCarpetaArchivos({LtId:Op.Id, Archivo:true});
  SalesUp.Construye.MuestraMsj({tMsg:2, Msg:'Archivo compartido', Destino:'#DatosLoad'});
  $(SalesUp.Variables.CompartirActual).remove();
}

SalesUp.Variables.CompartirCarpetaCorporativo = function(Op){
  SalesUp.Variables.CarpetaCompartida = Op.e;
  SalesUp.Construye.MuestraAlerta({
    TipoAlerta:'AlertaPregunta',
    Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/> ¿Está seguro de compartir la carpeta'+Op.Carpeta+' con los distribuidores?<span class="BoxNotaInfo BoxSizing"><i class="fa fa-info-circle fa-lg"></i> Nota: También se compartirán los archivos y carpetas que contenga.</span> ',
    Boton1:'Compartir',
    Boton2:'Cancelar',
    Callback1:'SalesUp.Variables.CompartirArchivosCarpetaCorportativo({Id:'+Op.Id+', tipo:\''+Op.tipo+'\' })',
    Icono1:'<i class="fa fa-share-square-o"></i>',
    Icono2:'<i class="fa fa-times"></i>',
    Ancho:'500px', Id:'AlertaCompartirCarpeta'
  });
}

SalesUp.Variables.CompartirArchivosCarpetaCorportativo = function(Op){
  
  $('#AlertaCompartirCarpeta .BodyContenido').append('<br/>Compartiendo...<br/><i class="fa fa-spin fa-spinner fa-2x"></i>');
  setTimeout(function(){
    var Id = Op.Id;
    var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonListaArchivosEmpresa.dbsp', Parametros:'idca='+Id+'&ta='+Op.tipo, DataType:'json'});
    var Documentos = json.jsonDatos;
    var Carpetas = json.Carpetas;
    var DocumentosHijos = {};
    Carpetas = _.reject(Carpetas , function(j){ return _.size(j) == 0; });
    
    var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonListaArchivosCarpetaPadre.dbsp', Parametros:'idca='+Id, DataType:'json'});
    var IdPadre = json.jsonDatos[0].IdPadre;
    (!IdPadre) ? IdPadre = '' : IdPadre = IdPadre + ',';
    
    var LtCarpetas = IdPadre + Id + ',', LtArchivos = '';
    if(_.size(Carpetas)>0){
      for(var i = 0; i < Carpetas.length; i++){
        var id = Carpetas[i].IdCarpeta;
        LtCarpetas += id+',';
        var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonListaArchivosEmpresa.dbsp', Parametros:'idca='+id+'&ta='+Op.tipo, DataType:'json'});
        DocumentosHijos = _.union(DocumentosHijos, json.jsonDatos);
      };
    }
    
    Documentos = _.union(Documentos, DocumentosHijos);
    Documentos = _.reject(Documentos , function(j){ return _.size(j) == 0; });

    if(_.size(Documentos)>0){
      for(var i = 0; i < Documentos.length; i++){
        var Id = Documentos[i].IdDocumento;
        LtArchivos += Id+',';
        SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryCompartirDocumento.dbsp', Parametros:'doc='+Id });
      };
    }
    
    SalesUp.Variables.CompartirCarpetaArchivos({LtId:LtCarpetas, Carpeta:true});
    SalesUp.Variables.CompartirCarpetaArchivos({LtId:LtArchivos, Archivo:true});
    SalesUp.Construye.MuestraMsj({tMsg:2, Msg:'Carpeta y archivos compartidos', Destino:'#DatosLoad'});
    $(SalesUp.Variables.CarpetaCompartida).remove();
  }, 450);
  //SalesUp.Variables.CargaListaArchivos({ IdCarpeta:SalesUp.Variables.CarpetaActual, TipoArchivo:Op.tipo });
}

SalesUp.Variables.CompartirCarpetaArchivos = function(Op){
  var Id = Op.LtId;
  var Archivo = false, Carpeta = false;
  (Op.Carpeta) ? Carpeta = Op.Carpeta : '';
  (Op.Archivo) ? Archivo = Op.Archivo : '';
  var j = SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/obtieneTipos.dbsp', DataType:'json'});
  if(Archivo){ j = _.where(j.datos ,{Tipo:'Documentos'}); }
  if(Carpeta){ j = _.where(j.datos ,{Tipo:'Carpetas'}); }    
  SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/compartir.dbsp', Parametros:'e='+SalesUp.Variables.sIdempresa+'&i='+Id+'&t='+j[0].IdTipo});
}


SalesUp.Variables.AdvertenciaDocumentos = function(Op){
  
  var Archivo = false, Carpeta = false;
  (Op.carpeta) ? Carpeta = Op.carpeta : '';
  (Op.archivo) ? Archivo = Op.archivo : '';
  var j = SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/dependientes.dbsp', Parametros:'e='+SalesUp.Variables.sIdempresa, DataType:'json'});
  var dependientes = j.datos[0].DEPENDIENTES;

  var mensaje = 'Este archivo está compartido con '+dependientes+' empresas. <br/>¿Esta seguro de querer eliminarlo?';
  var funcionCallback = 'EliminarArchivo';
  if (Carpeta) {
    mensaje = 'Esta carpeta está compartida con '+dependientes+' empresas. <br/>¿Esta seguro de querer eliminarla?';
    funcionCallback = 'EliminarCarpeta';
  };
  
  SalesUp.Construye.MuestraAlerta({
    TipoAlerta:'AlertaPregunta',
    Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/> '+mensaje,
    Boton1:'Eliminar',
    Boton2:'Cancelar',
    Callback1: 'SalesUp.Variables.'+funcionCallback+'({ id:'+Op.id+', tipo:'+"'"+Op.tipo+"'"+' })',
    Icono1:'<i class="fa fa-trash"></i>',
    Icono2:'<i class="fa fa-times"></i>',
    Ancho:'500px'
  });
}






