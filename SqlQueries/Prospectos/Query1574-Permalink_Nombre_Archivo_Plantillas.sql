//[archivo|Text,session.db|Untyped,]
--SELECT
DECLARE @ARCHIVO VARCHAR(MAX)
SET @ARCHIVO=:ARCHIVO

SELECT <#SESSION.DB/>.DBO.NombreArchivoCotizacion (@ARCHIVO,'pdf') as NombreSugerido
