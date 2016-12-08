//[idp|Integer,ido|Integer,session.idempresa|Untyped,session.db|Untyped,tkp|Text,tko|Text,]
--SELECT 
DECLARE @IDPROSPECTO INT, @IDOPORTUNIDAD INT, @IDEMPRESA INT
DECLARE @CarpetaEmpresa VARCHAR(12)


SET @IDPROSPECTO = ISNULL(:IDP,0) 
SET @IDOPORTUNIDAD = ISNULL(:IDO,0)
SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)
SET @CarpetaEmpresa = <#SESSION.DB/>.dbo.PreparaNumero(@IDEMPRESA,6)

DECLARE @TKP VARCHAR(MAX), @TKO VARCHAR(MAX)

SET @TKP = ISNULL(:TKP,'')
SET @TKO = ISNULL(:TKO,'')

IF @TKP != '' BEGIN SET @IDPROSPECTO = <#SESSION.DB/>.dbo.obtieneIdProspecto(@TKP, @IDEMPRESA) END
IF @TKO != '' BEGIN SET @IDOPORTUNIDAD = <#SESSION.DB/>.dbo.obtieneIdOportunidad(@TKO) END


SELECT
CASE WHEN ISNULL(Descripcion,'')='' THEN SALESUP_CT.dbo.NombreRealArchivo(ARCHIVO) ELSE Descripcion END AS Descripcion, 
IDPROSPECTOARCHIVO AS IdDocumento,
ARCHIVO as Archivo, 
@IDEMPRESA AS IdEmpresa,
@CarpetaEmpresa AS CarpetaEmpresa,
'1' AS Documentos,

CASE <#SESSION.DB/>.dbo.obtiene_extension(ARCHIVO)
WHEN 'png' THEN '1' WHEN 'jpg' THEN '1'
WHEN 'jpeg' THEN '1' WHEN 'bmp' THEN '1'
WHEN 'pdf' THEN '1' WHEN 'txt' THEN '1'
ELSE '' END Preview,

CASE <#SESSION.DB/>.dbo.obtiene_extension(ARCHIVO)
WHEN 'png' THEN '1' WHEN 'jpg' THEN '1'
WHEN 'jpeg' THEN '1' WHEN 'bmp' THEN '1'
ELSE '' END EsImagen,

CASE <#SESSION.DB/>.dbo.obtiene_extension(ARCHIVO)
WHEN 'pdf' THEN '1' ELSE '' END EsPdf,

CASE <#SESSION.DB/>.dbo.obtiene_extension(ARCHIVO)
WHEN 'txt' THEN '1' ELSE '' END EsTxt,

CASE <#SESSION.DB/>.dbo.obtiene_extension(ARCHIVO)
WHEN 'zip' THEN '1' WHEN 'rar' THEN '1'
ELSE '' END EsZip,

CASE <#SESSION.DB/>.dbo.obtiene_extension(ARCHIVO)
WHEN 'docx' THEN '1' WHEN 'doc' THEN '1'
ELSE '' END EsDoc,

CASE <#SESSION.DB/>.dbo.obtiene_extension(ARCHIVO)
WHEN 'xlsx' THEN '1' WHEN 'xls' THEN '1'
ELSE '' END EsXls,

CASE <#SESSION.DB/>.dbo.obtiene_extension(ARCHIVO)
WHEN 'pptx' THEN '1' WHEN 'ppt' THEN '1'
ELSE '' END EsPpt

FROM <#SESSION.DB/>.dbo.PROSPECTOS_ARCHIVOS 
WHERE IDPROSPECTO = @IDPROSPECTO AND IDOPORTUNIDAD IS NULL


UNION

SELECT
CASE WHEN ISNULL(Descripcion,'')='' THEN SALESUP_CT.dbo.NombreRealArchivo(ARCHIVO) ELSE Descripcion END AS Descripcion,
IDPROSPECTOARCHIVO AS IdDocumento,
ARCHIVO as Archivo, 
@IDEMPRESA AS IdEmpresa,
@CarpetaEmpresa AS CarpetaEmpresa,
'1' AS Documentos,

CASE <#SESSION.DB/>.dbo.obtiene_extension(ARCHIVO)
WHEN 'png' THEN '1' WHEN 'jpg' THEN '1'
WHEN 'jpeg' THEN '1' WHEN 'bmp' THEN '1'
WHEN 'pdf' THEN '1' WHEN 'txt' THEN '1'
ELSE '' END Preview,

CASE <#SESSION.DB/>.dbo.obtiene_extension(ARCHIVO)
WHEN 'png' THEN '1' WHEN 'jpg' THEN '1'
WHEN 'jpeg' THEN '1' WHEN 'bmp' THEN '1'
ELSE '' END EsImagen,

CASE <#SESSION.DB/>.dbo.obtiene_extension(ARCHIVO)
WHEN 'pdf' THEN '1' ELSE '' END EsPdf,

CASE <#SESSION.DB/>.dbo.obtiene_extension(ARCHIVO)
WHEN 'txt' THEN '1' ELSE '' END EsTxt,

CASE <#SESSION.DB/>.dbo.obtiene_extension(ARCHIVO)
WHEN 'zip' THEN '1' WHEN 'rar' THEN '1'
ELSE '' END EsZip,

CASE <#SESSION.DB/>.dbo.obtiene_extension(ARCHIVO)
WHEN 'docx' THEN '1' WHEN 'doc' THEN '1'
ELSE '' END EsDoc,

CASE <#SESSION.DB/>.dbo.obtiene_extension(ARCHIVO)
WHEN 'xlsx' THEN '1' WHEN 'xls' THEN '1'
ELSE '' END EsXls,

CASE <#SESSION.DB/>.dbo.obtiene_extension(ARCHIVO)
WHEN 'pptx' THEN '1' WHEN 'ppt' THEN '1'
ELSE '' END EsPpt

FROM <#SESSION.DB/>.dbo.PROSPECTOS_ARCHIVOS 
WHERE IDPROSPECTO = @IDPROSPECTO AND IDOPORTUNIDAD = @IDOPORTUNIDAD
ORDER BY 1
