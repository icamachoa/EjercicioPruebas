/***********************//***********************//***********************//***********************//***********************/
var tkrs = '320DB1C0-F01D-43C5-BC40-421AEBDE4350';
var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonInformacionReporte.dbsp',Parametros:'tkrs='+tkrs});
json = JSON.parse(json);
totalizarJson = JSON.parse(json.jsonDatos[0].totalizar)
var periodoJson = '[{"idOpcion":1,"opcion":"Semanal"},{"idOpcion":2,"opcion":"Quincenal"},{"idOpcion":3,"opcion":"Mensual"},{"idOpcion":4,"opcion":"Bimestral"},{"idOpcion":5,"opcion":"Trimestral"},{"idOpcion":6,"opcion":"Cuatrimestral"},{"idOpcion":7,"opcion":"Semestral"},{"idOpcion":8,"opcion":"Anual"}]';
periodoJson = JSON.parse(periodoJson);
if(json.jsonDatos[0].periodicidad==1){
	$("#ocultadoPeriodo").show()
	$("#creceAgrupar").removeClass('w100');
	$("#creceAgrupar").addClass('w50');
}
/***********************//***********************//***********************//***********************//***********************/
var tkvc = 'C7454BB3-D0CA-415B-9E71-F7AE249D1618';
var jsonVarianteCriterios = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonVariantesCriterios.dbsp',Parametros:'tkvc='+tkvc});
jsonC = JSON.parse(jsonVarianteCriterios);
var idfiltroadicional = jsonC.jsonDatos[0].IDREPORTEVARIANTE
var jsonFiltrosAdicionales = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonFiltrosAdicionales.dbsp',Parametros:'&idfiltroadicional='+idfiltroadicional});
jsonF = JSON.parse(jsonFiltrosAdicionales);

/***********************//***********************//***********************//***********************//***********************/

var $EtiquetasProspecto;
var preparaSelect = function (){
	var tmpOpcion = '{{#each opciones}}<option value="{{idAgrupacion}}">{{Agrupacion}}</option>{{/each}}';
	var j = {opciones:json.agrupaciones};
	var htmlOpcion = SalesUp.Construye.ReemplazaDatos({Template:tmpOpcion, Datos:j});
	$('#agrupar').html(htmlOpcion);

	var tmpOPeriodo = '{{#each opciones}}<option value="{{idOpcion}}">{{opcion}}</option>{{/each}}';
	j.opciones = periodoJson;
	htmlOpcion = SalesUp.Construye.ReemplazaDatos({Template:tmpOPeriodo, Datos:j});
	$('#periodo').html(htmlOpcion);

	var tmpTotalizar = '{{#each opciones}}<option value="{{id}}">{{opcion}}</option>{{/each}}';
	j.opciones = totalizarJson;
	htmlOpcion = SalesUp.Construye.ReemplazaDatos({Template:tmpTotalizar, Datos:j});
	$('#totalizar').html(htmlOpcion);
}
/*******************************//*******************************/
var templateOpcion = '<option  value="{{idCriterio}}" id="{{idElemento}}" ">{{criterio}}</option>';
var templateOpcionHijo = '<option value="{{idOpcion}}">{{opcion}}</option>';
var templateUniverso = '<span id="{{id}}" class="FiltroEtiqueta Universo" data-Paso="{{Paso}}" data-Cat="{{Cat}}" data-Tipo="{{Tipo}}">{{TextoFiltro}} <span class="ConfingFiltro Transition" onclick="SalesUp.Variables.ActivaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});" ><i class="fa fa-ellipsis-v"></i></span></span>';
var templateFiltros = '<span id="{{id}}" class="FiltroEtiqueta FiltroNormal" data-criterio="{{ValorFiltro}}" data-Operador="{{Operador}}" data-Universo="{{Universo}}" data-Paso="{{Paso}}" data-Cat="{{Cat}}" data-Tipo="{{Tipo}}" data-valor="{{Valor}}">{{TextoFiltro}}<span class="ConfingFiltro Transition" onclick="SalesUp.Variables.ActivaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});"><i class="fa fa-ellipsis-v"></i></span></span>';
var templatePaso = '<span class="FiltroEtiqueta LabelPaso Transition">{{Pasos}}</span>';
/*******************************//*******************************/
SalesUp.Variables.rellenaVariantes = function(OpC,OpF){
	$("#nombre").val(OpC.jsonDatos[0].VARIANTE);
	$("#agrupar").val(OpC.jsonDatos[0].AGRUPARPOR)
	$("#totalizar").val(OpC.jsonDatos[0].TOTALIZAR)
	$("#selectCompartirDash").val(OpC.jsonDatos[0].COMPARTIDO)
	$("#Criterios").val(jsonC.jsonDatos[0].CRITERIOSVISIBLES)
	SalesUp.Variables.compartir(OpC.jsonDatos[0].COMPARTIDO) 
	$("#ltCompartir").val(jsonC.jsonDatos[0].COMPARTIDOCON)
	
	if(json.jsonDatos[0].periodicidad==1){
		$("#periodo").val(OpC.jsonDatos[0].PERIODICIDAD)
	}else{
		$("#periodo").val("")
	}
	
	
	if(OpF.jsonDatos.length > 0){SalesUp.Variables.llenaFiltros(OpF.jsonDatos);}
	
	SalesUp.Variables.EtiquetasSelectize();
}

SalesUp.Variables.llenaFiltros = function(_arrayConfiguraciones){
	for (var i = 0; i < _arrayConfiguraciones.length; i++) {
		var configuracionActual = _arrayConfiguraciones[i];

		if(!_.isUndefined(configuracionActual.consulta) && configuracionActual.consulta != ''){
			var filtroComp = 'filtro';
		}else{
			var filtroComp = 'periodo';
		}
		
		var templateFiltros = '<span id="{{id}}" class="FiltroEtiqueta FiltroNormal" data-criterio="{{TextoFiltro}} " data-Operador="{{Operador}}" data-Universo="{{Universo}}" data-Paso="{{Paso}}" data-Cat="{{Cat}}" data-Tipo="{{Tipo}}" data-valor="{{Valor}}">{{TextoFiltro}} <span class="ConfingFiltro Transition" onclick="SalesUp.Variables.ActivaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});"><i class="fa fa-ellipsis-v"></i></span></span>';


		var Etiqueta = SalesUp.Sistema.StrReplace('{{TextoFiltro}}', configuracionActual.FILTRO, templateFiltros);
			Etiqueta = SalesUp.Sistema.StrReplace('{{id}}', SalesUp.Construye.IdUnico(), Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{Operador}}', configuracionActual.OPERADOR_LOGICO, Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{Paso}}', 1, Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{Cat}}', 1, Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{Tipo}}', configuracionActual.IDFILTRO, Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{Valor}}', configuracionActual.IDFILTROADICIONAL, Etiqueta);
			
		
		$('#FiltrosPaso1').append(Etiqueta);
	};	
};
/*******************************//*******************************/
SalesUp.Variables.ActivaMostrarFiltros = function(Op){
	var Paso = Op.Paso, Out = Op.Out;
	var $FiltroTipo = $('#FiltroTipoPaso'+Paso);
	var $FiltrosPaso = $('#FiltrosPaso'+Paso);
	var FiltroTipo = 'FiltroTipoPaso'+Paso;
	var Opciones;

	$FiltroTipo.html('');
	$('#OpcionesTipoFiltros'+Paso).html('').hide();
	$FiltroTipo.append('<option value="">(... Seleccione una opci�n ...)</option>');
	Opciones = _.where(json.criterios);

	SalesUp.Construye.ReemplazaTemplate({Destino:$FiltroTipo, Datos:Opciones , Template:templateOpcion });
	SalesUp.Variables.VerOpcionesFiltros({Paso:Paso, Out:Out});
}/*ActivaMostrarFiltros*/
SalesUp.Variables.VerOpcionesFiltros = function(Op){
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
SalesUp.Variables.MostrarFiltro = function(Op){
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
			(Filtro>0) ? SalesUp.Variables.CargaFiltrosSistema(Op) : SalesUp.Variables.CargaFiltrosPersonalizados(Op);
		}, 10);
	}
}/*SalesUp.Variables.MostrarFiltro*/
SalesUp.Variables.CargaFiltrosSistema = function(Op){

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

	for (var i = 0; i < json.criterios.length; i++) {
		if(Filtro==json.criterios[i].idCriterio){
			var jsonCriteriosOpciones = obtieneLosCriterios(json.criterios[i])
		}
	}
	var g = obtieneLosCriterios(json.criterios);
	// console.log(g)
	/*******************************/ /*******************************/
	function obtieneLosCriterios(Op){
         var idCriterio = Op.idCriterio, jsonInfo = Op.json, opcionesCriterios = Op.opcionesCriterios;
         
         if(typeof opcionesCriterios == 'string'){ opcionesCriterios = JSON.parse(opcionesCriterios);}
         
         if (!opcionesCriterios){
           var datosCriterio = SalesUp.Sistema.CargaDatos({Link:jsonInfo, DataType:'json'});
           datosCriterio = datosCriterio.jsonDatos;

           datosCriterio.forEach(function(v,i){
             if(idCriterio==5){
               v.idOpcion = v.IdUsuario; v.opcion = v.Usuario + ' ('+v.Iniciales+')';
             }
             if(idCriterio==6){
               v.idOpcion = v.Id; v.opcion = v.Grupo;
             }

             if(idCriterio==7){
               v.idOpcion = v.idNivel; v.opcion = v.nivel;
             }

             if(idCriterio==10){
               v.idOpcion = v.TIPO; v.opcion = v.SECCION + ' - ' + v.SUCESO_NOMBRE;
             }

             if(idCriterio==13){
               v.idOpcion = v.IDEMPRESAMONEDA; v.opcion = v.MONEDA;
             }
           });

           opcionesCriterios = datosCriterio;
         }
         

         return opcionesCriterios;
       }/*obtieneLosCriterios*/
    /*******************************/ /*******************************/


	SalesUp.Construye.ConstruyemeUn({
		Control:'select', Nuevo: false, SeleccioneOpcion: true, IdControl: OpcionesFiltros,
		Template: templateOpcionHijo,Datos: jsonCriteriosOpciones
	});

	$OpcionesFiltros.attr('data-cat',Categoria);
	$OpcionesFiltros.attr('data-TextoFiltro',TextoFiltro);
	$OpcionesFiltros.attr('data-Tipo',Filtro);

	$('#Load'+Paso).hide();
	$OpcionesFiltros.slideDown();	
}/*SalesUp.Variables.CargaFiltrosSistema*/
SalesUp.Variables.SeleccionarFiltro = function(Op){
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
		SalesUp.Variables.SeleccionaPasoAnterior(Paso);
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
	SalesUp.Variables.VerOpcionesFiltros({Paso:Paso, In:true});
}
SalesUp.Variables.SeleccionaPasoAnterior = function(Paso){
	var pasoAnterior = $('#UniversoPaso' + Paso).val();
	var naturaleza = $('#NaturalezaPaso' + pasoAnterior).val();
	$('#NaturalezaPaso'+Paso).val(naturaleza);
}
SalesUp.Variables.ActivaOpcionesEtiqueta = function(Op){
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
	(Hermanos>1) ? MenuOpciones += '<span onclick="SalesUp.Variables.OpcionesAcciones({Accion:2, Id:\''+Id+'\', Operador:2 });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-calculator"></i> Operador l�gico "O" '+Operador_O+'</span>':'';
	(Hermanos>1) ? MenuOpciones += '<span onclick="SalesUp.Variables.OpcionesAcciones({Accion:2, Id:\''+Id+'\', Operador:1 });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-calculator"></i> Condicion l�gico "Y" '+Operador_Y+'</span>':'';
	MenuOpciones += '<span onclick="SalesUp.Variables.OpcionesAcciones({Accion:1, Id:\''+Id+'\' });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-trash"></i> Eliminar filtro</span>';

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
}/*SalesUp.Variables.ActivaOpcionesEtiqueta*/
SalesUp.Variables.OpcionesAcciones = function(Op){
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
SalesUp.Variables.variantesPopup = function(parametro){
  SalesUp.Construye.MuestraPopUp({
    alto:'360px', 
    ancho:'650px',
    titulo:'Nueva variante de reporte', id:'popUpVarianteReporte',
    fuente:'/privado/popup_crear_variante.dbsp'
  });
  SalesUp.Sistema.CargaDatosAsync({ callback:preparaSelect});
  if(tkvc==""){setTimeout(function(){SalesUp.Variables.EtiquetasSelectize()},300)}
  setTimeout(function(){SalesUp.Variables.rellenaVariantes(jsonC,jsonF);},300)
}

SalesUp.Variables.EtiquetasSelectize = function(){
	$EtiquetasProspecto = $('#Criterios').selectize({
		plugins: ['remove_button'],
		dropdownParent:'body', closeAfterSelect:true,
		options:json.criterios,
		valueField:'idCriterio', searchField:['criterio'], labelField:'criterio'
	});
	setTimeout(function(){
		$('.selectize-control.inputCriterios').addClass('w100 BoxSizing InfoData');
	}, 200);
} /* /EtiquetasSelectize */
SalesUp.Variables.guardaVariantes = function(Op){
	var idreporte = '320DB1C0-F01D-43C5-BC40-421AEBDE4350';
	var tkreportevariante = 'C7454BB3-D0CA-415B-9E71-F7AE249D1618';
	var nombre = $("#nombre").val();
	var agrupar = $("#agrupar").val();
	if(json.jsonDatos[0].periodicidad==1){
		var periodo = $("#periodo").val();
	}else{
		var periodo = $("#periodo").val("");
	}
	var periodo = $("#periodo").val();
	var totalizar = $("#totalizar").val();
	var criterios = $("#Criterios").val();
	var compartiSelect = $("#selectCompartirDash").val();
	var compartir = $("#ltCompartir").val()
	var t = Op.t;
	var $form = $(t).closest('form'), $contVentana = $(t).closest('.ContenedorModal.PopUp');
	var pasa = SalesUp.Valida.ValidaObligatorios({DentroDe:$form, DestinoMsj:$contVentana});

	var FiltrosAdicionales = $(".FiltroEtiqueta").map(function(){
		return {Filtro:$(this).data('tipo'),valor:$(this).data('valor'),operador:$(this).data('operador'),criterio:$(this).data('criterio')}
	}).get();
	
	FiltrosAdicionales = JSON.stringify(FiltrosAdicionales);

	$("#Criterios").change(function(){
		if(criterios==""){ $(".inputCriterios .selectize-input").removeClass('DatoMal') }
	});
	if(criterios==""){ 
		$(".inputCriterios .selectize-input").addClass('DatoMal'); 
	}else{ 
		$(".inputCriterios").removeClass('DatoMal'); 
	}
	
	var enviar = 'name='+encodeURIComponent(nombre)+'&group='+agrupar+'&periodicidad='+periodo+'&total='+totalizar+'&criterio='+criterios+'&filtroadicional='+encodeURIComponent(FiltrosAdicionales)+'&compartidocon='+compartir+'&compartirInput='+compartiSelect+'&idreportes='+idreporte+'&tkreportevariante='+tkreportevariante;
	console.log(enviar);
	if(pasa){
		SalesUp.Sistema.CargaDatos({
			Link:'/privado/Modelo/guardaVariantes.dbsp',
			Parametros:enviar
		});
		SalesUp.Construye.CierraPopUp({t:Op.t});
	}


}/*guardaVariantes*/
SalesUp.Variables.compartir = function(v){
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
}
var destruirSelect = function(){
	
	$('.ltCompartirDash.selectize-control').removeClass('w100');
	
	if($selectCompartir){
		if($selectCompartir[0].selectize){
			$selectCompartir[0].selectize.destroy();
		}
	}
	
	$('#ltCompartir').removeClass('InfoObligatorio').val('').hide();
}/*destruirSelect*/
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
			if(j.tku == sTku){ return j; }
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


