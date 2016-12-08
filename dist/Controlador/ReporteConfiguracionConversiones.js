Handlebars.registerHelper('tamanioInputPaso', function(paso,Estilo) {
  	var out 		= "", data;

  	if (paso == 1) {
  		out += '';
  	}else{
  		out += 'style="width: 72% !important; margin-right: 6px !important;"';
  	}
  return out;
});

Handlebars.registerHelper('tieneUniversoAnterior', function(paso,controlSelect) {
  	var out 				= "", data;
  	var universoAnterior 	= '';

  	if (paso == 1) {
  		out += '';
  	}else{
  		universoAnterior = paso-1;
  		out += '<select class="Tip2 UniversoPaso" data-paso="'+paso+'" Tip="Paso anterior" id="UniversoPaso'+paso+'" name="UniversoPaso'+paso+'" onchange="SalesUp.Variables.CambiaLabelPaso({universo:value,paso:'+paso+'});" style="width:12%;">';

  		for (var i = 1; i <= universoAnterior; i++) {
  			out += '<option value="'+i+'" selected="'+universoAnterior+'">Paso '+i+'</option>'
  		};

  		out += '</select>'
  	}
  return out;
});

SalesUp.Variables.CambiaLabelPaso = function(_obj){
	$('#FiltrosPaso' + _obj.paso + ' > .LabelPaso').html('Paso ' + _obj.universo);

	var $FiltrosPaso = $('#FiltrosPaso'+_obj.paso);

	$FiltrosPaso.find('.FiltroEtiqueta[data-universo]').attr('data-universo',_obj.universo);
	
	var $Existe = $FiltrosPaso.find('.FiltroEtiqueta[data-cat="0"]');
	var Existe = _.size($Existe);

	if(Existe == 0){
		var naturalezaPadre = $('#NaturalezaPaso'+_obj.universo).val();
		$('#NaturalezaPaso'+_obj.paso).val(naturalezaPadre);
	}

	var arrayUniversos = $('#BoxPasos').find('.FiltroEtiqueta[data-universo="'+_obj.paso+'"]');

	for (var i = 0; i < arrayUniversos.length; i++) {
		var $SelectorActual = $(arrayUniversos[i]);
		var $Existe = $SelectorActual.find('.FiltroEtiqueta[data-cat="0"]');
		var Existe = _.size($Existe);
		
		if(Existe == 0){
			var padre = $SelectorActual.attr('data-universo');
			var paso = $SelectorActual.attr('data-paso');
			var naturalezaPadre = $('#NaturalezaPaso'+padre).val();
			$('#NaturalezaPaso'+paso).val(naturalezaPadre);
		}
	};
};

SalesUp.Variables.LimipiarLocalStorageFiltros = function(){
	for (x=localStorage.length-1; x>=0; x--) {  
		var Item = localStorage.key(x);
		var Sys = Item.substring(0,10);
		if(Sys=='jsonFiltro'){localStorage.removeItem(Item);}
	}
}

SalesUp.Variables.AgrupacionYperiodicidad = function(Op){
	var template = '<option value="{{IdAgrupacion}}{{IdPeriodicidad}}">{{Agrupacion}}{{Periodicidad}}</option>';
	var jsonAgrupacion = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonAgrupacionesReportesCorporativo.dbsp?idrep=2', DataType:'json'}).jsonDatos;
	var jsonPeriodicidad = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonPeriodicidadReportes.dbsp', DataType:'json'}).jsonDatos;

	SalesUp.Construye.ConstruyemeUn({
		Control:'select', Nuevo:false, SeleccioneOpcion:true,
		IdControl: 'Agrupacion', Template: template,
		Datos: jsonAgrupacion
	});

	SalesUp.Construye.ConstruyemeUn({
		Control:'select', Nuevo:false, SeleccioneOpcion:true,
		IdControl: 'Periodicidad', Template: template,
		Datos: jsonPeriodicidad
	});

}

SalesUp.Variables.Agrupacion = function(Op){
	var Valor = Op.Valor;
	$('#BoxPeriodicidad').slideUp().val('');
	if(Valor==1){$('#BoxPeriodicidad').slideDown(); $('#Periodicidad').focus();}
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

SalesUp.Variables.AgregarPaso = function(_Paso){
	var Paso = _.size($('.PasoBox'))+1;

	SalesUp.Sistema.BorrarItemDeAlmacen('TemplateAgregarPaso');
	var TemplateAgregarPaso = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateAgregarPasoCorporativo.dbsp', Almacen:'TemplateAgregarPaso'});
	var Dato={};
	Dato.Paso = Paso;

	if(_Paso > 0){
		Dato.PasoAnterior = _Paso;
	}else{
		Dato.PasoAnterior = Paso-1;
	}

	$('#BoxPasos').append(SalesUp.Construye.ReemplazaDatos({Template:TemplateAgregarPaso, Datos:Dato}));
	$('#NombrePaso'+(Paso)).focus();

	SalesUp.Variables.EliminarPaso(Paso);

	if(Paso==15){$('#BtnAgregarPaso').hide();return false;}
	
};

SalesUp.Variables.CambiaPaso = function(Paso){
	var NaturalezaPaso 	= $('#NaturalezaPaso' + Paso).val();
	var universo 		= $('#UniversoPaso' + Paso).val();

	var arr = $('.UniversoPaso option[value="'+Paso+'"]');
	var $padre = arr.closest('.UniversoPaso');

	for (var i = 0; i < $padre.length; i++) {
		var elementoActual 	= $padre[i];
		var pasoActual		= $(elementoActual).attr('data-paso');
		var pasoNuevo 		= pasoActual-1;
		var opcionEliminada = pasoNuevo-1;
		
		$('#Paso'+pasoActual+'-P1').find('.BulletPaso[data-paso='+pasoActual+']').html(pasoNuevo).attr('data-paso',pasoNuevo);
		$('#Paso' + pasoActual).attr('id','Paso' + pasoNuevo).attr('data-paso',pasoNuevo);
		$('#Paso' + pasoActual + '-P1').attr('id','Paso'+pasoNuevo+'-P1');
		$('#NombrePaso' + pasoActual).attr('id','NombrePaso'+pasoNuevo).attr('name','NombrePaso'+pasoNuevo);
		$('#NaturalezaPaso' + pasoActual).attr('id','NaturalezaPaso'+pasoNuevo).attr('name','NaturalezaPaso'+pasoNuevo);
		$('#UniversoPaso' + pasoActual + ' option:eq('+opcionEliminada+')').remove();
		$('#UniversoPaso' + pasoActual).attr('id','UniversoPaso'+pasoNuevo).attr('name','UniversoPaso'+pasoNuevo).attr('onchange','SalesUp.Variables.CambiaLabelPaso({universo:value,paso:'+pasoNuevo+'});').attr('data-paso',pasoNuevo);
		$('#botonFiltrar' + pasoActual).attr('id','botonFiltrar'+pasoNuevo).attr('onclick','SalesUp.Variables.ActivaMostrarFiltros({Paso:'+pasoNuevo+', Out:true});');
		$('#FiltrosPaso' + pasoActual).find('.FiltroEtiqueta[data-paso='+pasoActual+']').attr('data-paso',pasoNuevo);
		$('#FiltrosPaso' + pasoActual).find('.FiltroEtiqueta[data-universo]').attr('data-universo',universo);
		$('#FiltrosPaso' + pasoActual).attr('id','FiltrosPaso' + pasoNuevo);
		$('#Paso'+pasoActual+'-P2').attr('id','Paso'+pasoNuevo+'-P2');
		$('#botonCerrar' + pasoActual).attr('id','botonCerrar'+pasoNuevo).attr('onclick','SalesUp.Variables.VerOpcionesFiltros({Paso:'+pasoNuevo+', In:true});');
		$('#botonAceptar' + pasoActual).attr('id','botonAceptar'+pasoNuevo).attr('onclick','SalesUp.Variables.VerOpcionesFiltros({Paso:'+pasoNuevo+', In:true});');
		$('#FiltroTipoPaso' + pasoActual).attr('id','FiltroTipoPaso'+pasoNuevo).attr('name','FiltroTipoPaso'+pasoNuevo).attr('onchange','SalesUp.Variables.MostrarFiltro({Elemento:this, Filtro:value, Paso:'+pasoNuevo+' });')
		$('#OpcionesTipoFiltros' + pasoActual).attr('id','OpcionesTipoFiltros'+pasoNuevo).attr('name','OpcionesTipoFiltros'+pasoNuevo).attr('onchange','SalesUp.Variables.SeleccionarFiltro({Elemento:this, Filtro:value, Paso:'+pasoNuevo+' });')

		SalesUp.Variables.CambiaLabelPaso({paso:pasoActual,universo:universo});
	};

	$padre.val(universo);
};

SalesUp.Variables.EliminarPaso = function(Paso){
	
	//$('.BulletPaso').attr('tip','').removeClass('Pointer EliminarPaso').unbind('mouseenter').unbind('mouseleave').unbind('click');
	tamanioPasos = $('.PasoBox').length;
	if(tamanioPasos==1){self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:235});}
	if(Paso>1 && tamanioPasos > 1){
		var alto = 235;
		alto = 235 + ((Paso-1)*90);
		
		$('#Paso'+Paso+' .BulletPaso').addClass('Pointer').mouseenter(function(){
			$(this).html('<i class="fa fa-lg fa-times"></i>').addClass('Tip2 EliminarPaso').attr('tip','Eliminar paso '+Paso);
			SalesUp.Sistema.Tipsy();
			$(this).tipsy('show');
		}).mouseleave(function(){
			$(this).html($(this).attr('data-Paso'));
		}).click(function(){
			$('.tipsy').remove();
			var Paso = $(this).attr('data-Paso');
			
			SalesUp.Variables.CambiaPaso(Paso);

			var $Paso = $('#Paso'+Paso);
			$Paso.find('*').slideUp();
			$Paso.removeClass('PasoBox').slideUp();
			setTimeout(function(){ $Paso.remove(); }, 1000);
			Paso = parseInt(Paso) - 1;
			SalesUp.Variables.EliminarPaso(Paso);
		});

		if(Paso>3){return false;}
		self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:alto});	
	}
}

	var templateOpcion = '<option value="{{Tipo}}" id="{{Id}}" data-cat="{{Cat}}" data-naturaleza="{{Naturaleza}}">{{Filtro}}</option>';
	var templateOpcionHijo = '<option value="{{Valor}}">{{FiltroTexto}}</option>';
	var templateUniverso = '<span id="{{id}}" class="FiltroEtiqueta Universo" data-Paso="{{Paso}}" data-Cat="{{Cat}}" data-Tipo="{{Tipo}}">{{TextoFiltro}} <span class="ConfingFiltro Transition" onclick="SalesUp.Variables.ActivaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});" ><i class="fa fa-ellipsis-v"></i></span></span>';
	var templateFiltros = '<span id="{{id}}" class="FiltroEtiqueta FiltroNormal" data-Operador="{{Operador}}" data-Universo="{{Universo}}" data-Paso="{{Paso}}" data-Cat="{{Cat}}" data-Tipo="{{Tipo}}" data-valor="{{Valor}}">{{TextoFiltro}} {{ValorFiltro}}<span class="ConfingFiltro Transition" onclick="SalesUp.Variables.ActivaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});"><i class="fa fa-ellipsis-v"></i></span></span>';
	var templatePaso = '<span class="FiltroEtiqueta LabelPaso Transition">{{Pasos}}</span>';

var jsonOpciones = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonOpcionesFiltrosReporte.dbsp?idrep=2', DataType:'json'}).jsonDatos;

SalesUp.Variables.ActivaMostrarFiltros = function(Op){
	var Paso = Op.Paso, Out = Op.Out;
	var $FiltroTipo = $('#FiltroTipoPaso'+Paso);
	var $FiltrosPaso = $('#FiltrosPaso'+Paso);
	var FiltroTipo = 'FiltroTipoPaso'+Paso;
	var Opciones;

	$FiltroTipo.html('');
	$('#OpcionesTipoFiltros'+Paso).html('').hide();

	var HayUniversoProspectos = _.size($('.PasoBox').find('.Universo[data-tipo="1"]'));
	var HayUniversoOportunidades = _.size($('.PasoBox').find('.Universo[data-tipo="2"]'));
	var HayUniversoClientes = _.size($('.PasoBox').find('.Universo[data-tipo="3"]'));
	var HayUniversoOportunidadesTransacciones = _.size($('.PasoBox').find('.Universo[data-tipo="4"]'));

	Opciones = jsonOpciones;
	
	if((!HayUniversoProspectos)&&(!HayUniversoOportunidades)&(!HayUniversoClientes)&(!HayUniversoOportunidadesTransacciones)){
		Opciones = _.where(jsonOpciones, {Cat:0});
		SalesUp.Construye.ConstruyemeUn({
			Control:'select', Nuevo: false,SeleccioneOpcion: true, 
			IdControl: FiltroTipo, Template: templateOpcion,
			Datos: Opciones
		});
		
	}else{
		
		Opciones = _.where(jsonOpciones, {Cat:0});
		Opciones = _.reject(Opciones , function(j){ return (j.Tipo=='1') });
		(HayUniversoOportunidades) ? Opciones = _.reject(Opciones , function(j){ return (j.Tipo=='2') }) : '';
		(HayUniversoClientes) ? Opciones = _.reject(Opciones , function(j){ return (j.Tipo=='3') }) : '';

		$FiltroTipo.append('<option value="">(... Seleccione una opción ...)</option>');
		SalesUp.Construye.ReemplazaTemplate({Destino:$FiltroTipo, Datos:Opciones , Template:templateOpcion });

		Opciones = _.where(jsonOpciones, {Cat:1});
		Opciones = _.reject(Opciones , function(j){ return (j.Tipo=='11') });/*Quita la opcion de ciudad*/
		$FiltroTipo.append('<option value="">(... Filtros prospectos ...)</option>');
		SalesUp.Construye.ReemplazaTemplate({Destino:$FiltroTipo, Datos:Opciones , Template:templateOpcion });

		if(HayUniversoOportunidades || HayUniversoOportunidadesTransacciones){
			Opciones = _.where(jsonOpciones, {Cat:2});
			Opciones = _.reject(Opciones , function(j){ return (j.Tipo=='3') });/*Quita la opcion de comision*/
			$FiltroTipo.append('<option value="">(... Filtros oportunidades ...)</option>');
			SalesUp.Construye.ReemplazaTemplate({Destino:$FiltroTipo, Datos:Opciones , Template:templateOpcion });
		}
		
		if(HayUniversoClientes){
			Opciones = _.where(jsonOpciones, {Cat:3});
			if(_.size(Opciones)){
				$FiltroTipo.append('<option value="">(... Filtros Clientes ...)</option>');
				SalesUp.Construye.ReemplazaTemplate({Destino:$FiltroTipo, Datos:Opciones , Template:templateOpcion });
			}
		}

	}

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

	var Filtro = Op.Filtro;
	var $Elemento = $(Op.Elemento);
	var Paso = Op.Paso;
	var $Opcion = $Elemento.find('option:selected');
	var $FiltrosPaso = $('#FiltrosPaso'+Paso);
	var $OpcionesFiltros = $('#OpcionesTipoFiltros'+Paso);
	var Categoria = $Opcion.attr('data-cat');
	var Naturaleza = $Opcion.data('naturaleza');
	var TextoFiltro = $Opcion.text();

	if(Categoria==0){
		$('#NaturalezaPaso'+Paso).val(Naturaleza);

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
			SalesUp.Construye.MuestraMsj({tMsg:1, Msg:'Solo se puede seleccionar un <b>Universo</b> en este paso'});
		}
		return true;
	}

	if((Categoria=='1')&&(Filtro=='7')){
		/**/
		var $Pais = $FiltrosPaso.find('.FiltroEtiqueta[data-tipo="6"][data-cat="1"]');
		var nPais = _.size($Pais);
		if(nPais==0){
			SalesUp.Construye.MuestraMsj({tMsg:1, Msg:'Necesita tener seleccionado un <b>[País]</b> en este paso'});
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
	var jsonOpcionesFiltro = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonFiltros.dbsp', Parametros:'c='+Categoria+'&f='+Filtro+Extra, DataType:'json', Almacen:jsonFiltroTipo}).jsonDatos;
	
	if((Categoria=='1')&&(Filtro=='7')){
		jsonOpcionesFiltro = _.reject(jsonOpcionesFiltro , function(j){ return _.size(j) == 0; });
		if(_.size(jsonOpcionesFiltro)==0){
			jsonOpcionesFiltro = JSON.parse('[{ "Valor":"", "FiltroTexto":" -- Desconocido -- "}]');
		}
	}
	
	SalesUp.Construye.ConstruyemeUn({
		Control:'select', Nuevo: false, SeleccioneOpcion: true, IdControl: OpcionesFiltros,
		Template: templateOpcionHijo,Datos: jsonOpcionesFiltro
	});

	$OpcionesFiltros.attr('data-cat',Categoria);
	$OpcionesFiltros.attr('data-TextoFiltro',TextoFiltro);
	$OpcionesFiltros.attr('data-Tipo',Filtro);

	$('#Load'+Paso).hide();
	$OpcionesFiltros.slideDown();
	
}/*SalesUp.Variables.CargaFiltrosSistema*/

SalesUp.Variables.CargaFiltrosPersonalizados = function(Op){
	return true;
}/*SalesUp.Variables.CargaFiltrosPersonalizados*/


SalesUp.Variables.SeleccionaPasoAnterior = function(Paso){
	var pasoAnterior = $('#UniversoPaso' + Paso).val();
	var naturaleza = $('#NaturalezaPaso' + pasoAnterior).val();
	$('#NaturalezaPaso'+Paso).val(naturaleza);
}

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

	var Etiqueta = SalesUp.Sistema.StrReplace('{{ValorFiltro}}', TextoFiltroHijo, templateFiltros);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Valor}}', Filtro, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Paso}}', Paso, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Universo}}', Paso-1, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Cat}}', Categoria, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Tipo}}', Tipo, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{id}}', SalesUp.Construye.IdUnico(), Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Operador}}', Operador, Etiqueta);
		
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
	(Hermanos>1) ? MenuOpciones += '<span onclick="SalesUp.Variables.OpcionesAcciones({Accion:2, Id:\''+Id+'\', Operador:2 });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-calculator"></i> Operador lógico "O" '+Operador_O+'</span>':'';
	(Hermanos>1) ? MenuOpciones += '<span onclick="SalesUp.Variables.OpcionesAcciones({Accion:2, Id:\''+Id+'\', Operador:1 });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-calculator"></i> Condicion lógico "Y" '+Operador_Y+'</span>':'';
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

SalesUp.Variables.GuardarDatos = function(){
	if(idConfiguracion==0){
		SalesUp.Variables.GuardaConfiguracion();
	}else{
		SalesUp.Variables.EditarConfiguracion();
	}
}

SalesUp.Variables.GuardaConfiguracion = function(){
	/*NUEVO*/
	SalesUp.Sistema.MuestraEspera('',4);
	setTimeout(function() {
		if(!SalesUp.Valida.ValidaObligatorios()){ $('#Overlay').remove(); return false;}

		var IdReporte = $('#IdReporte').val();
		var Nombre = escape($('#Nombre').val());
		var Agrupacion = $('#Agrupacion').val();
		var Periodicidad = $('#Periodicidad').val();
		var CompartirCon = $('#CompartirCon').val();
		var Configuracion = 'r='+IdReporte+'&n='+Nombre+'&a='+Agrupacion+'&p='+Periodicidad+'&g='+CompartirCon;
		var jsonReporteConfiguracion = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryGuardarReporteConfiguracion.dbsp', Parametros:Configuracion, DataType:'json'}).jsonDatos;
		var iReCon = jsonReporteConfiguracion[0].iReCon;
		
		SalesUp.Variables.GuardaPasosyFiltros({iReCon:iReCon});					
	}, 10); /*timeout*/

} /* SalesUp.Variables.GuardaConfiguracion*/

SalesUp.Variables.EditarConfiguracion = function(){
	/*EDITAR*/
	SalesUp.Sistema.MuestraEspera('',4);
	setTimeout(function() {
		if(!SalesUp.Valida.ValidaObligatorios()){ $('#Overlay').remove(); return false;}

		var IdReporte = $('#IdReporte').val();
		var Nombre = escape($('#Nombre').val());
		var Agrupacion = $('#Agrupacion').val();
		var Periodicidad = $('#Periodicidad').val();
		var CompartirCon = $('#CompartirCon').val();
		var Configuracion = 'irepcon='+idConfiguracion+'&r='+IdReporte+'&n='+Nombre+'&a='+Agrupacion+'&p='+Periodicidad+'&g='+CompartirCon;
		SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryEditarReporteConfiguracion.dbsp', Parametros:Configuracion});
		SalesUp.Variables.GuardaPasosyFiltros({iReCon:idConfiguracion});					
	}, 10); /*timeout*/

} /* SalesUp.Variables.GuardaConfiguracion*/

SalesUp.Variables.GuardaPasosyFiltros = function(Op){
	var iReCon = Op.iReCon;
	if(!iReCon){return false;}
		
	var $BoxPasos = $('.PasoBox');
	for (var i = 0; i <= $BoxPasos.length - 1; i++){
		var $Paso = $($BoxPasos[i]);
		var Paso = $Paso.attr('data-paso');
		var NombrePaso = escape($('#NombrePaso'+Paso).val());
		var Universo = (!_.isUndefined($('#UniversoPaso' + Paso).val())) ? $('#UniversoPaso' + Paso).val() : 0;
		var Naturaleza = (!_.isUndefined($('#NaturalezaPaso' + Paso).val())) ? $('#NaturalezaPaso' + Paso).val() : 1;
		var Configuracion = '&rc='+iReCon+'&p='+Paso+'&d='+NombrePaso+'&universo='+Universo+'&naturaleza='+Naturaleza;
		var jsonPaso = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryGuardarReportePasosConfiguracion.dbsp', Parametros:Configuracion, DataType:'json'}).jsonDatos;
		var iRePa = jsonPaso[0].iRePa;
		
		var $FiltroEtiqueta = $('.FiltroEtiqueta[data-paso="'+Paso+'"]');

		for(var x = 0; x <= $FiltroEtiqueta.length - 1; x++){
			var $Filtro = $($FiltroEtiqueta[x]);
			var Categoria = $Filtro.attr('data-cat');
			var Tipo = $Filtro.attr('data-tipo');
			var Descripcion = escape($Filtro.text());
			var Valor = $Filtro.attr('data-valor');
			var Operador = $Filtro.attr('data-Operador');
			(!Valor) ? Valor = '':'';
			(!Operador) ? Operador = 1:'';
			Configuracion = 'iRePa='+iRePa+'&c='+Categoria+'&t='+Tipo+'&d='+Descripcion+'&o='+Operador+'&v='+Valor;
			SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryGuardaPasoReporte.dbsp', Parametros:Configuracion});
		}/* for x */
	}/* for i */
	
	self.parent.SalesUp.Variables.CargaReporteDafult(iReCon);
	self.parent.tb_remove();
}

SalesUp.Variables.ConfirmarEliminar = function(){
	SalesUp.Construye.MuestraAlerta({
		TipoAlerta:'AlertaPregunta',
		Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> ¿Desea eliminar la configuración?<br/>',
		Boton1:'Eliminar',
		Boton2:'Cancelar',
		Callback1:'SalesUp.Variables.EliminarConfiguracionReporte()',
		Icono1:'<i class="fa fa-trash"></i>',
		Icono2:'<i class="fa fa-times"></i>'
	});
}

SalesUp.Variables.EliminarConfiguracionReporte = function(){
	/*qryEliminarReporteConfiguracion.dbsp*/
	SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryEliminarReporteConfiguracion.dbsp', Parametros:'irepcon='+idConfiguracion});
	self.parent.SalesUp.Variables.CargaReporteDafult();
	self.parent.tb_remove();
}

SalesUp.Variables.EditarConfiguracionReporte = function(){
	var jsonInformacion = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonInformacionReporteConfiguracion.dbsp', Parametros:'iRepCon='+idConfiguracion, DataType:'json'}).jsonDatos;	

	jsonPasos = jsonInformacion[0].Pasos;
	jsonFiltros = jsonInformacion[0].Filtros;
	jsonInformacion = jsonInformacion[0].Informacion;
	var PuedeEditar = jsonInformacion.PuedeEditar;
	
	$('#Nombre').val(jsonInformacion.Nombre);
	$('#Agrupacion').val(jsonInformacion.AgruparPor);
	if(jsonInformacion.AgruparPor==1){SalesUp.Variables.Agrupacion({Valor:1}); $('#Periodicidad').val(jsonInformacion.Periodicidad);}
	var IdGrupos = jsonInformacion.IdGrupos;
	$('#CompartirCon').val(IdGrupos);
	$('#Compartir').val(IdGrupos);
	conGrupos = IdGrupos.indexOf(',');

	if(conGrupos>0){
		$('#Compartir').val(3);
		SalesUp.Variables.CompartirCon({Valor:3});
		var splitIdGrupos = IdGrupos.split(',');
		for (var y = 0; y <= splitIdGrupos.length - 1; y++){
			var idGrupo = splitIdGrupos[y];
			var $this = $('#Checkbox_Grupo_'+idGrupo);
			$this.prop('checked',true);
			SalesUp.Variables.SeleccionarGrupo({Valor:idGrupo, Elemento:$this });
		};
	}

	for (var i = 0; i <= jsonPasos.length - 1; i++){
		var Descripcion = jsonPasos[i].Descripcion;
		var Paso = jsonPasos[i].Paso;
		var Universo = jsonPasos[i].Universo;
		var Naturaleza = jsonPasos[i].Naturaleza;

		SalesUp.Variables.AgregarPaso(Universo);

		$('#UniversoPaso'+Paso).val(Universo);
		$('#NaturalezaPaso'+Paso).val(Naturaleza);
		$('#NombrePaso'+Paso).val(Descripcion);
	};

	for (var x = 0; x <= jsonFiltros.length - 1; x++){
		var Categoria = parseInt(jsonFiltros[x].Categoria);
		var Descripcion = jsonFiltros[x].Descripcion;
		var Paso = jsonFiltros[x].Paso;
		var Universo = jsonFiltros[x].Universo;
		var Operador = jsonFiltros[x].Operador;
		var Tipo = jsonFiltros[x].Tipo;
		var Valor = jsonFiltros[x].Valor;
		var $FiltrosPaso = $('#FiltrosPaso'+Paso);
		var Etiqueta = '';
		if(Categoria=='0'){
			Etiqueta = SalesUp.Sistema.StrReplace('{{TextoFiltro}}', Descripcion, templateUniverso);
			Etiqueta = SalesUp.Sistema.StrReplace('{{Paso}}', Paso, Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{Cat}}', Categoria, Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{Tipo}}', Tipo, Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{Universo}}', Universo, Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{id}}', SalesUp.Construye.IdUnico(), Etiqueta);
		}else{
			Etiqueta = SalesUp.Sistema.StrReplace('{{ValorFiltro}}', Descripcion, templateFiltros);
			Etiqueta = SalesUp.Sistema.StrReplace('{{Valor}}', Valor, Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{Paso}}', Paso, Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{Cat}}', Categoria, Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{Tipo}}', Tipo, Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{Universo}}', Universo, Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{id}}', SalesUp.Construye.IdUnico(), Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{TextoFiltro}}', '', Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{Operador}}', Operador, Etiqueta);
		}
		
		$FiltrosPaso.append(Etiqueta);
	}

	if(PuedeEditar==''){
		$('.BulletPaso').attr('tip','').removeClass('Pointer EliminarPaso').unbind('mouseenter').unbind('mouseleave').unbind('click');
		$('#BtnAgregarPaso, #BtnEliminar, #BtnAceptar, .P1 button, .ConfingFiltro').remove();
		$('select, input').attr('disabled','disabled');
	}
}


$(function(){
	(idConfiguracion==0) ? $('#BtnEliminar').remove():'';
	SalesUp.Variables.LimipiarLocalStorageFiltros();
	self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:235});
	SalesUp.Variables.AgrupacionYperiodicidad();


	if(sNivel==2){
		$('#Compartir option[value="2"]').remove();
	} else if(sNivel==3){
		$('#Compartir option[value="3"]').remove();
		$('#Compartir option[value="2"]').remove();
	}

	if(idConfiguracion==0){
		SalesUp.Variables.AgregarPaso(0);
	}else{
		SalesUp.Variables.EditarConfiguracionReporte();
	}
	
	SalesUp.Sistema.IniciaPlugins();
});	


