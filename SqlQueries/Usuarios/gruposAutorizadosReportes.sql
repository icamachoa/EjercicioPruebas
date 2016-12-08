//[session.idempresa|Untyped,session.idusuario|Untyped,session.db|Untyped,]
--select

DECLARE @IDUSUARIO INT, @IDEMPRESA INT

SET @IDUSUARIO = <#SESSION.IDUSUARIO/>
SET @IDEMPRESA = <#SESSION.IDEMPRESA/>

SELECT 
	CAST(UG.TK AS VARCHAR(64)) AS tk, UG.idusuarioGrupo as IdGrupo, UG.Grupo
FROM 
	<#SESSION.DB/>.DBO.USUARIOS_GRUPOS UG, 
	<#SESSION.DB/>.DBO.obtieneUsuariosAutorizadosModulos (@IDUSUARIO, 8, 1) M
WHERE 
	UG.IDEMPRESA = @IDEMPRESA AND UG.IDUSUARIOGRUPO = M.ID 
ORDER BY 
	Grupo
