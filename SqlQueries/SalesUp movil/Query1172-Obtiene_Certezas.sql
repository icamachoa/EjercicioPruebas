//[fecha|Text,bd|Text,idempresa|Text,]
-- select
DECLARE @SQL VARCHAR(MAX)
DECLARE @FECHA VARCHAR(100)
DECLARE @BD VARCHAR(1000)
DECLARE @IDEMPRESA VARCHAR(1000)
SET @FECHA = ISNULL(:FECHA,'')
SET @BD=ISNULL(:BD,'')
SET @IDEMPRESA=CAST(ISNULL(:IDEMPRESA,0) AS VARCHAR(1000))

SET @SQL='
SELECT IDCERTEZAEMPRESA AS IDCERTEZAEMPRESA, IDEMPRESA AS IDEMPRESA,CERTEZA AS CERTEZA,ISNULL(DESCRIPCION,'''') AS DESCRIPCION,ULTIMAMODIFICACION AS ULTIMAMODIFICACION , '''+@FECHA+''' AS FECHA, '''+@BD+''' AS BD
FROM '+@BD+'.DBO.EMPRESAS_CERTEZAS WITH (NOLOCK) WHERE IDEMPRESA = '+@IDEMPRESA+' AND ULTIMAMODIFICACION >= CONVERT(DATETIME,'''+@FECHA+''',20)
'
EXEC (@SQL)