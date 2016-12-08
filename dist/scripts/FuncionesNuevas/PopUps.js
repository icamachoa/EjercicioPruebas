var PopUps = function(){
	self._Titulo, self._Pagina, self._Parametros, self._CallBack;
	self._Iframe, self._Modal, self._Alto, self._Ancho, self._LinkArmado;
	
	self._AbrePopUp = function(Op){
		self._PopUpsOpciones(Op);
		$('#MenuNuevo').hide();
		tb_show(self._Titulo, self._LinkArmado);
	}
	
	self._PopUpsOpciones = function(Op){
	  	  Op.Titulo === undefined ? self._Titulo = '' : self._Titulo = Op.Titulo;
	  	  Op.Pagina === undefined ? self._Pagina = '' : self._Pagina = Op.Pagina;
	  	  Op.Parametros === undefined ? self._Parametros = '' : self._Parametros = Op.Parametros;
	  	  Op.CallBack === undefined ? self._CallBack = '' : self._CallBack = '&TB_callback='+Op.CallBack;
	  	  Op.Iframe === undefined ? self._Iframe = '' : self._Iframe = '&TB_iframe='+Op.Iframe;
	  	  Op.Modal === undefined ? self._Modal = '' : self._Modal = '&modal='+Op.Modal;
	  	  Op.Alto === undefined ? self._Alto = '' : self._Alto = '&height='+Op.Alto;
	  	  Op.Ancho === undefined ? self._Ancho = '' : self._Ancho = '&width='+Op.Ancho;
	  	  self._LinkArmado = self._Pagina+SalesUp.Sistema.TiempoSolicitud()+self._Parametros+self._CallBack+self._Iframe+self._Modal+self._Alto+self._Ancho;
	}//_PopUpsOpciones

	this.ActivaOpcionMenuNuevo = function(Op){
		if(Op.Evento){ Op.Evento.preventDefault(); }
		var Nuevo = Op.Nuevo;
		(Nuevo == 'Prospecto') ? SalesUp.Ventana.NuevoProspecto() : '';
		(Nuevo == 'ProspectoAvanzado') ? SalesUp.Ventana.NuevoProspectoAvanzado() : '';
		(Nuevo == 'ProspectoAvanzadoLight') ? SalesUp.Ventana.NuevoProspectoAvanzadoLight() : '';
		(Nuevo == 'Cliente') ? SalesUp.Ventana.NuevoCliente() : '';
		(Nuevo == 'Mensaje') ? SalesUp.Ventana.NuevoMensaje() : '';
		(Nuevo == 'Recordatorio') ? SalesUp.Ventana.NuevoRecordatorio() : '';
		(Nuevo == 'Tarea') ? SalesUp.Ventana.NuevaTarea() : '';
		(Nuevo == 'Cita') ? SalesUp.Ventana.NuevaCita() : '';
		(Nuevo == 'Correo') ? SalesUp.Correo.nuevoCorreo() : '';
		(Nuevo == 'Empresa') ? SalesUp.empresas.nuevaEmpresa(0) : '';
	}

	this.NuevoProspecto = function(){
		SalesUp.Sistema.AbrePopUp({
			Titulo: 'Nuevo prospecto',
			Pagina: '/privado/PopUpNuevoProspecto.dbsp',
			CallBack:'GetData',
			Modal:true, ModalAlt : true, Alto:150, Ancho:500
		});
	}

	this.NuevoProspectoAvanzado = function(){
		SalesUp.Sistema.AbrePopUp({
			Titulo: 'Nuevo prospecto',
			Pagina: '/privado/PopUpNuevoProspecto.dbsp',
			Parametros:'avanzado=1',
			CallBack:'GetData',
			Modal:true, ModalAlt : true, Alto:150, Ancho:500
		});
	}
	this.NuevoProspectoAvanzadoLight = function(){
		SalesUp.Sistema.AbrePopUp({
			Titulo: 'Nuevo prospecto',
			Pagina: '/privado/PopUpNuevoProspectoLight.dbsp',
			Parametros:'avanzado=1',
			CallBack:'GetData',
			Modal:true, ModalAlt : true, Alto:150, Ancho:500
		});
	}
	this.NuevoCliente = function(){
		SalesUp.Sistema.AbrePopUp({
			Titulo: 'Nuevo cliente',
			Pagina: '/privado/PopUpNuevoProspecto.dbsp',
			Parametros:'avanzado=1&escliente=1',
			CallBack:'GetData',
			Modal:true, ModalAlt : true, Alto:150, Ancho:500
		});
	}

	this.NuevoMensaje = function(){
		SalesUp.Sistema.AbrePopUp({
			Titulo: 'Nuevo mensaje',
			Pagina: '/privado/popup_nuevo_mensaje.dbsp',
			CallBack:'SalesUp.Sistema.MensajeEnviado',
			Modal:true, ModalAlt : true, Alto:250, Ancho:450
		});
	}

	this.NuevoRecordatorio = function(){
		SalesUp.Sistema.AbrePopUp({
			Titulo: 'Nuevo recordatorio',
			Pagina: '/privado/PopUpNuevoRecordatorio.dbsp',
			CallBack:'ReloadData',
			Modal:true, ModalAlt : true, Alto:210, Ancho:650
		});
	}

	this.NuevaTarea = function(){
		SalesUp.Sistema.AbrePopUp({
			Titulo: 'Nueva tarea',
			Pagina: '/privado/PopUpNuevaTarea.dbsp',
			CallBack:'ReloadData',
			Modal:true, ModalAlt : true, Alto:210, Ancho:650
		});
	}

	this.EditaPermisos = function(Op){
		SalesUp.Sistema.AbrePopUp({
			Titulo: 'Permisos',
			Pagina: '/privado/PopUpPermisosUsuarios.dbsp',
			Parametros: 'accion=1&tku='+Op.tku+'&idmodulo='+Op.idmodulo,
			CallBack: 'ReloadData',
			Modal:true, ModalAlt : true, Alto:210, Ancho:650
		});
	}

	this.EditarTarea = function(Op){
		SalesUp.Sistema.AbrePopUp({
			Titulo: 'Editar tarea',
			Pagina: '/privado/PopUpEditarTarea.dbsp',
			Parametros: 'tktr='+Op.tktr,
			CallBack:'ReloadData',
			Modal:true, ModalAlt : true, Alto:150, Ancho:350
		});
	}

	this.NuevaCita = function(Op){
		SalesUp.Sistema.AbrePopUp({
			Titulo: 'Nueva cita',
			Pagina: '/privado/popup_nueva_cita.dbsp',
			CallBack:'ReloadData',
			Modal:true, ModalAlt : true, Alto:300, Ancho:800
		});
	}

	this.EditarCita = function(Op){
		(!Op) ? Op = {}:'';
		var idcita = '';
		(Op.Id) ? idcita = 'idcita='+Op.Id : '';
		SalesUp.Sistema.AbrePopUp({
			Titulo: 'Editar cita',
			Pagina: '/privado/popup_editar_cita.dbsp',
			Parametros: idcita,
			CallBack:'ReloadData',
			Modal:true, ModalAlt: true, Alto:350, Ancho:800
		});
	}

	this.NuevaTareaModal = function(Op){
		SalesUp.Construye.MuestraAlerta({
			TipoAlerta:'PopupModal', Id:'ModalTareas',
			Fuente: '/privado/ModalNuevaTarea.dbsp',
			Titulo:'<i class="fa fa-calendar"></i> Tarea nueva',
			Ancho:'650px'
		});
	}

	this.ModificarLogo = function(){
		SalesUp.Sistema.AbrePopUp({
			Titulo: 'Modificar Logo',
			Pagina: '/privado/popup_logo_nuevo.dbsp',
			CallBack:'GetData',
			Alto:100, Ancho:340
		});
	}

	this.SolicitudBaja = function(){
		SalesUp.Sistema.AbrePopUp({
			Titulo: 'Configura el texto de Solicitud de baja',
			Pagina: '/privado/popup_mensaje_correo.dbsp',
			CallBack:'GetData',
			Alto:270, Ancho:440
		});
	}

	this.MapaProspecto = function(Op){
		var idp = Op.idp;
		SalesUp.Sistema.AbrePopUp({
			Titulo: 'Dirección del contacto',
			Pagina: '/privado/popup_localizacion_prospecto.dbsp',
			Parametros:'idprospecto='+idp,
			CallBack:'GetDataP_Seguimiento',
			Alto:500, Ancho:710
		});
	}

	this.EnviarSms = function(Op){
		var idp = Op.idp, movil = Op.movil;
		SalesUp.Sistema.AbrePopUp({
			Titulo: 'Enviar SMS al número '+movil,
			Pagina: '/privado/popup_enviar_sms.dbsp',
			Parametros:'idprospecto='+idp+'&tel='+movil,
			Alto:180, Ancho:450
		});
	}

	this.EnviarCorreo = function(Op){
		var idp = ((Op.idp)?Op.idp:''), ido = ((Op.ido)?Op.ido:''), correo = (Op.correo ? Op.correo:'');
		
		SalesUp.Correo.nuevoCorreo({idp:idp, ido:ido});

		/*
		var tke = 'E-62B83098-11FC-4CD3-AA4A-E93DE1C72D6B';
		var stke= localStorage.SysTke;
		if (stke==tke){
			
		}else{
			SalesUp.Sistema.AbrePopUp({
				Titulo: 'Redactar correo ['+correo+']',
				Pagina: '/privado/popup_compose_mail.dbsp',
				Parametros:'idprostr='+idp+'&idoportunidad='+ido,
				CallBack:'ReloadData',
				Alto:565, Ancho:750
			});
		}
		*/
	}

	this.ConfigurarCorreo = function(Op){
		/*var idp = Op.idp, correo = (Op.correo ? Op.correo:'');
		SalesUp.Sistema.AbrePopUp({
			Titulo: 'Configurar correo',
			Pagina: '/privado/popup_config_mail.dbsp',
			Parametros:'idprospecto='+idp+'&email='+correo+'&screenconfig=0',
			CallBack:'ReloadData',
			Alto:565, Ancho:750
		});
		*/

		var entrada = 0;
		
		if(Op){
			entrada = Op.entrada;
		}
	    
	    SalesUp.Construye.MuestraPopUp({
	      alto:'150px', ancho:'600px',
	      titulo:'Agregar cuenta',
	      fuente:'/privado/popup-agregar-cuenta.dbsp?entrada='+entrada, callback:''
	    });
	}

	this.AgregarCuenta = function(obj){
		var entrada 			= 0;
		var idusuariocorreo 	= 0;
		
		if(obj){
			if(obj.entrada){
				entrada = obj.entrada;
			}
			if(obj.idusuariocorreo){
				idusuariocorreo = obj.idusuariocorreo;
			}
		}
	    
	    SalesUp.Construye.MuestraPopUp({
	      alto:'150px', ancho:'600px',
	      titulo:'Agregar cuenta',
	      fuente:'/privado/popup-agregar-cuenta.dbsp?entrada='+entrada+'&idusuariocorreo='+idusuariocorreo, callback:''
	    });
	}

}

PopUps.prototype.AbrePopUp = function(Op){ return self._AbrePopUp(Op); };


