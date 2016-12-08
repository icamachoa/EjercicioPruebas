var SalesUp = {};
$.ajaxSetup({ async:false, 'beforeSend' : function(xhr) { xhr.overrideMimeType('text/html; charset=iso-8859-1'); } });
//$.ajaxSetup({ async:false});
$.getScript( '/scripts/FuncionesNuevas/Sistema.js', function(){ SalesUp.Sistema = new SistemaDefault(); });
$.getScript( '/scripts/FuncionesNuevas/PopUps.js', function(){ SalesUp.Ventana = new PopUps(); });
$.getScript( '/scripts/FuncionesNuevas/Validaciones.js', function(){ SalesUp.Valida = new Validaciones(); });
$.getScript( '/scripts/FuncionesNuevas/Constructores.js', function(){ SalesUp.Construye = new ContructorUi(); });
$.getScript( '/scripts/FuncionesNuevas/FormatoFechas.js', function(){ SalesUp.Fechas = new Fecha(); });
$.ajaxSetup({async:true});



