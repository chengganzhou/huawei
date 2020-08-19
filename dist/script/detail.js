  // 加载底部  
  $(".head").load("../pages/head.html");
  // 加载底部
  $(".foot").load("../pages/foot.html");

  // 放大镜
  // 移入出现
  var bigBox=document.querySelector(".bigBox");
  var smallBox=document.querySelector(".smallBox");
  var mask=document.querySelector(".mask");
  $(".smallBox").mouseenter(function(e){
    $(this).find(".mask").css("display","block");
    $(".bigBox").css("display","block");
    $(".mask").mousemove(function(e){
     
      let offsetL=e.clientX-$(".smallBox").offset().left -0.5*$(".mask")[0].clientWidth
      let offsetT=e.clientY-$(".smallBox").offset().top -0.5*$(".mask")[0].clientHeight;
      if(offsetL<=0){
        offsetL=0;
    }
    if(offsetT<=0){
      offsetT=0;
    }
    if(offsetL>=smallBox.clientWidth-mask.clientWidth){
      offsetL=smallBox.clientWidth-mask.clientWidth;
    }
    if(offsetT>=smallBox.clientHeight-mask.clientHeight){
      offsetT=smallBox.clientHeight-mask.clientHeight;
    }
      $(this).css("left",offsetL+'px');
      $(this).css("top",offsetT+'px');
      bigBox.style.backgroundPositionX=-2*offsetL+'px';
      bigBox.style.backgroundPositionY=-2*offsetT+'px';
    })
  })
  // 移除消失
  $(".smallBox").mouseleave(function(){
    $(this).find(".mask").css("display","none");
    $(".bigBox").css("display","none");
  })

  // 下面小图轮播图
  // 划过添加边框
$(".rollwrap").on("mouseenter","img",function(){
  $(this).addClass("show").siblings("img").removeClass('show');
 let  reg=new RegExp(/[0-9].png/g);
 let src=$(this).prop("src").match(reg)[0];
 $(".smallBox img" ).prop("src","../image/big"+src);
 $(".bigBox")[0].style.background=`#fff url(../image/big${src}) no-repeat`
})
let index=0;
var num=$(".rollMain").find("img").length;
$('.left').click(function(){
    index--;
    if(index<0){
      index=0
    }
    $('.rollwrap').animate({"scrollLeft":index*65},200)
})
$('.right').click(function(){
  index++;
  if(index>num-5){
    index--;
    return false;
  }
  $('.rollwrap').animate({"scrollLeft":index*65},200)
})

// 划过撑开价格的盒子
$('.detailPrice').mouseenter(function(){
  $(this).height('300px');
  $('.reduce').find('dd').prop('display',"block");
})
$('.detailPrice').mouseleave(function(){
  $(this).height('237px');
})

// 划过选颜色款切换边框颜色以及下面的已选商品的轮换
$(".color").on("click",'p',function(){
  $(this).addClass("activeP").siblings('p').removeClass('activeP');
  $(".selGoods").find("span").eq(0).text($(this).text()) ;
})
// 划过选择标配以及下面的已选商品的轮换
$(".meal").on("click",'span',function(){
  $(this).addClass("activeSpan").siblings('span').removeClass('activeSpan');
  $(".selGoods").find("span").eq(1).text($(this).text()) ;
})
// 划过选版本款切换边框颜色以及下面的已选商品的轮换
$(".editor").on("click",'span',function(){
  $(this).addClass("activeEdi").siblings('span').removeClass('activeEdi');
  $(".selGoods").find("span").eq(2).text($(this).text()) ;
})

