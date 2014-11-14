var EBE_SwfPlayer = function(swfID){
	var videoPlayerEl = $(".videoPlayer");
	var bgEl = videoPlayerEl.children("img");
	var videoUrl = videoPlayerEl.children("video").attr("src");
	videoPlayerEl.empty().append(bgEl);
	$("<div id='"+swfID+"'></div>").appendTo(videoPlayerEl);
	
	var flashvars = {};        
    flashvars.title = "";
    flashvars.description = "";
    flashvars.video = videoUrl;
	var params = {};
    params.quality = "high";
    params.allowscriptaccess = "sameDomain";
    params.allowfullscreen = "true";
    params.allowScriptAccess = "always";
    params.allowFullScreen = "true";
	
	var attributes = {};
    attributes.id = swfID;
    attributes.name = swfID;
    attributes.align = "middle";
    swfobject.embedSWF(
        "public_cn/swf/videoPlayer.swf", swfID, 
        "100%", "100%", "11.4.0",null,flashvars,params,attributes);
	swfobject.createCSS("#"+swfID, "display:block;position: absolute;left:0;top:0;");
};

$(function(){
	if(!$("<video></video>").prop("canPlayType")){
		new EBE_SwfPlayer("swfID");
	}
});
