//[tkca|Text,session.db|Untyped,session.idempresa|Untyped,]
--select
DECLARE @TK VARCHAR(64)
SET @TK= dbo.ValidaToken(ISNULL(:TKCA,''))

SELECT O.*  FROM <#SESSION.DB/>.dbo.CATALOGOS C JOIN
<#SESSION.DB/>.dbo.CATALOGOS_OPCIONES O ON C.IDCATALOGO = O.IDCATALOGO
WHERE IDEMPRESA = <#SESSION.IDEMPRESA/> AND  C.TKCA = @TK
