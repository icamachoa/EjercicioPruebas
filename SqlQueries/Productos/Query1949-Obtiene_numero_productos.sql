//[tko|Text,session.db|Untyped,]

declare @tko varchar(128)

set @tko = isnull(:tko, '');

select COUNT(*) as numeroProductos  from <#SESSION.DB/>.DBO.OPORTUNIDADES_PRODUCTOS where IDOPORTUNIDAD = (select IDOPORTUNIDAD from <#SESSION.DB/>.DBO.OPORTUNIDADES where TKO = @tko)