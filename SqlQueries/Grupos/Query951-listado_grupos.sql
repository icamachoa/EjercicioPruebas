//[idpantalla|Integer,session.nivel|Untyped,session.idgrupo|Untyped,filtroagrupardetalle|Integer,session.db|Untyped,session.idusuario|Untyped,]
--SELECT
DECLARE @IDPANTALLA INT
SET @IDPANTALLA=CAST( ISNULL(:idpantalla,0) AS INT)
DECLARE @IDNIVEL INT
DECLARE @IDGRUPO INT
DECLARE @FILTROAGRUPARDETALLE INT 

SET @IDNIVEL= CAST('<#SESSION.NIVEL/>' AS INT)
SET @IDGRUPO= CAST('<#SESSION.IDGRUPO/>' AS INT)
SET @FILTROAGRUPARDETALLE= ISNULL(:FILTROAGRUPARDETALLE, 0)

SELECT U.* ,  @FILTROAGRUPARDETALLE AS FILTROAGRUPARDETALLE, @IDPANTALLA AS IDPANTALLA, CAST(U.TK AS VARCHAR(MAX)) AS TKGRUPO
	   FROM <#SESSION.DB/>.DBO.USUARIOS_GRUPOS U,<#SESSION.DB/>.DBO.ObtieneUsuariosAutorizadosModulos (<#SESSION.IDUSUARIO/>,@IDPANTALLA,1) M
WHERE U.IDUSUARIOGRUPO=M.ID

