describe('ValidadorDeConversion', function() {

	var Vc = new SistemaDefault();
	
	it('Test de conversor', function() {
 		expect(
			Vc.FormatoMinutos({"Minutos":120,"Tipo":"h"})
		).toEqual(2, "Esperaba recibir 2 horas.");
 
 		expect(
			Vc.FormatoMinutos({"Minutos":90,"Tipo":"h"})
		).toEqual('1.50',"Esperaba recibir una hora con cincuenta minutos.");
		
		expect(
			Vc.FormatoMinutos( {"Minutos":1440,"Tipo":"h"})
		).toEqual(24,"Esperaba recibir 24 horas");

		expect(
			Vc.FormatoMinutos({"Minutos":1440,"Tipo":"d"})
		).toEqual(1,"Esperaba recibir un dia");
		
		expect(
			Vc.FormatoMinutos({"Minutos":20160,"Tipo":"d"})
		).toEqual(14,"Esperaba recibir 14 dias");

		expect(
			Vc.FormatoMinutos({"Minutos":10080,"Tipo":"d"})
		).toEqual(7,"Esperaba recibir 7 dias");

		expect(
			Vc.FormatoMinutos({"Minutos":10080,"Tipo":"sem"})
		).toEqual(1,"Esperaba recibir una semana");

		expect(
			Vc.FormatoMinutos({"Minutos":20160,"Tipo":"sem"})
		).toEqual(2,"Esperaba recibir dos semanas");

		expect(
			Vc.FormatoMinutos({"Minutos":302400,"Tipo":"sem"})
		).toEqual(30,"Esperaba recibir 30 semanas");

		expect(
			Vc.FormatoMinutos({"Minutos":525600,"Tipo":"m"})
		).toEqual('12.17',"Esperaba recibir 12 meses");
		
		expect(
			Vc.FormatoMinutos({"Minutos":173000,"Tipo":"m"})
		).toEqual('4.00',"Esperaba recibir 4 meses");
	});
});