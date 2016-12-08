//[tit|Text,laidfase|Integer,session.db|Untyped,session.idempresa|Untyped,]
DECLARE @TIPO INT
DECLARE @TIT INT
DECLARE @laidfase INT
SET @TIT = ISNULL(:TIT,0)
SET @laidfase = ISNULL(:laidfase,0)
SET @TIPO = 1

IF @TIT != 1
  SET @TIPo = 0

  SELECT *, SALESUP_CT.dbo.esCanalizado(TK, TKM) AS esCanalizado, @laidfase AS laidfase FROM <#SESSION.DB/>.DBO.PROSPECTOS_FASES WHERE IDEMPRESA=<#SESSION.IDEMPRESA/> AND  FASECLIENTE=@TIPo   ORDER BY ORDEN
