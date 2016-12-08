<!--#include file="INIFile.asp"-->
<%
Dim ARCHIVO
Dim TIPODOC
Dim CARPETA

ARCHIVO = Request.QueryString("Archivo")
CARPETA = Request.QueryString("Folder")
TIPODOC= Request.QueryString("Tipo")

if ARCHIVO <> "" and CARPETA <> "" and TIPODOC <> "" then

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
	
	cmd.CommandText = "EXEC SALESUP_CT.DBO.SP_ELIMINA_DOC '"&TIPODOC&"', '" & CARPETA &"', '" & ARCHIVO & "' " 
	Set rs = cmd.execute
	Response.write "EXEC SALESUP_CT.DBO.SP_ELIMINA_DOC '"&TIPODOC&"', '" & CARPETA &"', '" & ARCHIVO & "' "
else 
		Response.write "falta uno "
end if
%>
