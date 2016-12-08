//[session.db|Untyped,session.idempresa|Untyped,condicion|Text,]
--select
DECLARE @CRIT VARCHAR(MAX)
DECLARE @SQL VARCHAR(MAX)
SET @CRIT = ISNULL( :CONDICION , '')

SET @SQL = '
 SELECT replace(up.asunto,''"'',''&quot;'') as asunto, up.* 
 FROM <#SESSION.DB/>.DBO.USUARIOS_PLANTILLAS up,<#SESSION.DB/>.DBO.usuarios u 
 WHERE  u.idempresa=<#session.idempresa/> and u.idusuario=up.idusuario 
 ' + @CRIT
EXEC (@SQL)