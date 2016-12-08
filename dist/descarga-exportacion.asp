<!--#include file="INIFile.asp"-->
<%
Dim ARCHIVO
Dim RutaArch
Dim Origen

Dim fichero
Dim CARPETA1
Dim CARPETA2

set fso=nothing
set fichero=nothing 
 
ARCHIVO = Request.QueryString("Archivo")
CARPETA1 = "exporta"
CARPETA2 = "archivos"
if ARCHIVO <> "" then

	Set fso = CreateObject("Scripting.FileSystemObject") 
	
	Dim User
	Dim Pwd 
	Dim Host
	User =  GetINIString("SALESUPXP", "User_Name", "-", "")
	Pwd =  GetINIString("SALESUPXP", "Password", "-", "")
	Host =  GetINIString("SALESUPXP", "HostName", "-", "") 
	Dim DBName
	Dim Usuario
	
	Usuario = Request.QueryString("Usuario")
	DBName = Request.QueryString("DBName")
	
	set conn = Server.CreateObject("ADODB.Connection")
	set cmd = Server.CreateObject("ADODB.Command")
	sConnString = "Provider=SQLOLEDB.1;User ID="&User&";password="&Pwd&";Initial Catalog="&DBName&";Data Source = "&Host
	'Response.Write sConnString
	Conn.Open sConnString
	Set cmd.ActiveConnection = Conn
	
	cmd.CommandText = "EXEC SALESUP_CT.DBO.SP_DESCARGA_DOC '"&CARPETA1&"', '" & CARPETA2 &"', '" & ARCHIVO & "' " 
	'Set rs = cmd.execute
	'Response.write "EXEC SALESUP_CT.DBO.SP_DESCARGA_DOC '"&CARPETA1&"', '" & CARPETA2 &"', '" & ARCHIVO & "' "
	    	 	


RutaArch = "C:\FileRepository\exporta\archivos\"


Set fichero = fso.GetFile(RutaArch & ARCHIVO)  


response.contentType = "application/x-unknown" 
response.addHeader "Content-Disposition", "attachment; filename=" & chr(34) & ARCHIVO & chr(34) 
response.BinaryWrite getBinaryFile(RutaArch & ARCHIVO)



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
	
cmd.CommandText = "EXEC SALESUP_CT.DBO.SP_ELIMINA_DESCARGA_DOC '" & ARCHIVO & "' " 
'Set rs = cmd.execute

	 
set fso=nothing
set fichero=nothing
 
end if
%>
