//[tku|Text,session.db|Untyped,]
--SELECT
/*PROTEGIDO*/
/*SEP2015*/
DECLARE @TKU VARCHAR(64)
SET @TKU= dbo.ValidaToken(ISNULL(:TKU,''))

SELECT TOP 1 ISNULL(NOMBRE,'')+' '+ISNULL(APELLIDOS,'') AS NOMBREP, NIVEL,@tku as tku FROM <#SESSION.DB/>.dbo.USUARIOS WHERE TKU=@TKU