//[idayudacat|Integer,buscar_dato_ayuda|Text,session.idproducto|Untyped,]
--SELECT 
DECLARE @IDAYUDACAT INT
DECLARE @buscar_dato_ayuda VARCHAR(MAX)

SET @IDAYUDACAT=ISNULL(:IDAYUDACAT,0)
SET @buscar_dato_ayuda=ISNULL(:buscar_dato_ayuda,'')

SELECT *, @buscar_dato_ayuda AS buscar_dato_ayuda FROM CONTROL.DISTRIBUIDORES.dbo.AYUDA A
WHERE A.IDAYUDACAT = @IDAYUDACAT
 AND  
(
  ( A.TITULO COLLATE Latin1_general_CI_AI LIKE '%'+@buscar_dato_ayuda+'%') OR
  ( CAST(A.TEXTO COLLATE Latin1_general_CI_AI AS VARCHAR(8000)) LIKE '%'+@buscar_dato_ayuda+'%') 
)
AND IDPRODUCTO = <#SESSION.IDPRODUCTO/>
ORDER BY ORDENAYUDA, TITULO
