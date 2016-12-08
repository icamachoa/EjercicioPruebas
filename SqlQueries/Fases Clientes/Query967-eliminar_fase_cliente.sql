//[tkeliminar|Text,incluiraccion|Integer,tk_nuevafase|Text,session.db|Untyped,session.idempresa|Untyped,]
--delete
declare @incluir int
declare @fasenueva int
declare @fase int
declare @tkeliminar varchar(256) 
DECLARE @TKNUEVAFASE VARCHAR(256) 


set @incluir=ISNULL(:incluiraccion, 0 ) 

set @tkeliminar= ISNULL(:tkeliminar, '') 
SET @TKNUEVAFASE=ISNULL(:tk_nuevafase, '') 

SELECT @fase=idfase FROM <#SESSION.DB/>.DBO.PROSPECTOS_FASES WHERE fasecliente=1 AND TK=@TKELIMINAR
SELECT @fasenueva=idfase from <#session.db/>.dbo.prospectos_fases where fasecliente=1 and tk=@tknuevafase 

if @incluir=1
 update <#SESSION.DB/>.DBO.acciones_fases set idfase=@fasenueva where idfase = @fase 
else
 delete from <#SESSION.DB/>.DBO.acciones_fases where idfase = @fase 

 
update <#SESSION.DB/>.DBO.prospectos set idfase = @fasenueva, cambiolocal=(case when tkpm is not null then 1 else 0 end) where idfase = @fase
update <#SESSION.DB/>.DBO.prospectos_fases set orden = orden - 1 where idempresa = <#session.idempresa/> and orden > (select orden from <#SESSION.DB/>.DBO.prospectos_fases where idfase = @fase)  AND FASECLIENTE=1

INSERT INTO  <#SESSION.DB/>.dbo.ELIMINACIONES WITH(ROWLOCK)  (IDTABLA,IDNUEVO,IDELIMINADO,TIPO,IDEMPRESA,FECHAHORA) VALUES (9,@fasenueva,@fase,1,<#SESSION.IDEMPRESA/>,GETDATE())

delete from <#SESSION.DB/>.DBO.prospectos_fases where idfase = @fase