//[tipomail|Integer,sinconfiguracion|Integer,respcorreo|Text,usuariom|Text,password|Text,passwordinbox|Text,inboxhabilitado|Integer,session.mailconfig|Untyped,session.db|Untyped,session.idusuario|Untyped,popserver|Text,puertopop|Text,smtpserver|Text,puertosmtp|Text,sslactivado|Integer,firmavalue|Text,ccocorreo|Text,tipomailinbox|Integer,inbox_usa_ssl|Integer,inbox_dejarcopia|Integer,usuariominbox|Text,predeterminado|Integer,]
--insert
/*PROTEGIDO*/
declare @llave varchar(128)
declare @contrasenia varchar(1024)
declare @contraseniaInbox varchar(1024)
declare @configmail int
declare @respcorreo varchar(8000)
DECLARE @TIPO INT
DECLARE @ESTADO INT

SET @TIPO =:tipomail
SET @ESTADO = 0
IF (@TIPO = 5) SET @ESTADO = 2

set @configmail = ISNULL( :sinconfiguracion ,0)
select @respcorreo=(case when :respcorreo is null or ltrim(rtrim(replace(:respcorreo,' ','')))='' then :USUARIOM else  :respcorreo end)
  
set @llave = salesup_ct.dbo.getsalesupkey()
set @contrasenia=EncryptByPassPhrase(@llave,:password)
SET @contraseniaInbox = EncryptByPassPhrase(@llave,:passwordInbox)

IF (@configmail=0) OR (ISNULL(:InboxHabilitado, 0) !=0)
 BEGIN
	IF (<#SESSION.MAILCONFIG/>=0 or <#SESSION.MAILCONFIG/>=2 or ( (select count(*) from <#SESSION.DB/>.DBO.USUARIOS_MAILCONFIG where idusuario=<#SESSION.IDUSUARIO/>) = 0))
	  begin
	      delete from <#SESSION.DB/>.DBO.USUARIOS_MAILCONFIG where idusuario=<#SESSION.IDUSUARIO/>
		  insert into <#SESSION.DB/>.DBO.USUARIOS_MAILCONFIG 
		  (IDUSUARIO,EMAIL,POP3_HOST,POP3_PORT,SMTP_HOST,SMTP_PORT,POP3_USERNAME,POP3_PASSWORD,SMTP_USERNAME,SMTP_PASSWORD,USE_SSL,TIPO,FIRMA,ESTADO,CCO, INBOX_TIPO, Inbox_Habilitado, INBOX_USA_SSL, INBOX_DEJARCOPIA,INBOX_ESTADO,INBOX_ERROR) 
			    values (<#SESSION.IDUSUARIO/>,@respcorreo,:popserver,:puertopop,:smtpserver,:puertosmtp,:USUARIOM,@contrasenia,:USUARIOM,@contrasenia,:sslactivado,@TIPO,:firmavalue,@ESTADO,:CCOCORREO, ISNULL(:tipomailInbox, 0), ISNULL(:InboxHabilitado, 0), isnull(:INBOX_USA_SSL, 0), isnull(:INBOX_DEJARCOPIA, 0), 0, '')
	 end 
    ELSE
     UPDATE <#SESSION.DB/>.DBO.USUARIOS_MAILCONFIG 
 	 SET IDUSUARIO=<#SESSION.IDUSUARIO/>,
     EMAIL=@respcorreo,
     POP3_HOST=:popserver,
     POP3_PORT=:puertopop,
     SMTP_HOST=:smtpserver,
     SMTP_PORT=:puertosmtp,
     POP3_USERNAME=:USUARIOMInbox ,
     POP3_PASSWORD=@contraseniaInbox,
     SMTP_USERNAME=:USUARIOM,
     SMTP_PASSWORD=@contrasenia,
     USE_SSL=:sslactivado,
     TIPO=@TIPO,
     FIRMA=:firmavalue,
 	 ESTADO=@ESTADO,
	 INBOX_TIPO = ISNULL(:tipomailInbox, 0),
	 Inbox_Habilitado = ISNULL(:InboxHabilitado, 0),
	 INBOX_USA_SSL =  ISNULL(:INBOX_USA_SSL, 0),
	 INBOX_DEJARCOPIA  =  ISNULL(:INBOX_DEJARCOPIA, 0),
	 INBOX_ESTADO = 0,
	 INBOX_ERROR = '',
 	 CCO=:CCOCORREO
    WHERE IDUSUARIO = <#SESSION.IDUSUARIO/>
	
	IF (:InboxHabilitado = 1)
	 UPDATE  <#SESSION.DB/>.DBO.USUARIOS_MAILCONFIG 
	 SET
	  INBOX_TIPO    = :tipomail,
	  INBOX_USA_SSL = :sslactivado,
	  INBOX_DEJARCOPIA  = 1,
      POP3_HOST = SMTP_HOST,
      POP3_PORT = SMTP_PORT,
      POP3_USERNAME  = SMTP_USERNAME ,
      POP3_PASSWORD  = SMTP_PASSWORD
     WHERE IDUSUARIO = <#SESSION.IDUSUARIO/>
  
  
   UPDATE <#SESSION.DB/>.DBO.USUARIOS SET MAILCONFIG = 1 WHERE  IDUSUARIO = <#SESSION.IDUSUARIO/>
  
  IF <#SESSION.MAILCONFIG/>=1 
    EXEC  <#SESSION.DB/>.DBO.SP_NOTIFICA_EMAIL_CONFIGURADO <#SESSION.IDUSUARIO/>, :respcorreo 
 END
ELSE
  BEGIN
    UPDATE <#SESSION.DB/>.DBO.USUARIOS SET MAILCONFIG = 2 WHERE  IDUSUARIO = <#SESSION.IDUSUARIO/>
  END
 
