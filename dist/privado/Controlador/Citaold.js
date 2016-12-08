var $select, $selectconquien;
var tamanioselectize=28
$('#btnAceptar').click(function(){
    if(SalesUp.Valida.ValidaObligatorios()){
      $('#frmAgregarGrupo').submit();             
    }
});

function MostrarDirecciones(e){
     var flag=$('#direcciondown').attr('flag');
     if(SalesUp.Sistema.NumKeyCode(e)==40){
       if($('#direcciondown').is(':visible')){
           var next=$('.direcselected').next();
           if (next.size()==0){
               $('.direct').removeClass('direcselected');
               $('.direct').first().addClass('direcselected');
           }else{
               $('.direct').removeClass('direcselected');
               next.addClass('direcselected');
           }
          
       }else{
          $('#direcciondown').show();
       }
     }
     
     if(SalesUp.Sistema.NumKeyCode(e)==38){ 
       if($('#direcciondown').is(':visible')){
           var prev=$('.direcselected').prev();
           if (prev.size()==0){
               $('.direct').removeClass('direcselected');
               $('.direct').last().addClass('direcselected');
           }else{
               $('.direct').removeClass('direcselected');
               prev.addClass('direcselected');
           }
          
       }
     }
     
     
     if(SalesUp.Sistema.NumKeyCode(e)==13){
          var direccion=$('.direcselected').html();
           $('#Donde').val(direccion);
           $('#direcciondown').hide();
     } 
     
     if(SalesUp.Sistema.NumKeyCode(e)==27){
           $('#direcciondown').hide();
     }   
}

function ActualizaDireccion(){
    var direccion=$(this).attr('direccion');
    console.log(direccion);
    $('#Donde').val(direccion);
    $('#direcciondown').hide();
    $('#direcciondown').attr('flag',0);
}

var InsertaHoras = function(Op) {
     var Div, Fecha, Origen, Hora;
     (Op.Div) ? Div = Op.Div : Div = 'horaini'; 
     Fecha=Op.Fecha;
     Origen=Op.Origen;
     Hora=Op.hora;
     SalesUp.Sistema.CargaDatos({Link:'horas.dbsp',Div:1, Destino:'#'+Div, Parametros:'fecha='+Fecha+'&origen='+Origen+'&hora='+Hora });       
}
      
var InsertaColaboradoresCalendario = function(Co){
   var IdSeleccionado,TipoIdSeleccionado;
   IdSeleccionado = $('#IdSeleccionado').val();
   TipoIdSeleccionado = $('#TipoIdSeleccionado').val();
   SalesUp.Sistema.CargaDatos({Link:'ajax/colaboradorescitas.dbsp',Div:1, Destino:'#selectcalendario', Parametros:'IdSeleccionado='+IdSeleccionado+'&TipoIdSeleccionado='+TipoIdSeleccionado });     
}   
     
var ActualizaHoras = function(){
  var accion=$('#accion').val();
  var horai='';
  var horaf='';
  if (accion=1){
      horai=$('#horai').val();
      horaf=$('#horaf').val();
  }

  InsertaHoras({Div:'horaini', Fecha:$('#fechacitainicio').val(),Origen:'1', hora:horai});
  InsertaHoras({Div:'horafin', Fecha:$('#fechacitafin').val(), Origen:'2', hora:horaf}); 
  $('#horai').val('');
  $('#horaf').val(''); 
}   
   
   
var UsuariosSelectize = function(){
     self.parent.SalesUp.Sistema.TamanioInicial();
    var IdSeleccionado,TipoIdSeleccionado;
    IdSeleccionado = $('#IdSeleccionado').val();
    TipoIdSeleccionado = $('#TipoIdSeleccionado').val();
    IdUsuario = $('#IdUsuario').val();
    SalesUp.Variables.jsonLtUsuariosCitas = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonLtColaboradoresCitas.dbsp', Parametros:'IdSeleccionado='+IdSeleccionado+'&TipoIdSeleccionado='+TipoIdSeleccionado, DataType:'json'});
     ($select) ? $select[0].selectize.destroy() : '';
        var dataUsuarios = new Array();
        var dataUsuariosCompartidos = new Array();
        var TamanioInicial = 360;
        var Alto = 0;
        var Aumenta = 0;
         
        $select = $('#calendariousers').selectize({
            maxItems: null,
            valueField: 'id',
            labelField: 'title',
            searchField: 'title',
            plugins: ['remove_button'],
            options: SalesUp.Variables.jsonLtUsuariosCitas.jsonDatos,
            create: false,
            onChange: function() {
                $('#calendariousuarios .selectize-dropdown').hide();
                $('#calendariousuarios .selectize-input.items.not-full.has-options.has-items > input').keyup(function(e){
                    if(SalesUp.Sistema.NumKeyCode(e)!=13) $('#calendariousuarios .selectize-dropdown').show();
                });
                console.log('andres1');
                Alto = $('#calendariousuarios .selectize-input').height();
                console.log($('#Accion').val());
                if ($('#Accion').val()==0){
                    if(Alto>28){      
                        console.log('UsuariosSelectize Alto > 28',Aumenta,Alto);         
                        $('#calendariousuarios').css('height',Alto);
                    }else{
                        console.log('UsuariosSelectize Alto > 28 else');
                         $('#calendariousuarios').css('height','28');
                    }
                    AjustaPopupCitas();
                }
                
            }
        });

        $select[0].selectize.addItem(IdUsuario);
        if ($('#Accion').val()==1){
            var lista=$('#listaCalendario').val() ;
            var listaCalendario = lista.split(',');
            for (var i = 0; i < listaCalendario.length; i++) {
                $select[0].selectize.addItem(listaCalendario[i]);
                Alto = $('#calendariousuarios .selectize-input').height();
            }
            
            if(Alto>28){                
                        $('#calendariousuarios').css('height',Alto);
            }else{
                        $('#calendariousuarios').css('height','28');
            }
            AjustaPopupCitas();
        }
        //console.log('usuarioselectiza');
        //AjustaPopupCitas();
}  
   
   
function ConQuien(){
            $selectconquien=$('#ConQuien').selectize({
                    plugins: ['restore_on_backspace'],
                    valueField: 'Id',
                    labelField: 'Nombre',
                    searchField: ['NomNorma', 'ApeNorma', 'Nombre', 'Apellido', 'Titulo', 'Correo', 'Empresa'],
                    maxItems: 1,
                    options: [],
                    optgroups:[
                                {id: 'Colaboradores', name: 'Colaboradores'},
                                {id: 'Contactos', name: 'Contactos'}
                              ],
                              
                   optgroupField: 'make',
                   optgroupLabelField: 'name',
                   optgroupValueField: 'id',
                   optgroupOrder: [ 'Contactos','Colaboradores'],        
                              
                    persist: false,
                    create: true,
                    onChange: function(){DespuesDeSeleccionar(); },
                    onItemAdd:function(value, $item){console.log(value, $item);
                                var di1=($item).attr('direccion1');
                                var di2=($item).attr('direccion2');
                                $('#Donde').val('');
                                $('#direcciondown').html('<ul><li class="direc">No hay sugerencias disponibles</li></ul>');
                                if (di1.length!=0 || di2.length!=0){
                                    $('#direcciondown').html('');
                                    $('#direcciondown').html('<ul><li class="direc direct  direc1" valor="1" direccion="direccion 1" ></li><li class="direc direct direc2" valor="2" direccion="direccion 2"></li></ul>');
                                    $('.direc1').html($($item).attr('direccion1'));
                                    $('.direc2').html($($item).attr('direccion2'));
                                }
                                
                         },
                    render:{
                        item: function(item, escape){
                            $('.ConQuien.loading').removeClass('loading');
                            $('.ConQuien.SelectizeMal').removeClass('SelectizeMal');
                            return '<div direccion1="'+item.direccion1+'" direccion2="'+item.direccion2+'" >' +
                                (item.Nombre ? '<span class="Contacto" le="'+item.LE+'">' + ( (item.Titulo)?escape(item.Titulo):'' )  +' '+escape(item.Nombre)+' '+ ( (item.Apellido)?escape(item.Apellido):'' ) + '</span>' : '') +
                                (item.Empresa ? '<span class="Empresa"> (' + escape(item.Empresa) + ')</span>' : '') +
                            '</div>';
                        },
                        option: function(item, escape){
                           
                            var Sexo = (item.Sexo=='M' ? '<i class="fa fa-female"></i> ' : '<i class="fa fa-male"></i> ');
                            var Tel = (item.Telefono ? '<i class="fa fa-phone"></i> '+escape(item.Telefono) :'' );
                            var Cel = (item.Movil ? ' <i class="fa fa-mobile"></i> '+escape(item.Movil) :'' );
                            var SoloTel = (item.Telefono ? escape(item.Telefono) :'' );
                            var SoloCel = (item.Movil ? ', '+escape(item.Movil) :'' );
                            
                            return '<div class="BoxInfoContacto">'+
                                '<span class="NombreContacto Ellipsis">' + Sexo + escape(item.Titulo) +' '+escape(item.Nombre)+' '+escape(item.Apellido) +'</span>' +
                               ( item.Correo ? '<span class="CorreoContacto Ellipsis"><i class="fa fa-envelope"></i> ' + escape(item.Correo) + '</span>' : '') +
                               ( item.Empresa ? '<span class="EmpresaContacto Ellipsis"><i class="fa fa-building-o"></i> ' + escape(item.Empresa) + '</span>' : '' )  +
                               ( item.Telefono ? '<span class="RegionContacto Ellipsis" title="' + SoloTel + SoloCel + '">' + Tel + Cel + '</span>' :'' ) +
                            '</div>';
                        },
                        option_create: function(data, escape){
                            return '<div class="create">Cita con... <strong>"' + escape(data.input) + '"</strong> </div>';
                        }
                    },
                    load: function(query, callback){
                            var SeleccionarPersona = $selectconquien[0].selectize;
                            SeleccionarPersona.clearOptions();
                        if (!query.length) return callback();
                        
                        if (query.length>=3){
                            callback();
                            $.ajaxSetup({ 'beforeSend' : function(xhr) { xhr.overrideMimeType('text/json; charset=iso-8859-1'); } });
                            $.ajax({ type: 'POST',
                                url: 'ajax/jx-json-lista-prospectos-usuarios.dbsp',
                                data: { q: query, t:0 },
                                error: function(){ callback(); $('.ConQuien.loading').removeClass('loading'); },
                                success: function(Data){ callback(Data.LtContactos); $('.ConQuien.loading').removeClass('loading'); }
                            });
                        }
                    }
            });
            if($('#Accion').val()==0){
               $('.selectize-control.ConQuien .selectize-input.items.not-full > input').focus(); 
            }else{
                $('#Donde').focus();
            }
           
 }   
 
function ConQuienSelecciona(query){ 
     var tipo=$('#TipoIdSeleccionado').val();
    var SeleccionarPersona;
        SeleccionarPersona = $selectconquien[0].selectize;
        SeleccionarPersona.clearOptions();
        SalesUp.Variables.ActualizarDatosPersonal = 0;
        
        SeleccionarPersona.load(function(callback){
            
            if( ( SalesUp.Sistema.EsNumero(query) ) && ( query!='0') ){
                SalesUp.Variables.jsonPersona = SalesUp.Sistema.CargaDatos({Link:'ajax/jx-json-lista-prospectos-usuarios.dbsp', Parametros:{ q: query, t: tipo }, DataType:'json' });
                callback(SalesUp.Variables.jsonPersona.LtContactos);
                  SeleccionarPersona.setValue([query]);    
                
            }
        });
         $('#Donde').focus();
}

function DespuesDeSeleccionar(){
            $('#ConQuien.selectized').each(function() {
                var $input = $(this);
                var update = function(e) { 
                        if (SalesUp.Sistema.EsNumero($input.val())){
                            $('#IdSeleccionado').val($input.val());
                            $('#TipoIdSeleccionado').val($('.Contacto').attr('LE'));
                        }
                        else{  
                            $('#IdSeleccionado').val(0);  
                            $('#TipoIdSeleccionado').val(0);
                        }
                 }
                $(this).on('change', update);
                update();
            });
            $('.ConQuien.loading').removeClass('loading');
            $('.ConQuien.SelectizeMal').removeClass('SelectizeMal');           
            UsuariosSelectize();
} 

function IniciaMuestraSelectPlantillas(){
    var TipoPlantilla = $('#tiporecordatorio :selected').val();
    var HayCompartidos=0;
    if (TipoPlantilla==1){
        $('.SMS2').hide();
        $('.CORREO1').show();
        HayCompartidos=$('.CORREO1orden2').size();
    }
    
    if (TipoPlantilla==2){
        $('.CORREO1').hide();
        $('.SMS2').show();
        HayCompartidos=$('.SMS2orden2').size();        
    }
    
    if (HayCompartidos==0){
        $('.orden1').hide();
    }else{
        $('.orden1').show();
    }
} 

function SelectItemPlantilla(){
    var TipoPlantilla = $('#tiporecordatorio :selected').val();
    var IdPlantilla = 0
    if (TipoPlantilla==1){
        IdPlantilla=$('#IdPlantillaCORREO').val();
        $('#IdPlantillaCORREO').val(0);
    } 
    
    if (TipoPlantilla==2){
        IdPlantilla=$('#IdPlantillaSMS').val();
        $('#IdPlantillaSMS').val(0);
    } 
    if (IdPlantilla==0){$('#plantillas').val(0);}else{$('#plantillas').val(IdPlantilla);}
}

function HabilitaBotonPlantillasActivas(){
      var IdplantillaSMS = $('#IdPlantillaSMS').val();
      var IdplantillaCORREO = $('#IdPlantillaCORREO').val();
      
      if (IdplantillaSMS!=0){HabilitaBoton(2,IdplantillaSMS);}
      if (IdplantillaCORREO!=0){HabilitaBoton(1,IdplantillaCORREO);} 

}

function MuestraSelectPlantillas(){
    var TipoPlantilla = $('#tiporecordatorio :selected').val();
    var IdplantillaSMS = $('#IdPlantillaSMS').val();
    var IdplantillaCORREO = $('#IdPlantillaCORREO').val();
    var IdPlantilla = $('#plantillas :selected').val();
    var HayCompartidos=0;
    if (TipoPlantilla==1){
        $('.SMS2').hide();
        $('.CORREO1').show();
        HayCompartidos=$('.CORREO1orden2').size();
        $('#IdPlantillaCORREO').val(IdPlantilla);
        HabilitaBoton(TipoPlantilla,IdPlantilla);
    }
    
    if (TipoPlantilla==2){  
        $('.CORREO1').hide();
        $('.SMS2').show();
        HayCompartidos=$('.SMS2orden2').size();
        $('#IdPlantillaSMS').val(IdPlantilla);  
        HabilitaBoton(TipoPlantilla,IdPlantilla);      
    }
    
    if (HayCompartidos==0){
        $('.orden1').hide();
    }else{
        $('.orden1').show();
    }
}

function HabilitaBoton(Opcion,IdPlantilla){
    if (Opcion==1){
        if (IdPlantilla==0){
            $('.CORREOBoton').removeClass('etismscorreoactiva');
            $('.CORREORemove').removeClass('removeeti');
            $('.CORREORemove').removeClass('Tip6');
            $('.CORREORemove').attr('tip','');   
            $('.CORREOBoton').addClass('etismscorreo');            
        }else{
            $('.CORREOBoton').removeClass('etismscorreo');
            $('.CORREOBoton').addClass('etismscorreoactiva');
            $('.CORREORemove').addClass('removeeti Tip6');
            $('.CORREORemove').attr('tip','Eliminar plantilla Correo seleccionada');
        }
        
    }
    
    if (Opcion==2){
       if (IdPlantilla==0){
            $('.SMSBoton').removeClass('etismscorreoactiva');
            $('.SMSRemove').removeClass('removeeti');
            $('.SMSRemove').removeClass('Tip6');
            $('.SMSRemove').attr('tip',''); 
            $('.SMSBoton').addClass('etismscorreo');
       }else{
           $('.SMSBoton').removeClass('etismscorreo');
           $('.SMSBoton').addClass('etismscorreoactiva');
           $('.SMSRemove').addClass('removeeti Tip6');
           $('.SMSRemove').attr('tip','Eliminar plantilla SMS seleccionada'); 
       } 
    }
    SalesUp.Sistema.Tipsy();
}

function RemovePlantilla(t){
 var tip=$(t).attr('tip');
 var tipo=$(t).attr('valor');
 var TipoPlantilla = $('#tiporecordatorio :selected').val();
 if (tip!=''){
     if (tipo==1){
         $('#IdPlantillaCORREO').val(0);
     }
     if (tipo==2){
         $('#IdPlantillaSMS').val(0);
     }
     if (TipoPlantilla==tipo){
         $('#plantillas').val(0);
     }   
     HabilitaBoton(tipo,0); 
 } 
}



var IniciaPickersEspecial = function(Op){
    var Fecha;
        (Op.F) ? Fecha = Op.F : Fecha = '01/01/2000';
        $('.FechaEspecial').datepicker({dateFormat: 'dd/mm/yy',startDate:Fecha,minDate:Fecha,
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'], dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'], 
            monthNames:  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],  
            monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],          
            changeMonth: false,
            numberOfMonths: 1,
            
        });
        
        var f1s=Fecha ;
        var f1a = f1s.split('/');
        var f1 = new Date(f1a[1]+'/'+f1a[0]+'/'+f1a[2]);
        
        var f2s=$('.FechaEspecial').val() ;
        var f2a = f2s.split('/');
        var f2 = new Date(f2a[1]+'/'+f2a[0]+'/'+f2a[2]);
        if (f1.getTime()>f2.getTime()){
            $('.FechaEspecial').val(Fecha);
        }
        
}
    
var ReiniciaPickerEspecial = function(){
    $( ".FechaEspecial" ).datepicker( "destroy" );
    IniciaPickersEspecial({F:$('#fechacitafin').val()});
}  

function ReiniciaDias(){
   $('#dias').slideUp(); 
   $('.selectdias').removeClass('etidiasactivo');
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
     $('#calendariousuarios').css('height','28');
     $('#BtnRepetir').attr('valor',0); 
     $('#BtnRepetir').html('<i class="fa fa-refresh"></i> Repetir');
     $('#dias').slideUp();
     ReiniciarValoresDefaultTerminar();
     $('#recurrencia').slideUp();
}

function AztualizaDiasLista(){
    var lista = ''
   $('.etidiasactivo').each(function() {
       lista= lista + $(this).attr('value') + ',';  
   }); 
   $('#diasrecurrencia').val(lista);
}

function IniciaConQuien(t){
    if (t==0){
       ConQuien();
    }else{
         if( $('#TipoIdSeleccionado').val()!=0){
            ConQuien();
            ConQuienSelecciona($('#IdSeleccionado').val());
        }else{
            $('#ConQuien').val($('#Persona').val());
        }       
    }
}

function AccionBtnRepetirClick(){
       var valor=$('#BtnRepetir').attr('valor');
       if (valor==0){       
          $('#BtnRepetir').attr('valor',1); 
          $('#BtnRepetir').html('<i class="fa fa-refresh"></i> Ocultar');
          $('#recurrencia').show();
       }
       if (valor==1){
          ReiniciarValoresDefaultDown();
       }
       //console.log('AccionBtnRepetirClick');
       AjustaPopupCitas();
}

function AccionRepetir(){
       var valor=$('#repetir').val();
       var titulo=''
       if (valor>0){           
           if (valor==1){titulo='Cada día';$('#dias').slideUp();$('#diasmesdiv').slideUp();}
           if (valor==2){titulo='Cada semana';$('#dias').slideDown();$('#diasmesdiv').slideUp();}
           if (valor==3){titulo='Cada mes';$('#dias').slideUp();$('#diasmesdiv').slideDown();}
           $('#cadadiv label').html(titulo);
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
    var frecu=$('#valorrecordar').val();
    var diasfrecu1=$('#diasfrecu').val();
    var diasfrecu=diasfrecu1.split(',');
    if(frecu==2){
       for (var i = 0; i < diasfrecu.length; i++) {
              $('.dia'+diasfrecu[i]).attr('estado',1);
              $('.dia'+diasfrecu[i]).removeClass('etidias');
              $('.dia'+diasfrecu[i]).addClass('etidiasactivo');
              $('.dia'+diasfrecu[i]).attr('tip','Click para deshabilitar el '+$('.dia'+diasfrecu[i]).attr('valordia')); 
       } 
       AztualizaDiasLista();
    }
    if(frecu==3){
        $('#diasmes').val(diasfrecu[0]);
    }
       
}
function AjustaPopupCitas(){
    var InitialHeight=360;
    var CalendarHeight= $('#calendariousuarios .selectize-input').height()+15;
    var RepeatPart=0;
    var FrecuencyPart=0;
    
    if ($('#BtnRepetir').attr('valor')>0){
        RepeatPart=35;
        if ($('#repetir').val()>0){
            FrecuencyPart=35;
        }
    }
    
   var Initial=InitialHeight+CalendarHeight+RepeatPart+FrecuencyPart;
    console.log(InitialHeight,CalendarHeight,RepeatPart,FrecuencyPart);
    self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:Initial});  
    
}

$(document).ready(function(){ 
    var fechahoy=$('#fechahoy').val();
    setTimeout(function(){ SalesUp.Sistema.MuestraEspera('',4); }, 1);
    if ( $('#Accion').val()>0){
        self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:500}); 
    }
    SalesUp.Sistema.DatePickerInicioFin({D:'fechacitainicio', H:'fechacitafin', M:1, A:'ActualizaHoras()', F:fechahoy});    
    IniciaPickersEspecial({F:$('#fechacitafin').val()});   
    $('.FechaEspecial').val($('#fechacitafin').val());    
    setTimeout(function(){        
        IniciaConQuien($('#Accion').val());       
        UsuariosSelectize();       
        if ($('#valorrecordar').val()>0){
           AccionBtnRepetirClick();           
           setTimeout(function(){  AccionRepetir();  },10);
         } 
    ActivaBtnDias();
    ActualizaHoras();
    IniciaMuestraSelectPlantillas();
    HabilitaBotonPlantillasActivas();
    setTimeout(function(){ SalesUp.Sistema.OcultarOverlay(); }, 1000);
    //AjustaPopupCitas();
    },50);  
    
    
    $('#tiporecordatorio').change(function(){
        SelectItemPlantilla();
        MuestraSelectPlantillas();
    });
    
    $('#plantillas').change(function(){
        var plantilla=$('#plantillas').val();
        if (plantilla==-1){
            $('#plantillas').val(0);
        }
        MuestraSelectPlantillas();
    });
  
   $('#BtnAceptar').click(function(){
       var listaCalendario =  $('#calendariousers').val();
       $('#listaCalendario').val(listaCalendario);
       if (SalesUp.Valida.ValidaObligatorios()){
          $('#FormCita').submit();
       }
   });
   
   $('#BtnRepetirdddd').click(function(){
       AccionBtnRepetirClick();
     /* SalesUp.Construye.MuestraAlerta({
        TipoAlerta:'AlertaModal',
        Id:'ModalCombiarDatos',
        Alerta: 'SalesUp.Variables.HtmlCombinarDatos',
        Ancho:'50%',
        Titulo:'Combinar datos de empresa',
        BotonOk:'Combinar',
        IconoOk:'<i class="fa fa-copy"></i>',
        Callback1:'SalesUp.Variables.CombinarDatos'
    });*/

   });
  
   
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
           $(this).addClass('etidiasactivo');
           $(this).attr('estado','1');   
           $(this).attr('tip','Click para deshabilitar el '+valordia); 
       }else{
            $(this).removeClass('etidiasactivo');
            $(this).addClass('etidias');
            $(this).attr('estado','0'); 
            $(this).attr('tip','Click para habilitar el '+valordia);   
       }
       AztualizaDiasLista();
   });
   
   $('.direct').click(function(){
       var direccion=$('.direcselected').html();
       $('#Donde').val(direccion);
       $('#direcciondown').hide();
   });
   
   $('#Donde').blur(function(){
       $('#direcciondown').hide();
   });
   setTimeout(function(){  console.log('andres2');$('#Accion').val(0); },100);
});




