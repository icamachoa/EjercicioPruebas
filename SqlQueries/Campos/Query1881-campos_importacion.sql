//[session.idempresa|Untyped,idventana|Integer,session.db|Untyped,]
-- SELECT
/*PROTEGIDO*/

DECLARE @IDEMPRESA INT = <#SESSION.IDEMPRESA/>
DECLARE @IDVENTANA INT = ISNULL(:IDVENTANA,1)

select
CASE WHEN TIPO = 1 OR TIPO = 3 THEN 'unicos' ELSE '' END AS TIPO,
CASE 
WHEN NOMBRECAMPO = 'Correo' THEN 'Email' 
WHEN NOMBRECAMPO = 'Teléfono 1' THEN 'Teléfono'
WHEN NOMBRECAMPO = 'Móvil' THEN 'Teléfono móvil'
WHEN NOMBRECAMPO = '# Empleados' THEN 'Número empleados'
WHEN NOMBRECAMPO = 'Calle' THEN 'Dirección 1'
WHEN NOMBRECAMPO = 'Colonia' THEN 'Dirección 2'
WHEN NOMBRECAMPO = 'CP' THEN 'Código Postal'
WHEN NOMBRECAMPO = 'Comentario' THEN 'Comentarios'
WHEN NOMBRECAMPO = 'Estado' THEN 'Región'
 
ELSE NOMBRECAMPO END AS NOMBRECAMPO
from <#SESSION.DB/>.DBO.empresas_campos_configuracion where idempresa = @IDEMPRESA and idventana = @IDVENTANA order by campo