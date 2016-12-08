//[session.db|Untyped,idfase|Integer,idaccion|Integer,tipofase|Integer,recordatorio|Text,idaccionfase|Integer,vencimiento|Integer,]
--UPDATE

update <#SESSION.DB/>.dbo.ACCIONES_FASES 
 set IDFASE=:idfase,IDACCION=:idaccion,TIPOFASE=:tipofase,RECORDATORIO=:recordatorio,TIPOPARA=0,TIPOCC=0,TIPOCCO=0,para=null,cc=null,cco=null, vencimiento=:vencimiento
 WHERE IDACCIONFASE=:idaccionfase