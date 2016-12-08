<%
Dim NomArch
Dim RutaArch
Dim Origen
Dim Folder
NomArch = Request.QueryString("Archivo")
Folder = Request.QueryString("Folder")
if NomArch <> "" then
Set fso = CreateObject("Scripting.FileSystemObject") 






if fso.FolderExists("r:\documentos")=false then
    Dim WinExec, objFSO, WshShell, WSHNetwork
     
    Set WSHNetwork = CreateObject("WScript.Network")
    Set WinExec = CreateObject("WScript.Shell")
    WSHNetwork.MapNetworkDrive "r:", "\\10.0.0.57\FileRepository","False","dominio\salesup","Jalcomulco01"
end if



RutaArch = "z:\documentos\" & Folder & "\"

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




