   function ObtienePaisesSimple(idpais) {
      var date = new Date();	    
		var url = "https://acceso.salesup.com.mx/recargaestadossimple.dbsp" + '?idpais='+idpais+'&v='+date.getTime();
		var body = document.getElementsByTagName("body")[0];
		var scr = document.createElement("script");
		scr.setAttribute("type","text/javascript");
		scr.setAttribute("src",url);
		scr.setAttribute("id","scriptTemporal");
 		body.appendChild(scr);
		return false;		
	}

   function ObtienePaises(idpais) {
      var date = new Date();	    
		var url = "https://acceso.salesup.com.mx/recargaestados.dbsp" + '?idpais='+idpais+'&v='+date.getTime();
		var body = document.getElementsByTagName("body")[0];
		var scr = document.createElement("script");
		scr.setAttribute("type","text/javascript");
		scr.setAttribute("src",url);
		scr.setAttribute("id","scriptTemporal");
 		body.appendChild(scr);
		return false;		
	}

   function ObtienePaisesSeleccion(idpais) {
      var date = new Date();	    
		var url = "https://acceso.salesup.com.mx/recargaestadosseleccion.dbsp" + '?idpais='+idpais+'&v='+date.getTime();
		var body = document.getElementsByTagName("body")[0];
		var scr = document.createElement("script");
		scr.setAttribute("type","text/javascript");
		scr.setAttribute("src",url);
		scr.setAttribute("id","scriptTemporal");
 		body.appendChild(scr);
		return false;		
	}

	function Estados(valor){
        var body = document.getElementsByTagName("body")[0];
		var scr = document.getElementById("scriptTemporal");		
		var Estados = document.getElementById("frm_elem_Estado");
        body.removeChild(scr);
        if (valor!="" && Estados!=null)         
          Estados.innerHTML = valor;
	}

  function ValidaDatosCompra(forma) {
    var res = true;
    var B_ArrTarjCredito = new Array ("TARJETA_NOMBRE","TARJETA_NUMERO","TARJETA_CODIGO");
		if (res){
		  //alert(forma.FORMA_PAGO[1].checked);
		  if (forma.FORMA_PAGO[1].checked) 
		    if (!ValidaControlesNoNulos(forma,B_ArrTarjCredito))
			  res = false;
			else{
			  if (forma.TARJETA_TIPO.value == 3){
  			    if (forma.TARJETA_NUMERO.value.length != 15){
			      alert("El n£mero de tarjeta debe ser de 15 d¡gitos.");
				  forma.TARJETA_NUMERO.focus();
			      res = false;
				}
  			    if (res && forma.TARJETA_CODIGO.value.length != 4){
			      alert("El c¢digo de seguridad debe ser de 4 d¡gitos.");
				  forma.TARJETA_CODIGO.focus();
			      res = false;
				}
			 }
			 else{
  			    if (res && forma.TARJETA_NUMERO.value.length != 16){
			      alert("El n£mero de tarjeta debe ser de 16 d¡gitos.");
				  forma.TARJETA_NUMERO.focus();
			      res = false;
				}
  			    if (res && forma.TARJETA_CODIGO.value.length != 3){
			      alert("El c¢digo de seguridad debe ser de 3 d¡gitos.");
				  forma.TARJETA_CODIGO.focus();
			      res = false;
				}
              }	 
			  }
		    
		}
//    if (res)
//	  res = confirm("¨Esta seguro de querer proceder con la compra?");
	return res;
  }

  function ValidaDatosFacturacion(forma) {
    var B_ArrSupport     = new Array ("TELEFONO","CORREO");
    var B_ArrFACT     = new Array ("NOMBRE","RFC", "DIRECCION", "CIUDAD", "CODIGOPOSTAL");
    var res = false;
    if ( 
	     (ValidaControlesNoNulos(forma,B_ArrSupport))&&
		 (ValidaCorreo (forma.CORREO.value))
	    )
		  if (forma.FACTURA[1].checked){
		    res = ValidaControlesNoNulos(forma,B_ArrFACT);
		 }
		 else
		   res = true;
    return res;
	}


/************************************************ 
Thorcom IT Solutions Provider 
-----------------------------
Scripts de validaci¢n para DBSP
Todos los derechos reservados (R)
************************************************/


// variables globales
var Explorador = navigator.appName;



/******************************************************************************
  funcion ValidaNatural
  Esta funci¢n valida que el texto capturado dentro de un control de texto sea
  un n£mero Natural o cero.
******************************************************************************/

function ValidateNatural(evento) {
	var Tecla;
	var valido=false;

	if (Explorador.indexOf("Explorer",0) != -1) {
		Tecla = evento.keyCode;
	} else {
		Tecla=evento.which;
	}
	if (((Tecla > 47) && (Tecla < 58)) || (Tecla==8) || (Tecla==13)) {
		valido=true;
	}
	if (Explorador.indexOf("Explorer",0) != -1) {
		if (!valido) {
			evento.keyCode = "";
		}
	}
	return valido;
}







/******************************************************************************
  funcion ValidaFlotante
  Esta funci¢n valida que el texto capturado dentro de un control de texto sea
  un n£mero real.
  
  onKeyPress=ValidateFloat (event, this) 
  
******************************************************************************/

function ValidateFloat(evento, control) {
	var Tecla;
	var valido=false;

	if (Explorador.indexOf("Explorer",0) != -1) {
		Tecla = evento.keyCode;
	} else {
		Tecla=evento.which;
	
	}
	

	
	if (((Tecla > 47) && (Tecla < 58)) || (Tecla==8) || (Tecla==13) || 
	    (Tecla==45) || (Tecla==46) || (Tecla==37) || (Tecla==39) ) {
    	if ( (Tecla==46) && (control.value.indexOf(".")!= -1 ) ) {
    	  valido = false 
    	 } else
    	if ( (Tecla==45) && (control.value!='' ) ) {
    	  valido = false 
    	 }
    	 else {
    	   valido = true;
    	 }		 
	}
	if (Explorador.indexOf("Explorer",0) != -1) {
		if (!valido) {
			evento.keyCode = "";
		}
	}
	return valido;
}







/******************************************************************************
  funcion ValidaFecha
  Esta funci¢n valida que el texto capturado dentro de un control de texto 
  tenga la estructura de una fecha. Debe complementarse con ValidaFechaExiste
  antes de realizar el submit de la forma.
******************************************************************************/

function ValidateDate (evento,control) {
	var Tecla;
	var valido=false;

	if (Explorador.indexOf("Explorer",0) != -1) {
		Tecla = evento.keyCode;
	} else {
		Tecla=evento.which;
	}

	if (((Tecla > 47) && (Tecla < 58)) || (Tecla==8) || (Tecla==13)) {
		valido=true;
	} else if (Tecla==47) {
		//Valida que no haya dos caracteres "/"
		var i=0;
		var posicion=0;
		var valor=control.value;
		var dia=0;
		var strDia="";
		while (valor.indexOf("/") != -1) {
			i++;
			posicion=valor.indexOf("/");
			valor=valor.substring(posicion+1, valor.length);
		}
		if (i==2) {
			alert("La fecha no puede contener tres veces el caracter /");
			valido=false;
		} else if (i==1) {
			if (valor=="") {
				alert("El mes es inv lido");
				strDia=control.value;
				strDia=strDia.substring(0, posicion);
				control.value="";
				valido=false;
			} else {
				mes = parseFloat(valor);
				strDia=control.value;
				strDia=strDia.substring(0, posicion);
				dia = parseFloat(strDia);
				if (mes > 0 && mes < 13) {
					//Ahora valida el mes contra el dia
					if ( mes==4 || mes==6 || mes==9 || mes==11) {
						if ( dia > 30 ) {						
							alert("Este mes no tiene "+ dia + " d¡as");
							//control.value="";
							valido=false;
						} else {
							valido=true;
						}
					} else if (mes==2) {
						if (dia > 29) {
								alert("Este mes no tiene "+ dia + " d¡as");
								//control.value="";
								valido=false;
							} else {
								valido=true;
							}
					} else {
						valido=true;
					}
				} else {
					alert("El mes es inv lido");
					//control.value="";
					valido=false;
				}
			}
		} else if (i==0) {
			//Este es el primer caracter "/"
			if (valor=="") {
				alert("El d¡a es inv lido");
				//control.value="";
				valido=false;
			} else {
				//valida el dia
				dia=parseFloat(valor);
				if ((dia==0) || (dia > 31)) {
					alert("El d¡a es inv lido");
					//control.value="";
					valido=false;
				} else {
					valido=true;
				}
			}
		}
	}
	if (Explorador.indexOf("Explorer",0) != -1) {
		if (!valido) {
			evento.keyCode = "";
		}
	}
	return valido;
}






/******************************************************************************
  funcion URLHint
  Esta funci¢n muestra un hint en la barra de estatus del explorador. 
******************************************************************************/


 function URLHint (Mensaje){
   window.defaultStatus = '';
   window.status = Mensaje;
 }



/******************************************************************************
  funcion SelectControl
  Esta funci¢n selecciona un control dentro de la forma. 
******************************************************************************/
 
 function SelectControl (Control) {
   Control.focus();
   Control.select(); 
 }

 
 
 
 
/******************************************************************************
  funcion RevisaSeleccion
  Esta funci¢n revisa que al menos un radio button o check box este 
  seleccionado dentro de una forma.  
******************************************************************************/
 
 
 function RevisaSeleccion(Forma,Mensaje)  {    
    var ElIdx = "";
    for (var i = 0; i <Forma.elements.length; i++) {
      if (Forma.elements[i].checked == "1")  {  
        ElIdx = Forma.elements[i].value;
      }    

    }    
    if (ElIdx == "")  {
      alert (Mensaje);
    }
    return ElIdx;
  }





/******************************************************************************
  funcion ValidaControlesFecha
  Esta funci¢n valida que un arreglo de controles de tipo fecha contenga
  valores de fecha v lidos.
******************************************************************************/


  function ValidaControlesFecha (Forma,Arreglo) {
     for (var i = 0; i < Forma.elements.length; i++) {  	
       if (EstaEnArreglo(Forma.elements[i].name,Arreglo)) {
            	if (!EsFecha(Forma.elements[i].value)) {
                    alert ("Este campo debe contener una fecha v lida (DD/MM/AAAA)!");
                    Forma.elements[i].focus()
                    Forma.elements[i].select()	
                    return false           
                }         
       }         
     }
    return true;
  }
  

/******************************************************************************
  funcion ValidaControlesNoNulos
  Esta funci¢n valida que un arreglo de controles no tenga valores nulos.
  
******************************************************************************/
  
  
  function ValidaControlesNoNulos(Forma,Arreglo) {
     for (var i = 0; i < Forma.elements.length; i++) {  	
       if (EstaEnArreglo(Forma.elements[i].name,Arreglo)) {
            	if (EsVacio(Forma.elements[i].value)) {
                    alert ("Este campo no puede ser nulo!");
                    Forma.elements[i].focus()
                    Forma.elements[i].select()	
                    return false           
                }         
       }         
     }
    return true;
  }

  


/******************************************************************************
  funcion Mayusculas
  Esta funci¢n convierte el texto de un control a mayusculas
******************************************************************************/

function Mayusculas (Control) {
  Control.value=Control.value.toUpperCase();

}





/******************************************************************************
  funcion Minusculas
  Esta funci¢n convierte el texto de un control a mayusculas
******************************************************************************/

function Minusculas (Control) {
  Control.value=Control.value.toLowerCase();

}




/******************************************************************************
  Funciones de soporte para las funciones principales.
******************************************************************************/



  function EstaEnArreglo(Elemento, Arreglo) {
    for (var i = 0; i < Arreglo.length; i++) {  	
      if (Arreglo[i]==Elemento) {        
          return true
      }         
    }
    return false  
  }



  
  function EsVacio(Cadena) {
    
    if (Cadena == "" || Cadena == null) {
      return true
    }
  
   for (var i = 0; i < Cadena.length; i++) {
      var Caracter = Cadena.substring(i, i + 1)
      if (Caracter!=" " && Caracter!="\t" && Caracter!="\n") {
        return false
      }
   }
  
    return true
  }


  
  
   function EsFecha(Fecha) {
   
     var Dia= SubcadenaDelim(Fecha,"/",0,1)
     var Mes= SubcadenaDelim(Fecha,"/",1,2)
     var Anio= SubcadenaDelim(Fecha,"/",2,3)
     
     if (EsVacio(Fecha)) {
          return true		
     }
   
     if ( (!ValidaDia(Dia)) || (!ValidaMes(Mes)) || (!ValidaAnio(Anio)) ) { 	
          return false;
     }     
   
     return(EsFechaCalendarioGregoriano(Dia,Mes,Anio,Fecha) ) 
   }
   
   
   
   
   
   function EsNumero(Cadena) {
   
     if (Cadena == "" || Cadena == null) {
       return true
     }
   
     for (var i = 0; i < Cadena.length; i++) {
       var Caracter = Cadena.substring(i, i + 1)
       if (Caracter < "0" || Caracter > "9") {
         return false
       }
     }
     return (!(Cadena.length==0))
   }


   
   function EnRango(Cadena, Min, Max) {
     var num = parseInt(Cadena)
     if (num < Min || num > Max) {
      return false
     }
     return true
   }
   
   
   function EliminaCeros(Cadena) {
     var Resultado = Cadena
     while (Resultado.substring(0,1) == "0") {
      Resultado = Resultado.substring(1,Resultado.length)
     }
        return Resultado
   }
   
   
   function ValidaCampoNumerico(Campo,Min,Max) {
     var Entrada = EliminaCeros(Campo)
   
     if ((!EsNumero(Entrada)) || (!EnRango(Entrada,Min,Max)) || EsVacio(Entrada) ) {
         return false
     }
   
     return true
   }
     
     
	 
   function ValidaDia(Campo) {
     return (ValidaCampoNumerico(Campo,1,31))
   }
   
   function ValidaMes(Campo) {
     return (ValidaCampoNumerico(Campo,1,12))
   }
   
   function ValidaAnio(Campo) {
     return (ValidaCampoNumerico(Campo,1900,9999))
   }
   
   
   
   
    function FechaCalendarioGregoriano(Dia,Mes,Anio) {
        var DiaMaximo=0;
        var MesAux=parseInt(Mes)
    
        if (Mes==1 || Mes==3 || Mes==5 || Mes==7 || Mes==8 || Mes==10 || Mes==12) {
           DiaMaximo=31
        }
        else {
           if (Mes==2) {
               if ((Anio % 4)==0 && Anio!=1900) {
                    DiaMaximo=29
               }
               else {
                    DiaMaximo=28
               }
           }
           else {
               DiaMaximo=30
           }
        }
    
        return(parseInt(Dia)<=DiaMaximo)
    }
   
   
    
    
    function EsFechaCalendarioGregoriano(Dia,Mes,Anio,Control) {
        var Mensaje="La fecha " +Dia+"/"+Mes+"/"+Anio+ " no existe."
    
        if(FechaCalendarioGregoriano(Dia,Mes,Anio)) {
            return(true)    
        }
        else {
             alert(Mensaje)
             return false
       }
    
    }   
	
	
	
    function SubcadenaDelim(Cadena,Delimitador,Inicio,Fin) {
      var AparDelim=0
      var Subcadena=""
      for (var i = 0; i < Cadena.length; i++) {
        var Caracter = Cadena.substring(i, i + 1)
    
        if (Caracter==Delimitador) {
            AparDelim++
        }
     
        if ((AparDelim>=Inicio) && (AparDelim<Fin) ) {
            if (!(Caracter==Delimitador)) {
               Subcadena= Subcadena+Caracter
            }
        } 
        
        if (AparDelim==Fin) {
            return(Subcadena)
        }          
      }	
      return (Subcadena)  	
    }

/******************************************************************************
  funcion ValidaHora
  Esta funci¢n valida que el texto capturado dentro de un control de texto 
  tenga la estructura de una hora.
******************************************************************************/

function ValidaHora (evento,control) {
	var Tecla;
	var valido=false;

	if (Explorador.indexOf("Explorer",0) != -1) {
		Tecla = evento.keyCode;
	} else {
		Tecla=evento.which;
	}

	if (((Tecla > 47) && (Tecla < 58)) || (Tecla==8) || (Tecla==13)) {
		valido=true;
	} else if (Tecla==58) {
		//Valida que no haya dos caracteres "/"
		var i=0;
		var posicion=0;
		var valor=control.value;
		var dia=0;
		var strDia="";
		while (valor.indexOf(":") != -1) {
			i++;
			posicion=valor.indexOf(":");
			valor=valor.substring(posicion+1, valor.length);
		}
		if (i==1) {
			alert("La hora no puede contener dos veces el caracter :");
			valido=false;
		} else if (i==0) {
			//Este es el primer caracter ":"
			if (valor=="") {
				alert("La hora es inv lida");
				//control.value="";
				valido=false;
			} else {
				//valida el dia
				dia=parseFloat(valor);
				if (dia > 23) {
					alert("La hora es inv lida");
					//control.value="";
					valido=false;
				} else {
					valido=true;
				}
			}
		}
	}
	if (Explorador.indexOf("Explorer",0) != -1) {
		if (!valido) {
			evento.keyCode = "";
		}
	}
	return valido;
}

/******************************************************************************
  funcion ValidaControlesFecha
  Esta funci¢n valida que un arreglo de controles de tipo fecha contenga
  valores de fecha v lidos.
******************************************************************************/


  function ValidaControlesHora (Forma,Arreglo) {
     for (var i = 0; i < Forma.elements.length; i++) {  	
       if (EstaEnArreglo(Forma.elements[i].name,Arreglo)) {
            	if (!EsHora(Forma.elements[i].value)) {
                    alert ("Este campo debe contener un horario v lido (HH:MM)!");
                    Forma.elements[i].focus()
                    Forma.elements[i].select()	
                    return false           
                }         
       }         
     }
    return true;
  }

   function EsHora(Fecha) {
     var Dia= SubcadenaDelim(Fecha,":",0,1)
     var Mes= SubcadenaDelim(Fecha,":",1,2)
     
     if (EsVacio(Fecha)) {
          return true		
     }
   
     if ( (!ValidaHoras(Dia)) || (!ValidaMinutos(Mes)) ) { 	
          return false;
     }     
   
     return true
   }
   
   function ValidaHoras(Campo) {
     return (ValidaCampoNumericoHora(Campo,0,23))
   }
   
   function ValidaMinutos(Campo) {
     return (ValidaCampoNumericoHora(Campo,0,59))
   }
   
   function ValidaCampoNumericoHora(Campo,Min,Max) {
     Prueba = new Number(Campo)
     if ((Prueba==0)&&(!EsVacio(Campo))){ Entrada = "0" }else{ Entrada = EliminaCeros(Campo);}
     if ((!EsNumero(Entrada)) || (!EnRango(Entrada,Min,Max)) || EsVacio(Entrada) ) {
         return false
     }
   
     return true
   }
     
   

/******************************************************************************
  funcion AcomodaFechas
  Esta funci¢n agrega el caracter '/' a un arreglo de controles de tipo 
  fecha que no lo contengan.
******************************************************************************/


function AcomodaFechas(Forma,Arreglo) {
  for (var i = 0; i < Forma.elements.length; i++) {  	
    if (EstaEnArreglo(Forma.elements[i].name,Arreglo)) {
      if(!(EsVacio(Forma.elements[i].value))){
         cadena = Forma.elements[i].value
         if (cadena.indexOf("/")==-1){
           cadena = cadena.charAt(0) + cadena.charAt(1) + "/" + cadena.charAt(2) + cadena.charAt(3) + "/" + cadena.charAt(4)+cadena.charAt(5) + cadena.charAt(6)+cadena.charAt(7)
           Forma.elements[i].value = cadena
         }
         
      }
    }         
  }
}   


var dtCh= "/";
var tmCh= ":";
var minYear=1900;
var maxYear=2100;

function isInteger(s){
	var i;
    for (i = 0; i < s.length; i++){   
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}

function stripCharsInBag(s, bag){
	var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++){   
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function daysInFebruary (year){
	// February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}
function DaysArray(n) {
	for (var i = 1; i <= n; i++) {
		this[i] = 31
		if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
		if (i==2) {this[i] = 29}
   } 
   return this
}

function isDate(dtStr){
	var daysInMonth = DaysArray(12)
	var pos1=dtStr.indexOf(dtCh)
	var pos2=dtStr.indexOf(dtCh,pos1+1)
	var strDay=dtStr.substring(0,pos1)
	var strMonth=dtStr.substring(pos1+1,pos2)
	var strYear=dtStr.substring(pos2+1)
	strYr=strYear
	if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
	if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
	for (var i = 1; i <= 3; i++) {
		if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
	}
	month=parseInt(strMonth)
	day=parseInt(strDay)
	year=parseInt(strYr)
	if (pos1==-1 || pos2==-1){
		alert("The date format should be : mm/dd/yyyy")
		return false
	}
	if (strMonth.length<1 || month<1 || month>12){
		alert("Please enter a valid month")
		return false
	}
	if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
		alert("Please enter a valid day")
		return false
	}
	if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
		alert("Please enter a valid 4 digit year between "+minYear+" and "+maxYear)
		return false
	}
	if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
		alert("Please enter a valid date")
		return false
	}
return true
}


function isTime(dtStr){
	var pos1=dtStr.indexOf(tmCh)
	
	var strHour=dtStr.substring(0,pos1)
	var strMin=dtStr.substring(pos1+1)
	
	if (strHour.charAt(0)=="0" && strHour.length>1) strHour=strHour.substring(1)
	if (strMin.charAt(0)=="0" && strMin.length>1) strMin=strMin.substring(1)
	
	hour=parseInt(strHour)
	min=parseInt(strMin)

	if (pos1==-1){
		alert("The time format should be : hh:mm")
		return false
	}
	if (strHour.length<1 || hour<0 || hour>23){
		alert("Please enter a valid hour (Between 0 and 23)")
		return false
	}
	if (strMin.length<1 || min<0 || min>59){
		alert("Please enter a valid minute (between 0 and 60)")
		return false
	}
return true
}

/******************************************************************************
  function ValidateDate (dt:input control)
  This function receives an input control and returns true if the value
  correspond to a mm/dd/yyyy structure. In othercase, returns false.
  
******************************************************************************/


function ValidateDate(dt){
	if (isDate(dt.value)==false){
		dt.focus()
		return false
	}
    return true
 }
 
 
/******************************************************************************
  function ValidateDate (tc: input control)
  This function receives an input control and returns true if the value
  correspond to a HH:MM structure. In othercase, returns false.
  
******************************************************************************/
 
function ValidateTime(tc){
	if (isTime(tc.value)==false){
		tc.focus()
		return false
	}
    return true
}

/******************************************************************************
  function ValidateNotNullControls (Forma: Form, Arreglo: Array of controls)
  This function receives a form and an array of strings with the names of the 
  control names that can't be null. If each control contained has a value it
  returns true, otherwise, it retuns false.
  
******************************************************************************/


  function ValidateNotNullControls(Forma,Arreglo) {
     for (var i = 0; i < Forma.elements.length; i++) {  	
       if (EstaEnArreglo(Forma.elements[i].name,Arreglo)) {
            	if (EsVacio(Forma.elements[i].value)) {
                    alert ("This field can not be empty!");
                    Forma.elements[i].focus()
                    Forma.elements[i].select()	
                    return false           
                }         
       }         
     }
    return true;
  }

/******************************************************************************
  function ValidateInteger (event)
  This function disallow alfabetic characters in a control. It must be used
  with the onkeypress event.
  
******************************************************************************/
  
function ValidateInteger(evento) {
	var Tecla;
	var valido=false;

	if (Explorador.indexOf("Explorer",0) != -1) {
		Tecla = evento.keyCode;
	} else {
		Tecla=evento.which;
	}
	if (((Tecla > 47) && (Tecla < 58)) || (Tecla==8) || (Tecla==13) ||
	    (Tecla==45) ) {
		valido=true;
	}
	if (Explorador.indexOf("Explorer",0) != -1) {
		if (!valido) {
			evento.keyCode = "";
		}
	}
	return valido;
}


/******************************************************************************
  function ValidateTime (event)
  This function disallow alfabetic characters in a control. It must be used
  with the onkeypress event.
  
******************************************************************************/
  
function ValidTime(evento) {
	var Tecla;
	var valido=false;

	if (Explorador.indexOf("Explorer",0) != -1) {
		Tecla = evento.keyCode;
	} else {
		Tecla=evento.which;
	}
	if (((Tecla > 47) && (Tecla < 58)) || (Tecla==8) || (Tecla==13) ||
	    (Tecla==58) ) {
		valido=true;
	}
	if (Explorador.indexOf("Explorer",0) != -1) {
		if (!valido) {
			evento.keyCode = "";
		}
	}
	return valido;
}


/******************************************************************************
  function ValidateDate (event)
  This function disallow alfabetic characters in a control. It must be used
  with the onkeypress event.
  
******************************************************************************/
  
function ValidDate(evento) {
	var Tecla;
	var valido=false;

	if (Explorador.indexOf("Explorer",0) != -1) {
		Tecla = evento.keyCode;
	} else {
		Tecla=evento.which;
	}
	if ( ((Tecla >= 47) && (Tecla < 58)) || (Tecla==8) || (Tecla==13) ) {
		valido=true;
	}
	if (Explorador.indexOf("Explorer",0) != -1) {
		if (!valido) {
			evento.keyCode = "";
		}
	}
	return valido;
}



/******************************************************************************
  funcion ValidateEmailNow
  Esta funci¢n verifica que el correo introducido sea correcto.
******************************************************************************/

function ValidateEmailNow(control){
  var i=1
  var correo = control.value;
  var finalX = correo.length
  var valido = false
  if(finalX>0){
    if((EsLetra(correo.charAt(0)))){ 
       var token = correo.charAt(i)
       while((i<finalX)&&(token!='@')&&((EsLetra(token))||(EsNumero(token))||(token=='.')||(token=='_'))){
          i++;   
          token = correo.charAt(i);
       }
       if ((token == '@')&&(correo.charAt(i+1)!= '.')&&((i+1)<finalX)){
          i++;   
          token = correo.charAt(i)
          while((i<finalX)&&(token!='.')&&((EsLetra(token))||(EsNumero(token))||(token=='_'))){
              i++;   
              token = correo.charAt(i)
          }
          if((token == '.')&&(correo.charAt(i+1)!='.')&&((i+1)<finalX)){
            i++;   
            token = correo.charAt(i)
            while((i<finalX)&&(token!='.')&&((EsLetra(token))||(EsNumero(token)||(token=='_')))){
               i++;   
               token = correo.charAt(i)
            }
            if (i>=finalX){
               return true
            }else{
               if ((token == '.')&&((i+1)<finalX)){
                 i++;   
                 token = correo.charAt(i)
                 while((i<finalX)&&((EsLetra(token))||(EsNumero(token))||(token=='_'))){
                   i++;   
                   token = correo.charAt(i)
                 }
                 if(i>=finalX){
                    return true
                 }else{
                    //alert('Hay algo mal despu‚s del segundo punto')
                    //SelectControl(control);
                    //return false
                    return true
                 }
               }else{
                  //alert('There is an unknown symbol after the first dot.')
					alert ('Correo el‚ctronico incorrecto.')
                  SelectControl(control);
                  return false
               }
            }
          }else{
            //alert('There is no dot or there is an invalid symbol.')
			alert ('Correo el‚ctronico incorrecto.')
             SelectControl(control);
             return false
          }
       }else{
          //alert('There is no \'@\', there is no domain, or there is an invalid symbol.')
			alert ('Correo el‚ctronico incorrecto.')
          SelectControl(control);
          return false
       }
    }else{
    // alert('An invalid e-mail start')
		alert ('Correo el‚ctronico incorrecto.')
       SelectControl(control);
       return false;
    }
  }else{
     return true;
  }
}
/******************************************************************************
  funcion EsLetra
  Devuelve true si el caracter recibido es una letra.
******************************************************************************/

function EsLetra(letra){
   if(((letra>='A') && (letra<='Z')) ||((letra>='a')&&(letra<='z'))){
      return true;
   }else{
      return false;
   }
}
/******************************************************************************
  funcion EsNumero
  Devuelve true si el caracter recibido es un n£mero.
******************************************************************************/

function EsNumero(numero){
   if((numero>='0') && (numero<='9')){
      return true;
   }else{
      return false;
   }
}


/******************************************************************************
  funcion ValidaCorreo
  Esta funci¢n verifica que el correo introducido sea correcto.
******************************************************************************/

function ValidaCorreo(correo){
  var i=1
  var final = correo.length
  var valido = false
  if(final>0){
    if((EsLetra(correo.charAt(0)))){ 
       var token = correo.charAt(i)
       while((i<final)&&(token!='@')&&((EsLetra(token))||(EsNumero(token))||(token=='-')||(token=='.')||(token=='_'))){
          i++;   
          token = correo.charAt(i);
       }
       if ((token == '@')&&(correo.charAt(i+1)!= '.')&&((i+1)<final)){
          i++;   
          token = correo.charAt(i)
          while((i<final)&&(token!='.')&&((EsLetra(token))||(EsNumero(token))||(token=='_')||(token=='-'))){
              i++;   
              token = correo.charAt(i)
          }
          if((token == '.')&&(correo.charAt(i+1)!='.')&&((i+1)<final)){
            i++;   
            token = correo.charAt(i)
            while((i<final)&&(token!='.')&&((EsLetra(token))||(EsNumero(token)||(token=='_')||(token=='-')))){
               i++;   
               token = correo.charAt(i)
            }
            if (i>=final){
               return true
            }else{
               if ((token == '.')&&((i+1)<final)){
                 i++;   
                 token = correo.charAt(i)
                 while((i<final)&&((EsLetra(token))||(EsNumero(token))||(token=='_')||(token=='-'))){
                   i++;   
                   token = correo.charAt(i)
                 }
                 if(i>=final){
                    return true
                 }else{
                    alert('Hay algo mal despu‚s del segundo punto')
                    return false
                 }
               }else{
                  alert('Hay un simbolo desconocido despu‚s del primer punto')
                  return false
               }
            }
          }else{
             alert('No tiene punto, o hay algun s¡mbolo no valido')
             return false
          }
       }else{
          alert('No hay \'@\', no hay dominio, o hay un s¡mbolo no valido')
          return false
       }
    }else{
       alert('El comienzo del correo es invalido')
       return false;
    }
  }else{
     return true;
  }
}
  

