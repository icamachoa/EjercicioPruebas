function ActivaPaginacion(Cond,Ir){
    Start = (parseInt(Ir) * parseInt(RegXPag)) - RegXPag + 1;
    ReloadData();
}

    this.paginaActual = function(Op){
        var path = document.location.pathname;
          path = SalesUp.Sistema.StrReplace('/privado/','',path);
          path = SalesUp.Sistema.StrReplace('.dbsp','',path);
          path = SalesUp.Sistema.StrReplace('-','',path);
        (!Op) ? Op = {}:'';
        var pagina = Op.pagAct;
        var jsonAc = SalesUp.Sistema.Almacenamiento({a:'jsonAc'});

        (!jsonAc) ? jsonAc = {}:'';

        if(!pagina){return jsonAc[path];}

        jsonAc[path] = pagina;

        SalesUp.Sistema.Almacenamiento({a:'jsonAc', v:jsonAc});
    }
    function utimodia(mes, anno) {
        mes = parseInt(mes);
        anno = parseInt(anno);
        switch (mes) {
            case 1 :
            case 3 :
            case 5 :
            case 7 :
            case 8 :
            case 10 :
            case 12 :
                return 31;
            case 2 :
                return (anno % 4 == 0) ? 29 : 28;
        }
        return 30;
    }

    
    
    var num_rows = 0;

    function GetData() {
        ReloadData();
        (SalesUp.Sistema.RestriccionesCorporativo) ? SalesUp.Sistema.RestriccionesCorporativo():'';
    }

    function GetData2(){ 
        $(function(){ 
            $('table.simple tbody tr:even').addClass('zebra'); 
            $.thickbox();
            (SalesUp.Sistema.RestriccionesCorporativo) ? SalesUp.Sistema.RestriccionesCorporativo():'';
        }); 
    }

    function Refrescar(){ document.location="inicio.dbsp"; }



/////*****  PANTALLA DE BIENVENIDO   ***************///////////



        function Bienvenido(){
            tb_show('Bienvenido a SalesUp!', 'bienvenido_V2.dbsp?keepThis=false&TB_iframe=true&height=480&width=950', '');
        }
        
        function Bienvenido2(){
            tb_show('Bienvenido a SalesUp!', 'bienvenido_V2.dbsp?keepThis=false&TB_iframe=true&height=480&width=950', '');
        }
        
        function CambiarFondo(){
            $("#TB_window").css("background","none repeat scroll 0 0 #DDDDDD");
        }
        
        function PantallaBenvenia(){
            tb_show('Bienvenido a la nueva versi¢n de SalesUp!', 'bienvenido_videos.dbsp?keepThis=false&TB_iframe=true&height=450&width=950', '');
        }

        
        ///////******************************************/////////////////

/////*****  PANTALLA SALESUP GRATIS   ***************//////



        function SalesUpGratis(){
            tb_show('SalesUp! Gratis', 'salesupgratis.dbsp?keepThis=false&TB_iframe=true&height=280&width=750', '');
        }
        
        function SalesUpBonificaciones(){
            setTimeout(function(){
                tb_show('Bonificaciones SalesUp!', 'salesupbonificaciones.dbsp?keepThis=false&TB_iframe=true&height=285&width=750', '');
            },1000);
        }
        
        
        function SalesUpRegresaGratis(){
             self.parent.tb_remove();
            setTimeout(function(){
                tb_show('SalesUp! Gratis', 'salesupgratis.dbsp?keepThis=false&TB_iframe=true&height=280&width=750', '');
            },1000);
        }
        ///////******************************************/////////////////





    /***** LIVE after GetData() *****/
    /* agregar estilos para los checkboxes*/
    $('table.simple tbody tr td input[type=checkbox]').live('click', function() {
        if($(this).is(':checked')) {
            $(this).closest('tr').addClass('seleccionado');
            CambiarSeleccTodo();
        } else {
            $(this).closest('tr').removeClass('seleccionado');
            CambiarSeleccTodo();
        }
    });
    /* agregar acciones para paginaci¢n */
    $('a.datosSiguientes').live('click', function() {
        var randomTime = new Date();
        Start = (Start + howmany);
        var aGrupo=dbspGrupo;
        if (aGrupo=='') agrupo=1; 
        var fechastr_ini = $('#fecha_desde').val();
        var fechastr_fin = $('#fecha_hasta').val();
        //pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start + '&fechadesde=' + fechastr_ini + '&fechahasta=' + fechastr_fin + '&grupo=' + aGrupo;
        $('.unMomento').remove();
        ReloadData();
        
        return false;
    });
    
    $('#frm_filtros').live("submit", function() {
               return false;
            });
    
    $('a.datosAnteriores').live('click', function() {
        var randomTime = new Date();
        Start = (Start - howmany);
        var aGrupo=dbspGrupo;
        var fechastr_ini = $('#fecha_desde').val();
        var fechastr_fin = $('#fecha_hasta').val();
        if (aGrupo=='') agrupo=1; 
        //pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start + '&fechadesde=' + fechastr_ini + '&fechahasta=' + fechastr_fin + '&grupo=' + aGrupo;
        $('.unMomento').remove();
        ReloadData();
        return false;
    });
    
    /* agregar acciones para paginaci¢n busquedas */
    $('a.datosSiguientesB').live('click', function() {
        var randomTime = new Date();
        Start = (Start + howmany);
        var texto=dbspTexto;
        pagina_datos = pagina_actual + '?texto_busqueda='+texto+'&randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start + '&fechadesde=' + 0 + '&fechahasta=' + 0 + '&grupo=' + 1;
        ReloadData();
    });
    
    $('a.datosAnterioresB').live('click', function() {
        var randomTime = new Date();
        Start = (Start - howmany);
        var texto=dbspTexto;
        pagina_datos = pagina_actual + '?texto_busqueda='+texto+'&randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start + '&fechadesde=' + 0 + '&fechahasta=' + 0 + '&grupo=' + 1;
        ReloadData();
    }); 
    
    $('a.datosSiguientesSucesos').live('click', function() {
        var datosSerializados = $('#frm_filtros').serialize();
        var fechastr_ini = $('#fecha_desde').val();
        var fechastr_fin = $('#fecha_hasta').val();
        var Tipo_s = $('#FiltroRapidoSucesos').val();
        var Tipo_usr = $('#FiltroRapidoSucesosEjecutivo').val();
        var tmp_txt = $('#FiltroSucesosTxt').val();
        var Tipo_txt = $.trim(tmp_txt);
        var Longitud_txt = Tipo_txt.length
        var randomTime = new Date();
        Start = (Start + howmany);
        if(Longitud_txt > 0) {
            pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start + '&fecha_desde=' + fechastr_ini + '&fecha_hasta=' + fechastr_fin + '&tipo_s=' + Tipo_s + '&tipo_usr=' + Tipo_usr + '&tipo_txt=' + Tipo_txt;
        } else {
            pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start + '&fecha_desde=' + fechastr_ini + '&fecha_hasta=' + fechastr_fin + '&tipo_s=' + Tipo_s + '&tipo_usr=' + Tipo_usr + '&tipo_txt=0';
        }
        ReloadData();
    });
    $('a.datosAnterioresSucesos').live('click', function() {
        var datosSerializados = $('#frm_filtros').serialize();
        var fechastr_ini = $('#fecha_desde').val();
        var fechastr_fin = $('#fecha_hasta').val();
        var Tipo_s = $('#FiltroRapidoSucesos').val();
        var Tipo_usr = $('#FiltroRapidoSucesosEjecutivo').val();
        var tmp_txt = $('#FiltroSucesosTxt').val();
        var Tipo_txt = $.trim(tmp_txt);
        var Longitud_txt = Tipo_txt.length
        var randomTime = new Date();
        Start = (Start - howmany);
        if(Longitud_txt > 0) {
            pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start + '&fecha_desde=' + fechastr_ini + '&fecha_hasta=' + fechastr_fin + '&tipo_s=' + Tipo_s + '&tipo_usr=' + Tipo_usr + '&tipo_txt=' + Tipo_txt;
        } else {
            pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start + '&fecha_desde=' + fechastr_ini + '&fecha_hasta=' + fechastr_fin + '&tipo_s=' + Tipo_s + '&tipo_usr=' + Tipo_usr + '&tipo_txt=0';
        }
        ReloadData();
    });
    /* agregar acciones para paginaci¢n */
    $('a.datosSiguientesMetas').live('click', function() {
        var anio = $('#anio_seleccionado').val();
        var activas = $('#activas').val();
        var tiposs = $('#FiltroTipo2').val();
        var grupos = $('#grupos').val();
        var ejecutivo = $('#ejecutivos').val();
        var pagina_actual = 'ajax/metas_data.dbsp';
        var randomTime = new Date();
        Start = (Start + howmany);
        pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start + '&anio_seleccionado=' + anio + '&ejecutivos=' + ejecutivo + '&activas=' + activas + '&tipo=' + tiposs + '&grupos=' + grupos;
        ReloadData();
    });
    $('a.datosAnterioresMetas').live('click', function() {
        var anio = $('#anio_seleccionado').val();
        var ejecutivo = $('#ejecutivos').val();
        var grupos = $('#grupos').val();
        var tiposs = $('#FiltroTipo2').val();
        var activas = $('#activas').val();
        var pagina_actual = 'ajax/metas_data.dbsp';
        var randomTime = new Date();
        Start = (Start - howmany);
        pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start + '&anio_seleccionado=' + anio + '&ejecutivos=' + ejecutivo + '&activas=' + activas + '&tipo=' + tiposs + '&grupos=' + grupos;
        ReloadData();
    });
    /* Cargar los filtros */

    $('#agregarFiltro').live('click', function(){ $('#filtros').fadeIn(1000);SalesUp.Sistema.paginaActual({pagAct:1}); });

    $('#ocultarFiltro').live('click', function(){ $('#filtros').fadeOut(1000); });

    $('a.filtro').live('click', function(){
        $('#idusuariofiltro').val($(this).attr('rel'));
        var datosSerializados = $('#frm_filtros').serialize();
        SalesUp.Sistema.paginaActual({pagAct:1});
        Start = 1;
        ($(this).html()=='Descartado')?SalesUp.Sistema.EliminaConfigColumnas():'';
        SalesUp.Sistema.paginaActual({pagAct:1});
        Start = 1;
        $('.tipsy').remove();
        SalesUp.Sistema.PostData({Link:'filtros_eliminar.dbsp', Parametros:datosSerializados, Funcion:'ReloadData' });
    });
    

    $('a#eliminarFiltros').live('click', function() {
        var datosSerializados = $('#frm_filtros').serialize()+'&todos=1';
        $('a.filtro').each(function(){
            ($(this).html()=='Descartado')?SalesUp.Sistema.EliminaConfigColumnas():'';
        });
        SalesUp.Sistema.paginaActual({pagAct:1});
        Start = 1; 
        $('.tipsy').remove();
        SalesUp.Sistema.PostData({Link:'filtros_eliminar.dbsp', Parametros:datosSerializados, Funcion:'ReloadData' });
    });

    var LoadingIconSmall = '<i class="fa fa-lg fa-spin fa-spinner" style="position:relative;top:5px;"></i>';

    $('#FiltroTipo').live('change', function(){
        var Tipo = $('#FiltroTipo').val();        
        var tcp = $('#FiltroTipo option:selected').attr('tcp');
        var IdCp = $('#FiltroTipo option:selected').attr('idcp');
        var tipoCampo = $('#FiltroTipo option:selected').attr('data-TipoCampo');
        var Indice = Tipo;
        
        var Tkca = $('#FiltroTipo option:selected').attr('data-Tkca');
        var dIndice = $('#FiltroTipo option:selected').attr('data-Indice');
        var esDe = $('#FiltroTipo option:selected').attr('data-esde');
        var dverProspectos = $('#FiltroTipo option:selected').attr('data-verProspectos');
        var dverEmpresa = $('#FiltroTipo option:selected').attr('data-verEmpresa');
        var dverVentas = $('#FiltroTipo option:selected').attr('data-verVentas');

        var TextoFiltro = $('#FiltroTipo option:selected').text();

        $('#ContenedorDetalle').html(LoadingIconSmall);
        $('#ContenedorDetalle2').html('');
        setTimeout(function(){
            if(Tkca){ CargaFiltrosCatalogos({TextoFiltro:TextoFiltro, Tkca:Tkca, Indice:dIndice, verProspectos:dverProspectos, verVentas:dverVentas, verEmpresa:dverEmpresa }); return false; }

            if(Tipo!=''){ (Tipo>0) ? CargaFiltrosSistema(Tipo) : CargaFiltrosPersonalizados({Tipo:Tipo, tcp:tcp, IdCp:IdCp, Indice:Indice, tipoCampo:tipoCampo, esDe:esDe}); }
			setTimeout(function(){ SalesUp.Sistema.ModulosActivos(); }, 100);
        }, 100);
    });

    function CargaFiltrosCatalogos(Op){
        var Tkca = Op.Tkca;
        
        var attrAdicionales = ' data-Tkca="'+Op.Tkca+'" data-Indice="'+Op.Indice+'" data-verProspectos="'+Op.verProspectos+'" data-verEmpresa="'+Op.verEmpresa+'" data-verVentas="'+Op.verVentas+'" ';
        attrAdicionales += 'onchange="GuardarFiltroCatalogo({e:this, v:value, filtro:\''+Op.TextoFiltro+'\'  });"';

        var json = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonCatalogosOpciones.dbsp', Parametros:'tkca='+Tkca, DataType:'json' }).jsonDatos;
        $('#ContenedorDetalle').html('');
        SalesUp.Construye.ConstruyemeUn({
            Control: 'select', Nuevo: true,
            SeleccioneOpcion: true, Destino:'#ContenedorDetalle', ClasesControl:'Select',
            IdControl: 'CatalogoOpcion', Nombre:'CatalogoOpcion', AttrAdicionales:attrAdicionales,
            Template: '<option value="{{IdCatalogoOpcion}}">{{Opcion}}</option>', 
            Datos: json
        });
    }

    function GuardarFiltroCatalogo(Op){
        var datosSerializados = $('#frm_filtros').serialize();
        var obj = Op.e;
        var $Elemento = $(Op.e);
        var Valor = Op.v;
        var filtro = Op.filtro;
        var OpcionTexto = $Elemento.find('option:selected').text();
        var Tkca = $Elemento.attr('data-Tkca');
        var Indice = $Elemento.attr('data-Indice');
        var verProspectos = $Elemento.attr('data-verProspectos');
        var verEmpresa = $Elemento.attr('data-verEmpresa');
        var verVentas = $Elemento.attr('data-verVentas');

        datosSerializados += '&filtro='+escape(filtro)+'&OpcionTexto='+escape(OpcionTexto)+'&tkca='+Tkca+'&indice='+Indice+'&verProspectos='+verProspectos+'&verEmpresa='+verEmpresa+'&verVentas='+verVentas+'&v='+Valor;
        SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryGuardaFiltroCatalogo.dbsp', Parametros:datosSerializados});

        $('#ContenedorDetalle, #ContenedorDetalle2').html(''); $('#FiltroTipo').val(0);
        Start = 1;ReloadData();
    }

    function CargaFiltrosSistema(Tipo){
        var idpantalla=document.getElementsByName("idpantalla")[0].value;

        $.ajaxSetup({ 'beforeSend' : function(xhr) { xhr.overrideMimeType('text/html; charset=iso-8859-1;'); } });
        $.ajax({ type:'POST', async:false, dataType:'html', cache: false,
            url: '/privado/ajax/filtros_detalle.dbsp?idpantalla='+idpantalla+'&tipo='+Tipo,
            success : function(Repuesta){
                $('#ContenedorDetalle').html(Repuesta).css('margin-left', '10px');
                $('#ContenedorDetalle select').addClass('Select');
                //**/
                if(Tipo == 113) {
                    $('#FiltroDetalleTxt').focus();
                    $('#FiltroDetalleTxt').keyup(function(e){
                        if(e.which == 13) { CambiaFiltro(); }
                    });
                }else{ $('#FiltroDetalle').focus(); }

                /**/
                if(Tipo == 4) {
                    $('#FiltroDetalleTxt').focus();
                    $('#FiltroDetalleTxt').keyup(function(e){
                        if(e.which == 13) { CambiaFiltro(); }
                    });
                }else{ $('#FiltroDetalle').focus(); }

                if(Tipo == 13 | Tipo == 18 | Tipo == 5 | Tipo == 9 | Tipo == 11 | Tipo == 17 | Tipo == 40) {
                    $('.fecha').datepicker(ConfiguracionPicker);
                    $('#fecha_hasta').change(function(){ CambiaFiltro(); });
                }

                if(Tipo == 14) {
                    $('#FiltroDetalle').change(function() {
                        $('#ContenedorDetalle2').html(LoadingIconSmall);
                        var Subtipo = jQuery('#FiltroDetalle').val();
                        $('#ContenedorDetalle2').load('ajax/filtros_subdetalle.dbsp', {
                            ajax : 1,idpais : Subtipo
                        }, function(){ $('#FiltroDetalle2').addClass('Select').focus(); });
                    });
                    $('#FiltroDetalle').change();
                }

                if((Tipo == 41) | (Tipo == 42)| (Tipo == 43)) {
                    $('#FiltroDetalle').change(function(){
                       var TipoDet = $('#FiltroDetalle').val();
                       if (TipoDet==13){
                           $('#ContenedorDetalle2').load('ajax/filtros_detalle.dbsp',{
                            ajax:1, tipo:TipoDet
                            }, function(){
                                $('.fecha').datepicker(ConfiguracionPicker);
                                $('#fecha_hasta').change(function(){ CambiaFiltroSeguimiento(); });
                            });  
                       }else{ CambiaFiltroSeguimiento(); }
                    });
                }else{
                   if(Tipo != 14) 
                    $('#FiltroDetalle').change(function(){ CambiaFiltro(); });
                }
            }/*success*/
        });
    } /* CargaFiltrosSistema */

    function CargaFiltrosPersonalizados(Op){
        var Tipo = Op.Tipo, tcp = Op.tcp, IdCp = Op.IdCp, Indice = Op.Indice, tipoCampo = Op.tipoCampo, esDe = Op.esDe;
      var $ContenedorDetalle = $('#ContenedorDetalle');
      var IdTcp = 'Tipo'+Tipo, Evento = 'onkeyup', Max = '', OnKeyPress = '';
      var $IdTcp;
      $ContenedorDetalle.html(LoadingIconSmall);

      if(tcp==1){ OnKeyPress = 'onkeypress="return SalesUp.Valida.SoloNumerosKeyCode(event);"'; Max = 'maxlength="9"'; }
      if(tcp==2){ OnKeyPress = 'onkeypress="return SalesUp.Valida.SoloDecimalesKeyCode(event);"'; Max = 'maxlength="9"'; }

      if(tcp==3){ Evento = 'onchange'; }

      if(tcp==4){ /* Campo libre */ }

      if(tcp==5){ 
        $ContenedorDetalle.html('<div class="BoxFiltroCp"><select onchange="BuscarDatoCampoPersonalizado(this, event,value,'+tcp+','+Indice+')" name="'+IdTcp+'" id="'+IdTcp+'" class="Select"></select></div> ');
        $IdTcp = $('#'+IdTcp);
        $.ajaxSetup({ 'beforeSend' : function(xhr) { xhr.overrideMimeType('text/json; charset=iso-8859-1'); } });
        $.ajax({async:false, cache: false, dataType: 'json',
                url : '/privado/ajax/jx-LtOpcionesCP.dbsp',
                data:'idcampo='+IdCp,
                success : function(Data){
                  $IdTcp.append( $('<option></option>').val('').html(' (... Seleccionar ...) ') );
                  $.each( Data.LtOpcionesCo, function( i, Val ){
                    $IdTcp.append( $('<option></option>').val(Val.IdOpcion).html(Val.Opcion) );
                  });
                }
               });
      }else{

        if(tcp==3){
          $ContenedorDetalle.html('<div class="BoxFiltroCp"><span>De</span><input class="Input" name="'+IdTcp+'" id="'+IdTcp+'" type="text" /><span>a</span><input class="Input" name="a'+IdTcp+'" id="a'+IdTcp+'" type="text" /></div><i onclick="BuscarDatoCampoPersonalizado(this, event, 1,'+tcp+','+Indice+');" class="btnBuscarEsto fa fa-search" style="top:5px;position:relative;margin:0 10px;"></i>');
          SalesUp.Sistema.DatePickerInicioFin({D:IdTcp, H:'a'+IdTcp, M:2});
        }else{
          
          if (esDe=='5'){OnKeyPress='';}

          if((tipoCampo=='1')||(tipoCampo=='5')||(tipoCampo=='4')||(tipoCampo=='9')){
            $ContenedorDetalle.html('<div class="BoxFiltroCp"><input class="Input" '+Max+' '+OnKeyPress+' '+Evento+'="BuscarDatoCampoPersonalizado(this, event,value,'+tcp+','+Indice+');" type="text" name="'+IdTcp+'" id="'+IdTcp+'" /></div><i onclick="BuscarDatoCampoPersonalizado(this, event, 0,'+tcp+','+Indice+');" class="Pointer fa fa-search" style="top:5px;position:relative;margin:0 10px;"></i>');
            $IdTcp = $('#'+IdTcp);
          }

          if (tipoCampo=='6'){
            var opcion = '';
            opcion += '<div style="padding:3px 5px;line-height:19px;" class="BoxSizing Input fInput Pointer p5" onclick="SalesUp.Variables.muestraSelectTemperatura({t:this, id:'+IdCp+', indice:\''+Indice+'\' });">';
            opcion += ' <span class="TempSeleccionada">(... Seleccione una opción ...)</span>';
            opcion += '</div>';
            $ContenedorDetalle.html('<div class="BoxFiltroCp">'+opcion+'</div>');

          }

          if((tipoCampo=='7')||(tipoCampo=='8')||(tipoCampo=='3')){
            $ContenedorDetalle.html('<div class="BoxFiltroCp"><select onchange="BuscarDatoCampoPersonalizado(this, event,value,'+tcp+','+Indice+')" name="'+IdTcp+'" id="'+IdTcp+'" class="Select"></select></div>');
            $IdTcp = $('#'+IdTcp);
            $IdTcp.append( $('<option></option>').val('').html(' (... Seleccionar ...) ') );
            var arrOpciones = SalesUp.Variables.OpcionesPersonalizables({id:IdCp}), Opciones = {};
            Opciones.Opciones = arrOpciones;
            var tmp = '{{#each Opciones}}{{opcionSelect}}{{/each}}';
            var compilado = SalesUp.Construye.ReemplazaDatos({Datos:Opciones, Template:tmp});
            $IdTcp.append(compilado);
          }

          if((tipoCampo=='3')){
            $IdTcp.attr('onchange','$("#a'+IdTcp+'").focus();').after('<input style="margin-left: 5px;" class="Input" '+Max+' '+OnKeyPress+' '+Evento+'="SalesUp.Variables.ActivaBuscarListaTexto({t:this, e:event, v:value, id:\''+IdTcp+'\', tcp:'+tcp+', indice:'+Indice+'});" type="text" name="a'+IdTcp+'" id="a'+IdTcp+'" /><i onclick="SalesUp.Variables.ActivaBuscarListaTexto({t:this, e:event, id:\''+IdTcp+'\',  tcp:'+tcp+', indice:'+Indice+'});" class="Pointer fa fa-search" style="top:5px;position:relative;margin:0 10px;"></i>');
          }

        }
      
      }/*if else tcp==5*/

      if($IdTcp){$IdTcp.focus();}
      
    } /* CargaFiltrosPersonalizados */


    function BuscarDatoCampoPersonalizado(t,e,v,tcp,Indice){
        var tEvento = e.type
        var Pasa = true;
        (tEvento == 'change') ? ActivaBusquedaCampoPersonalizado(v,Indice,'') : '';
        
        if(tEvento == 'keyup'){
            if(SalesUp.Sistema.NumKeyCode(e)==13){
                ActivaBusquedaCampoPersonalizado(v,Indice,'');
            }
        }

        if(tEvento == 'click'){
            if(v=='1'){
                v = $('#Tipo'+Indice).val();
                var da = $('#aTipo'+Indice).val();
                ActivaBusquedaCampoPersonalizado(v,Indice,da);
            }

            if(v=='0'){
                v = $('#Tipo'+Indice).val();
                ActivaBusquedaCampoPersonalizado(v,Indice,'');
            }
        }
    } /*BuscarDatoCampoPersonalizado*/

    function ActivaBusquedaCampoPersonalizado(v,i,da){
        var esDe = $('#FiltroTipo option:selected').attr('data-esDe');
        var tipocampo = $('#FiltroTipo option:selected').attr('data-tipocampo');
        
        var ti = SalesUp.Sistema.TiempoSolicitud();
        $.ajaxSetup({ 'beforeSend' : function(xhr) { xhr.overrideMimeType('text/html; charset=iso-8859-1'); } });
        $.ajax({async:false, cache: false, dataType: 'html',
            url : '/privado/filtros_guardar_personalizados.dbsp'+ti+'&b='+escape(v)+'&i='+i+'&da='+escape(da)+'&idven='+IdVentana+'&tc='+esDe+'&tipocampo='+tipocampo,
            success : function(Data){
                $('#ContenedorDetalle,#ContenedorDetalle2').html('');
                $('#FiltroTipo').val(0);
                var randomTime = new Date();
                Start = 1;
                ReloadData();
            }
        });
    }
    /* ActivaBusquedaCampoPersonalizado */
    SalesUp.Variables.OpcionesPersonalizables = function(Op){
        var id = parseInt(Op.id);
        var jsonFiltros = SalesUp.Variables.jsonFiltrosPersonalizados;

        jsonFiltros = _.where(jsonFiltros, {idCampo:id});
        var config = jsonFiltros[0].Config;
        if(config.indexOf('[')==-1){ config ='['+config+']';}
        return JSON.parse(config);

    }

    SalesUp.Variables.muestraSelectTemperatura = function(Op){
      var $t = $(Op.t);
      var id = Op.id.toString(), indice = Op.indice, htmlOpciones = '';
      var Opciones = SalesUp.Variables.OpcionesPersonalizables({id:id});

      for(var i = 0; i <= Opciones.length-1; i++){
        var o = Opciones[i];
        if(o.icono){
          htmlOpciones += '<span onclick="SalesUp.Variables.ActivaBuscarTemperatura({id:'+id+', v:\''+o.Opcion+'\', indice:\''+indice+'\' });" class="OpcionAcciones Pointer Ellipsis w100">';
          htmlOpciones += '<i style="color:'+o.color+' !important;" class="fa fa-lg '+o.icono+'"></i> ';
          htmlOpciones += o.Opcion;
          htmlOpciones += '</span>';
        }else{
          htmlOpciones += '<span onclick="SalesUp.Variables.valorTemperatura({id:'+id+', v:\'\' });" class="OpcionAcciones Pointer">'+o.Opcion+'</span>';
        }
      }
      SalesUp.Construye.popOver({Elemento:Op.t, PopOverLugar:'bottom', Contenido:htmlOpciones, Clases:'PopOverAcciones popup'});
    }/*muestraSelectTemperatura*/

    SalesUp.Variables.ActivaBuscarTemperatura = function(Op){
        var id = Op.id.toString(), v = Op.v, indice = Op.indice;
        var Opciones = SalesUp.Variables.OpcionesPersonalizables({id:id});
        var Opcion = _.where(Opciones, {Opcion:v});
        Opcion = JSON.stringify(Opcion[0]);
        ActivaBusquedaCampoPersonalizado(Opcion,indice,'');
    }/*ActivaBuscarTemperatura*/

    SalesUp.Variables.ActivaBuscarListaTexto = function(Op){
        var v = Op.v, indice = Op.indice, e=Op.e, id=Op.id, tEvento = e.type;
        var $s1 = $('#'+id), $s2 = $('#a'+id);
        var v = $s1.val()+'%'+$s2.val();
        if(tEvento == 'keyup'){
            if(SalesUp.Sistema.NumKeyCode(e)==13){
                ActivaBusquedaCampoPersonalizado(v,indice,'');
            }
        }

        if(tEvento == 'click'){
            ActivaBusquedaCampoPersonalizado(v,indice,'');
        }
    }/*ActivaBuscarPersonalizados*/

    $('#FiltroTipo2').live('change', function() {
        $('#ContenedorDetalle').html('<img src="/imagenes/loadingIconSmall.gif"  style="float:right;margin-top:5px;"/>');
        $('#ContenedorDetalle2').html(' ');
        var Tiposs = $('#FiltroTipo2').val();
        $('#ContenedorDetalle').load('ajax/filtro_metas_detalle.dbsp', {
            ajax : 1,
            tipo : Tiposs
        }, function() {
            if(Tiposs == 1) {
                $('#ejecutivos').change(function() {
                    var ejecutivo = $('#ejecutivos').val();
                    CambiaFiltroYear(ejecutivo, 0, 0, Tiposs);
                });
            };
            if(Tiposs == 2) {
                $('#grupos').change(function() {
                    var grupos = $('#grupos').val();
                    CambiaFiltroYear(0, grupos, 0, Tiposs);
                });
            };
            if(Tiposs == 0) {
                CambiaFiltroYear(0, 0, 0, Tiposs);
            };
        }).css('margin-left', '10px');
    });
    
    //---------------------------
    
    $('#FiltroTipoConversaciones').live('change', function() {
        var Tipo = $('#FiltroTipoConversaciones').val();
        var Tipo2 = $('#FiltroTipos').val();
        if (Tipo2== undefined)  Tipo2 = 4;
        var grupo = 1;
        SalesUp.Sistema.paginaActual({pagAct:1});
        var Start = 1, howmany = 50;
        if((Tipo == 1)&&(Tipo2 == 4)) {
            grupo = 1;
        }
        if((Tipo == 2)&&(Tipo2 == 4)) {
            grupo = 2;
        }
        if((Tipo == 3)&&(Tipo2 == 4)) {
            grupo = 3;
        }
        if((Tipo == 1)&&(Tipo2 == 5)) {
            grupo = 4;
        }
        if((Tipo == 2)&&(Tipo2 == 5)) {
            grupo = 5;
        }
        if((Tipo == 3)&&(Tipo2 == 5)) {
            grupo = 6;
        }
        CambiaFiltroConversaciones(grupo);
    });
    
    $('#FiltroClientesDestacados').live('change', function() {
            var pagina_actual = 'ajax/clientes_destacados_data.dbsp';
            var id1=$('#FiltroClientesDestacados').val();
            var id2=0;

            var randomTime = new Date();
            var fechastr_ini=$('#fecha_desde').val();
            var fechastr_fin=$('#fecha_hasta').val();       
            pagina_datos = pagina_actual + '?randomTime='+ randomTime.getTime() +'&fechadesde=' + fechastr_ini + '&fechahasta=' + fechastr_fin+'&tipo1='+id1+'&tipo2='+id2 ;
            ReloadData();
                setTimeout(function() {
                        ObtenerFiltroDatos(id1,id2);
                    }, 1000);   
    
         /*var id=$('#FiltroClientesDestacados').val();
         ObtenerFiltroDatos(id,0);*/    
         /*setTimeout(function() {
            FiltroClientesDestacados();
         }, 1000);*/
         
    });

    function FiltroClientesDestacados() {
            var pagina_actual = 'ajax/clientes_destacados_data.dbsp';
            var id1=$('#FiltroClientesDestacados').val();
            var id2=$('#FiltroClientesDestacadosDetalle').val();

            var randomTime = new Date();
            var fechastr_ini=$('#fecha_desde').val();
            var fechastr_fin=$('#fecha_hasta').val();       
            pagina_datos = pagina_actual + '?randomTime='+ randomTime.getTime() +'&fechadesde=' + fechastr_ini + '&fechahasta=' + fechastr_fin+'&tipo1='+id1+'&tipo2='+id2 ;
            ReloadData();
                setTimeout(function() {
                        ObtenerFiltroDatos(id1,id2);
                    }, 1000);
                            
    }
    
    $('#FiltroTipos').live('change', function() {
        var Tipo = $('#FiltroTipoConversaciones').val();
        var Tipo2 = $('#FiltroTipos').val();
        var grupo = 1;
        SalesUp.Sistema.paginaActual({pagAct:1});
        var Start = 1, howmany = 50;
        if((Tipo == 1)&&(Tipo2 == 4)) {
            grupo = 1;
        }
        if((Tipo == 2)&&(Tipo2 == 4)) {
            grupo = 2;
        }
        if((Tipo == 3)&&(Tipo2 == 4)) {
            grupo = 3;
        }
        if((Tipo == 1)&&(Tipo2 == 5)) {
            grupo = 4;
        }
        if((Tipo == 2)&&(Tipo2 == 5)) {
            grupo = 5;
        }
        if((Tipo == 3)&&(Tipo2 == 5)) {
            grupo = 6;
        }
        CambiaFiltroConversaciones(grupo);
    });
    
    //---------------------------


    $('#FiltroRapidoSucesos').live('change', function() {
        SalesUp.Sistema.paginaActual({pagAct:1});
        CambiaFiltroSucesos();
    });

    $('#FiltroRapidoSucesosEjecutivo').live('change', function() {
        SalesUp.Sistema.paginaActual({pagAct:1});
        CambiaFiltroSucesos();
    });
    
    $('#FiltroRapidoAyudaCategoria').live('change', function() {
        SalesUp.Sistema.paginaActual({pagAct:1});
        CambiaFiltroRapidoAyudaCategoria();
    });
    

    $('#FiltroSucesosTxt').live('keyup', function(e) {
        if(e.which == 13) {
            CambiaFiltroSucesos();
        }
    });

    $('#FiltroTipoUsuario').live('change', function() {
        SalesUp.Sistema.paginaActual({pagAct:1});
        var Tipo = $('#FiltroTipoUsuario').val();
        CambiaUsuario();

    });

    $('#FiltrorRecordatorioUsuario').live('change', function() {
        SalesUp.Sistema.paginaActual({pagAct:1});
        FiltrorRecordatorioUsuario();
    });
    /* anima el men£ de opciones */
    



    $('#mostrarOpsMult').live('click', function(){
        $('#opcionesMult').toggle('slow');
        $('#mostrarOpsMult').css('background-image', 'url("../estilos/icon-arrow-up.png")');
    });

    $('#opcionesMult').live('hover', function() {
        $('#mostrarOpsMult').css('background-image', 'url("../estilos/icon-arrow-up.png")');
    }, function() {
        $('#mostrarOpsMult').css('background-image', 'url("../estilos/icon-arrow-down.png")');
        /*$(this).hide();*/
    });

    $('#contenedor').click(function() {
        $('#opcionesMult').hide('slow');
        $('#mostrarOpsMult').css('background-image', 'url("../estilos/icon-arrow-down.png")');
    });
    /* seleccionar todos los resultados */
    var n = 0;

    function SeleccionarTodosLosRegistros(){
        if($('#selecc-todo').is(':checked')) {
            $('table.simple tbody tr').addClass('seleccionado');
            $('table.simple tbody tr td input[type=checkbox]').attr('checked', true);
            CambiarSeleccTodo();
        } else {
            $('table.simple tbody tr').removeClass('seleccionado');
            $('table.simple tbody tr td input[type=checkbox]').attr('checked', false);
            CambiarSeleccTodo();
        }
    }

    $('#selecc-todo-recordatorios').live('click', function() {
        if($(this).is(':checked')) {
            $('table.simple tbody tr.paraselec').addClass('seleccionado');
            $('table.simple tbody tr.paraselec td input[type=checkbox]').attr('checked', true);
            CambiarSeleccTodo();
        } else {
            $('table.simple tbody tr.paraselec').removeClass('seleccionado');
            $('table.simple tbody tr.paraselec td input[type=checkbox]').attr('checked', false);
            CambiarSeleccTodo();
        }
    });
    

    function CambiarSeleccTodo() {
        var num_checked = $('table.simple tbody tr td input:checked').length;
        if(num_checked == num_rows) {
            $('#selecc-todo').css('opacity', '1');
        } else if(num_checked == 0) {
            $('#selecc-todo').css('opacity', '1');
        } else {
            $('#selecc-todo').css('opacity', '0.5');
        }
    }

    /**** FUNCION PARA LAS ETIQUETAS*****/

    function Etq(idetiqueta) {
        document.location = 'segmentos_cargar.dbsp?idetiqueta=' + idetiqueta;
    }

    /***** FUNCIONES  PARA EL COMPOSE MAIL*****/

    function CorreoEnviado(destinatario) {

        var correo = "enviacorreo";
        var methods = {
            enviacorreo : function() {
                $.fallr('show', {
                    content : '<p><b>El correo a: ' + destinatario + ' </br> ha sido enviado.</b></p>',
                    width : '400px',
                    height : '150px',
                    autoclose : 3000,
                    icon : 'info',
                    closeKey : true,
                    position : 'center'
                });
            }
        };

        setTimeout(function(){ methods[correo].apply(this, [destinatario]); }, 1000);
    }

    function CrearPlantilla() {
        setTimeout(function() {
            document.location = 'sistema_plantillas_correos.dbsp';
        }, 1000);
    }

    /********ALTO DINAMICO**************/

    var HEIGHTINICIAL = 0;

    function ajustarinvitacion(alto) {
        
        $("#TB_iframeContent").animate({
            height : alto + 'px',
        });

        $("#TB_window").animate({
            marginTop : '-' + parseInt((alto / 2), 10) + 'px'
        });

         
    }

    function TamanioInicial() {
        HEIGHTINICIAL = $("#TB_iframeContent").innerHeight();
        
    }

    function TamanioDinamico(op, num) {
        var HEIGHT = $("#TB_iframeContent").innerHeight();

        if(op == 1) {
            TB_HEIGHT = HEIGHT + (26 * num);
        } else {
            TB_HEIGHT = HEIGHT - (26 * num);
        }

        if(TB_HEIGHT >= 630) {
            TB_HEIGHT = 630;
        }

        if(TB_HEIGHT <= HEIGHTINICIAL) {
            TB_HEIGHT = HEIGHTINICIAL;
        }

        $("#TB_iframeContent").animate({
            height : TB_HEIGHT + 'px',
        });

        $("#TB_window").animate({
            marginTop : '-' + parseInt((TB_HEIGHT / 2), 10) + 'px'
        });

    }


    function IraProspecto(idprospecto){
        document.location.href="prospectos-visualizar.dbsp?idprospecto="+idprospecto;
    }
    
    
    /***** FUNCIONES *****/
    
    

    function CambiaFiltro(){

        var datosSerializados = $('#frm_filtros').serialize();
        
        ($('#FiltroTipo').val()==21)?SalesUp.Sistema.EliminaConfigColumnas():'';

        $.ajax({ type : 'POST', url : 'filtros_guardar.dbsp',
            data : datosSerializados,
            success : function() {
                $('#ContenedorDetalle,#ContenedorDetalle2').html('');
                $('#FiltroTipo').val(0);
                var randomTime = new Date();
                Start = 1;
                ReloadData();
            }
        });

    }

    function CambiaFiltroSeguimiento() {
        var datosSerializados = $('#frm_filtros').serialize();
        var Tipo = $('#FiltroDetalle').val();

        var fecha = new Date();
        var dia = 0;
        var mes = 0;
        var anio = 0;
        var dianombre = 0;
        var fechastr_ini = '';
        var fechastr_fin = '';
        randomTime = new Date();
        dia = fecha.getDate();
        mes = fecha.getMonth() + 1;
        anio = fecha.getFullYear();
        dianombre = fecha.getDay();

        if(Tipo == 1) {/* Mismo dia*/
            fechastr_ini = fecchasys.today;
            fechastr_fin = fecchasys.today;
        }

        if(Tipo == 2) {/* Ayer */
            
            fechastr_ini = fecchasys.yesterday;
            fechastr_fin = fecchasys.yesterday;
            
        }

        if(Tipo == 3) {/* esta semana */
            
            fechastr_ini = fecchasys.firstdateweek;
            fechastr_fin = fecchasys.today;
            
        }

        if(Tipo == 4) {/* semana anterior */
            
            fechastr_ini = fecchasys.firstdatelastweek;
            fechastr_fin = fecchasys.lastdatelastweek;
                        
        }

        if(Tipo == 5) {/* este mes */
            
            fechastr_ini = fecchasys.fitstdate;
            fechastr_fin = fecchasys.lastdate;
            
        }
        if(Tipo == 6) {/* mes anterior */
            
            fechastr_ini = fecchasys.firstdatelastmonth;
            fechastr_fin = fecchasys.lastdatelastmonth;

        }

        if(Tipo == 7) {/* dos meses atras */
            
            fechastr_ini = fecchasys.firstdatetwolastmonth;
            fechastr_fin = fecchasys.lastdatetwolastmonth;  
        }
        
        if(Tipo == 13) {/* este mes */
            fechastr_ini=$('#fecha_desde').val(); 
            fechastr_fin = $('#fecha_hasta').val();;
        }
        Start = 1;
        datosSerializados = datosSerializados + '&fechadesde=' + fechastr_ini + '&fechahasta=' + fechastr_fin;
        $.ajax({
            type : 'POST',
            url : 'filtros_guardar.dbsp',
            data : datosSerializados,
            success : function() {
                ReloadData();
            }
        });     
                
    }
    function CambiaFiltroFechaAct() {
        var datosSerializados = $('#frm_filtros').serialize();
        $.ajax({
            type : 'POST',
            url : 'filtros_guardar.dbsp',
            data : datosSerializados,
            success : function() {

                $('#ContenedorDetalle,#ContenedorDetalle2').html('');
                $('#FiltroTipo').val(0);
                var randomTime = new Date();
                Start = 1;
                ReloadData();
            }
        });
    }

    function CambiaFiltro2() {
        var datosSerializados = $('#frm_filtros').serialize();
        $.ajax({
            type : 'POST',
            url : 'filtros_guardar.dbsp',
            data : datosSerializados,
            success : function() {
                $('#ContenedorDetalle,#ContenedorDetalle2').html('');
                $('#FiltroTipo2').val(0);
                var randomTime = new Date();
                Start = 1;
                ReloadData();
            }
        });
    }

    function CambiaFiltroSucesos() {
        var datosSerializados = $('#frm_filtros').serialize();
        var Tipo_s = $('#FiltroRapidoSucesos').val();
        var Tipo_usr = $('#FiltroRapidoSucesosEjecutivo').val();
        var tmp_txt = $('#FiltroSucesosTxt').val();
        var Tipo_txt = $.trim(tmp_txt);
        var Longitud_txt = Tipo_txt.length
        var pagina_actual = 'ajax/reporte_sucesos_data.dbsp';
        var randomTime = new Date();
        var Start = 1, howmany = 50;
        if(Longitud_txt > 0) {
            pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start + '&tipo_s=' + Tipo_s + '&tipo_usr=' + Tipo_usr + '&tipo_txt=' + Tipo_txt;
        } else {
            pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start + '&tipo_s=' + Tipo_s + '&tipo_usr=' + Tipo_usr + '&tipo_txt=0';
        }
        ReloadData();
    }
    function CambiaFiltroRapidoAyudaCategoria() {
        var datosSerializados = $('#frm_filtros').serialize();
        var Tipo_c= $('#FiltroRapidoAyudaCategoria').val();
        var pagina_actual = 'ajax/resultados-busqueda-ayuda-data.dbsp';
        var randomTime = new Date();
        var Start = 1, howmany = 15;
        pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start + '&categoria_lista=' + Tipo_c;
        ReloadData();
    }
;


    function CambiaFiltroConversaciones(grupo) {
        var datosSerializados = $('#frm_filtros').serialize();
        var randomTime = new Date();
        Start = 1;
        document.location='reportes_conversiones.dbsp?randomTime='+ randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start + '&fecha_desde=' + 0 + '&fecha_hasta=' + 0 + '&grupo=' + grupo;
        
    }

    function CambiaUsuario() {
        var datosSerializados = $('#frm_filtros').serialize();
        datosSerializados = datosSerializados + '&FiltroDetalle=' + $('#FiltroTipoUsuario').val();
        $.ajax({
            type : 'POST',
            url : 'filtros_guardar.dbsp',
            data : datosSerializados,
            success : function() {
                $('#ContenedorDetalle,#ContenedorDetalle2').html('');
                $('#FiltroTipoUsuario').val(0);
                var randomTime = new Date();
                Start = 1;
                ReloadData();
            }
        });

    }

    /***** FUNCIONES exlusiva para algunos reportes *****/
    function CambiaFiltroOpc() {
        var datosSerializados = $('#frm_filtros').serialize();
        var Subtipo = $('#FiltroDetalleOpc').val();
        

        $.ajax({
            type : 'POST',
            url : 'filtros_eliminar_ventas.dbsp?todos=0',
            data : datosSerializados
        });     
        
        $.ajax({
            type : 'POST',
            url : 'filtros_guarda_reportes_cobradas.dbsp',
            data : datosSerializados,
            success : function() {
                $('#ContenedorDetalle,#ContenedorDetalle2').html('');
                $('#FiltroTipo').val(0);
                var randomTime = new Date();
                if(Subtipo == 1) {
            var pagina_actual = 'ajax/reportes_ventas_cobradas_data.dbsp';
            }
            if(Subtipo == 2) {
                var pagina_actual = 'ajax/reportes_ventas_cobradas_grupos.dbsp';
            }
            if(Subtipo == 3) {
                var pagina_actual = 'ajax/reportes_ventas_cobradas_lineas_data.dbsp';
            }
            if(Subtipo == 4) {
                var pagina_actual = 'ajax/reportes_ventas_cobradas_origen.dbsp';
            }
            if(Subtipo == 5) {
                var pagina_actual = 'ajax/reportes_ventas_cobradas_pais.dbsp';
            }
            if(Subtipo == 6) {
                var pagina_actual = 'ajax/reportes_ventas_cobradas_region.dbsp';
            }
            if(Subtipo == 7) {
                var pagina_actual = 'ajax/reportes_ventas_cobradas_ciudad.dbsp';
            }
                pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start;
                ReloadData();
            }
        });

    }
    
    

    function CambiaFiltroOpcYear() {
        var datosSerializados = $('#frm_filtros').serialize();
        var Start = 1, howmany = 50;
        var Subtipo = $('#FiltroDetalleOpc').val();
        var randomTime = new Date();
        if(Subtipo == 1) {
            var pagina_actual = 'ajax/reportes_ventas_cobradas_data.dbsp';
        }
        if(Subtipo == 2) {
            var pagina_actual = 'ajax/reportes_ventas_cobradas_grupos.dbsp';
        }
        if(Subtipo == 3) {
            var pagina_actual = 'ajax/reportes_ventas_cobradas_lineas_data.dbsp';
        }
        if(Subtipo == 4) {
            var pagina_actual = 'ajax/reportes_ventas_cobradas_origen.dbsp';
        }
        if(Subtipo == 5) {
            var pagina_actual = 'ajax/reportes_ventas_cobradas_pais.dbsp';
        }
        if(Subtipo == 6) {
            var pagina_actual = 'ajax/reportes_ventas_cobradas_region.dbsp';
        }
        if(Subtipo == 7) {
            var pagina_actual = 'ajax/reportes_ventas_cobradas_ciudad.dbsp';
        }
        
        $.ajax({
            type : 'POST',
            url : 'filtros_eliminar_ventas.dbsp?todos=1',
            data : datosSerializados
        });     

        $.ajax({
            type : 'POST',
            url : 'filtros_guardar.dbsp',
            data : datosSerializados,
            success : function() {
                var randomTime = new Date();
                Start = 1;
                pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start;
                ReloadData();
            }
        });
    }

    function CambiaFiltroOpcVentas() {
        var datosSerializados = $('#frm_filtros').serialize();
        var Subtipo = $('#FiltroDetalleOpcVentas').val();
        
        $.ajax({
            type : 'POST',
            url : 'filtros_eliminar_ventas.dbsp?todos=0',
            data : datosSerializados
        });

        $.ajax({
            type : 'POST',
            url : 'filtros_guarda_reportes_ventas.dbsp',
            data : datosSerializados,
            success : function() {
                $('#ContenedorDetalle,#ContenedorDetalle2').html('');
                $('#FiltroTipo').val(0);
                var randomTime = new Date();
                if(Subtipo == 1) {
                    var pagina_actual = 'ajax/reportes_ventas_data.dbsp';
                }
                if(Subtipo == 2) {
                    var pagina_actual = 'ajax/reportes_ventas_grupos.dbsp';
                }
                if(Subtipo == 3) {
                    var pagina_actual = 'ajax/reportes_ventas_lineas.dbsp';
                }
                if(Subtipo == 4) {
                    var pagina_actual = 'ajax/reportes_ventas_origen.dbsp';
                }
                if(Subtipo == 5) {
                    var pagina_actual = 'ajax/reportes_ventas_pais.dbsp';
                }
                if(Subtipo == 6) {
                    var pagina_actual = 'ajax/reportes_ventas_region.dbsp';
                }
                if(Subtipo == 7) {
                    var pagina_actual = 'ajax/reportes_ventas_ciudad.dbsp';
                }
                pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start;
                ReloadData();
            }
        });
    }
        
    
    //

    function CambiaFiltroVentasYear() {
        var datosSerializados = $('#frm_filtros').serialize();
        var Start = 1, howmany = 50;
        var Subtipo = $('#FiltroDetalleOpcVentas').val();
        var randomTime = new Date();
                if(Subtipo == 1) {
                    var pagina_actual = 'ajax/reportes_ventas_data.dbsp';
                }
                if(Subtipo == 2) {
                    var pagina_actual = 'ajax/reportes_ventas_grupos.dbsp';
                }
                if(Subtipo == 3) {
                    var pagina_actual = 'ajax/reportes_ventas_lineas.dbsp';
                }
                if(Subtipo == 4) {
                    var pagina_actual = 'ajax/reportes_ventas_origen.dbsp';
                }
                if(Subtipo == 5) {
                    var pagina_actual = 'ajax/reportes_ventas_pais.dbsp';
                }
                if(Subtipo == 6) {
                    var pagina_actual = 'ajax/reportes_ventas_region.dbsp';
                }
                if(Subtipo == 7) {
                    var pagina_actual = 'ajax/reportes_ventas_ciudad.dbsp';
                }
        $.ajax({
            type : 'POST',
            url : 'filtros_eliminar_ventas.dbsp?todos=1',
            data : datosSerializados
        });
        

        $.ajax({
            type : 'POST',
            url : 'filtros_guardar.dbsp',
            data : datosSerializados,
            success : function() {
                var randomTime = new Date();
                Start = 1;
                pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start;
                ReloadData();
            }
        });
    }

    function CambiaFiltroVentasYear2() {
        var datosSerializados = $('#frm_filtros').serialize();
        var Start = 1, howmany = 50;
        var Subtipo = $('#FiltroDetalleOpcVentas').val();
        var randomTime = new Date();
        if(Subtipo == 1) {
            var pagina_actual = 'ajax/ventas-reporte-data.dbsp';
        }
        if(Subtipo == 2) {
            var pagina_actual = 'ajax/reportes_ventas_grupos.dbsp';
        }
        if(Subtipo == 3) {
            var pagina_actual = 'ajax/reportes_ventas_lineas.dbsp';
        }
        if(Subtipo == 4) {
            var pagina_actual = 'ajax/reportes_ventas_origen.dbsp';
        }
        if(Subtipo == 5) {
            var pagina_actual = 'ajax/reportes_ventas_pais.dbsp';
        }
        if(Subtipo == 6) {
            var pagina_actual = 'ajax/reportes_ventas_region.dbsp';
        }
        if(Subtipo == 7) {
            var pagina_actual = 'ajax/reportes_ventas_ciudad.dbsp';
        }
        $.ajax({
            type : 'POST',
            url : 'filtros_eliminar.dbsp?todos=1',
            data : datosSerializados
        });

        $.ajax({
            type : 'POST',
            url : 'filtros_guardar.dbsp',
            data : datosSerializados,
            success : function() {
                var randomTime = new Date();
                Start = 1;
                pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start;
                ReloadData();
            }
        });
    }

    function CambiaFiltroYear(ejecutivo, grupos, globales, tiposs) {
        var Start = 1, howmany = 50;
        var anio = $('#anio_seleccionado').val();
        var activas = $('#activas').val();
        //var tipo = $('#tipo').val();
        var randomTime = new Date();
        var pagina_actual = 'ajax/metas_data.dbsp?anio_seleccionado=' + anio + '&ejecutivos=' + ejecutivo + '&activas=' + activas + '&tiposs=' + tiposs + '&grupos=' + grupos + '&globales=' + globales;
        var randomTime = new Date();
        Start = 1;
        pagina_datos = pagina_actual + '&randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start;
        ReloadData();
    }

    function CambiaFiltroOpcEstimacion() {

        var datosSerializados = $('#frm_filtros').serialize();

        $.ajax({
            type : 'POST',
            url : 'filtros_eliminar.dbsp?todos=1',
            data : datosSerializados
        });

        var Subtipo = $('#FiltroDetalleOpcEstimacion').val();

        $.ajax({
            type : 'POST',
            url : 'filtros_guardar_reportes.dbsp',
            data : datosSerializados,
            success : function() {
                $('#ContenedorDetalle,#ContenedorDetalle2').html('');
                $('#FiltroTipo').val(0);
                var randomTime = new Date();
                var Start = 1, howmany = 50;
                if(Subtipo == 8) {
                    var pagina_actual = 'ajax/reportes_presupuesto_ventas_probabilidad_data.dbsp';
                }
                if(Subtipo == 1) {
                    var pagina_actual = 'ajax/reportes_presupuesto_ventas_ejecutivo_data.dbsp';
                }
                if(Subtipo == 2) {
                    var pagina_actual = 'ajax/reportes_presupuesto_ventas_grupos_data.dbsp';
                }
                if(Subtipo == 3) {
                    var pagina_actual = 'ajax/reportes_presupuesto_ventas_lineas_data.dbsp';
                }
                if(Subtipo == 4) {
                    var pagina_actual = 'ajax/reportes_presupuesto_ventas_origen_data.dbsp';
                }
                if(Subtipo == 5) {
                    var pagina_actual = 'ajax/reportes_presupuesto_ventas_pais_data.dbsp';
                }
                if(Subtipo == 6) {
                    var pagina_actual = 'ajax/reportes_presupuesto_ventas_region_data.dbsp';
                }
                if(Subtipo == 7) {
                    var pagina_actual = 'ajax/reportes_presupuesto_ventas_ciudad_data.dbsp';
                }
                pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start+'&idgrupo='+0;
                ReloadData();
            }
        });
    }
    

    function CambiaFiltroOpcSinSeguimiento() {
        var datosSerializados = $('#frm_filtros').serialize();
        $.ajax({
            type : 'POST',
            url : 'filtros_eliminar.dbsp?todos=1',
            data : datosSerializados
        });

        var Subtipo = $('#FiltroDetalleOpcSinSeguimiento').val();
        $.ajax({
            type : 'POST',
            url : 'filtros_guardar_reportes.dbsp',
            data : datosSerializados,
            success : function() {
                $('#ContenedorDetalle,#ContenedorDetalle2').html('');
                $('#FiltroTipo').val(0);
                var randomTime = new Date();
                var Start = 1, howmany = 50;
                if(Subtipo == 1) {
                    var pagina_actual = 'ajax/reportes_sin_seguimiento_ejecutivo_data.dbsp';
                }
                if(Subtipo == 2) {
                    var pagina_actual = 'ajax/reportes_sin_seguimiento_grupos_data.dbsp';
                }
                if(Subtipo == 3) {
                    var pagina_actual = 'ajax/reportes_sin_seguimiento_lineas_data.dbsp';
                }
                if(Subtipo == 4) {
                    var pagina_actual = 'ajax/reportes_sin_seguimiento_origen_data.dbsp';
                }
                if(Subtipo == 5) {
                    var pagina_actual = 'ajax/reportes_sin_seguimiento_pais_data.dbsp';
                }
                if(Subtipo == 6) {
                    var pagina_actual = 'ajax/reportes_sin_seguimiento_region_data.dbsp';
                }
                if(Subtipo == 7) {
                    var pagina_actual = 'ajax/reportes_sin_seguimiento_ciudad_data.dbsp';
                }
                pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start;
                ReloadData();
            }
        });

    }
    
    
    function CambiaFiltroOpcPendientes() {
        var datosSerializados = $('#frm_filtros').serialize();
        $.ajax({
            type : 'POST',
            url : 'filtros_eliminar.dbsp?todos=1',
            data : datosSerializados
        });
        var Subtipo = $('#FiltroDetalleOpcPendientes').val();
        $.ajax({
            type : 'POST',
            url : 'filtros_guardar_reportes.dbsp',
            data : datosSerializados,
            success : function() {
                $('#ContenedorDetalle,#ContenedorDetalle2').html('');
                $('#FiltroTipo').val(0);
                var randomTime = new Date();
                var Start = 1, howmany = 50;
                if(Subtipo == 1) {
                    var pagina_actual = 'ajax/reporte_cobros_pendientes_ejecutivo_data.dbsp';
                }
                if(Subtipo == 2) {
                    var pagina_actual = 'ajax/reporte_cobros_pendientes_grupo_data.dbsp';
                }
                if(Subtipo == 3) {
                    var pagina_actual = 'ajax/reporte_cobros_pendientes_lineas_data.dbsp';
                }
                if(Subtipo == 4) {
                    var pagina_actual = 'ajax/reporte_cobros_pendientes_origen_data.dbsp';
                }
                if(Subtipo == 5) {
                    var pagina_actual = 'ajax/reporte_cobros_pendientes_pais_data.dbsp';
                }
                if(Subtipo == 6) {
                    var pagina_actual = 'ajax/reporte_cobros_pendientes_region_data.dbsp';
                }
                if(Subtipo == 7) {
                    var pagina_actual = 'ajax/reporte_cobros_pendientes_ciudad_data.dbsp';
                }
                pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start;
                ReloadData();
            }
        });
    }
    

    function CambiaFiltroPeriodoFecha() {
        $('#ContenedorDetalle,#ContenedorDetalle2').html('');
        $('#FiltroTipoUsuario').val(0);
        var randomTime = new Date();
        Start = 1;
        pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start;
        ReloadData();

    }


    $('#FiltroDetallePeriodoFechaTxt').keyup(function(e) {
        if(e.which == 13) {
            CambiaFiltroPeriodoFecha();
        }
    });

    $('#FiltroRecordatorioTXT').live('keyup', function(e) {

        if(e.which == 13) {

            var datosSerializados = $('#frm_filtros').serialize();
            var pagina_actual = 'ajax/recordatorios-data.dbsp';
            $('#ContenedorDetalle,#ContenedorDetalle2').html('');
            var Tipo = $('#FiltrorRecordatorioUsuario').val();
            var periodo = $('#FiltroRecordatorioFecha').val();
            var txt = $('#FiltroRecordatorioTXT').val();
            var randomTime = new Date();
            var Start = 1, howmany = 50;
            if(txt != '') {
                pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start + '&usuario=' + Tipo + '&FILTROPERIODO=' + periodo + '&busqueda=' + txt;
            } else {
                pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start + '&usuario=' + Tipo + '&FILTROPERIODO=' + periodo;
            }
            ReloadData();
        }

    });
    
        $('#BuscarRecordatorio').live('click',function() {
            var datosSerializados = $('#frm_filtros').serialize();
            var pagina_actual = 'ajax/recordatorios-data.dbsp';
            $('#ContenedorDetalle,#ContenedorDetalle2').html('');
            var Tipo = $('#FiltrorRecordatorioUsuario').val();
            var periodo = $('#FiltroRecordatorioFecha').val();
            var txt = $('#FiltroRecordatorioTXT').val();
            var randomTime = new Date();
            var Start = 1, howmany = 50;
            if(txt != '') {
                pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start + '&usuario=' + Tipo + '&FILTROPERIODO=' + periodo + '&busqueda=' + txt;
            } else {
                pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start + '&usuario=' + Tipo + '&FILTROPERIODO=' + periodo;
            }
            ReloadData();
    });
    
    
    function FiltrorRecordatorioUsuario() {
        var Tipo = $('#FiltrorRecordatorioUsuario').val();
        var periodo = $('#FiltroRecordatorioFecha').val();
        var txt = $('#FiltroRecordatorioTXT').val();
        $('#FiltrorRecordatorioUsuario').val(0);
        var randomTime = new Date();
        var Start = 1, howmany = 50;
        var pagina_actual = 'ajax/recordatorios-data.dbsp';
        pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start + '&usuario=' + Tipo + '&FILTROPERIODO=' + periodo ;
        
        ReloadData();
    }

    /***** Filtro por fechas, hoy, ayer, esta semana... *****/

    $('#FiltroRapido').live('change', function() {
        var datosSerializados = $('#frm_filtros').serialize();
        $('#ContenedorDetalle,#ContenedorDetalle2').html('');
        var Tipo = $('#FiltroRapido').val();
        var periodo = $('#FiltroRecordatorioFecha').val();
        $('#FiltroRapido').val(0);
        var fecha = new Date();
        var dia = 0;
        var mes = 0;
        var anio = 0;
        var dianombre = 0;
        var fechastr_ini = '';
        var fechastr_fin = '';
        randomTime = new Date();
        dia = fecha.getDate();
        mes = fecha.getMonth() + 1;
        anio = fecha.getFullYear();
        dianombre = fecha.getDay();

        if(Tipo == 1) {/* Mismo dia*/
            
            fechastr_ini = fecchasys.today;
            fechastr_fin = fecchasys.today;

        }

        if(Tipo == 2) {/* Ayer */
            
            fechastr_ini = fecchasys.yesterday;
            fechastr_fin = fecchasys.yesterday;
        }

        if(Tipo == 3) {/* esta semana */
            
            fechastr_ini = fecchasys.firstdateweek;
            fechastr_fin = fecchasys.today;     
        }

        if(Tipo == 4) {/* semana anterior */
            
            fechastr_ini = fecchasys.firstdatelastweek;
            fechastr_fin = fecchasys.lastdatelastweek;          
        }

        if(Tipo == 5) {/* este mes */
            
            fechastr_ini = fecchasys.fitstdate;
            fechastr_fin = fecchasys.lastdate;      
        }

        if(Tipo == 6) {/* mes anterior */
            
            fechastr_ini = fecchasys.firstdatelastmonth;
            fechastr_fin = fecchasys.lastdatelastmonth;         
        }
        Start = 1;
        $('#fecha_desde').val(fechastr_ini);
        $('#fecha_hasta').val(fechastr_fin);
        datosSerializados = datosSerializados + '&fechadesde=' + fechastr_ini + '&fechahasta=' + fechastr_fin;

        $.ajax({
            type : 'POST',
            url : 'filtros_eliminar.dbsp?todos=1',
            data : datosSerializados
        });
        $.ajax({
            type : 'POST',
            url : 'filtros_guardar_reportes_fecha.dbsp',
            data : datosSerializados,
            success : function() {
                ReloadData();
            }
        });

    });

    $('#FiltroRecordatorioFecha').live('change', function() {
        var datosSerializados = $('#frm_filtros').serialize();
        var pagina_actual = 'ajax/recordatorios-data.dbsp';
        $('#ContenedorDetalle,#ContenedorDetalle2').html('');
        var Tipo = $('#FiltroRecordatorioFecha').val();
        var user = $('#usuario').val();
        //$('#FiltroRecordatorioFecha').val(0);
        var fecha = new Date();
        var dia = 0;
        var mes = 0;
        var anio = 0;
        var dianombre = 0;
        var fechastr_ini = '';
        var fechastr_fin = '';
        randomTime = new Date();
        dia = fecha.getDate();
        mes = fecha.getMonth() + 1;
        anio = fecha.getFullYear();
        dianombre = fecha.getDay();

        if(Tipo == 1) {/* Mismo dia*/
            
            fechastr_ini = fecchasys.today;
            fechastr_fin = fecchasys.today;
        }

        if(Tipo == 2) {/* Ayer */
            
            fechastr_ini = fecchasys.yesterday;
            fechastr_fin = fecchasys.yesterday;
        }

        if(Tipo == 3) {/* esta semana */
            
           fechastr_ini = fecchasys.firstdateweek;
            fechastr_fin = fecchasys.today;
        }

        if(Tipo == 4) {/* semana anterior */
            
            fechastr_ini = fecchasys.firstdatelastweek;
            fechastr_fin = fecchasys.lastdatelastweek;  
        }

        if(Tipo == 5) {/* este mes */
            
            fechastr_ini = fecchasys.fitstdate;
            fechastr_fin = fecchasys.lastdate;  
        }

        if(Tipo == 6) {/* mes anterior */
            
            fechastr_ini = fecchasys.firstdatelastmonth;
            fechastr_fin = fecchasys.lastdatelastmonth;
        }

        if(Tipo == 7) {/* dos meses atras */
            
            fechastr_ini = fecchasys.firstdatetwolastmonth;
            fechastr_fin = fecchasys.lastdatetwolastmonth;
        }

        if(Tipo == 8) {/* Todos */
            
            fechastr_ini = fecchasys.allfirstdate;
            fechastr_fin = fecchasys.alllastdate;

        }
        
        if(Tipo == 9) {/* Este a¤o */
            
            fechastr_ini = fecchasys.allfirstdate;
            fechastr_fin = fecchasys.lastdateyear;

        }

        if(Tipo == 10) {/* futuros */
            
            fechastr_ini = fecchasys.today;
            fechastr_fin = fecchasys.alllastdate;

        }       
        SalesUp.Sistema.paginaActual({pagAct:1});
        Start = 1;
        datosSerializados = datosSerializados + '&fechadesde=' + fechastr_ini + '&fechahasta=' + fechastr_fin;
        $.ajax({
            type : 'POST',
            url : 'filtros_eliminar.dbsp?todos=1',
            data : datosSerializados
        });

        $.ajax({
            type : 'POST',
            url : 'filtros_guardar_recordatorio.dbsp',
            data : datosSerializados,
            success : function() {
                ReloadData();
            }
        });


    });

    /** FILTROS REPORTE GEOLOCALIZACION SEGUIMIENTOS **/

    function CambiaFiltroOpcSeguimientos(){
        var valor = $('#FiltroDetalleOpcSeguimientos2').val();
        var datosSerializados = $('#frm_filtros').serialize();

        $.ajax({
            type : 'POST',
            url : 'filtros_eliminar.dbsp',
            data : datosSerializados
        }); 

        $.ajax({
            type : 'POST',
            url : 'filtros_guarda_reportes_seggeo.dbsp',
            data : datosSerializados,
            success : function() {
                $('#ContenedorDetalle,#ContenedorDetalle2').html('');
                $('#FiltroTipo').val(0);
                var randomTime = new Date();
            
                var pagina_actual = 'ajax/reporte_localizacion_seguimientos_data.dbsp';
                pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&Start=' + Start;
                ReloadData();
            }
        });
        
        
    }

    function CambiaFiltroOpcSeg(){
        if($('#FiltroDetalleOpcSeguimientos').val()==2){
            $('.filtrosEjecutivos').css('display','none');
            $('.filtrosGrupos').css('display','block');
        }else{
            $('.filtrosEjecutivos').css('display','block');
            $('.filtrosGrupos').css('display','none');
        }
    }

    function CambiaFiltroFechaSeg(){
        var Tipo = $('#filtroFecha').val();
        var fechastr_ini = '';
        var fechastr_fin = '';

        if(Tipo == 1) {/* Mismo dia*/
            fechastr_ini = fecchasys.today;
            fechastr_fin = fecchasys.today;

        }

        if(Tipo == 2) {/* Ayer */
            fechastr_ini = fecchasys.yesterday;
            fechastr_fin = fecchasys.yesterday;
        }

        if(Tipo == 3) {/* esta semana */
            fechastr_ini = fecchasys.firstdateweek;
            fechastr_fin = fecchasys.today;     
        }

        if(Tipo == 4) {/* semana anterior */
            fechastr_ini = fecchasys.firstdatelastweek;
            fechastr_fin = fecchasys.lastdatelastweek;          
        }

        if(Tipo == 5) {/* este mes */
            fechastr_ini = fecchasys.fitstdate;
            fechastr_fin = fecchasys.lastdate;      
        }

        if(Tipo == 6) {/* mes anterior */
            fechastr_ini = fecchasys.firstdatelastmonth;
            fechastr_fin = fecchasys.lastdatelastmonth;         
        }

        if($('#filtroFecha').val()!=7){
            $('.fechafiltro').css('display','none');
            $('#fecha_desde').val(fechastr_ini);
            $('#fecha_hasta').val(fechastr_fin);
        }else{
            $('.fechafiltro').css('display','block');
        }
    }

    /** FIN FILTROS REPORTE GEOLOCALIZACION SEGUIMIENTOS **/
    
    function ir(){
        setTimeout(function() {
            document.location='sistema_seguimiento_categorias.dbsp';
        }, 1000);
    }


/******** Funciones de Filtros nuevos *********/


SalesUp.Variables.accionesFiltros = function(Op){
    var t = Op.t, $t = $(t);
    var FiltroTipo = Op.tipo;
    var FiltroDetalle = Op.valor;
    var negativo = Op.negativo;
    var rel = Op.rel;


    var $p = $t.parent();
    var htmlAcciones = '';
    if(FiltroTipo == 20 && negativo == 0){
        htmlAcciones += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.cambiaEstadoFiltro({FiltroTipo:'+FiltroTipo+',FiltroDetalle:'+FiltroDetalle+',negativo:1,rel:'+rel+'})">'+
        '<i class="fa fa-lg fa-minus"></i> Que no contenga la etiqueta'+
        '</span>';
    }
    else if(FiltroTipo == 20 && negativo == 1){
        htmlAcciones += '<span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.cambiaEstadoFiltro({FiltroTipo:'+FiltroTipo+',FiltroDetalle:'+FiltroDetalle+',negativo:0,rel:'+rel+'})">'+
        '<i class="fa fa-lg fa-plus"></i> Que contenga la etiqueta'+
        '</span>';
    }
    htmlAcciones += ''+
    '<span class="OpcionAcciones Pointer" onclick="SalesUp.Variables.eliminarFiltro('+rel+');">'+
    '<i class="fa fa-lg fa-times"></i> Quitar filtro'+
    '</span>';
    
    var accionesMenu = function(){
        SalesUp.Construye.popOver({Elemento:t, PopOverLugar:'top', Contenido:htmlAcciones, Clases:'PopOverAcciones'});
    };
    accionesMenu();
}/*accionesRow*/




SalesUp.Variables.eliminarFiltro = function(idfiltro){
    
    $('#idusuariofiltro').val(idfiltro);
    var datosSerializados = $('#frm_filtros').serialize();
    SalesUp.Sistema.paginaActual({pagAct:1});
    Start = 1;
    ($(this).html()=='Descartado')?SalesUp.Sistema.EliminaConfigColumnas():'';
    SalesUp.Sistema.paginaActual({pagAct:1});
    Start = 1;
    $('.tipsy').remove();
    SalesUp.Sistema.PostData({Link:'filtros_eliminar.dbsp', Parametros:datosSerializados, Funcion:'ReloadData' });
}


SalesUp.Variables.cambiaEstadoFiltro = function(Op){
    var FiltroTipo = Op.FiltroTipo;
    var FiltroDetalle = Op.FiltroDetalle;
    var negativo = Op.negativo;
    var rel = Op.rel;   
    $('#idusuariofiltro').val(rel);
    var datosSerializados = $('#frm_filtros').serialize();
    SalesUp.Sistema.paginaActual({pagAct:1});
    Start = 1;
    ($(this).html()=='Descartado')?SalesUp.Sistema.EliminaConfigColumnas():'';
    SalesUp.Sistema.paginaActual({pagAct:1});
    Start = 1;
    $('.tipsy').remove();
    SalesUp.Sistema.PostData({Link:'filtros_eliminar.dbsp', Parametros:datosSerializados });
    
    var datosSerializados = 'idpantalla='+IdVentana+'&FiltroTipo='+FiltroTipo+'&FiltroDetalle='+FiltroDetalle+'&negativo='+negativo+'';


    ($('#FiltroTipo').val()==21)?SalesUp.Sistema.EliminaConfigColumnas():'';


    $.ajax({ type : 'POST', url : 'filtros_guardar.dbsp',
        data : datosSerializados,
        success : function() {
            $('#ContenedorDetalle,#ContenedorDetalle2').html('');
            $('#FiltroTipo').val(0);
            var randomTime = new Date();
            Start = 1;
            ReloadData();
        }
    });
}


/******** Fin Funciones de Filtros nuevos *********/