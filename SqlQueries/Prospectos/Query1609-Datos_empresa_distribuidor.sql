//[session.db|Untyped,session.idempresa|Untyped,]
-- select

select idrelacion,contacto,direccion1,direccion2,telefono,idestado,idpais,codigopostal,latitud,longitud,empresa,idempresadestino 
from control.control.dbo.empresas_relacionadas er WITH(NOLOCK)
WHERE idempresaorigen = <#SESSION.IDEMPRESA/> and canalizar = 1