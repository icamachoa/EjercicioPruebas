//[session.db|Untyped,fecharecordatorio|Text,horarecordatorio|Text,session.convertcode|Untyped,recordatorio|Text,idrecordatorio|Integer,]
--update
UPDATE <#SESSION.DB/>.DBO.RECORDATORIOS SET
FECHAHORA=convert(DATETIME,ISNULL(:fecharecordatorio,'')+' '+ISNULL(:horarecordatorio,''),<#SESSION.CONVERTCODE/>),
RECORDATORIO=:RECORDATORIO
WHERE IDRECORDATORIO=ISNULL(:IDRECORDATORIO,0)
