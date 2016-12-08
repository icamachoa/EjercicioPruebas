//[idticket|Text,calificacion|Text,idestado|Text,tktcom|Text,tkt|Text,tipousuario|Text,session.idusuario|Untyped,visto|Text,session.idproducto|Untyped,]
--UPDATE
DECLARE @IDTICKET INT, @IDRESPONSABLE INT,@IDTC INT

SELECT @IDTICKET = IDTICKET, @IDTC = IDTICKETCOMENTARIO FROM CONTROL.TICKETS.DBO.TICKET_COMENTARIOS WHERE TKTCOM LIKE :TKTCOM


SELECT @IDRESPONSABLE = IDRESPONSABLE FROM CONTROL.TICKETS.DBO.TICKETS WHERE IDTICKET = @IDTICKET
IF @IDRESPONSABLE = 0
BEGIN
   SELECT TOP 1 @IDRESPONSABLE = IDUSUARIO FROM CONTROL.TICKETS.DBO.TICKET_COMENTARIOS WHERE IDTICKET = @IDTICKET AND TIPOUSUARIO = 2 ORDER BY 1 ASC
   UPDATE CONTROL.TICKETS.DBO.TICKETS SET IDRESPONSABLE = @IDRESPONSABLE WHERE IDTICKET = @IDTICKET
END

DECLARE @Calificacion INT,@IDESTADO INT,  @TIPOUSUARIO INT, @VISTO INT
SET @Calificacion = ISNULL(:calificacion,'')
SET @IDESTADO = ISNULL(:IDESTADO,'')
SET @TIPOUSUARIO = ISNULL(:TIPOUSUARIO,'')
SET @VISTO = ISNULL(:VISTO,'')

EXEC CONTROL.TICKETS.DBO.SP_SOLICITAR_GERENTE_2 @Calificacion, @IDESTADO, @IDTICKET , @IDTC, @TIPOUSUARIO , <#SESSION.IDUSUARIO/>, @VISTO, <#SESSION.IDPRODUCTO/>