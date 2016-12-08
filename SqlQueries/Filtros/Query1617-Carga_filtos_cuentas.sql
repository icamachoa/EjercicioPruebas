//[session.idusuario|Untyped,idpantalla|Integer,session.db|Untyped,]
-- select 

DECLARE @IDUSUARIO INT
DECLARE @IDPANTALLA INT

SET @IDUSUARIO = <#SESSION.IDUSUARIO/>
SET @IDPANTALLA = CAST(ISNULL(:IDPANTALLA,0) AS INT)

select texto as tipos,sqltxt as tks,sqltxt_exp as textos from <#SESSION.DB/>.DBO.usuarios_filtros where idpantalla = @IDPANTALLA and idusuario = @IDUSUARIO