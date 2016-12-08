//[session.db|Untyped,session.idusuario|Untyped,idprospectoimporta|Integer,]
-- delete
/*PROTEGIDO*/
/*SEP2015*/
DECLARE @idprospectoimporta INT
SET @idprospectoimporta = ISNULL(:idprospectoimporta,0)
DELETE FROM <#SESSION.DB/>.DBO.PROSPECTOS_IMPORTACION WHERE IDUSUARIO = <#SESSION.IDUSUARIO/> AND IDPROSPECTOIMPORTA = @idprospectoimporta