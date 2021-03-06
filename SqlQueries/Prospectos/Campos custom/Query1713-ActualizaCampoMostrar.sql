//[session.idempresa|Untyped,idcampocon|Integer,mostrar|Integer,session.db|Untyped,]
--UPDATE

DECLARE @IDEMPRESA INT, @IDCAMPOCON INT, @MOSTRAR INT

SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)
SET @IDCAMPOCON = CAST(ISNULL(:IDCAMPOCON,0) AS INT)
SET @MOSTRAR = CAST(ISNULL(:MOSTRAR,0) AS INT)

UPDATE <#SESSION.DB/>.DBO.EMPRESAS_CAMPOS_CONFIGURACION
SET MOSTRAR = @MOSTRAR
WHERE IDEMPRESA = @IDEMPRESA
AND IDCAMPOCON = @IDCAMPOCON
