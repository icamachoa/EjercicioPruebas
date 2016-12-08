SalesUp.Variables.MiFondo = '';
SalesUp.Variables.MiFondo += 'body{';
SalesUp.Variables.MiFondo += 'background-image:url("[URL]");';
SalesUp.Variables.MiFondo += 'background-attachment: fixed; background-repeat: no-repeat;';
SalesUp.Variables.MiFondo += 'background-size: cover; -moz-background-size: cover; -webkit-background-size: cover; -o-background-size: cover; -ms-background-size: cover; ';
SalesUp.Variables.MiFondo += '}';
SalesUp.Variables.MiFondo += '#contenedor, #cmbDisponibles, #cmbIncluidos, #cmbObligatorios, table.simple tbody tr, table.simple tfoot tr';
SalesUp.Variables.MiFondo += '{background: none repeat scroll 0 0 rgba(255, 255, 255, 0.5) !important;}';

SalesUp.Variables.ListaTemas = function(){
	var jsonTemas = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonListaTemas.dbsp', DataType:'json'}).jsonDatos;	

	var jsonSolidos = _.reject(jsonTemas, function(j){
		if(!j.Solido){return j;}
	});

	var jsonImagenes = _.reject(jsonTemas, function(j){  
		if(!j.ConImagen){return j;}
	});

	var TemplateTema = '';
	TemplateTema += '<div onclick="SalesUp.Variables.SeleccionarTema({{IdCss}});" class="div_estilo BoxSizing">';
	TemplateTema += '	<div class="BoxSizing clase_normal {{#if Actual}}clase_select{{/if}}" id="caja">';
	TemplateTema += '		<b><a href="#">{{Estilo}}</a></b><br/>';
	TemplateTema += '		<img src="/estilos/ImgFondos/{{Imagen}}"/>';
	TemplateTema += '	</div>';
	TemplateTema += '</div>';

	SalesUp.Construye.ReemplazaTemplate({Destino:'#ListaSolidos', Datos:jsonSolidos, Template:TemplateTema});
	SalesUp.Construye.ReemplazaTemplate({Destino:'#ListaImagenes', Datos:jsonImagenes, Template:TemplateTema});

}/* SalesUp.Variables.ListaTemas */

SalesUp.Variables.SeleccionarTema = function(IdCss){
	SalesUp.Sistema.CargaDatos({Link:'/privado/cambiar-estilo.dbsp', Parametros:'css='+IdCss});
	document.location='MiPantalla.dbsp';
}

SalesUp.Variables.SubeImagen = function(Op){
	var Archivo = Op.Archivo;
	var Tamanio = SalesUp.Valida.ValidaTamanioArchivo({ Archivo:Op.Elemento, Max:10});
	var Extension = SalesUp.Variables.ValidaExtension({Archivo:Archivo});
	if((Tamanio)&&(Extension)){
		var v = Op.Archivo.split('\\');
		$('#FileName').html(v[v.length-1]);

		$('#UpLoadFileAjaxForm').submit();	
	}
}/* SalesUp.Variables.SubeImagen */

SalesUp.Variables.Protocolo = function(){
	return 'https://';
}

SalesUp.Variables.ValidaExtension = function(Op){
	var Pasa = true;
	var Archivo = Op.Archivo.toLowerCase();
	
	if(Archivo){
		var Ext = Archivo.split('.').pop();
		var Extensiones = SalesUp.Variables.ExtensionesPermitidas();
		
		if(Extensiones.indexOf(Ext)<0){
			SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Id:'ArchivosValidos', Msg:'Extensión inválida. Sólo imágenes' });
			Pasa = false;
		}
	}
	return Pasa;
}/*ValidaExtension*/

SalesUp.Variables.ExtensionesPermitidas = function(){
	var ExtPermintidas = [];
	var Imagenes = ['jpg','png','jpeg','gif'];
	ExtPermintidas = _.union(Imagenes);
	SalesUp.Variables.ExtPermintidas = SalesUp.Sistema.StrReplace(',','|',ExtPermintidas.toString());
	return ExtPermintidas;
}/*ExtensionesPermitidas*/

SalesUp.Variables.ActivaSubeImagen = function(){
	if(SalesUp.Variables.CambiarFondo!='1'){
		$('#QuitarImagen, #aQuien, #File, #ImgMedidas').remove();
	}

	$('#File, #aQuien').show();
	if(SalesUp.Variables.SessionMiFondo){ $('#BoxMiImagen, #QuitarImagen').show(); $('#ParaSubirImagen').css('margin-top','0');}
	if(SalesUp.Variables.SessionNivel=='3'){$('#aQuien').hide();}
	if(SalesUp.Variables.SessionNivel=='2'){ $('#aQuien option[value="3"]').remove(); }
	var urlForm = SalesUp.Variables.Protocolo() + 'fenix.salesup.com.mx/aws/guardafondo.php';
	document.UpLoadFileAjaxForm.action= urlForm;
	var OptionesAjaxForm = { 
        beforeSend: function(){
			SalesUp.Sistema.MuestraProgresoArchivo();
        },uploadProgress: function(event, position, total, percentComplete){
        	SalesUp.Sistema.UploadProgresoArchivo(percentComplete);
        },success: function(){},
        complete: function(resp){
        	var mensaje = '';
        	var ok = resp.responseJSON.resultado;
        	if(ok){
        		var Fondo = 'SU-'+SalesUp.Variables.SessionIdUsuario+'.png';
				var UrlImagen = 'https://s3-us-west-2.amazonaws.com/usrlogos/fondos/'+Fondo;
				var rt = '?rt='+SalesUp.Construye.IdUnico();
				$('#MiFondo').html('');
				$('#MiFondo').html(SalesUp.Sistema.StrReplace('[URL]',UrlImagen+rt,SalesUp.Variables.MiFondo));
				$('#BoxMiImagen, #QuitarImagen').show(); 
				$('#ParaSubirImagen').css('margin-top','0');
				$('#ImgMiFondo').attr('src',UrlImagen);
				var aQuien =  $('#aQuien').val();
				SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryAgregarMiImagen.dbsp', Parametros:'Imagen='+escape(UrlImagen)+'&aQuien='+aQuien});
				SalesUp.Sistema.CompletoProgresoArchivo();
				mensaje = 'Fondo agregado '+$('#aQuien option[value="'+aQuien+'"]').html().toLowerCase();
				SalesUp.Construye.MuestraMsj({tMsg:2, Msg:mensaje, Destino:'#ParaSubirImagen'});
        	}else{
        		mensaje = 'Error al subir la imagen, intentarlo nuevamente.';
				SalesUp.Construye.MuestraMsj({tMsg:4, Msg:mensaje, Destino:'#ParaSubirImagen'});
				$("#ProgressBar").width('0%');
				$("#ProgressPercent").html('0%');
				setTimeout(function(){$("#Progress").hide();},300);
        	}
		},error: function(){}
    }
    $("#UpLoadFileAjaxForm").ajaxForm(OptionesAjaxForm);   
}/*SalesUp.Variables.ActivaSubeImagen*/

SalesUp.Variables.aQuien = function(Op){
	var src = $('#ImgMiFondo').attr('src');
	if(!src){return false;}
	var aQuien =  Op.v;
    SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryAgregarMiImagen.dbsp', Parametros:'Imagen=&aQuien='+aQuien});
    var mensaje = 'Fondo agregado '+$('#aQuien option[value="'+aQuien+'"]').html().toLowerCase();
    SalesUp.Construye.MuestraMsj({tMsg:2, Msg:mensaje, Destino:'#ParaSubirImagen'});
}

SalesUp.Variables.QuitarImagen = function(){
	var jsonEliminarImagen = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryQuitarMiImagen.dbsp', DataType:'json'}).jsonDatos;
	
	if(jsonEliminarImagen[0].Tienen==0){
		SalesUp.Sistema.CargaDatos({Link:'https://fenix.salesup.com.mx/aws/eliminaArchivo.php', Parametros:'archivo='+jsonEliminarImagen[0].Fondo+'&idempresa='+SalesUp.Variables.SessionIdEmpresa});
	}
				            
	document.location='MiPantalla.dbsp';
}

$(function(){
	SalesUp.Variables.Todos = 0;
	SalesUp.Variables.ListaTemas();
	SalesUp.Variables.ActivaSubeImagen();
});





