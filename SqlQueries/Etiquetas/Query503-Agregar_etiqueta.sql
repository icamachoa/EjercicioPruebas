//[session.db|Untyped,idpeticion|Text,txt1|Text,session.idempresa|Untyped,session.idusuario|Untyped,idprospecto|Text,]
-- update
DECLARE @IDPETICION VARCHAR(1000)
DECLARE @IDPROSPECTO VARCHAR(1000)
SET @IDPETICION=ISNULL(:IDPETICION,'')
SET @IDPROSPECTO = ISNULL(:IDPROSPECTO,'')
IF( (SELECT COUNT(*) FROM <#SESSION.DB/>.dbo.ETIQUETAS WHERE LEN(@IDPETICION)>6 AND  
     IDPETICION !='' AND IDPETICION = @IDPETICION) = 0)
BEGIN

  DECLARE @ETIQUETA VARCHAR(128)

  SET @ETIQUETA = :TXT1
  IF (@ETIQUETA !='')
    insert into <#SESSION.DB/>.DBO.ETIQUETAS (IDEMPRESA, ETIQUETA, IDPETICION) values (<#SESSION.IDEMPRESA/>, @ETIQUETA, @IDPETICION)
END -- del validador de IDPETICION
ELSE 
  INSERT INTO SALESUP_CT.dbo.LOG(IDU, IDP, IDO, TEXTO) VALUES ('<#SESSION.IDUSUARIO/>', @IDPROSPECTO , '', 'Duplicidad de etiqueta')