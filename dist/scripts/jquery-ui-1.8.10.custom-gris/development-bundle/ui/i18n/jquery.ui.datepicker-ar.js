‹¯¨/* Arabic Translation for jQuery UI date picker plugin. */
/* Khaled Alhourani -- me@khaledalhourani.com */
/* NOTE: monthNames are the original months names and they are the Arabic names, not the new months name U_O"OñOUSOñ - USU+OUSOñ and there isn't any Arabic roots for these months */
jQuery(function($){
	$.datepicker.regional['ar'] = {
		closeText: 'OO§U,OU,',
		prevText: '&#x3c;OU,O3OO"U,',
		nextText: 'OU,O¦OU,US&#x3e;',
		currentText: 'OU,USU^U.',
		monthNames: ['UŸOU+U^U+ OU,O®OU+US', 'O'O"OOú', 'O›OøOOñ', 'U+USO3OU+', 'O›OøOOñ', 'O-OıUSOñOU+',
		'O¦U.U^Oı', 'O›O"', 'OœUSU,U^U,',	'O¦O'OñUSU+ OU,OœU^U,', 'O¦O'OñUSU+ OU,O®OU+US', 'UŸOU+U^U+ OU,OœU^U,'],
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
	$.datepicker.setDefaults($.datepicker.regional['ar']);
});

