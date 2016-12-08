Handlebars.registerHelper('tieneConflicto', function(a) {
	var str = '', t = this, hayConflicto = t.hayConflicto;
	
	if(hayConflicto){
		str = (a==1) ? 'elMaster w50 pr5' : 'elSlave w50';
	}else{
		str = (a==1) ? 'elMaster w100' : 'elSlave w50 valorOculto';
	}

	return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hayConflicto', function() {
	var str = 'data-hayConflicto="0"', t = this, hayConflicto = t.hayConflicto;
	if(hayConflicto){str = 'data-hayConflicto="1"'}
	return new Handlebars.SafeString(str);
});

var CombinarContactos = function(){
	var tks, tkMaster, tkSlave, slaveInfo, masterInfo, idVentana = 1, templateA, jsonCampos, camposOpcionesProcesadas = false;
	var datosContactos = {};

	/*
	var isNull = function(valor,isTrue,isFalse){
		if(valor === null){
			return isTrue;
		}else{
			if(isFalse){
				isFalse = isFalse.replace('{{v}}',valor);
				return isFalse;
			}else{
				return valor;
			}
		}
	}*/

	var llenaControles = function(){
		SalesUp.Variables.llenaControles();
		dataValues();
	}

	var finalizaComponentes = function(){
		llenaControles();
		SalesUp.Construye.QuitaEsperaGuardando();
	}

	var dataValues = function(){
		/*Para llenar selects*/
		var arrDataValue = $('[data-value]');
		for(var x = 0; x < _.size(arrDataValue); x++){
		  var $campo = $(arrDataValue[x]);
		  var valor = $campo.attr('data-value');
		  $campo.val(valor);
		}


		/*Para llenas los selectsInputs*/
		var arrInputs = $('input[data-tipocampo="3"]');
		for(var i=0;i<arrInputs.length;i++){
		  var $t = $(arrInputs[i]);
		  var $p = $t.closest('.boxSelectInput');
		  var v = $t.val();
		  var $select = $p.find('select');
		  var $input = $p.find('input[type="text"]');
		  if(v=='{}'){$t.val('');}
		  if((v!='')&&(v!='null')&&(v!='{}')){
		    v = JSON.parse(v);
		    $select.val(v.select);
		    $input.val(v.valor);
		  }
		}
	}/*dataValues*/



	var procesarDatosCamposContactos = function(){
		var losCampos = jsonCampos.jsonDatos;
		
		/*losCampos = losCampos.jsonDatos;*/
		
		var listaKeys = function(id){
		  var key = '';
		  (id=='Nombre') ? key = 'Nombre' : '';
		  (id=='Apellidos') ? key = 'Apellidos' : '';
		  (id=='Correo') ? key = 'Correo' : '';
		  (id=='Titulo') ? key = 'IdTitulo' : '';
		  (id=='Sexo') ? key = 'Sexo' : '';
		  (id=='Puesto') ? key = 'Puesto' : '';
		  (id=='Telefono1') ? key = 'Telefono' : '';
		  (id=='Telefono2') ? key = 'Telefono2' : '';
		  (id=='Movil') ? key = 'Movil' : '';
		  (id=='Comentarios') ? key = 'Comentarios' : '';
		  (id=='Origen') ? key = 'IdOrigen' : '';
		  (id=='Fase') ? key = 'IdFase' : '';
		  (id=='Facebook') ? key = 'Facebook' : '';
		  (id=='Twitter') ? key = 'Twitter' : '';
		  (id=='Skype') ? key = 'Skype' : '';
		  (id=='LinkedIn') ? key = 'Linkedin' : '';
		  (id=='Googleplus') ? key = 'Googleplus' : '';
		  (id=='nEmpleados') ? key = 'nEmpleados' : '';
		  (id=='Empresa') ? key = 'Empresa' : '';
		  /*(id=='Empresa') ? key = 'IdCompania' : '';*/
		  
		  (id=='pPaginaWeb') ? key = 'Url' : '';
		  (id=='pPais') ? key = 'IdPais' : '';
		  (id=='Estado') ? key = 'IdEstado' : '';
		  (id=='pMunicipio') ? key = 'IdMunicipio' : '';
		  (id=='pCalle') ? key = 'Calle' : '';
		  (id=='Colonia') ? key = 'Colonia' : '';
		  (id=='Ciudad') ? key = 'Ciudad' : '';
		  (id=='pCodigoPostal') ? key = 'Cp' : '';
		  (id=='Industria') ? key = 'IdIndustria' : '';
		  (id=='TelefonoCorporativo') ? key = 'TelefonoCorporativo' : '';
		  (id=='GrupoEmpresarial') ? key = 'IdCompaniaGrupo' : '';
		  (id=='') ? key = 'Industria' : '';
		  (id=='') ? key = 'CompaniaGrupo' : '';
		  (id=='') ? key = 'OpcionCatalogo1' : '';
		  (id=='') ? key = 'OpcionCatalogo2' : '';
		  (id=='') ? key = 'OpcionCatalogo3' : '';
		  (id=='') ? key = '' : '';
		  //(id=='NumExterior') ? key = '' : '';
		  
		  
		  return key;
		}

		var listaKeysPersonalizados = function(id){
			id = id.replace('CP','Campo');
			
			return id
		}

		var nCampos = _.size(losCampos);

		for(var c=0;c < nCampos;c++){
		  var elCampo, idCampo, key, datoMaster, datoSlave;
		  elCampo = losCampos[c];
		  idCampo = elCampo.attr_id;
		  key = (elCampo.Naturaleza==1) ? listaKeys(idCampo) : listaKeysPersonalizados(idCampo);
		  
		  datoMaster = $.trim(datosContactos.master[key]);
		  datoSlave = $.trim(datosContactos.slave[key]);

		  elCampo.hayConflicto = false;
		  elCampo.ocultarBoxInfo = 'OcultarBoxInfo';
		  if(datoMaster == datoSlave){
		    elCampo.valorMaster = datoMaster;
		    elCampo.valorSlave = datoSlave;
		  }else if((datoMaster != '') && datoSlave == ''){
		    elCampo.valorMaster = datoMaster;
		    elCampo.valorSlave = datoMaster;
		  }else if((datoMaster == '') && datoSlave != ''){
		    elCampo.valorMaster = datoSlave;
		    elCampo.valorSlave = datoSlave;
		  }else if( datoMaster != datoSlave ){
		    elCampo.hayConflicto = true;
		    elCampo.ocultarBoxInfo = '';
		    elCampo.valorMaster = datoMaster;
		    elCampo.valorSlave = datoSlave;
		  }
		}

		construyeCampos(losCampos);
		/*finalizaComponentes();*/
	}

	var obtieneOpciones = function(Op){
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
			var paisDefault = 'MX', edoDefault = 'QROO';
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
	}/*obtieneOpciones*/

	var construyeCampos = function(losCampos){
		var procesaContruyeCampos =  function(tmpCampos, err){
			var esCliente = 0;
			var AlmacenCampos = 'jsonCamposProspectos';
			if(esCliente=='1'){AlmacenCampos = 'jsonCamposClientes';}
			
			var jsonTabs = SalesUp.Variables.jsonTabs.jsonDatos;
			var Opciones;

			var jsonCampos = losCampos;
			
			if (!camposOpcionesProcesadas){
				for (var x = 0; x <= jsonCampos.length - 1; x++){
					var j = jsonCampos[x];
					var Seleccione = [{}];
					Seleccione[0].value = '';
					Seleccione[0].Opcion = '(... Seleccione una opción ...)';
					
					if(j.attr_maxLength=='0'){j.attr_maxLength='';}

					if(j.esSelect == '1'){
						Opciones = obtieneOpciones({Naturaleza:j.Naturaleza, Id:j.attr_id, Indice:j.attr_data_Indice, IdCampo:j.IdCampo});
						if(Opciones){ 
							j.Opciones = Opciones; 
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
						
						if(((j.esTemperatura=='1')||(j.esSelectInput=='1'))){
							j.Opciones = _.union(Seleccione, j.Opciones);
						}
					}
				}
				camposOpcionesProcesadas = true;
			}/*camposOpcionesProcesadas*/
			
			var esAvanzado = 1;
			if(esAvanzado){
				for (var i = 0; i <= jsonTabs.length - 1; i++){
					var idtab = jsonTabs[i].IDTAB;
					
					var jsonCamposFiltrado1 = _.where(jsonCampos, {IdTab:idtab});
					var jsonCamposFiltrado2 = _.where(jsonCampos, {TambienIdTab:idtab});
					var jsonCamposFiltrado = (jsonCamposFiltrado2) ? _.union(jsonCamposFiltrado1,jsonCamposFiltrado2) : jsonCamposFiltrado1;
					jsonCamposFiltrado = _.sortBy(jsonCamposFiltrado,'Orden');
					jsonCamposFiltrado.jsonDatos = jsonCamposFiltrado;
					
					var Compilado = SalesUp.Construye.ReemplazaDatos({Datos:jsonCamposFiltrado, Template:tmpCampos});
					
					$('#divTab-'+idtab).html(Compilado).append('<div class="clear"></div>');
				}
			
				/*Catalogos del sistema pendiente*/
				/*SalesUp.Variables.CargaCatalogosActivos();*/		
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

			var asterisco = function(){
				var arrObligatorios = $('.InfoObligatorio');
				for (var i = 0; i <= arrObligatorios.length - 1; i++){
					$(arrObligatorios[i]).closest('.BoxInfo').find('.InfoLabel').append('*');
				};
			}/*Asterisco*/
			
			agregarControlPaisEstado = function(){
				$('#pPais').attr('onchange','SalesUp.Variables.ltEstados({p:\'pPais\', e:\'pEstado\', m:\'pMunicipio\'});');
				$('#pEstado').attr('onchange','SalesUp.Variables.ltMunicipios({p:\'pPais\', e:\'pEstado\', m:\'pMunicipio\'});');

				$('#Pais').attr('onchange','SalesUp.Variables.ltEstados({p:\'Pais\', e:\'Estado\', m:\'EmpMunicipio\'});');
				$('#Estado').attr('onchange','SalesUp.Variables.ltMunicipios({p:\'Pais\', e:\'Estado\', m:\'EmpMunicipio\'});');
			}/*AgregarControlPaisEstado*/
		
			//asterisco();
			agregarControlPaisEstado();

			//$('#Correo').attr('type','email').attr('onblur','SalesUp.Variables.ValidaEmail({t:this,v:value});');
			
			var onblurInfoUnico = function(){
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
			
			//onblurInfoUnico();

			
			
			/*
			$('#IdFase').val($('#Fase').val());
			$('#IdOrigen').val($('#Origen').val());
			$('#IdIndustria').val($('#Industria').val());
			$('#IdGrupoEmpresarial').val($('#GrupoEmpresarial').val());
			*/
			/*$('.decimal').attr('onKeyPress','return SalesUp.Variables.valDecimales({t:this, e:event});');
			$('.numero').attr('onKeyPress','return SalesUp.Variables.valNumero({t:this, e:event});');
			
			$('.decimal').attr('onblur','SalesUp.Variables.numerosDecimales({t:this});');
			$('.numero').attr('onblur','SalesUp.Variables.numerosEnteros({t:this});');
			$('#Nombre').attr('onchange','SalesUp.Variables.determinaSexo({nombre:value});');*/

			/*activa opciones canalizars -pendiente-*/
			finalizaComponentes();
		}/*procesaContruyeCampos*/

		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Vista/formularioConflictos.dbsp', dataType:'html', callback:procesaContruyeCampos, almacen:'formularioConflictos'});
			
	}/*SalesUp.Variables.ConstruyeCampos*/

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
	var obtenerCampos = function(){
		var esCliente = SalesUp.Variables.EsCliente;
		var almacenCampos = (esCliente=='1') ? 'jsonCamposClientes' : 'jsonCamposProspectos';
		var procesaObtenerCampos = function(Op, err){
			var jc = {jsonDatos:null};
			jc.jsonDatos = _.reject(Op.jsonDatos, function(j){return _.size(j) == 0;});
			jsonCampos = jc;
			procesarDatosCamposContactos();
		}
		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonCampos.dbsp', parametros:'idventana='+idVentana, almacen:almacenCampos, callback:procesaObtenerCampos});
	}/*obtenerCampos*/

	var construyeTabs = function(){
		var esCliente = SalesUp.Variables.EsCliente;
		var almacenTabs = (esCliente=='1') ? 'jsonTabsClientes' : 'jsonTabsProspectos';
		
		var obtenerInfoTabs =  function(tabs, err){
			var procesaTabs = function(jsonTabs, err){
				jsonTabs.jsonDatos = _.reject(jsonTabs.jsonDatos, function(j){ return j.tabF=='4';});
				SalesUp.Variables.jsonTabs = jsonTabs;
				var esAvanzado = 1;
				/*aqui tabF*/
				if(esAvanzado){
					var Compilado = SalesUp.Construye.ReemplazaDatos({Datos:jsonTabs, Template:tabs});
					$('#contenedorTabs').html(Compilado);
					$('#Tabs').tabs();
					SalesUp.Sistema.ModulosActivos();
					obtenerCampos();
				}
			}/*procesaTabs*/

			SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonNombresTab.dbsp', parametros:'idventana='+idVentana, almacen:almacenTabs, callback:procesaTabs});
			
		}/*obtenerInfoTabs*/

		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Vista/TemplateTabs.dbsp', almacen:'TemplateTabs', dataType:'html', callback:obtenerInfoTabs});

	}/*construyeTabs*/

	var muestraVentanaCombinar = function(){
		camposOpcionesProcesadas = false;
		var construyePopUpMerge = function(){
			var primeraVentana = SalesUp.Construye.ReemplazaDatos({Template:templateA,Datos:datosContactos});
			
			SalesUp.Construye.MuestraPopUp({
				alto:'550px', ancho:'800px', centrado:true, id:'CombinarContactos',
				titulo: 'Combinar contactos',
		    	contenido:primeraVentana
			});

			setTimeout(function(){
				SalesUp.Construye.ActivaEsperaGuardando();
				construyeTabs();
			}, 50);
		};
		
		SalesUp.Sistema.CargaDatosAsync({
			link:'/privado/vista/templatecombinacionContactos.dbsp',
			dataType:'html', almacen:'templatecombinacionContactos',
			callback: function(html){
				templateA = html;
				construyePopUpMerge();
			}
		});
	};

	this.cambiarSlave = function(tkSlave){
		SalesUp.Sistema.CargaDatosAsync({
			link:'/privado/Modelo/jsonDatosProspecto.dbsp',
			parametros:{tkp:tkSlave},
			callback:function(Op){ 
				slaveInfo = Op; 
				datosContactos.slave = slaveInfo.jsonDatos[0]; 
				SalesUp.Variables.infoDatos = datosContactos;
				SalesUp.Construye.ActivaEsperaGuardando();
				procesarDatosCamposContactos();
			}
		});
	}

	var getSlaveInfo = function(tkSlave){
		SalesUp.Sistema.CargaDatosAsync({
			link:'/privado/Modelo/jsonDatosProspecto.dbsp',
			parametros:{tkp:tkSlave},
			callback:function(Op){ 
				slaveInfo = Op; 
				datosContactos.slave = slaveInfo.jsonDatos[0]; 
				muestraVentanaCombinar(); 
				SalesUp.Variables.infoDatos = datosContactos;
			}
		});
	};
	
	this.activaCombinarContactos = function(tk){
		tkMaster = tk;
		tks = SalesUp.Variables.accionesComunes.obtenerTotalRegistros('tkp','input.checkboxLimite');
		var index = tks.indexOf(tkMaster);
		if (index > -1) { tks.splice(index, 1); }
		tkSlave = tks[0];
		SalesUp.Sistema.CargaDatosAsync({
			link:'/privado/Modelo/jsonDatosProspecto.dbsp',
			parametros:{tkp:tkMaster},
			callback:function(Op){
				masterInfo = Op;
				datosContactos.master = masterInfo.jsonDatos[0];
				getSlaveInfo(tkSlave);
			}
		});
	};

	this.activarRadio = function(t){
		var $t = $(t), 
		$label = $t.closest('.InfoLabel.nBg'), 
		$BoxInfo = $label.closest('.BoxInfo'),
		$seleccionado = $label.closest('[data-seleccionado]'), 
		
		activo = ($t.is(':checked')) ? 1 : 0;

		$BoxInfo.find('[data-activo]').attr('data-activo', 0);
		$BoxInfo.find('[data-seleccionado]').attr('data-seleccionado', 0);
		$BoxInfo.find('[data-valorSeleccionado]').attr('data-valorSeleccionado', 0);

		$label.attr('data-activo',activo);
		$seleccionado.attr('data-seleccionado', activo);
		$seleccionado.find('[data-valorSeleccionado]').attr('data-valorSeleccionado',activo);
		llenaControles();
	}

	this.verLosCampos = function(t){
		var $t = $(t);
		$t.hide();
		$('#ocultarLosCampos').show();
		$('[data-hayConflicto="0"]').show();	  
	}

	this.ocultarLosCampos = function(t){
		var $t = $(t);
		$t.hide();
		$('#verLosCampos').show();
		$('[data-hayConflicto="0"]').hide();
	}


	this.confirmacionCombinar = function(){
		SalesUp.Construye.MuestraAlerta({
		  TipoAlerta:'AlertaPregunta',
		  Alerta:'<h2 style="margin-bottom:10px;" class="Rojo"><i class="fa fa-warning"></i> Atención</h2>  <p>Al momento de confirmar la combinacion se eliminara el prospecto.</p>',
		  Icono2: '',
		  Icono1: '<i class="fa fa-copy"></i>',
		  Boton1: 'Si',
		  Id:'confirmacionCombinar',
		  Ancho:'450px',
		  Callback1:function(){
		  	 setTimeout(function(){
		  	 	$('#confirmacionCombinar .btnAccion ').attr('onclick','SalesUp.combinar.confirmacionCombinarDoble()');
		  	 },1000);
 		  },
		});
	}

	this.confirmacionCombinarDoble = function(){
		SalesUp.Construye.CierraAlerta({Elemento:$('#confirmacionCombinar .btnNegativo')});
		SalesUp.Construye.MuestraAlerta({
		  TipoAlerta:'AlertaPregunta',
		  Alerta:'<h2 style="margin-bottom:10px;" class="Rojo"><i class="fa fa-warning"></i> Atención</h2>  <p>Una vez confirmando la combinacion, no podra ser revertido y se eliminara el prospecto que se combine con el principal.</p>',
		  Icono2: '',
		  Icono1: '<i class="fa fa-copy"></i>',
		  Boton1: 'Si',
		  Id:'confirmacionReconfirmacion',
		  Ancho:'450px',
		  Callback1:function(){
		  	 setTimeout(function(){
		  	 	$('#confirmacionReconfirmacion .btnAccion ').attr('onclick','SalesUp.combinar.preparaCombinarRegistros()');
		  	 },1000);
 		  },
		});
	}

	this.preparaCombinarRegistros = function(){
		SalesUp.Construye.CierraAlerta({Elemento:$('#confirmacionReconfirmacion .btnNegativo')});
		var datosParaCombinar = $('.boxConflictos').find('[data-valorSeleccionado="1"]');
		/* Mostrar dos alertas para hacer una doble verificacion de combinar informacion y que el otro se eliminará*/
		
		var formData = new FormData();

		for(var i = 0; i < datosParaCombinar.length; i++){
		  formData.append($(datosParaCombinar[i]).attr('name'),$(datosParaCombinar[i]).val());
		}

		formData.append("tkpMaster",$('#tkpMaster').val());
		formData.append("tkpSlave",$('#tkpSlave').val());

		 
		
		SalesUp.Sistema.CargaDatosAsync({
			link:'/privado/Modelo/qryNuevoProspecto.dbsp',
			parametros: formData, formData: true, metodo: 'POST',
			callback:function(Op){
				console.log(Op);	
			},
		});
		/*
			Recorrer el objeto para 
			generar un objeto FormData y hacer append de cada uno con el name y value correspondiente
			agregar al objeto formData los valores faltantes
			tkMaster
			tkSlave
			y enviar al editar prospecto.
			despues eliminar el slave y las notificaciones conrrespondientes
		*/
	}
}


if (window.CombinarContactos){
	SalesUp.combinar = new CombinarContactos();
}

