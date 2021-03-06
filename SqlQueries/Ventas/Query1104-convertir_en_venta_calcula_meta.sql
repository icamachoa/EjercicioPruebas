//[ventaid|Integer,fecha_cierre|Text,session.convertcode|Untyped,fecha_ant|Text,session.db|Untyped,]
--update

DECLARE @FECHAMETA DATETIME
DECLARE @FECHA_ANT DATETIME
DECLARE @IDUSUARIOVENTA INT
DECLARE @IDVENTA INT


SET @IDVENTA = CAST(ISNULL(:VENTAID,0) AS INT)

IF(@IDVENTA = 0)
	SET @IDVENTA = ''

SET @FECHAMETA = convert(DATETIME,ISNULL(:FECHA_CIERRE,''), <#SESSION.CONVERTCODE/>)
SET @FECHA_ANT = convert(DATETIME,ISNULL(:FECHA_ANT,''), <#SESSION.CONVERTCODE/>)

select @IDUSUARIOVENTA=IDUSUARIO from <#SESSION.DB/>.DBO.VENTAS WITH(NOLOCK) WHERE IDVENTA=@IDVENTA
  
EXEC <#SESSION.DB/>.DBO.SP_ACTUALIZA_METAS_PROCESO 3, @IDUSUARIOVENTA, @FECHAMETA
IF(@FECHAMETA != @FECHA_ANT)
BEGIN
	 EXEC <#SESSION.DB/>.DBO.SP_ACTUALIZA_METAS_PROCESO 3, @IDUSUARIOVENTA, @FECHA_ANT
END