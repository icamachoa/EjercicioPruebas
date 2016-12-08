//[session.idempresa|Untyped,tkopt|Text,concepto|Text,monto|Numeric,selectfase|Text,selectlinea|Text,session.db|Untyped,selectcerteza|Numeric,estimado|Integer,]
--INSERT

DECLARE @TKOPT varchar(256) 
DECLARE @selectLinea INT 
DECLARE @concepto VARCHAR (128)
DECLARE @monto  float
DECLARE @selectcerteza float
DECLARE @selectFase INT
DECLARE @estimado INT
DECLARE @TKLINEA_PRODUCTO VARCHAR(256) 
DECLARE @TKFASE VARCHAR(256) 
DECLARE @IDEMPRESA INT 


SET @IDEMPRESA=<#SESSION.IDEMPRESA/>
SET @TKOPT= ISNULL(:TKOPT,'')
SET @concepto= <#SESSION.DB/>.DBO.PREPARACADENA( ISNULL(:concepto,''))
SET @monto= ISNULL(:monto,0)
SET @TKFASE=ISNULL(:selectFase, '') 
SET @TKLINEA_PRODUCTO=ISNULL(:selectLinea, '') 
SELECT @selectFase= IDFASE FROM <#SESSION.DB/>.DBO.OPORTUNIDADES_FASES WHERE IDEMPRESA=@IDEMPRESA AND TK=@TKFASE
SELECT @selectLinea=IDLINEA_PRODUCTO FROM <#SESSION.DB/>.DBO.EMPRESAS_LINEAS_PRODUCTO WHERE IDEMPRESA=@IDEMPRESA AND TK=@TKLINEA_PRODUCTO
SET @selectcerteza= isnull(:selectcerteza,0)
SET @estimado= isnull(:estimado,0)

SELECT @selectLinea
IF(@TKOPT='')
 BEGIN 
  INSERT INTO <#SESSION.DB/>.DBO.OPORTUNIDADES_TEMPLATES (IDEMPRESA, IDLINEA, CONCEPTO, MONTO,CERTEZA,IDFASE,DIASCIERREESTIMADO) 
  VALUES (<#SESSION.IDEMPRESA/>, @selectLinea, @concepto, @monto, CAST(@selectcerteza AS FLOAT), @selectFase, @estimado) 
 END
ELSE
BEGIN 
 UPDATE <#SESSION.DB/>.DBO.OPORTUNIDADES_TEMPLATES
 SET  IDLINEA=@selectLinea, 
      CONCEPTO=@concepto,
	  MONTO=@monto, 
	  CERTEZA=@selectcerteza, 
	  IDFASE=@selectFase,
	  DIASCIERREESTIMADO=@estimado
WHERE TK=@TKOPT
END



