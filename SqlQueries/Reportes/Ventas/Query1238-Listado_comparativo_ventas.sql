//[session.db|Untyped,session.idusuario|Untyped,session.idempresa|Untyped,session.idgrupo|Untyped,session.nivel|Untyped,]
--SELECT
EXEC <#SESSION.DB/>.dbo.SP_REPORTE_VENTAS_REALIZADAS_VS_COBRADAS <#SESSION.IDUSUARIO>,<#SESSION.IDEMPRESA>,<#SESSION.IDGRUPO>,<#SESSION.NIVEL>