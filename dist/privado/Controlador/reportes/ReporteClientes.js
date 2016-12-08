var reporteClientes = function() {
    this.reporteCobroPendiente = function(obj) {
        SalesUp.Variables.ElObjeto = obj.filtro;
        var objeto                 = obj.filtro;
        var objetoParse            = JSON.parse(objeto);
        objetoParse                = objetoParse.filtros;
        var arr = '{';
        for (var i = 0; i < objetoParse.length; i++) {
            arr += '"' + Object.keys(objetoParse[i]) + '":"' + objetoParse[i][Object.keys(objetoParse[i])] + '",'
        }
        arr = arr.slice(0, -1);
        arr += '}';
        arr = JSON.parse(arr);
        SalesUp.Variables.tipoGrupo  = arr.grupo ? arr.grupo : 0;
        SalesUp.Variables.tipoMoneda = arr.moneda ? arr.moneda : 0;
        
        var start = (obj.start) ? obj.start : 1;

        var vistaReporte = function(Op) {
            SalesUp.Variables.DatosRecibidos = SalesUp.Sistema.clone(Op);
            SalesUp.Sistema.MuestraEspera('#DatosLoad', 1);
            SalesUp.Variables.ReporteTipo = Op.jsonDatosCuerpo[0].REPORTEVISTA;

            var filtroNoparse           = obj.filtro;
            var filtroLink              = '';
            var moneda                  = SalesUp.Variables.tipoMoneda;
            var grupo                   = SalesUp.Variables.tipoGrupo;
            var jsonDatosCabecera       = Op.jsonDatosCabecera;
            var jsonDatosCuerpo         = Op.jsonDatosCuerpo;
            var reporteVista            = Op.jsonDatosCuerpo[0].REPORTEVISTA;
            var simbolo                 = Op.jsonDatosCuerpo[0].SIMBOLO_MONEDA;
            SalesUp.Variables.ElSimbolo = simbolo;
            var filtroNuevo = {
                ReporteVista: reporteVista
            };

            if (SalesUp.Variables.sMultiMoneda == 1) {
                filtroNuevo.Moneda = moneda
            }

            localStorage.setItem('filtroCobrosPendientes', JSON.stringify(filtroNuevo));
             var SumandoTotales = SalesUp.Sistema.sumaColumna(jsonDatosCuerpo, [{
                    columna: 'VENCIDO'
                }, {
                    columna: 'ACTUAL'
                }, {
                    columna: 'MES1'
                }, {
                    columna: 'MES2'
                }, {
                    columna: 'MES3'
                }, {
                    columna: 'TOTAL'
                }]);
           

            for (var i = 0; i < jsonDatosCuerpo.length; i++) {
                jsonDatosCuerpo[i]['VENCIDO'] = Handlebars.helpers.hlp_Simbolo_Moneda(jsonDatosCuerpo[i]['VENCIDO'], simbolo, 0);
                jsonDatosCuerpo[i]['ACTUAL'] = Handlebars.helpers.hlp_Simbolo_Moneda(jsonDatosCuerpo[i]['ACTUAL'], simbolo, 0);
                jsonDatosCuerpo[i]['MES1'] = Handlebars.helpers.hlp_Simbolo_Moneda(jsonDatosCuerpo[i]['MES1'], simbolo, 0);
                jsonDatosCuerpo[i]['MES2'] = Handlebars.helpers.hlp_Simbolo_Moneda(jsonDatosCuerpo[i]['MES2'], simbolo, 0);
                jsonDatosCuerpo[i]['MES3'] = Handlebars.helpers.hlp_Simbolo_Moneda(jsonDatosCuerpo[i]['MES3'], simbolo, 0);
                jsonDatosCuerpo[i]['TOTAL'] = Handlebars.helpers.hlp_Simbolo_Moneda(jsonDatosCuerpo[i]['TOTAL'], simbolo, 0);
                jsonDatosCuerpo[i].contador = i;
            };

            if (reporteVista == 1) {
                filtroLink = 'tipo=1&elgrupo=' + grupo;
            } else if (reporteVista == 2) {
                filtroLink = 'tipo=2';
            } else if (reporteVista == 3) {
                filtroLink = 'tipo=3';
            } else if (reporteVista == 4) {
                filtroLink = 'tipo=4';
            } else if (reporteVista == 5) {
                filtroLink = 'tipo=6&elejecutivo=' + SalesUp.Variables.tku;
            } else if (reporteVista == 6) {
                filtroLink = 'tipo=7&elejecutivo=' + SalesUp.Variables.tku;
            } else if (reporteVista == 7) {
                filtroLink = 'tipo=8&elejecutivo=' + SalesUp.Variables.tku;
            }

            var templateHeader = '<th style="width:20px;"></th>';
            var totalRegistros = Op.jsonDatosTotal[0].TOTALREGISTROS;   
                templateHeader += '<th class="tIzq ' + jsonDatosCabecera[0].CLASE + '">' + jsonDatosCabecera[0].VISTA + '</th>';
            for (var i = 0; i < jsonDatosCabecera.length; i++) {
                if(jsonDatosCabecera[i].ORDEN != 1){
                    templateHeader += '<th class="centrado ' + jsonDatosCabecera[i].CLASE + '">' + jsonDatosCabecera[i].VISTA + '</th>';
                }
            } 

            var templateCuerpo = '<tr>';  
            templateCuerpo     +='<td class="centrado Bold">{{nFila}}</td>';
            templateCuerpo     +='<td class="tIzq"><input type="hidden" id="{{contador}}" class="titulo" value="{{TITULO}}"/>{{TITULO}}</td>';
            templateCuerpo     +='<td class="tDer vencido_{{contador}} sumaTotal" data-dato="{{VENCIDO}}" data-vencidos="{{VENCIDO}}"><a href="/privado/reporte_cobros_pendientes_detalle_nuevo.dbsp?moneda=' + moneda + '&' + filtroLink + '{{#linkExtra EXTRA EXTRA2}}{{link}}{{/linkExtra}}&periodo=1"><span>{{VENCIDO}}</span></a></td>';
            templateCuerpo     +='<td class="tDer actual_{{contador}} sumaTotal" data-dato="{{ACTUAL}}" data-actual="{{ACTUAL}}"><a href="/privado/reporte_cobros_pendientes_detalle_nuevo.dbsp?moneda=' + moneda + '&' + filtroLink + '{{#linkExtra EXTRA EXTRA2}}{{link}}{{/linkExtra}}&periodo=2"><span>{{ACTUAL}}</span></a></td>';
            templateCuerpo     +='<td class="tDer mes1_{{contador}} sumaTotal" data-dato="{{MES1}}" data-mes1="{{MES1}}"><a href="/privado/reporte_cobros_pendientes_detalle_nuevo.dbsp?moneda=' + moneda + '&' + filtroLink + '{{#linkExtra EXTRA EXTRA2}}{{link}}{{/linkExtra}}&periodo=3"><span>{{MES1}}</span></a></td>'; 
            templateCuerpo     +='<td class="tDer mes2_{{contador}} sumaTotal" data-dato="{{MES2}}" data-mes2="{{MES2}}"><a href="/privado/reporte_cobros_pendientes_detalle_nuevo.dbsp?moneda=' + moneda + '&' + filtroLink + '{{#linkExtra EXTRA EXTRA2}}{{link}}{{/linkExtra}}&periodo=4"><span>{{MES2}}</span></a></td>'; 
            templateCuerpo     +='  <td class="tDer mes3_{{contador}} sumaTotal" data-dato="{{MES3}}" data-mes3="{{MES3}}"><a href="/privado/reporte_cobros_pendientes_detalle_nuevo.dbsp?moneda=' + moneda + '&' + filtroLink + '{{#linkExtra EXTRA EXTRA2}}{{link}}{{/linkExtra}}&periodo=5"><span>{{MES3}}</span></a></td>'; 
            templateCuerpo     +='  <td class="tDer total_{{contador}} sumaTotal" data-dato="{{TOTAL}}" data-total="{{TOTAL}}"><a href="/privado/reporte_cobros_pendientes_detalle_nuevo.dbsp?moneda=' + moneda + '&' + filtroLink + '{{#linkExtra EXTRA EXTRA2}}{{link}}{{/linkExtra}}&periodo=0"><span>{{TOTAL}}</span></a></td>'; 
            templateCuerpo     +='</tr>'; 

           
            if(totalRegistros==0){jsonDatosCuerpo=[]};
            SalesUp.Construye.ConstruyeTabla(templateHeader, templateCuerpo, jsonDatosCuerpo, {
                Destino: '#DatosLoad',
                Id: 'reporteContenido',
                elInicio: start
            });
            var $tabla = $('#reporteContenido');

           
            SalesUp.Variables.CrearTotales(jsonDatosCuerpo,SumandoTotales);
            
            cargaGrafica();
             SalesUp.reportes.paginacion({
                registros: totalRegistros,
                start: start,
                callback: SalesUp.reportes.clientes.reporteCobroPendiente,
                tabla: $tabla,
                parametros: objeto
            });

        }; //vistaReporte
        /*******************************/
        SalesUp.Sistema.CargaDatosAsync({
            link: '/privado/Modelo/jsonReporteCobrosPendientesRetornaCabeceraCuerpo.dbsp',
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
                        
            var laVariante = $('#laVariante').val();
            var TotalizarE = _.where(SalesUp.Variables.jsonInfoReportes.variantes, {
                tkRsv: laVariante
            });
            var Totalizar = TotalizarE[0].totalizar;
            
            if ((Totalizar === null || Totalizar === 1) && Totalizar != 0) {
                $('#reporteContenido').append('<tfoot><tr class="elTotal Totales"><td></td><td class="tIzq Bold">Totales</td></tr></tfoot>');

                for (var i = 0; i < sumaArray.length; i++) {
                    var simbolo = SalesUp.Variables.ElSimbolo;
                    var montoActual = sumaArray[i];
                    $('.Totales').append('<td class="tDer"><b>' + Handlebars.helpers.hlp_Simbolo_Moneda(montoActual, simbolo, 0) + '</b></td>');
                };
            } else if (Totalizar === 2) {
                $('#reporteContenido').append('<tfoot><tr class="elTotal Totales"><td></td><td class="tDer Bold">Promedios</td></tr></tfoot>');

                for (var i = 0; i < sumaArray.length; i++) {
                    var simbolo = SalesUp.Variables.ElSimbolo;
                    var montoActual = sumaArray[i];

                    $('.Totales').append('<td class="tDer"><b>' + Handlebars.helpers.hlp_Simbolo_Moneda(montoActual / total, simbolo, 0) + '</b></td>');
                };
            }
        };
        /********************************************/
        var cargaGrafica = function() {
                options = {
                    chart: {
                        renderTo: 'contento',
                        defaultSeriesType: 'column',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)'
                    },
                    title: {
                        text: 'Cobros pendientes',

                    },
                    subtitle: {
                        text: '',

                    },
                    xAxis: {},
                    yAxis: {
                        title: {
                            text: 'Monto'
                        },
                    },
                    tooltip: {
                        formatter: function() {
                            return '' +
                                '(' + this.series.name + '), ' + SalesUp.Sistema.MonedaANumero(this.y);
                        }
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.06,
                            borderWidth: 0
                        }
                    }
                };
                // the categories
                options.xAxis.categories = [];
                $('thead th.dato').each(function(i) {
                    options.xAxis.categories.push(this.innerHTML);
                });

                // the data series
                var titulo = "";
                options.series = [];

                $('.titulo').each(function(j) {
                    var arrayValores = [];
                    var valor = $(this).attr('id');
                    titulo = $(this).val();

                    arrayValores.push(meses($('.vencido_' + valor).attr('data-vencidos')));
                    arrayValores.push(meses($('.actual_' + valor).attr('data-actual')));
                    arrayValores.push(meses($('.mes1_' + valor).attr('data-mes1')));
                    arrayValores.push(meses($('.mes2_' + valor).attr('data-mes2')));
                    arrayValores.push(meses($('.mes3_' + valor).attr('data-mes3')));
                    arrayValores.push(meses($('.total_' + valor).attr('data-total')));

                    options.series[j] = {
                        name: titulo,
                        data: arrayValores
                    };
                });

                SalesUp.reportes.graficaColumna({
                    categorias: options.xAxis.categories,
                    series: options.series,
                    tooltip: options.tooltip
                })
            }
            /********************************************/
        var meses = function(parseo) {
            var valor = SalesUp.Sistema.MonedaANumero(parseo);
            return valor;
        }
    }



    this.top10 = function(obj) {

        (!obj) ? obj = {} : '';
        var filtro = obj.filtro;
        var objFiltro = JSON.parse(filtro);

        var start = (obj.start) ? obj.start : 1;

        var muestraReporteTop10 = function(Op, err, args) {
            SalesUp.Variables.DatosRecibidos = SalesUp.Sistema.clone(Op);
            var jsonDatos = SalesUp.Sistema.clone(Op.jsonDatos);
            var jsonInfo = SalesUp.Sistema.clone(Op.jsonInfo);

            var pasa = (jsonDatos.length > 0 && $.isEmptyObject(jsonDatos[0]) == false)
            var tHead = `
                <tr>
                <td></td>
                <td>Nombre/Empresa</td>
                <td>Origen</td>
                <td class="tCen">Ejecutivo</td>
                <td class="tCen">Última Compra</td>
                <td class="tCen">#tr</td>
                <td class="tDer">Ticket promedio</td>
                <td class="tDer">Ventas acumuladas</td>
                <td class="tCen">%</td>
                </tr>
            `
            var simbolo = '';
            var tBody = ''
            tBody += '<tr>'
            tBody += '<td class="tCen"><strong>{{nFila}}</strong></td>'
            tBody += '<td><a href="/privado/clientes-visualizar.dbsp?tkp={{Tkp}}">{{CLIENTE}}</a><br>{{#hlp_compare IDCOMPANIA 0 operator=">"}} <a class="NombreEmpresa" href="EmpresasVisualizar.dbsp?tkcom={{TKCOM}}"><i class="fa fa-building-o"></i> {{EMPRESA}} </a> {{else}}'
            tBody += '{{EMPRESA}}{{/hlp_compare}}</td>'
            tBody += '<td>{{Origen}}</td>'
            tBody += '<td class="tCen">{{compartidoIniciales}}</td>'
            tBody += '<td class="tCen">{{FECHA}}</td>'
            tBody += '<td class="tCen">{{Ventas}}</td>'
            tBody += '<td class="tDer">{{hlp_Simbolo_Moneda Promedio ' + simbolo + ' 0}}</td>'
            tBody += '<td class="tDer">{{hlp_Simbolo_Moneda MontoTotal ' + simbolo + ' 0}}</td>'
            tBody += '<td class="FormatPercent tDer">{{calculaporcentaje}}</td>'
            tBody += '</tr>'


            jsontop10clientes = SalesUp.Sistema.sumaColumna(jsonDatos, [{
                'columna': 'Ventas'
            }, {
                'columna': 'MontoTotal'
            }])
            jsontop10clientes.Promedio = jsontop10clientes.MontoTotal / jsontop10clientes.Ventas;
            var Resto = {};
            Resto.Ventas = parseInt(jsonInfo.Ventas - jsontop10clientes.Ventas);
            var dato1 = (jsonInfo.MontoTotal == 0) ? 1 : jsonInfo.MontoTotal;
            Resto.Promedio = (jsonInfo.MontoTotal - jsontop10clientes.MontoTotal) / (jsonInfo.Ventas - jsontop10clientes.Ventas);
            if ((jsonInfo.Ventas - jsontop10clientes.Ventas)==0) {
                Resto.Promedio = 0;
            };
            Resto.MontoTotal = jsonInfo.MontoTotal - jsontop10clientes.MontoTotal;
            var dato = (Resto.MontoTotal == 0) ? 1 : Resto.MontoTotal;
            Resto.Perc = (jsonInfo.MontoTotal - jsontop10clientes.MontoTotal) / dato
            var dato2 = (jsontop10clientes.MontoTotal == 0) ? 1 : jsontop10clientes.MontoTotal;
            var tFoot = `
                <tr class="elTotal" >
                    <td colspan="4"></td>
                    <td class="tDer">Totales de los mejores clientes</td>
                    <td class="tCen">` + jsontop10clientes.Ventas + `</td>
                    <td class="tDer">` + SalesUp.Sistema.FormatoMoneda(jsontop10clientes.Promedio) + `</td>
                    <td class="tDer">` + SalesUp.Sistema.FormatoMoneda(jsontop10clientes.MontoTotal) + `</td>
                    <td class="tDer">` + SalesUp.Sistema.numeroConDecimal(parseFloat(dato2 / dato1 * 100)) + `%</td>
                </tr>

                <tr class="elTotalSinBorde">
                    <td colspan="4"></td>
                    <td class="tDer">Resto</td>
                    <td class="tCen">` + Resto.Ventas + `</td>
                    <td class="tDer">` + SalesUp.Sistema.FormatoMoneda(Resto.Promedio) + `</td>
                    <td class="tDer">` + SalesUp.Sistema.FormatoMoneda(Resto.MontoTotal) + `</td>
                    <td class="tDer">` + parseFloat(Resto.Perc * 100).toFixed(2) + `%</td>
                </tr>
                
                <tr class="elTotalSinBorde">
                    <td colspan="4"></td>
                    <td class="tDer">Total</td>
                    <td class="tCen">` + jsonInfo.Ventas + `</td>
                    <td class="tDer">` + SalesUp.Sistema.FormatoMoneda(jsonInfo.Promedio) + `</td>
                    <td class="tDer">` + SalesUp.Sistema.FormatoMoneda(jsonInfo.MontoTotal) + `</td>
                    <td class="tDer">100.00%</td>
                </tr>
            `


            if (pasa) {
                _.map(jsonDatos, function(num, key) {
                    var dato2 = (num.MontoTotal == 0) ? 1 : num.MontoTotal;
                    var dato = (jsonInfo.MontoTotal == 0) ? 1 : jsonInfo.MontoTotal;
                    num.calculaporcentaje = dato2 / dato;
                });
                j = _.map(jsonDatos, function(value, index) {
                    O = {}
                    O.name = value.CLIENTE
                    O.y = value.calculaporcentaje;
                    return O
                })
                j.push({
                    'name': 'Otros',
                    'y': Resto.Perc
                })
            }

            SalesUp.Construye.ConstruyeTabla(tHead, tBody, jsonDatos, {
                Destino: '#DatosLoad',
                Id: 'ReportTable',
                elInicio: start
            });

            if (pasa) {
                $('#ReportTable  tfoot').addClass('Italic').html(tFoot);
                tooltip = {
                    pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
                }
                SalesUp.reportes.graficaPie({
                    'datos': j,
                    'tooltip': tooltip
                });
            }

        }


        var $lasVariantes = $('#lasVariantes'),
            $laVariante = $('#laVariante'),
            $laOpcion = $laVariante.find('option:selected');
        var tipoVariante = $laOpcion.attr('data-sistema');
        var qryString = 'tkrs=' + SalesUp.Variables.tkrs + '&tipoVariante=' + tipoVariante + '&laVariante=' + $laVariante.val() + '&inicia=' + start + '&filtros=' + filtro;

        SalesUp.Sistema.CargaDatosAsync({
            link: '/privado/Modelo/jsontop10clientes.dbsp',
            prmAdicionales: qryString,
            parametros: qryString,
            callback: muestraReporteTop10
        })
    }

    this.exportaCsvContinuidad = function(Op) {
        SalesUp.Variables.DatosRecibidos = SalesUp.Sistema.clone(Op);
        var jsonDatos = Op.jsonDatos,
            jsonInfo = Op.jsonInfo;
        jsonFinal = _.map(jsonDatos, function(key) {
            delete(key.SALUD1);
            delete(key.SALUD2);
            delete(key.TKCOM);
            delete(key.TKP);
            delete(key.IDCOMPANIA);
            delete(key.IDPROSPECTO);
            key['Relevancia (%)'] = ((key.MONTO / jsonInfo.TOP1) * 100).toFixed(2);
            return key;
        });
        return jsonFinal;
    } /*exportaCsvContinuidad*/

    this.continuidad = function(obj) {

        (!obj) ? obj = {} : '';
        var filtro = obj.filtro;
        var objFiltro = JSON.parse(filtro);

        var start = (obj.start) ? obj.start : 1;

        var reporteContinuidad = function(Op, err, args) {
            SalesUp.Variables.DatosRecibidos = SalesUp.Sistema.clone(Op);
            var jsonDatos = SalesUp.Sistema.clone(Op.jsonDatos);
            var jsonInfo = SalesUp.Sistema.clone(Op.jsonInfo);

            var tHead = '';
            tHead += '<tr>';
            tHead += '<td></td>';
            tHead += '<td>Nombre/Empresa</td>';
            tHead += '<td>Relevancia</td>';
            tHead += '<td style="width: 130px;" class="tDer">Monto</td>';

            var template = ''
            template += tHead
            template += '{{#each jsonTh}}'
            template += '<td style="width: 130px;" class="tDer">{{PERIODO}}</td>'
            template += '{{~/each}}'
            var template = Handlebars.compile(template);
            tHead = template(Op)

            var tBody = ''
            tBody += '<tr>';
            tBody += '<td class="tCen"><strong>{{nFila}}</strong></td>';
            tBody += '<td><a href="/privado/clientes-visualizar.dbsp?tkp={{TKP}}">{{NOMBRE}} {{APELLIDOS}}</a><br>{{#hlp_compare IDCOMPANIA 0 operator=">"}} <a class="NombreEmpresa" href="EmpresasVisualizar.dbsp?tkcom={{TKCOM}}"><i class="fa fa-building-o"></i> {{EMPRESA}} </a> {{else}}';
            tBody += '{{EMPRESA}}{{/hlp_compare}}</td>';
            tBody += '<td style="width: 180px;">{{hlpRelevancia ' + jsonInfo.TOP1 + '}}</td>';
            tBody += '<td class="tDer">{{hlp_Simbolo_Moneda MONTO ' + jsonInfo.SIMBOLO + ' 0}}</td>';

            var template = '';
            template += '{{#each jsonTh}}';
            template += '<td class="tDer">{{openCurly}}hlp_Simbolo_Moneda PER{{PERIODO}} ' + jsonInfo.SIMBOLO + ' 0{{closeCurly}}</td>';
            template += '{{~/each}}';
            template += '</tr>';
            var template = Handlebars.compile(template);
            tBody += template(Op)

            var total = jsonInfo.NOR

            SalesUp.Construye.ConstruyeTabla(tHead, tBody, jsonDatos, {
                Destino: '#DatosLoad',
                Id: 'ReportTable',
                elInicio: start
            });
            var $tabla = $('#ReportTable');
            SalesUp.reportes.paginacion({
                registros: total,
                start: start,
                callback: SalesUp.reportes.clientes.continuidad,
                tabla: $tabla,
                parametros: filtro
            });

        } /*reporteContinuidad*/


        var $lasVariantes = $('#lasVariantes'),
            $laVariante = $('#laVariante'),
            $laOpcion = $laVariante.find('option:selected');
        var tipoVariante = $laOpcion.attr('data-sistema');
        var qryString = 'tkrs=' + SalesUp.Variables.tkrs + '&tipoVariante=' + tipoVariante + '&laVariante=' + $laVariante.val() + '&inicia=' + start + '&filtros=' + filtro;;

        SalesUp.Sistema.CargaDatosAsync({
            link: '/privado/Modelo/jsonContinuidad.dbsp',
            prmAdicionales: qryString,
            parametros: qryString,
            callback: reporteContinuidad
        })
    }

}