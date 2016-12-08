//[tkca|Text,session.db|Untyped,]
-- SELECT
/*PROTEGIDO*/
/*SEP2015*/
DECLARE @TK VARCHAR(64)
SET @TK= dbo.ValidaToken(isnull(:TKCA,''))

SELECT * FROM <#SESSION.DB/>.DBO.CATALOGOS WHERE TKCA = @TK