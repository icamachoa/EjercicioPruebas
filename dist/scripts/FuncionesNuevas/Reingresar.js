function Reingresar(){
	Path = document.location.pathname;
	Intentos = parseInt(localStorage.SysIntentosAuto);
	(isNaN(Intentos))?Intentos=0:'';
	if(Intentos==0){
	  if(!isNaN(Activo) && (Path=='/')){ localStorage.SysIntentosAuto=Intentos+1; document.location.href='/privado/inicio.dbsp?t='+((new Date()).getTime()); }  
	}
}

Reingresar();
