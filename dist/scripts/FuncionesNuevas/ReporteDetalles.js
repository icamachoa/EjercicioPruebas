SalesUp.Variables.pagInicio=1;
var ReportesDetalle = function(){
  var tk = $('#tk').val();
  var tipo = $('#tipo').val();
  var fecha_desde = $('#fecha_desde').val();
  var fecha_hasta = $('#fecha_hasta').val();
  var agrupar = $('#agrupar').val();
  var periodo = $('#periodo').val();
  var tipoReporte = '';
  switch(tipo){
    case '1':
      tipoReporte = 'Prospectos nuevos';
      break;
    case '2':
      tipoReporte = 'Prospectos asignados';
      break;
    case '3':
      tipoReporte = 'Prospectos descartados';
      break;
    case '4':
      tipoReporte = 'Oportunidades Nuevas';
      break;
    case '5':
      tipoReporte = 'Oportunidades descartadas';
      break;
    case '6':
      tipoReporte = 'Ventas';
      break;
    case '7':
      tipoReporte = 'Seguimientos';
      break;
    case '8':
      tipoReporte = 'Seguimientos post-venta';
      break;
  }
   $('#contenedor').children('h2').html(tipoReporte);

  if(agrupar==0){agrupar=1;}
  var tablaReporteDetalle = function(Op,err){
    var tamanio = Op.jsonTotal[0].TOTAL;
    var jData = Op.jsonDatos;
    var ltReporte = [];
    var tmpHead = '';
    var tmpBody = '';
    if(tipo <= 3){
      tmpHead = '<tr class="par">';
        tmpHead += '<th class="centrado"></th>';
        tmpHead += '<th class="centrado">Nombre / Empresa</th>';
        tmpHead += '<th class="centrado">Email / Teléfono</th>';
        tmpHead += '<th class="centrado">Creado / Origen</th>';
        if(tipo == 3){
          tmpHead += '<th class="centrado">Descartado</th>';
          tmpHead += '<th class="centrado">Razón</th>';
        }
        tmpHead += '<th class="centrado">Último contacto</th>';
        tmpHead += '<th class="centrado">Ejecutivo</th>';
      tmpHead += '</tr>';
      tmpBody = '<tr>';
        tmpBody += '<td>{{num}}</td>';
        tmpBody += '<td><a href="prospectos-visualizar.dbsp?tkp={{tkp}}"><b>{{nombre}}</b></a>';
        tmpBody += '<br/><b>{{EmpresaProspecto Empresa tkcom}}</b></td>';
        tmpBody += '<td> {{CorreoProspecto Correo}} {{telefonoContacto Telefono}}</td>';
        tmpBody += '<td class="centrado">{{fechaCreado}}<br/>{{origen}}</td>';
        if(tipo == 3){
          tmpBody += '<td class="centrado">{{fechaDescartado}}</td>';
          tmpBody += '<td class="centrado">{{descartadoRazon}}</td>';
        }
        tmpBody += '<td class="centrado"><b>{{tUltimoContacto}}</b> [{{uUltimoContacto}}] - {{ultimoContacto}}</td>';
        tmpBody += '<td class="centrado"><b class="Pointer Tip8" tip="{{nombreUsuario}}">{{iniciales}}</b></td>';
      tmpBody += '</tr>';
      if(tamanio> 0){
        for(var je = 0; je <  _.size(Op.jsonDatos); je++){
          var arrReporteDetalle = {};
          var ja = jData[je];
          arrReporteDetalle.num = ja.ROW;
          arrReporteDetalle.nombre = ja.NOMBRE;
          arrReporteDetalle.Empresa = ja.EMPRESA;
          arrReporteDetalle.tkcom = ja.TKCOM;
          arrReporteDetalle.tkp = ja.TKP;
          arrReporteDetalle.Correo = ja.CORREO;
          arrReporteDetalle.Telefono = ja.TELEFONO;
          arrReporteDetalle.descartadoRazon = ja.DESCARTADORAZON;
          arrReporteDetalle.iniciales = ja.INICIALES;
          arrReporteDetalle.nombreUsuario = ja.NOMBRE_USUARIO;
          arrReporteDetalle.fechaCreado = ja.FECHA_CREADO;
          arrReporteDetalle.origen = ja.ORIGEN;
          arrReporteDetalle.fechaDescartado = ja.FECHA_DESCARTADO;
          arrReporteDetalle.ultimoContacto = ja.ULTIMO_CONTACTO;
          arrReporteDetalle.tUltimoContacto = ja.ULTIMO_CONTACTO_TIEMPO;
          arrReporteDetalle.uUltimoContacto = ja.ULTIMO_CONTACTO_USUARIO;
          ltReporte.push(arrReporteDetalle);
        }
        $('.alerta-mensaje').attr('style','display:none');
        SalesUp.Construye.ConstruyeTabla(tmpHead,tmpBody,ltReporte,{Destino:'#tablaDatos',Id:'ReportTable',PagActual:SalesUp.Sistema.paginaActual(),NumRegistros:tamanio});
        SalesUp.exporta.btnExportar({titulo:tipoReporte})
      }else{
        $('.alerta-mensaje').removeAttr('style');
      }
      $('#btnAccionesReporte').removeAttr('style');
      $('#DatosLoad').removeAttr('style');
      var $esperando = $('#Esperando');
      if($esperando){
        $esperando.slideUp(500)
        $esperando.remove();
      }
    }else if (tipo == 4 || tipo == 5 || tipo ==6) {
      tmpHead = '<tr class="par">';
        tmpHead += '<th class="centrado"></th>';
        tmpHead += '<th class="centrado">Nombre / Empresa</th>';
        tmpHead += '<th class="centrado">Email / Teléfono</th>';
        tmpHead += '<th class="centrado">Fase</th>';
        tmpHead += '<th class="centrado">Concepto</th>';
        tmpHead += '<th class="centrado">Monto</th>';
        tmpHead += '<th class="centrado">Comisión</th>';
        tmpHead += '<th class="centrado">Certeza</th>';
        tmpHead += '<th class="centrado">Cierre Estimado</th>';
        tmpHead += '<th class="centrado">Último contacto</th>';
        if(tipo == 5){
          tmpHead += '<th class="centrado">Perdida</th>';
          tmpHead += '<th class="centrado">Razón</th>';
        }
        tmpHead += '<th class="centrado">Ejecutivo</th>';
      tmpHead += '</tr>';
      tmpBody = '<tr>';
        tmpBody += '<td>{{num}}</td>';
        tmpBody += '<td><a {{hlp_Accion_Reporte_Actividades_Detalle esventa tko tkv}}><b>{{nombre}}</b></a>';
        tmpBody += '<br/><b>{{EmpresaProspecto Empresa tkcom}}</b></td>';
        tmpBody += '<td> {{CorreoProspecto}} {{telefonoContacto}}</td>';
        tmpBody += '<td class="centrado">{{fase}}</td>';
        tmpBody += '<td class="centrado">{{concepto}}</td>';
        tmpBody += '<td class="centrado">{{hlp_Simbolo_Moneda monto simbolo}}</td>';
        tmpBody += '<td class="centrado">{{hlp_Simbolo_Moneda comision simbolo}}</td>';
        tmpBody += '<td class="centrado">{{CertezaOportunidad Certeza}}</td>';
        tmpBody += '<td class="centrado">{{fechaCierre}}</td>';
        tmpBody += '<td class="centrado"><b>{{tUltimoContacto}}</b> - {{ultimoContacto}}</td>';
        if(tipo == 5){
          tmpBody += '<td class="centrado">{{fechaPerdida}}</td>';
          tmpBody += '<td class="centrado">{{perdidaRazon}}</td>';
        }
        tmpBody += '<td class="centrado"><b class="Pointer Tip8" tip="{{nombreUsuario}}">{{iniciales}}</b></td>';
      tmpBody += '</tr>';
      if(tamanio> 0){
        for(var je = 0; je <  _.size(Op.jsonDatos); je++){
          var arrReporteDetalle = {};
          var ja = jData[je];
          arrReporteDetalle.num = ja.ROW;
          arrReporteDetalle.nombre = ja.NOMBRE;
          arrReporteDetalle.Empresa = ja.EMPRESA;
          arrReporteDetalle.tkcom = ja.TKCOM;
          arrReporteDetalle.tko = ja.TKO;
          arrReporteDetalle.tkv = ja.TKV;
          arrReporteDetalle.esventa = ja.ESVENTA;
          arrReporteDetalle.correo = ja.CORREO;
          arrReporteDetalle.telefono = ja.TELEFONO;
          arrReporteDetalle.concepto = ja.CONCEPTO;
          arrReporteDetalle.fase = ja.FASE;
          arrReporteDetalle.iniciales = ja.INICIALES;
          arrReporteDetalle.nombreUsuario = ja.NOMBRE_USUARIO;
          arrReporteDetalle.fechaCierre = ja.FECHA_CIERRE;
          arrReporteDetalle.simbolo = ja.MONEDA_SIMBOLO;
          arrReporteDetalle.monto = ja.MONTO;
          arrReporteDetalle.comision = ja.COMISION;
          arrReporteDetalle.Certeza = ja.CERTEZA;
          arrReporteDetalle.ultimoContacto = ja.ULTIMO_CONTACTO;
          arrReporteDetalle.tUltimoContacto = ja.ULTIMO_CONTACTO_TIEMPO;
          arrReporteDetalle.fechaPerdida = ja.PERDIDA_FECHA;
          arrReporteDetalle.perdidaRazon = ja.PERDIDA_RAZON;
          ltReporte.push(arrReporteDetalle);
        }
        $('.alerta-mensaje').attr('style','display:none');
        SalesUp.Construye.ConstruyeTabla(tmpHead,tmpBody,ltReporte,{Destino:'#tablaDatos',Id:'ReportTable',PagActual:SalesUp.Sistema.paginaActual(),NumRegistros:tamanio});
        SalesUp.exporta.btnExportar({titulo:tipoReporte})
      }else{
        $('.alerta-mensaje').removeAttr('style');
      }
      $('#btnAccionesReporte').removeAttr('style');
      $('#DatosLoad').removeAttr('style');
      var $esperando = $('#Esperando');
      if($esperando){
        $esperando.slideUp(500)
        $esperando.remove();
      }
    }else if (tipo == 7){
      tmpHead = '<tr class="par">';
        tmpHead += '<th class="centrado"></th>';
        tmpHead += '<th class="centrado">Nombre / Empresa</th>';
        tmpHead += '<th class="centrado">Email / Teléfono</th>';
        tmpHead += '<th class="centrado">Creado / Origen</th>';
        tmpHead += '<th class="centrado">Último contacto</th>';
        tmpHead += '<th class="centrado">Ejecutivo</th>';
      tmpHead += '</tr>';
      tmpBody = '<tr>';
        tmpBody += '<td>{{num}}</td>';
        tmpBody += '<td><a href="prospectos-visualizar.dbsp?tkp={{tkp}}"><b>{{nombre}}</b></a>';
        tmpBody += '<br/><b>{{EmpresaProspecto Empresa tkcom}}</b></td>';
        tmpBody += '<td> {{CorreoProspecto Correo}} {{telefonoContacto Telefono}}</td>';
        tmpBody += '<td class="centrado">{{fechaCreado}}<br/>{{origen}}</td>';
        tmpBody += '<td class="centrado"><b>{{tUltimoContacto}}</b> [{{uUltimoContacto}}] - {{ultimoContacto}}</td>';
        tmpBody += '<td class="centrado"><b class="Pointer Tip8" tip="{{nombreUsuario}}">{{iniciales}}</b></td>';
      tmpBody += '</tr>';
      if(tamanio> 0){
        for(var je = 0; je <  _.size(Op.jsonDatos); je++){
          var arrReporteDetalle = {};
          var ja = jData[je];
          arrReporteDetalle.num = ja.ROW;
          arrReporteDetalle.nombre = ja.NOMBRE;
          arrReporteDetalle.Empresa = ja.EMPRESA;
          arrReporteDetalle.tkcom = ja.TKCOM;
          arrReporteDetalle.tkp = ja.TKP;
          arrReporteDetalle.Correo = ja.CORREO;
          arrReporteDetalle.Telefono = ja.TELEFONO;
          arrReporteDetalle.iniciales = ja.INICIALES;
          arrReporteDetalle.nombreUsuario = ja.NOMBRE_USUARIO;
          arrReporteDetalle.fase = ja.FASE;
          arrReporteDetalle.fechaCreado = ja.FECHA_CONTACTO;
          arrReporteDetalle.Certeza = ja.CERTEZA;
          arrReporteDetalle.Monto = ja.MONTO;
          arrReporteDetalle.origen = ja.ORIGEN;
          arrReporteDetalle.simbolo = ja.MONEDA_SIMBOLO;
          arrReporteDetalle.ultimoContacto = ja.ULTIMO_CONTACTO;
          arrReporteDetalle.tUltimoContacto = ja.ULTIMO_CONTACTO_TIEMPO;
          arrReporteDetalle.uUltimoContacto = ja.ULTIMO_CONTACTO_USUARIO;
          ltReporte.push(arrReporteDetalle);
        }
        $('.alerta-mensaje').attr('style','display:none');
        SalesUp.Construye.ConstruyeTabla(tmpHead,tmpBody,ltReporte,{Destino:'#tablaDatos',Id:'ReportTable',PagActual:SalesUp.Sistema.paginaActual(),NumRegistros:tamanio});
        SalesUp.exporta.btnExportar({titulo:tipoReporte})
      }else{
        $('.alerta-mensaje').removeAttr('style');
      }
      $('#btnAccionesReporte').removeAttr('style');
      $('#DatosLoad').removeAttr('style');
      var $esperando = $('#Esperando');
      if($esperando){
        $esperando.slideUp(500)
        $esperando.remove();
      }
    }else if (tipo == 8){
      tmpHead = '<tr class="par">';
        tmpHead += '<th class="centrado"></th>';
        tmpHead += '<th class="centrado">Nombre / Empresa</th>';
        tmpHead += '<th class="centrado">Email / Teléfono</th>';
        tmpHead += '<th class="centrado">Creado</th>';
        tmpHead += '<th class="centrado">Tipo</th>';
        tmpHead += '<th class="centrado">Comentario</th>';
        tmpHead += '<th class="centrado">Ejecutivo</th>';
      tmpHead += '</tr>';
      tmpBody = '<tr>';
        tmpBody += '<td>{{num}}</td>';
        tmpBody += '<td><a href="clientes-visualizar.dbsp?tkp={{tkp}}"><b>{{nombre}}</b></a>';
        tmpBody += '<br/><b>{{EmpresaProspecto Empresa tkcom}}</b></td>';
        tmpBody += '<td> {{CorreoProspecto Correo}} {{telefonoContacto Telefono}}</td>';
        tmpBody += '<td class="centrado">{{fechaCreado}}</td>';
        tmpBody += '<td class="centrado">{{tipo}}</td>';
        tmpBody += '<td class="centrado">{{comentario}}</td>';
        tmpBody += '<td class="centrado"><b class="Pointer Tip8" tip="{{nombreUsuario}}">{{iniciales}}</b></td>';
      tmpBody += '</tr>';
      if(tamanio> 0){
        for(var je = 0; je <  _.size(Op.jsonDatos); je++){
          var arrReporteDetalle = {};
          var ja = jData[je];
          arrReporteDetalle.num = ja.ROW;
          arrReporteDetalle.nombre = ja.NOMBRE;
          arrReporteDetalle.Empresa = ja.EMPRESA;
          arrReporteDetalle.tkcom = ja.TKCOM;
          arrReporteDetalle.tkp = ja.TKP;
          arrReporteDetalle.Correo = ja.CORREO;
          arrReporteDetalle.Telefono = ja.TELEFONO;
          arrReporteDetalle.iniciales = ja.INICIALES;
          arrReporteDetalle.nombreUsuario = ja.NOMBRE_USUARIO;
          arrReporteDetalle.fechaCreado = ja.FECHA_CONTACTO;
          arrReporteDetalle.comentario = ja.COMENTARIO;
          arrReporteDetalle.tipo = ja.CATEGORIA;
          ltReporte.push(arrReporteDetalle);
        }
        $('.alerta-mensaje').attr('style','display:none');
        SalesUp.Construye.ConstruyeTabla(tmpHead,tmpBody,ltReporte,{Destino:'#tablaDatos',Id:'ReportTable',PagActual:SalesUp.Sistema.paginaActual(),NumRegistros:tamanio});
        SalesUp.exporta.btnExportar({titulo:tipoReporte})
      }else{
        $('.alerta-mensaje').removeAttr('style');
      }
      $('#btnAccionesReporte').removeAttr('style');
      $('#DatosLoad').removeAttr('style');
      var $esperando = $('#Esperando');
      if($esperando){
        $esperando.slideUp(500)
        $esperando.remove();
      }
    }
  }
  var parametros = 'tk='+tk+'&tipo='+tipo+'&fecha_desde='+fecha_desde+'&fecha_hasta='+fecha_hasta+'&agrupar='+agrupar+'&periodo='+periodo+'&inicio='+SalesUp.Variables.pagInicio;

  SalesUp.Sistema.CargaDatosAsync({
    link:'/privado/Modelo/jsonReporteActividadesDetalle.dbsp',
    parametros:parametros,
    callback:tablaReporteDetalle
  });
}

$(document).ready(function(){
    setTimeout(function(){
      var esperando = '<div id="Esperando" class="unMomento"><span id="boxEsperando"><i class="fa fa-spinner fa-spin"></i> <span>Un momento por favor...</span></span></div>';
      $('#DatosLoad').attr('style','display:none');
      ReportesDetalle();
      $('#contenedor').append(esperando);
    },500);
  });


function iraPag(Ir){
  PagAct = Ir;
  var Cond = '';
  SalesUp.Sistema.paginaActual({pagAct:PagAct});
  ActivaPaginacion(Cond,Ir);
}

var ActivaPaginacion=function(Cond,Ir){
  SalesUp.Variables.pagInicio = (parseInt(Ir) * parseInt(50)) - 50 + 1;
  ReportesDetalle();
};
