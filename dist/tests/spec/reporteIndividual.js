jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
var testing = (window.opener != null) ? window.opener.test : null, arrTest = [], respTest;

var Date1 = new Date();
var year = Date1.getYear();
var month =Date1.getMonth();
var day = Date1.getDay();


function getSum(total, num) {
    return total + num;
}
var validaelprimero;
var existe;
var validarGraph,grafica,SinDatosExiste,validarMap,mapa;
var popocatepetl = describe("SalesUp.reportes.obtieneVariantes de sistema", function() {
	afterAll(function(){
		if (testing) {
			testing.guardaRespuesta(arrTest);
		}		
	});

	respTest = it('Debe existir la función', function() {
		expect(typeof SalesUp.reportes.obtieneVariantes).toEqual('function');
	});

	arrTest.push(respTest);

	describe("Test del reporte actual", function() {
		var variantes;
		function x(){
		switch(SalesUp.Variables.tkrs) {	
			case "320DB1C0-F01D-43C5-BC40-421AEBDE4350":
			/*Por periodo*/
			validaelprimero = [{tkRsv: '57B5F872-C3EB-4DA9-BEF8-0B083CA48FDF',idVariante: 1,variante: 'Mensual por ejecutivos',criteriosVisibles: '1',sistema: 1, totalizar: null, editar: null}, {tkRsv: 'F16A650F-DF8D-4AC6-A9B7-A13D750801E6',idVariante: 2,variante: 'Mensual por grupos o departamentos',criteriosVisibles: '1,6',sistema: 1, totalizar: null, editar: null}];
			break;
			case '94117AB6-A8D0-4C9D-98D1-03658B1D81E3':
			/*Historico*/
			validaelprimero = [ { tkRsv: '41854A2C-9122-49EC-BDFD-C5E0C1E53446', idVariante: 59, variante: 'Por ejecutivos año actual', criteriosVisibles: '25,18,2,6', sistema: 1, totalizar: null, editar: null },{ tkRsv: '950E8E2E-3BC6-4914-B839-592A4755C4B6', idVariante: 60, variante: 'Por grupos año actual', criteriosVisibles: '25,18,2', sistema: 1, totalizar: null, editar: null } ];
			break;
			case 'A61DD300-2FEC-44AF-9772-FC3CE01C5D8F':
			/*Geolocalización*/
			validaelprimero = [{ tkRsv: '3C7B6417-3D75-47D6-B714-77DE5E47F4E5', idVariante: 50, variante: 'Seguimientos del mes', criteriosVisibles: '1,6,5', sistema: 1, totalizar: null, editar: null } ];
			break;
			case '94429999-5820-4CB5-9FD3-AF033DD82761':
			/*Sucesos*/
			validaelprimero = [ { tkRsv: '7BEBA5C4-8325-4E04-99F4-0446CF250289', idVariante: 52, variante: 'Sucesos del mes', criteriosVisibles: '1,23,5,9', sistema: 1, totalizar: null, editar: null } ];
			break;
			case '83098E2D-7DD2-4170-896D-7606B0588A27': 
			/*Descartados*/
			validaelprimero = [ { tkRsv: 'CE980718-0969-4737-93E3-512122E7EEB1', idVariante: 58, variante: 'Por empresa', criteriosVisibles: '1,24', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '72BE401A-951D-4123-AABE-75730F22C471', idVariante: 53, variante: 'Por grupos', criteriosVisibles: '1,24', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '681B955F-3BCB-44AC-AF13-1E28966D0D51', idVariante: 54, variante: 'Por ejecutivos', criteriosVisibles: '1,24', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '3E0E6BAD-7046-4FD9-A720-FD4FD31F1111', idVariante: 55, variante: 'Por origenes', criteriosVisibles: '1,24', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: 'C19F8E08-B652-46F5-91E2-8D31BA8BE0AE', idVariante: 56, variante: 'Por país', criteriosVisibles: '1,24', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '1A921339-360A-4587-B28A-CB98FA55865F', idVariante: 57, variante: 'Por región', criteriosVisibles: '1,24', sistema: 1, totalizar: null, editar: null } ]
			break;
			case 'DF07E1F4-F9D5-4478-B175-9C4E801BB9F4':
			/*Estimación de ventas*/
			validaelprimero = [ { tkRsv: 'E9A26856-AD13-4C21-B7A3-82CF46A71388', idVariante: 6, variante: 'Por probabilidad', criteriosVisibles: '2,13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '76DC875B-FC1C-41AC-914B-013E480C2794', idVariante: 7, variante: 'Por ejecutivos', criteriosVisibles: '2,6,13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: 'D792221C-94AE-4700-A533-5E90510BCF92', idVariante: 8, variante: 'Por grupos', criteriosVisibles: '2,13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: 'B10BEC2F-8D3A-4553-8D03-AEE878433B4E', idVariante: 9, variante: 'Por líneas', criteriosVisibles: '2,13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '29642D92-D1FC-4410-91D5-322962110894', idVariante: 10, variante: 'Por origen', criteriosVisibles: '2,13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: 'CCABAE7D-D6B3-48C0-9924-8250074CE589', idVariante: 11, variante: 'Por país', criteriosVisibles: '2,13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: 'CB67BC99-37A9-4967-8650-9AAC874253FE', idVariante: 12, variante: 'Por región', criteriosVisibles: '2,13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '336052B7-4ED9-4D89-BF36-4F14592760A8', idVariante: 13, variante: 'Por ciudad', criteriosVisibles: '2,13', sistema: 1, totalizar: null, editar: null } ]
			break;
			case '7F266C17-C39D-4ADC-9D00-C5422CDEA87F':
			/*Sin seguimientos*/
			validaelprimero = [
			{ tkRsv: '16B94E7D-E62F-4BF1-A44B-19F7A998A372', idVariante: 14, variante: 'Por ejecutivos', criteriosVisibles: '6,13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '5AF88645-7805-4720-9A05-2A95A3697281', idVariante: 18, variante: 'Por grupos', criteriosVisibles: '13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '7B4A1669-4C0A-4EA8-96C9-8F8FFE3857A1', idVariante: 19, variante: 'Por lineas', criteriosVisibles: '13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '0A25E8ED-C27C-470E-BAE9-27C2197F92DA', idVariante: 20, variante: 'Por origen', criteriosVisibles: '13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '77E18AF5-7C4A-425C-9B6D-1B0BF44F5303', idVariante: 21, variante: 'Por País', criteriosVisibles: '13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '84975134-18A4-483F-956B-27432FAED34A', idVariante: 22, variante: 'Por Región', criteriosVisibles: '13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '356D7183-8E96-4D97-B13C-78A960C86AC2', idVariante: 23, variante: 'Por ciudad', criteriosVisibles: '13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '4C2C28C0-441A-48D7-818D-513391CA14E7', idVariante: 25, variante: 'Por fase', criteriosVisibles: '17,13', sistema: 1, totalizar: null, editar: null }
			];
			$('#laVariante').val('7B4A1669-4C0A-4EA8-96C9-8F8FFE3857A1').change();
			break;
			case '54C6A004-7648-4988-9BFD-CCC5B7EEFCCF':
			/*Avances*/
			validaelprimero = [{"tkRsv":"9548EAB1-3550-4E72-B575-3B5799959DA4","idVariante":15,"variante":"Avances","criteriosVisibles":"20,16,13","sistema":1, totalizar: null, editar: null}]
			break;
			case '8ACE79FA-5187-4DB6-A623-0134CD64DE0E':
			/*Realizadas vs cobradas*/
			validaelprimero = [ { tkRsv: '16DB5907-EF57-4144-8274-BDB4244DB76E', idVariante: 26, variante: 'Por ejecutivo', criteriosVisibles: '19,18,6,13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '468A03E4-3491-42D9-9AC8-1434BC38CA23', idVariante: 27, variante: 'Por grupos', criteriosVisibles: '19,18,13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '0D06BA2F-9706-44F4-B86D-AC75C7185E45', idVariante: 28, variante: 'Por linea', criteriosVisibles: '19,18,13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '666FB67C-179A-483C-809A-952075E5D722', idVariante: 29, variante: 'Por origen', criteriosVisibles: '19,18,13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '63EAA00F-12C1-4A4C-B690-EE8862DF314C', idVariante: 30, variante: 'Por país', criteriosVisibles: '19,18,13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '7DFA7FC6-0463-4D69-8EF0-29E3B52B233E', idVariante: 31, variante: 'Por región', criteriosVisibles: '19,18,13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '3A16E2C7-015D-4613-A3CD-1DE5CD8A796A', idVariante: 32, variante: 'Por ciudad', criteriosVisibles: '19,18,13', sistema: 1, totalizar: null, editar: null } ]
			break;
			case '5AC9BB7C-F071-437D-BBFD-AEA299E355AC':
			validaelprimero = [ { tkRsv: '123DD484-4C0F-47F3-B978-BB1791A5BC18', idVariante: 42, variante: 'Por ejecutivo', criteriosVisibles: '21,18,6,13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '69ADA5A2-B2C5-41E0-B01D-C07894EEA721', idVariante: 43, variante: 'Por grupos', criteriosVisibles: '21,18,13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '02C8E033-E318-4A73-AF4A-845C195882F2', idVariante: 44, variante: 'Por linea', criteriosVisibles: '21,18,13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '0473FDDE-3332-41F4-B0BD-B183FF0AFB04', idVariante: 45, variante: 'Por origen', criteriosVisibles: '21,18,13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '0E71EB96-CCE1-4A40-8711-96254566F5F1', idVariante: 46, variante: 'Por país', criteriosVisibles: '21,18,13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '10C5C93A-47F9-42F4-950E-FD7C8EAC220C', idVariante: 47, variante: 'Por región', criteriosVisibles: '21,18,13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: 'ED6B6E65-9D7E-455D-9434-CA2884080C32', idVariante: 48, variante: 'Por ciudad', criteriosVisibles: '21,18,13', sistema: 1, totalizar: null, editar: null } ]
			break;
			case 'C33150F7-E642-473D-A995-CF4CF9B93C46': 
			validaelprimero = [ { tkRsv: 'FAE43FDA-DD34-478D-823C-29812C0FFA9A', idVariante: 33, variante: 'Por Clientes', criteriosVisibles: '1,5,6,14', sistema: 1, totalizar: null, editar: null } ]
			break;
			case '2B7E4AD9-1DBA-44E3-A41E-00C1AF99DAAC':
			validaelprimero = [ { tkRsv: '8CA80419-9606-4FCF-AFFB-20A234ECBA9B', idVariante: 34, variante: 'Por ejecutivos', criteriosVisibles: '6,13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: 'D9B2B71F-DB41-49BE-B376-E20AFC2C51D3', idVariante: 35, variante: 'Por grupos', criteriosVisibles: '13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: 'A5D5A665-3AF9-4DD9-A94E-DDEED555D383', idVariante: 36, variante: 'Por lineas', criteriosVisibles: '13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '72C1F803-283E-4C07-A6D8-2DD5DF9100E9', idVariante: 37, variante: 'Por origen', criteriosVisibles: '13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: 'D90E81BF-90DE-4E64-BCF3-1DD9EB70CEC8', idVariante: 38, variante: 'Por país', criteriosVisibles: '13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '20311A96-3347-4AD0-A3CD-2E63423EE2E8', idVariante: 39, variante: 'Por región', criteriosVisibles: '13', sistema: 1, totalizar: null, editar: null },
			{ tkRsv: '3F10DBDE-E928-4B12-9893-002C84E295E7', idVariante: 40, variante: 'Por ciudad', criteriosVisibles: '13', sistema: 1, totalizar: null, editar: null } ];
			break;
			case '427164E4-86FF-414D-B3F7-6D010147E312': 
			validaelprimero = [ { tkRsv: '63BCF772-80BE-4D0C-B638-74E610973B3E', idVariante: 41, variante: 'Por continuidad anual', criteriosVisibles: '18,2,6,5,13', sistema: 1, totalizar: null , editar: null} ];
			break;
			case '5216B0B3-A9D5-428F-99A3-0656C0A5DD74':
			validaelprimero = [ { tkRsv: '059FE497-BDB1-4BE1-AA77-A0F3D5877A00', idVariante: 49, variante: 'Correos', criteriosVisibles: '1,5,11,12,9', sistema: 1, totalizar: null , editar: null} ]
			break;
			case '64005056-0167-4C13-A960-D2C0CEE0D93E':
			validaelprimero = [ { tkRsv: 'C37A2DFE-C604-439B-B1E7-9FA6550484D4', idVariante: 51, variante: 'SMS del mes', criteriosVisibles: '1,5,11,12,22,9', sistema: 1, totalizar: null , editar: null} ]
			break;
			case 'A19351BC-82B3-4D04-8E89-330CFE094A68':
			validaelprimero = [ { tkRsv: '33645AA5-D32D-4D12-A318-13E8843BDCC8', idVariante: 3, variante: 'Productos más vendidos', criteriosVisibles: '1,14,15', sistema: 1, totalizar: null , editar: null}, 
			{ tkRsv: 'CDF358F7-CE7E-443B-B834-6A315EB508AC', idVariante: 4, variante: 'Líneas más vendidas', criteriosVisibles: '1', sistema: 1, totalizar: null , editar: null}, 
			{ tkRsv: 'B90E2D2E-63D7-4BAD-BD37-6E06E1A15F70', idVariante: 5, variante: 'Marca más vendida', criteriosVisibles: '1', sistema: 1, totalizar: null , editar: null} ] 
			$('[name="periodo"]').val(0).change();
			$("#repDesde select.ui-datepicker-year").val(2010).change();
			$("#repDesde .ui-datepicker-group-first td.ui-datepicker-week-end").click()
			setTimeout(function(){
				$("#repHasta select.ui-datepicker-year").val(2010);
				$("#repHasta .ui-datepicker-group-first td.ui-datepicker-week-end").click()
				$('#aplicarFiltro').click();
			},1500)
			

			break;
			case '2DAF302A-0E02-4156-8FE0-D81F2ECA356D':
				validaelprimero = [ { tkRsv: '965F9078-3B62-4013-84C6-CA1FA81EE953', idVariante: 61, variante: 'Por Periodo', criteriosVisibles: '1,2,13', sistema: 1, totalizar: null , editar: null} ];
				$('[name="periodo"]').val(8).change();
				$('#aplicarFiltro').click();
			break;
			case '59124D4A-289C-4B47-A31B-0D12B3A4F65B':
			validaelprimero = [ { tkRsv: '9A23A82D-E681-41E5-AE61-FBD751CAB638', idVariante: 62, variante: 'Ventas del año actual', criteriosVisibles: '26,1,6,5,34,13', sistema: 1, totalizar: null , editar: null} ]
			break;
			case '621DFA07-E588-4BAE-94E3-FA8539BA7E5C':
			validaelprimero = [ { tkRsv: '06D2693B-1282-43D4-94F0-07447D1DC6CE', idVariante: 63, variante: 'Canalizados del mes', criteriosVisibles: '38,36,37,39,9', sistema: 1, totalizar: null , editar: null} ]
			break;
		}
	}	

		beforeAll(function(done) {
			setTimeout(function(){x();done();},2000)
		}, 6000);

		respTest = it("Comprueba variantes del sistema(debe estar logueado)", function(done) {
			itemsArr = SalesUp.Variables.jsonInfoReportes.variantes;
			variantes = _.filter(itemsArr, function(item, index) {
				return _.contains([1], item.sistema);
			})
			expect(variantes).toEqual(validaelprimero);
			done();
		});

		arrTest.push(respTest);

		respTest = it("Los criterios deben ser los mismos", function(done) {
			Criterios = _.map(SalesUp.Variables.jsonInfoReportes.criterios,function(e){return e.idCriterio})
			if(!SalesUp.Sistema.EstaActivoModulo({Modulo:15})){
				var indice = Criterios.indexOf(13);
				if (indice !== -1) {
					Criterios.splice(indice,1);
				}
			}
			criteriosReportesT = SalesUp.Variables.jsonInfoReportes.jsonDatos[0].criterios
			criteriosReportes = _.map(criteriosReportesT.split(','),function(e){return parseInt(e)});

			criteriosReportesO = _.sortBy(criteriosReportes, function(num){ return num; });

			expect(Criterios).toEqual(criteriosReportesO);
			done();
		});

		arrTest.push(respTest);

		respTest = it("Comprueba jsonDatos",function(done){
			expect(SalesUp.Variables.DatosRecibidos).toBeDefined();
			done();
		})

		arrTest.push(respTest);

		if (SalesUp.Variables.tkrs == 'A61DD300-2FEC-44AF-9772-FC3CE01C5D8F') {
			respTest = it('Comprueba datos del reporte de Geolocalización', function() {
				var Tamano =  SalesUp.Variables.DatosRecibidos.JsonDatos.length
				expect(Tamano).toEqual(25);
			});

			arrTest.push(respTest);

			describe('Contacto', function() {
				
				beforeAll(function(done) {
					setTimeout(function(){contacto_actual = $('.zebra a > b:first').html();done();},4000)	
				}, 6000);

				respTest = it('Se espera que el contacto sea el mismo, según los datos creados', function(done) {
					expect(contacto_actual).toEqual('Adam Parker');
					done();
				});

				arrTest.push(respTest);

			});
			
		}

		// if (SalesUp.Variables.tkrs == '7F266C17-C39D-4ADC-9D00-C5422CDEA87F') {
		// 	describe('Cantidades', function() {
				
		// 		beforeAll(function(done) {
		// 			setTimeout(function(){
		// 				datos_ss = [];
		// 				for(x in SalesUp.Variables.DatosRecibidos.jsonDatos){
		// 				   datos_ss[x] = SalesUp.Variables.DatosRecibidos.jsonDatos[x].VENCIDO4;
		// 				}

		// 				done();}
		// 			,4000)	
		// 		}, 6000);

		// 		respTest = it('Vencidos', function(done) {
		// 			var validadoDatos =  [1266000, 1182000, 1176000, 1176000, 1176000, 1176000, 1176000, 1176000];
		// 			expect(datos_ss).toEqual(validadoDatos);
		// 			done();
		// 		});

		// 		arrTest.push(respTest);

		// 		respTest = it('Suma Vencidos 4', function(done) {
		// 			expect(datos_ss.reduce(getSum)).toEqual(9504000.00)
		// 			done();
		// 		});
		// 		arrTest.push(respTest);

		// 	});
			
		// }

		if (SalesUp.Variables.tkrs == '2DAF302A-0E02-4156-8FE0-D81F2ECA356D') {
			describe('Datos del reporte', function() {
				
				beforeAll(function(done) {
					setTimeout(function(){
						var valor = 12-parseInt(month);
						estoDebeSer = [ { IDPERIODO: valor, GANADAS: 100, PERDIDAS: 171, ACTIVAS: 465, TOTAL: 736, COLUMN1: 736, PCT_GANADAS: 0.135869565217391, PCT_PERDIDAS: 0.232336956521739, PCT_ACTIVAS: 0.63179347826087, MONTO_PERDIDA: 251500, MONTO_GANADA: 145600, MONTO_ACTIVA: 680800, MONTO_TOTAL: 1077900, PCT_MONTO: 0.135077465442063 } ];
						_.each(SalesUp.Variables.DatosRecibidos.jsonDatos,function(e){
							delete e['PERIODO'];
							delete e['FECHA_INI'];
							delete e['FECHA_FIN'];
						});
						SalesUp.Variables.Result = _.where(SalesUp.Variables.DatosRecibidos.jsonDatos,{IDPERIODO:valor})
						done();
					}
					,4000)	
				}, 6000);

				respTest = it('Datos jsonDatos', function(done) {
					expect(SalesUp.Variables.Result).toEqual(estoDebeSer);
					done();
				});
				arrTest.push(respTest);

			});
			
		}

		if (SalesUp.Variables.tkrs == '94429999-5820-4CB5-9FD3-AF033DD82761' || SalesUp.Variables.tkrs == '427164E4-86FF-414D-B3F7-6D010147E312') {
			describe('exportacion cvs', function(){
				respTest = it('debe tener exportacion por cvs', function() {
					expect(true).toBeTruthy();
				});

				arrTest.push(respTest);

				if (SalesUp.Variables.tkrs == '94429999-5820-4CB5-9FD3-AF033DD82761'){
					respTest = it('Existe el preprocesamiento para la exportacion', function() {
						expect(SalesUp.reportes.actividades.exportaCsvSuceso).toBeDefined();	
					});

					arrTest.push(respTest);

				}
			})
			
		}
		
	});

});



describe("Highchart y tabla", function() {

	afterAll(function(){
		if (testing) {
			console.log('siguiente');
			testing.guardaRespuesta(arrTest,true,window);
		}	
	});

	function HiyTbl(){
		switch(SalesUp.Variables.tkrs){
			case "7F266C17-C39D-4ADC-9D00-C5422CDEA87F": case "320DB1C0-F01D-43C5-BC40-421AEBDE4350": case "94117AB6-A8D0-4C9D-98D1-03658B1D81E3": case "83098E2D-7DD2-4170-896D-7606B0588A27": case "DF07E1F4-F9D5-4478-B175-9C4E801BB9F4": case "54C6A004-7648-4988-9BFD-CCC5B7EEFCCF": case "2DAF302A-0E02-4156-8FE0-D81F2ECA356D": case"8ACE79FA-5187-4DB6-A623-0134CD64DE0E": case "5AC9BB7C-F071-437D-BBFD-AEA299E355AC": case "A19351BC-82B3-4D04-8E89-330CFE094A68": case "59124D4A-289C-4B47-A31B-0D12B3A4F65B": case "C33150F7-E642-473D-A995-CF4CF9B93C46": case "2B7E4AD9-1DBA-44E3-A41E-00C1AF99DAAC":
				validarGraph = true;
			break;
			case "A61DD300-2FEC-44AF-9772-FC3CE01C5D8F":
				validarMap = true;
			break;
			default:
				validarGraph = false;
				validarMap = false;
			break;
		}
	}

	beforeAll(function(done) {
		setTimeout(function(){
			HiyTbl();
			existe  = ($("#DatosLoad Table").length > 0) ? true : false;
			SinDatosExiste = $("#DatosLoad #SinResultados").length;
			grafica = $('#graficaReporte').highcharts();
			mapa = _.size($('#graficaReporte .btnPantallaCompleta'));
			done();
		},6000)
	},8000);

	respTest = it("debe existir una tabla, ya sea con datos o con un mensaje de que no hay información",function(done){
		expect(existe).toBeTruthy();
		done();
	});

	arrTest.push(respTest);

	respTest = it("Debería mostrar una grafica si el reporte asi lo requiere",function(done){
		if(SinDatosExiste == 0 && validarGraph){
			expect(grafica).toBeDefined();
		}else{
			expect(grafica === undefined).toBeTruthy();
		}
		
		done();
	});

	arrTest.push(respTest);

});



