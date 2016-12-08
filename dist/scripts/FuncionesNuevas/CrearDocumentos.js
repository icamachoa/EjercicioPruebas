var CrearDocumentos = function(){
	
	/*
	INPUT NECESARIOS PARA QUE FUNCIONE	
	#PlantillaSeleccionada
	#PlantillaNombre
	#jsonDatosDocumento
	#NombreArchivoSugerido
	#DescripcionArchivo

	*/
	SalesUp.Variables.Desde = 'Plantillas';

	this.SeleccionarArchivos = function(){
		//Nuevo

		var productosAgregados 					= parseInt($('#ProductoAgregado').html());

		if(($('#jsonDatosDocumento').val() == '') ){
			
			if(productosAgregados == 0){
				$('#monto').removeAttr('disabled');
				$('#idlinea').removeAttr('disabled');
				$('#monedas').removeAttr('disabled');
			}
				SalesUp.Documentos.MuestraSeleccionarPlantilla();
		}else{
			$('#monto').removeAttr('disabled');
			/*$('#idlinea').removeAttr('disabled');
			$('#idfase').closest('.BoxInfo').removeClass('w100').addClass('w50');
			$('#idlinea').closest('.BoxInfo').show(); */
			$('#monedas').removeAttr('disabled');
				

			var Pregunta = '¿Esta seguro de agregar otro documento, esto reemplazara el actual: '+$('#NombreArchivoSugerido').val()+'?';
			SalesUp.Construye.MuestraAlerta({
				TipoAlerta:'AlertaPregunta',
				Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2>'+Pregunta+'',
				Boton1:'Aceptar',
				Boton2:'Cancelar',
				Callback1: 'SalesUp.Documentos.MuestraSeleccionarPlantilla',
				Icono1:'<i class="fa fa-check"></i>',
				Icono2:'<i class="fa fa-times"></i>',
				Ancho:'500px'
	        });

		}
		//Fin Nuevo
	}

	this.MuestraSeleccionarPlantilla=function(){

	/*$('#DECOTIZACION').val(1);
	$('#ltIdProducto').val(''); 
	$('#DESCUENTO').val(0);
	$('#DESCUENTO_PCT').val(0);
	$('#SUBTOTAL').val('');
	$('#TOTAL').val('');
	$('#JSON_SUBTOTALES').val('');*/



			    setTimeout(function(){
	    			SalesUp.Construye.MuestraAlerta({
	      				TipoAlerta:'AlertaPregunta', Ancho:'100%', Id:'SeleccionarPlantilla',
	      				Alerta: '<iframe frameborder="0" style="width:100%;height:413px;display:inline-block;" src="/privado/PopUpSeleccionarArchivos.dbsp?Desde='+SalesUp.Variables.Desde+'" hspace="0"></iframe>'
	    			});
	    		$('#SeleccionarPlantilla .PieModal').hide();  
	  			}, 300);
	}

	this.SugerirFolio =function(Op){

		$('#refreshFolio').addClass('fa-spin');	
		var jsonSugerido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonFolioSugerido.dbsp', DataType:'json'}).jsonDatos;
		$('#inputFolio').val(jsonSugerido[0].NUMFOLIO);

		setTimeout(function(){
		var cadena = $('#concepto').val();

		if(cadena == '')
			$('#concepto').val('Cotizacion-'+$('#inputFolio').val());
		else
			$('#concepto').val(cadena+' Cotizacion-'+$('#inputFolio').val());


			$(Op.t).remove();
		},200);
		
	}

	this.EtiquetasDelDocumento = function(){
	  //$('.ModalNotification').remove();
	  
	  var idd = $('#PlantillaSeleccionada').val();
	  var Documento = $('#PlantillaNombre').val();
	  var idp = $('#IdProspecto').val(), ido = $('#IdOportunidad').val();
	  (!idp) ? idp = 0 : '';
	  (!ido) ? ido = 0 : '';
	  
	  var $MetaEtiqueta = $('.MetaEtiqueta[data-MetaEtiqueta]');
	  var jsonDatosPopUp = {};
	  for (var i = 0; i <= $MetaEtiqueta.length - 1; i++){
	    var $this = $($MetaEtiqueta[i]); var jsonComodin = {};
	    var Etiqueta = $this.attr('data-MetaEtiqueta');
	    var valor = $this.val();
	    var id = $this.attr('id');
	    var tagName = document.getElementById(id).tagName;
	    if(tagName=='SELECT'){valor = $this.find('option:selected').text();}
	    jsonComodin.Etiqueta = Etiqueta;
	    jsonComodin.Valor = valor;
	    jsonDatosPopUp = _.union(jsonDatosPopUp,jsonComodin);
	  };

	  jsonDatosPopUp = _.reject(jsonDatosPopUp , function(j){ return _.size(j) == 0; });
	  
	  var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonEtiquetasDelDocumento.dbsp', Parametros:'idd='+idd+'&idp='+idp+'&ido='+ido, DataType:'json'});
	  var html = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateLlenarCrearDocumento.dbsp', Almacen:'TemplateLlenarCrearDocumento'});
	  var Datos = {};  

	  var InfoProspecto = json.jsonDatos[0].InfoProspecto;

	  (InfoProspecto.NombreProspecto) ? Documento += ' '+InfoProspecto.NombreProspecto:'';
	  (InfoProspecto.Empresa) ? Documento += ' '+InfoProspecto.Empresa:'';
	  Datos.Documento = Documento;

	  Datos.InformacionPlantilla = json.jsonDatos[0].EtiquetasDocumento;

	  var TemplateHtml = Handlebars.compile(html);
	  var HtmlAlerta = TemplateHtml(Datos);
	  var btns = '';
	  btns += '<a onclick="SalesUp.Construye.CierraAlerta({Elemento:this});" class="Pointer btnNegativo Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Cancelar"><i class="fa fa-times"></i> Cerrar</a>';
	  btns += '<a onclick="SalesUp.Documentos.RecopilarInformacionPlantilla({Elemento:this});" class="Pointer btnAccion Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar"><i class="fa fa-check"></i> Aceptar</a>';
	  
	  SalesUp.Construye.MuestraAlerta({
	    TipoAlerta:'AlertaPregunta', Id:'LlenarPlantilla', 
	    Alerta: HtmlAlerta, Ancho:'100%', Alto:'350px;'
	  });
	  
	  SalesUp.Documentos.PermaLinkArchivo({Archivo:Documento});

	  $('#LlenarPlantilla .PieModal').html(btns);

	  $('table.simple tbody tr:even').addClass('zebra');
	  var $DatoValor = $('.DatoValor');
	  for(var i = 0; i <= $DatoValor.length - 1; i++){
	    var $this = $($DatoValor[i]);
	    if(!$this.val()){$this.focus(); return false;}
	  };
	  
	}



	this.RecopilarInformacionPlantilla = function(Op){

	  $inputs = $('#BoxContenidoInfo .DatoValor');
	  var pasa = true;
	  var jsonDatosDocumento = [];
	  
	  for (var i = 0; i <= $inputs.length - 1; i++){
	    var $this = $($inputs[i]); var jsonComodin = {};
	    if(!$this.val()){$this.addClass('DatoValorVacio'); pasa = false;}
	    var Etiqueta = $this.attr('data-MetaEtiqueta');
	    var valor = $this.val();

	    jsonComodin.Etiqueta = Etiqueta;
	    jsonComodin.Valor = valor;
		jsonDatosDocumento.push(jsonComodin);  
	  }
	  pasa = true;
	  if(!pasa){ 
	    SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'Todos los campos marcados deben de estar llenos, para generar el documento', Destino:'#LlenarPlantilla .BodyModal'}); 
	    return false;
	  }else{
	    $('#DocAgregado').slideDown();
	    jsonDatosDocumento = _.reject(jsonDatosDocumento , function(j){ return _.size(j) == 0; });
	    $('#jsonDatosDocumento').val(JSON.stringify(jsonDatosDocumento));
	    SalesUp.Construye.CierraAlerta({Elemento:Op.Elemento});
	    (SalesUp.Variables.ActivaFuncionesAdicionales) ? SalesUp.Variables.ActivaFuncionesAdicionales() : '';
	  //Invoca pantalla de productos

	  		var tProductos = parseInt($('#tProductos').val());
  	  		$('#DocumentoCotizacion').val($('#PlantillaSeleccionada').val());

  	  		var productosAgregados = parseInt($('#ProductoAgregado').html());
			  
			  if((tProductos == 1)  && (SalesUp.Sistema.EstaActivoModulo({Modulo:8})) && (SalesUp.Variables.OpcionMostrar <= 1)){
			  	if(productosAgregados == 0){
			  		SalesUp.Documentos.CapturaProductos();
			  	}

			  	SalesUp.Variables.BanderaBtnProductos = false;
			  	$('#DECOTIZACION').val(1);
			  }
	  }
	  /*Termina nuevo*/
	}


	this.MetaEtiqueta = function(Op){
	  var $this = $(Op.e);
	  var MetaEtiqueta = Op.Etiqueta;
	  var Valor = Op.v;
	  $this.removeClass('DatoValorVacio');

	  var $MetaEtiqueta = $('.MetaEtiqueta[data-MetaEtiqueta="'+MetaEtiqueta+'"]');
	  var Opciones = $MetaEtiqueta.find('option');
	  var esSelect = _.size(Opciones); 
	  if(esSelect){
	    var texto = Valor.toLowerCase();
	    Valor = '';
	    for (var i = 0; i <= Opciones.length - 1; i++){
	      if($(Opciones[i]).text().toLowerCase()==texto){Valor = $(Opciones[i]).val(); }
	    };
	  }

	  if(Valor){$MetaEtiqueta.val(Valor);}
	  
	}
	
	this.CapturaProductos = function(){
		var Contenido = SalesUp.Sistema.CargaDatos({Link:"/privado/PopUpProductosCotizador.dbsp" });
	    
	    SalesUp.Construye.MuestraAlerta({
	      TipoAlerta:'AlertaPregunta', Ancho:'100%', Id:'CapturaProdutos', Alto:'400px;',
	      Alerta: Contenido
	    });
	    
	    $('#CapturaProdutos .PieModal').hide();  
		$('.ContenedorModal').css('top','5% !important');
		
		SalesUp.Variables.IniciaCotizadorProductos();
	}

	SalesUp.Variables.DesdeEditar = 0; 

	this.CapturaProductosVisualizar = function(titulo, idOportunidad, idProspecto, tko){
			//Reiniciando variables cotizador 
			var values = [];
			var IDTR=0;

		impuestosEmpresa='';
		TipoComision  = 1;
		impuestosTotales={};
		sumaImpuestosTotales=0;


			SalesUp.Variables.DesdeEditar=1;		
			SalesUp.Variables.idOportunidad = idOportunidad;
			SalesUp.Variables.idProspecto = idProspecto;
			SalesUp.Variables.tko = tko;
			//'Editar cotizador'

	SalesUp.Construye.MuestraPopUp({
		alto:'400px', ancho:'1000px',
		titulo:titulo, id:'CapturaProdutos',
		fuente:'/privado/PopUpProductosCotizador.dbsp'});

	 //var HTMLMoneda='<div class="BoxInfo w15"><select  onchange="" class="BoxSizing InfoData InfoObligatorio w100" name="monedas" id="monedas"></select></div>';
		
		setTimeout(function(){
			SalesUp.Variables.IniciaCotizadorProductos();
			//$('#CapturaProdutos').append(HTMLMoneda);
			$('#CapturaProdutos .BodyModal').css('padding','0px 5px').attr('id', 'popup-contenedor');
			$('#CapturaProdutos .ContenedorModal').css('top','0px !important');
			$('#CapturaProdutos #sinProductos').html('<i class="fa fa-2x fa-spinner fa-spin"></i>   Cargando productos');

				if(titulo == ''){
					$('#CapturaProdutos .ContenedorModal').removeAttr('style');
					$('#CapturaProdutos .ContenedorModal').attr('style','top: 0% !important; max-width: 100% !important;');
				}
	
			SalesUp.Variables.AgregarArticuloBD(idOportunidad, idProspecto, tko, SalesUp.Variables.idArchivo);
		},150);
	}

this.AccionesProductosEditar = function(titulo, idOportunidad, idProspecto, tko){
	SalesUp.Variables.BanderaBtnProductos 	= true;
	var productosAgregados 					= parseInt($('#ProductoAgregado').html());

	//Nota: se checara el console de las dos variables para abrir las pantallas
	
	$('#DECOTIZACION').val(2);


	if(productosAgregados == 0){
		SalesUp.Documentos.CapturaProductosVisualizar(titulo, idOportunidad, idProspecto, tko);
	}else{
		$('#CapturaProdutos').show();
	}
};


	this.RegeneraDocumentoCotizacion = function(Op){
			SalesUp.Variables.Archivo=''
			SalesUp.Variables.ArchivoFisico='';

			var jArchivo = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryRegeneraArchivo.dbsp', Parametros:'idOportunidad='+SalesUp.Variables.idOportunidad+'&IdProspecto='+SalesUp.Variables.idProspecto, DataType:'json'}).jsonDatos;

			SalesUp.Variables.idArchivo = jArchivo[0].idArchivo;
			$('#IdArchivo').val(SalesUp.Variables.idArchivo);
			
			SalesUp.Variables.Callback2DocumentoCreado = 'RecargaArchivos';
			SalesUp.Variables.AlertaDocumentoCreado = '<h2 class="Verde"> ¡Listo! <i class="fa fa-check"></i></h2><br/>La cotización ha sido creada con éxito y guardada en la oportunidad.';
				
			SalesUp.Variables.AlertaErrorDocumento = '<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/>El documento no se ha podido crear, intenteló nuevamente.';
			SalesUp.Variables.Callback1ErrorDocumento = '';
			SalesUp.Variables.Boton1ErrorDocumento = 'Aceptar';
			
			SalesUp.Documentos.ProcesoCrearDocumento();
	}	




	SalesUp.Variables.PasaPermalink = false;

	this.PermaLinkArchivo = function(Op){
	  SalesUp.Variables.PasaPermalink = true;
	  var Archivo = '', Evento;
	  (Op.Archivo) ? Archivo = escape(Op.Archivo) : '';
	  
	  if(Op.Evento){
	    var key = SalesUp.Sistema.NumKeyCode(Op.Evento);
	    if(key == 13){return false;}
	    if(key == 37){return false;}
	    if(key == 38){return false;}
	    if(key == 39){return false;}
	    if(key == 40){return false;}
	  }
	  
	  $('#NombreSugerido').html('<i class="fa fa-spin fa-spinner"></i>');
	  setTimeout(function(){
	    if(SalesUp.Variables.PasaPermalink){
	      var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonPermaLinkArchivo.dbsp', Parametros:'Archivo='+Archivo, DataType:'json'}).jsonDatos;
	      $('#NombreSugerido').html(json[0].NombreSugerido);
	      $('#NombreArchivoSugerido').val(json[0].NombreSugerido);
	      $('#DescripcionArchivo').val(Op.Archivo);
	    }
	  }, 500);
	}


	this.ProcesoCrearDocumento = function(){

			var ProgresoCreandoArchivo = function(){
				
				setTimeout(function(){
					if(ProgresoCreandoArchivoPaso1()){

						setTimeout(function(){
							if(ProgresoCreandoArchivoPaso2()){

								setTimeout(function(){
									if(ProgresoCreandoArchivoPaso3()){

										setTimeout(function(){
											if(ProgresoCreandoArchivoPaso4()){

												setTimeout(function(){
													if(ProgresoCreandoArchivoPaso5()){
														DocumentoCreado();
													}/*Paso5*/
												}, 200);
											}/*Paso4*/
										}, 200);
									}/*Paso3*/
								}, 200);
							}/*Paso2*/
						}, 200);
					}/*Paso1*/
				}, 200);

			}/*ProgresoCreandoArchivo*/

			var ProgresoCreandoArchivoPaso1 = function(){
				
				var Paso = 1, Peso=0;
				var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryGeneraXmlaPdf.dbsp', Parametros:'idArchivo='+SalesUp.Variables.idArchivo+'&NombreFile='+SalesUp.Variables.Archivo+'&Paso='+Paso, DataType:'json'});
				json = json.jsonDatos;
				SalesUp.Variables.Archivo = json[0].NombreFile;
				if(!SalesUp.Variables.Archivo){ ErrorDocumento(); return false;}
				$('#ProBar').find('div.Transition').css('width','20%');
				return true;
				
			}/*ProgresoCreandoArchivoPaso1*/

			var ProgresoCreandoArchivoPaso2 = function(){
				
				var Paso = 2;
				var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryGeneraXmlaPdf.dbsp', Parametros:'idArchivo='+SalesUp.Variables.idArchivo+'&NombreFile='+SalesUp.Variables.Archivo+'&Paso='+Paso, DataType:'json'});
				json = json.jsonDatos;
				SalesUp.Variables.Archivo = json[0].NombreFile;
				if(!SalesUp.Variables.Archivo){ ErrorDocumento(); return false;}
				$('#ProBar').addClass('color-orange').removeClass('color-silver').find('div.Transition').css('width','45%').addClass('color-sun-flower').removeClass('color-clouds');
				$('#StatusArchivo').html('Reemplazando etiquetas de la plantilla...');
				$('#Gears > .fa').addClass('fa-exchange font-color-orange').removeClass('fa-file-text-o color-color-silver');
				return true;

			}/*ProgresoCreandoArchivoPaso2*/

			var ProgresoCreandoArchivoPaso3 = function(){
				
				var Paso = 3;
				var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryGeneraXmlaPdf.dbsp', Parametros:'idArchivo='+SalesUp.Variables.idArchivo+'&NombreFile='+SalesUp.Variables.Archivo+'&Paso='+Paso, DataType:'json'});
				json = json.jsonDatos;
				SalesUp.Variables.Archivo = json[0].NombreFile;
				if(!SalesUp.Variables.Archivo){ ErrorDocumento(); return false;}
				$('#ProBar').addClass('color-pumpkin').removeClass('color-orange').find('div.Transition').css('width','60%').addClass('color-carrot').removeClass('color-sun-flower');
				$('#StatusArchivo').html('Generando PDF...');
				$('#Gears > .fa').addClass('fa-file-pdf-o font-color-pumpkin').removeClass('fa-exchange font-color-orange');
				return true;

			}/*ProgresoCreandoArchivoPaso3*/

			var ProgresoCreandoArchivoPaso4 = function(){
				
				var Paso = 4;
				var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryGeneraXmlaPdf.dbsp', Parametros:'idArchivo='+SalesUp.Variables.idArchivo+'&NombreFile='+SalesUp.Variables.Archivo+'&Paso='+Paso, DataType:'json'});
				json = json.jsonDatos;
				SalesUp.Variables.Archivo = json[0].NombreFile;
				Peso = json[0].Peso;
				if(!SalesUp.Variables.Archivo){  ErrorDocumento(); return false;}
				$('#ProBar').addClass('color-belize-hole').removeClass('color-pumpkin').find('div.Transition').css('width','95%').addClass('color-peter-river').removeClass('color-carrot');
				$('#StatusArchivo').html('Almacenando en la nube...');
				$('#Gears > .fa').addClass('fa-cloud-upload font-color-belize-hole').removeClass('fa-file-pdf-o font-color-pumpkin');
				return true;

			}/*ProgresoCreandoArchivoPaso4*/

			var ProgresoCreandoArchivoPaso5 = function(){

				var Paso = 5;
				var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryGeneraXmlaPdf.dbsp', Parametros:'idArchivo='+SalesUp.Variables.idArchivo+'&NombreFile='+SalesUp.Variables.Archivo+'&Paso='+Paso+'&Peso='+Peso, DataType:'json'});
				json = json.jsonDatos;
				SalesUp.Variables.ArchivoFisico = json[0].NombreFile;
				SalesUp.Variables.Archivo = json[0].Descripcion;
				if(!SalesUp.Variables.Archivo){ ErrorDocumento(); return false;}
				$('#ProBar').addClass('color-nephritis').removeClass('color-belize-hole').find('div.Transition').css('width','100%').addClass('color-emerald').removeClass('color-peter-river');
				$('#StatusArchivo').html('¡Listo!');
				$('#Gears > .fa').addClass('fa-check font-color-nephritis').removeClass('fa-cloud-upload font-color-belize-hole');
				return true;

			}/*ProgresoCreandoArchivoPaso5*/

			var DocumentoCreado = function(){
				$('#ProgresoArchivo').hide();
				SalesUp.Construye.MuestraAlerta({
					TipoAlerta:'AlertaPregunta', Ancho:'90%', Id:'PrevisualizayCierra',
					Alerta: SalesUp.Variables.AlertaDocumentoCreado, 
					Callback2: SalesUp.Variables.Callback2DocumentoCreado,
					Boton2:'Cerrar',
					Icono2:'',
					Callback1:'SalesUp.Documentos.PrevisualizayCierra()',
					Boton1:'Previsualizar', 
					Icono1:'<i class="fa fa-lg fa-file-pdf-o"></i>'
				});
				
				$('#PrevisualizayCierra .PieModal').addClass('tCen');
				$('#PrevisualizayCierra .PieModal').find('.Btn-flat-Aceptar').before('<a onclick="SalesUp.Documentos.EnviarDocumentoPorCorreo();" class="btnNeutral Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar Html"><i class="fa fa-lg fa-envelope"></i> Enviar por correo</a>');
				
				//Cierra ventana desde editar
				if(SalesUp.Variables.DesdeEditar==1){
					var $Padre = $('#popup-contenedor').closest('.HeadModal');
					var $Overlay = $('#popup-contenedor').closest('.ModalNotification');
					$Padre.addClass('BounceCloseOut');
					setTimeout(function(){ $Overlay.remove(); }, 500);
				}

			}/*DocumentoCreado*/
			
			var ErrorDocumento = function(){

				$('#ProgresoArchivo').hide();
				SalesUp.Construye.MuestraAlerta({
					TipoAlerta:'AlertaPregunta', Ancho:'90%', Id:'PrevisualizayCierra',
					Alerta: SalesUp.Variables.AlertaErrorDocumento,
					Callback1: SalesUp.Variables.Callback1ErrorDocumento,
					Boton1: SalesUp.Variables.Boton1ErrorDocumento,
					Icono1:'<i class="fa fa-lg fa-check"></i>',
					Callback2:'self.parent.tb_cierra()',
					Boton2:'Cerrar', Icono2:'<i class="fa fa-lg fa-times"></i>'
				});
				$('#PrevisualizayCierra .PieModal').addClass('tCen')
				SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryEliminarArchivoMalCreado.dbsp', Parametros:'iArch='+SalesUp.Variables.idArchivo});
			}

			var IniciaProceso = function(){
				self.parent.$('#TB_closeWindowButtonAlt').remove();
				var HtmlCreandoArchivo = '';
				HtmlCreandoArchivo += '<div id="ProgresoArchivo" class="w100">';
				HtmlCreandoArchivo += ' <div class="w100 tCen">';
				HtmlCreandoArchivo += '   <span id="Gears"><i class="fa fa-5x fa-file-text-o color-color-silver"></i></span>';
				HtmlCreandoArchivo += '   <div class="clear"></div>';
				HtmlCreandoArchivo += ' </div><div class="clear"></div>';
				HtmlCreandoArchivo += ' <div id="ProBar" class="pro-bar-container color-silver w70">';
				HtmlCreandoArchivo += '   <div class="Transition pro-bar bar-20 color-clouds" style="width:0%;"></div>';
				HtmlCreandoArchivo += ' </div>';
				HtmlCreandoArchivo += ' <span id="StatusArchivo">Cargando archivo...</span>';
				HtmlCreandoArchivo += '</div>';

				var CssCreandoArchico = '';
				CssCreandoArchico += '<style type="text/css">';
				CssCreandoArchico += '  #ProBar{float:none;margin:0 auto 10px;}#StatusArchivo{text-align:center;display:block;font-size:14px;font-style:italic;font-weight:bold;}';
				CssCreandoArchico += '  #Gears{/*height:115px;*/display:block;margin-bottom:10px;}.pro-bar{border-radius:0;}';
				CssCreandoArchico += '  #Gears>img{height: 100%;}#ProgresoArchivo{margin-top:20px;}';
				CssCreandoArchico += '  #PrevisualizayCierra .ContenedorModal{max-width: 90%;}';
				CssCreandoArchico += '  .PieModal{background-color: #fff;border-radius:0;border-top:0 none;box-shadow:none;}';
				CssCreandoArchico += '  .ContenedorModal{box-shadow:none;top: 25%;}';
				CssCreandoArchico += '  .ModalNotification{background: none repeat scroll 0 0 #fff;}';
				CssCreandoArchico += '  #ProgresoArchivo .color-silver, #ProgresoArchivo .color-orange, #ProgresoArchivo .color-pumpkin, .color-belize-hole, .color-nephritis{background:#fff;}';
				CssCreandoArchico += '  #ProgresoArchivo .color-silver{border-color:#e6332a;}';
				CssCreandoArchico += '  #ProgresoArchivo .color-color-silver{color:#e6332a;}';
				CssCreandoArchico += '  #ProgresoArchivo .color-clouds{background:#e6332a;border-color:#e6332a;}';
				CssCreandoArchico += '  #ProgresoArchivo .color-orange{border-color:#f28e22;}';
				CssCreandoArchico += '  #ProgresoArchivo .font-color-orange{color:#f28e22;}';
				CssCreandoArchico += '  #ProgresoArchivo .color-sun-flower{background: #f28e22;}';
				CssCreandoArchico += '  #ProgresoArchivo .color-pumpkin{border-color:#823c85;}';
				CssCreandoArchico += '  #ProgresoArchivo .color-carrot{background:#823c85;}';
				CssCreandoArchico += '  #ProgresoArchivo .font-color-pumpkin{color:#823c85;}.color-peter-river{background:#2980b9;}.font-color-pumpkin{color:#2980b9;}';
				CssCreandoArchico += '  .color-emerald{background:#2fb22c;}.color-nephritis{border-color:#2fb22c;}.font-color-pumpkin{color:#2fb22c;}';
				CssCreandoArchico += '  #PrevisualizayCierra .ContenedorModal{top:20px;}';
				CssCreandoArchico += '  </style>';

				$('.OverlayBlanco').remove();
				if(SalesUp.Variables.idArchivo>0){
					$('#popup-contenedor').prepend(CssCreandoArchico+HtmlCreandoArchivo);
					self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:160});
					setTimeout(function(){ProgresoCreandoArchivo();}, 10);
					return true;
				}else{
					return false;
				}
			}

			return IniciaProceso();

	}/*IniciaProcesoCrearDocumento*/
  	
  	this.PrevisualizayCierra = function(){
		self.parent.SalesUp.Construye.VerArchivo({
			IdA:SalesUp.Variables.idArchivo, 
			ArchivoFisico:SalesUp.Variables.ArchivoFisico, 
			Archivo:SalesUp.Variables.Archivo, 
			idProspecto:SalesUp.Variables.idProspecto, 
			idOportunidad:SalesUp.Variables.idOportunidad 
		});
		
		var path = self.parent.document.location.pathname;
		if(path == '/privado/clientes.dbsp'){
			self.parent.tb_remove();
			self.parent.ReloadData();
		}else{
			self.parent.tb_cierra();	
		}
	}

	this.EnviarDocumentoPorCorreo = function(){
		document.location.href = '/privado/popup_compose_mail.dbsp?idprostr='+SalesUp.Variables.idProspecto+'&idoportunidad='+SalesUp.Variables.idOportunidad+'&ArchivoFisico='+SalesUp.Variables.ArchivoFisico+'&NombreArchivoFisico='+SalesUp.Variables.Archivo;
	}
}/*CrearDocumentos*/





