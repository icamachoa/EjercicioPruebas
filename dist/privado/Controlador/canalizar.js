
var $selectCanalizar, selectCanalizar;
SalesUp.Variables.CanalizarAuto = function(Op){

	var $Elemento = $(Op.e);
	var $Padre = $Elemento.closest('.InfoLabel');
	var check =  $Elemento.is(':checked');
	var arrCheckTemplateOportunidad = $('.CheckTemplateOportunidad');

	(check) ? $Padre.attr('data-activo','1') : $Padre.attr('data-activo','0');
	$('#AgregarVerAvanzado').val('');

	$('#CanalizarProspecto').val(0);
	$('#BtnCanalizar').hide();
	$('#BuscarOportunidades').attr('disabled','disabled');
	$('#BtnAceptar, #BtnAceptaryVer').show();
	$('#IdEjecutivo, #EmpresaDestino, #NombreEmpresaDestino').val('');
	
	if(_.size($('#Canalizar'))>0){
		selectCanalizar.disable();
		selectCanalizar.setValue([SalesUp.Variables.IdEmpresaCanalizaAutomatico]);	
	}
	$('#ListaOportunidadesSeleccionadas').html('');
	arrCheckTemplateOportunidad.prop('checked', false);

	for (var i = 0; i <= arrCheckTemplateOportunidad.length - 1; i++){
		SalesUp.Variables.ActivaOportunidadTemplate({ e:$(arrCheckTemplateOportunidad[i]) });
	};
	$('#BuscarOportunidades').val('');	
	SalesUp.Variables.BuscarOportunidadesRapidas({b:''});
	arrCheckTemplateOportunidad.prop('disabled','disabled');

	if(check){
		SalesUp.Variables.ValidaCatalogosCanalizados();
		$('#BuscarOportunidades').removeAttr('disabled');
		arrCheckTemplateOportunidad.removeAttr('disabled');
		$('#CanalizarProspecto').val(1);
		$('#BtnCanalizar').show();
		$('#BtnAceptar, #BtnAceptaryVer').hide();
		selectCanalizar.enable();
	}
}

SalesUp.Variables.ActivaCheck = function(Op){
	var $Elemento = $(Op.e);
	var $Padre = $Elemento.closest('.InfoLabel');
	var check =  $Elemento.is(':checked');
	(check) ? $Padre.attr('data-activo','1') : $Padre.attr('data-activo','0');
}

SalesUp.Variables.OportunidadesTemplates = function(){
	var $ListaOportunidadesTemplates = $('#ListaOportunidadesTemplates');
	var Cargado = $ListaOportunidadesTemplates.attr('data-ListaCargada');

	if(Cargado=='1'){return false;}
	
	if (SalesUp.Sistema.EstaActivoModulo({Modulo:2})){ SalesUp.Variables.UsuariosCanalizacion(); }
	setTimeout(function(){
		$('#BoxCanalizaciones .selectize-control').addClass('InfoData');
	}, 100);
	
	var templateOportunidad = $('#scriptTemplateOportundidesRapidas').html();
	SalesUp.Variables.templateOportunidad = templateOportunidad;
	$ListaOportunidadesTemplates.attr('data-ListaCargada',1);

	var Cargando = '<div class="w100 tCen mt10"><i>Cargando oportunidades...</i><br><br><i class="fa fa-spinner fa-spin fa-3x"></i> </div>';
	$ListaOportunidadesTemplates.html(Cargando).show();
	
	setTimeout(function(){
		var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonListaOportunidadesTemplates.dbsp', DataType:'json' });
		json = json.jsonDatos;
		SalesUp.Variables.jsonOportunidadesRapidas = json;
		$ListaOportunidadesTemplates.html('');
		
		var Procesado = SalesUp.Construye.ReemplazaTemplate({Template:templateOportunidad, Datos:json, Destino:$ListaOportunidadesTemplates });

		var CertezaOportunidad = $('.CertezaOportunidad');
		for (var i = 0; i <= CertezaOportunidad.length - 1; i++){
			var $CertezaOportunidad = $(CertezaOportunidad[i]);
			var Certeza = $CertezaOportunidad.attr('data-certeza');
			$CertezaOportunidad.val(Certeza);
		};
		SalesUp.Variables.ValidaNumeros();
		SalesUp.Variables.ActivaOportunidadesRapidas();
	}, 10);

	

}/*SalesUp.Variables.OportunidadesTemplates*/

SalesUp.Variables.ActivaOportunidadesRapidas = function(){
	if (!SalesUp.Sistema.EstaActivoModulo({Modulo:2})){
 
 		$('#BoxCanalizaAuto').remove();
		$('#ContenedorOportunidadesTemplates .LineaDivisor').remove();
 		$('#BuscarOportunidades').removeAttr('disabled');
		$('.CheckTemplateOportunidad').removeAttr('disabled');
		
	}else{
 
 		
	}
 
}

SalesUp.Variables.UsuariosCanalizacion = function(){
	var pDatosCanalizados = 'u='+SalesUp.Variables.sUsuario+'&e='+SalesUp.Variables.sEmpresa;
	var control = SalesUp.Sistema.queControl();
	var json = SalesUp.Sistema.CargaDatos({Link:"https://"+control+".salesup.com.mx/usuarios/obtienedistribuidores.dbsp", Parametros:pDatosCanalizados, DataType:'json' });
	
	if(json.error!='0'){return false;}
	
	var Datos = json.datos;

	SalesUp.Construye.ConstruyemeUn({
		Control: 'select', Nuevo: false,
		SeleccioneOpcion: true, IdControl:'Canalizar',
		Template: '<option value="{{IDCUENTA}}">{{COMPANIA}} {{#if CLUSTER}}({{CLUSTER}}){{/if}}</option>', 
		Datos: Datos
	});

	SalesUp.Variables.jsonUsuariosCanalizacion = Datos;
	if(_.size($('#Canalizar'))>0){
		setTimeout(function(){
			$selectCanalizar = $('#Canalizar').selectize({
				create:false, sortField:'text',
				dropdownParent:'body', maxItems:1, persist:false, delimiter:'ª',
				onChange:function(data){ SalesUp.Variables.DespuesdeSeleccionarCanalizar(); },
				onFocus:function(){/*console.info('onFocus');*/}
			});
			selectCanalizar = $selectCanalizar[0].selectize;
			selectCanalizar.disable();
			SalesUp.Variables.UsuariosCanalizacionAutomatica();
			
		}, 100);	
	}
}/*SalesUp.Variables.UsuariosCanalizacion*/

SalesUp.Variables.UsuariosCanalizacionAutomatica = function(Op){
	if(!Op){Op={}}
	var Regresar = (Op.Regresar) ? Op.Regresar : false ;
	var Activo = SalesUp.Sistema.EstaActivoModulo({Modulo:2});
	if(!Activo){return false;}
	var Pais = $('#pPais').val();
	var Estado = $('#pEstado').val();
	var Municipio = $('#pMunicipio').val();
	
	(!Pais) ? Pais = '':'';
	(!Estado) ? Estado = '':'';
	(!Municipio) ? Municipio = '':'';

	var pDatosCanalizados = 'tke='+SalesUp.Variables.sTke+'&P='+Pais+'&E='+Estado+'&M='+Municipio;
	var control = SalesUp.Sistema.queControl();
	var json = SalesUp.Sistema.CargaDatos({Link:"https://"+control+".salesup.com.mx/canalizaciones/obtieneCanalizacionAutomatica.dbsp", Parametros:pDatosCanalizados, DataType:'json' });
	
	var Datos = json.datos;
	
	SalesUp.Variables.IdEmpresaCanalizaAutomatico = Datos[0].IDCUENTA;
	
	if(Regresar){
		return SalesUp.Variables.IdEmpresaCanalizaAutomatico;
	}

	SalesUp.Variables.IdEmpresaCanalizaAutomaticoOriginal = SalesUp.Variables.IdEmpresaCanalizaAutomatico;

	if(_.size($('#Canalizar'))>0){
		setTimeout(function(){
			if (selectCanalizar){
				selectCanalizar.setValue([SalesUp.Variables.IdEmpresaCanalizaAutomatico]);	
			}
			SalesUp.Variables.DistAuto = true;
		}, 300);
	}
	
}

SalesUp.Variables.DespuesdeSeleccionarCanalizar = function(){
	var $Elemento = $('#Canalizar.selectized');
	var EmpresaDestino = $Elemento.val();
	if(EmpresaDestino==''){return false;}

	if(SalesUp.Variables.IdEmpresaCanalizaAutomaticoOriginal!=EmpresaDestino){
		SalesUp.Variables.DistAuto=false;
		$('#cp_Manual').val(1);
	}

	EmpresaDestino = parseInt(EmpresaDestino);

	var json = _.where(SalesUp.Variables.jsonUsuariosCanalizacion, {IDCUENTA:EmpresaDestino	});
	$('#EmpresaDestino').val(json[0].IDEMPRESADESTINO);
	$('#NombreEmpresaDestino').val(json[0].COMPANIA);
	$('#IdEjecutivo').val(json[0].IDEJECUTIVO);
	var $form = $('#EmpresaDestino').closest('form');
	var $idDeLaCuenta = $form.find('#idDeLaCuenta');
	if(!_.size($idDeLaCuenta)){ $form.prepend('<input type="hidden" name="idDeLaCuenta" id="idDeLaCuenta"/>'); $idDeLaCuenta = $form.find('#idDeLaCuenta');}
	$idDeLaCuenta.val(json[0].IDCUENTA);
}

SalesUp.Variables.ActivaOportunidadTemplate = function(Op){
	$Elemento = $(Op.e);
	var CanalizarProspecto = $('#CanalizarProspecto').val();
	
	var moduloActivo = SalesUp.Sistema.EstaActivoModulo({Modulo:2});
	if(moduloActivo){
		if( (CanalizarProspecto=='') || (CanalizarProspecto=='0') ){ 
			$Elemento.prop('checked', false); return false;
		}
	}

	SalesUp.Variables.ActivaCheck(Op);
	SalesUp.Variables.RecopilaInformacionOportunidad();

	var check =  $Elemento.is(':checked');
	
	var $RowOportunidad = $('#boxCotizacionOportunidad'+Op.v);
	if(check){
		if($RowOportunidad){
			var CloneOportunidad = $RowOportunidad.clone();
			$RowOportunidad.remove();
			$('#ListaOportunidadesSeleccionadas').append(CloneOportunidad);
			
			var $CertezaOportunidad = $('#ListaOportunidadesSeleccionadas #Certeza'+Op.v);
			var Certeza = $CertezaOportunidad.attr('data-certeza');
			$CertezaOportunidad.val(Certeza);
			
			SalesUp.Variables.ValidaNumeros();
		}	
	}else{
		$RowOportunidad.remove();
		SalesUp.Variables.BuscarOportunidadesRapidas({b:$('#BuscarOportunidades').val()});
	}	
}

SalesUp.Variables.BuscarOportunidadesRapidas = function(Op){
	var $ListaOportunidadesTemplates = $('#ListaOportunidadesTemplates');
	var $LtOporSelec = $('#ListaOportunidadesSeleccionadas');
	var templateOportunidad = SalesUp.Variables.templateOportunidad;
	var jsonOportunidadesRapidas = SalesUp.Variables.jsonOportunidadesRapidas;
	var Buscar = SalesUp.Sistema.LimpiarParaBuscarTexto(Op.b);
	
	jsonBuscar = jsonOportunidadesRapidas;

	var arrOporActivas = $LtOporSelec.find('.boxCotizacionOportunidad');
	for (var i = 0; i <= arrOporActivas.length - 1; i++){
		var $oa = $(arrOporActivas[i]);
		var dataId = $oa.attr('data-id'); 
		jsonBuscar = _.reject(jsonBuscar, function(j){ return j.ID == dataId; });	
	};

	if(Buscar!=''){
		var jsonBuscar = _.filter(jsonBuscar,function(j){
			var str = SalesUp.Sistema.LimpiarParaBuscarTexto(j.Concepto);
			if(str.indexOf(Buscar)!=-1){return j;}
		});
		jsonBuscar = _.reject(jsonBuscar, function(j){ return _.size(j.Concepto) == 0; });	
	}
	
	$ListaOportunidadesTemplates.html('');
	SalesUp.Construye.ReemplazaTemplate({
		Template:templateOportunidad, 
		Datos:jsonBuscar, 
		Destino:$ListaOportunidadesTemplates
	});

	var CertezaOportunidad = $('#ListaOportunidadesTemplates .CertezaOportunidad');
	for (var i = 0; i <= CertezaOportunidad.length - 1; i++){
		var $CertezaOportunidad = $(CertezaOportunidad[i]);
		var Certeza = $CertezaOportunidad.attr('data-certeza');
		$CertezaOportunidad.val(Certeza);
	};
	SalesUp.Variables.ValidaNumeros();

	var arrCheckTemplateOportunidad = $('#ListaOportunidadesTemplates .CheckTemplateOportunidad');
	arrCheckTemplateOportunidad.removeAttr('disabled');
}



SalesUp.Variables.RecopilaInformacionOportunidad = function(){
	var CheckTemplateOportunidad = $('.CheckTemplateOportunidad');
	$('#LtTemplatesOportunidad, #LtConceptoTemplatesOportunidad, #LtMontoTemplatesOportunidad, #LtCertezaTemplatesOportunidad').val('');
	
	var LtTemplatesOportunidad  = '', LtConceptoTemplatesOportunidad = '', 
		LtMontoTemplatesOportunidad = '', LtCertezaTemplatesOportunidad = '';

	for (var i = 0; i <= CheckTemplateOportunidad.length - 1; i++){
		$Check = $(CheckTemplateOportunidad[i]);
		var id = $Check.val();

		var $boxCotizacionOportunidad = $('#boxCotizacionOportunidad'+id);
		
		$boxCotizacionOportunidad.find('.DatoOportunidad').attr('disabled',true);

		if($Check.is(':checked')){
			$boxCotizacionOportunidad.find('.DatoOportunidad').removeAttr('disabled');

			LtTemplatesOportunidad		   += id+'|';
			LtConceptoTemplatesOportunidad += 	  $('#Cot'+id).val()+'|';
			LtMontoTemplatesOportunidad    += 	$('#Monto'+id).val()+'|';
			LtCertezaTemplatesOportunidad  += $('#Certeza'+id).val()+'|';
		}
	};

	$('#LtTemplatesOportunidad').val(LtTemplatesOportunidad);
	$('#LtConceptoTemplatesOportunidad').val(LtConceptoTemplatesOportunidad);
	$('#LtMontoTemplatesOportunidad').val(LtMontoTemplatesOportunidad);
	$('#LtCertezaTemplatesOportunidad').val(LtCertezaTemplatesOportunidad);
}/*SalesUp.Variables.RecopilaInformacionOportunidad*/

SalesUp.Variables.validaCanalizacion = function(){
	var nuevoIdAuto =  SalesUp.Variables.UsuariosCanalizacionAutomatica({Regresar:true});
	nuevoIdAuto = parseInt(nuevoIdAuto);
	var EmpresaDestinoSeleccionada = parseInt($('#idDeLaCuenta').val());
	SalesUp.Variables.IdEmpresaCanalizaAutomaticoOriginal = parseInt(SalesUp.Variables.IdEmpresaCanalizaAutomaticoOriginal);

	if(!SalesUp.Variables.DistAuto){return true;}

	if(SalesUp.Variables.DistAuto){
		if(nuevoIdAuto==EmpresaDestinoSeleccionada){return true;}
	}

	var NombreEmpresaDestino = $('#NombreEmpresaDestino').val();
	SalesUp.Construye.MuestraAlerta({
		TipoAlerta:'AlertaPregunta', Id:'GuardaryNuevo', 
		Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> Alguien más ya canalizó un contacto a '+NombreEmpresaDestino+', ¿Quieres canálizarselo de todas formas? ',
		Boton1:'Si, Canalizar', Icono1: '<i class="fa fa-reply-all fa-flip-horizontal"></i>', Callback1: 'SalesUp.Variables.CanalizarForma()',
		Boton2:'Cancelar', Callback2: 'SalesUp.Variables.SeleccionarCanalizarNuevoAutomatico({nuevoIdAuto:'+nuevoIdAuto+'})',
		Ancho:'50%'
	});

	return false;
}/*SalesUp.Variables.validaCanalizacion*/

SalesUp.Variables.ValidaCatalogosCanalizados = function(){
	var Pasa = true;
	var selectFase = $SelectizeFase[0].selectize;
	var selectOrigen = $SelectizeOrigen[0].selectize;

	var IdFase = selectFase.getValue();
	var IdOrigen = selectOrigen.getValue();
	
	var info = SalesUp.Variables.jsonConfiguracionCampos;

	for(var i = 0; i<_.size(info);i++){
	  var da = info[i], opFases, opOrigen;
	  if(da.attr_id=='Fase'){ opFases = da.Opciones; }
	  if(da.attr_id=='Origen'){ opOrigen = da.Opciones; }
	}

	for(var x = 0; x<_.size(opFases);x++){
	  var f = opFases[x];
	  if(f.value==IdFase){
	    if(f.esCanalizado!='1'){
	      SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'La fase <b>'+f.Opcion+'</b>, no ha sido compartida con los distribuidores.', Tiempo:5000});
	      return false;
	    }
	  }
	}

	for(var x = 0; x<_.size(opOrigen);x++){
	  var o = opOrigen[x];
	  if(o.value==IdOrigen){
	    if(o.esCanalizado!='1'){
	      SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'El origen <b>'+o.Opcion+'</b>, no ha sido compartido con los distribuidores.', Tiempo:5000});
	      return false;
	    }
	  }
	}


	/*
	var jsonFases = SalesUp.Variables.jsonFases.jsonDatos;
	var jsonOrigen = SalesUp.Variables.jsonOrigen.jsonDatos;
	var jF, jO;

	jF = _.findWhere(jsonFases, {IdFase:IdFase});
	if(jF.esCanalizado!='1'){
		SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'La fase <b>'+jF.Fase+'</b>, no ha sido compartida con los distribuidores.', Tiempo:5000});
		return false;
	}

	jO = _.findWhere(jsonOrigen, {IdOrigen:IdOrigen});
	if(jO.esCanalizado!='1'){
		SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'El origen <b>'+jO.Origen+'</b>, no ha sido compartido con los distribuidores.', Tiempo:5000});
		return false;
	}
	*/
	return true;

}

SalesUp.Variables.SeleccionarCanalizarNuevoAutomatico = function(Op){
	selectCanalizar.setValue([Op.nuevoIdAuto]);
	SalesUp.Variables.DistAuto = true;
}

SalesUp.Variables.CanalizarForma = function(){
	$('#AgregarVerAvanzado').val(2);
	EnviarFormaAvanzado();
}

SalesUp.Variables.CanalizacionLista = function(Op){
	self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:250, Ancho:600});
	var IdProspecto = Op.idp;
	var tkp = Op.tkp;
	var callback = 'self.parent.tb_cierra()';
	var path, uNivel=1;
	(Op.callback) ? callback = Op.callback : '';
	(Op.path) ? path = Op.path : '';
	(Op.uNivel) ? uNivel = Op.uNivel : '';
	
	var $Titulo = self.parent.$('#TB_ajaxWindowTitle');
	var tempContacto = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateContactoCanalizado.dbsp', Almacen:'TemplateContactoCanalizado'});
	var jsonContacto = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonInfoCanalizados.dbsp', Parametros:'tkp='+tkp+'&idp='+IdProspecto, DataType:'json'}).jsonDatos[0];
	var Transformado = SalesUp.Construye.ReemplazaDatos({Template:tempContacto, Datos:jsonContacto});

	if(uNivel>1){
		IrA = '/privado/Prospectos.dbsp';
		if(path.indexOf('prospectos-visualizar.dbsp')!=-1)   {IrA = '/privado/Prospectos.dbsp';}
		if(path.indexOf('oportunidades-visualizar.dbsp')!=-1){IrA = '/privado/Oportunidades.dbsp';}
		if(path.indexOf('clientes-visualizar.dbsp')!=-1)     {IrA = '/privado/Clientes.dbsp';}
		if(path.indexOf('ventas-visualizar.dbsp')!=-1)       {IrA = '/privado/Ventas.dbsp';}
		self.parent.SalesUp.Sistema.eliminarUltimaVisita({eliminarId:IdProspecto});
		callback = 'self.parent.document.location.href = \''+IrA+'\';';
	}

	$('form, .OverlayBlanco').remove();
	$Titulo.html('Canalización exitosa <i class="fa fa-check"></i>');
	$('#popup-contenedor').prepend(Transformado);
	$('#frmContactoCanalizado #BtnAceptar').attr('onclick',callback);
}




