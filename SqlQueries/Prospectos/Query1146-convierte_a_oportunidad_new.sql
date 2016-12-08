//[session.db|Untyped,idpeticion|Untyped,idprospecto|Untyped,session.idusuario|Untyped,idlinea|Untyped,idfase|Untyped,o|Untyped,session.convertcode|Untyped,session.idempresa|Untyped,pesokb|Untyped,session.nombre|Untyped,session.apellidos|Untyped,session.iniciales|Untyped,concepto|Text,monto|Untyped,certeza|Untyped,cierreestimado|Untyped,comision|Untyped,comision_monto|Untyped,amazon|Untyped,cotizacion|Untyped,seguimiento|Text,campo1|Untyped,campo2|Untyped,campo3|Untyped,campo4|Untyped,campo5|Untyped,campo6|Untyped,campo7|Untyped,campo8|Untyped,campo9|Untyped,campo10|Untyped,campo11|Untyped,campo12|Untyped,campo13|Untyped,campo14|Untyped,campo15|Untyped,campo16|Untyped,campo17|Untyped,campo18|Untyped,campo19|Untyped,campo20|Untyped,campo21|Untyped,campo22|Untyped,campo23|Untyped,campo24|Untyped,campo25|Untyped,campo26|Untyped,campo27|Untyped,campo28|Untyped,campo29|Untyped,campo30|Untyped,campo31|Untyped,campo32|Untyped,campo35|Untyped,campo36|Untyped,campo37|Untyped,campo38|Untyped,campo39|Untyped,campo40|Untyped,campo41|Untyped,campo42|Untyped,campo43|Untyped,campo44|Untyped,campo45|Untyped,campo46|Untyped,campo47|Untyped,campo48|Untyped,campo49|Untyped,campo50|Untyped,campo51|Untyped,campo52|Untyped,campo53|Untyped,campo54|Untyped,campo55|Untyped,campo56|Untyped,campo57|Untyped,campo58|Untyped,campo59|Untyped,campo60|Untyped,campo61|Untyped,campo62|Untyped,campo63|Untyped,campo64|Untyped,]
--SELECT

IF( (SELECT COUNT(*) FROM <#SESSION.DB/>.dbo.OPORTUNIDADES WHERE IDPETICION !='' AND IDPETICION = '<#IDPETICION/>') = 0)
BEGIN
  DECLARE @IDOPORTUNIDAD INT, @CONVERTCODE INT, @IDEMPRESA INT, @IDPROSPECTO INT, @TOTAL INT
  DECLARE @IDLINEA INT, @IDUSUARIO INT, @IDFASE INT
  DECLARE @HD_USADO FLOAT, @PESOKB FLOAT
  DECLARE @TKO VARCHAR(MAX)
  
  DECLARE @CAMBIOLOCAL INT
  DECLARE @NOMBRE_QUIEN_CANALIZA VARCHAR(MAX), @ESCANALIZADO VARCHAR(2)
  DECLARE @FECHACANALIZADO DATETIME
  
  SET @TKO = ''
  SET @IDPROSPECTO = CAST('<#IDPROSPECTO/>' AS INT)
  SET @IDUSUARIO = CAST('<#SESSION.IDUSUARIO/>' AS INT)
  SET @IDLINEA = CAST('<#idlinea/>' AS INT)
  SET @IDFASE = CAST('<#idfase/>' AS INT)
  
  DECLARE @O_CatalogoOpcion1 INT, @O_CatalogoOpcion2 INT, @O_CatalogoOpcion3 INT
  
  SET @O_CatalogoOpcion1 = CAST('<#O-CatalogoOpcion1/>' AS INT)  
  SET @O_CatalogoOpcion2 = CAST('<#O-CatalogoOpcion2/>' AS INT) 
  SET @O_CatalogoOpcion3 = CAST('<#O-CatalogoOpcion3/>' AS INT)

  IF @O_CatalogoOpcion1 = 0 BEGIN SET @O_CatalogoOpcion1 = NULL END
  IF @O_CatalogoOpcion2 = 0 BEGIN SET @O_CatalogoOpcion2 = NULL END
  IF @O_CatalogoOpcion3 = 0 BEGIN SET @O_CatalogoOpcion3 = NULL END

  SET @CONVERTCODE = <#SESSION.CONVERTCODE/>
  SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)
  SET @HD_USADO=0
  SET @PESOKB=CAST('<#pesokb/>' AS FLOAT)
  
  
  
  SELECT @ESCANALIZADO = SALESUP_CT.dbo.esCanalizado(P.TKP, P.TKPM) FROM <#SESSION.DB/>.dbo.PROSPECTOS P WHERE P.IDPROSPECTO = @IDPROSPECTO AND P.IDEMPRESA = @IDEMPRESA
  IF @ESCANALIZADO = '1' OR @ESCANALIZADO = '2' BEGIN SET @NOMBRE_QUIEN_CANALIZA = '<#SESSION.NOMBRE/> <#SESSION.APELLIDOS/> (<#SESSION.INICIALES/>)' SET @FECHACANALIZADO = GETDATE() SET @CAMBIOLOCAL = 1 END
  
  
  INSERT INTO <#SESSION.DB/>.dbo.OPORTUNIDADES
  (
   IDPROSPECTO, IDUSUARIO, CONCEPTO, MONTO,SUBTOTAL, CERTEZA, FECHA_CIERRE, IDFASE, COMISION,
   COMISION_MONTO, IDLINEA_PRODUCTO, AMAZON, IDPETICION,
   IDCATALOGOOPCION1, IDCATALOGOOPCION2, IDCATALOGOOPCION3, CAMBIOLOCAL, USRCANALIZO, CANALIZADOEL
  )
  VALUES 
  (
   @IDPROSPECTO,@IDUSUARIO, :concepto, cast (REPLACE('<#monto/>', ' ' , '') as money), cast (REPLACE('<#monto/>', ' ' , '') as money),<#certeza/>, CONVERT(DATETIME,'<#cierreestimado/>',@CONVERTCODE), @IDFASE, cast ('<#comision/>' as float)/100,
   cast ('<#comision_monto/>' as money),@IDLINEA,CAST('<#AMAZON>' AS INT), '<#IDPETICION/>',
   @O_CatalogoOpcion1, @O_CatalogoOpcion2, @O_CatalogoOpcion3, @CAMBIOLOCAL, @NOMBRE_QUIEN_CANALIZA, @FECHACANALIZADO
  )

  SELECT TOP 1 @TKO = TKO, @IDOPORTUNIDAD = IDOPORTUNIDAD, @IDPROSPECTO = IDPROSPECTO FROM <#SESSION.DB/>.dbo.OPORTUNIDADES WHERE IDPROSPECTO = @IDPROSPECTO ORDER BY IDOPORTUNIDAD DESC

  IF (LTRIM(RTRIM('<#cotizacion/>'))!='')
   BEGIN
    INSERT INTO <#SESSION.DB/>.dbo.EMPRESAS_ARCHIVOS_AMAZON (IDEMPRESA,IDUSUARIO,ARCHIVO,PESO,TIPO) VALUES (@IDEMPRESA,@IDUSUARIO,'<#cotizacion/>',@PESOKB,'PO')
    INSERT INTO <#SESSION.DB/>.dbo.PROSPECTOS_ARCHIVOS (IDPROSPECTO,IDOPORTUNIDAD,IDUSUARIO,ARCHIVO,DESCRIPCION,AMAZON,PESO) VALUES (@IDPROSPECTO,@IDOPORTUNIDAD,@IDUSUARIO,'<#cotizacion/>',:concepto,1,@PESOKB)
    /*UPDATE <#SESSION.DB/>.dbo.EMPRESAS SET HD_USADO=HD_USADO+@PESOKB WHERE IDEMPRESA=@IDEMPRESA*/
   END 


  UPDATE <#SESSION.DB/>.dbo.PROSPECTOS SET ESOPORTUNIDAD = 1, ULTIMAMODIFICACION = GETDATE() WHERE IDPROSPECTO = @IDPROSPECTO
  UPDATE <#SESSION.DB/>.dbo.PROSPECTOS_ASIGNADOS SET ARCHIVADO = 0 WHERE IDPROSPECTO = @IDPROSPECTO AND IDUSUARIO = @IDUSUARIO

  -- Para la comision por linea de vendedor
  IF ((SELECT COUNT(*) FROM <#SESSION.DB/>.dbo.USUARIOS_LINEAS_COMISION WHERE IDLINEA = @IDLINEA AND IDUSUARIO = @IDUSUARIO) = 1)
  BEGIN
    UPDATE <#SESSION.DB/>.dbo.USUARIOS_LINEAS_COMISION SET COMISION = cast ('<#comision/>' as float)/100 WHERE IDLINEA = @IDLINEA AND IDUSUARIO = @IDUSUARIO
  END
  ELSE
  BEGIN
    INSERT INTO <#SESSION.DB/>.dbo.USUARIOS_LINEAS_COMISION (COMISION, IDLINEA, IDUSUARIO) VALUES (cast('<#comision/>' as float)/100, @IDLINEA, @IDUSUARIO)
  END

  INSERT INTO <#SESSION.DB/>.dbo.PROSPECTOS_SEGUIMIENTO (IDPROSPECTO, IDUSUARIO, IDOPORTUNIDAD, COMENTARIO, SISTEMA)
  VALUES 
    (@IDPROSPECTO, @IDUSUARIO, @IDOPORTUNIDAD, 'Convertido en oportunidad con el '+CAST (cast ((<#certeza/>*100) as int) as varchar) + '% de certeza.',1)

  IF NOT  ( LTRIM (:seguimiento) IS NULL )
    INSERT INTO <#SESSION.DB/>.dbo.PROSPECTOS_SEGUIMIENTO
    (IDPROSPECTO, IDUSUARIO, IDOPORTUNIDAD, COMENTARIO)
    VALUES 
    (@IDPROSPECTO, @IDUSUARIO, @IDOPORTUNIDAD, :seguimiento)
    

  /*SE ACTUALIZAR LOS PERSONALIZABLES*/
  EXEC <#SESSION.DB/>.DBO.SP_ACTUALIZA_CAMPOS_PERSONALIZABLES 2, @IDOPORTUNIDAD, @IDEMPRESA, @CONVERTCODE,
  '<#CAMPO1/>' , '<#CAMPO2/>' , '<#CAMPO3/>' , '<#CAMPO4/>', 
  '<#CAMPO5/>' , '<#CAMPO6/>' , '<#CAMPO7/>' , '<#CAMPO8/>', 
  '<#CAMPO9/>' , '<#CAMPO10/>', '<#CAMPO11/>', '<#CAMPO12/>', 
  '<#CAMPO13/>', '<#CAMPO14/>', '<#CAMPO15/>', '<#CAMPO16/>', 
  '<#CAMPO17/>', '<#CAMPO18/>', '<#CAMPO19/>', '<#CAMPO20/>', 
  '<#CAMPO21/>', '<#CAMPO22/>', '<#CAMPO23/>', '<#CAMPO24/>', '<#CAMPO25/>', 
  '<#CAMPO26/>', '<#CAMPO27/>', '<#CAMPO28/>', '<#CAMPO29/>', 
  '<#CAMPO30/>', '<#CAMPO31/>', '<#CAMPO32/>',
  '<#CAMPO35/>', '<#CAMPO36/>',
	 '<#CAMPO37/>', '<#CAMPO38/>', '<#CAMPO39/>', '<#CAMPO40/>',
	 '<#CAMPO41/>', '<#CAMPO42/>', '<#CAMPO43/>', '<#CAMPO44/>',
	 '<#CAMPO45/>', '<#CAMPO46/>', '<#CAMPO47/>', '<#CAMPO48/>',
	 '<#CAMPO49/>', '<#CAMPO50/>', '<#CAMPO51/>', '<#CAMPO52/>',
	 '<#CAMPO53/>', '<#CAMPO54/>', '<#CAMPO55/>', '<#CAMPO56/>',
	 '<#CAMPO57/>', '<#CAMPO58/>', '<#CAMPO59/>', '<#CAMPO60/>',
	 '<#CAMPO61/>', '<#CAMPO62/>', '<#CAMPO63/>', '<#CAMPO64/>'

  /* Agrega campos auto y uuid  P-(1), O-(2), C-(3), V-(4) */
  EXEC <#SESSION.DB/>.dbo.SP_ACTUALIZA_AUTO_UUID @IDOPORTUNIDAD, 2, @IDEMPRESA 

  /*Genera cotizacion*/
  EXEC <#SESSION.DB/>.dbo.SP_GENERA_COTIZACION @IDEMPRESA, @IDOPORTUNIDAD
  
  DELETE FROM <#SESSION.DB/>.DBO.MODIFICACIONES WHERE IDEMPRESA = @IDEMPRESA AND IDTABLA = 4
  INSERT INTO <#SESSION.DB/>.DBO.MODIFICACIONES (IDEMPRESA, IDTABLA,FECHAHORA) VALUES(@IDEMPRESA,4,GETDATE()) 

  EXEC <#SESSION.DB/>.dbo.SP_INGRESA_SUCESOS_PROSPECTOS @IDUSUARIO,1,@IDPROSPECTO,@IDEMPRESA,'', ''

  -- se activan las acciones de las fases
  EXEC <#SESSION.DB/>.DBO.SP_EJECUTA_ACCION @IDFASE,@IDPROSPECTO,@IDOPORTUNIDAD  
   
  --EXEC <#SESSION.DB/>.DBO.SP_ACTUALIZA_METAS 1,@IDUSUARIO  
  EXEC <#SESSION.DB/>.DBO.SP_ACTUALIZA_METAS 2, @IDUSUARIO
  
  SELECT @IDOPORTUNIDAD AS IdOportunidad, @TKO AS TKO
END
ELSE
  SELECT 0  AS IdOportunidad, '' AS TKO
  