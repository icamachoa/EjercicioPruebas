//[tk|Text,session.db|Untyped,]
-- SELECT
DECLARE @TK VARCHAR(64)

SET @TK =:TK
SELECT *, @tk AS TK FROM <#SESSION.DB/>.dbo.EMPRESAS_REPORTES WHERE TK = @TK