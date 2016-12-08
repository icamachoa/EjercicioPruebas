/* Persian (Farsi) Translation for the jQuery UI date picker plugin. */
/* Javad Mowlanezhad -- jmowla@gmail.com */
/* Jalali calendar should supported soon! (Its implemented but I have to test it) */
jQuery(function($) {
	$.datepicker.regional['fa'] = {
		closeText: 'O"O3O¦U+',
		prevText: '&#x3c;U,O"U,US',
		nextText: 'O"O1O_US&#x3e;',
		currentText: 'OU.OñU^Oý',
		monthNames: ['U_OñU^OñO_USU+','OOñO_USO"UØO'O¦','OrOñO_OO_','O¦USOñ','U.OñO_OO_','O'UØOñUSU^Oñ',
		'U.UØOñ','O›O"OU+','O›OøOñ','O_US','O"UØU.U+','OO3U_U+O_'],
		monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		dayNames: ['USUcO'U+O"UØ','O_U^O'U+O"UØ','O3UØƒ_OO'U+O"UØ','U+UØOOñO'U+O"UØ','U_U+OªO'U+O"UØ','OªU.O1UØ','O'U+O"UØ'],
		dayNamesShort: ['US','O_','O3','U+','U_','Oª', 'O''],
		dayNamesMin: ['US','O_','O3','U+','U_','Oª', 'O''],
		weekHeader: 'UØU_',
		dateFormat: 'yy/mm/dd',
		firstDay: 6,
		isRTL: true,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['fa']);
});

