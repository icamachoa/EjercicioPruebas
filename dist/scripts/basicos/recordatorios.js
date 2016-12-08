

    var avisar = 0;
	var TIEMPO_REVISION = 300000;
	var TIEMPO_AVISO = 1800000;


	function RevisaAlerta()
	{
		
     $('#msesion').load('recordatorio_avisar.dbsp?ajax=1', {}, function(){
	    var avisar = $('#msesion').html();
	  
       $('#ralerta').load('recordatorio_busca_alerta.dbsp?ajax=1', {}, function(){
 	     var dif = $('#ralerta').html();
		 //alert(dif+'-'+TIEMPO_AVISO+' '+avisar+' '+TIEMPO_REVISION);
		
  	     if ((dif<=TIEMPO_AVISO) && (avisar==1) && (dif>(TIEMPO_AVISO-TIEMPO_REVISION))){
		   dif = TIEMPO_REVISION;
   	       MuestraAlerta();//alert('entro 1');
		 }
		 else{
  	       if ((dif<=TIEMPO_REVISION) && (avisar==1) ){
   	         MuestraAlerta();//alert('entro');
 		   }
		 }

   	     if (dif > TIEMPO_REVISION)
 	       dif = TIEMPO_REVISION;
		   
   	     if (dif == '')
 	       dif = TIEMPO_REVISION;

   	     if (dif <= 60000)
 	       dif = TIEMPO_REVISION;
		   
	     $('#malerta').html(dif);
         setTimeout('RevisaAlerta()',dif)
 	   });
	 });
	}
	
	
	function MuestraAlerta()
	{
	 	 $('#msesion').load('recordatorio_muestraalerta.dbsp?ajax=1');
	}
	

	$(document).ready(function(){
		RevisaAlerta();
		//MuestraAlerta();
    });



