//[bride_first_name|Text,bride_last_name|Text,bride_address|Text,bride_address|Text,phone|Text,cellphone|Text,email|Text,groom_first_name|Text,groom_last_name|Text,groom_phone|Text,groom_cellphone|Text,groom_email|Text,marriage_date|Text,posible_dates|Text,budget|Text,guests|Text,rooms|Text,comments|Text]
--UPDATE
DECLARE @IDEMPRESA int
DECLARE @TABLATEMP TABLE (ID INT IDENTITY, NOMBRE VARCHAR(256), APELLIDOS VARCHAR(256), CORREO VARCHAR(256), TELEFONO VARCHAR(256), EMPRESA VARCHAR(256), IDEMPRESA INT)
DECLARE @TO INT , @TOTAL INT, @IDPROSPECTO INT, @IDUSUARIO INT
DECLARE @IDETIQUETA INT,  @IDOPCION INT, @IDETIQUETA2 INT
INSERT INTO @TABLATEMP ( IDEMPRESA, EMPRESA)
SELECT top 50 IDEMPRESA, COMPANIA FROM platon.SALESUP_DB6.dbo.EMPRESAS WHERE ((REFERIDOPOR like '%2016%' /*and COMPANIA like '%sale%'*/) or IDempresa = 25242) order by idempresa 
SELECT @TOTAL = COUNT(*)  FROM @TABLATEMP

DECLARE @PERSONAS VARCHAR(255)
DECLARE @HABITACIONES VARCHAR(255)
DECLARE @FECHABODA VARCHAR(255)
DECLARE @NOMBRE_NOVIO VARCHAR(255)
DECLARE @APELLIDOS_NOVIO VARCHAR(255)
DECLARE @RESIDENCIA VARCHAR(255)
DECLARE @CELULAR_NOVIO VARCHAR(255)
DECLARE @TEL_NOVIO VARCHAR(255)
DECLARE @CORREO_NOVIO VARCHAR(255)
DECLARE @FECHA_OPCIONAL VARCHAR(255)

DECLARE @NOMBRE VARCHAR(255)
DECLARE @APELLIDOS VARCHAR(255)
DECLARE @CORREO VARCHAR(255)
DECLARE @TEL VARCHAR(255)
DECLARE @CEL VARCHAR(255)
DECLARE @PRESUPUESTO VARCHAR(255)
DECLARE @COMENTARIOS VARCHAR(255)
SET @TO = 1
    SELECT @NOMBRE= :bride_first_name,  @APELLIDOS= :bride_last_name, @CORREO = :email,
           @TEL= :phone,  @CEL= :cellphone, @COMENTARIOS= isnull( :comments , ''),
           @PERSONAS  = :guests, @HABITACIONES = :rooms,  @FECHABODA = :marriage_date,  
           @NOMBRE_NOVIO= :groom_first_name,  @APELLIDOS_NOVIO= :groom_last_name, @RESIDENCIA = :bride_address,
           @CELULAR_NOVIO = :groom_phone, @TEL_NOVIO = :groom_cellphone , @CORREO_NOVIO = :groom_email , 
           @FECHA_OPCIONAL = :posible_dates, @PRESUPUESTO =  :budget 

WHILE @TO <= @TOTAL
BEGIN
    SELECT @IDEMPRESA = NULL, @IDETIQUETA = NULL, @IDETIQUETA2 = NULL, @IDOPCION = NULL
    SELECT @IDEMPRESA = IDEMPRESA FROM @TABLATEMP WHERE ID = @TO
    SELECT @IDOPCION = IDOPCION FROM 
    PLATOn.SALESUP_db6.dbo.empresas_campos_opciones o, 
    PLATOn.SALESUP_db6.dbo.empresas_campos c 
    where c.idcampo = o.idcampo and idempresa = @IDEMPRESA and opcion = @PRESUPUESTO
    SELECT @IDETIQUETA = IDETIQUETA FROM PLATOn.SALESUP_db6.dbo.etiquetas where idempresa =@idempresa AND etiqueta like 'ExpoCásate2016'
    SELECT @IDETIQUETA2 = IDETIQUETA FROM PLATOn.SALESUP_db6.dbo.etiquetas where idempresa =@idempresa AND etiqueta like 'ExpoCásate2016 - Si Asistió'
    --SELECT @IDEMPRESA,@IDETIQUETA,@IDETIQUETA2, @IDOPCION
    EXEC platon.SALESUP_db6.dbo.SP_INSERTA_PROSPECTO_FCONTACTO @NOMBRE,@APELLIDOS,@CORREO,'','','',@TEL,@CEL,@COMENTARIOS,
       @IDEMPRESA,0,1,'MX','',@PERSONAS,@HABITACIONES,'','','','','','',@FECHABODA,'','','',@NOMBRE_NOVIO,@APELLIDOS_NOVIO,@RESIDENCIA,@CELULAR_NOVIO,
       @TEL_NOVIO,@CORREO_NOVIO,@FECHA_OPCIONAL,'',@IDOPCION,'','','','','','','',@IDETIQUETA,@IDETIQUETA2,0,'2'
    SET @TO = @TO + 1
END

SELECT @IDEMPRESA = NULL, @IDETIQUETA = NULL, @IDETIQUETA2 = NULL, @IDOPCION = NULL
    SELECT @IDEMPRESA = 27631
    SELECT @IDOPCION = IDOPCION FROM 
    aristoteles.SALESUP_db8.dbo.empresas_campos_opciones o, 
    aristoteles.SALESUP_db8.dbo.empresas_campos c 
    where c.idcampo = o.idcampo and idempresa = @IDEMPRESA and opcion = @PRESUPUESTO
    SELECT @IDETIQUETA = IDETIQUETA FROM aristoteles.SALESUP_db8.dbo.etiquetas where idempresa =@idempresa AND etiqueta like 'ExpoCásate2016'
    SELECT @IDETIQUETA2 = IDETIQUETA FROM aristoteles.SALESUP_db8.dbo.etiquetas where idempresa =@idempresa AND etiqueta like 'ExpoCásate2016 - Si Asistió'
  EXEC aristoteles.SALESUP_db8.dbo.SP_INSERTA_PROSPECTO_FCONTACTO @NOMBRE,@APELLIDOS,@CORREO,'','','',@TEL,@CEL,@COMENTARIOS,
       @IDEMPRESA,0,1,'MX','',@PERSONAS,@HABITACIONES,'','','','','','',@FECHABODA,'','','',@NOMBRE_NOVIO,@APELLIDOS_NOVIO,@RESIDENCIA,@CELULAR_NOVIO,
       @TEL_NOVIO,@CORREO_NOVIO,@FECHA_OPCIONAL,'',@IDOPCION,'','','','','','','',@IDETIQUETA,@IDETIQUETA2,0,'2'
    SET @TO = @TO + 1


SELECT @IDEMPRESA = NULL, @IDETIQUETA = NULL, @IDETIQUETA2 = NULL, @IDOPCION = NULL

    SELECT @IDEMPRESA = 44350
    SELECT @IDOPCION = IDOPCION FROM 
    platon.SALESUP_db4.dbo.empresas_campos_opciones o, 
    platon.SALESUP_db4.dbo.empresas_campos c 
    where c.idcampo = o.idcampo and idempresa = @IDEMPRESA and opcion = @PRESUPUESTO
    SELECT @IDETIQUETA = IDETIQUETA FROM platon.SALESUP_db4.dbo.etiquetas where idempresa =@idempresa AND etiqueta like 'ExpoCásate2016'
    SELECT @IDETIQUETA2 = IDETIQUETA FROM platon.SALESUP_db4.dbo.etiquetas where idempresa =@idempresa AND etiqueta like 'ExpoCásate2016 - Si Asistió'
  EXEC platon.SALESUP_db4.dbo.SP_INSERTA_PROSPECTO_FCONTACTO @NOMBRE,@APELLIDOS,@CORREO,'','','',@TEL,@CEL,@COMENTARIOS,
       @IDEMPRESA,0,1,'MX','',@PERSONAS,@HABITACIONES,'','','','','','',@FECHABODA,'','','',@NOMBRE_NOVIO,@APELLIDOS_NOVIO,@RESIDENCIA,@CELULAR_NOVIO,
       @TEL_NOVIO,@CORREO_NOVIO,@FECHA_OPCIONAL,'',@IDOPCION,'','','','','','','',@IDETIQUETA,@IDETIQUETA2,0,'2'


--select * from platon.salesup_db6.dbo.etiquetas where idempresa = 44206


