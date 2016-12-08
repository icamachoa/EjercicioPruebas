//[idpantalla|Integer,filtrodetallereportes|Integer,filtrodetallereportes2|Text,session.db|Untyped,session.idusuario|Untyped,]
--INSERT

DECLARE @TEXTO VARCHAR(2024)
DECLARE @TEXTOSQL VARCHAR(2024)
DECLARE @SQLTXT_EXP VARCHAR(2024)

DECLARE @TIPO INT
DECLARE @GRUPO VARCHAR(255)
DECLARE @IDPANTALLA INT = :IDPANTALLA

SET @TIPO=:FiltroDetalleReportes
SET @GRUPO=ISNULL(:FiltroDetalleReportes2,'')
SET @SQLTXT_EXP=' AND 1=1'

-- Prospectos
IF @TIPO=1

  BEGIN
  	IF @GRUPO = '0'
	BEGIN
		SELECT @SQLTXT_EXP = ' AND 1=1'
	END
	ELSE
	BEGIN
		SELECT @SQLTXT_EXP = ' AND U.IDGRUPO='+@GRUPO
	END
    SELECT  @TEXTO = @GRUPO
    SET @TEXTOSQL = 'ejecutivo_data.dbsp'
  END

IF @TIPO=2

  BEGIN
      SELECT  @TEXTO = 'Por grupos/departamentos'
    SET @TEXTOSQL = 'grupos_data.dbsp'
  END

IF @TIPO=3

  BEGIN
      SELECT  @TEXTO = 'Por lineas de producto'
    SET @TEXTOSQL = 'lineas_data.dbsp'
  END

IF @TIPO=4

  BEGIN
      SELECT  @TEXTO = 'Por origen'
    SET @TEXTOSQL = 'origen_data.dbsp'
  END

IF @TIPO=5

  BEGIN
      SELECT  @TEXTO = 'Por país'
    SET @TEXTOSQL = 'pais_data.dbsp'
  END

IF @TIPO=6

  BEGIN
      SELECT  @TEXTO = 'Por región'
    SET @TEXTOSQL = 'region_data.dbsp'
  END

IF @TIPO=7

  BEGIN
      SELECT  @TEXTO = 'Por ciudad'
    SET @TEXTOSQL = 'ciudad_data.dbsp'
  END

IF @TIPO=8

  BEGIN
      SELECT  @TEXTO = 'Por probabilidad'
    SET @TEXTOSQL = 'probabilidad_data.dbsp'
  END
  
  

INSERT INTO <#SESSION.DB/>.DBO.USUARIOS_FILTROS (IDUSUARIO, IDPANTALLA, TIPO, TEXTO, SQLTXT,SQLTXT_EXP)
VALUES (<#SESSION.IDUSUARIO/>, @IDPANTALLA,@TIPO, @TEXTO, @TEXTOSQL, @SQLTXT_EXP)