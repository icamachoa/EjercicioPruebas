//[session.idempresa|Untyped,]
--SELECT

DECLARE @IDEMPRESA INT
SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)

	IF EXISTS(SELECT * FROM CONTROL.CONTROL.DBO.INTEGRACIONES WHERE IDEMPRESA=@IDEMPRESA)
	   	SELECT 1 AS ACTIVA
	ELSE
		SELECT 0 AS ACTIVA