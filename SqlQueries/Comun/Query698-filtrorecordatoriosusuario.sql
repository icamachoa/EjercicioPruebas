//[session.db|Untyped,session.idusuario|Untyped,idpantalla|Integer,]
select * from <#SESSION.DB/>.DBO.USUARIOS_FILTROS where IDUSUARIO = <#SESSION.IDUSUARIO/> AND IDPANTALLA =:IDPANTALLA