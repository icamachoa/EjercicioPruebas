/* Latvian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* @author Arturas Paleicikas <arturas.paleicikas@metasite.net> */
jQuery(function($){
	$.datepicker.regional['lv'] = {
		closeText: 'Aizvé"rt',
		prevText: 'Iepr',
		nextText: 'Né_ka',
		currentText: 'èˇodien',
		monthNames: ['Janvé_ris','Februé_ris','Marts','ApréÆlis','Maijs','JèÆnijs',
		'JèÆlijs','Augusts','Septembris','Oktobris','Novembris','Decembris'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Mai','JèÆn',
		'JèÆl','Aug','Sep','Okt','Nov','Dec'],
		dayNames: ['své"tdiena','pirmdiena','otrdiena','treè≠diena','ceturtdiena','piektdiena','sestdiena'],
		dayNamesShort: ['svt','prm','otr','tre','ctr','pkt','sst'],
		dayNamesMin: ['Sv','Pr','Ot','Tr','Ct','Pk','Ss'],
		weekHeader: 'Nav',
		dateFormat: 'dd-mm-yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['lv']);
});

