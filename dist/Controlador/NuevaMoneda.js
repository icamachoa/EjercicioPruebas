var $IdMonedaSelectize, IdPaisSelectize, selectizeMoneda;

SalesUp.Variables.CambiaMoneda = function(_control){

	var _valor = $(_control + 'option:selected').html();

  $('#moneda').val(_valor);

	setTimeout(function(){
		$('#cambio').focus();
	},200);
};

SalesUp.Variables.EnviaForm = function(){
  var t=$('#cambio');
	var _pasa = SalesUp.Valida.ValidaObligatorios();
      _pasa=(_pasa)?SalesUp.Variables.numerosDecimales({t:t}):'';
	if(_pasa){
		$('#frmMoneda').submit();
	}
};


SalesUp.Variables.CargaDatos = function(_tk){
	var datos	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCargaMonedas.dbsp',Parametros:'tk='+_tk,DataType:'json', Div:0}).jsonDatos[0];
  var car = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});
  var tipoCambio = datos.TIPODECAMBIO;
  var entero = tipoCambio.split('.');
  var tamanio = entero[0].length;
  if (car == ',') {
    tipoCambio = tipoCambio.replace('.',',')
  }
  if (tamanio == 0) {
    tipoCambio = '0'+tipoCambio;
  }
  $('#cambio').val(tipoCambio);
  $('#idpaises_monedas')[0].selectize.setValue(datos.IDPAISES_MONEDAS);
  $('#idmoneda').val(datos.IDMONEDA);
  $('#idmoneditar').val(datos.IDMONEDA);

	setTimeout(function(){ $('#cambio').select();},100);};

function imgError(image) {
    image.onerror = "";
    image.src = "../imagenes/banderas/noimg.jpeg";
    image.width='10';
    return true;
}
SalesUp.Variables.CargarMonedas=function(){
    var idmon=$('#tk').val();

	var jsonMonedas	= SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonMonedasDisponibles.dbsp', Parametros:'idmoneda='+idmon,  DataType:'json', Div:0}).jsonDatos;
	    jsonMonedas= _.reject(jsonMonedas, function(j){return _.size(j)==0;}); 
	var totalMonedas= _.size(jsonMonedas);
  SalesUp.Variables.json = jsonMonedas;

	if(totalMonedas!=0){
		if(selectizeMoneda){selectizeMoneda.destroy();	}
		var bandera=function(){

		}
     
	 $IdMonedaSelectize = $('#idpaises_monedas').selectize({
          maxItems:1,
          plugins: ['remove_button'],
          options:jsonMonedas,
          valueField:'ID',
          searchField:['MONEDA', 'IDMONEDA', 'PAIS', 'ID'] ,
          labelField:'MONEDA',
          sortField:'IDMONEDA',
          render:{
         	option: function(item, escape) { 
         	var img = '<img width="15" height="10" onerror="imgError(this)" src="../imagenes/banderas/'+item.BANDERA+'"></img>';
	         return '<div class="contenido"> '+img+'  <div class="nombreMoneda">'+item.PAIS+' '+item.MONEDA+' ('+item.IDMONEDA+') </div><div class="nompais">'+item.IDMONEDA+'</div></div>';
        	 }
         },
          onChange: function(value, I){

          var  valor = parseInt(value);
          	var nombreMoneda=_.where(SalesUp.Variables.json, {ID:valor});   
          	
          	var idMoneda = nombreMoneda[0].IDMONEDA;
          	nombreMoneda = nombreMoneda[0].MONEDA;

		      //$('#idmoneda option:selected').attr('value', idMoneda);
             $('#idmoneda').val(idMoneda);
             $('#idmoneditar').val(idMoneda);
          	 $('#moneda').val(nombreMoneda);

          }
       });
	  selectizeMoneda = $IdMonedaSelectize[0].selectize;

      selectizeMoneda.setValue(idmon);
	 $('.selectize-control').addClass('InfoData InfoObligatorio');
	}    
}

$(document).ready(function() {
		SalesUp.Variables.CargarMonedas();
		
		var _tk= $('#tk').val();
    	if(_tk != 0){SalesUp.Variables.CargaDatos(_tk);}
    	setTimeout(function(){$('#cambio').focus();},100);

	SalesUp.Variables.CambiaMoneda(this);
});
