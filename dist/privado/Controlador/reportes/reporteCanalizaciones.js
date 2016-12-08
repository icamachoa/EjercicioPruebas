var reportesCanalizaciones = function(){

	var creaTotales = function(){ 

		/* Crea totales */
		var $tablaDistribuidores 	= $('#reporteCorporativo');
		var nRows 					= $tablaDistribuidores.find('tbody').find('tr').length;
		var arrayTd 				= $tablaDistribuidores.find('tr:first').find('td');
		var banderaPrimero			= true;

		$tablaDistribuidores.append('<tr class="ultimoRow"></tr>');
			
		for(var i = 0;i<= arrayTd.length-1; i++){
			$('.ultimoRow').append('<td></td>');
			  
		  	var $t = $(arrayTd[i]);
		  	var nRowsAux = 0;
			  
		  	if($t.hasClass('sumaTitulo') || $t.hasClass('promedioTitulo')){

		      var total = 0;
		     
		     for(var x = 0; x<=nRows-1;x++){

		     	if(banderaPrimero){
		     		var primer = i - 1;
		  			$('.ultimoRow').find('td:eq('+primer+')').addClass('tDer').html('<b>Totales</b>');
		  			banderaPrimero = false;
		  		}

		        var arrayValor = $tablaDistribuidores.find('tbody').find('tr:eq('+x+')').find('td:eq(' + i + ')').data('total');

		        (!arrayValor)?arrayValor = 0:'';

		        if(arrayValor != 0){
		        	nRowsAux++;
		        }

		        total = total + parseFloat(arrayValor)
		      }

		      if($t.hasClass('promedioTitulo') && nRowsAux > 0){
		      	total = total / nRowsAux;

		      	if($t.hasClass(('tiempo'))){
		      		if(total <= 1440){
				  		total = total.toFixed(2) + ' Minutos';
				  	}else{
				  		var horas = (total/(24 * 60)).toFixed(2); 
				  		total = horas + ' Días';
				  	}
		      	}else{
		      		total = total.toFixed(2);
		      	}
		      }

		      if($t.hasClass('monto')){
		      	$('.ultimoRow').find('td:eq('+i+')').addClass('tCen').html('<b class="FormatToMoney">'+total+'</b>');
		      }else if($t.hasClass('promedioTitulo')){
		      	$('.ultimoRow').find('td:eq('+i+')').addClass('tCen').html('<b class="Tip1" tip="No se toman en cuenta ceros.">'+total+'</b>');
		      }else{
		      	$('.ultimoRow').find('td:eq('+i+')').addClass('tCen').html('<b>'+total+'</b>');
		      }
		  }
		}
		/* Termina crea totales*/
	}/*creaTotales*/


	this.corporativo = function(op){
		var start = (op.start) ? op.start : 1;
		var filtro = op.filtro, qryString = encodeURIComponent(filtro);
		var tke = SalesUp.Variables.tke, tku = SalesUp.Variables.tku, code = SalesUp.Variables.convertCode;

		var procesaInfoCanalizada = function(Op,err){
			SalesUp.Variables.DatosRecibidos = Op;
			Handlebars.registerHelper('dias', function(minutos, valor) {
				var out 	= "", data;

				if(minutos <= 1440){
					out += minutos + ' Minutos';
				}else{
					var horas = (minutos/(24 * 60)).toFixed(2); 
					out += horas + ' Días';
				}
				return out;
			});

			var jsonInfoCorporativo = SalesUp.reportes.quitaVacio(Op.jsonDatos);
			var IdVentana = 27, Datos;
			var NombreCampos  = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateClusters.dbsp', Parametros:'thead=1&IdVentana='+IdVentana, Almacen:'htmlHeadCluster'});
			var TemplateDatos = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateClusters.dbsp', Parametros:'thead=0&IdVentana='+IdVentana, Almacen:'htmlBodyCluster'});
			var ordenTabla = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonOrdenReportesControl.dbsp', Parametros:'idventana='+IdVentana, DataType:'json'}).jsonDatos;
			
			var nRegistros = 0;
			if (_.size(jsonInfoCorporativo[0])){ nRegistros = jsonInfoCorporativo[0].nRegistros;}

			if(!_.isUndefined(ordenTabla[0].ORDENAMIENTO)){
				Datos = _.sortBy(jsonInfoCorporativo, function(j){
					if(ordenTabla[0].ORDENAMIENTO == 'CANALIZADOS' || ordenTabla[0].ORDENAMIENTO == 'CERRADOS' || ordenTabla[0].ORDENAMIENTO == 'PERDIDOS' || ordenTabla[0].ORDENAMIENTO == 'PCT_EFECTIVIDAD' || $.isNumeric(j[ordenTabla[0].ORDENAMIENTO])){
						return parseFloat(j[ordenTabla[0].ORDENAMIENTO]);
					}else{
						return j[ordenTabla[0].ORDENAMIENTO];
					}
				});

				if(ordenTabla[1].ORDENAMIENTO == 'DESC'){
					Datos = Datos.reverse();
				}
			}else{
				Datos = jsonInfoCorporativo;
			}

			SalesUp.Construye.ConstruyeTabla(NombreCampos, TemplateDatos, Datos, {Destino:'#DatosLoad',Id:'reporteCorporativo', elInicio:start});
			
			if (nRegistros){
				creaTotales();
				var objTotales = SalesUp.Sistema.sumaColumna(Datos,[{columna:'CANALIZADOS'},{columna:'CERRADOS'},{columna:'PERDIDOS'},{columna:'PROMEDIO_SEGUIMIENTOS'},{columna:'TIEMPO'},{columna:'MONTOOPORTUNIDADES'},{columna:'TOTALOPORTUNIDADES'},{columna:'TOTALOPORTUNIDADES'},{columna:'MONTOVENTAS'},{columna:'TOTALVENTAS'}]);
 				var $tabla = $('#reporteCorporativo');

				SalesUp.reportes.paginacion({ registros:nRegistros, start:start, callback:SalesUp.reportes.canalizaciones.corporativo, tabla:$tabla, parametros:filtro });	
			}
		}/*procesaInfoCanalizada*/

		var linkFuenteDatos = 'https://control.salesup.com.mx/canalizaciones/cuentas/get/jsonCuentasCorporativo.dbsp';
		
		if(SalesUp.Variables.tkrs==='414AF1FB-1222-4E32-8343-720B0C28C67D'){
			linkFuenteDatos = 'https://control.salesup.com.mx/canalizaciones/cuentas/get/jsonCuentasDistribuidor.dbsp';
		}

		SalesUp.Sistema.CargaDatosAsync({
			link:linkFuenteDatos,
			parametros:'TKE='+tke+'&TKUSUARIO='+tku+'&CONVERTCODE='+code+'&JSON='+qryString+'&inicia='+start,
			callback:procesaInfoCanalizada
		});
	}/*corporativo*/


	SalesUp.Variables.DetalleCanalizados = function(_elemento){
		var $Elemento 	= $(_elemento);
		var tkc 		= $Elemento.attr('data-tkc');
		var tipoDetalle	= $Elemento.attr('data-tipo');
		var tipoFiltro	= $Elemento.attr('data-tipo-filtro');
		var total 		= $Elemento.attr('data-total');
		var ids 		= $Elemento.attr('data-ids');

		var Parametros 	= 'tk='+tkc+'&tipoDetalle='+tipoDetalle+'&tipos='+SalesUp.Variables.prmTipos+'&tks='+SalesUp.Variables.prmTks+'&convertcode='+SalesUp.Variables.session_convertcode;

		if(total > 0){
			/*
			var ids	= SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/cuentas/get/jsonObtieneIds.dbsp', Parametros:Parametros,DataType:'json'}).jsonDatos[0].IDS;
			*/
			ids 	= SalesUp.Sistema.Encript({"cadena":ids});
			
			$('.frmDetalle').remove();
			$('body').append('<form class="frmDetalle" name="frmDetalle" method="post" action="distribuidores_detalle.dbsp"  enctype="multipart/form-data"><input type="hidden" name="total" value="'+total+'"/><input type="hidden" name="ids" value="'+ids+'"/><input type="hidden" name="tipoDetalle" value="'+tipoDetalle+'"/></form');
			$('.frmDetalle').submit();
		}
	}/*SalesUp.Variables.DetalleCanalizados*/

}/*reportesCanalizaciones*/
