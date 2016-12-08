//[session.db|Untyped,session.idempresa|Untyped,]
-- select 
select * from  <#SESSION.DB/>.DBO.OPORTUNIDADES_FASES 
where IDEMPRESA=<#SESSION.IDEMPRESA/>
order by ORDEN ASC