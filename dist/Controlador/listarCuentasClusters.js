 
        SalesUp.Variables.TkEmpresa=$("#tke").val();      
        var templateHead = '<tr style="margin-top:2px"><td width="2%"></td><td class="">Cuenta</td ><td class="tCen">Supervisor</td><td class="tCen"> Identificador</td><td class="tCen">Nivel</td><td></td></tr>';
        var template = '';
        template += '<tr>';
        template +='<td class="tCen">{{nFila}}</td>';
        template += '<td class="" > <span class="Pointer" onclick="SalesUp.Variables.EditarEmpresa({ tke:\''+SalesUp.Variables.TkEmpresa+'\', tk:\'{{TK}}\' });">{{COMPANIA}}</span></td>';
        template +='<td class="tCen">{{NOMBRE}}</td>';
        template +='<td class="tCen">{{IDENTIFICADOR}}</td>';
        template +='<td class="tCen">{{NIVEL}}</td>';
        template +='<td class="tCen">';
        if(SalesUp.Variables.session_nivel==1){
          template +='<span id="{{IDCUENTA}}" onclick ="SalesUp.Variables.EliminarCuenta({tk:\'{{TK}}\' });" class="Pointer eliminar"><i class="fa fa-trash" > </i></span>';
        }
        template +='</td>';
        template += '</tr>';
        var jsonLtcp;
        tkcluster=$("#tkCluster").val();
  SalesUp.Variables.CamposData = function(){
      var control = SalesUp.Sistema.queControl();
      jsonLtcp = SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/clusters/get/jsonListarEmpresasClusters.dbsp', Parametros:'tkcluster='+tkcluster, DataType:'json'});
      jsonLtcp = jsonLtcp.jsonDatos;
      SalesUp.Construye.ConstruyeTabla(templateHead, template, jsonLtcp, {Destino:'#DatosEmpresa', Id:'LtTablaPersonalizables'} );
      var botones  = '<div class="clear"></div><div class="BoxBotonesAccion">'; 
     if(SalesUp.Variables.session_nivel == 1){
        var html='';
            html+='<div class="clear"></div>';
            html+='<div class="BoxBotones">';
            html+='<span  class="Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar" id="BtnAceptar" onclick="SalesUp.Variables.AgregarCuenta(\''+SalesUp.Variables.TkEmpresa+'\');">';
            html+='<i class="fa fa-plus"></i> Asignar cuenta';
            html+='</span>';
            html+=' <span  class="Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar" id="BtnAceptar" onclick="SalesUp.Variables.regresar();">';
            html+='<i class="fa fa-arrow-circle-o-left"></i> Regresar';
            html+='</span>';
            html+='</div>'; //BoxBotones
            html+='';//<div class="clear"></div>'); 
            //botones += '<button type="button" class="Pointer Btn Btn-rounded Btn-small Btn-flat-Aceptar" id="BtnAceptar" onclick="SalesUp.Variables.AgregarCuenta(\''+SalesUp.Variables.TkEmpresa+'\');"><i class="fa fa-plus"></i> Asignar cuenta</button>  ';   
     }
    $('#DatosEmpresa').append(html);  

}/*SalesUp.Variables.CamposData*/
SalesUp.Variables.regresar=function(){
  document.location.href='clusters-catalogo.dbsp';
}
SalesUp.Variables.EliminarCuenta= function (Op){
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

SalesUp.Variables.CallbackEliminarCuenta=function(){
  var control = SalesUp.Sistema.queControl();
  data=SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/clusters/get/jsonEliminarEmpresasClusters.dbsp', Parametros:'tk='+Op.tk, DataType:'json'});
  SalesUp.Variables.CamposData();
}

}//Fin EliminarCuenta

SalesUp.Variables.AgregarCuenta = function(_tke){
  //document.location.href='popup_agregar_cuenta.dbsp?tke=' + _tke+'&tkc=0&tkcluster='+tkcluster
    SalesUp.Sistema.AbrePopUp({
    Parametros  : 'tke=' + _tke+'&tkc=0'+'&tkcluster2='+tkcluster,
    Titulo    : 'Asignar cuenta', 
    Pagina    : 'popup_agregar_cuenta.dbsp', 
    CallBack  : 'SalesUp.Variables.CreaInterfaz', 
    Modal     :true, ModalAlt : true, Alto:290, Ancho:600
  });
};

SalesUp.Variables.EditarEmpresa= function(Op){
    //document.location.href='popup_agregar_cuenta.dbsp?tke=' + Op.tke+'&tkcluster='+tkcluster+'&tkc='+Op.tk
    SalesUp.Sistema.AbrePopUp({
      Parametros  : 'tke=' + Op.tke+'&tkcluster='+tkcluster+'&tkc='+Op.tk,
      Titulo      : 'Editar cuenta', 
      Pagina      : 'popup_agregar_cuenta.dbsp', 
      CallBack    : 'SalesUp.Variables.CreaInterfaz', 
      Modal       :true, ModalAlt : true, Alto:290, Ancho:600
    });
}

  


//==================================
  SalesUp.Variables.CamposData();

//==================================


