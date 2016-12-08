//[tkp|Text,session.db|Untyped,session.idempresa|Untyped,]
--select
DECLARE @TKP VARCHAR(MAX)
DECLARE @ID INT

SET @id = 0
SET @TKP = ISNULL(:TKP,'')
SET @ID = <#SESSION.DB/>.dbo.obtieneIdProspecto(@TKP, <#SESSION.IDEMPRESA/>)

select @ID AS IDPROSPECTO