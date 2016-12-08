//[session.db|Untyped,session.idusuario|Untyped,]
DECLARE @LIMITE INT
SET @LIMITE = <#SESSION.DB/>.dbo.ObtieneMaxCorreosPorDia(<#SESSION.IDUSUARIO/>)
SELECT @LIMITE AS LIMITE