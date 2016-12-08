
var $SelectizeIndustria, $SelectizeFase, $SelectizeOrigen, $SelectizeCompanias, $SelectizeGrupos, $SelectizeTitulo, $SelectizeMunicipioProspecto, $SelectizeMunicipioEmpresa;


SalesUp.Variables.ObligatorioFase = false;
SalesUp.Variables.ObligatorioOrigen = false;
SalesUp.Variables.ObligatorioTitulo = false;
SalesUp.Variables.ObligatorioEstado = false;
SalesUp.Variables.ObligatorioIndustria = false;

SalesUp.Variables.TemplateOpcionTitulos = '<option data-esCanalizado="{{esCanalizado}}" value="{{IdTitulo}}">{{Titulo}}</option>';
SalesUp.Variables.TemplateOpcionFase = '<option data-esCanalizado="{{esCanalizado}}" value="{{IdFase}}">{{Fase}}</option>';
SalesUp.Variables.TemplateOpcionOrigen = '<option data-esCanalizado="{{esCanalizado}}" value="{{IdOrigen}}">{{Origen}}</option>';
SalesUp.Variables.TemplateOpcionPaises = '<option data-esCanalizado="{{esCanalizado}}" value="{{IdPais}}" {{#if Seleccionado}}selected="selected"{{/if}}>{{Pais}}</option>';
SalesUp.Variables.TemplateOpcionEstados = '<option value="{{IdEstado}}" {{#if Seleccionado}}selected="selected"{{/if}}>{{Estado}}</option>';
SalesUp.Variables.TemplateOpcionIndustria = '<option data-esCanalizado="{{esCanalizado}}" value="{{IdIndustria}}" {{#if Seleccionado}}selected="selected"{{/if}}>{{Industria}}</option>';
SalesUp.Variables.TemplateOpcionGruposEmpresariales = '<option value="{{Id}}" {{#if Seleccionado}}selected="selected"{{/if}}>{{GrupoEmpresarial}}</option>';
SalesUp.Variables.TemplateOpcionPersonalizado = '<option data-esCanalizado="{{esCanalizado}}" value="{{IdOpcion}}">{{Opcion}}</option>';
SalesUp.Variables.TemplateOpcionSexo = '<option value="{{Id}}">{{Sexo}}</option>';

$('#Tabs').tabs();

SalesUp.Variables.ConfiguracionCamposSistema = function(){
	SalesUp.Variables.jsonConfiguracionCamposSistema = SalesUp.Sistema.CargaDatos({ Link:'/privado/Modelo/jsonConfiguracionCamposSistema.dbsp', DataType:'json', Almacen:'jsonConfiguracionCamposSistema' });

	$.each(SalesUp.Variables.jsonConfiguracionCamposSistema.jsonDatos, function(i, Opciones){
		var Restriccion = '';
		var TipoRestriccion = parseInt(Opciones.Restriccion);
		var $Elemento = $('#'+Opciones.IdHtml);

		switch (TipoRestriccion){
			case 1: Restriccion = 'InfoUnico'; break;
			case 2: Restriccion = 'InfoObligatorio'; break;
			case 3: Restriccion = 'InfoUnico InfoObligatorio'; break;
			case 4: Restriccion = 'InfoSugerido'; break;
			default: Restriccion = '';
		}

		(Opciones.Tip) ? $Elemento.prev().attr('tip',Opciones.Tip).addClass('Tip2') : '';
		
		(Opciones.IdC) ? $Elemento.attr('idc',Opciones.IdC) :'';
		(TipoRestriccion!=0) ? $Elemento.addClass(Restriccion):'';
		(Opciones.Mostrar==0) ? $Elemento.parent().remove() :'';
		if( (Opciones.IdHtml=='Empresa') && (Opciones.Mostrar==0) ) { QuitarEmpresa(); }
		
		if( (TipoRestriccion==1) || (TipoRestriccion==3) ){
			var OnBlur = $Elemento.attr('onblur');
			(!OnBlur) ? $Elemento.attr('onblur','SalesUp.Variables.EsUnico({ Elemento:this, Valor:value });') : '';	
		}
		
		if((Opciones.IdHtml=='Origen') && ( (TipoRestriccion==2) || (TipoRestriccion==3) ) ){ SalesUp.Variables.ObligatorioOrigen = true; }
		if((Opciones.IdHtml=='Fase')  && ( (TipoRestriccion==2) || (TipoRestriccion==3) ) ){ SalesUp.Variables.ObligatorioFase = true; }
		if((Opciones.IdHtml=='Titulo') && ( (TipoRestriccion==2) || (TipoRestriccion==3) ) ){ SalesUp.Variables.ObligatorioTitulo = true; }
		if((Opciones.IdHtml=='Estado') && ( (TipoRestriccion==2) || (TipoRestriccion==3) ) ){ SalesUp.Variables.ObligatorioEstado = true; }
		if((Opciones.IdHtml=='Industria') && ( (TipoRestriccion==2) || (TipoRestriccion==3) ) ){ SalesUp.Variables.ObligatorioIndustria = true; }
		if((Opciones.IdHtml=='GrupoEmpresarial') && ( (TipoRestriccion==2) || (TipoRestriccion==3) ) ){ SalesUp.Variables.ObligatorioGrupoEmpresarial = true; }

	});
	
	var Par = 0;
	$('#Personales > .BoxInfoSmall').each(function(){
		Par++; $(this).removeClass('Mri');
		if((Par%2)!=0){	$(this).addClass('Mri'); }
	});

	var Par = 0;
	$('#Empresa > .BoxInfoSmall').each(function(){
		Par++; $(this).removeClass('Mri');
		if((Par%2)!=0){	$(this).addClass('Mri'); }
	});

	
} /* SalesUp.Variables.ConfiguracionCamposSistema */

function QuitarEmpresa(){
	
	$('#TabEmpresa, #TabContenidoEmpresa').remove(); 
	$('#ContenidoEmpresa').remove();
	
	/*
	$('#TabContenidoEmpresa a').html('<i class="fa fa-road"></i> Dirección');
	$('#TelefonoCorporativo, #nEmpleados, #GrupoEmpresarial, #Industria').parent().remove();
	*/

}
	

function IniciaSelectize(Op){
	
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



function EtiquetasSelectize(){
	SalesUp.Variables.jsonLtEtiquetas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonLtEtiquetas.dbsp', Parametros:'', DataType:'json', Almacen:'jsonLtEtiquetas' });
	
	$('#Etiquetas').selectize({
	    plugins: ['remove_button'],
	    delimiter: ',',
	    persist: false,
	    openOnFocus:true,
	    options: SalesUp.Variables.jsonLtEtiquetas.jsonDatos,
	    onChange: function(){ DespuesDeSeleccionarEtiqueta(this); },
	    create: SalesUp.Variables.CrearNuevo,
	    render: {
	        item: function(data, escape) {
	            return '<div class="item Tag" data-creado="'+((data.Creado) ? data.Creado : 0)+'">' + escape(data.text) + '</div>';
	        },
			option_create: function(data, escape){
				return '<div class="create AgregarNuevo Btn Btn-rounded Btn-small Btn-flat-Aceptar"><strong>Guardar</strong></div>';
			}
	    }
	});
} /* /EtiquetasSelectize */

SalesUp.Variables.CargarEstados = function(Op){
	var $ElementoPais = '';
	var ControlPais= '';
	var ControlEstado = '';
	(Op.Elemento) ? ControlPais = $(Op.Elemento).attr('id') : '';

	if(ControlPais=='pPais'){ ControlEstado = 'pEstado'; }
	if(ControlPais=='Pais'){ ControlEstado = 'Estado'; }
	if(ControlPais=='CS-18'){ ControlEstado = 'CS-19'; }
	if(ControlPais=='CS-29'){ ControlEstado = 'CS-30'; }
	
	//console.log(Op.Elemento, ControlPais, ControlEstado);

	(!Op.Estado)? SalesUp.Variables.EstadoDefault = '':'';
	(SalesUp.Variables.ObligatorioEstado) ? SalesUp.Variables.EstadoDefault = '' : '';
	$('#'+ControlEstado).html('');

	if(Op.Pais==SalesUp.Variables.PaisDefault){
		SalesUp.Variables.jsonEstados = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonEstados.dbsp', Parametros:'pd='+Op.Pais+'&edo='+SalesUp.Variables.EstadoDefault, DataType:'json', Almacen:'jsonEstados' });
	}else{
		SalesUp.Variables.jsonEstados = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonEstados.dbsp', Parametros:'pd='+Op.Pais+'&edo='+SalesUp.Variables.EstadoDefault, DataType:'json' });
	}

	SalesUp.Construye.ConstruyemeUn({
		Control: 'select', Nuevo: false,
		SeleccioneOpcion: SalesUp.Variables.ObligatorioEstado, IdControl: ControlEstado,
		Template: SalesUp.Variables.TemplateOpcionEstados,
		Datos: SalesUp.Variables.jsonEstados.jsonDatos
	});
	//console.log(ControlEstado);
	if (ControlEstado=='pEstado'){
		SalesUp.Variables.CargarMunicipiosProspecto({Estado:SalesUp.Variables.EstadoDefault, Elemento:$('#'+ControlEstado)});	
	}else if (ControlEstado=='Estado'){
		SalesUp.Variables.CargarMunicipiosEmpresas({Estado:SalesUp.Variables.EstadoDefault, Elemento:$('#'+ControlEstado)});
	}
	

}

SalesUp.Variables.CargarMunicipiosProspecto = function(Op){
	var ControlMunicipio= '', ControlEstado = '', ControlPais = '';
	(Op.Elemento) ? ControlEstado = $(Op.Elemento).attr('id') : '';

	if(ControlEstado=='pEstado'){ ControlMunicipio = 'pMunicipio'; ControlPais = 'pPais'; }
	
	if(ControlEstado=='CS-19'){ ControlMunicipio = 'CS-32'; ControlPais = 'CS-18';}
	
	var $Municipio = $('#'+ControlMunicipio);
	var $Pais = $('#'+ControlPais);
	var $Estado = $('#'+ControlEstado);
	var vPais = $Pais.val();
	var vEstado = $Estado.val();

	var jsonMunicipios = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonMunicipios.dbsp', Parametros:'edo='+vEstado+'&Pais='+vPais, DataType:'json' });
	jsonMunicipios = jsonMunicipios.jsonDatos;
	
	$Municipio.html('');
	SalesUp.Construye.ConstruyemeUn({
		Control: 'select', Nuevo: false,
		SeleccioneOpcion: true, IdControl: ControlMunicipio,
		Template: '<option value="{{IDMUNICIPIO}}">{{MUNICIPIO}}</option>',
		Datos: jsonMunicipios
	});
	if(SalesUp.Variables.jsonDatosProspecto){
		$('#pMunicipio').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdMunicipio);
		$('#InputpMunicipio').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdMunicipio);	
	}
	
	var OpcionesSelectize = {
		create: false, dropdownParent:'body', maxItems:1, persist:false, delimiter:'ª',
		onChange: function(data){$('#InputpMunicipio').val(data); SalesUp.Variables.UsuariosCanalizacionAutomatica(); }
	}
	
	setTimeout(function(){ 
		if(_.size($SelectizeMunicipioProspecto)>0){
			$SelectizeMunicipioProspecto[0].selectize.destroy();	
		}
		
		$SelectizeMunicipioProspecto  = $Municipio.selectize(OpcionesSelectize); 
	}, 500);

}/*SalesUp.Variables.CargarMunicipiosProspecto*/


SalesUp.Variables.CargarMunicipiosEmpresas = function(Op){
	
	return;

	var ControlMunicipio= '', ControlEstado = '', ControlPais = '';
	(Op.Elemento) ? ControlEstado = $(Op.Elemento).attr('id') : '';
	
	if(ControlEstado=='Estado'){ ControlMunicipio = 'Municipio'; ControlPais = 'Pais'; }
	if(ControlEstado=='CS-30'){ ControlMunicipio = 'CS-33'; ControlPais = 'CS-29';}
	
	var $Municipio = $('#'+ControlMunicipio);
	var $Pais = $('#'+ControlPais);
	var $Estado = $('#'+ControlEstado);
	var vPais = $Pais.val();
	var vEstado = $Estado.val();

	var jsonMunicipios = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonMunicipios.dbsp', Parametros:'edo='+vEstado+'&Pais='+vPais, DataType:'json' });
	jsonMunicipios = jsonMunicipios.jsonDatos;

	if(_.size($SelectizeMunicipioEmpresa)>0){
		$SelectizeMunicipioEmpresa[0].selectize.destroy();	
	}
	
	$Municipio.html('');

	SalesUp.Construye.ConstruyemeUn({
		Control: 'select', Nuevo: false,
		SeleccioneOpcion: true, IdControl: ControlMunicipio,
		Template: '<option value="{{IDMUNICIPIO}}">{{MUNICIPIO}}</option>',
		Datos: jsonMunicipios
	});

	/*
	if(SalesUp.Variables.jsonDatosProspecto){
		$('#pMunicipio').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdMunicipio);
		$('#InputpMunicipio').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdMunicipio);	
	}
	*/

	var OpcionesSelectize = {
		create: false, dropdownParent:'body', maxItems:1, persist:false, delimiter:'ª',
		onChange: function(data){ $('#MunicipioEmpresa').val(data); }
	}
	
	$SelectizeMunicipioEmpresa  = $Municipio.selectize(OpcionesSelectize);

}/*SalesUp.Variables.CargarMunicipiosProspecto*/

function IniciaSelectizeCompanias(){
	SalesUp.Variables.EmpresaAgregada = false;
	SalesUp.Variables.typeEmpresa = '';

	$SelectizeCompanias = $('#Empresa').selectize({
	 	/*plugins: ['restore_on_backspace'],*/
		valueField: 'IdCompania',
	    labelField: 'Empresa',
	    searchField: ['Empresa'],
	    maxItems: 1,
	    options: [],
		delimiter:'ª',
	    persist: false,
	    create: true,
	    createOnBlur: true,
	    selectOnTab:true,
	    onChange: function(){ DespuesDeSeleccionarCompania({Control:2}); },
	    onType:function(str){ 
	    	SelectCompania.clearOptions(); SalesUp.Variables.typeEmpresa = str;
		    if(str.length==0){
		     	SelectCompania.setValue(['']);	
		    }
	    },onClear: function(){
	 		//console.log('onClear');
	 		$('#CrearNuevaEmpresa').remove();
	 	},
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

	    	setTimeout(function(){ 
	    		$('.selectize-dropdown.SelectEmpresa').hide();
	    		
	    		/*if(!_.isUndefined($('.SelectEtiquetas .selectize-input.items.not-full.has-options > input').attr('style'))){
					$('.SelectEtiquetas .selectize-input.items.not-full.has-options > input').focus();	
				}else{
					SiguienteFocus('.SelectEmpresa .selectize-input.items.has-options.full.has-items > input');	
				}*/
	    	}, 20);
			
		},
	    render: {
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
			option_create: function(data, escape){
				/*return '<div class="create"><strong>' + escape(data.input) + '</strong>&hellip;</div>';*/
				return '';
			}
		},
	    load: function(query, callback){
	    	if (!query.length) return callback();
	    	
	        if (query.length>=3){
	        	MostrarGuardandoNuevo('Empresa');
	        	SelectCompania.clearOptions();
	        	
	        	callback();
	        	SalesUp.Variables.jsonCompanias = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCompanias.dbsp', Parametros:{ q: query }, DataType:'json'});
	        	OcultarGuardandoNuevo('Empresa');
	        	$('#CrearNuevaEmpresa').remove();
				
	        	var v = "'"+query+"'";
	        	$('.selectize-control.SelectEmpresa').append('<div id="CrearNuevaEmpresa" class="Pointer AgregarNuevo Btn Btn-rounded Btn-tiny Btn-flat-Aceptar" onclick="NuevaCompania({t:this, v:'+v+', c:2});"><strong>Crear empresa</strong></div>');
	        	

	        	//if(_.size(SalesUp.Variables.jsonCompanias.jsonDatos[0])==0){ }

	        	callback(SalesUp.Variables.jsonCompanias.jsonDatos);

	        }
	    }
	});
	var SelectCompania;
	if($('#Empresa').attr('id')){
		SelectCompania = $SelectizeCompanias[0].selectize;		
	}
} /* /IniciaSelectizeCompanias */

function DespuesDeSeleccionarCompania(Op){
	//console.log('DespuesDeSeleccionarCompania ',SalesUp.Variables.ActualizarDatosCompanias);


	if(Op.Control==1){
		var $input = $('#CS-3.selectized');
	}else{
		var $input = $('#Empresa.selectized');
	}
	
	var Valor = $input.val();
	
//	console.log('Editar ',Valor, SalesUp.Variables.EditarProspecto, SalesUp.Variables.NoCambiarEmpresa, SalesUp.Variables.EmpresaAgregada);

	OcultarGuardandoNuevo('Empresa');
	SalesUp.Variables.ActualizarDatosCompanias = 0;
	ValidarCambiodeInformacion();
	
	//console.log(Valor);
	
	if( !_.isNaN(parseInt(Valor)) ){
		
		$('#CrearNuevaEmpresa').remove();
		$('#IdEmpresa, #SimpleIdEmpresa').val(Valor);
		$('#TabContenidoEmpresa').show();
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
				setTimeout(function() {
					$('.selectize-dropdown.SelectEmpresa').hide();
					if(!_.isUndefined($('.SelectEtiquetas .selectize-input.items.not-full.has-options > input').attr('style'))){
						$('.SelectEtiquetas .selectize-input.items.not-full.has-options > input').focus();	
					}else{
						SiguienteFocus('.SelectEmpresa .selectize-input.items.has-options.full.has-items > input');	
					}
				}, 20);
			}
		} /* / if(SalesUp.Variables.EditarProspecto) */
		
	}else{
		if(Valor==''){
			//console.log('Vacio');
			$('#CrearNuevaEmpresa').remove();
			$('#TabContenidoEmpresa').hide();
		}
	}
	/* /if( !_.isNaN(parseInt(Valor)) ) */
	
	setTimeout(function(){
		if($('#Empresa').hasClass('InfoSugerido')){
			SalesUp.Buscar.BuscarSugeridos({ Elemento:$('#Empresa'), Valor:Valor }); 	
		} 
	}, 500);

}/* /DespuesDeSeleccionarCompania */


SalesUp.Variables.ReemplazarInformacionEmpresa = function(){
	

	if(!_.isUndefined(window.$SelectizeIndustria)){
		var ControlSelectizeIndustria = $SelectizeIndustria[0].selectize;
		ControlSelectizeIndustria.setValue([SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdIndustria]);	
	}

	if(!_.isUndefined(window.$SelectizeGrupos)){
		var ControlSelectizeGrupos = $SelectizeGrupos[0].selectize;
		ControlSelectizeGrupos.setValue([SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdCompaniaGrupo]);	
	}

	$('#TelefonoCorporativo, #CS-24').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].TelefonoCorporativo );
	$('#PaginaWeb, #CS-12').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Url );
	$('#nEmpleados, #CS-11').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].nEmpleados );
	$('#Pais, #CS-18').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdPais );

	SalesUp.Variables.CargarEstados({Pais:SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdPais, Elemento:$('#Pais, #CS-18')});
	
	$('#Estado, #CS-19').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdEstado );
	$('#Ciudad, #CS-15').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Ciudad );
	$('#CodigoPostal, #CS-16').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].CodigoPostal );
	$('#Calle, #CS-13').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Direccion1 );
	$('#Colonia, #CS-14').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Direccion2 );

	$('#Com-CatalogoOpcion1').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Com_OpcionCatalogo1 );
	$('#Com-CatalogoOpcion2').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Com_OpcionCatalogo2 );
	$('#Com-CatalogoOpcion3').val( SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Com_OpcionCatalogo3 );


	SalesUp.Variables.ActualizarDatosCompanias = 1;
	ValidarCambiodeInformacion();

}/* /SalesUp.Variables.ReemplazarInformacionEmpresa */

function SelectizeSeleccionarEmpresa(query){ 

	var SeleccionarEmpresa;
	if($('#Empresa').attr('id')){
		SeleccionarEmpresa = $SelectizeCompanias[0].selectize;		
	}

	if(SeleccionarEmpresa){
		var SeleccionarEmpresa = $SelectizeCompanias[0].selectize;
		SeleccionarEmpresa.clearOptions();
		SalesUp.Variables.ActualizarDatosCompanias = 0;
		//console.log('asd ', SalesUp.Variables.ActualizarDatosCompanias);
		
		SeleccionarEmpresa.load(function(callback){
			
			if( ( SalesUp.Sistema.EsNumero(query) ) && ( query!='0') ){
				//console.log('Existe - ',query);
				SalesUp.Variables.jsonCompanias = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCompaniasId.dbsp', Parametros:{ q: query }, DataType:'json' });
				//console.log('asd1 ', SalesUp.Variables.ActualizarDatosCompanias);
				if(_.size(SalesUp.Variables.jsonCompanias.jsonDatos[0])==0){
					$('#CrearNuevaEmpresa').remove();
					var v = "'"+query+"'";
					$('.selectize-control.SelectEmpresa').append('<div id="CrearNuevaEmpresa" class="Pointer AgregarNuevo Btn Btn-rounded Btn-tiny Btn-flat-Aceptar" onclick="NuevaCompania({t:this, v:'+v+'});"><strong>Crear empresa</strong></div>');
				}
				callback(SalesUp.Variables.jsonCompanias.jsonDatos);
				SeleccionarEmpresa.setValue([query]);
			}else{
				//console.log('No existe - ',query, ' - ',query.length);
				SalesUp.Variables.NoCambiarEmpresa=1;
				if(query.length>0){
					SeleccionarEmpresa.addOption({ IdCompania: query, Empresa: query });
			    	SeleccionarEmpresa.setValue([query]);
			    	
			    	SalesUp.Variables.NoCambiarEmpresa=1;
		    		var v = "'"+query+"'";
		    		$('.selectize-control.SelectEmpresa').append('<div id="CrearNuevaEmpresa" class="Pointer AgregarNuevo Btn Btn-rounded Btn-tiny Btn-flat-Aceptar" onclick="NuevaCompania({t:this, v:'+v+'});"><strong>Crear empresa</strong></div>');
		    	}
			}
	    });
		//console.log('asd2 ', SalesUp.Variables.ActualizarDatosCompanias);
	} /* if(SeleccionarEmpresa) */

		
} /* /SelectizeSeleccionarEmpresa */

function IniciaSelectizeCompaniasSimple(){
	SalesUp.Variables.EmpresaAgregada = false;
	SalesUp.Variables.typeEmpresa = '';
	$SelectizeCompanias = $('#CS-3').selectize({
	 	/*plugins: ['restore_on_backspace'],*/
		valueField: 'IdCompania',
	    labelField: 'Empresa',
	    searchField: ['Empresa'],
	    maxItems: 1,
	    options: [],
	    persist: false,
	    create: true,
	    createOnBlur: true,
	    selectOnTab:true,
	    onChange: function(){ DespuesDeSeleccionarCompania({Control:1}); },
	    onType:function(str){
	     SelectCompania.clearOptions(); SalesUp.Variables.typeEmpresa = str;
	     if(str.length==0){ SelectCompania.setValue(['']); }
	 	},onClear: function(){
	 		//console.log('onClear');
	 		$('#CrearNuevaEmpresa').remove();
	 	},
	    onDropdownClose:function(){
	    	var IdEmpresa = SelectCompania.getValue();
	    	
	    	if(_.isEmpty(IdEmpresa)){
	    		
	    		SelectCompania.addOption({
					IdCompania: SalesUp.Variables.typeEmpresa,
					Empresa: SalesUp.Variables.typeEmpresa
				});
		    	SelectCompania.setValue([SalesUp.Variables.typeEmpresa]);
		    	$('#SimpleIdEmpresa').val(SalesUp.Variables.typeEmpresa);
	    	}

	    	setTimeout(function(){
	    		$('.selectize-dropdown.SelectCS-3').hide();
	    		//SiguienteFocus('.SelectCS-3 .selectize-input.items.has-options.full.has-items > input'); 
	    	}, 20);
			
		},
	    render: {
	    	item: function(item, escape){
	    		var icono = '';
	        	if( !_.isNaN(parseInt(item.IdCompania)) ){
	        		icono = '<i class="fa fa-building-o"></i>';
	        	}

	    		return '<div>' + (item.Empresa ? '<span class="NombreEmpresa"> ' +icono+' ' + escape(item.Empresa) + '</span>' : '') + '</div>';
	        },
	        option: function(item, escape){
	        	var icono = '<i class="fa fa-building-o"></i>';
	        	if( _.isNaN(parseInt(item.IdCompania)) ){
	        		icono = '<i class="fa fa-angle-right"></i>';
	        	}
	        	return '<div class="BoxInfoContacto">' + ( item.Empresa ? '<span class="EmpresaContacto Ellipsis">'+icono+' ' + escape(item.Empresa) + '</span>' : '' ) + '</div>';
	        },
			option_create: function(data, escape){
				/*return '<div class="create"><strong>' + escape(data.input) + '</strong>&hellip;</div>';*/
				return '';
			}
		},
	    load: function(query, callback){
	    	
	    	//if(query.length==0){$('#CrearNuevaEmpresa').remove();}

	    	if (!query.length) return callback();
	    	
	    	if (query.length>=3){
	    		SelectCompania.clearOptions();
	        	callback();
	        	MostrarGuardandoNuevo('CS-3');
	        	SalesUp.Variables.jsonCompanias = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCompanias.dbsp', Parametros:{ q: query }, DataType:'json' });
	        	OcultarGuardandoNuevo('Empresa');
	        	$('#CrearNuevaEmpresa').remove();
				var v = "'"+query+"'";
				if(SalesUp.Variables.CrearNuevo){
					$('.selectize-control.SelectCS-3').append('<div id="CrearNuevaEmpresa" class="Pointer AgregarNuevo Btn Btn-rounded Btn-tiny Btn-flat-Aceptar" onclick="NuevaCompania({t:this, v:'+v+', c:1});"><strong>Crear empresa</strong></div>');	
				}
				
				/*
	        	if(_.size(SalesUp.Variables.jsonCompanias.jsonDatos[0])==0){ }
	        	*/
	        	callback(SalesUp.Variables.jsonCompanias.jsonDatos);

	        }
	    }
	});
	var SelectCompania = '';
	if(!_.isUndefined( $('#CS-3').attr('id') )){
		SelectCompania = $SelectizeCompanias[0].selectize;
	}
	


} /* /IniciaSelectizeCompaniasSimple */

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


}

function SiguienteFocus(t){
	var $Input = $(t);
	var inputs = $Input.closest('form').find(':input');
	inputs.eq( inputs.index($Input)+ 1 ).focus();
}

function LimpiarDatosEmpresa(){
	if(!_.isUndefined(window.$SelectizeIndustria)){
		var ControlSelectizeIndustria = $SelectizeIndustria[0].selectize;
		ControlSelectizeIndustria.setValue(['']);
	}
	
	SalesUp.Variables.CargarEstados({Pais:SalesUp.Variables.PaisDefault, Estado:SalesUp.Variables.EstadoDefault, Elemento:$('#CS-18') });
	$('#TelefonoCorporativo, #Url, #nEmpleados, #Ciudad, #CodigoPostal, #Calle, #Colonia').val('');
	$('#CS-11, #CS-12, #CS-13, #CS-14, #CS-15, #CS-16, #CS-18, #CS-24').val('');

}

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
	self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:520+Aumenta});

	//setTimeout(function() { SiguienteFocus('.SelectEtiquetas .selectize-input.items.has-options.full.has-items > input'); }, 20);
}/* /DespuesDeSeleccionarEtiqueta */

function CampoPersonzaliables(){
	var DatoParametro = 'ven=1';
	var cpAlmacen = 'jsonCamposPersonalizadosProspectos';

	(SalesUp.Variables.EsCliente==1) ? cpAlmacen = 'jsonCamposPersonalizadosCliente' : '';
	(SalesUp.Variables.EsCliente==1) ? DatoParametro = 'ven=3' : '';

	SalesUp.Variables.jsonRespuesta = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCamposPersonalizados.dbsp', Parametros: DatoParametro, DataType:'json' , Almacen:cpAlmacen });
	SalesUp.Variables.HtmlFormulario = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateFormularios.dbsp', Almacen:'HtmlFormulario' });
	
	if(SalesUp.Variables.jsonRespuesta.Registros.TotalRegistros>0){
		
		SalesUp.Construye.ReemplazaTemplate({
			Template: SalesUp.Variables.HtmlFormulario, 
			Destino: '#Personalizados',
			Datos: SalesUp.Variables.jsonRespuesta.jsonDatos
		});
		var Par = 0;
		$('#Personalizados .BoxInfo').each(function(){
			Par++; $(this).addClass('BoxInfoSmall');
			if((Par%2)!=0){	$(this).addClass('Mri'); }
		});

		$('select[idcampoper]').each(function(){
			
			SalesUp.Variables.IdCampo = $(this).attr('idcampoper');
			SalesUp.Variables.IdPersonalizable = $(this).attr('id');
			SalesUp.Variables.ObligatorioOpcion = $(this).hasClass('InfoObligatorio');
			
			SalesUp.Variables.jsonOpciones = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonOpcionesPersonalizados.dbsp', Parametros:{ IdCampo:SalesUp.Variables.IdCampo }, DataType:'json', Almacen:'jsonOpciones'+SalesUp.Variables.IdCampo });

			SalesUp.Construye.ConstruyemeUn({
				Control: 'select', Nuevo: false,
				SeleccioneOpcion: SalesUp.Variables.ObligatorioOpcion, 
				IdControl: SalesUp.Variables.IdPersonalizable,
				Template: SalesUp.Variables.TemplateOpcionPersonalizado, 
				Datos: SalesUp.Variables.jsonOpciones.jsonDatos
			});
		});

		$('option').each(function(){ if(!$(this).html()){$(this).remove();} });

		SalesUp.Variables.onblurInfoUnico();

		$('.OcultarEste').not('.NoOcultar').find('.InfoObligatorio').removeClass('InfoObligatorio');
		
		$('#Personalizados').append('<div class="clear"></div>');
	}else{
		$('#TabPersonalizados').hide();
	}
}/* /CampoPersonzaliables */

function DeterminaSexo(){
	var BuscarNombre=$('#Nombre').val();
	var rel=$('#Nombre').attr('rel');
	var sel=$('#sexoseleccion').attr('sel');
	
	if((rel==1)&&(sel==0)){
		$.ajax({async:false,	cache: false,	dataType: 'html',
			url : 'ajax/jx-obten-sexo.dbsp?buscarnombre='+BuscarNombre,
			success : function(data) {
				$("#resultsexo").html(data);
			}
		});
		
		var resultsexo=$('#sexoprospecto').val();		
		if (resultsexo=='H'){
			$("#Sexo").removeClass('remarch').removeClass('remarcm');
			$('#Sexo').addClass('remarch');
			setTimeout(function(){$('#Sexo').removeClass('remarch');},5000);
		}
		if (resultsexo=='M'){
			$("#Sexo").removeClass('remarch').removeClass('remarcm');
			$("#Sexo").addClass('remarcm');
			setTimeout(function(){$('#Sexo').removeClass('remarcm');},5000);
		}

		$("#Sexo option[value="+resultsexo+"]").attr("selected","selected") ;
		$('#Nombre').attr('rel',0);

	}else{
		$("#Sexo").removeClass('remarch').removeClass('remarcm');
	}
}/* /DeterminaSexo */

function AnadeInputs(){
	var arrayInputs = ['pCalle','Empresa','Comentarios'];

	for (var i = 0; i < arrayInputs.length; i++) {
		var formInput = '#FrmProspectosAvanzado #' + arrayInputs[i];
		
		if($(formInput).length == 0){
			$('#FrmProspectosAvanzado').append('<input name="'+arrayInputs[i]+'"/>');			
		}
	};
}


function EnviarFormaAvanzado(){
	SalesUp.Sistema.MuestraEspera('',4);
	AnadeInputs();
	var Pasa = false;
	if( !SalesUp.Sistema.EsNumero($('#IdEmpresa').val()) ){ QuitarEmpresa(); }
	setTimeout(function() {
		
		Pasa = SalesUp.Variables.ValidaCamposUnicos();
		
		(Pasa) ? Pasa = SalesUp.Valida.ValidaObligatorios() : '';

		(Pasa) ? Pasa = SalesUp.Valida.ValidaFechas() : '';
		
		(Pasa) ? Pasa = SalesUp.Valida.ValidaEmail({Elemento:'#Correo', Email:$('#Correo').val()}) : '';	
		
		if(Pasa){
			/*if($('#FrmProspectosAvanzado #pCalle').length == 0){$('#FrmProspectosAvanzado').append('<input name="pCalle"/>');}
			if($('#FrmProspectosAvanzado #Empresa').length==0){ $('#FrmProspectosAvanzado').append('<input name="Empresa"/>');	}
			if($('#FrmProspectosAvanzado #Comentarios').length==0){ $('#FrmProspectosAvanzado').append('<input name="Comentarios"/>');	}*/
			$('#FrmProspectosAvanzado').submit();
		}else{
			OcultarOverlay();
		}
	}, 10);
}


function AgregaryVerAvanzado(){
	$('#AgregarVerAvanzado').val(1);
	EnviarFormaAvanzado();
}

function GeneraCanalizacion(){
	var pasa = SalesUp.Variables.ValidaCatalogosCanalizados();
	if(pasa){ pasa = SalesUp.Variables.validaCanalizacion(); }
	if(pasa){ $('#AgregarVerAvanzado').val(2);EnviarFormaAvanzado(); }
}


function AgregaryNuevo(){
	$('#AgregarOtro').val(1);
	EnviarFormaAvanzado();	
}

function EnviarFormaSimple(){
	SalesUp.Sistema.MuestraEspera('',4);
	var Pasa = false;
	
	setTimeout(function(){
		Pasa = SalesUp.Variables.ValidaCamposUnicos();

		(Pasa) ? Pasa = SalesUp.Valida.ValidaObligatorios() : '';

		(Pasa) ? Pasa = SalesUp.Valida.ValidaFechas() : '';

		(Pasa) ? Pasa = SalesUp.Valida.ValidaEmail({Elemento:'#CS-6', Email:$('#CS-6').val()}) : '';

		if(Pasa){
			if($('#FrmProspectosSimple input[name="pCalle"]').length==0){ $('#FrmProspectosSimple').append('<input name="pCalle"/>');}
			if($('#FrmProspectosSimple input[name="Empresa"]').length==0){ $('#FrmProspectosSimple').append('<input name="Empresa"/>');}
			if($('#FrmProspectosSimple textarea[name="Comentarios"]').length==0){ $('#FrmProspectosSimple').append('<input name="Comentarios"/>');	}
			$('#FrmProspectosSimple').submit();
		}else{
			OcultarOverlay();
		}
	}, 10);
} /* /EnviarFormaSimple */

function AgregaryVerSimple(){
	$('#SimpleAgregarVer').val(1);
	EnviarFormaSimple();
}

function AgregaryNuevoSimple(){
	$('#SimpleAgregaryNuevo').val(1);
	EnviarFormaSimple();
}

function ValidaEmailyUnico(Op){
	var Pasa = true;
	Pasa = SalesUp.Valida.ValidaEmail({ Elemento:Op.Elemento, Email:Op.Email });
 	(Pasa) ? Pasa = SalesUp.Variables.EsUnico({ Elemento:Op.Elemento, Valor:Op.Email }): '';
}

function ValidarCambiodeInformacion(){
	//console.log('ValidarCambiodeInformacion', SalesUp.Variables.ActualizarDatosCompanias,(new Date()).getTime());
	var ValidaCambio = function(Op){
		var $Elemento = $(Op.Elemento);
		var Valor = $Elemento.val();
		if(!_.isEmpty(Valor)){
			if($('#AlertaActualizar').length==0)
				SalesUp.Construye.MuestraMsj({tMsg:3, Id:'AlertaActualizar', Msg:'Se actualizará la información de la empresa', NoCerrar:true });
		}
	}

	if(SalesUp.Variables.ActualizarDatosCompanias==1){
		$('#ContenidoEmpresa select').change(function(){
			ValidaCambio({Elemento:this});
		});

		$('#ContenidoEmpresa input').keyup(function(){
			ValidaCambio({Elemento:this});
		});
	}else{
		//$('#ContenidoEmpresa input').unbind('keyup');
		//$('#ContenidoEmpresa select').unbind('change');	
	}

}

function VeinticuatroHoras(Op){
	for (var i = 0; i <= 23; i++){
		var Hora = '', Hora15 = '', Hora30='', Hora45='', Seleccionado='';
		var HrActual = (new Date()).getHours() + 1;
		var $Destino = $('#Hora');
		(Op.Destino)? $Destino = $(Op.Destino):'';
		(Op.HoraActual)? HrActual = Op.HoraActual:'';

		(HrActual==i)?Seleccionado='selected="selected"':'';

		if(i<10){
			Hora   = '0'+i+':00';
			Hora15 = '0'+i+':15';
			Hora30 = '0'+i+':30';
			Hora45 = '0'+i+':45';
		}else if(i>=10){
			Hora = i+':00';
			Hora15 = i+':15';
			Hora30 = i+':30';
			Hora45 = i+':45';
		} 

		$Destino.append('<option value="'+Hora+'" '+Seleccionado+'>'+Hora+'</option>');
		$Destino.append('<option value="'+Hora15+'">'+Hora15+'</option>');
		$Destino.append('<option value="'+Hora30+'">'+Hora30+'</option>');
		$Destino.append('<option value="'+Hora45+'">'+Hora45+'</option>');
	};
		
}/* /VeinticuatroHoras */

SalesUp.Variables.FocusInfoLabel = function(){
	$('.InfoData, .TextAreaData').focus(function(){
		$(this).prev().addClass('FocusInfoLabel');
	}).blur(function(){
		$(this).prev().removeClass('FocusInfoLabel');
	});
}

function OcultarOverlay(){
	$('#Overlay').remove();
}

function MostrarGuardandoNuevo(Control){
	$('.Select'+Control+' > div.selectize-input').append('<i class="GuardandoNuevo fa fa-spinner Spinner"></i>');
	$('.Select'+Control+' > div.selectize-input').addClass('OcultarTriangulo');
}

function OcultarGuardandoNuevo(Control){
	$('.GuardandoNuevo').remove();
}

function ListoOk(Control){
	$('.Select'+Control).append('<i class="ListoGuardado Verde fa fa-check"></i>');
	setTimeout(function() { 
		$('.ListoGuardado').remove(); 
		$('.Select'+Control+' > div.selectize-input').removeClass('OcultarTriangulo'); 
	}, 1000);
}

SalesUp.Variables.RegistroAvanzadoProspecto = function(){
	SalesUp.Sistema.MuestraEspera('',4);
	SalesUp.Variables.ConfiguracionCamposSistema();
	
	SalesUp.Variables.AlmacenFases = 'jsonFases';
	if(SalesUp.Variables.EsCliente==1){ SalesUp.Variables.AlmacenFases = 'jsonFasesClientes'; }
	
	
	SalesUp.Variables.jsonTitulos = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonTitulos.dbsp', DataType:'json', Almacen:'jsonTitulos'});
	SalesUp.Variables.jsonFases = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonFases.dbsp', Parametros:{TF:SalesUp.Variables.EsCliente}, DataType:'json', Almacen:SalesUp.Variables.AlmacenFases });
	SalesUp.Variables.jsonOrigen = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonOrigen.dbsp', DataType:'json', Almacen:'jsonOrigen' });
	SalesUp.Variables.jsonPaises = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonPaises.dbsp', Parametros:{pd:SalesUp.Variables.PaisDefault}, DataType:'json', Almacen:'jsonPaises' });
	SalesUp.Variables.jsonIndustria = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonIndustria.dbsp', DataType:'json', Almacen:'jsonIndustria' });
	SalesUp.Variables.jsonGruposEmpresariales = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonGruposEmpresariales.dbsp', DataType:'json', Almacen:'jsonGruposEmpresariales' });
	
	 /*SalesUp.Variables.ObligatorioTitulo*/
	SalesUp.Construye.ConstruyemeUn({
		Control: 'select', Nuevo: false,
		SeleccioneOpcion: true, IdControl: 'Titulo',
		Template: SalesUp.Variables.TemplateOpcionTitulos, 
		Datos: SalesUp.Variables.jsonTitulos.jsonDatos
	});

	SalesUp.Construye.ConstruyemeUn({
		Control: 'select', Nuevo: false,
		SeleccioneOpcion: SalesUp.Variables.ObligatorioFase, IdControl: 'Fase',
		Template: SalesUp.Variables.TemplateOpcionFase, 
		Datos: SalesUp.Variables.jsonFases.jsonDatos
	});
	
	SalesUp.Construye.ConstruyemeUn({
		Control: 'select', Nuevo: false,
		SeleccioneOpcion: SalesUp.Variables.ObligatorioOrigen,	IdControl: 'Origen',
		Template: SalesUp.Variables.TemplateOpcionOrigen,
		Datos: SalesUp.Variables.jsonOrigen.jsonDatos
	});
	
	SalesUp.Construye.ConstruyemeUn({
		Control: 'select', Nuevo: false,
		IdControl: 'Pais',
		Template: SalesUp.Variables.TemplateOpcionPaises,
		Datos: SalesUp.Variables.jsonPaises.jsonDatos
	});

	SalesUp.Construye.ConstruyemeUn({
		Control: 'select', Nuevo: false,
		IdControl: 'pPais',
		Template: SalesUp.Variables.TemplateOpcionPaises,
		Datos: SalesUp.Variables.jsonPaises.jsonDatos
	});

	SalesUp.Construye.ConstruyemeUn({
		Control: 'select', Nuevo: false,
		SeleccioneOpcion: SalesUp.Variables.ObligatorioIndustria, IdControl: 'Industria',
		Template: SalesUp.Variables.TemplateOpcionIndustria,
		Datos: SalesUp.Variables.jsonIndustria.jsonDatos
	});
	
	SalesUp.Construye.ConstruyemeUn({
		Control: 'select', Nuevo: false,
		SeleccioneOpcion: SalesUp.Variables.ObligatorioGrupoEmpresarial, IdControl: 'GrupoEmpresarial',
		Template: SalesUp.Variables.TemplateOpcionGruposEmpresariales,
		Datos: SalesUp.Variables.jsonGruposEmpresariales.jsonDatos
	});
	
	SalesUp.Variables.CargarEstados({Pais:SalesUp.Variables.PaisDefault, Estado:SalesUp.Variables.EstadoDefault, Elemento:$('#Pais')});
	SalesUp.Variables.CargarEstados({Pais:SalesUp.Variables.PaisDefault, Estado:SalesUp.Variables.EstadoDefault, Elemento:$('#pPais')});
	//Test


	CampoPersonzaliables();

	$.each(SalesUp.Variables.ValoresFormularioSimple, function(i, Opciones){
		//console.log(Opciones.name, ' - ', Opciones.value);
		var $Elemento = $('[name="'+Opciones.name+'"]');
		$Elemento.val(Opciones.value);
		if(Opciones.name=='IdEmpresa'){SalesUp.Variables.EmpresaSeleccionada = Opciones.value;}
	});

	setTimeout(function(){
		SalesUp.Sistema.CatalogosActivos({EstoyEn:'PopUpProspectos'});
		SalesUp.Variables.DatosProspecto();
		VeinticuatroHoras({});
		EtiquetasSelectize();
		IniciaSelectizeCompanias();
		
		IniciaSelectize({Control:'Titulo'});
		IniciaSelectize({Control:'Fase'});
    	IniciaSelectize({Control:'Origen'});
    	IniciaSelectize({Control:'Industria'});
    	IniciaSelectize({Control:'GrupoEmpresarial'});
    	
    	SelectizeSeleccionarEmpresa(SalesUp.Variables.EmpresaSeleccionada);
    	
    	OcultarOverlay();
    	SalesUp.Sistema.IniciaPlugins();
    	var $Correo = $('#Correo');
    	if(!$Correo.hasClass('InfoUnico')){ $Correo.removeAttr('onblur'); }
    	if($Correo.hasClass('InfoSugerido')){ $Correo.attr('onblur','SalesUp.Buscar.BuscarSugeridos({ Elemento:this, Valor:value });'); }
    	
		$('#TabAdicional').hide();
	},500);

	/*Para el determinar el sexo*/
	$('#Nombre').keyup(function(){$('#Nombre').attr('rel',1);});
	$('#Sexo').change(function(){ $('#Sexo').removeClass('remarch').removeClass('remarcm');	$('#sexoseleccion').attr('sel',1); });

	SalesUp.Variables.ValidaNumeros();
	SalesUp.Variables.Asterisco();
} /* --- SalesUp.Variables.RegistroAvanzadoProspecto --- */

SalesUp.Variables.Asterisco = function(){

	$('.InfoObligatorio').each(function(){
      $Label = $(this).prev();
      SinAsterisco = SalesUp.Sistema.StrReplace('*','',$Label.html());
      $Label.html(SinAsterisco+'*');
    }); /* InfoObligatorio each */
}

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

SalesUp.Variables.RegistroSimpleProspecto = function(){
	
	SalesUp.Variables.jsonCamposObligatorios = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCamposObligatorios.dbsp', DataType:'json', Almacen:'jsonCamposObligatorios'});

	SalesUp.Variables.HtmlFormulario = SalesUp.Sistema.CargaDatos({ Link:'/privado/Vista/TemplateFormularios.dbsp', Almacen:'HtmlFormulario' });

	SalesUp.Construye.ReemplazaTemplate({
      Template: SalesUp.Variables.HtmlFormulario,
      Destino: '#FormularioSimple',
      Datos: SalesUp.Variables.jsonCamposObligatorios.jsonDatos
    });

	$('#CS-6').attr('onblur','ValidaEmailyUnico({Elemento:this, Email:value});');
    

	$('#FormularioSimple select').each(function(){
      SalesUp.Variables.IdCampo = $(this).attr('idcampoper');
      SalesUp.Variables.IdSelect = $(this).attr('id');
      SalesUp.Variables.ObligatorioOpcion = true;

      if(SalesUp.Variables.IdCampo>0){
        SalesUp.Variables.jsonOpciones = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonOpcionesPersonalizados.dbsp', Parametros:{ IdCampo:SalesUp.Variables.IdCampo }, DataType:'json' , Almacen:'jsonOpciones'+SalesUp.Variables.IdCampo  });
        SalesUp.Variables.TemplateOpciones = SalesUp.Variables.TemplateOpcionPersonalizado;
      }else{
        SalesUp.Variables.jsonOpciones = [];
        

        SalesUp.Variables.AlmacenFases = 'jsonFases';
		if(SalesUp.Variables.EsCliente==1){ SalesUp.Variables.AlmacenFases = 'jsonFasesClientes'; }
		
		switch (SalesUp.Variables.IdSelect){
          case  'CS-4': SalesUp.Variables.LinkOpciones = '/privado/Modelo/jsonTitulos.dbsp'; SalesUp.Variables.TemplateOpciones = SalesUp.Variables.TemplateOpcionTitulos; SalesUp.Variables.ParametrosOpciones = {}; SalesUp.Variables.jsonAlmacen = 'jsonTitulos'; break;
          case 'CS-18': SalesUp.Variables.LinkOpciones = '/privado/Modelo/jsonPaises.dbsp'; SalesUp.Variables.TemplateOpciones = SalesUp.Variables.TemplateOpcionPaises; SalesUp.Variables.ParametrosOpciones = {pd:SalesUp.Variables.PaisDefault}; SalesUp.Variables.jsonAlmacen = 'jsonPaises'; break;
          case 'CS-19': SalesUp.Variables.LinkOpciones = '/privado/Modelo/jsonEstados.dbsp'; SalesUp.Variables.TemplateOpciones = SalesUp.Variables.TemplateOpcionEstados; SalesUp.Variables.ParametrosOpciones = 'pd='+SalesUp.Variables.PaisDefault; SalesUp.Variables.jsonAlmacen = 'jsonEstados'; break;
          case 'CS-20': SalesUp.Variables.LinkOpciones = '/privado/Modelo/jsonOrigen.dbsp'; SalesUp.Variables.TemplateOpciones = SalesUp.Variables.TemplateOpcionOrigen; SalesUp.Variables.ParametrosOpciones = {}; SalesUp.Variables.jsonAlmacen = 'jsonOrigen'; break;
          case 'CS-21': SalesUp.Variables.LinkOpciones = '/privado/Modelo/jsonFases.dbsp'; SalesUp.Variables.TemplateOpciones = SalesUp.Variables.TemplateOpcionFase; SalesUp.Variables.ParametrosOpciones = {TF:SalesUp.Variables.EsCliente}; SalesUp.Variables.jsonAlmacen = SalesUp.Variables.AlmacenFases; break;
          case 'CS-22': SalesUp.Variables.LinkOpciones = '/privado/Modelo/jsonIndustria.dbsp'; SalesUp.Variables.TemplateOpciones = SalesUp.Variables.TemplateOpcionIndustria; SalesUp.Variables.ParametrosOpciones = {}; SalesUp.Variables.jsonAlmacen = 'jsonIndustria'; break;
          case 'CS-23': SalesUp.Variables.LinkOpciones = '/privado/Modelo/jsonGruposEmpresariales.dbsp'; SalesUp.Variables.TemplateOpciones = SalesUp.Variables.TemplateOpcionIndustria; SalesUp.Variables.ParametrosOpciones = {}; SalesUp.Variables.jsonAlmacen = 'jsonGruposEmpresariales'; break;
          case 'CS-29': SalesUp.Variables.LinkOpciones = '/privado/Modelo/jsonPaises.dbsp'; SalesUp.Variables.TemplateOpciones = SalesUp.Variables.TemplateOpcionPaises; SalesUp.Variables.ParametrosOpciones = {pd:SalesUp.Variables.PaisDefault}; SalesUp.Variables.jsonAlmacen = 'jsonPaises'; break;
          case 'CS-30': SalesUp.Variables.LinkOpciones = '/privado/Modelo/jsonEstados.dbsp'; SalesUp.Variables.TemplateOpciones = SalesUp.Variables.TemplateOpcionEstados; SalesUp.Variables.ParametrosOpciones = 'pd='+SalesUp.Variables.PaisDefault; SalesUp.Variables.jsonAlmacen = 'jsonEstados'; break;
        }

        SalesUp.Variables.jsonOpciones = SalesUp.Sistema.CargaDatos({Link:SalesUp.Variables.LinkOpciones, Parametros:SalesUp.Variables.ParametrosOpciones, DataType:'json', Almacen:SalesUp.Variables.jsonAlmacen });
  		

  		if(SalesUp.Variables.IdSelect=='CS-5'){
			SalesUp.Variables.LinkOpciones = '';
			SalesUp.Variables.TemplateOpciones = SalesUp.Variables.TemplateOpcionSexo;
			SalesUp.Variables.jsonAlmacen = 'jsonSexo';

			var jsonsexo = '{"jsonDatos":[{"Id":"M","Sexo":"Mujer"},{"Id":"H","Sexo":"Hombre"}]}';
			SalesUp.Variables.jsonOpciones = JSON.parse(jsonsexo);
		}

      } /* else !_.isUndefined(SalesUp.Variables.IdCampo) */

      SalesUp.Construye.ConstruyemeUn({
        Control: 'select', Nuevo: false,
        IdControl: SalesUp.Variables.IdSelect,
        SeleccioneOpcion: SalesUp.Variables.ObligatorioOpcion,
        Template: SalesUp.Variables.TemplateOpciones, 
        Datos: SalesUp.Variables.jsonOpciones.jsonDatos
      });

    }); /* select each */
  	
	$('#CS-3').removeClass('InfoData').addClass('SelectCS-3');
	$('#CS-21').removeClass('InfoData').addClass('SelectCS-21');
	$('#CS-20').removeClass('InfoData').addClass('SelectCS-20');
	$('#CS-4').removeClass('InfoData').addClass('SelectCS-4');

    if( (!_.isUndefined($('#CS-18').attr('id'))) && (!_.isUndefined($('#CS-19').attr('id'))) ){
      $('#CS-18').attr('onchange','SalesUp.Variables.CargarEstados({Pais:value, Elemento:this});');
    }

    if( (!_.isUndefined($('#CS-29').attr('id'))) && (!_.isUndefined($('#CS-30').attr('id'))) ){
      $('#CS-29').attr('onchange','SalesUp.Variables.CargarEstados({Pais:value, Elemento:this});');
    }

    setTimeout(function(){
    	
    	if( !_.isUndefined($('#CS-4').attr('id')) ){
	    	IniciaSelectize({Control:'CS-4'});	
	    }

    	if( !_.isUndefined($('#CS-21').attr('id')) ){
	    	IniciaSelectize({Control:'CS-21'});	
	    }
	    
	    if( !_.isUndefined($('#CS-20').attr('id')) ){
	    	IniciaSelectize({Control:'CS-20'});	
	    }

	    if( !_.isUndefined($('#CS-22').attr('id')) ){
			IniciaSelectize({Control:'CS-22'});	
		}

		if( !_.isUndefined($('#CS-23').attr('id')) ){
			IniciaSelectize({Control:'CS-23'});	
		}

    }, 10);

    var CuantosObligatorios = _.size(SalesUp.Variables.jsonCamposObligatorios.jsonDatos);

    if(CuantosObligatorios > 3){
    	var Par=0;

	    $('#FormularioSimple .BoxInfo').each(function(){
			Par++; $(this).addClass('BoxInfoSmall');
			if((Par%2)!=0){	$(this).addClass('Mri'); }
		});	

		var Aumenta = (CuantosObligatorios / 2) - 3;
		Aumenta = SalesUp.Sistema.FormatoNumero(Aumenta);
	    
	    setTimeout(function(){ 
			SalesUp.Variables.TamanioBody = $('body').height() + 60;
			self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:SalesUp.Variables.TamanioBody, Ancho:700}); 
		}, 200);

	    /*
		if(CuantosObligatorios>6){
			self.parent.SalesUp.Sistema.AjustaAltoPopUp({ Numero:Aumenta, Aumenta:true });
		}
		*/
		
    }

    $('#DivBoxCS-3, #DivBoxCS-6').removeClass('BoxInfoSmall').removeClass('Mri');

    $('#CP-1, #CP-2, #CP-3, #CP-4').addClass('numero');
    $('#CP-5, #CP-6, #CP-7, #CP-8').addClass('decimal');
    $('#CP-9, #CP-10, #CP-11, #CP-12').addClass('Fecha');

    SalesUp.Variables.Asterisco();
    SalesUp.Variables.onblurInfoUnico();
    IniciaSelectizeCompaniasSimple();
	
	setTimeout(function(){
		$('input, form').attr('autocomplete','off');
		$('#nEmpleados').addClass('numero');
	}, 500);

	SalesUp.Sistema.IniciaPlugins();
	setTimeout(function(){
		$('#CS-1').focus();
		SalesUp.Variables.ValidaNumeros();
	}, 100);
	OcultarOverlay();

	SalesUp.Variables.AjustaVentanaPickers();

} /* --- SalesUp.Variables.RegistroSimpleProspecto --- */

SalesUp.Variables.AjustaVentanaPickers = function(){
	self.parent.SalesUp.Sistema.TamanioInicial();
	var tInicial = self.parent.SalesUp.Variables.TamanioInicial;
	var Cambia = false;
	if(tInicial<300){
		
		$('.Fecha').focus(function(){
			Cambia = false
			self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:300});
		}).blur(function(){
			Cambia = true;
			setTimeout(function(){ 
				if(Cambia){
					self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:tInicial});
					$('.ui-datepicker').hide();
				}
			}, 500);
		}).change(function(){
			Cambia = true;
			if(Cambia){
				self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:tInicial});
				$('.ui-datepicker').hide();
			}
		});
	}
}/*SalesUp.Variables.AjustaVentanaPickers*/

SalesUp.Variables.MostrarAvanzado = function(){
	//console.log('MostrarAvanzado - ',SalesUp.Variables.IdProspecto);
	OcultarOverlay();

	SalesUp.Variables.ValoresFormularioSimple = $('#FrmProspectosSimple').serializeArray();

	$('#FrmProspectosSimple').remove();

	self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:560, Ancho:700});
	
	SalesUp.Variables.RegistroAvanzadoProspecto();

	setTimeout(function() {$('input[autofocus="true"]').focus();}, 100);

	$('#FrmProspectosAvanzado').show();

	setTimeout(function(){
		$('input, form').attr('autocomplete','off');
		$('#nEmpleados').addClass('numero');
	}, 500);
	SalesUp.Variables.UsuariosCanalizacion();
}

SalesUp.Variables.DatosProspecto = function(){
	if(SalesUp.Variables.EditarProspecto){
		
		SalesUp.Variables.jsonDatosProspecto = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosProspecto.dbsp', Parametros:{idp:SalesUp.Variables.IdProspecto}, DataType:'json' });
		
		if(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].esCanalizado=='1'){
			$('[data-spmodulo="2"]').hide();
		}

		var esCanalizado = SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].esCanalizado;
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
		$('#Linkedin').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Linkedin);
		$('#Google').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Googleplus);

		$('#Campo1').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo1);
		$('#Campo2').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo2);
		$('#Campo3').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo3);
		$('#Campo4').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo4);
		$('#Campo5').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo5);
		$('#Campo6').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo6);
		$('#Campo7').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo7);
		$('#Campo8').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo8);
		$('#Campo9').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo9);
		$('#Campo10').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo10);
		$('#Campo11').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo11);
		$('#Campo12').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo12);
		$('#Campo13').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo13);
		$('#Campo14').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo14);
		$('#Campo15').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo15);
		$('#Campo16').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo16);
		$('#Campo17').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo17);
		$('#Campo18').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo18);
		$('#Campo19').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo19);
		$('#Campo20').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo20);
		$('#Campo21').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo21);
		$('#Campo22').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo22);
		$('#Campo23').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo23);
		$('#Campo24').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo24);
		$('#Campo25').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo25);
		$('#Campo26').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo26);
		$('#Campo27').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo27);
		$('#Campo28').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo28);
		$('#Campo29').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo29);
		$('#Campo30').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo30);
		$('#Campo31').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo31);
		$('#Campo32').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Campo32);
		
		$('#P-CatalogoOpcion1').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].OpcionCatalogo1);
		$('#P-CatalogoOpcion2').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].OpcionCatalogo2);
		$('#P-CatalogoOpcion3').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].OpcionCatalogo3);

		if(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdCompania!=''){
			SalesUp.Variables.EmpresaSeleccionada = SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdCompania;	
		}else{
			SalesUp.Variables.EmpresaSeleccionada = SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Empresa;
			$('#GrupoEmpresarial').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdCompaniaGrupo);
			$('#Industria').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdIndustria);
			$('#TelefonoCorporativo').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].TelefonoCorporativo);
			//$('#PaginaWeb').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Url);
			$('#nEmpleados').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].nEmpleados);
		}

		/*$('#Com-CatalogoOpcion1').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].ComOpcionCatalogo1);
		$('#Com-CatalogoOpcion2').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].ComOpcionCatalogo2);
		$('#Com-CatalogoOpcion3').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].ComOpcionCatalogo3);*/

		$('#pPais').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdPais);

		SalesUp.Variables.CargarEstados({Pais:SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdPais, Elemento:$('#pPais')});
		$('#pEstado').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdEstado);
		if(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdMunicipio==''){
			var thisEdo=$('#pEstado');
			console.info("Q pex");
			setTimeout(function() {SalesUp.Variables.CargarMunicipiosProspecto({Estado:$(thisEdo).val(), Elemento:thisEdo}); //wong  CS-19
			}, 1001);
		}else{
			setTimeout(function() {
					$('#pEstado').val(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdEstado);
					SalesUp.Variables.CargarMunicipiosProspecto({Estado:'', Elemento:$('#pEstado')});
		}, 1002);

		}


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

		SalesUp.Variables.UsuariosCanalizacionAutomatica();
	}
	


} /* /SalesUp.Variables.DatosProspecto */



SalesUp.Variables.ReemplazarDatos = function(){
	//console.log('ReemplazarDatos');
	SalesUp.Variables.ReemplazarInformacionEmpresa();
}

SalesUp.Variables.MostrarCombinarDatos = function(){
	self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:540, Ancho:700});
	//console.log('MostrarCombinarDatos');
	SalesUp.Variables.HtmlCombinarDatos = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateCombinarDatos.dbsp', Almacen:'HtmlCombinarDatos' });
	SalesUp.Construye.MuestraAlerta({
		TipoAlerta:'AlertaModal',
		Id:'ModalCombiarDatos',
		Alerta: SalesUp.Variables.HtmlCombinarDatos,
		Titulo:'Combinar datos de empresa',
		BotonOk:'Combinar',
		IconoOk:'<i class="fa fa-copy"></i>',
		Callback1:'SalesUp.Variables.CombinarDatos'
	});

	/*--Empresa-- , Alto:'420px' */

	$('#ValorGrupo1').html(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Grupo);
	$('#RadioGrupo1').attr('valor',SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdGrupo);

	$('#ValorIndustria1').html(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Industria);
	$('#RadioIndustria1').attr('valor',SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdIndustria);

	$('#ValorTelefono1').html(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].TelefonoCorporativo);
	$('#RadioTelefono1').attr('valor',SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].TelefonoCorporativo);

	$('#ValorWeb1').html(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Url);
	$('#RadioWeb1').attr('valor',SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Url);

	$('#ValorEmpleados1').html(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].nEmpleados);
	$('#RadioEmpleados1').attr('valor',SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].nEmpleados);

	$('#ValorPais1').html(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Pais);
	$('#RadioPais1').attr('valor',SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdPais);

	$('#ValorEstado1').html(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Estado);
	$('#RadioEstado1').attr('valor',SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdEstado);

	$('#ValorCiudad1').html(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Ciudad);
	$('#RadioCiudad1').attr('valor',SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Ciudad);

	$('#ValorCp1').html(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].CodigoPostal);
	$('#RadioCp1').attr('valor',SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].CodigoPostal);

	$('#ValorCalle1').html(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Direccion1);
	$('#RadioCalle1').attr('valor',SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Direccion1);

	$('#ValorColonia1').html(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Direccion2);
	$('#RadioColonia1').attr('valor',SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Direccion);
	
	/*--Prospecto--*/

	$('#ValorGrupo2').html(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].CompaniaGrupo);
	$('#RadioGrupo2').attr('valor',SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdCompaniaGrupo);

	$('#ValorIndustria2').html(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Industria);
	$('#RadioIndustria2').attr('valor',SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdIndustria);

	$('#ValorTelefono2').html(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].TelefonoCorporativo);
	$('#RadioTelefono2').attr('valor',SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].TelefonoCorporativo);

	$('#ValorWeb2').html(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Url);
	$('#RadioWeb2').attr('valor',SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Url);

	$('#ValorEmpleados2').html(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].nEmpleados);
	$('#RadioEmpleados2').attr('valor',SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].nEmpleados);

	$('#ValorPais2').html(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Pais);
	$('#RadioPais2').attr('valor',SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdPais);

	$('#ValorEstado2').html(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Estado);
	$('#RadioEstado2').attr('valor',SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].IdEstado);

	$('#ValorCiudad2').html(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Ciudad);
	$('#RadioCiudad2').attr('valor',SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Ciudad);

	$('#ValorCp2').html(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Cp);
	$('#RadioCp2').attr('valor',SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Cp);

	$('#ValorCalle2').html(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Calle);
	$('#RadioCalle2').attr('valor',SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Calle);

	$('#ValorColonia2').html(SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Colonia);
	$('#RadioColonia2').attr('valor',SalesUp.Variables.jsonDatosProspecto.jsonDatos[0].Colonia);
	
	$('#ModalCombiarDatos input.RadioActivo').each(function(){
		var $Radio2 = $(this);
		var ValorDelProspecto = $Radio2.attr('valor');
		var NombreRadio = $Radio2.attr('name');
		var ValorDeEmpresa = '';
		var Id = $Radio2.attr('ide');
		var $Radio1 = $('#'+NombreRadio+'1');

		if(_.isEmpty(ValorDelProspecto)){

			ValorDeEmpresa = $Radio1.attr('valor');
			if(!_.isEmpty(ValorDeEmpresa)){
				$Radio2.removeAttr('checked');
				$Radio1.attr('checked',true);
				SalesUp.Variables.EsteDato({Elemento:$Radio1, R:2, Id:Id});		
			}else{
				$Radio1.closest('div').remove();
				$Radio2.closest('div').remove();
			}

		}

	});

}/*SalesUp.Variables.MostrarCombinarDatos*/
			
SalesUp.Variables.CombinarDatos = function(){
	//console.log('CombinarDatos');
	self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:450, Ancho:700});
}

SalesUp.Variables.EsteDato = function(Op){
	var $Elemento = $(Op.Elemento);
	var $Div = $Elemento.closest('div');
	var NomRadio = $Elemento.attr('name');
	var Valor = $Elemento.attr('valor');
	var $Rad = $('#'+NomRadio+Op.R);
	var $Div2 = $Rad.closest('div');
	$Div.find('.LabelValor').addClass('LineaVerde');
	$Div2.find('.LabelValor').removeClass('LineaVerde');
	
	if( (_.isUndefined(Valor)) || (_.isEmpty(Valor)) ){
		Valor = '';
	}

	if(NomRadio=='RadioGrupo'){
		if(!_.isUndefined(window.$SelectizeGrupos)){
			var ControlSelectizeGrupos = $SelectizeGrupos[0].selectize;
			ControlSelectizeGrupos.setValue([SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdCompaniaGrupo]);	
		}
	}else if(NomRadio=='RadioIndustria'){
		if(!_.isUndefined(window.$SelectizeIndustria)){
			var ControlSelectizeIndustria = $SelectizeIndustria[0].selectize;
			ControlSelectizeIndustria.setValue([SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdIndustria]);	
		}
	}else{
		$('#'+Op.Id).val(Valor);
	}

	//console.log('#'+Op.Id, Valor);
} /* SalesUp.Variables.EsteDato */

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


$(function(){
	//Test
	Placeholdem( $('[placeholder]') );
	$('#EsCliente, #SimpleEsCliente').val(SalesUp.Variables.EsCliente);
	$('#IdProspecto, #IdProspectoSimple').val(SalesUp.Variables.IdProspecto);
	
	(_.isEmpty(SalesUp.Variables.EsCliente)) ? SalesUp.Variables.EsCliente = 0 : '';
	SalesUp.Variables.EditarProspecto = false;

	(!_.isEmpty(SalesUp.Variables.IdProspecto)) ? SalesUp.Variables.EditarProspecto = true : '' ;
	

	if(SalesUp.Variables.Avanzado==1){
		SalesUp.Variables.MostrarAvanzado();
	}else{
		if(SalesUp.Variables.EditarProspecto){
			/*Editar*/
			$('#FrmProspectosAvanzado').attr('action','/privado/Modelo/qryEditarProspecto.dbsp');
			SalesUp.Variables.MostrarAvanzado();
			$('#BtnAceptaryVer, #BtnAceptaryNuevo').remove();
			$('#BtnAceptar').html('<i class="fa fa-save"></i> Guardar');
			SalesUp.Variables.NoCambiarEmpresa = 0;
		}else{
			/*Nuevo*/
			SalesUp.Variables.RegistroSimpleProspecto();
			SalesUp.Variables.NoCambiarEmpresa = 1;
		}
	}

	
}); /* /Ready */






