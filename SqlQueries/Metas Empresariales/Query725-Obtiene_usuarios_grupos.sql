//[session.nivel|Untyped,session.db|Untyped,session.idempresa|Untyped,session.idgrupo|Untyped,]
IF <#SESSION.NIVEL/>=1
  SELECT * FROM <#SESSION.DB/>.DBO.USUARIOS_GRUPOS WHERE IDEMPRESA=<#SESSION.IDEMPRESA/>
ELSE
IF <#SESSION.NIVEL/>=2
   SELECT * FROM <#SESSION.DB/>.DBO.USUARIOS_GRUPOS WHERE IDEMPRESA=<#SESSION.IDEMPRESA/> AND IDUSUARIOGRUPO = <#SESSION.IDGRUPO>