//[session.db|Untyped,mensaje|Text,session.idempresa|Untyped,]
UPDATE <#SESSION.DB/>.dbo.EMPRESAS SET DESUSCRIPCION = :MENSAJE WHERE IDEMPRESA = <#SESSION.IDEMPRESA/>