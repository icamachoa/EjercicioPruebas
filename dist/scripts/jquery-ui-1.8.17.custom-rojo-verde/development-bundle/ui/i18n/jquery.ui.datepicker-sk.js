/* Slovak initialisation for the jQuery UI date picker plugin. */
/* Written by Vojtech Rinik (vojto@hmm.sk). */
jQuery(function($){
	$.datepicker.regional['sk'] = {
		closeText: 'Zavrieèù',
		prevText: '&#x3c;PredchA≠dzajAßci',
		nextText: 'NasledujAßci&#x3e;',
		currentText: 'Dnes',
		monthNames: ['JanuA≠r','FebruA≠r','Marec','AprA-l','MA≠j','JAßn',
		'JAßl','August','September','OktA3ber','November','December'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','MA≠j','JAßn',
		'JAßl','Aug','Sep','Okt','Nov','Dec'],
		dayNames: ['Nedeé_a','Pondelok','Utorok','Streda','èˇtvrtok','Piatok','Sobota'],
		dayNamesShort: ['Ned','Pon','Uto','Str','èˇtv','Pia','Sob'],
		dayNamesMin: ['Ne','Po','Ut','St','èˇt','Pia','So'],
		weekHeader: 'Ty',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['sk']);
});


