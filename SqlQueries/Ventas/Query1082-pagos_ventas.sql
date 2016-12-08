//[session.db|Untyped,idventa|Integer,]
--SELECT
/*PROTEGIDO*/
/*SEP2015*/
DECLARE @IDVENTA INT
SET @IDVENTA = ISNULL(:IDVENTA,0)
select *,datepart(yy,fechahora) as anio,datepart(mm,fechahora) as mes ,datepart(dd,fechahora) as dia from <#SESSION.DB/>.DBO.ventas_cobros where idventa=@idventA order by noparcialidad