//[idlogfile|Integer,]

select *,( CASE WHEN origen = 1 THEN 'SOCRATES' ELSE 'PLATON' END) as server,substring(contenido,1,50)+'...' as contenido_corto from dbspweb.dbo.log_files where idlogfile=:idlogfile