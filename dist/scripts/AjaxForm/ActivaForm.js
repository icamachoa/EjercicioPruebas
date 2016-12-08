function nombre(fic) {
  SalesUp.Sistema.AgregaProgresoArchivo();  
  fic = fic.split('\\');
  var nombrearchivo = fic[fic.length-1];
  $('#FileName').html(nombrearchivo);
}

function nombreMult(Num) {
 if (Num>0){ 
  $('#FileName').html(Num+' archivo(s) seleccionado(s)');
 }else{$('#FileName').html(' Adjuntar archivos ');}
}
      
function ActivaInsertarFile(){    
  $('#archivo').click();
}

function ActivaInsertarFileMul(){    
  var posi=inputs.length-1;
  var div=inputs[posi];
  $('#'+div).click(); 
}

function ActivaInsertarFileMulNext(){    
  var posi=inputs.length;
  var totalf=($('.MultiFile-label').length)+1;
  inputs[posi]='archivo_F'+posi;  
  nombreMult(totalf);
}

function ActivaInsertarFileMulNextP(num){     
  SalesUp.Sistema.AgregaProgresoArchivo();     
  var posi=inputs.length;
  var totalf=($('.MultiFile-label').length)+1+parseInt(num);
  inputs[posi]='archivo_F'+posi;  
  nombreMult(totalf);
}

function ValidaFileSize(tamanio){
  var a=true;  
  if(document.UpLoadFileAjaxForm.archivo.value!=''){  
      if (typeof tamanio != 'undefined') {
          a = SalesUp.Valida.ValidaTamanioArchivo({ Archivo:document.UpLoadFileAjaxForm.archivo, Max:tamanio});  
      }else{
          a = SalesUp.Valida.ValidaTamanioArchivo({ Archivo:document.UpLoadFileAjaxForm.archivo});  
      }
  }
  return  a
}

function AjaxFormSimple(forma,archivodiv){
     var OptionesAjaxForm = { 
            beforeSend: function(){
                SalesUp.Sistema.EsperaGuardando();
                MsgOk='Archivo agregado';
                SalesUp.Sistema.MuestraProgresoArchivo();
            },uploadProgress: function(event, position, total, percentComplete){
              SalesUp.Sistema.UploadProgresoArchivo(percentComplete);
            },success: function(){              
            },complete: function(response){
                var respuestaJson=JSON.parse(response.responseText)
                var resultado=parseInt(respuestaJson.resultado);
                if (resultado==1){
                    var file=respuestaJson.nombre;
                    var tamanio=parseInt(respuestaJson.tamanio);
                }else{
                    var file=respuestaJson.error;
                    var tamanio=parseInt(0);                    
                }         
               if (resultado==0){
                   $('#'+archivodiv).val('')
                   $('#amazon').val(0);
                   $('#pesokb').val(tamanio);
               }else{
                   $('#'+archivodiv).val(file);
                   $('#amazon').val(1);
                    $('#pesokb').val(tamanio);
               }
               SalesUp.Sistema.CompletoProgresoArchivo();
               setTimeout(function(){$('#'+forma).submit();},300);
            },error: function(){
                $('#cargandofile').hide();
                $('span.errorValidacion').remove();
                $(".caja-botones").after('<span class="errorValidacion">No se pudo subir el archivo</span>');
            }
        };        
        $("#UpLoadFileAjaxForm").ajaxForm(OptionesAjaxForm);   
    
}

function AjaxFormMultiple(forma){
      var OptionesAjaxForm = { 
            beforeSend: function(){
                 SalesUp.Sistema.EsperaGuardando();
                MsgOk='Archivo agregado';
                SalesUp.Sistema.MuestraProgresoArchivo();
            },uploadProgress: function(event, position, total, percentComplete){  
                SalesUp.Sistema.UploadProgresoArchivo(percentComplete);          
            },success: function(){
            },complete: function(response){
               var respuestaJson=JSON.parse(response.responseText)             
               var resultado=parseInt(respuestaJson.resultado);
               var file='';
               var tamanio='';
               if (resultado==1){
                    var respuestaLength=respuestaJson.datos.length;   
                    for (var i=0; i<respuestaLength; i++) {
                         file=file+respuestaJson.datos[i].nombre;
                         tamanio=tamanio+respuestaJson.datos[i].tamanio;
                         if(i<respuestaLength-1){
                             file=file+',';
                             tamanio=tamanio+',';
                         }
                    }                    
                }else{
                    var file=respuestaJson.error;
                    var tamanio=parseInt(0);
                } 
               if (resultado==0){
                   $('#RUTA_DOC').val('');
                   $('#pesokb').val(tamanio);
               }else{
                   $('#RUTA_DOC').val(file);
                   $('#pesokb').val(tamanio);
               }
               SalesUp.Sistema.CompletoProgresoArchivo();
               setTimeout(function(){$('#'+forma).submit();},300);           
            },error: function(){
                $('#cargandofile').hide();
                $('span.errorValidacion').remove();
                $(".caja-botones").after('<span class="errorValidacion">No se pudo subir el archivo</span>');
            }
        };        
        $("#UpLoadFileAjaxForm").ajaxForm(OptionesAjaxForm);
    }


/*SalesUp.Sistema.OcultaEspera();*/

function ActivaAjaxFormOportunidades(){
      /*SalesUp.Sistema.AgregaProgresoArchivo();*/
     AjaxFormSimple('frmOportunidad','cotizacion'); 
    }  

function ActivaAjaxFormProspectosArchivos(){
     AjaxFormSimple('frmProspectosArchivos','cotizacion'); 
    }  

function ActivaAjaxFormOportunidadesSeguimiento(){
    AjaxFormSimple('frmOportunidad','cotizacion');
    }   
    
function ActivaAjaxFormDocumentos(){
     AjaxFormSimple('frmDocCompartidos','NOMBREARCHIVO');
    } 
    
function ActualizaAjaxFormDocumentos(){
     AjaxFormSimple('frmDocCompartidos','NOMBREARCHIVO');
    } 
function ActivaAjaxFormComposeMail(){
     AjaxFormMultiple('frmComposeMail');
    }

function ActivaAjaxFormPlantillas(){
     AjaxFormMultiple('frmAgregarPlantilla');
    }
    
function ActivaAjaxFormPlantillasEditar(){
     AjaxFormMultiple('frmEditarPlantilla');
    }          

function ActivaAjaxFormAutorresponders(){
     AjaxFormMultiple('frmAgregarPieza');
    }     

function ActivaAjaxFormAutorrespondersEditar(){
     AjaxFormMultiple('frmEditarPieza');
    }            

function ActivaAjaxFormVentas(){
      /*SalesUp.Sistema.AgregaProgresoArchivo();*/
     AjaxFormSimple('frmVenta','cotizacion'); 
    }  

