//[idcerteza|Integer,session.db|Untyped,descripcion|Text,session.idempresa|Untyped,]
--update
declare @idcerteza int
SET @idcerteza = cast (ISNULL(:idcerteza,0) as int )

UPDATE <#SESSION.DB/>.DBO.EMPRESAS_CERTEZAS
SET descripcion=ISNULL(:descripcion,'')
WHERE IDCERTEZAEMPRESA=@idcerteza

DELETE FROM <#SESSION.DB/>.DBO.MODIFICACIONES WITH (ROWLOCK) WHERE IDTABLA = 21 AND IDEMPRESA = <#SESSION.IDEMPRESA/>
INSERT INTO <#SESSION.DB/>.DBO.MODIFICACIONES  WITH (ROWLOCK) (IDTABLA,IDEMPRESA)   VALUES (21,<#SESSION.IDEMPRESA/>)
