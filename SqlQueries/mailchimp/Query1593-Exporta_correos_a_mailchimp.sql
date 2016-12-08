//[session.idusuario|Untyped,session.idempresa|Untyped,idventana|Integer,tks|Text,campos|Text,session.db|Untyped,]
--select
declare @IDEMPRESA int, @IDUSUARIO int, @IDPANTALLA int
declare @TOKENS varchar(max), @CABECERAS varchar(max)

set @IDUSUARIO  = cast('<#SESSION.IDUSUARIO/>' as int)
set @IDEMPRESA  = cast('<#SESSION.IDEMPRESA/>' as int)
set @IDPANTALLA = cast(ISNULL(:IDVENTANA,0) as int)
SET @TOKENS = ISNULL(:TKS,'')
SET @CABECERAS = ISNULL(:CAMPOS,'')

EXEC <#SESSION.DB/>.dbo.SP_LISTA_CORREOS_MAILCHIMP_MODIFICADO @IDEMPRESA, @IDUSUARIO, @IDPANTALLA, @TOKENS, @CABECERAS


