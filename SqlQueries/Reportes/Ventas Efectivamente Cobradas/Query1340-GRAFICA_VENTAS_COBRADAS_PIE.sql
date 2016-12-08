//[session.db|Untyped,session.idusuario|Untyped,session.idempresa|Untyped,session.idgrupo|Untyped,session.nivel|Untyped,]
--SELECT 
EXEC <#SESSION.DB/>.DBO.SP_REPORTE_VENTAS_COBRADAS_GRAFICA_PIE <#SESSION.IDUSUARIO/>,<#SESSION.IDEMPRESA/>,<#SESSION.IDGRUPO/>,<#SESSION.NIVEL/>