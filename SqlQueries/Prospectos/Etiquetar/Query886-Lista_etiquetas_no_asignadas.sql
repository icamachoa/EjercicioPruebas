//[session.db|Untyped,session.idempresa|Untyped,]
SELECT REPLACE(ETIQUETA , '"','&#34;') AS ETIQUETA, * FROM <#SESSION.DB/>.DBO.ETIQUETAS E WHERE IDEMPRESA=<#SESSION.IDEMPRESA/> AND IDETIQUETA NOT IN (SELECT IDETIQUETA FROM <#SESSION.DB/>.dbo.AUTORESPONDERS WHERE IDEMPRESA= <#SESSION.IDEMPRESA/>) ORDER BY E.ETIQUETA