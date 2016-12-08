//[session.idempresa|Untyped,tconsulta|Integer,session.db|Untyped,]
--select
DECLARE @IDEMPRESA INT, @tConsulta INT
SET @IDEMPRESA = <#SESSION.IDEMPRESA/>
SET @tConsulta = CAST(ISNULL(:tConsulta,0) AS INT)

IF @tConsulta = 1
BEGIN
	 SELECT IdTitulo as value, Titulo as Opcion FROM <#SESSION.DB/>.DBO.EMPRESAS_TITULOS WHERE IDEMPRESA = @IDEMPRESA
END
ELSE
BEGIN
	 SELECT 1 as R, IdTitulo, Titulo FROM <#SESSION.DB/>.DBO.EMPRESAS_TITULOS WHERE IDEMPRESA = @IDEMPRESA 
END
