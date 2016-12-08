Handlebars.registerHelper('Tipo', function(tipo,TipoCuenta) {
  	var resultado = ''

  	if(tipo == 1){
  		resultado = 'Salida';
  	}else if(tipo == 2){
  		resultado = 'Entrada';
  	}else if(tipo == 3){
  		resultado = 'Entrada/Salida';
  	}

  	return resultado;
});

Handlebars.registerHelper('Predeterminada', function(idusuariocorreo,predeterminado,predefinida) {
    var resultado = ''

    if(predeterminado != 1){
     // resultado = '<span class="Pointer" onclick="SalesUp.Variables.Predeterminar('+idusuariocorreo+');"><i class="fa fa-lg fa-check Tip6" tip="Poner como predeterminada" original-title=""></i></span>';
     resultado = ''
    }else{
      resultado = '<span class="Verde"><i class="fa fa-lg fa-check Tip6" tip="Predeterminada" original-title=""></i></span>';
    }

    return resultado;
});

Handlebars.registerHelper('ponerPredeterminada', function(idusuariocorreo,predeterminado,predefinida) {
    var resultado = ''

    if(predeterminado != 1){
      resultado = '<span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.Predeterminar('+idusuariocorreo+');"><i class="fa fa-lg fa-check Tip6" tip="Poner como predeterminada" original-title=""></i> Poner como predeterminada </span>';
    }else{
      
      //resultado = '<span class="Verde"><i class="fa fa-lg fa-check Tip6" tip="Predeterminada" original-title=""></i></span>';
    }

    return resultado;
});

Handlebars.registerHelper('Config', function(idusuariocorreo,tipo,configuracion) {
    var resultado = ''

    if(tipo == 1 || tipo == 3){
      resultado = '<span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.ConfigurarCuenta({e:this});" data-idusuariocorreo="'+idusuariocorreo+'"><i class="fa fa-lg fa-cog Tip6" tip="Configuraciones extra" original-title=""></i> Configuraciones extra</span>';
    }else{
      resultado = '';
    }

    return resultado;
});

$(function(){
	SalesUp.Variables.CargaInterfaz();
});

SalesUp.Variables.Predeterminar = function(idusuariocorreo){
  SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryPredeterminarCuenta.dbsp',Parametros:'idusuariocorreo='+idusuariocorreo});
  SalesUp.Variables.CargaInterfaz();
};

SalesUp.Variables.CargaInterfaz = function(){
  var Tipo           = $('#TipoCuenta').val();
	var datosCuentas 	 = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonDatosCuentas.dbsp',Parametros:'tipo='+Tipo,DataType:'json'}).jsonDatos;
	var templateHeader = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateCuentasCorreos.dbsp',Parametros:'thead=1'});
	var templateCuerpo = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateCuentasCorreos.dbsp',Parametros:'thead=0'});

	SalesUp.Construye.ConstruyeTabla(templateHeader, templateCuerpo, datosCuentas, {Destino:'#DatosLoad', Id:'TablaDatos'} );
}

SalesUp.Variables.AgregarCuenta = function(){
    SalesUp.Ventana.AgregarCuenta();
}

SalesUp.Variables.EditarCuentaCorreo = function(idusuariocorreo,proveedor){
	if(proveedor != 1111){
		SalesUp.Ventana.AgregarCuenta({idusuariocorreo:idusuariocorreo});
	}else{
		SalesUp.Construye.MuestraAlerta({
		    TipoAlerta:'AlertaModal',
		    Alerta:'<i class="fa fa-warning"></i> Las cuentas de gmail no se pueden editar.',
		    Boton1:'Aceptar',
		    Icono1:'<i class="fa fa-check"></i>',
		    Ancho:'100px'
		});
	}
};

SalesUp.Variables.ConfigurarCuenta = function(obj){
  var $elemento       = $(obj.e);
  var idusuariocorreo = $elemento.data('idusuariocorreo');

  SalesUp.Construye.MuestraPopUp({
      alto:'370px', ancho:'750px',
      titulo:'Configuraciones extra',
      fuente:'/privado/popup-modificar-cuenta.dbsp?idusuariocorreo='+idusuariocorreo,
      callback:''
    }); 
};

SalesUp.Variables.EliminarCuenta = function(obj){
  SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryEliminaCuentaCorreo.dbsp',Parametros:'idusuariocorreo='+obj.id+'&predeterminado='+obj.predeterminado});
  SalesUp.Sistema.Relogin({ir:'cuentas_correo.dbsp'});
};

SalesUp.Variables.AlertaEliminarCuenta = function(obj){
  var $eliminar       = $(obj.e);
  var idusuariocorreo = $eliminar.data('idusuariocorreo');
  var predeterminado  = $eliminar.data('predeterminado');

  var Funcion = 'SalesUp.Variables.EliminarCuenta';
  
  SalesUp.Construye.MuestraAlerta({
    TipoAlerta:'AlertaPregunta',
    Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> ¿Está seguro de eliminar la cuenta de correo?',
    Boton1:'Eliminar',
    Boton2:'Cancelar',
    Callback1: Funcion+'({id:'+idusuariocorreo+',predeterminado:'+predeterminado+'})',
    Icono1:'<i class="fa fa-trash"></i>',
    Icono2:'<i class="fa fa-times"></i>',
    Ancho:'500px'
  });
};

