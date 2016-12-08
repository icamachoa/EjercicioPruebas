//[session.db|Untyped,session.idempresa|Untyped,tk|Text,]
--SELECT
/*PROTEGIDO*/
/*SEP2015*/

SELECT *,SALESUP_CT.dbo.esCanalizado(TK, TKM) AS esCanalizado FROM <#SESSION.DB/>.DBO.SEGUIMIENTO_CATEGORIAS WHERE TK <> ISNULL(:TK,'') AND IDEMPRESA = <#SESSION.IDEMPRESA/>