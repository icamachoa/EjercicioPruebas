//[fechadesde|Text,fechahasta|Text,session.nivel|Untyped,session.idgrupo|Untyped,session.idusuario|Untyped,session.idempresa|Untyped,tks|Text,idmoneda|Integer,session.db|Untyped,session.convertcode|Untyped,tipo1|Integer,]
--SELECT
DECLARE @FECHADESDE VARCHAR(15) = ISNULL(:FECHADESDE,'')
DECLARE @FECHAHASTA VARCHAR(15) = ISNULL(:FECHAHASTA,'')
DECLARE @FILTRO VARCHAR(MAX) = ''
DECLARE @FILTRO2 VARCHAR(MAX) = ''
DECLARE @NIVEL INT = <#SESSION.NIVEL/>
DECLARE @IDGRUPO INT = <#SESSION.IDGRUPO/>
DECLARE @IDUSUARIO INT = <#SESSION.IDUSUARIO/>
DECLARE @IDEMPRESA INT = <#SESSION.IDEMPRESA/>
DECLARE @TIPO1 INT = ISNULL(:TIPO1,0)

DECLARE @SQLTXT VARCHAR(MAX) = ''

DECLARE @TKS VARCHAR(64) =ISNULL(:TKS, '')
DECLARE @TIPO2 INT  = 0

DECLARE @IDMONEDA INT = ISNULL(:IDMONEDA,0)

IF(@TIPO1=1) BEGIN SELECT @TIPO2=IDUSUARIO FROM <#SESSION.DB/>.DBO.USUARIOS WHERE CAST(TKU AS VARCHAR(64))=@TKS END 
IF(@TIPO1=2) BEGIN SELECT @TIPO2=IDUSUARIOGRUPO FROM <#SESSION.DB/>.DBO.USUARIOS_GRUPOS WHERE CAST(TK AS VARCHAR(64))=@TKS END  
IF(@TIPO1=3) BEGIN SELECT @TIPO2=IDLINEA_PRODUCTO FROM <#SESSION.DB/>.DBO.EMPRESAS_LINEAS_PRODUCTO WHERE CAST(TK AS VARCHAR(64))=@TKS END  

 
SELECT @FILTRO = (CASE
	   WHEN @TIPO1 = 1 AND @TIPO2 > 0 THEN ' AND U.IDUSUARIO = ' + CAST(@TIPO2 AS VARCHAR(5))
	   WHEN @TIPO1 = 2 AND @TIPO2 > 0 THEN ' AND U.IDGRUPO = ' + CAST(@TIPO2 AS VARCHAR(5))
	   WHEN @TIPO1 = 3 AND @TIPO2 > 0 THEN ' AND O.IDLINEA_PRODUCTO = ' + CAST(@TIPO2 AS VARCHAR(5))
	   ELSE '' END
)
 

SELECT @FILTRO2 = (CASE
	   WHEN @NIVEL = 2 THEN ' AND U.IDGRUPO = ' + CAST(@IDGRUPO AS VARCHAR(5))
	   WHEN @NIVEL = 3 THEN ' AND U.IDUSUARIO = ' + CAST(@IDUSUARIO AS VARCHAR(5))
	   ELSE '' END
)
IF(LEN(@TKS)<=0) BEGIN SELECT @FILTRO2='' END
SET @SQLTXT = 'DECLARE @TABLA AS TABLE (ID INT)
INSERT INTO @TABLA (ID) SELECT ID FROM <#SESSION.DB/>.DBO.ObtieneUsuariosAutorizadosModulos(<#SESSION.IDUSUARIO/>,8,0)

DECLARE @BESTCLIENTS TABLE (
  IDCLIENTE INT IDENTITY, 
  NOMBRE VARCHAR(128), 
  APELLIDOS VARCHAR(128),
  EMPRESA VARCHAR(128), 
  PORCENTAJE FLOAT
  )

  DECLARE @TOTALVENTAS MONEY
  DECLARE @TOTALTRANS INT
  SELECT @TOTALVENTAS=SUM( V.MONTO),@TOTALTRANS=COUNT( V.IDVENTA) 
  FROM @TABLA UL,<#SESSION.DB/>.DBO.PROSPECTOS_ORIGENES PO 
      JOIN <#SESSION.DB/>.DBO.PROSPECTOS P  ON P.IDORIGEN = PO.IDORIGEN and P.DESCARTADO=0 AND P.ESCLIENTE =1 
      JOIN <#SESSION.DB/>.DBO.OPORTUNIDADES O ON P.IDPROSPECTO = O.IDPROSPECTO  AND GANADA = 1
      JOIN <#SESSION.DB/>.DBO.VENTAS V ON  O.IDOPORTUNIDAD = V.IDOPORTUNIDAD
	  JOIN <#SESSION.DB/>.DBO.USUARIOS U  WITH(NOLOCK) ON v.IDUSUARIO = U.IDUSUARIO 
    WHERE UL.ID=U.IDUSUARIO AND P.IDEMPRESA = <#SESSION.IDEMPRESA/>   AND P.DESCARTADO=0 AND P.ESCLIENTE =1
	AND V.FECHAHORA BETWEEN CONVERT(DATETIME,'''+@FECHADESDE+''',<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,'''+@FECHAHASTA+''',<#SESSION.CONVERTCODE/>)
	'+@FILTRO+'
	'+@FILTRO2+'

 INSERT INTO @BESTCLIENTS (NOMBRE,APELLIDOS,EMPRESA,PORCENTAJE)
 SELECT TOP 10 P.NOMBRE, P.APELLIDOS,P.EMPRESA,ROUND((sum(V.MONTO)*100/@TOTALVENTAS),2) as PORCENTAJE
   FROM  @TABLA UL, 
    <#SESSION.DB/>.DBO.PROSPECTOS_ORIGENES PO  WITH(NOLOCK)
    JOIN <#SESSION.DB/>.DBO.PROSPECTOS P   WITH(NOLOCK) ON P.IDORIGEN = PO.IDORIGEN and P.DESCARTADO=0 AND P.ESCLIENTE =1
    JOIN <#SESSION.DB/>.DBO.OPORTUNIDADES O  WITH(NOLOCK) ON P.IDPROSPECTO = O.IDPROSPECTO AND GANADA = 1
    JOIN <#SESSION.DB/>.DBO.VENTAS V  WITH(NOLOCK) ON  O.IDOPORTUNIDAD = V.IDOPORTUNIDAD 	
	JOIN <#SESSION.DB/>.DBO.USUARIOS U  WITH(NOLOCK) ON v.IDUSUARIO = U.IDUSUARIO 
  WHERE UL.ID=U.IDUSUARIO AND    
    PO.IDEMPRESA = <#SESSION.IDEMPRESA/> AND P.DESCARTADO=0 AND P.ESCLIENTE =1
	AND V.FECHAHORA BETWEEN CONVERT(DATETIME,'''+@FECHADESDE+''',<#SESSION.CONVERTCODE/>) AND CONVERT(DATETIME,'''+@FECHAHASTA+''',<#SESSION.CONVERTCODE/>)
	'+@FILTRO+'
	'+@FILTRO2+'
  GROUP BY P.IDPROSPECTO, P.NOMBRE, P.APELLIDOS, P.EMPRESA,  PO.ORIGEN,p.idprospecto--,v.monto
  ORDER BY PORCENTAJE DESC  
 

  

DECLARE @REST FLOAT
SELECT @REST=100.00-SUM(PORCENTAJE) FROM  @BESTCLIENTS
  
SELECT *,ROUND(@REST,2) AS REST FROM @BESTCLIENTS'

EXEC(@SQLTXT)