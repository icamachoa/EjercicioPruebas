//SalesUp.Variables.idp
Handlebars.registerHelper('archivos', function(anexos, idempresa,archivo) {
  	var out = "";//, data;
  	
  	if(anexos.length > 0 && anexos.Archivo){
  		for (var i = 0; i < anexos.length; i++) {
	  		var anexoActual = anexos[i];
	  		var out = out + '<div id="div1"  class="MultiFile-label"><span><a href="https://fenix.salesup.com.mx/aws/obtieneArchivo.php?idempresa='+idempresa+'&archivo='+anexoActual.Archivo+'" class="textoTema"><div id="div2"><i class="fa fa-cloud-download"></i></div>'+anexoActual.Nombre+'</a></span></div>'
	  	};
  	}

  return out;
});

var clear = '<div class="clear"></div>';

SalesUp.Variables.FormatoFechas = function(){
	$.map($('#datosContacto').find('[data-name="Campo9"],[data-name="Campo10"],[data-name="Campo11"],[data-name="Campo12"],[data-name="Campo9O"],[data-name="Campo10O"],[data-name="Campo11O"],[data-name="Campo12O"]'),function(e){
		if($(e).html() != "")
			$(e).html(SalesUp.Sistema.FormatoFecha($(e).html()))
	}
	);		
}

SalesUp.Variables.visualizar = function(){
	var tkp,tko,tkv,ver, jDatos, esCliente,idp, ido, idv;

	tkp = SalesUp.Variables.tkp;
	tko = SalesUp.Variables.tko;
	tkv = SalesUp.Variables.tkv;

	idp = SalesUp.Variables.idp;
	ido = SalesUp.Variables.ido;
	idv = SalesUp.Variables.idv;

	var estaEnProspecto = false, estaEnOportunidad = false, estaEnCliente = false, estaEnVenta = false;
	var path = document.location.pathname;
		path = SalesUp.Sistema.StrReplace('/privado/','',path);
		path = SalesUp.Sistema.StrReplace('.dbsp','',path);

	(path=='prospectos-visualizar') ? estaEnProspecto = true:'';
	(path=='oportunidades-visualizar') ? estaEnOportunidad = true:'';
	(path=='clientes-visualizar') ? estaEnCliente = true:'';
	(path=='ventas-visualizar') ? estaEnVenta = true:'';
	 SalesUp.Variables.EstoyEnOportunidad=estaEnOportunidad;
	 SalesUp.Variables.EstoyEnVentas=estaEnVenta;
	if((estaEnProspecto)||(estaEnCliente)){
		ver = 'Prospecto'; 
		SalesUp.Variables.ventanaId = 1;
		SalesUp.Variables.ltVentanas = [1];
		var modulo=(estaEnProspecto)? 1 : 4; 
		
		jDatos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosProspectoVisualizar.dbsp', Parametros:{tkp:tkp,idProspecto:idp,modulo:modulo}, DataType:'json' });
		
		jDatos.jsonDatos[0].EstoyEn = 'Prospecto';
		esCliente = jDatos.jsonDatos[0].esCliente;
		if(esCliente==1){
			SalesUp.Variables.ventanaId = 3;
			jDatos.jsonDatos[0].EstoyEn = 'Cliente';
			ver = 'Cliente';
			SalesUp.Variables.ltVentanas = [1,3];
			//SalesUp.Variables.ltVentanas = [3];
		}
	}else if((estaEnOportunidad)||(estaEnVenta)){
		if (estaEnVenta){
			jDatos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosVentasVisualizar.dbsp', Parametros:{tkv:tkv, idVenta:idv}, DataType:'json' });
			SalesUp.Variables.ventanaId = 4;
			SalesUp.Variables.ltVentanas = [1,4];
			SalesUp.Ventas = new Ventas();
			jDatos.jsonDatos[0].EstoyEn = 'Venta';
			ver = 'Venta';
			
			
		}else{
			jDatos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosOportunidadesVisualizar.dbsp', Parametros:{tko:tko, idOportunidad:ido}, DataType:'json' });
			ver = 'Oportunidad'; 
			jDatos.jsonDatos[0].EstoyEn = 'Oportunidad';
			SalesUp.Variables.ventanaId = 2;
			SalesUp.Variables.ltVentanas = [1,2];
		}
	}
	
	var tkp = jDatos.jsonDatos[0].Tkp;
	if(!tkp){
		var noEsTuyo = SalesUp.Variables.noEsTuyo;

		if(!noEsTuyo){
		
			document.location.reload();
		}
		
	}else{
		
	}

	SalesUp.Variables.visualizarInformacion({datos:jDatos});
}


SalesUp.Variables.BotonesAcciones;
SalesUp.Variables.visualizarInformacion = function(Op){
	
	var colorBgLabel = $('.tabla1 tr th').css('backgroundColor');
	var colorLetraLabel = $('.tabla1 tr th').css('color');
	var colorBgInfo  = $('.tabla1 tr td').css('backgroundColor');
	var colorLetraInfo  = $('.tabla1 tr td').css('color');
	var estilo = '<style id="cssVisualizar">';
	if(colorLetraLabel){ estilo += '.InfoLabel{color:'+colorLetraLabel+';background:'+colorBgLabel+';}'; }
	if(colorLetraInfo){ estilo += '#Esperando>.fa,.InfoData.InfoDetalle a{color:'+colorLetraInfo+';}.InfoData.InfoDetalle,.BoxSizing.BoxInfoTextArea.InfoDetalle{color:'+colorLetraInfo+';background:'+colorBgInfo+' !important;}'; }
	estilo += '</style>';
	$('body').append(estilo);

	
	var ventanaId = SalesUp.Variables.ventanaId;
	var ltVentanas = SalesUp.Variables.ltVentanas;
	var jsonDatosProspecto = Op.datos;
	var $datosContacto = $('#datosContacto');
	var BotonesAcciones = $datosContacto.find('.BoxBotones').clone();
	(!SalesUp.Variables.BotonesAcciones) ? SalesUp.Variables.BotonesAcciones = BotonesAcciones : BotonesAcciones = SalesUp.Variables.BotonesAcciones;
	$datosContacto.html('').show();
	SalesUp.Sistema.MuestraEspera($datosContacto,2);
	
	setTimeout(function(){
		var jsonVisualizarDatos = {};
		var templateDatosGenerales = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateDatosVisualizar.dbsp', Almacen:'TemplateDatosVisualizar'});
		var jsonTabs, jsonCampos;

		for (var i = 0; i <= _.size(ltVentanas)-1; i++){
			var jt = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonNombresTab.dbsp', Parametros:'idventana='+ltVentanas[i], DataType:'json'});
			var jc = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCampos.dbsp', Parametros:'idventana='+ltVentanas[i], DataType:'json'});
			
			if(jsonTabs){
				jsonTabs.jsonDatos = _.union(jsonTabs.jsonDatos,jt.jsonDatos);
			}else{
				jsonTabs=jt;
			}

			if(jsonCampos){
				var jv1 = jsonCampos.jsonDatos;
				var jv2 = jc.jsonDatos;

				for(var x=0;x<_.size(jv1);x++){
					jv2 = _.reject(jv2,function(j){
						return jv1[x].IdCampo == j.IdCampo;
					});
				}

				var nj = _.union(jv1,jv2);
				jsonCampos = {};
				jsonCampos.jsonDatos = nj;
			}else{
				jsonCampos=jc;
			}
		}
		
		var templateCampos = '';
		templateCampos += '{{#each jsonCampos}}';
		templateCampos += '  <div class="BoxInfo BoxInfoDetalle {{w}} {{ContenedorMemo}} {{Ocultar}}">';
		templateCampos += '    <label class="BoxSizing InfoLabel Tip4" {{Tipsy}} >{{Campo}}</label>';
		templateCampos += '    {{InfoDatoProspecto this ../jsonDatosProspecto}}';
		templateCampos += '  </div>';
		templateCampos += '{{/each}}';

		jsonVisualizarDatos.jsonDatosProspecto = jsonDatosProspecto.jsonDatos;
		//jsonVisualizarDatos.jsonDatosProspecto[0].EstoyEn = 'Prospectos';
		
		var datosProspectos = SalesUp.Construye.ReemplazaDatos({Template:templateDatosGenerales, Datos:jsonDatosProspecto });
		$datosContacto.append(datosProspectos);
		jsonTabs = jsonTabs.jsonDatos;
		for (var i=0;i<=jsonTabs.length-1;i++){
			var j= jsonTabs[i];
			var idtab = j.IDTAB;
			var tabDefault = j.tabF
			var idVentana = j.IDVENTANA;
			var Tab = j.TAB;
			var Icono = j.ICONO;
			var jsonCamposFiltrado = _.where(jsonCampos.jsonDatos, {IdTab:idtab});
			var jsonCamposFiltradoTambien = _.where(jsonCampos.jsonDatos, {TambienIdTab:idtab});


			if(jsonCamposFiltradoTambien){
				jsonCamposFiltrado = _.union(jsonCamposFiltrado,jsonCamposFiltradoTambien); 
			}
			var pasa = true;

			if((tabDefault=='1')&&(idVentana=='1')){pasa=false;}
			if((tabDefault=='1')&&(idVentana=='2')){pasa=false;}
			if((tabDefault=='1')&&(idVentana=='3')){pasa=false;}
			if((tabDefault=='1')&&(idVentana=='4')){pasa=false;}
			if((tabDefault=='4')&&(idVentana=='3')){pasa=false;}
			if((tabDefault=='3')&&(idVentana=='1')){pasa=false;}
			if((tabDefault=='3')&&(idVentana=='3')){pasa=false;}

			if(pasa){
				jsonVisualizarDatos.jsonCampos = jsonCamposFiltrado;
				
				var HtmlTab = '<div data-idventana="'+idVentana+'" data-tabDefault="'+tabDefault+'" class="BlockTab" id="tab-'+idtab+'">';
				HtmlTab += '<div class="w100 TitDiv"><i class="fa '+Icono+'"></i> '+Tab+'</div>';
				
				HtmlTab += SalesUp.Construye.ReemplazaDatos({Template:templateCampos, Datos:jsonVisualizarDatos });
				HtmlTab += clear+'</div>';
				$datosContacto.append(HtmlTab).append(clear);
			}else{
				var jsonCamposFiltrado = _.where(jsonCampos.jsonDatos, {Naturaleza:2,IdTab:idtab });
				var jsonCamposFiltradoTambien = _.where(jsonCampos.jsonDatos, {Naturaleza:2,TambienIdTab:idtab });
				if(jsonCamposFiltradoTambien){
					jsonCamposFiltrado = _.union(jsonCamposFiltrado,jsonCamposFiltradoTambien); 
				}
				jsonVisualizarDatos.jsonCampos = jsonCamposFiltrado;
				var HtmlTab = SalesUp.Construye.ReemplazaDatos({Template:templateCampos, Datos:jsonVisualizarDatos });
				$('#BoxInfoProspecto').find('div.clear').before(HtmlTab);
			}
		}

		var jCampo = jsonCampos.jsonDatos;
		jCampo = _.where(jCampo,{Naturaleza:1});

		
		jCampo = _.where(jCampo,{Mostrar:'0'});
		
		$vDatoCiudad = $('#vDatoCiudad .InfoLabel');
		var jOculta = _.where(jCampo,{attr_name:"pCiudad"});
		if(_.size(jOculta)){
			$vDatoCiudad.html('Estado');
			jOculta = _.where(jCampo,{attr_name:"pEstado"});
			if(_.size(jOculta)){
				$vDatoCiudad.html('Municipio');
				jOculta = _.where(jCampo,{attr_name:"pMunicipio"});
				if(_.size(jOculta)){
					$('#vDatoCiudad').hide();
				}
			}
		}

		for (var xx = 0; xx < _.size(jCampo); xx++){
			var name = jCampo[xx].attr_name;
			(name=='Comentarios') ? $('#vDatoComentario').hide():'';
			(name=='pPaginaWeb')  ? $('#vDatoPagina').hide():'';
			(name=='Puesto') 	  ? $('#vDatoPuesto').hide():'';
			(name=='Movil') 	  ? $('#vDatoMovil').hide():'';
			(name=='pPais') 	  ? $('#vDatoPais').hide():'';
		}

		var jca,jp,jo,je, catalogo, obj = {jCatalogos:[]}, tw = 'w100';
		var p = 'pCat', e = 'eCat', o = 'oCat';

		var jca = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCatalogosActivos.dbsp', Almacen:'jsonCatalogosActivos', DataType:'json' }).jsonDatos;
		
		jp = _.where(jca,{Tipo:"0", VerProspectos:"1"});
		jo = _.where(jca,{Tipo:"0", VerVentas:"1"});
		je = _.where(jca,{Tipo:"0", VerEmpresa:"1"});

		if (_.size(jp)>1){tw = 'w50'};
		for(var x = 0;x<_.size(jp);x++){
		  var arrAux = {};
		  catalogo = jp[x].Catalogo;
		  if(catalogo.indexOf('/')!=-1){
		    catalogo = catalogo.split('/')[0];
		  }
		  arrAux.Campo       = catalogo;
		  arrAux.attr_name   = p+jp[x].Indice;
		  arrAux.Descripcion = jp[x].Descripcion;
		  arrAux.w           = tw;
		  arrAux.Mostrar     = '1';
		  obj.jCatalogos.push(arrAux);
		}
		
		jsonVisualizarDatos.jsonCampos = obj.jCatalogos;
		var HtmlTab = SalesUp.Construye.ReemplazaDatos({Template:templateCampos, Datos:jsonVisualizarDatos });
		$('#BoxInfoProspecto').find('div.clear').before(HtmlTab);
		 
		obj = {jCatalogos:[]};
		tw = 'w100'
		if (_.size(jo)>1){tw = 'w50'};
		for(var x = 0;x<_.size(jo);x++){
		  var arrAux = {};
		  catalogo = jo[x].Catalogo;
		  if(catalogo.indexOf('/')!=-1){
		    catalogo = catalogo.split('/')[0];
		  }
		  arrAux.Campo       = catalogo;
		  arrAux.attr_name   = o+jo[x].Indice;
		  arrAux.Descripcion = jo[x].Descripcion;
		  arrAux.w           = tw;
		  arrAux.Mostrar     = '1';
		  obj.jCatalogos.push(arrAux);
		}

		jsonVisualizarDatos.jsonCampos = obj.jCatalogos;
		var HtmlTab = SalesUp.Construye.ReemplazaDatos({Template:templateCampos, Datos:jsonVisualizarDatos });
		$('#BoxInfoOportunidad').find('div.clear').before(HtmlTab);


		obj = {jCatalogos:[]};
		tw = 'w100'
		if (_.size(je)>1){tw = 'w50'};
		for(var x = 0;x<_.size(je);x++){
		  var arrAux = {};
		  catalogo = je[x].Catalogo;
		  if(catalogo.indexOf('/')!=-1){
		    catalogo = catalogo.split('/')[0];
		  }
		  arrAux.Campo       = catalogo;
		  arrAux.attr_name   = e+je[x].Indice;
		  arrAux.Descripcion = je[x].Descripcion;
		  arrAux.w           = tw;
		  arrAux.Mostrar     = '1';
		  obj.jCatalogos.push(arrAux);
		}


		var $Empresa = $('[data-tabdefault="4"][data-idventana="1"]');
		var ev = _.size($('a#EmpresasVisualizar'));
		
		if(ev>0){
			
			$('#datoProspecto').removeClass('w50').addClass('w100')
			var ce = $('#datoEmpresa').clone();
			$('#datoEmpresa').remove();
			$Empresa.find('.TitDiv').after(ce);
			var e = $Empresa.clone();
			$Empresa.remove();
			$datosContacto.append(e);
			$Empresa = $('[data-tabdefault="4"][data-idventana="1"]');
			jsonVisualizarDatos.jsonCampos = obj.jCatalogos;
			var HtmlTab = SalesUp.Construye.ReemplazaDatos({Template:templateCampos, Datos:jsonVisualizarDatos });
			$Empresa.find('div.clear').before(HtmlTab);
			
		}else{
			$Empresa.remove();
		}

		$BoxCanalizado = $('#BoxCanalizado[data-esCanalizado="1"]');
		$BoxCanalizado.show();

		$BoxRecibirCorreos = $('#BoxRecibirCorreos[data-recibirCorreos="2"]');
		$BoxRecibirCorreos.show();

		SalesUp.Sistema.IniciaPlugins();
		SalesUp.Sistema.renderTipoCampos();
		SalesUp.Sistema.OcultaEspera();

		var arrcpRepetido = $('.cpRepetido');
		for (var cr = 0; cr <= _.size(arrcpRepetido); cr++){
			$(arrcpRepetido[cr]).closest('.BoxInfoDetalle').remove();
		};

		$datosContacto.append(BotonesAcciones).append(clear).show();
		var arrTabs = $('[data-tabdefault]');
		for (var i = arrTabs.length - 1; i >= 0; i--) {
			var $tab = $(arrTabs[i]);
			if(_.size($tab.find('.BoxInfoDetalle'))==0){$tab.hide();}
		};
		$('#retro_visual').remove();
		$('.fa-facebook-square, .fa-linkedin-square, .fa-twitter-square, .fa-skype, .fa-google-plus-square').removeClass('fa-li');
		
		var arrBtn = $('.BoxBotones').find('.Btn-small');
		for(var i=0;i<_.size(arrBtn);i++){ $(arrBtn[i]).removeClass('Btn-small').addClass('Btn-tiny Btn-tiny-min'); }
		//$('.ocultarEsto').removeClass('ocultarEsto');
		$('a[href*="vcard"]').remove();

		$('.BoxInfo.BoxInfoDetalle.BoxInfoTextArea').find('.InfoDetalle').removeClass('Ellipsis');

		var $boxEtiq = $('.BoxInfoDetalle .etiquetas.Html');
		var $p = $boxEtiq.closest('.InfoDetalle');
		var $b = $boxEtiq.closest('.BoxInfoDetalle');
		$p.css('height','auto').removeClass('Ellipsis');
		$b.css('height','auto');

		$('.ocultarEsto').slideDown();
		SalesUp.Sistema.UltimaVisita();
		if(SalesUp.Variables.EstoyEnOportunidad || SalesUp.Variables.EstoyEnVentas){SalesUp.Variables.EstablecerSimboloMoneda();}
		SalesUp.Variables.FormatoFechas();
	}, 200);

	
}/*DatosProspecto*/

var Ventas = function(){
	var datos = {};
	var NombreCampos 	= '';
	var TemplateDatos 	= '';

	var _CargaCobrosProgramados = function(){
		datos			= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCobrosPendientes.dbsp', Parametros:'TKV='+SalesUp.Variables.tkv,DataType:'json'});
		NombreCampos	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateTablaCobros.dbsp', Parametros:'thead=1', Div:0});
		TemplateDatos	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateTablaCobros.dbsp', Parametros:'thead=0', Div:0});

		for (var i = 0; i < datos.jsonDatos.length; i++) {
			var datoActual 				= datos.jsonDatos[i];

			if(!_.isUndefined(datoActual.CONFIGURACION) && !_.isNull(datoActual.CONFIGURACION) && datoActual.CONFIGURACION != ''){
				var arrayConfigCobro		= datoActual.CONFIGURACION.substring(0, datoActual.CONFIGURACION.length-1).split('|');
			}else{
				var arrayConfigCobro		= [];
			}

			datos.jsonDatos[i].config 	= [];

			for (var j = 0; j < arrayConfigCobro.length; j++) {
				datos.jsonDatos[i].config.push(SalesUp.Sistema.Encript({cadena:arrayConfigCobro[j],tipo:'decode'}));
			};

			if(!_.isUndefined(datoActual.CONFIGURACION) && !_.isNull(datoActual.ENVIOS) && datoActual.ENVIOS != ''){
				var arrayEnvios		= datoActual.ENVIOS.split('|');
			}else{
				var arrayEnvios		= [];
			}

			datos.jsonDatos[i].envios 	= [];

			for (var j = 0; j < arrayEnvios.length; j++) {
				datos.jsonDatos[i].envios.push(arrayEnvios[j]);
			};
		};
		
		$('#Tabs.TabsCorreos').tabs();
	};

	var _ObtieneCorreos = function(_tipo){
		var primerTab = '';

		if(_tipo == 1){
			var placeholderMsj 	= 'Días antes...';
			var idcomplemento 	= 'previos';
			var msjJson			= ' días antes';
			var destino 		= '#CorreosPrevios';
			var idtabla 		= 'TablaCorreosPrevios';
			primerTab			= 'primerTab';
		}else if(_tipo == 2){
			var idcomplemento 	= 'momento';
			var destino 		= '#CorreosAlCobro';
			var idtabla 		= 'CorreosAlcobro';
		}else if(_tipo == 3){
			var placeholderMsj 	= 'Días despues...';
			var idcomplemento 	= 'posterior';
			var msjJson			= ' días despues';
			var destino 		= '#CorreosPosterior';
			var idtabla 		= 'TablaCorreosPosteriores';
		}

		var datosCorreos = [];

		$('#totalCobros').val(datos.jsonDatos.length);

		for (var i = 0; i < datos.jsonDatos.length; i++) {
			var datoActual 	= datos.jsonDatos[i];
			var input2		= '<input type="hidden" value="0" id="envioCobro'+datoActual.IDVENTACOBRO+'tipo'+_tipo+'"/>'
			
			datoActual.PLANTILLA = '<input type="text" data-cobro="'+datoActual.IDVENTACOBRO+'" data-tipo="'+_tipo+'" placeholder="Selecciona plantilla..." id="Input'+datoActual.IDVENTACOBRO+'" class="inputPlantillasCorreos tipo'+_tipo+' plantillaCorreoInput'+idcomplemento+' plantillasProgramados'+datoActual.IDVENTACOBRO+' '+primerTab+'"/>'+input2;
			datoActual.FECHAPROXIMOENVIO = (_tipo == 2) ? '<span>Al momento</span>' : '<input onchange="SalesUp.Ventas.RevisaPlantilla({elemento:this});" data-tipo="'+_tipo+'" data-cobro="'+datoActual.IDVENTACOBRO+'" type="text" placeholder="'+placeholderMsj+'" id="InputDias'+datoActual.IDVENTACOBRO+'" class="tipo'+_tipo+' diasInput'+idcomplemento+' diasProgramados'+datoActual.IDVENTACOBRO+'"/>';
			datoActual.TIPO = _tipo;
			datosCorreos.push(datoActual);
		};

		SalesUp.Construye.ConstruyeTabla(NombreCampos, TemplateDatos, datosCorreos, {Destino:destino, Id:idtabla});

		var jsonPlantillas = SalesUp.Sistema.CargaDatos({ Link:'/privado/Modelo/jsonPlantillas.dbsp', DataType:'json' });

		var grupos = [ {GRUPO: 'PROPIAS'}, {GRUPO: 'COMPARTIDAS'}];
		var orden = ['PROPIAS', 'COMPARTIDAS'];

		$('.plantillaCorreoInput'+idcomplemento).selectize({
			render:{item:function(data){
				return '<div class="Ellipsis w90">'+data.DESCRIPCION+'</div>'
			}},
			maxItems:1,
			openOnFocus:true,
		    valueField:'IDPLANTILLA', 
		    labelField:'DESCRIPCION',
		    searchField:['DESCRIPCION'],
		    options:jsonPlantillas.jsonDatos,
		    optgroups:grupos,
			optgroupField: 'GRUPO', optgroupLabelField: 'GRUPO',
			optgroupValueField: 'GRUPO', optgroupOrder: orden//,
		});

		if(_tipo != 2){
			var arrayDias = [];

			for (var i = 1; i <= 30; i++) {
				var jsonDias = {};
				jsonDias.dias = i;
				jsonDias.diasenvio = i+msjJson;

				arrayDias.push(jsonDias);
			};

			$('.diasInput'+idcomplemento).selectize({
				render:{item:function(data){
					return '<div class="Ellipsis w90">'+data.diasenvio+'</div>'
				}},
				maxItems:1,
				openOnFocus:true,
			    valueField:'dias', 
			    labelField:'diasenvio',
			    searchField:['dias'],
			    options:arrayDias
			});
		}
	}

	var _LlenaValores = function(){
		var arrayCobros = $('input.primerTab');
		var arrayCobroActual = [];

		for (var i = 0; i < arrayCobros.length; i++) {
			var $cobroActual 	= $(arrayCobros[i]);
			var cobro 			= parseInt($cobroActual.attr('data-cobro'));
			arrayCobroActual.push(_.where(datos.jsonDatos,{IDVENTACOBRO:cobro})[0]);
		};

		for (var i = 0; i < arrayCobroActual.length; i++) {
			var cobroActual 		= arrayCobroActual[i];
			var idventacobro 		= cobroActual.IDVENTACOBRO;
			var arrayConfigActual	= cobroActual.config;
			var arrayEnvios 		= cobroActual.envios;

			for (var j = 0; j < arrayConfigActual.length; j++) {
				var confActual 	= arrayConfigActual[j]
				var envioActual = arrayEnvios[j];

				if(SalesUp.Valida.esJson(confActual)){
					var objConfig = JSON.parse(confActual);

					$('#Input'+idventacobro+'.tipo'+objConfig.tipo)[0].selectize.setValue(objConfig.valorPlantilla);
					
					if(objConfig.dias && objConfig.dias != ''){
						$('#InputDias'+idventacobro+'.tipo'+objConfig.tipo)[0].selectize.setValue(objConfig.dias);
					}

					if(envioActual == 1){
						$('#Input'+idventacobro+'.tipo'+objConfig.tipo)[0].selectize.disable();
						$('#InputDias'+idventacobro+'.tipo'+objConfig.tipo)[0].selectize.disable();
						$('.cobro'+idventacobro+'tipo'+objConfig.tipo).hide();
					}

					$('#envioCobro'+idventacobro+'tipo'+objConfig.tipo).val(envioActual);
				}
			};
		};
	};

	var _MueveCursor = function(Op){
		var move = Op.m;
		
		if(move==='down'){
			var $activo 		= $('.ui-tabs-panel:visible');
			var valorPlantilla 	= $activo.find('input.inputPlantillasCorreos').eq(0).val();
			var arrayInputs 	= $activo.find('input.inputPlantillasCorreos');

			for (var i = 0; i < arrayInputs.length; i++) {
				var $inputActual = $(arrayInputs[i]);
				$inputActual[0].selectize.setValue(valorPlantilla);
			};
		}
	}/* /MueveCursor*/

	var htmlEmail 	= '<div class="w100">'+
						        '<div class="w10">De</div>'+
						        '<div class="w90"><span><b>{{NOMBRE_USUARIO}}</b> <i>[{{CORREOUSUARIO}}]</i></span></div>'+
						    '</div>'+
						    '<div class="w100">'+
						        '<div class="w10">Para</div>'+
						        '<div class="w90"><span><b>{{NOMBRE_CONTACTO}}</b> <i>[{{CORREOCONTACTO}}]</i></span></div>'+
						    '</div>'+
						    '<div class="w100">'+
						        '<div class="w10">Asunto</div>'+
						        '<div class="w90"><span>{{ASUNTO}}</span></div>'+
						    '</div>'+
						    '<div class="w100">'+
						        '<div class="w10">Adjuntos</div>'+
						        '<div class="w90 LtAdjuntos" >'+
						        	'{{#archivos DATOSANEXOS IDEMPRESA}}{{archivo}}{{/archivos}}'+
						        '</div>'+
						    '</div>'+
						    '<div class="clear"></div>'+
						    '<div class="CuerpoCorreo w100 Html" id="CuerpoCorreo">{{CUERPO}}</div>';

	var _verPlantilla = function(_obj){
		var valorPlantilla 	= _obj.idplantilla;
		var idventacobro 	= _obj.idventacobro;
		var datosPlantilla	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonObtienePlantilla.dbsp', Parametros:'idplantilla='+valorPlantilla+'&idventacobro='+idventacobro,DataType:'json'}).jsonDatos[0];
		var datosAnexos		= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonObtieneAnexos.dbsp', Parametros:'idpl='+valorPlantilla,DataType:'json'}).jsonDatos;

		datosPlantilla.DATOSANEXOS = datosAnexos;

		var datosEmail = SalesUp.Construye.ReemplazaDatos({Template:htmlEmail, Datos:datosPlantilla });

		SalesUp.Construye.MuestraAlerta({
	      	TipoAlerta:'AlertaModal',
            Alerta:datosEmail,
            BotonOk:'Cerrar',
            Id:'previewEmail',
            IconoOk:'<i class="fa fa-times"></i>',
            Ancho:'664px',
            Alto: '491px',
	        Titulo:'Visualizar plantilla'
	    });

	    SalesUp.Sistema.IniciaPlugins();
	};

	this.VerPlantilla = function(_idplantilla, _idventacobro){
		_verPlantilla({idplantilla:_idplantilla,idventacobro:_idventacobro});
	};

	this.AbrePopUpCorreosProgramados = function(){
		SalesUp.Construye.MuestraPopUp({
			alto:'300px', ancho:'900px',
			titulo:'Correos programados',
			fuente:'/privado/popup-programar-correos.dbsp', callback:''
		});

		setTimeout(function(){
			_CargaCobrosProgramados();
			
			for (var i = 1; i <= 3; i++) {
				_ObtieneCorreos(i);
			};

			_LlenaValores();

			jwerty.key('ctrl+down', function(){ 
			  _MueveCursor({m:'down'});
			});
		}, 100);
	};

	this.VisualizarEmail = function(_valor,_tipo){
		var valorPlantilla 	= $('#Input'+_valor+'.tipo'+_tipo).val();
		var idventacobro 	= $('#Input'+_valor+'.tipo'+_tipo).attr('data-cobro');

		if(valorPlantilla == ''){
			SalesUp.Construye.MuestraMsj({tMsg:3,Msg:'Seleccione una plantilla para poder visualizar',Destino:'#popup-contenedor'});
		}else{
			var datosPlantilla	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonObtienePlantilla.dbsp', Parametros:'idplantilla='+valorPlantilla+'&idventacobro='+idventacobro,DataType:'json'}).jsonDatos[0];
			var datosAnexos		= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonObtieneAnexos.dbsp', Parametros:'idpl='+valorPlantilla,DataType:'json'}).jsonDatos;

			datosPlantilla.DATOSANEXOS = datosAnexos;

			var datosEmail = SalesUp.Construye.ReemplazaDatos({Template:htmlEmail, Datos:datosPlantilla });

			SalesUp.Construye.MuestraAlerta({
		      	TipoAlerta:'AlertaModal',
	            Alerta:datosEmail,
	            BotonOk:'Cerrar',
	            Id:'previewEmail',
	            IconoOk:'<i class="fa fa-times"></i>',
	            Ancho:'664px',
	            Alto: '491px',
	            Titulo:'Visualizar plantilla'
		    });

		    SalesUp.Sistema.IniciaPlugins();
		}
	};

	this.ActivaSelectDias = function(idventacobro){
		$('#diasEnvio' + idventacobro).html('');
		$('#diasEnvio' + idventacobro).append('<select id="selectDiasEnvio'+idventacobro+'"><option value="">Selecciona los días...</option></select>');
	};

	this.GuardaConfig = function(){
		var arrayCobros	= $('input.primerTab');
		var arrayInputs = $('.inputPlantillasCorreos');
		var cont 		= 0;

		for (var i = 0; i < arrayInputs.length; i++) {
			var $configActual 	= $(arrayInputs[i]);
			var valorPlantilla	= $configActual.val();
			var tipoConfig		= $configActual.attr('data-tipo');
			var cobro 			= $configActual.attr('data-cobro');
			var dia 			= $('#InputDias'+cobro+'.tipo'+tipoConfig).val();

			if(valorPlantilla != '' && dia == '' && tipoConfig != 2){
				cont++;
			}
		}

		if(cont == 0){
			SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});

			setTimeout(function(){
				for (var k = 0; k < arrayCobros.length; k++) {
					var $cobroActual 	= $(arrayCobros[k]);
					var cobro 			= $cobroActual.attr('data-cobro');
					var configCobro		= {};
					configCobro.config 	= '';
					configCobro.envios 	= '';
					configCobro.idcobro = cobro;

					var arrayConfig		= $('input.plantillasProgramados'+cobro);
					var arrayDias		= $('input.diasProgramados'+cobro);

					for (var i = 0; i < arrayConfig.length; i++) {
						var $configActual 	= $(arrayConfig[i]);
						var valorPlantilla	= $configActual.val();
						var tipoConfig		= $configActual.attr('data-tipo');
						var dia 			= $('#InputDias'+cobro+'.tipo'+tipoConfig).val();
						var envio 			= $('#envioCobro'+cobro+'tipo'+tipoConfig).val();

						var objConfig		= {};

						if(valorPlantilla != ''){
							objConfig.valorPlantilla 	= valorPlantilla;
							objConfig.tipo 				= tipoConfig;
							objConfig.dias 				= dia;
							configCobro.config 			= configCobro.config + SalesUp.Sistema.Encript({'cadena':JSON.stringify(objConfig),'tipo':'encode'}) + '|';
						}else{
							configCobro.config =  configCobro.config + '|';
						}

						configCobro.envios = configCobro.envios + envio + '|';
					};

					configCobro.envios = configCobro.envios.substring(0, configCobro.envios.length-1);
					Recarga();
					SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryGuardaCobro.dbsp', Parametros:'json='+escape(JSON.stringify(configCobro))});

					setTimeout(function(){
						SalesUp.Construye.CierraPopUp({t:$('#frmCorreosProgramados')});
						SalesUp.Sistema.OcultarOverlay();
						SalesUp.Sistema.OcultaEspera();
					}, 100);
				};
			}, 100);
		}else{
			SalesUp.Construye.MuestraMsj({tMsg:3,Msg:'Seleccione los días en los que se enviaran las plantillas seleccionadas.',Destino:'#popup-contenedor'});
		}
	};

	this.RevisaPlantilla = function(_obj){
		var $elemento 		= $(_obj.elemento);
		var idcobro 		= $elemento.attr('data-cobro');
		var tipo 			= $elemento.attr('data-tipo');
		var valorPlantilla 	= $('#Input'+idcobro+'.tipo'+tipo).val();
		
		if(valorPlantilla == ''){
			SalesUp.Construye.MuestraMsj({tMsg:3,Msg:'Seleccione una plantilla para poder seleccionar los días',Destino:'#popup-contenedor'});
			$('#InputDias'+idcobro+'.tipo'+tipo)[0].selectize.clear();
		}
	};

	this.EliminaConfiguracion = function(_valor,_tipo){
		if(_tipo != 2){
			$('#InputDias'+_valor+'.tipo'+_tipo)[0].selectize.clear();
		}

		$('#Input'+_valor+'.tipo'+_tipo)[0].selectize.clear();
	};

	this.VisualizarEmailCobro = function(_obj){
		var _configuracion = _obj.configuracion;
		var idventacobro = _obj.idventacobro;
		var arrayConfig = _configuracion.substring(0, _configuracion.length-1).split('|');
		var totalConfig = 0;
		var arrayJsonConfig = [];

		for (var i = 0; i < arrayConfig.length; i++) {
			var configActual = arrayConfig[i];
			var jsonConfig = '';

			if(configActual != ''){
				jsonConfig = SalesUp.Sistema.Encript({cadena:configActual,tipo:'decode'});
				totalConfig++;
			}

			if(SalesUp.Valida.esJson(jsonConfig)){
				arrayJsonConfig.push(JSON.parse(jsonConfig));
			}
		};

		if(totalConfig == 1){
			var datosPlantilla 	= {};
			var idplantilla 	= arrayJsonConfig[0].valorPlantilla;
			
			datosPlantilla.idventacobro = idventacobro;
			datosPlantilla.idplantilla 	= idplantilla;

			_verPlantilla(datosPlantilla);
		}else if(totalConfig > 1){
			var $t 			= $('.menu'+idventacobro);
			var Acciones 	= '';
			
			for (var i = 0; i < arrayJsonConfig.length; i++) {
				var objActual 	= arrayJsonConfig[i];
				var msj 		= '';
				var idplantilla = objActual.valorPlantilla;

				if(objActual.tipo == 1){
					msj = objActual.dias + ' días antes del cobro.';
				}else if(objActual.tipo == 3){
					msj = objActual.dias + ' días después del cobro.';
				}else{
					msj = 'Al momento del cobro.'
				}

				Acciones += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Ventas.VerPlantilla('+idplantilla+','+idventacobro+');"><i class="fa fa-lg fa-envelope"></i> '+msj+'</span>'
			}

			SalesUp.Construye.popOver({Elemento:$t, PopOverLugar:'left', Contenido:Acciones, Clases:"PopOverAcciones"});
		}
	}
	
	this.VisualizarEmailCobroN = function(_obj){
		var _configuracion = _obj.configuracion;
		var idventacobro = _obj.idventacobro;
		var arrayConfig = _configuracion.substring(0, _configuracion.length-1).split('|');
		var totalConfig = 0;
		var arrayJsonConfig = [];

		for (var i = 0; i < arrayConfig.length; i++) {
			var configActual = arrayConfig[i];
			var jsonConfig = '';

			if(configActual != ''){
				jsonConfig = SalesUp.Sistema.Encript({cadena:configActual,tipo:'decode'});
				totalConfig++;
			}

			if(SalesUp.Valida.esJson(jsonConfig)){
				arrayJsonConfig.push(JSON.parse(jsonConfig));
			}
		};

		if(totalConfig == 1){
			var datosPlantilla 	= {};
			var idplantilla 	= arrayJsonConfig[0].valorPlantilla;
			
			datosPlantilla.idventacobro = idventacobro;
			datosPlantilla.idplantilla 	= idplantilla;

			_verPlantilla(datosPlantilla);
		}else if(totalConfig > 1){
			var $t 			= $(SalesUp.Variables.thisAccionRow);
			var Acciones 	= '';
			
			for (var i = 0; i < arrayJsonConfig.length; i++) {
				var objActual 	= arrayJsonConfig[i];
				var msj 		= '';
				var idplantilla = objActual.valorPlantilla;

				if(objActual.tipo == 1){
					msj = objActual.dias + ' días antes del cobro.';
				}else if(objActual.tipo == 3){
					msj = objActual.dias + ' días después del cobro.';
				}else{
					msj = 'Al momento del cobro.'
				}

				Acciones += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Ventas.VerPlantilla('+idplantilla+','+idventacobro+');"><i class="fa fa-lg fa-envelope"></i> '+msj+'</span>'
			}

			SalesUp.Construye.popOver({Elemento:$t, PopOverLugar:'left', Contenido:Acciones, Clases:"PopOverAcciones"});
		}
	}
}

$('.inbox').live('click',function(){
	var _idInbox = $(this).attr('id');

	$("#resultado").html(" ");
          
      var htmlEmail   = '<link type="text/css" rel="stylesheet" href="/estilos/inbox.css" /><div class="w100">'+
                '<div class="w10">De</div>'+
                '<div class="w90"><span><b>{{FROMNAME}}</b> <i>[{{FROMADDRESS}}]</i></span></div>'+
            '</div>'+
            '<div class="w100">'+
                '<div class="w10">Para</div>'+
                '<div class="w90"><span><b>{{NOMUSUARIO}} {{APEUSUARIO}}</b> <i>[{{EMAIL}}]</i></span></div>'+
            '</div>'+
            '<div class="w100">'+
                '<div class="w10">Asunto</div>'+
                '<div class="w90"><span>{{SUBJECT}}</span></div>'+
            '</div>'+
            '<div id="inboxMailAdjuntos" class="w100"><div class="w100 adjuntosInbox">'+
                '<div class="w10">Adjuntos</div>'+
                '<div class="w90 LtAdjuntos" >'+
                  '{{#each Adjuntos}}{{mailAdjuntos ../IDINBOX}}{{/each}}'+
                '</div>'+
            '</div>'+
            '<div class="clear"></div></div></br>'+
            '<div class="CuerpoCorreo w100 Html" id="CuerpoCorreo">{{BODY}}</div>';

      var datosPlantilla  = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonObtieneInbox.dbsp', Parametros:'idinbox='+_idInbox,DataType:'json'}).jsonDatos[0];
      
      if(SalesUp.Valida.esJson(datosPlantilla.ATTACHMENTS)){
        datosPlantilla.Adjuntos = JSON.parse(datosPlantilla.ATTACHMENTS);
      }else{
        datosPlantilla.Adjuntos = [];
      }

      var datosEmail = SalesUp.Construye.ReemplazaDatos({Template:htmlEmail, Datos:datosPlantilla });

      SalesUp.Construye.MuestraAlerta({
            TipoAlerta:'AlertaModal',
              Alerta:datosEmail,
              BotonOk:'Cerrar',
              Id:'previewEmail',
              IconoOk:'<i class="fa fa-times"></i>',
              Ancho:'864px',
              Alto: '491px',
              Titulo:'Correo recibido'
        });

      setTimeout(function(){SalesUp.Sistema.IniciaPlugins();}, 100);

      if(datosPlantilla.Adjuntos.length == 0){
        $('.adjuntosInbox').hide();
      }else{
        $('.adjuntosInbox').show();
      }
});


function CrearPlantilla(){
    setTimeout(function() {
        document.location = '/privado/sistema_plantillas_correos.dbsp';
    }, 1000);
}

SalesUp.Variables.EstablecerSimboloMoneda=function(){
var $Elemento=$('.monto');
var Numero=$Elemento.html();
var Simbolo=$Elemento.attr('data-simbolo');
var Unicode=$Elemento.attr('data-unicode');
var Monto=0;
if(Number(Unicode)===8364){
  Simbolo=' &#8364 ';
  Monto=Simbolo+Numero;
  $('.monto').html(Monto);
  var html=$Elemento.html();
  Simbolo=html.substring(1,2);
  Monto=html.substring(3);
 }
 
 Monto=SalesUp.Sistema.moneda({numero:Numero, moneda:Simbolo});
 $('.monto').html(Monto);
}

SalesUp.Variables.AlertaEliminaRecordatorio = function(Op){
  var $Elemento = $(Op.t);
  var tkRec = $Elemento.attr('data-tkrec');
  
  SalesUp.Construye.MuestraAlerta({
    TipoAlerta:'AlertaPregunta',
    Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> ¿Desea eliminar el recordatorio?',
    Ancho:'400px',
    Id:'alertaEliminaRecordatorio'
  });

  var $alertaBotones = $('#alertaEliminaRecordatorio .PieModal');
  $alertaBotones.html('');
  $alertaBotones.append('<a class="btnNegativo Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Cancelar" onclick="SalesUp.Construye.CierraAlerta({Elemento:this});"><i class="fa fa-times"></i> Cancelar</a>');
  $alertaBotones.append('<a class="btnAccion Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" onclick="SalesUp.Variables.EliminaRecordatorio({tk:\''+tkRec+'\',Elemento:this});"><i class="fa fa-trash"></i> Elminar</a>');
}

SalesUp.Variables.EliminaRecordatorio = function(Obj){
  SalesUp.Construye.CierraAlerta({Elemento:Obj.Elemento});

  var tkRec = Obj.tk;

  SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/eliminarRecordatorio.dbsp',Parametros:'TKREC='+tkRec+''});
  if(self.parent.ReloadData){self.parent.ReloadData();};
}

SalesUp.Variables.visualizar();






