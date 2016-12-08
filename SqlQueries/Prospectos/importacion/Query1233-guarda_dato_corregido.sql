//[session.db|Untyped,colnueva|Text,valor|Text,session.idusuario|Untyped,idprospectoimporta|Integer,]
--update
/*PROTEGIDO*/
/*SEP2015*/
DECLARE @SQL VARCHAR(MAX)
DECLARE @idprospectoimporta INT
DECLARE @colNueva VARCHAR(1000)
DECLARE @VALOR VARCHAR(1000)
SET @colNueva=ISNULL(:colNueva,'')
SET @VALOR=ISNULL(:VALOR,'')
SET @idprospectoimporta = ISNULL(:idprospectoimporta,0)

SET @SQL='UPDATE <#SESSION.DB/>.DBO.PROSPECTOS_IMPORTACION SET '+@colNueva+' = '''+@VALOR+''' WHERE IDUSUARIO = <#SESSION.IDUSUARIO/> AND IDPROSPECTOIMPORTA ='+ CAST(@idprospectoimporta AS VARCHAR(1000))
EXEC (@SQL)