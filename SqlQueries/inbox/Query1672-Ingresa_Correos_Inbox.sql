//[sp_ipaddress|Untyped,json|Text,tku|Text,]
--SELECT
DECLARE @JSON VARCHAR(MAX)
DECLARE @HOST VARCHAR(215)
DECLARE @SERVER VARCHAR(100)
SET @SERVER=REPLACE(@@SERVERNAME,'-','.')
SET @HOST='<#sp_ipaddress/>'
SET @JSON =dbo.[PreparaCadena](cast(dbo.Base64ToBinary(:JSON) as varchar(MAX)))
  BEGIN TRY
  INSERT INTO LOG(TEXTO, TEXTO2, TEXTO3) VALUES( @JSON, '0', :TKU)
--  EXEC DBO.SP_INBOX_INSERTA_CORREOS_A_BASES @JSON
  SELECT 'Se agregaron correctamente' as Mensaje,1 as Result	
  END TRY
  BEGIN CATCH
  		SELECT 'Error' as Mensaje,0 as Result
  END CATCH
