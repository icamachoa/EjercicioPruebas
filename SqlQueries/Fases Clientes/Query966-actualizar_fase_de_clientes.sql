//[session.db|Untyped,fase|Text,idfase|Integer,]
UPDATE <#SESSION.DB/>.DBO.PROSPECTOS_FASES
SET FASE=:FASE
WHERE IDFASE=:idfase