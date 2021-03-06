//[bd|Text,idusuario|Text,fecha|Text,]
-- select

DECLARE @BD VARCHAR(512)
DECLARE @EXECSQL VARCHAR(8000)
DECLARE @IDUSUARIO VARCHAR(1000)
DECLARE @FECHA VARCHAR(1000)
SET @BD = ISNULL(:BD,'')
SET @IDUSUARIO=CAST(:IDUSUARIO AS VARCHAR(1000))
SET @FECHA=ISNULL(:FECHA,'')

SET @EXECSQL = 'IF((SELECT COUNT(*) FROM '+@BD+'.dbo.USUARIOS_CUENTAS_CORREOS WHERE IDUSUARIO = '+@IDUSUARIO+' AND ULTIMAMODIFICACION >= CONVERT(DATETIME,'''+@FECHA+''',20) AND (TIPO_CUENTA = 1 OR TIPO_CUENTA = 3) AND PREDETERMINADO = 1) > 0 )
			BEGIN 
			 	SELECT TOP 1 IDUSUARIOCORREO AS IDMAILCONFIG,IDUSUARIO, SALESUP_CT.DBO.PreparaCadenaApp2(EMAIL) AS EMAIL,ESTADO, '''+@FECHA+''' AS FECHA from '+@BD+'.dbo.USUARIOS_CUENTAS_CORREOS where IDUSUARIO = '+@IDUSUARIO+' AND (TIPO_CUENTA = 1 OR TIPO_CUENTA = 3) AND PREDETERMINADO = 1
			END 
			ELSE
			BEGIN
				SELECT IDMAILCONFIG,IDUSUARIO, SALESUP_CT.DBO.PreparaCadenaApp2(EMAIL) AS EMAIL,ESTADO,'+@IDUSUARIO+' AS IDUSUARIO, '''+@FECHA+''' AS FECHA FROM '+@BD+'.dbo.USUARIOS_MAILCONFIG WHERE IDUSUARIO = '+@IDUSUARIO+' AND ULTIMAMODIFICACION >= CONVERT(DATETIME,'''+@FECHA+''',20)
			END '
EXEC(@EXECSQL)