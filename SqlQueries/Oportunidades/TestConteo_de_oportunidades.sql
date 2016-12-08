//[idprospecto|Text,idoportunidad|Text,session.idempresa|Untyped,session.idusuario|Untyped,razones|Text,comentario|Text,enviaactivado|Text,session.convertcode|Untyped,session.db|Untyped,tkp|Text,tko|Text,]
--select
DECLARE @IDEMPRESA INT
DECLARE @IDUSUARIO INT

SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)
SET @IDUSUARIO   =CAST('<#SESSION.IDUSUARIO/>' AS INT)

declare @idmeta_actual int
declare @oportunidades int

select top 1 @idmeta_actual = idmeta from <#session.db/>.dbo.usuarios_metas order by idmeta desc

select @oportunidades=count(*) 
	from  <#session.db/>.dbo.prospectos p, <#session.db/>.dbo.oportunidades o 
	where p.idprospecto = o.idprospecto and p.idempresa = @IDEMPRESA and  month(o.fechahora) = 6 and o.idusuario= @IDUSUARIO

	select @oportunidades as OPORTUNIDADES, @idmeta_actual AS IDMETA_ACTUAL