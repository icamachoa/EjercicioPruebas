//[session.db|Untyped,session.idempresa|Untyped,indice|Integer,]
--SELECT 
/*PROTEGIDO*/
/*SEP2015*/
DECLARE @INDICE INT
SET @INDICE = ISNULL(:INDICE,0)
select LLAVE from <#SESSION.DB/>.DBO.empresas_campos where idempresa = <#SESSION.IDEMPRESA/> and indice = @INDICE
