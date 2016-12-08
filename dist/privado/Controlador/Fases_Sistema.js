
SalesUp.Variables.IniciaConfiguracion = function(){

	SalesUp.Variables.ConstruyeTabsFases();

}


SalesUp.Variables.ConstruyeTabsFases = function() {

	  var Ventanas 			= ["Prospectos", "Oportunidades", "Clientes"];
	  var ValoresVentanas 	= [1,2,3];
	  var htmlTab			='<div id="Tabs" style="margin-top: -4px; !important"><ul>';
	  var htmlDivs			='';
	 
	  for (var i=0; i<Ventanas.length;i++) {
	    htmlTab+='<li id="Tab-'+ValoresVentanas[i]+'" data-cargado="0" ><a  href="#divTab-'+ValoresVentanas[i]+'">'+Ventanas[i]+'</a></li>';
	    htmlDivs+='<div id="divTab-'+ValoresVentanas[i]+'"></div>';
	  }

	  htmlTab+='</ul>'+htmlDivs+'</div><div class="clear"></div>';

	$('#tabsConfiguracion').html(htmlTab);
	$('#tabsConfiguracion #Tabs').tabs();


	SalesUp.Variables.ConstruyeHTML();
}


SalesUp.Variables.ConstruyeHTML=function(){

	var TemplateDatosConfiguracion = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateFases.dbsp', Parametros:'thead=1'});
	var TemplateDatos = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateFases.dbsp', Parametros:'thead=2'/*, Almacen: 'htmlTemplateTR'*/});
	var Datos  =  SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonFasesPorVentanas.dbsp', Parametros:'tConsulta=1',DataType:'json'});
	var Destino = '#divTab-1', IdTabla='tabla1';


	SalesUp.Construye.ConstruyeTabla(TemplateDatosConfiguracion, TemplateDatos, Datos.jsonDatos, {Destino:Destino, Id:IdTabla});
	SalesUp.Variables.DragTableFase();
}


SalesUp.Variables.DragTableFase=function(){

		$('#tabla1').tableDnD({
				dragHandle  : ".sortear",
				onDragClass : "DragRow",
				onDragStart: function(table, row){
					var rows = table.tBodies[0].rows;
					$(rows).each(function(i){
						$(rows[i]).addClass('RowDark');
					});
					$(row).parent().parent().removeClass('RowDark').addClass('DragRow');
				},
				onDrop: function(table, row){
					$('.RowDark').removeClass('RowDark');
					var rows = table.tBodies[0].rows;
					
					SalesUp.Variables.GuardaOrdenReglas();

				}
			});
}

SalesUp.Variables.ConstruyePop = function(){
	SalesUp.Construye.MuestraPopUp({
		id    	 :'AgregaEstado',
		alto     : '90px',
		ancho    : '25%',
		centrado : false,
		titulo   : 'Agregar estado',
		fuente   : '/privado/Vista/TemplateFases.dbsp?thead=3'
	});

}

SalesUp.Variables.CierraPopUp = function(Op){
		var $t = $(Op.t);
		var $Padre = $t.closest('.ContenedorModal');
		var $Overlay = $t.closest('.ModalNotification');
		$Padre.addClass('BounceCloseOut');
		
		setTimeout(function(){ if (tinymce.activeEditor){tinymce.activeEditor.remove();} $Overlay.remove(); }, 1200);
}/*CierraPopUp*/

SalesUp.Variables.GuardarPopUp = function(Op){
		var $t = $(Op.t);
		var $p = $t.closest('form');
		var action = $p.attr('action');
		var fase = 'FASE='+$('#fase').val();


		if(SalesUp.Valida.ValidaObligatorios({DentroDe:$p, DestinoMsj:$p})){
			SalesUp.Construye.ActivaEsperaGuardando();
			setTimeout(function(){	

				SalesUp.Sistema.CargaDatos({
			        Link: '/privado/popup_agregar_estado_prospecto_guarda.dbsp',
			        Parametros: fase
			    });
			
				SalesUp.Construye.PopUpGuardado();
			}, 10);

			setTimeout(function() {SalesUp.Variables.ConstruyeHTML();}, 300);
		}
}/*GuardarPopUp*/

	SalesUp.Variables.GuardaOrdenReglas = function() {

    var posicion = 1;
    var orden = '';
    var idFases = '';

    var tabla = '#tabla1 tbody tr';
    var boleano = true;

    $(tabla).each(function() {

        $(this).removeClass('zebra')

        if (boleano) {
            $(this).addClass('zebra')
            boleano = false;
        } else {
            boleano = true;
        }

        if (posicion > 0) {
            orden += posicion + ',';
            idFases += $(this).attr('id') + ',';
        }
        posicion++;
    });

    SalesUp.Sistema.CargaDatos({
        Link: '/privado/Modelo/qryGuardaOrdenEstados.dbsp',
        Parametros: 'orden=' + orden + '&idFases=' + idFases
    });
    

		setTimeout(function() {SalesUp.Variables.ConstruyeHTML();}, 300);

}

      SalesUp.Variables.AlertaEliminarCatalogo = function(Op){
        $Elemento = $(Op.e);
        var Pregunta = $Elemento.attr('data-q');
        var tk = $Elemento.attr('data-tk');
        var Funcion = (Op.Corp) ? Op.Corp : 'SalesUp.Variables.EliminarCatalogo';

        SalesUp.Construye.MuestraAlerta({
          TipoAlerta:'AlertaPregunta',
          Alerta:'<h2 class="Rojo"><i class="fa fa-warning"></i> Atención</h2><br/> '+Pregunta+'',
          Boton1:'Eliminar',
          Boton2:'Cancelar',
          Callback1: Funcion+'({tk:\''+tk+'\'})',
          Icono1:'<i class="fa fa-trash"></i>',
          Icono2:'<i class="fa fa-times"></i>',
          Ancho:'500px'
        });
      }

      SalesUp.Variables.EliminarCatalogo = function(Op){
        var tk=(Op.tk)?Op.tk:'';

        SalesUp.Sistema.AbrePopUp({
          Titulo:'Cambiar estados prospecto',
          Pagina:'popup_cambiar_prospecto.dbsp',
          Parametros:'IdElimina='+tk,
          CallBack:'SalesUp.Variables.ConstruyeHTML', Alto:80, Ancho:250
        });
      }


SalesUp.Variables.VerEditar = function(Op){
  
		var In=Op.In, Out=Op.Out;
		var $Parte1 = $('#Paso1');
		var $Parte2 = $('#Paso2');
	
    if(In){
			$Parte1.css('left','0');
			$Parte2.css('left','100%');
			setTimeout(function(){$Parte2.hide();}, 500);
	}
	
	if(Out){
			$Parte1.css('left','-120%');
			$Parte2.show();
			setTimeout(function(){$Parte2.css('left','0');}, 10);		
	
	SalesUp.Variables.GetData(Op);
	}
  
}



SalesUp.Variables.GetData = function(Op) {
	var tk=Op.Tk;
	var start = 1, howmany = 50;
    var pagina_actual = 'ajax/aciones_fases_prospectos.dbsp';
    var pagina_datos = pagina_actual+'?howmany='+howmany+'&start='+start+'&tk='+tk+'&fasetipo=1';
	var randomTime = new Date();
	
		$('#DatosLoad2').html('');
		$('#Paso2').append(SalesUp.Sistema.unMomento());
		$.ajaxSetup({'beforeSend' : function(xhr) {xhr.overrideMimeType('text/html; charset=iso-8859-1');}}); 
		$.ajax({async:false, cache: false,dataType: 'html', type: 'POST', url : pagina_datos,
			success : function(data) {
				setTimeout(function(){
		
					$("#DatosLoad2").html(data);
					$('#Esperando').remove();
					num_rows = $('table.simple tbody tr').length;
					$.thickbox();
					$('table.simple tbody tr:even').addClass('zebra');
					(SalesUp.Sistema.RestriccionesCorporativo) ? SalesUp.Sistema.RestriccionesCorporativo():'';
				},500);
			}
		});
	}

