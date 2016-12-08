/*

  - En el before all es pimportante fijar un intervalo para la prueba total.
  - Ser cuidadoso de pasar la variable "done" para cada it y llamarla al final de la prueba, de lo contrario generará errores de TIMEOUT.

*/


// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


describe("Agrega un elemento nuevo ", function() {

    beforeAll(function(done) {
        jasmine.DEFAULT_TIMEOUT_INTERVAL= 25000;
        done();
    });
    
    var txt = 'zzz999';
    var variable;

    it('Verificando agregar', function(done) {
      
        sleep(2000).then (function () {
          $('.BoxBotones span').click();    
        });
        sleep(5000).then(function() {
          $('#TB_iframeContent').contents().find('#fase').val( txt );
          $('#TB_iframeContent').contents().find('#btnAceptar').click();             
        });

        sleep(8000).then(function(){
           variable = $('tr:last-child b').eq(1).text();
           variable = variable.trim();
           expect(variable).toEqual(txt);
           done();
        });
   
    });

    it ('Verificando modificar', function(done) {

        $('tr:last-child b').eq(1).click();
        txt = txt + '10';

        sleep(2000).then(function(){
          $('#TB_iframeContent').contents().find('#fase').val( txt );
          $('#TB_iframeContent').contents().find('#btnAceptar').click();     
        });

        sleep(4000).then(function(){
            variable = $('tr:last-child b').eq(1).text();
            variable = variable.trim();
            expect(variable).toEqual(txt);
            done();
        });

    });

    it ('Verificando eliminar', function(){

      


    });
  
});



