//[tkmt|Text,session.db|Untyped,]
--select
DECLARE @TKMT VARCHAR(64)
SET @TKMT = ISNULL(:TKMT,'')
EXEC <#SESSION.DB/>.dbo.SP_METAS_DETALLE_DASHBOARD @TKMT