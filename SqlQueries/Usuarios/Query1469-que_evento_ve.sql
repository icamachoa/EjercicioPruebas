//[session.db|Untyped,session.idusuario|Untyped,]
--select
DECLARE @EVENTO INT
SET @EVENTO = 0
SELECT @EVENTO = 
CASE TEXTO WHEN 'Recordatorios' THEN 1 
WHEN 'Tareas' THEN 2
WHEN 'Citas' THEN 3 END
FROM <#SESSION.DB/>.DBO.USUARIOS_FILTROS where idpantalla in (410,411,412,414,415) and TIPO = 6 and SQLTXT = '1=1' and IDUSUARIO = <#SESSION.IDUSUARIO/>
SELECT @EVENTO as EVENTO