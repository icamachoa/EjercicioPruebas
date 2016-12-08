var testing = (window.opener != null) ? window.opener.test : null, arrTest = [], respTest;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
var jsonify=function(o){
    var seen=[];
    var jso=JSON.stringify(o, function(k,v){
        if (typeof v =='object') {
            if ( !seen.indexOf(v) ) { return '__cycle__'; }
            seen.push(v);
        } return v;
    });
    return jso;
};

var datos = {
	noLeidos: 0,
	idTabInbox: 0,
	orden: 0,
	fuerzaPsw: 10,
	Tickets: 0,
	Tickets_Alertas: 0,
	Leido_Tickets_Alertas: 0,
	metasAlcanzadas: 0,
	metasNoAlcanzadas: 0,
	notificaciones: 0,
	notificacionesPush: 0,
	reiniciarSesion: 0,
	recordatorio: 0,
	autPendientes: 0		
}


var procesaAlerta = function(tk, operacion,datos){
  var pasa = '';
  var params = [{
  	token    : tk,
  	operacion: operacion,
  	datos    : datos
  }];
  enc = SalesUp.Sistema.Encript({tipo:'encode', cadena:jsonify(params)});
  console.log(params,enc);
  SalesUp.Variables.resultado = SalesUp.Sistema.CargaDatos({
    Link       : 'https://alertas.salesup.com/cambia',
    metodo     : 'GET',
    Parametros : 'data='+enc,
  });
  SalesUp.Variables.resultado = JSON.parse(SalesUp.Variables.resultado);
  (_.size(SalesUp.Variables.resultado)>0) ? pasa = true : pasa = false;
  pasa = (pasa && (SalesUp.Variables.resultado.res ==1));
  return pasa;
}

var cargaAlertas = function(tk){
  var pasa = '';
  var params = '';
  if (tk)
  	 params = 'token='+tk;
  SalesUp.Variables.resultado = SalesUp.Sistema.CargaDatos({
    Link       : 'https://alertas.salesup.com/',
    metodo     : 'GET',
    Parametros : params,
  });
  SalesUp.Variables.resultado = JSON.parse(SalesUp.Variables.resultado);
  console.log(SalesUp.Variables.resultado);
  return  SalesUp.Variables.resultado;
}



    describe('Test de webservice de alertas', function(){
    /******************************/

      afterAll(function() {
        if (testing) {
          testing.guardaRespuesta(arrTest,1, window);
        }else{
          return;
        }   
      });
      
      beforeAll(function(done) {
        sleep(20).then (function () {
          done();
        });
      });

      respTest = it('Valida Sitio Alertas',function(done){
        sleep(10).then (function () {
          expect(cargaAlertas('')).toBeTruthy();
          done();
        });
       });

      arrTest.push(respTest);
      console.log("tku",SalesUp.Variables.tku);
      
      respTest = it('Inicializa alertas de usuario ',function(done){
        sleep(10).then (function () {         	
          expect(procesaAlerta(SalesUp.Variables.tku, 0, datos)).toBeTruthy();
          done();
        });
       });
      arrTest.push(respTest);

      respTest = it('Se retorna la informacion de un usuario inicializado ',function(done){
        sleep(10).then (function () {
          var alertas = cargaAlertas(SalesUp.Variables.tku);
          expect(_.size(alertas)>0).toBeTruthy();
          expect(alertas.notificaciones).toEqual(0);          
          done();
        });
       });
      arrTest.push(respTest);

      respTest = it('Validación de actualización (actualización) de alertas vía WebService ',function(done){
        sleep(10).then (function () {
          var tku = SalesUp.Variables.tku;
          datos.notificaciones = 2;
          procesaAlerta(tku, 1, datos);
          var alertas = cargaAlertas(tku);
          expect(_.size(alertas)>0).toBeTruthy();
          expect(alertas.notificaciones).toEqual(2);
          
          done();
        });
       });
      arrTest.push(respTest);


      respTest = it('Validación de actualización (delta) de alertas vía WebService ',function(done){
        sleep(10).then (function () {
          var tku = SalesUp.Variables.tku;
          datos.notificaciones = 2;
          procesaAlerta(tku, 2, datos);
          var alertas = cargaAlertas(tku);
          expect(_.size(alertas)>0).toBeTruthy();
          expect(alertas.notificaciones).toEqual(4);
          procesaAlerta(tku, 2, datos);
          var alertas = cargaAlertas(tku);
          expect(alertas.notificaciones).toEqual(6);
          datos.notificaciones = -3;
          procesaAlerta(tku, 2, datos);
          var alertas = cargaAlertas(tku);
          expect(alertas.notificaciones).toEqual(3);
          
          done();
        });
       });
      arrTest.push(respTest);



    });




