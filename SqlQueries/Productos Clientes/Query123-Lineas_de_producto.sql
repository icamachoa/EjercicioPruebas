//[session.db|Untyped,session.idempresa|Untyped,]
select * from  <#SESSION.DB/>.DBO.EMPRESAS_LINEAS_PRODUCTO 
where IDEMPRESA=<#session.IDEMPRESA/> 
order by linea_producto