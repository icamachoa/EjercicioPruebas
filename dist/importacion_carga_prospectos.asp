<!--#include file="INIFile.asp"-->
<% 
 
    function isReallyNumeric(str) 
	    str = Trim(str)
        isReallyNumeric = true 
        for i = 1 to len(str) 
            d = mid(str, i, 1) 
            if asc(d) < 48 OR asc(d) > 57 then 
                isReallyNumeric = false 
                exit for 
            end if 
        next 
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
tit = Request.QueryString("tit")
Usuario = Request.QueryString("Usuario")
DBName = Request.QueryString("DBName")
cargaConfig = Request.QueryString("cargaConfig")

set conn = Server.CreateObject("ADODB.Connection")
set cmd = Server.CreateObject("ADODB.Command")
sConnString = "Provider=SQLOLEDB.1;User ID="&User&";password="&Pwd&";Initial Catalog="&DBName&";Data Source = "&Host
'Response.Write sConnString
Conn.Open sConnString
Set cmd.ActiveConnection = Conn
cmd.CommandText = "delete from prospectos_importacion  where idusuario = "&Usuario
Set rs = cmd.execute
'Response.Write rs
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

	Set fso = CreateObject("Scripting.FileSystemObject") 
	Set fichero = fso.GetFile( Filename)  
	Set oStream = fichero.OpenAsTextStream(ForReading, TristateUseDefault)
    NumLinea=0
	Cols = 0
	Dim ArrDatos() 
	Dim ArrCampos() 
	ReDim ArrDatos(0)
	ReDim ArrCampos(0)
   Do While Not oStream.AtEndOfStream
    NumLinea = NumLinea +1
    str=oStream.ReadLine
    splitstr=""
    if InStr(str, ";") <> 0 then
		splitstr=";"
    elseif InStr(str, ",") <> 0 then
		splitstr=","
    end if
	str = Replace(str, "'", "")
	str = Replace(str, "$", "")
	str = Replace(str, chr(13), "")
	str = Replace(str, chr(10), "")
	str = Replace(str, chr(34), "")


    linea = split(str,splitstr)     
	if NumLinea = 1 then
		Cols = uBound(linea)
		ReDim Preserve ArrDatos(Cols)
		ReDim Preserve ArrCampos(Cols)
	end if
	

       if Len(Trim(str))>Cols  then
	if Cols>0 then
	if (uBound(linea)=Cols) then
		for i=0 to Cols
			ArrCampos(i)  = "COL"&i+1
			ArrDatos(i) = Trim(linea(i))
		next
		ValCampos =""
		For Each item In ArrCampos
			ValCampos = ValCampos&","&item 
		Next
		ValDatos =""
		For Each item In ArrDatos
			ValDatos = ValDatos&","&"'"&item&"'"
		Next
	
		SQL = " INSERT INTO PROSPECTOS_IMPORTACION (IDUSUARIO"&ValCampos&") VALUES("&Usuario&ValDatos&")"
		
        'Response.Write  SQL&"<br />"
		cmd.CommandText = SQL
		Set rs = cmd.execute
	end if
        end if
	end if
   Loop
   Response.Write  "Listo"

   oStream.Close 

 '  Set oFile = oFS.GetFile(NomArch)
  
 
   



%>
<script> document.location = 'importacion_config.dbsp?archivo=<% Response.write NomArch %>&tit=<% Response.write tit %>&cargaConfig=<% Response.write cargaConfig %>';</script>

