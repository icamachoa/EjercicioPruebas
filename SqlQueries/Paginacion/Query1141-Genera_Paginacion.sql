//[r|Integer,t|Integer,p|Integer,]
--select
DECLARE @RegXPag INT, @TotalReg INT, @PagAct INT

SET @RegXPag = CAST(ISNULL(:R,0) AS INT) 
SET @TotalReg = CAST(ISNULL(:T,0) AS INT)
SET @PagAct = CAST(ISNULL(:P,0) AS INT)

SELECT SALESUP_CT.dbo.GeneraPaginacion(@RegXPag, @TotalReg, @PagAct) AS PAGINACION
