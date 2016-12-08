//[]
SELECT 1 AS TIPO, CONVERT(VARCHAR(12),dbo.GetOnlyDate(GETDATE()), 103) AS INICIO, CONVERT(VARCHAR(12),dbo.GetOnlyDate(GETDATE()), 103) AS FIN
UNION
SELECT 2 , CONVERT(VARCHAR(12),dbo.GetOnlyDate(GETDATE()-1), 103) , CONVERT(VARCHAR(12),dbo.GetOnlyDate(GETDATE()-1), 103) 
UNION
SELECT 3 , Convert(varchar, DateAdd(dd, -(DatePart(dw, GetDate()) - 1), GetDate())+1, 103) ,
Convert(varchar, DateAdd(dd, (7 - DatePart(dw, GetDate())), GetDate())+1, 103) 
UNION
SELECT 4 , Convert(varchar, DateAdd(dd, -(DatePart(dw, GetDate()) - 1), GetDate())+1-7, 103) ,
Convert(varchar, DateAdd(dd, (7 - DatePart(dw, GetDate())), GetDate())+1-7, 103) 
UNION
SELECT 5 ,  convert(varchar,DATEADD(MONTH,DATEDIFF(MONTH,0,getdate()),0),103),
convert(varchar,DATEADD(MONTH,DATEDIFF(MONTH,-1,getdate()),-1),103)
UNION
SELECT 6 ,  convert(varchar,DATEADD(MONTH,-1,DATEADD(MONTH,DATEDIFF(MONTH,0,getdate()),0)),103),
 convert(varchar,DATEADD(MONTH,DATEDIFF(MONTH,0,getdate()),-1),103)
 UNION
SELECT 7 ,  convert(varchar,DATEADD(MONTH,-2,DATEADD(MONTH,DATEDIFF(MONTH,0,getdate()),0)),103),
 convert(varchar,DATEADD(MONTH,-1,DATEADD(MONTH,DATEDIFF(MONTH,0,getdate()),0))-1,103)
UNION
SELECT 9 ,  CONVERT(VARCHAR,DATEADD(yy, DATEDIFF(yy,0,getdate()), 0),103),
CONVERT(VARCHAR,dbo.GetOnlyDate(GETDATE()), 103)
union
SELECT 10 ,  CONVERT(VARCHAR,'01/01/'+CONVERT(VARCHAR, YEAR(GETDATE())-1),103),
CONVERT(VARCHAR,dateadd(ms,-3,DATEADD(yy, DATEDIFF(yy,0,getdate() ), 0)), 103)


