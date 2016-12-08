//[nombre|Text,correo|Text,apellidos|Text,idempresa|Integer,base|Text,]
DECLARE @SQL VARCHAR(MAX)
DECLARE @BASE VARCHAR(1000)
DECLARE @NOMBRE VARCHAR(128) 
DECLARE @APELLIDOS VARCHAR(128)
DECLARE @CORREO VARCHAR(256)
DECLARE @IDEMPRESA VARCHAR(1000)
SET @BASE=ISNULL(:BASE,'')
SET @NOMBRE = ISNULL(:NOMBRE,'')
IF @NOMBRE = ''
   begin
   		SET @NOMBRE = ISNULL(:CORREO,'')	
	end
SET @APELLIDOS  = ISNULL(:APELLIDOS,'')
SET @CORREO = ISNULL(:CORREO,'')	
SET @IDEMPRESA = CAST(ISNULL(:IDEMPRESA,0) AS VARCHAR(1000))

SET @SQL='EXEC '+@BASE+'.dbo.SP_INSERTA_PROSPECTO_FCONTACTO '''+@NOMBRE+''','''+@APELLIDOS+''','''+@CORREO+''','''','''','''','''','''','''','+@IDEMPRESA+',0,1,'''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''','''',2564,3017,0,''2'''
EXEC (@SQL)