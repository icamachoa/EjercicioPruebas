//[idrecordatorio|Text,session.convertcode|Untyped,session.db|Untyped,tkrec|Text,]
--SELECT
DECLARE @IDRECORDATORIO INT, @CONVERTCODE INT

SET @IDRECORDATORIO = CAST(:IDRECORDATORIO AS INT)
SET @CONVERTCODE = CAST('<#SESSION.CONVERTCODE/>' AS INT)

DECLARE @TKREC VARCHAR(64)
SET @TKREC = ISNULL(:TKREC,'')
IF @TKREC != '' BEGIN SELECT @IDRECORDATORIO = IDRECORDATORIO FROM <#SESSION.DB/>.DBO.RECORDATORIOS WHERE TKREC = @TKREC END



SELECT 
CAST(TKREC AS VARCHAR(MAX)) AS TKREC, 
CONVERT(VARCHAR(10), R.fechahora, @CONVERTCODE ) Fecha,CONVERT(VARCHAR(10), 
(CASE WHEN R.fechafinrepetir IS NOT NULL AND R.TIPOFIN!=0 THEN R.fechafinrepetir ELSE R.fechahora END), @CONVERTCODE )  AS FechaREPETIR,
  case when (datepart(hh, r.fechahora) < 10) then '0'+cast(datepart(hh, r.fechahora) as varchar(1)) else cast(datepart(hh, r.fechahora) as varchar(2)) end + ':' +
  case when (datepart(mi, r.fechahora) < 10) then '0'+cast(datepart(mi, r.fechahora) as varchar(1)) else cast(datepart(mi, r.fechahora) as varchar(2)) end as tiempo,
  datepart(hh, r.fechahora) as hora,
  datepart(mi, r.fechahora) as mint,
  R.Recordatorio,
  isnull((select 1 where r.fechahora < getdate()), 2) as EstaVencido,*
FROM <#SESSION.DB/>.DBO.RECORDATORIOS R
WHERE R.IDRECORDATORIO = @IDRECORDATORIO
