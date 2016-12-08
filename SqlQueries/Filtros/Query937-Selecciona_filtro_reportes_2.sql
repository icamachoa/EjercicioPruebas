//[idpantalla|Integer,session.db|Untyped,session.idusuario|Untyped,]

--SELECT
declare @filtro varchar (100)
declare @grupoid varchar (100)
declare @filtrogrupo varchar (100)
DECLARE @IDPANTALLA INT
SET @IDPANTALLA=ISNULL(:IDPANTALLA,0)
set @grupoid=''
set @filtrogrupo=''
SET @filtro='1=1'

SELECT @filtro=ISNULL(@filtro,'1=1')+' AND '+SQLTXT FROM <#SESSION.DB/>.DBO.USUARIOS_FILTROS WHERE IDUSUARIO=<#SESSION.IDUSUARIO> AND IDPANTALLA=@IDPANTALLA

SELECT @grupoid=cast(cast(@grupoid as int)+cast(texto as int) as varchar(100)),@filtrogrupo=@filtrogrupo+ISNULL(SQLTXT_exp,'')
FROM <#SESSION.DB/>.DBO.USUARIOS_FILTROS
WHERE IDUSUARIO=<#SESSION.IDUSUARIO> AND IDPANTALLA=@IDPANTALLA and tipo in (1)

select @filtro as sqltxt, @grupoid as texto, @filtrogrupo as filtrogrupo
