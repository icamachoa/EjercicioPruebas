//[cadenas|Text,]
SELECT LEFT(  CAST( NEWID() AS VARCHAR (128)) ,8 )+'_'+  SALESUP_CT.dbo.NomalizaCadenaEsp(:CADENAS) AS NORMALIZADO
