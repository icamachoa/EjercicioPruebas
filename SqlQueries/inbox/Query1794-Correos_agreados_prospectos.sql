//[session.idusuario|Untyped,session.idempresa|Untyped,ltidinbox|Text,idtabinbox|Integer,idprospecto|Integer,session.db|Untyped,]
--DELETE
/*protegido*/
DECLARE @ltIdInbox VARCHAR(MAX)
DECLARE @IDUSUARIO INT, @IDEMPRESA INT, @idTabInbox INT, @idProspecto INT

SET @IDUSUARIO = <#SESSION.IDUSUARIO/>
SET @IDEMPRESA = <#SESSION.IDEMPRESA/>

SET @ltIdInbox = ISNULL(:ltIdInbox,'')
SET @idTabInbox = ISNULL(:idTabInbox,0)
SET @idProspecto = ISNULL(:idProspecto,0)

IF @idTabInbox > 0 AND @idProspecto > 0
BEGIN
   UPDATE UI SET UI.IDPROSPECTO = @idProspecto, UI.IDTABINBOX = @idTabInbox
   FROM SALESUP_CT.dbo.Split(@ltIdInbox, '|') S1
   LEFT JOIN <#SESSION.DB/>.dbo.USUARIOS_INBOX UI ON UI.IDINBOX = S1.SPLITVALUE AND UI.IDUSUARIO = @IDUSUARIO
   
   UPDATE <#SESSION.DB/>.dbo.PROSPECTOS
   SET IDTABINBOX = @idTabInbox 
   WHERE IDUSUARIO = @IDUSUARIO AND IDEMPRESA = @IDEMPRESA AND IDPROSPECTO = @idProspecto
END




