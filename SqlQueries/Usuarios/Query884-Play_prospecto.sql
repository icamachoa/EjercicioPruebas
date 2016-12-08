//[session.db|Untyped,idprospecto|Integer,idetiqueta|Integer,tk|Text,session.idempresa|Untyped,tkp|Text,]
--UPDATE
DECLARE @ULTIMOENVIO DATETIME
DECLARE @IDPROSPECTO INT
DECLARE @IDETIQUETA INT
DECLARE @TK VARCHAR(128)
DECLARE @TKP VARCHAR(128)



SET @IDPROSPECTO = ISNULL (:IDPROSPECTO ,0)
SET @IDETIQUETA =  ISNULL (:IDETIQUETA,0)


SET @TK = ISNULL(:TK,'')
IF @TK != '' BEGIN SELECT @IDETIQUETA=IDETIQUETA FROM <#SESSION.DB/>.DBO.ETIQUETAS WHERE TK = @TK AND IDEMPRESA = <#SESSION.IDEMPRESA/> END

SET @TKP = ISNULL(:TKP,'')
IF @TKP != '' BEGIN SELECT @IDPROSPECTO=IDPROSPECTO FROM <#SESSION.DB/>.DBO.PROSPECTOS WHERE CAST(TKP AS VARCHAR(128))  = @TKP AND IDEMPRESA = <#SESSION.IDEMPRESA/> END

SELECT @ULTIMOENVIO = MAX(ULTIMO_ENVIO) FROM <#SESSION.DB/>.DBO.AUTORESPONDERS_CONTROL WHERE IDPROSPECTO = @IDPROSPECTO AND IDETIQUETA = @IDETIQUETA

UPDATE <#SESSION.DB/>.DBO.AUTORESPONDERS_CONTROL SET ULTIMO_ENVIO = GETDATE() WHERE IDPROSPECTO = @IDPROSPECTO  AND IDETIQUETA = @IDETIQUETA AND ULTIMO_ENVIO = @ULTIMOENVIO
UPDATE <#SESSION.DB/>.DBO.PROSPECTOS_ETIQUETAS SET PAUSADO = 0 WHERE IDPROSPECTO = @IDPROSPECTO AND IDETIQUETA = @IDETIQUETA