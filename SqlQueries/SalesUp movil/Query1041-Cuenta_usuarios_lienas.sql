//[bd|Text,idusuario|Integer,]
--SELECT
/*PROTEGIDO*/
/*SEP2015*/

DECLARE @BD VARCHAR(512)
DECLARE @EXECSQL VARCHAR(8000)
DECLARE @IDUSUARIO VARCHAR(1000)
SET @BD = ISNULL(:BD,'')
SET @IDUSUARIO=CAST(ISNULL(:IDUSUARIO,0) AS VARCHAR(1000))
SET @EXECSQL = 'SELECT count(*) as TOTAL, '+@IDUSUARIO+'  as IDUSUARIO, '''+@BD+''' as BD FROM '+@BD+'.dbo.USUARIOS_LINEAS_COMISION WITH (NOLOCK) WHERE IDUSUARIO = '+@IDUSUARIO
EXEC(@EXECSQL)