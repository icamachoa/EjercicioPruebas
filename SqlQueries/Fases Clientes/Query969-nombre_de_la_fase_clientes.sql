//[fasetipo|Integer,tk|Text,session.db|Untyped,session.idempresa|Untyped,]
--select
declare @fasetipo int
declare @TK VARCHAR(256)
set @fasetipo= cast(ISNULL(:fasetipo,0) as int)
set @TK= ISNULL(:TK, '')
if @fasetipo=2
    select fase from <#SESSION.DB/>.DBO.oportunidades_fases where TK=@TK AND IDEMPRESA=<#SESSION.IDEMPRESA/>
else
    select fase from <#SESSION.DB/>.DBO.prospectos_fases where TK=@TK AND IDEMPRESA=<#SESSION.IDEMPRESA/>
