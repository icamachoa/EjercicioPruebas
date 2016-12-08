//[session.idempresa|Untyped,tipocarpeta|Integer,carpetaactual|Integer,session.db|Untyped,]
--SELECT

DECLARE @CARPETAS TABLE(ID INT IDENTITY, IDCARPETA INT, CARPETA VARCHAR(MAX))
DECLARE @ID INT, @TOTAL INT, @IDCARPETA INT, @IDEMPRESA INT, @TIPOCARPETA INT, @CARPETAACTUAL INT
DECLARE @CARPETA VARCHAR(MAX)

SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)
SET @TIPOCARPETA = ISNULL( :TIPOCARPETA, 0) 
SET @CARPETAACTUAL = ISNULL( :CARPETAACTUAL, 0) 

INSERT INTO @CARPETAS (IDCARPETA, CARPETA)
SELECT IDCARPETA, CARPETA FROM <#SESSION.DB/>.dbo.EMPRESAS_CARPETAS 
WHERE IDEMPRESA = @IDEMPRESA AND IDPADRE = 0 AND TIPOCARPETA = @TIPOCARPETA

SET @ID = 1
SELECT @TOTAL = COUNT(*) FROM @CARPETAS

WHILE @ID <= @TOTAL 
BEGIN
	SELECT @IDCARPETA = IDCARPETA, @CARPETA = CARPETA FROM @CARPETAS WHERE ID = @ID
	
	INSERT INTO @CARPETAS (IDCARPETA, CARPETA)
	SELECT IDCARPETA, @CARPETA+' / '+CARPETA FROM <#SESSION.DB/>.dbo.EMPRESAS_CARPETAS 
	WHERE IDEMPRESA = @IDEMPRESA AND IDPADRE = @IDCARPETA
	
	SET @ID = @ID + 1
END

SELECT IdCarpeta, ISNULL(Carpeta, 'Sin nombre')  AS Carpeta, CASE WHEN @CARPETAACTUAL = IDCARPETA THEN 'selected="selected"' END AS Selected 
FROM @CARPETAS ORDER BY CARPETA