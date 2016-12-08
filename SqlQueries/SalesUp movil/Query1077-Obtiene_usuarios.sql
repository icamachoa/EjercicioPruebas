//[bd|Text,idempresa|Text,fecha|Text,]
-- select
DECLARE @SQL VARCHAR(MAX)
DECLARE @BD VARCHAR(1000)
DECLARE @IDEMPRESA VARCHAR(1000)
DECLARE @FECHA VARCHAR(1000)
SET @BD=ISNULL(:BD,'')
SET @IDEMPRESA=CAST(ISNULL(:IDEMPRESA,0) AS VARCHAR(1000))
SET @FECHA=ISNULL(:FECHA,'')

SET @SQL='
SELECT idusuario,idempresa,email,nombre,apellidos,UPPER(SUBSTRING(master.dbo.fn_varbintohexstr(CONTRASENA), 0, 64) ) AS CONTRASENIA,iniciales,nivel,activo,idgrupo,default_pais,default_estado,USUARIOTELEFONO,USUARIOMOVIL,
'''+@BD+''' AS BD, '+@IDEMPRESA+' AS IDEMPRESA, '''+@FECHA+''' AS FECHA
FROM '+@BD+'.dbo.usuarios WITH(NOLOCK) 
where idempresa = '+@IDEMPRESA+' AND ULTIMAMODIFICACION >= CONVERT(DATETIME,'''+@FECHA+''',20)
'
EXEC(@SQL)