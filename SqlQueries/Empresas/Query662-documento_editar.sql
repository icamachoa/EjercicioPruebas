//[session.db|Untyped,el_iddoc|Integer,]
SELECT D.*,(CASE WHEN D.TKM IS NOT NULL OR LEN(D.TKM) > 4 THEN 1 ELSE 0 END) AS CANALIZADO
FROM <#SESSION.DB/>.dbo.EMPRESAS_DOCUMENTOS D
WHERE iddocumento =:EL_IDDOC