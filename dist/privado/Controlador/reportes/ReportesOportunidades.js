var reportesOportunidades = function() {

    this.estimacionVentas = function(obj) {
        (!obj) ? obj = {} : '';
        var filtro = obj.filtro;
        var objFiltro = JSON.parse(filtro);

        var start = (obj.start) ? obj.start : 1;

        var datosEstimacionVentas = function(Op, err) {
            SalesUp.Variables.DatosRecibidos = SalesUp.Sistema.clone(Op);
            var total = Op.jsonTotal[0].TOTAL;
            var tDatosExtra = Op.jsonTotal[0].CDATOS;
            var datos = Op.jsonDatos;
            var tmpBody = '';
            var ltBody = [];
            var jsonCategories = [];
            var jHeader = Op.jsonHeader;
            var tamanioH = _.size(jHeader);
            var tipo = (Op.jsonTotal[0].TIPO) ? Op.jsonTotal[0].TIPO : 0 ;
            var foot = '';
            var tmpHead = '<tr>';
            if (tamanioH > 0) {
                for (var je = 0; je < tamanioH; je++) {
                    var ja = jHeader[je];
                    var arrGrafica = {};
                    if (ja.TITULO != '' && ja.TITULO != 'Total' && ja.TITULO != 'Probabilidad' && ja.TITULO != 'Ejecutivo' && ja.TITULO != 'Grupo/Departamento' && ja.TITULO != 'Linea producto' && ja.TITULO != 'Origen' && ja.TITULO != 'Pais' && ja.TITULO != 'Región' && ja.TITULO != 'Ciudad') {
                        tmpHead += '<th class="tCen ' + ja.CLASE + '">' + ja.TITULO + '</th>';
                        jsonCategories.push(ja.TITULO);
                    } else {
                        if (ja.TITULO === 'Total') {
                            tmpHead += '<th class="tDer ' + ja.CLASE + '">' + ja.TITULO + '</th>';
                        } else {
                            tmpHead += '<th class="tIzq ' + ja.CLASE + '">' + ja.TITULO + '</th>';
                        }
                    }
                }
            }
            tmpHead += '</tr>';
            var totales = [];
            var arrTotales = {};

            arrTotales.columna = 'Vencidos';
            totales.push(arrTotales);

            tmpBody = '<tr>';
            if (tipo != 8) {
                tmpBody += '<td class="tCen Bold">{{nFila}}</td>';
            } else {
                tmpBody += '<td class="tCen">{{hlpColorCerteza Color}}</td>';
            }
            tmpBody += '<td class="tIzq"><input type="hidden" id="{{contador}}" class="titulo" value="{{Titulo}}">{{Titulo}}</td>';
            tmpBody += '<td class="tDer vencido_{{contador}} sumaTotal" data-vencidos="{{Vencidos}}" data-dato="{{Vencidos}}"><a href="/privado/detalleReporteDeEstimacion.dbsp?filtro=' + encodeURIComponent(filtro) + '&periodo=vencidas&parametros={{Parametros}}"><span class="pointer">{{hlp_Simbolo_Moneda Vencidos simbolo 0}}</span></a></td>';
            for (var x = 0; x < tDatosExtra; x++) {
                var dato = 'Dato' + x;
                var arrAux = {};
                arrAux.columna = dato;
                totales.push(arrAux);
                tmpBody += '<td class="tDer datos{{contador}} sumaTotal" data-dato="{{Dato' + x + '}}"><a href="/privado/detalleReporteDeEstimacion.dbsp?filtro=' + encodeURIComponent(filtro) + '&periodo=' + x + '&parametros={{Parametros}}"><span class="pointer">{{hlp_Simbolo_Moneda Dato' + x + ' simbolo 0}}</span></a></td>';
            }
            tmpBody += '<td class="tDer futuros_{{contador}} sumaTotal" data-dato="{{Futuros}}" data-futuros="{{Futuros}}"><a href="/privado/detalleReporteDeEstimacion.dbsp?filtro=' + encodeURIComponent(filtro) + '&periodo=futuros&parametros={{Parametros}}"><span class="">{{hlp_Simbolo_Moneda Futuros simbolo 0}}</span></a></td>';
            tmpBody += '<td class="tDer sumaTotal" data-dato="{{Total}}"><a href="/privado/detalleReporteDeEstimacion.dbsp?filtro=' + encodeURIComponent(filtro) + '&periodo=total&parametros={{Parametros}}"><span class="">{{hlp_Simbolo_Moneda Total simbolo 0}}</span></a></td>';
            tmpBody += '</tr>';

            var elSimbolo = datos[0].MonedaSimbolo;
            var arrAux2 = {};
            arrAux2.columna = 'Futuros';
            var arrAux1 = {};
            arrAux1.columna = 'Total';
            totales.push(arrAux2);
            totales.push(arrAux1);
            var totalesSumados = SalesUp.Sistema.sumaColumna(datos, totales);

            var laVariante = $('#laVariante').val();
            var TotalizarE = _.where(SalesUp.Variables.jsonInfoReportes.variantes, {
                tkRsv: laVariante
            });
            var Totalizar = TotalizarE[0].totalizar;
            if ((Totalizar === null || Totalizar === 1) && Totalizar != 0) {
                foot += '<tr class="elTotal">';
                foot += '<td></td><td class="tDer">Totales</td>';
                foot += '<td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.Vencidos, elSimbolo, 1) + '</td>';
                for (var x = 0; x < tDatosExtra; x++) {
                    var dato = 'Dato' + x;
                    foot += '<td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados[dato], elSimbolo, 1) + '</td>';
                }
                foot += '<td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.Futuros, elSimbolo, 1) + '</td>';
                foot += '<td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.Total, elSimbolo, 1) + '</td>';
                foot += '</tr>';
            } else if (Totalizar === 2) {
                foot += '<tr class="elTotal">';
                foot += '<td></td><td class="tDer">Promedios</td>';
                foot += '<td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.Vencidos / _.size(datos), elSimbolo, 1) + '</td>';
                for (var x = 0; x < tDatosExtra; x++) {
                    var dato = 'Dato' + x;
                    foot += '<td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados[dato] / _.size(datos), elSimbolo, 1) + '</td>';
                }
                foot += '<td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.Futuros / _.size(datos), elSimbolo, 1) + '</td>';
                foot += '<td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda(totalesSumados.Total / _.size(datos), elSimbolo, 1) + '</td>';
                foot += '</tr>';
            } else {
                foot = ''
            }
            var dataSeries = [];

            ltBody = generaObjetoTablaEstimacionVentas(datos, tDatosExtra, total);

            dataSeries = generaObjetoGraficarEstimacionVentas(datos, tDatosExtra, total);

            //cargaGrafica({jsonCategories,dataSeries});
            tooltip = {
                formatter: function() {
                    return '' + 'Probabilidad (' + this.series.name + '), ' + SalesUp.Sistema.MonedaANumero(this.y);
                }
            }
            if (total > 0) {
                SalesUp.reportes.graficaColumna({
                    'categorias': jsonCategories,
                    'series': dataSeries,
                    'tooltip': tooltip
                })

                SalesUp.Construye.ConstruyeTabla(tmpHead, tmpBody, ltBody, {
                    Destino: '#DatosLoad',
                    Id: 'ReportTable', elInicio:start
                });
                var $tabla = $('#ReportTable');
                $('#ReportTable tfoot').html(foot);
                SalesUp.reportes.paginacion({
                    registros: total,
                    start: start,
                    callback: SalesUp.reportes.oportunidades.estimacionVentas,
                    tabla: $tabla,
                    parametros: filtro
                });
            };
                
        }

        SalesUp.Sistema.CargaDatosAsync({
            link: '/privado/Modelo/jsonReporteEstimacionData.dbsp',
            parametros: 'filtros=' + filtro + '&inicio=' + start,
            callback: datosEstimacionVentas
        });

    }

    this.generaObjetoTabla = function(json, extra, total) {
        return generaObjetoTablaEstimacionVentas(json, extra, total);
    }

    var generaObjetoTablaEstimacionVentas = function(json, extra, total) {
        var jsonTabla = [];
        if (total > 0) {
            for (var je = 0; je < _.size(json); je++) {
                var ja = json[je];
                var arrBody = {};
                arrBody.contador = je;
                arrBody.simbolo = ja.MonedaSimbolo;
                arrBody.Color = ja.Color;
                arrBody.Titulo = ja.Titulo;
                arrBody.Vencidos = ja.Vencidos;
                arrBody.Parametros = ja.Parametros;
                for (var x = 0; x < extra; x++) {
                    var dato = 'Dato' + x;
                    arrBody[dato] = ja[dato];
                }
                arrBody.Futuros = ja.Futuros;
                arrBody.Total = ja.Total
                jsonTabla.push(arrBody);
            }

            return jsonTabla;

        } else {

            return false;
        }
    }

    var generaObjetoGraficarEstimacionVentas = function(json, extra, total) {
        var jsonGrafica = [];
        if (total > 0) {
            for (var je = 0; je < _.size(json); je++) {
                var ja = json[je];
                var laSerie = {};
                laSerie.name = ja.Titulo;
                laSerie.data = [];
                jsonGrafica.push(laSerie);
            }
            for (var ls = 0; ls < jsonGrafica.length; ls++) {
                var arrVencidos = _.pluck(json, 'Vencidos');
                jsonGrafica[ls].data.push(parseFloat(arrVencidos[ls]));
                for (var x = 0; x < extra; x++) {
                    var arrDato = _.pluck(json, 'Dato' + x);
                    jsonGrafica[ls].data.push(parseFloat(arrDato[ls]));

                }

                var arrFuturos = _.pluck(json, 'Futuros');
                jsonGrafica[ls].data.push(parseFloat(arrFuturos[ls]));
            }

            return jsonGrafica;
        } else {
            return false;
        }

    }

    this.reporteOportunidadesSinSeguimiento = function(obj) {

        (!obj) ? obj = {} : '';
        var filtro = obj.filtro;
        var objFiltro = JSON.parse(filtro);

        var start = (obj.start) ? obj.start : 1;

        var muestraReporteOSS = function(Op, err, args) {
            
            SalesUp.Variables.DatosRecibidos = SalesUp.Sistema.clone(Op);

            var jsonDatos = SalesUp.Sistema.clone(Op.jsonDatos)

            var jsonDatos2 = SalesUp.Sistema.clone(Op.jsonDatos)

            var SumandoTotales = SalesUp.Sistema.sumaColumna(jsonDatos2, [{
                columna: 'VENCIDO1'
            }, {
                columna: 'VENCIDO2'
            }, {
                columna: 'VENCIDO3'
            }, {
                columna: 'VENCIDO4'
            }, {
                columna: 'TOTAL'
            }])

            var j = _.map(jsonDatos2, function(value, index) {
                O = {}
                O.name = (value.EJECUTIVO) ? value.EJECUTIVO : (value.GRUPO) ? value.GRUPO : (value.LINEA_PRODUCTO) ? value.LINEA_PRODUCTO : (value.ORIGEN) ? value.ORIGEN : (value.PAIS) ? value.PAIS : (value.TITULO) ? value.TITULO : (value.CIUDAD) ? value.CIUDAD : (value.EJECUTIVO) ? value.EJECUTIVO : (value.FASE) ? value.FASE : (value.ETIQUETA) ? value.ETIQUETA : ''
                ''
                O.data = [parseFloat(value.VENCIDO1), parseFloat(value.VENCIDO2), parseFloat(value.VENCIDO3), parseFloat(value.VENCIDO4)]
                return O
            })

            var Total = Op.jInfo.Total
            var vista = parseInt(Op.jInfo.Agrupacion)
            var moneda = Op.jInfo.Moneda
            var simbolomoneda = Op.jInfo.Simbolo
            moneda = (moneda != '') ? moneda : 0
            simbolomoneda = (moneda != 0) ? simbolomoneda : ''

            SumandoTotales.VENCIDO1 = SumandoTotales.VENCIDO1
            SumandoTotales.VENCIDO2 = SumandoTotales.VENCIDO2
            SumandoTotales.VENCIDO3 = SumandoTotales.VENCIDO3
            SumandoTotales.VENCIDO4 = SumandoTotales.VENCIDO4
            SumandoTotales.TOTAL = SumandoTotales.TOTAL
            $('head').append('<style>.tLeft{text-align: left;}</style>')

            function getTemplate(hof, vista, moneda) {
                var body = '<tr>' + '  <td class="tCen"><b>{{nFila}}</b></td>'
                var head = '<tr><td style="width:10px;"></td>';
                switch (vista) {
                    case 1:
                        head = head + '<td class="tLeft">Ejecutivo</td>'
                        body = body + '  <td><input type="hidden" id="{{contador}}" class="titulo" value="{{EJECUTIVO}}">{{EJECUTIVO}}</td>'
                        break;
                    case 2:
                        head = head + '<td>Grupo/Departamento</td>'
                        body = body + '  <td><input type="hidden" id="{{contador}}" class="titulo" value="{{GRUPO}}">{{GRUPO}}</td>'
                        break;
                    case 3:
                        head = head + '<td>Linea</td>'
                        body = body + '  <td><input type="hidden" id="{{contador}}" class="titulo" value="{{LINEA_PRODUCTO}}">{{LINEA_PRODUCTO}}</td>'
                        break;
                    case 4:
                        head = head + '<td>Origen</td>'
                        body = body + '  <td><input type="hidden" id="{{contador}}" class="titulo" value="{{ORIGEN}}">{{ORIGEN}}</td>'
                        break;
                    case 5:
                        head = head + '<td>País</td>'
                        body = body + '  <td><input type="hidden" id="{{contador}}" class="titulo" value="{{PAIS}}">{{PAIS}}</td>'
                        break;
                    case 6:
                        head = head + '<td>Región</td>'
                        body = body + '  <td><input type="hidden" id="{{contador}}" class="titulo" value="{{TITULO}}">{{TITULO}}</td>'
                        break;
                    case 7:
                        head = head + '<td>Ciudad</td>'
                        body = body + '  <td><input type="hidden" id="{{contador}}" class="titulo" value="{{CIUDAD}}">{{CIUDAD}}</td>'
                        break;
                    case 11:
                        head = head + '<td>Etiqueta</td>'
                        body = body + '<td><input type="hidden" id="{{contador}}" class="titulo" value="{{ETIQUETA}}">{{ETIQUETA}}</td>'
                        break;
                    case 12:
                        head = head + '<td>FASE</td>'
                        body = body + '<td><input type="hidden" id="{{contador}}" class="titulo" value="{{FASE}}">{{FASE}}</td>'
                        break;
                    default:
                        head = head + '<td>Ejecutivo</td>'
                        body = body + '  <td><input type="hidden" id="{{contador}}" class="titulo" value="{{EJECUTIVO}}">{{EJECUTIVO}}</td>'
                        break;
                }
                head = head + '<td class="tDer">7-14 Días</td>' + '<td class="tDer">15-21 Días</td>' + '<td class="tDer">22-28 Días</td>' + '<td class="tDer">28+ Días</td>' + '<td class="tDer">Total</td>'
                body = body + '  <td class="tDer sietedias_{{contador}} sumaTotal" data-dato="{{VENCIDO1}}" data-sietedias="{{VENCIDO1}}"><a href="/privado/reportes_sin_seguimiento_detalle_mejora.dbsp?vista=' + vista + '&periodo=1&moneda=' + moneda + '&parametros={{hlpParametros ' + vista + '}}"><span class="">{{hlp_Simbolo_Moneda VENCIDO1 "' + simbolomoneda + '" 0}}</span></a></td>' + '  <td class="tDer quincedias_{{contador}} sumaTotal" data-dato="{{VENCIDO2}}" data-quincedias="{{VENCIDO2}}"><a href="/privado/reportes_sin_seguimiento_detalle_mejora.dbsp?vista=' + vista + '&periodo=2&moneda=' + moneda + '&parametros={{hlpParametros ' + vista + '}}"><span class="">{{hlp_Simbolo_Moneda VENCIDO2 "' + simbolomoneda + '" 0}}</span></a></td>' + '  <td class="tDer veintidosdias_{{contador}} sumaTotal" data-dato="{{VENCIDO3}}" data-veintidosdias="{{VENCIDO3}}"><a href="/privado/reportes_sin_seguimiento_detalle_mejora.dbsp?vista=' + vista + '&periodo=3&moneda=' + moneda + '&parametros={{hlpParametros ' + vista + '}}"><span class="">{{hlp_Simbolo_Moneda VENCIDO3 "' + simbolomoneda + '" 0}}</span></a></td>' + '  <td class="tDer veintiochodias_{{contador}} sumaTotal" data-dato="{{VENCIDO4}}" data-veintiochodias="{{VENCIDO4}}"><a href="/privado/reportes_sin_seguimiento_detalle_mejora.dbsp?vista=' + vista + '&periodo=4&moneda=' + moneda + '&parametros={{hlpParametros ' + vista + '}}"><span class="">{{hlp_Simbolo_Moneda VENCIDO4 "' + simbolomoneda + '" 0}}</span></a></td>' + '  <td class="tDer sumaTotal" data-dato="{{TOTAL}}"><a href="/privado/reportes_sin_seguimiento_detalle_mejora.dbsp?vista=' + vista + '&periodo=5&moneda=' + moneda + '&parametros={{hlpParametros ' + vista + '}}"><span class="">{{hlp_Simbolo_Moneda TOTAL "' + simbolomoneda + '" 0}}</span></a></td>' + '</tr>';


                var laVariante = $('#laVariante').val();
                var TotalizarE = _.where(SalesUp.Variables.jsonInfoReportes.variantes, {
                    tkRsv: laVariante
                });
                var Totalizar = TotalizarE[0].totalizar;
                if ((Totalizar === null || Totalizar === 1) && Totalizar != 0) {
                    var foot = '<tr class="elTotal"><td></td><td class="tDer">Totales</td>';
                    foot += '<td class="tDer">' +
                        Handlebars.helpers.hlp_Simbolo_Moneda(SumandoTotales.VENCIDO1, simbolomoneda, 1) +
                        '</td><td class="tDer">' +
                        Handlebars.helpers.hlp_Simbolo_Moneda(SumandoTotales.VENCIDO2, simbolomoneda, 1) +
                        '</td><td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda(SumandoTotales.VENCIDO3, simbolomoneda, 1) +
                        '</td><td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda(SumandoTotales.VENCIDO4, simbolomoneda, 1) +
                        '</td><td class="tDer">' +
                        Handlebars.helpers.hlp_Simbolo_Moneda(SumandoTotales.TOTAL, simbolomoneda, 1) + '</td>'
                    foot += '</tr>';
                } else if (Totalizar === 2) {
                    var foot = '<tr class="elTotal"><td></td><td class="tDer">Promedios</td>';
                    foot += '<td class="tDer">' +
                        Handlebars.helpers.hlp_Simbolo_Moneda((SumandoTotales.VENCIDO1 / _.size(jsonDatos2)), simbolomoneda, 1) +
                        '</td><td class="tDer">' +
                        Handlebars.helpers.hlp_Simbolo_Moneda((SumandoTotales.VENCIDO2 / _.size(jsonDatos2)), simbolomoneda, 1) +
                        '</td><td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda((SumandoTotales.VENCIDO3 / _.size(jsonDatos2)), simbolomoneda, 1) +
                        '</td><td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda((SumandoTotales.VENCIDO4 / _.size(jsonDatos2)), simbolomoneda, 1) +
                        '</td><td class="tDer">' +
                        Handlebars.helpers.hlp_Simbolo_Moneda((SumandoTotales.TOTAL / _.size(jsonDatos2)), simbolomoneda, 1) + '</td>'
                    foot += '</tr>';
                } else {
                    var foot = '';
                }
                if (hof == 1) {
                    return body
                }
                if (hof == 2) {
                    return foot
                }
                return head

            }

            var templateCuerpo = getTemplate(1, vista, moneda)
            var templateHead = getTemplate(0, vista, moneda)
            var templateFoot = getTemplate(2, vista, moneda)

            categorias = [
                '7-14 Días',
                '15-21 Días',
                '22-28 Días',
                '28+ Días'
            ]

            tooltip = {
                headerFormat: '<span style="font-size:10px"><h3>{point.key}</h3></span><table>',
                pointFormatter: function() {
                    return '<tr><td style="color:' + this.series.color + ';padding:0"><b>' + this.series.name + ': </b></td><td style="text-align:right;padding:0"><b> ' + Handlebars.helpers.hlp_Simbolo_Moneda(this.y, simbolomoneda, 1) + '</b></td></tr>'
                },
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            }
            series = j
            if (Total > 0) {
                SalesUp.reportes.graficaColumna({
                    categorias: categorias,
                    tooltip: tooltip,
                    series: series
                })
            } else {
                $('#graficaReporte').html('')
            }
            //SalesUp.Construye.ConstruyeTabla(templateHead, templateCuerpo, jsonDatos, {Destino:'#DatosLoad', Id:'ReportTable',PagActual:SalesUp.Sistema.paginaActual(),NumRegistros:Total} );
            SalesUp.Construye.ConstruyeTabla(templateHead, templateCuerpo, jsonDatos, {
                Destino: '#DatosLoad',
                Id: 'ReportTable',
                PagActual: start,
                elInicio: start
            });
            var $tabla = $('#ReportTable');
            SalesUp.reportes.paginacion({
                registros: Total,
                start: start,
                callback: SalesUp.reportes.oportunidades.reporteOportunidadesSinSeguimiento,
                tabla: $tabla,
                parametros: filtro
            });

            $('#ReportTable tfoot').html(templateFoot);
        }

        var $lasVariantes = $('#lasVariantes'),
            $laVariante = $('#laVariante'),
            $laOpcion = $laVariante.find('option:selected');
        var tipoVariante = $laOpcion.attr('data-sistema');
        var qryString = 'tkrs=' + SalesUp.Variables.tkrs + '&tipoVariante=' + tipoVariante + '&' + SalesUp.Sistema.qryString({
            Formulario: $lasVariantes
        }) + '&inicia=' + start + '&filtros=' + encodeURIComponent(filtro);

        SalesUp.Sistema.CargaDatosAsync({
            link: '/privado/Modelo/jsonDatosOpSinSeguimientoMejorado.dbsp',
            prmAdicionales: qryString,
            parametros: qryString,
            callback: muestraReporteOSS
        })
    }

    this.reporteAvance = function(obj) {
        (!obj) ? obj = {} : '';
        var filtroNoparse = obj.filtro;
        var filtro = JSON.parse(obj.filtro);
        var objeto = obj.filtro;
        var objetoParse = JSON.parse(objeto);
        objetoParse = objetoParse.filtros;
        var laVariante = filtro.laVariante;
        var tipoDeVariante = filtro.TipoFase;
        var tipoVariante = filtro.tipoVariante;
        var start = (obj.start) ? obj.start : 1;
        var arr = '{';
        for (var i = 0; i < objetoParse.length; i++) {
            arr += '"' + Object.keys(objetoParse[i]) + '":"' + objetoParse[i][Object.keys(objetoParse[i])] + '",'
        }
        arr = arr.slice(0, -1);
        arr += '}';
        arr = JSON.parse(arr);
        SalesUp.Variables.objetoFiltros = arr;

        /*******************************/
        var tipo = SalesUp.Variables.objetoFiltros.tipo;
        var tiempo = SalesUp.Variables.objetoFiltros.Tiempo;
        var moneda = SalesUp.Variables.objetoFiltros.moneda;
        /*******************************/


        /*******************************/
        SalesUp.Variables.objetoFiltro = {
            'tipoDeVariante': tipoDeVariante,
            'TIPORESULT': tipo,
            'TIPOTIEMPO': tiempo,
            'moneda': moneda,
            'laVariante': laVariante
        };
        var tipoTotalMostrar = '';
        var tipoAjuste = '';
        if (tipo == 1) {
            resultado = 'FormatToMoney';
            tipoTotalMostrar = 'Total';
            tipoAjuste = 'tDer';
        } else if (tipo == 0) {
            resultado = 'FormatNumber';
            tipoTotalMostrar = 'Total';
            tipoAjuste = 'tCen';
        } else if (tiempo == 2) {
            resultado = 'MinutosDias';
            tipoTotalMostrar = 'Promedio';
            tipoAjuste = 'tCen';
        } else if (tiempo == 3) {
            resultado = 'MinutosHoras';
            tipoTotalMostrar = 'Promedio';
            tipoAjuste = 'tCen';
        } else if (tiempo == 1) {
            resultado = 'MinutosSemanas';
            tipoTotalMostrar = 'Promedio';
            tipoAjuste = 'tCen';
        } else if (tiempo == 4) {
            resultado = 'MinutosMinutos';
            tipoTotalMostrar = 'Promedio';
            tipoAjuste = 'tCen';
        } else {
            resultado = 'MinutosMes';
            tipoTotalMostrar = 'Promedio';
            tipoAjuste = 'tCen';
        }
        /*******************************/
        var vistaReporteCrea = function(Op) {
            SalesUp.Variables.DatosRecibidos = SalesUp.Sistema.clone(Op);
            
                SalesUp.Sistema.MuestraEspera('#DatosLoad', 0);
                
                var template = '';
                var jsonHead = Op.jsonDatosHead;
                var jsonBody = Op.jsonDatosBody;
                var jsonSimbolo = Op.jsonDatosSimboloMoneda[0].MONEDA_SIMBOLO;
                var ElTotal = jsonBody.slice(-1);
                var totalRegistros = (Op.jsonDatosTotal[0].TOTALREGISTROS - 1);
                var jsoonBody = jsonBody.splice(totalRegistros, 1)
                js = ElTotal;
                var templateHeadth = '';
                var templateBody = '';
                construyeGrafica(Op, SalesUp.Variables.objetoFiltro);
                var Total = jsonHead[0].TOTAL;
                var porcent = (50 / jsonHead[0].TOTAL);
                var count = 1;
                var tBody = '<tr><td class="centrado Bold">{{nFila}}</td><td>{{NOMBRE}}</td>';
                var totalTemplate = '';
                templateHeadth += '<th style="width:20px;"></th><th class="tIzq">Nombre</th>';

                y = 1
                var Sumatoria = new Array;
                while (jsoonBody[0]['FASE' + y] != undefined) {
                    Sumatoria[y] = SalesUp.Sistema.sumaColumna(jsonBody, [{
                        columna: 'FASE' + y
                    }]);
                    y++
                }
                var laVariante = $('#laVariante').val();

                var TotalizarE = _.where(SalesUp.Variables.jsonInfoReportes.variantes, {
                    tkRsv: laVariante
                });
                var Totalizar = TotalizarE[0].totalizar;
                var totalTemplate = '';
                if ((Totalizar === null || Totalizar === 1) && Totalizar != 0) {
                    var i;
                    totalTemplate = '<tr class="elTotal"><td></td><td class="tDer">Totales</td>';
                    y = 1
                    for (i in Sumatoria) {
                        if (tipo == 1) {
                            totalTemplate += '<td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda(Sumatoria[y]['FASE' + y], jsonSimbolo, 1, 1) + '</td>';
                        } else {
                            totalTemplate += '<td class="' + tipoAjuste + '">' + Handlebars.helpers.hlpFases(Sumatoria[y]['FASE' + y], null, 1, 1) + '</span></b></td>';
                        }
                        y++;
                    }
                    totalTemplate += '</tr>';
                } else if (Totalizar === 2) {
                    var i;
                    totalTemplate = '<tr class="elTotal"><td></td><td class="tDer">Promedios</td>';
                    y = 1
                    for (i in Sumatoria) {
                        if (tipo == 1) {
                            totalTemplate += '<td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda(Sumatoria[y]['FASE' + y] / _.size(jsonBody), jsonSimbolo, 1, 1) + '</td>';
                        } else {
                            totalTemplate += '<td class="' + tipoAjuste + '">' + Handlebars.helpers.hlpFases(Sumatoria[y]['FASE' + y] / _.size(jsonBody), null, 1, 1) + '</span></b></td>';
                        }
                        y++;
                    }
                    totalTemplate += '</tr>';
                }

                for (var i = 0; i < jsonHead.length; i++) {
                    templateHeadth += '<th class="centrado fasesids" style="width:' + porcent + ';" id="FASE' + count + '" data-idfase="' + jsonHead[i].TK + '" data-cont="' + count + '"> ' + Handlebars.helpers.hlpCortaPalabra(jsonHead[i].CABECERA, 20, 5) + ' </th>';
                    tBody += '<td class="' + tipoAjuste + '">{{hlpFases FASE' + count + ' ' + count + ' "' + jsonSimbolo + '"}}</td>';
                    count++;
                }

                tBody += '</tr>';

                SalesUp.Construye.ConstruyeTabla(templateHeadth, tBody, jsonBody, {
                    Destino: '#DatosLoad',
                    Id: 'reporteContenido',
                    elInicio: start
                });
                var $tabla = $('#reporteContenido');

                $('.fasesids').each(function() {
                    var $elemento = $(this);
                    var id = $elemento.attr('data-idfase');
                    var cont = $elemento.attr('data-cont');

                    $('.LINKFASE' + cont).each(function() {
                        var $link = $(this);
                        var href = $link.attr('href') + id;
                        $link.attr('href', href);
                    });
                });
                SalesUp.reportes.paginacion({
                    registros: totalRegistros,
                    start: start,
                    callback: SalesUp.reportes.oportunidades.reporteAvance,
                    tabla: $tabla,
                    parametros: filtroNoparse
                });

                $('#reporteContenido tfoot').append(totalTemplate);
                SalesUp.Sistema.MinutosFormatos();

            }
            /*******************************/
        SalesUp.Sistema.CargaDatosAsync({
            link: '/privado/Modelo/jsonAvancesFases.dbsp',
            parametros: 'OBJETO=' + filtroNoparse + '&inicio=' + start,
            callback: vistaReporteCrea
        });

        /*******************************/
        var construyeGrafica = function(Op, objCriterios) {
            SalesUp.Variables.jsonOp = objCriterios;

            var tipoFiltro = objCriterios.tipoDeVariante;
            var TIPORESULT = objCriterios.TIPORESULT;
            var TIPOTIEMPO = objCriterios.TIPOTIEMPO;
            var idmoneda = objCriterios.moneda;
            var cabecera = [];
            var Ids = [];
            var tiempoCode = '';
            var TitiloGrafica = '';
            var TituloComplemento = '';
            /*******************************/
            var fasesArr = [];
            var jBody = Op.jsonDatosBody;
            var jCabecera = Op.jsonDatosHead;
            var total = jCabecera[0].TOTAL;
            var nombreusr = [];
 
           
            for (var i = 0; i < jBody.length; i++) {
                nombreusr.push(jBody[i].NOMBRE);
            }
        
            var arrNombreFases = _.pluck(jCabecera, 'CABECERA');
            var dataSeries = [];

            for (var i = 1; i <= total; i++) {
                var arrAux = {};
                var arrFase = _.pluck(jBody, 'FASE' + i);

                for (var x = 0; x < _.size(arrFase); x++) {
                    arrFase[x] = parseFloat(arrFase[x]);
                }

                arrAux.name = arrNombreFases[i - 1];
                arrAux.data = arrFase;
                dataSeries.push(arrAux);
            }

            if (tipoFiltro == 0) {
                TituloComplemento = 'prospectos';
            }

            if (tipoFiltro == 1) {
                TituloComplemento = 'oportunidades';
            }

            if (tipoFiltro == 2) {
                TituloComplemento = 'clientes';
            }
            /*******************************/
            /*******************************/
            if (TIPORESULT == 0) {
                TitiloGrafica = 'Cantidad';
            }
            if (TIPORESULT == 1) {
                TitiloGrafica = 'Monto';
            }
            if (TIPORESULT == 2) {
                if (TIPOTIEMPO == 2) {
                    tiempoCode = 'd';
                    TitiloGrafica = 'Tiempo (dìas)';
                }
                if (TIPOTIEMPO == 3) {
                    tiempoCode = 'h';
                    TitiloGrafica = 'Tiempo (horas)';
                }
                if (TIPOTIEMPO == 4) {
                    tiempoCode = 'min';
                    TitiloGrafica = 'Tiempo (Minutos)';
                }
                if (TIPOTIEMPO == 1) {
                    tiempoCode = 'sem';
                    TitiloGrafica = 'Tiempo (Semanas)';
                }
                if (TIPOTIEMPO == 0) {
                    tiempoCode = 'm';
                    TitiloGrafica = 'Tiempo (Meses)';
                }
            }
            /*************************************/
            var tooltip = '';

            if (TIPORESULT == 0) {
                tooltip = {
                    shared: false,
                    formatter: function() {
                        return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + SalesUp.Sistema.FormatoNumero(this.y) + '<br/>' + 'Total: ' + SalesUp.Sistema.FormatoNumero(this.point.stackTotal);
                    }
                }
            } else if (TIPORESULT == 1) {
                tooltip = {
                    shared: false,
                    formatter: function() {
                        return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + SalesUp.Sistema.FormatoMoneda(this.y) + '<br/>' + 'Total: ' + SalesUp.Sistema.FormatoMoneda(this.point.stackTotal);
                    }
                }
            } else if (TIPORESULT >= 2) {
                tooltip = {
                    shared: false,
                    formatter: function() {
                        return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + SalesUp.Sistema.FormatoMinutos({
                            Minutos: this.y,
                            Tipo: tiempoCode,
                            Unidad: true
                        }) + '<br/>' + 'Total: ' + SalesUp.Sistema.FormatoMinutos({
                            Minutos: this.point.stackTotal,
                            Tipo: tiempoCode,
                            Unidad: true
                        });
                    }
                }
            }
            /*************************************/
            var labels = '';
            if (TIPORESULT >= 2) {
                labels = {
                    formatter: function() {
                        return SalesUp.Sistema.FormatoMinutos({
                            Minutos: this.value,
                            Tipo: tiempoCode,
                            Unidad: true
                        });
                    }
                }
            } else {
                labels = 'undefined';
            }
            SalesUp.reportes.graficaBarra({
                categorias: nombreusr,
                series: dataSeries,
                tooltip: tooltip
            })
        }

    }


    this.winVsLose = function(obj) {
        (!obj) ? obj = {} : '';
        var filtro = obj.filtro;
        var objFiltro = JSON.parse(filtro);
        var start = (obj.start) ? obj.start : 1;

        var muestraReporteWvL = function(Op) {
            SalesUp.Variables.DatosRecibidos = SalesUp.Sistema.clone(Op);
            SalesUp.Variables.WinVsLoseDatos = Op;
            var Datos = Op.jsonDatos;
            var Simbolo = Op.jsonInfo.MONEDA;
            var Total = Op.jsonInfo.TOTAL;
            var thead = '\
					<tr><td style="width:20px;" class="tCen"></td>\
					<td class="tIzq">Periodo</td>\
					<td class="tDer">Activas</td>\
					<td class="tDer" colspan="2">%</td>\
					<td class="tDer">Ganadas</td>\
					<td class="tDer" colspan="2">%</td>\
					<td class="tDer">Perdidas</td>\
					<td class="tDer" colspan="2">%</td>\
					<td class="tDer">Total</td>\
					<td class="tDer" colspan="2">%</td>\
					';

            var tBody = '<tr>\
					<td class="tCen"><strong>{{nFila}}</strong></td>\
					<td><span class="Tip2" tip="{{hlpFormatoFecha FECHA_INI}} - {{hlpFormatoFecha FECHA_FIN}}">{{PERIODO}}</span></td>\
					<td class="tDer activas"><a href="/privado/detalleReporteGanadasVsPerdidas.dbsp?' + qryString + '&fecha1={{FECHA_INI}}&fecha2={{FECHA_FIN}}&TIPO=0">{{hlp_Simbolo_Moneda MONTO_ACTIVA "' + Simbolo + '" 0}}</a></td>\
					<td class="tCen" style="width: 30px">{{ACTIVAS}}</td>\
					<td class="tDer" style="width: 30px">{{hlpSimboloPorcentaje PCT_ACTIVAS}}</td>\
					<td class="tDer ganadas"><a href="/privado/detalleReporteGanadasVsPerdidas.dbsp?' + qryString + '&fecha1={{FECHA_INI}}&fecha2={{FECHA_FIN}}&TIPO=1">{{hlp_Simbolo_Moneda MONTO_GANADA "' + Simbolo + '" 0}}</a></td>\
					<td class="tCen" style="width: 30px">{{GANADAS}}</td>\
					<td class="tDer" style="width: 30px">{{hlpSimboloPorcentaje PCT_GANADAS}}</td>\
					<td class="tDer perdidas"><a href="/privado/detalleReporteGanadasVsPerdidas.dbsp?' + qryString + '&fecha1={{FECHA_INI}}&fecha2={{FECHA_FIN}}&TIPO=2">{{hlp_Simbolo_Moneda MONTO_PERDIDA "' + Simbolo + '" 0}}</a></td>\
					<td class="tCen" style="width: 30px">{{PERDIDAS}}</td>\
					<td class="tDer" style="width: 30px">{{hlpSimboloPorcentaje PCT_PERDIDAS}}</td>\
					<td class="tDer" style="width: 30px"><a href="/privado/detalleReporteGanadasVsPerdidas.dbsp?' + qryString + '&fecha1={{FECHA_INI}}&fecha2={{FECHA_FIN}}&TIPO=3">{{hlp_Simbolo_Moneda MONTO_TOTAL "' + Simbolo + '" 0}}</a></td>\
					<td class="tCen">{{TOTAL}}</td>\
					<td class="tDer" style="width: 30px">{{hlpSimboloPorcentaje PCT_MONTO}}</td>\
					</tr>';

            var totales = SalesUp.Sistema.sumaColumna(Datos, [{
                columna: 'MONTO_TOTAL'
            }, {
                columna: 'MONTO_PERDIDA'
            }, {
                columna: 'MONTO_ACTIVA'
            }, {
                columna: 'MONTO_GANADA'
            }, {
                columna: 'GANADAS'
            }, {
                columna: 'PERDIDAS'
            }, {
                columna: 'ACTIVAS'
            }, {
                columna: 'TOTAL'
            }]);


            var laVariante = $('#laVariante').val();
            var TotalizarE = _.where(SalesUp.Variables.jsonInfoReportes.variantes, {
                tkRsv: laVariante
            });
            var Totalizar = TotalizarE[0].totalizar;
            if ((Totalizar === null || Totalizar === 1) && Totalizar != 0) {
                var tFoot = '<tr class="elTotal">\
						<td></td>\
						<td class="tDer">Totales</td>\
						<td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda(totales.MONTO_ACTIVA, Simbolo, 1) + '</td>\
						<td class="tCen">' + totales.ACTIVAS + '</td>\
						<td class="tDer">' + Handlebars.helpers.hlpSimboloPorcentaje(totales.ACTIVAS / totales.TOTAL) + '</td>\
						<td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda(totales.MONTO_GANADA, Simbolo, 1) + '</td>\
						<td class="tCen">' + totales.GANADAS + '</td>\
						<td class="tDer">' + Handlebars.helpers.hlpSimboloPorcentaje(totales.GANADAS / totales.TOTAL) + '</td>\
						<td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda(totales.MONTO_PERDIDA, Simbolo, 1) + '</td>\
						<td class="tCen">' + totales.PERDIDAS + '</td>\
						<td class="tDer">' + Handlebars.helpers.hlpSimboloPorcentaje(totales.PERDIDAS / totales.TOTAL) + '</td>\
						<td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda(totales.MONTO_TOTAL, Simbolo, 1) + '</td>\
						<td class="tCen">' + totales.TOTAL + '</td>\
						<td class="tDer">' + Handlebars.helpers.hlpSimboloPorcentaje(totales.MONTO_GANADA / totales.MONTO_TOTAL) + '</td>\
						</tr>\
					'
            } else if (Totalizar === 2) {
                var tFoot = '<tr class="elTotal">\
						<td></td>\
						<td class="tDer">Promedios</td>\
						<td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda((totales.MONTO_ACTIVA / _.size(Datos)), Simbolo, 1) + '</td>\
						<td class="tCen">' + SalesUp.Sistema.numeroConDecimal(totales.ACTIVAS / _.size(Datos)) + '</td>\
						<td class="tDer">' + Handlebars.helpers.hlpSimboloPorcentaje((totales.ACTIVAS / totales.TOTAL) / _.size(Datos)) + '</td>\
						<td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda((totales.MONTO_GANADA) / _.size(Datos), Simbolo, 1) + '</td>\
						<td class="tCen">' + SalesUp.Sistema.numeroConDecimal(totales.GANADAS / _.size(Datos)) + '</td>\
						<td class="tDer">' + Handlebars.helpers.hlpSimboloPorcentaje((totales.GANADAS / totales.TOTAL) / _.size(Datos)) + '</td>\
						<td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda(totales.MONTO_PERDIDA / _.size(Datos), Simbolo, 1) + '</td>\
						<td class="tCen">' + SalesUp.Sistema.numeroConDecimal(totales.PERDIDAS / _.size(Datos)) + '</td>\
						<td class="tDer">' + Handlebars.helpers.hlpSimboloPorcentaje((totales.PERDIDAS / totales.TOTAL) / _.size(Datos)) + '</td>\
						<td class="tDer">' + Handlebars.helpers.hlp_Simbolo_Moneda(totales.MONTO_TOTAL / _.size(Datos), Simbolo, 1) + '</td>\
						<td class="tCen">' + SalesUp.Sistema.numeroConDecimal(totales.TOTAL / _.size(Datos)) + '</td>\
						<td class="tDer">' + Handlebars.helpers.hlpSimboloPorcentaje((totales.MONTO_GANADA / totales.MONTO_TOTAL) / _.size(Datos)) + '</td>\
						</tr>\
					'
            }

            var tConfig = '\
					<colgroup>\
					<col>\
					<col>\
					<col style="border-left:1px dotted gray">\
					<col>\
					<col>\
					<col style="border-left:1px dotted gray">\
					<col>\
					<col>\
					<col style="border-left:1px dotted gray">\
					<col>\
					<col>\
					<col style="border-left:1px dotted gray">\
					<col>\
					<col>\
					</colgroup>\
				';

            SalesUp.Construye.ConstruyeTabla(thead, tBody, Datos, {
                Destino: '#DatosLoad',
                Id: 'reporteContenido',
                elInicio: start
            });
            var $tabla = $('#reporteContenido');
            SalesUp.reportes.paginacion({
                registros: Total,
                start: start,
                callback: SalesUp.reportes.oportunidades.winVsLose,
                tabla: $tabla,
                parametros: filtro
            });
            $('#reporteContenido').append(tFoot);
            $("#reporteContenido").prepend(tConfig);

            var DatosGrafica = SalesUp.reportes.oportunidades.WinVsLoseDatosPGrafica({
                Datos: SalesUp.Variables.WinVsLoseDatos
            }, 0)
            SalesUp.reportes.DualAxis(DatosGrafica)

        }

        var $lasVariantes = $('#lasVariantes'),
            $laVariante = $('#laVariante'),
            $laOpcion = $laVariante.find('option:selected');
        var tipoVariante = $laOpcion.attr('data-sistema');
        var filtros2 = SalesUp.reportes.obtieneValoresCriterios({sinVacios:true});
        var qryString = 'tkrs=' + SalesUp.Variables.tkrs + '&tipoVariante=' + tipoVariante + '&' + SalesUp.Sistema.qryString({
            Formulario: $lasVariantes
        }) + '&inicia=' + start + '&filtros=' + encodeURIComponent(filtros2);

        SalesUp.Sistema.CargaDatosAsync({
            link: '/privado/Modelo/jsonDatosWvL.dbsp',
            prmAdicionales: qryString,
            parametros: qryString,
            callback: muestraReporteWvL
        })
    }

    this.WinVsLoseDatosPGrafica = function(Op, DatosGraficar) {
        var Datos = Op.Datos.jsonDatos;
        var Simbolo = Op.Datos.jsonInfo.MONEDA;
        var Ganadas = new Array();
        var Activas = new Array();
        var Perdidas = new Array();
        var porcentajeGanadas = new Array();

        var MontoGanadas = new Array();
        var MontoActivas = new Array();
        var MontoPerdidas = new Array();
        var Conversion = new Array();
        var categorias = new Array();
        for (var i in Datos) {
            Ganadas.push(parseInt(Datos[i].GANADAS));
            Activas.push(parseInt(Datos[i].ACTIVAS));
            Perdidas.push(parseInt(Datos[i].PERDIDAS));
            porcentajeGanadas.push(Datos[i].PCT_GANADAS * 100);

            MontoGanadas.push(parseFloat(Datos[i].MONTO_GANADA));
            MontoActivas.push(parseFloat(Datos[i].MONTO_ACTIVA));

            MontoPerdidas.push(parseFloat(Datos[i].MONTO_PERDIDA));
            Conversion.push(Datos[i].PCT_MONTO * 100);
            categorias.push(Datos[i].PERIODO);
        }

        if (DatosGraficar == 1) {
            datosGraficar = new Array({
                name: 'Ganadas',
                data: Ganadas
            }, {
                name: 'Activas',
                data: Activas
            }, {
                name: 'Perdidas',
                data: Perdidas
            }, {
                name: 'Conversion',
                data: porcentajeGanadas,
                type: 'spline',
                yAxis: 1,
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[3],
                    fillColor: 'white'
                }
            });
            var tooltip = {
                headerFormat: '<span style="font-size:10px"><h3>{point.key}</h3></span><table>',
                pointFormatter: function() {
                    if (this.series.name != 'Conversion') {
                        return '<tr><td style="color:' + this.series.color + ';padding:0"><b>' + this.series.name + ': </b></td><td style="text-align:right;padding:0"><b> ' + this.y + '</b></td></tr>'
                    } else {
                        return '<tr><td style="color:' + this.series.color + ';padding:0"><b>' + this.series.name + ': </b></td><td style="text-align:right;padding:0"><b> ' + SalesUp.Sistema.numeroConDecimal(this.y)+ ' %</b></td></tr>'
                    }
                },
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            }
        } else {
            datosGraficar = new Array({
                name: 'Ganadas',
                data: MontoGanadas
            }, {
                name: 'Activas',
                data: MontoActivas
            }, {
                name: 'Perdidas',
                data: MontoPerdidas
            }, {
                name: 'Conversion',
                data: Conversion,
                type: 'spline',
                yAxis: 1,
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[3],
                    fillColor: 'white'
                }
            });
            var tooltip = {
                headerFormat: '<span style="font-size:10px"><h3>{point.key}</h3></span><table>',
                pointFormatter: function() {
                    if (this.series.name != 'Conversion') {
                        return '<tr><td style="color:' + this.series.color + ';padding:0"><b>' + this.series.name + ': </b></td><td style="text-align:right;padding:0"><b> ' + Handlebars.helpers.hlp_Simbolo_Moneda(this.y, Simbolo, 1) + '</b></td></tr>'
                    } else {
                        return '<tr><td style="color:' + this.series.color + ';padding:0"><b>' + this.series.name + ': </b></td><td style="text-align:right;padding:0"><b> ' + SalesUp.Sistema.numeroConDecimal(this.y) + ' %</b></td></tr>'
                    }
                },
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            }
        }
        var miObj = new Object;
        miObj.tooltip = tooltip;
        miObj.datosGraficar = datosGraficar;
        miObj.categorias = categorias;
        return miObj;
    }

    this.switchGraficaWinVsLose = function(activo) {
        var tipoGrafica = (activo) ? 1 : 0;
        var x = SalesUp.reportes.oportunidades.WinVsLoseDatosPGrafica({
            Datos: SalesUp.Variables.WinVsLoseDatos
        }, tipoGrafica);
        SalesUp.reportes.DualAxis(x);
    }
}