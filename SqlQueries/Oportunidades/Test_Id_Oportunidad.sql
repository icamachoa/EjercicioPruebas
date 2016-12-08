//[idprospecto|Integer,session.db|Untyped,]
--SELECT
declare @tko varchar(128)
declare @id int, @idprospecto int

set  @idprospecto = isnull(:idprospecto, 0)

select top 1 *  from <#session.db/>.dbo.oportunidades where idprospecto = @idprospecto order by idoportunidad desc