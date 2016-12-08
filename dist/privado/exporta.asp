<%
Response.ContentType = "application/vnd.ms-excel"
Dim NombreTitulo
Dim Fecha
Dim SArchivo
Dim DArchivo

Dim csv_text_0 , csv_text_1 , csv_text_2 , csv_text_3 , csv_text_4 , csv_text_5 , csv_text_6 , csv_text_7 , csv_text_8 , csv_text_9 , csv_text_10
Dim csv_text_11 , csv_text_12 , csv_text_13 , csv_text_14 , csv_text_15 , csv_text_16 , csv_text_17 , csv_text_18 , csv_text_19
  
NombreTitulo = Request.Form("NombreTitulo")
Fecha = Request.Form("Fecha")

csv_text_0 = Request.Form("csv_text_0")
csv_text_1 = Request.Form("csv_text_1")
csv_text_2 = Request.Form("csv_text_2")
csv_text_3 = Request.Form("csv_text_3")
csv_text_4 = Request.Form("csv_text_4")
csv_text_5 = Request.Form("csv_text_5")
csv_text_6 = Request.Form("csv_text_6")
csv_text_7 = Request.Form("csv_text_7")
csv_text_8 = Request.Form("csv_text_8")
csv_text_9 = Request.Form("csv_text_9")
csv_text_10 = Request.Form("csv_text_10")
csv_text_11 = Request.Form("csv_text_11")
csv_text_12 = Request.Form("csv_text_12")
csv_text_13 = Request.Form("csv_text_13")
csv_text_14 = Request.Form("csv_text_14")
csv_text_15 = Request.Form("csv_text_15")
csv_text_16 = Request.Form("csv_text_16")
csv_text_17 = Request.Form("csv_text_17")
csv_text_18 = Request.Form("csv_text_18")
csv_text_19 = Request.Form("csv_text_19")

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



