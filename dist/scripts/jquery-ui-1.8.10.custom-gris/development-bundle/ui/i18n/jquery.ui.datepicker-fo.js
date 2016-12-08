‹¯¨/* Faroese initialisation for the jQuery UI date picker plugin */
/* Written by Sverri Mohr Olsen, sverrimo@gmail.com */
jQuery(function($){
	$.datepicker.regional['fo'] = {
		closeText: 'Lat aftur',
		prevText: '&#x3c;Fyrra',
		nextText: 'NAÝsta&#x3e;',
		currentText: 'A_ dag',
		monthNames: ['Januar','Februar','Mars','AprA-l','Mei','Juni',
		'Juli','August','September','Oktober','November','Desember'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Mei','Jun',
		'Jul','Aug','Sep','Okt','Nov','Des'],
		dayNames: ['Sunnudagur','MA­nadagur','TA«sdagur','Mikudagur','HA3sdagur','FrA-ggjadagur','Leyardagur'],
		dayNamesShort: ['Sun','MA­n','TA«s','Mik','HA3s','FrA-','Ley'],
		dayNamesMin: ['Su','MA­','TA«','Mi','HA3','Fr','Le'],
		weekHeader: 'Vk',
		dateFormat: 'dd-mm-yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['fo']);
});


