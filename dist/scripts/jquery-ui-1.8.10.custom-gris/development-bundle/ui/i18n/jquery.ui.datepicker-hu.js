/* Hungarian initialisation for the jQuery UI date picker plugin. */
/* Written by Istvan Karaszi (jquery@spam.raszi.hu). */
jQuery(function($){
	$.datepicker.regional['hu'] = {
		closeText: 'bezA≠rA≠s',
		prevText: '&laquo;&nbsp;vissza',
		nextText: 'elè`re&nbsp;&raquo;',
		currentText: 'ma',
		monthNames: ['JanuA≠r', 'FebruA≠r', 'MA≠rcius', 'A_prilis', 'MA≠jus', 'JAßnius',
		'JAßlius', 'Augusztus', 'Szeptember', 'OktA3ber', 'November', 'December'],
		monthNamesShort: ['Jan', 'Feb', 'MA≠r', 'A_pr', 'MA≠j', 'JAßn',
		'JAßl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'],
		dayNames: ['VasA≠rnap', 'HActfA', 'Kedd', 'Szerda', 'CsA¨tArtAk', 'PAcntek', 'Szombat'],
		dayNamesShort: ['Vas', 'HAct', 'Ked', 'Sze', 'CsA¨', 'PAcn', 'Szo'],
		dayNamesMin: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
		weekHeader: 'HAc',
		dateFormat: 'yy-mm-dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['hu']);
});


