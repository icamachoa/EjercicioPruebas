//[session.idempresa|Untyped,session.idusuario|Untyped,buscar|Text,session.db|Untyped,]

--SELECT
DECLARE @IDEMPRESA INT
DECLARE @Q VARCHAR(MAX), @LINKAMAZON VARCHAR(MAX),  @CARPETA VARCHAR(MAX)
DECLARE @json VARCHAR(max)
DECLARE @TipoComision INT
DECLARE @IDUSUARIO INT


SET @IDEMPRESA = <#SESSION.IDEMPRESA/>
SET @IDUSUARIO = <#SESSION.IDUSUARIO/>
SET @Q = ISNULL(:Buscar,'')
SET @Q = LTRIM(RTRIM(@Q))
SET @Q = '%'+@Q+'%'
SET @CARPETA = <#SESSION.DB/>.DBO.PREPARANUMERO(@IDEMPRESA, 6)
SET @LINKAMAZON='https://s3-us-west-2.amazonaws.com/salesupfiles/'+@CARPETA+'/'
SET @json =''

DECLARE @EXISTEN_IMPUESTO INT

SELECT @EXISTEN_IMPUESTO = COUNT(*) FROM <#SESSION.DB/>.dbo.EMPRESAS_IMPUESTOS WHERE STATUS =1 AND IDEMPRESA =@IDEMPRESA and indice is not null 

IF(@EXISTEN_IMPUESTO = 0 )
 BEGIN
  SET @json ='{"nombre":"demo","indice":"0"},'
 END
ELSE
 BEGIN
 SELECT @json=@json +'{"nombre":"'+IMPUESTO+'","indice":'+CAST(INDICE AS VARCHAR(128))+'},' FROM <#SESSION.DB/>.dbo.EMPRESAS_IMPUESTOS WHERE STATUS =1 AND IDEMPRESA =@IDEMPRESA and indice is not null 
 END


   
   
   


SELECT @TipoComision = CASE WHEN COMISION IS NULL  OR COMISION=0 THEN 0 ELSE COMISION END  FROM <#SESSION.DB/>.dbo.USUARIOS WHERE IDUSUARIO=@IDUSUARIO

if(@TipoComision != 0)
begin
	 SELECT @TipoComision = indice from <#SESSION.DB/>.dbo.productos_comisiones where idproducto_comision = @TipoComision
end

SELECT
P.idProducto, P.TK AS tkProducto, P.TKM AS tkmProducto, P.Codigo, P.Nombre as Producto, M.Marca, ELP.LINEA_PRODUCTO as Linea, ELP.IDLINEA_PRODUCTO as IdLinea,
P.PRECIO_MIN AS precioMin, P.Costo, P.Unidad, P.Existencia, P.Status,
P.Precio1, P.Precio2, P.Precio3, P.Precio4, P.Precio5, P.Precio6, P.Precio7, P.Precio8, P.Precio9, P.Precio10,
IMAGENES,
Descripcion_Corta as desCorta, DESCRIPCION_EXTENDIDA1 AS Descripcion1, DESCRIPCION_EXTENDIDA2 AS Descripcion2, @LINKAMAZON as link, 
impuesto1, impuesto2, impuesto3, impuesto4, impuesto5, impuesto6, impuesto7, impuesto8, impuesto9, impuesto10, @json as ImpEmpresa, 
CASE 
WHEN @TipoComision = 0 THEN 0
WHEN @TipoComision = 1 THEN COMISION1
WHEN @TipoComision = 2 THEN COMISION2
WHEN @TipoComision = 3 THEN COMISION3
WHEN @TipoComision = 4 THEN COMISION4
WHEN @TipoComision = 5 THEN COMISION5
WHEN @TipoComision = 6 THEN COMISION6
WHEN @TipoComision = 7 THEN COMISION7
WHEN @TipoComision = 8 THEN COMISION8
WHEN @TipoComision = 9 THEN COMISION9
WHEN @TipoComision = 10 THEN COMISION10
END AS Comision, @TipoComision as INDICECOMISION, 0 AS CANTIDAD_DESC,0 AS PORCENTAJE_DESC, '' AS COMENTARIO 
FROM <#SESSION.DB/>.dbo.PRODUCTOS P
LEFT JOIN <#SESSION.DB/>.dbo.MARCAS M ON M.IDMARCA = P.IDMARCA
LEFT JOIN <#SESSION.DB/>.dbo.EMPRESAS_LINEAS_PRODUCTO ELP ON ELP.IDLINEA_PRODUCTO = P.IDLINEA_PRODUCTO
WHERE P.IDEMPRESA = @IDEMPRESA AND ((
	P.CODIGO COLLATE Latin1_general_CI_AI LIKE @Q 
	OR NOMBRE COLLATE Latin1_general_CI_AI LIKE @Q 
	OR M.MARCA COLLATE Latin1_general_CI_AI LIKE @Q 
	OR ELP.LINEA_PRODUCTO COLLATE Latin1_general_CI_AI LIKE @Q)
	AND P.STATUS=1
)