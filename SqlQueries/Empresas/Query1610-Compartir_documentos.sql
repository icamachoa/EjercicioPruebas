//[doc|Integer,session.idempresa|Untyped,notificacion|Text,session.db|Untyped,]
--update
DECLARE @IDDOCUMENTO INT, @IDEMPRESA INT, @TIPO INT
DECLARE @NUEVOLINK VARCHAR(MAX), @LINKPRIVADO VARCHAR(MAX), @LINKPUBLICO VARCHAR(MAX), @NOMBREARCHIVO VARCHAR(MAX), @CARPETA VARCHAR(MAX)
DECLARE @NOTIFICACION VARCHAR(MAX)

SET @IDDOCUMENTO = ISNULL(:DOC,0)
SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)
SET @NUEVOLINK   = ''
SET @CARPETA = SALESUP_CT.dbo.PreparaNumero(@IDEMPRESA,6)
SET @NOTIFICACION= ISNULL(:notificacion,'')

SELECT @TIPO = TIPOARCHIVO, @NOMBREARCHIVO = NOMBRE_DOCUMENTO 
FROM <#SESSION.DB/>.dbo.EMPRESAS_DOCUMENTOS 
WHERE IDEMPRESA = @IDEMPRESA AND IDDOCUMENTO = @IDDOCUMENTO

SET @LINKPRIVADO = 'https://fenix.salesup.com.mx/aws/obtieneArchivo.php?idempresa='+@CARPETA+'&archivo='+@NOMBREARCHIVO
SET @LINKPUBLICO = 'https://s3-us-west-2.amazonaws.com/salesupfiles/'+@CARPETA+'/'+@NOMBREARCHIVO

IF @TIPO = 0 BEGIN SET @NUEVOLINK = @LINKPRIVADO END
IF @TIPO = 1 BEGIN SET @NUEVOLINK = @LINKPUBLICO END

UPDATE <#SESSION.DB/>.dbo.EMPRESAS_DOCUMENTOS 
SET URLFIJA = @NUEVOLINK, NOTIFICACION=@NOTIFICACION 
WHERE IDEMPRESA = @IDEMPRESA AND IDDOCUMENTO = @IDDOCUMENTO
