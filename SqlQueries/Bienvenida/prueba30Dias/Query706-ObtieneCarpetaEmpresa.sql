//[session.db|Untyped,session.idempresa|Untyped,]
--select
DECLARE @CARPETA VARCHAR(128)

SELECT @CARPETA=<#SESSION.DB/>.dbo.PreparaNumero(<#SESSION.IDEMPRESA/>,6)
SELECT @CARPETA AS CARPETA

