var montoOportunidad;

SalesUp.Variables.Default=function(){	

	var idoportunidad= $('#idoportunidad').val();
	var idventa= $('#idventa').val();
	var idprospecto= $('#Idp').val();
	
	var datosOp 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDetalleVenta.dbsp',Parametros:'IDOPORTUNIDAD='+idoportunidad+'&IDVENTA='+idventa+'&IDPROSPECTO='+idprospecto,DataType:'json'}).jsonDatos;		

	var concepto=datosOp[0].CONCEPTO;
	var fecha_cierre3=datosOp[0].FECHAHORA;
	var monto= datosOp[0].MONTO;
	var comision_monto= datosOp[0].COMISION; if(comision_monto==null){comision_monto=0} 
	var comision_pct=(datosOp[0].COMISION/monto)*100; 
	var referencia=datosOp[0].REFERENCIA;
	  montoOportunidad=monto;
		$('#concepto').val(concepto);
		$('#fecha_cierre').addClass('tCen Fecha DataInfo');
		$('#fecha_cierre').attr('onchange', 'Cambia_Fecha_Cierre()');
		$('#fecha_cierre').val(fecha_cierre3);
		$('#monto').val(monto);
		$('#monto').attr('onkeyPress', 'return ValidateFloatCharacter(event, this, \''+DECIMAL_SEPARADOR+'\')');
		$('#monto').attr('onchange', 'Cambia_Monto_Total()');
		$('#comision_monto').val(comision_monto);
		$('#comision_monto').attr('onkeypress', 'return ValidateFloatCharacter(event, this, \''+DECIMAL_SEPARADOR+'\')');
		$('#comision_monto').attr('onchange', 'Cambia_Comision_Total()');
		$('#comision_pct').val(comision_pct);
		$('#comision_pct').attr('onkeyPress', 'return ValidateFloatCharacter(event, this, \''+DECIMAL_SEPARADOR+'\')');
		$('#comision_pct').attr('onchange', 'Cambia_Monto_Total_Pct()');
		$('#referencia').val(referencia);

		var j = datosOp;
			
			for(var i=0; i<=64; i++){
				var dato = 'CAMPO'+i+'O';
				var dato2 = 'CAMPO'+i+'P';
				var $d = $('#CO'+i);
				var $d2 = $('#camposOcultos #CP'+i);
				var $d3 = $('#divTab-clientes #CP'+i);
				var info = j[0][dato];
				var info2 = j[0][dato2];
				$d.val(info);
				$d2.val(info2);//Hiidden prospecto
				$d3.val(info2); // Tab clientes
			}
}

SalesUp.Variables.ReemplazaHTML=function(){
	var htmlComision='<input name="comision_monto" id="comision_monto" maxlength="10" type="text" class="DataInfo"><input name="comision_pct" id="comision_pct" maxlength="5" type="text" class="DataInfo"/><span class="percent">%</span>';
	$('#comision_monto').replaceWith(htmlComision);
}

SalesUp.Variables.ConstruyeTabsLocal = function(idventana){

	var jsonTabs = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonNombresTab.dbsp', Parametros:'idventana='+idventana, DataType:'json'/*, Almacen:'jsonTabs' */});
	var tabs = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateTabsCoonvertirVenta.dbsp'/*, Almacen:'TemplateTabs'+idventana*/});

	SalesUp.Variables.jsonTabs = jsonTabs;
	var Compilado = SalesUp.Construye.ReemplazaDatos({Datos:jsonTabs, Template:tabs});
	Compilado = SalesUp.Sistema.Comprimir.Minifica({Dato:Compilado});
	$('#contenedorTabs').html(Compilado);
	$('#Tabs').tabs();
}/*ConstruyeTabs*/


SalesUp.Variables.ObtieneOpciones = function(Op){
	var Naturaleza = Op.Naturaleza, Id = Op.Id, Indice = Op.Indice, IdCampo = Op.IdCampo;
	var Pagina = '', Almacen = '', Parametros='tConsulta=1', Pasa = false, jsonRespuesta;
	var esCliente = SalesUp.Variables.EsCliente;
	if(Naturaleza == '1'){
		
		if(Id=='Titulo'){Pagina = 'jsonTitulos.dbsp'; Almacen = 'jsonTitulosv2'; Pasa = true;}
		
	}else if(Naturaleza == '2'){
		Pagina = 'jsonCamposPersonalizadosOpciones.dbsp'; Almacen = 'jsonOpcion'+IdCampo; Parametros +='&IdCampo='+IdCampo; Pasa = true;
	}

	if(Pasa){
		jsonRespuesta = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/'+Pagina, Parametros:Parametros, DataType:'json', Almacen:Almacen}).jsonDatos;	
	}
	
	return jsonRespuesta;
}/*ObtieneOpciones*/



SalesUp.Variables.CamposLocal = function(){
	var tmpCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateFormulario.dbsp', Almacen:'TemplateFormulario'});
	var jsonCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCampos.dbsp', Parametros:'idventana='+3, DataType:'json' /*, Almacen:'jsonLtCampos'+idventana*/});
	

   		var xyz=jsonCampos.jsonDatos;
   		
   		for(var i=xyz.length-1; i>-1; i--) {
 		   var TipoRestriccion = xyz[i].TipoRestriccion;
 		    if(parseInt(xyz[i].Naturaleza) == 1) {
          //Remove from array
    	   		xyz.splice(i, 1);
      		}    
   	}

   			jsonCampos.jsonDatos=xyz;

   		var aux=jsonCampos.jsonDatos;
   		var xx = aux.length;
		var yy = 0;

   	    for(var i=0; i<aux.length; i++) {
 		   var TipoRestriccion = aux[i].TipoRestriccion;
      		if ((parseInt(TipoRestriccion)!=1) && (parseInt(TipoRestriccion)!=2)){
				aux[i].Mostrar = '0';
				yy++;
			}	    
   		}

		jsonCampos.jsonDatos=aux;
   		console.log('hola11');

   			if(xx == yy)
				$('#Tab-clientes').remove();




	var jsonTabs = SalesUp.Variables.jsonTabs.jsonDatos;
	var Opciones;

	jsonCampos = _.reject(jsonCampos.jsonDatos, function(j){return _.size(j) == 0;});

	jsonCampos.jsonDatos = jsonCampos;


	if(!SalesUp.Variables.jsonConfiguracionCampos){
		SalesUp.Variables.jsonConfiguracionCampos = jsonCampos
	}else{
		SalesUp.Variables.jsonConfiguracionCampos = _.union(jsonCampos,SalesUp.Variables.jsonConfiguracionCampos)
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

				if(j.TipoRestriccion==2){
					j.Opciones = _.union(Seleccione, j.Opciones);
				}
			}
			
		}else if((j.esListaCheck=='1')||(j.esListaRadio=='1')||(j.esTemperatura=='1')||(j.esSelectInput=='1')){
			Opciones = j.Opciones;
			
			if(Opciones.indexOf('[')!=-1){ Opciones = Opciones }else{ Opciones = '['+Opciones+']'; }

			j.Opciones = JSON.parse(Opciones);
			
			if(j.TipoRestriccion==2){
				j.Opciones = _.union(Seleccione, j.Opciones);
			}
		}
	}

	jsonCampos.jsonDatos = infoJson;

		var Compilado = SalesUp.Construye.ReemplazaDatos({Datos:jsonCampos.jsonDatos, Template:tmpCampos});
		Compilado = SalesUp.Sistema.Comprimir.Minifica({Dato:Compilado});
		$('#divTab-clientes').append(Compilado).append('<div class="clear"></div>');
		
	

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
	SalesUp.Variables.CamposLocalHidden();
}/*SalesUp.Variables.Campos*/



SalesUp.Variables.CamposLocalHidden = function(){
	var tmpCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateFormulario.dbsp', Almacen:'TemplateFormulario'});
	var jsonCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCampos.dbsp', Parametros:'idventana='+1, DataType:'json' /*, Almacen:'jsonLtCampos'+idventana*/});
	

   		var xyz=jsonCampos.jsonDatos;

   		for(var i=xyz.length-1; i>-1; i--) {
			xyz[i].Mostrar = '0'; 		   
 		 if(parseInt(xyz[i].Naturaleza) == 1) {
          //Remove from array
    	    xyz.splice(i, 1);
      	}    
   	}


	jsonCampos.jsonDatos=xyz;


	var jsonTabs = SalesUp.Variables.jsonTabs.jsonDatos;
	var Opciones;

	jsonCampos = _.reject(jsonCampos.jsonDatos, function(j){return _.size(j) == 0;});

	jsonCampos.jsonDatos = jsonCampos;


	if(!SalesUp.Variables.jsonConfiguracionCampos){
		SalesUp.Variables.jsonConfiguracionCampos = jsonCampos
	}else{
		SalesUp.Variables.jsonConfiguracionCampos = _.union(jsonCampos,SalesUp.Variables.jsonConfiguracionCampos)
	}

	var infoJson = jsonCampos.jsonDatos;
	for (var x = 0; x <= infoJson.length - 1; x++) {
		var j = infoJson[x];
		var Seleccione = {};
		Seleccione.value = '';
		Seleccione.Opcion = '(... Seleccione una opción ...)';

		if(j.attr_maxLength==0){j.attr_maxLength='';}

		if(j.esSelect == '1'){
			Opciones = SalesUp.Variables.ObtieneOpciones({Naturaleza:j.Naturaleza, Id:j.attr_id, Indice:j.attr_data_Indice, IdCampo:j.IdCampo});
			if(Opciones){ 
				j.Opciones = Opciones; 

				if(j.TipoRestriccion==2){
					j.Opciones = _.union(Seleccione, j.Opciones);
				}
			}
			
		}else if((j.esListaCheck=='1')||(j.esListaRadio=='1')||(j.esTemperatura=='1')||(j.esSelectInput=='1')){
			Opciones = j.Opciones;
			
			if(Opciones.indexOf('[')!=-1){ Opciones = Opciones }else{ Opciones = '['+Opciones+']'; }

			j.Opciones = JSON.parse(Opciones);
			
			if(j.TipoRestriccion==2){
				j.Opciones = _.union(Seleccione, j.Opciones);
			}
		}
	}

	jsonCampos.jsonDatos = infoJson;

		var Compilado = SalesUp.Construye.ReemplazaDatos({Datos:jsonCampos.jsonDatos, Template:tmpCampos});
		Compilado = SalesUp.Sistema.Comprimir.Minifica({Dato:Compilado});
		$('#camposOcultos').append(Compilado).append('<div class="clear"></div>');
		
	

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

SalesUp.Variables.QuitaObligatorios = function(){
	$('#divTab-clientes .OcultarEste').each(function(){
		$(this).removeClass('InfoObligatorio');
	});

	$('#camposOcultos .OcultarEste').each(function(){
		$(this).removeClass('InfoObligatorio');
	});

}





