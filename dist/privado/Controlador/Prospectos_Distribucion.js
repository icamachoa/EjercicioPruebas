var $selectCompartir;
var $EtiquetasProspecto;

SalesUp.Variables.ConstruyeTabla=function(){

	var TemplateDatosConfiguracion = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/Template_Prospectos_Distribucion.dbsp', Parametros:'thead=1', Almacen:'Prospectos_Dist'});
	var TemplateDatos              = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/Template_Prospectos_Distribucion.dbsp', Parametros:'thead=2', Almacen:'Prospectos_dist2'});
	var Datos                      = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonReglasEmpresasDistribucion.dbsp',DataType:'json'});
	//var Datos                      = JSON.parse('[{"Orden": 1, "Descripcion":"Prospectos vip", "Plantilla":"prospectos vip","Tipo":"Prospectos", "Asignado":"AF", "Status":"Activa"}, {"Orden": 2, "Descripcion":"Prospectos vip","Plantilla":"prospectos vip" ,"Tipo":"Prospectos", "Asignado":"AF", "Status":"Activa"}]');
	var Destino                    = '#Contenedor_tabla', IdTabla='tabla1';
	Datos = Datos.jsonDatos;
	SalesUp.Construye.ConstruyeTabla(TemplateDatosConfiguracion, TemplateDatos, Datos, {Destino:Destino, Id:IdTabla});

	SalesUp.Variables.DragTable();
	SalesUp.Variables.ReglaDefault();

	var distribucionSimple = function(){
		if(SalesUp.Variables.distribucionActiva()){return;};
		var $tabla = $('#tabla1');
		var $trBody = $tabla.find('tbody').find('tr');
		var $trHead = $tabla.find('thead').find('tr');

		var nTr = _.size($trBody)

		if(nTr>1){return;}

		var $tr = $($trBody[0]), $trH = $($trHead[0]);
		var $penUltimoTd = $tr.find('td').last().prev();
		var $ultimoTd = $tr.find('td').last();
		$penUltimoTd.remove();
		$ultimoTd.remove();

		var $penUltimoTd = $trH.find('td').last().prev();
		var $ultimoTd = $trH.find('td').last();

		$penUltimoTd.remove();
		$ultimoTd.remove();
		//  $ultimoTd.html(''); 
	}

	distribucionSimple();
}

SalesUp.Variables.DragTable=function(){
	$('#tabla1').tableDnD({
		dragHandle  : ".sortear",
		onDragClass : "DragRow",
		onDragStart: function(table, row){
			var rows = table.tBodies[0].rows;
			$(rows).each(function(i){
				$(rows[i]).addClass('RowDark');
			});
			$(row).parent().parent().removeClass('RowDark').addClass('DragRow');
		},
		onDrop: function(table, row){
			$('.RowDark').removeClass('RowDark');
			var rows = table.tBodies[0].rows;

			SalesUp.Variables.GuardaOrdenReglas();

		}
	});
}

SalesUp.Variables.distribucionActiva = function(){
	return SalesUp.Sistema.EstaActivoModulo({Modulo:20});
}

SalesUp.Variables.popUpDistribucionSimple = function(){
	if(SalesUp.Variables.distribucionActiva()){return;};
	
	$('#divEntidad, #divOrigen, #divPlantillas, #divMetodo, #divCriterio, #divEtiquetas, #divTiempo').hide();
	$('#boxSeleccionarCompartir').removeClass('w70').addClass('w100');
	$('#NuevaRegla').find('.BodyModal').height('auto');
	$('#NuevaRegla').find('.ContenedorModal').width('500px');
	$('#descripcion').focus();
}

SalesUp.Variables.ConstruyePop = function(){
	SalesUp.Construye.MuestraPopUp({
		id    	 :'NuevaRegla',
		alto     : '260px',
		ancho    : '920px',
		centrado : false,
		titulo   : 'Agregar regla de distribución',
		fuente   : '/privado/PopUpProspectosDistribucion.dbsp'
	});

	setTimeout(function(){
		SalesUp.Variables.cargaPlantillas();
		SalesUp.Variables.CargaUsuarios();
		SalesUp.Variables.AgregarFiltroMeta(); 
		SalesUp.Variables.EtiquetasSelectize();
		
		SalesUp.Variables.Origen(1);
		$('#boxSeleccionarCompartir').attr('onchange', 'SalesUp.Variables.Revisa()');
		SalesUp.Variables.popUpDistribucionSimple();
	}, 100);
}

var $plantillas_selectize_distribucion; 

SalesUp.Variables.cargaPlantillas = function(){

		var iniPlantillas = function(Op, err){
			if(Op){
				var grupos = [ { GRUPO: ''}, {GRUPO: 'PROPIAS'}, {GRUPO: 'COMPARTIDAS'}];
				var orden = ['','PROPIAS', 'COMPARTIDAS'];
				var strPlantillas = '[{"IDGRUPO":0,"IDPLANTILLA":-1,"IDUSUARIO":0,"ASUNTO":"","COMPARTIRCON":0,"DESCRIPCION":"Ninguna (utilizar notificaciones por defecto)","ORDEN":0,"GRUPO":""}]';
				strPlantillas = JSON.parse(strPlantillas);
				var arrPlantillas = _.union(strPlantillas,Op.jsonDatos);

				$plantillas_selectize_distribucion = $('#ltPlantillasDist').selectize({
					render:{item:function(data){return '<div class="Ellipsis plantillaSeleccionada">'+data.DESCRIPCION+'</div>'}},
					maxItems:1, openOnFocus:true,
					valueField:'IDPLANTILLA', labelField:'DESCRIPCION',
					searchField:['DESCRIPCION'], dropdownParent:'body', 
					options:arrPlantillas,
					optgroups:grupos, optgroupField: 'GRUPO', optgroupLabelField: 'GRUPO',
					optgroupValueField: 'GRUPO', optgroupOrder: orden,sortField:'DESCRIPCION'
				});

				$('.selectize-control.ltPlantillas ').addClass('BoxSizing InfoData');
			}	
		}

		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonPlantillas.dbsp', callback:iniPlantillas });
}

SalesUp.Variables.CargaUsuarios = function(){
	
	var $boxSeleccionar = $('#boxSeleccionarCompartir');
		destruirSelect();
		ltEjecutivos();	
}

var ltEjecutivos = function(){
		
		var $ltCompartir = $('#ltCompartir');

		var construyeSelectize = function(Op,err){
			var jsonUsuarios = Op;

			jsonUsuarios = _.reject(jsonUsuarios.jsonDatos, function(j){  
				if(j.tku == ''){ return j; }
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

		/*	for(var x = 0; x < _.size(arrIdGrupos); x++){
				if(arrIdGrupos[x]==){Posicion=x;}
			}*/

			MiGrupo = arrGrupos[Posicion];

			arrGrupos = _.reject(arrGrupos, function(arr){ if(arr==MiGrupo){return arr;} });

			arrNuevoOrden.push(MiGrupo);

			arrGrupos = _.sortBy(arrGrupos, function(arr){ return arr; });

			for(var z = 0; z < _.size(arrGrupos); z++){
				arrNuevoOrden.push(arrGrupos[z]);
			}
		  
			$ltCompartir.addClass('InfoObligatorio').attr('placeholder','Seleccionar ejecutivos').show();
		  
			setTimeout(function(){
				$selectCompartir = $('#ltCompartir').selectize({
					dropdownParent:'body', closeAfterSelect:true, plugins: ['optgroup_columns'],
					options:jsonUsuarios,
				    valueField:'IDUSUARIO', searchField:['NOMBRE'], labelField:'NOMBRE',
				    optgroups:objGrupos, optgroupField:'GRUPO', optgroupLabelField:'GRUPO', 
				    optgroupValueField:'GRUPO', optgroupOrder:arrNuevoOrden
				});

				$('.ltCompartirDash.selectize-control').addClass('InfoData heightAuto');
				$('.ltCompartirDash.selectize-dropdown').css('z-index','110');
				$('#boxSeleccionarCompartir').addClass('heightAuto');
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


SalesUp.Variables.AgregarFiltroMeta = function(){
	var procesaAgregarPaso = function(html,err){
		var Paso = _.size($('.PasoBox'))+1;
		var TemplateAgregarFiltroMeta = html;
		var Dato={};
		Dato.Paso = Paso;
		Dato.PasoAnterior = Paso - 1;
		$('#BoxPasos').append(SalesUp.Construye.ReemplazaDatos({Template:TemplateAgregarFiltroMeta, Datos:Dato}));
	}
	SalesUp.Sistema.CargaDatosAsync({link:'/privado/Vista/TemplateFiltrosProspectosDistribucion.dbsp', almacen:'TemplateFiltrosProspectosDistribucion', callback:procesaAgregarPaso, dataType:'html'});
	/*var TemplateAgregarFiltroMeta = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateFiltrosProspectosDistribucion.dbsp', callback:procesaAgregarPaso});*/	
};


	var templateOpcion = '<option value="{{IDCAMPO}}" data-id="{{IDTIPOFILTRO}}" data-cat="{{CATE}}">{{FILTRO}}</option>';
	var templateOpcionHijo = '<option value="{{Valor}}">{{FiltroTexto}}</option>';
	var templateUniverso = '<span id="{{id}}" class="FiltroEtiqueta Universo" data-Paso="{{Paso}}" data-Cat="{{Cat}}" data-Tipo="{{Tipo}}">{{TextoFiltro}} <span class="ConfingFiltro Transition" onclick="SalesUp.Variables.ActivaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});" ><i class="fa fa-ellipsis-v"></i></span></span>';
	var templateFiltros = '<span id="{{id}}" class="FiltroEtiqueta FiltroNormal" data-Operador="{{Operador}}" data-Paso="{{Paso}}" data-id="{{idTipoFiltro}}" data-Cat="{{Cat}}" data-Tipo="{{Tipo}}" data-valor="{{Valor}}" data-ValorUsuario="{{ValorUsuario}}" data-OperadorUsuario={{OperadorUsuario}} data->{{TextoFiltro}} {{ValorFiltro}}<span class="ConfingFiltro Transition" onclick="SalesUp.Variables.ActivaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});"><i class="fa fa-ellipsis-v"></i></span></span>';
	var templatePaso = '<span class="FiltroEtiqueta LabelPaso Transition">{{Pasos}}</span>';

	var jsonFiltros = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonFiltros_Prospectos_Distribucion.dbsp', DataType:'json'}).jsonDatos;

	SalesUp.Variables.ActivaMostrarFiltros = function(Op){
		$('#divDatos,#divDatos2').removeClass('Mostar').addClass('Ocultar')
		$('#divDatos,#divDatos2').slideUp();
		$('#operador').val(1); $('#valor').val('');
		var Paso = Op.Paso, Out = Op.Out;
		var $FiltroTipo = $('#FiltroTipoPaso'+Paso);
		var $FiltrosPaso = $('#FiltrosPaso'+Paso);
		var FiltroTipo = 'FiltroTipoPaso'+Paso;
		//var Opciones;
	
		$FiltroTipo.html('');
		$('#OpcionesTipoFiltros'+Paso).html('').hide();

		var Opciones = {};
		
		Opciones.opciones1 = _.where(jsonFiltros, {CATE:1});
		Opciones.opciones2 = _.where(jsonFiltros, {CATE:2});
		
		var idComp = $("#Componente option:selected").attr('data-cate');
		
		var arrayTablas ='1' ;
		var OpcionTotal = [];

		for (var i = 1; i <= arrayTablas.length; i++) {
			if(_.indexOf(arrayTablas, i.toString()) >= 0){
				OpcionTotal = _.union(Opciones['opciones'+i],OpcionTotal);

			}
		};
		OpcionTotal=_.sortBy(OpcionTotal, 'IDCAMPO');
		$FiltroTipo.append('<option value="">(... Seleccione una opción ...)</option>');
		SalesUp.Construye.ReemplazaTemplate({Destino:$FiltroTipo, Datos:OpcionTotal , Template:templateOpcion });

		SalesUp.Variables.VerOpcionesFiltros({Paso:Paso, Out:Out});
	
	}
	
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
 		$('#divDatos').removeClass('Mostrar').addClass('Ocultar');
		
		var Filtro           = Op.Filtro;
		var $Elemento        = $(Op.Elemento);
		var Paso             = Op.Paso;
		var operador         = Op.operador;
		var $Opcion          = $Elemento.find('option:selected');
		var $FiltrosPaso     = $('#FiltrosPaso'+Paso);
		var $OpcionesFiltros = $('#OpcionesTipoFiltros'+Paso);
		var Categoria        = $Opcion.attr('data-cat');

		var auxFiltro        = $Opcion.attr('data-id');
		
		if(auxFiltro == 0){
			Filtro = auxFiltro;
			$('#operador').val(1); $('#valor').val('');
		}else{
			$('#divDatos,#divDatos2').removeClass('Mostar').addClass('Ocultar')
			$('#divDatos,#divDatos2').hide();
			$('#operador').val(1); $('#valor').val('');
		}

		var TextoFiltro      = $Opcion.text();
		Op.Filtro 			 = Filtro;  

		if(Categoria==0){
			var Etiqueta = SalesUp.Sistema.StrReplace('{{TextoFiltro}}', TextoFiltro, templateUniverso);
				Etiqueta = SalesUp.Sistema.StrReplace('{{Paso}}', Paso, Etiqueta);
				Etiqueta = SalesUp.Sistema.StrReplace('{{Cat}}', Categoria, Etiqueta);
				Etiqueta = SalesUp.Sistema.StrReplace('{{Tipo}}', Filtro, Etiqueta);
				Etiqueta = SalesUp.Sistema.StrReplace('{{id}}', SalesUp.Construye.IdUnico(), Etiqueta);
	
			var $Existe = $FiltrosPaso.find('.FiltroEtiqueta[data-cat="'+Categoria+'"]');
			var Existe = _.size($Existe);
	
			if(Existe==0){
				$FiltrosPaso.append(Etiqueta);
				SalesUp.Variables.VerOpcionesFiltros({Paso:Paso, In:true});
			}else{
				SalesUp.Construye.MuestraMsj({tMsg:1, Msg:'Solo se puede seleccionar un <b>Universo</b> en este paso', Destino:$('.BodyModal')});
			}
			return true;
		}
	
		if((Categoria=='1')&&(Filtro=='7')){

			var $Pais = $FiltrosPaso.find('.FiltroEtiqueta[data-tipo="6"][data-cat="1"]');
			var nPais = _.size($Pais);
			if(nPais==0){
				SalesUp.Construye.MuestraMsj({tMsg:1, Msg:'Necesita tener seleccionado un <b>[País]</b> en este paso', Destino:$('#NuevaRegla .BodyModal')});
				return false;
			}else{
				var Paises = '';
				for (var i = 0; i <= $Pais.length - 1; i++){
					Paises += $($Pais[i]).attr('data-valor')+'|';
				}
				SalesUp.Sistema.BorrarItemDeAlmacen('jsonFiltro-1-7');
				Op.Paises = Paises;
			}
		}
		
		Op.TextoFiltro = TextoFiltro;
		Op.Categoria = Categoria;
	
		$OpcionesFiltros.slideUp().html('');
		
		if(Filtro!=''){
			$('#Load'+Paso).show();
			setTimeout(function(){
				(Filtro>0) ? SalesUp.Variables.CargaFiltrosSistema(Op) : SalesUp.Variables.CargaFiltrosPersonalizados(Op);
			}, 10);
		}

		return Op;
	}/*SalesUp.Variables.MostrarFiltro*/

SalesUp.Variables.CargaFiltrosSistema = function(Op) {

	var Filtro           = Op.Filtro;
	var Paso             = Op.Paso;
	var Categoria        = Op.Categoria;
	var TextoFiltro      = Op.TextoFiltro;
	var $OpcionesFiltros = $('#OpcionesTipoFiltros' + Paso);
	var OpcionesFiltros  = 'OpcionesTipoFiltros' + Paso;
	var $BoxComodin      = $('#BoxComodin');
	var jsonFiltroTipo   = 'jsonFiltro-' + Categoria + '-' + Filtro;
	var Extra            = '';
	(Op.Paises) ? Extra += '&Paises=' + Op.Paises : '';

	var jsonOpcionesFiltro = SalesUp.Sistema.CargaDatos({
		Link: '/privado/Modelo/jsonFiltrosDistribucion.dbsp',
		Parametros: 'c=' + Categoria + '&f=' + Filtro + Extra,
		DataType: 'json'
	}).jsonDatos;


	if ((Categoria == '1') && (Filtro == '7')) {
		jsonOpcionesFiltro = _.reject(jsonOpcionesFiltro, function(j) {
			return _.size(j) == 0;
		});
		if (_.size(jsonOpcionesFiltro) == 0) {
			jsonOpcionesFiltro = JSON.parse('[{ "Valor":"", "FiltroTexto":" -- Desconocido -- "}]');
		}
	}

	SalesUp.Construye.ConstruyemeUn({
		Control          : 'select',
		Nuevo            : false,
		SeleccioneOpcion : true,
		IdControl        : OpcionesFiltros,
		Template         : templateOpcionHijo,
		Datos            : jsonOpcionesFiltro
	});

	$OpcionesFiltros.attr('data-cat', Categoria);
	$OpcionesFiltros.attr('data-TextoFiltro', TextoFiltro);
	$OpcionesFiltros.attr('data-Tipo', Filtro);


	$('#Load' + Paso).hide();
	$OpcionesFiltros.slideDown();

} /*SalesUp.Variables.CargaFiltrosSistema*/
SalesUp.Variables.CargaFiltrosPersonalizados = function(Op){
	var Paso             = Op.Paso;
	var jsonOperadores = '[{"Operador":" =","Texto":"Igual a","TipoDato":"1","Valor":"1"}, {"Operador":" !=","Texto":"Distinto a","TipoDato":"1", "Valor":"2"},'+
						 '{"Operador":" >=","Texto":"Mayor o igual","TipoDato":"1", "Valor":"3"},{"Operador":" <=","Texto":"Menor o igual","TipoDato":"1", "Valor":"4"},'+
						 '{"Operador":" >","Texto":"Mayor","TipoDato":"1", "Valor":"5"},{"Operador":" <","Texto":"Menor","TipoDato":"1", "Valor":"6"}]';  
	jsonOperadores     = JSON.parse(jsonOperadores);
	var templateOpcion = '<option value="{{Valor}}" data-tipo="{{TipoDato}}" data-operador="{{Operador}}">{{Texto}}</option>';


	if($('#operador >option').length==0)
		SalesUp.Construye.ReemplazaTemplate({Destino:$('#operador'), Datos:jsonOperadores , Template:templateOpcion });

	$('#Load' + Paso).hide();
	$('#divDatos,#divDatos2').removeClass('Mostrar').addClass('Ocultar').slideDown();
}/*SalesUp.Variables.CargaFiltrosPersonalizados*/


SalesUp.Variables.SeleccionarFiltro = function(Op){
	var Paso             = Op.Paso;
	var Filtro           = Op.Filtro;
	var $Elemento        = $(Op.Elemento);
	var $OpcionesFiltros = $('#OpcionesTipoFiltros'+Paso);
	var $FiltrosPaso     = $('#FiltrosPaso'+Paso);
	var $Opcion          = $Elemento.find('option:selected');
	var Categoria        = $OpcionesFiltros.attr('data-cat');
	var TextoFiltro      = $OpcionesFiltros.attr('data-textofiltro');
	var Tipo             = $OpcionesFiltros.attr('data-tipo');
	var TextoFiltroHijo  = $Opcion.text();
	var Operador         = Op.Operador;
	var idTipoFiltro     = $('#FiltroTipoPaso1 option:selected').attr('data-id');
	var ValorUsuario 	 = '';
	var OperadorUsuario  = '';

	var $MismoTipo       = $FiltrosPaso.find('.FiltroEtiqueta[data-cat="'+Categoria+'"][data-tipo="'+Tipo+'"]');
	var mt               = _.size($MismoTipo);
	if(mt>=1){Operador = $($MismoTipo[0]).attr('data-operador');}

	var $Existe = $FiltrosPaso.find('.FiltroEtiqueta[data-valor="'+Filtro+'"][data-cat="'+Categoria+'"][data-tipo="'+Tipo+'"]');
	var Existe = _.size($Existe);
//data-ValorUsuario="{{ValorUsuario}}" data-OperadorUsuario={{OperadorUsuario}}
	var Etiqueta = SalesUp.Sistema.StrReplace('{{ValorFiltro}}', TextoFiltroHijo, templateFiltros);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Valor}}', Filtro, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Paso}}', Paso, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Cat}}', Categoria, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Tipo}}', Tipo, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{id}}', SalesUp.Construye.IdUnico(), Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Operador}}', Operador, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{idTipoFiltro}}', idTipoFiltro, Etiqueta);

		//Nuevo
		Etiqueta = SalesUp.Sistema.StrReplace('{{ValorUsuario}}', ValorUsuario, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{OperadorUsuario}}', OperadorUsuario, Etiqueta);		
	
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
		
		SalesUp.Construye.MuestraMsj({tMsg:1, Msg:'El filtro <b>['+Texto+']</b> ya se encuentra agregado en este paso', Destino:$('.BodyModal')});
		return false;
	}

	$OpcionesFiltros.slideUp().html('');
	$('#divDatos,#divDatos2').removeClass('Ocultar').addClass('Mostrar').slideDown();
 	SalesUp.Variables.VerOpcionesFiltros({Paso:Paso, In:true});
}

/*SalesUp.Variables.CargaFiltrosPersonalizados = function(Op){

	var Paso             = Op.Paso;
	var jsonOperadores = '[{"Operador":"=","Texto":"Igual a","TipoDato":"1","Valor":"1"}, {"Operador":"!=","Texto":"Distinto a","TipoDato":"1", "Valor":"2"},'+
						 '{"Operador":">=","Texto":"Mayor o igual","TipoDato":"1", "Valor":"3"},{"Operador":"<=","Texto":"Menor o igual","TipoDato":"1", "Valor":"4"},'+
						 '{"Operador":">","Texto":"Mayor","TipoDato":"1", "Valor":"5"},{"Operador":"<","Texto":"Menor","TipoDato":"1", "Valor":"6"}]';  
	jsonOperadores     = JSON.parse(jsonOperadores);
	var templateOpcion = '<option value="{{Valor}}" data-tipo="{{TipoDato}}" data-operador="{{Operador}}">{{Texto}}</option>';


	if($('#operador >option').length==0)
		SalesUp.Construye.ReemplazaTemplate({Destino:$('#operador'), Datos:jsonOperadores , Template:templateOpcion });

	$('#Load' + Paso).hide();
	$('#divDatos').removeClass('Ocultar').addClass('Mostrar').slideDown();
}*//*SalesUp.Variables.CargaFiltrosPersonalizados*/


SalesUp.Variables.SeleccionarFiltroPersonalizados = function(Op){
	var Paso             = Op.Paso;
	var Filtro           = Op.Filtro;
	var $Elemento        = $('#valor');
	var $OpcionesFiltros = $('#FiltroTipoPaso1').find('option:selected');
	var $FiltrosPaso     = $('#FiltroTipoPaso1');
	//var $Opcion          = $Elemento.find;
	var TextoFiltroHijo  = $Elemento.val();
	var Categoria        = $OpcionesFiltros.attr('data-cat');
	var TextoFiltro      = $OpcionesFiltros.text();
	var Tipo             = $OpcionesFiltros.val();
	var simboloOperador  = $('#operador').find('option:selected').attr('data-operador');
	var ValorUsuario 	 = $Elemento.val();;
	var OperadorUsuario  = $('#operador').find('option:selected').attr('value');

	
	var Operador         = 1;
	var idTipoFiltro     = $('#FiltroTipoPaso1 option:selected').attr('data-id');

	var $MismoTipo       = $FiltrosPaso.find('.FiltroEtiqueta[data-cat="'+Categoria+'"][data-tipo="'+Tipo+'"]');
	var mt               = _.size($MismoTipo);

	if(mt>=1){Operador = $($MismoTipo[0]).attr('data-operador');}

	var $Existe = $FiltrosPaso.find('.FiltroEtiqueta[data-valor="'+Filtro+'"][data-cat="'+Categoria+'"][data-tipo="'+Tipo+'"]');
	var Existe = _.size($Existe);

	var Etiqueta = SalesUp.Sistema.StrReplace('{{ValorFiltro}}', TextoFiltroHijo, templateFiltros);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Valor}}', Filtro, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Paso}}', Paso, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Cat}}', Categoria, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Tipo}}', Tipo, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{id}}', SalesUp.Construye.IdUnico(), Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Operador}}', Operador, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{idTipoFiltro}}', idTipoFiltro, Etiqueta);
			//Nuevo
		Etiqueta = SalesUp.Sistema.StrReplace('{{ValorUsuario}}', ValorUsuario, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{OperadorUsuario}}', OperadorUsuario, Etiqueta);

	Etiqueta = SalesUp.Sistema.StrReplace('{{TextoFiltro}}', TextoFiltro+simboloOperador, Etiqueta);
	
	if(mt>0){
		if(mt>1){ $MismoTipo = $($MismoTipo[mt-1]);}
		(Existe==0) ? $MismoTipo.after(Etiqueta) : '';
	}else{
		(Existe==0) ? $('#FiltrosPaso1').append(Etiqueta) : '';
	}
	
	if(Existe>0){
		var Texto = TextoFiltroHijo;
		if(!((Categoria=='1')&&(Tipo=='1'))){ Texto = TextoFiltro + ':' + Texto; }
		
		SalesUp.Construye.MuestraMsj({tMsg:1, Msg:'El filtro <b>['+Texto+']</b> ya se encuentra agregado en este paso', Destino:$('.BodyModal')});
		return false;
	}

	$OpcionesFiltros.slideUp().html('');

	SalesUp.Variables.VerOpcionesFiltros({Paso:Paso, In:true});
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
	(Hermanos>=0) ? MenuOpciones += '<span onclick="SalesUp.Variables.OpcionesAcciones({Accion:2, Id:\''+Id+'\', Operador:2 });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-calculator"></i> Operador lógico "O" '+Operador_O+'</span>':'';
	(Hermanos>=0) ? MenuOpciones += '<span onclick="SalesUp.Variables.OpcionesAcciones({Accion:2, Id:\''+Id+'\', Operador:1 });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-calculator"></i> Condicion lógico "Y" '+Operador_Y+'</span>':'';
	MenuOpciones += '<span onclick="SalesUp.Variables.OpcionesAcciones({Accion:1, Id:\''+Id+'\' });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-trash"></i> Eliminar filtro</span>';

	$Elemento.popover({
		html:true, container:'body', placement:'right',
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
	if(Accion==1){
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


//Etiquetas
SalesUp.Variables.EtiquetasSelectize = function(){
	SalesUp.Variables.jsonLtEtiquetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonLtEtiquetas.dbsp', Parametros:'', DataType:'json', Almacen:'jsonLtEtiquetas' });
	var puedeCrear = false;
	
	if (SalesUp.Variables.CrearEtiquetas=='1'){
		puedeCrear = true;
	};

	$EtiquetasProspecto = $('#Etiquetas').selectize({
	    plugins: ['remove_button'],
	    delimiter: ',',
	    persist: false, dropdownParent:'body', 
	    openOnFocus:true,
	    options: SalesUp.Variables.jsonLtEtiquetas.jsonDatos,
	    onChange: function(){ DespuesDeSeleccionarEtiqueta(this); },
	    create: puedeCrear,
	    render: {
	        item: function(data, escape) {
	            return '<div class="item Tag" data-creado="'+((data.Creado) ? data.Creado : 0)+'">' + escape(data.text) + '</div>';
	        },
			option_create: function(data, escape){
				return '<div class="create agregarEtiqueta AgregarNuevo Btn Btn-rounded Btn-small Btn-flat-Aceptar"><strong>Guardar</strong></div>';
			}
	    }
	});
	$('#divEtiquetas .selectize-control').addClass('InfoData');
	/*SalesUp.Variables.AgregaEventosSelectizeEtiquetas();*/
} /* /EtiquetasSelectize */

function DespuesDeSeleccionarEtiqueta(_elemento){
	var _control = $(_elemento.$control);
	
	var arrayHijos = _control.find('div.item');

	$('.tipsy').remove();
	SalesUp.Sistema.Tipsy();
	var $input = $('#Etiquetas.selectized');
	var Valor = $input.val();
	var DatosSplit = Valor.split(',');


	
	OcultarGuardandoNuevo('Etiquetas');
	for (var i = DatosSplit.length - 1; i >= 0; i--) {
		
		var _creado = $(arrayHijos[i]).data('creado');		
		
		if(_creado == 0 || ( _creado = 1 && !SalesUp.Sistema.EsNumero(DatosSplit[i])) ){
			if(!_.isEmpty(DatosSplit[i])){
				MostrarGuardandoNuevo('Etiquetas');
				SalesUp.Variables.jsonRespuesta = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryEtiquetasGuardar.dbsp', Parametros:{Etiqueta:DatosSplit[i]}, DataType:'json' });
				Valor = SalesUp.Sistema.StrReplace(DatosSplit[i], SalesUp.Variables.jsonRespuesta.jsonDatos[0].Id ,Valor);
				OcultarGuardandoNuevo('Etiquetas');
				ListoOk('Etiquetas');
			}
			
		}else{
			OcultarGuardandoNuevo('Etiquetas');
		} /* ( !_.isNaN(parseInt(Valor)) ) */
	}

	$('#LtIdEtiquetas').val(Valor);

	$('.selectize-dropdown.SelectEtiquetas').hide();
	$('.selectize-input.items.not-full.has-options.has-items > input').keyup(function(e){

		if(SalesUp.Sistema.NumKeyCode(e)!=13) $('.selectize-dropdown.SelectEtiquetas').show();

	});

	var Alto = $('.SelectEtiquetas .selectize-input.items').height();
	var Aumenta = Alto - 21;
	self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:240+Aumenta});

	//setTimeout(function() { SiguienteFocus('.SelectEtiquetas .selectize-input.items.has-options.full.has-items > input'); }, 20);
}/* /DespuesDeSeleccionarEtiqueta */


function OcultarGuardandoNuevo(Control){$('.GuardandoNuevo').remove();}

function MostrarGuardandoNuevo(Control){
	$('.Select'+Control+' > div.selectize-input').append('<i class="GuardandoNuevo fa fa-spinner Spinner"></i>');
	$('.Select'+Control+' > div.selectize-input').addClass('OcultarTriangulo');
}

function ListoOk(Control){
	$('.Select'+Control).append('<i class="ListoGuardado Verde fa fa-check"></i>');
	setTimeout(function() { 
		$('.ListoGuardado').remove(); 
		$('.Select'+Control+' > div.selectize-input').removeClass('OcultarTriangulo'); 
	}, 1000);
}

function SiguienteFocus(t){
	var $Input = $(t);
	var inputs = $Input.closest('form').find(':input');
	inputs.eq( inputs.index($Input)+ 1 ).focus();
}

function FocusInfoLabel(){
	$('.InfoData, .TextAreaData').focus(function(){
		var $t = $(this);
		var $p = $t.closest('.BoxInfo');
		$p.find('.InfoLabel').addClass('FocusInfoLabel');
	}).blur(function(){
		var $t = $(this);
		var $p = $t.closest('.BoxInfo');
		$p.find('.InfoLabel').removeClass('FocusInfoLabel');
	});
}

SalesUp.Variables.AgregaEventosSelectizeEtiquetas=function(){

	$('#divEtiquetas .selectize-input.items.not-full> input').focus(function(){
		$('.BodyModal').removeClass('Contraer').addClass('Expandir');
	});

	$('#divEtiquetas .selectize-input.items.not-full > input').blur(function(){
		$('.BodyModal').removeClass('Expandir').addClass('Contraer');
	});

}


//Funciones de Ventana

SalesUp.Variables.Origen= function(valor){
	var entidad = valor;

	$('#origen > option').hide();
	
	if(entidad == 1){
		$('#origen .Prospectos').show();  
		$('#origen').val(1);
		SalesUp.Variables.MuestraTiempo(1);
	}
	else{
		$('#origen .Clientes').show();    
		$('#origen').val(3);
		SalesUp.Variables.MuestraTiempo(3);
	}

	$('#origen').removeAttr('selected'); 

}

SalesUp.Variables.MuestraTiempo = function(origen){
	$('#divTiempo').hide();
	$('#divOrigen').addClass('w70');
	
	$('#FiltroTipoPaso1 > option[value="12"]').removeClass("Mostrar").addClass('NoMostrar');
	$('#FiltroTipoPaso1 > option[value!="12"]').removeClass("NoMostrar").addClass('Mostrar');

	if(origen >= 3){
		$('#divOrigen').removeClass('w70').addClass('w40');
		setTimeout(function(){ $('#divTiempo').show(); $('#divTiempo #cantidad').focus(); SalesUp.Variables.popUpDistribucionSimple(); }, 500);
	}

	if(origen == 2){
		$('#FiltroTipoPaso1 > option[value="12"]').removeClass("NoMostrar").addClass('Mostrar');
		$('#FiltroTipoPaso1 > option[value!="12"]').removeClass("Mostrar").addClass('NoMostrar');
	}
}

 function GuardarConEnter(e,a){
 	e.preventDefault();
 	var valor = $('#valor').val();
 	var ejecuta = function(){
 		if(valor!=""){
 			SalesUp.Variables.SeleccionarFiltroPersonalizados({Elemento:$('#FiltroTipoPaso1'), Filtro:$('#FiltroTipoPaso1').val(), Paso:1 });
 			$('#valor').removeClass('DatoMal');
 		}else{
 			$('#valor').addClass('DatoMal');
 		}
 	}


 	if(SalesUp.Sistema.NumKeyCode(e) == 13){
 		ejecuta();
	}

	if(a==1){
		ejecuta();
	}
 }

SalesUp.Variables.GuardarPopUp = function(Op){
		var $t = $(Op.t);
		var $p = $t.closest('form');
		var action = $p.attr('action');

		//Usuarios
    var Usuarios = [];
    var arrayUsuarios = '';
    var arrUsuarios = $('.ltCompartirDash .selectize-input >div');
    for (var i = 0; i < _.size(arrUsuarios); i++) {
        var arr   = {};
        var $Etiq = $(arrUsuarios[i]);
        arr.tku   = $Etiq.attr('data-value');
        arrayUsuarios +=$Etiq.attr('data-value')+',';
        arr.orden = (i+1);
        Usuarios.push(arr)
    }
	//Usuarios
		//Criterios
    var Criterios = [];

    var arrCriterios = $('.FiltroEtiqueta');
    for (var i = 0; i < _.size(arrCriterios); i++) {
        var arr             = {};
        var $Etiq           = $(arrCriterios[i]);
        arr.tipoCriterio    = $Etiq.attr('data-id');
        arr.criterio        = $Etiq.attr('data-valor');
        arr.operador        = $Etiq.attr('data-operador');
        arr.OperadorUsuario = $Etiq.attr('data-OperadorUsuario');
        arr.ValorUsuario    = $Etiq.attr('data-ValorUsuario');
        Criterios.push(arr)
    }
	//Criterios

	///Etiquetas
    var Etiquetas = $('#divEtiquetas > div .Tag');
    var idEtiquetas = '';

    for (var i = 0; i < _.size(Etiquetas); i++) {
        var $Etiq = $(Etiquetas[i]);
        idEtiquetas += $Etiq.attr('data-value') + ',';
    }
    $('#Etiquetas').val(idEtiquetas);
	//Etiquetas


		if(SalesUp.Valida.ValidaObligatorios({DentroDe:$p, DestinoMsj:$p})){
			SalesUp.Construye.ActivaEsperaGuardando();
			var qryString = SalesUp.Sistema.qryString({Formulario:$p});
			var ListaUsuario = 	Usuarios ? SalesUp.Sistema.Encript({cadena:JSON.stringify(Usuarios)}): '';
			var Criterio = 	Criterios ? SalesUp.Sistema.Encript({cadena:JSON.stringify(Criterios)}): '';

			setTimeout(function(){
				var cadenaCompleta = qryString+'&jsonListarUsuarios='+arrayUsuarios+'&jsonCriterio='+Criterio;
		
				SalesUp.Sistema.CargaDatos({
			        Link: '/privado/Modelo/qryGuardaReglaDistribucion.dbsp',
			        Parametros: cadenaCompleta
			    });

//			SalesUp.Variables.respGuardaPopUp = SalesUp.Sistema.CargaDatos({Link:action,Parametros:qryString+'&jsonListarUsuarios='+jListarUsuarios+'&jsonCriterio='+Criterio, DataType:'json'});
				SalesUp.Construye.PopUpGuardado();
			}, 10);


					setTimeout(function() {SalesUp.Variables.ConstruyeTabla();}, 400);
		}
	}/*GuardarPopUp*/

SalesUp.Variables.GuardaOrdenReglas = function() {

    var posicion = 1;
    var orden = '';
    var idRegla = '';

    var tabla = '#tabla1 tbody tr';
    var boleano = true;

    $(tabla).each(function() {

        $(this).removeClass('zebra')

        if (boleano) {
            $(this).addClass('zebra')
            boleano = false;
        } else {
            boleano = true;
        }

        if (posicion > 0) {
            orden += posicion + ',';
            idRegla += $(this).attr('data-id') + ',';
        }
        posicion++;
    });

    SalesUp.Sistema.CargaDatos({
        Link: '/privado/Modelo/qryGuardaOrdenReglasDistribucion.dbsp',
        Parametros: 'orden=' + orden + '&idRegla=' + idRegla
    });

		setTimeout(function() {SalesUp.Variables.ConstruyeTabla();}, 400);

}

SalesUp.Variables.CierraPopUp = function(Op){
		var $t = $(Op.t);
		var $Padre = $t.closest('.ContenedorModal');
		var $Overlay = $t.closest('.ModalNotification');
		$Padre.addClass('BounceCloseOut');
		
		setTimeout(function(){ if (tinymce.activeEditor){tinymce.activeEditor.remove();} $Overlay.remove(); }, 1200);



	}/*CierraPopUp*/
SalesUp.Variables.MuestraLista = function(Op) {

    var t = Op.t,
        $t = $(t),
        lista = $t.attr('data-lista');

  var htmlAcciones = '<div style="max-height:250px; overflow-y:auto;overflow-x:hidden">';

    var arrayUsuarios = lista.split(',');

    for (var i = 0; i < arrayUsuarios.length-1; i++) {
        htmlAcciones += '<span class="OpcionAcciones Pointer Ellipsis">' + arrayUsuarios[i]+'</span>';
    }

 htmlAcciones+='</div>'; 
    SalesUp.Construye.popOver({
        Elemento     : t,
        PopOverLugar : 'left',
        
        Contenido    : htmlAcciones,
        Clases       : 'PopOverAcciones'
    });
}


SalesUp.Variables.AlertEliminaRegla = function(Op) {

    $Elemento    = $(Op.t);
    var Id       = $Elemento.closest('span').attr('data-id-pop');
    var Pregunta = '¿Está seguro que desea eliminar la regla de distribución?';
    var Funcion  = (Op.Corp) ? Op.Corp : 'SalesUp.Variables.EliminaRegla';

    SalesUp.Construye.MuestraAlerta({
        TipoAlerta : 'AlertaPregunta',
        Alerta     : '<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> ' + Pregunta + '',
        Boton1     : 'Si, eliminar',
        Boton2     : 'Cancelar',
        Callback1  : Funcion,
        Icono1     : '<i class="fa fa-check"></i>',
        Icono2     : '',
        Ancho      : '580px'
    });

    SalesUp.Variables.EliminaRegla = function() {
        SalesUp.Sistema.CargaDatos({
            Link: 'Modelo/queryEliminaReglaDistribucion.dbsp',
            Parametros: 'idregla=' + Id
        });

        setTimeout(function() {
            SalesUp.Variables.ConstruyeTabla();
        }, 400);
    }
}


SalesUp.Variables.ReglaDefault = function(){

	/*var $Tabla = $('#tabla1 tbody tr'); var id = $Tabla.length;

	$('#ultimo'+id).html('');*/
}

SalesUp.Variables.Revisa = function (){
  var arrUsuarios = $('.ltCompartirDash .selectize-input >div');

   arrUsuarios.length

   if(arrUsuarios.length<=1){
     $('#criterio').val(1).attr('disabled', 'disabled');
   }else{
       $('#criterio').val(1).removeAttr('disabled');
   }
}

//Empieza Editar

SalesUp.Variables.EditarRegla = function(Op){

	$Elemento    = $(Op.t);
    var Id       = $Elemento.closest('tr').attr('data-id');

    SalesUp.Sistema.CargaDatosAsync({ link:'/privado/Modelo/jsonObtieneReglaDistribucion.dbsp',parametros:'IDDISTRIBUCION='+Id, callback:SalesUp.Variables.LlenaPopUp});    
}

SalesUp.Variables.LlenaPopUp = function (Op, err){
	SalesUp.Variables.ConstruyePop();
	var jsonDatos = Op.jsonDatos[0];
	var jsonF = Op.Filtros;	

	setTimeout(function() {
	    $('#descripcion').val(jsonDatos.DESCRIPCION);
	    $('#divCriterio').hide();
		$('#entidad').val(jsonDatos.TIPO);	
		$('#origen').val(jsonDatos.ORIGEN);
		SalesUp.Variables.MuestraTiempo(jsonDatos.ORIGEN);	
		$('#cantidad').val(jsonDatos.CANTIDAD);	
		$('#periodo').val(jsonDatos.PERIODO);		
		$selectCompartir[0].selectize.setValue((jsonDatos.IDUSUARIOS).split(','));
		$EtiquetasProspecto[0].selectize.setValue((jsonDatos.IDETIQUETAS).split(','));
    
    if(jsonF[0].IDDISTRIBUCION){  
	    for (var i = 0; i <jsonF.length; i++) {

	       if(jsonF[i].IDTIPOCRITERIO ==0 ){
	        
	        SalesUp.Variables.ActivaMostrarFiltros({Paso:1, Out:true});
	        $('#FiltroTipoPaso1 > option').removeAttr('selected'); 
	        $('#FiltroTipoPaso1 > option[value='+jsonF[i].IDTIPOFILTRO+'][data-id='+jsonF[i].IDTIPOCRITERIO+']').attr('selected',true);
	        var $Ele = $('#FiltroTipoPaso1');

			SalesUp.Variables.MostrarFiltro({Elemento:$Ele, Filtro:$Ele.val(), Paso:1 });
	        SalesUp.Variables.CargaFiltrosPersonalizados({Elemento:$Ele, Filtro:$Ele.val(),Paso:1 });
	        $('#operador').val(jsonF[i].IDOPERADOR_USUARIO);
	        $('#valor').val(jsonF[i].FILTROVALOR);

	        SalesUp.Variables.SeleccionarFiltroPersonalizados({Elemento:$('#FiltroTipoPaso1'), Filtro:$('#FiltroTipoPaso1').val(),Paso:1});

	       }else{
			 SalesUp.Variables.ActivaMostrarFiltros({Paso:1, Out:true});
			$('#FiltroTipoPaso1 > option').removeAttr('selected'); 
			$('#FiltroTipoPaso1 > option[data-id='+jsonF[i].IDTIPOFILTRO+']').attr('selected',true);
			var $Ele = $('#FiltroTipoPaso1');
			SalesUp.Variables.CargaFiltrosSistema(SalesUp.Variables.MostrarFiltro({Elemento:$Ele, Filtro:$Ele.val(), Paso:1}));
			$('#OpcionesTipoFiltros1').val(jsonF[i].FILTROVALOR);
			var $Op_ele = $('#OpcionesTipoFiltros1');
 			SalesUp.Variables.SeleccionarFiltro({Elemento:$Op_ele, Filtro:$Op_ele.val(), Paso:1, Operador:jsonF[i].IDOPERADOR_SQL  });
	       }
		}
	}
			$('#EsEditar').val(1);
			$('#IDDISTRIBUCION').val(jsonDatos.IDDISTRIBUCION);
			$plantillas_selectize_distribucion[0].selectize.setValue(jsonDatos.IDPLANTILLA);
			setTimeout(function(){
				$('#divCriterio').show();
				SalesUp.Variables.popUpDistribucionSimple();	
			},500)
			
    }, 800);


 	
}


SalesUp.Variables.Cambia_Status = function(Op, status){

    $Elemento    = $(Op.t);
    var Id       = $Elemento.closest('span').attr('data-id-pop');
    var Pregunta = '';

    if(status == 0)
    	Pregunta = '¿Esta seguro que desea desactivar la regla de distribución?';
	else
		Pregunta = '¿Esta seguro que desea activar la regla de distribución?';

    var Funcion  = (Op.Corp) ? Op.Corp : 'SalesUp.Variables.CambiaStatus';

    SalesUp.Construye.MuestraAlerta({
        TipoAlerta : 'AlertaPregunta',
        Alerta     : '<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> ' + Pregunta + '',
        Boton1     : 'Aceptar',
        Boton2     : 'Cancelar',
        Callback1  : Funcion,
        Icono1     : '<i class="fa fa-check"></i>',
        Icono2     : '',
        Ancho      : '580px'
    });

    SalesUp.Variables.CambiaStatus = function() {
        SalesUp.Sistema.CargaDatos({
            Link: 'Modelo/qryCambiaEstatusReglaDistribucion.dbsp',
            Parametros: 'idregla=' + Id+'&status='+status
        });

        setTimeout(function() {
            SalesUp.Variables.ConstruyeTabla();
        },400);
    }

}



