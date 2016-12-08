//[session.db|Untyped,session.idusuario|Untyped,session.idempresa|Untyped,session.idgrupo|Untyped,session.nivel|Untyped,session.convertcode|Untyped,]
--SELECT
DECLARE @FECHA1 DATETIME
DECLARE @FECHA2 DATETIME
SET @FECHA1=DATEADD(mm, DATEDIFF(m,0,getdate() )-0, 0)    
SET @FECHA2=GETDATE()

EXEC <#SESSION.DB/>.DBO.SP_REPORTE_COBROS_Y_COMISIONES_TOTAL <#SESSION.IDUSUARIO/>,<#SESSION.IDEMPRESA/>,<#SESSION.IDGRUPO/>,<#SESSION.NIVEL/>,<#SESSION.CONVERTCODE/>