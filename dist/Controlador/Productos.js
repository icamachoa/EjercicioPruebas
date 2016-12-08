var Listado_Ids = '';
var contador=0;
var nRegistros=50;
SalesUp.Variables.pagInicio=1;
SalesUp.Variables.Eliminar=false;
SalesUp.Variables.Imagenes=[];
var TotalRegistros;
var Clase='NoMostrar';
function mostrarNuevo(){
  document.location="marcas.dbsp";
}

function mostrarNuevoImpuesto(){
  document.location="catalogoimpuestos.dbsp";
}

function mostrarNuevoProducto(Op){
	 
    SalesUp.Sistema.AbrePopUp({
           Titulo :'Nuevo producto', 
           Pagina :'popup_nuevo_producto.dbsp', 
           Parametros: 'tk=', 
           CallBack: 'SalesUp.Variables.CargaInterfaz', 
           Alto : '290',  
           Ancho :'800'
  });
}
SalesUp.Variables.Respuesta=function(Op, error){
  var respuesta=(Op);
 
} 
SalesUp.Variables.EliminarProducto=function(Op){
	//SalesUp.Variables.idproducto=(Op.id)?Op.id:'';
	SalesUp.Variables.Tk=(Op.tk)?Op.tk:''; 
	SalesUp.Construye.MuestraAlerta({
		TipoAlerta:'AlertaPregunta',
		Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/> ¿Está seguro de eliminar el producto?',
		Boton1:'Aceptar',
		Boton2:'Cancelar',
		Callback1: 'SalesUp.Variables.CbEliminarProducto({ tk:\''+SalesUp.Variables.Tk+'\'})',
		Icono1:'<i class="fa fa-trash"></i>',
		Icono2:'<i class="fa fa-times"></i>',
		Ancho:'300px'
    });
}

SalesUp.Variables.CbEliminarProducto=function(Op){
	//var idproducto=(Op.id)?Op.id:'';
	var tk=(Op.tk) ? Op.tk : '';
	var jsonDatosRelacion=SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonRelacionOportunidadesProductos.dbsp', Parametros:'tk='+tk, DataType:'json'}).jsonDatos;
	var total=jsonDatosRelacion[0].TOTAL;
	Imagenes=jsonDatosRelacion[0].IMAGENES;
	SalesUp.Variables.Eliminar=true;
	if(Imagenes){
		Imagenes=JSON.parse(Imagenes);
		for(var i=0; i<=Imagenes.length-1; i++){
			if(Imagenes[i].valor!=''){
				SalesUp.Variables.Imagenes.push(Imagenes[i].valor);	
			}
		}
	}
	
    if(TotalRegistros<=51){SalesUp.Variables.pagInicio=1;PagAct=1;}
	if(total==0){
		var x=SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonEliminarProductos.dbsp', Parametros:'tipo=1&tkeliminar='+tk, DataType:'html'});
		SalesUp.Variables.CargaInterfaz();
	}else{
		SalesUp.Sistema.AbrePopUp({
          Titulo:'Eliminar producto',
          Pagina:'eliminarProductos.dbsp',
          Parametros:'idproductoeliminar='+SalesUp.Variables.idproducto+'&tipo=2&tk='+tk,
          CallBack:'SalesUp.Variables.CargaInterfaz', 
          Alto:110, Ancho:380
        });
	}
}
SalesUp.Variables.EditarProducto=function(Op){
	    var id=(Op.id)?Op.id:'';
	    var tk=(Op.tk)?Op.tk:''; 

	    SalesUp.Sistema.AbrePopUp({
           Titulo :'Editar producto', 
           Pagina :'popup_nuevo_producto.dbsp', 
           Parametros: 'idProducto='+id+'&tk='+tk, 
           CallBack: 'SalesUp.Variables.CargaInterfaz', 
           Alto :'230', 
           Ancho :'800'
  });
}

SalesUp.Variables.EliminarImagenesAmazon=function(Op){
	var carpeta=SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonObtieneCarpeta.dbsp',  DataType:'json'});
	    carpeta= carpeta.jsonDatos[0].CARPETA;
	for(var i=0; i<=SalesUp.Variables.Imagenes.length-1; i++){
    	var nombreImg=SalesUp.Variables.Imagenes[i];
    	 if(nombreImg!='' || nombreImg!=null){
	    	SalesUp.Sistema.CargaDatosAsync({link:'https://fenix.salesup.com.mx/aws/EliminaArchivo.php', parametros: 'archivo='+nombreImg+'&idempresa='+carpeta, dataType:'html', callback:SalesUp.Variables.Respuesta}); 
    	 }
	}
}

SalesUp.Variables.CambiaFiltro = function(value){
	$('#ContenedorDetalle').html('');
	
	if(value==1){
		$('#ContenedorDetalle').append('<select id="filtrosLineaProducto" class="Select" onchange="SalesUp.Variables.ClickFiltro({tipo:1,valor:value,texto:\'Línea producto: \' + $(\'#filtrosLineaProducto option:selected\').html()});"><option value="">Seleccionar...</option><option value="0">Todos...</option></select>');
		var filtrosLineas = SalesUp.Sistema.CargaDatos({Link:'/privado/modelo/jsonLineasProducto.dbsp',DataType:'json'});
		SalesUp.Variables.CreaOpcionesSelects({datos:filtrosLineas.jsonDatos,$select:$('#filtrosLineaProducto')});
	}else if(value == 2){
		$('#ContenedorDetalle').append('<select id="filtrosMarcas" class="Select" onchange="SalesUp.Variables.ClickFiltro({tipo:2,valor:value,texto:\'Marca: \' + $(\'#filtrosMarcas option:selected\').html()});"><option value="">Seleccionar...</option><option value="0">Todos...</option></select>');
		var filtroMarcas = SalesUp.Sistema.CargaDatos({Link:'/privado/modelo/jsonMarcas.dbsp',DataType:'json'});
		SalesUp.Variables.CreaOpcionesSelects({datos:filtroMarcas.jsonDatos,$select:$('#filtrosMarcas')});
	}else if(value == 3){
		$('#ContenedorDetalle').append(' <input type="text" id="txtBuscarProducto" name="txtBuscarProducto" placeholder="Buscar..." class="Input espacio" onkeyup="SalesUp.Variables.FiltroBuscar(event,value);"/>');
		$('#txtBuscarProducto').focus();
	}
};

SalesUp.Variables.CreaOpcionesSelects = function(_data){
	for (var i = 0; i < _data.datos.length; i++) {
		var arrayDatos = _.pairs(_data.datos[i]);

		_data.$select.append('<option value="'+arrayDatos[0][1]+'">'+arrayDatos[1][1]+'</option>');
	};
}

SalesUp.Variables.LimpiaContenedorDetalle = function(){$('#ContenedorDetalle').html(''); $('#filtro').val(0);};

SalesUp.Variables.ClickFiltro = function(_Opc){
	//idpantalla para guardar filtro de productos = 10
	SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});

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

	var Parametros = 'idpantalla=10&tipo=' + SalesUp.Variables.prmTipos + '&valor=' + escape(SalesUp.Variables.prmTks) + '&texto=' + escape(SalesUp.Variables.prmTextos);

	SalesUp.Sistema.CargaDatos({Link:'Modelo/qryGuardaFiltroCuentas.dbsp', Parametros:Parametros});
	SalesUp.Variables.CargaInterfaz();
}

SalesUp.Variables.CargaFiltrosLabels = function(_Opc){
	var arrayTks = _Opc.tks.split('|');
	var arrayTipos = _Opc.tipo.split('|');
	var arrayTextos = _Opc.texto.split('|');

	if(arrayTextos[0]!=''){
		for (var i = 0; i < arrayTks.length; i++) {
			
			$('#FiltrosActuales').append('<span class="filtro" data-tks="'+arrayTks[i]+'" data-tipo="'+arrayTipos[i]+'" data-texto="'+arrayTextos[i]+'">'+arrayTextos[i]+'</span>');
		};
	}

}

SalesUp.Variables.MuestraBorraFiltros = function(_Array){
	if(_Array.length > 0){// && _Array[0].tipos != ''){	
		$('#eliminarFiltros').show();
	}else{
		$('#eliminarFiltros').hide();
	}
}

SalesUp.Variables.OcultaLoad = function(){
  SalesUp.Sistema.OcultarOverlay();
  SalesUp.Sistema.OcultaEspera();
};

SalesUp.Variables.FiltroBuscar = function(_event,_valor){
	_event.which = _event.which || _event.keyCode;
    
    if(_event.which == 13) {
        SalesUp.Variables.ClickFiltro({tipo:3,valor:_valor,texto:'Texto: ' + _valor});
    }
}

SalesUp.Variables.EliminarFiltros = function(){
	SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});
	SalesUp.Sistema.CargaDatos({Link:'Modelo/qryEliminaFiltrosCuentas.dbsp', Parametros:'idpantalla=10'});
	SalesUp.Variables.CargaInterfaz();
}

SalesUp.Variables.CargaInterfaz = function(){
	if(SalesUp.Variables.Eliminar){
	  SalesUp.Variables.EliminarImagenesAmazon();
	}
	var filtrosPantalla = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonFiltrosCuentas.dbsp', Parametros:'idpantalla=10',DataType:'json'}).jsonDatos;
	if(filtrosPantalla.length > 0){		
		SalesUp.Variables.prmTipos 	= filtrosPantalla[0].tipos;
		SalesUp.Variables.prmTks	= filtrosPantalla[0].tks;
		SalesUp.Variables.prmTextos = filtrosPantalla[0].textos;
	}else{
		SalesUp.Variables.prmTipos 	= '';
		SalesUp.Variables.prmTks	= '';
		SalesUp.Variables.prmTextos = '';
	}

	var parametros = 'tipos=' + SalesUp.Variables.prmTipos + '&tks=' + escape(SalesUp.Variables.prmTks) + '&textos=' + SalesUp.Variables.prmTextos +'&inicia='+SalesUp.Variables.pagInicio+'&howmany='+nRegistros+'&idventana=10';
	var LosFiltros = SalesUp.Sistema.CargaDatos({Link:'/privado/filtrosProductos.dbsp'});
	
	$('#LosFiltros').html(LosFiltros);

	var TemplateDatosCampos = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateProductos.dbsp', Parametros:'thead=1&idventana=10', Div:0});
	var TemplateDatos 		= SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateProductos.dbsp', Parametros:'thead=0&idventana=10', Div:0});
	var Datos				= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonProductos.dbsp',	Parametros:parametros,DataType:'json'}).jsonDatos;
 		Datos=_.reject(Datos, function(j){return _.size(j)==0});
 	for(var i=0; i<Datos.length; i++){
		Datos[i].SrcImagenes = SalesUp.Variables.ImagenesM(Datos[i]);
		Datos[i].Clase= Clase;
	}

	    TotalRegistros      = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonPaginacionProductos.dbsp',	Parametros:parametros,DataType:'json'}).jsonDatos;
	    TotalRegistros      = TotalRegistros[0].TOTALN;

	var Destino = '#DatosLoad', IdTabla="tablaProductos";

	SalesUp.Construye.ConstruyeTabla(TemplateDatosCampos, TemplateDatos, Datos, {Destino:Destino, Id:IdTabla, PagActual:PagAct, NumRegistros:TotalRegistros }); //PagActual //NumRegistros

	if(filtrosPantalla.length > 0){
		SalesUp.Variables.CargaFiltrosLabels({tipo:SalesUp.Variables.prmTipos,tks:SalesUp.Variables.prmTks,texto:SalesUp.Variables.prmTextos});
	}

	SalesUp.Variables.MuestraBorraFiltros(filtrosPantalla);

	SalesUp.Variables.OcultaLoad();


    $(".VerLtOpcionesMultiples").click( function() {
		Listado_Ids = SalesUp.Sistema.RecorreCheckSeleccionados();
		var listaArray = Listado_Ids.split(',');
		contador = _.size(listaArray) - 1;
	});

	$('.laseleccion').click(function(){
		Listado_Ids = SalesUp.Sistema.RecorreCheckSeleccionados();
		var listaArray = Listado_Ids.split(',');
		contador = _.size(listaArray) - 1;
	});
	SalesUp.Variables.OcultarEliminar();
	SalesUp.Variables.MuestraIconoEstadoProducto();
	SalesUp.Variables.Eliminar=false;
	SalesUp.Sistema.IniciaPlugins();
	
	var simbolo = SalesUp.Sistema.Almacenamiento({a:'SysSimboloMonedaDefault'});
	var simboloOtro = $(".FormatoAdd").attr('data-simbolo');

	$('.formatMoney').each(function(){
		$(this).html( SalesUp.Sistema.moneda({'moneda':simbolo,'numero':$(this).html()})).removeClass('formatMoney');
	});
	$('.FormatoAdd').each(function(){
		$(this).html( SalesUp.Sistema.moneda({'moneda':simboloOtro,'numero':$(this).html()})).removeClass('FormatoAdd');
	});
}

SalesUp.Variables.ImagenesM = function (Op){
//Forma imagenes
Op[0]= Op;
			var srcImagenes='';
			var separador='srcImg';

			if(Op[0].IMAGENES){

				var imagenes = JSON.parse(Op[0].IMAGENES);
		
				for(var i =0; i<imagenes.length; i++){
	         		if(imagenes[i]['valor']){
					srcImagenes+=Op[0]['link']+imagenes[i]['valor']+separador;
					}	
				}
			}

		Clase='NoMostrar';

		if(srcImagenes.length>0){
			srcImagenes = srcImagenes.substring(0,srcImagenes.length-6);
			Clase='Mostrar';
		}

		return srcImagenes;
}
SalesUp.Variables.MuestraImagenes = function(Op){
	
	   var $Elemento = $(Op.t);  
    	var links = $Elemento.attr('data-src');
 		links = links.split('srcImg');
 		var inputs='';
 		var labels='';
 		var imagenes='';



 		for(var i=0; i<links.length; i++){
 			inputs +='<input id="button-'+(i+1)+'" type="radio" name="radio-set" class="Pointer sp-selector-'+(i+1)+'" checked="checked" />';
			inputs +='<label for="button-'+(i+1)+'" class="Pointer button-label-'+(i+1)+'"></label>'; 

			imagenes += '<li><img class="ImagenScroll" src="'+links[i]+'"/></li>';
 		}   

	    var contenido= '<div class="container">'			
			+'<div class="sp-slideshow">'
				+inputs
				+'<div class="sp-content">'
					+'<div class="sp-parallax-bg"></div>'
					+'<ul class="sp-slider clearfix">'
						+imagenes
						+'</ul>'
				+'</div>'
				
			+'</div>'
		+'</div>';
		SalesUp.Variables.popOver({Elemento:Op.t, PopOverLugar:'bottom',Titulo: '<b>Productos</b>' ,Contenido:contenido}, 1);								
}

SalesUp.Variables.popOver = function(Op, tipo){
		var Contenido = '', Titulo = '';
		var $Elemento = $(Op.Elemento);
		
		$('.tipsy').remove();
		$('.popover').hide();
		$Elemento.popover('destroy');

		var dirPopOver = 'top', Clases='';
		(Op.PopOverLugar) ? dirPopOver = Op.PopOverLugar : '';
		(Op.Titulo) ? Titulo = Op.Titulo:'';
		(Op.Contenido) ? Contenido = Op.Contenido:'';
		(Op.Clases) ? Clases = Op.Clases:'';
		

		var PopOverId = 'PopOver'+SalesUp.Construye.IdUnico();
		var TemplatePopover = '';
		if(tipo == 1)
			TemplatePopover = '<div class=" tipsy popoverImagen" id="'+PopOverId+'" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>';
		else
			TemplatePopover = '<div class="popoverWarning" id="'+PopOverId+'" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>';

		$Elemento.popover({
			template:TemplatePopover, placement:dirPopOver, html:true, container:'body',
			title:Titulo, content:Contenido
		});

		$Elemento.popover('show');

		var $PopOverId = $('#'+PopOverId);
		var Cerrar = true;

	
		
		$PopOverId.mouseleave(function(){
			Cerrar = true;
			setTimeout(function(){(Cerrar) ? $PopOverId.remove():'';}, 1000);
		}).mouseenter(function(){
			Cerrar = false;
		})

		setTimeout(function(){(Cerrar) ? $PopOverId.remove():'';}, 4000);

		$Elemento.mouseleave(function(){
			Cerrar = true;
		setTimeout(function(){(Cerrar) ? $PopOverId.remove():'';}, 3000);
		}).mouseenter(function(){
			Cerrar = false;
		});
}


SalesUp.Variables.CambiaLineas = function(){
	if(contador > 0) {
		SalesUp.Sistema.AbrePopUp({
			Titulo :'Cambia líneas', 
			Pagina :'popup_cambia_lineas_producto.dbsp', 
			Parametros: 'listap='+Listado_Ids, 
			CallBack: 'SalesUp.Variables.CargaInterfaz', 
			Alto :'100', 
			Ancho :'300'
		});
	}
};
var iraPag=function(Ir){
    PagAct = Ir;
    var Cond = '';
    ActivaPaginacion(Cond,Ir);
}

SalesUp.Variables.CambiaMarcas = function(){
	if(contador > 0) {
		SalesUp.Sistema.AbrePopUp({
			Titulo :'Cambia marcas', 
			Pagina :'popup_cambia_marcas_producto.dbsp', 
			Parametros: 'listap='+Listado_Ids, 
			CallBack: 'SalesUp.Variables.CargaInterfaz', 
			Alto :'100', 
			Ancho :'300'
		});
	}
}
SalesUp.Variables.CambiaStatus = function(){
	if(contador > 0) {
		SalesUp.Sistema.AbrePopUp({
			Titulo :'Cambia estado', 
			Pagina :'popup_cambia_status_productos.dbsp', 
			Parametros: 'listap='+Listado_Ids, 
			CallBack: 'SalesUp.Variables.CargaInterfaz', 
			Alto :'100', 
			Ancho :'300'
		});
	}
}
SalesUp.Variables.CambiaPrecios=function(){
		if(contador > 0) {
		SalesUp.Sistema.AbrePopUp({
			Titulo :'Cambia Precios', 
			Pagina :'popup_cambia_precios.dbsp', 
			Parametros: 'listap='+Listado_Ids, 
			CallBack: 'SalesUp.Variables.CargaInterfaz', 
			Alto :'250', 
			Ancho :'400'
		});
	}

}
SalesUp.Variables.OcultarEliminar=function(){
		if(TotalRegistros==1){
			$('.eliminar').hide();
		}
}
SalesUp.Variables.InactivarProducto=function (Op){

		var tk=(Op.tk)?Op.tk:'';
		//var EstaActivo=(Op.status)? Op.status: ''; 
		var $Elemento=(Op.t) ? $(Op.t) : ''; 
		var EstaActivo=$('.Estatus-'+tk).attr('data-Activo');
		
		var msg=(EstaActivo=='Activo')? 'inactivar' : 'activar';
		var tipo=(EstaActivo=='Activo')?0:1;
		var nombreProducto=$Elemento.attr('data-producto');
				SalesUp.Construye.MuestraAlerta({
		          TipoAlerta:'AlertaPregunta',
		          Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/> ¿Está seguro que desea '+msg+' el producto '+nombreProducto+'?',
		          Boton1:'Aceptar',
		          Boton2:'Cancelar',
		          Callback1: 'SalesUp.Variables.CambiarEstadoProducto({tk:\''+tk+'\', tipo:'+tipo+'})',
		          Icono1:'<i class="fa fa-trash"></i>',
		          Icono2:'<i class="fa fa-times"></i>',
		          Ancho:'300px'
        });
}


SalesUp.Variables.CambiarEstadoProducto=function(Op){

	 var tk=(Op.tk)?Op.tk:'';
	 var status=Op.tipo; 
	 var htmlActivo='<i class="fa fa-check Inactivar Tip2" tip="Activar">';
	 var htmlInactivo='<i class="fa fa-lg fa-times Activar Tip2" tip="Inactivar"></i>';
	 var respuesta=SalesUp.Sistema.CargaDatos({Link:'Modelo/CambiarEstadoProducto.dbsp', Parametros:'tk='+tk+'&status='+status, DataType:'json'}).jsonDatos;
	 var respuesta=respuesta[0].STATUS;
	 if(respuesta=='1'){
	 	$('.Estatus-'+tk).html(htmlInactivo).attr('data-activo', 'Activo');
	 	
	 }else{
	 	$('.Estatus-'+tk).html(htmlActivo).attr('data-activo', 'Inactivo');;
	 }
	 SalesUp.Sistema.IniciaPlugins();
}

SalesUp.Variables.MuestraIconoEstadoProducto=function(){
	var htmlActivo='<i class="fa fa-check Inactivar Tip2" tip="Activar">';
	var htmlInactivo='<i class="fa fa-lg fa-times Activar Tip2" tip="Inactivar"></i> ';
	var Elemento=$('.MovimientosProductos');
	for(var i=0; i<=Elemento.length-1; i++){
		var Estado=$(Elemento[i]).attr('data-activo');
		if(Estado=='Activo'){
			$(Elemento[i]).html(htmlInactivo);
		}else{
			$(Elemento[i]).html(htmlActivo);
		}
	}
	
}

var importarProductos = function(){
	document.location.href = '/privado/importacionProductos.dbsp';
}

function keyDownTextField(e) {
 	if(e.keyCode == 66 && e.ctrlKey == true){
 		$('#filtro').val(3);
		SalesUp.Variables.CambiaFiltro(3);
		$('#filtros').show();
		setTimeout(function(){
			$('#txtBuscarProducto').focus();
		},100);
	}
}

$(function(){
	document.addEventListener("keydown", keyDownTextField, false);
	/*$(document).keypress(function(e){
		console.info(e);
		if(e.keyCode == 98 && e.ctrlKey == true){
			console.info('se muestra cuando precionan ctrl b');
			SalesUp.Variables.CambiaFiltro(3);
			setTimeout(function(){$('#txtBuscarProducto').focus();},100);
		}
	});*/
	
	SalesUp.Variables.CargaInterfaz({});
});

function ReloadData(){
	SalesUp.Variables.pagInicio=Start;
	SalesUp.Variables.CargaInterfaz({});
}


