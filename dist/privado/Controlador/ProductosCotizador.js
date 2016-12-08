var jsonDummy                                   = '{"Articulo": [{"Codigo":"A001", "Articulo":"Teclado", "Unidad":"Lote","Cantidad":1, "Precio":"$250.99","Subtotal":"$250.99"}]}';
var values                                      = [];
var IDTR                                        = 0;
var total                                       = 0;
var cantidadDescGlobal                          = 0;
var porcentajeDescGlobal                        = 0;
var cantidadDescGlobalPrevio                    = 0;
var porcentajeDescGlobalPrevio                  = 0;
var MensajeGlobal                               = '0%';
var BanderaEditar;
SalesUp.Variables.BanderaEditarSeguimiento;
SalesUp.Variables.BanderaVenta                  = false;
var IdOportunidad;
var impuestosEmpresa                            = '';
var TipoComision                                = 2;
var impuestosTotales                            = {};
var sumaImpuestosTotales                        = 0;
var montoFinal                                  = 0;
var readonly                                    = 'readonly';
desdeTabla2                                     = false;
SalesUp.Variables.valorMonedaActualCotizadorAux = SalesUp.Variables.valorMonedaActualCotizador;
SalesUp.Variables.permisoCambiarMoneda          = false;
SalesUp.Variables.IdEmpresaMoneda               = 1;
var idMonedaString                              = 'MXN';
SalesUp.Variables.tipMoneda                     = '';
var desdeTabla                                  = false;
SalesUp.Variables.impuestosProductos            = [];
SalesUp.Variables.indiceComision                = 0;
SalesUp.Variables.idDocumento;
SalesUp.Variables.estaVisibleCotizador          = false;
SalesUp.Variables.subTotal                      = 0;
SalesUp.Variables.hotel                         = false;
var calculo_noche                               = 1;
SalesUp.Variables.desdeTabla 					= false;
var miX;

//Nuevo Modulo
var Formato = SalesUp.Sistema.Almacenamiento({a:'SysFormatoFecha'});
Formato = SalesUp.Sistema.StrReplace('yy','yyyy',Formato).toUpperCase();
var fecha_ini = moment().format(Formato);
var fecha_fin = moment().add('d', 1).format(Formato);

var complementoTemplate = '<td ><input type="text" id="fecha_ini{{IDTR}}" value="{{Fecha_ini}}" class="BoxSizing InfoData Fecha InputCantidad w100 Pointer" /></td>' 
						+ '<td ><input type="text" id="fecha_fin{{IDTR}}" value="{{Fecha_fin}}" class="BoxSizing InfoData Fecha InputCantid- ad w100 Pointer" /></td>' 
						+ '<td id="noche{{IDTR}}" class="Noche tCen">{{Noches}}</td>';


//Nuevo Modulo

var templateArt = '{{#each Articulo}} <tr class="mostrarElipsis zebra" data-IDTR="{{IDTR}}" id="TR{{IDTR}}" data-desc="{{CANTIDAD_DESC}}" data-porc="{{PORCENTAJE_DESC}}" data-observaciones="{{COMENTARIO}}">' 
				+ '<td style="text-align:center;"><span tip="Arrastrar para ordenar" class="sortear Tip2 Pointer"><i class="fa fa-bars"></i></span></td>' 
				+ '<td class="tIzq">{{Codigo}}</td>' 
				+ '<td style="text-align:left"><span class="NombreProducto">{{Articulo}}</span><span data-src="{{SrcImagenes}}" class="Pointer Tip8 {{Clase}}" tip="Ver productos" style="float:right" onclick="SalesUp.Variables.MuestraImagenes({t:this})"><i class="fa fa-image fa-lg"></i></span>' 
				+ '<span onclick="SalesUp.Variables.MuestraComentario({t:this})" tip="Ver observaciones" class="Pointer Tip8 NoMostrar Comentario"  style="float: right; padding-right: 2px;"><i class="fa fa-commenting-o fa-lg"></i></span></td>' 
				+ '<td style="text-align: center;">{{Unidad}}</td>' 
				+ '<td style="text-align: center;">{{Existencia}}</td>' 
				+ '<td  class="tdCantidad"><input type="text"  class="w100 cantidad InputCantidad InfoObligatorio" value="{{Cantidad}}"></td>TemplateModuloHotel' 
				+ '<td  class="tdCantidad"><input style="text-align:right" type="text" data-IDTR="{{IDTR}}" data-idProducto="{{idProducto}}" data-NombrePrecio="{{NombrePrecio}}" class="precio w100 InputCantidad InfoObligatorio" value="{{Precio}}"></td>' 
				+ '<td style="text-align: right"><span data-IDTR="{{IDTR}}" data-idProducto="{{idProducto}}"  class="descuento w100">{{Descuento}}</span></td>' 
				+ '<td class="contenedorSpan" style="text-align: right;padding:2px 0 2px 5px;"><div class="w20"><span data-IDTR="{{IDTR}}" data-Margen="{{Margen}}" data-idProducto="{{idProducto}}" data-PctNuevoMargen="{{PctNuevoMargen}}" data-PrecioLista="{{PrecioLista}}" data-PrecioUsuario="{{PrecioSinFormato}}" data-costo="{{Costo}}" data-precioMinimo={{PrecioMinimo}} class="Pointer Tip8 alertaW" tip="Análisis de precio" onclick="SalesUp.Variables.MuestraWarning({t:this})"><i class="fa fa-lg fa-exclamation-triangle"></i></span></div>' 
				+ '<div class="w80">'
				+ '<span data-precio={{PrecioSinFormato}} data-comision="{{Comision}}" data-cantidad={{Cantidad}} data-precioBase={{PrecioSinFormato}} data-impuesto="{{JsonImpuesto}}" data-noche="{{Noches}}" class="subtotal">{{Subtotal}}</span>'
				+ '</div>' 
				+ '<span style="display:none;" onclick="SalesUp.Variables.activaOpciones(this)" class="FondoMenu menuAcciones Transition"><i class="fa fa-lg fa-ellipsis-v"></i></span>' 
				+ '</td>' 
				+ '<td><span onclick="SalesUp.Variables.activaOpciones(this);" class="btnNeutral Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min accionesCotizador"><i class="fa fa-lg fa-ellipsis-v"></i></span></td>'
				+ '</tr>{{/each}}';

var $SelectizeProductos, SelectProducto;

var SysSepMiles = SalesUp.Sistema.Almacenamiento({
	a: 'SysSepMiles'
});
var SysSepDecimales = SalesUp.Sistema.Almacenamiento({
	a: 'SysSepDecimales'
});


SalesUp.Variables.activaOpciones = function(Op){
   var $Elemento = $(Op);
   console.log(Op);
   $Elemento.popover('destroy');
   
   SalesUp.Variables.ElOp = Op;

   var MenuOpciones = '';
      
   if (SalesUp.Variables.hacerDescuento != 0) {
   	MenuOpciones += '<span class="DescuentoProducto Pointer OpcionAcciones OpcionesAcciones Pointer" onclick="SalesUp.Variables.CreaDescuentoPorProducto({t:this})"><i class="fa fa-lg fa-percent"></i> Aplicar descuento</span><span class="divisorMenu">';
   }
   MenuOpciones += '</span><span class="Pointer OpcionAcciones OpcionesAcciones Pointer" onclick="SalesUp.Variables.EliminaArticulo()"><i class="fa fa-lg fa-times"></i> Quitar artículo</span>';
 
   SalesUp.Construye.popOver({
     Elemento:Op ,
     Contenido: MenuOpciones,
     Clases:'PopOverAcciones' ,
     PopOverLugar: 'left',

   });
 }/*SalesUp.Variables.activaOpciones*/

SalesUp.Variables.IniciaCotizadorProductos = function() {

	SalesUp.Variables.ActivaModuloHotel();

	SalesUp.Sistema.DatePickerInicioFin({
		D: 'fecha_ini',
		H: 'fecha_fin',
		A: 'SalesUp.Variables.DiferenciaEntreFechas({t:this}, $("#fecha_ini").val(),$("#fecha_fin").val(),' + (-1) + ')'
	});
	//SalesUp.Sistema.IniciaPlugins();

	if (parseInt(SalesUp.Variables.permisoCambiarMonedaSession) == 1) {
		SalesUp.Variables.tieneActivaMoneda = true;
		$('#tipoCambioBoton').removeClass('NoMostrar');
	}

	IDTR = 0;

	self.parent.SalesUp.Sistema.CambiarTamanioPopUp({
		Alto: '400',
		Ancho: '900'
	});


	$('#granTotal').addClass('NoMostrar');

	var DECIMAL_SEPARADOR = SysSepDecimales;

	$('#precio').attr('onKeyPress', 'return SalesUp.Valida.valDecimales({e:event, t:this, v:value, DestinoMsj:$(\'#CapturaProdutos #popup-contenedor\')})');

	SalesUp.Variables.ObtieneMonedaLocal();
	SalesUp.Variables.AgregaFuncionesInputs();
	SalesUp.Variables.ListaPrecios();
	SalesUp.Variables.BuscarProductos();

	setTimeout(function() {
		$('#Articulo')[0].selectize.focus();
	}, 500);

	if (SalesUp.Variables.hacerDescuento == 0) {
		$('#descuento').addClass('NoMostrar');
	}
}

Handlebars.registerHelper('itemEncontrado', function(t) {
	var trim = function(v) {
		return $.trim(v);
	}
	var str = '',
		Producto = t.Producto,
		img1 = trim(t.img1),
		img2 = trim(t.img2),
		img3 = trim(t.img3),
		desCorta = trim(t.desCorta),
		Linea = trim(t.Linea),
		Marca = trim(t.Marca),
		Nada = t.Nada,
		limProductos = trim(t.limProductos),
		Codigo = trim(t.Codigo);
	var img = '';

	if (Nada) {
		return new Handlebars.SafeString('<div class="w100 LtProducto">Sin resultados</div>');
	}

	if (img1) {
		img = '<i class="fa fa-image fa-2x"></i>';
	} else if (img2) {
		img = '<i class="fa fa-image fa-2x"></i>';
	} else if (img3) {
		img = '<i class="fa fa-image fa-2x"></i>';
	} else {
		img = '<i class="fa fa-image fa-2x"></i>';
	}

	str += '<div class="w100 LtProducto">';
	str += '	<div class="w100">';
	str += '		<div class="w80 tIzq">';
	str += '			<div class="w100 Ellipsis Producto">' + Producto + '</div>';
	str += '		</div>';
	str += '		<div class="w20 tDer">';
	str += '			<div class="w100 Ellipsis MarcaLinea">' + Codigo + '</div>';
	str += '		</div>';
	str += '		<div style="display:none">' + limProductos + ' </div>';
	str += '	</div>';
	str += '</div>';

	return new Handlebars.SafeString(str);
}); /*itemEncontrado*/

SalesUp.Variables.itemEncontrado = function(t) {
	var arr = {};
	arr.item = t;

	return SalesUp.Construye.ReemplazaDatos({
		Template: '{{itemEncontrado item}}',
		Datos: arr
	});
}

SalesUp.Variables.BuscarProductos = function() {
	$SelectizeProductos = $('#Articulo').selectize({
		plugins: ['restore_on_backspace'],
		maxItems: 1,
		options: [],
		persist: false,
		create: false,
		valueField: 'idProducto',
		labelField: 'Producto',
		searchField: ['Producto', 'Codigo', 'Marca', 'Linea', 'desCorta', 'Descripcion1', 'Descripcion2', 'limProductos'],
		onChange: function(v) {
			SalesUp.Variables.SeleccionarProducto(v);
		},
		render: {
			item: function(item, escape) {
				return '<div class="w100 tIzq">' + item.Producto + '</div>';
			},
			option: function(item, escape) {
				return SalesUp.Variables.itemEncontrado(item);
			}
		},
		load: function(query, callback) {
			SelectProducto.clearOptions();

			if (!query.length) {
				return callback();
			}

			if (query.length >= 3) {
				$('.sinResultado, .fa.buscando').remove();
				$('.selectize-control .selectize-input').addClass('sinFlechita').append('<i class="buscando fa fa-spin fa-spinner fa-lg"></i>');
				setTimeout(function() {
					var vacio = false;

					callback();

					SalesUp.Variables.jsonProductos = SalesUp.Sistema.CargaDatos({
						Link: '/privado/modelo/jsonBuscarProductos.dbsp',
						Parametros: 'buscar=' + escape(query),
						DataType: 'json'
					});
					var jsonRespuesta = SalesUp.Variables.jsonProductos.jsonDatos;
					jsonRespuesta = _.reject(jsonRespuesta, function(j) {
						return _.size(j) == 0
					});

					for (var i = 0; i < _.size(jsonRespuesta); i++) {
						jsonRespuesta[i].limProductos = SalesUp.Sistema.LimpiarParaBuscarTexto(jsonRespuesta[i].Producto);
					}

					SalesUp.Variables.jsonProductos = jsonRespuesta;

					callback(jsonRespuesta);

					$('.fa.buscando').remove();
					$('.selectize-control .selectize-input').removeClass('sinFlechita');

					if (!_.size(jsonRespuesta)) {
						$('.selectize-control .selectize-input').addClass('sinFlechita').append('<div class="sinResultado Rojo">Sin resultados</div>');
					}

				}, 10);
			}
		}
	});

	$('.selectize-control.Articulo').addClass('BoxSizing InfoData');

	SelectProducto = $SelectizeProductos[0].selectize;

	var valorGuardado = parseInt(localStorage.getItem('NombrePrecio'));
	if(valorGuardado && _.size(SalesUp.Variables.jsonlistaprecios)!=1){
		setTimeout(function(){
			$('#NombrePrecio').val(valorGuardado);
		},1000);
	}


} /*SalesUp.Variables.BuscarProductos*/


SalesUp.Variables.SeleccionarProducto = function(v) {
	v = parseInt(v);
	SalesUp.Variables.productoActual = _.where(SalesUp.Variables.jsonProductos, {
		idProducto: v
	});
    //hans
    if(_.size(SalesUp.Variables.jsonlistaprecios)!=1){
    	$('#NombrePrecio').removeAttr('disabled');
    }
	

	if (_.size(SalesUp.Variables.productoActual) != 0) {
		SalesUp.Variables.ControlesDefault();
	}
}

SalesUp.Variables.ListaPrecios = function() {

	var jsonListaPrecios = SalesUp.Sistema.CargaDatos({
		Link: '/privado/Modelo/jsonListaPrecios.dbsp',
		DataType: 'json'
	});

	SalesUp.Variables.jsonlistaprecios = jsonListaPrecios.jsonDatos;

	if (JSON.stringify(jsonListaPrecios.jsonDatos) == '[{}]') {
		SalesUp.Variables.CancelarPopProductos({
			Elemento: $('#NombrePrecio')
		});
		SalesUp.Construye.MuestraMsj({
			tMsg: 4,
			Msg: 'No tienes lista de precios.',
			Destino: $('.BoxBotonesAccion')
		});
	}

	impuestosEmpresa = jsonListaPrecios.jsonDatos;
	impuestosEmpresa = impuestosEmpresa[0]['ImpEmpresa'];
	impuestosEmpresa = '{"Impuestos":[' + impuestosEmpresa.substring(0, impuestosEmpresa.length - 1) + ']}';
	impuestosEmpresa = JSON.parse(impuestosEmpresa);
	
	
	
	if(_.size(SalesUp.Variables.jsonlistaprecios)==1){
		var templatePrecios = '{{#each jsonDatos}}<option data-idmoneda="{{idMoneda}}" data-moneda="{{MONEDA}}" data-unicode="{{UNICODE}}"  data-tipocambio="{{TIPODECAMBIO}}" value="{{Indice}}" data-idmonedaempresa="{{IDEMPRESAMONEDA}}" selected>{{Precio}} ({{idMoneda}})</option>{{/each}}';
	}else{
		var templatePrecios = '<option value="0">(... Seleccionar lista de precios ...)</option>{{#each jsonDatos}}<option data-idmoneda="{{idMoneda}}" data-moneda="{{MONEDA}}" data-unicode="{{UNICODE}}"  data-tipocambio="{{TIPODECAMBIO}}" value="{{Indice}}" data-idmonedaempresa="{{IDEMPRESAMONEDA}}">{{Precio}} ({{idMoneda}})</option>{{/each}}';
	}


	var compilado = SalesUp.Construye.ReemplazaDatos({
		Template: templatePrecios,
		Datos: jsonListaPrecios
	});

	$('#NombrePrecio').html(compilado);
	//$('#NombrePrecio').attr('disabled','disabled');
}

SalesUp.Variables.ControlesDefault = function() {
	var i = $('#NombrePrecio').val();
	var idMoneda = $('#NombrePrecio option:selected').attr('data-idmoneda');
	var monedaTip = $('#NombrePrecio option:selected').attr('data-tip');
	var tipoCambio = $('#NombrePrecio option:selected').attr('data-tipocambio');

	if (parseInt(i) != 0) {
		if(SalesUp.Variables.crearpermisoprecio=='1'){
			$('#precio').removeAttr('disabled');
		}

		$('#cantidad').removeAttr('disabled');
		$('#fecha_ini').removeAttr('disabled');
		$('#fecha_fin').removeAttr('disabled');

		var Op = SalesUp.Variables.productoActual;
		var i = $('#NombrePrecio').val();
		var precioU = Op[0]['Precio' + i];
			precioU = SalesUp.Sistema.formatoNumero(precioU);
		//aqui 
		$('#precio').val(precioU);
		$('#cantidad').val('1');
		$('#fecha_ini').val(fecha_ini);
		$('#fecha_fin').val(fecha_fin);
		calculo_noche = 1;
	} else {
		$('#precio').val('');
		$('#cantidad').val('');
		$('#precio').attr('disabled', 'disabled');
		$('#cantidad').attr('disabled', 'disabled');
		$('#fecha_ini').removeAttr('disabled');
		$('#fecha_fin').removeAttr('disabled');
		$('#fecha_ini').val(fecha_ini);
		$('#fecha_fin').val(fecha_fin);
		calculo_noche = 1;
	}
}

SalesUp.Variables.ValidaPrecioMinimo = function(Op, tipo) {

	var $t = $(Op.t);
	var Op;
	var encontrado;

	if (tipo == 1) {
		Op = SalesUp.Variables.productoActual;
		SalesUp.Variables.ConvierteMonedad = 1;
	} else {
		var IDTR = parseInt($t.attr('data-IDTR'));
		var idProducto = parseInt($t.attr('data-idProducto'));

		if (!isNaN(IDTR))
			encontrado = _.where(values, {
				IDTR: IDTR
			});
		else
			encontrado = _.where(values, {
				IDTR: idProducto
			});

		Op = encontrado;

	}

	var tipoCambio = $('#NombrePrecio option:selected').attr('data-tipocambio');
	var idMonedaDePrecioUsuario = $('#NombrePrecio option:selected').attr('data-idmonedaempresa');

	var precioMin = Op[0]['precioMin'];
	var precioUsuario = $($t).val();
	var msg = '';

	if (tipoCambio != 1 && SalesUp.Variables.ConvierteMonedad == 1) {
		precioMin = SalesUp.Variables.ConversorMoneda(1,tipoCambio,precioMin);
		SalesUp.Variables.ConvierteMonedad = 0;
	};

	if (tipo==1) {
		precioUsuario = SalesUp.Sistema.quitarFormatoNumero(precioUsuario);
		msg = 'Precio minimo : <b>' + SalesUp.Sistema.formatoNumero(precioMin) + '<b/>';
	}else{
		msg = 'Precio minimo : <b>' + precioMin + '<b/>';
	}

	if ((precioUsuario < precioMin) || (isNaN(precioUsuario))) {
		$($t).addClass('DatoMal');
		$($t).prev().addClass('InfoDatoMal');
		
		if (precioUsuario != 0) {
			precioMin = SalesUp.Sistema.formatoNumero(precioMin);
		}
		
		$($t).val(precioMin);

		SalesUp.Construye.MuestraMsj({
			tMsg: 4,
			Msg: msg,
			Destino: $t.closest('.BodyModal')
		});

		setTimeout(function() {
			$($t).removeClass('DatoMal');
			$($t).prev().removeClass('InfoDatoMal');
		}, 3000);

		return false;
	} else {
		$($t).removeClass('DatoMal');
		$($t).prev().removeClass('InfoDatoMal');
		//$($t).val(SalesUp.Variables.roundDos(precioUsuario));

		return true;
	}
}


SalesUp.Variables.CantidadMinima = function(Op) {
	$t = $(Op.t);

	if (Op.v == '') {
		$t.val(1);
		return true;
	} else {
		return false;
	}
}

SalesUp.Variables.EsNumero = function(Op) {
	var $t = $(Op.t);

	if (SalesUp.Valida.valNumero(Op)) {
		if ((Op.v).length != 0) {
			if (parseInt(Op.v) > 0) {
				$t.removeClass('DatoMal');
				return true;
			} else {
				$t.val(1);
				return false;
			}
		} else {
			$t.removeClass('DatoMal');
			return true;
		}
	} else {
		return false;
	}
}

SalesUp.Variables.ObtieneMonedaLocal = function() {

	var monedaLocal = SalesUp.Sistema.Almacenamiento({
		a: 'SysMonedaDefault'
	});
	var datosMoneda = SalesUp.Sistema.CargaDatos({
		Link: 'Modelo/jsonObtieneMonedaLocal.dbsp',
		Parametros: 'IDMONEDA=' + monedaLocal,
		DataType: 'json'
	}).jsonDatos;

	SalesUp.Variables.idEmpresaMonedaLocalFija = parseInt(datosMoneda[0].IDEMPRESAMONEDA);
	SalesUp.Variables.IdEmpresaMoneda = parseInt(datosMoneda[0].IDEMPRESAMONEDA);
	SalesUp.Variables.tipoCambioLocal = parseFloat(datosMoneda[0].TIPODECAMBIO);
	/*
	if(parseInt(datosMoneda[0].PERMISOCAMBIARMONEDA) == 1 ){
		SalesUp.Variables.permisoCambiarMoneda = true;
	}*/

	if (parseInt(datosMoneda[0].PERMISOMODIFICAPRECIO) == 1) {
		readonly = '';
	}

	//$('#precio').attr('readonly',readonly);

}

SalesUp.Variables.ValidaMonedaProducto = function() {
	var i = $('#NombrePrecio').val();
	//sujerencia para el precio se guarda en localstorege
	localStorage.setItem('NombrePrecio', $('#NombrePrecio').val());

	var idMonedaEmpresaPrecio = $('#NombrePrecio option:selected').attr('data-idmonedaempresa');
	var idMonedaEmpresaGlobal = $('#monedas option:selected').attr('data-idmonedaempresa');

	var idMonedaPrecio = $('#NombrePrecio option:selected').attr('data-idmoneda');
	var idMonedaCotizacion = $('#monedas option:selected').attr('data-moneda');
	var idMonedaSiglas = $('#monedas option:selected').text();
	var monedaTip = $('#NombrePrecio option:selected').attr('data-moneda');
	var tipoCambio = $('#NombrePrecio option:selected').attr('data-tipocambio');

	SalesUp.Variables.ConvierteMonedad = 1;
	if (IDTR != 0) {
		if (idMonedaEmpresaPrecio != idMonedaEmpresaGlobal) {
			//    if(tipoCambio!=SalesUp.Variables.valorMonedaActualCotizador){
			if (SalesUp.Variables.permisoCambiarMoneda) {
				SalesUp.Variables.PopCambiaTipoCambio(idMonedaPrecio, monedaTip, tipoCambio, idMonedaCotizacion);
			} else {
				var poCambio = parseFloat($('#NombrePrecio option:selected').attr('data-tipocambio'));
				var monto = SalesUp.Sistema.quitarFormatoNumero($('#precio').val());
				var precio = SalesUp.Variables.ConversorMoneda(tipoCambio, SalesUp.Variables.valorMonedaActualCotizador, monto);
				$('#precio').val(SalesUp.Sistema.formatoNumero(precio));

				var numPrecio = '';
				numPrecio = 'Precio' + $('#NombrePrecio').val();

				var precioMin = SalesUp.Variables.ConversorMoneda(SalesUp.Variables.tipoCambioLocal, tipoCambio, parseFloat(SalesUp.Variables.productoActual[0].precioMin));
				SalesUp.Variables.productoActual[0].precioMin = SalesUp.Variables.ConversorMoneda(tipoCambio, SalesUp.Variables.valorMonedaActualCotizador, precioMin);

				var costo = SalesUp.Variables.ConversorMoneda(SalesUp.Variables.tipoCambioLocal, tipoCambio, parseFloat(SalesUp.Variables.productoActual[0].Costo));
				SalesUp.Variables.productoActual[0].Costo = SalesUp.Variables.ConversorMoneda(tipoCambio, SalesUp.Variables.valorMonedaActualCotizador, costo);


				var PrecioLista = parseFloat(SalesUp.Variables.productoActual[0][numPrecio]);

				SalesUp.Variables.productoActual[0][numPrecio] = SalesUp.Variables.ConversorMoneda(tipoCambio, SalesUp.Variables.valorMonedaActualCotizador, PrecioLista);

				SalesUp.Construye.MuestraMsj({
					tMsg: 2,
					Msg: 'El precio se ha convertido a <b>' + idMonedaCotizacion + ' (' + idMonedaSiglas + ')</b>, con tipo de cambio: <b>$' + tipoCambio + '</b>',
					Destino: $('#precio').closest('.BodyModal')
				});
				SalesUp.Variables.AgregarArticulo();
			}
		} else {

			var numPrecio = '';
			numPrecio = 'Precio' + $('#NombrePrecio').val();
			var precioMin = parseFloat(SalesUp.Variables.productoActual[0].precioMin);
			SalesUp.Variables.productoActual[0].precioMin = SalesUp.Variables.ConversorMoneda(SalesUp.Variables.tipoCambioLocal, tipoCambio, precioMin);
			var costo = parseFloat(SalesUp.Variables.productoActual[0].Costo);
			SalesUp.Variables.productoActual[0].Costo = SalesUp.Variables.ConversorMoneda(SalesUp.Variables.tipoCambioLocal, tipoCambio, costo);


			SalesUp.Variables.AgregarArticulo();
		}
	} else {


		var numPrecio = '';
		numPrecio = 'Precio' + $('#NombrePrecio').val();
		var precioMin = parseFloat(SalesUp.Variables.productoActual[0].precioMin);
		SalesUp.Variables.productoActual[0].precioMin = SalesUp.Variables.ConversorMoneda(SalesUp.Variables.tipoCambioLocal, tipoCambio, precioMin);
		var costo = parseFloat(SalesUp.Variables.productoActual[0].Costo);
		SalesUp.Variables.productoActual[0].Costo = SalesUp.Variables.ConversorMoneda(SalesUp.Variables.tipoCambioLocal, tipoCambio, costo);


		SalesUp.Variables.AgregarArticulo();
	}
};

SalesUp.Variables.ConversorMoneda = function(base, nuevo, monto) {
	var cantidad = SalesUp.Sistema.calculaMontoTipoCambio({'tipoCambioAnterior':base,'nuevoTipoCambio':nuevo,'monto':monto});
	return cantidad;
}


SalesUp.Variables.PopCambiaTipoCambio = function(idMoneda, monedaTip, tipoCambio, idMonedaCotizacion) {

	var Html = ' <div style="margin-top:5px; text-align: left" class="w100 TitDiv">' + '    <i class=""></i>' + '    Aplicar tipo de cambio' + '</div>' + '		<div class="clear"></div><form id="formTipoCambio">' + '			<span class="DescuentoCotizador  BoxSizing" style="font-style: italic !important; font-weight:normal !important" id="textoTipoCambio">Este precio esta en <span id="tipoMoneda" style="font-weight: bold;">' + monedaTip + '</span>, convertir al tipo de cambio:  <span id="tipoMoneda2" style="font-weight: bold;">' + idMonedaCotizacion + '</span></span>' + '		<div class="BoxInfo w100">' + '			<label class="BoxSizing  InfoLabel Tip4 Pointer" tip="Tipo de cambio">Tipo de cambio</label>' + '			<input id="tipoCambioValor" data-tipoCambio="' + tipoCambio + '" data-idMonedaCotizacion="' + idMonedaCotizacion + '" value="' + SalesUp.Variables.MonedaSimbolo(tipoCambio) + '" class="BoxSizing InfoData InfoObligatorio" type="text" name="tipoCambioValor"  onfocus="SalesUp.Variables.QuitaFormato({t:this}, 1);" onblur="SalesUp.Variables.RegresaFormato({t:this});">' + '		</div>' + '		<div class="clear"></div>' + '	</form> ' + '</div>';


	SalesUp.Construye.MuestraAlerta({
		TipoAlerta: 'AlertaPregunta',
		Id: 'PopTipoCambio',
		Alerta: Html,
		Boton1: 'Aceptar',
		Boton2: 'Cancelar',
		Icono1: '<i class="fa fa-check"></i>',
		Icono2: '<i class="fa fa-times"></i>',
		Ancho: '500px'
	});


	$('#PopTipoCambio .Btn-flat-Aceptar').attr('onclick', 'SalesUp.Variables.preparaConversorMoneda({t:this})').addClass('Btn-tiny Btn-tiny-min');
	$('#PopTipoCambio .Btn-flat-Cancelar').addClass('Btn-tiny Btn-tiny-min');
	$('#PopTipoCambio .BodyModal').attr('id', 'popup-contenedor');
	$('#PopTipoCambio .ContenedorModal').css('width', '380px');
}

SalesUp.Variables.CancelarPopProductos = function(obj) {

	SalesUp.Variables.estaVisibleCotizador = false;

	var numeroProductos = $('#TablaCotizador .bodyTabla tr').length;
	$('#ProductoAgregado').html(numeroProductos);

	if (numeroProductos == 0) {
		$('#ProductoAgregado').hide();
	}



	var productosAgregados = parseInt($('#ProductoAgregado').html());

	if (productosAgregados > 0 && SalesUp.Variables.BanderaBtnProductos) {
		$('#CapturaProdutos').hide();
	} else {

		$('#tProductos').val(0);
		$('#idfase').parent().removeClass('w100').addClass('w50');
		$('#idlinea').parent().show();
		$('#monto').val(0).removeAttr('disabled');
		$('#monedas').val(SalesUp.Variables.IdEmpresaMoneda).removeAttr('disabled');
		$('#comision').val(0).removeAttr('onfocus').removeClass('disabled');
		$('#comision_monto').val(0).removeAttr('onfocus').removeClass('disabled');

		if(SalesUp.Sistema.NuevaOportunidad == 1 && IDTR == 0){
			SalesUp.Variables.ResetearMonedas();
		}

		SalesUp.Construye.CierraAlerta({
			Elemento: obj.Elemento
		});
		self.parent.SalesUp.Sistema.CambiarTamanioPopUp({
			Alto: '405',
			Ancho: '750'
		});
	}
};

SalesUp.Variables.preparaConversorMoneda = function(Ob) {

	var $c = $('#formTipoCambio');

	if (SalesUp.Valida.ValidaObligatorios({
			DentroDe: $c,
			DestinoMsj: $('#PopTipoCambio .BounceOpenInDown')
		})) {

		var monto = $('#precio').val();



		SalesUp.Variables.QuitaFormato({
			t: $('#tipoCambioValor')
		}, 1);

		//var tipoCambio 		= SalesUp.Variables.valorMonedaActualCotizador;

		var tipoCambio = $('#NombrePrecio option:selected').attr('data-tipocambio');

		var valorNuevaMoneda = parseFloat($('#tipoCambioValor').val());

		$('#precio').val(SalesUp.Variables.ConversorMoneda(valorNuevaMoneda, SalesUp.Variables.valorMonedaActualCotizador, monto));

		var numPrecio = '';
		numPrecio = 'Precio' + $('#NombrePrecio').val();

		var precioMin = SalesUp.Variables.ConversorMoneda(SalesUp.Variables.tipoCambioLocal, tipoCambio, parseFloat(SalesUp.Variables.productoActual[0].precioMin));
		SalesUp.Variables.productoActual[0].precioMin = SalesUp.Variables.ConversorMoneda(valorNuevaMoneda, SalesUp.Variables.valorMonedaActualCotizador, precioMin);
		var costo = SalesUp.Variables.ConversorMoneda(SalesUp.Variables.tipoCambioLocal, tipoCambio, parseFloat(SalesUp.Variables.productoActual[0].Costo));
		SalesUp.Variables.productoActual[0].Costo = SalesUp.Variables.ConversorMoneda(valorNuevaMoneda, SalesUp.Variables.valorMonedaActualCotizador, costo);

		var PrecioLista = parseFloat(SalesUp.Variables.productoActual[0][numPrecio]);
		SalesUp.Variables.productoActual[0][numPrecio] = SalesUp.Variables.ConversorMoneda(valorNuevaMoneda, SalesUp.Variables.valorMonedaActualCotizador, PrecioLista);


		SalesUp.Variables.AgregarArticulo();

		var idMonedaPrecio = $('#NombrePrecio option:selected').attr('data-idmoneda');
		var idMonedaCotizacion = $('#monedas option:selected').attr('data-moneda');
		var idMonedaSiglas = $('#monedas option:selected').text();
		var monedaTip = $('#NombrePrecio option:selected').attr('data-moneda');
		var tipoCambio = $('#NombrePrecio option:selected').attr('data-tipocambio');

		SalesUp.Construye.MuestraMsj({
			tMsg: 2,
			Msg: 'El precio se ha convertido a <b>' + idMonedaCotizacion + ' (' + idMonedaSiglas + ')</b>, con tipo de cambio: <b>$' + tipoCambio + '</b>',
			Destino: $('#precio').closest('.BodyModal')
		});
		SalesUp.Construye.CierraAlerta({
			Elemento: Ob.t
		});
	}
}

SalesUp.Variables.AgregarArticulo = function() {
	$('#sinProductos').css('display', 'none');
	$('#botonesExtra').removeClass('NoMostrar').addClass('Mostrar')
	var $c = $('#CapturaProdutos');

	if (SalesUp.Valida.ValidaObligatorios({DentroDe: $c})) {
		var Op = SalesUp.Variables.productoActual;
		var numPrecio = '';
		numPrecio = 'Precio' + $('#NombrePrecio').val();
		var PrecioLista = parseFloat(Op[0][numPrecio]);
		var idProducto = parseInt(Op[0]['idProducto']);
		var Codigo = Op[0]['Codigo'];
		var Articulo = Op[0]['Producto'];
		Articulo = Articulo.replace(/\"/g, '');
		Articulo = Articulo.replace('\'', '');
		Articulo = Articulo.replace('\\', '');
		var Unidad = Op[0]['Unidad'];
		Unidad = (Unidad) ? Unidad : Unidad = '-';

		//Aqui
		var Precio = $('#precio').val();
			Precio = SalesUp.Sistema.quitarFormatoNumero(Precio);
		var Cantidad = parseFloat($('#cantidad').val());
		var Subtotal = SalesUp.Variables.roundDos(Precio * Cantidad * calculo_noche);

		var NuevoPrecio = Precio;
		//Margen
		var Costo = parseFloat(Op[0]['Costo']);
		var Margen = SalesUp.Variables.roundDos(PrecioLista - Costo);
		var PctMargen = SalesUp.Variables.roundDos(Margen / PrecioLista) * 100;
		var NuevoMargen = SalesUp.Variables.roundDos(NuevoPrecio - Costo);
		var PctNuevoMargen = SalesUp.Variables.roundDos(NuevoMargen / NuevoPrecio) * 100;

		//Calculos impuestos
		var impuestoProducto = '';
		var impuestoMonto = 0;
		var cadenaJsonImpuestos = SalesUp.Variables.ConstruyeJsonImpuestos(Precio);

		var Comision = Op[0].Comision;
		SalesUp.Variables.indiceComision = Op[0].INDICECOMISION;

		//Div impuestos
		if (IDTR == 0 && !desdeTabla) {

			var idMonedaPrecio = $('#NombrePrecio option:selected').attr('data-idmoneda');
			var idMonedaCotizacion = parseFloat($('#NombrePrecio option:selected').attr('data-tipoCambio'));
			SalesUp.Variables.tipMoneda = $('#NombrePrecio option:selected').attr('data-');

			if (!desdeTabla2)
				idMonedaString = $('#NombrePrecio option:selected').attr('data-idmoneda');

			SalesUp.Variables.valorMonedaActualCotizador = idMonedaCotizacion;
			SalesUp.Variables.valorMonedaActualCotizadorAux = SalesUp.Variables.valorMonedaActualCotizador;
			SalesUp.Variables.IdEmpresaMoneda = parseInt($('#NombrePrecio option:selected').attr('data-idmonedaempresa'));
			$('#monedas').val(SalesUp.Variables.IdEmpresaMoneda);

			SalesUp.Variables.ImpuestosProductosDIV();

		} else {
			SalesUp.Variables.ImpuestosProductosDIV();
			var idMonedaPrecio = $('#NombrePrecio option:selected').attr('data-idmoneda');
			var idMonedaCotizacion = parseFloat($('#NombrePrecio option:selected').attr('data-tipoCambio'));
			SalesUp.Variables.tipMoneda = $('#NombrePrecio option:selected').attr('data-tip');
		}


		//Variables te moneda del articulo
		var idMoneda = Op[0].idMoneda;
		var monedaTip = Op[0].monedaTip;
		var tipoCambio = Op[0].tipoCambio;

		//Forma imagenes
		var srcImagenes = '';
		var separador = 'srcImg';

		if (SalesUp.Variables.productoActual[0].IMAGENES) {
			var imagenes = JSON.parse(Op[0].IMAGENES);

			for (var i = 0; i < imagenes.length; i++) {
				if (imagenes[i]['valor']) {
					srcImagenes += Op[0]['link'] + imagenes[i]['valor'] + separador;
				}
			}
		}

		var Clase = 'NoMostrar';

		if (srcImagenes.length > 0) {
			srcImagenes = srcImagenes.substring(0, srcImagenes.length - 6);
			Clase = 'Mostrar';
		}

		var Existencia = Op[0].Existencia;

		if (Existencia == '-1')
			Existencia = 'Ilimitado';

		var PrecioMinimo = Op[0]['precioMin'];
		var jsonArticulo = {};
        	jsonArticulo.Articulo = [];

        var jAuxAriticulo = {};
        jAuxAriticulo.Codigo = Codigo;
        jAuxAriticulo.COMENTARIO = Op[0].COMENTARIO;
        jAuxAriticulo.idProducto = idProducto;
        jAuxAriticulo.IDTR = IDTR;
        jAuxAriticulo.Articulo = Articulo;
        jAuxAriticulo.Clase = Clase;
        jAuxAriticulo.PctNuevoMargen = PctNuevoMargen;
        jAuxAriticulo.Margen = Margen;
        jAuxAriticulo.PrecioLista = PrecioLista;
        jAuxAriticulo.Unidad = Unidad;
        jAuxAriticulo.Existencia = Existencia;
        jAuxAriticulo.SrcImagenes = srcImagenes;
        jAuxAriticulo.Cantidad = Cantidad;
        jAuxAriticulo.ImpuestoMonto = SalesUp.Variables.MonedaSimbolo(impuestoMonto);
        jAuxAriticulo.Impuesto = impuestoProducto;
        jAuxAriticulo.Comision = Comision;
        jAuxAriticulo.PrecioMinimo = PrecioMinimo;
        jAuxAriticulo.Costo = Costo;
        jAuxAriticulo.TIPMONEDA = monedaTip;
        jAuxAriticulo.IDMONEDA = idMoneda;
        jAuxAriticulo.Precio = SalesUp.Variables.MonedaSimbolo(Precio);
        jAuxAriticulo.Descuento = SalesUp.Variables.MonedaSimbolo(Op[0].CANTIDAD_DESC);
        jAuxAriticulo.PrecioSinFormato = Precio;
        jAuxAriticulo.readonly = readonly;
        jAuxAriticulo.NombrePrecio = $('#NombrePrecio').val();
        jAuxAriticulo.Fecha_ini = $('#fecha_ini').val();
        jAuxAriticulo.Fecha_fin = $('#fecha_fin').val();
        jAuxAriticulo.Noches = calculo_noche;
        jAuxAriticulo.CANTIDAD_DESC = Op[0].CANTIDAD_DESC;
        jAuxAriticulo.PORCENTAJE_DESC = parseFloat(Op[0].PORCENTAJE_DESC*100);
        jAuxAriticulo.COMENTARIO = Op[0].COMENTARIO
        jAuxAriticulo.Subtotal = SalesUp.Variables.MonedaSimbolo(Subtotal);
        					
        jsonArticulo.Articulo.push(jAuxAriticulo);
        
		jsonArticulo.Articulo[0].JsonImpuesto = cadenaJsonImpuestos;
		var compilado = SalesUp.Construye.ReemplazaDatos({
			Template: templateArt,
			Datos: jsonArticulo
		});

		$('.bodyTabla').append(compilado);


		SalesUp.Variables.productoActual[0].IDTR = IDTR;
		SalesUp.Variables.productoActual[0].CANTIDAD = Cantidad;
		//incrementa variable de IDTR
		IDTR++;
		values.push(SalesUp.Variables.productoActual[0]);
		SalesUp.Variables.ActualizaTabla();
		//Regresa controles
		SalesUp.Variables.ReiniciaControles();

		SalesUp.Sistema.DatePickerInicioFin({
			D: 'fecha_ini' + (IDTR - 1),
			H: 'fecha_fin' + (IDTR - 1),
			A: 'SalesUp.Variables.DiferenciaEntreFechas({t:this}, $("#fecha_ini' + (IDTR - 1) + '").val(),$("#fecha_fin' + (IDTR - 1) + '").val(),' + (IDTR - 1) + ')'
		});
		//SalesUp.Sistema.IniciaPlugins();
	}

		SalesUp.Variables.DragTable();
}

SalesUp.Variables.ActualizaMoneda = function() {
	var nuevoTipoCambio = $('#monedas option:selected').attr('data-tipoCambio');
	var idMonedaempresa = $('#monedas').val();
	idMonedaString = $('#monedaCotizacion option:selected').text();

	$('#monedas').val(idMonedaempresa);

	SalesUp.Variables.valorMonedaActualCotizador = nuevoTipoCambio;

	if (!SalesUp.Variables.productoActual[0]) {
		SalesUp.Variables.CambiaMonedaTabla();
	}
}

SalesUp.Variables.CambiaMoneda = function() {
	var nuevoTipoCambio = $('#monedaCotizacion option:selected').attr('data-tipoCambio');
	idMonedaString = $('#monedaCotizacion option:selected').text();
	var idMonedaempresa = $('#monedas').val();

	$('#monedas').val(idMonedaempresa);

	SalesUp.Variables.valorMonedaActual = nuevoTipoCambio;

	if (nuevoTipoCambio != SalesUp.Variables.valorMonedaActualCotizadorAux) {
		$('#TablaCotizador .bodyTabla tr').each(function() {
			var idTr = $(this).attr('data-IDTR');
			var IDPRODUCTO = $(this).find('.precio').attr('data-idProducto');
			var CANTIDAD = $(this).find('.cantidad').val();

			SalesUp.Sistema.quitarFormatoNumero($(this).find('.precio'));

			var PRECIO = $(this).find('.precio').val();
			var NOMBREPRECIO = $(this).find('.precio').attr('data-NombrePrecio');

			for (var i = 0; i < values.length; i++) {
				if (values[i].IDTR == idTr) {
					values[i].PRECIO_USUARIO = parseFloat(PRECIO);
					values[i].CANTIDAD = parseInt(CANTIDAD);
					values[i].INDICEPRECIOLISTA = parseInt(NOMBREPRECIO);
					break;
				}
			}
		});

		$('#TablaCotizador .bodyTabla tr').each(function() {
			$(this).remove();
		});

		valuesR = values;
		IDTR = 0;
		values = [];

		for (var i = 0; i < valuesR.length; i++) {
			SalesUp.Variables.productoActual[0] = valuesR[i];

			if (i != (valuesR.length - 1)) {
				var numPrecio = '';

				$('#NombrePrecio').val(parseInt(SalesUp.Variables.productoActual[0]['INDICEPRECIOLISTA']));

				numPrecio = 'Precio' + $('#NombrePrecio').val();
				var precioUsuario = SalesUp.Variables.productoActual[0]['PRECIO_USUARIO'];
				var precioN = SalesUp.Variables.ConversorMoneda(SalesUp.Variables.valorMonedaActualCotizadorAux, nuevoTipoCambio, precioUsuario);

				SalesUp.Variables.productoActual[0]['PRECIO_USUARIO'] = precioN;
				$('#precio').val(SalesUp.Variables.ConversorMoneda(SalesUp.Variables.valorMonedaActualCotizadorAux, nuevoTipoCambio, precioUsuario));

				var precioMin = parseFloat(SalesUp.Variables.productoActual[0].precioMin);
				SalesUp.Variables.productoActual[0].precioMin = SalesUp.Variables.ConversorMoneda(SalesUp.Variables.valorMonedaActualCotizadorAux, nuevoTipoCambio, precioMin);
				var costo = parseFloat(SalesUp.Variables.productoActual[0].Costo);
				SalesUp.Variables.productoActual[0].Costo = SalesUp.Variables.ConversorMoneda(SalesUp.Variables.valorMonedaActualCotizadorAux, nuevoTipoCambio, costo);
				var PrecioLista = parseFloat(SalesUp.Variables.productoActual[0][numPrecio]);
				SalesUp.Variables.productoActual[0][numPrecio] = SalesUp.Variables.ConversorMoneda(SalesUp.Variables.valorMonedaActualCotizadorAux, nuevoTipoCambio, PrecioLista);

				$('#precio').val(SalesUp.Variables.productoActual[0]['PRECIO_USUARIO']);
				$('#cantidad').val(SalesUp.Variables.productoActual[0]['CANTIDAD']);
			} else {

				var numPrecio = '';
				$('#NombrePrecio').val(parseInt(SalesUp.Variables.productoActual[0]['INDICEPRECIOLISTA']));

				numPrecio = 'Precio' + $('#NombrePrecio').val();
				var precioUsuario = parseFloat(SalesUp.Variables.productoActual[0]['PRECIO_USUARIO']);

				$('#precio').val(precioUsuario);
				$('#cantidad').val(SalesUp.Variables.productoActual[0]['CANTIDAD']);
			}
			SalesUp.Variables.AgregarArticulo();
		}

		SalesUp.Variables.valorMonedaActualCotizadorAux = SalesUp.Variables.valorMonedaActualCotizador;
		valuesR = [];
	}

}

SalesUp.Variables.ConstruyeJsonImpuestos = function(Precio) {
	var impuestoProductoJSON = impuestosEmpresa;
	var Op = SalesUp.Variables.productoActual;
	var porcentajeValor = 0.0;
	var impuestos = Op[0].ImpEmpresa;
	impuestos = '[' + impuestos.substring(0, impuestos.length - 1) + ']';
	impuestos = JSON.parse(impuestos);

	for (var i = 0; i < impuestoProductoJSON.Impuestos.length; i++) {
		indice = 'impuesto' + impuestos[i]['indice'];
		porcentajeValor = parseFloat(Op[0][indice]);
		(impuestoProductoJSON.Impuestos[i]).precioBaseImpuesto = SalesUp.Variables.roundDos(Precio);
		(impuestoProductoJSON.Impuestos[i]).porcentajeImpuesto = porcentajeValor;
		(impuestoProductoJSON.Impuestos[i]).montoImpuesto = SalesUp.Variables.roundDos(Precio * porcentajeValor);
	}

	return JSON.stringify(impuestoProductoJSON);
}

SalesUp.Variables.RecalculaImpuestos = function() {

	SalesUp.Variables.impuestosProductos = [];
	var importeLocalComisionTotal = 0;
	var porcentajeLocal = (1 / total) * cantidadDescGlobal;
	impuestosTotales = impuestosEmpresa.Impuestos; //solo para la estructura
	var unico = 0;

	$('.subtotal').each(function() {
		var cadenaJson = $(this).attr('data-impuesto');
		var cantidad = parseFloat($(this).attr('data-cantidad'));
		var precio = parseFloat($(this).attr('data-precio'));
		var comision = parseFloat($(this).attr('data-comision'));

		//Nuevo modulo
		var noche = parseFloat($(this).attr('data-noche'));

		cadenaJson = JSON.parse(cadenaJson);
		var indice = 0;
		var montoImpuestoIndividual = 0;

		var $padre = $(this).closest('tr');
		var cantidad_descuento = $($padre).attr('data-desc');

		for (var i = 0; i < cadenaJson.Impuestos.length; i++) {
			if (unico == 0) {
				impuestosTotales[i].montoImpuestoTotal = 0;
			}
			//delete impuestosTotales[i].nombre;
			delete impuestosTotales[i].precioBaseImpuesto;
			delete impuestosTotales[i].porcentajeImpuesto;
			delete impuestosTotales[i].montoImpuesto;

			(cadenaJson.Impuestos[i]).precioBaseImpuesto = (precio - cantidad_descuento);


			if (porcentajeLocal != 0) {
				(cadenaJson.Impuestos[i]).montoDescuento = parseFloat((cadenaJson.Impuestos[i]).precioBaseImpuesto) * porcentajeLocal * cantidad * noche; //consulta antes de calcular precioImpuesto
				(cadenaJson.Impuestos[i]).montoSubtotal = parseFloat((cadenaJson.Impuestos[i]).precioBaseImpuesto) * cantidad * noche;
				(cadenaJson.Impuestos[i]).montoTotal = parseFloat((cadenaJson.Impuestos[i]).montoSubtotal) - parseFloat((cadenaJson.Impuestos[i]).montoDescuento);
				(cadenaJson.Impuestos[i]).comisionProducto = (cadenaJson.Impuestos[i]).montoTotal * comision;
				(cadenaJson.Impuestos[i]).precioBaseImpuesto = parseFloat((cadenaJson.Impuestos[i]).precioBaseImpuesto) - (parseFloat((cadenaJson.Impuestos[i]).precioBaseImpuesto) * porcentajeLocal);
				(cadenaJson.Impuestos[i]).montoImpuesto = SalesUp.Variables.roundDos((parseFloat((cadenaJson.Impuestos[i]).porcentajeImpuesto) * parseFloat((cadenaJson.Impuestos[i]).precioBaseImpuesto)) * cantidad * noche);

				if (i == 0) {
					importeLocalComisionTotal += (cadenaJson.Impuestos[i]).precioBaseImpuesto * comision * cantidad * noche;
				}
			} else {
				(cadenaJson.Impuestos[i]).montoImpuesto = SalesUp.Variables.roundDos((cadenaJson.Impuestos[i]).precioBaseImpuesto * (cadenaJson.Impuestos[i]).porcentajeImpuesto * cantidad * noche);
				(cadenaJson.Impuestos[i]).montoDescuento = 0;
				(cadenaJson.Impuestos[i]).montoSubtotal = parseFloat((cadenaJson.Impuestos[i]).precioBaseImpuesto) * cantidad * noche;
				(cadenaJson.Impuestos[i]).montoTotal = parseFloat((cadenaJson.Impuestos[i]).montoSubtotal) - parseFloat((cadenaJson.Impuestos[i]).montoDescuento);
				(cadenaJson.Impuestos[i]).comisionProducto = (cadenaJson.Impuestos[i]).montoTotal * comision * noche;

				if (i == 0) {
					importeLocalComisionTotal += (cadenaJson.Impuestos[i]).precioBaseImpuesto * comision * cantidad * noche;
				}

			}

			var aux = parseFloat(impuestosTotales[i].montoImpuestoTotal);
			impuestosTotales[i].montoImpuestoTotal = aux + parseFloat((cadenaJson.Impuestos[i]).montoImpuesto);
		}

		unico++;
		SalesUp.Variables.impuestosProductos.push(cadenaJson);
	});

	var id = '';

	//resetea a 0
	sumaImpuestosTotales = 0;

	for (var j = 0; j < impuestosTotales.length; j++) {
		id = '#impuesto' + impuestosTotales[j].indice;
		var valor = SalesUp.Variables.roundDos(parseFloat(impuestosTotales[j].montoImpuestoTotal));
		sumaImpuestosTotales += valor;

		$(id).text(SalesUp.Variables.MonedaSimbolo(valor));
	}
	//Insertando comision
	if (isNaN(importeLocalComisionTotal)) {
		importeLocalComisionTotal = 0;
	}
	if (isNaN(sumaImpuestosTotales)) {
		sumaImpuestosTotales = 0;
	}

	$('#comision_monto').val(SalesUp.Sistema.formatoNumero(importeLocalComisionTotal));
}


SalesUp.Variables.ImpuestosProductosDIV = function() {


	var impuestosEmpresaAux = [];

	impuestosEmpresaAux.push(impuestosEmpresa);


	var templateImpuestos = '{{#each Impuestos}}<div class="w100">' + '	<div style="float: right;margin-top: 2px;" class="w40">' + '		<span  class="w60" style="float: left; text-align:right;  margin-left: 32px;"><b>{{nombre}} (' + idMonedaString + '):</b></span>' + '		<span id="impuesto{{indice}}"  data-monto="0" style="float: right;">$0.00</span>' + '	</div>' + '</div>{{/each}}';

	var compilado = '';

	if (impuestosEmpresaAux[0].Impuestos[0].indice != 0)
		compilado = SalesUp.Construye.ReemplazaDatos({
			Template: templateImpuestos,
			Datos: impuestosEmpresaAux[0]
		});

	$('#impuestos').html(compilado);

}


SalesUp.Variables.ReiniciaControles = function() {
	$('#precio').val('').attr('disabled');
	$('#cantidad').val('').attr('disabled');

	setTimeout(function() {
		$('#Articulo')[0].selectize.clearOptions();
		$('#Articulo')[0].selectize.focus();
	}, 250);
}

SalesUp.Variables.AgregarArticuloBD = function(IDOPORTUNIDAD, idProspecto, tko, idArchivo) {

	miX = true;
	SalesUp.Variables.ListaPrecios(); 
	SalesUp.Variables.ActivaModuloHotel();
	setTimeout(function(){
		$('#NombrePrecio').val(parseInt(SalesUp.Variables.jsonlistaprecios[0].Indice));
	},800)
	desdeTabla2 = true;

	IDTR = 0;
	IdOportunidad = IDOPORTUNIDAD;
	SalesUp.Variables.jsonProductosBD = SalesUp.Sistema.CargaDatos({
		Link: '/privado/modelo/jsonDatosProductosCotizadorEditar.dbsp',
		Parametros: 'IDOPORTUNIDAD=' + IDOPORTUNIDAD,
		DataType: 'json'
	});

	var jsonRespuesta = SalesUp.Variables.jsonProductosBD.jsonDatos;
	jsonRespuesta = _.reject(jsonRespuesta, function(j) {
		return _.size(j) == 0
	});
	SalesUp.Variables.jsonProductosBD = jsonRespuesta;
	var tipoCambio = 0;

	var datosCotizacion = SalesUp.Sistema.CargaDatos({
		Link: '/privado/modelo/jsonObtieneDatosOportunidad.dbsp',
		Parametros: 'IDOPORTUNIDAD=' + IDOPORTUNIDAD,
		DataType: 'json'
	}).jsonDatos;


	SalesUp.Variables.indiceComision = datosCotizacion[0].COMISION;
	SalesUp.Variables.idDocumento = datosCotizacion[0].IDDOCUMENTO;

	for (var i = 0; i < SalesUp.Variables.jsonProductosBD.length; i++) {

		if (i == 0) {
			tipoCambio = SalesUp.Variables.jsonProductosBD[i]['TIPOCAMBIO'];
			SalesUp.Variables.valorMonedaActualCotizador = tipoCambio;
			SalesUp.Variables.IdEmpresaMoneda = SalesUp.Variables.jsonProductosBD[i]['IDEMPRESAMONEDA'];

			SalesUp.Variables.ActivaMonedaEditarProductos();
		}

		SalesUp.Variables.productoActual = SalesUp.Variables.jsonProductosBD[i];
		SalesUp.Variables.productoActual[0] = SalesUp.Variables.productoActual;

		porcentajeDescGlobal = parseFloat(SalesUp.Variables.productoActual[0]['DESCUENTO_PCT']);

		//Nuevo
		$('#NombrePrecio').val(parseInt(SalesUp.Variables.productoActual[0]['INDICEPRECIOLISTA']));

		var numPrecio = '';
		numPrecio = 'Precio' + $('#NombrePrecio').val();
		var precioMin = parseFloat(SalesUp.Variables.productoActual[0].precioMin);
		SalesUp.Variables.productoActual[0].precioMin = SalesUp.Variables.ConversorMoneda(1, tipoCambio, precioMin);
		var costo = parseFloat(SalesUp.Variables.productoActual[0].Costo);
		SalesUp.Variables.productoActual[0].Costo = SalesUp.Variables.ConversorMoneda(1, tipoCambio, costo);
		var PrecioLista = parseFloat(SalesUp.Variables.productoActual[0][numPrecio]);
		SalesUp.Variables.productoActual[0][numPrecio] = SalesUp.Variables.ConversorMoneda(1, tipoCambio, PrecioLista);
		SalesUp.Variables.productoActual[0].INDICECOMISION = SalesUp.Variables.indiceComision;

		//Nuevo
		var precioUsuario = SalesUp.Sistema.formatoNumero(SalesUp.Variables.productoActual[0]['PRECIO_USUARIO']);
		$('#precio').val(precioUsuario);
		$('#cantidad').val(SalesUp.Variables.productoActual[0]['CANTIDAD']);
		$('#fecha_ini').val(SalesUp.Variables.productoActual[0]['FECHA_INI']);
		$('#fecha_fin').val(SalesUp.Variables.productoActual[0]['FECHA_FIN']);
		calculo_noche = SalesUp.Variables.productoActual[0]['NOCHES'];

		if (isNaN(calculo_noche) || calculo_noche < 1)
			calculo_noche = 1;
		SalesUp.Variables.AgregarArticulo();
	}

	var existeMonedas = $('#monedas').val();

	if ($.type(existeMonedas) === "undefined") {
		SalesUp.Variables.ActivaMonedaOculto();
	}

	SalesUp.Variables.IdEmpresaMoneda = SalesUp.Variables.jsonProductosBD[0]['IDEMPRESAMONEDA'];
	$('#monedas').val(SalesUp.Variables.IdEmpresaMoneda);
	SalesUp.Variables.valorMonedaActualCotizador = tipoCambio;
	SalesUp.Variables.valorMonedaActualCotizadorAux = tipoCambio;
	SalesUp.Variables.CalculaDescuento(2, 2);

	setTimeout(function() {
		SalesUp.Variables.CalculaSubtotal({t: $('#TR0 .precio')}, 2)
	}, 1000);

	//Resetea Controles
	$('#NombrePrecio').val(0);
	SalesUp.Variables.ControlesDefault();
	//BanderaEditar = 1;
	$('#fecha_ini').datepicker('destroy');
	$('#fecha_fin').datepicker('destroy');
	SalesUp.Sistema.DatePickerInicioFin({
		D: 'fecha_ini',
		H: 'fecha_fin',
		A: 'SalesUp.Variables.DiferenciaEntreFechas({t:this}, $("#fecha_ini").val(),$("#fecha_fin").val(),' + (-1) + ')'
	});
	//SalesUp.Sistema.IniciaPlugins();
}



SalesUp.Variables.ActualizaTabla = function() {
	SalesUp.Variables.AgregaClaseZebra();
	SalesUp.Variables.CalculaTotales();
	SalesUp.Variables.AgregaClaseZebra();
	SalesUp.Variables.AgregaFuncionesInputs();
	SalesUp.Sistema.Tipsy();
	SalesUp.Variables.NuevoTamanioProductosVisualizar();
}

SalesUp.Variables.AgregaClaseZebra = function() {
	var bandera = true;
	var i = 0;
	$('.bodyTabla tr').each(function() {

		var observaciones = $(this).attr('data-observaciones');

		if (observaciones != '')
			$(this).find('.Comentario').removeClass('NoMostrar').addClass('Mostrar');
		else
			$(this).find('.Comentario').removeClass('Mostrar').addClass('NoMostrar');

		SalesUp.Variables.CalculaSubtotal({t: $(this).find('.precio')}, 3);

		if (bandera) {
			$(this).removeClass('zebra');
			bandera = false;
		} else {
			$(this).addClass('zebra');
			bandera = true;
		}
	});
}

SalesUp.Variables.EliminaArticulo = function(Op) {
	var $t = $(SalesUp.Variables.ElOp).closest('tr');
  	//var $t = Op.closest('tr');
	var TREliminar = $($t).attr('data-IDTR');

	for (var i = 0; i < values.length; i++) {
		if (values[i].IDTR == TREliminar) {
			values.splice(i, 1);
			break;
		}
	}

	$t.closest('tr').remove();

	SalesUp.Variables.ActualizaTabla();
	$('.tipsy').remove();

	var ExisteTr = $('.bodyTabla tr').length;

	if (ExisteTr == 0) {
		$('#botonesExtra').removeClass('Mostrar').addClass('NoMostrar');
		$('#sinProductos').html('<i class="fa fa-lg fa-cart-arrow-down"></i> Realiza la captura de productos');
		$('#sinProductos').css('display', 'block');
		$('#granTotal').removeClass('Mostrar').addClass('NoMostrar');
		SalesUp.Variables.ResetearMonedas();

		cantidadDescGlobal = 0;
		porcentajeDescGlobal = 0;
		MensajeGlobal = '0%';
		IDTR = 0;
	}
}

SalesUp.Variables.CalculaTotales = function(tipo) {
	var cantidadArticulos = 0;
	var montoTotal = 0;
	$('.cantidad').each(function() {
		cantidadArticulos += (parseInt($(this).val()));
	});


	$('.subtotal').each(function() {
		SalesUp.Variables.QuitaFormato({
			t: $($(this))
		}, 2);


		montoTotal += parseFloat($(this).text());
		$(this).text(SalesUp.Variables.MonedaSimbolo($(this).text()));
	});

	$('.alertaW').each(function() {
		var PctNuevoMargen = parseFloat($(this).attr('data-PctNuevoMargen'));
		var PrecioLista = parseFloat($(this).attr('data-PrecioLista'));
		var PrecioUsuario = parseFloat($(this).attr('data-PrecioUsuario'));
		var Costo = parseFloat($(this).attr('data-costo'));
		var PrecioMin = parseFloat($(this).attr('data-precioMinimo'));


		if (Costo == 0) {
			var margenPrecio = ((PrecioLista - Costo) / 2) + Costo;
		} else {
			var margenPrecio = ((PrecioLista - PrecioMin) / 2) + PrecioMin;
		}

		if ((PrecioUsuario < margenPrecio) && (Costo != 0 || PrecioMin != 0)) {
			$(this).removeClass('NoMostrar').addClass('Mostrar');
		} else {
			$(this).removeClass('Mostrar').addClass('NoMostrar');
		}

		if (PctNuevoMargen <= 50) {
			$(this).css('color', 'red');
		} else if ((PctNuevoMargen >= 51)) {
			$(this).css('color', 'green');
		}
	});

	total = montoTotal;

	if (isNaN(tipo)) {
		SalesUp.Variables.CalculaDescuento(2, 2);
	}

	SalesUp.Variables.RecalculaImpuestos();
	montoFinal = SalesUp.Variables.roundDos((montoTotal - cantidadDescGlobal) + sumaImpuestosTotales);
	$('#impuestosMonto').val(sumaImpuestosTotales);


	if (isNaN(montoFinal)) {
		montoFinal = 0;
	}

	SalesUp.Variables.subTotal = montoTotal;
	$('#subtotalTexto').html('<b>Subtotal (' + idMonedaString + ')</b> (<b>' + cantidadArticulos + '</b>):');
	$('#subtotal').html(SalesUp.Variables.MonedaSimbolo(montoTotal));
	$('#textoTotal').html('<b>Total (' + idMonedaString + ')</b>:');
	$("#total").text(SalesUp.Variables.MonedaSimbolo(montoFinal));
	//$('#descuentoTexto').text('Descuento (' + idMonedaString + ') (' + SalesUp.Sistema.formatoNumero(porcentajeDescGlobal) + '%):');
	//$('#descuentoCantidad').text(SalesUp.Variables.MonedaSimbolo(cantidadDescGlobal));
	$('#granTotal').removeClass('NoMostrar').addClass('Mostrar');
}


SalesUp.Variables.roundDos = function(num) {
	return +(Math.round(num + "e+2") + "e-2");
}
SalesUp.Variables.roundCuatro = function(num) {
	return +(Math.round(num + "e+4") + "e-4");
}


SalesUp.Variables.AgregaFuncionesInputs = function() {
	$('.cantidad').attr('onchange', 'SalesUp.Variables.CalculaSubtotal({t:this}, 1);').attr('onKeyPress', 'return SalesUp.Variables.valDecimales({e:event, t:this, v:value, id:id, Cerca: true, DestinoMsj:\'#popup-contenedor\'})').attr('onblur', '$(this).removeClass("DatoMal")');
	if(SalesUp.Variables.crearpermisoprecio=='1'){
		$('.precio').attr('onchange', 'SalesUp.Variables.CalculaSubtotal({t:this}, 2);').attr('onblur', 'SalesUp.Variables.CalculaSubtotal({t:this}, 2);').attr('onKeyPress', 'return SalesUp.Valida.valDecimales({e:event, t:this, v:value, Cerca: true, DestinoMsj:\'#popup-contenedor\'})').attr('onkeyup', '$(this).removeClass("DatoMal")');
	}
	
    (SalesUp.Variables.crearpermisoprecio=='0') ? $('.precio').attr('readonly', 'readonly') : '';

	$('.precioWarning').attr('onchange', 'SalesUp.Variables.ValidaPrecioMinimo({t:this}, 2);').attr('onKeyPress', 'return SalesUp.Valida.valDecimales({e:event, t:this, v:value, Cerca: true, DestinoMsj:\'#popup-contenedor\'})').attr('onkeyup', '$(this).removeClass("DatoMal"); SalesUp.Variables.CalculaWarning({t:this});');
}

SalesUp.Variables.QuitaFormato = function(Op, tipo) {
	var $t = $(Op.t);
	var v = '';

	if (tipo == 1) {
		v = $t.val();
		/*		if(SysSepDecimales == ','){
					$t.val(accounting.unformat(accounting.unformat(v, '.'), SysSepDecimales));
				}else{*/
		$t.val(SalesUp.Sistema.quitarFormatoNumero(v));
		//}

	} else {
		v = $t.text();
		/*
		  		if(SysSepDecimales == ','){
		  			$t.val(accounting.unformat(accounting.unformat(v, '.'), SysSepDecimales));
		  		}else{*/
		$t.text(SalesUp.Sistema.quitarFormatoNumero(v));

		//}
	}

	if (!v) {
		return;
	}
}

SalesUp.Variables.ActivaFormato = function(Op, tipo) {
	if (tipo == 1) {
		var $t = $(Op.t);
		var v = parseInt($t.val());

		if (!v) {
			return;
		}
		$t.val(SalesUp.Variables.MonedaSimbolo(v));
	} else {
		var $t = $(Op.t);
		var v = parseInt($t.text());

		if (!v) {
			return;
		}
	}
}
SalesUp.Variables.CalculaSubtotal = function(Op, tipo) {

    var $t = $(Op.t);
    SalesUp.Variables.QuitaFormato(Op, 1)
    var noches = 1;

    if (tipo == 1) {
        var $padre = $t.closest('tr');
        var $precioU = $($padre).find('.precio');

        SalesUp.Variables.QuitaFormato({
            t: $($precioU)
        }, 1);

        var $subtotal = $($padre).find('.subtotal');
        var Precio = SalesUp.Sistema.quitarFormatoNumero($precioU.val());
        var Cantidad = SalesUp.Sistema.quitarFormatoNumero($t.val());

        if (SalesUp.Variables.hotel) {
            noches = parseInt($($padre).find('.Noche').text());

            if(noches==0)
            	noches=1

        }
        //Nuevo
        var cantidad_descuento = $($padre).attr('data-desc');


        var Subtotal = SalesUp.Variables.roundDos((Precio - cantidad_descuento) * Cantidad * noches);

        $($precioU).val(SalesUp.Variables.MonedaSimbolo(Precio));
        $subtotal.text(SalesUp.Variables.MonedaSimbolo(Subtotal));
        //Agrega Atributos de precio actualizado y cantidad
        $subtotal.attr('data-cantidad', Cantidad);
        $subtotal.attr('data-precio', Precio);
        $subtotal.attr('data-noche', noches);

    } else {


        var $padre = $t.closest('tr');

        //Nuevo
        var cantidad_descuento = $($padre).attr('data-desc');


        SalesUp.Variables.ValidaPrecioMinimo({
            t: $t
        }, 2);

        var Precio = parseFloat($t.val());
        var $cantidad = $($padre).find('.cantidad');
        var $subtotal = $($padre).find('.subtotal');
        var Cantidad = SalesUp.Sistema.quitarFormatoNumero($cantidad.val());

        if (SalesUp.Variables.hotel) {
            noches = parseInt($($padre).find('.Noche').text());
        
            if(noches==0)
            	noches=1

        }

        var Subtotal = SalesUp.Variables.roundDos((Precio - cantidad_descuento) * Cantidad * noches);

        //Recalculo de PctNuevoMargen
        var NuevoPrecio = Precio - cantidad_descuento;

        var $precioU = $($padre).find('.alertaW');
        var idProducto = parseInt($($precioU).attr('data-idProducto'));
        var IDTR = parseInt($($precioU).attr('data-IDTR'));
        var PrecioLista = parseFloat($($precioU).attr('data-PrecioLista'));

        $($precioU).attr('data-PrecioUsuario', NuevoPrecio);

        var encontrado = _.where(values, {
            IDTR: IDTR
        });
        var Op = encontrado;
        var Costo = parseFloat(Op[0]['Costo']);
        var Margen = SalesUp.Variables.roundDos(PrecioLista - Costo);
        var PctMargen = SalesUp.Variables.roundDos(Margen / PrecioLista);
        var NuevoMargen = SalesUp.Variables.roundDos(NuevoPrecio - Costo);
        var PctNuevoMargen = SalesUp.Variables.roundDos(NuevoMargen / NuevoPrecio);

        $($precioU).attr('data-PctNuevoMargen', SalesUp.Variables.roundDos(PctNuevoMargen * 100));
        $subtotal.text(SalesUp.Variables.MonedaSimbolo(Subtotal));
        $t.val(SalesUp.Variables.MonedaSimbolo($t.val()))
        //Agrega Atributos de precio actualizado y cantidad
        $subtotal.attr('data-cantidad', Cantidad);
        $subtotal.attr('data-precio', Precio);
        $subtotal.attr('data-noche', noches);

        $($precioU).attr('data-PrecioUsuario', Precio);
        //Nuevo modulo

    }
	if(tipo!=3){
	    SalesUp.Variables.CalculaTotales();
	}

}


SalesUp.Variables.MuestraImagenes = function(Op) {
	var $Elemento = $(Op.t);
	var links = $Elemento.attr('data-src');
	links = links.split('srcImg');
	var inputs = '';
	var labels = '';
	var imagenes = '';

	for (var i = 0; i < links.length; i++) {
		inputs += '<input id="button-' + (i + 1) + '" type="radio" name="radio-set" class="Pointer sp-selector-' + (i + 1) + '" checked="checked" />';
		inputs += '<label for="button-' + (i + 1) + '" class="Pointer button-label-' + (i + 1) + '"></label>';
		imagenes += '<li><img class="ImagenScroll" src="' + links[i] + '"/></li>';
	}

	var contenido = '<div class="container">' + '<div class="sp-slideshow">' + inputs + '<div class="sp-content">' + '<div class="sp-parallax-bg"></div>' + '<ul class="sp-slider clearfix">' + imagenes + '</ul>' + '</div>'

	+'</div>' + '</div>';
	SalesUp.Variables.popOver({
		Elemento: Op.t,
		PopOverLugar: 'bottom',
		Titulo: '<b>Productos</b>',
		Contenido: contenido
	}, 1);
}

SalesUp.Variables.popOver = function(Op, tipo) {
	var Contenido = '',
		Titulo = '';
	var $Elemento = $(Op.Elemento);

	$('.tipsy').remove();
	$('.popover').hide();
	$Elemento.popover('destroy');

	var dirPopOver = 'top',
		Clases = '';
	(Op.PopOverLugar) ? dirPopOver = Op.PopOverLugar: '';
	(Op.Titulo) ? Titulo = Op.Titulo: '';
	(Op.Contenido) ? Contenido = Op.Contenido: '';
	(Op.Clases) ? Clases = Op.Clases: '';


	var PopOverId = 'PopOver' + SalesUp.Construye.IdUnico();
	var TemplatePopover = '';

	if (tipo == 1) {
		TemplatePopover = '<div class=" tipsy popoverImagen" id="' + PopOverId + '" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>';
	} else {
		TemplatePopover = '<div class="popoverWarning" id="' + PopOverId + '" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>';
	}

	$Elemento.popover({
		template: TemplatePopover,
		placement: dirPopOver,
		html: true,
		container: 'body',
		title: Titulo,
		content: Contenido
	});

	$Elemento.popover('show');

	var $PopOverId = $('#' + PopOverId);
	var Cerrar = true;



	$PopOverId.mouseleave(function() {
		Cerrar = true;
		setTimeout(function() {
			(Cerrar) ? $PopOverId.remove(): '';
		}, 1000);
	}).mouseenter(function() {
		Cerrar = false;
	})

	setTimeout(function() {
		(Cerrar) ? $PopOverId.remove(): '';
	}, 4000);

	$Elemento.mouseleave(function() {
		Cerrar = true;
		setTimeout(function() {
			(Cerrar) ? $PopOverId.remove(): '';
		}, 3000);
	}).mouseenter(function() {
		Cerrar = false;
	});
}

SalesUp.Variables.CalculaWarning = function(Op) {



	var $t = $(Op.t);
	var IDTR = $t.attr('data-IDTR');

	$(IDTR + ' .precio').val(SalesUp.Variables.MonedaSimbolo($($t).val()));

	var NuevoPrecio = parseFloat($($t).val());
	var Costo = parseFloat($('#Costo').attr('data-Costo'));
	var PrecioLista = parseFloat($('#PrecioLista').attr('data-PrecioLista'));

	var Margen = SalesUp.Variables.roundDos(PrecioLista - Costo);
	var PctMargen = SalesUp.Variables.roundDos(Margen / PrecioLista);
	var NuevoMargen = SalesUp.Variables.roundDos(NuevoPrecio - Costo);
	var PctNuevoMargen = SalesUp.Variables.roundDos(NuevoMargen / NuevoPrecio);
	var Perdida = SalesUp.Variables.roundDos(1 - (NuevoMargen / Margen));
	var Recuperacion = SalesUp.Variables.roundDos(Margen / NuevoMargen);

	if (isNaN(Perdida)) {
		Perdida = 0
	}
	if (isNaN(Recuperacion)) {
		Recuperacion = 0
	}

	//Actualizando datos
	$('#Margen').text(SalesUp.Variables.MonedaSimbolo(Margen) + ' (' + SalesUp.Variables.roundDos(PctMargen * 100) + '%)');
	$('#NuevoMargen').text(SalesUp.Variables.MonedaSimbolo(NuevoMargen) + ' (' + SalesUp.Variables.roundDos(PctNuevoMargen * 100) + '%)');
	$('#Perdida').text(SalesUp.Variables.roundDos(Perdida * 100));
	$('#Recuperacion').text(Recuperacion);

	//Actualizando data-PctNuevoMargen
	$(IDTR + ' .alertaW').attr('data-PctNuevoMargen', SalesUp.Variables.roundDos(PctNuevoMargen * 100));

	setTimeout(function() {
		SalesUp.Variables.CalculaSubtotal({
			t: $(IDTR + ' .precio')
		}, 2)
	}, 1800);

}

SalesUp.Variables.RegresaFormato = function(Op, tipo) {
	if (tipo == 1) {

		setTimeout(function() {
			var $t = $(Op.t);
			$($t).val(SalesUp.Variables.MonedaSimbolo(SalesUp.Sistema.quitarFormatoNumero($($t).val())));
		}, 200);

	} else {
		var $t = $(Op.t);
		$($t).val(SalesUp.Variables.MonedaSimbolo(SalesUp.Sistema.quitarFormatoNumero($($t).val())));
	}


}

SalesUp.Variables.MuestraWarning = function(Op) {
	var $t = $(Op.t);
	var idProducto = parseInt($($t).attr('data-idProducto'));
	var IDTR = parseInt($($t).attr('data-IDTR'));
	var PrecioLista = parseFloat($($t).attr('data-PrecioLista'));

	var $padre = $t.closest('tr');
	var IDTRINPUT = $($padre).attr('id');
	var $precioU = $($padre).find('.precio');

	var NuevoPrecio = SalesUp.Sistema.quitarFormatoNumero($precioU.val());
	var encontrado = _.where(values, {
		IDTR: IDTR
	});
	var Op = encontrado;
	var Costo = parseFloat(Op[0]['Costo']);

	var Margen = SalesUp.Variables.roundDos(PrecioLista - Costo);
	var PctMargen = SalesUp.Variables.roundDos(Margen / PrecioLista);
	var NuevoMargen = SalesUp.Variables.roundDos(NuevoPrecio - Costo);
	var PctNuevoMargen = SalesUp.Variables.roundDos(NuevoMargen / NuevoPrecio);

	var Perdida = SalesUp.Variables.roundDos(1 - (NuevoMargen / Margen));
	var Recuperacion = SalesUp.Variables.roundDos(Margen / NuevoMargen);


	if (isNaN(Perdida)) {
		Perdida = 0
	}
	if (isNaN(Recuperacion)) {
		Recuperacion = 0
	}

	var arrContenido = {};
		arrContenido.Producto 		= Op[0]['Producto'];
		arrContenido.PrecioLista 	= SalesUp.Variables.roundDos(PrecioLista);
		arrContenido.MonedaSimbolo 	= $('#monedas option:selected').attr('data-unicode');
		arrContenido.Costo 			= Costo;
		arrContenido.Margen 		= Margen;
		arrContenido.PctMargen 		= (PctMargen * 100);
		arrContenido.IDTRINPUT 		= IDTRINPUT;
		arrContenido.IDTR 			= IDTR;
		arrContenido.NuevoPrecio 	= SalesUp.Variables.roundDos(NuevoPrecio);
		arrContenido.NuevoMargen 	= NuevoMargen;
		arrContenido.PctNuevoMargen = (PctNuevoMargen * 100);
		arrContenido.Perdida 		= (Perdida * 100);
		arrContenido.Recuperacion 	= Recuperacion;

	var htmlContenido =  SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TamplateAnalisisPrecios.dbsp',DataType:'html'});

	 var contenido = SalesUp.Construye.ReemplazaDatos({
		Template: htmlContenido,
		Datos: arrContenido
	});

	/*Nuevo*/
	SalesUp.Construye.MuestraAlerta({
		TipoAlerta: 'AlertaPregunta',
		Id: 'AnalisisPrecio',
		Alerta: contenido,
		Boton1: 'Aceptar',
		Boton2: 'Cancelar',
		Icono1: '<i class="fa fa-check"></i>',
		Icono2: '<i class="fa fa-times"></i>',
		Ancho: '650px'
	});


	$('#AnalisisPrecio .Btn-flat-Aceptar').remove();
	$('#AnalisisPrecio .ContenedorModal').css('width', '550px !important');
	$('#AnalisisPrecio .BodyModal').attr('id', 'popup-contenedor');

	SalesUp.Sistema.Tipsy();
	SalesUp.Variables.AgregaFuncionesInputs();
}

SalesUp.Variables.OpcionesExtraProductos = function(obj) {
	$('#tProductos').val(1);
	$('#idlinea').parent().hide();
	$('#idfase').parent().removeClass('w50').addClass('w100');
	$('#comision_monto').attr('onfocus', 'this.blur();').addClass('disabled');
	$('#comision').attr('onfocus', 'this.blur();').addClass('disabled');

	if (SalesUp.Variables.BanderaVenta) {
		Cambia_Monto_Total_Pct();
	}

	if (values.length > 0 && SalesUp.Variables.BanderaBtnProductos) {
		$('#CapturaProdutos').hide();
	} else {
		setTimeout(function() {
			SalesUp.Construye.CierraAlerta({
				Elemento: obj.Elemento
			});
		}, 100);
	}
}/*SalesUp.Variables.OpcionesExtraProductos*/

SalesUp.Variables.ConstruyeJsonCotizador = function(obj) {
	var callbackGuardaOportunidad = (obj.callback) ? obj.callback : null;
	
    var numeroProductos = $('#TablaCotizador .bodyTabla tr').length;

    if (numeroProductos == 0) {
        SalesUp.Construye.MuestraMsj({
            tMsg: 4,
            Msg: 'Necesitas capturar al menos 1 producto.',
            Destino: $('#precio').closest('.BodyModal')
        });
    } else {
        SalesUp.Variables.estaVisibleCotizador = true;


        var aux = ',';
        var aux2 = '|';
        var ltIdProducto = '';
        var ltDescripcion = '';
        var ltCantidad = '';
        var ltPrecio = '';
        var ltNombrePrecio = '';
        var j2 = '';

        //Nuevo modulo
        var ltFecha_ini = '';
        var ltFecha_fin = '';
        var ltNoches = '';

        var ltDescuentos = '';
        var ltDescuentos_Porc = '';
        var ltComentarios = '';

        var subtotal = SalesUp.Variables.subTotal;


        var j = '{"Cotizacion":[';
        j += '{"SUBTOTALG":"' + subtotal + '"},';
        j += '{"DESCUENTO_PCT":"' + porcentajeDescGlobal + '"},';
        j += '{"DESCUENTO":"' + cantidadDescGlobal + '"},';
        j += '{"TOTALG":"' + total + '"},';

        var textoMoneda = $('#monedas option:selected').text();

        var Moneda_Letras = $('#monedas option:selected').attr('data-moneda');

        var letra = Moneda_Letras.substring(Moneda_Letras.length - 1, Moneda_Letras.length);

        if ((letra == 'a') || (letra == 'e') || (letra == 'i') || (letra == 'o') || (letra == 'u'))
            Moneda_Letras = Moneda_Letras + 's';
        else
            Moneda_Letras = Moneda_Letras + 'es';


        var laMoneda = function(monto) {
            var SysMoneda = SalesUp.Sistema.Almacenamiento({
                a: 'SysMoneda'
            });

            if (SysMoneda == '€')
                return SalesUp.Sistema.moneda({
                    moneda: '',
                    numero: monto
                });

            return SalesUp.Variables.MonedaSimbolo(monto);
        }


        //Para pruebas hacer que siempre entre, original: if(cantidadDescGlobal!=0){, puesto asi intencionalmente es para hacer pruebas 
        if (true) {
            j2 = '{"Cotizacion":[';
            j2 += '{"DATO":"Subtotal","VALOR":"' + laMoneda(subtotal) + '","CAMPO":"SUBTOTAL","CANTIDAD":"' + subtotal + '","MONEDA":"' + textoMoneda + '","MONEDA_LETRAS":"' + Moneda_Letras + '"},';
            j2 += '{"DATO":"Descuento_PCT","VALOR":"' + porcentajeDescGlobal + '%","CAMPO":"DESCUENTO_PCT","CANTIDAD":"' + porcentajeDescGlobal + '","MONEDA":"' + textoMoneda + '","MONEDA_LETRAS":"' + Moneda_Letras + '"},';
            j2 += '{"DATO":"Descuento","VALOR":"' + laMoneda(cantidadDescGlobal) + '","CAMPO":"DESCUENTO","CANTIDAD":"' + cantidadDescGlobal + '","MONEDA":"' + textoMoneda + '","MONEDA_LETRAS":"' + Moneda_Letras + '"},';

            for (var i = 0; i < impuestosTotales.length; i++) {
                var nombre = impuestosTotales[i].nombre;
                var valor = SalesUp.Variables.roundDos(parseFloat(impuestosTotales[i].montoImpuestoTotal));

                if (valor > 0) {
                    j2 += '{"DATO":"' + nombre + '","VALOR":"' + laMoneda(valor) + '","CAMPO":"IMPUESTO' + impuestosTotales[i].indice + '","CANTIDAD":"' + valor + '","MONEDA":"' + textoMoneda + '","MONEDA_LETRAS":"' + Moneda_Letras + '"},';
                }
            }

            j2 += '{"DATO":"Total (' + textoMoneda + ')' + '","VALOR":"' + laMoneda(montoFinal) + '","CAMPO":"TOTAL","CANTIDAD":"' + montoFinal + '","MONEDA":"' + textoMoneda + '","MONEDA_LETRAS":"' + Moneda_Letras + '"}]}';
        }
        
        var numeroProductos = 0;

        $('#TablaCotizador .bodyTabla tr').each(function() {

            numeroProductos++;
            var IDPRODUCTO = $(this).find(".precio").attr('data-idProducto');
            var CODIGO = $(this).find("td").eq(1).text();
            var ARTICULO = $(this).find("td").eq(2).text();
            var UNIDAD = $(this).find("td").eq(3).text();
            var CANTIDAD = $(this).find(".cantidad").val();

            //Nuevo Modulo
            ltFecha_ini += (($('#fecha_ini' + (numeroProductos - 1)).val()) ? $('#fecha_ini' + (numeroProductos - 1)).val() : '1900') + aux;
            ltFecha_fin += (($('#fecha_fin' + (numeroProductos - 1)).val()) ? $('#fecha_fin' + (numeroProductos - 1)).val() : '1900') + aux;
            ltNoches += (($(this).find(".Noche").text()) ? $(this).find(".Noche").text() : '0') + aux;

            ltDescuentos += $(this).attr('data-desc') + aux;
            ltDescuentos_Porc += parseFloat(($(this).attr('data-porc')) / 100) + aux;
            ltComentarios += (($(this).attr('data-observaciones'))!='' ? $(this).attr('data-observaciones') : '' ) + aux2;

            SalesUp.Sistema.quitarFormatoNumero($(this).find(".precio"));

            var PRECIO = $(this).find(".precio").val();
            	PRECIO = SalesUp.Sistema.quitarFormatoNumero(PRECIO);
            
            var SUBTOTAL = $(this).find(".subtotal").text();
            var NOMBREPRECIO = $(this).find(".precio").attr('data-NombrePrecio');

            ltIdProducto += IDPRODUCTO + aux;
            ltDescripcion += ARTICULO + aux;
            ltCantidad += CANTIDAD + aux;
            ltPrecio += PRECIO + aux;
            ltNombrePrecio += NOMBREPRECIO + aux;
            j += '{"CODIGO":"' + CODIGO + '","ARTICULO":"' + ARTICULO + '","UNIDAD":"' + UNIDAD + '","CANTIDAD":"' + CANTIDAD + '","PRECIO":"' + PRECIO + '","SUBTOTAL":"' + SUBTOTAL + '"}' + aux;
        });

        //j                 = j.substring(0, j.length-1);
        ltIdProducto = ltIdProducto.substring(0, ltIdProducto.length - 1);
        ltDescripcion = ltDescripcion.substring(0, ltDescripcion.length - 1);
        ltCantidad = ltCantidad.substring(0, ltCantidad.length - 1);
        ltPrecio = ltPrecio.substring(0, ltPrecio.length - 1);
        ltNombrePrecio = ltNombrePrecio.substring(0, ltNombrePrecio.length - 1);
        ltComentarios = ltComentarios.substring(0, ltComentarios.length - 1);

        //Obtiene cadenas para split de impuestos

        var ltIndices = '';
        var ltImpuesto = '';
        var ltComision = '';
        var ltMontoSubtotal = '';
        var ltMontoDescuento = '';
        var ltMontoTotal = '';

        for (var i = 0; i < (SalesUp.Variables.impuestosProductos).length; i++) {
            for (var jj = 0; jj < (SalesUp.Variables.impuestosProductos[i].Impuestos).length; jj++) {
                var indice = SalesUp.Variables.impuestosProductos[i].Impuestos[jj].indice;
                var montoImpuesto = SalesUp.Variables.impuestosProductos[i].Impuestos[jj].montoImpuesto;

                if (jj == 0) {
                    var comision = SalesUp.Variables.impuestosProductos[i].Impuestos[jj].comisionProducto;
                    var montoSubtotalC = SalesUp.Variables.impuestosProductos[i].Impuestos[jj].montoSubtotal;
                    var montoDescuentoC = SalesUp.Variables.impuestosProductos[i].Impuestos[jj].montoDescuento;
                    var montoTotalC = SalesUp.Variables.impuestosProductos[i].Impuestos[jj].montoTotal;

                    if (isNaN(comision)) {
                        comision = 0;
                    }
                    if (isNaN(montoSubtotalC)) {
                        montoSubtotalC = 0;
                    }
                    if (isNaN(montoDescuentoC)) {
                        montoDescuentoC = 0;
                    }
                    if (isNaN(montoTotalC)) {
                        montoTotalC = 0;
                    }

                    ltComision += comision + ',';
                    ltMontoSubtotal += montoSubtotalC + ',';
                    ltMontoDescuento += montoDescuentoC + ',';
                    ltMontoTotal += montoTotalC + ',';
                }

                if (i == 0) {
                    ltIndices += indice + ',';
                }

                if (isNaN(montoImpuesto)) {
                    montoImpuesto = 0;
                }

                ltImpuesto += montoImpuesto + ',';
            }

            ltImpuesto += '|';
        }

        $('#ltMontoSubtotal').val(ltMontoSubtotal);
        $('#ltMontoDescuento').val(ltMontoDescuento);
        $('#ltMontoTotal').val(ltMontoTotal);
        $('#ltComision').val(ltComision);
        $('#ltIndices').val(ltIndices);
        $('#ltImpuesto').val(ltImpuesto);
        $('#indiceComision').val(SalesUp.Variables.indiceComision);


        j += '{"ltIdProducto":"' + ltIdProducto + '"},';
        j += '{"ltDescripcion":"' + ltDescripcion + '"},';
        j += '{"ltCantidad":"' + ltCantidad + '"},';
        j += '{"ltPrecio":"' + ltPrecio + '"}';
        j += ']}';

        $('#ltIdProducto').val(ltIdProducto);
        $('#ltDescripcion').val(ltDescripcion);
        $('#ltCantidad').val(ltCantidad);
        $('#ltPrecio').val(ltPrecio);
        $('#ltNombrePrecio').val(ltNombrePrecio);
        $('#DESCUENTO').val(cantidadDescGlobal);
        $('#DESCUENTO_PCT').val(porcentajeDescGlobal);
        $('#SUBTOTAL').val(subtotal);
        $('#jsonCotizador').val(j);
        $('#JSON_SUBTOTALES').val(j2);
        $('#DocumentoCotizacion').val($('#PlantillaSeleccionada').val());
        $('#TOTAL').val(montoFinal);

        //Nuevo Modulo
        $('#ltFecha_ini').val(ltFecha_ini);
        $('#ltFecha_fin').val(ltFecha_fin);
        $('#ltNoches').val(ltNoches);

        $('#ltDescuentos').val(ltDescuentos);
        $('#ltDescuentos_Porc').val(ltDescuentos_Porc);
        $('#ltComentarios').val(ltComentarios);

        $('#monto').val(SalesUp.Sistema.formatoNumero(montoFinal));

        var milinea = 0;
        if (values.length > 0) {
            milinea = values[0].IdLinea;
        } else {
            milinea = $('#idlinea option:first').val();
        }

        $('#idlinea').val(milinea);


        $('#idlinea').addClass('Tip4').attr('tip', 'La comision esta definido por la cotización.');
        $('#idlinea').attr('readonly', true);

        var idMonedaempresa = $('#monedas').val();
        var tipoCambioFinal = $('#monedas option:selected').attr('data-tipoCambio');

        $('#idempresamoneda').val(idMonedaempresa);
        $('#tipocambio').val(tipoCambioFinal);
        $('#monedas').attr('disabled', 'disabled');
        $('#monto').attr('disabled', 'disabled');
        $('#idlinea').closest('.BoxInfo').hide();
        $('#idfase').closest('.BoxInfo').removeClass('w50').addClass('w100');

        SalesUp.Sistema.Tipsy();


        if (!isNaN(BanderaEditar) || !isNaN(SalesUp.Variables.BanderaEditarSeguimiento)) {
			
			var formData = new FormData();
			formData.append('IDOPORTUNIDAD',IdOportunidad);
			formData.append('ltIdProducto',ltIdProducto);
			formData.append('ltDescripcion',ltDescripcion);
			formData.append('ltCantidad',ltCantidad);
			formData.append('ltPrecio',ltPrecio);
			formData.append('ltNombrePrecio',ltNombrePrecio);
			formData.append('ltIndices',ltIndices);
			formData.append('ltImpuesto',ltImpuesto);
			formData.append('ltComision',ltComision);
			formData.append('ltMontoSubtotal',ltMontoSubtotal);
			formData.append('ltMontoDescuento',ltMontoDescuento);
			formData.append('ltMontoTotal',ltMontoTotal);
			formData.append('indiceComision',SalesUp.Variables.indiceComision);
			formData.append('DESCUENTO',cantidadDescGlobal);
			formData.append('DESCUENTO_PCT',porcentajeDescGlobal);
			formData.append('SUBTOTAL',subtotal);
			formData.append('TOTAL',montoFinal);
			formData.append('DECOTIZACION',2);
			formData.append('TPRODUCTOS',1);	
			formData.append('IMPUESTOSMONTO',SalesUp.Variables.roundDos(sumaImpuestosTotales));
			formData.append('JSON_SUBTOTALES',j2);
			formData.append('idempresamoneda',SalesUp.Variables.IdEmpresaMoneda);
			formData.append('tipocambio',SalesUp.Variables.valorMonedaActualCotizador);
			formData.append('ltFecha_ini',ltFecha_ini);
			formData.append('ltFecha_fin',ltFecha_fin);
			formData.append('ltNoches',ltNoches);
			formData.append('ltDescuentos',ltDescuentos);
			formData.append('ltDescuentos_Porc',ltDescuentos_Porc);
			formData.append('ltComentarios',ltComentarios);
        	var cierraA = function(){
				if(SalesUp.Variables.idDocumento){
					$('IdDocumento').val(SalesUp.Variables.idDocumento);
					if(isNaN(SalesUp.Variables.BanderaEditarSeguimiento)){
						$('#CapturaProdutos').remove();
					}else{
						$('#CrearNuevoArchivo').val(1);
						if (callbackGuardaOportunidad){callbackGuardaOportunidad();}
					}
				}else{
					$('#CapturaProdutos').remove();
					if (callbackGuardaOportunidad){callbackGuardaOportunidad();}
				}
	        }

			SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonGuardaEdicionCotizador.dbsp', parametros:formData, callback:cierraA, metodo:'POST', formData:true});
        } else {
            SalesUp.Variables.ActivaFuncionesAdicionales();
            $('#SUBTOTAL').val(subtotal);
        }

        j = SalesUp.Sistema.StrReplace('\n',' ',j);
        j = JSON.parse(j);

        $('#numeroProductos').hide();
        $('#ProductoAgregado').html(numeroProductos).show();
        if (numeroProductos == 0) {
            $('#ProductoAgregado').hide();
        }
        SalesUp.Variables.OpcionesExtraProductos(obj);

    }

    
}/*SalesUp.Variables.ConstruyeJsonCotizador*/




SalesUp.Variables.CreaDescuento = function() {

	cantidadDescGlobalPrevio = SalesUp.Sistema.quitarFormatoNumero(cantidadDescGlobal);
	porcentajeDescGlobalPrevio = SalesUp.Sistema.quitarFormatoNumero(porcentajeDescGlobal);

	var Html = '	<div style="margin-top:5px; text-align: left" class="w100 TitDiv">';
		Html += '    <i class=""></i>';
		Html += '    Aplicar descuento general';
		Html += ' 	</div>';
		Html += '  	<div class="clear"></div><form id="descuentoForm">';
		Html += '  	<div class="w100">';
		Html += '	  	<div class="w100">' + '			<div class="BoxInfo w50">';
		Html += '				<label tip="Descripcíon del descuento" class="BoxSizing InfoLabel Tip4">Descuento</label>';
		Html += '				<input type="text" class="BoxSizing InfoData InfoObligatorio" id="cantidadDesc" name="cantidadDesc" onKeyUp="SalesUp.Variables.CalculaDescuentoInformacion(1,1);" onChange="SalesUp.Variables.CalculaDescuentoInformacionValores(1,1);"  onblur="SalesUp.Variables.RegresaFormato({t:this});">';
		Html += '	  		</div>';
		Html += '	 		<div class="BoxInfo w50">';
		Html += '				<label tip="Porcentaje del descuento" class="BoxSizing  InfoLabel Tip4">Porcentaje</label>';
		Html += '				<input type="text" class="InfoData BoxSizing InfoObligatorio" id="porcentajeDesc" name="porcentajeDesc" onKeyUp="SalesUp.Variables.CalculaDescuentoInformacion(2,1);" onChange="SalesUp.Variables.CalculaDescuentoInformacionValores(2,1);"> <span class="pimpuesto">%</span>';
		Html += '	  		</div>';
		Html += '	  	</div>';
		Html += '		<div class="clear"></div>';
		Html += '			<span class="DescuentoCotizador BoxSizing" style="font-style: italic !important; font-weight:normal !important"  id="textoDesc">Con este descuento está cediendo el <span id="margenDesc" style="font-weight: bold;">0%</span> de su margen posible en esta operacion</span>';
		Html += '	</div></form>';

	SalesUp.Construye.MuestraAlerta({
		TipoAlerta: 'AlertaPregunta',
		Id: 'PopDescuento',
		Alerta: Html,
		Boton1: 'Aceptar',
		Boton2: 'Cancelar',
		Callback1: 'SalesUp.Variables.AceptaDescuento',
		Icono1: '<i class="fa fa-check"></i>',
		Icono2: '<i class="fa fa-times"></i>',
		Ancho: '500px'
	});

	$('#cantidadDesc').val(SalesUp.Variables.MonedaSimbolo(cantidadDescGlobal));
	$('#porcentajeDesc').val(porcentajeDescGlobal);
	$('#margenDesc').text(MensajeGlobal);
	$('#porcentajeDesc').attr('onKeyPress', 'return SalesUp.Valida.valDecimales({e:event, t:this, v:value, DestinoMsj:$(\'#PopDescuento #popup-contenedor\')})');
	$('#cantidadDesc').attr('onKeyPress', 'return SalesUp.Valida.valDecimales({e:event, t:this, v:value, DestinoMsj:$(\'#PopDescuento #popup-contenedor\')})');
	$('#PopDescuento .Btn-flat-Aceptar').attr('onclick', 'SalesUp.Variables.AceptaDescuento({t:this})');
	$('#PopDescuento .BodyModal').attr('id', 'popup-contenedor');
}


SalesUp.Variables.ReestableceDescuento = function() {
	cantidadDescGlobal = cantidadDescGlobalPrevio;
	porcentajeDescGlobal = porcentajeDescGlobalPrevio;

	SalesUp.Variables.CalculaDescuento(2, 2);
}

SalesUp.Variables.AceptaDescuento = function(Op) {
	var $c = $('#descuentoForm');

	if (SalesUp.Valida.ValidaObligatorios({
			DentroDe: $c,
			DestinoMsj: $('#PopDescuento .BounceOpenInDown')
		})) {
		SalesUp.Variables.CalculaDescuento(1,1);
		SalesUp.Construye.CierraAlerta({
			Elemento: Op.t
		})
	}
}


SalesUp.Variables.CalculaDescuento = function(tipo,origen) {
	//oRIGEN 1: INPUTS DE POPOVER(CONSREUIDOS AL VUELO) 2: METODO INVOCADO
	var porcentajeDesc;
	var cantidadDesc;
	/*var tipo = 1;
	var origen = 1;*/

	if (origen == 1) {
		porcentajeDesc = SalesUp.Sistema.quitarFormatoNumero($('#porcentajeDesc').val());
		cantidadDesc = SalesUp.Sistema.quitarFormatoNumero($('#cantidadDesc').val());

		if (isNaN(porcentajeDesc)) {
			tipo = 2;
			porcentajeDesc = porcentajeDescGlobal;
		}
	} else {
		porcentajeDesc = SalesUp.Sistema.quitarFormatoNumero(porcentajeDescGlobal);
		cantidadDesc = SalesUp.Sistema.quitarFormatoNumero(cantidadDescGlobal);
	}

	var MargenTotal = 0;
	var Mensaje = '0%';

	$('.bodyTabla tr').each(function() {
		var Cantidad = parseFloat($(this).find('.cantidad').val());
		var Margen = parseFloat($(this).find('.alertaW').attr('data-Margen'));
		MargenTotal += (Cantidad * Margen);
	});

	if (MargenTotal == 0) {
		MargenTotal = total;
	}
	if (tipo == 1) {
		if (!isNaN(cantidadDesc)) {
			porcentajeDesc = (((1 / total) * cantidadDesc) * 100);
			porcentajeDesc = SalesUp.Variables.roundDos(porcentajeDesc);
			cantidadDescGlobal = cantidadDesc;
			porcentajeDescGlobal = porcentajeDesc;
			Mensaje = '' + SalesUp.Variables.roundDos(((1 / MargenTotal) * cantidadDesc) * 100) + '%';
			MensajeGlobal = Mensaje;

			$('#porcentajeDesc').val(SalesUp.Sistema.formatoNumero(porcentajeDesc));
		} else {
			cantidadDescGlobal = 0;
			porcentajeDescGlobal = 0;
			Mensaje = '0%';
			MensajeGlobal = Mensaje;

			$('#porcentajeDesc').val(0);
		}
	} else {
		if (!isNaN(porcentajeDesc)) {
			cantidadDesc = SalesUp.Variables.roundDos((total * (porcentajeDesc / 100)));
			cantidadDescGlobal = cantidadDesc;
			porcentajeDescGlobal = porcentajeDesc;

			$('#cantidadDesc').val(SalesUp.Variables.MonedaSimbolo(cantidadDesc));

			Mensaje = '' + SalesUp.Variables.roundDos(((1 / MargenTotal) * cantidadDesc) * 100) + '%';
			MensajeGlobal = Mensaje;
		} else {
			cantidadDescGlobal = 0;
			porcentajeDescGlobal = 0;

			$('#cantidadDesc').val(SalesUp.Variables.MonedaSimbolo(0));

			Mensaje = '0%';
			MensajeGlobal = Mensaje;
		}
	}
	$('#descuentoTexto').text('Descuento (' + idMonedaString + ') (' + SalesUp.Sistema.formatoNumero(porcentajeDescGlobal) + '%):');
	$('#descuentoCantidad').text(SalesUp.Variables.MonedaSimbolo(cantidadDescGlobal));

	if (origen == 1) {
		SalesUp.Variables.CalculaTotales(1);
	}

	$('#margenDesc').html(Mensaje);

}


SalesUp.Variables.CalculaDescuentoInformacion = function(tipo, origen) {
	//oRIGEN 1: INPUTS DE POPOVER(CONSREUIDOS AL VUELO) 2: METODO INVOCADO	
	var porcentajeDesc;
	var cantidadDesc;

	if (origen == 1) {
		porcentajeDesc = SalesUp.Sistema.quitarFormatoNumero($('#porcentajeDesc').val());
		cantidadDesc = SalesUp.Sistema.quitarFormatoNumero($('#cantidadDesc').val());
	} else {
		porcentajeDesc = SalesUp.Sistema.quitarFormatoNumero(porcentajeDescGlobal);
		cantidadDesc = SalesUp.Sistema.quitarFormatoNumero(cantidadDescGlobal);
	}

	var MargenTotal = 0;
	var Mensaje = '0%';

	$('.bodyTabla tr').each(function() {
		var Cantidad = parseFloat($(this).find('.cantidad').val());
		var Margen = parseFloat($(this).find('.alertaW').attr('data-Margen'));
		MargenTotal += (Cantidad * Margen);
	});

	if (MargenTotal == 0) {
		MargenTotal = total;
	}

	if (tipo == 1) {
		if (!isNaN(cantidadDesc)) {
			porcentajeDesc = (((1 / total) * cantidadDesc) * 100);
			porcentajeDesc = SalesUp.Variables.roundDos(porcentajeDesc);
			Mensaje = '' + SalesUp.Sistema.formatoNumero(porcentajeDesc) + '%';

			//		$('#porcentajeDesc').val(porcentajeDesc);
		} else {
			Mensaje = '0%';
			$('#porcentajeDesc').val(0);
		}
	} else {
		if (!isNaN(porcentajeDesc)) {
			cantidadDesc = SalesUp.Variables.roundDos((total * (porcentajeDesc / 100)));

			//		$('#cantidadDesc').val(SalesUp.Variables.MonedaSimbolo(cantidadDesc));

			Mensaje = '' + SalesUp.Sistema.formatoNumero(porcentajeDesc) + '%';
		} else {
			$('#cantidadDesc').val(SalesUp.Variables.MonedaSimbolo(0));
			Mensaje = '0%';
		}
	}
	$('#margenDesc').html(Mensaje);

}
SalesUp.Variables.CalculaDescuentoInformacionValores = function(tipo, origen) {
	//oRIGEN 1: INPUTS DE POPOVER(CONSREUIDOS AL VUELO) 2: METODO INVOCADO	
	var porcentajeDesc;
	var cantidadDesc;

	if (origen == 1) {
		porcentajeDesc = SalesUp.Sistema.quitarFormatoNumero($('#porcentajeDesc').val());
		cantidadDesc = SalesUp.Sistema.quitarFormatoNumero($('#cantidadDesc').val());
	} else {
		porcentajeDesc = SalesUp.Sistema.quitarFormatoNumero(porcentajeDescGlobal);
		cantidadDesc = SalesUp.Sistema.quitarFormatoNumero(cantidadDescGlobal);
	}

	if (tipo == 1) {
		if (!isNaN(cantidadDesc)) {
			porcentajeDesc = (((1 / total) * cantidadDesc) * 100);
			porcentajeDesc = SalesUp.Sistema.formatoNumero(porcentajeDesc);

			$('#porcentajeDesc').val(porcentajeDesc);
		} else {

			$('#porcentajeDesc').val(0);
		}
	} else {
		if (!isNaN(porcentajeDesc)) {
			cantidadDesc = SalesUp.Variables.roundDos((total * (porcentajeDesc / 100)));
			$('#cantidadDesc').val(SalesUp.Variables.MonedaSimbolo(cantidadDesc));
		} else {
			$('#cantidadDesc').val(SalesUp.Variables.MonedaSimbolo(0));

		}
	}

}

SalesUp.Variables.ResetearMonedas = function(){

	var jsonMonedas = SalesUp.Sistema.CargaDatos({
		Link: '/privado/Modelo/jsonMonedasActivas.dbsp',
		DataType: 'json'
	}).jsonDatos;
	var optionHtml = '';
	var defecto = 0;
	var $monedas = $('#monedas');

	for (var i = 0; i < jsonMonedas.length; i++) {
		optionHtml += '<option data-moneda="' + jsonMonedas[i].MONEDA + '" data-unicode="'+jsonMonedas[i].UNICODE+'" data-idmonedaempresa="' + jsonMonedas[i].IDEMPRESAMONEDA + '" data-tipoCambio="' + jsonMonedas[i].TIPODECAMBIO + '" value="' + jsonMonedas[i].IDEMPRESAMONEDA + '">' + jsonMonedas[i].IDMONEDA + '</option>';
		defecto = parseInt(jsonMonedas[i].PORDEFECTO);

		if (jsonMonedas[i]['IDEMPRESAMONEDA'] == SalesUp.Variables.IdEmpresaMoneda) {
			idMonedaString = jsonMonedas[i]['IDMONEDA'];
		}
	}

	SalesUp.Variables.htmlMonedas = optionHtml;
	$monedas.html(optionHtml);
}


SalesUp.Variables.ActivaMonedaEditarProductos = function() {

	SalesUp.Variables.ResetearMonedas();
	$('#monedas').find('option[value="'+SalesUp.Variables.IdEmpresaMoneda+'"]').attr('data-tipocambio',SalesUp.Variables.valorMonedaActualCotizador);
}



SalesUp.Variables.CambiaMonedaTabla = function() {

	SalesUp.Variables.desdeTabla = true;

	desdeTabla = true;
	var $c = $('#formTipoCambioMoneda');

	if (SalesUp.Valida.ValidaObligatorios({
			DentroDe: $c,
			DestinoMsj: $('#PopTipoCambioMoneda .BounceOpenInDown')
		})) {

		var $monedas = $('#monedas');
		var nuevoTipoCambio = $('#modificaCambio').val();
		nuevoTipoCambio = SalesUp.Sistema.quitarFormatoNumero(nuevoTipoCambio);

		var idMonedaEmpresaPrecio = $('#monedaCotizacion option:selected').attr('data-idmonedaempresa');
		var idMonedaEmpresaGlobal = $monedas.find('option:selected').attr('data-idmonedaempresa');
		var $tipoCambioGlobal = $monedas.find('option:selected').attr('data-tipocambio');

		idMonedaString = $('#monedaCotizacion option:selected').text();

		if (idMonedaEmpresaPrecio != idMonedaEmpresaGlobal) {
			SalesUp.Variables.idEmpresaMoneda = $('#monedaCotizacion').val();
			$monedas.val(SalesUp.Variables.idEmpresaMoneda);
			$monedas.find('option:selected').attr('data-tipocambio',nuevoTipoCambio);

			var contador = 0;
			$('#TablaCotizador .bodyTabla tr').each(function() {

				var FECHA_INI = $('#fecha_ini' + contador).val();
				var FECHA_FIN = $('#fecha_fin' + contador).val();
				var NOCHES = $(this).find('.Noche').text()

				var idTr = $(this).attr('data-IDTR');
				var IDPRODUCTO = $(this).find('.precio').attr('data-idProducto');
				var CANTIDAD = $(this).find('.cantidad').val();
				SalesUp.Sistema.quitarFormatoNumero($(this).find('.precio'));

				var PRECIO = SalesUp.Sistema.quitarFormatoNumero($(this).find('.precio').val());
				var NOMBREPRECIO = $(this).find('.precio').attr('data-NombrePrecio');

				//Nuevo modulo

				for (var i = 0; i < values.length; i++) {
					if (values[i].IDTR == idTr) {
						values[i].PRECIO_USUARIO = PRECIO;
						values[i].CANTIDAD = parseInt(CANTIDAD);
						values[i].INDICEPRECIOLISTA = parseInt(NOMBREPRECIO);
						values[i].FECHA_INI = FECHA_INI;
						values[i].FECHA_FIN = FECHA_FIN;
						values[i].NOCHES = parseInt(NOCHES);
						break;
					}
				}
				contador++;
			});

			$('#TablaCotizador .bodyTabla tr').each(function() {
				$(this).remove();
			});

			valuesR = values;
			IDTR = 0;
			values = [];

			for (var i = 0; i < valuesR.length; i++) {
				SalesUp.Variables.productoActual[0] = valuesR[i];
				//porcentajeDescGlobal = parseFloat(SalesUp.Variables.productoActual[0]['DESCUENTO_PCT']);
				var numPrecio = '';
				$('#NombrePrecio').val(parseInt(SalesUp.Variables.productoActual[0]['INDICEPRECIOLISTA']));
				numPrecio = 'Precio' + $('#NombrePrecio').val();
				var precioUsuario = SalesUp.Variables.productoActual[0]['PRECIO_USUARIO'];
				var precioN = SalesUp.Variables.ConversorMoneda(SalesUp.Variables.valorMonedaActualCotizador, nuevoTipoCambio, precioUsuario);
				SalesUp.Variables.productoActual[0]['PRECIO_USUARIO'] = precioN;
				$('#precio').val(SalesUp.Variables.ConversorMoneda(SalesUp.Variables.valorMonedaActualCotizador, nuevoTipoCambio, precioUsuario));

				var precioMin = parseFloat(SalesUp.Variables.productoActual[0].precioMin);
				SalesUp.Variables.productoActual[0].precioMin = SalesUp.Variables.ConversorMoneda(SalesUp.Variables.valorMonedaActualCotizador, nuevoTipoCambio, precioMin);
				var costo = parseFloat(SalesUp.Variables.productoActual[0].Costo);
				SalesUp.Variables.productoActual[0].Costo = SalesUp.Variables.ConversorMoneda(SalesUp.Variables.valorMonedaActualCotizador, nuevoTipoCambio, costo);
				var PrecioLista = parseFloat(SalesUp.Variables.productoActual[0][numPrecio]);
				SalesUp.Variables.productoActual[0][numPrecio] = SalesUp.Variables.ConversorMoneda(SalesUp.Variables.valorMonedaActualCotizador, nuevoTipoCambio, PrecioLista);


				$('#fecha_ini').val(SalesUp.Variables.productoActual[0]['FECHA_INI']);
				$('#fecha_fin').val(SalesUp.Variables.productoActual[0]['FECHA_FIN']);
				calculo_noche = SalesUp.Variables.productoActual[0]['NOCHES'];

				if (isNaN(calculo_noche))
					calculo_noche = 1;
				$('#precio').val(SalesUp.Sistema.formatoNumero(precioN));
				$('#cantidad').val(SalesUp.Variables.productoActual[0]['CANTIDAD']);
				//$('#cantidad').val(SalesUp.Variables.productoActual[0]['CANTIDAD']);

				SalesUp.Variables.AgregarArticulo();


			}

			desdeTabla = false;
			SalesUp.Variables.valorMonedaActualCotizador = nuevoTipoCambio;
			SalesUp.Variables.IdEmpresaMoneda = $('#monedaCotizacion').val();
			valuesR = [];
		}else if($tipoCambioGlobal != nuevoTipoCambio){
			$monedas.find('option:selected').attr('data-tipocambio',nuevoTipoCambio);
		}
		SalesUp.Construye.CierraAlerta({
			Elemento: $('#modificaCambio')
		});
	}

}



SalesUp.Variables.PopCambiaMoneda = function(idMoneda, monedaTip, tipoCambio, idMonedaCotizacion) {
	var Html = ' <div style="margin-top:5px; text-align: left" class="w100 TitDiv">' + '    <i class=""></i>' + '    Cambiar tipo de moneda a cotización' + '</div>' + '		<div class="clear"></div><form id="formTipoCambioMoneda">' + '			<span class="DescuentoCotizador  BoxSizing" style="font-style: italic !important; font-weight:normal !important">Elija la moneda a la cual quiere cambiar la cotización</span>' + '		<div class="BoxInfo w100">' + '			<label class="BoxSizing  InfoLabel Tip4 Pointer" tip="Tipo de cambio">Tipo de cambio</label>' + '			<select id="monedaCotizacion" name="monedaCotizacion" class=" BoxSizing InfoData InfoObligatorio"  onchange="SalesUp.Variables.ActualizaMonedaDesdePop();" ></select>		' + '		</div>' + '		<div class="BoxInfo w100">' + '			<label class="BoxSizing  InfoLabel Tip4 Pointer" tip="Tipo de cambio">Tipo de cambio</label>' + '			<input id="modificaCambio"  value="" class="BoxSizing InfoData InfoObligatorio" type="text" name="modificaCambio">' + '		</div>' + '		<div class="clear"></div>' + '	</form> ' + '</div>';


	SalesUp.Construye.MuestraAlerta({
		TipoAlerta: 'AlertaPregunta',
		Id: 'PopTipoCambioMoneda',
		Alerta: Html,
		Boton1: 'Aceptar',
		Boton2: 'Cancelar',
		Icono1: '<i class="fa fa-check"></i>',
		Icono2: '<i class="fa fa-times"></i>',
		Ancho: '500px'
	});
	var $monedas = $('#monedas');
	var $monedaCot = $('#monedaCotizacion'),$modificaCambio = $('#modificaCambio');
	$monedaCot.html(SalesUp.Variables.htmlMonedas);
	$monedaCot.val(SalesUp.Variables.IdEmpresaMoneda);

	if (SalesUp.Variables.permisoCambiarMoneda) {
		SalesUp.Variables.valorMonedaActualCotizador = $monedas.find('option[value="'+SalesUp.Variables.IdEmpresaMoneda+'"]').attr('data-tipocambio');
		$modificaCambio.val(SalesUp.Sistema.formatoNumero(SalesUp.Variables.valorMonedaActualCotizador));
	} else {
		SalesUp.Variables.valorMonedaActualCotizador = $monedas.find('option[value="'+SalesUp.Variables.IdEmpresaMoneda+'"]').attr('data-tipocambio');
		$modificaCambio.val(SalesUp.Sistema.formatoNumero(SalesUp.Variables.valorMonedaActualCotizador));
	}

	setTimeout(function(){
			if(SalesUp.Variables.valorMonedaActualCotizador==0)
				SalesUp.Variables.valorMonedaActualCotizador = SalesUp.Sistema.quitarFormatoNumero($modificaCambio.find('option:selected').attr('data-tipoCambio'));
			
			$modificaCambio.val(SalesUp.Sistema.formatoNumero(SalesUp.Variables.valorMonedaActualCotizador));
	},200);
		


	$('#PopTipoCambioMoneda .Btn-flat-Aceptar').attr('onclick', 'SalesUp.Variables.CambiaMonedaTabla({t:this})').addClass('Btn-tiny Btn-tiny-min');
	$('#PopTipoCambioMoneda .Btn-flat-Cancelar').addClass('Btn-tiny Btn-tiny-min');
	$('#PopTipoCambioMoneda .BodyModal').attr('id', 'popup-contenedor');
	$('#PopTipoCambioMoneda .ContenedorModal').css('width', '380px');
}

SalesUp.Variables.ActualizaMonedaDesdePop = function() {
	var nuevoTipoCambio = $('#monedaCotizacion option:selected').attr('data-tipoCambio');
	if (SalesUp.Variables.permisoCambiarMoneda) {
		$('#modificaCambio').val(SalesUp.Sistema.formatoNumero(nuevoTipoCambio));
	} else {
		$('#modificaCambio').val(SalesUp.Sistema.formatoNumero(nuevoTipoCambio));
	}

}

SalesUp.Variables.ActivaMonedaOculto = function() {

	var HTMLMoneda = '<div class="BoxInfo w15 NoMostrar"><select  onchange="SalesUp.Variables.CalculaMontoPorMoneda();" class="BoxSizing InfoData InfoObligatorio w100" name="monedas" id="monedas"></select></div>';
	$('#CapturaProdutos').append(HTMLMoneda);
	
	var jsonMonedas = SalesUp.Sistema.CargaDatos({
		Link: '/privado/Modelo/jsonMonedasActivas.dbsp',
		DataType: 'json'
	}).jsonDatos;

	var optionHtml = '';
	var defecto = 0;
	for (var i = 0; i < jsonMonedas.length; i++) {
		optionHtml += '<option data-moneda="' + jsonMonedas[i].MONEDA + '" data-idmonedaempresa="' + jsonMonedas[i].IDEMPRESAMONEDA + '" data-tipoCambio="' + jsonMonedas[i].TIPODECAMBIO + '" value="' + jsonMonedas[i].IDEMPRESAMONEDA + '">' + jsonMonedas[i].IDMONEDA + '</option>';

		defecto = parseInt(jsonMonedas[i].PORDEFECTO);
	}
	$('#monedas').html(optionHtml);
}


SalesUp.Variables.ActivaModuloHotel = function() {

	if (SalesUp.Sistema.EstaActivoModulo({Modulo: 16})) {

		$('#TablaCotizador thead .Hotel').each(function() {
			$(this).removeClass('NoMostrar');
			SalesUp.Variables.hotel = true;
		});

		templateArt = templateArt.replace('TemplateModuloHotel', complementoTemplate);

		$('#divArticulo').removeClass('w100').addClass('w70');
		$('#divLista').removeClass('w45').addClass('w30');
		$('#divPrecio').removeClass('w25').addClass('w20');
		$("#fecha_ini").val(fecha_ini);
		$("#fecha_fin").val(fecha_fin);
	} else {
		templateArt = templateArt.replace('TemplateModuloHotel', '');
	}


	SalesUp.Sistema.ModulosActivos();
}


SalesUp.Variables.DiferenciaEntreFechas = function(Op, fecIni, fecFin, idNoche) {

	var one_day = 1000 * 60 * 60 * 24;
	arrayFechaIni = fecIni.split('/');
	arrayFechaFin = fecFin.split('/');

	var diaI = arrayFechaIni[0]
	var mesI = (arrayFechaIni[1])
	var anoI = (arrayFechaIni[2])

	var diaF = arrayFechaFin[0]
	var mesF = (arrayFechaFin[1])
	var anoF = (arrayFechaFin[2]) //le restamos un a

	var fechaDateIni = new Date(anoI, mesI-1, diaI);
	var fechaDateFin = new Date(anoF, mesF-1, diaF);

	Diff = Math.ceil((fechaDateFin.getTime() - fechaDateIni.getTime()) / (one_day));


	if (idNoche != -1) {

		$('#noche' + idNoche).text(Diff);

		var $t = $(Op.t);
		var $padre = $t.closest('tr');
		var $can = $($padre).find('.cantidad');

		SalesUp.Variables.CalculaSubtotal({
			t: $can
		}, 1);

	} else {
		calculo_noche = Diff;
	}


}

//Nuevo Descuentos y comentarios

SalesUp.Variables.CreaDescuentoPorProducto = function(Op) {
   
	var $t                     = $(SalesUp.Variables.ElOp);
	var $padre                 = $t.closest('tr');
	//var $precioU             = $($padre).find('.precio');

	var id                     = $($padre).attr('id');
	var cantidad_descuento     = SalesUp.Sistema.formatoNumero($($padre).attr('data-desc'));
	var porcentaje_desc        = SalesUp.Sistema.formatoNumero($($padre).attr('data-porc'));
	var observaciones          = $($padre).attr('data-observaciones');

	var NombreProducto         = $($padre).find('.NombreProducto').text();

	cantidadDescGlobalPrevio   = cantidadDescGlobal;
	porcentajeDescGlobalPrevio = porcentajeDescGlobal;

	var Html =	 '<div style="margin-top:5px; text-align: left" class="w100 TitDiv">' ;
		Html +=  '	<i class=""></i> Agregar descuento o comentario';
		Html +=  '</div>';

		Html +=  '<div class="clear"></div>';
		Html +=  '	<form id="descuentoFormProducto">';
		Html +=  '		<input type="hidden" id="tr" name="tr" value="' + id + '" />';
		Html +=  '		<div class="w100 tIzq" style="padding-bottom:5px">';
		Html +=  '			<span class="Ellipsis">' + NombreProducto + '</span>';
		Html +=  '		</div>';

		Html +=  '		<div class="w100">';
		Html +=  '			<div class="BoxInfo w50">';
		Html +=  '				<label tip="Descripcíon del descuento" class="BoxSizing InfoLabel Tip4">Descuento</label>';
		Html +=  '				<input type="text" class="BoxSizing InfoData InfoObligatorio" id="cantidadDescP" name="cantidadDescP" data-IDTR="' + id + '" onKeyUp="SalesUp.Variables.CalculaMargenDescuento({t:this}, 1);">';
		Html +=  '			</div>';

		Html +=  '			<div class="BoxInfo w50">';
		Html +=  '				<label tip="Porcentaje del descuento" class="BoxSizing  InfoLabel Tip4">Porcentaje</label>';
		Html +=  '				<input type="text" class="InfoData BoxSizing InfoObligatorio" id="porcentajeDescP" data-IDTR="' + id + '" onKeyUp="SalesUp.Variables.CalculaMargenDescuento({t:this}, 2);"> <span class="pimpuesto">%</span>';
		Html +=  '	  		</div>';

		Html +=  '		</div>';

		Html +=  '		<div class="clear"></div>';

		Html +=  '		<span class="DescuentoCotizador BoxSizing" style="font-style: italic !important; font-weight:normal !important"  id="textoDesc">Con este descuento está cediendo el <span id="margenDescProducto" style="font-weight: bold;">0%</span> de su margen posible en esta operacion</span>';
		Html +=  '		<div class="BoxInfo w100 BoxInfoTextArea BoxSizing ">';
		Html +=  '			<label tip="Agregue observaciones del producto" class="BoxSizing InfoLabel Tip4" original-title="">Observaciones</label>';
		Html +=  '			<textarea  maxlength="" id="observaciones" name="observaciones" class="TextAreaData BoxSizing">' + observaciones + '</textarea>';
		Html +=  '		</div>';

		Html +=  '	</form>';

    SalesUp.Construye.MuestraAlerta({
        TipoAlerta : 'AlertaPregunta',
        Id         : 'PopDescuentoProducto',
        Alerta     : Html,
        Boton1     : 'Aceptar',
        Boton2     : 'Cancelar',
        Callback1  : 'SalesUp.Variables.AceptaDescuento',
        Icono1     : '<i class="fa fa-check"></i>',
        Icono2     : '<i class="fa fa-times"></i>',
        Ancho      : '500px'
    });
	$('#cantidadDescP').val(SalesUp.Variables.MonedaSimbolo(cantidad_descuento));
	$('#porcentajeDescP').val(porcentaje_desc);
	$('#margenDescP').text(MensajeGlobal);

    setTimeout(function() {
        SalesUp.Variables.CalculaMargenDescuento({
            t: $('#porcentajeDescP')
        }, 2);
    }, 200);

	$('#porcentajeDescP').attr('onKeyPress', 'return SalesUp.Valida.valDecimales({e:event, t:this, v:value, DestinoMsj:$(\'#PopDescuentoProducto #popup-contenedor\')})');
	$('#cantidadDescP').attr('onKeyPress', 'return SalesUp.Valida.valDecimales({e:event, t:this, v:value, DestinoMsj:$(\'#PopDescuentoProducto #popup-contenedor\')})');
	$('#PopDescuentoProducto .Btn-flat-Aceptar').attr('onclick', 'SalesUp.Variables.AceptaDescuentoProducto({t:this})');
	$('#PopDescuentoProducto .BodyModal').attr('id', 'popup-contenedor');


}

SalesUp.Variables.AceptaDescuentoProducto = function(Op) {
	var $c = $('#descuentoFormProducto');

	if (SalesUp.Valida.ValidaObligatorios({
			DentroDe: $c,
			DestinoMsj: $('#PopDescuentoProducto .BounceOpenInDown')
		})) {
		var cantidad_descuento = SalesUp.Sistema.quitarFormatoNumero($('#cantidadDescP').val());
		var porcentaje_desc    = SalesUp.Sistema.quitarFormatoNumero($('#porcentajeDescP').val());
		var observaciones      = $('#observaciones').val();

		var idTr               = $($c).find('input[id=tr]').val();


		$('#' + idTr).attr('data-desc', cantidad_descuento);
		$('#' + idTr).attr('data-porc', porcentaje_desc);
		$('#' + idTr).attr('data-observaciones', observaciones);

		if (observaciones != '')
			$('#' + idTr).find('.Comentario').removeClass('NoMostrar').addClass('Mostrar');
		else
			$('#' + idTr).find('.Comentario').removeClass('Mostrar').addClass('NoMostrar');

		$('#' + idTr).find('.descuento').text(SalesUp.Variables.MonedaSimbolo(cantidad_descuento));

		SalesUp.Variables.CalculaSubtotal({
			t: $('#' + idTr).find('.precio')
		}, 2);
		SalesUp.Construye.CierraAlerta({
			Elemento: Op.t
		})
	}
}

SalesUp.Variables.MuestraComentario = function(Op) {

	var $Elemento     = $(Op.t);
	var $t            = $(Op.t);
	var $padre        = $t.closest('tr');
	var id            = $($padre).attr('id');
	var observaciones = $($padre).attr('data-observaciones');

	$Elemento.popover('destroy');
	$('.popover').remove();
	var PopOverId = 'PopOver' + SalesUp.Construye.IdUnico();
	var TemplatePopover = '<div style="max-width:250px;width:250px;" class="popover" id="' + PopOverId + '" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>';
	var HtmlAgregarSeguimiento = '';

	HtmlAgregarSeguimiento += '<div id="BoxComentar" class="w100">';
	HtmlAgregarSeguimiento += '	<textarea id="TextComentario" class="w100 TextArea" style="border:1px solid #ddd;border-radius:3px;padding:5px;">' + observaciones + '</textarea>';
	HtmlAgregarSeguimiento += ' <div class="clear"></div>';
	HtmlAgregarSeguimiento += '	<span class="Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar btnAccion Right" onclick="SalesUp.Variables.GuardaObservacion({t:this,id:' + id + '});"> <i class="fa fa-check"></i> Aceptar</span>';
	HtmlAgregarSeguimiento += '	<span class="Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Cancelar btnNegativo Right" onclick="$(\'.popover\').remove();">Cancelar</span>';
	HtmlAgregarSeguimiento += '</div><div class="clear"></div>';

	$Elemento.popover({
		template: TemplatePopover,
		placement: 'right',
		html: true,
		container: '#CapturaProdutos',
		title: 'Observaciones',
		content: HtmlAgregarSeguimiento
	});

	$Elemento.popover('show');
	setTimeout(function() {
		$('#TextComentario').focus();
	}, 300);
}


SalesUp.Variables.GuardaObservacion = function(Op) {

	var Comentario = $('#TextComentario').val();
	var $Elemento = $(Op.t);
	var idTr = $(Op.id).attr('id');

	$('#' + idTr).attr('data-observaciones', Comentario);

	if (Comentario != '')
		$('#' + idTr).find('.Comentario').removeClass('NoMostrar').addClass('Mostrar');
	else
		$('#' + idTr).find('.Comentario').removeClass('Mostrar').addClass('NoMostrar');


	setTimeout(function() {
		$('.popover').remove();
	}, 200);


}

SalesUp.Variables.CalculaMargenDescuento = function(Op, tipo) {


	var $t = $(Op.t);
	var IDTR = '#' + $t.attr('data-idtr');
	var $alertaW = $(IDTR + ' .alertaW');
	var precioUsuario = parseFloat($($alertaW).attr('data-preciousuario'));

	var cantidadDesc;
	var porcentajeDesc;


	if (tipo == 1) {
		cantidadDesc = SalesUp.Sistema.quitarFormatoNumero($($t).val());
		if (!isNaN(cantidadDesc)) {
			porcentajeDesc = (((1 / precioUsuario) * cantidadDesc) * 100);
			porcentajeDesc = SalesUp.Sistema.formatoNumero(porcentajeDesc);

			$('#porcentajeDescP').val(porcentajeDesc);
		} else {

			$('#porcentajeDescP').val(0);
		}
	} else {
		porcentajeDesc = SalesUp.Sistema.quitarFormatoNumero($($t).val());
		if (!isNaN(porcentajeDesc)) {
			cantidadDesc = SalesUp.Variables.roundDos((precioUsuario * (porcentajeDesc / 100)));
			$('#cantidadDescP').val(SalesUp.Variables.MonedaSimbolo(cantidadDesc));
		} else {
			$('#cantidadDescP').val(SalesUp.Variables.MonedaSimbolo(0));

		}
	}

	
	var precioUsuario = parseFloat($($alertaW).attr('data-preciousuario'));
	var NuevoPrecio = parseFloat(precioUsuario) - (parseFloat(precioUsuario) - parseFloat($($t).val()));
  
	  if (isNaN(NuevoPrecio)) NuevoPrecio = 0;
	  if (isNaN(NuevoPrecio)) NuevoPrecio = 0;
	
	  if((precioUsuario-NuevoPrecio)<0){
	    SalesUp.Construye.MuestraMsj({
				tMsg: 4,
				Msg: '<b>No se permiten descuentos mayores al precio del producto.<b/>',
				Destino: $t.closest('.BodyModal')
			});
	    
	    $('#PopDescuentoProducto .Btn-flat-Aceptar').removeClass('Mostrar').addClass('NoMostrar');
	  }
	  else{
	    $('#PopDescuentoProducto .Btn-flat-Aceptar').removeClass('NoMostrar').addClass('Mostrar');
	  }
  


	var Costo = parseFloat($($alertaW).attr('data-Costo'));
	var PrecioLista = parseFloat($($alertaW).attr('data-PrecioLista'));

	var Margen = SalesUp.Variables.roundDos(PrecioLista - Costo);
	var PctMargen = SalesUp.Variables.roundDos(Margen / PrecioLista);
	var NuevoMargen = SalesUp.Variables.roundDos(NuevoPrecio - Costo);
	var PctNuevoMargen = SalesUp.Variables.roundDos(NuevoMargen / NuevoPrecio);
	var Perdida = SalesUp.Variables.roundDos(1 - (NuevoMargen / Margen));
	var Recuperacion = SalesUp.Variables.roundDos(Margen / NuevoMargen);

	if (isNaN(Perdida)) {
		Perdida = 0;
	}
	if (isNaN(Recuperacion)) {
		Recuperacion = 0;
	}

	var margenPerdido = ((1 / Margen) * cantidadDesc) * 100;

	if (isNaN(margenPerdido)) {
		margenPerdido = 0;
	}
	//Actualizando datos
	$('#margenDescProducto').text(SalesUp.Variables.roundDos(margenPerdido) + '%');
}


SalesUp.Variables.MonedaSimbolo= function(Numero){
var Unicode;
var monedaSeguimiento = $('#monedas').val();

  	Unicode = $('#monedas option:selected').attr('data-unicode');
    
  if(Unicode == '')
    Unicode = $('#monedas option:first').attr('data-unicode');
  

	if (Unicode != '') {
	 	Simbolo = String.fromCharCode(Unicode);

	 	  if(Unicode == 83)
      		Simbolo += '/.'; 
    
	 	return SalesUp.Sistema.moneda({numero:Numero, moneda:Simbolo});
	}else{
		return SalesUp.Sistema.FormatoMoneda(Numero);
	 }
}

SalesUp.Variables.DragTable=function(){
		
			$('#TablaCotizador').tableDnD({
				dragHandle  : ".sortear",
				onDragClass : "DragRow",
				onDragStart: function(table, row){
					var rows = table.tBodies[0].rows;
					$(rows).each(function(i){
						$(rows[i]).addClass('RowDark');
					});
					$(row).parent().parent().removeClass('RowDark').addClass('DragRow');
				},
				onDrop: function(table, row){
					$('.RowDark').removeClass('RowDark');
					var rows = table.tBodies[0].rows;
					setTimeout(function(){
						SalesUp.Variables.RecalculaImpuestos();
					},1000);
					
					
					//SalesUp.Variables.GuardaOrdenReglas();

				}
			});
}


SalesUp.Variables.NuevoTamanioProductosVisualizar = function(){
	var tContenedor = $('#CapturaProdutos #popup-contenedor').height();
	if (tContenedor == null) {
		tContenedor = $('#CapturaProdutos').height();
	};
	var tGranTotal = $('#granTotal').outerHeight();
	var tBAcciones = $('#CapturaProdutos .BoxBotonesAccion').outerHeight();
 	var tDivArticulo = $('#CapturaProdutos #divArticulo').outerHeight();
 	var tDivPrecio = $('#CapturaProdutos #divPrecio').outerHeight();
 	var nuevoTamanio = tContenedor - tGranTotal - tBAcciones - tDivArticulo - tDivPrecio - 9;
 	$('#TablaCotizador').parent().attr('style','overflow: auto; max-height: '+nuevoTamanio+'px;');
}



