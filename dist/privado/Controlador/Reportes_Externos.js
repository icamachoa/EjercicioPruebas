SalesUp.Variables.Configuracion_local=[];
SalesUp.Variables.Sincronizacion_tablas=[];
SalesUp.Variables.configuracion=[];




SalesUp.Variables.IniciaConfiguracion= function(){

	SalesUp.Sistema.CargaDatosAsync({
		link:'/privado/Modelo/jsonObtieneActivaEmpresa_Reportes.dbsp', 
		callback:function(Op, err){
			if (err){
				console.error('No se obtuvo la información.');
				return;
			}

			var jsonActiva = Op.jsonDatos;
			var existe= parseInt(jsonActiva[0].ACTIVA);

			if(existe==0){
				$('#boxActivarConexion').show();
			}else{
				SalesUp.Variables.ActivarIntegracion();
			}
		}
	});

}/*SalesUp.Variables.IniciaConfiguracion*/



SalesUp.Variables.ConstruyeTabsConexion = function() {

	/*var periodos 			= ["Datos de acceso"];
	var Valoresperiodos 	= ["1"];
	var htmlTab			='<div id="Tabs" style="margin-top: -4px; !important"><ul>';
	var htmlDivs			='';

	for (var i=0; i<periodos.length;i++) {
		htmlTab+='<li id="Tab-'+Valoresperiodos[i]+'" data-cargado="0" ><a  href="#divTab-'+Valoresperiodos[i]+'">'+periodos[i]+'</a></li>';
		htmlDivs+='<div id="divTab-'+Valoresperiodos[i]+'"></div>';
	}

	htmlTab+='</ul>'+htmlDivs+'</div><div class="clear"></div>';

	$('#tabsConfiguracion').html(htmlTab);
	$('#tabsConfiguracion #Tabs').tabs();
*/

	SalesUp.Variables.ConstruyeHTML();
}/*SalesUp.Variables.ConstruyeTabsConexion*/

SalesUp.Variables.ConstruyeHTML=function(){

	var TemplateDatosToken = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateReportesExternos.dbsp', Parametros:'thead=1', });
	$('#tabsConfiguracion').html(TemplateDatosToken);

}/*SalesUp.Variables.ConstruyeHTML*/

/*
	tipo 1 desde input
	tipo 2 al cargar configuracion
*/
SalesUp.Variables.Activar= function(Op){


	var $t = $(Op.t);

	var previo = parseInt($t.attr('data-status'));
	$t.attr('data-status',1);
	$t.attr('onclick','SalesUp.Variables.Desactivar({t:this})');
	$t.attr('tip','Desactivar');
	$t.removeClass('fa-square-o').addClass('fa-check-square-o');

	setTimeout(function(){
		var aux = parseInt($t.attr('data-status'));

		if(previo!=aux) 
			SalesUp.Variables.GuardaJSON_Envio_Descarga();

	},200);
}/*SalesUp.Variables.Activar*/

SalesUp.Variables.Desactivar= function(Op){

	var $t = $(Op.t);
	var previo = parseInt($t.attr('data-status'));
	$t.attr('data-status',0);	 
	$t.attr('onclick','SalesUp.Variables.Activar({t:this})');
	$t.attr('tip','Activar');
	$t.removeClass('fa-check-square-o').addClass('fa-square-o');

	setTimeout(function(){	
		var aux = parseInt($t.attr('data-status'));

		if(previo!=aux) 
			SalesUp.Variables.GuardaJSON_Envio_Descarga();

	},200);
}/*SalesUp.Variables.Desactivar*/

var sincronizandoDatos;


SalesUp.Variables.ActivarIntegracion=function(){
	$('#boxActivarConexion').hide();

	SalesUp.Sistema.MuestraEspera('#tabsConfiguracion',1);
	$('#boxEsperando').addClass('preparandoDatos').html('<i class="fa fa-gear fa-spin"></i> <br> <span>Preparando el acceso a los datos...</span>');
	SalesUp.Sistema.CargaDatosAsync({
		link:'/privado/Modelo/jsonActivaEmpresaReportes.dbsp', 
		callback:function(Op,err){
			var jsonActivaEmpresa = Op.jsonDatos[0];
			console.log('ULTIMA_SINCRONIZACION',jsonActivaEmpresa.ULTIMA_SINCRONIZACION);
			if(jsonActivaEmpresa.ULTIMA_SINCRONIZACION){
				clearTimeout(sincronizandoDatos);
				SalesUp.Variables.infoAccesoDatos(jsonActivaEmpresa);
			}else{
				sincronizandoDatos = setTimeout(function(){ SalesUp.Variables.ActivarIntegracion(); }, 30000);
			
			}
		}
	});
}/*SalesUp.Variables.ActivarIntegracion*/


SalesUp.Variables.infoAccesoDatos = function(json){
	var TemplateDatosToken = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateReportesExternos.dbsp', Parametros:'thead=1', Almacen:'TemplateReportesExternos'});
	var tokenValido                         = json.TOKEN;
	var ultimaSincro                        = (json.ULTIMA_SINCRONIZACION) ? SalesUp.Sistema.FormatoFecha(json.ULTIMA_SINCRONIZACION_FINAL) + ' ' + json.hora : 'Nunca';
	var servidor                            = json.SERVIDOR;
	var password                            = json.PASSWORD;

	SalesUp.Variables.Configuracion_local   = '';
	SalesUp.Variables.Sincronizacion_tablas = '';
	SalesUp.Variables.configuracion         = '';
	
	$('#tabsConfiguracion').html(TemplateDatosToken);
	$('#token').text('USER'+tokenValido);
	$('#servidor').text(servidor);
	$('#basedatos').text('REP'+tokenValido);
	$('#password').text(password);
	$('#ultimaSincro').text(ultimaSincro);
	
}/*SalesUp.Variables.infoAccesoDatos*/



SalesUp.Variables.RegenerarToken=function(){
	$('#spanRegenera').addClass('fa-spin');
	SalesUp.Sistema.CargaDatosAsync({
		link:'/privado/Modelo/jsonRegeneraTokenReportesExternos.dbsp', 
		callback:function(Op, err){
			var nuevoToken = Op.jsonDatos;			
			var tokenValido = nuevoToken[0].CLAVE;
			$('#password').html(tokenValido);
			$('#spanRegenera').removeClass('fa-spin');
			SalesUp.Construye.MuestraNotificacion({Mensaje:'<i class="fa fa-check"></i> La contraseña ha sido actualizada'});
		}
	});
}/*SalesUp.Variables.RegenerarToken*/

SalesUp.Variables.OcultaLoad = function(){
	SalesUp.Sistema.OcultarOverlay();
	SalesUp.Sistema.OcultaEspera();
}

SalesUp.Variables.PopDesactivaEmpresa = function(){

	    var Pregunta = '¿Está seguro de desactivar el acceso a datos a los reportes externos?';
        var Funcion = 'SalesUp.Variables.EliminaRegistroIntegracion({t:this})';

        SalesUp.Construye.MuestraAlerta({
          TipoAlerta:'AlertaPregunta', Id:'popDesactiva', 
          Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> '+Pregunta+'',
          Boton1:'Si, Desactivar',
          Boton2:'No',
       	  Callback1:Funcion,
          Icono1:'<i class="fa fa-check"></i>',
          Icono2:'',
          Ancho:'500px'
        });	
      //IniciaConfiguracion
}/*SalesUp.Variables.PopDesactivaEmpresa*/

SalesUp.Variables.EliminaRegistroIntegracion=function(Op){
	SalesUp.Construye.CierraAlerta({Elemento:Op.t});
	SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryeliminaConexionReportes.dbsp', DataType:'json'});
	$('#tabsConfiguracion').html('');
	SalesUp.Variables.IniciaConfiguracion();
}/*SalesUp.Variables.EliminaRegistroIntegracion*/

SalesUp.Variables.PopConfiguracion= function(Op){

	var Html =	' <div style="margin-top:5px; text-align: left" class="w100 TitDiv">'
	+'    <span class="fa fa-angle-right"></span>'
	+'    Configuracion de contraseña'
	+'</div>'
	+'		<div class="clear"></div><form id="formCOnfiguracion">'
	+'			<span class="DescuentoCotizador sFondoMenu BoxSizing" style="font-style: italic !important; font-weight:normal !important">Configura la contraseña para poder tu usuario</span>'
	+'		<div class="BoxInfo w100">'
	+'			<label class="BoxSizing InfoLabel Tip4 Pointer" tip="Clasificación">contraseña</label>'
	+'			<input id="clasificacion"  placeholder="Escribe la contraseña"  class="BoxSizing InfoData InfoObligatorio" type="text">'
	+'		</div>'
	+'		<div class="clear"></div>'
	+'	</form> '  
	+'</div>';


	SalesUp.Construye.MuestraAlerta({
		TipoAlerta:'AlertaPregunta', Id:'PopTipoCambiaConfig', 
		Alerta: Html,
		Boton1:'Aceptar',
		Boton2:'Cancelar',
		Icono1:'<i class="fa fa-check"></i>',
		Icono2:'<i class="fa fa-times"></i>',
		Ancho:'500px'
	});



	$('#PopTipoCambiaConfig .Btn-flat-Aceptar').attr('onclick', 'SalesUp.Variables.GuardaConfigLocal({t:this})').addClass('Btn-tiny Btn-tiny-min');
	$('#clasificacion').attr('onKeyPress', 'return SalesUp.Valida.valDecimales({e:event, t:this, v:value, DestinoMsj:$(\'#PopTipoCambiaConfig #popup-contenedor\')})');
	$('#PopTipoCambiaConfig .Btn-flat-Cancelar').addClass('Btn-tiny Btn-tiny-min');
	$('#PopTipoCambiaConfig .BodyModal').attr('id','popup-contenedor');
	$('#PopTipoCambiaConfig .ContenedorModal').css('width','380px');
	$('#PopTipoCambiaConfig #popup-contenedor').css('height','120px');
}/*SalesUp.Variables.PopConfiguracion*/



SalesUp.Variables.GuardaConfigLocal = function(Op){


	var deDonde = parseInt($('#clasificacion').attr('data-tipo'));

	var $c = $('#formCOnfiguracion');

	if(SalesUp.Valida.ValidaObligatorios({DentroDe:$c, DestinoMsj:$('#PopTipoCambiaConfig .BounceOpenInDown ')})){

		var valorEntero = parseInt($('#clasificacion').val());

		if(deDonde == 1)
			SalesUp.Variables.Configuracion_local.LINEAS = valorEntero;
		else 
			SalesUp.Variables.Configuracion_local.MARCAS = valorEntero;

		var jsonConfig  = JSON.stringify(SalesUp.Variables.Configuracion_local);
		var jsonConfigActualizada = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonActualizaConfigLocal.dbsp',Parametros:'LINEA='+SalesUp.Variables.Configuracion_local.LINEAS+'&MARCA='+SalesUp.Variables.Configuracion_local.MARCAS ,DataType:'json'}).jsonDatos;

		SalesUp.Variables.Configuracion_local = JSON.parse(jsonConfigActualizada[0].CONFIG_LOC+'');


		SalesUp.Construye.CierraAlerta({Elemento:Op.t});
	}
}/*SalesUp.Variables.GuardaConfigLocal */

SalesUp.Variables.ConfigurarEmpresa= function(Op){

	var $t = $(Op.t);
	var titulo	= $t.attr('data-titulo');

	var Html =	' <div style="margin-top:5px; text-align: left" class="w100 TitDiv">'
	+'    <span class="fa fa-angle-right"></span>'
	+'    Configuracion '+titulo
	+'</div>'
	+'		<div class="clear"></div><form id="formCOnfiguracion">'
	+'			<div id="divTabla" class="w100" style="font-size:12px !important"> <div class ="w100" id="head"  style="margin-bottom:15px"></div><div class ="w100" id="cuerpo"></div></div>'
	+'		<div class="clear"></div>'
	+'	</form> '  
	+'</div>';


	SalesUp.Construye.MuestraAlerta({
		TipoAlerta:'AlertaPregunta', Id:'PopTipoCambiaEmpresa', 
		Alerta: Html,
		Boton1:'Aceptar',
		Boton2:'Cancelar',
		Icono1:'<i class="fa fa-check"></i>',
		Icono2:'<i class="fa fa-times"></i>',
		Ancho:'500px'
	});



	var TemplateDatosConfiguracion = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateReportesExternos.dbsp', Parametros:'thead=6' /*, Almacen: 'htmlTemplateConfiguracion'*/});
	var TemplateDatos = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateReportesExternos.dbsp', Parametros:'thead=7'/*, Almacen: 'htmlTemplateTR'*/});

	var camposEmpresa = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonObtieneCamposComercial.dbsp',DataType:'json'}).jsonDatos;

	Datos = JSON.parse('{"jsonDatos1":['+camposEmpresa[0].CAMPOS_P+'], "jsonDatos2":['+camposEmpresa[0].CONFIG +']}');

	console.log(Datos);

	var Destino = '#divTabla', IdTabla='tabla3';



	var html =SalesUp.Construye.ReemplazaDatos({Template:TemplateDatos, Datos: Datos});

	$('#head').html(TemplateDatosConfiguracion);
	$('#cuerpo').html(html);

	$('#PopTipoCambiaEmpresa .Btn-flat-Aceptar').attr('onclick', 'SalesUp.Variables.Guarda_CamposConf({t:this});').addClass('Btn-tiny Btn-tiny-min');
	$('#PopTipoCambiaEmpresa .Btn-flat-Cancelar').addClass('Btn-tiny Btn-tiny-min');  	
	$('#PopTipoCambiaEmpresa .BodyModal').attr('id','popup-contenedor');
	$('#PopTipoCambiaEmpresa .ContenedorModal').css('width','500px');

	var option1 =1;
	var option2 =2;
	var option3 =3;
	var option4 =4;

	var contador = 1;

	for(var i=1; i<11; i++){   
		if(SalesUp.Variables.configuracion[0].Campos['CCAMPO'+i] != ''){

			$('#selectCRM'+contador+' option').each(function(){
				$t = $(this);
				var cadena = $t.text(); 

				cadena = SalesUp.Sistema.StrReplace(' ','_',cadena);
				if(SalesUp.Variables.configuracion[0].Campos['CCAMPO'+i] == cadena){
					console.log(cadena);
					$('#selectCRM'+contador).val(i);

				}
			});	     

			contador++;
		}
	}

	SalesUp.Variables.ValidaSelector({t:$('#selectCRM1')});
}/*SalesUp.Variables.ConfigurarEmpresa*/



SalesUp.Variables.GuardaJSON_Envio_Descarga= function(){
	var i=0;

	$('#tabla2 tbody tr').each(function(){
		var envio = $(this).find('.Envio').attr('data-status');
		var descarga = $(this).find('.Descarga').attr('data-status');

		SalesUp.Variables.Sincronizacion_tablas[i].valueE = envio;

		SalesUp.Variables.Sincronizacion_tablas[i].valueD = descarga;

		i++;	
	});	

	var jsonConfig  = JSON.stringify(SalesUp.Variables.Sincronizacion_tablas);
	jsonConfig = jsonConfig.substring(1, jsonConfig.length-1)
	var json =SalesUp.Sistema.Encript({cadena:jsonConfig,tipo:'encode'});

	var jsonConfigActualizada = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonActualizaSincronizacionTablas.dbsp',Parametros:'json='+json ,DataType:'json'}).jsonDatos;
	SalesUp.Variables.Sincronizacion_tablas = JSON.parse('['+jsonConfigActualizada[0].SINC_TAB+']'); 

	SalesUp.Construye.MuestraMsj({tMsg:2, Msg:'Se ha guardado la configuracion', Destino:$('#contenedor')}); 
}/*SalesUp.Variables.GuardaJSON_Envio_Descarga*/

SalesUp.Variables.Carga_Envio_Descarga = function(){
	var i=0;

	$('#tabla2 tbody tr').each(function(){   
		var envioStatus= parseInt( SalesUp.Variables.Sincronizacion_tablas[i].valueE);
		var descargaStatus= parseInt( SalesUp.Variables.Sincronizacion_tablas[i].valueD)


		if(envioStatus== 10){
			$t=$(this).find('.Envio');
			$t.attr('data-status',10);	 
			$t.css('display','none');
		}else{
			if(envioStatus == 0){ 
				$t=$(this).find('.Envio');
				$t.attr('data-status',0);	 
				$t.attr('onclick','SalesUp.Variables.Activar({t:this})');
				$t.attr('tip','Activar');
				$t.removeClass('fa-check-square-o').addClass('fa-square-o');
			}
		}

		if(descargaStatus== 10){
			$t=$(this).find('.Descarga');
			$t.attr('data-status',10);
			$t.css('display','none');
		}else{
			if(descargaStatus == 0){
				$t=$(this).find('.Descarga');
				$t.attr('data-status',0);	 
				$t.attr('onclick','SalesUp.Variables.Activar({t:this})');
				$t.attr('tip','Activar');
				$t.removeClass('fa-check-square-o').addClass('fa-square-o');
			}
		}
		i++;
	});
}/*SalesUp.Variables.Carga_Envio_Descarga*/

SalesUp.Variables.ValidaSelector2 = function (){

}

SalesUp.Variables.ValidaSelector = function (Op){

	$t = $(Op.t);

	var option1 = $('#selectCRM1').val();
	var option2 = $('#selectCRM2').val();

	var cad = '';

	var longitud = Datos.jsonDatos1.length+1;
	if($t.attr('id') == 'selectCRM1'){


		for(var i=1; i<longitud; i++){
			if(i!=option2){ cad += '<option value="'+i+'">'+Datos.jsonDatos1[i-1].Opcion+'</option>';}
		}
		$('#selectCRM1').html(cad);
		$('#selectCRM1').val(option1);  

		cad='';
		for(var i=1; i<longitud; i++){
			if(i!=option1){cad += '<option value="'+i+'">'+Datos.jsonDatos1[i-1].Opcion+'</option>';}
		}
		$('#selectCRM2').html(cad);
		$('#selectCRM2').val(option2);  
	}

	if($t.attr('id') == 'selectCRM2'){
		for(var i=1; i<longitud; i++){
			if(i!=option1){cad += '<option value="'+i+'">'+Datos.jsonDatos1[i-1].Opcion+'</option>';}
		}
		$('#selectCRM2').html(cad);
		$('#selectCRM2').val(option2);  

		cad='';
		for(var i=1; i<longitud; i++){
			if(i!=option2){cad += '<option value="'+i+'">'+Datos.jsonDatos1[i-1].Opcion+'</option>';}
		}
		$('#selectCRM1').html(cad);
		$('#selectCRM1').val(option1);  
	}

}/*SalesUp.Variables.ValidaSelector*/

SalesUp.Variables.Guarda_CamposConf = function(Op){

	for(var i=1; i<11; i++){
		SalesUp.Variables.configuracion[0].Campos['CCAMPO'+i]='';
	}

	var option1 = $('#selectCRM1').val();
	var option2 = $('#selectCRM2').val();

	SalesUp.Variables.configuracion[0].Campos['CCAMPO'+option1]='RFC';
	SalesUp.Variables.configuracion[0].Campos['CCAMPO'+option2]='CODIGO_CLIENTE';

	var jsonConfig  = JSON.stringify(SalesUp.Variables.configuracion);
	var json =SalesUp.Sistema.Encript({cadena:jsonConfig,tipo:'encode'});
	var jsonConfigActualizada = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryActualizaConfiguracion.dbsp',Parametros:'json='+json ,DataType:'json'});

	SalesUp.Construye.CierraAlerta({Elemento:Op.t});

}/*SalesUp.Variables.Guarda_CamposConf*/
