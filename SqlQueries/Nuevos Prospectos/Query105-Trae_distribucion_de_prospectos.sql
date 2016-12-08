//[tipo|Integer,session.db|Untyped,session.idempresa|Untyped,]
--select 
declare @tipo as int
set @tipo=isnull(:tipo,0)
SELECT *,@tipo as tipo  FROM <#SESSION.DB/>.DBO.EMPRESAS WHERE IDEMPRESA = <#SESSION.IDEMPRESA/> 