//[session.idempresa|Untyped,session.db|Untyped,]
--select

declare @idempresa int

set @idempresa = <#SESSION.IDEMPRESA/>

SELECT M.*, CTM.MONEDA ,  UNICODE(CTM.MONEDA_SIMBOLO) AS UNICODE FROM <#SESSION.DB/>.dbo.MONEDAS M, MONEDAS CTM WHERE idempresa=@idempresa AND (STATUS =1  OR PORDEFECTO = 1) AND M.IDMONEDA = CTM.IDMONEDA ORDER BY PORDEFECTO DESC
