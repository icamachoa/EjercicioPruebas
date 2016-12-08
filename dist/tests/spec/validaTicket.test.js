localStorage.clear();
jasmine.DEFAULT_TIMEOUT_INTERVAL =15000;
var testing = (window.opener != null) ? window.opener.test : null, arrTest = [], respTest;



// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


var insertaInfo = function(){
  $('#asunto').val('Test #'+Math.floor(1000 + Math.random() * 9000));
  $('#descripcion').val('Prueba de crear tickets o comentar tickets');
  $('#departamento').val(1);
  
  var asunto       = $('#asunto').val();
  var descripcion  = $('#descripcion').val();

  var departamento = $('#departamento').val();
   
  SalesUp.Variables.objComparar = {"asunto":asunto,"descripcion":descripcion,"departamento":departamento};
  $('#btnAceptar').click();
}

var comparaInformacion = function(){
  var pasa = '';
  SalesUp.Variables.resultado = SalesUp.Sistema.CargaDatos({
    Link: '/privado/Modelo/jsonTicket.dbsp',
    Parametros:'ESTATUS=0&inicio=1',
  });
  SalesUp.Variables.resultado = JSON.parse(SalesUp.Variables.resultado);
  (_.size(SalesUp.Variables.resultado)>0) ? pasa = true : pasa = false;

  return pasa;
}

var validaDatosInsertados = function(){
  var pasa = false;
  if(SalesUp.Variables.resultado.jsonDatosCuerpo[0].ASUNTO == SalesUp.Variables.objComparar.asunto && SalesUp.Variables.resultado.jsonDatosCuerpo[0].DESCRIPCION == SalesUp.Variables.objComparar.descripcion && SalesUp.Variables.resultado.jsonDatosCuerpo[0].IDDEPARTAMENTO == parseInt(SalesUp.Variables.objComparar.departamento)){
    pasa = true;
    SalesUp.Variables.tkt          = SalesUp.Variables.resultado.jsonDatosCuerpo[0].TKT;
    SalesUp.Variables.idcomentario = SalesUp.Variables.resultado.jsonDatosCuerpo[0].IDTICKET;
    SalesUp.Sistema.CargaDatos({
      Link: '/privado/Modelo/jsonComentarioEjecutivoTicket.test.dbsp',
      Parametros:'idcomentario='+SalesUp.Variables.idcomentario,
    });
  }
  return pasa;
}

 
var validaPopup = function(elemento){
  var pasa = false;
  $(elemento).click();
  if($('#popUpTicketsComentario')){
    pasa = true;
  }
  return pasa;
}


var agregaComentario = function(texto,seccion){
  var pasa = false;
  $('#TextRespuesta').val('');
  $('#TextRespuesta').val(texto);
  if($('#popUpTicketsComentario')){
    pasa = true;
  }
  $('#btnAceptarComentario').click();
  if(seccion==1){
    SalesUp.Sistema.CargaDatos({
      Link: '/privado/Modelo/jsonComentarioEjecutivoTicket.test.dbsp',
      Parametros:'idcomentario='+SalesUp.Variables.idcomentario,
    }); 
  }
  
  return pasa;
}


describe("Verificacion de funcionalidad de TICKETS: ", function() {
    
    afterAll(function(){
      if (testing) {
        testing.guardaRespuesta(arrTest,1,window);
      }else{
        return;
      }   
    });

    beforeAll(function(done) {
       //Se selecciona el crear ticket
        SalesUp.ticket.crearTicket();
       done();
    });
    /************************validacion de funciones *********************/
    respTest = it('Existe la función "selectEstadoTicket" funcion principal', function(done) {
      expect(typeof SalesUp.ticket.selectEstadoTicket).toEqual('function');
      done();
    });

    arrTest.push(respTest);

    respTest = it('Existe la función "guardaCrearTicket" funcion para crear ticket', function(done) {
      expect(typeof SalesUp.ticket.guardaCrearTicket).toEqual('function');
      done();
    });

    arrTest.push(respTest);

    respTest = it('Existe la función "crearTicket" que ejecuta el popup crear ticket', function(done) {
        expect(typeof SalesUp.ticket.crearTicket).toEqual('function');
        done();
    });

    arrTest.push(respTest);

    respTest = it('Existe la funcion "crearComentarioTicketBotonoes" que ejecuta el popup para comentar,calificacion"no todavia", califcacion" no me explique"', function(done){
      expect(typeof SalesUp.ticket.crearComentarioTicketBotonoes).toEqual('function');
      done();
    }); 

    arrTest.push(respTest);

    respTest = it('Existe el elemento popup de crear ticket en el dom',function(done){
      var popup = $('#popUpTickets');
      var valido = false;
      if(popup.length>0){valido=true;}
      expect(valido).toBeTruthy();
      done();
    });

    arrTest.push(respTest);

    describe('Creacion de datos y guardado', function(){
    /******************************/
      beforeAll(function(done) {
        sleep(2000).then (function () {
          insertaInfo();
          done();
        });
      });

    
      respTest = it('Se retorna la informacion insertada para su guardado y comparacion',function(done){
        sleep(1000).then (function () {
          expect(comparaInformacion()).toBeTruthy();
          done();
        });
       });

      arrTest.push(respTest);
     /******************************/
    });

    respTest = it('validacion de datos insertados', function(done){
        sleep(2000).then (function () {
          expect(validaDatosInsertados()).toBeTruthy();
          done();
        });
    }); 

    arrTest.push(respTest);

    respTest = it('Existe la función "ticketDetalles" que llama el detalle de un ticket, Navegacion a detalle del ticket creado', function(done) {
       sleep(2000).then (function () {
          $('#'+SalesUp.Variables.tkt).click();
          expect(typeof SalesUp.ticket.ticketDetalles).toEqual('function');
          done();
        });
       
    });

    arrTest.push(respTest);
    
    respTest = it('llamado de popup comentario del ticket',function(done){
      var elemento = $('#Responder');
      sleep(2200).then (function () {
        expect(validaPopup(elemento)).toBeTruthy();
        done();
      });
    });

    arrTest.push(respTest);

    respTest = it('Agrega un comentario al ticket',function(done){
      sleep(2400).then (function () {
         expect(agregaComentario('este es un comentario de prueba','')).toBeTruthy();
        done();
      });
     });

    arrTest.push(respTest);
     
    respTest = it('llamado de popup de boton "No todavia" del ticket',function(done){
      var elemento = $('#NoDelTodo');
      sleep(2500).then (function () {
        expect(validaPopup(elemento)).toBeTruthy();
        done();
      });
    });

    arrTest.push(respTest);

    respTest = it('Agrega un comentario al ticket del boton "no todavia"',function(done){
      sleep(2400).then (function () {
         expect(agregaComentario('este es un comentario de no todavia',1)).toBeTruthy();
        done();
      });
    });

    arrTest.push(respTest);

    respTest = it('llamado de popup de boton "NoMeExplique" del ticket',function(done){
      var elemento = $('#NoMeExplique');
      sleep(2600).then (function () {
        expect(validaPopup(elemento)).toBeTruthy();
        done();
      });
    });

    arrTest.push(respTest);

    respTest = it('Agrega un comentario al ticket del boton "NoMeExplique"',function(done){
      sleep(2800).then (function () {
         expect(agregaComentario('este es un comentario de no me explique',1)).toBeTruthy();
        done();
      });
    });
 
    arrTest.push(respTest);

    respTest = it('Cerrar ticket',function(done){
      var elemento = $('#SiGracias');
      sleep(3000).then (function () {
        expect(validaPopup(elemento)).toBeTruthy();
        done();
      });
    });

    arrTest.push(respTest);

    respTest = it('Reabrir ticket cerrado',function(done){
      sleep(3200).then (function () {
        $('#Estatus').val(2).change();
        $('#'+SalesUp.Variables.tkt).click();
      });

      var elemento = $('#Responder');
      sleep(3300).then (function () {
        expect(validaPopup(elemento)).toBeTruthy();
        done();
      });
    });

    arrTest.push(respTest);
     
    respTest = it('Agrega un comentario a reabrir ticket',function(done){
      sleep(3400).then (function () {
         expect(agregaComentario('este es un comentario de reabrir ticket',1)).toBeTruthy();
        done();
      });
    });

    arrTest.push(respTest);

    respTest = it('boton olvidalo pasame al gerente',function(done){
      var pasa = false;
       sleep(5500).then (function () {
        $('#Olvidalo').click();
        $('.PieModal .btnNegativo').click();
        if($('#popUpTicketsComentario')){
          pasa = true;
        }
        SalesUp.Variables.TicketGerente();
         SalesUp.Sistema.CargaDatos({
          Link: '/privado/Modelo/jsonComentarioEjecutivoTicket.test.dbsp',
          Parametros:'idcomentario='+SalesUp.Variables.idcomentario,
        }); 
        expect(pasa).toBeTruthy();
         done();

      });

    });

    arrTest.push(respTest);
 });