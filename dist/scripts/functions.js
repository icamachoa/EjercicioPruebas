// JavaScript Document
function setVideo(idvideo) {
	var vswf = new SWFObject('flvplayer.swf','player','300','250','7');
	vswf.addParam("allowfullscreen","true");
	vswf.addVariable("type","flv");
	vswf.addVariable("file","http://cache.googlevideo.com/get_video?video_id="+idvideo);
	vswf.addVariable("image","http://img.youtube.com/vi/"+idvideo+"/2.jpg");
	vswf.addVariable("autostart", "true");
	vswf.write('swfvideo');
}
function setVideoX(idvideo) {
	var vswf = new SWFObject('http://www.youtube.com/v/'+idvideo,'player','300','250','7');
	vswf.addParam("wmode","transparent");
	vswf.write('swfvideo');
}
function getId(nameid) {
	return document.getElementById(nameid);
}
function getData() {
	getId('loadData').style.visibility = "visible";
	dsYouTube.setURL(varurl+"?tag="+vartag+"&pag="+varpag);
	dsYouTube.loadData();
}
function setText(varId, varText) {
	getId(varId).innerText = varText;
	getId(varId).textContent = varText;
}
function download() {
	window.location = "download.php?v="+getId("codigo").value;
}
function pagVideo(pagStep) {
	if (varpag > 1 || pagStep > 0) {
		varpag = Number(varpag) + Number(pagStep);
		window.location = "index.php?query="+vartag+"&page="+varpag;
	}
}



