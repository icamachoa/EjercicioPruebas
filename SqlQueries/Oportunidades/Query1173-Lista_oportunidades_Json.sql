//[session.idusuario|Untyped,idpantalla|Integer,session.idempresa|Untyped,start|Integer,howmany|Integer,porempresa|Text,ordersql|Text,porcatalogo|Text,tkcom|Text,session.db|Untyped,session.nivel|Untyped,session.idgrupo|Untyped,session.mailconfig|Untyped,session.multimoneda|Untyped,]
--SELECT 
/*PROTEGIDO*/
DECLARE @SQL VARCHAR(MAX)
DECLARE @TOP VARCHAR(1000)
DECLARE @OrderSql VARCHAR(1000) 
DECLARE @F_USUARIO VARCHAR(MAX)
DECLARE @CRIT VARCHAR(MAX)
DECLARE @POREMPRESA VARCHAR(MAX)
DECLARE @PORCATALOGO VARCHAR(MAX)
DECLARE @DESCARTADO VARCHAR(MAX)

DECLARE @IDUSUARIO VARCHAR(MAX)
SET @IDUSUARIO = <#SESSION.IDUSUARIO/>
DECLARE @IDPANTALLA VARCHAR(MAX)
SET @IDPANTALLA = ISNULL(:IDPANTALLA,2)
DECLARE @IDEMPRESA VARCHAR(MAX)
SET @IDEMPRESA = <#SESSION.IDEMPRESA/>

SET @TOP= ''
DECLARE @START INT SET @START = :START
DECLARE @HOWMANY INT SET @HOWMANY = :HOWMANY
IF @START IS NOT NULL AND @HOWMANY IS NOT NULL
BEGIN 
	  SET @TOP= 'TOP '+CAST(ISNULL(@START+@HOWMANY-1,50) AS VARCHAR(MAX))
END

SET @POREMPRESA=ISNULL(:PorEmpresa,'')
SET @OrderSql = ISNULL(:OrderSql,'')
SET @PORCATALOGO =ISNULL(:PORCATALOGO,'')

DECLARE @TABLADEFILTROS TABLE(ID INT, VAL VARCHAR(MAX))

--------
DECLARE @TkCom VARCHAR(64)
SET @TkCom = CAST(ISNULL(:TKCOM,' ')  AS VARCHAR(MAX))

DECLARE @PORTKCOM VARCHAR(MAX)
SET @PORTKCOM = ''
--DECLARE @IDCOMPANIA INT;
--SET @IDCOMPANIA = 0
IF @TkCom != ''
BEGIN
   --SELECT @IDCOMPANIA  = IDCOMPANIA FROM <#SESSION.DB/>.dbo.COMPANIAS WHERE TKCOM = @TkCom
   SET @PORTKCOM = ' AND COM.TKCOM = '''+CAST(@TkCom AS VARCHAR(MAX))+''' '
END
-----------
INSERT INTO @TABLADEFILTROS
SELECT * FROM <#SESSION.DB/>.dbo.filtrospantallas(@IDPANTALLA, @IDEMPRESA, @IDUSUARIO)

SELECT
  @CRIT = <#SESSION.DB/>.DBO.UDF_CONSTRUYE_FILTRO(@IDUSUARIO, CAST(RTRIM(LTRIM(@IDPANTALLA)) AS int))
SELECT
    @CRIT = @CRIT + <#SESSION.DB/>.DBO.UDF_CONSTRUYE_FILTRO(@IDUSUARIO, 15)



  SELECT @F_USUARIO = VAL
  FROM @TABLADEFILTROS
  WHERE ID = 1

  
  SELECT @DESCARTADO = VAL
  FROM @TABLADEFILTROS
  WHERE ID = 3
 

  IF @F_USUARIO IS NOT NULL AND @TKCOM != ''
  BEGIN
    DECLARE @IDSUSUARIOS VARCHAR(MAX)
    SET @IDSUSUARIOS = ''
    SELECT @IDSUSUARIOS=CAST(ID AS VARCHAR(1000))+','+@IDSUSUARIOS FROM <#SESSION.DB/>.DBO.ObtieneUsuariosAutorizadosModulos (@IDUSUARIO,@IDPANTALLA,0)
    SET @IDSUSUARIOS=@IDSUSUARIOS+'0'
    SET @F_USUARIO = 'AND ( (O.IDUSUARIO IN  ('+@IDSUSUARIOS+')))'
  END

SET @SQL = '
USE <#SESSION.DB/>
DECLARE @IDEMPRESA INT , @IDUSUARIO INT, @NIVELUSUARIO INT, @IDGRUPO INT, @MAILCONFIG INT, @Descartado INT,@IDCOMPANIA INT
DECLARE @TkCom VARCHAR(64)

DECLARE @TIPODECAMBIODEFAULT MONEY = 1
DECLARE @MULTIMONEDA INT

SET @TkCom = '''+ISNULL(:TKCOM,'')+'''
SET @IDEMPRESA = <#SESSION.IDEMPRESA/>
SET @IDUSUARIO = <#SESSION.IDUSUARIO/>
SET @NIVELUSUARIO = <#SESSION.NIVEL/>
SET @IDGRUPO = <#SESSION.IDGRUPO/>
SET @MAILCONFIG = <#SESSION.MAILCONFIG/>
SET @MULTIMONEDA = <#SESSION.MULTIMONEDA/>
SET @DESCARTADO = '+cast(ISNULL(@DESCARTADO,0) as varchar(1000))+'
SET @IDCOMPANIA = 0



IF @TkCom != ''''
BEGIN
	 SELECT @IDCOMPANIA = IDCOMPANIA FROM <#SESSION.DB/>.dbo.COMPANIAS WHERE TKCOM = @TkCom
END

IF(@MULTIMONEDA > 0)
BEGIN
	 SELECT @TIPODECAMBIODEFAULT = TIPODECAMBIO FROM <#SESSION.DB/>.DBO.MONEDAS WHERE IDEMPRESA = @IDEMPRESA AND PORDEFECTO = 1
END


SELECT
'+@TOP+'
  P.Tkp, O.TKO AS Tko, P.IdCompania, COM.TkCom,O.idusuario as IdUsuario,
  SALESUP_CT.dbo.esCanalizado(P.TKP, P.TKPM) AS esCanalizado, P.CANALIZADOEL AS FechaCanalizado, SALESUP_CT.dbo.ObtieneHora(P.CANALIZADOEL) AS HoraCanalizado, P.USRCANALIZO as Canalizo, P.USRCANALIZADO AS Canalizado,O.DESCUENTO AS Descuento,
  SALESUP_CT.dbo.VerLtArchivos(P.IDPROSPECTO, P.NARCHIVOS, O.IDOPORTUNIDAD, O.NARCHIVOS ) AS VerArchivos,
  ISNULL(P.NARCHIVOS,0) + ISNULL(O.NARCHIVOS,0) as tieneArchivos,
  (CASE WHEN '''+CAST(@POREMPRESA AS VARCHAR(MAX))+'''='''' THEN ''ReloadData'' ELSE ''SalesUp.Variables.ReloadDataEmpresaOpor'' END) AS ReloadData,
  CASE @DESCARTADO  WHEN 0 THEN ''1'' ELSE '''' END AS Descartado,M.IDMONEDA AS Moneda, M.TIPODECAMBIO AS TipoDeCambio,@TIPODECAMBIODEFAULT AS CambioDefault,
  CASE WHEN P.IDUSUARIO = @IDUSUARIO  OR O.IDUSUARIO = @IDUSUARIO  OR PA2.IDUSUARIO = @IDUSUARIO OR @NIVELUSUARIO  <= 2 THEN ''1'' ELSE '''' END AS tEtiquetar_tSeguimiento,
  CASE WHEN P.IDUSUARIO = @IDUSUARIO  OR @NIVELUSUARIO  <= 2 THEN ''1'' ELSE '''' END AS tCompartir_tReasignar,
  CASE WHEN P.IDUSUARIO = @IDUSUARIO  OR O.IDUSUARIO = @IDUSUARIO  OR PA2.IDUSUARIO = @IDUSUARIO  THEN ''1'' ELSE '''' END AS tOportunidad,
  CASE WHEN P.IDUSUARIO = @IDUSUARIO  OR O.IDUSUARIO = @IDUSUARIO  OR @NIVELUSUARIO  <= 2 THEN ''1'' ELSE '''' END AS tDescartar_tVentas,
  P.IdProspecto, O.IdOportunidad,
  LTRIM(RTRIM(P.NOMBRE))+'' ''+ISNULL(LTRIM(RTRIM(P.APELLIDOS)),'''') AS NombreCliente, P.Puesto, ISNULL(P.Empresa,'''') AS Empresa , P.ETIQUETAS_TXT AS Etiquetas,
  CASE P.Sexo WHEN ''H'' THEN ''Hombre'' WHEN ''M'' THEN ''Mujer'' ELSE '''' END AS Sexo,
  CASE WHEN <#SESSION.DB/>.DBO.ValidaEmail(P.CORREO) = ''NO'' THEN ''1'' ELSE '''' END as EsCorreo, ISNULL(P.Correo,'''') As Correo , ISNULL(P.Telefono,'''') as Telefono , ISNULL(P.Telefono2,'''') AS Telefono2 , ISNULL(P.Movil,'''') as Movil,  
   O.Concepto as Concepto, LP.LINEA_PRODUCTO as LineaProducto, O.Subtotal, O.Impuestos,
  ISNULL(F.Fase,'''') AS Fase, ISNULL(ORI.Origen,'''') AS Origen,
  ISNULL(Monto,'''') AS Monto, ISNULL(COMISION_MONTO,0) as Comision, O.Certeza, EC.DESCRIPCION AS TxtCerteza, 
  CASE WHEN O.FECHA_CIERRE < <#SESSION.DB/>.DBO.GETONLYDATE(GETDATE()) THEN ''1'' ELSE '''' END AS Vencida, CONVERT(VARCHAR(10),O.FECHA_CIERRE,103) as CierreEstimado,
   isnull(CAST(S.COMENTARIO AS VARCHAR(MAX)),'''')  AS UltimoContacto,
  (<#SESSION.DB/>.DBO.TIEMPO_TXT (S.FECHAHORA,GETDATE())) AS UltimoContactoTiempo,
  U.Iniciales , U.NOMBRE+'' ''+U.APELLIDOS AS EjecutivoNombre,
  
  CASE WHEN COUNT(A3.IDPROSPECTO) >0 THEN ''1'' ELSE '''' END AS Compartido,
  CASE @MAILCONFIG  WHEN 0 THEN ''1'' ELSE '''' END AS NoConfigurado,
  CASE @MAILCONFIG  WHEN 1 THEN ''1'' ELSE '''' END AS EmailConfigurado,
  CASE @MAILCONFIG  WHEN 2 THEN ''1'' ELSE '''' END AS MailTo, S.FECHAHORA AS ULTIMO_CONTACTO_FECHA, CONVERT(VARCHAR(10),O.FECHAHORA,103) AS FechaCreacion,
  
	 
  CASE WHEN P.CAMPO1 IS NOT NULL THEN P.CAMPO1 ELSE '''' END AS cp1,
  CASE WHEN P.CAMPO2 IS NOT NULL THEN P.CAMPO2 ELSE '''' END AS cp2,
  CASE WHEN P.CAMPO3 IS NOT NULL THEN P.CAMPO3 ELSE '''' END AS cp3,
  CASE WHEN P.CAMPO4 IS NOT NULL THEN P.CAMPO4 ELSE '''' END AS cp4,
  
  CASE WHEN P.CAMPO5 IS NOT NULL THEN P.CAMPO5 ELSE '''' END AS cp5,
  CASE WHEN P.CAMPO6 IS NOT NULL THEN P.CAMPO6 ELSE '''' END AS cp6,
  CASE WHEN P.CAMPO7 IS NOT NULL THEN P.CAMPO7 ELSE '''' END AS cp7,
  CASE WHEN P.CAMPO8 IS NOT NULL THEN P.CAMPO8 ELSE '''' END AS cp8,
  
  CASE WHEN P.CAMPO9 IS NOT NULL THEN CONVERT(VARCHAR(10),P.CAMPO9,103) ELSE '''' END AS cp9,
  CASE WHEN P.CAMPO10 IS NOT NULL THEN CONVERT(VARCHAR(10),P.CAMPO10,103) ELSE '''' END AS cp10,
  CASE WHEN P.CAMPO11 IS NOT NULL THEN CONVERT(VARCHAR(10),P.CAMPO11,103) ELSE '''' END AS cp11,
  CASE WHEN P.CAMPO12 IS NOT NULL THEN CONVERT(VARCHAR(10),P.CAMPO12,103) ELSE '''' END AS cp12,
  
  ISNULL(P.CAMPO13,'''') AS cp13,
  ISNULL(P.CAMPO14,'''') AS cp14,
  ISNULL(P.CAMPO15,'''') AS cp15,
  ISNULL(P.CAMPO16,'''') AS cp16,
  ISNULL(P.CAMPO17,'''') AS cp17,
  ISNULL(P.CAMPO18,'''') AS cp18,
  ISNULL(P.CAMPO19,'''') AS cp19,
  ISNULL(P.CAMPO20,'''') AS cp20,

  CP21.OPCION AS cp21,
  CP22.OPCION AS cp22,
  CP23.OPCION AS cp23,
  CP24.OPCION AS cp24,
  CP25.OPCION AS cp25,
  
  P.CAMPO26 AS cp26, P.CAMPO27 AS cp27, P.CAMPO28 AS cp28P,
  P.CAMPO29 AS cp29, P.CAMPO30 AS cp30, P.CAMPO31 AS cp31P, P.CAMPO32 AS cp32P,
  P.CAMPO33 AS cp33, P.CAMPO34 AS cp34,
  
  O.CAMPO1 AS cp1O, O.CAMPO2 AS cp2O, O.CAMPO3 AS cp3O, O.CAMPO4 AS cp4O,
  O.CAMPO5 AS cp5O, O.CAMPO6 AS cp6O, O.CAMPO7 AS cp7O, O.CAMPO8 AS cp8O,
  CASE WHEN O.CAMPO9 IS NOT NULL THEN CONVERT(VARCHAR(10),O.CAMPO9,103) ELSE '''' END AS cp9O,
  CASE WHEN O.CAMPO10 IS NOT NULL THEN CONVERT(VARCHAR(10),O.CAMPO10,103) ELSE '''' END AS cp10O,
  CASE WHEN O.CAMPO11 IS NOT NULL THEN CONVERT(VARCHAR(10),O.CAMPO11,103) ELSE '''' END AS cp11O,
  CASE WHEN O.CAMPO12 IS NOT NULL THEN CONVERT(VARCHAR(10),O.CAMPO12,103) ELSE '''' END AS cp12O,
  O.CAMPO13 AS cp13O, O.CAMPO14 AS cp14O, O.CAMPO15 AS cp15O, O.CAMPO16 AS cp16O,
  O.CAMPO17 AS cp17O, O.CAMPO18 AS cp18O, O.CAMPO19 AS cp19O, O.CAMPO20 AS cp20O,
  CPO21.OPCION AS cp21O, CPO22.OPCION AS cp22O, CPO23.OPCION AS cp23O, CPO24.OPCION AS cp24O, CPO25.OPCION AS cp25O,
  O.CAMPO26 AS cp26O, O.CAMPO27 AS cp27O, O.CAMPO28 AS cp28O,
  O.CAMPO29 AS cp29O, O.CAMPO30 AS cp30O, O.CAMPO31 AS cp31O, O.CAMPO32 AS cp32O,
  O.CAMPO33 AS cp33O, O.CAMPO34 AS cp34O,
  
  O.CAMPO35 AS cp35O, O.CAMPO36 AS cp36O, O.CAMPO37 AS cp37O, O.CAMPO38 AS cp38O, O.CAMPO39 AS cp39O, 
  O.CAMPO40 AS cp40O, O.CAMPO41 AS cp41O, O.CAMPO42 AS cp42O, O.CAMPO43 AS cp43O, O.CAMPO44 AS cp44O, 
  O.CAMPO45 AS cp45O, O.CAMPO46 AS cp46O, O.CAMPO47 AS cp47O, O.CAMPO48 AS cp48O, O.CAMPO49 AS cp49O, 
  O.CAMPO50 AS cp50O, O.CAMPO51 AS cp51O, O.CAMPO52 AS cp52O, O.CAMPO53 AS cp53O, O.CAMPO54 AS cp54O, 
  O.CAMPO55 AS cp55O, O.CAMPO56 AS cp56O, O.CAMPO57 AS cp57O, O.CAMPO58 AS cp58O, O.CAMPO59 AS cp59O, 
  O.CAMPO60 AS cp60O, O.CAMPO61 AS cp61O, O.CAMPO62 AS cp62O, O.CAMPO63 AS cp63O, O.CAMPO64 AS cp64O
  
  ,CatP1.OPCION AS pCat1, CatP2.OPCION AS pCat2,CatP3.OPCION AS pCat3,
  CatO1.OPCION AS oCat1, CatO2.OPCION AS oCat2,CatO3.OPCION AS oCat3,
  CatE1.OPCION AS eCat1,CatE2.OPCION AS eCat2,CatE3.OPCION AS eCat3  , 
   MON.MONEDA_SIMBOLO , UNICODE(MON.MONEDA_SIMBOLO) AS UNICODE,
  CatI.INDUSTRIA AS CatIndustria, CatG.COMPANIAGRUPO AS CatCorporativo,COALESCE(PA.JSONEVENTO,PA2.JSONEVENTO,A3.JSONEVENTO) AS proximoEvento

FROM <#SESSION.DB/>.dbo.OPORTUNIDADES O WITH(NOLOCK) 
  INNER JOIN <#SESSION.DB/>.dbo.PROSPECTOS P WITH(NOLOCK) ON O.IDPROSPECTO = P.IDPROSPECTO 
  LEFT JOIN <#SESSION.DB/>.dbo.PROSPECTOS_ASIGNADOS PA WITH(NOLOCK) ON @IDUSUARIO  = PA.IDUSUARIO AND PA.IDPROSPECTO = O.IDPROSPECTO
  LEFT JOIN <#SESSION.DB/>.DBO.PROSPECTOS_ASIGNADOS PA2 WITH(NOLOCK) ON PA2.IDPROSPECTO = P.IDPROSPECTO AND PA2.IDUSUARIO =@IDUSUARIO 
  LEFT JOIN <#SESSION.DB/>.DBO.PROSPECTOS_ASIGNADOS A3 WITH(NOLOCK) ON A3.IDPROSPECTO = P.IDPROSPECTO AND P.IDUSUARIO != A3.IDUSUARIO
  INNER JOIN <#SESSION.DB/>.dbo.PROSPECTOS_ORIGENES ORI WITH(NOLOCK) ON ORI.IDORIGEN = P.IDORIGEN
  INNER JOIN <#SESSION.DB/>.dbo.OPORTUNIDADES_FASES F WITH(NOLOCK) ON O.IDFASE = F.IDFASE  
  INNER JOIN <#SESSION.DB/>.dbo.USUARIOS U WITH(NOLOCK) ON O.IDUSUARIO = U.IDUSUARIO 
  INNER JOIN <#SESSION.DB/>.dbo.EMPRESAS_LINEAS_PRODUCTO LP WITH(NOLOCK) ON O.IDLINEA_PRODUCTO = LP.IDLINEA_PRODUCTO 
  LEFT JOIN <#SESSION.DB/>.dbo.PROSPECTOS_SEGUIMIENTO S WITH(NOLOCK) ON O.IDULTIMOSEGUIMIENTO = S.IDSEGUIMIENTO 
  LEFT JOIN <#SESSION.DB/>.dbo.USUARIOS U1 WITH(NOLOCK) ON S.IDUSUARIO = U1.IDUSUARIO
  LEFT JOIN <#SESSION.DB/>.dbo.EMPRESAS_CERTEZAS EC WITH(NOLOCK) ON EC.IDEMPRESA = P.IDEMPRESA AND EC.CERTEZA = (O.CERTEZA*100)
  LEFT JOIN <#SESSION.DB/>.dbo.EMPRESAS_CAMPOS_OPCIONES CP21 WITH(NOLOCK) ON CP21.IDOPCION = P.CAMPO21
  LEFT JOIN <#SESSION.DB/>.dbo.EMPRESAS_CAMPOS_OPCIONES CP22 WITH(NOLOCK) ON CP22.IDOPCION = P.CAMPO22
  LEFT JOIN <#SESSION.DB/>.dbo.EMPRESAS_CAMPOS_OPCIONES CP23 WITH(NOLOCK) ON CP23.IDOPCION = P.CAMPO23
  LEFT JOIN <#SESSION.DB/>.dbo.EMPRESAS_CAMPOS_OPCIONES CP24 WITH(NOLOCK) ON CP24.IDOPCION = P.CAMPO24
  LEFT JOIN <#SESSION.DB/>.dbo.EMPRESAS_CAMPOS_OPCIONES CP25 WITH(NOLOCK) ON CP25.IDOPCION = P.CAMPO25
  
  LEFT JOIN <#SESSION.DB/>.dbo.EMPRESAS_CAMPOS_OPCIONES CPO21 WITH(NOLOCK) ON CPO21.IDOPCION = O.CAMPO21
  LEFT JOIN <#SESSION.DB/>.dbo.EMPRESAS_CAMPOS_OPCIONES CPO22 WITH(NOLOCK) ON CPO22.IDOPCION = O.CAMPO22
  LEFT JOIN <#SESSION.DB/>.dbo.EMPRESAS_CAMPOS_OPCIONES CPO23 WITH(NOLOCK) ON CPO23.IDOPCION = O.CAMPO23
  LEFT JOIN <#SESSION.DB/>.dbo.EMPRESAS_CAMPOS_OPCIONES CPO24 WITH(NOLOCK) ON CPO24.IDOPCION = O.CAMPO24
  LEFT JOIN <#SESSION.DB/>.dbo.EMPRESAS_CAMPOS_OPCIONES CPO25 WITH(NOLOCK) ON CPO25.IDOPCION = O.CAMPO25
  
  LEFT JOIN <#SESSION.DB/>.dbo.COMPANIAS COM WITH(NOLOCK) ON COM.IDCOMPANIA = P.IDCOMPANIA

  LEFT JOIN <#SESSION.DB/>.DBO.CATALOGOS_OPCIONES CatP1 WITH(NOLOCK) ON CatP1.IDCATALOGOOPCION = P.IDCATALOGOOPCION1      
  LEFT JOIN <#SESSION.DB/>.DBO.CATALOGOS_OPCIONES CatP2 WITH(NOLOCK) ON CatP2.IDCATALOGOOPCION = P.IDCATALOGOOPCION2      
  LEFT JOIN <#SESSION.DB/>.DBO.CATALOGOS_OPCIONES CatP3 WITH(NOLOCK) ON CatP3.IDCATALOGOOPCION = P.IDCATALOGOOPCION3      

  LEFT JOIN <#SESSION.DB/>.DBO.CATALOGOS_OPCIONES CatO1 WITH(NOLOCK) ON CatO1.IDCATALOGOOPCION = O.IDCATALOGOOPCION1      
  LEFT JOIN <#SESSION.DB/>.DBO.CATALOGOS_OPCIONES CatO2 WITH(NOLOCK) ON CatO2.IDCATALOGOOPCION = O.IDCATALOGOOPCION2      
  LEFT JOIN <#SESSION.DB/>.DBO.CATALOGOS_OPCIONES CatO3 WITH(NOLOCK) ON CatO3.IDCATALOGOOPCION = O.IDCATALOGOOPCION3      

  LEFT JOIN <#SESSION.DB/>.DBO.CATALOGOS_OPCIONES CatE1 WITH(NOLOCK) ON CatE1.IDCATALOGOOPCION = COM.IDCATALOGOOPCION1      
  LEFT JOIN <#SESSION.DB/>.DBO.CATALOGOS_OPCIONES CatE2 WITH(NOLOCK) ON CatE2.IDCATALOGOOPCION = COM.IDCATALOGOOPCION2      
  LEFT JOIN <#SESSION.DB/>.DBO.CATALOGOS_OPCIONES CatE3 WITH(NOLOCK) ON CatE3.IDCATALOGOOPCION = COM.IDCATALOGOOPCION3      

  LEFT JOIN <#SESSION.DB/>.DBO.EMPRESAS_INDUSTRIAS CatI WITH(NOLOCK) ON CatI.IDINDUSTRIA = COM.IDINDUSTRIA      
  LEFT JOIN <#SESSION.DB/>.DBO.COMPANIAS_GRUPOS CatG WITH(NOLOCK) ON CatG.IDCOMPANIAGRUPO = COM.IDCOMPANIAGRUPO		      

  LEFT JOIN <#SESSION.DB/>.DBO.MONEDAS M WITH(NOLOCK) ON M.IDEMPRESAMONEDA = O.IDEMPRESAMONEDA
  LEFT JOIN SALESUP_CT.DBO.MONEDAS MON ON MON.IDMONEDA=M.IDMONEDA
WHERE 
  P.IDEMPRESA = @IDEMPRESA  AND O.PERDIDA=0 
  AND O.GANADA = 0 
  '+@F_USUARIO+' 
  AND P.DESCARTADO=0
  '+@CRIT+'
  '+@POREMPRESA+'
  '+@PORCATALOGO+' '+@PORTKCOM+'
  
 GROUP BY
O.TKO , P.IdCompania, COM.TkCom, P.IDUSUARIO,P.APELLIDOS, P.NOMBRE,P.PUESTO,P.EMPRESA,P.ETIQUETAS_TXT,P.CORREO,P.TELEFONO, P.TELEFONO2, P.MOVIL,
O.CONCEPTO, O.Subtotal, O.Impuestos,COALESCE(PA.JSONEVENTO,PA2.JSONEVENTO,A3.JSONEVENTO),
   P.IDPROSPECTO, P.NARCHIVOS, O.IDOPORTUNIDAD, O.NARCHIVOS,  O.IDUSUARIO , PA2.IDUSUARIO,
      P.CAMPO1,P.CAMPO2,P.CAMPO3,P.CAMPO4,P.CAMPO5,P.CAMPO6,P.CAMPO7,P.CAMPO8,P.CAMPO9,P.CAMPO10,
      P.CAMPO11,P.CAMPO12,P.CAMPO13,P.CAMPO14,P.CAMPO15,P.CAMPO16,P.CAMPO17,P.CAMPO18,P.CAMPO19,P.CAMPO20,
  CP21.OPCION ,  CP22.OPCION ,  CP23.OPCION ,  CP24.OPCION ,  CP25.OPCION ,
  CPO21.OPCION, CPO22.OPCION, CPO23.OPCION, CPO24.OPCION, CPO25.OPCION,
  LP.LINEA_PRODUCTO ,  F.Fase, ORI.Origen,  Monto,COMISION_MONTO, O.Certeza, EC.DESCRIPCION , 
  O.FECHA_CIERRE , CAST(S.COMENTARIO  AS VARCHAR(MAX)),S.FECHAHORA, O.IDPROSPECTO,O.FECHAHORA,
  U.Iniciales ,  U.NOMBRE+'' ''+U.APELLIDOS,COM.IDINDUSTRIA,COM.IDCOMPANIAGRUPO,
  P.CAMPO21, P.CAMPO22, P.CAMPO23, P.CAMPO24, P.CAMPO25,
  P.CAMPO26, P.CAMPO27, P.CAMPO28,
  P.CAMPO29, P.CAMPO30, P.CAMPO31, P.CAMPO32,
  P.CAMPO33, P.CAMPO34,
  P.CAMPO35, P.CAMPO36, P.CAMPO37, P.CAMPO38, P.CAMPO39, 
  P.CAMPO40, P.CAMPO41, P.CAMPO42, P.CAMPO43, P.CAMPO44, 
  P.CAMPO45, P.CAMPO46, P.CAMPO47, P.CAMPO48, P.CAMPO49, 
  P.CAMPO50, P.CAMPO51, P.CAMPO52, P.CAMPO53, P.CAMPO54, 
  P.CAMPO55, P.CAMPO56, P.CAMPO57, P.CAMPO58, P.CAMPO59, 
  P.CAMPO60, P.CAMPO61, P.CAMPO62, P.CAMPO63, P.CAMPO64,
  O.CAMPO1, O.CAMPO2, O.CAMPO3, O.CAMPO4 ,
  O.CAMPO5, O.CAMPO6, O.CAMPO7, O.CAMPO8,
  O.CAMPO9, O.CAMPO10, O.CAMPO11, O.CAMPO12,
  O.CAMPO13, O.CAMPO14, O.CAMPO15, O.CAMPO16,
  O.CAMPO17, O.CAMPO18, O.CAMPO19, O.CAMPO20,
  O.CAMPO21, O.CAMPO22, O.CAMPO23, O.CAMPO24,
  O.CAMPO25, O.CAMPO26, O.CAMPO27, O.CAMPO28,
  O.CAMPO29, O.CAMPO30, O.CAMPO31, O.CAMPO32,
  O.CAMPO33, O.CAMPO34,
  O.CAMPO35, O.CAMPO36, O.CAMPO37, O.CAMPO38, O.CAMPO39, 
  O.CAMPO40, O.CAMPO41, O.CAMPO42, O.CAMPO43, O.CAMPO44,
  O.CAMPO45, O.CAMPO46, O.CAMPO47, O.CAMPO48, O.CAMPO49, 
  O.CAMPO50, O.CAMPO51, O.CAMPO52, O.CAMPO53, O.CAMPO54, 
  O.CAMPO55, O.CAMPO56, O.CAMPO57, O.CAMPO58, O.CAMPO59, 
  O.CAMPO60, O.CAMPO61, O.CAMPO62, O.CAMPO63, O.CAMPO64,
  CatP1.OPCION , CatP2.OPCION ,CatP3.OPCION ,
  CatO1.OPCION , CatO2.OPCION ,CatO3.OPCION ,
  CatE1.OPCION ,CatE2.OPCION ,CatE3.OPCION , P.Sexo,
  CatI.INDUSTRIA , CatG.COMPANIAGRUPO, p.tkp, P.TKPM, P.CANALIZADOEL, P.USRCANALIZO, P.USRCANALIZADO,M.IDMONEDA, O.DESCUENTO,M.TIPODECAMBIO, MON.MONEDA_SIMBOLO

 '+@OrderSql+'
 '
EXEC (@SQL)