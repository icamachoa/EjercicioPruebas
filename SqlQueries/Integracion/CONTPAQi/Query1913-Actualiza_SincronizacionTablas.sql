//[session.idempresa|Untyped,json|Text,]
--select

DECLARE @IDEMPRESA INT
DECLARE @SINCRONIZACION_TABLAS VARCHAR(MAX)

SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)


SET @SINCRONIZACION_TABLAS= ISNULL(:json,'{"Tabla":"Lineas de Producto","valueE":"1", "valueD":"1"},{"Tabla":"Marcas","valueE":"1", "valueD":"1"},{"Tabla":"Lineas de precio","valueE":"1", "valueD":"1"},{"Tabla":"Productos","valueE":"1", "valueD":"1"},{"Tabla":"Empresas","valueE":"1", "valueD":"1"},{"Tabla":"Pedidos","valueE":"1", "valueD":"1"}')

set @SINCRONIZACION_TABLAS = SALESUP_CT.DBO.BASE64TOVARCHAR(@SINCRONIZACION_TABLAS)


UPDATE CONTROL.CONTROL.DBO.INTEGRACIONES SET SINCRONIZACION_TABLAS=@SINCRONIZACION_TABLAS WHERE IDEMPRESA =@IDEMPRESA

SELECT SINCRONIZACION_TABLAS AS SINC_TAB FROM CONTROL.CONTROL.DBO.INTEGRACIONES WHERE IDEMPRESA =@IDEMPRESA
