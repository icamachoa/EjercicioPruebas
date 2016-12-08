//[session.db|Untyped,lapantalla|Integer,session.idusuario|Untyped,]
--SELECT
DECLARE @LAPANTALLA INT
declare @texto varchar(155)
SET @LAPANTALLA=ISNULL(:LAPANTALLA,0)
set @texto=''
SELECT @texto=@texto+isnull(SQLTXT_EXP,'') FROM <#SESSION.DB/>.DBO.USUARIOS_FILTROS WHERE IDPANTALLA = @LAPANTALLA AND IDUSUARIO=<#SESSION.IDUSUARIO/>
if @texto is null
  select 'data.dbsp' as sqltxt,@LAPANTALLA AS LAPANTALLA 
else
  if @texto  =''
    select 'data.dbsp' as sqltxt,@LAPANTALLA AS LAPANTALLA 
  else
    select @texto as sqltxt,@LAPANTALLA AS LAPANTALLA 	