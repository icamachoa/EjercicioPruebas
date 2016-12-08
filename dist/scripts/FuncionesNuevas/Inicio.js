SalesUp.Variables.TemplateTickerSucesos, SalesUp.Variables.JsonTickerSucesos;
SalesUp.Variables.Ticker = {};
SalesUp.Variables.Ticker.Destino = '#ContieneSucesos .ContTicker';
SalesUp.Variables.StopTickerSucesos = true;

var ReloadDataSucesos = function(){
	SalesUp.Variables.Ticker.Datos = undefined;
	SalesUp.Sistema.MuestraEspera(SalesUp.Variables.Ticker.Destino, 1);
	setTimeout(function(){
		SalesUp.Variables.TemplateTickerSucesos = SalesUp.Sistema.CargaDatos({Link:'TemplateTickerSucesos.dbsp', Parametros:'', Div:0, Almacen: 'HtmlTickerSucesos' });
		SalesUp.Variables.JsonTickerSucesos = SalesUp.Sistema.CargaDatos({Link:'jsonSucesosInicio.dbsp', Parametros:'', DataType:'json', Div:0 });

		SalesUp.Construye.ConstruyemeUn({
			Control: 'ul',
			Template: SalesUp.Variables.TemplateTickerSucesos, 
			Datos: SalesUp.Variables.JsonTickerSucesos.JsonDatosSucesos, 
			Destino: SalesUp.Variables.Ticker.Destino, 
			IdControl: 'TickerSucesos',
			ClasesControl: 'Ticker TickerMuestraSiete BoxTicker ConZebra',
			Callback: '', 
			MsgSinResultados:'Seleccione los sucesos a visualizar en el icono <i class="fa fa-cogs"></i> , o dando clic... <a href="popup_configurar_sucesos.dbsp?TB_callback=ReloadDataSucesos&TB_iframe=true&height=340&width=620" class="thickbox" title="Configuración de los sucesos">aquí</a>.'
		});

		setInterval(ActivaTickers, 5000);

		$('.StopTickerSucesos').mouseenter(function(){ SalesUp.Variables.StopTickerSucesos = false;	});
		$('.StopTickerSucesos').mouseleave(function(){ SalesUp.Variables.StopTickerSucesos = true; });

		SalesUp.Sistema.OcultaEspera();
	},100); /* setTimeout */
} /* /ReloadDataSucesos */



/* -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_ */





var methods = {
	reclamarProspecto : function(){
		$.fallr('show',{
			buttons : { button1 : {text: 'Si', danger:true, onclick: Reclamo}, button2 : {text: 'No'} },
			content : '<p>¿Estás seguro de reclamar el prospecto?</p>',
			position: 'center', closeKey: true, icon: 'error'
		});
	}
};

function Reclamo(){
	$.fallr('hide');
	document.location='reclamar_prospecto.dbsp?idprospecto='+idprospecto;
}

function ActivaBienvenido(){
	(SalesUp.Variables.Bienvenido) ? Bienvenido() : '';
}

var idprospecto='';
var reclamarProspecto='reclamarProspecto';

function ReclamarEsteProspecto(idP){
	SalesUp.Variables.NoIr = 1;
	idprospecto = idP;
	methods[reclamarProspecto].apply(this,[this]);
}

function ActivaTickers(){
	(SalesUp.Variables.StopTickerSucesos)? $('#TickerSucesos li:first').slideUp( function () { $(this).appendTo($('#TickerSucesos')).slideDown(); }):'';
	//$('#TickerPendientes li:first').slideUp( function () { $(this).appendTo($('#TickerPendientes')).slideDown(); });
}



$(function(){
	ActivaBienvenido();
	ReloadDataSucesos();

	GetData2();
   
	$("#ordenar").click(function(){	$("#frmCompra").submit(); });
	setTimeout(function(){
		$('.alertarecordatorio').each(function(){
			$(this).removeClass('zebra');
		});
	},101);

	
}); /* /ready */

