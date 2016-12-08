var control = SalesUp.Sistema.queControl();

SalesUp.Variables.CambiaFiltro = function(value){
	$('#ContenedorDetalle').html('');
	if(value==1){
		$('#ContenedorDetalle').append('<select id="filtrosCluster" class="Select" onchange="SalesUp.Variables.ClickFiltro({tipo:1,valor:value,texto:\'Cluster: \' + $(\'#filtrosCluster option:selected\').html()});"><option value="">Seleccionar...</option></select>');
		var filtrosClusters		= SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/cuentas/get/jsonClustersDisponibles.dbsp', Parametros:'tke='+SalesUp.Variables.Tke,DataType:'json'});
		SalesUp.Variables.CreaOpcionesSelects({datos:filtrosClusters.jsonDatos,$select:$('#filtrosCluster')});
	}else if(value == 2){
		$('#ContenedorDetalle').append('<select id="filtrosEjecutivo" class="Select" onchange="SalesUp.Variables.ClickFiltro({tipo:2,valor:value,texto:\'Ejecutivo: \' + $(\'#filtrosEjecutivo option:selected\').html()});"><option value="">Seleccionar...</option><option value="0">Todos...</option></select>');
		var filtroSupervisor	= SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/cuentas/get/jsonSupervisoresDisponibles.dbsp', Parametros:'tke='+SalesUp.Variables.Tke,DataType:'json'});
		SalesUp.Variables.CreaOpcionesSelects({datos:filtroSupervisor.jsonDatos,$select:$('#filtrosEjecutivo')});
	}else if(value == 3){
		$('#ContenedorDetalle').append('<select id="filtrosFecha" class="Select" onchange="SalesUp.Variables.CambiaRango(value);"></select>');
		$('#filtrosFecha').append('<option value="">(...Filtrar...)</option>');

		var _periodos = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonPeriodos.dbsp',DataType:'json'}).jsonDatos;

		for (var i = 0; i < _periodos.length; i++) {
			var _periodoActual = _periodos[i];

			$('#filtrosFecha').append('<option value="'+_periodoActual.IDPERIODO+'">'+_periodoActual.PERIODO+'</option>');
		};

		$('#filtrosFecha').append('<option value="-1">Rango</option>');
	}else if(value == 4){
		$('#ContenedorDetalle').append('<input type="text" id="txtBuscarCuenta" name="txtBuscarCuenta" placeholder="Buscar..." style="padding:4px !important;" onkeyup="SalesUp.Variables.FiltroBuscar(event,value);"/>');
	}else if(value==5){
		$('#ContenedorDetalle').append('<select id="filtrosOficina" class="Select" onchange="SalesUp.Variables.ClickFiltro({tipo:5,valor:value,texto:\'Oficina: \' + $(\'#filtrosOficina option:selected\').html()});"><option value="">Seleccionar...</option></select>');
		var filtrosOficina		= SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/cuentas/get/jsonOficinasDisponibles.dbsp', Parametros:'tke='+SalesUp.Variables.Tke+'&permisos='+SalesUp.Variables.Permisos,DataType:'json'});
		SalesUp.Variables.CreaOpcionesSelects({datos:filtrosOficina.jsonDatos,$select:$('#filtrosOficina')});
	}
};

SalesUp.Variables.FiltroBuscar = function(_event,_valor){
	_event.which = _event.which || _event.keyCode;
    
    if(_event.which == 13) {
        SalesUp.Variables.ClickFiltro({tipo:4,valor:_valor,texto:'Texto: ' + _valor});
    }
};

SalesUp.Variables.CambiaRango = function(_tipo){
	var fecha 			= new Date();
	var dia 			= 0;
	var mes 			= 0;
	var anio 			= 0;
	var dianombre 		= 0;
	var fechastr_ini 	= '';
	var fechastr_fin 	= '';
	
	randomTime 	= new Date();
	dia 		= fecha.getDate();
	mes 		= fecha.getMonth() + 1;
	anio 		= fecha.getFullYear();
	dianombre 	= fecha.getDay();

	if(_tipo == 1) {/* Mismo dia*/
	    fechastr_ini = fecchasys.today;
		fechastr_fin = fecchasys.today;
	}

	if(_tipo == 2) {/* Ayer */
		fechastr_ini = fecchasys.yesterday;
		fechastr_fin = fecchasys.yesterday;
	}

	if(_tipo == 3) {/* esta semana */
		fechastr_ini = fecchasys.firstdateweek;
		fechastr_fin = fecchasys.today;		
	}

	if(_tipo == 4) {/* semana anterior */
		fechastr_ini = fecchasys.firstdatelastweek;
		fechastr_fin = fecchasys.lastdatelastweek;			
	}

	if(_tipo == 5) {/* este mes */
		fechastr_ini = fecchasys.fitstdate;
		fechastr_fin = fecchasys.lastdate;		
	}

	if(_tipo == 6) {/* mes anterior */
			fechastr_ini = fecchasys.firstdatelastmonth;
			fechastr_fin = fecchasys.lastdatelastmonth;			
	}

	if(_tipo == -1){
		$('#ContenedorDetalle').append('<label for="fecha_desde" style="float:left" >Desde</label><input type="text" name="fecha_desde" id="fecha_desde" value="" class="fecha" readonly/><label for="fecha_hasta" style="float:left" >Hasta</label><input type="text" name="fecha_hasta" id="fecha_hasta" value="" class="fecha" readonly/>');
		SalesUp.Variables.IniciaPickersFechas();
	}

	if(_tipo > 0){
		SalesUp.Variables.ClickFiltro({tipo:3,valor:fechastr_ini+'*'+fechastr_fin,texto:'Rango: ' + fechastr_ini +' - ' + fechastr_fin});
	}
};

SalesUp.Variables.IniciaPickersFechas = function(){
	$( "#fecha_desde" ).datepicker({
        hangeYear: true,dateFormat: SalesUp.Variables.SHORTDATEFORMAT,startDate:'01/01/2000',dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'], dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'], monthNames:  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],  
    	monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      	defaultDate: "+1w",
      	changeMonth: false,
      	numberOfMonths: 1,
      	onClose: function( selectedDate ) {
        	$( "#fecha_hasta" ).datepicker( "option", "minDate", selectedDate );
      	}
    });
    
    $( "#fecha_hasta" ).datepicker({
 		hangeYear: true,dateFormat: SalesUp.Variables.SHORTDATEFORMAT,startDate:'01/01/2000',dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'], dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'], monthNames:  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],  
    	monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      	changeMonth: false,
      	numberOfMonths: 1,
      	onClose: function( selectedDate ) {
        	$( "#fecha_desde" ).datepicker( "option", "maxDate", selectedDate );
      	}
    });

    $('#fecha_hasta').change(function(){
  		var fecha_desde = $( "#fecha_desde" ).val();
  		var fecha_hasta = $( "#fecha_hasta" ).val();
  		SalesUp.Variables.ClickFiltro({tipo:3,valor:fecha_desde+'*'+fecha_hasta,texto:'Rango: ' + fecha_desde +' - ' + fecha_hasta});
    });
};

SalesUp.Variables.MuestraFiltros = function(){
	$('#filtros').show();
};

SalesUp.Variables.OcultaFiltros = function(){
	$('#filtros').hide();
	$('#filtro').val(0);
	$('#ContenedorDetalle').html('');
};

SalesUp.Variables.EliminarFiltros = function(){
	SalesUp.Sistema.MostrarEspera({TipoEspera:'CargandoOscuroTransparente', Mensaje:'Por favor espere...'});

	setTimeout(function(){
		SalesUp.Sistema.CargaDatos({Link:'Modelo/qryEliminaFiltrosCuentas.dbsp', Parametros:'idpantalla=27'});
		SalesUp.Variables.CreaInterfaz();
	}, 100);
};

SalesUp.Variables.QuitarFiltro = function(_this){
	console.log(_this);
};

SalesUp.Variables.MuestraBorraFiltros = function(_Array){	
	if(_Array.length > 0 && _Array[0].tipos != ''){		
		$('.borraFiltros').show();
	}else{
		$('.borraFiltros').hide();
	}
}

SalesUp.Variables.CargaFiltrosLabels = function(_Opc){
	//<span onclick="SalesUp.Variables.QuitarFiltro({Elemento:this, Filtro:2, Aux:'C2931A8C' });" tip="Quitar filtro" class="filtro Pointer Tip1" original-title="">Para: Diego Bañuelos (DB) <i class="fa fa-times-circle"></i></span>

	var arrayTks = _Opc.tks.split('|');
	var arrayTipos = _Opc.tipo.split('|');
	var arrayTextos = _Opc.texto.split('|');

	if(arrayTextos[0]!=''){
		for (var i = 0; i < arrayTks.length; i++) {
			
			$('#FiltrosActuales').append('<span tip="Quitar filtro" class="filtro" data-tks="'+arrayTks[i]+'" data-tipo="'+arrayTipos[i]+'" data-texto="'+arrayTextos[i]+'">'+arrayTextos[i]+'</span>');
		};
	}

};

