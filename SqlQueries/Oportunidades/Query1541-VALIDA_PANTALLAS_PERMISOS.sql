//[session.idusuario|Untyped,idpantalla|Integer,idbuscarpermisos|Text,session.db|Untyped,]
--SELECT
DECLARE @IDUSUARIO INT
DECLARE @IDPANTALLA INT
DECLARE @ID INT
SET @IDUSUARIO=CAST('<#SESSION.IDUSUARIO/>' AS INT)
SET @IDPANTALLA=CAST(ISNULL(:IDPANTALLA,0) AS INT)
SET @ID=0
IF (ISNUMERIC(ISNULL(:IDBUSCARPERMISOS,0))=1)
     SET @ID=CAST(ISNULL(:IDBUSCARPERMISOS,0) AS INT)

SELECT  <#SESSION.DB/>.DBO.ObtieneUsuarioAccesoModulo (@IDUSUARIO, @IDPANTALLA, @ID) AS VALIDAACCESO, @IDPANTALLA AS IDPANTALLA, @ID AS IDBUSCARPERMISOS