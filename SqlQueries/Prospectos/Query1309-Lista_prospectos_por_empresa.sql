//[tkcom|Text,session.idempresa|Untyped,session.db|Untyped,]
--select
DECLARE @IDCOMPANIA INT, @IDEMPRESA INT
DECLARE @TkCom VARCHAR(64)

SET @TkCom = dbo.ValidaToken(ISNULL(:TKCOM,'')) 
SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)

SELECT @IDCOMPANIA = C.IDCOMPANIA FROM <#SESSION.DB/>.dbo.COMPANIAS C WHERE C.TKCOM = @TkCom AND C.IDEMPRESA = @IDEMPRESA

SELECT P.NOMBRE + ' ' + ISNULL(P.APELLIDOS, '') as Prospecto, P.IdProspecto, P.Tkp
FROM <#SESSION.DB/>.DBO.PROSPECTOS P WITH(NOLOCK) 
WHERE P.IDEMPRESA = @IDEMPRESA AND P.IDCOMPANIA = @IDCOMPANIA 
ORDER BY P.NOMBRE