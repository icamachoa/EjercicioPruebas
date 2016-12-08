


describe ('Productos', function (){

					var productos = SalesUp.Sistema.CargaDatos({
						Link: '/privado/modelo/jsonBuscarProductos.dbsp',
						Parametros: 'buscar=nuevo',
						DataType: 'json'
					}).jsonDatos;

   console.log(productos);

   var jsonEsperado = [{"Nombre":"Mario."}];

   console.log(jsonEsperado);

	it('Debe por lo menos existir un producto', function (){
		//expect(jsonEsperado).toEqual(productos);
		
		
		expect(productos[0].idProducto).toBeDefined('No existe el campo nombre');
	})

})

