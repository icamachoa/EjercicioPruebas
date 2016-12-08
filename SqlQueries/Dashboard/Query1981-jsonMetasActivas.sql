//[session.idusuario|Untyped,session.idempresa|Untyped,session.idgrupo|Untyped,buscar|Text,session.db|Untyped,]
 
 
--SELECT 
DECLARE @IDUSUARIO INT, @IDEMPRESA INT, @IDGRUPO INT
DECLARE @HOY DATETIME

SET @IDUSUARIO = <#session.IDUSUARIO/>
SET @IDEMPRESA = <#SESSION.IDEMPRESA/> 
SET @IDGRUPO = <#SESSION.IDGRUPO/>
SET @HOY = SALESUP_CT.dbo.GetOnlyDate(GETDATE())

DECLARE @buscar VARCHAR(MAX)
set @buscar = '%'+ISNULL(:BUSCAR,'')+'%'

declare @metasActivas table(tipo int default(1), tipoFuente INT DEFAULT(1), tk varchar(max), descripcion varchar(max), idComponente int, componente varchar(max), detalle varchar(max), responsable varchar(max), fInicio varchar(max), fFin varchar(max), dtfInicio float)


insert into @metasActivas ( tk, descripcion, idComponente, componente, detalle, responsable, fInicio, fFin, dtfInicio)

SELECT UM.tkMta as tk, UM.descripcion, UM.IDCOMPONENTE, TM.NOMBRE_COMPONENTE AS componente, 
CASE 
WHEN ISNULL(UM.IDUSUARIO,0) = 0 AND ISNULL(UM.IDGRUPO,0) = 0 AND UM.IDCOMPONENTE NOT IN (8,9,10,11,12,13,19,20,21,32,33,34) THEN 1
WHEN ISNULL(UM.IDUSUARIO,0) = 0 AND ISNULL(UM.IDGRUPO,0) > 0 AND UM.IDCOMPONENTE NOT IN (8,9,10,11,12,13,19,20,21,32,33,34) THEN 2
WHEN ISNULL(UM.IDUSUARIO,0) > 0 AND ISNULL(UM.IDGRUPO,0) = 0 AND UM.IDCOMPONENTE NOT IN (8,9,10,11,12,13,19,20,21,32,33,34) THEN 3
ELSE 0 END as detalle,  
CASE 
WHEN UM.IDGRUPO IS NULL AND UM.IDUSUARIO IS NULL THEN 'Empresarial'
WHEN UM.IDGRUPO IS NOT NULL AND UM.IDUSUARIO IS NULL THEN UG.GRUPO
WHEN UM.IDGRUPO IS NULL AND UM.IDUSUARIO IS NOT NULL  THEN U.NOMBRE + ' '+ISNULL(U.APELLIDOS,'')
END AS responsable, 
CONVERT(VARCHAR(10), UM.INICIO, 103 ) AS fInicio,
CONVERT(VARCHAR(10), UM.FIN, 103 ) AS fFin,
cast(um.inicio as float) as dtfInicio
FROM <#SESSION.DB/>.DBO.USUARIOS_METAS UM
JOIN SALESUP_CT.DBO.TIPOS_METAS TM ON TM.IDCOMPONENTE = UM.IDCOMPONENTE
LEFT JOIN <#SESSION.DB/>.DBO.USUARIOS U ON U.IDUSUARIO = UM.IDUSUARIO
LEFT JOIN <#SESSION.DB/>.DBO.USUARIOS_GRUPOS UG ON UG.IDUSUARIOGRUPO = UM.IDGRUPO
WHERE UM.IDEMPRESA = @IDEMPRESA AND UM.STATUS = 1
AND (
	 (@HOY BETWEEN UM.INICIO AND UM.FIN) or UM.FIN <= @HOY 
	)
UNION

SELECT  '-IE-'+max(UM.tkMta), '*'+UM.descripcion as descripcion, UM.IDCOMPONENTE, TM.NOMBRE_COMPONENTE AS componente,-1 as detalle, '',
CONVERT(VARCHAR(10), min(um.inicio), 103 ) AS fInicio,
CONVERT(VARCHAR(10), max(um.fin), 103 ) AS fFin,
cast(min(um.inicio) as float) as dtfInicio
FROM <#SESSION.DB/>.DBO.USUARIOS_METAS UM
JOIN SALESUP_CT.DBO.TIPOS_METAS TM ON TM.IDCOMPONENTE = UM.IDCOMPONENTE
LEFT JOIN <#SESSION.DB/>.DBO.USUARIOS U ON U.IDUSUARIO = UM.IDUSUARIO
LEFT JOIN <#SESSION.DB/>.DBO.USUARIOS_GRUPOS UG ON UG.IDUSUARIOGRUPO = UM.IDGRUPO
WHERE UM.IDEMPRESA = @IDEMPRESA AND UM.STATUS = 1 
AND (
	 (@HOY BETWEEN UM.INICIO AND UM.FIN) or UM.FIN <= @HOY 
	)
	/*AND @HOY BETWEEN UM.INICIO AND UM.FIN*/

GROUP BY UM.descripcion, TM.NOMBRE_COMPONENTE, UM.IDCOMPONENTE, um.formato/*, um.fin, um.inicio*/

ORDER BY  detalle, descripcion, dtfInicio DESC

select * from  @metasActivas where descripcion LIKE @buscar OR componente LIKE @buscar


