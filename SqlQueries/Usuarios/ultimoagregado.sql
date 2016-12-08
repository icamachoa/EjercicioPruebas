//[session.db|Untyped,nombre|Text,idusuario|Integer,etiquetas|Integer,session.idempresa|Untyped,esprospecto|Integer,esoportunidad|Integer,escliente|Integer]
--SELECT

SELECT TOP 1 A.IDAUTORESPONDER, A.TITULO,A.IDETIQUETA,CAST(TKAUTO AS VARCHAR(256)) AS TKAUTO, CAST(E.TK AS VARCHAR(256)) AS TK
FROM <#SESSION.DB/>.DBO.AUTORESPONDERS A
LEFT JOIN <#SESSION.DB/>.DBO.ETIQUETAS E ON E.IDETIQUETA=A.IDETIQUETA
ORDER BY 1 DESC