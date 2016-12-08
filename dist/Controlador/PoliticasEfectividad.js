var control = SalesUp.Sistema.queControl();

SalesUp.Variables.obtienePoliticas = function(){
  var TemplateDatos = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateRowPoliticasEfectividad.dbsp', Almacen:'htmlPoliticasEfectividad' }); 
  var jPoliticas = SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/politicas/get/ObtienePoliticas.dbsp', Parametros:'tke='+SalesUp.Variables.sTke, DataType:'json'}); 
  if(jPoliticas.error!='0'){return false;}
  var NombreCampos = '<tr><td style="width:30px;"></td><td class="tCen"> > Inferior</td><td class="tCen"><= Superiror</td><td class="tCen">Factor</td><td style="width:40px;"></td></tr>';

  SalesUp.Construye.ConstruyeTabla( NombreCampos, TemplateDatos, jPoliticas.datos, { Destino:'#BoxPoliticas', Id:'LtPoliticas' } );
  
  $('#AgregarPolitica').show();
  $('#NoMasPoliticas').hide();
  
  if(_.size(jPoliticas.datos)>=10){
    $('#AgregarPolitica').hide();
    $('#NoMasPoliticas').show();
  }
  
}

SalesUp.Variables.NuevaPolitica = function(Op){
  var editar = '';
  var tk=(Op.tk) ? Op.tk: ''; 
  var parametros='tk='+tk;
  
  SalesUp.Sistema.AbrePopUp({
    Titulo:'Nueva política',
    Pagina:'PopupNuevaPolitica.dbsp', Parametros:parametros,
    Modal:true, ModalAlt:true, Alto:130, Ancho:400,
    CallBack:'SalesUp.Variables.obtienePoliticas'
  });
}

SalesUp.Variables.AlertaEliminarPolitica = function(Op){
    var tk=(Op.tk) ? Op.tk : '' ;
  SalesUp.Construye.MuestraAlerta({
    TipoAlerta:'AlertaPregunta',
    Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/>¿Está seguro de eliminar la política?',
    Boton1:'<i class="fa fa-trash"></i>',
    Boton2:'Cancelar',
    Callback1: 'SalesUp.Variables.EliminarPolitica({tk:\''+tk+'\'})',
    Icono1:'Si, eliminar ',
    Icono2:'<i class="fa fa-times"></i>',
    Ancho:'500px'
  });
}

SalesUp.Variables.EliminarPolitica = function(Op){
  var tk=(Op.tk) ? Op.tk : '';
  SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/politicas/put/EliminarPolitica.dbsp', Parametros:'tk='+tk});
  SalesUp.Variables.obtienePoliticas();
}

SalesUp.Variables.obtienePoliticas();  

