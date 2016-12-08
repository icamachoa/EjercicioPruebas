//[bd|Text,idusuario|Integer,fecha|Text,]
--SELECT

DECLARE @BD VARCHAR(512)
DECLARE @EXECSQL VARCHAR(8000)
DECLARE @FECHA VARCHAR(1000)
DECLARE @IDUSUARIO VARCHAR(1000)

SET @BD = ISNULL(:BD,'')
SET @FECHA = ISNULL(:FECHA,'')
SET @IDUSUARIO = CAST( ISNULL(:IDUSUARIO,0) AS VARCHAR(1000))

SET @EXECSQL = 'SELECT CONVERT(VARCHAR,VC.FECHAHORA,20) AS FECHAHORA,'''+@FECHA+''' AS FECHA,'+@IDUSUARIO+' AS IDUSUARIO, VC.* from '+@BD+'.dbo.ventas V , '+@BD+'.dbo.ventas_COBROS VC  '
SET @EXECSQL = @EXECSQL + 'where V.idusuario = '+@IDUSUARIO+' AND VC.IDVENTA = V.IDVENTA AND VC.ULTIMAMODIFICACION >= CONVERT(DATETIME,'''+@FECHA+''',20)'
EXEC(@EXECSQL)