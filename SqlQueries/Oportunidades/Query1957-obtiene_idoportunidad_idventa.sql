//[tko|Text,tkv|Text,session.db|Untyped,]
--SELECT
declare @tko varchar(128), @tkv varchar(128)
declare @ido int, @idv int

set @tko = isnull(:tko, '')
set @tkv = isnull(:tkv, '')

SET @ido = 0
SET @idv = 0


select @ido = idoportunidad from <#SESSION.DB/>.DBO.OPORTUNIDADES where TKO=@tko
select @idv = idventa from <#SESSION.DB/>.DBO.VENTAS where TKV=@tkv

select @ido as idOportunidad, @idv as idventa 