//[session.idempresa|Untyped,]
SELECT IDFUNCIONALIDAD, 
1 AS  TIENE_FUNCIONALIDAD, 
--dbo.FuncionalidadHabilidata(<#SESSION.IDEMPRESA/>, IDFUNCIONALIDAD) AS  TIENE_FUNCIONALIDAD, 
FUNCIONALIDAD FROM SALESUP_CT.DBO.FUNCIONALIDADES WHERE STATUS > 0 