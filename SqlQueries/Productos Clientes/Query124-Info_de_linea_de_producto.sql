//[session.db|Untyped,session.idempresa|Untyped,tk|Text,]
--SELECT
select *, COMISION*100 AS COMISION_PCT from <#SESSION.DB/>.DBO.EMPRESAS_LINEAS_PRODUCTO where IDEMPRESA=<#session.IDEMPRESA/> and tk = isnull(:tk, '') 