describe('Json',function(){
	
	var oportunidades = new reportesOportunidades();

	it('Test devolver json para generar Tabla', function(){

		var json =  [{"NO":3,"MonedaSimbolo":36,"Color":"Verde","Titulo":"Alta","Parametros":1,"Vencidos":"22673.6","Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"22673.6"},{"NO":2,"MonedaSimbolo":36,"Color":"Amarillo","Titulo":"Media","Parametros":2,"Vencidos":"10882.4","Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"10882.4"},{"NO":1,"MonedaSimbolo":36,"Color":"Rojo","Titulo":"Baja","Parametros":3,"Vencidos":"2389935.824","Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"2389935.824"}];
		var total =  3;
		var extra = 7 ;

		expect(oportunidades.generaObjetoTabla(json,extra,total)).toEqual([{"contador":0,"simbolo":36,"Color":"Verde","Titulo":"Alta","Vencidos":"22673.6","Parametros":1,"Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"22673.6"},{"contador":1,"simbolo":36,"Color":"Amarillo","Titulo":"Media","Vencidos":"10882.4","Parametros":2,"Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"10882.4"},{"contador":2,"simbolo":36,"Color":"Rojo","Titulo":"Baja","Vencidos":"2389935.824","Parametros":3,"Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"2389935.824"}]);
		expect(oportunidades.generaObjetoTabla(json,extra,total)).not.toEqual([{"contador":1,"simbolo":36,"Color":"Amarillo","Titulo":"Media","Vencidos":"10882.4","Parametros":2,"Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"10882.4"},{"contador":2,"simbolo":36,"Color":"Rojo","Titulo":"Baja","Vencidos":"2389935.824","Parametros":3,"Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"2389935.824"}]);
		expect(oportunidades.generaObjetoTabla(json,extra,total)).not.toEqual([{"contador":1,"simbolo":36,"Color":"Amarillo","Titulo":"Media","Vencidos":"10882.4","Parametros":2,"Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"10882.4"},{"contador":0,"simbolo":36,"Color":"Verde","Titulo":"Alta","Vencidos":"22673.6","Parametros":1,"Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"22673.6"},{"contador":2,"simbolo":36,"Color":"Rojo","Titulo":"Baja","Vencidos":"2389935.824","Parametros":3,"Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"2389935.824"}]);
		expect(oportunidades.generaObjetoTabla(json,extra,total)).not.toEqual([{"contador":1,"simbolo":36,"Color":"Amarillo","Titulo":"Media","Vencidos":"10882.4","Parametros":2,"Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"10882.4"}]);
		expect(oportunidades.generaObjetoTabla(json,extra,total)).not.toEqual([{"contador":1,"simbolo":36,"Color":"Amarillo","Titulo":"Media","Vencidos":"10882.4","Parametros":2}]);
		expect(oportunidades.generaObjetoTabla(json,extra,total)).not.toEqual([{"contador":1}]);
		expect(oportunidades.generaObjetoTabla(json,extra,total)).not.toEqual([{}]);
		expect(oportunidades.generaObjetoTabla(json,extra,total)).not.toBe(null);
		expect(oportunidades.generaObjetoTabla(json,extra,total)).toBeDefined();
		expect(oportunidades.generaObjetoTabla(json,extra,total)).not.toEqual(null);
	});
});