//[fecha|Text,bd|Text,idusuario|Integer,idempresa|Integer,]
-- select
DECLARE @SQL VARCHAR(MAX)
DECLARE @FECHA VARCHAR(1000)
DECLARE @FECHAAUX DATETIME
DECLARE @YASINCRONIZADO INT
DECLARE @IDEMPRESA VARCHAR(1000)
DECLARE @IDUSUARIO VARCHAR(1000)
DECLARE @BD VARCHAR(1000)

SET @IDEMPRESA= CAST(ISNULL(:IDEMPRESA,0) AS VARCHAR(1000))
SET @IDUSUARIO= CAST(ISNULL(:IDUSUARIO,0) AS VARCHAR(1000))
SET @FECHA = ISNULL(:FECHA,'')
SET @FECHAAUX = CONVERT(DATETIME,ISNULL(:FECHA,''),20)
SET @BD = ISNULL(:BD,'')

IF(@FECHAAUX = 0) 
BEGIN
	SET @YASINCRONIZADO = 0
END 
ELSE 
BEGIN 
	SET @YASINCRONIZADO = 1
END 

SET @SQL=' 
SELECT E.*, VT.TABLA FROM '+@BD+'.dbo.ELIMINACIONES E WITH (NOLOCK), SALESUP_CT.dbo.V_TABLAS VT WITH (NOLOCK) 
WHERE '+CAST(@YASINCRONIZADO AS VARCHAR(1000))+' > 0 AND E.IDTABLA = VT.IDTABLA AND (E.IDUSUARIO = '+@IDUSUARIO+' OR E.IDEMPRESA ='+@IDEMPRESA+') AND TIPO = 1 AND E.FECHAHORA >= CONVERT(DATETIME,'''+@FECHA+''',20) ORDER BY E.IDTABLA ASC 
'
EXEC (@SQL)