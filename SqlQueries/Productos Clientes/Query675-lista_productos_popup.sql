//[session.db|Untyped,session.idempresa|Untyped,tkeliminar|Text,]
--SELECT
/*PROTEGIDO*/
/*SEP2015*/
DECLARE @TKELIMINAR VARCHAR(256)
SET @TKELIMINAR=ISNULL(:TKELIMINAR,'')
select SALESUP_CT.dbo.esCanalizado(TK, TKM) AS esCanalizado, TK, linea_producto from  <#SESSION.DB/>.DBO.EMPRESAS_LINEAS_PRODUCTO 
where IDEMPRESA=<#session.IDEMPRESA/> and TK != @TKELIMINAR
order by linea_producto