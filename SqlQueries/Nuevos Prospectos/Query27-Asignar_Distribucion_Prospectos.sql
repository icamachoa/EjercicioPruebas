//[session.db|Untyped,usuarios_dist|Integer,tipo_dis|Integer,session.idempresa|Untyped,usuarios_lista|Text,tk|Text,]
--update 





UPDATE <#SESSION.DB/>.DBO.EMPRESAS SET IDUSUARIO_DISTRIBUCION=ISNULL(:usuarios_dist,0), DISTRIBUCION=ISNULL(:tipo_dis,0) WHERE IDEMPRESA=<#SESSION.IDEMPRESA/>

DECLARE @USUARIOS_LISTA VARCHAR(MAX)

SET @USUARIOS_LISTA = ISNULL(:usuarios_lista,'')

IF (@USUARIOS_LISTA!='')
  EXEC <#SESSION.DB/>.DBO.SP_GUARDA_USUARIOS_CANALIZACION <#SESSION.IDEMPRESA/>,@USUARIOS_LISTA,0
  
  