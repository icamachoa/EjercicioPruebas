//[tkco|Text,tkca|Text,session.db|Untyped,session.idempresa|Untyped,]
--select
DECLARE @TKCO VARCHAR(64)
SET @TKCO= dbo.ValidaToken(isnull(:TKCO,''))
DECLARE @TKCA VARCHAR(64)
SET @TKCA= dbo.ValidaToken(isnull(:TKCA,''))

SELECT O.*  FROM <#SESSION.DB/>.dbo.CATALOGOS C JOIN
<#SESSION.DB/>.dbo.CATALOGOS_OPCIONES O ON C.IDCATALOGO = O.IDCATALOGO
WHERE IDEMPRESA = <#SESSION.IDEMPRESA/> AND  C.TKCA = @TKCA AND TKCO != @TKCO
