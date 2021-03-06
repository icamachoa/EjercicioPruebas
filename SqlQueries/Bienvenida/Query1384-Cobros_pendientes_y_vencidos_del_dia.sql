//[session.db|Untyped,session.idempresa|Untyped,session.idusuario|Untyped,ordenamiento|Untyped,]
/* Este es el del inicio! */


SELECT 
  cast (VC.fechahora as float) as FECHAHORA_INT,p.telefono,p.telefono2,p.movil,
  <#SESSION.DB/>.DBO.FECHA_STR(VC.FECHAHORA) AS FECHAHORA, <#SESSION.DB/>.DBO.QUITA_ESPACIOS(CONVERT(CHAR,VC.FECHAHORA,112)) AS FECHITA,VC.*,
  V.NOPARCIALIDADES, 
  O.IDOPORTUNIDAD, O.CONCEPTO,  
  P.NOMBRE, P.APELLIDOS, CORREO, TELEFONO, TELEFONO2, MOVIL, P.EMPRESA,
  U.INICIALES,  U.NOMBRE+' '+U.APELLIDOS AS EJECUTIVO_NOMBRE 

FROM 
<#SESSION.DB/>.DBO.VENTAS_COBROS VC WITH(NOLOCK),
<#SESSION.DB/>.DBO.VENTAS V WITH(NOLOCK),
<#SESSION.DB/>.DBO.OPORTUNIDADES O WITH(NOLOCK), 
<#SESSION.DB/>.DBO.PROSPECTOS P WITH(NOLOCK), 
<#SESSION.DB/>.DBO.USUARIOS U WITH(NOLOCK)
WHERE 
  P.IDEMPRESA=<#SESSION.IDEMPRESA/> AND 
  U.IDEMPRESA = P.IDEMPRESA AND
  VC.IDVENTA=V.IDVENTA AND 
  V.IDOPORTUNIDAD=O.IDOPORTUNIDAD AND
  O.IDPROSPECTO = P.IDPROSPECTO AND 
  P.IDUSUARIO = U.IDUSUARIO AND 
  VC.PAGADO=0 AND 
  <#SESSION.DB/>.DBO.GETONLYDATE(VC.FECHAHORA)<=<#SESSION.DB/>.DBO.GETONLYDATE (GETDATE()) AND
    V.IDUSUARIO=<#SESSION.IDUSUARIO/>
  ORDER BY VC.fechahora 
 
