        //self.parent.SalesUp.Sistema.CambiaCambiarTamanioPopUp({Alto:190, Ancho:600});        
        var templateHead = '<tr><td class="tCen">No</td><td class="">Cuenta</td><td>Acciones</td></tr>';
        var template = '';
        template += '<tr>';
        template +='<td class="tCen">{{nFila}}</td>';
        template += '<td class="Pointer  Tip6 " tip="Editar Empresa" onclick="SalesUp.Variables.EditarEmpresa({ cl:\'{{TKE}}\' })">{{COMPANIA}}xxxx</td>';
        //template += '<td class="" > <span class="Pointer" onclick="SalesUp.Variables.MostrarCuentasEmpresas({ cl:\'{{TK}}\' });">{{CUENTAS}}</span></td>';
        //template += '<td class="tCen" ><span class="Pointer" onclick="SalesUp.Variables.popup_agregar_ubicacion(\'{{TK}}\')">{{UBICACIONES}} </span></td>';
        template += '<td class="tCen"><span class="Pointer" onclick="SalesUp.Variables.EliminarCuenta({ tk:\'{{TK}}\' });"><i class="fa fa-lg fa-trash-o Tip6" tip="Eliminar Cuenta"></i></span></td>';  //id para eliminar
        template += '</tr>';
        var jsonLtcp;
        tkcluster=$("#tkCluster").val();// recibo el valor al crear el poup(me lo envia el padre.. y realizo la consulta a la bd)
        SalesUp.Variables.Tke=$("#tke").val();
  SalesUp.Variables.CamposData = function(){
      jsonLtcp = SalesUp.Sistema.CargaDatos({Link:'https://control.salesup.com.mx/canalizaciones/clusters/get/jsonListarEmpresasClusters.dbsp', Parametros:'tkcluster='+tkcluster, DataType:'json'});
      jsonLtcp = jsonLtcp.jsonDatos;
      SalesUp.Construye.ConstruyeTabla(templateHead, template, jsonLtcp, {Destino:'#DatosEmpresa', Id:'LtTablaPersonalizables'} );
      var botones  = '<div class="clear"></div><div class="BoxBotonesAccion">';   
     //if(SalesUp.Variables.session_nivel == 1){
      botones += '<button type="button" class="Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar" id="BtnAceptar" onclick="SalesUp.Variables.AgregarCuenta(\''+SalesUp.Variables.Tke+'\');"><i class="fa fa-plus"></i> Asignar cuenta</button>  ';   
    // }
     //botones += '</div><div class="clear"></div>'; 
     //botones += '<span  class="Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar" id="BtnAceptar" onclick="SalesUp.Variables.NuevoCluster({ cl:\'0\' })"><i class="fa fa-plus"></i> Agregar cluster</span>  ';   
    // botones += '  <span  class="Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar" id="BtnAceptar" onclick="SalesUp.Variables.ConfigCalculo()"><i class="fa fa-refresh"></i> Cálculo Automático</span>  ';   
    // botones += '</div><div class="clear"></div>';   
    $('#DatosEmpresa').append(botones);  
    //$('b.EditarCp[onclick]').removeAttr('onclick');
    //$('span.EliminarCp').remove();
  
    //SalesUp.Sistema.IniciaPlugins();
}/*SalesUp.Variables.CamposData*/
SalesUp.Variables.EliminarCuenta=function(Op){
   SalesUp.Variables.tk=Op.tk;
   SalesUp.Construye.MuestraAlerta({
          TipoAlerta:'AlertaPregunta',
          Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/> Está seguro de eliminar la Cuenta?',
          Boton1:'Aceptar',
          Boton2:'Cancelar',
          Callback1: 'SalesUp.Variables.CallbackEliminarCuenta',
          Icono1:'<i class="fa fa-trash"></i>',
          Icono2:'<i class="fa fa-times"></i>',
          Ancho:'500px'
            });

}//Fin EliminarCuenta

SalesUp.Variables.CallbackEliminarCuenta=function(){
  
}

SalesUp.Variables.AgregarCuenta = function(_tke){
  //document.location.href='popup_agregar_cuenta.dbsp?tke=' + _tke+'&tkc=0'
  SalesUp.Sistema.AbrePopUp({
    Parametros  : 'tke=' + _tke+'&tkc=0',
    Titulo    : 'Asignar cuenta', 
    Pagina    : 'popup_agregar_cuenta.dbsp', 
    CallBack  : 'SalesUp.Variables.CreaInterfaz', 
    Modal     :true, ModalAlt : true, Alto:190, Ancho:600
  });
        
};

SalesUp.Variables.EditarEmpresa= function(Op){
    var tke=Op.tke;
    SalesUp.Sistema.AbrePopUp({
    Parametros  : '',
    Titulo    : 'Editar Cuenta', 
    Pagina    : 'popupEditarCuentaCluster.dbsp', 
    CallBack  : '', 
    Modal     :true, ModalAlt : true, Alto:80, Ancho:220
  });
}
//==================================
  SalesUp.Variables.CamposData();
//==================================

