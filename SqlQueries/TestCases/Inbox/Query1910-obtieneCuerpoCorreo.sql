//[session.db|Untyped,session.idusuario|Untyped,asunto|Text,]
SELECT *
FROM <#SESSION.DB/>.DBO.USUARIOS_INBOX WHERE IDUSUARIO = <#SESSION.IDUSUARIO/> AND SUBJECT = :ASUNTO