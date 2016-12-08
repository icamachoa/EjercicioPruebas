//[session.db|Untyped,txt1|Text,id1|Integer,tk|Text,session.idempresa|Untyped,]
--update

DECLARE @TK VARCHAR(128)
DECLARE @IDETIQUETA INT

SET @IDETIQUETA = ISNULL(:ID1, 0)

SET @TK = ISNULL(:TK,'')

IF @TK != '' BEGIN SELECT @IDETIQUETA=IDETIQUETA FROM <#SESSION.DB/>.DBO.ETIQUETAS WHERE TK = @TK AND IDEMPRESA = <#SESSION.IDEMPRESA/> END




UPDATE <#SESSION.DB/>.DBO.ETIQUETAS  SET ETIQUETA = ISNULL(:TXT1,'') WHERE IDETIQUETA = @IDETIQUETA

update <#SESSION.DB/>.dbo.prospectos set ETIQUETAS_TXT=<#SESSION.DB/>.dbo.udf_etiquetas (PE.idprospecto)
from <#SESSION.DB/>.dbo.prospectos p, <#SESSION.DB/>.dbo.ETIQUETAS e, <#SESSION.DB/>.dbo.PROSPECTOS_ETIQUETAS PE 
where pe.idetiqueta=e.idetiqueta and PE.idprospecto=p.idprospecto and pe.idetiqueta = @IDETIQUETA

