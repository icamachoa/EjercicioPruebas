<%
Response.ContentType = "application/vnd.ms-excel"
Dim TituloReporte
Dim Fecha
Dim SArchivo
Dim DArchivo
Dim input
Dim n
TituloReporte = Request.Form("TituloReporte")
NombreReporte = Request.Form("NombreReporte")
Fecha = Request.Form("Fecha")

n = 0
For Each elemento in Request.form
	input = Left(elemento,6)
	If input="input_" Then
		n=n+1
	End If
Next

For i = 0 to n
     DArchivo = DArchivo & Request.form("input_"&i)
Next


Response.AddHeader "content-disposition", "attachment; filename=" & NombreReporte & ".xls"
'Response.ContentType = "application/force-download"
'Response.AddHeader "Content-Transfer-Encoding", "binary"
'Response.AddHeader "content-disposition", "attachment; filename=" & NombreReporte & ".xls"
%>
<style>
	a{text-decoration:none;} .zebra{background:#E6E6E6;} 
	table.simple { border-collapse: collapse;margin: 0 auto; width: 100%;} table.simple .blanco {background: none repeat scroll 0 0 #FFFFFF; border: 0 none !important;}
	.tpeq {width:20%;} table.simple .peq{ width: 26px;}
	table.simple thead tr {background: none repeat scroll 0 0 #2D2D2D; color: #FFFFFF; font-weight: bold; }
	table.simple thead th { background: none repeat scroll 0 0 #2D2D2D; color: #FFFFFF; font-weight: bold;}
	table.simple a { cursor: pointer; color: #2D2D2D;  font-weight: bold; }
	table.simple a.editar { padding-right:25px;	}
	table.simple td { border: 1px solid #D3D3D3;  padding: 2px 5px;	}
	table.simple th { border: 1px solid #D3D3D3;  padding: 2px 5px; }
	.centrado {text-align:center;}
	table.simple td.acciones { width:45px; }
	table.simple tr.par {background: #E6E6E6;}
	table.simple td.texto {mso-number-format:'@'; }
	.ContentProgress{ width: 150px; margin-top: 3px; position: relative; }
	.ui-progress-bar { position: relative; height: 25px; padding-right: 2px; background: #abb2bc; width: 100%; }
	.ui-progress.blue { background: #349dba !important; border: 1px solid #287a91;}
	.ui-progress.error { background: #C43C35 !important; border: 1px solid #9c302a; }
	.ui-progress.warning { background: #D9B31A!important; border: 1px solid #ab8d15; }
	.ui-progress.success { background: #57A957!important; border: 1px solid #458845;	}
	.ui-progress-bar .ui-progress { position: relative; display: block; overflow: hidden; height: 23px; background: #74d04c; border: 1px solid #4c8932;}
	.ui-progress-bar .ui-progress span.ui-label {font-size: 13px; position: absolute; right: 0; line-height: 23px; padding-right: 12px; color: #111; white-space: nowrap;}
	.ui-progress-bar .ui-progress span.ui-label b { font-weight: bold; }
	.A1, .B2, .C3{ position: absolute !important;}
	.B2{ background: #F00 !important; border-right: 0 !important; border-left: 0 !important; border-top: 0 !important; border-bottom: 0 !important; border-radius: 0 0 0 0 !important; box-shadow: none !important; display: block !important; height: 32px !important; overflow: hidden !important; position: absolute !important; top: -3px; z-index: 2;width: 3px; } 
	.C3{ border: 0 none !important; height: 24px !important; top: 1px; }
</style>	 
<table>
	<tr>
		<th></th><th colspan="8"><% response.write TituloReporte %></th>
	</tr>
</table>
<table><% response.write DArchivo%></table>
