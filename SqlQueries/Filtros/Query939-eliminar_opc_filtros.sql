//[session.db|Untyped,session.idusuario|Untyped,idpantalla|Integer,]
--DELETE
/*PROTEGIDO*/
DECLARE @IDPANTALLA INT
SET @IDPANTALLA=ISNULL(:IDPANTALLA,0)
DELETE FROM <#SESSION.DB/>.DBO.USUARIOS_FILTROS WHERE IDUSUARIO = <#SESSION.IDUSUARIO/> AND IDPANTALLA=@IDPANTALLA and tipo between 1 and 7