
describe('ValidadorDeFases', function() {
	var fs = new lasFases();

	var objFases = [
		{"TABLA":1,"FASE":"Cotizado","FASECLIENTE":0,"ORDEN":1},
		{"TABLA":1,"FASE":"Esperando aprobacion","FASECLIENTE":0,"ORDEN":2},
		{"TABLA":1,"FASE":"Pospuesta","FASECLIENTE":0,"ORDEN":3},
		{"TABLA":1,"FASE":"Demo desarrollo 1.0","FASECLIENTE":0,"ORDEN":4},
		{"TABLA":1,"FASE":"Oportunidades Fases2","FASECLIENTE":0,"ORDEN":5},
		{"TABLA":1,"FASE":"fasecanalizado","FASECLIENTE":0,"ORDEN":6}];
	var str = '';
		str += JSON.stringify(objFases)+'|';
		str = encodeURIComponent(str);
	SalesUp.Sistema.CargaDatos({
		Link:'/privado/Modelo/jsonPruebas.dbsp',
		Parametros:'JSON='+str, 
		DataType:'json'
	});	
	// var algo = fs.validaFasesProspecto(objFases);
	// console.log(algo)
	it('Empezando fases', function() {
		expect( fs.validaFasesProspecto(objFases) ).toBeTruthy();
	});
});

