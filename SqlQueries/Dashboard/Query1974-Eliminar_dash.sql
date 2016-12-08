//[session.idempresa|Untyped,session.idusuario|Untyped,tkdb|Text,session.db|Untyped,]
--delete
DECLARE @IDEMPRESA INT, @IDUSUARIO INT, @IDDASHBOARD INT
DECLARE @TKDB VARCHAR(MAX)

SET @IDEMPRESA = <#SESSION.IDEMPRESA/>
SET @IDUSUARIO = <#SESSION.IDUSUARIO/>

SET @TKDB = ISNULL(:TKDB,'')

SELECT @IDDASHBOARD = IDDASHBOARD 
FROM <#SESSION.DB/>.dbo.DASHBOARD 
WHERE TKDB = @TKDB AND IDEMPRESA = @IDEMPRESA 
AND IDUSUARIO = @IDUSUARIO

DELETE FROM <#SESSION.DB/>.dbo.DASHBOARD_CONFIGURACION 
WHERE IDDASHBOARD = @IDDASHBOARD

DELETE FROM <#SESSION.DB/>.dbo.DASHBOARD 
WHERE IDDASHBOARD = @IDDASHBOARD 

