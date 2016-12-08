//[idetiqueta|Integer,tk|Text,session.db|Untyped,session.idempresa|Untyped,elnivel|Untyped,]
DECLARE @REPETIDOS INT
DECLARE @CORREOS_INVALIDOS INT
DECLARE @CIUDADES_NULAS INT
DECLARE @APELLIDOS_NULOS INT
DECLARE @DIRECCION1_NULOS INT
DECLARE @DIRECCION2_NULOS INT
DECLARE @CODIGOPOSTAL_NULOS INT
DECLARE @TK VARCHAR(128)
DECLARE @IDETIQUETA INT


SET @IDETIQUETA = ISNULL(:IDETIQUETA, 0)

SET @TK = ISNULL(:TK,'')
IF @TK != '' BEGIN SELECT @IDETIQUETA=IDETIQUETA FROM <#SESSION.DB/>.DBO.ETIQUETAS WHERE TK = @TK AND IDEMPRESA = <#SESSION.IDEMPRESA/> END





SELECT @REPETIDOS=count ( DISTINCT p.correo ) FROM <#SESSION.DB/>.dbo.prospectos p join <#SESSION.DB/>.DBO.PROSPECTOS PA on P.IDPROSPECTO = PA.IDPROSPECTO AND PA.DESCARTADO = 0 join <#SESSION.DB/>.DBO.usuarios u on Pa.IDUSUARIO = U.IDUSUARIO WHERE p.idempresa=<#SESSION.IDEMPRESA/> and p.descartado=0 and  p.idprospecto in (select idprospecto from <#SESSION.DB/>.dbo.prospectos_etiquetas where idetiqueta=@idetiqueta) AND p.CORREO IN (SELECT CORREO FROM <#SESSION.DB/>.dbo.PROSPECTOS where idempresa=<#SESSION.IDEMPRESA/> and descartado=0 GROUP BY correo HAVING ( COUNT(correo) > 1 ))
select @CORREOS_INVALIDOS=COUNT (p.CORREO) from <#SESSION.DB/>.dbo.prospectos p join <#SESSION.DB/>.DBO.PROSPECTOS PA on P.IDPROSPECTO = PA.IDPROSPECTO AND PA.DESCARTADO = 0 join <#SESSION.DB/>.DBO.usuarios u on Pa.IDUSUARIO = U.IDUSUARIO where p.idempresa = <#SESSION.IDEMPRESA/>  and p.descartado=0 and <#SESSION.DB/>.dbo.validaCorreo(p.correo)=0 and p.correo is not null and p.idprospecto in (select idprospecto from <#SESSION.DB/>.dbo.prospectos_etiquetas where idetiqueta=@idetiqueta)
select @APELLIDOS_NULOS=COUNT (*)from <#SESSION.DB/>.dbo.prospectos p  join <#SESSION.DB/>.DBO.PROSPECTOS PA on P.IDPROSPECTO = PA.IDPROSPECTO AND PA.DESCARTADO = 0  join <#SESSION.DB/>.DBO.usuarios u on Pa.IDUSUARIO = U.IDUSUARIO where p.idempresa = <#SESSION.IDEMPRESA/>  and p.descartado=0 and p.apellidos is null and p.idprospecto in (select idprospecto from <#SESSION.DB/>.dbo.prospectos_etiquetas where idetiqueta=@idetiqueta)
select @DIRECCION1_NULOS=COUNT (*)from <#SESSION.DB/>.dbo.prospectos p  join <#SESSION.DB/>.DBO.PROSPECTOS PA on P.IDPROSPECTO = PA.IDPROSPECTO AND PA.DESCARTADO = 0  join <#SESSION.DB/>.DBO.usuarios u on Pa.IDUSUARIO = U.IDUSUARIO where p.idempresa = <#SESSION.IDEMPRESA/> and p.descartado=0 and P.direccion1 is null and p.idprospecto in (select idprospecto from <#SESSION.DB/>.dbo.prospectos_etiquetas where idetiqueta=@idetiqueta)
select @DIRECCION2_NULOS=COUNT (*) from <#SESSION.DB/>.dbo.prospectos p join <#SESSION.DB/>.DBO.PROSPECTOS PA on P.IDPROSPECTO = PA.IDPROSPECTO AND PA.DESCARTADO = 0  join <#SESSION.DB/>.DBO.usuarios u on Pa.IDUSUARIO = U.IDUSUARIO where p.idempresa = <#SESSION.IDEMPRESA/> and p.descartado=0 and p.direccion2 is null and p.idprospecto in (select idprospecto from <#SESSION.DB/>.dbo.prospectos_etiquetas where idetiqueta=@idetiqueta)
select @CODIGOPOSTAL_NULOS=COUNT (*)from <#SESSION.DB/>.dbo.prospectos p  join <#SESSION.DB/>.DBO.PROSPECTOS PA on P.IDPROSPECTO = PA.IDPROSPECTO AND PA.DESCARTADO = 0  join <#SESSION.DB/>.DBO.usuarios u on Pa.IDUSUARIO = U.IDUSUARIO where p.idempresa = <#SESSION.IDEMPRESA/> and p.descartado=0 and p.CODIGOPOSTAL is null and p.idprospecto in (select idprospecto from <#SESSION.DB/>.dbo.prospectos_etiquetas where idetiqueta=@idetiqueta)
select @CIUDADES_NULAS=COUNT (*) from <#SESSION.DB/>.dbo.prospectos p join <#SESSION.DB/>.DBO.PROSPECTOS PA on P.IDPROSPECTO = PA.IDPROSPECTO AND PA.DESCARTADO = 0 join <#SESSION.DB/>.DBO.usuarios u on Pa.IDUSUARIO = U.IDUSUARIO where p.idempresa = <#SESSION.IDEMPRESA/> and p.descartado=0 and p.ciudad is null and p.idprospecto in (select idprospecto from <#SESSION.DB/>.dbo.prospectos_etiquetas where idetiqueta=@idetiqueta)


SELECT @REPETIDOS AS REPETIDOS, @CORREOS_INVALIDOS as CORREOS_INVALIDOS, @CIUDADES_NULAS as CIUDADES_NULAS, @APELLIDOS_NULOS AS APELLIDOS_NULOS,
   @CODIGOPOSTAL_NULOS AS CODIGOPOSTAL_NULOS, @DIRECCION1_NULOS AS DIRECCION1_NULOS, @DIRECCION2_NULOS AS DIRECCION2_NULOS 




 