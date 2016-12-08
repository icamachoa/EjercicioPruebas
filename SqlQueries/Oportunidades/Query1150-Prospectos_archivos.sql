//[idprospecto|Integer,idoportunidad|Integer,idventa|Integer,tkp|Text,tko|Text,tkv|Text,session.db|Untyped,session.idempresa|Untyped,session.gmt|Untyped,]
--select
DECLARE @IDPROSPECTO INT, @IDOPORTUNIDAD INT, @IDVENTA INT, @GMT INT
SET @IDPROSPECTO=CAST(ISNULL(:IDPROSPECTO,0) AS INT)
SET @IDOPORTUNIDAD=CAST(ISNULL(ISNULL(:idoportunidad,0),0) AS INT)
SET @IDVENTA=CAST(ISNULL(:IDVENTA,0) AS INT)
SET @GMT = CAST('<#SESSION.GMT/>' AS INT )

DECLARE @TKP VARCHAR(64), @TKO VARCHAR(64), @TKV VARCHAR(64)

SET @TKP = ISNULL(:TKP, '')
SET @TKO = ISNULL(:TKO, '')
SET @TKV = ISNULL(:TKV, '')

IF @TKP != '' BEGIN SET @IDPROSPECTO = <#SESSION.DB/>.dbo.obtieneIdProspecto(@TKP,<#SESSION.IDEMPRESA/> ) END
IF @TKO != '' BEGIN SET @IDOPORTUNIDAD = <#SESSION.DB/>.dbo.obtieneIdOportunidad(@TKO) END
IF @TKV != '' BEGIN SELECT @IDVENTA = IDVENTA FROM <#SESSION.DB/>.dbo.VENTAS WHERE TKV = @TKV END
IF @IDOPORTUNIDAD > 0 
BEGIN 
	  SELECT @IDPROSPECTO = O.IDPROSPECTO, @TKP = P.TKP 
	  FROM <#SESSION.DB/>.DBO.OPORTUNIDADES O, <#SESSION.DB/>.DBO.PROSPECTOS P 
	  WHERE O.IDOPORTUNIDAD = @IDOPORTUNIDAD AND  O.IDPROSPECTO = P.IDPROSPECTO 
END


IF @IDOPORTUNIDAD != 0 
BEGIN
   IF @IDVENTA != 0
   BEGIN
	SELECT @TKP AS TKP, @TKO AS TKO, @TKV AS TKV, cast(PAR.TKARCH as varchar(64)) as tk, IDPROSPECTOARCHIVO, Par.IDPROSPECTO,IDOPORTUNIDAD,AMAZON,ARCHIVO,<#SESSION.DB/>.DBO.NOMBRE_ARCHIVO_REAL_PROSPECTOS(ARCHIVO) AS ARCHIVO_REAL,
	(CASE WHEN PESO=0 THEN '' WHEN  PESO<1048576 THEN  CAST(ROUND(PESO/1024,2) AS VARCHAR(1000))+' KB' ELSE CAST(ROUND(PESO/1048576,2) AS VARCHAR(1000))+' MB' END) AS PESO,
	SALESUP_CT.dbo.obtieneFechaRealGMT(@GMT,FECHA) AS FECHA,PAR.IDUSUARIO,
	ISNULL(U.INICIALES, '--') AS INICIALES, U.NOMBRE + ' ' + ISNULL(U.APELLIDOS, '') AS EJECUTIVO_NOMBRE,
	(CASE WHEN IDOPORTUNIDAD IS NULL THEN 'Cliente' ELSE 'Oportunidad' END) AS ORIGEN,
	SALESUP_CT.DBO.IconoArchivo (ARCHIVO,0) AS ICONO,
	SALESUP_CT.DBO.SoloIconoArchivo (ARCHIVO,0) AS SOLOICONO , 
	CASE <#SESSION.DB/>.dbo.obtiene_extension(ARCHIVO)
	WHEN 'png' THEN 1 WHEN 'jpg' THEN 1 WHEN 'jpeg' THEN 1
	WHEN 'bmp' THEN 1 WHEN 'pdf' THEN 1 WHEN 'txt' THEN 1
	ELSE 0 END VERARCHIVO,
	@IDVENTA AS IDVENTA, @IDPROSPECTO AS IDPROSPECTOd, @IDOPORTUNIDAD AS idoportunidadd, @TKP AS tkp, @TKO AS tko, @TKV AS tkv
	FROM <#SESSION.DB/>.DBO.PROSPECTOS_ARCHIVOS PAR	
	LEFT JOIN <#SESSION.DB/>.DBO.USUARIOS U ON U.IDUSUARIO = PAR.IDUSUARIO
	WHERE PAR.IDPROSPECTO = @IDPROSPECTO AND PAR.IDOPORTUNIDAD = @IDOPORTUNIDAD  
	ORDER BY FECHA DESC
  END  
  ELSE
  BEGIN
	SELECT @TKP AS TKP, @TKO AS TKO, @TKV AS TKV,cast(PAR.TKARCH as varchar(64)) as tk, IDPROSPECTOARCHIVO,IDPROSPECTO,IDOPORTUNIDAD,AMAZON,ARCHIVO,<#SESSION.DB/>.DBO.NOMBRE_ARCHIVO_REAL_PROSPECTOS(ARCHIVO) AS ARCHIVO_REAL,
	(CASE WHEN PESO=0 THEN '' WHEN  PESO<1048576 THEN  CAST(ROUND(PESO/1024,2) AS VARCHAR(1000))+' KB' ELSE CAST(ROUND(PESO/1048576,2) AS VARCHAR(1000))+' MB' END) AS PESO,
	SALESUP_CT.dbo.obtieneFechaRealGMT(@GMT,FECHA) AS FECHA,PAR.IDUSUARIO,
	ISNULL(U.INICIALES, '--') AS INICIALES, U.NOMBRE + ' ' + ISNULL(U.APELLIDOS, '') AS EJECUTIVO_NOMBRE,
	(CASE WHEN IDOPORTUNIDAD IS NULL THEN 'Prospecto' ELSE 'Oportunidad' END) AS ORIGEN,
	SALESUP_CT.DBO.IconoArchivo (ARCHIVO,0) AS ICONO,
	SALESUP_CT.DBO.SoloIconoArchivo (ARCHIVO,0) AS SOLOICONO ,
	CASE <#SESSION.DB/>.dbo.obtiene_extension(ARCHIVO)
	WHEN 'png' THEN 1 WHEN 'jpg' THEN 1 WHEN 'jpeg' THEN 1
	WHEN 'bmp' THEN 1 WHEN 'pdf' THEN 1 WHEN 'txt' THEN 1
	ELSE 0 END VERARCHIVO,
	@IDVENTA AS IDVENTA, @IDPROSPECTO AS IDPROSPECTOd, @IDOPORTUNIDAD AS idoportunidadd, @TKP AS tkp, @TKO AS tko, @TKV AS tkv
	FROM <#SESSION.DB/>.DBO.PROSPECTOS_ARCHIVOS PAR 
	LEFT JOIN <#SESSION.DB/>.DBO.USUARIOS U ON U.IDUSUARIO = PAR.IDUSUARIO
	WHERE PAR.IDPROSPECTO = @IDPROSPECTO AND ( (PAR.IDOPORTUNIDAD=@IDOPORTUNIDAD) OR (PAR.IDOPORTUNIDAD IS NULL) )	  
	ORDER BY FECHA DESC
  END
END   
ELSE
BEGIN 
	SELECT @TKP AS TKP, @TKO AS TKO, @TKV AS TKV, cast(PAR.TKARCH as varchar(64)) as tk, IDPROSPECTOARCHIVO,IDPROSPECTO,IDOPORTUNIDAD,AMAZON,ARCHIVO,<#SESSION.DB/>.DBO.NOMBRE_ARCHIVO_REAL_PROSPECTOS(ARCHIVO) AS ARCHIVO_REAL,
	(CASE WHEN PESO=0 THEN '' WHEN  PESO<1048576 THEN  CAST(ROUND(PESO/1024,2) AS VARCHAR(1000))+' KB' ELSE CAST(ROUND(PESO/1048576,2) AS VARCHAR(1000))+' MB' END) AS PESO,
	SALESUP_CT.dbo.obtieneFechaRealGMT(@GMT,FECHA) AS FECHA,PAR.IDUSUARIO,ISNULL(U.INICIALES, '--') AS INICIALES,
	U.NOMBRE+' '+U.APELLIDOS AS EJECUTIVO_NOMBRE,
	'Prospecto' AS ORIGEN,
	SALESUP_CT.DBO.IconoArchivo (ARCHIVO,0) AS ICONO, SALESUP_CT.DBO.SoloIconoArchivo (ARCHIVO,0) AS SOLOICONO ,
	CASE <#SESSION.DB/>.dbo.obtiene_extension(ARCHIVO)
	WHEN 'png' THEN 1 WHEN 'jpg' THEN 1 WHEN 'jpeg' THEN 1
	WHEN 'bmp' THEN 1 WHEN 'pdf' THEN 1 WHEN 'txt' THEN 1
	ELSE 0 END VERARCHIVO,
	@IDVENTA AS IDVENTA, @IDPROSPECTO AS IDPROSPECTOd, @IDOPORTUNIDAD AS idoportunidadd, @TKP AS tkp, @TKO AS tko, @TKV AS tkv
	FROM <#SESSION.DB/>.DBO.PROSPECTOS_ARCHIVOS PAR
	LEFT JOIN <#SESSION.DB/>.DBO.USUARIOS U ON U.IDUSUARIO = PAR.IDUSUARIO
	WHERE PAR.IDPROSPECTO = @IDPROSPECTO AND PAR.IDOPORTUNIDAD IS NULL
	ORDER BY FECHA DESC
END

