//[tkco|Text,descartado|Integer,f_usuario|Text,crit|Text,session.idempresa|Untyped,session.db|Untyped,]
--SELECT 
DECLARE @DESCARTADO TINYINT
DECLARE @FUSUARIO VARCHAR(MAX)
DECLARE @CRIT VARCHAR(MAX)
DECLARE @TkCo VARCHAR(MAX)
DECLARE @IDEMPRESA INT

SET @TkCo = dbo.ValidaToken(ISNULL(:TKCO,''))
SET @DESCARTADO=CAST (ISNULL(:DESCARTADO,0) AS INT)
SET @FUSUARIO = ISNULL(:F_USUARIO,'')
SET @CRIT = ISNULL(:CRIT,'')
SET @IDEMPRESA = <#SESSION.IDEMPRESA/>

EXEC <#SESSION.DB/>.DBO.SP_SELECT_OPORTUNIDADES_OPCIONES @FUSUARIO,@CRIT,1,@TkCo,@DESCARTADO,@IDEMPRESA,'','',''