describe('Clone function', function() {

	it('Clona Objetos', function() {
		expect(typeof clone).toEqual('function','La funcion no existe');
		
		var employeesJson = {"employees":[
		    {"firstName":"John", "lastName":"Doe"},
		    {"firstName":"Anna", "lastName":"Smith"},
		    {"firstName":"Peter", "lastName":"Jones"}
		]};

		var employeesJsonClone = clone(employeesJson)
		expect(employeesJsonClone).toEqual(employeesJson,'Deberia haber clonado el objeto employeesJson');

		var objectHome = {
		    "id": 1,
		    "name": "A green door",
		    "price": 12.50,
		    "tags": ["home", "green"]
		}
		var objectHomeClone = clone(objectHome)
		expect(objectHomeClone).toEqual(objectHome,'Deberia haber clonado el objeto objectHome');
		
		var employeesJson = {"employees":[
		    {"firstName":"John", "lastName":"Doe"},
		    {"firstName":"Anna", "lastName":"Smith"},
		    {"firstName":"Peter", "lastName":"Jones"}
		]}
		var employeesJsonMod = employeesJson;
		var employeesJsonClone = clone(employeesJson);

		employeesJsonMod.employees[0] = {};
		console.log(employeesJsonMod);
		console.log(employeesJson);
		console.log(employeesJsonClone);

		expect(employeesJsonClone).not.toEqual(employeesJson,'Deberian ser Objetos diferentes(1)');
		// 
		var objectHome = {
		    "id": 1,
		    "name": "A green door",
		    "price": 12.50,
		    "tags": ["home", "green"]
		}

		var objectHomeMod = objectHome;
		var objectHomeClone = clone(objectHome);

		objectHomeMod.id = 3;
		console.log(objectHomeMod);
		console.log(objectHome);
		console.log(objectHomeClone);

		expect(objectHomeClone).not.toEqual(objectHome,'Deberian ser Objetos diferentes (2)');

		var nulo = null;
		var nuloClone = clone(nulo);
		expect(nuloClone).toEqual(nulo,'Deberia ser null');
	
		var Arrays = [0,'a','b','c',1,2,3];
		var ArraysClone = clone(Arrays);
		expect(ArraysClone).toEqual(Arrays,'Deberia ser un array');

		var Fecha = new Date;
		var FechaClone = clone(Fecha);
		expect(FechaClone).toEqual(Fecha, 'Deberia ser el objeto Date');

		var TextoSimple = "Hola :)";
		var TextoSimpleClone = clone(TextoSimple);
		expect(TextoSimpleClone).toEqual(TextoSimple,'Deberia ser el mismo texto');

		var Funcion = function(e){return e};
		var FuncionClone = clone(Funcion);
		expect(FuncionClone).toEqual(Funcion,'Deberia ser la misma funcion');
	}); 

});