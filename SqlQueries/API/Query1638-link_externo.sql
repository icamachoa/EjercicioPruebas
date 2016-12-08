//[session.tku|Untyped,session.nombre|Untyped,session.apellidos|Untyped,session.db|Untyped,session.idempresa|Untyped,tk|Text,]
DECLARE @VARIABLES VARCHAR(800)
DECLARE @TK VARCHAR(64)

SET @TK = dbo.ValidaToken(:TK)

SELECT
 @VARIABLES = 
    CAST(N'' AS XML).value(
          'xs:base64Binary(xs:hexBinary(sql:column("bin")))'
        , 'VARCHAR(MAX)'
    )   
FROM (
    SELECT CAST('idusuario=<#SESSION.TKU/>&amp;nombre=<#SESSION.NOMBRE/> <#SESSION.APELLIDOS/>' AS VARBINARY(MAX)) AS bin
) AS bin_sql_server_temp;


SELECT
@VARIABLES as TKX, 
* 
FROM <#SESSION.DB/>.dbo.EMPRESAS_LINKEXTERNO WHERE IDEMPRESA =  <#SESSION.IDEMPRESA/> AND TK = @TK