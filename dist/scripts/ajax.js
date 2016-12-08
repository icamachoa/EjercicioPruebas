function New_Ajax(){
 var xmlhttp=null;
 try {
 xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
 } catch (e) {
 try {
 xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
 } catch (E) {
 xmlhttp = false;
 }
 }

 if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
 xmlhttp = new XMLHttpRequest();
 }
 return xmlhttp;
}

function LoadContent(ObjectID,TheURL)
{
 var ajax=New_Ajax();
 ajax.onreadystatechange=function()
 {
 if (ajax.readyState==4) {
 ObjectID.innerHTML = ajax.responseText;
 }
 }

 var CT = new Date();

 ajax.open("GET", TheURL+'&CT='+CT.getTime(),true);
 ajax.send(null)

}

function LoadContent1(ObjectID,TheURL, OnFinish)
{
 var ajax=New_Ajax();
 ajax.onreadystatechange=function()
 {
 if (ajax.readyState==4) {
 ObjectID.innerHTML = ajax.responseText;
 OnFinish()
 }
 }

 var CT = new Date();

 ajax.open("GET", TheURL+'&CT='+CT.getTime(),true);
 ajax.send(null)

}


/* Help Context*/


 function LoadHelp (AnObj) {
 var curleft = curtop = 0;
 var TheId = AnObj.id;
 if (AnObj.offsetParent) {

 curleft = AnObj.offsetLeft
 curtop = AnObj.offsetTop

 while (AnObj = AnObj.offsetParent) {
 curleft += AnObj.offsetLeft
 curtop += AnObj.offsetTop
 }
 }

 curleft += 30;
 document.getElementById('contextual_help').style.left = curleft + 'px';
 document.getElementById('contextual_help').style.top = curtop + 'px';


 LoadContent (document.getElementById('contextual_help'),'contextual_help.dbsp?helpid='+TheId);
 document.getElementById('contextual_help').style.visibility="visible"

 }

 function CloseHelp () {
 document.getElementById('contextual_help').innerHTML = '';
 document.getElementById('contextual_help').style.visibility="hidden"
 }

