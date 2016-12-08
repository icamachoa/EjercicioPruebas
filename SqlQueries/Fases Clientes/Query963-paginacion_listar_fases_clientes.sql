//[session.db|Untyped,session.idempresa|Untyped,]
select count(*) as totaln from <#SESSION.DB/>.DBO.PROSPECTOS_FASES 
where IDEMPRESA=<#SESSION.IDEMPRESA/> AND FASECLIENTE=1