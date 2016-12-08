//[session.db|Untyped,session.idusuario|Untyped,session.idempresa|Untyped,idplantilla|Integer,]
--SELECT
SELECT <#SESSION.DB/>.dbo.ObtieneCuerpoAutoresponder(CUERPO,0,<#SESSION.IDUSUARIO/>,<#SESSION.IDEMPRESA/>,0) AS CUERPO, ASUNTO
FROM <#SESSION.DB/>.DBO.USUARIOS_PLANTILLAS UP
WHERE IDPLANTILLA = CAST(ISNULL(:IDPLANTILLA,0) AS INT)  