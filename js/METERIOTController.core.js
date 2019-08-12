//Powered by METERIOT Website Framework
//Copyright XSYDS.CN(C)2015-2017, all rights reserved
//This file is a part of the product METERIOT by BlueAir TechGroup(www.xsyds.cn), any change or second-publication of this document is forbiddened.
var loadingWrapperDeleted;
loadingWrapperDeleted=false;
document.onreadystatechange = completeLoading;
document.createElement("navbar");

	var prompttime = 0;
	var promptx = [];
	var prompty = [];
	var promptdraging = [];
    var browser = function () {   
    var agent = navigator.userAgent.toLowerCase(),  
    opera = window.opera,  
    browser = {  
        //检测当前浏览器是否为IE  
        ie: /(msie\s|trident.*rv:)([\w.]+)/.test(agent), 
 
        //检测当前浏览器是否为Opera  
        opera: (!!opera && opera.version), 
        //检测当前浏览器是否是webkit内核的浏览器  
        webkit: (agent.indexOf(' applewebkit/') > -1), 
        //检测当前浏览器是否是运行在mac平台下  
        mac: (agent.indexOf('macintosh') > -1), 
        //检测当前浏览器是否处于“怪异模式”下  
        quirks: (document.compatMode == 'BackCompat')  
    }; 
    //检测当前浏览器内核是否是gecko内核  
    browser.gecko = (navigator.product == 'Gecko' && !browser.webkit && !browser.opera && !browser.ie); 
    var version = 0; 
    // Internet Explorer 6.0+  
    if (browser.ie) {  
        var v1 = agent.match(/(?:msie\s([\w.]+))/);  
        var v2 = agent.match(/(?:trident.*rv:([\w.]+))/);  
        if (v1 && v2 && v1[1] && v2[1]) {  
            version = Math.max(v1[1] * 1, v2[1] * 1);  
        } else if (v1 && v1[1]) {  
            version = v1[1] * 1;  
        } else if (v2 && v2[1]) {  
            version = v2[1] * 1;  
        } else {  
            version = 0;  
        } 
        //检测浏览器模式是否为 IE11 兼容模式  
        browser.ie11Compat = document.documentMode == 11; 
        //检测浏览器模式是否为 IE9 兼容模式  
        browser.ie9Compat = document.documentMode == 9; 
        //检测浏览器模式是否为 IE10 兼容模式  
        browser.ie10Compat = document.documentMode == 10; 
        //检测浏览器是否是IE8浏览器  
        browser.ie8 = !!document.documentMode; 
        //检测浏览器模式是否为 IE8 兼容模式  
        browser.ie8Compat = document.documentMode == 8; 
        //检测浏览器模式是否为 IE7 兼容模式  
        browser.ie7Compat = ((version == 7 && !document.documentMode) || document.documentMode == 7); 
        //检测浏览器模式是否为 IE6 模式 或者怪异模式  
        browser.ie6Compat = (version < 7 || browser.quirks); 
        browser.ie9above = version > 8; 
        browser.ie9below = version < 9;  
    } 
    // Gecko.  
    if (browser.gecko) {  
        var geckoRelease = agent.match(/rv:([\d\.]+)/);  
        if (geckoRelease) {  
            geckoRelease = geckoRelease[1].split('.');  
            version = geckoRelease[0] * 10000 + (geckoRelease[1] || 0) * 100 + (geckoRelease[2] || 0) * 1;  
        }  
    } 
    //检测当前浏览器是否为Chrome, 如果是，则返回Chrome的大版本号  
    if (/chrome\/(\d+\.\d)/i.test(agent)) {  
        browser.chrome = +RegExp['\x241'];  
    } 
    //检测当前浏览器是否为Safari, 如果是，则返回Safari的大版本号  
    if (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(agent) && !/chrome/i.test(agent)) {  
        browser.safari = +(RegExp['\x241'] || RegExp['\x242']);
    } 
    // Opera 9.50+  
    if (browser.opera){ 
        version = parseFloat(opera.version()); 
	}
    // WebKit 522+ (Safari 3+)  
    if (browser.webkit){
        version = parseFloat(agent.match(/ applewebkit\/(\d+)/)[1]); 
	}
    //检测当前浏览器版本号  
    browser.version = version; 
    return browser;  
}();
if(browser.ie9below === true){
		document.write('<div class="cover theme-color-white" style="display:table;position:fixed;top:0px;left:0px;height:100vh;width:100vw;vertical-align:middle;background:#ffffff;color:#000000;"><div class="inner"><h1>抱歉,由于您的浏览器版本过低,本页面不兼容您的浏览器</h1><p>Sorry, because your browser is too old, we cannot bring you the ideal vision for this page</p></div></div>');
		document.write("<!--[if lt IE 9]><p class=\"notice\">当前网页<b>不支持</b>您正在使用的浏览器. 为了正常的访问,请升级您的浏览器<br />Sorry, this page does not support your current browser, to change this situation, you will need to update your browser</p><![endif]-->");
}

$(window).resize(
function(e){
	"use strict";
	var MyWidth = parseInt(GetWindowWidth());
	var MyHeight = parseInt(GetWindowHeight());
	//$(".cover").css("width",MyWidth + "px");
	$(".cover").css("height",MyHeight + "px");
	var Menus = $(".dropdownmenu");
	if(MyWidth >= 901){
		Menus.css("width","auto");
		Menus.parent(".dropdownparent").children(".dropdowncontroller").css("width","auto");
		setTimeout(function(){
			ChangeNavbarDrop();
		},1000);
	}else{
		Menus.css("width","100%");
		Menus.parent(".dropdownparent").children(".dropdowncontroller").css("width","100%");
	}
	var MyNav = $(".navbar-fixed-bottom");
	MyNav.css("top",(GetWindowHeight()- MyNav.outerHeight())+"px");
	var MyNT = $(".navbar-fixed-top");
	if(MyNT !== null){
		//不为空
		$(".after-navbar-fixed").css("top",MyNT.height());
	}else{
		$(".after-navbar-fixed").css("top",0);
	}
	if(GetWindowWidth()<900){
		//是手机
		$(".row.navbar-row").hide();
	}else{
		$(".row.navbar-row").show();
	}
	for(var i=0; i<=prompttime; i++){
		$("#prompt" + i).css("top",(MyHeight-$("#prompt" + i).height())/2);
		$("#prompt" + i).css("left",(MyWidth-$("#prompt" + i).width())/2);
	}
}
);
$(window).ready(
function() {
    "use strict";
	var MyWidth = parseInt(GetWindowWidth());
	var MyHeight = parseInt(GetWindowHeight());
	if(loadingWrapperDeleted === false){
		$("body").append('<div id="LoadingWrapper" class="cover theme-color-black" style="position:fixed;top:0px;left:0px;width:100vw;height:100vh;z-index:9999;display:table;vertical-align:middle;"><div class="inner" style="display:table-cell"><!-- [if gt IE 8]><p align="center"><div class="meteriot-animate-spinner"></div></p><p align="center">Powered by METERIOT</p><![endif]--><!--[if lt IE 9]><p>当前网页<b>不支持</b>您正在使用的浏览器. 为了正常的访问,请升级您的浏览器</p><p>Sorry, this page does not support your current browser, to change this situation, you will need to update your browser</p><![endif]--></div></div>');
	}
	//开始加载页面
	//$(".cover").css("width",MyWidth + "px");
	$(".cover").css("height",MyHeight + "px");
	$(".dropdownmenu").hide();
	$(".dropdownmenu").parent().addClass("dropdownparent");
	
	if(MyWidth >= 901){
		var Menus = $(".dropdownmenu");
		if(Menus.width()-16>=Menus.parent(".dropdownparent").children(".dropdowncontroller").width()){
			Menus.parent(".dropdownparent").children(".dropdowncontroller").css("width",(Menus.width()-16) + "px");
		}else{
			Menus.css("width",(Menus.parent(".dropdownparent").children(".dropdowncontroller").width() + 16) + "px");
		}
	}
	var MyNav = $(".navbar-fixed-bottom");
	MyNav.css("top",(MyHeight-MyNav.outerHeight())+"px");
	var MyNT = $(".navbar-fixed-top");
	if(MyNT !== null){
		//不为空
		$(".after-navbar-fixed").css("top",MyNT.height());
		$(document).addClass("has-navbar-top"); //设置一个有Navbar-Top类型
	}else{
		$(".after-navbar-fixed").css("top",0);
	}
	if(GetWindowWidth()<900){
		//是手机
		$(".row.navbar-row").hide();
	}else{
		$(".row.navbar-row").show();
	}
	$(".collapaser-pre-hidden").hide();
	$("navicon").click(
	function(e){
		//alert("Hi");
		var MyNavBar=$(e.target).parent();
		var MyRow=MyNavBar.children(".row.navbar-row");
		MyRow.toggle();
		if(MyNavBar.hasClass("navbar-fixed-bottom")){
			MyNavBar.css("top",(MyHeight-MyNavBar.outerHeight())+"px");
		}
	}
	);
	$(".collapsecontroller").click(
	function(e){
		var MyContainer = $(e.target).parent();
		var MyCollapaser = MyContainer.children(".collapaser");
		MyCollapaser.toggle();
	}
	);
	$(".dropdowncontroller").click(
	function(e){
		var MyDropParent = $(e.target).parent();
		var MyDropMenu = MyDropParent.children(".dropdownmenu");
		MyDropMenu.toggle();
	}
	);
	$(".dropdownparent").mouseleave(
	function(e){
		if($(e.target).hasClass("dropdownparent")){
			$(e.target).children(".dropdownmenu").hide();
		}else{
			$(e.target).parent(".dropdownparent").children(".dropdownmenu").hide();
		}
	}
	);
	//$("a.btn").not("[href]").attr("href","javascript:void(0);");
	if(browser.chrome || browser.safari || browser.opera || browser.webkit){
		$("a").not("[href]").attr("href","javascript:void(0);");
	}
	$("#LoadingWrapper").html('<div class="inner" style="display:table-cell;"><p align="center"><div class="meteriot-animate-spinner"></div></p><p align="center">Powered by METERIOT</p></div>');
});
function completeLoading(){
	if(document.readyState == "complete"){
		loadingWrapperDeleted=true;
		$("#LoadingWrapper").hide();
		$("#LoadingWrapper").remove();
	}
}
function ChangeNavbarDrop(){
	var Menus = $(".dropdownmenu");
	if(Menus.width()-16 >= Menus.parent(".dropdownparent").children(".dropdowncontroller").width()){
		Menus.parent(".dropdownparent").children(".dropdowncontroller").css("width",(Menus.width()-16) + "px");
	}else{
		Menus.css("width",(Menus.parent(".dropdownparent").children(".dropdowncontroller").width() + 16) + "px");
	}
}

function GetWindowWidth(){
	"use strict";
	return $(window).width();
}
function GetWindowHeight(){
	"use strict";
	return $(window).height();
}
function PromptWindow(title,description,btnlink){
	//默认只在电脑端弹出
	"use strict";
	if(parseInt(GetWindowWidth()) <= 900){return 1;}
	var basedoc1 = '<div id="prompt' + prompttime + '" class="promptwindow" style="position:fixed;width:600px;z-index:10;top:0px;left:0px;"><div id="promptmov' + prompttime + '" class="container-fluid theme-color-black"><h5 style="display:inline-block;width:auto;margin:0;padding-left:4px;">' + title + '</h5><div style="float:right;display:inline-block;"><a id="promptbtn' + prompttime + '" class="btn btn-primary" style="padding:0;border-radius:0;margin:0;padding-left:5px;padding-right:5px;">X</a></div></div><div class="container-fluid theme-color-blue-primary">' + description + '</div>';
	var basedoc2= '</div>';
	var mydoc;
	if(btnlink===''){
		mydoc = basedoc1 + basedoc2;
	}else{
		mydoc = basedoc1 + '<div class="container-fluid theme-color-blue-primary text-all-center"><a class="btn btn-primary" href="' + btnlink + '">了解详情</a></div>' + basedoc2;
	}
	$("body").append(mydoc);
	$("#promptbtn" + prompttime).click(function(e){
		$(e.target).parent(".promptwindow").remove();
	});
	$("#promptmov"+prompttime).mousemove(function(e) {
		var nowid;
		nowid = Number($(e.target).attr("id").replace("promptmov",""));
		var ctop,cleft;
		
		if(promptdraging[nowid]===1){
			ctop = Number($(e.target).parent().css("top").replace("px",""));
			cleft = Number($(e.target).parent().css("left").replace("px",""));
			ctop= ctop + (e.clientY-prompty[nowid]);
			cleft = cleft+ (e.clientX-promptx[nowid]);
			$(e.target).parent().css("top",ctop);
			$(e.target).parent().css("left",cleft);
			promptx[nowid]=e.clientX;
			prompty[nowid]=e.clientY;
		}
    });
	$("#promptmov" + prompttime).mousedown(function(e) {
		var nowid;
		nowid = Number($(e.target).attr("id").replace("promptmov",""));
		promptx[nowid]=e.clientX;
		prompty[nowid]=e.clientY;
		promptdraging[nowid]=1;
	});
	$("#promptmov" + prompttime).mouseup(function(e){
		var nowid;
		nowid = Number($(e.target).attr("id").replace("promptmov",""));
		promptdraging[nowid]=0;
	}
	);
	$("#promptmov" + prompttime).mouseleave(function(e){
		var nowid;
		nowid = Number($(e.target).attr("id").replace("promptmov",""));
		promptdraging[nowid]=0;
	}
	);
	//var myprompt = $("#prompt" + prompttime);
	$("#prompt" + prompttime).css("top",(GetWindowHeight()-$("#prompt" + prompttime).height())/2);
	$("#prompt" + prompttime).css("left",(GetWindowWidth()-$("#prompt" + prompttime).width())/2);
	$("#prompt" + prompttime).fadeIn();
	prompttime += 1;
}