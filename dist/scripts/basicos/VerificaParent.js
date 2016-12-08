var padre = location.pathname, buscar = location.search;
if( (padre != '/tests/index.html') && (padre != '/') && (padre != '/index.dbsp') && (padre != '/contpaqi_crm_login.dbsp') && (padre != '/indexOld.dbsp') && (padre != '/nIndex.dbsp') && (padre != '/login.dbsp')  && (padre != '/privado/inicializacion.dbsp') ){
	(padre.indexOf('ooops')==-1) ? localStorage.SysRedirecciona = padre+buscar : '';
	self.parent.document.location.href='/';
}

