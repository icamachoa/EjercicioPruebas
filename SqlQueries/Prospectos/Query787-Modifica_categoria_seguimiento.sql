//[categoria|Text,session.db|Untyped,session.idempresa|Untyped,tk|Text,]
--UPDATE
/*PROTEGIDO*/
/*SEP2015*/
DECLARE @CATEGORIA VARCHAR(1000)
DECLARE @TKSEGUIMIENTO VARCHAR(256) 
SET @CATEGORIA =  ISNULL(:CATEGORIA,'')
SET @TKSEGUIMIENTO= ISNULL(:TK, '') 

UPDATE <#SESSION.DB/>.DBO.SEGUIMIENTO_CATEGORIAS SET CATEGORIA = @CATEGORIA WHERE TK = @TKSEGUIMIENTO AND IDEMPRESA = <#SESSION.IDEMPRESA/>