//[session.db|Untyped,idemail|Integer,]
UPDATE <#SESSION.DB/>.DBO.USUARIOS_EMAILS WITH(ROWLOCK) SET ESTADO = 0, ERRORES = 0 , IDUSUARIOCORREO = null, ULTIMOERRORMSG = '' , FECHAHORA = GETDATE() WHERE IDEMAIL = :IDEMAIL

