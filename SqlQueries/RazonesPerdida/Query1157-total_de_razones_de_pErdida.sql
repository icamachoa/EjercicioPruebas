//[tipo|Text,session.db|Untyped,session.idempresa|Untyped,]
--SELECT

DECLARE @SQL VARCHAR(MAX)
DECLARE @CONDICION varchar(max)
DECLARE @TIPO VARCHAR(10)

SET @TIPO= ISNULL(:tipo, '') 
SET @CONDICION= CASE WHEN @TIPO!='' THEN 'AND TIPO='+@TIPO WHEN @TIPO='' THEN '' END 



SET @SQL = '
 select count(*) as totaln, ISNULL('''+@TIPO+''', '''') AS TIPO from <#SESSION.DB/>.DBO.EMPRESAS_RAZONES_PERDIDA
 where IDEMPRESA=<#SESSION.IDEMPRESA/> '+@CONDICION

EXEC (@SQL)