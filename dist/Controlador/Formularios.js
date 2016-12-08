SalesUp.Variables.SeleccionaCheckRadio = function(Op){
	var t = Op.t, e = Op.e;
	
	SalesUp.Variables.ActivaCheckControles({t:t});

	var tipo = e.target.type;
	var $padre = $(t).closest('.BoxListaOpciones');
	var arrChecks = $padre.find('input[type="'+tipo+'"]:checked');
	var $input = $padre.find('input[type="hidden"]');
	var valor = '';
	var checks = [];
	for (var i = 0; i <= arrChecks.length - 1; i++){
		var arr = {}; arr.Opcion = $(arrChecks[i]).val();
		checks.push(arr);
	};
	valor = JSON.stringify(checks);
	$input.val(valor);
}/*SeleccionaCheckRadio*/

SalesUp.Variables.SelectInput = function(Op){
	var t = Op.t, e = Op.e, v, strJson = '';
	var $padre = $(t).closest('.BoxInfo');
	var $input = $padre.find('input[type="hidden"]');
	var Obligatorio = $input.hasClass('InfoObligatorio');
	var $select = $padre.find('select');
	var $inputSelect = $padre.find('input[type="text"]');
	var vSelect = $select.val();
	var vInput = $inputSelect.val();
	if(e.type=='change'){$inputSelect.focus();}
	var v = {};

	if(Obligatorio){
		if((vSelect!='')&&(vInput!='')){
			v.select = vSelect; v.valor = vInput;
		}
	}else{
		if((vSelect!='')&&(vInput!='')){
			v.select = vSelect; v.valor = vInput;
		}

		if((vSelect!='')&&(vInput=='')){
			v.select = vSelect;
		}
	}
	
	(_.size(v)) ? strJson = JSON.stringify(v):'';
	
	$input.val(strJson);

}/*SelectInput*/

SalesUp.Variables.ActivaCheckControles = function(Op){
	var $Elemento = $(Op.t), $Padre = $Elemento.closest('label');
	var type = $Elemento.attr('type'), check = $Elemento.is(':checked');
	
	if(type=='radio'){
		var $SuperPadre = $Padre.closest('.BoxListaOpciones');
		$SuperPadre.find('label[data-activo]').attr('data-activo','0');
	}

	(check) ? $Padre.attr('data-activo','1') : $Padre.attr('data-activo','0');
}/*ActivaCheck*/

SalesUp.Variables.Asterisco = function(){
	var arrObligatorios = $('.InfoObligatorio');
	for (var i = 0; i <= arrObligatorios.length - 1; i++){
		if(!($(arrObligatorios[i]).closest('.BoxInfo').find('.InfoLabel').hasClass('conAsterisco')) )
		$(arrObligatorios[i]).closest('.BoxInfo').find('.InfoLabel').addClass('conAsterisco').append('*');
	};
}/*Asterisco*/

SalesUp.Variables.activaInputCheck = function(Op){
	var $t = $(Op.t);
	var $Input = $t.prev();
	var $Padre = $t.closest('span.Btn');
	var $fa = $Padre.find('.fa');
	var Activo = $Input.attr('data-activo');
	$fa.attr('class','fa fa-lg');
	if(Activo=='0'){
		$Input.removeAttr('readonly').attr('data-activo','1').focus();
		$fa.addClass('fa-check-square-o');
	}else{
		$Input.prop('readonly',true).attr('data-activo','0');
		$fa.addClass('fa-square-o');
	}
}/*activaInputCheck*/

SalesUp.Variables.Quitar33y34 = function (){
	$('[data-indice="34"], [data-indice="33"]').closest('.BoxInfo').remove();
}

SalesUp.Variables.ConstruyeTabs = function(idventana){
	var jsonTabs = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonNombresTab.dbsp', Parametros:'idventana='+idventana, DataType:'json'/*, Almacen:'jsonTabs' */});
	var tabs = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateTabs.dbsp'/*, Almacen:'TemplateTabs'+idventana*/});

	SalesUp.Variables.jsonTabs = jsonTabs;

	var Compilado = SalesUp.Construye.ReemplazaDatos({Datos:jsonTabs, Template:tabs});
	Compilado = SalesUp.Sistema.Comprimir.Minifica({Dato:Compilado});
	$('#contenedorTabs').html(Compilado);
	$('#Tabs').tabs();
}/*ConstruyeTabs*/

SalesUp.Variables.Campos = function(idventana){
	var tmpCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateFormulario.dbsp', Almacen:'TemplateFormulario'});
	var jsonCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCampos.dbsp', Parametros:'idventana='+idventana, DataType:'json' /*, Almacen:'jsonLtCampos'+idventana*/});
	
	var jsonTabs = SalesUp.Variables.jsonTabs.jsonDatos;
	var Opciones;

	jsonCampos = _.reject(jsonCampos.jsonDatos, function(j){return _.size(j) == 0;});
	jsonCampos.jsonDatos = jsonCampos;

	if(!SalesUp.Variables.jsonConfiguracionCampos){
		SalesUp.Variables.jsonConfiguracionCampos = jsonCampos
	}else{
		SalesUp.Variables.jsonConfiguracionCampos = _.union(jsonCampos,SalesUp.Variables.jsonConfiguracionCampos);
	}

	var infoJson = jsonCampos.jsonDatos;
	for (var x = 0; x <= infoJson.length - 1; x++) {
		var j = infoJson[x];
		var Seleccione = {};
		Seleccione.value = '';
		Seleccione.Opcion = '(... Seleccione una opción ...)';

		if(j.attr_maxLength=='0'){j.attr_maxLength='';}

		if(j.esSelect == '1'){
			Opciones = SalesUp.Variables.ObtieneOpciones({Naturaleza:j.Naturaleza, Id:j.attr_id, Indice:j.attr_data_Indice, IdCampo:j.IdCampo});
			if(Opciones){ 
				j.Opciones = Opciones; 

				if(j.TipoRestriccion=='2'){
					j.Opciones = _.union(Seleccione, j.Opciones);
				}
			}
			
		}else if((j.esListaCheck=='1')||(j.esListaRadio=='1')||(j.esTemperatura=='1')||(j.esSelectInput=='1')){
			Opciones = j.Opciones;
			
			if(Opciones.indexOf('[')!=-1){ Opciones = Opciones }else{ Opciones = '['+Opciones+']'; }

			j.Opciones = JSON.parse(Opciones);
			
			if(j.TipoRestriccion=='2'){
				j.Opciones = _.union(Seleccione, j.Opciones);
			}
		}
	}

	jsonCampos.jsonDatos = infoJson;
	
	for (var i = 0; i <= jsonTabs.length - 1; i++){
		var idtab = jsonTabs[i].IDTAB;
		/*
		var jsonCamposFiltrado = _.where(jsonCampos.jsonDatos, {IdTab:idtab});
		jsonCamposFiltrado.jsonDatos = jsonCamposFiltrado;
		*/
	
		var jsonCamposFiltrado1 = _.where(jsonCampos.jsonDatos, {IdTab:idtab});
		var jsonCamposFiltrado2 = _.where(jsonCampos.jsonDatos, {TambienIdTab:idtab});
		var jsonCamposFiltrado = (jsonCamposFiltrado2) ? _.union(jsonCamposFiltrado1,jsonCamposFiltrado2) : jsonCamposFiltrado1;

		jsonCamposFiltrado.jsonDatos = jsonCamposFiltrado;
		
		var Compilado = SalesUp.Construye.ReemplazaDatos({Datos:jsonCamposFiltrado, Template:tmpCampos});
		Compilado = SalesUp.Sistema.Comprimir.Minifica({Dato:Compilado});
		$('#divTab-'+idtab).html(Compilado).append('<div class="clear"></div>');
		
	}

	var arrBoxListaOpciones = $('.BoxListaOpciones');
	for (var i = 0; i <= arrBoxListaOpciones.length - 1; i++){
		var $BoxListaOpciones = $(arrBoxListaOpciones[i]);
		var ltOpciones = $BoxListaOpciones.find('label.w25');
		var nOpciones = ltOpciones.length;
		var w = 'w25';
		
		if (nOpciones<=3){
			w='w100';
		}else if((nOpciones>=4)&&(nOpciones<=6)){
			w='w50';
		}else if((nOpciones>=6)&&(nOpciones<=9)){
			w='w33';
		}else if(nOpciones>9){
			w='w25';
		}
		ltOpciones.removeClass('w25').addClass(w);
	}

	SalesUp.Variables.Asterisco();
	SalesUp.Variables.Quitar33y34();
}/*SalesUp.Variables.Campos*/

SalesUp.Variables.selectTemperatura = function(Op){
	var $t = $(Op.t).find('.TempSeleccionada');
	var id = Op.id.toString();
	var j = _.where(SalesUp.Variables.jsonConfiguracionCampos, {IdCampo:id})[0];
	
	if(!j){
		var id = Op.id;
		var j = _.where(SalesUp.Variables.jsonConfiguracionCampos, {IdCampo:id})[0];
	}

	if(!j){j=[];}

	var Opciones = j.Opciones;
	var idcampo = j.attr_id;
	var htmlOpciones = '';
	for(var i = 0; i <= Opciones.length-1; i++){
		var o = Opciones[i];
		
		if(o.icono){
			htmlOpciones += '<span onclick="SalesUp.Variables.valorTemperatura({id:'+id+', v:\''+o.Opcion+'\', t:\'#'+idcampo+'\' });" class="OpcionAcciones Pointer Ellipsis w100">';
			htmlOpciones += '<i style="color:'+o.color+' !important;" class="fa fa-lg '+o.icono+'"></i> ';
			htmlOpciones += o.Opcion;
			htmlOpciones += '</span>';
		}else{
			htmlOpciones += '<span onclick="SalesUp.Variables.valorTemperatura({id:'+id+', v:\'\', t:\'#'+idcampo+'\' });" class="OpcionAcciones Pointer">'+o.Opcion+'</span>';
		}
	}

	SalesUp.Construye.popOver({Elemento:$t, PopOverLugar:'bottom', Contenido:htmlOpciones, Clases:'PopOverAcciones popup'});
}

SalesUp.Variables.valorTemperatura = function(Op){
	var $t = $(Op.t);
	var $padre = $t.closest('.InfoData');
	var v = Op.v, valor = '';
	var str = '<span class="TempSeleccionada">(... Seleccione una opción ...)</span>';
	
	var j = _.where(SalesUp.Variables.jsonConfiguracionCampos, {IdCampo:id})[0];
	
	if(!j){
		var id = Op.id;
		var j = _.where(SalesUp.Variables.jsonConfiguracionCampos, {IdCampo:id})[0];
	}

	if(!j){j=[];}
	
	j = j.Opciones;
	j = _.where(j, {Opcion:v})[0];
	if (j){
		str = '<span class="TempSeleccionada"><i style="color:'+j.color+' !important;" class="fa fa-lg '+j.icono+'"></i> '+j.Opcion+'</span>';
		valor = JSON.stringify(j);
	}

	$padre.find('span').remove();
	$padre.append(str);
	$t.val(valor);
}



SalesUp.Variables.llenaControles = function(){
	var evento = {}; evento.target = {};

	var CheckRadio = function(t){
		var tipo = 'checkbox', tCampo = '7';
		if(t=='radio'){tipo = 'radio'; tCampo = '8'}
		var arrInputs = $('input[data-tipocampo="'+tCampo+'"]');
		evento.target.type=tipo;
		for(var i=0;i<arrInputs.length;i++){
			var $e = $(arrInputs[i]);
			var $p = $e.closest('.BoxListaOpciones');
			var  v = $e.val();
			
			if((v!='')&&(v!='null')){
				if(v.indexOf('[')!=-1){ try{v = JSON.parse(v);}catch(e){v = [];}  }else{ v = JSON.parse('['+v+']'); }

				for(var x=0;x<=v.length-1;x++){
					var Opcion = v[x].Opcion;
					var $e = $p.find('input[type="'+tipo+'"][value="'+Opcion+'"]');
					$e.prop('checked',true);
					SalesUp.Variables.SeleccionaCheckRadio({t:$e,e:evento});
				}
			}
		}
	}/*CheckRadio*/

	var CheckInput = function(){
		var arrInputs = $('input[data-tipocampo="4"]');
		for(var i=0;i<arrInputs.length;i++){
			var $t = $(arrInputs[i]);
			var check = $t.next();
			if(($t.val()!='')&&($t.val()!='null')){
				SalesUp.Variables.activaInputCheck({t:check});
			}
		}
	}/*CheckInput*/
	
	var Temperatura = function(){
		var arrInputs = $('input[data-tipocampo="6"]');
		for(var i=0;i<arrInputs.length;i++){
			var $t = $(arrInputs[i]), $p = $t.closest('.InfoData'), v = $.trim($t.val());
			if((v!='')&&(v!='null')){
			
				try{
					v = JSON.parse(v);
				}catch(e){
					v = {};
				}

				if (_.size(v)){	
					$p.find('.TempSeleccionada').remove();
					var str = '<span class="TempSeleccionada">'+v.Opcion+'</span>';
					if (v.color){
					  str = '<span class="TempSeleccionada"><i style="color:'+v.color+' !important;" class="fa fa-lg '+v.icono+'"></i> '+v.Opcion+'</span>';
					}
					$p.append(str);
				}
			}
		}
	}/*Temperatura*/

	var ListaTexto = function(){
		var arrInputs = $('input[data-tipocampo="3"]');
		for(var i=0;i<arrInputs.length;i++){
			var $t = $(arrInputs[i]);
			var $p = $t.closest('.InfoData');
			var v = $t.val();
			var $select = $p.find('select');
			var $input = $p.find('input[type="text"]');
			if(v=='{}'){$t.val('');}
			if((v!='')&&(v!='null')&&(v!='{}')){
				
				v = JSON.parse(v);

				$select.val(v.select);
				$input.val(v.valor);
			}
		}
	}/*ListaTexto*/

	ListaTexto();
	Temperatura();
	CheckInput();
	CheckRadio('check');
	CheckRadio('radio');

} /*llenaControles*/

SalesUp.Variables.Porcentaje = function(Op){
	var pasa = SalesUp.Variables.valDecimales({t:Op.t, e:Op.e});
	var control = Op.t, valor = control.value, $t = $(Op.t);
	
	return pasa;
}

SalesUp.Variables.noMayorCien = function(Op){
	var control = Op.t, valor = control.value, $t = $(Op.t);
	if(valor>100){
		control.value = 100;
		setTimeout(function(){
			SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Msg:'No puede ser mayor a <b>100</b>' });
			SalesUp.Valida.MarcarObligatorio($t);
			SalesUp.Valida.FocusMal();
		}, 10);
	}
}

/*ValidateFloatCharacter(evento, control, car)*/
SalesUp.Variables.valDecimales = function(Op){
	
	var evento = Op.e;
	var control = Op.t;
	var $t = $(Op.t);
	var Tecla, valido=false, CodVar;
	
	Tecla = SalesUp.Sistema.NumKeyCode(evento);
	var car = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});

	if (car==','){CodVar=44;}
	if (car=='.'){CodVar=46;}


	if (((Tecla > 47) && (Tecla < 58)) || (Tecla==9) || (Tecla==8) || (Tecla==13) || (Tecla==37) || (Tecla==38) || (Tecla==39) || (Tecla==40) || 
	    (Tecla==45) || (Tecla==CodVar) ) {
    	if ( (Tecla==CodVar) && (control.value.indexOf(car)!= -1 ) ) {
    	  valido = false 
    	 } else
    	if ( (Tecla==45) && (control.value!='' ) ) {
    	  valido = false 
    	 }
    	 else {
    	   valido = true;
    	 }		 
	}
	
	if(!valido) {
		setTimeout(function(){
			SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Msg:'Soló se permiten <b>números decimales</b>' });
			SalesUp.Valida.MarcarObligatorio($t);
			SalesUp.Valida.FocusMal();
		}, 10);
	};

	return valido;
}

SalesUp.Variables.valNumero = function(Op){
	
	var evento = Op.e;
	var control = Op.t;
	var $t = $(Op.t);
	var Tecla, valido=false, CodVar;
	
	Tecla = SalesUp.Sistema.NumKeyCode(evento);

	if (((Tecla > 47) && (Tecla < 58)) || (Tecla==9) || (Tecla==8) || (Tecla==13) || (Tecla==37) || (Tecla==38) || (Tecla==39) || (Tecla==40) || 
	    (Tecla==45) || (Tecla==CodVar) ) {
    	if ( (Tecla==45) && (control.value!='' ) ) {
    	  valido = false 
    	 }
    	 else {
    	   valido = true;
    	 }		 
	}
	
	if(!valido) {
		setTimeout(function(){
			SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Msg:'Soló se permiten <b>números enteros</b>' });
			SalesUp.Valida.MarcarObligatorio($t);
			SalesUp.Valida.FocusMal();
		}, 10);
	};

	return valido;
}

SalesUp.Variables.Numero = function(Op){
	var SepDecimales = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});
	var expresion='/^[-|+]?([0-9])*['+SepDecimales+']?[0-9][2]*$/';
	var $t  = $(Op.t);
	var e   = Op.e;
	var num = Op.v;
	var esNumero = expresion.test(num);
	function PermitidosKeyCode(e){
		var Key = SalesUp.Sistema.NumKeyCode(e);
		if( (Key==13) || (Key==8) || (Key==37) || (Key==38) || (Key==39) || (Key==40) ){
			return true;
		}
	}

	if(num==''){return true};
	if(PermitidosKeyCode(e)){return true};
	
	if(!esNumero){
		setTimeout(function(){
			SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Msg:'Solo se permiten <strong>números</strong>' });
			SalesUp.Valida.MarcarObligatorio($t);
			SalesUp.Valida.FocusMal();
		}, 10);
		return false;
	}
	return true;
}


SalesUp.Variables.numerosEnteros = function(Op){ 
	/*var expresion=/^[-|+]?([0-9])*[0-9][2]*$/;*/
	var expresion=/^[-|+]?[0-9]+$/;
	
	var $t = $(Op.t);
	var num = $t.val();
	var esNumero = (num!='') ? expresion.test(num) : true;
	var mensaje = 'Soló se permiten <strong>números enteros</strong>';
	if(esNumero){
	  var tam = _.size(num);
	  if(tam>9){
	    esNumero = false;
	    mensaje = 'No puede tener mas de 9 caracteres.';
	  }
	}

	if(!esNumero){
			SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Msg:mensaje });
			SalesUp.Valida.MarcarObligatorio($t);
			SalesUp.Valida.FocusMal();
		
		return esNumero;
	}
	return esNumero;
}

SalesUp.Variables.numerosDecimales = function(Op){
	var car = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});
	if(car == ','){
		//var expresion=/(?:\d*\,)?\d+/;
		var expresion = /^\d+(\,\d+)?$/i;
	}else{
		//var expresion=/(?:\d*\.)?\d+/;
		var expresion = /^\d+(\.\d+)?$/i;
	}
	var $t = $(Op.t);
	var num = $t.val();
	var esDecimal = (num!='') ? expresion.test(num) : true;
	var mensaje = 'Soló se permiten <strong>números decimales</strong>';
	if(!esDecimal){
		
			SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Msg:mensaje });
			SalesUp.Valida.MarcarObligatorio($t);
			SalesUp.Valida.FocusMal();
		
		return esDecimal;
	}
	return esDecimal;
}


SalesUp.Variables.TodosNumeros = function(){
	var arrNumeros = $('.numero');
	var pasa = true, val;
	for (var i = 0; i < _.size(arrNumeros); i++){
		val = SalesUp.Variables.numerosEnteros({t:arrNumeros[i]});
		if(!val){pasa=false;}
	}
	return pasa;
}

SalesUp.Variables.TodosDecimales = function(){
	var arrNumeros = $('.decimal');
	var pasa = true, val;
	for (var i = 0; i < _.size(arrNumeros); i++){
		val = SalesUp.Variables.numerosDecimales({t:arrNumeros[i]});
		if(!val){pasa=false;}
	}
	return pasa;
}

