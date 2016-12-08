/* Algerian Arabic Translation for jQuery UI date picker plugin. (can be used for Tunisia)*/
/* Mohamed Cherif BOUCHELAGHEM -- cherifbouchelaghem@yahoo.fr */

jQuery(function($){
	$.datepicker.regional['ar-DZ'] = {
		closeText: 'OO§U,OU,',
		prevText: '&#x3c;OU,O3OO"U,',
		nextText: 'OU,O¦OU,US&#x3e;',
		currentText: 'OU,USU^U.',
		monthNames: ['OªOU+U_US', 'U_USU_OñUS', 'U.OOñO3', 'OœU_OñUSU,', 'U.OUS', 'OªU^OU+',
		'OªU^USU,USOc', 'OœU^O¦', 'O3O"O¦U.O"Oñ','OœUŸO¦U^O"Oñ', 'U+U^U_U.O"Oñ', 'O_USO3U.O"Oñ'],
		monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		dayNames: ['OU,OœO-O_', 'OU,OO®U+USU+', 'OU,O®U,OO®OO­', 'OU,OœOñO"O1OO­', 'OU,OrU.USO3', 'OU,OªU.O1Oc', 'OU,O3O"O¦'],
		dayNamesShort: ['OU,OœO-O_', 'OU,OO®U+USU+', 'OU,O®U,OO®OO­', 'OU,OœOñO"O1OO­', 'OU,OrU.USO3', 'OU,OªU.O1Oc', 'OU,O3O"O¦'],
		dayNamesMin: ['OU,OœO-O_', 'OU,OO®U+USU+', 'OU,O®U,OO®OO­', 'OU,OœOñO"O1OO­', 'OU,OrU.USO3', 'OU,OªU.O1Oc', 'OU,O3O"O¦'],
		weekHeader: 'OœO3O"U^O1',
		dateFormat: 'dd/mm/yy',
		firstDay: 6,
  		isRTL: true,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ar-DZ']);
});


