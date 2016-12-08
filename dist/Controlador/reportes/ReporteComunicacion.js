var verCorreo = function (mail) {
    var idemail = mail;
    $("#resultado").html(" ");

    SalesUp.Construye.MuestraAlerta({
        TipoAlerta: 'AlertaModal',
        Alerta: '<iframe class="w100" src="/privado/CorreoEnviado.dbsp?idemail=' + idemail + '"></iframe>',
        Titulo: 'Correo enviado.',
        BotonOk: 'Cerrar',
        Alto: '400px',
        Ancho: '900px'
    });
};

var editarCorreo = function (Op) {
    var idemail = Op.mail;
    var idprospecto = Op.tkp;
    $("#resultado").html(" ");
    tb_show('Editar correo', 'popup_editar_correo_prospecto.dbsp?idemail=' + idemail + '&idprospecto=' + idprospecto + '&TB_callback=GetData&keepThis=false&TB_iframe=true&height=80&width=430', '');
};

var reenviar = function(mail) {
    var idemail = mail;
    SalesUp.Sistema.CargaDatosAsync({
        link: 'correo_reenviar.dbsp',
        dataType: 'html',
        parametros: 'idemail=' + idemail,
        callback: function() {
            SalesUp.Construye.MuestraNotificacion({
                Mensaje: '<i class="fa fa-send"><i/> El correo se ha reenviado'
            });
            SalesUp.reportes.aplicarFiltro();
        }
    });

};

var reportesComunicaciones = function() {

    this.reporteCorreosEnviados = function(obj) {
        obj = (!obj) ? {}: obj;
        var filtro = obj.filtro;
        var data = JSON.parse(filtro);
        var start = (obj.start) ? obj.start : 1;
        var generaReporte = function(Op, err) {
            SalesUp.Variables.DatosRecibidos = SalesUp.Sistema.clone(Op);
            var total = Op.jsonTotal[0].TOTAL;
            var datos = Op.jsonDatos;
            var tmpHead = '';
            var tmpBody = '';
            tmpHead += '<tr class="par">';
            tmpHead += '<th></th>';
            tmpHead += '<th class="tIzq">Nombre/Empresa</th>';
            tmpHead += '<th class="tIzq">Correo</th>';
            tmpHead += '<th class="tIzq">Asunto</th>';
            tmpHead += '<th class="tCen">Fecha de envio</th>';
            tmpHead += '<th class="tCen">Eje</th>';
            tmpHead += '<th class="tDer">Tipo</th>';
            tmpHead += '<th></th>';
            tmpHead += '</tr>';
            tmpBody += '<tr>';
            tmpBody += '<td class="tCen Bold">{{nFila}}</td>';
            tmpBody += '<td>{{hlpContactos NOMBRE TKP ESCLIENTE}}<br/>{{hlpEmpresa TKCOM EMPRESA}}</td>';
            tmpBody += '<td>{{hlpEsCorreo ESCORREO}}</td>';
            tmpBody += '<td>{{ASUNTO}}</td>';
            tmpBody += '<td class="tCen"><span>{{hlpFormatoFecha FECHAHORA}}</span> {{HORA}}</td>';
            tmpBody += '<td class="tCen"><span class="Tip8" tip="{{EJECUTIVO}}">{{INICIALES}}</span></td>';
            tmpBody += '<td class="tCen">{{hlpTipoCorreo}}</td>';
            tmpBody += '<td class="tCen">{{hlpEstadoCorreo}}</td>';
            tmpBody += '</tr>';
            SalesUp.Construye.ConstruyeTabla(tmpHead, tmpBody, datos, {
                Destino: '#DatosLoad',
                Id: 'ReportTable',
                elInicio: start
            });

            var $tabla = $('#ReportTable');
            SalesUp.reportes.paginacion({
                registros: total,
                start: start,
                callback: SalesUp.reportes.comunicacion.reporteCorreosEnviados,
                tabla: $tabla,
                parametros: filtro
            });
        };

        SalesUp.Sistema.CargaDatosAsync({
            link: '/privado/Modelo/jsonReporteCorreosEnviadosData.dbsp',
            parametros: 'filtros=' + filtro + '&inicio=' + start,
            callback: generaReporte
        });

    };

    this.reporteSms = function(obj) {
        obj = (!obj) ? {} : obj;
        var filtro = obj.filtro;
        var data = JSON.parse(filtro);
        var start = (obj.start) ? obj.start : 1;

        var generaReporte = function (Op, err) {
            SalesUp.Variables.DatosRecibidos = SalesUp.Sistema.clone(Op);
            var datos = Op.jsonDatos;
            var total = Op.jsonTotal[0].TOTAL;
            var vista = Op.jsonTotal[0].VISTA;
            var tmpHead = '';
            var tmpBody = '';
            var tmpFoot = '';
            var columnas = [];
            var totales = [];
            if (vista === 1) {

                columnas = [{
                    columna: 'SMS_ENVIADOS'
                }];
                totales = SalesUp.Sistema.sumaColumna(datos, columnas);

                tmpHead += '<tr class="par">';
                tmpHead += '<th></th>';
                tmpHead += '<th class="tIzq">Ejecutivo</th>';
                tmpHead += '<th style="width: 75px;">Enviados</th>';
                tmpHead += '</tr>';
                tmpBody += '<tr>';
                tmpBody += '<td class="tCen Bold">{{nFila}}</td>';
                tmpBody += '<td>{{EJECUTIVO}} ({{INICIALES}})</td>';
                tmpBody += '<td class="tCen Bold">{{SMS_ENVIADOS}}</td>';
                tmpBody += '</tr>';
                tmpFoot += '<tr class="elTotal">';
                var laVariante = $('#laVariante').val();
                var TotalizarE = _.where(SalesUp.Variables.jsonInfoReportes.variantes,{tkRsv:laVariante});
                var Totalizar = TotalizarE[0].totalizar;
                if ((Totalizar === null || Totalizar === 1) && Totalizar != 0) {
                    tmpFoot += '<td></td><td class="tDer">Total de SMS enviados</td>';
                    tmpFoot += '<td class="tCen Bold">' + totales.SMS_ENVIADOS + '</td>';
                }else if(Totalizar === 2){
                    tmpFoot += '<td></td><td class="tDer">Promedio de SMS enviados</td>';
                    tmpFoot += '<td class="tCen Bold">' + SalesUp.Sistema.numeroConDecimal(totales.SMS_ENVIADOS/_.size(datos)) + '</td>';
                }
                tmpFoot += '</tr>';
            } else {
                tmpHead += '<tr class="par">';
                tmpHead += '<th></th>';
                tmpHead += '<th class="tCen">Nombre/Empresa</th>';
                tmpHead += '<th class="tCen">Móvil</th>';
                tmpHead += '<th class="tCen">Mensaje</th>';
                tmpHead += '<th class="tCen">Respuesta</th>';
                tmpHead += '<th class="tCen">Fecha de envío</th>';
                tmpHead += '<th class="tCen">Eje</th>';
                tmpHead += '<th class="tCen"></th>';
                tmpHead += '</tr>';
                tmpBody += '<tr>';
                tmpBody += '<td class="Bold">{{nFila}}</td>';
                tmpBody += '<td>{{hlpContactos NOMBRE TKP ESCLIENTE}}<br/>{{hlpEmpresa TKCOM EMPRESA}}</td>';
                tmpBody += '<td>{{DESTINATARIO}}</td>';
                tmpBody += '<td>{{CUERPO}}</td>';
                tmpBody += '<td>{{RESPUIESTA}}</td>';
                tmpBody += '<td class="tCen"><span>{{hlpFormatoFecha FECHA}}</span> {{HORA}}</td>';
                tmpBody += '<td class="tCen Tip8" tip="{{EJECUTIVO}}">{{INICIALES}}</td>';
                tmpBody += '<td>{{hlpTipoSMS}}</td>';
                tmpBody += '</tr>';
            }

            SalesUp.Construye.ConstruyeTabla(tmpHead, tmpBody, datos, {
                Destino: '#DatosLoad',
                Id: 'ReportTable',
                elInicio: start
            });
            var $tabla = $('#ReportTable');

            if (vista == 1) {
                $('#ReportTable tfoot').html(tmpFoot);
                $tabla.attr('style', 'width: 400px;');
            }

        };

        SalesUp.Sistema.CargaDatosAsync({
            link: '/privado/Modelo/jsonReporteSmsData.dbsp',
            parametros: 'filtros=' + filtro + '&inicio=' + start,
            callback: generaReporte
        });
    };
};