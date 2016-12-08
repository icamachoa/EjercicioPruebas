//[session.db|Untyped,session.idempresa|Untyped,tkindu|Text,]
--select
SELECT * FROM  <#SESSION.DB/>.DBO.EMPRESAS_INDUSTRIAS WHERE IDEMPRESA = <#SESSION.IDEMPRESA/> AND TKIND=ISNULL(:TKIND, '') 
