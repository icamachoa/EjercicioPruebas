//[session.idusuario|Untyped,session.idempresa|Untyped,session.convertcode|Untyped,session.nombre|Untyped,session.apellidos|Untyped,session.iniciales|Untyped,canalizarprospecto|Integer,idpeticion|Text,idprospecto|Integer,idejecutivo|Integer,lttemplatesoportunidad|Text,ltconceptotemplatesoportunidad|Text,ltmontotemplatesoportunidad|Text,ltcertezatemplatesoportunidad|Text,session.db|Untyped,tkp|Text,]
--INSERT
/*PROTEGIDO*/
DECLARE @IDPETICION VARCHAR(MAX)
DECLARE @IDUSUARIO INT, @IDEMPRESA INT, @CONVERTCODE INT, @IDPROSPECTO INT, @IDEJECUTIVOREASIGNAR INT, @CANALIZAR INT
DECLARE @LtTemplatesOportunidad VARCHAR(MAX), @LtConceptoTemplatesOportunidad VARCHAR(MAX), @USRCANALIZO VARCHAR(MAX)
DECLARE @LtMontoTemplatesOportunidad VARCHAR(MAX), @LtCertezaTemplatesOportunidad VARCHAR(MAX)
DECLARE @TKP VARCHAR(1000)


SET @IDUSUARIO = CAST('<#SESSION.IDUSUARIO/>' AS INT)
SET @IDEMPRESA = CAST('<#SESSION.IDEMPRESA/>' AS INT) 
SET @CONVERTCODE = CAST('<#SESSION.CONVERTCODE/>' AS INT)
SET @USRCANALIZO = '<#SESSION.NOMBRE/> <#SESSION.APELLIDOS/> (<#SESSION.INICIALES/>)'

SET @CANALIZAR = ISNULL(:CanalizarProspecto,0)
SET @IDPETICION = ISNULL(:IDPETICION,'') 
SET @IDPROSPECTO = ISNULL(:IDPROSPECTO,0) 
SET @IDEJECUTIVOREASIGNAR = ISNULL(:IDEJECUTIVO,0)

SET @LtTemplatesOportunidad = :LtTemplatesOportunidad
SET @LtConceptoTemplatesOportunidad = :LtConceptoTemplatesOportunidad
SET @LtMontoTemplatesOportunidad = :LtMontoTemplatesOportunidad
SET @LtCertezaTemplatesOportunidad = :LtCertezaTemplatesOportunidad

SET @TKP = ISNULL(:TKP,'')
IF @TKP != '' BEGIN SET @IDPROSPECTO = CAST(<#SESSION.DB/>.dbo.obtieneIdProspecto(@TKP, @IDEMPRESA) AS VARCHAR(MAX)) END

IF @LtTemplatesOportunidad != '' OR @LtTemplatesOportunidad IS NOT NULL
BEGIN
	 EXEC <#SESSION.DB/>.dbo.SP_CREA_OPORTUNIDADES_RAPIDAS @IDUSUARIO, @IDEMPRESA, @CONVERTCODE, 
	 @IDPROSPECTO, @IDPETICION, @LtTemplatesOportunidad, @LtConceptoTemplatesOportunidad, @LtMontoTemplatesOportunidad, 
	 @LtCertezaTemplatesOportunidad, @IDEJECUTIVOREASIGNAR
	 
	 IF @CANALIZAR = 1 
	 BEGIN
	 	  UPDATE <#SESSION.DB/>.dbo.OPORTUNIDADES SET USRCANALIZO = @USRCANALIZO, CANALIZADOEL = GETDATE() WHERE IDPROSPECTO = @IDPROSPECTO  AND USRCANALIZO IS NULL
	 END
END

