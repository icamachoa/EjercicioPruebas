SalesUp.Variables.LinkData = function(){
  SalesUp.Sistema.BorrarTodoAlmacen()
  var jsonLtcp = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonLinksExterno.dbsp', DataType:'json'});
  jsonLtcp = jsonLtcp.jsonDatos;
  var template = SalesUp.Sistema.CargaDatos({Link:'Vista/TemplateLinksExternos.dbsp', Almacen:'HtmlPermisos' });
  var templateHead = '<tr><td style="width: 1%" class="centrado"></td><td >Link externo</td><td >Personas</td><td >Grupos</td><td class="centrado acciones ancho" style="width:80px !important;"></td></tr>';
  SalesUp.Construye.ConstruyeTabla(templateHead, template, jsonLtcp, {Destino:'#DatosLoad', Id:'LtTablaPermisos'/*, Callback:JsProspectos, PagActual:PagAct, NumRegistros:nRegistros*/ } );

}/*SalesUp.Variables.CamposData*/

SalesUp.Variables.EditarPermisos = function(Op){
        SalesUp.Sistema.AbrePopUp({
            Titulo: 'Permisos',
            Pagina: 'PopUpLiksExternosUsuarios.dbsp',
            Parametros: 'accion=1&tk='+Op.tk,
            CallBack: 'SalesUp.Variables.LinkData',
            Modal:true, ModalAlt : true, Alto:210, Ancho:650
        });
}
    
SalesUp.Variables.NuevoPermisos = function(Op){
        SalesUp.Sistema.AbrePopUp({
            Titulo: 'Permisos',
            Pagina: 'PopUpLiksExternosUsuarios.dbsp',
            Parametros: 'accion='+Op.accion+'&tk='+Op.tk,
            CallBack: 'SalesUp.Variables.LinkData',
            Modal:true, ModalAlt : true, Alto:210, Ancho:650
        });
}

SalesUp.Variables.AtrasPermisos = function(){
       window.location.href = "inicio.dbsp"; 
}


$(function(){ SalesUp.Variables.LinkData(); });
