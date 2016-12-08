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


