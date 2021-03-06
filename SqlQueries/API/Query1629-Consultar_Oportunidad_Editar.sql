//[tkopt|Text,session.idempresa|Untyped,session.db|Untyped,]
DECLARE @TKOPT VARCHAR(256) 
DECLARE @IDEMPRESA INT 

SET @TKOPT=ISNULL(:TKOPT, '') 
SET @IDEMPRESA =<#SESSION.IDEMPRESA/>
SELECT OP.CONCEPTO, OP.MONTO, OP.COMISION, OP.CERTEZA, OP.DIASCIERREESTIMADO, OP.TK AS TKOPORTUNIDAD, 
LP.TK AS TKLINEA_PRODUCTO, OPF.TK AS TKFASE
FROM <#SESSION.DB/>.DBO.OPORTUNIDADES_TEMPLATES  OP
LEFT JOIN <#SESSION.DB/>.DBO.EMPRESAS_LINEAS_PRODUCTO LP  ON LP.IDLINEA_PRODUCTO=OP.IDLINEA
LEFT JOIN <#SESSION.DB/>.DBO.OPORTUNIDADES_FASES  OPF ON OPF.IDFASE=OP.IDFASE
WHERE OP.IDEMPRESA= @IDEMPRESA AND OP.TK=@TKOPT