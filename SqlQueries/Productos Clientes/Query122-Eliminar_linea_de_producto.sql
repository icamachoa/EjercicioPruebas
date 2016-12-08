//[session.db|Untyped,session.idempresa|Untyped,tkeliminar|Text,tknuevo|Text,]
--update
DECLARE @TKELIMINAR VARCHAR(256) 
DECLARE @TKNUEVO varchar(256) 
DECLARE @IDLINEA_PRODELIMINAR INT 
DECLARE @IDLINEA_PRODNUEVO INT 

SET @TKELIMINAR=ISNULL(:TKELIMINAR, '') 
SET @TKNUEVO =ISNULL(:TKNUEVO, '') 

SELECT @IDLINEA_PRODELIMINAR =IDLINEA_PRODUCTO FROM <#SESSION.DB/>.DBO.EMPRESAS_LINEAS_PRODUCTO WHERE TK=@TKELIMINAR


SELECT @IDLINEA_PRODNUEVO=IDLINEA_PRODUCTO FROM <#SESSION.DB/>.DBO.EMPRESAS_LINEAS_PRODUCTO WHERE TK=@TKNUEVO 




UPDATE  <#SESSION.DB/>.DBO.OPORTUNIDADES SET IDLINEA_PRODUCTO = @IDLINEA_PRODNUEVO, 
CAMBIOLOCAL=(CASE WHEN TKOM IS NOT NULL THEN 1 ELSE 0 END)  where idlinea_producto = @IDLINEA_PRODELIMINAR

update <#session.db/>.dbo.productos 
set idlinea_producto= @IDLINEA_PRODNUEVO
where idempresa=<#session.idempresa/> and idlinea_producto=@IDLINEA_PRODELIMINAR

INSERT INTO  <#SESSION.DB/>.dbo.ELIMINACIONES WITH(ROWLOCK)  
(IDTABLA,IDNUEVO,IDELIMINADO,TIPO,IDEMPRESA,FECHAHORA) VALUES (7,@IDLINEA_PRODNUEVO,@IDLINEA_PRODELIMINAR,1,<#SESSION.IDEMPRESA/>,GETDATE())

delete from   <#SESSION.DB/>.DBO.usuarios_lineas_comision where idlinea = @IDLINEA_PRODELIMINAR
delete from  <#SESSION.DB/>.DBO.EMPRESAS_LINEAS_PRODUCTO where idlinea_producto = @IDLINEA_PRODELIMINAR