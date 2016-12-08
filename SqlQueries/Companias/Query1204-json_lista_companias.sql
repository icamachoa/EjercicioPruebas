//[session.idempresa|Untyped,session.idusuario|Untyped,q|Text,session.db|Untyped,]
DECLARE @IDEMPRESA INT, @IDUSUARIO INT
SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)
SET @IDUSUARIO = <#SESSION.IDUSUARIO/> 
DECLARE @Q VARCHAR(MAX)
SET @Q = :Q
SET @Q = '%'+@Q+'%'

SELECT <#SESSION.DB/>.dbo.obtienePermisoUtilizarEmpresa(@IDUSUARIO,C.IdCompania) AS puedeUtilizarEmpresa, C.IdCompania, C.Empresa, U.tku, C.tkCom, LTRIM(RTRIM(u.NOMBRE)) + ' ' + ISNULL(LTRIM(RTRIM(U.APELLIDOS)),'') + ' ('+LTRIM(RTRIM(U.INICIALES))+')'  AS duenioEmpresa
FROM <#SESSION.DB/>.dbo.COMPANIAS C, <#SESSION.DB/>.dbo.USUARIOS U
WHERE C.IDEMPRESA = @IDEMPRESA AND C.EMPRESA LIKE @Q AND C.IDUSUARIO = U.IDUSUARIO