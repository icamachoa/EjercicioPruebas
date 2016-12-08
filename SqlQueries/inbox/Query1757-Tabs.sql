//[session.idusuario|Untyped,session.db|Untyped,]
--SELECT
/*protegido*/
DECLARE @IDUSUARIO VARCHAR(64)

SET @IDUSUARIO = <#SESSION.IDUSUARIO/>

SELECT idTabInbox, Tab, Icono, noLeidos, total, Orden, ISNULL(tab_default,0) AS tabDefault, 
CASE WHEN ISNULL(tab_default,0) = 0 THEN '1' ELSE '' END AS pEliminar
FROM <#SESSION.DB/>.DBO.USUARIOS_INBOX_TABS 
WHERE IDUSUARIO = @IDUSUARIO ORDER BY ORDEN 

