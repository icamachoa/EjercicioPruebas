//[session.idempresa|Untyped,idemail|Integer,session.db|Untyped,]
--select
 
	declare @tabla as table (id int identity, adjunto varchar(1000))
	declare @idemail int
	declare @idempresa int
	declare @adjuntos varchar(max)
	set @idempresa=cast('<#session.idempresa/>' as int)
	set @idemail=ISNULL(:IDEMAIL,0)
	select @adjuntos=isnull(anexos,'') from <#SESSION.DB/>.DBO.usuarios_emails where IDEMAIL=@idemail
	insert into @tabla (adjunto)
	select ltrim(rtrim(replace(replace(SplitValue,CHAR(10),''),CHAR(13),''))) from <#SESSION.DB/>.DBO.Split(@adjuntos,CHAR(13))
	
	select lower(<#SESSION.DB/>.DBO.NOMBRE_ARCHIVO_REAL_PROSPECTOS(adjunto)) as adjuntoreal, 
	'https://fenix.salesup.com.mx/aws/obtieneArchivo.php?idempresa='+cast(@idempresa as varchar(1000))+'&archivo='+
	reverse(substring(reverse(adjunto),0,charindex('/',reverse(adjunto)))) as adjuntolink,
	SALESUP_CT.DBO.IconoArchivo (adjunto,0) AS ICONO     ,  SALESUP_CT.DBO.SoloIconoArchivo (adjunto,0) AS SOLOICONO ,@idemail AS idemail,
	  CASE <#SESSION.DB/>.DBO.obtiene_extension(adjunto)
	  WHEN 'png' THEN 1
	  WHEN 'jpg' THEN 1   
	  WHEN 'jpeg' THEN 1
	  WHEN 'bmp' THEN 1
	  WHEN 'pdf' THEN 1
	  WHEN 'txt' THEN 1
	  WHEN 'xls' THEN 1
	  WHEN 'xlsx' THEN 1
	  WHEN 'ppt' THEN 1
	  WHEN 'pptx' THEN 1
	  else 0 end VERARCHIVO from @tabla where adjunto like '/%' 