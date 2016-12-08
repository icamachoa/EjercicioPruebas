//[session.db|Untyped,session.idempresa|Untyped,]
SELECT count (*) as totaln FROM <#session.db/>.dbo.COMPANIAS_GRUPOS WHERE IDEMPRESA = <#SESSION.IDEMPRESA/>