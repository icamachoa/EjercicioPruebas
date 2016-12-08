//[session.db|Untyped,session.idempresa|Untyped,tk|Text,]
--SELECT
select * from <#SESSION.DB/>.DBO.SEGUIMIENTO_CATEGORIAS WHERE IDEMPRESA = <#SESSION.IDEMPRESA/> AND TK=ISNULL(:tk, '') 