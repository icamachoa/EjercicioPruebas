//[e|Text,error|Text,s|Text,]
--insert 
/*PROTEGIDO*/
/*
DECLARE @ERROR VARCHAR(MAX), @INFO VARCHAR(MAX), @SERVIDOR VARCHAR(MAX)
SET @INFO = ISNULL(:e,'')
SET @ERROR = ISNULL(:error,'')
SET @SERVIDOR = ISNULL(:S,'')
INSERT INTO SALESUP_CT.dbo.JAVASCRIPT (INFO, ERROR, SERVIDOR)
VALUES (@INFO, @ERROR, @SERVIDOR)
*/