SalesUp.Variables.nombreCriterio 	= '';
SalesUp.Variables.idfiltroCriterio  = '';

$(document).ready(function(){
	setTimeout(function(){$('#nombre').focus();}, 100);
	SalesUp.Variables.llenaTiposFiltros();

	var reporteActual = $('#idusuarioreporte').val();	

	if(reporteActual > 0){
		SalesUp.Variables.llenaDatos(reporteActual);
	}

	if(SalesUp.Variables.Reporte == 2){
		$('#Totales').prop('disabled',true);
	}

	setTimeout(function(){
		$('#filtrosSeleccionados').css({"backgroundColor":$('input').css('backgroundColor'),"border":$('input').css('border')});
		$('#criteriosSeleccionados').css({"backgroundColor":$('input').css('backgroundColor'),"border":$('input').css('border')});
	}, 100);
});

SalesUp.Variables.llenaDatos = function(reporteActual){
	var datosReporte 		= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCargaDatosReporte.dbsp',Parametros:'idreporte='+SalesUp.Variables.Reporte+'&idusuarioreporte='+reporteActual,DataType:'json'}).jsonDatos[0];
	var configuracionReporte= JSON.parse(SalesUp.Sistema.Encript({cadena:datosReporte.FILTRO,tipo:"decode"}));
	
	//console.log(JSON.parse(SalesUp.Sistema.Encript({cadena:datosReporte.FILTRO,tipo:"decode"})));

	$('#nombre').val(datosReporte.NOMBRE);
	$('#Compartir').val(datosReporte.COMPARTIRCON);
	$('#agruparpor').val(configuracionReporte.agruparPor);
	$('#periodo').val(configuracionReporte.periodo);
	$('#Totales').val(configuracionReporte.totales);

	if(configuracionReporte.configuracion.length > 0){SalesUp.Variables.llenaFiltros(configuracionReporte.configuracion);}
	if(configuracionReporte.criterios.length > 0){SalesUp.Variables.llenaCriterios(configuracionReporte.criterios);}
};

SalesUp.Variables.llenaCriterios = function(_arrayCriterios){
	for (var i = 0; i < _arrayCriterios.length; i++) {
		var criterioActual = _arrayCriterios[i];

		var templateCriterios = '<span id="{{id}}" class="FiltroEtiqueta FiltroNormal" data-tipo="'+criterioActual.tipo+'" data-tipoetiqueta="criterio" data-texto="{{texto}}" data-valor="{{valor}}">{{texto}}<span class="ConfingFiltro" onclick="SalesUp.Variables.ActivaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});"><i class="fa fa-ellipsis-v"></i></span></span>';

		var Criterio = SalesUp.Sistema.StrReplace('{{texto}}', criterioActual.criterio, templateCriterios);
			Criterio = SalesUp.Sistema.StrReplace('{{id}}', criterioActual.valor+'criterio', Criterio);
			Criterio = SalesUp.Sistema.StrReplace('{{valor}}', criterioActual.valor, Criterio);

		$('#criteriosSeleccionados').append(Criterio);
		$('#CriterioTipo').val('');

		SalesUp.Variables.VerOpcionesFiltros({div:'divCriterios-', dentro:true})
	};
};

SalesUp.Variables.llenaFiltros = function(_arrayConfiguraciones){
	for (var i = 0; i < _arrayConfiguraciones.length; i++) {
		var configuracionActual = _arrayConfiguraciones[i];

		if(!_.isUndefined(configuracionActual.consulta) && configuracionActual.consulta != ''){
			var filtroComp = 'filtro';
		}else{
			var filtroComp = 'periodo';
		}

		var templateFiltros = '<span id="{{id}}" class="FiltroEtiqueta FiltroNormal" data-tipo="2" data-tipoetiqueta="filtro" data-texto="{{texto}}" data-valoretiqueta="{{tipoFiltro}}" data-datoc="{{datoc}}" data-valor="{{valor}}">{{texto}}<span class="ConfingFiltro" onclick="SalesUp.Variables.ActivaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});"><i class="fa fa-ellipsis-v"></i></span></span>';

		var Etiqueta = SalesUp.Sistema.StrReplace('{{texto}}', configuracionActual.texto, templateFiltros);
			Etiqueta = SalesUp.Sistema.StrReplace('{{id}}', configuracionActual.idfiltro+filtroComp+configuracionActual.valor+'filtro', Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{tipoFiltro}}', configuracionActual.idfiltro, Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{datoc}}', SalesUp.Sistema.Encript({cadena:configuracionActual.consulta}), Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{valor}}', SalesUp.Sistema.Encript({cadena:configuracionActual.valor}), Etiqueta);

		$('#FiltroTipo').val(configuracionActual.idfiltro);
		var nombreCriterio = $('#FiltroTipo option:selected').html();
		$('#FiltroTipo').val('');

		$('#CriterioTipo').append('<option value="'+configuracionActual.idfiltro+'" data-tipo="2">'+nombreCriterio+'</option>');

		$('#filtrosSeleccionados').append(Etiqueta);
		$('#FiltroTipo').val('');
		$('#OpcionesTipoFiltros').hide();

		SalesUp.Variables.VerOpcionesFiltros({div:'divFiltros-', dentro:true})
	};
};

SalesUp.Variables.VerOpcionesFiltros = function(obj){
	$('#filtrosSeleccionados').removeClass('DatoMal');
	var dentro=obj.dentro, fuera=obj.fuera, div=obj.div;
	var $Parte1 = $('.'+div+'P1');
	var $Parte2 = $('.'+div+'P2');
	
	if(dentro){
		$Parte1.css('left','0');
		$Parte2.css('left','100%');
		setTimeout(function(){$Parte2.hide();}, 500);
	}

	if(fuera){
		$Parte1.css('left','-101%');
		$Parte2.show();
		setTimeout(function(){$Parte2.css('left','0');}, 10);
	}
}

SalesUp.Variables.llenaTiposFiltros = function(){
	$('#FiltroTipo').append('<option value="">(...Filtrar...)</option>');

	var filtrosReportes = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonObtieneFiltrosReporte.dbsp',Parametros:'idreporte='+SalesUp.Variables.Reporte,DataType:'json'}).jsonDatos;

	for (var i = 0; i < filtrosReportes.length; i++) {
		var filtroActual = filtrosReportes[i];
		$('#FiltroTipo').append('<option value="'+filtroActual.IDFILTRO+'">'+filtroActual.NOMBRE+'</option>');
	};

	var arrayAgrupaciones 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonVistasReportes.dbsp',	Parametros:'idreporte='+SalesUp.Variables.Reporte,DataType:'json'}).jsonDatos;

	for (var i = 0; i < arrayAgrupaciones.length; i++) {
		var _elementoActual = arrayAgrupaciones[i];

		$('#agruparpor').append('<option value="'+_elementoActual.IDREPORTEVISTAS+'">'+_elementoActual.VISTA+'</option>');
	};
};

SalesUp.Variables.MostrarFiltro = function(_obj){
	$('#Load').show();

	$Elemento = $(_obj.elemento);

	SalesUp.Variables.nombreCriterio 	= $Elemento.find('option:selected').html();
	SalesUp.Variables.idfiltroCriterio	= $Elemento.val();

	setTimeout(function(){
		$('#OpcionesTipoFiltros').html('');

		var filtrosDisponibles = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonAniosDisponibles.dbsp',Parametros:'idfiltro='+_obj.valor,DataType:'json'}).jsonDatos;
		$('#OpcionesTipoFiltros').append('<option value="">Seleccionar</option>');

		if(_obj.valor == 2){

		  	for (var i = 0; i < filtrosDisponibles.length; i++) {
		  		var _valorActual = filtrosDisponibles[i];
		  		
		  		$('#OpcionesTipoFiltros').append('<option value="'+SalesUp.Sistema.Encript({cadena:_valorActual.VALOR})+'" data-idfiltro="'+_obj.valor+'">'+_valorActual.VALOR+'</option>');
		  	};
		}else{				
		  	for (var i = 0; i < filtrosDisponibles.length; i++) {
		  		var _valorActual = filtrosDisponibles[i];
		  		
		  		$('#OpcionesTipoFiltros').append('<option value="'+SalesUp.Sistema.Encript({cadena:_valorActual.VALOR})+'" data-idfiltro="'+_obj.valor+'" data-datoC="'+SalesUp.Sistema.Encript({cadena:_valorActual.CONDICION})+'">'+_valorActual.TEXTO+'</option>');
		  	};
		}

		$('#Load').hide();
		$('#OpcionesTipoFiltros').show();
	}, 100);
};

SalesUp.Variables.SeleccionarFiltro = function(_obj){
	var $elemento 	= $(_obj.elemento);
	var tipoFiltro 	= $elemento.find('option:selected').data('idfiltro');
	var datoc		= $elemento.find('option:selected').data('datoc');
	var texto 		= $elemento.find('option:selected').html();
	var valor 		= $elemento.val();

	if(!_.isUndefined(datoc)){
		var filtroComp = 'filtro';
	}else{
		var filtroComp = 'periodo';
	}

	var valorfiltro= SalesUp.Sistema.Encript({cadena:valor,tipo:"decode"});

	var $MismoTipo 	= $('#filtrosSeleccionados').find('.FiltroEtiqueta[data-valoretiqueta="'+tipoFiltro+'"]');
	var Existe		= _.size($MismoTipo);

	if(Existe>0){
		SalesUp.Construye.MuestraMsj({tMsg:1, Msg:'Ya hay un filtro del mismo tipo agregado a la configuración'});
		$('#FiltroTipo').val('');
		$('#OpcionesTipoFiltros').hide();
		return false;
	}else{
		var templateFiltros = '<span id="{{id}}" class="FiltroEtiqueta FiltroNormal" data-tipo="2" data-tipoetiqueta="filtro" data-texto="{{texto}}" data-valoretiqueta="{{tipoFiltro}}" data-datoc="{{datoc}}" data-valor="{{valor}}">{{texto}}<span class="ConfingFiltro" onclick="SalesUp.Variables.ActivaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});"><i class="fa fa-ellipsis-v"></i></span></span>';

		var Etiqueta = SalesUp.Sistema.StrReplace('{{texto}}', texto, templateFiltros);
			Etiqueta = SalesUp.Sistema.StrReplace('{{id}}', tipoFiltro+filtroComp+valorfiltro+'filtro', Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{tipoFiltro}}', tipoFiltro, Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{datoc}}', datoc, Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{valor}}', valor, Etiqueta);

		$('#CriterioTipo').append('<option value="'+SalesUp.Variables.idfiltroCriterio+'" data-tipo="2">'+SalesUp.Variables.nombreCriterio+'</option>');

		$('#filtrosSeleccionados').append(Etiqueta);
		$('#FiltroTipo').val('');
		$('#OpcionesTipoFiltros').hide();

		SalesUp.Variables.VerOpcionesFiltros({div:'divFiltros-', dentro:true})
	}
};

SalesUp.Variables.SeleccionarCriterio = function(_obj){
	var $elemento 	= $(_obj.elemento);
	var texto 		= $elemento.find('option:selected').html();
	var tipo 		= $elemento.find('option:selected').data('tipo');
	var valor 		= $elemento.val();

	var $Existe		= $('#criteriosSeleccionados').find('.FiltroEtiqueta[data-valor="'+valor+'"][data-tipo="'+tipo+'"]');
	var Existe		= _.size($Existe);

	if(Existe>0){
		SalesUp.Construye.MuestraMsj({tMsg:1, Msg:'Ya se ha agregado el criterio '+texto+' a la configuración'});
		$('#CriterioTipo').val('');
		return false;
	}else{
		var templateCriterios = '<span id="{{id}}" class="FiltroEtiqueta FiltroNormal" data-tipo="'+tipo+'" data-tipoetiqueta="criterio" data-texto="{{texto}}" data-valor="{{valor}}">{{texto}}<span class="ConfingFiltro" onclick="SalesUp.Variables.ActivaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});"><i class="fa fa-ellipsis-v"></i></span></span>';

		var Criterio = SalesUp.Sistema.StrReplace('{{texto}}', texto, templateCriterios);
			Criterio = SalesUp.Sistema.StrReplace('{{id}}', valor+'criterio', Criterio);
			Criterio = SalesUp.Sistema.StrReplace('{{valor}}', valor, Criterio);

		$('#criteriosSeleccionados').append(Criterio);
		$('#CriterioTipo').val('');

		SalesUp.Variables.VerOpcionesFiltros({div:'divCriterios-', dentro:true})
	}
};

SalesUp.Variables.ActivaOpcionesEtiqueta = function(Op){
	var $Elemento 	= $(Op.Elemento);
	var Id 			= Op.Id;
	$Elemento.popover('destroy');

	var $Etiqueta 	= $Elemento.closest('.FiltroEtiqueta');
	var $Padre 		= $Etiqueta.closest('.BoxInfo');

	var PopOverId = 'PopOver'+SalesUp.Construye.IdUnico();
	var TemplatePopover = '<div class="popover PopOverAcciones" id="'+PopOverId+'" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>';

	var MenuOpciones = '';
	MenuOpciones += '<span onclick="SalesUp.Variables.OpcionesAcciones({Accion:1, Id:\''+Id+'\' });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-trash"></i> Eliminar '+$('#'+Op.Id).data('tipoetiqueta')+'</span>';

	$Elemento.popover({
		html:true, container:'body', placement:'top',
		template:TemplatePopover,
		content:MenuOpciones
	});

	$Elemento.popover('show');

	var $PopOverId 	= $('#'+PopOverId);
	var Cerrar 		= true;
	
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
	
	if(Accion==1){
		$Etiqueta.slideUp();
		setTimeout(function(){$Etiqueta.remove();}, 1200);
		var tipoEtiqueta 	= $Etiqueta.data('valoretiqueta');
		var tipo 		 	= $Etiqueta.data('tipo');
		var $criterio 		= $('#criteriosSeleccionados').find('.FiltroEtiqueta[data-valor="'+tipoEtiqueta+'"][data-tipo="'+tipo+'"]');

		$('#CriterioTipo option[value="'+tipoEtiqueta+'"][data-tipo="'+tipo+'"]').remove();
		$criterio.slideUp();
		setTimeout(function(){$criterio.remove();}, 1200);
	}
}

SalesUp.Variables.CiertosGrupos = function(Op){
	var n = _.size($('#CiertosGrupos .LabelGrupo'));
	if(n){return false;}
	var jsonGrupos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonGruposReportes.dbsp', DataType:'json'}).jsonDatos;
	var template = ' <label class="InfoLabel LabelGrupo Pointer" data-activo="0"><input id="Checkbox_Grupo_{{IdGrupo}}" type="checkbox" onchange="SalesUp.Variables.SeleccionarGrupo({Valor:{{IdGrupo}}, Elemento:this })"/><i class="fa fa-square"></i><i class="fa fa-check-square"></i> {{Grupo}}</label>';
	SalesUp.Construye.ReemplazaTemplate({Destino:'#CiertosGrupos', Datos:jsonGrupos , Template:template });
}

SalesUp.Variables.CompartirCon = function(Op){
	var Valor = Op.Valor;
	$('#CiertosGrupos').slideUp();
	$('#CompartirCon').val(Valor);
	if(Valor==3){ SalesUp.Variables.CiertosGrupos(); $('#CiertosGrupos').slideDown();$('#CompartirCon').val('');}
}

SalesUp.Variables.SeleccionarGrupo = function(Op){
	var $Elemento = $(Op.Elemento);
	var Valor = Op.Valor;
	var $Padre = $Elemento.closest('.LabelGrupo');
	var check =  $Elemento.is(':checked');
	(check) ? $Padre.attr('data-activo','1').attr('data-id',Valor) : $Padre.attr('data-activo','0').removeAttr('data-id');
	var valor = '';

	$('.LabelGrupo[data-id]').each(function(){
		valor += $(this).attr('data-id')+',';
	});

	$('#CompartirCon').val(valor);
}

SalesUp.Variables.GuardaReporte = function(){
	var Pasa 						= false;
		Pasa 						= SalesUp.Valida.ValidaObligatorios();
	var objetoFiltros				= {};
		objetoFiltros.configuracion	= [];
		objetoFiltros.criterios 	= [];
		
	if(Pasa){
		SalesUp.Sistema.MuestraEspera('',4);
		setTimeout(function(){
			$('#filtrosSeleccionados > .FiltroEtiqueta').each(function(){
				var $elemento 	= $(this);
				var tipoFiltro 	= $elemento.data('valoretiqueta');
				var datoc		= $elemento.data('datoc');
				var texto 		= $elemento.data('texto');
				var valor 		= $elemento.data('valor');

				datoc = (datoc != '') ? SalesUp.Sistema.Encript({cadena:datoc,tipo:'decode'}) : '';
				valor = (valor != '') ? SalesUp.Sistema.Encript({cadena:valor,tipo:'decode'}) : '';

				objetoFiltros.configuracion.push({idfiltro:tipoFiltro,consulta:datoc,texto:texto,valor:valor});
			});

			$('#criteriosSeleccionados > .FiltroEtiqueta').each(function(){
				var $elemento 	= $(this);
				var texto 		= $elemento.data('texto');
				var valor 		= $elemento.data('valor');
				var tipo 		= $elemento.data('tipo');

				objetoFiltros.criterios.push({criterio:texto,valor:valor,tipo:tipo});
			});

			objetoFiltros.nombreReporte = $('#nombre').val();
			objetoFiltros.agruparPor 	= $('#agruparpor').val();
			objetoFiltros.periodo		= $('#periodo').val();
			objetoFiltros.totales		= $('#Totales').val();

			$('#configuracion').val(SalesUp.Sistema.Encript({cadena:JSON.stringify(objetoFiltros)}));
			$('#FrmNuevoReporte').submit();
		}, 100);
	}
};

