//[session.db|Untyped,session.idempresa|Untyped,]
--SELECT 


SELECT * FROM <#SESSION.DB/>.DBO.PRODUCTOS_COMISIONES 
WHERE IDEMPRESA=<#SESSION.IDEMPRESA/>
AND STATUS=1