/*
Highcharts.createElement('link', {
   href: 'https://fonts.googleapis.com/css?family=Unica+One',
   rel: 'stylesheet',
   type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);
*/

SalesUp.Variables.pagInicio = 1;

Handlebars.registerHelper('sinGuionBajo', function(c) {
  var t = this, str = SalesUp.Sistema.StrReplace('_',' ',c);
  
  return new Handlebars.SafeString(str);
});/*hlpOpcionVariante*/

Handlebars.registerHelper('hlpTieneSubCriterio', function() {
  var t = this, str = '', subCriterio = t.subcriterio, idOpcion = t.idOpcion;
  if (subCriterio){
    str = 'data-subCriterio="'+idOpcion+'"';
  }
  return new Handlebars.SafeString(str);
});/*hlpOpcionVariante*/

Handlebars.registerHelper('hlpOpcionConModulo', function() {
  var t = this, str = '', modulo = t.modulo;
  if (modulo){
    str = 'data-spmodulo="'+modulo+'"';
  }
  return new Handlebars.SafeString(str);
});/*hlpOpcionVariante*/

Handlebars.registerHelper('hlpOpcionVariante', function() {
  var t = this, str = '', tkrsv = t.tkRsv, idVariante = t.idVariante, variante = t.variante, maxNivel = t.maxNivel, criteriosVisibles = t.criteriosVisibles, sistema = t.sistema;
  var nivel = SalesUp.Variables.sNivel;

  str = '<option data-sistema="'+sistema+'" data-criteriosVisibles="'+criteriosVisibles+'" value="'+tkrsv+'">'+variante+'</option>';

  if(maxNivel){
    if(nivel>maxNivel){
      str='';
    }
  }

  return new Handlebars.SafeString(str);
});/*hlpOpcionVariante*/

var reportes = function(){
  
  var coloresDelReporte = function(){
    SalesUp.Sistema.CargaDatosAsync({
      link:'/privado/Modelo/jsonColoresGrafica.dbsp',
      almacen:'jsonColoresGraficas',
      callback:function(Op,err){
        if(err){
          SalesUp.Variables.coloresReporte = undefined;
          return;
        }
        
        var colores = Op.jsonDatos;
        colores = _.reject(colores, function(j){ return _.size(j)==0; });

        if(_.size(colores)){
          SalesUp.Variables.coloresReporte = colores[0].CODIGO;
          SalesUp.Variables.coloresReporte = SalesUp.Sistema.StrReplace("'","",SalesUp.Variables.coloresReporte).split(',');
        }else{
          SalesUp.Variables.coloresReporte=undefined;
        }
      }
    });
  }/*coloresDelReporte*/
  
  var templateFiltroActual  ='<span id="{{id}}" class="boxFiltroActual Input">';
      templateFiltroActual +='  <span class="txtFiltroActual Ellipsis Tip8" tip="{{tip}}">{{filtro}}</span>';
      templateFiltroActual +='  {{#if nombre}}<input type="hidden" name="{{nombre}}" value="{{valor}}"/>';
      templateFiltroActual +='  {{else}}<span data-tk="{{tk}}" class="eliminarFiltroActual Tip2" tip="Quitar criterio" onclick="SalesUp.reportes.eliminarCriterio(this);"><i class="fa fa-times"></i></span>{{/if}}';
      templateFiltroActual +='</span>';



  var inputsOcultos ='<input type="hidden" name="{{nombre}}" value="{{valor}}"/>';

  var cargandoFiltros = '<span class="accionFiltro"><i class="fa fa-spinner fa-lg fa-spin"></i></span>';
  var $boxVariantes = $('#boxVariantes'), $boxCriterios = $('#boxCriterios'), $tituloReporte = $('#tituloReporte');
  
  $boxVariantes.html(cargandoFiltros);

  var quitaVacio = function(arr){
    return _.reject(arr, function(j){ return _.size(j)==0; });
  }
  
  SalesUp.Variables.GuardaTk = '';
  
  var restriccionModulos = function(Op){
    Op.criterios = _.reject(Op.criterios, function(j){
      var modulo = j.modulo;
      if(modulo){
        return !SalesUp.Sistema.EstaActivoModulo({Modulo:modulo});
      }
      return false;
    });
    return Op;
  }/*restriccionModulos*/

  var obtieneVariantes = function(Op){
    var tkrs = Op.tkrs;
    SalesUp.Variables.GuardaTk = Op.tkrs;
    var procesaVariantes = function(Op, err){
      if (err) {
        console.warn('error', err); return false;
      }

      Op = restriccionModulos(Op);
      
      SalesUp.Variables.jsonInfoReportes = Op;
      SalesUp.Variables.jsonInfoReportesEtiquetas = Op;
      
      configuracionGraficas();
      
      var infoReporte = Op.jsonDatos[0];
      var nombreReporte = infoReporte.reporte;
      $tituloReporte.html(nombreReporte);

      contruyeOpcionesVariantes(Op);

    }/*procesaVariantes*/
     
    SalesUp.Sistema.CargaDatosAsync({
      link:'/privado/Modelo/jsonInformacionReporte.dbsp', 
      parametros:'tkrs='+tkrs, 
      callback:procesaVariantes
    });
      
  }/*obtieneVariantes*/

  this.obtieneVariantes = function(Op){
    obtieneVariantes(Op);    
  }

  this.contruyeOpcionesVariantes = function(Op){
    contruyeOpcionesVariantes(Op);
  }

  var contruyeOpcionesVariantes = function(Op){
    var tmpOpcionVariantes = '{{#each jSistemaVariantes}}{{hlpOpcionVariante}}{{/each}}';
    var arrlasVariantes = Op.variantes;
    
    var jSistemaVariantes = _.reject(arrlasVariantes,function(j){ return j.sistema==0; });
      
    jSistemaVariantes = quitaVacio(jSistemaVariantes);
    
    var jMisVariantes = _.reject(arrlasVariantes,function(j){ return j.sistema==1; });
        jMisVariantes = _.sortBy(jMisVariantes, 'variante');
        jMisVariantes = quitaVacio(jMisVariantes);

    var nMisVariantes = _.size(jMisVariantes);
    var jVariantes, htmlVariantes, opcionesVariantes;
    var tmpOpcionMisVariantes = '<option value="-1">[Crear nueva variante]</option>';

    if(nMisVariantes){
      tmpOpcionMisVariantes = '<optgroup label="Mis variantes">';
      tmpOpcionMisVariantes += '{{#each jMisVariantes}}{{hlpOpcionVariante}}{{/each}}';
      tmpOpcionMisVariantes += '<option value="-1">[Crear nueva variante]</option>';
      tmpOpcionMisVariantes += '</optgroup>';
    }
      
    tmpOpcionVariantes += tmpOpcionMisVariantes;
    var lasOpcionesVariantes = '<div class="elCriterio">';
        lasOpcionesVariantes +='  <span class="txtCriterio Ellipsis">Reportes</span>';
        lasOpcionesVariantes +='  <select id="laVariante" name="laVariante" onfocus="SalesUp.Variables.antCrearVariante = value;" onchange="SalesUp.reportes.seleccionarVariante({t:this, v:value});" class="Select Ellipsis">';
        lasOpcionesVariantes +=   tmpOpcionVariantes;
        lasOpcionesVariantes +='  </select>';
        lasOpcionesVariantes +='  <div onmouseenter="SalesUp.reportes.variantes.accionesMisVariantes(this)" class="accionFiltro accionesMisVariantes Pointer"><i class="fa fa-lg fa-gear"></i></div>';
        lasOpcionesVariantes +='</div>';
    
    jVariantes = {jSistemaVariantes:jSistemaVariantes, jMisVariantes:jMisVariantes};
    opcionesVariantes = SalesUp.Construye.ReemplazaDatos({Datos:jVariantes, Template:lasOpcionesVariantes});
    $boxVariantes.html(opcionesVariantes).removeAttr('style');
    $boxCriterios.html(cargandoFiltros);

    var arrCriteriosVisibles = jSistemaVariantes[0].criteriosVisibles;
    
    if(SalesUp.Variables.varianteActual){
      arrCriteriosVisibles = _.where(arrlasVariantes,{tkRsv:SalesUp.Variables.varianteActual}); 
      if (_.size(arrCriteriosVisibles)){
        arrCriteriosVisibles = arrCriteriosVisibles[0].criteriosVisibles;
        $('#laVariante').val(SalesUp.Variables.varianteActual);
      }
    }else{
      SalesUp.Variables.varianteActual = jSistemaVariantes[0].tkRsv;
    }

    obtieneCriteriosVisibles(arrCriteriosVisibles);
  }/*contruyeOpcionesVariantes*/

  var obtieneCriteriosVisibles = function(arrCriteriosVisibles){
    
    arrCriteriosVisibles = arrCriteriosVisibles.split(',');
    
    var nCriterios = _.size(arrCriteriosVisibles);
    var procesaCriteriosVisibles = function(Op,err){
      var htmlCriterios = '', ltCriterios = Op.criterios, criteriosFiltro = [];
      
      for(var nc = 0; nc<nCriterios;nc++){
        var idCriterio = parseInt(arrCriteriosVisibles[nc]);
        criteriosFiltro.push(_.where(ltCriterios,{idCriterio:idCriterio})[0]);
      }
      
      /*criteriosFiltro = _.reject(criteriosFiltro, function(j){
        var modulo = j.modulo;
        if(modulo){
          return !SalesUp.Sistema.EstaActivoModulo({Modulo:modulo});
        }
        return false;
      });*/

      for (var cf = 0; cf < _.size(criteriosFiltro); cf++){
        htmlCriterios += (criteriosFiltro[cf]) ? procesaCriterio(criteriosFiltro[cf]):'';
      }

      $boxCriterios.html(htmlCriterios);
      
      criteriosActivos = _.size($boxCriterios.find('.elCriterio'));
      
      if(criteriosActivos>1){
        $('#aplicarFiltro').css('display','inline-block');
      }else{
        $('#aplicarFiltro').hide();
      }
      
      agregaControlesCriteriosVisibles();

      SalesUp.reportes.aplicarFiltro();
    }/*procesaCriteriosVisibles*/
    
    procesaCriteriosVisibles(SalesUp.Variables.jsonInfoReportes);
    //SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonCriteriosReportes.dbsp', callback:procesaCriteriosVisibles});
  }/*obtieneCriteriosVisibles*/

  this.obtieneCriteriosOcultos = function(){
    var ltVariante       = SalesUp.Variables.jsonInfoReportes.variantes;
    var ltCriterios      = SalesUp.Variables.jsonInfoReportes.criterios;
    var varianteActual   = SalesUp.Variables.varianteActual;
    var laVariante       = _.where(ltVariante,{tkRsv:varianteActual})[0];
    var idVariante       = laVariante.idVariante;
    var arrCriterios     = laVariante.criteriosVisibles.split(',');
    var criteriosOcultos = ltCriterios;

    for(var ac = 0;ac<arrCriterios.length;ac++){
      var criterio = parseInt(arrCriterios[ac]);
      criteriosOcultos = _.reject(criteriosOcultos, function(j){
        return (j.idCriterio==criterio);
      });  
    }

    if(_.size(criteriosOcultos)){
      var htmlCriterios = '';
      for (var cf = 0; cf < _.size(criteriosOcultos); cf++){
        //htmlCriterios += (criteriosOcultos[cf]) ? procesaCriterio(criteriosOcultos[cf]):'';
        
      }
      
      $('#boxCriteriosOcultos').html(htmlCriterios);
    }else{
      $('#agregarFiltroOculto').remove();
    }
  }/*obtieneCriteriosOcultos*/
  
  this.eliminarCriterio = function(t){
    var $t = $(t), $boxFiltroActual = $t.closest('.boxFiltroActual');
    $boxFiltroActual.slideUp(800);
    setTimeout(function(){ 
      $boxFiltroActual.remove(); 
      SalesUp.reportes.aplicarFiltro();
    }, 900);
  }

  var aplicarFiltroAutomatico = function(){
    if(criteriosActivos==1){
        SalesUp.reportes.aplicarFiltro();
    }
  }

  this.aplicarFiltroAutomatico = function(){
    aplicarFiltroAutomatico();
  }

  this.criterioSeleccionado = function(t){
    
    var $t = $(t), valor = t.value, id = t.id, criterio = $t.attr('data-criterio');
    
    $t.removeClass('DatoMal');
    if ((criteriosActivos==1) && (id!='criterioperiodo') && (id!='criteriotipo')){
      aplicarFiltroAutomatico();
      return;
    }

    if(id=='criterioperiodo'){
      SalesUp.reportes.especificarPeriodo(valor);
    }

    if(id=='criterioTipoFase'){
      var $criteriotipo = $('#criteriotipo');
      $criteriotipo.val('');
      $criteriotipo.find('option[value="1"]').hide();
      if(valor=='1'){
        $criteriotipo.find('option[value="1"]').show();
      }
    }

    if(id=='criteriotipo'){
      var $criterioMoneda = $('#criteriomoneda');
      var $boxCriterioMoneda = $criterioMoneda.closest('.elCriterio');
      $boxCriterioMoneda.hide();
      $criterioMoneda.val('');
      if(valor==1){ $boxCriterioMoneda.show(); }
      $('.subCriterio-'+id).remove();
      
      obtieneSubCriterio({id:id, elemento:t, criterio:criterio, valor:valor});
    }

    if (id=='criterioperiodicidad'){
      $('.subCriterio-'+id).remove();
      if(SalesUp.Variables.tkrs=='94117AB6-A8D0-4C9D-98D1-03658B1D81E3'){
        obtieneSubCriterio({id:id, elemento:t, criterio:criterio, valor:valor}); 
      }
    }

    if(id=='criteriogrupo'){
      var $criterioEjecutivo = $('#criterioejecutivo');
      if(_.size($criterioEjecutivo)){
        cargaUsuariosPorFiltro(valor);
      }
    }
  }/*criterioSeleccionado*/

  var cargaUsuariosPorFiltro = function(tk){
    
    var $criterioejecutivo = $('#criterioejecutivo'), $elCriterio = $criterioejecutivo.closest('.elCriterio');
        $criterioejecutivo.html('<option>Cargando.</option>');
        $criterioejecutivo.after(' <i class="fa fa-spin fa-spinner fa-lg"></i>');

    SalesUp.Sistema.CargaDatosAsync({
      link:'/privado/Modelo/jsonUsuariosReportes.dbsp', 
      parametros:'tkg='+tk,
      callback:function(Op,err){
        
      var datosCriterio = Op.jsonDatos;

      datosCriterio.forEach(function(v,i){
        v.idOpcion = v.tku; 
        v.opcion = v.usuario + ' ('+v.iniciales+')';
      });

      var ltCriterios = SalesUp.Variables.jsonInfoReportes.criterios;
      var elCriterio = _.where(ltCriterios, {idCriterio:5});
        elCriterio = SalesUp.Sistema.clone(elCriterio);
        elCriterio[0].opcionesCriterios = datosCriterio;
      var html = procesaCriterio(elCriterio[0]);
      $elCriterio.before(html);
      $elCriterio.remove();
      }
    });
  }/*cargaUsuariosPorFiltro*/

  var obtieneSubCriterio = function(Op){
    
    var tkRsc = Op.criterio, valor = parseInt(Op.valor), elemento = Op.elemento, id = Op.id;
    
    if(isNaN(valor)){return;}
    var $t = $(elemento), $divCriterio = $t.closest('.elCriterio');

    var ltCriterios       = SalesUp.Variables.jsonInfoReportes.criterios;
    var elCriterio        = _.where(ltCriterios, {tkRsc:tkRsc})[0];
    var opcionesCriterios = elCriterio.opcionesCriterios;
    var laOpcion          = _.where(opcionesCriterios,{idOpcion:valor})[0];
    var nombreOpcion      = laOpcion.opcion;
    var subcriterio       = laOpcion.subcriterio;
    
    if (!subcriterio){ aplicarFiltroAutomatico(); return;}

  var templateSubCriterios = '<div class="elCriterio subCriterio-'+id+'">';
  templateSubCriterios     += '<span class="txtCriterio Ellipsis">'+nombreOpcion+'</span>';
  templateSubCriterios     += '<select onchange="SalesUp.reportes.aplicarFiltroAutomatico();" id="subcriterio'+nombreOpcion+'" name="'+nombreOpcion+'" class="Select Ellipsis">';
  templateSubCriterios     += ' {{#each opcionesSubCriterios}}<option value="{{idOpcion}}">{{opcion}}</option>{{/each}}';
  templateSubCriterios     += '</select></div>';
  
    var htmlSubCriterio = SalesUp.Construye.ReemplazaDatos({Template:templateSubCriterios, Datos:{opcionesSubCriterios:subcriterio} });
    
    $divCriterio.after(htmlSubCriterio);
  }/*obtieneSubCriterio*/
  
  var seleccioneOpcion = function(arr){
    arr.forEach(function($v){
      if(_.size($v)){
        var $opcion = $v.find('option[value=""]');
        $v.addClass('InfoObligatorio');
        $opcion.html('(.. Seleccione una opción ..)');  
      }
    });
  }/*seleccioneOpcion*/

  var agregaControlesCriteriosVisibles = function(){
    var $ltCriterios = $boxCriterios.find('input, select'), $boxFiltrosAdicionales = $('#boxFiltrosAdicionales');;
    var anioActual = (new Date).getFullYear(), tkrs = SalesUp.Variables.tkrs;
    
    var $periodicidad        = $('#criterioperiodicidad');
    var $criteriotipo        = $('#criteriotipo');
    var $criterioTipoFase    = $('#criterioTipoFase');
    var $criterioperiodo     = $('#criterioperiodo');
    var $criterioDescartados = $('#criteriodescartados');
    var $criterioAnio        = $('#criterioanio');
    var $criterioComponentes = $('#criteriocomponentes');
    var $criterioVentaRC     = $('#criterioventaRC');
    var $criterioventaNR    = $('#criterioventaNR');
    var $criteriovistaSMS    = $('#criteriovistaSMS');
    var $criterioventasPor   = $('#criterioventasPor');
    var $criterioPenetracion = $('#criterioPenetracion');
    var $criterioFechaCanalización = $('#criterioFechaCanalización');
    var $criterioedoCorreo = $('#criterioedoCorreo');
    
    seleccioneOpcion([$criterioTipoFase, $periodicidad, $criterioFechaCanalización, $criteriotipo, $criterioperiodo, $criterioDescartados, $criterioAnio, $criterioComponentes, $criterioVentaRC, $criterioventaNR, $criteriovistaSMS, $criterioventasPor]);

    $criterioFechaCanalización.val(5);
    $criterioperiodo.val(5);
    $periodicidad.val(4);
    $criteriotipo.val(1);
    $criterioTipoFase.val(1);
    $criterioDescartados.val(2);
    $criterioAnio.val(anioActual);
    $criterioComponentes.val(11);
    $criterioVentaRC.val(0);
    $criterioventasPor.val(1);
    $criterioventaNR.val(3);

    if(tkrs!='94117AB6-A8D0-4C9D-98D1-03658B1D81E3'){
      $periodicidad.find('option[value="8"]').remove(); 
    }
    
    if(tkrs=='64005056-0167-4C13-A960-D2C0CEE0D93E'){
      $criterioedoCorreo.find('option[value="2"]').remove();
      $criterioedoCorreo.find('option[value="3"]').remove();
    }
    
    if (tkrs=='5216B0B3-A9D5-428F-99A3-0656C0A5DD74'){
      $('#criterioejecutivo').val(SalesUp.Variables.tku);  
    }
    
    $criterioPenetracion.addClass('Pointer').attr('onclick','SalesUp.reportes.ltPenetracion();').attr('readonly',true);
    $criterioPenetracion.after('<input name="rangoPenetracion" id="rangoPenetracion" type="hidden"/>');
    
    /*por mientras*/

    $criterioventasPor.find('option[value="3"]').remove();
    /*por mientras*/

    $criteriovistaSMS.val(1);
    
    $boxFiltrosAdicionales.html('');
    var ltVariante       = SalesUp.Variables.jsonInfoReportes.variantes;
    var ltCriterios      = SalesUp.Variables.jsonInfoReportes.criterios;
    var ltValoresFiltros = SalesUp.Variables.jsonInfoReportes.valoresFiltros;
    var varianteActual   = SalesUp.Variables.varianteActual;
    var laVariante       = _.where(ltVariante,{tkRsv:varianteActual})[0];
    var idVariante       = laVariante.idVariante, deSistema = laVariante.sistema;
    var arrCriterios     = laVariante.criteriosVisibles.split(',');
    var arrValores       = _.where(ltValoresFiltros, {variante:idVariante});
    
    if(deSistema==0){
      for (var ac=0;ac<arrValores.length;ac++){
        var obj = {}, cajitaAmarilla='', val = arrValores[ac], criterio = val.criterio, elCriterio = _.where(ltCriterios,{idCriterio:criterio})[0];
        var nombreElemento = elCriterio.idElemento, idElemento = 'criterio'+nombreElemento, $idElemento = $('#'+idElemento);
        var valor = val.valor, filtro = val.filtro, tk = val.tk;
        
        if(_.size($idElemento)){
          $idElemento.val(valor);
        }else{
          obj.id=idElemento+tk, obj.tk = tk, obj.valor = valor, obj.filtro=filtro, obj.tip= filtro, obj.nombre = nombreElemento;
          cajitaAmarilla = SalesUp.Construye.ReemplazaDatos({Template:inputsOcultos, Datos:obj});
          $boxFiltrosAdicionales.append(cajitaAmarilla);
        }
      }
    }/*if deSistema*/
    var $boxFiltrosAdicionales = $('#boxFiltrosAdicionales');
    var arrPeriodos = $boxFiltrosAdicionales.find('input[name="periodo"]'), $periodo = $(arrPeriodos);
    if (_.size($periodo)){
      var valPeriodo = $periodo.val();
      if (valPeriodo.indexOf('|')!=-1){
        var splitPeriodo = valPeriodo.split('|');
        var inputFechas = '<input id="reporteDesde" class="inputFechas" type="hidden" name="fechaInicio" value="'+$.trim(splitPeriodo[0])+'">'
            inputFechas += '<input id="reporteHasta" class="inputFechas" type="hidden" name="fechaFin" value="'+$.trim(splitPeriodo[1])+'">'
        $boxFiltrosAdicionales.prepend(inputFechas);
        $periodo.val('');
      }
    }
      

    setTimeout(function(){
      cargaValoresFiltrosOcultos();
    }, 500);

  }/*agregaControlesCriteriosVisibles*/

  var cargaValoresFiltrosOcultos = function(){
    /*aqui*/
    var $criterioEjecutivo = $('#criterioejecutivo');
    var $criteriogrupo = $('#criteriogrupo');
    
    var $boxFiltrosAdicionales = $('#boxFiltrosAdicionales');

    if( (_.size($criterioEjecutivo)) && (!_.size($criteriogrupo)) ){
      var arrGrupo = $boxFiltrosAdicionales.find('input[name="grupo"]');
      var tkGrupo = $(arrGrupo).val();
      if (tkGrupo){
        cargaUsuariosPorFiltro(tkGrupo);  
      }
      
    }
  }/*cargaValoresFiltrosOcultos*/

  this.ltPenetracion = function(Op){
    (!Op) ? Op = {} : '';
    var max = Op.max, valor = Op.val;
    var $t = $('#criterioPenetracion'), t = $t[0];
    var $criterioPenetracion = $('#criterioPenetracion'), $rangoPenetracion = $('#rangoPenetracion');
    var titulo, tipo;
    
    $t.popover('destroy');
    
    titulo = (max) ? '<b>Entre</b> '+valor+'% <b>y</b>' : '<b>Entre</b>';
    tipo = (max) ? 1:0;
    
    if(!max){
      $rangoPenetracion.val('');
      $criterioPenetracion.val('');
    }

    var porcentajes = function(){
      var htmlAcciones = '';
      for(var i=0;i<=10;i++){
        var p = i*10;
        htmlAcciones+= '<span onclick="SalesUp.reportes.porcentajesPenetracion('+tipo+',\''+p+'\')" class="w33 tCen OpcionAcciones Pointer">'+p+'%</span>';
      }
      return htmlAcciones;
    }

    SalesUp.Construye.popOver({
      Elemento:t, 
      Titulo:titulo, 
      PopOverLugar:'bottom', 
      Contenido:porcentajes(1), 
      Clases:'PopOverAcciones ltPenetraciones'
    });

  }/*ltPenetracion*/

  this.porcentajesPenetracion = function(tipo, val){
    var $criterioPenetracion = $('#criterioPenetracion'), $rangoPenetracion = $('#rangoPenetracion');
    var rango = '', str = '', decimal = val / 100;
    
    rango = $rangoPenetracion.val();
    rango = (_.size(rango)) ? rango +'|'+ decimal : decimal;
    $rangoPenetracion.val(rango);

    str = $criterioPenetracion.val();
    str = (_.size(str)) ? str +' y '+ val+'%' : 'Entre '+val+'%';
    $criterioPenetracion.val(str);
    
    if(tipo==0){
      setTimeout(function(){
        SalesUp.reportes.ltPenetracion({max:true, val:val});
      },300);
    }
  }/*porcentajesPenetracion*/

  this.quitarPeriodoManual = function(t){
    var $t = $(t), $elCriterio = $t.closest('.elCriterio');
    $elCriterio.find('#criterioperiodo').val('').show();
    $elCriterio.find('.hasDatepicker').remove();
    $elCriterio.find('.inputFechas').remove();
    $t.remove();
    $('.tipsy').remove();
  
  }

  var activaDatePickerPeriodo = function(Op){
      var Desde, Hasta, Months, Fecha, $donde;
      var FormatoFecha = SalesUp.Sistema.Almacenamiento({a:'SysFormatoFecha'});
      $('.elCriterio .hasDatepicker, .inputFechas').remove();
      (!Op) ? Op = {} : '';
      (Op.F) ? Fecha = Op.F : Fecha = '01/01/2000';
      (Op.D) ? Desde = Op.D : Desde = 'repDesde';
      (Op.H) ? Hasta = Op.H : Hasta = 'repHasta';
      (Op.donde) ? $donde = $(Op.donde) : '';
      (Op.M) ? Months = Op.M : Months = 2;
      $('#FechaPicker').slideDown();
      var $elCriterio = $('#criterioperiodo').closest('.elCriterio');
      var inputFechas = '<input class="inputFechas" type="hidden" id="reporteDesde" name="fechaInicio"/>';
          inputFechas += '<input class="inputFechas" type="hidden" id="reporteHasta" name="fechaFin" />';
          inputFechas += '<div id="repDesde"><div class="TitDiv"><i class="fa fa-calendar"></i> <span class="Italic">Seleccionar periodo</span></div></div><div id="repHasta" style="display:none;"><div class="TitDiv"></div></div>';

      ($donde) ? $elCriterio = $donde : '';

      $elCriterio.prepend(inputFechas);
       var fechaSeleccionada = function(){
        var htmlFecha = '', objPeriodo = {}, fInicio = $('#reporteDesde').val(), fFin =$('#reporteHasta').val();
        objPeriodo.filtro = fInicio + ' - ' + fFin;
        objPeriodo.id = 'peridoManual';
        htmlFecha = SalesUp.Construye.ReemplazaDatos({Template:templateFiltroActual, Datos:objPeriodo});
        $elCriterio.append(htmlFecha);
        var $peridoManual = $('#peridoManual');
        $peridoManual.attr('onclick','SalesUp.reportes.quitarPeriodoManual(this);').find('.eliminarFiltroActual').attr('tip','Cambiar de periodo');

       
        SalesUp.Sistema.Tipsy();
        aplicarFiltroAutomatico();
      }/*fechaSeleccionada*/
       var ocultarAutomatico = function($t){ return;
        var fCerrar = function(){ 
          $('#criterioperiodo').val('');
          $t.hide();
        }

        var Cerrar = true;
        $t.mouseleave(function(){
          Cerrar = true;
          setTimeout(function(){(Cerrar) ? fCerrar():'';}, 1000);
        }).mouseenter(function(){
          Cerrar = false;
        }).click(function(){
          $t.hide();
        });

        setTimeout(function(){(Cerrar) ? fCerrar():'';}, 4000);
      }/*ocultarAutomatico*/

      var $desde = $('#'+Desde);
      var $hasta = $('#'+Hasta);

      var dates = $( '#'+Desde+', #'+Hasta ).datepicker({
          changeMonth: true, changeYear: true,
          dateFormat:FormatoFecha, startDate:Fecha, minDate:Fecha,
          nextText:'', prevText:'',
          dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
          dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'], dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'], 
          monthNames:  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],  
          monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],          
          changeMonth: false,
          numberOfMonths: Months,
          onSelect: function( selectedDate ) {
              var id = this.id;
              var fDesde = $(this).val();
              var option = id == Desde ? 'minDate' : 'maxDate',
                  instance = $( this ).data( 'datepicker' ),
                  date = $.datepicker.parseDate( instance.settings.dateFormat ||  $.datepicker._defaults.dateFormat, selectedDate, instance.settings );
              dates.not( this ).datepicker( 'option', option, date );
              
              if(id == Desde){

                $desde.slideUp(500);
                setTimeout(function(){ $hasta.slideDown(500); }, 550);
                $('#reporteDesde').val(fDesde);
                $hasta.find('.TitDiv').html('<span class="Italic"><i class="fa fa-calendar"></i> Desde: </span> <span class="Bold pr10">'+ fDesde + '</span> <span class="Italic pl10">Hasta:</span>');
                ocultarAutomatico($hasta);
              }else if($donde){
                var desdeFecah = $('#reporteDesde').val();
                var hastaFecha = $(this).val();
                $('#fechaFiltroVariantes').val(desdeFecah + ' - ' + hastaFecha);
                SalesUp.reportes.variantes.seleccionarFiltro({Paso:1,Filtro:0,Elemento:$('#fechaFiltroVariantes'),Siguiente:1});
                 $('#FechaPicker').html('');

              }else{
                $hasta.slideUp();
                $('#reporteHasta').val($(this).val());
                $('#criterioperiodo').hide();
                fechaSeleccionada();
              }
          }
      });

      $desde.datepicker({
          changeMonth: true, numberOfMonths: Months,
          onClose: function( selectedDate ){ 
            $hasta.datepicker( 'option', 'minDate', selectedDate ); 
          }
      });
      
      ocultarAutomatico($desde);

      $hasta.datepicker({
          changeMonth: true, numberOfMonths: Months,
          onClose: function( selectedDate ){ $desde.datepicker( 'option', 'maxDate', selectedDate ); },
      });

  }/* /activaDatePickerPeriodo */
  
  this.activaDatePickerPeriodo = activaDatePickerPeriodo;

  this.especificarPeriodo = function(v){
    v = parseInt(v);
    $('.elCriterio .hasDatepicker, .inputFechas').remove();
    if(v==0){ 
      activaDatePickerPeriodo(); 
    }else{
      aplicarFiltroAutomatico();
    }
  } /*especificarPeriodo*/
  
  this.obtieneLosCriterios = function(Op){
    obtieneLosCriterios(Op);
  }

  var obtieneLosCriterios = function(Op){
    var idCriterio = Op.idCriterio, jsonInfo = Op.json, opcionesCriterios = Op.opcionesCriterios;
    
    if(idCriterio==31){
      if(SalesUp.Variables.ExtraPais){
        jsonInfo = jsonInfo+SalesUp.Variables.ExtraPais;
      }
    }

    if(typeof opcionesCriterios == 'string'){ 
      if(opcionesCriterios != ''){
        opcionesCriterios = JSON.parse(opcionesCriterios);
      }
    }
    
    if (!opcionesCriterios){
      var datosCriterio = SalesUp.Sistema.CargaDatos({Link:jsonInfo, DataType:'json'});
      datosCriterio = datosCriterio.jsonDatos;

      datosCriterio.forEach(function(v,i){
        if(idCriterio==5){ v.idOpcion = v.tku; v.opcion = v.usuario + ' ('+v.iniciales+')'; }
        if(idCriterio==6){ v.idOpcion = v.tk; v.opcion = v.Grupo; }
        if(idCriterio==7){ v.idOpcion = v.idNivel; v.opcion = v.nivel; }
        if(idCriterio==10){ v.idOpcion = v.TIPO; v.opcion = v.SECCION + ' - ' + v.SUCESO_NOMBRE; }
        if(idCriterio==13){ v.idOpcion = v.tk; v.opcion = v.MONEDA; }
        if(idCriterio==14){ v.idOpcion = v.TK; v.opcion = v.LINEA_PRODUCTO; }
        if(idCriterio==15){ v.idOpcion = v.TK; v.opcion = v.MARCA; }
        if(idCriterio==17){ v.idOpcion = v.TK; v.opcion = v.Opcion; }
        if(idCriterio==23){ v.idOpcion = v.TIPO; v.opcion = v.SUCESO_NOMBRE + ' ('+v.SECCION+')'; }
        if(idCriterio==25){ v.idOpcion = v.IDCOLUMNA; v.opcion = v.COLUMNA; }

        if(idCriterio==36){ v.idOpcion = v.TK; v.opcion = v.CLUSTER; }
        if(idCriterio==37){ v.idOpcion = v.TK; v.opcion = v.NOMBRE; }
        if(idCriterio==39){ v.idOpcion = v.TK; v.opcion = v.OFICINA; }

      });
      opcionesCriterios = datosCriterio;
    }

    return opcionesCriterios; 
  }/*obtieneLosCriterios*/

  var procesaCriterio = function(j){
    var nombreCriterio = j.idElemento, criterio = j.criterio, idCriterio = j.idCriterio, jsonInfo = j.json, esInput = j.esInput;
    
    var templateCriterios = '<div class="elCriterio">';
        templateCriterios+= '<span class="txtCriterio Ellipsis">'+criterio+'</span>';
        templateCriterios+= '<select onchange="SalesUp.reportes.criterioSeleccionado(this);" data-criterio="{{tkRsc}}" id="criterio'+nombreCriterio+'" name="'+nombreCriterio+'" class="Select Ellipsis">';
        templateCriterios+= ' <option value="">(.. Todos ..)</option>';
        templateCriterios+= ' {{#each opcionesCriterios}}<option {{hlpOpcionConModulo}} value="{{idOpcion}}">{{opcion}}</option>{{/each}}';
        templateCriterios+= '</select></div>';
    
    var templateInputCriterios = '<div class="elCriterio"><span class="txtCriterio Ellipsis">'+criterio+'</span>';
        templateInputCriterios+= '<input type="text" id="criterio'+nombreCriterio+'" name="'+nombreCriterio+'" class="Input Ellipsis" /></div>';
    
    j.opcionesCriterios = obtieneLosCriterios({idCriterio:idCriterio, opcionesCriterios:j.opcionesCriterios, json: jsonInfo });
    
    htmlCriterio = SalesUp.Construye.ReemplazaDatos({Datos:j, Template:templateCriterios });
    
    (esInput) ? htmlCriterio = templateInputCriterios : '';

    return htmlCriterio;
  }/*procesaCriterio*/

  this.inicia = function(Op){
    coloresDelReporte();
    obtieneVariantes({tkrs:Op.tkrs});
  }

  this.muestraAccionesMisVariantes = function(t){
    muestraAccionesMisVariantes(t);
  }
  
  var muestraAccionesMisVariantes = function(t){
    var $t = $(t), tkRsv = $t.val(), $opcion = $t.find('option:selected');
    var ltVariantes = SalesUp.Variables.jsonInfoReportes.variantes;
    var varianteSeleccionado = _.where(ltVariantes, {tkRsv:tkRsv})[0];
    var editar = varianteSeleccionado.editar, sistema = varianteSeleccionado.sistema;
    if((sistema==0)&&(editar==1)){
      $('.accionesMisVariantes').css('display','inline-block');
    }
  }/*muestraAccionesMisVariantes*/

  this.seleccionarVariante = function(Op){
    var t = Op.t, $t = $(t), valor = Op.v, $opcion = $t.find('option:selected'), criteriosVisibles = $opcion.attr('data-criteriosVisibles'), sistema = $opcion.attr('data-sistema');
    
    $('.accionesMisVariantes').hide();
    SalesUp.Variables.varianteActual = undefined;
    if(valor!='-1'){
      SalesUp.Variables.varianteActual = valor;
      $boxCriterios.html(cargandoFiltros);
      obtieneCriteriosVisibles(criteriosVisibles);
      muestraAccionesMisVariantes(t);
    }else{
      SalesUp.reportes.variantes.crearVariante();
    }
    $t.blur();
  }/*seleccionarVariante*/

  

  this.obtieneValoresCriterios = function(){
    var $lasVariantes = $('#lasVariantes'), $laVariante = $('#laVariante'), $laOpcion = $laVariante.find('option:selected');
    var tipoVariante = $laOpcion.attr('data-sistema');
    var arrQry = {}, $Contenedor = $('#lasVariantes'), arrInputs = $Contenedor.find('input, select, textarea');

    arrQry.tipoVariante = tipoVariante;
    arrQry.laVariante = $laVariante.val();
    arrQry.filtros = [];
    for (var i = 0; i <= arrInputs.length - 1; i++){
      var $e = $(arrInputs[i]);
      var name = $e.attr('name'), valor = $.trim($e.val());
      if(name != 'laVariante'){
        if(name){ 
          var aux = {};
          aux[name]= valor;
          arrQry.filtros.push(aux); 
        }
      }
    }
    arrQry = JSON.stringify(arrQry);
    
    return arrQry;
  }/*obtieneValoresCriterios*/

  var validaFiltros = function(){
    var $lasVariantes = $('#lasVariantes');
    var Pasa = true;
    var arrObligatorios = $lasVariantes.find('.InfoObligatorio');
    
    for(var x= 0; x < arrObligatorios.length; x++){
      var $t = $(arrObligatorios[x]);
      if($t.val()==''){
        SalesUp.Construye.MuestraMsj({Id:'errorAplicarFiltros', tMsg:4, Destino:$('#DatosLoad'), Msg:'Los filtros marcados son <strong>obligatorios</strong>' });
        $t.addClass('DatoMal');
        //break;
        return false;
      }
    }
    return Pasa;
  }/*validaFiltros*/

  var destruyeGrafica = function(){
    var chart = $('#graficaReporte').highcharts();
    if (chart){$('#graficaReporte').highcharts().destroy();}
  }/*destruyeGrafica*/

  var unMomentoCargando = function(){
    $('#DatosLoad').html(SalesUp.Sistema.unMomento());
    $('#btnAccionesReporte').remove();
    destruyeGrafica();
  }

  this.aplicarFiltro = function(Op){
    var obligatorios = validaFiltros();
    if (!obligatorios){return;}
    
    var arrQry = SalesUp.reportes.obtieneValoresCriterios();
    var qryString = encodeURIComponent(arrQry);

    unMomentoCargando();
    
    SalesUp.Sistema.CargaDatosAsync({ 
      link:'/privado/Modelo/qryGuardaFiltrosReportes.dbsp',
      parametros:'filtros='+qryString,
      callback:cargaElReporte,
      prmAdicionales:{filtro:arrQry}
    });
  }/*aplicarFiltro*/

  var activaBotonExportar = function(){ 
    var tkrs = SalesUp.Variables.tkrs;
    var $lasVariantes = $('#lasVariantes'), $laVariante = $('#laVariante'), $laOpcion = $laVariante.find('option:selected');
    var strLaVariante = $laOpcion.text().trim(), tipoVariante = $laOpcion.attr('data-sistema');
    var qryString = SalesUp.reportes.obtieneValoresCriterios();
    //Por Mis pendejadas de no respetar lo espesificado xoxoxo Hans!
    var filtros = '&filtros=';
    if(tkrs==='94429999-5820-4CB5-9FD3-AF033DD82761'){
      filtros = '&OBJETO=';
    }
    
    qryString = '&tipoVariante='+tipoVariante+'&laVariante='+$laVariante.val()+'&tkrs='+tkrs+filtros+encodeURIComponent(qryString);
    var reporteTitulo = $('#tituloReporte').text().trim()+'-'+strLaVariante;
    var configExportacion = {destino:$('#contenedor'),titulo:reporteTitulo, parametros:qryString};
    
    if(tkrs==='427164E4-86FF-414D-B3F7-6D010147E312'){
      configExportacion.exportacionTotal   = '/privado/Modelo/jsonContinuidadExporta.dbsp';
      configExportacion.preparaExportacion = SalesUp.reportes.clientes.exportaCsvContinuidad;
    }
    if(tkrs==='94429999-5820-4CB5-9FD3-AF033DD82761'){ 
      configExportacion.exportacionTotal   = '/privado/Modelo/jsonDetalleSuceso.dbsp';
      configExportacion.preparaExportacion = SalesUp.reportes.actividades.exportaCsvSuceso;
    }
    
    SalesUp.exporta.btnExportar(configExportacion);
  }/*activaBotonExportar*/

  var cargaElReporte = function(Op, err, prm){
    
    var filtro = prm.filtro;
    var tkrs = SalesUp.Variables.tkrs;
    var infoReporte = SalesUp.Variables.jsonInfoReportes;
    var json = infoReporte.jsonDatos[0].info;
    
    
    
    if(tkrs==='320DB1C0-F01D-43C5-BC40-421AEBDE4350'){
      SalesUp.reportes.actividades.reportePorPeriodo({filtro:filtro});
    }

    if(tkrs==='94117AB6-A8D0-4C9D-98D1-03658B1D81E3'){
      SalesUp.reportes.actividades.reporteHistorico({filtro:filtro});
    }
     
    if(tkrs==='94429999-5820-4CB5-9FD3-AF033DD82761'){
      SalesUp.reportes.actividades.reporteSucesos({filtro:filtro});
    }
    
    if(tkrs ==='83098E2D-7DD2-4170-896D-7606B0588A27'){
      SalesUp.reportes.actividades.reporteDescartados({filtro:filtro});
    }

    if(tkrs==='A19351BC-82B3-4D04-8E89-330CFE094A68'){
      SalesUp.reportes.ventas.reporteVentasProducto({filtro:filtro});
    }

    if(tkrs==='8ACE79FA-5187-4DB6-A623-0134CD64DE0E' || tkrs==='5AC9BB7C-F071-437D-BBFD-AEA299E355AC'){
      SalesUp.reportes.ventas.cobradasVsRealizadas({filtro:filtro});
      activaDobleGrafica();
    }

    if(tkrs==='DF07E1F4-F9D5-4478-B175-9C4E801BB9F4'){
      SalesUp.reportes.oportunidades.estimacionVentas({filtro:filtro});
    }

    if(tkrs==='7F266C17-C39D-4ADC-9D00-C5422CDEA87F'){
      SalesUp.reportes.oportunidades.reporteOportunidadesSinSeguimiento({filtro:filtro});
    }

    if(tkrs==='54C6A004-7648-4988-9BFD-CCC5B7EEFCCF'){
      SalesUp.reportes.oportunidades.reporteAvance({filtro:filtro});
    }

    if(tkrs==='2B7E4AD9-1DBA-44E3-A41E-00C1AF99DAAC'){
      SalesUp.reportes.clientes.reporteCobroPendiente({filtro:filtro});
    }

    if(tkrs==='C33150F7-E642-473D-A995-CF4CF9B93C46'){
     SalesUp.reportes.clientes.top10({filtro:filtro});
     activaBotonExportar();
    }
    
    if(tkrs==='5216B0B3-A9D5-428F-99A3-0656C0A5DD74'){
     SalesUp.reportes.comunicacion.reporteCorreosEnviados({filtro:filtro});
    }

    if(tkrs==='64005056-0167-4C13-A960-D2C0CEE0D93E'){
     SalesUp.reportes.comunicacion.reporteSms({filtro:filtro});
    }

    if(tkrs==='427164E4-86FF-414D-B3F7-6D010147E312'){
      SalesUp.reportes.clientes.continuidad({filtro:filtro});
    }

    if(tkrs === 'A61DD300-2FEC-44AF-9772-FC3CE01C5D8F'){
        SalesUp.reportes.actividades.Geo({filtro:filtro});
    }

    if(tkrs==='2DAF302A-0E02-4156-8FE0-D81F2ECA356D'){
      if(SalesUp.reportes.oportunidades.winVsLose){
        SalesUp.reportes.oportunidades.winVsLose({filtro:filtro});
        activaDobleGrafica();
      }
    }

    if(tkrs==='59124D4A-289C-4B47-A31B-0D12B3A4F65B'){
      if(SalesUp.reportes.ventas.cruzada){
        SalesUp.reportes.ventas.cruzada({filtro:filtro});
      }
    }
    
  }/*cargaElReporte*/

  var activaDobleGrafica = function(){
    $('#cambiaGrafica').remove();
    var tkrs = SalesUp.Variables.tkrs;

    var clasesAdicionales = '', opcion1 = '<i class="fa fa-line-chart"></i>', opcion2 = '<i class="fa fa-pie-chart"></i>';

    if(tkrs==='2DAF302A-0E02-4156-8FE0-D81F2ECA356D'){
      clasesAdicionales = 'montoCantidad';  
      opcion1 = 'Monto';
      opcion2 = 'Cantidad';
    }

    var btnSwitch  = '';
      btnSwitch += '<div class="Tip8 '+clasesAdicionales+'" id="cambiaGrafica" tip="Cambiar gráfica">';
      btnSwitch += '  <label class="switch-light switch-candy">';
      btnSwitch += '    <input type="checkbox" id="SwitchGrafica" onchange="SalesUp.reportes.seleccionarGrafica(this)">';
      btnSwitch += '    <span>';
      btnSwitch += '      <span id="opcionGrafica1">'+opcion1+'</span>';
      btnSwitch += '      <span id="opcionGrafica2">'+opcion2+'</span>';
      btnSwitch += '    </span>';
      btnSwitch += '    <a></a>';
      btnSwitch += '  </label>';
      btnSwitch += '</div>';

    if(tkrs==='5AC9BB7C-F071-437D-BBFD-AEA299E355AC'){
      var valor = $('#criterioventaNR').val();  
      (valor=='5') ? btnSwitch = '':'';
    }

    if(tkrs==='8ACE79FA-5187-4DB6-A623-0134CD64DE0E'){
      var valor = $('#criterioventaRC').val();
      (valor=='2') ? btnSwitch = '':'';
    }
    
    $('#graficaReporte').before(btnSwitch);

  }/*activaDobleGrafica*/

  this.seleccionarGrafica = function(t){
    var tkrs = SalesUp.Variables.tkrs;
    var activo = $(t).is(':checked');
    
    if(tkrs==='8ACE79FA-5187-4DB6-A623-0134CD64DE0E' || tkrs==='5AC9BB7C-F071-437D-BBFD-AEA299E355AC'){
      SalesUp.reportes.ventas.switchGrafica(activo);
    }

    if(tkrs==='2DAF302A-0E02-4156-8FE0-D81F2ECA356D'){
      SalesUp.reportes.oportunidades.switchGraficaWinVsLose(activo);
    }
  }/*seleccionarGrafica*/

  var configuracionGraficas = function(){
    if (!window.Highcharts){console.warn('Highcharts no esta incluido en el DOM'); return;}

    var ancho = $('#graficaReporte').width();
    var infoReporte = SalesUp.Variables.jsonInfoReportes, titulo = infoReporte.jsonDatos[0].reporte;
    var colores = SalesUp.Variables.coloresReporte;
    (!colores) ? colores = Highcharts.getOptions().colors:'';
    Highcharts.configuracionGral = {
      credits:{enabled:false}, exporting:{enabled:false},
      colors:colores,
      chart:{height:400, backgroundColor:'rgba(255, 255, 255, 0.8)' },
      title:{
        text:titulo, 
        useHTML:true,
        style:{ fontSize:'20px' }
      }
    };
    
    Highcharts.setOptions(Highcharts.configuracionGral);
  }/*configuracionGraficas*/
  
  this.graficaLineal = function(Op){ console.info('graficaLineal');
    (!Op) ? Op = {} : '';
    var series = Op.series, tooltip = Op.tooltip, categorias = Op.categorias;
    $('#graficaReporte').highcharts({
      chart:{type:'line'},
      xAxis:{categories:categorias},
      yAxis:{title: {text: false }},
      tooltip:tooltip, series:series
    });
  }/*Gráfica Lineal*/

  this.graficaPie = function(Op){ console.info('graficaPie');
    (!Op) ? Op = {} : '';
    var data    = Op.datos, tooltip = Op.tooltip; 
    var $grafica = $('#graficaReporte');
    var titulo = Highcharts.configuracionGral.title.text;
    (Op.titulo) ? titulo = Op.titulo : '';
    (Op.lugar) ? $grafica = Op.lugar : '';

    $grafica.highcharts({
      chart:{ type: 'pie'/*, plotBackgroundColor: null, plotBorderWidth: null,plotShadow: false */},
      title:{ text:titulo },
      tooltip:tooltip,
      plotOptions:{ pie:{allowPointSelect: true,cursor: 'pointer',dataLabels: {enabled: false},showInLegend: true} },
      series:[{ name: 'Porcentaje',colorByPoint: true, data: data }]
    }); 
  }

  this.graficaBarra = function(Op){ console.info('graficaBarra');
    (!Op) ? Op = {} : '';
    var categorias = Op.categorias, dataSeries = Op.series, tooltip = Op.tooltip, points = (Op.points)?Op.points:{};
    var cursor = (_.size(points)) ? 'pointer' : undefined;
    
    $('#graficaReporte').highcharts({
        chart:{type:'bar'},
        plotOptions:{series: {stacking: 'normal', cursor: cursor, point:points}},
        yAxis:{title: {text: false }}, 
        xAxis:{ categories: categorias },
        tooltip:tooltip,
        series:dataSeries
    });
  }/*graficaBarra*/

  this.graficaColumna = function(Op){ console.info('graficaColumna');

  /*
  
  console.clear();

  var pagina = 2, dataSeries = SalesUp.Variables.graficaSeries;
  var porPagina = 4, empieza = 1, termina = 4;

  if(pagina>1){ 
    empieza = (pagina * porPagina)-1; 
    termina = (empieza + porPagina)-1; 
  }

  console.log(empieza, termina);

  var datos = [];

  dataSeries.forEach(function(v,i){
   // console.log(i,v);
    var posicion = i+1;
    if((posicion>=empieza) && (posicion<=termina)){
      datos.push(v);
    }
  });
      
  datos
  */
    (!Op) ? Op = {} : '';
    var categorias = Op.categorias, dataSeries = Op.series, tooltip = Op.tooltip;
    SalesUp.Variables.graficaCategorias = categorias;
    SalesUp.Variables.graficaSeries = dataSeries;
    $('#graficaReporte').highcharts({
        chart:{type: 'column'},
        plotOptions:{ column:{pointPadding:0.2,borderWidth:0} },
        yAxis:{title:{text: false }},
        tooltip:tooltip,
        xAxis:{categories:categorias, crosshair: true},
        series:dataSeries
    });
  }/*graficaColumna*/

  /* Grafica dual*/
  this.DualAxis = function(Op) {
    var chart = $('#graficaReporte').highcharts();
    if (chart){$('#graficaReporte').highcharts().destroy();}
    (!Op) ? Op = {} : '';
    var tooltip = Op.tooltip;
    var Categorias = Op.categorias;
    var datos = Op.datosGraficar;

    $('#graficaReporte').highcharts({
      chart: {type: 'column'},
      xAxis: {categories: Categorias   },

      yAxis: [{ 
        title: {
          text: false,
        }
      }, { 
        max:100, 
        title: {
          text: false,
        },
        labels: {
          format: '{value} %',
        },
        opposite: true
      }],
      tooltip: tooltip,
      plotOptions: {
        column: {stacking: 'normal',dataLabels: {enabled: false,
          style: {
            textShadow: '0 0 3px black'
          }}
        }
      },
      series: datos
    });
  }/* Grafica dual*/


  this.graficaTreeMap = function(Op){
    (!Op) ? Op = {} : '';
    var points = Op.points, tooltip = Op.tooltip;
    
    $('#graficaReporte').highcharts({
        tooltip:tooltip,
        series:[{
          data:points, type:'treemap', layoutAlgorithm:'squarified',
          allowDrillToNode:true, animationLimit:1500,
          dataLabels:{enabled:false}, levelIsConstant:false,
          levels:[{ level:1, borderWidth:2, dataLabels:{ enabled: true } }]
        }]
    });
  }/*graficaTreeMap*/

  this.graficaArea = function(Op){ console.log('graficaArea');
    (!Op) ? Op = {} : '';
    var tooltip = Op.tooltip, series = Op.series, title = Op.titulo, categorias = Op.categories;
    $('#graficaReporte').highcharts({
      chart:{ type:'area'},
      title:{text: title},
      yAxis:{ title:{ text: 'Totales' } },
      xAxis:{ categories : categorias },
      tooltip: tooltip, series: series
    });
  }

  this.paginacion = function(obj){
      var registros = obj.registros, start = obj.start, callback = obj.callback, $tabla = obj.tabla, parametros = obj.parametros;
      var total = registros, porPagina=50, Actual = Math.ceil(start/porPagina);
      var DivPaginacion = '<div id="Paginacion" class="BoxPaginacion paginacion"></div><div class="clear"></div>';
      var divPaginacion = '<div id="Paginacion" class="BoxPaginacion paginacion"></div>';
      var styleTop ='';
      var r_totales = porPagina*Actual;
      
      activaBotonExportar();

      if (total > porPagina) {
        var pagtotal = total/porPagina;
            pagtotal = Math.ceil(pagtotal);

        var ultimaPag = 'last', strNext = 'Siguiente <i class="fa fa-chevron-right"></i>';
        
        $('#Paginacion').remove();
        $tabla.after(divPaginacion);
        $('#Paginacion').bootpag({
            total:pagtotal, page: Actual, maxVisible: 7, leaps: false, next: strNext,
            firstLastUse: true, prev: '<i class="fa fa-chevron-left"></i> Atras',
            last: 'Fin', first: 'Inicio', lastClass: ultimaPag
        }).on("page",function(event,num){
          var nuevoStart = ((num-1) * porPagina) + 1;
          unMomentoCargando();
          callback({filtro:parametros,start:nuevoStart});
        });
        
        $('#Paginacion>ul>li>a').addClass('Npag');
        $('#Paginacion>ul>li.active>a').removeClass('Npag').addClass('PagAct');
        var enEstaPagina = ((start + porPagina -1) > registros ) ? registros : (start + porPagina -1);
        var htmlTotal = '<p class="Registros tDer"><b>'+start+'</b> - <b>'+enEstaPagina+'</b> de <b>'+registros+'</b> resultados</p>';
        $('#Paginacion').append(htmlTotal)
      }else{
        $('#Paginacion').remove();
        $tabla.after(divPaginacion);
        var htmlTotal = '<p class="Registros tDer"><b>'+registros+'</b> resultados</p>';
        $('#Paginacion').append(htmlTotal)
      }
  }/*laPaginacion*/

this.cargaOtroReporte = function(tk){
   $('#tituloReporte').html('<i class="fa fa-spin fa-spinner fa-lg"></i>');
    $('#boxVariantes, #boxFiltrosAdicionales, #boxCriterios, #boxConfiguracionVariantes, #graficaReporte, #DatosLoad').html('');
    $('#boxVariantes').css('height','35px');
    $('#aplicarFiltro').hide();
    $('#cambiaGrafica').remove();
    $('#graficaReporte').removeAttr('style');
    SalesUp.Variables.jsonInfoReportes = undefined;
    SalesUp.Variables.varianteActual = undefined;
    SalesUp.Variables.tkrs = tk;

    SalesUp.reportes.inicia({tkrs:SalesUp.Variables.tkrs});
   }/*cargaOtroReporte*/

}/*repotes*/

if (window.reportes){ 
  SalesUp.reportes = new reportes();
  if (window.reportesOportunidades){ SalesUp.reportes.oportunidades = new reportesOportunidades(); }
  if (window.reportesVentas){ SalesUp.reportes.ventas = new reportesVentas(); }
  if (window.reporteActividades){ SalesUp.reportes.actividades = new reporteActividades(); }
  if (window.reporteClientes){ SalesUp.reportes.clientes = new reporteClientes(); }
  if (window.reportesComunicaciones){ SalesUp.reportes.comunicacion = new reportesComunicaciones(); }
  if (window.reporteVariantes){ SalesUp.reportes.variantes = new reporteVariantes(); }
  
  var path = document.location.pathname;
  
  if((path.indexOf('reporte.dbsp')!=-1)||(path.indexOf('reporte.test.dbsp')!=-1)){
    SalesUp.reportes.inicia({tkrs:SalesUp.Variables.tkrs}); 
    
    window.onpopstate = function(event) {
      var tkrs = location.search.replace('?tkrs=','');
      var estoy = location.pathname.replace('/privado/','');
      SalesUp.reportes.cargaOtroReporte(tkrs);
    }; 
  }
}


  /*$('#grafica').highcharts({
        title:{ text:'Reporte de actividades'},
        chart:{ type:'bar', backgroundColor:'rgba(255, 255, 255, 0.8)' },
        xAxis:{ categories: datos[0].usuarios }, yAxis:{ min: 0, title: { text: '' } },
        tooltip:{ shared: false, formatter: function(){ return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + this.y + '<br/>' + 'Total: ' + this.point.stackTotal; } },
        legend:{ reversed: true },
        series: datos[0].series,
        plotOptions:{
          series:{ 
            stacking: 'normal', cursor: 'pointer',
            point: {
              events: {
                click: function(){
                  var tipourl=0, url='';
                  if (this.series.name==='Nuevos'){tipourl=1;url='reportes_actividades_prospectos.dbsp?tipo=1&';}
                  if (this.series.name==='Asignados'){tipourl=2;url='reportes_actividades_prospectos.dbsp?tipo=2&';}
                  if (this.series.name==='Descartados'){tipourl=3;url='reportes_actividades_prospectos.dbsp?tipo=3&';}
                  if (this.series.name==='Oportunidades nuevas'){tipourl=4;url='reporte_actividades_oportunidades.dbsp?tipo=1&';}
                  if (this.series.name==='Oportunidades descartadas'){tipourl=5;url='reporte_actividades_oportunidades.dbsp?tipo=2&';}
                  if (this.series.name==='Ventas'){tipourl=6;url='reporte_actividades_oportunidades.dbsp?tipo=3&';}
                  if (this.series.name==='Seguimientos'){tipourl=7;url='reporte_actividades_seguimientos.dbsp?';}
                  if (this.series.name==='Seguimientos post-venta'){tipourl=8;url='reporte_actividades_seguimientos_clientes.dbsp?';}
                  if (tipourl>0){ location.href =url+"tku="+datos[0].series[0].tku[this.x]+"&fecha_desde="+Op.fecha_desde+"&fecha_hasta="+Op.fecha_hasta; }
                }
              }
            }
          }
        }
    });*/

/*

var colorFiltros = function(){ return;
    var $ListaFiltros = $('#ListaFiltros');
    var backgroundColor = $ListaFiltros.css('backgroundColor');
    var color = $ListaFiltros.find('#filtros').css('color');
    var colorOpacity = SalesUp.Sistema.rgb2hex(color);
        colorOpacity = SalesUp.Sistema.hex2rgb(colorOpacity, 80);
    $('#cssFiltros').remove();
    var css  = '<style id="cssFiltros">';
        css += '#ListaFiltros select.Select, #ListaFiltros input.Input{float:none;background-color:[bg] !important;color:[co] !important;border:0 !important; border-bottom:1px solid [co] !important; border-radius:0;}';
        css += ':-ms-input-placeholder{color:[coOpa];}::-webkit-input-placeholder{color:[coOpa];}';
        css += ':-moz-placeholder{color:[coOpa];}::-moz-placeholder{color:[coOpa];}';
        css += '';
        css += '</style>';
        css  = SalesUp.Sistema.StrReplace('[bg]',backgroundColor,css);
        css  = SalesUp.Sistema.StrReplace('[co]',color,css);
        css  = SalesUp.Sistema.StrReplace('[coOpa]',colorOpacity,css);
        
    $('body').prepend(css);
}

colorFiltros();

*/
