//[session.idusuario|Untyped,session.db|Untyped,css|Integer,]
--UPDATE
-- dabs - sospecho que no se usa
DECLARE @IDCSS INT, @IDUSUARIO INT
SET @IDUSUARIO = CAST('<#SESSION.IDUSUARIO/>' AS INT) 
SET @IDCSS = CAST( :CSS AS INT) 

UPDATE <#SESSION.DB/>.dbo.USUARIOS 
SET IDCSS = @IDCSS
WHERE IDUSUARIO = @IDUSUARIO
