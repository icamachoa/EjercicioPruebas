//[nombre|Text,correo|Text,apellidos|Text,idempresa|Integer,idusuario|Integer,base|Text,]
DECLARE @SQL VARCHAR(MAX)
DECLARE @NOMBRE VARCHAR(128) 
DECLARE @APELLIDOS VARCHAR(128)
DECLARE @CORREO VARCHAR(256)
DECLARE @IDEMPRESA VARCHAR(1000)
DECLARE @IDUSUARIO VARCHAR(1000)
DECLARE @BASE VARCHAR(1000)
SET @BASE=ISNULL(:BASE,'')
SET @NOMBRE = ISNULL(:NOMBRE,'')
IF @NOMBRE = ''
  SET @NOMBRE = ISNULL(:CORREO,'')
SET @APELLIDOS  = ISNULL(:APELLIDOS,'')
SET @CORREO = ISNULL(:CORREO,'')
SET @IDEMPRESA = CAST(ISNULL(:IDEMPRESA,0) AS VARCHAR(1000))
SET @IDUSUARIO = CAST(ISNULL(:IDUSUARIO,0) AS VARCHAR(1000))
SET @SQL='
EXEC '+@BASE+'.dbo.SP_INSERTA_PROSPECTO_FCONTACTO '''+@NOMBRE+''','''+@APELLIDOS+''','''+@CORREO+''','''','''','''','''','''','''','+@IDEMPRESA+','+@IDUSUARIO+',1,'''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''',2420,0,0,''2''
'
EXEC (@SQL)