//[usr|Text,pwd|Text,]
--select
/*protegido*/
DECLARE @CORREO VARCHAR(1000)
DECLARE @PASSWORD VARCHAR(1000)
SET @CORREO=ISNULL(:USR,'')
SET @PASSWORD=ISNULL(:PWD,'')

SELECT * FROM control.control.dbo.USUARIOS_salesup U, control.control.dbo.EMPRESAS_salesup E  WHERE EMAIL = @CORREO AND CONTRASENA = HASHBYTES ('SHA1', @PASSWORD  )  and  @CORREO != '' AND ACTIVO = 1 AND U.IDEMPRESA = E.IDEMPRESA