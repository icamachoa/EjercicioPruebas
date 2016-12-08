SalesUp.Variables.tieneActivaMoneda= false;
SalesUp.Variables.valorMonedaActual=0;
SalesUp.Variables.htmlMonedas='';
SalesUp.Variables.valorMonedaActualCotizador=0;
SalesUp.Variables.IDEMPRESAMONEDA = 0;


		$(function(){			
			$('input').keypress(function(e){ if(e.which == 13) { return false; } });
			ActivaAjaxFormOportunidades();
			setTimeout(function(){ $('#concepto').focus(); },1000);
			$("#monto").blur(function(){Calcula_Comision();});
			SalesUp.Variables.ConstruyeTabs();
			SalesUp.Variables.Campos();


			if($('#idlinea').hasClass('InfoObligatorio')){
					var auxCero = [0];
				var aux = Comisiones;
				Comisiones=[0];

				for(var x = 0;x<_.size(aux);x++)
	 				Comisiones.push(aux[x]);
				
				}

			//Cambia_Linea (document.frmOportunidad.idlinea);
			Cambia_Linea({t:$('#idlinea')});

			SalesUp.Variables.CambiaUpload();
			SalesUp.Variables.AddComision();
			SalesUp.Sistema.IniciaPlugins();		  
			setTimeout(function(){$('.BoxBotonesAccion').removeClass('w100');},200);
			SalesUp.Variables.llenaControles();

			if(parseInt(SalesUp.Variables.permisoCambiarMonedaSession)==1){
				SalesUp.Variables.tieneActivaMoneda=true;			
			}
	

			//Activa Moneda 
			if(SalesUp.Variables.tieneActivaMoneda){
				SalesUp.Variables.ActivaMoneda();
			}

		//Actica botn productos si esta activo modulo
		SalesUp.Variables.BotonProductos();


			//Colocando funciones de InfoSugerido
			AgregaFuncionesCamposSugeridos();
		}); /*ready*/

SalesUp.Variables.AccionesProductos = function(){
	SalesUp.Variables.BanderaBtnProductos 	= true;
	var productosAgregados 					= parseInt($('#ProductoAgregado').html());
	//Nota: se checara el console de las dos variables para abrir las pantallas
	
	$('#DECOTIZACION').val(2);


	if(productosAgregados == 0){
		SalesUp.Documentos.CapturaProductos();
	}else{
		$('#CapturaProdutos').show();
	}
};

		SalesUp.Sistema.BorrarItemDeAlmacen('TemplateFormulario');
		SalesUp.Sistema.BorrarItemDeAlmacen('jsonLtCampos');
		SalesUp.Sistema.BorrarItemDeAlmacen('jsonTabs');
		var idventana = 2;

		function AgregaFuncionesCamposSugeridos(){

			$('.InfoSugerido').each(function(){ 
				var OnBlur = $(this).attr('onblur');
				(!OnBlur) ? OnBlur = '':'';
				$(this).attr('onblur',OnBlur+' SalesUp.Buscar.BuscarSugeridosOportunidad({ Elemento:this, Valor:value });');
			});
		}

		SalesUp.Variables.ActivaMoneda =function (){
		  $('#monto').closest('.BoxInfo').removeClass('w50').addClass('w35');
		  var HTMLMoneda='<div class="BoxInfo w15"><select  onchange="SalesUp.Variables.CalculaMontoPorMoneda();" class="BoxSizing InfoData InfoObligatorio w100" name="monedas" id="monedas"></select></div>';
		 $('#monto').closest('.BoxInfo').after(HTMLMoneda);
		var jsonMonedas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonMonedasActivas.dbsp', DataType:'json'}).jsonDatos;
		
		var optionHtml= '';
		var defecto=0;
			for (var i = 0; i < jsonMonedas.length; i++){
				optionHtml += '<option data-moneda="'+jsonMonedas[i].MONEDA+'" data-idmonedaempresa="'+jsonMonedas[i].IDEMPRESAMONEDA+'"  data-unicode="'+jsonMonedas[i].UNICODE+'" data-tipoCambio="'+jsonMonedas[i].TIPODECAMBIO+'" value="'+jsonMonedas[i].IDEMPRESAMONEDA+'">'+jsonMonedas[i].IDMONEDA+'</option>';

				defecto= parseInt(jsonMonedas[i].PORDEFECTO);
					if(defecto==1){
						SalesUp.Variables.valorMonedaActualCotizador=parseFloat(jsonMonedas[i].TIPODECAMBIO);
						SalesUp.Variables.IDEMPRESAMONEDA = parseInt(jsonMonedas[i].IDEMPRESAMONEDA);
					}
			}
		//variable gloal para utilizar en el cotizador

		SalesUp.Variables.htmlMonedas=optionHtml;
	
		$('#monedas').html(optionHtml);

      		var idMonedaempresa = $('#monedas').val();
			var tipoCambioFinal = $('#monedas option:selected').attr('data-tipoCambio');
			$('#idempresamoneda').val(idMonedaempresa);
			$('#tipocambio').val(tipoCambioFinal);


		}

		SalesUp.Variables.CalculaMontoPorMoneda = function(){

			var valorMoneda = parseFloat(parseFloat($('#monedas option:selected').attr('data-tipoCambio')));
			var montoPrevio = parseFloat($('#monto').val());

			var nuevoMonto = SalesUp.Variables.Conversor(SalesUp.Variables.valorMonedaActualCotizador, valorMoneda, montoPrevio);			

			SalesUp.Variables.valorMonedaActualCotizador = valorMoneda;
			$('#monto').val(nuevoMonto);

      		var idMonedaempresa = $('#monedas').val();
			var tipoCambioFinal = $('#monedas option:selected').attr('data-tipoCambio');
			$('#idempresamoneda').val(idMonedaempresa);
			$('#tipocambio').val(tipoCambioFinal);
			
			Calcula_Comision();
		}

		SalesUp.Variables.Conversor = function (base,nuevo, monto){
	  		var cantidad = 0;
		  
		  		if(base<nuevo)
		     		cantidad = base/nuevo*monto;
      			else
          			cantidad = ((1/nuevo)*base)*monto;
      
	  		return SalesUp.Variables.roundDos(cantidad);
		}

		function Cambia_Linea(Op){
				
			var $t = $(Op.t).find('option:selected');
			var com = $($t).attr('comision');
			com= parseFloat(com);
			com = com*100;
			if(isNaN(com))
				com=0; 
			document.frmOportunidad.comision.value = SalesUp.Sistema.formatoNumero(com);
			  if (document.frmOportunidad.monto.value != ''){Calcula_Comision();}
			
		}

		SalesUp.Variables.CambiaUpload = function(){
			if(document.getElementById("archivo")){
				$('#archivo').replaceWith($('#Uploader'));
				$('#Uploader').show();
				$('#cierreestimado').addClass('Fecha');		
			}
		}	
		
		SalesUp.Variables.AddComision = function(){
			$('#monto').attr('onKeyPress', 'return ValidateFloatCharacter(event, this, \''+DecimalSeparador+'\')');
 			$('#monto').attr('onChange', 'Calcula_Comision()');
 			$('#monto').attr('onblur', 'SalesUp.Variables.numerosDecimales({t:this})');
 			$('#idlinea').attr('onChange','Cambia_Linea({t:this})');		
			$('#comision_monto').after($('#acomision').show());
			$('#comision_monto').attr('onKeyPress', 'return ValidateFloatCharacter(event, this, \''+DecimalSeparador+'\')');
			$('#comision_monto').attr('onChange', 'Calcula_Porcentaje()');
		}	
		
		function roundNumber(num, dec){
		  var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
		  return result;
		}
		
	
function Calcula_Comision(){

  var monto_pesos;
  var comision_pct;
  if (document.frmOportunidad.monto.value>''){
    if (document.frmOportunidad.comision.value==''){
      monto_pesos = 0;
      comision_pct = 0;
      document.frmOportunidad.comision.value = 0;
    }else{
      monto_pesos = SalesUp.Sistema.quitarFormatoNumero(document.frmOportunidad.monto.value);
      comision_pct = SalesUp.Sistema.quitarFormatoNumero(document.frmOportunidad.comision.value);
      comision_pct = comision_pct/100;
    }
    var tmp = monto_pesos*comision_pct;
    document.frmOportunidad.comision_monto.value = SalesUp.Sistema.formatoNumero(tmp);
  }
}



function activaFormato(Op, tipo){ 
  var $t = $(Op.t);
  var SysSepMiles = SalesUp.Sistema.Almacenamiento({a:'SysSepMiles'});
  var SysSepDecimales = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});

  var v = $t.val();

  if(v==''){return;}
  var Formato =tipo;
  var Formateado;
  var MonedaFormato='';
  

  (!SysSepMiles)?SysSepMiles=',':'';
  (!SysSepDecimales)?SysSepDecimales='.':'';

  if(tipo==1){   
       Formateado = accounting.formatNumber(v, 2, SysSepMiles, SysSepDecimales);
  }

  $t.val(Formateado);

}/*ActivaFormato*/


function quitaFormato(Op){ 
  var $t = $(Op.t);
  var v = $t.val();
  if(!v){return;}
  $t.val(sinFormato(v)).select();
}/*quitaFormato*/

function sinFormato(v) {
	var SysSepDecimales = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});
	return accounting.unformat(v, SysSepDecimales);
}
		
		function redondeo2decimales(numero){

			var original=parseFloat(numero);
			var result=Math.round(original*100)/100 ;
			return result;
		}
		
		function Calcula_Porcentaje(){
		  if (document.frmOportunidad.monto.value>''){ 
		    var monto=0;
		    var comision_monto=0;
		    comision_monto =SalesUp.Sistema.quitarFormatoNumero(document.frmOportunidad.comision_monto.value);
		    monto= SalesUp.Sistema.quitarFormatoNumero(document.frmOportunidad.monto.value);
		    if (monto==0 || monto=='NaN'){
		      var tmp=0;
		    }else{
		      var tmp=((comision_monto/monto)*100);
		    }
		    document.frmOportunidad.comision.value=SalesUp.Sistema.formatoNumero(tmp);
		  }
		}/*Calcula_Porcentaje()*/
		
		function verifyFile(){
		  var Nombre = document.UpLoadFileAjaxForm.archivo.value.toLowerCase();
		  return SalesUp.Valida.ValidaExtension({Archivo:Nombre});
		}
		
		function ValidateForm () {
		  return ValidaControlesNoNulos (document.frmOportunidad, NoNulos);
		}
		
		function GuardarOportunidad(){
		  $('#BtnAceptar').attr('disabled','disabled');
		  SalesUp.Sistema.MuestraEspera('',4);
		  var Pasa = false;
		  
		  setTimeout(function() {
		    /*Pasa = SalesUp.Variables.ValidaCamposUnicos();
		    (Pasa) ? Pasa = SalesUp.Valida.ValidaObligatorios() : '';*/
		    Pasa = SalesUp.Valida.ValidaObligatorios({DentroDe:$('#frmOportunidad')});
		    (Pasa) ? Pasa = SalesUp.Valida.ValidaCamposUnicosOportunidades() : '';
			
		    if(Pasa){
		    $('#monto').removeAttr('disabled');
		  	$('#idlinea').removeAttr('readonly');

		  	var tiene_productos = $('#tProductos').val();
		  	
			var Validar_monto = $("#monto").val(); 
			var formateado_monto=SalesUp.Sistema.quitarFormatoNumero(Validar_monto);
			$("#monto").val(formateado_monto);
			var Validar_com = $("#comision_monto").val(); 
			var formateado_com=SalesUp.Sistema.quitarFormatoNumero(Validar_com);
			$("#comision_monto").val(formateado_com);
			var Validar_comporc = $("#comision").val(); 
			var formateado_comporc=SalesUp.Sistema.quitarFormatoNumero(Validar_comporc);
			$("#comision").val(formateado_comporc);       
		      
		      var tmp2 = $("#comision_monto").val();
		      var tmp = $("#monto").val();
		      
		      var flag = 0;
		        
		      $('.comision').each(function(){
		        var valor2 = $(this).val();
		        if( valor2 == ".") {
		          $(".caja-botones").after('<span class="errorValidacion">El campo <b>' + $('label[for=' + $(this).attr('id') + ']').text() + '</b> es incorrecto.</span>');
		          $(this).focus()
		          flag = 1;
		          return false;
		        }
		      });
		
		      if (flag!=1){
		        if ((verifyFile()) && (ValidaFileSize())){
		          if(document.UpLoadFileAjaxForm.archivo.value!=''){  
		            var urlForm = ('https:' == document.location.protocol ? 'https://': 'http://' ) + 'fenix.salesup.com.mx/aws/subeArchivo.php';
		            document.UpLoadFileAjaxForm.action= urlForm;
		            $('#UpLoadFileAjaxForm').submit();
		          }else{
		           $('#frmOportunidad').submit(); 
		          } 
		        }else{
		          $('#BtnAceptar').removeAttr('disabled');
		        } 
		      }else{
		        $('#BtnAceptar').removeAttr('disabled');
		      }
		    }else{
		      $('#Overlay').remove();$('#BtnAceptar').removeAttr('disabled');
		    }
		  }, 10);
		}/* GuardarOportunidad()*/
		
		
		
		/*-------seleccionar plantilla-------*/
		
		SalesUp.Variables.ActivaFuncionesAdicionales = function(){
		 // Calcula_Comision(); 
		 Calcula_Porcentaje();
		}
		
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
				for (var x = 0; x <= infoJson.length - 1; x++){
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
						if(j.Opciones.indexOf('[')==-1){
							Opciones = '['+j.Opciones+']';	
						}else{
							Opciones = j.Opciones;
						}
						
						j.Opciones = JSON.parse(Opciones);
						if(((j.esTemperatura=='1')||(j.esSelectInput=='1'))&&(j.TipoRestriccion==2)){
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
		
			/*INICIAAAAA*/
			SalesUp.Variables.Asterisco();
			$('#Correo').attr('type','email').attr('onblur','SalesUp.Variables.ValidaEmail({t:this,v:value});');
			SalesUp.Variables.ValidaNumeros();
			SalesUp.Variables.Quitar33y34();
			SalesUp.Variables.onblurInfoUnico();
			$('.decimal').attr('onKeyPress', 'return ValidateFloatCharacter(event, this, \''+DecimalSeparador+'\')');
			SalesUp.Variables.TagCalagosActivos();
			SalesUp.Sistema.RestriccionOpcionesCanalizadas({prospectoEsCanalizado:SalesUp.Variables.prospectoEsCanalizado});
			
		}/*SalesUp.Variables.Campos*/

		SalesUp.Variables.TagCalagosActivos = function(){
			var arrTabs = $('.ui-tabs-panel');
			$Tab = $(arrTabs[0]);
			$Tab.find('.BoxInfo:last').after('<div id="BoxCatalogosActivos"></div>');
			SalesUp.Sistema.CatalogosActivos({EstoyEn:'PopUpOportunidades'});
		}
		
			SalesUp.Variables.Asterisco = function(){
				var arrObligatorios = $('.InfoObligatorio');
				for (var i = 0; i <= arrObligatorios.length - 1; i++){
					$(arrObligatorios[i]).closest('.BoxInfo').find('.InfoLabel').append('*');
				};
			}/*Asterisco*/

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
			
			function OcultarOverlay(){ $('#Overlay').remove(); }			

			SalesUp.Variables.Quitar33y34 = function (){
				$('[data-indice="34"], [data-indice="33"]').closest('.BoxInfo').remove();
			}
			SalesUp.Variables.onblurInfoUnico = function(){
				$('.InfoUnico').each(function(){ 
					var OnBlur = $(this).attr('onblur');
					(!OnBlur) ? $(this).attr('onblur','SalesUp.Valida.OportunidadEsUnico({ Elemento:this, Valor:value });') : '';
				});
			}

			SalesUp.Variables.AgregaryVerAvanzado = function(){
				$('#AgregarVerAvanzado').val(1);
				SalesUp.Variables.EnviarFormaAvanzado();
			}

SalesUp.Variables.BotonProductos = function (){

	if(SalesUp.Sistema.EstaActivoModulo({Modulo:8}) && (SalesUp.Variables.OpcionMostrar <= 1)){
	
		  	$('#concepto').closest('.BoxInfo').removeClass('w100').addClass('w80');
   			var HTMLCotizador = '<div class="BoxInfo w20"  > <button onclick="SalesUp.Variables.AccionesProductos();" class="BoxSizing InfoData w100 tCen Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar btnNeutral Pointer Tip4" id="btnProductos" tip="Captura productos" type="button" data-spmodulo="8"> <i class="fa fa-cubes"></i> Productos <span id="ProductoAgregado" class="BoxSizing Tip2" style="display:none;" tip="Productos agregados ">0</span></button></div>';
 			$('#concepto').closest('.BoxInfo').after(HTMLCotizador);
	}
 	SalesUp.Sistema.Tipsy();
}

SalesUp.Variables.MuestraElimina = function(){
	$('#eliminaProductos').removeClass('NoMostrar').addClass('Mostrar');
	
SalesUp.Sistema.Tipsy();
}

SalesUp.Variables.OcultaElimina = function(){
	$('#eliminaProductos').removeClass('Mostrar').addClass('NoMostrar');
SalesUp.Sistema.Tipsy();
}
