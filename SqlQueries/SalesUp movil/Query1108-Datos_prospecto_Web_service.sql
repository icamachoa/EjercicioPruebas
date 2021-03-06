//[bd|Text,idusuario|Integer,idprospecto|Integer,]
-- select

DECLARE @BD VARCHAR(512)
DECLARE @EXECSQL VARCHAR(8000)
DECLARE @YASINCRONIZADO INT
DECLARE @FECHA DATETIME
DECLARE @IDUSUARIO INT
DECLARE @IDPROSPECTO INT
SET @IDUSUARIO=ISNULL(:IDUSUARIO,0)
SET @IDPROSPECTO=ISNULL(:IDPROSPECTO,0)
SET @BD = ISNULL(:BD,'')

SET @EXECSQL = 'SELECT CONVERT(VARCHAR,P.ULTIMAMODIFICACION,20) AS MODIF, CONVERT(VARCHAR,FECHACONTACTO,20) AS FECHACONTACTO,CONVERT(VARCHAR,P.FECHAHORA,20) AS FECHAHORA, CONVERT(VARCHAR,DESCARTADOFECHA,20) AS DESCARTADOFECHA, A.IDUSUARIO AS ASIGNADO,'
SET @EXECSQL = @EXECSQL + 'CONVERT(VARCHAR,FECHA_ULTIMOSEGUIMIENTO,20) AS FECHA_ULTIMOSEGUIMIENTOS, ISNULL(A.ARCHIVADO,0) AS ARCHIVA, P.IDPROSPECTO,P.IDEMPRESA,NOMBRE,APELLIDOS,TITULO,SEXO,CORREO,EMPRESA,NOEMPLEADOS,PUESTO,URL,TELEFONO,TELEFONO2,MOVIL,CAST(COMENTARIOS AS VARCHAR(MAX)) AS COMENTARIOS,IDPAIS,IDESTADO,DIRECCION1,DIRECCION2,CIUDAD,CODIGOPOSTAL,IDORIGEN,SITIO_CAPTURA,IDFASE,P.IDUSUARIO,ESOPORTUNIDAD,ESCLIENTE,DESCARTADO,DESCARTADOPOR,DESCARTADORAZON,IDULTIMOSEGUIMIENTO, '+CAST(@IDUSUARIO AS VARCHAR(1000))+' AS IDUSUARIO,'+CAST(@IDPROSPECTO AS VARCHAR(1000))+' AS IDPROSPECTO '
SET @EXECSQL = @EXECSQL + 'FROM '+@BD+'.dbo.PROSPECTOS P WITH (NOLOCK), '+@BD+'.dbo.PROSPECTOS_ASIGNADOS A WITH (NOLOCK) WHERE A.IDUSUARIO = CAST('''+CAST(@IDUSUARIO AS VARCHAR(1000))+''' AS INT) AND P.IDPROSPECTO = A.IDPROSPECTO AND P.IDPROSPECTO = CAST('''+CAST(@IDPROSPECTO AS VARCHAR(1000))+''' AS INT) '
EXEC(@EXECSQL)
