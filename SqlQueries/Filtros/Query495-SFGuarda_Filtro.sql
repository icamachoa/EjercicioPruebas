//[filtrotipo|Text|,filtrodetalle|Text|,idpantalla|Text|,session.idusuario|Untyped|,session.nivel|Untyped|,session.idgrupo|Untyped|,session.idempresa|Untyped|,filtrodetalletxt|Text|,fecha_desde|Text|,fecha_hasta|Text|,session.convertcode|Untyped|,filtrodetalle2|Text|,fechadesde|Text|,fechahasta|Text|,condicion|Text,NEGATIVO|Integer]
--INSERT

DECLARE @IDEMPRESA VARCHAR(16), @IDUSUARIO VARCHAR(16), @IDGRUPO VARCHAR(16),
@NIVEL VARCHAR(16), @CONVERTCODE VARCHAR(8), 
@IDPANTALLA  VARCHAR(8), @FILTROTIPO  VARCHAR(8), @FILTRODETALLE VARCHAR(512),
@FILTRODETALLE2 VARCHAR(512), @FILTROTXT VARCHAR(512),
@FECHA_INICIO VARCHAR(32), @FECHA_FIN VARCHAR(32)

SELECT 
  @IDEMPRESA     = <#SESSION.IDEMPRESA/>,     @IDUSUARIO =  <#SESSION.IDUSUARIO/>, 
  @IDGRUPO       = <#SESSION.IDGRUPO/>,       @NIVEL     =  <#SESSION.NIVEL/>,
  @CONVERTCODE   = <#SESSION.CONVERTCODE/>,   @FILTROTXT =  :filtrodetalletxt,
  @IDPANTALLA    = :IDPANTALLA,             @FILTROTIPO  =  :FILTROTIPO, 
  @FILTRODETALLE = :FILTRODETALLE,       @FILTRODETALLE2 =  :FILTRODETALLE2,    
  @FECHA_INICIO  = :fecha_desde,             @FECHA_FIN  =  :fecha_hasta
  
  IF :condicion IS NOT NULL
    SET @FILTROTXT = :condicion

  IF :fechadesde IS NOT NULL
    SET @FECHA_INICIO = :fechadesde

  IF :fechahasta IS NOT NULL
    SET @FECHA_FIN = :fechahasta

  DECLARE @NEGATIVO INT
  SET @NEGATIVO = ISNULL(:NEGATIVO,0)

EXEC  <#SESSION.DB/>.DBO.SP_GUARDA_FILTRO @IDEMPRESA, @IDUSUARIO, @IDGRUPO , @NIVEL , @CONVERTCODE , @IDPANTALLA , @FILTROTIPO , @FILTRODETALLE , @FILTRODETALLE2 , @FILTROTXT , @FECHA_INICIO , @FECHA_FIN, '<#SESSION.DB/>' , @NEGATIVO