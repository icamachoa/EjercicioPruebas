//[session.db|Untyped,valor|Integer,session.idempresa|Untyped,]
UPDATE 
  <#SESSION.DB/>.dbo.EMPRESAS 
SET 
  BLOQUEARNOTIFICACIONES = :VALOR
WHERE 
  IDEMPRESA = <#SESSION.IDEMPRESA/>