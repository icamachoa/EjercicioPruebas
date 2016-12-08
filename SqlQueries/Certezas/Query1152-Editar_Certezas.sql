//[session.db|Untyped,session.idempresa|Untyped,]
--select 
select idcertezaempresa,certeza,descripcion, tk from <#SESSION.DB/>.dbo.empresas_certezas 
where idempresa=<#SESSION.IDEMPRESA/> order by certeza asc