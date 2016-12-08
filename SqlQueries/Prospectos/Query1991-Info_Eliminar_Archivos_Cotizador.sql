//[idprospecto|Integer,session.db|Untyped,idoportunidad|Integer,]
--select

declare @idprospecto int
declare @idoportunidad int 

set @idprospecto = isnull(:idprospecto, 0 )
set @idoportunidad = isnull(:idoportunidad, 0 )

	select top 1 archivo, cast(tkarch as varchar(max)) AS tkarch, idprospectoarchivo from <#SESSION.DB/>.DBO.PROSPECTOS_ARCHIVOS where idprospecto = @idprospecto and idoportunidad = @idoportunidad and IDDOCUMENTO is not null order by idprospectoarchivo desc
