/*------------andres----------------*/
function Repetir(){
    IniciaPickersEspecial({F:$('#rFechaVence').val()});
    if($('#Repetir').is(':visible')){
        $('#cada, #diasmesdiv, #dias').hide();
        var menos = 30;
        ($('#cada').is(':visible')) ? menos = 60 : '';
        $('#Repetir').slideUp();

        SalesUp.Variables.TamanioPopActual = SalesUp.Variables.TamanioPopActual - menos;
    }else{
        $('#Repetir').slideDown();
        SalesUp.Variables.TamanioPopActual = SalesUp.Variables.TamanioPopActual + 30;
    }

    self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:SalesUp.Variables.TamanioPopActual});
}

/*function AccionRepetir(){
    var valor = $('#repetir').val();
    $('#Recurrencia').val(valor);
    $('#DiasFrecuencia').val('');alert(valor);
    var titulo=''
    if (valor>0){
        self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:SalesUp.Variables.TamanioPopActual+30});
        if (valor==1){ titulo='Cada día';$('#dias').slideUp();$('#diasmesdiv').slideUp(); $('#DiasFrecuencia').val(0);}
        if (valor==2){ titulo='Cada semana';$('#dias').slideDown();$('#diasmesdiv').slideUp(); SalesUp.Variables.DiasActivos(); }
        if (valor==3){ titulo='Cada mes';$('#dias').slideUp();$('#diasmesdiv').slideDown(); $('#DiasFrecuencia').val($('#diasmes').val()); }
        $('#cada').show();
        $('#cada label').html(titulo).addClass('Tip2').attr('Tip',titulo);
        $('#terminar').removeAttr('disabled');
        $('#recurrenciaterminar label').removeClass('etiquetadisabled');
        SalesUp.Sistema.Tipsy();
    }else{
        ReiniciarValoresDefaultTerminar();
        self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:SalesUp.Variables.TamanioPop+30});
    }   
    
}*/

function AccionRepetir(){
       var valor=$('#repetir').val();
       var titulo='';
       if (valor>0){           
           if (valor==1){titulo='Cada día';$('#dias').slideUp();$('#diasmesdiv').slideUp();}
           if (valor==2){titulo='Cada semana';$('#dias').slideDown();$('#diasmesdiv').slideUp();}
           if (valor==3){titulo='Cada mes';$('#dias').slideUp();$('#diasmesdiv').slideDown();}
           $('#cadadiv label').html(titulo);
           $('#cadadiv label').attr('tip',titulo); 
           $('#cada').show();
           $('#terminar').removeAttr('disabled');
           $('#recurrenciaterminar label').removeClass('etiquetadisabled');
       }else{
           ReiniciarValoresDefaultTerminar();
       }   
       //console.log('AccionRepetir');
       AjustaPopupCitas(); 
}


function ActivaBtnDias(){
    var frecu=$('#Recurrencia').val();
    var diasfrecu1=$('#DiasFrecuencia').val();
    var diasfrecu=diasfrecu1.split(',');
    if(frecu==2){
       for (var i = 0; i < diasfrecu.length; i++) {
              $('.dia'+diasfrecu[i]).attr('estado',1);
              $('.dia'+diasfrecu[i]).removeClass('etidias');
              $('.dia'+diasfrecu[i]).addClass('etidiasactivo FondoMenu');
              $('.dia'+diasfrecu[i]).attr('tip','Click para deshabilitar el '+$('.dia'+diasfrecu[i]).attr('valordia')); 
       } 
       AztualizaDiasLista();
    }
    if(frecu==3){
        $('#diasmes').val(diasfrecu[0]);
    }
       
}
function AztualizaDiasLista(){
    var lista = ''
   $('.etidiasactivo').each(function() {
       lista= lista + $(this).attr('value') + ',';  
   }); 
   $('#diasrecurrencia').val(lista);
}


function ReiniciaPickerEspecial(){
    $( "#fecharepetir" ).datepicker( "destroy" );console.log('entro');
    IniciaPickersEspecial({F:$('#rFechaVence').val()});
} 


function IniciaPickersEspecial(Op){
    var Fecha;
    var Formato = SalesUp.Sistema.Almacenamiento({a:'SysFormatoFecha'});
    (Op.F) ? Fecha = Op.F : Fecha = '01/01/2000';
    $('#fecharepetir').datepicker({dateFormat: Formato,startDate:Fecha,minDate:Fecha,
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'], dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'], 
        monthNames:  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],  
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],          
        changeMonth: false,
        numberOfMonths: 1,
        
    });
    
    
    var f1s = Fecha ;
    if(Formato=='dd/mm/yy'){ 
       var f1a = f1s.split('/');
       var f1 = new Date(f1a[1]+'/'+f1a[0]+'/'+f1a[2]);
    }else{
        var f1 = new Date(f1s); 
    }
    
    var f2s = $('#fecharepetir').val() ;
    if(Formato=='dd/mm/yy'){ 
        var f2a = f2s.split('/');
        var f2 = new Date(f2a[1]+'/'+f2a[0]+'/'+f2a[2]);
    }else{
        var f2 = new Date(f2s); 
    }
    $('#fecharepetir').val(Fecha);    
}

var ReiniciaPickerEspecial = function(){
    $( ".FechaEspecial" ).datepicker( "destroy" );
    IniciaPickersEspecial({F:$('#rFechaVence').val()});
}  

function CambiaFechaInicio(){
    ConfiguracionPickerNoFechasPasadas.minDate=$('#rFechaVence').val();
    ConfiguracionPickerNoFechasPasadas.startDate=$('#rFechaVence').val();
    ReiniciaPickerEspecial();  
}

function ReiniciarValoresDefaultTerminar(){
    $('#cada').slideUp();
    $('#terminar').attr('disabled','disabled');
    $('#recurrenciaterminar label').addClass('etiquetadisabled');
    ReiniciaPickerEspecial();
    $('#fecharepetir').attr('disabled','disabled');
    $('#fecharep label').addClass('etiquetadisabled');
    $('#terminar').val(0);
    $('#repetir').val(0);   
    $('#cadadia').val(1);  
    $('#diasmesdiv').slideUp();
    $('#diasmes').val(1);
    ReiniciaDias();

}

function ReiniciaDias(){
    $('#dias').slideUp(); 
    $('.selectdias').removeClass('etidiasactivo');
    $('.selectdias').addClass('etidias');
    $('#DiasFrecuencia').val('');
}


function AjustaPopupCitas(){
  
    var InitialHeight=210 ;
    var RepeatPart=0;
    var FrecuencyPart=0;
    if ($('#BtnRepetir').attr('valor')>0){
        RepeatPart=20;
        if ($('#repetir').val()>0){
            FrecuencyPart=20;
        }
    }
   var Initial=InitialHeight+RepeatPart+FrecuencyPart;
    self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:Initial});  
    
}

function ReiniciaDias(){
   $('#dias').slideUp(); 
   $('.selectdias').removeClass('etidiasactivo FondoMenu');
   $('.selectdias').addClass('etidias');
   $('#diasrecurrencia').val('');
}  

function ReiniciarValoresDefaultTerminar(){
     $('#cada').slideUp();
     $('#terminar').attr('disabled','disabled');
     $('#recurrenciaterminar label').addClass('etiquetadisabled');
     ReiniciaPickerEspecial();
     $('#fecharepetir').attr('disabled','disabled');
     $('#fecharep label').addClass('etiquetadisabled');
     $('#terminar').val(0);
     $('#repetir').val(0);   
     $('#cadadia').val(1);  
     $('#diasmesdiv').slideUp();
     $('#diasmes').val(1);
     ReiniciaDias();
     
}

function ReiniciarValoresDefaultDown(){
     $('#BtnRepetir').attr('valor',0); 
     $('#BtnRepetir').html('<i class="fa fa-refresh"></i> Repetir');
     $('#dias').slideUp();
     ReiniciarValoresDefaultTerminar();
     $('#recurrencia').slideUp();
}

function AccionBtnRepetirClick(){
       var valor=$('#BtnRepetir').attr('valor');
       if (valor==0){       
          $('#BtnRepetir').attr('valor',1); 
          $('#BtnRepetir').html('<i class="fa fa-refresh"></i> Reperir');
          $('#recurrencia').show();
       }
       if (valor==1){
          ReiniciarValoresDefaultDown();
       }
       //console.log('AccionBtnRepetirClick');
       AjustaPopupCitas();
}


function ValoresRecordarotioDefault(){
    $('#Recurrencia').val(SalesUp.Variables.EditarRecurrencia);
     $('#TipoFin').val( SalesUp.Variables.EditarTipoFin);
     $('#FechaFinRepetir').val( SalesUp.Variables.EditarFechafinRepetir);
     $('#Frecuencia').val( SalesUp.Variables.EditarFrecuencia);
     $('#DiasFrecuencia').val( SalesUp.Variables.EditarDiasFrecuencia);
    
}

$(function(){
    setTimeout(function() {ValoresRecordarotioDefault();IniciaPickersEspecial({F:SalesUp.Variables.EditarFechaRepetir});

        if (SalesUp.Variables.EditarRecurrencia>0){
           AccionBtnRepetirClick();           
           setTimeout(function(){  AccionRepetir(); ActivaBtnDias(); },10);
         } 
    }, 500);
    
    
    
    
    $('#terminar').change(function(){
       var valor=$('#terminar :selected').val();
       if (valor>0){
           $('#fecharepetir').removeAttr('disabled');
            $('#fecharep label').removeClass('etiquetadisabled');
       }else{
           ReiniciaPickerEspecial();
           $('#fecharepetir').attr('disabled','disabled');
           $('#fecharep label').addClass('etiquetadisabled');
       }
   });
   
   $('.selectdias').click(function(){
       var valor=$(this).attr('value');
       var estado=$(this).attr('estado');
       var valordia=$(this).attr('valordia');
       if(estado==0){
           $(this).removeClass('etidias');
           $(this).addClass('etidiasactivo FondoMenu');
           $(this).attr('estado','1');   
           $(this).attr('tip','Click para deshabilitar el '+valordia); 
       }else{
            $(this).removeClass('etidiasactivo FondoMenu');
            $(this).addClass('etidias');
            $(this).attr('estado','0'); 
            $(this).attr('tip','Click para habilitar el '+valordia);   
       }
       AztualizaDiasLista();
   });
});



