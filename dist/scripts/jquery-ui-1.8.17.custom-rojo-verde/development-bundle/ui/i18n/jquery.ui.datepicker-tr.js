/* Turkish initialisation for the jQuery UI date picker plugin. */
/* Written by Izzet Emre Erkan (kara@karalamalar.net). */
jQuery(function($){
	$.datepicker.regional['tr'] = {
		closeText: 'kapat',
		prevText: '&#x3c;geri',
		nextText: 'ileri&#x3e',
		currentText: 'bugA¬n',
		monthNames: ['Ocak','zubat','Mart','Nisan','Mayñs','Haziran',
		'Temmuz','AYustos','EylA¬l','Ekim','Kasñm','Aralñk'],
		monthNamesShort: ['Oca','zub','Mar','Nis','May','Haz',
		'Tem','AYu','Eyl','Eki','Kas','Ara'],
		dayNames: ['Pazar','Pazartesi','Salñ','AØarYamba','PerYembe','Cuma','Cumartesi'],
		dayNamesShort: ['Pz','Pt','Sa','AØa','Pe','Cu','Ct'],
		dayNamesMin: ['Pz','Pt','Sa','AØa','Pe','Cu','Ct'],
		weekHeader: 'Hf',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['tr']);
});

