//[idpantalla|Integer,SESSION.GMT|Untyped]
--select

DECLARE @FECHA_ELIMINAR DATETIME
DECLARE @FECHA VARCHAR(MAX)
DECLARE @FECHA_NUEVA VARCHAR(MAX)
SET @FECHA_ELIMINAR = DATEADD(d, DATEDIFF(d,-2,getdate()), 0)
	
SET @FECHA_NUEVA = DATEADD(HOUR, 2, @FECHA_ELIMINAR)
SET @FECHA = SALESUP_CT.DBO.obtieneFechaRealGMT('<#SESSION.GMT/>', @FECHA_NUEVA);
SET @FECHA = SALESUP_CT.DBO.FormatoFecha(@FECHA,10)

SELECT @FECHA AS FECHA