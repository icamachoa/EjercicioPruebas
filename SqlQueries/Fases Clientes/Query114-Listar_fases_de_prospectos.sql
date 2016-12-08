//[session.db|Untyped,session.idempresa|Untyped,]
--SELECT
select * from  <#SESSION.DB/>.DBO.PROSPECTOS_FASES 
where  FASECLIENTE=0 AND IDEMPRESA=<#SESSION.IDEMPRESA/> order by ORDEN