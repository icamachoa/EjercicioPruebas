/* Chinese initialisation for the jQuery UI date picker plugin. */
/* Written by SCCY (samuelcychan@gmail.com). */
jQuery(function($){
	$.datepicker.regional['zh-HK'] = {
		closeText: '‚-o‚-%',
		prevText: '&#x3c;„,S‘o^',
		nextText: '„,<‘o^&#x3e;',
		currentText: '„¯S†c',
		monthNames: ['„,_‘o^','„§O‘o^','„,%‘o^','†>>‘o^','„§"‘o^','†.-‘o^',
		'„,Ÿ‘o^','†.®‘o^','„1_‘o^','†__‘o^','†__„,_‘o^','†__„§O‘o^'],
		monthNamesShort: ['„,_','„§O','„,%','†>>','„§"','†.-',
		'„,Ÿ','†.®','„1_','†__','†__„,_','†__„§O'],
		dayNames: ['‘~Y‘oY‘-','‘~Y‘oY„,_','‘~Y‘oY„§O','‘~Y‘oY„,%','‘~Y‘oY†>>','‘~Y‘oY„§"','‘~Y‘oY†.-'],
		dayNamesShort: ['†`"‘-','†`"„,_','†`"„§O','†`"„,%','†`"†>>','†`"„§"','†`"†.-'],
		dayNamesMin: ['‘-','„,_','„§O','„,%','†>>','„§"','†.-'],
		weekHeader: '†`"',
		dateFormat: 'dd-mm-yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '†1''};
	$.datepicker.setDefaults($.datepicker.regional['zh-HK']);
});


