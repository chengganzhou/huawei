"use strict";getCookie("user")&&($(".infor").html("你好!".concat(getCookie("user"))).css("font-size","20px"),$("#login").find("li").eq(0).html("你好!".concat(getCookie("user"))).css("font-size","20px"));var mySwiper=new Swiper(".swiper-container",{loop:!0,effect:"fade",autoplay:{disableOnInteraction:!1},pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".next",prevEl:".prev"}});$(".head").load("../pages/head.html"),$(".foot").load("../pages/foot.html");var chanel=document.querySelector(".chanel");$(".banlist>ul ").on("mouseenter","li",function(){$(".banmain").html("").css("display","block");var s=$(this)[0].id;$.ajax({type:"get",url:"../data/list.json",dataType:"json",success:function(n){for(var a=document.createElement("ul"),t=document.createElement("ul"),e="",i="",o=0;o<n.length;o++)if(n[o].id==s){for(var c=n[o].main,l=0;l<c.length;l++)l<5?e+='<li><img src="'.concat(c[l].title,'" alt=""><span>').concat(c[l].value,"</span></li>"):5<l&&(i+='<li><img src="'.concat(c[l].title,'" alt=""><span>').concat(c[l].value,"</span></li>"));return $(a).append($(e)),$(t).append($(i)),$(".banmain").append($(a)),$(".banmain").append($(t)),!1}}})}),$(".banmain").mouseenter(function(){$(".banmain").css("display","block")}),$(".banmain").mouseleave(function(){$(".banmain").css("display","none")}),$(".banlist>ul ").mouseleave(function(){$(".banmain").css("display","none")}),$.ajax({url:"../data/hotphone.json",type:"get",dataType:"json",success:function(n){var t="";$.each(n,function(n,a){t+='  <li>\n          <img src="'.concat(a.src,'" alt="">\n          <h4>').concat(a.type,"</h4>\n          <p>").concat(a.display,"</p>\n          <span>").concat(a.price,"</span>\n      </li> ")}),$(".hotsphone").html($(t))}}),$.ajax({url:"../data/huaweiphone.json",type:"get",dataType:"json",success:function(n){var t="";$.each(n,function(n,a){t+='    <li>\n          <img src="'.concat(a.src,'" alt=""> \n          <h4>').concat(a.type,"</h4>\n          <p>").concat(a.display,"</p>\n          <b>").concat(a.price,"</b>\n      </li> ")}),$(".huaweiphone").append($(t))}}),$.ajax({url:"../data/parts.json",type:"get",dataType:"json",success:function(n){var t="";$.each(n,function(n,a){t+='    <li>\n            <img src="'.concat(a.src,'" alt=""> \n            <h4>').concat(a.type,"</h4>\n            <p>").concat(a.display,"</p>\n            <i>").concat(a.price,"</i>\n        </li> ")}),$(".parts").append($(t))}}),$(".point").on("click","a",function(){$(this).addClass("active").parent().siblings().find("a").removeClass("active");var n=$(this).attr("href").slice(1),a=$("div[id=".concat(n,"]")).offset().top;$("html,body").animate({scrollTop:a},800),$(".scroll").animate({height:2},2),$(".scroll").animate({top:52*$(this).parent().index(),height:30},800)}),$(window).on("scroll",function(){});var lis=document.querySelectorAll(".noticeList li"),noticeCont=document.querySelector(".noticeCont"),index=0;setInterval(function(){++index>=lis.length&&(index=0,noticeCont.scrollTop=0),animate(noticeCont,{scrollTop:24*index})},3500),$(".banmain").on("click","li",function(){location.href="../pages/list.html"}),$(".tolist").click(function(){location.href="../pages/list.html"});