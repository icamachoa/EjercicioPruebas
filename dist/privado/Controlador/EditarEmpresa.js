
SalesUp.Variables.TemplateOpcionIndustria = '<option value="{{IdIndustria}}" {{#if Seleccionado}}selected="selected"{{/if}}>{{Industria}}</option>';
SalesUp.Variables.TemplateOpcionGruposEmpresariales = '<option value="{{Id}}" {{#if Seleccionado}}selected="selected"{{/if}}>{{GrupoEmpresarial}}</option>';
SalesUp.Variables.TemplateOpcionPaises = '<option value="{{IdPais}}" {{#if Seleccionado}}selected="selected"{{/if}}>{{Pais}}</option>';
SalesUp.Variables.TemplateOpcionEstados = '<option value="{{IdEstado}}" {{#if Seleccionado}}selected="selected"{{/if}}>{{Estado}}</option>';

SalesUp.Variables.CargarEstados = function(Op){
	var Estado = '';
	(Op.Estado) ? Estado = Op.Estado : Estado = SalesUp.Variables.EstadoDefault;
	//(SalesUp.Variables.ObligatorioEstado) ? SalesUp.Variables.EstadoDefault = '' : '';
	$('#Estado').html('');

	if(Op.Pais==SalesUp.Variables.PaisDefault){
		SalesUp.Variables.jsonEstados = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonEstados.dbsp', Parametros:'pd='+Op.Pais+'&edo='+Estado, DataType:'json', Almacen:'jsonEstados' });
	}else{
		SalesUp.Variables.jsonEstados = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonEstados.dbsp', Parametros:'pd='+Op.Pais+'&edo='+Estado, DataType:'json' });
	}

	SalesUp.Construye.ConstruyemeUn({
		Control: 'select', Nuevo: false,
		SeleccioneOpcion: SalesUp.Variables.ObligatorioEstado, IdControl: 'Estado',
		Template: SalesUp.Variables.TemplateOpcionEstados,
		Datos: SalesUp.Variables.jsonEstados.jsonDatos
	});
}

SalesUp.Variables.IniciaEmpresa = function(){
	SalesUp.Variables.jsonCompaniasInformacion = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCompaniasInformacion.dbsp', Parametros:{ tkcom:SalesUp.Variables.TkCom }, DataType:'json' });
	SalesUp.Variables.jsonConfiguracionCamposSistema = SalesUp.Sistema.CargaDatos({ Link:'/privado/Modelo/jsonConfiguracionCamposSistema.dbsp', DataType:'json', Almacen:'jsonConfiguracionCamposSistema' });

	var tmpCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateFormulario.dbsp', Almacen:'TemplateFormulario'});
	var jt = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonNombresTab.dbsp', Parametros:'idventana=1', DataType:'json'});
	var jc = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCampos.dbsp', Parametros:'idventana=1', DataType:'json'});

	jt = jt.jsonDatos;
	jc = jc.jsonDatos;
	var idTab;
	jt = _.where(jt,{tabF:'4'});
	if(jt){
	  jt = jt[0];
	  idTab = jt.IDTAB;
	}

	jc = _.where(jc,{IdTab:idTab});

	for (var nn = 0; nn < _.size(jc); nn++){
	  var j = jc[nn];
	  var Seleccione = [{}];
	  Seleccione[0].value = '';
	  Seleccione[0].Opcion = '(... Seleccione una opción ...)';

	  if(j.attr_maxLength=='0'){j.attr_maxLength='';}

	  if(j.esSelect == '1'){
	    Opciones = SalesUp.Variables.ObtieneOpciones({Naturaleza:j.Naturaleza, Id:j.attr_id, Indice:j.attr_data_Indice, IdCampo:j.IdCampo});
	    if(Opciones){ 
	      j.Opciones = Opciones; 

	      j.Opciones = _.union(Seleccione, j.Opciones);				
	    }

	  }
	}


	var jAux = {};
	jAux.jsonDatos = jc;
	var Compilado = SalesUp.Construye.ReemplazaDatos({Datos:jAux, Template:tmpCampos});


	$('#campoSistema').html(Compilado);

	$('#Pais').attr('onchange','SalesUp.Variables.ltEstados({p:\'Pais\', e:\'Estado\', m:\'EmpMunicipio\'});');
	$('#Estado').attr('onchange','SalesUp.Variables.ltMunicipios({p:\'Pais\', e:\'Estado\', m:\'EmpMunicipio\'});');


	var je = SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0];
	$('#Empresa').val(je.Empresa);
	$('#GrupoEmpresarial').val(je.IdCompaniaGrupo);
	$('#Industria').val(je.IdIndustria);
	$('#TelefonoCorporativo').val(je.TelefonoCorporativo);
	$('#PaginaWeb').val(je.Url);
	$('#nEmpleados').val(je.nEmpleados);
	$('#Ciudad').val(je.Ciudad);
	$('#CodigoPostal').val(je.CodigoPostal);
	$('#Calle').val(je.Direccion1);
	$('#Colonia').val(je.Direccion2);
	$('#Com_CatalogoOpcion1').val(je.Com_OpcionCatalogo1);
	$('#Com_CatalogoOpcion2').val(je.Com_OpcionCatalogo2);
	$('#Com_CatalogoOpcion3').val(je.Com_OpcionCatalogo3);

	for (var cc = 0; cc <= 10; cc++){
	  $('#CC'+cc).val(je['Campo'+cc+'C']);
	}



	$('#NumInterior').val(je.NumInterior);
	$('#NumExterior').val(je.NumExterior);

	$('#Pais').val(je.IdPais);
	SalesUp.Variables.ltEstados({p:'Pais', e:'Estado', m:'EmpMunicipio'});
	$('#Estado').val(je.IdEstado);
	SalesUp.Variables.ltMunicipios({p:'Pais', e:'Estado', m:'EmpMunicipio'});
	$('#EmpMunicipio').val(je.idMunicipio);

	var BoxInfo = $('.BoxInfo');
	var nBox = _.size(BoxInfo) - 15;
	nBox = Math.round(nBox / 2) * 40;
	self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Ancho:700, Alto:310+nBox});

	/*
	$.each(SalesUp.Variables.jsonConfiguracionCamposSistema.jsonDatos, function(i, Opciones){
		var Restriccion = '';
		var TipoRestriccion = parseInt(Opciones.Restriccion);
		var $Elemento = $('#'+Opciones.IdHtml);

		switch (TipoRestriccion){
			case 1: Restriccion = 'InfoUnico'; break;
			case 2: Restriccion = 'InfoObligatorio'; break;
			case 3: Restriccion = 'InfoUnico InfoObligatorio'; break;
			default: Restriccion = '';
		}
		
		if((Opciones.IdHtml=='Estado') && ( (TipoRestriccion==2) || (TipoRestriccion==3) ) ){ SalesUp.Variables.ObligatorioEstado = true; }
		if((Opciones.IdHtml=='Industria') && ( (TipoRestriccion==2) || (TipoRestriccion==3) ) ){ SalesUp.Variables.ObligatorioIndustria = true; }
		if((Opciones.IdHtml=='GrupoEmpresarial') && ( (TipoRestriccion==2) || (TipoRestriccion==3) ) ){ SalesUp.Variables.ObligatorioGrupoEmpresarial = true; }
		
		if( (TipoRestriccion==2) || (TipoRestriccion==3) ){
			$Elemento.addClass(Restriccion)
		}
		
	});

	SalesUp.Variables.jsonIndustria = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonIndustria.dbsp', DataType:'json', Almacen:'jsonIndustria' });
	SalesUp.Variables.jsonGruposEmpresariales = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonGruposEmpresariales.dbsp', DataType:'json', Almacen:'jsonGruposEmpresariales' });
	SalesUp.Variables.jsonPaises = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonPaises.dbsp', Parametros:{pd:SalesUp.Variables.PaisDefault}, DataType:'json', Almacen:'jsonPaises' });

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

	SalesUp.Construye.ConstruyemeUn({
		Control: 'select', Nuevo: false,
		IdControl: 'Pais',
		Template: SalesUp.Variables.TemplateOpcionPaises,
		Datos: SalesUp.Variables.jsonPaises.jsonDatos
	});

	//SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdCompaniaGrupo
	SalesUp.Variables.CargarEstados({
		Pais:SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdPais, 
		Estado:SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdEstado
	});

	$('#Empresa').val(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Empresa);
	$('#GrupoEmpresarial').val(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdCompaniaGrupo);
	$('#Industria').val(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdIndustria);
	$('#TelefonoCorporativo').val(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].TelefonoCorporativo);
	$('#PaginaWeb').val(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Url);
	$('#nEmpleados').val(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].nEmpleados);
	$('#Pais').val(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdPais);
	$('#Estado').val(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].IdEstado);
	$('#Ciudad').val(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Ciudad);
	$('#Cp').val(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].CodigoPostal);
	$('#Calle').val(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Direccion1);
	$('#Colonia').val(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Direccion2);
	$('#Com-CatalogoOpcion1').val(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Com_OpcionCatalogo1);
	$('#Com-CatalogoOpcion2').val(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Com_OpcionCatalogo2);
	$('#Com-CatalogoOpcion3').val(SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0].Com_OpcionCatalogo3);
	
	*/
	SalesUp.Sistema.Asterisco();
	//setTimeout(function() {$('input, select').eq(SalesUp.Variables.Editar).focus().select();}, 150);

}/* /SalesUp.Variables.IniciaEmpresa */



SalesUp.Variables.ObtieneOpciones = function(Op){
	var Naturaleza = Op.Naturaleza, Id = Op.Id, Indice = Op.Indice, IdCampo = Op.IdCampo;
	var Pagina = '', Almacen = '', Parametros='tConsulta=1', Pasa = false, jsonRespuesta;
	var esCliente = SalesUp.Variables.EsCliente;
	if(Naturaleza == '1'){
		if(Id=='Industria'){Pagina = 'jsonIndustria.dbsp'; Almacen = 'jsonIndustriav2'; Pasa = true;}

		if(Id=='GrupoEmpresarial'){Pagina = 'jsonGruposEmpresariales.dbsp'; Almacen = 'jsonGrupoEmpresarialv2'; Pasa = true;}

		if((Id=='Pais')||(Id=='pPais')){Pagina = 'jsonPaises.dbsp'; Almacen = 'jsonPaisesv2'; Pasa = true;}

		if((Id=='Estado')||(Id=='pEstado')){Pagina = 'jsonEstados.dbsp'; Almacen = 'jsonEstadosv2'; Parametros+='&pd='+SalesUp.Variables.PaisDefault; Pasa = true;}

		if((Id=='Municipio')||(Id=='pMunicipio')){Pagina = 'jsonMunicipios.dbsp'; Almacen = 'jsonMunicipiosv2'; Parametros+='&edo='+SalesUp.Variables.EstadoDefault+'&pais='+SalesUp.Variables.PaisDefault; Pasa = true;}
		
	}else if(Naturaleza == '2'){
		Pagina = 'jsonCamposPersonalizadosOpciones.dbsp'; Almacen = 'jsonOpcion'+IdCampo; Parametros +='&IdCampo='+IdCampo; Pasa = true;
	}

	if(Pasa){
		jsonRespuesta = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/'+Pagina, Parametros:Parametros, DataType:'json', Almacen:Almacen}).jsonDatos;	
	}
	
	return jsonRespuesta;
}/*ObtieneOpciones*/



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


}/*ltMunicipios*/



SalesUp.Variables.EnviarForma = function(){
	SalesUp.Sistema.MuestraEspera('',4);
	var Pasa = true;
	setTimeout(function() {
		(Pasa) ? Pasa = SalesUp.Valida.ValidaObligatorios() : '';
		//(Pasa) ? Pasa = SalesUp.Variables.ValidaCamposUnicos() : '';
		if(Pasa){
			$('#FrmEditarEmpresa').submit();
		}else{
			SalesUp.Sistema.OcultarOverlay();
		}
	}, 100);
} /* /SalesUp.Variables.EnviarForma */

$(function(){
	SalesUp.Variables.IniciaEmpresa();
	SalesUp.Sistema.OcultarOverlay();
});

