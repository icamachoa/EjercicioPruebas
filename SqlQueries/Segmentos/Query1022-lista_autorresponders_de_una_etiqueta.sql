//[session.db|Untyped,idetiqueta|Text,]
--select
/*PROTEGIDO*/
/*SEP2015*/
DECLARE @Idetiqueta VARCHAR(MAX)
SET @Idetiqueta=ISNULL(:Idetiqueta,'')
select * from <#SESSION.DB/>.DBO.AUTORESPONDERS a where a.idetiqueta=@Idetiqueta