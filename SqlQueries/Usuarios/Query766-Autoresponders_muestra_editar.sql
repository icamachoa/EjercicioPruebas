//[session.db|Untyped,session.idempresa|Untyped,idautoresponder|Integer,tkauto|Text,]
--SELECT

DECLARE @IDAUTORESPONDER INT
DECLARE @TKAUTO VARCHAR(128)

SET @IDAUTORESPONDER = ISNULL(:IDAUTORESPONDER, 0)

SET @TKAUTO = ISNULL(:TKAUTO,'')
IF @TKAUTO != '' BEGIN SELECT @IDAUTORESPONDER=IDAUTORESPONDER FROM <#SESSION.DB/>.DBO.AUTORESPONDERS WHERE CAST(TKAUTO AS VARCHAR(128))  = @TKAUTO AND IDEMPRESA = <#SESSION.IDEMPRESA/> END


SELECT AR.*, ETI.ETIQUETA
FROM <#SESSION.DB/>.DBO.AUTORESPONDERS AR
JOIN <#SESSION.DB/>.DBO.ETIQUETAS ETI ON AR.IDETIQUETA  = ETI.IDETIQUETA
WHERE AR.IDEMPRESA = <#SESSION.IDEMPRESA/> AND IDAUTORESPONDER = @IDAUTORESPONDER