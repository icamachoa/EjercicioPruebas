/* Russian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Andrew Stromnov (stromnov@gmail.com). */
jQuery(function($){
	$.datepicker.regional['ru'] = {
		closeText: 'D-DøD§¥_¥<¥,¥O',
		prevText: '&#x3c;DY¥_DæD'',
		nextText: 'D­D¯DæD'&#x3e;',
		currentText: 'D­DæD3D_D'D«¥_',
		monthNames: ['D_D«DýDø¥_¥O','DDæDý¥_DøD¯¥O','DoDø¥_¥,','D_D¨¥_DæD¯¥O','DoDøD1','D~¥ZD«¥O',
		'D~¥ZD¯¥O','D_DýD3¥Ÿ¥_¥,','D­DæD«¥,¥_Dñ¥_¥O','DzD§¥,¥_Dñ¥_¥O','D_D_¥_Dñ¥_¥O','D"DæD§DøDñ¥_¥O'],
		monthNamesShort: ['D_D«Dý','DDæDý','DoDø¥_','D_D¨¥_','DoDøD1','D~¥ZD«',
		'D~¥ZD¯','D_DýD3','D­DæD«','DzD§¥,','D_D_¥_','D"DæD§'],
		dayNames: ['DýD_¥_D§¥_Dæ¥_DæD«¥ODæ','D¨D_D«DæD'DæD¯¥OD«D,D§','Dý¥,D_¥_D«D,D§','¥_¥_DæD'Dø','¥ØDæ¥,DýDæ¥_D3','D¨¥_¥,D«D,¥+Dø','¥_¥ŸDñDñD_¥,Dø'],
		dayNamesShort: ['Dý¥_D§','D¨D«D'','Dý¥,¥_','¥_¥_D'','¥Ø¥,Dý','D¨¥,D«','¥_Dñ¥,'],
		dayNamesMin: ['D'¥_','DYD«','D'¥,','D­¥_','D¥,','DY¥,','D­Dñ'],
		weekHeader: 'D_DæD'',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ru']);
});

