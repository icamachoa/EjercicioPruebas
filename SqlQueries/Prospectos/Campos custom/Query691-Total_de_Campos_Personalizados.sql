//[session.db|Untyped,session.idempresa|Untyped,]
select count (idcampo) as totalcampos from <#SESSION.DB/>.DBO.empresas_campos where idempresa = <#SESSION.IDEMPRESA/>