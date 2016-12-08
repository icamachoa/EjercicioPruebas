describe ('Cambio tipo de cambio',function(){
	
	var num = 17;
	var tipoCambio = 1;

	it('Debe recalcular el tipo de cambio', function(){
		expect(SalesUp.Variables.CambiaTipoCambio(num,tipoCambio)).toEqual(tipoCambio/num));
	});
});
