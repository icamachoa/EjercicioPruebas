//[idfecharecordar|Integer,session.db|Untyped,tkfi|Text,]
--SELECT
DECLARE @IDFECHARECORDAR INT
SET @IDFECHARECORDAR=0

DECLARE @TKFI VARCHAR(64)
SET @TKFI = ISNULL(:TKFI,'')
IF @TKFI != '' BEGIN SELECT @IDFECHARECORDAR = IDFECHARECORDAR FROM <#SESSION.DB/>.dbo.FECHAS_IMPORTANTES WHERE TKFI = @TKFI END

SELECT cast(FI.TKFI as varchar(64)) AS tkfi, FI.*, FI.IDPLANTILLA AS IDPLANTI,  VM.MES AS MESES, UP.DESCRIPCION
FROM <#SESSION.DB/>.dbo.FECHAS_IMPORTANTES FI
LEFT JOIN <#SESSION.DB/>.dbo.V_MESES VM ON VM.IDMES = FI.MES
LEFT JOIN <#SESSION.DB/>.dbo.USUARIOS_PLANTILLAS UP ON UP.IDPLANTILLA = FI.IDPLANTILLA
WHERE IDFECHARECORDAR = @IDFECHARECORDAR ORDER BY FI.MES, FI.DIA