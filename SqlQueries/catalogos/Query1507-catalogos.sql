//[session.db|Untyped,session.idempresa|Untyped,]
SELECT count(*) as totaln FROM <#SESSION.DB/>.dbo.CATALOGOS 
WHERE IDEMPRESA = <#SESSION.IDEMPRESA/>
