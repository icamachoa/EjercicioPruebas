Handlebars.registerHelper('detallePorUsuarios', function(){
	var str = '', t = this, detallePorUsuarios = t.detallePorUsuarios, detalleUsuarioMetas = t.detalleUsuarioMetas;
	(detallePorUsuarios) ? str = 'onclick="SalesUp.dashBoard.verDetalleIndividualEmpresarial({t:this});"':'';
	(detalleUsuarioMetas) ? str = 'onclick="SalesUp.dashBoard.verDetalleMetasUsuarios({t:this});"':'';
	return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('estaActivoDetalle', function(){
	var str = '', t = this, detalleMetaActivo = t.detalleMetaActivo, detalleIndividualEmpresarial = t.detalleIndividualEmpresarial, 
		detallePorUsuarios = t.detallePorUsuarios, detalleUsuarioMetas = t.detalleUsuarioMetas;
	str = ((detalleMetaActivo)||(detalleIndividualEmpresarial)||(detallePorUsuarios)||(detalleUsuarioMetas)) ? 'Pointer estaActivoDetalle':'';
	return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('onclikDetalle', function(){
	var str = '', t = this, detalleMetaActivo = t.detalleMetaActivo, detalleIndividualEmpresarial = t.detalleIndividualEmpresarial,
	tipoDetalle = t.tipoDetalle, idFuente = t.idFuente;
	
	str = ((detalleMetaActivo)||(detalleIndividualEmpresarial)) ? ' data-tkmt="'+idFuente+'" data-tipoDetalle="'+tipoDetalle+'" ':'';
	
	if(detalleMetaActivo){
		str += 'onclick="SalesUp.dashBoard.detalleGraficaBarra({t:this});"';
	}

	if(detalleIndividualEmpresarial){
		str += 'onclick="SalesUp.dashBoard.verDetalleIndividualEmpresarial({t:this});"';
	}
	return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('eliminarDashBoard', function(){
	var str = '', t = this, eliminar = t.pModificar;
	str = (eliminar) ? '<span onclick="SalesUp.dashBoard.eliminarDash({t:this});" tip="Eliminar tablero de control" class="Tip2 eliminarTab"><i class="fa fa-times"></i></span>':'';	
	return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('pEditarDashBoard', function(){
	var str = '', t = this, editar = t.pModificar;
	str = (editar) ? 'ondblclick="SalesUp.dashBoard.editarDashBoard({t:this});"':'';	
	return new Handlebars.SafeString(str);
}); 

Handlebars.registerHelper('accionesMenu', function(){
	var accionesMenu = '', t = this, tk = t.tk;
	var tkdb = SalesUp.Variables.tkdbActual;
	var $tab = $('#tab-'+tkdb), pEditar = $tab.attr('data-editar');
	if(pEditar=='0'){return '';}

	accionesMenu += '			<div class="pull-right">';
	//accionesMenu += '				<span data-tk="{{tk}}" class="tCen Pointer opcionesDash"><i class="fa fa-refresh fa-lg Transition"></i></span>';
	accionesMenu += '				<span onmouseenter="SalesUp.dashBoard.accionesPanel({t:this});" data-tk="'+tk+'" class="tCen Pointer opcionesDash"><i class="fa fa-ellipsis-v fa-lg Transition"></i></span>';
	accionesMenu += '			</div>';

	return new Handlebars.SafeString(accionesMenu);
});

var dashBoard = function(){
	var cargandoDashBoard  = SalesUp.Sistema.unMomento();

	var opcionesSelect = '{"tamanio":[{"v":1,"texto":"1x1"},{"v":2,"texto":"1x2"},{"v":3,"texto":"2x1"}],"agrupar":[{"v":1,"texto":"Empresa"},{"v":2,"texto":"Grupos"},{"v":3,"texto":"Ejecutivos"}],"periodos":[{"v":1,"texto":"Esta semana"},{"v":2,"texto":"Esta quincena"},{"v":3,"texto":"Este mes"},{"v":4,"texto":"Este bimestre"},{"v":5,"texto":"Este trimestre"},{"v":6,"texto":"Este año"},{"v":7,"texto":"Fecha específica"}],"mostrar":[{"v":1,"texto":"Sólo este periodo"},{"v":2,"texto":"Últimos 3 periodos"},{"v":3,"texto":"Últimos 6 periodos"},{"v":4,"texto":"Últimos 12 periodos"},{"v":5,"texto":"Últimos 24 periodos"}]}';
		opcionesSelect = JSON.parse(opcionesSelect);

	var preparaOpciones = function(){
		var tmpOpcion = '{{#each opciones}}<option value="{{v}}">{{texto}}</option>{{/each}}';
		var j = {opciones:opcionesSelect.agrupar};
		var htmlOpcion = SalesUp.Construye.ReemplazaDatos({Template:tmpOpcion, Datos:j});
		
		$('#ltAgrupar').html(htmlOpcion);

		j.opciones = opcionesSelect.periodos;
		htmlOpcion = SalesUp.Construye.ReemplazaDatos({Template:tmpOpcion, Datos:j});
		$('#ltPeriodo').html(htmlOpcion);

		j.opciones = opcionesSelect.mostrar;
		htmlOpcion = SalesUp.Construye.ReemplazaDatos({Template:tmpOpcion, Datos:j});
		$('#ltMostrar').html(htmlOpcion);

		j.opciones = opcionesSelect.tamanio;
		htmlOpcion = SalesUp.Construye.ReemplazaDatos({Template:tmpOpcion, Datos:j});
		$('#ltTamanio').html(htmlOpcion);
	}/*preparaOpciones*/

	var contDashVacio  = '';
		contDashVacio += '<div class="w50 boxPanel panelVacio">';
		contDashVacio += '	<div class="panel panel-default">';
		contDashVacio += '		<div class="panel-body Pointer" onclick="SalesUp.dashBoard.nuevoIndicador();"><p><i class="fa fa-plus fa-lg"></i> Agrega un nuevo indicador. <i>Disponibles [RESTAN]</i></p></div>';
		contDashVacio += '	</div>';
		contDashVacio += '</div>';
		contDashVacio += '';

	var templatePanel  = '{{#each jsonGraficas}}';
		templatePanel += '<div class="w50 boxPanel panelDatos" id="panel-{{tk}}">';
		templatePanel += '	<div class="panel panel-default">';
		templatePanel += '		<div class="panel-heading">';
		templatePanel += '			<b class="tituloIndicador Ellipsis w80">{{titulo}}</b>';
		templatePanel += '			{{accionesMenu}}<div class="clear"></div>';
		templatePanel += '		</div>';
		templatePanel += '		<div class="panel-body">'+cargandoDashBoard+'</div>';
		templatePanel += '	</div>';
		templatePanel += '</div>';
		templatePanel += '{{/each}}';
		templatePanel += '';

	var li  = '';
		li += '{{#each jsonDatos}}';
		li += '<li data-editar="{{pModificar}}" id="tab-{{tkdb}}">';
		li += '	<a data-tkdb="{{tkdb}}" {{pEditarDashBoard}} onclick="SalesUp.dashBoard.obtieneDashBoard({t:this});" href="#dash-{{tkdb}}">';
		li += '		{{dashBoard}} ';
		li += '		{{eliminarDashBoard}}';
		li += '	</a>';
		li += '</li>{{/each}}';

	var tab  = '';
		tab += '<ul>';
		tab += li;
		tab += '<li id="tabNuevoDash"><a tip="Agrega un tablero de control" class="Tip1" onclick="SalesUp.dashBoard.nuevoDash();" href="#nuevoDash"><i class="fa fa-plus"></i></a></li>';
		tab += '</ul>';

	var divTab  = '';
		divTab += '{{#each jsonDatos}}<div id="dash-{{tkdb}}" data-tkdb="{{tkdb}}">';
		divTab += '<div class="w100 boxDash">'+cargandoDashBoard+'</div>';
		divTab += '<div class="clear"></div>';
		divTab += '</div>{{/each}}';
		divTab += '<div id="nuevoDash"></div>';

	var barraDetalle = '';
		barraDetalle += '{{#each jDetalle}}';
		barraDetalle += '<div class="Pointer w100 graficaDetalle" data-tkmt="{{../tkmt}}" data-tipodetalle="{{../tipoDetalle}}" data-id="{{id}}" data-avance="{{avance}}" data-total="{{total}}" onclick="SalesUp.dashBoard.verDetalle({t:this});">';
		barraDetalle += '	<div class="w100 pb5"><div class="w65 tIzq Ellipsis pl5 Bold">{{titulo}}</div></div>';
		barraDetalle += '	<div class="w100 progress progress-striped">';
		barraDetalle += '		<span class="LbPorcentaje">{{pct}}</span>';
		barraDetalle += '		<div class="progress-bar Transition {{../colorGrafica}}" data-porcentaje="{{pct}}"></div>';
		barraDetalle += '	</div>';
		barraDetalle += '	<div class="w100 tCen Italic Ellipsis strDetalleAvance">{{#if ../soloAvance}}{{avance}}{{else}}{{avance}} de {{total}}{{/if}}</div>';
		barraDetalle += '	<div class="clear"></div>';
		barraDetalle += '</div>';
		barraDetalle += '<div class="clear"></div>';
		barraDetalle += '{{/each}}';
	
	var templateDetalleIndividualEmpresarial = ''; 
		templateDetalleIndividualEmpresarial += '{{#each jDetalle}}';
		templateDetalleIndividualEmpresarial += '<div class="{{estaActivoDetalle}} w100 graficaDetalle" data-tkmt="{{../tkmt}}" data-tipodetalle="{{../tipoDetalle}}" data-idGrupo="{{id}}{{idGrupo}}" data-idUsuario="{{idUsuario}}" {{detallePorUsuarios}} >';
		templateDetalleIndividualEmpresarial += '	<div class="w100 pb5"><div class="w65 tIzq Ellipsis pl5">{{#if idUsuario}}{{responsable}}{{else}}{{titulo}}{{/if}} <i class="fa fa-arrow-down iconoVerDetalle"></i></div><div class="w35 tDer Ellipsis pl5 Italic">{{inicio}} - {{fin}}</div></div>';
		templateDetalleIndividualEmpresarial += '	<div class="w100 progress progress-striped">';
		templateDetalleIndividualEmpresarial += '		<span class="LbPorcentaje">{{pctString}}</span>';
		templateDetalleIndividualEmpresarial += '		<span class="LbIndicador Pointer Transition Tip8" data-left="{{metaDeseada}}" tip="Deseado: {{cantidadDeseada}}"></span>';
		templateDetalleIndividualEmpresarial += '		<div class="progress-bar Transition {{colorGrafica}}" data-porcentaje="{{pctCss}}"></div>';
		templateDetalleIndividualEmpresarial += '	</div>';
		templateDetalleIndividualEmpresarial += '	<div class="w100 tCen Italic Ellipsis strDetalleAvance">{{#if ../soloAvance}}{{avance}}{{else}}{{avance}} de {{meta}}{{/if}}</div>';
		templateDetalleIndividualEmpresarial += '	<div class="clear"></div>';
		templateDetalleIndividualEmpresarial += '</div>';
		templateDetalleIndividualEmpresarial += '<div class="clear"></div>';
		templateDetalleIndividualEmpresarial += '{{/each}}';

	var templateTabs = tab+divTab;

	var seleccionarCompartir = function (v){
		if (v==2) {ltGrupos();}
		if (v==3) {ltEjecutivos();}
	}

	var $selectCompartir;

	var ltGrupos = function(){
		var $ltCompartir = $('#ltCompartir');
		$ltCompartir.addClass('InfoObligatorio').attr('placeholder','Seleccionar grupos...').show();
	  	
		var construyeSelectize = function(Op,err){
			var jsonGrupos = Op.jsonDatos;

			setTimeout(function(){
				$selectCompartir = $('#ltCompartir').selectize({
					dropdownParent:'body', closeAfterSelect:true,
					options:jsonGrupos,
					valueField:'tkg', searchField:['Grupo'], labelField:'Grupo'
				});

				$('.ltCompartirDash.selectize-control').addClass('w100');
				$('.ltCompartirDash.selectize-dropdown').css('z-index','110');

			}, 5);
		}/*construyeSelectize*/

	  	SalesUp.Sistema.CargaDatosAsync({ link:'/privado/Modelo/jsonGruposAutorizados.dbsp', callback:construyeSelectize });
		
	} /*ltGrupos*/

	var ltEjecutivos = function(){
		
		var $ltCompartir = $('#ltCompartir');

		var construyeSelectize = function(Op,err){
			var jsonUsuarios = Op;
			jsonUsuarios = _.reject(jsonUsuarios.jsonDatos, function(j){  
				if(j.tku == sTku){ return j; }
			});

			var arrGrupos = [], arrIdGrupos = [], objGrupos = [], arrNuevoOrden = [];
			var Posicion, MiGrupo;
			
			for(var i = 0; i <= jsonUsuarios.length - 1; i++){
				var arr = {}, GRUPO = jsonUsuarios[i].GRUPO, IDGRUPO = jsonUsuarios[i].IDGRUPO;
				
				if(arrGrupos.indexOf(GRUPO)==-1){
					arr.GRUPO = GRUPO;
					objGrupos.push(arr);
					arrGrupos.push(GRUPO);
					arrIdGrupos.push(IDGRUPO);
				}
			}

			for(var x = 0; x < _.size(arrIdGrupos); x++){
				if(arrIdGrupos[x]==sGrupo){Posicion=x;}
			}

			MiGrupo = arrGrupos[Posicion];

			arrGrupos = _.reject(arrGrupos, function(arr){ if(arr==MiGrupo){return arr;} });

			arrNuevoOrden.push(MiGrupo);

			arrGrupos = _.sortBy(arrGrupos, function(arr){ return arr; });

			for(var z = 0; z < _.size(arrGrupos); z++){
				arrNuevoOrden.push(arrGrupos[z]);
			}
		  
			$ltCompartir.addClass('InfoObligatorio').attr('placeholder','Seleccionar ejecutivos...').show();
		  
			setTimeout(function(){
				$selectCompartir = $('#ltCompartir').selectize({
					dropdownParent:'body', closeAfterSelect:true, plugins: ['optgroup_columns'],
					options:jsonUsuarios,
				    valueField:'tku', searchField:['NOMBRE'], labelField:'NOMBRE',
				    optgroups:objGrupos, optgroupField:'GRUPO', optgroupLabelField:'GRUPO', 
				    optgroupValueField:'GRUPO', optgroupOrder:arrNuevoOrden
				});

				$('.ltCompartirDash.selectize-control').addClass('w100');
				$('.ltCompartirDash.selectize-dropdown').css('z-index','110');
			}, 5);

		}/*construyeSelectize*/

		SalesUp.Sistema.CargaDatosAsync({ link:'/privado/Modelo/jsonListarUsuarios.dbsp', callback:construyeSelectize });

	} /* ltEjecutivos */

	this.accionesPanel = function(Op){
		var t = Op.t, $t = $(t), tk = $t.attr('data-tk');
		var htmlAcciones  = '';
			htmlAcciones += '<span class="OpcionAcciones Pointer" onclick="SalesUp.dashBoard.eliminarIndicador({tk:\''+tk+'\'});"><i class="fa fa-lg fa-trash"></i> Eliminar indicador</span>';
		
		SalesUp.Construye.popOver({Elemento:t, PopOverLugar:'left', Contenido:htmlAcciones, Clases:'PopOverAcciones'});
	}/*accionesPanel*/

	var destruirSelect = function(){
		
		$('.ltCompartirDash.selectize-control').removeClass('w100');
		
		if($selectCompartir){
			if($selectCompartir[0].selectize){
				$selectCompartir[0].selectize.destroy();
			}
		}
		
		$('#ltCompartir').removeClass('InfoObligatorio').val('').hide();
	}/*destruirSelect*/

	var sinDashBoard = function(){
		var mensaje = '<i class="fa fa-lg fa-info-circle"></i> Aún no tienes ningún tablero creado, da clic en la pestaña con el simbolo de <i style="margin:0;" class="fa fa-plus fa-lg"></i> o <b onclick="SalesUp.dashBoard.nuevoDash();" class="Pointer">aqui</b> para agregar uno.';
		SalesUp.Construye.SinResultados({Destino:'#nuevoDash', Msg:mensaje});
	}/*sinDashBoard*/


	var iniSelectizeFuentes = function(){
		
	  var objSelectize = {
	    persist: true, maxItems: 1,
	    dropdownParent:'body', closeAfterSelect:true,
	    valueField:'tk', labelField:'descripcion', searchField:['descripcion', 'componente'],
	    options:[], create:false, openOnFocus:false, closeAfterSelect:true, loadThrottle:500,
	    optgroups:[{tipo:1,name:'Metas activas'},{tipo:2,name:'Actividades'},{tipo:3,name:'Métricas'}],
	    optgroupField:'tipo',optgroupLabelField:'name',optgroupValueField:'tipo',
	    optgroupOrder:['Metas activas','Actividades','Métricas'], loadingClass:'buscandoCorreos',
	    render: {
	        option: function(item, escape) {
	            
	            var opcionIndicador = '<div class="w100">';
	            	opcionIndicador += '<div class="w60 Ellipsis Bold">'+escape(item.descripcion)+'</div>';
	            	opcionIndicador += '<div class="w40 Ellipsis tDer Italic">'+escape(item.responsable)+'</div>';
	            	opcionIndicador += '<div class="w50 Ellipsis">'+escape(item.componente)+'</div>';
	            	opcionIndicador += '<div class="w50 Ellipsis tDer Italic">'+escape(item.fInicio)+' - '+escape(item.fFin)+'</div>';
	            	opcionIndicador += '';
	            	opcionIndicador += '</div>';

	            return opcionIndicador;
	        }
	    }
	  }/*objSelectize*/

	  var selector = 'ltFuentes', idSelector = '#'+selector, claseSelector = '.'+selector, $selector = $(idSelector), $selectize;

	  var funcionLoad = function(query, callback){
	    if(!_.size(query)){return callback();}
	    if(_.size(query)>=2){
	      callback();
	      $selectize = $('.selectize-control'+claseSelector).find('.selectize-input');
	      $selectize.find('input').after('<span class="buscarCorreos"><i class="fa fa-spin fa-spinner"></i> buscando...</span>');

	      var procesaContactos = function(Op, err, adc){ 
	        if(Op){
				SalesUp.Variables.jFuentes = Op.jsonDatos;
				SalesUp.Variables.jMetasActivas = Op.jsonDatos;
	          adc.callback(Op.jsonDatos);
	          
	          $selectize.find('.buscarCorreos').remove();
	        } 
	      }
	      
	      var adicionales = {selector:$selectize, callback:callback};
	      SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonMetasActivas.dbsp', parametros:{buscar: query}, prmAdicionales:adicionales, callback:procesaContactos});					
	    }
	  }

	  var funcionCambio =  function(data){ 
	    var a = []; a.push(data);
	    SalesUp.Variables.fuenteSeleccionada = a;
	    
	  }

	  objSelectize.load = funcionLoad;
	  objSelectize.onChange = funcionCambio;

	  $selector.selectize(objSelectize);
	  $('.selectize-control'+claseSelector).addClass('BoxSizing InfoData w100');
	}/*iniSelectizeFuentes*/


	var cargarFuentes = function(){
		iniSelectizeFuentes();
		return true;
		var perparaFuentes = function(Op, err){
			if (err){
				console.warn('error', err);
				SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'Hubo un error al momento de cargar las fuentes de datos, intentalo nuevamente.', Destino:'#contenedor'});
				return false;
			}

			var jFuentes = Op;			

			var preparaArbol = function(Op, err){
				var jMetasActivas = Op.jsonDatos;
				jMetasActivas = _.reject(jMetasActivas,function(j){ return _.size(j)==0;});
				var nMetas = _.size(jMetasActivas);
				var jMeta = [];
				SalesUp.Variables.jMetasActivas = jMetasActivas;
				if(!nMetas){
					var j = {}, d = jMetasActivas[nm];
					j.id = 'sinMeta';
					j.parent = 'indicadoresMetas';
					j.text = 'No hay metas activas disponibles.';
					j.icon = 'fa fa-times';
					j.tipoFuente = 1;
					j.detalle = 0;
					j.filtros = false;
					jMeta.push(j);
				}

				for(var nm=0;nm<nMetas;nm++){
					var j = {}, d = jMetasActivas[nm];
					var texto =  d.descripcion;
						texto += ' (';
						texto += ((d.responsable)?(d.responsable+', '):'');
						texto += d.componente;
						texto += ')';

						texto = '<span class="Tip1" tip="Inicio: '+SalesUp.Sistema.FormatoFecha(d.fInicio) + ' <br/> Fin: '+SalesUp.Sistema.FormatoFecha(d.fFin)+'">'+texto+'</span>';
						
					j.id = d.tk;
					j.parent = 'indicadoresMetas';
					j.text = texto;
					j.icon = 'fa fa-angle-right';
					j.tipoFuente = 1;
					j.detalle = d.detalle;
					j.filtros = false;
					jMeta.push(j);
				}

				jFuentes = _.union(jFuentes,jMeta);
				
				SalesUp.Variables.jFuentes = jFuentes;
				var $divFuentes = $('#divFuentes');

				$divFuentes.on("changed.jstree", function (e, data){
					var seleccionado = data.changed.selected;
					SalesUp.Variables.fuenteSeleccionada = seleccionado;
				}).jstree({
					plugins:[ "search", "wholerow", "types", "changed"],
					core:{ data:jFuentes }
				});

				var to = false;
				var $ltFuentes = $('#ltFuentes');
				$ltFuentes.keyup(function () {
					if(to) { clearTimeout(to); }
					to = setTimeout(function () {
						var v = $ltFuentes.val();
						$divFuentes.jstree(true).search(v);
					}, 250);
				});

				setTimeout(SalesUp.Sistema.Tipsy, 300);
			}/*preparaArbol*/
			
			SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonMetasActivas.dbsp', callback:preparaArbol});
				
		}/*perparaFuentes*/

		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonDashBoardFuentes.dbsp', callback:perparaFuentes});
		
	}/*cargarFuentes*/

	this.tabsDashBoard = function(){
		var preparaTabs = function(Op,err){
			if (err){
				console.warn('error', err);
				SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'Hubo un error al momento de cargar las secciones, intentalo nuevamente.', Destino:'#contenedor'});
				return false;
			}

			var jsonDashBoard, Compilado, tkdb, vieneDe, orden = 1;

			jsonDashBoard = Op;
			jsonDashBoard.jsonDatos = _.reject(jsonDashBoard.jsonDatos, function(j){ return _.size(j)==0;})
			Compilado = SalesUp.Construye.ReemplazaDatos({Template:templateTabs, Datos:jsonDashBoard});

			SalesUp.Variables.jsonDashBoard = jsonDashBoard;

			jsonDashBoard = jsonDashBoard.jsonDatos;

			var nLi = _.size(jsonDashBoard);
			(nLi==10) ? $('#tabNuevoDash').hide():'';

			orden = orden - 1;
			
			if (_.size(jsonDashBoard)){
				tkdb = jsonDashBoard[0].tkdb;
				//jsonDashBoard = _.where(jsonDashBoard,{orden:1});
			}
			
			SalesUp.Variables.tkdbActual = tkdb;

			$('#Tabs.dashBoardTabs').html(Compilado).tabs({active:orden}).show();

			var li = $('#Tabs.dashBoardTabs .ui-tabs-nav').find('li')[0];
			var a = $(li).find('a')[0];

			(!tkdb) ? sinDashBoard():'';
			(tkdb)  ? SalesUp.dashBoard.obtieneDashBoard({t:a}) : '';
		}/*preparaTabs*/
		
		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonDashBoard.dbsp', callback:preparaTabs});
	}/*tabsDashBoard*/

	this.nuevoDash = function(){
		SalesUp.Construye.MuestraPopUp({
			alto:'120px', ancho:'450px', centrado:false, id:'popUpNuevoDash',
			titulo:'Nueva sección',
			fuente:'/privado/PopUpNuevoDash.dbsp'
		});

		setTimeout(function() {$('#nombreDash').focus();}, 400);
	}/*nuevoDash*/

	this.compartir = function(v){
		var $pop = $('#popUpNuevoDash'), $boxSeleccionar = $('#boxSeleccionarCompartir');
		var alto = '120px';
		destruirSelect();
		$boxSeleccionar.hide();
		
		if((v==2)||(v==3)){
			alto='auto'; 
			$boxSeleccionar.show();
			seleccionarCompartir(v);
		}
		
		$pop.find('.BodyModal').css('height',alto);
	}/*compartir*/

	var dashBoardDisponibles = function(){
		/*$('#Tabs.dashBoardTabs');*/
	}

	this.crearDashBoard = function(Op){

		var ventana = Op.t, $form = $(ventana).closest('form'), qryString;
		var $contVentana = $(ventana).closest('.ContenedorModal.PopUp');
		var pasa = SalesUp.Valida.ValidaObligatorios({DentroDe:$form, DestinoMsj:$contVentana});
		
		var nuevoTab = function(Op,err){
			
			if (err){
				console.warn('error', err);
				SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'No se pudo crear la nueva sección, intentalo nuevamente.', Destino:'#contenedor'});
				SalesUp.Construye.CierraPopUp({t:ventana});
				return false;
			}

			SalesUp.Construye.CierraPopUp({t:ventana});

			var jDash = Op;
			var tabDiv, liCompilado, tkdb;
			
			var editado = jDash.jsonDatos[0].editado;
			
			if(editado){
				var nombreDash = jDash.jsonDatos[0].dashBoard;
				tkdb = SalesUp.Variables.tkdbActual;
				var $a = $('a[href="#dash-'+tkdb+'"]');
					$a.html(nombreDash+' <span onclick="SalesUp.dashBoard.eliminarDash({t:this});" tip="Eliminar tablero de control" class="Tip2 eliminarTab"><i class="fa fa-times"></i></span>');
				SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-check"></i> Sección editada.'});
				return true;
			}

			tkdb = jDash.jsonDatos[0].tkdb;
			SalesUp.Variables.tkdbActual = tkdb;

			tabDiv = SalesUp.Sistema.StrReplace('<div id="nuevoDash"></div>','',divTab);
			tabDiv = SalesUp.Construye.ReemplazaDatos({Template:tabDiv, Datos:jDash});
			
			liCompilado = SalesUp.Construye.ReemplazaDatos({Template:li, Datos:jDash});
					
			var $tab = $('#Tabs.dashBoardTabs');
			var $nuevoTab = $tab.find('.ui-tabs-nav').find('li#tabNuevoDash');
			$nuevoTab.before(liCompilado);
			$tab.append(tabDiv);
			$tab.tabs('refresh');
			
			var arrLi = $tab.find('li');
			var activar = $nuevoTab.index()-1;
			
			$tab.tabs( 'option', 'active', activar );

			var $a = $('li#tab-'+tkdb).find('a');
			var a = $a[0];
			
			SalesUp.dashBoard.obtieneDashBoard({t:a});

			SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-check"></i> Nueva sección creada.'});
			
			$('#nuevoDash').html('');

			var nLi = _.size($('#Tabs.dashBoardTabs .ui-tabs-nav').find('li'));
			
			(nLi==11) ? $('#tabNuevoDash').hide():'';
		}

		if(pasa){
			SalesUp.Construye.ActivaEsperaGuardando();
			qryString = SalesUp.Sistema.qryString({Formulario:$form});
			SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/qryNuevoDashBoard.dbsp', parametros:qryString, callback:nuevoTab});
		}

	}/*crearDashBoard*/

	this.editarDashBoard = function(Op){
		var t = Op.t, $t = $(t), tkdb = SalesUp.Variables.tkdbActual;
		var popEditar = function(Op,err){
			var jd = Op.jsonDatos[0], dash = jd.dashBoard, compartido = jd.compartido, tks = jd.tks;

			SalesUp.Construye.MuestraPopUp({
				alto:'120px', ancho:'400px', centrado:false, id:'popUpNuevoDash',
				titulo:'Editar sección',
				fuente:'/privado/PopUpNuevoDash.dbsp?dash='+dash+'&tkdb='+tkdb
			});

			setTimeout(function(){
				var $frmPestania = $('#frmPestania');
				$('#selectCompartirDash').val(compartido);
				SalesUp.dashBoard.compartir(compartido);
				$('#ltCompartir').val(tks);
				$('#nombreDash').val(dash);
			}, 500);
		}/*popEditar*/

		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonDashBoardInfo.dbsp', parametros:'tkdb='+tkdb, callback:popEditar});
	}/*editarTab*/

	this.eliminarDash = function(Op){
		var t = Op.t, $t = $(t);
		var callback = 'SalesUp.dashBoard.confirmaEliminarDash()', 
			pregunta = '<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/>¿Estas seguro de eliminar la sección?<br/><br/><i><b>Nota:</b> Si tiene compartida la sección, los demas integrantes dejaran de verla.</i>';

		SalesUp.Construye.MuestraAlerta({
			TipoAlerta:'AlertaPregunta', Alerta:pregunta, Id:'alertaEliminarSeccion',
			Boton1:'Si, eliminar', Icono1:'<i class="fa fa-trash"></i>', Callback1: callback,
			Boton2:'Cancelar', Icono2:'',
			Ancho:'500px'
		});
	}/*eliminarDash*/

	this.confirmaEliminarDash = function(){
		var tkdb = SalesUp.Variables.tkdbActual;
		
		var eliminarSeccion = function(Op,err){
			if(err){
				console.warn('error', err);
				$('#alertaEliminarSeccion').remove();
				SalesUp.Construye.MuestraMsj({tMsg:4, Msg:' No se pudo eliminar la sección, intentalo nuevamente.', Destino:'#contenedor'});
				return false;
			}

			$('#tab-'+tkdb).remove();
			$('#dash-'+tkdb).remove();
			
			var $tab = $('#Tabs.dashBoardTabs');
			$tab.tabs('refresh');
			$tab.tabs( 'option', 'active', 0 );

			var $li = $($tab.find('ul li').not('#tabNuevoDash')[0]);
			if (_.size($li)){SalesUp.dashBoard.obtieneDashBoard({t:$li.find('a')});}
			
			SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-check"></i> Sección eliminada.'});

			var nLi = _.size($('#Tabs.dashBoardTabs .ui-tabs-nav').find('li'));
			(nLi==1) ? sinDashBoard():'';
			(nLi<11) ? $('#tabNuevoDash').show():'';
			
		}

		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/qryEliminarDashBoard.dbsp', parametros:'tkdb='+tkdb, callback:eliminarSeccion});
	}/*confirmaEliminarDash*/

	var generaGrafica = function(Op, err, adc){
		var jResp = Op.jsonDatos;
		Op.jsonDatos = _.reject(jResp,function(j){return _.size(j)==0});
		var mensaje = '<div class="SinResultados BoxSizing w100"><i class="fa fa-lg fa-info-circle"></i> El indicador no poseé datos para mostrar.</div><div class="clear"></div>';
		var tkdb = SalesUp.Variables.tkdbActual, tk = adc.tk, idGrafica = adc.idGrafica;
		var $dash = $('#dash-'+tkdb), $panel = $dash.find('#panel-'+tk), $panelBody = $panel.find('.panel-body');
		try{adc.jConfiguracion = JSON.parse(adc.jConfiguracion);}catch(e){adc.jConfiguracion = {};}
		
		if(!_.size(Op.jsonDatos)){$panelBody.html(mensaje);return;}

		if(idGrafica==1){
			var tipoDetalle = adc.jConfiguracion.tipoDetalle;
			if(tipoDetalle>0){
				graficasBarras({datos:Op, donde:$panelBody, jc:adc});
			}else{
				graficaIndividualGeneralBarras({datos:Op, donde:$panelBody, jc:adc});
			}
		}

	}/*generaGrafica*/

	var indicadorDeseado = function(Op){
	  	var diasTranscurridos = Op.diasTranscurridos;
	  	var numDias = Op.numDias;
	  	var formatodelNumero = Op.formato;
	  	var meta = Op.meta;
	  	var pct = Op.pct;
	  	var metaDeseada = 0, cantidadDeseada = 0;
	  	var loDeseado = {};

	  	if (diasTranscurridos>0){
			if (diasTranscurridos>numDias){
				metaDeseada = 100;
				cantidadDeseada = meta;
			}else{
				metaDeseada = (diasTranscurridos/numDias) * 100;
				cantidadDeseada = (diasTranscurridos/numDias) * meta;
			}
		}
		
		var diferenciaDeseadoReal = metaDeseada - (pct * 100);
		loDeseado.colorGrafica = 'progress-bar-success';
		
		if(diferenciaDeseadoReal >= 10){
			loDeseado.colorGrafica = 'progress-bar-danger';
		}else if( (diferenciaDeseadoReal <= 10) && (diferenciaDeseadoReal > 0) ){
			loDeseado.colorGrafica = 'progress-bar-warning';
		}else if(diferenciaDeseadoReal <= 0){
			loDeseado.colorGrafica = 'progress-bar-success';
		}

		loDeseado.cantidad = formatoNumero(cantidadDeseada, formatodelNumero);
		loDeseado.metaDeseada = metaDeseada+'%';

		return loDeseado;
	  }/*indicadorDeseado*/

	var graficaIndividualGeneralBarras = function(Op){
		var infoDatos = Op.datos.jsonDatos;
		var nInfoDatos = _.size(infoDatos)
		var primeraLinea = infoDatos[0];
		var avance = 0, diasTranscurridos = 0, esHoy = 0, meta = 0, numDias = 0, pct= 0;

		numDias = infoDatos[0].diasMetas;
		diasTranscurridos = infoDatos[0].transcurridosMeta;
		for (var i = 0 ; i<nInfoDatos; i++){
			avance += infoDatos[i].avance;
			meta += infoDatos[i].meta;
			pct += infoDatos[i].pct;
			/*porcada meta individual del usuario*/
			var loDeseado = indicadorDeseado({
					meta:infoDatos[i].meta, 
					pct:infoDatos[i].pct, 
					diasTranscurridos:infoDatos[i].diasTranscurridos, 
					numDias:infoDatos[i].numDias, 
					formato:infoDatos[i].formato
				});
			
			infoDatos[i].cantidadDeseada = loDeseado.cantidad;
			infoDatos[i].metaDeseada = loDeseado.metaDeseada;
			infoDatos[i].colorGrafica = loDeseado.colorGrafica;
		}

		var pctOriginal = 0, pctString = '', pctCss = '';
		pct = avance / meta;
		pctOriginal = pct*100;
		pctOriginal = SalesUp.Sistema.NumeroDosDecimales(pctOriginal);
		pctString = pctOriginal+'%';
		pctCss = pctOriginal+'%';
		
		if(pctOriginal>=100){ pctCss = '100%'; }

		var d = {
					jsonDatos:[
						{
							avance:avance, 
							meta:meta, 
							pct:pct,
							pctOriginal:pctOriginal,
							pctString:pctString,
							pctCss:pctCss,
							formato:primeraLinea.formato, 
							diasTranscurridos:diasTranscurridos, 
							numDias:numDias,
							fin:primeraLinea.maxFin,
							inicio:primeraLinea.minInicio,
							responsable:'Todos',
							tipoMeta:primeraLinea.tipoMeta,
							titulo:primeraLinea.titulo, 
							detalleIndividualEmpresarial:true
						}
					]
				};
		/*Op.jc.jConfiguracion.detalleMetaActivo = true;*/
		
		var detallePorUsuarios = (infoDatos[0].idUsuario)?true:false;
	 	var arrDetalleMeta = {};
		arrDetalleMeta.tkmt = Op.jc.jConfiguracion.idFuente;
		arrDetalleMeta.empresarial = d.jsonDatos;
		arrDetalleMeta.dMetas = infoDatos;
		arrDetalleMeta.detallePorUsuarios = detallePorUsuarios;
		
		SalesUp.Variables.detalleMetas.push(arrDetalleMeta);
	 	
	 	
	 	var tkmt = Op.jc.jConfiguracion.idFuente;
		var detalleMetas = SalesUp.Variables.detalleMetas;
		    detalleMetas = _.where(detalleMetas,{tkmt:tkmt})[0];
		var idUsuario = detalleMetas.dMetas[0].idUsuario;
		var dMetas = detalleMetas.dMetas;
		var empresarial = detalleMetas.empresarial[0];
		var objGrupos = obtieneArrGrupos(dMetas);
		
		var nGrupos = _.size(objGrupos);
		var total = parseFloat(empresarial.avance);
		var formato = parseInt(empresarial.formato);
		var esDinero = false;

		for(var i = 0; i < nGrupos; i++){
		  var idGrupo, contar=0, avance=0, pct=0, totalMetas=0,metaGrupal=0;
		  var diasTranscurridosGrupal = 0, numDiasGrupal = 0;
		  var pctOriginal = 0, pctString='', pctCss='';

		  idGrupo = parseInt(objGrupos[i].id);

		  var usrGrupos = _.where(dMetas,{idGrupo:idGrupo}); 
		  var totalMetas = _.size(usrGrupos);
		  
		  usrGrupos = _.sortBy(usrGrupos, function(j){ return (-1*j.avance) });
		  
		  diasTranscurridosGrupal = parseInt(usrGrupos[0].transcurridosMeta);
		  numDiasGrupal = parseInt(usrGrupos[0].diasMetas);

		  for(var ng=0;ng<_.size(usrGrupos);ng++){
		    var infousr = usrGrupos[ng];
		    avance += infousr.avance;
		    metaGrupal += infousr.meta;
		    /*
		    diasTranscurridosGrupal += parseInt(infousr.diasTranscurridos);
		    numDiasGrupal += parseInt(infousr.numDias);
		    */
		  }
		  /*aqui*/
		  (detallePorUsuarios) ? objGrupos[i].usuarios = prepararLosUsuariosMetas(usrGrupos):'';
		  /*
		  objGrupos[i].fin = primeraLinea.maxFin;
		  objGrupos[i].inicio = primeraLinea.minInicio;
		  */
		  objGrupos[i].detallePorUsuarios = detallePorUsuarios;
		  objGrupos[i].avance = avance;
		  objGrupos[i].numeroAvance = avance;
		  objGrupos[i].meta = metaGrupal;
		  
		  pct = (avance/metaGrupal);
		  
		  pctOriginal = pct*100;
		  pctOriginal = SalesUp.Sistema.NumeroDosDecimales(pctOriginal);

		  pctString = pctOriginal+'%';
		  pctCss = pctOriginal+'%';
		  if(pctOriginal>100){pctCss = '100%';}

		  objGrupos[i].pct = pct;
		  objGrupos[i].pctOriginal = pctOriginal;
		  objGrupos[i].pctString = pctString;
		  objGrupos[i].pctCss = pctCss;
		  	
		  if(formato==1){
		    objGrupos[i].avance = SalesUp.Sistema.FormatoMoneda(avance);
		    objGrupos[i].total = SalesUp.Sistema.FormatoMoneda(total);
		  }

		  objGrupos[i].diasTranscurridos = diasTranscurridosGrupal;
		  objGrupos[i].numDias = numDiasGrupal;

		  var loDeseado = indicadorDeseado({meta:metaGrupal, pct:pct, diasTranscurridos:diasTranscurridosGrupal, numDias:numDiasGrupal, formato:primeraLinea.formato});
		  
		  objGrupos[i].cantidadDeseada = loDeseado.cantidad;
		  objGrupos[i].metaDeseada = loDeseado.metaDeseada;
		  objGrupos[i].colorGrafica = loDeseado.colorGrafica;
		}/*FOR i < nGrupos;*/

		objGrupos = _.sortBy(objGrupos, function(j){ return (-1*j.pct) });
		detalleMetas.grupos = objGrupos;
		/*pinta la grafica global*/
		graficasBarras({datos:d, donde:Op.donde, jc:Op.jc});
	}/*graficaIndividualGeneralBarras*/

	var prepararLosUsuariosMetas = function(arrUsr){
		var dif = _.pluck(arrUsr,'idUsuario');
		var arrIdUsuariosUnicos = _.uniq(dif);
		var nIdUsuariosUnicos = _.size(arrIdUsuariosUnicos);

		var ltUsuarios = [];

		for(var ai=0; ai< nIdUsuariosUnicos;ai++){/*for1*/
		  var arrUsuario = {}, idUsuario = arrIdUsuariosUnicos[ai];
		  var usrSeleccionados = _.where(arrUsr,{idUsuario:idUsuario});
		  var nSeleccionados = _.size(usrSeleccionados);
		  var avanceUsuario = 0, metaUsuario = 0, pctUsuario = 0;
		  var pctUsuario, pctOriginal = 0, pctString = '', pctCss = '';
		  
		  if(nSeleccionados>1){
		    arrUsuario.idUsuario = idUsuario;
		    arrUsuario.formato = usrSeleccionados[0].formato;
		    arrUsuario.grupo = usrSeleccionados[0].grupo;
		    arrUsuario.idGrupo = usrSeleccionados[0].idGrupo;
		    arrUsuario.responsable = usrSeleccionados[0].responsable;
		    arrUsuario.tipoMeta = usrSeleccionados[0].tipoMeta;
		    arrUsuario.titulo = usrSeleccionados[0].titulo;
		    
		    var diasTranscurridosUsuario = 0, numDiasUsuario = 0;
		    
		    diasTranscurridosUsuario = usrSeleccionados[0].transcurridosMeta;
		    numDiasUsuario = usrSeleccionados[0].diasMetas;

		    for(var ns = 0; ns< nSeleccionados; ns++){
		      var us = usrSeleccionados[ns];
		      avanceUsuario += usrSeleccionados[ns].avance;
		      metaUsuario += usrSeleccionados[ns].meta;
		      /*
		      diasTranscurridosUsuario += usrSeleccionados[ns].diasTranscurridos;
		      numDiasUsuario += usrSeleccionados[ns].numDias;
			  */
		      var pctUsuarioSeleccionado,pctOriginalSeleccionado,pctStringSeleccionado,pctCssSeleccionado;
		      pctUsuarioSeleccionado = usrSeleccionados[ns].pct;

			  pctOriginalSeleccionado = SalesUp.Sistema.NumeroDosDecimales((pctUsuarioSeleccionado*100));
			  pctStringSeleccionado = pctOriginalSeleccionado+'%';
			  pctCssSeleccionado = pctOriginalSeleccionado+'%';

			  if(pctOriginalSeleccionado>=100){ pctCssSeleccionado = '100%'; }

			  usrSeleccionados[ns].pctOriginal = pctOriginalSeleccionado;
			  usrSeleccionados[ns].pctString = pctStringSeleccionado;
			  usrSeleccionados[ns].pctCss = pctCssSeleccionado;
			  /*for ns< nSeleccionados*/
		    }

		    pctUsuario = avanceUsuario / metaUsuario;

		    arrUsuario.avance = avanceUsuario;
		    arrUsuario.meta = metaUsuario;
		    arrUsuario.pct = pctUsuario;
		    arrUsuario.diasTranscurridos = diasTranscurridosUsuario;
		    arrUsuario.numDias = numDiasUsuario;

		    var loDeseado = indicadorDeseado({meta:metaUsuario, pct:pctUsuario, diasTranscurridos:diasTranscurridosUsuario, numDias:numDiasUsuario, formato:arrUsuario.formato});

			arrUsuario.cantidadDeseada = loDeseado.cantidad;
			arrUsuario.metaDeseada = loDeseado.metaDeseada;
			arrUsuario.colorGrafica = loDeseado.colorGrafica;

		    pctOriginal = SalesUp.Sistema.NumeroDosDecimales((pctUsuario*100));
		    pctString = pctOriginal+'%';
		    pctCss = pctOriginal+'%';

		    if(pctOriginal>=100){ pctCss = '100%'; }

		    arrUsuario.pctOriginal = pctOriginal;
		    arrUsuario.pctString = pctString;
		    arrUsuario.pctCss = pctCss;
		    arrUsuario.detalleUsuarioMetas = true;
		    arrUsuario.metasUsuario = usrSeleccionados;

		  /*if(nSeleccionados>1)*/ 
		  }else{
		    
		    pctUsuario = usrSeleccionados[0].pct;
		    
		    pctOriginal = SalesUp.Sistema.NumeroDosDecimales((pctUsuario*100));
		    pctString = pctOriginal+'%';
		    pctCss = pctOriginal+'%';

		    if(pctOriginal>=100){ pctCss = '100%'; }

		    usrSeleccionados[0].pctOriginal = pctOriginal;
		    usrSeleccionados[0].pctString = pctString;
		    usrSeleccionados[0].pctCss = pctCss;
		    
		    arrUsuario = usrSeleccionados[0];
		  }


		
		  ltUsuarios.push(arrUsuario);
		}/*for1*/
		
		ltUsuarios = _.sortBy(ltUsuarios, function(j){ return (-1*j.pct) });
		return ltUsuarios;
	}/*prepararLosUsuariosMetas*/

	var obtieneDatosGrafica = function(Op){
		if(!_.size(Op)){indicadoresDisponibles();}
		for(var nOp = 0; nOp <_.size(Op); nOp++){
			var j = Op[nOp], tk = j.tk;
			SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonDashBoardObtieneDatosGrafica.dbsp', parametros:'tk='+tk, callback:generaGrafica, prmAdicionales:j });
		}
	}/*obtieneDatosGrafica*/


	var formatoNumero = function(n,f){
		/*moneda*/
		if(f==1){return SalesUp.Sistema.FormatoMoneda(n);}
		/*numero*/
		if(f==2){ return SalesUp.Sistema.FormatoNumero(n); }
		/*porcentaje*/
		if(f==3){return SalesUp.Sistema.FormatoPorcentaje(n);}
	}


	var graficasBarras = function(Op){
		
		var jDatos = Op.datos.jsonDatos[0], $donde = Op.donde, jc = Op.jc;
		var idGrafica = jc.idGrafica, jConfiguracion = jc.jConfiguracion;
		var idFuente = jConfiguracion.idFuente, tipoDetalle = jConfiguracion.tipoDetalle, detalleMetaActivo = jConfiguracion.detalleMetaActivo;
		
		var generaGraficaBarra = function(Op, err){
			var template = Op, avance = jDatos.avance, meta = jDatos.meta, pct = jDatos.pct, 
				tipoFormato = jDatos.formato, metaDeseada = 0, cantidadDeseada = 0,
				widthBar = (pct<=1) ? SalesUp.Sistema.FormatoPorcentaje(pct) : '100%', 
				diasTranscurridos = jDatos.diasTranscurridos, numDias = jDatos.numDias;

			var formato = function(n,f){
				/*moneda*/
				if(f==1){return SalesUp.Sistema.FormatoMoneda(n);}
				/*numero*/
				if(f==2){ return SalesUp.Sistema.FormatoNumero(n); }
				/*porcentaje*/
				if(f==3){return SalesUp.Sistema.FormatoPorcentaje(n);}
			}

			jDatos.widthBar = widthBar; 
			jDatos.fin = SalesUp.Sistema.FormatoFecha(jDatos.fin);
			jDatos.inicio = SalesUp.Sistema.FormatoFecha(jDatos.inicio);

			if (diasTranscurridos>0){
				if (diasTranscurridos>numDias){
					metaDeseada = 100;
					cantidadDeseada = meta;
				}else{
					metaDeseada = (diasTranscurridos/numDias) * 100;
					cantidadDeseada = (diasTranscurridos/numDias) * meta;
				}
			}

			var diferenciaDeseadoReal = metaDeseada - (pct * 100);
			jDatos.colorGrafica = 'progress-bar-success';

			if(diferenciaDeseadoReal >= 10){
				jDatos.colorGrafica = 'progress-bar-danger';
	        }else if( (diferenciaDeseadoReal <= 10) && (diferenciaDeseadoReal > 0) ){
				jDatos.colorGrafica = 'progress-bar-warning';
	        }else if(diferenciaDeseadoReal <= 0){
				jDatos.colorGrafica = 'progress-bar-success';
	        }

			jDatos.avance = formatoNumero(avance, tipoFormato);
			jDatos.meta = formatoNumero(meta, tipoFormato);
			jDatos.cantidadDeseada = formatoNumero(cantidadDeseada, tipoFormato);
			jDatos.metaDeseada = metaDeseada+'%';
			
			jDatos.idFuente = idFuente;
			jDatos.tipoDetalle = tipoDetalle;
			jDatos.detalleMetaActivo = detalleMetaActivo;

			(detalleMetaActivo) ? jDatos.detalleMetaActivo = true:'';

			var htmlGrafica = SalesUp.Construye.ReemplazaDatos({Template:template, Datos:jDatos});
			
			$donde.html(htmlGrafica);
			/*
			if(detalleMetaActivo){
				$donde.find('.graficaGeneral')
					  .addClass('Pointer')
					  .attr('data-tkmt',idFuente)
					  .attr('onclick','SalesUp.dashBoard.detalleGraficaBarra({t:this});')
					  .attr('data-tipoDetalle',tipoDetalle);	
			}
			*/
			SalesUp.Sistema.Tipsy();
			animacionBarra($donde);
			/*setTimeout(function(){
				var arrLeft = $donde.find('[data-left]');
				var arrPor = $donde.find('[data-porcentaje]');

				for(var nA = 0; nA < _.size(arrLeft); nA++){
					var l = $(arrLeft[nA]).attr('data-left');
					var p = $(arrPor[nA]).attr('data-porcentaje');

					$(arrLeft[nA]).css('left',l).removeAttr('data-left');
					$(arrPor[nA]).css('width',p).removeAttr('data-porcentaje');
				}
			}, 450);*/
			indicadoresDisponibles();
		}/*generaGraficaBarra*/

		/*SalesUp.Sistema.CargaDatosAsync({link:'/privado/Vista/TemplateGraficaBarra.dbsp', callback:generaGraficaBarra, almacen:'TemplateGraficaBarra', dataType:'html' });*/
		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Vista/TemplateGraficaBarra.dbsp', callback:generaGraficaBarra, almacen:'TemplateGraficaBarra', dataType:'html' });
	}/*graficasBarras*/

	var existeDetalleCargado = function(tkmt){
		var detalleMetas = SalesUp.Variables.detalleMetas;
		var yaCargado = _.where(detalleMetas,{tkmt:tkmt});
		return _.size(yaCargado);
	}

	SalesUp.Variables.detalleMetas = [];

	this.detalleGraficaBarra = function(Op){
		var t = Op.t, $t = $(t), $next = $t.next();
		var tkmt = $t.attr('data-tkmt'), tipoDetalle = $t.attr('data-tipodetalle');
		$t.hide();
		$next.after(cargandoDashBoard);
		
		if(existeDetalleCargado(tkmt)){ 
			
			if(tipoDetalle=='1'){verDetalleEmpresarial({t:t, tkmt:tkmt});}
			if(tipoDetalle=='2'){
				var info = obtieneDetalleMeta(tkmt);
				var id = info.dMetas[0].idGrupo;
				verDetalleGrupal({t:t, tkmt:tkmt, principal:true, id:id});
			}
			return;
		}

		var procesaDetalle = function(Op,err){
			if (err){console.warn('Fallo detalleGraficaBarra '); return;}
			
			var arrDetalleMeta = {};
			arrDetalleMeta.tkmt = tkmt;
			arrDetalleMeta.dMetas = Op.jsonDatos;
			SalesUp.Variables.detalleMetas.push(arrDetalleMeta);
			Op = {t:t, tkmt:tkmt};
			if(tipoDetalle=='1'){verDetalleEmpresarial(Op);}
			if(tipoDetalle=='2'){
				Op.id = arrDetalleMeta.dMetas[0].idGrupo;
				Op.principal = true;
				verDetalleGrupal(Op);
			}
		}

		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonDashBoardDetalleMeta.dbsp', parametros:'tkmt='+tkmt, callback:procesaDetalle});
	}/*detalleGraficaBarra*/
	
	/*2*/

	this.atrasDetalleIndividualEmpresarial = function(Op){
		var t = Op.t, $t = $(t), $p = $t.closest('.panel-default'); grupal = Op.grupal, individual = Op.individual, empresarial = Op.empresarial;
		var $graficaGeneral = $p.find('.graficaGeneral'), $boxDetalles = $p.find('.boxDetalles'), $titulo = $p.find('.tituloIndicador');
		var $graficaDetalle = $p.find('.graficaDetalle').eq(0);
		var titulo = $titulo.text();
		if(empresarial){
			$graficaGeneral.slideDown();
			$boxDetalles.hide().html('');
			$titulo.html(titulo);
		}
		if (grupal){
			SalesUp.dashBoard.verDetalleIndividualEmpresarial({t:$graficaGeneral});
		}

		if (individual){
			SalesUp.dashBoard.verDetalleIndividualEmpresarial({t:$graficaDetalle});
		}
		
		/*verDetalleIndividualEmpresarial()*/
	}

	this.verDetalleIndividualEmpresarial = function(Op){
		var t = Op.t, $t = $(t), $p = $t.closest('.panel-default'), $titulo = $p.find('.tituloIndicador');
		var tkmt = $t.attr('data-tkmt'), tipoDetalle = $t.attr('data-tipodetalle'), idGrupo = (($t.attr('data-idGrupo'))?parseInt($t.attr('data-idGrupo')):0);
		var $graficaGeneral = $p.find('.graficaGeneral'), $boxDetalles = $p.find('.boxDetalles');
		var colorGrafica = $graficaGeneral.find('.progress-bar').attr('data-colorgrafica');
		var titulo = $titulo.text();
		
		var atras = '<i class="fa fa-arrow-left Pointer" onclick="SalesUp.dashBoard.atrasDetalleIndividualEmpresarial({t:this, empresarial:true});"></i> ';
		var detalleMetas = SalesUp.Variables.detalleMetas;
			detalleMetas = _.where(detalleMetas, {tkmt:tkmt})[0];
		var jGrupos = detalleMetas.grupos;
		var jInfo = jGrupos;

		if(idGrupo){ 
			jInfo = _.where(jGrupos,{id:idGrupo})[0].usuarios; 
			atras = SalesUp.Sistema.StrReplace('empresarial:true','grupal:true',atras);
		}

		$titulo.html(atras+titulo);
		var jDatos = {tkmt:tkmt, tipoDetalle:tipoDetalle, colorGrafica:colorGrafica, jDetalle:jInfo};
		var compilado = SalesUp.Construye.ReemplazaDatos({Template:templateDetalleIndividualEmpresarial, Datos:jDatos});

		$boxDetalles.hide();
		$graficaGeneral.slideUp();
		$boxDetalles.html(compilado).slideDown();
		animacionBarra($p);
		
		
	}/*verDetalleIndividualEmpresarial*/

	this.verDetalleMetasUsuarios = function(Op){
		var t = Op.t, $t = $(t), $p = $t.closest('.panel-default'), $titulo = $p.find('.tituloIndicador');
		var tkmt = $t.attr('data-tkmt'), tipoDetalle = $t.attr('data-tipodetalle'), idGrupo = (($t.attr('data-idGrupo'))?parseInt($t.attr('data-idGrupo')):0);
		var idUsuario = (($t.attr('data-idUsuario'))?parseInt($t.attr('data-idUsuario')):0);
		var $graficaGeneral = $p.find('.graficaGeneral'), $boxDetalles = $p.find('.boxDetalles');
		var colorGrafica = $graficaGeneral.find('.progress-bar').attr('data-colorgrafica');
		var titulo = $titulo.text();
		
		var atras = '<i class="fa fa-arrow-left Pointer" onclick="SalesUp.dashBoard.atrasDetalleIndividualEmpresarial({t:this, individual:true});"></i> ';
		var detalleMetas = SalesUp.Variables.detalleMetas;
		detalleMetas = _.where(detalleMetas, {tkmt:tkmt})[0];
		var jGrupos = detalleMetas.grupos;

		var jUsuario = _.where(jGrupos,{id:idGrupo});
		arrUsuarios = jUsuario[0].usuarios;
		arrUsuarios = _.where(arrUsuarios,{idUsuario:idUsuario});
		metasUsuario = arrUsuarios[0].metasUsuario;
		metasUsuario = _.sortBy(metasUsuario, function(j){ return (j.dtf) });
		$titulo.html(atras+titulo);
		var jDatos = {tkmt:tkmt, tipoDetalle:tipoDetalle, colorGrafica:colorGrafica, jDetalle:metasUsuario};
		var compilado = SalesUp.Construye.ReemplazaDatos({Template:templateDetalleIndividualEmpresarial, Datos:jDatos});

		$boxDetalles.hide();
		$graficaGeneral.slideUp();
		$boxDetalles.html(compilado).slideDown();
		animacionBarra($p);
		
	}

	this.verDetalle = function(Op){
		var t = Op.t, $t = $(t);
		var $panelDefault = $t.closest('.panel-default');
		var tipoDetalle = $t.attr('data-tipoDetalle');
		var tkmt = $t.attr('data-tkmt');
		var id = $t.attr('data-id');
		var avance = $t.attr('data-avance');
		var total = $t.attr('data-total');
		Op = {t:t, tkmt:tkmt};
		if(tipoDetalle==3){return;}
		var $back = $panelDefault.find('.tituloIndicador .fa');
		if (tipoDetalle==1){
			verDetalleEmpresarial(Op);
		}
		if (tipoDetalle==2){
			Op.id = id;
			Op.avance = avance;
			Op.total = total;
			verDetalleGrupal(Op);
		}
		$back.remove();
	}/*verDetalle*/

	this.regresarPrincipal = function(Op){
		var t = Op.t, $t = $(t), $p = $t.closest('.panel-default'), $boxDetalles = $p.find('.boxDetalles');
		$p.find('.tituloDetalleGrafica').html('');
		$boxDetalles.html('');
		$t.remove();
		$p.find('.graficaGeneral').show();
	}

	var animacionBarra = function($donde){
		setTimeout(function(){
			var arrPor = $donde.find('[data-porcentaje]');
			var arrLeft = $donde.find('[data-left]');

			for(var nA = 0; nA < _.size(arrPor); nA++){
				var p = $(arrPor[nA]).attr('data-porcentaje');
				$(arrPor[nA]).css('width',p).removeAttr('data-porcentaje');

				if (arrLeft[nA]){
					var l = $(arrLeft[nA]).attr('data-left');
					$(arrLeft[nA]).css('left',l).removeAttr('data-left');	
				}				
			}
			SalesUp.Sistema.Tipsy();
		}, 450);
	}/*animacionBarra*/

	var obtieneDetalleMeta = function(tkmt){
		
		var dMetas = SalesUp.Variables.detalleMetas;
			dMetas = _.where(dMetas,{tkmt:tkmt})[0].dMetas;
		var nMetas = _.size(dMetas);
		return {dMetas:dMetas, nMetas:nMetas};
	}

	var verDetalleEmpresarial = function(Op){
		var t = Op.t, $t = $(t), $p = $t.closest('.panel-default'), $boxDetalles = $p.find('.boxDetalles'), 
			$unMomento = $p.find('.unMomento'), tkmt = Op.tkmt;
		var $titulo = $p.find('.tituloIndicador');
		var info = obtieneDetalleMeta(tkmt);
		var dMetas = info.dMetas;
		var nMetas = info.nMetas;
		var objGrupos = obtieneArrGrupos(dMetas);
		var nGrupos = _.size(objGrupos);
		var total = _.size(dMetas);
		var esDinero = false;
		for(var i = 0; i < nGrupos; i++){
		  var idGrupo, contar=0, avance=0, pct=0, totalMetas=0;
		  idGrupo = parseInt(objGrupos[i].id);
		  var totalMetas = _.size(dMetas);
		  if(dMetas[0].monto){
		    total = 0;
		    esDinero = true;
		    for(var tm=0;tm<totalMetas;tm++){
		      var dm = dMetas[tm];
		      var elMonto = (dm.monto)?parseFloat(dm.monto):0;
		      total += elMonto;
		      if(dm.idGrupo==idGrupo){
		        avance += elMonto;
		      }
		    }
		    total = SalesUp.Sistema.NumeroDosDecimales(total);
		    avance = SalesUp.Sistema.NumeroDosDecimales(avance);
		  }else{
		    contar = _.countBy(dMetas, function(j){ return j.idGrupo == idGrupo ? 'avance':'x'; });
		    avance = contar.avance;
		  }
		  
		  pct = SalesUp.Sistema.NumeroDosDecimales((avance/total) * 100);
		  objGrupos[i].avance = avance;
		  objGrupos[i].numeroAvance = avance;
		  objGrupos[i].total = total;
		  objGrupos[i].pct = pct+'%';

		  if(esDinero){
		    objGrupos[i].avance = SalesUp.Sistema.FormatoMoneda(avance);
		    objGrupos[i].total = SalesUp.Sistema.FormatoMoneda(total);
		  }
		}

		var tituloDetalleGrafica = '';
			tituloDetalleGrafica = '<div class="w100 tCen">'+$p.find('.strAvance').html()+'</div>';
		var colorGrafica = $p.find('.progress-bar').attr('data-colorGrafica');
		
		objGrupos = _.sortBy(objGrupos, function(j){ return (-1*j.numeroAvance) });
		
		var compilado = SalesUp.Construye.ReemplazaDatos({Template:barraDetalle, Datos:{tkmt:tkmt, tipoDetalle:2, colorGrafica:colorGrafica, jDetalle:objGrupos}});
		$p.find('.tituloDetalleGrafica').html(tituloDetalleGrafica);
		$titulo.prepend('<i class="fa fa-lg fa-arrow-left Pointer" onclick="SalesUp.dashBoard.regresarPrincipal({t:this});"></i> ');
		$boxDetalles.html(compilado);
		$unMomento.remove();
		animacionBarra($p);
		
	}/*verDetalleEmpresarial*/

	var verDetalleGrupal = function(Op){
		var t = Op.t, $t = $(t), $p = $t.closest('.panel-default'), $boxDetalles = $p.find('.boxDetalles');
		var tkmt = Op.tkmt, total = Op.avance, idGrupo = parseInt(Op.id);
		var esPrincipal = Op.principal;
		var $titulo = $p.find('.tituloIndicador'), $unMomento = $p.find('.unMomento');
		var info = obtieneDetalleMeta(tkmt);
		var dMetas = info.dMetas;
		var nMetas = info.nMetas;

		var objUsuarios = obtieneArrUsuarios(dMetas);
		objUsuarios = _.where(objUsuarios,{idGrupo:idGrupo});

		var nGrupos = _.size(objUsuarios);

		var esDinero = false;
		for(var i = 0; i < nGrupos; i++){
		  var idUsuario, contar=0, avance=0, pct=0, totalMetas=0;
		  idUsuario = parseInt(objUsuarios[i].id);
		  var totalMetas = _.size(dMetas);
		  if(dMetas[0].monto){
		    total = 0;
		    esDinero = true;
		    for(var tm=0;tm<totalMetas;tm++){
		      var dm = dMetas[tm];
		      var elMonto = (dm.monto)?parseFloat(dm.monto):0;
		      total += elMonto;
		      if(dm.idUsuario==idUsuario){
		        avance += elMonto; 
		      }
		    }
		    total = SalesUp.Sistema.NumeroDosDecimales(total);
		    avance = SalesUp.Sistema.NumeroDosDecimales(avance);
		  }else{
		    contar = _.countBy(dMetas, function(j){ return j.idUsuario == idUsuario ? 'avance':'x'; });
		    avance = contar.avance;
		  }
		  
		  if(!total){ total = SalesUp.Sistema.MonedaANumero($p.find('.numeroAvance').html()); }
		  
		  pct = SalesUp.Sistema.NumeroDosDecimales((avance/total) * 100);
		  objUsuarios[i].avance = avance;
		  objUsuarios[i].numeroAvance = avance;
		  objUsuarios[i].total = total;
		  objUsuarios[i].pct = pct+'%';

		  if(esDinero){
		    objUsuarios[i].avance = SalesUp.Sistema.FormatoMoneda(avance);
		    objUsuarios[i].total = SalesUp.Sistema.FormatoMoneda(total);
		  }
		}

		var tituloDetalleGrafica = '';
		var tituloDetalle = $t.find('.strDetalleAvance').html();
			(!tituloDetalle) ? tituloDetalle = $t.find('.strAvance').html():'';
			tituloDetalleGrafica = '<div class="w100 tCen">'+tituloDetalle+'</div>';
		var colorGrafica = $p.find('.progress-bar').attr('data-colorGrafica');
		objUsuarios = _.sortBy(objUsuarios, function(j){ return (-1*j.numeroAvance) });
		var compilado = SalesUp.Construye.ReemplazaDatos({Template:barraDetalle, Datos:{tkmt:tkmt, tipoDetalle:3, colorGrafica:colorGrafica, soloAvance:true, jDetalle:objUsuarios}});
		$p.find('.tituloDetalleGrafica').html(tituloDetalleGrafica);
		$titulo.find('.fa').remove();
		($unMomento)?$unMomento.remove():'';
		
		if(esPrincipal){
			$titulo.prepend('<i class="fa fa-lg fa-arrow-left Pointer" onclick="SalesUp.dashBoard.regresarPrincipal({t:this});"></i> ');
		}else{
			$titulo.prepend('<i data-tipodetalle="1" data-tkmt="'+tkmt+'" class="fa fa-lg fa-arrow-left Pointer" onclick="SalesUp.dashBoard.verDetalle({t:this});"></i> ');
		}

		$boxDetalles.html(compilado);
		animacionBarra($p);

	}/*verDetalleGrupal*/

	var obtieneArrUsuarios = function(obj){
		var nMetas = _.size(obj);
		var arrUsuarios = [], arrIdUsuarios = [], objUsuarios = [];

		for(var i = 0; i < nMetas; i++){
		  var ejecutivo = obj[i].ejecutivo, idUsuario = obj[i].idUsuario, idGrupo = obj[i].idGrupo;
		  var arr={};
		  (!ejecutivo) ? ejecutivo = obj[i].responsable:'';
		  if(arrIdUsuarios.indexOf(idUsuario)==-1){
		    arrUsuarios.push(ejecutivo);
		    arrIdUsuarios.push(idUsuario);
		    
		    arr.id = idUsuario;
		    arr.titulo = ejecutivo;
		    arr.idGrupo = idGrupo;
		    objUsuarios.push(arr);
		  }
		}
		
		return objUsuarios;
	}/*obtieneArrUsuarios*/

	var obtieneArrGrupos = function(obj){
		var nMetas = _.size(obj);
		var arrGrupos = [], arrIdGrupos = [], objGrupos = [];
		for(var i = 0; i < nMetas; i++){
		  var grupo = obj[i].grupo, idGrupo = obj[i].idGrupo;
		  var arr={};
		  if(arrIdGrupos.indexOf(idGrupo)==-1){
		    arrGrupos.push(grupo);
		    arrIdGrupos.push(idGrupo);
		    
		    arr.id = idGrupo;
		    arr.titulo = grupo;
		    objGrupos.push(arr);
		    
		  }
		}	
		return objGrupos;
	}/*obtieneArrGrupos*/

	var indicadoresDisponibles = function(){
		var tkdb = SalesUp.Variables.tkdbActual;
		var $dash = $('#dash-'+tkdb), $tab = $('#tab-'+tkdb);
		var pEditar = $tab.attr('data-editar');
		var disponibles='',permitidos = 4, actual = _.size($dash.find('.panelDatos')), restan = permitidos - actual;
		
		if(pEditar=='0'){return;}
		$dash.find('.panelVacio').remove();
		
		disponibles = SalesUp.Sistema.StrReplace('[RESTAN]',restan,contDashVacio);
		(restan) ? $dash.find('.boxDash').append(disponibles) :'';
	}/*indicadoresDisponibles*/

	var procesaObtieneDashBoard = function(Op,err){
		var tkdb = SalesUp.Variables.tkdbActual;
		var $dash = $('#dash-'+tkdb);
		var jGraficas = _.reject(Op.jsonDatos,function(j){return _.size(j)==0;});
		var permitidos = 4, actual = _.size(jGraficas), restan = permitidos - actual;
		var j = {jsonGraficas:jGraficas};
		
		var htmlPanel = SalesUp.Construye.ReemplazaDatos({Template:templatePanel, Datos:j});

		var hayGraficas = _.size($dash.find('.boxDash').find('.boxPanel.panelDatos'));
		if(hayGraficas){
			$dash.find('.boxDash').append(htmlPanel);
		}else{
			$dash.find('.boxDash').html(htmlPanel);	
		}
		
		obtieneDatosGrafica(jGraficas);
	}/*procesaObtieneDashBoard*/

	this.obtieneDashBoard = function(Op){
		var t = Op.t, $t = $(t), tkdb = $t.attr('data-tkdb'), procesado = $t.attr('data-procesado');
		SalesUp.Variables.tkdbActual = tkdb;
		if(procesado){return;}
		$t.attr('data-procesado',1);
		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonDashBoardObtieneGraficas.dbsp', parametros:'tkdb='+tkdb, callback:procesaObtieneDashBoard});
	}/*obtieneDashBoard*/

	this.nuevoIndicador = function(){
		
		SalesUp.Construye.MuestraPopUp({
			alto:'150px', ancho:'600px', centrado:false, id:'popUpNuevoDashIndicador',
			titulo:'Seleccione la fuente de datos',
			fuente:'/privado/PopUpNuevoIndicador.dbsp'
		});
		setTimeout(function(){
			cargarFuentes();
			SalesUp.dashBoard.boxParte1();
			$('#ltFuentes').focus();
			SalesUp.Variables.fuenteSeleccionada = undefined;
			preparaOpciones();
		}, 400);
	}/*nuevoIndicador*/

	this.guardaNuevoIndicador = function(Op){
		var t = Op.t, formDataNuevoIndicador = new FormData();
		var $form = $(t).closest('form'), $contVentana = $(t).closest('.ContenedorModal.PopUp');
		var pasa = SalesUp.Valida.ValidaObligatorios({DentroDe:$form, DestinoMsj:$contVentana});
		var tkdb = SalesUp.Variables.tkdbActual, titulo = $('#tituloIndicador').val(), tamanio = $('#ltTamanio').val();
		var configuracionIndicador = SalesUp.Variables.configuracionIndicador;
		var $dash = $('#dash-'+tkdb);
		delete configuracionIndicador.detalleMetaActivo;

		if($('#checkDetalleMeta').is(':checked')){configuracionIndicador.detalleMetaActivo = 1;}
		
		var jConfiguracion = JSON.stringify(configuracionIndicador);
		formDataNuevoIndicador.append('tkdb',tkdb);
		formDataNuevoIndicador.append('tamanio',tamanio);
		formDataNuevoIndicador.append('tituloIndicador',titulo);
		formDataNuevoIndicador.append('jConfiguracion',jConfiguracion);
		//var prm = 'tkdb='+tkdb+'&tamanio='+tamanio+'&tituloIndicador='+titulo+'&jConfiguracion='+jConfiguracion;
		
		var nuevaGrafica = function(Op,err){
			if(err){
				console.warn('error', err);
				SalesUp.Construye.MuestraMsj({tMsg:4, Msg:' Hubo un error al momento de crear el indicador, intentalo nuevamente.', Destino:'#contenedor'});
				return false;
			}

			var jGraficas = Op.jsonDatos;
			$dash.find('.panelVacio').remove();
			SalesUp.Construye.CierraPopUp({t:t});
			procesaObtieneDashBoard(Op,null);
			/*obtieneDatosGrafica(jGraficas);*/
		}/*nuevaGrafica*/

		if(pasa){ 
			SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonDashBoardNuevoIndicador.dbsp', parametros:formDataNuevoIndicador, callback:nuevaGrafica, metodo:'POST', formData:true});
		}
		
	}/*guardaNuevoIndicador*/

	this.eliminarIndicador = function(Op){
		SalesUp.Variables.tkIndicadorActual = Op.tk;
		var callback = 'SalesUp.dashBoard.confirmaEliminarIndicador()', 
			pregunta = '<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/>¿Estas seguro de eliminar el indicador?';

		SalesUp.Construye.MuestraAlerta({
			TipoAlerta:'AlertaPregunta', Alerta:pregunta, Id:'alertaEliminarIndicador',
			Boton1:'Si, eliminar', Icono1:'<i class="fa fa-trash"></i>', Callback1: callback,
			Boton2:'Cancelar', Icono2:'',
			Ancho:'500px'
		});	
	}/*eliminarIndicador*/

	this.confirmaEliminarIndicador = function(){
		var tk = SalesUp.Variables.tkIndicadorActual, $panel = $('#panel-'+tk);
		var indicadorEliminado = function(Op,err){
			if(err){
				console.warn('error', err);
				SalesUp.Construye.MuestraMsj({tMsg:4, Msg:' Hubo un error al momento de eliminar el indicador, intentalo nuevamente.', Destino:'#contenedor'});
				return false;
			}

			$panel.fadeOut(750);

			setTimeout(function(){
				$panel.remove();
				indicadoresDisponibles();
				SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-check"></i> Indicador eliminado.'});
			}, 760);
		}

		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/qryEliminarIndicadorDashBoard.dbsp', parametros:'tk='+tk, callback:indicadorEliminado, metodo:'POST'});
	}/*confirmaEliminarIndicador*/

	this.boxParte1 = function(){
		$('.boxPasos').hide();
		$('#boxParte1').show();
		$('#popUpNuevoDashIndicador #TituloModal').html('Seleccione la fuente de datos');
		$('#popUpNuevoDashIndicador .BodyModal').css('height','100px');
	}/*boxParte1*/

	this.boxParte2 = function(){
		var fs = SalesUp.Variables.fuenteSeleccionada;
		if( (!fs) || (!_.size(fs)) || (fs=='sinMeta') ){
			SalesUp.Construye.MuestraMsj({
				tMsg:4, Msg:' Debe de seleccionar una fuente de datos.',
				Destino:'#popUpNuevoDashIndicador .BodyModal'
			});
			return;
		}
		fs = fs[0];
		var jf = SalesUp.Variables.jFuentes;
			jf = _.where(jf,{tk:fs})[0];
		
		var detalle = ((jf.detalle)?jf.detalle:0), tipoFuente = jf.tipoFuente, filtros = jf.filtros;
		var jMetasActivas = SalesUp.Variables.jMetasActivas;
		var jMetaSeleccionada = _.where(jMetasActivas, {tk:fs});
		var tituloRecomendado = '', activaDetalle = (detalle>0)&&(detalle<3);
		$('.ocultarFiltros, #boxOpcionesEspeciales, .ocultarAgruparPeriodoMostrar, #boxOpcionesEspeciales').hide();

		(filtros) ? $('.ocultarFiltros').show():'';
		(activaDetalle) ? $('#boxOpcionesEspeciales').show():'';
		
		$('#boxTamanioIndicador').show();
		$('#boxTituloIndicador').addClass('w60').removeClass('w100');

		if(tipoFuente!=1){
			$('.ocultarAgruparPeriodoMostrar').show();
			SalesUp.Construye.MuestraMsj({
				tMsg:1, Msg:'<=== En desarrollo ===>',
				Destino:'#popUpNuevoDashIndicador .BodyModal'
			});
			return;
		}

		if (tipoFuente==1){
			$('#boxTituloIndicador').addClass('w100').removeClass('w60');
			$('#boxTamanioIndicador').hide();
			
			jMetaSeleccionada = jMetaSeleccionada[0];
			tituloSugerido =  jMetaSeleccionada.descripcion;

			if(activaDetalle){
				$('#popUpNuevoDashIndicador .BodyModal').css('height','150px');
			}else{
				$('#popUpNuevoDashIndicador .BodyModal').css('height','90px');
			}
		}

		$('.boxPasos').hide();
		$('#boxParte2').show();
		$('#tituloIndicador').focus().val(tituloSugerido);
		$('#checkDetalleMeta').val(detalle);
		
		$('#popUpNuevoDashIndicador #TituloModal').html('Configure sus opciones');

		SalesUp.Variables.configuracionIndicador = { tipoFuente:tipoFuente, idFuente:fs, tipoDetalle:detalle };
	}/*boxParte2*/
}/* dashBoard */

if (window.dashBoard){ SalesUp.dashBoard = new dashBoard(); }

SalesUp.dashBoard.tabsDashBoard();

var templateOpcion = '<option value="{{Tipo}}" id="{{Id}}" data-cat="{{Cat}}" data-naturaleza="{{Naturaleza}}">{{Filtro}}</option>';
	var templateOpcionHijo = '<option value="{{Valor}}">{{FiltroTexto}}</option>';
	var templateUniverso = '<span id="{{id}}" class="FiltroEtiqueta Universo" data-Paso="{{Paso}}" data-Cat="{{Cat}}" data-Tipo="{{Tipo}}">{{TextoFiltro}} <span class="ConfingFiltro Transition" onclick="SalesUp.Variables.ActivaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});" ><i class="fa fa-ellipsis-v"></i></span></span>';
	var templateFiltros = '<span id="{{id}}" class="FiltroEtiqueta FiltroNormal" data-Operador="{{Operador}}" data-Universo="{{Universo}}" data-Paso="{{Paso}}" data-Cat="{{Cat}}" data-Tipo="{{Tipo}}" data-valor="{{Valor}}">{{TextoFiltro}} {{ValorFiltro}}<span class="ConfingFiltro Transition" onclick="SalesUp.Variables.ActivaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});"><i class="fa fa-ellipsis-v"></i></span></span>';
	var templatePaso = '<span class="FiltroEtiqueta LabelPaso Transition">{{Pasos}}</span>';


/*var jsonOpciones = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonOpcionesFiltrosReporte.dbsp?idrep=2', DataType:'json'}).jsonDatos;*/

var jsonOpciones;
var procesaFiltrosReporte = function(Op,err){
	jsonOpciones = Op.jsonDatos;
}

SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonOpcionesFiltrosReporte.dbsp', parametros:'idrep=2', callback:procesaFiltrosReporte});

SalesUp.Variables.ActivaMostrarFiltros = function(Op){
	var Paso = Op.Paso, Out = Op.Out;
	var $FiltroTipo = $('#FiltroTipoPaso'+Paso);
	var $FiltrosPaso = $('#FiltrosPaso'+Paso);
	var FiltroTipo = 'FiltroTipoPaso'+Paso;
	var Opciones;

	$FiltroTipo.html('');
	$('#OpcionesTipoFiltros'+Paso).html('').hide();

	var HayUniversoProspectos = 1; /*_.size($('.PasoBox').find('.Universo[data-tipo="1"]'));*/
	var HayUniversoOportunidades = 1; /*_.size($('.PasoBox').find('.Universo[data-tipo="2"]'));*/
	var HayUniversoClientes = 1;/*_.size($('.PasoBox').find('.Universo[data-tipo="3"]'));*/
	var HayUniversoOportunidadesTransacciones = 1;/*_.size($('.PasoBox').find('.Universo[data-tipo="4"]'));*/
	
	if((!HayUniversoProspectos)&&(!HayUniversoOportunidades)&&(!HayUniversoClientes)&&(!HayUniversoOportunidadesTransacciones)){
		
		Opciones = _.where(jsonOpciones, {Cat:0});
		SalesUp.Construye.ConstruyemeUn({
			Control:'select', Nuevo: false,SeleccioneOpcion: true, 
			IdControl: FiltroTipo, Template: templateOpcion,
			Datos: Opciones
		});
	}else{
		/*		
		Opciones = _.where(jsonOpciones, {Cat:0});
		Opciones = _.reject(Opciones , function(j){ return (j.Tipo==1) });
		(HayUniversoOportunidades) ? Opciones = _.reject(Opciones , function(j){ return (j.Tipo==2) }) : '';
		(HayUniversoClientes) ? Opciones = _.reject(Opciones , function(j){ return (j.Tipo==3) }) : '';

		
		SalesUp.Construye.ReemplazaTemplate({Destino:$FiltroTipo, Datos:Opciones , Template:templateOpcion });
		*/
		$FiltroTipo.append('<option value="">(... Seleccione una opción ...)</option>');
		Opciones = _.where(jsonOpciones, {Cat:1});
		Opciones = _.reject(Opciones , function(j){ return (j.Tipo==11) });/*Quita la opcion de ciudad*/
		/*$FiltroTipo.append('<option value="">(... Filtros prospectos ...)</option>');*/
		SalesUp.Construye.ReemplazaTemplate({Destino:$FiltroTipo, Datos:Opciones , Template:templateOpcion });
		
		if(HayUniversoOportunidades || HayUniversoOportunidadesTransacciones){
			Opciones = _.where(jsonOpciones, {Cat:2});
			Opciones = _.reject(Opciones , function(j){ return (j.Tipo==3) });/*Quita la opcion de comision*/
			/*$FiltroTipo.append('<option value="">(... Filtros oportunidades ...)</option>');
			SalesUp.Construye.ReemplazaTemplate({Destino:$FiltroTipo, Datos:Opciones , Template:templateOpcion });*/
		}
		/*
		if(HayUniversoClientes){
			Opciones = _.where(jsonOpciones, {Cat:3});
			if(_.size(Opciones)){
				$FiltroTipo.append('<option value="">(... Filtros Clientes ...)</option>');
				SalesUp.Construye.ReemplazaTemplate({Destino:$FiltroTipo, Datos:Opciones , Template:templateOpcion });
			}
		}
		*/

	}

	SalesUp.Variables.VerOpcionesFiltros({Paso:Paso, Out:Out});

}/*ActivaMostrarFiltros*/

SalesUp.Variables.VerOpcionesFiltros = function(Op){
	var In=Op.In, Out=Op.Out, p=Op.Paso;
	var $Parte1 = $('#Paso'+p+'-P1');
	var $Parte2 = $('#Paso'+p+'-P2');
	if(In){
		$Parte1.css('left','0');
		$Parte2.css('left','100%');
		setTimeout(function(){$Parte2.hide();}, 500);
	}

	if(Out){
		$Parte1.css('left','-100%');
		$Parte2.show();
		setTimeout(function(){$Parte2.css('left','0');}, 10);		
	}
}

SalesUp.Variables.MostrarFiltro = function(Op){

	var Filtro = Op.Filtro;
	var $Elemento = $(Op.Elemento);
	var Paso = Op.Paso;
	var $Opcion = $Elemento.find('option:selected');
	var $FiltrosPaso = $('#FiltrosPaso'+Paso);
	var $OpcionesFiltros = $('#OpcionesTipoFiltros'+Paso);
	var Categoria = $Opcion.attr('data-cat');
	var Naturaleza = $Opcion.data('naturaleza');
	var TextoFiltro = $Opcion.text();

	if(Categoria==0){
		$('#NaturalezaPaso'+Paso).val(Naturaleza);

		var Etiqueta = SalesUp.Sistema.StrReplace('{{TextoFiltro}}', TextoFiltro, templateUniverso);
			Etiqueta = SalesUp.Sistema.StrReplace('{{Paso}}', Paso, Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{Cat}}', Categoria, Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{Tipo}}', Filtro, Etiqueta);
			Etiqueta = SalesUp.Sistema.StrReplace('{{id}}', SalesUp.Construye.IdUnico(), Etiqueta);

		var $Existe = $FiltrosPaso.find('.FiltroEtiqueta[data-cat="'+Categoria+'"]');
		var Existe = _.size($Existe);

		if(Existe==0){
			$FiltrosPaso.append(Etiqueta);
			SalesUp.Variables.VerOpcionesFiltros({Paso:Paso, In:true});
		}else{
			SalesUp.Construye.MuestraMsj({tMsg:1, Msg:'Solo se puede seleccionar un <b>Universo</b> en este paso'});
		}
		return true;
	}

	if((Categoria=='1')&&(Filtro=='7')){
		/**/
		var $Pais = $FiltrosPaso.find('.FiltroEtiqueta[data-tipo="6"][data-cat="1"]');
		var nPais = _.size($Pais);
		if(nPais==0){
			SalesUp.Construye.MuestraMsj({tMsg:1, Msg:'Necesita tener seleccionado un <b>[País]</b> en este paso'});
			return false;
		}else{
			var Paises = '';
			for (var i = 0; i <= $Pais.length - 1; i++){
				Paises += $($Pais[i]).attr('data-valor')+'|';
			}
			SalesUp.Sistema.BorrarItemDeAlmacen('jsonFiltro-1-7');
			Op.Paises = Paises;
		}
	}
	
	Op.TextoFiltro = TextoFiltro;
	Op.Categoria = Categoria;

	$OpcionesFiltros.slideUp().html('');
	
	if(Filtro!=''){
		$('#Load'+Paso).show();
		setTimeout(function(){
			(Filtro>0) ? SalesUp.Variables.CargaFiltrosSistema(Op) : SalesUp.Variables.CargaFiltrosPersonalizados(Op);
		}, 10);
	}
}/*SalesUp.Variables.MostrarFiltro*/

SalesUp.Variables.SeleccionaPasoAnterior = function(Paso){
	var pasoAnterior = $('#UniversoPaso' + Paso).val();
	var naturaleza = $('#NaturalezaPaso' + pasoAnterior).val();
	$('#NaturalezaPaso'+Paso).val(naturaleza);
}

SalesUp.Variables.SeleccionarFiltro = function(Op){
	var Paso = Op.Paso;
	var Filtro = Op.Filtro;
	var $Elemento = $(Op.Elemento);
	var $OpcionesFiltros = $('#OpcionesTipoFiltros'+Paso);
	var $FiltrosPaso = $('#FiltrosPaso'+Paso);
	var $Opcion = $Elemento.find('option:selected');
	var Categoria = $OpcionesFiltros.attr('data-cat');
	var TextoFiltro = $OpcionesFiltros.attr('data-textofiltro');
	var Tipo = $OpcionesFiltros.attr('data-tipo');
	var TextoFiltroHijo = $Opcion.text();
	var Operador = 1;
	var Naturaleza = $('#NaturalezaPaso' + Paso).val();

	if(Naturaleza == ''){
		SalesUp.Variables.SeleccionaPasoAnterior(Paso);
	}
	
	var $MismoTipo = $FiltrosPaso.find('.FiltroEtiqueta[data-cat="'+Categoria+'"][data-tipo="'+Tipo+'"]');
	var mt = _.size($MismoTipo);
	if(mt>=1){Operador = $($MismoTipo[0]).attr('data-operador');}

	var $Existe = $FiltrosPaso.find('.FiltroEtiqueta[data-valor="'+Filtro+'"][data-cat="'+Categoria+'"][data-tipo="'+Tipo+'"]');
	var Existe = _.size($Existe);

	var Etiqueta = SalesUp.Sistema.StrReplace('{{ValorFiltro}}', TextoFiltroHijo, templateFiltros);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Valor}}', Filtro, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Paso}}', Paso, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Universo}}', Paso-1, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Cat}}', Categoria, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Tipo}}', Tipo, Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{id}}', SalesUp.Construye.IdUnico(), Etiqueta);
		Etiqueta = SalesUp.Sistema.StrReplace('{{Operador}}', Operador, Etiqueta);
		
		if((Categoria=='1')&&(Tipo=='1')){
			Etiqueta = SalesUp.Sistema.StrReplace('{{TextoFiltro}}', '', Etiqueta);
		}else{
			Etiqueta = SalesUp.Sistema.StrReplace('{{TextoFiltro}}', TextoFiltro+':', Etiqueta);
		}

	if(mt>0){
		if(mt>1){ $MismoTipo = $($MismoTipo[mt-1]);}
		(Existe==0) ? $MismoTipo.after(Etiqueta) : '';
	}else{
		(Existe==0) ? $FiltrosPaso.append(Etiqueta) : '';
	}
	
	if(Existe>0){
		var Texto = TextoFiltroHijo;
		if(!((Categoria=='1')&&(Tipo=='1'))){ Texto = TextoFiltro + ':' + Texto; }
		
		SalesUp.Construye.MuestraMsj({tMsg:1, Msg:'El filtro <b>['+Texto+']</b> ya se encuentra agregado en este paso'});
		return false;
	}

	$OpcionesFiltros.slideUp().html('');
	SalesUp.Variables.VerOpcionesFiltros({Paso:Paso, In:true});
}

SalesUp.Variables.ActivaOpcionesEtiqueta = function(Op){
	var $Elemento = $(Op.Elemento);
	var Id = Op.Id;
	$Elemento.popover('destroy');

	var $Etiqueta = $Elemento.closest('.FiltroEtiqueta');
	var $Padre = $Etiqueta.closest('.PasoBox');
	
	var t = $Etiqueta.attr('data-tipo');
	var c = $Etiqueta.attr('data-cat');
	var o = $Etiqueta.attr('data-operador');
	var Hermanos = _.size($Padre.find('.FiltroEtiqueta[data-tipo="'+t+'"][data-cat="'+c+'"]'));

	var PopOverId = 'PopOver'+SalesUp.Construye.IdUnico();
	var TemplatePopover = '<div class="popover PopOverAcciones" id="'+PopOverId+'" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>';

	var Operador_Y = '';
	var Operador_O = '';
	if(o=='1'){Operador_Y = '<i class="fa fa-check Verde"></i>';}else{Operador_O = '<i class="fa fa-check Verde"></i>';}

	var MenuOpciones = '';
	(Hermanos>1) ? MenuOpciones += '<span onclick="SalesUp.Variables.OpcionesAcciones({Accion:2, Id:\''+Id+'\', Operador:2 });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-calculator"></i> Operador lógico "O" '+Operador_O+'</span>':'';
	(Hermanos>1) ? MenuOpciones += '<span onclick="SalesUp.Variables.OpcionesAcciones({Accion:2, Id:\''+Id+'\', Operador:1 });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-calculator"></i> Condicion lógico "Y" '+Operador_Y+'</span>':'';
	MenuOpciones += '<span onclick="SalesUp.Variables.OpcionesAcciones({Accion:1, Id:\''+Id+'\' });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-trash"></i> Eliminar filtro</span>';

	$Elemento.popover({
		html:true, container:'body', placement:'top',
		template:TemplatePopover,
		content:MenuOpciones
	});

	$Elemento.popover('show');

	var $PopOverId = $('#'+PopOverId);
	var Cerrar = true;
	$PopOverId.mouseleave(function(){
		Cerrar = true;
		setTimeout(function(){(Cerrar) ? $PopOverId.hide():'';}, 1000);
	}).mouseenter(function(){
		Cerrar = false;
	}).click(function(){
		$PopOverId.hide();
	});

	setTimeout(function(){(Cerrar) ? $PopOverId.hide():'';}, 4000);

	$Elemento.mouseleave(function(){
		Cerrar = true;
		setTimeout(function(){(Cerrar) ? $PopOverId.hide():'';}, 3000);
	}).mouseenter(function(){
		Cerrar = false;
	});
}/*SalesUp.Variables.ActivaOpcionesEtiqueta*/

SalesUp.Variables.OpcionesAcciones = function(Op){
	var Id = Op.Id;
	var $Etiqueta = $('#'+Id);
	var Accion = Op.Accion;
	var Operador = Op.Operador;
	var categoria = $Etiqueta.data('cat');
	var paso = $Etiqueta.data('paso');

	if(Accion==1){
		if(categoria == 0){
			$('#NaturalezaPaso' + paso).val('');
		}
		$Etiqueta.slideUp();
		setTimeout(function(){$Etiqueta.remove();}, 1200);	
	}

	if(Accion==2){
		var $Padre = $Etiqueta.closest('.PasoBox');
		var t = $Etiqueta.attr('data-tipo');
		var c = $Etiqueta.attr('data-cat');
		$Padre.find('.FiltroEtiqueta[data-tipo="'+t+'"][data-cat="'+c+'"]').attr('data-operador',Operador);
	}
}

SalesUp.Variables.CargaFiltrosSistema = function(Op){
	
	var Filtro = Op.Filtro;
	var Paso = Op.Paso;
	var Categoria = Op.Categoria;
	var TextoFiltro = Op.TextoFiltro;
	var $OpcionesFiltros = $('#OpcionesTipoFiltros'+Paso);
	var OpcionesFiltros = 'OpcionesTipoFiltros'+Paso;
	var $BoxComodin = $('#BoxComodin');
	var jsonFiltroTipo = 'jsonFiltro-'+Categoria+'-'+Filtro;
	var Extra = '';
	(Op.Paises) ? Extra += '&Paises='+Op.Paises : '';
	var jsonOpcionesFiltro = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonFiltros.dbsp', Parametros:'c='+Categoria+'&f='+Filtro+Extra, DataType:'json', Almacen:jsonFiltroTipo}).jsonDatos;
	
	if((Categoria=='1')&&(Filtro=='7')){
		jsonOpcionesFiltro = _.reject(jsonOpcionesFiltro , function(j){ return _.size(j) == 0; });
		if(_.size(jsonOpcionesFiltro)==0){
			jsonOpcionesFiltro = JSON.parse('[{ "Valor":"", "FiltroTexto":" -- Desconocido -- "}]');
		}
	}
	
	SalesUp.Construye.ConstruyemeUn({
		Control:'select', Nuevo: false, SeleccioneOpcion: true, IdControl: OpcionesFiltros,
		Template: templateOpcionHijo,Datos: jsonOpcionesFiltro
	});

	$OpcionesFiltros.attr('data-cat',Categoria);
	$OpcionesFiltros.attr('data-TextoFiltro',TextoFiltro);
	$OpcionesFiltros.attr('data-Tipo',Filtro);

	$('#Load'+Paso).hide();
	$OpcionesFiltros.slideDown();
	
}/*SalesUp.Variables.CargaFiltrosSistema*/

SalesUp.Variables.CargaFiltrosPersonalizados = function(Op){
	return true;
}/*SalesUp.Variables.CargaFiltrosPersonalizados*/


