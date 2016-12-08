//[idmoneda|Text,cambio|Text,session.idempresa|Untyped,tk|Text,idmoneditar|Text,session.db|Untyped,idpaises_monedas|Integer,]
-- INSERT
/*PROTEGIDO*/
DECLARE @IDMONEDA VARCHAR(5)

DECLARE @CAMBIO VARCHAR(MAX)
DECLARE @TIPODECAMBIO FLOAT
DECLARE @IDEMPRESA INT
DECLARE @TK VARCHAR(MAX)
DECLARE @IDMONEDITAR VARCHAR(5)
DECLARE @PORDEFECTO INT = 0
DECLARE @IDEMPRESAMONEDA INT
DECLARE @IDPAISES_MONEDAS INT
DECLARE @SEPARADORDECIMAL VARCHAR(2)

SET @IDMONEDA = ISNULL(:IDMONEDA,'')
SET @IDPAISES_MONEDAS = ISNULL(:IDPAISES_MONEDAS,0)
SET @SEPARADORDECIMAL = '<#SP_DECIMALSEPARATOR/>'
SET @CAMBIO = ISNULL(:CAMBIO,'')
SET @IDEMPRESA = <#SESSION.IDEMPRESA/>
SET @TK = dbo.ValidaToken(:TK)
SET @IDMONEDITAR=ISNULL(:IDMONEDITAR, '')

SELECT @TIPODECAMBIO = <#SESSION.DB/>.DBO.ConvierteDecimal(@CAMBIO,@SEPARADORDECIMAL)

IF((SELECT COUNT(*) FROM <#SESSION.DB/>.DBO.MONEDAS WHERE IDEMPRESA = @IDEMPRESA) = 0)
BEGIN
	 SET @PORDEFECTO = 1
END

IF(@TK = '0')
BEGIN
	 INSERT INTO <#SESSION.DB/>.DBO.MONEDAS (IDPAISES_MONEDAS, IDMONEDA,TIPODECAMBIO,IDEMPRESA,PORDEFECTO) VALUES (@IDPAISES_MONEDAS,@IDMONEDA,@TIPODECAMBIO,@IDEMPRESA,@PORDEFECTO)

	 SELECT TOP 1 @IDEMPRESAMONEDA = IDEMPRESAMONEDA FROM <#SESSION.DB/>.DBO.MONEDAS WHERE IDMONEDA = @IDMONEDA AND TIPODECAMBIO = @TIPODECAMBIO AND PORDEFECTO = @PORDEFECTO AND IDEMPRESA = @IDEMPRESA
	 
	 UPDATE <#SESSION.DB/>.dbo.OPORTUNIDADES SET IDEMPRESAMONEDA = @IDEMPRESAMONEDA WHERE IDUSUARIO IN(SELECT IDUSUARIO FROM <#SESSION.DB/>.dbo.USUARIOS WHERE IDEMPRESA = @IDEMPRESA) AND IDEMPRESAMONEDA IS NULL
	 UPDATE <#SESSION.DB/>.dbo.VENTAS SET IDMONEDA = @IDEMPRESAMONEDA WHERE IDUSUARIO IN(SELECT IDUSUARIO FROM <#SESSION.DB/>.dbo.USUARIOS WHERE IDEMPRESA = @IDEMPRESA) AND IDMONEDA IS NULL
END
ELSE
BEGIN
	 UPDATE <#SESSION.DB/>.DBO.MONEDAS 
	 SET TIPODECAMBIO = @TIPODECAMBIO, IDMONEDA=@IDMONEDITAR
	 WHERE IDEMPRESA = @IDEMPRESA AND TK = @TK
END