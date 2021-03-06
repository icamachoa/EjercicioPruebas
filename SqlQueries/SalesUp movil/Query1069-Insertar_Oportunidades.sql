//[bd|Untyped,fecha_cierre|Text,ganada_fecha|Text,perdida_fecha|Text,fechahora|Text,idoportunidad|Untyped,idprospecto|Untyped,concepto|Text,monto|Untyped,certeza|Untyped,idfase|Untyped,idlinea_producto|Untyped,comision|Untyped,comision_monto|Untyped,ganada|Untyped,perdida|Untyped,perdida_razon|Text,idusuario|Untyped,idrazonperdida|Untyped,campo13|Untyped,campo14|Untyped,campo15|Untyped,campo16|Untyped,campo17|Untyped,campo18|Untyped,campo19|Untyped,campo20|Untyped,campo26|Untyped,campo27|Untyped,campo28|Untyped,campo29|Untyped,campo30|Untyped,campo31|Untyped,campo32|Untyped,campo35|Text,campo36|Text,campo37|Text,campo38|Text,campo39|Text,campo40|Text,campo41|Text,campo42|Text,campo43|Text,campo44|Text,campo45|Text,campo46|Text,campo47|Text,campo48|Text,campo49|Text,campo50|Text,campo51|Text,campo52|Text,campo53|Text,campo54|Text,campo55|Text,campo56|Text,campo57|Text,campo58|Text,campo59|Text,campo60|Text,campo61|Text,campo62|Text,campo63|Text,campo64|Text,campo1|Untyped,campo2|Untyped,campo3|Untyped,campo4|Untyped,campo5|Untyped,campo6|Untyped,campo7|Untyped,campo8|Untyped,campo21|Untyped,campo22|Untyped,campo23|Untyped,campo24|Untyped,campo25|Untyped,campo9|Untyped,campo10|Untyped,campo11|Untyped,campo12|Untyped,idcatalogoopcion1|Untyped,idcatalogoopcion2|Untyped,idcatalogoopcion3|Untyped,]
--SELECT

DECLARE @BD VARCHAR(512)
DECLARE @EXECSQL VARCHAR(MAX)

SET @BD = '<#BD/>'

DECLARE @FECHA_CIERRE DATETIME
DECLARE @GANADA_FECHA DATETIME
DECLARE @PERDIDA_FECHA DATETIME
DECLARE @FECHAHORA DATETIME
DECLARE @IDOPORTUNIDAD INT
DECLARE @IDPROSPECTO INT
DECLARE @CONCEPTO VARCHAR(MAX)
DECLARE @MONTO FLOAT
DECLARE @CERTEZA FLOAT
DECLARE @IDFASE INT
DECLARE @IDLINEA_PRODUCTO INT
DECLARE @COMISION FLOAT
DECLARE @COMISION_MONTO FLOAT
DECLARE @GANADA INT
DECLARE @MONTO_PAGADO FLOAT
DECLARE @PERDIDA INT
DECLARE @PERDIDA_RAZON VARCHAR(MAX)
DECLARE @IDUSUARIO INT
DECLARE @IDRAZONPERDIDA INT

DECLARE @CAMPO1 INT 
DECLARE @CAMPO2 INT 
DECLARE @CAMPO3 INT 
DECLARE @CAMPO4 INT 
DECLARE @CAMPO5 FLOAT 
DECLARE @CAMPO6 FLOAT 
DECLARE @CAMPO7 FLOAT 
DECLARE @CAMPO8 FLOAT 
DECLARE @CAMPO9 DATETIME 
DECLARE @CAMPO10 DATETIME 
DECLARE @CAMPO11 DATETIME 
DECLARE @CAMPO12 DATETIME 
DECLARE @CAMPO13 VARCHAR(1024) 
DECLARE @CAMPO14 VARCHAR(1024) 
DECLARE @CAMPO15 VARCHAR(1024) 
DECLARE @CAMPO16 VARCHAR(1024) 
DECLARE @CAMPO17 VARCHAR(1024) 
DECLARE @CAMPO18 VARCHAR(1024) 
DECLARE @CAMPO19 VARCHAR(1024) 
DECLARE @CAMPO20 VARCHAR(1024) 
DECLARE @CAMPO21 INT 
DECLARE @CAMPO22 INT 
DECLARE @CAMPO23 INT 
DECLARE @CAMPO24 INT 
DECLARE @CAMPO25 INT 
DECLARE @CAMPO26 VARCHAR(1024) 
DECLARE @CAMPO27 VARCHAR(1024) 
DECLARE @CAMPO28 VARCHAR(1024) 
DECLARE @CAMPO29 VARCHAR(1024) 
DECLARE @CAMPO30 VARCHAR(1024) 
DECLARE @CAMPO31 VARCHAR(1024) 
DECLARE @CAMPO32 VARCHAR(1024) 

DECLARE @CAMPO35 VARCHAR(1024)
DECLARE @CAMPO36 VARCHAR(1024)
DECLARE @CAMPO37 VARCHAR(1024)
DECLARE @CAMPO38 VARCHAR(1024)
DECLARE @CAMPO39 VARCHAR(1024)
DECLARE @CAMPO40 VARCHAR(1024)
DECLARE @CAMPO41 VARCHAR(1024)
DECLARE @CAMPO42 VARCHAR(1024)
DECLARE @CAMPO43 VARCHAR(1024)
DECLARE @CAMPO44 VARCHAR(1024)
DECLARE @CAMPO45 VARCHAR(1024)
DECLARE @CAMPO46 VARCHAR(1024)
DECLARE @CAMPO47 VARCHAR(1024)
DECLARE @CAMPO48 VARCHAR(1024)
DECLARE @CAMPO49 VARCHAR(1024)
DECLARE @CAMPO50 VARCHAR(1024)
DECLARE @CAMPO51 VARCHAR(1024)
DECLARE @CAMPO52 VARCHAR(1024)
DECLARE @CAMPO53 VARCHAR(1024)
DECLARE @CAMPO54 VARCHAR(1024)
DECLARE @CAMPO55 VARCHAR(1024)
DECLARE @CAMPO56 VARCHAR(1024)
DECLARE @CAMPO57 VARCHAR(1024)
DECLARE @CAMPO58 VARCHAR(1024)
DECLARE @CAMPO59 VARCHAR(1024)
DECLARE @CAMPO60 VARCHAR(1024)
DECLARE @CAMPO61 VARCHAR(1024)
DECLARE @CAMPO62 VARCHAR(1024)
DECLARE @CAMPO63 VARCHAR(1024)
DECLARE @CAMPO64 VARCHAR(1024)

DECLARE @IDCATALOGOOPCION1 INT
DECLARE @IDCATALOGOOPCION2 INT
DECLARE @IDCATALOGOOPCION3 INT

IF ((:FECHA_CIERRE != '')AND(:FECHA_CIERRE IS NOT NULL)AND(:FECHA_CIERRE != 'undefined'))
   SET @FECHA_CIERRE = CONVERT(DATETIME,:FECHA_CIERRE,20)
ELSE
  SET @FECHA_CIERRE = ''

IF ((:GANADA_FECHA != '')AND(:GANADA_FECHA IS NOT NULL)AND(:GANADA_FECHA != 'null'))
   SET @GANADA_FECHA = CONVERT(DATETIME,:GANADA_FECHA,20)
ELSE
  SET @GANADA_FECHA = ''

IF ((:PERDIDA_FECHA != '')AND(:PERDIDA_FECHA IS NOT NULL)AND(:PERDIDA_FECHA != 'null'))
   SET @PERDIDA_FECHA = CONVERT(DATETIME,:PERDIDA_FECHA,20)
ELSE
  SET @PERDIDA_FECHA = ''

IF ((:FECHAHORA <> '')AND(:FECHAHORA IS NOT NULL))
   SET @FECHAHORA = CONVERT(DATETIME,:FECHAHORA,20)
ELSE
  SET @FECHAHORA = '' 

SET @IDOPORTUNIDAD = CAST('<#IDOPORTUNIDAD/>' AS INT)
SET @IDPROSPECTO = CAST('<#IDPROSPECTO>' AS INT)
SET @CONCEPTO = ISNULL(REPLACE(:CONCEPTO,'''',''''''),'')
SET @MONTO = CAST('<#MONTO/>' AS FLOAT)
SET @CERTEZA = CAST('<#CERTEZA/>' AS FLOAT)
SET @IDFASE = CAST('<#IDFASE/>' AS INT)
SET @IDLINEA_PRODUCTO = CAST('<#IDLINEA_PRODUCTO/>' AS INT)
SET @COMISION = CAST('<#COMISION/>' AS FLOAT)
SET @COMISION=ISNULL(@COMISION, 0)/100

SET @COMISION_MONTO = CAST('<#COMISION_MONTO/>' AS FLOAT)
SET @GANADA = CAST('<#GANADA/>' AS INT)
SET @PERDIDA = CAST('<#PERDIDA/>' AS INT)



IF(:PERDIDA_RAZON != 'null' AND :PERDIDA_RAZON != 'undefined')
	SET @PERDIDA_RAZON = ISNULL(:PERDIDA_RAZON,'')
ELSE
	SET @PERDIDA_RAZON = 0
	
SET @IDUSUARIO = CAST('<#IDUSUARIO/>' AS INT)

IF('<#IDRAZONPERDIDA/>' != 'null' AND '<#IDRAZONPERDIDA/>' != 'undefined')
	SET @IDRAZONPERDIDA = CAST('<#IDRAZONPERDIDA/>' AS INT)
ELSE
	SET @IDRAZONPERDIDA = 0

SET @CAMPO13 = ISNULL(REPLACE('<#CAMPO13/>','''',''''''),'') 
SET @CAMPO14 = ISNULL(REPLACE('<#CAMPO14/>','''',''''''),'') 
SET @CAMPO15 = ISNULL(REPLACE('<#CAMPO15/>','''',''''''),'') 
SET @CAMPO16 = ISNULL(REPLACE('<#CAMPO16/>','''',''''''),'') 
SET @CAMPO17 = ISNULL(REPLACE('<#CAMPO17/>','''',''''''),'') 
SET @CAMPO18 = ISNULL(REPLACE('<#CAMPO18/>','''',''''''),'') 
SET @CAMPO19 = ISNULL(REPLACE('<#CAMPO19/>','''',''''''),'') 
SET @CAMPO20 = ISNULL(REPLACE('<#CAMPO20/>','''',''''''),'') 
SET @CAMPO26 = ISNULL(REPLACE('<#CAMPO26/>','''',''''''),'') 
SET @CAMPO27 = ISNULL(REPLACE('<#CAMPO27/>','''',''''''),'') 
SET @CAMPO28 = ISNULL(REPLACE('<#CAMPO28/>','''',''''''),'') 
SET @CAMPO29 = ISNULL(REPLACE('<#CAMPO29/>','''',''''''),'') 
SET @CAMPO30 = ISNULL(REPLACE('<#CAMPO30/>','''',''''''),'') 
SET @CAMPO31 = ISNULL(REPLACE('<#CAMPO31/>','''',''''''),'') 
SET @CAMPO32 = ISNULL(REPLACE('<#CAMPO32/>','''',''''''),'') 

IF(@IDOPORTUNIDAD = 0)
BEGIN
SET @CAMPO35 = ISNULL(REPLACE(:CAMPO35,'''',''''''),'')
SET @CAMPO36 = ISNULL(REPLACE(:CAMPO36,'''',''''''),'') 
SET @CAMPO37 = ISNULL(REPLACE(:CAMPO37,'''',''''''),'') 
SET @CAMPO38 = ISNULL(REPLACE(:CAMPO38,'''',''''''),'') 
SET @CAMPO39 = ISNULL(REPLACE(:CAMPO39,'''',''''''),'') 
SET @CAMPO40 = ISNULL(REPLACE(:CAMPO40,'''',''''''),'')

SET @CAMPO41 = ISNULL(REPLACE(:CAMPO41,'''',''''''),'') 
SET @CAMPO42 = ISNULL(REPLACE(:CAMPO42,'''',''''''),'') 
SET @CAMPO43 = ISNULL(REPLACE(:CAMPO43,'''',''''''),'') 
SET @CAMPO44 = ISNULL(REPLACE(:CAMPO44,'''',''''''),'') 
SET @CAMPO45 = ISNULL(REPLACE(:CAMPO45,'''',''''''),'') 
SET @CAMPO46 = ISNULL(REPLACE(:CAMPO46,'''',''''''),'') 
SET @CAMPO47 = ISNULL(REPLACE(:CAMPO47,'''',''''''),'') 
SET @CAMPO48 = ISNULL(REPLACE(:CAMPO48,'''',''''''),'') 
SET @CAMPO49 = ISNULL(REPLACE(:CAMPO49,'''',''''''),'') 
SET @CAMPO50 = ISNULL(REPLACE(:CAMPO50,'''',''''''),'')

SET @CAMPO51 = ISNULL(REPLACE(:CAMPO51,'''',''''''),'') 
SET @CAMPO52 = ISNULL(REPLACE(:CAMPO52,'''',''''''),'') 
SET @CAMPO53 = ISNULL(REPLACE(:CAMPO53,'''',''''''),'') 
SET @CAMPO54 = ISNULL(REPLACE(:CAMPO54,'''',''''''),'') 
SET @CAMPO55 = ISNULL(REPLACE(:CAMPO55,'''',''''''),'') 
SET @CAMPO56 = ISNULL(REPLACE(:CAMPO56,'''',''''''),'') 
SET @CAMPO57 = ISNULL(REPLACE(:CAMPO57,'''',''''''),'') 
SET @CAMPO58 = ISNULL(REPLACE(:CAMPO58,'''',''''''),'') 
SET @CAMPO59 = ISNULL(REPLACE(:CAMPO59,'''',''''''),'') 
SET @CAMPO60 = ISNULL(REPLACE(:CAMPO60,'''',''''''),'')

SET @CAMPO61 = ISNULL(REPLACE(:CAMPO61,'''',''''''),'') 
SET @CAMPO62 = ISNULL(REPLACE(:CAMPO62,'''',''''''),'') 
SET @CAMPO63 = ISNULL(REPLACE(:CAMPO63,'''',''''''),'') 
SET @CAMPO64 = ISNULL(REPLACE(:CAMPO64,'''',''''''),'')   
END
ELSE
BEGIN
	 SELECT @CAMPO35 = ISNULL(:CAMPO35,CAMPO35) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO36 = ISNULL(:CAMPO36,CAMPO36) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO37 = ISNULL(:CAMPO37,CAMPO37) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO38 = ISNULL(:CAMPO38,CAMPO38) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO39 = ISNULL(:CAMPO39,CAMPO39) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO40 = ISNULL(:CAMPO40,CAMPO40) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 
	 SELECT @CAMPO41 = ISNULL(:CAMPO41,CAMPO41) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO42 = ISNULL(:CAMPO42,CAMPO42) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO43 = ISNULL(:CAMPO43,CAMPO43) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO44 = ISNULL(:CAMPO44,CAMPO44) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO45 = ISNULL(:CAMPO45,CAMPO45) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO46 = ISNULL(:CAMPO46,CAMPO46) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO47 = ISNULL(:CAMPO47,CAMPO47) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO48 = ISNULL(:CAMPO48,CAMPO48) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO49 = ISNULL(:CAMPO49,CAMPO49) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO50 = ISNULL(:CAMPO50,CAMPO50) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 
	 SELECT @CAMPO51 = ISNULL(:CAMPO51,CAMPO51) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO52 = ISNULL(:CAMPO52,CAMPO52) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO53 = ISNULL(:CAMPO53,CAMPO53) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO54 = ISNULL(:CAMPO54,CAMPO54) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO55 = ISNULL(:CAMPO55,CAMPO55) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO56 = ISNULL(:CAMPO56,CAMPO56) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO57 = ISNULL(:CAMPO57,CAMPO57) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO58 = ISNULL(:CAMPO58,CAMPO58) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO59 = ISNULL(:CAMPO59,CAMPO59) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO60 = ISNULL(:CAMPO60,CAMPO60) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 
	 SELECT @CAMPO61 = ISNULL(:CAMPO61,CAMPO61) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO62 = ISNULL(:CAMPO62,CAMPO62) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO63 = ISNULL(:CAMPO63,CAMPO63) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 SELECT @CAMPO64 = ISNULL(:CAMPO64,CAMPO64) FROM <#BD/>.DBO.OPORTUNIDADES WHERE IDOPORTUNIDAD = @IDOPORTUNIDAD
	 
END 

IF ('<#CAMPO1/>' = 'undefined' OR '<#CAMPO1/>' = 'null')
   SET @CAMPO1 = ''
ELSE
   SET @CAMPO1 = CAST('<#CAMPO1/>' AS INT)
   
IF ('<#CAMPO2/>' = 'undefined' OR '<#CAMPO2/>' = 'null')
   SET @CAMPO2 = ''
ELSE
   SET @CAMPO2 = CAST('<#CAMPO2/>' AS INT)
   
IF ('<#CAMPO3/>' = 'undefined' OR '<#CAMPO3/>' = 'null')
   SET @CAMPO3 = ''
ELSE
   SET @CAMPO3 = CAST('<#CAMPO3/>' AS INT)
   
IF ('<#CAMPO4/>' = 'undefined' OR '<#CAMPO4/>' = 'null')
   SET @CAMPO4 = ''
ELSE
   SET @CAMPO4 = CAST('<#CAMPO4/>' AS INT)


IF ('<#CAMPO5/>' = 'undefined' OR '<#CAMPO5/>' = 'null')
   SET @CAMPO5 = ''
ELSE
   SET @CAMPO5 = CAST('<#CAMPO5/>' AS FLOAT)
   
IF ('<#CAMPO6/>' = 'undefined' OR '<#CAMPO6/>' = 'null')
   SET @CAMPO6 = ''
ELSE
   SET @CAMPO6 = CAST('<#CAMPO6/>' AS FLOAT)

IF ('<#CAMPO7/>' = 'undefined' OR '<#CAMPO7/>' = 'null')
   SET @CAMPO7 = ''
ELSE
   SET @CAMPO7 = CAST('<#CAMPO7/>' AS FLOAT)
   
IF ('<#CAMPO8/>' = 'undefined' OR '<#CAMPO8/>' = 'null')
   SET @CAMPO8 = ''
ELSE
   SET @CAMPO8 = CAST('<#CAMPO8/>' AS FLOAT)

IF ('<#CAMPO21/>' = 'undefined' OR '<#CAMPO21/>' = 'null')
   SET @CAMPO21 = ''
ELSE
   SET @CAMPO21 = CAST('<#CAMPO21/>' AS INT)   

IF ('<#CAMPO22/>' = 'undefined' OR '<#CAMPO22/>' = 'null')
   SET @CAMPO22 = ''
ELSE
   SET @CAMPO22 = CAST('<#CAMPO22/>' AS INT)
  
IF ('<#CAMPO23/>' = 'undefined' OR '<#CAMPO23/>' = 'null')
   SET @CAMPO23 = ''
ELSE
   SET @CAMPO23 = CAST('<#CAMPO23/>' AS INT)
   
IF ('<#CAMPO24/>' = 'undefined' OR '<#CAMPO24/>' = 'null')
   SET @CAMPO24 = ''
ELSE
   SET @CAMPO24 = CAST('<#CAMPO24/>' AS INT)
   
IF ('<#CAMPO25/>' = 'undefined' OR '<#CAMPO25/>' = 'null')
   SET @CAMPO25 = ''
ELSE
   SET @CAMPO25 = CAST('<#CAMPO25/>' AS INT)  

IF (('<#CAMPO9/>' != '')AND('<#CAMPO9/>' IS NOT NULL) AND ('<#CAMPO9/>' != 'null'))     
    SET @CAMPO9 = CONVERT(DATETIME,'<#CAMPO9/>',20)  
ELSE     
    SET @CAMPO9 = '' 
  
IF (('<#CAMPO10/>' != '')AND('<#CAMPO10/>' IS NOT NULL) AND ('<#CAMPO10/>' != 'null')) 
     SET @CAMPO10 = CONVERT(DATETIME,'<#CAMPO10/>',20)  
ELSE     
    SET @CAMPO10 = '' 
  
IF (('<#CAMPO11/>' != '')AND('<#CAMPO11/>' IS NOT NULL) AND ('<#CAMPO11/>' != 'null')) 
     SET @CAMPO11 = CONVERT(DATETIME,'<#CAMPO11/>',20) 
  ELSE 
      SET @CAMPO11 = '' 
  
IF (('<#CAMPO12/>' != '')AND('<#CAMPO12/>' IS NOT NULL) AND ('<#CAMPO12/>' != 'null')) 
     SET @CAMPO12 = CONVERT(DATETIME,'<#CAMPO12/>',20)  
  ELSE 
     SET @CAMPO12 = ''
	 
IF ('<#IDCATALOGOOPCION1/>' = 'undefined' OR '<#IDCATALOGOOPCION1/>' = 'null')
   SET @IDCATALOGOOPCION1 = ''
ELSE
   SET @IDCATALOGOOPCION1 = CAST('<#IDCATALOGOOPCION1/>' AS INT)
   
IF ('<#IDCATALOGOOPCION2/>' = 'undefined' OR '<#IDCATALOGOOPCION2/>' = 'null')
   SET @IDCATALOGOOPCION2 = ''
ELSE
   SET @IDCATALOGOOPCION2 = CAST('<#IDCATALOGOOPCION2/>' AS INT) 
   
IF ('<#IDCATALOGOOPCION3/>' = 'undefined' OR '<#IDCATALOGOOPCION3/>' = 'null')
   SET @IDCATALOGOOPCION3 = ''
ELSE
   SET @IDCATALOGOOPCION3 = CAST('<#IDCATALOGOOPCION3/>' AS INT)
   
EXEC <#BD/>.DBO.SP_INSERTA_OPORTUNIDAD_MV @FECHA_CIERRE,@GANADA_FECHA,@PERDIDA_FECHA,@FECHAHORA,@IDOPORTUNIDAD,@IDPROSPECTO,@CONCEPTO,@MONTO,@CERTEZA,@IDFASE,@IDLINEA_PRODUCTO,@COMISION,@COMISION_MONTO,@GANADA,@PERDIDA,@PERDIDA_RAZON,@IDUSUARIO,@IDRAZONPERDIDA,
@CAMPO1,@CAMPO2,@CAMPO3,@CAMPO4,@CAMPO5,@CAMPO6,@CAMPO7,@CAMPO8,@CAMPO9,@CAMPO10,@CAMPO11,@CAMPO12,@CAMPO13,@CAMPO14,@CAMPO15,@CAMPO16,@CAMPO17,@CAMPO18,@CAMPO19,@CAMPO20,@CAMPO21,@CAMPO22,@CAMPO23,@CAMPO24,@CAMPO25,@CAMPO26,@CAMPO27,@CAMPO28,@CAMPO29,@CAMPO30,@CAMPO31,@CAMPO32,
@CAMPO35,@CAMPO36,@CAMPO37,@CAMPO38,@CAMPO39,@CAMPO40,@CAMPO41,@CAMPO42,@CAMPO43,@CAMPO44,@CAMPO45,@CAMPO46,@CAMPO47,@CAMPO48,@CAMPO49,@CAMPO50,@CAMPO51,@CAMPO52,@CAMPO53,@CAMPO54,@CAMPO55,@CAMPO56,@CAMPO57,@CAMPO58,@CAMPO59,@CAMPO60,@CAMPO61,@CAMPO62,@CAMPO63,@CAMPO64,
@IDCATALOGOOPCION1,@IDCATALOGOOPCION2,@IDCATALOGOOPCION3 