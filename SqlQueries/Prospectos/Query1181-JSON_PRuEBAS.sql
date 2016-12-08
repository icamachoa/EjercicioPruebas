//[firstname|Text,lastname|Text,email|Text,companyname|Text,puesto|Text,areacode|Text,phone|Text,movil|Text,comentarios|Text,idempresa|Text,idusuario|Text,idorigen|Text,statename|Text,cityname|Text,idetiqueta|Text,idetiqueta1|Text,idetiqueta2|Text,la_bd|Text,]
--UPDATE
DECLARE @SQL VARCHAR(MAX)
DECLARE @BD VARCHAR(MAX)
DECLARE @P_NOMBRE VARCHAR(128) 
DECLARE @P_APELLIDOS VARCHAR(128)
DECLARE @P_CORREO VARCHAR(256)
DECLARE @P_EMPRESA VARCHAR(512)
DECLARE @P_PUESTO VARCHAR(128)
DECLARE @P_WEB VARCHAR(1024)
DECLARE @P_TELEFONO VARCHAR(128)
DECLARE @P_MOVIL VARCHAR(128)
DECLARE @P_COMENTARIOS varchar(8000)
DECLARE @P_IDEMPRESA VARCHAR(1024)
DECLARE @P_IDUSUARIO VARCHAR(1024)
DECLARE @P_IDORIGEN VARCHAR(1024)
DECLARE @P_PAIS VARCHAR(2)
DECLARE @P_ESTADO VARCHAR(32)
DECLARE @P_REFIERE VARCHAR(1024)
DECLARE @P_CIUDAD VARCHAR(128)
DECLARE @P_DIRECCION1 VARCHAR(512)
DECLARE @SP_VERSION VARCHAR(8)
DECLARE @P_IDETIQUETA1 VARCHAR(1024)
DECLARE @P_IDETIQUETA2 VARCHAR(1024)
DECLARE @P_IDETIQUETA3 VARCHAR(1024)
DECLARE @P_CAMPO1 VARCHAR(1024)
DECLARE @P_CAMPO2 VARCHAR(1024)
DECLARE @P_CAMPO3 VARCHAR(1024)
DECLARE @P_CAMPO4 VARCHAR(1024)
DECLARE @P_CAMPO5 VARCHAR(1024)
DECLARE @P_CAMPO6 VARCHAR(1024)
DECLARE @P_CAMPO7 VARCHAR(1024)
DECLARE @P_CAMPO8 VARCHAR(1024)
DECLARE @P_CAMPO9 VARCHAR(1024)
DECLARE @P_CAMPO10 VARCHAR(1024)
DECLARE @P_CAMPO11 VARCHAR(1024)
DECLARE @P_CAMPO12 VARCHAR(1024)
DECLARE @P_CAMPO13 VARCHAR(1024)
DECLARE @P_CAMPO14 VARCHAR(1024)
DECLARE @P_CAMPO15 VARCHAR(1024)
DECLARE @P_CAMPO16 VARCHAR(1024)
DECLARE @P_CAMPO17 VARCHAR(1024)
DECLARE @P_CAMPO18 VARCHAR(1024)
DECLARE @P_CAMPO19 VARCHAR(1024)
DECLARE @P_CAMPO20 VARCHAR(1024)
DECLARE @P_CAMPO21 VARCHAR(1024)
DECLARE @P_CAMPO22 VARCHAR(1024)
DECLARE @P_CAMPO23 VARCHAR(1024)
DECLARE @P_CAMPO24 VARCHAR(1024)
DECLARE @P_CAMPO25 VARCHAR(1024)

DECLARE @P_CAMPO26 VARCHAR(1024)
DECLARE @P_CAMPO27 VARCHAR(1024)
DECLARE @P_CAMPO28 VARCHAR(1024)
DECLARE @P_CAMPO29 VARCHAR(1024)
DECLARE @P_CAMPO30 VARCHAR(1024)
DECLARE @P_CAMPO31 VARCHAR(1024)
DECLARE @P_CAMPO32 VARCHAR(1024)

SET @BD=ISNULL(:LA_BD,'')
SET @P_NOMBRE =  SALESUP_CT.DBO.PREPARACADENA(ISNULL(:FIRSTNAME,''))
SET @SP_VERSION = '2'
SET @P_APELLIDOS  =  SALESUP_CT.DBO.PREPARACADENA(ISNULL(:LASTNAME,0))
SET @P_CORREO = ISNULL(:EMAIL,'')
SET @P_EMPRESA =SALESUP_CT.DBO.PREPARACADENA(ISNULL(:COMPANYNAME,''))
SET @P_PUESTO =SALESUP_CT.DBO.PREPARACADENA(ISNULL(:PUESTO,''))
SET @P_WEB =''
SET @P_TELEFONO = LTRIM(RTRIM(ISNULL(:areacode, '')+''+ISNULL(:phone, '')))
SET @P_MOVIL = ISNULL(:MOVIL,'')
SET @P_COMENTARIOS = SALESUP_CT.DBO.PREPARACADENA(ISNULL(:COMENTARIOS,''))
SET @P_idempresa = ISNULL(:IDEMPRESA,0)
SET @P_IDUSUARIO = ISNULL(:IDUSUARIO,0)
SET @P_IDORIGEN  = ISNULL(:IDORIGEN ,0)
SET @P_PAIS ='MX'
SET @P_ESTADO =ISNULL(:statename,'')

select TOp 1 @P_ESTADO =  IDESTADO_SP from salesup_ct.dbo.V_ESTADOS_CONTPAQI WHERE IDESTADO_C = @P_ESTADO
 
SET @P_REFIERE = ''
SET @P_CIUDAD = ISNULL(:CITYname,'')
insert into salesup_ct.dbo.log  (IDU,texto, texto2) values(666,ISNULL(:statename,''), @P_CORREO + ' '+@P_CIUDAD+' '+ @P_ESTADO)


SET @P_DIRECCION1 =SALESUP_CT.DBO.PREPARACADENA('')
SET @P_idetiqueta1=ISNULL(:IDETIQUETA,'0')
SET @P_idetiqueta2=ISNULL(:IDETIQUETA1,'0')
SET @P_idetiqueta3=ISNULL(:IDETIQUETA2,'0')



SET @P_CAMPO1 =''
SET @P_CAMPO2 =''
SET @P_CAMPO3 = ''
SET @P_CAMPO4 = ''
SET @P_CAMPO5 = ''
SET @P_CAMPO6 = ''
SET @P_CAMPO7 = ''
SET @P_CAMPO8 = ''
SET @P_CAMPO9 =''
SET @P_CAMPO10 =''
SET @P_CAMPO11 = ''
SET @P_CAMPO12 = ''
SET @P_CAMPO21 = ''
SET @P_CAMPO22 = ''
SET @P_CAMPO23 = ''
SET @P_CAMPO24 = ''
SET @P_CAMPO25 = ''



SET @P_CAMPO13 =''
SET @P_CAMPO14 =''
SET @P_CAMPO15 = ''
SET @P_CAMPO16 = ''
SET @P_CAMPO17 = ''
SET @P_CAMPO18 = ''
SET @P_CAMPO19 = ''
SET @P_CAMPO20 = ''


SET @P_CAMPO26 = ''
SET @P_CAMPO27 = ''
SET @P_CAMPO28 = ''
SET @P_CAMPO29 = ''
SET @P_CAMPO30 = ''
SET @P_CAMPO31 = ''
SET @P_CAMPO32 = ''


IF (@P_idempresa !=0)
BEGIN
SET @SQL='
EXEC '+@BD+'.dbo.SP_INSERTA_PROSPECTO_FCONTACTO_NUEVO '''+@P_NOMBRE +''',
'''+@P_APELLIDOS+''' ,
'''+@P_CORREO+''' ,
'''+@P_EMPRESA+''' ,
'''+@P_PUESTO+''' ,
'''+@P_WEB+''' ,
'''+@P_TELEFONO+''' ,
'''+@P_MOVIL+''' ,
'''+@P_COMENTARIOS+''' ,
'''+@P_IDEMPRESA+''' ,
'''+@P_IDUSUARIO+''' ,
'''+@P_IDORIGEN+''' ,
'''+@P_PAIS+''' ,
'''+@P_ESTADO+''' ,
'''+@P_CAMPO1+''',
'''+@P_CAMPO2+''' ,
'''+@P_CAMPO3+''' ,
'''+@P_CAMPO4+''' ,
'''+@P_CAMPO5+''' ,
'''+@P_CAMPO6+''' ,
'''+@P_CAMPO7+''' ,
'''+@P_CAMPO8+''' ,
'''+@P_CAMPO9+''' ,
'''+@P_CAMPO10+''' ,
'''+@P_CAMPO11+''' ,
'''+@P_CAMPO12+''' ,
'''+@P_CAMPO13+''' ,
'''+@P_CAMPO14+''' ,
'''+@P_CAMPO15+''',
'''+@P_CAMPO16+''',
'''+@P_CAMPO17+''' ,
'''+@P_CAMPO18+''' ,
'''+@P_CAMPO19+''' ,
'''+@P_CAMPO20+''' ,
'''+@P_CAMPO21+''' ,
'''+@P_CAMPO22+''' ,
'''+@P_CAMPO23+''' ,
'''+@P_CAMPO24+''' ,
'''+@P_CAMPO25+''' ,
'''+@P_CAMPO26+''' ,
'''+@P_CAMPO27+''' ,
'''+@P_CAMPO28+''' ,
'''+@P_CAMPO29+''' ,
'''+@P_CAMPO30+''' ,
'''+@P_CAMPO31+''' ,
'''+@P_CAMPO32+''' ,
'''+@P_REFIERE+''' ,
'''+@P_CIUDAD+''' ,
'''+@P_DIRECCION1+''' ,
'''+@P_IDETIQUETA1+''',
'''+@P_IDETIQUETA2+''',
'''+@P_IDETIQUETA3+''',
'''+@SP_VERSION+'''
'

EXEC (@SQL)

END