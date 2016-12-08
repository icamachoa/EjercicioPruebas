//[bd|Text,idusuario|Integer,fecha|Text,]
--SELECT

DECLARE @BD VARCHAR(512)
DECLARE @EXECSQL VARCHAR(8000)
DECLARE @FECHA VARCHAR(1000)
DECLARE @IDUSUARIO VARCHAR(1000)

SET @BD = ISNULL(:BD,'')
SET @FECHA = ISNULL(:FECHA,'')
SET @IDUSUARIO = CAST(ISNULL(:IDUSUARIO,0) AS VARCHAR(1000))

SET @EXECSQL = 'select CONVERT(VARCHAR,V.FECHAHORA,20) AS FECHAHORA,'+@IDUSUARIO+' AS IDUSUARIO,'''+@FECHA+''' AS FECHA, SALESUP_CT.DBO.PreparaCadenaApp2(V.REFERENCIA) AS REFERENCIA,V.* from '+@BD+'.dbo.ventas V WITH (NOLOCK) '
SET @EXECSQL = @EXECSQL + 'where V.idusuario ='+@IDUSUARIO+' AND V.ULTIMAMODIFICACION >= CONVERT(DATETIME,'''+@FECHA+''',20)'
EXEC(@EXECSQL) 