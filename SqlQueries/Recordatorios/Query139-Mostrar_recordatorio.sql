//[session.db|Untyped,idrec|Integer,]
SELECT 
  <#SESSION.DB/>.DBO.FECHA_STR(r.fechahora) as FECHAHORA, 
  case when (datepart(hh, r.fechahora) < 10) then '0'+cast(datepart(hh, r.fechahora) as varchar(1)) else cast(datepart(hh, r.fechahora) as varchar(2)) end + ':' +
  case when (datepart(mi, r.fechahora) < 10) then '0'+cast(datepart(mi, r.fechahora) as varchar(1)) else cast(datepart(mi, r.fechahora) as varchar(2)) end as tiempo,
  datepart(hh, r.fechahora) as hora,
  datepart(mi, r.fechahora) as mint,
  <#SESSION.DB/>.DBO.FECHA_STR(getdate()) as FECHAHORAACTUAL,  
  case when (datepart(hh, getdate()) < 10) then '0'+cast(datepart(hh, getdate()) as varchar(1)) else cast(datepart(hh, getdate()) as varchar(2)) end + ':' +
  case when (datepart(mi, getdate()) < 10) then '0'+cast(datepart(mi, getdate()) as varchar(1)) else cast(datepart(mi, getdate()) as varchar(2)) end as tiempoactual,
  datepart(hh, getdate()) as horaactual,
  datepart(mi, getdate()) as mintactual,
  recordatorio,
  isnull((select 1 where r.fechahora < getdate()), 2) as EstaVencido
FROM <#SESSION.DB/>.DBO.RECORDATORIOS R
WHERE
  R.IDRECORDATORIO = :IDREC 
