//[listaanterior|Text,listanueva|Text,session.db|Untyped,session.idempresa|Untyped,tkp|Text]
--SELECT 
DECLARE @LISTAANTERIOR VARCHAR(MAX)
DECLARE @LISTANUEVA VARCHAR(MAX)
DECLARE @IDPROSPECTO INT
DECLARE @IDEMPRESA INT
DECLARE @TKP VARCHAR(MAX)

SET @LISTAANTERIOR = ISNULL(:LISTAANTERIOR,'')
SET @LISTAANTERIOR = <#SESSION.DB/>.dbo.obtieneListaIdUsuarios(@LISTAANTERIOR)
SET @LISTANUEVA = ISNULL(:LISTANUEVA,'')
SET @LISTANUEVA = <#SESSION.DB/>.dbo.obtieneListaIdUsuarios(@LISTANUEVA)


SET @IDEMPRESA = <#SESSION.IDEMPRESA/>
SET @TKP = ISNULL(:TKP,'')
IF @TKP != '' BEGIN SET @IDPROSPECTO = <#SESSION.DB/>.dbo.obtieneIdProspecto(@TKP, @IDEMPRESA) END



DECLARE @TIENEN INT
SET @TIENEN = 0
 SELECT TOP 1  @TIENEN = 1 FROM <#SESSION.DB/>.dbo.Split(@LISTAANTERIOR, ',') A 
 LEFT JOIN <#SESSION.DB/>.dbo.Split(@LISTANUEVA, ',') N ON A.splitvalue = N.splitvalue  WHERE N.splitvalue IS NULL
 and a.splitvalue in (select idusuario from <#SESSION.DB/>.dbo.oportunidades where idprospecto = @IDPROSPECTO) 
 GROUP BY  A.splitvalue


SELECT @TIENEN AS TienenOportunidades  