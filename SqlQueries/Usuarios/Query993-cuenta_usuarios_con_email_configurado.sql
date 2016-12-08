//[session.db|Untyped,session.idusuario|Untyped,]
--select
declare @idempresa int
select @idempresa=idempresa from <#SESSION.DB/>.DBO.usuarios where idusuario=<#session.idusuario/>

select count(*) as totalusers  from <#SESSION.DB/>.DBO.usuarios u
 left join <#SESSION.DB/>.DBO.usuarios_mailconfig um on um.idusuario=u.idusuario 
 where u.idempresa=@idempresa and (um.idmailconfig is null or um.estado>0)
