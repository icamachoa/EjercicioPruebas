<%
Dim NomArch
Dim RutaArch
Dim Origen
Dim Folder

    
dim fs
set fs=Server.CreateObject("Scripting.FileSystemObject")
if fs.FolderExists("r:\documentos")=true then
  response.write("r: si existe")
else
    Dim WinExec, objFSO, WshShell, WSHNetwork
     
    Set WSHNetwork = CreateObject("WScript.Network")
    Set WinExec = CreateObject("WScript.Shell")
     
    WSHNetwork.MapNetworkDrive "r:", "\\10.0.0.57\FileRepository","False","dominio\salesup","Jalcomulco01"
     
    WinExec.NameSpace("r:").Self.Name = "rep"
    Wscript.Sleep 3000
 response.write("r: no existe!")
end if
set fs=nothing

NomArch = "12-201201260828495G-icon-email-preview.png"
Folder = "000004"
if NomArch <> "" then
Set fso = CreateObject("Scripting.FileSystemObject") 
RutaArch = "r:\documentos\" & Folder & "\"
Response.Write RutaArch & NomArch
Set fichero = fso.GetFile(RutaArch & NomArch)  
response.contentType = "application/x-unknown" 
response.addHeader "Content-Disposition", "attachment; filename=" & chr(34) & NomArch & chr(34) 
response.BinaryWrite getBinaryFile(RutaArch & NomArch)
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
end if


%> 
<script language="javascript">
  document.close();
</script>
