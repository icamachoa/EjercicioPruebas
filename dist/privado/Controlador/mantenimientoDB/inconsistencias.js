"use strict";
var inconsistencias = function(){ 
	var self=this;
	var HeadInconsistencias;
	var BodyInconsistencias;
	var HeadDetalleInconsistencia;
	var BodyDetalleInconsistencia;
	(SalesUp.Sistema.Almacenamiento({a:'seDescarto'}) == null) ? SalesUp.Sistema.Almacenamiento({a:'seDescarto',v:'0'}) : '';

	this.inicializaInconsistencia = function(Opc){
		$('#DatosLoad').html(SalesUp.Sistema.unMomento());
		SalesUp.Sistema.CargaDatosAsync({
			metodo: 'POST',
			link : '/privado/Modelo/mantenimientodb/jsonInconsistencia.dbsp',
			callback: self.construyeTabla
		})
	}

	this.construyeTabla = function(Obj,err,extra){
		$('#DatosLoadDetalle').html('');
		$('#tituloText').html('');
		var uRevision = (Obj) ? Obj.JsonDatos[0].ULTIMA_REVISION : '';
		var urFormat = (uRevision) ? uRevision : 'desconocida';
		var objDato = (Obj) ? Obj.JsonDatos : {};
		var tit = "<div class='TitDiv' style='height: 25px;'><h1 class='w50'> <i class='fa fa-database'></i> Posibles inconsistencias </h1><sub style='text-align:right;bottom: 0px;' class='Right mt10 w50'> <em><i class='fa fa-calendar' aria-hidden='true'></i> Última revisión: "+urFormat+" </em></sub></div>";
		$('#tituloText').html(tit);
		self.construyeTablaInterna = function(){
			SalesUp.Construye.ConstruyeTabla(HeadInconsistencias,BodyInconsistencias,objDato,{Destino:'#DatosLoad',Id: 'TablaInconsistencias'});
			var $tabla = $('#TablaInconsistencias');
			if (parseInt(SalesUp.datosUsuario.nivel)  === 1) {
				$('#DatosLoad').append('<span style="margin-top:10px;" id="btnConfigura" type="button" class="Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" onclick="SalesUp.inconsistencia.popupConfiguracion()"><i class="fa fa-cogs fa-lg"></i> Configuración</span>');	
			}
			
			SalesUp.Sistema.IniciaPlugins();

		}

		var inicializaTemplates = function(){
			SalesUp.Sistema.CargaDatosAsync({link:'/privado/vista/templateHeadInconsistencias.dbsp',dataType:'html',almacen:'HeadInconsistencias',callback:function(Html){
				HeadInconsistencias = Html;
				SalesUp.Sistema.CargaDatosAsync({link:'/privado/vista/templateBodyInconsistencia.dbsp',dataType:'html',almacen:'BodyInconsistencias',callback:function(Html){
					BodyInconsistencias = Html;
					self.construyeTablaInterna();
				}
			});
			}
		});
		}
		if (!HeadInconsistencias && !BodyInconsistencias) {
			inicializaTemplates();
		}else{
			self.construyeTablaInterna();
		}
	}

	this.inicializaDetalleInconsistencia = function(Obj){
		SalesUp.Variables.TK = (Obj.TK) ?  Obj.TK : Obj.filtro.TK;

		var filtro = {
			TK:SalesUp.Variables.TK,
			start: (Obj.start) ? Obj.start : 1,
			howmany:50
		};
		SalesUp.Sistema.CargaDatosAsync({
			metodo: 'POST',
			link : '/privado/Modelo/mantenimientodb/jsonInconsistenciaDetalle.dbsp',
			parametros: filtro,
			prmAdicionales:filtro,
			callback: self.construyeTablaDetalle
		});
		$('#DatosLoad').html(SalesUp.Sistema.unMomento());
	}

	this.construyeTablaDetalle = function(Obj,err,extra){console.log(Obj);

		var start                      = (extra) ? extra.start : 1;
		var TotalRegistros             = (Obj) ? (Obj.JsonDatos[0].TOTAL) ? Obj.JsonDatos[0].TOTAL : 0 : 0;
		var Obj                        = (Obj) ? Obj.JsonDatos : {};
		Obj                            = (Obj) ? self.ordenarDetalle(Obj) : '';
		var tipoDetalle                = (Obj) ? Obj[0].IDINCONSISTENCIA : '';
		var columnasDetalleObligatorio = (Obj) ? (tipoDetalle==14) ? Obj[0] : '' : '';
		var detalleInconsistencia      = (Obj) ? Obj[0].INCONSISTENCIA : '';
		var categoria 				   = (Obj) ? Obj[0].CATEGORIA : '';
		var esProspecto = (tipoDetalle == 14) ? 1 : ((categoria == 1 || categoria == 3 || categoria == 5) ? 1 : 0);

		$('#tituloText').html('');
		$('#DatosLoad').html('');
		self.construyeTablaInternaDetalle = function(){

			SalesUp.Construye.ConstruyeTabla( HeadDetalleInconsistencia, BodyDetalleInconsistencia, Obj, {Destino:'#DatosLoadDetalle', Id: 'TablaDetalleInconsistencias',elInicio: start} );

			var $tabla = $('#TablaDetalleInconsistencias');

			$('#DatosLoadDetalle').append('<div class="w100"><span style="margin-top:10px;" id="btnRegresar" type="button" class="Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" onclick="SalesUp.inconsistencia.regresaPrincipal()"><i class="fa fa-left-arrow fa-lg"></i> Atras</span><span style="margin-left:5px;margin-top:10px;" id="btnActualizar" type="button" class="Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" onclick="SalesUp.inconsistencia.refreshInconsistencia({tk:SalesUp.Variables.tkInconsistencias,callback:SalesUp.inconsistencia.reloadDetalleInconsistencia})"><i class="fa fa-refresh fa-lg"></i> Actualizar</span></div>');

			//SalesUp.Sistema.IniciaPlugins();

			SalesUp.Sistema.paginacion({
				registros: TotalRegistros,
				start: start,
				callback: self.inicializaDetalleInconsistencia,
				tabla: $tabla,
				parametros: {TK:SalesUp.Variables.tkInconsistencias}
			});

			self.seleccionaTkCombinar();
			self.seleccionaTodosChecks();
		}

		var inicializaTemplatesDetalle = function(){

			SalesUp.Sistema.CargaDatosAsync({link:'/privado/vista/templateHeadDetalleInconsistencia.dbsp',dataType:'html',almacen:'HeadDetalleInconsistencia',callback:function(Html){
				HeadDetalleInconsistencia =  Html;
				HeadDetalleInconsistencia = HeadDetalleInconsistencia.replace('[TD]', self.armaTable({tipoDetalle:tipoDetalle,tipo:1,detalleInconsistencia:detalleInconsistencia,columnasDetalleObligatorio:columnasDetalleObligatorio}));
				HeadDetalleInconsistencia = HeadDetalleInconsistencia.replace('[SELECCIONMULTIPLEDESCARTAR]', self.armaAccionesDescartarMultple({esProspecto:esProspecto}));

				SalesUp.Sistema.CargaDatosAsync({link:'/privado/vista/templateBodyDetalleInconsistencia.dbsp',dataType:'html',almacen:'BodyDetalleInconsistencia',callback:function(Html){
					BodyDetalleInconsistencia = Html;
					BodyDetalleInconsistencia = BodyDetalleInconsistencia.replace('[TD]', self.armaTable({tipoDetalle:tipoDetalle,tipo:2,detalleInconsistencia:detalleInconsistencia,columnasDetalleObligatorio:columnasDetalleObligatorio}));
					BodyDetalleInconsistencia = BodyDetalleInconsistencia.replace('[ACCIONES]', self.armaAccion({esProspecto:esProspecto,tipoDetalle:tipoDetalle}));
					self.construyeTablaInternaDetalle();
				}
			});
			}
		});
		}
		//if (!HeadDetalleInconsistencia && !BodyDetalleInconsistencia) {
			inicializaTemplatesDetalle();
		//}else{
			//self.construyeTablaInternaDetalle();
		//}
	}

	this.seleccionaTkCombinar = function(){
		var items = [];
		$('input.checkboxLimite').click(function() {
			var check = $('input.checkboxLimite:checked');
			if(check.length == 2){
				SalesUp.Variables.tksGuardados = self.obtenerTks();
			}else{
				SalesUp.Variables.tksGuardados = '';
			}
		});
	}

	this.seleccionaTodosChecks = function(t){
		var esta = $('#checkall').is(':checked');
		$('#checkall').click(function(){
			if(esta){
				$('input:checkbox').not(t).prop('checked', t.checked);
				SalesUp.Variables.tksTodosGuardados = self.obtenerTks();
				SalesUp.Variables.tksGuardados = '';
			}else{
				SalesUp.Variables.tksTodosGuardados = '';
			}

		});

		$('input.checkboxLimite').click(function() {
			var esta = $('#checkall').is(':checked');
			if(esta===true){
				SalesUp.Variables.tksTodosGuardados = self.obtenerTks();
				SalesUp.Variables.tksGuardados = '';
			}
		});
	}

	this.abrirRegistros = function(Obj){
	}

	this.actualizarRegistro = function(Obj){
	}

	this.descartarRegistros = function(Obj){
	}

	this.obtenerTks = function(token) {
		var seleccionados = $('input.checkboxLimite:checked');
		var arrSeleccionados = [];
		for(var i = 0; i < seleccionados.length; i++){
			arrSeleccionados.push($(seleccionados[i]).data(token));
		}
		return _.unique(arrSeleccionados);
	}

	this.ordenarDetalle = function(Obj){
		var str = '';
		switch(Obj[0].IDINCONSISTENCIA){
			case 1:
			str = 'CORREO';
			break;
			case 2:
			str = 'NOMBRE';
			break;
			case 4:
			str = 'DIRECCION1';
			break;
			case 5:
			str = 'EMPRESA';
			break;
			case 8:
			str = 'NOMBRE';
			break;
			case 9:
			str = 'NOMBRE_PROSPECTO';
			break;
			case 10:
			str = 'NOMBRE';
			break;
			case 11:
			str = 'EMPRESA';
			break;
			case 12:
			str = 'EMPRESA';
			break;
			case 13:
			str = 'EMPRESA';
			break;
			/*case 14:
				str = 'NOMBRE';
				break;*/
				case 15:
				str = 'NOMBRE';
				break;
				case 16:
				str = 'NOMBRE';
				break;
				case 17:
				str = 'NOMBRE';
				break;
			}

			(str) ? Obj = _.sortBy(Obj,str) : Obj;
			return Obj;
		}

		this.armaTable = function(Obj){
			if(Obj.tipoDetalle == 14){
				return Handlebars.helpers.hlpInconsistenciaCamposRequeridos(Obj.tipo,'Campos obligatorios vacíos',Obj.columnasDetalleObligatorio);
			}else{
				return Handlebars.helpers.hlpInconsistencia(Obj.tipoDetalle,Obj.tipo,Obj.detalleInconsistencia);
			}
		}

		this.verificaDescartadoParaMostrarMensaje = function(){
			if(SalesUp.Sistema.Almacenamiento({a:'seDescarto'}) !='0'){
				SalesUp.Sistema.Almacenamiento({a:'seDescarto',v:'0'});
				SalesUp.Construye.MuestraNotificacion({Mensaje:"Se descartaron prospectos, actualizar lista"});
			}
		}

		this.armaAccion = function(Obj){
			return Handlebars.helpers.hlpInconsistenciaAcciones(Obj);
		}

		this.armaAccionesDescartarMultple = function(Obj){
			return Handlebars.helpers.hlsaccionseleccionMultipleDescartar(Obj);
		}

		this.regresaPrincipal = function(){
			self.verificaDescartadoParaMostrarMensaje();
			history.back(-1);
		}

		this.popupConfiguracion = function(){
			var procesaInconsistencia = function(obj,err,ex){
				var content = ex.html;
				obj.jsonDatos = _.map(_.groupBy(obj.jsonDatos,'CATEGORIA'),function(e,r){return e;})
				if(obj.jsonConfiguracion[0].CONFIGURACION != ''){
					var configuracion = JSON.parse(obj.jsonConfiguracion[0].CONFIGURACION)[0];
				}
				var contenido = SalesUp.Construye.ReemplazaDatos({Template:content,Datos:obj})

				SalesUp.Construye.MuestraPopUp({
					alto:'325x', ancho:'620px',
					id:'popUpConfiguracion',
					titulo:'<i class="fa fa-gears"></i> Configuración de inconsistencias',
					contenido:contenido,
				});

				if(obj.jsonConfiguracion[0].CONFIGURACION != ''){
					setTimeout(function(){
						var $idConfig = $('#popUpConfiguracion')
						if(parseInt(configuracion.contactosDuplicados) == 1){
							$idConfig.find('[name="contactosDuplicados"]').prop('checked', true);
						}
						if(parseInt(configuracion.empresasDuplicadas) == 1){
							$idConfig.find('[name="empresasDuplicadas"]').prop('checked', true);
						}
						_.each(configuracion.incompletos,function(e){
							$idConfig.find("input[name='incompletos'][value='"+e+"']").prop("checked",true);
						})
						_.each(configuracion.inconsistencias,function(e){
							$idConfig.find("input[name='inconsistencias'][value='"+e+"']").prop("checked",true);
						})

					},500)
				}
			}

			var MuestraPantallaConfiguracion = function(html,err,ex){
				var content = html;
				SalesUp.Sistema.CargaDatosAsync({
					link:'/privado/modelo/mantenimientodb/jsonTiposInconsistencias.dbsp',
					prmAdicionales:{html:content},
					callback:procesaInconsistencia
				})
			}

			SalesUp.Sistema.CargaDatosAsync({
				link:'/privado/Vista/ConfigInconsistencias.dbsp',
				dataType:'html',
				callback:MuestraPantallaConfiguracion
			})
		}

		this.procesaGuardaConfiguarcion =function(){
			var $boton = $('#BtnGuardaConfig');
			var $idConfig = $('#popUpConfiguracion')
			var contactosDuplicados = $idConfig.find('[name="contactosDuplicados"]').is(':checked') ? 1:0;
			var empresasDuplicadas = $idConfig.find('[name="empresasDuplicadas"]').is(':checked') ? 1:0;
			var incompletos = [];
			$idConfig.find("input[name='incompletos']:checkbox:checked").map(function(){
				incompletos.push($(this).val());
			});
			var inconsistencias = [];
			$idConfig.find("input[name='inconsistencias']:checkbox:checked").map(function(){
				inconsistencias.push($(this).val());
			});
			var action = $boton.attr('onclick');
			$boton.removeAttr('onclick')
			$boton.html('<i class="fa fa-spin fa-spinner"></i> Guardando');
			var jsonConfig  = [{"contactosDuplicados":contactosDuplicados,"empresasDuplicadas":empresasDuplicadas,"incompletos":incompletos,"inconsistencias":inconsistencias}];
			var jsonConfigParse = JSON.stringify(jsonConfig);

			var procesaGuardado = function(res,err,ex){
				if(!err){
					SalesUp.Construye.CierraPopUp({
						t: $('#popUpConfiguracion .ContenedorModal')
					});
					SalesUp.inconsistencia.inicializaInconsistencia();
					SalesUp.Construye.MuestraNotificacion({
						Mensaje: '<i class="fa fa-check" aria-hidden="true"></i> Configuración guardada'
					});
				}else{
					$boton.attr('onclick',action);
					$boton.html('<i class="fa fa-floppy-o"></i> Guardar');
					SalesUp.Construye.MuestraNotificacion({
						Mensaje: '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Configuración no guardada'
					});
				}
			}

			SalesUp.Sistema.CargaDatosAsync({
				link:'/privado/modelo/mantenimientodb/GuardaConfiguracionInconsistencias.dbsp',
				parametros:{configuracion:jsonConfigParse},
				callback: procesaGuardado
			})

		}

		this.refreshInconsistencia = function(Obj){
			var tk = (Obj.tk) ? Obj.tk : '';
			var callback = (Obj.callback) ? Obj.callback : '';
			if(callback){
				callback();
			}
			var refrescaInfo = function(obj,err,ex){
				$('#info-'+tk).html('<strong>'+obj.jsonDatos[0].TOTAL+'</strong>');
				SalesUp.Construye.MuestraNotificacion({
					Mensaje: '<i class="fa fa-check" aria-hidden="true"></i> <span style="font-weight:normal;">Inconsistencia <strong><em> "'+obj.jsonDatos[0].INCONSISTENCIA+'"</em></strong> actualizada</span>'
				});

				$('#load-'+tk+' i').removeClass('fa-spin');
			}

			$('#load-'+tk+' i').addClass('fa-spin');
			SalesUp.Sistema.CargaDatosAsync({
				link:'/privado/modelo/mantenimientoDB/AcualizaInconsistencia.dbsp',
				parametros: {tk:tk},
				callback: refrescaInfo
			})
		}

		this.reloadDetalleInconsistencia = function(){
			SalesUp.inconsistencia.verInconsistencia(SalesUp.Variables.tkInconsistencias, 1);
		}

		this.verInconsistencia = function(tk,state){
			$('#DatosLoadDetalle').html('');

			SalesUp.Variables.tkInconsistencias = (tk) ? tk : SalesUp.Variables.tkInconsistencias;
			if(SalesUp.Variables.tkInconsistencias){
				var link = '/privado/inconsistencias.dbsp?tk='+SalesUp.Variables.tkInconsistencias;
				SalesUp.inconsistencia.inicializaDetalleInconsistencia({'TK':SalesUp.Variables.tkInconsistencias});
			}else{
				SalesUp.inconsistencia.inicializaInconsistencia();
			}
			if (state == null && SalesUp.Variables.tkInconsistencias != null) {
				history.pushState('', 'SalesUp! * inconsistencias', link);
			}
		}/*verInconsistencia*/





	/*this.PopUpelimincarConfirmacion = function(Op){
		SalesUp.Sistema.CargaDatosAsync({link:'/privado/modelo/jsonHoraEliminacion.dbsp',callback:function(obj){
			SalesUp.Construye.MuestraAlerta({
				TipoAlerta:'AlertaPregunta',
				Alerta:'<h2 style="margin-bottom:10px;" class="Rojo"><i class="fa fa-warning"></i> Atención</h2>  <p>Los registros se han marcado para su eliminación, por el volumen de registros seran eliminados el '+obj.FECHA+'. Recibira una confirmación por correo electronico en cuanto sean eliminados.</p>',
				Icono2: '',
				Icono1: '<i class="fa fa-trash"></i>',
				Boton1: 'Si, eliminar',
				Id:'confirmacionEliminar',
				Ancho:'450px',
				Callback1:'SalesUp.eliminacion.procesaEliminacion',
				});
			}
		})

	}*/

	this.MmSgN = function(Op){
		var Destino   = Op.Destino;
		var Mensaje   = Op.Mensaje;
		var malo      = Op.malo
		var tipoColor = 'MsgInfo';

		if(malo==1){
			tipoColor = 'MsgMal';
		}

		var mostrarMs = '<span id="mensaje" class="BoxMsg '+tipoColor+'" style="display: none;">'+Mensaje+'</span>';
		$('#mensaje').remove();
		$(Destino).append(mostrarMs)
		$('#mensaje').toggle(500).delay(4500).toggle(500);
	}

};


if (window.inconsistencias) {
	SalesUp.inconsistencia = new inconsistencias();
	SalesUp.Variables.tkInconsistencias = SalesUp.Sistema.getParameter('tk');

	if((SalesUp.Variables.tkInconsistencias) != null && (SalesUp.Variables.tkInconsistencias) != ''){
		SalesUp.inconsistencia.inicializaDetalleInconsistencia({'TK': SalesUp.Variables.tkInconsistencias});
	}else{
		SalesUp.inconsistencia.inicializaInconsistencia();
		SalesUp.inconsistencia.verificaDescartadoParaMostrarMensaje();
	}

	window.onpopstate = function(event) {
		// if (event.state !== '') {
			SalesUp.Variables.tkInconsistencias = SalesUp.Sistema.getParameter('tk');
			SalesUp.inconsistencia.verInconsistencia(SalesUp.Variables.tkInconsistencias,event.state);
		// }

	};
}
