//[correo|Text,revisa|Integer,session.idempresa|Untyped,]
DECLARE @CORREO VARCHAR(256)
DECLARE @REVISA INT
DECLARE @IDEMPRESA INT
SET @CORREO = ISNULL(:CORREO,'')
SET @REVISA = ISNULL(:REVISA,0)
SET @IDEMPRESA = <#SESSION.IDEMPRESA/>

IF @REVISA = 1
SELECT COUNT(*) AS HAY FROM SALESUP_CT.dbo.EMPRESA_INVITACIONES WHERE CORREO = @CORREO AND STATUS = 1

IF @REVISA = 2
SELECT COUNT(*) AS HAY FROM SALESUP_CT.dbo.EMPRESA_INVITACIONES WHERE CORREO = @CORREO AND STATUS = 1 AND IDEMPRESA = @IDEMPRESA

IF @REVISA = 3
SELECT COUNT(*) AS HAY FROM SALESUP_CT.dbo.USUARIOS WHERE EMAIL = @CORREO
