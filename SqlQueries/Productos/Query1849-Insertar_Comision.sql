//[actualiza|Integer,session.idempresa|Untyped,session.db|Untyped,descripcion|Text,tk|Text,monto|Numeric,]
--INSERT 

DECLARE @IDEMPRESA INT 
DECLARE @DESCRIPCION VARCHAR(MAX)
DECLARE @IDCOMISION INT 
DECLARE @INDICE INT 
DECLARE @INDICEEXISTENTE VARCHAR(128) 
DECLARE @MONTO FLOAT 
DECLARE @ACTUALIZA INT 

DECLARE @INDIC INT 
DECLARE @IDCOM INT 
DECLARE @SQLTEXT VARCHAR(MAX) 
DECLARE @CAMPO VARCHAR(32)
DECLARE @T FLOAT
DECLARE @TK VARCHAR(256) 

SET @ACTUALIZA=ISNULL(:ACTUALIZA, 0)
SET @IDEMPRESA=<#SESSION.IDEMPRESA/>
SET @DESCRIPCION=<#SESSION.DB/>.DBO.PREPARACADENA(ISNULL(:DESCRIPCION, ''))
SET @TK =ISNULL(:TK, '') 
SET @IDCOMISION=0

IF(@TK !='') BEGIN SELECT @IDCOMISION=IDPRODUCTO_COMISION FROM <#SESSION.DB/>.DBO.PRODUCTOS_COMISIONES WHERE TKCOMISION=@TK END

SET @MONTO=ISNULL(:MONTO, 0)
   


IF(@IDCOMISION=0)
 BEGIN
  SELECT TOP 1 @INDICE=INDICE FROM SALESUP_CT.DBO.V_INDICES WHERE INDICE NOT IN (SELECT INDICE FROM <#SESSION.DB/>.DBO.PRODUCTOS_COMISIONES WHERE IDEMPRESA=@IDEMPRESA ) 
  INSERT INTO <#SESSION.DB/>.DBO.PRODUCTOS_COMISIONES (IDEMPRESA, INDICE, STATUS, DESCRIPCION, MONTO)
       VALUES(@IDEMPRESA,  @INDICE, 1, @DESCRIPCION, @MONTO)
   	   
	   SELECT TOP 1 @IDCOM=IDPRODUCTO_COMISION, @INDIC=INDICE, @T=MONTO FROM <#SESSION.DB/>.DBO.PRODUCTOS_COMISIONES where idempresa = @idempresa ORDER BY 1 DESC
	   
	   IF(@ACTUALIZA=1)
	   BEGIN 
		 SET @CAMPO='COMISION'+CAST(@INDIC AS VARCHAR(10))
		 SET @SQLTEXT= 'UPDATE <#SESSION.DB/>.DBO.PRODUCTOS 
		 SET '+@CAMPO+'='+CAST(@T AS VARCHAR(MAX))
		 +' WHERE IDEMPRESA='+CAST(@IDEMPRESA AS VARCHAR(MAX))
		 EXEC (@SQLTEXT)
	   END
	   
	   EXEC <#SESSION.DB/>.DBO.SP_AGREGA_COLUMAS_PRODUCTOS @IDEMPRESA,@IDCOM,3
 END
ELSE
 BEGIN 
  UPDATE <#SESSION.DB/>.DBO.PRODUCTOS_COMISIONES 
  SET DESCRIPCION=@DESCRIPCION,
      MONTO=@MONTO
  WHERE IDEMPRESA=@IDEMPRESA AND IDPRODUCTO_COMISION=@IDCOMISION
 END 

   
	 