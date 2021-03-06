//[grupo|Text,session.idempresa|Untyped,auditar|Integer,session.db|Untyped,tk|Text,]
--UPDATE
DECLARE @GRUPO VARCHAR(1000)
DECLARE @TK VARCHAR(MAX)
DECLARE @IDEMPRESA INT
DECLARE @AUDITADO INT
DECLARE @IDUSUARIOGRUPO INT 

SET @TK= ISNULL(:TK, '') 
SET @GRUPO= ISNULL(:GRUPO, '')
SET @IDEMPRESA=<#SESSION.IDEMPRESA/>
SET @AUDITADO= ISNULL(:AUDITAR, 0) 


SELECT @IDUSUARIOGRUPO=IDUSUARIOGRUPO FROM <#SESSION.DB/>.DBO.USUARIOS_GRUPOS WHERE TK=@TK


IF (@AUDITADO=0)
 BEGIN
  UPDATE <#SESSION.DB/>.dbo.VENTAS_COBROS SET AUDITADO=1
   WHERE IDVENTACOBRO IN 
	(SELECT VC.IDVENTACOBRO FROM <#SESSION.DB/>.dbo.USUARIOS U,<#SESSION.DB/>.dbo.VENTAS V, <#SESSION.DB/>.dbo.VENTAS_COBROS VC 
		WHERE U.IDGRUPO=@IDUSUARIOGRUPO AND 
			  U.IDEMPRESA=@IDEMPRESA AND 
			  V.IDUSUARIO=U.IDUSUARIO AND 
			  VC.IDVENTA=V.IDVENTA AND 
			  VC.AUDITADO=0 AND VC.PAGADO=1
	 )  
 END 

IF (@AUDITADO=1)
 BEGIN
  UPDATE <#SESSION.DB/>.dbo.VENTAS_COBROS SET AUDITADO=0
   WHERE IDVENTACOBRO IN 
	(SELECT VC.IDVENTACOBRO FROM <#SESSION.DB/>.dbo.USUARIOS U,<#SESSION.DB/>.dbo.VENTAS V, <#SESSION.DB/>.dbo.VENTAS_COBROS VC 
		WHERE U.IDGRUPO=@IDUSUARIOGRUPO AND 
			  U.IDEMPRESA=@IDEMPRESA AND 
			  V.IDUSUARIO=U.IDUSUARIO AND 
			  VC.IDVENTA=V.IDVENTA AND 
			  VC.AUDITADO=1 AND VC.PAGADO=0		   
	 )  
 END 
 
update <#SESSION.DB/>.DBO.USUARIOS_GRUPOS set GRUPO =@GRUPO, AUDITADO =@AUDITADO 
WHERE IDEMPRESA = @IDEMPRESA and IDUSUARIOGRUPO= @IDUSUARIOGRUPO