//[session.idempresa|Untyped,tkcom|Text,empresa|Text,industria|Text,grupoempresarial|Text,telefonocorporativo|Text,paginaweb|Text,nempleados|Text,pais|Text,estado|Text,ciudad|Text,codigopostal|Text,calle|Text,colonia|Text,com_catalogoopcion1|Text,com_catalogoopcion2|Text,com_catalogoopcion3|Text,numinterior|Text,numexterior|Text,campo1c|Text,campo2c|Text,campo3c|Text,campo4c|Text,campo5c|Text,campo6c|Text,campo7c|Text,campo8c|Text,campo9c|Text,campo10c|Text,session.db|Untyped,empmunicipio|Text,]
--UPDATE
/*PROTEGIDO*/
DECLARE @IDUSUARIO INT, @IDEMPRESA INT, @IDPROSPECTO INT, @IDCOMPANIA INT, @IDGRUPOEMPRESARIAL INT, @IDINDUSTRIA INT, @IDFASE INT, @IDORIGEN INT, @IDTITULO INT, @AGREGARVER INT, @ESCLIENTE INT, @CONVERTCODE INT
DECLARE @NOMBRE VARCHAR(MAX), @APELLIDOS VARCHAR(MAX), @EMPRESA VARCHAR(MAX), @ETIQUETAS VARCHAR(MAX), @SEXO VARCHAR(MAX)
DECLARE @CORREO VARCHAR(MAX), @TELEFONO VARCHAR(MAX), @TELEFONO2 VARCHAR(MAX), @MOVIL VARCHAR(MAX), @PUESTO VARCHAR(MAX)
DECLARE @COMENTARIOS VARCHAR(MAX), @TELEFONOCORPORATIVO VARCHAR(MAX), @PAGINAWEB VARCHAR(MAX), @NEMPLEADOS VARCHAR(MAX), @PAIS VARCHAR(MAX)
DECLARE @ESTADO VARCHAR(MAX), @CIUDAD VARCHAR(MAX), @CP VARCHAR(MAX), @CALLE VARCHAR(MAX), @COLONIA VARCHAR(MAX), @TKCOM VARCHAR(64)
DECLARE @CAT1 INT, @CAT2 INT, @CAT3 INT


DECLARE @NumInterior VARCHAR(MAX), @NumExterior VARCHAR(MAX), @IDMUNICIPIOEMP VARCHAR(MAX)
DECLARE @CCAMPO1 VARCHAR(MAX), @CCAMPO2 VARCHAR(MAX), @CCAMPO3 VARCHAR(MAX), @CCAMPO4 VARCHAR(MAX), @CCAMPO5 VARCHAR(MAX)
DECLARE @CCAMPO6 VARCHAR(MAX), @CCAMPO7 VARCHAR(MAX), @CCAMPO8 VARCHAR(MAX), @CCAMPO9 VARCHAR(MAX), @CCAMPO10 VARCHAR(MAX)


SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT)
SET @TKCOM = ISNULL(:TKCOM,'')
SET @EMPRESA = :Empresa
SET @IDINDUSTRIA = ISNULL(:INDUSTRIA,'')
SET @IDGRUPOEMPRESARIAL = ISNULL(:GrupoEmpresarial,'')
SET @TELEFONOCORPORATIVO = ISNULL(:TelefonoCorporativo,'')
SET @PAGINAWEB = ISNULL(:PaginaWeb,'')
SET @NEMPLEADOS = ISNULL(:nEmpleados,'')
SET @PAIS = ISNULL(:Pais,'')
SET @ESTADO = ISNULL(:Estado,'')
SET @CIUDAD = ISNULL(:Ciudad,'')
SET @CP = ISNULL(:CodigoPostal,'')
SET @CALLE = ISNULL(:Calle,'')
SET @COLONIA = ISNULL(:Colonia,'')
SET @CAT1 = CAST( :Com_CatalogoOpcion1 AS INT)
SET @CAT2 = CAST( :Com_CatalogoOpcion2 AS INT)
SET @CAT3 = CAST( :Com_CatalogoOpcion3 AS INT)

SET @NumInterior = ISNULL(:NumInterior, '')
SET @NumExterior = ISNULL(:NumExterior, '')
SET @IDMUNICIPIOEMP = ISNULL(:EmpMunicipio, '')
SET @CCAMPO1 = ISNULL(:Campo1C, '')
SET @CCAMPO2 = ISNULL(:Campo2C, '')
SET @CCAMPO3 = ISNULL(:Campo3C, '')
SET @CCAMPO4 = ISNULL(:Campo4C, '')
SET @CCAMPO5 = ISNULL(:Campo5C, '')
SET @CCAMPO6 = ISNULL(:Campo6C, '')
SET @CCAMPO7 = ISNULL(:Campo7C, '')
SET @CCAMPO8 = ISNULL(:Campo8C, '')
SET @CCAMPO9 = ISNULL(:Campo9C, '')
SET @CCAMPO10 = ISNULL(:Campo10C, '')

IF @CAT1 = 0 BEGIN SET @CAT1 = NULL END
IF @CAT2 = 0 BEGIN SET @CAT2 = NULL END
IF @CAT3 = 0 BEGIN SET @CAT3 = NULL END

SELECT @IDCOMPANIA = IDCOMPANIA FROM <#SESSION.DB/>.dbo.COMPANIAS WHERE TKCOM = @TKCOM

	UPDATE <#SESSION.DB/>.dbo.COMPANIAS WITH(ROWLOCK)
	SET
	EMPRESA = @EMPRESA,
	IDINDUSTRIA = @IDINDUSTRIA,
	URL = @PAGINAWEB,
	TELEFONOCORPORATIVO = @TELEFONOCORPORATIVO,
	DIRECCION1 = @CALLE,
	DIRECCION2 = @COLONIA,
	CIUDAD = @CIUDAD,
	CODIGOPOSTAL = @CP,
	IDESTADO = @ESTADO,
	IDPAIS = @PAIS,
	NEMPLEADOS = @NEMPLEADOS,
	IDCOMPANIAGRUPO = @IDGRUPOEMPRESARIAL,
	IDCATALOGOOPCION1 = @CAT1,
	IDCATALOGOOPCION2 = @CAT2,
	IDCATALOGOOPCION3 = @CAT3,
	NUMERO_INTERIOR = @NumInterior,
		 NUMERO_EXTERIOR = @NumExterior,
		 IDMUNICIPIO = @IDMUNICIPIOEMP,
		 CCAMPO1 = @CCAMPO1,
		 CCAMPO2 = @CCAMPO2,
		 CCAMPO3 = @CCAMPO3,
		 CCAMPO4 = @CCAMPO4,
		 CCAMPO5 = @CCAMPO5,
		 CCAMPO6 = @CCAMPO6,
		 CCAMPO7 = @CCAMPO7,
		 CCAMPO8 = @CCAMPO8,
		 CCAMPO9 = @CCAMPO9,
		 CCAMPO10 = @CCAMPO10
	WHERE IDEMPRESA = @IDEMPRESA AND IDCOMPANIA = @IDCOMPANIA
	
	/*Actualiza la info de los prospectos relacionados*/
	UPDATE <#SESSION.DB/>.dbo.PROSPECTOS WITH(ROWLOCK)
	SET
	IDINDUSTRIA = @IDINDUSTRIA,
	EMPRESA = @EMPRESA, 
	TELEFONOCORPORATIVO = @TELEFONOCORPORATIVO, 
	NOEMPLEADOS = @NEMPLEADOS,
	URL = @PAGINAWEB, 
	IDPAIS = @PAIS, 
	IDESTADO = @ESTADO,
	DIRECCION1 = @CALLE, 
	DIRECCION2 = @COLONIA, 
	CIUDAD = @CIUDAD,
	CODIGOPOSTAL = @CP, 
	IDCOMPANIAGRUPO = @IDGRUPOEMPRESARIAL, 
	ULTIMAMODIFICACION = GETDATE()
	WHERE IDEMPRESA = @IDEMPRESA AND IDCOMPANIA = @IDCOMPANIA
	
DELETE FROM <#SESSION.DB/>.DBO.MODIFICACIONES WHERE IDEMPRESA = @IDEMPRESA AND IDTABLA = 4
INSERT INTO <#SESSION.DB/>.DBO.MODIFICACIONES (IDEMPRESA, IDTABLA,FECHAHORA) VALUES(@IDEMPRESA, 4, GETDATE()) 