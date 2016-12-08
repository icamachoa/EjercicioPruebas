//[session.db|Untyped,idprospecto|Integer,tkp|Text,session.idempresa|Untyped,]
--select
declare @idprospecto int
declare @tkp varchar(max)

set @idprospecto = :IDPROSPECTO 
SET @TKP = ISNULL(:TKP,'')
IF @TKP != ''
BEGIN SET @IDPROSPECTO = <#SESSION.DB/>.dbo.obtieneIdProspecto(@TKP, <#SESSION.IDEMPRESA/>) END

SELECT COUNT (*) AS OP_TOTAL 
FROM <#SESSION.DB/>.DBO.OPORTUNIDADES WHERE IDPROSPECTO = @idprospecto AND GANADA=0 AND PERDIDA=0