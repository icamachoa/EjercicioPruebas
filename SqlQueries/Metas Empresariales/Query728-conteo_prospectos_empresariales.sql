//[metas|Integer,session.db|Untyped,session.idempresa|Untyped,session.convertcode|Untyped,]
--select

DECLARE @TIPO INT
DECLARE @IDGRUPO INT
DECLARE @IDUSUARIO INT
DECLARE @INICIO VARCHAR(233)
DECLARE @FIN VARCHAR(233)
DECLARE @IDPROSPECTO INT
DECLARE @IDLINEA INT
DECLARE @IDMETA INT

SET @IDMETA=ISNULL(:METAS,0)

IF(@IDMETA <> 0)
BEGIN
SELECT @TIPO=TIPO, @IDGRUPO=IDGRUPO,@IDUSUARIO=IDUSUARIO, @IDPROSPECTO = IDPROSPECTO, @IDLINEA = IDLINEA, @INICIO=INICIO, @FIN=FIN FROM <#SESSION.DB/>.DBO.USUARIOS_METAS WHERE IDMETA=@IDMETA

IF @TIPO=100
SELECT count(IDPROSPECTO) AS TOTALN,@IDMETA AS METAS FROM <#SESSION.DB/>.DBO.PROSPECTOS P WHERE P.IDEMPRESA=<#SESSION.IDEMPRESA/> AND P.DESCARTADO=0 AND P.ESOPORTUNIDAD=0 AND (P.IMPORTADODESDE = 0 OR P.IMPORTADODESDE = 1) AND <#SESSION.DB/>.DBO.GETONLYDATE(P.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF @TIPO=101
SELECT COUNT(IDPROSPECTO) AS TOTALN,@IDMETA AS METAS FROM <#SESSION.DB/>.DBO.PROSPECTOS P LEFT JOIN <#SESSION.DB/>.DBO.USUARIOS U ON P.IDUSUARIO=U.IDUSUARIO WHERE P.IDEMPRESA=<#SESSION.IDEMPRESA/> AND U.IDGRUPO = @IDGRUPO AND P.DESCARTADO=0 AND (P.IMPORTADODESDE = 0 OR P.IMPORTADODESDE = 1) AND <#SESSION.DB/>.DBO.GETONLYDATE(P.FECHAHORA) BETWEEN <#SESSION.DB/>.DBO.GETONLYDATE(CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>)) AND <#SESSION.DB/>.DBO.GETONLYDATE(CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>))

IF @TIPO=102
SELECT COUNT(IDPROSPECTO) AS TOTALN,@IDMETA AS METAS FROM <#SESSION.DB/>.DBO.PROSPECTOS P WHERE P.IDUSUARIO=@IDUSUARIO AND P.DESCARTADO=0 AND (P.IMPORTADODESDE = 0 OR P.IMPORTADODESDE = 1) AND <#SESSION.DB/>.DBO.GETONLYDATE(P.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO=200)OR(@TIPO=203)OR(@TIPO=206)
SELECT COUNT(IDOPORTUNIDAD) AS TOTALN, SUM(O.MONTO)AS MONTITO, AVG(O.MONTO) AS PROMEDIO,@IDMETA AS METAS FROM <#SESSION.DB/>.DBO.OPORTUNIDADES O, <#SESSION.DB/>.DBO.USUARIOS U WHERE O.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND <#SESSION.DB/>.DBO.GETONLYDATE(O.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO=201)OR(@TIPO=204)OR(@TIPO=207)
SELECT COUNT(IDOPORTUNIDAD) AS TOTALN, SUM(O.MONTO)AS MONTITO, AVG(O.MONTO) AS PROMEDIO,@IDMETA AS METAS FROM <#SESSION.DB/>.DBO.OPORTUNIDADES O, <#SESSION.DB/>.DBO.USUARIOS U WHERE O.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND U.IDGRUPO=@IDGRUPO AND <#SESSION.DB/>.DBO.GETONLYDATE(O.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO=202)OR(@TIPO=205)OR(@TIPO=208)
SELECT COUNT(IDOPORTUNIDAD) AS TOTALN, SUM(O.MONTO)AS MONTITO, AVG(O.MONTO) AS PROMEDIO,@IDMETA AS METAS FROM <#SESSION.DB/>.DBO.OPORTUNIDADES O, <#SESSION.DB/>.DBO.USUARIOS U WHERE O.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND U.IDUSUARIO=@IDUSUARIO AND <#SESSION.DB/>.DBO.GETONLYDATE(O.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO=300)OR(@TIPO=303)OR(@TIPO=306)OR(@TIPO=403)OR(@TIPO=512)
SELECT COUNT(IDVENTA) AS TOTALN,@IDMETA AS METAS, ISNULL(SUM (V.MONTO),0)AS MONTITO, AVG(V.MONTO) AS PROMEDIO, ISNULL(SUM(V.COMISION),0) AS TOTALCOMISIONES FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.USUARIOS U WHERE V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND <#SESSION.DB/>.DBO.GETONLYDATE(V.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO=301)OR(@TIPO=304)OR(@TIPO=307)OR(@TIPO=404)OR(@TIPO=511)
SELECT COUNT(IDVENTA) AS TOTALN,@IDMETA AS METAS, ISNULL(SUM (V.MONTO),0)AS MONTITO, AVG(V.MONTO) AS PROMEDIO, ISNULL(SUM(V.COMISION),0) AS TOTALCOMISIONES FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.USUARIOS U WHERE V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND U.IDGRUPO=@IDGRUPO AND <#SESSION.DB/>.DBO.GETONLYDATE(V.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO=302)OR(@TIPO=305)OR(@TIPO=308)OR(@TIPO=405)OR(@TIPO = 510)
SELECT COUNT(IDVENTA) AS TOTALN,@IDMETA AS METAS, ISNULL(SUM (V.MONTO),0)AS MONTITO, AVG(V.MONTO) AS PROMEDIO, ISNULL(SUM(V.COMISION),0) AS TOTALCOMISIONES FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.USUARIOS U WHERE V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND U.IDUSUARIO=@IDUSUARIO AND <#SESSION.DB/>.DBO.GETONLYDATE(V.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO = 513)
SELECT COUNT(V.IDVENTA) AS TOTALN,@IDMETA AS METAS, ISNULL(SUM (VC.MONTO),0)AS MONTITO, AVG(VC.MONTO) AS PROMEDIO, ISNULL(SUM(VC.COMISION),0) AS TOTALCOMISIONES FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.VENTAS_COBROS VC, <#SESSION.DB/>.DBO.USUARIOS U WHERE V.IDVENTA = VC.IDVENTA AND VC.PAGADO = 1 AND V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND U.IDUSUARIO=@IDUSUARIO AND <#SESSION.DB/>.DBO.GETONLYDATE(VC.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO = 514)
SELECT COUNT(V.IDVENTA) AS TOTALN,@IDMETA AS METAS, ISNULL(SUM (VC.MONTO),0)AS MONTITO, AVG(VC.MONTO) AS PROMEDIO, ISNULL(SUM(VC.COMISION),0) AS TOTALCOMISIONES FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.VENTAS_COBROS VC, <#SESSION.DB/>.DBO.USUARIOS U WHERE V.IDVENTA = VC.IDVENTA AND VC.PAGADO = 1 AND V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND U.IDGRUPO=@IDGRUPO AND <#SESSION.DB/>.DBO.GETONLYDATE(VC.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO = 515)
SELECT COUNT(V.IDVENTA) AS TOTALN,@IDMETA AS METAS, ISNULL(SUM (VC.MONTO),0)AS MONTITO, AVG(VC.MONTO) AS PROMEDIO, ISNULL(SUM(VC.COMISION),0) AS TOTALCOMISIONES FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.VENTAS_COBROS VC, <#SESSION.DB/>.DBO.USUARIOS U WHERE V.IDVENTA = VC.IDVENTA AND VC.PAGADO = 1 AND V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND <#SESSION.DB/>.DBO.GETONLYDATE(VC.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO=309)
SELECT COUNT(IDVENTA) AS TOTALN,@IDMETA AS METAS, ISNULL(SUM (V.MONTO),0)AS MONTITO, AVG(V.MONTO) AS PROMEDIO FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.OPORTUNIDADES O, <#SESSION.DB/>.DBO.PROSPECTOS P, <#SESSION.DB/>.DBO.OPORTUNIDADES_FASES F, 
<#SESSION.DB/>.DBO.USUARIOS U, <#SESSION.DB/>.DBO.EMPRESAS_LINEAS_PRODUCTO LP
WHERE V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND V.IDOPORTUNIDAD=O.IDOPORTUNIDAD 
AND O.IDPROSPECTO = P.IDPROSPECTO AND O.IDFASE = F.IDFASE AND O.IDLINEA_PRODUCTO = LP.IDLINEA_PRODUCTO AND U.IDUSUARIO=@IDUSUARIO AND P.IDPROSPECTO = @IDPROSPECTO
AND <#SESSION.DB/>.DBO.GETONLYDATE(V.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO=310)
SELECT COUNT(IDVENTA) AS TOTALN,@IDMETA AS METAS, ISNULL(SUM (V.MONTO),0)AS MONTITO, AVG(V.MONTO) AS PROMEDIO FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.OPORTUNIDADES O, <#SESSION.DB/>.DBO.PROSPECTOS P, <#SESSION.DB/>.DBO.OPORTUNIDADES_FASES F, 
<#SESSION.DB/>.DBO.USUARIOS U, <#SESSION.DB/>.DBO.EMPRESAS_LINEAS_PRODUCTO LP
WHERE V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND V.IDOPORTUNIDAD=O.IDOPORTUNIDAD 
AND O.IDPROSPECTO = P.IDPROSPECTO AND O.IDFASE = F.IDFASE AND O.IDLINEA_PRODUCTO = LP.IDLINEA_PRODUCTO AND U.IDGRUPO=@IDGRUPO AND P.IDPROSPECTO = @IDPROSPECTO
AND <#SESSION.DB/>.DBO.GETONLYDATE(V.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO=311)
SELECT COUNT(IDVENTA) AS TOTALN,@IDMETA AS METAS, ISNULL(SUM (V.MONTO),0)AS MONTITO, AVG(V.MONTO) AS PROMEDIO FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.OPORTUNIDADES O, <#SESSION.DB/>.DBO.PROSPECTOS P, <#SESSION.DB/>.DBO.OPORTUNIDADES_FASES F, 
<#SESSION.DB/>.DBO.USUARIOS U, <#SESSION.DB/>.DBO.EMPRESAS_LINEAS_PRODUCTO LP
WHERE V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND V.IDOPORTUNIDAD=O.IDOPORTUNIDAD 
AND O.IDPROSPECTO = P.IDPROSPECTO AND O.IDFASE = F.IDFASE AND O.IDLINEA_PRODUCTO = LP.IDLINEA_PRODUCTO AND P.IDPROSPECTO = @IDPROSPECTO
AND <#SESSION.DB/>.DBO.GETONLYDATE(V.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO=312)
SELECT COUNT(IDVENTA) AS TOTALN,@IDMETA AS METAS, ISNULL(SUM (V.MONTO),0)AS MONTITO, AVG(V.MONTO) AS PROMEDIO FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.OPORTUNIDADES O, <#SESSION.DB/>.DBO.PROSPECTOS P, <#SESSION.DB/>.DBO.OPORTUNIDADES_FASES F, 
<#SESSION.DB/>.DBO.USUARIOS U, <#SESSION.DB/>.DBO.EMPRESAS_LINEAS_PRODUCTO LP
WHERE V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND V.IDOPORTUNIDAD=O.IDOPORTUNIDAD 
AND O.IDPROSPECTO = P.IDPROSPECTO AND O.IDFASE = F.IDFASE AND O.IDLINEA_PRODUCTO = LP.IDLINEA_PRODUCTO AND U.IDUSUARIO=@IDUSUARIO AND O.IDLINEA_PRODUCTO = @IDLINEA
AND <#SESSION.DB/>.DBO.GETONLYDATE(V.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO=313)
SELECT COUNT(IDVENTA) AS TOTALN,@IDMETA AS METAS, ISNULL(SUM (V.MONTO),0)AS MONTITO, AVG(V.MONTO) AS PROMEDIO FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.OPORTUNIDADES O, <#SESSION.DB/>.DBO.PROSPECTOS P, <#SESSION.DB/>.DBO.OPORTUNIDADES_FASES F, 
<#SESSION.DB/>.DBO.USUARIOS U, <#SESSION.DB/>.DBO.EMPRESAS_LINEAS_PRODUCTO LP
WHERE V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND V.IDOPORTUNIDAD=O.IDOPORTUNIDAD 
AND O.IDPROSPECTO = P.IDPROSPECTO AND O.IDFASE = F.IDFASE AND O.IDLINEA_PRODUCTO = LP.IDLINEA_PRODUCTO AND U.IDGRUPO=@IDGRUPO AND O.IDLINEA_PRODUCTO = @IDLINEA
AND <#SESSION.DB/>.DBO.GETONLYDATE(V.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO=314)
SELECT COUNT(IDVENTA) AS TOTALN,@IDMETA AS METAS, ISNULL(SUM (V.MONTO),0)AS MONTITO, AVG(V.MONTO) AS PROMEDIO FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.OPORTUNIDADES O, <#SESSION.DB/>.DBO.PROSPECTOS P, <#SESSION.DB/>.DBO.OPORTUNIDADES_FASES F, 
<#SESSION.DB/>.DBO.USUARIOS U, <#SESSION.DB/>.DBO.EMPRESAS_LINEAS_PRODUCTO LP
WHERE V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND V.IDOPORTUNIDAD=O.IDOPORTUNIDAD 
AND O.IDPROSPECTO = P.IDPROSPECTO AND O.IDFASE = F.IDFASE AND O.IDLINEA_PRODUCTO = LP.IDLINEA_PRODUCTO AND O.IDLINEA_PRODUCTO = @IDLINEA
AND <#SESSION.DB/>.DBO.GETONLYDATE(V.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO=400)
SELECT COUNT(IDPROSPECTO) AS TOTALN,@IDMETA AS METAS FROM <#SESSION.DB/>.DBO.PROSPECTOS P WHERE P.IDEMPRESA=<#SESSION.IDEMPRESA/> AND P.DESCARTADO=0 AND P.ESCLIENTE=1 AND <#SESSION.DB/>.DBO.GETONLYDATE(P.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO=401)
BEGIN
SELECT COUNT(P.IDPROSPECTO) AS TOTALN,@IDMETA AS METAS
FROM <#SESSION.DB/>.DBO.PROSPECTOS_ORIGENES PO JOIN <#SESSION.DB/>.DBO.PROSPECTOS P  ON P.IDORIGEN = PO.IDORIGEN 
     LEFT JOIN <#SESSION.DB/>.DBO.OPORTUNIDADES O
     LEFT JOIN <#SESSION.DB/>.DBO.VENTAS V ON  O.IDOPORTUNIDAD = V.IDOPORTUNIDAD 
     JOIN  <#SESSION.DB/>.DBO.USUARIOS U ON V.IDUSUARIO = U.IDUSUARIO ON P.IDPROSPECTO = O.IDPROSPECTO
	 JOIN (SELECT MIN(V.FECHAHORA) AS FECHA_CLIENTE, P.IDPROSPECTO FROM <#SESSION.DB/>.DBO.PROSPECTOS P WITH(NOLOCK), <#SESSION.DB/>.DBO.OPORTUNIDADES O WITH(NOLOCK), <#SESSION.DB/>.DBO.VENTAS V WITH(NOLOCK), <#SESSION.DB/>.DBO.USUARIOS U WITH(NOLOCK)
	 WHERE U.IDEMPRESA=<#SESSION.IDEMPRESA/> AND V.IDUSUARIO = U.IDUSUARIO AND U.IDGRUPO = @IDGRUPO AND P.DESCARTADO=0 AND P.ESCLIENTE=1 AND O.GANADA = 1 AND O.IDPROSPECTO = P.IDPROSPECTO AND O.IDOPORTUNIDAD = V.IDOPORTUNIDAD GROUP BY P.IDPROSPECTO) AS T 
	 ON V.FECHAHORA = T.FECHA_CLIENTE AND P.IDPROSPECTO = T.IDPROSPECTO
	 WHERE P.IDEMPRESA=<#SESSION.IDEMPRESA/> AND V.IDUSUARIO = U.IDUSUARIO AND U.IDGRUPO = @IDGRUPO AND P.DESCARTADO=0 AND P.ESCLIENTE=1
	 AND <#SESSION.DB/>.DBO.GETONLYDATE(V.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)
END

IF (@TIPO=402)
BEGIN
SELECT COUNT(P.IDPROSPECTO) AS TOTALN,@IDMETA AS METAS
FROM <#SESSION.DB/>.DBO.PROSPECTOS_ORIGENES PO JOIN <#SESSION.DB/>.DBO.PROSPECTOS P  ON P.IDORIGEN = PO.IDORIGEN 
     LEFT JOIN <#SESSION.DB/>.DBO.OPORTUNIDADES O
     LEFT JOIN <#SESSION.DB/>.DBO.VENTAS V ON  O.IDOPORTUNIDAD = V.IDOPORTUNIDAD 
     JOIN  <#SESSION.DB/>.DBO.USUARIOS U ON V.IDUSUARIO = U.IDUSUARIO ON P.IDPROSPECTO = O.IDPROSPECTO
	 JOIN (SELECT MIN(V.FECHAHORA) AS FECHA_CLIENTE, P.IDPROSPECTO FROM <#SESSION.DB/>.DBO.PROSPECTOS P WITH(NOLOCK), <#SESSION.DB/>.DBO.OPORTUNIDADES O WITH(NOLOCK), <#SESSION.DB/>.DBO.VENTAS V WITH(NOLOCK), <#SESSION.DB/>.DBO.USUARIOS U WITH(NOLOCK)
	 WHERE V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND V.IDUSUARIO=@IDUSUARIO AND P.DESCARTADO=0 AND P.ESCLIENTE=1 AND O.GANADA = 1 AND O.IDPROSPECTO = P.IDPROSPECTO AND O.IDOPORTUNIDAD = V.IDOPORTUNIDAD GROUP BY P.IDPROSPECTO) AS T
	 ON V.FECHAHORA = T.FECHA_CLIENTE AND P.IDPROSPECTO = T.IDPROSPECTO
	 WHERE V.IDUSUARIO=@IDUSUARIO AND P.DESCARTADO=0 AND P.ESCLIENTE=1 
	 AND <#SESSION.DB/>.DBO.GETONLYDATE(V.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)
END

IF (@TIPO=500)OR(@TIPO=503)OR(@TIPO=506)
BEGIN
SELECT COUNT(P.IDPROSPECTO) AS TOTALN,@IDMETA AS METAS,SUM(VC.MONTO)AS MONTITO FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.OPORTUNIDADES O, <#SESSION.DB/>.DBO.PROSPECTOS P, <#SESSION.DB/>.DBO.OPORTUNIDADES_FASES F, <#SESSION.DB/>.DBO.USUARIOS U, <#SESSION.DB/>.DBO.EMPRESAS_LINEAS_PRODUCTO LP,<#SESSION.DB/>.DBO.VENTAS_COBROS VC WHERE V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND V.IDOPORTUNIDAD=O.IDOPORTUNIDAD AND V.IDVENTA = VC.IDVENTA AND VC.PAGADO = 1 AND O.IDPROSPECTO = P.IDPROSPECTO AND O.IDFASE = F.IDFASE  AND U.IDUSUARIO=@IDUSUARIO AND O.IDLINEA_PRODUCTO = LP.IDLINEA_PRODUCTO AND <#SESSION.DB/>.DBO.GETONLYDATE(VC.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)
END

IF (@TIPO=501)OR(@TIPO=504)OR(@TIPO=507)
BEGIN
SELECT COUNT(P.IDPROSPECTO) AS TOTALN,@IDMETA AS METAS,SUM(VC.MONTO)AS MONTITO FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.OPORTUNIDADES O, <#SESSION.DB/>.DBO.PROSPECTOS P, <#SESSION.DB/>.DBO.OPORTUNIDADES_FASES F, <#SESSION.DB/>.DBO.USUARIOS U, <#SESSION.DB/>.DBO.EMPRESAS_LINEAS_PRODUCTO LP,<#SESSION.DB/>.DBO.VENTAS_COBROS VC WHERE V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND V.IDOPORTUNIDAD=O.IDOPORTUNIDAD AND V.IDVENTA = VC.IDVENTA AND VC.PAGADO = 1 AND O.IDPROSPECTO = P.IDPROSPECTO AND O.IDFASE = F.IDFASE AND O.IDLINEA_PRODUCTO = LP.IDLINEA_PRODUCTO AND U.IDGRUPO=@IDGRUPO AND <#SESSION.DB/>.DBO.GETONLYDATE(VC.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)
END

IF (@TIPO=502)OR(@TIPO=505)OR(@TIPO=508)
BEGIN
SELECT COUNT(P.IDPROSPECTO) AS TOTALN,@IDMETA AS METAS,SUM(VC.MONTO)AS MONTITO FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.OPORTUNIDADES O, <#SESSION.DB/>.DBO.PROSPECTOS P, <#SESSION.DB/>.DBO.OPORTUNIDADES_FASES F, <#SESSION.DB/>.DBO.USUARIOS U, <#SESSION.DB/>.DBO.EMPRESAS_LINEAS_PRODUCTO LP,<#SESSION.DB/>.DBO.VENTAS_COBROS VC WHERE V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND V.IDOPORTUNIDAD=O.IDOPORTUNIDAD AND V.IDVENTA = VC.IDVENTA AND VC.PAGADO = 1 AND O.IDPROSPECTO = P.IDPROSPECTO AND O.IDFASE = F.IDFASE AND O.IDLINEA_PRODUCTO = LP.IDLINEA_PRODUCTO AND <#SESSION.DB/>.DBO.GETONLYDATE(VC.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)
END
END
ELSE
BEGIN
	 SELECT 0 AS TOTALN,0 AS MONTITO,@IDMETA AS METAS
END

IF (@TIPO=315)
SELECT COUNT(IDVENTA) AS TOTALN,@IDMETA AS METAS, ISNULL(SUM (V.MONTO),0)AS MONTITO, AVG(V.MONTO) AS PROMEDIO, ISNULL(SUM(V.COMISION),0) AS TOTALCOMISIONES FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.USUARIOS U WHERE V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND V.NUEVA=1 AND <#SESSION.DB/>.DBO.GETONLYDATE(V.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO=316)
SELECT COUNT(IDVENTA) AS TOTALN,@IDMETA AS METAS, ISNULL(SUM (V.MONTO),0)AS MONTITO, AVG(V.MONTO) AS PROMEDIO, ISNULL(SUM(V.COMISION),0) AS TOTALCOMISIONES FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.USUARIOS U WHERE V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND V.NUEVA=1 AND U.IDGRUPO=@IDGRUPO AND <#SESSION.DB/>.DBO.GETONLYDATE(V.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO=317)
SELECT COUNT(IDVENTA) AS TOTALN,@IDMETA AS METAS, ISNULL(SUM (V.MONTO),0)AS MONTITO, AVG(V.MONTO) AS PROMEDIO, ISNULL(SUM(V.COMISION),0) AS TOTALCOMISIONES FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.USUARIOS U WHERE V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND V.NUEVA=1 AND U.IDUSUARIO=@IDUSUARIO AND <#SESSION.DB/>.DBO.GETONLYDATE(V.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO=318)
SELECT COUNT(IDVENTA) AS TOTALN,@IDMETA AS METAS, ISNULL(SUM (V.MONTO),0)AS MONTITO, AVG(V.MONTO) AS PROMEDIO, ISNULL(SUM(V.COMISION),0) AS TOTALCOMISIONES FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.USUARIOS U WHERE V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND V.NUEVA=0 AND <#SESSION.DB/>.DBO.GETONLYDATE(V.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO=319)
SELECT COUNT(IDVENTA) AS TOTALN,@IDMETA AS METAS, ISNULL(SUM (V.MONTO),0)AS MONTITO, AVG(V.MONTO) AS PROMEDIO, ISNULL(SUM(V.COMISION),0) AS TOTALCOMISIONES FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.USUARIOS U WHERE V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND V.NUEVA=0 AND U.IDGRUPO=@IDGRUPO AND <#SESSION.DB/>.DBO.GETONLYDATE(V.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)

IF (@TIPO=320)
SELECT COUNT(IDVENTA) AS TOTALN,@IDMETA AS METAS, ISNULL(SUM (V.MONTO),0)AS MONTITO, AVG(V.MONTO) AS PROMEDIO, ISNULL(SUM(V.COMISION),0) AS TOTALCOMISIONES FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.USUARIOS U WHERE V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = <#SESSION.IDEMPRESA/> AND V.NUEVA=0 AND U.IDUSUARIO=@IDUSUARIO AND <#SESSION.DB/>.DBO.GETONLYDATE(V.FECHAHORA) BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)
/*IF (@TIPO=403)
SELECT COUNT(IDPROSPECTO) AS TOTALN FROM <#SESSION.DB/>.DBO.PROSPECTOS P WHERE P.IDUSUARIO=@IDUSUARIO AND P.DESCARTADO=0 AND P.ESCLIENTE=1 AND P.FECHAHORA BETWEEN CONVERT(DATETIME,@INICIO,<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,@FIN,<#SESSION.CONVERTCODE/>)*/