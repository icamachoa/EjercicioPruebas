//[idci|Integer,session.db|Untyped,]
--SELECT
/*PROTEGIDO*/
/*SEP2015*/
DECLARE @IDCITA INT
SET @IDCITA = ISNULL(:IDCI,0)
SELECT SALESUP_CT.dbo.FechaFormato(FECHA_INICIO,3) AS FechaInicia FROM <#SESSION.DB/>.dbo.CITAS WHERE IDCITA = @IDCITA