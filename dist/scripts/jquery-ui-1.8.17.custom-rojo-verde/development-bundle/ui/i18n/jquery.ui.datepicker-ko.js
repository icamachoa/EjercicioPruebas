/* Korean initialisation for the jQuery calendar extension. */
/* Written by DaeKwon Kang (ncrash.dk@gmail.com). */
jQuery(function($){
	$.datepicker.regional['ko'] = {
		closeText: 'â<Æà,¯',
		prevText: 'ç_'çˇ,â<™',
		nextText: 'â<ç_Oâ<™',
		currentText: 'ç~âS~',
		monthNames: ['1ç>"(JAN)','2ç>"(FEB)','3ç>"(MAR)','4ç>"(APR)','5ç>"(MAY)','6ç>"(JUN)',
		'7ç>"(JUL)','8ç>"(AUG)','9ç>"(SEP)','10ç>"(OCT)','11ç>"(NOV)','12ç>"(DEC)'],
		monthNamesShort: ['1ç>"(JAN)','2ç>"(FEB)','3ç>"(MAR)','4ç>"(APR)','5ç>"(MAY)','6ç>"(JUN)',
		'7ç>"(JUL)','8ç>"(AUG)','9ç>"(SEP)','10ç>"(OCT)','11ç>"(NOV)','12ç>"(DEC)'],
		dayNames: ['ç_¨','ç>"','°T"','ç^~','â¶c','à,^','°+ˇ'],
		dayNamesShort: ['ç_¨','ç>"','°T"','ç^~','â¶c','à,^','°+ˇ'],
		dayNamesMin: ['ç_¨','ç>"','°T"','ç^~','â¶c','à,^','°+ˇ'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: 'â.,'};
	$.datepicker.setDefaults($.datepicker.regional['ko']);
});

