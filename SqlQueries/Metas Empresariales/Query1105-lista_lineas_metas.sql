//[session.db|Untyped,session.idempresa|Untyped,]
-- select

select IDLINEA_PRODUCTO, LINEA_PRODUCTO from <#SESSION.DB/>.DBO.EMPRESAS_LINEAS_PRODUCTO WHERE IDEMPRESA = <#SESSION.IDEMPRESA/>