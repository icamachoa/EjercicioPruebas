<% 
Dim filesys, drv, drvcoll, drvlist, vol

Set filesys = CreateObject("Scripting.FileSystemObject")
Set drvcoll = filesys.Drives
	
	For Each drv in drvcoll
		drvlist = drvlist & drv.DriveLetter
			If drv.IsReady Then
				vol = drv.VolumeName
			End If
			
	
	if drv.DriveLetter = "Z" then
			Response.Write drv.DriveLetter &" Esta montada <BR/>" 
			else
			Response.Write drv.DriveLetter &" No Esta montada <BR/>"
			end if
			
					
			
			
		drvlist = drvlist & vol & ", "
	Next
	
Response.Write "Unidades Montadas " & drvlist
%>
