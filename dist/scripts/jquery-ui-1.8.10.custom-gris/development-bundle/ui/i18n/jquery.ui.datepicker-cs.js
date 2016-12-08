‹¯¨/* Czech initialisation for the jQuery UI date picker plugin. */
/* Written by Tomas Muller (tomas@tomas-muller.net). */
jQuery(function($){
	$.datepicker.regional['cs'] = {
		closeText: 'ZavTA-t',
		prevText: '&#x3c;DTA-ve',
		nextText: 'Pozd>ji&#x3e;',
		currentText: 'NynA-',
		monthNames: ['leden','A§nor','bTezen','duben','kv>ten','_erven',
        '_ervenec','srpen','zA­TA-','TA-jen','listopad','prosinec'],
		monthNamesShort: ['led','A§no','bTe','dub','kv>','_er',
		'_vc','srp','zA­T','TA-j','lis','pro'],
		dayNames: ['ned>le', 'pond>lA-', 'A§terA«', 'stTeda', '_tvrtek', 'pA­tek', 'sobota'],
		dayNamesShort: ['ne', 'po', 'A§t', 'st', '_t', 'pA­', 'so'],
		dayNamesMin: ['ne','po','A§t','st','_t','pA­','so'],
		weekHeader: 'TA«d',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['cs']);
});


