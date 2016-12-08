/* Kazakh (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Dmitriy Karasyov (dmitriy.karasyov@gmail.com). */
jQuery(function($){
	$.datepicker.regional['kk'] = {
		closeText: 'D-DøDñ¥Ÿ',
		prevText: '&#x3c;D_D¯D'¥<OœO"¥<',
		nextText: 'DsDæD¯Dæ¥_¥-&#x3e;',
		currentText: 'D`O_D3¥-D«',
		monthNames: ['OsDøOœ¥,Dø¥_','D_O>D¨DøD«','D_Dø¥Ÿ¥_¥<Dú','D­OT¥Ÿ¥-¥_','DoDøD¬¥<¥_','DoDø¥Ÿ¥_¥<D¬',
		'D"¥-D¯D'Dæ','D›DøD¬¥<Dú','Os¥<¥_D§O_D1DæD§','OsDøDúDøD«','OsDø¥_Dø¥^Dø','D-DæD¯¥,D_O>¥_DøD«'],
		monthNamesShort: ['OsDøOœ','D_O>D¨','D_Dø¥Ÿ','D­OT¥Ÿ','DoDøD¬','DoDø¥Ÿ',
		'D"¥-D¯','D›DøD¬','Os¥<¥_','OsDøDú','OsDø¥_','D-DæD¯'],
		dayNames: ['D-DæD§¥_DæD«Dñ¥-','D"O_D1¥_DæD«Dñ¥-','D­DæD1¥_DæD«Dñ¥-','D­OT¥_¥_DæD«Dñ¥-','D`DæD1¥_DæD«Dñ¥-','D-OñD¬Dø','D­DæD«Dñ¥-'],
		dayNamesShort: ['DD§¥_','D'¥_D«','¥_¥_D«','¥_¥_¥_','Dñ¥_D«','DD¬Dø','¥_D«Dñ'],
		dayNamesMin: ['D-D§','D"¥_','D­¥_','D­¥_','D`¥_','D-D¬','D­D«'],
		weekHeader: 'D_Dæ',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['kk']);
});


