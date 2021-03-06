//[tktr|Text,c|Text,session.idusuario|Untyped,session.db|Untyped,]
--INSERT

DECLARE @TKTR VARCHAR(64), @COMENTARIO VARCHAR(MAX)
DECLARE @IDUSUARIO INT, @IDTAREA INT, @IDTAREASEGUIMIENTO INT
SET @TKTR = dbo.ValidaToken(ISNULL(:TKTR,''))
SET @COMENTARIO = ISNULL(:C,'')
SET @IDUSUARIO = <#SESSION.IDUSUARIO/>
 
SELECT @IDTAREA = IDTAREA FROM <#SESSION.DB/>.dbo.TAREAS WHERE TKTR = @TKTR

INSERT INTO <#SESSION.DB/>.dbo.TAREAS_SEGUIMIENTO (IDUSUARIO, FECHAHORA, COMENTARIO, IDTAREA)
VALUES (@IDUSUARIO, GETDATE(), @COMENTARIO, @IDTAREA)

SELECT TOP 1 @IDTAREASEGUIMIENTO = IDTAREASEGUIMIENTO 
FROM <#SESSION.DB/>.dbo.TAREAS_SEGUIMIENTO 
WHERE IDTAREA = @IDTAREA ORDER BY 1 DESC
	
UPDATE <#SESSION.DB/>.dbo.TAREAS SET IDTAREASEGUIMIENTO = @IDTAREASEGUIMIENTO WHERE IDTAREA = @IDTAREA
