//[idprospecto|Text,idoportunidad|Text,session.idempresa|Untyped,session.idusuario|Untyped,razones|Text,comentario|Text,enviaactivado|Text,session.convertcode|Untyped,session.db|Untyped,tkp|Text,tko|Text,]
--INSERT
DECLARE @IDEMPRESA INT
DECLARE @IDUSUARIO INT

SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)
SET @IDUSUARIO   =CAST('<#SESSION.IDUSUARIO/>' AS INT)

select count(*) CANT_OPORTUNIDADES 
	from  <#session.db/>.dbo.prospectos p, <#session.db/>.dbo.oportunidades o 
	where p.idprospecto = o.idprospecto and p.idempresa = @IDEMPRESA and  month(o.fechahora) = 6 and o.idusuario= @IDUSUARIO