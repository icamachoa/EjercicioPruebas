//[session.idempresa|Untyped,]
SELECT *
FROM CONTROL.VENTAS.DBO.EMPRESAS_HISTORICO WHERE IDEMPRESA = <#SESSION.IDEMPRESA/> 
ORDER BY FECHA DESC