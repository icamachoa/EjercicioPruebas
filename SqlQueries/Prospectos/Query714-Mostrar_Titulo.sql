//[session.db|Untyped,session.idempresa|Untyped,idtitulo|Integer,]
select * from <#SESSION.DB/>.DBO.empresas_titulos WHERE IDEMPRESA = <#SESSION.IDEMPRESA/> AND IDTITULO = :IDTITULO