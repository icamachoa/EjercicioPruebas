var control = SalesUp.Sistema.queControl();
var trAgregar = '';
trAgregar += '<tr id="trAgregaOpciones">';
trAgregar += '<td>';
trAgregar += '  <select id="SelectIds"><option value="0">(..Seleccionar..)</option></select>'   ;
trAgregar += '  <select id="filtrosDisponibles" name="filtrosDisponibles" onchange="Agregar(value)"></select>';
trAgregar += '</td>';
trAgregar += '</tr>';
SalesUp.Variables.todosEjecutivos = false;          
SalesUp.Variables.todosGrupos = false;  
SalesUp.Variables.nivel = 0;

self.parent.SalesUp.Sistema.CambiarTamanioPopUp({Ancho:980,Alto:450});

$(function(){
    var Componentes = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonComponentes.dbsp',DataType:'json'}).jsonDatos;
    var componente = '';
        
        for(var i=0; i<Componentes.length; i++){
            var muestra = true;

            if(Componentes[i].MODULO == 0 || SalesUp.Sistema.EstaActivoModulo({Modulo:Componentes[i].MODULO})){
                componente += '<option value="'+Componentes[i].IDCOMPONENTE+'" data-cate="'+Componentes[i].CATEGORIASVISIBLES+'" data-formato="'+Componentes[i].FORMATO+'">'+Componentes[i].NOMBRE_COMPONENTE+'</option>';
            }
        }
    $('#Componente').html(componente);
    ActivaFiltro();
    var anio = SalesUp.Construye.opcionesAnios({n:3});
    $('#anio').html(anio);

    $('#Periodo, #anio, #mes').change(function() {
        Tipos($('#Tipo').val());
        CuentaTabla();
    });

    $('#durante, #durdiario').change(function(){
        var valor = parseInt($(this).val());
        if(is.number(valor)){
            if(valor > 128 || valor < 1){
                $(this).val(1);
                $(this).change();
                return false;
            }else{
                $('#mes').change()
            }
        }else{
            $(this).val(1);
            return false;
        }
    });

    $('#Tipo, #Periodo').change(function(){
        Limpiar();
        var v = $('#Tipo').val();
        if (v!=''){
         var AgregarRegistro = '';
         if(v==3){
            AgregarRegistro='<span id="AgregarOpcionMeta" class="Pointer Bold" onclick="MuestraAgregar('+v+')"><i class="fa fa-plus"></i> Agregar ejecutivos</span>';
         }
         if(v==2){
            AgregarRegistro='<span id="AgregarOpcionMeta" class="Pointer Bold" onclick="MuestraAgregar('+v+')"><i class="fa fa-plus"></i> Agregar grupos</span>';
         }
         if(v==4){
            AgregarRegistro='<span id="AgregarOpcionMeta" class="Pointer Bold" onclick="MuestraAgregar('+v+')"><i class="fa fa-plus"></i> Agregar distribuidores</span>';
         }
         $('#trAgregaOpciones').remove();
         $('#DataTabla').append(trAgregar);
         $('#trAgregaOpciones td').attr('colspan',_.size($('#Data tr td')));
         $('#trAgregaOpciones td').append(AgregarRegistro);
         $('#SelectIds, #filtrosDisponibles').hide();
        
         ConstruyeTabla();
        }
    });

    
    seleccionados = [];
    SalesUp.Variables.AgregarFiltroMeta();  
    SalesUp.Variables.mesActual();
    CrearSelectize();
    MoverCursor();
});/*ready*/

SalesUp.Variables.mesActual = function(){
    var mesActual = moment().format('MM');
    $('#mes').val(mesActual);
}

function queVoyAgregar(v){ //aqui


    if(v.indexOf('G')!=-1){
        var idGrupo = parseInt(SalesUp.Sistema.StrReplace('G','',v));
        UsrGrupo = _.where(quedan, {IDUSUARIOGRUPO:idGrupo});
        var grupal = true;
        var tGrupos = UsrGrupo.length - 1;
        for (var i = 0; i <= tGrupos; i++){
            if(i==tGrupos){grupal=false;}
            Agregar({idu:UsrGrupo[i].IDUSUARIO, Grupal:grupal});
        };
    }else{
        Agregar({idu:v});
    }
}/*queVoyAgregar*/

    function ActivaFiltro(){
    
        var af = $("#Componente option:selected").attr('data-cate');
        if((af=='null')){
            $('#BoxPasos').hide();
        }else{
            $('#BoxPasos').show();
        }
        var Paso = _.size($('.PasoBox'))+1;
        SalesUp.Variables.ActivaMostrarFiltros({Paso:Paso, Out:true});

        var arrInputs = $('#DataTabla .DatosMeta input');

        for(var i = 0;i<_.size(arrInputs);i++){
            quitaFormato({t:arrInputs[i]}); 
            activaFormato({t:arrInputs[i]});
        }
        
    }


    var TKE                  = SalesUp.Sistema.Almacenamiento({a:'SysTke'});
    var Ejecutivos           = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonEjecutivoMetas.dbsp',DataType:'json'}).jsonDatos;
    var Grupos               = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonGrupos.dbsp',DataType:'json'}).jsonDatos;
    var Distribuidores       = SalesUp.Sistema.CargaDatos({Link:'https://'+control+'.salesup.com.mx/canalizaciones/obtieneDistribuidores.dbsp?TKE='+TKE, DataType:'json'}).datos;
    Distribuidores.jsonDatos = Distribuidores;
    


    /*
    var strTodosE            = '[{"IDUSUARIOGRUPO":-1,"IDUSUARIO":-1,"NOMBRE":"Todos los administradores","GRUPO":"Todos"}, {"IDUSUARIOGRUPO":-2,"IDUSUARIO":-2,"NOMBRE":"Todos los gerentes","GRUPO":"Todos"}, {"IDUSUARIOGRUPO":-3,"IDUSUARIO":-3,"NOMBRE":"Todos los ejecutivos","GRUPO":"Todos"}]';
    strTodosE                = JSON.parse(strTodosE);
    Ejecutivos               = _.union(strTodosE, Ejecutivos);
     */

    var strTodos             = '[{"ID":-1,"GRUPO":"Todos"}]';
    strTodos                 = JSON.parse(strTodos);
    Grupos                   = _.union(Grupos, strTodos);


    function CambiaDuracion(){
        var dur = $('#durante').val();
        var per = $('#Periodo').val();
        var pers = $('#durdiario').val();
        if((dur==1)&&(per==2)){
            $('#duracion').html('<span>año</span>');
        }
        if((dur!=1)&&(per==2)){
            $('#duracion').html('<span>años</span>');
        }
        if((dur==1)&&(per==3)){
            $('#duracion').html('<span>semestre</span>');
        }
        if((dur!=1)&&(per==3)){
            $('#duracion').html('<span>semestres</span>');
        }       
        if((dur==1)&&(per==4)){
            $('#duracion').html('<span>trimestre</span>');
        }
        if((dur!=1)&&(per==4)){
            $('#duracion').html('<span>trimestres</span>');
        }
        if((dur==1)&&(per==5)){
            $('#duracion').html('<span>bimestre</span>');
        }
        if((dur!=1)&&(per==5)){
            $('#duracion').html('<span>bimestres</span>');
        }
        if((dur==1)&&(per==6)){
            $('#duracion').html('<span>mes</span>');
        }
        if((dur!=1)&&(per==6)){
            $('#duracion').html('<span>meses</span>');          
        }
        if((dur==1)&&(per==7)){
            $('#duracion').html('<span>quincena</span>');           
        }
        if((dur!=1)&&(per==7)){
            $('#duracion').html('<span>quincenas</span>');
        }
        if((dur==1)&&(per==8)){
            $('#duracion').html('<span>semana</span>');
        }
        if((dur!=1)&&(per==8)){
            $('#duracion').html('<span>semanas</span>');
        }
        if((dur==1)&&(per==9)){
            $('#duracion').html('<span>día</span>');
        }
        if((per==9)&&(pers>=2)){
            $('#duracion').html('<span>días</span>');
        }
        
    }
    var antes = 1;
    function CuentaTabla(){
        
            var nuevo = $('#durante').val(); 
            var tipo=$('#Periodo').val();
            var tipoMeta = $('#Tipo').val();
            if(tipo==1){
                nuevo = 0;
            }
            if((nuevo-antes)>0){
                if(tipoMeta==1){
                    
                }else{
                for(var i=0; i<(nuevo-antes); i++){
                var tdheads  = parseInt($('#Data').children('tr').children('td').length-3);
                var tdbodies = $('#DataTabla').children('tr').children('td').length;
                $('#DataTabla').children('tr').not('#trAgregaOpciones').children('td:last-child').before('<td class="tdMetas"><input type="text" class="w100 InputMetas InfoObligatorio"></td>');                   
                }
                
            } 
            antes = nuevo;          
            }else{
                var contador = -1*(nuevo-antes);        
                var tabla='#DataTabla tr';  
                for(var i=0; i<contador; i++){
                    var tipo=$('#Periodo').val();
                    if(tipo==1){
                        nuevo = 0;
                        var te = $('#DataTabla tr:first td').length;
                    }else{
                        var te = $('#DataTabla tr:first td').length-2;  
                    }
                    
                    $(tabla).each(function(){
                        $(this).find("td").eq(te).remove();
                    });
                    var tipoMeta = $('#Tipo').val();
                }
                if(tipoMeta==1){
                    ConstruyeTabla();
                }
                
            antes = nuevo;          
            }   

            var AgregarRegistro = '';
            if(tipoMeta==3){
                AgregarRegistro='<span id="AgregarOpcionMeta" class="Pointer Bold" onclick="MuestraAgregar('+tipoMeta+')"><i class="fa fa-plus"></i> Agregar ejecutivos</span>';
            }

            if(tipoMeta==2){
                AgregarRegistro='<span id="AgregarOpcionMeta" class="Pointer Bold" onclick="MuestraAgregar('+tipoMeta+')"><i class="fa fa-plus"></i> Agregar grupos</span>';
            }
            if(tipoMeta==4){
                AgregarRegistro='<span id="AgregarOpcionMeta" class="Pointer Bold" onclick="MuestraAgregar('+tipoMeta+')"><i class="fa fa-plus"></i> Agregar distribuidores</span>';
            }

        
        $('#filtrosDisponibles').hide();
        setTimeout(function(){
           $('#AgregarOpcionMeta').show();
           $('.selectize-control').hide();
        },300);
    
        SalesUp.Sistema.IniciaPlugins();
        AgregaFuncionesInputs();
        
        
        $(tabla).each(function(){
            SumaRow({t:$(this).find("td").eq(0)});
        });


    }/*/CuentaTabla*/



    function Durante() {
        $('#durante').val(1);
        // document.getElementById('durante').options.length = 0;
        // var n = 12;
        // var select = document.getElementById('durante');
        // for (var i=0; i<n; i++) {
        //     select.options[select.options.length] = new Option(i+1, i+1);
        // }
    }
    
    function Periodos(v){
        

        var tipo = $('#Tipo').val();
        if(v==1){
            $('#Rango').show();
            $('#durdiario, #Filtros').hide();
        }
        if(v==2){
            $('#Rango, #durdiario').hide();
            $('#Filtros, #durante, #LosFiltros, #Filtro').show();
            $('#duracion').html('<span>año</span>');
            Durante();
        }
        if(v==3){
            $('#Rango, #durdiario').hide();
            $('#Filtros, #durante,#LosFiltros, #Filtro').show();        
            $('#duracion').html('<span>semestre</span>');   
            Durante();
        }
        if(v==4){
            $('#Rango, #durdiario').hide();
            $('#Filtros, #durante,#LosFiltros, #Filtro').show();            
            $('#duracion').html('<span>trimestre</span>');
            Durante();
        }
        if(v==5){
            $('#Rango, #durdiario').hide();
            $('#Filtros, #durante,#LosFiltros, #Filtro').show();        
            $('#duracion').html('<span>bimestre</span>');
            Durante();
        }   
        if(v==6){
            $('#Rango, #durdiario').hide();
            $('#Filtros, #durante,#LosFiltros, #Filtro').show();        
            $('#duracion').html('<span>mes</span>');
            Durante();
        }   
        if(v==7){   
            $('#Rango, #durdiario').hide();
            $('#Filtros, #durante,#LosFiltros, #Filtro').show();
            $('#duracion').html('<span>quincena</span>');
            Durante();
        }
        if(v==8){
            $('#Rango, #durdiario').hide();
            $('#Filtros, #durante,#LosFiltros, #Filtro').show();
            $('#duracion').html('<span>semana</span>');
            Durante();
        }
        if(v==9){
            $('#Rango, #durante').hide();           
            $('#Filtros, #durdiario,#LosFiltros, #Filtro').show();
            $('#duracion').html('<span>día</span>');
        }
    }/*Periodos*/
    
    function Inicio(){
        return new Date($('#mes').val()+'/01/'+$('#anio').val()); 
    }
    
    function CalculaFinal(){
        var tipo=$('#Periodo').val();
        var duracion=$('#durante').val();
        var inicio= new Inicio();
        var fin=Inicio();   
        var d             = fin;
        arrTitulos = {};
        arrTitulos.jsonDatos = [];  
        if(parseInt(tipo)==9)
        duracion=$('#durdiario').val();
        duracion=parseInt(duracion);
        var day = 1;        
        switch(parseInt(tipo)){

            case 2:
                var numSem=1;
                var duracionAux=0;
                var numSem=1;

                                    
                while(duracionAux<duracion){
                var ConfigTitulos = {};
                var fins='';
                var sem='';
                    //sem= fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear()+' a ';
                    sem=SalesUp.Sistema.FormatoFecha((fin.getDate()<10 ? '0' : '') + fin.getDate() +'/'+((fin.getMonth()+1)<10 ? '0' : '') + (fin.getMonth()+1)+'/'+fin.getFullYear())+' a ';
                var ini = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
                fin.setMonth(parseInt(fin.getMonth()) +12);
                fin.setDate(parseInt(fin.getDate()) -1);
                fins = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
//                  sem= sem+fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
                    sem= sem+SalesUp.Sistema.FormatoFecha((fin.getDate()<10 ? '0' : '') + fin.getDate() +'/'+((fin.getMonth()+1)<10 ? '0' : '') + (fin.getMonth()+1)+'/'+fin.getFullYear());                    
                fin.setDate(parseInt(fin.getDate())+1);
                    var month = $('#mes').val();
                    var convertirFecha = (day<10 ? '0' : '') + day +'/'+month+ '/'+ fin.getFullYear();                  
                    var Fchaa = SalesUp.Sistema.FormatoFecha(convertirFecha);
                    var Fcha = Fchaa.replace('01/', '');
                        //AÑO
                    ConfigTitulos.heads     = Fcha;
                    numSem++;   
                    duracionAux++;
                    ConfigTitulos.fInicio   = ini;
                    ConfigTitulos.fFin      = fins;
                    ConfigTitulos.tip       = sem;
                    arrTitulos.jsonDatos.push(ConfigTitulos);
                }
            break;
            case 3:
                var numSem=1;
                var duracionAux=0;
                var numSem=1;
                while(duracionAux<duracion){
                var ConfigTitulos = {};
                var fins='';
                var sem='';
                    sem=SalesUp.Sistema.FormatoFecha((fin.getDate()<10 ? '0' : '') + fin.getDate() +'/'+((fin.getMonth()+1)<10 ? '0' : '') + (fin.getMonth()+1)+'/'+fin.getFullYear())+' a ';
                    var Fini = SalesUp.Sistema.FormatoFecha((fin.getDate()<10 ? '0' : '') + fin.getDate() +'/'+((fin.getMonth()+1)<10 ? '0' : '') + (fin.getMonth()+1)+'/'+fin.getFullYear());
                var ini = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();                   
                fin.setMonth(parseInt(fin.getMonth()) +6);
                fin.setDate(parseInt(fin.getDate()) -1);
                fins = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
                    sem= sem+SalesUp.Sistema.FormatoFecha((fin.getDate()<10 ? '0' : '') + fin.getDate() +'/'+((fin.getMonth()+1)<10 ? '0' : '') + (fin.getMonth()+1)+'/'+fin.getFullYear());                    
                fin.setDate(parseInt(fin.getDate()) +1);
                    var month = $('#mes').val();

                    var convertirFecha = (day<10 ? '0' : '') + day +'/'+month+ '/'+ fin.getFullYear();                  
                    var Fchaa = SalesUp.Sistema.FormatoFecha(convertirFecha);
                    var Fcha = Fini.replace('01/', '');
                    //SEMESTRE
                    ConfigTitulos.heads     = Fcha;
                    numSem++;                   
                    duracionAux++;
                    ConfigTitulos.fInicio   = ini;
                    ConfigTitulos.fFin      = fins;
                    ConfigTitulos.tip       = sem;
                    arrTitulos.jsonDatos.push(ConfigTitulos);
                }
            break;
            case 4:
                var numSem=1;
                var duracionAux=0;
                var numSem=1;
                while(duracionAux<duracion){
                var ConfigTitulos = {};
                var fins='';                
                var sem='';
                    sem=SalesUp.Sistema.FormatoFecha((fin.getDate()<10 ? '0' : '') + fin.getDate() +'/'+((fin.getMonth()+1)<10 ? '0' : '') + (fin.getMonth()+1)+'/'+fin.getFullYear())+' a ';
                var Fini = SalesUp.Sistema.FormatoFecha((fin.getDate()<10 ? '0' : '') + fin.getDate() +'/'+((fin.getMonth()+1)<10 ? '0' : '') + (fin.getMonth()+1)+'/'+fin.getFullYear());
                var ini = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();                   
                fin.setMonth(parseInt(fin.getMonth()) +3);
                fin.setDate(parseInt(fin.getDate()) -1);
                fins = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
                    sem= sem+SalesUp.Sistema.FormatoFecha((fin.getDate()<10 ? '0' : '') + fin.getDate() +'/'+((fin.getMonth()+1)<10 ? '0' : '') + (fin.getMonth()+1)+'/'+fin.getFullYear());                    
                fin.setDate(parseInt(fin.getDate()) +1);
                    var month = $('#mes').val();
                    var convertirFecha = (day<10 ? '0' : '') + day +'/'+month+ '/'+ fin.getFullYear();                  
                    var Fchaa = SalesUp.Sistema.FormatoFecha(convertirFecha);
                    var Fcha = Fini.replace('01/', '');     
                
                    //TRIMESTRE
                    ConfigTitulos.heads     = Fcha;
                    numSem++;                   
                    duracionAux++;
                    ConfigTitulos.fInicio   = ini;
                    ConfigTitulos.fFin      = fins;
                    ConfigTitulos.tip       = sem;                  
                    arrTitulos.jsonDatos.push(ConfigTitulos);
                    
                }
            break;      
            case 5:
                var numSem=1;
                var duracionAux=0;
                var numSem=1;
                while(duracionAux<duracion){
                var ConfigTitulos = {};
                var fins='';                                    
                var sem='';
                    sem=SalesUp.Sistema.FormatoFecha((fin.getDate()<10 ? '0' : '') + fin.getDate() +'/'+((fin.getMonth()+1)<10 ? '0' : '') + (fin.getMonth()+1)+'/'+fin.getFullYear())+' a ';
                    var Fini = SalesUp.Sistema.FormatoFecha((fin.getDate()<10 ? '0' : '') + fin.getDate() +'/'+((fin.getMonth()+1)<10 ? '0' : '') + (fin.getMonth()+1)+'/'+fin.getFullYear());
                var ini = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
                fin.setMonth(parseInt(fin.getMonth()) +2);
                fin.setDate(parseInt(fin.getDate()) -1);
                fins = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
                    sem= sem+SalesUp.Sistema.FormatoFecha((fin.getDate()<10 ? '0' : '') + fin.getDate() +'/'+((fin.getMonth()+1)<10 ? '0' : '') + (fin.getMonth()+1)+'/'+fin.getFullYear());                    
                fin.setDate(parseInt(fin.getDate()) +1);
                    var month = $('#mes').val();
                    var convertirFecha = (day<10 ? '0' : '') + day +'/'+month+ '/'+ fin.getFullYear();                  
                    var Fchaa = SalesUp.Sistema.FormatoFecha(convertirFecha);
                    var Fcha = Fini.replace('01/', '');
                    //BIMESTRE
                    ConfigTitulos.heads     = Fcha;
                    numSem++;   
                    duracionAux++;
                    ConfigTitulos.fInicio   = ini;
                    ConfigTitulos.fFin      = fins;
                    ConfigTitulos.tip       = sem;                  
                    arrTitulos.jsonDatos.push(ConfigTitulos);
                    
                }
            break;
            case 6:
                var numSem=1;
                var duracionAux=0;
                while(duracionAux<duracion){
                var ConfigTitulos = {};
                var fins='';                                    
                var sem='';
                    sem=SalesUp.Sistema.FormatoFecha((fin.getDate()<10 ? '0' : '') + fin.getDate() +'/'+((fin.getMonth()+1)<10 ? '0' : '') + (fin.getMonth()+1)+'/'+fin.getFullYear())+' a ';
                    var Fini = SalesUp.Sistema.FormatoFecha((fin.getDate()<10 ? '0' : '') + fin.getDate() +'/'+((fin.getMonth()+1)<10 ? '0' : '') + (fin.getMonth()+1)+'/'+fin.getFullYear());                  
                var ini = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();   
                fin.setMonth(parseInt(fin.getMonth()) +1);
                fin.setDate(parseInt(fin.getDate()) -1);
                fins = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
                    sem= sem+SalesUp.Sistema.FormatoFecha((fin.getDate()<10 ? '0' : '') + fin.getDate() +'/'+((fin.getMonth()+1)<10 ? '0' : '') + (fin.getMonth()+1)+'/'+fin.getFullYear());                    
                fin.setDate(parseInt(fin.getDate()) +1);
                    var month = $('#mes').val();
                    var convertirFecha = (day<10 ? '0' : '') + day +'/'+month+ '/'+ fin.getFullYear();                  
                    var Fchaa = SalesUp.Sistema.FormatoFecha(convertirFecha);
                    var Fcha = Fini.replace('01/', '');
                    //MENSUAL
                    ConfigTitulos.heads     = Fcha;
                    numSem++;   
                    duracionAux++;
                    ConfigTitulos.fInicio   = ini;
                    ConfigTitulos.fFin      = fins;
                    ConfigTitulos.tip       = sem;                  
                    arrTitulos.jsonDatos.push(ConfigTitulos);
                    
                }
            break;
            case 7:
                var numSem=1;
                var duracionAux=0;
                var esMitad=0;
                while(duracionAux<duracion){
                var ConfigTitulos = {};
                var fins='';                                    
                var sem='';

                if(esMitad == 0){
                    sem=SalesUp.Sistema.FormatoFecha((fin.getDate()<10 ? '0' : '') + (fin.getDate()) +'/'+((fin.getMonth()+1)<10 ? '0' : '') + (fin.getMonth()+1)+'/'+fin.getFullYear())+' a ';
        
                var Fini = SalesUp.Sistema.FormatoFecha((fin.getDate()<10 ? '0' : '') + fin.getDate() +'/'+((fin.getMonth()+1)<10 ? '0' : '') + (fin.getMonth()+1)+'/'+fin.getFullYear());
                var ini = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();   
                    fin.setDate(parseInt(fin.getDate()) + 14);
                    
                    fins = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
                    fin.setDate(parseInt(fin.getDate()) + 1);
                    sem= sem+SalesUp.Sistema.FormatoFecha((fin.getDate()<10 ? '0' : '') + (fin.getDate()-1) +'/'+((fin.getMonth()+1)<10 ? '0' : '') + (fin.getMonth()+1)+'/'+fin.getFullYear());                                    var Fcha = Fini.substring(Fini.length-8,Fini.length);
                    esMitad=1;
                }
                else{
                    sem=SalesUp.Sistema.FormatoFecha((fin.getDate()<10 ? '0' : '') + (fin.getDate()) +'/'+((fin.getMonth()+1)<10 ? '0' : '') + (fin.getMonth()+1)+'/'+fin.getFullYear())+' a ';
                    var ini = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
                    var Fini = SalesUp.Sistema.FormatoFecha((fin.getDate()<10 ? '0' : '') + fin.getDate() +'/'+((fin.getMonth()+1)<10 ? '0' : '') + (fin.getMonth()+1)+'/'+fin.getFullYear());                  
                    fin.setDate(parseInt(fin.getDate()) -15);
                    fin.setMonth(parseInt(fin.getMonth()) +1);
                    fin.setDate(parseInt(fin.getDate()) -1);
                    esMitad=0;
                    fins = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
                    sem= sem+SalesUp.Sistema.FormatoFecha((fin.getDate()<10 ? '0' : '') + (fin.getDate()) +'/'+((fin.getMonth()+1)<10 ? '0' : '') + (fin.getMonth()+1)+'/'+fin.getFullYear());                  
                    fin.setDate(parseInt(fin.getDate())+1);

                    }           

                    var month = $('#mes').val();
                    var convertirFecha = (day<10 ? '0' : '') + day +'/'+month+ '/'+ fin.getFullYear();                  
                    var Fchaa = SalesUp.Sistema.FormatoFecha(convertirFecha);

                    var Fcha = Fini.substring(Fini.length-8,Fini.length);

                    //QUINCENA
                    ConfigTitulos.heads     = Fcha;
                    duracionAux++;
                    numSem++;
                    ConfigTitulos.fInicio   = ini;
                    ConfigTitulos.fFin      = fins;
                    ConfigTitulos.tip       = sem;      


                    arrTitulos.jsonDatos.push(ConfigTitulos);
                                        
                }
            break;
            case 8:
                 var num_mes       = d.getMonth();
                 var durante       = parseInt($('#durante').val());
                 var semana_actual = 1;
                var aux=false;

                while(semana_actual <= durante){
                var ConfigTitulos          = {};
                var fecha, Fcha, ini, fins = '';
                 var num_mes       = d.getMonth();

                      if(num_mes!=0){
                      //Lunes previo 
                           var num_dia = d.getDay();  
                           
                           while(num_dia!=1 && semana_actual==1){
                              d.setDate(parseInt(d.getDate()) -1);
                              num_dia = d.getDay();
                           }
                      }
            
                    fecha                   = SalesUp.Sistema.FormatoFecha((d.getDate()<10 ? '0' : '') + d.getDate() +'/'+((d.getMonth()+1)<10 ? '0' : '') + (d.getMonth()+1)+'/'+d.getFullYear())+' a ';
                     
                    ini                     = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
                    var Fini                = SalesUp.Sistema.FormatoFecha((d.getDate()<10 ? '0' : '') + d.getDate() +'/'+((d.getMonth()+1)<10 ? '0' : '') + (d.getMonth()+1)+'/'+d.getFullYear());
                    
                    var dias_sumar          = 6;

                    if((semana_actual==1 || aux)  && num_mes==0){
                        var num_dia = d.getDay();
                        dias_sumar  = 7-num_dia;
                        aux=false;
                    }else if(num_mes == 11 && semana_actual!=1){
    
                        if((d.getDate()+7)>31){
                            dias_sumar = 31-d.getDate();
                        aux=true;
                  
                        }
                            else{
                                dias_sumar=6;
                            }
                    }

                    if(dias_sumar!=7)
                        d.setDate(parseInt(d.getDate()) +dias_sumar); 
                    


                    fecha                   += SalesUp.Sistema.FormatoFecha((d.getDate()<10 ? '0' : '') + d.getDate() +'/'+((d.getMonth()+1)<10 ? '0' : '') + (d.getMonth()+1)+'/'+d.getFullYear());

                    fins                    = (d.getDate())+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
                      d.setDate(parseInt(d.getDate()) +1);
                     
                    var convertirFecha      = (day<10 ? '0' : '') + day +'/'+month+ '/'+ d.getFullYear();                   
                    Fchaa                   = SalesUp.Sistema.FormatoFecha(convertirFecha);
                    var Fcha                = Fini.substring(Fini.length-8,Fini.length);
                    Fcha                    = Fini.substring(Fini.length-8,Fini.length);

                    ConfigTitulos.heads     = Fcha;
        
                    ConfigTitulos.fInicio   = ini;
                    ConfigTitulos.fFin      = fins;
                    ConfigTitulos.tip       = fecha;        

                    
                    arrTitulos.jsonDatos.push(ConfigTitulos);
                         semana_actual++;
                }
                fin = d;
                    break;
        
            case 9:
            var numSem=1;
                var duracionAux=0;
                var esMitad=0;
                while(duracionAux<duracion){
                var ConfigTitulos = {};
                var fins='';                                    
                var sem='';
    
                    sem= fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();
                    var Fini = SalesUp.Sistema.FormatoFecha((fin.getDate()<10 ? '0' : '') + fin.getDate() +'/'+((fin.getMonth()+1)<10 ? '0' : '') + (fin.getMonth()+1)+'/'+fin.getFullYear());                  
                    var ini = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();   
                    fin.setDate(parseInt(fin.getDate()) + 1);
                    fins = fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear();

                    var month = $('#mes').val();
                    var convertirFecha = (day<10 ? '0' : '') + day +'/'+month+ '/'+ fin.getFullYear();                  
                    var Fchaa = SalesUp.Sistema.FormatoFecha(convertirFecha);
                    var Fcha = Fini.replace('01/', '');

                    //
                    ConfigTitulos.heads     = 'Dia '+numSem;
                    duracionAux++;
                    numSem++;
                    ConfigTitulos.fInicio   = ini;
                    ConfigTitulos.fFin      = fins;
                    ConfigTitulos.tip       = sem;      


                    arrTitulos.jsonDatos.push(ConfigTitulos);
                                        
                }
            break;
        }

    var fechaFinal= fin.getDate()+'/'+(fin.getMonth()+1)+'/'+fin.getFullYear(); 
    return fechaFinal;
    
    }   

    function Tipos(v){
        var periodo = $('#Periodo').val();
        if((v != 0)&&(periodo != 0)){           
            AgregarMeta();
            var UsersTemplate = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateVendedores.dbsp'});
            
            var per  = ($('#Periodo').val() - 2);
            var mes  = $('#mes').val();
            var anio = $('#anio').val();
            var inicio = mes+'/01/'+anio;
            var fin = CalculaFinal();
            var CreaTab = arrTitulos;
            var CreaTabla = CreaTab;
                                
            if(v==3){
                var j = '{"TipoMeta":[{"IZQUIERDA":"Ejecutivo"},{"IZQUIERDA":"Grupo"}]}';
                j = JSON.parse(j);
                $('#LosFiltros, #ListaFiltros, #Filtro, #FiltrarPorEjecutivos').show();
                $('#FiltrarPorGrupos').hide();
            }
            
            if(v==2){
                var j = '{"TipoMeta":[{"IZQUIERDA":"Grupo"}]}';
                j = JSON.parse(j);
                $('#LosFiltros, #ListaFiltros, #FiltrarPorGrupos').show();
                $('#FiltrarPorEjecutivos').hide();
            }

            if((v==1)||(v==0)){
                var j = '{"TipoMeta":[{}]}';
                j = JSON.parse(j);
                $('#LosFiltros, #ListaFiltros').hide();         
            }

            if(v==4){
                var j = '{"TipoMeta":[{"IZQUIERDA":"Distribuidor"}]}';
                j = JSON.parse(j);
                $('#LosFiltros, #ListaFiltros, #FiltrarPorGrupos').show();
                $('#FiltrarPorEjecutivos').hide();
            }
            
            var datos = _.union(j,CreaTabla);
            var d = {}
            d.info = datos;
            var Usuarios = SalesUp.Construye.ReemplazaDatos({Datos:d, Template:UsersTemplate});
            $('#Data').html(Usuarios);

            var AgregarRegistro = '';
            if(v==3){
                AgregarRegistro='<span id="AgregarOpcionMeta" class="Pointer Bold" onclick="MuestraAgregar('+v+')"><i class="fa fa-plus"></i> Agregar ejecutivos</span>';
            }
            if(v==2){
                AgregarRegistro='<span id="AgregarOpcionMeta" class="Pointer Bold" onclick="MuestraAgregar('+v+')"><i class="fa fa-plus"></i> Agregar grupos</span>';
            }
            if(v==4){
                AgregarRegistro='<span id="AgregarOpcionMeta" class="Pointer Bold" onclick="MuestraAgregar('+v+')"><i class="fa fa-plus"></i> Agregar distribuidores</span>';
            }
            $('#trAgregaOpciones').remove();
            $('#DataTabla').append(trAgregar);
            $('#trAgregaOpciones td').attr('colspan',_.size($('#Data tr td')));
            $('#trAgregaOpciones td').append(AgregarRegistro);
            $('#SelectIds, #filtrosDisponibles').hide();

            AgregarMeta();
            CrearSelectize();
            setTimeout(function(){
                $('.selectize-control').hide();
            },10);

            ConstruyeTabla();
            $('#Tabla').show();
            color = SalesUp.Variables.AumentaRgb(color);
            $('#colorTotal').css("background",color);
            $('#Tabla').css('min-height','245px');

            SalesUp.Sistema.Tipsy();
        }else{
            $('#Tabla').hide();
        }

    }/*/Tipos*/

    function MuestraAgregar(t){
        $('#AgregarOpcionMeta').hide();
    
        if(t==3){
            $('.selectize-control').show();
            $('#SelectIds')[0].selectize.focus()
            $('#SelectIds')[0].selectize.open();
        }else if((t==2) ||(t==4)){
            AgregarMeta();
            $('#filtrosDisponibles').show();
        }

    }/*/MuestraAgregar*/

    function Limpiar(){
        $('#DataTabla').html('');
        quedan=Ejecutivos;
        restan=Grupos;
        seleccionados.length=0;
    }
    
    SalesUp.Variables.ActivaMostrarFiltro = function(){
      var Activo = $('#FiltrarPor').is(':visible');
      if (Activo){
        $('#FiltrarPor').slideUp();
        setTimeout(function(){ $('#TiposFiltros > *').hide(); }, 400);
      }else{
        setTimeout(function(){ $('#FiltrarPor').slideDown(); $('#filtrosDisponibles').focus(); }, 400);
      }
    }
    
    var quedan               = [];
    var todosE               = [];
    var todosG               = [];
    quedan                   = Ejecutivos;
    todosE                   = Ejecutivos;
    todosG                   = Grupos;
    var restan               = [];
    restan                   = Grupos;
    var quedanDistribuidores = [];
    quedanDistribuidores     = Distribuidores;
    function Agregar(Op){
        //var ideliminar = parseInt($('#filtrosDisponibles').val());
        var valueField = Op.idu;
        var todoGrupo = Op.Grupal;
        var FTipo = $('#Tipo').val();       


        if(FTipo == 4){
            var ideliminar = $('#filtrosDisponibles').val();
            var este = _.where(quedanDistribuidores, {IdDistribuidor:ideliminar});
            var z = _.reject(quedanDistribuidores, function(x){ 
              if(x.IdDistribuidor==ideliminar)
              return x
            }); 
            quedanDistribuidores = [];
            for(var i = 0;i<_.size(z);i++){
              quedanDistribuidores.push(z[i]);
            }
        }

        if(FTipo == 3){
            var ideliminar = parseInt(valueField);

            var este = _.where(quedan, {IDUSUARIO:ideliminar});
            var z = _.reject(quedan, function(x){ 
              if(x.IDUSUARIO==ideliminar)
              return x
            }); 

            quedan = [];
            for(var i = 0;i<_.size(z);i++){
              quedan.push(z[i]);
            }
        }

        if(FTipo == 2){
            var ideliminar = parseInt($('#filtrosDisponibles').val());

            if(ideliminar > 0){
                var este = _.where(restan, {Id:ideliminar});
            }
            else{

                var strTodos = '[{"Id":-1,"Grupo":"Todos"}]';
                strTodos    = JSON.parse(strTodos);
                este        =  strTodos;                
            }
            

            var z = _.reject(restan, function(x){ 
              if(x.Id==ideliminar)
              return x
            });
            restan = [];
            for(var i = 0;i<_.size(z);i++){
              restan.push(z[i]);
            }   
        }
        seleccionados.push(este[0]);

        AgregarMeta();
        ConstruyeTabla();
        //aqui

        if(FTipo == 3){
            if(!todoGrupo){
                setTimeout(function(){ $('#SelectIds')[0].selectize.destroy();
                    CrearSelectize();
                }, 250);    
            }
            
        }       
        ZebraReset();
    }
    
    function Eliminar(Op){
        // $('#SelectIds')[0].selectize.addOption({ IDUSUARIO: idagregar, NOMBRE: 'Jesus Novelo Vázquez' });
        $('.tipsy').remove();

        var FTipo = $('#Tipo').val();   
        var idagregar = parseInt(Op.ID);
        var nombre = Op.NOMBRE;
        
        if(FTipo == 4){     

            var idagregar = Op.ID.toString();
            var elimina = _.where(seleccionados, {IdDistribuidor: idagregar});
            var lista = _.reject(seleccionados, function(xx){ 
              if(xx.IdDistribuidor==idagregar)
              return xx
            });
        seleccionados = [];
        for(var i = 0;i<_.size(lista);i++){
          seleccionados.push(lista[i]);
        }
        quedanDistribuidores.push(elimina[0]);  
        $('#DataTabla tr[data-IdDistribuidor="'+idagregar+'"]').remove();
        }
        if(FTipo == 3){
            var elimina = _.where(seleccionados, {IDUSUARIO: idagregar});
            var lista = _.reject(seleccionados, function(xx){ 
              if(xx.IDUSUARIO==idagregar)
              return xx
            });
        seleccionados = [];
        for(var i = 0;i<_.size(lista);i++){
          seleccionados.push(lista[i]);
        }
        quedan.push(elimina[0]);                        
        /*
        $('#SelectIds')[0].selectize.addOption({IDUSUARIO:idagregar, NOMBRE:nombre});
        $('#SelectIds')[0].selectize.refreshItems();
        */
        $('#DataTabla tr[data-idusuario="'+idagregar+'"]').remove();
        }
        if(FTipo == 2){
            var elimina = _.where(seleccionados, {Id: idagregar});
            var lista = _.reject(seleccionados, function(xx){ 
              if(xx.Id==idagregar)
              return xx
            });
        seleccionados = [];
        for(var i = 0;i<_.size(lista);i++){
          seleccionados.push(lista[i]);
        }
        restan.push(elimina[0]);
        $('#DataTabla tr[data-idgrupo="'+idagregar+'"]').remove();                                  
        }   
        //EliminarSelectize();
        AgregarMeta();
        ZebraReset();       
    }
    
    function ConstruyeTabla(){
        color   = $('.InfoLabel').css('backgroundColor');
        color   = SalesUp.Variables.AumentaRgb(color);
        $('.TotalMetas').css("background",color);   
        var Tiempo = $("#Periodo option:selected").html();
        var FTipo = $('#Tipo').val();
        var CreaTablaDatos = '';
        seleccionados = _.reject(seleccionados,function(j){return _.size(j)==0;});

        if(FTipo == 3){

            SalesUp.Variables.todosEjecutivos = false;

            for(var ii=0; ii<seleccionados.length; ii++){
                if(!_.size($('tr[data-idusuario='+seleccionados[ii].IDUSUARIO+']'))){
                    CreaTablaDatos = '<tr class="DatosMeta" data-idusuario="'+(seleccionados[ii].IDUSUARIO ? seleccionados[ii].IDUSUARIO:'')+'" data-idgrupo="'+seleccionados[ii].IDUSUARIOGRUPO+'">';
                    CreaTablaDatos += '<td class="tdEjecutivo" style="width:180px">'+seleccionados[ii].NOMBRE+'<span class="quitar Tip4 Pointer" tip="Eliminar ejecutivo" onclick="Eliminar({ID: '+seleccionados[ii].IDUSUARIO+', NOMBRE:\''+seleccionados[ii].NOMBRE+'\', GRUPO:\''+seleccionados[ii].GRUPO+'\'})"><i class="fa fa-lg fa-trash-o"></i></span></td>';
                    CreaTablaDatos += '<td class="tdGrupo">'+seleccionados[ii].GRUPO+'</td>';                   
                    for(var e=0; e<$('#Data td').length-3; e++){
                        CreaTablaDatos += '<td class="tdMetas"><input type="text" class="w100 InputMetas InfoObligatorio"></td>';
                    }
                    CreaTablaDatos += '<td class="tdTotal"><input class="w100 TotalMetas InfoObligatorio" type="text" name="TotalMeta"></td>';
                    CreaTablaDatos += '</tr>';
                }
            }

            if(_.size(seleccionados)){
                if(seleccionados[0].IDUSUARIO < 0){
                    SalesUp.Variables.todosEjecutivos = true;
                    SalesUp.Variables.nivel = seleccionados[0].IDUSUARIO;
                    var todosEN = [];

                        for(var i=0 ; i<_.size(todosE); i++){   
                            if(seleccionados[0].IDUSUARIO==-4){
                                if(todosE[i].NIVEL==1 && todosE[i].VERSISTEMA ==0 ){
                                    todosEN.push(todosE[i]);
                                  }
                             }
                              else if(todosE[i].NIVEL==(seleccionados[0].IDUSUARIO*-1)){
                                todosEN.push(todosE[i]);
                              }  
                        }
            
                                    for(var ii=0; ii<todosEN.length; ii++){
                                        if(!_.size($('tr[data-idusuario='+todosEN[ii].IDUSUARIO+']'))){
                                            CreaTablaDatos += '<tr style="display:none" class="DatosMeta" data-idusuario="'+(todosEN[ii].IDUSUARIO ? todosEN[ii].IDUSUARIO:'')+'" data-idgrupo="'+todosEN[ii].IDUSUARIOGRUPO+'">';
                                            CreaTablaDatos += '<td class="tdEjecutivo" style="width:180px">'+todosEN[ii].NOMBRE+'<span class="quitar Tip4 Pointer" tip="Eliminar ejecutivo" onclick="Eliminar({ID: '+todosEN[ii].IDUSUARIO+', NOMBRE:\''+todosEN[ii].NOMBRE+'\', GRUPO:\''+todosEN[ii].GRUPO+'\'})"><i class="fa fa-lg fa-trash-o"></i></span></td>';
                                            CreaTablaDatos += '<td class="tdGrupo">'+todosEN[ii].GRUPO+'</td>';                 
                                            for(var e=0; e<$('#Data td').length-3; e++){
                                                CreaTablaDatos += '<td class="tdMetas"><input type="text" class="w100 InputMetas InfoObligatorio"></td>';
                                            }
                                            CreaTablaDatos += '<td class="tdTotal"><input class="w100 TotalMetas InfoObligatorio" type="text" name="TotalMeta"></td>';
                                            CreaTablaDatos += '</tr>';
                                        }
                                    }   
                var cadena = '';
                    
                    switch(seleccionados[0].IDUSUARIO) {
                        case -1:
                            cadena = 'todos los administradores.';
                            break;
                        case -2:
                            cadena = 'todos los gerentes.';
                            break;
                        case -3:
                            cadena = 'todos los ejecutivos.';
                            break;
                        case -4:
                            cadena = 'todos los auditores.' ;
                            break;              
                        default:
                            cadena='todos';
                    }

                SalesUp.Construye.MuestraMsj({tMsg:1, Destino:'body', Msg:'La meta se aplicara a '+cadena}); 

                }
            }
        }
    
        if(FTipo == 2){

            SalesUp.Variables.todosGrupos = false;
            for(var x=0; x<seleccionados.length; x++){          
                if(!_.size($('tr[data-idgrupo='+seleccionados[x].Id+']'))){
                    CreaTablaDatos = '<tr class="DatosMeta" data-idgrupo="'+seleccionados[x].Id+'">';       
                    CreaTablaDatos += '<td class="tdGrupo">'+seleccionados[x].Grupo+'<span class="quitar Tip4 Pointer" tip="Eliminar grupo" onclick="Eliminar({ID: '+seleccionados[x].Id+'})"><i class="fa fa-lg fa-trash-o"></i></span></td>';
                    for(var e=0; e<$('#Data td').length-2; e++){
                        CreaTablaDatos += '<td class="tdMetas"><input class="w100 InputMetas InfoObligatorio" type="text"></td>';
                    }
                    CreaTablaDatos += '<td class="tdTotal"><input class="w100 TotalMetas InfoObligatorio" type="text" name="TotalMeta"></td>';
                    CreaTablaDatos += '</tr>';
                }   
            }   

                        if(_.size(seleccionados)){
                            if(seleccionados[0].Id == -1){
                                SalesUp.Variables.todosGrupos = true;
                                SalesUp.Variables.nivel = seleccionados[0].Id;
                                                for(var x=0; x<todosG.length; x++){
                                                    if(!_.size($('tr[data-idgrupo='+todosG[x].Id+']')) && (todosG[x].Id)){
                                                    CreaTablaDatos += '<tr style ="display:none" class="DatosMeta" data-idgrupo="'+todosG[x].Id+'">';       
                                                    CreaTablaDatos += '<td class="tdGrupo">'+todosG[x].Grupo+'<span class="quitar Tip4 Pointer" tip="Eliminar grupo" onclick="Eliminar({ID: '+todosG[x].Id+'})"><i class="fa fa-lg fa-trash-o"></i></span></td>';
                                                    for(var e=0; e<$('#Data td').length-2; e++){
                                                        CreaTablaDatos += '<td class="tdMetas"><input class="w100 InputMetas InfoObligatorio" type="text"></td>';
                                                    }
                                                    CreaTablaDatos += '<td class="tdTotal"><input class="w100 TotalMetas InfoObligatorio" type="text" name="TotalMeta"></td>';
                                                    CreaTablaDatos += '</tr>';
                                                }
                                                }   

                            SalesUp.Construye.MuestraMsj({tMsg:1, Destino:'body', Msg:'La meta se aplicara a todos los grupos.'}); 

                            }
                        }
        }       

        if(FTipo == 4){
            for(var xl=0; xl<seleccionados.length; xl++){           
                if(!_.size($('tr[data-IdDistribuidor='+seleccionados[xl].IdDistribuidor+']'))){
                    CreaTablaDatos = '<tr class="DatosMeta" data-IdDistribuidor="'+seleccionados[xl].IdDistribuidor+'">';       
                    CreaTablaDatos += '<td class="tdGrupo">'+seleccionados[xl].Distribuidor+'<span class="quitar Tip4 Pointer" tip="Eliminar grupo" onclick="Eliminar({ID: '+seleccionados[xl].IdDistribuidor+'})"><i class="fa fa-lg fa-trash-o"></i></span></td>';
                    for(var e=0; e<$('#Data td').length-2; e++){
                        CreaTablaDatos += '<td class="tdMetas"><input class="w100 InputMetas InfoObligatorio" type="text"></td>';
                    }
                    CreaTablaDatos += '<td class="tdTotal"><input class="w100 TotalMetas InfoObligatorio" type="text" name="TotalMeta"></td>';
                    CreaTablaDatos += '</tr>';
                }   
            }   
        }       
        
        if(FTipo==1){
            var peri = $('#Periodo').val();
            if(peri!=0){
                $('#DataTabla').html('');           
                CreaTablaDatos = '<tr class="DatosMeta" data-idusuario="" data-idgrupo="">';
                var nFechas = _.size($('#Data tr td[data-fechafin]'));
    
                CreaTablaDatos += '<td class="tdGrupo">Empresarial</td>';
                
                for(var e=1; e<=nFechas; e++){
                    CreaTablaDatos += '<td class="tdMetas"><input class="w100 InputMetas InfoObligatorio" type="text"></td>';
                }
                CreaTablaDatos += '<td class="tdTotal"><input class="w100 TotalMetas InfoObligatorio" type="text" name="TotalMeta"></td>';
                CreaTablaDatos += '</tr>';
            }
                
        }   
        
        $('#DataTabla').prepend(CreaTablaDatos);
        
        $('#filtrosDisponibles').hide();
        setTimeout(function(){
           $('#AgregarOpcionMeta').show();
           $('.selectize-control').hide();
        },300);
  
        SalesUp.Sistema.IniciaPlugins();
        AgregaFuncionesInputs();
        
    }
/*/Construyetabla*/

    function AgregaFuncionesInputs(){
        $('.TotalMetas').attr('onchange','calculaMontos({t:this});').attr('onkeypress', 'return SalesUp.Valida.valDecimales({t:this, e:event})').attr('onkeyup','$(this).removeClass("DatoMal")');
        $('.InputMetas').attr('onchange','metaIndividual({t:this});').attr('onkeypress', 'return SalesUp.Valida.valDecimales({t:this, e:event})').attr('onkeyup','$(this).removeClass("DatoMal")');
        $('#DataTabla .DatosMeta input').attr('onfocus','quitaFormato({t:this});').attr('onblur','activaFormato({t:this})');
    }

    function AgregarMeta(){
        var FTipo = $('#Tipo').val();
        if(FTipo == 3){
            var vendedor = '<option value="0">(...Seleccionar...)</option>';
                for(var am=0; am<quedan.length; am++){
                    vendedor += '<option data-idgrupo="'+quedan[am].IDUSUARIOGRUPO+'"  data-grupo="'+quedan[am].GRUPO+'" value="'+quedan[am].IDUSUARIO+'">'+quedan[am].NOMBRE+'</option>';
                }
            $('#filtrosDisponibles').html(vendedor);            
        }
        var grupo = '<option value="0">(...Seleccionar...)</option>';
        if(FTipo == 2){
            grupo = '<option value="0">(...Seleccionar...)</option>';
                grupo += '<option value="-1">Todos los grupos</option>';
                for(var ig=0; ig<restan.length; ig++){
                    if($.isNumeric(restan[ig].Id))
                    grupo += '<option value="'+restan[ig].Id+'">'+restan[ig].Grupo+'</option>';
                }
            $('#filtrosDisponibles').html(grupo);           
        }
        if(FTipo == 4){
            var distr = '<option value="0">(...Seleccionar...)</option>';
            
                for(var xg=0; xg<quedanDistribuidores.length; xg++){
                    distr += '<option value="'+quedanDistribuidores[xg].IdDistribuidor+'">'+quedanDistribuidores[xg].Distribuidor+'</option>';
                }
            $('#filtrosDisponibles').html(distr);           
        }               

    }
    
/*
    function EliminarSelectize(){
        $('#SelectIds').each(function() {
            if (this.selectize) {
                this.selectize.destroy();
            }
        });
    }
*/
    
    SalesUp.Variables.GuardarDatos = function(){
        
        var validarTipo =$('#Tipo').val();
        var validarPeriodo = $('#Periodo').val();

        if(SalesUp.Variables.todosEjecutivos){
            var total  = $('tr[data-idusuario='+SalesUp.Variables.nivel+']').find('.TotalMetas').val();
            var subtotal  = $('tr[data-idusuario='+SalesUp.Variables.nivel+']').find('.InputMetas').val();
            $('.InputMetas').val(subtotal);
            $('.TotalMetas').val(total);
        }
        if(SalesUp.Variables.todosGrupos){
            var total  = $('tr[data-idgrupo='+SalesUp.Variables.nivel+']').find('.TotalMetas').val();
            var subtotal  = $('tr[data-idgrupo='+SalesUp.Variables.nivel+']').find('.InputMetas').val();
            $('.InputMetas').val(subtotal);
            $('.TotalMetas').val(total);
        }


        if(validarPeriodo == 0){
            SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Msg:'No se ha seleccionado un periodo para la meta'});
        }       
        if(validarTipo == 0){
            SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Msg:'No se ha seleccionado un tipo de meta'});
        }else{
            if(SalesUp.Valida.ValidaObligatorios()){
                    var FTipo = $('#Tipo').val();
                    var Configuracion = {};
                    var Criterios = [];
                    var Metas = [];
                    var Formato = parseInt($('#Componente option:selected').attr('data-formato'));
                    Configuracion.Titulo = $('#Titulo').val();
                    Configuracion.idComponente = $('#Componente').val();
                    Configuracion.tipoMeta = $('#Tipo').val();
                    Configuracion.tipoPeriodo = $('#Periodo').val();
                    Configuracion.formato = $('#Componente option:selected').attr('data-formato');
                    
                    var arrCriterios = $('.FiltroEtiqueta');
                    for(var i=0;i<_.size(arrCriterios);i++){
                      var arr = {};
                      var $Etiq = $(arrCriterios[i]);
                      arr.tipoCriterio = $Etiq.attr('data-id');
                      arr.criterio = $Etiq.attr('data-valor');
                      arr.operador = $Etiq.attr('data-operador');
                      Criterios.push(arr)
                    }
                    
                    var arrRowMeta = $('.DatosMeta');
                    
                    for(var i=0;i<_.size(arrRowMeta);i++){
                      var arr = {};
                      var $Row = $(arrRowMeta[i]);
                      if(FTipo==4){
                          arr.idGrupo = '';
                          arr.idUsuario = '';
                          arr.idEmpresaDist = $Row.attr('data-IdDistribuidor');
                      }
                      if(FTipo==3){
                          arr.idGrupo = '';
                          arr.idUsuario = $Row.attr('data-idusuario');
                          arr.idEmpresaDist = '';
                      }
                      if(FTipo==2){
                          arr.idUsuario = '';
                          arr.idGrupo = $Row.attr('data-idgrupo');
                          arr.idEmpresaDist = '';
                      }
                      if(FTipo==1){
                          arr.idUsuario = '';
                          arr.idGrupo   = '';
                          arr.idEmpresaDist = '';
                      }
            
                      arr.Periodo = [];
                      
                      if(Configuracion.tipoPeriodo!='1'){
                        var arrInputs = $Row.find('.InputMetas');
                        var arrFechas = $('#Data').find('.Tip1');
                      
                        for(var x = 0;x<_.size(arrInputs);x++){
                          var arrMetas = {};
                          var $input = $(arrInputs[x]);
                          var $fecha = $(arrFechas[x]);


                          if(Formato==3){
                            var monto = sinFormato($input.val());
                            monto = f(monto) / 100.00;
                            arrMetas.montoMeta = monto;
                          }else{
                            arrMetas.montoMeta = sinFormato($input.val());
                          }
                          
                          arrMetas.fechaInicio = $fecha.attr('data-fechainicio');
                          arrMetas.fechaFin = $fecha.attr('data-fechafin');
                          arr.Periodo.push(arrMetas);
                        }
                      }else{
                        var arrMetas = {};
                        
                        arrMetas.montoMeta = $Row.find('.TotalMetas').val();
                        arrMetas.fechaInicio = $('#InicioR').val();
                        arrMetas.fechaFin = $('#FinalizaR').val();
                        arr.Periodo.push(arrMetas);
                      }  

                      if(FTipo==3){
                        if( arr.idUsuario > 0  ){
                        Metas.push(arr);
                      }
                      }
                      else if(FTipo==2){
                        if( arr.idGrupo != -1){
                        Metas.push(arr);
                      }                     
                        
                      }else{
                            Metas.push(arr);
                      }


                    }

                    if(Metas == ''){
                        SalesUp.Construye.MuestraMsj({tMsg:4, Destino:'body', Msg:'No se han configurado metas para agregar.'}); 
                    }else{

                    var ConfiguracionMeta = SalesUp.Sistema.Encript({cadena:JSON.stringify(Configuracion)});
                    var Criterio =  Criterios ? SalesUp.Sistema.Encript({cadena:JSON.stringify(Criterios)}): '';
                    var Meta =  SalesUp.Sistema.Encript({cadena:JSON.stringify(Metas)});        
                

                                    
                    $('#InputConfiguracionMeta').val(ConfiguracionMeta);
                    $('#InputCriterio').val(Criterio);
                    $('#InputMeta').val(Meta);

                    $('#AgregarMeta').submit();     
                        
                    }
            
            }
        }   
            
    }   
    
SalesUp.Variables.AgregarFiltroMeta = function(){

    var Paso = _.size($('.PasoBox'))+1;

    SalesUp.Sistema.BorrarItemDeAlmacen('TemplateAgregarFiltroMeta');
    var TemplateAgregarFiltroMeta = SalesUp.Sistema.CargaDatos({Link:'/privado/Vista/TemplateAgregarFiltroMeta.dbsp', Almacen:'TemplateAgregarFiltroMeta'});
    var Dato={};
    Dato.Paso = Paso;
    Dato.PasoAnterior = Paso-1;
    $('#BoxPasos').append(SalesUp.Construye.ReemplazaDatos({Template:TemplateAgregarFiltroMeta, Datos:Dato}));
    
};

    var templateOpcion = '<option value="{{TIPO}}" data-id="{{IDTIPOFILTRO}}" data-cat="{{CATE}}">{{FILTRO}}</option>';
    var templateOpcionHijo = '<option value="{{Valor}}">{{FiltroTexto}}</option>';
    var templateUniverso = '<span id="{{id}}" class="FiltroEtiqueta Universo" data-Paso="{{Paso}}" data-Cat="{{Cat}}" data-Tipo="{{Tipo}}">{{TextoFiltro}} <span class="ConfingFiltro Transition" onclick="SalesUp.Variables.ActivaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});" ><i class="fa fa-ellipsis-v"></i></span></span>';
    var templateFiltros = '<span id="{{id}}" class="FiltroEtiqueta FiltroNormal" data-Operador="{{Operador}}" data-Paso="{{Paso}}" data-id="{{idTipoFiltro}}" data-Cat="{{Cat}}" data-Tipo="{{Tipo}}" data-valor="{{Valor}}">{{TextoFiltro}} {{ValorFiltro}}<span class="ConfingFiltro Transition" onclick="SalesUp.Variables.ActivaOpcionesEtiqueta({Elemento:this, Id:\'{{id}}\'});"><i class="fa fa-ellipsis-v"></i></span></span>';
    var templatePaso = '<span class="FiltroEtiqueta LabelPaso Transition">{{Pasos}}</span>';

    var jsonFiltros = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/jsonFiltrosMetas.dbsp', DataType:'json'}).jsonDatos;


    SalesUp.Variables.ActivaMostrarFiltros = function(Op){
        var Paso = Op.Paso, Out = Op.Out;
        var $FiltroTipo = $('#FiltroTipoPaso'+Paso);
        var $FiltrosPaso = $('#FiltrosPaso'+Paso);
        var FiltroTipo = 'FiltroTipoPaso'+Paso;
        //var Opciones;
    
        $FiltroTipo.html('');
        $('#OpcionesTipoFiltros'+Paso).html('').hide();

        //Opciones = jsonFiltros;
        var Opciones = {};
        
        Opciones.opciones1 = _.where(jsonFiltros, {CATE:1});
        
        Opciones.opciones2 = _.where(jsonFiltros, {CATE:2});
        
        var idComp = $("#Componente option:selected").attr('data-cate');

        var arrayTablas = idComp.split(',');

        var OpcionTotal = [];

        for (var i = 1; i <= arrayTablas.length; i++) {
            if(_.indexOf(arrayTablas, i.toString()) >= 0){
                OpcionTotal = _.union(Opciones['opciones'+i],OpcionTotal);

            }
        };
        OpcionTotal=_.sortBy(OpcionTotal, 'FILTRO');
        $FiltroTipo.append('<option value="">(... Seleccione una opción ...)</option>');
        SalesUp.Construye.ReemplazaTemplate({Destino:$FiltroTipo, Datos:OpcionTotal , Template:templateOpcion });

        SalesUp.Variables.VerOpcionesFiltros({Paso:Paso, Out:Out});
    
    }
    
    SalesUp.Variables.VerOpcionesFiltros = function(Op){
        var In=Op.In, Out=Op.Out, p=Op.Paso;
        var $Parte1 = $('#Paso'+p+'-P1');
        var $Parte2 = $('#Paso'+p+'-P2');
        if(In){
            $Parte1.css('left','0');
            $Parte2.css('left','100%');
            setTimeout(function(){$Parte2.hide();}, 500);
        }
    
        if(Out){
            $Parte1.css('left','-100%');
            $Parte2.show();
            setTimeout(function(){$Parte2.css('left','0');}, 10);
            
        }
    }
    
    SalesUp.Variables.MostrarFiltro = function(Op){

        var Filtro = Op.Filtro;
        var $Elemento = $(Op.Elemento);
        var Paso = Op.Paso;
        var $Opcion = $Elemento.find('option:selected');
        var $FiltrosPaso = $('#FiltrosPaso'+Paso);
        var $OpcionesFiltros = $('#OpcionesTipoFiltros'+Paso);
        var Categoria = $Opcion.attr('data-cat');
        var TextoFiltro = $Opcion.text();
            
        if(Categoria==0){
            var Etiqueta = SalesUp.Sistema.StrReplace('{{TextoFiltro}}', TextoFiltro, templateUniverso);
                Etiqueta = SalesUp.Sistema.StrReplace('{{Paso}}', Paso, Etiqueta);
                Etiqueta = SalesUp.Sistema.StrReplace('{{Cat}}', Categoria, Etiqueta);
                Etiqueta = SalesUp.Sistema.StrReplace('{{Tipo}}', Filtro, Etiqueta);
                Etiqueta = SalesUp.Sistema.StrReplace('{{id}}', SalesUp.Construye.IdUnico(), Etiqueta);
    
            var $Existe = $FiltrosPaso.find('.FiltroEtiqueta[data-cat="'+Categoria+'"]');
            var Existe = _.size($Existe);
    
            if(Existe==0){
                $FiltrosPaso.append(Etiqueta);
                SalesUp.Variables.VerOpcionesFiltros({Paso:Paso, In:true});
            }else{
                SalesUp.Construye.MuestraMsj({tMsg:1, Msg:'Solo se puede seleccionar un <b>Universo</b> en este paso'});
            }
            return true;
        }
    
        if((Categoria=='1')&&(Filtro=='7')){

            var $Pais = $FiltrosPaso.find('.FiltroEtiqueta[data-tipo="6"][data-cat="1"]');
            var nPais = _.size($Pais);
            if(nPais==0){
                SalesUp.Construye.MuestraMsj({tMsg:1, Msg:'Necesita tener seleccionado un <b>[País]</b> en este paso'});
                return false;
            }else{
                var Paises = '';
                for (var i = 0; i <= $Pais.length - 1; i++){
                    Paises += $($Pais[i]).attr('data-valor')+'|';
                }
                SalesUp.Sistema.BorrarItemDeAlmacen('jsonFiltro-1-7');
                Op.Paises = Paises;
            }
        }
        
        Op.TextoFiltro = TextoFiltro;
        Op.Categoria = Categoria;
    
        $OpcionesFiltros.slideUp().html('');
        
    
        if(Filtro!=''){
            $('#Load'+Paso).show();
            setTimeout(function(){
                (Filtro>0) ? SalesUp.Variables.CargaFiltrosSistema(Op) : SalesUp.Variables.CargaFiltrosPersonalizados(Op);
            }, 10);
        }

    }/*SalesUp.Variables.MostrarFiltro*/

SalesUp.Variables.CargaFiltrosSistema = function(Op) {

    var Filtro           = Op.Filtro;
    var Paso             = Op.Paso;
    var Categoria        = Op.Categoria;
    var TextoFiltro      = Op.TextoFiltro;
    var $OpcionesFiltros = $('#OpcionesTipoFiltros' + Paso);
    var OpcionesFiltros  = 'OpcionesTipoFiltros' + Paso;
    var $BoxComodin      = $('#BoxComodin');
    var jsonFiltroTipo   = 'jsonFiltro-' + Categoria + '-' + Filtro;
    var Extra            = '';
    (Op.Paises) ? Extra += '&Paises=' + Op.Paises : '';

    var jsonOpcionesFiltro = SalesUp.Sistema.CargaDatos({
        Link: '/privado/Modelo/jsonFiltros.dbsp',
        Parametros: 'c=' + Categoria + '&f=' + Filtro + Extra,
        DataType: 'json'
    }).jsonDatos;

    if ((Categoria == '1') && (Filtro == '7')) {
        jsonOpcionesFiltro = _.reject(jsonOpcionesFiltro, function(j) {
            return _.size(j) == 0;
        });
        if (_.size(jsonOpcionesFiltro) == 0) {
            jsonOpcionesFiltro = JSON.parse('[{ "Valor":"", "FiltroTexto":" -- Desconocido -- "}]');
        }
    }

    SalesUp.Construye.ConstruyemeUn({
        Control          : 'select',
        Nuevo            : false,
        SeleccioneOpcion : true,
        IdControl        : OpcionesFiltros,
        Template         : templateOpcionHijo,
        Datos            : jsonOpcionesFiltro
    });

    $OpcionesFiltros.attr('data-cat', Categoria);
    $OpcionesFiltros.attr('data-TextoFiltro', TextoFiltro);
    $OpcionesFiltros.attr('data-Tipo', Filtro);


    $('#Load' + Paso).hide();
    $OpcionesFiltros.slideDown();

} /*SalesUp.Variables.CargaFiltrosSistema*/
SalesUp.Variables.CargaFiltrosPersonalizados = function(Op){
    return true;
}/*SalesUp.Variables.CargaFiltrosPersonalizados*/


SalesUp.Variables.SeleccionarFiltro = function(Op){
    var Paso             = Op.Paso;
    var Filtro           = Op.Filtro;
    var $Elemento        = $(Op.Elemento);
    var $OpcionesFiltros = $('#OpcionesTipoFiltros'+Paso);
    var $FiltrosPaso     = $('#FiltrosPaso'+Paso);
    var $Opcion          = $Elemento.find('option:selected');
    var Categoria        = $OpcionesFiltros.attr('data-cat');
    var TextoFiltro      = $OpcionesFiltros.attr('data-textofiltro');
    var Tipo             = $OpcionesFiltros.attr('data-tipo');
    var TextoFiltroHijo  = $Opcion.text();
    var Operador         = 1;
    var idTipoFiltro     = $('#FiltroTipoPaso1 option:selected').attr('data-id');

    var $MismoTipo       = $FiltrosPaso.find('.FiltroEtiqueta[data-cat="'+Categoria+'"][data-tipo="'+Tipo+'"]');
    var mt               = _.size($MismoTipo);
    if(mt>=1){Operador = $($MismoTipo[0]).attr('data-operador');}

    var $Existe = $FiltrosPaso.find('.FiltroEtiqueta[data-valor="'+Filtro+'"][data-cat="'+Categoria+'"][data-tipo="'+Tipo+'"]');
    var Existe = _.size($Existe);

    var Etiqueta = SalesUp.Sistema.StrReplace('{{ValorFiltro}}', TextoFiltroHijo, templateFiltros);
        Etiqueta = SalesUp.Sistema.StrReplace('{{Valor}}', Filtro, Etiqueta);
        Etiqueta = SalesUp.Sistema.StrReplace('{{Paso}}', Paso, Etiqueta);
        Etiqueta = SalesUp.Sistema.StrReplace('{{Cat}}', Categoria, Etiqueta);
        Etiqueta = SalesUp.Sistema.StrReplace('{{Tipo}}', Tipo, Etiqueta);
        Etiqueta = SalesUp.Sistema.StrReplace('{{id}}', SalesUp.Construye.IdUnico(), Etiqueta);
        Etiqueta = SalesUp.Sistema.StrReplace('{{Operador}}', Operador, Etiqueta);
        Etiqueta = SalesUp.Sistema.StrReplace('{{idTipoFiltro}}', idTipoFiltro, Etiqueta);
        
        if((Categoria=='1')&&(Tipo=='1')){
            Etiqueta = SalesUp.Sistema.StrReplace('{{TextoFiltro}}', '', Etiqueta);
        }else{
            Etiqueta = SalesUp.Sistema.StrReplace('{{TextoFiltro}}', TextoFiltro+':', Etiqueta);
        }

    if(mt>0){
        if(mt>1){ $MismoTipo = $($MismoTipo[mt-1]);}
        (Existe==0) ? $MismoTipo.after(Etiqueta) : '';
    }else{
        (Existe==0) ? $FiltrosPaso.append(Etiqueta) : '';
    }
    
    if(Existe>0){
        var Texto = TextoFiltroHijo;
        if(!((Categoria=='1')&&(Tipo=='1'))){ Texto = TextoFiltro + ':' + Texto; }
        
        SalesUp.Construye.MuestraMsj({tMsg:1, Msg:'El filtro <b>['+Texto+']</b> ya se encuentra agregado en este paso'});
        return false;
    }

    $OpcionesFiltros.slideUp().html('');
    SalesUp.Variables.VerOpcionesFiltros({Paso:Paso, In:true});
}

SalesUp.Variables.ActivaOpcionesEtiqueta = function(Op){
    var $Elemento = $(Op.Elemento);
    var Id = Op.Id;
    $Elemento.popover('destroy');

    var $Etiqueta = $Elemento.closest('.FiltroEtiqueta');
    var $Padre = $Etiqueta.closest('.PasoBox');
    
    var t = $Etiqueta.attr('data-tipo');
    var c = $Etiqueta.attr('data-cat');
    var o = $Etiqueta.attr('data-operador');
    var Hermanos = _.size($Padre.find('.FiltroEtiqueta[data-tipo="'+t+'"][data-cat="'+c+'"]'));

    var PopOverId = 'PopOver'+SalesUp.Construye.IdUnico();
    var TemplatePopover = '<div class="popover PopOverAcciones" id="'+PopOverId+'" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>';

    var Operador_Y = '';
    var Operador_O = '';
    if(o=='1'){Operador_Y = '<i class="fa fa-check Verde"></i>';}else{Operador_O = '<i class="fa fa-check Verde"></i>';}

    var MenuOpciones = '';
    (Hermanos>1) ? MenuOpciones += '<span onclick="SalesUp.Variables.OpcionesAcciones({Accion:2, Id:\''+Id+'\', Operador:2 });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-calculator"></i> Operador lógico "O" '+Operador_O+'</span>':'';
    (Hermanos>1) ? MenuOpciones += '<span onclick="SalesUp.Variables.OpcionesAcciones({Accion:2, Id:\''+Id+'\', Operador:1 });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-calculator"></i> Condicion lógico "Y" '+Operador_Y+'</span>':'';
    MenuOpciones += '<span onclick="SalesUp.Variables.OpcionesAcciones({Accion:1, Id:\''+Id+'\' });" class="OpcionAcciones Pointer"><i class="fa fa-lg fa-trash"></i> Eliminar filtro</span>';

    $Elemento.popover({
        html:true, container:'body', placement:'right',
        template:TemplatePopover,
        content:MenuOpciones
    });

    $Elemento.popover('show');

    var $PopOverId = $('#'+PopOverId);
    var Cerrar = true;
    $PopOverId.mouseleave(function(){
        Cerrar = true;
        setTimeout(function(){(Cerrar) ? $PopOverId.hide():'';}, 1000);
    }).mouseenter(function(){
        Cerrar = false;
    }).click(function(){
        $PopOverId.hide();
    });

    setTimeout(function(){(Cerrar) ? $PopOverId.hide():'';}, 4000);

    $Elemento.mouseleave(function(){
        Cerrar = true;
        setTimeout(function(){(Cerrar) ? $PopOverId.hide():'';}, 3000);
    }).mouseenter(function(){
        Cerrar = false;
    });
}/*SalesUp.Variables.ActivaOpcionesEtiqueta*/

SalesUp.Variables.OpcionesAcciones = function(Op){
    var Id = Op.Id;
    var $Etiqueta = $('#'+Id);
    var Accion = Op.Accion;
    var Operador = Op.Operador;
    if(Accion==1){
        $Etiqueta.slideUp();
        setTimeout(function(){$Etiqueta.remove();}, 1200);  
    }

    if(Accion==2){
        var $Padre = $Etiqueta.closest('.PasoBox');
        var t = $Etiqueta.attr('data-tipo');
        var c = $Etiqueta.attr('data-cat');
        $Padre.find('.FiltroEtiqueta[data-tipo="'+t+'"][data-cat="'+c+'"]').attr('data-operador',Operador);
    }
}


/*-- Excel---*/

var f = function(n){return parseFloat(n);}
  
var dos = function(num){
  if(parseInt($('#Componente option:selected').attr('data-formato'))==1){
    
    return f(SalesUp.Sistema.NumeroDosDecimales(num));
  }else{
    return parseInt(num);
  }
}


function metaIndividual(Op){
  $('#DataTabla tr').not('.DatosMeta').remove();
  var limite = 1;
  if ($('#Tipo').val()=='3'){limite = 2;};
  var Formato = parseInt($('#Componente option:selected').attr('data-formato'));
  
  var $t     = $(Op.t);
  var v      = f(sinFormato($t.val()));
  
  if((Formato==3)&&(v>100)){v=100;}
  if((Formato==3)&&(v<1)){v=1;}
  var $row   = $t.closest('.DatosMeta');
  var $td    = $t.closest('td');
  var idxTd  = $td.index()-limite;
  var $metas = $row.find('.InputMetas');
  var nMetas = _.size($metas);
  var suma   = 0;
  (!v) ? v=0:'';
  v = dos(v);
  
  $t.val(v);
  
  for(var i=0;i<nMetas;i++){
    var $m = $($metas[i]);
    if(i>idxTd){
      $m.val(v);
    }
  }
  
  SumaRow({t:$t});

}/*/metaIndividual*/


function AjustaMovimientos(arrCambios){
 
  for(var x=0;x<_.size(arrCambios);x++){
    metaIndividual({t:arrCambios[x]});
  }

}/*/AjustaMovimientos*/


function calculaMontos(Op){
  var t           = Op.t;
  var v           = dos(t.value);
  var $row        = $(t).closest('.DatosMeta');
  var $metas      = $row.find('.InputMetas');
  var nMetas      = _.size($metas);
  var mIndividual = f(v) / f(nMetas);
  var $ultInput   = $($metas[nMetas-1]);
  var suma        = 0;
  t.value         = v;
  mIndividual     = (mIndividual) ? mIndividual : 0;
  mIndividual     = dos(mIndividual);
  
  for(var i=0;i<nMetas;i++){
   var $m = $($metas[i]);
    $m.val(mIndividual);
    activaFormato({t:$m});
    suma += mIndividual;
  }
   
  var dif   = dos(f(suma) - f(v));
  var resto = dos(f(mIndividual) - f(dif));
  $ultInput.val(resto);
  activaFormato({t:$ultInput});

}/*/calculaMontos*/

function rellenarHaciaBajo(Op){
  var $t = $(Op.t);
  var InputMetas = $t.hasClass('InputMetas');
  var v = f(sinFormato($t.val()));
  if(!v){return;}
  var $row       = $t.closest('.DatosMeta');
  var $td        = $t.closest('td');
  var idxRow     = $row.index();
  var idxTd      = $td.index();
  
  var arrRows    = $('.DatosMeta');
  var arrCambios = [];
  
  for(var a=0;a<_.size(arrRows);a++){
    if(InputMetas){
      
      if((a!=idxRow)&&(a>idxRow)){
        var arrMetas = $(arrRows[a]).find('td');
        var $input   = $(arrMetas[idxTd]).find('input');

        $input.val(v);
        SumaRow({t:$input});
      }    
    }else{
      
      var $input = $(arrRows[a]).find('.TotalMetas');
      $input.val(v);
      $input.change();
    }
  }
}/*/rellenarHaciaBajo*/

function SumaRow(Op){
  var $t = $(Op.t);
  var $row = $t.closest('.DatosMeta');
  var $td =  $t.closest('td');
  var $Total =  $row.find('.TotalMetas');
  var $metas =  $row.find('.InputMetas');
  var nMetas = _.size($metas);
  var suma = 0;
  for(var i=0;i<nMetas;i++){
    var $m = $($metas[i]);
    quitaFormato({t:$m});
    suma += f(($m.val())?$m.val():0);
    activaFormato({t:$m});
  }
  $Total.val(dos(suma));
  activaFormato({t:$Total});
}/*SumaRow*/


function activaFormato(Op){ 
  var $t = $(Op.t);
  var SysSepMiles = SalesUp.Sistema.Almacenamiento({a:'SysSepMiles'});
  var SysSepDecimales = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});

  var v = sinFormato($t.val());
  if(v==''){return;}
  var Formato = parseInt($('#Componente option:selected').attr('data-formato'));
  var Formateado;
  var MonedaFormato='';
  

  (!SysSepMiles)?SysSepMiles=',':'';
  (!SysSepDecimales)?SysSepDecimales='.':'';

  /* 1 - moneda  2 - cantidad  3 - porcentaje */
  
  if(Formato==1){
    Formateado = SalesUp.Sistema.FormatoMoneda(v);
  }else if(Formato==2){
    Formateado = accounting.formatNumber(v, 0, SysSepMiles, SysSepDecimales);
  }else if(Formato==3){
    Formateado = SalesUp.Sistema.FormatoPorcentaje((f(v)/f(100.00)));
  }else{
    Formateado = v;
  }

  $t.val(Formateado);

}/*ActivaFormato*/


function quitaFormato(Op){ 
  var $t = $(Op.t);
  var v = $t.val();
  if(!v){return;}
  $t.val(sinFormato(v)).select();
}/*quitaFormato*/

function sinFormato(v) {
    var SysSepDecimales = SalesUp.Sistema.Almacenamiento({a:'SysSepDecimales'});
    return accounting.unformat(v, SysSepDecimales);
}

function MueveCursor(Op){
  var $t         = $('#DataTabla input:focus');
  var $row       = $t.closest('.DatosMeta');
  var $td        = $t.closest('td');
  var idxRow     = $row.index();
  var idxTd      = $td.index();
  var move       = Op.m;
  var tInputsRow = _.size($row.find('input'));
  var $row, $td;

  if(move==='down'){
    idxRow = idxRow + 1;
    (idxRow<0)?idxRow=0:'';
    $row = $('.DatosMeta').eq(idxRow);
    $td = $row.find('td:eq('+idxTd+')').find('input');
    $td.focus().select();
  }
  
  if(move==='up'){
    idxRow = idxRow - 1;
    (idxRow<0)?idxRow=0:'';
    $row = $('.DatosMeta').eq(idxRow);
    $td = $row.find('td:eq('+idxTd+')').find('input');
    $td.focus().select();
  }
  
  if(move==='left'){
    var limite = 1;
    if ($('#Tipo').val()=='3'){limite = 2;};
    idxTd = idxTd - 1;
    (idxTd<limite)?idxTd=limite:'';
    
    $row = $('.DatosMeta').eq(idxRow);
    $td = $row.find('td:eq('+idxTd+')').find('input');
    $td.focus().select();
  }
  
  if(move==='right'){
    idxTd = idxTd + 1;
    (idxTd>tInputsRow+1)?idxTd=idxTd-1:'';
    
    $row = $('.DatosMeta').eq(idxRow);
    $td = $row.find('td:eq('+idxTd+')').find('input');
    $td.focus().select();
  }
}/* /MueveCursor*/


function MoverCursor(){
    jwerty.key('down', function(){ 
      MueveCursor({m:'down'});
    });
    
    jwerty.key('up', function(){ 
      MueveCursor({m:'up'});
    });
    
    jwerty.key('left', function(){ 
      MueveCursor({m:'left'});
    });
    
    jwerty.key('right', function(){ 
      MueveCursor({m:'right'});
    });
    
    jwerty.key('shift+down', function(){ 
      rellenarHaciaBajo({t:$('.InputMetas:focus, .TotalMetas:focus')});
    });
}



function AjustaMovimientos(arrCambios){
 
  for(var x=0;x<_.size(arrCambios);x++){
    metaIndividual({t:arrCambios[x]});
  }
  
}


SalesUp.Variables.AumentaRgb = function(color){
    color   = $('.InfoLabel').css('backgroundColor');
    color   = color.replace(/[^0-9,]+/g, "");
    var red = color.split(",")[0];
    var gre = color.split(",")[1];
    var blu = color.split(",")[2];

    red     = parseInt(red)+60;
    gre     = parseInt(gre)+60;
    blue    = parseInt(blu)+60;

    color   = 'rgb('+red+','+gre+','+blue+')';

    return color;
}

function ZebraReset(){
    var bandera = true;
    $('#DataTabla tr').each(function() {
    
        if(bandera){
            $(this).addClass('zebra');
                bandera= false;
        }else{
            $(this).removeClass('zebra');
                bandera= true;
        }
         
    });
}



function CrearSelectize(){
    sGrupo          = SalesUp.Variables.sIdGrupo;
    var arrGrupos   = [];
    var arrIdGrupos = [];
    var objGrupos   = [];
    var objTodos    = [];




    for(var i = 0; i <= quedan.length - 1; i++){

      var GRUPO   = quedan[i].GRUPO;
      var IDGRUPO = quedan[i].IDUSUARIOGRUPO;
      var arr     = {};
      var Todos   = {};

      if(arrGrupos.indexOf(GRUPO)==-1 ){

        arr.GRUPO = GRUPO;
        objGrupos.push(arr);
        arrGrupos.push(GRUPO);
        arrIdGrupos.push(IDGRUPO);

        Todos.IDUSUARIO = 'G'+IDGRUPO;
        Todos.IDGRUPO   = IDGRUPO;
        Todos.NOMBRE    = '(... Todos lo de '+GRUPO+' ...)';

        Todos.GRUPO     = GRUPO;
        objTodos.push(Todos);
      
      }
    }

    quedan   = _.union(objTodos,quedan);
    sGrupo = parseInt(sGrupo);
    var Posicion = '';
    for(var x = 0; x <= arrIdGrupos.length - 1; x++){
      if(arrIdGrupos[x]==sGrupo){Posicion=x;}
    }

    var MiGrupo = arrGrupos[Posicion];

    arrGrupos = _.reject(arrGrupos, function(arr){ 
      if(arr==MiGrupo)
      return arr; 
    });


    var arrNuevoOrden = [];
    arrNuevoOrden.push('');
    arrNuevoOrden.push(MiGrupo);

    arrGrupos = _.sortBy(arrGrupos, function(arr){ 
      return arr; 
    });

    for(var z = 0; z <= arrGrupos.length - 1; z++){
      arrNuevoOrden.push(arrGrupos[z]);
    }

    var strTodosE            = []; 
    
        var existe1 = false; 
        var existe2 = false; 
        var existe3 = false; 
        var existe4 = false;    
    for(var i=0 ; i<_.size(todosE); i++){
        
        if(todosE[i].NIVEL==1 && todosE[i].VERSISTEMA==1 && !(existe1)){
            strTodosE.push(JSON.parse('{"IDUSUARIOGRUPO":-1,"IDUSUARIO":-1,"NOMBRE":"Todos los administradores","GRUPO":""}'));
                existe1 = true;
        }
        if(todosE[i].NIVEL==1 && todosE[i].VERSISTEMA==0 && !(existe4)){
            strTodosE.push(JSON.parse('{"IDUSUARIOGRUPO":-4,"IDUSUARIO":-4,"NOMBRE":"Todos los auditores","GRUPO":""}'));
                existe4 = true;
        }
        if(todosE[i].NIVEL==2 && !(existe2)){
            strTodosE.push(JSON.parse('{"IDUSUARIOGRUPO":-2,"IDUSUARIO":-2,"NOMBRE":"Todos los gerentes","GRUPO":""}'));    
            existe2=true;   
        }        
        if(todosE[i].NIVEL==3 && !(existe3)){
            strTodosE.push(JSON.parse('{"IDUSUARIOGRUPO":-3,"IDUSUARIO":-3,"NOMBRE":"Todos los ejecutivos","GRUPO":""}'));      
            existe3=true;
        }   
    }

    //strTodosE                = JSON.parse(strTodosE);

    quedan               = _.union(strTodosE, quedan);

    setTimeout(function(){
        $('#SelectIds').selectize({
            maxItems           : 1,
            openOnFocus        : true,
            options            : quedan,
            valueField         : 'IDUSUARIO',
            searchField        : ['NOMBRE'],
            labelField         : 'NOMBRE',
            optgroups          : objGrupos,
            optgroupField      : 'GRUPO',
            optgroupLabelField : 'GRUPO',
            optgroupValueField : 'GRUPO',
            optgroupOrder      : arrNuevoOrden,
            sortField          : 'GRUPO',
            onChange: function(valueField){
                queVoyAgregar(valueField);
            }
        });
    }, 10);
    
}