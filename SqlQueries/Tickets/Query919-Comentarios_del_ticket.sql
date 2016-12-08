//[idticket|Text,TKT|Text,session.idusuario|Untyped,]
-- SELECT

DECLARE @IDTICKET INT

SELECT @IDTICKET = IDTICKET FROM CONTROL.TICKETS.DBO.TICKETS WHERE TKT = COALESCE(:IDTICKET,:TKT,'')

SELECT 
CASE WHEN TIPOUSUARIO = 1 THEN REPLACE(REPLACE(CAST(COMENTARIO AS VARCHAR(MAX)), '<script', '&#60script'),'<meta', '&#60meta') ELSE COMENTARIO END AS COMENTARIO,
CASE 
 WHEN DATEDIFF ( hh , TC.FECHA, GETDATE() ) > 48 
 	THEN 'coment� el ' + SALESUP_CT.DBO.FormatoFecha(TC.FECHA,2) 
 	ELSE 'coment� '+ LOWER(SALESUP_CT.dbo.TIEMPO_TXT(TC.FECHA, GETDATE()))  
 END AS FECHA,
cast(TC.TKTCOM as varchar(max)) as TKTCOM,
TC.TIPOUSUARIO,
TC.IDCALIFICACION,
TC.ADJUNTO,
TC.ADJUNTO_LINK,
TC.IDTICKETCOMENTARIO,
TS.IDESTADO,
CASE TIPOUSUARIO
WHEN 1 THEN (SELECT NOMBRE  COLLATE DATABASE_DEFAULT+ ' ' + ISNULL(APELLIDOS,'') FROM SALESUP_CT.DBO.USUARIOS U WHERE U.IDUSUARIO = TC.IDUSUARIO)
WHEN 2 THEN (SELECT NOMBRE  COLLATE DATABASE_DEFAULT+ ' ' + ISNULL(APELLIDOS,'') FROM CONTROL.DISTRIBUIDORES.DBO.DISTRIBUIDORES WHERE IDDISTRIBUIDOR = TC.IDUSUARIO)
END AS NOMBRE_ULTIMAMODIFICACION,
CASE 
	WHEN TC.ADJUNTO_LINK IS NULL AND TIPOUSUARIO = 1 THEN 'C:\sitios\SalesUp\docs\tickets\'+TC.ADJUNTO 
	WHEN TC.ADJUNTO_LINK IS NULL AND TIPOUSUARIO = 2 THEN 'C:\sitios\Operacion\docs\'+TC.ADJUNTO 
	ELSE TC.ADJUNTO_LINK 
END AS LINK
FROM CONTROL.TICKETS.DBO.TICKET_COMENTARIOS TC,CONTROL.TICKETS.DBO.TICKETS TS WHERE TS.IDTICKET = TC.IDTICKET AND TC.IDTICKET = @IDTICKET AND TS.IDUSUARIO = <#SESSION.IDUSUARIO/>
ORDER BY TC.FECHA DESC