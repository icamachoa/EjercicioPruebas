//[session.db|Untyped,session.idusuario|Untyped,idpantalla|Integer,]
--SELECT
 declare @texto varchar(155)
 DECLARE @IDPANTALLA INT
 SET @IDPANTALLA=ISNULL(:IDPANTALLA,0)
set @texto=''
SELECT @texto=@texto+isnull(SQLTXT_EXP,'') FROM <#SESSION.DB/>.DBO.USUARIOS_FILTROS WHERE IDPANTALLA = @IDPANTALLA AND IDUSUARIO=<#SESSION.IDUSUARIO/>

if @texto is null
  select 'data.dbsp' as sqltxt
else
  if @texto  =''
    select 'data.dbsp' as sqltxt
  else
   begin
    if (@texto='lineas.dbsp')
	 select 'lineas_data.dbsp' as sqltxt
	else  
     select @texto as sqltxt
   end	