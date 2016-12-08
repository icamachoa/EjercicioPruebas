‹¯¨/* Serbian i18n for the jQuery UI date picker plugin. */
/* Written by Dejan DimiØ. */
jQuery(function($){
	$.datepicker.regional['sr'] = {
		closeText: 'D-Dø¥,DıD_¥_D,',
		prevText: '&#x3c;',
		nextText: '&#x3e;',
		currentText: 'D"DøD«Dø¥_',
		monthNames: ['D^DøD«¥ŸDø¥_','DDæDñ¥_¥ŸDø¥_','DoDø¥_¥,','D_D¨¥_D,D¯','DoDø¥~','D^¥ŸD«',
		'D^¥ŸD¯','D_DıD3¥Ÿ¥_¥,','D­DæD¨¥,DæD¬DñDø¥_','DzD§¥,D_DñDø¥_','D_D_DıDæD¬DñDø¥_','D"Dæ¥+DæD¬DñDø¥_'],
		monthNamesShort: ['D^DøD«','DDæDñ','DoDø¥_','D_D¨¥_','DoDø¥~','D^¥ŸD«',
		'D^¥ŸD¯','D_DıD3','D­DæD¨','DzD§¥,','D_D_Dı','D"Dæ¥+'],
		dayNames: ['D_DæD'Dæ¥TDø','DYD_D«DæD'Dæ¥TDøD§','Dœ¥,D_¥_DøD§','D­¥_DæD'Dø','DDæ¥,Dı¥_¥,DøD§','DYDæ¥,DøD§','D­¥ŸDñD_¥,Dø'],
		dayNamesShort: ['D_DæD'','DYD_D«','Dœ¥,D_','D­¥_Dæ','DDæ¥,','DYDæ¥,','D­¥ŸDñ'],
		dayNamesMin: ['D_Dæ','DYD_','Dœ¥,','D­¥_','DDæ','DYDæ','D­¥Ÿ'],
		weekHeader: 'D­DæD'',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['sr']);
});


