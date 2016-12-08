var montoOportunidad;

SalesUp.Variables.EditarProductos = function(idOportunidad,idProspecto,tko){
	self.parent.tb_remove();
	self.parent.AbrirEditarProductos(idOportunidad,idProspecto,tko);
	//SalesUp.Documentos.CapturaProductosVisualizar('Editar productos', idOportunidad, idProspecto, tko);
};

SalesUp.Variables.Default=function(){	

	var htmlComision	='<input name="comision_monto" id="comision_monto" maxlength="10" type="text" class="DataInfo"><input name="comision_pct" id="comision_pct" maxlength="5" type="text" class="DataInfo"/><span class="percent">%</span>';
	var htmlMonto 		= '<input name="monto" id="monto" maxlength="10" type="text" class="DataInfo montoWidth"><select name="monedas" id="monedas"  type="text" class="DataInfo"></select>';
	var idoportunidad 	= $('#IDOPORTUNIDAD').val();
	var datosOp 		= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDetalleOportunidad2.dbsp',Parametros:'IDOPORTUNIDAD='+idoportunidad,DataType:'json'}).jsonDatos;
	var idprospecto 	= datosOp[0].IDPROSPECTO;
	var concepto 		= datosOp[0].CONCEPTO;
	var fecha_cierre3 	= datosOp[0].FECHA_CIERRE3;
	var monto 			= SalesUp.Sistema.formatoNumero(datosOp[0].MONTO);
	var comision_monto 	= SalesUp.Sistema.formatoNumero(datosOp[0].COMISION_MONTO); if(comision_monto==null){comision_monto=0} 
	var comision_pct	= SalesUp.Sistema.formatoNumero(datosOp[0].COMISION*100);
	var tko 			= datosOp[0].TKO; 
	SalesUp.Variables.tkcom = datosOp[0].TKCOM;
	montoOportunidad 	= monto;

	SalesUp.Variables.prospectoEsCanalizado = datosOp[0].esCanalizado;


	$('#comision_monto').replaceWith(htmlComision);
	//$('#monto').replaceWith(htmlMonto);

	$('#concepto').val(concepto);
	$('#fecha_cierre').addClass('tCen Fecha DataInfo');
	$('#fecha_cierre').attr('onchange', 'Cambia_Fecha_Cierre()');
	$('#fecha_cierre').val(fecha_cierre3);
	$('#monto').val(monto);
	//$('#monto').attr('onkeyPress', 'return ValidateFloatCharacter(event, this, \''+DECIMAL_SEPARADOR+'\')');
	$('#monto').attr('onchange', 'Cambia_Monto_Total()');
	$('#comision_monto').val(comision_monto);
	//$('#comision_monto').attr('onkeypress', 'return ValidateFloatCharacter(event, this, \''+DECIMAL_SEPARADOR+'\')');
	$('#comision_monto').attr('onchange', 'Cambia_Comision_Total()');
	$('#comision_pct').val(comision_pct);
	//$('#comision_pct').attr('onkeyPress', 'return ValidateFloatCharacter(event, this, \''+DECIMAL_SEPARADOR+'\')');
	$('#comision_pct').attr('onchange', 'Cambia_Monto_Total_Pct()');
	if(SalesUp.Variables.monedaActivo == 1){
		if(datosOp[0].IDEMPRESAMONEDA){
	        $('#moneda').val(datosOp[0].IDEMPRESAMONEDA);
	      }
	     
		SalesUp.Variables.montoOriginal  = monto;
		SalesUp.Variables.monedaOriginal = $('#moneda').val();

		$('#tieneproductos').val(datosOp[0].TIENEPRODUCTOS);

		if(datosOp[0].TIENEPRODUCTOS == 1){
			var objExistencias = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonExistenciaProductos.dbsp',Parametros:'tko='+tko,DataType:'json'}).jsonDatos;

			if(!$.isEmptyObject(objExistencias[0])){
				$('#btnAceptar').attr('disabled','disabled');
				$('#BtnCalendarioS').attr('disabled','disabled');
				$('#BtnCalendarioH').attr('disabled','disabled');
				$('#BtnCalendarioS').hide();
				$('#BtnCalendarioH').hide();

				var trs = '';
				
				for (var i = 0; i < objExistencias.length; i++) {
					var existenciaActual 	= objExistencias[i];
					trs						= '<tr><td>'+existenciaActual.PRODUCTO+'</td><td class="tCen">'+existenciaActual.EXISTENCIA+'</td><td class="tCen">'+existenciaActual.CANTIDAD+'</td></tr>'
				};

				var tablaExistencias = '<h3><i class="fa fa-warning"></i> Hay productos que ya no tienen existencia o la cantidad a vender es mayor a esta.</h3><table class="simple"><thead><td>Producto</td><td class="tCen">Existencia actual</td><td class="tCen">Cantidad a vender</td><thead><tbody>'+trs+'</tbody></table>';

				$('#frmVenta').hide();
				$('#Existencias').show().html(tablaExistencias);
				$('.BoxBotonesAccion').prepend('<button type="button" id="BtnProductos" class="Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar btnNeutral" style="float:left;" onclick="SalesUp.Variables.EditarProductos('+idoportunidad+','+idprospecto+',\''+tko+'\');"><i class="fa fa-cubes"></i> Editar productos</button>');
			}

			$('#monto').addClass('disabled').attr('onfocus','this.blur();');
			$('#comision_monto').addClass('disabled').attr('onfocus','this.blur();');
			$('#comision_pct').addClass('disabled').attr('onfocus','this.blur();');
			
			var monto_aux           = parseFloat($('#monto').val());
			var comision_monto      = parseFloat($('#comision_monto').val());

			if(monto_aux > 0){
			var porcentaje_comision = parseFloat(comision_monto/(monto_aux/100));
			porcentaje_comision = SalesUp.Sistema.formatoNumero(porcentaje_comision);
				$('#comision_pct').val(porcentaje_comision);
			}




			$('#moneda').addClass('disabled').attr('onclick','SalesUp.Variables.Disabled = value;').attr('onchange','this.value = SalesUp.Variables.Disabled');
		}
	}
	
	//$('#referencia').val(referencia);

	var IdCatalogoOpcion1 = $.trim(datosOp[0].IdCatalogoOpcion1);
	var IdCatalogoOpcion2 = $.trim(datosOp[0].IdCatalogoOpcion2);
	var IdCatalogoOpcion3 = $.trim(datosOp[0].IdCatalogoOpcion3);

	$('#O-CatalogoOpcion1').val(IdCatalogoOpcion1);
    $('#O-CatalogoOpcion2').val(IdCatalogoOpcion2);
    $('#O-CatalogoOpcion3').val(IdCatalogoOpcion3);
	
	var j = datosOp;

	for (var i = 1; i <= 10; i++) {
		var CCAMPO = 'CCAMPO'+i;
		var dsto = j[0][CCAMPO];
		
		var $inpt = $('[name="Campo'+i+'C"]');
		$inpt.val(dsto);
		if(_.size($('[name="Campo'+i+'C"]'))> 1){$('[name="Campo'+i+'C"]:first').remove()}
 	}

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

	if(SalesUp.Variables.OportunidadCanalizada=='0'){
    	arrcpCanalizado = $('.cpCanalizado.InfoObligatorio');
    	arrcpCanalizado.removeClass('InfoObligatorio');
    }
    SalesUp.Variables.TagCalagosActivos();
	SalesUp.Variables.Asterisco();
	SalesUp.Variables.Quitar33y34();
	SalesUp.Variables.CamposLocalHidden();
}/*SalesUp.Variables.Campos*/

SalesUp.Variables.TagCalagosActivos = function(){
	var arrTabs = $('.ui-tabs-panel');
	$Tab = $(arrTabs[0]);
	$Tab.find('.BoxInfo:last').after('<div id="BoxCatalogosActivos"></div>');
	SalesUp.Sistema.CatalogosActivos({EstoyEn:'PopUpOportunidades'});
}

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

	if(SalesUp.Variables.OportunidadCanalizada=='0'){
    	arrcpCanalizado = $('.cpCanalizado.InfoObligatorio');
    	arrcpCanalizado.removeClass('InfoObligatorio');
    }
	
	SalesUp.Variables.Asterisco();
	SalesUp.Variables.Quitar33y34();
}/*SalesUp.Variables.Campos*/

SalesUp.Variables.QuitaObligatorios = function(){
	$('#divTab-clientes .OcultarEste').not('.NoOcultar').each(function(){
		$(this).removeClass('InfoObligatorio');
	});

	$('#camposOcultos .OcultarEste').each(function(){
		$(this).removeClass('InfoObligatorio');
	});

}
SalesUp.Variables.onblurInfoUnico = function(){
	$('.InfoUnico').each(function(){ 
		var OnBlur = $(this).attr('onblur');
		(!OnBlur) ? $(this).attr('onblur','SalesUp.Valida.OportunidadEsUnico({ Elemento:this, Valor:value });') : '';
	});
}

SalesUp.Variables.MonedaActual = function(obj){
	var $Elemento = $(obj.elemento);
	SalesUp.Variables.tipoDeCambioActual = $Elemento.find('option:selected').attr('data-cambioMoneda');
	SalesUp.Variables.monedaActual = $Elemento.val();
};

SalesUp.Variables.CambiaCambioMoneda = function(obj){
	var montoNuevo 	= 0;
	var montoActual	= SalesUp.Sistema.quitarFormatoNumero($('#monto').val());
	var $txtTipoCambio =$('#txtTipoCambio');
	var tipoDeCambio= SalesUp.Sistema.quitarFormatoNumero($txtTipoCambio.val());

	if (tipoDeCambio == 0) {
		SalesUp.Construye.MuestraMsj({tMsg:4,Destino:'#frmCambio',Msg:'El tipo de cambio debe de ser mayor a cero'});
		$txtTipoCambio.focus();
		SalesUp.Valida.MarcarObligatorio($txtTipoCambio);
	}else{
		montoNuevo = parseFloat(SalesUp.Sistema.calculaMontoTipoCambio({tipoCambioAnterior:SalesUp.Variables.tipoDeCambioActual,nuevoTipoCambio:tipoDeCambio,monto:montoActual}));
		$('#monto').val(SalesUp.Sistema.formatoNumero(montoNuevo));
		$('#tipodecambio').val(tipoDeCambio);
		Cambia_Monto_Total_Pct();

		SalesUp.Construye.CierraPopUp({t:obj.t});
	}
};

SalesUp.Variables.CierraPopUp = function(obj){
	$('#moneda').val(SalesUp.Variables.monedaActual);
	SalesUp.Construye.CierraPopUp({t:obj.t});
};

SalesUp.Variables.CambiaTipoCambio = function(obj){
	var $Elemento 		= $(obj.elemento);
	var idempresamoneda = $Elemento.val();
	var tipoDeCambio 	= SalesUp.Sistema.formatoNumero($Elemento.find('option:selected').attr('data-cambioMoneda'));
	var pordefecto  	= $Elemento.find('option:selected').attr('data-pordefecto');
	var montoActual		= SalesUp.Sistema.quitarFormatoNumero($('#monto').val());
	var montoNuevo		= 0;

		if(SalesUp.Variables.permiteTipoCambio == 0){
			montoNuevo = SalesUp.Sistema.calculaMontoTipoCambio({tipoCambioAnterior:SalesUp.Variables.tipoDeCambioActual,nuevoTipoCambio:tipoDeCambio,monto:montoActual});
			$('#monto').val(SalesUp.Sistema.formatoNumero(montoNuevo));
			$('#tipodecambio').val(SalesUp.Sistema.quitarFormatoNumero(tipoDeCambio));
			Cambia_Monto_Total_Pct();
		}else{
			if(pordefecto == 1){
				montoNuevo = SalesUp.Sistema.calculaMontoTipoCambio({tipoCambioAnterior:SalesUp.Variables.tipoDeCambioActual,nuevoTipoCambio:SalesUp.Sistema.quitarFormatoNumero(tipoDeCambio),monto:montoActual});
				$('#monto').val(SalesUp.Sistema.formatoNumero(montoNuevo));
				$('#tipodecambio').val(SalesUp.Sistema.quitarFormatoNumero(tipoDeCambio));
				Cambia_Monto_Total_Pct();
			}else{
				SalesUp.Construye.MuestraPopUp({
			      alto:'85px', ancho:'150px',
			      titulo:'Cambia tipo de cambio',
			      fuente:'/privado/popup_cambia_tipocambio.dbsp?tipoDeCambio='+tipoDeCambio,
			      id:'popUpCambio'
			    });
			}
		}
};

SalesUp.Variables.ActivaMultimoneda = function(){
	if(SalesUp.Variables.monedaActivo == 1){
		var jsonMonedas 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonMonedasActivas.dbsp', DataType:'json'}).jsonDatos;
		var opciones 		= '';
		var tipodecambio 	= 0;

		for (var i = 0; i < jsonMonedas.length; i++) {
			var monedaActual 	= jsonMonedas[i];
			opciones 			= opciones + '<option value="'+monedaActual.IDEMPRESAMONEDA+'" data-pordefecto="'+monedaActual.PORDEFECTO+'" data-cambioMoneda="'+monedaActual.TIPODECAMBIO+'">'+monedaActual.IDMONEDA+'</option>';
		};

		var $divConcento = $('#monto').parent();
		
		$divConcento.children('#monto').attr('style','width:30% !important');
		$divConcento.append('<select name="moneda" id="moneda" class="InfoData" style="width:28% !important;" onfocus="SalesUp.Variables.MonedaActual({elemento:this});" onchange="SalesUp.Variables.CambiaTipoCambio({elemento:this});">'+opciones+'</select>');

		tipodecambio = $('#moneda option:selected').attr('data-cambioMoneda');
		$divConcento.append('<input type="hidden" id="tipodecambio" name="tipodecambio" value=""/>');
		$divConcento.append('<input type="hidden" id="tieneproductos" name="tieneproductos" value="0"/>');
	}
}


SalesUp.Variables.EsEmpresaUnica = function(Op){
var $Elemento = $(Op.Elemento);
var noCuenta;
var BuscandoCoincidencias = '<span class="BuscandoCoincidencias Italic">Validando <i class="fa fa-lg fa-spinner fa-spin"></i></span>';
var Pasa = true;
 noCuenta = ( ($Elemento.hasClass('selectize-control') ) || ( $Elemento.hasClass('selectize-dropdown') ) );
 if (!noCuenta){
   var Valor = Op.Valor;
   if (!_.isEmpty(Valor)) {
     var $Padre = $Elemento.closest('.BoxInfo');
     var IdCampo = $Elemento.attr('data-idc');
     var idCom = $('#idCom').val();
     var tkCom = SalesUp.Variables.tkcom;
     var Campo = $Elemento.prev().html();
     var Post = {v:Valor, idc:IdCampo, tkcom: tkCom};
     $Padre.append(BuscandoCoincidencias);
     SalesUp.Variables.jsonUnico = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonValidaUnicoEmpresa.dbsp',Parametros:Post, DataType:'json', Div:0 });
     var tamanio = _.size(SalesUp.Variables.jsonUnico.jsonDatos[0]);
     if( _.size(SalesUp.Variables.jsonUnico.jsonDatos[0]) > 0 ){
     	
        Pasa = false;
        var Mensaje = 'La empresa <b>' + SalesUp.Variables.jsonUnico.jsonDatos[0].EMPRESA + '</b>';
        Mensaje = Mensaje + '</b> asignada a <b>'+SalesUp.Variables.jsonUnico.jsonDatos[0].Usuario+'</b> fue capturado con el mismo campo <b>'+Campo+'</b>. Por favor revise la información.';

        SalesUp.Construye.MuestraMsj({tMsg:3, Destino:'#popup-contenedor', Msg:Mensaje, NoCerrar:true });
        SalesUp.Valida.MarcarObligatorio($Elemento);
        SalesUp.Valida.FocusMal();
        $Padre.find('.BuscandoCoincidencias').remove();
        return false;
      }else{ 
        $Padre.find('.BuscandoCoincidencias').remove();
        return true; 
      }
  }else{ return Pasa; }
}else{ return Pasa; }
}/* /EsEmpresaUnica */


SalesUp.Variables.ValidaCamposUnicosEmpresas = function(Op){
	var Pasa = true, $DentroDe;
	(_.isUndefined(Op)) ? Op = {} : '';
		(Op.DentroDe) ? DentroDe = Op.DentroDe:'';
		$(DentroDe + '.InfoUnico').each(function(){
		Pasa = SalesUp.Variables.EsEmpresaUnica({ Elemento: this, Valor: $(this).val() });
		if(!Pasa){return Pasa;}
	});
	return Pasa;
}/* /ValidaCamposUnicos */
