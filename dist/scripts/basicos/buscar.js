
            $(document).ready(function() {
                
                $(".buscar").click(function(e) {          
                    e.preventDefault();
                    $("fieldset#buscar_menu").toggle();
                    $(".buscar").toggleClass("menu-open");
                });
                
                $("fieldset#buscar_menu").mouseup(function() {
                    return false
                });
                $(document).mouseup(function(e) {
                    if($(e.target).parent("a.buscar").length==0) {
                        $(".buscar").removeClass("menu-open");
                        $("fieldset#buscar_menu").hide();
                    }
                });      
                
            });

                 $(function() {
                  $('#buscar_dato').tipsy({delayIn: 1000, delayOut: 2000, gravity: 'w'});   
               });



