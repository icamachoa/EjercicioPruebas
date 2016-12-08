//[session.db|Untyped,idfase|Integer,idaccion|Integer,tipofase|Integer,plantilla|Integer,para|Text,cc|Text,cco|Text,tipopara|Integer,tipocc|Integer,tipocco|Text,idaccionfase|Integer,]
--update

UPDATE <#SESSION.DB/>.dbo.ACCIONES_FASES 
 SET IDFASE=:idfase,IDACCION=:idaccion,TIPOFASE=:tipofase,IDPLANTILLA=:plantilla,PARA=:PARA,CC=:CC,CCO=:CCO,TIPOPARA=:tipopara,TIPOCC=:tipocc,TIPOCCO=:tipocco,recordatorio=null
 WHERE IDACCIONFASE=:idaccionfase
