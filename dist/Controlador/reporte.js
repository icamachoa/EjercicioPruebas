SalesUp.Variables.pagInicio = 1;

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
  var coloresReporte;
  SalesUp.Sistema.CargaDatosAsync({
    link:'/privado/Modelo/jsonColoresGrafica.dbsp',
    callback:function(Op,err){
      coloresReporte = Op.jsonDatos[0].CODIGO
      coloresReporte = SalesUp.Sistema.StrReplace("'","",coloresReporte).split(',');
    }
  });

  var cargandoFiltros = '<span class="accionFiltro"><i class="fa fa-spinner fa-lg fa-spin"></i></span>';
  var $boxVariantes = $('#boxVariantes'), $boxCriterios = $('#boxCriterios'), $tituloReporte = $('#tituloReporte');
  $boxVariantes.html(cargandoFiltros);

  var quitaVacio = function(arr){
    return _.reject(arr, function(j){ return _.size(j)==0; });
  }
    
  var obtieneVariantes = function(Op){
    var tkrs = Op.tkrs;
  
    var procesaVariantes = function(Op, err){
      if (err) {
        console.warn('error', err); return false;
      }
      
      SalesUp.Variables.jsonInfoReportes = Op;
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

  var contruyeOpcionesVariantes = function(Op){
    var tmpOpcionVariantes = '{{#each jSistemaVariantes}}{{hlpOpcionVariante}}{{/each}}';
    var arrlasVariantes = Op.variantes;
    var jSistemaVariantes = _.reject(arrlasVariantes,function(j){ return j.sistema==0; });
      
    jSistemaVariantes = quitaVacio(jSistemaVariantes);
    
    var jMisVariantes = _.reject(arrlasVariantes,function(j){ return j.sistema==1; });
        jMisVariantes = _.sortBy(jMisVariantes, 'variante');
    
    /*var jMisVariantes = [{
        tkrsv: 'abc',
        sistema:0,
        variante:'Por ejecutivos gerentes',
        maxNivel:2,
        criteriosVisibles:'1,4,5,6,7'
    }];*/
    
    jMisVariantes = quitaVacio(jMisVariantes);
    var nMisVariantes = _.size(jMisVariantes);
    var jVariantes, htmlVariantes, opcionesVariantes;
    var tmpOpcionMisVariantes = '<option value="-1">Crear nueva variante *</option>';

    if(nMisVariantes){
      tmpOpcionMisVariantes = '<optgroup label="Mis variantes">';
      tmpOpcionMisVariantes += '{{#each jMisVariantes}}{{hlpOpcionVariante}}{{/each}}';
      tmpOpcionMisVariantes += '<option value="-1">Crear nueva variante *</option>';
      tmpOpcionMisVariantes += '</optgroup>';
    }
      
    tmpOpcionVariantes += tmpOpcionMisVariantes;
    tmpOpcionVariantes = '<div class="elCriterio"><span class="txtCriterio">Variantes</span><select id="laVariante" name="laVariante" onchange="SalesUp.reportes.seleccionaCriterioVisible({t:this, v:value});" class="Select Ellipsis">'+tmpOpcionVariantes+'</select></div>';

    jVariantes = {jSistemaVariantes:jSistemaVariantes, jMisVariantes:jMisVariantes};
    opcionesVariantes = SalesUp.Construye.ReemplazaDatos({Datos:jVariantes, Template:tmpOpcionVariantes});
    $boxVariantes.html(opcionesVariantes).removeAttr('style');
    $boxCriterios.html(cargandoFiltros);
    
    var arrCriteriosVisibles = jSistemaVariantes[0].criteriosVisibles;
    
    if(SalesUp.Variables.varianteActual){
      arrCriteriosVisibles = _.where(arrlasVariantes,{tkRsv:SalesUp.Variables.varianteActual});
      if (arrCriteriosVisibles){
        arrCriteriosVisibles = arrCriteriosVisibles[0].criteriosVisibles;
        $('#laVariante').val(SalesUp.Variables.varianteActual);
      }
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
      
      for (var cf = 0; cf < _.size(criteriosFiltro); cf++){
        htmlCriterios += procesaCriterio(criteriosFiltro[cf]);
      }
      $boxCriterios.html(htmlCriterios);
      $('#aplicarFiltro').show();
      cargaElReporte();
    }/*procesaCriteriosVisibles*/
    
    procesaCriteriosVisibles(SalesUp.Variables.jsonInfoReportes);
    //SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonCriteriosReportes.dbsp', callback:procesaCriteriosVisibles});
  }/*obtieneCriteriosVisibles*/

  var obtieneLosCriterios = function(Op){
    var idCriterio = Op.idCriterio, jsonInfo = Op.json, opcionesCriterios = Op.opcionesCriterios;
    
    if(typeof opcionesCriterios == 'string'){ opcionesCriterios = JSON.parse(opcionesCriterios);}
    
    if (!opcionesCriterios){
      var datosCriterio = SalesUp.Sistema.CargaDatos({Link:jsonInfo, DataType:'json'});
      datosCriterio = datosCriterio.jsonDatos;

      datosCriterio.forEach(function(v,i){
        if(idCriterio==5){ v.idOpcion = v.Tku; v.opcion = v.Usuario + ' ('+v.Iniciales+')'; }
        if(idCriterio==6){ v.idOpcion = v.Id; v.opcion = v.Grupo; }
        if(idCriterio==7){ v.idOpcion = v.idNivel; v.opcion = v.nivel; }
        if(idCriterio==10){ v.idOpcion = v.TIPO; v.opcion = v.SECCION + ' - ' + v.SUCESO_NOMBRE; }
        if(idCriterio==13){ v.idOpcion = v.IDEMPRESAMONEDA; v.opcion = v.MONEDA; }
        if(idCriterio==14){ v.idOpcion = v.TK; v.opcion = v.LINEA_PRODUCTO; }
        if(idCriterio==15){ v.idOpcion = v.TK; v.opcion = v.MARCA; }
      });

      opcionesCriterios = datosCriterio;
    }

    return opcionesCriterios; 
  }/*obtieneLosCriterios*/

  var procesaCriterio = function(j){
    var nombreCriterio = j.idElemento, criterio = j.criterio, idCriterio = j.idCriterio, jsonInfo = j.json, esInput = j.esInput;
    
    var templateCriterios = '<div class="elCriterio">';
        templateCriterios+= '<span class="txtCriterio">'+criterio+'</span>';
        templateCriterios+= '<select id="rf_'+nombreCriterio+'" name="'+nombreCriterio+'" class="Select Ellipsis">';
        templateCriterios+= ' <option value="">(.. Selecciona una opción ..)</option>';
        templateCriterios+= ' {{#each opcionesCriterios}}<option value="{{idOpcion}}">{{opcion}}</option>{{/each}}';
        templateCriterios+= '</select></div>';
    
    var templateInputCriterios = '<div class="elCriterio"><span class="txtCriterio">'+criterio+'</span>';
        templateInputCriterios+= '<input type="text" id="rf_'+nombreCriterio+'" name="'+nombreCriterio+'" class="Input Ellipsis" /></div>';
    
    j.opcionesCriterios = obtieneLosCriterios({idCriterio:idCriterio, opcionesCriterios:j.opcionesCriterios, json: jsonInfo });

    htmlCriterio = SalesUp.Construye.ReemplazaDatos({Datos:j, Template:templateCriterios });
    
    (esInput) ? htmlCriterio = templateInputCriterios : '';

    return htmlCriterio;
      
  }/*procesaCriterio*/

  this.inicia = function(Op){
    obtieneVariantes({tkrs:Op.tkrs});
  }
  
  this.seleccionaCriterioVisible = function(Op){
    var $t = $(Op.t), valor = Op.v, $opcion = $t.find('option:selected'), criteriosVisibles = $opcion.attr('data-criteriosVisibles'), sistema = $opcion.attr('data-sistema');
    
    $('.accionesMisVariantes').hide();
    SalesUp.Variables.varianteActual = undefined;
    if(valor!='-1'){
      $boxCriterios.html(cargandoFiltros);
      obtieneCriteriosVisibles(criteriosVisibles);
      if(sistema==0){
        $('.accionesMisVariantes').css('display','inline-block');
      }
      SalesUp.Variables.varianteActual = valor;
    }else{
      crearVariante();
    }
  }/*seleccionaCriterioVisible*/

  var crearVariante = function(Op){
    (!Op) ? Op = {} : '';
    var tkrsv = Op.tkrsv;
    SalesUp.Construye.MuestraPopUp({
      alto:'360px', ancho:'650px', id:'popUpVarianteReporte',
      titulo:'Nueva variante de reporte', 
      fuente:'/privado/popup_crear_variante.dbsp'
    });

    setTimeout(function(){
      preparaSelectPopVariantes();
      $('#nombreVariante').focus();

      if(!Op.tkrsv){setTimeout(function(){activaSelectizeCriterios();},100);}
      if(Op.tkrsv){activaEditarVariante(Op.tkrsv);}
    }, 500);

  }/*crearVariante*/


  var activaEditarVariante = function(tkrsv){
    console.log('activaEditarVariantes',tkrsv);
    
    SalesUp.Sistema.CargaDatosAsync({
      link:'/privado/Modelo/jsonInfoVarianteReporte.dbsp', 
      parametros:'tkrsv='+tkrsv,
      callback:function(Op,err){
        if (err){
          //SalesUp.Construye.MuestraNotificacion();
          return;
        }
        console.log(Op);
        var variante = Op.variante[0];
        var criterios = Op.criterios;
        
        $("#nombreVariante").val(variante.variante);
        $("#agrupar").val(variante.agruparPor);
        $("#totalizar").val(variante.totalizar);
        $("#selectCompartirDash").val(variante.compartido);
        $("#Criterios").val(variante.criteriosVisibles);
        
        
        $("#periodo").val(variante.periodicidad);
        SalesUp.reportes.compartirVariante(variante.compartido); 
        /*$("#ltCompartir").val(variante.compartidoCon);*/
        /*aqui*/
        setTimeout(function(){
          if($selectCompartir){
            if($selectCompartir[0].selectize){
              var splitCompartidoCon = variante.compartidoCon.split(',');
              $selectCompartir[0].selectize.setValue(splitCompartidoCon);
            }
          }
        }, 300);
        llenaCriteriosVariantes(criterios);
        activaSelectizeCriterios();

      }
    });
    
  }/*activaEditarVariantes*/

  var llenaCriteriosVariantes = function(Op){
    for (var i = 0; i < Op.length; i++){Op[i].id=SalesUp.Construye.IdUnico();}
    var templateFiltros = '{{#each criterios}}';
        templateFiltros += '<span id="{{id}}" class="FiltroEtiqueta FiltroNormal" data-criterio="{{filtro}} " data-Operador="{{operador}}" data-Tipo="{{idFiltro}}" data-valor="{{valor}}">{{filtro}} <span class="ConfingFiltro Transition" onclick="SalesUp.reportes.activaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});"><i class="fa fa-ellipsis-v"></i></span></span>';
        templateFiltros += '{{/each}}';
    
    var Etiqueta = SalesUp.Construye.ReemplazaDatos({Template:templateFiltros,Datos:{criterios:Op}});
    $('#FiltrosPaso1').append(Etiqueta);  
  };

  var preparaSelectPopVariantes = function (){
    var infoReporte = SalesUp.Variables.jsonInfoReportes;
    var $popUpVarianteReporte = $('#popUpVarianteReporte');
    var tmpOpcion = '{{#each agrupaciones}}<option value="{{idAgrupacion}}">{{Agrupacion}}</option>{{/each}}';
    var j = {opciones:infoReporte.agrupaciones};
    var htmlOpcion = SalesUp.Construye.ReemplazaDatos({Template:tmpOpcion, Datos:infoReporte});
    $popUpVarianteReporte.find('#agrupar').html(htmlOpcion);

    var periodoJson = '[{"idOpcion":"","opcion":"(.. Seleccione una opción ..)"},{"idOpcion":1,"opcion":"Semanal"},{"idOpcion":2,"opcion":"Quincenal"},{"idOpcion":3,"opcion":"Mensual"},{"idOpcion":4,"opcion":"Bimestral"},{"idOpcion":5,"opcion":"Trimestral"},{"idOpcion":6,"opcion":"Cuatrimestral"},{"idOpcion":7,"opcion":"Semestral"},{"idOpcion":8,"opcion":"Anual"}]';
    j.opciones = JSON.parse(periodoJson);

    var tmpOPeriodo = '{{#each opciones}}<option value="{{idOpcion}}">{{opcion}}</option>{{/each}}';
    htmlOpcion = SalesUp.Construye.ReemplazaDatos({Template:tmpOPeriodo, Datos:j});
    $popUpVarianteReporte.find('#periodo').html(htmlOpcion);



    var tmpTotalizar = '{{#each opciones}}<option value="{{id}}">{{opcion}}</option>{{/each}}';
    j.opciones = [{"id":0,"opcion":"No totalizar"},{"id":1,"opcion":"Sumas"},{"id":2,"opcion":"Promedios"}];
    htmlOpcion = SalesUp.Construye.ReemplazaDatos({Template:tmpTotalizar, Datos:j});
    $popUpVarianteReporte.find('#totalizar').html(htmlOpcion);
  }/*preparaSelectPopVariantes*/

  var $criteriosSelectize;
  var activaSelectizeCriterios = function(){
    var infoReporte = SalesUp.Variables.jsonInfoReportes;
    var $popUpVarianteReporte = $('#popUpVarianteReporte');
    $criteriosSelectize = $popUpVarianteReporte.find('#Criterios').selectize({
      plugins: ['remove_button'], dropdownParent:'body', closeAfterSelect:true,
      valueField:'idCriterio', searchField:['criterio'], labelField:'criterio',
      options:infoReporte.criterios
    });
    setTimeout(function(){
      $('.selectize-control.inputCriterios').addClass('w100 BoxSizing InfoData');
    }, 200);
  } /* /EtiquetasSelectize */

  var templateOpcion = '<option  value="{{idCriterio}}" id="{{idElemento}}" ">{{criterio}}</option>';
  var templateOpcionHijo = '<option value="{{idOpcion}}">{{opcion}}</option>';
  var templateUniverso = '<span id="{{id}}" class="FiltroEtiqueta Universo" data-Paso="{{Paso}}" data-Cat="{{Cat}}" data-Tipo="{{Tipo}}">{{TextoFiltro}} <span class="ConfingFiltro Transition" onclick="SalesUp.reportes.activaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});" ><i class="fa fa-ellipsis-v"></i></span></span>';
  var templateFiltros = '<span id="{{id}}" class="FiltroEtiqueta FiltroNormal" data-criterio="{{ValorFiltro}}" data-Operador="{{Operador}}" data-Universo="{{Universo}}" data-Paso="{{Paso}}" data-Cat="{{Cat}}" data-Tipo="{{Tipo}}" data-valor="{{Valor}}">{{TextoFiltro}}<span class="ConfingFiltro Transition" onclick="SalesUp.reportes.activaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});"><i class="fa fa-ellipsis-v"></i></span></span>';
  var templatePaso = '<span class="FiltroEtiqueta LabelPaso Transition">{{Pasos}}</span>';

  this.verOpcionesFiltros = function(Op){
    var In=Op.In, Out=Op.Out, p=Op.Paso;
    var $Parte1 = $('#Paso'+p+'-P1');
    var $Parte2 = $('#Paso'+p+'-P2');
    if(In){
      $Parte1.css('left','0');
      $Parte2.css('left','100%');
      setTimeout(function(){$Parte2.hide();}, 500);
    }

    if(Out){
      $Parte1.css('left','-100%');
      $Parte2.show();
      setTimeout(function(){$Parte2.css('left','0');}, 10);   
    }
  }

  this.activaMostrarFiltros = function(Op){
    var Paso = Op.Paso, Out = Op.Out;
    var $FiltroTipo = $('#FiltroTipoPaso'+Paso);
    var $FiltrosPaso = $('#FiltrosPaso'+Paso);
    var FiltroTipo = 'FiltroTipoPaso'+Paso;
    var infoReporte = SalesUp.Variables.jsonInfoReportes;
    var Opciones = infoReporte.criterios;

    $FiltroTipo.html('');
    $('#OpcionesTipoFiltros'+Paso).html('').hide();
    $FiltroTipo.append('<option value="">(.. Seleccione una opción ..)</option>');
    
    SalesUp.Construye.ReemplazaTemplate({Destino:$FiltroTipo, Datos:Opciones , Template:templateOpcion });
    SalesUp.reportes.verOpcionesFiltros({Paso:Paso, Out:Out});
  }/*activaMostrarFiltros*/

  this.mostrarFiltro = function(Op){
    var Filtro = Op.Filtro; 
    var $Elemento = $(Op.Elemento);
    var Paso = Op.Paso;
    var $Opcion = $Elemento.find('option:selected');
    var $FiltrosPaso = $('#FiltrosPaso'+Paso);
    var $OpcionesFiltros = $('#OpcionesTipoFiltros'+Paso);
    var Categoria = $Opcion.attr('data-cat');
    var Naturaleza = $Opcion.data('naturaleza');
    var TextoFiltro = $Opcion.text();
    
    Op.TextoFiltro = TextoFiltro;
    Op.Categoria = Categoria;

    $OpcionesFiltros.slideUp().html('');
    
    if(Filtro!=''){
      $('#Load'+Paso).show();
      setTimeout(function(){
        (Filtro>0) ? SalesUp.reportes.CargaFiltrosSistema(Op) : SalesUp.Variables.CargaFiltrosPersonalizados(Op);
      }, 10);
    }
  }/*SalesUp.Variables.MostrarFiltro*/

  this.seleccionarFiltro = function(Op){
    var Paso = Op.Paso;
    var Filtro = Op.Filtro;
    var $Elemento = $(Op.Elemento);
    var $OpcionesFiltros = $('#OpcionesTipoFiltros'+Paso);
    var $FiltrosPaso = $('#FiltrosPaso'+Paso);
    var $Opcion = $Elemento.find('option:selected');
    var Categoria = $OpcionesFiltros.attr('data-cat');
    var TextoFiltro = $OpcionesFiltros.attr('data-textofiltro');
    var Tipo = $OpcionesFiltros.attr('data-tipo');
    var TextoFiltroHijo = $Opcion.text();
    var Operador = 1;
    var Naturaleza = $('#NaturalezaPaso' + Paso).val();


    if(Naturaleza == ''){
     // SalesUp.Variables.SeleccionaPasoAnterior(Paso);
    }
    
    var $MismoTipo = $FiltrosPaso.find('.FiltroEtiqueta[data-cat="'+Categoria+'"][data-tipo="'+Tipo+'"]');
    var mt = _.size($MismoTipo);
    if(mt>=1){Operador = $($MismoTipo[0]).attr('data-operador');}

    var $Existe = $FiltrosPaso.find('.FiltroEtiqueta[data-valor="'+Filtro+'"][data-cat="'+Categoria+'"][data-tipo="'+Tipo+'"]');
    var Existe = _.size($Existe);
    var nombrecompleto = TextoFiltro+' '+TextoFiltroHijo;
    var Etiqueta = SalesUp.Sistema.StrReplace('{{ValorFiltro}}', nombrecompleto, templateFiltros);
      Etiqueta = SalesUp.Sistema.StrReplace('{{Valor}}', Filtro, Etiqueta);
      Etiqueta = SalesUp.Sistema.StrReplace('{{Paso}}', Paso, Etiqueta);
      Etiqueta = SalesUp.Sistema.StrReplace('{{Universo}}', Paso-1, Etiqueta);
      Etiqueta = SalesUp.Sistema.StrReplace('{{Cat}}', Categoria, Etiqueta);
      Etiqueta = SalesUp.Sistema.StrReplace('{{Tipo}}', Tipo, Etiqueta);
      Etiqueta = SalesUp.Sistema.StrReplace('{{id}}', SalesUp.Construye.IdUnico(), Etiqueta);
      Etiqueta = SalesUp.Sistema.StrReplace('{{Operador}}', Operador, Etiqueta);
      Etiqueta = SalesUp.Sistema.StrReplace('{{TextoFiltro}}', nombrecompleto, Etiqueta);
   
      if((Categoria=='1')&&(Tipo=='1')){
        Etiqueta = SalesUp.Sistema.StrReplace('{{TextoFiltro}}', '', Etiqueta);
      }else{
        Etiqueta = SalesUp.Sistema.StrReplace('{{TextoFiltro}}', TextoFiltro+':', Etiqueta);
      }

    if(mt>0){
      if(mt>1){ $MismoTipo = $($MismoTipo[mt-1]);}
      (Existe==0) ? $MismoTipo.after(Etiqueta) : '';
    }else{
      (Existe==0) ? $FiltrosPaso.append(Etiqueta) : '';
    }
    
    if(Existe>0){
      var Texto = TextoFiltroHijo;
      if(!((Categoria=='1')&&(Tipo=='1'))){ Texto = TextoFiltro + ':' + Texto; }
      
      SalesUp.Construye.MuestraMsj({tMsg:1, Msg:'El filtro <b>['+Texto+']</b> ya se encuentra agregado en este paso'});
      return false;
    }

    $OpcionesFiltros.slideUp().html('');
    SalesUp.reportes.verOpcionesFiltros({Paso:Paso, In:true});
  }/*seleccionarFiltro*/

  this.CargaFiltrosSistema = function(Op){

    var Filtro = Op.Filtro;
    var Paso = Op.Paso;
    var Categoria = Op.Categoria;
    var TextoFiltro = Op.TextoFiltro;
    var $OpcionesFiltros = $('#OpcionesTipoFiltros'+Paso);
    var OpcionesFiltros = 'OpcionesTipoFiltros'+Paso;
    var $BoxComodin = $('#BoxComodin');
    var jsonFiltroTipo = 'jsonFiltro-'+Categoria+'-'+Filtro;
    var Extra = '';
    (Op.Paises) ? Extra += '&Paises='+Op.Paises : '';
    var infoReporte = SalesUp.Variables.jsonInfoReportes;
    var jCriterios = infoReporte.criterios;
    
    for (var i = 0; i < jCriterios.length; i++) {
      if(Filtro==jCriterios[i].idCriterio){
        var jsonCriteriosOpciones = obtieneLosCriterios(jCriterios[i]);
      }
    }
    
    SalesUp.Construye.ConstruyemeUn({
      Control:'select', Nuevo: false, SeleccioneOpcion: true, IdControl: OpcionesFiltros,
      Template: templateOpcionHijo,Datos: jsonCriteriosOpciones
    });

    $OpcionesFiltros.attr('data-cat',Categoria);
    $OpcionesFiltros.attr('data-TextoFiltro',TextoFiltro);
    $OpcionesFiltros.attr('data-Tipo',Filtro);

    $('#Load'+Paso).hide();
    $OpcionesFiltros.slideDown(); 
  }/*CargaFiltrosSistema*/

  this.activaOpcionesEtiqueta = function(Op){
    var $Elemento = $(Op.Elemento);
    var Id = Op.Id;
    $Elemento.popover('destroy');

    var $Etiqueta = $Elemento.closest('.FiltroEtiqueta');
    var $Padre = $Etiqueta.closest('.PasoBox');
    
    var t = $Etiqueta.attr('data-tipo');
    var c = $Etiqueta.attr('data-cat');
    var o = $Etiqueta.attr('data-operador');
    var Hermanos = _.size($Padre.find('.FiltroEtiqueta[data-tipo="'+t+'"][data-cat="'+c+'"]'));

    var PopOverId = 'PopOver'+SalesUp.Construye.IdUnico();
    var TemplatePopover = '<div class="popover PopOverAcciones" id="'+PopOverId+'" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>';

    var Operador_Y = '';
    var Operador_O = '';
    if(o=='1'){Operador_Y = '<i class="fa fa-check Verde"></i>';}else{Operador_O = '<i class="fa fa-check Verde"></i>';}

    var MenuOpciones = '';
    (Hermanos>1) ? MenuOpciones += '<span onclick="SalesUp.reportes.opcionesAccionesFiltros({Accion:2, Id:\''+Id+'\', Operador:2 });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-calculator"></i> Operador lógico "O" '+Operador_O+'</span>':'';
    (Hermanos>1) ? MenuOpciones += '<span onclick="SalesUp.reportes.opcionesAccionesFiltros({Accion:2, Id:\''+Id+'\', Operador:1 });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-calculator"></i> Condicion lógico "Y" '+Operador_Y+'</span>':'';
    MenuOpciones += '<span onclick="SalesUp.reportes.opcionesAccionesFiltros({Accion:1, Id:\''+Id+'\' });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-trash"></i> Eliminar filtro</span>';

    $Elemento.popover({
      html:true, container:'body', placement:'top',
      template:TemplatePopover,
      content:MenuOpciones
    });

    $Elemento.popover('show');

    var $PopOverId = $('#'+PopOverId);
    var Cerrar = true;
    $PopOverId.mouseleave(function(){
      Cerrar = true;
      setTimeout(function(){(Cerrar) ? $PopOverId.hide():'';}, 1000);
    }).mouseenter(function(){
      Cerrar = false;
    }).click(function(){
      $PopOverId.hide();
    });

    setTimeout(function(){(Cerrar) ? $PopOverId.hide():'';}, 4000);

    $Elemento.mouseleave(function(){
      Cerrar = true;
      setTimeout(function(){(Cerrar) ? $PopOverId.hide():'';}, 3000);
    }).mouseenter(function(){
      Cerrar = false;
    });
  }/*SalesUp.Variables.activaOpcionesEtiqueta*/

  this.opcionesAccionesFiltros = function(Op){
    var Id = Op.Id;
    var $Etiqueta = $('#'+Id);
    var Accion = Op.Accion;
    var Operador = Op.Operador;
    var categoria = $Etiqueta.data('cat');
    var paso = $Etiqueta.data('paso');

    if(Accion==1){
      if(categoria == 0){
        $('#NaturalezaPaso' + paso).val('');
      }
      $Etiqueta.slideUp();
      setTimeout(function(){$Etiqueta.remove();}, 1200);  
    }

    if(Accion==2){
      var $Padre = $Etiqueta.closest('.PasoBox');
      var t = $Etiqueta.attr('data-tipo');
      var c = $Etiqueta.attr('data-cat');
      $Padre.find('.FiltroEtiqueta[data-tipo="'+t+'"][data-cat="'+c+'"]').attr('data-operador',Operador);
    }
  }

  this.aplicarFiltro = function(Op){
    var $lasVariantes = $('#lasVariantes'), $laVariante = $('#laVariante'), $laOpcion = $laVariante.find('option:selected');
    var tipoVariante = $laOpcion.attr('data-sistema');
    var arrQry = {}, $Contenedor = $('#lasVariantes'), arrInputs = $Contenedor.find('input, select, textarea');

    arrQry.tipoVariante = tipoVariante;
    for (var i = 0; i <= arrInputs.length - 1; i++){
      var $e = $(arrInputs[i]);
      var name = $e.attr('name'), valor = $.trim($e.val());
      if(name){ arrQry[name] = valor; }
    }

  }

  this.editarVariante = function(){
    var $laVariante = $('#laVariante');
    var tkrsv = $laVariante.val();
    console.log('Editar ',tkrsv);
    crearVariante({tkrsv:tkrsv});
  }/*editarVariante*/

  this.compartirVariante = function(v){
    var $pop = $('#popUpNuevoDash'), $boxSeleccionar = $('#boxSeleccionarCompartir');
    var alto = '120px';
    destruirSelect();
    $boxSeleccionar.hide();
    
    if((v==2)||(v==3)){
      alto='auto'; 
      $boxSeleccionar.show();
      seleccionarCompartir(v);
    }
    
    $pop.find('.BodyModal').css('height',alto);
  }/*compartirVariante*/

  var seleccionarCompartir = function (v){
    if (v==2) {ltGrupos();}
    if (v==3) {ltEjecutivos();}
  }
  var $selectCompartir;
  var ltGrupos = function(){
    var $ltCompartir = $('#ltCompartir');
    $ltCompartir.addClass('InfoObligatorio').attr('placeholder','Seleccionar grupos...').show();
      
    var construyeSelectize = function(Op,err){
      var jsonGrupos = Op.jsonDatos;

      setTimeout(function(){
        $selectCompartir = $('#ltCompartir').selectize({
          plugins: ['remove_button'],
          dropdownParent:'body', closeAfterSelect:true,
          options:jsonGrupos,
          valueField:'tkg', searchField:['Grupo'], labelField:'Grupo'
        });

        $('.ltCompartirDash.selectize-control').addClass('w100');
        $('.ltCompartirDash.selectize-dropdown').css('z-index','110');

      }, 5);
    }/*construyeSelectize*/

      SalesUp.Sistema.CargaDatosAsync({ link:'/privado/Modelo/jsonGruposAutorizados.dbsp', callback:construyeSelectize });
  } /*ltGrupos*/
  var ltEjecutivos = function(){
    
    var $ltCompartir = $('#ltCompartir');

    var construyeSelectize = function(Op,err){
      var jsonUsuarios = Op;
      jsonUsuarios = _.reject(jsonUsuarios.jsonDatos, function(j){  
        if(j.tku == SalesUp.Sistema.Almacenamiento({a:'SysTku'})){ return j; }
      });

      var arrGrupos = [], arrIdGrupos = [], objGrupos = [], arrNuevoOrden = [];
      var Posicion, MiGrupo;
      
      for(var i = 0; i <= jsonUsuarios.length - 1; i++){
        var arr = {}, GRUPO = jsonUsuarios[i].GRUPO, IDGRUPO = jsonUsuarios[i].IDGRUPO;
        
        if(arrGrupos.indexOf(GRUPO)==-1){
          arr.GRUPO = GRUPO;
          objGrupos.push(arr);
          arrGrupos.push(GRUPO);
          arrIdGrupos.push(IDGRUPO);
        }
      }
      var sGrupo = parseInt(SalesUp.Variables.sGrupo);
      for(var x = 0; x < _.size(arrIdGrupos); x++){
        if(arrIdGrupos[x]==sGrupo){Posicion=x;}
      }

      MiGrupo = arrGrupos[Posicion];

      arrGrupos = _.reject(arrGrupos, function(arr){ if(arr==MiGrupo){return arr;} });

      arrNuevoOrden.push(MiGrupo);

      arrGrupos = _.sortBy(arrGrupos, function(arr){ return arr; });

      for(var z = 0; z < _.size(arrGrupos); z++){
        arrNuevoOrden.push(arrGrupos[z]);
      }
      
      $ltCompartir.addClass('InfoObligatorio').attr('placeholder','Seleccionar ejecutivos...').show();
      
      setTimeout(function(){
        $selectCompartir = $('#ltCompartir').selectize({
          plugins: ['remove_button'],
          dropdownParent:'body', closeAfterSelect:true,
          options:jsonUsuarios,
            valueField:'tku', searchField:['NOMBRE'], labelField:'NOMBRE',
            optgroups:objGrupos, optgroupField:'GRUPO', optgroupLabelField:'GRUPO', 
            optgroupValueField:'GRUPO', optgroupOrder:arrNuevoOrden
        });

        $('.ltCompartirDash.selectize-control').addClass('w100');
        $('.ltCompartirDash.selectize-dropdown').css('z-index','110');
      }, 5);

    }/*construyeSelectize*/

    SalesUp.Sistema.CargaDatosAsync({ link:'/privado/Modelo/jsonListarUsuarios.dbsp', callback:construyeSelectize });
  } /* ltEjecutivos */
  var destruirSelect = function(){
    
    $('.ltCompartirDash.selectize-control').removeClass('w100');
    
    if($selectCompartir){
      if($selectCompartir[0].selectize){
        $selectCompartir[0].selectize.destroy();
      }
    }
    
    $('#ltCompartir').removeClass('InfoObligatorio').val('').hide();
  }/*destruirSelect*/

  this.guardaVariante = function(Op){
    var infoReporte = SalesUp.Variables.jsonInfoReportes;
    var idreporte = SalesUp.Variables.tkrs;
    var tkVariante = (SalesUp.Variables.varianteActual)?SalesUp.Variables.varianteActual:'';
    var nombre = $("#nombreVariante").val();
    var agrupar = $("#agrupar").val();
    var periodo = $("#periodo").val();
    var totalizar = $("#totalizar").val();
    var criterios = $("#Criterios").val();
    var compartiSelect = $("#selectCompartirDash").val();
    var compartir = $("#ltCompartir").val()
    var t = Op.t;
    var elBoton = t;
    var $form = $(t).closest('form'), $contVentana = $(t).closest('.ContenedorModal.PopUp');
    var pasa = SalesUp.Valida.ValidaObligatorios({DentroDe:$form, DestinoMsj:$contVentana});

    var FiltrosAdicionales = $(".FiltroEtiqueta").map(function(){
      return {Filtro:$(this).data('tipo'),valor:$(this).data('valor'),operador:$(this).data('operador'),criterio:$(this).data('criterio')}
    }).get();
    
    FiltrosAdicionales = JSON.stringify(FiltrosAdicionales);

    $("#Criterios").change(function(){
      if(criterios==""){ $(".inputCriterios .selectize-input").removeClass('DatoMal'); }
    });
    if(criterios==""){ 
      $(".inputCriterios .selectize-input").addClass('DatoMal'); 
    }else{ 
      $(".inputCriterios").removeClass('DatoMal'); 
    }
    
    var enviar = 'name='+encodeURIComponent(nombre)+
                 '&group='+agrupar+'&periodicidad='+periodo+
                 '&total='+totalizar+'&criterio='+criterios+
                 '&filtroadicional='+encodeURIComponent(FiltrosAdicionales)+
                 '&compartidocon='+compartir+'&compartirInput='+compartiSelect+
                 '&tkReporte='+idreporte+'&tkreportevariante='+tkVariante;

    console.log(enviar);
    if(pasa){
      SalesUp.Sistema.CargaDatosAsync({
        link:'/privado/Modelo/guardaVariantes.dbsp',
        parametros:enviar,
        callback:function(Op,err){
          
          SalesUp.Construye.CierraPopUp({t:elBoton});

          if (err){
            var mensajeError = 'La variante no se ha creado correctamente';
            if(tkVariante){ mensajeError = 'La variante no se ha modificado correctamente'; }
            SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-times"></i> '+mensajeError+', intentalo nuevamente.'});
            return;
          }

          var infoReporte = SalesUp.Variables.jsonInfoReportes;
          var variantes = infoReporte.variantes;

          if(tkVariante){
            variantes = _.reject(variantes, function(j){ return j.tkRsv == tkVariante});
          }
          console.log(Op);
          variantes.push(Op);          
          
          SalesUp.Variables.jsonInfoReportes.variantes = variantes;
          SalesUp.Variables.varianteActual = Op.tkRsv;
          contruyeOpcionesVariantes(SalesUp.Variables.jsonInfoReportes);

          var mensajeOk = 'Variante creada.';
          if(tkVariante){ mensajeOk = 'Variante modificada.'; }
          SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-check"></i> '+mensajeOk});
          
        }
      });
    }

  }/*guardaVariantes*/

  this.alertaEliminarVariante = function(){
    var $laVariante = $('#laVariante');
    var variante = $laVariante.find('option:selected').text();
    var callback = 'SalesUp.reportes.eliminarVariante()', 
    pregunta = '<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/>¿Estas seguro de eliminar la variante "'+variante+'" ?';

    SalesUp.Construye.MuestraAlerta({
      TipoAlerta:'AlertaPregunta', Alerta:pregunta, Id:'alertaEliminarSeccion',
      Boton1:'Si, eliminar', Icono1:'<i class="fa fa-trash"></i>', Callback1: callback,
      Boton2:'Cancelar', Icono2:'',
      Ancho:'500px'
    });
  }/*alertaEliminarVariante*/

  this.eliminarVariante = function(){
    var $laVariante = $('#laVariante');
    var tkrsv = $laVariante.val();
    var variante = $laVariante.find('option:selected').text();
    

    SalesUp.Sistema.CargaDatosAsync({
      link:'/privado/Modelo/qryEliminarVarianteReporte.dbsp', 
      parametros:'tkrsv='+tkrsv,
      callback: function(Op,err){
        if (err){
          SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-times"></i> La variante "'+variante+'" no se ha eliminado, intentalo nuevamente.'});
          return;
        }

        var infoReporte = SalesUp.Variables.jsonInfoReportes;
        var variantes = infoReporte.variantes;
        variantes = _.reject(variantes, function(j){ return j.tkRsv == tkrsv});
        SalesUp.Variables.jsonInfoReportes.variantes = variantes;
        SalesUp.Variables.varianteActual = undefined;
        contruyeOpcionesVariantes(SalesUp.Variables.jsonInfoReportes);
        SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-check"></i> Variante "'+variante+'" eliminada.'});
    
      }
    });
  }/*eliminarVariante*/

  var cargaElReporte = function(){
    /*console.info('cargaElReporte', SalesUp.Variables.tkrs);*/
    var tkrs = SalesUp.Variables.tkrs;
    var infoReporte = SalesUp.Variables.jsonInfoReportes;
    var json = infoReporte.jsonDatos[0].info;
    console.log(json);
    /*$('#graficaReporte, #DatosLoad').html(SalesUp.Sistema.unMomento());*/
    $('#DatosLoad').html(SalesUp.Sistema.unMomento());

    if(tkrs==='320DB1C0-F01D-43C5-BC40-421AEBDE4350'){
      reporteActividades();
    }
    
    if(tkrs==='A19351BC-82B3-4D04-8E89-330CFE094A68'){
      reporteVentasProducto();
    }
  }/*cargaElReporte*/
  var reporteActividades = function(){
    console.log('reporteActividades');
  }

  var reporteVentasProducto = function(){
    var datosTreeMap = function(jsonPGrafica, niveles,orden,start,length){
      // length = 10000
      start+length-1
      
      var colors = coloresReporte;/*_.shuffle(coloresReporte)*/
      var data = jsonPGrafica, points = [],BYMRP,BYMRVal,BYMRI = 0,lineaP,lineaI,productP,productI,BYMR,linea,product,contador = 1;
      for (BYMR in data) {
        if (data.hasOwnProperty(BYMR)) {
          BYMRVal = 0;
          if(niveles == 1){
            BYMRVal = Math.round(data[BYMR][0][orden]);
          }
          /*Highcharts.getOptions().colors*/
          BYMRP = {
            id: 'id_' + BYMRI,
            name: BYMR,
            color: colors[BYMRI]
          };
          lineaI = 0
          if (niveles >=2) {
            for (linea in data[BYMR]) {
              if (data[BYMR].hasOwnProperty(linea)) {
                lineaP = {
                  id: BYMRP.id + '_' + lineaI,
                  name: linea,
                  parent: BYMRP.id
                };
                if(niveles == 2){
                  BYMRVal += parseFloat(data[BYMR][linea][0][orden]);
                  lineaP.value= parseFloat(data[BYMR][linea][0][orden]);
                }
                points.push(lineaP);
                productI = 0;
                if (niveles >=3) {
                  for (product in data[BYMR][linea]) {
                    if (data[BYMR][linea].hasOwnProperty(product)) {
                      productP = {
                        id: lineaP.id + '_' + productI,
                        name: product,
                        parent: lineaP.id,
                        value: parseFloat(data[BYMR][linea][product][0][orden])
                      };
                      BYMRVal += productP.value;
                      points.push(productP);
                      productI = productI + 1;
                    }
                  }
                }
                lineaI = lineaI + 1;
              }
            }
          }
          BYMRP.value = BYMRVal
          points.push(BYMRP);
          BYMRI = BYMRI + 1;
          contador = contador + 1;
          if (contador < start) {
            BYMRI = 0
            points = [];
          }
          if (contador > start+length-1) break;
        }
      }
      return points;
    }/*datosTreeMap*/


    var muestraReporte = function(Op,err,args){
        /* INICIA TEMPLATE 1*/
        var orden = Op.jsonDatos[0].ORDEN;
        tmp1 = Op.jsonAll;
        var agrupacion = Op.jsonDatos[0].AGRUPACION;
        var tmpBody = '<tr>';
        tmpBody += '<td class="centrado"><b>{{nFila}}</b></td>';
        var tmpFoot = '<tr style="border-top:1px dotted black;">';
        switch(parseInt(agrupacion)) {
          case 9:
          var tmpHead = '<tr><th>#</th><th style="text-align:left">Código</th><th style="text-align:left">Producto</th><th>Línea</th><th>Marca</th><th>Cantidad</th><th>Monto</th><th>%</th><tr>';
          tmpBody += '<td >{{CODIGO}}</td>';
          tmpBody += '<td >{{NOMBRE}}</td>';
          tmpBody += '<td class="centrado">{{LINEA_PRODUCTO}}</td>';
          tmpBody += '<td class="centrado">{{MARCA}}</td>';
          tmpFoot += '<td></td><td></td><td></td><td></td>';
          break;
          case 3:
          var tmpHead = '<tr><th>#</th><th>Linea</th><th>Cantidad</th><th>Monto</th><th>%</th><tr>';
          tmpBody += '<td class="centrado">{{LINEA_PRODUCTO}}</td>';
          tmpFoot += '<td></td>';
          break;
          case 10:
          var tmpHead = '<tr><th>#</th><th>Marca</th><th>Cantidad</th><th>Monto</th><th>%</th><tr>';
          tmpBody += '<td class="centrado">{{MARCA}}</td>';
          tmpFoot += '<td></td>';
          break;
          default:
          var tmpHead = '<tr><th>#</th><th>Agrupación</th><th>Cantidad</th><th>Monto</th><th>%</th><tr>';
          tmpBody += '<td >{{EJECUTIVO}}{{GRUPO}}</td>';
          tmpFoot += '<td></td>';
          break;
        }
        tmpBody += '<td class="centrado">{{CANTIDAD}}</td>';
        tmpBody += '<td style="text-align:right;">{{hlp_Simbolo_Moneda GT simbolo}}</td>';
        tmpBody += '<td style="width: 100px !important;"><div class="w100"><div class="progress progress-striped active shadow"><span class="LbPorcentaje">{{PORCENTAJE}}%</span><span class="LbIndicador Pointer Transition" data-porcentaje="{{PORCENTAJE}}%" tip="ehllos" ></span><div class="progress-bar progress-bar-stripes OcultarImprimir" data-porcentaje="{{PORCENTAJE}}%" style="width:{{PORCENTAJE}}%"></div></div> </td>';
        tmpBody += '</tr>';
        tmpFoot += '<td  class="centrado">TOTAL</td><td  class="centrado">'+Op.jTotales.CANT+'</td><td  class="centrado ">'+SalesUp.Sistema.moneda({moneda:SalesUp.Sistema.Almacenamiento({a:'SysMoneda'}),numero:Op.jTotales.GT})+'</td><td style="width: 100px !important;"><div class="w100"><div class="progress progress-striped active shadow"><span class="LbPorcentaje">100%</span><span class="LbIndicador Pointer Transition" data-porcentaje="100%" tip="ehllos" ></span><div class="progress-bar progress-bar-stripes OcultarImprimir" data-porcentaje="100%" style="width:100%"></div></div> </td></tr>'
        /*  FINAL TEMPLATE 1 */ 

        var jsonReporteActividades = Op.jsonDatos;
        var jsonNDatos = Op.jCount.COLUMN1;

        /* CONSTRUYE LOS DATOS QUE SE LE PASARAN A LA GRAFICA */
        if (agrupacion == 9) {
          jsonPGrafica = _.groupBy(Op.jsonAll,'NOMBRE');
          var points;
          points = datosTreeMap(jsonPGrafica,1,orden,1,10)
        }else if (agrupacion == 3) { /*SE HACE SI ESTAN AGRUPADOS POR  PRODUCTO*/
          jsonPGrafica = _.groupBy(Op.jsonAll,'LINEA_PRODUCTO');
          jsonPGrafica = _.mapObject(jsonPGrafica,function(array){
            var array2 = _.groupBy(array, 'MARCA');
            array2 = _.mapObject(array2,function(ab){
              return _.groupBy(ab,'NOMBRE');
            });
            return array2;
          });
          var points;
          points = datosTreeMap(jsonPGrafica,3,orden,1,10)
        }else if(agrupacion == 10){ /*SE HACE SI ESTAN AGRUPADOS POR  LINEA*/
          jsonPGrafica = _.groupBy(Op.jsonAll,'MARCA');
          jsonPGrafica = _.mapObject(jsonPGrafica,function(array){
            var array2 = _.groupBy(array, 'LINEA_PRODUCTO');
            array2 = _.mapObject(array2,function(ab){
              return _.groupBy(ab,'NOMBRE');
            }
            );
            return array2;
          });
          var points;
          points = datosTreeMap(jsonPGrafica,3,orden,1,10)
        }else{
          if (agrupacion == 1) {
            var agrupacion = 'USUARIO';
          }
          if (agrupacion == 2) {
            var agrupacion = 'GRUPO';
          }
          jsonPGrafica = _.groupBy(Op.jsonAll,agrupacion);
          jsonPGrafica = _.mapObject(jsonPGrafica,function(array){
            return _.groupBy(array, 'NOMBRE');
            /*return array2;*/
          });
          var points;
          
          points = datosTreeMap(jsonPGrafica,2,orden,1,10)
        }

        /*SE HACE SI ESTAN AGRUPADOS POR  MARCA*/

        var hayReporte = _.size(jsonReporteActividades);

        /*SalesUp.Sistema.CargaDatos({Link:'Filtros_Reporte_PV.dbsp', Div:1, Destino:'#filtros' });*/
        SalesUp.Construye.ConstruyeTabla(tmpHead,tmpBody,jsonReporteActividades,{Destino:'#DatosLoad',Id:'reporteContenido',PagActual:SalesUp.Sistema.paginaActual(),NumRegistros:jsonNDatos});

        $('#reporteContenido tfoot').html(tmpFoot);
        SalesUp.Sistema.IniciaPlugins();
        console.log(points);
        contruyeGrafica({data:points});
        SalesUp.Sistema.Tipsy();
      }/*muestraReporte*/

    var $lasVariantes = $('#lasVariantes'), $laVariante = $('#laVariante'), $laOpcion = $laVariante.find('option:selected');
    var tipoVariante = $laOpcion.attr('data-sistema');
    var qryString = 'tkrs='+SalesUp.Variables.tkrs+'&tipoVariante='+tipoVariante+'&'+SalesUp.Sistema.qryString({Formulario:$lasVariantes})+'&inicia='+SalesUp.Variables.pagInicio;

    console.log(qryString);

    SalesUp.Sistema.CargaDatosAsync({
      link:'/privado/Modelo/jsonProductosVentas.dbsp',
      prmAdicionales:qryString,
      parametros:qryString,
      callback:muestraReporte
    });
  }/*reporteVentasProducto*/

  var contruyeGrafica = function(Op){
    var points = Op.data;
    var infoReporte = SalesUp.Variables.jsonInfoReportes;
    var nombreReporte = infoReporte.jsonDatos[0].reporte;

    var datosGrafica = {
      title:{text:nombreReporte, useHTML:true},
      credits:{enabled:false},
      exporting:{enabled:false},
      chart:{backgroundColor:'rgba(255, 255, 255, 0.8)'},
      
      tooltip:{
        formatter:function(){
          return 'Monto vendido<br/><b>' + SalesUp.Sistema.moneda({moneda:'$', numero:this.point.value}) + '</b>';
        }
      },
      
      series:[{
          data:points,
          type:'treemap',
          layoutAlgorithm:'squarified',
          allowDrillToNode:true,
          animationLimit:1500,
          dataLabels:{enabled:false},
          levelIsConstant:false,
          levels:[{ level:1, borderWidth:2, dataLabels:{ enabled: true } }]
      }]
    };

    $('#graficaReporte').highcharts(datosGrafica);

  };/*contruyeGrafica*/

}/*repotes*/

if (window.reportes) { 
  SalesUp.reportes = new reportes();
  var path = document.location.pathname;
  if (path.indexOf('reporte.dbsp')!=-1){
    SalesUp.reportes.inicia({tkrs:SalesUp.Variables.tkrs});  
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
