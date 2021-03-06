//[session.idempresa|Untyped,session.idusuario|Untyped,session.nivel|Untyped,session.idgrupo|Untyped,idca|Integer,ta|Integer,q|Text,session.db|Untyped,]
--SELECT
DECLARE @IDEMPRESA INT, @NIVEL INT, @IDCARPETA INT, @TIPOARCHIVO INT
DECLARE @CarpetaEmpresa VARCHAR(12), @Editar VARCHAR(3), @BUSCAREN VARCHAR(MAX) 
DECLARE @IDUSUARIO INT,@IDGRUPO INT
DECLARE @USR_TABLE TABLE (ID INT)
SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)
SET @IDUSUARIO = CAST('<#SESSION.IDUSUARIO/>' AS INT)
SET @NIVEL = CAST('<#SESSION.NIVEL/>' AS INT)
SET @IDGRUPO = CAST('<#SESSION.IDGRUPO/>' AS INT)
SET @IDCARPETA = isnull(:IDCA,0)
SET @TIPOARCHIVO = ISNULL(:TA,0)
SET @BUSCAREN = ISNULL(:Q,'')
SET @BUSCAREN = '%'+@BUSCAREN+'%'

SET @CarpetaEmpresa = <#SESSION.DB/>.dbo.PreparaNumero(@IDEMPRESA,6)
SET @Editar = ''
IF @NIVEL < 3 BEGIN SET @Editar = '1' END


INSERT INTO @USR_TABLE (ID)
SELECT ID FROM <#SESSION.DB/>.dbo.ObtieneUsuariosAutorizadosModulos (@IDUSUARIO,12,0)

SELECT 
D.IdDocumento, D.Descripcion, 
SALESUP_CT.dbo.esCanalizado(D.TK, D.TKM) AS esCompartido,
D.tk, D.tkm,
CASE SALESUP_CT.dbo.esCanalizado(D.TK, D.TKM) WHEN 0 THEN '1' ELSE '' END  AS Compartir,
CONVERT(VARCHAR(10),D.FECHA_MODIFICADO,103) AS FechaModificado,
D.VISIBILIDAD as Ver, 
D.NOMBRE_DOCUMENTO as Archivo, 
@IDEMPRESA AS IdEmpresa,
@CarpetaEmpresa AS CarpetaEmpresa,
D.IdGrupo, D.Amazon,
@Editar AS Editar2,
(CASE WHEN D.IDUSUARIO IN (SELECT ID FROM @USR_TABLE) THEN '1' ELSE '' END) AS Editar, 
D.TIPOARCHIVO AS TipoArchivo,
CASE D.TIPOARCHIVO WHEN 0 THEN '1' ELSE '' END AS Documentos,
CASE D.TIPOARCHIVO WHEN 1 THEN '1' ELSE '' END AS Imagenes,
CASE D.TIPOARCHIVO WHEN 2 THEN '1' ELSE '' END AS Plantillas,
D.URLFIJA AS UrlFija, 
CASE <#SESSION.DB/>.dbo.obtiene_extension(D.NOMBRE_DOCUMENTO)
WHEN 'png' THEN '1'
WHEN 'jpg' THEN '1'
WHEN 'jpeg' THEN '1'
WHEN 'bmp' THEN '1'
WHEN 'pdf' THEN '1'
WHEN 'txt' THEN '1'
ELSE '' END Preview,

CASE <#SESSION.DB/>.dbo.obtiene_extension(D.NOMBRE_DOCUMENTO)
WHEN 'png' THEN '1' WHEN 'jpg' THEN '1'
WHEN 'jpeg' THEN '1' WHEN 'bmp' THEN '1'
ELSE '' END EsImagen,

CASE <#SESSION.DB/>.dbo.obtiene_extension(D.NOMBRE_DOCUMENTO)
WHEN 'pdf' THEN '1' ELSE '' END EsPdf,

CASE <#SESSION.DB/>.dbo.obtiene_extension(D.NOMBRE_DOCUMENTO)
WHEN 'txt' THEN '1' ELSE '' END EsTxt,

CASE <#SESSION.DB/>.dbo.obtiene_extension(D.NOMBRE_DOCUMENTO)
WHEN 'zip' THEN '1' WHEN 'rar' THEN '1'
ELSE '' END EsZip,

CASE <#SESSION.DB/>.dbo.obtiene_extension(D.NOMBRE_DOCUMENTO)
WHEN 'docx' THEN '1' WHEN 'doc' THEN '1'
ELSE '' END EsDoc,

CASE <#SESSION.DB/>.dbo.obtiene_extension(D.NOMBRE_DOCUMENTO)
WHEN 'xlsx' THEN '1' WHEN 'xls' THEN '1'
ELSE '' END EsXls,

CASE <#SESSION.DB/>.dbo.obtiene_extension(D.NOMBRE_DOCUMENTO)
WHEN 'pptx' THEN '1' WHEN 'ppt' THEN '1'
ELSE '' END EsPpt,

LTRIM(RTRIM(U.INICIALES)) as Iniciales,
LTRIM(RTRIM(U.NOMBRE)) +' '+ ISNULL(LTRIM(RTRIM(U.APELLIDOS)),'') AS Usuario, 

CAST(D.FECHA_MODIFICADO AS FLOAT) AS dtf

FROM <#SESSION.DB/>.dbo.EMPRESAS_DOCUMENTOS D
JOIN <#SESSION.DB/>.dbo.USUARIOS U ON U.IDUSUARIO = D.IDUSUARIO
WHERE D.IDEMPRESA = @IDEMPRESA 
AND D.TIPOARCHIVO = @TIPOARCHIVO AND D.DESCRIPCION LIKE @BUSCAREN
AND (
  D.IDUSUARIO IN (SELECT ID FROM @USR_TABLE) OR D.VISIBILIDAD = 0 OR (D.VISIBILIDAD = 1 AND D.IDGRUPO = @IDGRUPO)
	)
ORDER BY D.Descripcion
