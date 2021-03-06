//[session.gmt|Untyped,session.idusuario|Untyped,session.db|Untyped,]
--select
DECLARE @GMT INT, @IDUSUARIO INT, @gmt2 int
DECLARE @HORAREAL DATETIME
SET @GMT = CAST('<#SESSION.GMT/>' AS INT )
SET @IDUSUARIO = CAST('<#SESSION.IDUSUARIO/>' AS INT )


SELECT @HORAREAL = SALESUP_CT.dbo.[obtieneFechaRealGMT](@GMT,GETDATE())

UPDATE <#SESSION.DB/>.DBO.USUARIOS WITH(ROWLOCK) SET ULTIMOAVISO = GETDATE() WHERE IDUSUARIO = @IDUSUARIO

SELECT 1 as tipo, R.IDRECORDATORIO AS idr,
P.IDPROSPECTO AS idp, O.IDOPORTUNIDAD AS ido, P.tkp, O.tko,
R.Recordatorio, <#SESSION.DB/>.DBO.GETONLYTIME(R.FECHAHORA) as Hora,
P.NOMBRE +' '+ ISNULL(P.APELLIDOS,'') AS Prospecto,
CASE WHEN ISNULL(P.IDCOMPANIA,0)=0 THEN P.EMPRESA ELSE COM.EMPRESA END AS Empresa,
P.Correo, P.Telefono, P.MOVIL as Celular
FROM 
  <#SESSION.DB/>.DBO.RECORDATORIOS R WITH(NOLOCK)
  LEFT JOIN <#SESSION.DB/>.DBO.PROSPECTOS P WITH(NOLOCK) ON R.IDPROSPECTO = P.IDPROSPECTO
  LEFT JOIN <#SESSION.DB/>.DBO.OPORTUNIDADES O WITH(NOLOCK) ON R.IDOPORTUNIDAD = O.IDOPORTUNIDAD
  LEFT JOIN <#SESSION.DB/>.dbo.COMPANIAS COM  WITH(NOLOCK) ON COM.IDCOMPANIA = P.IDCOMPANIA 
WHERE
	  R.COMPLETADO = 0 
  AND R.IDUSUARIO = @IDUSUARIO  
  AND (DATEDIFF(N,@HORAREAL,R.FECHAHORA) BETWEEN 0 AND 7 OR
  DATEDIFF(N,@HORAREAL,R.FECHAHORA) BETWEEN 10 AND 15 OR
  DATEDIFF(N,@HORAREAL,R.FECHAHORA) BETWEEN 25 AND 30)
  
UNION

SELECT 2 as tipo, CI.IDCITA AS idCita,
	   null,null,null,null,
	   null, <#SESSION.DB/>.DBO.GETONLYTIME(C.FECHA_INICIO) AS fechaInicio,
		<#SESSION.DB/>.DBO.GETONLYTIME(C.FECHA_FIN) AS fechaFin,
		C.LUGAR AS lugar,
		C.ASUNTO AS asunto,<#SESSION.DB/>.DBO.NombreInvitados(CI.IDCITA),cast(C.DESCRIPCION as varchar(128)) AS descripcion
FROM 
	 <#SESSION.DB/>.DBO.CITAS C WITH(NOLOCK)
	 JOIN <#SESSION.DB/>.DBO.CITAS_INVITADOS CI WITH(NOLOCK) ON CI.idcita = C.IDCITA
WHERE 
	  CI.idpersona = <#SESSION.IDUSUARIO/> 
	  AND C.ACTIVO = 1
	  AND CI.tipopersona = 2 
	  AND (DATEDIFF(N,@HORAREAL,C.FECHA_INICIO) BETWEEN 0 AND 7 OR
	  DATEDIFF(N,@HORAREAL,C.FECHA_INICIO) BETWEEN 10 AND 15 OR
	  DATEDIFF(N,@HORAREAL,C.FECHA_INICIO) BETWEEN 25 AND 30)
ORDER BY HORA
