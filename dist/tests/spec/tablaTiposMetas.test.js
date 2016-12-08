
var testing = (window.opener != null) ? window.opener.test : null, arrTest = [], respTest;

describe('Test tabla ct TIPOS_METAS',function(){
	
	afterAll(function(){
		if (testing) {
			testing.guardaRespuesta(arrTest,1,window);
		}  
	});
	
	var jsonEsperado = {};
	var jsonRecibido = {};

	/*SalesUp.Variables.test = */
	respTest = it('Metas de cotizacion',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=30',DataType:'json'}).jData;
		jsonEsperado = {"NOMBRE_COMPONENTE":"Cotizaciones","FORMATO":2,"CLASIFICACION":2,"ORIGENFROM":"PROSPECTOS_ARCHIVOS PA WITH(NOLOCK), USUARIOS U WITH(NOLOCK),PROSPECTOS_SEGUIMIENTO PS WITH(NOLOCK), PROSPECTOS P WITH(NOLOCK)","ORIGENWHERE":"P.IDUSUARIO =U.IDUSUARIO AND PS.IDSEGUIMIENTO = P.IDULTIMOSEGUIMIENTO AND P.IDPROSPECTO = PA.idprospecto AND PA.IDDOCUMENTO IS NOT NULL AND PA.ETIQUETAS IS NOT NULL [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA]","OPERADOR":"COUNT(*)","CALIFICADOR":"P","CAMPOFECHA":"PA.FECHA","CATEGORIASVISIBLES":"1,0","DETALLE":"conteo_prospectos.dbsp","MODULO":1};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);

	respTest = it('Monto de ventas nuevas',function(){

		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=1',DataType:'json'}).jData;

		jsonEsperado = {"NOMBRE_COMPONENTE":"Monto de ventas nuevas","FORMATO":1,"CLASIFICACION":1,"ORIGENFROM":"VENTAS V WITH(NOLOCK) OUTER APPLY ( SELECT PROD.IDPRODUCTO,VP.IDVENTA_PRODUCTO, ELP1.IDLINEA_PRODUCTO, ELP1.LINEA_PRODUCTO,ELP1.TK, VP.TOTAL FROM VENTAS_PRODUCTOS VP , PRODUCTOS  PROD, EMPRESAS_LINEAS_PRODUCTO ELP1 WHERE  V.IDVENTA=VP.IDVENTA AND PROD.IDPRODUCTO=VP.IDPRODUCTO  AND ELP1.IDLINEA_PRODUCTO=PROD.IDLINEA_PRODUCTO) PRO, USUARIOS U WITH(NOLOCK),OPORTUNIDADES O WITH(NOLOCK), PROSPECTOS P WITH(NOLOCK)","ORIGENWHERE":"V.IDUSUARIO = U.IDUSUARIO AND V.IDOPORTUNIDAD = O.IDOPORTUNIDAD AND O.IDPROSPECTO = P.IDPROSPECTO AND U.IDEMPRESA =[IDEMPRESA] AND V.NUEVA = 1  [CRITERIOFECHA] [CRITERIOTIPOMETA] [CRITERIOS]","OPERADOR":" ISNULL(SUM (COALESCE(PRO.TOTAL,V.MONTO,0)),0)","CALIFICADOR":"V","CAMPOFECHA":"V.FECHAHORA","CATEGORIASVISIBLES":"1,2,0","DETALLE":"monto_ventas.dbsp","MODULO":0};

		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);
	});

	arrTest.push(respTest);

	respTest = it('Monto de ventas recurrente',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=2',DataType:'json'}).jData;

	

		jsonEsperado = {"NOMBRE_COMPONENTE":"Monto de ventas recurrentes","FORMATO":1,"CLASIFICACION":1,"ORIGENFROM":"VENTAS V WITH(NOLOCK)OUTER APPLY ( SELECT PROD.IDPRODUCTO,VP.IDVENTA_PRODUCTO, ELP1.IDLINEA_PRODUCTO, ELP1.LINEA_PRODUCTO,ELP1.TK, VP.TOTAL FROM VENTAS_PRODUCTOS VP , PRODUCTOS  PROD,  EMPRESAS_LINEAS_PRODUCTO ELP1  WHERE  V.IDVENTA=VP.IDVENTA AND PROD.IDPRODUCTO=VP.IDPRODUCTO  AND ELP1.IDLINEA_PRODUCTO=PROD.IDLINEA_PRODUCTO) PRO, USUARIOS U WITH(NOLOCK),OPORTUNIDADES O WITH(NOLOCK), PROSPECTOS P WITH(NOLOCK)","ORIGENWHERE":"V.IDUSUARIO = U.IDUSUARIO AND V.IDOPORTUNIDAD = O.IDOPORTUNIDAD AND O.IDPROSPECTO = P.IDPROSPECTO AND U.IDEMPRESA = [IDEMPRESA] AND V.NUEVA = 0  [CRITERIOFECHA] [CRITERIOTIPOMETA] [CRITERIOS]","OPERADOR":" ISNULL(SUM (COALESCE(PRO.TOTAL,V.MONTO,0)),0)","CALIFICADOR":"V","CAMPOFECHA":"V.FECHAHORA","CATEGORIASVISIBLES":"1,2,0","DETALLE":"monto_ventas.dbsp","MODULO":0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);

	respTest = it('Monto de ventas efectivamente cobradas',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=3',DataType:'json'}).jData;

	

		jsonEsperado = {"NOMBRE_COMPONENTE":"Monto de ventas efectivamente cobradas","FORMATO":1,"CLASIFICACION":1,"ORIGENFROM":" VENTAS_COBROS VC WITH(NOLOCK) OUTER APPLY (SELECT *, NULL AS IDLINEA_PRODUCTO FROM VENTAS_COBROS PRO WHERE PRO.IDVENTACOBRO=VC.IDVENTACOBRO) PRO ,VENTAS V WITH(NOLOCK), USUARIOS U WITH(NOLOCK), OPORTUNIDADES O WITH(NOLOCK), PROSPECTOS P WITH(NOLOCK) ","ORIGENWHERE":"V.IDVENTA = VC.IDVENTA AND V.IDUSUARIO = U.IDUSUARIO AND V.IDOPORTUNIDAD = O.IDOPORTUNIDAD AND O.IDPROSPECTO = P.IDPROSPECTO AND U.IDEMPRESA = [IDEMPRESA] AND VC.PAGADO = 1 [CRITERIOFECHA] [CRITERIOTIPOMETA] [CRITERIOS]","OPERADOR":"ISNULL(SUM (VC.MONTO),0)","CALIFICADOR":"V","CAMPOFECHA":"VC.FECHAHORA","CATEGORIASVISIBLES":"1,2,0","DETALLE":"monto_ventas.dbsp","MODULO":0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);

	respTest = it('Monto de ventas',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=4',DataType:'json'}).jData;


		jsonEsperado = {"NOMBRE_COMPONENTE":"Monto de ventas","FORMATO":1,"CLASIFICACION":1,"ORIGENFROM":"VENTAS V WITH(NOLOCK)OUTER APPLY ( SELECT PROD.IDPRODUCTO,VP.IDVENTA_PRODUCTO, ELP1.IDLINEA_PRODUCTO, ELP1.LINEA_PRODUCTO,ELP1.TK, VP.TOTAL  FROM VENTAS_PRODUCTOS VP , PRODUCTOS  PROD,  EMPRESAS_LINEAS_PRODUCTO ELP1  WHERE  V.IDVENTA=VP.IDVENTA AND PROD.IDPRODUCTO=VP.IDPRODUCTO  AND ELP1.IDLINEA_PRODUCTO=PROD.IDLINEA_PRODUCTO) PRO, USUARIOS U WITH(NOLOCK),OPORTUNIDADES O WITH(NOLOCK), PROSPECTOS P WITH(NOLOCK)","ORIGENWHERE":"V.IDUSUARIO = U.IDUSUARIO AND V.IDOPORTUNIDAD = O.IDOPORTUNIDAD AND O.IDPROSPECTO = P.IDPROSPECTO AND U.IDEMPRESA = [IDEMPRESA] [CRITERIOFECHA] [CRITERIOTIPOMETA] [CRITERIOS]","OPERADOR":" ISNULL(SUM (COALESCE(PRO.TOTAL,V.MONTO,0)),0)","CALIFICADOR":"V","CAMPOFECHA":"V.FECHAHORA","CATEGORIASVISIBLES":"1,2,0","DETALLE":"monto_ventas.dbsp","MODULO":0};
		

		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);

	respTest = it('Monto de cobranza',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=5',DataType:'json'}).jData;


		jsonEsperado = {"NOMBRE_COMPONENTE":"Monto de cobranza","FORMATO":1,"CLASIFICACION":1,"ORIGENFROM":" VENTAS_COBROS VC WITH(NOLOCK) OUTER APPLY (SELECT *, NULL AS IDLINEA_PRODUCTO FROM VENTAS_COBROS PRO WHERE PRO.IDVENTACOBRO=VC.IDVENTACOBRO) PRO ,VENTAS V WITH(NOLOCK), USUARIOS U WITH(NOLOCK), OPORTUNIDADES O WITH(NOLOCK), PROSPECTOS P WITH(NOLOCK) ","ORIGENWHERE":"V.IDVENTA = VC.IDVENTA AND V.IDUSUARIO = U.IDUSUARIO AND V.IDOPORTUNIDAD = O.IDOPORTUNIDAD AND O.IDPROSPECTO = P.IDPROSPECTO AND VC.PAGADO = 1 AND VC.AUDITADO = 1 AND U.IDEMPRESA = [IDEMPRESA]  [CRITERIOFECHA] [CRITERIOTIPOMETA] [CRITERIOS]","OPERADOR":"ISNULL(SUM(VC.MONTO),0)","CALIFICADOR":"V","CAMPOFECHA":"VC.FECHAHORA","CATEGORIASVISIBLES":"1,2,0","DETALLE":"monto_ventas.dbsp","MODULO":0};

		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);

	respTest = it('Clientes nuevos',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=6',DataType:'json'}).jData;

		

		jsonEsperado = {"NOMBRE_COMPONENTE":"Clientes nuevos","FORMATO":2,"CLASIFICACION":1,"ORIGENFROM":"(SELECT MIN(V.FECHAHORA) AS FECHA_CLIENTE, P.IDPROSPECTO FROM PROSPECTOS P WITH(NOLOCK), PROSPECTOS_SEGUIMIENTO PS WITH(NOLOCK),OPORTUNIDADES O WITH(NOLOCK), VENTAS V WITH(NOLOCK), USUARIOS U WITH(NOLOCK) WHERE U.IDEMPRESA=[IDEMPRESA] AND V.IDUSUARIO = U.IDUSUARIO [CRITERIOS] [CRITERIOTIPOMETA] AND P.DESCARTADO = 0 AND P.ESCLIENTE=1 AND O.GANADA = 1 AND PS.IDSEGUIMIENTO = P.IDULTIMOSEGUIMIENTO AND O.IDPROSPECTO = P.IDPROSPECTO AND O.IDOPORTUNIDAD = V.IDOPORTUNIDAD GROUP BY P.IDPROSPECTO) AS T ","ORIGENWHERE":"1=1 [CRITERIOFECHA]","OPERADOR":"COUNT(*)","CALIFICADOR":"P","CAMPOFECHA":"FECHA_CLIENTE","CATEGORIASVISIBLES":"1","DETALLE":"conteo_prospectos.dbsp","MODULO":0};
		

		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);

	respTest = it('Compra acumulada',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=7',DataType:'json'}).jData;
		


		jsonEsperado = {"NOMBRE_COMPONENTE":"Compra acumulada","FORMATO":1,"CLASIFICACION":1,"ORIGENFROM":"(SELECT P.IDPROSPECTO,V.IDVENTA, SUM(V.MONTO) AS MONTO FROM PROSPECTOS P WITH(NOLOCK), OPORTUNIDADES O WITH(NOLOCK), VENTAS V WITH(NOLOCK), USUARIOS U WITH(NOLOCK) WHERE V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = [IDEMPRESA] AND P.DESCARTADO=0 AND P.ESCLIENTE=1 AND O.GANADA = 1 AND O.IDPROSPECTO = P.IDPROSPECTO AND O.IDOPORTUNIDAD = V.IDOPORTUNIDAD [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA] GROUP BY P.IDPROSPECTO, V.IDVENTA, V.MONTO) AS T","ORIGENWHERE":null,"OPERADOR":"SUM(MONTO)","CALIFICADOR":"V","CAMPOFECHA":"V.FECHAHORA","CATEGORIASVISIBLES":"1,2","DETALLE":"monto_ventas.dbsp","MODULO":0};
		

		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);
	respTest = it('Monto de comisiones',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=8',DataType:'json'}).jData;
		


		jsonEsperado = {"NOMBRE_COMPONENTE":"Monto de comisiones","FORMATO":1,"CLASIFICACION":1,"ORIGENFROM":"VENTAS V WITH(NOLOCK)OUTER APPLY ( SELECT *, NULL AS IDLINEA_PRODUCTO FROM VENTAS PRO WHERE PRO.IDVENTA=V.IDVENTA) PRO, USUARIOS U WITH(NOLOCK),OPORTUNIDADES O WITH(NOLOCK), PROSPECTOS P WITH(NOLOCK)","ORIGENWHERE":"V.IDUSUARIO = U.IDUSUARIO AND V.IDOPORTUNIDAD = O.IDOPORTUNIDAD AND O.IDPROSPECTO = P.IDPROSPECTO AND U.IDEMPRESA = [IDEMPRESA] [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA]","OPERADOR":"ISNULL(SUM (V.COMISION),0)","CALIFICADOR":"V","CAMPOFECHA":"V.FECHAHORA","CATEGORIASVISIBLES":"1,2,0","DETALLE":"monto_ventas.dbsp","MODULO":0};
		

		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);

	respTest = it('Monto de comisiones efectivamente cobradas',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=9',DataType:'json'}).jData;
		
		jsonEsperado = {"NOMBRE_COMPONENTE":"Monto de comisiones efectivamente cobradas","FORMATO":1,"CLASIFICACION":1,"ORIGENFROM":" VENTAS_COBROS VC WITH(NOLOCK) OUTER APPLY (SELECT *, NULL AS IDLINEA_PRODUCTO FROM VENTAS_COBROS PRO WHERE PRO.IDVENTACOBRO=VC.IDVENTACOBRO) PRO ,VENTAS V WITH(NOLOCK), USUARIOS U WITH(NOLOCK), OPORTUNIDADES O WITH(NOLOCK), PROSPECTOS P WITH(NOLOCK) ","ORIGENWHERE":"V.IDVENTA = VC.IDVENTA AND V.IDUSUARIO = U.IDUSUARIO AND V.IDOPORTUNIDAD = O.IDOPORTUNIDAD AND O.IDPROSPECTO = P.IDPROSPECTO AND U.IDEMPRESA = [IDEMPRESA] AND VC.PAGADO = 1 [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA]","OPERADOR":"ISNULL(SUM (VC.COMISION),0)","CALIFICADOR":"V","CAMPOFECHA":"VC.FECHAHORA","CATEGORIASVISIBLES":"1,2,0","DETALLE":"monto_ventas.dbsp","MODULO":0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);

	respTest = it('Monto promedio oportunidades',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=10',DataType:'json'}).jData;
		


		jsonEsperado = {"NOMBRE_COMPONENTE":"Monto promedio oportunidades","FORMATO":1,"CLASIFICACION":2,"ORIGENFROM":"PROSPECTOS P WITH(NOLOCK),  USUARIOS U WITH(NOLOCK), OPORTUNIDADES O WITH(NOLOCK) OUTER APPLY (   SELECT PROD.IDPRODUCTO,VP.IDOPORTUNIDADES_PRODUCTOS, ELP1.IDLINEA_PRODUCTO, ELP1.LINEA_PRODUCTO,ELP1.TK, VP.TOTAL   FROM OPORTUNIDADES_PRODUCTOS VP , PRODUCTOS  PROD,   EMPRESAS_LINEAS_PRODUCTO ELP1   WHERE  O.IDOPORTUNIDAD=VP.IDOPORTUNIDAD AND  PROD.IDPRODUCTO=VP.IDPRODUCTO  AND ELP1.IDLINEA_PRODUCTO=PROD.IDLINEA_PRODUCTO ) PRO","ORIGENWHERE":"O.IDUSUARIO = U.IDUSUARIO AND O.IDPROSPECTO = P.IDPROSPECTO AND U.IDEMPRESA = [IDEMPRESA] [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA]","OPERADOR":" ISNULL(AVG (COALESCE(PRO.TOTAL,O.MONTO,0)),0)","CALIFICADOR":"O","CAMPOFECHA":"O.FECHAHORA","CATEGORIASVISIBLES":"1,2,0","DETALLE":"monto_oportunidades.dbsp","MODULO":0};
		

		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);

	respTest = it('Monto promedio de ventas',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=11',DataType:'json'}).jData;
	


		jsonEsperado = {"NOMBRE_COMPONENTE":"Monto promedio de ventas","FORMATO":1,"CLASIFICACION":2,"ORIGENFROM":" VENTAS_COBROS VC WITH(NOLOCK) OUTER APPLY (SELECT *, NULL AS IDLINEA_PRODUCTO FROM VENTAS_COBROS PRO WHERE PRO.IDVENTACOBRO=VC.IDVENTACOBRO) PRO  ,VENTAS V WITH(NOLOCK),  USUARIOS U WITH(NOLOCK),  OPORTUNIDADES O WITH(NOLOCK),  PROSPECTOS P WITH(NOLOCK) ","ORIGENWHERE":"V.IDUSUARIO = U.IDUSUARIO AND V.IDOPORTUNIDAD = O.IDOPORTUNIDAD AND O.IDPROSPECTO = P.IDPROSPECTO AND U.IDEMPRESA = [IDEMPRESA] [CRITERIOFECHA] [CRITERIOTIPOMETA] [CRITERIOS]","OPERADOR":"ISNULL(AVG (V.MONTO),0) ","CALIFICADOR":"V","CAMPOFECHA":"V.FECHAHORA","CATEGORIASVISIBLES":"1,2,0","DETALLE":"monto_ventas.dbsp","MODULO":0};
		

		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);

	respTest = it('Monto promedio de cobro',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=12',DataType:'json'}).jData;
		

		jsonEsperado = {"NOMBRE_COMPONENTE":"Monto promedio de cobro","FORMATO":1,"CLASIFICACION":2,"ORIGENFROM":" VENTAS_COBROS VC WITH(NOLOCK) OUTER APPLY (SELECT *, NULL AS IDLINEA_PRODUCTO FROM VENTAS_COBROS PRO WHERE PRO.IDVENTACOBRO=VC.IDVENTACOBRO) PRO  ,VENTAS V WITH(NOLOCK),  USUARIOS U WITH(NOLOCK),  OPORTUNIDADES O WITH(NOLOCK),  PROSPECTOS P WITH(NOLOCK) ","ORIGENWHERE":"V.IDVENTA = VC.IDVENTA AND V.IDUSUARIO = U.IDUSUARIO AND V.IDOPORTUNIDAD = O.IDOPORTUNIDAD AND O.IDPROSPECTO = P.IDPROSPECTO AND U.IDEMPRESA = [IDEMPRESA]  [CRITERIOFECHA] [CRITERIOTIPOMETA] [CRITERIOS]","OPERADOR":"ISNULL(AVG(VC.MONTO),0)","CALIFICADOR":"V","CAMPOFECHA":"VC.FECHAHORA","CATEGORIASVISIBLES":"1,2,0","DETALLE":"monto_ventas.dbsp","MODULO":0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

		});

	arrTest.push(respTest);

	respTest = it('Compra acumulada promedio',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=13',DataType:'json'}).jData;
		

		jsonEsperado = {"NOMBRE_COMPONENTE":"Compra acumulada promedio","FORMATO":1,"CLASIFICACION":2,"ORIGENFROM":"(SELECT P.IDPROSPECTO, V.IDVENTA, SUM(V.MONTO) AS MONTO FROM PROSPECTOS P WITH(NOLOCK), OPORTUNIDADES O WITH(NOLOCK), VENTAS V WITH(NOLOCK), USUARIOS U WITH(NOLOCK) WHERE V.IDUSUARIO = U.IDUSUARIO AND U.IDEMPRESA = [IDEMPRESA] AND P.DESCARTADO=0 AND P.ESCLIENTE=1 AND O.GANADA = 1 AND O.IDPROSPECTO = P.IDPROSPECTO AND O.IDOPORTUNIDAD = V.IDOPORTUNIDAD [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA] GROUP BY P.IDPROSPECTO, V.IDVENTA,V.MONTO) AS T","ORIGENWHERE":null,"OPERADOR":"AVG(MONTO)","CALIFICADOR":"V","CAMPOFECHA":"V.FECHAHORA","CATEGORIASVISIBLES":"1,2","DETALLE":"monto_ventas.dbsp","MODULO":0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);

	respTest = it('Conteo de oportunidades',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=14',DataType:'json'}).jData;
		
		jsonEsperado = {"NOMBRE_COMPONENTE":"Conteo de oportunidades","FORMATO":2,"CLASIFICACION":2,"ORIGENFROM":" USUARIOS U WITH(NOLOCK),   PROSPECTOS P WITH(NOLOCK),  OPORTUNIDADES O WITH(NOLOCK)  OUTER APPLY (   SELECT TOP 1 PROD.IDPRODUCTO,VP.IDOPORTUNIDADES_PRODUCTOS, ELP1.IDLINEA_PRODUCTO, ELP1.LINEA_PRODUCTO,ELP1.TK, VP.TOTAL   FROM OPORTUNIDADES_PRODUCTOS VP , PRODUCTOS  PROD,   EMPRESAS_LINEAS_PRODUCTO ELP1   WHERE  O.IDOPORTUNIDAD=VP.IDOPORTUNIDAD AND  PROD.IDPRODUCTO=VP.IDPRODUCTO  AND ELP1.IDLINEA_PRODUCTO=PROD.IDLINEA_PRODUCTO ) PRO","ORIGENWHERE":"O.IDUSUARIO = U.IDUSUARIO AND O.IDPROSPECTO = P.IDPROSPECTO AND U.IDEMPRESA = [IDEMPRESA] [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA]","OPERADOR":" ISNULL(COUNT (DISTINCT(O.IDOPORTUNIDAD)),0)","CALIFICADOR":"O","CAMPOFECHA":"O.FECHAHORA","CATEGORIASVISIBLES":"1,2,0","DETALLE":"monto_oportunidades.dbsp","MODULO":0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);

	respTest = it('Conteo de ventas',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=15',DataType:'json'}).jData;
		
		jsonEsperado = {"NOMBRE_COMPONENTE":"Conteo de ventas","FORMATO":2,"CLASIFICACION":2,"ORIGENFROM":"VENTAS V WITH(NOLOCK)OUTER APPLY ( SELECT TOP 1 PROD.IDPRODUCTO,VP.IDVENTA_PRODUCTO, ELP1.IDLINEA_PRODUCTO, ELP1.LINEA_PRODUCTO,ELP1.TK, VP.TOTAL  FROM VENTAS_PRODUCTOS VP , PRODUCTOS  PROD,  EMPRESAS_LINEAS_PRODUCTO ELP1 WHERE  V.IDVENTA=VP.IDVENTA AND PROD.IDPRODUCTO=VP.IDPRODUCTO  AND ELP1.IDLINEA_PRODUCTO=PROD.IDLINEA_PRODUCTO) PRO, USUARIOS U WITH(NOLOCK),OPORTUNIDADES O WITH(NOLOCK), PROSPECTOS P WITH(NOLOCK)","ORIGENWHERE":"V.IDUSUARIO = U.IDUSUARIO AND V.IDOPORTUNIDAD = O.IDOPORTUNIDAD AND O.IDPROSPECTO = P.IDPROSPECTO AND U.IDEMPRESA = [IDEMPRESA] [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA]","OPERADOR":" ISNULL(COUNT (DISTINCT(V.IDVENTA)),0)","CALIFICADOR":"V","CAMPOFECHA":"V.FECHAHORA","CATEGORIASVISIBLES":"1,2,0","DETALLE":"monto_ventas.dbsp","MODULO":0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);

	respTest = it('Conteo de prospectos',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=16',DataType:'json'}).jData;
		
		jsonEsperado = {"NOMBRE_COMPONENTE":"Conteo de prospectos","FORMATO":2,"CLASIFICACION":2,"ORIGENFROM":"USUARIOS U WITH(NOLOCK),PROSPECTOS_SEGUIMIENTO PS WITH(NOLOCK), PROSPECTOS P WITH(NOLOCK)","ORIGENWHERE":"P.IDEMPRESA=[IDEMPRESA]  AND PS.IDSEGUIMIENTO = P.IDULTIMOSEGUIMIENTO AND P.IDUSUARIO =U.IDUSUARIO AND (P.IMPORTADODESDE = 0 OR P.IMPORTADODESDE = 1) [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA]","OPERADOR":"COUNT(P.IDPROSPECTO)","CALIFICADOR":"P","CAMPOFECHA":"P.FECHAHORA","CATEGORIASVISIBLES":"1","DETALLE":"conteo_prospectos.dbsp","MODULO":0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);

	respTest = it('Conteo de productos',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=17',DataType:'json'}).jData;
		
		jsonEsperado = {"NOMBRE_COMPONENTE":"Conteo de productos","FORMATO":2,"CLASIFICACION":2,"ORIGENFROM":null,"ORIGENWHERE":null,"OPERADOR":null,"CALIFICADOR":null,"CAMPOFECHA":null,"CATEGORIASVISIBLES":null,"DETALLE":null,"MODULO":0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);

	respTest = it('Conteo de cobros',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=18',DataType:'json'}).jData;
		
		jsonEsperado = {"NOMBRE_COMPONENTE":"Conteo de cobros","FORMATO":2,"CLASIFICACION":2,"ORIGENFROM":" VENTAS_COBROS VC WITH(NOLOCK)  OUTER APPLY (SELECT *, NULL AS IDLINEA_PRODUCTO FROM VENTAS_COBROS PRO WHERE PRO.IDVENTACOBRO=VC.IDVENTACOBRO) PRO  ,VENTAS V WITH(NOLOCK),  USUARIOS U WITH(NOLOCK),  OPORTUNIDADES O WITH(NOLOCK),  PROSPECTOS P WITH(NOLOCK)","ORIGENWHERE":"V.IDVENTA = VC.IDVENTA AND V.IDUSUARIO = U.IDUSUARIO AND V.IDOPORTUNIDAD = O.IDOPORTUNIDAD AND O.IDPROSPECTO = P.IDPROSPECTO AND VC.PAGADO = 1 AND VC.AUDITADO = 1 AND U.IDEMPRESA = [IDEMPRESA]  [CRITERIOFECHA] [CRITERIOTIPOMETA] [CRITERIOS]","OPERADOR":"COUNT(VC.MONTO)","CALIFICADOR":"V","CAMPOFECHA":"V.FECHAHORA","CATEGORIASVISIBLES":"1,2,0","DETALLE":"monto_ventas.dbsp","MODULO":0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);

	respTest = it('Ticket promedio',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=19',DataType:'json'}).jData;
		
		jsonEsperado = {"NOMBRE_COMPONENTE":"Ticket promedio","FORMATO":1,"CLASIFICACION":2,"ORIGENFROM":"VENTAS V WITH(NOLOCK) OUTER APPLY (  SELECT PROD.IDPRODUCTO,VP.IDVENTA_PRODUCTO, ELP1.IDLINEA_PRODUCTO, ELP1.LINEA_PRODUCTO,ELP1.TK, VP.TOTAL   FROM VENTAS_PRODUCTOS VP , PRODUCTOS  PROD,   EMPRESAS_LINEAS_PRODUCTO ELP1  WHERE  V.IDVENTA=VP.IDVENTA AND  PROD.IDPRODUCTO=VP.IDPRODUCTO  AND ELP1.IDLINEA_PRODUCTO=PROD.IDLINEA_PRODUCTO ) PRO,  USUARIOS U WITH(NOLOCK),OPORTUNIDADES O WITH(NOLOCK), PROSPECTOS P WITH(NOLOCK)","ORIGENWHERE":"V.IDUSUARIO = U.IDUSUARIO AND V.IDOPORTUNIDAD = O.IDOPORTUNIDAD AND O.IDPROSPECTO = P.IDPROSPECTO AND U.IDEMPRESA = [IDEMPRESA] [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA]","OPERADOR":" ISNULL(AVG (COALESCE(PRO.TOTAL,V.MONTO,0)),0)","CALIFICADOR":"V","CAMPOFECHA":"V.FECHAHORA","CATEGORIASVISIBLES":"1,2,0","DETALLE":"monto_ventas.dbsp","MODULO":0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);

	respTest = it('Porcentaje de efectividad (Conversión en clientes)',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=20',DataType:'json'}).jData;
		console.log(JSON.stringify(jsonRecibido));
		
		jsonEsperado = {"NOMBRE_COMPONENTE":"Porcentaje de efectividad (Conversión en clientes)","FORMATO":3,"CLASIFICACION":2,"ORIGENFROM":"(SELECT (1.0*(SELECT COUNT(*) FROM PROSPECTOS P WITH(NOLOCK), PROSPECTOS_SEGUIMIENTO PS WITH(NOLOCK), USUARIOS U WITH(NOLOCK) WHERE P.IDUSUARIO = U.IDUSUARIO AND PS.IDSEGUIMIENTO = P.IDULTIMOSEGUIMIENTO AND  P.IDEMPRESA=[IDEMPRESA] AND (P.IMPORTADODESDE = 0 OR P.IMPORTADODESDE = 1) AND P.ESCLIENTE = 1 [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA])/(SELECT COUNT(*) FROM PROSPECTOS P WITH(NOLOCK), USUARIOS U WITH(NOLOCK) WHERE P.IDUSUARIO = U.IDUSUARIO AND P.IDEMPRESA=[IDEMPRESA] AND (P.IMPORTADODESDE = 0 OR P.IMPORTADODESDE = 1) [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA])) AS PCTEFECTIVIDAD) AS T","ORIGENWHERE":null,"OPERADOR":"PCTEFECTIVIDAD","CALIFICADOR":"P","CAMPOFECHA":"P.FECHAHORA","CATEGORIASVISIBLES":"1","DETALLE":"conteo_prospectos.dbsp","MODULO":0};
		console.log(jsonEsperado);
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);


	respTest = it('Porcentaje de retencion',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=21',DataType:'json'}).jData;
		
		jsonEsperado = {"NOMBRE_COMPONENTE":"Porcentaje de retención","FORMATO":3,"CLASIFICACION":2,"ORIGENFROM":"(SELECT (1.0*(SELECT COUNT(*) FROM PROSPECTOS P WITH(NOLOCK), PROSPECTOS_SEGUIMIENTO PS WITH(NOLOCK), USUARIOS U WITH(NOLOCK) WHERE P.IDUSUARIO = U.IDUSUARIO AND PS.IDSEGUIMIENTO = P.IDULTIMOSEGUIMIENTO AND  P.IDEMPRESA=[IDEMPRESA] AND (P.IMPORTADODESDE = 0 OR P.IMPORTADODESDE = 1) AND P.DESCARTADO= 0 [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA])/(SELECT COUNT(*) FROM PROSPECTOS P WITH(NOLOCK), USUARIOS U WITH(NOLOCK) WHERE P.IDUSUARIO = U.IDUSUARIO AND P.IDEMPRESA=[IDEMPRESA] AND (P.IMPORTADODESDE = 0 OR P.IMPORTADODESDE = 1) [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA])) AS PCTRETENCION) AS T","ORIGENWHERE":null,"OPERADOR":"PCTRETENCION","CALIFICADOR":"P","CAMPOFECHA":"P.FECHAHORA","CATEGORIASVISIBLES":"1","DETALLE":"conteo_prospectos.dbsp","MODULO":0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);


	respTest = it('Velocidad de venta',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=22',DataType:'json'}).jData;
		
		jsonEsperado = {'NOMBRE_COMPONENTE':'Velocidad de venta','FORMATO':2,'CLASIFICACION':2,'ORIGENFROM':' OPORTUNIDADES O WITH(NOLOCK), VENTAS V WITH(NOLOCK) OUTER APPLY ( SELECT *, NULL AS IDLINEA_PRODUCTO FROM VENTAS PRO WHERE PRO.IDVENTA=V.IDVENTA ) PRO,  USUARIOS U WITH(NOLOCK), PROSPECTOS_SEGUIMIENTO PS WITH(NOLOCK), PROSPECTOS P WITH(NOLOCK)','ORIGENWHERE':'P.IDUSUARIO =U.IDUSUARIO AND PS.IDSEGUIMIENTO = P.IDULTIMOSEGUIMIENTO AND P.IDPROSPECTO = O.IDPROSPECTO AND O.IDOPORTUNIDAD = V.IDOPORTUNIDAD AND P.IDEMPRESA = [IDEMPRESA] AND V.NUEVA = 1 [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA]','OPERADOR':'AVG(Datediff("d", DBO.GETONLYDATE(P.FECHACONTACTO), DBO.GETONLYDATE(V.FECHAHORA)))','CALIFICADOR':'P','CAMPOFECHA':'P.FECHACONTACTO','CATEGORIASVISIBLES':'1,2','DETALLE':'conteo_prospectos.dbsp','MODULO':0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);

	respTest = it('Conteo de llamadas',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=23',DataType:'json'}).jData;
		
		jsonEsperado = {"NOMBRE_COMPONENTE":"Conteo de llamadas","FORMATO":2,"CLASIFICACION":2,"ORIGENFROM":"PROSPECTOS_SEGUIMIENTO PS WITH(NOLOCK),  USUARIOS U WITH(NOLOCK), PROSPECTOS P WITH(NOLOCK)","ORIGENWHERE":"PS.IDUSUARIO =U.IDUSUARIO AND PS.IDPROSPECTO = P.IDPROSPECTO AND TIPO_SEGUIMIENTO = 8 [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA]","OPERADOR":"COUNT(*)","CALIFICADOR":"PS","CAMPOFECHA":"PS.FECHAHORA","CATEGORIASVISIBLES":"1,0","DETALLE":"conteo_prospectos.dbsp","MODULO":0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);

	});

	arrTest.push(respTest);

	respTest = it('Conteo de visitas',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=24',DataType:'json'}).jData;
		
		jsonEsperado = {"NOMBRE_COMPONENTE":"Conteo de visitas","FORMATO":2,"CLASIFICACION":2,"ORIGENFROM":"PROSPECTOS_SEGUIMIENTO PS WITH(NOLOCK), USUARIOS U WITH(NOLOCK), PROSPECTOS P WITH(NOLOCK)","ORIGENWHERE":"P.IDUSUARIO =U.IDUSUARIO AND PS.IDPROSPECTO = P.IDPROSPECTO AND TIPO_SEGUIMIENTO = 12 [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA]","OPERADOR":"COUNT(*)","CALIFICADOR":"P","CAMPOFECHA":"PS.FECHAHORA","CATEGORIASVISIBLES":"1,0","DETALLE":"conteo_prospectos.dbsp","MODULO":0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);
	

	});

	arrTest.push(respTest);

	respTest = it('Conteo de emails',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=25',DataType:'json'}).jData;
		
		jsonEsperado = {"NOMBRE_COMPONENTE":"Conteo de emails","FORMATO":2,"CLASIFICACION":2,"ORIGENFROM":"USUARIOS_EMAILS UE WITH(NOLOCK), USUARIOS U WITH(NOLOCK),PROSPECTOS_SEGUIMIENTO PS WITH(NOLOCK), PROSPECTOS P WITH(NOLOCK)","ORIGENWHERE":"P.IDUSUARIO =U.IDUSUARIO AND PS.IDSEGUIMIENTO = P.IDULTIMOSEGUIMIENTO AND UE.IDPROSPECTO = P.IDPROSPECTO [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA]","OPERADOR":"COUNT(*)","CALIFICADOR":"UE","CAMPOFECHA":"UE.FECHAHORA","CATEGORIASVISIBLES":"1,0","DETALLE":"conteo_prospectos.dbsp","MODULO":0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);
	

	});

	arrTest.push(respTest);

	respTest = it('Conteo de citas',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=26',DataType:'json'}).jData;
		
		jsonEsperado = {"NOMBRE_COMPONENTE":"Conteo de citas","FORMATO":2,"CLASIFICACION":2,"ORIGENFROM":"(SELECT C.IDCITA, CI.IDPERSONA AS IDUSUARIO FROM CITAS C, CITAS_INVITADOS CI  WHERE IDEMPRESA = [IDEMPRESA] AND C.IDCITA = CI.idcita [CRITERIOFECHA] [CRITERIOS] AND CI.tipopersona = 2) AS T","ORIGENWHERE":"1=1 [CRITERIOTIPOMETA]","OPERADOR":"COUNT(*)","CALIFICADOR":"T","CAMPOFECHA":"C.FECHA_INICIO","CATEGORIASVISIBLES":null,"DETALLE":"detalle_meta.dbsp","MODULO":0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);
	

		
	});

	arrTest.push(respTest);

	respTest = it('Conteo de tareas',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=27',DataType:'json'}).jData;
		
		jsonEsperado = {"NOMBRE_COMPONENTE":"Conteo de tareas","FORMATO":2,"CLASIFICACION":2,"ORIGENFROM":"(SELECT T.IDTAREA, T.IDREALIZADOR AS IDUSUARIO FROM TAREAS T WHERE IDINICIADOR IN (SELECT IDUSUARIO FROM USUARIOS WHERE IDEMPRESA = [IDEMPRESA])  [CRITERIOS] [CRITERIOFECHA]) AS T","ORIGENWHERE":"1=1 [CRITERIOTIPOMETA]","OPERADOR":"COUNT(*)","CALIFICADOR":"T","CAMPOFECHA":"FECHA_CREACION","CATEGORIASVISIBLES":null,"DETALLE":"detalle_meta.dbsp","MODULO":0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);
	

	});

	arrTest.push(respTest);

	respTest = it('Conteo de seguimientos',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=28',DataType:'json'}).jData;
		
		jsonEsperado = {"NOMBRE_COMPONENTE":"Conteo de seguimientos","FORMATO":2,"CLASIFICACION":2,"ORIGENFROM":"PROSPECTOS_SEGUIMIENTO PS WITH(NOLOCK), USUARIOS U WITH(NOLOCK), PROSPECTOS P WITH(NOLOCK)","ORIGENWHERE":"PS.IDUSUARIO =U.IDUSUARIO AND PS.IDPROSPECTO = P.IDPROSPECTO AND SISTEMA = 0 AND IDEMAIL IS NULL [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA]","OPERADOR":"COUNT(*)","CALIFICADOR":"PS","CAMPOFECHA":"PS.FECHAHORA","CATEGORIASVISIBLES":"1,0","DETALLE":"conteo_prospectos.dbsp","MODULO":0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);
	

	});

	arrTest.push(respTest);

	respTest = it('Prospectos nuevos',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=29',DataType:'json'}).jData;
		
		jsonEsperado = {"NOMBRE_COMPONENTE":"Prospectos nuevos","FORMATO":2,"CLASIFICACION":2,"ORIGENFROM":"USUARIOS U WITH(NOLOCK),PROSPECTOS_SEGUIMIENTO PS WITH(NOLOCK), PROSPECTOS P WITH(NOLOCK)","ORIGENWHERE":"P.IDUSUARIO =U.IDUSUARIO AND PS.IDSEGUIMIENTO = P.IDULTIMOSEGUIMIENTO AND P.IDEMPRESA=[IDEMPRESA] AND P.DESCARTADO = 0 AND P.ESOPORTUNIDAD = 0 AND P.ESCLIENTE = 0 AND (P.IMPORTADODESDE = 0 OR P.IMPORTADODESDE = 1) [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA]","OPERADOR":"COUNT(P.IDPROSPECTO)","CALIFICADOR":"P","CAMPOFECHA":"P.FECHAHORA","CATEGORIASVISIBLES":"1","DETALLE":"conteo_prospectos.dbsp","MODULO":0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);
	

	});

	arrTest.push(respTest);

	respTest = it('Conteo de canalizaciones',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=31',DataType:'json'}).jData;
		
		jsonEsperado = {"NOMBRE_COMPONENTE":"Conteo de canalizaciones","FORMATO":2,"CLASIFICACION":2,"ORIGENFROM":" USUARIOS U WITH(NOLOCK),PROSPECTOS_SEGUIMIENTO PS WITH(NOLOCK), CONTROL.CONTROL.DBO.CANALIZACION_PROSPECTOS C,CONTROL.CONTROL.DBO.EMPRESAS_RELACIONADAS ER,CONTROL.CONTROL.DBO.CANALIZACIONES CC,CONTROL.CONTROL.DBO.CANALIZACION_CLUSTERS CCTS,CONTROL.CONTROL.DBO.CANALIZACION_CUENTAS CCL,CONTROL.CONTROL.DBO.CANALIZACION_DISTRIBUIDORES CD,PROSPECTOS P WITH(NOLOCK)","ORIGENWHERE":" C.IDRELACION = ER.IDRELACION AND CCL.IDCUENTA = C.IDCUENTA AND CC.IDCANALIZACION = CCL.IDCANALIZACION AND CCL.IDCANALIZACION = CC.IDCANALIZACION AND CD.IDEMPRESA = ER.IDEMPRESADESTINO AND CD.IDDISTRIBUIDOR = CCL.IDDISTRIBUIDOR AND CCL.IDCLUSTER = CCTS.IDCLUSTER AND C.IDUSUARIOCANALIZADOR = U.IDUSUARIO AND P.IDPROSPECTO = C.IDPROSPECTOORIGEN AND PS.IDSEGUIMIENTO = P.IDULTIMOSEGUIMIENTO AND CCTS.IDCANALIZACION = CC.IDCANALIZACION AND CC.IDEMPRESA = ER.IDEMPRESAORIGEN AND U.IDEMPRESA = [IDEMPRESA] [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA] ","OPERADOR":"COUNT(*)","CALIFICADOR":"U","CAMPOFECHA":"C.FECHACANALIZACION","CATEGORIASVISIBLES":"1","DETALLE":"conteo_prospectos.dbsp","MODULO":2};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);
	

	});

	arrTest.push(respTest);

	respTest = it('Promedio de seguimientos por prospecto',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=32',DataType:'json'}).jData;
		
		jsonEsperado = {"NOMBRE_COMPONENTE":"Promedio de seguimientos por prospecto","FORMATO":2,"CLASIFICACION":2,"ORIGENFROM":"(SELECT COUNT(*) AS TOTAL_SEGUIMIENTOS, P.IDPROSPECTO FROM PROSPECTOS_SEGUIMIENTO PS,PROSPECTOS P, USUARIOS U WITH(NOLOCK) WHERE P.IDUSUARIO =U.IDUSUARIO AND  P.IDPROSPECTO = PS.IDPROSPECTO [CRITERIOS] AND PS.IDEMAIL IS NULL AND PS.SISTEMA = 0 [CRITERIOFECHA] [CRITERIOTIPOMETA] GROUP BY P.IDPROSPECTO) AS T","ORIGENWHERE":null,"OPERADOR":"AVG(1.0*T.TOTAL_SEGUIMIENTOS)","CALIFICADOR":"PS","CAMPOFECHA":"PS.FECHAHORA","CATEGORIASVISIBLES":"1","DETALLE":"conteo_prospectos.dbsp","MODULO":0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);
	

	});

	arrTest.push(respTest);

	respTest = it('Monto de oportunidades',function(){
		jsonRecibido = SalesUp.Sistema.CargaDatos({Link:'/privado/Modelo/tests/testTiposMetasTabla.dbsp',Parametros:'componente=33',DataType:'json'}).jData;
		
		jsonEsperado = {"NOMBRE_COMPONENTE":"Monto de oportunidades","FORMATO":1,"CLASIFICACION":1,"ORIGENFROM":" USUARIOS U WITH(NOLOCK),   PROSPECTOS P WITH(NOLOCK),  OPORTUNIDADES O WITH(NOLOCK)  OUTER APPLY (  SELECT PROD.IDPRODUCTO,VP.IDOPORTUNIDADES_PRODUCTOS, ELP1.IDLINEA_PRODUCTO, ELP1.LINEA_PRODUCTO,ELP1.TK, VP.TOTAL   FROM OPORTUNIDADES_PRODUCTOS VP , PRODUCTOS  PROD,   EMPRESAS_LINEAS_PRODUCTO ELP1  WHERE  O.IDOPORTUNIDAD=VP.IDOPORTUNIDAD AND  PROD.IDPRODUCTO=VP.IDPRODUCTO  AND ELP1.IDLINEA_PRODUCTO=PROD.IDLINEA_PRODUCTO ) PRO","ORIGENWHERE":"O.IDUSUARIO = U.IDUSUARIO AND O.IDPROSPECTO = P.IDPROSPECTO AND U.IDEMPRESA = [IDEMPRESA] [CRITERIOS] [CRITERIOTIPOMETA] [CRITERIOFECHA]","OPERADOR":" ISNULL(SUM (COALESCE(PRO.TOTAL,O.MONTO,0)),0)","CALIFICADOR":"O","CAMPOFECHA":"O.FECHAHORA","CATEGORIASVISIBLES":"1,2,0","DETALLE":null,"MODULO":0};
		
		expect(jsonRecibido).not.toBe(null);
		expect(jsonRecibido).not.toBe({});
		expect(jsonRecibido).toEqual(jsonEsperado);
	

	});

	arrTest.push(respTest);


});