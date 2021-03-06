//[sms|Text,suceso|Integer,session.idempresa|Untyped,session.db|Untyped,idempresanotificacion|Integer,]
--update
DECLARE @IDSUCESO INT
DECLARE @IDEMPRESA INT

DECLARE @SMS VARCHAR(MAX)

SET  @SMS = :SMS
SET  @IDSUCESO = CAST(ISNULL(:SUCESO,0) AS INT)
SET  @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)

IF (SELECT COUNT(*) FROM <#SESSION.DB/>.dbo.EMPRESAS_NOTIFICACION_CONFIG WHERE  IDEMPRESA =  @IDEMPRESA AND IDSUCESO = @IDSUCESO) = 0
INSERT INTO <#SESSION.DB/>.dbo.EMPRESAS_NOTIFICACION_CONFIG (IDEMPRESA, IDNOTIFICACION,IDSUCESO, ASUNTO, CUERPO, SMS, NOTIFICA_EMAIL, NOTIFICA_SMS, NOTIFICA_ALERTA, NOTIFICA_PUSH, IDTIPODESTINATARIO)
SELECT @IDEMPRESA, IDNOTIFICACION,IDSUCESO, ASUNTO, CUERPO, SMS, NOTIFICA_EMAIL, NOTIFICA_SMS, NOTIFICA_ALERTA, NOTIFICA_PUSH,1 FROM 
SALESUP_CT.dbo.NOTIFICACIONES WHERE IDSUCESO = @IDSUCESO

UPDATE  <#SESSION.DB/>.dbo.EMPRESAS_NOTIFICACION_CONFIG SET SMS = @SMS 
WHERE IDEMPRESANOTIFICACION = ISNULL(:IDEMPRESANOTIFICACION,0) AND IDEMPRESA =  @IDEMPRESA

