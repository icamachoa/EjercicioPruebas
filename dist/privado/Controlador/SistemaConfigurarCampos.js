SalesUp.Variables.Destino = '#DatosLoad';
SalesUp.Variables.IdTabla = '#TbConfigurarCampos';

var jsSistemaCampos = function(){
	SalesUp.Sistema.OcultaEspera();
}/*jsSistemaCampos*/


var ReloadData = function(){
	nRegistros=0, Datos=undefined;
	
	SalesUp.Sistema.MuestraEspera(SalesUp.Variables.Destino,1);
	
	setTimeout(function(){
		SalesUp.Variables.TemplateTitulo = '<tr><td style="width:15px;" class="centrado">#</td><td style="width:100px;">Campo</td><td class="centrado">Restricción</td><td style="width:60px;" class="centrado">Visible</td></tr>';
		SalesUp.Variables.TemplateTabla = SalesUp.Sistema.CargaDatos({Link:'Vista/TemplateSistemaConfigurarCampos.dbsp', Div:0});
		SalesUp.Variables.jsonRespuesta = SalesUp.Sistema.CargaDatos({Link:'Modelo/jsonSistemaCampos.dbsp', DataType:'json', Div:0 });

		SalesUp.Construye.ConstruyeTabla(
			SalesUp.Variables.TemplateTitulo, 
			SalesUp.Variables.TemplateTabla, 
			SalesUp.Variables.jsonRespuesta.jsonDatos, 
			{ 
			  Destino: SalesUp.Variables.Destino, 
			  Callback:jsSistemaCampos 
			}
		);

	},100); /* setTimeout */
	

	
}

$(function(){
	ReloadData();
});

function EditarRestriccion(Op){
	//$().show(); 
}

function CambiarRestriccion(Op){

}

