//[bd|Text,idprospecto|Text,]
--SELECT

DECLARE @BD VARCHAR(512)
DECLARE @EXECSQL VARCHAR(8000)
DECLARE @IDPROSPECTO VARCHAR(1000)
SET @BD = ISNULL(:BD,'')
SET @IDPROSPECTO=CAST(ISNULL(:IDPROSPECTO,0) AS VARCHAR(1000))
SET @EXECSQL = 'DELETE FROM '+@BD+'.dbo.PROSPECTOS_ETIQUETAS WITH (ROWLOCK) WHERE IDPROSPECTO = '+@IDPROSPECTO
SET @EXECSQL = @EXECSQL + 'SELECT 1 AS RESPUESTA,''Etiquetas Borradas'' AS MENSAJE'
EXEC(@EXECSQL)