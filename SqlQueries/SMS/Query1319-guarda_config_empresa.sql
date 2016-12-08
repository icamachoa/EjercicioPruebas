//[session.db|Untyped,dispersionsms|Integer,session.idempresa|Untyped,]
--UPDATE
/*PROTEGIDO*/
/*SEP2015*/
DECLARE @dispersionSMS INT
SET @dispersionSMS = ISNULL(:dispersionSMS,0)
UPDATE <#SESSION.DB/>.DBO.EMPRESAS SET SMS_DISPOSICION = @dispersionSMS  WHERE IDEMPRESA = <#SESSION.IDEMPRESA/>