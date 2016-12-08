"use strict";



var eliminacion = function(){
	var self=this;

	var HeadEliminaciones;
	var BodyEliminaciones;
	var idpantalla;
	var total_eliminar;
	SalesUp.Variables.idPantalla = 11;
	
	this.inicializaEliminaciones = function(Opc){
		$('#DatosLoad').html(SalesUp.Sistema.unMomento());
		var filtro = {idpantalla : 11,start:(Opc)? Opc.start:1,howmany:50,checkempresa:0};
		idpantalla = 11;
		SalesUp.Sistema.CargaDatosAsync({
			metodo: 'POST',
			link : '/privado/Modelo/jsonProspectosDescartados.dbsp',
			parametros: filtro,
			prmAdicionales:filtro,
			callback: self.construyeTabla
		})
	}

	this.construyeTabla = function(Obj,err,extra){

		var start = (extra) ? extra.start : 1;
		var TotalRegistros = (Obj.JsonDatos[0].TOTAL) ? Obj.JsonDatos[0].TOTAL : 0;
		total_eliminar = TotalRegistros;
		self.construyeTablaInterna = function(){
			SalesUp.Variables.totalRegistros = TotalRegistros;
			SalesUp.filtros.construyeFiltro(self.inicializaEliminaciones);
			SalesUp.Construye.ConstruyeTabla(HeadEliminaciones,BodyEliminaciones,Obj.JsonDatos,{Destino:'#DatosLoad',Id: 'TablaEliminacion',elInicio: start});
			var $tabla = $('#TablaEliminacion');
			if (TotalRegistros > 0 ) {
				$('#DatosLoad').append('<div class="w100"><span class="w100"><input type="checkbox" id="checkempresa"> Eliminar a la empresa si no hay otro contacto asignado a ella</span><span style="margin-top:10px;" id="btnCancelarCierra" type="button" class="Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" onclick="SalesUp.eliminacion.PopUpeliminar()"><i class="fa fa-trash fa-lg"></i> Eliminar</span></div>');
			}

			$('#ListaFiltros').append()
			SalesUp.Sistema.IniciaPlugins();
			SalesUp.Sistema.paginacion({
				registros: TotalRegistros,
				start: start,
				callback: self.inicializaEliminaciones,
				tabla: $tabla,
				parametros: null
			})
		}

		var inicializaTemplates = function(){
			SalesUp.Sistema.CargaDatosAsync({link:'/privado/vista/templateHeadEliminaciones.dbsp',dataType:'html',almacen:'HeadEliaminaciones',callback:function(Html){
				HeadEliminaciones = Html;
				SalesUp.Sistema.CargaDatosAsync({link:'/privado/vista/templateBodyEliminaciones.dbsp',dataType:'html',almacen:'BodyEliaminaciones',callback:function(Html){
					BodyEliminaciones = Html;
					self.construyeTablaInterna();
				}
			});
			}
		});
		}
		if (!HeadEliminaciones && !BodyEliminaciones) {
			inicializaTemplates();
		}else{
			self.construyeTablaInterna();
		}

	}

	this.PopUpeliminar = function(Op){
		SalesUp.Construye.MuestraPopUp({
			alto:'325x', ancho:'450px',
			id:'popUpEliminarDatos',
			titulo:'Confirmación de eliminación',
			fuente:'/privado/popup_eliminar_datos.dbsp'
		});
	}

	this.validaEliminacion = function(Op){
		var valida = Op.valor ? Op.valor : '';
		var texto = '';
		if(valida == 'ELIMINAR INFORMACION'){
			self.PopUpelimincarConfirmacion();
		}else{
			$('#verificacion').addClass('DatoMal');

			if(valida == ''){
				texto = 'Debes de teclear la confirmación de eliminación';
				self.MmSgN({Destino:'#msjError',Mensaje:texto,malo:1})
				$('#eliminarLabel').css("color", "red")
			}

			if(valida != "ELIMINAR INFORMACION" && valida !=""){
				texto = 'La confirmación de eliminacón no coincide';
				self.MmSgN({Destino:'#msjError',Mensaje:texto,malo:1})
			}
		}
	}

	this.PopUpelimincarConfirmacion = function(Op){
		SalesUp.Sistema.CargaDatosAsync({link:'/privado/modelo/jsonHoraEliminacion.dbsp',callback:function(obj){
			SalesUp.Construye.MuestraAlerta({
				TipoAlerta:'AlertaPregunta',
				Alerta:'<h2 style="margin-bottom:10px;" class="Rojo"><i class="fa fa-warning"></i> Atención</h2><p>Los registros se han marcado para su eliminación. Por el volumen de registros seleccionados, éstos serán eliminados el '+obj.FECHA+'. Recibirá una confirmación por correo en cuanto seán eliminados.</p>',
				Icono2: '',
				Icono1: '<i class="fa fa-trash"></i>',
				Boton1: 'Si, eliminar',
				Id:'confirmacionEliminar',
				Ancho:'450px',
				Callback1:'SalesUp.eliminacion.procesaEliminacion',
			});
		}
		})
		
	}




	this.procesaEliminacion = function(){
		SalesUp.Construye.CierraPopUp({t:$('#btnCancelarCierra')});
		var checkempresa;
		$('#checkempresaconfirmacion').prop('checked') ? checkempresa = 1 : checkempresa = 0;
		SalesUp.Sistema.CargaDatosAsync({
			link:'/privado/Modelo/mantenimientodb/procesa_eliminar.dbsp',
			parametros:'idpantalla='+idpantalla+'&checkempresa='+checkempresa+'&total='+total_eliminar,
			callback: self.inicializaEliminaciones
		});
	}


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


	self.inicializaEliminaciones();
};

SalesUp.eliminacion = new eliminacion();