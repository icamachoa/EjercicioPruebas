//[tipo_suceso|Integer,tipo_ejecutivo|Integer,tipo_texto|Text,fecha_desdereporte|Text,fecha_hastareporte|Text,session.sessionid|Untyped,session.gmt|Untyped,session.db|Untyped,session.idusuario|Untyped,session.idempresa|Untyped,session.convertcode|Untyped,]
--select

DECLARE @SQL VARCHAR(8000)
DECLARE @TIPO_SUCESO INT = ISNULL(:TIPO_SUCESO,-1)
DECLARE @TIPO_EJECTIVO INT = ISNULL(:TIPO_EJECUTIVO,0)
DECLARE @TIPO_TEXTO VARCHAR(MAX) = ISNULL(:TIPO_TEXTO,'0')
DECLARE @FILTRO_TEXTO VARCHAR(MAX) = ''
DECLARE @FILTRO VARCHAR(MAX) = ''
DECLARE @FECHA_DESDEREPORTE VARCHAR(MAX)
DECLARE @FECHA_HASTAREPORTE VARCHAR(MAX)
DECLARE @REASIGNADO_A VARCHAR(MAX) = ''
DECLARE @LEFT_JOIN VARCHAR(MAX) = ''
SET @FECHA_DESDEREPORTE=ISNULL(:FECHA_DESDEREPORTE,'')
SET @FECHA_HASTAREPORTE=ISNULL(:FECHA_HASTAREPORTE,'')
IF(@TIPO_SUCESO > -1)
BEGIN
	 SET @FILTRO = ' AND US.TIPO = ' + CAST(@TIPO_SUCESO AS VARCHAR(10)) + ' '
END

IF(@TIPO_SUCESO = 5 OR @TIPO_SUCESO = 14) BEGIN
	SET @REASIGNADO_A =  '+'' ''+ UR.NOMBRE+'' ''+ISNULL(UR.APELLIDOS,'''')'
	SET @LEFT_JOIN = 'LEFT JOIN <#SESSION.DB/>.dbo.USUARIOS UR ON '+(CASE
			WHEN @TIPO_SUCESO = 5 THEN 'PR'
			WHEN @TIPO_SUCESO = 14 THEN 'OP'
		END) +'.IDUSUARIO = UR.IDUSUARIO '
END

IF(@TIPO_EJECTIVO > 0)
BEGIN
	 SET @FILTRO = @FILTRO + ' AND US.IDUSUARIO = ' + CAST(@TIPO_EJECTIVO AS VARCHAR(10)) + ' '
END

IF(@TIPO_TEXTO <> '0')
BEGIN
	 SET @FILTRO_TEXTO = ' AND (PR.NOMBRE LIKE ''%'+@TIPO_TEXTO+'%'' OR PR.APELLIDOS LIKE ''%'+@TIPO_TEXTO+'%'' OR US.TEXTO LIKE ''%'+@TIPO_TEXTO+'%'' OR PR.EMPRESA LIKE ''%'+@TIPO_TEXTO+'%'') '
END

DECLARE @SERVIDORIP VARCHAR(16)
SET @SERVIDORIP =  REPLACE(@@SERVERNAME,'-','.')

SELECT @SQL = 'bcp " SELECT  '' EJECUTIVO'' COLLATE DATABASE_DEFAULT , ''FECHA'' COLLATE DATABASE_DEFAULT , ''DESCRIPCI�N'' COLLATE DATABASE_DEFAULT ,''CONTACTO'' COLLATE DATABASE_DEFAULT ,''CORREO'' COLLATE DATABASE_DEFAULT, ''EMPRESA'' COLLATE DATABASE_DEFAULT , ''�LTIMO SEGUIMIENTO'' COLLATE DATABASE_DEFAULT  '
SELECT @SQL = @SQL + ' " queryout C:\FileRepository\exporta\archivos\sucesos-<#SESSION.SESSIONID/>-1.csv   -c -C"Latin1" -t, -T -S'+ @@servername
exec master..xp_cmdshell @sql
SELECT @SQL = ''

SELECT @SQL = 'bcp "   DECLARE @GMT INT '
SELECT @SQL = @SQL + ' SET @GMT = CAST(''<#SESSION.GMT/>'' AS INT ) '
SELECT @SQL = @SQL + ' SELECT @GMT = DIFERENCIA FROM  <#SESSION.DB/>.dbo.V_GMT WHERE GMT= @GMT '
SELECT @SQL = @SQL + ' SELECT * FROM '
SELECT @SQL = @SQL + ' ( ' 
SELECT @SQL = @SQL + ' SELECT SALESUP_CT.DBO.LimpiaPARAEXPORTAR(UU.NOMBRE+'' ''+UU.APELLIDOS + '' (''+UU.INICIALES+'')'') AS EJECUTIVO , '
SELECT @SQL = @SQL + ' SALESUP_CT.DBO.FechaFormato(DATEADD(hh, 6+@GMT, US.FECHAHORA),2) AS FECHA, '
SELECT @SQL = @SQL + ' SALESUP_CT.DBO.LimpiaPARAEXPORTAR(US.TEXTO '+@REASIGNADO_A+') AS TEXTO, '
SELECT @SQL = @SQL + ' SALESUP_CT.DBO.LimpiaPARAEXPORTAR(PR.NOMBRE + '' '' + PR.APELLIDOS) AS CONTACTO, '
SELECT @SQL = @SQL + ' SALESUP_CT.DBO.LimpiaPARAEXPORTAR(PR.CORREO) AS CORREO, '
SELECT @SQL = @SQL + ' SALESUP_CT.DBO.LimpiaPARAEXPORTAR(LEFT(PR.EMPRESA, 32)) AS EMPRESA, '
SELECT @SQL = @SQL + ' CASE WHEN PSS.COMENTARIO IS NULL THEN SALESUP_CT.DBO.LimpiaPARAEXPORTAR(CAST(PS.COMENTARIO AS VARCHAR (max))) ELSE SALESUP_CT.DBO.LimpiaPARAEXPORTAR(CAST(PSS.COMENTARIO AS VARCHAR (max))) END AS COMENTARIO '
SELECT @SQL = @SQL + ' FROM <#SESSION.DB/>.DBO.ObtieneUsuariosAutorizadosModulos (<#SESSION.IDUSUARIO/>,8,0)UL, <#SESSION.DB/>.dbo.USUARIOS_SUCESOS US WITH(NOLOCK) '
SELECT @SQL = @SQL + ' JOIN <#SESSION.DB/>.dbo.USUARIOS UU WITH(NOLOCK) ON US.IDUSUARIO=UU.IDUSUARIO AND IDEMPRESA=<#SESSION.IDEMPRESA/> '
SELECT @SQL = @SQL + ' LEFT JOIN <#SESSION.DB/>.dbo.PROSPECTOS PR WITH(NOLOCK)    ON PR.IDPROSPECTO IS NOT NULL AND US.IDPROSPECTO=PR.IDPROSPECTO AND PR.IDEMPRESA=<#SESSION.IDEMPRESA/> '
SELECT @SQL = @SQL + ' LEFT JOIN <#SESSION.DB/>.dbo.OPORTUNIDADES OP WITH(NOLOCK) ON OP.IDPROSPECTO IS NOT NULL AND US.IDPROSPECTO=OP.IDPROSPECTO AND PR.IDPROSPECTO = OP.IDPROSPECTO AND OP.IDOPORTUNIDAD = US.IDOPORTUNIDAD '
SELECT @SQL = @SQL + @LEFT_JOIN
SELECT @SQL = @SQL + ' LEFT JOIN <#SESSION.DB/>.dbo.PROSPECTOS_SEGUIMIENTO PS WITH(NOLOCK) '
SELECT @SQL = @SQL + ' ON (PR.IDULTIMOSEGUIMIENTO = PS.IDSEGUIMIENTO AND PR.IDPROSPECTO IS NOT NULL AND PS.IDPROSPECTO=PR.IDPROSPECTO AND US.IDOPORTUNIDAD IS NULL) OR '
SELECT @SQL = @SQL + ' (OP.IDULTIMOSEGUIMIENTO = PS.IDSEGUIMIENTO AND PR.IDPROSPECTO IS NOT NULL AND PS.IDPROSPECTO=PR.IDPROSPECTO AND PS.IDOPORTUNIDAD=OP.IDOPORTUNIDAD AND US.IDOPORTUNIDAD IS NOT NULL) '
SELECT @SQL = @SQL + ' LEFT JOIN <#SESSION.DB/>.dbo.PROSPECTOS_SEGUIMIENTO PSS WITH(NOLOCK) '
SELECT @SQL = @SQL + ' ON PSS.IDSEGUIMIENTO = US.IDSEGUIMIENTO '
SELECT @SQL = @SQL + ' LEFT JOIN <#SESSION.DB/>.dbo.VENTAS VE WITH(NOLOCK) ON VE.IDOPORTUNIDAD IS NOT NULL AND OP.IDOPORTUNIDAD=VE.IDOPORTUNIDAD AND VE.IDVENTA = US.IDVENTA '
SELECT @SQL = @SQL + ' WHERE '
SELECT @SQL = @SQL + ' UU.IDEMPRESA=<#SESSION.IDEMPRESA/> '
SELECT @SQL = @SQL + ' AND UL.ID=US.IDUSUARIO '
SELECT @SQL = @SQL + @FILTRO
SELECT @SQL = @SQL + ' AND (<#SESSION.DB/>.DBO.GETONLYDATE(DATEADD(hh, 6+@GMT, US.FECHAHORA)) '
SELECT @SQL = @SQL + ' BETWEEN CONVERT(DATETIME,'''+@FECHA_DESDEREPORTE+''',<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,'''+@FECHA_HASTAREPORTE+''',<#SESSION.CONVERTCODE/>)) '
SELECT @SQL = @SQL + @FILTRO_TEXTO
SELECT @SQL = @SQL + ' ) AS US '
SELECT @SQL = @SQL + ' ORDER BY 1 DESC '
SELECT @SQL = @SQL + ' " queryout C:\FileRepository\exporta\archivos\sucesos-<#SESSION.SESSIONID/>-2.csv   -c -C"Latin1" -t, -T -S'+ @@servername

exec master..xp_cmdshell @sql
SELECT @SQL =  'copy C:\FileRepository\exporta\archivos\sucesos-<#SESSION.SESSIONID/>-1.csv +  C:\FileRepository\exporta\archivos\sucesos-<#SESSION.SESSIONID/>-2.csv C:\FileRepository\exporta\archivos\sucesos-<#SESSION.SESSIONID/>.csv' 
exec master..xp_cmdshell @SQL

--SELECT @SQL AS FILTRO_TEXTO 

