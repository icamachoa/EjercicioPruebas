//[condicioncategoria|Text,buscar_dato_ayuda|Text,session.idproducto|Untyped,]
--select
DECLARE @SQL VARCHAR(MAX)
DECLARE @CRIT VARCHAR(MAX)
SET @CRIT = ISNULL( :CONDICIONCATEGORIA , '')

SET @SQL = '
  DECLARE @buscar_dato_ayuda VARCHAR(MAX) = ISNULL(''' +ISNULL( :buscar_dato_ayuda, '') + ''','''')

  SELECT DISTINCT(C.IDAYUDACAT) , CATEGORIA, C.ORDEN, @buscar_dato_ayuda AS buscar_dato_ayuda FROM 
  CONTROL.DISTRIBUIDORES.dbo.AYUDA A, 
  CONTROL.DISTRIBUIDORES.dbo.AYUDA_CATEGORIAS C
  WHERE A.IDAYUDACAT = C.IDAYUDACAT AND C.CONTEXTUAL = 0 AND  
  (
    ( A.TITULO COLLATE Latin1_general_CI_AI LIKE ''%''+@buscar_dato_ayuda+''%'') OR
    ( CAST(A.TEXTO COLLATE Latin1_general_CI_AI AS VARCHAR(8000)) LIKE ''%''+@buscar_dato_ayuda+''%'') OR
    ( C.CATEGORIA COLLATE Latin1_general_CI_AI LIKE ''%''+@buscar_dato_ayuda+''%'') 
  )
  AND A.IDPRODUCTO = <#SESSION.IDPRODUCTO/>
  ' + @CRIT + '
  order by C.ORDEN
   '
  
EXEC (@SQL)