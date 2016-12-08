var control = SalesUp.Sistema.queControl();

SalesUp.Variables.FuncionesHandleBars = function(){
	Handlebars.registerHelper('dias', function(minutos, valor) {
	  	var out 	= "", data;
	  	
	  	if(minutos <= 1440){
	  		out += minutos + ' Minutos';
	  	}else{
	  		var horas = (minutos/(24 * 60)).toFixed(2); 
	  		out += horas + ' Días';
	  	}
	  return out;
	});
};

 /** Primera función que se ejecuta al cargar la pagina **/
var Destino = '#DatosLoad', IdTabla="tablaDistribuidores", IdVentana = 27;
var Datos, TemplateDatos, NombreCampos;

 SalesUp.Variables.OcultaLoad = function(){
  SalesUp.Sistema.OcultarOverlay();
  SalesUp.Sistema.OcultaEspera();
};

SalesUp.Variables.CreaOpcionesSelects = function(_data){
	for (var i = 0; i < _data.datos.length; i++) {
		var arrayDatos = _.pairs(_data.datos[i]);

		_data.$select.append('<option value="'+arrayDatos[0][1]+'">'+arrayDatos[1][1]+'</option>');
	};
};

SalesUp.Variables.ClickFiltro = function(_Opc){
	//idpantalla para guardar filtro de cuentas = 27
	SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});

	setTimeout(function(){
		var _elementosActuales = {};
		_elementosActuales.tipo = [];
		_elementosActuales.tks = [];
		_elementosActuales.texto = [];

		$('.filtro').each(function(){
			var elementoActual 	= $(this);
			var tipo 			= elementoActual.attr('data-tipo');
			var tks 			= elementoActual.attr('data-tks');
			var texto 			= elementoActual.attr('data-texto');

			_elementosActuales.tipo.push(parseInt(tipo));
			_elementosActuales.tks.push(tks);
			_elementosActuales.texto.push(texto);
		});

		var indexTipo = _elementosActuales.tipo.indexOf(_Opc.tipo);	
		
		if(_Opc.valor==0){
			SalesUp.Variables.prmTipos 	= SalesUp.Variables.prmTipos.replace(_elementosActuales.tipo[indexTipo],'');
			SalesUp.Variables.prmTks 	= SalesUp.Variables.prmTks.replace(_elementosActuales.tks[indexTipo],'');
			SalesUp.Variables.prmTextos = SalesUp.Variables.prmTextos.replace(_elementosActuales.texto[indexTipo],'');

			SalesUp.Variables.prmTipos 	= SalesUp.Variables.prmTipos.replace('|','');
			SalesUp.Variables.prmTks 	= SalesUp.Variables.prmTks.replace('|','');
			SalesUp.Variables.prmTextos = SalesUp.Variables.prmTextos.replace('|','');
		}else{
			if(indexTipo >= 0){
				SalesUp.Variables.prmTipos 	= SalesUp.Variables.prmTipos.replace(_elementosActuales.tipo[indexTipo],_Opc.tipo);
				SalesUp.Variables.prmTks 	= SalesUp.Variables.prmTks.replace(_elementosActuales.tks[indexTipo],_Opc.valor);
				SalesUp.Variables.prmTextos = SalesUp.Variables.prmTextos.replace(_elementosActuales.texto[indexTipo],_Opc.texto);
			}else if(_elementosActuales.tipo.length > 0){
				SalesUp.Variables.prmTipos 	= SalesUp.Variables.prmTipos+'|'+_Opc.tipo;
				SalesUp.Variables.prmTks 	= SalesUp.Variables.prmTks+'|'+_Opc.valor;
				SalesUp.Variables.prmTextos = SalesUp.Variables.prmTextos+'|'+_Opc.texto;
			}else{
				SalesUp.Variables.prmTipos 	= _Opc.tipo;
				SalesUp.Variables.prmTks 	= _Opc.valor;
				SalesUp.Variables.prmTextos = _Opc.texto;
			}
		}

		var Parametros = 'idpantalla=27&tipo=' + SalesUp.Variables.prmTipos + '&valor=' + escape(SalesUp.Variables.prmTks) + '&texto=' + escape(SalesUp.Variables.prmTextos);
		//var Parametros = 'idpantalla=27&tipo=' + _Opc.tipo + '&valor=' + _Opc.valor + '&texto=' + _Opc.texto;

		SalesUp.Sistema.CargaDatos({Link:'Modelo/qryGuardaFiltroCuentas.dbsp', Parametros:Parametros});
		SalesUp.Variables.CreaInterfaz();
	}, 100);
};

SalesUp.Variables.CreaInterfaz = function(){
	var usuariosPermitidos 		= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonPermisosReportes.dbsp', Parametros:'',DataType:'json'}).jsonDatos[0];
	SalesUp.Variables.Permisos 	= usuariosPermitidos.PERMITIDOS;

	SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});

	setTimeout(function(){
		var filtrosPantalla = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonFiltrosCuentas.dbsp', Parametros:'idpantalla=27',DataType:'json'});
		
		if(filtrosPantalla.jsonDatos.length > 0){		
			SalesUp.Variables.prmTipos 	= filtrosPantalla.jsonDatos[0].tipos;
			SalesUp.Variables.prmTks	= filtrosPantalla.jsonDatos[0].tks;
			SalesUp.Variables.prmTextos = filtrosPantalla.jsonDatos[0].textos;
		}else{
			SalesUp.Variables.prmTipos 	= '';
			SalesUp.Variables.prmTks	= '';
			SalesUp.Variables.prmTextos = '';
		}	
		
		var LosFiltros = SalesUp.Sistema.CargaDatos({Link:'/privado/ajax/filtros_distribuidores.dbsp'});
		
		$('#LosFiltros').html(LosFiltros);

		var Parametros	= 'convertcode='+SalesUp.Variables.session_convertcode+'&tke=' + SalesUp.Variables.Tke + '&tipos=' + SalesUp.Variables.prmTipos + '&tks=' + escape(SalesUp.Variables.prmTks) + '&textos=' + SalesUp.Variables.prmTextos + '&tkusuario=' + SalesUp.Variables.Tku;
		NombreCampos 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateClusters.dbsp', Parametros:'thead=1&IdVentana='+IdVentana, Div:0});
		TemplateDatos 	= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateClusters.dbsp', Parametros:'thead=0&IdVentana='+IdVentana, Div:0});
		datosCuentas	= SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/cuentas/get/jsonCuentas.dbsp', Parametros:Parametros,DataType:'json'});

		if(datosCuentas!==undefined){
			ordenTabla = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonOrdenReportesControl.dbsp', Parametros:'idventana='+IdVentana,DataType:'json'}).jsonDatos;

			if(!_.isUndefined(ordenTabla[0].ORDENAMIENTO)){
				Datos = _.sortBy(datosCuentas.jsonDatos, function(j){
					if(ordenTabla[0].ORDENAMIENTO == 'CANALIZADOS' || ordenTabla[0].ORDENAMIENTO == 'CERRADOS' || ordenTabla[0].ORDENAMIENTO == 'PERDIDOS' || ordenTabla[0].ORDENAMIENTO == 'PCT_EFECTIVIDAD' || $.isNumeric(j[ordenTabla[0].ORDENAMIENTO])){
						return parseFloat(j[ordenTabla[0].ORDENAMIENTO]);
					}else{
						return j[ordenTabla[0].ORDENAMIENTO];
					}
				});

				if(ordenTabla[1].ORDENAMIENTO == 'DESC'){
					Datos = Datos.reverse();
				}
			}else{
				Datos = datosCuentas.jsonDatos;
			}
		}	

		SalesUp.Construye.ConstruyeTabla(NombreCampos, TemplateDatos, Datos, {Destino:Destino, Id:IdTabla} );


		if(filtrosPantalla.jsonDatos.length > 0){
			SalesUp.Variables.CargaFiltrosLabels({tipo:SalesUp.Variables.prmTipos,tks:SalesUp.Variables.prmTks,texto:SalesUp.Variables.prmTextos});
		}

		/* Crea totales */
		var $tablaDistribuidores 	= $('#tablaDistribuidores');
		var nRows 					= $tablaDistribuidores.find('tbody').find('tr').length;
		var arrayTd 				= $tablaDistribuidores.find('tr:first').find('td');
		var banderaPrimero			= true;

		$tablaDistribuidores.append('<tr class="ultimoRow"></tr>');
			
		for(var i = 0;i<= arrayTd.length-1; i++){
			$('.ultimoRow').append('<td></td>');
			  
		  	var $t = $(arrayTd[i]);
		  	var nRowsAux = 0;
			  
		  	if($t.hasClass('sumaTitulo') || $t.hasClass('promedioTitulo')){

		      var total = 0;
		     
		     for(var x = 0; x<=nRows-1;x++){

		     	if(banderaPrimero){
		     		var primer = i - 1;
		  			$('.ultimoRow').find('td:eq('+primer+')').addClass('tDer').html('<b>Totales</b>');
		  			banderaPrimero = false;
		  		}

		        var arrayValor = $tablaDistribuidores.find('tbody').find('tr:eq('+x+')').find('td:eq(' + i + ')').data('total');

		        (!arrayValor)?arrayValor = 0:'';

		        if(arrayValor != 0){
		        	nRowsAux++;
		        }

		        total = total + parseFloat(arrayValor)
		      }

		      if($t.hasClass('promedioTitulo') && nRowsAux > 0){
		      	total = total / nRowsAux;

		      	if($t.hasClass(('tiempo'))){
		      		if(total <= 1440){
				  		total = total.toFixed(2) + ' Minutos';
				  	}else{
				  		var horas = (total/(24 * 60)).toFixed(2); 
				  		total = horas + ' Días';
				  	}
		      	}else{
		      		total = total.toFixed(2);
		      	}
		      }



		      if($t.hasClass('monto')){
		      	$('.ultimoRow').find('td:eq('+i+')').addClass('tCen').html('<b class="FormatToMoney">'+total+'</b>');
		      }else if($t.hasClass('promedioTitulo')){
		      	$('.ultimoRow').find('td:eq('+i+')').addClass('tCen').html('<b class="Tip1" tip="No se toman en cuenta ceros.">'+total+'</b>');
		      }else{
		      	$('.ultimoRow').find('td:eq('+i+')').addClass('tCen').html('<b>'+total+'</b>');
		      }
		  }
		}
		/* Termina crea totales*/
		
		SalesUp.Variables.MuestraBorraFiltros(filtrosPantalla.jsonDatos);

		SalesUp.Sistema.IniciaPlugins();

		SalesUp.Variables.OcultaLoad();
	}, 100);
}

SalesUp.Variables.EditarCuenta = function(_tk,_tkc){
	SalesUp.Sistema.AbrePopUp({
		Parametros	: 'tke=' + _tk+'&tkc='+_tkc,
		Titulo 		: 'Editar cuenta', 
		Pagina 		: 'popup_agregar_cuenta.dbsp', 
		CallBack 	: 'SalesUp.Variables.CreaInterfaz', 
		Modal  		:true, ModalAlt : true, Alto:190, Ancho:600
	});
};

SalesUp.Variables.DetalleCanalizados = function(_elemento){
	var $Elemento 	= $(_elemento);
	var tkc 		= $Elemento.attr('data-tkc');
	var tipoDetalle	= $Elemento.attr('data-tipo');
	var tipoFiltro	= $Elemento.attr('data-tipo-filtro');
	var total 		= $Elemento.attr('data-total');

	var Parametros 	= 'tk='+tkc+'&tipoDetalle='+tipoDetalle+'&tipos='+SalesUp.Variables.prmTipos+'&tks='+SalesUp.Variables.prmTks+'&convertcode='+SalesUp.Variables.session_convertcode;

	if(total > 0){
		var ids	= SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/cuentas/get/jsonObtieneIds.dbsp', Parametros:Parametros,DataType:'json'}).jsonDatos[0].IDS;
		ids 	= SalesUp.Sistema.Encript({"cadena":ids});

		$('#frmDetalle').append('<form class="frmDetalle" name="frmDetalle" method="get" action="distribuidores_detalle.dbsp"  enctype="multipart/form-data"><input type="hidden" name="total" value="'+total+'"/><input type="hidden" name="ids" value="'+ids+'"/><input type="hidden" name="tipoDetalle" value="'+tipoDetalle+'"/></form');
		$('.frmDetalle').submit();
	}
};

function ReloadData(){
	SalesUp.Variables.CreaInterfaz();
}

$(function(){
	SalesUp.Variables.FuncionesHandleBars();
	SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});
	SalesUp.Variables.CreaInterfaz();
}); /* /fin ready */




