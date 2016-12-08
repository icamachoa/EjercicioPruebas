//[session.idempresa|Untyped,]
declare @ctotal_b money
declare @ctotal_u money
declare @ctotal_t money
select @ctotal_b=SUM (bonificacion),@ctotal_u=sum(usado)  from SALESUP_CT.dbo.EMPRESA_BONIFICACIONES where idempresa = <#SESSION.IDEMPRESA/>
set @ctotal_t=@ctotal_b - @ctotal_u
select isnull(@ctotal_b,0) as TOTAL_BONF,isnull(@ctotal_u,0) as TOTAL_USADO, isnull(@ctotal_t,0) as TOTAL_BU