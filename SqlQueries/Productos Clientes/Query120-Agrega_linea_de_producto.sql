//[session.db|Untyped,session.idempresa|Untyped,producto|Text,comision|Numeric,]
insert into <#SESSION.DB/>.DBO.EMPRESAS_LINEAS_PRODUCTO (IDEMPRESA, linea_producto, comision) 
values (<#session.IDEMPRESA/>, :producto, :comision /100 )