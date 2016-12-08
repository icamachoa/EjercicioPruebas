var Catalogo=function(){

    this.MostrarNuevo=function(Op){
       var $Elemento=(Op.t)?$(Op.t):''; 
       var actualizar=(Op.a>=0)? Op.a :''; 
       var tk=(Op.tk>'')?Op.tk:'';
       var descripcion=(Op.d)?Op.d:''; 
       var params=(Op.params)?Op.params:''; 
       var pagina=(actualizar==0)? SalesUp.Paginas.PaginaNuevo : SalesUp.Paginas.PaginaEditar;
           pagina='/privado/'+pagina+'?actualizar='+actualizar+'&tk='+tk+'&descripcion='+descripcion+'&params='+params;
       var titulo=(actualizar==0) ? SalesUp.Titulos.TituloNuevo : SalesUp.Titulos.TituloEditar ;
       var callBack='SalesUp.DatosCatalogo.MostrarInformacion';
       var alto=(Op.alto)?Op.alto:'100'; 
       var ancho=(Op.ancho)?Op.ancho:'450';
       SalesUp.Construye.MuestraPopUp({
            titulo:titulo, 
            centrado:false,
            fuente:pagina,  
            callback:callBack,
            alto:alto+'px', 
            ancho:ancho+'px', 
        });
    }
    this.CargarDatosCatalogo=function(Op){
        var url=(Op.url)?Op.url:''; 
        var pagActual=(Op.PagActual)? Op.PagActual:1; 
        var HowMany=(Op.HowMany)?Op.HowMany:50; 
        var inicio=(Op.inicio)?Op.inicio:1; //*HowMany+1;
        var templateDatos=(Op.templateDatos)?Op.templateDatos:''; 
        var destino= (Op.destino)?Op.destino:'#DatosLoad'; 
        var idContenedor=(Op.idContenedor)? Op.idContenedor:''; //Poner por defecto el nombre de la página del catalogo.
        var parametros='inicio='+pagActual+'&howmany='+HowMany; 
        var jsonDatos=SalesUp.Sistema.CargaDatos({Link:url, Parametros:parametros, DataType:'json'});
        var NombreCampos=SalesUp.Sistema.CargaDatos({Link:templateDatos, Parametros:'thead=1',Div:0});
        var TemplateDatos=SalesUp.Sistema.CargaDatos({Link:templateDatos, Parametros:'thead=0', Div:0});
        var Total = _.size(jsonDatos.jsonDatos);
        SalesUp.Construye.ConstruyeTabla(NombreCampos, TemplateDatos, jsonDatos.jsonDatos, {Destino:destino, Id:idContenedor, PagActual:pagActual, NumRegistros:Total});
    }
    this.GuardarCambiosNuevoCatalogo=function(Op){
        var $frm=$(Op.t);
        var pasa=SalesUp.Valida.ValidaObligatorios({DentroDe:$frm, DestinoMsj:'.BoxBotonesAccion'});
        if(pasa){
            SalesUp.Construye.GuardarPopUp({t:$('#BtnAceptar')}); 
        }
    }
    this.GuardarConEnter=function(Op){
        var e=(Op.e)?Op.e:'';
        var t=(Op.t)?Op.t:'';
        if(SalesUp.Sistema.NumKeyCode(e) === 13){
          this.GuardarCambiosNuevoCatalogo({t:t});
        }
    }
    this.GuardarCambiosEliminarCatalogo=function(Op){
        var $frm=$(Op.t);
        var pasa=SalesUp.Valida.ValidaObligatorios({DentroDe:$frm, DestinoMsj:'.BoxBotonesAccion'});
        if(pasa){
          SalesUp.Construye.GuardarPopUp({t:$('#BtnAceptar')}); 
        }
    }
    this.BuscarRelacionEnCatalogo=function(Op){
        var tk=(Op.tk)?Op.tk:''; 
        var pagina=(Op.pagina)?Op.pagina:''; 
            pagina=pagina;
        var totalRelacion=0; 
        totalRelacion=SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/'+pagina, Parametros:'tk='+tk ,DataType:'json'});
        totalRelacion=_.reject(totalRelacion.jsonDatos, function(j){return _.size(j)==0;}); 
        return totalRelacion;
    }
    this.EliminacionDirecta = function(Op){
      SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/'+SalesUp.Paginas.PaginaEliminarSinRelacion, Parametros:'tk='+Op.tk,DataType:'html'});
      SalesUp.DatosCatalogo.MostrarInformacion();
    };
    this.AlertaEliminarCatalogo = function(Op){
        $Elemento = $(Op.e);
        var Pregunta = $Elemento.attr('data-q');
        var tk = $Elemento.attr('data-tk');
        var tipo=(Op.tipo) ? Op.tipo : ''; 
        var callback=(Op.callback) ? Op.callback : 'SalesUp.DatosCatalogo.MostrarInformacion';
        var alto=(Op.alto)?Op.alto:100;
        var ancho =(Op.ancho) ? Op.ancho :300; 
        var esCatProductos=(Op.Catprod) ? Op.Catprod : false; 
        var Funcion = (Op.Corp) ? Op.Corp :  (esCatProductos) ? 'SalesUp.Catalogo.EliminarCatalogoProductos' : 'SalesUp.Catalogo.EliminarCatalogo';
        var pagina=(esCatProductos) ? SalesUp.Paginas.PaginaEliminarCatProductos :SalesUp.Paginas.PaginaEliminar;

        SalesUp.Construye.MuestraAlerta({
          TipoAlerta:'AlertaPregunta',
          Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> '+Pregunta+'',
          Boton1:'Sí, eliminar',
          Boton2:'Cancelar',
          Callback1: Funcion+'({tk:\''+tk+'\', p:\''+pagina+'\', alto:'+alto+',ancho:'+ancho+', callback:SalesUp.DatosCatalogo.MostrarInformacion})',
          Icono1:'<i class="fa fa-trash"></i>',
          Icono2:'',
          Ancho:'500px'
        });
    }
    this.EliminarCatalogoProductos=function(Op){
      var pagina= (Op.p)? Op.p:''; 
      var tk = (Op.tk) ? Op.tk : ''; 
      var callback=(Op.callback) ? Op.callback : ''; 
      SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/'+pagina, Parametros:'tk='+tk,DataType:'html'});
      //if(callback){
        //callback();
        SalesUp.DatosCatalogo.MostrarInformacion();
      //}
    }
    this.EliminarCatalogo=function(Op){
     var    relacion=(Op.rel)?Op.rel:'';
     var    tk=(Op.tk)?Op.tk:''; 
     var    titulo=SalesUp.Titulos.TituloEliminar;
     var    pagina='/privado/'+SalesUp.Paginas.PaginaEliminar+'?tk='+tk;
     var    alto=(Op.alto)?Op.alto:80;
     var    ancho=(Op.ancho)?Op.ancho:250;
     var    callBack=(Op.callback)? Op.callback: false;
     var    total=this.BuscarRelacionEnCatalogo({pagina:SalesUp.Paginas.PaginaRelacion, tk:tk});
            total=total[0].total;
     if(total>0){
        SalesUp.Construye.MuestraPopUp({
         titulo:titulo, 
         centrado:false,
         fuente:pagina,  
         callback:'SalesUp.DatosCatalogo.MostrarInformacion',
         alto:alto+'px', 
         ancho:ancho+'px', 
        });
        SalesUp.DatosCatalogo.MostrarInformacion();
      }else{
        var x=SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/'+SalesUp.Paginas.PaginaEliminarSinRelacion, Parametros:'tk='+tk+'&bandera=1', DataType:'json'});
        // if(callBack){
        //    callback();
        // }

        //SE COMENTA LA FUNCION CALLBACK POR QUE MARCA ERROR. 09/FEB716
        SalesUp.DatosCatalogo.MostrarInformacion();
      }
    }
    this.PaginaSiguiente=function(){


        var randomTime = new Date();
        start = (start + howmany);
            var aGrupo='<#GRUPO/>';//Cambiar el grupo
        if (aGrupo=='') agrupo=1; 
          var fechastr_ini = $('#fecha_desde').val();
            var fechastr_fin = $('#fecha_hasta').val();
        pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&start=' + start + '&fechadesde=' + fechastr_ini + '&fechahasta=' + fechastr_fin + '&grupo=' + aGrupo;
        $('.unMomento').remove();
        GetData();
        return false;
    }

    this.PaginaAnterior=function(){
        var randomTime = new Date();
        start = (start - howmany);
        var aGrupo='<#GRUPO/>'; //Cambiar el grupo
        var fechastr_ini = $('#fecha_desde').val();
        var fechastr_fin = $('#fecha_hasta').val();
        if (aGrupo=='') agrupo=1; 
        pagina_datos = pagina_actual + '?randomTime=' + randomTime.getTime() + '&howmany=' + howmany + '&start=' + start + '&fechadesde=' + fechastr_ini + '&fechahasta=' + fechastr_fin + '&grupo=' + aGrupo;
        $('.unMomento').remove();
        GetData();
        return false; 
    }
    this.ActivaPaginacion=function(Ir){
        Start = (parseInt(Ir) * parseInt(RegXPag)) - RegXPag + 1;
        SalesUp.Catalogo.CargarDatosCatalogo({
          url:SalesUp.Paginas.jsonDatos, 
          inicio:Start,
          templateDatos:SalesUp.Paginas.TemplateDatos, 
          destino:'#DatosLoad', 
          idContenedor:'TblGrupos'
        });
    }
    this.CambiarEstatus=function(Op){
        var tk=(Op.tk)?Op.tk:'';
        SalesUp.Variables.ThisInactivar=Op.t;
        var $Elemento=(Op.t) ? $(Op.t) : ''; 
        var nombre=$Elemento.attr('data-nombre');
        var sts=$Elemento.attr('data-activo');
        var msg= (sts==1) ? 'inactivar' : 'activar';  
        SalesUp.Construye.MuestraAlerta({
              TipoAlerta:'AlertaPregunta',
              Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/> ¿Está seguro que desea '+msg+'? '+nombre,
              Boton1:'Aceptar',
              Boton2:'Cancelar',
              Callback1: 'SalesUp.Catalogo.Inactivar({})',
              Icono1:'<i class="fa fa-trash"></i>',
              Icono2:'<i class="fa fa-times"></i>',
              Ancho:'300px'
        });
    }

    this.CambiarEstatusR2=function(Op){
        var tk=(Op.tk)?Op.tk:'';
        SalesUp.Variables.ThisInactivar=Op.t;
        var $Elemento=(Op.t) ? $(Op.t) : ''; 
        var nombre=Op.nombre;
        var sts=Op.status;
        var msg= (sts==1) ? 'inactivar' : 'activar';  
        SalesUp.Construye.MuestraAlerta({
              TipoAlerta:'AlertaPregunta',
              Alerta:'<h2 class="Rojo"><i class="fa fa-warning "></i> Atención</h2><br/> ¿Está seguro que desea '+msg+' '+nombre+'?',
              Boton1:'Aceptar',
              Boton2:'Cancelar',
              Callback1: 'SalesUp.Catalogo.InactivarR2('+JSON.stringify(Op)+')',
              Icono1:'<i class="fa fa-check"></i>',
              Icono2:'',
              Ancho:'300px'
        });
    }

    this.Inactivar=function(Op){
       var t=SalesUp.Variables.ThisInactivar; 
       var $Elemento=$(t);
       SalesUp.Variables.ThisInactivar=undefined;
       var tk = $Elemento.attr('data-tk'); 
       var sts = $Elemento.attr('data-activo');
       sts= (sts==1) ? 0 : 1;
       var htmlActivo='<i class="fa fa-check Inactivar Tip2" tip="Activar">';
       var htmlInactivo='<i class="fa fa-lg fa-times Activar Tip2" tip="Inactivar"></i>';
       var catalogoNombre=$Elemento.attr('data-nombre');
       var msg=(sts==1) ? 'inactivar' : 'activar' ; 
       var respuesta=SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/'+SalesUp.Paginas.PaginaCambiarStatus, Parametros:'tk='+tk+'&status='+sts, DataType:'json'}).jsonDatos;
       var existe=!_.isUndefined(respuesta[0].STATUS);
       var respuesta=respuesta[0].STATUS;
        setTimeout(function() {
          if(Number(respuesta)==1){
            $Elemento.html(htmlInactivo).attr('data-activo', 1);
           }else{
            $Elemento.html(htmlActivo).attr('data-activo', 0);;
           }
           SalesUp.DatosCatalogo.MostrarInformacion();
           SalesUp.Sistema.IniciaPlugins();
        }, 1000);
    }

    this.InactivarR2=function(Op){
       var t=SalesUp.Variables.ThisInactivar; 
       var $Elemento=$(t);
       SalesUp.Variables.ThisInactivar=undefined;
       var tk = Op.tk; 
       var sts = Op.status;
       sts= (sts==1) ? 0 : 1;
       var htmlActivo='<i class="fa fa-check Inactivar Tip2" tip="Activar">';
       var htmlInactivo='<i class="fa fa-lg fa-times Activar Tip2" tip="Inactivar"></i>';
       var catalogoNombre=$Elemento.attr('data-nombre');
       var msg=(sts==1) ? 'inactivar' : 'activar' ; 
       var respuesta=SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/'+SalesUp.Paginas.PaginaCambiarStatus, Parametros:'tk='+tk+'&status='+sts, DataType:'json'}).jsonDatos;
       var existe=!_.isUndefined(respuesta[0].STATUS);
       var respuesta=respuesta[0].STATUS;
        setTimeout(function() {
          if(Number(respuesta)==1){
            $Elemento.html(htmlInactivo).attr('data-activo', 1);
           }else{
            $Elemento.html(htmlActivo).attr('data-activo', 0);;
           }
           SalesUp.DatosCatalogo.MostrarInformacion();
           SalesUp.Sistema.IniciaPlugins();
        }, 1000);
    }

    this.MuestraIconoStatusCatalogo=function(){
      var htmlActivo='<i class="fa fa-check Inactivar Tip2" tip="Activar">';
      var htmlInactivo='<i class="fa fa-lg fa-times Activar Tip2" tip="Inactivar"></i> ';
      var Elemento=$('.Movimientos');
      for(var i=0; i<=Elemento.length-1; i++){
        var Estado=$(Elemento[i]).attr('data-activo');

        if(Number(Estado)==1){
          $(Elemento[i]).html(htmlInactivo);
        }else{
          $(Elemento[i]).html(htmlActivo);
        }
      }
      SalesUp.Sistema.IniciaPlugins();
    }

}  //Fin Catalogo.js

