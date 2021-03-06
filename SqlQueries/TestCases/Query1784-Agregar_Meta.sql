//[idempresa|Numeric,idusuario|Numeric,convertcode|Numeric,configuracionmeta|Text,criterio|Text,meta|Text,db|Text,]
-- SELECT

DECLARE @IDEMPRESA INT,@IDUSUSARIO INT, @CONVERTCODE INT
DECLARE @JsonP1 VARCHAR(MAX),@JsonP2 VARCHAR(MAX),@JsonP3 VARCHAR(MAX)
DECLARE @FECHA DATETIME
DECLARE @SQL VARCHAR(MAX)
DECLARE @DB VARCHAR(1000)
SET @DB=ISNULL(:DB,'')
SET @FECHA = GETDATE()
SET @IDEMPRESA = :IDEMPRESA
SET @IDUSUSARIO = :IDUSUARIO
	
SET @CONVERTCODE = :CONVERTCODE
SET @JsonP1 = CAST( SalesUp_ct.dbo.Base64ToBinary(:CONFIGURACIONMETA) AS VARCHAR(MAX))
SET @JsonP2 = CAST( SalesUp_ct.dbo.Base64ToBinary(:CRITERIO) AS VARCHAR(MAX))
SET @JsonP3 = CAST( SalesUp_ct.dbo.Base64ToBinary(:META) AS VARCHAR(MAX))

SET @SQL = '     
EXEC '+@DB+'.DBO.SP_INSERTA_METAS_V2 '+CAST(@IDEMPRESA AS VARCHAR(1000))+','+CAST(@IDUSUSARIO AS VARCHAR(1000))+','+CAST(@CONVERTCODE AS VARCHAR(1000))+','''+@JsonP1+''','''+@JsonP2+''','''+@JsonP3+'''

SELECT TOP 1 IDMETA,  '+CAST(@IDEMPRESA AS VARCHAR(1000))+' AS IDEMPRESA,'+CAST(@IDUSUSARIO AS VARCHAR(1000))+' AS IDUSUARIO,'+CAST(@CONVERTCODE AS VARCHAR(1000))+' AS CONVERTCODE,'''+@JsonP1+''' AS JsonP1,'''+@JsonP2+'''  AS JsonP2,'''+@JsonP3+'''  AS JsonP3
 FROM '+@DB+'.DBO.USUARIOS_METAS WHERE IDUSUARIO_ASIGNO = '+CAST(@IDUSUSARIO AS VARCHAR(1000))+' ORDER BY 1 DESC
'

EXEC (@SQL)	