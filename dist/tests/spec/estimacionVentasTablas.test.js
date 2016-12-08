describe('Json para enviar los datos de la tabla',function(){
	
	var oportunidades = new reportesOportunidades();

	var json =  [{"NO":3,"MonedaSimbolo":36,"Color":"Verde","Titulo":"Alta","Parametros":1,"Vencidos":"22673.6","Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"22673.6"},{"NO":2,"MonedaSimbolo":36,"Color":"Amarillo","Titulo":"Media","Parametros":2,"Vencidos":"10882.4","Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"10882.4"},{"NO":1,"MonedaSimbolo":36,"Color":"Rojo","Titulo":"Baja","Parametros":3,"Vencidos":"2389935.824","Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"2389935.824"}];
	var total =  3;
	var extra = 7 ;

	it('Genera tabla de estimación de ventas', function(){
	
		expect(oportunidades.generaObjetoTabla(json,extra,total)).not.toEqual([{"contador":1,"simbolo":36,"Color":"Amarillo","Titulo":"Media","Vencidos":"10882.4","Parametros":2,"Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"10882.4"},{"contador":2,"simbolo":36,"Color":"Rojo","Titulo":"Baja","Vencidos":"2389935.824","Parametros":3,"Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"2389935.824"}],'Le faltan parametros al objeto');

		expect(oportunidades.generaObjetoTabla(json,extra,total)).not.toEqual([{"contador":1,"simbolo":36,"Color":"Amarillo","Titulo":"Media","Vencidos":"10882.4","Parametros":2,"Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"10882.4"},{"contador":0,"simbolo":36,"Color":"Verde","Titulo":"Alta","Vencidos":"22673.6","Parametros":1,"Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"22673.6"},{"contador":2,"simbolo":36,"Color":"Rojo","Titulo":"Baja","Vencidos":"2389935.824","Parametros":3,"Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"2389935.824"}],'El orden del json no es el mismo');

		expect(oportunidades.generaObjetoTabla(json,extra,total)).not.toEqual([{"contador":1,"simbolo":36,"Color":"Amarillo","Titulo":"Media","Vencidos":"10882.4","Parametros":2,"Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"10882.4"}],'El objeto esta incompleto');

		expect(oportunidades.generaObjetoTabla(json,extra,total)).not.toEqual([{"contador":1,"simbolo":36,"Color":"Amarillo","Titulo":"Media","Vencidos":"10882.4","Parametros":2}],'El objeto esta incompleto y trae los datos incorrectos');

		expect(oportunidades.generaObjetoTabla(json,extra,total)).not.toEqual([{"contador":1}],'El objeto y los datos estan incompletos');

		expect(oportunidades.generaObjetoTabla(json,extra,total)).not.toEqual([{}],'El objeto esta vacio');

		expect(oportunidades.generaObjetoTabla(json,extra,total)).not.toBe(null,'La función no devuelve nada');

		expect(oportunidades.generaObjetoTabla(json,extra,total)).not.toEqual(null,'El es nulo');

		expect(oportunidades.generaObjetoTabla(json,extra,total)).toBeDefined('Se espera que el objeto este definido');

		expect(oportunidades.generaObjetoTabla(json,extra,total)).toEqual([{"contador":0,"simbolo":36,"Color":"Verde","Titulo":"Alta","Vencidos":"22673.6","Parametros":1,"Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"22673.6"},{"contador":1,"simbolo":36,"Color":"Amarillo","Titulo":"Media","Vencidos":"10882.4","Parametros":2,"Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"10882.4"},{"contador":2,"simbolo":36,"Color":"Rojo","Titulo":"Baja","Vencidos":"2389935.824","Parametros":3,"Dato0":"0","Dato1":"0","Dato2":"0","Dato3":"0","Dato4":"0","Dato5":"0","Dato6":"0","Futuros":"0","Total":"2389935.824"}],'El objeto es diferente');
	});
});