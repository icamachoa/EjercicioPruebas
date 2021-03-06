//[session.idempresa|Untyped,grupo|Text,session.db|Untyped,]
--SELECT
DECLARE @IDEMPRESA INT, @EXISTE INT
DECLARE @COMPANIAGRUPO VARCHAR(MAX)
SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)
SET @COMPANIAGRUPO = <#SESSION.DB/>.dbo.PreparaCadena(:GRUPO)

SELECT @EXISTE = COUNT(*) FROM <#SESSION.DB/>.dbo.COMPANIAS_GRUPOS WHERE IDEMPRESA = @IDEMPRESA AND COMPANIAGRUPO = @COMPANIAGRUPO
	   
IF @EXISTE = 0
BEGIN
  INSERT INTO <#SESSION.DB/>.dbo.COMPANIAS_GRUPOS (IDEMPRESA, COMPANIAGRUPO) VALUES(@IDEMPRESA, @COMPANIAGRUPO)
END

SELECT TOP 1 IdCompaniaGrupo AS Id FROM <#SESSION.DB/>.dbo.COMPANIAS_GRUPOS WHERE IDEMPRESA = @IDEMPRESA AND COMPANIAGRUPO = @COMPANIAGRUPO ORDER BY 1 DESC