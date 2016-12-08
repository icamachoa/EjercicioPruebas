/*[:upper:]{2}-\d{3}-[:lower:]{1}*/

var Importacion = function(){
	var quitaVacios = function(json){return _.reject(json,function(j){return _.size(j)==0});}
	var trim = function(str){return $.trim(str);}
	var txtImportar = '<i class="fa fa-lg fa-upload"></i> Importar';
	var opcionesDefault = '<option value="0">(... Seleccionar campo ...)</option><option value="-1">(... Ignorar ...)</option>';
	var tmpCampos  = '<select onchange="SalesUp.Importacion.seleccionaColumna({t:this, v:value});" class="Select w100 Ellipsis columnasInfo">';
		tmpCampos += opcionesDefault;
		tmpCampos += '[opciones]</select><i class="fa fa-sort-desc fa-lg"></i>';
	var tmpOpciones = '{{#each jsonDatos}}<option data-unico="{{unico}}" data-obligatorio="{{obligatorio}}" data-rest="{{restriccion}}" value="{{name}}">{{campo}}</option>{{/each}}';

	this.cancelarImportacion = function(){
		document.location.href = '/privado/productos.dbsp';
	}

	this.validaExtension = function(Op){
		var $file = $('#files');
		var archivo = $file.val();
		var Archivo = archivo.toLowerCase();

		if(Archivo){
			var Ext = Archivo.split('.').pop();

			if(['csv'].indexOf(Ext)<0){
			  SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'#contenedor', Id:'ArchivosValidos', Msg:'Extensión inválida. Sólo archivos CSV' });
			  $file.val('');
			  return false;
			}
		}
		return true;
	}/*ValidaExtension*/


	this.ProcesaCsv = function(){

		var stepped = 0, rowCount = 0, errorCount = 0, firstError;
		var start, end;
		var firstRun = true;
		var maxUnparseLength = 10000;

		stepped = 0;
		rowCount = 0;
		errorCount = 0;
		firstError = undefined;
		
		var now = function(){ return typeof window.performance !== 'undefined' ? window.performance.now() : 0;}

		var stepFn = function(results, parser){
			stepped++;
			if (results){
				if (results.data)
					rowCount += results.data.length;
				if (results.errors){
					errorCount += results.errors.length;
					firstError = firstError || results.errors[0];
				}
			}
		}

		var completeFn = function(results){
			end = now();

			if (results && results.errors){
				if (results.errors){
					errorCount = results.errors.length;
					firstError = results.errors[0];
				}
				if (results.data && results.data.length > 0)
					rowCount = results.data.length;
			}

			SalesUp.Variables.nRegistros = rowCount;
			SalesUp.Importacion.MostrarInfoCsv(results);
			
		}

		var errorFn = function(err, file){
			end = now();
			console.log("ERROR:", err, file);	
		}


		var config = {
			delimiter: '',
			header: false,
			preview: 0,
			skipEmptyLines:true,
			encoding:'ISO-8859-1',
			complete: completeFn,
			error: errorFn
		};


		$('#btnProcesa').html(txtImportar+' <i class="fa fa-spin fa-spinner"></i>');

		if (!firstRun)
			console.log("--------------------------------------------------"); 
		else
			firstRun = false;

		if (!$('#files')[0].files.length){ 	$('#btnProcesa').html(txtImportar);
			SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'Debe de seleccionar un archivo.', Destino:'#contenedor' });
			return;
		}
		
		setTimeout(function(){
			$('#files').parse({
				config: config,
				before: function(file, inputElem){
					start = now();
					//console.log("Procesando...", file.name);
					SalesUp.Variables.ArchivoCsv = file;
				},
				error: function(err, file){
					console.log("ERROR:", err, file);
					firstError = firstError || err;
					errorCount++;
				},
				complete: function(){
					end = now();
					$('#btnProcesa').html(txtImportar);
				}
			});
		}, 500);

	}/*ProcesaCsv*/


	this.MostrarInfoCsv = function(array){
		
		var columnas = SalesUp.Importacion.configurarCampos();

		SalesUp.Variables.csvProcesado = array;
		var csv = SalesUp.Variables.ArchivoCsv.name;
		var tam = SalesUp.Variables.ArchivoCsv.size;
		var nFilas = SalesUp.Variables.nRegistros;
		var tableData = array.data;
		
		tam = (tam / 1024 / 1024).toFixed(2)+ ' MB';

		tableData = _.first(tableData,6);
		nColumnas = _.size(tableData[0]);

		var table = document.createElement('table'), tableBody = document.createElement('tbody');
		table.id="tablaInfo";

		tableData.forEach(function(rowData){
			var row = document.createElement('tr');
			
			rowData.forEach(function(cellData){
				var cell = document.createElement('td');
				cell.appendChild(document.createTextNode(cellData));
				row.appendChild(cell);
			});

			tableBody.appendChild(row);
		});

		table.appendChild(tableBody);

		var head = '<thead><tr>';
		for (var co = 0; co < nColumnas; co++){
			head += '<th class="boxSelect">'+columnas+'</th>';
		};
		head += '</tr></thead>';

		$('#nRegistros').html(nFilas+' registros en el archivo '+csv + ', tamaño: '+tam );
		$('#infoProcesada').html(table);
		
		$('#tablaInfo').addClass('simple').prepend(head);
		$('.simple tbody tr:odd').addClass('zebra');
	}/*MostrarInfoCsv*/

	this.verPaso = function(Op){
		var paso = Op.paso, actual = Op.actual;
		var $Ocultar = $('#boxPaso'+actual), $Mostrar = $('#boxPaso'+paso);
		var $pasoActual = $('#Paso'+actual), $pasoSig = $('#Paso'+paso);

		if(paso>actual){
			$pasoActual.removeClass('active').addClass('complete');
			setTimeout(function(){$pasoSig.removeClass('disabled').addClass('active');},550);
		}else{
			$pasoActual.removeClass('active').addClass('disabled');
			setTimeout(function(){$pasoSig.removeClass('complete').addClass('active');},550);
		}

		$Ocultar.hide();
		$Mostrar.show();
	}/*verPaso*/


	this.seleccionaColumna = function(Op){
		var opcion = Op.v, $t = $(Op.t), 
		    $p = $t.closest('.boxSelect'), index = $p.index(),
		    vActual=[], arrSelectColumnas = $('.columnasInfo'), jCampos = SalesUp.Variables.jCampos.jsonDatos;
		  
		  
		for(var as=0;as<_.size(arrSelectColumnas);as++){
			var $s = $(arrSelectColumnas[as]), v = $s.val();

			if((v!=0)&&(v!=-1)){
			  vActual.push(v);
			}
		}/*for as*/

		for(var as=0;as<_.size(arrSelectColumnas);as++){
			var j={jsonDatos:[]};
			var $s = $(arrSelectColumnas[as]), vSelect = $s.val();
			var jRestan = jCampos;

			for(var va=0;va<_.size(vActual);va++){
			  var v = vActual[va];
			  if(as!=index){
			    if(v!=vSelect)
			    jRestan = _.reject(jRestan,function(j){return j.name==v});
			    
			  }else{
			    if(v!=opcion){
			      jRestan = _.reject(jRestan,function(j){return j.name==v});
			    }
			  }
			}/*for va*/

			j.jsonDatos = jRestan;
			
			var columnas = opcionesDefault + SalesUp.Construye.ReemplazaDatos({Template:tmpOpciones, Datos:j});

			$s.html(columnas);
			$s.val(vSelect);

		}/*for as*/

		
		/*console.log(vActual);*/
	}/*seleccionaColumna*/

	var columnasProductos = function(){
		//console.info('Productos');
		/*
			restricciones
			0 - texto
			1 - numero
			2 - decimal
		*/
		SalesUp.Variables.jCampos = {};
		var jAux = [
		  {
		    campo:'Nombre',
		    name:'nombre',
		    restriccion:0,
		    obligatorio:1
		  },{
		    campo:'Código',
		    name:'codigo',
		    restriccion:0,
		    unico:1,
		    obligatorio:1
		  },{
		    campo:'Existencia',
		    name:'existencia',
		    restriccion:1
		  },{
		    campo:'Unidades',
		    name:'unidades',
		    restriccion:0
		  },{
		    campo:'Costo',
		    name:'costo',
		    restriccion:2
		  },{
		    campo:'Mínimo',
		    name:'minimo',
		    restriccion:2
		  },{
		    campo:'Descripción extendida 1',
		    name:'desc1',
		    restriccion:0
		  },{
			campo:'Descripción extendida 2',
			name:'desc2',
			restriccion:0
		  },{
			campo:'Línea',
			name:'idLinea',
			restriccion:0
		  },{
			campo:'Marca',
			name:'idMarca',
			restriccion:0
		  }
		];
		
		
		SalesUp.Variables.jCampos.jsonDatos = jAux;

		var procesaPrecios = function(Op,err){
		  if(Op){
		    var jPrecios = quitaVacios(Op.jsonDatos);
		    
		    for(var jp=0;jp<_.size(jPrecios);jp++){
		      var jAux = {}, precio = jPrecios[jp]; 
		      jAux.campo = trim(precio.precio);
		      jAux.name = 'precio'+precio.indice;
		      jAux.restriccion = 2;
		      SalesUp.Variables.jCampos.jsonDatos.push(jAux);
		    }
		  }
		}

		var procesaImpuestos = function(Op,err){
		  if(Op){
		    var jImpuestos = quitaVacios(Op.jsonDatos);
		      
		    for(var ji=0;ji<_.size(jImpuestos);ji++){
		      var jAux = {}, impuestos = jImpuestos[ji];
		      jAux.campo = trim(impuestos.impuesto);
		      jAux.name = 'impuesto'+impuestos.indice;
		      jAux.restriccion = 2;
		      SalesUp.Variables.jCampos.jsonDatos.push(jAux);
		    }
		  }
		}

		var procesaComision = function(Op,err){
		  if(Op){
		    var jComision = quitaVacios(Op.jsonDatos);
		    
		    for(var jo=0;jo<_.size(jComision);jo++){
		      var jAux = {}, comision = jComision[jo];
		      jAux.campo = trim(comision.comision);
		      jAux.name = 'comision'+comision.indice;
		      jAux.restriccion = 2;
		      SalesUp.Variables.jCampos.jsonDatos.push(jAux);
		    }
		  }
		}

		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonPreciosEmpresa.dbsp', callback:procesaPrecios});
		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonImpuestosEmpresa.dbsp', callback:procesaImpuestos});
		SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonComisionesEmpresa.dbsp', callback:procesaComision});


	}/*columnasProductos*/

	this.columasExportacion = function(){
		var tipoExportacion = SalesUp.Variables.tipoExportacion;
		if (tipoExportacion=='Productos'){
			columnasProductos();
		}
	}/*columasExportacion*/

	this.configurarCampos = function(){
		var tipoExportacion = SalesUp.Variables.tipoExportacion;
		var columnas = '';
		

		SalesUp.Importacion.verPaso({actual:1, paso:2});
		SalesUp.Variables.jCampos.jsonDatos = _.sortBy(SalesUp.Variables.jCampos.jsonDatos,'campo');

		if (tipoExportacion=='Productos'){
			//console.info('******\nConfigurar campos productos');
			
			columnas = SalesUp.Construye.ReemplazaDatos({Template:tmpOpciones, Datos:SalesUp.Variables.jCampos});
		}

		columnas = SalesUp.Sistema.StrReplace('[opciones]',columnas, tmpCampos);
		return columnas;

	}/*configurarCampos*/

	this.iniImportacion = function(){
		SalesUp.Importacion.cssNecesario();
		SalesUp.Importacion.columasExportacion();		
	}/*iniImportacion*/

	var restauraBoton2 = function(t, onclick){
		$(t).html('<i class="fa fa-lg fa-arrow-right"></i> Siguiente').attr('onclick',onclick);
	}

	this.validarPaso2 = function(t){
		var onclick = $(t).attr('onclick');
		$(t).html('Validando <i class="fa fa-spin fa-spinner"></i>').attr('onclick','return false;');
		
		setTimeout(function(){
			var pasa = true, duplicidad = $('#duplicidad').val(), IgnorarLinea = $('#IgnorarLinea').is(':checked');
			//console.info('validarPaso2');
			
			var arrColumnasInfo = $('.columnasInfo');
			var arrColumnas = [], arrCampos = [];
			var pasaColumnas = 0;

			for (var ci = 0;ci < _.size(arrColumnasInfo); ci++){
				var $columna = $(arrColumnasInfo[ci]);
				var v = $columna.val(), campo = $columna.find('option:selected').html();
				
				if ((v!='0')&&(v!='-1')){
					pasaColumnas += 1;
					arrColumnas.push(v);
					arrCampos.push(campo);
				}else{
					pasaColumnas += 0;
				}
			}

			if(!pasaColumnas){
				pasa = false;
				restauraBoton2(t, onclick);
				SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'Debe al menos elegir una columna para la configuración de los productos.', Destino:'#contenedor', Tiempo:5000 });
				return 'pasaColumnas';
			}

			if( _.indexOf(arrColumnas, 'nombre') == -1){
				restauraBoton2(t, onclick);
				SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'La columna <b>Nombre</b> es obligatoria.', Destino:'#contenedor', Tiempo:5000 });
				return 'Obligatorio Nombre';
			}

			if( _.indexOf(arrColumnas, 'codigo') == -1){
				restauraBoton2(t, onclick);
				SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'La columna <b>Código</b> es obligatoria.', Destino:'#contenedor', Tiempo:5000 });
				return 'Obligatorio Código';
			}
			
			if( _.indexOf(arrColumnas, 'idLinea') == -1){
				restauraBoton2(t, onclick);
				SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'La columna <b>Línea</b> es obligatoria.', Destino:'#contenedor', Tiempo:5000 });
				return 'Obligatorio Línea';
			}

			if( _.indexOf(arrColumnas, 'idMarca') == -1){
				restauraBoton2(t, onclick);
				SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'La columna <b>Marca</b> es obligatoria.', Destino:'#contenedor', Tiempo:5000 });
				return 'Obligatorio Marca';
			}
			

			$('#tbInfoErrores tbody').html('');
			$('#infoDatosErrores').hide();
			var jColumnasValidas = validaColumnas();
			
			var jRegistros  = jColumnasValidas.jRegistros;
			var jErrorCsv = jColumnasValidas.jErrorCsv; 
			var jUnicos = jColumnasValidas.jUnicos; 
			var nErrores = _.size(jErrorCsv);
			
			SalesUp.Variables.jRegistros = jRegistros;
			SalesUp.Variables.arrColumnas = arrColumnas;
			SalesUp.Variables.arrCampos = arrCampos;

			SalesUp.Variables.jUnicos = jUnicos;

			var procesaUnicos = function(Op, err){
				/*console.info('procesaUnicos');
				console.log(Op);*/
				if(pasa){
					SalesUp.Variables.jUnicos = Op.jsonDatos;
					restauraBoton2(t, onclick);
					SalesUp.Importacion.verPaso({actual:2, paso:3});


					var jUnicos = SalesUp.Variables.jUnicos;
					var jRegistros = SalesUp.Variables.jRegistros;
					var nUnicos = _.size(jUnicos);
					var nRegistros = _.size(jRegistros);
					var duplicidad = parseInt($('#duplicidad').val());
					var comUnico = '<span class="txtcom com-codigo"><i class="fa fa-exclamation Rojo"></i> El código ya existe, se actualizará la información.<br/></span>';

					for(var nu=0;nu<nUnicos;nu++){
					  var ju = jUnicos[nu];
					  if(ju.existe==1){
					    var id = ju.id;
					    
					    for(var nr=0;nr<nRegistros;nr++){

					      var jr = jRegistros[nr];
					      //jr.unico = undefined;
					      if(jr.idImportacion==id){
					        
					        jr.unico = 1;
					        
					        if(duplicidad==0){
					          jr.ignorar = 1;
					          jr.actualizar = 0;
					          jr.comentarios = SalesUp.Sistema.StrReplace(comUnico,'',jr.comentarios);
					        }else{
					          jr.actualizar = 1;
					          jr.comentarios = SalesUp.Sistema.StrReplace(comUnico,'',jr.comentarios);
					          jr.comentarios = comUnico + jr.comentarios;
					          jr.ignorar = 0;
					        }/*if duplicidad*/
					        
					        //console.log(jr);
					      }/*if jr.idImportacion*/
					      
					    }/*for nr*/
					    
					  }/*if existe*/
					}/*for nu*/

					
					if(nErrores==0){
						construyeInfoImportar({campos:arrCampos, columnas:arrColumnas, registros:jRegistros});
					}else{
						construyeInfoErroresCsv({campos:arrCampos, columnas:arrColumnas, registros:jRegistros});
					}
				}/*if pasa*/
			}
			var valUnicos = JSON.stringify(jUnicos);
				//valUnicos = encodeURIComponent(valUnicos);

			var formData = new FormData();
			formData.append('valUnicos',valUnicos);
			
			SalesUp.Sistema.CargaDatosAsync({link:'/privado/Modelo/jsonValidaProductosUnicos.dbsp', parametros:formData, callback:procesaUnicos, metodo:'POST', formData:true});

		}, 100);

	}/*validarPaso2*/


	this.validarPaso3 = function(Op){
		var pasa = false;
		
		if(!activaPasarPaso3()){
			SalesUp.Construye.MuestraMsj({tMsg:4, Msg:'Aún hay información que necesita ser validada.', Destino:'#contenedor', Tiempo:5000 });
			return;
		}

		var jRegistros  = SalesUp.Variables.jRegistros;
		var arrColumnas = SalesUp.Variables.arrColumnas;
		var arrCampos   = SalesUp.Variables.arrCampos;

		construyeInfoImportar({campos:arrCampos, columnas:arrColumnas, registros:jRegistros});

		SalesUp.Importacion.verPaso({actual:3, paso:4});
	}

	var esNumero = function(n){
		var numInt = /^-?\d+$/;
		return numInt.test(n);
	}

	var esDecimal = function(n){
		var numFloat = /^\d+(\.\d{1,2})?$/i;
		return numFloat.test(n);
	}

	var actualizaRegistro = function(Op){
		var id = Op.id, campo = Op.campo, valor = Op.valor;
		var jRegistros = SalesUp.Variables.jRegistros;

		var jActualiza = _.where(jRegistros,{ idImportacion:id })[0];
		if (jActualiza){ jActualiza[campo] = valor;	}
	}/*actualizaRegistro*/

	var borrarRegistro = function(Op){
		var id = Op.id;
		var jRegistros = SalesUp.Variables.jRegistros;
		SalesUp.Variables.jRegistros = _.reject(jRegistros, function(j){ return j.idImportacion == id });
	}/*borrarRegistro*/

	this.validaDato = function(Op){
		var pasa = true;
		//console.log('Valida dato');
		

		var $t = $(Op.t), $td = $t.closest('td'), $tr = $td.closest('tr'), $input = $td.find('input.inputEditar'), $tdComentarios = $tr.find('td.txtComentarios');
		var campo = Op.campo, valida = Op.valida, id = Op.id;
		var v = $input.val();
		var $comentario = $tdComentarios.find('.com-'+campo);
		$t.addClass('fa-spin');
		$tdComentarios.find('*').not('.fa-times').removeClass('Rojo');
		$comentario.find('.fa-check').removeClass('fa-check Verde').addClass('fa-times Rojo');
		
		(!valida) ? valida= '':'';

		var jCampos = SalesUp.Variables.jCampos.jsonDatos;
		var jC = _.where(jCampos, {name:campo})[0];
		var obligatorio = jC.obligatorio, restriccion = jC.restriccion, unico = jC.unico, columna = jC.campo;
		var valUnicos = JSON.stringify([{id:id,v:v}]), strUnicos = encodeURIComponent(valUnicos);
		
		//console.log('obligatorio',obligatorio, 'restriccion',restriccion, 'unico',unico );
		
		var txtComentario = '<span class="txtcom com-'+campo+'"><i class="fa Rojo fa-times"></i> '+columna+' <i class="fa fa-arrow-right"></i> ';

		setTimeout(function(){
			
			
			if(obligatorio){
			  if(v==''){
			  	//console.log('es Obligatorio');
			  	if(!_.size($comentario)){
			  		txtComentario += ' el campo es obligatorio.</span>';
			  		$tdComentarios.prepend(txtComentario);
			  		$comentario = $tdComentarios.find('.com-'+campo);
			  	}
			  	$comentario.addClass('Rojo');
			  	$t.removeClass('fa-spin');
			  	descontarError(id, $tdComentarios);
			    return false;

			  }
			}

			if(unico){
			  
			  var jRespValida = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonValidaProductosUnicos.dbsp', Parametros:'valUnicos='+strUnicos, DataType:'json'}).jsonDatos[0];
			  var existe = jRespValida.existe;
			  if(existe==1){

			  	if(!_.size($comentario)){
			  		txtComentario = '<span class="txtcom com-codigo"><i class="fa fa-exclamation Rojo"></i> El código ya existe, se actualizará la información.</span>';
			  		$tdComentarios.prepend(txtComentario);
			  		$comentario = $tdComentarios.find('.com-'+campo);
			  	}
			  	$comentario.addClass('Rojo').html('<i class="fa fa-exclamation Rojo"></i> El código ya existe, se actualizará la información.');
			  	$t.removeClass('fa-spin');
			  	return false;
			  }else{
			  	txtComentario = '<span class="txtcom com-codigo"><i class="fa fa-check Verde"></i> El código no existe.</span>';
			  	if(!_.size($comentario)){
			  		$tdComentarios.prepend(txtComentario);
			  		$comentario = $tdComentarios.find('.com-'+campo);
			  	}else{
			  		$comentario.after(txtComentario);
			  		$comentario.remove();
			  	}
			  	
			  }/*if existe*/

			}/*if unico*/

			if(restriccion){
			  if(restriccion==1){
			    var numero = esNumero(((v)?v:0));
			    if(!numero){
			      //console.log('numeros');
			      if(!_.size($comentario)){
			  		txtComentario += 'solo números enteros son permitidos.</span>';
			  		$tdComentarios.prepend(txtComentario);
			  		$comentario = $tdComentarios.find('.com-'+campo);
			  	  }
			      $comentario.addClass('Rojo');
			      $t.removeClass('fa-spin');
			      descontarError(id, $tdComentarios);
			      return false;
			    }
			    
			  }
			  
			  if(restriccion==2){
			    var decimal = esDecimal(((v)?v:0));
			    if(!decimal){
			      //console.log('decimales');
			      if(!_.size($comentario)){
			  		txtComentario += 'solo números decimales son permitidos.</span>';
			  		$tdComentarios.prepend(txtComentario);
			  		$comentario = $tdComentarios.find('.com-'+campo);
			  	  }
			      $comentario.addClass('Rojo');
			      $t.removeClass('fa-spin');
			      descontarError(id, $tdComentarios);
			      return false;
			    }
			    
			  }
			  
			}

			$comentario.find('.fa-times').addClass('fa-check Verde').removeClass('fa-times Rojo');
			$t.removeClass('fa-refresh fa-spin').addClass('fa-check Verde');

			actualizaRegistro({id:id , campo:campo , valor:v });
			
			if(!unico){
				descontarError(id, $tdComentarios);
			}

		}, 100);
		
	}/*validaDato*/

	var descontarError = function(id, $td){
		
		var $times = $td.find('.fa-times.Rojo');
		var jRegistros = SalesUp.Variables.jRegistros;
		var jActualiza = _.where(jRegistros,{ idImportacion:id })[0];
		var error = 1, nError = jActualiza.nError;
		nErrores = _.size($times);
		jActualiza.error = 0;
		jActualiza.nError = 0;
		console.log('descontarError', nErrores);
		if (nErrores){
			jActualiza.error = 1;
			jActualiza.nError = nErrores;
		}
		activaPasarPaso3();
	}/*descontarError*/

	var estadoImportacion = function(){
		var jRegistros = SalesUp.Variables.jRegistros;
		
		var jInfo = _.countBy(jRegistros, function(j){
		  if(j.error==1){
		    return 'error';
		  }else if(j.ignorar==1){
		    return 'ignorar';
		  }else if(j.actualizar==1){
		    return 'actualizar';
		  }else{ return 'nuevos'; }
		});

		return jInfo;
	}

	var activaPasarPaso3 = function(){

		var jInfo = estadoImportacion();

		var nErrores = (jInfo.error)?jInfo.error:0;

		if (nErrores){
			$('#btnPaso3').addClass('disabled').removeClass('Btn-flat-Aceptar btnAccion');
			return false;
		}else{
			$('#btnPaso3').removeClass('disabled').addClass('Btn-flat-Aceptar btnAccion');
		 	return true;
		}

	}/*activaPasarPaso3*/

	this.resetValida = function(Op){
		var $t = $(Op.t), $p = $t.closest('td'), $icono = $p.find('.actualizaInfo'), $td = $p.next();
		$td.removeClass('Rojo');
		$icono.addClass('fa-refresh').removeClass('fa-check Verde').show();
		$t.attr('data-valido',0);
	}/*resetValida*/

	this.eliminaRegistro = function(Op){
		var $t = $(Op.t), $row = $t.closest('tr.rowPaginacion'), id = Op.id;		
		
		$row.remove();

		borrarRegistro({id:id});

	}/*eliminaRegistroValidacion*/

	this.eliminaRegistroValidacion = function(Op){
		var $t = $(Op.t), $row = $t.closest('tr.rowPaginacion'), id = Op.id, campo = Op.campo;		
		$row.remove();

		var $tbInfoErrores = $('#tbInfoPrevisualizarErrores'), $paginacionError = $('#paginacionError');
		var arrRows = $tbInfoErrores.find('.rowPaginacion');
		var nRows = _.size(arrRows);

		$row.remove();

		//actualizaRegistro({id:id , campo:campo , valor:'' });
		borrarRegistro({id:id});

		//console.log('nRows',nRows);
		if(nRows==0){
		  $('#divSinResultados').remove();
		  $tbInfoErrores.after('<div id="divSinResultados" class="w100"></div>');
		  $tbInfoErrores.hide();
		  $paginacionError.find('#numPaginacion').html('');
		  $paginacionError.find('#textoRegistros').html('');

		  SalesUp.Construye.SinResultados({Msg:'No hay registros para validar.', Destino:'#divSinResultados'});	
		  
		}
		activaPasarPaso3();

	}/*eliminaRegistroValidacion*/

	var construyeInfoImportar = function(Op){ //console.info('construyeInfoImportar');
		setTimeout(function(){ SalesUp.Importacion.verPaso({actual:3, paso:4});	},600);
		var campos = Op.campos, columnas = Op.columnas, jDatos = {};
		var DatosImportar = _.filter(Op.registros, function(j){ 
			return ( ((j.nError==0)||(j.actualizar==1))&&(!j.ignorar) ); 
		});

		jDatos.jRegistros = DatosImportar;
		
		var jEstadoImp = estadoImportacion();
		var hayImportacion = (_.size(jDatos.jRegistros)) ? true : false;
		
		limpiarParaImportar();

		var arrImportar = [];
		var registrosNuevos = jEstadoImp.nuevos;
		var registrosIgnorar = jEstadoImp.ignorar;
		var registrosActualizar = jEstadoImp.actualizar;

		
		if(registrosNuevos){ arrImportar.push('<i class="fa fa-lg fa-angle-right"></i> Registros que serán importados a la base de datos. <span class="nImpo">'+registrosNuevos+'</span>'); }
		if(registrosActualizar){ arrImportar.push('<i class="fa fa-lg fa-angle-right"></i> Registros que serán actualizados en la importación. <span class="nImpo">'+registrosActualizar+'</span>'); }
		if(registrosIgnorar){ arrImportar.push('<i class="fa fa-lg fa-angle-right"></i> Registros que serán ignorados en la importación. <span class="nImpo">'+registrosIgnorar+'</span>'); }

		var txtRegistros = arrImportar.join('<br/>');
		
		var tablaPrevisualizar = '';
		var nRegistros = _.size(jDatos.jRegistros);
		
		txtRegistros += '';
		tablaPrevisualizar += '<table class="simple" id="tbInfoPrevisualizar">';
		tablaPrevisualizar += '<thead><tr><th style="width: 25px"></th>[thead]<th class="tCen" style="width: 25px"></th></tr></thead>';
		tablaPrevisualizar += '<tbody>[tbody]</tbody></table>';
		
		var tmpthead = '';
		var tmptbody = '{{#each jRegistros}}<tr class="rowPaginacion {{nRows @index}}"><td class="tCen Bold">{{nFilaRow @index}}</td>';
		 
		for(var cam=0;cam<_.size(campos);cam++){
			tmpthead += '<th>'+campos[cam]+'</th>';
			tmptbody += '<td>{{'+columnas[cam]+'}}</td>';
		}
		
		tmptbody += '<td class="tCen"><i onclick="SalesUp.Importacion.eliminaRegistro({t:this, id:\'{{idImportacion}}\' });" class="Pointer fa fa-trash"></i></td></tr>{{/each}}';
		$('#datosImportacion').html(txtRegistros);
		$('#infoDatosPrevisualizar').show();

		if (hayImportacion){
			var compilado = SalesUp.Construye.ReemplazaDatos({Template:tmptbody, Datos:jDatos});
			tablaPrevisualizar = SalesUp.Sistema.StrReplace('[thead]',tmpthead,tablaPrevisualizar);
			tablaPrevisualizar = SalesUp.Sistema.StrReplace('[tbody]',compilado,tablaPrevisualizar);
			
			$('#infoDatosPrevisualizar').html(tablaPrevisualizar);
			$('.simple tbody tr:odd').addClass('zebra');
			muestraPaginacion({id:'#paginacionOk',total:nRegistros});
		}else{
			SalesUp.Construye.SinResultados({Msg:'<i class="fa fa-info-circle"></i> No hay registros para importar',Destino:'#infoDatosPrevisualizar'});
			$('#finalizarImportacion').hide();
		}

	}/*construyeInfoImportar*/


	var construyeInfoErroresCsv = function(Op){ //console.info('construyeInfoErroresCsv');
		var campos = Op.campos, columnas = Op.columnas, jDatos = {};
		/*var conErrores = _.where(Op.registros,{error:1});*/
		var conErrores = _.filter(Op.registros, function(j){ return ((j.error==1)||(j.actualizar==1)); });
		jDatos.jRegistros = conErrores;
		var tablaPrevisualizar = '';
		var nRegistros = _.size(jDatos.jRegistros);
		var txtRegistros = nRegistros+' registros presentan inconvenientes para poder importar al sistema.';
		tablaPrevisualizar += '<table class="simple" id="tbInfoPrevisualizarErrores">';
		tablaPrevisualizar += '<thead><tr><th style="width: 25px"></th>[thead]<th class="tCen" style="min-width:260px;">Comentarios</th><th class="tCen" style="width: 25px"></th></tr></thead>';
		tablaPrevisualizar += '<tbody>[tbody]</tbody></table>';
		
		var tmpthead = '';
		var tmptbody = '{{#each jRegistros}}<tr class="rowPaginacion {{nRows @index}}"><td class="tCen Bold">{{nFilaRow @index}}</td>';
		 
		for(var cam=0;cam<_.size(campos);cam++){
			tmpthead += '<th>'+campos[cam]+'</th>';
			/*tmptbody += '<td>{{'+columnas[cam]+'}}</td>';*/
			tmptbody += '<td><span class="editarEnLinea"><input onkeyup="SalesUp.Importacion.resetValida({t:this})" type="text" value="{{'+columnas[cam]+'}}" class="inputEditar w100" /> <i tip="Actualizar registro." onclick="SalesUp.Importacion.validaDato({t:this, campo:\''+columnas[cam]+'\', valida:\'{{valida}}\', id:\'{{idImportacion}}\' });" class="Pointer actualizaInfo fa fa-refresh Tip8" style="display:none;"></i></span></td>';
			
		}
		
		tmptbody += '<td class="txtComentarios Html">{{comentarios}}</td><td class="tCen"><i onclick="SalesUp.Importacion.eliminaRegistroValidacion({t:this, id:\'{{idImportacion}}\' });" class="Pointer fa fa-trash"></i></td></tr>{{/each}}';
		
		var compilado = SalesUp.Construye.ReemplazaDatos({Template:tmptbody, Datos:jDatos});

		tablaPrevisualizar = SalesUp.Sistema.StrReplace('[thead]',tmpthead,tablaPrevisualizar);
		tablaPrevisualizar = SalesUp.Sistema.StrReplace('[tbody]',compilado,tablaPrevisualizar);

		$('#infoDatosPrevisualizarErrores').html(tablaPrevisualizar);
		$('#infoDatosErrores').show();
		//$('#tbInfoErrores').show();
		$('#divSinResultados').remove();
		$('#nRegistrosError').html(txtRegistros);
		$('.simple tbody tr:odd').addClass('zebra');
		
		SalesUp.Sistema.Tipsy();
		SalesUp.Sistema.InterpretaHtml();

		muestraPaginacion({id:'#paginacionError',total:nRegistros});
	}/*construyeInfoErroresCsv*/

	var construyeInfoErrores = function(json){
		var jError = {errores:[]};
		jError.errores = json;
		/*console.log('construyeInfoErrores', jError);*/
		var nRegistros = _.size(json);

		var txtRegistros = nRegistros+' registros presentan algún error para poder importarlos correctamente.';
		var trError  = '';
			trError += '{{#each errores}}<tr class="row-{{idImportacion}} rowPaginacion {{nRows @index}}"><td class="tCen Bold">{{nFilaRow @index}}</td>';
			trError += '	<td class="tCen">{{campo}}</td>';
			trError += '	<td><input onkeyup="SalesUp.Importacion.resetValida({t:this})" type="text" value="{{valor}}" class="inputEditar w100" /> <i tip="actualizar registro." onclick="SalesUp.Importacion.validaDato({t:this, campo:\'{{columna}}\', valida:\'{{valida}}\', id:\'{{idImportacion}}\' });" class="Pointer actualizaInfo fa fa-refresh Tip8"></i></td>';
			trError += '	<td>{{comentario}}</td>';
			trError += '	<td class="tCen"><i tip="Borrar registro." onclick="SalesUp.Importacion.eliminaRegistroValidacion({t:this, id:\'{{idImportacion}}\', campo:\'{{columna}}\' });" class="Pointer fa fa-trash Tip8"></i></td>';
			trError += '</tr>{{/each}}';
		
		var compilado = SalesUp.Construye.ReemplazaDatos({Template:trError, Datos:jError});
		$('#tbInfoErrores tbody').html(compilado);
		$('#infoDatosErrores').show();
		$('#tbInfoErrores').show();
		$('#divSinResultados').remove();
		$('#nRegistrosError').html(txtRegistros);
		$('.simple tbody tr:odd').addClass('zebra');
		muestraPaginacion({id:'#paginacionError',total:nRegistros});
		SalesUp.Sistema.Tipsy();
	}

	var validaColumnas = function(){
		var arrColumnasInfo = $('.columnasInfo');
		var csvProcesado = SalesUp.Variables.csvProcesado.data;
		var numInt = /^[-|+]?[0-9]+$/;
		var numFloat = /(?:\d*\.)?\d+/;
		var IgnorarLinea = $('#IgnorarLinea').is(':checked');
		
		(IgnorarLinea) ? csvProcesado = _.rest(csvProcesado):''; 

		/*<-- QUITAR DESPUES DE LAS PRUEBAS*/
		/*csvProcesado = _.first(csvProcesado, 5 ); */

		var jInfoCsv = {jRegistros:[], jErrorCsv:[], jUnicos:[]};
		var tamPost = 0;
		for(var cr=0;cr<_.size(csvProcesado);cr++){
		  var jAux = [];
		  var jFila = {};
		  var jFilaOk = {};
		  var jFilaError = {};
		  var jUnicos = {};
		  var nError = 0;
		  var idImportacion = SalesUp.Construye.IdUnico();
		  var arrComentarios = [];
		  for (var ci = 0;ci < _.size(arrColumnasInfo); ci++){
		  	
		    var $columna = $(arrColumnasInfo[ci]);
		    var columna = $columna.val();
		    var restriccion = $columna.find('option:selected').attr('data-rest');
		    var unico = $columna.find('option:selected').attr('data-unico');
		    var obligatorio = $columna.find('option:selected').attr('data-obligatorio');
		    var campo = $columna.find('option:selected').html();
		   
		    if ((columna!='0')&&(columna!='-1')){
		      var valor = csvProcesado[cr][ci], pasa = false, comentario = 'solo números enteros son permitidos.', validacion='numeros';
		      
		      if(restriccion=='0'){
		      	pasa = true;
		      }
		      
		      if(restriccion=='1'){
		      	pasa = esNumero(((valor)?valor:0));
		      }
		      
		      if(restriccion=='2'){
		      	pasa = esDecimal(((valor)?valor:0));
		      	comentario = 'solo números decimales son permitidos.';
		      	validacion = 'decimales';
		      }

			  if(obligatorio=='1'){
				if (valor==''){
					pasa = false;
					comentario = 'el campo es obligatorio.';
				}
			  }

			  if (unico=='1'){
			  	jUnicos.id = idImportacion;
			  	jUnicos.v = valor;
			  	jInfoCsv.jUnicos.push(jUnicos);
			  }

		      jFila.idImportacion = idImportacion;
		      jFila[columna] = valor;

		      if(!pasa){
		      	nError += 1;
		      	comentario = '<span class="txtcom com-'+columna+'"><i class="fa fa-times Rojo"></i> '+ campo + ' <i class="fa fa-arrow-right"></i> ' +comentario+'</span>';
		      	arrComentarios.push(comentario);
		      	jFila.error = 1;


		      	jFilaError = {};

		      	jFilaError.idImportacion = idImportacion; 
		      	jFilaError.columna = columna;
		      	jFilaError.campo = campo;
		      	jFilaError.valor = valor;
		      	jFilaError.comentario = comentario;
		      	jFilaError.valida = validacion;
		      	jInfoCsv.jErrorCsv.push(jFilaError);
		      }/*!pasa*/

		    }/* if columna!=0 */

		  }//for ci
		  

		  if(arrComentarios){
		  	var strComentarios = arrComentarios.join('');
		  	jFila.comentarios = strComentarios;
		  	jFila.nError = _.size(arrComentarios);
		  }

		  var porPost = 102400;
		  porPost = 51200;
		  porPost = 25600;
		  
		  var post, strFila = JSON.stringify(jFila);
		  	  strFila = encodeURIComponent(strFila);
		  	  tamPost += _.size(strFila);
		      post    = parseInt(( tamPost / porPost ).toFixed());
		  
		  jFila.post = post;

		  jInfoCsv.jRegistros.push(jFila);
		  
		}//for cr

		return jInfoCsv;
	}/*validaColumnas*/


	var muestraPaginacion = function(Op){
		var $boxPaginacion = $(Op.id);
		var total = Op.total, porPagina = 25, nInicia = 1;
		var pag = parseInt(total / porPagina);
		var mod = (total%porPagina);
		var textoRegistros = '[ini] - [top] de [total] registros';

		(mod>0)? pag+=1:'';
		$('.pag1').show();
		
		var txtInicial = SalesUp.Sistema.StrReplace('[ini]',nInicia,textoRegistros);
			txtInicial = SalesUp.Sistema.StrReplace('[top]',porPagina,txtInicial);
			txtInicial = SalesUp.Sistema.StrReplace('[total]',total,txtInicial);
		(total<porPagina) ? txtInicial = '':'';

		if(total<porPagina){
			return;
		}

		$boxPaginacion.find('#numPaginacion').bootpag({
		    total: pag, page: 1, maxVisible: 4, leaps: true,
		    next:'<i class="fa fa-lg fa-angle-right"></i>',
		    prev:'<i class="fa fa-lg fa-angle-left"></i>'
		}).on("page", function(event, num){
		    var nFin = (25*num);
		    var nInicia = (nFin - 25)+1;
		    (nFin>total)? nFin = total:'';
		    var txtInicial = SalesUp.Sistema.StrReplace('[ini]',nInicia,textoRegistros);
		    txtInicial = SalesUp.Sistema.StrReplace('[top]',nFin,txtInicial);
		    txtInicial = SalesUp.Sistema.StrReplace('[total]',total,txtInicial);
		    $boxPaginacion.find('#textoRegistros').html(txtInicial);
		    $('.rowPaginacion').hide();
		    $('.pag'+num).show();
		});

		$boxPaginacion.find('#textoRegistros').html(txtInicial);
	}/*muestraPaginacion*/


	var marcarDatosImportacion = function(guardarRegistros){
	  for(var gr = 0; gr<_.size(guardarRegistros);gr++){
	    guardarRegistros[gr].guardado = 1;
	  }
	}/*marcarDatosImportacion*/

	var obtenerDatosImportacion = function(nPost){
	  /*
	  var jRegistros = SalesUp.Variables.jRegistros;
	  guardarRegistros = _.reject(jRegistros, function(j){ return j.guardado == 1 });
	  guardarRegistros = _.first(guardarRegistros, 25 );
	  return guardarRegistros;
	  */

	  var jRegistros = SalesUp.Variables.jRegistros;
	  var guardarRegistros = _.where(jRegistros, {post:nPost});
	  return guardarRegistros;
	}/*obtenerDatosImportacion*/

	var procesaGuardadoImportacion = function(Op, err, adc){
	  if(Op){
	    marcarDatosImportacion(adc);
		var nPost = adc[0].post+1;
   		var jsonGuardar = obtenerDatosImportacion(nPost);
   		if(jsonGuardar){
	      //console.info('post', nPost);
	      var sAvance = (SalesUp.Variables.avanceImportacion*(nPost));
		  $('#ProgresoImportacion').find('#ProBar').find('.pro-bar').css('width',sAvance+'%');
		  $('#infoPorcentaje').html(SalesUp.Sistema.FormatoPorcentaje((sAvance/100)));
	      guardaImportacionProductos(jsonGuardar);
	    }
	  }else{
	  	console.warn('Hubo un error.....!');
	  }
	  
	  if(err){
	    console.warn('Ha ocurrido un error al guardar.');
	    SalesUp.Construye.SinResultados({Msg:'<i class="fa fa-warning"></i> Ha ocurrido un error al momento de guardar los registros de la importación. Intentalo nuevamente.', Destino:'#ProgresoImportacion'});
	    var btnIntentar = '<div class="BoxBotones tDer w100"><span onclick="document.location.reload();" class="Btn Btn-rounded Btn-tiny Btn-tiny-min Btn-flat-Aceptar btnNeutral"><i class="fa fa-lg fa-refresh"></i> Intentar nuevamente</span></div>';
	    $('#ProgresoImportacion').append(btnIntentar);
	  }
	  
	}/*procesaGuardadoImportacion*/

	var guardaImportacionProductos = function(json){
	  var strJson = '';
	  if(_.size(json)){
	    strJson = JSON.stringify(json);
	    strJson = encodeURIComponent(strJson);
	  
	    SalesUp.Sistema.CargaDatosAsync({
	      link:'/privado/Modelo/qryGuardaImportacionProductos.dbsp', 
	      parametros:'infoImportacion='+strJson, 
	      metodo:'POST',
	      callback:procesaGuardadoImportacion,
	      prmAdicionales:json
	    });

	  }else{
	    
	    var jRegistros = SalesUp.Variables.jRegistros;
	    var nRegistros = _.size(jRegistros);
	    /*$('#boxPaso4, .bs-wizard').hide();*/

	    var jEstadoImp = estadoImportacion();
		var arrImportar = [];
		var registrosNuevos = jEstadoImp.nuevos;
		var registrosIgnorar = jEstadoImp.ignorar;
		var registrosActualizar = jEstadoImp.actualizar;

		var txtRegistros ='', arrImportar=[];
		if(registrosNuevos){ arrImportar.push('<span style="font-size: 20px;">'+registrosNuevos+'</span> Registros se han agregado. <i class=" fa fa-check fa-lg Verde"></i>'); }
		if(registrosActualizar){ arrImportar.push('<span style="font-size: 20px;">'+registrosActualizar+'</span> Registros se han actualizado. <i class=" fa fa-check fa-lg Verde"></i>'); }
		if(registrosIgnorar){ arrImportar.push('<span style="font-size: 20px;">'+registrosIgnorar+'</span> Registros fueron ignorados en la importación. '); }

		var txtRegistros = arrImportar.join('<br/>');

	    $('#nRegistrosImportados').html(txtRegistros);
	    $('.boxTerminado').show();
	    $('.unMomento, #ProgresoImportacion').remove();
	    $('#Paso5').addClass('complete').removeClass('active');
	    //console.info('Listo, terminado');
	  }
	 
	}/*guardaImportacionProductos*/

	var limpiarParaImportar = function(){
		var jRegistros = SalesUp.Variables.jRegistros;
		SalesUp.Variables.jRegistros = _.reject(jRegistros, function(j){ return j.ignorar == 1 });
	}

	this.guardarImportacion = function(){
		var jRegistros = SalesUp.Variables.jRegistros;
		var post = _.min(jRegistros, function(j){ return j.post; }).post;
		var jsonGuardar = obtenerDatosImportacion(post);
		var nRegistros = _.size(jsonGuardar);

		if(nRegistros){
		  SalesUp.Importacion.verPaso({actual:4, paso:5});
		  SalesUp.Importacion.muestraProgreso();
		  guardaImportacionProductos(jsonGuardar);
		}else{
		  //console.info('Nada que guardar.');
		}

	}/*guardarImportacion*/

	this.importarOtro = function(){
		$('.boxTerminado').hide();
		$('.bs-wizard-step').removeClass('complete').addClass('disabled');
		$('.bs-wizard-step').removeClass('active').addClass('disabled');
		$('#Paso1').addClass('active').removeClass('disabled');
		$('#boxPaso1').show();
		$('#files').val('');
		$('#ProgresoImportacion').remove();
	}

	this.muestraProgreso = function(){

		$('#ProgresoImportacion').remove();

		var HtmlCreandoArchivo = '';
		HtmlCreandoArchivo += '<div id="ProgresoImportacion" class="w100">';
		HtmlCreandoArchivo += ' <div id="ProBar" class="pro-bar-container color-pumpkin w90">';
		HtmlCreandoArchivo += '   <div class="Transition pro-bar bar-20 color-carrot" style="width:0%;"></div>';
		HtmlCreandoArchivo += ' </div>';
		HtmlCreandoArchivo += ' <span id="StatusImportacion"><i class="fa fa-lg fa-spin fa-spinner"></i> Importando información <span id="infoPorcentaje">0%</span></span>';
		HtmlCreandoArchivo += '</div>';

		$('#boxPaso5').prepend(HtmlCreandoArchivo);

		var jRegistros = SalesUp.Variables.jRegistros;
		var nPost = _.max(jRegistros,'post').post;
		(!nPost) ? nPost=1:'';
		var avance = 100/nPost;
		var porciento = (avance / 2);
		
		SalesUp.Variables.avanceImportacion = avance;
		setTimeout(function(){
			$('#ProgresoImportacion').find('#ProBar').find('.pro-bar').css('width',porciento+'%');
			
			$('#infoPorcentaje').html(SalesUp.Sistema.FormatoPorcentaje((porciento/100)));
		},50);
	}/*muestraProgreso*/

	this.terminarImportacion = function(){
		var tipoExportacion = SalesUp.Variables.tipoExportacion;
		var ir = '/privado/inicio.dbsp';
		if (tipoExportacion=='Productos'){ ir = '/privado/productos.dbsp'; }		
		document.location.href = ir;
	}

	this.regresaPaso3 = function(){
		SalesUp.Importacion.verPaso({actual:4, paso:3});
		$('#finalizarImportacion').show();
		if(activaPasarPaso3()){
			setTimeout(function(){
				SalesUp.Importacion.verPaso({actual:3, paso:2});
			}, 550);
		}
	}/*regresaPaso3*/

	this.cssNecesario = function(){
		var b = $('#menu-superior').css('backgroundColor');

		var splitRgba=[], opacity;
		if(b.indexOf('rgba')!=-1){ splitRgba = b.split(','); }

		opacity = SalesUp.Sistema.StrReplace(')','',$.trim(splitRgba[3]));
		(opacity) ? b = SalesUp.Sistema.rgb2hex(b):'';

		var CssCreandoArchico = '';
		CssCreandoArchico += '<style id="cssProgress" type="text/css">';
		CssCreandoArchico += '  .pro-bar{border-radius:0;}';
		CssCreandoArchico += '  #ProBar{float:none;margin:0 auto 10px;}#StatusImportacion{text-align:center;display:block;font-size:14px;font-style:italic;font-weight:bold;}';
		CssCreandoArchico += '  #ProgresoImportacion .color-pumpkin{background:transparent;}';
		CssCreandoArchico += '  #ProgresoImportacion .color-pumpkin{border-color:'+b+';}';
		CssCreandoArchico += '  #ProgresoImportacion .color-carrot{background:'+b+';}';
		CssCreandoArchico += '  .bs-wizard > .bs-wizard-step.active .bs-wizard-info, .bs-wizard > .bs-wizard-step.active .bs-wizard-stepnum, .bs-wizard > .bs-wizard-step.complete .bs-wizard-info, .bs-wizard > .bs-wizard-step.complete .bs-wizard-stepnum{color:'+b+';}';
		CssCreandoArchico += '  .bs-wizard > .bs-wizard-step > .progress > .progress-bar, .bs-wizard > .bs-wizard-step > .bs-wizard-dot, .bs-wizard > .bs-wizard-step.complete > .bs-wizard-dot::after {background:'+b+';}';
		CssCreandoArchico += '</style>';
		
		$('body').prepend(CssCreandoArchico);

	}/*cssNecesario*/

}/*importacion*/

SalesUp.Importacion = new Importacion();


Handlebars.registerHelper('nRows', function(i){
	var row = (i+1), porPagina = 25;
	var pag = parseInt(row / porPagina);
	var mod = (row%porPagina);
	(mod>0)? pag+=1:'';
	pag = 'pag'+pag;
	return new Handlebars.SafeString(pag);
});

Handlebars.registerHelper('nFilaRow', function(i){
	return new Handlebars.SafeString(i+1);
});



