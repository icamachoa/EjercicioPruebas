//[idpantalla|Integer,filtrorecordatoriofecha|Integer,fechadesde|Text,session.convertcode|Untyped,fechahasta|Text,session.db|Untyped,session.idusuario|Untyped,]
--INSERT
/*protegido*/
DECLARE @TEXTO VARCHAR(2024)
DECLARE @TEXTOSQL VARCHAR(2024)
DECLARE @FECHADESDE VARCHAR(100)
DECLARE @FECHAHASTA VARCHAR(100)
DECLARE @CONVERTCODE INT
DECLARE @IDUSUARIO INT
DECLARE @TIPO INT
DECLARE @IDPANTALLA INT
SET @IDPANTALLA = ISNULL(:IDPANTALLA,0)
SET @TIPO = ISNULL(:FiltroRecordatorioFecha,0)
SET @FECHADESDE = ISNULL(:FECHADESDE,'')
SET @FECHAHASTA = ISNULL(:FECHAHASTA,'')
SET @CONVERTCODE = <#SESSION.CONVERTCODE/>
SET @IDUSUARIO = <#SESSION.IDUSUARIO/>

IF @IDPANTALLA  = 18
BEGIN
  DECLARE @HOY DATETIME
  SET @HOY = dbo.GetOnlyDAte(GETDATE())

  DECLARE @F_I DATETIME
  DECLARE @F_F DATETIME
  SET  @F_I = CONVERT(DATETIME,@FECHADESDE,@CONVERTCODE)
  SET  @F_F =   @F_I
  IF @TIPO = 1
   BEGIN
    SET  @F_I =   @HOY
    SET  @F_F =  @HOY
   END 
  
  IF @TIPO = 2
   BEGIN
    SET  @F_I =   @HOY-1
    SET  @F_F = @HOY-1
   END 

  IF @TIPO = 3
   BEGIN
    SET  @F_I =   dateadd(dd, (datepart(dw, @HOY) * -1) + 2, @HOY)
    SET  @F_F = dateadd(day, +6, dateadd(dd, (datepart(dw, @HOY) * -1) + 2, @HOY))
   END 

  IF @TIPO = 4
   BEGIN
    SET  @F_I = dateadd(day, -7, dateadd(dd, (datepart(dw, @HOY) * -1) + 2, @HOY))
    SET  @F_F =  dateadd(day, -1,  dateadd(dd, (datepart(dw, @HOY) * -1) + 2, @HOY))
   END 

  IF @TIPO = 5
   BEGIN
    SET  @F_I =  DATEADD(MONTH, DATEDIFF(MONTH, 0, @HOY), 0)
    SET  @F_F =  DATEADD(DAY, -1, DATEADD(MONTH, DATEDIFF(MONTH, 0, @HOY) + 1, 0)) 
   END 

  IF @TIPO = 6
   BEGIN
    SET  @F_I = dateadd(m, datediff(m, 0, dateadd(MM, -1,@HOY)), 0)
    SET  @F_F =  dateadd(m, datediff(m, 0, dateadd(m, 1, dateadd(MM, -1,@HOY))), -1) 
   END 
 
  IF @TIPO = 7
   BEGIN
    SET  @F_I = dateadd(m, datediff(m, 0, dateadd(MM, -2,@HOY)), 0)
    SET  @F_F =  dateadd(m, datediff(m, 0, dateadd(m, 1, dateadd(MM, -2,@HOY))), -1) 
   END 

 IF @TIPO = 9
   BEGIN
    SET  @F_I = CONVERT(DATETIME, '01/01/'+ CONVERT(VARCHAR(4), YEAR(@HOY)), 103)
    SET  @F_F =  CONVERT(DATETIME, '31/12/'+ CONVERT(VARCHAR(4), YEAR(@HOY)), 103) 
   END 

 IF @TIPO = 10
   BEGIN
    SET  @F_I = @HOY
    SET  @F_F =  CONVERT(DATETIME, '31/12/2100', 103) 
   END 

 IF @TIPO = 8
   BEGIN
    SET  @F_I = CONVERT(DATETIME, '01/04/2000', 103) 
    SET  @F_F =  CONVERT(DATETIME, '31/12/2100', 103) 
   END 

  SELECT  @TEXTO =CAST(@TIPO AS VARCHAR(1000))
  SET @TEXTOSQL = @FECHADESDE+' - '+@FECHAHASTA

  INSERT INTO <#SESSION.DB/>.DBO.USUARIOS_FILTROS (IDUSUARIO, IDPANTALLA, TIPO, TEXTO, SQLTXT)
  VALUES (@IDUSUARIO, @IDPANTALLA,@TIPO,@TEXTO ,@TEXTOSQL)

 IF @TIPO!=18
   update <#SESSION.DB/>.DBO.USUARIOS_DEFAULTS 
    set DEFAULT_VENTAS_DESDE =@F_I, DEFAULT_VENTAS_HASTA =  @F_F
    WHERE  IDUSUARIO = @IDUSUARIO
	   
END