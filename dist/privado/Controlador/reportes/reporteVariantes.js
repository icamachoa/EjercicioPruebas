var reporteVariantes = function(){
  
  this.crearVariante = function(Op){
    crearVariante(Op);
  }
  this.cancelarCrearReporte =  function(t){ 
      var $laVariante = $('#laVariante');
      var v = SalesUp.Variables.antCrearVariante, vActual = $laVariante.val();
      
      (vActual=='-1') ? $laVariante.val(v) : '';
      SalesUp.reportes.muestraAccionesMisVariantes($laVariante[0]);
      SalesUp.Construye.CierraPopUp({t:t});
  }/*cancelarCrearReporte*/
  
  var crearVariante = function(Op){
    (!Op) ? Op = {} : '';
    var tkrsv = Op.tkrsv;
    SalesUp.Construye.MuestraPopUp({
      alto:'360px', ancho:'650px', id:'popUpVarianteReporte',
      titulo:'Nueva variante de reporte', 
      fuente:'/privado/popup_crear_variante.dbsp'
    });
    
    setTimeout(function(){
      $('#popUpVarianteReporte .HeadModal .fa-times').attr('onclick','SalesUp.reportes.variantes.cancelarCrearReporte(this);');
      preparaSelectPopVariantes();
      $('#nombreVariante').focus();
      //hans aqui
      var arrRestricciones = _.where( SalesUp.Variables.jsonInfoReportes.criterios,{restriccion:1} );
      var Totalizar = SalesUp.Variables.jsonInfoReportes.jsonDatos[0].totalizar;
      
      var arr = [];
      var arrNombres = [];
      for(var i = 0; i < arrRestricciones.length; i++){
        arr.push(arrRestricciones[i].idCriterio);
        arrNombres.push(arrRestricciones[i].criterio);
      }
      
      arrNombres = arrNombres.join();
      SalesUp.Variables.NombreCriteriosObligatorios = arrNombres;
      arr = arr.join();
      $('#Criterios').val(arr);
      $('#CriteriosObligatorios').val(arr);
      
      if(Totalizar==0){
        $('#compartirManipular').removeClass('w50').addClass('w100');
        $('#ocultaTotalizar').hide();
      }
      
      if(!Op.tkrsv){setTimeout(function(){activaSelectizeCriterios();},100);}
      if(Op.tkrsv){activaEditarVariante(Op.tkrsv);}
    }, 500);

  }/*crearVariante*/

  var activaEditarVariante = function(tkrsv){
    $('#popUpVarianteReporte #TituloModal').html('Editar variante de reporte');
    SalesUp.Sistema.CargaDatosAsync({
      link:'/privado/Modelo/jsonInfoVarianteReporte.dbsp', 
      parametros:'tkrsv='+tkrsv,
      callback:function(Op,err){
        if (err){
          SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-times"></i> No se pudo cargar la información de la variante, intentalo nuevamente.'});
          return;
        }
        
        var variante = Op.variante[0];
        var criterios = Op.criterios;
 
        $("#nombreVariante").val(variante.variante);
        //$("#agrupar").val(variante.agruparPor);
        $("#totalizar").val(variante.totalizar);
        $("#selectCompartirDash").val(variante.compartido);
        $("#Criterios").val(variante.criteriosVisibles);
        
        $("#periodo").val(variante.periodicidad);
        SalesUp.reportes.variantes.compartirVariante(variante.compartido); 
        
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
    Op = _.reject(Op, function(j){ return _.size(j)==0; });

    for (var i = 0; i < Op.length; i++){Op[i].id=SalesUp.Construye.IdUnico();}
    var templateFiltros = '{{#each criterios}}';
        templateFiltros += '<span id="{{id}}" class="FiltroEtiqueta FiltroNormal" data-criterio="{{filtro}} " data-Operador="{{operador}}" data-Tipo="{{idFiltro}}" data-valor="{{valor}}">{{filtro}} <span class="ConfingFiltro Transition" onclick="SalesUp.reportes.variantes.activaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});"><i class="fa fa-ellipsis-v"></i></span></span>';
        templateFiltros += '{{/each}}';
    
    var Etiqueta = SalesUp.Construye.ReemplazaDatos({Template:templateFiltros,Datos:{criterios:Op}});
    $('#FiltrosPaso1').append(Etiqueta);  
  };

  var preparaSelectPopVariantes = function (){
    var infoReporte = SalesUp.Variables.jsonInfoReportes;
    var size        = _.size(infoReporte.agrupaciones);

    if(size == 1){
      var $popUpVarianteReporte = $('#popUpVarianteReporte');
      var j = {opciones:infoReporte.agrupaciones};
      $("#agrupar").remove();
      var rem = '<input id="agrupar" readonly name="agrupar" class="InfoObligatorio BoxSizing InfoData">';
      $("#remplaza").html(rem);
      $("#agrupar").val(SalesUp.Variables.jsonInfoReportes.agrupaciones[0].Agrupacion);
      $("#valorOculto").val(parseInt(SalesUp.Variables.jsonInfoReportes.agrupaciones[0].idAgrupacion));
    }else{
      var $popUpVarianteReporte = $('#popUpVarianteReporte');
      var tmpOpcion = '{{#each agrupaciones}}<option value="{{idAgrupacion}}">{{Agrupacion}}</option>{{/each}}';
      var j = {opciones:infoReporte.agrupaciones};
      var htmlOpcion = SalesUp.Construye.ReemplazaDatos({Template:tmpOpcion, Datos:infoReporte});
      $popUpVarianteReporte.find('#agrupar').html(htmlOpcion);
    }
    
   
   
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
    var infoReporte = filtrosVisibles();
    
    if($criteriosSelectize){
      if($criteriosSelectize[0].selectize){
        $criteriosSelectize[0].selectize.destroy();
      }
    }

    //infoReporte = _.sortBy(infoReporte, 'criterio');
    var $popUpVarianteReporte = $('#popUpVarianteReporte');
    $criteriosSelectize = $popUpVarianteReporte.find('#Criterios').selectize({
      plugins: ['remove_button'], 
      dropdownParent:'body', 
      closeAfterSelect:true,
      valueField:'idCriterio', 
      searchField:['criterio'], 
      labelField:'criterio',
      sortField:'criterio',
      sortDirection: 'asc',
      options:infoReporte,
     

    });
    setTimeout(function(){
      $('.selectize-control.inputCriterios').addClass('w100 BoxSizing InfoData');
    }, 200);
  } /* /EtiquetasSelectize*/
  
  var templateOpcion     = '<option value="{{idCriterio}}" data-id="{{idElemento}}" >{{criterio}}</option>';
  var templateOpcionHijo = '<option value="{{idOpcion}}">{{opcion}}</option>';
  var templateUniverso   = '<span id="{{id}}" class="FiltroEtiqueta Universo" data-Paso="{{Paso}}" data-Cat="{{Cat}}" data-Tipo="{{Tipo}}">{{TextoFiltro}} <span class="ConfingFiltro Transition" onclick="SalesUp.reportes.variantes.activaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});" ><i class="fa fa-ellipsis-v"></i></span></span>';
  var templateFiltros    = '<span id="{{id}}" class="FiltroEtiqueta FiltroNormal" data-criterio="{{ValorFiltro}}" data-Operador="{{Operador}}" data-Universo="{{Universo}}" data-Paso="{{Paso}}" data-Cat="{{Cat}}" data-Tipo="{{Tipo}}" data-valor="{{Valor}}">{{TextoFiltro}}<span class="ConfingFiltro Transition" onclick="SalesUp.reportes.variantes.activaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});"><i class="fa fa-ellipsis-v"></i></span></span>';
  var templatePaso       = '<span class="FiltroEtiqueta LabelPaso Transition">{{Pasos}}</span>';

  this.verOpcionesFiltros = function(Op){
      $('#OpcionesTipoFiltrosInput').val('');
      $('#OpcionesTipoFiltrosInput').slideUp();
    $('#botonAceptarBuscar').slideUp();
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
    var Opciones = filtradoDatosActuales();
    

    
    $FiltroTipo.html('');
    $('#OpcionesTipoFiltros'+Paso).html('').hide();
    $FiltroTipo.append('<option value="">(.. Seleccione una opción ..)</option>');
    Opciones = _.sortBy(Opciones, 'criterio');
    SalesUp.Construye.ReemplazaTemplate({Destino:$FiltroTipo, Datos:Opciones , Template:templateOpcion });
    SalesUp.reportes.variantes.verOpcionesFiltros({Paso:Paso, Out:Out});
  }/*activaMostrarFiltros*/
  
  SalesUp.Variables.TipoPais = '';
  
 

  this.mostrarFiltro = function(Op){
    var Filtro                 = Op.Filtro; 
    SalesUp.Variables.TipoPais = Op.Filtro;
    var $Elemento              = $(Op.Elemento);
    var Paso                   = Op.Paso;
    var $Opcion                = $Elemento.find('option:selected');
    var $FiltrosPaso           = $('#FiltrosPaso'+Paso);
    var $OpcionesFiltros       = $('#OpcionesTipoFiltros'+Paso);
    var Categoria              = $Opcion.attr('data-cat');
    var Naturaleza             = $Opcion.data('naturaleza');
    var TextoFiltro            = $Opcion.text();
    
    Op.TextoFiltro             = TextoFiltro;
    Op.Categoria               = Categoria;

 
    if(Filtro == 31){
      var $Pais = $('.FiltroEtiqueta[data-tipo="30"]');
      var nPais = _.size($Pais);
      if(nPais==0){
        MmSgN({'Mensaje':'<i class="fa fa-info-circle"></i> Necesita tener seleccionado un <b>[País]</b>','Destino':'.BoxBotonesAccion','malo':0});
        return false;
      }else if(nPais>1){
        MmSgN({'Mensaje':'<i class="fa fa-info-circle"></i> No se puede seleccecionar un estado ya que hay mas de un <b>"pais seleccionado"</b>.','Destino':'.BoxBotonesAccion','malo':1});
        return false;
      }else{
        var Paises = '';
        for (var i = 0; i <= $Pais.length - 1; i++){
          Paises += $($Pais[i]).attr('data-valor')+'|';
        }
        Op.Paises = Paises;
      }
    }

    if(Filtro == 31 || Filtro == 30){
      var $Pais   = $('.FiltroEtiqueta[data-tipo="30"]');
      var $Estado = $('.FiltroEtiqueta[data-tipo="31"]');
      var nPais   = _.size($Pais);
      var nEstado = _.size($Estado);
      var mensaje = '';
      if(Filtro == 30){
        mensaje = '<i class="fa fa-info-circle"></i> No puedes seleccionar un <b>[País]</b> por que tienes un <b>[Estado]</b> agregado';
      }
      if(Filtro == 31){
        mensaje = '<i class="fa fa-info-circle"></i> No puedes seleccionar un <b>[Estado]</b> por que tienes un <b>[País]</b> agregado';
      }
      
      if(nPais == 1 && nEstado == 1){
        MmSgN({'Mensaje':mensaje,'Destino':'.BoxBotonesAccion','malo':1});
        return false;
      }

    }
   
    if(Filtro!=''){
      $('#Load'+Paso).show();
      setTimeout(function(){
        (Filtro>0) ? SalesUp.reportes.variantes.CargaFiltrosSistema(Op) : SalesUp.Variables.CargaFiltrosPersonalizados(Op);
      }, 10);
    }
  }/*SalesUp.Variables.MostrarFiltro*/




  this.seleccionarFiltro = function(Op){ 

    $('#OpcionesTipoFiltrosInput').slideUp();
    $('#botonAceptarBuscar').slideUp();
    var Paso             = Op.Paso;
    var Filtro           = Op.Filtro;
    var $Elemento        = $(Op.Elemento);
    var Siguiente        = (Op.Siguiente) ? Op.Siguiente : 0;
    if(Filtro == 9){
       var $OpcionesFiltros = $('#OpcionesTipoFiltrosInput');
      var $FiltrosPaso     = $('#FiltrosPaso'+Paso);
      var $Opcion          = ''
      var Categoria        = $OpcionesFiltros.attr('data-cat');
      var TextoFiltro      = $OpcionesFiltros.attr('data-textofiltro');
      var Tipo             = $OpcionesFiltros.attr('data-tipo');
      var TextoFiltroHijo  =$('#OpcionesTipoFiltrosInput').val();
    }else{
      //hans working here
      var valor = $('#FiltroTipoPaso1').val();
      valor     = parseInt(valor)
      var pasa  = _.where( SalesUp.Variables.jsonInfoReportes.criterios,{idCriterio:valor,criterio:'Periodo'} );
      var parametro = "";
  
      if(pasa.length>0 && Filtro == 0){
        $('#OpcionesTipoFiltros1').hide();
        SalesUp.reportes.activaDatePickerPeriodo({donde:$('#FechaPicker')});
        var $OpcionesFiltros = $('#fechaFiltroVariantes');
        var $FiltrosPaso     = $('#FiltrosPaso'+Paso);
        var $Opcion          = ''
        var Categoria        = $OpcionesFiltros.attr('data-cat');
        var TextoFiltro      = 'Periodo';
        var Tipo             = $('#FiltroTipoPaso1').val();
        var TextoFiltroHijo  = $('#fechaFiltroVariantes').val();
        var fechass          = TextoFiltroHijo.split('-');
        var FechaGuarda      = fechass[0]+"|"+fechass[1];
        FechaGuarda          = FechaGuarda.replace(" ", "");
      }else{
          var $OpcionesFiltros = $('#OpcionesTipoFiltros'+Paso);
          var $FiltrosPaso     = $('#FiltrosPaso'+Paso);
          var $Opcion          = $Elemento.find('option:selected');
          var Categoria        = $OpcionesFiltros.attr('data-cat');
          var TextoFiltro      = $OpcionesFiltros.attr('data-textofiltro');
          var Tipo             = $OpcionesFiltros.attr('data-tipo');
          var TextoFiltroHijo  = $Opcion.text();
      }
    }
    var ProcesaEtiqueta = function() {
      var Operador         = 1;
      var Naturaleza       = $('#NaturalezaPaso' + Paso).val();
      var igual            = false;
      var TipoFiltro = SalesUp.Variables.TipoPais;
      
      if(TipoFiltro==30){
        var LosPaises = $('.FiltroEtiqueta[data-tipo="30"]');
        var nLosPaises = _.size(LosPaises)
          
        for (var i = 0; i <= LosPaises.length; i++){
            if($(LosPaises[i]).attr('data-valor') == Filtro){
              igual = true;
            }
        }  
        if(igual){
          MmSgN({'Mensaje':'<i class="fa fa-info-circle"></i> Ya tienes seleccionado este pais.','Destino':'.BoxBotonesAccion','malo':1}); 
          return false;
        }
      }
      
      var $MismoTipo = $FiltrosPaso.find('.FiltroEtiqueta[data-cat="'+Categoria+'"][data-tipo="'+Tipo+'"]');
      var mt = _.size($MismoTipo);
      if(mt>=1){Operador = $($MismoTipo[0]).attr('data-operador');}

       
          var $Existe = $FiltrosPaso.find('.FiltroEtiqueta[data-valor="'+Filtro+'"][data-cat="'+Categoria+'"][data-tipo="'+Tipo+'"]');
       
        var Existe         = _.size($Existe);
        //trabajando aqui hans
      
        var nombrecompleto = TextoFiltro+': '+TextoFiltroHijo;
       
        var Etiqueta       = SalesUp.Sistema.StrReplace('{{ValorFiltro}}', nombrecompleto, templateFiltros);
         if(Filtro==9 || Filtro==0){
          if(Filtro==0){
            Etiqueta           = SalesUp.Sistema.StrReplace('{{Valor}}', FechaGuarda, Etiqueta);
          }else{
            Etiqueta           = SalesUp.Sistema.StrReplace('{{Valor}}', TextoFiltroHijo, Etiqueta);
          }
        }else{
          Etiqueta           = SalesUp.Sistema.StrReplace('{{Valor}}', Filtro, Etiqueta);
        }
        
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
      SalesUp.reportes.variantes.verOpcionesFiltros({Paso:Paso, In:true});
      //hans
      activaSelectizeCriterios();

    }
  

   if(Filtro != 0){
    ProcesaEtiqueta();
   }

   if(Siguiente==1){
    ProcesaEtiqueta();
   }
 
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
    var jsonCriteriosOpciones = '';
     if(Filtro == 9){
      var $opcionInput = $('#OpcionesTipoFiltrosInput');
      $opcionInput.attr('data-cat',Categoria);
      $opcionInput.attr('data-TextoFiltro',TextoFiltro);
      $opcionInput.attr('data-Tipo',Filtro);
       $('#OpcionesTipoFiltrosInput').val('');
      $('#OpcionesTipoFiltrosInput').slideDown();
      $('#botonAceptarBuscar').slideDown();
      $('#Load'+Paso).hide();

    }else{
     
        /***************************************/
        $('#OpcionesTipoFiltrosInput').hide();
        $('#botonAceptarBuscar').hide();
        SalesUp.Variables.ExtraPais = Extra;
        //hans
        for (var i = 0; i < jCriterios.length; i++) {
            if(Filtro==jCriterios[i].idCriterio){
               var jsonCriteriosOpciones = jCriterios[i];
            }
          }
        jsonCriteriosOpciones = obtieneLosCriterios(jsonCriteriosOpciones);

        
        SalesUp.Construye.ConstruyemeUn({
          Control:'select', Nuevo: false, SeleccioneOpcion: true, IdControl: OpcionesFiltros,
          Template: templateOpcionHijo,Datos: jsonCriteriosOpciones
        });

        $OpcionesFiltros.attr('data-cat',Categoria);
        $OpcionesFiltros.attr('data-TextoFiltro',TextoFiltro);
        $OpcionesFiltros.attr('data-Tipo',Filtro);

        $('#Load'+Paso).hide();
        $OpcionesFiltros.slideDown(); 
        /***************************************/
    
    }
  }/*CargaFiltrosSistema hans*/

  this.activaOpcionesEtiqueta = function(Op){
    var $Elemento = $(Op.Elemento);
    var Id = Op.Id;
    $Elemento.popover('destroy');

    var $Etiqueta = $Elemento.closest('.FiltroEtiqueta');
    var $Padre = $Etiqueta.closest('.PasoBox');
    
    var t = $Etiqueta.attr('data-tipo');
    var c = $Etiqueta.attr('data-cat');
    var o = $Etiqueta.attr('data-operador');
    var Hermanos = _.size($Padre.find('.FiltroEtiqueta[data-tipo="'+t+'"]'));

    var PopOverId = 'PopOver'+SalesUp.Construye.IdUnico();
    var TemplatePopover = '<div class="popover PopOverAcciones" id="'+PopOverId+'" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>';

    var Operador_Y = '';
    var Operador_O = '';
    if(o=='1'){Operador_Y = '<i class="fa fa-check Verde"></i>';}else{Operador_O = '<i class="fa fa-check Verde"></i>';}

    var MenuOpciones = '';
    (Hermanos>1) ? MenuOpciones += '<span onclick="SalesUp.reportes.variantes.opcionesAccionesFiltros({Accion:2, Id:\''+Id+'\', Operador:2 });"  class="OpcionAcciones Pointer"><i class="fa fa-lg fa-calculator"></i> Operador lógico "O" '+Operador_O+'</span>':'';
    (Hermanos>1) ? MenuOpciones += '<span onclick="SalesUp.reportes.variantes.opcionesAccionesFiltros({Accion:2, Id:\''+Id+'\', Operador:1 });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-calculator"></i> Condicion lógico "Y" '+Operador_Y+'</span>':'';
    MenuOpciones += '<span onclick="SalesUp.reportes.variantes.opcionesAccionesFiltros({Accion:1, Id:\''+Id+'\' });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-trash"></i> Eliminar filtro</span>';

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
      setTimeout(function(){
        $Etiqueta.remove(); 
        var $selectCompartir = $('#Criterios').val();
        var obligatorio      = $('#CriteriosObligatorios').val();
        
        var arrUno           = $('#Criterios').val();
        var arrDos           = $('#CriteriosObligatorios').val();
        arrUno               = arrUno.split(',');
        arrDos               = arrDos.split(',');
        var completoConcat   = arrUno.concat(arrDos);
        var uniqueNames      = [];
        
        $.each(completoConcat, function(i, el){
            if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
        });        
        completoConcat = uniqueNames.join();

        $('#Criterios').val(completoConcat);
        activaSelectizeCriterios();
      }, 500);

      // hans
      
      
    }

    if(Accion==2){
      var $Padre = $Etiqueta.closest('.PasoBox');
      var t = $Etiqueta.attr('data-tipo');
      var c = $Etiqueta.attr('data-cat');
      $Padre.find('.FiltroEtiqueta[data-tipo="'+t+'"][data-cat="'+c+'"]').attr('data-operador',Operador);
    }
  }/*opcionesAccionesFiltros*/

  this.editarVariante = function(){
    var $laVariante = $('#laVariante');
    var tkrsv = $laVariante.val();
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
          valueField:'tkg', searchField:['Grupo'], labelField:'Grupo',

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
            optgroupValueField:'GRUPO', optgroupOrder:arrNuevoOrden,
          

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

    if($("#valorOculto").val()!=""){
      var agrupar = $("#valorOculto").val()
    }else{
      var agrupar = $("#agrupar").val();
    }
    
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
    
    var validarFiltrosAdicionales = FiltrosAdicionales;
    var arr                       = [];
    var datoValido                = $('#CriteriosObligatorios').val();
    var existeObligatorio         = datoValido.length;
    datoValido                    = datoValido.split(',');
    datoValido                    = datoValido.map(function(a){return parseInt(a);})
    var criteriosSeleccionados    = criterios.split(',')
    var criteriosSeleccionados    = criteriosSeleccionados.map(function(a){return parseInt(a);})



    for (var i = 0; i < validarFiltrosAdicionales.length; i++) {
       for (var j = 0; j < datoValido.length; j++) {
          if(datoValido[j] == validarFiltrosAdicionales[i].Filtro){
            arr.push(datoValido[j]);
          }
       }
    }
    for (var i = 0; i < criteriosSeleccionados.length; i++) {
       for (var j = 0; j < datoValido.length; j++) {
          if(datoValido[j] == criteriosSeleccionados[i]){
            arr.push(datoValido[j]);
          }
       }
    }


    var procedeGuardado = function(){
      FiltrosAdicionales = JSON.stringify(FiltrosAdicionales);
      
      $("#Criterios").change(function(){
        if(criterios==""){ $(".inputCriterios .selectize-input").removeClass('DatoMal'); }
      });

      var enviar = 'name='+encodeURIComponent(nombre)+
     '&group='+agrupar+'&periodicidad='+periodo+
     '&total='+totalizar+'&criterio='+criterios+
     '&filtroadicional='+encodeURIComponent(FiltrosAdicionales)+
     '&compartidocon='+compartir+'&compartirInput='+compartiSelect+
     '&tkrs='+idreporte+'&tkreportevariante='+tkVariante;
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

            var nuevaVariante = Op.nuevaVariante;
            var valoresFiltros = Op.valoresFiltros;

            variantes.push(nuevaVariante);          
            
            SalesUp.Variables.jsonInfoReportes.variantes = variantes;
            SalesUp.Variables.jsonInfoReportes.valoresFiltros = valoresFiltros;
            SalesUp.Variables.varianteActual = nuevaVariante.tkRsv;
            
            /*SalesUp.reportes.variantes.seleccionarVariante({t:$('#laVariante'), v:nuevaVariante.tkRsv});*/
            SalesUp.reportes.contruyeOpcionesVariantes(SalesUp.Variables.jsonInfoReportes);
            SalesUp.reportes.muestraAccionesMisVariantes($('#laVariante')[0]);
            
            var mensajeOk = 'Variante creada.';
            if(tkVariante){ mensajeOk = 'Variante modificada.'; }
            SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-check"></i> '+mensajeOk});
            
          }
        });
    }
    
    var noProcedeGuardado = function(){
      var arrNames = datoValido;
      for (var i = 0; i < arrNames.length; i++) {
         for (var j = 0; j < arr.length; j++) {
           if(arr[j]==arrNames[i]){
              arrNames.splice(i, 1);
           }
         }
      }
       
      var nombresObligatorios =[];
      var recorrer = SalesUp.Variables.jsonInfoReportes.criterios;
      for (var i = 0; i < recorrer.length; i++) {
        for (var j = 0; j < arrNames.length; j++) {
          if(arrNames[j]==recorrer[i].idCriterio){
              nombresObligatorios.push(recorrer[i].criterio);
           }
        }
      }

      var longitud = _.size(nombresObligatorios);
      nombresObligatorios = nombresObligatorios.join(',  ');

      var mensaje = 'Los filtros "'+nombresObligatorios+'" son requeridos para la creación de la variante';
      if(longitud==1){
        mensaje = 'El filtro "'+nombresObligatorios+'" es requerido para la creación de la variante';
      }

      SalesUp.Construye.MuestraAlerta({
       TipoAlerta:'AlertaPregunta',
       Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/>'+mensaje+'',
       Alto:'125px',
       Ancho:'400px',
       Id:'alertaObligatorios', 
       Icono1:'', Boton1:'Cerrar'
      });

      setTimeout(function(){
        $('#alertaObligatorios .btnNegativo').remove();
      },100);
    }

    if(existeObligatorio==0){
      if(pasa){
        procedeGuardado();
      }else{
        if(pasa==true && existeObligatorio == 0){
          noProcedeGuardado();
        }
      }

    }

    if(arr.length == datoValido.length){
      if(pasa){procedeGuardado();}
    }else{
      if(pasa==true && existeObligatorio != 0){noProcedeGuardado();}
    }
  }/*guardaVariantes*/

  this.accionesMisVariantes = function(t){
    var t = t;
    var $laVariante = $('#laVariante');
    var variante = $laVariante.find('option:selected').text();
    var htmlAcciones = '<span onclick="SalesUp.reportes.variantes.editarVariante({t:this});" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-edit"></i> Editar reporte</span>';
        htmlAcciones+= '<span onclick="SalesUp.reportes.variantes.alertaEliminarVariante({t:this});" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-trash-o"></i> Eliminar reporte</span>';
    SalesUp.Construye.popOver({Elemento:t, /*Titulo:variante,*/ PopOverLugar:'right', Contenido:htmlAcciones, Clases:'PopOverAcciones'});
  }

  this.alertaEliminarVariante = function(){
    var $laVariante = $('#laVariante');
    var variante = $laVariante.find('option:selected').text();
    var callback = 'SalesUp.reportes.variantes.eliminarVariante()', 
    pregunta = '<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/>¿Estas seguro de eliminar la variante del reporte "'+variante+'" ?';

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

        var infoReporte                               = SalesUp.Variables.jsonInfoReportes;
        var variantes                                 = infoReporte.variantes;
        variantes                                     = _.reject(variantes, function(j){ return j.tkRsv == tkrsv});
        SalesUp.Variables.jsonInfoReportes.variantes  = variantes;
        SalesUp.Variables.varianteActual              = undefined;
        SalesUp.reportes.contruyeOpcionesVariantes(SalesUp.Variables.jsonInfoReportes);
        SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-check"></i> Variante "'+variante+'" eliminada.'});
        
      }
    });
  }/*eliminarVariante*/


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

  var MmSgN = function(Op){
    var Destino   = Op.Destino;
    var Mensaje   = Op.Mensaje;
    var malo      = Op.malo
    var tipoColor = 'MsgInfo';

    if(malo==1){
      tipoColor = 'MsgMal';
    }


    var mostrarMs = '<span id="SU-xrcm00llo1467754178453" class="BoxMsg '+tipoColor+'" style="display: none;">'+Mensaje+'</span>';
    $('#SU-xrcm00llo1467754178453').remove();
    $(Destino).append(mostrarMs)
    $('#SU-xrcm00llo1467754178453').toggle(500).delay(4500).toggle(500);
  }
   /**Hans**/
  var filtradoDatosActuales = function(){  
    var criterios            = SalesUp.Sistema.clone(SalesUp.Variables.jsonInfoReportes.criterios);
    var criteriosVisibles    =  $('#Criterios').val();
    var arrCriteriosVisibles = (criteriosVisibles) ? criteriosVisibles.split(',') : []; 
    arrCriteriosVisibles     = arrCriteriosVisibles.map(function(a){return parseInt(a);});
    var arrObligatorio       = $('#CriteriosObligatorios').val();
    arrObligatorio           = arrObligatorio.split(',');
    arrObligatorio           = arrObligatorio.map(function(a){ return parseInt(a);})
    var Etiqueta             = $('.FiltroEtiqueta');
    
    for(var i = 0; i < arrCriteriosVisibles.length; i++){
        criterios = _.reject(criterios,function(j){ 
          return j.idCriterio == arrCriteriosVisibles[i];
        });      
    }
      
    for (var i = 0; i < arrObligatorio.length; i++) {
      for (var j = 0; j < Etiqueta.length; j++) {
        var existe = $(Etiqueta[j]).attr('data-tipo');
        if(arrObligatorio[i] == existe){
          criterios = _.reject(criterios,function(j){ 
            return j.idCriterio == existe;
          });
        }
      }
    }

    return criterios;
  }

  var filtrosVisibles = function(){
    var criterios            = SalesUp.Sistema.clone(SalesUp.Variables.jsonInfoReportes.criterios);
    var $Criterios           = $('#Criterios');
    var criteriosVisibles    = $Criterios.val();
    var arrCriteriosVisibles = (criteriosVisibles) ? criteriosVisibles.split(',') : []; 
        arrCriteriosVisibles = arrCriteriosVisibles.map(function(a){return parseInt(a);});
    var filtroDatos          = $('.FiltroEtiqueta');
    var arrFiltroDatos       = [];

 
    for(var i = 0; i < filtroDatos.length; i++){
        arrFiltroDatos.push(parseInt($(filtroDatos[i]).attr('data-tipo')));
    }
    
    for(var i = 0; i < criterios.length; i++){
        criterios = _.reject(criterios,function(j){ 
          return j.idCriterio == arrFiltroDatos[i];
        });      
    }
    
    return criterios;
  }  
   
  /****/
}/*reporteVariantes*/



