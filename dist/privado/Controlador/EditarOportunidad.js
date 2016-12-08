SalesUp.Variables.TIPOCAMBIO;
SalesUp.Variables.IDEMPRESAMONEDA;
SalesUp.Variables.valorMonedaActual;


        $(function(){

          $("#cierreestimado").datepicker(ConfiguracionPickerNoFechasPasadas);
          $("#fecharecordatorio").datepicker(ConfiguracionPickerNoFechasPasadas);  
          
          //Calcula_Porcentaje();

          
          ActivaAjaxFormOportunidadesSeguimiento();
          setTimeout(function(){ $('#seguimiento').focus(); },1000);
			SalesUp.Variables.ConstruyeTabs();
			SalesUp.Variables.Campos();
			SalesUp.Variables.CambiaUpload();
			SalesUp.Sistema.IniciaPlugins();

			
			var idProspecto 		= $('#IdProspecto').val();
			var IdOportunidad 		= $('#IdOportunidad').val();
			var jsonInfoProspecto 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosOportunidad.dbsp', Parametros:'idoportunidad='+IdOportunidad, DataType:'json'}).jsonDatos;
			var idfase 				= jsonInfoProspecto[0].IDFASE;
			var idlinea 			= jsonInfoProspecto[0].IDLINEA_PRODUCTO;
			var idcerteza 			= jsonInfoProspecto[0].certeza;

			//Datos de Multimoneda
			SalesUp.Variables.TIPOCAMBIO 		= parseFloat(jsonInfoProspecto[0].TIPOCAMBIO);
			
			SalesUp.Variables.valorMonedaActual = SalesUp.Variables.TIPOCAMBIO;

			SalesUp.Variables.IDEMPRESAMONEDA 	= parseInt(jsonInfoProspecto[0].IDEMPRESAMONEDA);

	
			//console.log(jsonInfoProspecto);
			$('#comision_monto').after($('#acomision').show());
			$('#concepto').val(jsonInfoProspecto[0].CONCEPTO);
			$('#monto').val(SalesUp.Sistema.formatoNumero(jsonInfoProspecto[0].MONTO));
			$('#comision_monto').val(SalesUp.Sistema.formatoNumero(jsonInfoProspecto[0].COMISION_MONTO));
			$('#comision').val(SalesUp.Sistema.formatoNumero((jsonInfoProspecto[0].COMISION)*100));
			$('#cierreestimado').val(jsonInfoProspecto[0].FECHA_CIERRE_EST);
			$('#idfase').val(idfase);
			agregaKeyPress();
			SalesUp.Variables.onblurInfoUnico();

	
			if($('#idlinea').hasClass('InfoObligatorio')){
				var auxCero = [0];
				var aux = Comisiones;
				Comisiones=[0];

				for(var x = 0;x<_.size(aux);x++)
	 				Comisiones.push(aux[x]);
				
			}

			$('#idlinea').val(idlinea);
			$('#idlinea').attr('onChange','Cambia_Linea({t:this})'); 
			$('#certeza').val(idcerteza);

			var IdCatalogoOpcion1 = $.trim(jsonInfoProspecto[0].IdCatalogoOpcion1);
			var IdCatalogoOpcion2 = $.trim(jsonInfoProspecto[0].IdCatalogoOpcion2);
			var IdCatalogoOpcion3 = $.trim(jsonInfoProspecto[0].IdCatalogoOpcion3);

			$('#O-CatalogoOpcion1').val(IdCatalogoOpcion1);
	        $('#O-CatalogoOpcion2').val(IdCatalogoOpcion2);
	        $('#O-CatalogoOpcion3').val(IdCatalogoOpcion3);

			var j = jsonInfoProspecto ;
			for(var i=0; i<=64; i++){
				var dato = 'CAMPO'+i+'O';
				var $d = $('#CO'+i);
				var info = j[0][dato];
				$d.val(info);
			}

			SalesUp.Variables.llenaControles();
			SalesUp.Variables.ValidaNumeros();
			AgregaFuncionesCamposSugeridos();

			//Multimoneda

			if(parseInt(SalesUp.Variables.activoMultimoneda)==1){
				SalesUp.Variables.ActivaMonedaEditar();
			}else{
				$('#idempresamoneda').val(SalesUp.Variables.IDEMPRESAMONEDA);
				$('#tipocambio').val(SalesUp.Variables.TIPOCAMBIO);
			}

			//Nota: Se imprime el json de oportunidad
			if(jsonInfoProspecto[0].TIENEPRODUCTOS == '1' && (SalesUp.Variables.OpcionMostrar <= 1)){
				$('#monto').addClass('disabled').attr('onfocus','this.blur();');
				$('#comision_monto').addClass('disabled').attr('onfocus','this.blur();');
				$('#comision').addClass('disabled').attr('onfocus','this.blur();');
				$('#monedas').addClass('disabled').attr('onclick','SalesUp.Variables.Disabled = value;').attr('onchange','this.value = SalesUp.Variables.Disabled');
				$('#idlinea').parent().hide();
				$('#idfase').parent().removeClass('w50').addClass('w100');

			SalesUp.Variables.AgregaEditarCotizacion(jsonInfoProspecto[0].IDOPORTUNIDAD,jsonInfoProspecto[0].IDPROSPECTO, jsonInfoProspecto[0].TKO);
			}
			SalesUp.Variables.CorrigeTipoCambio(); //Cuando El Número es NaN

        }); /*Fin ready*/
        
   		var idventana = 2;


   		SalesUp.Variables.CorrigeTipoCambio=function(){
   			var tipoCambio=$('#tipocambio').val();
   			var idempresamoneda=$('#idempresamoneda').val();
			if(isNaN(tipoCambio)){
				$('#tipocambio').val(0);
			}
			if(isNaN(idempresamoneda)){
				$('#idempresamoneda').val(0);
			}
   		}

   		function agregaKeyPress(){
   			$('#monto').attr('onkeyPress', 'return ValidateFloatCharacter(event, this, \''+SP_DECIMALSEPARATOR+'\')');
			$('#comision_monto').attr('onkeypress', 'return ValidateFloatCharacter(event, this, \''+SP_DECIMALSEPARATOR+'\')');
			$('#comision_pct').attr('onkeyPress', 'return ValidateFloatCharacter(event, this, \''+SP_DECIMALSEPARATOR+'\')');
	   }

   		function AgregaFuncionesCamposSugeridos(){

			$('.InfoSugerido').each(function(){ 
				var OnBlur = $(this).attr('onblur');
				(!OnBlur) ? OnBlur = '':'';
				$(this).attr('onblur',OnBlur+' SalesUp.Buscar.BuscarSugeridosOportunidad({ Elemento:this, Valor:value });');
			});
		}

        function Cambia_Linea(Op){
				
		var $t = $(Op.t).find('option:selected');

		var com = $($t).attr('comision');
		com= parseFloat(com);

		if(isNaN(com))
			com=0; 

		document.frmOportunidad.comision.value = com *100;
		  if (document.frmOportunidad.monto.value != ''){Calcula_Comision();}
		
		}

        function roundNumber(num, dec) {
          var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
          return result;
        }
        
		SalesUp.Variables.CambiaUpload = function(){
			if(document.getElementById("archivo")){
				$('#archivo').replaceWith($('#Uploader'));
				$('#Uploader').show();
				$('#cierreestimado').addClass('Fecha');		
			}
		}	
        

        function Calcula_Comision(){
          if (document.frmOportunidad.monto.value>''){
            if (document.frmOportunidad.comision.value==''){
              var monto_pesos = 0;
              var comision_pct = 0;
              document.frmOportunidad.comision.value = SalesUp.Sistema.formatoNumero(0);
            }else{
              var comision = SalesUp.Sistema.quitarFormatoNumero(document.frmOportunidad.comision.value);
              var monto_pesos = SalesUp.Sistema.quitarFormatoNumero(document.frmOportunidad.monto.value);
              var comision_pct = comision/100;
            }
			aCom = monto_pesos*comision_pct;
			
			if (isNaN(aCom))      aCom = 0;
			if (aCom=='Infinity') aCom = 0;
			
            document.frmOportunidad.comision_monto.value = SalesUp.Sistema.formatoNumero(aCom);
          }
        }/*Calcula_Comision*/

        function redondeo2decimales(numero){
          var original=parseFloat(numero);
          var result=Math.round(original*100)/100 ;
          return result;
        }


			SalesUp.Variables.ValidaNumeros = function(){
				$('input.numero').keyup(function(){ 
					this.value = this.value.replace(/[^0-9]/g, '');	
				}).blur(function(){
					this.value = this.value.replace(/[^0-9]/g, '');	
				});
				
				$('input.decimal').keyup(function(){ 
					var v = this.value;
					($.isNumeric(v)) ? $(this).val(v) : $(this).val('');
				}).blur(function(){
					var v = this.value;
					($.isNumeric(v)) ? $(this).val(v) : $(this).val('');
				});
			}/*Valida numeros*/
			
        function Calcula_Porcentaje(){
          if (document.frmOportunidad.monto.value>''){
            var monto=0;
            var comision_monto=0;

            comision_monto =SalesUp.Sistema.quitarFormatoNumero(document.frmOportunidad.comision_monto.value);
            monto= SalesUp.Sistema.quitarFormatoNumero(document.frmOportunidad.monto.value);
            var tmp=((comision_monto/monto)*100);
			if (isNaN(tmp))       tmp = 0;
			if (tmp=='Infinity') tmp = 0;
            document.frmOportunidad.comision.value=SalesUp.Sistema.formatoNumero(tmp);
          }
        } /*Calcula_Porcentaje*/

        function proveFileType( fileName, fileTypes ) {
          if (!fileName) return;

          dots = fileName.split(".")
          //get the part AFTER the LAST period.
          fileType = "." + dots[dots.length-1];

          return (fileTypes.join(".").indexOf(fileType) != -1) ?
          window.top.p_archivo = document.frmOportunidad.cotizacion.value :
          alert("Por favor, seleccione archivos con alguna de estas extensiones: \n\n" + (fileTypes.join(" .")));
        }


        function verifyFile(){
          var Nombre = document.UpLoadFileAjaxForm.archivo.value.toLowerCase();
          return SalesUp.Valida.ValidaExtension({Archivo:Nombre});
        }

        function ValidateForm () {
          return ValidaControlesNoNulos (document.frmOportunidad, NoNulos);
        }

        SalesUp.Variables.TieneArchivo = false;

        SalesUp.Variables.Guardar = function(){

        	var Pasa = false;
        	var Hora = $('#tHoraVence').val();
        	var UltimaFecha = $('#tFechaVence').val();
        	SalesUp.Sistema.Almacenamiento({a:'SysHoraTarea',v:Hora});
        	SalesUp.Sistema.Almacenamiento({a:'SysFechaTarea',v:UltimaFecha});

        	var Hora = $('#rHoraVence').val();
        	var UltimaFecha = $('#rFechaVence').val();
        	SalesUp.Sistema.Almacenamiento({a:'SysHoraRecordatorio',v:Hora});
        	SalesUp.Sistema.Almacenamiento({a:'SysFechaRecordatorio',v:UltimaFecha});

        	Pasa = SalesUp.Valida.ValidaObligatorios();
        	(Pasa) ? Pasa = SalesUp.Valida.ValidaCamposUnicosOportunidades() : '';

        	var montoSinFormato = SalesUp.Sistema.quitarFormatoNumero($('#monto').val());
        	$('#monto').val(montoSinFormato);
        	var comisionMSinFormato = SalesUp.Sistema.quitarFormatoNumero($('#comision_monto').val());
        	$('#comision_monto').val(comisionMSinFormato);
        	var comisionSinFormato = SalesUp.Sistema.quitarFormatoNumero($('#comision').val());
        	$('#comision').val(comisionSinFormato);
        	$('#idempresamoneda').val($('#monedas').find('option:selected').val());

        	if(Pasa){       		
        		if(SalesUp.Variables.TieneArchivo){
        			$('#UpLoadFileAjaxForm').submit();
        		}else{
        			console.info('#frmOportunidad submit ');
        			$('#frmOportunidad').submit(); 
        		}
        	}else{ 
        		$('#BtnAceptar').removeAttr('disabled'); 
        		SalesUp.Sistema.OcultarOverlay(); 
        	}
        }/*SalesUp.Variables.Guardar */

     
        $('#Tabs.TabDatos').tabs();

        
		SalesUp.Variables.ConstruyeTabs = function(){
			var jsonTabs = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonNombresTab.dbsp', Parametros:'idventana='+idventana, DataType:'json', Almacen:'jsonTabs' });
			var tabs = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateTabs.dbsp', Almacen:'TemplateTabs'});
		
			SalesUp.Variables.jsonTabs = jsonTabs;
		
			var Compilado = SalesUp.Construye.ReemplazaDatos({Datos:jsonTabs, Template:tabs});
			Compilado = SalesUp.Sistema.Comprimir.Minifica({Dato:Compilado});
			$('#contenedorTabs').html(Compilado);
			$('#Tabs').tabs();
		}/*ConstruyeTabs*/
		
		SalesUp.Variables.Campos = function(){
		
			var tmpCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateFormulario.dbsp', Almacen:'TemplateFormulario'});
			var jsonCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCampos.dbsp', Parametros:'idventana='+idventana, DataType:'json', Almacen:'jsonLtCampos'});
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
					if(j.Opciones.indexOf('[')==-1){
						Opciones = '['+j.Opciones+']';	
					}else{
						Opciones = j.Opciones;
					}
					j.Opciones = JSON.parse(Opciones);
					if(j.TipoRestriccion=='2'){
						j.Opciones = _.union(Seleccione, j.Opciones);
					}
				}
			}
		
			jsonCampos.jsonDatos = infoJson;
			
			for (var i = 0; i <= jsonTabs.length - 1; i++){
				var idtab = jsonTabs[i].IDTAB;
				
				var jsonCamposFiltrado = _.where(jsonCampos.jsonDatos, {IdTab:idtab});
				jsonCamposFiltrado.jsonDatos = jsonCamposFiltrado;
			
				var Compilado = SalesUp.Construye.ReemplazaDatos({Datos:jsonCamposFiltrado, Template:tmpCampos});
				Compilado = SalesUp.Sistema.Comprimir.Minifica({Dato:Compilado});
				$('#divTab-'+idtab).html(Compilado).append('<div class="clear"></div>');
			}
		
			var $DatosFijos = $('#DatosFijos');
			var $BoxNombre = $('#Nombre').closest('.BoxInfo');
			var $BoxApellidos = $('#Apellidos').closest('.BoxInfo');
			var $BoxEmpresa = $('#Empresa').closest('.BoxInfo');
			
			$DatosFijos.prepend($BoxEmpresa.clone()).prepend($BoxApellidos.clone()).prepend($BoxNombre.clone());
		
			$BoxNombre.remove();
			$BoxApellidos.remove();
			$BoxEmpresa.remove();
		
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
			
			SalesUp.Variables.TagCalagosActivos();
			SalesUp.Sistema.RestriccionOpcionesCanalizadas({prospectoEsCanalizado:SalesUp.Variables.prospectoEsCanalizado});
            $('#monto').attr('onChange', 'Calcula_Comision();');
            $('#monto').attr('onblur', 'SalesUp.Variables.numerosDecimales({t:this});');
            $('#comision_monto').attr('onChange', 'Calcula_Porcentaje();');

    		SalesUp.Variables.Asterisco();
			SalesUp.Variables.Quitar33y34();

		}/*SalesUp.Variables.Campos*/

		SalesUp.Variables.TagCalagosActivos = function(){
			var arrTabs = $('.ui-tabs-panel');
			$Tab = $(arrTabs[0]);
			$Tab.find('.BoxInfo:last').after('<div id="BoxCatalogosActivos"></div>');
			SalesUp.Sistema.CatalogosActivos({EstoyEn:'PopUpOportunidades'});
		}

			SalesUp.Variables.ObtieneOpciones = function(Op){
				var Naturaleza = Op.Naturaleza, Id = Op.Id, Indice = Op.Indice, IdCampo = Op.IdCampo;
				var Pagina = '', Almacen = '', Parametros='', Pasa = false, jsonRespuesta;
				//console.log(IdCampo, Indice, Id);
				if(Naturaleza == '1'){
					
					if(Id=='idfase'){Pagina = 'jsonFasesOportunidades.dbsp'; Almacen = 'jsonFasesOportunidades'; Pasa = true;}

					if(Id=='idlinea'){Pagina = 'jsonLineasOportunidades.dbsp'; Almacen = 'jsonLineasOportunidades'; Parametros+='&TF=0'; Pasa = true;}

     				if(Id=='certeza'){Pagina = 'jsonCertezaOportunidades.dbsp'; Pasa = true; Parametros+='&PROSPECTOCANALIZADO='+SalesUp.Variables.prospectoEsCanalizado }
					
				}else if(Naturaleza == '2'){
					Pagina = 'jsonCamposPersonalizadosOpciones.dbsp'; Almacen = 'jsonOpcion'+IdCampo; Parametros +='&IdCampo='+IdCampo; Pasa = true;
				}

				if(Pasa){
					jsonRespuesta = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/'+Pagina, Parametros:Parametros, DataType:'json', Almacen:Almacen}).jsonDatos;	
				}

				return jsonRespuesta;
			}/*ObtieneOpciones*/

SalesUp.Variables.onblurInfoUnico = function(){
				$('.InfoUnico').each(function(){ 
					var OnBlur = $(this).attr('onblur');
					(!OnBlur) ? $(this).attr('onblur','SalesUp.Valida.OportunidadEsUnico({ Elemento:this, Valor:value });') : '';
				});
			}



SalesUp.Variables.ActivaMonedaEditar =function (){
     
  	$('#monto').closest('.BoxInfo').removeClass('w50').addClass('w35');
  
  	var HTMLMoneda = '<div class="BoxInfo w15"><select onfocus="SalesUp.Variables.MonedaActual({elemento:this});"  onchange="SalesUp.Variables.CalculaMontoPorMoneda();" class="BoxSizing InfoData InfoObligatorio w100" name="monedas" id="monedas"></select></div>';

 	$('#monto').closest('.BoxInfo').after(HTMLMoneda);

	var jsonMonedas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonMonedasActivas.dbsp', DataType:'json'}).jsonDatos;
	var optionHtml	= '';
	
	for (var i = 0; i < jsonMonedas.length; i++){
		optionHtml += '<option data-moneda="'+jsonMonedas[i].MONEDA+'" data-idmonedaempresa="'+jsonMonedas[i].IDEMPRESAMONEDA+'" data-unicode="'+jsonMonedas[i].UNICODE+'" data-tipoCambio="'+jsonMonedas[i].TIPODECAMBIO+'" value="'+jsonMonedas[i].IDEMPRESAMONEDA+'">'+jsonMonedas[i].IDMONEDA+'</option>';
	}

	SalesUp.Variables.htmlMonedas = optionHtml;
	var $monedas = $('#monedas');
	$monedas.html(optionHtml);

	if(SalesUp.Variables.IDEMPRESAMONEDA && SalesUp.Variables.IDEMPRESAMONEDA > 0){
		$monedas.val(SalesUp.Variables.IDEMPRESAMONEDA);
		$monedas.find('option:selected').attr('data-tipoCambio',SalesUp.Variables.TIPOCAMBIO);
	}
	
	var idMonedaempresa = $monedas.val();
	var tipoCambioFinal = $monedas.find('option:selected').attr('data-tipoCambio');
	
	$('#idempresamoneda').val(idMonedaempresa);
	$('#tipocambio').val(tipoCambioFinal);
}


		SalesUp.Variables.ActivaFuncionesAdicionales = function(){
		 // Calcula_Comision(); 
		 Calcula_Porcentaje();
		}
SalesUp.Variables.CalculaMontoPorMoneda = function(){

	var valorMoneda = parseFloat($('#monedas option:selected').attr('data-tipoCambio'));
	var montoPrevio = SalesUp.Sistema.quitarFormatoNumero($('#monto').val());

	var nuevoMonto = SalesUp.Sistema.formatoNumero(SalesUp.Sistema.calculaMontoTipoCambio({tipoCambioAnterior:SalesUp.Variables.tipoDeCambioActual,nuevoTipoCambio:valorMoneda,monto:montoPrevio}));

	$('#monto').val(nuevoMonto);
	Calcula_Comision();
	$('#monedas').blur();
	
}

SalesUp.Variables.ConversorMoneda = function (base,nuevo, monto){
  
	var cantidad = 0;
 
		if(base<nuevo)
     		cantidad = base/nuevo*monto;
		else
        	cantidad = ((1/nuevo)*base)*monto;
      
    return SalesUp.Variables.roundDos(cantidad);
}

SalesUp.Variables.roundDos = function (num) {
  return +(Math.round(num + "e+2")  + "e-2");
}


SalesUp.Variables.AgregaEditarCotizacion =function (IdOportunidad, idProspecto, tko){

	var jsonNumeroProductos 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonNumeroProductos.dbsp', Parametros:'tko='+tko, DataType:'json'}).jsonDatos;
	var numero 					= jsonNumeroProductos[0].numeroProductos;

  	$('#concepto').closest('.BoxInfo').removeClass('w100').addClass('w75');
   	var HTMLCotizador = '<div class="BoxInfo w25"> <button onclick="SalesUp.Documentos.AccionesProductosEditar(\''+'\','+IdOportunidad+','+idProspecto+',\''+tko+'\');" class="BoxSizing InfoData w100 tCen Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar btnNeutral Pointer Tip4" id="btnProductosSeguimiento" tip="Editar productos" type="button" data-spmodulo="8"> <i class="fa fa-cubes"></i> Productos <span class="BoxSizing" id="numeroProductos">'+numero+'</span> <span id="ProductoAgregado" class="BoxSizing Tip2" style="display:none;" tip="Productos agregados ">0</span></button></div>';

 	$('#concepto').closest('.BoxInfo').after(HTMLCotizador);

 	SalesUp.Sistema.Tipsy();
}

SalesUp.Variables.Pregunta  = function(){
   	SalesUp.Construye.MuestraAlerta({
	    TipoAlerta : 'AlertaPregunta',
	    Id : 'AccionDocumentoPOP',
	    Alerta : '<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/>¿Desea generar nuevamente la cotizacion?',
		Boton1 : 'Si y conservar anterior',
		Boton2 : 'No',
		Callback1 : 'SalesUp.Variables.GuardarConOpciones(1)',
		Callback2 : 'SalesUp.Variables.GuardarConOpciones(0)',
		Icono1 : '<i class="fa fa-times"></i>',
		Icono2 : '<i class="fa fa-times"></i>',
		Ancho : '500px'
	});

	$('#AccionDocumentoPOP .PieModal').append('<a class="btnAccion Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" id="CrearReemplzar"><i class="fa fa-times"></i> Si y reemplazar</a>');
	$('#CrearReemplzar').attr('onclick', 'SalesUp.Construye.CierraAlerta({Elemento:this  ,Callback:SalesUp.Variables.guardarOpcionesSiReemplazar  });');
}

SalesUp.Variables.guardarOpcionesSiReemplazar = function(){
	SalesUp.Variables.GuardarConOpciones(2);
}

SalesUp.Variables.GuardarConOpciones=function(tipoAccionDocumento){
	$('#AccionDocumento').val(tipoAccionDocumento);

	var guardarInformacionOportunidad = function(){
		$('#CapturaProdutos .InfoObligatorio').each(function(){
	         $(this).removeClass('InfoObligatorio');
	    });

	    $('#BtnAceptar').attr('disabled','disabled');
	    var Validar_monto = $("#monto").val(); 
	    var formateado_monto=FormatFloatCharacterGen(Validar_monto,'.','.');
	    $("#monto").val(formateado_monto);
	    var Validar_com = $("#comision_monto").val(); 
	    var formateado_com=FormatFloatCharacterGen(Validar_com,'.','.');
	    $("#comision_monto").val(formateado_com);

	    var tmp2 = $("#comision_monto").val();
	    var tmp = $("#monto").val();

	    var flag = 1;
		            
	    flag = 0;
	    $('.comision').each(function(){
	        $('span.errorValidacion').remove();
	        var valor2 = $(this).val();
	        if( valor2 == "." || valor2 == "NaN") {
	            $(".caja-botones").after('<span class="errorValidacion">El campo <b>' + $('label[for=' + $(this).attr('id') + ']').text() + '</b> es incorrecto.</span>');
	            $(this).focus()
	            flag = 1;
	            return false;
	        }else{
	            flag = 0;
	        }
	    });

		if (flag!=1){
		    if ((verifyFile()) && (ValidaFileSize())){
		    	
		        if(document.UpLoadFileAjaxForm.archivo.value!=''){  
		            var urlForm = ('https:' == document.location.protocol ? 'https://': 'http://' ) + 'fenix.salesup.com.mx/aws/subeArchivo.php';
		            document.UpLoadFileAjaxForm.action= urlForm;
		            SalesUp.Variables.TieneArchivo = true;
		            SalesUp.Variables.RevisarRestricciones();
		        }else{
		            SalesUp.Variables.TieneArchivo = false; 
		            SalesUp.Variables.RevisarRestricciones();
		        }
		    }else{
		        $('#BtnAceptar').removeAttr('disabled');
		    }
		}else{
		    $('#BtnAceptar').removeAttr('disabled');
		}
	}/*guardarInformacionOportunidad*/

	
	if(SalesUp.Variables.estaVisibleCotizador){	
	 	SalesUp.Variables.BanderaEditarSeguimiento = 1;
		SalesUp.Variables.ConstruyeJsonCotizador({t:$('#CapturaProdutos #BtnAceptar'), callback:guardarInformacionOportunidad});
	}else{
		guardarInformacionOportunidad();
	}
}	/*SalesUp.Variables.GuardarConOpciones*/

SalesUp.Variables.MonedaActual = function(obj){
  var $Elemento = $(obj.elemento);
  SalesUp.Variables.tipoDeCambioActual = $Elemento.find('option:selected').attr('data-tipoCambio');
  SalesUp.Variables.monedaActual = $Elemento.val();
}

SalesUp.Variables.guardaCambiosOportunidad = function(e){
	e.preventDefault();
	var documento = document.UpLoadFileAjaxForm.archivo.value;
	if(SalesUp.Variables.estaVisibleCotizador && SalesUp.Variables.idDocumento){
		SalesUp.Variables.Pregunta();
	}else if(documento != ''){
		SalesUp.Variables.GuardarConOpciones(AccionDocumento);
	}else{
		SalesUp.Variables.GuardarConOpciones(0);
	}
}


/*$('#btnAceptar').click(function(e){
e.preventDefault();

SalesUp.Variables.BanderaEditarSeguimiento = 1; 


 if(dato==''){
  //$('#idusuario').addClass('DatoMal');
  SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Msg:'Debe seleccionar un <strong>ejecutivo</strong>' });
 }else{
 	$('#frmAsignar').submit();
 }
});*/

