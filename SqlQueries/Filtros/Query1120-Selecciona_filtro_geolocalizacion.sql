//[idpantalla|Integer,session.db|Untyped,session.idusuario|Untyped,]
--select
declare @filtro varchar (1000)
declare @grupoid varchar (100)
declare @filtrogrupo varchar (100)
declare @idpantalla int
set @idpantalla = isnull(:idpantalla,0)
set @grupoid=''
SELECT @filtro=SQLTXT FROM <#SESSION.DB/>.DBO.USUARIOS_FILTROS WHERE IDUSUARIO=<#SESSION.IDUSUARIO> AND IDPANTALLA=@idpantalla
SELECT @grupoid=TEXTO,@filtrogrupo=SQLTXT_exp
FROM <#SESSION.DB/>.DBO.USUARIOS_FILTROS
WHERE IDUSUARIO=<#SESSION.IDUSUARIO> AND IDPANTALLA=@idpantalla

select ISNULL(@filtro,' AND 1=1') as sqltxt, @grupoid as texto, ISNULL(@filtrogrupo,'{TIPO:'''',ID:'''',DESDE:'''',HASTA:'''',FILTROFECHA:''''}') as filtrogrupo
