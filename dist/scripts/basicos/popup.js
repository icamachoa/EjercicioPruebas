/***
 * @author paopao: "Scripts b‹¨«sicos para los popups"
 * setTimeout: funci‹¨«n para que se pare el cursor sobre el primer campo de la forma autom‹¨«ticamente; s‹¨«lo debe haber UN campo con esta clase, no se utiliz‹¨« un id porque var‹¨«an de forma a forma
 * ValidateBeforeSubmit: funci‹¨«n para validar campos de texto (input, textarea) necesarios antes de enviar la forma, los campos deben tener la clase 'obligatorio'.
 * campos con clase:
 * 'obligatorio' - deben de llenarse, ej. nombre
 * 'llave' - son obligatorios y deben ser ‹¨«nicos
 * 'adicional' - no son obligatorios, pero es necesaria la clase para que pase correctamente los valores de los campos
 */
function Mytrim (myString)
{
return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')
} 

function ValidateInteger(e) {
	var keynum, keychar, numcheck;

	if(window.event) {// IE
		keynum = e.keyCode;
	} else if(e.which) {// Firefox/Opera
		keynum = e.which;
	}
	keychar = String.fromCharCode(keynum);
	numcheck = /\d/;
	return numcheck.test(keychar);
}

function ValidaAdicionales() {
	$('.adicional').each(function() {
		$('#' + $(this).attr('id') + '_val').val($(this).val());
	});
	return ValidaObligatorios();
}

function ValidaObligatorios() {
	var flag = true;
	$('.obligatorio').each(function() {
		$(this).siblings('span.errorValidacion').remove();
		if($(this).val() == '' || $(this).val() == null) {
			$(this).parent().append('<span class="errorValidacion">El campo <b>' + $('label[for=' + $(this).attr('id') + ']').text() + '</b> es obligatorio.</span>').focus();
			flag = false;
		}
	});
	
	/*
		$('.obligatorio').each(function() {
			alert(obligatorio);
		});
	*/
	
	if(flag)
		flag = ValidaCamposLlave();
	return flag;alert('s');
}

function ValidaCamposLlave() {
	var flag = true;
	$('.llave').each(function() {
		
		flag = ((flag)&& (ValidaLlave($(this).attr('rel'))));
	});
	return flag;
}

function ValidaLlave(id) {
	var resultado = true;
	var idcampo = $('#campo_llave' + id).val();
	var valor, nombre;
	var res='';
	var nombreUsr= '';
	if(idcampo == 0) {//es correo
		valor = $('#correo').val();
		nombre = $('label[for=correo]').html();
	} else {// es adicional
		valor = $('#campo' + id).val();
		nombre = $('label[for=campo' + id + ']').html();
	}
	valor = Mytrim(valor);
	$('#warning').html('Validando...').show();
	 $("#btnAceptar").attr("disabled","true");
     $("#btnAceptar").addClass("ui-button-disabled");
     $("#btnAceptar").addClass("ui-state-disabled");
	//alert('id:'+id+'\nidcampo:'+idcampo+'\nvalor:'+valor+'\nnombre:'+nombre);
	if(valor != '') {
		
		$.ajax({ async:false, cache: false,	dataType: 'html',
			url : '/privado/ajax/data_validaCamposLlave.dbsp?idprospecto='+idprospectoactual+'&idcampo='+idcampo+'&valor='+valor,
			success : function(data) {
				$("#DivResultado").html(data);
				res = $('#ResultadoValida').val();
				
				     $.ajax({ async:false, cache: false, dataType: 'html',
							url : '/privado/ajax/data_obtiene_usr.dbsp?idprospecto='+idprospectoactual+'&idcampo='+idcampo+'&valor='+valor,
							success : function(data) {
								$("#DivResultado2").html(data);
								nombreUsr = $('#PerteneceUsuario').val();
								  	 if(res < 0) {//correo invA­lido, desplegar mensaje
											$('#correo').parent().append('<span class="errorValidacion"><b>El correo es invA­lido; por favor verifique de nuevo.</b></span>').focus();
											resultado = false;
									 }
										
									if(res != '0') {//correo inv‹¨«lido, desplegar mensaje
											$('#warning').html('El prospecto <b>' + res + '</b> asignado a <b>' + nombreUsr + '</b> fue capturado con el mismo ' + nombre + '. Por favor revise la informaciA3n.').show('slow');
											$('#campo' + id).focus();
											resultado = false;
										} else {//llave ‹¨«nica no v‹¨«lida, desplegar mensaje
											resultado = true;
										}
										
									if(res=='-1'){
										$('#warning').html('').hide();
									}	
							}
						});
						
				
			}
		});
	
	}
	 $("#btnAceptar").removeAttr("disabled");
     $("#btnAceptar").removeClass("ui-button-disabled");
     $("#btnAceptar").removeClass("ui-state-disabled");
	return resultado;
}


$(document).ready(function() {
	
	$('input.fecha').datepicker(ConfiguracionPicker);

	var $CajaBotones = $('.caja.caja-botones');
	$CajaBotones.removeClass('caja caja-botones').addClass('BoxBotonesAccion').hide();
	
	var $btnAceptar = $('#btnAceptar');
	$btnAceptar.addClass('Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar')
	.html('<i class="fa fa fa-check"></i> '+$btnAceptar.text());
	
	var $btnCancelar = $('#btnCancelar');
	$btnCancelar.addClass('Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Cancelar')
	.html('<i class="fa fa fa-times"></i> '+$btnCancelar.text());
	setTimeout(function() {$CajaBotones.show();}, 500);
	
	setTimeout(function(){ $('.primercampo').focus(); }, 20);

	//para que no se pierda el formato cuando haya span.validationError
	$('.caja:even').css('clear', 'left');

	$('input, select, textarea').focus(function() {
		$(this).addClass('actual');
		$('label[for=' + $(this).attr('id') + ']').addClass('actual');
	}).blur(function() {
		$(this).removeClass('actual');
		$('label[for=' + $(this).attr('id') + ']').removeClass('actual');
	});

	$('input.naturalNumber').keyup(function() {
		this.value = this.value.replace(/[^0-9]/g, '');
	});

	$('input.decimalNumber').keyup(function() {
		this.value = this.value.replace(/[^0-9\.]/g, '');
	});

	$('input.numero').keyup(function() {
		this.value = this.value.replace(/[^0-9]/g, '');
	});

	$('input.decimal').keyup(function() {
		this.value = this.value.replace(/[^0-9\.]/g, '');
	});

	$('.llave').keyup(function() {
		$('#warning').hide('slow');
		$(this).siblings('.errorValidacion').remove();
	});


	var arrBoxbtn=$('.BoxBotonesAccion'); 
	arrBoxbtn.removeClass('BoxBotonesAccion');
	setTimeout(function() {arrBoxbtn.addClass('BoxBotonesAccion');}, 1000);
	

});//fin document ready

