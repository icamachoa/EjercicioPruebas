  SalesUp.Variables.TemplateOpcionTitulos = '<option value="{{IdTitulo}}">{{Titulo}}</option>';
  SalesUp.Variables.TemplateOpcionFase = '<option value="{{IdFase}}">{{Fase}}</option>';
  SalesUp.Variables.TemplateOpcionOrigen = '<option value="{{IdOrigen}}">{{Origen}}</option>';
  SalesUp.Variables.TemplateOpcionPaises = '<option value="{{IdPais}}" {{#if Seleccionado}}selected="selected"{{/if}}>{{Pais}}</option>';
  SalesUp.Variables.TemplateOpcionEstados = '<option value="{{IdEstado}}" {{#if Seleccionado}}selected="selected"{{/if}}>{{Estado}}</option>';
  SalesUp.Variables.TemplateOpcionIndustria = '<option value="{{IdIndustria}}" {{#if Seleccionado}}selected="selected"{{/if}}>{{Industria}}</option>';
  SalesUp.Variables.TemplateOpcionPersonalizado = '<option value="{{IdOpcion}}">{{Opcion}}</option>';
  SalesUp.Variables.TemplateOpcionSexo='<option value="{{IdOpcion}}">{{Opcion}}</option>';
  
  SalesUp.Variables.SeleccionaCampo = function(Op){
    var $DivBox = $('#DivBox'+Op.IdCampo);
    var $CheckObligatorio = $('#CheckObligatorio'+Op.IdCampo);
    var $Elemento = $(Op.Elemento);
    var Activo = $Elemento.is(':checked');
    var Obligatorio = $CheckObligatorio.is(':checked');
    var n = $('#TbCamposDisponibles tbody tr').index( $Elemento.parent().parent() );
    var tCampo = Op.IdCampo.substring(0, 2);
    var json = _.where(SalesUp.Variables.jsonUnidos, { Id: Op.IdCampo }); 
    json = json[0];
    
    SinAsterisco = SalesUp.Sistema.StrReplace('*','',$('#DivBox'+Op.IdCampo+' label').html());
    (Obligatorio) ? $('#DivBox'+Op.IdCampo+' label').html(SinAsterisco+'*') : $('#DivBox'+Op.IdCampo+' label').html( SinAsterisco );
    
    if(Activo){
      $DivBox.show();
      json.Obligatorio = Obligatorio;
      SalesUp.Variables.Campos.push(json);
    }else{
      $DivBox.hide();
    }

  }; /* /SalesUp.Variables.SeleccionaCampo */

  /*JSON.stringify(SalesUp.Variables.Campos)*/

  SalesUp.Variables.CargarEstados = function(Op){
    SalesUp.Variables.PaisDefault = Op.Pais;
    (!Op.Estado)? SalesUp.Variables.EstadoDefault = '':'';
    (SalesUp.Variables.ObligatorioEstado) ? SalesUp.Variables.EstadoDefault = '' : '';
    $('#CS-19').html('');
    SalesUp.Variables.jsonEstados = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonEstados.dbsp', Parametros:'pd='+SalesUp.Variables.PaisDefault+'&edo='+SalesUp.Variables.EstadoDefault, DataType:'json', Div:0 });
    SalesUp.Construye.ConstruyemeUn({
      Control: 'select', Nuevo: false,
      SeleccioneOpcion: SalesUp.Variables.ObligatorioEstado, IdControl: 'CS-19',
      Template: SalesUp.Variables.TemplateOpcionEstados,
      Datos: SalesUp.Variables.jsonEstados.jsonDatos
    });
  }; /* /SalesUp.Variables.CargarEstados */


  SalesUp.Variables.RecorreCamposMarcados = function(){
    SalesUp.Variables.Campos = [];
    $('.Check').each(function(){
      var $Elemento = $(this);
      SalesUp.Variables.SeleccionaCampo({ Elemento: $Elemento, IdCampo: $Elemento.attr('IdCampo') });
    });
  };

  var TagIdCampo = "'{{Id}}'";
  var TrTituloCampos = '<tr><th>Campos disponibles</th><th>Obligatorio</th><th></th></tr>';
  var TrCampos = '';
  var TrCampos = TrCampos + '<tr> ';
  var TrCampos = TrCampos + ' <td class="parametro"><input IdCampo="{{Id}}" id="Check-{{Id}}" class="Check" type="checkbox" name="{{Campo}}" onclick="SalesUp.Variables.RecorreCamposMarcados();"/> <span>{{Campo}}</span></td>';
  var TrCampos = TrCampos + ' <td><div><label class="switch-light switch-candy "><input type="checkbox" id="CheckObligatorio{{Id}}" onclick="SalesUp.Variables.RecorreCamposMarcados();" /><span><span><i class="fa fa-tiimes"></i></span><span><i class="fa fa-check"></i></span></span><a></a></label></div></td>';
  var TrCampos = TrCampos + ' <td class="sortear"><span tip="Arrastrar para ordenar" class="IconoBoton zip8 Pointer"><i class="fa fa-bars"></i></span></td>';
  var TrCampos = TrCampos + ' </tr>';


  $(function() {
    SalesUp.Variables.jsonCamposSistema = SalesUp.Sistema.CargaDatos({ Link:'Modelo/jsonIntegracionCamposSistema.dbsp', DataType:'json', Div:0 });
    SalesUp.Variables.jsonCamposPersonalizados = SalesUp.Sistema.CargaDatos({ Link:'Modelo/jsonIntegracionCamposPersonalizados.dbsp', DataType:'json', Div:0 });
    SalesUp.Variables.HtmlFormulario = SalesUp.Sistema.CargaDatos({ Link:'Vista/TemplateFormularios.dbsp', Div:0 });

    SalesUp.Variables.jsonTitulos = SalesUp.Sistema.CargaDatos({ Link:'Modelo/jsonTitulos.dbsp', DataType:'json', Div:0 });
    SalesUp.Variables.jsonFases = SalesUp.Sistema.CargaDatos({ Link:'Modelo/jsonFases.dbsp', Parametros:{TF:SalesUp.Variables.EsCliente}, DataType:'json', Div:0 });
    SalesUp.Variables.jsonOrigen = SalesUp.Sistema.CargaDatos({ Link:'Modelo/jsonOrigen.dbsp', DataType:'json', Div:0 });
    SalesUp.Variables.jsonPaises = SalesUp.Sistema.CargaDatos({ Link:'Modelo/jsonPaises.dbsp', Parametros:{pd:SalesUp.Variables.PaisDefault}, DataType:'json', Div:0 });
    SalesUp.Variables.jsonIndustria = SalesUp.Sistema.CargaDatos({ Link:'Modelo/jsonIndustria.dbsp', DataType:'json', Div:0 });
    SalesUp.Variables.jsonSexo={"jsonDatos":[{"value":"M","Opcion":"Mujer"},{"value":"H","Opcion":"Hombre"}]};
    SalesUp.Variables.jsonEstados=SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonEstados.dbsp', Parametros:'pd='+SalesUp.Variables.PaisDefault+'&edo='+SalesUp.Variables.EstadoDefault, DataType:'json', Div:0 }).jsonDatos;
    SalesUp.Variables.jsonUnidos = _.union(SalesUp.Variables.jsonCamposSistema.jsonDatos, SalesUp.Variables.jsonCamposPersonalizados.jsonDatos);
    
    SalesUp.Construye.ConstruyeTabla(TrTituloCampos, TrCampos, SalesUp.Variables.jsonUnidos, { Destino:'#TbCampos', Id:'TbCamposDisponibles' } );
    
    SalesUp.Construye.ReemplazaTemplate({
      Template: SalesUp.Variables.HtmlFormulario,
      Destino: '#ArmaContacto',
      Datos: SalesUp.Variables.jsonUnidos
    });
    
    $('#TbCamposDisponibles').addClass('TablaDragDrop');

    /* - Titulo - */
    SalesUp.Construye.ConstruyemeUn({
      Control: 'select', Nuevo: false,
      SeleccioneOpcion: false, IdControl: 'CS-4',
      Template: SalesUp.Variables.TemplateOpcionTitulos, 
      Datos: SalesUp.Variables.jsonTitulos.jsonDatos
    });

    /* - Fase - */
    SalesUp.Construye.ConstruyemeUn({
      Control: 'select', Nuevo: false,
      SeleccioneOpcion: false, IdControl: 'CS-21',
      Template: SalesUp.Variables.TemplateOpcionFase, 
      Datos: SalesUp.Variables.jsonFases.jsonDatos
    });

    /* - Origen - */
    SalesUp.Construye.ConstruyemeUn({
      Control: 'select', Nuevo: false,
      SeleccioneOpcion: false,  IdControl: 'CS-20',
      Template: SalesUp.Variables.TemplateOpcionOrigen,
      Datos: SalesUp.Variables.jsonOrigen.jsonDatos
    });

    /* - Paises - */  //tenía 18  
    SalesUp.Construye.ConstruyemeUn({
      Control: 'select', Nuevo: false, IdControl: 'CS-18',
      Template: SalesUp.Variables.TemplateOpcionPaises,
      Datos: SalesUp.Variables.jsonPaises.jsonDatos
    });
    /*Pais*/
    SalesUp.Construye.ConstruyemeUn({
      Control: 'select', Nuevo: false, IdControl: 'CS-29',
      Template: SalesUp.Variables.TemplateOpcionPaises,
      Datos: SalesUp.Variables.jsonPaises.jsonDatos
    });
    /*Estado*/
    SalesUp.Construye.ConstruyemeUn({
      Control: 'select', Nuevo: false, IdControl: 'CS-30',
      Template: SalesUp.Variables.TemplateOpcionEstados,
      Datos: SalesUp.Variables.jsonEstados
    });
    /* - Industria - */
    SalesUp.Construye.ConstruyemeUn({
      Control: 'select', Nuevo: false,
      SeleccioneOpcion: false, IdControl: 'CS-22',
      Template: SalesUp.Variables.TemplateOpcionIndustria,
      Datos: SalesUp.Variables.jsonIndustria.jsonDatos
    });

    /*- Sexo -*/
    SalesUp.Construye.ConstruyemeUn({
      Control: 'select', Nuevo: false,
      SeleccioneOpcion: false, IdControl: 'CS-5',
      Template: SalesUp.Variables.TemplateOpcionSexo,
      Datos: SalesUp.Variables.jsonSexo.jsonDatos
    });
    SalesUp.Variables.CargarEstados({Pais:SalesUp.Variables.PaisDefault, Estado:SalesUp.Variables.EstadoDefault});

    $('select[idcampoper]').each(function(){
      
      SalesUp.Variables.IdCampo = $(this).attr('idcampoper');
      SalesUp.Variables.IdPersonalizable = $(this).attr('id');
      SalesUp.Variables.ObligatorioOpcion = false;
      
      SalesUp.Variables.jsonOpciones = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonOpcionesPersonalizados.dbsp', Parametros:{ IdCampo:SalesUp.Variables.IdCampo }, DataType:'json', Div:0 });

      SalesUp.Construye.ConstruyemeUn({
        Control: 'select', Nuevo: false,
        IdControl: SalesUp.Variables.IdPersonalizable,
        Template: SalesUp.Variables.TemplateOpcionPersonalizado, 
        Datos: SalesUp.Variables.jsonOpciones.jsonDatos
      });
      
    });


    $('#ArmaContacto .BoxInfo').hide();

    $('#Check-CS-1, #Check-CS-2, #Check-CS-6, #Check-CS-17').attr('checked',true);
    $('#Check-CS-1, #Check-CS-2, #Check-CS-6, #Check-CS-17').parent().parent().addClass('seleccionado');
    $('#CheckObligatorioCS-1, #CheckObligatorioCS-6').attr('checked',true);
    $('#DivBoxCS-1, #DivBoxCS-2, #DivBoxCS-6, #DivBoxCS-17').show();

    
    SalesUp.Variables.CamposDefault = [];
    SalesUp.Variables.Clone = [];

    $('input.Check[checked]').each(function(){
      $Elemento = $(this);
      var Index = $Elemento.parent().parent().index();
      
      SalesUp.Variables.CamposDefault.push($Elemento.parent().parent().clone());
      SalesUp.Variables.Clone.push($('#ArmaContacto div').eq(Index).clone());
      
      $('#ArmaContacto div').eq(Index).remove();
      $Elemento.parent().parent().remove();
      
    });
    
    
    for (var i = SalesUp.Variables.CamposDefault.length - 1; i >= 0; i--) {
      $('#TbCamposDisponibles tbody').prepend(SalesUp.Variables.CamposDefault[i]);
    }

    for (var i = SalesUp.Variables.Clone.length - 1; i >= 0; i--){
      $('#ArmaContacto').prepend(SalesUp.Variables.Clone[i]);
    }
    
    $('#TbCamposDisponibles tbody').attr('id','TbSorteable');
    
    SalesUp.Variables.RecorreCamposMarcados();

    $('#TbSorteable tr').removeClass('zebra');
    SalesUp.Sistema.IniciaPlugins();
    
    $("#TbSorteable").sortable({
      placeholder: 'DragRow',
      start: function( event, ui ){
        var Index = $(ui.item).index();
        $('#TbSorteable .DragRow').append('<td colspan="3"></td>');
        $('#TbSorteable tr').addClass('RowDark');
        $(ui.item).removeClass('RowDark');
        $('#TbSorteable tr').removeClass('zebra');
        SalesUp.Variables.MueveEste = $('#ArmaContacto div').eq(Index).clone();
        $('#ArmaContacto div').eq(Index).remove();
      },
      stop: function( event, ui ){
        var Index = $(ui.item).index();
        $('#TbSorteable tr').removeClass('RowDark');
        SalesUp.Variables.RecorreCamposMarcados();
        $('#ArmaContacto div').eq(Index).before(SalesUp.Variables.MueveEste);
        SalesUp.Sistema.IniciaPlugins();
      }
    });

    $('#Overlay').remove();

  }); /* /Fin ready */
