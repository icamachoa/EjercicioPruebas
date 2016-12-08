var ExtencionesPermitidas = '(png, jpg, jpeg, doc, docx, pdf, xls, xlsx, ppt, pptx, txt, zip, rar)';
var ExtPermitidas = new Array('png','jpg','jpeg','doc','docx','pdf','xls','xlsx','ppt','pptx', 'txt', 'zip', 'rar');
var path = "C:\\fakepath\\";
var NameFile ='Seleccionar archivo';
var MsgError1 = 'Tipo de archivo validos';
var MsgError2 = 'Debe seleccionar un archivo';

$(function(){
	$('.Archivo').each(function(){
		$(this).css('position','fixed')
		.css('top','-1000px')
		.after('<span idfile="'+$(this).attr('id')+'" id="InputFile-'+$(this).attr('id')+'" class="InputFile"><span class="icono upload"></span> '+NameFile+'</span>');
	});
});


$('.InputFile').live('click',function(){
		$('#'+$(this).attr('idfile')).click();
});

$('.Archivo').live('change',function(){
	var IdFile = $(this).attr('id');
	var NombreArchivo = $(this).val();
	var NombreArchivo = NombreArchivo.replace(path , '');
	if( FileExt(NombreArchivo) ){
    	$('#InputFile-'+IdFile).remove();
    	var n = NombreArchivo.length;
    	if(n>=32){ NombreArchivo = NombreArchivo.substring(0, 32) + '...';	}
    	$(this).after('<span class="ui-widget-header CajaNombreArchivo"><span class="NombreArchivo">'+NombreArchivo+'</span><span idfile="'+$(this).attr('id')+'" class="ui-icon ui-icon-close CambiarArchivo"></span></span>');	        		
	}else{
		$('.ErrorValidacion').remove();
		$(this).val('').after('<p class="ErrorValidacion"></p>');
		$('.ErrorValidacion').html('');
		$('.ErrorValidacion').css('width','77%').html(MsgError1+' <br/><span style="font-size:10px;">'+ExtencionesPermitidas+'</span>').fadeIn('slow').delay(3000).fadeOut('slow');        		
	}

});

$('.CambiarArchivo').live('click',function(){
	$('#'+$(this).attr('idfile')).val('');
    $('#'+$(this).attr('idfile')).css('position','fixed').css('top','-1000px').after('<span idfile="'+$(this).attr('idfile')+'" id="InputFile-'+$(this).attr('idfile')+'" class="InputFile boton-2"><span class="icono upload"></span> '+NameFile+'</span>');
	$(this).parent().remove();
});

function FileExt(NombreArchivo){
	 var b = false;
     var ext = NombreArchivo.split('.').pop().toLowerCase();
     if($.inArray(ext, ExtPermitidas) > -1) b = true;
     return b;
}

function ArchivoObligatorio(){
	var ba = true;
	$('.Archivo').each(function(){
		if($(this).val() == ''){
				$('.ErrorValidacion').remove();
				$(this).val('').after('<p class="ErrorValidacion"></p>');
				$('.ErrorValidacion').html('');
				$('.ErrorValidacion').css('width','50%').html(MsgError2).show('slow').delay(3000).hide('slow');
				ba = false;
		}
	});
	return ba;
}

function replaceAll( text, busca, reemplaza ){
  while (text.toString().indexOf(busca) != -1)
      text = text.toString().replace(busca,reemplaza);
  return text;
}


