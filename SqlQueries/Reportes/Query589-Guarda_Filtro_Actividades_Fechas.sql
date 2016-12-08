//[filtrorapido|Integer,fechadesde|Text,fechahasta|Text,session.db|Untyped,session.idusuario|Untyped,idpantalla|Integer,session.convertcode|Untyped,]
--INSERT

DECLARE @TEXTO VARCHAR(2024)
DECLARE @TEXTOSQL VARCHAR(2024)
DECLARE @FECHADESDE VARCHAR(1000)
DECLARE @FECHAHASTA VARCHAR(1000)
DECLARE @IDPANTALLA INT
DECLARE @TIPO INT

SET @IDPANTALLA =  ISNULL(:IDPANTALLA,0)
SET @FECHADESDE = ISNULL(:FECHADESDE,'')
SET @FECHAHASTA = ISNULL(:FECHAHASTA,'')
SET @TIPO=ISNULL(:FILTRORAPIDO,0)
SELECT  @TEXTO = @FECHADESDE+' - '+@FECHAHASTA
SET @TEXTOSQL = @FECHADESDE+' - '+@FECHAHASTA



INSERT INTO <#SESSION.DB/>.DBO.USUARIOS_FILTROS (IDUSUARIO, IDPANTALLA, TIPO, TEXTO, SQLTXT)
VALUES (<#SESSION.IDUSUARIO/>, @IDPANTALLA,@TIPO, @TEXTO,@TEXTOSQL)

update <#SESSION.DB/>.DBO.USUARIOS_DEFAULTS set DEFAULT_VENTAS_DESDE =CONVERT(DATETIME,@FECHADESDE,<#SESSION.CONVERTCODE/>), DEFAULT_VENTAS_HASTA =CONVERT(DATETIME,@FECHAHASTA,<#SESSION.CONVERTCODE/>) WHERE  IDUSUARIO=<#SESSION.IDUSUARIO/>