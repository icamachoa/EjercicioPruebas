var detalleCobroP = function() {
    this.reporteDetalleCobroPendiente = function(obj) {
        var json = (obj.filtro) ? obj.filtro:'';
        var objeto;
        
        if (json == '') {
          objeto = JSON.stringify(obj)
        }else{
          objeto = json;
        }
        
        var start  = (obj.start) ? obj.start : 1;
        var vistaReporte = function(Op) {
            SalesUp.Sistema.MuestraEspera('#DatosLoad', 1);
            var jsonDatosCuerpo         = Op.jsonDatos;
            var totalRegistros          = Op.jsonDatosTotal[0].TOTALREGISTROS;

            var SumandoTotales = SalesUp.Sistema.sumaColumna(jsonDatosCuerpo, [{
                    columna: 'MONTO', tCambio:'TIPODECAMBIO'
                }, {
                    columna: 'COMISION', tCambio:'TIPODECAMBIO'
                }]);
                       
            var templateHeader = '  <tr> ';
            templateHeader     += '  <th class=""></th>';
            templateHeader     += '  <th>Nombre / Empresa</th>';
            templateHeader     += '  <th class="centrado">Email / Tel&eacute;fono</th>';
            templateHeader     += '  <th class="centrado">Concepto</th>';
            templateHeader     += '  <th class="centrado">Monto</th>';
            templateHeader     += '  <th class="centrado">Comisi&oacute;n</th>';
            templateHeader     += '  <th class="centrado">Fecha de Cobro</th>';
            templateHeader     += '  <th class="centrado">Ejecutivo</th>';
            templateHeader     += '  <td class="quitar"> </td>';
            templateHeader     += '</tr>';

           var templateCuerpo = '<tr>';  
           templateCuerpo     +='<td class="centrado"><b>{{nFila}}</b></td>';
           templateCuerpo     +='<td><a href="ventas-visualizar.dbsp?tkv={{TKV}}&tko={{TKOPORTUNIDAD}}">';
           templateCuerpo     += '{{NOMBRE}} {{APELLIDOS}}</a><br/>  {{hlpCobroPendienteEmpresa TKCOM EMPRESA}}</td>';
           templateCuerpo     +='<td>{{hlpDetalleCobroInfo TELEFONO TELEFONO2 MOVIL}}</td>';
           templateCuerpo     +='<td><div class="tIzq">{{CONCEPTO}} - <i>Pago {{NOPARCIALIDAD}} de {{NOPARCIALIDADES}}</i></div></td>';
           templateCuerpo     +='<td><div class="tDer">{{hlp_Simbolo_Moneda MONTO MONEDA_SIMBOLO 0}}</div></td>';
           templateCuerpo     +='<td><div class="tDer">{{hlp_Simbolo_Moneda COMISION MONEDA_SIMBOLO 0}}</div></td>';
           templateCuerpo     +='<td><div class="centrado"> {{FECHA_COBRO}}</div></td>';
           templateCuerpo     +='<td><span class="centrado Tip5" tip="{{NOMBRE_USUARIO}}">{{INICIALES}}</span></td>';
           templateCuerpo     +='<td class="quitar" ></td>';
           templateCuerpo     +='</tr>'; 

            if(totalRegistros==0){jsonDatosCuerpo=[]};
            SalesUp.Construye.ConstruyeTabla(templateHeader, templateCuerpo, jsonDatosCuerpo, {
                Destino: '#DatosLoad',
                Id: 'reporteContenido',
                elInicio: start
            });
            var $tabla = $('#reporteContenido');

           
        SalesUp.Variables.CrearTotales(jsonDatosCuerpo,SumandoTotales);
            
           SalesUp.reportes.paginacion({
                registros : totalRegistros,
                start     : start,
                callback  : SalesUp.detalle.reporteDetalleCobroPendiente,
                tabla     : $tabla,
                parametros: objeto
            });

        }; //vista
        /*******************************/
        SalesUp.Sistema.CargaDatosAsync({
            link: '/privado/Modelo/jsonDetalleCobroPendiente.dbsp',
            parametros: 'OBJETO=' + objeto + '&inicio=' + start,
            callback: vistaReporte
        });

        SalesUp.Variables.CrearTotales = function(t,suma) {

             var total = t.length;

            var sumaArray =  ObjToArray(suma);
            function ObjToArray(obj) {
              var arr = obj instanceof Array;

              return (arr ? obj : Object.keys(obj)).map(function(i) {
                var val = arr ? i : obj[i];
                if(typeof val === 'object')
                  return ObjToArray(val);
                else
                  return val;
              });
            }

            $('#reporteContenido').append('<tfoot><tr   class="elTotal Totales"><td colspan="3"></td><td  class="tIzq Bold">Totales</td></tr></tfoot>');
            var colspan ="";
            for (var i = 0; i < sumaArray.length; i++) {
                var simbolo = SalesUp.Variables.ElSimbolo;
                var montoActual = sumaArray[i];
                $('.Totales').append('<td class="tDer" '+colspan+'><b>' + Handlebars.helpers.hlp_Simbolo_Moneda(montoActual, simbolo, 0) + '</b></td>');
            };
            $('.Totales').append('<td></td><td></td><td></td>');
        };
        
    }
}

if(window.detalleCobroP){
    SalesUp.detalle = new detalleCobroP();
}