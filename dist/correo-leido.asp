<!--#include file="privado/INIFile.asp"-->
<% 
 Dim User
 Dim Pwd 
 Dim Host
 User =  GetINIString("SALESUPXP", "User_Name", "-", "")
 Pwd =  GetINIString("SALESUPXP", "Password", "-", "")
 Host =  GetINIString("SALESUPXP", "HostName", "-", "") 

 Dim DBName
 Dim Usuario
 Dim SQL
 Dim CampoLlave
 idemail = Request.QueryString("idemail")
 db = Request.QueryString("db")
 


if db = "SALESUP_DB7" OR db = "SALESUP_DB8" OR db = "SALESUP_DB12" then
  Host = "69.64.71.61"
end if

if db = "SALESUP_DB4" OR db = "SALESUP_DB5"  OR db = "SALESUP_DB6" then
  Host = "216.55.143.97"
end if

if db = "SALESUP_CONTPAQI" OR db = "SALESUP_CONTPAQI2"  OR db = "SALESUP_CONTPAQI3"  then
  Host = "69.64.69.75"
end if


if db = "SALESUP_DB9" OR db = "SALESUP_DB10"  OR db = "SALESUP_DB11" then
  Host = "69.64.64.93"
end if


if db = "SALESUP_CONTPAQICRMDB1" OR db = "SALESUP_CONTPAQICRMDB2" OR db = "SALESUP_CONTPAQICRMDB3" then
  Host = "69.64.83.34"
end if

if db = "SALESUP_DB13" OR db = "SALESUP_DB14" OR db = "SALESUP_DB15" then
  Host = "64.150.191.147"
end if

if db = "SALESUP_VIPDB1" OR db = "SALESUP_VIPDB2" OR db = "SALESUP_VIPDB3" OR db = "SALESUP_VIPDB4" then
  Host =  "64.150.191.117"
end if

set conn = Server.CreateObject("ADODB.Connection")
set cmd = Server.CreateObject("ADODB.Command")
sConnString = "Provider=SQLOLEDB.1;User ID="&User&";password="&Pwd&";Initial Catalog="&db&";Data Source = "&Host
'Response.Write sConnString
Conn.Open sConnString
Set cmd.ActiveConnection = Conn
SQL = "UPDATE "&db&".dbo.USUARIOS_EMAILS  WITH(ROWLOCK) SET FECHALEIDO =  GETDATE() WHERE FECHALEIDO IS NULL AND IDEMAIL = "&idemail
cmd.CommandText = SQL
Set rs = cmd.execute
'response.write  SQL
response.ContentType = "image/gif"  %>
<!--#include virtual="/estilos/vacio.png" -->  



