//[session.db|Untyped,session.idempresa|Untyped,]
SELECT *, SALESUP_CT.dbo.esCanalizado(TK, TKM) AS esCanalizado 
FROM <#SESSION.DB/>.DBO.OPORTUNIDADES_FASES 
WHERE IDEMPRESA = <#SESSION.IDEMPRESA/> ORDER BY ORDEN

