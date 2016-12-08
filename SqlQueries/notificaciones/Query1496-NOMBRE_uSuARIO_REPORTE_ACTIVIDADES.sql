//[idusuario|Integer,session.db|Untyped,]
--SELECT
/*PROTEGIDO*/
/*SEP2015*/
DECLARE @idusuario VARCHAR(1000)
SET @idusuario=ISNULL(:IDUSUARIO,0)

SELECT TOP 1 ISNULL(NOMBRE,'')+' '+ISNULL(APELLIDOS,'') AS NOMBREP FROM <#SESSION.DB/>.dbo.USUARIOS WHERE idusuario=@idusuario