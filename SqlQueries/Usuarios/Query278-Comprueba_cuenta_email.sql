//[email|Text,idu|Integer,]
--SELECT 
/*PROTEGIDO*/
/*SEP2015*/
DECLARE @EMAIL VARCHAR(MAX)
DECLARE @IdU INT
SET @EMAIL = ISNULL(:EMAIL,'')
SET @IdU =  ISNULL(:IdU,0)
select count(*) as Existe, IDUSUARIO AS EL_IDUSER 
from CONTROL.CONTROL.DBO.usuarios 
where email = @EMAIL and idusuario <> @IdU
group by idusuario