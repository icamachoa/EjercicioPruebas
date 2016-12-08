//[session.idempresa|Untyped,session.idusuario|Untyped,nombredash|Text,compartir|Text,ltcompartir|Text,tkdb|Text,session.db|Untyped,]
--SELECT 

DECLARE @IDEMPRESA INT, @IDUSUARIO INT, @COMPARTIDO INT, @ORDEN INT
DECLARE @DASHBOARD VARCHAR(MAX), @USR_COMPARTIDOS VARCHAR(MAX), @GRUPOS_COMPARTIDOS VARCHAR(MAX), @TKDB VARCHAR(MAX)


SET @IDEMPRESA = <#SESSION.IDEMPRESA/>
SET @IDUSUARIO = <#SESSION.IDUSUARIO/>

SET @DASHBOARD = SALESUP_CT.DBO.PreparaCadena(ISNULL(:nombreDash,''))
SET @COMPARTIDO = ISNULL(:compartir,0)
SET @USR_COMPARTIDOS = ISNULL(:ltCompartir,'')
SET @GRUPOS_COMPARTIDOS = ISNULL(:ltCompartir,'')
SET @TKDB = ISNULL(:TKDB,'')

SET @ORDEN = 1

/*EMPRESA*/
IF @COMPARTIDO = 1 BEGIN SET @GRUPOS_COMPARTIDOS = NULL SET @USR_COMPARTIDOS = NULL END
/*GRUPOS*/
IF @COMPARTIDO = 2 BEGIN SET @USR_COMPARTIDOS = NULL END
/*USUARIOS*/
IF @COMPARTIDO = 3 BEGIN SET @GRUPOS_COMPARTIDOS = NULL END

IF @TKDB = ''
BEGIN
	 SELECT @ORDEN = MAX(ISNULL(ORDEN,0))+1 FROM <#SESSION.DB/>.dbo.DASHBOARD WHERE IDUSUARIO = @IDUSUARIO AND IDEMPRESA = @IDEMPRESA

	 INSERT INTO <#SESSION.DB/>.dbo.DASHBOARD
	 		(IDEMPRESA, IDUSUARIO, DASHBOARD, COMPARTIDO, USUARIOS_COMPARTIDOS, GRUPOS_COMPARTIDOS, ORDEN)
	 VALUES 
	 		( @IDEMPRESA, @IDUSUARIO, @DASHBOARD, @COMPARTIDO, @USR_COMPARTIDOS, @GRUPOS_COMPARTIDOS, @ORDEN)

	 SELECT TOP 1 CASE WHEN IDUSUARIO = @IDUSUARIO THEN 1 ELSE 0 END AS pModificar, dashBoard, CAST(tkdb AS VARCHAR(MAX)) AS tkdb, orden 
	 FROM <#SESSION.DB/>.dbo.DASHBOARD
	 WHERE IDEMPRESA = @IDEMPRESA AND IDUSUARIO = @IDUSUARIO
	 ORDER BY IDDASHBOARD DESC
END
ELSE
BEGIN
	 UPDATE <#SESSION.DB/>.dbo.DASHBOARD
	 SET
	 DASHBOARD = @DASHBOARD, COMPARTIDO = @COMPARTIDO, 
	 USUARIOS_COMPARTIDOS = @USR_COMPARTIDOS, GRUPOS_COMPARTIDOS = @GRUPOS_COMPARTIDOS
	 WHERE TKDB = @TKDB
	 
	 SELECT 1 AS editado, @DASHBOARD as dashBoard
END
