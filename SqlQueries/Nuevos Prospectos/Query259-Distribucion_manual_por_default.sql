//[session.idusuario|Untyped,session.idempresa|Untyped,]
UPDATE <#SESSION.DB/>.DBO.EMPRESAS SET IDUSUARIO_DISTRIBUCION=<#SESSION.IDUSUARIO/>, DISTRIBUCION=1 WHERE IDEMPRESA=<#SESSION.IDEMPRESA/>