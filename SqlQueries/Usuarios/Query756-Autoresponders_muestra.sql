//[ordenamiento|Text,session.db|Untyped,session.idempresa|Untyped,]
--SELECT 
DECLARE @SQL VARCHAR(MAX)
DECLARE @CRIT VARCHAR(MAX) SET @CRIT = ISNULL( :ORDENAMIENTO , '')

SET @SQL = '

 SELECT AR.IDAUTORESPONDER, CAST(TKAUTO AS VARCHAR(128)) AS TKAUTO, AR.TITULO, AR.IDUSUARIO, AR.IDETIQUETA ,AR.ESTADO,AR.IDEMPRESA ,AR.ESPROSPECTO,
 AR.ESOPORTUNIDAD,AR.ESCLIENTE,AR.ID_ANT,  INICIALES , ETI.ETIQUETA,ETI.TK , ISNULL(U.NOMBRE, '''') + '' ''+ ISNULL(U.APELLIDOS,'''') AS NOMBREEJECUTIVO,
 (SELECT COUNT (ARP.IDAUTORESPONDER) FROM <#SESSION.DB/>.DBO.AUTORESPONDERS_PIEZAS ARP WHERE AR.IDAUTORESPONDER = ARP.IDAUTORESPONDER) AS PIEZAS,
 (
   SELECT COUNT (*) FROM <#SESSION.DB/>.DBO.ETIQUETAS E 
 JOIN <#SESSION.DB/>.DBO.PROSPECTOS_ETIQUETAS PE ON PE.IDETIQUETA = AR.IDETIQUETA
 JOIN <#SESSION.DB/>.DBO.PROSPECTOS P ON PE.IDPROSPECTO = P.IDPROSPECTO
 WHERE E.IDETIQUETA = AR.IDETIQUETA AND P.IDEMPRESA = <#SESSION.IDEMPRESA/> AND P.CORREO != '''' AND P.CORREO IS NOT NULL
  ) AS ASIGNADOS

 FROM <#SESSION.DB/>.DBO.AUTORESPONDERS AR 
 JOIN <#SESSION.DB/>.DBO.USUARIOS U ON AR.IDUSUARIO = U.IDUSUARIO
 JOIN <#SESSION.DB/>.DBO.ETIQUETAS ETI ON AR.IDETIQUETA = ETI.IDETIQUETA
 WHERE AR.IDEMPRESA = <#SESSION.IDEMPRESA/>
 ORDER BY  '  + @CRIT 
 
EXEC (@SQL) 