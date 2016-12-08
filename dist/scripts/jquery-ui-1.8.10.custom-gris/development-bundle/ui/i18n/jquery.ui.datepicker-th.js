‹¯¨/* Thai initialisation for the jQuery UI date picker plugin. */
/* Written by pipo (pipo@sixhead.com). */
jQuery(function($){
	$.datepicker.regional['th'] = {
		closeText: '…,>…,'…,"',
		prevText: '&laquo;&nbsp;…,›…1%…,-…,T',
		nextText: '…,-…,ñ…,"…1,…,>&nbsp;&raquo;',
		currentText: '…,…,ñ…,T…,T…,æ…1%',
		monthNames: ['…,­…,_…,œ…,ı…,,…,­','…,_…,,…,­…,ÿ…,ı…,z…,ñ…,T…,~…1O','…,­…,æ…,T…,ı…,,…,­','…1_…,­…,c…,ı…,›…,T','…,z…,…,c…,ÿ…,ı…,,…,­','…,­…,'…,-…,,…,T…,ı…,›…,T',
		'…,_…,œ…,_…,Z…,ı…,,…,­','…,¦…,'…,Ø…,®…,ı…,,…,­','…,_…,ñ…,T…,›…,ı…,›…,T','…,…,,…,…,ı…,,…,­','…,z…,…,"…,^…,'…,_…,ı…,›…,T','…,~…,ñ…,T…,…,ı…,,…,­'],
		monthNamesShort: ['…,­.…,,.','…,_.…,z.','…,­…,æ.…,,.','…1_…,­.…,›.','…,z.…,,.','…,­…,'.…,›.',
		'…,_.…,,.','…,¦.…,,.','…,_.…,›.','…,.…,,.','…,z.…,›.','…,~.…,,.'],
		dayNames: ['…,-…,ı…,-…,'…,…,›…1O','…,^…,ñ…,T…,-…,œ…1O','…,-…,ñ…,Ø…,,…,ı…,œ','…,z…,,…,~','…,z…,…,®…,ñ…,¦…,s…,"…,æ','…,"…,,…,_…,œ…1O','…1_…,¦…,ı…,œ…1O'],
		dayNamesShort: ['…,-…,ı.','…,^.','…,-.','…,z.','…,z…,.','…,".','…,¦.'],
		dayNamesMin: ['…,-…,ı.','…,^.','…,-.','…,z.','…,z…,.','…,".','…,¦.'],
		weekHeader: 'Wk',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['th']);
});

