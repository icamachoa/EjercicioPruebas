//[sp_ipaddress|Untyped,tku|Text,]
--SELECT
DECLARE @HOST VARCHAR(215)
DECLARE @SERVER VARCHAR(100)
DECLARE @TKU VARCHAR(100)
SET @SERVER=REPLACE(@@SERVERNAME,'-','.')
SET @HOST='<#sp_ipaddress/>'
SET @TKU= ISNULL(:TKU, '')
--SELECT @SERVER,@HOST
IF (@SERVER=@HOST OR 1=1)
  EXEC DBO.SP_INBOX_OBTIENE_LISTA_CORREOS_USUARIO @TKU
ELSE
 SELECT 'PARAMETROS INCORRECTOS' AS Error