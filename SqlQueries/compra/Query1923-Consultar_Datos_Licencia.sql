//[session.idempresa|Untyped,session.db|Untyped,]
--SELECT 


DECLARE @IDEMPRESA INT 
SET @IDEMPRESA='<#SESSION.IDEMPRESA/>'

SELECT IDLICENCIA
FROM <#SESSION.DB/>.DBO.EMPRESAS 
WHERE IDEMPRESA=@IDEMPRESA 