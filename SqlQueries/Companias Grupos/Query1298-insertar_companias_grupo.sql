//[session.db|Untyped,session.idempresa|Untyped,grupocompania|Text,]
insert into <#SESSION.DB/>.DBO.COMPANIAS_GRUPOS (IDEMPRESA,COMPANIAGRUPO) values (<#SESSION.IDEMPRESA/>,:grupoCompania)