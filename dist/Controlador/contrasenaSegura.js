var Seguridad = function() {
    var ValidaFuerzaContrasena = function(psw) {
        if (psw === '') {
            return {
                puntos: 0,
                test: new Array(4)
            };
        }
        var array = [],
            sum = 0,
            sumV = 0;
        array[0] = /[A-Z]/.test(psw);
        array[1] = /[a-z]/.test(psw);
        array[2] = /\d/.test(psw);
        array[3] = /[@!_.-]/.test(psw);
        var i;
        for (i = 0; i <= array.length - 1; i++) {
            sum += (array[i] ? 1 : 0);
        }
        for (i = 0; i <= array.length - 2; i++) {
            sumV += (array[i] ? 1 : 0);
        }
        sum = (psw.length >= 8 && sumV == 3) ? sum : (sum > 2) ? 2 : sum;
        return {
            puntos: sum,
            test: array,
            tamano: psw.length
        };
    };

    this.ValidaFuerzaContrasena = ValidaFuerzaContrasena;

    this.CompareInputs = function(inputs1, inputs2) {
        var val1, val2;
        val1 = $('#' + inputs1).val();
        val2 = $('#' + inputs2).val();
        var compara = Seguridad.ComparePassWords(val1, val2);
        if (compara.iguales) {
            return true;
        } else {
            var $DentroDe = $('#' + inputs2).closest('form');
            if (val2.length > 0) {
                setTimeout(function() {
                    $('#' + inputs2).focus();
                }, 0);
                SalesUp.Construye.MuestraMsj({
                    tMsg: 4,
                    Destino: $DentroDe,
                    Msg: 'Las contraseñas no coinciden'
                });
            }
        }
        // if()
    };

    var ComparePassWords = function(pass1, pass2) {
        var iguales = false,
            validez = 0;
        if (pass1 === pass2) {
            iguales = true;
        }
        var valida = ValidaFuerzaContrasena(pass1);
        validez = valida.puntos;

        return {
            validez: validez,
            iguales: iguales
        };
    };

    this.ComparePassWords = ComparePassWords;
    
    this.muestraSugerenciaPsw = function(t){
        console.log('hoahod')
        var $t = $(t);
        var contenido = $t.attr('data-sugerencias');
        
        SalesUp.Construye.popOver({Elemento:t, PopOverLugar:'left',Contenido:contenido, Titulo:'Le sugerimos usar',Clases:'PopOverAcciones'});
    }/*muestraSugerenciaPsw*/

    var DetallePsw = function(e, Op) {
        Tipsy = '<div style=\'padding:0 4px;\'>';
        if (Op.tamano < 8 || Op.tamano === undefined) {
            Tipsy += '<span><i class=\'fa fa-times fa-lg Rojo\'></i> Mínimo 8 carácteres</span><br>';
        } else {
            Tipsy += '<span><i class=\'fa fa-check Verde\'></i> Mínimo 8 carácteres</span><br>';
        }
        if (Op.test[0]) {
            Tipsy += '<span><i class=\'fa fa-check Verde\'></i> Al menos una mayúscula</span><br>';
        } else {
            Tipsy += '<span><i class=\'fa fa-times fa-lg Rojo\'></i> Al menos una mayúscula</span><br>';
        }
        if (Op.test[1]) {
            Tipsy += '<span><i class=\'fa fa-check Verde\'></i> Al menos una minúscula</span><br>';
        } else {
            Tipsy += '<span><i class=\'fa fa-times fa-lg Rojo\'></i> Al menos una minúscula</span><br>';
        }
        if (Op.test[2]) {
            Tipsy += '<span><i class=\'fa fa-check Verde\'></i> Al menos un número</span><br>';
        } else {
            Tipsy += '<span><i class=\'fa fa-times fa-lg Rojo\'></i> Al menos un número</span><br>';
        }
        if (Op.test[3]) {
            Tipsy += '<span><i class=\'fa fa-check Verde\'></i> Deseable un signo @ ! . _ - </span>';
        } else {
            Tipsy += '<span><i class=\'fa fa-times fa-lg Rojo\'></i> Deseable un signo @ ! . _ - ';
        }
        Tipsy += '</div>';

        var tip = '<span class="infoPsw" data-sugerencias="'+Tipsy+'" onmouseenter="Seguridad.muestraSugerenciaPsw(this)"><i class="fa fa-lg fa-info-circle  Azul"></i></span>';
        // tip += '<div class="color Transition password"></div>';
        // tip += '</div>';

        var $Elemento = $(e.t);
        var $padre = $Elemento.closest('div');
        $padre.children('.infoPsw').remove();
        $padre.children('.passwordBar').remove();
        $padre.append(tip);

        if ($("#ProgresoContrasena").length) {
            $("#ProgresoContrasena").show();
            $passProgress =  $("#passProgress");
            $NivelPassword = $("#NivelPassword");
            $passProgress.removeClass('BgRojo BgAmarillo BgAzul BgVerde w100 w25 w50 w75');
            $NivelPassword.removeClass('Rojo Amarillo Azul Verde');
            switch (Op.puntos) {
                case 0:
                    $passProgress.removeClass('BgRojo BgAmarillo BgAzul BgVerde w100 w25 w50 w75');
                    $NivelPassword.addClass('Rojo');
                    $NivelPassword.html("Baja");
                    break;
                case 1:
                    $passProgress.addClass('BgRojo w25');
                    $NivelPassword.addClass('Rojo').html("Baja");
                    break;
                case 2:
                    $passProgress.addClass('BgAmarillo w50');
                    $NivelPassword.addClass('Amarillo').html("Regular");
                    break;
                case 3:
                    $passProgress.addClass('BgAzul w75');
                    $NivelPassword.addClass('Azul').html("Buena");
                    break;
                case 4:
                    $passProgress.addClass('BgVerde w100');
                    $NivelPassword.addClass('Verde').html("Excelente");
                    break;
                default:
                    $passProgress.removeClass('BgRojo BgAmarillo BgAzul BgVerde w100');
                    $NivelPassword.addClass('Rojo').html("Baja");
                    $passProgress.addClass('w100');
                    break;
            }
        } else {
            var $progress = $padre.find('.password');
            switch (Op.puntos) {
                case 0:
                    $progress.removeClass('BgRojo BgAmarillo BgAzul BgVerde');
                    break;
                case 1:
                    $progress.addClass('BgRojo w25');
                    break;
                case 2:
                    $progress.addClass('BgAmarillo w50');
                    break;
                case 3:
                    $progress.addClass('BgAzul w75');
                    break;
                case 4:
                    $progress.addClass('BgVerde w100');
                    break;
                default:
                    $progress.removeClass('BgRojo BgAmarillo BgAzul BgVerde');
                    break;
            }
        }

        $('.tipsy').remove();

        SalesUp.Sistema.IniciaPlugins();
    };

    this.evalPassword = function(e) {
        var $Elemento = $(e.t);
        var psw = $Elemento.val();
        var Op = ValidaFuerzaContrasena(psw);
        DetallePsw(e, Op);
        if (e.callback) e.callback(e, Op);
    };

    var ValidarTamanioContasenia = function(e) {

        var $DentroDe = e.closest('form');
        var tamaniopasswd = e.val();

        if (tamaniopasswd == '') {
            return;
        }
        if (tamaniopasswd.length >= 8) {
            tamanio = true;
        } else {
            tamanio = false;
            SalesUp.Construye.MuestraMsj({
                tMsg: 4,
                Destino: $DentroDe,
                Msg: 'La contraseña debe ser al menos 8 de carácteres'
            });
            setTimeout(function() {
                e.focus();
            }, 0);
        }
        return tamanio;
    };

    var ContieneMayusculas = function(e) {
        var $DentroDe = e.closest('form');
        var psw = e.val();
        var valida = /[A-Z]/.test(psw);
        var tam = e.val();
        tam = tam.length;
        if (tam == 0) {
            return true;
        } else if (!valida) {
            SalesUp.Construye.MuestraMsj({
                tMsg: 4,
                Destino: $DentroDe,
                Msg: 'La contraseña debe tener al menos una mayúscula.'
            });
            setTimeout(function() {
                e.focus();
            }, 0);
            return false;
        }
        return true;
    };

    var ContieneMinusculas = function(e) {
        var $DentroDe = e.closest('form');
        var psw = e.val();
        var valida = /[a-z]/.test(psw);
        var tam = e.val();
        tam = tam.length;
        if (tam == 0) {
            return true;
        } else if (!valida) {
            SalesUp.Construye.MuestraMsj({
                tMsg: 4,
                Destino: $DentroDe,
                Msg: 'La contraseña debe tener al menos una minúscula.'
            });
            setTimeout(function() {
                e.focus();
            }, 0);
            return false;
        }
        return true;
    };

    var ContieneNumeros = function(e) {
        var $DentroDe = e.closest('form');
        var psw = e.val();
        var valida = /\d/.test(psw);
        var tam = e.val();
        tam = tam.length;
        if (tam == 0) {
            return true;
        } else if (!valida) {
            SalesUp.Construye.MuestraMsj({
                tMsg: 4,
                Destino: $DentroDe,
                Msg: 'La contraseña debe tener al menos un número.'
            });
            setTimeout(function() {
                e.focus();
            }, 0);
            return false;
        }
        return true;
    };

    this.reValidarContrasena = function(e) {
        var $Elemento = $(e.t);
        $Elemento.closest('form').find('input[type="password"]:eq(1)').val("");
        if (ValidarTamanioContasenia($Elemento)) {
            if (ContieneMayusculas($Elemento)) {
                if (ContieneMinusculas($Elemento)) {
                    ContieneNumeros($Elemento);
                }
            }
        }
    };
};
if (window.Seguridad) {
    Seguridad = new Seguridad();    
}