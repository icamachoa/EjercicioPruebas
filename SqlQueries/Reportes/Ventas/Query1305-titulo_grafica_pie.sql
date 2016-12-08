//[session.nivel|Untyped,session.db|Untyped,session.idusuario|Untyped,idpantalla|Text,]
--SELECT
DECLARE @NIVEL INT
DECLARE @TEXTO VARCHAR(1000)
DECLARE @IDPANTALLA INT
SET  @IDPANTALLA = CAST(:IDPANTALLA AS INT)
SET @NIVEL=CAST('<#SESSION.NIVEL/>' AS INT)

IF (@NIVEL<=2)
BEGIN
SET @TEXTO='Por Ejecutivo'
SELECT TOP 1 @TEXTO=(CASE WHEN (TEXTO IS NULL) OR (TEXTO='0') OR (TEXTO='1') OR (TEXTO='2') THEN 'Por Ejecutivo'  ELSE TEXTO END)
	   FROM <#SESSION.DB/>.DBO.USUARIOS_FILTROS 
WHERE IDUSUARIO=<#SESSION.IDUSUARIO/> AND IDPANTALLA=@IDPANTALLA AND TIPO in (1,2,3,4,5,6,7)
END
ELSE
BEGIN
SET @TEXTO='Por lineas de producto'
SELECT TOP 1 @TEXTO=(CASE WHEN (TEXTO IS NULL) OR (TEXTO='0') THEN 'Por lineas de producto'  ELSE TEXTO END)
	   FROM <#SESSION.DB/>.DBO.USUARIOS_FILTROS 
WHERE IDUSUARIO=<#SESSION.IDUSUARIO/> AND IDPANTALLA=@IDPANTALLA AND TIPO in (3,4,5,6,7)
END

SELECT @TEXTO AS TITGRAFICA 