<% 
 Dim IDEMPRESA
 IDEMPRESA =  Request.QueryString("idempresa")
 Dim LOGO
   LOGO= "sinlogo.jpg"
  Set fso = CreateObject("Scripting.FileSystemObject") 
  if fso.FileExists("C:\sitios\SalesUp\sitio\logos\logo"&IDEMPRESA&".png")=true then
     LOGO= "logo"&IDEMPRESA&".png"
  ElseIf fso.FileExists("C:\sitios\SalesUp\sitio\logos\logo"&IDEMPRESA&".jpg")=true then 
       LOGO= "logo"&IDEMPRESA&".jpg"
  end if    
    
  
response.ContentType = "image/gif"  
'response.write "/logos/"&LOGO&"_"&"C:\sitios\SalesUp\sitio\logo"&IDEMPRESA&".jpg"
Server.Execute("/logos/"&LOGO)
%>
