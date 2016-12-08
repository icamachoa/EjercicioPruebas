var Buscador = function(){
	var Cargando = '<div class="w100"> Cargando... <i class="fa fa-spinner fa-spin fa-lg"></i> </div>';
	var CargandoDetalle = '<div class="w100" id="CargandoDetalle"> Cargando... <br><i class="fa fa-spinner fa-spin fa-2x"></i> </div>';
	var NoPuedesVer = '<div class="w100" id="CargandoDetalle"> No puedes ver información de este contacto <br><i class="fa fa-lock fa-4x"></i> </div><div class="clear"></div>';	

	this.ActivaBuscar = function(){
		
		SalesUp.Buscar.CerrarBuscar();

		var templateBuscar = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateInputBuscar.dbsp', Almacen:'TemplateInputBuscar'});

		var n = _.size($('#BoxBuscador'));
		if(n==0){
			$('body').prepend(templateBuscar);
			setTimeout(function(){$('#InputBuscar').focus();}, 300);
			$('#CerrarBuscar').hide();
			$('#timesBuscando').show();			
		}
	}/*ActivaBuscar*/
	
	this.clickIniciarBusqueda = function(Op){
		var $t = document.getElementById('InputBuscar');
		var valor = $('#InputBuscar').val();
		SalesUp.Buscar.IniciarBusqueda({t:$t, v:valor, e:Op.e });
	}

	this.IniciarBusqueda = function(Op){
		var $this = Op.t;
		var Buscar = Op.v;
		var Pasa = false;
		var Key = 0;
		var Click = (Op.e.type == 'click') ? true : false;

		clearTimeout($.data($this, 'Espera'));

		$('#timesBuscando, #botonBuscar').show();
		$('#timesBuscando, #InputBuscar').addClass('ConBotonBuscar');
		$('#SinResultados').hide();
		
		if(Op.e.type ==	"keyup"){ Key = SalesUp.Sistema.NumKeyCode(Op.e); }
		
		if(Key==27){ SalesUp.Buscar.CerrarBuscar(); return false;}
		if(!_.size(Buscar)){ $('#timesBuscando').show(); SalesUp.Buscar.LimpiarBusqueda(); return false; }
		SalesUp.Variables.Pasa = true;
		jwerty.key('cmd+a', function(){ SalesUp.Variables.Pasa = false; });
		jwerty.key('ctrl+a', function(){ SalesUp.Variables.Pasa = false; });
		if(!SalesUp.Variables.Pasa){return false;}

		if( (Key==16)||(Key==37)||(Key==38)||(Key==39)||(Key==40)||(Key==16)||(Key==17)||(Key==18)||(Key==19)||(Key==224) ){return false;}
		
		if(_.size(Buscar)<=2){return false;}
		
		$('#CerrarBuscar').hide();

		var Espera = setTimeout(function(){ SalesUp.Buscar.Buscando(Buscar); }, 5000);
		$($this).data('Espera', Espera);

		if( (Key==13)||(Click) ){ clearTimeout($.data($this, 'Espera')); SalesUp.Buscar.Buscando(Buscar); }

	}/*this.IniciarBusqueda*/

	this.Buscando = function(v){
		var Buscar = $.trim(escape(v));
		$('#BuscandoInfo, #BoxResultadosBusqueda, #EsperaBuscando').show();
		$('#timesBuscando, #botonBuscar').hide();
		$('#InfoEncontrada').html('');
		$('#BoxResultadosBusqueda').css('height', '50px');
		$('#timesBuscando, #InputBuscar').removeClass('ConBotonBuscar');

		setTimeout(function() {
			var templateLista = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateBuscarListaResultados.dbsp', Almacen:'TemplateBuscarListaResultados'});
			var json 		  = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonListaResultadosBusqueda.dbsp', Parametros:'p=1&b='+Buscar, DataType:'json'});
			var registrosBase = {"Prospectos":"0","Oportunidades":"0","Clientes":"0","Ventas":"0","Companias":"0","ProspectosDescartados":"0","OportunidadesDescartadas":"0","Total":"0"};
			var Registros 	  = (json.Registros) ? json.Registros[0] : registrosBase;
			var json 		  = _.reject(json.jsonDatos , function(j){ return _.size(j) == 0; });
			var Datos = {};
			var Descartados = '', TotalRegistros = 0;
			var jsonContactos = _.where(json, {Campo1:4});
			
			Datos.jsonProspectos 	= _.where(jsonContactos, {Campo5:'0'});
			Datos.jsonOportunidades = _.where(json, {Campo1:15});
			Datos.jsonClientes 		= _.where(jsonContactos, {Campo5:'1'});
			Datos.jsonVentas 		= _.where(json, {Campo1:16}); 
			Datos.jsonCompanias		= _.where(json, {Campo1:25}); 

			(parseInt(Registros.ProspectosDescartados)>0) ? Descartados = '1' : '';
			(parseInt(Registros.OportunidadesDescartadas)>0) ? Descartados = '1' : '';

			Datos.Descartados = Descartados;
			
			Datos.nProspectos 	= (Registros.Prospectos!='0') ? parseInt(Registros.Prospectos) : 0;
			Datos.nOportunidades= (Registros.Oportunidades!='0') ? parseInt(Registros.Oportunidades) : 0;
			Datos.nClientes 	= (Registros.Clientes!='0') ? parseInt(Registros.Clientes) : 0 ;
			Datos.nVentas 		= (Registros.Ventas!='0') ? parseInt(Registros.Ventas) : 0;
			Datos.nCompanias	= (Registros.Companias!='0') ? parseInt(Registros.Companias) : 0;
			
			TotalRegistros = Datos.nProspectos + Datos.nOportunidades + Datos.nClientes + Datos.nVentas + Datos.nCompanias;
			Datos.ActivaFantasma = (TotalRegistros==0) ? true:false;
			Datos.ActivaFantasmaProspectos = (Datos.nProspectos>0) ? false : true;
			Datos.ActivaFantasmaOportunidades = (Datos.nOportunidades>0) ? false : true;

			Datos.nProspectosDescartados 	= (parseInt(Registros.ProspectosDescartados)>0) ?  parseInt(Registros.ProspectosDescartados) : '';
			Datos.nOportunidadesDescartadas = (parseInt(Registros.OportunidadesDescartadas)>0) ? parseInt(Registros.OportunidadesDescartadas) : '';
			
			Datos.MasProspectos 	   = (Datos.nProspectos>5) ? '1' : '';
			Datos.CuantosMasProspectos = (Datos.nProspectos>5) ? Datos.nProspectos-5 : '';
			
			Datos.MasOportunidades 		  = (Datos.nOportunidades>5) ? '1' : '';
			Datos.CuantosMasOportunidades = (Datos.nOportunidades>5) ? Datos.nOportunidades-5 : '';
			
			Datos.MasClientes 		 = (Datos.nClientes>5) ? '1' : '';
			Datos.CuantosMasClientes = (Datos.nClientes>5) ? Datos.nClientes-5 : '';

			Datos.MasVentas 	   = (Datos.nVentas>5) ? '1' : '';
			Datos.CuantosMasVentas = (Datos.nVentas>5) ? Datos.nVentas-5 : '';

			Datos.MasCompanias 	   = (Datos.nCompanias>5) ? '1' : '';
			Datos.CuantosMasCompanias = (Datos.nCompanias>5) ? Datos.nCompanias-5 : '';

			var Html = SalesUp.Construye.ReemplazaDatos({Template:templateLista , Datos:Datos});
			
			if(parseInt(Registros.Total)>0){
				$('#BoxResultadosBusqueda').css('height', '400px');
				$('#InfoEncontrada, #timesBuscando').fadeIn();
			}else{
				Html = ''; $('#SinResultados, #timesBuscando').show();
				(Datos.Descartados=='') ? $('#LtResultadosBusqueda').css('height','50px'):'';
				$('#BoxResultadosBusqueda').css('height', '50px');
			}
			
			$('#BuscandoInfo, #EsperaBuscando').hide();
			setTimeout(function(){
				$('#InfoEncontrada').html(Html);
				(_.size(Datos.Descartados)==0) ? $('#LtResultadosBusqueda').css('height','400px') : '';
				$('#LtResultadosBusqueda').scrollTop(0);
				SalesUp.Sistema.IniciaPlugins();
			}, 500);
			
		}, 450);	
		
	}/*this.Buscando*/

	this.VerMasCoincidencias = function(Op){
		var $Elemento = $(Op.e);
		$Elemento.html(Cargando);
		var Tipo = '', Per = '', Des = '', Buscar = '', Pagina = '', masDe = '';
		var Total = 0, Restan = 0, start, Descartado = 0, EsDescartado = '', attrDescartado = '';

		Pagina = Op.p;
		start = Op.s;
		masDe = Op.masDe;
		Total = Op.T;
		Restan = Op.R - 20;
		(Op.Descartado) ? Descartado = 1 : '';
		(Descartado) ? EsDescartado = 'LiDescartado' : '';
		(Descartado) ? attrDescartado = 'data-Descartados="1"' : '';

		if(masDe==1){ Tipo = 4;  Per = 1; Des = Descartado;}
		if(masDe==2){ Tipo = 15; Per = 2; Des = Descartado;}
		if(masDe==3){ Tipo = 4;  Per = 4; Des = Descartado;}
		if(masDe==4){ Tipo = 16; Per = 3; Des = Descartado;}
		if(masDe==5){ Tipo = 25; Per = 1; Des = Descartado;}

		Buscar = $.trim(escape($('#InputBuscar').val()));
		
		var datosParametros = 'ti='+Tipo+'&per='+Per+'&des='+Des+'&b='+Buscar+'&p='+Pagina+'&s='+start;
		var templateLista = '';
		templateLista += '{{#each jsonDatos}}';
		templateLista += '<li class="'+EsDescartado+'" '+attrDescartado+' data-tipo="{{Campo1}}" data-tk="{{Campo2}}" onclick="SalesUp.Buscar.VerDetalleBusqueda({e:this, Tipo:\'{{Campo1}}\', tk:\'{{Campo2}}\' });">';
		templateLista += '	<span class="w60 Ellipsis"><i class="fa '+((Per==2) ? ((Descartado==1) ? 'fa-trash':'fa-star' ) :'fa-money' )+'"></i> {{Campo3}}</span>';
		templateLista += '	<span class="w30 Ellipsis"><span class="FormatToMoney">{{Campo5}}</span></span>';
		templateLista += '	<span class="w10 Ellipsis tCen Italic"><span class="Tip7" tip="{{Campo7}}">[{{Campo8}}]</span></span>';
		templateLista += '	<span class="w100 Ellipsis"><i class="fa fa-angle-right"></i> {{Campo6}}</span> ';
		templateLista += '	<span class="iverFicha fOpor"><i class="fa fa-lg fa-caret-right"></i></span> ';
		templateLista += '	<div class="clear"></div>';
		templateLista += '</li>';
		templateLista += '{{/each}}';

		if(Tipo==4){
			templateLista = '';
			templateLista += '{{#each jsonDatos}}';
			templateLista += '<li class="'+EsDescartado+'" '+attrDescartado+' data-tipo="{{Campo1}}" data-tk="{{Campo2}}" data-esCliente="{{Campo5}}" onclick="SalesUp.Buscar.VerDetalleBusqueda({e:this, Tipo:\'{{Campo1}}\', tk:\'{{Campo2}}\' });">';
			templateLista += '	<span class="{{#if Campo4}}w60{{else}}w90{{/if}} Ellipsis"><i class="fa '+((Per==1) ? ((Descartado==1) ? 'fa-trash':'fa-user' ):'fa-smile-o' )+'"></i> {{Campo3}}</span>';
			templateLista += '	{{#if Campo4}}<span class="w30 Ellipsis"><i class="fa fa-building-o"></i> {{Campo4}}</span> {{/if}}';
			templateLista += '	<span class="w10 Ellipsis tCen Italic"><span class="Tip7" tip="{{Campo7}}">[{{Campo8}}]</span></span>';
			templateLista += '	<span class="iverFicha"><i class="fa fa-lg fa-caret-right"></i></span>';
			templateLista += '	<div class="clear"></div>';
			templateLista += '</li>';
			templateLista += '{{/each}}';
		}

		if(Tipo==25){
			templateLista = '';
			templateLista += '{{#each jsonDatos}}';
			templateLista += '<li data-tipo="{{Campo1}}" data-tk="{{Campo2}}" onclick="SalesUp.Buscar.VerDetalleBusqueda({e:this, Tipo:\'{{Campo1}}\', tk:\'{{Campo2}}\' });">';
			templateLista += '	<span class="w70 Ellipsis"><i class="fa fa-building-o"></i> {{Campo3}}</span>';
			templateLista += '	<span class="w30 Ellipsis"><i class="fa fa-phone-square"></i> {{Campo7}} </span>';
			templateLista += '	<span class="w100 Ellipsis Italic"><i class="fa fa-angle-right"></i> {{Campo6}}</span> ';
			templateLista += '	<span class="iverFicha"><i class="fa fa-lg fa-caret-right"></i></span>';
			templateLista += '	<div class="clear"></div>';
			templateLista += '</li>';
			templateLista += '{{/each}}';
		}


		var templateVerMas = '';
		templateVerMas += '<li class="VerMasResultados" onclick="SalesUp.Buscar.VerMasCoincidencias({e:this, masDe:'+masDe+', p:'+(Pagina+1)+', s:'+(start+20)+', T:\''+Total+'\', R:\''+Restan+'\' });" >';
		templateVerMas += '	<div class="w50">'+Restan+' coincidencias </div>';
		templateVerMas += '	<div class="w50">ver más <i class="fa fa-caret-down"></i></div>';
		templateVerMas += '</li>';

		var templateVerMasDescartados = '';
		templateVerMasDescartados += '<div class="w50" onclick="SalesUp.Buscar.VerMasCoincidencias({e:this, masDe:'+masDe+', p:'+(Pagina+1)+', s:'+(start+20)+', Descartado:1, T:\''+Total+'\', R:\''+Restan+'\' });">';
		templateVerMasDescartados += '	<div class="w100 Ellipsis"><i class="fa fa-trash"></i> '+Restan+' '+((masDe==1) ? 'contactos descartados':'oportunidades descartadas' )+' </div>';
		templateVerMasDescartados += '	<span class="btn btn-default">Mostrar</span>';
		templateVerMasDescartados += '</div>';

		(Descartado) ? templateVerMas = '' : templateVerMasDescartados = '';
		if(Restan<=0){templateVerMas = ''; templateVerMasDescartados = '';}
		
		setTimeout(function() {
			var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonListaResultadosVerMasBusqueda.dbsp', Parametros:datosParametros, DataType:'json'});

			var Html = SalesUp.Construye.ReemplazaDatos({Template:templateLista, Datos:json})+templateVerMas;
			
			if(Descartado==0){
				$Elemento.after(Html);
				$Elemento.remove();
			}else{
				
				if(masDe==1){$('#DesPros').show();}
				if(masDe==2){$('#DesOpor').show();}

				$Elemento.after(templateVerMasDescartados);
				$Elemento.remove();

				$Elemento = $('li[data-esCliente="0"][data-Descartados="1"]').last();
				(Per==2) ? $Elemento = $('li[data-tipo="15"][data-Descartados="1"]').last():''
				$Elemento.after(Html);
				
				$('#LtResultadosBusqueda').scrollTop(0);
				var $BoxDescartadosDivs = $('#BoxDescartados > div');
				var nDescartados = _.size($BoxDescartadosDivs);
				
				if(nDescartados == 0 ){ $('#BoxDescartados').hide(); $('#LtResultadosBusqueda').css('height','400px'); }
				if(nDescartados == 1 ){ $($BoxDescartadosDivs[0]).addClass('w100');	}
				
				var top = $Elemento.next().position().top;
				$('#LtResultadosBusqueda').scrollTop(top);
				
			}
		}, 100);
			
	}/*this.VerMasCoincidencias*/

	this.VerDetalleBusqueda = function(Op){
		$('#LtResultadosBusqueda li').removeClass('liSeleccionado');
		$('.popover').remove();
		var Buscar = $.trim(escape($('#InputBuscar').val()));
		var $Elemento = $(Op.e);
		var Tipo = (Op.Tipo)?Op.Tipo:'';
		var tk = (Op.tk)?Op.tk:'';
		(Tipo=='undefined') ? Tipo = '':'';
		(tk=='undefined') ? tk = '':'';
		var Datos = {};
		var $BoxDetalle = $('#BoxDetalleBusqueda');
		var EsCliente = $Elemento.attr('data-escliente');
		var Descartado = $Elemento.attr('data-descartados');
		var EsDescartado = (Descartado=='1') ? true : false;
		$Elemento.addClass('liSeleccionado');
		
		(!EsCliente) ? EsCliente = '0' : '1';

		$BoxDetalle.html(CargandoDetalle);
		$('#BoxListaResultados').removeClass('w100').addClass('w35');
		
		Datos.tk = tk;
		Datos.Tipo = Tipo;
		Datos.Reasignar = true;
		Datos.EsProspecto = true;
		Datos.EsOportunidad = false;
		Datos.EsVenta = false;
		Datos.MostrarFase = true;
		Datos.EsDescartado = EsDescartado;
		(Tipo == 4) ? (Datos.EsCliente = (EsCliente=='1') ? true : false) : '';
		if((Tipo == 15)||(Tipo == 16)){
			Datos.EsProspecto = false;
			Datos.EsOportunidad = true;
		}
		(Tipo == 16) ? Datos.EsVenta = true:'';
		(Datos.EsVenta) ? Datos.Reasignar = false: '';
		(Datos.EsVenta) ? Datos.MostrarFase = false: '';

		/*OJO ---> */ Datos.Reasignar = false;

		Datos.NoMostrar = ((Datos.EsOportunidad)&&(Datos.EsVenta)) ? false : true;

		setTimeout(function(){
			
			var templateDetalleBusqueda = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateDetalleBusqueda.dbsp', Almacen:'TemplateDetalleBusqueda'});
			
			var procesaInformacionAdicional = function(json, err){
				if (err){
					$BoxDetalle.find('#CargandoDetalle').html('<i class="fa fa-lg fa-frown-o"></i> <br/> No se cargó la información correctamente<br/><span class="Btn Btn-tiny Btn-tiny-min btnNeutral Btn-rounded Btn-flat-Aceptar Pointer" onclick="$(\'.liSeleccionado\').click();"><i class="fa fa-refresh"></i> Recargar </span>');
					return;
				}
				
				var jsonInformacionAdicional = json.jsonInformacionAdicional[0];
				
				Datos.Informacion = json.jsonDatos[0];
				Datos.Informacion.VerSeguimientos = (Datos.Informacion.VerSeguimientos=='1') ? true : false;
				Datos.Informacion.VerInfoContacto = (Datos.Informacion.VerInfoContacto=='1') ? true : false;
				Datos.Informacion.VerEtiquetas = (Datos.Informacion.VerEtiquetas=='1') ? true : false;
				Datos.Informacion.Compartido = (Datos.Informacion.Compartido!='1') ? true : false;

				for (var i = 0; i <= json.Comentarios.length - 1; i++){
					var Icono = '';
					
					switch (json.Comentarios[i].Campo6) {
						case '0': Icono = ''; break;
						case '1': Icono = 'fa-envelope'; break;
						case '2': Icono = 'fa-envelope'; break;
						case '3': Icono = 'fa-weixin'; break;
						case '4': Icono = 'fa-weixin'; break;
						case '5': Icono = 'fa-weixin'; break;
						case '6': Icono = 'fa-calendar'; break;
						case '7': Icono = 'fa-share-square'; break;
						case '8': Icono = 'fa-phone'; break;
						case '9': Icono = 'fa-map-marker'; break;
						case '10': Icono = 'fa-bell'; break;
						case '11': Icono = ''; break;
						case '12': Icono = 'fa-check-square'; break;
					}
					json.Comentarios[i].Icono = Icono;
				};

				Datos.Comentarios = json.Comentarios;
				
				if (Datos.Tipo == 25){
					templateDetalleBusqueda = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateDetalleBusquedaEmpresa.dbsp', Almacen:'TemplateDetalleBusquedaEmpresa'});	
				}
				
				var Html = SalesUp.Construye.ReemplazaDatos({Template:templateDetalleBusqueda, Datos:Datos});

				$BoxDetalle.html(Html);
				$('#FichaInformativa').scrollTop(0);
				$('#EtiquetasContacto li a').attr('href','#');
							
				var jsonCamposEmpresa = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCamposEmpresa.dbsp', Almacen:'jsonCamposEmpresa', DataType:'json'}).jsonDatos;

				var Encontrados = '';

				_.each(jsonInformacionAdicional, function(value, key){
					var v = $.trim(value.toLowerCase());
					var b = $.trim(Buscar.toLowerCase());
					if( v.indexOf(b)!=-1 ){
						var jsonCampo = _.where(jsonCamposEmpresa,{Nombre:key});
						if(_.size(jsonCampo)){Encontrados += '<div class="w50 Ellipsis"><b class="Tip1" tip="'+jsonCampo[0].Tip+'">'+jsonCampo[0].Campo+':</b> <i class="BuscarHighLight">'+value+'</i></div>';}
					}
				});

				if((Encontrados)&&(Datos.Informacion.VerInfoContacto)){
					Encontrados = '<div class="clear"></div><div class="w90 LineaDivisor"></div><div class="clear"></div><div id="InformacionAdicional" class="w100">'+Encontrados+'</div>';
					$('#InformacionEspecifica').after(Encontrados);
				}
				
				(Buscar) ? SalesUp.Buscar.highlight({Texto:Buscar, Donde:'#FichaInformativa'}) : '';

				$('#InformacionEspecifica #EsCompartido').attr('onclick','SalesUp.Construye.VerLtCompartidos({tkp:\''+tk+'\', Elem:this});');
				$('#FichaInformativa #CerrarDetalleBusqueda').attr('onclick','SalesUp.Buscar.OcultarDetalle();');
				
				SalesUp.Sistema.IniciaPlugins();

				var path = document.location.pathname;
				path = SalesUp.Sistema.StrReplace('/privado/','',path);
				
				if (path=='PopUpNuevoProspecto.dbsp'){
					$('#BoxDetalleBusqueda #BoxAccionesDetalle').hide();
				}
			}

			SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonDetalleBusqueda.dbsp', parametros:'tk='+tk+'&t='+Tipo+'&c='+EsCliente, callback:procesaInformacionAdicional});
			
		}, 450);


	}/*this.VerDetalleBusqueda*/
	this.OcultarDetalle = function(){ $('.tipsy').remove();
		$('#BoxListaResultados').addClass('w100').removeClass('w35');
		setTimeout(function(){
			$('#BoxDetalleBusqueda').html(CargandoDetalle);
		}, 500);
	}

	this.VerInformacion = function(Op){
		var $Elemento = $(Op.t);
		/*var tk = Op.tk;*/
		var tipo = Op.Tipo;
		var esCliente = Op.EsCliente;
		var visualizar;
		(tipo=='4') ? (visualizar = (esCliente=='true') ? 3 : 1 ) : '';
		(tipo=='15') ? visualizar = 2 : '';
		(tipo=='16') ? visualizar = 4 : '';

		/*var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonObtenerids.dbsp', Parametros:'t='+visualizar+'&tk='+tk, DataType:'json'}).jsonDatos;
		json = json[0];*/
		var ira = '';
		
		(visualizar==1) ? ira = '/privado/prospectos-visualizar.dbsp?tkp='+Op.tkp : '';
		(visualizar==2) ? ira = '/privado/oportunidades-visualizar.dbsp?tko='+Op.tko : '';
		(visualizar==3) ? ira = '/privado/clientes-visualizar.dbsp?tkp='+Op.tkp : '';
		(visualizar==4) ? ira = '/privado/ventas-visualizar.dbsp?tko='+Op.tko+'&tkv='+Op.tkv : '';
		$Elemento.attr('href', ira);
		return true;
	}/*VerInformacion*/

	this.AgregarSeguimiento = function(Op){
		
		var $Elemento = $(Op.e);
		$Elemento.popover('destroy');
		
		var PopOverId = 'PopOver'+SalesUp.Construye.IdUnico();
		var TemplatePopover = '<div style="max-width:300px;width:300px;" class="popover" id="'+PopOverId+'" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>';
		var HtmlAgregarSeguimiento = '';
		HtmlAgregarSeguimiento += '<div id="BoxComentar" class="w100">';
		HtmlAgregarSeguimiento += '	<textarea id="TextComentario" class="w100 TextArea" style="border:1px solid #ddd;border-radius:3px;padding:5px;"></textarea>';
		HtmlAgregarSeguimiento += ' <div class="clear"></div>';
		HtmlAgregarSeguimiento += '	<span class="btn Acciones btn-default FondoLabela80" onclick="SalesUp.Buscar.GuardarComentarioBuscar({e:this, tk:\''+Op.tk+'\', Tipo:\''+Op.Tipo+'\' , esCliente:\''+Op.EsCliente+'\' });"> <i class="fa fa-check"></i> Aceptar</span>';
		HtmlAgregarSeguimiento += '	<span class="btn Acciones btn-default FondoLabela80" onclick="$(\'.popover\').remove();"> <i class="fa fa-times"></i> Cancelar</span>';
		HtmlAgregarSeguimiento += '</div><div class="clear"></div>';
		
		$Elemento.popover({
			template:TemplatePopover, placement:'top', html:true, container:'body',
			title:'Seguimiento', content:HtmlAgregarSeguimiento
		});

		$Elemento.popover('show');
		setTimeout(function(){ $('#TextComentario').focus(); }, 300);
	}/*AgregarSeguimiento*/	

	this.GuardarComentarioBuscar = function(Op){
		var Comentario = escape($('#TextComentario').val());
		
		if(!Comentario){
			var $TextComentario = $('#TextComentario');
			SalesUp.Valida.MarcarObligatorio($TextComentario);
			$TextComentario.focus();
			return false;
		}

		var $Elemento = $(Op.e);
		$Elemento.append(' <i class="fa fa-spin fa-spinner"></i>').find('.fa-check').remove();
		
		var tk = Op.tk;
		var t = Op.Tipo;
		var esCliente = Op.EsCliente;
		var tipo;
		

		(t=='4')  ? (tipo = (esCliente=='true') ? 3 : 1 ) : '';
		(t=='15') ? tipo = 2 : '';
		(t=='16') ? tipo = 4 : '';

		var datosParametros = 'tk='+tk+'&c='+Comentario+'&t='+tipo+'&pet='+SalesUp.Construye.IdUnico();
		
		setTimeout(function(){
			SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryGuardarComentarioBuscar.dbsp', Parametros:datosParametros });
			SalesUp.Buscar.RecargarActual();
		}, 100);

	}/*GuardarComentarioBuscar*/

	this.LimpiarBusqueda = function(){
		$('#InputBuscar').val('').focus();
		$('#BoxResultadosBusqueda').css('height', '50px').hide();
		$('#InfoEncontrada, #SinResultados, #botonBuscar').hide();
		$('#timesBuscando, #InputBuscar').removeClass('ConBotonBuscar');
		$('#EsperaBuscando').show();
	}/*this.LimpiarBusqueda*/

	this.CerrarBuscar = function(){ $('#BoxBuscador, #CssBoxBuscador, .SombraOverlay, .tipsy, .popover').remove(); }

	this.BuscarSugeridos = function(Op){
		
		var $Elemento = $(Op.Elemento);
		var BuscandoCoincidencias = '<span class="BuscandoCoincidencias Italic">Validando <i class="fa fa-lg fa-spinner fa-spin"></i></span>';
		var noCuenta;
		var Pasa = true;
		noCuenta = ( ($Elemento.hasClass('selectize-control') ) || ( $Elemento.hasClass('selectize-dropdown') ) );
		
		if(!noCuenta){
			var Valor = Op.Valor;
			
			if(!_.isEmpty(Valor)){
				var $Padre = $Elemento.closest('.BoxInfo');
				
				var IdCampo = $Elemento.attr('data-idc');
				var IdProspecto = $('#IdProspecto').val();
				var tkp = $('#tkp').val();
				var Campo = $Elemento.prev().html();
				
				if(IdCampo=='-2'){Valor = $('#Nombre').val()+'|'+Valor;}

				var Post = {v:Valor, idc:IdCampo, idp: IdProspecto, tkp:tkp };
				var txtDescartado = '';
				$Padre.append(BuscandoCoincidencias);
				
					var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonValidaSugerido.dbsp', Parametros:Post, DataType:'json'}).jsonDatos;
					json = _.reject(json , function(j){ return _.size(j) == 0; });
					$('#BtnSugerencias').remove();
					var nCoincidencias = _.size(json);
					if( nCoincidencias > 0 ){
						Pasa = true;
						
						var idsp='';
						for (var i = 0; i <= json.length - 1; i++){ 
							idsp += json[i].IdP+','; 
						};

						idsp = idsp.substr(0,_.size(idsp)-1);

						$Elemento.attr('data-coincidencias', nCoincidencias).attr('data-tks',idsp);

						var arrDataCoincidencia = $('[data-coincidencias]');
						var numCoincidencias = 0;
						for (var i = 0; i <= arrDataCoincidencia.length - 1; i++){
							numCoincidencias += parseInt($(arrDataCoincidencia[i]).attr('data-coincidencias'));
						};

						var btn = '<button onclick="SalesUp.Buscar.VerSugerencias();" class="Btn Btn-rounded Btn-tiny Btn-flat-Aceptar Pulse" id="BtnSugerencias" type="button" style="float:left;padding:0px 10px 0px 20px;"><span class="BoxSizing NumCoincidencias">'+numCoincidencias+'</span> Registros repetidos <i class="fa fa-copy"></i></button>';
						$('.BoxBotonesAccion').prepend(btn);
						
						SalesUp.Valida.MarcarSugerido($Elemento);
						$Padre.find('.BuscandoCoincidencias').remove();
						return Pasa;
					}else{
						$Padre.find('.BuscandoCoincidencias').remove();
						return Pasa; 
					}
				
			}else{ return Pasa; }
		}else{ return Pasa; }
	}/*BuscarSugeridos*/
	this.BuscarSugeridosOportunidad = function(Op){
		
		var $Elemento = $(Op.Elemento);
		var BuscandoCoincidencias = '<span class="BuscandoCoincidencias Italic">Validando <i class="fa fa-lg fa-spinner fa-spin"></i></span>';
		var noCuenta;
		var Pasa = true;
		noCuenta = ( ($Elemento.hasClass('selectize-control') ) || ( $Elemento.hasClass('selectize-dropdown') ) );
		
		if(!noCuenta){
			var Valor = Op.Valor;
			
			if(!_.isEmpty(Valor)){
				var $Padre = $Elemento.closest('.BoxInfo');
				
				var IdCampo = $Elemento.attr('data-idc');
				var IdProspecto = $('#IdProspecto').val();
				var Campo = $Elemento.prev().html();
				
				if(IdCampo=='-2'){Valor = $('#Nombre').val()+'|'+Valor;}

				var Post = {v:Valor, idc:IdCampo, idp: IdProspecto };
				var txtDescartado = '';
				$Padre.append(BuscandoCoincidencias);
		
					var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonValidaSugeridoOportunidad.dbsp', Parametros:Post, DataType:'json'}).jsonDatos;
			

					json = _.reject(json , function(j){ return _.size(j) == 0; });
					$('#BtnSugerencias').remove();
					var nCoincidencias = _.size(json);
					if( nCoincidencias > 0 ){
						Pasa = true;
						
						var idsp='';
						for (var i = 0; i <= json.length - 1; i++){ 
							idsp += json[i].IdO+','; 
						};

						idsp = idsp.substr(0,_.size(idsp)-1);

						$Elemento.attr('data-coincidencias', nCoincidencias).attr('data-tks',idsp);

						var arrDataCoincidencia = $('[data-coincidencias]');
						var numCoincidencias = 0;
						for (var i = 0; i <= arrDataCoincidencia.length - 1; i++){
							numCoincidencias += parseInt($(arrDataCoincidencia[i]).attr('data-coincidencias'));
						};

						var btn = '<button onclick="SalesUp.Buscar.VerSugerenciasOportunidades();" class="Btn Btn-rounded Btn-tiny Btn-flat-Aceptar Pulse" id="BtnSugerencias" type="button" style="float:left;padding:0px 10px 0px 20px;"><span class="BoxSizing NumCoincidencias">'+numCoincidencias+'</span> Registros repetidos <i class="fa fa-copy"></i></button>';
						$('.BoxBotonesAccion').prepend(btn);
						
						SalesUp.Valida.MarcarSugerido($Elemento);
						$Padre.find('.BuscandoCoincidencias').remove();
						return Pasa;
					}else{
						$Padre.find('.BuscandoCoincidencias').remove();
						return Pasa; 
					}
				
			}else{ return Pasa; }
		}else{ return Pasa; }
	}/*BuscarSugeridosOportunidades*/

	this.VerSugerencias = function(){
		var arrDataCoincidencia = $('[data-coincidencias]');
		var tksCoincidencias = '';
		var Datos = [];
		for (var i = 0; i <= arrDataCoincidencia.length - 1; i++){
			var arr = {};
			var $Input = $(arrDataCoincidencia[i]);
			var Campo = $Input.prev().text();
			var Valor = $Input.val();
			(Campo) ? Campo = Campo+': '+Valor : Campo = Valor;
			arr.idsp = $Input.attr('data-tks');
			arr.Coincidencias = $Input.attr('data-coincidencias');
			arr.Campo = Campo;
			Datos.push(arr);
		};
		
		SalesUp.Buscar.BuscandoSugerencias({Datos:Datos});
		
	}/*VerSugerencias*/
	this.VerSugerenciasOportunidades = function(){
		var arrDataCoincidencia = $('[data-coincidencias]');
		var tksCoincidencias = '';
		var Datos = [];
		for (var i = 0; i <= arrDataCoincidencia.length - 1; i++){
			var arr = {};
			var $Input = $(arrDataCoincidencia[i]);
			var Campo = $Input.prev().text();
			var Valor = $Input.val();
			(Campo) ? Campo = Campo+': '+Valor : Campo = Valor;
			arr.idsp = $Input.attr('data-tks');
			arr.Coincidencias = $Input.attr('data-coincidencias');
			arr.Campo = Campo;
			Datos.push(arr);
		};
		
		SalesUp.Buscar.BuscandoSugerenciasOportunidades({Datos:Datos});
		
	}/*VerSugerenciasOportunidades*/

	this.BuscandoSugerencias = function(Op){

		SalesUp.Buscar.ActivaBuscar();
		$BoxBuscador = $('#BoxBuscador');
		$BoxBuscador.find('#BoxInputBuscador').remove();
		$BoxBuscador.find('#BoxResultadosBusqueda').addClass('ContSugerencias');
		$BoxBuscador.addClass('ContSugerencias').find('#ContBusq').addClass('ContSugerencias');
		$('#BuscandoInfo, #BoxResultadosBusqueda, #EsperaBuscando, #CerrarBuscar').show();
		
		setTimeout(function(){
			var Datos = Op.Datos;
			
			var templateLista = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateBuscarListaCoincidencias.dbsp', Almacen:'TemplateBuscarListaCoincidencias'});
			var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonListaResultadosCoincidencias.dbsp', Parametros:'p=1&json='+escape(JSON.stringify(Datos)), DataType:'json'});
			var jsonCoincidencias = json.jsonDatos;
			jsonCoincidencias = _.reject(jsonCoincidencias , function(j){ return _.size(j) == 0; });
			if(_.size(jsonCoincidencias)==0){return false;}
			var DatosCoincidencias = [];
			for (var i = 0; i <= Datos.length - 1; i++){
				var arr = {};
				var Campo = Datos[i].Campo;
				
				arr.Titulo = Campo;
				arr.nCoincidencias = Datos[i].Coincidencias;
				arr.idsp = Datos[i].idsp;
				
				if(jsonCoincidencias[0].Campo7 != ''){
					arr.jsonCoincidencias = _.where(jsonCoincidencias, {Campo7:Campo});
				}else{
					arr.jsonCoincidencias = jsonCoincidencias;
				}
				
				arr.MasNoPermitidos = (arr.jsonCoincidencias[0].NoPermitidos>0) ? true : false;
				arr.NoPermitidos = arr.jsonCoincidencias[0].NoPermitidos;
				
				arr.MasDatos = (arr.jsonCoincidencias[0].Permitidos>5) ? true : false;
				arr.RestanCoincidencias = (arr.jsonCoincidencias[0].Permitidos>5) ? arr.jsonCoincidencias[0].Permitidos-5 : '';
				
				if(jsonCoincidencias[0].Campo7 == ''){
					arr.jsonCoincidencias = {};
				}

				for (var j = 0; j <= arr.jsonCoincidencias.length - 1; j++){
					arr.jsonCoincidencias[j].Descartado = (arr.jsonCoincidencias[j].Campo6=='1') ? true : false;
				};
				
				DatosCoincidencias.push(arr);
			};
			
			var jsonResultados = {}; 
			jsonResultados.DatosCoincidencias = DatosCoincidencias;
			
			var Html = SalesUp.Construye.ReemplazaDatos({Template:templateLista , Datos:jsonResultados});
			
			$('#InfoEncontrada, #timesBuscando').fadeIn();
			
			$('#BuscandoInfo, #EsperaBuscando').hide();
			setTimeout(function(){
				$('#BoxResultadosBusqueda').css('height', '400px');
				$('#InfoEncontrada').html(Html);
				$('#LtResultadosBusqueda').scrollTop(0);
			}, 500);
			setTimeout(function(){
				$('#LtResultadosBusqueda').css('height','400px');
			}, 800);
			SalesUp.Sistema.IniciaPlugins();
		}, 100);

	}/*BuscandoSugerencias*/
	this.BuscandoSugerenciasOportunidades = function(Op){

		SalesUp.Buscar.ActivaBuscar();
		$BoxBuscador = $('#BoxBuscador');
		$BoxBuscador.find('#BoxInputBuscador').remove();
		$BoxBuscador.find('#BoxResultadosBusqueda').addClass('ContSugerencias');
		$BoxBuscador.addClass('ContSugerencias').find('#ContBusq').addClass('ContSugerencias');
		$('#BuscandoInfo, #BoxResultadosBusqueda, #EsperaBuscando, #CerrarBuscar').show();
		
		setTimeout(function(){
			var Datos = Op.Datos;
			
			var templateLista = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateBuscarListaCoincidencias.dbsp', Almacen:'TemplateBuscarListaCoincidencias'});
			var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonListaResultadosCoincidenciasOportunidades.dbsp', Parametros:'p=1&json='+escape(JSON.stringify(Datos)), DataType:'json'});
			var jsonCoincidencias = json.jsonDatos;
			jsonCoincidencias = _.reject(jsonCoincidencias , function(j){ return _.size(j) == 0; });
			if(_.size(jsonCoincidencias)==0){return false;}
			var DatosCoincidencias = [];
			for (var i = 0; i <= Datos.length - 1; i++){
				var arr = {};
				var Campo = Datos[i].Campo;
				
				arr.Titulo = Campo;
				arr.nCoincidencias = Datos[i].Coincidencias;
				arr.idsp = Datos[i].idsp;
				
				if(jsonCoincidencias[0].Campo9 != ''){
					arr.jsonCoincidencias = _.where(jsonCoincidencias, {Campo9:Campo});
				}else{
					arr.jsonCoincidencias = jsonCoincidencias;
				}
				
				arr.MasNoPermitidos = (arr.jsonCoincidencias[0].NoPermitidos>0) ? true : false;
				arr.NoPermitidos = arr.jsonCoincidencias[0].NoPermitidos;
				
				arr.MasDatos = (arr.jsonCoincidencias[0].Permitidos>5) ? true : false;
				arr.RestanCoincidencias = (arr.jsonCoincidencias[0].Permitidos>5) ? arr.jsonCoincidencias[0].Permitidos-5 : '';
				
				if(jsonCoincidencias[0].Campo9== ''){
					arr.jsonCoincidencias = {};
				}

				for (var j = 0; j <= arr.jsonCoincidencias.length - 1; j++){
					arr.jsonCoincidencias[j].Descartado = (arr.jsonCoincidencias[j].Campo6=='1') ? true : false;
				};
				
				DatosCoincidencias.push(arr);
			};
			
			var jsonResultados = {}; 
			jsonResultados.DatosCoincidencias = DatosCoincidencias;
			
			var Html = SalesUp.Construye.ReemplazaDatos({Template:templateLista , Datos:jsonResultados});
			
			$('#InfoEncontrada, #timesBuscando').fadeIn();
			
			$('#BuscandoInfo, #EsperaBuscando').hide();
			setTimeout(function(){
				$('#BoxResultadosBusqueda').css('height', '400px');
				$('#InfoEncontrada').html(Html);
				$('#LtResultadosBusqueda').scrollTop(0);
			}, 500);
			setTimeout(function(){
				$('#LtResultadosBusqueda').css('height','400px');
			}, 800);
			SalesUp.Sistema.IniciaPlugins();
		}, 100);

	}/*BuscandoSugerenciasOportunidades*/

	this.VerMasRegistrosConCoincidencias = function(Op){
		var $Elemento = $(Op.e);
		$Elemento.html(Cargando);
		var Tipo = '', Per = '', Des = '', Buscar = '', Pagina = '', masDe = '';
		var Total = 0, Restan = 0, start, Descartado = 0, EsDescartado = '';

		Pagina = Op.p;
		start = Op.s;
		masDe = Op.masDe;
		Total = Op.T;
		Restan = Op.R - 20;
		(Op.Descartado) ? EsDescartado = 'LiDescartado' : '';
		(Op.Descartado) ? Descartado = 1 : '';
		
		var datosParametros = 'ids='+masDe+'&campo=fono&p='+Pagina+'&s='+start;
		var templateLista = '';

		templateLista = '';
		templateLista += '{{#each jsonDatos}}';
		templateLista += '<li class="{{#if Descartado}}LiDescartado{{/if}}" data-tipo="{{Campo1}}" data-tk="{{Campo2}}" data-esCliente="{{Campo5}}" onclick="SalesUp.Buscar.VerDetalleBusqueda({e:this, Tipo:\'{{Campo1}}\', tk:\'{{Campo2}}\' });">';
		templateLista += '	<span class="{{#if Campo4}}w70{{else}}w100{{/if}} Ellipsis"><i class="fa {{#if Descartado}}fa-trash{{else}}fa-user{{/if}}"></i> {{Campo3}}</span>';
		templateLista += '	{{#if Campo4}}<span class="w30 Ellipsis"><i class="fa fa-building-o"></i> {{Campo4}}</span> {{/if}}';
		templateLista += '	<span class="iverFicha"><i class="fa fa-lg fa-caret-right"></i></span>';
		templateLista += '	<div class="clear"></div>';
		templateLista += '</li>';
		templateLista += '{{/each}}';
		
		var templateVerMas = '';
		templateVerMas += '<li class="VerMasResultados" onclick="SalesUp.Buscar.VerMasRegistrosConCoincidencias({e:this, masDe:\''+masDe+'\', p:'+(Pagina+1)+', s:'+(start+20)+', T:\''+Total+'\', R:\''+Restan+'\' });" >';
		templateVerMas += '	<div class="w50">'+Restan+' coincidencias </div>';
		templateVerMas += '	<div class="w50">ver más <i class="fa fa-caret-down"></i></div>';
		templateVerMas += '</li>';

		if(Restan<=0){templateVerMas = ''; templateVerMasDescartados = '';}
		
		setTimeout(function() {
			var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonListaResultadosVerMasCoincidencia.dbsp', Parametros:datosParametros, DataType:'json'});
			json = json.jsonDatos;
			
			for (var i = 0; i <= json.length - 1; i++){
				json[i].Descartado = (json[i].Campo6=='1') ? true : false;
			};
			json.jsonDatos = json;
			var Html = SalesUp.Construye.ReemplazaDatos({Template:templateLista, Datos:json})+templateVerMas;
			$Elemento.after(Html);
			$Elemento.remove();
			
		}, 100);
			
	}/*this.VerMasRegistrosConCoincidencias*/

	this.RecargarActual = function(){
		var $LiSeleccionado = $('#LtResultadosBusqueda li.liSeleccionado');
		var tipo = $LiSeleccionado.attr('data-tipo');
		var tk = $LiSeleccionado.attr('data-tk');
		SalesUp.Buscar.VerDetalleBusqueda({e:$LiSeleccionado, Tipo:tipo, tk:tk });
	}


	this.highlight = function(Op){
		var Buscar =  Op.Texto;
		var Donde = Op.Donde;
		var arrBuscarHighLight = $(Donde).find('.BuscarHighLight');
		function preg_quote(str){ /* http://kevin.vanzonneveld.net */
		  return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
		}

		for(var i = 0;i<= arrBuscarHighLight.length -1; i ++ ){
			var $Buscar = $(arrBuscarHighLight[i]);
			var texto = $Buscar.text();
			var Cambio = texto.replace( new RegExp( "(" + preg_quote( Buscar ) + ")" , 'gi' ), "<span class='highlight'>$1</span>" );
			$Buscar.html(Cambio);
		}

	}/*highlight*/

}/*Buscador*/








