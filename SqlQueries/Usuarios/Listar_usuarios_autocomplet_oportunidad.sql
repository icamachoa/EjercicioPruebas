//[session.idempresa|Untyped,session.nivel|Untyped,session.idgrupo|Untyped,IDOPORTUNIDAD|Text,session.db|Untyped]
--select 
DECLARE @IDEMPRESA INT, @IDNIVEL INT, @IDGRUPO INT
DECLARE @IDUSUARIO INT
DECLARE @DUENO INT
DECLARE @IDOPORTUNIDAD VARCHAR(125)

SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)
SET @IDNIVEL = CAST('<#SESSION.NIVEL/>' AS INT)
SET @IDGRUPO = CAST('<#SESSION.IDGRUPO/>' AS INT)
SET @DUENO=0
set @IDOPORTUNIDAD =:IDOPORTUNIDAD

SELECT @DUENO=IDUSUARIO FROM <#SESSION.DB/>.dbo.OPORTUNIDADES 
WHERE TKO=@IDOPORTUNIDAD

IF @IDNIVEL = 1
  SELECT U.IDUSUARIO, U.NOMBRE +' '+U.APELLIDOS+' ('+LTRIM(RTRIM(U.INICIALES))+')' AS NOMBRE, U.IDGRUPO , UG.GRUPO, u.tku, u.idusuario
  FROM <#SESSION.DB/>.dbo.USUARIOS U
  LEFT JOIN  <#SESSION.DB/>.dbo.USUARIOS_GRUPOS UG ON UG.IDUSUARIOGRUPO = U.IDGRUPO AND UG.IDEMPRESA = U.IDEMPRESA
  WHERE U.IDEMPRESA = @IDEMPRESA AND U.ACTIVO=1  AND U.IDUSUARIO!=@DUENO
  ORDER BY U.NOMBRE, U.APELLIDOS
ELSE
  SELECT U.IDUSUARIO, U.NOMBRE +' '+U.APELLIDOS+' ('+LTRIM(RTRIM(U.INICIALES))+')' AS NOMBRE, U.IDGRUPO , UG.GRUPO, u.tku, u.idusuario
  FROM <#SESSION.DB/>.dbo.USUARIOS U
  LEFT JOIN  <#SESSION.DB/>.dbo.USUARIOS_GRUPOS UG ON UG.IDUSUARIOGRUPO = U.IDGRUPO AND UG.IDEMPRESA = U.IDEMPRESA
  WHERE U.IDEMPRESA = @IDEMPRESA AND (U.IDGRUPO=@IDGRUPO OR U.NIVEL <=2) AND U.ACTIVO=1 AND U.IDUSUARIO!=@DUENO
  ORDER BY U.NOMBRE, U.APELLIDOS 