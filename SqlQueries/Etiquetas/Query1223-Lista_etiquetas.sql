//[session.idempresa|Untyped,session.db|Untyped,]
--SELECT
DECLARE @IDEMPRESA INT
SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)

SELECT IDETIQUETA AS IdEtiqueta, TK AS TKETIQ, REPLACE(Etiqueta, '"','&quot;') AS Etiqueta , IDETIQUETA AS value, REPLACE(Etiqueta, '"','&quot;') AS text, 1 AS Creado FROM <#SESSION.DB/>.DBO.ETIQUETAS 
WHERE IDEMPRESA = @IDEMPRESA