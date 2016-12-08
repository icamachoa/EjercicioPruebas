//[session.db|Untyped,idpais|Text,]
--select
/*PROTEGIDO*/
/*SEP2015*/
DECLARE @IDPAIS VARCHAR(1000)
SET @IDPAIS=ISNULL(:IDPAIS,'')
select * from <#SESSION.DB/>.DBO.estados where idpais = @IDPAIS