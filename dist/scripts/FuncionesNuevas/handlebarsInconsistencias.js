Handlebars.registerHelper('hlpInconsistencia',function(tipoDetalle,tipo,detalleInconsistencia){
  var str = '';
  var texto = detalleInconsistencia;
 
   switch(tipo){
      case 1:
        if(tipoDetalle==2){
          str = '<td style="width:150px;">Nombres</td>';
          str +='<td style="width:150px;">Apellidos</td>';
          str +='<td style="width:150px;">Empresa</td>';
          str += '<td style="width:200px;">Status</td>';
        }else if(tipoDetalle == 1 || tipoDetalle==9){
          str = '<td style="width:200px;">Contacto/Empresa</td>';
          str += '<td style="width:150px;">Email</td>';
          str += '<td style="width:200px;">Status</td>';
        }else if(tipoDetalle == 3 || tipoDetalle == 10 || tipoDetalle == 17){
          str = '<td style="width:200px;">Contacto/Empresa</td>';
          str += '<td style="width:150px;">Email</td>';
          str += '<td style="150px">Telefono</td>';
          str += '<td style="150px">Telefono</td>';
          str += '<td style="150px">Movil</td>';
          str += '<td style="width:200px;">Status</td>';
        }else if(tipoDetalle==4){
          str = '<td style="width:200px;">Contacto/Empresa</td>';
          str += '<td style="width:150px;">Email</td>';
          str += '<td style="250px">Calle</td>';
          str += '<td style="250px">Colonia</td>';
          str += '<td style="width:200px;">Status</td>';
        }else if(tipoDetalle ==5 || tipoDetalle == 6 || tipoDetalle == 7 || tipoDetalle==11 || tipoDetalle==12 || tipoDetalle==13){
          str = '<td style="width:150px;">Empresa</td>'
          str += '<td style="150px">Telefono</td>';
          str += '<td style="250px">Calle</td>';
          str += '<td style="250px">Colonia</td>';
         }else if(tipoDetalle==8 || tipoDetalle == 16){
          str = '<td style="width:150px;">Nombres</td>';
          str +='<td style="width:150px;">Apellidos</td>';
          str +='<td style="width:150px;">Empresa</td>';
          str +='<td style="width:200px;">Status</td>';
        }else if(tipoDetalle == 15){
          str = '<td style="width:200px;">Contacto/Empresa</td>';
          str += '<td style="width:150px;">Email</td>';
          str +='<td style="width:200px;">Status</td>';
        }
         
        
      break;
      case 2:
        if(tipoDetalle == 2 ){
          str = '<td class="tCen">{{nFila}}</td>';
          str += '<td class="Bold tCen"> <input type="checkbox" onclick="" data-tkp="{{TKP}}" class="checkboxLimite"></td>';
          str += '<td style="width:200px;">{{hlpContactosInconsistencias NOMBRE TKP ESCLIENTE}}</td>';
          str += '<td style="width:200px;">{{hlpContactosInconsistencias APELLIDOS TKP ESCLIENTE}}</td>';
          str +='<td>{{hlpEmpresaInconsistencias TKCOM NOMBRE_EMPRESA}}</td>';
           str += '<td>{{hlpArchivadoInconsistencia ARCHIVADO}}</td>';
        }else if(tipoDetalle == 1 || tipoDetalle==9){
          str = '<td class="tCen">{{nFila}}</td>';
          str += '<td class="Bold tCen"> <input type="checkbox" onclick=""  data-tkp="{{TKP}}" class="checkboxLimite"></td>';
          str += '<td>{{hlpContactosInconsistencias NOMBRE_PROSPECTO TKP ESCLIENTE}} <br> {{hlpEmpresaInconsistencias TKCOM NOMBRE_EMPRESA}}</td>'
          str +='<td>{{hlpRetornaSinValor CORREO}}</td>';
          str += '<td>{{hlpArchivadoInconsistencia ARCHIVADO}}</td>';
        }else if(tipoDetalle==3 || tipoDetalle==10 || tipoDetalle == 17 ){
          str = '<td class="tCen">{{nFila}}</td>';
          str += '<td class="Bold tCen"> <input type="checkbox" onclick=""  data-tkp="{{TKP}}" class="checkboxLimite"></td>';
          str +='<td>{{hlpContactosInconsistencias NOMBRE_PROSPECTO TKP ESCLIENTE}} <br> {{hlpEmpresaInconsistencias TKCOM NOMBRE_EMPRESA}}</td>';
          str +='<td>{{hlpRetornaSinValor CORREO}}</td>';
          str +='<td>{{hlpRetornaSinValor TELEFONO}}</td>';
          str +='<td>{{hlpRetornaSinValor TELEFONO2}}</td>';
          str +='<td>{{hlpRetornaSinValor MOVIL}}</td>';
          str +='<td>{{hlpArchivadoInconsistencia ARCHIVADO}}</td>';
        }else if(tipoDetalle==4){
          str = '<td class="tCen">{{nFila}}</td>';
          str += '<td class="Bold tCen"> <input type="checkbox" onclick=""  data-tkp="{{TKP}}" class="checkboxLimite"></td>';
          str += '<td>{{hlpContactosInconsistencias NOMBRE_PROSPECTO TKP ESCLIENTE}}<br> {{hlpEmpresaInconsistencias TKCOM NOMBRE_EMPRESA}}</td> ';
          str +='<td>{{hlpRetornaSinValor CORREO}}</td>';
          str +='<td>{{hlpRetornaSinValor DIRECCION1}}</td>';
          str +='<td>{{hlpRetornaSinValor DIRECCION2}}</td>';
          str += '<td>{{hlpArchivadoInconsistencia ARCHIVADO}}</td>';
         }else if(tipoDetalle==5 || tipoDetalle == 6 || tipoDetalle == 7 || tipoDetalle==11 || tipoDetalle==12 || tipoDetalle==13){
          str = '<td class="tCen">{{nFila}}</td>';
          str += '<td class="Bold tCen"> <input type="checkbox" onclick=""  data-tkcom="{{TKCOM}}" class="checkboxLimite"></td>';
          str += '<td>{{hlpEmpresaInconsistencias TKCOM EMPRESA}}</td>';
          str +='<td>{{hlpRetornaSinValor TELEFONOCORPORATIVO}}</td>';
          str +='<td>{{hlpRetornaSinValor DIRECCION1}}</td>';
          str +='<td>{{hlpRetornaSinValor DIRECCION2}}</td>';
         }else if(tipoDetalle==8 || tipoDetalle == 16){
          str = '<td class="tCen">{{nFila}}</td>';
          str += '<td class="Bold tCen"> <input type="checkbox" onclick=""  data-tkp="{{TKP}}" class="checkboxLimite"></td>';
          str += '<td style="width:200px;">{{hlpContactosInconsistencias NOMBRE TKP ESCLIENTE}}</td>';
          str += '<td style="width:200px;">{{hlpContactosInconsistencias APELLIDOS TKP ESCLIENTE}}</td>';
          str +='<td>{{hlpEmpresaInconsistencias TKCOM NOMBRE_EMPRESA}}</td>';
          str += '<td>{{hlpArchivadoInconsistencia ARCHIVADO}}</td>'
        }else if(tipoDetalle == 15){
         str = '<td class="tCen">{{nFila}}</td>';
          str += '<td class="Bold tCen"> <input type="checkbox" onclick=""  data-tkp="{{TKP}}" class="checkboxLimite"></td>';
          str += '<td>{{hlpContactosInconsistencias NOMBRE_PROSPECTO TKP ESCLIENTE}}<br> {{hlpEmpresaInconsistencias TKCOM NOMBRE_EMPRESA}}</td>';
          str += '<td>{{hlpRetornaSinValor CORREO}}</td>';
          str += '<td>{{hlpArchivadoInconsistencia ARCHIVADO}}</td>';
        } 
       
      break;
   }

    
     $('#tituloText').html('<div class="w100 TitDiv"><span style="float:left;margin-top:0px;margin-right:5px;" id="btnRegresar" type="button" class="Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" onclick="SalesUp.inconsistencia.regresaPrincipal()"><i class="fa fa-lg fa-arrow-left"></i></span>  <h1> <i class=""></i> '+ texto +' </h1></div>');
   
   return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlpInconsistenciaCamposRequeridos',function(tipo,detalleInconsistencia,Obj){
  var th = Obj.COLUMNAS.split(',');
  var tb = Object.keys(Obj);
  var str = '';

  if(tipo == 1){
    str = '<td style="width:150px;">Contacto/Empresa</td>';
    for (var i = 0; i<th.length; i++) {
       str += '<td style="width:150px;">'+th[i]+'</td>';     
     }
   }else if(tipo == 2){
    str += '<td class="tCen">{{nFila}}</td>';
    str += '<td class="Bold tCen"> <input type="checkbox" onclick=""  data-tkp="{{TKP}}"  data-tkcom="{{TKCOM}}" class="checkboxLimite"></td>';
    str += '<td>{{hlpContactosInconsistencias NOMBRE_PROSPECTO TKP ESCLIENTE}} <br> {{hlpEmpresaInconsistencias TKCOM NOMBRE_EMPRESA}}</td>'    
    for (var i = 0; i<tb.length; i++) {
        if(tb[i]!="COLUMNAS" && tb[i]!="TKP" && tb[i]!="IDINCONSISTENCIA" && tb[i]!="NOMBRE_EMPRESA" && tb[i]!="NOMBRE_PROSPECTO" && tb[i]!="TKCOM" && tb[i]!="TOTAL" && tb[i]!="ESCLIENTE" ){
          str += '<td style="width:150px;">{{hlpRetornaSinValor '+tb[i]+'}}</td>';
        }
     } 
   }
   
   $('#tituloText').html('<div class="w100 TitDiv"><span style="float:left;margin-top:0px;margin-right:5px;" id="btnRegresar" type="button" class="Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" onclick="SalesUp.inconsistencia.regresaPrincipal()"><i class="fa fa-lg fa-arrow-left"></i></span>  <h1> <i class=""></i> '+ detalleInconsistencia +' </h1></div>');

  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlpInconsistenciaAcciones', function(Obj){
  var str = '';
  var tipoDetalle = (Obj.tipoDetalle) ? Obj.tipoDetalle : '';
  var esProspecto = (Obj.esProspecto) ? Obj.esProspecto : (tipoDetalle==14) ? 1 : '';

  str = '<div tkp="{{TKP}}" tkcom="{{TKCOM}}" class="accionesOcultas" style="display:none;">';
 
  if(esProspecto == 1){
      str += '{{hlpContactosInconsistenciasAccion TKP ESCLIENTE}}'
      str += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Sistema.AbrePopUp({Titulo:\'Editar prospecto\', Pagina:\'/privado/PopUpNuevoProspecto.dbsp\', Parametros:\'tkp={{TKP}}\', CallBack:\'ReloadData\', Alto:150, Ancho:500});"><i class="fa fa-lg fa-edit"></i> Editar</span>';
  }else{
      str += '{{hlpEmpresaInconsistenciasAccion TKCOM}}';
  }
 
  str += '{{#hlpPermisosActivos \'MantenimientoDB\' \'[0,1,2,3]\' }}<span class="OpcionAcciones Pointer FnCombinaContactos" tk="{{TKP}}" onclick="SalesUp.combinar.activaCombinarContactos(\'{{TKP}}\');"><i class="fa fa-lg fa-copy"></i>Combinar </span> {{/hlpPermisosActivos}}';  
  str += '<span class="OpcionAcciones Pointer" onclick="SalesUp.inconsistencia.refreshInconsistencia({tk:SalesUp.Variables.tkInconsistencias,callback:SalesUp.inconsistencia.reloadDetalleInconsistencia})"> <i class="fa fa-lg fa-refresh"></i> Actualizar </span>';  
  
  if(esProspecto == 1){
    str += '<span class="divisorMenu"></span>';
    str += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.descartar.mostrarPopup({titulo:\'Descartar prospecto\', tkp: \'{{TKP}}\', origen: \'prospectos\', tipo: 1, callback:SalesUp.inconsistencia.reloadDetalleInconsistencia})"> <i class="fa fa-lg fa-user-times"></i> Descartar </span>';  
  }
 
  str += '</div>';

  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlpContactosInconsistenciasAccion', function(tkp, escliente){
  var str = '';
  switch (escliente){
    case 0:
      str = '<span class="OpcionAcciones Pointer" onclick="location.href=\'prospectos-visualizar.dbsp?tkp='+tkp+'\'"> <i class="fa fa-lg fa-external-link"></i> Ver prospecto </span>';  
       break; 
    case 1:
      str = '<span class="OpcionAcciones Pointer" onclick="location.href=\'clientes-visualizar.dbsp?tkp='+tkp+'\'"> <i class="fa fa-lg fa-external-link"></i> Ver prospecto </span>';
       break;
    default:
      str = '';
  }
  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlpEmpresaInconsistenciasAccion', function(tkcom){
  var str = '';
   (!tkcom) ? tkcom = '' : '';
  if(tkcom!=''){
    str += '<span class="OpcionAcciones Pointer" onclick="location.href=\'EmpresasVisualizar.dbsp?tkcom='+tkcom+'\'"> <i class="fa fa-lg fa-external-link"></i> Ver empresa </span>';
   }else{
     str = '';
  }
  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlsaccionseleccionMultipleDescartar', function(Obj){
  var str = '';
  var esProspecto = (Obj.esProspecto) ? Obj.esProspecto : '';
  
  if(esProspecto == 1){
    str = '<td style="width:5px;"></td>';
    str += '<td style="width:25px;" class="accionesMultiples">';
    str += '   <input type="checkbox" value="0" id="selecc-todo" onclick="SalesUp.Sistema.CheckTodosRegistros({Elemento:this});">';
    str += '  <span class="VerLtOpcionesMultiples Tip2" tip="Opciones Múltiples"  onclick="SalesUp.Variables.accionesComunes.accionesMultiplesMenu.validaSeleccionados({container:\'input.checkboxLimite\'});" data-toogle="popover" original-title=""></span>';
    str += '  <div id="menuOpcMultiples" style="display: none"> ';
    str += '  <span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.descartarMultiple.mostrarPopup({titulo: \'Descartar varios prospectos\', tipo: 1,container:\'input.checkboxLimite\',callback:SalesUp.inconsistencia.reloadDetalleInconsistencia});">';
    str += '    <i class="fa fa-lg fa-user-times"></i>Descartar </span> ';
    str += ' </div>';
    str += '</td>';
  }else{
     str = '<td style="width:5px;"></td>';
     str += '<td style="width:5px;"><input type="checkbox" value="0" id="selecc-todo" onclick="SalesUp.Sistema.CheckTodosRegistros({Elemento:this});"></td>';
  }
  
 
  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlpRetornaSinValor',function(value){
  var str = '';
  var valor = (value!="") ? value : '';
  if(value){
    str = value;
  }else{
    str = '<span style="color:#C7C7C7;"><em>Sin datos</em></span>';
  }
 return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlpArchivadoInconsistencia',function(value){
  var str = '';
  var valor1 = (value) ? value : '';
  var sinDatos = '{{hlpRetornaSinValor valor}}';
  
  if(valor1 == "1"){
     str = '<strong>Activo</strong>';
  }else if(valor1 == "0"){
    str = '<strong>Archivado</strong>';
  }else{
    var obj = {valor:value};
    valor1 = SalesUp.Construye.ReemplazaDatos({Template:sinDatos,Datos:obj});
     str = '<span>'+valor1+'</span>';
  }
    return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlpEmpresaInconsistencias', function(tkcom,empresa) {
  var str = '';
  var sinDatos = '{{hlpRetornaSinValor valor}}';
  (!tkcom) ? tkcom = '' : '';
  (!empresa) ? empresa = '' : '';
  if((tkcom!='')&&(empresa!='')){
    str = '<a id="EmpresasVisualizar" href="EmpresasVisualizar.dbsp?tkcom='+tkcom+'"><i class="fa fa-building-o"></i> <b>'+empresa+'</b></a>';
  }else{
    var obj = {valor:empresa};
    empresa = SalesUp.Construye.ReemplazaDatos({Template:sinDatos,Datos:obj});
    str = '<span>'+empresa+'</span>';
  }
  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlpContactosInconsistencias',function(nombre,tk,cliente){
  var str = '';
  var sinDatos = '{{hlpRetornaSinValor valor}}';
  switch (cliente){
    case 0:
      var obj = {valor:nombre};
      nombre = SalesUp.Construye.ReemplazaDatos({Template:sinDatos,Datos:obj});
      str = '<a href="prospectos-visualizar.dbsp?tkp='+tk+'"><b>'+nombre+'</b></a>';
      break;
    case 1:
      var obj = {valor:nombre};
      nombre = SalesUp.Construye.ReemplazaDatos({Template:sinDatos,Datos:obj});
      str = '<a href="clientes-visualizar.dbsp?tkp='+tk+'"><b>'+nombre+'</b></a>';
      break;
    default:
      var obj = {valor:nombre};
      nombre = SalesUp.Construye.ReemplazaDatos({Template:sinDatos,Datos:obj});
      str = '<b>'+nombre+'</b>';
  }
  return new Handlebars.SafeString(str);
});