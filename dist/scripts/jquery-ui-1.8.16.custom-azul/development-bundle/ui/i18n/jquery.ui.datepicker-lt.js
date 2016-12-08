/* Lithuanian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* @author Arturas Paleicikas <arturas@avalon.lt> */
jQuery(function($){
	$.datepicker.regional['lt'] = {
		closeText: 'Uè_daryti',
		prevText: '&#x3c;Atgal',
		nextText: 'Pirmyn&#x3e;',
		currentText: 'èˇiandien',
		monthNames: ['Sausis','Vasaris','Kovas','Balandis','Geguè_é-','Birè_elis',
		'Liepa','RugpjèÆtis','Rugsé-jis','Spalis','Lapkritis','Gruodis'],
		monthNamesShort: ['Sau','Vas','Kov','Bal','Geg','Bir',
		'Lie','Rugp','Rugs','Spa','Lap','Gru'],
		dayNames: ['sekmadienis','pirmadienis','antradienis','treé_iadienis','ketvirtadienis','penktadienis','è≠eè≠tadienis'],
		dayNamesShort: ['sek','pir','ant','tre','ket','pen','è≠eè≠'],
		dayNamesMin: ['Se','Pr','An','Tr','Ke','Pe','èˇe'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['lt']);
});

