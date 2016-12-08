//[idoportunidad|Integer,idventa|Integer,session.db|Untyped,session.idempresa|Untyped,tko|Text,]
--SELECT
/*PROTEGIDO*/
/*SEP2015*/
declare @idoportunidad int
set @idoportunidad = ISNULL(:IDOPORTUNIDAD,0)
declare @tko varchar(max)
set @tko = isnull(:tko,'')
if @tko !='' begin set @idoportunidad = <#SESSION.DB/>.DBO.ObtieneIdOportunidad(@tko) end

SELECT O.IDPROSPECTO, o.IDOPORTUNIDAD AS IDOPORTUNIDAD, O.IDPROSPECTO AS IDPROSPECTOD,  ISNULL(:IDVENTA,0) AS IDVENTA, p.tkp , o.tko, '' as tkv
FROM <#SESSION.DB/>.DBO.OPORTUNIDADES O 
LEFT JOIN <#SESSION.DB/>.DBO.PROSPECTOS P ON O.IDPROSPECTO = P.IDPROSPECTO
WHERE O.IDOPORTUNIDAD = @idoportunidad AND P.IDEMPRESA = <#SESSION.IDEMPRESA/>