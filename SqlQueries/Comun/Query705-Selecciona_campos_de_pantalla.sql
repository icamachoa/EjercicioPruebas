//[session.db|Untyped,idpantalla|Integer,]
SELECT PC.NUMERO_COLUMNA, PC.CAMPO_ALIAS
FROM <#SESSION.DB/>.DBO.PANTALLAS_COLUMNAS PC WHERE IDPANTALLA=:IDPANTALLA