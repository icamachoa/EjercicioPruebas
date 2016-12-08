//[session.db|Untyped,session.idempresa|Untyped,]
declare @expiracion varchar(10)
declare @fechahoy varchar(10)
declare @DiasAPagar INT 
select @expiracion=convert(varchar,<#SESSION.DB/>.DBO.GETONLYDATE(EXPIRACION),103)  from <#SESSION.DB/>.DBO.EMPRESAS where  IDEMPRESA = <#SESSION.IDEMPRESA/>



set @fechahoy=convert(varchar,<#SESSION.DB/>.dbo.GETONLYDATE(getdate()),103)

select @DiasAPagar=salesup_ct.dbo.DiasEntreFechas(@fechahoy,@expiracion)
select isnull(@DiasAPagar,0) as diasapagar