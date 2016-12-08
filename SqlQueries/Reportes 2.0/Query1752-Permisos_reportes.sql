//[session.idusuario|Untyped,session.db|Untyped,]
-- SELECT

DECLARE @IDUSUARIO INT

SET @IDUSUARIO = <#SESSION.IDUSUARIO/>

SELECT <#SESSION.DB/>.DBO.ObtieneUsuariosAutorizadosCanalizacion (@IDUSUARIO) AS PERMITIDOS