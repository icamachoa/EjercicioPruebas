
describe('Valida_Meta', function() {

    var Me         = new Metas();
    var datos      = 'Criterio=W10='
                   +'&ConfiguracionMeta=eyJUaXR1bG8iOiJDb250ZW8gZGUgT3BvcnR1bmlkYWRlcyIsImlkQ29tcG9uZW50ZSI6IjE0IiwidGlwb01ldGEiOiIzIiwidGlwb1BlcmlvZG8iOiI2IiwiZm9ybWF0byI6IjIifQ=='
                   +'&Meta=W3siaWRHcnVwbyI6IiIsImlkVXN1YXJpbyI6IjUxMTA2IiwiaWRFbXByZXNhRGlzdCI6IiIsIlBlcmlvZG8iOlt7Im1vbnRvTWV0YSI6MTAwMCwiZmVjaGFJbmljaW8iOiIxLzYvMjAxNiIsImZlY2hhRmluIjoiMzAvNi8yMDE2In1dfV0=';
    var json;
    var jsonMeta;
    var oportunidades = 0;
    var idMeta        = 0;

    json              = Me.obtiene_num_oportunidades();
    Me.crearMeta(datos);
    oportunidades     = json[0].OPORTUNIDADES;
    idMeta            = json[0].IDMETA_ACTUAL;

    jsonMeta          = Me.obtieneMeta('IDMETAS='+(idMeta+1)).jsonDatos;

        console.log(jsonMeta);

    it('Valida creacion meta', function() {
        expect(1).toBe(_.size(jsonMeta), 'No se ha creado la meta');
    });
    
    it('Descripcion meta', function() {
        expect('Conteo de Oportunidades').toBe(jsonMeta[0].DESCRIPCION, 'Descripcion no coincide');
    });

    it('Valida cantidad de meta', function() {
        expect(1000).toBe(jsonMeta[0].META, 'La cantidad de la meta es incorrecta');
    });

    it('Valida avance de meta', function() {
        expect(oportunidades).toBe(jsonMeta[0].AVANCE, 'El calculo de avance es incorrecto');
    });

    it('Valida avance de meta- Forma 2', function() {
        expect(SalesUp.Variables.numOportunidades+2).toBe(jsonMeta[0].AVANCE, 'El calculo de avance es incorrecto');
    });
    
    it('Valida porcentaje de avance de meta', function() {
        expect(oportunidades/1000).toBe(jsonMeta[0].PCT, 'El calculo deL porcentaje de la meta es incorrecta');
    });

});