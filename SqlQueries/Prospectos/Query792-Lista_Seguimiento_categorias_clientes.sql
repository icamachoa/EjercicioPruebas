//[session.db|Untyped,session.idempresa|Untyped,]
SELECT 
ISNULL(POR_DEFECTO, 0) POR_DEFECTO, SALESUP_CT.dbo.esCanalizado(TK, TKM) AS esCanalizado, * 
FROM <#SESSION.DB/>.DBO.SEGUIMIENTO_CATEGORIAS WHERE IDEMPRESA=<#SESSION.IDEMPRESA/> ORDER BY CATEGORIA ASC