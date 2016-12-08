var Destino = '#DatosLoad', IdTabla="TablaVentas", IdVentana = 3;
var Datos, TemplateDatos, NombreCampos;
var VentasTheadColumas = 'VentasTheadColumas', VentasTbodyColumas = 'VentasTbodyColumas';


function iraPag(Ir){
	PagAct = Ir;
	var Cond = '';
	SalesUp.Sistema.paginaActual({pagAct:PagAct});
	ActivaPaginacion(Cond,Ir);
}

var Ventas = function(DatosJson){
	if(typeof DatosJson != 'undefined'){
		Totales = SalesUp.Sistema.sumaColumna(DatosJson,[{columna:'Monto',tCambio:'TipoDeCambio'},{columna:'AnticiposComision',tCambio:'TipoDeCambio'},{columna:'PorcentajeComision'},{columna:'AnticiposMonto',tCambio:'TipoDeCambio'},{columna:'SaldoMonto',tCambio:'TipoDeCambio'},{columna:'TiempoTranscurrido'}])
		Totales.TiempoTranscurrido = Totales.TiempoTranscurrido/DatosJson.length;
		Totales.PorcentajeComision = Totales.PorcentajeComision/DatosJson.length;
		// Totales.Comisiones         = Totales.Monto*Totales.PorcentajeComision;
	}

	var arrTotales = {};
		arrTotales.Monto 				= SalesUp.Sistema.FormatoMoneda(Totales.Monto);
		arrTotales.AnticiposMonto 		= SalesUp.Sistema.FormatoMoneda(Totales.AnticiposMonto);
		arrTotales.AnticiposComision 	= SalesUp.Sistema.FormatoMoneda(Totales.AnticiposComision);
		arrTotales.SaldoMonto 			= SalesUp.Sistema.FormatoMoneda(Totales.SaldoMonto);
		arrTotales.PctComision 			= '('+Math.round(Totales.PorcentajeComision * 10000) / 100+'%)';
		arrTotales.TiempoTranscurrido 	= Math.round(Totales.TiempoTranscurrido * 100) / 100+ ' días';

	var HtmlTotales = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateVentaTotales.dbsp',DataType:'html'});

	var HtmlTotales = SalesUp.Construye.ReemplazaDatos({Template:HtmlTotales, Datos:arrTotales});
	
	$('#TablaVentas').after('<table id="TablaTotalesVentas" class="simple">'+HtmlTotales+'</table>');

	$('#DatosLoad').append('<div id="BtnExportarImportar" class="BoxBotones"></div>');

	var AbreExportar = "SalesUp.Ventana.AbrePopUp({Titulo:'Exportar ventas', Pagina:'popup_tipo_exportacion.dbsp', Parametros:'&ExportacionPantalla="+escape('Ventas en pantalla')+"&ExportacionTotal="+escape('Todas las ventas')+"&pantalla="+IdVentana+"', CallBack:'ReloadData', Iframe:true, Alto:130, Ancho:280 })";
	SalesUp.Construye.AgregaBoton({DentroDe:'#BtnExportarImportar', btnTamanio:'Btn-tiny Btn-tiny-min', Boton:'Exportar ventas', Titulo:'Exportar información', Onclick:AbreExportar, Icono:'fa-clipboard', Clases:'ExportarInformacion' });
	SalesUp.Construye.AgregaBoton({DentroDe:'#BtnExportarImportar', btnTamanio:'Btn-tiny Btn-tiny-min', Boton:'Importar ventas', Titulo:'Importa tu información', Onclick:'document.location=\'/privado/importacion_ventas.dbsp\'', Icono:'fa-sign-in' });
	SalesUp.Sistema.OcultaEspera();
	SalesUp.Sistema.CatalogosActivos();


	//SalesUp.Variables.PonerSimbolosVentas();

}/*Ventas*/


var ReloadData = function(){
	nRegistros=0, Datos=undefined;
	
	SalesUp.Sistema.MuestraEspera(Destino,1);
	SalesUp.Sistema.MuestraEspera('#LosFiltros',2);
	
	setTimeout(function(){
		SalesUp.Sistema.CargaDatos({Link:'LosFiltrosVentas.dbsp', Parametros:'&IdVentana='+IdVentana, Div:1, Destino:'#LosFiltros' });
		SalesUp.Sistema.CargaDatos({Link:'/privado/vacio.dbsp', DataType:'json'});
		var monedaActivo = SalesUp.Sistema.Almacenamiento({a:'SysMonedaActivo'});
            
        if(monedaActivo == 1){
            $('#FiltroTipo').append('<option value="19">Moneda</option>');
        }
            
		NombreCampos = SalesUp.Sistema.CargaDatos({Link:'TemplateVentas.dbsp', Parametros:'&thead=1&IdVentana='+IdVentana, Div:0, Almacen: VentasTheadColumas });
		TemplateDatos = SalesUp.Sistema.CargaDatos({Link:'TemplateVentas.dbsp', Parametros:'thead=0&IdVentana='+IdVentana, Div:0, Almacen: VentasTbodyColumas });
		DatosJson = SalesUp.Sistema.CargaDatos({Link:'jsonVentas.dbsp', Parametros:'start='+Start+'&howmany='+RegXPag+'&IdVentana='+IdVentana, DataType:'json', Div:0 });
		SalesUp.Sistema.CargaDatos({Link:'/privado/vacio.dbsp', DataType:'json'});
		if(DatosJson!==undefined){
			Datos = DatosJson.JsonDatos;
			nRegistros = DatosJson.Registros.TotalResgistros;

			if(!Datos[0].IdProspecto){
				SalesUp.Variables.JsonDatos = [];
			}else{
				SalesUp.Variables.JsonDatos = Datos;
			}
		}
		
		SalesUp.Construye.ConstruyeTabla(NombreCampos, TemplateDatos, Datos, {Destino:Destino, Id:IdTabla, PagActual:PagAct, NumRegistros:nRegistros } );
		Ventas(Datos)
		SalesUp.Sistema.OcultaEspera();

	},100); /* setTimeout */
	SalesUp.Variables.PonerSimbolosVentas();

	
}

$(function(){
	var estaEnPagina = SalesUp.Sistema.paginaActual();
	(!estaEnPagina) ? estaEnPagina = 1:'';
	PagAct= estaEnPagina;
	ActivaPaginacion('',estaEnPagina);
});


/*-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+*/

var Listado_Ids = '', contador=0, TotalIdVenta = '', IdVenta="", alerta = "alertlike", descartarventa = "descartarventa";
var Alertas = {
	alertlike : function(){
		$.fallr('show', {
			content:'<p><b>Debe Selecccionar al menos una oportunidad.</b></p>',
			width: '400px', height: '150px', autoclose: 2000,
			icon: 'warning', closeKey : true, position: 'center'
		});
	},   
	descartarventa : function(){
		$.fallr('show', {
			content: '<p>­Nooo...! ¿Desea eliminar esta venta?</p>',
			buttons: {
				button1:{text: 'Si', danger:true, onclick: DescartarVenta},
				button2:{text: 'No'}
			},
			position: 'center', closeKey: true, icon: 'error'
		});
	}
};


function DescartarVenta(){
	$.fallr('hide');
	SalesUp.Sistema.PostData({Link:'ajax/DescartarVenta.dbsp', Parametros:'&idventa='+TotalIdVenta, Funcion:'ReloadData' });
}

function EliminarDescartador(){
	$('.filtro').each(function(){
		var tf = $(this).attr('tf');
		if(tf==23){ $('#descartar_list').parent().remove(); }
	});
}


$("#mostrarOpsMult").live('click',function(){
	Listado_Ids = '';
	contador=0;
	TotalIdVenta='';
	$(".laseleccion").each(function(){
		if ($(this).is(':checked')){
			var lo_selec =$(this).attr('value');
			IdVenta = $(this).attr("id");
			IdVenta = IdVenta.substring(8);
			Listado_Ids = Listado_Ids + ',' + lo_selec;
			TotalIdVenta = TotalIdVenta + ',' + IdVenta;
			contador = contador + 1;
		}
	});
});

$('.descartar').live('click',function(){
	TotalIdVenta=$(this).attr('rel');
	Alertas[descartarventa].apply(this,[this]);
})
   
/* Realiza la accion de DESCARTAR cuando se elije la opcion de DESCARTAR TODOS */
$('#descartar_list').live('click',function(){
	if(contador==0){
		Alertas[alerta].apply(this,[this]);
		$('#opcionesMult').hide('slow');
	}else{  
		TotalIdVenta = TotalIdVenta.substring(1);
		$('#IdSeleccionado').val(TotalIdVenta);
		Alertas[descartarventa].apply(this,[this]);
	}
});


/* Realiza la accion de ETIQUETAR cuando se elije la opcion de ETIQUETAR TODOS */
$('#etiquetar_list').live('click',function(){
	if(contador==0){
		Alertas[alerta].apply(this,[this]);
		$('#opcionesMult').hide('slow');
	}else{  
		Listado_Ids = Listado_Ids.substring(1);
		tb_show('Etiquetar varias oportunidades', 'popup_etiqueta_prospectos_varios.dbsp?propio=1&listap='+Listado_Ids+'&totp='+contador+'&TB_callback=ReloadData&keepThis=false&TB_iframe=true&height=180&width=450');
	}
});

SalesUp.Variables.descartarVenta = function(Op){
	var tkv = Op.tkv;

	var Programar = '';
	Programar += '<form class="w100" id="frmReclamarProspecto">';
	Programar += '  <br><p class="w100">Nooo...! ¿Desea eliminar esta venta?</p>';
	
	Programar += '	<div class="clear"></div></form><div class="clear"></div>';
	
	SalesUp.Construye.MuestraAlerta({
		TipoAlerta:'AlertaPregunta', Ancho:'40%', 
		Id:'alertaEliminarVenta',
		Alerta: '<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2> <br/>Nooo...! ¿Desea eliminar esta venta?<br/>'
	});

	var $PieModal = $('#alertaEliminarVenta .PieModal');
	var  botones = '<span class="btnNegativo Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Cancelar" onclick="SalesUp.Construye.CierraAlerta({Elemento:this});"><i class="fa fa-times"></i> No</span>';
	    botones += '<span class="btnAccion Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" onclick="SalesUp.Variables.activaDescartarVenta({t:this, tkv:\''+tkv+'\'});"><i class="fa fa-trash-o"></i> Si, descartar</span>';
	
	$PieModal.html(botones);

}/*SalesUp.Variables.descartarVenta*/

SalesUp.Variables.activaDescartarVenta = function (Op){
	SalesUp.Sistema.CargaDatos({Link:'/privado/ajax/DescartarVenta.dbsp', Parametros:'tkv='+Op.tkv});
	SalesUp.Construye.CierraAlerta({Elemento:Op.t});
	ReloadData();
	setTimeout(function(){SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-lg fa-frown-o"></i> Venta cancelada.'});}, 500);
}


SalesUp.Variables.PonerSimbolosVentas=function(){
	 setTimeout(function() {
	 	// $('.SumaAnticiposMonto, .SumaAnticiposComision, .SumaSaldoMonto, .SumaMonto').each(function(){
	 		$('.PutSymbol').each(function(){
			var Elemento=this;
			var Numero=$(Elemento).html();
			var Simbolo= $(Elemento).attr('data-simbolo');
			var Unicode= $(Elemento).attr('data-unicode');
	 		if (Unicode != '' && Simbolo != '') {
	 			Simbolo = String.fromCharCode(Unicode);
	 			Monto=SalesUp.Sistema.moneda({numero:Numero, moneda:Simbolo});
		 		$(Elemento).html(Monto);
	 		}else{
	 			Monto = SalesUp.Sistema.FormatoMoneda(Numero);
	 			$(Elemento).html(Monto);
	 		}
	 	});
	 }, 300);

}




