var empresas = function(){
	var templateOpcionPaises = '<option value="{{IdPais}}" {{#if Seleccionado}}selected="selected"{{/if}}>{{Pais}}</option>';
	var templateOpcionEstados = '<option value="{{IdEstado}}" {{#if Seleccionado}}selected="selected"{{/if}}>{{Estado}}</option>';
	var templateOpcionIndustria = '<option value="{{IdIndustria}}" {{#if Seleccionado}}selected="selected"{{/if}}>{{Industria}}</option>';
	var templateOpcionGruposEmpresariales = '<option value="{{Id}}" {{#if Seleccionado}}selected="selected"{{/if}}>{{GrupoEmpresarial}}</option>';
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

	var camposEmpresa = function(){
	  
	  var tmpCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateFormulario.dbsp', Almacen:'TemplateFormulario'});
	  var jt = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonNombresTab.dbsp', Parametros:'idventana=1', DataType:'json'});
	  var jc = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCampos.dbsp', Parametros:'idventana=1', DataType:'json'});
	  /*var restriccionEmpresa = jc.jsonDatos[6].TipoRestriccion;
	  if (restriccionEmpresa == 1 || restriccionEmpresa == 3) {
	  	$('#Empresa').addClass('InfoUnico');
	  };*/

	  var jTabEmpresa = _.where(jt.jsonDatos,{tabF:'4'});
	  var tabEmpresa=0;
	  if(_.size(jTabEmpresa)){
	    tabEmpresa = jTabEmpresa[0].IDTAB;
	  }

	  jCamposEmpresa = _.where(jc.jsonDatos,{IdTab:tabEmpresa});
	  for (var nn = 0; nn < _.size(jCamposEmpresa); nn++){
	   var j = jCamposEmpresa[nn];
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
	  var compilado = SalesUp.Construye.ReemplazaDatos({Template:tmpCampos, Datos:{jsonDatos:jCamposEmpresa} });
	  return compilado;

	}

	this.nuevaEmpresa = function(editar){
		SalesUp.Variables.editarEmpresa = editar;
		if(SalesUp.Variables.editarEmpresa == 0){
			SalesUp.Construye.MuestraPopUp({alto:'400px', ancho:'720px', id:'popupCrearEmpresa', titulo:'Nueva empresa', fuente:'/privado/popUpDatosEmpresa.dbsp'});
		}else{
			SalesUp.Construye.MuestraPopUp({alto:'400px', ancho:'720px', id:'popupCrearEmpresa', titulo:'Editar empresa', fuente:'/privado/popUpDatosEmpresa.dbsp'});
		};
		setTimeout(function(){
			iniciaCrearEmpresa();
			if(SalesUp.Variables.editarEmpresa == 1){cargarDatosEmpresa();}
			var $t = $('#camposEmpresa').find('#TelefonoCorporativo');
			if ($t) {
				var $dad = $t.parent();
				$dad.find('label').attr('tip','Telefono corporativo');
			}
		},200);

	}

	var cargarDatosEmpresa = function(){
		if(SalesUp.Variables.TkCom){
			$('#BtnAceptaryNuevo').remove();
			$('#BtnAceptaryVer').remove();
			$('#BtnAceptar').html('<i class="fa fa-save"></i> Guardar');
			SalesUp.Variables.jsonCompaniasInformacion = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCompaniasInformacion.dbsp', Parametros:{ tkcom:SalesUp.Variables.TkCom }, DataType:'json' });
			var je = SalesUp.Variables.jsonCompaniasInformacion.jsonDatos[0];
			$('#tkCom').val(SalesUp.Variables.TkCom);
			$('#Editar').val(1);
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
			SalesUp.empresas.CargarEstados({Pais:je.IdPais});
	        $('#NumInterior').val(je.NumInterior);
			$('#NumExterior').val(je.NumExterior);
			$('#Pais').val(je.IdPais);
			SalesUp.empresas.ltEstados({p:je.IdPais, e:je.IdEstado, m:je.idMunicipio});
			$('#Estado').val(je.IdEstado);
			SalesUp.empresas.ltMunicipios({p:'Pais', e:'Estado', m:'EmpMunicipio'});
			$('#EmpMunicipio').val(je.idMunicipio);
			IniciaSelectize({Control:'GrupoEmpresarial'});
		  	IniciaSelectize({Control:'Industria'});			
		}
	}

	var iniciaCrearEmpresa = function(){
	  var $popUpCrearEmpresa = $('#popupCrearEmpresa');
	  var $contenedor = $popUpCrearEmpresa.find('#popup-contenedor');
	  var $formulario = $contenedor.find('#camposEmpresa');
	  $contenedor.prepend(SalesUp.Sistema.unMomento());
	  var html = camposEmpresa();
	  $formulario.html(html);
	  if (SalesUp.Variables.editarEmpresa == 0) {
	  	$('#Pais').val(SalesUp.Variables.PaisDefault);
	    $('#Estado').val(SalesUp.Variables.EstadoDefault);
	    SalesUp.empresas.ltMunicipios({p:'Pais', e:'Estado', m:'EmpMunicipio'});
	  };
	  $contenedor.find('#Empresa').attr('onblur','SalesUp.empresas.muestraEmpresasSimilares({Empresa:value})');
	  $contenedor.find('#Pais').attr('onchange','SalesUp.empresas.CargarEstados({Pais:value})');
	  $('#Pais').attr('onchange','SalesUp.empresas.ltEstados({p:\'Pais\', e:\'Estado\', m:\'EmpMunicipio\'});');
	  $('#Estado').attr('onchange','SalesUp.empresas.ltMunicipios({p:\'Pais\', e:\'Estado\', m:\'EmpMunicipio\'});');
	  $contenedor.find('#Esperando').remove();
	  $contenedor.find('#frmPopupDatosEmpresa').show();
	  SalesUp.Sistema.Asterisco()

	  var IniciaSelectize = function (Op){
		 $SelectizeGrupos = $('#'+Op.Control).selectize({
			create: false,
			dropdownParent: 'body',
			maxItems: 1, persist: false,delimiter:'ª',
       onChange: function(data){ },
		});
	    $('.BoxSizing.InfoData.single').removeClass('InfoData');
	    $('.selectize-control').addClass('InfoData'); 
		}
		if (SalesUp.Variables.editarEmpresa == 0) {
		  IniciaSelectize({Control:'GrupoEmpresarial'});
		  IniciaSelectize({Control:'Industria'});
		};
		SalesUp.Sistema.Tipsy();
	}

	this.muestraEmpresasSimilares = function(Op){
		$('#bSimilares').removeClass('ocultar');
		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonEmpresasSimilares.dbsp',parametros:'empresa='+Op.Empresa,callback:empresasSimilares});
	}

	var empresasSimilares = function(Op,err){
		var listaEmpresas = Op.jsonDatos;
	    listaEmpresas = _.reject(listaEmpresas,function(j){
	      return _.size(j) == 0;
	    });
	    SalesUp.Variables.listaEmpresas = listaEmpresas;
		var totalEmpresas = _.size(listaEmpresas);
	    var html=' ';
	    if(totalEmpresas > 0 ){   
		    html = '<span class="Btn btnNegativo Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Cancelar" onmouseover="SalesUp.empresas.activaPopOver()">Existen <b>('+totalEmpresas+')</b> empresas con nombres similares</span>';
		    $('#empresasSimilares').html(html);
		}else{
	        $('#empresasSimilares').html(html);
	    }
	    $('#bSimilares').addClass('ocultar')
		return;
	}
  
  this.activaPopOver=function(){
    var listaEmpresas = SalesUp.Variables.listaEmpresas;
    var nombres = '<div style=" max-height: 130px; overflow-x:hidden; overflow-y:auto;"><ul>';
    var link = '';
    _.each(listaEmpresas, function(emp){
    	if (emp.LINK == 1) {
    		link ='<span class="Pointer" onclick="document.location=\'EmpresasVisualizar.dbsp?tkcom='+emp.TKCOM+'\'"><i class="fa fa-building-o"></i> <b> '+emp.EMPRESA +' </b></span>';
    	}else{
    		link = '<span ><i class="fa fa-building-o"></i>  '+emp.EMPRESA +' </span>'
    	}
        nombres += '<li>'+link+' <span class="Tip3 Pointer" tip="'+emp.USUARIO+'"> '+emp.INICIALESU+'</span></li>'
    });
    nombres +='</ul></div>';
    SalesUp.Construye.popOver({Elemento:'#empresasSimilares', PopOverLugar:'top', Contenido:nombres, Clases:'PopOverAcciones'});
    SalesUp.Sistema.Tipsy();
  }

	this.CargarEstados = function(Op){
		var Estado ='';
		(Op.Estado) ? Estado = Op.Estado : Estado = SalesUp.Variables.EstadoDefault;
		$('#Estado').html('');

		if(Op.Pais == SalesUp.Variables.PaisDefault){
			SalesUp.Variables.jsonEstados = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonEstados.dbsp', Parametros:'pd='+Op.Pais+'&edo='+Estado, DataType:'json', Almacen:'jsonEstados' });
		}else{
			SalesUp.Variables.jsonEstados = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonEstados.dbsp', Parametros:'pd='+Op.Pais+'&edo='+Estado, DataType:'json' });
		}

		SalesUp.Construye.ConstruyemeUn({
			Control: 'select', Nuevo: false,
			SeleccioneOpcion: SalesUp.Variables.ObligatorioEstado, IdControl: 'Estado',
			Template: templateOpcionEstados,
			Datos: SalesUp.Variables.jsonEstados.jsonDatos
		});
	}

	this.ltEstados = function(Op){
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
	}

	this.ltMunicipios = function(Op){
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
			Compilado = '<option value="-1">(... No disponible ...)</option>';
		}
		iniSelectizeMunicipio({m:Municipio});
		$Municipio.html(Compilado);
	}

	var iniSelectizeMunicipio = function(Op){
		var Municipio = Op.m;
		var $Municipio = $('#'+Municipio);
		var OpcionesSelectize = {
			create: false, dropdownParent:'body', maxItems:1, persist:false, delimiter:'ª',
			onChange: function(data){ 
				$('#Input'+Municipio).val(data);
			}
		}
		
		setTimeout(function(){
			if(Municipio=='EmpMunicipio'){
				if(_.size($SelectizeMunicipio)>0){ $SelectizeMunicipio[0].selectize.destroy();}
				$SelectizeMunicipio  = $Municipio.selectize(OpcionesSelectize);	
			}
			
			setTimeout(function(){
				$('.selectize-control').addClass('InfoData','selectize-dropdown');
				$('.selectize-dropdown.BoxSizing.InfoData.single').removeClass('InfoData');
			}, 600);
			
		}, 500);
	}

	this.EsEmpresaUnica = function(Op){
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
	         var tkCom = $('#tkCom').val();
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

	this.EnviarForma = function(Op){
		SalesUp.Variables.thisActualBoton = Op.t;
		var Pasa = true;
		setTimeout(function() {
			(Pasa) ? Pasa = SalesUp.Valida.ValidaObligatorios() : '';
			(Pasa) ? Pasa = SalesUp.empresas.ValidaCamposUnicos({DentroDe:'#frmPopupDatosEmpresa'}) : '';

			if(Pasa){
				guardarDatos();
			}else{
				SalesUp.Sistema.OcultarOverlay();
			}
		}, 100);
	}

	this.ValidaCamposUnicos = function(Op){
			var Pasa = true, $DentroDe;
			(!Op) ? Op = {} : '';
			(Op.DentroDe) ? $DentroDe = $(Op.DentroDe) : '';
			$DentroDe.find('.InfoUnico').each(function(){
				Pasa = SalesUp.empresas.EsEmpresaUnica({ Elemento: this, Valor: $(this).val() });
				if(!Pasa){return Pasa;}
			});
			return Pasa;
		}/* /ValidaCamposUnicos */
	
	this.AgregaryNuevo = function(){
		$('#AgregarOtro').val(1);
		SalesUp.empresas.EnviarForma(this);
	}

	this.AgregaryVer = function(){
		$('#AgregaryVer').val(1);
		SalesUp.empresas.EnviarForma(this);
	}


	var guardarDatos = function(){
  	  var datos = SalesUp.Sistema.qryString({Formulario:'#frmPopupDatosEmpresa'});
	  SalesUp.Sistema.CargaDatosAsync({link:'Modelo/qryCrear_Editar_Empresa.dbsp',parametros:datos,callback:accionDespues});
	}

	var accionDespues = function(Op,err){
	  if (err) {
	  	SalesUp.Construye.MuestraNotificacion({tMsg:4,Mensaje:'Hubo un error intentelo nuevamente'});
	  };
	  var Respuesta = Op.jsonDatos;
	  if(SalesUp.Variables.Diff==1){
	  	location.href = '/privado/prospectos.dbsp'
	  }else if(SalesUp.Variables.Diff==2){
		location.href = '/privado/clientes.dbsp'
	  }else if(SalesUp.Variables.Diff==3){
		location.href = '/privado/oportunidades.dbsp'
	  }else{	
	  	var irA = 'EmpresasVisualizar.dbsp'; 
	  
	  
		var tkcom = Respuesta[0].tkcom;
		if(Respuesta[0].Ver == 1){
			location.href = '/privado/'+irA+'?tkcom='+tkcom;
		}else if(Respuesta[0].Otro == 1){
			SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-check"></i> Empresa agregada'});
			var datosVacios = SalesUp.Sistema.CargaDatosAsync({link:'/privado/popUpDatosEmpresa.dbsp', dataType:'html', callback:nuevoVacio});
		}else{
			if (SalesUp.Variables.editarEmpresa == 0) {
				SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-check"></i> Empresa agregada'});
			SalesUp.Construye.CierraPopUp({t:SalesUp.Variables.thisActualBoton});
				SalesUp.Variables.thisActualBoton = undefined;
			}else{
				SalesUp.Variables.InformacionEmpresa();
				SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-check"></i> Empresa actualizada'});
			SalesUp.Construye.CierraPopUp({t:SalesUp.Variables.thisActualBoton});
			SalesUp.Variables.thisActualBoton = undefined;
			}

		}
      }	
	}

	var nuevoVacio = function(Op,err){
 
	 $('#popupCrearEmpresa .BodyModal').html(Op);

	 setTimeout(function(){
	   iniciaCrearEmpresa();
	   $('#frmPopupDatosEmpresa').show();
	 },20);	
	}


	var IniciaSelectize = function(Op){				
		
		 $SelectizeGrupos = $('#'+Op.Control).selectize({
			create: false,
			
			dropdownParent: 'body',
			maxItems: 1, persist: false,delimiter:'ª',
			// onChange: function(data){ console.log( data); },
			render: { 
				option_create: function(data, escape){
					return '<div class="create AgregarNuevoMini Btn Btn-rounded Btn-small Btn-flat-Aceptar"><strong>Guardar</strong></div>'; 
				}
			}
		}); 

	} /* /IniciaSelectize */
}

var $SelectizeMunicipio;
if (window.empresas){ SalesUp.empresas = new empresas(); }
/*SalesUp.Variables.InformacionEmpresa();*/
