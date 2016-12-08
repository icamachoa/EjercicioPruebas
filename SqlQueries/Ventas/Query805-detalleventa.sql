//[session.convertcode|Untyped,session.db|Untyped,idventa|Integer,]
--select
/*PROTEGIDO*/
/*SEP2015*/
select noparcialidad as no_parc,  CONVERT(VARCHAR(12), FECHAHORA,<#SESSION.CONVERTCODE/>) AS fecha_parc, monto as monto_parc, comision as comision_parc, pagado as pagado_parc 
from <#SESSION.DB/>.dbo.ventas_cobros where idventa=ISNULL(:IDVENTA,0)

