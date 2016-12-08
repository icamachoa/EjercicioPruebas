ãØ®/* Japanese initialisation for the jQuery UI date picker plugin. */
/* Written by Kentaro SATO (kentaro@ranvis.com). */
jQuery(function($){
	$.datepicker.regional['ja'] = {
		closeText: 'Ç-%a_~a,<',
		prevText: '&#x3c;Ü%_',
		nextText: 'ë™≠&#x3e;',
		currentText: 'ÑØSë-ù',
		monthNames: ['1ëo^','2ëo^','3ëo^','4ëo^','5ëo^','6ëo^',
		'7ëo^','8ëo^','9ëo^','10ëo^','11ëo^','12ëo^'],
		monthNamesShort: ['1ëo^','2ëo^','3ëo^','4ëo^','5ëo^','6ëo^',
		'7ëo^','8ëo^','9ëo^','10ëo^','11ëo^','12ëo^'],
		dayNames: ['ë-ùë>oë-ù','ëo^ë>oë-ù','á_Æë>oë-ù','ë¯'ë>oë-ù','ëo"ë>oë-ù','Çÿ`ë>oë-ù','ÜoYë>oë-ù'],
		dayNamesShort: ['ë-ù','ëo^','á_Æ','ë¯'','ëo"','Çÿ`','ÜoY'],
		dayNamesMin: ['ë-ù','ëo^','á_Æ','ë¯'','ëo"','Çÿ`','ÜoY'],
		weekHeader: 'Ç_Ò',
		dateFormat: 'yy/mm/dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: 'Ü1''};
	$.datepicker.setDefaults($.datepicker.regional['ja']);
});

