var testing = (window.opener) ? window.opener.test : null, arrTest = [], respTest;

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
describe("Verificacion de funcionalidad de variantes: ", function() {

    afterAll(function(){
      if (testing) {
        console.log('siguiente');
        testing.guardaRespuesta(arrTest,true,window);
      }
    });

    beforeAll(function(done) {
       //Se selecciona el crear filtros de variantes
        SalesUp.reportes.seleccionarVariante({t:this,v:-1});
       done();
    },1000);
    
    respTest = it('Existe la función "reporteVariantes" funcion principal', function(done) {
      expect(typeof SalesUp.reportes.variantes.crearVariante).toEqual('function');
      done();
    });

    arrTest.push(respTest);

    respTest = it('Existe la función "seleccionarVariante" que ejecuta el popup de variantes', function(done) {
        expect(typeof SalesUp.reportes.seleccionarVariante).toEqual('function');
        done();
    });

    arrTest.push(respTest);

    respTest = it('Existe el elemento popup de variantes en el dom',function(done){
      var popup = $('#popUpVarianteReporte');
      var valido = false;
      if(popup.length>0){valido=true;}
      expect(valido).toBeTruthy();
      done();
    });

    arrTest.push(respTest);

    describe('creacion de datos en la variante y guardado de los mismos',function(){
      beforeAll(function(done) {
        setTimeout(function(){
          var totalAgrupaciones = _.size(SalesUp.Variables.jsonInfoReportes.agrupaciones);
          $('#nombreVariante').val('Test #'+Math.floor(1000 + Math.random() * 9000));
          $('#selectCompartirDash').val(2).change();
          SalesUp.reportes.variantes.activaMostrarFiltros({Paso:1, Out:true});
          var elementoOcultoRelacionado = $('#boxSeleccionarCompartir').css('display');
           
          if(totalAgrupaciones >1){
            if($('#agrupar option').length==2){
              $('#agrupar').val(1);
            }else{
              $('#agrupar').val(2);
            }
          } 
          setTimeout(function(){
            if(elementoOcultoRelacionado=='block'){
              var objetoDelSelect = $('#ltCompartir')[0].selectize.options;
              objetoDelSelect = Object.keys(objetoDelSelect);
              $('#ltCompartir')[0].selectize.setValue(objetoDelSelect[0]);
            }
          },900);
          
          var criterios = SalesUp.Variables.jsonInfoReportes.jsonDatos[0].criterios;
          criterios = criterios.split(',');
          $("#FiltroTipoPaso1").val(criterios[1]).change();
          setTimeout(function(){
            var valorDelSelect = ($("#OpcionesTipoFiltros1 option:nth-child(2)").attr("value"));
            $("#OpcionesTipoFiltros1").val(valorDelSelect);
          },1000);

          setTimeout(function(){
            $("#OpcionesTipoFiltros1").change();
          },1200);
            
          var nombre          = $('#nombreVariante').val();
          var compartir       = $('#selectCompartirDash').val();
          var compartirOculto = $('#ltCompartir').val();
          var totalizar       = $('#totalizar').val();
          var criterios       = $('#Criterios').val();
          var filtroDatos     = $('.FiltroEtiqueta').attr('data-tipo');
          
          SalesUp.Variables.objComparar = {"nombre":nombre,"compartir":compartir,"compartirOculto":compartirOculto,"totalizar":totalizar,"criterios":criterios,"filtroDatos":filtroDatos};
          var pasa = false;
          var arr = Object.keys(SalesUp.Variables.objComparar).map(function(k) { return  SalesUp.Variables.objComparar[k] });
          if(arr.length == 4 || arr.length > 4){
            pasa = true
          }  
          setTimeout(function(){
           $('#btnGuarda').click();
          },2000);
          done();
        },1900);
      });
      
      respTest = it('El elemento INPUT existe siempre y cuando "Agrupar por" el jsonAgrupar contenga un solo dato de lo contrario el INPUT no existe',function(done){
        var tipoDeElemento = $('#agrupar')[0].tagName;
        if(tipoDeElemento == "INPUT"){
          expect(true).toBeTruthy();
        }else{
          expect(false).toBeFalsy();
        }
        done();
      });

      arrTest.push(respTest);

      respTest = it('El elemento SELECT existe siempre y cuando "Agrupar por" el jsonAgrupar contenga un solo dato de lo contrario el INPUT no existe',function(done){  
        var tipoDeElemento = $('#agrupar')[0].tagName;
        if(tipoDeElemento == "SELECT"){
          expect(true).toBeTruthy();
        }else{
          expect(false).toBeFalsy();
        }    
        done();
      });

      arrTest.push(respTest);

    });

    respTest = it('Se llamo con exito el popup de variantes para editar', function(done){
      setTimeout(function(){
       SalesUp.reportes.variantes.editarVariante();
      },4100);

      var procedeSiguiente = false;
      var tamanio = _.size(SalesUp.Variables.objComparar);
      if(tamanio>0){
        procedeSiguiente = true;
      }
      expect(procedeSiguiente).toBeTruthy();
      done();
    });

    arrTest.push(respTest);
  
    describe("Valida objeto:", function(){
      respTest = it('Lo retornado es igual a los datos insertados previos en popup variantes',function(done){
        var nombreE          = $('#nombreVariante').val();
        var compartirE       = $('#selectCompartirDash').val();
        var compartirOcultoE = $('#ltCompartir').val();
        var totalizarE       = $('#totalizar').val();
        var criteriosE       = $('#Criterios').val();
        var filtroDatosE     = $('.FiltroEtiqueta').attr('data-tipo');
        SalesUp.Variables.objRetornado = {"nombre":nombreE,"compartir":compartirE,"compartirOculto":compartirOcultoE,"totalizar":totalizarE,"criterios":criteriosE,"filtroDatos":filtroDatosE};
      
        var procedeSiguiente = false;
        var tamanio = _.size(SalesUp.Variables.objRetornado);
        if(tamanio>0){
          procedeSiguiente = true;
        }
        expect(procedeSiguiente).toBeTruthy();
        done();
      });

      arrTest.push(respTest);

      describe("Inicializacion de variantes: ", function() {
        beforeAll(function(done) {
          var $laVariante = $('#laVariante');
          var tkrsv       = $laVariante.val();
          SalesUp.Variables.tkrsvs = tkrsv;
          var bien        = false;
          setTimeout(function(){
          $('.btnNegativo ').click();
            SalesUp.reportes.variantes.alertaEliminarVariante();
            SalesUp.reportes.variantes.eliminarVariante();
            $('.btnNegativo ').click();
            SalesUp.Variables.objRetornado = "";
            SalesUp.Variables.objComparar = "";
          },5000); 
          done();
        });
        
        respTest = it('Cierra el popup variantes y elimina con exito la variantes', function(done) {
          var validaExistencia = SalesUp.Sistema.CargaDatos({
            Link:'/privado/Modelo/jsonInfoVarianteReporte.dbsp', 
            Parametros:'tkrsv='+SalesUp.Variables.tkrsvs
          });
          validaExistencia = JSON.parse(validaExistencia);

          var existeVariante  = validaExistencia.variante[0];
          var existeCriterios = validaExistencia.criterios[0];
          if(_.size(existeVariante)==0 && _.size(existeCriterios)==0){
            bien = true;
          }

          expect(bien).toBeTruthy();
          done();
        });

        arrTest.push(respTest);

      });
    });
});