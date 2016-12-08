//[session.idempresa|Untyped,session.idusuario|Untyped,session.nivel|Untyped,session.idgrupo|Untyped,session.mailconfig|Untyped,session.db|Untyped,idpantalla|Integer,top_registros|Text,]
--SELECT
DECLARE @IDEMPRESA INT 
DECLARE @IDUSUARIO INT 
DECLARE @NIVELUSUARIO INT 
DECLARE @IDGRUPO INT 
DECLARE @MAILCONFIG INT 
DECLARE @CONTAR INT
DECLARE @DBNAME VARCHAR(MAX)
DECLARE @IDPANTALLA INT
DECLARE @CRIT VARCHAR(MAX)
DECLARE @F_USUARIO VARCHAR(MAX)
DECLARE @CRITARCHIVAR VARCHAR(MAX)
DECLARE @TOP VARCHAR(MAX)


SET @IDEMPRESA = <#SESSION.IDEMPRESA/>
SET @IDUSUARIO = <#SESSION.IDUSUARIO/>
SET @NIVELUSUARIO = <#SESSION.NIVEL/>
SET @IDGRUPO = <#SESSION.IDGRUPO/> 
SET @MAILCONFIG = <#SESSION.MAILCONFIG/>
SET @CONTAR = 1
SET @IDPANTALLA = ISNULL(:IDPANTALLA,'')
SET @TOP = ISNULL(:TOP_REGISTROS,'')

EXEC <#SESSION.DB/>.DBO.SP_LISTA_CLIENTES_EMPRESA @IDEMPRESA , @IDUSUARIO, @NIVELUSUARIO, @IDGRUPO, @MAILCONFIG, @CONTAR, @IDPANTALLA,@TOP