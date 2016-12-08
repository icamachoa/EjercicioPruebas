//[session.idempresa|Untyped,idventana|Integer,session.db|Untyped,]

DECLARE @VARIABLE VARCHAR(MAX), @VARIABLEI VARCHAR(MAX), @VARIABLEC VARCHAR(MAX), @SQL VARCHAR(MAX), @IDTAB VARCHAR(MAX)
DECLARE @IDEMPRESA INT, @IDVENTANA INT, @ID INT, @TOTAL INT
DECLARE @TB TABLE(ID INT IDENTITY, IDTAB INT)

SET @IDEMPRESA = <#SESSION.IDEMPRESA/>
SET @IDVENTANA = ISNULL(:IDVENTANA,0)

SET @VARIABLE=''
SET @VARIABLEC=''
SET @VARIABLEI=''

SELECT @VARIABLE=@VARIABLE+','+TIPO_CAMPO + ' VARCHAR(1000)', @VARIABLEI=@VARIABLEI+','+TIPO_CAMPO ,@VARIABLEC=@VARIABLEC+ ',(CASE WHEN TIPO_CAMPO='+CAST(IDTIPO_CAMPO AS VARCHAR(1000))+' THEN ''1'' ELSE '''' END)' 
FROM SALESUP_CT.DBO.TIPOS_CAMPOS 
INSERT INTO @TB (IDTAB)
SELECT IDTAB FROM <#SESSION.DB/>.dbo.EMPRESAS_TABS WHERE IDEMPRESA = @IDEMPRESA AND IDVENTANA = @IDVENTANA
SELECT @TOTAL = COUNT(*) FROM @TB
SET @ID = 1


SET @SQL = 'DECLARE @TABLA AS TABLE (Naturaleza INT,IdCampo INT, Campo VARCHAR(5000), IdTab INT , TambienIdTab INT, Descripcion VARCHAR(MAX), w VARCHAR(100), attr_name VARCHAR(1000), attr_id VARCHAR(1000), attr_maxLength INT, attr_placeholder VARCHAR(MAX), attr_data_Indice INT, attr_data_idc INT, attr_data_ligar int, ClasesAdicionales VARCHAR(1000), Orden INT, TipoCampo INT, TipoRestriccion INT, Restriccion VARCHAR(MAX), Opciones VARCHAR(MAX),Mostrar VARCHAR(MAX),TK VARCHAR(128), TKM VARCHAR(128), ESTIPO_MODULO INT '+@VARIABLE+'	)  '+ CHAR(10)+CHAR(13)

WHILE @ID <= @TOTAL
BEGIN
	SELECT @IDTAB = CAST(IDTAB AS VARCHAR(MAX)) FROM @TB WHERE ID = @ID
	SET @SQL = @SQL + ' INSERT INTO @TABLA ( Naturaleza, IdCampo, Campo, IdTab, TambienIdTab, Descripcion, w, attr_name, attr_id, attr_maxLength, attr_placeholder, attr_data_Indice, attr_data_idc, attr_data_ligar, ClasesAdicionales, Orden, TipoCampo,  TipoRestriccion, Restriccion,Opciones,Mostrar,TK,TKM, ESTIPO_MODULO'+@VARIABLEI+') EXEC <#SESSION.DB/>.DBO.SP_LISTAR_INFO_CAMPOS '+@IDTAB+', '+CAST(@IDEMPRESA AS VARCHAR(MAX))+' '+ CHAR(10)+CHAR(13)

	SET @ID = @ID + 1
END

SET @SQL = @SQL + ' SELECT * FROM @TABLA group by Naturaleza, IdCampo, Campo, IdTab, TambienIdTab, Descripcion, w, attr_name, attr_id, attr_maxLength, attr_placeholder, attr_data_Indice, attr_data_idc, attr_data_ligar, ClasesAdicionales, Orden, TipoCampo,  TipoRestriccion, Restriccion,Opciones,Mostrar,TK , TKM, ESTIPO_MODULO '+@VARIABLEI+' ORDER BY ORDEN'
EXEC (@SQL)


