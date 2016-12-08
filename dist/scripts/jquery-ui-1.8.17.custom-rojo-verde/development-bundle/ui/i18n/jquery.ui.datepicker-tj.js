/* Tajiki (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Abdurahmon Saidov (saidovab@gmail.com). */
jQuery(function($){
	$.datepicker.regional['tj'] = {
		closeText: 'D~D'D_D¬Dø',
		prevText: '&#x3c;OsDø¥,D_',
		nextText: 'DYDæ¥^&#x3e;',
		currentText: 'D~D¬¥_O_Dú',
		monthNames: ['D_D«DıDø¥_','DDæDı¥_DøD¯','DoDø¥_¥,','D_D¨¥_DæD¯','DoDøD1','D~¥ZD«',
		'D~¥ZD¯','D_DıD3¥Ÿ¥_¥,','D­DæD«¥,¥_Dñ¥_','DzD§¥,¥_Dñ¥_','D_D_¥_Dñ¥_','D"DæD§DøDñ¥_'],
		monthNamesShort: ['D_D«Dı','DDæDı','DoDø¥_','D_D¨¥_','DoDøD1','D~¥ZD«',
		'D~¥ZD¯','D_DıD3','D­DæD«','DzD§¥,','D_D_¥_','D"DæD§'],
		dayNames: ['¥_D§¥^DøD«DñDæ','D'¥Ÿ¥^DøD«DñDæ','¥_Dæ¥^DøD«DñDæ','¥ØD_¥_¥^DøD«DñDæ','D¨DøD«Oú¥^DøD«DñDæ','Oú¥ŸD¬¥SDø','¥^DøD«DñDæ'],
		dayNamesShort: ['¥_D§¥^','D'¥Ÿ¥^','¥_Dæ¥^','¥ØD_¥_','D¨DøD«','Oú¥ŸD¬','¥^DøD«'],
		dayNamesMin: ['D_D§','D"¥^','D­¥^','D¥^','DY¥^','OD¬','D"D«'],
		weekHeader: 'D¥,',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['tj']);
});

