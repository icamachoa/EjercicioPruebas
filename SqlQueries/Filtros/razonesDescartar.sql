//[session.idusuario|Untyped|,session.nivel|Untyped|,session.idgrupo|Untyped|,session.idempresa|Untyped]
--SELECT

SELECT tk,razonperdida FROM <#session.db/>.dbo.EMPRESAS_RAZONES_PERDIDA WHERE IDEMPRESA = <#session.idempresa/>