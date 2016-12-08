"use strict";
var archivarMultiple = function() {
	this.archivar = function() {
		SalesUp.Sistema.PostData({Link:'/privado/ajax/jx-ArchivarProspecto.dbsp', Parametros:'listap='+Listado_Ids });
        ReloadData();
	};

	this.reactivar = function() {
		SalesUp.Sistema.PostData({Link:'/privado/ajax/jx-ReactivarProspecto.dbsp', Parametros:'listap='+Listado_Ids });
        ReloadData();	
	};
}

$(function() {
	SalesUp.Variables.archivarMultiple = new archivarMultiple();
});