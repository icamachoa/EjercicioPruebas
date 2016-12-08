/* Azerbaijani (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Jamil Najafov (necefov33@gmail.com). */
jQuery(function($) {
	$.datepicker.regional['az'] = {
		closeText: 'BaYla',
		prevText: '&#x3c;Geri',
		nextText: 'ørTli&#x3e;',
		currentText: 'BugA¬n',
		monthNames: ['Yanvar','Fevral','Mart','Aprel','May','øyun',
		'øyul','Avqust','Sentyabr','Oktyabr','Noyabr','Dekabr'],
		monthNamesShort: ['Yan','Fev','Mar','Apr','May','øyun',
		'øyul','Avq','Sen','Okt','Noy','Dek'],
		dayNames: ['Bazar','Bazar ertTsi','AØTrYTnbT axYamñ','AØTrYTnbT','CA¬mT axYamñ','CA¬mT','zTnbT'],
		dayNamesShort: ['B','Be','AØa','AØ','Ca','C','z'],
		dayNamesMin: ['B','B','AØ','D­','AØ','C','z'],
		weekHeader: 'Hf',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['az']);
});

