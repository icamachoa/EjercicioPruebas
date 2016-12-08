//[session.db|Untyped,usr|Text,idusr|Text,]
DELETE FROM  <#SESSION.DB/>.DBO.USUARIOS_CUENTAS_CORREOS WHERE EMAIL  = :usr AND EMAIL != '' ANd IDUSUARIO = :idusr