//[]
-- select * from EMPRESAS_fases where IDEMPRESA=<#SESSION.IDEMPRESA/> order by orden
select count(*) as totaln from  <#SESSION.DB/>.DBO.OPORTUNIDADES_FASES 
where IDEMPRESA=<#SESSION.IDEMPRESA/>
