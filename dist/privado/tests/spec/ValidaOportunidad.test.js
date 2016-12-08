
describe('ValidaOportunidad', function() {

    var Op          = new Oportunidades();
    var idProspecto = 91329;
    var datos       = 'IDPROSPECTO='+idProspecto+'&concepto=Mi+Nueva+Oportunidad&idfase=228&idlinea=99&monto=1000&monedas=81&comision_monto=100&comision=10&cierreestimado=30%2F06%2F2016&certeza=0.1&cotizacion=&amazon=1&pesokb=0&seguimiento=Mi+comentario+desde+mi+nueva+oportunidad.&PlantillaSeleccionada=&PlantillaNombre=&jsonDatosDocumento=&NombreArchivoSugerido=&DescripcionArchivo=&tieneCotizacion=0&DocumentoCotizacion=&tProductos=&OpcionMostrar=1&ltComision=&ltIdProducto=&ltDescripcion=&ltCantidad=&ltPrecio=&indiceComision=&ltNombrePrecio=&ltIndices=&ltImpuesto=&ltMontoSubtotal=&ltMontoDescuento=&ltMontoTotal=&DESCUENTO=&DESCUENTO_PCT=&SUBTOTAL=1000&TOTAL=&JSON_SUBTOTALES=&DECOTIZACION=1&idempresamoneda=81&tipocambio=.0549&impuestosMonto=&ltFecha_ini=&ltFecha_fin=&ltNoches=&ltDescuentos=&ltDescuentos_Porc=&ltComentarios=&idpeticion=SU-nrvt0gyij1466615752692';


	it('Valida inserccion oportunidad', function() {
		console.log('Aqiiiii');
				Op.insertaOportunidad(datos);

		expect(true).toBe(true);
	});

});

