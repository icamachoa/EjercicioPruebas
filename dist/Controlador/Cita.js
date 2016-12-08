var $select, $selectconquien;
var tamanioselectize=28

function a_unico(ar){
    var ya=false,v="",aux=[].concat(ar),r=Array();

    for (var i in aux){ //
        v=aux[i];
        ya=false;
        for (var a in aux){
            if (v==aux[a]){
                if (ya==false){
                    ya=true;
                }
                else{
                    aux[a]="";
                }
            }
        }
    }
    for (var a in aux){
        if (aux[a]!="" & aux[a]!="undefined"){
            r.push(aux[a]);
        }
    }
    return r;
} 



function MoveScrollBarr(pos){
    var tamanio=0;
    if (pos<5){
      $('#direcciondown').scrollTop( 0 );  
    }else{
      tamanio=(pos-5)*20; 
      $('#direcciondown').scrollTop( tamanio );  
    }   
}

function GeneraSugerenciaDonde(){
  var direcciones=$('#direc').val().split('|');
  direcciones=a_unico(direcciones);
  var ils='';
  var a=0;
  if (direcciones.length>=1){
    for (var i = 0; i < direcciones.length; i++){
      if (direcciones[i].lenght!=0){ 
        a=a+1;
        ils=ils+'<li onclick="MostrarDireccionesClick(this)" class="direc direct  direc'+a+'" valor="'+a+'" >'+direcciones[i]+'</li>'    
      }    
    } 
    $('#direcciondown').html('<ul>'+ils+'</ul>');  
  }else{
    $('#direcciondown').html('<ul><li class="direc">No hay sugerencias disponibles</li></ul>');  
  }   
}
   
function MostrarDireccionesClick(t){
  var direccion=$(t).html();
  $('#Donde').val(direccion);
  $('#direcciondown').hide();  
}
   
function MostrarDirecciones(e){
     var flag=$('#direcciondown').attr('flag');
     if(SalesUp.Sistema.NumKeyCode(e)==40){
       if($('#direcciondown').is(':visible')){
           var next=$('.direcselected').next();
           if (next.size()==0){
               $('.direct').removeClass('direcselected');
               $('.direct').first().addClass('direcselected');
               MoveScrollBarr(1);
           }else{
               $('.direct').removeClass('direcselected');
               next.addClass('direcselected');
               MoveScrollBarr(next.attr('valor'));
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
               MoveScrollBarr($('.direct').last().attr('valor'));
           }else{
               $('.direct').removeClass('direcselected');
               prev.addClass('direcselected');
               MoveScrollBarr(prev.attr('valor'));
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
    $('#Donde').val(direccion);
    $('#direcciondown').hide();
    $('#direcciondown').attr('flag',0);
}

      
var InsertaColaboradoresCalendario = function(Co){
   var IdSeleccionado,TipoIdSeleccionado;
   IdSeleccionado = $('#IdSeleccionado').val();
   TipoIdSeleccionado = $('#TipoIdSeleccionado').val();
   SalesUp.Sistema.CargaDatos({Link:'ajax/colaboradorescitas.dbsp',Div:1, Destino:'#selectcalendario', Parametros:'IdSeleccionado='+IdSeleccionado+'&TipoIdSeleccionado='+TipoIdSeleccionado });     
}   

var ActualizaHoraFin = function(){
  var horai='';
  var horaf='';
      horai=$('#horacitainicio').val();
      horaf=$('#horacitafin').val();
 
  if($('#fechacitafin').val()==$('#fechacitainicio').val()){
    InsertaHoras({Div:'horafin', Fecha:$('#fechacitafin').val(), Origen:'3', hora:horai, lugar:1}); 
  }else{
      
    InsertaHoras({Div:'horafin', Fecha:$('#fechacitafin').val(), Origen:'2', hora:horaf, lugar:1});      
  }


} 

function AgregarPersonasEditarSinId(){
     var idcita=$('#IdCita').val();
     var tipo=0;
     var ArrayDatos=[];
     SalesUp.Variables.jsonColaboradoresCitasEditarSinId = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonColaboradoresCitasEditar.dbsp',Parametros:{ idcita: idcita, tipo:tipo },  DataType:'json'}); 
     var DatosSplit=SalesUp.Variables.jsonColaboradoresCitasEditar.jsonDatos[0].IdSeleccionado.split(',');
     DatosSplit=a_unico(DatosSplit);
      for (var i = 0; i < DatosSplit.length; i++) {
          if( SalesUp.Sistema.EsNumero(DatosSplit[i]) ){    
              ArrayDatos.push(parseInt(DatosSplit[i]));
          }else{
              ArrayDatos.push(DatosSplit[i].toString());
          }    
       } 
       
     var CitasEditarSinId=SalesUp.Variables.jsonColaboradoresCitasEditarSinId.jsonDatos[0].IdSeleccionado.split(',');  
     CitasEditarSinId=a_unico(CitasEditarSinId);
      for (var i = 0; i < CitasEditarSinId.length; i++) {
          $selectconquien[0].selectize.addOption({Id: CitasEditarSinId[i], Nombre: CitasEditarSinId[i], Titulo:'', Empresa:''});
       }     
     $selectconquien[0].selectize.setValue(ArrayDatos);
}
   
function ListadoPersonasEditar(){
     var idcita=$('#IdCita').val();
     var tipo=1;
     SalesUp.Variables.jsonColaboradoresCitasEditar = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonColaboradoresCitasEditar.dbsp',Parametros:{ idcita: idcita, tipo:tipo },  DataType:'json'}); 
     $('#IdSeleccionado').val(SalesUp.Variables.jsonColaboradoresCitasEditar.jsonDatos[0].IdSeleccionado);
     $('#TipoIdSeleccionado').val(SalesUp.Variables.jsonColaboradoresCitasEditar.jsonDatos[0].TipoIdSeleccionado);     
     $('#ConQuien').val(SalesUp.Variables.jsonColaboradoresCitasEditar.jsonDatos[0].IdSeleccionado);
     
} 
   
function ConQuien(){
            var IdSeleccionado='';
            var TipoIdSeleccionado='';
            if ($('#Accion').val()==1){
              ListadoPersonasEditar();
              IdSeleccionado=$('#IdSeleccionado').val();
              TipoIdSeleccionado=$('#TipoIdSeleccionado').val();
            }
            IdSeleccionado=$('#IdSeleccionado').val();
              TipoIdSeleccionado=$('#TipoIdSeleccionado').val();
            SalesUp.Variables.jsonColaboradoresCitas = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonColaboradoresCitas.dbsp',Parametros:{ IdSeleccionado: IdSeleccionado, TipoIdSeleccionado: TipoIdSeleccionado } ,DataType:'json'});
            
            IdUsuario = $('#IdUsuario').val();
            //$('#ConQuien').val(IdUsuario);
            var IdUsuarioActual = $('#IdUsuarioActual').val();
            
            
            $selectconquien=$('#ConQuien').selectize({
              plugins: ['remove_button'],
              valueField: 'Id', labelField: 'Nombre',
              searchField: ['NomNorma', 'ApeNorma', 'Nombre', 'Apellido', 'Titulo', 'Correo', 'Empresa'],
              maxItems: null, options: SalesUp.Variables.jsonColaboradoresCitas.jsonDatos,
              optgroups:[ {id: 'Contactos', name: 'Contactos'}, {id: 'Colaboradores', name: 'Colaboradores'} ],
              optgroupField: 'make', optgroupLabelField: 'name', optgroupValueField: 'id',
              optgroupOrder: [ 'Colaboradores','Contactos'],
              persist: false, create: true,
              onChange: function(){
                  // SalesUp.Variables.ValidarCitaDuplicada(value);
                 
                if($('.ConQuien .selectize-input').height()>=196){
                  $('.ConQuien .selectize-input').addClass('ConQuienMaxHeight');
                }
                DespuesDeSeleccionar();
                GeneraSugerenciaDonde();
              },
              onItemAdd:function(value, $item){
                
                var tipoMsg=0;
                SalesUp.Variables.ValidarCitaDuplicada(value, tipoMsg);
               /**/ 
                var di1=($item).attr('direccion1');
                var di2=($item).attr('direccion2');
                var direc= $('#direc').val();
                
                if (di1.length!=0){
                  direc=direc+'|'+di1;    
                }
                
                if (di2.length!=0){
                  direc=direc+'|'+di2;    
                }
                
               
                $('#direc').val(direc);
                //$('#Donde').val('');
                //$('#direcciondown').html('<ul><li class="direc">No hay sugerencias disponibles</li></ul>');
                //console.log($('#direcciondown').length);
                //if (di1.length!=0 || di2.length!=0){
                //  console.log( $('#direcciondown').last(), 'asasas');
                  //  $('#direcciondown').html('');
                //    $('#direcciondown').append('<li class="direc direct  direc1" valor="1" direccion="direccion 1" ></li><li class="direc direct direc2" valor="2" direccion="direccion 2"></li>');
                   // $('.direc1').html($($item).attr('direccion1'));
                   // $('.direc2').html($($item).attr('direccion2'));
                // }
                GeneraSugerenciaDonde();
                                
              },
              render:{
                item: function(item, escape){
                  $('.ConQuien.loading').removeClass('loading');
                  $('.ConQuien.SelectizeMal').removeClass('SelectizeMal');
                   return '<div class="BoxSizing" direccion1="'+item.direccion1+'" direccion2="'+item.direccion2+'" >' +
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
               
                // SeleccionarPersona.clearOptions();
                if (!query.length) return callback();
                if (query.length>=3){
                            callback();
                            $.ajaxSetup({ 'beforeSend' : function(xhr) { xhr.overrideMimeType('text/json; charset=iso-8859-1'); } });
                            $.ajax({ type: 'POST',
                                url: 'ajax/jx-json-lista-prospectos-usuarios.dbsp',
                                data: { q: query, t:0 },
                                error: function(){ callback(); $('.ConQuien.loading').removeClass('loading'); },
                                success: function(Data){
                                  callback(Data.LtContactos);
                                  $('.ConQuien.loading').removeClass('loading'); 
                                }
                            });
                }
              }
            });
            
            IdUsuarioActual = SalesUp.Sistema.StrReplace('U','',IdUsuarioActual);
            SplitIdUsuarioActual =  IdUsuarioActual.split(',');

            for(var i = 0; i <= SplitIdUsuarioActual.length - 1 ; i ++ ){
              var ida = SplitIdUsuarioActual[i];
              if(ida!=''){
                $selectconquien[0].selectize.addItem(ida);
              }
            }


            //$selectconquien[0].selectize.addItem(IdUsuarioActual);
            //$selectconquien[0].selectize.addItem('vamso');
            //$selectconquien[0].selectize.setValue(['vamso']);
            if($('#Accion').val()==0){
                $('#Asunto').focus();
               
            }else{
                AgregarPersonasEditarSinId();
               // $('.selectize-control.ConQuien .selectize-input.items.not-full > input').focus(); 
             $('#Asunto').focus();
            }
           // $selectconquien[0].selectize.addItem(IdUsuario);
           AjustaPopupCitas();
           
 }   
 
function LoadInvitadosColaboradores(){
    //alert('antes del clear');
    //$selectconquien[0].selectize.clear();
    
    //$selectconquien[0].selectize.refreshOptions(SalesUp.Variables.jsonColaboradoresCitas.jsonDatos);     
    $selectconquien[0].selectize.load(function(callback){
       callback(SalesUp.Variables.jsonColaboradoresCitas.jsonDatos);
    });
} 
 
function ConQuienSelecciona(query){ 
   /*  var tipo=$('#TipoIdSeleccionado').val();
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
         $('#Donde').focus();*/
}

function DespuesDeSeleccionar(){
      var ids=''; 
            $('#ConQuien.selectized').each(function() {
                var $input = $(this);
               var update = function(e) { 
                            $('#IdSeleccionado').val($input.val());
                 }
                $(this).on('change', update);
                update();
            });           
            var andres= $('#IdSeleccionado').val().split(',');
            var a = '';
            $('.selectize-control.ConQuien .Contacto').each(function(){
                var b = $(this).attr('le');
                (b=='undefined') ? b = 0 : '';               
                a = a + b + ',';
            });
             $('#TipoIdSeleccionado').val(a);
            $('.ConQuien.loading').removeClass('loading');
            $('.ConQuien.SelectizeMal').removeClass('SelectizeMal');     
            
            AjustaPopupCitas();      
           // UsuariosSelectize();
} 

/* Seccion Recordatorios*/
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
      
      if (($('#Accion').val()==1) & ((IdplantillaSMS!=0) ||(IdplantillaCORREO!=0))){
          $('#RecordarOption').val(1);
          ModuloRecordar();
      }

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
            $('.CORREOBoton').removeClass('etismscorreoactiva FondoMenu');
            $('.CORREORemove').removeClass('removeeti');
            $('.CORREORemove').removeClass('Tip6');
            $('.CORREORemove').attr('tip','');   
            $('.CORREOBoton').addClass('etismscorreo');            
        }else{
            $('.CORREOBoton').removeClass('etismscorreo');
            $('.CORREOBoton').addClass('etismscorreoactiva FondoMenu');
            $('.CORREORemove').addClass('removeeti Tip6');
            $('.CORREORemove').attr('tip','Eliminar plantilla Correo seleccionada');
        }
        
    }
    
    if (Opcion==2){
       if (IdPlantilla==0){
            $('.SMSBoton').removeClass('etismscorreoactiva FondoMenu');
            $('.SMSRemove').removeClass('removeeti');
            $('.SMSRemove').removeClass('Tip6');
            $('.SMSRemove').attr('tip',''); 
            $('.SMSBoton').addClass('etismscorreo');
       }else{
           $('.SMSBoton').removeClass('etismscorreo');
           $('.SMSBoton').addClass('etismscorreoactiva FondoMenu');
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
/* Fin seccion Recordatorios*/


/*Inicia seccion Notificaciones */
function IniciaMuestraSelectPlantillasNotificaciones(){
    var TipoPlantilla = $('#tipornotificacion :selected').val();
    var HayCompartidos=0;
    if (TipoPlantilla==1){
        $('.NOTISMS2').hide();
        $('.NOTICORREO1').show();
        HayCompartidos=$('.NOTICORREO1orden2').size();
    }
    
    if (TipoPlantilla==2){
        $('.NOTICORREO1').hide();
        $('.NOTISMS2').show();
        HayCompartidos=$('.NOTISMS2orden2').size();        
    }
    
    if (HayCompartidos==0){
        $('.NOTIorden1').hide();
    }else{
        $('.NOTIorden1').show();
    }
} 

function SelectItemPlantillaNotificacion(){
    var TipoPlantilla = $('#tipornotificacion :selected').val();
    var IdPlantilla = 0
    if (TipoPlantilla==1){
        IdPlantilla=$('#IdPlantillaCORREONoti').val();
        $('#IdPlantillaCORREONoti').val(0);
    } 
    
    if (TipoPlantilla==2){
        IdPlantilla=$('#IdPlantillaSMSNoti').val();
        $('#IdPlantillaSMSNoti').val(0);
    } 
    if (IdPlantilla==0){$('#plantillasnotificacion').val(0);}else{$('#plantillasnotificacion').val(IdPlantilla);}
}

function HabilitaBotonPlantillasActivasNotificaciones(){
      var IdplantillaSMS = $('#IdPlantillaSMSNoti').val();
      var IdplantillaCORREO = $('#IdPlantillaCORREONoti').val();
      
      if (IdplantillaSMS!=0){HabilitaBotonNotificacion(2,IdplantillaSMS);}
      if (IdplantillaCORREO!=0){HabilitaBotonNotificacion(1,IdplantillaCORREO);} 

}

function MuestraSelectPlantillasNotificacion(){
    var TipoPlantilla = $('#tipornotificacion :selected').val();
    var IdplantillaSMS = $('#IdPlantillaSMSNoti').val();
    var IdplantillaCORREO = $('#IdPlantillaCORREONoti').val();
    var IdPlantilla = $('#plantillasnotificacion :selected').val();
    var HayCompartidos=0;
    if (TipoPlantilla==1){
        $('.NOTISMS2').hide();
        $('.NOTICORREO1').show();
        HayCompartidos=$('.NOTICORREO1orden2').size();
        $('#IdPlantillaCORREONoti').val(IdPlantilla);
        HabilitaBotonNotificacion(TipoPlantilla,IdPlantilla);
    }
    
    if (TipoPlantilla==2){  
        $('.NOTICORREO1').hide();
        $('.NOTISMS2').show();
        HayCompartidos=$('.NOTISMS2orden2').size();
        $('#IdPlantillaSMSNoti').val(IdPlantilla);  
        HabilitaBotonNotificacion(TipoPlantilla,IdPlantilla);      
    }
    
    if (HayCompartidos==0){
        $('.NOTIorden1').hide();
    }else{
        $('.NOTIorden1').show();
    }
}

function HabilitaBotonNotificacion(Opcion,IdPlantilla){
    if (Opcion==1){
        if (IdPlantilla==0){
            $('.CORREOBotonNoti').removeClass('etismscorreoNotiactiva FondoMenu');
            $('.CORREORemoveNoti').removeClass('removeetiNoti');
            $('.CORREORemoveNoti').removeClass('Tip6');
            $('.CORREORemoveNoti').attr('tip','');   
            $('.CORREOBotonNoti').addClass('etismscorreoNoti');            
        }else{
            $('.CORREOBotonNoti').removeClass('etismscorreoNoti');
            $('.CORREOBotonNoti').addClass('etismscorreoNotiactiva FondoMenu');
            $('.CORREORemoveNoti').addClass('removeetiNoti Tip6');
            $('.CORREORemoveNoti').attr('tip','Eliminar plantilla Correo seleccionada');
        }
        
    }
    
    if (Opcion==2){
       if (IdPlantilla==0){
            $('.SMSBotonNoti').removeClass('etismscorreoNotiactiva FondoMenu');
            $('.SMSRemoveNoti').removeClass('removeetiNoti');
            $('.SMSRemoveNoti').removeClass('Tip6');
            $('.SMSRemoveNoti').attr('tip',''); 
            $('.SMSBotonNoti').addClass('etismscorreoNoti');
       }else{
           $('.SMSBotonNoti').removeClass('etismscorreoNoti');
           $('.SMSBotonNoti').addClass('etismscorreoNotiactiva FondoMenu');
           $('.SMSRemoveNoti').addClass('removeetiNoti Tip6');
           $('.SMSRemoveNoti').attr('tip','Eliminar plantilla SMS seleccionada'); 
       } 
    }
    SalesUp.Sistema.Tipsy();
}

function RemovePlantillaNotificacion(t){
 var tip=$(t).attr('tip');
 var tipo=$(t).attr('valor');
 var TipoPlantilla = $('#tipornotificacion :selected').val();
 if (tip!=''){
     if (tipo==1){
         $('#IdPlantillaCORREONoti').val(0);
     }
     if (tipo==2){
         $('#IdPlantillaSMSNoti').val(0);
     }
     if (TipoPlantilla==tipo){
         $('#plantillasnotificacion').val(0);
     }   
     HabilitaBotonNotificacion(tipo,0); 
 } 
}
/* Fin seccion Notificaciones */



var IniciaPickersEspecial = function(Op){
    var Fecha;
       var Formato = SalesUp.Sistema.Almacenamiento({a:'SysFormatoFecha'});
       console.info(Formato);
        (Op.F) ? Fecha = Op.F : Fecha = '01/01/2000';
        $('.FechaEspecial').datepicker({dateFormat: Formato,startDate:Fecha,minDate:Fecha,
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
    IniciaPickersEspecial({F:$('#fechacitafin').val()});
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
     $('#ConQuien').css('height','28');
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
   /* if (t==0){
       ConQuien();
    }else{
         if( $('#TipoIdSeleccionado').val()!=0){ 
            ConQuien();
            ConQuienSelecciona($('#IdSeleccionado').val());
        }else{
            $('#ConQuien').val($('#Persona').val());
        }       
    }*/
     setTimeout(function() {ConQuien();}, 1000);
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
    var frecu=$('#valorrecordar').val();
    var diasfrecu1=$('#diasfrecu').val();
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
function AjustaPopupCitas(){
  
    var InitialHeight=250 ;
    var CalendarHeight= $('.ConQuien .selectize-input').height()+15;
    var RepeatPart=0;
    var FrecuencyPart=0;
    var RecordarPart=0;
    var NotificarPart=0;
    
    if ($('#BtnRepetir').attr('valor')>0){
        RepeatPart=35;
        if ($('#repetir').val()>0){
            FrecuencyPart=35;
        }
    }

    if ($('#RecordarOption').attr('estado')>0){
       RecordarPart=35; 
    }
    if ($('#NotificarOption').attr('estado')>0){
       NotificarPart=35; 
    }
    
   var Initial=InitialHeight+CalendarHeight+RepeatPart+FrecuencyPart+RecordarPart+NotificarPart;
    self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:Initial});  
    
}






function GrabarCita(){
    var notifica=$('#notifica').val();
    if (notifica==0){$('#IdPlantillaCORREONoti').val(0);}
       $('#FormCita').submit(); 
       if(self.parent.SalesUp.Variables.ValidarEventosActivos){
          self.parent.SalesUp.Variables.ValidarEventosActivos({tipo:1});
        };

}

function ArmaAlartaAntesGuardar(NoComportidosNombre,NoCompartidosTotal,NoCorreoNombre,NoCorreoTotal,NoMovilNombre,NoMovilTotal){
    var banderag=0;
    var revisa=$('#TipoIdSeleccionado').val();
    var revisastr=revisa.split(',');
    var Msg='<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/>';
    var total=NoCompartidosTotal + NoCorreoTotal + NoMovilTotal;
    var bandera=0; 
    if ($('#IdSeleccionado').val().length>0){
        var hay = revisastr.indexOf('2');
        
        if (hay!=-1){
            if ((total==0) ||( $('#IdPlantillaCORREONoti').val()==0 & $('#IdPlantillaSMSNoti').val()==0 & NoCompartidosTotal==0 )){
                GrabarCita();
            }else{
                if (NoCompartidosTotal>0){
                    Msg=Msg+'Los siguientes usuarios no tienen compartido algun contacto:<br/>'+NoComportidosNombre;
                }
                if (NoCorreoTotal>0 & $('#IdPlantillaCORREONoti').val()>0 ){
                    if (NoCompartidosTotal>0){
                        Msg=Msg+'<br /> <br /> '
                    }
                    Msg=Msg+'Los siguientes contactos no tienen correo electrónico asignado:<br/>'+NoCorreoNombre;
                }
                
                if (NoMovilTotal>0 & $('#IdPlantillaSMSNoti').val()>0 ){
                    if (NoCompartidosTotal>0 || NoCorreoTotal>0 ){
                        Msg=Msg+'<br /> <br /> '
                    }
                    Msg=Msg+'Los siguientes contactos no tienen número movil asignado:<br/>'+NoMovilNombre;
                }
                
                Msg=Msg+'<br/><br /> Al guardar se compartiran los contactos con los usuarios que no esten. Asi mismo no recibirán notificacion correo electrónico y/o sms los contactos que no cuenten con estos.';
                
                SalesUp.Construye.MuestraAlerta({
                    TipoAlerta:'AlertaPregunta',
                    Alerta:Msg,
                    Boton1:'Guardar',
                    Boton2:'Cancelar',
                    Callback1:'GrabarCita',
                    Icono1:'<i class="fa fa-save"></i>'
                    }); 
            }     
         }else{//if interno banderag>0
           SalesUp.Construye.MuestraMsj({tMsg:4,Msg:'Debe especificar al menos un invitado del equipo de colaboradores.'});
        }
       
    }else{//  primer if
        SalesUp.Construye.MuestraMsj({tMsg:4,Msg:'Debe especificar al menos un invitado del equipo de colaboradores.'});
    }  
    
}

function ReiniciaModuloRecordar(){
    $('#tiporecordatorio').val(1);
    $('#plantillas').val(0);
    $('#tiempoplantilla').val(15);
    HabilitaBoton(1,0); 
    HabilitaBoton(2,0); 
    $('#IdPlantillaSMS').val(0);
    $('#IdPlantillaCORREO').val(0);
    
}

function ModuloRecordar(){
 var value=$('#RecordarOption').val();
 var estado=$('#RecordarOption').attr('estado');
 $('#RecordarOption .fa').remove();
 if (estado==0){
    $('#divrecordar').show();
    $('#RecordarOption').attr('estado',1);
    
    $('#RecordarOption').addClass('EtiActiva FondoMenu');
    $('#RecordarOption').attr('tip','Click para deshabilitar opciones recordar');
    $('#RecordarOption').append(' <i class="fa fa-check"></i>');

  }else{ReiniciaModuloRecordar();
      $('#divrecordar').hide();
      $('#RecordarOption').attr('estado',0); 
      $('#RecordarOption').removeClass('EtiActiva FondoMenu');
      
      $('#RecordarOption').attr('tip','Click para habilitar opciones recordar'); 
  }
  AjustaPopupCitas();
}

function ReiniciaModuloNotificar(){
    $('#tiponotificacion').val(1);
    $('#plantillasnotificacion').val(0);
    $('#tiempoplantilla').val(15);
    HabilitaBotonNotificacion(1,0); 
    HabilitaBotonNotificacion(2,0); 
    $('#IdPlantillaSMSNoti').val(0);
    $('#IdPlantillaCORREONoti').val(0);
    
}

function ModuloNotificar(){
  var value=$('#NotificarOption').val();
  var notifica=$('#notifica').val();
  if (notifica==0){$('#notifica').val(1);}else{$('#notifica').val(0);}
  var estado=$('#NotificarOption').attr('estado');
  $('#NotificarOption .fa').remove();
 if (estado==0){
      $('#divrNotificar').show();
      $('#NotificarOption').attr('estado',1);
      
      $('#NotificarOption').addClass('EtiActiva FondoMenu');
      $('#NotificarOption').attr('tip','Click para deshabilitar opciones notificar'); 
      $('#NotificarOption').append(' <i class="fa fa-check"></i>');
  }else{
      $('#divrNotificar').hide();
      $('#NotificarOption').attr('estado',0); 
      $('#NotificarOption').removeClass('EtiActiva FondoMenu');
      
      $('#NotificarOption').attr('tip','Click para habilitar opciones notificar'); 
  }    
  ReiniciaModuloNotificar();
  AjustaPopupCitas();
}
SalesUp.Variables.CambiaHoraFin=function(v){
  var x=v; 
  var hora=x.substring(0,2);
  var minutos=x.substring(3,5);
  if(minutos=='00'){
     x=hora+':30';
    }else{
      x =parseInt(hora)+1+':00';
    }
  $('#horacitafin').val(x);
  
}
SalesUp.Variables.CambiaHoraFinal = function(Op){
    var HoraFinal=(Op.v)?Op.v:'';
    var HoraInicial=$('#horaInicio').val();
    var FechaInicio =$('#fechacitainicio').val(); 
    var FechaFin=$('#fechacitafin').val();
    if((FechaInicio==FechaFin) && HoraFinal<HoraInicial){
      var Hora=HoraInicial.substring(0, 2); 
          Hora=parseInt(Hora)+parseInt(1); 
      var Media=HoraInicial.substring(3);
          console.info(Hora, Media);

      var HoraF=Hora+':'+Media;    
      SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'La hora final no puede ser menor a la hora inicial.'});
      $('#horafinal').val(HoraF);

    }
}
SalesUp.Variables.CambiaFechaInicio = function(){
 var $fInicio = $('#fechacitainicio'), $fFin = $('#fechacitafin'), $fEspecial = $('.FechaEspecial');
 var fInicio = $fInicio.val();
 var noPasado = ConfiguracionPickerNoFechasPasadas;
 noPasado.minDate = fInicio;
 noPasado.startDate = fInicio;
 $fFin.val(fInicio);
 var fFin = $fFin.val();
 $fFin.datepicker('destroy');
 $fFin.datepicker(ConfiguracionPickerNoFechasPasadas);
 $fEspecial.val(fFin);    
     
} 
SalesUp.Variables.MostrarHoraActual = function(Op){
    SalesUp.Variables.CambiaFechaInicio();
    var FechaActual=(Op.v)?Op.v:$('#fechacitainicio').val();
    var datos=SalesUp.Sistema.CargaDatos({Link:'demohoras.dbsp' , Parametros:'fecha='+FechaActual , DataType:'json'});
        datos=datos.jsonDatos;
        datos=datos[0];
    var FechaHoy=datos.FECHAHOY;
    var Hora=datos.HORA;
    var Minutos=datos.MINUTOS;
    var HoraInicio=$('#horai').val();
    var HoraFinal=$('#horaf').val();
    if(HoraInicio==''){
        if(Minutos>='00' && Minutos<='30'){
           Minutos='30'; 
           HoraInicial=Hora+':'+Minutos;
           HoraFinal=parseInt(Hora+1)+':'+Minutos;
           console.info(HoraInicial, HoraFinal, 'Las Horas');
         }else if(Minutos>='31' && Minutos<='59'){
           Minutos='00';
           HoraInicial=parseInt(Hora)+parseInt(1)+':'+Minutos;
           HoraFinal=(parseInt(Hora)+2)+':'+Minutos;
         }
         console.info(HoraInicial, HoraFinal);
         $('#horaInicio').val(HoraInicial);
         $('#horafinal').val(HoraFinal);
    }else{
      $('#horaInicio').val(HoraInicio);
      $('#horafinal').val(HoraFinal);
    }

}
SalesUp.Variables.CambiarHoras = function(Op){
  var valor=(Op.v)?Op.v:'';
  console.info(valor, 'valor');
  var FechaActual=$('#fechacitainicio').val();
  var datos=SalesUp.Sistema.CargaDatos({Link:'demohoras.dbsp' , Parametros:'fecha='+FechaActual , DataType:'json'});
      datos=datos.jsonDatos;
      datos=datos[0];
  var FechaActual=datos.FECHAHOY; 
  var HoraActual=datos.HORATOTAL; 
  var Hora=datos.HORA;
  var Minutos=datos.MINUTOS; 
  if((Number(FechaActual)==1) && (HoraActual>valor)){
    SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'La hora de la cita no puede ser menor a la hora actual.'});
    if(Minutos>='00' && Minutos<='30'){
      Minutos='30'; 
      HoraInicial=Hora+':'+Minutos;
      Hora=(Hora!='23')? parseInt(Hora)+parseInt(1):'00';
      HoraFinal=parseInt(Hora)+parseInt(1)+':'+Minutos;
     }else if(Minutos>='31' && Minutos<='59'){
       Minutos='00';
       HoraInicial=Hora+':'+Minutos;
       Hora=(Hora!='23')?parseInt(Hora)+parseInt(1):'00';
       HoraFinal=parseInt(Hora)+parseInt(1)+':'+Minutos;
     }
     $('#horaInicio').val(HoraInicial);
     $('#horafinal').val(HoraFinal);
  }else{
      var NuevaHora=valor;
      var Hor=NuevaHora.substring(0, 2); 
      var Min=NuevaHora.substring(3);
    if(Min>='00' && Min<='30'){
      //Min='30'; 
      Hor=(Hor!='23')? parseInt(Hor)+parseInt(1):'00';
      HoraF=Hor+':'+Min;
      HoraFinal=HoraF;
     }else if(Min>='31' && Min<='59'){
       //Min='00';
       Hor=(Hor!='23')?parseInt(Hor)+parseInt(1):'00';
       HoraF=Hor+':'+Min;
       HoraFinal=HoraF;
     }
     console.info(HoraFinal, 'HoraFinal');
      $('#horafinal').val(HoraFinal);
  }
}


$(document).ready(function(){ 
    var fechahoy=$('#fechahoy').val();
    setTimeout(function(){ SalesUp.Sistema.MuestraEspera('',4); }, 1);
    if ( $('#Accion').val()>0){
       self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:500}); 
    }
    ConfiguracionPickerNoFechasPasadas.minDate=fechahoy;
    ConfiguracionPickerNoFechasPasadas.startDate=fechahoy;
    $('#horacitainicio').datepicker(ConfiguracionPickerNoFechasPasadas);
    $('#horacitafin').datepicker(ConfiguracionPickerNoFechasPasadas);
    
       
    setTimeout(function(){ 
        IniciaConQuien($('#Accion').val());       
        //UsuariosSelectize();   
        //ConQuien();    
        if ($('#valorrecordar').val()>0){
           AccionBtnRepetirClick();           
           setTimeout(function(){  AccionRepetir();  
           
           IniciaPickersEspecial({F:$('#fechafinrepetir').val()});
            if ($('#Accion').val()==1){ 
               $('.FechaEspecial').val($('#fechafinrepetir').val());  
            }else{
                $('.FechaEspecial').val($('#fechacitafin').val()); 
            }
           },10);
         } 
    ActivaBtnDias();
    SalesUp.Variables.MostrarHoraActual({}); 
    var horai=$('#horai').val();
    var horaf=$('#horaf').val();
    $('#horaInicio').clockpicker({ placement:'right', align:'right', autoclose:true, 'default':horai, minutes:'15' });
    $('#horafinal').clockpicker({ placement:'right', align:'right', autoclose:true, 'default':horaf, minutes:'15' });
    IniciaMuestraSelectPlantillas();
    IniciaMuestraSelectPlantillasNotificaciones();
    HabilitaBotonPlantillasActivas();
    HabilitaBotonPlantillasActivasNotificaciones();
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
  
   $('#tipornotificacion').change(function(){
        SelectItemPlantillaNotificacion();
        MuestraSelectPlantillasNotificacion();
    });
    
    $('#plantillasnotificacion').change(function(){
        var plantilla=$('#plantillasnotificacion').val();
        if (plantilla==-1){
            $('#plantillasnotificacion').val(0);
        }
        MuestraSelectPlantillasNotificacion();
    });
   $('#BtnAceptar').click(function(){
       //(var listaCalendario =  $('#calendariousers').val();
       //$('#listaCalendario').val(listaCalendario);
       var id=$('.BoxSizing').attr('data-value');
        var tipoMsg=1;
       if (SalesUp.Valida.ValidaObligatorios()){
        
          if(SalesUp.Variables.ValidarCitaDuplicada(id, tipoMsg)){
            SalesUp.Variables.GuardaCita();
          }
       }
   });

SalesUp.Variables.GuardaCita=function(){

          var IdSeleccionado=$('#IdSeleccionado').val();
          var TipoIdSeleccionado=$('#TipoIdSeleccionado').val(); 
          
          SalesUp.Variables.jsonColaboradoresCitasValidaciones = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonColaboradoresCitasValidaciones.dbsp',  Parametros:{ IdSeleccionado: IdSeleccionado, TipoIdSeleccionado: TipoIdSeleccionado }, DataType:'json' });   
          var NoComportidosNombre = SalesUp.Variables.jsonColaboradoresCitasValidaciones.jsonDatos[0].NombrePersona;
          var NoCompartidosTotal = SalesUp.Variables.jsonColaboradoresCitasValidaciones.jsonDatos[0].Total;
          var NoCorreoNombre = SalesUp.Variables.jsonColaboradoresCitasValidaciones.jsonDatos[1].NombrePersona;
          var NoCorreoTotal = SalesUp.Variables.jsonColaboradoresCitasValidaciones.jsonDatos[1].Total;
          var NoMovilNombre = SalesUp.Variables.jsonColaboradoresCitasValidaciones.jsonDatos[2].NombrePersona;
          var NoMovilTotal = SalesUp.Variables.jsonColaboradoresCitasValidaciones.jsonDatos[2].Total;
          ArmaAlartaAntesGuardar(NoComportidosNombre,NoCompartidosTotal,NoCorreoNombre,NoCorreoTotal,NoMovilNombre,NoMovilTotal);


}

  /*********/

  SalesUp.Variables.ValidarCitaDuplicada=function(idusuario, tipo){
    var txtAsunti=$('#Asunto').val();
    if((txtAsunti.length>0)){
        var idcita=$('#IdCita').val();
        var fechainicial=$('#fechacitainicio').val();
        var horainicial=$('#horaInicio').val(); //05/15/2015 12:30
        var horafinal=$('#horafinal').val(); 
        var fechafin=$('#fechacitafin').val();
        if(idcita===undefined){idcita='0';}else{idcita=idcita;} 
        if(fechainicial===undefined || fechainicial==null){fechainicial='';}else{fechainicial=fechainicial;}   
        if(horainicial===undefined || horainicial==null){horainicial='';}else{horainicial=horainicial;}
        if(fechafin===undefined || fechafin==null){fechafin='';}else{fechafin=fechafin;}
        if(horafinal===undefined || horafinal==null){horafinal='';}else{horafinal=horafinal;}
        fechainicial=fechainicial+' '+horainicial;
        fechafin=fechafin+' '+horafinal;
    var respuesta=SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonConsultarCitaDuplicada.dbsp', Parametros:'fechainicial='+fechainicial+'&idcita='+idcita+'&fechafin='+fechafin, DataType:'json'});
    respuesta=respuesta.jsonDatos;
    var total=_.reject(respuesta, function(j){return _.size(j)==0;});
    for(var i=0; i<=total.length-1; i++){
          total[i];
        if(respuesta[i].IDPERSONA==idusuario){
                   var Msg='<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2> <br />  <b>'+respuesta[i].USUARIO+'</b>, ya tiene una cita el día '+respuesta[i].FECHA_INICIO+' a las '+respuesta[i].HORA  
               if(tipo==0){
                SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Msg:'El usuario <b>'+respuesta[i].USUARIO+'</b>, ya tiene una cita el '+respuesta[i].FECHA_INICIO});

               }else{
                SalesUp.Construye.MuestraAlerta({
                    TipoAlerta:'AlertaPregunta',
                    Alerta:Msg,
                    Boton1:'Aceptar',
                    Boton2:'Cancelar',
                    Callback1:'SalesUp.Variables.GuardaCita',
                    Icono1:'<i class="fa fa-check"></i>'
                    });
               }
           return false;
        }
    }

  }
    return true;    
  }
   
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
  
   
   $('#Donde').blur(function(){
       setTimeout(function(){$('#direcciondown').hide()},500);
   });
  // setTimeout(function(){  $('#Accion').val(0); },10000);
});









