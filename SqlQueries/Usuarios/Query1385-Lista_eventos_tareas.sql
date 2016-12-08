//[session.idusuario|Untyped,session.idempresa|Untyped,idu|Text,fechaactual|Text,r|Integer,session.db|Untyped,condiciontareas|Text,]
--SELECT **NO_SANITIZE**
/*PROTEGIDO*/
DECLARE @MESACTUAL VARCHAR(MAX), @IDREALIZADOR VARCHAR(MAX)
DECLARE @SQL VARCHAR(MAX)
DECLARE @FECHA DATETIME, @FINICIO DATETIME, @FFIN DATETIME
DECLARE @RANGO INT, @IDEMPRESA INT, @SESSIONIDUSUARIO INT
DECLARE @CONDICIONTAREAS VARCHAR(MAX)

SET @SESSIONIDUSUARIO = CAST('<#SESSION.IDUSUARIO/>' AS INT)
SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)
SET @IDREALIZADOR = ISNULL(:IDU,'')
SET @MESACTUAL = ISNULL(:FechaActual,'')
SET @RANGO = ISNULL(:R,0)
SET @CONDICIONTAREAS = ISNULL(:CONDICIONTAREAS,'')

SET @SQL ='
DECLARE @FECHA DATETIME, @FINICIO DATETIME, @FFIN DATETIME, @ESTA INT
DECLARE @IDREALIZADOR VARCHAR(MAX)
DECLARE @IDEMPRESA INT

SET @IDREALIZADOR = '''+@IDREALIZADOR+'''
SET @IDEMPRESA = '+cast(@IDEMPRESA as varchar(1000))+'

IF '''+CAST(@MESACTUAL AS VARCHAR(1000))+''' != ''''
BEGIN
	SET @FECHA = CONVERT(DATETIME, '''+CAST(@MESACTUAL AS VARCHAR(1000))+''', 103 )
	SET @FINICIO = SALESUP_CT.dbo.RangoFecha(0, 5, @FECHA)
	SET @FFIN = SALESUP_CT.dbo.RangoFecha(1, 5, @FECHA)
	SET @FINICIO = DATEADD(dd, -6, @FINICIO)
	SET @FFIN = DATEADD(dd, 6, @FFIN)
END
ELSE
BEGIN
	SET @FINICIO = SALESUP_CT.dbo.RangoFecha(0, '+CAST(@RANGO AS VARCHAR(1000))+', NULL)
	SET @FFIN = SALESUP_CT.dbo.RangoFecha(1,'+CAST(@RANGO AS VARCHAR(1000))+', NULL)
END

SELECT @ESTA = CASE WHEN COUNT(SPLITVALUE)=1 THEN 1 ELSE 0 END FROM SALESUP_CT.dbo.SPLIT(@IDREALIZADOR,'','') WHERE SPLITVALUE = '+CAST(@SESSIONIDUSUARIO AS VARCHAR(1000))+'

SELECT ''1'' AS Tarea, 3 AS Tipo, 
CASE @ESTA WHEN 1 THEN ''#1D4598'' ELSE ''#27A0C9'' END AS color,
''T''+CAST(T.IDTAREA AS VARCHAR(MAX)) AS id, ''<i class="fa fa-share-square"></i> <span class="Iniciales">(''+ U.INICIALES+'')</span> '' + T.TITULO AS title,
''Pointer EventoTareas T''+CONVERT(VARCHAR(MAX),U.IDUSUARIO)+'' IDT''+CAST(T.IDTAREA AS VARCHAR(MAX)) AS className, SALESUP_CT.DBO.Fecha(T.FECHA_VENCIMIENTO) AS start,  SALESUP_CT.DBO.Fecha(T.FECHA_VENCIMIENTO_REALIZADOR) AS startRealizador , 
SALESUP_CT.dbo.ObtieneHora(T.FECHA_VENCIMIENTO) as Hora, SALESUP_CT.dbo.ObtieneHora(T.FECHA_VENCIMIENTO_REALIZADOR) as HoraRealizador, CONVERT(VARCHAR(10), T.FECHA_VENCIMIENTO ,103) as Fecha ,CONVERT(VARCHAR(10), T.FECHA_VENCIMIENTO_REALIZADOR ,103) as FechaRealizador , 
TS.COMENTARIO AS Descripcion, VT.Estado, FECHA_CREACION AS CreadoEl, P.NOMBRE + '' ''+ ISNULL(P.APELLIDOS,'''') AS Prospecto, 
U.NOMBRE + '' ''+ U.APELLIDOS AS Responsable, U.INICIALES AS Para, U.NOMBRE + '' ''+ U.APELLIDOS AS NomPara,
U1.INICIALES AS De, U1.NOMBRE + '' ''+ U1.APELLIDOS AS NomDe,
(CASE WHEN T.IDPADRE IS NOT NULL AND T.RECURRENCIA>0 THEN ''1'' ELSE '''' END) AS tPadre,
CASE WHEN T.FECHA_VENCIMIENTO <= GETDATE() THEN ''1'' ELSE '''' END AS Vencido,
CASE WHEN T.IDINICIADOR = '+CAST(@SESSIONIDUSUARIO AS VARCHAR(1000))+' THEN ''1'' ELSE '''' END Editar,
P.IdCompania, CASE WHEN ISNULL(P.IDCOMPANIA,0)=0 THEN P.EMPRESA ELSE COM.EMPRESA END AS Empresa, U.IDUSUARIO AS Idu, T.TKTR AS Tk,
COM.TkCom, P.Tkp, P.IdProspecto, O.IdOportunidad, O.Tko, '''' AS EsCliente,''1'' AS Acciones, CONVERT(FLOAT, T.FECHA_VENCIMIENTO) AS DTF
FROM <#SESSION.DB/>.dbo.TAREAS T WITH(NOLOCK)
JOIN <#SESSION.DB/>.dbo.TAREAS_SEGUIMIENTO TS WITH(NOLOCK) ON TS.IDTAREASEGUIMIENTO = T.IDTAREASEGUIMIENTO
JOIN <#SESSION.DB/>.dbo.USUARIOS U WITH(NOLOCK) ON U.IDUSUARIO = T.IDREALIZADOR
JOIN <#SESSION.DB/>.dbo.USUARIOS U1 WITH(NOLOCK) ON U1.IDUSUARIO = T.IDINICIADOR
JOIN SALESUP_CT.dbo.V_TAREAS_ESTADOS VT ON VT.IDESTADO = T.IDESTADO /*AND VT.IDESTADO NOT IN(3,4)*/
LEFT JOIN <#SESSION.DB/>.dbo.PROSPECTOS P WITH(NOLOCK) ON P.IDPROSPECTO = T.IDPROSPECTO
LEFT JOIN <#SESSION.DB/>.dbo.OPORTUNIDADES O WITH(NOLOCK) ON  O.IDOPORTUNIDAD = T.IDOPORTUNIDAD
LEFT JOIN <#SESSION.DB/>.dbo.COMPANIAS COM WITH(NOLOCK) ON COM.IDCOMPANIA = P.IDCOMPANIA
JOIN <#SESSION.DB/>.dbo.ObtieneUsuariosAutorizadosModulos ('+CAST(@SESSIONIDUSUARIO AS VARCHAR(1000))+', 6, 0) UP ON U.IDUSUARIo = UP.ID

WHERE 1 = 1 AND U.IDEMPRESA = @IDEMPRESA
'+@CONDICIONTAREAS+'
ORDER BY DTF
'
EXEC(@SQL) 