//[moneda|Integer,o|Untyped,session.convertcode|Untyped,session.idempresa|Untyped,idventa|Untyped,fecha_cierre|Untyped,fecha_ant|Untyped,session.db|Untyped,referencia|Text,comision_monto|Untyped,periodicidad|Untyped,comision_modo|Untyped,campo1o|Untyped,campo2o|Untyped,campo3o|Untyped,campo4o|Untyped,campo5o|Untyped,campo6o|Untyped,campo7o|Untyped,campo8o|Untyped,campo9o|Untyped,campo10o|Untyped,campo11o|Untyped,campo12o|Untyped,campo13o|Untyped,campo14o|Untyped,campo15o|Untyped,campo16o|Untyped,campo17o|Untyped,campo18o|Untyped,campo19o|Untyped,campo20o|Untyped,campo21o|Untyped,campo22o|Untyped,campo23o|Untyped,campo24o|Untyped,campo25o|Untyped,campo26o|Untyped,campo27o|Untyped,campo28o|Untyped,campo29o|Untyped,campo30o|Untyped,campo31o|Untyped,campo32o|Untyped,campo35o|Untyped,campo36o|Untyped,campo37o|Untyped,campo38o|Untyped,campo39o|Untyped,campo40o|Untyped,campo41o|Untyped,campo42o|Untyped,campo43o|Untyped,campo44o|Untyped,campo45o|Untyped,campo46o|Untyped,campo47o|Untyped,campo48o|Untyped,campo49o|Untyped,campo50o|Untyped,campo51o|Untyped,campo52o|Untyped,campo53o|Untyped,campo54o|Untyped,campo55o|Untyped,campo56o|Untyped,campo57o|Untyped,campo58o|Untyped,campo59o|Untyped,campo60o|Untyped,campo61o|Untyped,campo62o|Untyped,campo63o|Untyped,campo64o|Untyped,campo1|Untyped,campo2|Untyped,campo3|Untyped,campo4|Untyped,campo5|Untyped,campo6|Untyped,campo7|Untyped,campo8|Untyped,campo9|Untyped,campo10|Untyped,campo11|Untyped,campo12|Untyped,campo13|Untyped,campo14|Untyped,campo15|Untyped,campo16|Untyped,campo17|Untyped,campo18|Untyped,campo19|Untyped,campo20|Untyped,campo21|Untyped,campo22|Untyped,campo23|Untyped,campo24|Untyped,campo25|Untyped,campo26|Untyped,campo27|Untyped,campo28|Untyped,campo29|Untyped,campo30|Untyped,campo31|Untyped,campo32|Untyped,campo35|Untyped,campo36|Untyped,campo37|Untyped,campo38|Untyped,campo39|Untyped,campo40|Untyped,campo41|Untyped,campo42|Untyped,campo43|Untyped,campo44|Untyped,campo45|Untyped,campo46|Untyped,campo47|Untyped,campo48|Untyped,campo49|Untyped,campo50|Untyped,campo51|Untyped,campo52|Untyped,campo53|Untyped,campo54|Untyped,campo55|Untyped,campo56|Untyped,campo57|Untyped,campo58|Untyped,campo59|Untyped,campo60|Untyped,campo61|Untyped,campo62|Untyped,campo63|Untyped,campo64|Untyped,tipodecambio|Numeric,Campo1C|Untyped,Campo2C|Untyped,Campo3C|Untyped,Campo4C|Untyped,Campo5C|Untyped,Campo6C|Untyped,Campo7C|Untyped,Campo8C|Untyped,Campo9C|Untyped,Campo10C|Untyped]
-- update
DECLARE @IDPROSPECTO INT 
DECLARE @IDVENTA INT
DECLARE @IDUSUARIOVENTA INT
DECLARE @CONVERTCODE INT
DECLARE @IDEMPRESA INT
DECLARE @IDOPORTUNIDAD INT
DECLARE @IDCOMPANIA INT
DECLARE @FECHA_CIERRE DATETIME
DECLARE @FECHA_ANT DATETIME
DECLARE @IDMONEDA INT = ISNULL(:MONEDA,0)
DECLARE @TIPODECAMBIO FLOAT = ISNULL(:TIPODECAMBIO,0)

DECLARE @O_CatalogoOpcion1 INT
DECLARE @O_CatalogoOpcion2 INT
DECLARE @O_CatalogoOpcion3 INT

IF(@TIPODECAMBIO = 0) SET @TIPODECAMBIO = 1
IF(@IDMONEDA = 0)BEGIN
  SELECT @IDMONEDA = IDEMPRESAMONEDA FROM <#SESSION.DB/>.dbo.MONEDAS 
  WHERE IDEMPRESA = <#SESSION.IDEMPRESA/> AND PORDEFECTO = 1
END

SET @O_CatalogoOpcion1 = CAST('<#O-CatalogoOpcion1/>' AS INT)  
SET @O_CatalogoOpcion2 = CAST('<#O-CatalogoOpcion2/>' AS INT) 
SET @O_CatalogoOpcion3 = CAST('<#O-CatalogoOpcion3/>' AS INT) 

IF @O_CatalogoOpcion1 = 0 BEGIN SET @O_CatalogoOpcion1 = NULL END
IF @O_CatalogoOpcion2 = 0 BEGIN SET @O_CatalogoOpcion2 = NULL END
IF @O_CatalogoOpcion3 = 0 BEGIN SET @O_CatalogoOpcion3 = NULL END

SET @CONVERTCODE = <#SESSION.CONVERTCODE/>
SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)
SET @IDVENTA = CAST('<#IDVENTA/>' AS INT)
SET @FECHA_CIERRE = convert(DATETIME,'<#FECHA_CIERRE/>', @CONVERTCODE)
SET @FECHA_ANT = convert(DATETIME,'<#FECHA_ANT/>', @CONVERTCODE)

DELETE FROM <#SESSION.DB/>.DBO.VENTAS_COBROS WITH(ROWLOCK) WHERE IDVENTA = @IDVENTA

DECLARE @CAMBIOLOCAL INT
SELECT @CAMBIOLOCAL = 1 FROM <#SESSION.DB/>.DBO.VENTAS V, <#SESSION.DB/>.DBO.OPORTUNIDADES O, <#SESSION.DB/>.DBO.PROSPECTOS P 
WHERE V.IDVENTA = @IDVENTA AND V.IDOPORTUNIDAD = O.IDOPORTUNIDAD AND O.IDPROSPECTO = P.IDPROSPECTO AND V.TKVM IS NOT NULL AND O.TKOM IS NOT NULL AND P.TKPM IS NOT NULL		


UPDATE <#SESSION.DB/>.DBO.VENTAS WITH(ROWLOCK) SET
 FECHAHORA = @FECHA_CIERRE,
 REFERENCIA = :REFERENCIA,
 COMISION = <#comision_monto/>,
 PERIODICIDAD = <#PERIODICIDAD/>,
 TIPOCOMISION = <#comision_modo/>, CAMBIOLOCAL = @CAMBIOLOCAL,
 IDMONEDA = @IDMONEDA,
 TIPODECAMBIO = @TIPODECAMBIO
WHERE IDVENTA = @IDVENTA 

SELECT @IDOPORTUNIDAD = IDOPORTUNIDAD FROM <#SESSION.DB/>.DBO.VENTAS WITH(NOLOCK) WHERE IDVENTA = @IDVENTA 
SELECT @IDPROSPECTO = IDPROSPECTO FROM <#SESSION.DB/>.DBO.OPORTUNIDADES WITH(NOLOCK) WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
SELECT @IDCOMPANIA = IDCOMPANIA FROM <#SESSION.DB/>.DBO.PROSPECTOS WITH(NOLOCK) WHERE IDPROSPECTO = @IDPROSPECTO

UPDATE 
<#SESSION.DB/>.DBO.OPORTUNIDADES WITH(ROWLOCK) 
SET
GANADA_FECHA = @FECHA_CIERRE,
COMISION_MONTO = <#comision_monto/>,
IDCATALOGOOPCION1 = @O_CatalogoOpcion1,
IDCATALOGOOPCION2 = @O_CatalogoOpcion2,
IDCATALOGOOPCION3 = @O_CatalogoOpcion3, CAMBIOLOCAL = @CAMBIOLOCAL
WHERE
IDOPORTUNIDAD = @IDOPORTUNIDAD


EXEC <#SESSION.DB/>.DBO.SP_ACTUALIZA_CAMPOS_PERSONALIZABLES 4, @IDOPORTUNIDAD, @IDEMPRESA, @CONVERTCODE,
'<#CAMPO1O/>' , '<#CAMPO2O/>' , '<#CAMPO3O/>' , '<#CAMPO4O/>', 
'<#CAMPO5O/>' , '<#CAMPO6O/>' , '<#CAMPO7O/>' , '<#CAMPO8O/>', 
'<#CAMPO9O/>' , '<#CAMPO10O/>', '<#CAMPO11O/>', '<#CAMPO12O/>', 
'<#CAMPO13O/>', '<#CAMPO14O/>', '<#CAMPO15O/>', '<#CAMPO16O/>', 
'<#CAMPO17O/>', '<#CAMPO18O/>', '<#CAMPO19O/>', '<#CAMPO20O/>', 
'<#CAMPO21O/>', '<#CAMPO22O/>', '<#CAMPO23O/>', '<#CAMPO24O/>', '<#CAMPO25O/>', 
'<#CAMPO26O/>', '<#CAMPO27O/>', '<#CAMPO28O/>', '<#CAMPO29O/>', 
'<#CAMPO30O/>', '<#CAMPO31O/>', '<#CAMPO32O/>',
'<#CAMPO35O/>', '<#CAMPO36O/>',
	 '<#CAMPO37O/>', '<#CAMPO38O/>', '<#CAMPO39O/>', '<#CAMPO40O/>',
	 '<#CAMPO41O/>', '<#CAMPO42O/>', '<#CAMPO43O/>', '<#CAMPO44O/>',
	 '<#CAMPO45O/>', '<#CAMPO46O/>', '<#CAMPO47O/>', '<#CAMPO48O/>',
	 '<#CAMPO49O/>', '<#CAMPO50O/>', '<#CAMPO51O/>', '<#CAMPO52O/>',
	 '<#CAMPO53O/>', '<#CAMPO54O/>', '<#CAMPO55O/>', '<#CAMPO56O/>',
	 '<#CAMPO57O/>', '<#CAMPO58O/>', '<#CAMPO59O/>', '<#CAMPO60O/>',
	 '<#CAMPO61O/>', '<#CAMPO62O/>', '<#CAMPO63O/>', '<#CAMPO64O/>'

/*SE ACTUALIZAR LOS PERSONALIZABLES*/
EXEC <#SESSION.DB/>.DBO.SP_ACTUALIZA_CAMPOS_PERSONALIZABLES 3, @IDPROSPECTO, @IDEMPRESA, @CONVERTCODE,
'<#CAMPO1/>' , '<#CAMPO2/>' , '<#CAMPO3/>' , '<#CAMPO4/>', 
'<#CAMPO5/>' , '<#CAMPO6/>' , '<#CAMPO7/>' , '<#CAMPO8/>', 
'<#CAMPO9/>' , '<#CAMPO10/>', '<#CAMPO11/>', '<#CAMPO12/>', 
'<#CAMPO13/>', '<#CAMPO14/>', '<#CAMPO15/>', '<#CAMPO16/>', 
'<#CAMPO17/>', '<#CAMPO18/>', '<#CAMPO19/>', '<#CAMPO20/>', 
'<#CAMPO21/>', '<#CAMPO22/>', '<#CAMPO23/>', '<#CAMPO24/>', '<#CAMPO25/>', 
'<#CAMPO26/>', '<#CAMPO27/>', '<#CAMPO28/>', '<#CAMPO29/>', 
'<#CAMPO30/>', '<#CAMPO31/>', '<#CAMPO32/>',
'<#CAMPO35/>', '<#CAMPO36/>',
'<#CAMPO37/>', '<#CAMPO38/>', '<#CAMPO39/>', '<#CAMPO40/>',
'<#CAMPO41/>', '<#CAMPO42/>', '<#CAMPO43/>', '<#CAMPO44/>',
'<#CAMPO45/>', '<#CAMPO46/>', '<#CAMPO47/>', '<#CAMPO48/>',
'<#CAMPO49/>', '<#CAMPO50/>', '<#CAMPO51/>', '<#CAMPO52/>',
'<#CAMPO53/>', '<#CAMPO54/>', '<#CAMPO55/>', '<#CAMPO56/>',
'<#CAMPO57/>', '<#CAMPO58/>', '<#CAMPO59/>', '<#CAMPO60/>',
'<#CAMPO61/>', '<#CAMPO62/>', '<#CAMPO63/>', '<#CAMPO64/>'

IF @IDCOMPANIA IS NOT NULL 
BEGIN
  EXEC <#SESSION.DB/>.DBO.SP_ACTUALIZA_PERSONALIZADOS_COMPANIA @IDCOMPANIA,'<#Campo1C/>','<#Campo2C/>','<#Campo3C/>','<#Campo4C/>','<#Campo5C/>','<#Campo6C/>','<#Campo7C/>','<#Campo8C/>','<#Campo9C/>','<#Campo10C/>'
END
