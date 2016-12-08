/* Ukrainian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Maxim Drogobitskiy (maxdao@gmail.com). */
jQuery(function($){
	$.datepicker.regional['uk'] = {
		closeText: 'D-DøD§¥_D,¥,D,',
		prevText: '&#x3c;',
		nextText: '&#x3e;',
		currentText: 'D­¥OD_D3D_D'D«¥-',
		monthNames: ['D­¥-¥ØDæD«¥O','D>¥Z¥,D,D1','D`Dæ¥_DæDúDæD«¥O','DsDý¥-¥,DæD«¥O','D›¥_DøDýDæD«¥O','DDæ¥_DýDæD«¥O',
		'D>D,D¨DæD«¥O','D­Dæ¥_D¨DæD«¥O','D'Dæ¥_Dæ¥_DæD«¥O','D-D_Dý¥,DæD«¥O','D>D,¥_¥,D_D¨DøD'','D"¥_¥ŸD'DæD«¥O'],
		monthNamesShort: ['D­¥-¥Ø','D>¥Z¥,','D`Dæ¥_','DsDý¥-','D›¥_Dø','DDæ¥_',
		'D>D,D¨','D­Dæ¥_','D'Dæ¥_','D-D_Dý','D>D,¥_','D"¥_¥Ÿ'],
		dayNames: ['D«DæD'¥-D¯¥_','D¨D_D«DæD'¥-D¯D_D§','Dý¥-Dý¥,D_¥_D_D§','¥_Dæ¥_DæD'Dø','¥ØDæ¥,DýDæ¥_','D¨ƒ_T¥_¥,D«D,¥+¥_','¥_¥ŸDñD_¥,Dø'],
		dayNamesShort: ['D«DæD'','D¨D«D'','Dý¥-Dý','¥_¥_D'','¥Ø¥,Dý','D¨¥,D«','¥_Dñ¥,'],
		dayNamesMin: ['D_D'','DYD«','D'¥,','D­¥_','D¥,','DY¥,','D­Dñ'],
		weekHeader: 'D_Dæ',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['uk']);
});

