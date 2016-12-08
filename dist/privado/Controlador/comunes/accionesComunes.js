var accionesComunes = function() {
	this.agregarElementoRazonesDescartar = function() {
		if(SalesUp.Variables.prospectoCanalizado.PERMITE_OTRO == 1){
			SalesUp.Variables.ltRazones.push({
				IDRAZONPERDIDA: 0,
				RAZONPERDIDA: 'Otro',
				esCanalizado: 0,
				tkrazon: '0'
			});
		}
	};

	this.obtenerListaRazonesDescartar = function(tipo){
		var nombre = (tipo == 1) ? 'Prospectos' : 'Oportunidades';

		SalesUp.Sistema.CargaDatosAsync({
			link: '_jsonRazones.dbsp',
			parametros: {tipo: tipo}, almacen: 'jsonLtRazones' + nombre,
			callback: function(result){
				SalesUp.Variables.ltRazones = _.reject(result.JsonDatos, function(j) { return _.size(j) == 0; });
			}
		});
	};

	this.obtenerTotalRegistros = function(token, container) {
		var cnt = (container) ? container : 'tbody tr';
		var flt = (container) ? ':checked' : ':has(:input:checked)';

		var seleccionados = $(cnt).filter(flt);
		var arrSeleccionados = [];
		for(var i = 0; i < seleccionados.length; i++){
			arrSeleccionados.push($(seleccionados[i]).data(token));
		}
		return _.unique(arrSeleccionados);
	};

	this.obtenerListaOrigen = function(Parametros){
		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/Modelo/jsonOrigen.dbsp',
			parametros: {tConsulta: Parametros.tConsulta}, almacen: 'jsonLtOrigen',
			callback: function(result){
				SalesUp.Variables.ltOrigen = (SalesUp.Variables.hayCanalizados > 0) ? _.reject(result.jsonDatos, function(item) { return item.esCanalizado == "0"; }) : result.jsonDatos;
			}
		});
	};

	this.obtenerInfoProspectoCanalizado = function(Parametros){
		var datos = new FormData();

		for(var item in Parametros){
			datos.append(item, Parametros[item]);
		}

		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/Modelo/jsonProspectoCanalizado.dbsp',
			parametros: datos, formData: true, metodo: 'POST',
			callback: function(result){
				SalesUp.Variables.prospectoCanalizado = result.jsonDatos[0];
			}
		});
	};

	this.obtenerInfoOportunidades = function(Parametros) {
		var datos = new FormData();
		datos.append('tkp', Parametros.tkp);
		datos.append('tkcom', Parametros.tkcom);

		//Obtenemos la informacion de oportunidades
		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/Modelo/jsonTieneOportunidad.dbsp',
			parametros: datos, formData: true, metodo: 'POST',
			callback: function(result) {
				var data = result.jsonDatos[0];

				SalesUp.Variables.tieneOportunidad = data.tieneOportunidad;
				SalesUp.Variables.conservarOportunidad = data.conservarOportunidad;
				SalesUp.Variables.sNivel = data.nivel;
			}
		});
	};

	this.obtenerListaEtiquetas = function() {
		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/Modelo/jsonLtEtiquetas.dbsp',
			almacen: 'jsonListaEtiquetas',
			callback: function(result) {
				SalesUp.Variables.etiquetas = result.jsonDatos;
			}
		});
	};

	this.obtenerDatosProspecto = function(Parametros) {
		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/Modelo/jsonDatosProspecto.dbsp',
			parametros: {tkp: Parametros.tkp, tko: Parametros.tko},
			callback: function(result) {
				var data = result.jsonDatos[0];
				SalesUp.Variables.jsonDatosProspecto = data;
				SalesUp.Variables.idprospecto = data.IDPROSPECTO;
				SalesUp.Variables.nombreProspecto = data.Nombre + ' ' + (data.Apellidos || '');
				SalesUp.Variables.empresa = data.Empresa;
				SalesUp.Variables.etiquetasUsuario = data.TEtiquetas;
			}
		});
	};

	this.obtenerFasesProspecto = function(Parametros) {
		var datos = new FormData();
		datos.append('tkp', Parametros.tkp);
		datos.append('tko', Parametros.tko);

		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/modelo/jsonConsultarFasesProspecto.dbsp',
			parametros: datos, formData: true, metodo: 'POST', almacen: 'jsonListaFasesProspecto',
			callback: function(result) {
				SalesUp.Variables.listaFases = result.JsonDatos;
			}
		});
	};

	this.obtenerListaUsuariosGruposAutorizados = function(Parametros){ //needs refactory
		var idpros = $('#idusuario').val();
		var tkp = Parametros.tkp;
		var tko = Parametros.tko;
		var origen = Parametros.origen;
		var tkcom = Parametros.tkcom || '';
		var sGrupo = '<#SESSION.IDGRUPO/>';
		var jsonFile = Parametros.jsonFile || '';
		var multiple = Parametros.multiple || false;

		var muestraUsuarios = function(res) {

			var data = res.jsonDatos;
			var idUsuario = data[0].IDUSUARIO;

			jsonUsuarios = _.reject(SalesUp.Variables.jsonUsuarios.jsonDatos, function(j){
				if(j.IDUSUARIO == idUsuario){
					return j;
				}
			});

			var arrGrupos = [];
			var arrIdGrupos = [];
			var objGrupos = [];

			for(var i = 0; i <= jsonUsuarios.length - 1; i++){
				var GRUPO = jsonUsuarios[i].GRUPO;
				var IDGRUPO = jsonUsuarios[i].IDGRUPO;
				var arr={};

				if(arrGrupos.indexOf(GRUPO)==-1){
					arr.GRUPO = GRUPO;
					objGrupos.push(arr);
					arrGrupos.push(GRUPO);
					arrIdGrupos.push(IDGRUPO);
				}
			}

			var Posicion = '';
			for(var x = 0; x <= arrIdGrupos.length - 1; x++){
				if(arrIdGrupos[x]==sGrupo){Posicion=x;}
			}

			var MiGrupo = arrGrupos[Posicion];

			arrGrupos = _.reject(arrGrupos, function(arr){
				if(arr==MiGrupo)
					return arr;
			});

			var arrNuevoOrden = [];
			arrNuevoOrden.push(MiGrupo);

			arrGrupos = _.sortBy(arrGrupos, function(arr){
				return arr;
			});

			for(var z = 0; z <= arrGrupos.length - 1; z++){
				arrNuevoOrden.push(arrGrupos[z]);
			}

			var usuariosDisponibles = jsonUsuarios;

			if(SalesUp.datosUsuario.perCompartirContacto == 1 && multiple !== true && origen != 0){
				usuariosDisponibles = _.filter(jsonUsuarios, function(e) {
					if (_.indexOf(Parametros.items, e.tku) >= 0) {
						return e;
					}
				});
			}
			SalesUp.Variables.itemsUsuarios = Parametros.items;
			SalesUp.Variables.jsonUsuarios = jsonUsuarios;
			var plugin = "NoQuitarUsuario"
			if (multiple) {
				plugin = 'remove_button'
			}
			setTimeout(function(){
				$('#idusuario').selectize({
					maxItems: SalesUp.Variables.sMaxItems ? null : 1,
					plugins: ['optgroup_columns', plugin],
					options:usuariosDisponibles,
					valueField:'tku',
					searchField:['NOMBRE'],
					labelField:'NOMBRE',
					optgroups:objGrupos,
					optgroupField:'GRUPO',
					optgroupLabelField:'GRUPO',
					optgroupValueField:'GRUPO',
					optgroupOrder:arrNuevoOrden,
					dropdownParent: 'body',
					onDelete: function(value){
						if(_.indexOf(Parametros.items,value[0]) >= 0 && SalesUp.datosUsuario.perCompartirContacto == 2 && origen != 0){ return false;}
					},
					items: Parametros.items
				});
				$('.selectize-control.ltUsuarios').addClass('w100 BoxSizing InfoData plugin-remove_button');
			}, 10);
		}

		var listaUsuarios =  function(result) {
			SalesUp.Variables.jsonUsuarios = result;
			if(jsonFile != ''){
				parametros = {
					idoportunidad: tko,
					tipo: 1,
					idprospecto: 0
				}
			} else {
				parametros = {
					idprospecto: idpros,
					tkp: tkp,
					idoportunidad: tko,
					tipo: 0
				}
			}
			SalesUp.Sistema.CargaDatosAsync({
				link: '/privado/Modelo/jsonMuestraUsuarios.dbsp',
				parametros: parametros,
				callback: muestraUsuarios
			});
		}

		var UsuariosGrupos = function(){
			if(jsonFile != ''){
				parametros = {
					idoportunidad: tko,
					tipo: 1,
					idprospecto: 0
				}
			} else {
				parametros = { 
					tkp: tkp,
					tkcom: tkcom
				}
			}
			SalesUp.Sistema.CargaDatosAsync({
				link: '/privado/Modelo/jsonListarUsuarios' + jsonFile + '.dbsp',
				parametros: parametros,
				//almacen: 'jsonListaUsuarios' + jsonFile,
				callback:listaUsuarios

			});
		}

		if(typeof Selectize.plugins.NoQuitarUsuario === "undefined"){
			SalesUp.Sistema.getScript({script:'/scripts/FuncionesNuevas/PluginsSelectize.js',callback:UsuariosGrupos});
		}else{
			UsuariosGrupos();
		}
	};

	this.obtenerListaUsuariosGrupos = function(Parametros) {
		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/Modelo/jsonObtenerUsuariosGruposAutorizados.dbsp', almacen: 'jsonUsuariosGruposAutorizados',
			callback: function(result) {
				SalesUp.Variables.jsonUsuariosGruposAutorizados = result.jsonDatos;
			}
		});
	};

	this.obtenerUsuariosCompartidosDelProspecto = function(Parametros) {
		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/Modelo/jsonObtenerUsuariosCompartidosDelProspecto.dbsp',
			parametros: {tkp: Parametros.tkp, tkcom: Parametros.tkcom},
			callback: function(result) {
				SalesUp.Variables.listaUsuariosCompartidos = [];
				for(var i=0; i < result.jsonDatos.length; i++){
					SalesUp.Variables.listaUsuariosCompartidos.push(result.jsonDatos[i].IDUSUARIO);
				}
			}
		});
	};

	this.obtenerInfoProspectoCompartido = function(Parametros) {
		var datos = new FormData();
		datos.append('tkp', Parametros.tkp);
		datos.append('tku', Parametros.tku);
		datos.append('tkgrupo', Parametros.tkgrupos);

		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/Modelo/jsonInfoProspectoCompartido.dbsp',
			parametros: datos, formData: true, metodo: 'POST',
			callback: function(result) {
				SalesUp.Variables.jsonCompartido = result.jsonDatos[0];
			}
		});
	};

	this.obtenerInfoListaOportunidades = function(Parametros){
		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/Modelo/jsonValidaDescompartirV2.dbsp',
			parametros: Parametros, formData: true, metodo: 'POST',
			callback: function(result) {
				SalesUp.Variables.TienenOportunidades = result.jsonDatos[0].TienenOportunidades;
			}
		});
	};

	this.obtenerPlantillasCompartidasYPropiasCitas = function(){
		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/Modelo/jsonObtenerPlantillasCompartidasPropiasCitas.dbsp',
			callback: function(result) {
				SalesUp.Variables.jsonPlantillasSms = [];
				SalesUp.Variables.jsonPlantillasMail = [];

				var datos = result.jsonDatos;
				for(var i=0; i<datos.length; i++){
					if(datos[i].TIPOCORREO == 1){
						SalesUp.Variables.jsonPlantillasMail.push(datos[i]);
					} else {
						SalesUp.Variables.jsonPlantillasSms.push(datos[i]);
					}
				}
			}
		});
	};

	this.obtenerHoraSiguiente = function(Parametros){
		var hora = moment().add('hour', Parametros.hrs).set('minute', 0).format('HH:mm');
		return hora;
	};

	this.obtenerFechaActual = function(Parametros) {
		var fmtFecha = SalesUp.Sistema.Almacenamiento({a:'SysFormatoFecha'});
		fmtFecha = SalesUp.Sistema.StrReplace('yy','yyyy',fmtFecha);
		fmtFecha = fmtFecha.toUpperCase();
		return moment().format(fmtFecha);
	};

	this.obtenerColaboradoresCita = function(Parametros) {
		var datos = new FormData();
		datos.append('ltInvitados', Parametros.ltInvitados.join(','));
		datos.append('ltTiposInvitados', Parametros.ltTiposInvitados.join(','));

		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/Modelo/jsonObtenerColaboradoresCitas.dbsp',
			parametros: datos, formData: true, metodo: 'POST',
			callback: function(result) {
				SalesUp.Variables.jsonColaboradoresCitas = result.jsonDatos;
			}
		});
	};

	this.obtenerInfoCitaDuplicada = function(Parametros) {
		var datos = new FormData();
		datos.append('fechainicial', Parametros.fechainicial);
		datos.append('idcita', Parametros.idcita);
		datos.append('fechafin', Parametros.fechafin);

		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/Modelo/jsonConsultarCitaDuplicada.dbsp',
			parametros: datos, formData: true, metodo: 'POST',
			callback: function(result) {
				debugger;
			}
		});
	};

	this.crearListaRazonesDescartar = function(ltRazones, minHeight, maxHeight) {
		$('#razones').selectize({
			maxItems: 1,
			options: ltRazones,
			valueField: 'tkrazon',
	    	dropdownParent: 'body',
	    	render: {
	    		option: function(data, escape) {
	    			return '<div class="option">' + escape(data.RAZONPERDIDA) + '</div>';
	    		},
	    		item: function(data, escape) {
	    			return '<div class="item" data-value="' + escape(data.tkrazon) + '" data-esCanalizado="' + escape(data.esCanalizado)+'">' + escape(data.RAZONPERDIDA)+ '</div>';
	    		}
	    	},
	    	sortField: 'RAZONPERDIDA',
	    	onChange: function(value) {
	    		if(value == '0'){
	    			$('.BodyModal').attr('style', 'height: ' + maxHeight +'px');
	    			$('#rcontainer').show();
	    		} else {
	    			$('#rcontainer').hide();
	    			$('.BodyModal').attr('style', 'height: ' + minHeight +'px');
	    		}
	    	}
		});
		$('.selectize-control.ltRazones').addClass('w100 BoxSizing InfoData');
	};

	this.crearListaOrigen = function(ltOrigen) {
		$('#origen').selectize({
            maxItems:1,
            valueField:'TKORIG',
            labelField:'Opcion',
            searchField:['Opcion'],
            options: ltOrigen,
            dropdownParent: 'body'
        });
        $('.selectize-control.ltOrigen').addClass('w100 BoxSizing InfoData');
	};

	this.crearListaEtiquetas = function(items,multiple) {
		var Etiquetas = function(){
			var etiquetasDisponibles = SalesUp.Variables.etiquetas;
			if(SalesUp.datosUsuario.perEtiquetar == 2 && multiple !== true){
				etiquetasDisponibles = _.filter(SalesUp.Variables.etiquetas, function(e) {
					if (_.indexOf(items, e.TKETIQ) >= 0) {
						return e;
					}
				});
			}
			var plugins = 'NoQuitarEtiqueta';
			if (multiple) {
				plugins = 'remove_button';
			}
			var $select = $('#etiquetas').selectize({
				create: false,
				sortField: 'text',
				valueField: 'TKETIQ',
				options: etiquetasDisponibles,
				items: items,
				maxItems: null,
				dropdownParent: 'body',
				plugins: [plugins],
				onDelete: function(value){
					if(_.indexOf(items,value[0]) >= 0 && SalesUp.datosUsuario.perEtiquetar == 1){ return false;}
				},
				render: {
					item: function(data, escape){
						return '<div class="item OpcionesSeleccionadas BoxSizing Ellipsis">' + escape(data.text)+ '</div>';
					}
				}
			});

			$('.selectize-control.ltEtiquetas').addClass('w100 BoxSizing InfoData plugin-remove_button');
		}

		if(typeof Selectize.plugins.NoQuitarEtiqueta === "undefined"){
			SalesUp.Sistema.getScript({script:'/scripts/FuncionesNuevas/PluginsSelectize.js',callback:Etiquetas});
		}else{
			Etiquetas();
		}
	};

	this.crearListaFasesProspecto = function() {
		var $select = $('#idfase').selectize({
			create: false,
			sortField: 'ORDEN',
			valueField: 'TK',
			labelField:'FASE',
			options: SalesUp.Variables.listaFases,
			items: [SalesUp.Variables.jsonDatosProspecto.TKFase],
			maxItems: 1,
			dropdownParent: 'body',
		});

		$('.selectize-control.ltFases').addClass('select-middle');
	};

	this.actualizarLista = function(Parametros) {
		var select = $('#' + Parametros.id)[0].selectize;
		//select.clearOptions();
		for(var i=0; i < Parametros.options; i++){
			select.addOption({value: Parametros.options[i]});
		}
		/*
		select.load(function(callback){
			callback(Parametros.options);
		});
		*/
		for(var i=0; i < Parametros.items.length; i++){
			select.addItem(Parametros.items[i]);	
		}
	};
}


$(function() {
	SalesUp.Variables.accionesComunes = new accionesComunes();
});