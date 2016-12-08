//[session.db|Untyped,session.idusuario|Untyped,session.idempresa|Untyped,session.idgrupo|Untyped,session.nivel|Untyped,]
--select
exec <#SESSION.DB/>.DBO.SP_REPORTE_VENTAS_NUEVAS_VS_PREVIAS_GRAFICA <#SESSION.IDUSUARIO/>,<#SESSION.IDEMPRESA/>,<#SESSION.IDGRUPO/>,<#SESSION.NIVEL/>