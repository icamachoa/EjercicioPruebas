Handlebars.registerHelper('Tipsy', function() {
	var tip = (this.Descripcion) ? this.Descripcion : '';
	tip = Handlebars.escapeExpression(tip);
	tip = 'tip="' + tip + '"';
	return new Handlebars.SafeString(tip);
});
Handlebars.registerHelper('Ocultar', function() {
	var Mostrar = Handlebars.escapeExpression(this.Mostrar);
	var Ocultar = '';
	if(Mostrar=='0'){ Ocultar = 'OcultarBoxInfo'; }
	return new Handlebars.SafeString(Ocultar);
});

Handlebars.registerHelper('AmpliarContenedor', function() {
	var esTextArea = Handlebars.escapeExpression(this.esTextArea);
	var esListaCheck = Handlebars.escapeExpression(this.esListaCheck);
	var esListaRadio = Handlebars.escapeExpression(this.esListaRadio);

	var ampliar = '';
	if((esTextArea=='1')||(esListaRadio=='1')||(esListaCheck=='1')){ ampliar = 'BoxInfoTextArea BoxSizing';}
	return new Handlebars.SafeString(ampliar);
});

Handlebars.registerHelper('ContenedorMemo', function(){
	var t = this, tipoCampo = t.TipoCampo, str = '';
	(tipoCampo=='5') ?  str = 'BoxInfoTextArea BoxSizing':'';
	return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('opcionSelect', function(){
	var Opcion = Handlebars.escapeExpression(this.Opcion);
	var attr = '';
	for(key in this){
		if (key!='Campo'){attr += key + '="' + Handlebars.escapeExpression(this[key])+'" ';}
	}
	if(attr.indexOf('value')==-1){ attr += ' value="'+Opcion+'"'; }
	var htmlOpcion = '<option '+attr+'>'+Opcion+'</option>';
	return new Handlebars.SafeString(htmlOpcion);
});

Handlebars.registerHelper('listaOpciones', function(IdCampo){
	var Opcion = Handlebars.escapeExpression(this.Opcion);
	var Id = Handlebars.escapeExpression(this.value);
	var idCampo = IdCampo;
	var newid = Math.random().toString(36).substr(2, 9);
	var attr = '';
	var tipo = this.Tipo
	var icono = '<i class="fa fa-lg fa-check-square-o"></i><i class="fa fa-lg fa-square-o"></i>';
	if(tipo=='radio'){icono = '<i class="fa fa-lg fa-dot-circle-o"></i><i class="fa fa-lg fa-circle-o"></i>';}
	
  if(Opcion=='(... Seleccione una opción ...)'){return '';}

	for(key in this){
		if (key!='Opcion'){attr += key + '="' + Handlebars.escapeExpression(this[key])+'" ';}
		if (key=='Tipo'){
			attr += 'value="'+Opcion+'" onchange="SalesUp.Variables.SeleccionaCheckRadio({t:this,e:event});" ';
			if(this[key]=='radio'){
				attr += 'name="radio-InputCheck-'+idCampo+'" type="radio"';
			}else if(this[key]=='check'){
				attr += 'name="InputCheck-'+idCampo+'-'+newid+'" type="checkbox"';
			}
		}
	}

	var str ='<label data-activo="0" class="w25 pr5 Ellipsis"><input '+attr+' class="faCheck BoxSizing InfoData w100">'+icono+'&nbsp;'+Opcion+'</label>';
  
	return new Handlebars.SafeString(str);

});

Handlebars.registerHelper('Attr', function() {
	var str = '', arr = this;
	for(key in arr){
		var v = Handlebars.escapeExpression(arr[key]);
		if(key.indexOf('attr')!=-1){
			var attr = SalesUp.Sistema.StrReplace('attr_','',key);
			attr = SalesUp.Sistema.StrReplace('_','-',attr);
			str += attr + '="' + v +'" ';
		}
	}
	return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('valorTemperatura', function() {
	var Opciones = this.Opciones[0], str = '';
  if (!Opciones){return;};
	if (Opciones.color){ str = JSON.stringify(Opciones); }
	return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('temperaturaOpcion', function() {
	var Opciones = this.Opciones[0];
  if (!Opciones){return;};
	var str = '<span class="TempSeleccionada">'+Opciones.Opcion+'</span>';
	if (Opciones.color){
		str = '<span class="TempSeleccionada"><i style="color:'+Opciones.color+' !important;" class="fa fa-lg '+Opciones.icono+'"></i> '+Opciones.Opcion+'</span>';
	}
	return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('InfoDatoProspecto', function(t, dp) {
  var name =  t.attr_name, tkInd = t.tkInd, Tkcg = t.Tkcg, valor = dp[0][name], idp = dp[0]['idp'], ido = dp[0]['ido'], tkp = $.trim(dp[0]['Tkp']), tko = $.trim(dp[0]['Tko']);
  (!valor) ? valor = '':'';
  (!tkInd) ? tkInd = '':'';
  (!Tkcg) ? Tkcg = '':'';
  (!idp) ? idp = '0':'';
  (!ido) ? ido = '0':'';
  t.tipoClase = '';
  if(t.TipoCampo=='3'){t.tipoClase = 'tdListaTexto';}
  if(t.TipoCampo=='5'){t.tipoClase = 'Html';}
  if(t.TipoCampo=='6'){t.tipoClase = 'generaTemperatura';}
  if(t.TipoCampo=='7'){t.tipoClase = 'tdListaChecks';}
  if(t.TipoCampo=='8'){t.tipoClase = 'tdListaRadio';}
  if(t.TipoCampo=='9'){t.tipoClase = 'generaGrafica';}

  if(name=='Industria'){ if(tkInd!=''){valor = '<a href="CatalogosVisualizar.dbsp?tkco='+tkInd+'"><b>'+valor+'</b></a>';} }

  if(name=='GrupoEmpresarial'){ if(Tkcg!=''){valor = '<a href="CatalogosVisualizar.dbsp?tkco='+Tkcg+'"><b>'+valor+'</b></a>';} }
  var $vCp= $('.BlockTab [data-name="'+name+'"]');
  var str = '<div class="InfoData InfoDetalle EsCorreo {{tipoClase}} Ellipsis" data-tkp="'+tkp+'" data-tko="'+tko+'" data-ido="'+ido+'" data-idp="'+idp+'" data-name="'+name+'" data-valor=\''+valor+'\' data-tipocampo="{{TipoCampo}}">'+valor+'</div>';
  
  if (_.size($vCp)){
    str = '<div class="InfoData InfoDetalle cpRepetido"></div>';
  }else{
    str = SalesUp.Construye.ReemplazaDatos({Template:str, Datos:t });  
  }
  
  
  return new Handlebars.SafeString(str);
});/*InfoDatoProspecto*/

Handlebars.registerHelper('DireccionProspecto', function() {
  var t = this, Calle = $.trim(t.pCalle), Colonia = $.trim(t.pColonia), Cp = $.trim(t.pCodigoPostal), idp=t.idp, str='';
  (!Calle)?Calle='':'';
  if(Calle!=''){
    var marker = '<span class="Pointer" onclick="SalesUp.Ventana.MapaProspecto({idp:\''+idp+'\'})">';
          marker += '<i class="fa fa-map-marker fa-lg Rojo"></i></span>';
    str += marker;
  }
  str += Calle;
  str += (Colonia!='') ? ', '+Colonia:'';
  str += (Cp!='') ? ', '+Cp:'';
  return new Handlebars.SafeString(str);
});/*DireccionProspecto*/

Handlebars.registerHelper('UbucacionProspecto', function() {
  var t = this, Ciudad = $.trim(t.pCiudad), Estado = $.trim(t.pEstado), Municipio = $.trim(t.pMunicipio), str='';
  var arrCiudad = [];

  if(_.size(Ciudad)){
    arrCiudad.push(Ciudad);
  }

  if(_.size(Municipio)){
    arrCiudad.push(Municipio);
  }

  if(_.size(Estado)){
    arrCiudad.push(Estado);
  }

  str =  arrCiudad.join(', ');
  
  return new Handlebars.SafeString(str);
});/*UbucacionProspecto*/

Handlebars.registerHelper('esMovil', function() {
  var t = this, Movil = $.trim(t.Movil), idp = t.idp, str='',oportunidad=t.IdOportunidad, prospecto=t.IdProspecto, tkp=t.Tkp;
  
  str = (_.size(Movil)>=10) ? '<span> <i class="fa fa-mobile"></i> <span onmouseenter="SalesUp.Llamadas.accionesLlamadasProgramado({t:this});" class="FormatoTel MovilPhone Pointer Bold " data-tkp="'+tkp+'" idprospecto="'+prospecto+'" idoportunidad="'+oportunidad+'" tel="'+Movil+'" id="movile-'+Movil+'" data-movil=true>'+Movil+'</span>'
  +'</span>': Movil;
  //'<b class="Pointer Tip1" tip="Enviar SMS" onclick="SalesUp.Ventana.EnviarSms({movil:\''+Movil+'\', idp:\''+idp+'\'})"><i class="fa fa-lg fa-mobile"></i> '+Movil+'</b>':Movil;
  
  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('TelefonosProspecto', function() {

var t = this, str='', telefono = $.trim(t.Telefono), telefono2 = $.trim(t.Telefono2), movil = $.trim(t.Movil),
  oportunidad=t.IdOportunidad, prospecto=t.IdProspecto, tkp=t.Tkp;
  
  var strtel = ' <span><i class="fa fa-phone-square"></i> [tel]</span> ';

if(telefono){

str+='<span>'
    +'<i class="fa fa-phone-square"></i> ' 
    +'<span class="FormatoTel llamar-click Pointer Bold " data-tkp="'+tkp+'" data-tel="'+telefono+'" data-movil=false>'+telefono+'</span>'
  '</span>';

}
if(telefono2){

str+='<span>'
    +'<i class="fa fa-phone-square"></i> ' 
    +'<span class="FormatoTel llamar-click Pointer Bold " data-tkp="'+tkp+'" data-tel="'+telefono2+'" data-movil=false>'+telefono2+'</span>'
  '</span>';

}

/*
str+='<span>'
    +' <i class="fa fa-mobile"></i> ' 
    +'<span onmouseenter="SalesUp.Llamadas.accionesLlamadasProgramado({t:this});" class="FormatoTel MovilPhone Pointer Bold " data-tkp="'+tkp+'" idprospecto="'+prospecto+'" idoportunidad="'+oportunidad+'" tel="'+movil+'" id="movile-'+movil+'" data-movil=true>'+movil+'</span>'
  '</span>';

}*/

return new Handlebars.SafeString(str);

/*  var t = this, tel1 = $.trim(t.Telefono), tel2 = $.trim(t.Telefono2), str='';
  var strtel = ' <span><i class="fa fa-phone-square"></i> [tel]</span> ';
  if(tel1!=''){ str += SalesUp.Sistema.StrReplace('[tel]',tel1,strtel);}
  if(tel2!=''){ str += SalesUp.Sistema.StrReplace('[tel]',tel2,strtel);}
  */
});

Handlebars.registerHelper('CreadoProspecto', function() {
  var t = this, fecha = t.CreadoEl, hora = t.CreadoHora, str='';
  if((fecha=='')||(!fecha)){return '';}
  str = '<i class="fa fa-calendar"></i> '+SalesUp.Sistema.FormatoFecha(fecha)+' '+hora+'';
  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('DatoProspecto', function() {
  var t = this, sexo = t.Sexo, titulo = $.trim(t.Titulo), nombre = $.trim(t.Nombre), esCanalizado = t.esCanalizado, esCompartido = t.Compartido,idp = t.idp, tkp=t.Tkp,apellidos = $.trim(t.Apellidos), icono='', str='';
  (sexo=='M') ? icono = 'fa-female':'';
  (sexo=='H') ? icono = 'fa-male':'';
  (icono!='') ? icono = '<i class="fa '+icono+'"></i>':'';
  str = '<span>'+icono+' '+(titulo?titulo:'')+' '+nombre+' '+apellidos+'</span>';
  str += '<span style="float:right;padding:0px 3px;height:21px;" tip="Descargar la tarjeta de contacto electrónica" class="Tip7 Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" onclick="document.location.href=\'vcard-prospecto.dbsp?tkp='+tkp+'\';"><i class="icomoon fa-2x icomoon-profile3"></i></span>';
  var Compartido = '<span class="BoxCompartido Ellipsis tCen Pointer Tip1" tip="Compartido" style="float:right;padding:0 3px;height:22px;" onclick="SalesUp.Construye.VerLtCompartidos({tkp:\''+tkp+'\', Elem:this});"><i class="fa fa-lg fa-group"></i></span>';
  var Canalizado = '<span class="BoxCanalizado Ellipsis tCen Tip1" tip="Canalizado" style="float:right;padding:0 3px;height:22px;"><i class="fa fa-lg fa-reply-all fa-flip-horizontal"></i></span>';

  if(esCanalizado==1){str+=Canalizado;}
  if(esCompartido==1){str+=Compartido;}
  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlpContactoRechazadoPor',function(){
  var t = this, rechazadoPor = t.rechazadoPor, str='';
  try{rechazadoPor = JSON.parse(rechazadoPor)}catch(e){rechazadoPor = {comentario:'Sin razón'}; };
  str = rechazadoPor.comentario;
return new Handlebars.SafeString(str);
});/*hlpContactoRechazadoPor*/

Handlebars.registerHelper('hlpContactoPendiente',function(){
  var t = this, contactoPendiente = t.contactoPendiente, str='';
  if (contactoPendiente==1){str='<span class="Italic Bold">(Pendiente por autorizar)</span>'}
  if (contactoPendiente==2){str='<span class="Italic Bold Rojo">(Rechazado)</span>'}
  
return new Handlebars.SafeString(str);
});/*hlpContactoPendiente*/

Handlebars.registerHelper('CorreoProspecto', function(){
  var t = this, correos = t.Correo, idp = t.idp, ido = (t.ido ? t.ido:''), tkp = (t.Tkp ? t.Tkp:''), tko = (t.Tko ? t.Tko:''), str='';
  var SysComposeActivo = SalesUp.Sistema.Almacenamiento({a:'SysComposeActivo'});
  var SysMailToActivo = SalesUp.Sistema.Almacenamiento({a:'SysMailToActivo'});
  var arrCorreos = [];

  SysComposeActivo = (SysComposeActivo) ? parseInt(SysComposeActivo):0;
  SysMailToActivo = (SysMailToActivo) ? parseInt(SysMailToActivo):0;

  (t.IdProspecto) ? idp = t.IdProspecto : '';
  (t.IDPROSPECTO) ? idp = t.IDPROSPECTO : '';
  
  (t.IdOportunidad) ? ido = t.IdOportunidad : '';
  (t.IDOPORTUNIDAD) ? ido = t.IDOPORTUNIDAD : '';
  
  (t.CORREO) ? correos = t.CORREO : '';
  
  (!correos) ? correos = '':'';
  if(correos!=''){
    arrCorreos = SalesUp.Sistema.Combina2splits({texto:correos,separador1:',',separador2:';'});  
  }
  
  for(var nco = 0;nco<_.size(arrCorreos);nco++){
    var correo = arrCorreos[nco];
    var CorreoInvalido = (!SalesUp.Valida.ValidaEsCorreo(correo)) ? 'CorreoInvalido' : '';
    var CorreoInvalido = '';
    if(correo!=''){
      if((SysComposeActivo==0)&&(SysMailToActivo==0)){
        str +='<b class="enviarCorreos Pointer Tip1 '+CorreoInvalido+'" Tip="Configurar correo" onclick="SalesUp.Ventana.ConfigurarCorreo({idp:\''+idp+'\', correo:\''+correo+'\'});"><i class="fa fa-gear"></i> '+correo+'</b>';
      }

      if((SysComposeActivo==0)&&(SysMailToActivo==1)){
        str +='<a class="enviarCorreos Tip1 '+CorreoInvalido+'" Tip="Enviar correo" href="mailto:'+correo+'"><i class="fa fa-envelope"></i> '+correo+'</a> ';
      }

      if(SysComposeActivo!=0){
        var dCorreo = '';
        
        if(tkp){
          dCorreo+=' tkp:\''+tkp+'\', ';
          idp='';
        }

        if(tko){
          dCorreo+=' tko:\''+tko+'\', ';
          ido='';
        }

        (idp) ? dCorreo+='idp:\''+idp+'\',':'';
        (ido) ? dCorreo+='ido:\''+ido+'\',':'';

        str += '<b class="enviarCorreos Pointer Tip1 '+CorreoInvalido+'" Tip="Enviar correo" onclick="SalesUp.Correo.nuevoCorreo({ '+dCorreo+' correo:\''+correo+'\'});"><i class="fa fa-envelope"></i> '+correo+'</b>';
      }
    }
  }
  return new Handlebars.SafeString(str);
});/*CorreoProspecto*/


Handlebars.registerHelper('esPagina', function() {
  var t = this, url = t.Url, str='';
  if(!url){return '';}
  var pagina = url;
  if(url!=''){
    if(url.indexOf('http://')!=-1){
      url = url;	
    }else if(url.indexOf('https://')!=-1){
      url = url;	
    }else{
      url = 'http://'+url;	
    }
    str = '<a href="#" class="Tip1" tip="ir a '+pagina+'" onmousedown="$(this).attr(\'href\',\''+url+'\')" target="_blank"><i class="fa fa-globe"></i> '+pagina+'</a>';
  }

  return new Handlebars.SafeString(str);
});


Handlebars.registerHelper('EmpresaProspecto', function() {
  var t = this, empresa = t.Empresa, tkcom = t.tkcom, idcompania = t.IdCompania, str=empresa;
  (!tkcom) ? tkcom = '' : '';
  (!empresa) ? empresa = '' : '';
  if((tkcom!='')&&(empresa!='')){
    str = '<a id="EmpresasVisualizar" href="EmpresasVisualizar.dbsp?tkcom='+tkcom+'"><i class="fa fa-building-o"></i> <b>'+empresa+'</b></a>';
  }
  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('EjecutivoSalesUp', function() {
  var t = this, ejecutivo = t.Ejecutivo, ini = t.Iniciales, str = '';
  str = '<i class="fa fa-user"></i> '+ejecutivo + ' ('+$.trim(ini)+')';
  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('CanalizadoProspecto', function() {
  var t = this, fecha = t.FechaCanalizado, hora = t.HoraCanalizado, str = '';
  if((fecha=='')||(!fecha)){return '';}
  str = '<i class="fa fa-calendar"></i> '+SalesUp.Sistema.FormatoFecha(fecha)+' '+hora;
  return new Handlebars.SafeString(str);
});


Handlebars.registerHelper('RecibirCorreos', function() {
  var t = this, recibirCorreos = t.recibirCorreos, idp = t.idp, ejecutivo = t.Ejecutivo, correo = t.Correo, idusr = t.idusr, str = '';
  if (recibirCorreos=='2'){
    str = '<span class="Rojo"><i class="fa fa-lg fa-warning"></i> ';
    str += 'El contacto ha decido no recibir correos automáticos, si quiere reactivarlos nuevamente de ';
    str += '<b class="Pointer" onclick="SalesUp.Variables.AlertaReactivaCorreosProspecto({idp:\''+idp+'\', correo:\''+correo+'\', ejecutivo:\''+ejecutivo+'\', usuario:\''+idusr+'\'});">clic aquí</b>';
    str += '</span>';
  }
  return new Handlebars.SafeString(str);
});


Handlebars.registerHelper('CertezaOportunidad', function() {
  var t = this, str = '', CertezaTexto = $.trim(t.CertezaTexto), Certeza = parseFloat(t.Certeza);
  
  if(Certeza<0.34){ str +='<i class="fa fa-circle Rojo Tip1" tip="Certeza baja"></i> '; }
  if((Certeza>=0.34) && (Certeza<0.66)){ str +=' <i class="fa fa-circle Amarillo Tip1" tip="Certeza media"></i> '; }
  if(Certeza>=0.66){ str +=' <i class="fa fa-circle Verde Tip1" tip="Certeza alta"></i> '; }
  
  str += SalesUp.Sistema.FormatoPorcentaje(Certeza);
  str += (CertezaTexto!='') ? ' - ' + CertezaTexto:'';

  return new Handlebars.SafeString(str);
});


Handlebars.registerHelper('ConstruyeMenu', function(){
  var trim = function(s){return $.trim(s);}
  var str = '', t = this, Menu = trim(t.Menu), subMenu = t.subMenu, Modulo = t.Modulo
      Link = trim(t.Link), onClick = trim(t.onClick), Nivel = t.Nivel, verSistema = t.verSistema, Id = trim(t.Id)
      Icono = trim(t.Icono), Icomoon = t.Icomoon, linkModulo = t.LinkModulo;
  
  var tMenu = '', tipoIcono = ''; 
  var obj = {ulSubmenu:[]};
  var templateMenu = '{{#each ulSubmenu}}{{ConstruyeMenu}}{{/each}}';

  if(Modulo){
    var moduloActivo = SalesUp.Sistema.EstaActivoModulo({Modulo:Modulo});
    
    if(moduloActivo){ /*Condicion de dos links en un mismo menu*/
      if(linkModulo){Link = linkModulo;}
    }else{
      if(linkModulo){moduloActivo=true;}
    }

    if(!moduloActivo){return '';}
  }
  
  if(Nivel){
    var usrNivel = parseInt(SalesUp.Sistema.Almacenamiento({a:'SysNivel'}));
    var usrVerSistema = parseInt(SalesUp.Sistema.Almacenamiento({a:'SysVerSistema'}));
    
    if(Nivel==1){
      if(usrNivel>1){return '';}
      if(verSistema){
        if((usrNivel==Nivel)&&(usrVerSistema!=verSistema)){return '';}
      }
    }

    if(Nivel==2){
      if(usrNivel>Nivel){return '';}
      if(verSistema){
        if((usrNivel==Nivel)&&(usrVerSistema!=verSistema)){return '';}
      }
    }
  }
  
  if(Icono!=''){
    tipoIcono = (Icomoon) ? 'icomoon' : 'fa';
    Icono = '<i class="'+tipoIcono+' fa-lg '+Icono+'"></i>';
  }
  
  Link = (Link!='') ? 'href="'+Link+'"' : 'href="#"';
  onClick = (onClick!='') ? 'onclick="event.preventDefault(); '+onClick+'"' : '';     
  if(Link!=''){onClick = SalesUp.Sistema.StrReplace('event.preventDefault(); ','',onClick);}
  
  Id = (Id!='') ? 'id="'+Id+'"' : '';
  
  tsubMenu = false;
  (subMenu) ? tsubMenu = true:'';
  (tsubMenu)? tMenu = 'class="has-sub"':'';
  
  var li  = '<li '+Id+' '+tMenu+'>';
      li += '<a '+onClick+' '+Link+'>'+Icono+' '+Menu+'</a>';
  
      if(tsubMenu){
        obj.ulSubmenu = subMenu;
        li += '<ul>'+SalesUp.Construye.ReemplazaDatos({Template:templateMenu, Datos:obj})+'</ul>';
      }
  
      li += '</li>';
  return new Handlebars.SafeString(li);
});/* ConstruyeMenu */



Handlebars.registerHelper('mailAdjuntos', function(IdInbox){
  var f = function(v){return parseFloat(v);}
  var str='', t = this, nombre= t.nombre, archivo = t.archivo, peso = f(t.peso), ignorar = t.ignorar, Icono = 'fa-file-o';
  var mb = 1048576, preview = false;
  
  if(ignorar==1){ return '';}
  
  if(peso>=mb){
    peso = SalesUp.Sistema.NumeroDosDecimales(peso / 1024 / 1024) + ' Mb.';
  }else{
    peso = SalesUp.Sistema.NumeroDosDecimales(peso / 1024) + ' Kb.';
  }
  var ext = function(v,ext){ return v.toLowerCase().indexOf('.'+ext);}

  if(ext(archivo,'pdf')!=-1){
    Icono = 'fa-file-pdf-o'; preview = true;
  }
  if(ext(archivo,'txt')!=-1){
    Icono = 'fa-file-text-o'; preview = true;
  }

  if((ext(archivo,'zip')!=-1)||(ext(archivo,'rar')!=-1)){
    Icono = 'fa-file-zip-o';
  }

  if((ext(archivo,'xls')!=-1)||(ext(archivo,'xlsx')!=-1)){
    Icono = 'fa-file-excel-o';
  }
  
  if((ext(archivo,'jpg')!=-1)||(ext(archivo,'png')!=-1)||(ext(archivo,'jpeg')!=-1)||(ext(archivo,'gif')!=-1)){
    Icono = 'fa-file-image-o'; preview = true;
  }

  if((ext(archivo,'doc')!=-1)||(ext(archivo,'docx')!=-1)){
    Icono = 'fa-file-word-o';
  }

  if((ext(archivo,'ppt')!=-1)||(ext(archivo,'pptx')!=-1)||(ext(archivo,'pps')!=-1)||(ext(archivo,'ppsx')!=-1)){
    Icono = 'fa-file-powerpoint-o';
  }

  var tmp = '';
      tmp +='<div class="BoxDoc BoxSizing Transition">';
      if(preview){tmp +=' <span class="adjuntoAcciones AccionesTop w100" onclick="SalesUp.Inbox.verArchivo({idInbox:'+IdInbox+', archivo:\''+archivo+'\'});"><i class="fa fa-lg fa-eye"></i> Ver</span> ';}
      tmp +='  <i class="fa fa-3x '+Icono+'"></i>';
      tmp +='  <span class="DocDescripcion Ellipsis w100">'+nombre+'</span>';
      tmp +='  <span class="DocPeso Ellipsis w100 Italic">'+peso+'</span>';
      tmp +='  <span class="adjuntoAcciones AccionesBottom w100" onclick="SalesUp.Inbox.descargar({idInbox:'+IdInbox+', archivo:\''+archivo+'\'});"><i class="fa fa-lg fa-cloud-download"></i> Descargar</span> ';
      tmp +='</div>';
      str = tmp;
  return new Handlebars.SafeString(str);
});/* mailAdjuntos */


Handlebars.registerHelper('botonesAccionesDetalle', function() {
  var t = this, str = '';
  var Acciones = '', idTabInbox = t.idTabInbox, idInbox = t.IdInbox, idProspecto = $.trim(t.Idprospecto), tkp = t.tkp, esCliente = t.esCliente, idSeguimiento = t.idSeguimiento, tieneCc = t.tieneCc, seguimientoAuto = t.seguimientoAuto;
  var opciones = 'idTabInbox:'+idTabInbox+', idInbox:'+idInbox+' , idProspecto:\''+idProspecto+'\', tkp:\''+tkp+'\', esCliente:\''+esCliente+'\', seguimientoAuto:'+seguimientoAuto;
  
  Acciones += '<span class="Pointer Btn btnNeutral Btn-rounded Btn-tiny Btn-flat-Aceptar Btn-tiny-min" onclick="SalesUp.Inbox.ejecutaAccion({'+opciones+', accion:6});"><i class="fa fa-mail-reply"></i> Responder</span> ';  
  if(tieneCc){
    Acciones += '<span class="Pointer Btn btnNeutral Btn-rounded Btn-tiny Btn-flat-Aceptar Btn-tiny-min" onclick="SalesUp.Inbox.ejecutaAccion({'+opciones+', accion:6, respTodos:true});"><i class="fa fa-reply-all"></i> Responder a todos</span> ';  
  }
  Acciones += '<span class="Pointer Btn btnNeutral Btn-rounded Btn-tiny Btn-flat-Aceptar Btn-tiny-min" onclick="SalesUp.Inbox.ejecutaAccion({'+opciones+', accion:7});"><i class="fa fa-mail-forward"></i> Reenviar</span> ';
  Acciones += '<span class="Pointer Btn btnNeutral Btn-rounded Btn-tiny Btn-flat-Aceptar Btn-tiny-min" onclick="SalesUp.Inbox.ejecutaAccion({'+opciones+', accion:2, boton:true, t:this});"><i class="fa fa-folder"></i> Mover a</span> ';
  if(idProspecto){
    if(!idSeguimiento){Acciones += '<span class="Pointer Btn btnNeutral Btn-rounded Btn-tiny Btn-flat-Aceptar Btn-tiny-min" onclick="SalesUp.Inbox.ejecutaAccion({'+opciones+', accion:1});"><i class="fa fa-comment"></i> Guardar en segumiento</span> ';}
    
    if(seguimientoAuto==1){
      Acciones += '<span class="Pointer Btn btnNeutral Btn-rounded Btn-tiny Btn-flat-Aceptar Btn-tiny-min" onclick="SalesUp.Inbox.ejecutaAccion({'+opciones+', accion:9, eliminarBtn:this });"><i class="fa fa-check"></i> Activar seguimiento automático</span> ';
    }else if(seguimientoAuto==0){
      Acciones += '<span class="Pointer Btn btnNeutral Btn-rounded Btn-tiny Btn-flat-Aceptar Btn-tiny-min" onclick="SalesUp.Inbox.ejecutaAccion({'+opciones+', accion:9, eliminarBtn:this});"><i class="fa fa-times"></i> Desactivar seguimiento automático</span> ';
    } 
    

    Acciones += '<span class="Pointer Btn btnNeutral Btn-rounded Btn-tiny Btn-flat-Aceptar Btn-tiny-min" onclick="SalesUp.Inbox.ejecutaAccion({'+opciones+', accion:3});"><i class="fa fa-user"></i> Ver contacto</span> '; 
  }else{
    Acciones += '<span class="Pointer Btn btnNeutral Btn-rounded Btn-tiny Btn-flat-Aceptar Btn-tiny-min" onclick="SalesUp.Inbox.ejecutaAccion({'+opciones+', accion:4});"><i class="fa fa-user-plus"></i> Agregar contacto</span> ';
    Acciones += '';
  }

  Acciones += '<span class="Pointer Btn btnNeutral Btn-rounded Btn-tiny Btn-flat-Aceptar Btn-tiny-min" onclick="SalesUp.Inbox.ejecutaAccion({'+opciones+', accion:5});"><i class="fa fa-trash"></i> Eliminar</span> ';

  return new Handlebars.SafeString(Acciones);
});/*botonesAccionesDetalle*/



Handlebars.registerHelper('enviarCorreo', function(){
  var f = function(v){return parseFloat(v);}
  var t = this, str = '';
  var Acciones = '', correoDe = t.correoDe, idTabInbox = t.idTabInbox, idInbox = t.IdInbox, idProspecto = $.trim(t.Idprospecto), tkp = t.tkp, esCliente = t.esCliente, idSeguimiento = t.idSeguimiento, tieneCc = t.tieneCc;
  var opciones = 'correoDe:\''+correoDe+'\', idTabInbox:'+idTabInbox+', idInbox:'+idInbox+' , idProspecto:\''+idProspecto+'\', tkp:\''+tkp+'\', esCliente:\''+esCliente+'\'';
  
  var str='<i onclick="SalesUp.Inbox.ejecutaAccion({'+opciones+', accion:8});" class="mailCorreo Pointer Bold">['+correoDe+']</i>';
  return new Handlebars.SafeString(str);
});/* enviarCorreo */

Handlebars.registerHelper('deDondeVino', function(){
  var f = function(v){return parseFloat(v);}
  var t = this, str = '', claseProveedor = '';
  var proveedor = $.trim(t.proveedor), correoEntrante = $.trim(t.correoEntrante);
  var SysInboxActivo = SalesUp.Sistema.Almacenamiento({a:'SysInboxActivo'});

  if(proveedor=='0'){
    correoEntrante = 'SMTP/POP: '+ correoEntrante;
    claseProveedor = 'faPop';
  }
  if(proveedor=='1'){
    correoEntrante = 'Gmail: '+ correoEntrante;
    claseProveedor = 'faGmail';
  }
  if(proveedor=='2'){
    correoEntrante = 'Outlook/Hotmail: '+ correoEntrante;
    claseProveedor = 'faOutlook';
  }
  if(proveedor=='3'){
    correoEntrante = 'Yahoo: '+ correoEntrante;
    claseProveedor = 'faYahoo';
  }
  if(proveedor=='4'){
    correoEntrante = 'SMTP/IMAP: '+ correoEntrante;
    claseProveedor = 'faImap';
  }
/*fa-bookmark*/
  str = '<i class="fa fa-envelope-square '+claseProveedor+' Tip2" tip="'+correoEntrante+'"></i> ';
  ((proveedor=='')||(SysInboxActivo=='1')) ? str = '':'';


  return new Handlebars.SafeString(str);
});/* deDondeVino */


Handlebars.registerHelper('verLtArchivos', function(){
  var t = this;
  var trim = function(v){return $.trim(v);}
  var str = '', prms = '', tieneArchivos = t.tieneArchivos, idp = trim(t.IdProspecto), tkp = trim(t.Tkp), tko = trim(t.Tko), ido = trim(t.IdOportunidad);
 
  if(tkp){idp='';prms += 'tkp:\''+tkp+'\',';}
  if(idp){prms += 'IdP:'+idp+',';}
  if(tko){ido='';prms += 'tko:\''+tko+'\',';}

  if(tieneArchivos){
    str = '<span class="nArchivos Tip8" tip="Archivos adjuntos: '+tieneArchivos+'" onclick="SalesUp.Construye.VerLtArchivos({'+prms+' Elem:this})"></span>';  
  }

  return new Handlebars.SafeString(str);
});/* verLtArchivos */



Handlebars.registerHelper('compartidoIniciales', function(){
  var trim = function(v){return $.trim(v);}
  var t = this, str = '', prms = '', Compartido = t.Compartido, Iniciales = trim(t.Iniciales), 
  EjecutivoNombre = trim(t.EjecutivoNombre), idp = trim(t.IdProspecto), tkp = trim(t.Tkp);

  if(tkp){idp='';prms += 'tkp:\''+tkp+'\','; }
  if(idp){ prms += 'IdP:'+idp+',';}
  var icono = '';
  if (t.tAprobar) {
    if (t.tRechazar) {
      icono = '<i class="fa fa-pause-circle-o" style="color:#f48e21"></i>';
    }else{
      icono = '<i class="fa fa-thumbs-down" style="color:red"></i>'
    }
  }
 
  if(Compartido){
    str = '';
    str += '<span class="Tip8 ColIniciales ProspectoCompartido Pointer" Tip="'+EjecutivoNombre+' (Compartido)" onclick="SalesUp.Construye.VerLtCompartidos({'+prms+' Elem:this})">';
    str += icono+' <i class="fa fa-group"></i> '+Iniciales;
    str += '</span>';
  }else{
    str = '<span class="Tip8 ColIniciales" Tip="'+EjecutivoNombre+'">'+icono+' '+Iniciales+'</span>';
  }

  return new Handlebars.SafeString(str);
});/* compartidoIniciales */

Handlebars.registerHelper('proximoEvento', function(){
  var trim = function(v){return $.trim(v);}
  var t = this, str = '', prms = '', proximoEvento = t.proximoEvento;
  var tipo ='', fecha ='', hora ='', evento ='', tk ='', camp1 ='';
  if(!proximoEvento){str=''}
  
  try{
    proximoEvento = JSON.parse(proximoEvento);
  }catch(e){
    proximoEvento = {};
  }

  if(_.size(proximoEvento)){

    tipo = proximoEvento.tipo, fecha = SalesUp.Sistema.FormatoFecha(proximoEvento.fecha), hora = proximoEvento.hora;
    evento = proximoEvento.evento, tk = (proximoEvento.tk) ? proximoEvento.tk:'', camp1 = (proximoEvento.camp1) ? proximoEvento.camp1:'';
    /***Cita***/
    if(tipo == '1'){
      str +='<span class="Pointer Bold Tip1" Tip="Cita: '+evento+'" onclick="SalesUp.Variables.verCita({tkc:\''+tk+'\'})" >';
      str += '  <i class="fa fa-calendar"></i> '+fecha+' '+hora;
      str += '</span>';
    }
    /***Recordatorio***/
    if(tipo=='2'){
      str += '<span class="Pointer Bold Tip1" Tip="Recordatorio: '+evento+'" onclick="SalesUp.Sistema.AbrePopUp({Titulo:\'Editar recordatorio\', Pagina:\'/privado/popup_editar_recordatorio.dbsp\', Parametros:\'tkrec='+tk+'\', CallBack:\'ReloadData\', Alto:200, Ancho:620});">';
      str += '  <i class="fa fa-bell"></i> '+fecha+' '+hora;
      str += '</span>';
    }
    /***Tarea***/
    if (tipo == '3') {
      str += '<span class="Pointer Bold Tip1" Tip="Tarea: '+evento+'" onclick="document.location.href=\'/privado/VerTarea.dbsp?tk='+tk+'\'">'
      str += '  <i class="fa fa-share-square"></i> '+fecha+' '+hora;
      str += '</span>'
    }
    /***Cobro***/
    if (tipo == '4') {
      str += '<span class="Pointer Bold Tip1" Tip="Cobro: '+evento+'" onclick="SalesUp.Sistema.AbrePopUp({Titulo:\'Editar Venta\', Pagina:\'/privado/popup_editar_venta_refactor.dbsp\', Parametros:\'tkv='+camp1+'&tko='+tk+'\', CallBack:\'ReloadData\', Alto:500, Ancho:700});">';
      str += '  <i class="fa fa-money"></i> '+fecha;
      str += '</span>';
    }
    /***Fecha Importante***/
    if (tipo == '5') {
      if (tk == 1) {
        str += '<p class="Pointer Bold Tip1" Tip="Fecha a Recordar: '+evento+'">';
        str += '  <i class="fa fa-envelope"></i> '+fecha;
        str += '</p>';
      }
      if (tk == 2) {
        str += '<p class="Pointer Bold Tip1" Tip="Fecha a Recordar: '+evento+'">';
        str += '  <i class="fa fa-bell"></i> '+fecha;
        str += '</p>';
      }
      
    }
    /***Correo Programado***/
    if (tipo == '6') {
      str += '<span class="Pointer Bold Tip1" Tip="Correo Programado: '+evento+'" onmouseenter="SalesUp.Variables.accionesCorreoProgramado({t:this,asunto:\''+evento+'\',idp:\''+camp1+'\',idMail:\''+tk+'\'});">';
      str += '  <i class="fa fa-envelope"></i> '+fecha+' '+hora;
      str += '</span>';
    }
  }
  

  return new Handlebars.SafeString(str);
});/* proximoEvento */



Handlebars.registerHelper('telefonoContacto', function() {
  var t = this, str='', telefono = t.Telefono||t.TELEFONO, telefono2 = t.Telefono2||t.TELEFONO2, movil = t.Movil||t.MOVIL,
  oportunidad=t.IdOportunidad||t.IDOPORTUNIDAD, prospecto=t.IdProspecto||t.IDPROSPECTO, tkp=t.Tkp||t.TKP;
  
if(telefono){

str+='<p class="pt5">'
    +'<i class="fa fa-phone-square"></i> ' 
    +'<span class="FormatoTel llamar-click Pointer Bold " data-tkp="'+tkp+'" data-tel="'+telefono+'" data-movil=false>'+telefono+'</span>'
  '</p>';

}
if(telefono2){

str+='<p class="pt5">'
    +'<i class="fa fa-phone-square"></i> ' 
    +'<span class="FormatoTel llamar-click Pointer Bold " data-tkp="'+tkp+'" data-tel="'+telefono2+'" data-movil=false>'+telefono2+'</span>'
  '</p>';

}

if(movil){

str+='<p class="pt5">'
    +' <i class="fa fa-mobile"></i> ' 
    +'<span onmouseenter="SalesUp.Llamadas.accionesLlamadasProgramado({t:this});" class="FormatoTel MovilPhone Pointer Bold " data-tkp="'+tkp+'" idprospecto="'+prospecto+'" idoportunidad="'+oportunidad+'" tel="'+movil+'" id="movile-'+movil+'" data-movil=true>'+movil+'</span>'
  '</p>';

}

  return new Handlebars.SafeString(str);
});



Handlebars.registerHelper('hlpTelefonoEmpresa', function() {
  var t = this, str='', telefono = t.Telefono;
  
if(telefono){

str+='<p class="pt5">'
    +'<i class="fa fa-phone-square"></i> ' 
    +'<span class="FormatoTel llamar-click Pointer Bold " data-tkp="'+tkp+'" data-tel="'+telefono+'" data-movil=false>'+telefono+'</span>'
  '</p>';

}

  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlpTipoDelSeguimiento', function() {
  var t = this, str='', tipoSeguimiento = ""+t.TIPO_SEGUIMIENTO, comentario=t.COMENTARIO,duracion=t.DURACION;
  
switch(tipoSeguimiento){
  case '2':str='<i><i class="fa fa-lg fa-reply-all fa-flip-horizontal"></i> ';
  break;
  case '8':str='<i class="Tip1 duracion-time" tip="'+(duracion>0?duracion:'')+'"><i class="fa fa-phone-square" ></i> ';
  break;
  default:
  str='<i>';
}

str+=comentario+'</i>';
  return new Handlebars.SafeString(str);
});

//***************//
Handlebars.registerHelper('hlpSeparaObj', function() {
  var t = this;
  var concepto = t.CONCEPTO;
  var linea = t.LINEA_PRODUCTO.split('+/&+?');
  var moneda = t.MONEDA.split('+/&+?');
  var unicode = t.UNICODE.split('+/&+?');
  var moneda_simbolo = t.MONEDA_SIMBOLO.split('+/&+?');

  var monto = t.Monto.split('+/&+?');
  var descripcion_certeza = t.DESCRIPCION_CERTEZA.split('+/&+?');
  var certeza = t.CERTEZA.split('+/&+?');
  var link = t.Tko.split('+/&+?');
  var link2 = t.Tkp;
  var arrConcepto = concepto.split('+/&+?');
  var tieneArchivos = t.tieneArchivos.split('+/&+?');
  var conceptoLong = concepto.split('+/&+?').length;
  var str = '';
  var f17 = '';
  var fCm = '';

  function Certeza(ce,ce2){
    if(ce<0.34){
      if(ce2!=""){ce2='Certeza baja';}
      ce = '<i class="fa fa-star Rojo Tip2" Tip="'+(ce*100.00).toFixed(0)+'% - '+ce2+'"></i> '; 
    }else if(ce>=0.34 && ce<0.66){
      if(ce2!=""){ce2='Certeza media';}
      ce = '<i class="fa fa-star Amarillo Tip2" Tip="'+(ce*100.00).toFixed(0)+'% - '+ce2+'"></i> ';
    }else if(ce>=0.66){
      if(ce2!=""){ce2='Certeza alta';}
      ce = '<i class="fa fa-star Verde Tip2" Tip="'+(ce*100.00).toFixed(0)+'% - '+ce2+'"></i> ';
    }
    return ce;
  }
  
    var stylo;
    for(var i = 0; i < conceptoLong; i++){
      var t = {'tieneArchivos':tieneArchivos[i],'Tko':link[i],'Tkp':link2}
      stylo ="";
      fCm = '';
      if(tieneArchivos[i] !=""  && parseInt(tieneArchivos[i]) != 0){
        fCm = Handlebars.helpers.verLtArchivos(t);
      }
      if (arrConcepto.length > 1 && i != conceptoLong-1) {
        stylo = ' style="border-bottom:1px dotted gray; margin-bottom:5px;"';
      }
      arrConcepto[i] = (arrConcepto[i]) ? arrConcepto[i] : 'Sin concepto';
      f17 = 'style="padding-left:17px;"';
        str += '<div class="w100" '+stylo+'><div class=" Ellipsis  w60" style="text-align: left;"  > <a href="/privado/oportunidades-visualizar.dbsp?TKO='+link[i]+'"> '+Certeza(certeza[i],descripcion_certeza[i])+'<b>'+arrConcepto[i]+'</b></a></div>';
        var formateado = SalesUp.Sistema.moneda({moneda:moneda_simbolo[i], numero:monto[i]});
        str +=  '<div class="tDer w40" certeza="'+certeza[i]+'" data-simbolo="'+moneda_simbolo[i]+'" data-unicode="'+unicode[i]+'">'+formateado+'</div>'
        str += '<div class=" Ellipsis w70" style="text-align: left;"><span '+f17+'>'+' '+linea[i]+'</span></div>';
        str += '<div class=" tDer w30"><span >'+moneda[i]+'</span></div></div>';
        
  }
  
  return new Handlebars.SafeString(str);

});


Handlebars.registerHelper('hlp_direccion',function(sicp){
  var arrayDireccion = [];
  var CIUDAD = (this.ciudad) ? this.ciudad : (this.Ciudad) ? this.Ciudad : this.CIUDAD;
  var ESTADO = (this.estado) ? this.estado : (this.Estado) ? this.Estado : this.ESTADO;
  var MUNICIPIO = (this.municipio) ? this.municipio : (this.Municipio) ? this.Municipio: this.MUNICIPIO;
  var PAIS = (this.pais) ? this.pais : (this.Pais) ? this.Pais: this.PAIS;
  var CP = (this.cp) ? this.cp : (this.CP) ? this.CP: this.CODIGOPOSTAL;
  var Direccion1 = (this.direccion1) ? this.direccion1 : (this.Direccion1) ? this.Direccion1: this.DIRECCION1;
  var Direccion2 = (this.direccion2) ? this.direccion2 : (this.Direccion2) ? this.Direccion2: this.DIRECCION2;
  (Direccion1) ? arrayDireccion.push(Direccion1) : '';
  (Direccion2) ? arrayDireccion.push(Direccion2):'';
  (CIUDAD) ? arrayDireccion.push(CIUDAD):'';
  (MUNICIPIO) ? arrayDireccion.push(MUNICIPIO):'';
  (ESTADO) ? arrayDireccion.push(ESTADO):'';
  (PAIS) ? arrayDireccion.push(PAIS):'';
  (CP) ? arrayDireccion.push(CP):'';
  var xstring = arrayDireccion.join(', ');
  return new Handlebars.SafeString(xstring);
});

Handlebars.registerHelper('hlp_compare', function(lvalue, rvalue, options) {
  if (arguments.length < 3)
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
  var operator = options.hash.operator || "==";
  var operators = {
    '==':       function(l,r) { return l == r; },
    '===':      function(l,r) { return l === r; },
    '!==':       function(l,r) { return l !== r; },
    '<':        function(l,r) { return l < r; },
    '>':        function(l,r) { return l > r; },
    '<=':       function(l,r) { return l <= r; },
    '>=':       function(l,r) { return l >= r; },
    'typeof':   function(l,r) { return typeof l == r; }
  };
  if (!operators[operator])
    throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);
  var result = operators[operator](lvalue,rvalue);
  if( result ) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

/*Alerta Autorizacion prospectos*/
Handlebars.registerHelper('hlp_tProspectos',function(){
  var t = this;
  var tku = t.tku
  var prospecto = t.prospecto;
  var tkp = t.tkp;
  var fase = t.fase;
  var tkcom = t.tkCom;
  var tamaniolt = _.size(prospecto);
  var ltProspecto = '';
  /*href="prospectos-visualizar.dbsp?tkp=P-0D51A645-84F8-42D5-A546-42B3AA046278"*/
  for(var i = 0; i<tamaniolt; i++){
    ltProspecto += '<tr id="'+tkp[i]+'" class="ltCliente"><td style="width:400px;"><span class="Tip2" tip="'+fase[i]+'"> <a href="'+fase[i]+'s-visualizar.dbsp?tkp='+tkp[i]+'">'+prospecto[i]+'</a> </span></td>';
    ltProspecto += '<td><span class="Pointer" id="rechazar'+tkp[i]+'" data-tku="'+tku+'" data-tkcom="'+tkcom+'" data-tkp="'+tkp[i]+'" onclick="SalesUp.Notificaciones.muestraPopOver({Elemento:this});"><i class="fa fa-lg fa-times Tip8" tip="Rechazar"></i></span> <span style="padding-left:5px;" id="aprobar" class="Pointer" data-tku="'+tku+'" data-tkcom="'+tkcom+'" data-tkp="'+tkp[i]+'" onclick="SalesUp.Notificaciones.AutorizarProspecto({Elemento:this});"><i class="fa fa-lg fa-check Tip8" tip="Autorizar"></i></span>';
    ltProspecto += ' </td></tr>';
  }
  return new Handlebars.SafeString(ltProspecto);
});/*Alerta Autorizacion prospectos*/

Handlebars.registerHelper('hlpEsCero',function(v){
  str = v;
  if(v==0){str = '-';}
  return new Handlebars.SafeString(str);
});/*Alerta Autorizacion prospectos*/


Handlebars.registerHelper('hlp_Simbolo_Moneda',function(monto,simbolo,allowzero) {
  
  allowzero = (typeof allowzero  == "number") ? allowzero : 1;
  var numero = (monto) ? monto : (this.monto) ? this.monto : (this.GT) ? this.GT:0 ;
  var simbol;
  if(simbolo != '' && simbolo != 0 && simbolo != null && typeof simbolo != "function" && typeof simbolo != "object"){
    var tmp  = simbolo.toString().split(',');
    simbol = '';
    for(x in tmp){
      simbol = simbol+ String.fromCharCode(tmp[x]);
    }
  }
  else if(this.simbolo != null && this.simbolo != ""){
    simbol = String.fromCharCode(this.simbolo) 
  }else{
    simbol = (SalesUp.Sistema.Almacenamiento({a:'SysSimboloMonedaDefault'})) ? SalesUp.Sistema.Almacenamiento({a:'SysSimboloMonedaDefault'}) : SalesUp.Sistema.Almacenamiento({a:'SysMoneda'});
  }


  if (numero != 0 || allowzero == 1){
    conSimbolo = SalesUp.Sistema.moneda({moneda:simbol, numero:numero});
  }else{
    conSimbolo = '-';
  } 

  return new Handlebars.SafeString(conSimbolo);
})

Handlebars.registerHelper('hlpSimpleDivicion',function(valor1,valor2,mon) {
  if(valor2 === 0){valor2 = 1}
  Result = valor1/valor2;
  if (mon) { 
    var simbol =  SalesUp.Sistema.Almacenamiento({a:'SysMoneda'}); 
    Result = SalesUp.Sistema.moneda({moneda:simbol, numero:Result})
  }
  return new Handlebars.SafeString(Result);
})

Handlebars.registerHelper('hlpFases',function(Op,count,simbolo,zero){
  var t=this;
  var link = t.LINK;
  var ObjetoFiltro = SalesUp.Variables.objetoFiltro;  
  var tipo = ObjetoFiltro.TIPORESULT;
  var tiempo = ObjetoFiltro.TIPOTIEMPO;
  
 
  var resultado = '<a href="'+link+'" class="LINKFASE'+count+'">'; 

  if(Op==0 && (zero < 1 || typeof zero != 'number')){
   resultado += '<b><span class="">-</span></b>';
   return new Handlebars.SafeString(resultado);
  }else{
    if(tipo==1){
      resultado += '<b><span>'+Handlebars.helpers.hlp_Simbolo_Moneda(Op,simbolo,0)+'</span></b>';
    }else if(tipo==0){
      resultado += '<b><span>'+SalesUp.Sistema.FormatoNumero(Op);+'</span></b>';
    }else if(tiempo==2){
      resultado += '<b><span>'+SalesUp.Sistema.FormatoMinutos({ Minutos:Op, Tipo:'d' })+'</span></b>';
    }else if(tiempo==3){
      resultado += '<b><span>'+SalesUp.Sistema.FormatoMinutos({ Minutos:Op, Tipo:'h' })+'</span></b>';
    }else if(tiempo==1){
      resultado += '<b><span>'+SalesUp.Sistema.FormatoMinutos({ Minutos:Op, Tipo:'sem' })+'</span></b>';
    }else if(tiempo==4){
      resultado += '<b><span class="MinutosMinutos ">'+Op+'</span></b>';
    }else{
      resultado += '<b><span>'+SalesUp.Sistema.FormatoMinutos({ Minutos:Op, Tipo:'m' })+'</span></b>';
    }
    resultado += '</a>';
    return new Handlebars.SafeString(resultado);
  }

  
});


Handlebars.registerHelper('hlpColorCerteza', function() {
    var t = this, color = t.Color;
    var str = '';
    
    if(color == 'Verde'){
      str = '<a href="#" class="certezaalta tCen" title="Certeza Alta"></a>';
    }else if(color == 'Amarillo'){
      str = '<a href="#" class="certezamedia tCen" title="Certeza Media"></a>';
    }else if(color == 'Rojo'){
      str = '<a href="#" class="certezabaja tCen" title="Certeza Baja">';
    }str

    return new Handlebars.SafeString(str)
});



Handlebars.registerHelper('hlpParametros', function(agrp) {
  var t = this
  if (agrp == 1) {str = t.TKU}
  if (agrp == 2 || agrp == 3 || agrp == 4 || agrp == 12 ) {str = t.TK}
  if (agrp == 5) {str = t.IDPAIS}
  if (agrp == 6) {str = t.REGION}
  if (agrp == 7) {if (t.CIUDAD != 'Desconocido') { str = t.CIUDAD }else{ str='' }}
  if (agrp == 11) {str = t.IDETIQUETA}

  return new Handlebars.SafeString(str);
});/*hlpOpcionVariante*/

Handlebars.registerHelper('hlpContactos',function(nombre,tk,cliente){
  var str = '';
  switch (cliente){
    case 0:
      str = '<a href="prospectos-visualizar.dbsp?tkp='+tk+'"><b>'+nombre+'</b></a>';
      break;
    case 1:
      str = '<a href="clientes-visualizar.dbsp?tkp='+tk+'"><b>'+nombre+'</b></a>';
      break;
    default:
      str = '<b>'+nombre+'</b>';
  }
  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlpEsCorreo',function(escorreo){
  var t = this, str = '';
  if (escorreo === 'NO') {
    str = '<span class="CorreoWarning Tip1" tip="El correo es inválido">'+t.DESTINATARIO+'</span>';
  }else{
    str = '<span>'+t.DESTINATARIO+'</span>';
  }
  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlpTipoCorreo',function(){
  var t = this;
  var errores = t.ERRORES, tipo = t.TIPO, estado = t.ESTADO;
  var abierto = t.ABIERTO, fechaAbierto = t.FECHAABIERTO, fechaLeido = t.FECHA_LEIDO;
  var msgUltimoError = (t.ULTIMOERRORMSG) ? t.ULTIMOERRORMSG: 'Desconocido';
  var mail = t.IDEMAIL;
  var str = '';
  var extra = '';
  var tip = '';
  var style = '';
  if(errores < 3){
    if(tipo == 1){
      extra = '<i class="fa fa-globe fa-stack-1x" style="color:#1a5c8f;margin-left:5px;margin-top:5px" ></i>';
      if(estado == 1 & abierto != null &fechaAbierto != null){
        style = 'color:#61ba9e;margin-left:-1px;margin-top:-1px';
        tip = 'Correo automático leído';
      }else{
        style = 'color:#FE9A2E;margin-left:-1px;margin-top:-1px';
        tip = 'Correo automático';
      }
    }else{
      if (fechaLeido != null) {
        style = 'color:#61ba9e;';
        tip = 'Correo manual leído';
      }else{
        style = 'color:#FE9A2E;';
        tip = 'Correo manual';
      }
    }
  }else{
    if(tipo == 1){
      style = 'color:#d9534f;margin-left:-1px;margin-top:-1px';
      extra = '<i class="fa fa-globe fa-stack-1x" style="color:#1a5c8f;margin-left:5px;margin-top:5px" ></i>';
      tip = 'Error correo automático: '+msgUltimoError+'';
    }else{
      style = 'color:#d9534f;';
      tip = 'Error correo manual: '+msgUltimoError+'';
    }
  }

  str += '<a id="'+mail+'" class="email" onclick ="verCorreo('+mail+');">';
    str += '<span class="fa-stack fa Tip8" tip="'+tip+'">';
      str += '<i class="fa fa-envelope fa-lg" style="'+style+'"></i>'+extra;
    str += '</spa>';
  str += '</a>';

  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlpEstadoCorreo',function(){
  var t = this, estado = t.ESTADO, errores = t.ERRORES, escorreo = t.ESCORREO
  var msgUltimoError = (t.ULTIMOERRORMSG) ? t.ULTIMOERRORMSG: 'Desconocido';
  var str = '';
  var mail = t.IDEMAIL;
  if( estado == 0 || estado == 2){
    str = '<span class="Tip8" tip="Procesando envio de correo">';
      str += '<i class="fa fa-lg fa-spin fa-spinner"></i>';
    str += '</span>';
  }
  if (escorreo === 'NO' & estado == 0){
    str = '<a onclick="editarCorreo({mail:'+mail+',tkp:'+t.IDPROSPECTO+'});" id="'+mail+'" class="editarcorreo Tip8" tip="editar correo"><i class="fa fa-lg fa-edit"></i></a>';
  }
  if ((estado == 0 & errores == 3)||(estado == 2)) {
    str ='<a id="'+mail+'" class="reenviar" onclick="reenviar('+mail+');">';
    str += '<span class="fa-stack fa Tip8" tip="Reenviar correo">';
    str += '<i class="fa fa-send fa-lg"  style="color:#61ba9e;"></i>';
    str += '</span>';
    str += '</a>';
  }
  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlpTipoSMS',function(){
  var t = this;
  var errores = t.ERRORES, tipo = t.TIPO, estado = t.ESTADO;
  var msgUltimoError = (t.ULTIMOERRORMSG) ? t.ULTIMOERRORMSG: 'Desconocido';
  var str = '';
  var clase = '';
  var tip = '';
  var style = '';
  if(errores == 0 & t.ULTIMOERRORMSG==null){
    clase = 'class="fa fa-weixin fa-inverse fa-lg" style="color:#61ba9e;"';
    if (tipo == 1) {
      tip = 'Mensaje de SMS automático enviado';
    }else{
      tip = 'Mensaje de SMS manual enviado';
    }
  }else{
    clase = 'class="fa fa-weixin fa-inverse fa-lg" style="color:#d9534f;"';
    if (tipo==1) {
      tip = 'Mensaje SMS automático fallido:'+msgUltimoError;
    }else{
      tip = 'Mensaje SMS manual fallido:'+msgUltimoError;
    }
  }
  str = '<span class="fa-stack fa Tip8" tip="'+tip+'"><i '+clase+'></i></span>';
  return new Handlebars.SafeString(str);
});


Handlebars.registerHelper('hlpEmpresa', function(tkcom,empresa) {
  var str = '';
  (!tkcom) ? tkcom = '' : '';
  (!empresa) ? empresa = '' : '';
  if((tkcom!='')&&(empresa!='')){
    str = '<a id="EmpresasVisualizar" href="EmpresasVisualizar.dbsp?tkcom='+tkcom+'"><i class="fa fa-building-o"></i> <b>'+empresa+'</b></a>';
  }else{
    str = '<span>'+empresa+'</span>';
  }
  return new Handlebars.SafeString(str);
});


Handlebars.registerHelper('hlpLinkActividadesPeriodo', function(desde,hasta,agrupar,periodo,num,tipo){
  var str = '', t = this;
  if (!desde) {desde = ''};
  if (!hasta) {hasta = ''};
  if (!agrupar) {agrupar = ''};
  if (!periodo) {periodo = ''};

  if (num == 0){
    str = '';
  }else{
    str = '/privado/ReporteActividadesDetalle.dbsp?tk='+t.tk+'&fecha_desde='+desde+'&fecha_hasta='+hasta+'&tipo='+tipo+'&agrupar='+agrupar+'&periodo='+periodo+'&nombre='+t.Ejecutivo+'';
  }
  return new Handlebars.SafeString(str);
});

/*******************************/
Handlebars.registerHelper('linkExtra', function(extra, extra2, link) {
  var extralink    = '';
  var reporteVista =  SalesUp.Variables.ReporteTipo;

  if(reporteVista == 1){
        //extralink = '&elejecutivo='+extra;
        extralink='&tku='+this.TKU;
      }if(reporteVista == 2){
        //extralink = '&elgrupo='+extra;
        extralink = '&tkgrupo='+this.TKGRUPO;
      }else if(reporteVista == 3){
        //extralink = '&lalinea='+extra;
        extralink='&tklinea='+this.TKLINEA;
      }else if(reporteVista == 4){
        //extralink = '&elorigen='+extra;
        extralink = '&tkorigen='+this.TKORIGEN;
      }else if(reporteVista == 5){
        extralink = '&pais='+extra;
      }else if(reporteVista == 6){
        extralink = '&pais='+extra2+'&estado='+extra;
      }else if(reporteVista == 7){
        extralink = '&laciudad='+extra;
      }

      return extralink;
    });
/********************************************/
//sirven para crear templates dinamicos, por ejemplo los de periodicidad
Handlebars.registerHelper('openCurly', function() {
  return new Handlebars.SafeString('{{');
});

Handlebars.registerHelper('closeCurly', function() {
  return new Handlebars.SafeString('}}');
});

//Comprueba la salud del comprador
Handlebars.registerHelper('hlpRelevancia', function(max) {
  var prog = ((this.MONTO/max)*100).toFixed(2);;
  var salud = (this.SALUD1 == 1) ? 1 : (this.SALUD2 == 1) ? 2: 3
  var tipo;
  if(salud == 1) tipo = 'success'
  if(salud == 2) tipo = 'warning'
  if(salud == 3) tipo = 'danger'
  var progress = '<div class="progress progress-striped active " > <span class="LbPorcentaje">'+prog+'%</span> <div class="progress-bar progress-bar-'+tipo+' OcultarImprimir" style="width:'+prog+'%"></div> <img class="BarImg progress-bar" style="width:'+prog+'%" src="../imagenes/BarSuccess.jpg"></div>'
  return new Handlebars.SafeString(progress);
});

Handlebars.registerHelper('hlpFormatoFecha', function(fecha) {
  fecha = SalesUp.Sistema.FormatoFecha(fecha);
  return new Handlebars.SafeString(fecha);
});

Handlebars.registerHelper('hlpNumMap', function(fecha) {
  str = '<img style="width: 45px;" src="data:image/svg+xml;charset=utf-8,'+ encodeURIComponent(markerImageSvg.replace('{{NUM}}', this.NUM))+'">';
  return new Handlebars.SafeString(str)
});

Handlebars.registerHelper('hlpSucesosCuerpo', function(Op) {
  var t = Op.data.root;
 
  var retorna = '';
  if(t.TIPO==0 ||t.TIPO==2 ||t.TIPO==3 ||t.TIPO==4 ||t.TIPO==5 ||t.TIPO==6 ||t.TIPO==7 ||t.TIPO==8 ||t.TIPO==23 ||t.TIPO==24 ||t.TIPO==37 ||(t.TIPO>50 && t.TIPO<65)){
    retorna = '<a href="prospectos-visualizar.dbsp?TKP='+t.TKP+'">';
  }
  if(t.TIPO==13 ||t.TIPO==22||t.TIPO==71){
    retorna = '<a href="clientes-visualizar.dbsp?TKP='+t.TKP+'">';
  }
  if(t.TIPO==1 ||t.TIPO==10 || t.TIPO==11 ||t.TIPO==12||t.TIPO==14||t.TIPO==21){
    retorna = '<a href="oportunidades-visualizar.dbsp?TKP='+t.TKO+'">';
  }
  if(t.TIPO==9 && t.TIPO==null){
    retorna = '<a href="ventas-visualizar.dbsp?TKV='+t.TKV+'&TKO='+t.TKO+'">';
  }else{
    if(t.TIPO==9){
      retorna = '<a href="clientes-visualizar.dbsp?TKP='+t.TKP+'">';
    }
  }

  return new Handlebars.SafeString(retorna)
});

Handlebars.registerHelper('hlpSucesosEmpresa', function(Op){
   var t = Op.data.root;
   var str = '';
   if(t.TKCOM){ 
     if(t.EMPRESA){
      str = '<a id="EmpresasVisualizar" href="EmpresasVisualizar.dbsp?tkcom='+t.TKCOM+'"><i class="fa fa-building-o"></i> <b>'+t.EMPRESA+'</b></a>';
     }
   }else{
    if(t.EMPRESA){
       str = '<span>'+t.EMPRESA+'</span>';
     }
    }
  
   
  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlpPorcentaje', function(num,total){
  var str = '';
  num = parseFloat(num);
  var porcentaje = Math.round(num*100/total);
  str = porcentaje+'%';
  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlpSimboloPorcentaje', function(num){
  num = parseFloat(num)
  num = (typeof num == 'number' && !isNaN(num))? num : 0;
  var str = SalesUp.Sistema.FormatoPorcentaje(num);
  return new Handlebars.SafeString(str);
});


Handlebars.registerHelper('hlpEsCero', function(number) {
  number  = parseInt(number);
  if (number != 0 && !isNaN(number)) {
    result = number;
  }
  else{
    result = '-'
  }
  return new Handlebars.SafeString(result);
});

Handlebars.registerHelper('hlpCortaPalabra',function(palabra, tamano,tolerancia){
  var result = ''
  if (!palabra) {return new Handlebars.SafeString(''); }
  if (palabra.length > tamano+tolerancia ) {
    result = '<span class="Tip7" tip="'+palabra+'">'+palabra.substring(0, tamano)+'...</span>';

  }else{
    result = '<span>'+palabra+'</span>'
  }
  return new Handlebars.SafeString(result);
})

Handlebars.registerHelper('hlpSimboloMonedaCruzada',function(monto,simbolo,allowzero,transacciones) {
  if (transacciones > 0) {
    if (monto == 0) { allowzero = 1}
    return Handlebars.helpers.hlp_Simbolo_Moneda(monto,simbolo,allowzero)
  }else{
    return '';
  }
})

Handlebars.registerHelper('hlpSimboloMonedaCruzada',function(monto,simbolo,allowzero,transacciones) {
  if (transacciones > 0) {
    if (monto == 0) { allowzero = 1}
    return Handlebars.helpers.hlp_Simbolo_Moneda(monto,simbolo,allowzero)
  }else{
    return '';
  }
})


Handlebars.registerHelper('hlpCompartidoIniciales', function(Compartido,Iniciales,EjecutivoNombre,IdProspecto,Tkp){
  var trim = function(v){return $.trim(v);}
  var t = this, str = '', prms = '', Compartido = Compartido, Iniciales = trim(Iniciales), 
  EjecutivoNombre = trim(EjecutivoNombre), IdProspecto = trim(IdProspecto), Tkp = trim(Tkp);

  if(Tkp){idp='';prms += 'tkp:\''+Tkp+'\','; }
  if(IdProspecto){ prms += 'IdP:'+IdProspecto+',';}
  var icono = '';
  if (t.tAprobar) {
    if (t.tRechazar) {
      icono = '<i class="fa fa-pause-circle-o" style="color:#f48e21"></i>';
    }else{
      icono = '<i class="fa fa-thumbs-down" style="color:red"></i>'
    }
  }
 
  if(Compartido){
    str = '';
    str += '<span class="Tip8 ColIniciales ProspectoCompartido Pointer" Tip="'+EjecutivoNombre+' (Compartido)" onclick="SalesUp.Construye.VerLtCompartidos({'+prms+' Elem:this})">';
    str += icono+' <i class="fa fa-group"></i> '+Iniciales;
    str += '</span>';
  }else{
    str = '<span class="Tip8 ColIniciales" Tip="'+EjecutivoNombre+'">'+icono+' '+Iniciales+'</span>';
  }

  return new Handlebars.SafeString(str);
});/* compartidoIniciales */



Handlebars.registerHelper('hlpDetalleCobroInfo',function(t,t2,m) {
 var telefono  = t;
 var telefono2 = t2;
 var movil     = m;
 var res = '';

 res += (telefono) ? ( '<p class="telefono">'+telefono+'</p>') : ''
 res += (telefono2) ? ( '<p class="telefono">'+telefono2+'</p>') : ''
 res += (movil) ? ( '<p class="celular">'+movil+'</p>') : ''

 return new Handlebars.SafeString(res);
})

Handlebars.registerHelper('hlpCobroPendienteEmpresa', function(tkcom, empresa){
var tkcom = tkcom, empresa = empresa
  var str = '<a id="EmpresasVisualizar" href="EmpresasVisualizar.dbsp?tkcom='+tkcom+'"><i class="fa fa-building-o"></i> <b>'+empresa+'</b></a>';
  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlpDosCeros', function(numero){
  var str;
  str = (Math.round(numero * 100) / 100).toFixed(2)
  return new Handlebars.SafeString(str);
});


 Handlebars.registerHelper("hlpIconoUsuario", function(Tipo) {
  if (Tipo == 1) {
      return "fa fa-user";
  }
  return "icomoon icomoon-user2";
});

Handlebars.registerHelper('hlpLinkFileTickets', function(name,link) {
  var str = '<span class="Bold mt10 w100 linkFileComentarioTicket Pointer" onclick="window.open(\''+link+'\')"><i class="fa fa-paperclip fa-lg"></i> '+name+'</span>'
  if (link) {
    return new Handlebars.SafeString(str);
  }
})

Handlebars.registerHelper('hlp_Accion_Reporte_Actividades_Detalle', function(esventa,tko,tkv){
  var link = '';
  if(esventa == 0){
    link = 'href="oportunidades-visualizar.dbsp?tko='+tko+'"';
  }else{
    link = 'href="ventas-visualizar.dbsp?tko='+tko+'&tkv='+tkv+'"';
  }
  return new Handlebars.SafeString(link);
});

Handlebars.registerHelper('hlp_formato_Numero',function(num){
  var n_num = 0;
  n_num = SalesUp.Sistema.FormatoPorcentaje(num);
  return new Handlebars.SafeString(n_num);
});

Handlebars.registerHelper('ifn', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

Handlebars.registerHelper('hlpFormatoFechaPasado', function(fecha,pasado) {
  var fecha = SalesUp.Sistema.FormatoFecha(fecha);
  var result;
  if (pasado > 0) {
    result = '<span class="Rojo">'+fecha+'</span>';
  }else{
    result = '<span>'+fecha+'</span>';
  }
  
  return new Handlebars.SafeString(result);
});

Handlebars.registerHelper('hlpModuloActivo', function(modulo,options){
  console.log(typeof modulo);
  if (typeof modulo != "number") {
    console.info(modulo);
    options.fn(this);
  }else{
    if (SalesUp.Sistema.EstaActivoModulo({Modulo:modulo})) {
      options.fn(this);
    }
    else{
      options.inverse(this);
    }
  }
})