//[idpieza|Integer,archivo|Text,amazon|Integer,session.db|Untyped,archivoreal|Text,session.idempresa|Untyped,]
--INSERT
DECLARE @ANEXOS VARCHAR(8000)
DECLARE @ANEXOSNUEVO VARCHAR(8000)
DECLARE @ARCHIVONUEVO VARCHAR(8000)
DECLARE @NOMBRE_REALNUEVO VARCHAR(8000)
DECLARE @ARCHIVO VARCHAR(8000)
DECLARE @NOMBRE_REAL VARCHAR(8000)
DECLARE @IDPIEZA INT
DECLARE @RUTA VARCHAR(8000)
DECLARE @AMAZON INT
DECLARE @HAYARCHIVO INT
DECLARE @ARCHIVOBUSCAR VARCHAR(8000)
DECLARE @ARCHIVOREAL VARCHAR(8000)
SET @IDPIEZA = ISNULL(:IDPIEZA,0)
SET @ARCHIVOBUSCAR = ISNULL(:ARCHIVO,'')
SET @RUTA = '/'+@ARCHIVOBUSCAR
SET @AMAZON=ISNULL(:AMAZON,0)
SET @ARCHIVOREAL=ISNULL(:ARCHIVOREAL,'')

SELECT @ANEXOS=ANEXOS , @ARCHIVO=NOMBRE_ARCHIVO , @NOMBRE_REAL = NOMBRE_ARCHIVO_REAL FROM <#SESSION.DB/>.DBO.AUTORESPONDERS_PIEZAS WHERE IDPIEZA = @IDPIEZA

SET @ANEXOSNUEVO = ''
SET @ARCHIVONUEVO = ''
SET @NOMBRE_REALNUEVO = ''
SET @ANEXOS = REPLACE (@ANEXOS, @RUTA ,@ANEXOSNUEVO)
SET @ARCHIVO = REPLACE (@ARCHIVO, ltrim(rtrim(@ARCHIVOBUSCAR+',')),@ARCHIVONUEVO)
SET @NOMBRE_REAL = REPLACE (@NOMBRE_REAL, ltrim(rtrim(@ARCHIVOREAL+',')),@NOMBRE_REALNUEVO)

SELECT @HAYARCHIVO=COUNT(*) FROM <#SESSION.DB/>.DBO.EMPRESAS_ARCHIVOS_AMAZON WHERE IDEMPRESA=<#SESSION.IDEMPRESA/> AND ARCHIVO LIKE @ARCHIVOBUSCAR
  IF (@HAYARCHIVO>0)
   BEGIN
     DELETE FROM <#SESSION.DB/>.DBO.EMPRESAS_ARCHIVOS_AMAZON WHERE ARCHIVO LIKE @ARCHIVOBUSCAR AND IDEMPRESA=<#SESSION.IDEMPRESA/> AND TIPO='AU'
   END  

UPDATE 
<#SESSION.DB/>.DBO.AUTORESPONDERS_PIEZAS 
SET 
ANEXOS = @ANEXOS, 
NOMBRE_ARCHIVO = @ARCHIVO, 
NOMBRE_ARCHIVO_REAL = @NOMBRE_REAL 
WHERE 
IDPIEZA = @IDPIEZA