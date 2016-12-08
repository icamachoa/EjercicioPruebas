//[tko|Text,session.db|Untyped,]
--SELECT
declare @tko varchar(128)
declare @id int, @idprospecto int

set @tko = isnull(:tko, '')
SET @id = 0
set  @idprospecto = 0
SET @ID = <#SESSION.DB/>.dbo.obtieneIdOportunidad(@tko)
select @idprospecto = idprospecto from <#session.db/>.dbo.oportunidades where idoportunidad = @id
select @id as IDOPORTUNIDAD,  @idprospecto as idprospecto