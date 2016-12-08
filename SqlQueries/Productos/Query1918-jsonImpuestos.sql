//[session.idempresa|Untyped,session.db|Untyped,]
--SELECT 
/*PROTEGIDO*/

DECLARE @IDEMPRESA INT 
SET @IDEMPRESA='<#SESSION.IDEMPRESA/>'

SELECT idImpuesto, impuesto, tasa , indice, tk 
FROM <#SESSION.DB/>.DBO.EMPRESAS_IMPUESTOS 
WHERE IDEMPRESA = @IDEMPRESA AND STATUS = 1