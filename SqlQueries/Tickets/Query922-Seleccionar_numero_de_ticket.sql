//[session.idusuario|Untyped,session.idempresa|Untyped,idticket|Text,]
SELECT T.TICKET , T.ASUNTO
FROM CONTROL.TICKETS.DBO.TICKETS T WHERE T.TKT = ISNULL(:IDTICKET,'') AND T.IDUSUARIO = <#SESSION.IDUSUARIO/> AND T.IDEMPRESA = <#SESSION.IDEMPRESA/>