/* Macedonian i18n for the jQuery UI date picker plugin. */
/* Written by Stojce Slavkovski. */
jQuery(function($){
	$.datepicker.regional['mk'] = {
		closeText: 'D-Dø¥,DıD_¥_D,',
		prevText: '&#x3C;',
		nextText: '&#x3E;',
		currentText: 'D"DæD«Dæ¥_',
		monthNames: ['D^DøD«¥ŸDø¥_D,','DDæDñ¥_¥ŸDø¥_D,','DoDø¥_¥,','D_D¨¥_D,D¯','DoDø¥~','D^¥ŸD«D,',
		'D^¥ŸD¯D,','D_DıD3¥Ÿ¥_¥,','D­DæD¨¥,DæD¬Dı¥_D,','DzD§¥,D_D¬Dı¥_D,','D_D_DæD¬Dı¥_D,','D"DæD§DæD¬Dı¥_D,'],
		monthNamesShort: ['D^DøD«','DDæDñ','DoDø¥_','D_D¨¥_','DoDø¥~','D^¥ŸD«',
		'D^¥ŸD¯','D_DıD3','D­DæD¨','DzD§¥,','D_D_Dæ','D"DæD§'],
		dayNames: ['D_DæD'DæD¯Dø','DYD_D«DæD'DæD¯D«D,D§','D'¥,D_¥_D«D,D§','D­¥_DæD'Dø','DDæ¥,Dı¥_¥,D_D§','DYDæ¥,D_D§','D­DøDñD_¥,Dø'],
		dayNamesShort: ['D_DæD'','DYD_D«','D'¥,D_','D­¥_Dæ','DDæ¥,','DYDæ¥,','D­DøDñ'],
		dayNamesMin: ['D_Dæ','DYD_','D'¥,','D­¥_','DDæ','DYDæ','D­Dø'],
		weekHeader: 'D­DæD'',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['mk']);
});


