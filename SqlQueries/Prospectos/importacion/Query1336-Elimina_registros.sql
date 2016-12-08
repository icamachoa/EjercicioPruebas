//[validacionjson|Text,tipoimporta|Integer,session.db|Untyped,session.idusuario|Untyped,]
--delete
DECLARE @JSON varchar(max)
DECLARE @TIPO INT

SET @JSON = :validacionjson
SET @TIPO = CAST(ISNULL(:tipoImporta,0) AS INT)

IF(@TIPO = 1)
BEGIN
	 delete from <#SESSION.DB/>.DBO.prospectos_importacion where  IDUSUARIO = <#SESSION.IDUSUARIO/> AND idprospectoimporta in (select splitvalue from <#SESSION.DB/>.dbo.split(@JSON,','))
END
ELSE
BEGIN
	 delete from <#SESSION.DB/>.DBO.prospectos_importacion where  IDUSUARIO = <#SESSION.IDUSUARIO/> AND idprospectoimporta NOT IN (select splitvalue from <#SESSION.DB/>.dbo.split(@JSON,','))
END