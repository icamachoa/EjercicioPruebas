//[idoportunidad|Integer,session.db|Untyped,]
--update
declare @idoportunidad int

set @idoportunidad = isnull(:idoportunidad, 0)


	 EXEC <#SESSION.DB/>.DBO.SP_NUEVA_EXISTENCIA_PRODUCTOS @idoportunidad

