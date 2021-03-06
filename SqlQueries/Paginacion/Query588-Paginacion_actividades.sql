//[session.convertcode|Untyped,session.idusuario|Untyped,session.idgrupo|Untyped,session.nivel|Untyped,ordenamiento|Text,fecha_desde|Text,fecha_hasta|Text,session.idempresa|Untyped,session.db|Untyped,]
--SELECT
DECLARE @IDUSUARIO INT
DECLARE @IDEMPRESA INT
DECLARE @IDGRUPO INT
DECLARE @NIVEL INT
DECLARE @FECHA_DESDE DATETIME
DECLARE @FECHA_HASTA DATETIME
DECLARE @CONVERTCODE INT
DECLARE @ORDENAMIENTO VARCHAR(1000)
SET @CONVERTCODE=CAST('<#SESSION.CONVERTCODE/>' AS INT)
SET @IDUSUARIO=CAST('<#SESSION.IDUSUARIO/>' AS INT)
SET @IDGRUPO=CAST('<#SESSION.IDGRUPO/>' AS INT)
SET @NIVEL=CAST('<#SESSION.NIVEL/>' AS INT)
SET @ORDENAMIENTO=isnull(:ORDENAMIENTO,'')
SET @FECHA_DESDE=CONVERT(DATETIME,isnull(:FECHA_DESDE,''),@CONVERTCODE)
SET @FECHA_HASTA=CONVERT(DATETIME,isnull(:FECHA_HASTA,''),@CONVERTCODE)
SET @IDEMPRESA=CAST('<#SESSION.IDEMPRESA/>' AS INT)

EXEC <#SESSION.DB/>.DBO.SP_REPORTE_ACTIVIDADES_TOTAL @IDUSUARIO, @IDEMPRESA, @IDGRUPO, @NIVEL, @FECHA_DESDE, @FECHA_HASTA, @CONVERTCODE, @ORDENAMIENTO

