//[session.db|Untyped,session.sessionid|Untyped,]
--update

UPDATE <#SESSION.DB/>.DBO.USUARIOS_ACCESOS SET FECHA_FIN=GETDATE() WHERE SESSIONID='<#SESSION.SESSIONID/>' and idusuario=<#session.idusuario/> and activo=1
--UPDATE <#SESSION.DB/>.DBO.USUARIOS_ACCESOS SET FECHA_FIN=GETDATE(), ACTIVO=0 WHERE SESSIONID='<#SESSION.SESSIONID/>'