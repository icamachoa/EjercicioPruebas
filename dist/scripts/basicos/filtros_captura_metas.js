$(document).ready(function(){
	self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:290});
	self.parent.TamanioInicial();
	var randomTime = new Date();
	$('#ContenedorDetalle').html('<div id="cargando"></div>');
	var Tipo = $('#FiltroTipo').val();
	    $('#ContenedorDetalle').load('/privado/ajax/selects_metas.dbsp', {
	        ajax: 1,
	        tipo: Tipo,
	        randomTime: randomTime.getTime()
	    }, function(){
	    	$("#cargando").remove();
	    	if (Tipo==1) {
	    		$('#ejecutivos').change(function(){
	       		var ejecutivo = $('#ejecutivos').val();
	    		});
	       };
	       if (Tipo==2) {
	    		$('#grupos').change(function(){
	       		var grupos = $('#grupos').val();
	    		});
	       };
	    });
	    
	 var Periodo = $('#FiltroTipo2').val();
	    $('#periodo').load('/privado/ajax/selects_metas.dbsp', {	
	        ajax: 1,
	        periodo: Periodo
	    }, function(){
	    	if (Periodo==1) {
	    		$('input.fecha').datepicker(ConfiguracionPicker);
	       };
	       if (Periodo==2) {	    		
	    		$("input#enejun").blur(function(){					
	    			$("input#juldic").val( $("input#enejun").val());
	    		});
	       };
	       if (Periodo==3) {
	    		$("input#enemar").blur(function(){
	    			$("input#abrjun").val( $("input#enemar").val());
	    			$("input#julsep").val( $("input#enemar").val());
	    			$("input#octdic").val( $("input#enemar").val());
	    		});
	       };
	       if (Periodo==4) {
	    		$("input#eneabr").blur(function(){
	    			$("input#mayago").val( $("input#eneabr").val());
	    			$("input#sepdic").val( $("input#eneabr").val());
	    		});
	       };
	       if (Periodo==5) {
	    		$("input#ene").blur(function(){
	    			$("input#feb").val( $("input#ene").val());
	    			$("input#mar").val( $("input#ene").val());
	    			$("input#abr").val( $("input#ene").val());
	    			$("input#may").val( $("input#ene").val());
	    			$("input#jun").val( $("input#ene").val());
	    			$("input#jul").val( $("input#ene").val());
	    			$("input#ago").val( $("input#ene").val());
	    			$("input#sep").val( $("input#ene").val());
	    			$("input#oct").val( $("input#ene").val());
	    			$("input#nov").val( $("input#ene").val());
	    			$("input#dic").val( $("input#ene").val());
	    		});
	       };
	    });
	    
	    
	    $('#FiltroTipo2').live('change', function(){

	    	$('#periodo').html('<div id="cargando"></div>');
	   	 	var Periodo = $('#FiltroTipo2').val();
	   	 	
	   	 	if(Periodo==5){self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:405});}
	   	 	if(Periodo!=5){self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Alto:290});}
	    	$('#periodo').load('/privado/ajax/selects_metas.dbsp', {	
	        ajax: 1,
	        periodo: Periodo
	    	}, function(){
	    	$("#cargando").remove();
	    	var meta=$('#Tipo_meta').val();

			if ((meta==102)|(meta==205)|(meta==308)|(meta==402)){
				$('#labelMeta').html('Conteo (cantidad)');
			}
			else{
				$('#labelMeta').html('Monto ($)');
			}
	    	if (Periodo==1) {
	    		$('input.fecha').datepicker(ConfiguracionPicker);
	       };
	       if (Periodo==2) {	    		
	    		$("input#enejun").blur(function(){					
	    			$("input#juldic").val( $("input#enejun").val());
	    		});
	       };
	       if (Periodo==3) {
	    		$("input#enemar").blur(function(){
	    			$("input#abrjun").val( $("input#enemar").val());
	    			$("input#julsep").val( $("input#enemar").val());
	    			$("input#octdic").val( $("input#enemar").val());
	    		});
	    		$("input#abrjun").blur(function(){
	    			$("input#julsep").val( $("input#abrjun").val());
	    			$("input#octdic").val( $("input#abrjun").val());
	    		});
	    		$("input#julsep").blur(function(){
	    			$("input#octdic").val( $("input#julsep").val());
	    		});
	       };
	       if (Periodo==4) {
	    		$("input#eneabr").blur(function(){
	    			$("input#mayago").val( $("input#eneabr").val());
	    			$("input#sepdic").val( $("input#eneabr").val());
	    		});
	    		$("input#mayago").blur(function(){
	    			$("input#sepdic").val( $("input#mayago").val());
	    		});
	       };
	       if (Periodo==5) {
	    		$("input#ene").blur(function(){
	    			$("input#feb").val( $("input#ene").val());
	    			$("input#mar").val( $("input#ene").val());
	    			$("input#abr").val( $("input#ene").val());
	    			$("input#may").val( $("input#ene").val());
	    			$("input#jun").val( $("input#ene").val());
	    			$("input#jul").val( $("input#ene").val());
	    			$("input#ago").val( $("input#ene").val());
	    			$("input#sep").val( $("input#ene").val());
	    			$("input#oct").val( $("input#ene").val());
	    			$("input#nov").val( $("input#ene").val());
	    			$("input#dic").val( $("input#ene").val());
	    		});
	    		$("input#feb").blur(function(){
	    			$("input#mar").val( $("input#feb").val());
	    			$("input#abr").val( $("input#feb").val());
	    			$("input#may").val( $("input#feb").val());
	    			$("input#jun").val( $("input#feb").val());
	    			$("input#jul").val( $("input#feb").val());
	    			$("input#ago").val( $("input#feb").val());
	    			$("input#sep").val( $("input#feb").val());
	    			$("input#oct").val( $("input#feb").val());
	    			$("input#nov").val( $("input#feb").val());
	    			$("input#dic").val( $("input#feb").val());
	    		});
	    		$("input#mar").blur(function(){
	    			$("input#abr").val( $("input#mar").val());
	    			$("input#may").val( $("input#mar").val());
	    			$("input#jun").val( $("input#mar").val());
	    			$("input#jul").val( $("input#mar").val());
	    			$("input#ago").val( $("input#mar").val());
	    			$("input#sep").val( $("input#mar").val());
	    			$("input#oct").val( $("input#mar").val());
	    			$("input#nov").val( $("input#mar").val());
	    			$("input#dic").val( $("input#mar").val());
	    		});
	    		$("input#abr").blur(function(){
	    			$("input#may").val( $("input#abr").val());
	    			$("input#jun").val( $("input#abr").val());
	    			$("input#jul").val( $("input#abr").val());
	    			$("input#ago").val( $("input#abr").val());
	    			$("input#sep").val( $("input#abr").val());
	    			$("input#oct").val( $("input#abr").val());
	    			$("input#nov").val( $("input#abr").val());
	    			$("input#dic").val( $("input#abr").val());
	    		});
	    		$("input#may").blur(function(){
	    			$("input#jun").val( $("input#may").val());
	    			$("input#jul").val( $("input#may").val());
	    			$("input#ago").val( $("input#may").val());
	    			$("input#sep").val( $("input#may").val());
	    			$("input#oct").val( $("input#may").val());
	    			$("input#nov").val( $("input#may").val());
	    			$("input#dic").val( $("input#may").val());
	    		});
	    		$("input#jun").blur(function(){
	    			$("input#jul").val( $("input#jun").val());
	    			$("input#ago").val( $("input#jun").val());
	    			$("input#sep").val( $("input#jun").val());
	    			$("input#oct").val( $("input#jun").val());
	    			$("input#nov").val( $("input#jun").val());
	    			$("input#dic").val( $("input#jun").val());
	    		});
	    		$("input#jul").blur(function(){
	    			$("input#ago").val( $("input#jul").val());
	    			$("input#sep").val( $("input#jul").val());
	    			$("input#oct").val( $("input#jul").val());
	    			$("input#nov").val( $("input#jul").val());
	    			$("input#dic").val( $("input#jul").val());
	    		});
	    		$("input#ago").blur(function(){
	    			$("input#sep").val( $("input#ago").val());
	    			$("input#oct").val( $("input#ago").val());
	    			$("input#nov").val( $("input#ago").val());
	    			$("input#dic").val( $("input#ago").val());
	    		});
	    		$("input#sep").blur(function(){
	    			$("input#oct").val( $("input#sep").val());
	    			$("input#nov").val( $("input#sep").val());
	    			$("input#dic").val( $("input#sep").val());
	    		});
	    		$("input#oct").blur(function(){
	    			$("input#nov").val( $("input#oct").val());
	    			$("input#dic").val( $("input#oct").val());
	    		});
	    		$("input#nov").blur(function(){
	    			$("input#dic").val( $("input#nov").val());
	    		});
	       };
	       if (Periodo==6) {
	    		$('input.fecha').datepicker(ConfiguracionPicker);
	       };
	       if (Periodo==7) {
	    		$('input.fecha').datepicker(ConfiguracionPicker);
	       };
	    });/**/
	});
	
	$('#FiltroTipo').live('change', function(){
	  	$('#ContenedorDetalle').html('<div id="cargando"></div>');
	    var Tipo = $('#FiltroTipo').val();
	    $('#ContenedorDetalle').load('/privado/ajax/selects_metas.dbsp', {	
	        ajax: 1,
	        tipo: Tipo
	    }, function(){
	    	$("#cargando").remove();
	    	if (Tipo==1) {
	    		$('#ejecutivos').change(function(){
	       		var ejecutivo = $('#ejecutivos').val();	
	    		});
	       };
	       if (Tipo==2) {
	    		$('#grupos').change(function(){
	       		var grupos = $('#grupos').val();
	    		});
	       };
	    });
});
	
});

