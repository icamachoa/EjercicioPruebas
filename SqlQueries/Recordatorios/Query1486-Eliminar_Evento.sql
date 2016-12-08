//[id|Integer,tipoevento|Integer,tipoeliminacion|Integer,idinvitado|Integer,session.db|Untyped,]
--insert
DECLARE @ID INT
DECLARE @TIPOEVENTO INT
DECLARE @TipoEliminacion INT
DECLARE @IdInvitado INT

SET @ID=CAST(ISNULL(:ID,0) AS INT)
SET @TIPOEVENTO=CAST( ISNULL(:TipoEVENTO,0) AS INT) 
SET @TipoEliminacion=CAST( ISNULL(:TipoEliminacion,0) AS INT) 
SET @IdInvitado=CAST( ISNULL(:IDINVITADO,0) AS INT)
EXEC <#SESSION.DB/>.DBO.SP_ELIMINA_EVENTO @ID, @TIPOEVENTO, @TIPOELIMINACION,@IdInvitado