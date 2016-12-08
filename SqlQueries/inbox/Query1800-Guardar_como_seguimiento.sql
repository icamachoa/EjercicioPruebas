//[session.idusuario|Untyped,session.idempresa|Untyped,ltidinbox|Text,session.db|Untyped,]
--INSERT
/*protegido*/ 
DECLARE @ltIdInbox VARCHAR(MAX)
DECLARE @IDUSUARIO INT, @IDEMPRESA INT

SET @IDUSUARIO = <#SESSION.IDUSUARIO/>
SET @IDEMPRESA = <#SESSION.IDEMPRESA/>
SET @ltIdInbox = ISNULL(:ltIdInbox,'')

EXEC <#SESSION.DB/>.dbo.SP_GUARDA_INBOX_SEGUIMIENTO @IDUSUARIO, @IDEMPRESA, @ltIdInbox

