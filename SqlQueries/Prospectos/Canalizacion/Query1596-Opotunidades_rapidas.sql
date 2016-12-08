//[session.idempresa|Untyped,session.db|Untyped,]
--SELECT
DECLARE @IDEMPRESA INT
SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)


SELECT IdOportunidadTemplate as ID, Concepto, Monto, Certeza 
FROM <#SESSION.DB/>.dbo.OPORTUNIDADES_TEMPLATES WHERE IDEMPRESA = @IDEMPRESA
