<%
'Response.ContentType = "application/vnd.ms-excel"

Function BinaryToStringStream(byref Binary)
            dim strString
            strString = ""
    const adTypeText = 2
    const adTypeBinary = 1
    dim oStream
    set oStream = Server.CreateObject("ADODB.Stream")
    with oStream
                        on error resume next
        .Type = adTypeBinary
        .Open
        .Write Binary
        .Position = 0
        .Type = adTypeText
        .CharSet = "us-ascii"
        if err.number = 0 then strString = .ReadText
        if .State = 1 then .Close
        err.Clear
    end with
    BinaryToStringStream = strString
End Function
function GetFormVariableData
            dim binData, strData
            binData = Request.BinaryRead(Request.TotalBytes)
            strData = BinaryToStringStream(binData)
            GetFormVariableData = strData
end function
function GetFormRequestBoundry
            dim strBoundry, lPosition
            strBoundry = Request.ServerVariables("HTTP_CONTENT_TYPE")
            lPosition = instr(1,strBoundry,"boundary=") + len("boundary=")
            GetFormRequestBoundry = mid(strBoundry,lPosition)
end function
function ArrayFormRequestData
            dim strData
            strData = GetFormVariableData
            dim strBoundry
            strBoundry = GetFormRequestBoundry
            ArrayFormRequestData = split(strData,"" & strBoundry)
end function
dim arrAllFormData
sub PullFormData
            ' pulls in form data if a form is passed by multipart/form-data
            ' which allows form variables to be used with file controls
            ' Returns a single dimensional array, each element contains
            ' a separate 4 dim array within which are:
            ' 0 : variable name
            ' 1 : variable value
            ' 2 : boolean contains a file element 1 would be the text contents thereof
            ' 3 : file name passed
            dim arrData
            dim strData, strName, strValue, bIsFile, strFileName
            dim processedSubData, arrOut(), counterArray
            arrData = ArrayFormRequestData
            counterArray = -1
            if isarray(arrData) then
                        for each subData in arrData
                                    processedSubData = ProcessFormRequestElement(subData)
                                    if isarray(processedSubData) then
                                                counterArray = counterArray + 1
                                                redim preserve arrOut(counterArray)
                                                arrOut(counterArray) = processedSubData
                                    end if
                        next
            end if
            if isarray(arrOut) then arrAllFormData = arrOut
end sub
function IterateAllFormElementNames
            if not isarray(arrAllFormData) then PullFormData
            dim arrOut(), counterOut
            if isarray(arrAllFormData) then
                        counterOut = -1
                        for each arrElement in arrAllFormData
                                    counterOut = counterOut + 1
                                    redim preserve arrOut(counterOut)
                                    arrOut(counterOut) = arrElement(0)
                        next
                        IterateAllFormElementNames = arrOut
            end if
end function
function FormDataElementInformation(strVariableName,strTypeOfData)
            if not isarray(arrAllFormData) then PullFormData
            dim elementNumberToPull,strOut
            select case lcase(strTypeOfData)
                        case "name" : elementNumberToPull = 0
                        case "value" : elementNumberToPull = 1
                        case "isfile" : elementNumberToPull = 2
                        case "filename" : elementNumberToPull = 3
            end select
            dim arrElement
            if isarray(arrAllFormData) then
                        for each arrElement in arrAllFormData
                                    if lcase(strVariableName) = lcase(arrElement(0)) then
                                                strOut = arrElement(elementNumberToPull)
                                                exit for
                                    end if
                        next
            else
                        strOut = ""
            end if
            FormDataElementInformation = strOut
end function
function ProcessFormRequestElement(strData)
            dim strName, strValue, bIsFile, strFileName
            dim arrLines, strLine
            arrLines = split(strData, vbCrLf)
            dim bContentTypeGiven, bPastFirstBlankDataLine, bNameFound
            bIsFile = false : bContentTypeGiven = false : bPastFirstLine = false : bNameFound = false
            strValue = "":strName = "":strValue="":strFileName=""
            bPastFirstBlankDataLine = false
            for each strLine in arrLines
                        if bPastFirstBlankDataLine then
                                    strValue = strValue & strLine & vbCrLf
                        else
                                    if bNameFound and not bIsFile then
                                                bPastFirstBlankDataLine = true
                                    elseif bNameFound and bIsFile and bContentTypeGiven then
                                                bPastFirstBlankDataLine = true
                                    elseif bIsFile and not bContentTypeGiven then
                                                bContentTypeGiven = left(strLine,len("Content-Type:")) = "Content-Type:"
                                    end if
                                    if left(strLine,len("Content-Disposition: form-data")) = "Content-Disposition: form-data" then
                                                if strName = "" then
                                                            strName = replace(FindValueInList(strLine,"name","; ","="),"""","",1,-1,1)
                                                            bNameFound = strName <> ""
                                                end if
                                                if strFileName = "" then
                                                            strFileName = FindValueInList(strLine,"filename","; ","=")
                                                            bIsFile = strFileName <> ""
                                                end if
                                    end if
                        end if
            next
            if right(strValue,len ("--" & vbCrLf)) = "--" & vbCrLf then
                        strValue = left(strValue, len(strValue) - len ("--" & vbCrLf))
            end if
            if right(strValue,len (vbCrLf)) = vbCrLf then
                        strValue = left(strValue, len(strValue) - len (vbCrLf))
            end if
            dim arrOut(3)
            if bNameFound then
                        arrOut(0) = strName
                        arrOut(1) = strValue
                        arrOut(2) = bIsFile
                        arrOut(3) = strFileName
                        ProcessFormRequestElement = arrOut
            end if
end function


Dim NombreTitulo
Dim Fecha
Dim SArchivo
Dim DArchivo

Dim csv_text_0 , csv_text_1 , csv_text_2 , csv_text_3 , csv_text_4 , csv_text_5 , csv_text_6 , csv_text_7 , csv_text_8 , csv_text_9 , csv_text_10
Dim csv_text_11 , csv_text_12 , csv_text_13 , csv_text_14 , csv_text_15 , csv_text_16 , csv_text_17 , csv_text_18 , csv_text_19
  
NombreTitulo = FormDataElementInformation("NombreTitulo", "value")
Fecha = FormDataElementInformation("Fecha", "value")

csv_text_0 = FormDataElementInformation("csv_text_0", "value")
csv_text_1 = FormDataElementInformation("csv_text_1", "value")
csv_text_2 = FormDataElementInformation("csv_text_2", "value")
csv_text_3 = FormDataElementInformation("csv_text_3", "value")
csv_text_4 = FormDataElementInformation("csv_text_4", "value")
csv_text_5 = FormDataElementInformation("csv_text_5", "value")
csv_text_6 = FormDataElementInformation("csv_text_6", "value")
csv_text_7 = FormDataElementInformation("csv_text_7", "value")
csv_text_8 = FormDataElementInformation("csv_text_8", "value")
csv_text_9 = FormDataElementInformation("csv_text_9", "value")
csv_text_10 = FormDataElementInformation("csv_text_10", "value")
csv_text_11 = FormDataElementInformation("csv_text_11", "value")
csv_text_12 = FormDataElementInformation("csv_text_12", "value")
csv_text_13 = FormDataElementInformation("csv_text_13", "value")
csv_text_14 = FormDataElementInformation("csv_text_14", "value")
csv_text_15 = FormDataElementInformation("csv_text_15", "value")
csv_text_16 = FormDataElementInformation("csv_text_16", "value")
csv_text_17 = FormDataElementInformation("csv_text_17", "value")
csv_text_18 = FormDataElementInformation("csv_text_18", "value")
csv_text_19 = FormDataElementInformation("csv_text_19", "value")

DArchivo = csv_text_0 & csv_text_1 & csv_text_2 & csv_text_3 & csv_text_4 & csv_text_5 & csv_text_6 & csv_text_7 & csv_text_8 & csv_text_9 & csv_text_10 & csv_text_11 & csv_text_12 & csv_text_13 & csv_text_14 & csv_text_15 & csv_text_16 & csv_text_17 & csv_text_18 & csv_text_19 
Response.AddHeader "Content-Disposition", "filename=" & NombreTitulo & ".xls"
%>
		<style>
a{text-decoration:none;}		
		.zebra{background-color:#E6E6E6;}
		
table.simple {
    border-collapse: collapse;
    margin: 0 auto;
    width: 100%;
}

table.simple .blanco {
    background: none repeat scroll 0 0 #FFFFFF;
    border: 0 none;important;
}

.tpeq {width:20%;}

table.simple .peq{
    width: 26px;
}

table.simple thead td {
    background: none repeat scroll 0 0 #2D2D2D;
    color: #FFFFFF;
    font-weight: bold;
}


table.simple thead th {
    background: none repeat scroll 0 0 #2D2D2D;
    color: #FFFFFF;
    font-weight: bold;
}
table.simple a {
    cursor: pointer;
    color: #2D2D2D;
    font-weight: bold;
}

table.simple a.editar {
  padding-right:25px;
}


table.simple td {
    border: 1px solid #D3D3D3;
    padding: 2px 5px;
}

table.simple th {
    border: 1px solid #D3D3D3;
    padding: 2px 5px;
}



.centrado {
  text-align:center;
}

table.simple td.acciones {
    width:45px;
}


table.simple tr.par {
    background: #E6E6E6;
}

table.simple td.texto {
mso-number-format:'@';  
}

        </style>	 
<table>
	<tr>
		<th colspan="7"><%=NombreTitulo%></th>
	</tr>
	<tr>
		<th>&nbsp;</th>
		<th>Fecha de Exportación</th>
		<th><%=Fecha%></th>
	</tr>
</table>

<%=DArchivo%>



