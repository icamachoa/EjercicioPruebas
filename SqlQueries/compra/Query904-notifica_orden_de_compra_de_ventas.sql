//[session.idempresa|Untyped,]
--SELECT 

DECLARE @SESSIONIDEMPRESA INT
SET @SESSIONIDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)

DECLARE @RES VARCHAR(MAX)

SELECT @RES= OPENPAY_RES
FROM CONTROL.VENTAS.dbo.CARRITO WHERE IDPRODUCTO = 1 AND  IDEMPRESA = @SESSIONIDEMPRESA

IF @res is not null
SELECT 
   max(case when NAME='amount' then STRINGVALUE else '' end) MONTO 
  ,max(case when NAME='currency' then STRINGVALUE else '' end) MONEDA 
  ,max(case when NAME='bank' then STRINGVALUE else '' end) BANCO 
  ,max(case when NAME='name' then STRINGVALUE else '' end) REFERENCIA 
  ,max(case when NAME='clabe' then STRINGVALUE else '' end) CUENTA 
FROM dbo.parseJSON(@RES)    
else
 select 0 as amount
    
