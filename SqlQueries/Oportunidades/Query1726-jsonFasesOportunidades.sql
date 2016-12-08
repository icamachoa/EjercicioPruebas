//[session.db|Untyped,session.idempresa|Untyped,]
SELECT TK, IDFASE as value, FASE as Opcion, SALESUP_CT.dbo.esCanalizado(TK, TKM) AS esCanalizado 
FROM <#SESSION.DB/>.DBO.OPORTUNIDADES_FASES 
WHERE IDEMPRESA = <#SESSION.IDEMPRESA/> ORDER BY ORDEN