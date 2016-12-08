//[session.db|Untyped,session.idempresa|Untyped,]
select 
isnull(e.max_usuarios, 0) as max_usuarios, (select count(*) as activos from <#SESSION.DB/>.DBO.usuarios where activo = 1 and idempresa = e.idempresa) as activos 
from <#SESSION.DB/>.DBO.empresas e
where e.idempresa = <#SESSION.IDEMPRESA/> 