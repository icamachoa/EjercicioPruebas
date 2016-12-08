//[tkrs|Text,]
DECLARE @TKRS VARCHAR(MAX), @criterios varchar(max) 

SET @TKRS = ISNULL(:TKRS, '')

SELECT 
	@criterios = criterios 
FROM 
	SALESUP_CT.DBO.REPORTES_SISTEMA 
WHERE 
	TKRS = @TKRS

SELECT 
	CAST(tkRsc AS VARCHAR(MAX)) AS tkRsc, 
	idCriterio, criterio, idElemento, opcionesCriterios, json, modulo,
	CASE IDCRITERIO 
	WHEN 9 THEN 1 
	WHEN 34 THEN 1
	ELSE 0 END AS esInput, restriccion
FROM 
	SALESUP_CT.DBO.REPORTES_SISTEMA_CRITERIOS 
WHERE 
	IDCRITERIO IN (SELECT SPLITVALUE FROM SALESUP_CT.DBO.SPLIT(@criterios,','))