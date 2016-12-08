//[json|Text,session.db|Untyped,p|Integer,start|Integer,]
--select
/*protegido*/
DECLARE @TABLA1 TABLE (ID INT IDENTITY, P INT, START INT, IDS VARCHAR(MAX), CAMPO VARCHAR(MAX))
DECLARE @JSON VARCHAR(max)
DECLARE @P INT
DECLARE @S INT

SET @JSON = isnull(:JSON,'')
SET @P = ISNULL(:P, 0)
SET @S  = ISNULL(:START, 0 )


INSERT INTO @TABLA1(P, START, IDS,CAMPO)
SELECT @P AS P, @S AS START, p1.stringvalue as IDS, p2.stringvalue as CAMPO FROM 
			<#SESSION.DB/>.DBO.PARSEJSON  (@JSON) P1, <#SESSION.DB/>.DBO.PARSEJSON  (@JSON) P2
			WHERE P1.PARENT_ID IS NOT NULL AND P1.parent_id=P2.parent_id AND P1.name='IDSP' and p2.name='CAMPO'
		select * from @tabla1
