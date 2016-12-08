SalesUp.Variables.EsUnico = function(Op){
	var $Elemento = $(Op.Elemento);
	var noCuenta;
	var Pasa = true;
	noCuenta = ( ($Elemento.hasClass('selectize-control') ) || ( $Elemento.hasClass('selectize-dropdown') ) );
	
	if(!noCuenta){
		var Valor = Op.Valor;
		
		if(!_.isEmpty(Valor)){
			
			var IdCampo = $Elemento.attr('idc');
			var IdProspecto = $('#IdProspecto').val();
			var Campo = $Elemento.prev().html();
			var Post = {v:Valor, idc:IdCampo, idp: IdProspecto };
			var txtDescartado = '';
			
			SalesUp.Variables.jsonUnico = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonValidaUnico.dbsp', Parametros:Post, DataType:'json', Div:0 });
			if( _.size(SalesUp.Variables.jsonUnico.jsonDatos[0]) > 0 ){
				Pasa = false;
				
				(SalesUp.Variables.jsonUnico.jsonDatos[0].Descartado==1) ? txtDescartado = ' <b style="color:red;">[Descartado]</b> ' : '';

				var Mensaje = 'El prospecto <b>' + SalesUp.Variables.jsonUnico.jsonDatos[0].Prospecto + '</b>';
				Mensaje = Mensaje + txtDescartado+' asignado a <b>' + SalesUp.Variables.jsonUnico.jsonDatos[0].Usuario;
				Mensaje = Mensaje + '</b> fue capturado con el mismo <b>' + Campo + '</b>. Por favor revise la información.';

				SalesUp.Construye.MuestraMsj({tMsg:3, Destino:'body', Msg:Mensaje, NoCerrar:true });
				SalesUp.Valida.MarcarObligatorio($Elemento);
				SalesUp.Valida.FocusMal();
				return Pasa;
			}else{ return Pasa; }
		}else{ return Pasa; }
	}else{ return Pasa; }
}/* /EsUnico */

SalesUp.Variables.ValidaCamposUnicos = function(Op){
	var Pasa = true; DentroDe = '';
	(_.isUndefined(Op)) ? Op = {} : '';
	(Op.DentroDe) ? DentroDe = Op.DentroDe:'';
	$(DentroDe + '.InfoUnico').each(function(){
		Pasa = SalesUp.Variables.EsUnico({ Elemento: this, Valor: $(this).val() });
		if(!Pasa){return Pasa;}
	});
	return Pasa;
}/* /ValidaCamposUnicos */


