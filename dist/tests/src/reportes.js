var reportes = function(){
  
  this.obtieneVariantes = function(Op){
    var tkrs = Op.tkrs;
    var procesaVariantes = Op.callback;
    
     
    SalesUp.Sistema.CargaDatosAsync({
      link:'/privado/Modelo/jsonInformacionReporte.dbsp', 
      parametros:'tkrs='+tkrs, 
      callback:procesaVariantes
    });

  }/*obtieneVariantes*/
  
  var procesaVariantes = function(Op, err){
      if (err) {
        console.warn('error', err); return false;
      }
      
      SalesUp.Variables.jsonInfoReportes = Op;
      var infoReporte = Op.jsonDatos[0];
      var nombreReporte = infoReporte.reporte;

      $tituloReporte.html(nombreReporte);

      contruyeOpcionesVariantes(Op);
      
    }/*procesaVariantes*/

}/*repotes*/