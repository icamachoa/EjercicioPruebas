//[session.idusuario|Untyped,session.db|Untyped,session.idempresa|Untyped]
--SELECT
DECLARE @idusuario VARCHAR(MAX)
DECLARE @idempresa VARCHAR(MAX)

SET @idusuario = <#session.idusuario/>
SET @idempresa = <#session.idempresa/>

SELECT * FROM <#SESSION.DB/>.DBO.REGISTRO_INCONSISTENCIA_CONFIGURACION WHERE idempresa = @idempresa; 