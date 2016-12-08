/* Bulgarian initialisation for the jQuery UI date picker plugin. */
/* Written by Stoyan Kyosev (http://svest.org). */
jQuery(function($){
    $.datepicker.regional['bg'] = {
        closeText: 'DúDø¥,DýD_¥_D,',
        prevText: '&#x3c;D«DøDúDøD'',
        nextText: 'D«DøD¨¥_DæD'&#x3e;',
		nextBigText: '&#x3e;&#x3e;',
        currentText: 'D'D«Dæ¥_',
        monthNames: ['D_D«¥ŸDø¥_D,','DDæDý¥_¥ŸDø¥_D,','DoDø¥_¥,','D_D¨¥_D,D¯','DoDøD1','DrD«D,',
        'DrD¯D,','D_DýD3¥Ÿ¥_¥,','D­DæD¨¥,DæD¬Dý¥_D,','DzD§¥,D_D¬Dý¥_D,','D_D_DæD¬Dý¥_D,','D"DæD§DæD¬Dý¥_D,'],
        monthNamesShort: ['D_D«¥Ÿ','DDæDý','DoDø¥_','D_D¨¥_','DoDøD1','DrD«D,',
        'DrD¯D,','D_DýD3','D­DæD¨','DzD§¥,','D_D_Dý','D"DæD§'],
        dayNames: ['D_DæD'DæD¯¥_','DYD_D«DæD'DæD¯D«D,D§','D'¥,D_¥_D«D,D§','D­¥_¥_D'Dø','DDæ¥,Dý¥S¥_¥,¥SD§','DYDæ¥,¥SD§','D­¥SDñD_¥,Dø'],
        dayNamesShort: ['D_DæD'','DYD_D«','D'¥,D_','D­¥_¥_','DDæ¥,','DYDæ¥,','D­¥SDñ'],
        dayNamesMin: ['D_Dæ','DYD_','D'¥,','D­¥_','DDæ','DYDæ','D­¥S'],
		weekHeader: 'Wk',
        dateFormat: 'dd.mm.yy',
		firstDay: 1,
        isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
    $.datepicker.setDefaults($.datepicker.regional['bg']);
});


