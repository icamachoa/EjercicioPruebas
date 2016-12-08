Handlebars.registerHelper('PermisosAdicionales', function(permisosextra,permisos) {
    var permisosAdicionales = JSON.parse(SalesUp.Sistema.Encript({cadena:permisosextra,tipo:'decode'}));
    var permisosTXT         = '';

    if(permisosAdicionales.precio == 1){
      permisosextra = 'Permite editar precio.';
    }

    if(permisosextra != ''){
      permisosextra = permisosextra +'</br>';
    }

    if(permisosAdicionales.cambio == 1){
      permisosextra = permisosextra + 'Permite editar tipo de cambio.';
    }

    return permisosextra;
});

SalesUp.Variables.CamposData = function(){
  SalesUp.Sistema.BorrarTodoAlmacen()
  var jsonLtcp = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonPermisosModulos.dbsp', DataType:'json', Parametros:'tku='+SalesUp.Variables.tku});
  jsonLtcp = jsonLtcp.jsonDatos;
  var template = SalesUp.Sistema.CargaDatos({Link:'Vista/TemplatePermisosModulo.dbsp', Almacen:'HtmlPermisos' });
  var templateHead = '<tr><td style="width: 1%" class="centrado"></td><td >Modulo</td><td >Detalles</td><td class="centrado acciones ancho" style="width:80px !important;"></td></tr>';
  SalesUp.Construye.ConstruyeTabla(templateHead, template, jsonLtcp, {Destino:'#DatosLoad', Id:'LtTablaPermisos'/*, Callback:JsProspectos, PagActual:PagAct, NumRegistros:nRegistros*/ } );

}/*SalesUp.Variables.CamposData*/

SalesUp.Variables.EditarPermisos = function(Op){
        SalesUp.Sistema.AbrePopUp({
            Titulo: 'Permisos',
            Pagina: 'PopUpPermisosUsuarios.dbsp',
            Parametros: 'accion=1&tku='+Op.tku+'&idmodulo='+Op.idmodulo,
            CallBack: 'SalesUp.Variables.CamposData',
            Modal:true, ModalAlt : true, Alto:210, Ancho:650
        });
}
    
SalesUp.Variables.NuevoPermisos = function(Op){
        SalesUp.Sistema.AbrePopUp({
            Titulo: 'Permisos',
            Pagina: 'PopUpPermisosUsuarios.dbsp',
            Parametros: 'accion=0&tku='+Op.tku+'&idmodulo=0',
            CallBack: 'SalesUp.Variables.CamposData',
            Modal:true, ModalAlt : true, Alto:210, Ancho:650
        });
}

SalesUp.Variables.AtrasPermisos = function(){
       window.location.href = "sistema_integrantes.dbsp"; 
}

SalesUp.Variables.ElimarPermiso = function(Op){
  SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/qryEliminarPermisosModulos.dbsp', Parametros:'idpermiso='+Op.idpermiso});
  SalesUp.Variables.CamposData();
}

SalesUp.Variables.ConfirmarEliminarPermiso = function(Op){
  SalesUp.Construye.MuestraAlerta({
    TipoAlerta:'AlertaPregunta',
    Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/> ¿Desea eliminar este permiso?',
    Boton1:'Eliminar',
    Boton2:'Cancelar',
    Callback1:'SalesUp.Variables.ElimarPermiso({idpermiso:'+Op.idpermiso+'})',
    Icono1:'<i class="fa fa-trash"></i>',
    Icono2:'<i class="fa fa-times"></i>',
    Ancho:'500px'
  });
}

$(function(){ SalesUp.Variables.CamposData(); });
