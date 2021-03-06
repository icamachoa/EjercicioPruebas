//[session.idempresa|Untyped,session.idusuario|Untyped,reporteconfig|Text,anio|Text,idagrupacion|Text,paso|Text,fecha_inicio|Text,session.convertcode|Untyped,fecha_fin|Text,session.db|Untyped,]
--SELECT
--select
DECLARE @SESSION_IDEMPRESA INT
DECLARE @SESSION_IDUSUARIO INT
DECLARE @IDREPORTECONFIG INT
DECLARE @PERIODO INT
DECLARE @FECHA_INICIO VARCHAR(128)
DECLARE @FECHA_FIN VARCHAR(128)
DECLARE @IDAGRUPACION INT
DECLARE @PASO INT
DECLARE @ANIO INT
DECLARE @TIPO_REPORTE INT /* 0 PAGINACION,  1 DATOS*/

SET @SESSION_IDEMPRESA=CAST('<#SESSION.IDEMPRESA/>' AS INT)
SET @SESSION_IDUSUARIO=CAST('<#SESSION.IDUSUARIO/>' AS INT)
SET @IDREPORTECONFIG=ISNULL(:REPORTECONFIG, '') 
SET @ANIO = ISNULL(:ANIO, 0) 
SET @IDAGRUPACION=ISNULL(:IDAGRUPACION, 0) 
SET @PASO=ISNULL(:PASO, 0) 
SET @TIPO_REPORTE = 1


SET @FECHA_INICIO = :FECHA_INICIO
SET @FECHA_FIN = :FECHA_FIN


IF(@ANIO > 0)
BEGIN
	 SET @FECHA_INICIO= CONVERT(DATETIME,'01/01/'+CAST(@ANIO AS VARCHAR),103)
   	 SET @FECHA_FIN=DATEADD(SS,-1,CONVERT(DATETIME,CONVERT(VARCHAR(10),CONVERT(DATETIME,'31/12/'+CAST(@ANIO AS VARCHAR),103)+1,103),103))
END
ELSE
BEGIN
	 SET @FECHA_INICIO= CONVERT(DATETIME, :FECHA_INICIO,<#SESSION.CONVERTCODE/>)
   	 SET @FECHA_FIN=DATEADD(SS,-1,CONVERT(DATETIME,CONVERT(VARCHAR(10),CONVERT(DATETIME, :FECHA_FIN,<#SESSION.CONVERTCODE/>)+1,<#SESSION.CONVERTCODE/>),<#SESSION.CONVERTCODE/>))
END
EXEC  <#SESSION.DB/>.DBO.SP_REPORTE_EMBUDO_Y_CONVERSIONES_DETALLE_IDS @SESSION_IDEMPRESA,@SESSION_IDUSUARIO, @IDREPORTECONFIG, @FECHA_INICIO,@FECHA_FIN,@IDAGRUPACION, @PASO, @TIPO_REPORTE
