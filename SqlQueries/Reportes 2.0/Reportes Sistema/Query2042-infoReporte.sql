//[tkrs|Text,]
DECLARE @TKRS VARCHAR(MAX)

SET @TKRS = ISNULL(:TKRS, '')

SELECT @TKRS as tk, reporte, criterios, totalizar, periodicidad, json as info
FROM SALESUP_CT.DBO.REPORTES_SISTEMA 
WHERE TKRS = @TKRS
