//[inconsistencia|Integer,idetiqueta|Integer,session.db|Untyped,session.idempresa|Untyped,tk|Text,]
--SELECT
DECLARE @idetiqueta INT
DECLARE @INCONSISTENCIA INT
DECLARE @TK VARCHAR(128)

SET @INCONSISTENCIA=ISNULL(:INCONSISTENCIA,0)
SET @INCONSISTENCIA=ISNULL(:INCONSISTENCIA,0)

SET @idetiqueta=ISNULL(:idetiqueta,0)

SET @TK = ISNULL(:tk,'')

IF @TK != '' BEGIN SELECT @idetiqueta=IDETIQUETA FROM <#SESSION.DB/>.DBO.ETIQUETAS WHERE TK = @TK AND IDEMPRESA = <#SESSION.IDEMPRESA/> END


IF @INCONSISTENCIA = 1
SELECT p.*, u.iniciales FROM <#SESSION.DB/>.dbo.prospectos p left join usuarios u on u.idusuario = p.idusuario  WHERE p.idempresa=<#SESSION.IDEMPRESA/> and p.descartado=0 and  p.idprospecto in (select idprospecto from <#SESSION.DB/>.dbo.prospectos_etiquetas where idetiqueta=@idetiqueta) AND CORREO IN (SELECT CORREO FROM <#SESSION.DB/>.dbo.PROSPECTOS where idempresa=<#SESSION.IDEMPRESA/> and descartado=0 GROUP BY correo HAVING ( COUNT(correo) > 1 ))

IF @INCONSISTENCIA = 2
SELECT  p.*, u.iniciales FROM <#SESSION.DB/>.dbo.prospectos p left join usuarios u on u.idusuario = p.idusuario  WHERE p.idempresa = <#SESSION.IDEMPRESA/> and p.descartado=0 and <#SESSION.DB/>.dbo.validaCorreo(correo)=0 and correo is not null and idprospecto in (select idprospecto from <#SESSION.DB/>.dbo.prospectos_etiquetas where idetiqueta=@idetiqueta)

IF @INCONSISTENCIA = 3
select  p.*, u.iniciales FROM <#SESSION.DB/>.dbo.prospectos p left join usuarios u on u.idusuario = p.idusuario  WHERE p.idempresa= <#SESSION.IDEMPRESA/> and p.descartado=0 and p.apellidos is null and p.idprospecto in (select idprospecto from <#SESSION.DB/>.dbo.prospectos_etiquetas where idetiqueta=@idetiqueta)

IF @INCONSISTENCIA = 4
select  p.*, u.iniciales FROM <#SESSION.DB/>.dbo.prospectos p left join usuarios u on u.idusuario = p.idusuario  WHERE p.idempresa= <#SESSION.IDEMPRESA/> and p.descartado=0 and p.direccion1 is null and p.idprospecto in (select idprospecto from <#SESSION.DB/>.dbo.prospectos_etiquetas where idetiqueta=@idetiqueta)

IF @INCONSISTENCIA = 5
select p.*, u.iniciales FROM <#SESSION.DB/>.dbo.prospectos p left join usuarios u on u.idusuario = p.idusuario  WHERE p.idempresa= <#SESSION.IDEMPRESA/> and p.descartado=0 and p.direccion2 is null and p.idprospecto in (select idprospecto from <#SESSION.DB/>.dbo.prospectos_etiquetas where idetiqueta=@idetiqueta)

IF @INCONSISTENCIA = 6
select  p.*, u.iniciales FROM <#SESSION.DB/>.dbo.prospectos p left join usuarios u on u.idusuario = p.idusuario  WHERE p.idempresa= <#SESSION.IDEMPRESA/> and p.descartado=0 and p.ciudad is null and p.idprospecto in (select idprospecto from <#SESSION.DB/>.dbo.prospectos_etiquetas where idetiqueta=@idetiqueta)








