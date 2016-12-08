 //[session.idusuario|Untyped,session.db|Untyped,session.idempresa|Untyped]
 --select
 DECLARE @IDUSUARIO INT 
 DECLARE @IDEMPRESA INT

 SET @IDUSUARIO = <#SESSION.IDUSUARIO/>
 SET @IDEMPRESA = <#SESSION.IDEMPRESA/>

 EXEC <#SESSION.db/>.DBO.SP_VerificaTicketsDisponibles @IDUSUARIO, @IDEMPRESA
