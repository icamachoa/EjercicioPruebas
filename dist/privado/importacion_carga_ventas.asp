<!--#include file="INIFile.asp"-->
<% 
 
    function isReallyNumerics(str) 
	    str = Trim(str)
        isReallyNumeric = true 
Response.Write  str
        for i = 1 to len(str) 
            d = mid(str, i, 1) 
            if asc(d) < 48 OR asc(d) > 57 then 
                isReallyNumeric = false 
                exit for 
            end if 
        next 
    end function 

	function isReallyNumeric(str) 
	  	str = Trim(str)
		isReallyNumeric = IsNumeric(str)
 	end function



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
CampoLlave = Request.QueryString("CampoLlave")
Usuario = Request.QueryString("Usuario")
DBName = Request.QueryString("DBName")
idlinea = Request.QueryString("idlinea")

set conn = Server.CreateObject("ADODB.Connection")
set cmd = Server.CreateObject("ADODB.Command")
sConnString = "Provider=SQLOLEDB.1;User ID="&User&";password="&Pwd&";Initial Catalog="&DBName&";Data Source = "&Host
'Response.Write Host 
'Response.Write sConnString
Conn.Open sConnString
Set cmd.ActiveConnection = Conn
cmd.CommandText = "delete from ventas_importacion  "
Set rs = cmd.execute
'Response.Write cmd.CommandText 
Dim NomArch
NomArch = Request.QueryString("archivo")

Dim Filename 
Filename = "C:\sitios\SalesUp\importacion\" & NomArch   
  Const ForReading = 1
   Const ForWriting = 2
   Const ForAppending = 8
   Const TristateUseDefault = -2
   Const TristateTrue = -1
   Const TristateFalse = 0
   Dim IDProspecto

   Dim oFS
   Dim oFile
   Dim oStream 

'Response.Write Filename 
 

Set fso = CreateObject("Scripting.FileSystemObject") 
Set fichero = fso.GetFile( Filename)  
Set oStream = fichero.OpenAsTextStream(ForReading, TristateUseDefault)

   Do While Not oStream.AtEndOfStream
    str=oStream.ReadLine
    splitstr=""
    if InStr(str, ";") <> 0 then
		splitstr=";"
    elseif InStr(str, ",") <> 0 then
		splitstr=","
    end if
	str = Replace(str, "'", "")
	str = Replace(str, "$", "")
    linea = split(str,splitstr)     
	Dim llave
	Dim fecha
	Dim monto
	Dim comision
	Dim saldo
	Dim concepto
	if (uBound(linea)=5) then
	    IDProspecto = 0
		monto    = 0
		comision = 0
		saldo    = 0
		llave    = Trim(linea(0))
		fecha    = Trim(linea(1))
		if isReallyNumeric(linea(2)) then
			monto    = Trim(linea(2))
		end if
		if isReallyNumeric(linea(3)) then
			comision = Trim(linea(3))
		end if
		if isReallyNumeric(linea(4)) then
			saldo    = Trim(linea(4))
		end if
		concepto = Trim(linea(5))
		SQL = "SELECT TOP 1 IDPROSPECTO FROM USUARIOS  U, PROSPECTOS P WHERE U.IDEMPRESA = P.IDEMPRESA AND U.IDUSUARIO  ="&Usuario&" AND "&CampoLlave&" = '"&llave&"' ORDER BY DESCARTADO,  FECHA_ULTIMOSEGUIMIENTO DESC"
		cmd.CommandText = SQL
		'Response.Write  SQL&"<br />"
		Set rs = cmd.execute
		
		Do While Not rs.EOF
			IDProspecto =  rs(0)
   			rs.MoveNext	
		Loop

		SQL = " INSERT INTO VENTAS_IMPORTACION (IDUSUARIO, CAMPOLLAVE, FECHA, MONTO, COMISION, SALDO, CONCEPTO, IDPROSPECTO,IDLINEA)"
		SQL = SQL&" VALUES ("&Usuario&", '"&llave&"', CONVERT(DATETIME, '"&fecha&"', 103), "&monto&", "&comision&", "&saldo&",LEFT('"&concepto&"',123), "&IDProspecto&","&idlinea&") "

        	'Response.Write  isReallyNumeric(linea(2))&"<br />"
		cmd.CommandText = SQL
		Set rs = cmd.execute
	end if
   Loop

   Response.Write  "Listo"

   oStream.Close 

 '  Set oFile = oFS.GetFile(NomArch)
  
 
   



%>
<script> document.location = 'importacion_ventas_config.dbsp';</script>


