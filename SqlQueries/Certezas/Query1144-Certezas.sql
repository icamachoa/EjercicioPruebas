//[session.db|Untyped,session.idempresa|Untyped,]
SELECT idcertezaempresa as idcerteza, certeza, isnull(descripcion, '') as descripcion, tk
FROM <#SESSION.DB/>.DBO.EMPRESAS_CERTEZAS WHERE IDEMPRESA=<#SESSION.IDEMPRESA/>
ORDER BY CERTEZA