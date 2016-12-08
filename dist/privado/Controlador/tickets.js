Handlebars.registerHelper('hlp_estatus_tickets', function(id,tiempoTranscurrido, tiempoTerminado){
	var str;
	var id = id;
	var tiempoTranscurrido = tiempoTranscurrido;
	var tiempoTerminado = tiempoTerminado;
	if(id==1){
		str = tiempoTranscurrido;
	}else{
		str = tiempoTerminado;
	}
	return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlp_formato_ticket_rm', function(c){
	var str = '';
	var c = c.replace('comentó el ','');

	str = c;

	return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlp_fecha_cierre_tickets', function(a){
	var str = '';
	var a = a;
	if(a!=null){
		str = '<td class="centrado">'+this.FECHA_CIERRE+'</td>';
	}
	return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlp_respuestas_tickets', function(p){
	if(_.size(this)!=0){
		var t                         = this;
		var p                         = p;
		var TIPOUSUARIO               = t.TIPOUSUARIO;
		var IDCALIFICACION            = t.IDCALIFICACION;
		var NOMBRE_ULTIMAMODIFICACION = t.NOMBRE_ULTIMAMODIFICACION;
		var FECHA                     = t.FECHA;
		var COMENTARIO                = t.COMENTARIO;
		var ADJUNTO                   = t.ADJUNTO;
		var ADJUNTO_LINK              = t.ADJUNTO_LINK;
		var TKTCOM        			  = t.TKTCOM;
		var IDTICKETCOMENTARIO        = t.IDTICKETCOMENTARIO;
		var IDESTADO                  = t.IDESTADO;
		var otro                      = '';
		var nombreTipo                = '';
		var fechaTip                  = '';
		var comentarioo               = '';
		var faTicket                  = 'fa fa-user';
		var ubicacionContenedor       = 'Right';
		if((TIPOUSUARIO==2)&&(IDCALIFICACION==1) && IDTICKETCOMENTARIO == p && SalesUp.Variables.estadoTicket ==1){
			ubicacionContenedor  = '';
			otro                 = 'contenedorUsuario2';
			comentarioo          = 'ComenCalif';
			nombreTipo           = FECHA;
			fechaTip             ='';
			SalesUp.Variables.parametrosComentarioTicketNodelTodo = {tktcom:TKTCOM,tkt:SalesUp.Variables.Eltkt}
			faTicket             = 'icomoon fa-lg icomoon-user2';
			var tempBotones      = '<div class="w100 centrado mt10">';
			tempBotones          += '<h2 style="font-weight: bold; margin-bottom: 10px; font-size: 14px;">'+SalesUp.Variables.clienteTickver+', haznos saber si hemos dado la respuesta que esperabas a tu solicitud.</h2>';

			tempBotones          += '<span style="margin-right:5px;" class="Pointer BtnAccion Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" onclick=SalesUp.ticket.TicketResuelto({ticket:1,calificacion:2,e:this,tktcom:"'+TKTCOM+'",tkt:"'+SalesUp.Variables.Eltkt+'"}) title="¡Sí gracias!" id="SiGracias">';
			tempBotones          += '	<i class="fa fa-lg fa-thumbs-o-up"></i> ¡Sí gracias!';
			tempBotones          += '</span>';

			tempBotones          += '<span style="margin-right:5px;" class="Pointer BtnAccion Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" onclick=\'SalesUp.ticket.crearComentarioTicketBotonoes({calificacion:3})\' title="No todavia" id="NoDelTodo">';
			tempBotones          += '	<i class="fa fa-lg fa-meh-o"></i> No todavia';
			tempBotones          += '</span>';

			tempBotones          += '<span style="margin-right:5px;" class="Pointer BtnAccion Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" onclick=\'SalesUp.ticket.crearComentarioTicketBotonoes({calificacion:4})\' title="Creo que no me expliqué" id="NoMeExplique">';
			tempBotones          += '	<i class="fa fa-lg fa-frown-o"></i> Creo que no me expliqué';
			tempBotones          += '</span>';


			tempBotones          += '<span style="margin-right:5px;" class="Pointer BtnAccion  Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" onclick=\'SalesUp.ticket.TicketAGerente({calificacion:2,tktcom:"'+TKTCOM+'",tkt:"'+SalesUp.Variables.Eltkt+'"})\'  title="Olvídalo, ¡pasénme al gerente!" id="Olvidalo">';
			tempBotones          += '<i class="fa fa-lg fa-thumbs-down"></i> Olvídalo, ¡pasénme al gerente!';
			tempBotones          += '</span>';
			tempBotones          += '<div class="clear"></div>';
			tempBotones          += '</div>';
			tempBotones          += '<div class="clear"></div>';

		}else{
			nombreTipo      = NOMBRE_ULTIMAMODIFICACION;
			fechaTip        = '<span class="tDer fechaTicket"><i style="margin-right:5px;" class="fa fa-calendar"></i>'+FECHA+'</span>';
			var tempBotones = '';
		}

		if(TIPOUSUARIO==2){
			faTicket = 'icomoon fa-lg icomoon-user2';
			otro     = 'contenedorUsuario2';
			ubicacionContenedor  = '';
		}

		var str =  '<div class="w95 estiloDEtalle '+otro+' '+ubicacionContenedor+'">';
		str     += ' <div class="w100 TitDiv">';
		str     += '	<span class="w60 tIzq"><i class="'+faTicket+'"></i> '+nombreTipo+'</span>';
		str     += '	<span class="w40 tDer">  '+fechaTip.replace('comentó el ','')+' </span>';
		str     += ' </div>';
		str     += ' <span class="w100 comentarioTikcet'+comentarioo+'">'+COMENTARIO+'</span>';
		if(ADJUNTO){
			str     += ' <span onclick="window.open(\''+ADJUNTO_LINK+'\',\'Archivo adjunto\')" class="Bold mt10 w100 linkFileComentarioTicket Pointer"><i class="fa-lg fa fa-paperclip" aria-hidden="true"></i> <b>'+ADJUNTO+'</b></span>';
		}
		str     += tempBotones;
		str     += '</div>';

	}else{
		var str =  '';
	}

	return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlpFormatoFechaTicket', function(f) {
	var f = f;
	var fecha = SalesUp.Sistema.FormatoFechaHora(f);
	return new Handlebars.SafeString(fecha);
});

Handlebars.registerHelper('hlp_adjunto_ticket', function(adjunto,adjunto_link) {
	var str = '';
	if(adjunto){
		str = '<span onclick="window.open(\''+adjunto_link+'\',\'Archivo adjunto\')" class="Bold mt10 w100 linkFileComentarioTicket Pointer"><i class="fa-lg fa fa-paperclip" aria-hidden="true"></i> <b>'+adjunto+'</b></span>';
	}
	return new Handlebars.SafeString(str);
});


var tickets = function() {
	var sitioControl = SalesUp.Sistema.queControl();
	/**************TICKETS****************/
	this.procesaTicket = function(Op) {
		var objeto = (Op.estatus) ? Op.estatus : 0;
		SalesUp.Variables.estatusTicketAnterior = objeto;
		var start  = (Op.start) ? Op.start : 1;
		//SalesUp.Construye.ActivaEsperaGuardando();
		SalesUp.Sistema.MuestraEspera('#DatosLoad', 1);
		var vistaTickets = function(Op) {
			SalesUp.Variables.OpInsertTicket = Op;
			//SalesUp.Construye.QuitaEsperaGuardando();
 			SalesUp.Sistema.MuestraEspera('#DatosLoad', 0); 
 
			$('#titulo').html(' <h1><i class="fa fa-ticket"></i><span> Tickets de soporte</span></h1>');
 			var jsonDatosCuerpo = Op.jsonDatosCuerpo;

			var totalRegistros  = Op.jsonDatosTotal[0].TOTALN;
			var templateHeader  =  '<tr>';
			templateHeader      += '<td style="width: 20px;" class="centrado"></td>';
			templateHeader      += '<td style="width: 100px;"class="centrado">No Ticket</td>';
			templateHeader      += '<td style="width: 200px;"class="centrado">Asunto</td>';
			templateHeader      += '<td style="width: 300px;"class="centrado" >Descripción</td>';
			templateHeader      += '<td style="width: 100px;"class="centrado">Departamento</td>';
			templateHeader      += '<td style="width: 120px;"class="centrado">Creación</td>';
			templateHeader      += '<td style="width: 120px;"class="centrado">Última modificación</td>';
			templateHeader      += '<td style="width: 55px;"class="centrado">Estado</td>';
			templateHeader      += '<td style="width: 115px;" class="centrado" >Tiempo transcurrido</td>';
			templateHeader  	+=  '</tr>';


			var templateCuerpo = '<tr>';
			templateCuerpo     +='<td style="width:10px" class="centrado"><b>{{nFila}}</b></td>';
			templateCuerpo     +='<td class="centrado"> <a id=\'{{TKT}}\' onclick=" SalesUp.ticket.ticketDetalles({ TKT:\'{{TKT}}\' }); "><b>{{TICKET}}</b></a> </td>';
			templateCuerpo     +='<td> <a onclick="SalesUp.ticket.ticketDetalles({ TKT:\'{{TKT}}\' })"><b>{{ASUNTO}}</b></a> </td>';
 			templateCuerpo     +='<td> {{{DESCRIPCION}}}</td>';
 			templateCuerpo     +='<td class="centrado">{{DEPARTAMENTO}}</td>';

			templateCuerpo     +='<td class="centrado FormatoFechaHora">{{FECHA_CREACION}}</td>';
			templateCuerpo     +='<td class="centrado FormatoFechaHora">{{FECHA_ULTIMAMODIFICACION}}</td>';
			templateCuerpo     +='<td class="centrado">{{ESTADO}}</td>';
			templateCuerpo     +='<td class="centrado"> {{hlp_estatus_tickets IDESTADO TIEMPOTRANSCURRIDO TIEMPOTERMINADO}} </td>';
			templateCuerpo     +='</tr>';


			if(totalRegistros==0){jsonDatosCuerpo=[]};
			SalesUp.Construye.ConstruyeTabla(templateHeader, templateCuerpo, jsonDatosCuerpo, {
				Destino: '#DatosLoad',
				Id: 'reporteContenido',
				elInicio: start
			});
			var $tabla = $('#reporteContenido');
			SalesUp.Sistema.paginacion({
				registros : totalRegistros,
				start     : start,
				callback  : SalesUp.ticket.procesaTicket,
				tabla     : $tabla,
				parametros: objeto
			});
			var btnDEtalle = '<span onclick="SalesUp.ticket.crearTicket()" class="Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar btnNeutral" ><i class="fa fa-ticket"></i> Crear ticket</span>';
			$('#ocultaBtnCreaTicket').html(btnDEtalle);
 			$('.fechaTicket').css('font-size','12px');
			$('.fechaTicket').css('font-style','italic');
			$('.fechaTicket').css('font-weight','normal');

		}

		/*******************************/
		SalesUp.Sistema.CargaDatosAsync({
			link: 'https://'+sitioControl+'.salesup.com.mx/webservices/ticket_jsonTicket.dbsp',
			parametros: 'ESTATUS=' + objeto + '&inicio=' + start + '&TKU=' +SalesUp.Variables.TKU_USUARIO + '&IDPRODUCTO=' + SalesUp.Variables.idProducto,
			callback: vistaTickets
		});
  }//procesaTicket

  this.selectEstadoTicket = function(estatus){
    	var estatus = (estatus) ? estatus : 1
     	var selectFilled = function(Op){
    		var json                 = Op.jsonEstadosTickets;
    		var option               = '';
    		var templateTicketSelect = '<div class="elCriterio">';
    		templateTicketSelect     += '  <span class="txtCriterio Ellipsis">Estado</span>';
    		templateTicketSelect     += '  <select id="Estatus" name="Estatus" onchange="SalesUp.ticket.procesaTicket({estatus:value});" class="Select Ellipsis">';
     		templateTicketSelect     += '	<option value=0>(... Todos ...)</option>';
    		templateTicketSelect     += '	<option value=1>Abierto</option>';
    		templateTicketSelect     += '	<option value=2>Resuelto</option>';
     		templateTicketSelect     += '  </select>';

    		templateTicketSelect     += '</div>';
    		$('#Elfiltro').html(templateTicketSelect);
    		var btnDEtalle = '<span onclick="SalesUp.ticket.crearTicket()" class="Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar btnNeutral" ><i class="fa fa-ticket"></i> Crear ticket</span>';
 			$('#Elfiltro').append(btnDEtalle);
    		var element              = $('#Estatus');

    		setTimeout(function(){
    			$("#Estatus").val(estatus);
    		},500);

    		SalesUp.ticket.procesaTicket({estatus:estatus});
    	}
    	SalesUp.Sistema.MuestraEspera('#DatosLoad', 1);
    	SalesUp.Sistema.CargaDatosAsync({
    		link:'https://'+sitioControl+'.salesup.com.mx/webservices/ticket_jsonEstadosTicket.dbsp',
    		callback:selectFilled
    	});
    }//selectEstadoTicket

    this.subeArchivoAdjunto = function($archivo, callback){
    	var tieneArchivo = $archivo.val();

    	if(tieneArchivo==""){
    		callback('','');
    		return;
    	}

    	var formData     = new FormData();
    	var objArchivo   = $archivo[0];
    	var $archivoFile = objArchivo.files[0];
    	var Extension    = ($archivoFile!=undefined) ? ValidaExtension({Archivo:$archivo}) : '';
    	var Tamanio      = ($archivoFile!=undefined) ? SalesUp.Valida.ValidaTamanioArchivo({ Archivo:objArchivo, Max:10, destino:'#aqui'}) : '';

    	formData.append('archivo',$archivoFile);
    	formData.append('idempresa',1);
    	formData.append('tipo','TIC');
    	formData.append('publico',1);

 		if(!Tamanio){
     		$("#FileName").html('Seleccionar archivo');
    		$('#archivo').val('');
    		SalesUp.Construye.QuitaEsperaGuardando();
    		return;
    	}

    	if(!Extension){
    		MmSgN({Destino:'#aqui',Mensaje:"La extencion no es valida",malo:1});
    		$("#FileName").html('Seleccionar archivo');
    		$('#archivo').val('');
    		SalesUp.Construye.QuitaEsperaGuardando();
    		return;
    	}

    	var resultadoArchivoSubido = function(Op){
    		var resultado = Op.resultado;
    		var Archivo = 'https://s3-us-west-2.amazonaws.com/salesupfiles/000001/';

    		if(resultado == 1){
    			var nombreAdjunto = Op.nombre;
    			Archivo+=Op.nombre;
    			callback(Archivo,nombreAdjunto);
    		}else{
    			console.log(Op.error);
    			MmSgN({Destino:'#aqui',Mensaje:"No se pudo subir el archivo",malo:1});
	    		//mensaje de error no se pudo subir el archivo
	    	}
	    }

	    SalesUp.Sistema.CargaDatosAsync({
	    	link:'https://fenix.salesup.com.mx/aws/subeArchivo.php',
	    	parametros:formData,
	    	callback:resultadoArchivoSubido,
	    	metodo:'POST',
	    	formData:true 
	    });
    }//subeArchivoAdjunt

    this.guardaCrearTicket = function(){
    	SalesUp.Construye.ActivaEsperaGuardando();
    	var procesaGuardaCrearTicker = function(archivo,nombre){
     		var asunto       = $('#asunto').val();
    		var departamento = $('#departamento').val();
    		var descripcion  = $('#descripcion').val();
    		var mensaje      = 'Surgió un problema al crear el ticket, por favor intentar mas tarde';
    		var enviar       = 'asunto='+encodeURIComponent(asunto)+'&departamento='+departamento+'&descripcion='+encodeURIComponent(descripcion)+'&TICKETNORMALIZADO='+encodeURIComponent(nombre)+'&link_adjunto='+encodeURIComponent(archivo)+'&TKU=' +SalesUp.Variables.TKU_USUARIO + '&IDPRODUCTO=' + SalesUp.Variables.idProducto;

     		SalesUp.Sistema.CargaDatosAsync({
    			link:'https://'+sitioControl+'.salesup.com.mx/webservices/ticket_inserta_ticket_nuevo.dbsp',
    			parametros:enviar,
    			callback:cierraPopupCrearTicket 
    		});
	    }//procesaGuardaCrearTicker

	    if(SalesUp.Valida.ValidaObligatorios({DestinoMsj:'#frmEdit'})){
	    	SalesUp.ticket.subeArchivoAdjunto($('#archivo'),procesaGuardaCrearTicker);
	    }else{
	    	SalesUp.Construye.QuitaEsperaGuardando();
	    }
	}//guardaCrearTicket

	this.crearTicket = function(){
		SalesUp.Construye.MuestraPopUp({
			alto:'320px', ancho:'650px', id:'popUpTickets',
			titulo:'Crear ticket',
			fuente:'/privado/popup_crear_ticket_nuevo.dbsp'
		});

 
		setTimeout(function(){$('#asunto').focus()},600);
    }//crearTicket


    this.informacionDelSelectDepartamento = function(){
    	var select = SalesUp.Sistema.CargaDatos({
    		Link:'https://'+sitioControl+'.salesup.com.mx/webservices/ticket_jsonTicketDepartamentoLista.dbsp'
    	});
    	select = JSON.parse(select);
    	select = select.jsonSelect;
    	$('#departamento').append('<option value="" disabled selected>Selecciona una opcion..</option>');
    	for (var i = 0; i < select.length; i++) {
    		if(select[i].IDDEPARTAMENTO==2){
    			$('#departamento').append('<option value="'+select[i].IDDEPARTAMENTO+'">'+select[i].DEPARTAMENTO+'</option>');
    		}else{
    			$('#departamento').append('<option value="'+select[i].IDDEPARTAMENTO+'">'+select[i].DEPARTAMENTO+'</option>');
    		}
    	}


    }//informacionDelSelectDepartamento
    /**************TICKETS****************/

    /**************TICKETS DETALLE****************/
    this.ticketDetalles = function(Op){
    	var tk = Op.TKT;
    	SalesUp.Variables.Eltkt = tk;
    	var start  = (Op.start) ? Op.start : 1;
    	SalesUp.Sistema.MuestraEspera('#DatosLoad', 1);
 
     	var vistaDetalleTickets = function(Op){
 

			var jsonTicket                      = Op.jsonTicket;
			var asunto                          = Op.jsonTicket[0].ASUNTO;
			var ticket                          = Op.jsonTicket[0].TICKET;
			var fecha_cierre                    = (Op.jsonTicket[0].FECHA_CIERRE!=null) ? '<td class="centrado">Fecha de cierre</td>' : '';
			SalesUp.Variables.clienteTickver    = Op.jsonTicket[0].NOMUSER;
			SalesUp.Variables.estadoTicket      = Op.jsonTicket[0].IDESTADO;
			SalesUp.Variables.ElOpDeTalleTicket = Op;


    		$('#ocultaBtnCreaTicket').html('');
    		$('#titulo').html('<span id="buton" style="margin-right:5px;" class="Pointer btnAtras Btn Btn-rounded Btn-tiny Btn-flat-Aceptar Btn-tiny-min Left"  onclick="SalesUp.ticket.regresaTicket();" ><i class="fa fa-lg fa-arrow-left"></i></span>  <span><h1>  Ticket '+ticket+' - '+asunto+'</h1></span>');
    		$('#titulo').css('margin-bottom','5px');
    		$('#Elfiltro').html('');

    		var tempHeaderSeccion1 = '<tr>';
    		tempHeaderSeccion1     += '<td>Creado por</td>';
    		tempHeaderSeccion1     += '<td>Departamento</td>';
    		tempHeaderSeccion1     += '<td class="centrado">Creado el</td>';
    		tempHeaderSeccion1     += '<td class="centrado">Última modificación</td>';
    		tempHeaderSeccion1     += fecha_cierre;
    		tempHeaderSeccion1     += '<td class="centrado">Estado</td>';
    		tempHeaderSeccion1     += '</tr>';

    		var tempCuerpoSession1 = '<tr>';
    		tempCuerpoSession1     += '<td>{{NombreUsuario}} ({{EMAIL}})</td>';
    		tempCuerpoSession1     += '<td>{{DEPARTAMENTO}}</td>';
    		tempCuerpoSession1     += '<td class="centrado FormatoFechaHora">{{FECHA_CREACION_1}}</td>';
    		tempCuerpoSession1     += '<td class="centrado">{{FECHA_ULTIMAMODIFICACION}}</td>';
    		tempCuerpoSession1     += '{{hlp_fecha_cierre_tickets FECHA_CIERRE}}';
    		tempCuerpoSession1     += '<td class="centrado">{{ESTADO}}</td>';
    		tempCuerpoSession1     += '</tr>';

    		SalesUp.Construye.ConstruyeTabla(tempHeaderSeccion1, tempCuerpoSession1, jsonTicket, {
    			Destino: '#DatosLoad',
    			Id: 'detalleTicketContenido',
    			elInicio: start
    		});

    		var tempSeccion2 =  '<div class="w100 estiloDEtalle">';
    		tempSeccion2     += '<div class="w100 TitDiv">';
    		tempSeccion2     += '<span class="w60 tIzq"><i class="fa fa-comment"></i> Comentario</span>';
    		tempSeccion2     += '</div>';
 
    		tempSeccion2     += '<div class="w100 comentarioTikcet" >{{{DESCRIPCION}}}</div>';
     		tempSeccion2     += '{{hlp_adjunto_ticket ADJUNTO ADJUNTO_LINK}}';

    		tempSeccion2     += '</div>';

    		tempSeccion2     += '<div style="margin-top:15px;" class="clear"></div>';


    		var seccion2     = SalesUp.Construye.ReemplazaDatos({Datos:jsonTicket[0], Template:tempSeccion2});

    		if(SalesUp.Variables.estadoTicket==2){
    			var btnComentar  = '<span class="Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" onclick=\'SalesUp.ticket.crearComentarioTicketBotonoes({idticket:"'+tk+'",calificacion:7})\' title="Responder ticket" id="Responder"><i class="fa fa-lg fa-comment"></i> Reabrir</span>';
    		}else{
    			var btnComentar  = '<span class="Pointer Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar" onclick=\'SalesUp.ticket.crearComentarioTicketBotonoes({idticket:"'+tk+'",calificacion:0})\' title="Responder ticket" id="Responder"><i class="fa fa-lg fa-comment"></i> Comentar</span>';
    		}


    		$('#DatosLoadSession2').html(seccion2);
    		$('#ocultaBtnCreaTicket').html(btnComentar);
    		SalesUp.Sistema.Tipsy();

    		setTimeout(function(){
    			$('.fechaTicket').css('font-size','12px');
    			$('.fechaTicket').css('font-style','italic');
    			$('.fechaTicket').css('font-weight','normal');
    		},500);




    		/*******************************/
    		SalesUp.Sistema.CargaDatosAsync({
    			link: 'https://'+sitioControl+'.salesup.com.mx/webservices/ticket_jsonTicketRespuesta.dbsp',
    			parametros: 'TKT=' + tk+ '&TKU=' +SalesUp.Variables.TKU_USUARIO,
    			callback: SalesUp.ticket.respuestasTicketDetalle
    		});
    	}

    	/*******************************/
    	SalesUp.Sistema.CargaDatosAsync({
    		link: 'https://'+sitioControl+'.salesup.com.mx/webservices/ticket_jsonDetalleTicket.dbsp',
    		parametros: 'TKT=' + tk+ '&TKU=' +SalesUp.Variables.TKU_USUARIO,
    		callback: vistaDetalleTickets
    	});
	}//ticketDetalles

	this.respuestasTicketDetalle = function(Op){
		var primero = _.where(Op.jsonDatosCuerpo,{TIPOUSUARIO:"2",IDCALIFICACION:1});
		primero     = _.max(primero, function(primero){ return primero.IDTICKETCOMENTARIO;});
		primero = primero.IDTICKETCOMENTARIO;
		var str = '<div class="w100 TitDiv"><span class="w60 tIzq"><i class="fa fa-comments" aria-hidden="true"></i>  Respuestas</span></div>';
		var tempSeccion3 = '{{#each jsonDatosCuerpo}}{{hlp_respuestas_tickets '+primero+'}}{{/each}}';

		var seccion3 = SalesUp.Construye.ReemplazaDatos({Datos:Op, Template:tempSeccion3});
		if(seccion3!=""){$('#DatosLoadTitulo').html(str);}
		seccion3 = seccion3+='<div class="clear"></div>';
		$('#DatosLoadSession3').html(seccion3);

		var color = SalesUp.Sistema.hex2rgb(SalesUp.Sistema.rgb2hex($('#menu-superior').css('backgroundColor')),80);
		var color2 = SalesUp.Sistema.hex2rgb(SalesUp.Sistema.rgb2hex($('#menu-superior').css('backgroundColor')),27);
		$('.contenedorUsuario2 .TitDiv').css({'border-color':color});
		$('.contenedorUsuario2 .estiloDEtalle .TitDiv').css({'margin-top':'-2px'});
		$('.contenedorUsuario2').css({'background-color': color2});
		SalesUp.Sistema.Tipsy();
	}//respuestasTicketDetalle

	this.guardaComentarioTicket = function(){
		SalesUp.Construye.ActivaEsperaGuardando();
		var idticket = SalesUp.Variables.parametrosComentarioTicketNodelTodo.idticket;
		var calificacion = SalesUp.Variables.laCalificacion;
		var procesaGuardaComentarioTicker = function(archivo,nombre){
			var TextRespuesta = $('#TextRespuesta').val();
			var mensaje       = 'Surgió un problema al crear el ticket, por favor intentar mas tarde';
			var enviar  = 'idticket='+idticket+'&c='+calificacion+'&idtc=0&r=&visto=0&idestado=1&TextRespuesta='+encodeURIComponent(TextRespuesta)+'&TICKETNORMALIZADO='+encodeURIComponent(nombre)+'&link_adjunto='+encodeURIComponent(archivo)+'&tipousuario=1&TKU=' +SalesUp.Variables.TKU_USUARIO;

			SalesUp.Sistema.CargaDatosAsync({
				link:'https://'+sitioControl+'.salesup.com.mx/webservices/ticket_jsonTicketRespuestaComentario.dbsp',
				parametros:enviar,
				callback:cierrePopUpComentarioTicket
			});
	    }//procesaGuardaComentarioTicker
	    if(SalesUp.Valida.ValidaObligatorios()){
	    	SalesUp.ticket.subeArchivoAdjunto($('#archivo'),procesaGuardaComentarioTicker);
	    }else{
	    	SalesUp.Construye.QuitaEsperaGuardando();
	    }
 	}//guardaComentarioTicket

 	this.guardaComentarioTicketBotones = function(){
 		SalesUp.Construye.ActivaEsperaGuardando();
 		if(SalesUp.Variables.parametrosComentarioTicketNodelTodo.idticket){
 			SalesUp.ticket.guardaComentarioTicket();
 		}else{
 			var tktcom       = SalesUp.Variables.parametrosComentarioTicketNodelTodo.tktcom;
 			var tkt          = SalesUp.Variables.parametrosComentarioTicketNodelTodo.tkt;
 			var calificacion = SalesUp.Variables.laCalificacion;
 			var procesaGuardaComentarioTickerNodelTodo = function(archivo,nombre){
 				var TextRespuesta = $('#TextRespuesta').val();
 				var mensaje       = 'Surgió un problema al crear el ticket, por favor intentar mas tarde';
 				var enviar        = 'idticket='+tkt+'&c='+calificacion+'&idtc='+tktcom+'&r=&visto=0&idestado=1&TextRespuesta='+encodeURIComponent(TextRespuesta)+'&TICKETNORMALIZADO='+encodeURIComponent(nombre)+'&link_adjunto='+encodeURIComponent(archivo)+'&tipousuario=1&TKU=' +SalesUp.Variables.TKU_USUARIO;

 				SalesUp.Sistema.CargaDatosAsync({
 					link:'https://'+sitioControl+'.salesup.com.mx/webservices/ticket_jsonTicketRespuestaComentario.dbsp',
 					parametros:enviar,
 					callback:cierrePopUpComentarioTicket
 				});
		    }//procesaGuardaComentarioTickerNodelTodo
		    if(SalesUp.Valida.ValidaObligatorios()){
		    	SalesUp.ticket.subeArchivoAdjunto($('#archivo'),procesaGuardaComentarioTickerNodelTodo);
		    }else{
		    	SalesUp.Construye.QuitaEsperaGuardando();
		    }
		}
    }//guardaComentarioTicketBotones

    this.crearComentarioTicketBotonoes = function(Op){
    	if((Op.tktcom)||(Op.tkt)){
    		SalesUp.Variables.parametrosComentarioTicketNodelTodo = {tktcom:Op.tktcom,tkt:Op.tkt,e:Op.e};
    	}
    	if(Op.idticket){
    		SalesUp.Variables.parametrosComentarioTicketNodelTodo = {idticket:Op.idticket};
    		if (Op.e) {
    			SalesUp.Variables.parametrosComentarioTicketNodelTodo.e = Op.e;
    		}
    	}
    	SalesUp.Variables.laCalificacion = Op.calificacion;
    	var titulo = '';
    	if(Op.calificacion==3){
    		titulo = 'No todavía' ;
    		SalesUp.Variables.TextoDescripcion = 'Descríbenos por qué no hemos resuelto tu solicitud';
    	}else if(Op.calificacion==4){
    		titulo = 'Creo que no me expliqué';
    		SalesUp.Variables.TextoDescripcion = 'Descríbenos por qué no hemos resuelto tu solicitud';
    	}else if(Op.calificacion==7){
    		titulo = 'Reabrir';
    		SalesUp.Variables.TextoDescripcion = 'Descríbenos por qué no hemos resuelto tu solicitud';
    	}else{
    		titulo = 'Comentario';
    		SalesUp.Variables.TextoDescripcion = 'Descrípcion';
    	}
    	SalesUp.Construye.MuestraPopUp({
    		alto:'225x', ancho:'450px', id:'popUpTicketsComentario',
    		titulo:titulo,
    		fuente:'/privado/popup_responder_ticket_nuevo.dbsp'
    	});
    	setTimeout(function(){
			$('#TextRespuesta').focus();
    	},200);
    }//crearComentarioTicketBotonoes

    this.regresaTicket = function(){
    	$('#DatosLoad').html('');
    	$('#DatosLoadSession2').html('');
    	$('#DatosLoadTitulo').html('');
    	$('#DatosLoadSession3').html('');
    	$('#ocultaBtnCreaTicket').html('');
     	SalesUp.ticket.selectEstadoTicket(SalesUp.Variables.estatusTicketAnterior);
    }//regresaTicket

    /**************TICKETS DETALLE****************/

    /**************TICKETS Acciones****************/
    this.TicketResuelto = function(Ob){

 
		var ticketRegresa = (Ob.ticket) ? Ob.ticket : 0;
		var calificacion  = (Ob.calificacion) ? Ob.calificacion: 2;
		var idtc          = (Ob.idtc) ? Ob.idtc:null;
		var tktcom        = (Ob.tktcom) ? Ob.tktcom:null;
		var e             = (Ob.e) ? Ob.e : null;
		var Notif         = (Ob.Notif) ? true: false;
		var SiGracias     = $("#SiGracias").attr("onclick");
		var NoDelTodo     = $("#NoDelTodo").attr("onclick");
		var NoMeExplique  = $("#NoMeExplique").attr("onclick");
		var Olvidalo      = $("#Olvidalo").attr("onclick");
		if (Notif         == false) {
     		$("#SiGracias").removeAttr("onclick");

    		$("#NoDelTodo").removeAttr("onclick");
    		$("#NoMeExplique").removeAttr("onclick");
    		$("#Olvidalo").removeAttr("onclick");
    		$("#SiGracias i").attr('class','fa fa-lg fa-spinner fa-spin');
    	}else{
    		var $e = $(e)
    		var htmlo = $e.html();
    		$e.html('<i class="fa fa-spinner fa-spin "></i> Procesando ...');
    		$('.DetalleTicketPopUp:first .Btn').each(function() {
    			var $t = $(this);
    			$t.attr({oc : $t.attr('onclick')}).removeAttr('onclick');
    		});
    	}

    	var actions = function(Op,err){

    		if(err){console.log(err);
    			if (Notif) {
    				$e = $(e)
    				$e.html(htmlo);
    				$('.DetalleTicketPopUp:first .Btn').each(function() {
    					var $t = $(this);
    					$t.attr({onclick : $t.attr('oc')}).removeAttr('oc');
    				});
    			}
    			else{
    				$("#SiGracias").attr("onclick",SiGracias);
    				$("#NoDelTodo").attr("onclick",NoDelTodo);
    				$("#NoMeExplique").attr("onclick",NoMeExplique);
    				$("#Olvidalo").attr("onclick",Olvidalo);
    			}

    			SalesUp.Construye.MuestraNotificacion({Mensaje:"Surgio un problema, intentar mas tarde"});
    			return;
    		}
    		SalesUp.Notificaciones.NotificacionesTickesRespuestas();
    		SalesUp.Construye.MuestraNotificacion({Mensaje:"Ticket cerrado"});

    		if(Notif){
    			SalesUp.ticket.CerrarTicketsVtana(e);
    		}else{
 
    			SalesUp.ticket.procesaTicket({estatus:1});
     			if(ticketRegresa==1){SalesUp.ticket.regresaTicket();}

    			$("#SiGracias i").attr('class','fa fa-lg fa-thumbs-up');

    		}
    		SalesUp.Notificaciones.NotificacionesTickesRespuestas();
    	}

    	SalesUp.Sistema.CargaDatosAsync({
    		link: 'https://'+sitioControl+'.salesup.com.mx/webservices/ticket_jsonticketCerrar.dbsp',
    		callback: actions,
    		parametros: 'calificacion='+calificacion+'&tktcom='+tktcom+'&visto=2&idestado=2&tipousuario=1&convercode=' + SalesUp.Variables.convertCode + '&TKU=' +SalesUp.datosUsuario.tku
    	})

	}//TicketResuelto

	this.TicketAGerente = function(Op){
		SalesUp.Variables.TicketGerente = function(){
			var calificacion = (Op.calificacion) ? Op.calificacion: null;
			var tktcom = (Op.tktcom) ? Op.tktcom:null;
			var e = (Op.e) ? Op.e : null;
			var datos = 'calificacion='+calificacion+'&tktcom='+tktcom+'&visto=0&idestado=1&tipousuario=1&TKU=' +SalesUp.Variables.TKU_USUARIO + '&IDPRODUCTO=' + SalesUp.Variables.idProducto;

			var actions = function(Op,err){
				if(err){console.log(err);SalesUp.Construye.MuestraNotificacion({Mensaje:"Surgio un problema, intentar mas tarde"}); return;}
				SalesUp.Construye.MuestraNotificacion({Mensaje:"Se le ha enviado su solicitud al gerente."});
				if(e){
					SalesUp.ticket.CerrarTicketsVtana(e);
				}else{
					SalesUp.ticket.ticketDetalles({	TKT:SalesUp.Variables.Eltkt});
				}
				SalesUp.Notificaciones.NotificacionesTickesRespuestas();
			}

			SalesUp.Sistema.CargaDatosAsync({
				link: 'https://'+sitioControl+'.salesup.com.mx/webservices/ticket_jsonTicketGerente.dbsp',
				callback: actions,
				parametros: datos
			})
		}

		SalesUp.Construye.MuestraAlerta({
			TipoAlerta:'AlertaPregunta',
			Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><p>¿Está seguro de querer contactar al gerente?</p>',
			Icono2: '',
			Id:'AlertaTicketGerente',
			Ancho:'350px',
			Callback1:'SalesUp.Variables.TicketGerente()'
		});
	}//TicketAGerente

	this.marcadoOk = function(Obj){
 		var tkt = (Obj.tkt) ?  Obj.tkt : SalesUp.Variables.Eltkt;
		var e = (Obj.e) ? Obj.e : null;
		var actions = function(Obj,err){
			if(err){console.log(err);SalesUp.Construye.MuestraNotificacion({Mensaje:"Surgio un problema, intentar mas tarde"}); return;}
			//SalesUp.Construye.MuestraNotificacion({Mensaje:"Se le ha enviado su solicitud al gerente."});
			if(e){
				SalesUp.ticket.CerrarTicketsVtana(e);
			}else{
				SalesUp.ticket.ticketDetalles({	TKT:SalesUp.Variables.Eltkt});
			}
			SalesUp.Notificaciones.NotificacionesTickesRespuestas();
		}

		SalesUp.Sistema.CargaDatosAsync({
    		link: 'https://'+sitioControl+'.salesup.com.mx/webservices/ticket_jsonLeidoTicket.dbsp',
    		callback: actions,
    		parametros: 'tkt='+tkt
    	})
	}
	/**************TICKETS Acciones****************/

	/**************Tickets Cierra ventana**************/
	this.CerrarTicketsVtana = function(elemento){
	 	$elemento = $(elemento);
	 	var nacciones;
	 	var txt;
		if(_.size($('#popUpTicketAbierto .DetalleTicketPopUp')) == 1){
			SalesUp.Construye.CierraPopUp({t:$('#popUpTicketAbierto .BodyModal')});
			
			// var txt = _.size($('#popUpTicketAbierto .DetalleTicketPopUp'))-1>1 ? "Tienes respuesta a "+_.size($('#popUpTicketAbierto .DetalleTicketPopUp'))+" tickets" : "Tienes respuesta al siguiente ticket";
			setTimeout(function(){
				nacciones = _.size($('#popUpTicketAbierto .DetalleTicketPopUp:first div.centrado.botonesVentanaTickets .btnAccion'));
				if (nacciones > 2) {
					txt = 'Tienes respuesta al siguiente ticket';
				}else{
					txt = 'Tienes un nuevo comentario en el siguiente ticket';
				}
			   	$('#popUpTicketAbierto .HeadModal h2').html(txt)
			},100)
			
		}else{
			$elemento.closest('.DetalleTicketPopUp').fadeOut("slow",function(){
			$elemento.closest('.DetalleTicketPopUp').remove();
			$('#popUpTicketAbierto .DetalleTicketPopUp:first').fadeIn();
      		setTimeout(function(){
      			nacciones = _.size($('#popUpTicketAbierto .DetalleTicketPopUp:first div.centrado.botonesVentanaTickets .btnAccion'));
				if (nacciones > 2) {
					txt = 'Tienes respuesta al siguiente ticket';
				}else{
					txt = 'Tienes un nuevo comentario en el siguiente ticket';
				}
			   	$('#popUpTicketAbierto .HeadModal h2').html(txt)
			},100)
		});

		}
	}//CerrarTicketsVtana//CerrarTicketsVtana
	/**************Tickets Cierra ventana**************/
	var tamanioValido = function(Op){
		var ban = true, MaxSize, aMb ;
		var IE = navigator.appVersion.indexOf("MSIE 9");
		if(IE<0){
			(Op.Max) ? MaxSize = Op.Max : MaxSize = 20;
			Tamanio = Op.Archivo.files[0].size;
			aMb = (Tamanio / 1024) / 1024;
			if(aMb>MaxSize){
				ban = false;
				SalesUp.Construye.MuestraMsj({tMsg:3, Destino:'#aqui', Id:'ErrorTamanio', Msg:'Tamaño de archivo permitido. '+MaxSize+' Mb.' });
			}
		}

		return ban;
	}/* /ValidaTamanioArchivo() */
	var ValidaExtension = function(Op){
		var Pasa = true;
		if(Op.Archivo[0].files[0]!=undefined){
			var Archivo = Op.Archivo[0].files[0].name.toLowerCase();
		}else{
			var Archivo = false;
			Pasa = false;
		}


		if(Archivo){
			var Ext = Archivo.split('.').pop();
			var Extensiones = ExtensionesPermitidas();

			if(Extensiones.indexOf(Ext)<0){
				MmSgN({Destino:'#aqui',Mensaje:'Extensión inválida. Sólo imágenes',malo:1});
				Pasa = false;
			}
		}
		return Pasa;
	}//ValidaExtension

	var ExtensionesPermitidas = function(){
		var ExtPermintidas = [];
		var Imagenes = ['jpg','png','jpeg','gif','doc','docs','xlsx','xls','pptx', 'ppt','pdf','bmp'];
		ExtPermintidas = _.union(Imagenes);
		SalesUp.Variables.ExtPermintidas = SalesUp.Sistema.StrReplace(',','|',ExtPermintidas.toString());
		return ExtPermintidas;
	}//ExtensionesPermitidas

	var MmSgN = function(Op){
		var Destino   = Op.Destino;
		var Mensaje   = Op.Mensaje;
		var malo      = Op.malo
		var tipoColor = 'MsgInfo';

		if(malo==1){
			tipoColor = 'MsgMal';
		}

		var mostrarMs = '<span id="mensaje" class="BoxMsg '+tipoColor+'" style="display: none;">'+Mensaje+'</span>';
		$('#mensaje').remove();
		$(Destino).append(mostrarMs)
		$('#mensaje').toggle(500).delay(4500).toggle(500);
  	}//MmSgN

  	var cierraPopupCrearTicket = function(){
  		SalesUp.Sistema.MuestraEspera('#popup-contenedor', 0);
  
  		SalesUp.ticket.procesaTicket({estatus:1});
   		var cierreese = $('span .fa-times');
 
  		SalesUp.Construye.CierraPopUp({t:cierreese});
  		SalesUp.Construye.MuestraNotificacion({Mensaje:"Ticket creado"});
	}//cierraPopupCrearTicket

	var cierrePopUpComentarioTicket = function(){
		var elemento = (SalesUp.Variables.parametrosComentarioTicketNodelTodo.e) ? SalesUp.Variables.parametrosComentarioTicketNodelTodo.e : ''
		SalesUp.Variables.parametrosComentarioTicketNodelTodo = '';
		SalesUp.Variables.laCalificacion                      = '';
		SalesUp.Construye.MuestraNotificacion({Mensaje:"Su comentario ha sido enviado, su ejecutivo se pondra en contacto"});
		if(elemento!=""){
			SalesUp.ticket.CerrarTicketsVtana(elemento);
			SalesUp.Construye.CierraPopUp({t:$("#btnCancelarCierra")});
		}else{
			SalesUp.ticket.ticketDetalles({	TKT:SalesUp.Variables.Eltkt});
			SalesUp.Construye.CierraPopUp({t:$("#btnCancelarCierra")});
		}
		SalesUp.Notificaciones.NotificacionesTickesRespuestas();
	}//terminadoDetalle

}

if(window.tickets){
	SalesUp.ticket = new tickets();
}
