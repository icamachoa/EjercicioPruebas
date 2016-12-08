//[idpantalla|Integer,session.db|Untyped,session.idempresa|Untyped,session.idusuario|Untyped,session.nivel|Untyped,session.idgrupo|Untyped,session.mailconfig|Untyped,checkempresa|Integer,total|Integer]
--update

DECLARE @IDPANTALLA INT 
DECLARE @IDEMPRESA INT 
DECLARE @IDUSUARIO INT
DECLARE @NIVELUSUARIO INT
DECLARE @IDGRUPO INT
DECLARE @MAILCONFIG INT
DECLARE @CHECKEMPRESA INT 
DECLARE @ELIMINARDATOS INT
DECLARE @TOTAL INT

SET @TOTAL = ISNULL(:total,'')
SET @ELIMINARDATOS = 1
SET @IDPANTALLA = ISNULL(:IDPANTALLA,1)
SET @CHECKEMPRESA = ISNULL(:checkempresa,0)
SET @IDEMPRESA = <#SESSION.IDEMPRESA/>
SET @IDUSUARIO = <#SESSION.IDUSUARIO/>
SET @NIVELUSUARIO = <#SESSION.NIVEL/>
SET @IDGRUPO = <#SESSION.IDGRUPO/>
SET @MAILCONFIG = <#SESSION.MAILCONFIG/>

EXEC <#SESSION.DB/>.DBO.SP_DESCARTADOSPARAELIMINACION '' ,@IDPANTALLA,@IDEMPRESA,@IDUSUARIO,@NIVELUSUARIO,@MAILCONFIG,@CHECKEMPRESA,@ELIMINARDATOS,@TOTAL
