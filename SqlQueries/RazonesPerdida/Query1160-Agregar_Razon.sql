//[tipo|Integer,session.db|Untyped,session.idempresa|Untyped,razon|Text,]
--INSERT
DECLARE @RAZONPERDIDA VARCHAR(1000)
DECLARE @TIPO INT

SET @RAZONPERDIDA = CAST(ISNULL(:RAZON,'') AS VARCHAR(1000))
SET @TIPO = CAST(ISNULL(:TIPO,0) AS INT)

INSERT INTO <#SESSION.DB/>.DBO.EMPRESAS_RAZONES_PERDIDA (IDEMPRESA,RAZONPERDIDA,TIPO) VALUES (<#SESSION.IDEMPRESA>,@RAZONPERDIDA,@TIPO)