//[bd|Text,idempresa|Integer,fecha|Text,]
-- select
DECLARE @SQL VARCHAR(MAX)
DECLARE @BD VARCHAR(512)
DECLARE @EXECSQL VARCHAR(8000)
DECLARE @IDEMPRESA VARCHAR(1000)
DECLARE @FECHA VARCHAR(1000)
SET @BD = ISNULL(:BD,'')
SET @IDEMPRESA=CAST(ISNULL(:IDEMPRESA,0) AS VARCHAR(1000))
SET @FECHA=ISNULL(:FECHA,'')

SET @SQL='
SELECT IDCAMPO,IDEMPRESA,INDICE,SALESUP_CT.DBO.PreparaCadenaApp2(NOMBRE_CAMPO) AS NOMBRE_CAMPO,SALESUP_CT.DBO.PreparaCadenaApp2(DESCRIPCION) AS DESCRIPCION,LLAVE,LARGO, TIPO,COMPARTIR,CONSECUTIVO,1 AS AUTOMATICO, TK, TKM,ORDEN,IDTAB,TIPO_CAMPO,TAMANIO,SALESUP_CT.dbo.BinaryToBase64(CAST(CONFIGURACION_CAMPO AS VARBINARY(MAX))) AS CONFIGURACION_CAMPO,TAMBIENEN_IDTAB,PLACEHOLDER 
from '+@BD+'.dbo.EMPRESAS_CAMPOS WITH(NOLOCK) where idempresa = '+@IDEMPRESA+' AND ULTIMAMODIFICACION >= CONVERT(DATETIME,'''+@FECHA+''',20) 
' 
EXEC (@SQL)