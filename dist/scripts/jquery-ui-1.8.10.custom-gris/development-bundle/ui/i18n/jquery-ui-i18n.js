ãØ®/* Afrikaans initialisation for the jQuery UI date picker plugin. */
/* Written by Renier Pretorius. */
jQuery(function($){
	$.datepicker.regional['af'] = {
		closeText: 'Selekteer',
		prevText: 'Vorige',
		nextText: 'Volgende',
		currentText: 'Vandag',
		monthNames: ['Januarie','Februarie','Maart','April','Mei','Junie',
		'Julie','Augustus','September','Oktober','November','Desember'],
		monthNamesShort: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun',
		'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
		dayNames: ['Sondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrydag', 'Saterdag'],
		dayNamesShort: ['Son', 'Maa', 'Din', 'Woe', 'Don', 'Vry', 'Sat'],
		dayNamesMin: ['So','Ma','Di','Wo','Do','Vr','Sa'],
		weekHeader: 'Wk',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['af']);
});
/* Algerian Arabic Translation for jQuery UI date picker plugin. (can be used for Tunisia)*/
/* Mohamed Cherif BOUCHELAGHEM -- cherifbouchelaghem@yahoo.fr */

jQuery(function($){
	$.datepicker.regional['ar-DZ'] = {
		closeText: 'OùOßU,OU,',
		prevText: '&#x3c;OU,O3OO"U,',
		nextText: 'OU,O¶OU,US&#x3e;',
		currentText: 'OU,USU^U.',
		monthNames: ['O™OU+U_US', 'U_USU_OÒUS', 'U.OOÒO3', 'OúU_OÒUSU,', 'U.OUS', 'O™U^OU+',
		'O™U^USU,USOc', 'OúU^O¶', 'O3O"O¶U.O"OÒ','OúUüO¶U^O"OÒ', 'U+U^U_U.O"OÒ', 'O_USO3U.O"OÒ'],
		monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		dayNames: ['OU,OúO-O_', 'OU,OOÆU+USU+', 'OU,OÆU,OOÆOO≠', 'OU,OúOÒO"O1OO≠', 'OU,OrU.USO3', 'OU,O™U.O1Oc', 'OU,O3O"O¶'],
		dayNamesShort: ['OU,OúO-O_', 'OU,OOÆU+USU+', 'OU,OÆU,OOÆOO≠', 'OU,OúOÒO"O1OO≠', 'OU,OrU.USO3', 'OU,O™U.O1Oc', 'OU,O3O"O¶'],
		dayNamesMin: ['OU,OúO-O_', 'OU,OOÆU+USU+', 'OU,OÆU,OOÆOO≠', 'OU,OúOÒO"O1OO≠', 'OU,OrU.USO3', 'OU,O™U.O1Oc', 'OU,O3O"O¶'],
		weekHeader: 'OúO3O"U^O1',
		dateFormat: 'dd/mm/yy',
		firstDay: 6,
  		isRTL: true,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ar-DZ']);
});
ãØ®/* Arabic Translation for jQuery UI date picker plugin. */
/* Khaled Alhourani -- me@khaledalhourani.com */
/* NOTE: monthNames are the original months names and they are the Arabic names, not the new months name U_O"OÒOUSOÒ - USU+OUSOÒ and there isn't any Arabic roots for these months */
jQuery(function($){
	$.datepicker.regional['ar'] = {
		closeText: 'OùOßU,OU,',
		prevText: '&#x3c;OU,O3OO"U,',
		nextText: 'OU,O¶OU,US&#x3e;',
		currentText: 'OU,USU^U.',
		monthNames: ['UüOU+U^U+ OU,OÆOU+US', 'O'O"OO˙', 'OõO¯OOÒ', 'U+USO3OU+', 'OõO¯OOÒ', 'O-O˝USOÒOU+',
		'O¶U.U^O˝', 'OõO"', 'OúUSU,U^U,',	'O¶O'OÒUSU+ OU,OúU^U,', 'O¶O'OÒUSU+ OU,OÆOU+US', 'UüOU+U^U+ OU,OúU^U,'],
		monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		dayNames: ['OU,OúO-O_', 'OU,OOÆU+USU+', 'OU,OÆU,OOÆOO≠', 'OU,OúOÒO"O1OO≠', 'OU,OrU.USO3', 'OU,O™U.O1Oc', 'OU,O3O"O¶'],
		dayNamesShort: ['OU,OúO-O_', 'OU,OOÆU+USU+', 'OU,OÆU,OOÆOO≠', 'OU,OúOÒO"O1OO≠', 'OU,OrU.USO3', 'OU,O™U.O1Oc', 'OU,O3O"O¶'],
		dayNamesMin: ['OU,OúO-O_', 'OU,OOÆU+USU+', 'OU,OÆU,OOÆOO≠', 'OU,OúOÒO"O1OO≠', 'OU,OrU.USO3', 'OU,O™U.O1Oc', 'OU,O3O"O¶'],
		weekHeader: 'OúO3O"U^O1',
		dateFormat: 'dd/mm/yy',
		firstDay: 6,
  		isRTL: true,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ar']);
});ãØ®/* Azerbaijani (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Jamil Najafov (necefov33@gmail.com). */
jQuery(function($) {
	$.datepicker.regional['az'] = {
		closeText: 'BaéYla',
		prevText: '&#x3c;Geri',
		nextText: 'é¯rêTli&#x3e;',
		currentText: 'BugA¨n',
		monthNames: ['Yanvar','Fevral','Mart','Aprel','May','é¯yun',
		'é¯yul','Avqust','Sentyabr','Oktyabr','Noyabr','Dekabr'],
		monthNamesShort: ['Yan','Fev','Mar','Apr','May','é¯yun',
		'é¯yul','Avq','Sen','Okt','Noy','Dek'],
		dayNames: ['Bazar','Bazar ertêTsi','AÿêTrèYêTnbêT axèYaméÒ','AÿêTrèYêTnbêT','CA¨mêT axèYaméÒ','CA¨mêT','èzêTnbêT'],
		dayNamesShort: ['B','Be','Aÿa','Aÿ','Ca','C','èz'],
		dayNamesMin: ['B','B','Aÿ','D≠','Aÿ','C','èz'],
		weekHeader: 'Hf',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['az']);
});ãØ®/* Bulgarian initialisation for the jQuery UI date picker plugin. */
/* Written by Stoyan Kyosev (http://svest.org). */
jQuery(function($){
    $.datepicker.regional['bg'] = {
        closeText: 'D˙D¯•,D˝D_•_D,',
        prevText: '&#x3c;D´D¯D˙D¯D'',
        nextText: 'D´D¯D®•_DÊD'&#x3e;',
		nextBigText: '&#x3e;&#x3e;',
        currentText: 'D'D´DÊ•_',
        monthNames: ['D_D´•üD¯•_D,','DDÊD˝•_•üD¯•_D,','DoD¯•_•,','D_D®•_D,DØ','DoD¯D1','DrD´D,',
        'DrDØD,','D_D˝D3•ü•_•,','D≠DÊD®•,DÊD¨D˝•_D,','DzDß•,D_D¨D˝•_D,','D_D_DÊD¨D˝•_D,','D"DÊDßDÊD¨D˝•_D,'],
        monthNamesShort: ['D_D´•ü','DDÊD˝','DoD¯•_','D_D®•_','DoD¯D1','DrD´D,',
        'DrDØD,','D_D˝D3','D≠DÊD®','DzDß•,','D_D_D˝','D"DÊDß'],
        dayNames: ['D_DÊD'DÊDØ•_','DYD_D´DÊD'DÊDØD´D,Dß','D'•,D_•_D´D,Dß','D≠•_•_D'D¯','DDÊ•,D˝•S•_•,•SDß','DYDÊ•,•SDß','D≠•SDÒD_•,D¯'],
        dayNamesShort: ['D_DÊD'','DYD_D´','D'•,D_','D≠•_•_','DDÊ•,','DYDÊ•,','D≠•SDÒ'],
        dayNamesMin: ['D_DÊ','DYD_','D'•,','D≠•_','DDÊ','DYDÊ','D≠•S'],
		weekHeader: 'Wk',
        dateFormat: 'dd.mm.yy',
		firstDay: 1,
        isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
    $.datepicker.setDefaults($.datepicker.regional['bg']);
});
ãØ®/* Bosnian i18n for the jQuery UI date picker plugin. */
/* Written by Kenan Konjo. */
jQuery(function($){
	$.datepicker.regional['bs'] = {
		closeText: 'Zatvori', 
		prevText: '&#x3c;', 
		nextText: '&#x3e;', 
		currentText: 'Danas', 
		monthNames: ['Januar','Februar','Mart','April','Maj','Juni',
		'Juli','August','Septembar','Oktobar','Novembar','Decembar'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
		'Jul','Aug','Sep','Okt','Nov','Dec'],
		dayNames: ['Nedelja','Ponedeljak','Utorak','Srijeda','éOetvrtak','Petak','Subota'],
		dayNamesShort: ['Ned','Pon','Uto','Sri','éOet','Pet','Sub'],
		dayNamesMin: ['Ne','Po','Ut','Sr','éOe','Pe','Su'],
		weekHeader: 'Wk',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['bs']);
});/* InicialitzaciA3 en catalAˇ per a l'extenciA3 'calendar' per jQuery. */
/* Writers: (joan.leon@gmail.com). */
jQuery(function($){
	$.datepicker.regional['ca'] = {
		closeText: 'Tancar',
		prevText: '&#x3c;Ant',
		nextText: 'Seg&#x3e;',
		currentText: 'Avui',
		monthNames: ['Gener','Febrer','Mar&ccedil;','Abril','Maig','Juny',
		'Juliol','Agost','Setembre','Octubre','Novembre','Desembre'],
		monthNamesShort: ['Gen','Feb','Mar','Abr','Mai','Jun',
		'Jul','Ago','Set','Oct','Nov','Des'],
		dayNames: ['Diumenge','Dilluns','Dimarts','Dimecres','Dijous','Divendres','Dissabte'],
		dayNamesShort: ['Dug','Dln','Dmt','Dmc','Djs','Dvn','Dsb'],
		dayNamesMin: ['Dg','Dl','Dt','Dc','Dj','Dv','Ds'],
		weekHeader: 'Sm',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ca']);
});ãØ®/* Czech initialisation for the jQuery UI date picker plugin. */
/* Written by Tomas Muller (tomas@tomas-muller.net). */
jQuery(function($){
	$.datepicker.regional['cs'] = {
		closeText: 'ZavèTA-t',
		prevText: '&#x3c;DèTA-ve',
		nextText: 'Pozdé>ji&#x3e;',
		currentText: 'NynA-',
		monthNames: ['leden','Aßnor','bèTezen','duben','kvé>ten','é_erven',
        'é_ervenec','srpen','zA≠èTA-','èTA-jen','listopad','prosinec'],
		monthNamesShort: ['led','Aßno','bèTe','dub','kvé>','é_er',
		'é_vc','srp','zA≠èT','èTA-j','lis','pro'],
		dayNames: ['nedé>le', 'pondé>lA-', 'AßterA´', 'stèTeda', 'é_tvrtek', 'pA≠tek', 'sobota'],
		dayNamesShort: ['ne', 'po', 'Aßt', 'st', 'é_t', 'pA≠', 'so'],
		dayNamesMin: ['ne','po','Aßt','st','é_t','pA≠','so'],
		weekHeader: 'TA´d',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['cs']);
});
ãØ®/* Danish initialisation for the jQuery UI date picker plugin. */
/* Written by Jan Christensen ( deletestuff@gmail.com). */
jQuery(function($){
    $.datepicker.regional['da'] = {
		closeText: 'Luk',
        prevText: '&#x3c;Forrige',
		nextText: 'NA›ste&#x3e;',
		currentText: 'Idag',
        monthNames: ['Januar','Februar','Marts','April','Maj','Juni',
        'Juli','August','September','Oktober','November','December'],
        monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
        'Jul','Aug','Sep','Okt','Nov','Dec'],
		dayNames: ['SA,ndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','LA,rdag'],
		dayNamesShort: ['SA,n','Man','Tir','Ons','Tor','Fre','LA,r'],
		dayNamesMin: ['SA,','Ma','Ti','On','To','Fr','LA,'],
		weekHeader: 'Uge',
        dateFormat: 'dd-mm-yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
    $.datepicker.setDefaults($.datepicker.regional['da']);
});
ãØ®/* German initialisation for the jQuery UI date picker plugin. */
/* Written by Milian Wolff (mail@milianw.de). */
jQuery(function($){
	$.datepicker.regional['de'] = {
		closeText: 'schlieAYen',
		prevText: '&#x3c;zurA¨ck',
		nextText: 'Vor&#x3e;',
		currentText: 'heute',
		monthNames: ['Januar','Februar','MArz','April','Mai','Juni',
		'Juli','August','September','Oktober','November','Dezember'],
		monthNamesShort: ['Jan','Feb','MAr','Apr','Mai','Jun',
		'Jul','Aug','Sep','Okt','Nov','Dez'],
		dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
		dayNamesShort: ['So','Mo','Di','Mi','Do','Fr','Sa'],
		dayNamesMin: ['So','Mo','Di','Mi','Do','Fr','Sa'],
		weekHeader: 'Wo',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['de']);
});
ãØ®/* Greek (el) initialisation for the jQuery UI date picker plugin. */
/* Written by Alex Cicovic (http://www.alexcicovic.com) */
jQuery(function($){
	$.datepicker.regional['el'] = {
		closeText: 'IsIØIÊI_IüI1I¨I®',
		prevText: 'IˇI_I®I˙I3I®I_I¨IÊI´I®I,',
		nextText: 'II_IOI¨IÊI´I®I,',
		currentText: 'II_I-IÿI%I´ IoIrI´IÒI,',
		monthNames: ['ITIÒI´I®I.I™I_I1I®I,','I›IÊI˝I_I®I.I™I_I1I®I,','IoI™I_I,I1I®I,','I`I_I_I_IØI1I®I,','IoI™I1I®I,','ITI®I_I´I1I®I,',
		'ITI®I_IØI1I®I,','I`I_I3I®I.IüI,I®I,','IúIÊI_I,I-I¨I˝I_I1I®I,','IYIßI,IZI˝I_I1I®I,','I_I®I-I¨I˝I_I1I®I,','I"IÊIßI-I¨I˝I_I1I®I,'],
		monthNamesShort: ['ITIÒI´','I›IÊI˝','IoIÒI_','I`I_I_','IoIÒI1','ITI®I.I´',
		'ITI®I.IØ','I`I.I3','IúIÊI_','IYIßI,','I_I®IÊ','I"IÊIß'],
		dayNames: ['IsI.I_I1IÒIßIr','I"IÊI.I,I-I_IÒ','II_I_I,I˙','IIÊI,I™I_I,I˙','IˇI-I¨I_I,I˙','IˇIÒI_IÒIüIßIÊI.Ir','IúI™I˝I˝IÒI,I®'],
		dayNamesShort: ['IsI.I_','I"IÊI.','II_I1','IIÊI,','IˇIÊI¨','IˇIÒI_','IúIÒI˝'],
		dayNamesMin: ['IsI.','I"IÊ','II_','IIÊ','IˇIÊ','IˇIÒ','IúIÒ'],
		weekHeader: 'II˝I'',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['el']);
});/* English/Australia initialisation for the jQuery UI date picker plugin. */
/* Based on the en-GB initialisation. */
jQuery(function($){
	$.datepicker.regional['en-AU'] = {
		closeText: 'Done',
		prevText: 'Prev',
		nextText: 'Next',
		currentText: 'Today',
		monthNames: ['January','February','March','April','May','June',
		'July','August','September','October','November','December'],
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
		weekHeader: 'Wk',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['en-AU']);
});
ãØ®/* English/UK initialisation for the jQuery UI date picker plugin. */
/* Written by Stuart. */
jQuery(function($){
	$.datepicker.regional['en-GB'] = {
		closeText: 'Done',
		prevText: 'Prev',
		nextText: 'Next',
		currentText: 'Today',
		monthNames: ['January','February','March','April','May','June',
		'July','August','September','October','November','December'],
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
		weekHeader: 'Wk',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['en-GB']);
});
/* English/New Zealand initialisation for the jQuery UI date picker plugin. */
/* Based on the en-GB initialisation. */
jQuery(function($){
	$.datepicker.regional['en-NZ'] = {
		closeText: 'Done',
		prevText: 'Prev',
		nextText: 'Next',
		currentText: 'Today',
		monthNames: ['January','February','March','April','May','June',
		'July','August','September','October','November','December'],
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
		weekHeader: 'Wk',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['en-NZ']);
});
ãØ®/* Esperanto initialisation for the jQuery UI date picker plugin. */
/* Written by Olivier M. (olivierweb@ifrance.com). */
jQuery(function($){
	$.datepicker.regional['eo'] = {
		closeText: 'Fermi',
		prevText: '&lt;Anta',
		nextText: 'Sekv&gt;',
		currentText: 'Nuna',
		monthNames: ['Januaro','Februaro','Marto','Aprilo','Majo','Junio',
		'Julio','Aè-gusto','Septembro','Oktobro','Novembro','Decembro'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
		'Jul','Aè-g','Sep','Okt','Nov','Dec'],
		dayNames: ['Dimané%o','Lundo','Mardo','Merkredo','é'aè-do','Vendredo','Sabato'],
		dayNamesShort: ['Dim','Lun','Mar','Mer','é'aè-','Ven','Sab'],
		dayNamesMin: ['Di','Lu','Ma','Me','é'a','Ve','Sa'],
		weekHeader: 'Sb',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['eo']);
});
/* InicializaciA3n en espaAÒol para la extensiA3n 'UI date picker' para jQuery. */
/* Traducido por Vester (xvester@gmail.com). */
jQuery(function($){
	$.datepicker.regional['es'] = {
		closeText: 'Cerrar',
		prevText: '&#x3c;Ant',
		nextText: 'Sig&#x3e;',
		currentText: 'Hoy',
		monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
		'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
		monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
		'Jul','Ago','Sep','Oct','Nov','Dic'],
		dayNames: ['Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado'],
		dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
		dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S&aacute;'],
		weekHeader: 'Sm',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['es']);
});ãØ®/* Estonian initialisation for the jQuery UI date picker plugin. */
/* Written by Mart SAÊmermaa (mrts.pydev at gmail com). */
jQuery(function($){
	$.datepicker.regional['et'] = {
		closeText: 'Sulge',
		prevText: 'Eelnev',
		nextText: 'JArgnev',
		currentText: 'TAna',
		monthNames: ['Jaanuar','Veebruar','MArts','Aprill','Mai','Juuni',
		'Juuli','August','September','Oktoober','November','Detsember'],
		monthNamesShort: ['Jaan', 'Veebr', 'MArts', 'Apr', 'Mai', 'Juuni',
		'Juuli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dets'],
		dayNames: ['PA¨hapAev', 'EsmaspAev', 'TeisipAev', 'KolmapAev', 'NeljapAev', 'Reede', 'LaupAev'],
		dayNamesShort: ['PA¨hap', 'Esmasp', 'Teisip', 'Kolmap', 'Neljap', 'Reede', 'Laup'],
		dayNamesMin: ['P','E','T','K','N','R','L'],
		weekHeader: 'Sm',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['et']);
}); ãØ®/* Euskarako oinarria 'UI date picker' jquery-ko extentsioarentzat */
/* Karrikas-ek itzulia (karrikas@karrikas.com) */
jQuery(function($){
	$.datepicker.regional['eu'] = {
		closeText: 'Egina',
		prevText: '&#x3c;Aur',
		nextText: 'Hur&#x3e;',
		currentText: 'Gaur',
		monthNames: ['Urtarrila','Otsaila','Martxoa','Apirila','Maiatza','Ekaina',
		'Uztaila','Abuztua','Iraila','Urria','Azaroa','Abendua'],
		monthNamesShort: ['Urt','Ots','Mar','Api','Mai','Eka',
		'Uzt','Abu','Ira','Urr','Aza','Abe'],
		dayNames: ['Igandea','Astelehena','Asteartea','Asteazkena','Osteguna','Ostirala','Larunbata'],
		dayNamesShort: ['Iga','Ast','Ast','Ast','Ost','Ost','Lar'],
		dayNamesMin: ['Ig','As','As','As','Os','Os','La'],
		weekHeader: 'Wk',
		dateFormat: 'yy/mm/dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['eu']);
});ãØ®/* Persian (Farsi) Translation for the jQuery UI date picker plugin. */
/* Javad Mowlanezhad -- jmowla@gmail.com */
/* Jalali calendar should supported soon! (Its implemented but I have to test it) */
jQuery(function($) {
	$.datepicker.regional['fa'] = {
		closeText: 'O"O3O¶U+',
		prevText: '&#x3c;U,O"U,US',
		nextText: 'O"O1O_US&#x3e;',
		currentText: 'OU.OÒU^O˝',
		monthNames: ['U_OÒU^OÒO_USU+','OOÒO_USO"UÿO'O¶','OrOÒO_OO_','O¶USOÒ','U.OÒO_OO_','O'UÿOÒUSU^OÒ',
		'U.UÿOÒ','OõO"OU+','OõO¯OÒ','O_US','O"UÿU.U+','OO3U_U+O_'],
		monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		dayNames: ['USUcO'U+O"Uÿ','O_U^O'U+O"Uÿ','O3UÿÉ_OO'U+O"Uÿ','U+UÿOOÒO'U+O"Uÿ','U_U+O™O'U+O"Uÿ','O™U.O1Uÿ','O'U+O"Uÿ'],
		dayNamesShort: ['US','O_','O3','U+','U_','O™', 'O''],
		dayNamesMin: ['US','O_','O3','U+','U_','O™', 'O''],
		weekHeader: 'UÿU_',
		dateFormat: 'yy/mm/dd',
		firstDay: 6,
		isRTL: true,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['fa']);
});/* Finnish initialisation for the jQuery UI date picker plugin. */
/* Written by Harri Kilpiã®´ (harrikilpio@gmail.com). */
jQuery(function($){
    $.datepicker.regional['fi'] = {
		closeText: 'Sulje',
		prevText: '&laquo;Edellinen',
		nextText: 'Seuraava&raquo;',
		currentText: 'T&auml;n&auml;&auml;n',
        monthNames: ['Tammikuu','Helmikuu','Maaliskuu','Huhtikuu','Toukokuu','Kes&auml;kuu',
        'Hein&auml;kuu','Elokuu','Syyskuu','Lokakuu','Marraskuu','Joulukuu'],
        monthNamesShort: ['Tammi','Helmi','Maalis','Huhti','Touko','Kes&auml;',
        'Hein&auml;','Elo','Syys','Loka','Marras','Joulu'],
		dayNamesShort: ['Su','Ma','Ti','Ke','To','Pe','Su'],
		dayNames: ['Sunnuntai','Maanantai','Tiistai','Keskiviikko','Torstai','Perjantai','Lauantai'],
		dayNamesMin: ['Su','Ma','Ti','Ke','To','Pe','La'],
		weekHeader: 'Vk',
        dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
    $.datepicker.setDefaults($.datepicker.regional['fi']);
});
ãØ®/* Faroese initialisation for the jQuery UI date picker plugin */
/* Written by Sverri Mohr Olsen, sverrimo@gmail.com */
jQuery(function($){
	$.datepicker.regional['fo'] = {
		closeText: 'Lat aftur',
		prevText: '&#x3c;Fyrra',
		nextText: 'NA›sta&#x3e;',
		currentText: 'A_ dag',
		monthNames: ['Januar','Februar','Mars','AprA-l','Mei','Juni',
		'Juli','August','September','Oktober','November','Desember'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Mei','Jun',
		'Jul','Aug','Sep','Okt','Nov','Des'],
		dayNames: ['Sunnudagur','MA≠nadagur','TA´sdagur','Mikudagur','HA3sdagur','FrA-ggjadagur','Leyardagur'],
		dayNamesShort: ['Sun','MA≠n','TA´s','Mik','HA3s','FrA-','Ley'],
		dayNamesMin: ['Su','MA≠','TA´','Mi','HA3','Fr','Le'],
		weekHeader: 'Vk',
		dateFormat: 'dd-mm-yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['fo']);
});
ãØ®/* Swiss-French initialisation for the jQuery UI date picker plugin. */
/* Written Martin Voelkle (martin.voelkle@e-tc.ch). */
jQuery(function($){
	$.datepicker.regional['fr-CH'] = {
		closeText: 'Fermer',
		prevText: '&#x3c;PrAcc',
		nextText: 'Suiv&#x3e;',
		currentText: 'Courant',
		monthNames: ['Janvier','FAcvrier','Mars','Avril','Mai','Juin',
		'Juillet','AoAØt','Septembre','Octobre','Novembre','DAccembre'],
		monthNamesShort: ['Jan','FAcv','Mar','Avr','Mai','Jun',
		'Jul','AoAØ','Sep','Oct','Nov','DAcc'],
		dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
		dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
		dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
		weekHeader: 'Sm',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['fr-CH']);
});ãØ®/* French initialisation for the jQuery UI date picker plugin. */
/* Written by Keith Wood (kbwood{at}iinet.com.au),
              StAcphane Nahmani (sholby@sholby.net),
              StAcphane Raimbault <stephane.raimbault@gmail.com> */
jQuery(function($){
	$.datepicker.regional['fr'] = {
		closeText: 'Fermer',
		prevText: 'PrAccAcdent',
		nextText: 'Suivant',
		currentText: 'Aujourd\'hui',
		monthNames: ['Janvier','FAcvrier','Mars','Avril','Mai','Juin',
		'Juillet','AoAØt','Septembre','Octobre','Novembre','DAccembre'],
		monthNamesShort: ['Janv.','FAcvr.','Mars','Avril','Mai','Juin',
		'Juil.','AoAØt','Sept.','Oct.','Nov.','DAcc.'],
		dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
		dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
		dayNamesMin: ['D','L','M','M','J','V','S'],
		weekHeader: 'Sem.',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['fr']);
});
/* Galician localization for 'UI date picker' jQuery extension. */
/* Translated by Jorge Barreiro <yortx.barry@gmail.com>. */
jQuery(function($){
	$.datepicker.regional['gl'] = {
		closeText: 'Pechar',
		prevText: '&#x3c;Ant',
		nextText: 'Seg&#x3e;',
		currentText: 'Hoxe',
		monthNames: ['Xaneiro','Febreiro','Marzo','Abril','Maio','XuAÒo',
		'Xullo','Agosto','Setembro','Outubro','Novembro','Decembro'],
		monthNamesShort: ['Xan','Feb','Mar','Abr','Mai','XuAÒ',
		'Xul','Ago','Set','Out','Nov','Dec'],
		dayNames: ['Domingo','Luns','Martes','M&eacute;rcores','Xoves','Venres','S&aacute;bado'],
		dayNamesShort: ['Dom','Lun','Mar','M&eacute;r','Xov','Ven','S&aacute;b'],
		dayNamesMin: ['Do','Lu','Ma','M&eacute;','Xo','Ve','S&aacute;'],
		weekHeader: 'Sm',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['gl']);
});ãØ®/* Hebrew initialisation for the UI Datepicker extension. */
/* Written by Amir Hardon (ahardon at gmail dot com). */
jQuery(function($){
	$.datepicker.regional['he'] = {
		closeText: 'x≠x'xx"',
		prevText: '&#x3c;x"xxx"x_',
		nextText: 'x"x`x_&#x3e;',
		currentText: 'x"xTxx_',
		monthNames: ['xTxˇxx_x"','xx`x"xx_x"','xzx"xù','x_xx"xTxo','xzx_xT','xTxxˇxT',
		'xTxxoxT','x_xx'xx≠x~','x≠xx~xzx`x"','x_xxx~xx`x"','xˇxx`xzx`x"','x"x›xzx`x"'],
		monthNamesShort: ['1','2','3','4','5','6',
		'7','8','9','10','11','12'],
		dayNames: ['x"x_xcxxY','xcxˇxT','xcxoxTxcxT','x"x`xTxõxT','x-xzxTxcxT','xcxTxcxT','xcx`x¶'],
		dayNamesShort: ['x_\'','x`\'','x'\'','x"\'','x"\'','x\'','xcx`x¶'],
		dayNamesMin: ['x_\'','x`\'','x'\'','x"\'','x"\'','x\'','xcx`x¶'],
		weekHeader: 'Wk',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: true,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['he']);
});
ãØ®/* Croatian i18n for the jQuery UI date picker plugin. */
/* Written by Vjekoslav Nesek. */
jQuery(function($){
	$.datepicker.regional['hr'] = {
		closeText: 'Zatvori',
		prevText: '&#x3c;',
		nextText: '&#x3e;',
		currentText: 'Danas',
		monthNames: ['Sijeé_anj','Veljaé_a','Oè_ujak','Travanj','Svibanj','Lipanj',
		'Srpanj','Kolovoz','Rujan','Listopad','Studeni','Prosinac'],
		monthNamesShort: ['Sij','Velj','Oè_u','Tra','Svi','Lip',
		'Srp','Kol','Ruj','Lis','Stu','Pro'],
		dayNames: ['Nedjelja','Ponedjeljak','Utorak','Srijeda','éOetvrtak','Petak','Subota'],
		dayNamesShort: ['Ned','Pon','Uto','Sri','éOet','Pet','Sub'],
		dayNamesMin: ['Ne','Po','Ut','Sr','éOe','Pe','Su'],
		weekHeader: 'Tje',
		dateFormat: 'dd.mm.yy.',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['hr']);
});/* Hungarian initialisation for the jQuery UI date picker plugin. */
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
/* Armenian(UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Levon Zakaryan (levon.zakaryan@gmail.com)*/
jQuery(function($){
	$.datepicker.regional['hy'] = {
		closeText: 'O"O≠O_OùO™',
		prevText: '&#x3c;O+O≠O-.',
		nextText: 'O_O≠OØ.&#x3e;',
		currentText: 'OÒOÊO´ô.ô_',
		monthNames: ['O_O,ô,OO_O≠ô_','O"OùO®ô_O_O≠ô_','O,O≠ô_O®','OÒOßô_OÆO™','O,O≠OÊOÆO´','O_O,ô,OOÆO´',
		'O_O,ô,O™OÆO´','OOúO,O´O®O,O´','O_OùOßO®OùO'OõOùô_','O_O,O_O®OùO'OõOùô_','O+O,OÊOùO'OõOùô_','O'OùO_O®OùO'OõOùô_'],
		monthNamesShort: ['O_O,ô,OO_','O"OùO®ô_','O,O≠ô_O®','OÒOßô_','O,O≠OÊOÆO´','O_O,ô,OOÆO´',
		'O_O,ô,O™','OOúO´','O_OùOß','O_O,O_','O+O,OÊ','O'OùO_'],
		dayNames: ['O_OÆô_O≠O_OÆ','OùO_O,ô,O˙O≠OõOcOÆ','Oùô_Oùô,O˙O≠OõOcOÆ','O1O,ô_Oùô,O˙O≠OõOcOÆ','O¯OÆOOúO˙O≠OõOcOÆ','O,ô,ô_OõO≠Oc','O˙O≠OõO≠Oc'],
		dayNamesShort: ['O_OÆô_','Oùô_O_','Oùô_ô,','O1ô_ô,','O¯OOú','O,ô,ô_Oõ','O˙OõOc'],
		dayNamesMin: ['O_OÆô_','Oùô_O_','Oùô_ô,','O1ô_ô,','O¯OOú','O,ô,ô_Oõ','O˙OõOc'],
		weekHeader: 'OÿO˝O_',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['hy']);
});/* Indonesian initialisation for the jQuery UI date picker plugin. */
/* Written by Deden Fathurahman (dedenf@gmail.com). */
jQuery(function($){
	$.datepicker.regional['id'] = {
		closeText: 'Tutup',
		prevText: '&#x3c;mundur',
		nextText: 'maju&#x3e;',
		currentText: 'hari ini',
		monthNames: ['Januari','Februari','Maret','April','Mei','Juni',
		'Juli','Agustus','September','Oktober','Nopember','Desember'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Mei','Jun',
		'Jul','Agus','Sep','Okt','Nop','Des'],
		dayNames: ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'],
		dayNamesShort: ['Min','Sen','Sel','Rab','kam','Jum','Sab'],
		dayNamesMin: ['Mg','Sn','Sl','Rb','Km','jm','Sb'],
		weekHeader: 'Mg',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['id']);
});/* Icelandic initialisation for the jQuery UI date picker plugin. */
/* Written by Haukur H. Thorsson (haukur@eskill.is). */
jQuery(function($){
	$.datepicker.regional['is'] = {
		closeText: 'Loka',
		prevText: '&#x3c; Fyrri',
		nextText: 'N&aelig;sti &#x3e;',
		currentText: '&Iacute; dag',
		monthNames: ['Jan&uacute;ar','Febr&uacute;ar','Mars','Apr&iacute;l','Ma&iacute','J&uacute;n&iacute;',
		'J&uacute;l&iacute;','&Aacute;g&uacute;st','September','Okt&oacute;ber','N&oacute;vember','Desember'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Ma&iacute;','J&uacute;n',
		'J&uacute;l','&Aacute;g&uacute;','Sep','Okt','N&oacute;v','Des'],
		dayNames: ['Sunnudagur','M&aacute;nudagur','&THORN;ri&eth;judagur','Mi&eth;vikudagur','Fimmtudagur','F&ouml;studagur','Laugardagur'],
		dayNamesShort: ['Sun','M&aacute;n','&THORN;ri','Mi&eth;','Fim','F&ouml;s','Lau'],
		dayNamesMin: ['Su','M&aacute;','&THORN;r','Mi','Fi','F&ouml;','La'],
		weekHeader: 'Vika',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['is']);
});/* Italian initialisation for the jQuery UI date picker plugin. */
/* Written by Antonello Pasella (antonello.pasella@gmail.com). */
jQuery(function($){
	$.datepicker.regional['it'] = {
		closeText: 'Chiudi',
		prevText: '&#x3c;Prec',
		nextText: 'Succ&#x3e;',
		currentText: 'Oggi',
		monthNames: ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno',
			'Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
		monthNamesShort: ['Gen','Feb','Mar','Apr','Mag','Giu',
			'Lug','Ago','Set','Ott','Nov','Dic'],
		dayNames: ['Domenica','Luned&#236','Marted&#236','Mercoled&#236','Gioved&#236','Venerd&#236','Sabato'],
		dayNamesShort: ['Dom','Lun','Mar','Mer','Gio','Ven','Sab'],
		dayNamesMin: ['Do','Lu','Ma','Me','Gi','Ve','Sa'],
		weekHeader: 'Sm',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['it']);
});
ãØ®/* Japanese initialisation for the jQuery UI date picker plugin. */
/* Written by Kentaro SATO (kentaro@ranvis.com). */
jQuery(function($){
	$.datepicker.regional['ja'] = {
		closeText: 'Ç-%a_~a,<',
		prevText: '&#x3c;Ü%_',
		nextText: 'ë™≠&#x3e;',
		currentText: 'ÑØSë-ù',
		monthNames: ['1ëo^','2ëo^','3ëo^','4ëo^','5ëo^','6ëo^',
		'7ëo^','8ëo^','9ëo^','10ëo^','11ëo^','12ëo^'],
		monthNamesShort: ['1ëo^','2ëo^','3ëo^','4ëo^','5ëo^','6ëo^',
		'7ëo^','8ëo^','9ëo^','10ëo^','11ëo^','12ëo^'],
		dayNames: ['ë-ùë>oë-ù','ëo^ë>oë-ù','á_Æë>oë-ù','ë¯'ë>oë-ù','ëo"ë>oë-ù','Çÿ`ë>oë-ù','ÜoYë>oë-ù'],
		dayNamesShort: ['ë-ù','ëo^','á_Æ','ë¯'','ëo"','Çÿ`','ÜoY'],
		dayNamesMin: ['ë-ù','ëo^','á_Æ','ë¯'','ëo"','Çÿ`','ÜoY'],
		weekHeader: 'Ç_Ò',
		dateFormat: 'yy/mm/dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: 'Ü1''};
	$.datepicker.setDefaults($.datepicker.regional['ja']);
});/* Korean initialisation for the jQuery calendar extension. */
/* Written by DaeKwon Kang (ncrash.dk@gmail.com). */
jQuery(function($){
	$.datepicker.regional['ko'] = {
		closeText: 'â<Æà,¯',
		prevText: 'ç_'çˇ,â<™',
		nextText: 'â<ç_Oâ<™',
		currentText: 'ç~âS~',
		monthNames: ['1ç>"(JAN)','2ç>"(FEB)','3ç>"(MAR)','4ç>"(APR)','5ç>"(MAY)','6ç>"(JUN)',
		'7ç>"(JUL)','8ç>"(AUG)','9ç>"(SEP)','10ç>"(OCT)','11ç>"(NOV)','12ç>"(DEC)'],
		monthNamesShort: ['1ç>"(JAN)','2ç>"(FEB)','3ç>"(MAR)','4ç>"(APR)','5ç>"(MAY)','6ç>"(JUN)',
		'7ç>"(JUL)','8ç>"(AUG)','9ç>"(SEP)','10ç>"(OCT)','11ç>"(NOV)','12ç>"(DEC)'],
		dayNames: ['ç_¨','ç>"','°T"','ç^~','â¶c','à,^','°+ˇ'],
		dayNamesShort: ['ç_¨','ç>"','°T"','ç^~','â¶c','à,^','°+ˇ'],
		dayNamesMin: ['ç_¨','ç>"','°T"','ç^~','â¶c','à,^','°+ˇ'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: 'â.,'};
	$.datepicker.setDefaults($.datepicker.regional['ko']);
});/* Kazakh (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Dmitriy Karasyov (dmitriy.karasyov@gmail.com). */
jQuery(function($){
	$.datepicker.regional['kz'] = {
		closeText: 'D-D¯DÒ•ü',
		prevText: '&#x3c;D_DØD'•<OúO"•<',
		nextText: 'DsDÊDØDÊ•_•-&#x3e;',
		currentText: 'D`O_D3•-D´',
		monthNames: ['OsD¯Oú•,D¯•_','D_O>D®D¯D´','D_D¯•ü•_•<D˙','D≠OT•ü•-•_','DoD¯D¨•<•_','DoD¯•ü•_•<D¨',
		'D"•-DØD'DÊ','DõD¯D¨•<D˙','Os•<•_DßO_D1DÊDß','OsD¯D˙D¯D´','OsD¯•_D¯•^D¯','D-DÊDØ•,D_O>•_D¯D´'],
		monthNamesShort: ['OsD¯Oú','D_O>D®','D_D¯•ü','D≠OT•ü','DoD¯D¨','DoD¯•ü',
		'D"•-DØ','DõD¯D¨','Os•<•_','OsD¯D˙','OsD¯•_','D-DÊDØ'],
		dayNames: ['D-DÊDß•_DÊD´DÒ•-','D"O_D1•_DÊD´DÒ•-','D≠DÊD1•_DÊD´DÒ•-','D≠OT•_•_DÊD´DÒ•-','D`DÊD1•_DÊD´DÒ•-','D-OÒD¨D¯','D≠DÊD´DÒ•-'],
		dayNamesShort: ['DDß•_','D'•_D´','•_•_D´','•_•_•_','DÒ•_D´','DD¨D¯','•_D´DÒ'],
		dayNamesMin: ['D-Dß','D"•_','D≠•_','D≠•_','D`•_','D-D¨','D≠D´'],
		weekHeader: 'D_DÊ',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['kz']);
});
/* Lithuanian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* @author Arturas Paleicikas <arturas@avalon.lt> */
jQuery(function($){
	$.datepicker.regional['lt'] = {
		closeText: 'Uè_daryti',
		prevText: '&#x3c;Atgal',
		nextText: 'Pirmyn&#x3e;',
		currentText: 'èˇiandien',
		monthNames: ['Sausis','Vasaris','Kovas','Balandis','Geguè_é-','Birè_elis',
		'Liepa','RugpjèÆtis','Rugsé-jis','Spalis','Lapkritis','Gruodis'],
		monthNamesShort: ['Sau','Vas','Kov','Bal','Geg','Bir',
		'Lie','Rugp','Rugs','Spa','Lap','Gru'],
		dayNames: ['sekmadienis','pirmadienis','antradienis','treé_iadienis','ketvirtadienis','penktadienis','è≠eè≠tadienis'],
		dayNamesShort: ['sek','pir','ant','tre','ket','pen','è≠eè≠'],
		dayNamesMin: ['Se','Pr','An','Tr','Ke','Pe','èˇe'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['lt']);
});/* Latvian (UTF-8) initialisation for the jQuery UI date picker plugin. */
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
});ãØ®/* Malayalam (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Saji Nediyanchath (saji89@gmail.com). */
jQuery(function($){
	$.datepicker.regional['ml'] = {
		closeText: 'Ö'Ö'¯Ö'®',
		prevText: 'Ö'rÖÊ_Ö'"ÖÊ_Ö'"Ö'ÖÊ_Ö'ÖÊ+',  
		nextText: 'Ö'.Ö'YÖÊ_Ö'ÖÊ_Ö'Ö'ÖÊ_ ',
		currentText: 'Ö'ÿÖ'"ÖÊ_Ö'"ÖÊ_',
		monthNames: ['Ö'oÖ'"ÖÊ_Ö'ÊÖ'¯Ö'®','Ö'ÆÖÊ+Ö'™ÖÊ_Ö'¯ÖÊ_Ö'ÊÖ'¯Ö'®','Ö'rÖ'_Ö'¯ÖÊ_É__Ö'sÖÊ_Ö'sÖÊ_','Ö'_Ö'¶ÖÊ_Ö'¯Ö'®Ö'˝ÖÊ_É__','Ö'rÖÊÿÖ'_ÖÊ_','Ö'oÖÊ,Ö'úÖÊ_É__',
		'Ö'oÖÊ,Ö'˝ÖÊ^','Ö'+Ö'-Ö',ÖÊ_Ö'ÒÖÊ_Ö'ÒÖÊ_','Ö',ÖÊ+Ö'¶ÖÊ_Ö'ÒÖÊ_Ö'ÒÖ',Ö'™Ö'¯ÖÊ_É__','Ö''Ö'ÖÊ_Ö'YÖÊ<Ö'™Ö'¯ÖÊ_É__','Ö'"Ö'ÊÖ',Ö'™Ö'¯ÖÊ_É__','Ö'≠Ö'®Ö',Ö',Ö'™Ö'¯ÖÊ_É__'],
		monthNamesShort: ['Ö'oÖ'"ÖÊ_', 'Ö'ÆÖÊ+Ö'™ÖÊ_', 'Ö'rÖ'_Ö'¯ÖÊ_É__', 'Ö'_Ö'¶ÖÊ_Ö'¯Ö'®', 'Ö'rÖÊÿÖ'_ÖÊ_', 'Ö'oÖÊ,Ö'úÖÊ_É__',
		'Ö'oÖÊ,Ö'˝Ö'_', 'Ö'+Ö'-', 'Ö',ÖÊ+Ö'¶ÖÊ_', 'Ö''Ö'ÖÊ_Ö'YÖÊ<', 'Ö'"Ö'ÊÖ',', 'Ö'≠Ö'®Ö','],
		dayNames: ['Ö'zÖ'_Ö'_Ö'¯ÖÊ_É__', 'Ö'Ö'®Ö'TÖÊ_Ö'Ö'3ÖÊ_É__', 'Ö'sÖÊSÖ'ÊÖÊ_Ö'Ê', 'Ö'™ÖÊ_Ö'Ö'"ÖÊ_É__', 'Ö'ÊÖÊ_Ö'_Ö'_Ö''Ö',', 'Ö'ÊÖÊ+Ö'3ÖÊ_Ö'3Ö'®', 'Ö'Ö'"Ö'®'],
		dayNamesShort: ['Ö'zÖ'_Ö'_', 'Ö'Ö'®Ö'TÖÊ_Ö'', 'Ö'sÖÊSÖ'ÊÖÊ_Ö'Ê', 'Ö'™ÖÊ_Ö'', 'Ö'ÊÖÊ_Ö'_Ö'_Ö''Ö',', 'Ö'ÊÖÊ+Ö'3ÖÊ_Ö'3Ö'®', 'Ö'Ö'"Ö'®'],
		dayNamesMin: ['Ö'zÖ'_','Ö'Ö'®','Ö'sÖÊS','Ö'™ÖÊ_','Ö'ÊÖÊ_Ö'_Ö'_','Ö'ÊÖÊ+','Ö''],
		weekHeader: 'Ö'+',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ml']);
});
/* Malaysian initialisation for the jQuery UI date picker plugin. */
/* Written by Mohd Nawawi Mohamad Jamili (nawawi@ronggeng.net). */
jQuery(function($){
	$.datepicker.regional['ms'] = {
		closeText: 'Tutup',
		prevText: '&#x3c;Sebelum',
		nextText: 'Selepas&#x3e;',
		currentText: 'hari ini',
		monthNames: ['Januari','Februari','Mac','April','Mei','Jun',
		'Julai','Ogos','September','Oktober','November','Disember'],
		monthNamesShort: ['Jan','Feb','Mac','Apr','Mei','Jun',
		'Jul','Ogo','Sep','Okt','Nov','Dis'],
		dayNames: ['Ahad','Isnin','Selasa','Rabu','Khamis','Jumaat','Sabtu'],
		dayNamesShort: ['Aha','Isn','Sel','Rab','kha','Jum','Sab'],
		dayNamesMin: ['Ah','Is','Se','Ra','Kh','Ju','Sa'],
		weekHeader: 'Mg',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ms']);
});ãØ®/* Dutch (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Mathias Bynens <http://mathiasbynens.be/> */
jQuery(function($){
	$.datepicker.regional.nl = {
		closeText: 'Sluiten',
		prevText: 'É+_',
		nextText: 'É+'',
		currentText: 'Vandaag',
		monthNames: ['januari', 'februari', 'maart', 'april', 'mei', 'juni',
		'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
		monthNamesShort: ['jan', 'feb', 'maa', 'apr', 'mei', 'jun',
		'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
		dayNames: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
		dayNamesShort: ['zon', 'maa', 'din', 'woe', 'don', 'vri', 'zat'],
		dayNamesMin: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
		weekHeader: 'Wk',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional.nl);
});/* Norwegian initialisation for the jQuery UI date picker plugin. */
/* Written by Naimdjon Takhirov (naimdjon@gmail.com). */

jQuery(function($){
  $.datepicker.regional['no'] = {
    closeText: 'Lukk',
    prevText: '&laquo;Forrige',
    nextText: 'Neste&raquo;',
    currentText: 'I dag',
    monthNames: ['januar','februar','mars','april','mai','juni','juli','august','september','oktober','november','desember'],
    monthNamesShort: ['jan','feb','mar','apr','mai','jun','jul','aug','sep','okt','nov','des'],
    dayNamesShort: ['sA,n','man','tir','ons','tor','fre','lA,r'],
    dayNames: ['sA,ndag','mandag','tirsdag','onsdag','torsdag','fredag','lA,rdag'],
    dayNamesMin: ['sA,','ma','ti','on','to','fr','lA,'],
    weekHeader: 'Uke',
    dateFormat: 'dd.mm.yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
  };
  $.datepicker.setDefaults($.datepicker.regional['no']);
});
/* Polish initialisation for the jQuery UI date picker plugin. */
/* Written by Jacek Wysocki (jacek.wysocki@gmail.com). */
jQuery(function($){
	$.datepicker.regional['pl'] = {
		closeText: 'Zamknij',
		prevText: '&#x3c;Poprzedni',
		nextText: 'NastéTpny&#x3e;',
		currentText: 'Dziè>',
		monthNames: ['Styczeè,','Luty','Marzec','Kwiecieè,','Maj','Czerwiec',
		'Lipiec','Sierpieè,','Wrzesieè,','Paèßdziernik','Listopad','Grudzieè,'],
		monthNamesShort: ['Sty','Lu','Mar','Kw','Maj','Cze',
		'Lip','Sie','Wrz','Pa','Lis','Gru'],
		dayNames: ['Niedziela','Poniedziaè,ek','Wtorek','èsroda','Czwartek','Pié.tek','Sobota'],
		dayNamesShort: ['Nie','Pn','Wt','èsr','Czw','Pt','So'],
		dayNamesMin: ['N','Pn','Wt','èsr','Cz','Pt','So'],
		weekHeader: 'Tydz',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['pl']);
});
/* Brazilian initialisation for the jQuery UI date picker plugin. */
/* Written by Leonildo Costa Silva (leocsilva@gmail.com). */
jQuery(function($){
	$.datepicker.regional['pt-BR'] = {
		closeText: 'Fechar',
		prevText: '&#x3c;Anterior',
		nextText: 'Pr&oacute;ximo&#x3e;',
		currentText: 'Hoje',
		monthNames: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho',
		'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
		monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
		'Jul','Ago','Set','Out','Nov','Dez'],
		dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','S&aacute;bado'],
		dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','S&aacute;b'],
		dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','S&aacute;b'],
		weekHeader: 'Sm',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['pt-BR']);
});/* Portuguese initialisation for the jQuery UI date picker plugin. */
jQuery(function($){
	$.datepicker.regional['pt'] = {
		closeText: 'Fechar',
		prevText: '&#x3c;Anterior',
		nextText: 'Seguinte',
		currentText: 'Hoje',
		monthNames: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho',
		'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
		monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
		'Jul','Ago','Set','Out','Nov','Dez'],
		dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','S&aacute;bado'],
		dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','S&aacute;b'],
		dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','S&aacute;b'],
		weekHeader: 'Sem',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['pt']);
});/* Romansh initialisation for the jQuery UI date picker plugin. */
/* Written by Yvonne Gienal (yvonne.gienal@educa.ch). */
jQuery(function($){
	$.datepicker.regional['rm'] = {
		closeText: 'Serrar',
		prevText: '&#x3c;Suandant',
		nextText: 'Precedent&#x3e;',
		currentText: 'Actual',
		monthNames: ['Schaner','Favrer','Mars','Avrigl','Matg','Zercladur', 'Fanadur','Avust','Settember','October','November','December'],
		monthNamesShort: ['Scha','Fev','Mar','Avr','Matg','Zer', 'Fan','Avu','Sett','Oct','Nov','Dec'],
		dayNames: ['Dumengia','Glindesdi','Mardi','Mesemna','Gievgia','Venderdi','Sonda'],
		dayNamesShort: ['Dum','Gli','Mar','Mes','Gie','Ven','Som'],
		dayNamesMin: ['Du','Gl','Ma','Me','Gi','Ve','So'],
		weekHeader: 'emna',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['rm']);
});
ãØ®/* Romanian initialisation for the jQuery UI date picker plugin.
 *
 * Written by Edmond L. (ll_edmond@walla.com)
 * and Ionut G. Stan (ionut.g.stan@gmail.com)
 */
jQuery(function($){
	$.datepicker.regional['ro'] = {
		closeText: 'AZnchide',
		prevText: '&laquo; Luna precedentéü',
		nextText: 'Luna urméütoare &raquo;',
		currentText: 'Azi',
		monthNames: ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie',
		'Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie'],
		monthNamesShort: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun',
		'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		dayNames: ['Duminicéü', 'Luni', 'Marèúi', 'Miercuri', 'Joi', 'Vineri', 'SAõmbéütéü'],
		dayNamesShort: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'SAõm'],
		dayNamesMin: ['Du','Lu','Ma','Mi','Jo','Vi','SAõ'],
		weekHeader: 'Séüpt',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ro']);
});
/* Russian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Andrew Stromnov (stromnov@gmail.com). */
jQuery(function($){
	$.datepicker.regional['ru'] = {
		closeText: 'D-D¯Dß•_•<•,•O',
		prevText: '&#x3c;DY•_DÊD'',
		nextText: 'D≠DØDÊD'&#x3e;',
		currentText: 'D≠DÊD3D_D'D´•_',
		monthNames: ['D_D´D˝D¯•_•O','DDÊD˝•_D¯DØ•O','DoD¯•_•,','D_D®•_DÊDØ•O','DoD¯D1','D~•ZD´•O',
		'D~•ZDØ•O','D_D˝D3•ü•_•,','D≠DÊD´•,•_DÒ•_•O','DzDß•,•_DÒ•_•O','D_D_•_DÒ•_•O','D"DÊDßD¯DÒ•_•O'],
		monthNamesShort: ['D_D´D˝','DDÊD˝','DoD¯•_','D_D®•_','DoD¯D1','D~•ZD´',
		'D~•ZDØ','D_D˝D3','D≠DÊD´','DzDß•,','D_D_•_','D"DÊDß'],
		dayNames: ['D˝D_•_Dß•_DÊ•_DÊD´•ODÊ','D®D_D´DÊD'DÊDØ•OD´D,Dß','D˝•,D_•_D´D,Dß','•_•_DÊD'D¯','•ÿDÊ•,D˝DÊ•_D3','D®•_•,D´D,•+D¯','•_•üDÒDÒD_•,D¯'],
		dayNamesShort: ['D˝•_Dß','D®D´D'','D˝•,•_','•_•_D'','•ÿ•,D˝','D®•,D´','•_DÒ•,'],
		dayNamesMin: ['D'•_','DYD´','D'•,','D≠•_','D•,','DY•,','D≠DÒ'],
		weekHeader: 'D_DÊD'',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ru']);
});/* Slovak initialisation for the jQuery UI date picker plugin. */
/* Written by Vojtech Rinik (vojto@hmm.sk). */
jQuery(function($){
	$.datepicker.regional['sk'] = {
		closeText: 'Zavrieèù',
		prevText: '&#x3c;PredchA≠dzajAßci',
		nextText: 'NasledujAßci&#x3e;',
		currentText: 'Dnes',
		monthNames: ['JanuA≠r','FebruA≠r','Marec','AprA-l','MA≠j','JAßn',
		'JAßl','August','September','OktA3ber','November','December'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','MA≠j','JAßn',
		'JAßl','Aug','Sep','Okt','Nov','Dec'],
		dayNames: ['Nedel\'a','Pondelok','Utorok','Streda','èˇtvrtok','Piatok','Sobota'],
		dayNamesShort: ['Ned','Pon','Uto','Str','èˇtv','Pia','Sob'],
		dayNamesMin: ['Ne','Po','Ut','St','èˇt','Pia','So'],
		weekHeader: 'Ty',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['sk']);
});
/* Slovenian initialisation for the jQuery UI date picker plugin. */
/* Written by Jaka Jancar (jaka@kubje.org). */
/* c = &#x10D;, s = &#x161; z = &#x17E; C = &#x10C; S = &#x160; Z = &#x17D; */
jQuery(function($){
	$.datepicker.regional['sl'] = {
		closeText: 'Zapri',
		prevText: '&lt;Prej&#x161;nji',
		nextText: 'Naslednji&gt;',
		currentText: 'Trenutni',
		monthNames: ['Januar','Februar','Marec','April','Maj','Junij',
		'Julij','Avgust','September','Oktober','November','December'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
		'Jul','Avg','Sep','Okt','Nov','Dec'],
		dayNames: ['Nedelja','Ponedeljek','Torek','Sreda','&#x10C;etrtek','Petek','Sobota'],
		dayNamesShort: ['Ned','Pon','Tor','Sre','&#x10C;et','Pet','Sob'],
		dayNamesMin: ['Ne','Po','To','Sr','&#x10C;e','Pe','So'],
		weekHeader: 'Teden',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['sl']);
});
ãØ®/* Albanian initialisation for the jQuery UI date picker plugin. */
/* Written by Flakron Bytyqi (flakron@gmail.com). */
jQuery(function($){
	$.datepicker.regional['sq'] = {
		closeText: 'mbylle',
		prevText: '&#x3c;mbrapa',
		nextText: 'PAÆrpara&#x3e;',
		currentText: 'sot',
		monthNames: ['Janar','Shkurt','Mars','Prill','Maj','Qershor',
		'Korrik','Gusht','Shtator','Tetor','NAÆntor','Dhjetor'],
		monthNamesShort: ['Jan','Shk','Mar','Pri','Maj','Qer',
		'Kor','Gus','Sht','Tet','NAÆn','Dhj'],
		dayNames: ['E Diel','E HAÆnAÆ','E MartAÆ','E MAÆrkurAÆ','E Enjte','E Premte','E Shtune'],
		dayNamesShort: ['Di','HAÆ','Ma','MAÆ','En','Pr','Sh'],
		dayNamesMin: ['Di','HAÆ','Ma','MAÆ','En','Pr','Sh'],
		weekHeader: 'Ja',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['sq']);
});
ãØ®/* Serbian i18n for the jQuery UI date picker plugin. */
/* Written by Dejan Dimiéÿ. */
jQuery(function($){
	$.datepicker.regional['sr-SR'] = {
		closeText: 'Zatvori',
		prevText: '&#x3c;',
		nextText: '&#x3e;',
		currentText: 'Danas',
		monthNames: ['Januar','Februar','Mart','April','Maj','Jun',
		'Jul','Avgust','Septembar','Oktobar','Novembar','Decembar'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
		'Jul','Avg','Sep','Okt','Nov','Dec'],
		dayNames: ['Nedelja','Ponedeljak','Utorak','Sreda','éOetvrtak','Petak','Subota'],
		dayNamesShort: ['Ned','Pon','Uto','Sre','éOet','Pet','Sub'],
		dayNamesMin: ['Ne','Po','Ut','Sr','éOe','Pe','Su'],
		weekHeader: 'Sed',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['sr-SR']);
});
ãØ®/* Serbian i18n for the jQuery UI date picker plugin. */
/* Written by Dejan Dimiéÿ. */
jQuery(function($){
	$.datepicker.regional['sr'] = {
		closeText: 'D-D¯•,D˝D_•_D,',
		prevText: '&#x3c;',
		nextText: '&#x3e;',
		currentText: 'D"D¯D´D¯•_',
		monthNames: ['D^D¯D´•üD¯•_','DDÊDÒ•_•üD¯•_','DoD¯•_•,','D_D®•_D,DØ','DoD¯•~','D^•üD´',
		'D^•üDØ','D_D˝D3•ü•_•,','D≠DÊD®•,DÊD¨DÒD¯•_','DzDß•,D_DÒD¯•_','D_D_D˝DÊD¨DÒD¯•_','D"DÊ•+DÊD¨DÒD¯•_'],
		monthNamesShort: ['D^D¯D´','DDÊDÒ','DoD¯•_','D_D®•_','DoD¯•~','D^•üD´',
		'D^•üDØ','D_D˝D3','D≠DÊD®','DzDß•,','D_D_D˝','D"DÊ•+'],
		dayNames: ['D_DÊD'DÊ•TD¯','DYD_D´DÊD'DÊ•TD¯Dß','Dú•,D_•_D¯Dß','D≠•_DÊD'D¯','DDÊ•,D˝•_•,D¯Dß','DYDÊ•,D¯Dß','D≠•üDÒD_•,D¯'],
		dayNamesShort: ['D_DÊD'','DYD_D´','Dú•,D_','D≠•_DÊ','DDÊ•,','DYDÊ•,','D≠•üDÒ'],
		dayNamesMin: ['D_DÊ','DYD_','Dú•,','D≠•_','DDÊ','DYDÊ','D≠•ü'],
		weekHeader: 'D≠DÊD'',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['sr']);
});
ãØ®/* Swedish initialisation for the jQuery UI date picker plugin. */
/* Written by Anders Ekdahl ( anders@nomadiz.se). */
jQuery(function($){
    $.datepicker.regional['sv'] = {
		closeText: 'StAng',
        prevText: '&laquo;FArra',
		nextText: 'NAsta&raquo;',
		currentText: 'Idag',
        monthNames: ['Januari','Februari','Mars','April','Maj','Juni',
        'Juli','Augusti','September','Oktober','November','December'],
        monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
        'Jul','Aug','Sep','Okt','Nov','Dec'],
		dayNamesShort: ['SAn','MAùn','Tis','Ons','Tor','Fre','LAr'],
		dayNames: ['SAndag','MAùndag','Tisdag','Onsdag','Torsdag','Fredag','LArdag'],
		dayNamesMin: ['SA','MAù','Ti','On','To','Fr','LA'],
		weekHeader: 'Ve',
        dateFormat: 'yy-mm-dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
    $.datepicker.setDefaults($.datepicker.regional['sv']);
});
ãØ®/* Tamil (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by S A Sureshkumar (saskumar@live.com). */
jQuery(function($){
	$.datepicker.regional['ta'] = {
		closeText: 'ÖrrÖ_,ÖrYÖ__',
		prevText: 'ÖrrÖ__ÖrcÖ__ÖrcÖ_^Ör_ÖrÖ__',
		nextText: 'Ör.ÖrYÖ__ÖrÖ__ÖrÖrÖ__',
		currentText: 'ÖrÿÖrcÖ__ÖrÒÖ__',
		monthNames: ['ÖrÖ_^','ÖrrÖr_ÖrsÖr®','Ör¶ÖrTÖ__ÖrÖ__ÖrcÖr®','ÖrsÖr®ÖrÖ__ÖrÖr®Ör¯Ö_^','ÖrÊÖ_^ÖrÖr_ÖrsÖr®','Ör+ÖrcÖr®',
		'Ör+ÖrYÖr®','Ör+ÖrÊÖrúÖr®','Ör¶Ö__Ör¯ÖrYÖ__ÖrYÖr_ÖrsÖr®','Ör_Ör¶Ö__Ör¶ÖrsÖr®','ÖrÖr_Ör¯Ö__ÖrÖ__ÖrÖr®ÖrÖ_^','ÖrrÖr_Ör¯Ö__ÖrÖr'Ör®'],
		monthNamesShort: ['ÖrÖ_^','ÖrrÖr_ÖrsÖr®','Ör¶ÖrTÖ__','ÖrsÖr®ÖrÖ__','ÖrÊÖ_^ÖrÖr_','Ör+ÖrcÖr®',
		'Ör+ÖrYÖr®','Ör+ÖrÊ','Ör¶Ö__Ör¯','Ör_Ör¶Ö__','ÖrÖr_Ör¯Ö__','ÖrrÖr_Ör¯Ö__'],
		dayNames: ['ÖrzÖr_Ör_Ör®ÖrÒÖ__ÖrÒÖ__ÖrÖ__ÖrÖr®Ör'ÖrrÖ_^','ÖrÖr®ÖrTÖ__ÖrÖrYÖ__ÖrÖr®Ör'ÖrrÖ_^','ÖrsÖ_+ÖrÊÖ__ÖrÊÖr_Ör_Ö__ÖrÖ__ÖrÖr®Ör'ÖrrÖ_^','Ör¶Ö__ÖrÖrcÖ__ÖrÖr®Ör'ÖrrÖ_^','ÖrÊÖr®Ör_Ör_Ör'ÖrÖ__ÖrÖr®Ör'ÖrrÖ_^','ÖrÊÖ_+Ör3Ö__Ör3Ör®ÖrÖ__ÖrÖr®Ör'ÖrrÖ_^','ÖrsÖrcÖr®ÖrÖ__ÖrÖr®Ör'ÖrrÖ_^'],
		dayNamesShort: ['ÖrzÖr_Ör_Ör®ÖrÒÖ__','ÖrÖr®ÖrTÖ__ÖrÖr3Ö__','ÖrsÖ_+ÖrÊÖ__ÖrÊÖr_Ör_Ö__','Ör¶Ö__ÖrÖrcÖ__','ÖrÊÖr®Ör_Ör_Ör'ÖrcÖ__','ÖrÊÖ_+Ör3Ö__Ör3Ör®','ÖrsÖrcÖr®'],
		dayNamesMin: ['ÖrzÖr_','ÖrÖr®','ÖrsÖ_+','Ör¶Ö__','ÖrÊÖr®','ÖrÊÖ_+','Örs'],
		weekHeader: 'D_DÊ',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ta']);
});
ãØ®/* Thai initialisation for the jQuery UI date picker plugin. */
/* Written by pipo (pipo@sixhead.com). */
jQuery(function($){
	$.datepicker.regional['th'] = {
		closeText: 'Ö,>Ö,'Ö,"',
		prevText: '&laquo;&nbsp;Ö,õÖ1%Ö,-Ö,T',
		nextText: 'Ö,-Ö,ÒÖ,"Ö1,Ö,>&nbsp;&raquo;',
		currentText: 'Ö,Ö,ÒÖ,TÖ,TÖ,ÊÖ1%',
		monthNames: ['Ö,≠Ö,_Ö,úÖ,˝Ö,,Ö,≠','Ö,_Ö,,Ö,≠Ö,ˇÖ,˝Ö,zÖ,ÒÖ,TÖ,~Ö1O','Ö,≠Ö,ÊÖ,TÖ,˝Ö,,Ö,≠','Ö1_Ö,≠Ö,cÖ,˝Ö,õÖ,T','Ö,zÖ,Ö,cÖ,ˇÖ,˝Ö,,Ö,≠','Ö,≠Ö,'Ö,-Ö,,Ö,TÖ,˝Ö,õÖ,T',
		'Ö,_Ö,úÖ,_Ö,ZÖ,˝Ö,,Ö,≠','Ö,¶Ö,'Ö,ÿÖ,ÆÖ,˝Ö,,Ö,≠','Ö,_Ö,ÒÖ,TÖ,õÖ,˝Ö,õÖ,T','Ö,Ö,,Ö,ùÖ,˝Ö,,Ö,≠','Ö,zÖ,Ö,"Ö,^Ö,'Ö,_Ö,˝Ö,õÖ,T','Ö,~Ö,ÒÖ,TÖ,Ö,˝Ö,,Ö,≠'],
		monthNamesShort: ['Ö,≠.Ö,,.','Ö,_.Ö,z.','Ö,≠Ö,Ê.Ö,,.','Ö1_Ö,≠.Ö,õ.','Ö,z.Ö,,.','Ö,≠Ö,'.Ö,õ.',
		'Ö,_.Ö,,.','Ö,¶.Ö,,.','Ö,_.Ö,õ.','Ö,.Ö,,.','Ö,z.Ö,õ.','Ö,~.Ö,,.'],
		dayNames: ['Ö,-Ö,˝Ö,-Ö,'Ö,Ö,õÖ1O','Ö,^Ö,ÒÖ,TÖ,-Ö,úÖ1O','Ö,-Ö,ÒÖ,ÿÖ,,Ö,˝Ö,ú','Ö,zÖ,,Ö,~','Ö,zÖ,Ö,ÆÖ,ÒÖ,¶Ö,sÖ,"Ö,Ê','Ö,"Ö,,Ö,_Ö,úÖ1O','Ö1_Ö,¶Ö,˝Ö,úÖ1O'],
		dayNamesShort: ['Ö,-Ö,˝.','Ö,^.','Ö,-.','Ö,z.','Ö,zÖ,.','Ö,".','Ö,¶.'],
		dayNamesMin: ['Ö,-Ö,˝.','Ö,^.','Ö,-.','Ö,z.','Ö,zÖ,.','Ö,".','Ö,¶.'],
		weekHeader: 'Wk',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['th']);
});/* Turkish initialisation for the jQuery UI date picker plugin. */
/* Written by Izzet Emre Erkan (kara@karalamalar.net). */
jQuery(function($){
	$.datepicker.regional['tr'] = {
		closeText: 'kapat',
		prevText: '&#x3c;geri',
		nextText: 'ileri&#x3e',
		currentText: 'bugA¨n',
		monthNames: ['Ocak','èzubat','Mart','Nisan','MayéÒs','Haziran',
		'Temmuz','AéYustos','EylA¨l','Ekim','KaséÒm','AraléÒk'],
		monthNamesShort: ['Oca','èzub','Mar','Nis','May','Haz',
		'Tem','AéYu','Eyl','Eki','Kas','Ara'],
		dayNames: ['Pazar','Pazartesi','SaléÒ','AÿarèYamba','PerèYembe','Cuma','Cumartesi'],
		dayNamesShort: ['Pz','Pt','Sa','Aÿa','Pe','Cu','Ct'],
		dayNamesMin: ['Pz','Pt','Sa','Aÿa','Pe','Cu','Ct'],
		weekHeader: 'Hf',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['tr']);
});/* Ukrainian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Maxim Drogobitskiy (maxdao@gmail.com). */
jQuery(function($){
	$.datepicker.regional['uk'] = {
		closeText: 'D-D¯Dß•_D,•,D,',
		prevText: '&#x3c;',
		nextText: '&#x3e;',
		currentText: 'D≠•OD_D3D_D'D´•-',
		monthNames: ['D≠•-•ÿDÊD´•O','D>•Z•,D,D1','D`DÊ•_DÊD˙DÊD´•O','DsD˝•-•,DÊD´•O','Dõ•_D¯D˝DÊD´•O','DDÊ•_D˝DÊD´•O',
		'D>D,D®DÊD´•O','D≠DÊ•_D®DÊD´•O','D'DÊ•_DÊ•_DÊD´•O','D-D_D˝•,DÊD´•O','D>D,•_•,D_D®D¯D'','D"•_•üD'DÊD´•O'],
		monthNamesShort: ['D≠•-•ÿ','D>•Z•,','D`DÊ•_','DsD˝•-','Dõ•_D¯','DDÊ•_',
		'D>D,D®','D≠DÊ•_','D'DÊ•_','D-D_D˝','D>D,•_','D"•_•ü'],
		dayNames: ['D´DÊD'•-DØ•_','D®D_D´DÊD'•-DØD_Dß','D˝•-D˝•,D_•_D_Dß','•_DÊ•_DÊD'D¯','•ÿDÊ•,D˝DÊ•_','D®É_T•_•,D´D,•+•_','•_•üDÒD_•,D¯'],
		dayNamesShort: ['D´DÊD'','D®D´D'','D˝•-D˝','•_•_D'','•ÿ•,D˝','D®•,D´','•_DÒ•,'],
		dayNamesMin: ['D_D'','DYD´','D'•,','D≠•_','D•,','DY•,','D≠DÒ'],
		weekHeader: 'D_DÊ',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['uk']);
});ãØ®/* Vietnamese initialisation for the jQuery UI date picker plugin. */
/* Translated by Le Thanh Huy (lthanhhuy@cit.ctu.edu.vn). */
jQuery(function($){
	$.datepicker.regional['vi'] = {
		closeText: 'é_A3ng',
		prevText: '&#x3c;Trí¯†Ø>c',
		nextText: 'Ti†ß®p&#x3e;',
		currentText: 'HA'm nay',
		monthNames: ['ThA≠ng M†ØTt', 'ThA≠ng Hai', 'ThA≠ng Ba', 'ThA≠ng Tí¯', 'ThA≠ng Néüm', 'ThA≠ng SA≠u',
		'ThA≠ng B†ßúy', 'ThA≠ng TA≠m', 'ThA≠ng ChA-n', 'ThA≠ng Mí¯†Ø_i', 'ThA≠ng Mí¯†Ø_i M†ØTt', 'ThA≠ng Mí¯†Ø_i Hai'],
		monthNamesShort: ['ThA≠ng 1', 'ThA≠ng 2', 'ThA≠ng 3', 'ThA≠ng 4', 'ThA≠ng 5', 'ThA≠ng 6',
		'ThA≠ng 7', 'ThA≠ng 8', 'ThA≠ng 9', 'ThA≠ng 10', 'ThA≠ng 11', 'ThA≠ng 12'],
		dayNames: ['Ch†Ø Nh†ß-t', 'Th†Øc Hai', 'Th†Øc Ba', 'Th†Øc Tí¯', 'Th†Øc Néüm', 'Th†Øc SA≠u', 'Th†Øc B†ßúy'],
		dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
		dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
		weekHeader: 'Tu',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['vi']);
});
/* Chinese initialisation for the jQuery UI date picker plugin. */
/* Written by Cloudream (cloudream@gmail.com). */
jQuery(function($){
	$.datepicker.regional['zh-CN'] = {
		closeText: 'Ü.3Ç--',
		prevText: '&#x3c;Ñ,Sëo^',
		nextText: 'Ñ,<ëo^&#x3e;',
		currentText: 'ÑØSÜc',
		monthNames: ['Ñ,_ëo^','ÑßOëo^','Ñ,%ëo^','Ü>>ëo^','Ñß"ëo^','Ü.-ëo^',
		'Ñ,üëo^','Ü.Æëo^','Ñ1_ëo^','Ü__ëo^','Ü__Ñ,_ëo^','Ü__ÑßOëo^'],
		monthNamesShort: ['Ñ,_','ÑßO','Ñ,%','Ü>>','Ñß"','Ü.-',
		'Ñ,ü','Ü.Æ','Ñ1_','Ü__','Ü__Ñ,_','Ü__ÑßO'],
		dayNames: ['ë~YëoYë-ù','ë~YëoYÑ,_','ë~YëoYÑßO','ë~YëoYÑ,%','ë~YëoYÜ>>','ë~YëoYÑß"','ë~YëoYÜ.-'],
		dayNamesShort: ['Ü`"ë-ù','Ü`"Ñ,_','Ü`"ÑßO','Ü`"Ñ,%','Ü`"Ü>>','Ü`"Ñß"','Ü`"Ü.-'],
		dayNamesMin: ['ë-ù','Ñ,_','ÑßO','Ñ,%','Ü>>','Ñß"','Ü.-'],
		weekHeader: 'Ü`"',
		dateFormat: 'yy-mm-dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: 'Ü1''};
	$.datepicker.setDefaults($.datepicker.regional['zh-CN']);
});
/* Chinese initialisation for the jQuery UI date picker plugin. */
/* Written by SCCY (samuelcychan@gmail.com). */
jQuery(function($){
	$.datepicker.regional['zh-HK'] = {
		closeText: 'Ç-oÇ-%',
		prevText: '&#x3c;Ñ,Sëo^',
		nextText: 'Ñ,<ëo^&#x3e;',
		currentText: 'ÑØSÜc',
		monthNames: ['Ñ,_ëo^','ÑßOëo^','Ñ,%ëo^','Ü>>ëo^','Ñß"ëo^','Ü.-ëo^',
		'Ñ,üëo^','Ü.Æëo^','Ñ1_ëo^','Ü__ëo^','Ü__Ñ,_ëo^','Ü__ÑßOëo^'],
		monthNamesShort: ['Ñ,_','ÑßO','Ñ,%','Ü>>','Ñß"','Ü.-',
		'Ñ,ü','Ü.Æ','Ñ1_','Ü__','Ü__Ñ,_','Ü__ÑßO'],
		dayNames: ['ë~YëoYë-ù','ë~YëoYÑ,_','ë~YëoYÑßO','ë~YëoYÑ,%','ë~YëoYÜ>>','ë~YëoYÑß"','ë~YëoYÜ.-'],
		dayNamesShort: ['Ü`"ë-ù','Ü`"Ñ,_','Ü`"ÑßO','Ü`"Ñ,%','Ü`"Ü>>','Ü`"Ñß"','Ü`"Ü.-'],
		dayNamesMin: ['ë-ù','Ñ,_','ÑßO','Ñ,%','Ü>>','Ñß"','Ü.-'],
		weekHeader: 'Ü`"',
		dateFormat: 'dd-mm-yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: 'Ü1''};
	$.datepicker.setDefaults($.datepicker.regional['zh-HK']);
});
ãØ®/* Chinese initialisation for the jQuery UI date picker plugin. */
/* Written by Ressol (ressol@gmail.com). */
jQuery(function($){
	$.datepicker.regional['zh-TW'] = {
		closeText: 'Ç-oÇ-%',
		prevText: '&#x3c;Ñ,Sëo^',
		nextText: 'Ñ,<ëo^&#x3e;',
		currentText: 'ÑØSÜc',
		monthNames: ['Ñ,_ëo^','ÑßOëo^','Ñ,%ëo^','Ü>>ëo^','Ñß"ëo^','Ü.-ëo^',
		'Ñ,üëo^','Ü.Æëo^','Ñ1_ëo^','Ü__ëo^','Ü__Ñ,_ëo^','Ü__ÑßOëo^'],
		monthNamesShort: ['Ñ,_','ÑßO','Ñ,%','Ü>>','Ñß"','Ü.-',
		'Ñ,ü','Ü.Æ','Ñ1_','Ü__','Ü__Ñ,_','Ü__ÑßO'],
		dayNames: ['ë~YëoYë-ù','ë~YëoYÑ,_','ë~YëoYÑßO','ë~YëoYÑ,%','ë~YëoYÜ>>','ë~YëoYÑß"','ë~YëoYÜ.-'],
		dayNamesShort: ['Ü`"ë-ù','Ü`"Ñ,_','Ü`"ÑßO','Ü`"Ñ,%','Ü`"Ü>>','Ü`"Ñß"','Ü`"Ü.-'],
		dayNamesMin: ['ë-ù','Ñ,_','ÑßO','Ñ,%','Ü>>','Ñß"','Ü.-'],
		weekHeader: 'Ü`"',
		dateFormat: 'yy/mm/dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: 'Ü1''};
	$.datepicker.setDefaults($.datepicker.regional['zh-TW']);
});


