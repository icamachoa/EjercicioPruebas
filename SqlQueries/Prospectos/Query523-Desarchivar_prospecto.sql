//[aidprospecto|Integer,session.db|Untyped,session.idusuario|Untyped,session.convertcode|Untyped,session.idempresa|Untyped,tkp|Text,]
--insert
DECLARE @AIDPROSPECTO INT
SET @AIDPROSPECTO=ISNULL(:AIDPROSPECTO,0)

DECLARE @IDEMPRESA INT
SET @IDEMPRESA = <#SESSION.IDEMPRESA/>
DECLARE @TKP VARCHAR(MAX)
SET @TKP = ISNULL(:TKP,'')
IF @TKP != '' BEGIN SET @AIDPROSPECTO = <#SESSION.DB/>.dbo.obtieneIdProspecto(@TKP, @IDEMPRESA) END


IF @AIDPROSPECTO > 0
BEGIN
EXEC <#SESSION.DB/>.dbo.SP_REACTIVAR @AIDPROSPECTO, <#SESSION.IDUSUARIO/>,<#SESSION.CONVERTCODE/>
UPDATE <#SESSION.DB/>.dbo.PROSPECTOS SET ULTIMAMODIFICACION = GETDATE() WHERE IDPROSPECTO =@AIDPROSPECTO
DELETE FROM <#SESSION.DB/>.dbo.MODIFICACIONES WITH (ROWLOCK) WHERE IDTABLA = 4 AND IDEMPRESA = @IDEMPRESA
INSERT INTO <#SESSION.DB/>.dbo.MODIFICACIONES  WITH (ROWLOCK) (IDTABLA,IDEMPRESA) VALUES (4 , @IDEMPRESA)
END
