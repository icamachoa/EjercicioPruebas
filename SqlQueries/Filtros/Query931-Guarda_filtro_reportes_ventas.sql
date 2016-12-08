//[filtrodetallereportes|Integer,filtrodetallereportes2|Text,session.db|Untyped,session.idusuario|Untyped,idpantalla|Integer,]
--INSERT

DECLARE @TEXTO VARCHAR(2024)
DECLARE @TEXTOSQL VARCHAR(2024)
DECLARE @SQLTXT_EXP VARCHAR(2024)

DECLARE @TIPO INT
DECLARE @GRUPO VARCHAR(255)

SET @TEXTOSQL=''
SET @TIPO=ISNULL(:FiltroDetalleReportes,0)
SET @GRUPO=ISNULL(:FiltroDetalleReportes2,'')
SET @SQLTXT_EXP='1=1'


-- Prospectos
IF @TIPO=1

  BEGIN
  	IF @GRUPO = '0'
	BEGIN
		SELECT @SQLTXT_EXP = '1=1' 
	END
	ELSE
	BEGIN
		SELECT @SQLTXT_EXP = 'U.IDGRUPO='+@GRUPO 
	END
    SELECT  @TEXTO = @GRUPO
    SET @TEXTOSQL = 'data.dbsp'
  END	

IF @TIPO=2

  BEGIN
      SELECT  @TEXTO = 'Por grupos/departamentos'
    SET @TEXTOSQL = 'grupos.dbsp'
  END

IF @TIPO=3

  BEGIN
      SELECT  @TEXTO = 'Por lineas de producto'
    SET @TEXTOSQL = 'lineas.dbsp'
  END

IF @TIPO=4

  BEGIN
      SELECT  @TEXTO = 'Por origen'
    SET @TEXTOSQL = 'origen.dbsp'
  END

IF @TIPO=5

  BEGIN
      SELECT  @TEXTO = 'Por país'
    SET @TEXTOSQL = 'pais.dbsp'
  END

IF @TIPO=6

  BEGIN
      SELECT  @TEXTO = 'Por región'
    SET @TEXTOSQL = 'region.dbsp'
  END

IF @TIPO=7

  BEGIN
      SELECT  @TEXTO = 'Por ciudad'
    SET @TEXTOSQL = 'ciudad.dbsp'
  END 
  INSERT INTO <#SESSION.DB/>.DBO.USUARIOS_FILTROS (IDUSUARIO, IDPANTALLA, TIPO, TEXTO, SQLTXT,SQLTXT_EXP)
VALUES (<#SESSION.IDUSUARIO/>, ISNULL(:IDPANTALLA,0),@TIPO, @TEXTO,@SQLTXT_EXP,@TEXTOSQL)


