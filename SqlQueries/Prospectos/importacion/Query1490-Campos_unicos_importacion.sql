//[criteriofiltro|Text,tit|Text,session.db|Untyped,session.idempresa|Untyped,]
--select
DECLARE @SQL VARCHAR(MAX)
DECLARE @CRIT VARCHAR(MAX)
SET @CRIT = ISNULL( :CRITERIOFILTRO , '')

SET @SQL = '

  DECLARE @TIPO INT,@TITULO INT, @COMPARTIR INT
  SET @TITULO = CAST(' + :TIT + ' AS INT)

  IF(@TITULO = 0)
  BEGIN
	 SET @TIPO = 1
	 SET @COMPARTIR = 1
  END
  ELSE
  BEGIN
	 SET @TIPO = 3
	 SET @COMPARTIR = 3
  END

  SELECT * , SUBSTRING(NOMBRE_CAMPO,1,13) AS NOMBRECORTO 
  FROM <#SESSION.DB/>.DBO.EMPRESAS_CAMPOS 
  WHERE IDEMPRESA = <#SESSION.IDEMPRESA/> AND (LLAVE=1 OR LLAVE = 3) 
  AND (TIPO = @TIPO OR COMPARTIR = @COMPARTIR) ' + @CRIT +' 
  AND (indice <= 20  or (indice between 26 and 64)) 
  AND TIPO_CAMPO NOT IN (3,4,6,7,8,9)
  ORDER BY NOMBRE_CAMPO
  
   '
  
EXEC (@SQL)