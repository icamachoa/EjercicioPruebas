/**
 * @author paopao
 */
function mainmenu(){
    $(" #contenidos ul ").css({
        display: "none"
    }); // Opera Fix
    $(" #contenidos li ").hover(
	//mouseover
	function(){
        $(this).find('ul:first').css({
            visibility: "visible",
            display: "none"
        }).show(400);
    },
	//mouseout
	function(){
        $(this).find('ul:first').css({
            visibility: "hidden"
        });
    });
}

$(document).ready(function(){
    mainmenu();
    // agregando estilos de sub listas y esquinas redondas a los elementos 
    $('#contenidos').children(':first-child').children('a').css({'border-radius':'5px 0 0 5px'});
    $('#contenidos').children(':last-child').children('a').css({'border-radius':'0 5px 5px 0'});
    $('#contenidos li ul li ul').prev().addClass('sub');
});

