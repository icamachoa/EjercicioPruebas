<% 

	
		Dim Tipo
		Dim Servidor
		Dim SMTP_Usuario
		Dim Clave
		Dim Puerto
		Dim SSL
		DIM UsarSSL
		Tipo 	     =  Request.QueryString("tipo") ' rs.Fields("TIPO")
		SMTP_Usuario =  Request.QueryString("SMTP_Usuario") ' rs.Fields("SMTP_USERNAME")
		Clave        =  Request.QueryString("Clave") ' rs.Fields("SMTP_PASSWORD")
		Servidor     =  Request.QueryString("Servidor") ' rs.Fields("SMTP_HOST")
		Puerto       =  Request.QueryString("Puerto") ' rs.Fields("SMTP_PORT")
		SSL          =  Request.QueryString("SSL") ' rs.Fields("USE_SSL")
		UsarSSL      = False
		if SSL <> 0 then
			UsarSSL      = True
		end if
		
		if Tipo = 1 then
			Servidor 	 =  "smtp.gmail.com"
			Puerto       =  "465"
			UsarSSL      =  True
		end if
		if Tipo = 2 then
			Servidor 	 =  "smtp.live.com"
			Puerto       =  "465"
			UsarSSL      =  True
		end if
		if Tipo = 3 then
			Servidor 	 =  "smtp.mail.yahoo.com"
			Puerto       =  "465"
			UsarSSL      =  True
		end if
		'Response.Write(Tipo & " " & Servidor & ":" & Puerto & " " & SMTP_Usuario & "@" & Clave & " " & SSL & " " &UsarSSL)
		

		Dim ObjSendMail
		Set ObjSendMail = CreateObject( "CDO.Message" ) 'This section provides the configuration information for the remote SMTP server.
		ObjSendMail.Configuration.Fields.Item ( "http://schemas.microsoft.com/cdo/configuration/sendusing" ) = 2 'Send the message using the network (SMTP over the network).
		ObjSendMail.Configuration.Fields.Item ( "http://schemas.microsoft.com/cdo/configuration/smtpserver" ) = Servidor
		ObjSendMail.Configuration.Fields.Item ( "http://schemas.microsoft.com/cdo/configuration/smtpserverport" ) = Puerto
		ObjSendMail.Configuration.Fields.Item ( "http://schemas.microsoft.com/cdo/configuration/smtpusessl" ) = UsarSSL
		ObjSendMail.Configuration.Fields.Item ( "http://schemas.microsoft.com/cdo/configuration/smtpconnectiontimeout" ) = 60
		
		' The mail server requires outgoing authentication use a valid email address and password.
		ObjSendMail.Configuration.Fields.Item ( "http://schemas.microsoft.com/cdo/configuration/smtpauthenticate" ) = 1 'basic (clear-text) authentication
		ObjSendMail.Configuration.Fields.Item ( "http://schemas.microsoft.com/cdo/configuration/sendusername" ) = SMTP_Usuario
		ObjSendMail.Configuration.Fields.Item ( "http://schemas.microsoft.com/cdo/configuration/sendpassword" ) = Clave
		ObjSendMail.Configuration.Fields.Update
		'End remote SMTP server configuration section== ObjSendMail.To = " sample@domain.com" 
		ObjSendMail.Subject = "Prueba de correo desde SalesUp!"
		ObjSendMail.From = "SalesUp! <"&SMTP_Usuario&">"
		ObjSendMail.To = "ivan.rios@grupobfx.com"
'		ObjSendMail.To = SMTP_Usuario
		' we are sending a text email.. simply switch the comments around to send an html email instead
		ObjSendMail.HTMLBody = " Esta es una <b>prueba</b> de correo desde "&SMTP_Usuario&"@"&Servidor&"  desde SalesUp!" 
		'ObjSendMail.TextBody = "Esta es una prueba "
		if Tipo < 2  then
			ObjSendMail.Send
			Response.Write("1")
else
		Response.Write("1")
	end if
		Set ObjSendMail = Nothing
	


%>

