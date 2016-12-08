//[idcerteza|Integer,session.db|Untyped,]
--select
/*PROTEGIDO*/
/*SEP2015*/
declare @idcerteza int
SET @idcerteza = ISNULL(:idcerteza,0)

SELECT * FROM <#SESSION.DB/>.DBO.EMPRESAS_CERTEZAS WHERE idcertezaempresa=@idcerteza 