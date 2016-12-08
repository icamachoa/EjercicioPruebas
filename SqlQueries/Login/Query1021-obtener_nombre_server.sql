//[db|Text,]
--select
/*PROTEGIDO*/
/*SEP2015*/
DECLARE @DB VARCHAR(100)
SET @DB = ISNULL(:DB,'')
select 'https://'+lower(servidor)+'.salesup.com.mx/privado/inicializacion.dbsp'  as server from control.control.dbo.bases_conteo where data_base like @DB