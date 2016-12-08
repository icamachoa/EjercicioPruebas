//[session.idempresa|Untyped,tconsulta|Integer,session.db|Untyped,]
-- SELECT
DECLARE @IDEMPRESA INT, @TIPOCOSULTA INT, @TIPO INT
SET @IDEMPRESA = <#SESSION.IDEMPRESA/>
SET @TIPOCOSULTA = CAST(ISNULL(:tConsulta,0) AS INT)


IF @TIPOCOSULTA = 1
BEGIN
	SELECT IdOrigen as value, Origen as Opcion, TK as TKORIG, SALESUP_CT.dbo.esCanalizado(TK, TKM) AS esCanalizado
	FROM <#SESSION.DB/>.dbo.PROSPECTOS_ORIGENES 
	WHERE IDEMPRESA = @IDEMPRESA
	ORDER BY ORIGEN
END
ELSE
BEGIN
	SELECT 1 as R, IdOrigen, Origen, SALESUP_CT.dbo.esCanalizado(TK, TKM) AS esCanalizado
	FROM <#SESSION.DB/>.dbo.PROSPECTOS_ORIGENES 
	WHERE IDEMPRESA = @IDEMPRESA
	ORDER BY ORIGEN
END





