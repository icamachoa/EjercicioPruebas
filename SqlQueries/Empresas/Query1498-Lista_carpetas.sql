//[session.idempresa|Untyped,session.nivel|Untyped,idca|Integer,ta|Integer,session.db|Untyped,]
--select

DECLARE @IDEMPRESA INT, @NIVEL INT, @IDPADRE INT, @TIPOCARPETA INT
DECLARE @Editar VARCHAR(3)

SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)
SET @NIVEL = CAST('<#SESSION.NIVEL/>' AS INT)
SET @IDPADRE = ISNULL(:IDCA,0)
SET @TIPOCARPETA = ISNULL(:TA,0)

SET @Editar = ''
IF @NIVEL < 3 BEGIN SET @Editar = '1' END

SELECT IdCarpeta, 
SALESUP_CT.dbo.esCanalizado(TK, TKM) AS esCompartido,tk, tkm,
CASE SALESUP_CT.dbo.esCanalizado(TK, TKM) WHEN 0 THEN '1' ELSE '' END  AS Compartir,
Carpeta AS Descripcion, 
CASE 
WHEN Archivos = 0 THEN 'Vacío' 
WHEN Archivos = 1 THEN '1 archivo' 
ELSE CAST(Archivos AS VARCHAR(MAX)) + ' archivos' END Archivos, 
IdPadre, 
TIPOCARPETA AS TipoCarpeta,
CASE TIPOCARPETA WHEN 0 THEN '1' ELSE '' END AS CarpetaDocumentos,
CASE TIPOCARPETA WHEN 1 THEN '1' ELSE '' END AS CarpetaImagenes,
CASE TIPOCARPETA WHEN 2 THEN '1' ELSE '' END AS CarpetaPlantillas,

@Editar AS Editar, @IDPADRE AS IDCA, @TIPOCARPETA AS TA
FROM <#SESSION.DB/>.dbo.EMPRESAS_CARPETAS 
WHERE IDEMPRESA = @IDEMPRESA AND IDPADRE = @IDPADRE AND TIPOCARPETA = @TIPOCARPETA
ORDER BY CARPETA