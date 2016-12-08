/* Luxembourgish initialisation for the jQuery UI date picker plugin. */
/* Written by Michel Weimerskirch <michel@weimerskirch.net> */
jQuery(function($){
	$.datepicker.regional['lb'] = {
		closeText: 'FAerdeg',
		prevText: 'ZrAcck',
		nextText: 'Weider',
		currentText: 'Haut',
		monthNames: ['Januar','Februar','MAerz','AbrA®ll','Mee','Juni',
		'Juli','August','September','Oktober','November','Dezember'],
		monthNamesShort: ['Jan', 'Feb', 'MAe', 'Abr', 'Mee', 'Jun',
		'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
		dayNames: ['Sonndeg', 'MAcindeg', 'DA®nschdeg', 'MA®ttwoch', 'Donneschdeg', 'Freideg', 'Samschdeg'],
		dayNamesShort: ['Son', 'MAci', 'DA®n', 'MA®t', 'Don', 'Fre', 'Sam'],
		dayNamesMin: ['So','MAc','DA®','MA®','Do','Fr','Sa'],
		weekHeader: 'W',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['lb']);
});


