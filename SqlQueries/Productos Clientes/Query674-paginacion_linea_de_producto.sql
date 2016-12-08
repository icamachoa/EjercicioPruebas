//[]
select count(*) as totaln from  <#SESSION.DB/>.DBO.EMPRESAS_LINEAS_PRODUCTO 
where IDEMPRESA=<#session.IDEMPRESA/> 
