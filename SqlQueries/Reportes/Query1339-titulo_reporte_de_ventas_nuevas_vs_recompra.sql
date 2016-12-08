//[session.db|Untyped,session.idusuario|Untyped,]
--select
SELECT (CASE WHEN SQLTXT LIKE '%V.NUEVA=1%' THEN 'Reporte de ventas nuevas' ELSE 'Reporte de recompra' END ) AS TITULOREPORTE FROM <#SESSION.DB/>.DBO.USUARIOS_FILTROS WHERE IDUSUARIO=<#SESSION.IDUSUARIO/> AND IDPANTALLA=7 AND TIPO=20