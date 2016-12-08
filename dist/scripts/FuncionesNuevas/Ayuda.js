
var AyudaSistema = function(){
	var Ayuda = '', Descripcion = 'Eso no existe... No inventes c",)', Parametros = '', Default = '', Uso = '';

	this.MuestraEspera = function(){
		Descripcion = 'Descripcion: Muesta en pantalla un "Cargando", tiene 4 tipos de Espera.\n';
		Parametros = 'Paremetros: Destino, Tipo\n';
		Default = 'Default: Si no se específica el destino, toma el "body" como Destino\n';
		Uso = "Uso: SalesUp.Sistema.MuestraEspera('',4);\n";
		Ayuda = Descripcion + Parametros + Default + Uso;
		return Ayuda;	
	}

	this.Otra = function(){
		Ayuda = '', Descripcion = 'Eso no existe... No inventes c",)', Parametros = '', Default = '', Uso = '';
		
		Ayuda = Descripcion + Parametros + Default + Uso;
		return Ayuda;	
	}
}/* /AyudaSistema */

var AyudaConstruye = function(){
	var Ayuda = '', Descripcion = 'Eso no existe... No inventes c",)', Parametros = '', Default = '', Uso = '';

	this.Proximamente = function(){
		return 'Proximamente... c",)';
	}

}/* /AyudaConstruye */


var AyudaValidaciones = function(){
	var Ayuda = '', Descripcion = 'Eso no existe... No inventes c",)', Parametros = '', Default = '', Uso = '';

	this.Proximamente = function(){
		return 'Proximamente... c",)';
	}
	
}/* /AyudaConstruye */



