//[fecha|Text,idempresa|Text,idusuario|Text,token|Text,bd|Text,]
--SELECT 

DECLARE @SQL VARCHAR(MAX)
DECLARE @BD VARCHAR(MAX)
SET @BD=ISNULL(:BD,'')
SET @SQL='
DECLARE @FECHA DATETIME
DECLARE @IDEMPRESA INT
DECLARE @IDUSUARIO INT
DECLARE @YASINCRONIZADO INT
DECLARE @FECHAUX DATETIME
DECLARE @TOKEN VARCHAR(8000)

SET @FECHA = CONVERT(DATETIME,'''+ISNULL(:FECHA,'')+''',20)
SET @IDEMPRESA = CAST('''+ISNULL(:IDEMPRESA,'')+''' AS INT)
SET @IDUSUARIO = CAST('''+ISNULL(:IDUSUARIO,'')+''' AS INT)

SET @TOKEN = '''+ISNULL(:TOKEN,'')+'''

UPDATE '+@BD+'.dbo.USUARIOS_TOKENS WITH(ROWLOCK) SET BORRAR_BASELOCAL = 0 
WHERE IDUSUARIO = @IDUSUARIO AND TOKEN = @TOKEN

IF(@FECHA = 0) 
BEGIN 
	SET @FECHAUX = GETDATE() 
END 
ELSE 
BEGIN 
	SET @FECHAUX = @FECHA
END 

IF(@FECHA = 0) 
BEGIN
	SET @YASINCRONIZADO = 0
END 
ELSE 
BEGIN 
	SET @YASINCRONIZADO = 1
END

DECLARE @TABLATEMP TABLE (ID INT IDENTITY,IDTABLA INT, TABLA VARCHAR(MAX),ORDEN INT,TOTALREGISTROS INT)
DECLARE @TO INT, @TOTAL INT
DECLARE @IDTABLA INT, @ORDEN INT,@TOTALREGISTROS INT
DECLARE @TABLA VARCHAR(MAX)

SET @TO = 1

INSERT INTO @TABLATEMP (IDTABLA,TABLA,ORDEN)
SELECT M.IDTABLA, VT.TABLA, VT.ORDEN
FROM '+@BD+'.dbo.MODIFICACIONES M WITH (NOLOCK), 
SALESUP_CT.dbo.V_TABLAS VT WITH (NOLOCK) 
WHERE M.IDTABLA = VT.IDTABLA
AND (IDEMPRESA = @IDEMPRESA OR IDUSUARIO = @IDUSUARIO) 
AND  FECHAHORA >= @FECHA 
GROUP BY  VT.ORDEN,M.IDTABLA, VT.TABLA

SELECT @TOTAL = COUNT(*)  FROM @TABLATEMP

WHILE @TO <= @TOTAL
BEGIN
	SELECT @IDTABLA = IDTABLA FROM @TABLATEMP WHERE ID = @TO
	
	IF(@IDTABLA = 1)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.USUARIOS WITH (NOLOCK) where idempresa = @IDEMPRESA AND ULTIMAMODIFICACION >= @FECHA
	ELSE IF(@IDTABLA = 2)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.EMPRESAS WITH (NOLOCK) where idempresa = @IDEMPRESA AND ULTIMAMODIFICACION >= @FECHA
	ELSE IF(@IDTABLA = 3)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.ETIQUETAS WITH (NOLOCK) where idempresa = @IDEMPRESA AND ULTIMAMODIFICACION >= @FECHA
	ELSE IF(@IDTABLA = 4)
		SELECT @TOTALREGISTROS = SUM(TOTAL) FROM(SELECT COUNT(*) AS TOTAL FROM '+@BD+'.dbo.PROSPECTOS P WITH (NOLOCK), '+@BD+'.dbo.PROSPECTOS_ASIGNADOS A WITH (NOLOCK) WHERE A.IDUSUARIO = @IDUSUARIO AND P.IDPROSPECTO = A.IDPROSPECTO AND (P.DESCARTADO = 0 OR (P.DESCARTADOFECHA >= @FECHA AND @YASINCRONIZADO > 0)) AND P.IDULTIMOSEGUIMIENTO IS NOT NULL AND P.ULTIMAMODIFICACION >= @FECHA UNION ALL SELECT COUNT(*) AS TOTAL FROM '+@BD+'.dbo.PROSPECTOS P WITH (NOLOCK), '+@BD+'.dbo.ELIMINACIONES E WITH (NOLOCK) WHERE @YASINCRONIZADO > 0 AND E.IDELIMINADO = P.IDPROSPECTO AND E.IDUSUARIO = @IDUSUARIO AND E.TIPO = 2 AND E.FECHAHORA >=@FECHA) AS TOTAL
	ELSE IF(@IDTABLA = 5)
		SELECT @TOTALREGISTROS = COUNT(*) FROM (SELECT ROW_NUMBER() OVER ( PARTITION BY PS.IDPROSPECTO, PS.IDOPORTUNIDAD ORDER BY PS.FECHAHORA DESC ) AS ''RowNumber'' FROM '+@BD+'.dbo.prospectos_seguimiento PS WITH (NOLOCK), '+@BD+'.dbo.PROSPECTOS P WITH (NOLOCK) LEFT JOIN '+@BD+'.dbo.PROSPECTOS_ASIGNADOS A WITH (NOLOCK) ON A.IDPROSPECTO = P.IDPROSPECTO WHERE A.IDUSUARIO = @IDUSUARIO AND P.IDPROSPECTO = A.IDPROSPECTO AND A.IDPROSPECTO = PS.IDPROSPECTO AND P.IDULTIMOSEGUIMIENTO IS NOT NULL AND (P.DESCARTADO = 0 OR P.DESCARTADOFECHA >= @FECHAUX) AND PS.ULTIMAMODIFICACION >= @FECHA) dt WHERE RowNumber <= 10
	ELSE IF(@IDTABLA = 6)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.dbo.PROSPECTOS P, '+@BD+'.dbo.PROSPECTOS_ASIGNADOS A WITH (NOLOCK), '+@BD+'.dbo.PROSPECTOS_ETIQUETAS PE WITH (NOLOCK) WHERE A.IDUSUARIO = @IDUSUARIO AND P.IDPROSPECTO = A.IDPROSPECTO AND A.IDPROSPECTO = PE.IDPROSPECTO AND P.DESCARTADO = 0  AND A.ARCHIVADO = 0 AND P.IDULTIMOSEGUIMIENTO IS NOT NULL AND P.ULTIMAMODIFICACION >= @FECHA
	ELSE IF(@IDTABLA = 7)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.EMPRESAS_LINEAS_PRODUCTO WITH (NOLOCK) where idempresa = @IDEMPRESA
	ELSE IF(@IDTABLA = 8)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.EMPRESAS_TITULOS WITH (NOLOCK) where idempresa = @IDEMPRESA
	ELSE IF(@IDTABLA = 9)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.PROSPECTOS_FASES WITH (NOLOCK) where idempresa = @IDEMPRESA
	ELSE IF(@IDTABLA = 10)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.PROSPECTOS_ORIGENES WITH (NOLOCK)  where idempresa = @IDEMPRESA
	ELSE IF(@IDTABLA = 11)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.OPORTUNIDADES_FASES WITH (NOLOCK)  where idempresa = @IDEMPRESA
	ELSE IF(@IDTABLA = 12)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.SEGUIMIENTO_CATEGORIAS WITH (NOLOCK) where idempresa = @IDEMPRESA
	ELSE IF(@IDTABLA = 14)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.PROSPECTOS_ASIGNADOS WITH (NOLOCK) where ULTIMAMODIFICACION >= @FECHA AND (IDUSUARIO = @IDUSUARIO or IDPROSPECTO in (select IDPROSPECTO from '+@BD+'.DBO.PROSPECTOS WITH (NOLOCK) where IDUSUARIO = @IDUSUARIO AND ULTIMAMODIFICACION > = @FECHA))
	ELSE IF(@IDTABLA = 15)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.OPORTUNIDADES WITH (NOLOCK) WHERE (PERDIDA = 0 OR (PERDIDA_FECHA >= @FECHA AND @YASINCRONIZADO > 0)) AND IDPROSPECTO IN (SELECT IDPROSPECTO FROM '+@BD+'.dbo.PROSPECTOS_ASIGNADOS WITH (NOLOCK) WHERE IDUSUARIO = @IDUSUARIO AND ULTIMAMODIFICACION >= @FECHA)
	ELSE IF(@IDTABLA = 16)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.VENTAS WITH (NOLOCK) where idusuario = @IDUSUARIO AND ULTIMAMODIFICACION >= @FECHA
	ELSE IF(@IDTABLA = 18)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.RECORDATORIOS R WITH (NOLOCK) LEFT JOIN '+@BD+'.dbo.PROSPECTOS P WITH (NOLOCK) ON P.IDPROSPECTO = R.IDPROSPECTO AND P.DESCARTADO = 0 LEFT JOIN '+@BD+'.dbo.OPORTUNIDADES O WITH (NOLOCK) ON O.IDUSUARIO = R.IDUSUARIO AND P.IDPROSPECTO = O.IDPROSPECTO AND O.PERDIDA = 0 AND O.IDOPORTUNIDAD = R.IDOPORTUNIDAD LEFT JOIN '+@BD+'.dbo.PROSPECTOS_ASIGNADOS A WITH (NOLOCK) ON A.IDUSUARIO = R.IDUSUARIO AND A.ARCHIVADO = 0 AND A.IDPROSPECTO = R.IDPROSPECTO WHERE R.IDUSUARIO = @IDUSUARIO AND ((R.ULTIMAMODIFICACION >= @FECHA AND @YASINCRONIZADO > 0) OR (@YASINCRONIZADO = 0 AND R.COMPLETADO = 0))
	ELSE IF(@IDTABLA = 19)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.dbo.ventas V, '+@BD+'.dbo.ventas_COBROS VC WITH (NOLOCK) where V.idusuario = @IDUSUARIO AND VC.IDVENTA = V.IDVENTA AND VC.ULTIMAMODIFICACION >= @FECHA
	ELSE IF(@IDTABLA = 20)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.EMPRESAS_RAZONES_PERDIDA WITH (NOLOCK) where idempresa = @IDEMPRESA AND ULTIMAMODIFICACION >= @FECHA
	ELSE IF(@IDTABLA = 21)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.EMPRESAS_CERTEZAS WITH (NOLOCK) where idempresa = @IDEMPRESA AND ULTIMAMODIFICACION >= @FECHA
	ELSE IF(@IDTABLA = 22)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.EMPRESAS_CAMPOS WITH (NOLOCK) where idempresa = @IDEMPRESA AND ULTIMAMODIFICACION >= @FECHA
	ELSE IF(@IDTABLA = 23)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.EMPRESAS_CAMPOS_OPCIONES ECO WITH (NOLOCK), '+@BD+'.DBO.EMPRESAS_CAMPOS EC WITH (NOLOCK) where EC.idempresa = @IDEMPRESA AND ECO.IDCAMPO = EC.IDCAMPO AND ECO.ULTIMAMODIFICACION >= ''''
	ELSE IF(@IDTABLA = 24)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.EMPRESAS_CAMPOS_CONFIGURACION WITH (NOLOCK) where idempresa = @IDEMPRESA AND ULTIMAMODIFICACION >= @FECHA
	ELSE IF(@IDTABLA = 25)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.COMPANIAS WITH (NOLOCK) where idempresa = @IDEMPRESA AND ULTIMAMODIFICACION >= @FECHA
	ELSE IF(@IDTABLA = 26)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.EMPRESAS_INDUSTRIAS WITH (NOLOCK) where idempresa = @IDEMPRESA AND ULTIMAMODIFICACION >= @FECHA
	ELSE IF(@IDTABLA = 27)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.COMPANIAS_GRUPOS WITH (NOLOCK) where idempresa = @IDEMPRESA AND ULTIMAMODIFICACION >= @FECHA
	ELSE IF(@IDTABLA = 28)
	BEGIN
		DECLARE @CONT INT,@IDGRUPO INT

		SELECT @IDGRUPO = IDGRUPO FROM '+@BD+'.DBO.USUARIOS WITH (NOLOCK) WHERE IDUSUARIO = @IDUSUARIO

		SELECT @CONT=COUNT(UP.IDPLANTILLA) FROM '+@BD+'.DBO.USUARIOS_PLANTILLAS UP WITH (NOLOCK)
		LEFT JOIN '+@BD+'.DBO.USUARIOS U WITH (NOLOCK) ON U.IDUSUARIO=UP.IDUSUARIO 
		WHERE (UP.COMPARTIRCON=@IDGRUPO OR UP.COMPARTIRCON=-1) AND UP.IDUSUARIO != @IDUSUARIO and U.IDEMPRESA=@IDEMPRESA 

		IF @CONT>0 
		BEGIN
	 	  	SELECT @TOTALREGISTROS = SUM(TOTAL) FROM (SELECT COUNT(*) AS TOTAL
		  	FROM '+@BD+'.DBO.USUARIOS_PLANTILLAS UP WITH (NOLOCK)
	  		LEFT JOIN '+@BD+'.DBO.USUARIOS U WITH (NOLOCK) ON U.IDUSUARIO=UP.IDUSUARIO AND U.IDEMPRESA=@IDEMPRESA
	  		WHERE UP.IDUSUARIO = @IDUSUARIO
			UNION ALL
	  		SELECT COUNT(*) AS TOTAL
	  		FROM '+@BD+'.DBO.USUARIOS_PLANTILLAS UP WITH (NOLOCK)
	  		LEFT JOIN '+@BD+'.DBO.USUARIOS U WITH (NOLOCK) ON U.IDUSUARIO=UP.IDUSUARIO 
	  		WHERE (UP.COMPARTIRCON=@IDGRUPO OR UP.COMPARTIRCON=-1) AND UP.IDUSUARIO != @IDUSUARIO and U.IDEMPRESA=@IDEMPRESA AND UP.ULTIMAMODIFICACION >= @FECHA) TOTAL
	 	END
		ELSE
		BEGIN
  	   		SELECT @TOTALREGISTROS = COUNT(*)
	  		FROM '+@BD+'.DBO.USUARIOS_PLANTILLAS UP WITH (NOLOCK)
	  		LEFT JOIN '+@BD+'.DBO.USUARIOS U WITH (NOLOCK) ON U.IDUSUARIO=UP.IDUSUARIO
	  		WHERE UP.IDUSUARIO = @IDUSUARIO and U.IDEMPRESA=@IDEMPRESA AND UP.ULTIMAMODIFICACION >= @FECHA
		END
	END
	ELSE IF(@IDTABLA = 29)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.USUARIOS_MAILCONFIG WITH (NOLOCK) where IDUSUARIO = @IDUSUARIO AND ULTIMAMODIFICACION >= @FECHA
	ELSE IF(@IDTABLA = 30)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.TAREAS WITH (NOLOCK) WHERE (IDREALIZADOR = @IDUSUARIO AND IDINICIADOR != @IDUSUARIO) or (IDINICIADOR = @IDUSUARIO and IDREALIZADOR != @IDUSUARIO) AND ULTIMAMODIFICACION >= @FECHA
	ELSE IF(@IDTABLA = 31)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.dbo.TAREAS_SEGUIMIENTO TS WITH (NOLOCK) JOIN '+@BD+'.dbo.TAREAS T WITH (NOLOCK) ON T.idtarea = ts.idtarea JOIN '+@BD+'.dbo.USUARIOS U WITH (NOLOCK) ON U.IDUSUARIO = TS.IDUSUARIO WHERE TS.IDTAREA = T.IDTAREA and ((t.idrealizador = @IDUSUARIO and t.idiniciador != @IDUSUARIO) or (t.idiniciador = @IDUSUARIO and t.idrealizador != @IDUSUARIO))
	ELSE IF(@IDTABLA = 32)
		SELECT @TOTALREGISTROS = COUNT(*) FROM '+@BD+'.DBO.CITAS CI_AUX WITH (NOLOCK) WHERE CI_AUX.IDCITA IN (SELECT C.IDCITA FROM '+@BD+'.dbo.CITAS C WITH (NOLOCK), '+@BD+'.dbo.CITAS_INVITADOS CI WITH (NOLOCK) WHERE C.ULTIMAMODIFICACION >= @FECHA AND C.IDCITA = CI.IDCITA AND C.IDEMPRESA = @IDEMPRESA AND (C.IDUSUARIO_CREACION = @IDUSUARIO OR CI.idpersona = @IDUSUARIO) GROUP BY C.IDCITA)
	
	UPDATE @TABLATEMP SET TOTALREGISTROS = @TOTALREGISTROS WHERE ID = @TO
	
	SET @TO = @TO + 1
END

DECLARE @TOTALR INT

SELECT @TOTALR = SUM(TOTALREGISTROS) FROM @TABLATEMP WHERE IDTABLA <> 17

UPDATE @TABLATEMP SET TOTALREGISTROS = @TOTALR

SELECT * FROM @TABLATEMP
'
EXEC (@SQL)