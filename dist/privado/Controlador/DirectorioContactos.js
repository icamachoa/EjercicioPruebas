SalesUp.Variables.pagInicio= (SalesUp.Sistema.paginaActual()) ? SalesUp.Sistema.paginaActual() : 1;
SalesUp.Variables.FiltroLetra = (SalesUp.Sistema.Almacenamiento({a:'DFLetra'}) )? SalesUp.Sistema.Almacenamiento({a:'DFLetra'}) : '';
SalesUp.Variables.FiltroDirectorioClientes = (SalesUp.Sistema.Almacenamiento({a:'DFiltroDir'})) ? SalesUp.Sistema.Almacenamiento({a:'DFiltroDir'}):0;
SalesUp.Variables.OrdenaUsuarios =  ( SalesUp.Sistema.Almacenamiento({a:'DOrden1'}) ) ? SalesUp.Sistema.Almacenamiento({a:'DOrden1'}) : 1;
SalesUp.Variables.OrdenaUsuarios2 = ( SalesUp.Sistema.Almacenamiento({a:'DOrden2'}) ) ? SalesUp.Sistema.Almacenamiento({a:'DOrden2'}) : 0;
SalesUp.Variables.Search = (SalesUp.Sistema.Almacenamiento({a:'DSearch'}) )? SalesUp.Sistema.Almacenamiento({a:'DSearch'}) : '';
SalesUp.Variables.Pais = (SalesUp.Sistema.Almacenamiento({a:'DPais'}) )? SalesUp.Sistema.Almacenamiento({a:'DPais'}) : '';
SalesUp.Variables.Estado = (SalesUp.Sistema.Almacenamiento({a:'DEstado'}) )? SalesUp.Sistema.Almacenamiento({a:'DEstado'}) : '';
SalesUp.Variables.do = SalesUp.Variables.OrdenXtra = (SalesUp.Sistema.Almacenamiento({a:'DOextra'}) )? SalesUp.Sistema.Almacenamiento({a:'DOextra'}) : 0;
SalesUp.Variables.SeCargo = 0;
SalesUp.Variables.cargando = SalesUp.Sistema.unMomento();

SalesUp.Variables.CamposData = function(){
	if ( SalesUp.Variables.FiltroDirectorioClientes == 3) {
		SalesUp.Sistema.CargaDatosAsync({link:'modelo/jsonDirectorioCompanias.dbsp',
			parametros: {orden1: SalesUp.Variables.OrdenaUsuarios ,
				orden2 : SalesUp.Variables.OrdenaUsuarios2,
				mostrar: SalesUp.Variables.FiltroDirectorioClientes ,
				directorio: SalesUp.Variables.FiltroLetra,
				buscar: SalesUp.Variables.Search,
				howmany:50,
				ordenextra: SalesUp.Variables.OrdenXtra,
				estado: SalesUp.Variables.Estado,
				pais: SalesUp.Variables.Pais,
				inicia: SalesUp.Variables.pagInicio},
				DataType:'json',
				callback: CamposData2});
	}else{
		SalesUp.Sistema.CargaDatosAsync({link:'modelo/jsonDirectorio.dbsp',
			parametros: {orden1: SalesUp.Variables.OrdenaUsuarios ,
				orden2 : SalesUp.Variables.OrdenaUsuarios2,
				mostrar: SalesUp.Variables.FiltroDirectorioClientes ,
				directorio: SalesUp.Variables.FiltroLetra,
				buscar: SalesUp.Variables.Search,
				howmany:50,
				ordenextra: SalesUp.Variables.OrdenXtra,
				estado: SalesUp.Variables.Estado,
				pais: SalesUp.Variables.Pais,
				inicia: SalesUp.Variables.pagInicio},
				DataType:'json',
				callback: CamposData1});
	}
	function CamposData1(op){
		jsonOb = op.jsonDatos;
		totalRegistros =op.jCount[0].TOTAL;
		templateHead = '<tr> <td></td><td>Contacto</td><td>Empresa</td><td>Correo</td><td>Teléfono</td><td class="centrado">Ubicación</td><td class="centrado">Eje</td></tr>';
		var template = '<tr data-tk="{{Tkp}}" data-esta-canalizado="{{esCanalizado}}" data-FechaCanalizado="{{FechaCanalizado}}"  data-canalizado="{{Canalizado}}" data-Canalizo="{{Canalizo}}">';
		template +=  '<td class="centrado"><b>{{nFila}}</b></td>';
		template += '<td>';
		template += '{{#if ESCLIENTE}}';
		template += '<a href="clientes-visualizar.dbsp?TKP={{Tkp}}" title=" {{TITULO}} {{NOMBRE}}">{{NOMBRE}} {{APELLIDOS}}</a>';
		template += '{{else}}';
		template += '<a href="prospectos-visualizar.dbsp?TKP={{Tkp}}" title=" {{TITULO}} {{NOMBRE}}">{{NOMBRE}} {{APELLIDOS}}</a>';
		template += '{{/if}}';
		template += '</td>';
		template += '<td>';
		template += '{{#hlp_compare IDCOMPANIA 0 operator=">"}} <a class="NombreEmpresa" href="EmpresasVisualizar.dbsp?tkcom={{TKCOM}}"><i class="fa fa-building-o"></i> {{EMPRESA}} </a> {{else}}';
		template += '{{EMPRESA}}{{/hlp_compare}}';
		template += '</td>';
		template += '<td>{{CorreoProspecto}}</td> ';
		template += '<td><b> {{telefonoContacto}}</b></td> ';
		template += '<td >{{hlp_direccion}}</td> ';
		template += '<td class="centrado">';
		template += '{{compartidoIniciales}}'
		template += '</td>';
		template += '</tr>';
		SalesUp.Construye.ConstruyeTabla(templateHead, template, jsonOb, {Destino:'#DatosLoad', Id:'TablaProspectos', PagActual:PagAct,  NumRegistros:totalRegistros } );
		var parametres  = "&orden1="+SalesUp.Variables.OrdenaUsuarios+
		"&orden2="+ SalesUp.Variables.OrdenaUsuarios2+
		"&mostrar="+ SalesUp.Variables.FiltroDirectorioClientes +
		"&directorio="+ SalesUp.Variables.FiltroLetra+
		"&buscar="+ SalesUp.Variables.Search+
		"&ordenextra="+ SalesUp.Variables.OrdenXtra+
		"&pais="+SalesUp.Variables.Pais+
		"&Estado="+SalesUp.Variables.Estado+
		"&BCP=1"+
		"&ExportacionPantalla="+escape('Directorio en pantalla')+"&ExportacionTotal="+escape('Todo el Directorio')+"&pantalla=8";
		$('#DatosLoad').append('<div id="BtnExportarImportar" class="BoxBotones"></div>');
		var AbreExportar = "SalesUp.Ventana.AbrePopUp({Titulo:'Exportar lista de Directorio', Pagina:'/privado/popup_tipo_exportacion.dbsp', Parametros:'"+parametres+"', CallBack:'ReloadData', Iframe:true, Alto:130, Ancho:280 })";
		if (totalRegistros > 0) {
			SalesUp.Construye.AgregaBoton({DentroDe:'#BtnExportarImportar', btnTamanio:'Btn-tiny Btn-tiny-min', Boton:'Exportar directorio', Titulo:'Exportar información', Onclick:AbreExportar, Icono:'fa-clipboard', Clases:'ExportarInformacion' });
		}
	}
	function CamposData2(op){
		jsonOb = op.jsonDatos;
		totalRegistros =op.jCount[0].TOTALES;
		var templateHead2 = '<tr><td></td><td>Empresa</td><td class="centrado">Teléfono</td><td class="centrado">Corporativo</td><td class="centrado">Industria</td><td class="centrado">Dirección</td><td class="centrado">Eje</td></tr>';
		var template2  =  '<tr ><td class="centrado"><b>{{nFila}}</b></td>';
		template2  += '<td><a class="NombreEmpresa" href="EmpresasVisualizar.dbsp?tkcom={{TKCOM}}"><b><i class="fa fa-building-o"></i> {{EMPRESA}}</b></a></td>';
		template2 += '<td class="centrado"><b>{{telefonoContacto}}</b></td>';
		template2 += '<td class="centrado">{{COMPANIAGRUPO}}</td>';
		template2 += '<td class="centrado">{{INDUSTRIA}}</td>';
		template2 += '<td >{{hlp_direccion 0}}</td>';
		template2 += '<td class="centrado Tip8" tip="{{NOMBRE}} {{APELLIDOS}}">{{INICIALES}}</td></tr>';
		SalesUp.Construye.ConstruyeTabla(templateHead2, template2, jsonOb, {Destino:'#DatosLoad', Id:'LtTablaPersonalizable', Callback:'', PagActual:PagAct,  NumRegistros:totalRegistros } );
		var parametres  = "&orden1="+SalesUp.Variables.OrdenaUsuarios+
		"&orden2="+ SalesUp.Variables.OrdenaUsuarios2+
		"&mostrar="+ SalesUp.Variables.FiltroDirectorioClientes +
		"&directorio="+ SalesUp.Variables.FiltroLetra+
		"&buscar="+ SalesUp.Variables.Search+
		"&ordenextra="+ SalesUp.Variables.OrdenXtra+
		"&pais="+SalesUp.Variables.Pais+
		"&Estado="+SalesUp.Variables.Estado+
		"&BCP=1"+
		"&ExportacionPantalla="+escape('Empresas en pantalla')+"&ExportacionTotal="+escape('Todas las empresas')+"&pantalla=7";
		$('#DatosLoad').append('<div id="BtnExportarImportar" class="BoxBotones"></div>');
		var AbreExportar = "SalesUp.Ventana.AbrePopUp({Titulo:'Exportar lista de Empresas', Pagina:'/privado/popup_tipo_exportacion.dbsp', Parametros:'"+parametres+"', CallBack:'ReloadData', Iframe:true, Alto:130, Ancho:280 })";
		if (totalRegistros > 0) {
			SalesUp.Construye.AgregaBoton({DentroDe:'#BtnExportarImportar', btnTamanio:'Btn-tiny Btn-tiny-min', Boton:'Exportar directorio', Titulo:'Exportar información', Onclick:AbreExportar, Icono:'fa-clipboard', Clases:'ExportarInformacion' });
		}
	}
	SalesUp.Variables.acLocal();
};
//obtener paises
SalesUp.Variables.PaisesGet = function(){
	SalesUp.Sistema.CargaDatosAsync({link:'modelo/jsonPaises.dbsp',
		parametros: "pd="+SalesUp.Variables.Pais,
		DataType:'json',
		callback: listaPaises});
	function listaPaises(Op){
		$('#OrdenaPaises2').html("<option value='0' >Todos</option>");
		SalesUp.Variables.TemplateOpcionPaises = '<option value="{{IdPais}}" {{#if Seleccionado}}selected="selected"{{/if}}>{{Pais}}</option>';
		SalesUp.Construye.ConstruyemeUn({
			Control: 'select', Nuevo: false,
			IdControl: 'OrdenaPaises2',
			Template: SalesUp.Variables.TemplateOpcionPaises,
			Datos: Op.jsonDatos
		});
		$('#OrdenaPaises2').change();
	}
};
//obtener estados
SalesUp.Variables.EdosGet = function(Op){
	var id_pais = SalesUp.Variables.defaultPais;
	if (Op.idPais.length > 0) {
		id_pais = Op.idPais;
	}
	SalesUp.Variables.Estado = (SalesUp.Variables.Estado === "") ? SalesUp.Sistema.Almacenamiento({a:'DEstado'}) :  SalesUp.Variables.Estado;
	$('#OrdenaEstados2').html("<option value='0' >Todos</option>");
	SalesUp.Sistema.CargaDatosAsync({link:'modelo/jsonEstados.dbsp',
		DataType:'json',
		parametros: "pd="+id_pais+"&edo="+SalesUp.Variables.Estado,
		callback: listaEdos});
	function listaEdos(Op){
		SalesUp.Variables.TemplateOpcionEstados = '<option value="{{IdEstado}}" {{#if Seleccionado}}selected="selected"{{/if}}>{{Estado}}</option>';
		SalesUp.Construye.ConstruyemeUn({
			Control: 'select', Nuevo: false,
			IdControl: 'OrdenaEstados2',
			Template: SalesUp.Variables.TemplateOpcionEstados,
			Datos: Op.jsonDatos
		});
		$('#OrdenaEstados2').change();
	}
};
//obtener usuarios
SalesUp.Variables.UsrsGet = function(){
	$('#OrdenXtra').html("<option value='0'>Todos</option>");
	SalesUp.Sistema.CargaDatosAsync({link:'modelo/jsonUsuariosAutorizados.dbsp',
		DataType:'json',
		callback: liUsuarios});
	function liUsuarios(Op){
		SalesUp.Variables.templateUsuarios = '<option value="{{IdUsuario}}" >{{Usuario}} ({{Iniciales}})</option>';
		SalesUp.Construye.ConstruyemeUn({
			Control: 'select', Nuevo: false,
			IdControl: 'OrdenXtra',
			Template: SalesUp.Variables.templateUsuarios,
			Datos: Op.jsonDatos
		});
		if (SalesUp.Variables.OrdenaUsuarios == 9) {
			SalesUp.Variables.changesel("#OrdenXtra",SalesUp.Variables.do);
		}
	}
};
//obtener industrias
SalesUp.Variables.IndustriaGet = function(){
	$('#OrdenXtra').html("<option value='0' >Todos</option>");
	SalesUp.Sistema.CargaDatosAsync({link:'modelo/jsonIndustria.dbsp',
		parametros: "tconsulta=2",
		DataType:'json',
		callback: liIndustria});
	function liIndustria(Op){
		SalesUp.Variables.templateIndustrias = '<option value="{{IdIndustria}}">{{Industria}}</option>';
		SalesUp.Construye.ConstruyemeUn({
			Control: 'select', Nuevo: false,
			IdControl: 'OrdenXtra',
			Template: SalesUp.Variables.templateIndustrias,
			Datos: Op.jsonDatos
		});
		if (SalesUp.Variables.OrdenaUsuarios == 8) {
			SalesUp.Variables.changesel("#OrdenXtra",SalesUp.Variables.do);
		}
	}
};
//Obtener corporativos
SalesUp.Variables.CorpGet = function(){
	$('#OrdenXtra').html("<option value='0'>Todos</option>");
	SalesUp.Sistema.CargaDatosAsync({link:'modelo/jsonGruposEmpresariales.dbsp',
		parametros: "tconsulta=2",
		DataType:'json',
		callback: liCorp});
	function liCorp(Op){
		SalesUp.Variables.templateCorp = '<option value="{{Id}}">{{GrupoEmpresarial}}</option>';
		SalesUp.Construye.ConstruyemeUn({
			Control: 'select', Nuevo: false,
			IdControl: 'OrdenXtra',
			Template: SalesUp.Variables.templateCorp,
			Datos: Op.jsonDatos
		});
		if (SalesUp.Variables.OrdenaUsuarios == 7) {
			SalesUp.Variables.changesel("#OrdenXtra",SalesUp.Variables.do);
		}
	}
};
//variables de almacen
SalesUp.Variables.acLocal = function(){
	SalesUp.Sistema.BorrarItemDeAlmacen('DFLetra');
	SalesUp.Sistema.BorrarItemDeAlmacen('DFiltroDir');
	SalesUp.Sistema.BorrarItemDeAlmacen('DOrden1');
	SalesUp.Sistema.BorrarItemDeAlmacen('DOrden2');
	SalesUp.Sistema.BorrarItemDeAlmacen('DSearch');
	SalesUp.Sistema.BorrarItemDeAlmacen('DPais');
	SalesUp.Sistema.BorrarItemDeAlmacen('DEstado');
	SalesUp.Sistema.paginaActual({pagAct:SalesUp.Variables.pagInicio});
	SalesUp.Sistema.Almacenamiento({a:'DFLetra',v:SalesUp.Variables.FiltroLetra});
	SalesUp.Sistema.Almacenamiento({a:'DFiltroDir',v:SalesUp.Variables.FiltroDirectorioClientes});
	SalesUp.Sistema.Almacenamiento({a:'DOrden1',v:SalesUp.Variables.OrdenaUsuarios});
	SalesUp.Sistema.Almacenamiento({a:'DOrden2',v:SalesUp.Variables.OrdenaUsuarios2});
	SalesUp.Sistema.Almacenamiento({a:'DSearch',v:SalesUp.Variables.Search});
	SalesUp.Sistema.Almacenamiento({a:'DPais',v:SalesUp.Variables.Pais});
	SalesUp.Sistema.Almacenamiento({a:'DEstado', v:SalesUp.Variables.Estado});
	SalesUp.Sistema.Almacenamiento({a:'DOextra', v:SalesUp.Variables.OrdenXtra});
	if (SalesUp.Variables.SeCargo === 0) {
		SalesUp.Variables.seteo();
		SalesUp.Variables.SeCargo = 1;
	}
};
//letra
$(".FiltroLetra").on("click",function(){
	SalesUp.Variables.FiltroLetra = $(this).attr('rel');
	$(".FiltroLetra").removeClass('selcdirectorio');
	$(this).addClass("selcdirectorio");
	$("#do_serch").click();
});
//por que se ordenara?
$("#OrdenaUsuarios").on("change",function(){
	var temporal = $("#OrdenaUsuarios").val();
	if (SalesUp.Variables.OrdenaUsuarios !== $(this).val()) {
		SalesUp.Variables.do = 0;
	}
	SalesUp.Variables.OrdenaUsuarios = $("#OrdenaUsuarios").val();
	if (temporal == 5) {
		$(".viewOnPais, .viewOnEdo").show('400', function() {
			$(this).css('display', 'inline');
		});
		$("#OrdenaUsuarios2").hide();
		$('#OrdenXtra').hide();
		SalesUp.Variables.PaisesGet();
		$('#OrdenaEstados2').html("<option value='0' >Todos</option>");
		SalesUp.Variables.Pais = "";
		SalesUp.Variables.Estado = "";
	}else if (temporal == 6){
		//$(".viewOnEdo").show();
		$(".viewOnEdo").show('400', function() {
			$(this).css('display', 'inline');
			SalesUp.Variables.EdosGet({idPais:""});
		});
		$(".viewOnPais").hide();
		$("#OrdenaUsuarios2").hide();
		$('#OrdenXtra').hide();
		SalesUp.Variables.Pais = "";
		SalesUp.Variables.Estado = "";
	}else if (temporal == 9) {
		SalesUp.Variables.UsrsGet();
		$('#OrdenXtra').show();
		$(".viewOnPais, .viewOnEdo").hide();
		$("#OrdenaUsuarios2").show();
	}else if (temporal == 8) {
		SalesUp.Variables.IndustriaGet();
		$('#OrdenXtra').show();
		$(".viewOnPais, .viewOnEdo").hide();
		$("#OrdenaUsuarios2").show();
	}else if (temporal == 7) {
		SalesUp.Variables.CorpGet();
		$('#OrdenXtra').show();
		$(".viewOnPais, .viewOnEdo").hide();
		$("#OrdenaUsuarios2").show();
	}else{
		$("#OrdenaUsuarios2").show('400', function() {
			$(this).css('display', 'inline');
		});
		$(".viewOnPais, .viewOnEdo").hide();
		$('#OrdenXtra').hide();
		SalesUp.Variables.Pais = "";
		SalesUp.Variables.Estado = "";
	}
});
//acs o desc
$("#OrdenaUsuarios2").on("change",function(){
	SalesUp.Variables.OrdenaUsuarios2 = $("#OrdenaUsuarios2").val();
});
//que se desea buscar
$("#FiltroDirectorioClientes").on("change",function(){
	SalesUp.Variables.FiltroDirectorioClientes = $("#FiltroDirectorioClientes").val();
	if ( SalesUp.Variables.FiltroDirectorioClientes == 3) {
		$("#SearchBox").val("");
		$("#SearchBox").change();
		$(".noEmpresa").hide();
		SalesUp.Variables.EstaEnEmpresa = true;
		$(".verEnEmpresa").show();
		$("#Filtro").click();
		SalesUp.Variables.changesel("#OrdenaUsuarios",3);
		SalesUp.Variables.changesel("OrdenaUsuarios2",0);
		$("#do_serch").click();
	}else{
		if (SalesUp.Variables.EstaEnEmpresa) {
			$("#Filtro").click();
			$("#SearchBox").val("");
			$("#SearchBox").change();
			SalesUp.Variables.changesel("#OrdenaUsuarios",1);
			SalesUp.Variables.changesel("#OrdenaUsuarios2",0);
			$(".noEmpresa").show();
			$(".verEnEmpresa").hide();
			SalesUp.Variables.EstaEnEmpresa = false;
			
		}
		$("#do_serch").click();
	}
});
//campo de busqueda
$("#SearchBox").on("change",function(){
	SalesUp.Variables.Search = $("#SearchBox").val();
});
//Paises
$("#OrdenaPaises2").on('change',  function() {
	$('#OrdenaEstados2').html("<option value='0' >Todos</option>");
	$('#OrdenaEstados2').val(0);
	if($(this).val() !== 0){
		SalesUp.Variables.Pais = $(this).val();
		SalesUp.Variables.EdosGet({idPais: $(this).val()});
	}else{
		SalesUp.Variables.Pais = "";
	}
});
//estados
$("#OrdenaEstados2").on('change',  function() {
	if($(this).val() !== 0){
		SalesUp.Variables.Estado = $(this).val();
	}else{
		SalesUp.Variables.Estado = "";
	}
});
//Orden extra
$("#OrdenXtra").on("click",function(){
	SalesUp.Variables.OrdenXtra = $(this).val();

	if (parseInt($(this).val()) !== 0) {
		SalesUp.Variables.changesel("#OrdenaUsuarios2",0);
		$("#OrdenaUsuarios2").hide();
	}else{
		$("#OrdenaUsuarios2").show();
	}
});
//Realiza la carga de datos
$("#do_serch").on("click",function(){
	SalesUp.Variables.pagInicio = 1;
	SalesUp.Variables.do = SalesUp.Variables.OrdenXtra;
	$('#DatosLoad').html(SalesUp.Variables.cargando);
	SalesUp.Variables.acLocal();
	SalesUp.Variables.CamposData({});
});
//Previene envio del formulario
$("#frm_filtros").on('submit',function(e){
	e.preventDefault();
	$("#do_serch").click();
});
// Cambiar seleccionados
SalesUp.Variables.seteo = function(){
	$(".FiltroLetra[rel='"+SalesUp.Variables.FiltroLetra+"']").addClass('selcdirectorio');
	$("#FiltroDirectorioClientes option[value="+SalesUp.Variables.FiltroDirectorioClientes+"]").attr( "selected",true );
	if ( SalesUp.Variables.FiltroDirectorioClientes == 3) {
		SalesUp.Variables.EstaEnEmpresa = true;
		$(".noEmpresa").hide();
		$(".verEnEmpresa").show();
	}else{
		$(".noEmpresa").show();
		$(".verEnEmpresa").hide();
	}
	setTimeout(function(){
		$("#OrdenaUsuarios option[value="+SalesUp.Variables.OrdenaUsuarios+"]").attr( "selected" ,true);
		$("#OrdenaUsuarios").change();
		SalesUp.Variables.OrdenXtra = SalesUp.Variables.do;
		setTimeout(function(){
			$("#OrdenaUsuarios2 option[value="+SalesUp.Variables.OrdenaUsuarios2+"]").attr( "selected" ,true);
		},1000);
	},1000);
};
$("#SearchBox").val(SalesUp.Variables.Search);
//Ready del documento
$(function(){
	$('#DatosLoad').html(SalesUp.Variables.cargando);
	//console.log(SalesUp.Sistema.paginaActual()/50);

	var estaEnPagina = (SalesUp.Sistema.paginaActual() > 50) ? (SalesUp.Sistema.paginaActual()/50)+1: 1;
	estaEnPagina = parseInt(estaEnPagina);
	estaEnPagina = (!estaEnPagina) ?  1: estaEnPagina;
	PagAct= estaEnPagina;
	ActivaPaginacion('',estaEnPagina);
	/*ReloadData(); */
});
function iraPag(Ir){
	PagAct = Ir;
	var Cond = '';
	SalesUp.Sistema.paginaActual({pagAct:PagAct});
	ActivaPaginacion(Cond,Ir);
}
var ActivaPaginacion=function(Cond,Ir){
	SalesUp.Variables.pagInicio = (parseInt(Ir) * parseInt(RegXPag)) - RegXPag + 1;
	SalesUp.Variables.CamposData({});
};
SalesUp.Variables.changesel = function(selector,valor) {
	$(selector+' option').removeAttr('selected');
	$(selector).val(valor);
	$(selector+" option[value="+valor+"]").attr("selected","true");
	$(selector).click();
	$(selector).change();
};
