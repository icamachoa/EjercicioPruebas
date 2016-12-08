//[session.idempresa|Untyped,session.db|Untyped,]
--SELECT

DECLARE @IDEMPRESA INT
SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)

SELECT IdCatalogo, Catalogo, Descripcion,
CASE VerProspectos WHEN 1 THEN '1' ELSE '' END AS VerProspectos, 
CASE VerVentas WHEN 1 THEN '1' ELSE '' END AS VerVentas, 
CASE VerEmpresa WHEN 1 THEN '1' ELSE '' END AS VerEmpresa, 
CASE Agrupar WHEN 1 THEN '1' ELSE '' END AS Agrupar, 
CASE EnMenu WHEN 1 THEN '1' ELSE '' END AS EnMenu,
CASE WHEN (Opciones > 0) THEN '1' ELSE '' END AS Opciones,  
 Tipo, Indice, Tkca
FROM <#SESSION.DB/>.dbo.CATALOGOS WHERE STATUS = 1 AND IDEMPRESA = @IDEMPRESA