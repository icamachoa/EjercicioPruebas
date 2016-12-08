function storageEnabled() {
  try {localStorage.setItem('__Privado', 'No'); } 
  catch (e){ if (/QUOTA_?EXCEEDED/i.test(e.name)) { return false; } }
  localStorage.removeItem('__Privado');
  return true;
}

if(!storageEnabled()){
  setTimeout(function(){
    $('#BoxLogin').hide();
    $('#MsjNav').show().html('<span style="font-size:16px;"> <br/>Se encuentra en <b>"Navegación privada"</b> <br/><br/> Por favor desactive esta función para poder acceder al sistema.<br/><br/></span>');  
  },300);
}
