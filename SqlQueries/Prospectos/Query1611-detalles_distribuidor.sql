//[idrelacion|Integer,session.idempresa|Untyped,]
-- SELECT 
/*PROTEGIDO*/
DECLARE @IDRELACION INT

SET @IDRELACION = CAST(ISNULL(:IDRELACION,0) AS INT)

select idrelacion,contacto,direccion1,direccion2,telefono,idestado,idpais,codigopostal,latitud,longitud,empresa
from control.control.dbo.empresas_relacionadas WITH(NOLOCK) 
WHERE idempresaorigen = <#SESSION.IDEMPRESA/> and canalizar = 1 AND IDRELACION = @IDRELACION