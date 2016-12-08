//[session.idempresa|Untyped,session.db|Untyped,]
--SELECT
/*PROTEGIDO*/
DECLARE @IDEMPRESA INT


SET @IDEMPRESA = <#SESSION.IDEMPRESA/>


SELECT DISTINCT STATUS,IDEMPRESAMONEDA, M.IDMONEDA,TIPODECAMBIO,TK,TKM, PORDEFECTO, UNICODE(PM.MONEDA_SIMBOLO) AS UNICODE,			
CASE PORDEFECTO WHEN 0 THEN 1 ELSE 0 END AS DESACTIVADO, PM.MONEDA , ISNULL(PM.MONEDA_SIMBOLO, '')  AS SIMBOLO
FROM <#SESSION.DB/>.DBO.MONEDAS M
LEFT JOIN SALESUP_CT.DBO.MONEDAS PM  ON   M.IDMONEDA=PM.IDMONEDA 
WHERE IDEMPRESA =@IDEMPRESA ORDER BY PORDEFECTO DESC, PM.MONEDA ASC


