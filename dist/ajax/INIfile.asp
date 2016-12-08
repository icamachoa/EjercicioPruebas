<% 
Sub WriteINIStringVirtual(Section, KeyName, Value, FileName)
  WriteINIString Section, KeyName, Value, _
    Server.MapPath(FileName)
End Sub
Function GetINIStringVirtual(Section, KeyName, Default, FileName)
  GetINIStringVirtual = GetINIString(Section, KeyName, Default, _
    Server.MapPath(FileName))
End Function 

'Work with INI files In VBS (ASP/WSH)
'v1.00
'2003 Antonin Foller, PSTRUH Software, http://www.motobit.com
'Function GetINIString(Section, KeyName, Default, FileName)
'Sub WriteINIString(Section, KeyName, Value, FileName)

Sub WriteINIString(Section, KeyName, Value, FileName)
  Dim INIContents, PosSection, PosEndSection
  
  'Get contents of the INI file As a string
  INIContents = GetFile("C:\dbsp\bin\dbsp.dbc")

  'Find section
  PosSection = InStr(1, INIContents, "[" & Section & "]", vbTextCompare)
  If PosSection>0 Then
    'Section exists. Find end of section
    PosEndSection = InStr(PosSection, INIContents, vbCrLf & "[")
    '?Is this last section?
    If PosEndSection = 0 Then PosEndSection = Len(INIContents)+1
    
    'Separate section contents
    Dim OldsContents, NewsContents, Line
    Dim sKeyName, Found
    OldsContents = Mid(INIContents, PosSection, PosEndSection - PosSection)
    OldsContents = split(OldsContents, vbCrLf)

    'Temp variable To find a Key
    sKeyName = LCase(KeyName & "=")

    'Enumerate section lines
    For Each Line In OldsContents
      If LCase(Left(Line, Len(sKeyName))) = sKeyName Then
        Line = KeyName & "=" & Value
        Found = True
      End If
      NewsContents = NewsContents & Line & vbCrLf
    Next

    If isempty(Found) Then
      'key Not found - add it at the end of section
      NewsContents = NewsContents & KeyName & "=" & Value
    Else
      'remove last vbCrLf - the vbCrLf is at PosEndSection
      NewsContents = Left(NewsContents, Len(NewsContents) - 2)
    End If

    'Combine pre-section, new section And post-section data.
    INIContents = Left(INIContents, PosSection-1) & _
      NewsContents & Mid(INIContents, PosEndSection)
  else'if PosSection>0 Then
    'Section Not found. Add section data at the end of file contents.
    If Right(INIContents, 2) <> vbCrLf And Len(INIContents)>0 Then 
      INIContents = INIContents & vbCrLf 
    End If
    INIContents = INIContents & "[" & Section & "]" & vbCrLf & _
      KeyName & "=" & Value
  end if'if PosSection>0 Then
  WriteFile FileName, INIContents
End Sub

Function GetINIString(Section, KeyName, Default, FileName)
  Dim INIContents, PosSection, PosEndSection, sContents, Value, Found
  
  'Get contents of the INI file As a string
  INIContents = GetFile("C:\dbsp\bin\dbsp.dbc")

  'Find section
  PosSection = InStr(1, INIContents, "[" & Section & "]", vbTextCompare)
  If PosSection>0 Then
    'Section exists. Find end of section
    PosEndSection = InStr(PosSection, INIContents, vbCrLf & "[")
    '?Is this last section?
    If PosEndSection = 0 Then PosEndSection = Len(INIContents)+1
    
    'Separate section contents
    sContents = Mid(INIContents, PosSection, PosEndSection - PosSection)

    If InStr(1, sContents, vbCrLf & KeyName & "=", vbTextCompare)>0 Then
      Found = True
      'Separate value of a key.
      Value = SeparateField(sContents, vbCrLf & KeyName & "=", vbCrLf)
    End If
  End If
  If isempty(Found) Then Value = Default
  GetINIString = Value
End Function

'Separates one field between sStart And sEnd
Function SeparateField(ByVal sFrom, ByVal sStart, ByVal sEnd)
  Dim PosB: PosB = InStr(1, sFrom, sStart, 1)
  If PosB > 0 Then
    PosB = PosB + Len(sStart)
    Dim PosE: PosE = InStr(PosB, sFrom, sEnd, 1)
    If PosE = 0 Then PosE = InStr(PosB, sFrom, vbCrLf, 1)
    If PosE = 0 Then PosE = Len(sFrom) + 1
    SeparateField = Mid(sFrom, PosB, PosE - PosB)
  End If
End Function


'File functions
Function GetFile(ByVal FileName)
  Dim FS: Set FS = CreateObject("Scripting.FileSystemObject")
  'Go To windows folder If full path Not specified.
  If InStr(FileName, ":\") = 0 And Left (FileName,2)<>"\\" Then 
    FileName = FS.GetSpecialFolder(0) & "\" & FileName
  End If
  On Error Resume Next

  GetFile = FS.OpenTextFile(FileName).ReadAll
End Function

Function WriteFile(ByVal FileName, ByVal Contents)
  
  Dim FS: Set FS = CreateObject("Scripting.FileSystemObject")
  'On Error Resume Next

  'Go To windows folder If full path Not specified.
  If InStr(FileName, ":\") = 0 And Left (FileName,2)<>"\\" Then 
    FileName = FS.GetSpecialFolder(0) & "\" & FileName
  End If

  Dim OutStream: Set OutStream = FS.OpenTextFile(FileName, 2, True)
  OutStream.Write Contents
End Function

%>

