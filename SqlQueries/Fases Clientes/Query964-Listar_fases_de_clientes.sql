//[session.db|Untyped,session.idempresa|Untyped,sin_eliminado|Untyped,]
select * from  <#SESSION.DB/>.DBO.PROSPECTOS_FASES where  FASECLIENTE=1 AND IDEMPRESA=<#SESSION.IDEMPRESA/>  order by ORDEN