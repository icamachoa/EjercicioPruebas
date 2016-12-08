//[idmoneda|Integer,session.idempresa|Untyped,session.idusuario|Untyped,tipofase|Integer,tiporesult|Integer,session.db|Untyped,]
--SELECT
DECLARE @IDEMPRESA INT
DECLARE @IDUSUARIO INT
DECLARE @TIPOFASE INT
DECLARE @CRITERIO INT
DECLARE @IDMONEDA INT = ISNULL(:IDMONEDA,0)

SET @IDEMPRESA=CAST('<#SESSION.IDEMPRESA/>' AS INT)
SET @IDUSUARIO=CAST('<#SESSION.IDUSUARIO/>' AS INT)
SET @TIPOFASE=CAST(ISNULL(:TIPOFASE,0) AS INT)
SET @CRITERIO=CAST(ISNULL(:TIPORESULT,0) AS INT)

EXEC <#SESSION.DB/>.DBO.SP_REPORTE_FASES @IDUSUARIO,@IDEMPRESA,@TIPOFASE,@CRITERIO,@IDMONEDA

