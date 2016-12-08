"use strict"

var filtros = function(){
	var self=this;
	var idpantalla; 

	this.construyeFiltro = function(reloadFunc) {
		self.reload = (reloadFunc)?reloadFunc:self.construyeFiltro;
		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/modelo/filtros/consultaFiltros.dbsp',
			parametros: {
				idpantalla: SalesUp.Variables.idPantalla
			},
			callback: self.contruyeFiltroTemplate
		});
	}

	this.contruyeFiltroTemplate = function(obj, err, ex) {

		SalesUp.Variables.FiltrosPantallas = obj;

		var filtrosTemplates = function(){
			$('#ListaFiltros').remove();
			SalesUp.Sistema.CargaDatosAsync({link:'/privado/vista/filtrosPantallas.dbsp', dataType:'html',almacen:'filtrosPantallasGen',callback:function(html){
				self.filtroTemplate = html;
				SalesUp.Sistema.CargaDatosAsync({link:'/privado/vista/templateText.dbsp', dataType:'html',almacen:'templateInputText',callback:function(html){
					self.templateText = html;
					SalesUp.Sistema.CargaDatosAsync({link:'/privado/vista/templateSelect.dbsp', dataType:'html',almacen:'templateSelect',callback:function(html){
						self.templateSelect = html;
						self.templateselect2 = html.replace("DetallePrincipal","DetalleSecundario").replace("SalesUp.filtros.procesaFiltro","SalesUp.filtros.GuardaFiltro");
						SalesUp.Variables.FiltrosPantallas.jsonFiltros = SalesUp.Variables.jsonFiltrosPantallas;
						var compilado = SalesUp.Construye.ReemplazaDatos({
							Template: self.filtroTemplate,
							Datos: SalesUp.Variables.FiltrosPantallas
						});
						$('#DatosLoad').before(compilado);
						SalesUp.Sistema.IniciaPlugins();
					}});
				}});
			}});
		}

		var savejsonFiltrosPantallas = function(obj,err,ex){
			obj.jsonFiltros = _.sortBy(obj.jsonFiltros,'IDFILTRO');
			SalesUp.Variables.jsonFiltrosPantallas = (obj)? obj.jsonFiltros : {};
			filtrosTemplates();
			idpantalla = SalesUp.Variables.idPantalla;
		}

		if (!SalesUp.Variables.jsonFiltrosPantallas || idpantalla != SalesUp.Variables.idPantalla) {
			SalesUp.Sistema.CargaDatosAsync({
				link: '/privado/modelo/filtros/consultaFiltros2.dbsp',
				parametros: {
					idpantalla: SalesUp.Variables.idPantalla
				},
				callback: savejsonFiltrosPantallas
			});
		}
		else{
			filtrosTemplates();
		}

	}

	this.AbrirFiltros = function() {
		$('#filtros div:first').slideDown(500)
	}

	this.CerrarFiltros = function() {
		$('#FiltroTipo').val("");
		$('.DetalleFiltro').remove();
		$('#filtros div:first').slideUp(500);
	}

	this.eliminarFiltro = function(idfiltro) {
		$('#filtros .loadingClose').show();
		var datos = {
			idusuariofiltro: idfiltro,
			idpantalla: SalesUp.Variables.idPantalla
		};
		$('.tipsy').remove();
		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/filtros_eliminar.dbsp',
			parametros: datos,
			callback: self.reload
		})

	}

	this.eliminarTodosLosFiltros = function() {
		$('#filtros .loadingClose').show();
		var datos = {
			idpantalla: SalesUp.Variables.idPantalla,
			todos: 1
		}
		$('.tipsy').remove();
		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/filtros_eliminar.dbsp',
			parametros: datos,
			callback: self.reload
		})
	}

	this.accionesFiltros = function(Op) {
		var t = Op.t,
		$t = $(t);
		var FiltroTipo = Op.tipo;
		var FiltroDetalle = Op.valor;
		var negativo = Op.negativo;
		var rel = Op.rel;

		var $p = $t.parent();
		var htmlAcciones = '';
		if (FiltroTipo == 20 && negativo == 0) {
			htmlAcciones += '<span class="OpcionAcciones Pointer" onclick="SalesUp.filtros.cambiaEstadoFiltro({FiltroTipo:' + FiltroTipo + ',FiltroDetalle:\'' + FiltroDetalle + '\',negativo:1,rel:' + rel + '})">' +
			'<i class="fa fa-lg fa-minus"></i> Que no contenga la etiqueta' +
			'</span>';
		} else if (FiltroTipo == 20 && negativo == 1) {
			htmlAcciones += '<span class="OpcionAcciones Pointer" onclick="SalesUp.filtros.cambiaEstadoFiltro({FiltroTipo:' + FiltroTipo + ',FiltroDetalle:\'' + FiltroDetalle + '\',negativo:0,rel:' + rel + '})">' +
			'<i class="fa fa-lg fa-plus"></i> Que contenga la etiqueta' +
			'</span>';
		}
		htmlAcciones += '' +
		'<span class="OpcionAcciones Pointer" onclick="SalesUp.filtros.eliminarFiltro(' + rel + ');">' +
		'<i class="fa fa-lg fa-times"></i> Quitar filtro' +
		'</span>';

		var accionesMenu = function() {
			SalesUp.Construye.popOver({
				Elemento: t,
				PopOverLugar: 'top',
				Contenido: htmlAcciones,
				Clases: 'PopOverAcciones'
			});
		};

		accionesMenu();
	} /*accionesRow*/

	this.cambiaEstadoFiltro = function(Op) {
		$('#filtros .loadingClose').show();
		$('.tipsy').remove();
		var FiltroTipo = Op.FiltroTipo;
		var FiltroDetalle = Op.FiltroDetalle;
		var negativo = Op.negativo;
		var rel = Op.rel;
		var datos = {
			idusuariofiltro: rel,
			idpantalla: SalesUp.Variables.idPantalla
		};
		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/filtros_eliminar.dbsp',
			parametros: datos
		})

		var datos = {
			FiltroTipo: FiltroTipo,
			idpantalla: SalesUp.Variables.idPantalla,
			FiltroDetalle: FiltroDetalle,
			negativo: negativo
		};
		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/nuevo_filtros_guardar.dbsp',
			parametros: datos,
			callback: self.reload
		})

	}

	this.GuardaFiltro = function(t) {
		self.muestraOcultaEspera()
		var $t = $('#DetallePrincipal');
		var FiltroDetalle = $t.val();
		var FiltroTipo = $('#FiltroTipo').val();
		if ((FiltroTipo == 13 || FiltroTipo == 41) && FiltroDetalle == 0) {
			var fechadesde = $('#fechaDesde').val();
			var fechahasta = $('#fechaHasta').val();
			var datos = {
				FiltroTipo: FiltroTipo,
				idpantalla: SalesUp.Variables.idPantalla,
				FiltroDetalle: FiltroDetalle,
				fechadesde:fechadesde,
				fechahasta:fechahasta,
				negativo: 0
			};
		}else if(FiltroTipo == 14){
			var FiltroDetalle2 = $('#DetalleSecundario').val();
			var datos = {
				FiltroTipo: FiltroTipo,
				idpantalla: SalesUp.Variables.idPantalla,
				FiltroDetalle: FiltroDetalle,
				FiltroDetalle2 : FiltroDetalle2,
				negativo: 0
			};
		}
		else if (FiltroTipo != 4 && FiltroTipo != 113) {
			var datos = {
				FiltroTipo: FiltroTipo,
				idpantalla: SalesUp.Variables.idPantalla,
				FiltroDetalle: FiltroDetalle,
				negativo: 0
			};
		} else {
			var datos = {
				FiltroTipo: FiltroTipo,
				idpantalla: SalesUp.Variables.idPantalla,
				FiltroDetalleTxt: FiltroDetalle,
				negativo: 0
			};
		}
		SalesUp.Sistema.CargaDatosAsync({
			link: '/privado/nuevo_filtros_guardar.dbsp',
			parametros: datos,
			callback: function(){
				if(self.reload){self.reload()};
				$('#filtros div:first').slideUp();
			}
		})
	}

	this.procesaFiltro = function(t){
		var $t = $(t);
		var FiltroDetalle = $t.val();
		var FiltroTipo = $('#FiltroTipo').val();

		if (FiltroTipo != 13 && FiltroTipo != 41 && FiltroTipo != 14) {
			self.GuardaFiltro($t);
		}else if(FiltroTipo == 14){
			self.muestraOcultaEspera();
			activaSegundoSelectEstados();
		}else if (FiltroTipo == 13 || FiltroTipo == 41) {
			if (FiltroDetalle == 0) {
				activaDatePickerPeriodo();
			}else{
				self.GuardaFiltro($t);
			}
		}
	}

	var activaSegundoSelectEstados = function(){
		var FiltroDetalle = $('#DetallePrincipal').val();
		$('#DetalleSecundario').closest('span').remove();

		var procesaSegundoFiltro = function(Obj,err,ex){
			Obj.jsonDatos = self.quitaVacio(Obj.jsonDatos);
			Obj.jsonDatos.forEach(function(v, i) {
				v.idOpcion = v.IDESTADO;
				v.opcion = v.ESTADO;
			})
			var res = SalesUp.Construye.ReemplazaDatos({
				Template: self.templateselect2,
				Datos: Obj
			});
			$('#DetallePrincipal').closest('span').after(res);
			$('#filtros .loading').hide();
		}

		if (FiltroDetalle != '') {
			SalesUp.Sistema.CargaDatosAsync({link:'/privado/modelo/jsonConsultarEstados.dbsp',almacen:'jsonListadoEstado_'+FiltroDetalle,parametros:{idpais:FiltroDetalle}, callback:procesaSegundoFiltro})
		}else{
			$('#filtros .loading').hide();
		}
	}
	this.muestraOcultaEspera = function(){
		$('#filtros .loading').toggle();	
	}

	this.construyeSubFiltro = function(selector) {
		self.muestraOcultaEspera();
		var $s = $(selector);
		$('.DetalleFiltro').remove();
		var valor = parseInt($s.val());
		if (valor == "") {return;}
		var jsonDato = _.where(SalesUp.Variables.jsonFiltrosPantallas, {
			IDFILTRO: valor
		});

		var json = jsonDato[0];
		var opcionesCriterios = json.OPCIONESFILTRO;
		var tipoCriterio = json.TIPO;
		if (tipoCriterio == 0 || tipoCriterio == 2) {
			if (opcionesCriterios) {
				self.procesaCriterios(null,null,{idCriterio: valor,json:json})
			} else {
				self.obtieneLosCriteriosAjax(json, valor)
			}
		} else if (tipoCriterio == 1) {
			$s.after(self.templateText);
			self.muestraOcultaEspera();
		}else if(tipoCriterio == 3){
			self.obtieneLosCriteriosAjax(json, valor)
		}
	}

	this.quitaVacio = function(arr) {
		return _.reject(arr, function(j) {
			return _.size(j) == 0;
		});
	}

	this.obtieneLosCriteriosAjax = function(json, idCriterio) {
		var link = json.JSON;
		SalesUp.Sistema.CargaDatosAsync({
			link: link,
			prmAdicionales: {
				idCriterio: idCriterio,json:json
			},
			callback: self.procesaCriterios
		});

	}

	this.procesaCriterios = function(obj, err, ex) {
		var idCriterio = ex.idCriterio;
		var json = ex.json;
		if (!obj) {
			var opcionesCriterios = json.OPCIONESFILTRO;
			var jsonInfo;
			if (typeof opcionesCriterios == 'string') {
				if (opcionesCriterios != '') {
					opcionesCriterios = JSON.parse(opcionesCriterios);

				}
			}
		}

		if (obj) {
			var datosCriterio = obj;
			var opcionesCriterios = {};
			datosCriterio = self.quitaVacio(datosCriterio.jsonDatos);

			datosCriterio.forEach(function(v, i) {
				if (idCriterio == 1) {
					v.idOpcion = v.TKU;
					v.opcion = v.NOMBRE_COMPLETO;
				}
				if (idCriterio == 20) {
					v.idOpcion = v.TK;
					v.opcion = v.ETIQUETA;
				}
				if (idCriterio == 2) {
					v.idOpcion = v.TK;
					v.opcion = v.FASE;
				}
				if (idCriterio == 3) {
					v.idOpcion = v.TK;
					v.opcion = v.ORIGEN
				}
				if (idCriterio == 12) {
					v.idOpcion = v.IDPAIS;
					v.opcion = v.PAIS;
				}
				if (idCriterio == 14) {
					v.idOpcion = v.IDPAIS;
					v.opcion = v.PAIS;
				}
				if (idCriterio == 32) {
					v.idOpcion = v.TKGRUPO;
					v.opcion = v.GRUPO;
				}
				if (idCriterio == 1) {
					v.idOpcion = v.TKU;
					v.opcion = v.NOMBRE_COMPLETO;
				}
				if (idCriterio == 130) {
					v.idOpcion = v.tk;
					v.opcion = v.razonperdida;
				}
			});

			var indice = _.findLastIndex(SalesUp.Variables.jsonFiltrosPantallas, {
				IDFILTRO: idCriterio
			});

			if (idCriterio == 1) {
				datosCriterio.unshift({
					idOpcion: 0,
					opcion: '(..Todos..)'
				});
			}
			if (idCriterio == 20) {
				datosCriterio.unshift({
					idOpcion: -1,
					opcion: '[ Sin etiqueta ]'
				});
			}

			if (idCriterio == 130) {
				datosCriterio.unshift({
					idOpcion: 0,
					opcion: 'Otro'
				});
			}

			opcionesCriterios.jsonDatos = datosCriterio;

			SalesUp.Variables.jsonFiltrosPantallas[indice].JSON = null;
			SalesUp.Variables.jsonFiltrosPantallas[indice].OPCIONESFILTRO = JSON.stringify(opcionesCriterios);

		}

		var res = SalesUp.Construye.ReemplazaDatos({
			Template: self.templateSelect,
			Datos: opcionesCriterios
		});
		$('#FiltroTipo').after(res);
		if (idCriterio == 14) {
			$('#DetallePrincipal').val(SalesUp.datosUsuario.pais).change();;
			setTimeout(function(){$('#filtros .loading').hide()},10);
		}
		self.muestraOcultaEspera()
	}

	this.obtieneLosCriterios = function(json, idCriterio) {

		return opcionesCriterios;
	} /*obtieneLosCriterios*/

	/* Filtro de fechas */
	var activaDatePickerPeriodo = function(Op){

		var Desde, Hasta, Months, Fecha, $donde;
		var FormatoFecha = SalesUp.Sistema.Almacenamiento({a:'SysFormatoFecha'});
		$('.elCriterio .hasDatepicker, .inputFechas').remove();
		(!Op) ? Op = {} : '';
		(Op.F) ? Fecha = Op.F : Fecha = '01/01/2000';
		(Op.D) ? Desde = Op.D : Desde = 'repDesde';
		(Op.H) ? Hasta = Op.H : Hasta = 'repHasta';
		(Op.donde) ? $donde = $(Op.donde) : '';
		(Op.M) ? Months = Op.M : Months = 2;
		$('#FechaPicker').slideDown();
		var $elCriterio = $('.DetalleFiltro');
		var inputFechas = '<input class="inputFechas" type="hidden" id="fechaDesde" name="fechaInicio" />';
		inputFechas += '<input class="inputFechas" type="hidden" id="fechaHasta" name="fechaFin" />';
		inputFechas += '<div id="repDesde"><div class="TitDiv"><i class="fa fa-calendar"></i> <span class="Italic">Seleccionar periodo</span></div></div><div id="repHasta" style="display:none;"><div class="TitDiv"></div></div>';

		$elCriterio  = ($donde) ? $donde : $elCriterio;

		$elCriterio.prepend(inputFechas);
		var fechaSeleccionada = function(){
			var htmlFecha = '', objPeriodo = {}, fInicio = $('#fechaDesde').val(), fFin =$('#fechaHasta').val();
			objPeriodo.filtro = fInicio + ' - ' + fFin;
			objPeriodo.id = 'peridoManual';
			$elCriterio.append(htmlFecha);

			SalesUp.Sistema.Tipsy();
			self.GuardaFiltro();
			/*aplicarFiltroAutomatico();*/
		}/*fechaSeleccionada*/
		var ocultarAutomatico = function($t){ return;
			var fCerrar = function(){
				$('#criterioperiodo').val('');
				$t.hide();
			}

			var Cerrar = true;
			$t.mouseleave(function(){
				Cerrar = true;
				setTimeout(function(){(Cerrar) ? fCerrar():'';}, 1000);
			}).mouseenter(function(){
				Cerrar = false;
			}).click(function(){
				$t.hide();
			});

			setTimeout(function(){(Cerrar) ? fCerrar():'';}, 4000);
		}/*ocultarAutomatico*/

		var $desde = $('#'+Desde);
		var $hasta = $('#'+Hasta);

		var dates = $( '#'+Desde+', #'+Hasta ).datepicker({
			changeMonth: true, changeYear: true,
			dateFormat:FormatoFecha, startDate:Fecha, minDate:Fecha,
			nextText:'', prevText:'',
			dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
			dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'], dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
			monthNames:  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
			changeMonth: false,
			numberOfMonths: Months,
			onSelect: function( selectedDate ) {
				var id = this.id;
				var fDesde = $(this).val();
				var option = id == Desde ? 'minDate' : 'maxDate',
				instance = $( this ).data( 'datepicker' ),
				date = $.datepicker.parseDate( instance.settings.dateFormat ||  $.datepicker._defaults.dateFormat, selectedDate, instance.settings );
				dates.not( this ).datepicker( 'option', option, date );

				if(id == Desde){

					$desde.slideUp(500);
					setTimeout(function(){ $hasta.slideDown(500); }, 550);
					$('#fechaDesde').val(fDesde);
					$hasta.find('.TitDiv').html('<span class="Italic"><i class="fa fa-calendar"></i> Desde: </span> <span class="Bold pr10">'+ fDesde + '</span> <span class="Italic pl10">Hasta:</span>');
					ocultarAutomatico($hasta);
				}else if($donde){
					var desdeFecah = $('#fechaDesde').val();
					var hastaFecha = $(this).val();
					$('#fechaFiltroVariantes').val(desdeFecah + ' - ' + hastaFecha);
					$('#FechaPicker').html('');
					ocultarAutomatico()

				}else{
					$hasta.slideUp();
					$('#fechaHasta').val($(this).val());
					$('#criterioperiodo').hide();
					fechaSeleccionada();
				}
			}
		});

		$desde.datepicker({
			changeMonth: true, numberOfMonths: Months,
			onClose: function( selectedDate ){
				$hasta.datepicker( 'option', 'minDate', selectedDate );
			}
		});

		ocultarAutomatico($desde);

		$hasta.datepicker({
			changeMonth: true, numberOfMonths: Months,
			onClose: function( selectedDate ){ $desde.datepicker( 'option', 'maxDate', selectedDate ); },
		});

	}/* /activaDatePickerPeriodo */

	var ocultarAutomatico = function($t){ return;
		var fCerrar = function(){
			$('#criterioperiodo').val('');
			$t.hide();
		}

		var Cerrar = true;
		$t.mouseleave(function(){
			Cerrar = true;
			setTimeout(function(){(Cerrar) ? fCerrar():'';}, 1000);
		}).mouseenter(function(){
			Cerrar = false;
		}).click(function(){
			$t.hide();
		});

		setTimeout(function(){(Cerrar) ? fCerrar():'';}, 4000);
	}/*ocultarAutomatico*/


}

SalesUp.filtros = new filtros();
