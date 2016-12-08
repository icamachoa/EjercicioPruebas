<%
Dim NomArch
Dim RutaArch
Dim mes
Dim anio

set fso=nothing
set fichero=nothing 

NomArch = Request.QueryString("archivo")
mes = Request.QueryString("mes")
anio = Request.QueryString("anio")

if NomArch <> "" then
 RutaArch = "C:\inbox\adjuntos\" & anio & "\" & mes & "\"
 response.contentType = "application/x-unknown" 
 response.addHeader "Content-Disposition", "attachment; filename=" & chr(34) & NomArch& chr(34) 
 response.BinaryWrite getBinaryFile(RutaArch & NomArch )


	function getBinaryFile(fileSpec) 
	   Dim adTypeBinary 
	   adTypeBinary = 1 
	   Dim oStream 
	   set oStream = server.createobject("ADODB.Stream") 
	   oStream.Open 
	   oStream.Type = adTypeBinary 
	   oStream.LoadFromFile fileSpec 
	   getBinaryFile = oStream.read 
	   set oStream = Nothing 
	end function
	
	 
  set fso=nothing
  set fichero=nothing
 
end if
%>




