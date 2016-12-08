ãØ®/* Hebrew initialisation for the UI Datepicker extension. */
/* Written by Amir Hardon (ahardon at gmail dot com). */
jQuery(function($){
	$.datepicker.regional['he'] = {
		closeText: 'x≠x'xx"',
		prevText: '&#x3c;x"xxx"x_',
		nextText: 'x"x`x_&#x3e;',
		currentText: 'x"xTxx_',
		monthNames: ['xTxˇxx_x"','xx`x"xx_x"','xzx"xù','x_xx"xTxo','xzx_xT','xTxxˇxT',
		'xTxxoxT','x_xx'xx≠x~','x≠xx~xzx`x"','x_xxx~xx`x"','xˇxx`xzx`x"','x"x›xzx`x"'],
		monthNamesShort: ['1','2','3','4','5','6',
		'7','8','9','10','11','12'],
		dayNames: ['x"x_xcxxY','xcxˇxT','xcxoxTxcxT','x"x`xTxõxT','x-xzxTxcxT','xcxTxcxT','xcx`x¶'],
		dayNamesShort: ['x_\'','x`\'','x'\'','x"\'','x"\'','x\'','xcx`x¶'],
		dayNamesMin: ['x_\'','x`\'','x'\'','x"\'','x"\'','x\'','xcx`x¶'],
		weekHeader: 'Wk',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: true,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['he']);
});


