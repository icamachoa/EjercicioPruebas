//[session.db|Untyped,session.idempresa|Untyped,]
SELECT * FROM <#SESSION.DB/>.dbo.PROSPECTOS_ORIGENES 
WHERE IDEMPRESA = <#SESSION.IDEMPRESA/> 
ORDER BY ORIGEN  