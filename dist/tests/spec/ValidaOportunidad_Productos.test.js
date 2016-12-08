
describe('ValidaOportunidad_con_Productos', function() {

    var Op          = new Oportunidades();
    var peticion 	= (new Date()).getTime();
    var idProspecto = 91329;
    var json;
    var idoportunidad = 0;
    var datos       = 'IDPROSPECTO='+idProspecto
                    +'&concepto=Mi+Nueva+Oportunidad+con+Productos'
                    +'&idfase=228'
                    +'&idlinea=99'
                    +'&monto=3951'
                    +'&comision_monto=177'
                    +'&comision=448'
                    +'&cierreestimado=30%2F06%2F2016'
                    +'&certeza=0.1'
                    +'&cotizacion='
                    +'&amazon=1'
                    +'&pesokb=0'
                    +'&seguimiento=Mi+nueva+oportunidad+con+productos'
                    +'&PlantillaSeleccionada='
                    +'&PlantillaNombre='
                    +'&jsonDatosDocumento='
                    +'&NombreArchivoSugerido='
                    +'&DescripcionArchivo='
                    +'&tieneCotizacion=0'
                    +'&DocumentoCotizacion='
                    +'&tProductos=1'
                    +'&OpcionMostrar=1'
                    +'&ltComision=59%2C118%2C'
                    +'&ltIdProducto=12105%2C12106'
                    +'&ltDescripcion=Producto+bien%2Cnuevo+'
                    +'&ltCantidad=1%2C1'
                    +'&ltPrecio=1000%2C2000'
                    +'&indiceComision=1'
                    +'&ltNombrePrecio=4%2C4'
                    +'&ltIndices=1%2C2%2C3%2C'
                    +'&ltImpuesto=128%2C100%2C89%2C%7C256%2C200%2C178%2C%7C'
                    +'&ltMontoSubtotal=1000%2C2000%2C'
                    +'&ltMontoDescuento=0%2C0%2C'
                    +'&ltMontoTotal=1000%2C2000%2C'
                    +'&DESCUENTO=0'
                    +'&DESCUENTO_PCT=0'
                    +'&SUBTOTAL=3000'
                    +'&TOTAL=3951'
                    +'&JSON_SUBTOTALES=%7B%22Cotizacion%22%3A%5B%7B%22DATO%22%3A%22Subtotal%22%2C%22VALOR%22%3A%22%E2%82%AC3.000%2C00%22%2C%22CAMPO%22%3A%22SUBTOTAL%22%2C%22CANTIDAD%22%3A%223000%22%2C%22MONEDA%22%3A%22EUR%22%2C%22MONEDA_LETRAS%22%3A%22Euros%22%7D%2C%7B%22DATO%22%3A%22Descuento_PCT%22%2C%22VALOR%22%3A%220%25%22%2C%22CAMPO%22%3A%22DESCUENTO_PCT%22%2C%22CANTIDAD%22%3A%220%22%2C%22MONEDA%22%3A%22EUR%22%2C%22MONEDA_LETRAS%22%3A%22Euros%22%7D%2C%7B%22DATO%22%3A%22Descuento%22%2C%22VALOR%22%3A%22%E2%82%AC0%2C00%22%2C%22CAMPO%22%3A%22DESCUENTO%22%2C%22CANTIDAD%22%3A%220%22%2C%22MONEDA%22%3A%22EUR%22%2C%22MONEDA_LETRAS%22%3A%22Euros%22%7D%2C%7B%22DATO%22%3A%22IVA%22%2C%22VALOR%22%3A%22%E2%82%AC384%2C00%22%2C%22CAMPO%22%3A%22IMPUESTO1%22%2C%22CANTIDAD%22%3A%22384%22%2C%22MONEDA%22%3A%22EUR%22%2C%22MONEDA_LETRAS%22%3A%22Euros%22%7D%2C%7B%22DATO%22%3A%22ISP%22%2C%22VALOR%22%3A%22%E2%82%AC300%2C00%22%2C%22CAMPO%22%3A%22IMPUESTO2%22%2C%22CANTIDAD%22%3A%22300%22%2C%22MONEDA%22%3A%22EUR%22%2C%22MONEDA_LETRAS%22%3A%22Euros%22%7D%2C%7B%22DATO%22%3A%22nuevo%22%2C%22VALOR%22%3A%22%E2%82%AC267%2C00%22%2C%22CAMPO%22%3A%22IMPUESTO3%22%2C%22CANTIDAD%22%3A%22267%22%2C%22MONEDA%22%3A%22EUR%22%2C%22MONEDA_LETRAS%22%3A%22Euros%22%7D%2C%7B%22DATO%22%3A%22Total+(EUR)%22%2C%22VALOR%22%3A%22%E2%82%AC3.951%2C00%22%2C%22CAMPO%22%3A%22TOTAL%22%2C%22CANTIDAD%22%3A%223951%22%2C%22MONEDA%22%3A%22EUR%22%2C%22MONEDA_LETRAS%22%3A%22Euros%22%7D%5D%7D'
                    +'&DECOTIZACION=2'
                    +'&idempresamoneda=1387'
                    +'&tipocambio=1'
                    +'&impuestosMonto=951'
                    +'&ltFecha_ini=28%2F6%2F2016%2C28%2F6%2F2016%2C'
                    +'&ltFecha_fin=29%2F6%2F2016%2C29%2F6%2F2016%2C'
                    +'&ltNoches=1%2C1%2C'
                    +'&ltDescuentos=0%2C0%2C'
                    +'&ltDescuentos_Porc=0%2C0%2C'
                    +'&ltComentarios=%7C'
                    +'&idpeticion='+peticion;

        Op.insertaOportunidad(datos);

       	json                   = Op.obtiene_Id_Oportunidad('idprospecto='+idProspecto);
	
       	idoportunidad          = json[0].IDOPORTUNIDAD;
       	var jsonOportunidad    = Op.Obtiene_Datos_Oportunidad('idoportunidad='+idoportunidad);
        var jsonProductos      = Op.Obtiene_Productos_Oportunidad('idoportunidad='+idoportunidad);


    it('Valida concepto oportunidad', function() {
        expect('Mi Nueva Oportunidad con Productos').toBe(json[0].CONCEPTO);
    });

    it('Valida monto de la oportunidad', function() {
        expect('3951').toBe(json[0].MONTO);
    });

    it('Valida porcentaje de comision', function() {
        expect(4.48).toBe(json[0].COMISION);
    });

    it('Valida monto de la comision', function() {
        expect('177').toBe(json[0].COMISION_MONTO);
    });

    it('Valida cantidad de productos', function() {
        expect(2).toBe(_.size(jsonProductos), 'Existen mas productos');
    });

    it('Valida producto 1 (codigo, cantidad, comentario, costo, precio_usuario)', function() {
        expect('bien').toBe(jsonProductos[0].Codigo, 'No es codigo del producto');
        expect(1).toBe(jsonProductos[0].CANTIDAD, 'No es la cantidad correcta');
        expect('').toBe(jsonProductos[0].COMENTARIO, 'No es el comentario correcto');
        expect('900').toBe(jsonProductos[0].Costo, 'No es el costo correcto');
        expect('1000').toBe(jsonProductos[0].PRECIO_USUARIO, 'No es el precio usuario correcto');                
    });

     it('Valida producto 2 (codigo, cantidad, comentario, costo, precio_usuario)', function() {
        expect('nuevo con .').toBe(jsonProductos[1].Codigo, 'No es codigo del producto');
        expect(1).toBe(jsonProductos[1].CANTIDAD, 'No es la cantidad correcta');
        expect('').toBe(jsonProductos[1].COMENTARIO, 'No es el comentario correcto');
        expect('100.9').toBe(jsonProductos[1].Costo, 'No es el costo correcto');
        expect('2000').toBe(jsonProductos[1].PRECIO_USUARIO, 'No es el precio usuario correcto');                
    });



});

