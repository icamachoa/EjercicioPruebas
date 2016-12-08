/* Polish initialisation for the jQuery UI date picker plugin. */
/* Written by Jacek Wysocki (jacek.wysocki@gmail.com). */
jQuery(function($){
	$.datepicker.regional['pl'] = {
		closeText: 'Zamknij',
		prevText: '&#x3c;Poprzedni',
		nextText: 'NastéTpny&#x3e;',
		currentText: 'Dziè>',
		monthNames: ['Styczeè,','Luty','Marzec','Kwiecieè,','Maj','Czerwiec',
		'Lipiec','Sierpieè,','Wrzesieè,','Paèßdziernik','Listopad','Grudzieè,'],
		monthNamesShort: ['Sty','Lu','Mar','Kw','Maj','Cze',
		'Lip','Sie','Wrz','Pa','Lis','Gru'],
		dayNames: ['Niedziela','Poniedziaè,ek','Wtorek','èsroda','Czwartek','Pié.tek','Sobota'],
		dayNamesShort: ['Nie','Pn','Wt','èsr','Czw','Pt','So'],
		dayNamesMin: ['N','Pn','Wt','èsr','Cz','Pt','So'],
		weekHeader: 'Tydz',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['pl']);
});


