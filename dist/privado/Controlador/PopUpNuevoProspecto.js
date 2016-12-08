SalesUp.Sistema.MuestraEspera('',4);	

var idventana = 1;
var tabCanalizaciones = '<li id="TabCanalizaciones" data-spmodulo="5" class="spModulo"><a href="#BoxCanalizaciones" onclick="SalesUp.Variables.OportunidadesTemplates();"><i class="fa fa-star"></i> Oportunidades</a></li>'
var BoxCatalogosActivos = '<div id="BoxCatalogosActivos"></div><div class="clear"></div>';
SalesUp.Variables.jsonConfiguracionCampos;
var $SelectizeIndustria, $SelectizeFase, $SelectizeOrigen, $SelectizeCompanias, $SelectizeGrupos, $SelectizeTitulo, $SelectizeMunicipioProspecto, $SelectizeMunicipioEmpresa, $EtiquetasProspecto;

function AgregaryNuevo(){
	$('#AgregarOtro').val(1);
	SalesUp.Variables.EnviarFormaAvanzado();	
}

SalesUp.Variables.ConstruyeTabs = function(){
	var esCliente = SalesUp.Variables.EsCliente;
	var AlmacenTabs = 'jsonTabsProspectos';
	if(esCliente=='1'){AlmacenTabs = 'jsonTabsClientes';}
	
	var jsonTabs = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonNombresTab.dbsp', Parametros:'idventana='+idventana, DataType:'json' , Almacen:AlmacenTabs });
	var tabs = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateTabs.dbsp', Almacen:'TemplateTabs'});

	SalesUp.Variables.jsonTabs = jsonTabs;
	
	var esAvanzado = SalesUp.Variables.ProspectoAvanzado;
	
	if(esAvanzado){
		var Compilado = SalesUp.Construye.ReemplazaDatos({Datos:jsonTabs, Template:tabs});
		
		$('#contenedorTabs').html(Compilado);
		
		/*Modulos, 2-canalizacion, 5 - oportunidades rapidas*/
		if (SalesUp.Sistema.EstaActivoModulo({Modulo:5})){
			$('#Tabs ul').append(tabCanalizaciones);
			$('#Tabs').append(SalesUp.Variables.ContenidoCanalizacion);
		}

		if (SalesUp.Sistema.EstaActivoModulo({Modulo:2})){
			$('#TabCanalizaciones a').html('<i class="fa fa-globe"></i> Canalización');
		}

		$('#Tabs').tabs();
		SalesUp.Sistema.ModulosActivos();
	}
	
}/*ConstruyeTabs*/

SalesUp.Variables.ConstruyeCampos = function(){
	var $DatosFijos = $('#DatosFijos');
	var tmpCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateFormulario.dbsp', Almacen:'TemplateFormulario'});
	var esCliente = SalesUp.Variables.EsCliente;
	var AlmacenCampos = 'jsonCamposProspectos';
	if(esCliente=='1'){AlmacenCampos = 'jsonCamposClientes';}
	var jsonCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCampos.dbsp', Parametros:'idventana='+idventana, DataType:'json', Almacen:AlmacenCampos});
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
		var Seleccione = [{}];
		Seleccione[0].value = '';
		Seleccione[0].Opcion = '(... Seleccione una opción ...)';
		
		if(j.attr_maxLength=='0'){j.attr_maxLength='';}

		if(j.esSelect == '1'){
			Opciones = SalesUp.Variables.ObtieneOpciones({Naturaleza:j.Naturaleza, Id:j.attr_id, Indice:j.attr_data_Indice, IdCampo:j.IdCampo});
			if(Opciones){ 
				j.Opciones = Opciones; 

				/*
				if(j.TipoRestriccion==2){
					j.Opciones = _.union(Seleccione, j.Opciones);
				}
				*/
				j.Opciones = _.union(Seleccione, j.Opciones);
				
				if((j.attr_name=='pMunicipio')||(j.attr_name=='Titulo')){
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
			/*
			if(((j.esTemperatura=='1')||(j.esSelectInput=='1'))&&(j.TipoRestriccion==2)){
				j.Opciones = _.union(Seleccione, j.Opciones);
			}
			*/
			if(((j.esTemperatura=='1')||(j.esSelectInput=='1'))){
				j.Opciones = _.union(Seleccione, j.Opciones);
			}
		}
	}

	jsonCampos.jsonDatos = infoJson;
	var esAvanzado = SalesUp.Variables.ProspectoAvanzado;
	if(esAvanzado){
		for (var i = 0; i <= jsonTabs.length - 1; i++){
			var idtab = jsonTabs[i].IDTAB;
			
			var jsonCamposFiltrado1 = _.where(jsonCampos.jsonDatos, {IdTab:idtab});
			var jsonCamposFiltrado2 = _.where(jsonCampos.jsonDatos, {TambienIdTab:idtab});
			var jsonCamposFiltrado = (jsonCamposFiltrado2) ? _.union(jsonCamposFiltrado1,jsonCamposFiltrado2) : jsonCamposFiltrado1;
			jsonCamposFiltrado = _.sortBy(jsonCamposFiltrado,'Orden');
			jsonCamposFiltrado.jsonDatos = jsonCamposFiltrado;
			
			var Compilado = SalesUp.Construye.ReemplazaDatos({Datos:jsonCamposFiltrado, Template:tmpCampos});
			
			$('#divTab-'+idtab).html(Compilado).append('<div class="clear"></div>');
		}

		var $BoxNombre = $('#Nombre').closest('.BoxInfo');
		var $BoxApellidos = $('#Apellidos').closest('.BoxInfo');
		var $BoxEmpresa = $('#Empresa').closest('.BoxInfo');
		
		$DatosFijos.prepend($BoxEmpresa.clone()).prepend($BoxApellidos.clone()).prepend($BoxNombre.clone());
		$DatosFijos.show();
		$BoxNombre.remove();
		$BoxApellidos.remove();
		$BoxEmpresa.remove();
		$('#BtnAvanzado').hide();
		SalesUp.Variables.CargaInformacionSimple();
		self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:560, Ancho:750});
		SalesUp.Variables.CargaCatalogosActivos();
		setTimeout(function(){OcultarOverlay();}, 300);
	}else{
		$DatosFijos.hide();

		for (var i = 0; i < jsonCampos.jsonDatos.length; i++){
			var TipoRestriccion = jsonCampos.jsonDatos[i].TipoRestriccion;
			if ((TipoRestriccion!=1)&&(TipoRestriccion!=2)){
				jsonCampos.jsonDatos[i].Mostrar = '0';
			}
		}

		var idTabQuitar = _.where(jsonTabs,{tabF:'4'})[0].IDTAB;
		
		jsonCampos.jsonDatos = _.reject(jsonCampos, function(j){ return j.IdTab == idTabQuitar});
		
		var Compilado = SalesUp.Construye.ReemplazaDatos({Datos:jsonCampos, Template:tmpCampos});
			
		$('#contenedorTabs').html(Compilado).append('<div class="clear"></div>');

		setTimeout(function(){
			var Alto = $('#contenedorTabs').height()+70;
			self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:Alto, Ancho:750});
		}, 500);
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

	$('#pPais, #Pais').val(paisDefault);
	$('#pEstado, #Estado').val(edoDefault);
	

	/*INICIAAAAA*/
	SalesUp.Variables.Asterisco();
	SalesUp.Variables.AgregarControlPaisEstado();
	$('#Correo').attr('type','email').attr('onblur','SalesUp.Variables.ValidaEmail({t:this,v:value});');
	//SalesUp.Variables.ValidaNumeros();
	SalesUp.Variables.Quitar33y34();
	SalesUp.Variables.onblurInfoUnico();
	SalesUp.Variables.Pruebas();
	
}/*SalesUp.Variables.ConstruyeCampos*/


SalesUp.Variables.CargaInformacionSimple = function(){
	var arrCamposSimples = SalesUp.Variables.arrCamposSimples;
	
	for(key in arrCamposSimples){
		var a = arrCamposSimples[key];
		for(name in a){
			if(!name.indexOf('radio-')==0){
				var $Elemento = $('[name="'+name+'"]');
		    if(_.size($Elemento)){
				$Elemento.val(a[name]);
				if(name=='Empresa'){
					SalesUp.Variables.EmpresaSeleccionada = a[name];
				}
		    }	
			}
		}
	}
}/*CargaInformacionSimple*/

SalesUp.Variables.Asterisco = function(){
	var arrObligatorios = $('.InfoObligatorio');
	for (var i = 0; i <= arrObligatorios.length - 1; i++){
		$(arrObligatorios[i]).closest('.BoxInfo').find('.InfoLabel').append('*');
	};
}/*Asterisco*/

SalesUp.Variables.Pruebas = function(){
	$('#IdFase').val($('#Fase').val());
	$('#IdOrigen').val($('#Origen').val());
	$('#IdIndustria').val($('#Industria').val());
	$('#IdGrupoEmpresarial').val($('#GrupoEmpresarial').val());

	$('.decimal').attr('onKeyPress','return SalesUp.Variables.valDecimales({t:this, e:event});');
	$('.numero').attr('onKeyPress','return SalesUp.Variables.valNumero({t:this, e:event});');
	
	$('.decimal').attr('onblur','SalesUp.Variables.numerosDecimales({t:this});');
	$('.numero').attr('onblur','SalesUp.Variables.numerosEnteros({t:this});');

	$('#Nombre').attr('onchange','SalesUp.Variables.determinaSexo({nombre:value});');
}/*Pruebas*/

SalesUp.Variables.ValidaEmail = function(Op){
	var $t = $(Op.t), Correo = Op.v;
	var unico = $t.hasClass('InfoUnico');
	var Sugerido = $t.hasClass('InfoSugerido');
	if(Correo==''){return true;}

	if(!SalesUp.Valida.ValidaEsCorreo(Correo)){
		SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Msg:'El correo <b>'+Op.v+'</b> es inválido, por favor verifique de nuevo.' });
		SalesUp.Valida.MarcarObligatorio($t);
		SalesUp.Valida.FocusMal();
		return false;
	}
	/*aqui*/
	if (unico){
		var r = SalesUp.Variables.EsUnico({ Elemento: Op.t, Valor:Correo });
		return r;
	}

	if (Sugerido){
		var s = SalesUp.Buscar.BuscarSugeridos({ Elemento:Op.t, Valor:Correo });
		return s;
	}

	return true;
}/*ValidaEmail*/

SalesUp.Variables.AgregarControlPaisEstado = function(){
	
	$('#pPais').attr('onchange','SalesUp.Variables.ltEstados({p:\'pPais\', e:\'pEstado\', m:\'pMunicipio\'});');
	$('#pEstado').attr('onchange','SalesUp.Variables.ltMunicipios({p:\'pPais\', e:\'pEstado\', m:\'pMunicipio\'});');

	$('#Pais').attr('onchange','SalesUp.Variables.ltEstados({p:\'Pais\', e:\'Estado\', m:\'EmpMunicipio\'});');
	$('#Estado').attr('onchange','SalesUp.Variables.ltMunicipios({p:\'Pais\', e:\'Estado\', m:\'EmpMunicipio\'});');
}/*AgregarControlPaisEstado*/

SalesUp.Variables.ltEstados = function(Op){
	var Pais = Op.p, Estado = Op.e, pd, $Pais, $Estado, jsonRespuesta, cargaEstados;
	$Pais = $('#'+Pais);
	$Estado = $('#'+Estado);

	pd = $Pais.val();
	cargaEstados = $Estado.attr('onchange');
	jsonRespuesta = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonEstados.dbsp', Parametros:'tConsulta=1&pd='+pd, DataType:'json'}).jsonDatos;
	
	jsonRespuesta.Opciones = jsonRespuesta;
    
	var Compilado = SalesUp.Construye.ReemplazaDatos({Datos:jsonRespuesta, Template:'{{#each Opciones}}{{opcionSelect}}{{/each}}'});
	
	$Estado.html(Compilado);

	eval(cargaEstados);
}/*ltEstados*/

SalesUp.Variables.ltMunicipios = function(Op){ 
	
	var Pais = Op.p, Estado = Op.e, Municipio = Op.m, pd, edo, $Pais, $Estado, $Municipio, jsonRespuesta;
	$Pais = $('#'+Pais);
	$Estado = $('#'+Estado);
	$Municipio = $('#'+Municipio);
	pd = $Pais.val();
	edo = $Estado.val();
	jsonRespuesta = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonMunicipios.dbsp', Parametros:'tConsulta=1&edo='+edo+'&pais='+pd, DataType:'json'}).jsonDatos;
	
	var noDisponible = true;
	
	var Compilado = '<option value="">(... Seleccione una opción ...)</option>';
	if (jsonRespuesta[0].Opcion!='(... No disponible ...)'){
		jsonRespuesta.Opciones = jsonRespuesta;
		Compilado += SalesUp.Construye.ReemplazaDatos({Datos:jsonRespuesta, Template:'{{#each Opciones}}{{opcionSelect}}{{/each}}'});
	}else{
		Compilado = '<option value="">(... No disponible ...)</option>';
	}
	$Municipio.html(Compilado);
	

	SalesUp.Variables.iniSelectizeMunicipio({m:Municipio});
	
}/*ltMunicipios*/

SalesUp.Variables.iniSelectizeMunicipio = function(Op){
	
	var Municipio = Op.m;
	var $Municipio = $('#'+Municipio);
	
	var OpcionesSelectize = {
		create: false, dropdownParent:'body', maxItems:1, persist:false, delimiter:'ª',
		onChange: function(data){ 
			$('#Input'+Municipio).val(data);
			
			if (SalesUp.Sistema.EstaActivoModulo({Modulo:2})){
				SalesUp.Variables.UsuariosCanalizacionAutomatica(); 
			}
			
		}
	}
	
	/*setTimeout(function(){*/
		if(Municipio=='pMunicipio'){
			if(_.size($SelectizeMunicipioProspecto)>0){ $SelectizeMunicipioProspecto[0].selectize.destroy();}
			$SelectizeMunicipioProspecto  = $Municipio.selectize(OpcionesSelectize);	
		}
		
		setTimeout(function(){
			$('.selectize-control').addClass('InfoData');
			$('.selectize-dropdown.BoxSizing.InfoData.single').removeClass('InfoData');
		}, 600);
		
	/*}, 500);*/
}/*iniSelectizeMunicipio*/

SalesUp.Variables.ObtieneOpciones = function(Op){
	var Naturaleza = Op.Naturaleza, Id = Op.Id, Indice = Op.Indice, IdCampo = Op.IdCampo;
	var Pagina = '', Almacen = '', Parametros='tConsulta=1', Pasa = false, jsonRespuesta;
	var esCliente = SalesUp.Variables.EsCliente;
	if(Naturaleza == '1'){
		
		if(Id=='Titulo'){Pagina = 'jsonTitulos.dbsp'; Almacen = 'jsonTitulosv2'; Pasa = true;}

		if(Id=='Fase'){
			Pagina = 'jsonFases.dbsp'; 
			Parametros='tConsulta=1&TF=0';
			Almacen = 'jsonFasesProspectos'; 
			Pasa = true;

			if(esCliente=='1'){
				Parametros='tConsulta=1&TF=1';
				Almacen = 'jsonFasesClientes';	
			}
		}

		if(Id=='Origen'){Pagina = 'jsonOrigen.dbsp'; Almacen = 'jsonOrigenv2'; Pasa = true;}

		if(Id=='Sexo'){Pagina = 'jsonSexo.dbsp'; Almacen = 'jsonSexov2'; Pasa = true;}

		if(Id=='Industria'){Pagina = 'jsonIndustria.dbsp'; Almacen = 'jsonIndustriav2'; Pasa = true;}

		if(Id=='GrupoEmpresarial'){Pagina = 'jsonGruposEmpresariales.dbsp'; Almacen = 'jsonGrupoEmpresarialv2'; Pasa = true;}

		if((Id=='Pais')||(Id=='pPais')){Pagina = 'jsonPaises.dbsp'; Almacen = 'jsonPaisesv2'; Pasa = true;}

		if((Id=='Estado')||(Id=='pEstado')){Pagina = 'jsonEstados.dbsp'; Almacen = 'jsonEstadosv2'; Parametros+='&pd='+paisDefault; Pasa = true;}

		if((Id=='Municipio')||(Id=='pMunicipio')){Pagina = 'jsonMunicipios.dbsp'; Almacen = 'jsonMunicipiosv2'; Parametros+='&edo='+edoDefault+'&pais='+paisDefault; Pasa = true;}
		
	}else if(Naturaleza == '2'){
		Pagina = 'jsonCamposPersonalizadosOpciones.dbsp'; Almacen = 'jsonOpcion'+IdCampo; Parametros +='&IdCampo='+IdCampo; Pasa = true;
	}

	if(Pasa){
		jsonRespuesta = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/'+Pagina, Parametros:Parametros, DataType:'json', Almacen:Almacen}).jsonDatos;	
	}
	
	return jsonRespuesta;
}/*ObtieneOpciones*/

SalesUp.Variables.EsUnico = function(Op){
	var $Elemento = $(Op.Elemento);
	var noCuenta;
	var BuscandoCoincidencias = '<span class="BuscandoCoincidencias Italic">Validando <i class="fa fa-lg fa-spinner fa-spin"></i></span>';
	var Pasa = true;
	noCuenta = ( ($Elemento.hasClass('selectize-control') ) || ( $Elemento.hasClass('selectize-dropdown') ) );
	
	if(!noCuenta){
		var Valor = Op.Valor;
		
		if(!_.isEmpty(Valor)){
			var $Padre = $Elemento.closest('.BoxInfo');
			var IdCampo = $Elemento.attr('data-idc');
			var IdProspecto = $('#IdProspecto').val();
			var tkp = $('#tkp').val(); 
			var Campo = $Elemento.prev().html();
			var Post = {v:Valor, idc:IdCampo, tkp: tkp, idp:IdProspecto };
			var txtDescartado = '';
			$Padre.append(BuscandoCoincidencias);
			
				SalesUp.Variables.jsonUnico = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonValidaUnico.dbsp', Parametros:Post, DataType:'json', Div:0 });
				if( _.size(SalesUp.Variables.jsonUnico.jsonDatos[0]) > 0 ){
					Pasa = false;
					
					(SalesUp.Variables.jsonUnico.jsonDatos[0].Descartado==1) ? txtDescartado = ' <b style="color:red;">[Descartado]</b> ' : '';

					var Mensaje = 'El prospecto <b>' + SalesUp.Variables.jsonUnico.jsonDatos[0].Prospecto + '</b>';
					Mensaje = Mensaje + txtDescartado+' asignado a <b>' + SalesUp.Variables.jsonUnico.jsonDatos[0].Usuario;
					Mensaje = Mensaje + '</b> fue capturado con el mismo <b>' + Campo + '</b>. Por favor revise la información.';

					SalesUp.Construye.MuestraMsj({tMsg:3, Destino:'body', Msg:Mensaje, NoCerrar:true });
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
}/* /EsUnico */

SalesUp.Variables.ValidaCamposUnicos = function(Op){
	
	var Pasa = true, $DentroDe;
	(!Op) ? Op = {} : '';
	(Op.DentroDe) ? $DentroDe = $(Op.DentroDe) : '';
	$DentroDe.find('.InfoUnico').not('.TbEmpresas').each(function(){
		Pasa = SalesUp.Variables.EsUnico({ Elemento: this, Valor: $(this).val() });
		if(!Pasa){return Pasa;}
	});
	return Pasa;
}/* /ValidaCamposUnicos */

SalesUp.Variables.onblurInfoUnico = function(){
	$('.InfoUnico').each(function(){ 
		var OnBlur = $(this).attr('onblur');
		(!OnBlur) ? $(this).attr('onblur','SalesUp.Variables.EsUnico({ Elemento:this, Valor:value });') : '';
	});

	$('.InfoSugerido').each(function(){ 
		var OnBlur = $(this).attr('onblur');
		(!OnBlur) ? OnBlur = '':'';
		$(this).attr('onblur',OnBlur+' SalesUp.Buscar.BuscarSugeridos({ Elemento:this, Valor:value });');
	});
}

SalesUp.Variables.AgregaryVerAvanzado = function(){
	$('#AgregarVerAvanzado').val(1);
	SalesUp.Variables.EnviarFormaAvanzado();
}

SalesUp.Variables.obligatoriosTipoEmpresa = function(){
	var $liEmpresa = $('li[data-idventana="1"][data-tabdefault="4"]');
	if(!_.size($liEmpresa)){
	  $liEmpresa = $('li[data-idventana="3"][data-tabdefault="4"]');
	}

	var $divEmpresa, arrObligatoriosEmpresas,arrUnicosEmpresas;

	$('[data-empresaobligatorio=1]').addClass('InfoObligatorio');
	$('[data-empresaunico=1]').addClass('InfoUnico');

	if(!$liEmpresa.is(':visible')){

	  $divEmpresa = '#div'+$liEmpresa.attr('id');
	  $divEmpresa = $($divEmpresa);
	  arrObligatoriosEmpresas = $divEmpresa.find('.InfoObligatorio');
	  arrObligatoriosEmpresas.attr('data-empresaobligatorio',1);
	  arrObligatoriosEmpresas.removeClass('InfoObligatorio');
		
		
	  arrUnicosEmpresas = $divEmpresa.find('.InfoUnico');
	  arrUnicosEmpresas.attr('data-empresaunico',1);
	  arrUnicosEmpresas.removeClass('InfoUnico');
		
	}

	
}/*SalesUp.Variables.obligatoriosTipoEmpresa*/

SalesUp.Variables.EnviarFormaAvanzado = function(){
	var $btnAceptar = $('#BtnAceptar');
	var onclick = $btnAceptar.attr('onclick');
	$btnAceptar.attr('onclick','return false;');

	SalesUp.Sistema.MuestraEspera('',4);
	var Pasa = false;
	//if( !SalesUp.Sistema.EsNumero($('#IdEmpresa').val()) ){ QuitarEmpresa(); }
	setTimeout(function() {
			SalesUp.Variables.obligatoriosTipoEmpresa();
			Pasa = SalesUp.Variables.ValidaCamposUnicos({DentroDe:'#FrmProspectosAvanzado'});
					var $liEmpresa = $('li[data-idventana="1"][data-tabdefault="4"]');
					if(!_.size($liEmpresa)){
					  $liEmpresa = $('li[data-idventana="3"][data-tabdefault="4"]');
					}

					var $divEmpresa, arrObligatoriosEmpresas;

					$divEmpresa = '#div'+$liEmpresa.attr('id');
					$divEmpresa = $($divEmpresa);
					if($liEmpresa.is(':visible')){
						(Pasa) ? Pasa = SalesUp.Variables.ValidaCamposUnicosEmpresas({DentroDe:$divEmpresa}): '';
					}

			(Pasa) ? Pasa = SalesUp.Variables.TodosNumeros():'';
			(Pasa) ? Pasa = SalesUp.Variables.TodosDecimales():'';
			(Pasa) ? Pasa = SalesUp.Valida.ValidaObligatorios() : '';
			(Pasa) ? Pasa = SalesUp.Variables.ValidaEmail({t:'#Correo', v:$('#Correo').val()}) : '';
			(Pasa) ? Pasa = SalesUp.Valida.ValidaFechas() : '';
			$('#FrmProspectosAvanzado [name="tkEtiq"]').val(0);
			setTimeout(function() {
				if(Pasa){
					$('#FrmProspectosAvanzado').submit();
				}else{
					OcultarOverlay();
					$btnAceptar.attr('onclick',onclick);
				}
			}, 1000);
	}, 10);
}

SalesUp.Variables.ValidaNumeros = function(){
	return;
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

SalesUp.Variables.EtiquetasSelectize = function(){
	SalesUp.Variables.jsonLtEtiquetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonLtEtiquetas.dbsp', Parametros:'', DataType:'json', Almacen:'jsonLtEtiquetas' });
	var puedeCrear = false;
	
	if (SalesUp.Variables.CrearEtiquetas=='1'){
		puedeCrear = true;
	};

	var items = (SalesUp.Variables.jsonDatosProspecto) ? SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Etiquetas: '';
	SalesUp.Variables.etiquetasUsuario = items;
	items = _.map(items.split(','),function(e){return parseInt(e)})

	var etiquetasDisponibles = SalesUp.Variables.jsonLtEtiquetas.jsonDatos;

	if(SalesUp.Sistema.PermisoActivo('Etiquetar',[2,0])){
		etiquetasDisponibles = _.filter(SalesUp.Variables.jsonLtEtiquetas.jsonDatos, function(e) {
			if (_.indexOf(items, e.IdEtiqueta) >= 0) {
				return e;
			}
		});
	}

	var Etiquetas = function(){$EtiquetasProspecto = $('#Etiquetas').selectize({
				    plugins: ['NoQuitarEtiqueta'],
				    delimiter: ',',
				    persist: false,
				    openOnFocus:true,
				    options: etiquetasDisponibles,
				    onChange: function(){ DespuesDeSeleccionarEtiqueta(this); },
				    create: puedeCrear,
				    onDelete: function(value){
				    	valor = parseInt(value[0]);
						if(_.indexOf(items,valor) >= 0 && SalesUp.Sistema.PermisoActivo('Etiquetar',[0,1])){ return false;}
					},
				    render: {
				        item: function(data, escape) {
				            return '<div class="item Tag" data-creado="'+((data.Creado) ? data.Creado : 0)+'">' + escape(data.text) + '</div>';
				        },
						option_create: function(data, escape){
							return '<div class="create agregarEtiqueta AgregarNuevo Btn Btn-rounded Btn-small Btn-flat-Aceptar"><strong>Guardar</strong></div>';
						}
				    }
				});
	$(".plugin-NoQuitarEtiqueta").addClass('plugin-remove_button');
		}
	if(typeof Selectize.plugins.NoQuitarEtiqueta === "undefined"){
		SalesUp.Sistema.getScript({script:'/scripts/FuncionesNuevas/PluginsSelectize.js',callback:Etiquetas});
	}else{
		Etiquetas();
	}
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
	self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:560+Aumenta});

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

function SiguienteFocus(t){ return true;
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

function IniciaSelectize(Op){				
	if(!Existe(Op.Control)){return;}

	SalesUp.Variables.OpcionesSelectize = {
		create: SalesUp.Variables.CrearNuevo,
		
		dropdownParent: 'body',
		maxItems: 1, persist: false,delimiter:'ª',
		onChange: function(data){ DespuesDeSeleccionarSelect(Op.Control, data); },
		render: { 
			option_create: function(data, escape){
				return '<div class="create AgregarNuevoMini Btn Btn-rounded Btn-small Btn-flat-Aceptar"><strong>Guardar</strong></div>'; 
			}
		}
	}
	
	if( (Op.Control=='Titulo') || (Op.Control=='CS-4') ){ $SelectizeTitulo  = $('#'+Op.Control).selectize(SalesUp.Variables.OpcionesSelectize); }
	if( (Op.Control=='Origen') || (Op.Control=='CS-20') ){ $SelectizeOrigen  = $('#'+Op.Control).selectize(SalesUp.Variables.OpcionesSelectize); }
	if( (Op.Control=='Fase') || (Op.Control=='CS-21') ){ $SelectizeFase = $('#'+Op.Control).selectize(SalesUp.Variables.OpcionesSelectize); }
	if( (Op.Control=='Industria') || (Op.Control=='CS-22') ){ $SelectizeIndustria = $('#'+Op.Control).selectize(SalesUp.Variables.OpcionesSelectize); }
	if( (Op.Control=='GrupoEmpresarial') || (Op.Control=='CS-23') ){ $SelectizeGrupos = $('#'+Op.Control).selectize(SalesUp.Variables.OpcionesSelectize); }	

} /* /IniciaSelectize */

function DespuesDeSeleccionarSelect(Control,Valor){
	OcultarGuardandoNuevo(Control);
	if( !_.isNaN(parseInt(Valor)) ){
		$('#Id'+Control).val(Valor);
		$('#Simple'+Control).val(Valor);
	}else{
		if(!_.isEmpty(Valor)){
			MostrarGuardandoNuevo(Control);
			SalesUp.Variables.Pagina = '';
			SalesUp.Variables.Parametros = {};

			if( (Control=='Industria') || (Control=='CS-22') ) {
				SalesUp.Variables.Pagina = '/privado/Modelo/qryIndustriaGuardar.dbsp';
				SalesUp.Variables.Parametros = {Industria:Valor};
			}

			if( (Control=='Origen') || (Control=='CS-20') ) {
				SalesUp.Variables.Pagina = '/privado/Modelo/qryOrigenGuardar.dbsp';
				SalesUp.Variables.Parametros = {Origen:Valor};
			}

			if( (Control=='Fase') || (Control=='CS-21') ) {
				SalesUp.Variables.Pagina = '/privado/Modelo/qryFaseGuardar.dbsp';
				SalesUp.Variables.Parametros = {Fase:Valor, TipoFase:SalesUp.Variables.EsCliente};
			}

			if( (Control=='GrupoEmpresarial') || (Control=='CS-23') ) {
				SalesUp.Variables.Pagina = '/privado/Modelo/qryGrupoEmpresarialGuardar.dbsp';
				SalesUp.Variables.Parametros = {Grupo:Valor};
			}

			if( (Control=='Titulo') || (Control=='CS-4') ){
				SalesUp.Variables.Pagina = '/privado/Modelo/qryTituloGuardar.dbsp';
				SalesUp.Variables.Parametros = {Titulo:Valor};
			}
			
			setTimeout(function(){
				SalesUp.Variables.jsonRespuesta = SalesUp.Sistema.CargaDatos({Link:SalesUp.Variables.Pagina, Parametros:SalesUp.Variables.Parametros, DataType:'json' });	
				$('#Id'+Control).val(SalesUp.Variables.jsonRespuesta.jsonDatos[0].Id);
				$('#Simple'+Control).val(SalesUp.Variables.jsonRespuesta.jsonDatos[0].Id);
				
				$('.selectize-dropdown.Select'+Control).hide();
				setTimeout(function() {
					SiguienteFocus('.Select'+Control+' .selectize-input.items.has-options.full.has-items > input');	
				}, 20);

				OcultarGuardandoNuevo(Control);
				ListoOk(Control);

			}, 300);
		}else{
			OcultarGuardandoNuevo(Control);
		}
	}
}/* /DespuesDeSeleccionarSelect */

function Existe(e){ return (_.size($('#'+e))>0); }

function IniciaSelectizeCompanias(){
	SalesUp.Variables.EmpresaAgregada = false;
	SalesUp.Variables.typeEmpresa = '';
	var puedeCrearEmpresa = (SalesUp.Variables.crearEmpresas==1)?true:false;
	var empresaLigada = (parseInt($('#Empresa').attr('data-ligar'))==1)?false:true;

	$SelectizeCompanias = $('#Empresa').addClass('autoCompleteEmpresa').selectize({
	 	valueField: 'IdCompania', labelField: 'Empresa', searchField: ['Empresa'], maxItems: 1,
	    options: [], delimiter:'ª', persist: false, create: empresaLigada, createOnBlur: true, selectOnTab:true,
	    loadThrottle:600, closeAfterSelect:true, 
	    onChange: function(){ DespuesDeSeleccionarCompania({Control:2}); },
	    onType:function(str){ 
	    	var $selectize = $('.selectize-control.autoCompleteEmpresa').find('.selectize-input');
		      	$selectize.find('.empresaExistente').remove();
	    	//SelectCompania.clearOptions(); 
	    	SalesUp.Variables.typeEmpresa = str;
		    if(str.length==0){ SelectCompania.setValue(['']); }
	    },onClear: function(){ $('#CrearNuevaEmpresa').remove(); },
	    onDropdownClose:function(){
	    	var IdEmpresa = SelectCompania.getValue();
	    	
	    	if(_.isEmpty(IdEmpresa)){
	    		SelectCompania.addOption({
					IdCompania: SalesUp.Variables.typeEmpresa,
					Empresa: SalesUp.Variables.typeEmpresa
				});
		    	SelectCompania.setValue([SalesUp.Variables.typeEmpresa]);
		    	$('#IdEmpresa').val(SalesUp.Variables.typeEmpresa);
	    	}

	    	setTimeout(function(){ $('.selectize-dropdown.SelectEmpresa').hide(); }, 20);
		},render:{
	    	item: function(item, escape){
	    		var icono = '';
	        	if( !_.isNaN(parseInt(item.IdCompania)) ){ icono = '<i class="fa fa-building-o"></i>'; }

	    		return '<div>' + (item.Empresa ? '<span class="NombreEmpresa"> ' +icono+' ' + escape(item.Empresa) + '</span>' : '') + '</div>';
	        },
	        option: function(item, escape){
	        	var icono = '<i class="fa fa-building-o"></i>';
	        	if( _.isNaN(parseInt(item.IdCompania)) ){
	        		icono = '<i class="fa fa-angle-right"></i>';
	        	}
	        	return '<div class="BoxInfoContacto">' + ( item.Empresa ? '<span class="EmpresaContacto Ellipsis">'+icono+' ' + escape(item.Empresa) + '</span>' : '' )  + '</div>';
	        },
			option_create: function(data, escape){return '';}
		},load: function(query, callback){
			
	    	if(!_.size(query)){return callback();}
	    	
	        if(_.size(query)>=2){
	        	//callback();
	        	MostrarGuardandoNuevo('Empresa');
	        	SelectCompania.clearOptions();
	        	
	        	var $selectize = $('.selectize-control.autoCompleteEmpresa').find('.selectize-input');
		      	$selectize.find('.buscarCorreos').remove();
		      	$selectize.find('input').after('<span class="buscarCorreos"><i class="fa fa-spin fa-spinner"></i> Buscando</span>');

	        	var procesaEmpresasEncontradas = function(Op, err){
	        		if (Op) {
	        			OcultarGuardandoNuevo('Empresa');
			        	$('#CrearNuevaEmpresa').remove();
						$selectize.find('.buscarCorreos').remove();
			        	var v = "'"+query+"'";
			        	SalesUp.Variables.jsonCompanias = Op;
						callback(Op.jsonDatos);
						if (puedeCrearEmpresa){
							$('#Empresa').next()
							.append('<div id="CrearNuevaEmpresa" class="Pointer AgregarNuevo Btn Btn-rounded Btn-tiny Btn-flat-Aceptar" onclick="NuevaCompania({t:this, v:\''+query+'\', c:2});"><strong>Crear empresa*</strong></div>');
						}

	        		}
	        	}

	        	SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonCompanias.dbsp', parametros:{ q: query }, callback:procesaEmpresasEncontradas});
	        }
	    }/*load*/
	});
	var SelectCompania;
	if(Existe('Empresa')){
		if(SalesUp.Variables.EditarProspecto){
			var estatus = SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].autorizacionPendiente
			if ((estatus == 1 || estatus == 2)) {
				SelectCompania = $SelectizeCompanias[0].selectize.disable();	
			}else{
				SelectCompania = $SelectizeCompanias[0].selectize;	
			}
		}else{
			SelectCompania = $SelectizeCompanias[0].selectize;	
		}
		
	}
} /* /IniciaSelectizeCompanias */

function DespuesDeSeleccionarCompania(Op){

	if(Op.Control==1){
		var $input = $('#CS-3.selectized');
	}else{
		var $input = $('#Empresa.selectized');
	}
	
	var Valor = $input.val();

	OcultarGuardandoNuevo('Empresa');
	SalesUp.Variables.ActualizarDatosCompanias = 0;
	ValidarCambiodeInformacion();
	
	var empresaLigada = parseInt($input.attr('data-ligar'));

	var $selectizeEmpresa = $('.selectize-control.autoCompleteEmpresa').find('.selectize-input');
		$selectizeEmpresa.find('.empresaExistente').remove();


	if( !_.isNaN(parseInt(Valor)) ){
		
		$('#CrearNuevaEmpresa').remove();
		$('#IdEmpresa, #SimpleIdEmpresa').val(Valor);

		$('li[data-idventana="1"][data-tabdefault="4"]').show();
		$('li[data-idventana="3"][data-tabdefault="4"]').show();

		SalesUp.Variables.jsonCompaniasInformacion = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCompaniasInformacion.dbsp', Parametros:{ c: Valor }, DataType:'json' });
		
		if(SalesUp.Variables.EditarProspecto){
			
			SalesUp.Variables.ReemplazarInformacionEmpresa();

		}else{ /* if(SalesUp.Variables.EditarProspecto)*/
			/*Nuevo prospecto*/
			
			SalesUp.Variables.ActualizarDatosCompanias = 0;
			
			SalesUp.Variables.ReemplazarInformacionEmpresa();
			SalesUp.Variables.NoCambiarEmpresa=1;
			if(Op.Control==1){
				setTimeout(function() {
					$('.selectize-dropdown.SelectCS-3').hide();
					SiguienteFocus('.SelectCS-3 .selectize-input.items.has-options.full.has-items > input');
				}, 20);
			}else{
				/*if(_.size($EtiquetasProspecto)>0){ $EtiquetasProspecto[0].selectize.focus();}*/
				/*
				setTimeout(function() {
					$('.selectize-dropdown.SelectEmpresa').hide();
					if(!_.isUndefined($('.SelectEtiquetas .selectize-input.items.not-full.has-options > input').attr('style'))){
						$('.SelectEtiquetas .selectize-input.items.not-full.has-options > input').focus();	
					}else{
						SiguienteFocus('.SelectEmpresa .selectize-input.items.has-options.full.has-items > input');	
					}
				}, 20);
				*/
			}
		} /* / if(SalesUp.Variables.EditarProspecto) */
		SalesUp.Variables.validaDuenioEmpresa();

	}else{

		if(Valor==''){
			$('#CrearNuevaEmpresa').remove();
			$('li[data-idventana="1"][data-tabdefault="4"]').hide();
			$('li[data-idventana="3"][data-tabdefault="4"]').hide();
		}

		if( (empresaLigada==1)&&(Valor!='')){
			var SelectCompania = $SelectizeCompanias[0].selectize;
			//SelectCompania.setValue(['']);
			
			$selectizeEmpresa.find('input').after('<span class="empresaExistente Rojo Bold Italic"> <i class="fa fa-times"></i> Seleccione una empresa existente.</span>');

			var avisoEmpresaLigada = '';
			  avisoEmpresaLigada = '<h2 class="Rojo w100 pb5 tCen"><i class="fa fa-warning"></i> Atención</h2><div class="clear"></div>';
			  avisoEmpresaLigada += '<br/><div style="font-size:14px;" class="w100">La empresa seleccionada necesita ser una existente.';
			  avisoEmpresaLigada += '</div><div class="clear"></div>';
			$('#alertaAvisoEmpresaLigada').remove();
			SalesUp.Construye.MuestraMsj({tMsg:4,Msg:'Se necesita seleccionar una empresa existente.', Id:'alertaAvisoEmpresaLigada', Tiempo:6000})
			
		}
	}
	/* /if( !_.isNaN(parseInt(Valor)) ) */
	
	setTimeout(function(){
		if($('#Empresa').hasClass('InfoSugerido')){
			SalesUp.Buscar.BuscarSugeridos({ Elemento:$('#Empresa'), Valor:Valor }); 	
		} 
	}, 500);



}/* /DespuesDeSeleccionarCompania */

function NuevaCompania(Op){
	$(Op.t).remove();
	
	SalesUp.Variables.ActualizarDatosCompanias = 0;
	ValidarCambiodeInformacion();
	if(Op.c==1){
		MostrarGuardandoNuevo('CS-3');
	}else{
		MostrarGuardandoNuevo('Empresa');
	}

	SalesUp.Variables.Pagina = '/privado/Modelo/qryCompaniaGuardar.dbsp';
	SalesUp.Variables.Parametros = {Empresa:Op.v, Pais:SalesUp.Variables.PaisDefault, Estado:SalesUp.Variables.EstadoDefault };
	
	SalesUp.Variables.EmpresaAgregada = true;
	//SalesUp.Variables.NoCambiarEmpresa = 1;
	
	setTimeout(function(){
		self.parent.SalesUp.Variables.RecargarTodo = true;
		SalesUp.Variables.jsonRespuesta = SalesUp.Sistema.CargaDatos({Link:SalesUp.Variables.Pagina, Parametros:SalesUp.Variables.Parametros, DataType:'json' });	
		$('#IdEmpresa').val(SalesUp.Variables.jsonRespuesta.jsonDatos[0].Id);
		$('#SimpleIdEmpresa').val(SalesUp.Variables.jsonRespuesta.jsonDatos[0].Id);

		SalesUp.Variables.ExisteEmpresa = SalesUp.Variables.jsonRespuesta.jsonDatos[0].Existe;

		if(!_.isUndefined(window.$SelectizeIndustria)){
			var ControlSelectizeIndustria = $SelectizeIndustria[0].selectize;
			ControlSelectizeIndustria.setValue([SalesUp.Variables.jsonRespuesta.jsonDatos[0].IdIndustria]);
		}

		var ControlSelectizeCompania = $SelectizeCompanias[0].selectize;

		ControlSelectizeCompania.removeOption(Op.v);
		
		ControlSelectizeCompania.addOption({
	        IdCompania: SalesUp.Variables.jsonRespuesta.jsonDatos[0].Id,
	        Empresa: Op.v
	    });

		ControlSelectizeCompania.refreshOptions();
		ControlSelectizeCompania.setValue([SalesUp.Variables.jsonRespuesta.jsonDatos[0].Id]);

		if(Op.c==1){
			OcultarGuardandoNuevo('CS-3');
			ListoOk('CS-3');
			setTimeout(function() {
				$('.selectize-dropdown.SelectCS-3').hide();
				SiguienteFocus('.SelectCS-3 .selectize-input.items.has-options.full.has-items > input');
			}, 20);
		}else{
			OcultarGuardandoNuevo('Empresa');
			ListoOk('Empresa');
			setTimeout(function() {
				$('.selectize-dropdown.SelectEmpresa').hide();
				if(!_.isUndefined($('.SelectEtiquetas .selectize-input.items.not-full.has-options > input').attr('style'))){
					$('.SelectEtiquetas .selectize-input.items.not-full.has-options > input').focus();	
				}else{
					SiguienteFocus('.SelectEmpresa .selectize-input.items.has-options.full.has-items > input');	
				}
			}, 20);
		}
	}, 300);
}/*NuevaCompania*/

function ValidarCambiodeInformacion(){
	var ValidaCambio = function(Op){
		var $Elemento = $(Op.Elemento);
		var Valor = $Elemento.val();
		if(!_.isEmpty(Valor)){
			if($('#AlertaActualizar').length==0)
				SalesUp.Construye.MuestraMsj({tMsg:3, Id:'AlertaActualizar', Msg:'Se actualizará la información de la empresa', NoCerrar:true });
		}
	}

	
	if(SalesUp.Variables.EsCliente==1){
		var cont = $('li[data-idventana="3"][data-tabdefault="4"]').attr('aria-controls');
	}else{
		var cont = $('li[data-idventana="1"][data-tabdefault="4"]').attr('aria-controls');
	}

	var $contenedor = $('#'+cont)
	if(SalesUp.Variables.ActualizarDatosCompanias==1){
		$contenedor.find('select').change(function(){
			ValidaCambio({Elemento:this});
		});

		$contenedor.find('input').keyup(function(){
			ValidaCambio({Elemento:this});
		});

		$contenedor.find('input').change(function(){
			ValidaCambio({Elemento:this});
		});
	}else{
		//$('#ContenidoEmpresa input').unbind('keyup');
	}
}/*ValidarCambiodeInformacion*/



function SelectizeSeleccionarEmpresa(query){ 
	var SeleccionarEmpresa;
	if(Existe('Empresa')){ SeleccionarEmpresa = $SelectizeCompanias[0].selectize; }

	if(SeleccionarEmpresa){
		var SeleccionarEmpresa = $SelectizeCompanias[0].selectize;
		SeleccionarEmpresa.clearOptions();
		SalesUp.Variables.ActualizarDatosCompanias = 0;
		
		SeleccionarEmpresa.load(function(callback){
			(!query)? query = '':'';

			var parametros = {q:query};
			if(SalesUp.Variables.agregarAEmpresa){ 
				query = 1;
				parametros.tkCom = SalesUp.Variables.tkCom;
			}
			
			if( ( SalesUp.Sistema.EsNumero(query) ) && ( query!='0') ){
				SalesUp.Variables.jsonCompanias = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCompaniasId.dbsp', Parametros:parametros, DataType:'json' });
				
				if(_.size(SalesUp.Variables.jsonCompanias.jsonDatos[0])==0){
					$('#CrearNuevaEmpresa').remove();
					var v = "'"+query+"'";
					/*$('.selectize-control.SelectEmpresa')*/
					$('#Empresa').next().append('<div id="CrearNuevaEmpresa" class="Pointer AgregarNuevo Btn Btn-rounded Btn-tiny Btn-flat-Aceptar" onclick="NuevaCompania({t:this, v:'+v+'});"><strong>Crear empresa</strong></div>');
				}
				callback(SalesUp.Variables.jsonCompanias.jsonDatos);
				query = SalesUp.Variables.jsonCompanias.jsonDatos[0].IdCompania;
				SeleccionarEmpresa.setValue([query]);
				if(SalesUp.Variables.agregarAEmpresa){ 
					setTimeout(function(){
						$('#Nombre').focus(); 
						$('li[data-idventana="1"][data-tabdefault="4"], li[data-idventana="3"][data-tabdefault="4"]').show();
					}, 300); 
					
				}
			}else{
				SalesUp.Variables.NoCambiarEmpresa=1;
				if(query.length>0){
					SeleccionarEmpresa.addOption({ IdCompania: query, Empresa: query });
			    	SeleccionarEmpresa.setValue([query]);
			    	
			    	SalesUp.Variables.NoCambiarEmpresa=1;
		    		var v = "'"+query+"'";
		    		/*$('.selectize-control.SelectEmpresa')*/
		    		$('#Empresa').next().append('<div id="CrearNuevaEmpresa" class="Pointer AgregarNuevo Btn Btn-rounded Btn-tiny Btn-flat-Aceptar" onclick="NuevaCompania({t:this, v:'+v+'});"><strong>Crear empresa</strong></div>');
		    	}
			}
	    });
	} /* if(SeleccionarEmpresa) */
} /* /SelectizeSeleccionarEmpresa */

SalesUp.Variables.ReemplazarInformacionEmpresa = function(){
	if(!_.isUndefined(window.$SelectizeIndustria)){
		var ControlSelectizeIndustria = $SelectizeIndustria[0].selectize;
		ControlSelectizeIndustria.setValue([SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdIndustria]);	
	}

	if(!_.isUndefined(window.$SelectizeGrupos)){
		var ControlSelectizeGrupos = $SelectizeGrupos[0].selectize;
		ControlSelectizeGrupos.setValue([SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdCompaniaGrupo]);	
	}

	var jCompaniaInfo = SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0];

	$('#GrupoEmpresarial').val(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdCompaniaGrupo);
	$('#Industria').val(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdIndustria);

	$('#IdGrupoEmpresarial').val(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdCompaniaGrupo);
	$('#IdIndustria').val(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdIndustria);

	$('#TelefonoCorporativo, #CS-24').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].TelefonoCorporativo );
	$('#PaginaWeb, #CS-12').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Url );
	$('#nEmpleados, #CS-11').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].nEmpleados );
	

	$('#Ciudad, #CS-15').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Ciudad );
	$('#CodigoPostal, #CS-16').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].CodigoPostal );
	$('#Calle, #CS-13').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Direccion1 );
	$('#Colonia, #CS-14').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Direccion2 );
	
	$('#Com-CatalogoOpcion1').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Com_OpcionCatalogo1 );
	$('#Input-Com-CatalogoOpcion1').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Com_OpcionCatalogo1 );
	$('#Com-CatalogoOpcion2').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Com_OpcionCatalogo2 );
	$('#Input-Com-CatalogoOpcion2').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Com_OpcionCatalogo2 );
	$('#Com-CatalogoOpcion3').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Com_OpcionCatalogo3 );
	$('#Input-Com-CatalogoOpcion3').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Com_OpcionCatalogo3 );
	
	$('#Pais, #CS-18').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdPais );
	SalesUp.Variables.ltEstados({p:'Pais', e:'Estado', m:'EmpMunicipio'});
	
	$('#Estado, #CS-19').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdEstado );
	SalesUp.Variables.ltMunicipios({p:'Pais', e:'Estado', m:'EmpMunicipio'});
	
	
	
	$('#EmpMunicipio').val( jCompaniaInfo.idMunicipio);
	$('#NumInterior').val( jCompaniaInfo.NumInterior);
	$('#NumExterior').val( jCompaniaInfo.NumExterior);
	
	for (var cc = 0; cc <= 10; cc++){
		$('#CC'+cc).val(jCompaniaInfo['Campo'+cc+'C']);
	}

	SalesUp.Variables.ActualizarDatosCompanias = 1;
	ValidarCambiodeInformacion();

	setTimeout(function(){
		if(_.size($EtiquetasProspecto)>0){ $EtiquetasProspecto[0].selectize.focus();}
	}, 200);

}/* /SalesUp.Variables.ReemplazarInformacionEmpresa */

SalesUp.Variables.DatosProspecto = function(){
	if(SalesUp.Variables.EditarProspecto){
		
		SalesUp.Variables.jsonDatosProspecto = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosProspecto.dbsp', Parametros:{tkp:SalesUp.Variables.tkp, idp:SalesUp.Variables.IdProspecto}, DataType:'json' });
		
		if(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].esCanalizado=='1'){
			$('[data-spmodulo="2"]').hide();
		}

		var esCanalizado = SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].esCanalizado;
		//Proteccion canalizacion cuando tiene productos y no puede canalizar

		var OpcionMostrar = SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].OpcionMostrar;
		if((esCanalizado=='1') || ( (OpcionMostrar ==1) || (OpcionMostrar >2) )){$('#TabCanalizaciones').remove();}
		SalesUp.Sistema.RestriccionOpcionesCanalizadas({prospectoEsCanalizado:esCanalizado});

		
		$('#Nombre').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Nombre);
		$('#Apellidos').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Apellidos);
		
		$('#Titulo option').each(function(){
			var Opcion = $(this).html();
			if(Opcion==SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Titulo){
				$(this).attr('selected','selected');
			}
		});

		$('#Sexo').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Sexo);
		$('#Correo').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Correo);
		$('#Puesto').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Puesto);
		$('#Telefono1').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Telefono);
		$('#Telefono2').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Telefono2);
		$('#Movil').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Movil);
		$('#Comentarios').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Comentarios);
		$('#Fase').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdFase);
		$('#Origen').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdOrigen);

		$('#Facebook').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Facebook);
		$('#Twitter').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Twitter);
		$('#Skype').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Skype);
		$('#LinkedIn').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Linkedin);
		$('#Googleplus').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Googleplus);

		for (var i = 1; i <= 64; i++){
			$('#CP'+i).val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0]['Campo'+i]);
		};
		
		$('#P-CatalogoOpcion1').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].OpcionCatalogo1);
		$('#Input-P-CatalogoOpcion1').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].OpcionCatalogo1);
		$('#P-CatalogoOpcion2').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].OpcionCatalogo2);
		$('#Input-P-CatalogoOpcion2').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].OpcionCatalogo2);
		$('#P-CatalogoOpcion3').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].OpcionCatalogo3);
		$('#Input-P-CatalogoOpcion3').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].OpcionCatalogo3);

		var idcom = SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdCompania;
		(!idcom) ? idcom = '':'';
		if(idcom!=''){
			SalesUp.Variables.EmpresaSeleccionada = SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdCompania;
			setTimeout(function() {
				$('li[data-idventana="1"][data-tabdefault="4"]').show();
				$('li[data-idventana="3"][data-tabdefault="4"]').show();
			}, 800);
			$('#GrupoEmpresarial').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdCompaniaGrupo);
			$('#Industria').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdIndustria);

			$('#IdGrupoEmpresarial').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdCompaniaGrupo);
			$('#IdIndustria').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdIndustria);
		}else{
			SalesUp.Variables.EmpresaSeleccionada = SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Empresa;
			$('#GrupoEmpresarial').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdCompaniaGrupo);
			$('#Industria').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdIndustria);
			$('#TelefonoCorporativo').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].TelefonoCorporativo);
			//$('#PaginaWeb').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Url);
			$('#nEmpleados').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].nEmpleados);
		}

		/* FALTA AGREGAR LOS CATALOGOS
		$('#Com-CatalogoOpcion1').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].ComOpcionCatalogo1);
		$('#Com-CatalogoOpcion2').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].ComOpcionCatalogo2);
		$('#Com-CatalogoOpcion3').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].ComOpcionCatalogo3);
		*/

		$('#pPais').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdPais);
		SalesUp.Variables.ltEstados({p:'pPais', e:'pEstado', m:'pMunicipio'});
		
		$('#pEstado').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdEstado);
		
		
		setTimeout(function() {

			SalesUp.Variables.ltMunicipios({p:'pPais', e:'pEstado', m:'pMunicipio'});
			if(_.size($SelectizeMunicipioProspecto)>0){ 
				$SelectizeMunicipioProspecto[0].selectize.setValue([SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdMunicipio]);
				
			}
		}, 500);
		
		
		
		$('#pMunicipio').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdMunicipio);
		$('#InputpMunicipio').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdMunicipio);

		$('#pCiudad').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Ciudad);
		$('#pCodigoPostal').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Cp);
		$('#pCalle').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Calle);
		$('#pColonia').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Colonia);
		$('#pPaginaWeb').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Url);
		
		$('#IdEmpresa').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdCompania);
		$('#IdIndustria').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdIndustria);
		$('#IdFase').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdFase);
		$('#IdTitulo').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdTitulo);
		$('#IdOrigen').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdOrigen);
		$('#IdGrupoEmpresarial').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdCompaniaGrupo);
		
		$('#Etiquetas, #LtIdEtiquetas, #LtIdEtiquetasOriginal').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Etiquetas);

		if (SalesUp.Sistema.EstaActivoModulo({Modulo:2})){
			SalesUp.Variables.UsuariosCanalizacionAutomatica(); 
		}
	}

} /* DatosProspecto */
/*
SalesUp.Variables.UsuariosCanalizacionAutomatica = function(){
}
*/


SalesUp.Variables.determinaSexo = function(Op){
	var nombre = Op.nombre;
	var procesaSexo = function(Op, err){
		if(Op){
			var sexo = Op.jsonDatos[0].SEXO;
			var determinado = $("#Sexo").attr('data-determinado');
			$("#Sexo").val(sexo);
		}
	}

	SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonDeterminaSexo.dbsp?buscarnombre='+nombre, callback:procesaSexo});
}



SalesUp.Variables.MasDatos = function(){
	SalesUp.Sistema.MuestraEspera('',4);
	SalesUp.Variables.arrCamposSimples = SalesUp.Sistema.qryString({Formulario:'#contenedorTabs', array:true});
	SalesUp.Variables.ProspectoAvanzado = true;
	if(_.size($EtiquetasProspecto)>0){ $EtiquetasProspecto[0].selectize.destroy();}
	setTimeout(function(){
		SalesUp.Variables.ContruyeFormulario();
		SalesUp.Variables.llenaControles();
	}, 10);
}

SalesUp.Variables.CargaCatalogosActivos = function(){
	var idtab = $('[data-idventana="1"][data-tabdefault="1"]').attr('id');
	var $tab = $('#div'+idtab);
	$tab.find('.clear').remove();
	$tab.append(BoxCatalogosActivos);
	SalesUp.Sistema.CatalogosActivos({EstoyEn:'PopUpProspectos'});

	idtab = $('[data-idventana="1"][data-tabdefault="4"]').attr('id');
	$tab = $('#div'+idtab);
	$tab.find('.clear').remove();
	$tab.append('<div id="ContenidoEmpresa"></div>');
	SalesUp.Sistema.CatalogosActivos({EstoyEn:'PopUpEditarEmpresa'});
}

SalesUp.Variables.ContruyeFormulario = function(){
	SalesUp.Variables.ConstruyeTabs();
	SalesUp.Variables.ConstruyeCampos();
	
	$('#Titulo, #Origen, #Fase, #Industria, #GrupoEmpresarial, #pMunicipio').removeClass('InfoData');
	$('#CS-4, #CS-20, #CS-21, #CS-22, #CS-23').removeClass('InfoData');
	
	SalesUp.Variables.DatosInbox();
	SalesUp.Variables.DatosProspecto();
	SalesUp.Variables.EtiquetasSelectize();
	IniciaSelectizeCompanias();
	
	//SalesUp.Variables.EmpresaSeleccionada = '';
	SelectizeSeleccionarEmpresa(SalesUp.Variables.EmpresaSeleccionada);	

	setTimeout(function(){
		IniciaSelectize({Control:'Titulo'});
		IniciaSelectize({Control:'Fase'});
		IniciaSelectize({Control:'Origen'});
		IniciaSelectize({Control:'Industria'});
		IniciaSelectize({Control:'GrupoEmpresarial'});
		if(!SalesUp.Variables.EditarProspecto)SalesUp.Variables.iniSelectizeMunicipio({m:'pMunicipio'});
	},300);

	$('.selectize-control').addClass('InfoData');
	$('li[data-idventana="1"][data-tabdefault="4"]').hide();
	$('li[data-idventana="3"][data-tabdefault="4"]').hide();

}/*ContruyeFormulario*/

SalesUp.Variables.SeparaCadena = function(dato){
   
  var datos = [];
  var dato = dato.split(' ');
    
  switch (dato.length) {
    case 0:
      datos = ['', ''];
        break;
    case 1:
      datos = [dato[0], ''];
        break;
    case 2:
        datos= [dato[0] ,dato[1]];
        break;
    case 3:
        datos= [dato[0] ,dato[1] +' '+ dato[2] ];
        break;
    default:
      var finDatos='';
      for(var i=2; i<dato.length; i++)
      finDatos +=' '+dato[i]; 
      
        datos= [dato[0]+' '+dato[1] ,finDatos];
	} 
   
	return datos;
}


SalesUp.Variables.DatosInbox = function(){
	if(SalesUp.Variables.datosInbox){
		var dato = SalesUp.Sistema.Encript({cadena:SalesUp.Variables.datosInbox, tipo:'decode'});
		var info = dato.split('|');
		
		var cadenas = SalesUp.Variables.SeparaCadena(info[0]);
		$('#Nombre').val(cadenas[0]);
		$('#Apellidos').val(cadenas[1]);

		$('#Correo').val(info[1]);
		SalesUp.Variables.ValidaEmail({t:$('#Correo'),v:info[1]});

		$('#BtnAceptaryVer, #BtnAceptaryNuevo').hide();
	}
}/*SalesUp.Variables.DatosInbox*/



function GeneraCanalizacion(){
	var pasa = SalesUp.Variables.ValidaCatalogosCanalizados();
	if(pasa){ pasa = SalesUp.Variables.validaCanalizacion(); }
	if(pasa){ $('#AgregarVerAvanzado').val(2);SalesUp.Variables.EnviarFormaAvanzado(); }
}

SalesUp.Variables.CrearNuevo = false;
SalesUp.Variables.EditarProspecto = false;
if((SalesUp.Variables.VerSistema==1)&&(SalesUp.Variables.sNivel==1)){ SalesUp.Variables.CrearNuevo = true; }

(SalesUp.Variables.IdProspecto!='') ? SalesUp.Variables.EditarProspecto = true : '' ;
(SalesUp.Variables.tkp!='') ? SalesUp.Variables.EditarProspecto = true : '' ;

(_.isEmpty(SalesUp.Variables.EsCliente)) ? SalesUp.Variables.EsCliente = 0 : '';

if(SalesUp.Variables.EsCliente==1){ idventana=3; SalesUp.Variables.AlmacenFases = 'jsonFasesClientes'; }
SalesUp.Variables.ProspectoAvanzado = true;

SalesUp.Variables.compartirElProspecto = function(Op){
  var t = Op.t, $t = $(t), compartirCon = Op.compartirCon;
  var activo = $t.is(':checked');
  (activo) ? $('#compartirCon').val(compartirCon) : $('#compartirCon').val('');
}

SalesUp.Variables.muestraAvisoDuenioEmpresa = function(Op){
  $('#popupDuenioEmpresa').remove();
  var laEmpresa = Op.Empresa, duenioEmpresa = Op.duenioEmpresa, tku = Op.tku, queEs = (SalesUp.Variables.EsCliente) ? 'cliente' : 'prospecto';
  var avisoDuenioEmpresa = '';
  avisoDuenioEmpresa = '<h2 class="Rojo w100 pb5 tCen"><i class="fa fa-warning"></i> Atención</h2><div class="clear"></div>';
  avisoDuenioEmpresa += '<br/><div style="font-size:14px;" class="w100">La empresa <b><i>[EMPRESA]</i></b> le pertenece a <b><i>[DUENIOEMPRESA]</i></b> por lo que se requerirá la aprobación ';
  avisoDuenioEmpresa += 'del propietario para asociar este contacto.</div><div class="clear"></div>';
  avisoDuenioEmpresa += '<br/><br/><div class="w100">';
  avisoDuenioEmpresa += ' <label class="Pointer">';
  avisoDuenioEmpresa += ' 	<input onchange="SalesUp.Variables.compartirElProspecto({t:this, compartirCon:\''+tku+'\'});" type="checkbox"/>';
  avisoDuenioEmpresa += ' 	<i class="fa fa-users"></i> Compartir el '+queEs+' con el propietario.';
  avisoDuenioEmpresa += ' </label>';
  avisoDuenioEmpresa += '</div>';

  avisoDuenioEmpresa = SalesUp.Sistema.StrReplace('[EMPRESA]', laEmpresa, avisoDuenioEmpresa);
  avisoDuenioEmpresa = SalesUp.Sistema.StrReplace('[DUENIOEMPRESA]', duenioEmpresa, avisoDuenioEmpresa);

  SalesUp.Construye.MuestraAlerta({
    TipoAlerta:'AlertaModal',
    Alerta:avisoDuenioEmpresa,
    Alto:'170px', Ancho:'380px', Id:'popupDuenioEmpresa'
  });

  setTimeout(function(){
    $('#popupDuenioEmpresa .HeadModal').remove();
  },100);

	var idContenedor = '#'+$('[data-tabdefault="4"]').attr('aria-controls');
	var $idContenedor = $(idContenedor);

	$idContenedor.find('div').hide();
	

	var sinResultados = '';
	sinResultados += '<div class="SinResultados BoxSizing w100">';
	sinResultados += ' <i class="fa fa-info-circle"></i> ';
	sinResultados += ' Cuando <b><i>[DUENIOEMPRESA]</i></b> permita agregar el contacto a la empresa, podrás ver la información de la empresa.';
	sinResultados += '</div>';
	sinResultados += '';
	sinResultados = SalesUp.Sistema.StrReplace('[DUENIOEMPRESA]', duenioEmpresa, sinResultados);
	$idContenedor.append(sinResultados).append('<div class="clear"></div>');

}/*muestraAvisoDuenioEmpresa*/

SalesUp.Variables.validaDuenioEmpresa = function(){ /*return true;*/
  var empresaSeleccionada = $('#Empresa').val();
  var jCompanias = SalesUp.Variables.jsonCompaniasInformacion.jsonDatos;
  var sTku = SalesUp.Variables.sTku;
  empresaSeleccionada = (empresaSeleccionada)?parseInt(empresaSeleccionada):0;
  jCompanias = _.where(jCompanias,{IdCompania:empresaSeleccionada});
  jCompanias = jCompanias[0];
  if (!jCompanias) {return;}
  var tkuDuenio = jCompanias.tku, puedeUtilizarEmpresa = jCompanias.puedeUtilizarEmpresa;
  //console.info('puedeUtilizarEmpresa',puedeUtilizarEmpresa);
  $('#autorizacionPendiente').val('');
  if(puedeUtilizarEmpresa==0 && !SalesUp.Variables.EditarProspecto){
  	$('#autorizacionPendiente').val(1);
    SalesUp.Variables.muestraAvisoDuenioEmpresa(jCompanias);
    return false;
  }
  if(SalesUp.Variables.jsonDatosProspecto){
  	var dP = SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].autorizacionPendiente;
  	if (dP){$('#autorizacionPendiente').val(dP);}	
  }
  
  return true;
}/*validaDuenioEmpresa*/




$(function(){
	SalesUp.Variables.ContenidoCanalizacion = $('#ContenidoCanalizacion').html();
	$('#ContenidoCanalizacion').html('');
	$('#EsCliente, #SimpleEsCliente').val(SalesUp.Variables.EsCliente);
	$('#IdProspecto, #IdProspectoSimple').val(SalesUp.Variables.IdProspecto);
	$('#tkp').val(SalesUp.Variables.tkp);	
	
	if(SalesUp.Variables.tkCom!=''){SalesUp.Variables.agregarAEmpresa = true;}

	if(SalesUp.Variables.Avanzado==1){
		SalesUp.Variables.ContruyeFormulario();
	}else{
		if(SalesUp.Variables.EditarProspecto){
			/*Editar*/
			SalesUp.Variables.ContruyeFormulario();
			SalesUp.Variables.llenaControles();
			$('#FrmProspectosAvanzado').attr('action','/privado/Modelo/qryEditarProspecto.dbsp');
			$('#BtnAceptaryVer, #BtnAceptaryNuevo').remove();
			$('#BtnAceptar').html('<i class="fa fa-save"></i> Guardar');
			SalesUp.Variables.NoCambiarEmpresa = 0;
		}else{
			/*Nuevo*/
			SalesUp.Variables.ProspectoAvanzado = false;
			SalesUp.Variables.ContruyeFormulario();
			SalesUp.Variables.NoCambiarEmpresa = 1;
		}
	}

	FocusInfoLabel();
	$('#Nombre').focus();
	$('input, form').attr('autocomplete','off');
	$('#nEmpleados').addClass('numero');
	OcultarOverlay();
	SalesUp.Sistema.IniciaPlugins();

	var $liEmpresa = $('li[data-idventana="1"][data-tabdefault="4"]');
	if(!_.size($liEmpresa)){
	  $liEmpresa = $('li[data-idventana="3"][data-tabdefault="4"]');
	}

	var $divEmpresa, arrObligatoriosEmpresas;

	$divEmpresa = '#div'+$liEmpresa.attr('id');
	$divEmpresa = $($divEmpresa);
	$divEmpresa.find('input').removeAttr('onblur')

});/*/ready*/


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
     var tkCom = SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].tkCom;
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
	(!Op) ? Op = {} : '';
	(Op.DentroDe) ? $DentroDe = $(Op.DentroDe) : '';
	$DentroDe.find('.InfoUnico').each(function(){
		Pasa = SalesUp.Variables.EsEmpresaUnica({ Elemento: this, Valor: $(this).val() });
		if(!Pasa){return Pasa;}
	});
	return Pasa;
}/* /ValidaCamposUnicos */