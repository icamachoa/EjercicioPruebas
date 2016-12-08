/* Armenian(UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Levon Zakaryan (levon.zakaryan@gmail.com)*/
jQuery(function($){
	$.datepicker.regional['hy'] = {
		closeText: 'O"O­O_OOª',
		prevText: '&#x3c;O+O­O-.',
		nextText: 'O_O­O¯.&#x3e;',
		currentText: 'OñOæO«™.™_',
		monthNames: ['O_O,™,OO_O­™_','O"OO¨™_O_O­™_','O,O­™_O¨','OñO§™_O®Oª','O,O­OæO®O«','O_O,™,OO®O«',
		'O_O,™,OªO®O«','OOœO,O«O¨O,O«','O_OO§O¨OO'O›O™_','O_O,O_O¨OO'O›O™_','O+O,OæOO'O›O™_','O'OO_O¨OO'O›O™_'],
		monthNamesShort: ['O_O,™,OO_','O"OO¨™_','O,O­™_O¨','OñO§™_','O,O­OæO®O«','O_O,™,OO®O«',
		'O_O,™,Oª','OOœO«','O_OO§','O_O,O_','O+O,Oæ','O'OO_'],
		dayNames: ['O_O®™_O­O_O®','OO_O,™,OúO­O›OcO®','O™_O™,OúO­O›OcO®','O1O,™_O™,OúO­O›OcO®','OøO®OOœOúO­O›OcO®','O,™,™_O›O­Oc','OúO­O›O­Oc'],
		dayNamesShort: ['O_O®™_','O™_O_','O™_™,','O1™_™,','OøOOœ','O,™,™_O›','OúO›Oc'],
		dayNamesMin: ['O_O®™_','O™_O_','O™_™,','O1™_™,','OøOOœ','O,™,™_O›','OúO›Oc'],
		weekHeader: 'OØOıO_',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['hy']);
});

