//[filtrotipoconversaciones|Integer,session.db|Untyped,session.idusuario|Untyped,idpantalla|Integer,]
--INSERT

DECLARE @TEXTO VARCHAR(2024)
DECLARE @TEXTOSQL VARCHAR(2024)

DECLARE @TIPO INT

SET @TIPO=ISNULL(:FiltroTipoConversacioneS,0)

-- Prospectos
IF @TIPO=1

  BEGIN
      SELECT  @TEXTO = 'Por origenes'
    SET @TEXTOSQL = '1'
  END

IF @TIPO=2

  BEGIN
      SELECT  @TEXTO = 'Por ejecutivos/departamentos'
    SET @TEXTOSQL = '2'
  END

IF @TIPO=3

  BEGIN
      SELECT  @TEXTO = 'Por grupos'
    SET @TEXTOSQL = '3'
  END


INSERT INTO <#SESSION.DB/>.DBO.USUARIOS_FILTROS (IDUSUARIO, IDPANTALLA, TIPO, TEXTO, SQLTXT)
VALUES (<#SESSION.IDUSUARIO/>, ISNULL(:IDPANTALLA,0),@TIPO, @TEXTO, @TEXTOSQL)