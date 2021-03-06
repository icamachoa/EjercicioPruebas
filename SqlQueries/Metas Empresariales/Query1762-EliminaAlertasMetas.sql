//[idusarioalerta|Text,session.db|Untyped,]
--UPDATE
DECLARE @IDUSUARIOALERTA VARCHAR(MAX)
SET @IDUSUARIOALERTA =ISNULL(:IDUSARIOALERTA,'')



INSERT INTO SALESUP_CT.dbo.SQS WITH(ROWLOCK) (IDUSUARIO, ALERTA, VALOR)
SELECT UA.IDUSUARIO, 'metasAlcanzadas', -1 FROM SALESUP_CT.DBO.SPLIT(@IDUSUARIOALERTA,',') UALERT
JOIN <#SESSION.DB/>.DBO.USUARIOS_ALERTAS UA ON UA.IDUSUARIOALERTA= UALERT.SPLITVALUE
AND (NOTIFICADO = 0 OR LEIDO = 0)

INSERT INTO SALESUP_CT.dbo.SQS WITH(ROWLOCK) (IDUSUARIO, ALERTA, VALOR)
SELECT UA.IDUSUARIO, 'notificacionesPush', -1 FROM SALESUP_CT.DBO.SPLIT(@IDUSUARIOALERTA,',') UALERT
JOIN <#SESSION.DB/>.DBO.USUARIOS_ALERTAS UA ON UA.IDUSUARIOALERTA= UALERT.SPLITVALUE
AND UA.NOTIFICADO = 0

INSERT INTO SALESUP_CT.dbo.SQS WITH(ROWLOCK) (IDUSUARIO, ALERTA, VALOR)
SELECT UA.IDUSUARIO, 'notificaciones', -1 FROM SALESUP_CT.DBO.SPLIT(@IDUSUARIOALERTA,',') UALERT
JOIN <#SESSION.DB/>.DBO.USUARIOS_ALERTAS UA ON UA.IDUSUARIOALERTA= UALERT.SPLITVALUE
AND UA.LEIDO = 0



UPDATE UA SET UA.LEIDO=1, UA.NOTIFICADO=1
FROM SALESUP_CT.DBO.SPLIT(@IDUSUARIOALERTA,',') UALERT
JOIN <#SESSION.DB/>.DBO.USUARIOS_ALERTAS UA ON UA.IDUSUARIOALERTA= UALERT.SPLITVALUE
