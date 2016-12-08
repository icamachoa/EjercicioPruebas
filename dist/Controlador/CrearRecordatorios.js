var $SelectizeContacto;

SalesUp.Variables.Contacto = function(){
	$SelectizeContacto = $('#Contacto').selectize({
    	plugins: ['restore_on_backspace'],
	  	valueField: 'Tkp', labelField: 'Nombre',
	    searchField: ['NomNorma', 'ApeNorma', 'Nombre', 'Apellido', 'Titulo', 'Correo', 'Empresa'],
	    maxItems: 1, options: [], persist: false, create: false,
	    onChange: function(){ SalesUp.Variables.DespuesDeSeleccionarContacto(); },
	    render:{
	        item: function(item, escape){
	        	$('.Contacto.loading').removeClass('loading');
	        	$('.Contacto.SelectizeMal').removeClass('SelectizeMal');
	            return '<div>' +
	                (item.Nombre ? '<span data-cliente="'+item.EsCliente+'" class="Contacto">' + ( (item.Titulo)?escape(item.Titulo):'' )  +' '+escape(item.Nombre)+' '+ ( (item.Apellido)?escape(item.Apellido):'' ) +'</span>' : '') +
	                
	                (item.Empresa ? '<span class="Empresa"> <i>[' + escape(item.Empresa) + ']</i></span>' : '') +
	            '</div>';
	        },
	        option: function(item, escape){
	        	var Sexo = (item.Sexo=='M' ? '<i class="fa fa-female"></i> ' : '<i class="fa fa-male"></i> ');
	        	var Tel = (item.Telefono ? '<i class="fa fa-phone"></i> '+escape(item.Telefono) :'' );
	        	var Cel = (item.Movil ? ' <i class="fa fa-mobile"></i> '+escape(item.Movil) :'' );
	        	var SoloTel = (item.Telefono ? escape(item.Telefono) :'' );
	        	var SoloCel = (item.Movil ? ', '+escape(item.Movil) :'' );
	            return '<div class="BoxInfoContacto BoxSizing">' +
	                '<span class="NombreContacto Ellipsis">' + Sexo + escape(item.Titulo) +' '+escape(item.Nombre)+' '+escape(item.Apellido) + (item.Archivado ? ' <i>[Archivado]</i>' : '')+'</span>' +
	               ( item.Correo ? '<span class="CorreoContacto Ellipsis"><i class="fa fa-envelope"></i> ' + escape(item.Correo) + '</span>' : '') +
	               ( item.Empresa ? '<span class="EmpresaContacto Ellipsis"><i class="fa fa-building-o"></i> ' + escape(item.Empresa) + '</span>' : '' )  +
	               ( item.Telefono ? '<span class="RegionContacto Ellipsis" title="' + SoloTel + SoloCel + '">' + Tel + Cel + '</span>' :'' ) +
	            '</div>';
	        },
	        option_create: function(data, escape){
				return '';
				return '<div class="create"><strong>"' + escape(data.input) + '"</strong> </div>';
			}
	    },
	    load: function(query, callback){
	    	SelectContacto.clearOptions();

	    	if (!query.length) return callback();
	    	
	        if (query.length>=3){
	        	callback();
	        	SalesUp.Variables.jsonLtContactos = SalesUp.Sistema.CargaDatos({ Link:'/privado/Modelo/jsonMisContactos.dbsp', Parametros:'q='+query, DataType:'json' });
	        	callback(SalesUp.Variables.jsonLtContactos.jsonDatos);
	        }
	    }
	});
	var SelectContacto = '';
	SelectContacto = $SelectizeContacto[0].selectize;
}

SalesUp.Variables.DespuesDeSeleccionarContacto = function(){
	$('#Contacto.selectized').each(function() {
		var $input = $(this);
		var update = function(e) { $('#TkpSeleccionado').val($input.val()); }
		$(this).on('change', update);
		update();
	});

	SalesUp.Variables.LoTieneCompartido();
	setTimeout(function(){
		if( _.size($('.Contacto[data-cliente]')) ){
			$('#Asunto').focus();	
		}
		
		if($('.Contacto[data-cliente]').attr('data-cliente')==1){
			$('#LbProspectoCliente').html('Cliente');
		}else{
			$('#LbProspectoCliente').html('Prospecto');
		}
	}, 200);
}

SalesUp.Variables.Guardar = function(){
	
	var Hora = $('#Hora').val();
	var UltimaFecha = $('#Vence').val();
	SalesUp.Sistema.Almacenamiento({a:'SysHoraRecordatorio',v:Hora});
	SalesUp.Sistema.Almacenamiento({a:'SysFechaRecordatorio',v:UltimaFecha});
    $('#FrmNuevoRecordatorio').submit();
    if(self.parent.SalesUp.Variables.ValidarEventosActivos){
		self.parent.SalesUp.Variables.ValidarEventosActivos({tipo:3});
	};
    
}



function RevisarRestricciones(){
	var NoCompartidos = '';
	if(!_.isUndefined(SalesUp.Variables.jsonCompartido)){
		NoCompartidos = SalesUp.Variables.jsonCompartido.jsonDatos[0].NoCompartidos;
	}
	
	
	if(SalesUp.Valida.ValidaObligatorios()){
		if(_.size(NoCompartidos)>0){
			SalesUp.Construye.MuestraAlerta({
				TipoAlerta:'AlertaPregunta',
				Alerta:'<h2>Atención</h2><br/>Los siguientes usuarios no tienen compartido el contacto:<br/>'+ NoCompartidos,
				Boton1:'Compartir y guardar',
				Boton2:'Cancelar',
				Callback1:'SalesUp.Variables.Guardar',
				Icono1:'<i class="fa fa-save"></i>'
			});	
		}else{
			SalesUp.Variables.Guardar();
		}	
	}
}

SalesUp.Variables.GuardaEditarTarea = function(){
	if(SalesUp.Valida.ValidaObligatorios()){
		$('#FrmEditarTarea').submit();
	}
}


SalesUp.Variables.LoTieneCompartido = function(){
	var Tkp = $('#TkpSeleccionado').val();
	var IdUsuario = $('#LtIdUsuarios').val();
	var IdGrupos = $('#LtIdGrupos').val();
	if( (Tkp!='') && ((IdUsuario!='')||IdGrupos!='')){
		var Datos = {Tkp: Tkp, Idu:IdUsuario, IdG:IdGrupos };
		SalesUp.Variables.jsonCompartido = SalesUp.Sistema.CargaDatos({ Link:'/privado/Modelo/jsonProspectoCompartido.dbsp', Parametros:Datos, DataType:'json' });
		$('#IdsNoCompartidos').val(SalesUp.Variables.jsonCompartido.jsonDatos[0].IdsNoCompartidos);
	}
}


SalesUp.Variables.UltimaFecha = function(){
	var Formato = SalesUp.Sistema.Almacenamiento({a:'SysFormatoFecha'});
	Formato = SalesUp.Sistema.StrReplace('yy','yyyy',Formato);
	Formato = Formato.toUpperCase();
	var FechaHoy = moment().add('d', 0).format(Formato);

	var Hora = SalesUp.Sistema.Almacenamiento({a:'SysHoraRecordatorio'});
	var Fecha = SalesUp.Sistema.Almacenamiento({a:'SysFechaRecordatorio'});
	var sHora = moment().get('hour');
	var sMin = moment().get('minute');

	if(sMin>30){sHora = sHora + 1;}

	if(sHora<24){
		(!Hora) ? Hora = sHora +':00':'';
		(!Fecha) ? Fecha = moment().format(Formato):'';
	}else{
		(!Hora) ? Hora = '00:00':'';
		(!Fecha) ? Fecha = moment().add('d', 1).format(Formato):'';
	}

	$('#Vence').val(FechaHoy); 
	$('#Hora').val(Hora);

	var FechaSplit;
	var nf=Fecha;
	if(Formato=='DD/MM/YYYY'){ 
		FechaSplit = Fecha.split('/');
		nf = FechaSplit[2]+'/'+FechaSplit[1]+'/'+FechaSplit[0]; 
	}
	
	(_.isDate(new Date(nf))) ? nDate = new Date(nf) : nDate = new Date();
	var DateTime = nDate.getTime();
	
	var FechaHoySplit;
	var HoyFecha = FechaHoy;
	if(Formato=='DD/MM/YYYY'){ 
		FechaHoySplit = FechaHoy.split('/');
		HoyFecha = FechaHoySplit[2]+'/'+FechaHoySplit[1]+'/'+FechaHoySplit[0]; 
	}
	
	(_.isDate(new Date(HoyFecha))) ? nDateHoy = new Date(HoyFecha) : nDateHoy = new Date();
	var DateHoy = nDateHoy.getTime();
	
	if(DateTime>DateHoy){ $('#Vence').val(Fecha); }
	
}/*SalesUp.Variables.UltimaFecha*/



/*------------andres----------------*/
function Repetir(){
    IniciaPickersEspecial({F:$('#Vence').val()});
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
function AztualizaDiasLista(){
    var lista = ''
   $('.etidiasactivo').each(function() {
       lista= lista + $(this).attr('value') + ',';  
   }); 
   $('#diasrecurrencia').val(lista);
}


function ReiniciaPickerEspecial(){
    $( "#fecharepetir" ).datepicker( "destroy" );console.log('entro');
    IniciaPickersEspecial({F:$('#Vence').val()});
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
    IniciaPickersEspecial({F:$('#Vence').val()});
}  

function CambiaFechaInicio(){
    ConfiguracionPickerNoFechasPasadas.minDate=$('#Vence').val();
    ConfiguracionPickerNoFechasPasadas.startDate=$('#Vence').val();
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
  	
	var InitialHeight=222;

	if($('#BoxContacto').is(':visible')){
		InitialHeight=252 ;
	}
    
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
	if (valor==1){ ReiniciarValoresDefaultDown(); }
   
   AjustaPopupCitas();
}

/*--------------andres--------------*/


SalesUp.Variables.SeleccionaDia = function(Op){
	var $Elemento = $(Op.Elemento);
	var valor = $Elemento.attr('value');
	var estado = $Elemento.attr('estado');
	var valordia = $Elemento.attr('valordia');
	$('.tipsy').remove();
	if(estado==0){
	   $Elemento.addClass('etidiasactivo').attr('estado','1').attr('tip','Click para deshabilitar el '+valordia);
	}else{
	   $Elemento.removeClass('etidiasactivo').attr('estado','0').attr('tip','Click para habilitar el '+valordia);   
	}

	SalesUp.Variables.DiasActivos();
} /* /SeleccionaDia */


SalesUp.Variables.DiasActivos = function(){
	var lista = ''
	$('.etidiasactivo').each(function(){
	   lista = lista + $(this).attr('value') + ',';  
	}); 
	$('#DiasFrecuencia').val(lista);
}

SalesUp.Variables.LosDias = function(Op){
	$('#DiasFrecuencia').val(Op.v);
	$(Op.Elemento).removeClass('w55');
	if(Op.v==0){ $(Op.Elemento).addClass('w55'); }
}

SalesUp.Variables.Cada = function(Op){
	$('#Frecuencia').val(Op.v);
}

SalesUp.Variables.VenceRepetir = function(Op){
	$('#FechaFinRepetir').val(Op.v);
}

SalesUp.Variables.TerminarEn = function(Op){
	var valor = Op.v;
	$('#TipoFin').val(valor);
	if (valor>0){
	   $('#fecharepetir').removeAttr('disabled').addClass('InfoObligatorio');
	   $('#fecharep label').removeClass('etiquetadisabled');
	}else{
	   ReiniciaPickerEspecial();
	   $('#fecharepetir').attr('disabled','disabled').removeClass('InfoObligatorio');
	   $('#FechaFinRepetir, #fecharepetir').val('');
	   $('#fecharep label').addClass('etiquetadisabled');
	}
}

SalesUp.Sistema.VerContactos = function(Op){
	var $BoxContacto = $('#BoxContacto');
	var $Elemento = $(Op.Elemento);
	$('.tipsy').remove();
	if($BoxContacto.is(':visible')){
		$Elemento.attr('tip','Mostrar prospecto o cliente relacionado').addClass('Gris');
		$BoxContacto.slideUp();
		SalesUp.Variables.TamanioPopActual = SalesUp.Variables.TamanioPopActual - 30;
		self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:SalesUp.Variables.TamanioPopActual});
	}else{
		$Elemento.attr('tip','Ocultar prospecto o cliente relacionado').removeClass('Gris');
		$BoxContacto.slideDown();
		SalesUp.Variables.TamanioPopActual = SalesUp.Variables.TamanioPopActual + 30;
		self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:SalesUp.Variables.TamanioPopActual});
		setTimeout(function(){ $('.Contacto .selectize-input.items.not-full > input').focus();}, 200);
	}
} /* /SalesUp.Sistema.VerContactos */


SalesUp.Variables.AjustaTamanioHora = function(){
	$('#Vence, #Hora').focus(function(){
		SalesUp.Variables.FocusActivo = true;
		self.parent.SalesUp.Sistema.TamanioInicial();
	    var tamanio = self.parent.SalesUp.Variables.TamanioInicial;
	    if(tamanio==162){
	    	self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:320});
	    }
	}).blur(function(){
	  	setTimeout(function(){
	  		self.parent.SalesUp.Sistema.TamanioInicial();
		    var tamanio = self.parent.SalesUp.Variables.TamanioInicial;
		    ( (tamanio==320) && (!SalesUp.Variables.FocusActivo) ) ? self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:162}) : '';	
		    SalesUp.Variables.FocusActivo = false;
	  	}, 200);
	  	
	}).change(function(){
		self.parent.SalesUp.Sistema.TamanioInicial();
	    var tamanio = self.parent.SalesUp.Variables.TamanioInicial;
	    (tamanio==320) ? self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:162}) : '';

	});
} /* /SalesUp.Variables.AjustaTamanioHora */


SalesUp.Variables.AjustaTamanioHoraCrear = function(){
	$('#Vence, #Hora').focus(function(){
		SalesUp.Variables.FocusActivo = true;
		self.parent.SalesUp.Sistema.TamanioInicial();
	    var tamanio = self.parent.SalesUp.Variables.TamanioInicial;
	    
	    if(tamanio==222){
	    	self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:252});
	    }
	}).blur(function(){
	  	setTimeout(function(){
	  		self.parent.SalesUp.Sistema.TamanioInicial();
		    var tamanio = self.parent.SalesUp.Variables.TamanioInicial;
		    var Alto = 222;
		    ($('#BoxContacto').is(':visible')) ? Alto = 252: '';
		    ( (tamanio==252) && (!SalesUp.Variables.FocusActivo) ) ? self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:Alto}) : '';	
		    SalesUp.Variables.FocusActivo = false;
	  	}, 200);
	  	
	}).change(function(){
		self.parent.SalesUp.Sistema.TamanioInicial();
	    var tamanio = self.parent.SalesUp.Variables.TamanioInicial;
	    var Alto = 222;
		($('#BoxContacto').is(':visible')) ? Alto = 252: '';
	    (tamanio==252) ? self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:Alto}) : '';

	});
} /* /SalesUp.Variables.AjustaTamanioHora */

SalesUp.Variables.CrearRecordatorio = function(){
	self.parent.SalesUp.Sistema.TamanioInicial();
	SalesUp.Variables.TamanioPop = self.parent.SalesUp.Variables.TamanioInicial;
	SalesUp.Variables.TamanioPopActual = SalesUp.Variables.TamanioPop;
	SalesUp.Sistema.CambiarTamanioPopUp({Alto:SalesUp.Variables.TamanioPop});

	setTimeout(function(){
		
		SalesUp.Variables.Contacto();
		SalesUp.Variables.UltimaFecha();
		
		$('.LtParaQuien .selectize-input.items.not-full.has-options > input').focus();
		$('.selectize-dropdown.LtParaQuien').hide();
		$('.LtParaQuien .selectize-input.items.not-full.has-options > input').keyup(function(e){
			if(SalesUp.Sistema.NumKeyCode(e)!=13) $('.selectize-dropdown.LtParaQuien').show();
		});
		
		//$('input[placeholder][activarplace], textarea[placeholder][activarplace]').floatlabel({labelClass:'FondoLabela80'});
		$('#Hora').clockpicker({ placement:'right', align:'right', autoclose:true, 'default':'now' });
		(SalesUp.Variables.FechaFin) ? $('#Vence').val(SalesUp.Variables.FechaFin) : '';

		((SalesUp.Variables.HoraFin!='0:0')&&(SalesUp.Variables.HoraFin!='')) ? $('#Hora').val(SalesUp.Variables.HoraFin) : '';

		SalesUp.Variables.AjustaTamanioHoraCrear();

	}, 10);
}/*SalesUp.Variables.CrearRecordatorio*/

SalesUp.Variables.Cambio = function(Op){
	(Op.vence) ? $('#Vencimiento').val(1):'';
	(Op.para) ? $('#Responsable').val(1):'';
}




$(function(){
	
	SalesUp.Variables.CrearRecordatorio();
	setTimeout(function() {$('#DetallesTarea').focus();
		IniciaPickersEspecial({F:$('#Vence').val()});
	}, 500);
	
	$('#terminar').change(function(){
       var valor=$('#terminar :selected').val();
       if (valor>0){
       		$('#fecharep').css('visibility','visible');
        	$('#fecharepetir').removeAttr('disabled');
        	$('#fecharep label').removeClass('etiquetadisabled');
       }else{
           ReiniciaPickerEspecial();
           $('#fecharep').css('visibility','hidden');
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


